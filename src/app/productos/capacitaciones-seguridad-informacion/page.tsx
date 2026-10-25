import type { Metadata } from 'next';
import ProductLanding from '@/components/product-landing/product-landing';
import { capacitaciones as content } from '@/lib/landings/capacitaciones';

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

export default function CapacitacionesPage() {
  return <ProductLanding content={content} />;
}
