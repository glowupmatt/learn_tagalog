import Link from 'next/link';
import VocabularyCategoryBrowser from '@/components/vocabulary/VocabularyCategoryBrowser';
import VocabularyQuiz from '@/components/vocabulary/VocabularyQuiz';
import { 
  essentialVocabulary, 
  vocabularyCategories, 
  vocabularyLearningTips,
  vocabularyStats 
} from '@/data/vocabulary';

export default function VocabularyPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-4">
          Part 4: Essential Vocabulary 📚
        </h1>
        <p className="text-green-100 text-lg mb-6">
          Master the most frequently used Tagalog words for quick communication.
          These {vocabularyStats.totalWords} words form the foundation of everyday conversation.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-green-700 rounded-lg p-3">
            <div className="font-semibold">Total Words</div>
            <div className="text-green-200">{vocabularyStats.totalWords}</div>
          </div>
          <div className="bg-green-700 rounded-lg p-3">
            <div className="font-semibold">Categories</div>
            <div className="text-green-200">{vocabularyStats.categories}</div>
          </div>
          <div className="bg-green-700 rounded-lg p-3">
            <div className="font-semibold">Beginner</div>
            <div className="text-green-200">{vocabularyStats.difficulty.beginner} words</div>
          </div>
          <div className="bg-green-700 rounded-lg p-3">
            <div className="font-semibold">Intermediate</div>
            <div className="text-green-200">{vocabularyStats.difficulty.intermediate} words</div>
          </div>
        </div>
      </div>

      {/* Vocabulary Categories Overview */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">
            📑 Vocabulary Categories
          </h2>
          <p className="text-gray-300 mb-6">
            Our vocabulary is organized into {vocabularyCategories.length} essential categories for systematic learning.
            Each category focuses on words you&apos;ll use in specific situations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {vocabularyCategories.map((category) => {
            const getCategoryColor = () => {
              const colorMap: { [key: string]: string } = {
                'greetings': 'bg-blue-900 border-blue-600',
                'basic': 'bg-green-900 border-green-600',
                'family': 'bg-purple-900 border-purple-600',
                'daily-life': 'bg-orange-900 border-orange-600',
                'time': 'bg-indigo-900 border-indigo-600',
                'feelings': 'bg-pink-900 border-pink-600',
                'places': 'bg-teal-900 border-teal-600',
                'questions': 'bg-red-900 border-red-600'
              };
              return colorMap[category.id] || 'bg-gray-900 border-gray-600';
            };

            return (
              <div 
                key={category.id} 
                className={`${getCategoryColor()} rounded-lg p-4 border`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-gray-100 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-300 mb-2">{category.description}</p>
                <p className="text-xs text-gray-400">{category.wordIds.length} words</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Vocabulary Browser */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-2">
            🔍 Interactive Vocabulary Browser
          </h2>
          <p className="text-gray-300">
            Explore vocabulary by category or browse all words. Click any card to see detailed information and examples.
          </p>
        </div>
        
        <VocabularyCategoryBrowser 
          categories={vocabularyCategories}
          words={essentialVocabulary}
        />
      </div>

      {/* Practice Exercises */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vocabulary Quiz */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-100 mb-2">
              🎯 Vocabulary Quiz
            </h2>
            <p className="text-gray-300">
              Test your knowledge with randomized questions covering all vocabulary categories.
            </p>
          </div>
          
          <VocabularyQuiz 
            words={essentialVocabulary}
            quizType="mixed"
            questionsPerRound={10}
          />
        </div>

        {/* Quick Stats & Tips */}
        <div className="space-y-6">
          {/* Statistics */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
            <h3 className="text-xl font-bold text-gray-100 mb-4">
              📊 Vocabulary Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total Words:</span>
                <span className="font-bold text-green-400">{vocabularyStats.totalWords}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Categories:</span>
                <span className="font-bold text-blue-400">{vocabularyStats.categories}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Beginner Level:</span>
                <span className="font-bold text-green-400">{vocabularyStats.difficulty.beginner}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Intermediate Level:</span>
                <span className="font-bold text-yellow-400">{vocabularyStats.difficulty.intermediate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Advanced Level:</span>
                <span className="font-bold text-red-400">{vocabularyStats.difficulty.advanced}</span>
              </div>
            </div>
          </div>

          {/* Frequency Distribution */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
            <h3 className="text-xl font-bold text-gray-100 mb-4">
              🎯 Learning Priority
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">
                  Top 10 words (daily essentials)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-300">
                  Words 11-20 (common expressions)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span className="text-gray-300">
                  Words 21+ (expanded vocabulary)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Tips */}
      <div className="bg-gradient-to-r from-teal-900 to-green-900 rounded-lg p-6 border border-teal-700 shadow-xl">
        <h3 className="text-lg font-semibold text-teal-200 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Vocabulary Learning Tips
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-teal-100">
          {vocabularyLearningTips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <span className="text-lg">💡</span>
              <div>
                <h4 className="font-medium mb-1">{tip.tip}</h4>
                <p className="text-sm text-teal-200">{tip.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 text-center">
        <h3 className="text-xl font-semibold text-gray-100 mb-4">
          🎉 Congratulations! You&apos;ve Completed All Lessons
        </h3>
        <p className="text-gray-300 mb-6">
          You&apos;ve now learned the Tagalog alphabet, essential particles, verb conjugations, and core vocabulary.
          Continue practicing to build fluency and confidence in your communication skills.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/practice"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-500 transition-colors shadow-lg"
          >
            Continue Practicing
          </Link>
          <Link
            href="/progress"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors shadow-lg"
          >
            View Your Progress
          </Link>
          <Link
            href="/"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-500 transition-colors shadow-lg"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}