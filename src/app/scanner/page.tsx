'use client';

import ScanForm from '@/components/scan-form';
import { useLanguage } from '@/contexts/language';
import SiteHeader from '@/components/site-header';
import Topbar from '@/components/topbar';
import SiteFooter from '@/components/site-footer';
import {
  ShieldCheck,
  Cookie,
  FileCheck,
  Globe,
} from 'lucide-react';

export default function ScannerPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#f7f8fa] overflow-hidden">
      <Topbar />
      <SiteHeader />

      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] rounded-full bg-[#6ed3c1]/20 blur-3xl" />
          <div className="absolute bottom-[-180px] right-[-120px] w-[600px] h-[600px] rounded-full bg-[#1e2a52]/20 blur-3xl" />
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

            <div className="bg-white rounded-[28px] shadow-2xl border border-gray-100 p-4 max-w-3xl mx-auto">
              <ScanForm />
            </div>

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
      <section id="features" className="py-28 bg-white">
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
              { icon: ShieldCheck, title: t('feat_ssl_title'), text: t('feat_ssl_desc') },
              { icon: Cookie, title: t('feat_cookies_title'), text: t('feat_cookies_desc') },
              { icon: FileCheck, title: t('feat_legal_title'), text: t('feat_legal_desc') },
              { icon: Globe, title: t('feat_tracking_title'), text: t('feat_tracking_desc') },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-[#f7f8fa] rounded-[32px] p-8 border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                <div className="w-16 h-16 rounded-3xl bg-[#6ed3c1]/15 flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-[#0f8b8d]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1f2d3d] mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="py-28 bg-[#f7f8fa]">
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
              { step: '01', title: t('step1_title'), text: t('step1_desc') },
              { step: '02', title: t('step2_title'), text: t('step2_desc') },
              { step: '03', title: t('step3_title'), text: t('step3_desc') },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-[32px] p-10 shadow-lg border border-gray-100">
                <div className="text-6xl font-black text-[#6ed3c1]/30 mb-6">{item.step}</div>
                <h3 className="text-2xl font-bold text-[#1f2d3d] mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[40px] bg-[linear-gradient(120deg,#1e2a52_0%,#1e2a52_38%,#2d7d9a_50%,#1e2a52_62%,#1e2a52_100%)] p-14 text-center shadow-2xl">
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
            <div className="relative">
              <h2 className="text-5xl font-bold text-white mb-6">{t('cta_title')}</h2>
              <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">{t('cta_subtitle')}</p>
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
            <h2 className="text-3xl font-bold text-[#1f2d3d] mb-4">{t('quiz_landing_title')}</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">{t('quiz_landing_desc')}</p>
            <a
              href="/quiz"
              className="inline-block px-8 py-4 bg-[#0f8b8d] text-white font-semibold rounded-2xl hover:bg-[#0c7475] transition-colors text-base"
            >
              {t('quiz_landing_btn')}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
