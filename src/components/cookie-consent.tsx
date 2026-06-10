'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/language';
import { Cookie, X, ChevronDown, ChevronUp, Shield } from 'lucide-react';

const STORAGE_KEY = 'cookie-consent-v2';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const DEFAULT_PREFS: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

const CATEGORIES = {
  necessary: {
    es: { name: 'Estrictamente necesarias', desc: 'Estas cookies son imprescindibles para el funcionamiento del sitio web y no pueden desactivarse. Generalmente solo se activan en respuesta a acciones como iniciar sesión o rellenar formularios.' },
    en: { name: 'Strictly necessary', desc: 'These cookies are essential for the website to function and cannot be switched off. They are usually set in response to actions you take such as logging in or filling in forms.' },
    always: true,
  },
  preferences: {
    es: { name: 'Preferencias', desc: 'Permiten que el sitio recuerde información que cambia el comportamiento o aspecto del sitio, como el idioma preferido o la región en la que te encuentras.' },
    en: { name: 'Preferences', desc: 'These cookies allow the website to remember choices you make and provide enhanced, more personalised features such as your preferred language or region.' },
    always: false,
  },
  analytics: {
    es: { name: 'Analíticas', desc: 'Nos permiten contar las visitas y fuentes de tráfico para medir y mejorar el rendimiento de nuestro sitio. Toda la información que recogen es agregada y por lo tanto anónima.' },
    en: { name: 'Analytics', desc: 'These cookies allow us to count visits and traffic sources so we can measure and improve site performance. All information collected is aggregated and therefore anonymous.' },
    always: false,
  },
  marketing: {
    es: { name: 'Marketing y publicidad', desc: 'Estas cookies pueden ser establecidas a través de nuestro sitio por nuestros socios publicitarios. Pueden ser utilizadas para construir un perfil de tus intereses y mostrarte anuncios relevantes.' },
    en: { name: 'Marketing & advertising', desc: 'These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant adverts on other sites.' },
    always: false,
  },
};

type CategoryKey = keyof typeof CATEGORIES;

