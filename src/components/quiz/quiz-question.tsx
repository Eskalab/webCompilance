'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/language';
import type { QuizQuestionData } from '@/lib/quiz-data';

interface QuizQuestionProps {
  question: QuizQuestionData;
  questionNumber: number;
  totalQuestions: number;
  selectedOption?: number;
  onAnswer: (optionIndex: number) => void;
  onBack: () => void;
  isLast: boolean;
  loading?: boolean;
}

export default function QuizQuestion({
  question,
  questionNumber,
  selectedOption,
  onAnswer,
  onBack,
  isLast,
  loading,
}: QuizQuestionProps) {
  const [selected, setSelected] = useState<number | undefined>(selectedOption);
  const [error, setError] = useState('');
  const { locale, t } = useLanguage();

  function handleNext() {
    if (selected === undefined) {
      setError(t('quiz_select_option'));
      return;
    }
    onAnswer(selected);
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-[#1f2d3d] mb-6 leading-relaxed">
        {question.question[locale]}
      </h3>

      <div className="space-y-3 mb-8">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => { setSelected(idx); setError(''); }}
            className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all text-sm leading-relaxed ${
              selected === idx
                ? 'border-[#0f8b8d] bg-[#6ed3c1]/10 text-[#1f2d3d] font-medium'
                : 'border-gray-200 bg-white text-gray-700 hover:border-[#6ed3c1] hover:bg-[#6ed3c1]/5'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                selected === idx ? 'border-[#0f8b8d] bg-[#0f8b8d]' : 'border-gray-300'
              }`}>
                {selected === idx && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span>{option.text[locale]}</span>
            </div>
          </button>
        ))}
      </div>

      {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3">
        {questionNumber > 1 && (
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 rounded-2xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-colors text-sm"
          >
            {t('quiz_back')}
          </button>
        )}
        <button
          type="button"
          onClick={handleNext}
          disabled={loading}
          className="flex-1 py-3 bg-[#0f8b8d] text-white font-semibold rounded-2xl hover:bg-[#0c7475] disabled:opacity-50 transition-colors text-sm"
        >
          {loading
            ? t('quiz_submitting')
            : isLast
              ? t('quiz_submit')
              : t('quiz_next')}
        </button>
      </div>
    </div>
  );
}
