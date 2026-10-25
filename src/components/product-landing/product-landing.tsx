'use client';

import {
  FileText, ShieldCheck, Lock, Users, Database, FileSignature, Scale, Camera, Globe,
  TriangleAlert, GraduationCap, Mail, Fingerprint, Brain, Building2, Stethoscope,
  ClipboardCheck, Search, Workflow, Gavel, ShoppingCart, Handshake, UserCheck, Eye,
  Clock, Award, MonitorSmartphone, Network, KeyRound, Siren, Video, Mic, BadgeCheck,
  ListChecks, Share2, Briefcase, Presentation, Route, FileCheck, Calculator, House, Code,
  Check,
} from 'lucide-react';
import { useLanguage } from '@/contexts/language';
import SiteFooter from '@/components/site-footer';
import type { IconName, LandingContent, L } from '@/lib/landings/types';
import { whatsappUrl } from '@/lib/landings/whatsapp';
import ProductHeader from './product-header';

const ICONS: Record<IconName, typeof Check> = {
  FileText, ShieldCheck, Lock, Users, Database, FileSignature, Scale, Camera, Globe,
  TriangleAlert, GraduationCap, Mail, Fingerprint, Brain, Building2, Stethoscope,
  ClipboardCheck, Search, Workflow, Gavel, ShoppingCart, Handshake, UserCheck, Eye,
  Clock, Award, MonitorSmartphone, Network, KeyRound, Siren, Video, Mic, BadgeCheck,
  ListChecks, Share2, Briefcase, Presentation, Route, FileCheck, Calculator, House, Code,
};

const GRADIENT = 'bg-[linear-gradient(120deg,#1e2a52_0%,#1e2a52_38%,#2d7d9a_50%,#1e2a52_62%,#1e2a52_100%)]';

