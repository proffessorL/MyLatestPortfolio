import React, { useState } from 'react';
import { soundManager } from '../utils/sound';

interface ContactChannel {
  id: string;
  name: string;
  category: 'Professional' | 'Messaging & Social';
  icon: string;
  handle: string;
  url: string;
  color: string;
  description: string;
  copyValue?: string;
}

const CHANNELS: ContactChannel[] = [
  {
    id: 'email',
    name: 'Direct Email',
    category: 'Professional',
    icon: 'mail',
    handle: 'professorl6868@gmail.com',
    url: 'https://mail.google.com/mail/?view=cm&fs=1&to=professorl6868@gmail.com',
    color: 'text-primary',
    description: 'Best for project inquiries, formal proposals, and full-time hiring.',
    copyValue: 'professorl6868@gmail.com',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    category: 'Professional',
    icon: 'link',
    handle: 'in/eusha-dev',
    url: 'https://linkedin.com',
    color: 'text-tertiary',
    description: 'Professional networking, career history, and endorsements.',
  },
  {
    id: 'upwork',
    name: 'Upwork',
    category: 'Professional',
    icon: 'work',
    handle: 'Eusha S. (Top Rated)',
    url: 'https://upwork.com',
    color: 'text-secondary',
    description: 'Contract work, hourly milestones, and enterprise freelance projects.',
  },
  {
    id: 'fiverr',
    name: 'Fiverr Pro',
    category: 'Professional',
    icon: 'verified',
    handle: '@eusha_dev',
    url: 'https://fiverr.com',
    color: 'text-secondary',
    description: 'Fixed-price gigs, custom web applications, and quick consultations.',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    category: 'Messaging & Social',
    icon: 'chat',
    handle: '+880 1533-732030',
    url: 'https://wa.me/8801533732030',
    color: 'text-secondary',
    description: 'Fast, direct messaging for active clients and urgent updates.',
    copyValue: '+8801533732030',
  },
  {
    id: 'discord',
    name: 'Discord',
    category: 'Messaging & Social',
    icon: 'forum',
    handle: 'eusha#0001',
    url: 'https://discord.com',
    color: 'text-tertiary',
    description: 'Real-time dev chats, voice syncs, and pair-programming sessions.',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    category: 'Messaging & Social',
    icon: 'share',
    handle: 'facebook.com/share/19a9DPtZvP',
    url: 'https://www.facebook.com/share/19a9DPtZvP/',
    color: 'text-primary',
    description: 'Social connections and personal updates.',
    copyValue: 'https://www.facebook.com/share/19a9DPtZvP/',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'Messaging & Social',
    icon: 'photo_camera',
    handle: '@tokito_yuichi_',
    url: 'https://www.instagram.com/tokito_yuichi_/',
    color: 'text-primary',
    description: 'Behind-the-scenes setup, UI designs, and dev lifestyle.',
  },
];

const CATEGORY_GROUPS: { title: string; icon: string; category: ContactChannel['category'] }[] = [
  { title: 'PROFESSIONAL & WORK', icon: 'badge', category: 'Professional' },
  { title: 'SOCIAL & MESSAGING', icon: 'forum', category: 'Messaging & Social' },
];

export const Contact: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const openChannel = (channel: ContactChannel) => {
    soundManager.playClick('action');
    window.open(channel.url, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = (e: React.MouseEvent, channel: ContactChannel) => {
    e.stopPropagation();
    soundManager.playClick('key');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(channel.copyValue || channel.handle).catch(() => {});
    }
    setCopiedId(channel.id);
    window.setTimeout(() => {
      setCopiedId((current) => (current === channel.id ? null : current));
    }, 1600);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Hero */}
      <section className="space-y-3">
        <h1 className="font-headline-xl text-headline-xl font-bold text-on-surface leading-tight">
          <span className="text-primary">{"//"}</span> Let's build something together
          <span className="text-primary">_</span>
        </h1>
        <p className="font-body-lg text-sm md:text-base text-on-surface-variant max-w-xl leading-relaxed">
          Every professional channel and social link in one place. Click a card to open it, or copy
          the handle instantly.
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-2">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded bg-surface-container border border-outline-variant/60">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(103,223,112,0.8)] animate-pulse"></span>
            <span className="text-on-surface font-mono-code text-xs font-medium">Open to work</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-surface-container border border-outline-variant/60">
            <span className="material-symbols-outlined text-sm text-primary">schedule</span>
            <span className="text-on-surface-variant font-mono-code text-xs">&lt; 24h response</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-surface-container border border-outline-variant/60">
            <span className="material-symbols-outlined text-sm text-tertiary">public</span>
            <span className="text-on-surface-variant font-mono-code text-xs">GMT+6 · Dhaka</span>
          </div>
        </div>
      </section>

      {/* Channel Directories */}
      {CATEGORY_GROUPS.map((group) => {
        const groupChannels = CHANNELS.filter((c) => c.category === group.category);
        return (
          <section key={group.category} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-mono-code text-primary font-bold flex items-center gap-2 text-sm">
                <span className="material-symbols-outlined text-lg">{group.icon}</span>
                {group.title}
              </h2>
              <span className="font-mono-code text-[10px] text-outline border border-outline-variant rounded px-1.5 py-0.5">
                {groupChannels.length} links
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-gutter">
              {groupChannels.map((channel, index) => {
                const isCopied = copiedId === channel.id;
                return (
                  <div
                    key={channel.id}
                    role="link"
                    tabIndex={0}
                    onClick={() => openChannel(channel)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') openChannel(channel);
                    }}
                    className="group flex flex-col bg-surface-container-low border border-outline-variant/60 rounded-lg p-5 cursor-pointer outline-none transition-all duration-200 hover:bg-surface-container hover:border-primary/50 hover:-translate-y-0.5 focus-visible:border-primary shadow-xs"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-md bg-surface-container border border-outline-variant/60 group-hover:border-primary/40 transition-colors">
                        <span className={`material-symbols-outlined text-xl ${channel.color}`}>
                          {channel.icon}
                        </span>
                      </div>
                      <span className="font-mono-code text-[10px] text-outline/70 select-none">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="font-mono-code font-bold text-sm text-on-surface group-hover:text-primary transition-colors">
                      {channel.name}
                    </h3>
                    <p className="font-body-md text-xs text-on-surface-variant leading-relaxed mt-1.5 flex-1">
                      {channel.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-outline-variant/40 flex items-center justify-between gap-2">
                      <code
                        className={`font-mono-code text-[11px] truncate transition-colors ${
                          isCopied ? 'text-secondary font-bold' : 'text-secondary'
                        }`}
                        title={channel.handle}
                      >
                        {isCopied ? 'copied to clipboard!' : channel.handle}
                      </code>
                      <div className="flex items-center shrink-0">
                        <button
                          onClick={(e) => handleCopy(e, channel)}
                          title={isCopied ? 'Copied!' : 'Copy to clipboard'}
                          aria-label={`Copy ${channel.name} handle`}
                          className={`p-1.5 rounded transition-colors cursor-pointer ${
                            isCopied
                              ? 'text-secondary'
                              : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">
                            {isCopied ? 'check' : 'content_copy'}
                          </span>
                        </button>
                        <span className="material-symbols-outlined text-sm text-outline group-hover:text-primary transition-colors ml-0.5">
                          arrow_outward
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      <p className="font-mono-code text-[11px] text-outline text-center select-none">
        <span className="text-primary">{"//"}</span> EOF — pick any channel above, I read everything{' '}
        <span className="text-primary animate-pulse">▌</span>
      </p>
    </div>
  );
};
