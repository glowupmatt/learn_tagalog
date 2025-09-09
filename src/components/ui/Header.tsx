'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { LocalStorageManager } from '@/lib/storage';
import { initializeAudio } from '@/lib/audio';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const settings = LocalStorageManager.getSettings();
    setAudioEnabled(settings.audioEnabled);
    
    // Initialize audio on component mount
    initializeAudio();
  }, []);

  const toggleAudio = () => {
    const newAudioEnabled = !audioEnabled;
    setAudioEnabled(newAudioEnabled);
    LocalStorageManager.updateSetting('audioEnabled', newAudioEnabled);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  if (!mounted) {
    return (
      <header className="bg-gray-800 shadow-lg border-b border-gray-700 fixed top-0 left-0 right-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button - disabled when not mounted */}
              <button
                disabled
                className="md:hidden p-2 rounded-lg text-gray-600 cursor-not-allowed"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
                🇵🇭 Tagalog Study
              </Link>
              <div className="hidden sm:block text-sm text-gray-400">
                Master particles, verbs & vocabulary
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Progress Indicator Placeholder */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-1/4"></div>
                </div>
                <span className="text-sm text-gray-300">25%</span>
              </div>

              {/* Audio Toggle - disabled when not mounted */}
              <button
                disabled
                className="p-2 rounded-lg bg-gray-700 text-gray-500 cursor-not-allowed"
                title="Audio loading..."
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.216 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.216l4.167-3.784zm2.91 4.138a1 1 0 011.414 0 5 5 0 010 7.071 1 1 0 11-1.414-1.414 3 3 0 000-4.243 1 1 0 010-1.414zM15.657 2.343a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Settings Button */}
              <button
                className="p-2 rounded-lg text-gray-400 hover:bg-gray-700 transition-colors"
                title="Settings"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu - not functional when not mounted */}
        <MobileMenu isOpen={false} onClose={() => {}} />
      </header>
    );
  }

  return (
    <header className="bg-gray-800 shadow-lg border-b border-gray-700 fixed top-0 left-0 right-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                mobileMenuOpen 
                  ? 'text-blue-400 bg-blue-900 hover:bg-blue-800' 
                  : 'text-gray-400 hover:bg-gray-700'
              }`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
              🇵🇭 Tagalog Study
            </Link>
            <div className="hidden sm:block text-sm text-gray-400">
              Master particles, verbs & vocabulary
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Progress Indicator Placeholder */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-32 bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full w-1/4"></div>
              </div>
              <span className="text-sm text-gray-300">25%</span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-lg transition-colors ${
                audioEnabled 
                  ? 'bg-blue-900 text-blue-400 hover:bg-blue-800' 
                  : 'bg-gray-700 text-gray-500 hover:bg-gray-600'
              }`}
              title={`Audio ${audioEnabled ? 'enabled' : 'disabled'}`}
            >
              {audioEnabled ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.216 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.216l4.167-3.784zm2.91 4.138a1 1 0 011.414 0 5 5 0 010 7.071 1 1 0 11-1.414-1.414 3 3 0 000-4.243 1 1 0 010-1.414zM15.657 2.343a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.216 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.216l4.167-3.784zm7.824 4.61a1 1 0 00-1.414 1.414L17.207 10l-1.414 1.414a1 1 0 101.414 1.414L18.621 11.414a2 2 0 000-2.828L17.207 7.172z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M15.293 6.793a1 1 0 011.414 0L18.121 8.207a1 1 0 010 1.414L16.707 11.035a1 1 0 11-1.414-1.414L16.707 8.207 15.293 6.793a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* Settings Button */}
            <button
              className="p-2 rounded-lg text-gray-400 hover:bg-gray-700 transition-colors"
              title="Settings"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
    </header>
  );
}