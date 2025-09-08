'use client';

import { useState, useEffect } from 'react';
import { LocalStorageManager } from '@/lib/storage';

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState({
    audioEnabled: true,
    gamificationMode: false,
    preferredDifficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    dailyGoal: 15
  });
  
  // Additional local settings not stored in LocalStorageManager
  const [localSettings, setLocalSettings] = useState({
    autoPlay: true,
    showPronunciation: true,
    notifications: false
  });

  useEffect(() => {
    setMounted(true);
    const savedSettings = LocalStorageManager.getSettings();
    setSettings(prev => ({ ...prev, ...savedSettings }));
  }, []);

  const updateSetting = <K extends keyof typeof settings>(
    key: K, 
    value: typeof settings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    LocalStorageManager.updateSetting(key, value);
  };

  const updateLocalSetting = <K extends keyof typeof localSettings>(
    key: K, 
    value: typeof localSettings[K]
  ) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
    // Store in localStorage directly
    localStorage.setItem(`tagalog-local-${key}`, JSON.stringify(value));
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            ⚙️ Settings
          </h1>
          <p className="text-xl text-gray-300">
            Customize your Tagalog learning experience
          </p>
        </div>

        <div className="space-y-8">
          {/* Audio Settings */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-6">
              🔊 Audio Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white font-medium">Audio Enabled</label>
                  <p className="text-sm text-gray-400">Play pronunciation audio for words</p>
                </div>
                <button
                  onClick={() => updateSetting('audioEnabled', !settings.audioEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.audioEnabled ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.audioEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white font-medium">Auto-play Audio</label>
                  <p className="text-sm text-gray-400">Automatically play audio when showing cards</p>
                </div>
                <button
                  onClick={() => updateLocalSetting('autoPlay', !localSettings.autoPlay)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.autoPlay ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.autoPlay ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Learning Preferences */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-6">
              📚 Learning Preferences
            </h2>
            <div className="space-y-6">
              <div>
                <label className="text-white font-medium mb-3 block">Preferred Difficulty</label>
                <div className="flex space-x-4">
                  {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => updateSetting('preferredDifficulty', level)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        settings.preferredDifficulty === level
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-white font-medium mb-3 block">
                  Daily Goal: {settings.dailyGoal} minutes
                </label>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={settings.dailyGoal}
                  onChange={(e) => updateSetting('dailyGoal', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-1">
                  <span>5 min</span>
                  <span>60 min</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white font-medium">Show Pronunciation</label>
                  <p className="text-sm text-gray-400">Display pronunciation guides for words</p>
                </div>
                <button
                  onClick={() => updateLocalSetting('showPronunciation', !localSettings.showPronunciation)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.showPronunciation ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.showPronunciation ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Interface Settings */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-6">
              🎨 Interface
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white font-medium">Gamification Mode</label>
                  <p className="text-sm text-gray-400">Show points, badges, and achievements</p>
                </div>
                <button
                  onClick={() => updateSetting('gamificationMode', !settings.gamificationMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.gamificationMode ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.gamificationMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white font-medium">Notifications</label>
                  <p className="text-sm text-gray-400">Remind me to practice daily</p>
                </div>
                <button
                  onClick={() => updateLocalSetting('notifications', !localSettings.notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.notifications ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-6">
              💾 Data Management
            </h2>
            <div className="space-y-4">
              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Export Learning Data
              </button>
              <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                Import Learning Data
              </button>
              <button className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                Reset All Progress
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}