'use client';

import { useState } from 'react';
import { SpeakerWaveIcon } from '@heroicons/react/24/solid';
import { useAudio } from '@/hooks/useAudio';

type Props = {
  questionWord: { dutch: string };
  onCheck: (isCorrect: boolean) => void;
  status: 'answering' | 'feedback';
};

export default function ListeningInput({ questionWord, onCheck, status }: Props) {
  const [inputValue, setInputValue] = useState('');
  const { playAudio } = useAudio();

  const handlePlaySound = () => {
    playAudio(questionWord.dutch, 'nl-NL');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'answering' || !inputValue) return;
    
    // 答え合わせロジック（大文字・小文字を無視し、前後の空白を削除）
    const isCorrect = inputValue.trim().toLowerCase() === questionWord.dutch.toLowerCase();
    onCheck(isCorrect);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 animate-fade-in w-full">
      <p className="text-center text-lg text-gray-600 mb-4">音声を聞いて、入力してください。</p>
      <div className="flex justify-center mb-6">
        <button
          type="button"
          onClick={handlePlaySound}
          className="p-4 bg-dutch-orange text-white rounded-full shadow-lg hover:bg-orange-500 transition-colors"
        >
          <SpeakerWaveIcon className="h-8 w-8" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="オランダ語で入力..."
          className="w-full p-4 rounded-lg border-2 border-gray-300 text-center text-lg focus:outline-none focus:border-dutch-blue transition-colors disabled:bg-gray-100"
          autoFocus
          disabled={status === 'feedback'} // 回答後は入力を無効化
        />
        <button
          type="submit"
          className="w-full mt-4 bg-dutch-blue text-white font-bold py-3 px-8 rounded-lg transition-colors hover:bg-blue-700 disabled:bg-gray-400"
          disabled={status === 'feedback' || !inputValue}
        >
          チェック
        </button>
      </form>
    </div>
  );
}
