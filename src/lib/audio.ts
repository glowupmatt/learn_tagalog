import { AudioPlayer } from '@/types';

class AudioPlayerImpl implements AudioPlayer {
  private audioContext: AudioContext | null = null;
  private currentAudio: HTMLAudioElement | null = null;

  constructor() {
    // Initialize audio context if available
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      this.audioContext = new AudioContext();
    }
  }

  play(audioUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        resolve();
        return;
      }

      // Stop current audio if playing
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      }

      const audio = new Audio(audioUrl);
      this.currentAudio = audio;

      audio.addEventListener('ended', () => {
        resolve();
      });

      audio.addEventListener('error', (error) => {
        console.error('Audio playback error:', error);
        reject(error);
      });

      audio.play().catch(error => {
        console.error('Audio play failed:', error);
        reject(error);
      });
    });
  }

  async playSequence(audioUrls: string[]): Promise<void> {
    for (const url of audioUrls) {
      await this.play(url);
      // Small delay between audio files
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }

  stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }

  // Resume audio context if suspended (required for iOS)
  async resumeAudioContext(): Promise<void> {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }
}

// Singleton instance
export const audioPlayer = new AudioPlayerImpl();

// Utility functions
export const playAudio = (audioUrl: string): Promise<void> => {
  return audioPlayer.play(audioUrl);
};

export const playAudioSequence = (audioUrls: string[]): Promise<void> => {
  return audioPlayer.playSequence(audioUrls);
};

export const stopAudio = (): void => {
  audioPlayer.stop();
};

// Initialize audio context on first user interaction
export const initializeAudio = (): void => {
  if (typeof window !== 'undefined') {
    const initAudio = () => {
      audioPlayer.resumeAudioContext();
      // Remove event listeners after first interaction
      document.removeEventListener('click', initAudio);
      document.removeEventListener('touchstart', initAudio);
    };

    document.addEventListener('click', initAudio);
    document.addEventListener('touchstart', initAudio);
  }
};