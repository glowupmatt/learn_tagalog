'use client';

import { useState, useEffect } from 'react';

interface FlashCardProps {
  front: string;
  back: string;
  examples?: {
    tagalog: string;
    english: string;
  }[];
  audioUrl?: string;
  onCorrect?: () => void;
  onIncorrect?: () => void;
  showButtons?: boolean;
}

export default function FlashCard({ 
  front, 
  back, 
  examples = [], 
  audioUrl, 
  onCorrect, 
  onIncorrect,
  showButtons = true 
}: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip state when card content changes
  useEffect(() => {
    setIsFlipped(false);
  }, [front, back]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch(error => console.log('Audio play failed:', error));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Card Container */}
      <div 
        className={`relative w-full h-80 cursor-pointer transition-transform duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={handleFlip}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of Card */}
        <div 
          className={`absolute inset-0 w-full h-full backface-hidden ${
            isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-2xl border border-blue-500 flex flex-col justify-center items-center p-6 text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">{front}</h2>
              <p className="text-blue-200 text-sm">Click to reveal</p>
              {audioUrl && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playAudio();
                  }}
                  className="mt-4 bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-full transition-colors"
                  aria-label="Play pronunciation"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.824L4.414 13.5A2 2 0 003 13.5V6.5a2 2 0 011.414-1.914l3.969-2.5a1 1 0 011.617-.824zm4.343 1.673a1 1 0 011.414 0c1.172 1.172 1.859 2.786 1.859 4.45s-.687 3.278-1.859 4.451a1 1 0 01-1.414-1.414c.84-.84 1.273-2.023 1.273-3.037s-.433-2.197-1.273-3.037a1 1 0 010-1.414zm-2.121 2.121a1 1 0 011.414 0c.347.347.527.819.527 1.313s-.18.966-.527 1.314a1 1 0 01-1.414-1.414.12.12 0 00.025-.055.12.12 0 000-.11.12.12 0 00-.025-.055 1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div 
          className={`absolute inset-0 w-full h-full backface-hidden transform rotate-y-180 ${
            isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-green-600 to-green-800 rounded-xl shadow-2xl border border-green-500 flex flex-col justify-center items-center p-6 text-white">
            <div className="text-center flex-1 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">{back}</h2>
              
              {examples.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-green-200 text-sm font-medium">Examples:</p>
                  {examples.slice(0, 2).map((example, index) => (
                    <div key={index} className="text-sm text-green-100">
                      <p className="font-medium">{example.tagalog}</p>
                      <p className="text-green-200 italic">{example.english}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {showButtons && (onCorrect || onIncorrect) && (
              <div className="flex space-x-4 mt-4">
                {onIncorrect && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onIncorrect();
                    }}
                    className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>Hard</span>
                  </button>
                )}
                
                {onCorrect && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCorrect();
                    }}
                    className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Easy</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Flip Hint */}
      <p className="text-center text-gray-400 text-sm mt-4">
        {isFlipped ? 'Click to go back' : 'Click to flip card'}
      </p>
    </div>
  );
}