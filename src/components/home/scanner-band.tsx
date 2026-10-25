'use client';

import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/language';

export default function ScannerBand() {
  const { locale } = useLanguage();

  const content = {
    label: { es: 'Herramienta gratuita', en: 'Free tool' },
    title: {
      es: '¿Tu sitio web cumple la Ley 1581?',
      en: 'Does your website comply with Law 1581?',
    },
    desc: {
      es: 'Escanéalo gratis y conoce tu Índice de Confianza Digital: privacidad, cookies, seguridad y transparencia.',
      en: 'Scan it for free and get your Digital Trust Index: privacy, cookies, security and transparency.',
    },
    cta: { es: 'Escanear mi sitio gratis', en: 'Scan my site for free' },
  };

  return (
    <section className="px-6 pb-20 bg-white">
      <div className="max-w-5xl mx-auto rounded-[28px] bg-[linear-gradient(120deg,#1e2a52_0%,#1e2a52_38%,#2d7d9a_50%,#1e2a52_62%,#1e2a52_100%)] p-8 lg:p-10 flex flex-col md:flex-row items-center gap-8 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-8 h-8 text-[#6ed3c1]" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <p className="text-[#6ed3c1] font-semibold uppercase tracking-widest text-xs mb-2">
            {content.label[locale]}
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
            {content.title[locale]}
          </h2>
          <p className="text-white/85">{content.desc[locale]}</p>
        </div>
        <a
          href="/productos/escaner-legal"
          className="shrink-0 px-8 py-4 bg-[#0f8b8d] text-white font-bold rounded-full hover:bg-[#0c7475] transition-colors whitespace-nowrap"
        >
          {content.cta[locale]}
        </a>
      </div>
    </section>
  );
}
