'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/language';
import { ChevronDown } from 'lucide-react';
import type { ServiceData } from '@/lib/home-data';

interface ServiceCardProps {
  service: ServiceData;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { locale } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const ctaText = { es: 'CONTACTAR POR WHATSAPP', en: 'CONTACT VIA WHATSAPP' };

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div id={`servicio-${service.id}`} className="mb-4">
      {/* Gradient Banner */}
      <div className="bg-[linear-gradient(120deg,#1e2a52_0%,#1e2a52_38%,#2d7d9a_50%,#1e2a52_62%,#1e2a52_100%)] py-6 px-6">
        <p className="text-center text-white font-bold text-lg lg:text-xl whitespace-pre-line">
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

            {/* Right: Benefits accordion */}
            <div>
              <h4 className="text-lg font-bold text-[#e91e8c] mb-6">
                {locale === 'es' ? 'BENEFICIOS' : 'BENEFITS'}
              </h4>
              <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
                {service.benefits.map((benefit, i) => (
                  <div key={i}>
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-[#0f8b8d] font-semibold text-sm">
                        {benefit[locale]}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#0f8b8d] shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openIndex === i && (
                      <div className="px-4 pb-3 text-gray-600 text-sm leading-relaxed bg-gray-50">
                        {locale === 'es' ? benefit.bodyEs : benefit.bodyEn}
                      </div>
                    )}
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
              className="inline-block px-10 py-4 bg-[linear-gradient(120deg,#1e2a52_0%,#1e2a52_38%,#2d7d9a_50%,#1e2a52_62%,#1e2a52_100%)] text-white font-bold rounded-full hover:shadow-lg transition-all text-base tracking-wide"
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
