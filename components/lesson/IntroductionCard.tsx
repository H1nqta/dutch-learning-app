'use client'; // ★★★ これが最重要ポイントです ★★★

import { Word } from '@/lib/dummy-data';
import { SpeakerWaveIcon } from '@heroicons/react/24/solid';

type Props = {
  word: Word;
};

export default function IntroductionCard({ word }: Props) {
  const handlePlaySound = () => {
    // 将来的にここで音声再生機能を実装します
    alert(`音声再生: ${word.pronunciation}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center animate-fade-in">
      <h2 className="text-4xl md:text-5xl font-bold text-dutch-blue mb-4">{word.dutch}</h2>
      <p className="text-lg text-gray-600 mb-6">{word.japanese}</p>
      
      <button 
        onClick={handlePlaySound}
        className="mb-6 inline-flex items-center gap-2 text-dutch-orange hover:text-orange-500 transition-colors"
      >
        <SpeakerWaveIcon className="h-8 w-8" />
        <span className="text-xl font-semibold">発音を聞く</span>
      </button>

      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-gray-700 italic">"{word.exampleSentence}"</p>
      </div>
    </div>
  );
}
