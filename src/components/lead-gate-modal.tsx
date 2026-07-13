'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/language';
import { X } from 'lucide-react';

interface LeadGateModalProps {
  scanId: string;
  url: string;
  score: number;
  onUnlock: () => void;
  onClose: () => void;
}

export default function LeadGateModal({ scanId, url, score, onUnlock, onClose }: LeadGateModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
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
    if (!acceptedTerms) {
      setError(t('error_terms'));
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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-[32px] shadow-2xl border border-gray-100 p-10 max-w-md w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        <h3 className="text-2xl font-bold text-[#1f2d3d] mb-3">
          {t('unlock_title')}
        </h3>

        <p className="text-gray-600 mb-8">
          {t('unlock_desc')}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('name_placeholder')}
            autoFocus
            className="px-5 py-3 rounded-2xl border border-gray-300 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0f8b8d]"
            disabled={loading}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="px-5 py-3 rounded-2xl border border-gray-300 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0f8b8d]"
            disabled={loading}
          />
          <label className="flex items-start gap-2 text-left cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-0.5 accent-[#0f8b8d] w-4 h-4 shrink-0"
            />
            <span className="text-sm text-gray-600">
              {t('terms_checkbox')}{' '}
              <a
                href="/politicas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0f8b8d] underline hover:text-[#0c7475]"
              >
                {t('terms_link')}
              </a>
            </span>
          </label>
          <button
            type="submit"
            disabled={loading || !name.trim() || !email.trim() || !acceptedTerms}
            className="px-8 py-3 bg-[#0f8b8d] text-white font-semibold rounded-2xl hover:bg-[#0c7475] disabled:opacity-50 transition-colors"
          >
            {loading ? t('unlock_sending') : t('unlock_btn')}
          </button>
        </form>

        {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
}
