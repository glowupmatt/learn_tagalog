'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { WordComponent } from '@/data/sentence-building';

interface AudioPlayerProps {
  words: WordComponent[];
  className?: string;
  autoPlay?: boolean;
  showVisualFeedback?: boolean;
}

export default function AudioPlayer({ 
  words, 
  className = '',
  autoPlay = false,
  showVisualFeedback = true
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Generate TTS URL for a sentence
  const generateTTSUrl = (text: string, lang: string = 'tl') => {
    // Using Web Speech API or a placeholder for demonstration
    // In a real app, you might use Google TTS, Azure Speech, or similar
    const encodedText = encodeURIComponent(text);
    return `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodedText}`;
  };

  const playSentence = useCallback(async () => {
    if (words.length === 0) return;
    
    setIsPlaying(true);
    setCurrentWordIndex(-1);

    try {
      // Create sentence text
      const sentenceText = words.map(word => word.tagalog).join(' ');
      
      // For demonstration, we'll use a synthetic speech approach
      // In production, you'd want pre-recorded audio files
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(sentenceText);
        utterance.lang = 'tl-PH'; // Filipino/Tagalog
        utterance.rate = playbackRate;
        
        utterance.onstart = () => {
          setCurrentWordIndex(0);
        };
        
        utterance.onend = () => {
          setIsPlaying(false);
          setCurrentWordIndex(-1);
        };
        
        utterance.onerror = () => {
          setIsPlaying(false);
          setCurrentWordIndex(-1);
        };

        // Highlight words during playback (approximation)
        if (showVisualFeedback) {
          const avgWordDuration = (utterance.text.length / words.length) * (100 / playbackRate);
          words.forEach((_, index) => {
            const timeout = setTimeout(() => {
              setCurrentWordIndex(index);
            }, index * avgWordDuration);
            
            // Store timeout for cleanup
            if (index === 0) {
              timeoutRef.current = timeout;
            }
          });
        }

        speechSynthesis.speak(utterance);
      } else {
        // Fallback: Try to use HTML5 audio with TTS URL
        const audio = new Audio(generateTTSUrl(sentenceText));
        audioRef.current = audio;
        
        audio.onplay = () => setCurrentWordIndex(0);
        audio.onended = () => {
          setIsPlaying(false);
          setCurrentWordIndex(-1);
        };
        audio.onerror = () => {
          setIsPlaying(false);
          setCurrentWordIndex(-1);
          console.warn('Audio playback failed, speech synthesis not available');
        };

        await audio.play();
      }
    } catch (error) {
      console.error('Failed to play audio:', error);
      setIsPlaying(false);
      setCurrentWordIndex(-1);
    }
  }, [words, playbackRate, showVisualFeedback]);

  const stopPlayback = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsPlaying(false);
    setCurrentWordIndex(-1);
  };

  const playWordByWord = async () => {
    if (words.length === 0) return;
    
    setIsPlaying(true);

    for (let i = 0; i < words.length; i++) {
      setCurrentWordIndex(i);
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(words[i].tagalog);
        utterance.lang = 'tl-PH';
        utterance.rate = playbackRate;
        
        await new Promise<void>((resolve) => {
          utterance.onend = () => resolve();
          utterance.onerror = () => resolve();
          speechSynthesis.speak(utterance);
        });
        
        // Pause between words
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      if (!isPlaying) break; // Allow stopping mid-playback
    }

    setIsPlaying(false);
    setCurrentWordIndex(-1);
  };

  // Auto-play on mount if enabled
  useEffect(() => {
    if (autoPlay && words.length > 0) {
      const timer = setTimeout(playSentence, 500);
      return () => clearTimeout(timer);
    }
  }, [words, autoPlay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPlayback();
    };
  }, []);

  const sentenceText = words.map(word => word.tagalog).join(' ');
  const englishTranslation = words.map(word => word.english).join(' ');

  return (
    <div className={`bg-gray-700 rounded-lg p-4 ${className}`}>
      {/* Audio Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={isPlaying ? stopPlayback : playSentence}
            disabled={words.length === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isPlaying
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-600 disabled:cursor-not-allowed'
            }`}
          >
            {isPlaying ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>Stop</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span>Play Sentence</span>
              </>
            )}
          </button>

          <button
            onClick={playWordByWord}
            disabled={words.length === 0 || isPlaying}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <span>Word by Word</span>
          </button>
        </div>

        {/* Playback Speed Control */}
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-300">Speed:</label>
          <select
            value={playbackRate}
            onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
            className="bg-gray-600 text-white text-sm rounded px-2 py-1 border border-gray-500"
          >
            <option value={0.5}>0.5x</option>
            <option value={0.75}>0.75x</option>
            <option value={1}>1x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
          </select>
        </div>
      </div>

      {/* Sentence Display */}
      {words.length > 0 && (
        <div className="space-y-3">
          {/* Tagalog with word highlighting */}
          <div className="text-lg font-medium">
            {words.map((word, index) => (
              <span
                key={`${word.id}-${index}`}
                className={`mr-2 px-1 rounded transition-colors ${
                  showVisualFeedback && currentWordIndex === index
                    ? 'bg-blue-500 text-white'
                    : currentWordIndex > index
                    ? 'bg-green-500 bg-opacity-30'
                    : 'text-gray-200'
                }`}
              >
                {word.tagalog}
              </span>
            ))}
          </div>

          {/* English translation */}
          <div className="text-sm text-gray-400 italic">
            &ldquo;{englishTranslation}&rdquo;
          </div>

          {/* Playback indicator */}
          {isPlaying && (
            <div className="flex items-center space-x-2 text-sm text-blue-400">
              <div className="animate-pulse w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Playing audio...</span>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {words.length === 0 && (
        <div className="text-center text-gray-400 py-4">
          <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5 15V9a1 1 0 011-1h1l2-2h2a1 1 0 011 1v8a1 1 0 01-1 1H9l-2 2H6a1 1 0 01-1-1z" />
          </svg>
          <p>Build a sentence to hear pronunciation</p>
        </div>
      )}
    </div>
  );
}