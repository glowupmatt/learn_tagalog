export default function ProgressPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-4">
          📚 Study Materials
        </h1>
        <p className="text-purple-100 text-lg">
          Access all your Tagalog learning resources in one place.
        </p>
      </div>

      {/* Learning Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Alphabet Resources */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
          <div className="flex items-center mb-4">
            <div className="bg-green-900 rounded-full p-3 mr-3">
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-green-400">Alphabet & Pronunciation</h3>
          </div>
          <p className="text-gray-300 mb-4">
            Learn the Filipino alphabet and practice pronunciation.
          </p>
          <a
            href="/flashcards/alphabet"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Study Alphabet
          </a>
        </div>

        {/* Particles Resources */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
          <div className="flex items-center mb-4">
            <div className="bg-purple-900 rounded-full p-3 mr-3">
              <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-purple-400">Particles</h3>
          </div>
          <p className="text-gray-300 mb-4">
            Master the essential ANG, NG, and SA particle families.
          </p>
          <div className="space-y-2">
            <a
              href="/flashcards/particles"
              className="block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-center"
            >
              Study Particles
            </a>
            <a
              href="/lessons/particles"
              className="block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-center"
            >
              Particle Lessons
            </a>
          </div>
        </div>

        {/* Verb Resources */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
          <div className="flex items-center mb-4">
            <div className="bg-orange-900 rounded-full p-3 mr-3">
              <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-orange-400">MAG Verbs</h3>
          </div>
          <p className="text-gray-300 mb-4">
            Learn verb conjugations and practice sentence construction.
          </p>
          <div className="space-y-2">
            <a
              href="/flashcards/verbs"
              className="block bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors text-center"
            >
              Study Verbs
            </a>
            <a
              href="/lessons/verbs"
              className="block bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors text-center"
            >
              Verb Lessons
            </a>
          </div>
        </div>

        {/* Vocabulary Resources */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
          <div className="flex items-center mb-4">
            <div className="bg-blue-900 rounded-full p-3 mr-3">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-blue-400">Vocabulary</h3>
          </div>
          <p className="text-gray-300 mb-4">
            Build your vocabulary with essential Tagalog words.
          </p>
          <div className="space-y-2">
            <a
              href="/flashcards/vocabulary"
              className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-center"
            >
              Study Vocabulary
            </a>
            <a
              href="/lessons/vocabulary"
              className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-center"
            >
              Vocabulary Lessons
            </a>
          </div>
        </div>

        {/* Sentence Building */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
          <div className="flex items-center mb-4">
            <div className="bg-teal-900 rounded-full p-3 mr-3">
              <svg className="w-6 h-6 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-teal-400">Sentence Building</h3>
          </div>
          <p className="text-gray-300 mb-4">
            Practice constructing sentences with proper word order.
          </p>
          <a
            href="/sentence-building"
            className="block bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors text-center"
          >
            Build Sentences
          </a>
        </div>

        {/* Practice Mode */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
          <div className="flex items-center mb-4">
            <div className="bg-red-900 rounded-full p-3 mr-3">
              <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-400">Practice Mode</h3>
          </div>
          <p className="text-gray-300 mb-4">
            Mixed practice exercises across all categories.
          </p>
          <a
            href="/practice"
            className="block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-center"
          >
            Start Practice
          </a>
        </div>
      </div>

      {/* Learning Tips */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-lg p-6 border border-indigo-700 shadow-xl">
        <h3 className="text-lg font-semibold text-indigo-200 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Study Tips
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-indigo-100">
          <div className="flex items-start space-x-3">
            <span className="text-lg">📚</span>
            <div>
              <h4 className="font-medium mb-1">Start with Basics</h4>
              <p className="text-sm text-indigo-200">
                Begin with the alphabet and pronunciation before moving to particles and verbs.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-lg">🎯</span>
            <div>
              <h4 className="font-medium mb-1">Focus on Particles</h4>
              <p className="text-sm text-indigo-200">
                Mastering ANG, NG, and SA particles is crucial for sentence construction.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-lg">🔊</span>
            <div>
              <h4 className="font-medium mb-1">Listen and Repeat</h4>
              <p className="text-sm text-indigo-200">
                Use audio features to practice pronunciation and improve listening skills.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-lg">🏗️</span>
            <div>
              <h4 className="font-medium mb-1">Build Sentences</h4>
              <p className="text-sm text-indigo-200">
                Practice sentence construction to apply what you&apos;ve learned in context.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}