'use client';

import Topbar from '@/components/topbar';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { useLanguage } from '@/contexts/language';

function PoliticasContent() {
  const { locale } = useLanguage();

  const t = {
    hero: { es: 'Política de Privacidad', en: 'Privacy Policy' },
    subtitle: {
      es: 'Tratamiento de Datos Personales — Ley 1581 de 2012',
      en: 'Personal Data Processing — Law 1581 of 2012',
    },
    updated: { es: 'Última actualización: enero 2025', en: 'Last updated: January 2025' },
    sections: [
      {
        title: { es: '1. Responsable del Tratamiento', en: '1. Data Controller' },
        body: {
          es: 'TRANSFORMACIÓN DIGITAL EMPRESARIAL S.A.S. (TDE), identificada con NIT 901.234.567-8, domiciliada en la ciudad de Bogotá D.C., Colombia, es la responsable del tratamiento de los datos personales recolectados a través de su sitio web tde.com.co y demás canales de atención.',
          en: 'TRANSFORMACIÓN DIGITAL EMPRESARIAL S.A.S. (TDE), identified with NIT 901.234.567-8, domiciled in Bogotá D.C., Colombia, is the data controller for personal data collected through its website tde.com.co and other service channels.',
        },
      },
      {
        title: { es: '2. Datos que Recolectamos', en: '2. Data We Collect' },
        body: {
          es: 'Recolectamos datos personales como nombre completo, número de teléfono, correo electrónico, nombre de empresa y el contenido de mensajes enviados a través de nuestros formularios de contacto o canales de WhatsApp. También podemos recolectar datos de navegación mediante cookies.',
          en: 'We collect personal data such as full name, phone number, email address, company name, and the content of messages sent through our contact forms or WhatsApp channels. We may also collect browsing data through cookies.',
        },
      },
      {
        title: { es: '3. Finalidad del Tratamiento', en: '3. Purpose of Processing' },
        body: {
          es: 'Los datos recolectados se utilizan para: (a) responder solicitudes de información y asesoría; (b) enviar información sobre nuestros servicios y capacitaciones; (c) elaborar propuestas comerciales; (d) cumplir con obligaciones legales y contractuales; (e) mejorar nuestros servicios y sitio web.',
          en: 'Collected data is used to: (a) respond to information and advisory requests; (b) send information about our services and training; (c) prepare commercial proposals; (d) comply with legal and contractual obligations; (e) improve our services and website.',
        },
      },
      {
        title: { es: '4. Derechos del Titular', en: '4. Rights of the Data Subject' },
        body: {
          es: 'Como titular de sus datos personales, usted tiene derecho a: conocer, actualizar y rectificar sus datos; solicitar prueba de la autorización otorgada; ser informado sobre el uso de sus datos; presentar quejas ante la Superintendencia de Industria y Comercio (SIC); revocar la autorización y/o solicitar la supresión de sus datos cuando no se respeten los principios de la Ley 1581 de 2012.',
          en: 'As a data subject, you have the right to: know, update and rectify your data; request proof of the authorization granted; be informed about the use of your data; file complaints with the Superintendence of Industry and Commerce (SIC); revoke authorization and/or request deletion of your data when the principles of Law 1581 of 2012 are not respected.',
        },
      },
      {
        title: { es: '5. Transferencia y Transmisión', en: '5. Transfer and Transmission' },
        body: {
          es: 'TDE no vende ni comparte sus datos personales con terceros para fines comerciales propios de dichos terceros. Los datos podrán ser compartidos únicamente con aliados estratégicos que sean necesarios para la prestación del servicio contratado, bajo contratos que garanticen el mismo nivel de protección.',
          en: 'TDE does not sell or share your personal data with third parties for those third parties\' own commercial purposes. Data may only be shared with strategic partners necessary for delivering the contracted service, under contracts that guarantee the same level of protection.',
        },
      },
      {
        title: { es: '6. Uso de Cookies', en: '6. Use of Cookies' },
        body: {
          es: 'Nuestro sitio web utiliza cookies técnicas y de análisis para mejorar la experiencia de navegación. Puede configurar su navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio. Utilizamos herramientas de análisis como Google Analytics para comprender el uso del sitio de forma anonimizada.',
          en: 'Our website uses technical and analytical cookies to improve the browsing experience. You can configure your browser to reject cookies, although this may affect site functionality. We use analytics tools such as Google Analytics to understand site usage in an anonymized manner.',
        },
      },
      {
        title: { es: '7. Vigencia', en: '7. Validity' },
        body: {
          es: 'La presente Política de Privacidad rige a partir de su publicación y estará vigente mientras TDE desarrolle sus actividades. Nos reservamos el derecho de actualizarla en cualquier momento, notificando los cambios a través de nuestro sitio web.',
          en: 'This Privacy Policy is effective from its publication and will remain in force while TDE conducts its activities. We reserve the right to update it at any time, notifying changes through our website.',
        },
      },
      {
        title: { es: '8. Contacto', en: '8. Contact' },
        body: {
          es: 'Para ejercer sus derechos o resolver cualquier inquietud sobre el tratamiento de sus datos personales, puede contactarnos a través de: Correo electrónico: info@tde.com.co | WhatsApp: +57 314 399 2911 | Ciudad: Bogotá, Colombia.',
          en: 'To exercise your rights or resolve any concerns about the processing of your personal data, you can contact us through: Email: info@tde.com.co | WhatsApp: +57 314 399 2911 | City: Bogotá, Colombia.',
        },
      },
    ],
  };

  return (
    <>
      <section className="relative h-[320px] lg:h-[400px] overflow-hidden">
        <img
          src="/politicas-hero.jpg"
          alt="Política de Privacidad"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a3a]/90 via-[#1a2a3a]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 text-center text-white">
          <h1 className="text-3xl lg:text-5xl font-bold mb-3">{t.hero[locale]}</h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">{t.subtitle[locale]}</p>
        </div>
      </section>

      <section className="py-20 bg-white px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-400 text-sm mb-12">{t.updated[locale]}</p>
          <div className="space-y-10">
            {t.sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-bold text-[#0f8b8d] mb-3">{section.title[locale]}</h2>
                <p className="text-gray-600 leading-relaxed">{section.body[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function PoliticasPage() {
  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <Topbar />
      <SiteHeader />
      <PoliticasContent />
      <SiteFooter />
    </main>
  );
}
