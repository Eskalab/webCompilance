'use client';

import { useLanguage } from '@/contexts/language';

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function QuizProgress({ currentStep, totalSteps }: QuizProgressProps) {
  const { t } = useLanguage();
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-gray-600">
          {currentStep === 0
            ? t('quiz_step_info')
            : `${t('quiz_progress')} ${currentStep} ${t('quiz_of')} ${totalSteps - 1}`}
        </span>
        <span className="text-sm font-semibold text-[#0f8b8d]">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#6ed3c1] to-[#0f8b8d] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
