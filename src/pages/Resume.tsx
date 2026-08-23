import React from 'react';
import { experienceData, skillsCategories } from '../data/portfolioData';

const contactLinks = [
  { label: 'Email', url: 'mailto:eusha@example.com' },
  { label: 'GitHub', url: 'https://github.com/eusha-dev' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/eusha-dev' },
  { label: 'Portfolio', url: '/' },
];

const professionalSummary =
  'Full-Stack Developer and founder of RESNOR, building AI-powered products end to end — from React/Next.js frontends and Node.js APIs to LLM, RAG, and multi-agent integrations. Experienced in shipping production web applications and AI tools for global clients across Upwork and Fiverr.';

const education = [
  {
    school: 'Daffodil International University',
    degree: 'B.Sc. Computing & Information Systems (Major in AI)',
    period: '2025 — Present (Ongoing)',
  },
  {
    school: 'Comilla Government City College',
    degree: 'Higher Secondary (Science)',
    period: '2022 — 2024',
  },
  {
    school: 'Comilla Collectorate School and College',
    degree: 'Secondary (Science)',
    period: '2022',
  },
];

const achievements = ['DIU AI Project Competition'];

const SectionHeading: React.FC<{ icon: string; title: string }> = ({ icon, title }) => (
  <h3 className="font-mono-code text-xs font-bold uppercase text-primary tracking-wider flex items-center gap-2">
    <span className="material-symbols-outlined text-sm">{icon}</span> {title}
  </h3>
);

export const Resume: React.FC = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-outline-variant pb-4 flex justify-between items-end">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface font-mono-code font-bold mb-1">
            Resume
          </h1>
          <p className="font-mono-code text-xs text-outline">// Quick access to verified credentials and PDF download</p>
        </div>
        <button
          onClick={() => alert('Downloading official Resume PDF...')}
          className="flex items-center gap-2 px-4 py-2 border border-primary text-primary font-mono-code text-xs rounded hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">picture_as_pdf</span> PDF Download
        </button>
      </div>

      {/* Resume Document Canvas */}
      <div className="bg-surface-container-low border border-outline-variant rounded-lg p-6 md:p-8 space-y-6 shadow-sm font-sans">
        {/* Identity */}
        <div className="text-center space-y-2">
          <h2 className="font-headline-lg text-2xl text-on-surface font-mono-code font-bold">EUSHA</h2>
          <p className="text-primary font-mono-code text-xs">Full-Stack Web Developer & AI/ML Integration Engineer</p>
          <div className="flex flex-wrap justify-center gap-x-1.5 font-mono-code text-[11px] text-outline">
            {contactLinks.map((link, i) => (
              <React.Fragment key={link.label}>
                {i > 0 && <span>/</span>}
                <a
                  href={link.url}
                  target={link.url === '/' ? undefined : '_blank'}
                  rel="noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Professional Summary */}
        <section className="pt-5 border-t border-outline-variant">
          <p className="text-xs text-on-surface leading-relaxed">{professionalSummary}</p>
        </section>

        {/* Work Experience */}
        <section className="pt-5 border-t border-outline-variant space-y-4">
          <SectionHeading icon="work" title="Work Experience" />
          <div className="space-y-4">
            {experienceData.map((exp) => (
              <div key={exp.id} className="border-l-2 border-primary/40 pl-4 space-y-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-sm text-on-surface">{exp.role} — {exp.company}</h4>
                  <span className="font-mono-code text-xs text-outline">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside text-xs text-on-surface-variant space-y-1 pt-1">
                  {exp.commits.map((msg, idx) => (
                    <li key={idx} className="leading-relaxed">{msg}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section className="pt-5 border-t border-outline-variant space-y-3">
          <SectionHeading icon="code" title="Technical Skills" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono-code">
            {skillsCategories.map((cat) => (
              <div key={cat.title} className="bg-surface-container p-3 rounded border border-outline-variant/60">
                <span className="text-primary font-bold text-[11px] block mb-1">{cat.title}:</span>
                <span className="text-on-surface-variant">
                  {cat.skills.map((s) => s.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="pt-5 border-t border-outline-variant space-y-3">
          <SectionHeading icon="school" title="Education" />
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.school} className="flex justify-between items-start gap-3">
                <div>
                  <h4 className="font-bold text-sm text-on-surface">{edu.school}</h4>
                  <p className="text-xs text-on-surface-variant">{edu.degree}</p>
                </div>
                <span className="font-mono-code text-[11px] text-outline shrink-0">{edu.period}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements / Competitions */}
        <section className="pt-5 border-t border-outline-variant space-y-3">
          <SectionHeading icon="emoji_events" title="Achievements / Competitions" />
          <ul className="list-disc list-inside text-xs text-on-surface-variant space-y-1">
            {achievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
