'use client';

// Simple flashcard state management without complex tracking
export interface CardState {
  id: string;
  category: 'alphabet' | 'particles' | 'verbs';
  lastStudied?: Date;
}

export class SimpleCardManager {
  private static readonly STORAGE_KEY = 'tagalog-simple-cards';

  static getCardState(cardId: string): CardState | null {
    if (typeof window === 'undefined') return null;

    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return null;

    try {
      const cards = JSON.parse(data) as Record<string, CardState>;
      const card = cards[cardId];
      if (!card) return null;

      return {
        ...card,
        lastStudied: card.lastStudied ? new Date(card.lastStudied) : undefined
      };
    } catch {
      return null;
    }
  }

  static markCardAsStudied(cardId: string, category: 'alphabet' | 'particles' | 'verbs'): void {
    if (typeof window === 'undefined') return;

    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      const cards = data ? JSON.parse(data) : {};

      cards[cardId] = {
        id: cardId,
        category,
        lastStudied: new Date()
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cards));
    } catch (error) {
      console.error('Failed to save card state:', error);
    }
  }

  static getStudiedCards(category?: 'alphabet' | 'particles' | 'verbs'): CardState[] {
    if (typeof window === 'undefined') return [];

    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return [];

    try {
      const cards = JSON.parse(data) as Record<string, CardState>;

      return Object.values(cards)
        .filter(card => !category || card.category === category)
        .map(card => ({
          ...card,
          lastStudied: card.lastStudied ? new Date(card.lastStudied) : undefined
        }));
    } catch {
      return [];
    }
  }

  static clearCardData(cardId?: string): void {
    if (typeof window === 'undefined') return;

    try {
      if (cardId) {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (!data) return;

        const cards = JSON.parse(data) as Record<string, CardState>;
        if (cards[cardId]) {
          delete cards[cardId];
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cards));
        }
      } else {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    } catch (error) {
      console.error('Failed to clear card data:', error);
    }
  }
}

// Legacy compatibility - export as SpacedRepetitionManager for existing code
export const SpacedRepetitionManager = {
  getCardStats: () => ({ total: 0, mastered: 0, learning: 0, difficult: 0, dueForReview: 0 }),
  updateCardProgress: (cardId: string, category: 'alphabet' | 'particles' | 'verbs') => {
    SimpleCardManager.markCardAsStudied(cardId, category);
    return null;
  },
  getCardsForReview: () => [],
  getDifficultCards: () => [],
  getHint: () => null,
  resetCardProgress: (cardId: string) => SimpleCardManager.clearCardData(cardId),
  getCardData: (cardId: string) => SimpleCardManager.getCardState(cardId),
  createNewCard: () => null
};