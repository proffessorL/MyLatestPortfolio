import React, { useState, useMemo } from 'react';
import { projectsData } from '../data/portfolioData';
import type { ProjectItem } from '../types';
import { soundManager } from '../utils/sound';

interface ProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
        const matchesCategory = selectedCategory === 'All' || project.categories.some((cat) => cat === selectedCategory);
      const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [selectedCategory, selectedStatus, searchQuery]);

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[calc(100vh-panel-header-panel-footer)] animate-fadeIn">
      {/* Filter Explorer Column (IDE Sidebar) */}
      <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-outline-variant/60 bg-surface-container-lowest p-4 space-y-6 shrink-0">
        <div className="flex items-center justify-between font-mono-code text-xs text-primary font-bold">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">folder_open</span>
            EXPLORER / FILTERS
          </span>
          <span className="text-[10px] text-outline px-1.5 py-0.5 rounded border border-outline-variant">
            {filteredProjects.length} items
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => {
              soundManager.playClick('key');
              setSearchQuery(e.target.value);
            }}
            className="w-full bg-background border border-outline-variant/60 rounded px-3 py-1.5 text-xs font-mono-code text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
          />
          {searchQuery && (
            <button
              onClick={() => {
                soundManager.playClick('action');
                setSearchQuery('');
              }}
              className="absolute right-2 top-2 text-xs text-outline hover:text-on-surface"
            >
              ×
            </button>
          )}
        </div>

        {/* Categories Section */}
        <div>
          <div className="flex items-center text-on-surface-variant font-mono-code text-xs mb-2 cursor-pointer hover:text-on-surface">
            <span className="material-symbols-outlined text-sm mr-1">keyboard_arrow_down</span>
            <span className="uppercase font-bold tracking-wider">Technologies</span>
          </div>

          <div className="ml-3 space-y-1.5">
            {['All', 'AI / ML', 'Web Development', 'Dev Tools'].map((cat) => (
              <label
                key={cat}
                onClick={() => {
                  soundManager.playClick('tab');
                  setSelectedCategory(cat);
                }}
                className={`flex items-center gap-2 cursor-pointer p-1 rounded text-xs transition-colors ${
                  selectedCategory === cat ? 'bg-surface-container text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                  className="accent-primary h-3 w-3"
                />
                <span className="font-mono-code">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status Section */}
        <div>
          <div className="flex items-center text-on-surface-variant font-mono-code text-xs mb-2 cursor-pointer hover:text-on-surface">
            <span className="material-symbols-outlined text-sm mr-1">keyboard_arrow_down</span>
            <span className="uppercase font-bold tracking-wider">Status</span>
          </div>

          <div className="ml-3 space-y-1.5">
            {[
              { label: 'All', color: '' },
              { label: 'Completed', color: 'bg-secondary' },
              { label: 'In Progress', color: 'bg-tertiary' },
            ].map((stat) => (
              <label
                key={stat.label}
                onClick={() => {
                  soundManager.playClick('tab');
                  setSelectedStatus(stat.label);
                }}
                className={`flex items-center gap-2 cursor-pointer p-1 rounded text-xs transition-colors ${
                  selectedStatus === stat.label ? 'bg-surface-container text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  checked={selectedStatus === stat.label}
                  onChange={() => setSelectedStatus(stat.label)}
                  className="accent-primary h-3 w-3"
                />
                <span className="font-mono-code flex items-center gap-1.5">
                  {stat.color && <span className={`w-2 h-2 rounded-full ${stat.color}`}></span>}
                  {stat.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Projects Cards Canvas */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto bg-background">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-mono-code font-bold mb-1">
              /projects
            </h1>
            <p className="font-body-md text-xs text-on-surface-variant">
              A collection of technical endeavors, open-source repositories, and production-ready systems. Click any card for system architecture & code.
            </p>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-outline-variant/60 rounded-lg bg-surface-container-low font-mono-code text-on-surface-variant">
            <span className="material-symbols-outlined text-3xl mb-2 text-outline">search_off</span>
            <p className="text-sm">No projects match the current filter criteria.</p>
            <button
              onClick={() => {
                soundManager.playClick('action');
                setSelectedCategory('All');
                setSelectedStatus('All');
                setSearchQuery('');
              }}
              className="mt-4 px-3 py-1.5 bg-primary/10 border border-primary text-primary text-xs rounded hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                onClick={() => {
                  soundManager.playClick('action');
                  onSelectProject(project);
                }}
                className="bg-surface-container-low border border-outline-variant/60 rounded-lg p-5 flex flex-col gap-4 hover:border-primary hover:bg-surface-container transition-all duration-200 group shadow-xs cursor-pointer"
              >
                <div className="h-44 w-full bg-surface-container-highest rounded border border-outline-variant/60 relative overflow-hidden group-hover:border-primary/50 transition-colors">
                  <div
                    className="bg-cover bg-center w-full h-full opacity-70 mix-blend-luminosity group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.imageUrl})` }}
                  />
                  <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm border border-outline-variant px-2.5 py-1 rounded font-mono-code text-[11px] text-secondary flex items-center gap-1.5 shadow-sm">
                    <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'Completed' ? 'bg-secondary' : 'bg-tertiary animate-pulse'}`}></span>
                    {project.status}
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm font-mono-code text-primary font-bold group-hover:text-primary-container transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-body-md text-xs text-on-surface-variant mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-surface-container-highest border border-outline-variant/60 rounded font-mono-code text-[11px] text-on-surface-variant"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3 mt-2 pt-3 border-t border-outline-variant/60">
                  <span className="flex items-center gap-1.5 text-primary text-xs font-mono-code font-semibold group-hover:translate-x-1 transition-transform">
                    <span className="material-symbols-outlined text-sm">visibility</span> View Spec & Topology
                  </span>

                  <div className="flex items-center gap-3 text-on-surface-variant font-mono-code text-xs">
                    {project.stars !== undefined && (
                      <span className="flex items-center gap-1 hover:text-secondary transition-colors">
                        <span className="material-symbols-outlined text-xs">star</span> {project.stars}
                      </span>
                    )}
                    {project.forks !== undefined && (
                      <span className="flex items-center gap-1 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-xs">call_split</span> {project.forks}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
