'use client';

import { playAudio } from '@/lib/audio';
import { useState } from 'react';
import { SimpleCardManager } from '@/lib/spaced-repetition';

interface Particle {
  form: string;
  meaning: string;
  usage: string;
}

interface ParticleCardProps {
  particle: Particle;
  familyName: string;
  familyColor: string;
  audioUrl?: string;
  mode?: 'study' | 'practice' | 'quiz';
}

export default function ParticleCard({ particle, familyName, familyColor, audioUrl, mode = 'study' }: ParticleCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [practiceMode, setPracticeMode] = useState<'meaning' | 'usage' | 'family'>('meaning');
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);

  const cardId = `particle-${particle.form.toLowerCase()}`;


  const handlePlayAudio = async () => {
    if (!audioUrl) {
      // Simulate audio playback
      console.log(`Playing audio for particle: ${particle.form}`);
    }
    
    setIsPlaying(true);
    try {
      if (audioUrl) {
        await playAudio(audioUrl);
      } else {
        await new Promise(resolve => setTimeout(resolve, 800));
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
      case 'meaning':
        correct = userAnswer.toLowerCase().trim().includes(particle.meaning.toLowerCase().split('/')[0].trim());
        break;
      case 'usage':
        correct = userAnswer.toLowerCase().includes('focus') || userAnswer.toLowerCase().includes('possessive') || userAnswer.toLowerCase().includes('location');
        break;
      case 'family':
        correct = userAnswer.toLowerCase().includes(familyName.toLowerCase().split(' ')[0]);
        break;
    }
    
    setIsCorrect(correct);
    setShowAnswer(true);
    
    // Mark card as studied
    SimpleCardManager.markCardAsStudied(cardId, 'particles');
  };

  const resetPractice = () => {
    setUserAnswer('');
    setIsCorrect(null);
    setShowAnswer(false);
    // Cycle through practice modes
    const modes: ('meaning' | 'usage' | 'family')[] = ['meaning', 'usage', 'family'];
    const currentIndex = modes.indexOf(practiceMode);
    setPracticeMode(modes[(currentIndex + 1) % modes.length]);
  };

  const getFamilyColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          border: 'border-blue-400',
          text: 'text-blue-400',
          bg: 'bg-blue-900',
          button: 'bg-blue-600 hover:bg-blue-500'
        };
      case 'green':
        return {
          border: 'border-green-400',
          text: 'text-green-400',
          bg: 'bg-green-900',
          button: 'bg-green-600 hover:bg-green-500'
        };
      case 'purple':
        return {
          border: 'border-purple-400',
          text: 'text-purple-400',
          bg: 'bg-purple-900',
          button: 'bg-purple-600 hover:bg-purple-500'
        };
      default:
        return {
          border: 'border-blue-400',
          text: 'text-blue-400',
          bg: 'bg-blue-900',
          button: 'bg-blue-600 hover:bg-blue-500'
        };
    }
  };

  const colorClasses = getFamilyColorClasses(familyColor);

  // Practice Mode
  if (mode === 'practice') {
    return (
      <div className={`bg-gray-700 rounded-lg shadow-xl p-6 border-l-4 ${colorClasses.border} border border-gray-600`}>
        {/* Practice Mode Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`${colorClasses.bg} rounded-full p-2 border ${colorClasses.border}`}>
              <svg className={`w-5 h-5 ${colorClasses.text}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${colorClasses.text}`}>Practice Mode</h3>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span>Attempt {attempts + 1}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setPracticeMode('meaning')}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                practiceMode === 'meaning' ? `${colorClasses.button} text-white` : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              Meaning
            </button>
            <button
              onClick={() => setPracticeMode('usage')}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                practiceMode === 'usage' ? `${colorClasses.button} text-white` : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              Usage
            </button>
            <button
              onClick={() => setPracticeMode('family')}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                practiceMode === 'family' ? `${colorClasses.button} text-white` : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              Family
            </button>
          </div>
        </div>

        {/* Practice Content */}
        <div className="mb-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${colorClasses.text} mb-4`}>
              {particle.form}
            </div>
            
            {practiceMode === 'meaning' && (
              <p className="text-gray-300 mb-4">What does this particle mean?</p>
            )}
            
            {practiceMode === 'usage' && (
              <p className="text-gray-300 mb-4">What is this particle used for?</p>
            )}

            {practiceMode === 'family' && (
              <p className="text-gray-300 mb-4">Which family does this particle belong to?</p>
            )}
          </div>
        </div>


        {/* Input Area */}
        {!showAnswer && (
          <div className="mb-4">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Your answer..."
              className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg"
              onKeyPress={(e) => e.key === 'Enter' && handlePracticeSubmit()}
            />
            <button
              onClick={handlePracticeSubmit}
              disabled={!userAnswer.trim()}
              className={`w-full mt-3 py-2 rounded-lg font-medium transition-colors ${
                userAnswer.trim()
                  ? `${colorClasses.button} text-white`
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
            isCorrect ? 'bg-green-900 border-green-400' : 'bg-orange-900 border-orange-400'
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
                  <svg className="w-5 h-5 text-orange-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-orange-300">Good try!</span>
                </>
              )}
            </div>
            <div className="text-sm text-gray-300 mb-3">
              <strong>Answer:</strong> {
                practiceMode === 'meaning' ? particle.meaning :
                practiceMode === 'usage' ? particle.usage :
                familyName
              }
            </div>
            <button
              onClick={resetPractice}
              className={`w-full ${colorClasses.button} text-white py-2 rounded-lg transition-colors`}
            >
              Next Practice ({practiceMode === 'family' ? 'meaning' : practiceMode === 'meaning' ? 'usage' : 'family'})
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
              : `${colorClasses.button} text-white shadow-lg`
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
        <div className={`absolute inset-0 w-full h-full backface-hidden bg-gray-700 rounded-lg shadow-xl p-6 border-l-4 ${colorClasses.border} border border-gray-600`}>
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className={`text-4xl font-bold ${colorClasses.text} mb-4`}>
              {particle.form}
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses.bg} ${colorClasses.text} border ${colorClasses.border}`}>
              {familyName}
            </div>
            <div className="mt-4 text-xs text-gray-400">
              Click to flip 🔄
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gray-600 rounded-lg shadow-xl p-6 border-l-4 ${colorClasses.border} border border-gray-500`}>
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className={`text-2xl font-bold ${colorClasses.text} mb-4`}>
              &ldquo;{particle.meaning}&rdquo;
            </div>
            <div className="text-sm text-gray-300 mb-4 max-h-24 overflow-y-auto">
              {particle.usage}
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
                  : `${colorClasses.button} text-white`
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