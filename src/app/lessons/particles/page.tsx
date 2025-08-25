import { particleFamilies, particleExamples, particleLearningTips } from '@/data/particles';
import ParticleFamily from '@/components/particles/ParticleFamily';
import ParticleIdentification from '@/components/particles/ParticleIdentification';
import SentenceConstruction from '@/components/particles/SentenceConstruction';
import Link from 'next/link';

export default function ParticlesLessonPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">
              🎯 Part 2: Essential Particles System
            </h1>
            <p className="text-blue-100 mb-6 text-lg">
              Master the ANG, NG, and SA particle families - the foundation of Tagalog sentence structure. 
              These particles determine focus, possession, and direction in every Tagalog sentence.
            </p>
            <div className="flex items-center space-x-6 text-blue-100">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>25 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span>3 families, 33 particles</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-green-600 text-white text-sm font-medium">
                Beginner
              </div>
            </div>
          </div>
          <Link
            href="/lessons"
            className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg hover:bg-opacity-30 transition-colors"
          >
            ← Back to Lessons
          </Link>
        </div>
      </div>

      {/* Learning Objectives */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">
          🎯 What You&apos;ll Learn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-900 rounded-full p-2">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-200 mb-1">ANG Family</h3>
              <p className="text-sm text-gray-400">Focus particles that highlight the main subject</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-green-900 rounded-full p-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-200 mb-1">NG Family</h3>
              <p className="text-sm text-gray-400">Possession and non-focus markers</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-purple-900 rounded-full p-2">
              <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-200 mb-1">SA Family</h3>
              <p className="text-sm text-gray-400">Location and direction indicators</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Tips */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-6 shadow-xl border border-gray-600">
        <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Essential Learning Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {particleLearningTips.map((tip, index) => (
            <div
              key={index}
              className="bg-gray-600 rounded-lg p-4 border-l-4 border-yellow-400"
            >
              <h4 className="font-medium text-gray-100 mb-2">
                💡 {tip.tip}
              </h4>
              <p className="text-gray-300 text-sm">
                {tip.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Particle Families */}
      <div>
        <h2 className="text-2xl font-bold text-gray-100 mb-6">
          📚 The Three Particle Families
        </h2>
        <div className="space-y-8">
          <ParticleFamily family={particleFamilies[0]} color="blue" />
          <ParticleFamily family={particleFamilies[1]} color="green" />
          <ParticleFamily family={particleFamilies[2]} color="purple" />
        </div>
      </div>

      {/* Example Sentences */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
        <h2 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
          </svg>
          Example Sentences
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {particleExamples.map((example, index) => {
            const colors = index === 0 ? 'blue' : index === 1 ? 'green' : 'purple';
            const colorClasses = colors === 'blue' ? 'border-blue-400 bg-blue-900' : 
                               colors === 'green' ? 'border-green-400 bg-green-900' : 
                               'border-purple-400 bg-purple-900';
            
            return (
              <div key={index} className={`border-l-4 ${colorClasses} bg-opacity-20 p-4 rounded-lg`}>
                <h3 className={`font-semibold text-${colors}-400 mb-3`}>{example.family}</h3>
                <div className="space-y-3">
                  {example.sentences.map((sentence, sentenceIndex) => (
                    <div key={sentenceIndex} className="bg-gray-700 rounded p-3">
                      <p className="text-gray-100 font-medium mb-1">{sentence.tagalog}</p>
                      <p className="text-gray-300 text-sm mb-2">{sentence.english}</p>
                      <p className="text-gray-400 text-xs">{sentence.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Practice Exercises */}
      <div>
        <h2 className="text-2xl font-bold text-gray-100 mb-6">
          🎮 Practice Exercises
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-200 mb-4">
              Particle Identification
            </h3>
            <ParticleIdentification />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-200 mb-4">
              Sentence Construction
            </h3>
            <SentenceConstruction />
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-lg p-6 border border-green-700 shadow-xl">
        <h3 className="text-xl font-semibold text-green-200 mb-4">
          🎉 Great Work! What&apos;s Next?
        </h3>
        <p className="text-green-100 mb-6">
          You&apos;ve learned the essential particle system! These are the building blocks for all Tagalog sentences.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/practice"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-500 transition-colors shadow-lg"
          >
            Continue Practicing
          </Link>
          <Link
            href="/lessons"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors shadow-lg"
          >
            View All Lessons
          </Link>
          <Link
            href="/progress"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-500 transition-colors shadow-lg"
          >
            Track Progress
          </Link>
        </div>
      </div>
    </div>
  );
}