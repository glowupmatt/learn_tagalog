import VerbGrid from '@/components/verbs/VerbGrid';
import VerbConjugationDrill from '@/components/verbs/VerbConjugationDrill';
import { magVerbs, magVerbRules, verbCategories, verbLearningTips } from '@/data/verbs';

export default function VerbsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-4">
          Part 3: MAG Verb Conjugations 🔄
        </h1>
        <p className="text-purple-100 text-lg mb-6">
          Master the most common verb type in Tagalog with structured conjugation practice.
          MAG verbs indicate actions performed by the subject and follow predictable patterns.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-purple-700 rounded-lg p-3">
            <div className="font-semibold">Past Tense</div>
            <div className="text-purple-200">nag + root</div>
          </div>
          <div className="bg-purple-700 rounded-lg p-3">
            <div className="font-semibold">Present Tense</div>
            <div className="text-purple-200">nag + repeat + root</div>
          </div>
          <div className="bg-purple-700 rounded-lg p-3">
            <div className="font-semibold">Future Tense</div>
            <div className="text-purple-200">mag + repeat + root</div>
          </div>
          <div className="bg-purple-700 rounded-lg p-3">
            <div className="font-semibold">Command</div>
            <div className="text-purple-200">mag + root</div>
          </div>
        </div>
      </div>

      {/* Conjugation Rules Explanation */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">
            📚 MAG Verb Conjugation Rules
          </h2>
          <p className="text-gray-300 mb-6">
            {magVerbRules.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {Object.entries(magVerbRules.conjugationRules).map(([tense, rule]) => (
            <div key={tense} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-purple-400 mb-2 capitalize">
                {tense} Tense
              </h3>
              <div className="space-y-2">
                <div className="text-gray-200">
                  <span className="font-medium">Pattern:</span> {rule.pattern}
                </div>
                <div className="text-gray-300 text-sm">
                  {rule.explanation}
                </div>
                <div className="bg-gray-800 rounded p-2 text-sm">
                  <span className="text-gray-400">Example:</span>{' '}
                  <span className="text-purple-300 font-medium">{rule.example}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Special Rules */}
        <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
          <h3 className="text-lg font-semibold text-yellow-400 mb-3">
            ⚠️ Special Rules to Remember
          </h3>
          <div className="space-y-2 text-sm">
            {Object.entries(magVerbRules.specialRules).map(([key, rule]) => (
              <div key={key} className="text-gray-300">
                <span className="text-yellow-300 font-medium">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                </span>{' '}
                {rule}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verb Categories */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">
          🏷️ Verb Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {verbCategories.map((category) => (
            <div key={category.name} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center mb-3">
                <div className={`w-4 h-4 rounded-full mr-3 ${
                  category.color === 'blue' ? 'bg-blue-500' :
                  category.color === 'green' ? 'bg-green-500' : 'bg-purple-500'
                }`} />
                <h3 className="text-lg font-semibold text-gray-200">
                  {category.name}
                </h3>
              </div>
              <p className="text-gray-400 text-sm mb-3">
                {category.description}
              </p>
              <div className="text-sm text-gray-300">
                <span className="font-medium">{category.verbs.length} verbs:</span>{' '}
                {category.verbs.slice(0, 3).map(verbId => 
                  magVerbs.find(v => v.id === verbId)?.infinitive
                ).join(', ')}
                {category.verbs.length > 3 && '...'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Verb Cards */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-2">
            🎮 Interactive Verb Cards
          </h2>
          <p className="text-gray-300">
            Study common MAG verbs with interactive flip cards. Click each card to see all conjugations.
          </p>
        </div>
        
        <VerbGrid verbs={magVerbs.slice(0, 6)} mode="study" />
      </div>

      {/* Conjugation Practice Drill */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-2">
            🎯 Conjugation Practice Drill
          </h2>
          <p className="text-gray-300">
            Test your conjugation skills with this interactive drill. You&apos;ll practice all four tenses randomly.
          </p>
        </div>
        
        <VerbConjugationDrill verbs={magVerbs} />
      </div>

      {/* Learning Tips */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-lg p-6 border border-indigo-700 shadow-xl">
        <h3 className="text-lg font-semibold text-indigo-200 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Learning Tips for MAG Verbs
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-indigo-100">
          {verbLearningTips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <span className="text-lg">💡</span>
              <div>
                <h4 className="font-medium mb-1">{tip.tip}</h4>
                <p className="text-sm text-indigo-200">{tip.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 text-center">
        <h3 className="text-xl font-semibold text-gray-100 mb-4">
          🚀 Continue Your Learning Journey
        </h3>
        <p className="text-gray-300 mb-6">
          Great progress! You&apos;ve learned MAG verb conjugations. Next, practice building complete sentences 
          using these verbs with the particles you learned earlier.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/practice"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-500 transition-colors shadow-lg"
          >
            Practice All Concepts
          </a>
          <a
            href="/lessons"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-500 transition-colors shadow-lg"
          >
            Back to Lessons
          </a>
        </div>
      </div>
    </div>
  );
}