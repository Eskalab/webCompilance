'use client';

import { useLanguage } from '@/contexts/language';
import { ICD_AREAS, getICDLevel } from '@/lib/scanner/icd';

// Tarjeta ilustrativa de un resultado, con los mismos niveles y áreas del informe real.
const SAMPLE_SCORE = 64;
const SAMPLE_AREAS: Record<string, number> = {
  privacidad: 48,
  seguridad: 86,
  cookies: 35,
  transparencia: 70,
};

export default function IcdPreview() {
  const { locale } = useLanguage();
  const es = locale === 'es';
  const level = getICDLevel(SAMPLE_SCORE);

  const r = 52;
  const circ = 2 * Math.PI * r;

  return (
    <div
      className="bg-white rounded-[28px] shadow-2xl border border-gray-100 p-7 w-full max-w-md"
      role="img"
      aria-label={es ? 'Ejemplo ilustrativo de un resultado del escáner' : 'Illustrative example of a scanner result'}
    >
      <div className="flex items-center justify-between mb-6">
        <p className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#0f8b8d]">
          {es ? 'Índice de Confianza Digital™' : 'Digital Trust Index™'}
        </p>
        <span className="text-[11px] text-gray-400">tuempresa.com.co</span>
      </div>

      <div className="flex items-center gap-6 mb-7">
        <svg width="128" height="128" viewBox="0 0 128 128" className="shrink-0" aria-hidden="true">
          <circle cx="64" cy="64" r={r} fill="none" stroke="#eef1f4" strokeWidth="12" />
          <circle
            cx="64"
            cy="64"
            r={r}
            fill="none"
            stroke={level.color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${(SAMPLE_SCORE / 100) * circ} ${circ}`}
            transform="rotate(-90 64 64)"
          />
          <text x="64" y="72" textAnchor="middle" fontSize="34" fontWeight="800" fill="#1f2d3d">
            {SAMPLE_SCORE}
          </text>
        </svg>
        <div>
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2"
            style={{ background: level.bg, color: level.color, border: `1px solid ${level.border}` }}
          >
            {es ? level.nameEs : level.nameEn}
          </span>
          <p className="text-sm text-gray-600 leading-relaxed">{es ? level.shortEs : level.shortEn}</p>
        </div>
      </div>

      <div className="space-y-3">
        {ICD_AREAS.map((area) => {
          const value = SAMPLE_AREAS[area.id] ?? 0;
          const color = getICDLevel(value).color;
          return (
            <div key={area.id}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-[#1f2d3d]">{es ? area.nameEs : area.nameEn}</span>
                <span className="text-gray-500">{value}</span>
              </div>
              <div className="h-2 rounded-full bg-[#eef1f4] overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-[11px] text-gray-400 text-center">
        {es ? 'Ejemplo ilustrativo, no corresponde a un sitio real.' : 'Illustrative example, not a real website.'}
      </p>
    </div>
  );
}
