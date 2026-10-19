'use client';

import { ShieldCheck, Cookie, Lock, Eye, FileText, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/language';
import { ICD_AREAS, ICD_LEVELS } from '@/lib/scanner/icd';
import ScanForm from '@/components/scan-form';
import SiteFooter from '@/components/site-footer';
import LandingHeader from './landing-header';
import IcdPreview from './icd-preview';
import MobileScanBar from './mobile-scan-bar';

const GRADIENT = 'bg-[linear-gradient(120deg,#1e2a52_0%,#1e2a52_38%,#2d7d9a_50%,#1e2a52_62%,#1e2a52_100%)]';

type L = { es: string; en: string };

const content = {
  badge: { es: 'Ley 1581 de 2012 · Colombia', en: 'Law 1581 of 2012 · Colombia' },
  title: {
    es: '¿Tu sitio web cumple la Ley de Protección de Datos?',
    en: 'Does your website comply with the Data Protection Law?',
  },
  subtitle: {
    es: 'Escanea tu sitio gratis y conoce tu Índice de Confianza Digital: revisamos privacidad, cookies, seguridad y transparencia en lo que tus visitantes ven.',
    en: 'Scan your site for free and get your Digital Trust Index: we review privacy, cookies, security and transparency on what your visitors see.',
  },
  trust: [
    { es: 'Gratis', en: 'Free' },
    { es: 'Sin registro para escanear', en: 'No sign-up to scan' },
    { es: 'Sin instalar nada', en: 'Nothing to install' },
  ] as L[],

  riskLabel: { es: 'El riesgo que no se ve', en: 'The hidden risk' },
  riskTitle: {
    es: 'Tu sitio recoge datos personales, aunque no lo hayas planeado',
    en: 'Your site collects personal data, even if you did not plan it',
  },
  risks: [
    {
      icon: FileText,
      title: { es: 'Formularios', en: 'Forms' },
      text: {
        es: 'Cada formulario de contacto o cotización recibe nombres, correos y teléfonos. La ley exige informar y pedir autorización antes de tratarlos.',
        en: 'Every contact or quote form receives names, emails and phone numbers. The law requires informing people and getting authorization before processing them.',
      },
    },
    {
      icon: Cookie,
      title: { es: 'Cookies y píxeles', en: 'Cookies and pixels' },
      text: {
        es: 'Google Analytics, Meta Pixel y otros scripts registran a tus visitantes. Si no lo informas, tus usuarios no saben quién trata sus datos.',
        en: 'Google Analytics, Meta Pixel and other scripts track your visitors. If you do not disclose it, users do not know who processes their data.',
      },
    },
    {
      icon: Lock,
      title: { es: 'Seguridad', en: 'Security' },
      text: {
        es: 'Un sitio sin HTTPS o sin cabeceras de seguridad expone los datos que tus clientes te confían.',
        en: 'A site without HTTPS or security headers exposes the data your customers trust you with.',
      },
    },
  ],
  fine: {
    es: 'La Superintendencia de Industria y Comercio puede imponer multas de hasta 2.000 salarios mínimos mensuales por infracción.',
    en: 'Colombia’s Superintendence of Industry and Commerce can impose fines of up to 2,000 monthly minimum wages per violation.',
  },
  fineSource: { es: 'Ley 1581 de 2012, artículo 23.', en: 'Law 1581 of 2012, article 23.' },

  checksLabel: { es: 'Qué revisamos', en: 'What we check' },
  checksTitle: { es: '10 controles en 4 áreas', en: '10 controls in 4 areas' },
  checksDesc: {
    es: 'Analizamos la parte pública de tu sitio, la misma que ven tus clientes y la autoridad.',
    en: 'We analyze the public side of your site, the same one your customers and the authority see.',
  },

  indexLabel: { es: 'Índice de Confianza Digital™', en: 'Digital Trust Index™' },
  indexTitle: { es: 'Un número claro para decidir', en: 'One clear number to decide' },
  indexDesc: {
    es: 'Tu sitio obtiene un puntaje de 0 a 100 y un nivel de riesgo. Así sabes dónde estás y qué atender primero.',
    en: 'Your site gets a score from 0 to 100 and a risk level, so you know where you stand and what to fix first.',
  },

  howLabel: { es: 'Cómo funciona', en: 'How it works' },
  howTitle: { es: 'Tu resultado en 3 pasos', en: 'Your result in 3 steps' },
  steps: [
    {
      title: { es: 'Escribe tu dominio', en: 'Enter your domain' },
      text: { es: 'Solo la dirección de tu sitio web. No pedimos accesos ni instalaciones.', en: 'Just your website address. No access or installs needed.' },
    },
    {
      title: { es: 'Mira tu Índice', en: 'See your Index' },
      text: { es: 'En pantalla ves tu puntaje, tu nivel de riesgo y cómo te fue en cada área.', en: 'On screen you see your score, your risk level and how each area did.' },
    },
    {
      title: { es: 'Desbloquea el informe', en: 'Unlock the report' },
      text: {
        es: 'Con tus datos de contacto accedes al detalle de cada control, las recomendaciones y el informe ejecutivo en PDF.',
        en: 'With your contact details you get each control in detail, the recommendations and the executive PDF report.',
      },
    },
  ],

  includesFree: { es: 'Sin registro', en: 'No sign-up' },
  includesFreeItems: [
    { es: 'Índice de Confianza Digital (0 a 100)', en: 'Digital Trust Index (0 to 100)' },
    { es: 'Nivel de riesgo de tu sitio', en: 'Your site’s risk level' },
    { es: 'Resultado por área', en: 'Result by area' },
  ] as L[],
  includesFull: { es: 'Con tus datos de contacto', en: 'With your contact details' },
  includesFullItems: [
    { es: 'Qué encontramos en cada uno de los 10 controles', en: 'What we found in each of the 10 controls' },
    { es: 'Recomendaciones para corregirlo', en: 'Recommendations to fix it' },
    { es: 'Informe ejecutivo en PDF para compartir con tu equipo', en: 'Executive PDF report to share with your team' },
  ] as L[],

  faqLabel: { es: 'Preguntas frecuentes', en: 'FAQ' },
  faqTitle: { es: 'Lo que nos preguntan', en: 'What people ask us' },
  faq: [
    {
      q: { es: '¿Cuánto cuesta?', en: 'How much does it cost?' },
      a: {
        es: 'El escaneo y el informe son gratis. Si quieres ayuda para corregir lo que encontremos, puedes agendar una sesión con nuestro equipo.',
        en: 'The scan and the report are free. If you want help fixing what we find, you can book a session with our team.',
      },
    },
    {
      q: { es: '¿Tengo que instalar algo o darles acceso a mi sitio?', en: 'Do I need to install anything or give you access?' },
      a: {
        es: 'No. Revisamos solo lo que cualquier visitante puede ver: páginas públicas, cookies, scripts y formularios.',
        en: 'No. We only review what any visitor can see: public pages, cookies, scripts and forms.',
      },
    },
    {
      q: { es: '¿Con esto ya cumplo la Ley 1581?', en: 'Does this make me compliant with Law 1581?' },
      a: {
        es: 'No por sí solo. El escáner revisa tu sitio web; el cumplimiento completo también incluye tus bases de datos, procesos internos y contratos. Para eso está nuestro diagnóstico integral.',
        en: 'Not on its own. The scanner reviews your website; full compliance also covers your databases, internal processes and contracts. That is what our full diagnosis is for.',
      },
    },
    {
      q: { es: '¿Sirve para sitios fuera de Colombia?', en: 'Does it work for sites outside Colombia?' },
      a: {
        es: 'Puedes escanear cualquier sitio, pero el análisis y las recomendaciones se basan en la ley colombiana de protección de datos.',
        en: 'You can scan any site, but the analysis and recommendations are based on Colombian data protection law.',
      },
    },
    {
      q: { es: '¿Qué hacen con mis datos?', en: 'What do you do with my data?' },
      a: {
        es: 'Escanear no pide datos personales. Para desbloquear el informe te pedimos nombre, cargo, correo y sector, y tu autorización para tratarlos: los usamos para entregarte el informe y contactarte sobre tu resultado, según nuestra política de tratamiento (en Políticas).',
        en: 'Scanning asks for no personal data. To unlock the report we ask for your name, role, email and sector, plus your authorization to process them: we use them to deliver the report and contact you about your result, under our data processing policy (see Policies).',
      },
    },
  ],

  // CTA intermedios: cada uno retoma lo que la persona acaba de leer
  riskCta: {
    es: '¿Tu sitio tiene alguno de estos riesgos? Compruébalo gratis',
    en: 'Does your site have any of these risks? Check it for free',
  },
  indexCta: { es: '¿En qué nivel está tu sitio?', en: 'What level is your site at?' },
  indexCtaSub: {
    es: 'Escribe tu dominio y obtén tu Índice de Confianza Digital.',
    en: 'Enter your domain and get your Digital Trust Index.',
  },
  includesCta: { es: 'Quiero saber si mi sitio cumple', en: 'I want to know if my site complies' },

  ctaTitle: { es: 'Descubre en minutos cómo está tu sitio', en: 'Find out how your site is doing' },
  ctaSubtitle: {
    es: 'Escribe tu dominio y obtén tu Índice de Confianza Digital gratis.',
    en: 'Enter your domain and get your Digital Trust Index for free.',
  },
};

// Descripción de cada área del ICD; los nombres y la agrupación vienen de icd.ts
const AREA_INFO: Record<string, { icon: typeof ShieldCheck; checks: L[] }> = {
  privacidad: {
    icon: FileText,
    checks: [
      { es: 'Política de tratamiento de datos personales', en: 'Personal data processing policy' },
      { es: 'Derechos del titular (habeas data)', en: 'Data subject rights (habeas data)' },
    ],
  },
  seguridad: {
    icon: Lock,
    checks: [
      { es: 'Certificado SSL / HTTPS', en: 'SSL / HTTPS certificate' },
      { es: 'Contenido mixto', en: 'Mixed content' },
      { es: 'Seguridad de formularios', en: 'Form security' },
      { es: 'Cabeceras de seguridad', en: 'Security headers' },
    ],
  },
  cookies: {
    icon: Cookie,
    checks: [
      { es: 'Banner de consentimiento de cookies', en: 'Cookie consent banner' },
      { es: 'Política de cookies', en: 'Cookie policy' },
    ],
  },
  transparencia: {
    icon: Eye,
    checks: [
      { es: 'Divulgación de scripts de terceros', en: 'Third-party script disclosure' },
      { es: 'Autorización en formularios', en: 'Consent on forms' },
    ],
  },
};

function SectionHead({ label, title, desc, light }: { label: string; title: string; desc?: string; light?: boolean }) {
  return (
    <div className="text-center mb-14 max-w-3xl mx-auto">
      <p className={`font-semibold uppercase tracking-widest mb-3 text-sm ${light ? 'text-[#6ed3c1]' : 'text-[#0f8b8d]'}`}>{label}</p>
      <h2 className={`text-3xl lg:text-5xl font-bold mb-5 ${light ? 'text-white' : 'text-[#1f2d3d]'}`}>{title}</h2>
      {desc && <p className={`text-lg ${light ? 'text-white/85' : 'text-gray-600'}`}>{desc}</p>}
    </div>
  );
}

export default function ScannerLanding() {
  const { locale } = useLanguage();
  const es = locale === 'es';

  return (
    <main className="min-h-screen bg-[#f7f8fa] overflow-x-clip">
      <LandingHeader />

      {/* HERO */}
      <section id="escanear" className="relative scroll-mt-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] rounded-full bg-[#6ed3c1]/20 blur-3xl" />
          <div className="absolute bottom-[-180px] right-[-120px] w-[600px] h-[600px] rounded-full bg-[#1e2a52]/20 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-[1.2fr_1fr] gap-14 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#6ed3c1]/15 text-[#0f8b8d] px-5 py-2 rounded-full text-sm font-medium mb-7">
              <ShieldCheck className="w-4 h-4" />
              {content.badge[locale]}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-[#1f2d3d] mb-6">
              {content.title[locale]}
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-9 max-w-2xl mx-auto lg:mx-0">
              {content.subtitle[locale]}
            </p>

            <div data-scan-cta className="bg-white rounded-[28px] shadow-2xl border border-gray-100 p-4 max-w-2xl mx-auto lg:mx-0">
              <ScanForm brand />
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 mt-6 text-sm text-gray-600">
              {content.trust.map((item) => (
                <span key={item.es} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0f8b8d]" />
                  {item[locale]}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <IcdPreview />
          </div>
        </div>
      </section>

      {/* RIESGO */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead label={content.riskLabel[locale]} title={content.riskTitle[locale]} />
          <div className="grid md:grid-cols-3 gap-8">
            {content.risks.map((r) => (
              <article key={r.title.es} className="bg-[#f7f8fa] rounded-[28px] p-8 border border-gray-100">
                <div className="w-14 h-14 rounded-2xl bg-[#6ed3c1]/15 flex items-center justify-center mb-5">
                  <r.icon className="w-7 h-7 text-[#0f8b8d]" />
                </div>
                <h3 className="text-xl font-bold text-[#1f2d3d] mb-3">{r.title[locale]}</h3>
                <p className="text-gray-600 leading-relaxed">{r.text[locale]}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 max-w-3xl mx-auto text-center rounded-2xl border border-[#e91e8c]/20 bg-[#e91e8c]/5 px-6 py-5">
            <p className="text-[#1f2d3d] font-semibold">{content.fine[locale]}</p>
            <p className="text-xs text-gray-500 mt-1">{content.fineSource[locale]}</p>
          </div>

          <div data-scan-cta className="mt-12 max-w-3xl mx-auto text-center">
            <p className="text-xl font-bold text-[#1f2d3d] mb-5">{content.riskCta[locale]}</p>
            <div className="bg-[#f7f8fa] rounded-[28px] border border-gray-100 p-4">
              <ScanForm brand />
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ REVISAMOS */}
      <section id="que-revisamos" className="py-24 bg-[#f7f8fa] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead label={content.checksLabel[locale]} title={content.checksTitle[locale]} desc={content.checksDesc[locale]} />
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {ICD_AREAS.map((area) => {
              const info = AREA_INFO[area.id];
              if (!info) return null;
              return (
                <article key={area.id} className="bg-white rounded-[28px] p-7 border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-[#1e2a52]/5 flex items-center justify-center mb-5">
                    <info.icon className="w-6 h-6 text-[#1e2a52]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1f2d3d] mb-4">{es ? area.nameEs : area.nameEn}</h3>
                  <ul className="space-y-2.5">
                    {info.checks.map((c) => (
                      <li key={c.es} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-[#0f8b8d] shrink-0 mt-0.5" />
                        {c[locale]}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ÍNDICE DE CONFIANZA DIGITAL */}
      <section id="indice" className={`py-24 scroll-mt-20 ${GRADIENT}`}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionHead label={content.indexLabel[locale]} title={content.indexTitle[locale]} desc={content.indexDesc[locale]} light />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...ICD_LEVELS].reverse().map((level) => (
              <article key={level.id} className="bg-white rounded-[24px] p-6 border-t-4" style={{ borderTopColor: level.color }}>
                <p className="text-sm font-bold text-gray-500 mb-1">
                  {level.min}–{level.max}
                </p>
                <h3 className="text-xl font-extrabold mb-3" style={{ color: level.color }}>
                  {es ? level.nameEs : level.nameEn}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{es ? level.shortEs : level.shortEn}</p>
              </article>
            ))}
          </div>

          <div data-scan-cta className="mt-14 max-w-3xl mx-auto text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">{content.indexCta[locale]}</h3>
            <p className="text-white/85 mb-6">{content.indexCtaSub[locale]}</p>
            <div className="bg-white rounded-[28px] p-4 shadow-2xl">
              <ScanForm brand />
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA + QUÉ INCLUYE */}
      <section id="como-funciona" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHead label={content.howLabel[locale]} title={content.howTitle[locale]} />
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {content.steps.map((s, i) => (
              <article key={s.title.es} className="bg-[#f7f8fa] rounded-[28px] p-8 border border-gray-100">
                <div className="text-5xl font-black text-[#6ed3c1]/50 mb-5">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-xl font-bold text-[#1f2d3d] mb-3">{s.title[locale]}</h3>
                <p className="text-gray-600 leading-relaxed">{s.text[locale]}</p>
              </article>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: content.includesFree, items: content.includesFreeItems, dark: false },
              { title: content.includesFull, items: content.includesFullItems, dark: true },
            ].map((col) => (
              <div
                key={col.title.es}
                className={`rounded-[28px] p-8 ${col.dark ? `${GRADIENT} text-white` : 'bg-[#f7f8fa] border border-gray-100'}`}
              >
                <h3 className={`text-lg font-bold mb-5 ${col.dark ? 'text-white' : 'text-[#1f2d3d]'}`}>{col.title[locale]}</h3>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li key={item.es} className={`flex items-start gap-3 ${col.dark ? 'text-white/90' : 'text-gray-600'}`}>
                      <Check className={`w-5 h-5 shrink-0 ${col.dark ? 'text-[#6ed3c1]' : 'text-[#0f8b8d]'}`} />
                      {item[locale]}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#escanear-final"
              className="inline-block px-10 py-4 bg-[#0f8b8d] text-white font-bold rounded-full hover:bg-[#0c7475] transition-colors"
            >
              {content.includesCta[locale]}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="preguntas" className="py-24 bg-[#f7f8fa] scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHead label={content.faqLabel[locale]} title={content.faqTitle[locale]} />
          <div className="space-y-3">
            {content.faq.map((f) => (
              <details key={f.q.es} className="group bg-white rounded-2xl border border-gray-100 px-6 py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-[#1f2d3d]">
                  {f.q[locale]}
                  <span className="text-[#0f8b8d] text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {f.a[locale]}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="escanear-final" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className={`relative overflow-hidden rounded-[40px] p-10 lg:p-14 text-center shadow-2xl ${GRADIENT}`}>
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-5">{content.ctaTitle[locale]}</h2>
              <p className="text-white/90 text-lg lg:text-xl mb-10 max-w-2xl mx-auto">{content.ctaSubtitle[locale]}</p>
              <div data-scan-cta className="bg-white rounded-[28px] p-4 shadow-2xl max-w-2xl mx-auto">
                <ScanForm brand />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <MobileScanBar />
    </main>
  );
}
