import Link from 'next/link';
import AlphabetGrid from '@/components/alphabet/AlphabetGrid';
import PronunciationTips from '@/components/alphabet/PronunciationTips';
import { tagalogAlphabet } from '@/data/alphabet';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-4">
          Welcome to Tagalog Study! 🇵🇭
        </h1>
        <p className="text-blue-100 mb-6 text-lg">
          Master Tagalog particles, verb conjugations, and essential vocabulary through structured, self-paced learning.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/lessons"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-lg"
          >
            Start Learning
          </Link>
          <Link
            href="/practice"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-400 transition-colors shadow-lg"
          >
            Quick Practice
          </Link>
        </div>
      </div>

      {/* Featured Content: Tagalog Alphabet */}
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-2">
            Part 1: Tagalog Alphabet & Pronunciation
          </h2>
          <p className="text-gray-300">
            Master the foundation of Tagalog with proper pronunciation of all 21 letters.
            Click the audio buttons to hear native pronunciation.
          </p>
        </div>

        {/* Pronunciation Tips */}
        <div className="mb-8">
          <PronunciationTips />
        </div>

        {/* Alphabet Grid */}
        <AlphabetGrid letters={tagalogAlphabet} />
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-xl">
        <h3 className="text-xl font-semibold text-gray-100 mb-4">
          Continue Your Learning Journey
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/lessons"
            className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 hover:shadow-lg transition-all duration-200 border border-gray-600"
          >
            <div className="text-blue-400 mb-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-100">Structured Lessons</h4>
            <p className="text-gray-300 text-sm">Follow our curriculum</p>
          </Link>

          <Link
            href="/practice"
            className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 hover:shadow-lg transition-all duration-200 border border-gray-600"
          >
            <div className="text-green-400 mb-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-100">Practice Mode</h4>
            <p className="text-gray-300 text-sm">Flashcards & exercises</p>
          </Link>

          <Link
            href="/progress"
            className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 hover:shadow-lg transition-all duration-200 border border-gray-600"
          >
            <div className="text-purple-400 mb-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-100">Track Progress</h4>
            <p className="text-gray-300 text-sm">See your statistics</p>
          </Link>

          <Link
            href="/settings"
            className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 hover:shadow-lg transition-all duration-200 border border-gray-600"
          >
            <div className="text-gray-400 mb-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-100">Customize</h4>
            <p className="text-gray-300 text-sm">Audio & preferences</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
