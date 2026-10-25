'use client';

import { useLanguage } from '@/contexts/language';
import type { L } from '@/lib/landings/types';

interface Props {
  name: L;
  path: string;
  nav: { href: string; label: L }[];
  ctaHref: string;
  ctaLabel: L;
}

// Header propio de cada landing de servicio: solo el servicio, sin el menú del sitio
// (mismo patrón que la landing del Escáner Legal).
export default function ProductHeader({ name, path, nav, ctaHref, ctaLabel }: Props) {
  const { locale } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-[76px] flex items-center justify-between gap-6">
        <a href={path} className="flex items-center gap-3 shrink-0">
          <img src="/logo.png" alt="TDE" className="h-11 w-auto object-contain" />
          <span className="hidden sm:block border-l border-gray-200 pl-3 text-[#1e2a52] font-bold leading-tight max-w-[220px]">
            {name[locale]}
          </span>
        </a>

        <nav className="hidden xl:flex items-center gap-7 text-[15px] font-medium text-[#1f2757] whitespace-nowrap">
          {nav.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-[#0f8b8d] transition-colors">
              {l.label[locale]}
            </a>
          ))}
        </nav>

        {/* Margen derecho para no quedar debajo del selector de idioma (fixed, arriba a la derecha) */}
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-block shrink-0 mr-36 px-5 py-2.5 bg-[#0f8b8d] text-white text-sm font-semibold rounded-full hover:bg-[#0c7475] transition-colors"
        >
          {ctaLabel[locale]}
        </a>
      </div>
    </header>
  );
}
