import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { calculateScore, calculateLevel } from '@/lib/quiz-data';

const levelEmailConfig = {
  green: {
    LEVEL: 'VERDE',
    LEVEL_COLOR: '#10b981',
    LEVEL_ICON: '✔',
    BOX_BG: '#ecfdf5',
    BOX_BORDER: '#a7f3d0',
    BOX_TEXT_COLOR: '#065f46',
    LEVEL_TITLE: 'Tu empresa tiene bases solidas',
    LEVEL_DESC: 'Ahora el reto es optimizar y fortalecer. Agenda una sesion gratuita para llevar tu seguridad al siguiente nivel.',
  },
  yellow: {
    LEVEL: 'AMARILLO',
    LEVEL_COLOR: '#f59e0b',
    LEVEL_ICON: '⚠',
    BOX_BG: '#fffbeb',
    BOX_BORDER: '#fde68a',
    BOX_TEXT_COLOR: '#92400e',
    LEVEL_TITLE: 'Tienes avances, pero hay riesgos criticos sin atender',
    LEVEL_DESC: 'Tu empresa tiene algunos controles, pero existen brechas importantes. Un experto puede ayudarte a priorizarlas.',
  },
  red: {
    LEVEL: 'ROJA',
    LEVEL_COLOR: '#ef4444',
    LEVEL_ICON: '✘',
    BOX_BG: '#fef2f2',
    BOX_BORDER: '#fecaca',
    BOX_TEXT_COLOR: '#b91c1c',
    LEVEL_TITLE: 'Accion inmediata requerida!',
    LEVEL_DESC: 'Tu nivel de riesgo es muy alto. Tu empresa esta expuesta a sanciones y brechas de seguridad. Habla con un experto ahora.',
  },
};

export async function POST(request: NextRequest) {
  let body: {
    name?: string;
    email?: string;
    company?: string;
    sendResults?: boolean;
    answers?: Record<string, number>;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { name, email, company, sendResults, answers } = body;

  if (!name?.trim()) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
  }
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
  }
  if (!company?.trim()) {
    return NextResponse.json({ error: 'Company is required.' }, { status: 400 });
  }
  if (!answers || typeof answers !== 'object') {
    return NextResponse.json({ error: 'Answers are required.' }, { status: 400 });
  }

  const score = calculateScore(answers);
  const level = calculateLevel(score);

  const quizResponse = await prisma.quizResponse.create({
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company.trim(),
      answers,
      score,
      level,
    },
  });

  // Send to Brevo (best-effort)
  const apiKey = process.env.BREVO_API_KEY;
  if (apiKey) {
    try {
      const res = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          attributes: {
            FIRSTNAME: name.trim(),
            COMPANY: company.trim(),
            QUIZ_SCORE: score,
            QUIZ_LEVEL: level.toUpperCase(),
            SOURCE: 'lcs-quiz',
          },
          listIds: process.env.BREVO_QUIZ_LIST_IDS
            ? JSON.parse(process.env.BREVO_QUIZ_LIST_IDS)
            : process.env.BREVO_LIST_IDS
              ? JSON.parse(process.env.BREVO_LIST_IDS)
              : [2],
          updateEnabled: true,
        }),
      });

      if (!res.ok) {
        const errBody = await res.text();
        console.error('Brevo API error:', res.status, errBody);
      }
    } catch (err) {
      console.error('Brevo send error:', err);
    }
  }

  // Send results email (best-effort)
  const templateId = parseInt(process.env.BREVO_QUIZ_TEMPLATE_ID || '20');
  if (apiKey && sendResults && templateId) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://legalcompliance.tde.com.co';
      const emailConfig = levelEmailConfig[level];
      const waMessage = encodeURIComponent(`Hola, realicé el Test de Ciberseguridad y mi alerta está en ${emailConfig.LEVEL}. Me gustaría agendar una consultoría gratuita.`);

      const emailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          templateId,
          to: [{ email: email.trim().toLowerCase(), name: name.trim() }],
          params: {
            NAME: name.trim(),
            COMPANY: company.trim(),
            SCORE: score,
            ...emailConfig,
            RESULT_URL: `${baseUrl}/quiz/results/${quizResponse.id}`,
            WA_URL: `https://wa.me/573143992911?text=${waMessage}`,
          },
        }),
      });

      if (!emailRes.ok) {
        const errBody = await emailRes.text();
        console.error('Brevo email error:', emailRes.status, errBody);
      }
    } catch (err) {
      console.error('Brevo email send error:', err);
    }
  }

  return NextResponse.json({
    id: quizResponse.id,
    score,
    level,
  });
}
