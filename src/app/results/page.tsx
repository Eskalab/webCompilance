'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/contexts/language';
import { ScanResponse } from '@/lib/scanner/types';
import SiteHeader from '@/components/site-header';
import LeadGate from '@/components/lead-gate';

import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Download,
  ChevronRight,
  Globe,
  Lock,
  Cookie,
  FileText,
  SearchCheck,
} from 'lucide-react';

function ResultsContent() {
  const [scan, setScan] = useState<ScanResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);

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
      .then((data) => setScan(data))
      .catch(() => router.push('/'))
      .finally(() => setLoading(false));
  }, [searchParams, router]);

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

  const scoreColor =
    scan.score >= 80
      ? '#30c48d'
      : scan.score >= 50
      ? '#f5b942'
      : '#ef4444';

  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      {/* TOPBAR */}
      <div className="bg-[#ececec] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-gray-700">
            <span className="font-medium">
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

        <div className="absolute bottom-[-180px] right-[-120px] w-[600px] h-[600px] rounded-full bg-[#4cb8c4]/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          {/* BACK */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-[#0f8b8d] font-medium mb-10 hover:opacity-80 transition"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />

            {t('scan_another')}
          </button>

          {/* TOP SECTION */}
          <div className="grid lg:grid-cols-[420px,1fr] gap-10">
            {/* LEFT SCORE */}
            <div className="bg-white rounded-[36px] shadow-xl border border-gray-100 p-10">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="text-gray-500 text-sm mb-1">
                    {t('site_analyzed')}
                  </p>

                  <h1 className="text-2xl font-bold text-[#1f2d3d] break-all">
                    {scan.url}
                  </h1>
                </div>

                <div className="flex items-center gap-2 text-[#0f8b8d] text-sm font-medium">
                  <div className="w-3 h-3 rounded-full bg-[#30c48d]" />

                  {t('scan_complete')}
                </div>
              </div>

              {/* CIRCLE */}
              <div className="relative w-64 h-64 mx-auto mb-10">
                <div className="absolute inset-0 rounded-full border-[18px] border-[#eaf5f3]" />

                <div
                  className="absolute inset-0 rounded-full border-[18px] border-transparent"
                  style={{
                    borderTopColor: scoreColor,
                    borderRightColor: scoreColor,
                    transform: `rotate(${scan.score * 1.8}deg)`,
                  }}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-7xl font-bold text-[#1f2d3d]">
                    {scan.score}
                  </span>

                  <span
                    className="font-semibold mt-2"
                    style={{ color: scoreColor }}
                  >
                    {scan.score >= 80
                      ? t('compliance_high')
                      : scan.score >= 50
                      ? t('risk_medium')
                      : t('risk_high')}
                  </span>
                </div>
              </div>

              {/* SUMMARY */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#f7f8fa] rounded-2xl p-5 text-center">
                  <p className="text-3xl font-bold text-[#30c48d]">
                    {scan.summary.pass}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    {t('passed')}
                  </p>
                </div>

                <div className="bg-[#f7f8fa] rounded-2xl p-5 text-center">
                  <p className="text-3xl font-bold text-[#f5b942]">
                    {scan.summary.warn}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    {t('warnings')}
                  </p>
                </div>

                <div className="bg-[#f7f8fa] rounded-2xl p-5 text-center">
                  <p className="text-3xl font-bold text-[#ef4444]">
                    {scan.summary.fail}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    {t('failed')}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              {/* QUICK INFO */}
              <div className="bg-white rounded-[36px] border border-gray-100 shadow-xl p-8">
                <h2 className="text-2xl font-bold text-[#1f2d3d] mb-8">
                  {t('detected_data')}
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: Globe,
                      label: t('label_domain'),
                      value: scan.url,
                    },
                    {
                      icon: Lock,
                      label: t('label_https'),
                      value: t('label_active'),
                    },
                    {
                      icon: Cookie,
                      label: t('label_cookies'),
                      value: `${scan.summary.warn + scan.summary.fail} ${t('label_detected')}`,
                    },
                    {
                      icon: FileText,
                      label: t('label_policies'),
                      value: t('label_analyzed'),
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-[#f7f8fa] rounded-3xl p-6"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-[#6ed3c1]/15 flex items-center justify-center mb-4">
                        <item.icon className="w-7 h-7 text-[#0f8b8d]" />
                      </div>

                      <p className="text-sm text-gray-500 mb-1">
                        {item.label}
                      </p>

                      <h3 className="font-bold text-[#1f2d3d] break-all">
                        {item.value}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>

              {/* ALERT */}
              {scan.summary.fail > 0 && (
                <div className="bg-white rounded-[36px] border border-red-100 shadow-xl p-8">
                  <div className="flex items-start gap-5">
                    <div className="w-16 h-16 rounded-3xl bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>

                    <div>
                      <p className="text-red-500 font-semibold mb-2">
                        {t('risks_detected')}
                      </p>

                      <h3 className="text-2xl font-bold text-[#1f2d3d] mb-4">
                        {t('risk_alert_title')}
                      </h3>

                      <p className="text-gray-600 leading-relaxed">
                        {t('risk_alert_desc')}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CHECKS */}
          <div className="mt-14">
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl overflow-hidden">
              <div className="px-10 py-8 border-b border-gray-100">
                <div className="flex items-center justify-between flex-wrap gap-6">
                  <div>
                    <p className="text-[#0f8b8d] font-semibold uppercase tracking-widest text-sm mb-2">
                      {t('compliance_report')}
                    </p>

                    <h2 className="text-4xl font-bold text-[#1f2d3d]">
                      {t('analysis_results')}
                    </h2>
                  </div>

                  {unlocked && (
                    <button
                      onClick={handlePdf}
                      className="
                        h-14
                        px-8
                        rounded-2xl
                        bg-[#0f8b8d]
                        text-white
                        font-semibold
                        hover:bg-[#0c7475]
                        transition
                        flex
                        items-center
                        gap-3
                      "
                    >
                      <Download className="w-5 h-5" />

                      {t('download_pdf')}
                    </button>
                  )}
                </div>
              </div>

              {/* CHECK ITEMS */}
              {(() => {
                const freeChecks = scan.checks.filter(c => c.tier === 'free');
                const premiumChecks = scan.checks.filter(c => c.tier === 'premium');

                const renderCheckItem = (check: typeof scan.checks[number], showRecommendation: boolean) => {
                  const isPass = check.status === 'pass';
                  const isWarn = check.status === 'warn';
                  const isFail = check.status === 'fail';

                  return (
                    <div
                      key={check.checkId}
                      className="p-8 hover:bg-[#fafafa] transition"
                    >
                      <div className="flex items-start gap-5">
                        {/* ICON */}
                        <div
                          className={`
                            w-14 h-14 rounded-2xl flex items-center justify-center shrink-0
                            ${
                              isPass
                                ? 'bg-green-100'
                                : isWarn
                                ? 'bg-yellow-100'
                                : 'bg-red-100'
                            }
                          `}
                        >
                          {isPass && (
                            <CheckCircle2 className="w-7 h-7 text-green-600" />
                          )}

                          {isWarn && (
                            <AlertTriangle className="w-7 h-7 text-yellow-600" />
                          )}

                          {isFail && (
                            <XCircle className="w-7 h-7 text-red-600" />
                          )}
                        </div>

                        {/* CONTENT */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-5 flex-wrap">
                            <div>
                              <h3 className="text-2xl font-bold text-[#1f2d3d] mb-2">
                                {check.label}
                              </h3>

                              <p className="text-gray-600 leading-relaxed">
                                {check.details}
                              </p>
                            </div>

                            <div
                              className={`
                                px-4 py-2 rounded-full text-sm font-semibold
                                ${
                                  isPass
                                    ? 'bg-green-100 text-green-700'
                                    : isWarn
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'
                                }
                              `}
                            >
                              {check.status.toUpperCase()}
                            </div>
                          </div>

                          {/* RECOMMENDATION (only when unlocked and showRecommendation) */}
                          {showRecommendation && (
                            <div className="mt-6 bg-[#f7f8fa] rounded-3xl p-6 border border-gray-200">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#6ed3c1]/15 flex items-center justify-center">
                                  <SearchCheck className="w-6 h-6 text-[#0f8b8d]" />
                                </div>

                                <div>
                                  <h4 className="font-bold text-[#1f2d3d] mb-2">
                                    {t('recommendation_title')}
                                  </h4>

                                  <p className="text-gray-600 leading-relaxed">
                                    {t('recommendation_text')}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* BLURRED LOCKED INDICATOR (free checks when not unlocked) */}
                          {!showRecommendation && !unlocked && (
                            <div className="mt-6 p-5 rounded-2xl bg-[#f7f8fa] border border-gray-200 relative overflow-hidden">
                              <div className="blur-sm select-none pointer-events-none">
                                <div className="flex items-start gap-4">
                                  <div className="w-12 h-12 rounded-2xl bg-[#6ed3c1]/15 flex items-center justify-center">
                                    <SearchCheck className="w-6 h-6 text-[#0f8b8d]" />
                                  </div>

                                  <div>
                                    <h4 className="font-bold text-[#1f2d3d] mb-2">
                                      {t('recommendation_title')}
                                    </h4>

                                    <p className="text-gray-600 leading-relaxed">
                                      {t('recommendation_text')}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex items-center gap-2 text-[#0f8b8d] font-semibold">
                                  <Lock className="w-5 h-5" />
                                  <span>{t('premium_recommendations_locked')}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                };

                return (
                  <div className="divide-y divide-gray-100">
                    {/* FREE CHECKS — status only, no recommendations unless unlocked */}
                    {freeChecks.map((check) => renderCheckItem(check, unlocked))}

                    {/* LEAD GATE — shown between free and premium when locked */}
                    {!unlocked && (
                      <div className="p-8">
                        <LeadGate
                          scanId={scan.id}
                          url={scan.url}
                          score={scan.score}
                          onUnlock={() => setUnlocked(true)}
                        />
                      </div>
                    )}

                    {/* PREMIUM CHECKS — only shown when unlocked, with recommendations */}
                    {unlocked && premiumChecks.map((check) => renderCheckItem(check, true))}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-[40px] bg-gradient-to-r from-[#6ed3c1] to-[#4cb8c4] p-14 text-center shadow-2xl">
            <h2 className="text-5xl font-bold text-white mb-6">
              {t('need_legal_help')}
            </h2>

            <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
              {t('need_legal_help_desc')}
            </p>

            <button
              className="
                h-14
                px-10
                rounded-2xl
                bg-white
                text-[#0f8b8d]
                font-bold
                hover:scale-105
                transition
              "
            >
              {t('talk_advisor')}
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#eef1f4] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* BRAND */}
            <div className="lg:col-span-2">
              <img
                src="/logo.png"
                alt="TDE"
                className="h-16 w-auto object-contain mb-6"
              />

              <p className="text-gray-600 leading-relaxed max-w-lg">
                {t('footer_desc')}
              </p>
            </div>

            {/* LINKS */}
            <div>
              <h4 className="font-bold text-[#1f2d3d] mb-6">
                {t('footer_platform')}
              </h4>

              <div className="space-y-4 text-gray-600">
                <p>{t('footer_scanning')}</p>
                <p>{t('footer_compliance')}</p>
                <p>{t('footer_privacy')}</p>
                <p>{t('footer_reports')}</p>
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="font-bold text-[#1f2d3d] mb-6">
                {t('footer_contact')}
              </h4>

              <div className="space-y-4 text-gray-600">
                <p>+57 314 399 2911</p>
                <p>info@tde.com.co</p>
                <p>Bogotá, Colombia</p>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p>{t('footer')}</p>
          </div>
        </div>
      </footer>
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