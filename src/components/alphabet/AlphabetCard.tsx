'use client';

import { Letter } from '@/types';
import { playAudio } from '@/lib/audio';
import { useState } from 'react';
import { SimpleCardManager } from '@/lib/spaced-repetition';

interface AlphabetCardProps {
  letter: Letter;
  showExamples?: boolean;
  mode?: 'study' | 'practice' | 'quiz';
}

export default function AlphabetCard({ letter, mode = 'study' }: AlphabetCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [practiceMode, setPracticeMode] = useState<'letter' | 'pronunciation' | 'examples'>('letter');
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);

  const cardId = `alphabet-${letter.letter.toLowerCase()}`;


  const handlePlayAudio = async () => {
    if (!letter.audioUrl) {
      // For now, we'll simulate audio playback
      console.log(`Playing audio for letter: ${letter.letter}`);
    }
    
    setIsPlaying(true);
    try {
      if (letter.audioUrl) {
        await playAudio(letter.audioUrl);
      } else {
        // Simulate audio playback delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  const handleCardClick = () => {
    if (mode === 'study') {
      setIsFlipped(!isFlipped);
    }
  };

  const handlePracticeSubmit = () => {
    setAttempts(prev => prev + 1);
    let correct = false;
    
    switch (practiceMode) {
      case 'letter':
        correct = userAnswer.toLowerCase().trim() === letter.letter.toLowerCase();
        break;
      case 'pronunciation':
        const cleanedAnswer = userAnswer.toLowerCase().replace(/[\/\s]/g, '');
        const cleanedPronunciation = letter.pronunciation.toLowerCase().replace(/[\/\s]/g, '');
        correct = cleanedAnswer === cleanedPronunciation;
        break;
      case 'examples':
        correct = userAnswer.toLowerCase().trim() === letter.letter.toLowerCase();
        break;
    }
    
    setIsCorrect(correct);
    setShowAnswer(true);
    
    // Mark card as studied
    SimpleCardManager.markCardAsStudied(cardId, 'alphabet');
  };

  const resetPractice = () => {
    setUserAnswer('');
    setIsCorrect(null);
    setShowAnswer(false);
    setPracticeMode(practiceMode === 'letter' ? 'pronunciation' : practiceMode === 'pronunciation' ? 'examples' : 'letter');
  };

  if (mode === 'practice') {
    return (
      <div className="bg-gray-700 rounded-lg shadow-xl p-6 border-l-4 border-green-400 border border-gray-600">
        {/* Practice Mode Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-900 rounded-full p-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-300">Practice Mode</h3>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span>Attempt {attempts + 1}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPracticeMode('letter')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                practiceMode === 'letter' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              Letter
            </button>
            <button
              onClick={() => setPracticeMode('pronunciation')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                practiceMode === 'pronunciation' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              Sound
            </button>
            <button
              onClick={() => setPracticeMode('examples')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                practiceMode === 'examples' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              Examples
            </button>
          </div>
        </div>

        {/* Practice Content */}
        <div className="mb-6">
          {practiceMode === 'letter' && (
            <div className="text-center">
              <p className="text-gray-300 mb-4">What letter makes this sound?</p>
              <div className="text-3xl font-bold text-blue-400 mb-4">/{letter.pronunciation}/</div>
            </div>
          )}
          
          {practiceMode === 'pronunciation' && (
            <div className="text-center">
              <p className="text-gray-300 mb-4">How do you pronounce this letter?</p>
              <div className="text-5xl font-bold text-blue-400 mb-4">{letter.letter}</div>
            </div>
          )}

          {practiceMode === 'examples' && (
            <div className="text-center">
              <p className="text-gray-300 mb-4">Which letter appears in these words?</p>
              <div className="space-y-2 mb-4">
                {letter.examples.slice(0, 2).map((example, index) => (
                  <div key={index} className="text-lg text-blue-400 font-medium">
                    {example}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>


        {/* Input Area */}
        {!showAnswer && (
          <div className="mb-4">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder={practiceMode === 'pronunciation' ? 'e.g., /ah/' : 'Your answer...'}
              className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-lg"
              onKeyPress={(e) => e.key === 'Enter' && handlePracticeSubmit()}
            />
            <button
              onClick={handlePracticeSubmit}
              disabled={!userAnswer.trim()}
              className={`w-full mt-3 py-2 rounded-lg font-medium transition-colors ${
                userAnswer.trim()
                  ? 'bg-green-600 text-white hover:bg-green-500'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              Check Answer
            </button>
          </div>
        )}

        {/* Answer Feedback */}
        {showAnswer && (
          <div className={`p-4 rounded-lg border mb-4 ${
            isCorrect ? 'bg-green-900 border-green-400' : 'bg-red-900 border-red-400'
          }`}>
            <div className="flex items-center mb-2">
              {isCorrect ? (
                <>
                  <svg className="w-5 h-5 text-green-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-green-300">Correct! 🎉</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 text-red-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-red-300">Try again!</span>
                </>
              )}
            </div>
            <div className="text-sm text-gray-300">
              <strong>Answer:</strong> {practiceMode === 'pronunciation' ? `/${letter.pronunciation}/` : letter.letter}
            </div>
            <button
              onClick={resetPractice}
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition-colors"
            >
              {practiceMode === 'examples' ? 'Try Letter Practice' : 'Next Practice'}
            </button>
          </div>
        )}

        {/* Audio Button */}
        <button
          onClick={handlePlayAudio}
          disabled={isPlaying}
          className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg transition-colors ${
            isPlaying 
              ? 'bg-gray-600 text-gray-500' 
              : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg'
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          <span>{isPlaying ? 'Playing...' : 'Listen to Pronunciation'}</span>
        </button>
      </div>
    );
  }

  // Study Mode (Flip Card)
  return (
    <div 
      className="relative h-64 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className={`absolute inset-0 w-full h-full transition-transform duration-600 preserve-3d ${
        isFlipped ? 'rotate-y-180' : ''
      }`}>
        {/* Front of Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-gray-700 rounded-lg shadow-xl p-6 border-l-4 border-blue-400 border border-gray-600">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-6xl font-bold text-blue-400 mb-4">
              {letter.letter}
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              letter.type === 'vowel' 
                ? 'bg-green-900 text-green-300 border border-green-600' 
                : 'bg-blue-900 text-blue-300 border border-blue-600'
            }`}>
              {letter.type}
            </div>
            <div className="mt-4 text-xs text-gray-400">
              Click to flip 🔄
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gray-600 rounded-lg shadow-xl p-6 border-l-4 border-green-400 border border-gray-500">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-2xl font-bold text-green-400 mb-4">
              /{letter.pronunciation}/
            </div>
            <div className="space-y-2 mb-4">
              {letter.examples.slice(0, 3).map((example, index) => (
                <div key={index} className="text-sm text-gray-300">
                  {example}
                </div>
              ))}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePlayAudio();
              }}
              disabled={isPlaying}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isPlaying 
                  ? 'bg-gray-600 text-gray-500' 
                  : 'bg-green-600 text-white hover:bg-green-500'
              }`}
            >
              {isPlaying ? '🔊 Playing...' : '🔊 Listen'}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}