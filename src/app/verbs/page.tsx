import Link from 'next/link';

export default function VerbsPage() {
  const verbExamples = [
    {
      infinitive: "turo",
      english: "teach",
      past: "nagturo",
      present: "nagtuturo", 
      future: "magtuturo",
      command: "magturo"
    },
    {
      infinitive: "bago",
      english: "new/fresh",
      past: "nagbago",
      present: "nagbabago",
      future: "magbabago", 
      command: "magbago"
    },
    {
      infinitive: "kain",
      english: "eat",
      past: "nagkain",
      present: "nagkakain",
      future: "magkakain", 
      command: "magkain"
    },
    {
      infinitive: "tulog",
      english: "sleep",
      past: "natulog",
      present: "natutulog",
      future: "matutulog", 
      command: "matulog"
    }
  ];

  return (
    <div className="min-h-full bg-gray-900">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            🔤 MAG Verb Conjugations
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-4 sm:mb-6 leading-relaxed">
            Learn how to conjugate Tagalog verbs in past, present, future, and command forms
          </p>
        </div>

        {/* Conjugation Rules */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-400 mb-3 sm:mb-4">
            MAG Conjugation Rules
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-gray-700 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-red-400 mb-2 text-sm sm:text-base">Past Tense</h3>
              <p className="text-xs sm:text-sm text-gray-300">NAG + Verb</p>
              <p className="text-xs text-gray-400 mt-1">nagturo (taught)</p>
            </div>
            <div className="bg-gray-700 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-400 mb-2 text-sm sm:text-base">Present Tense</h3>
              <p className="text-xs sm:text-sm text-gray-300">NAG + (repeat first letter) + Verb</p>
              <p className="text-xs text-gray-400 mt-1">nagtuturo (teaching)</p>
            </div>
            <div className="bg-gray-700 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-green-400 mb-2 text-sm sm:text-base">Future Tense</h3>
              <p className="text-xs sm:text-sm text-gray-300">MAG + (repeat first letter) + Verb</p>
              <p className="text-xs text-gray-400 mt-1">magtuturo (will teach)</p>
            </div>
            <div className="bg-gray-700 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-purple-400 mb-2 text-sm sm:text-base">Command</h3>
              <p className="text-xs sm:text-sm text-gray-300">MAG + Verb</p>
              <p className="text-xs text-gray-400 mt-1">magturo (teach!)</p>
            </div>
          </div>
        </div>

        {/* Verb Examples */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
            Common Verb Conjugations
          </h2>
          <div className="grid gap-4 sm:gap-6">
            {verbExamples.map((verb, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-400">
                    {verb.infinitive}
                  </h3>
                  <span className="text-sm sm:text-base text-gray-400">({verb.english})</span>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-gray-700 p-2.5 sm:p-3 rounded">
                    <div className="text-xs sm:text-sm font-medium text-red-400">Past</div>
                    <div className="text-sm sm:text-base text-white break-words">{verb.past}</div>
                  </div>
                  <div className="bg-gray-700 p-2.5 sm:p-3 rounded">
                    <div className="text-xs sm:text-sm font-medium text-yellow-400">Present</div>
                    <div className="text-sm sm:text-base text-white break-words">{verb.present}</div>
                  </div>
                  <div className="bg-gray-700 p-2.5 sm:p-3 rounded">
                    <div className="text-xs sm:text-sm font-medium text-green-400">Future</div>
                    <div className="text-sm sm:text-base text-white break-words">{verb.future}</div>
                  </div>
                  <div className="bg-gray-700 p-2.5 sm:p-3 rounded">
                    <div className="text-xs sm:text-sm font-medium text-purple-400">Command</div>
                    <div className="text-sm sm:text-base text-white break-words">{verb.command}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Section */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
            Practice Verb Conjugations
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
            Master verb conjugations with interactive exercises and real examples
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link 
              href="/lessons/verbs" 
              className="bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base text-center hover:bg-blue-700 transition-colors"
            >
              Interactive Lessons
            </Link>
            <Link 
              href="/practice" 
              className="bg-green-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base text-center hover:bg-green-700 transition-colors"
            >
              Practice Exercises
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}