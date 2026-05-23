'use client';

import { useLanguage } from '@/contexts/language';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface QuizSemaforoProps {
  score: number;
  level: 'green' | 'yellow' | 'red';
}

const levelConfig = {
  green: {
    color: 'bg-emerald-500',
    bgLight: 'bg-emerald-50',
    border: 'border-emerald-200',
    textColor: 'text-emerald-700',
    icon: CheckCircle2,
    titleKey: 'quiz_result_green_title' as const,
    descKey: 'quiz_result_green_desc' as const,
    waColor: 'VERDE',
    waColorEn: 'GREEN',
  },
  yellow: {
    color: 'bg-amber-400',
    bgLight: 'bg-amber-50',
    border: 'border-amber-200',
    textColor: 'text-amber-700',
    icon: AlertTriangle,
    titleKey: 'quiz_result_yellow_title' as const,
    descKey: 'quiz_result_yellow_desc' as const,
    waColor: 'AMARILLO',
    waColorEn: 'YELLOW',
  },
  red: {
    color: 'bg-red-500',
    bgLight: 'bg-red-50',
    border: 'border-red-200',
    textColor: 'text-red-700',
    icon: XCircle,
    titleKey: 'quiz_result_red_title' as const,
    descKey: 'quiz_result_red_desc' as const,
    waColor: 'ROJA',
    waColorEn: 'RED',
  },
};

export default function QuizSemaforo({ score, level }: QuizSemaforoProps) {
  const { locale, t } = useLanguage();
  const config = levelConfig[level];
  const Icon = config.icon;

  const colorLabel = locale === 'es' ? config.waColor : config.waColorEn;
  const waMessage = locale === 'es'
    ? `Hola, realicé el Test de Ciberseguridad, mi alerta está en ${config.waColor}. Me gustaría ampliar mi caso en la sesión con un experto SIN COSTO. ¿Me ayudas a AGENDARLA?`
    : `Hi, I completed the Cybersecurity Test, my alert is ${config.waColorEn}. I'd like to discuss my case in a FREE expert session. Can you help me schedule it?`;
  const waUrl = `https://wa.me/573143992911?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="text-center">
      {/* Semaforo circle */}
      <div className={`w-40 h-40 ${config.color} rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl`}>
        <Icon className="w-20 h-20 text-white" strokeWidth={1.5} />
      </div>

      {/* Score */}
      <p className="text-sm font-medium text-gray-500 mb-2">{t('quiz_result_score')}</p>
      <p className="text-4xl font-black text-[#1f2d3d] mb-6">{score} / 15</p>

      {/* Level message */}
      <div className={`${config.bgLight} ${config.border} border rounded-[28px] p-8 mb-8`}>
        <h3 className={`text-2xl font-bold ${config.textColor} mb-3`}>
          {t(config.titleKey)}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {t(config.descKey)}
        </p>
      </div>

      {/* WhatsApp CTA */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#1fb855] text-white font-semibold rounded-2xl transition-all hover:scale-105 shadow-lg text-base"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        {t('quiz_cta_whatsapp')}
      </a>

      {/* Secondary CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
        <a
          href="/"
          className="px-6 py-3 rounded-2xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-colors text-sm"
        >
          {t('quiz_cta_scan')}
        </a>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-2xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-colors text-sm"
        >
          {t('quiz_retake')}
        </button>
      </div>
    </div>
  );
}
