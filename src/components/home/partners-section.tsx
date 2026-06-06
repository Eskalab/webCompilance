'use client';

import { useLanguage } from '@/contexts/language';
import { partners } from '@/lib/home-data';

export default function PartnersSection() {
  const { locale } = useLanguage();

  const content = {
    label: { es: 'NUESTROS', en: 'OUR' },
    title: { es: 'PARTNERS', en: 'PARTNERS' },
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#0f8b8d] font-semibold uppercase tracking-widest mb-2">
            {content.label[locale]}
          </p>
          <h2 className="text-5xl lg:text-6xl font-bold text-[#0f8b8d]">
            {content.title[locale]}
          </h2>
        </div>

        {/* Partner Logos */}
        <div className="grid md:grid-cols-3 gap-10 items-center justify-items-center">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="w-full max-w-[280px] h-[160px] bg-[#f7f8fa] rounded-[20px] border border-gray-100 flex items-center justify-center p-6 hover:shadow-lg transition-all"
            >
              <p className="text-center text-gray-500 font-semibold text-sm">
                {partner.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
