import { readFileSync } from 'fs';
import { join } from 'path';

/** Logo TDE inline como data URI (para emails y el informe imprimible). */
export function getLogoBase64(): string {
  try {
    const logoPath = join(process.cwd(), 'public', 'logo.png');
    return `data:image/png;base64,${readFileSync(logoPath).toString('base64')}`;
  } catch {
    return '';
  }
}
