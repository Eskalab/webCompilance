import { landingOgImage } from '@/lib/landings/og-image';
import { capacitaciones as content } from '@/lib/landings/capacitaciones';

export const alt = content.og.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return landingOgImage(content);
}
