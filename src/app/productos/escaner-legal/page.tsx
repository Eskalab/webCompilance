import type { Metadata } from 'next';
import ScannerLanding from '@/components/scanner-landing/scanner-landing';

const title = 'Escáner Legal TDE — ¿Tu sitio web cumple la Ley 1581?';
const description =
  'Escanea gratis tu sitio web y obtén tu Índice de Confianza Digital: privacidad, cookies, seguridad y transparencia frente a la Ley 1581 de 2012.';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tde.com.co'),
  title,
  description,
  alternates: { canonical: '/productos/escaner-legal' },
  openGraph: {
    title,
    description,
    url: '/productos/escaner-legal',
    siteName: 'TDE — Transformación Digital Empresarial',
    locale: 'es_CO',
    type: 'website',
  },
};

export default function EscanerLegalPage() {
  return <ScannerLanding />;
}
