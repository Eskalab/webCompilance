'use client';

import { useLanguage } from '@/contexts/language';

export default function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer id="footer" className="bg-[#eef1f4] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* BRAND */}
          <div className="lg:col-span-2">
            <img
              src="/logo.png"
              alt="TDE"
              className="h-16 w-auto object-contain mb-6"
            />
            <p className="text-gray-600 leading-relaxed max-w-lg">
              {t('footer_desc')}
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="font-bold text-[#1f2d3d] mb-6">
              {t('footer_platform')}
            </h4>
            <div className="space-y-4 text-gray-600">
              <p>{t('footer_scanning')}</p>
              <p>{t('footer_compliance')}</p>
              <p>{t('footer_privacy')}</p>
              <p>{t('footer_reports')}</p>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-bold text-[#1f2d3d] mb-6">
              {t('footer_contact')}
            </h4>
            <div className="space-y-4 text-gray-600">
              <p>+57 314 399 2911</p>
              <p>info@tde.com.co</p>
              <p>Bogotá, Colombia</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>{t('footer')}</p>
        </div>
      </div>
    </footer>
  );
}
