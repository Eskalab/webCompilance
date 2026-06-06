'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/language';
import { trainingAccordion, trainingBenefits } from '@/lib/home-data';
import CapacitacionesAccordion from './capacitaciones-accordion';

export default function Capacitaciones() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const { locale } = useLanguage();

  const content = {
    title: {
      es: 'Capacitaciones y Cursos Empresariales',
      en: 'Business Training & Courses',
    },
    subtitle: {
      es: 'En Seguridad Digital y Manejo de Datos Personales',
      en: 'In Digital Security and Personal Data Management',
    },
    trainTitle: { es: 'CAPACITA TÚ PERSONAL', en: 'TRAIN YOUR STAFF' },
    trainDesc: {
      es: '! ACOMPÁÑALOS A ADQUIRIR NUEVAS HABILIDADES.! QUE IMPLEMENTARÁN POSITIVAMENTE EN TU EMPRESA',
      en: 'HELP THEM ACQUIRE NEW SKILLS THEY WILL POSITIVELY IMPLEMENT IN YOUR COMPANY',
    },
    trainQuote: {
      es: 'La Seguridad no es un evento único, sino un proceso continuo.',
      en: 'Security is not a one-time event, but a continuous process.',
    },
    benefitsTitle: { es: 'BENEFICIOS', en: 'BENEFITS' },
    cta: { es: 'AMPLIAR INFORMACIÓN', en: 'LEARN MORE' },
    ctaWa: {
      es: 'https://wa.me/573143992911?text=Hola%2C%20me%20interesa%20informaci%C3%B3n%20sobre%20las%20capacitaciones%20y%20cursos%20empresariales%20de%20TDE.',
      en: 'https://wa.me/573143992911?text=Hello%2C%20I%20am%20interested%20in%20information%20about%20TDE%20business%20training%20and%20courses.',
    },
  };

  return (
    <section className="bg-gradient-to-r from-[#6ed3c1] to-[#1e2a52]">
      {/* Header */}
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              {content.title[locale]}
            </h2>
            <p className="text-white font-semibold text-lg mt-2">
              {content.subtitle[locale]}
            </p>
          </div>
          <img
            src="/logo.png"
            alt="TDE"
            className="h-24 w-auto object-contain brightness-0 invert"
          />
        </div>
      </div>

      {/* Content */}
      <div className="pb-16 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Left: Training info + Accordion */}
          <div>
            <div className="border-t-2 border-white/30 w-48 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">
              {content.trainTitle[locale]}
            </h3>
            <p className="text-white/90 text-sm uppercase tracking-wide mb-4">
              {content.trainDesc[locale]}
            </p>
            <p className="text-white text-lg font-medium italic mb-8">
              {content.trainQuote[locale]}
            </p>

            {/* Accordion */}
            <div>
              {trainingAccordion.map((item) => (
                <CapacitacionesAccordion
                  key={item.id}
                  item={item}
                  isOpen={openItem === item.id}
                  onToggle={() =>
                    setOpenItem(openItem === item.id ? null : item.id)
                  }
                />
              ))}
            </div>

            <div className="mt-8">
              <a
                href={content.ctaWa[locale]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-[#1f2d3d] text-white font-bold rounded-full hover:bg-[#162030] transition-colors text-base tracking-wide"
              >
                {content.cta[locale]}
              </a>
            </div>
          </div>

          {/* Right: Benefits */}
          <div>
            <div className="border-t-2 border-white/30 w-48 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-8">
              {content.benefitsTitle[locale]}
            </h3>
            <div className="space-y-6">
              {trainingBenefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-white shrink-0 mt-1" />
                  <div>
                    <span className="text-white font-bold">
                      {benefit.title[locale]}
                    </span>{' '}
                    <span className="text-white/90 text-sm leading-relaxed">
                      {benefit.description[locale]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
