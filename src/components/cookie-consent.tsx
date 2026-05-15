'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/language';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  function handleReject() {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="w-12 h-12 rounded-xl bg-[#6ed3c1]/15 flex items-center justify-center shrink-0">
          <Cookie className="w-6 h-6 text-[#0f8b8d]" />
        </div>

        <p className="flex-1 text-sm text-gray-600 leading-relaxed">
          {t('cookie_message')}{' '}
          <a
            href="https://tde.com.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0f8b8d] underline hover:text-[#0c7475]"
          >
            {t('cookie_policy_link')}
          </a>
        </p>

        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleReject}
            className="h-10 px-5 rounded-xl border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition"
          >
            {t('cookie_reject')}
          </button>

          <button
            onClick={handleAccept}
            className="h-10 px-5 rounded-xl bg-[#0f8b8d] text-white text-sm font-semibold hover:bg-[#0c7475] transition"
          >
            {t('cookie_accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
