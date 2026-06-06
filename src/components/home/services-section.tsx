'use client';

import { useLanguage } from '@/contexts/language';
import { services } from '@/lib/home-data';
import ServiceCard from './service-card';

export default function ServicesSection() {
  const { locale } = useLanguage();

  const title = { es: 'NUESTROS', en: 'OUR' };
  const titleBold = { es: 'SERVICIOS', en: 'SERVICES' };

  return (
    <section id="servicios" className="pt-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <p className="text-[#0f8b8d] font-semibold uppercase tracking-widest mb-2">
          {title[locale]}
        </p>
        <h2 className="text-5xl lg:text-6xl font-bold text-[#1f2d3d]">
          {titleBold[locale]}
        </h2>
      </div>

      {/* Service Cards */}
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </section>
  );
}
