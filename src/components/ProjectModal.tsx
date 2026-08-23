import React, { useState, useEffect } from 'react';
import type { ProjectItem } from '../types';
import { soundManager } from '../utils/sound';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'output' | 'overview'>('overview');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    setSelectedImage(null);
  }, [project?.id]);

  const totalOutputImages = project?.outputImages?.length ?? 0;

  useEffect(() => {
    if (selectedImage === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
      if (e.key === 'ArrowLeft') setSelectedImage((i) => (i === null ? null : (i - 1 + totalOutputImages) % totalOutputImages));
      if (e.key === 'ArrowRight') setSelectedImage((i) => (i === null ? null : (i + 1) % totalOutputImages));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage === null, totalOutputImages]);

  if (!project) return null;

  const handleTabChange = (tab: 'architecture' | 'output' | 'overview') => {
    soundManager.playClick('tab');
    setActiveTab(tab);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-surface-container-low border border-outline-variant rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="p-4 border-b border-outline-variant/60 bg-surface-container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-xl">terminal</span>
            <div>
              <h2 className="font-mono-code font-bold text-base text-on-surface flex items-center gap-2">
                {project.title}
                {project.categories.map((cat) => (
                  <span key={cat} className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-primary/10 border border-primary/30 text-primary">
                    {cat}
                  </span>
                ))}
              </h2>
              <span className="font-mono-code text-[11px] text-outline">projects/{project.id}.spec.ts</span>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick('action');
              onClose();
            }}
            className="p-1.5 rounded text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Sub-Tabs */}
        <div className="flex border-b border-outline-variant/60 bg-surface-container-lowest px-4 gap-2 text-xs font-mono-code">
          <button
            onClick={() => handleTabChange('overview')}
            className={`px-3 py-2 cursor-pointer transition-colors border-b-2 ${
              activeTab === 'overview'
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Overview
          </button>
          {(project.architectureNodes || project.architectureLoop || project.architectureDiagram) && (
            <button
              onClick={() => handleTabChange('architecture')}
              className={`px-3 py-2 cursor-pointer transition-colors border-b-2 ${
                activeTab === 'architecture'
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              System Architecture
            </button>
          )}
          {project.outputImages && project.outputImages.length > 0 && (
            <button
              onClick={() => handleTabChange('output')}
              className={`px-3 py-2 cursor-pointer transition-colors border-b-2 ${
                activeTab === 'output'
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Project Output
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Project Image Header */}
              {project.imageUrl && (
                <div className="h-56 w-full rounded-lg border border-outline-variant/60 overflow-hidden relative">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm border border-outline-variant px-3 py-1 rounded text-xs font-mono-code text-secondary flex items-center gap-1.5 shadow-sm">
                    <span className={`w-2 h-2 rounded-full ${project.status === 'Completed' ? 'bg-secondary' : 'bg-tertiary animate-pulse'}`}></span>
                    {project.status}
                  </div>
                </div>
              )}

              {/* Rich Overview / Description */}
              {project.overview ? (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h2 className="font-mono-code font-bold text-lg text-primary">{project.overview.headline}</h2>
                    {project.overview.intro.map((paragraph, i) => (
                      <p key={i} className="text-sm text-on-surface leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-mono-code text-xs font-bold text-primary uppercase tracking-wider">
                      {project.overview.differentiatorsTitle}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {project.overview.differentiators.map((feature, i) =>
                        feature.flowSteps ? (
                          <div
                            key={i}
                            className="sm:col-span-2 bg-surface-container rounded-lg border border-secondary/40 p-5 space-y-4"
                          >
                            <h4 className="font-mono-code text-sm font-bold text-secondary flex items-center gap-2">
                              <span className="text-outline">0{i + 1}.</span> {feature.title}
                            </h4>
                            <div className="flex flex-col items-center py-1">
                              {feature.flowSteps.map((step, j) => (
                                <React.Fragment key={step}>
                                  {j > 0 && (
                                    <span className="material-symbols-outlined text-secondary text-sm my-0.5">south</span>
                                  )}
                                  <span className="px-4 py-1.5 rounded bg-background border border-outline-variant/80 font-mono-code text-xs text-on-surface shadow-xs min-w-[190px] text-center">
                                    {step}
                                  </span>
                                </React.Fragment>
                              ))}
                              <span className="material-symbols-outlined text-primary text-lg mt-1.5 animate-pulse">
                                autorenew
                              </span>
                            </div>
                            {feature.flowNote && (
                              <p className="text-xs md:text-sm text-on-surface-variant text-center leading-relaxed max-w-xl mx-auto">
                                {feature.flowNote}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div
                            key={i}
                            className="bg-surface-container rounded-lg border border-outline-variant/60 p-4 space-y-2 hover:border-primary/40 transition-colors"
                          >
                            <h4 className="font-mono-code text-sm font-bold text-on-surface">
                              <span className="text-outline mr-1.5">0{i + 1}.</span>
                              {feature.title}
                            </h4>
                            <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {project.overview.reliability && project.overview.reliability.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-mono-code text-xs font-bold text-primary uppercase tracking-wider">
                        {project.overview.reliabilityTitle ?? 'Why It Is More Reliable'}
                      </h3>
                      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                        {project.overview.reliability.map((item) => {
                          const [label, detail] = item.split('→').map((part) => part.trim());
                          return (
                            <li key={item} className="flex items-start gap-2 text-xs md:text-sm">
                              <span className="material-symbols-outlined text-secondary text-base mt-0.5">verified</span>
                              <span className="leading-relaxed">
                                <span className="font-bold text-on-surface">{label}</span>
                                {detail && <span className="text-on-surface-variant"> → {detail}</span>}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {project.overview.oneLiner && (
                    <div className="bg-gradient-to-r from-primary/15 via-secondary/10 to-primary/15 border border-primary/40 rounded-lg p-4 flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-lg mt-0.5">tips_and_updates</span>
                      <p className="text-xs md:text-sm text-on-surface leading-relaxed">
                        <span className="font-mono-code font-bold text-primary uppercase tracking-wider text-[11px] block mb-1">
                          In One Sentence
                        </span>
                        {project.overview.oneLiner}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2 font-sans">
                  <h3 className="font-mono-code text-xs font-bold text-primary uppercase tracking-wider">Project Specification</h3>
                  <p className="text-sm text-on-surface leading-relaxed">
                    {project.fullDescription || project.description}
                  </p>
                </div>
              )}

              {/* Tech Badges */}
              <div className="space-y-2">
                <h3 className="font-mono-code text-xs font-bold text-primary uppercase tracking-wider">Tech Stack Tags</h3>
                <div className="flex flex-wrap gap-2 font-mono-code text-xs">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-surface-container border border-outline-variant/60 rounded text-on-surface-variant">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (project.architectureNodes || project.architectureLoop || project.architectureDiagram) && (
            <div className="space-y-6">
              {/* Emphasized Core Loop */}
              {project.architectureLoop && (
                <div className="space-y-2">
                  <h3 className="font-mono-code text-xs font-bold text-primary uppercase tracking-wider">
                    Core Feedback Loop
                  </h3>
                  <div className="relative bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-primary/40 rounded-lg px-4 py-6 overflow-hidden shadow-sm">
                    <div
                      className="absolute inset-0 opacity-[0.07] pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(circle, var(--color-primary) 1px, transparent 1px)',
                        backgroundSize: '14px 14px',
                      }}
                    />
                    <div className="relative flex flex-wrap items-center justify-center gap-y-3 font-mono-code">
                      {project.architectureLoop.map((step, index) => {
                        const isAnchor = step === 'Telemetry';
                        return (
                          <React.Fragment key={`${step}-${index}`}>
                            {index > 0 && (
                              <span className="material-symbols-outlined text-secondary text-base mx-1">east</span>
                            )}
                            <span
                              className={`px-4 py-2 rounded-md font-bold text-xs md:text-sm tracking-wide transition-transform hover:scale-105 ${
                                isAnchor
                                  ? 'bg-primary text-on-primary border border-primary shadow-md'
                                  : 'bg-background text-on-surface border border-primary/50 shadow-xs'
                              }`}
                            >
                              {step}
                            </span>
                          </React.Fragment>
                        );
                      })}
                      <span className="material-symbols-outlined text-primary text-xl ml-2 animate-pulse" title="Loops back to Telemetry">
                        autorenew
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Architecture ASCII Diagram */}
              {project.architectureDiagram && (
                <div className="space-y-2">
                  <h3 className="font-mono-code text-xs font-bold text-primary uppercase tracking-wider">
                    System Topology & Data Pipeline
                  </h3>
                  <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-lg overflow-x-auto shadow-xs">
                    <pre className="p-6 min-w-max font-mono-code text-[11px] md:text-xs leading-relaxed text-on-surface whitespace-pre">
                      {project.architectureDiagram}
                    </pre>
                  </div>
                </div>
              )}

              {/* Legacy Node Graph */}
              {project.architectureNodes && (
                <div className="bg-surface-container p-6 rounded-lg border border-outline-variant/60 space-y-4">
                  <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 font-mono-code text-xs">
                    {project.architectureNodes.map((node, index) => (
                      <React.Fragment key={index}>
                        <div className="flex flex-col items-center p-3 rounded bg-background border border-outline-variant/80 min-w-[130px] text-center shadow-xs">
                          <span className="text-primary font-bold text-sm mb-1">{node.label}</span>
                          <span className="text-[10px] text-outline uppercase tracking-wider">{node.type}</span>
                        </div>
                        {index < project.architectureNodes!.length - 1 && (
                          <span className="material-symbols-outlined text-secondary text-lg">arrow_forward</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'output' && project.outputImages && project.outputImages.length > 0 && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {project.outputImages.map((image, index) => (
                  <figure
                    key={index}
                    className="space-y-2 group cursor-pointer"
                    onClick={() => {
                      soundManager.playClick('action');
                      setSelectedImage(index);
                    }}
                  >
                    <div className="h-48 w-full rounded-lg border border-outline-variant/80 overflow-hidden bg-surface-container-lowest relative">
                      <img
                        src={image.src}
                        alt={image.caption || `${project.title} output ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-background/0 group-hover:bg-background/25 transition-colors flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-surface opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 border border-outline-variant rounded-full p-2 shadow-sm">
                          zoom_in
                        </span>
                      </div>
                    </div>
                    <figcaption className="font-mono-code text-[11px] text-outline text-center truncate px-2">
                      {image.caption || `${project.id}_output_${index + 1}`}
                    </figcaption>
                  </figure>
                ))}
              </div>

              {/* Lightbox */}
              {selectedImage !== null && (
                <div
                  className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fadeIn cursor-zoom-out"
                  onClick={() => setSelectedImage(null)}
                >
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-surface-container border border-outline-variant text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                    aria-label="Close image"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundManager.playClick('action');
                      setSelectedImage((i) => (i === null ? null : (i - 1 + project.outputImages!.length) % project.outputImages!.length));
                    }}
                    className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-surface-container/90 border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary backdrop-blur-sm transition-colors cursor-pointer shadow-lg"
                    aria-label="Previous image"
                  >
                    <span className="material-symbols-outlined text-xl md:text-2xl">chevron_left</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundManager.playClick('action');
                      setSelectedImage((i) => (i === null ? null : (i + 1) % project.outputImages!.length));
                    }}
                    className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-surface-container/90 border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary backdrop-blur-sm transition-colors cursor-pointer shadow-lg"
                    aria-label="Next image"
                  >
                    <span className="material-symbols-outlined text-xl md:text-2xl">chevron_right</span>
                  </button>

                  <figure
                    className="max-w-5xl w-full space-y-3 px-12 md:px-16"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={project.outputImages[selectedImage].src}
                      alt={project.outputImages[selectedImage].caption || `${project.title} output`}
                      className="w-full max-h-[78vh] object-contain rounded-lg border border-outline-variant/80 shadow-2xl bg-background"
                    />
                    <figcaption className="font-mono-code text-xs text-outline text-center">
                      {project.outputImages[selectedImage].caption || `${project.title} — Output ${selectedImage + 1}`}
                      <span className="ml-2 text-primary">
                        [ {selectedImage + 1} / {project.outputImages.length} ]
                      </span>
                    </figcaption>
                  </figure>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="p-4 border-t border-outline-variant/60 bg-surface-container flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundManager.playClick('action')}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary font-mono-code text-xs font-bold rounded hover:bg-primary-container transition-colors"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span> Live Demo
              </a>
            )}
          </div>

          <button
            onClick={() => {
              soundManager.playClick('action');
              onClose();
            }}
            className="px-4 py-2 text-on-surface-variant hover:text-on-surface font-mono-code text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
