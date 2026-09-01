'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/contexts/language';
import { ScanResponse } from '@/lib/scanner/types';
import { getICDLevel, getNextGoal, calcAreaScore, ICD_AREAS, ICD_LEVELS, worstStatus } from '@/lib/scanner/icd';
import { FINDINGS, FINDING_STATUS, selectFindings } from '@/lib/scanner/findings';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import LeadGate from '@/components/lead-gate';
import LeadGateModal from '@/components/lead-gate-modal';

import {
  Download,
  ChevronRight,
  Globe,
  Lock,
  Cookie,
  FileText,
} from 'lucide-react';

const STATUS_CHIP = {
  pass: { es: 'Correcto', en: 'Correct', color: '#0e9f6e', tint: '#e6f7f0' },
  warn: { es: 'Requiere revisión', en: 'Needs review', color: '#c27803', tint: '#fdf3df' },
  fail: { es: 'Atención', en: 'Attention', color: '#e02424', tint: '#fdeaea' },
  skip: { es: 'No aplica', en: 'N/A', color: '#6b7280', tint: '#f1f2f4' },
};

const RING_R = 62;
const RING_C = 2 * Math.PI * RING_R;

function ResultsContent() {
  const [scan, setScan] = useState<ScanResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

  const icd = getICDLevel(scan.score);
  const nextGoal = getNextGoal(scan.score, locale === 'es' ? 'es' : 'en');

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

          {/* 1. HERO ICD — anillo + nivel + escala */}
          {(() => {
            const es = locale === 'es';
            const ringOn = (RING_C * scan.score) / 100;
            const ordered = [...ICD_LEVELS].reverse(); // crítico → confiable

            return (
              <div className="bg-white rounded-[24px] border border-gray-200/70 shadow-[0_1px_2px_rgba(16,23,40,.04),0_8px_24px_-12px_rgba(16,23,40,.08)] p-6 sm:p-8 mb-6">
                <div className="flex flex-col sm:flex-row items-center gap-7 sm:gap-9">
                  {/* Anillo */}
                  <div className="relative w-40 h-40 sm:w-[164px] sm:h-[164px] shrink-0">
                    <svg width="100%" height="100%" viewBox="0 0 164 164" className="-rotate-90">
                      <circle cx="82" cy="82" r={RING_R} fill="none" stroke="#edf0f5" strokeWidth="14" />
                      {unlocked && (
                        <circle cx="82" cy="82" r={RING_R} fill="none" stroke={icd.color} strokeWidth="14" strokeLinecap="round"
                          strokeDasharray={`${ringOn.toFixed(1)} ${RING_C.toFixed(1)}`} />
                      )}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      {unlocked ? (
                        <>
                          <span className="text-[42px] font-extrabold leading-none tracking-tight text-[#101728]">{scan.score}</span>
                          <span className="text-[10px] font-semibold tracking-widest text-gray-400 mt-1">{es ? 'DE 100' : 'OF 100'}</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-7 h-7 text-gray-300" />
                          <span className="text-gray-400 text-xs font-medium mt-1.5 text-center px-4">{es ? 'Ingresa tu correo' : 'Enter your email'}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Nivel + interpretación */}
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-[10px] font-extrabold uppercase tracking-[2px] text-gray-400 mb-2">
                      {es ? 'Índice de Confianza Digital™' : 'Digital Trust Index™'} · <a href={`https://${scan.url}`} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-75 normal-case tracking-normal">{scan.url}</a>
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-full" style={{ color: icd.color, backgroundColor: icd.bg }}>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: icd.color }} />
                      {es ? icd.nameEs : icd.nameEn}
                    </span>
                    <p className="text-gray-600 leading-relaxed text-sm mt-3">
                      {es ? icd.interpretationEs : icd.interpretationEn}
                    </p>
                    {unlocked && nextGoal && (
                      <div className="mt-3.5 inline-flex items-center gap-2.5 bg-[#f0f7f7] border border-[#d5eaea] rounded-xl px-3.5 py-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0f8b8d]">{es ? 'Próxima meta' : 'Next goal'}</span>
                        <b className="text-xs text-[#1e2a52]">{es ? `Nivel ${nextGoal.name} · ${nextGoal.threshold} puntos` : `${nextGoal.name} level · ${nextGoal.threshold} points`}</b>
                      </div>
                    )}
                  </div>
                </div>

                {/* Escala */}
                <div className="flex items-start mt-6 pt-5 border-t border-gray-100 gap-1.5">
                  {ordered.map((l) => {
                    const current = l.id === icd.id;
                    return (
                      <div key={l.id} style={{ flex: `${l.max - l.min + 1} 0 0` }}>
                        <div className="h-2 rounded-full" style={{ backgroundColor: l.color, opacity: current ? 1 : 0.25, outline: current ? `3px solid ${l.color}33` : 'none' }} />
                        <p className="mt-2 text-[8.5px] font-bold uppercase tracking-wide leading-tight" style={{ color: current ? l.color : '#a3aab8' }}>{es ? l.nameEs : l.nameEn}</p>
                        <p className="text-[8.5px] text-gray-300 tabular-nums">{l.min}–{l.max}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* 2. ÁREAS — 4 cards */}
          {(() => {
            const es = locale === 'es';
            return (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
                {ICD_AREAS.map((a) => {
                  const status = worstStatus(scan.checks, a.checkIds);
                  const score = calcAreaScore(scan.checks, a.checkIds);
                  const chip = STATUS_CHIP[status];
                  const fillColor = getICDLevel(score).color;
                  return (
                    <div key={a.id} className="bg-white rounded-[20px] border border-gray-200/70 shadow-[0_1px_2px_rgba(16,23,40,.04),0_8px_24px_-12px_rgba(16,23,40,.08)] p-4 sm:p-5">
                      <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
                        <span className="font-bold text-[13px] text-[#101728]">{es ? a.nameEs : a.nameEn}</span>
                        {unlocked && (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap" style={{ color: chip.color, backgroundColor: chip.tint }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: chip.color }} />
                            {es ? chip.es : chip.en}
                          </span>
                        )}
                      </div>
                      {unlocked ? (
                        <>
                          <p className="text-[26px] font-extrabold tracking-tight text-[#101728] mb-2.5 tabular-nums">{score}<span className="text-xs text-gray-400 font-semibold ml-0.5">/100</span></p>
                          <div className="h-1.5 bg-[#edf0f5] rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: fillColor }} />
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-[26px] font-extrabold tracking-tight text-gray-300 mb-2.5 flex items-center gap-2"><Lock className="w-4 h-4" />—</p>
                          <div className="h-1.5 bg-[#edf0f5] rounded-full" />
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {/* 03 · PRINCIPALES HALLAZGOS */}
          <div className="mt-12">
            <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
              <div className="flex gap-3.5 items-start">
                <span className="w-9 h-9 rounded-xl bg-[#1e2a52] text-white text-sm font-extrabold flex items-center justify-center shrink-0">03</span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#101728]">{locale === 'es' ? 'Principales hallazgos' : 'Main findings'}</h2>
                  <p className="text-sm text-gray-400">{locale === 'es' ? 'Los cinco aspectos más relevantes del análisis' : 'The five most relevant aspects of the analysis'}</p>
                </div>
              </div>
              {unlocked && (
                <button onClick={handlePdf} className="h-11 px-6 rounded-2xl bg-[#0f8b8d] text-white font-semibold hover:bg-[#0c7475] transition flex items-center gap-2 text-sm">
                  <Download className="w-4 h-4" />
                  {t('download_pdf')}
                </button>
              )}
            </div>

            <div className="space-y-4">
              {selectFindings(scan.checks).map((c, i) => {
                const es = locale === 'es';
                const copy = FINDINGS[c.checkId];
                const chip = FINDING_STATUS[c.status as 'pass' | 'warn' | 'fail'];
                const ok = c.status === 'pass';
                return (
                  <article key={c.checkId} className="bg-white rounded-[20px] border border-gray-200/70 border-l-4 shadow-[0_1px_2px_rgba(16,23,40,.04),0_8px_24px_-12px_rgba(16,23,40,.08)] p-5 sm:p-6" style={{ borderLeftColor: unlocked ? chip.color : '#c7ccd6' }}>
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="text-[13px] font-extrabold text-gray-400 bg-[#f1f3f7] rounded-lg px-2.5 py-1.5 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="flex-1 font-extrabold text-[15px] text-[#101728] tracking-tight">{es ? copy.title.es : copy.title.en}</h3>
                      {unlocked ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full" style={{ color: chip.color, backgroundColor: chip.tint }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: chip.color }} />
                          {es ? chip.es : chip.en}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full bg-gray-100 text-gray-400"><Lock className="w-3 h-3" />———</span>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[1.4px] text-gray-400 mb-1">{es ? 'Qué detectamos' : 'What we detected'}</p>
                        {unlocked ? (
                          <p className="text-[13px] text-[#414b5f] leading-relaxed">{ok ? (es ? copy.detectedOk.es : copy.detectedOk.en) : (es ? copy.detectedBad.es : copy.detectedBad.en)}</p>
                        ) : (
                          <p className="text-[13px] text-gray-300 leading-relaxed blur-[3px] select-none">{es ? copy.detectedBad.es : copy.detectedBad.en}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[1.4px] text-gray-400 mb-1">{es ? 'Por qué importa' : 'Why it matters'}</p>
                        <p className="text-[13px] text-[#414b5f] leading-relaxed">{es ? copy.why.es : copy.why.en}</p>
                      </div>
                    </div>
                    <div className="mt-4 bg-[#f4f9f9] border border-[#dcecec] rounded-[14px] px-4 py-3 relative overflow-hidden flex gap-5 items-start justify-between">
                      {unlocked ? (
                        <>
                          <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-[1.4px] text-[#0f8b8d] mb-0.5">{es ? 'Recomendación' : 'Recommendation'}</p>
                            <p className="text-[13px] text-[#414b5f] leading-relaxed">{ok ? (es ? copy.recOk.es : copy.recOk.en) : (es ? copy.recBad.es : copy.recBad.en)}</p>
                          </div>
                          <span className="hidden sm:block shrink-0 text-[9.5px] text-gray-400 font-semibold max-w-[150px] text-right leading-snug pt-0.5">{es ? copy.norm.es : copy.norm.en}</span>
                        </>
                      ) : (
                        <>
                          <div className="blur-sm select-none pointer-events-none">
                            <p className="text-[10px] font-extrabold uppercase tracking-[1.4px] text-[#0f8b8d] mb-0.5">{es ? 'Recomendación' : 'Recommendation'}</p>
                            <p className="text-[13px] text-gray-500">{t('recommendation_text')}</p>
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
                        </>
                      )}
                    </div>
                  </article>
                );
              })}
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
          </div>

          {/* 04 · QUÉ SIGNIFICA PARA TU EMPRESA */}
          {(() => {
            const es = locale === 'es';
            const businessBullets: [string, string][] = es
              ? [['Confianza', 'La percepción de seguridad que tus clientes tienen al entregarte información.'],
                 ['Profesionalismo', 'La imagen que proyecta tu empresa en cada punto de contacto digital.'],
                 ['Protección', 'El resguardo real de la información que recopilas día a día.'],
                 ['Preparación', 'Tu posición frente a futuras revisiones, auditorías o reclamaciones.']]
              : [['Trust', 'How safe your customers feel when handing over their information.'],
                 ['Professionalism', 'The image your company projects at every digital touchpoint.'],
                 ['Protection', 'The real safeguarding of the information you collect every day.'],
                 ['Readiness', 'Your position for future reviews, audits or claims.']];

            const areaStates = ICD_AREAS.map((a) => ({ ...a, status: worstStatus(scan.checks, a.checkIds) }));
            const names = (s: 'fail' | 'warn' | 'pass') => areaStates.filter((a) => a.status === s).map((a) => (es ? a.nameEs : a.nameEn)).join(' · ');
            const priorities = [
              { color: '#e02424', tint: '#fdeaea', label: es ? 'Prioridad alta' : 'High priority', areas: names('fail'),
                text: es ? 'Revisar lo antes posible: puede impactar la protección de la información y la confianza de los usuarios.' : 'Review as soon as possible: it can impact information protection and user trust.' },
              { color: '#c27803', tint: '#fdf3df', label: es ? 'Prioridad media' : 'Medium priority', areas: names('warn'),
                text: es ? 'Oportunidades claras para fortalecer el cumplimiento y reducir riesgos futuros.' : 'Clear opportunities to strengthen compliance and reduce future risks.' },
              { color: '#0e9f6e', tint: '#e6f7f0', label: es ? 'Prioridad baja' : 'Low priority', areas: names('pass'),
                text: es ? 'Nivel adecuado; mantener controles y realizar revisiones periódicas.' : 'Adequate level; keep controls in place and review periodically.' },
            ];

            return (
              <div className="mt-12">
                <div className="flex gap-3.5 items-start mb-5">
                  <span className="w-9 h-9 rounded-xl bg-[#1e2a52] text-white text-sm font-extrabold flex items-center justify-center shrink-0">04</span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#101728]">{es ? '¿Qué significa para tu empresa?' : 'What this means for your company'}</h2>
                    <p className="text-sm text-gray-400">{es ? 'El impacto de estos resultados en el negocio' : 'The business impact of these results'}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {businessBullets.map(([h, d]) => (
                    <div key={h} className="bg-white rounded-[20px] border border-gray-200/70 shadow-[0_1px_2px_rgba(16,23,40,.04),0_8px_24px_-12px_rgba(16,23,40,.08)] p-5 sm:p-6">
                      <div className="w-7 h-1 rounded-full bg-gradient-to-r from-[#0f8b8d] to-[#67d4cf] mb-3" />
                      <h4 className="font-extrabold text-[15px] text-[#101728] mb-1 tracking-tight">{h}</h4>
                      <p className="text-[13px] text-gray-500 leading-relaxed">{d}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 bg-white rounded-[20px] border border-gray-200/70 border-l-4 shadow-[0_1px_2px_rgba(16,23,40,.04),0_8px_24px_-12px_rgba(16,23,40,.08)] p-5 sm:p-6" style={{ borderLeftColor: icd.color }}>
                  <span className="inline-flex items-center gap-2 text-[11px] font-bold px-3 py-1.5 rounded-full" style={{ color: icd.color, backgroundColor: icd.bg }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: icd.color }} />
                    {es ? `Recomendación para tu nivel · ${icd.nameEs}` : `Recommendation for your level · ${icd.nameEn}`}
                  </span>
                  <p className="text-[13px] text-[#414b5f] leading-relaxed mt-3">{es ? icd.recommendationEs : icd.recommendationEn}</p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 mt-4">
                  {priorities.map((p) => (
                    <div key={p.label} className="bg-white rounded-[18px] border border-gray-200/70 border-t-4 shadow-[0_1px_2px_rgba(16,23,40,.04),0_8px_24px_-12px_rgba(16,23,40,.08)] p-5" style={{ borderTopColor: p.color }}>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full" style={{ color: p.color, backgroundColor: p.tint }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
                        {p.label}
                      </span>
                      <p className="text-[12px] text-gray-500 leading-relaxed mt-2.5">{p.text}</p>
                      <p className="text-[11.5px] font-bold text-[#101728] border-t border-gray-100 pt-2.5 mt-2.5">
                        {unlocked ? (p.areas || (es ? 'Ninguna área en este nivel' : 'No areas at this level')) : '———'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

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

      {/* 05 · EL PRIMER PASO + CTA LegalCheck 360° */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {(() => {
            const es = locale === 'es';
            const notAnalyzed = es
              ? ['cómo se almacenan realmente los datos', 'quién tiene acceso a ellos', 'si tus documentos reflejan la operación de tu empresa', 'si tus procesos cumplen con la normativa', 'cómo respondes ante incidentes de seguridad']
              : ['how data is actually stored', 'who has access to it', 'whether your documents reflect your company’s operation', 'whether your processes comply with regulations', 'how you respond to security incidents'];
            const waMessage = encodeURIComponent(es
              ? `Hola, escaneé el sitio ${scan.url} con el Scanner de TDE y mi Índice de Confianza Digital es ${scan.score} (${icd.nameEs}). Me gustaría agendar una sesión de revisión personalizada.`
              : `Hi, I scanned ${scan.url} with the TDE Scanner and my Digital Trust Index is ${scan.score} (${icd.nameEn}). I would like to schedule a personalized review session.`);
            return (
              <>
                <div className="flex gap-3.5 items-start mb-5">
                  <span className="w-9 h-9 rounded-xl bg-[#1e2a52] text-white text-sm font-extrabold flex items-center justify-center shrink-0">05</span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#101728]">{es ? 'Este análisis es solo el primer paso' : 'This analysis is only the first step'}</h2>
                    <p className="text-sm text-gray-400">{es ? 'Lo que este análisis no alcanza a ver' : 'What this analysis cannot see'}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {notAnalyzed.map((n) => (
                    <div key={n} className="bg-white rounded-[14px] border border-gray-200/70 px-4 py-3 text-[13px] text-[#414b5f] flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-lg bg-[#f1f3f7] text-gray-400 text-[11px] font-extrabold flex items-center justify-center shrink-0">×</span>
                      {n}
                    </div>
                  ))}
                </div>

                <div className="rounded-[24px] bg-[radial-gradient(120%_160%_at_90%_-30%,#2d7d9a_0%,#1e2a52_50%,#151d3b_100%)] p-8 sm:p-10 shadow-[0_24px_48px_-20px_rgba(30,42,82,.45)] flex flex-col sm:flex-row items-center gap-7 justify-between">
                  <div className="text-center sm:text-left">
                    <p className="text-[11px] font-extrabold uppercase tracking-[2.6px] text-[#67d4cf]">{es ? 'Diagnóstico integral' : 'Comprehensive diagnosis'}</p>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1.5 mb-2">LegalCheck 360°</h3>
                    <p className="text-[#b9c3dd] text-sm max-w-md">{es
                      ? 'Revisa la operación digital, los procesos y la documentación de tu empresa para entregar un mapa de riesgos y un plan de acción priorizado.'
                      : 'Reviews your company’s digital operation, processes and documentation to deliver a risk map and a prioritized action plan.'}</p>
                    <p className="text-[#8fa2c9] text-[11px] mt-2.5">+57 314 399 2911 · info@tde.com.co · tde.com.co</p>
                  </div>
                  <a href={`https://wa.me/573143992911?text=${waMessage}`} target="_blank" rel="noopener noreferrer"
                     className="shrink-0 bg-white text-[#1e2a52] font-extrabold text-sm px-7 py-3.5 rounded-[14px] shadow-[0_8px_20px_-8px_rgba(0,0,0,.4)] hover:scale-105 transition">
                    {es ? 'Solicitar una sesión →' : 'Request a session →'}
                  </a>
                </div>
              </>
            );
          })()}
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