'use client';

type Props = {
  status: 'answering' | 'correct' | 'incorrect';
  correctAnswer: string;
  onContinue: () => void;
};

export default function QuizFooter({ status, correctAnswer, onContinue }: Props) {
  // 「回答中」は何も表示しない（スペース確保は親コンポーネント側で行う）
  if (status === 'answering') {
    return null;
  }

  const isCorrect = status === 'correct';
  const bgColor = isCorrect ? 'bg-green-100' : 'bg-red-100';
  const textColor = isCorrect ? 'text-green-600' : 'text-red-600';
  const buttonColor = isCorrect ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600';

  return (
    // ★修正点: fixedの位置を bottom-16 に変更し、ナビゲーションバーの上に配置
    <div className={`fixed bottom-16 md:bottom-0 left-0 right-0 p-4 md:p-6 ${bgColor} transition-all z-40`}>
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div>
          <h3 className={`font-bold text-lg ${textColor}`}>
            {isCorrect ? '正解です！' : '不正解'}
          </h3>
          {!isCorrect && (
            <p className="text-gray-700">正解は: <span className="font-bold">{correctAnswer}</span></p>
          )}
        </div>
        <button
          onClick={onContinue}
          className={`text-white font-bold py-3 px-8 rounded-lg transition-colors ${buttonColor}`}
        >
          次へ
        </button>
      </div>
    </div>
  );
}
