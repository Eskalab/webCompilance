import { Check, CheckResult, ScanContext } from '../types';

export const sslCheck: Check = {
  id: 'ssl',
  label: 'SSL / HTTPS',
  tier: 'free',
  description: 'Verifies that your site uses a secure HTTPS connection.',
  weight: 8,

  async run(context: ScanContext): Promise<CheckResult> {
    const hasHttps = context.url.startsWith('https://');

    if (hasHttps && context.html) {
      return {
        checkId: this.id,
        status: 'pass',
        label: this.label,
        labelEs: 'SSL / HTTPS',
        details: 'Your site uses HTTPS. All connections are encrypted.',
        detailsEs: 'Tu sitio usa HTTPS. Todas las conexiones están encriptadas.',
        suggestion: '',
        suggestionEs: '',
        tier: this.tier,
        weight: this.weight,
        meta: {},
      };
    }

    if (hasHttps && !context.html) {
      return {
        checkId: this.id,
        status: 'warn',
        label: this.label,
        labelEs: 'SSL / HTTPS',
        details: 'Your site URL uses HTTPS but we could not verify the connection. Mixed content may be present.',
        detailsEs: 'Tu sitio usa HTTPS pero no pudimos verificar la conexión. Podría haber contenido mixto.',
        suggestion: 'Check for mixed content (HTTP resources on HTTPS pages). Ensure all resources load over HTTPS.',
        suggestionEs: 'Verifica que no haya contenido mixto (recursos HTTP en páginas HTTPS). Asegúrate de que todos los recursos carguen por HTTPS.',
        tier: this.tier,
        weight: this.weight,
        meta: {},
      };
    }

    return {
      checkId: this.id,
      status: 'fail',
      label: this.label,
      labelEs: 'SSL / HTTPS',
      details: 'Your site does not use HTTPS. Data transmitted between your site and visitors is not encrypted.',
      detailsEs: 'Tu sitio no usa HTTPS. Los datos transmitidos entre tu sitio y los visitantes no están encriptados.',
      suggestion: 'Install an SSL certificate on your hosting. Most providers offer free SSL via Let\'s Encrypt. Then redirect all HTTP traffic to HTTPS.',
      suggestionEs: 'Instala un certificado SSL en tu hosting. La mayoría de proveedores ofrecen SSL gratuito con Let\'s Encrypt. Luego redirige todo el tráfico HTTP a HTTPS.',
      tier: this.tier,
      weight: this.weight,
      meta: {},
    };
  },
};
