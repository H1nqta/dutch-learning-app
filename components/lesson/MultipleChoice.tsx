'use client';

import { Word } from '@/lib/dummy-data';
import { SpeakerWaveIcon } from '@heroicons/react/24/solid';
import { useAudio } from '@/hooks/useAudio';

type Props = {
  questionWord: Word;
  options: Word[];
  onAnswer: (selectedId: number) => void;
  status: 'answering' | 'feedback';
  selectedId: number | null;
};

export default function MultipleChoice({ questionWord, options, onAnswer, status, selectedId }: Props) {
  const { playAudio } = useAudio();

  const handlePlaySound = () => {
    playAudio(questionWord.dutch, 'nl-NL');
  };

  const getButtonClass = (option: Word) => {
    if (status === 'answering') {
      return 'bg-white hover:bg-gray-100 border-gray-200';
    }

    const isCorrectAnswer = option.id === questionWord.id;
    const isSelectedAnswer = option.id === selectedId;

    if (isCorrectAnswer) {
      return 'bg-green-100 border-green-500 text-green-700'; // 正解は常に緑
    }
    
    if (isSelectedAnswer) {
      return 'bg-red-100 border-red-500 text-red-700'; // 選択した不正解は赤
    }
    
    return 'bg-gray-100 border-gray-200 text-gray-400 opacity-50'; // それ以外はフェードアウト
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 animate-fade-in w-full">
      <p className="text-center text-lg text-gray-600 mb-2">「{questionWord.japanese}」はどれ？</p>
      <div className="flex justify-center mb-6">
         <button 
           onClick={handlePlaySound}
           className="text-dutch-orange hover:text-orange-500 transition-colors"
         >
            <SpeakerWaveIcon className="h-8 w-8" />
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswer(option.id)}
            disabled={status !== 'answering'}
            className={`w-full p-4 rounded-lg border-2 text-center text-lg font-semibold transition-all duration-300 ${getButtonClass(option)}`}
          >
            {option.dutch}
          </button>
        ))}
      </div>
    </div>
  );
}
