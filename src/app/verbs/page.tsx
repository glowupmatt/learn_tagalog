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
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🔤 MAG Verb Conjugations
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Learn how to conjugate Tagalog verbs in past, present, future, and command forms
          </p>
        </div>

        {/* Conjugation Rules */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">
            MAG Conjugation Rules
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-red-400 mb-2">Past Tense</h3>
              <p className="text-sm text-gray-300">NAG + Verb</p>
              <p className="text-xs text-gray-400 mt-1">nagturo (taught)</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-400 mb-2">Present Tense</h3>
              <p className="text-sm text-gray-300">NAG + (repeat first letter) + Verb</p>
              <p className="text-xs text-gray-400 mt-1">nagtuturo (teaching)</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-green-400 mb-2">Future Tense</h3>
              <p className="text-sm text-gray-300">MAG + (repeat first letter) + Verb</p>
              <p className="text-xs text-gray-400 mt-1">magtuturo (will teach)</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-400 mb-2">Command</h3>
              <p className="text-sm text-gray-300">MAG + Verb</p>
              <p className="text-xs text-gray-400 mt-1">magturo (teach!)</p>
            </div>
          </div>
        </div>

        {/* Verb Examples */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Common Verb Conjugations
          </h2>
          <div className="grid gap-6">
            {verbExamples.map((verb, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <h3 className="text-xl font-semibold text-blue-400">
                    {verb.infinitive}
                  </h3>
                  <span className="text-gray-400">({verb.english})</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-700 p-3 rounded">
                    <div className="text-sm font-medium text-red-400">Past</div>
                    <div className="text-white">{verb.past}</div>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <div className="text-sm font-medium text-yellow-400">Present</div>
                    <div className="text-white">{verb.present}</div>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <div className="text-sm font-medium text-green-400">Future</div>
                    <div className="text-white">{verb.future}</div>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <div className="text-sm font-medium text-purple-400">Command</div>
                    <div className="text-white">{verb.command}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Section */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Practice Verb Conjugations
          </h2>
          <p className="text-gray-300 mb-6">
            Master verb conjugations with interactive exercises and real examples
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/lessons/verbs" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Interactive Lessons
            </Link>
            <Link 
              href="/practice" 
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Practice Exercises
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}