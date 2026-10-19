import { ImageResponse } from 'next/og';

// Imagen al compartir /scanner (WhatsApp, LinkedIn, etc.)
export const alt = 'Escáner Legal TDE — Índice de Confianza Digital';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          color: 'white',
          background: 'linear-gradient(120deg, #1e2a52 0%, #1e2a52 38%, #2d7d9a 50%, #1e2a52 62%, #1e2a52 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 28, color: '#6ed3c1', fontWeight: 700 }}>
          TDE · Escáner Legal
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1 }}>
            ¿Tu sitio web cumple la Ley de Protección de Datos?
          </div>
          <div style={{ fontSize: 32, color: 'rgba(255,255,255,0.85)' }}>
            Escanéalo gratis y conoce tu Índice de Confianza Digital
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 24 }}>
          {['Privacidad', 'Cookies', 'Seguridad', 'Transparencia'].map((a) => (
            <div
              key={a}
              style={{ display: 'flex', padding: '10px 22px', borderRadius: 999, background: 'rgba(110,211,193,0.18)', color: '#6ed3c1' }}
            >
              {a}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
