export interface QuizOption {
  text: { es: string; en: string };
  points: number;
}

export interface QuizQuestionData {
  id: string;
  question: { es: string; en: string };
  options: QuizOption[];
}

export const quizQuestions: QuizQuestionData[] = [
  {
    id: 'q1',
    question: {
      es: '¿Existen políticas escritas sobre manejo de información y datos personales?',
      en: 'Are there written policies on information management and personal data?',
    },
    options: [
      { text: { es: 'Sí, están documentadas y el equipo las conoce.', en: 'Yes, they are documented and the team knows them.' }, points: 3 },
      { text: { es: 'Hay lineamientos, pero no formalizados.', en: 'There are guidelines, but not formalized.' }, points: 2 },
      { text: { es: 'No tenemos políticas claras.', en: 'We don\'t have clear policies.' }, points: 0 },
    ],
  },
  {
    id: 'q2',
    question: {
      es: '¿Controlas quién accede a la información sensible?',
      en: 'Do you control who accesses sensitive information?',
    },
    options: [
      { text: { es: 'Sí, hay control y registro de accesos.', en: 'Yes, there is access control and logging.' }, points: 3 },
      { text: { es: 'Parcialmente, depende del área.', en: 'Partially, it depends on the department.' }, points: 2 },
      { text: { es: 'No existe control formal.', en: 'There is no formal control.' }, points: 0 },
    ],
  },
  {
    id: 'q3',
    question: {
      es: '¿Si ocurre un incidente de seguridad, tienes un protocolo de respuesta?',
      en: 'If a security incident occurs, do you have a response protocol?',
    },
    options: [
      { text: { es: 'Sí, existe procedimiento documentado.', en: 'Yes, there is a documented procedure.' }, points: 3 },
      { text: { es: 'Sabemos qué hacer, pero no está escrito.', en: 'We know what to do, but it\'s not written down.' }, points: 2 },
      { text: { es: 'No tenemos protocolo.', en: 'We don\'t have a protocol.' }, points: 0 },
    ],
  },
  {
    id: 'q4',
    question: {
      es: '¿Puedes demostrar ante una auditoría cómo proteges la información?',
      en: 'Can you demonstrate to an auditor how you protect information?',
    },
    options: [
      { text: { es: 'Sí, tenemos evidencias y documentación.', en: 'Yes, we have evidence and documentation.' }, points: 3 },
      { text: { es: 'Podríamos explicarlo, pero no demostrarlo formalmente.', en: 'We could explain it, but not formally demonstrate it.' }, points: 2 },
      { text: { es: 'No tenemos documentación de respaldo.', en: 'We don\'t have supporting documentation.' }, points: 0 },
    ],
  },
  {
    id: 'q5',
    question: {
      es: '¿Tu empresa tiene identificados y documentados sus riesgos de seguridad?',
      en: 'Does your company have its security risks identified and documented?',
    },
    options: [
      { text: { es: 'Sí, contamos con una matriz de riesgos actualizada.', en: 'Yes, we have an updated risk matrix.' }, points: 3 },
      { text: { es: 'Tenemos identificados algunos riesgos, pero no formalizados.', en: 'We have some risks identified, but not formalized.' }, points: 2 },
      { text: { es: 'Nunca hemos hecho una evaluación estructurada.', en: 'We have never done a structured assessment.' }, points: 0 },
    ],
  },
];

export function calculateLevel(score: number): 'green' | 'yellow' | 'red' {
  if (score >= 10) return 'green';
  if (score >= 8) return 'yellow';
  return 'red';
}

export function calculateScore(answers: Record<string, number>): number {
  let total = 0;
  for (const q of quizQuestions) {
    const optionIndex = answers[q.id];
    if (optionIndex !== undefined && q.options[optionIndex]) {
      total += q.options[optionIndex].points;
    }
  }
  return total;
}
