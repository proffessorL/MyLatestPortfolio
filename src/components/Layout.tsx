import React, { useState, useEffect, useRef } from 'react';
import type { TabId, TabInfo, ProjectItem, AccentTheme } from '../types';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Skills } from '../pages/Skills';
import { Projects } from '../pages/Projects';
import { Experience } from '../pages/Experience';
import { Resume } from '../pages/Resume';
import { Contact } from '../pages/Contact';
import { ProjectModal } from './ProjectModal';
import { soundManager } from '../utils/sound';
import { StatsProvider } from '../lib/stats';

const TABS: TabInfo[] = [
  { id: 'home', label: 'Home', filename: 'dashboard.tsx', icon: 'home', sectionNumber: 'Home' },
  { id: 'about', label: 'About', filename: 'about_me.ts', icon: 'person', sectionNumber: 'About' },
  { id: 'skills', label: 'Skills', filename: 'skills.config', icon: 'code', sectionNumber: 'Skills' },
  { id: 'projects', label: 'Projects', filename: 'projects.ts', icon: 'folder', sectionNumber: 'Projects' },
  { id: 'experience', label: 'Experience', filename: 'experience.log', icon: 'work', sectionNumber: 'Experience' },
  { id: 'resume', label: 'Resume', filename: 'resume.pdf', icon: 'description', sectionNumber: 'Resume' },
  { id: 'contact', label: 'Contact', filename: 'contacts.json', icon: 'mail', sectionNumber: 'Contact' },
];

const ACCENTS: { id: AccentTheme; label: string; primary: string; container: string }[] = [
  { id: 'coral', label: 'Terminal Coral', primary: '#ffb59c', container: '#ff7f50' },
  { id: 'cyber', label: 'Cyber Green', primary: '#67df70', container: '#00ff66' },
  { id: 'dracula', label: 'Dracula Purple', primary: '#bd93f9', container: '#ff79c6' },
  { id: 'cyan', label: 'Electric Cyan', primary: '#7af4ff', container: '#00e5ff' },
];

