'use client';

import { useLanguage } from '@/contexts/language';
import { teamMembers } from '@/lib/home-data';
import TeamCard from './team-card';

export default function TeamSection() {
  const { locale } = useLanguage();

  const content = {
    label: { es: 'CONOCE', en: 'MEET' },
    title: { es: 'NUESTRO EQUIPO', en: 'OUR TEAM' },
  };

  return (
    <section className="py-20 bg-[linear-gradient(120deg,#1e2a52_0%,#1e2a52_38%,#2d7d9a_50%,#1e2a52_62%,#1e2a52_100%)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-white/80 font-semibold uppercase tracking-widest mb-2">
            {content.label[locale]}
          </p>
          <h2 className="text-5xl lg:text-6xl font-bold text-white">
            {content.title[locale]}
          </h2>
        </div>

        {/* Team Cards */}
        <div className="grid md:grid-cols-3 gap-12">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
