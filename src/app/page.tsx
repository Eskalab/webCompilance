'use client';

import ScanForm from '@/components/scan-form';
import { useLanguage } from '@/contexts/language';
import {
  ShieldCheck,
  Cookie,
  FileCheck,
  Globe,
  Lock,
  SearchCheck,
  CheckCircle2,
} from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#f7f8fa] overflow-hidden">
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

      {/* NAVBAR */}
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

              {/* <div className="hidden lg:block">
                <h2 className="text-[#1f2d3d] font-bold text-2xl tracking-tight">
                  TDE Compliance
                </h2>

                <p className="text-gray-500 text-sm">
                  Legal Website Scanner
                </p>
              </div> */}
            </div>

            {/* MENU */}
            <nav className="hidden lg:flex items-center gap-10">
              <a
                href="#features"
                className="text-gray-700 hover:text-[#0f8b8d] transition font-medium"
              >
                Features
              </a>

              <a
                href="#how"
                className="text-gray-700 hover:text-[#0f8b8d] transition font-medium"
              >
                Cómo funciona
              </a>

              <a
                href="#checks"
                className="text-gray-700 hover:text-[#0f8b8d] transition font-medium"
              >
                Compliance
              </a>

              <a
                href="#footer"
                className="text-gray-700 hover:text-[#0f8b8d] transition font-medium"
              >
                Contacto
              </a>
            </nav>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
              <button
                className="
                  hidden md:flex
                  h-12
                  px-7
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#0f8b8d]
                  text-white
                  font-semibold
                  shadow-lg
                  hover:bg-[#0c7475]
                  transition-all
                "
              >
                Analizar sitio
              </button>

              <div className="flex items-center rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <button className="px-4 py-2 bg-[#2563eb] text-white text-sm">
                  🇪🇸 ES
                </button>

                <button className="px-4 py-2 bg-white text-gray-700 text-sm">
                  🇺🇸 EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        {/* BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] rounded-full bg-[#6ed3c1]/20 blur-3xl" />

          <div className="absolute bottom-[-180px] right-[-120px] w-[600px] h-[600px] rounded-full bg-[#4cb8c4]/20 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#6ed3c1]/15 text-[#0f8b8d] px-5 py-2 rounded-full text-sm font-medium mb-8">
                <ShieldCheck className="w-4 h-4" />

                Plataforma de cumplimiento legal web
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-[#1f2d3d] mb-8">
                Analiza si tu sitio cumple con privacidad y legalidad digital
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl">
                Detectamos automáticamente problemas relacionados con cookies,
                privacidad, tracking, SSL y cumplimiento normativo para tu
                página web.
              </p>

              {/* FORM */}
              <div className="bg-white rounded-[28px] shadow-2xl border border-gray-100 p-4">
                <ScanForm />
              </div>

              {/* BADGES */}
              <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6ed3c1]" />

                  Sin registros
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6ed3c1]" />

                  Resultado inmediato
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6ed3c1]" />

                  Escaneo seguro
                </div>
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="relative">
              <div className="bg-white rounded-[36px] border border-gray-100 shadow-2xl p-8">
                {/* TOP */}
                <div className="flex items-start justify-between mb-10">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Sitio analizado
                    </p>

                    <h3 className="text-3xl font-bold text-[#1f2d3d]">
                      tde.com.co
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-[#0f8b8d] text-sm font-medium">
                    <div className="w-3 h-3 rounded-full bg-[#6ed3c1]" />

                    Escaneo activo
                  </div>
                </div>

                {/* SCORE */}
                <div className="grid grid-cols-2 gap-10 items-center mb-10">
                  <div className="relative w-56 h-56 mx-auto">
                    <div className="absolute inset-0 rounded-full border-[18px] border-[#e7f5f2]" />

                    <div
                      className="
                        absolute
                        inset-0
                        rounded-full
                        border-[18px]
                        border-transparent
                        border-t-[#6ed3c1]
                        border-r-[#6ed3c1]
                        rotate-45
                      "
                    />

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-6xl font-bold text-[#1f2d3d]">
                        74
                      </span>

                      <span className="text-[#0f8b8d] font-medium mt-2">
                        Riesgo medio
                      </span>
                    </div>
                  </div>

                  {/* CHECKS */}
                  <div className="space-y-5">
                    {[
                      {
                        label: 'SSL / HTTPS',
                        ok: true,
                      },
                      {
                        label: 'Cookie Banner',
                        ok: false,
                      },
                      {
                        label: 'Política Privacidad',
                        warn: true,
                      },
                      {
                        label: 'Trackers',
                        warn: true,
                      },
                      {
                        label: 'Consentimiento',
                        ok: false,
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between border-b border-gray-100 pb-4"
                      >
                        <span className="text-gray-700 font-medium">
                          {item.label}
                        </span>

                        {item.ok && (
                          <CheckCircle2 className="w-5 h-5 text-[#30c48d]" />
                        )}

                        {item.warn && (
                          <div className="w-5 h-5 rounded-full border-2 border-yellow-400" />
                        )}

                        {!item.ok && !item.warn && (
                          <div className="w-5 h-5 rounded-full border-2 border-red-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ALERT */}
                <div className="bg-[#f7f8fa] border border-red-100 rounded-3xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-500 font-bold">
                      !
                    </div>

                    <div>
                      <p className="text-red-500 font-semibold mb-1">
                        Riesgo detectado
                      </p>

                      <h4 className="text-[#1f2d3d] font-bold text-xl mb-2">
                        No se detectó consentimiento válido de cookies
                      </h4>

                      <p className="text-gray-600 leading-relaxed">
                        Tu sitio instala cookies antes del consentimiento
                        explícito del usuario.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FLOATING */}
              <div className="absolute -bottom-8 -left-8 bg-white shadow-xl rounded-3xl px-6 py-4 border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#6ed3c1]/15 flex items-center justify-center">
                    <SearchCheck className="w-7 h-7 text-[#0f8b8d]" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Escaneo automatizado
                    </p>

                    <h4 className="font-bold text-[#1f2d3d]">
                      RGPD + Habeas Data
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="py-28 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[#0f8b8d] font-semibold uppercase tracking-widest mb-4">
              Plataforma Compliance
            </p>

            <h2 className="text-5xl font-bold text-[#1f2d3d] mb-6">
              Todo lo que necesitas analizar
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Detectamos automáticamente problemas legales, técnicos y de
              privacidad en sitios web empresariales.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: 'SSL y Seguridad',
                text: 'Validamos HTTPS, certificados y configuraciones seguras.',
              },
              {
                icon: Cookie,
                title: 'Cookies y Consentimiento',
                text: 'Detectamos banners inválidos y trackers sin autorización.',
              },
              {
                icon: FileCheck,
                title: 'Documentos Legales',
                text: 'Verificamos políticas, términos y cumplimiento normativo.',
              },
              {
                icon: Globe,
                title: 'Tracking y Scripts',
                text: 'Analizamos Google Analytics, Meta Pixel y rastreadores.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="
                  bg-[#f7f8fa]
                  rounded-[32px]
                  p-8
                  border
                  border-gray-100
                  hover:shadow-2xl
                  hover:-translate-y-1
                  transition-all
                "
              >
                <div className="w-16 h-16 rounded-3xl bg-[#6ed3c1]/15 flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-[#0f8b8d]" />
                </div>

                <h3 className="text-2xl font-bold text-[#1f2d3d] mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section
        id="how"
        className="py-28 bg-[#f7f8fa]"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[#0f8b8d] font-semibold uppercase tracking-widest mb-4">
              Cómo funciona
            </p>

            <h2 className="text-5xl font-bold text-[#1f2d3d]">
              Escaneo en 3 pasos
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: '01',
                title: 'Ingresa tu dominio',
                text: 'Escribe la URL de tu sitio web.',
              },
              {
                step: '02',
                title: 'Analizamos automáticamente',
                text: 'Escaneamos cookies, scripts y documentos.',
              },
              {
                step: '03',
                title: 'Obtén tu reporte',
                text: 'Visualiza riesgos y oportunidades de mejora.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-[32px] p-10 shadow-lg border border-gray-100"
              >
                <div className="text-6xl font-black text-[#6ed3c1]/30 mb-6">
                  {item.step}
                </div>

                <h3 className="text-2xl font-bold text-[#1f2d3d] mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-[#6ed3c1] to-[#4cb8c4] p-14 text-center shadow-2xl">
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <h2 className="text-5xl font-bold text-white mb-6">
                Escanea tu sitio ahora
              </h2>

              <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
                Obtén un diagnóstico automático de cumplimiento legal y
                privacidad web.
              </p>

              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-[28px] p-4 shadow-2xl">
                  <ScanForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="footer"
        className="bg-[#eef1f4] border-t border-gray-200"
      >
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