export const Layout: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<TabId>('home');
  const [openTabIds, setOpenTabIds] = useState<TabId[]>(() => {
    // If on mobile (width < 768px), start with only the active tab or home tab to avoid adding extra tabs under the navbar
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return ['home'];
    }
    return ['home', 'projects', 'skills'];
  });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [accentTheme, setAccentTheme] = useState<AccentTheme>('coral');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  // Close 3-dot options menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOptionsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectTab = (id: TabId) => {
    soundManager.playClick('tab');
    setActiveTabId(id);
    if (!openTabIds.includes(id)) {
      // On mobile view (< 768px), keep only the currently selected tab to prevent multiple tabs/tab bar clutter
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        setOpenTabIds([id]);
      } else {
        setOpenTabIds((prev) => [...prev, id]);
      }
    }
    setIsMobileMenuOpen(false);
    setIsOptionsMenuOpen(false);
  };

  const handleCloseTab = (e: React.MouseEvent, id: TabId) => {
    e.stopPropagation();
    soundManager.playClick('action');
    if (openTabIds.length === 1) return;
    const updated = openTabIds.filter((t) => t !== id);
    setOpenTabIds(updated);
    if (activeTabId === id) {
      setActiveTabId(updated[updated.length - 1]);
    }
  };

  const toggleTheme = () => {
    soundManager.playClick('action');
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const toggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) soundManager.playClick('action');
  };

  const changeAccentTheme = (theme: AccentTheme) => {
    soundManager.playClick('action');
    setAccentTheme(theme);
    const accent = ACCENTS.find((a) => a.id === theme) || ACCENTS[0];
    document.documentElement.style.setProperty('--color-primary', accent.primary);
    document.documentElement.style.setProperty('--color-primary-container', accent.container);
  };

  return (
    <StatsProvider>
      <div className="flex flex-col h-dvh w-screen overflow-hidden bg-background text-on-surface select-none">
      {/* Sleek Header Navigation */}
      <header className="h-panel-header px-4 md:px-6 bg-background border-b border-outline-variant/60 flex items-center justify-between z-50 shrink-0 shadow-xs">
        {/* Brand Logo & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick('action');
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="md:hidden p-1.5 text-on-surface hover:text-primary rounded-md hover:bg-surface-container transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>

          <div
            onClick={() => handleSelectTab('home')}
            className="flex items-center gap-2 cursor-pointer group py-1 px-2 rounded-md hover:bg-surface-container/50 transition-colors"
          >
            <span className="font-mono-code text-primary font-bold text-base">&lt;/&gt;</span>
            <span className="font-mono-code font-bold text-base text-on-surface tracking-tight group-hover:text-primary transition-colors">
              EUSHA<span className="text-primary font-normal">.dev</span>
            </span>
          </div>
        </div>

        {/* Clear Primary Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-surface-container-low/60 p-1 rounded-lg border border-outline-variant/40">
          {TABS.slice(0, 5).map((tab) => {
            const isActive = activeTabId === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleSelectTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-md font-mono-code text-xs font-medium cursor-pointer transition-all duration-150 ${
                  isActive
                    ? 'bg-primary/15 text-primary border border-primary/30 font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right Side Actions & 3-Dot Options Menu */}
        <div className="flex items-center gap-2.5">
          {/* Availability Status Badge */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-secondary/10 border border-secondary/25 text-secondary text-[11px] font-mono-code font-medium">
            <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_6px_rgba(103,223,112,0.8)] animate-pulse"></span>
            <span>Available for work</span>
          </div>

          {/* Contact CTA */}
          <button
            onClick={() => handleSelectTab('contact')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-primary text-on-primary font-mono-code text-xs font-bold hover:bg-primary-container transition-colors cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-sm">send</span>
            <span className="hidden sm:inline">Contact</span>
          </button>

          {/* 3-Dot Options Menu Button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => {
                soundManager.playClick('action');
                setIsOptionsMenuOpen(!isOptionsMenuOpen);
              }}
              className={`p-1.5 rounded-md border text-on-surface transition-colors cursor-pointer flex items-center justify-center ${
                isOptionsMenuOpen
                  ? 'bg-surface-container border-primary text-primary'
                  : 'bg-surface-container-low border-outline-variant/60 hover:border-primary/40 hover:text-primary'
              }`}
              title="More IDE Options & Themes"
              aria-label="3 dot menu options"
            >
              <span className="material-symbols-outlined text-xl">more_vert</span>
            </button>

            {/* 3-Dot Dropdown Menu Popover */}
            {isOptionsMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-surface-container-low border border-outline-variant rounded-lg shadow-2xl p-3 z-50 font-mono-code text-xs space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between text-outline text-[11px] pb-1 border-b border-outline-variant/60 font-bold uppercase tracking-wider">
                  <span>IDE Settings</span>
                  <span className="text-primary font-normal text-[10px]">v2.4</span>
                </div>

                {/* Accent Theme Picker Section */}
                <div className="space-y-1.5">
                  <span className="text-on-surface-variant text-[11px] block font-semibold">
                    Dynamic Accent Color:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {ACCENTS.map((acc) => {
                      const isSelected = accentTheme === acc.id;
                      return (
                        <button
                          key={acc.id}
                          onClick={() => changeAccentTheme(acc.id)}
                          className={`flex items-center gap-2 p-1.5 rounded border transition-colors cursor-pointer text-left text-[11px] ${
                            isSelected
                              ? 'bg-primary/10 border-primary text-primary font-bold'
                              : 'bg-surface-container border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:border-outline-variant'
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: acc.container }}
                          />
                          <span className="truncate">{acc.label.split(' ')[0]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Controls Section */}
                <div className="pt-2 border-t border-outline-variant/60 space-y-1">
                  {/* Sound FX Toggle */}
                  <button
                    onClick={toggleMute}
                    className="w-full flex items-center justify-between p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface cursor-pointer text-[11px]"
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">
                        {isMuted ? 'volume_off' : 'volume_up'}
                      </span>
                      Sound FX (Audio)
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${isMuted ? 'text-outline border-outline-variant' : 'text-primary border-primary/30 bg-primary/10'}`}>
                      {isMuted ? 'OFF' : 'ON'}
                    </span>
                  </button>

                  {/* Dark/Light Mode Toggle */}
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-between p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface cursor-pointer text-[11px]"
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">
                        {isDarkMode ? 'dark_mode' : 'light_mode'}
                      </span>
                      Appearance Mode
                    </span>
                    <span className="text-[10px] text-primary px-1.5 py-0.5 rounded border border-primary/30 bg-primary/10">
                      {isDarkMode ? 'Dark' : 'Light'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Workspace Body */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Drawer Scrim */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-background/70 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar (Desktop + Mobile Drawer) */}
        <aside
          className={`fixed md:static inset-y-0 left-0 top-panel-header bottom-panel-footer w-panel-sidebar bg-surface border-r border-outline-variant/60 z-40 flex flex-col transition-transform duration-200 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="flex flex-col h-full py-4 overflow-y-auto">
            {/* Navigation Group */}
            <div className="mb-6">
              <h3 className="px-4 mb-2 font-mono-code text-[11px] text-primary font-bold uppercase tracking-wider">
                EXPLORER
              </h3>
              <nav className="flex flex-col space-y-0.5">
                {TABS.map((tab) => {
                  const isActive = activeTabId === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleSelectTab(tab.id)}
                      className={`flex items-center px-4 py-2 font-mono-code text-xs transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'text-primary bg-primary/10 border-l-2 border-primary font-semibold'
                          : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined mr-3 text-base">{tab.icon}</span>
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* External Links */}
            <div className="mb-auto">
              <h3 className="px-4 mb-2 font-mono-code text-[11px] text-primary font-bold uppercase tracking-wider">
                EXTERNAL LINKS
              </h3>
              <nav className="flex flex-col space-y-0.5">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playClick('action')}
                  className="text-on-surface-variant flex items-center px-4 py-2 font-mono-code text-xs hover:bg-surface-container-high hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined mr-3 text-base">code_blocks</span>
                  GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playClick('action')}
                  className="text-on-surface-variant flex items-center px-4 py-2 font-mono-code text-xs hover:bg-surface-container-high hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined mr-3 text-base">link</span>
                  LinkedIn
                </a>
              </nav>
            </div>

            {/* Terminal Status Widget */}
            <div className="px-4 mt-6">
              <div className="border border-outline-variant/60 rounded-md bg-surface-container p-3 font-mono-code text-xs text-on-surface-variant shadow-xs">
                <div className="w-2 h-2 rounded-full bg-secondary mb-2"></div>
                <p className="leading-relaxed text-[11px]">
                  Welcome to my portfolio!<br />
                  <span className="text-primary font-bold">&gt; Status:</span> Ready<span className="text-primary animate-pulse font-bold">_</span>
                </p>
              </div>
            </div>

            {/* Quick Settings Bar */}
            <div className="mt-4 flex px-4 gap-4 text-on-surface-variant border-t border-outline-variant/60 pt-3">
              <button
                onClick={() => handleSelectTab('about')}
                className="hover:text-primary transition-colors cursor-pointer"
                title="Profile"
              >
                <span className="material-symbols-outlined text-lg">account_circle</span>
              </button>
              <button
                onClick={() => handleSelectTab('skills')}
                className="hover:text-primary transition-colors cursor-pointer"
                title="Settings"
              >
                <span className="material-symbols-outlined text-lg">settings</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Workspace Stage */}
        <div className="flex-1 flex flex-col overflow-hidden bg-background">
          {/* Streamlined File Tab Bar */}
          <div className="h-9 border-b border-outline-variant/60 bg-surface-container-low flex items-center px-2 gap-1 overflow-x-auto shrink-0">
            {openTabIds.map((id) => {
              const tab = TABS.find((t) => t.id === id);
              if (!tab) return null;
              const isActive = activeTabId === id;

              return (
                <div
                  key={id}
                  onClick={() => handleSelectTab(id)}
                  className={`px-3 py-1 text-xs font-mono-code rounded-t-md flex items-center gap-2 cursor-pointer border-t border-x transition-all duration-150 shrink-0 ${
                    isActive
                      ? 'bg-background border-t-primary border-x-outline-variant/60 text-primary font-semibold shadow-xs'
                      : 'bg-transparent border-transparent text-on-surface-variant hover:bg-surface-container-high/60 hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-xs">{tab.icon}</span>
                  <span>{tab.filename}</span>
                  <button
                    onClick={(e) => handleCloseTab(e, id)}
                    className="hover:text-primary p-0.5 rounded text-[11px] cursor-pointer"
                    title="Close tab"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>

          {/* Active View Container */}
          <main className="flex-1 overflow-y-auto pb-panel-footer">
            {activeTabId === 'home' && (
              <Home onNavigate={handleSelectTab} onSelectProject={(p) => setSelectedProject(p)} />
            )}
            {activeTabId === 'about' && <About onNavigate={handleSelectTab} />}
            {activeTabId === 'skills' && <Skills />}
            {activeTabId === 'projects' && (
              <Projects onSelectProject={(p) => setSelectedProject(p)} />
            )}
            {activeTabId === 'experience' && <Experience />}
            {activeTabId === 'resume' && <Resume />}
            {activeTabId === 'contact' && <Contact />}
          </main>
        </div>
      </div>

      {/* Project Spec & Architecture Drawer Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Bottom Status Footer */}
      <footer className="h-panel-footer bg-surface-container-low border-t border-outline-variant/60 flex justify-between items-center px-3 md:px-4 text-xs font-mono-code text-secondary shrink-0 z-50 overflow-hidden">
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center gap-1 text-secondary cursor-default shrink-0">
            <span className="material-symbols-outlined text-[14px]">call_split</span>
            <span>main</span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-on-surface-variant text-[11px]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-secondary">check_circle</span> 0 errors
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-primary">warning</span> 0 warnings
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-on-surface-variant text-[11px]">
          <span className="hover:text-on-surface transition-colors">Powered by Node.js & React</span>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">check</span>
            <span>Prettier</span>
          </div>
        </div>
      </footer>
      </div>
    </StatsProvider>
  );
};
