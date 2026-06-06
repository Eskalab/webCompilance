'use client';

import { useLanguage } from '@/contexts/language';

export default function QueHacemos() {
  const { locale } = useLanguage();

  const title = { es: '¿Que Hacemos?', en: 'What Do We Do?' };

  const paragraphs = [
    {
      es: 'Asesoramos a nuestros clientes en la creacion, desarrollo e implementacion de los Protocolos Técnicos, los cuales generan los programas de Protección de Datos Personales, que como Responsable de los Datos, la empresa esta obligada a aplicar.',
      en: 'We advise our clients on the creation, development and implementation of Technical Protocols, which generate Personal Data Protection programs that, as Data Controller, the company is obligated to apply.',
    },
    {
      es: 'Con este servicio usted adquirirá, la asesoría y el acompañamiento profesional que requiere el aplicar los requisitos legales, técnicos y administrativos que exige la ley 1581 de 2012.',
      en: 'With this service you will acquire the professional advice and support needed to apply the legal, technical and administrative requirements demanded by Law 1581 of 2012.',
    },
    {
      es: 'Cumplir correctamente con la ley de Proteccion de Datos Personales en Colombia, logra para su empresa disminuir el riesgo legal por sanción de la SIC, garantizar la Privacidad y Seguridad de los datos de la información, ademas de tomar acciones que aumenten la Responsabilidad demostrada a la que la empresa Responsable esta obligada a implementar.',
      en: 'Properly complying with the Personal Data Protection law in Colombia helps your company reduce legal risk from SIC sanctions, guarantee Privacy and Security of data information, and take actions that increase the Demonstrated Accountability the responsible company is obligated to implement.',
    },
  ];

  return (
    <section id="que-hacemos" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl font-bold text-[#1f2d3d] text-center mb-12">
          {title[locale]}
        </h2>
        <div className="space-y-6 text-gray-600 leading-relaxed text-lg text-justify">
          {paragraphs.map((p, i) => (
            <p key={i}>{p[locale]}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
