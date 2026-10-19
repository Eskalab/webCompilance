'use client';

import { useLanguage } from '@/contexts/language';

// Header propio de la landing: solo el producto, sin el menú del sitio de TDE.
export default function LandingHeader() {
  const { locale } = useLanguage();

  const links = [
    { href: '#que-revisamos', label: { es: 'Qué revisamos', en: 'What we check' } },
    { href: '#indice', label: { es: 'Índice de Confianza', en: 'Trust Index' } },
    { href: '#como-funciona', label: { es: 'Cómo funciona', en: 'How it works' } },
    { href: '#preguntas', label: { es: 'Preguntas', en: 'FAQ' } },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-[76px] flex items-center justify-between gap-6">
        <a href="/productos/escaner-legal" className="flex items-center gap-3 shrink-0">
          <img src="/logo.png" alt="TDE" className="h-11 w-auto object-contain" />
          <span className="hidden sm:block border-l border-gray-200 pl-3 text-[#1e2a52] font-bold leading-tight">
            {locale === 'es' ? 'Escáner Legal' : 'Legal Scanner'}
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[#1f2757]">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-[#0f8b8d] transition-colors">
              {l.label[locale]}
            </a>
          ))}
        </nav>

        {/* Margen derecho para no quedar debajo del selector de idioma (fixed, arriba a la derecha) */}
        <a
          href="#escanear"
          className="hidden md:inline-block shrink-0 mr-36 px-5 py-2.5 bg-[#0f8b8d] text-white text-sm font-semibold rounded-full hover:bg-[#0c7475] transition-colors"
        >
          {locale === 'es' ? 'Escanear gratis' : 'Scan for free'}
        </a>
      </div>
    </header>
  );
}
