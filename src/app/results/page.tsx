'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/contexts/language';
import { ScanResponse } from '@/lib/scanner/types';

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
  const { t } = useLanguage();

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
      body: JSON.stringify(scan),
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
              Habla con un asesor
            </span>

            <span className="text-[#0f8b8d] font-semibold">
              +57 314 399 2911
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-gray-600">
            <span>Síguenos</span>

            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-[#6ed3c1] flex items-center justify-center text-white text-xs">
                IG
              </div>

              <div className="w-8 h-8 rounded-full bg-[#6ed3c1] flex items-center justify-center text-white text-xs">
                FB
              </div>

              <div className="w-8 h-8 rounded-full bg-[#6ed3c1] flex items-center justify-center text-white text-xs">
                IN
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-24 flex items-center justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-6">
              <img
                src="/logo.png"
                alt="TDE"
                className="h-14 w-auto object-contain"
              />
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="
                  h-12
                  px-6
                  rounded-2xl
                  bg-[#0f8b8d]
                  text-white
                  font-semibold
                  hover:bg-[#0c7475]
                  transition
                "
              >
                Nuevo análisis
              </button>
            </div>
          </div>
        </div>
      </header>

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
                    Sitio analizado
                  </p>

                  <h1 className="text-2xl font-bold text-[#1f2d3d] break-all">
                    {scan.url}
                  </h1>
                </div>

                <div className="flex items-center gap-2 text-[#0f8b8d] text-sm font-medium">
                  <div className="w-3 h-3 rounded-full bg-[#30c48d]" />

                  Escaneo completo
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
                      ? 'Cumplimiento alto'
                      : scan.score >= 50
                      ? 'Riesgo medio'
                      : 'Riesgo elevado'}
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
                  Datos detectados
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: Globe,
                      label: 'Dominio',
                      value: scan.url,
                    },
                    {
                      icon: Lock,
                      label: 'HTTPS',
                      value: 'Activo',
                    },
                    {
                      icon: Cookie,
                      label: 'Cookies',
                      value: `${scan.summary.warn + scan.summary.fail} detectadas`,
                    },
                    {
                      icon: FileText,
                      label: 'Políticas',
                      value: 'Analizadas',
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
                        Riesgos detectados
                      </p>

                      <h3 className="text-2xl font-bold text-[#1f2d3d] mb-4">
                        Tu sitio requiere ajustes de cumplimiento
                      </h3>

                      <p className="text-gray-600 leading-relaxed">
                        Detectamos problemas relacionados con consentimiento,
                        privacidad, tracking y cumplimiento normativo.
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
                      Compliance Report
                    </p>

                    <h2 className="text-4xl font-bold text-[#1f2d3d]">
                      Resultados del análisis
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
              <div className="divide-y divide-gray-100">
                {scan.checks.map((check) => {
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

                          {/* LOCKED */}
                          {!unlocked && (
                            <div className="mt-6 p-5 rounded-2xl bg-[#f7f8fa] border border-gray-200">
                              <div className="flex items-center justify-between gap-6 flex-wrap">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-2xl bg-[#6ed3c1]/15 flex items-center justify-center">
                                    <ShieldCheck className="w-6 h-6 text-[#0f8b8d]" />
                                  </div>

                                  <div>
                                    <p className="font-semibold text-[#1f2d3d]">
                                      Recomendaciones premium bloqueadas
                                    </p>

                                    <p className="text-sm text-gray-500">
                                      Desbloquea soluciones detalladas y PDF.
                                    </p>
                                  </div>
                                </div>

                                <button
                                  onClick={() => setUnlocked(true)}
                                  className="
                                    h-12
                                    px-6
                                    rounded-2xl
                                    bg-[#0f8b8d]
                                    text-white
                                    font-semibold
                                    hover:bg-[#0c7475]
                                    transition
                                  "
                                >
                                  Desbloquear
                                </button>
                              </div>
                            </div>
                          )}

                          {/* UNLOCKED */}
                          {unlocked && (
                            <div className="mt-6 bg-[#f7f8fa] rounded-3xl p-6 border border-gray-200">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#6ed3c1]/15 flex items-center justify-center">
                                  <SearchCheck className="w-6 h-6 text-[#0f8b8d]" />
                                </div>

                                <div>
                                  <h4 className="font-bold text-[#1f2d3d] mb-2">
                                    Recomendación
                                  </h4>

                                  <p className="text-gray-600 leading-relaxed">
                                    Implementa una solución compatible con RGPD,
                                    Habeas Data y normativas internacionales
                                    para mejorar el cumplimiento legal de tu
                                    sitio web.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-[40px] bg-gradient-to-r from-[#6ed3c1] to-[#4cb8c4] p-14 text-center shadow-2xl">
            <h2 className="text-5xl font-bold text-white mb-6">
              ¿Necesitas ayuda legal?
            </h2>

            <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
              Nuestro equipo puede ayudarte a implementar políticas,
              consentimiento de cookies y cumplimiento normativo.
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
              Hablar con un asesor
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
                Plataforma de análisis de cumplimiento legal y privacidad para
                empresas digitales.
              </p>
            </div>

            {/* LINKS */}
            <div>
              <h4 className="font-bold text-[#1f2d3d] mb-6">
                Plataforma
              </h4>

              <div className="space-y-4 text-gray-600">
                <p>Escaneo</p>
                <p>Compliance</p>
                <p>Privacidad</p>
                <p>Reportes</p>
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="font-bold text-[#1f2d3d] mb-6">
                Contacto
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