function Toggle({ enabled, onChange, disabled }: { enabled: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={() => !disabled && onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200 focus:outline-none ${
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
      } ${enabled ? 'bg-[#0f8b8d]' : 'bg-gray-300'}`}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 mt-0.5 ${
          enabled ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

function CategoryRow({
  categoryKey,
  prefs,
  onChange,
  locale,
}: {
  categoryKey: CategoryKey;
  prefs: CookiePreferences;
  onChange: (key: CategoryKey, val: boolean) => void;
  locale: 'es' | 'en';
}) {
  const [open, setOpen] = useState(false);
  const cat = CATEGORIES[categoryKey];
  const info = cat[locale];

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-left flex-1 min-w-0"
        >
          {open ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
          <span className="font-semibold text-[#1e2a52] text-sm">{info.name}</span>
          {cat.always && (
            <span className="text-xs text-[#0f8b8d] font-medium bg-[#0f8b8d]/10 px-2 py-0.5 rounded-full">
              {locale === 'es' ? 'Siempre activas' : 'Always active'}
            </span>
          )}
        </button>
        <Toggle
          enabled={cat.always ? true : prefs[categoryKey]}
          onChange={(v) => onChange(categoryKey, v)}
          disabled={cat.always}
        />
      </div>
      {open && (
        <div className="px-4 py-3 text-sm text-gray-500 leading-relaxed border-t border-gray-100">
          {info.desc}
        </div>
      )}
    </div>
  );
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>(DEFAULT_PREFS);
  const { locale } = useLanguage();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  function save(p: CookiePreferences) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    setVisible(false);
    setModalOpen(false);
  }

  function handleAcceptAll() {
    save({ necessary: true, analytics: true, marketing: true, preferences: true });
  }

  function handleRejectAll() {
    save({ necessary: true, analytics: false, marketing: false, preferences: false });
  }

  function handleSavePrefs() {
    save(prefs);
  }

  function updatePref(key: CategoryKey, val: boolean) {
    setPrefs((p) => ({ ...p, [key]: val }));
  }

  if (!visible) return null;

  const copy = {
    banner: {
      es: 'Utilizamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico y personalizar el contenido. Puedes aceptarlas todas, rechazarlas o configurarlas según tus preferencias.',
      en: 'We use first and third-party cookies to improve your experience, analyze traffic and personalize content. You can accept all, reject all, or manage your preferences.',
    },
    policy: { es: 'Política de cookies', en: 'Cookie policy' },
    acceptAll: { es: 'Aceptar todas', en: 'Accept all' },
    rejectAll: { es: 'Rechazar todas', en: 'Reject all' },
    configure: { es: 'Configurar', en: 'Manage preferences' },
    modalTitle: { es: 'Centro de preferencias de privacidad', en: 'Privacy preference center' },
    modalSubtitle: {
      es: 'Cuando visitas cualquier sitio web, puede almacenar o recuperar información en tu navegador, principalmente en forma de cookies. Esta información puede ser sobre ti, tus preferencias o tu dispositivo.',
      en: 'When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences or your device.',
    },
    savePrefs: { es: 'Guardar mis preferencias', en: 'Save my preferences' },
  };

  return (
    <>
      {/* Banner */}
      <div className="fixed bottom-0 inset-x-0 z-[100] p-4 sm:p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-start gap-4 p-5 sm:p-6">
            <div className="w-10 h-10 rounded-xl bg-[#0f8b8d]/10 flex items-center justify-center shrink-0 mt-0.5">
              <Cookie className="w-5 h-5 text-[#0f8b8d]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-600 leading-relaxed">
                {copy.banner[locale]}{' '}
                <a href="/politicas#cookies" className="text-[#0f8b8d] underline hover:text-[#0c7475] whitespace-nowrap">
                  {copy.policy[locale]}
                </a>
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 px-5 sm:px-6 pb-5 sm:pb-6 sm:justify-end">
            <button
              onClick={() => setModalOpen(true)}
              className="h-10 px-5 rounded-xl border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition order-3 sm:order-1"
            >
              {copy.configure[locale]}
            </button>
            <button
              onClick={handleRejectAll}
              className="h-10 px-5 rounded-xl border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition order-2"
            >
              {copy.rejectAll[locale]}
            </button>
            <button
              onClick={handleAcceptAll}
              className="h-10 px-6 rounded-xl bg-[#0f8b8d] text-white text-sm font-semibold hover:bg-[#0c7475] transition order-1 sm:order-3"
            >
              {copy.acceptAll[locale]}
            </button>
          </div>
        </div>
      </div>

      {/* Modal de configuración */}
      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#1e2a52]/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#1e2a52]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1e2a52]">{copy.modalTitle[locale]}</h2>
                </div>
              </div>
              <button onClick={() => setModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
              <p className="text-sm text-gray-500 leading-relaxed">{copy.modalSubtitle[locale]}</p>

              {(Object.keys(CATEGORIES) as CategoryKey[]).map((key) => (
                <CategoryRow key={key} categoryKey={key} prefs={prefs} onChange={updatePref} locale={locale} />
              ))}

              <p className="text-xs text-gray-400">
                <a href="/politicas#cookies" className="text-[#0f8b8d] underline hover:text-[#0c7475]">
                  {copy.policy[locale]}
                </a>
              </p>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row gap-2 sm:justify-between">
              <div className="flex gap-2">
                <button onClick={handleRejectAll} className="h-10 px-4 rounded-xl border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition">
                  {copy.rejectAll[locale]}
                </button>
                <button onClick={handleAcceptAll} className="h-10 px-4 rounded-xl border border-[#0f8b8d] text-[#0f8b8d] text-sm font-medium hover:bg-[#0f8b8d]/5 transition">
                  {copy.acceptAll[locale]}
                </button>
              </div>
              <button onClick={handleSavePrefs} className="h-10 px-6 rounded-xl bg-[#1e2a52] text-white text-sm font-semibold hover:bg-[#16203d] transition">
                {copy.savePrefs[locale]}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
