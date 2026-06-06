'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/language';

export default function SiteHeader() {
  const { t, locale } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const closeMobile = () => {
    setMobileOpen(false);
    setServicesOpen(false);
  };

  const services = [
    { href: '/#servicio-ley-1581', label: t('nav_svc_ecommerce_data') },
    { href: '/#servicio-propiedad-horizontal', label: t('nav_svc_horizontal') },
    { href: '/#servicio-consultorios-medicos', label: t('nav_svc_medical') },
    { href: '/#servicio-empresas-digitales', label: t('nav_svc_legal_ecommerce') },
    { href: '/#servicio-auditoria-interna', label: t('nav_svc_audit') },
    { href: '/#servicio-evaluacion-amenazas', label: t('nav_svc_threats') },
    {
      href: '/#servicio-contratos-especializados',
      label: locale === 'es' ? 'Contratos Especializados Transferencia de Datos' : 'Specialized Data Transfer Contracts',
    },
  ];

  return (
    <>
      {/* HEADER MENÚ PRINCIPAL */}
      <header className="bg-white border-b border-gray-100 relative z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-[92px]">

            {/* LOGO */}
            <a href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="TDE"
                className="h-[62px] w-auto object-contain"
              />
            </a>

            {/* MENU DESKTOP */}
            <nav className="hidden lg:flex items-center gap-10 text-[16px] font-medium text-[#1f2757]">

              {/* QUE HACEMOS */}
              <a href="/#que-hacemos" className="hover:text-[#6fcbb8] transition-colors">
                {t('nav_what_we_do')}
              </a>

              {/* SERVICIOS */}
              <div className="relative group">
                <button className="flex items-center gap-2 text-[#6fcbb8] hover:text-[#58b8a6] transition-colors">
                  {t('nav_services')}
                  <svg className="w-3 h-3 mt-[2px]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.5 7l4.5 4 4.5-4" />
                  </svg>
                </button>

                {/* DROPDOWN */}
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-[#0b6f75] min-w-[760px] shadow-2xl overflow-hidden">
                    {services.map((svc, i) => (
                      <a
                        key={svc.href}
                        href={svc.href}
                        className={`block px-8 py-4 text-white text-[16px] hover:bg-[#0e8087] transition-colors ${i < services.length - 1 ? 'border-b border-white' : ''}`}
                      >
                        {svc.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <a href="/#capacitaciones" className="hover:text-[#6fcbb8] transition-colors">
                {t('nav_training')}
              </a>

              <a href="/#blog" className="hover:text-[#6fcbb8] transition-colors">
                {t('nav_blog')}
              </a>

              <a href="/politicas" className="hover:text-[#6fcbb8] transition-colors">
                {t('nav_policies')}
              </a>

              <a href="/contacto" className="hover:text-[#6fcbb8] transition-colors">
                {t('nav_contact')}
              </a>

            </nav>

            {/* HAMBURGER BUTTON — solo mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] text-[#1f2757]"
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

          </div>
        </div>

        {/* MENÚ MOBILE */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg z-40">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col text-[16px] font-medium text-[#1f2757]">

              <a
                href="/#que-hacemos"
                onClick={closeMobile}
                className="py-4 border-b border-gray-100 hover:text-[#6fcbb8] transition-colors"
              >
                {t('nav_what_we_do')}
              </a>

              {/* SERVICIOS ACORDEÓN */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full flex items-center justify-between py-4 text-[#6fcbb8] hover:text-[#58b8a6] transition-colors"
                >
                  <span>{t('nav_services')}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {servicesOpen && (
                  <div className="pb-2 bg-[#f7f9fa] rounded-lg mb-2">
                    {services.map((svc) => (
                      <a
                        key={svc.href}
                        href={svc.href}
                        onClick={closeMobile}
                        className="block px-4 py-3 text-[14px] text-[#0b6f75] hover:bg-[#e8f4f4] transition-colors border-b border-gray-100 last:border-0"
                      >
                        {svc.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="/#capacitaciones"
                onClick={closeMobile}
                className="py-4 border-b border-gray-100 hover:text-[#6fcbb8] transition-colors"
              >
                {t('nav_training')}
              </a>

              <a
                href="/#blog"
                onClick={closeMobile}
                className="py-4 border-b border-gray-100 hover:text-[#6fcbb8] transition-colors"
              >
                {t('nav_blog')}
              </a>

              <a
                href="/politicas"
                onClick={closeMobile}
                className="py-4 border-b border-gray-100 hover:text-[#6fcbb8] transition-colors"
              >
                {t('nav_policies')}
              </a>

              <a
                href="/contacto"
                onClick={closeMobile}
                className="py-4 hover:text-[#6fcbb8] transition-colors"
              >
                {t('nav_contact')}
              </a>

            </nav>
          </div>
        )}

      </header>
    </>
  );
}
