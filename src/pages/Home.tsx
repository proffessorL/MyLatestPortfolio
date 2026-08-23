import React, { useEffect, useMemo, useState } from 'react';
import { projectsData } from '../data/portfolioData';
import type { TabId, ProjectItem } from '../types';
import { soundManager } from '../utils/sound';
import profilePhoto from '../assets/profile.jpg';

const GITHUB_USERNAME = 'proffessorL';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionsResponse {
  total?: { lastYear?: number };
  contributions?: ContributionDay[];
}

interface HomeProps {
  onNavigate: (tabId: TabId) => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onSelectProject }) => {
  const [contributions, setContributions] = useState<ContributionDay[] | null>(null);
  const [commitTotal, setCommitTotal] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
      .then((res) => res.json() as Promise<ContributionsResponse>)
      .then((data) => {
        if (cancelled) return;
        setContributions(data.contributions ?? []);
        setCommitTotal(typeof data.total?.lastYear === 'number' ? data.total.lastYear : null);
      })
      .catch(() => {
        if (!cancelled) setContributions([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const heatmapCells = useMemo(() => {
    if (!contributions || contributions.length === 0) return [];
    const cells: { level: number; label?: string }[] = [];
    const leadingPad = new Date(`${contributions[0].date}T00:00:00`).getDay();
    for (let i = 0; i < leadingPad; i++) cells.push({ level: -1 });
    contributions.forEach((day) => {
      cells.push({
        level: day.level,
        label:
          day.count > 0
            ? `${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`
            : `No contributions on ${day.date}`,
      });
    });
    while (cells.length % 7 !== 0) cells.push({ level: -1 });
    return cells;
  }, [contributions]);

  const commitSummary =
    commitTotal !== null
      ? `${commitTotal.toLocaleString()} commits in the last year`
      : contributions && contributions.length === 0
        ? 'live data unavailable'
        : 'loading contributions...';

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Profile Header */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-surface-container-low border border-outline-variant/60 p-6 md:p-8 rounded-lg shadow-xs hover:border-primary/40 transition-colors">
        <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
          <div
            className="absolute inset-0 rounded-full bg-primary/50 blur-xl profile-glow"
            aria-hidden="true"
          ></div>
          <div className="absolute inset-0 rounded-full border-2 border-primary/60 p-1 bg-surface-container shadow-[0_0_20px_-4px_var(--color-primary)]">
            <img
              className="w-full h-full rounded-full object-cover shadow-inner"
              alt="Eusha Headshot"
              src={profilePhoto}
            />
          </div>
          <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-secondary border-2 border-background shadow-[0_0_10px_rgba(103,223,112,0.8)]" title="Available for hire"></div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-1 flex-wrap justify-center md:justify-start">
            <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold">Eusha</h1>
            <span className="font-mono-code text-xs px-2.5 py-0.5 rounded bg-primary/10 border border-primary/30 text-primary">v2.4.0-release</span>
            <span className="font-mono-code text-xs px-2.5 py-0.5 rounded bg-secondary/10 border border-secondary/30 text-secondary">Founder of RESNOR</span>
          </div>
          <p className="text-on-surface-variant font-mono-code text-xs mb-6">Full-Stack Web Developer & AI/ML Integration Engineer</p>

          <div className="flex flex-wrap justify-center md:justify-start items-center gap-y-4 gap-x-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-surface-container border border-outline-variant/60">
              <span className="font-mono-code font-bold text-primary">45+</span>
              <span className="text-on-surface-variant font-mono-code text-xs">Projects Built</span>
            </div>
            <div className="h-6 w-px bg-outline-variant/60 hidden md:block"></div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-surface-container border border-outline-variant/60">
              <span className="font-mono-code font-bold text-secondary">12+</span>
              <span className="text-on-surface-variant font-mono-code text-xs">Tech Stack</span>
            </div>
            <div className="h-6 w-px bg-outline-variant/60 hidden md:block"></div>

            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded bg-surface-container border border-outline-variant/60">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(103,223,112,0.8)] animate-pulse"></span>
              <span className="text-on-surface font-mono-code text-xs font-medium">Available for work</span>
            </div>
          </div>

          <p className="font-mono-code text-[11px] text-on-surface-variant mt-4 max-w-xl leading-relaxed">
            <span className="text-primary">{"//"}</span> 45+ projects built — only the best ones
            made it here. Click <span className="text-primary font-bold">View Projects</span> to explore.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
            <button
              onClick={() => {
                soundManager.playClick('tab');
                onNavigate('projects');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-on-primary font-mono-code text-xs font-bold hover:bg-primary-container transition-colors cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-sm">folder</span>
              View Projects
            </button>
            <button
              onClick={() => {
                soundManager.playClick('tab');
                onNavigate('contact');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-primary/40 text-primary font-mono-code text-xs font-bold hover:bg-primary/10 transition-colors cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-sm">send</span>
              Contact Me
            </button>
          </div>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-mono-code text-primary font-bold flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-lg">folder_special</span>
            FEATURED PROJECTS
          </h2>
          <button
            onClick={() => {
              soundManager.playClick('tab');
              onNavigate('projects');
            }}
            className="font-mono-code text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View all ({projectsData.length})</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {projectsData.slice(0, 4).map((project) => (
            <div
              key={project.id}
              onClick={() => {
                soundManager.playClick('action');
                onSelectProject(project);
              }}
              className="bg-surface-container-low border border-outline-variant/60 rounded p-5 hover:bg-surface-container hover:border-primary/50 transition-all duration-200 group flex flex-col h-full cursor-pointer shadow-xs"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-mono-code text-primary group-hover:text-primary-container font-bold transition-colors text-sm">
                  {project.title}
                </h3>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-surface-container-highest border border-outline-variant text-on-surface-variant">
                  {project.categories[0]}
                </span>
              </div>

              <p className="text-on-surface-variant font-body-md text-xs mb-6 flex-1 leading-relaxed line-clamp-3">
                {project.description}
              </p>

              <div className="flex items-center justify-between text-on-surface-variant font-mono-code text-xs pt-3 border-t border-outline-variant/40">
                <div className="flex gap-3">
                  <span className="flex items-center gap-1 group-hover:text-primary transition-colors text-xs">
                    <span className="material-symbols-outlined text-[14px]">visibility</span> {project.views}
                  </span>
                  <span className="flex items-center gap-1 group-hover:text-secondary transition-colors text-xs">
                    <span className="material-symbols-outlined text-[14px]">star</span> {project.stars}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-primary group-hover:scale-110 transition-transform" title="View Spec">
                  info
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GitHub Contributions Section */}
      <section className="bg-surface-container-low border border-outline-variant/60 rounded p-6 overflow-hidden shadow-xs">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-mono-code text-primary font-bold flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-lg">grid_on</span>
            CONTRIBUTIONS
          </h2>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundManager.playClick('action')}
            className="font-mono-code text-xs text-on-surface-variant hover:text-primary transition-colors"
          >
            @{GITHUB_USERNAME} · {commitSummary}
          </a>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="min-w-[760px]">
            <div className="flex text-on-surface-variant font-mono-code mb-2 ml-7 text-[11px]">
              <span className="flex-1">Jan</span>
              <span className="flex-1">Feb</span>
              <span className="flex-1">Mar</span>
              <span className="flex-1">Apr</span>
              <span className="flex-1">May</span>
              <span className="flex-1">Jun</span>
              <span className="flex-1">Jul</span>
              <span className="flex-1">Aug</span>
              <span className="flex-1">Sep</span>
              <span className="flex-1">Oct</span>
              <span className="flex-1">Nov</span>
              <span className="flex-1">Dec</span>
            </div>

            <div className="flex items-center">
              <div className="flex flex-col justify-between text-on-surface-variant font-mono-code text-[10px] mr-2 h-[90px]">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              <div className="heatmap-grid flex-1">
                {heatmapCells.map((cell, i) =>
                  cell.level < 0 ? (
                    <div key={`pad-${i}`} className="w-[11px] h-[11px]" />
                  ) : (
                    <div
                      key={i}
                      className={`heatmap-cell level-${cell.level}`}
                      title={cell.label}
                    />
                  )
                )}
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center text-on-surface-variant font-mono-code text-xs">
              <span className="text-[11px]">Active Branch: main</span>
              <div className="flex items-center gap-1.5">
                <span>Less</span>
                <div className="heatmap-cell level-0" />
                <div className="heatmap-cell level-1" />
                <div className="heatmap-cell level-2" />
                <div className="heatmap-cell level-3" />
                <div className="heatmap-cell level-4" />
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
