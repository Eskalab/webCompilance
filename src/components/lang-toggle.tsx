'use client';

import { useLanguage } from '@/contexts/language';

export default function LangToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 flex rounded-lg overflow-hidden border border-gray-300 bg-white shadow-sm">
      <button
        onClick={() => setLocale('es')}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors ${
          locale === 'es'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        <span className="text-base leading-none">🇪🇸</span>
        ES
      </button>
      <button
        onClick={() => setLocale('en')}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors ${
          locale === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        <span className="text-base leading-none">🇺🇸</span>
        EN
      </button>
    </div>
  );
}
