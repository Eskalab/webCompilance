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
    <section className="py-20 bg-[linear-gradient(120deg,#1e2a52_0%,#1e2a52_38%,#2d7d9a_50%,#1e2a52_62%,#1e2a52_100%)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-[28px] h-[350px] overflow-hidden">
            <img
              src="/quienes-somos.jpg"
              alt="Quiénes Somos — TDE"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {content.title[locale]}
            </h2>
            <p className="text-lg font-bold text-white mb-4">
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
