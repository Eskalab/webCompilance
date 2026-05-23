import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import QuizResultClient from './client';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function QuizResultPage({ params }: Props) {
  const { id } = await params;

  const quizResponse = await prisma.quizResponse.findUnique({
    where: { id },
  });

  if (!quizResponse) {
    notFound();
  }

  return (
    <QuizResultClient
      score={quizResponse.score}
      level={quizResponse.level as 'green' | 'yellow' | 'red'}
    />
  );
}
