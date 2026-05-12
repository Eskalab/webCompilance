'use client';

import { CheckResult } from '@/lib/scanner/types';
import { useLanguage } from '@/contexts/language';

interface CheckCardProps {
  check: CheckResult;
  unlocked: boolean;
}

export default function CheckCard({ check, unlocked }: CheckCardProps) {
  const { locale, t } = useLanguage();

  const STATUS_CONFIG = {
    pass: { label: t('status_pass'), color: 'bg-green-100 text-green-800', icon: '✓' },
    warn: { label: t('status_warn'), color: 'bg-yellow-100 text-yellow-800', icon: '!' },
    fail: { label: t('status_fail'), color: 'bg-red-100 text-red-800', icon: '✕' },
    skip: { label: t('status_skip'), color: 'bg-gray-100 text-gray-600', icon: '—' },
  };

  const config = STATUS_CONFIG[check.status];
  const isPremiumLocked = check.tier === 'premium' && !unlocked;

  const label = locale === 'es' && check.labelEs ? check.labelEs : check.label;
  const details = locale === 'es' && check.detailsEs ? check.detailsEs : check.details;
  const suggestion = locale === 'es' && check.suggestionEs ? check.suggestionEs : check.suggestion;

  return (
    <div className="relative border border-gray-200 rounded-lg p-5 bg-white">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{label}</h3>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
          {config.icon} {config.label}
        </span>
      </div>

      <div className={isPremiumLocked ? 'blur-sm select-none' : ''}>
        <p className="text-sm text-gray-600 mb-2">{details}</p>
        {suggestion && (
          <p className="text-sm text-blue-700 bg-blue-50 rounded p-3 mt-2">
            {suggestion}
          </p>
        )}
      </div>

      {isPremiumLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-lg">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">
              {t('premium_locked')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
