'use client';

import { useLanguage } from '@/contexts/language';
import { CheckCircle2 } from 'lucide-react';
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

            {/* Center: Image */}
            <div className="flex justify-center">
              <div className="rounded-[20px] w-full max-w-[350px] h-[250px] overflow-hidden border border-gray-100">
                <img
                  src={`/services/${service.id}.jpg`}
                  alt={service.sectionTitle[locale]}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right: Benefits */}
            <div>
              <h4 className="text-lg font-bold text-[#e91e8c] mb-6">
                {locale === 'es' ? 'BENEFICIOS' : 'BENEFITS'}
              </h4>
              <div className="space-y-4">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#0f8b8d] shrink-0 mt-0.5" />
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
