import { ImageResponse } from 'next/og';
import type { LandingContent } from './types';

// Imagen al compartir una landing (WhatsApp, LinkedIn, etc.), mismo estilo que /productos/escaner-legal
export const ogSize = { width: 1200, height: 630 };

export function landingOgImage({ og }: LandingContent) {
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
        <div style={{ display: 'flex', fontSize: 28, color: '#6ed3c1', fontWeight: 700 }}>{og.kicker}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>{og.title}</div>
          <div style={{ fontSize: 32, color: 'rgba(255,255,255,0.85)' }}>{og.subtitle}</div>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 24 }}>
          {og.tags.map((tag) => (
            <div
              key={tag}
              style={{ display: 'flex', padding: '10px 22px', borderRadius: 999, background: 'rgba(110,211,193,0.18)', color: '#6ed3c1' }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    ogSize,
  );
}
