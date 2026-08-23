import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// Accepts both the bare project URL and the "Data API" URL (with /rest/v1/)
const RAW_URL = ((import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? '').trim();
const SUPABASE_URL = RAW_URL.replace(/\/+$/, '').replace(/\/rest\/v1$/, '');
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim();
const LIVE_MODE = Boolean(RAW_URL && SUPABASE_URL && SUPABASE_ANON_KEY);

const LOCAL_STATS_KEY = 'eusha_stats_local';
const LOCAL_STARRED_KEY = 'eusha_starred_projects';

interface ProjectStat {
  views: number;
  stars: number;
}

interface StatsContextValue {
  liveMode: boolean;
  ready: boolean;
  /** Returns live count, or null while live data is still loading */
  getViews: (projectId: string) => number | null;
  getStars: (projectId: string) => number | null;
  isStarred: (projectId: string) => boolean;
  addStar: (projectId: string) => void;
  recordView: (projectId: string) => void;
}

const StatsContext = createContext<StatsContextValue | null>(null);

function readLocalStats(): Record<string, ProjectStat> {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STATS_KEY) || '{}');
  } catch {
    return {};
  }
}

function readLocalStarred(): Record<string, true> {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STARRED_KEY) || '{}');
  } catch {
    return {};
  }
}

async function supabaseRpc(fnName: string, args: Record<string, unknown>): Promise<boolean> {
  if (!LIVE_MODE) return false;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fnName}`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export const StatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<Record<string, ProjectStat>>({});
  const [starred, setStarred] = useState<Record<string, true>>({});
  const [ready, setReady] = useState(!LIVE_MODE);

  // Initial load
  useEffect(() => {
    // Restore the visitor's own likes on every page load (all modes)
    setStarred(readLocalStarred());

    if (!LIVE_MODE) {
      setStats(readLocalStats());
      setReady(true);
      return;
    }
    let cancelled = false;
    fetch(`${SUPABASE_URL}/rest/v1/project_stats?select=project_id,view_count,star_count`, {
      headers: {
        apikey: SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((rows: { project_id: string; view_count: number; star_count: number }[]) => {
        if (cancelled) return;
        const map: Record<string, ProjectStat> = {};
        rows.forEach((row) => {
          map[row.project_id] = { views: row.view_count, stars: row.star_count };
        });
        setStats(map);
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const bumpStat = useCallback((projectId: string, field: keyof ProjectStat, delta: number) => {
    setStats((prev) => {
      const current = prev[projectId] ?? { views: 0, stars: 0 };
      return {
        ...prev,
        [projectId]: { ...current, [field]: Math.max(0, current[field] + delta) },
      };
    });
  }, []);

  // Every modal open counts as a view
  const recordView = useCallback(
    (projectId: string) => {
      bumpStat(projectId, 'views', 1);
      if (LIVE_MODE) {
        void supabaseRpc('increment_project_view', { p_project_id: projectId }).then((ok) => {
          if (!ok) bumpStat(projectId, 'views', -1);
        });
      } else {
        const local = readLocalStats();
        local[projectId] = {
          views: (local[projectId]?.views ?? 0) + 1,
          stars: local[projectId]?.stars ?? 0,
        };
        try {
          localStorage.setItem(LOCAL_STATS_KEY, JSON.stringify(local));
        } catch {
          /* storage unavailable */
        }
      }
    },
    [bumpStat]
  );

  // Every click adds +1 star (applause-style, no un-like)
  const addStar = useCallback(
    (projectId: string) => {
      setStarred((prev) => {
        const updated = { ...prev, [projectId]: true as const };
        try {
          localStorage.setItem(LOCAL_STARRED_KEY, JSON.stringify(updated));
        } catch {
          /* storage unavailable */
        }
        return updated;
      });

      bumpStat(projectId, 'stars', 1);

      if (LIVE_MODE) {
        void supabaseRpc('set_project_star', { p_project_id: projectId, p_starred: true }).then((ok) => {
          if (!ok) bumpStat(projectId, 'stars', -1);
        });
      } else {
        const local = readLocalStats();
        local[projectId] = {
          views: local[projectId]?.views ?? 0,
          stars: (local[projectId]?.stars ?? 0) + 1,
        };
        try {
          localStorage.setItem(LOCAL_STATS_KEY, JSON.stringify(local));
        } catch {
          /* storage unavailable */
        }
      }
    },
    [bumpStat]
  );

  const value = useMemo<StatsContextValue>(
    () => ({
      liveMode: LIVE_MODE,
      ready,
      // Live mode: real counts once loaded, null while pending.
      // Offline mode: always show the static portfolio numbers.
      getViews: (projectId) => {
        if (!LIVE_MODE) return stats[projectId]?.views ?? null;
        return ready ? stats[projectId]?.views ?? 0 : null;
      },
      getStars: (projectId) => {
        if (!LIVE_MODE) return stats[projectId]?.stars ?? null;
        return ready ? stats[projectId]?.stars ?? 0 : null;
      },
      isStarred: (projectId) => Boolean(starred[projectId]),
      addStar,
      recordView,
    }),
    [stats, starred, ready, addStar, recordView]
  );

  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>;
};

export function useProjectStats(): StatsContextValue {
  const ctx = useContext(StatsContext);
  if (!ctx) {
    throw new Error('useProjectStats must be used within StatsProvider');
  }
  return ctx;
}
