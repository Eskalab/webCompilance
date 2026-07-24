// Renderizado con navegador real (headless) para sitios que arman su contenido
// con JavaScript (footers, menús) o que bloquean el fetch plano.
//
// Usa Crawlee (PlaywrightCrawler): inyecta fingerprints de navegador reales por
// defecto (browserPool), lo que ayuda con SPAs y con anti-bots. Es lento y pesado,
// así que context.ts solo lo llama como fallback cuando el fetch/got-scraping falla.
//
// Bloqueo (403 del anti-bot al navegador, ej. Avianca): NO es fatal. Se reintenta
// una vez; si sigue bloqueado, renderPage devuelve null y el caller se queda con
// el HTML del fetch plano (mejor un shell que nada).
//
// Serverless (Vercel): Playwright no trae Chromium empaquetado → se apunta el
// executablePath a @sparticuz/chromium. En local usa el Chromium propio de Playwright.

import { PlaywrightCrawler, Configuration, log, LogLevel } from 'crawlee';

type RenderResult = { html: string; finalUrl: string };

// Silencia el INFO ruidoso de Crawlee; deja WARN/ERROR (bloqueos, fallos).
log.setLevel(LogLevel.WARNING);

const IS_SERVERLESS = !!(
  process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME
);

// En serverless, Playwright no trae Chromium empaquetado → usar @sparticuz/chromium.
// En local, dejar que Playwright use su propio Chromium (launchOptions vacío).
async function serverlessLaunchOptions(): Promise<Record<string, unknown>> {
  if (!IS_SERVERLESS) return {};
  try {
    const chromium = (await import('@sparticuz/chromium')).default;
    return {
      executablePath: await chromium.executablePath(),
      args: chromium.args,
    };
  } catch {
    return {};
  }
}

export async function renderPage(
  url: string,
  timeoutMs = 15000,
): Promise<RenderResult | null> {
  let result: RenderResult | null = null;
  const launchOptions = await serverlessLaunchOptions();
  const navSecs = Math.ceil(timeoutMs / 1000);

  // persistStorage:false → almacenamiento en memoria, sin escribir disco (serverless).
  const config = new Configuration({ persistStorage: false });

  const crawler = new PlaywrightCrawler(
    {
      headless: true,
      maxRequestRetries: 1,
      navigationTimeoutSecs: navSecs,
      requestHandlerTimeoutSecs: navSecs + 15,
      maxConcurrency: 1,
      launchContext: { launchOptions },
      async requestHandler({ page }) {
        // Muchos footers legales cargan lazy al hacer scroll.
        await page
          .evaluate(() => window.scrollTo(0, document.body.scrollHeight))
          .catch(() => {});
        await page.waitForTimeout(1500);
        result = { html: await page.content(), finalUrl: page.url() };
      },
    },
    config,
  );

  try {
    await crawler.run([url]);
  } catch {
    // Error de navegación o bloqueo: result queda null → caller cae al fetch plano.
  } finally {
    await crawler.teardown().catch(() => {});
  }

  return result;
}
