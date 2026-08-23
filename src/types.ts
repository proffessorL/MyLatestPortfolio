export type TabId = 'home' | 'about' | 'skills' | 'projects' | 'experience' | 'resume' | 'contact';

export type AccentTheme = 'coral' | 'cyber' | 'dracula' | 'cyan';

export interface TabInfo {
  id: TabId;
  label: string;
  filename: string;
  icon: string;
  sectionNumber: string;
}

export interface ProjectArchitectureNode {
  label: string;
  type: 'client' | 'gateway' | 'service' | 'db' | 'cache';
}

export interface ProjectOverviewFeature {
  title: string;
  description?: string;
  flowSteps?: string[];
  flowNote?: string;
}

export interface ProjectOverview {
  headline: string;
  intro: string[];
  differentiatorsTitle: string;
  differentiators: ProjectOverviewFeature[];
  reliabilityTitle?: string;
  reliability?: string[];
  oneLiner?: string;
}

export type ProjectCategory = 'AI / ML' | 'Web Development' | 'Dev Tools';

export interface ProjectOutputImage {
  src: string;
  caption?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  overview?: ProjectOverview;
  views: number;
  stars?: number;
  forks?: number;
  categories: ProjectCategory[];
  status: 'Completed' | 'In Progress';
  tags: string[];
  imageUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  architectureNodes?: ProjectArchitectureNode[];
  architectureLoop?: string[];
  architectureDiagram?: string;
  outputImages?: ProjectOutputImage[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  commits: string[];
  isCurrent?: boolean;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; percentage: number; icon: string }[];
}
