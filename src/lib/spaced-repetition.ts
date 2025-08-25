'use client';

export interface ReviewCard {
  id: string;
  category: 'alphabet' | 'particles' | 'verbs';
  lastReviewed: Date;
  nextReview: Date;
  difficulty: number;
  correctStreak: number;
  totalAttempts: number;
  correctAttempts: number;
  ease: number;
}

export class SpacedRepetitionManager {
  private static readonly STORAGE_KEY = 'tagalog-spaced-repetition';
  private static readonly MIN_EASE = 1.3;
  private static readonly MAX_EASE = 2.5;
  private static readonly EASE_INCREMENT = 0.1;
  private static readonly EASE_DECREMENT = 0.2;

  static getCardData(cardId: string): ReviewCard | null {
    if (typeof window === 'undefined') return null;
    
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return null;
    
    try {
      const cards = JSON.parse(data) as Record<string, ReviewCard>;
      const card = cards[cardId];
      if (!card) return null;
      
      return {
        ...card,
        lastReviewed: new Date(card.lastReviewed),
        nextReview: new Date(card.nextReview)
      };
    } catch {
      return null;
    }
  }

  static createNewCard(cardId: string, category: 'alphabet' | 'particles' | 'verbs'): ReviewCard {
    const now = new Date();
    return {
      id: cardId,
      category,
      lastReviewed: now,
      nextReview: now,
      difficulty: 1,
      correctStreak: 0,
      totalAttempts: 0,
      correctAttempts: 0,
      ease: 2.0
    };
  }

  static updateCardProgress(cardId: string, category: 'alphabet' | 'particles' | 'verbs', isCorrect: boolean): ReviewCard {
    const card = this.getCardData(cardId) || this.createNewCard(cardId, category);
    
    const now = new Date();
    card.lastReviewed = now;
    card.totalAttempts += 1;
    
    if (isCorrect) {
      card.correctAttempts += 1;
      card.correctStreak += 1;
      
      // Increase ease for consecutive correct answers
      if (card.correctStreak >= 2) {
        card.ease = Math.min(this.MAX_EASE, card.ease + this.EASE_INCREMENT);
      }
      
      // Calculate next review interval based on difficulty and ease
      const baseInterval = this.getBaseInterval(card.difficulty);
      const adjustedInterval = Math.round(baseInterval * card.ease);
      card.nextReview = new Date(now.getTime() + adjustedInterval * 24 * 60 * 60 * 1000);
      
      // Move to next difficulty level after 3 consecutive correct answers
      if (card.correctStreak >= 3 && card.difficulty < 5) {
        card.difficulty += 1;
        card.correctStreak = 0;
      }
    } else {
      card.correctStreak = 0;
      card.ease = Math.max(this.MIN_EASE, card.ease - this.EASE_DECREMENT);
      
      // Reset to difficulty 1 for incorrect answers
      if (card.difficulty > 1) {
        card.difficulty = Math.max(1, card.difficulty - 1);
      }
      
      // Review again in 1 day for incorrect answers
      card.nextReview = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    }
    
    this.saveCardData(card);
    return card;
  }

  private static getBaseInterval(difficulty: number): number {
    switch (difficulty) {
      case 1: return 1; // 1 day
      case 2: return 3; // 3 days
      case 3: return 7; // 1 week
      case 4: return 14; // 2 weeks
      case 5: return 30; // 1 month
      default: return 1;
    }
  }

