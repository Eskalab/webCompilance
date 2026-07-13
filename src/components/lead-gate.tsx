'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/language';

interface LeadGateProps {
  scanId: string;
  url: string;
  score: number;
  onUnlock: () => void;
}

export default function LeadGate({ scanId, url, score, onUnlock }: LeadGateProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useLanguage();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError(t('error_name_required'));
      return;
    }
    if (!email.includes('@')) {
      setError(t('error_invalid_email'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, scanId, url, score }),
      });
      onUnlock();
    } catch {
      setError(t('error_send'));
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full px-4 py-2.5 rounded-2xl border border-gray-300 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0f8b8d]";

  return (
    <div className="bg-gradient-to-r from-[#6ed3c1]/10 to-[#1e2a52]/10 border border-[#6ed3c1]/30 rounded-[28px] p-10 text-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {t('unlock_title')}
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        {t('unlock_desc')}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('name_placeholder')}
          className={inputClass}
          disabled={loading}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className={inputClass}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !email.trim() || !name.trim()}
          className="px-6 py-2.5 bg-[#0f8b8d] text-white text-sm font-semibold rounded-2xl hover:bg-[#0c7475] disabled:opacity-50 transition-colors"
        >
          {loading ? t('unlock_sending') : t('unlock_btn')}
        </button>
      </form>
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
    </div>
  );
}
