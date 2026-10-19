'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/language';

// Barra fija en móvil: aparece solo cuando ningún formulario de escaneo está en pantalla.
// Los bloques con formulario se marcan con data-scan-cta.
export default function MobileScanBar() {
  const { locale } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll('[data-scan-cta]'));
    const inView = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) inView.add(e.target);
        else inView.delete(e.target);
      }
      setVisible(inView.size === 0);
    });
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  function goToForm() {
    const hero = document.getElementById('escanear');
    hero?.scrollIntoView({ behavior: 'smooth' });
    hero?.querySelector('input')?.focus({ preventScroll: true });
  }

  return (
    <div
      className={`md:hidden fixed bottom-6 left-4 right-24 z-[80] transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      {/* right-24 deja espacio para el botón flotante de WhatsApp */}
      <button
        type="button"
        onClick={goToForm}
        className="w-full h-14 rounded-full bg-[#0f8b8d] text-white font-semibold shadow-xl hover:bg-[#0c7475] transition-colors"
      >
        {locale === 'es' ? 'Escanear mi sitio gratis' : 'Scan my site for free'}
      </button>
    </div>
  );
}