const WA_ICON = (
  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const UI = {
  howLink: { es: 'Ver cómo funciona', en: 'See how it works' },
  faqLabel: { es: 'Preguntas frecuentes', en: 'FAQ' },
  faqTitle: { es: 'Lo que nos preguntan', en: 'What people ask us' },
  faqNav: { es: 'Preguntas', en: 'FAQ' },
  finalNote: {
    es: 'Te responde una persona del equipo de TDE por WhatsApp.',
    en: 'A member of the TDE team will reply on WhatsApp.',
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

function WhatsAppCta({ href, label, size = 'lg' }: { href: string; label: string; size?: 'lg' | 'md' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 bg-[#0f8b8d] text-white font-bold rounded-full hover:bg-[#0c7475] transition-colors ${
        size === 'lg' ? 'px-9 py-4 text-base' : 'px-7 py-3 text-sm'
      }`}
    >
      {WA_ICON}
      {label}
    </a>
  );
}

export default function ProductLanding({ content: c }: { content: LandingContent }) {
  const { locale } = useLanguage();
  const tr = (l: L) => l[locale];
  const wa = whatsappUrl(tr(c.whatsapp));

  const nav = [
    { href: '#incluye', label: c.includes.label },
    { href: '#como-funciona', label: c.process.label },
    ...(c.audience ? [{ href: '#para-quien', label: c.audience.label }] : []),
    { href: '#preguntas', label: UI.faqNav },
  ];

  return (
    <main className="min-h-screen bg-[#f7f8fa] overflow-x-clip">
      <ProductHeader name={c.name} path={c.path} nav={nav} ctaHref={wa} ctaLabel={c.hero.cta} />

      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] rounded-full bg-[#6ed3c1]/20 blur-3xl" />
          <div className="absolute bottom-[-180px] right-[-120px] w-[600px] h-[600px] rounded-full bg-[#1e2a52]/20 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-[1.2fr_1fr] gap-14 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#6ed3c1]/15 text-[#0f8b8d] px-5 py-2 rounded-full text-sm font-medium mb-7">
              <ShieldCheck className="w-4 h-4" />
              {tr(c.hero.badge)}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-[#1f2d3d] mb-6">{tr(c.hero.title)}</h1>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-9 max-w-2xl mx-auto lg:mx-0">{tr(c.hero.subtitle)}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <WhatsAppCta href={wa} label={tr(c.hero.cta)} />
              <a href="#como-funciona" className="px-6 py-4 font-semibold text-[#1e2a52] hover:text-[#0f8b8d] transition-colors">
                {tr(UI.howLink)} →
              </a>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 mt-7 text-sm text-gray-600">
              {c.hero.trust.map((item) => (
                <span key={item.es} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0f8b8d]" />
                  {tr(item)}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-white rounded-[28px] shadow-2xl border border-gray-100 p-7 w-full max-w-md">
              <p className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#0f8b8d] mb-5">{tr(c.hero.card.title)}</p>
              <ul className="space-y-4">
                {c.hero.card.items.map((item) => {
                  const Icon = ICONS[item.icon];
                  return (
                    <li key={item.text.es} className="flex items-start gap-4">
                      <span className="w-10 h-10 rounded-xl bg-[#6ed3c1]/15 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#0f8b8d]" />
                      </span>
                      <span className="text-[#1f2d3d] font-medium leading-snug pt-2">{tr(item.text)}</span>
                    </li>
                  );
                })}
              </ul>
              {c.hero.card.note && <p className="mt-6 text-xs text-gray-400 text-center">{tr(c.hero.card.note)}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* RIESGO */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead label={tr(c.risk.label)} title={tr(c.risk.title)} />
          <div className="grid md:grid-cols-3 gap-8">
            {c.risk.cards.map((card) => {
              const Icon = ICONS[card.icon];
              return (
                <article key={card.title.es} className="bg-[#f7f8fa] rounded-[28px] p-8 border border-gray-100">
                  <div className="w-14 h-14 rounded-2xl bg-[#6ed3c1]/15 flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-[#0f8b8d]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1f2d3d] mb-3">{tr(card.title)}</h3>
                  {card.text && <p className="text-gray-600 leading-relaxed">{tr(card.text)}</p>}
                </article>
              );
            })}
          </div>
          {c.risk.note && (
            <div className="mt-10 max-w-3xl mx-auto text-center rounded-2xl border border-[#e91e8c]/20 bg-[#e91e8c]/5 px-6 py-5">
              <p className="text-[#1f2d3d] font-semibold">{tr(c.risk.note.text)}</p>
              {c.risk.note.source && <p className="text-xs text-gray-500 mt-1">{tr(c.risk.note.source)}</p>}
            </div>
          )}
          <div className="mt-12 text-center">
            <p className="text-xl font-bold text-[#1f2d3d] mb-5">{tr(c.risk.ctaQuestion)}</p>
            <WhatsAppCta href={wa} label={tr(c.hero.cta)} />
          </div>
        </div>
      </section>

      {/* EXPLICACIÓN (opcional) */}
      {c.explainer && (
        <section className={`py-24 ${GRADIENT}`}>
          <div className="max-w-6xl mx-auto px-6">
            <SectionHead label={tr(c.explainer.label)} title={tr(c.explainer.title)} light />
            <div className={`grid gap-6 ${c.explainer.items.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
              {c.explainer.items.map((item) => (
                <article key={item.title.es} className="bg-white rounded-[24px] p-7 border-t-4 border-[#6ed3c1]">
                  <h3 className="text-xl font-extrabold text-[#1e2a52] mb-3">{tr(item.title)}</h3>
                  <p className="text-gray-600 leading-relaxed">{tr(item.text)}</p>
                </article>
              ))}
            </div>
            {c.explainer.source && <p className="mt-8 text-center text-xs text-white/60">{tr(c.explainer.source)}</p>}
          </div>
        </section>
      )}

      {/* QUÉ INCLUYE */}
      <section id="incluye" className="py-24 scroll-mt-20 bg-[#f7f8fa]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead
            label={tr(c.includes.label)}
            title={tr(c.includes.title)}
            desc={c.includes.desc ? tr(c.includes.desc) : undefined}
          />
          {/* Con 7 u 8 tarjetas, 4 columnas para no dejar una sola en la última fila */}
          <div className={`grid md:grid-cols-2 gap-6 ${c.includes.cards.length >= 7 ? 'xl:grid-cols-4' : 'xl:grid-cols-3'}`}>
            {c.includes.cards.map((card) => {
              const Icon = ICONS[card.icon];
              return (
                <article key={card.title.es} className="bg-white rounded-[28px] p-7 border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-[#1e2a52]/5 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-[#1e2a52]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1f2d3d] mb-3">{tr(card.title)}</h3>
                  {card.text && <p className="text-gray-600 leading-relaxed text-[15px]">{tr(card.text)}</p>}
                  {card.items && (
                    <ul className="space-y-2.5 mt-3">
                      {card.items.map((it) => (
                        <li key={it.es} className="flex items-start gap-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-[#0f8b8d] shrink-0 mt-0.5" />
                          {tr(it)}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              );
            })}
          </div>
          {c.includes.note && <p className="mt-8 text-center text-sm text-gray-500">{tr(c.includes.note)}</p>}
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHead label={tr(c.process.label)} title={tr(c.process.title)} />
          <div className={`grid gap-6 ${c.process.steps.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
            {c.process.steps.map((s, i) => (
              <article key={s.title.es} className="bg-[#f7f8fa] rounded-[28px] p-7 border border-gray-100">
                <div className="text-5xl font-black text-[#6ed3c1]/50 mb-4">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-lg font-bold text-[#1f2d3d] mb-2">{tr(s.title)}</h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">{tr(s.text)}</p>
                {s.duration && (
                  <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#0f8b8d]">
                    <Clock className="w-4 h-4" />
                    {tr(s.duration)}
                  </p>
                )}
              </article>
            ))}
          </div>

          {c.process.table && (
            <div className="mt-12 max-w-2xl mx-auto rounded-[24px] border border-gray-100 overflow-hidden">
              <p className="bg-[#1e2a52] text-white font-bold px-6 py-4">{tr(c.process.table.title)}</p>
              <dl className="divide-y divide-gray-100 bg-white">
                {c.process.table.rows.map((r) => (
                  <div key={r.label.es} className="flex justify-between gap-4 px-6 py-3.5 text-sm">
                    <dt className="text-gray-600">{tr(r.label)}</dt>
                    <dd className="font-semibold text-[#1f2d3d] text-right">{tr(r.value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </section>

      {/* PARA QUIÉN */}
      {c.audience && (
        <section id="para-quien" className={`py-24 scroll-mt-20 ${GRADIENT}`}>
          <div className="max-w-6xl mx-auto px-6">
            <SectionHead label={tr(c.audience.label)} title={tr(c.audience.title)} light />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {c.audience.items.map((item) => {
                const Icon = ICONS[item.icon];
                return (
                  <div key={item.text.es} className="flex items-center gap-4 bg-white/10 border border-white/15 rounded-2xl px-5 py-4">
                    <Icon className="w-6 h-6 text-[#6ed3c1] shrink-0" />
                    <span className="text-white font-medium">{tr(item.text)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ENTREGABLES / BENEFICIOS */}
      {c.highlights && (
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <SectionHead label={tr(c.highlights.label)} title={tr(c.highlights.title)} />
            <div className={`grid gap-6 ${c.highlights.columns.length > 1 ? 'md:grid-cols-2' : 'max-w-2xl mx-auto'}`}>
              {c.highlights.columns.map((col) => (
                <div
                  key={col.title.es}
                  className={`rounded-[28px] p-8 ${col.dark ? `${GRADIENT} text-white` : 'bg-[#f7f8fa] border border-gray-100'}`}
                >
                  <h3 className={`text-lg font-bold mb-5 ${col.dark ? 'text-white' : 'text-[#1f2d3d]'}`}>{tr(col.title)}</h3>
                  <ul className="space-y-3">
                    {col.items.map((item) => (
                      <li key={item.es} className={`flex items-start gap-3 ${col.dark ? 'text-white/90' : 'text-gray-600'}`}>
                        <Check className={`w-5 h-5 shrink-0 ${col.dark ? 'text-[#6ed3c1]' : 'text-[#0f8b8d]'}`} />
                        {tr(item)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <WhatsAppCta href={wa} label={tr(c.highlights.cta)} />
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section id="preguntas" className="py-24 bg-[#f7f8fa] scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHead label={tr(UI.faqLabel)} title={tr(UI.faqTitle)} />
          <div className="space-y-3">
            {c.faq.map((f) => (
              <details key={f.q.es} className="group bg-white rounded-2xl border border-gray-100 px-6 py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-[#1f2d3d]">
                  {tr(f.q)}
                  <span className="text-[#0f8b8d] text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {tr(f.a)}
                  {f.link && (
                    <>
                      {' '}
                      <a href={f.link.href} className="text-[#0f8b8d] font-semibold hover:underline">
                        {tr(f.link.label)} →
                      </a>
                    </>
                  )}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className={`relative overflow-hidden rounded-[40px] p-10 lg:p-14 text-center shadow-2xl ${GRADIENT}`}>
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-5">{tr(c.final.title)}</h2>
              <p className="text-white/90 text-lg lg:text-xl mb-10 max-w-2xl mx-auto">{tr(c.final.subtitle)}</p>
              <WhatsAppCta href={wa} label={tr(c.hero.cta)} />
              <p className="mt-5 text-sm text-white/60">{tr(UI.finalNote)}</p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
