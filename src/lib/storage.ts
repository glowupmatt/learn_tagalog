// Simplified settings for the Tagalog Study App

// Local Storage Keys
const STORAGE_KEYS = {
  SETTINGS: 'tagalog-app-settings',
} as const;

// App Settings Interface
export interface AppSettings {
  audioEnabled: boolean;
  preferredDifficulty: 'beginner' | 'intermediate' | 'advanced';
}

// Default values
const DEFAULT_SETTINGS: AppSettings = {
  audioEnabled: true,
  preferredDifficulty: 'beginner',
};

// Storage utilities
export class LocalStorageManager {
  // Generic storage methods
  private static setItem<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage:`, error);
    }
  }

  private static getItem<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage:`, error);
      return defaultValue;
    }
  }

  // Settings management
  static getSettings(): AppSettings {
    return this.getItem(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  }

  static setSettings(settings: Partial<AppSettings>): void {
    const currentSettings = this.getSettings();
    const updatedSettings = { ...currentSettings, ...settings };
    this.setItem(STORAGE_KEYS.SETTINGS, updatedSettings);
  }

  static updateSetting<K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ): void {
    const settings = this.getSettings();
    settings[key] = value;
    this.setItem(STORAGE_KEYS.SETTINGS, settings);
  }

  // Clear all data (useful for reset functionality)
  static clearAllData(): void {
    if (typeof window === 'undefined') return;
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  // Export data (for backup)
  static exportData(): string {
    const data = {
      settings: this.getSettings(),
      exportDate: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  }

  // Import data (for restore)
  static importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      if (data.settings) this.setSettings(data.settings);
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
}