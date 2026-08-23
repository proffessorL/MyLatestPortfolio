import React, { useEffect, useMemo, useState } from 'react';
import { skillsCategories } from '../data/portfolioData';

const CATEGORY_ACCENTS = [
  { tile: 'bg-primary/10 border-primary/30', icon: 'text-primary', bar: 'bg-primary' },
  { tile: 'bg-secondary/10 border-secondary/30', icon: 'text-secondary', bar: 'bg-secondary' },
  { tile: 'bg-tertiary/10 border-tertiary/30', icon: 'text-tertiary', bar: 'bg-tertiary' },
  { tile: 'bg-primary/10 border-primary/30', icon: 'text-primary', bar: 'bg-primary' },
];

const TOTAL_BLOCKS = 12;

const levelLabel = (pct: number): string =>
  pct >= 90 ? 'expert' : pct >= 75 ? 'advanced' : 'proficient';

export const Skills: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  const stats = useMemo(() => {
    const all = skillsCategories.flatMap((c) => c.skills);
    const avg = Math.round(all.reduce((sum, s) => sum + s.percentage, 0) / all.length);
    const top = all.reduce((best, s) => (s.percentage > best.percentage ? s : best), all[0]);
    return { count: all.length, avg, top };
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-outline-variant pb-4 flex justify-between items-end">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface font-mono-code font-bold mb-1">
            system.config.skills
          </h1>
          <p className="font-mono-code text-xs text-outline">// Technical proficiency matrix and environment setup</p>
        </div>
        <div className="flex items-center space-x-2 text-secondary font-label-sm text-xs">
          <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_6px_rgba(103,223,112,0.8)]"></div>
          <span>System Status: Online</span>
        </div>
      </div>

      {/* Overview Strip */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-surface-container border border-outline-variant/60">
          <span className="material-symbols-outlined text-sm text-primary">integration_instructions</span>
          <span className="font-mono-code font-bold text-primary">{stats.count}</span>
          <span className="text-on-surface-variant font-mono-code text-xs">Technologies</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-surface-container border border-outline-variant/60">
          <span className="material-symbols-outlined text-sm text-secondary">speed</span>
          <span className="font-mono-code font-bold text-secondary">{stats.avg}%</span>
          <span className="text-on-surface-variant font-mono-code text-xs">Avg. Proficiency</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-surface-container border border-outline-variant/60">
          <span className="material-symbols-outlined text-sm text-tertiary">star</span>
          <span className="text-on-surface-variant font-mono-code text-xs">
            Top: <span className="text-tertiary font-bold">{stats.top.name}</span> ({stats.top.percentage}%)
          </span>
        </div>
      </div>

      {/* Grid of Skill Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        {skillsCategories.map((category, cIndex) => {
          const accent = CATEGORY_ACCENTS[cIndex % CATEGORY_ACCENTS.length];
          const catAvg = Math.round(
            category.skills.reduce((sum, s) => sum + s.percentage, 0) / category.skills.length
          );

          return (
            <div
              key={category.title}
              className="bg-surface-container-low border border-outline-variant p-5 rounded-lg flex flex-col hover:border-primary/40 transition-colors shadow-xs"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-outline-variant">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex items-center justify-center w-9 h-9 rounded-md border ${accent.tile}`}
                  >
                    <span className={`material-symbols-outlined text-lg ${accent.icon}`}>
                      {category.icon}
                    </span>
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface uppercase tracking-wider font-bold">
                    {category.title}
                  </h2>
                </div>
                <span className="font-mono-code text-[10px] px-2 py-0.5 rounded bg-surface-container border border-outline-variant/60 text-on-surface-variant">
                  {category.skills.length} skills · avg {catAvg}%
                </span>
              </div>

              <div className="space-y-1 flex-1">
                {category.skills.map((skill, sIndex) => {
                  const filledBlocks = Math.round((skill.percentage / 100) * TOTAL_BLOCKS);

                  return (
                    <div
                      key={skill.name}
                      className="group flex items-center justify-between gap-4 px-2 py-2 rounded-md hover:bg-surface-container transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 w-40 sm:w-48 shrink-0">
                        <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[18px]">
                          {skill.icon}
                        </span>
                        <span
                          className="font-mono-code text-xs sm:text-sm text-on-surface font-medium group-hover:text-primary transition-colors truncate"
                          title={skill.name}
                        >
                          {skill.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 flex-1 justify-end min-w-0">
                        <div className="flex gap-[3px] shrink-0" aria-hidden="true">
                          {Array.from({ length: TOTAL_BLOCKS }).map((_, block) => (
                            <span
                              key={block}
                              className={`w-[6px] sm:w-2 h-3.5 sm:h-4 rounded-[2px] transition-all duration-300 ${
                                block < filledBlocks && mounted
                                  ? accent.bar
                                  : 'bg-surface-container-highest'
                              }`}
                              style={{ transitionDelay: `${cIndex * 150 + sIndex * 60 + block * 25}ms` }}
                            />
                          ))}
                        </div>

                        <div className="w-16 sm:w-20 text-right shrink-0">
                          <div className="font-mono-code text-xs font-bold text-on-surface leading-tight">
                            {skill.percentage}%
                          </div>
                          <div className="font-mono-code text-[9px] text-outline leading-tight">
                            {levelLabel(skill.percentage)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
