import { landingOgImage } from '@/lib/landings/og-image';
import { diagnosticoLegal360 as content } from '@/lib/landings/diagnostico-legal-360';

export const alt = content.og.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return landingOgImage(content);
}
