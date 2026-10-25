import type { Metadata } from 'next';
import ProductLanding from '@/components/product-landing/product-landing';
import { diagnosticoLegal360 as content } from '@/lib/landings/diagnostico-legal-360';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tde.com.co'),
  title: content.meta.title,
  description: content.meta.description,
  alternates: { canonical: content.path },
  openGraph: {
    title: content.meta.title,
    description: content.meta.description,
    url: content.path,
    siteName: 'TDE — Transformación Digital Empresarial',
    locale: 'es_CO',
    type: 'website',
  },
};

export default function DiagnosticoLegal360Page() {
  return <ProductLanding content={content} />;
}
