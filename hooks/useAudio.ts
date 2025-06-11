'use client';

import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

export const useAudio = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isReady, setIsReady] = useState(false);

  // コンポーネントが読み込まれた時に、利用可能な「声」を取得します
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        setIsReady(true);
        // console.log('利用可能な声:', availableVoices); // デバッグ用
      }
    };

    // 声のリストが変更された時（読み込み完了時）に loadVoices を実行
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    // 既に読み込み済の場合のために、一度直接呼び出す
    loadVoices();

    // コンポーネントが不要になった時の後片付け
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);


  const playAudio = useCallback((text: string, lang: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      toast.error('お使いのブラウザは音声再生に対応していません。');
      return;
    }

    // 準備ができていなかったら、ユーザーに通知する
    if (!isReady) {
        toast.error('音声が準備中です。少し待ってからもう一度お試しください。');
        return;
    }

    // もし他の音声が再生中なら、それを停止する
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // 指定された言語（nl-NL）の声を探す
    const voice = voices.find(v => v.lang === lang);
    if (voice) {
      utterance.voice = voice;
    } else {
      console.warn(`"${lang}" の声が見つかりませんでした。デフォルトの声を使用します。`);
    }
    
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    window.speechSynthesis.speak(utterance);

  }, [isReady, voices]); // isReady と voices の状態に依存する

  return { playAudio };
};