  private static saveCardData(card: ReviewCard): void {
    if (typeof window === 'undefined') return;
    
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      const cards = data ? JSON.parse(data) : {};
      cards[card.id] = card;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cards));
    } catch (error) {
      console.error('Failed to save card data:', error);
    }
  }

  static getCardsForReview(category?: 'alphabet' | 'particles' | 'verbs'): ReviewCard[] {
    if (typeof window === 'undefined') return [];
    
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return [];
    
    try {
      const cards = JSON.parse(data) as Record<string, ReviewCard>;
      const now = new Date();
      
      return Object.values(cards)
        .filter(card => {
          if (category && card.category !== category) return false;
          return new Date(card.nextReview) <= now;
        })
        .map(card => ({
          ...card,
          lastReviewed: new Date(card.lastReviewed),
          nextReview: new Date(card.nextReview)
        }))
        .sort((a, b) => new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime());
    } catch {
      return [];
    }
  }

  static getDifficultCards(category?: 'alphabet' | 'particles' | 'verbs'): ReviewCard[] {
    if (typeof window === 'undefined') return [];
    
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return [];
    
    try {
      const cards = JSON.parse(data) as Record<string, ReviewCard>;
      
      return Object.values(cards)
        .filter(card => {
          if (category && card.category !== category) return false;
          const accuracy = card.totalAttempts > 0 ? card.correctAttempts / card.totalAttempts : 0;
          return accuracy < 0.7 && card.totalAttempts >= 3; // Less than 70% accuracy with at least 3 attempts
        })
        .map(card => ({
          ...card,
          lastReviewed: new Date(card.lastReviewed),
          nextReview: new Date(card.nextReview)
        }))
        .sort((a, b) => {
          const aAccuracy = a.correctAttempts / a.totalAttempts;
          const bAccuracy = b.correctAttempts / b.totalAttempts;
          return aAccuracy - bAccuracy; // Sort by lowest accuracy first
        });
    } catch {
      return [];
    }
  }

  static getCardStats(category?: 'alphabet' | 'particles' | 'verbs'): {
    total: number;
    mastered: number;
    learning: number;
    difficult: number;
    dueForReview: number;
  } {
    if (typeof window === 'undefined') {
      return { total: 0, mastered: 0, learning: 0, difficult: 0, dueForReview: 0 };
    }
    
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) {
      return { total: 0, mastered: 0, learning: 0, difficult: 0, dueForReview: 0 };
    }
    
    try {
      const cards = JSON.parse(data) as Record<string, ReviewCard>;
      const now = new Date();
      
      const filteredCards = Object.values(cards).filter(card => 
        !category || card.category === category
      );
      
      const stats = {
        total: filteredCards.length,
        mastered: 0,
        learning: 0,
        difficult: 0,
        dueForReview: 0
      };
      
      filteredCards.forEach(card => {
        const accuracy = card.totalAttempts > 0 ? card.correctAttempts / card.totalAttempts : 0;
        
        if (new Date(card.nextReview) <= now) {
          stats.dueForReview++;
        }
        
        if (card.difficulty >= 4 && accuracy >= 0.9) {
          stats.mastered++;
        } else if (accuracy < 0.7 && card.totalAttempts >= 3) {
          stats.difficult++;
        } else {
          stats.learning++;
        }
      });
      
      return stats;
    } catch {
      return { total: 0, mastered: 0, learning: 0, difficult: 0, dueForReview: 0 };
    }
  }

  static getHint(cardId: string, category: 'alphabet' | 'particles' | 'verbs'): string | null {
    const card = this.getCardData(cardId);
    if (!card) return null;
    
    const accuracy = card.totalAttempts > 0 ? card.correctAttempts / card.totalAttempts : 0;
    
    if (accuracy < 0.5 && card.totalAttempts >= 2) {
      if (category === 'alphabet') {
        return "💡 Tip: Try sounding out the pronunciation slowly, focusing on the mouth position.";
      } else if (category === 'particles') {
        return "💡 Tip: Remember the particle families - ANG (focus), NG (possession/non-focus), SA (location).";
      } else {
        return "💡 Tip: Remember MAG verb patterns - NAG (past), NAG+repeat (present), MAG+repeat (future), MAG (command).";
      }
    }
    
    if (card.correctStreak === 0 && card.totalAttempts >= 3) {
      return "🔄 This card needs more practice. Take your time and review the explanation.";
    }
    
    return null;
  }

  static resetCardProgress(cardId: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) return;
      
      const cards = JSON.parse(data) as Record<string, ReviewCard>;
      if (cards[cardId]) {
        delete cards[cardId];
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cards));
      }
    } catch (error) {
      console.error('Failed to reset card progress:', error);
    }
  }
}