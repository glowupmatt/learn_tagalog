import Link from 'next/link';

const lessons = [
  {
    id: 'alphabet',
    title: 'Part 1: Tagalog Alphabet & Pronunciation',
    description: 'Master the foundation of Tagalog with proper pronunciation of all 21 letters.',
    status: 'available',
    difficulty: 'Beginner',
    duration: '15 min',
    icon: '🔤'
  },
  {
    id: 'particles',
    title: 'Part 2: Essential Particles System',
    description: 'Learn the core ANG, NG, and SA particle families that structure Tagalog sentences.',
    status: 'available',
    difficulty: 'Beginner',
    duration: '25 min',
    icon: '🎯'
  },
  {
    id: 'verbs',
    title: 'Part 3: MAG Verb Conjugations',
    description: 'Master the most common verb conjugation patterns in Tagalog.',
    status: 'available',
    difficulty: 'Intermediate',
    duration: '30 min',
    icon: '⚡'
  },
  {
    id: 'vocabulary',
    title: 'Part 4: Essential Vocabulary',
    description: 'Learn the top 100 most frequently used Tagalog words.',
    status: 'available',
    difficulty: 'Beginner',
    duration: '20 min',
    icon: '📚'
  }
];

export default function LessonsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-4">
          🇵🇭 Tagalog Learning Path
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Follow our structured curriculum designed to teach you Tagalog particles, verb conjugations, 
          and essential vocabulary for quick communication.
        </p>
      </div>

      {/* Lessons Grid */}
      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`bg-gray-800 rounded-lg p-6 shadow-xl border transition-all duration-200 ${
              lesson.status === 'available'
                ? 'border-gray-700 hover:border-blue-500 hover:shadow-2xl'
                : 'border-gray-600 opacity-75'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{lesson.icon}</div>
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${
                    lesson.status === 'available' ? 'text-gray-100' : 'text-gray-400'
                  }`}>
                    {lesson.title}
                  </h3>
                  <p className={`mb-3 ${
                    lesson.status === 'available' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {lesson.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className={`flex items-center space-x-1 ${
                      lesson.status === 'available' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>{lesson.duration}</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      lesson.difficulty === 'Beginner' 
                        ? 'bg-green-900 text-green-300 border border-green-600'
                        : 'bg-orange-900 text-orange-300 border border-orange-600'
                    }`}>
                      {lesson.difficulty}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {lesson.status === 'available' ? (
                  <>
                    {lesson.id === 'alphabet' && (
                      <Link
                        href="/"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors shadow-lg"
                      >
                        Review
                      </Link>
                    )}
                    {lesson.id === 'particles' && (
                      <Link
                        href="/lessons/particles"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors shadow-lg"
                      >
                        Start Lesson
                      </Link>
                    )}
                    {lesson.id === 'verbs' && (
                      <Link
                        href="/lessons/verbs"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors shadow-lg"
                      >
                        Start Lesson
                      </Link>
                    )}
                    {lesson.id === 'vocabulary' && (
                      <Link
                        href="/lessons/vocabulary"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors shadow-lg"
                      >
                        Start Lesson
                      </Link>
                    )}
                  </>
                ) : (
                  <div className="bg-gray-600 text-gray-400 px-6 py-3 rounded-lg font-medium">
                    Coming Soon
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Study Tips */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-6 border border-blue-700 shadow-xl">
        <h3 className="text-xl font-semibold text-blue-200 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Study Tips for Success
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-100">
          <div className="flex items-start space-x-3">
            <span className="text-lg">💡</span>
            <div>
              <h4 className="font-medium mb-1">Start with the Alphabet</h4>
              <p className="text-sm text-blue-200">Master pronunciation before moving to grammar</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-lg">🎯</span>
            <div>
              <h4 className="font-medium mb-1">Focus on Particles</h4>
              <p className="text-sm text-blue-200">These are the building blocks of Tagalog sentences</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-lg">🔄</span>
            <div>
              <h4 className="font-medium mb-1">Practice Daily</h4>
              <p className="text-sm text-blue-200">15 minutes daily is better than 2 hours weekly</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-lg">🎵</span>
            <div>
              <h4 className="font-medium mb-1">Use Audio Features</h4>
              <p className="text-sm text-blue-200">Hear native pronunciation for better learning</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}