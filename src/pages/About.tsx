import React from 'react';
import type { TabId } from '../types';
import { soundManager } from '../utils/sound';

interface AboutProps {
  onNavigate: (tabId: TabId) => void;
}

const Ln: React.FC<{ n: number; children: React.ReactNode }> = ({ n, children }) => (
  <div className="flex gap-4">
    <span className="w-6 shrink-0 text-right text-outline/50 select-none">{n}</span>
    <div className="flex-1 min-w-0">{children}</div>
  </div>
);

const TechChip: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center font-mono-code text-[10px] px-2 py-0.5 rounded bg-background border border-outline-variant/60 text-on-surface-variant">
    {label}
  </span>
);

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-outline-variant pb-4 flex justify-between items-end">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold font-mono-code mb-1">
            about_me.ts
          </h1>
          <p className="font-mono-code text-xs text-outline">// Engineering background, principles, and system specifications</p>
        </div>
        <span className="font-mono-code text-xs px-2 py-1 rounded bg-secondary/10 text-secondary border border-secondary/30">
          Status: ACTIVE
        </span>
      </div>

      {/* Main Code View Container */}
      <div className="bg-surface-container-low border border-outline-variant rounded-lg p-6 font-mono-code text-sm space-y-4 shadow-sm">

        <Ln n={1}>
          <div className="text-outline text-xs">// 01. System Profile Overview</div>
        </Ln>
        <Ln n={2}>
          <span className="text-primary font-bold">export const</span> <span className="text-on-surface">developerProfile</span> = &#123;
        </Ln>
        <Ln n={3}>
          <div className="pl-6"><span className="text-tertiary">name:</span> <span className="text-secondary">'Eusha'</span>,</div>
        </Ln>
        <Ln n={4}>
          <div className="pl-6"><span className="text-tertiary">role:</span> <span className="text-secondary">'Full-Stack Web Developer & AI/ML Integration Engineer'</span>,</div>
        </Ln>
        <Ln n={5}>
          <div className="pl-6"><span className="text-tertiary">location:</span> <span className="text-secondary">'Worldwide / Remote'</span>,</div>
        </Ln>
        <Ln n={6}>
          <div className="pl-6"><span className="text-tertiary">specialization:</span> [<span className="text-secondary">'Full-Stack Web Development'</span>, <span className="text-secondary">'AI/ML Integration'</span>, <span className="text-secondary">'REST & GraphQL APIs'</span>, <span className="text-secondary">'Database Design'</span>, <span className="text-secondary">'System Architecture'</span>] <span className="text-outline">// + others relevant to these sectors</span>,</div>
        </Ln>
        <Ln n={7}>
          <div className="pl-6"><span className="text-tertiary">availableForHire:</span> <span className="text-primary">true</span>,</div>
        </Ln>
        <Ln n={8}>&#125;;</Ln>

        <Ln n={9}><div className="h-px bg-outline-variant/40" /></Ln>

        <Ln n={10}>
          <div className="text-outline text-xs">// 02. Biography & Development Journey</div>
        </Ln>
        <Ln n={11}>
          <p className="text-on-surface font-body-md text-sm leading-relaxed font-sans">
            I'm an IT student and developer who enjoys turning ideas into working software. My
            journey started with programming fundamentals and gradually led me into web development,
            where I began building responsive interfaces, interactive applications, and full-stack
            projects.
          </p>
        </Ln>
        <Ln n={12}>
          <p className="text-on-surface font-body-md text-sm leading-relaxed font-sans">
            Today, I work primarily with JavaScript, React, Python, and modern web technologies,
            while also exploring backend development and AI integration. I've worked on projects
            ranging from student-focused platforms and e-commerce applications to AI-powered systems.
          </p>
        </Ln>
        <Ln n={13}>
          <p className="text-on-surface font-body-md text-sm leading-relaxed font-sans">
            What interests me most is building things that are actually useful. I'm constantly
            learning through projects, experimenting with new technologies, and trying to understand
            not just how to make something work, but why it works.
          </p>
        </Ln>
        <Ln n={14}>
          <p className="text-on-surface font-body-md text-sm leading-relaxed font-sans">
            I'm still early in my journey, but I'm serious about becoming a better engineer with
            every project I build.
          </p>
        </Ln>

        <Ln n={15}><div className="h-px bg-outline-variant/40" /></Ln>

        <Ln n={16}>
          <div className="text-outline text-xs">// 03. Core Capabilities</div>
        </Ln>
        <Ln n={17}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="bg-surface-container p-4 rounded border border-outline-variant/60 h-full">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase mb-2">
                <span className="material-symbols-outlined text-sm">terminal</span>
                Full-Stack Web Development
              </div>
              <p className="text-xs text-on-surface-variant font-sans leading-relaxed mb-3">
                End-to-end web applications — from database design and APIs to responsive,
                high-performance frontends.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <TechChip label="TypeScript" />
                <TechChip label="React / Next.js" />
                <TechChip label="Node.js" />
                <TechChip label="Express" />
                <TechChip label="PostgreSQL" />
                <TechChip label="MongoDB" />
                <TechChip label="REST / GraphQL" />
              </div>
            </div>

            <div className="bg-surface-container p-4 rounded border border-outline-variant/60 h-full">
              <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase mb-2">
                <span className="material-symbols-outlined text-sm">psychology</span>
                AI & ML Integration
              </div>
              <p className="text-xs text-on-surface-variant font-sans leading-relaxed mb-3">
                Bringing LLMs into real applications — chatbots, quiz generators, AI tutors, and
                smart analysis features powered by RAG.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <TechChip label="OpenAI API" />
                <TechChip label="Chatbots" />
                <TechChip label="RAG Implementation" />
                <TechChip label="Quiz Generators" />
                <TechChip label="AI Tutors" />
                <TechChip label="Text Analysis" />
              </div>
            </div>
          </div>
        </Ln>

        <Ln n={18}><div className="h-px bg-outline-variant/40" /></Ln>

        <Ln n={19}>
          <div className="text-outline text-xs">// 04. Current Status Feed</div>
        </Ln>
        <Ln n={20}>
          <span className="text-primary font-bold">export const</span> <span className="text-on-surface">currently</span> = &#123;
        </Ln>
        <Ln n={21}>
          <div className="pl-6"><span className="text-tertiary">learning:</span> [<span className="text-secondary">'Multi-Agent AI Systems'</span>, <span className="text-secondary">'Fine-tuning LLMs'</span>],</div>
        </Ln>
        <Ln n={22}>
          <div className="pl-6"><span className="text-tertiary">building:</span> [<span className="text-secondary">'AI-powered web applications'</span>],</div>
        </Ln>
        <Ln n={23}>
          <div className="pl-6"><span className="text-tertiary">open_to:</span> [<span className="text-secondary">'Full-time Roles'</span>, <span className="text-secondary">'Freelance Projects'</span>, <span className="text-secondary">'Collaborations'</span>],</div>
        </Ln>
        <Ln n={24}>&#125;;</Ln>

        {/* Action Buttons */}
        <div className="pt-5 mt-2 flex flex-wrap gap-4 border-t border-outline-variant/60">
          <button
            onClick={() => {
              soundManager.playClick('tab');
              onNavigate('projects');
            }}
            className="flex items-center gap-2 px-4 py-2 border border-primary text-primary font-label-md text-xs rounded hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">folder</span> Explore Projects
          </button>
          <button
            onClick={() => {
              soundManager.playClick('tab');
              onNavigate('contact');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-surface-container-high text-on-surface hover:text-primary font-label-md text-xs rounded border border-outline-variant transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">mail</span> Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
};
