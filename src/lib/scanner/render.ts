// Renderizado con navegador real (Crawlee/Playwright) para SPAs y anti-bots.
//
// ⚠️ DESACTIVADO A PROPÓSITO. El render con Chromium no cabe en el límite de 10s
// de Vercel (los SPAs tardan 11–17s) y complica el deploy. Por eso renderPage()
// está en modo STUB: siempre devuelve null → el pipeline se queda con la ingesta
// en capas (fetch + got-scraping), rápida (<6s) y compatible con serverless.
// Los SPAs caen al estado honesto "política no encontrada".
//
// La implementación real (Crawlee PlaywrightCrawler) quedó ABAJO, comentada,
// para reactivarla cuando exista el scanner-worker fuera de Vercel: descomentar
// el bloque, borrar el stub y agregar `crawlee`/`@sparticuz/chromium` al runtime.

type RenderResult = { html: string; finalUrl: string };

// STUB — sin navegador. El caller usa el HTML del fetch/got-scraping.
export async function renderPage(
  _url: string,
  _timeoutMs = 15000,
): Promise<RenderResult | null> {
  return null;
}

/* ===== IMPLEMENTACIÓN REAL (Crawlee/Playwright) — descomentar para el worker =====

import { PlaywrightCrawler, Configuration, log, LogLevel } from 'crawlee';

const IS_SERVERLESS = !!(
  process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME
);

// Render con Chromium: por defecto ON en local, OFF en serverless (Vercel) para
// no cargar Chromium ni exceder el límite de 10s por invocación. Override:
//   SCANNER_RENDER=1  → forzar ON (ej. el scanner-worker fuera de Vercel)
//   SCANNER_RENDER=0  → forzar OFF
function renderEnabled(): boolean {
  const flag = process.env.SCANNER_RENDER;
  if (flag === '1' || flag === 'true') return true;
  if (flag === '0' || flag === 'false') return false;
  return !IS_SERVERLESS;
}

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
  if (!renderEnabled()) return null;

  log.setLevel(LogLevel.WARNING); // silencia el INFO ruidoso; deja WARN/ERROR

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

===== FIN IMPLEMENTACIÓN REAL ===== */
