'use client';

import { useLanguage } from '@/contexts/language';
import type { TeamMember } from '@/lib/home-data';

interface Props {
  member: TeamMember;
}

export default function TeamCard({ member }: Props) {
  const { locale } = useLanguage();

  return (
    <div className="text-center">
      <div className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-white/30 overflow-hidden">
        <img
          src={`/team/${member.id}.png`}
          alt={member.name}
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            const t = e.currentTarget;
            t.style.display = 'none';
            t.parentElement!.classList.add('bg-white/20', 'flex', 'items-center', 'justify-center');
            t.parentElement!.innerHTML = `<span class="text-3xl font-bold text-white/70">${member.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}</span>`;
          }}
        />
      </div>

      <h3 className="text-xl font-bold text-white uppercase tracking-wide">
        {member.role[locale]}
      </h3>
      <p className="text-lg font-bold text-white mb-4">
        {member.name}
      </p>
      <p className="text-white/85 text-sm leading-relaxed text-justify whitespace-pre-line">
        {member.bio[locale]}
      </p>
    </div>
  );
}
