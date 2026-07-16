'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/contexts/language';
import { TranslationKey } from '@/lib/i18n';
import { ScanResponse } from '@/lib/scanner/types';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import LeadGate from '@/components/lead-gate';
import LeadGateModal from '@/components/lead-gate-modal';

import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Download,
  ChevronRight,
  ChevronDown,
  Globe,
  Lock,
  Cookie,
  FileText,
  SearchCheck,
  Shield,
  Scale,
} from 'lucide-react';

const SECURITY_CHECKS = new Set(['ssl', 'mixed_content', 'form_security', 'security_headers', 'third_party']);
// legal_pages se mantiene por scans cacheados anteriores al split en data_rights/cookie_policy
const LEGAL_CHECKS = new Set(['privacy_policy', 'data_rights', 'legal_pages', 'forms_consent', 'cookie_banner', 'cookie_policy']);

// Las 3 piezas legales que exige la SIC (Ley 1581 / Decreto 1377).
// Cada una se muestra como un solo ítem que consolida el estado de sus checks.
const LEGAL_ITEMS: { titleKey: TranslationKey; ids: string[] }[] = [
  { titleKey: 'legal_group_politica', ids: ['privacy_policy', 'data_rights', 'legal_pages'] },
  { titleKey: 'legal_group_aviso', ids: ['forms_consent'] },
  { titleKey: 'legal_group_cookies', ids: ['cookie_banner', 'cookie_policy'] },
];

function getRisk(score: number): 'green' | 'yellow' | 'red' {
  if (score >= 99) return 'green';
  if (score >= 85) return 'yellow';
  return 'red';
}

const RISK_COLOR = {
  green:  { hex: '#30c48d', border: 'border-green-200', bg: 'bg-green-100',  icon: 'text-green-500',  label: 'text-green-600'  },
  yellow: { hex: '#f5b942', border: 'border-yellow-200', bg: 'bg-yellow-100', icon: 'text-yellow-500', label: 'text-yellow-600' },
  red:    { hex: '#ef4444', border: 'border-red-200',   bg: 'bg-red-100',    icon: 'text-red-500',    label: 'text-red-600'    },
};

function calcSubScore(checks: { checkId: string; status: string; weight: number }[], ids: Set<string>) {
  const group = checks.filter(c => ids.has(c.checkId));
  if (!group.length) return 0;
  const passed = group.filter(c => c.status === 'pass').reduce((s, c) => s + c.weight, 0);
  const total = group.reduce((s, c) => s + c.weight, 0);
  return total ? Math.round((passed / total) * 100) : 0;
}

