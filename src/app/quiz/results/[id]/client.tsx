'use client';

import { useLanguage } from '@/contexts/language';
import SiteHeader from '@/components/site-header';
import QuizSemaforo from '@/components/quiz/quiz-semaforo';
import { ShieldCheck } from 'lucide-react';

interface Props {
  score: number;
  level: 'green' | 'yellow' | 'red';
}

export default function QuizResultClient({ score, level }: Props) {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <div className="bg-[#ececec] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center text-sm">
          <div className="flex items-center gap-4 text-gray-700">
            <span className="font-medium">{t('topbar_talk_advisor')}</span>
            <span className="text-[#0f8b8d] font-semibold">+57 314 399 2911</span>
          </div>
        </div>
      </div>

      <SiteHeader />

      <section className="relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] rounded-full bg-[#6ed3c1]/20 blur-3xl" />
          <div className="absolute bottom-[-180px] right-[-120px] w-[600px] h-[600px] rounded-full bg-[#4cb8c4]/20 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#6ed3c1]/15 text-[#0f8b8d] px-5 py-2 rounded-full text-sm font-medium mb-6">
              <ShieldCheck className="w-4 h-4" />
              {t('quiz_result_title')}
            </div>
          </div>

          <div className="bg-white rounded-[28px] shadow-2xl border border-gray-100 p-8 sm:p-10 max-w-2xl mx-auto">
            <QuizSemaforo score={score} level={level} />
          </div>
        </div>
      </section>

      <footer className="bg-[#eef1f4] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center text-gray-500 text-sm">
          <p>{t('footer')}</p>
        </div>
      </footer>
    </main>
  );
}
