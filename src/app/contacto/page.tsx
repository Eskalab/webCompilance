'use client';

import { useState } from 'react';
import Topbar from '@/components/topbar';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { useLanguage } from '@/contexts/language';

function ContactoContent() {
  const { locale } = useLanguage();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  const t = {
    hero: { es: 'Contáctanos', en: 'Contact Us' },
    subtitle: {
      es: 'Estamos listos para asesorarte. Escríbenos y te respondemos a la brevedad.',
      en: 'We are ready to advise you. Write to us and we will get back to you shortly.',
    },
    phone: { es: 'Teléfono', en: 'Phone' },
    email: { es: 'Correo', en: 'Email' },
    location: { es: 'Ubicación', en: 'Location' },
    formTitle: { es: 'Envíanos un mensaje', en: 'Send us a message' },
    namePlaceholder: { es: 'Tu nombre', en: 'Your name' },
    companyPlaceholder: { es: 'Tu empresa (opcional)', en: 'Your company (optional)' },
    messagePlaceholder: { es: '¿En qué podemos ayudarte?', en: 'How can we help you?' },
    whatsappBtn: { es: 'ENVIAR POR WHATSAPP', en: 'SEND VIA WHATSAPP' },
    whatsappDirect: { es: 'O escríbenos directo', en: 'Or write to us directly' },
    whatsappDirectBtn: { es: 'ABRIR WHATSAPP', en: 'OPEN WHATSAPP' },
  };

  const buildWhatsAppUrl = () => {
    const lines = [];
    if (name) lines.push(`Nombre: ${name}`);
    if (company) lines.push(`Empresa: ${company}`);
    if (message) lines.push(`Consulta: ${message}`);
    const text = lines.length ? lines.join('%0A') : (locale === 'es' ? 'Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n.' : 'Hello%2C%20I%20would%20like%20more%20information.');
    return `https://wa.me/573143992911?text=${text}`;
  };

  return (
    <>
      <section className="bg-gradient-to-r from-[#1a2a3a] to-[#2c3e50] py-20 px-6 text-center text-white">
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">{t.hero[locale]}</h1>
        <p className="text-lg lg:text-xl text-white/80 max-w-2xl mx-auto">{t.subtitle[locale]}</p>
      </section>

      <section className="py-20 bg-white px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">

          {/* Contact info */}
          <div>
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold text-[#e91e8c] uppercase tracking-widest mb-1">{t.phone[locale]}</h3>
                <p className="text-2xl font-bold text-[#1f2d3d]">+57 314 399 2911</p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#e91e8c] uppercase tracking-widest mb-1">{t.email[locale]}</h3>
                <a href="mailto:info@tde.com.co" className="text-2xl font-bold text-[#0f8b8d] hover:underline">
                  info@tde.com.co
                </a>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#e91e8c] uppercase tracking-widest mb-1">{t.location[locale]}</h3>
                <p className="text-2xl font-bold text-[#1f2d3d]">Bogotá, Colombia</p>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-gray-500 mb-4">{t.whatsappDirect[locale]}</p>
              <a
                href="https://wa.me/573143992911"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#1ebe5a] transition-all text-base"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t.whatsappDirectBtn[locale]}
              </a>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold text-[#1f2d3d] mb-8">{t.formTitle[locale]}</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder[locale]}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0f8b8d] transition-colors"
              />
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder={t.companyPlaceholder[locale]}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0f8b8d] transition-colors"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.messagePlaceholder[locale]}
                rows={5}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0f8b8d] transition-colors resize-none"
              />
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-10 py-4 bg-gradient-to-r from-[#6ed3c1] to-[#4cb8c4] text-white font-bold rounded-full hover:shadow-lg transition-all text-base tracking-wide"
              >
                {t.whatsappBtn[locale]}
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <Topbar />
      <SiteHeader />
      <ContactoContent />
      <SiteFooter />
    </main>
  );
}
