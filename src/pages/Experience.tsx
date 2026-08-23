import React from 'react';
import { experienceData } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-outline-variant pb-4 flex justify-between items-end">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface font-mono-code font-bold mb-1">
            Experience Log
          </h1>
          <p className="font-mono-code text-xs text-outline">
            ~/workspace/eusha.dev/experience $ git log --oneline --graph
          </p>
        </div>
        <span className="font-mono-code text-xs px-2.5 py-1 rounded bg-primary/10 border border-primary/30 text-primary">
          {experienceData.length} Commits
        </span>
      </div>

      {/* Git Timeline Container */}
      <div className="relative git-timeline pl-12 md:pl-16 py-4 space-y-12">
        {experienceData.map((exp, index) => (
          <div key={exp.id} className="relative group">
            {/* Git Commit Node */}
            <div
              className={`git-node top-2 transition-colors duration-300 ${
                index === 0
                  ? 'bg-primary border-primary shadow-[0_0_10px_rgba(255,127,80,0.8)]'
                  : 'border-outline group-hover:border-primary'
              }`}
            />

            {/* Commit Experience Card */}
            <div className="bg-surface-container-low border border-outline-variant rounded-lg p-6 hover:border-primary transition-all duration-300 shadow-sm">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                <div>
                  <h3 className="font-headline-lg text-headline-lg text-primary font-mono-code font-bold mb-1 group-hover:text-primary-container transition-colors">
                    {exp.role}
                  </h3>
                  <p className="font-mono-code text-xs text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-xs text-secondary">domain</span>
                    {exp.company}
                  </p>
                </div>

                <div className="font-mono-code text-xs text-primary bg-surface-container-high px-3 py-1 rounded border border-outline-variant inline-block">
                  {exp.period}
                </div>
              </div>

              {/* Commit Bullet Items */}
              <div className="font-body-md text-xs md:text-sm text-on-surface-variant space-y-2.5 pt-2">
                {exp.commits.map((commitMsg, cIndex) => (
                  <p key={cIndex} className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-xs text-secondary mt-1 shrink-0 font-bold">
                      commit
                    </span>
                    <span className="leading-relaxed">{commitMsg}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Download Action */}
      <div className="mt-8 flex justify-center">
        <a
          href="#download"
          onClick={(e) => {
            e.preventDefault();
            alert('Resume file download initialized.');
          }}
          className="flex items-center gap-2 px-6 py-2.5 rounded font-mono-code text-xs text-primary border border-primary hover:bg-primary hover:text-on-primary transition-all duration-200 cursor-pointer shadow-sm"
        >
          <span className="material-symbols-outlined text-sm">download</span>
          Download Resume.pdf
        </a>
      </div>
    </div>
  );
};
