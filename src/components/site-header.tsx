'use client';

import { useLanguage } from '@/contexts/language';

export default function SiteHeader() {
  const { t } = useLanguage();
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

            {/* MENU */}
            <nav className="hidden lg:flex items-center gap-10 text-[16px] font-medium text-[#1f2757]">

              {/* QUE HACEMOS */}
              <div className="relative group">
                <button className="flex items-center gap-2 hover:text-[#6fcbb8] transition-colors">
                  {t('nav_what_we_do')}

                  <svg
                    className="w-3 h-3 mt-[2px]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.5 7l4.5 4 4.5-4" />
                  </svg>
                </button>
              </div>

              {/* SERVICIOS */}
              <div className="relative group">

                <button className="flex items-center gap-2 text-[#6fcbb8] hover:text-[#58b8a6] transition-colors">
                  {t('nav_services')}

                  <svg
                    className="w-3 h-3 mt-[2px]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.5 7l4.5 4 4.5-4" />
                  </svg>
                </button>

                {/* DROPDOWN */}
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">

                  <div className="bg-[#0b6f75] min-w-[760px] shadow-2xl overflow-hidden">

                    <a
                      href="/#servicio-ley-1581"
                      className="block px-8 py-4 text-white text-[16px] border-b border-white hover:bg-[#0e8087] transition-colors"
                    >
                      {t('nav_svc_ecommerce_data')}
                    </a>

                    <a
                      href="/#servicio-propiedad-horizontal"
                      className="block px-8 py-4 text-white text-[16px] border-b border-white hover:bg-[#0e8087] transition-colors"
                    >
                      {t('nav_svc_horizontal')}
                    </a>

                    <a
                      href="/#servicio-consultorios-medicos"
                      className="block px-8 py-4 text-white text-[16px] border-b border-white hover:bg-[#0e8087] transition-colors"
                    >
                      {t('nav_svc_medical')}
                    </a>

                    <a
                      href="/#servicio-empresas-digitales"
                      className="block px-8 py-4 text-white text-[16px] border-b border-white hover:bg-[#0e8087] transition-colors"
                    >
                      {t('nav_svc_legal_ecommerce')}
                    </a>

                    <a
                      href="/#servicio-auditoria-interna"
                      className="block px-8 py-4 text-white text-[16px] border-b border-white hover:bg-[#0e8087] transition-colors"
                    >
                      {t('nav_svc_audit')}
                    </a>

                    <a
                      href="/#servicio-evaluacion-amenazas"
                      className="block px-8 py-4 text-white text-[16px] hover:bg-[#0e8087] transition-colors"
                    >
                      {t('nav_svc_threats')}
                    </a>

                  </div>
                </div>
              </div>

              {/* LINKS */}
              <a
                href="#"
                className="hover:text-[#6fcbb8] transition-colors"
              >
                {t('nav_training')}
              </a>

              <a
                href="#"
                className="hover:text-[#6fcbb8] transition-colors"
              >
                {t('nav_blog')}
              </a>

              <a
                href="#"
                className="hover:text-[#6fcbb8] transition-colors"
              >
                {t('nav_policies')}
              </a>

              {/* CONTACTO */}
              <div className="relative group">
                <button className="flex items-center gap-2 hover:text-[#6fcbb8] transition-colors">
                  {t('nav_contact')}

                  <svg
                    className="w-3 h-3 mt-[2px]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.5 7l4.5 4 4.5-4" />
                  </svg>
                </button>
              </div>

            </nav>
          </div>
        </div>
      </header>
    </>
  );
}