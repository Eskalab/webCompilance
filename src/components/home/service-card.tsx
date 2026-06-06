'use client';

import { useLanguage } from '@/contexts/language';
import { ChevronDown } from 'lucide-react';
import type { ServiceData } from '@/lib/home-data';

interface ServiceCardProps {
  service: ServiceData;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { locale } = useLanguage();

  const ctaText = { es: 'CONTACTAR POR WHATSAPP', en: 'CONTACT VIA WHATSAPP' };

  return (
    <div id={`servicio-${service.id}`} className="mb-4">
      {/* Gradient Banner */}
      <div className="bg-gradient-to-r from-[#6ed3c1] to-[#4cb8c4] py-6 px-6">
        <p className="text-center text-[#1f2d3d] font-bold text-lg lg:text-xl whitespace-pre-line">
          {service.bannerTitle[locale]}
        </p>
      </div>

      {/* Content: 3-column layout */}
      <div className="bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 items-start">
            {/* Left: Title + Description */}
            <div>
              <h3 className="text-xl font-bold text-[#0f8b8d] mb-6">
                {service.sectionTitle[locale]}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm text-justify whitespace-pre-line">
                {service.description[locale]}
              </p>
            </div>

            {/* Center: Image placeholder */}
            <div className="flex justify-center">
              <div className="bg-[#f7f8fa] rounded-[20px] w-full max-w-[350px] h-[250px] flex items-center justify-center border border-gray-100">
                <div className="text-center text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs">Image</p>
                </div>
              </div>
            </div>

            {/* Right: Benefits */}
            <div>
              <h4 className="text-lg font-bold text-[#e91e8c] mb-6">BENEFICIOS</h4>
              <div className="space-y-4">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <ChevronDown className="w-5 h-5 text-[#0f8b8d] shrink-0 mt-0.5" />
                    <p className="text-[#0f8b8d] font-semibold text-sm">
                      {benefit[locale]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <a
              href={service.ctaWhatsApp[locale]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-gradient-to-r from-[#6ed3c1] to-[#4cb8c4] text-white font-bold rounded-full hover:shadow-lg transition-all text-base tracking-wide"
            >
              {ctaText[locale]}
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-gray-200" />
    </div>
  );
}
