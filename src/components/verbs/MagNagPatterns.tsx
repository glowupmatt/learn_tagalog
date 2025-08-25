'use client';

import { useState } from 'react';

export default function MagNagPatterns() {
  const [selectedPattern, setSelectedPattern] = useState<'regular' | 'vowel' | 'cluster'>('regular');

  const patternExamples = {
    regular: {
      title: "Regular Consonant Pattern",
      description: "Most MAG verbs follow this pattern - repeat the first consonant",
      examples: [
        {
          root: "kain",
          past: "nagkain",
          present: "nagkakain", 
          future: "magkakain",
          command: "magkain",
          meaning: "eat"
        },
        {
          root: "bili",
          past: "nagbili",
          present: "nagbibili",
          future: "magbibili", 
          command: "magbili",
          meaning: "buy"
        },
        {
          root: "luto",
          past: "nagluto",
          present: "nagluluto",
          future: "magluluto",
          command: "magluto", 
          meaning: "cook"
        }
      ],
      rule: "Consonant + root → NAG + consonant + consonant + root (present/future)"
    },
    vowel: {
      title: "Vowel-Starting Pattern",
      description: "Verbs starting with vowels repeat the vowel with hyphen",
      examples: [
        {
          root: "aral",
          past: "nag-aral",
          present: "nag-aaral",
          future: "mag-aaral", 
          command: "mag-aral",
          meaning: "study"
        },
        {
          root: "inom",
          past: "nag-inom",
          present: "nag-iinom",
          future: "mag-iinom",
          command: "mag-inom",
          meaning: "drink"
        },
        {
          root: "usap",
          past: "nag-usap", 
          present: "nag-uusap",
          future: "mag-uusap",
          command: "mag-usap",
          meaning: "talk"
        }
      ],
      rule: "Vowel + root → NAG + vowel + vowel + root (present/future)"
    },
    cluster: {
      title: "Consonant Cluster Pattern",
      description: "Verbs with consonant clusters (br, tr, pl, etc.) only repeat the first consonant",
      examples: [
        {
          root: "plano",
          past: "nagplano",
          present: "nagpplano",
          future: "magpplano",
          command: "magplano",
          meaning: "plan"
        },
        {
          root: "trabaho",
          past: "nagtrabaho",
          present: "nagtatrabaho", 
          future: "magtatrabaho",
          command: "magtrabaho",
          meaning: "work"
        }
      ],
      rule: "Cluster → NAG + first consonant + first consonant + root (present/future)"
    }
  };

  const currentPattern = patternExamples[selectedPattern];

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center">
          <div className="bg-purple-900 rounded-full p-2 mr-3">
            <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          MAG/NAG Conjugation Patterns
        </h2>
        <p className="text-gray-300 mb-6">
          Understanding the core patterns will help you conjugate any MAG verb correctly.
        </p>
      </div>

      {/* Pattern Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedPattern('regular')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedPattern === 'regular'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
          }`}
        >
          Regular Consonants
        </button>
        <button
          onClick={() => setSelectedPattern('vowel')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedPattern === 'vowel'
              ? 'bg-green-600 text-white'
              : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
          }`}
        >
          Vowel-Starting
        </button>
        <button
          onClick={() => setSelectedPattern('cluster')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedPattern === 'cluster'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
          }`}
        >
          Consonant Clusters
        </button>
      </div>

      {/* Pattern Details */}
      <div className="bg-gray-700 rounded-lg p-6 border border-gray-600 mb-6">
        <h3 className="text-xl font-semibold text-purple-400 mb-3">
          {currentPattern.title}
        </h3>
        <p className="text-gray-300 mb-4">
          {currentPattern.description}
        </p>
        <div className="bg-gray-800 rounded p-3 mb-4">
          <p className="text-sm text-purple-300 font-mono">
            <span className="text-gray-400">Rule:</span> {currentPattern.rule}
          </p>
        </div>
      </div>

      {/* Examples Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left p-3 text-gray-300 font-medium">Root</th>
              <th className="text-left p-3 text-gray-300 font-medium">Past (NAG)</th>
              <th className="text-left p-3 text-gray-300 font-medium">Present (NAG+repeat)</th>
              <th className="text-left p-3 text-gray-300 font-medium">Future (MAG+repeat)</th>
              <th className="text-left p-3 text-gray-300 font-medium">Command (MAG)</th>
              <th className="text-left p-3 text-gray-300 font-medium">Meaning</th>
            </tr>
          </thead>
          <tbody>
            {currentPattern.examples.map((example, index) => (
              <tr key={index} className="border-b border-gray-700 hover:bg-gray-750">
                <td className="p-3 font-bold text-blue-400">{example.root}</td>
                <td className="p-3 text-gray-200 font-mono">{example.past}</td>
                <td className="p-3 text-green-400 font-mono">{example.present}</td>
                <td className="p-3 text-purple-400 font-mono">{example.future}</td>
                <td className="p-3 text-orange-400 font-mono">{example.command}</td>
                <td className="p-3 text-gray-300">{example.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Key Insights */}
      <div className="mt-6 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-lg p-4 border border-indigo-700">
        <h4 className="text-lg font-semibold text-indigo-200 mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Key Insights for {currentPattern.title}
        </h4>
        <div className="text-indigo-100 text-sm space-y-2">
          {selectedPattern === 'regular' && (
            <>
              <p>• The first consonant is always repeated in present and future tenses</p>
              <p>• Past tense and commands never have repetition - just add NAG/MAG prefix</p>
              <p>• This pattern covers about 80% of all MAG verbs</p>
            </>
          )}
          {selectedPattern === 'vowel' && (
            <>
              <p>• Vowel-starting verbs use a hyphen before the repeated vowel</p>
              <p>• The vowel sound is repeated, not consonants</p>
              <p>• Common with native Tagalog words and some English loanwords</p>
            </>
          )}
          {selectedPattern === 'cluster' && (
            <>
              <p>• Only the first consonant of a cluster is repeated</p>
              <p>• Common with English loanwords (drive, plan, practice)</p>
              <p>• The rest of the cluster stays intact</p>
            </>
          )}
        </div>
      </div>

      {/* Quick Reference */}
      <div className="mt-6 bg-gray-700 rounded-lg p-4 border border-gray-600">
        <h4 className="text-lg font-semibold text-gray-200 mb-3">Quick Reference</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-purple-300 font-medium mb-1">NAG Prefix (Past & Present):</p>
            <p className="text-gray-300">• Past: Completed action</p>
            <p className="text-gray-300">• Present: Ongoing action (with repetition)</p>
          </div>
          <div>
            <p className="text-purple-300 font-medium mb-1">MAG Prefix (Future & Command):</p>
            <p className="text-gray-300">• Future: Planned action (with repetition)</p>
            <p className="text-gray-300">• Command: Instruction (no repetition)</p>
          </div>
        </div>
      </div>
    </div>
  );
}