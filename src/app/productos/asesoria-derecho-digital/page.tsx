import type { Metadata } from 'next';
import ProductLanding from '@/components/product-landing/product-landing';
import { asesoriaDerechoDigital as content } from '@/lib/landings/asesoria-derecho-digital';

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

export default function AsesoriaDerechoDigitalPage() {
  return <ProductLanding content={content} />;
}
