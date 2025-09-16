'use client';

import { useState } from 'react';
import { VerbConjugation } from '@/types';
import { playAudio } from '@/lib/audio';
import { SimpleCardManager } from '@/lib/spaced-repetition';

interface VerbCardProps {
  verb: VerbConjugation;
  mode?: 'study' | 'practice' | 'quiz';
  category?: string;
}

type TenseType = 'past' | 'present' | 'future' | 'command';

export default function VerbCard({ verb, mode = 'study', category }: VerbCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [practiceMode, setPracticeMode] = useState<'conjugation' | 'translation' | 'tense'>('conjugation');
  const [selectedTense, setSelectedTense] = useState<TenseType>('present');
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);

  const cardId = `verb-${verb.id}`;


  const handlePlayAudio = async (tense: TenseType) => {
    const audioUrl = verb.audioUrls?.[tense];
    if (!audioUrl) {
      console.log(`Playing audio for: ${verb.conjugations[tense]}`);
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
      case 'conjugation':
        const expectedConjugation = verb.conjugations[selectedTense];
        correct = userAnswer.toLowerCase().trim() === expectedConjugation.toLowerCase().trim();
        break;
      case 'translation':
        correct = userAnswer.toLowerCase().includes(verb.meaning.toLowerCase().split('/')[0].trim());
        break;
      case 'tense':
        // User needs to identify the tense of a given conjugated form
        const conjugations = Object.entries(verb.conjugations);
        const randomConjugation = conjugations[Math.floor(Math.random() * conjugations.length)];
        correct = userAnswer.toLowerCase().trim() === randomConjugation[0];
        break;
    }
    
    setIsCorrect(correct);
    setShowAnswer(true);
    
    // Mark card as studied
    SimpleCardManager.markCardAsStudied(cardId, 'verbs');
  };

  const resetPractice = () => {
    setUserAnswer('');
    setIsCorrect(null);
    setShowAnswer(false);
    // Cycle through practice modes
    const modes: ('conjugation' | 'translation' | 'tense')[] = ['conjugation', 'translation', 'tense'];
    const currentIndex = modes.indexOf(practiceMode);
    setPracticeMode(modes[(currentIndex + 1) % modes.length]);
    
    // Random tense for next practice
    const tenses: TenseType[] = ['past', 'present', 'future', 'command'];
    setSelectedTense(tenses[Math.floor(Math.random() * tenses.length)]);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'education':
        return {
          border: 'border-blue-400',
          text: 'text-blue-400', 
          bg: 'bg-blue-900',
          button: 'bg-blue-600 hover:bg-blue-500'
        };
      case 'daily_activities':
        return {
          border: 'border-green-400',
          text: 'text-green-400',
          bg: 'bg-green-900', 
          button: 'bg-green-600 hover:bg-green-500'
        };
      case 'work':
      case 'actions':
        return {
          border: 'border-purple-400',
          text: 'text-purple-400',
          bg: 'bg-purple-900',
          button: 'bg-purple-600 hover:bg-purple-500'
        };
      default:
        return {
          border: 'border-gray-400',
          text: 'text-gray-400',
          bg: 'bg-gray-900',
          button: 'bg-gray-600 hover:bg-gray-500'
        };
    }
  };

  const colorClasses = getCategoryColor(category || verb.category);

  // Practice Mode
  if (mode === 'practice') {
    return (
      <div className={`bg-gray-700 rounded-lg shadow-xl p-6 border-l-4 ${colorClasses.border} border border-gray-600`}>
        {/* Practice Mode Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`${colorClasses.bg} rounded-full p-2 border ${colorClasses.border}`}>
              <svg className={`w-5 h-5 ${colorClasses.text}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${colorClasses.text}`}>Verb Practice</h3>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span>Attempt {attempts + 1}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setPracticeMode('conjugation')}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                practiceMode === 'conjugation' ? `${colorClasses.button} text-white` : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              Conjugation
            </button>
            <button
              onClick={() => setPracticeMode('translation')}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                practiceMode === 'translation' ? `${colorClasses.button} text-white` : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              Translation
            </button>
            <button
              onClick={() => setPracticeMode('tense')}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                practiceMode === 'tense' ? `${colorClasses.button} text-white` : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              Tense ID
            </button>
          </div>
        </div>

        {/* Practice Content */}
        <div className="mb-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${colorClasses.text} mb-4`}>
              {verb.infinitive}
            </div>
            <div className="text-lg text-gray-300 mb-4">
              &ldquo;{verb.meaning}&rdquo;
            </div>
            
            {practiceMode === 'conjugation' && (
              <div>
                <p className="text-gray-300 mb-4">
                  Conjugate to <span className={`font-bold ${colorClasses.text}`}>{selectedTense}</span> tense:
                </p>
                <div className="flex justify-center space-x-2 mb-4">
                  {(['past', 'present', 'future', 'command'] as TenseType[]).map((tense) => (
                    <button
                      key={tense}
                      onClick={() => setSelectedTense(tense)}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        selectedTense === tense ? `${colorClasses.button} text-white` : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                      }`}
                    >
                      {tense}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {practiceMode === 'translation' && (
              <p className="text-gray-300 mb-4">What does this verb mean in English?</p>
            )}

            {practiceMode === 'tense' && (
              <div>
                <p className="text-gray-300 mb-4">What tense is this conjugation?</p>
                <div className={`text-2xl font-bold ${colorClasses.text} mb-4`}>
                  {verb.conjugations[selectedTense]}
                </div>
              </div>
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
                  <span className="font-medium text-green-300">Perfect! 🎉</span>
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
                practiceMode === 'conjugation' ? verb.conjugations[selectedTense] :
                practiceMode === 'translation' ? verb.meaning :
                selectedTense
              }
            </div>
            {practiceMode === 'conjugation' && (
              <div className="text-sm text-gray-300 mb-3">
                <strong>Example:</strong> {verb.examples[selectedTense]}
              </div>
            )}
            <button
              onClick={resetPractice}
              className={`w-full ${colorClasses.button} text-white py-2 rounded-lg transition-colors`}
            >
              Next Practice ({practiceMode === 'tense' ? 'conjugation' : practiceMode === 'conjugation' ? 'translation' : 'tense'})
            </button>
          </div>
        )}

        {/* Audio Button */}
        <button
          onClick={() => handlePlayAudio(selectedTense)}
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
      className="relative h-80 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className={`absolute inset-0 w-full h-full transition-transform duration-600 preserve-3d ${
        isFlipped ? 'rotate-y-180' : ''
      }`}>
        {/* Front of Card */}
        <div className={`absolute inset-0 w-full h-full backface-hidden bg-gray-700 rounded-lg shadow-xl p-6 border-l-4 ${colorClasses.border} border border-gray-600`}>
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className={`text-4xl font-bold ${colorClasses.text} mb-4`}>
              {verb.infinitive}
            </div>
            <div className="text-xl text-gray-300 mb-4">
              &ldquo;{verb.meaning}&rdquo;
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses.bg} ${colorClasses.text} border ${colorClasses.border}`}>
              {category}
            </div>
            <div className="mt-4 text-xs text-gray-400">
              Click to see conjugations 🔄
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gray-600 rounded-lg shadow-xl p-6 border-l-4 ${colorClasses.border} border border-gray-500`}>
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className={`text-2xl font-bold ${colorClasses.text} mb-4`}>
              Conjugations
            </div>
            <div className="space-y-2 mb-4 w-full">
              {(['past', 'present', 'future', 'command'] as TenseType[]).map((tense) => (
                <div key={tense} className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm capitalize">{tense}:</span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-lg font-medium ${colorClasses.text}`}>
                      {verb.conjugations[tense]}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayAudio(tense);
                      }}
                      disabled={isPlaying}
                      className="p-1 bg-gray-500 text-gray-300 rounded hover:bg-gray-400 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {verb.notes && (
              <div className="text-xs text-gray-400 max-h-16 overflow-y-auto">
                {verb.notes}
              </div>
            )}
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