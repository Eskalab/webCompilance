'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/language';
import { quizQuestions, calculateScore, calculateLevel } from '@/lib/quiz-data';
import QuizProgress from './quiz-progress';
import QuizLeadForm from './quiz-lead-form';
import QuizQuestion from './quiz-question';
import QuizSemaforo from './quiz-semaforo';

interface QuizResult {
  id: string;
  score: number;
  level: 'green' | 'yellow' | 'red';
}

// Steps: 1-5 = questions, 6 = blurred result + lead gate
const TOTAL_STEPS = 6;

export default function QuizWizard() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useLanguage();

  // Preview score calculated client-side (just for the blur preview)
  const previewScore = calculateScore(answers);
  const previewLevel = calculateLevel(previewScore);

  function handleAnswer(optionIndex: number) {
    const question = quizQuestions[step - 1];
    const newAnswers = { ...answers, [question.id]: optionIndex };
    setAnswers(newAnswers);

    if (step === quizQuestions.length) {
      setStep(TOTAL_STEPS);
    } else {
      setStep(step + 1);
    }
  }

  async function handleLeadSubmit(data: { name: string; email: string; company: string; sendResults: boolean }) {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, company: data.company, sendResults: data.sendResults, answers }),
      });

      if (!res.ok) throw new Error('Failed to submit');

      const resultData = await res.json();
      setResult(resultData);
      setUnlocked(true);
    } catch {
      setError(t('error_connection'));
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    if (step === TOTAL_STEPS) {
      setStep(quizQuestions.length);
    } else if (step > 1) {
      setStep(step - 1);
    }
  }

  // Blurred result + lead gate
  if (step === TOTAL_STEPS) {
    return (
      <div>
        {unlocked && result ? (
          <QuizSemaforo score={result.score} level={result.level} />
        ) : (
          <>
            {/* Blurred preview */}
            <div className="relative">
              <div className="blur-md pointer-events-none select-none">
                <QuizSemaforo score={previewScore} level={previewLevel} />
              </div>

              {/* Lead gate overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/95 backdrop-blur-sm rounded-[28px] shadow-2xl border border-gray-100 p-8 w-full max-w-md mx-4">
                  <QuizLeadForm
                    onSubmit={handleLeadSubmit}
                    loading={loading}
                    onBack={handleBack}
                  />
                  {error && (
                    <p className="mt-3 text-red-500 text-sm text-center">{error}</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Questions
  return (
    <div>
      <QuizProgress currentStep={step} totalSteps={TOTAL_STEPS} />

      {step >= 1 && step <= quizQuestions.length && (
        <QuizQuestion
          key={quizQuestions[step - 1].id}
          question={quizQuestions[step - 1]}
          questionNumber={step}
          totalQuestions={quizQuestions.length}
          selectedOption={answers[quizQuestions[step - 1].id]}
          onAnswer={handleAnswer}
          onBack={handleBack}
          isLast={false}
          loading={false}
        />
      )}
    </div>
  );
}
