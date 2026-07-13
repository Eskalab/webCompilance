'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/language';

const COOKIE_KEY = 'lcs_countries';

function getUsedCountries(): string[] {
  try {
    const raw = document.cookie.split('; ').find(r => r.startsWith(`${COOKIE_KEY}=`));
    return raw ? JSON.parse(decodeURIComponent(raw.split('=')[1])) : [];
  } catch { return []; }
}

function saveUsedCountry(code: string) {
  try {
    const prev = getUsedCountries().filter(c => c !== code);
    const next = [code, ...prev].slice(0, 10);
    const expires = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${COOKIE_KEY}=${encodeURIComponent(JSON.stringify(next))}; expires=${expires}; path=/`;
  } catch {}
}

const COUNTRIES = [
  { code: 'CO', flag: '🇨🇴', es: 'Colombia',             en: 'Colombia'            },
  { code: 'MX', flag: '🇲🇽', es: 'México',               en: 'Mexico'              },
  { code: 'BR', flag: '🇧🇷', es: 'Brasil',               en: 'Brazil'              },
  { code: 'AR', flag: '🇦🇷', es: 'Argentina',            en: 'Argentina'           },
  { code: 'PE', flag: '🇵🇪', es: 'Perú',                 en: 'Peru'                },
  { code: 'CL', flag: '🇨🇱', es: 'Chile',                en: 'Chile'               },
  { code: 'EC', flag: '🇪🇨', es: 'Ecuador',              en: 'Ecuador'             },
  { code: 'BO', flag: '🇧🇴', es: 'Bolivia',              en: 'Bolivia'             },
  { code: 'PY', flag: '🇵🇾', es: 'Paraguay',             en: 'Paraguay'            },
  { code: 'UY', flag: '🇺🇾', es: 'Uruguay',              en: 'Uruguay'             },
  { code: 'VE', flag: '🇻🇪', es: 'Venezuela',            en: 'Venezuela'           },
  { code: 'PA', flag: '🇵🇦', es: 'Panamá',               en: 'Panama'              },
  { code: 'CR', flag: '🇨🇷', es: 'Costa Rica',           en: 'Costa Rica'          },
  { code: 'GT', flag: '🇬🇹', es: 'Guatemala',            en: 'Guatemala'           },
  { code: 'HN', flag: '🇭🇳', es: 'Honduras',             en: 'Honduras'            },
  { code: 'SV', flag: '🇸🇻', es: 'El Salvador',          en: 'El Salvador'         },
  { code: 'NI', flag: '🇳🇮', es: 'Nicaragua',            en: 'Nicaragua'           },
  { code: 'DO', flag: '🇩🇴', es: 'Rep. Dominicana',      en: 'Dominican Rep.'      },
  { code: 'CU', flag: '🇨🇺', es: 'Cuba',                 en: 'Cuba'                },
  { code: 'PR', flag: '🇵🇷', es: 'Puerto Rico',          en: 'Puerto Rico'         },
  { code: 'ES', flag: '🇪🇸', es: 'España',               en: 'Spain'               },
];

export default function ScanForm() {
  const [url, setUrl] = useState('');
  const country = 'CO';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { t } = useLanguage();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    let normalized = url.trim();
    if (!normalized.startsWith('http')) {
      normalized = `https://${normalized}`;
    }

    try {
      const parsed = new URL(normalized);
      if (!parsed.hostname.includes('.')) {
        setError(t('error_invalid_url'));
        return;
      }
    } catch {
      setError(t('error_invalid_url'));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalized, country }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || t('error_scan'));
        return;
      }

      const data = await res.json();
      router.push(`/results?id=${data.id}`);
    } catch {
      setError(t('error_connection'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={t('placeholder_url')}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {t('btn_scanning')}
            </span>
          ) : (
            t('btn_scan')
          )}
        </button>
      </div>

      {/* Country pills — comentado, solo Colombia por ahora
      <div className="mt-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <span className="text-xs text-gray-400 shrink-0">{t('country_label')}</span>
          {sortedCountries.map((c) => {
            const selected = country === c.code;
            return (
              <button
                key={c.code}
                type="button"
                onClick={() => setCountry(c.code)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all border shrink-0 ${
                  selected
                    ? 'bg-[#0f8b8d] text-white border-[#0f8b8d]'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#0f8b8d] hover:text-[#0f8b8d]'
                }`}
              >
                <span>{c.flag}</span>
                <span>{c.code}</span>
              </button>
            );
          })}
        </div>
      </div>
      */}

      {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}
    </form>
  );
}
