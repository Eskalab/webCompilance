'use client';

import { useLanguage } from '@/contexts/language';
import SiteHeader from '@/components/site-header';
import Topbar from '@/components/topbar';
import SiteFooter from '@/components/site-footer';
import QuizWizard from '@/components/quiz/quiz-wizard';
import { ShieldCheck } from 'lucide-react';

export default function QuizPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <Topbar />
      <SiteHeader />

      {/* HERO + QUIZ */}
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] rounded-full bg-[#6ed3c1]/20 blur-3xl" />
          <div className="absolute bottom-[-180px] right-[-120px] w-[600px] h-[600px] rounded-full bg-[#1e2a52]/20 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#6ed3c1]/15 text-[#0f8b8d] px-5 py-2 rounded-full text-sm font-medium mb-6">
              <ShieldCheck className="w-4 h-4" />
              {t('quiz_badge')}
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-[#1f2d3d] mb-4">
              {t('quiz_title')}
            </h1>
          </div>

          <div className="bg-white rounded-[28px] shadow-2xl border border-gray-100 p-8 sm:p-10 max-w-2xl mx-auto">
            <QuizWizard />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
