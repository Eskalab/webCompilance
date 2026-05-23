'use client';

import ScanForm from '@/components/scan-form';
import { useLanguage } from '@/contexts/language';
import SiteHeader from '@/components/site-header';
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

      {/* NAVBAR */}
      <SiteHeader/>

      {/* HERO */}
      <section className="relative">
        {/* BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] rounded-full bg-[#6ed3c1]/20 blur-3xl" />

          <div className="absolute bottom-[-180px] right-[-120px] w-[600px] h-[600px] rounded-full bg-[#4cb8c4]/20 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center">
  <h2 className="text-6xl lg:text-7xl font-bold text-[#0f8b8d] mb-14">
    {t('hero_page_title')}
  </h2>

  <div className="inline-flex items-center gap-2 bg-[#6ed3c1]/15 text-[#0f8b8d] px-5 py-2 rounded-full text-sm font-medium mb-8">
    <ShieldCheck className="w-4 h-4" />

    {t('hero_badge')}
  </div>

  <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-[#1f2d3d] mb-8">
    {t('hero_title_main')}
  </h1>

  <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-3xl mx-auto">
    {t('hero_subtitle_main')}
  </p>

  {/* FORM */}
  <div className="bg-white rounded-[28px] shadow-2xl border border-gray-100 p-4 max-w-3xl mx-auto">
    <ScanForm />
  </div>

  {/* BADGES */}
  <div className="flex flex-wrap justify-center items-center gap-6 mt-8 text-sm text-gray-600">
    <div className="flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full bg-[#6ed3c1]" />

      {t('badge_no_registration')}
    </div>

    <div className="flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full bg-[#6ed3c1]" />

      {t('badge_instant_result')}
    </div>

    <div className="flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full bg-[#6ed3c1]" />

      {t('badge_safe_scan')}
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
              {t('features_label')}
            </p>

            <h2 className="text-5xl font-bold text-[#1f2d3d] mb-6">
              {t('features_title')}
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('features_desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: t('feat_ssl_title'),
                text: t('feat_ssl_desc'),
              },
              {
                icon: Cookie,
                title: t('feat_cookies_title'),
                text: t('feat_cookies_desc'),
              },
              {
                icon: FileCheck,
                title: t('feat_legal_title'),
                text: t('feat_legal_desc'),
              },
              {
                icon: Globe,
                title: t('feat_tracking_title'),
                text: t('feat_tracking_desc'),
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
              {t('how_label')}
            </p>

            <h2 className="text-5xl font-bold text-[#1f2d3d]">
              {t('how_title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: '01',
                title: t('step1_title'),
                text: t('step1_desc'),
              },
              {
                step: '02',
                title: t('step2_title'),
                text: t('step2_desc'),
              },
              {
                step: '03',
                title: t('step3_title'),
                text: t('step3_desc'),
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
                {t('cta_title')}
              </h2>

              <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
                {t('cta_subtitle')}
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

      {/* QUIZ CTA */}
      <section className="py-20 bg-[#f7f8fa]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white rounded-[32px] p-12 shadow-xl border border-gray-100">
            <div className="w-16 h-16 rounded-3xl bg-[#6ed3c1]/15 flex items-center justify-center mb-6 mx-auto">
              <ShieldCheck className="w-8 h-8 text-[#0f8b8d]" />
            </div>
            <h2 className="text-3xl font-bold text-[#1f2d3d] mb-4">
              {t('quiz_landing_title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
              {t('quiz_landing_desc')}
            </p>
            <a
              href="/quiz"
              className="inline-block px-8 py-4 bg-[#0f8b8d] text-white font-semibold rounded-2xl hover:bg-[#0c7475] transition-colors text-base"
            >
              {t('quiz_landing_btn')}
            </a>
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