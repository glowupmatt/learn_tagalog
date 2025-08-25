'use client';

import { ParticleFamily as ParticleFamilyType } from '@/types';
import ParticleCard from './ParticleCard';
import { useState } from 'react';

interface ParticleFamilyProps {
  family: ParticleFamilyType;
  color: 'blue' | 'green' | 'purple';
}

export default function ParticleFamily({ family, color }: ParticleFamilyProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const getFamilyIcon = (familyName: string) => {
    switch (familyName) {
      case "ANG Family":
        return "🎯"; // Focus/target
      case "NG Family":
        return "🔗"; // Connection/possession
      case "SA Family":
        return "📍"; // Location/direction
      default:
        return "⭐";
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          gradient: 'from-blue-900 to-blue-800',
          border: 'border-blue-400',
          text: 'text-blue-400',
          button: 'hover:bg-blue-800'
        };
      case 'green':
        return {
          gradient: 'from-green-900 to-green-800',
          border: 'border-green-400',
          text: 'text-green-400',
          button: 'hover:bg-green-800'
        };
      case 'purple':
        return {
          gradient: 'from-purple-900 to-purple-800',
          border: 'border-purple-400',
          text: 'text-purple-400',
          button: 'hover:bg-purple-800'
        };
      default:
        return {
          gradient: 'from-blue-900 to-blue-800',
          border: 'border-blue-400',
          text: 'text-blue-400',
          button: 'hover:bg-blue-800'
        };
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="mb-8">
      {/* Family Header */}
      <div className={`bg-gradient-to-r ${colorClasses.gradient} rounded-lg p-6 shadow-xl border ${colorClasses.border} mb-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-3xl">{getFamilyIcon(family.name)}</span>
            <div>
              <h2 className={`text-2xl font-bold ${colorClasses.text} mb-2`}>
                {family.name}
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed">
                {family.description}
              </p>
            </div>
          </div>
          
          {/* Collapse/Expand Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-2 rounded-lg transition-colors ${colorClasses.button}`}
            aria-label={isExpanded ? "Collapse family" : "Expand family"}
          >
            <svg 
              className={`w-6 h-6 text-gray-200 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        {/* Family Stats */}
        <div className="mt-4 flex items-center space-x-6 text-sm text-gray-300">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <span>{family.particles.length} particles</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>Essential grammar</span>
          </div>
        </div>
      </div>

      {/* Particles Grid */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {family.particles.map((particle) => (
            <ParticleCard
              key={particle.form}
              particle={particle}
              familyName={family.name}
              familyColor={color}
              // audioUrl={`/audio/particles/${family.name.toLowerCase().replace(' ', '-')}/${particle.form}.mp3`}
            />
          ))}
        </div>
      )}

      {/* Learning Tips Section */}
      {isExpanded && (
        <div className={`mt-6 bg-gray-800 rounded-lg p-4 border ${colorClasses.border} border-opacity-30`}>
          <h4 className={`font-semibold ${colorClasses.text} mb-3 flex items-center`}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Quick Learning Tip
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            {family.name === "ANG Family" && "These particles make something the MAIN FOCUS of your sentence. Think of them as the spotlight in your sentence structure."}
            {family.name === "NG Family" && "These particles show possession or mark the doer when they're NOT the main focus. Like saying 'of' or showing ownership."}
            {family.name === "SA Family" && "These particles indicate WHERE or TO WHOM something happens. Think direction, location, or who receives something."}
          </p>
        </div>
      )}
    </div>
  );
}