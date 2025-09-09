import Link from 'next/link';

export default function ParticlesPage() {
  return (
    <div className="min-h-full bg-gray-900">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            ⚛️ Tagalog Particles
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-4 sm:mb-6 leading-relaxed">
            Master the essential Tagalog particles: ang, ng, sa, and na
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6 sm:mb-8">
          {/* ANG Family */}
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-400 mb-3 sm:mb-4">
              ANG Family
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 leading-relaxed">
              Focus markers that highlight the subject of the sentence
            </p>
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-400">
              <div>ako (I/Me) → sya (He/She/It)</div>
              <div>tayo (We) → kami (We exclusive)</div>
              <div>ka/ikaw (You) → kayo (You plural)</div>
              <div>ito (This) → yan (That) → yon (That far)</div>
            </div>
            <Link 
              href="/lessons/particles" 
              className="mt-3 sm:mt-4 inline-block bg-blue-600 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-blue-700 transition-colors"
            >
              Learn ANG Particles
            </Link>
          </div>

          {/* NG Family */}
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
            <h2 className="text-xl sm:text-2xl font-semibold text-green-400 mb-3 sm:mb-4">
              NG Family
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 leading-relaxed">
              Possession and non-focus markers
            </p>
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-400">
              <div>ko (My/I) → nya (His/Her/Its)</div>
              <div>natin (Our) → namin (Our exclusive)</div>
              <div>mo (Your) → nyo (Your plural)</div>
              <div>nito (This) → nyan (That) → nyon (That far)</div>
            </div>
            <Link 
              href="/lessons/particles" 
              className="mt-3 sm:mt-4 inline-block bg-green-600 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-green-700 transition-colors"
            >
              Learn NG Particles
            </Link>
          </div>

          {/* SA Family */}
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-3 sm:mb-4">
              SA Family
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 leading-relaxed">
              Location and direction markers
            </p>
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-400">
              <div>sa akin (To me) → sa kanya (To him/her)</div>
              <div>sa atin (To us) → sa amin (To us exclusive)</div>
              <div>sa iyo (To you) → sa inyo (To you plural)</div>
              <div>dito (Here) → jan (There) → doon (Over there)</div>
            </div>
            <Link 
              href="/lessons/particles" 
              className="mt-3 sm:mt-4 inline-block bg-purple-600 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-purple-700 transition-colors"
            >
              Learn SA Particles
            </Link>
          </div>
        </div>

        {/* Quick Practice Section */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
            Quick Practice
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
            Test your understanding of Tagalog particles with interactive exercises
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link 
              href="/lessons/particles" 
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