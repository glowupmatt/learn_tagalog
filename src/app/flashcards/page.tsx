import Link from 'next/link';

export default function FlashcardsPage() {
  const flashcardSets = [
    {
      title: "Essential Vocabulary",
      description: "100 most common Tagalog words",
      count: 100,
      difficulty: "Beginner",
      color: "blue",
      href: "/vocabulary"
    },
    {
      title: "Particle Practice",
      description: "Master ang, ng, sa particles",
      count: 45,
      difficulty: "Intermediate", 
      color: "green",
      href: "/particles"
    },
    {
      title: "Verb Conjugations",
      description: "MAG verb forms and tenses",
      count: 60,
      difficulty: "Intermediate",
      color: "purple",
      href: "/verbs"
    },
    {
      title: "Family & People",
      description: "Family members and relationships",
      count: 25,
      difficulty: "Beginner",
      color: "pink",
      href: "/vocabulary"
    },
    {
      title: "Daily Life",
      description: "Common objects and activities",
      count: 40,
      difficulty: "Beginner",
      color: "orange",
      href: "/vocabulary"
    },
    {
      title: "Time & Numbers",
      description: "Time expressions and counting",
      count: 30,
      difficulty: "Beginner",
      color: "indigo",
      href: "/vocabulary"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "border-blue-500 bg-blue-500/10 text-blue-400",
      green: "border-green-500 bg-green-500/10 text-green-400",
      purple: "border-purple-500 bg-purple-500/10 text-purple-400",
      pink: "border-pink-500 bg-pink-500/10 text-pink-400",
      orange: "border-orange-500 bg-orange-500/10 text-orange-400",
      indigo: "border-indigo-500 bg-indigo-500/10 text-indigo-400"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🃏 Flashcards
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Interactive flashcards to reinforce your Tagalog learning
          </p>
        </div>

        {/* Study Modes */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Study Modes
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">📖</div>
              <h3 className="font-semibold text-white mb-2">Learn</h3>
              <p className="text-sm text-gray-300">Study new cards with examples</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="font-semibold text-white mb-2">Review</h3>
              <p className="text-sm text-gray-300">Practice cards you&apos;ve seen</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-white mb-2">Quick Test</h3>
              <p className="text-sm text-gray-300">Rapid-fire card practice</p>
            </div>
          </div>
        </div>

        {/* Flashcard Sets */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Available Flashcard Sets
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashcardSets.map((set, index) => (
              <Link 
                key={index}
                href={set.href}
                className="block bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors group"
              >
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border mb-4 ${getColorClasses(set.color)}`}>
                  {set.difficulty}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {set.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {set.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {set.count} cards
                  </span>
                  <div className="text-blue-400 group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Study Stats */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Your Progress
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">245</div>
              <div className="text-sm text-gray-400">Cards Studied</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">89%</div>
              <div className="text-sm text-gray-400">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">12</div>
              <div className="text-sm text-gray-400">Study Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">156</div>
              <div className="text-sm text-gray-400">Cards Mastered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}