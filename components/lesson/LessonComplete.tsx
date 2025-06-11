'use client';

import Confetti from 'react-confetti';
import Link from 'next/link';
import useWindowSize from 'react-use/lib/useWindowSize';

type Props = {
  correctAnswers: number;
  totalQuestions: number;
};

export default function LessonComplete({ correctAnswers, totalQuestions }: Props) {
  const { width, height } = useWindowSize();
  const score = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <>
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        tweenDuration={10000}
      />
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h1 className="text-4xl font-bold text-green-500 mb-4">レッスン完了！</h1>
        <p className="text-xl text-gray-700 mb-8">素晴らしい！お疲れ様でした。</p>
        
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <p className="text-lg">スコア</p>
          <p className="text-6xl font-bold text-dutch-orange my-2">{score}%</p>
          <p className="text-gray-500">正解数: {correctAnswers} / {totalQuestions}</p>
        </div>

        <Link 
          href="/dashboard"
          className="bg-dutch-orange text-white font-bold py-3 px-12 rounded-full hover:bg-orange-500 transition-colors shadow-lg"
        >
          ダッシュボードに戻る
        </Link>
      </div>
    </>
  );
}
