'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/language';
import { ShieldCheck } from 'lucide-react';

interface LeadData {
  name: string;
  email: string;
  company: string;
  sendResults: boolean;
}

interface QuizLeadFormProps {
  onSubmit: (data: LeadData) => void;
  loading?: boolean;
  onBack?: () => void;
}

export default function QuizLeadForm({ onSubmit, loading, onBack }: QuizLeadFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [sendResults, setSendResults] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t } = useLanguage();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = t('quiz_field_required');
    if (!email.includes('@')) newErrors.email = t('error_invalid_email');
    if (!company.trim()) newErrors.company = t('quiz_field_required');

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ name: name.trim(), email: email.trim(), company: company.trim(), sendResults });
  }

  const inputClass = "w-full px-5 py-3.5 rounded-2xl border border-gray-300 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0f8b8d] transition-shadow";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-[#6ed3c1]/15 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-[#0f8b8d]" />
        </div>
        <p className="text-sm text-gray-500">
          {t('quiz_lead_desc')}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('quiz_name_label')}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setErrors(prev => ({ ...prev, name: '' })); }}
          placeholder={t('quiz_name_placeholder')}
          className={inputClass}
        />
        {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: '' })); }}
          placeholder={t('quiz_email_placeholder')}
          className={inputClass}
        />
        {errors.email && <p className="mt-1 text-red-500 text-xs">{errors.email}</p>}
        <label className="flex items-center gap-2 mt-2 cursor-pointer">
          <input
            type="checkbox"
            checked={sendResults}
            onChange={(e) => setSendResults(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-[#0f8b8d] focus:ring-[#0f8b8d] accent-[#0f8b8d]"
          />
          <span className="text-sm text-gray-600">{t('quiz_send_results')}</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('quiz_company_label')}</label>
        <input
          type="text"
          value={company}
          onChange={(e) => { setCompany(e.target.value); setErrors(prev => ({ ...prev, company: '' })); }}
          placeholder={t('quiz_company_placeholder')}
          className={inputClass}
        />
        {errors.company && <p className="mt-1 text-red-500 text-xs">{errors.company}</p>}
      </div>

      <div className="flex gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-4 rounded-2xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-colors text-sm"
          >
            {t('quiz_back')}
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-4 bg-[#0f8b8d] text-white font-semibold rounded-2xl hover:bg-[#0c7475] disabled:opacity-50 transition-colors text-base"
        >
          {loading ? t('quiz_submitting') : t('quiz_submit')}
        </button>
      </div>
    </form>
  );
}
