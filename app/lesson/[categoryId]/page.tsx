'use client';

import { dummyLessons, Word } from '@/lib/dummy-data';
import { notFound, useParams } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';

import MultipleChoice from '@/components/lesson/MultipleChoice';
import ListeningInput from '@/components/lesson/ListeningInput';
import QuizFooter from '@/components/lesson/QuizFooter';
import LessonComplete from '@/components/lesson/LessonComplete';
import ProgressBar from '@/components/lesson/ProgressBar';

// 配列をシャッフルするヘルパー関数
const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

type LessonStep = 'multipleChoice' | 'listeningInput';

export default function LessonPage() {
  const params = useParams();
  const categoryId = params.categoryId as string;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [step, setStep] = useState<LessonStep>('multipleChoice');
  const [status, setStatus] = useState<'answering' | 'feedback'>('answering');
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [mcOptions, setMcOptions] = useState<Word[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const lesson = useMemo(() => {
    return dummyLessons.find(l => l.id === categoryId);
  }, [categoryId]);

  if (!lesson) {
    notFound();
  }

  const isLessonComplete = questionIndex >= lesson.words.length;
  const currentWord = lesson.words[questionIndex];

  // 4択問題の選択肢を生成
  useEffect(() => {
    if (currentWord) {
      const incorrectOptions = lesson.words.filter(w => w.id !== currentWord.id);
      const shuffledIncorrect = shuffleArray(incorrectOptions).slice(0, 3);
      setMcOptions(shuffleArray([currentWord, ...shuffledIncorrect]));
    }
  }, [currentWord, lesson.words]);

  const handleMcAnswer = (answerId: number) => {
    const isCorrect = answerId === currentWord.id;
    setStatus('feedback');
    setLastAnswerCorrect(isCorrect);
    setSelectedId(answerId);
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleLiAnswer = (isCorrect: boolean) => {
    setStatus('feedback');
    setLastAnswerCorrect(isCorrect);
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleContinue = () => {
    setStatus('answering');
    setLastAnswerCorrect(null);
    setSelectedId(null);

    // 4択問題の後はリスニング問題へ
    if (step === 'multipleChoice') {
      setStep('listeningInput');
    } else {
      // リスニング問題の後は次の単語の4択問題へ
      setStep('multipleChoice');
      setQuestionIndex(prev => prev + 1);
    }
  };

  if (isLessonComplete) {
    return <LessonComplete totalQuestions={lesson.words.length * 2} correctAnswers={correctCount} />;
  }

  if (!currentWord) {
    return null; // データ読み込み中の安全対策
  }

  return (
    <div className="flex flex-col h-screen max-h-screen p-4 md:p-8">
      <ProgressBar
        current={questionIndex * 2 + (step === 'multipleChoice' ? 0 : 1)}
        total={lesson.words.length * 2}
      />
      <div className="flex-grow flex items-center justify-center">
        {step === 'multipleChoice' && mcOptions.length > 0 && (
          <MultipleChoice 
            key={`${questionIndex}-mc`}
            questionWord={currentWord}
            options={mcOptions}
            onAnswer={handleMcAnswer}
            status={status}
            selectedId={selectedId}
          />
        )}
        {step === 'listeningInput' && (
          <ListeningInput
            key={`${questionIndex}-li`}
            questionWord={currentWord}
            onCheck={handleLiAnswer}
            status={status}
          />
        )}
      </div>
      {status === 'feedback' && (
        <QuizFooter 
          status={lastAnswerCorrect ? 'correct' : 'incorrect'}
          correctAnswer={currentWord.dutch}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
}
