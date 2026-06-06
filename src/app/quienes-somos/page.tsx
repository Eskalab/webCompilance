'use client';

import Topbar from '@/components/topbar';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import TeamSection from '@/components/home/team-section';
import { useLanguage } from '@/contexts/language';

function QuienesSomosContent() {
  const { locale } = useLanguage();

  const t = {
    hero: { es: '¿Quiénes Somos?', en: 'Who Are We?' },
    subtitle: {
      es: 'Empresa Legal Especializada en el Manejo de Datos Personales & Seguridad de la Información',
      en: 'Legal Firm Specialized in Personal Data Management & Information Security',
    },
    missionTitle: { es: 'Nuestra Misión', en: 'Our Mission' },
    missionBody: {
      es: 'Somos facilitadores en la adopción de las nuevas regulaciones Legales para Empresas Digitales y comercio electrónico en Colombia. Acompañamos a las organizaciones en el cumplimiento de la Ley 1581 de 2012 y demás normativas vigentes, actuando desde la prevención para evitar riesgos legales y económicos.',
      en: 'We facilitate the adoption of new Legal regulations for Digital Companies and e-commerce in Colombia. We accompany organizations in complying with Law 1581 of 2012 and other regulations, acting from prevention to avoid legal and economic risks.',
    },
    visionTitle: { es: 'Nuestra Visión', en: 'Our Vision' },
    visionBody: {
      es: 'Ser el referente en asesoría jurídica digital en Colombia y Latinoamérica, construyendo una cultura empresarial donde la protección de los datos personales y la seguridad de la información sean pilares fundamentales del crecimiento empresarial.',
      en: 'To be the benchmark in digital legal advisory in Colombia and Latin America, building a business culture where personal data protection and information security are fundamental pillars of business growth.',
    },
    valuesTitle: { es: 'Nuestros Valores', en: 'Our Values' },
    values: [
      { es: 'Responsabilidad', en: 'Responsibility' },
      { es: 'Transparencia', en: 'Transparency' },
      { es: 'Innovación', en: 'Innovation' },
      { es: 'Confianza', en: 'Trust' },
      { es: 'Excelencia', en: 'Excellence' },
    ],
    cta: { es: '¿Listo para proteger tu empresa?', en: 'Ready to protect your company?' },
    ctaBtn: { es: 'CONTACTAR POR WHATSAPP', en: 'CONTACT VIA WHATSAPP' },
  };

  return (
    <>
      <section className="bg-gradient-to-r from-[#1a2a3a] to-[#2c3e50] py-20 px-6 text-center text-white">
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">{t.hero[locale]}</h1>
        <p className="text-lg lg:text-xl text-white/80 max-w-2xl mx-auto">{t.subtitle[locale]}</p>
      </section>

      <section className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-[28px] h-[380px] overflow-hidden">
            <img src="/quienes-somos.jpg" alt="TDE — Quiénes Somos" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#0f8b8d] mb-3">{t.missionTitle[locale]}</h2>
              <p className="text-gray-600 leading-relaxed">{t.missionBody[locale]}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#0f8b8d] mb-3">{t.visionTitle[locale]}</h2>
              <p className="text-gray-600 leading-relaxed">{t.visionBody[locale]}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[linear-gradient(120deg,#1e2a52_0%,#1e2a52_38%,#2d7d9a_50%,#1e2a52_62%,#1e2a52_100%)] px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-10">{t.valuesTitle[locale]}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {t.values.map((v, i) => (
              <span key={i} className="bg-white/20 text-white font-bold px-8 py-3 rounded-full text-lg">
                {v[locale]}
              </span>
            ))}
          </div>
        </div>
      </section>

      <TeamSection />

      <section className="py-16 bg-white text-center px-6">
        <h2 className="text-2xl font-bold text-[#1f2d3d] mb-6">{t.cta[locale]}</h2>
        <a
          href="https://wa.me/573143992911?text=Hola%2C%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20TDE%20y%20sus%20servicios."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 bg-[linear-gradient(120deg,#1e2a52_0%,#1e2a52_38%,#2d7d9a_50%,#1e2a52_62%,#1e2a52_100%)] text-white font-bold rounded-full hover:shadow-lg transition-all text-base tracking-wide"
        >
          {t.ctaBtn[locale]}
        </a>
      </section>
    </>
  );
}

export default function QuienesSomosPage() {
  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <Topbar />
      <SiteHeader />
      <QuienesSomosContent />
      <SiteFooter />
    </main>
  );
}
