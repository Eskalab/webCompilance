import { landingOgImage } from '@/lib/landings/og-image';
import { asesoriaDerechoDigital as content } from '@/lib/landings/asesoria-derecho-digital';

export const alt = content.og.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return landingOgImage(content);
}