function ResultsContent() {
  const [scan, setScan] = useState<ScanResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'security' | 'legal'>('security');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) =>
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, locale } = useLanguage();

  useEffect(() => {
    const id = searchParams.get('id');

    if (!id) {
      router.push('/');
      return;
    }

    fetch(`/api/scan/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        setScan(data);
        if (searchParams.get('download') === 'true') {
          setUnlocked(true);
        }
      })
      .catch(() => router.push('/'))
      .finally(() => setLoading(false));
  }, [searchParams, router]);

  // Auto-download PDF when coming from email link (?download=true)
  useEffect(() => {
    if (scan && searchParams.get('download') === 'true') {
      handlePdf();
    }
  }, [scan]);

  function handlePdf() {
    if (!scan) return;

    fetch('/api/pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...scan, lang: locale }),
    })
      .then((res) => res.text())
      .then((html) => {
        const w = window.open('', '_blank');

        if (w) {
          w.document.write(html);
          w.document.close();
        }
      });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#6ed3c1] border-t-transparent rounded-full animate-spin mx-auto mb-6" />

          <p className="text-gray-600 text-lg">
            {t('loading_result')}
          </p>
        </div>
      </div>
    );
  }

  if (!scan) return null;

  const scoreColor = RISK_COLOR[getRisk(scan.score)].hex;

  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      {/* TOPBAR */}
      <div className="bg-[#ececec] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 min-h-12 py-2 flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-2 sm:gap-4 text-gray-700 flex-wrap">
            <span className="font-medium hidden sm:inline">
              {t('topbar_talk_advisor')}
            </span>

            <span className="text-[#0f8b8d] font-semibold">
              +57 314 399 2911
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-gray-600">
            <span>{t('topbar_follow_us')}</span>

            <div className="flex gap-2">
              <a href="https://www.instagram.com/transformaciondigitalempresas" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#6ed3c1] hover:bg-[#0f8b8d] transition-colors flex items-center justify-center text-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>

              <a href="https://www.facebook.com/transformaciondigitalempresarial" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#6ed3c1] hover:bg-[#0f8b8d] transition-colors flex items-center justify-center text-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>

              <a href="https://www.linkedin.com/company/transformaciondigitalempresarial" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#6ed3c1] hover:bg-[#0f8b8d] transition-colors flex items-center justify-center text-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute top-[-150px] left-[-120px] w-[500px] h-[500px] rounded-full bg-[#6ed3c1]/20 blur-3xl" />

        <div className="absolute bottom-[-180px] right-[-120px] w-[600px] h-[600px] rounded-full bg-[#1e2a52]/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
          {/* BACK */}
          <button
            onClick={() => router.push('/scanner')}
            className="flex items-center gap-2 text-[#0f8b8d] font-medium mb-10 hover:opacity-80 transition"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />

            {t('scan_another')}
          </button>

          {/* 1. SEMÁFORO */}
          {(() => {
            const risk = getRisk(scan.score);
            const { border: borderColor, bg: bgIcon, icon: iconColor, label: labelColor } = RISK_COLOR[risk];
            const label = risk === 'red'
              ? (locale === 'es' ? 'Riesgo alto' : 'High risk')
              : risk === 'yellow'
              ? (locale === 'es' ? 'Riesgo medio' : 'Medium risk')
              : (locale === 'es' ? 'Buen nivel de cumplimiento' : 'Good compliance level');
            const title = risk === 'red'
              ? (locale === 'es' ? '¡Acción inmediata requerida!' : 'Immediate action required!')
              : risk === 'yellow'
              ? (locale === 'es' ? 'Hay aspectos por mejorar' : 'There are areas to improve')
              : (locale === 'es' ? '¡Tu sitio está bien protegido!' : 'Your site is well protected!');
            const desc = risk === 'red'
              ? (locale === 'es' ? 'Tu nivel de riesgo es muy alto. Habla con un experto ahora.' : 'Your risk level is very high. Talk to an expert now.')
              : risk === 'yellow'
              ? (locale === 'es' ? 'Tu sitio tiene advertencias de cumplimiento. Te recomendamos revisarlas antes de que se conviertan en un problema.' : 'Your site has compliance warnings. We recommend reviewing them before they become a problem.')
              : (locale === 'es' ? 'Todos los controles analizados están en orden. Mantén este nivel con revisiones periódicas.' : 'All analyzed controls are in order. Keep this level with periodic reviews.');
            const Icon = risk === 'green' ? CheckCircle2 : AlertTriangle;

            return (
              <div className={`bg-white rounded-[28px] sm:rounded-[36px] border ${borderColor} shadow-xl p-5 sm:p-8 mb-8 sm:mb-10`}>
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl ${bgIcon} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${iconColor}`} />
                  </div>
                  <div>
                    <p className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base text-gray-700">
                      {locale === 'es' ? 'La pagina web: ' : 'The website: '}
                      <a href={`https://${scan.url}`} target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:opacity-75">{scan.url}</a>
                      {locale === 'es' ? ' tiene un : ' : ' has a : '}
                      <span className={labelColor}>{label}</span>
                    </p>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1f2d3d] mb-2 sm:mb-3">{title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{desc}</p>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* CHECKS — two columns */}
          <div className="mt-14">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div>
                <p className="text-[#0f8b8d] font-semibold uppercase tracking-widest text-xs sm:text-sm mb-1">{t('compliance_report')}</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2d3d]">{t('analysis_results')}</h2>
              </div>
              {unlocked && (
                <button onClick={handlePdf} className="h-11 px-6 rounded-2xl bg-[#0f8b8d] text-white font-semibold hover:bg-[#0c7475] transition flex items-center gap-2 text-sm">
                  <Download className="w-4 h-4" />
                  {t('download_pdf')}
                </button>
              )}
            </div>

            {(() => {
              const securityScore = calcSubScore(scan.checks, SECURITY_CHECKS);
              const legalScore = calcSubScore(scan.checks, LEGAL_CHECKS);

              const renderCheckItem = (check: typeof scan.checks[number], showRecommendation: boolean) => {
                const isPass = check.status === 'pass';
                const isWarn = check.status === 'warn';
                const isFail = check.status === 'fail';
                const label = locale === 'es' && check.labelEs ? check.labelEs : check.label;
                const details = locale === 'es' && check.detailsEs ? check.detailsEs : check.details;
                const suggestion = locale === 'es' && check.suggestionEs ? check.suggestionEs : check.suggestion;

                return (
                  <div key={check.checkId} className="border-b border-gray-100 last:border-0 px-4 sm:px-6 py-4 sm:py-5 space-y-3">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      {unlocked ? (
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isPass ? 'bg-green-100' : isWarn ? 'bg-yellow-100' : 'bg-red-100'}`}>
                          {isPass && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                          {isWarn && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                          {isFail && <XCircle className="w-4 h-4 text-red-600" />}
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-gray-100">
                          <Lock className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                      )}
                      <span className="flex-1 font-semibold text-[#1f2d3d] text-sm">{label}</span>
                      {unlocked ? (
                        <div className={`px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${isPass ? 'bg-green-100 text-green-700' : isWarn ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                          {locale === 'es' ? t(`status_${check.status === 'pass' ? 'pass' : check.status === 'warn' ? 'warn' : check.status === 'fail' ? 'fail' : 'skip'}` as const) : check.status.toUpperCase()}
                        </div>
                      ) : (
                        <div className="px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 bg-gray-100 text-gray-400">
                          {locale === 'es' ? '———' : '———'}
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <p className="text-gray-600 text-sm leading-relaxed">{details}</p>

                    {/* Recommendation */}
                    {showRecommendation && suggestion && (
                      <div className="bg-[#f7f8fa] rounded-xl p-4 border border-gray-200 flex items-start gap-3">
                        <SearchCheck className="w-4 h-4 text-[#0f8b8d] shrink-0 mt-0.5" />
                        <p className="text-gray-600 text-sm leading-relaxed">{suggestion}</p>
                      </div>
                    )}
                    {!showRecommendation && !unlocked && (
                      <div className="bg-[#f7f8fa] rounded-xl p-4 border border-gray-200 relative overflow-hidden">
                        <div className="blur-sm select-none pointer-events-none flex items-start gap-3">
                          <SearchCheck className="w-4 h-4 text-[#0f8b8d] shrink-0 mt-0.5" />
                          <p className="text-gray-600 text-sm">{t('recommendation_text')}</p>
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                          <div className="flex items-center gap-1.5 text-[#0f8b8d] font-semibold text-sm">
                            <Lock className="w-4 h-4" />
                            <span>{t('premium_recommendations_locked')}</span>
                          </div>
                          <button onClick={() => setShowModal(true)} className="text-[#0f8b8d] text-xs underline hover:text-[#0c7475] transition cursor-pointer">
                            {t('click_to_unlock')}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              };

              // Un ítem legal consolida varios checks en una sola fila:
              // el peor estado manda (fail > warn > pass) y se juntan detalles y sugerencias.
              const renderCompositeItem = (titleKey: TranslationKey, ids: string[]) => {
                const members = scan.checks.filter(c => ids.includes(c.checkId) && c.status !== 'skip');
                if (members.length === 0) return null;

                const freeMembers = members.filter(c => c.tier === 'free');
                const shown = unlocked ? members : freeMembers;
                const title = t(titleKey);

                // Solo checks premium y aún bloqueado: fila con nombre visible + candado
                if (shown.length === 0) {
                  return (
                    <div key={titleKey} className="border-b border-gray-100 last:border-0 px-4 sm:px-6 py-4 sm:py-5 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-gray-100">
                          <Lock className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                        <span className="flex-1 font-semibold text-[#1f2d3d] text-sm">{title}</span>
                        <div className="px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 bg-gray-100 text-gray-400">———</div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{t('legal_group_locked')}</p>
                    </div>
                  );
                }

                const statuses = shown.map(c => c.status);
                const status = statuses.includes('fail') ? 'fail' : statuses.includes('warn') ? 'warn' : 'pass';
                const isPass = status === 'pass';
                const isWarn = status === 'warn';
                const isFail = status === 'fail';
                const details = shown
                  .map(c => (locale === 'es' && c.detailsEs ? c.detailsEs : c.details))
                  .filter(Boolean);
                const suggestions = shown
                  .filter(c => c.status !== 'pass')
                  .map(c => (locale === 'es' && c.suggestionEs ? c.suggestionEs : c.suggestion))
                  .filter(Boolean);

                return (
                  <div key={titleKey} className="border-b border-gray-100 last:border-0 px-4 sm:px-6 py-4 sm:py-5 space-y-3">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      {unlocked ? (
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isPass ? 'bg-green-100' : isWarn ? 'bg-yellow-100' : 'bg-red-100'}`}>
                          {isPass && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                          {isWarn && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                          {isFail && <XCircle className="w-4 h-4 text-red-600" />}
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-gray-100">
                          <Lock className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                      )}
                      <span className="flex-1 font-semibold text-[#1f2d3d] text-sm">{title}</span>
                      {unlocked ? (
                        <div className={`px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${isPass ? 'bg-green-100 text-green-700' : isWarn ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                          {locale === 'es' ? t(`status_${status}` as TranslationKey) : status.toUpperCase()}
                        </div>
                      ) : (
                        <div className="px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 bg-gray-100 text-gray-400">———</div>
                      )}
                    </div>

                    {/* Details */}
                    {details.map((d, i) => (
                      <p key={i} className="text-gray-600 text-sm leading-relaxed">{d}</p>
                    ))}

                    {/* Recommendations */}
                    {unlocked && suggestions.length > 0 && (
                      <div className="bg-[#f7f8fa] rounded-xl p-4 border border-gray-200 space-y-3">
                        {suggestions.map((s, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <SearchCheck className="w-4 h-4 text-[#0f8b8d] shrink-0 mt-0.5" />
                            <p className="text-gray-600 text-sm leading-relaxed">{s}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {!unlocked && (
                      <div className="bg-[#f7f8fa] rounded-xl p-4 border border-gray-200 relative overflow-hidden">
                        <div className="blur-sm select-none pointer-events-none flex items-start gap-3">
                          <SearchCheck className="w-4 h-4 text-[#0f8b8d] shrink-0 mt-0.5" />
                          <p className="text-gray-600 text-sm">{t('recommendation_text')}</p>
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                          <div className="flex items-center gap-1.5 text-[#0f8b8d] font-semibold text-sm">
                            <Lock className="w-4 h-4" />
                            <span>{t('premium_recommendations_locked')}</span>
                          </div>
                          <button onClick={() => setShowModal(true)} className="text-[#0f8b8d] text-xs underline hover:text-[#0c7475] transition cursor-pointer">
                            {t('click_to_unlock')}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              };

              const renderColumn = (
                titleEs: string, titleEn: string,
                icon: React.ReactNode,
                score: number, accentColor: string,
                ids: Set<string>,
                composite?: { titleKey: TranslationKey; ids: string[] }[]
              ) => {
                const scoreColor = RISK_COLOR[getRisk(score)].hex;
                const colChecks = scan.checks.filter(c => ids.has(c.checkId));
                const freeChecks = colChecks.filter(c => c.tier === 'free');
                const premiumChecks = colChecks.filter(c => c.tier === 'premium');

                return (
                  <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-gray-100 shadow-xl overflow-hidden flex flex-col">
                    {/* Column header */}
                    <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100" style={{ borderTop: `4px solid ${accentColor}` }}>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}18` }}>
                            {icon}
                          </div>
                          <h3 className="font-bold text-[#1f2d3d]">
                            {locale === 'es' ? titleEs : titleEn}
                          </h3>
                        </div>
                        <div className="text-right">
                          {unlocked ? (
                            <>
                              <span className="text-2xl font-bold" style={{ color: scoreColor }}>{score}</span>
                              <span className="text-gray-400 text-sm"> / 100</span>
                            </>
                          ) : (
                            <div className="flex items-center gap-1.5 text-gray-400">
                              <Lock className="w-4 h-4" />
                              <span className="text-sm font-medium">{locale === 'es' ? 'Bloqueado' : 'Locked'}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Checks */}
                    <div className="flex-1">
                      {composite ? (
                        composite.map((item) => renderCompositeItem(item.titleKey, item.ids))
                      ) : (
                        <>
                          {freeChecks.map(c => renderCheckItem(c, unlocked))}

                          {unlocked && premiumChecks.map(c => renderCheckItem(c, true))}
                        </>
                      )}
                    </div>
                  </div>
                );
              };

              return (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    {renderColumn(
                      'Seguridad Digital', 'Digital Security',
                      <Shield className="w-5 h-5" style={{ color: '#1e2a52' }} />,
                      securityScore, '#1e2a52', SECURITY_CHECKS
                    )}
                    {renderColumn(
                      'Cumplimiento Legal', 'Legal Compliance',
                      <Scale className="w-5 h-5" style={{ color: '#0f8b8d' }} />,
                      legalScore, '#0f8b8d', LEGAL_CHECKS, LEGAL_ITEMS
                    )}
                  </div>

                  {!unlocked && (
                    <div id="lead-gate" className="mt-6">
                      <LeadGate
                        scanId={scan.id}
                        url={scan.url}
                        score={scan.score}
                        onUnlock={() => setUnlocked(true)}
                      />
                    </div>
                  )}
                </>
              );
            })()}
          </div>

          {/* 3. CALIFICACIÓN GLOBAL */}
          <div className="mt-8 sm:mt-10 bg-white rounded-[28px] sm:rounded-[36px] shadow-xl border border-gray-100 p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
              <div>
                <p className="text-gray-500 text-sm mb-1">{t('site_analyzed')}</p>
                <h2 className="text-lg sm:text-2xl font-bold text-[#1f2d3d] break-all">{scan.url}</h2>
              </div>
              <div className="flex items-center gap-2 text-[#0f8b8d] text-sm font-medium shrink-0">
                <div className="w-3 h-3 rounded-full bg-[#30c48d]" />
                {t('scan_complete')}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10">
              {/* Circle */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 shrink-0">
                <div className="absolute inset-0 rounded-full border-[16px] border-[#eaf5f3]" />
                <div
                  className="absolute inset-0 rounded-full border-[16px] border-transparent"
                  style={unlocked
                    ? { borderTopColor: scoreColor, borderRightColor: scoreColor, transform: `rotate(${scan.score * 1.8}deg)` }
                    : { borderTopColor: '#d1d5db', borderRightColor: '#d1d5db', transform: 'rotate(90deg)' }
                  }
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {unlocked ? (
                    <>
                      <span className="text-5xl sm:text-6xl font-bold text-[#1f2d3d]">{scan.score}</span>
                      <span className="font-semibold mt-1 text-sm" style={{ color: scoreColor }}>
                        {getRisk(scan.score) === 'green' ? t('compliance_high') : getRisk(scan.score) === 'yellow' ? t('risk_medium') : t('risk_high')}
                      </span>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <Lock className="w-8 h-8 text-gray-300" />
                      <span className="text-gray-400 text-sm font-medium text-center px-4">
                        {locale === 'es' ? 'Ingresa tu correo' : 'Enter your email'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {/* Summary */}
              <div className="grid grid-cols-3 gap-4 flex-1 w-full">
                <div className="bg-[#f7f8fa] rounded-2xl p-5 text-center">
                  <p className={`text-3xl font-bold ${unlocked ? 'text-[#30c48d]' : 'text-gray-300'}`}>
                    {unlocked ? scan.summary.pass : '—'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{t('passed')}</p>
                </div>
                <div className="bg-[#f7f8fa] rounded-2xl p-5 text-center">
                  <p className={`text-3xl font-bold ${unlocked ? 'text-[#f5b942]' : 'text-gray-300'}`}>
                    {unlocked ? scan.summary.warn : '—'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{t('warnings')}</p>
                </div>
                <div className="bg-[#f7f8fa] rounded-2xl p-5 text-center">
                  <p className={`text-3xl font-bold ${unlocked ? 'text-[#ef4444]' : 'text-gray-300'}`}>
                    {unlocked ? scan.summary.fail : '—'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{t('failed')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. DATOS DETECTADOS */}
          <div className="mt-6 bg-white rounded-[28px] sm:rounded-[36px] border border-gray-100 shadow-xl p-5 sm:p-8">
            <h2 className="text-xl font-bold text-[#1f2d3d] mb-6">{t('detected_data')}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Globe, label: t('label_domain'), value: scan.url },
                { icon: Lock, label: t('label_https'), value: t('label_active') },
                { icon: Cookie, label: t('label_cookies'), value: `${scan.summary.warn + scan.summary.fail} ${t('label_detected')}` },
                { icon: FileText, label: t('label_policies'), value: t('label_analyzed') },
              ].map((item) => (
                <div key={item.label} className="bg-[#f7f8fa] rounded-2xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-[#6ed3c1]/15 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-[#0f8b8d]" />
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <p className="font-bold text-[#1f2d3d] text-sm break-all">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-[28px] sm:rounded-[40px] bg-[linear-gradient(120deg,#1e2a52_0%,#1e2a52_38%,#2d7d9a_50%,#1e2a52_62%,#1e2a52_100%)] p-8 sm:p-14 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 sm:mb-6">
              {t('need_legal_help')}
            </h2>

            <p className="text-white/90 text-base sm:text-xl mb-6 sm:mb-10 max-w-2xl mx-auto">
              {t('need_legal_help_desc')}
            </p>

            <button className="h-12 sm:h-14 px-7 sm:px-10 rounded-2xl bg-white text-[#0f8b8d] font-bold hover:scale-105 transition text-sm sm:text-base">
              {t('talk_advisor')}
            </button>
          </div>
        </div>
      </section>

      {/* LEAD GATE MODAL */}
      {showModal && !unlocked && (
        <LeadGateModal
          scanId={scan.id}
          url={scan.url}
          score={scan.score}
          onUnlock={() => { setUnlocked(true); setShowModal(false); }}
          onClose={() => setShowModal(false)}
        />
      )}

      <SiteFooter />
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#6ed3c1] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}