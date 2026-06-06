'use client';

import { useLanguage } from '@/contexts/language';

export default function QuienesSomos() {
  const { locale } = useLanguage();

  const content = {
    title: { es: '¿Quienes Somos?', en: 'Who Are We?' },
    subtitle: {
      es: 'Empresa Legal Especializada en el Manejo de Datos Personales & Seguridad de la Información',
      en: 'Legal Firm Specialized in Personal Data Management & Information Security',
    },
    description: {
      es: 'Somos facilitadores en la adopción de las nuevas regulaciones Legales para Empresas Digitales y comercio electrónico en Colombia.',
      en: 'We facilitate the adoption of new Legal regulations for Digital Companies and e-commerce in Colombia.',
    },
    cta: { es: 'AMPLIAR INFORMACIÓN', en: 'LEARN MORE' },
  };

  return (
    <section className="py-20 bg-gradient-to-r from-[#6ed3c1] to-[#4cb8c4]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <div className="bg-white/20 rounded-[28px] h-[350px] flex items-center justify-center backdrop-blur-sm">
            <div className="text-center text-white/80">
              <svg className="w-20 h-20 mx-auto mb-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm font-medium">Image placeholder</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1f2d3d] mb-4">
              {content.title[locale]}
            </h2>
            <p className="text-lg font-bold text-[#1f2d3d] mb-4">
              {content.subtitle[locale]}
            </p>
            <p className="text-white text-lg leading-relaxed mb-8">
              {content.description[locale]}
            </p>
            <a
              href="#servicios"
              className="inline-block px-8 py-4 bg-[#1f2d3d] text-white font-semibold rounded-lg hover:bg-[#162030] transition-colors text-base tracking-wide"
            >
              {content.cta[locale]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
