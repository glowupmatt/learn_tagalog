import { AppSettings, ProgressData, StudyData, StudySession } from '@/types';

// Local Storage Keys
const STORAGE_KEYS = {
  SETTINGS: 'tagalog-app-settings',
  PROGRESS: 'tagalog-app-progress',
  STUDY_DATA: 'tagalog-app-study-data',
} as const;

// Default values
const DEFAULT_SETTINGS: AppSettings = {
  audioEnabled: true,
  gamificationMode: false,
  preferredDifficulty: 'beginner',
  dailyGoal: 15, // minutes
};

const DEFAULT_PROGRESS: ProgressData = {
  completedLessons: [],
  flashcardProgress: {},
  studySessions: [],
  achievements: [],
};

const DEFAULT_STUDY_DATA: StudyData = {
  reviewQueue: [],
  masteredCards: [],
  difficultCards: [],
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

  // Progress management
  static getProgress(): ProgressData {
    return this.getItem(STORAGE_KEYS.PROGRESS, DEFAULT_PROGRESS);
  }

  static setProgress(progress: Partial<ProgressData>): void {
    const currentProgress = this.getProgress();
    const updatedProgress = { ...currentProgress, ...progress };
    this.setItem(STORAGE_KEYS.PROGRESS, updatedProgress);
  }

  static addCompletedLesson(lessonId: string): void {
    const progress = this.getProgress();
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      this.setItem(STORAGE_KEYS.PROGRESS, progress);
    }
  }

  static updateFlashcardProgress(cardId: string, score: number): void {
    const progress = this.getProgress();
    progress.flashcardProgress[cardId] = score;
    this.setItem(STORAGE_KEYS.PROGRESS, progress);
  }

  static addStudySession(session: StudySession): void {
    const progress = this.getProgress();
    progress.studySessions.push(session);
    this.setItem(STORAGE_KEYS.PROGRESS, progress);
  }

  static addAchievement(achievement: string): void {
    const progress = this.getProgress();
    if (!progress.achievements.includes(achievement)) {
      progress.achievements.push(achievement);
      this.setItem(STORAGE_KEYS.PROGRESS, progress);
    }
  }

  // Study data management
  static getStudyData(): StudyData {
    return this.getItem(STORAGE_KEYS.STUDY_DATA, DEFAULT_STUDY_DATA);
  }

  static setStudyData(studyData: Partial<StudyData>): void {
    const currentStudyData = this.getStudyData();
    const updatedStudyData = { ...currentStudyData, ...studyData };
    this.setItem(STORAGE_KEYS.STUDY_DATA, updatedStudyData);
  }

  static addToReviewQueue(cardId: string): void {
    const studyData = this.getStudyData();
    if (!studyData.reviewQueue.includes(cardId)) {
      studyData.reviewQueue.push(cardId);
      this.setItem(STORAGE_KEYS.STUDY_DATA, studyData);
    }
  }

  static removeFromReviewQueue(cardId: string): void {
    const studyData = this.getStudyData();
    studyData.reviewQueue = studyData.reviewQueue.filter(id => id !== cardId);
    this.setItem(STORAGE_KEYS.STUDY_DATA, studyData);
  }

  static markCardAsMastered(cardId: string): void {
    const studyData = this.getStudyData();
    if (!studyData.masteredCards.includes(cardId)) {
      studyData.masteredCards.push(cardId);
      // Remove from difficult cards if it's there
      studyData.difficultCards = studyData.difficultCards.filter(id => id !== cardId);
      this.setItem(STORAGE_KEYS.STUDY_DATA, studyData);
    }
  }

  static markCardAsDifficult(cardId: string): void {
    const studyData = this.getStudyData();
    if (!studyData.difficultCards.includes(cardId)) {
      studyData.difficultCards.push(cardId);
      this.setItem(STORAGE_KEYS.STUDY_DATA, studyData);
    }
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
      progress: this.getProgress(),
      studyData: this.getStudyData(),
      exportDate: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  }

  // Import data (for restore)
  static importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      if (data.settings) this.setSettings(data.settings);
      if (data.progress) this.setProgress(data.progress);
      if (data.studyData) this.setStudyData(data.studyData);
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
}