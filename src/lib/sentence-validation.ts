import { WordComponent, SentencePattern } from '@/data/sentence-building';

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  score: number;
  suggestions: string[];
}

export interface ValidationError {
  type: 'particle_missing' | 'particle_incorrect' | 'word_order' | 'incompatible_words' | 'grammar_error';
  message: string;
  wordIndex?: number;
  expectedWord?: string;
  severity: 'error' | 'warning' | 'info';
}

export class SentenceValidator {
  private vocabulary: WordComponent[];
  private patterns: SentencePattern[];

  constructor(vocabulary: WordComponent[], patterns: SentencePattern[]) {
    this.vocabulary = vocabulary;
    this.patterns = patterns;
  }

  private getWordData(wordId: string): WordComponent | undefined {
    return this.vocabulary.find(w => w.id === wordId);
  }

  validateSentence(userSentence: string[], targetSentence: string[]): ValidationResult {
    const errors: ValidationError[] = [];
    let score = 0;

    // Convert word IDs to word data for analysis
    const userWords = userSentence.map(id => this.getWordData(id)).filter(Boolean) as WordComponent[];
    const targetWords = targetSentence.map(id => this.getWordData(id)).filter(Boolean) as WordComponent[];

    // 1. Check if sentence lengths match
    if (userSentence.length !== targetSentence.length) {
      errors.push({
        type: 'word_order',
        message: `Expected ${targetSentence.length} words, but got ${userSentence.length}`,
        severity: 'error'
      });
    }

    // 2. Check exact word match and order
    const exactMatch = JSON.stringify(userSentence) === JSON.stringify(targetSentence);
    if (exactMatch) {
      score = 100;
      return {
        isValid: true,
        errors: [],
        score,
        suggestions: ['Perfect! Your sentence is completely correct.']
      };
    }

    // 3. Check if all required words are present
    const missingWords = targetSentence.filter(wordId => !userSentence.includes(wordId));
    const extraWords = userSentence.filter(wordId => !targetSentence.includes(wordId));

    if (missingWords.length > 0) {
      missingWords.forEach(wordId => {
        const word = this.getWordData(wordId);
        if (word) {
          errors.push({
            type: 'word_order',
            message: `Missing word: "${word.tagalog}" (${word.english})`,
            expectedWord: word.tagalog,
            severity: 'error'
          });
        }
      });
    }

    if (extraWords.length > 0) {
      extraWords.forEach(wordId => {
        const word = this.getWordData(wordId);
        if (word) {
          errors.push({
            type: 'word_order',
            message: `Extra word: "${word.tagalog}" (${word.english}) - this word shouldn't be in the sentence`,
            severity: 'warning'
          });
        }
      });
    }

    // 4. Check particle usage rules
    const particleErrors = this.validateParticleUsage(userWords);
    errors.push(...particleErrors);

    // 5. Check word order within categories
    const orderErrors = this.validateWordOrder(userWords, targetWords);
    errors.push(...orderErrors);

    // 6. Calculate partial score
    score = this.calculateScore(userSentence, targetSentence, errors);

    // 7. Generate suggestions
    const suggestions = this.generateSuggestions(userWords, targetWords, errors);

    return {
      isValid: errors.filter(e => e.severity === 'error').length === 0,
      errors,
      score,
      suggestions
    };
  }

  private validateParticleUsage(userWords: WordComponent[]): ValidationError[] {
    const errors: ValidationError[] = [];
    
    for (let i = 0; i < userWords.length; i++) {
      const word = userWords[i];
      const nextWord = userWords[i + 1];
      const prevWord = userWords[i - 1];

      // Check if ANG particle is correctly used
      if (word.id === 'ang') {
        if (!nextWord) {
          errors.push({
            type: 'particle_incorrect',
            message: 'ANG particle needs a word after it',
            wordIndex: i,
            severity: 'error'
          });
        } else if (nextWord.type === 'particle') {
          errors.push({
            type: 'particle_incorrect',
            message: 'ANG cannot be followed by another particle',
            wordIndex: i + 1,
            severity: 'error'
          });
        }
      }

      // Check if NG particle is correctly used
      if (word.id === 'ng') {
        if (!nextWord) {
          errors.push({
            type: 'particle_incorrect',
            message: 'NG particle needs a word after it',
            wordIndex: i,
            severity: 'error'
          });
        } else if (nextWord.type === 'particle') {
          errors.push({
            type: 'particle_incorrect',
            message: 'NG cannot be followed by another particle',
            wordIndex: i + 1,
            severity: 'error'
          });
        }
      }

      // Check if SA particle is correctly used
      if (word.id === 'sa') {
        if (!nextWord) {
          errors.push({
            type: 'particle_incorrect',
            message: 'SA particle needs a word after it',
            wordIndex: i,
            severity: 'error'
          });
        } else if (nextWord.type === 'particle') {
          errors.push({
            type: 'particle_incorrect',
            message: 'SA cannot be followed by another particle',
            wordIndex: i + 1,
            severity: 'error'
          });
        }
      }

      // Check if nouns that require particles have them
      if (word.type === 'noun' && word.requiresParticle) {
        const requiredParticles = word.requiresParticle;
        let hasRequiredParticle = false;

        // Check if any required particle precedes this noun
        if (prevWord && requiredParticles.includes(prevWord.id)) {
          hasRequiredParticle = true;
        }

        if (!hasRequiredParticle) {
          errors.push({
            type: 'particle_missing',
            message: `"${word.tagalog}" typically needs a particle before it (${requiredParticles.join(' or ')})`,
            wordIndex: i,
            severity: 'warning'
          });
        }
      }

      // Check for double particles
      if (word.type === 'particle' && nextWord?.type === 'particle') {
        errors.push({
          type: 'particle_incorrect',
          message: 'Cannot have two particles in a row',
          wordIndex: i,
          severity: 'error'
        });
      }
    }

    return errors;
  }

  private validateWordOrder(userWords: WordComponent[], targetWords: WordComponent[]): ValidationError[] {
    const errors: ValidationError[] = [];

    // Check if verb comes first (common Tagalog pattern)
    const firstWord = userWords[0];
    const targetFirstWord = targetWords[0];

    if (firstWord && targetFirstWord && firstWord.type !== targetFirstWord.type) {
      if (targetFirstWord.type === 'verb' && firstWord.type !== 'verb') {
        errors.push({
          type: 'word_order',
          message: 'In Tagalog, verbs typically come first in the sentence',
          wordIndex: 0,
          severity: 'info'
        });
      }
    }

    // Check for common word order patterns
    const verbIndex = userWords.findIndex(w => w.type === 'verb');
    const angIndex = userWords.findIndex(w => w.id === 'ang');
    const ngIndex = userWords.findIndex(w => w.id === 'ng');

    // Verb should typically come before ANG
    if (verbIndex > -1 && angIndex > -1 && verbIndex > angIndex) {
      errors.push({
        type: 'word_order',
        message: 'Verb should typically come before ANG particle',
        wordIndex: verbIndex,
        severity: 'info'
      });
    }

    // ANG should typically come before NG
    if (angIndex > -1 && ngIndex > -1 && angIndex > ngIndex) {
      errors.push({
        type: 'word_order',
        message: 'ANG particle should typically come before NG particle',
        wordIndex: angIndex,
        severity: 'info'
      });
    }

    return errors;
  }

  private calculateScore(userSentence: string[], targetSentence: string[], errors: ValidationError[]): number {
    let score = 0;

    // Base score for correct words in correct positions
    for (let i = 0; i < Math.min(userSentence.length, targetSentence.length); i++) {
      if (userSentence[i] === targetSentence[i]) {
        score += 100 / targetSentence.length;
      }
    }

    // Deduct points for errors
    const errorDeductions = errors.reduce((total, error) => {
      switch (error.severity) {
        case 'error':
          return total + 15;
        case 'warning':
          return total + 5;
        case 'info':
          return total + 2;
        default:
          return total;
      }
    }, 0);

    score = Math.max(0, score - errorDeductions);
    return Math.round(score);
  }

  private generateSuggestions(
    userWords: WordComponent[], 
    targetWords: WordComponent[], 
    errors: ValidationError[]
  ): string[] {
    const suggestions: string[] = [];

    // If there are particle errors, suggest reviewing particle usage
    const particleErrors = errors.filter(e => e.type.includes('particle'));
    if (particleErrors.length > 0) {
      suggestions.push('Review the usage of particles (ang, ng, sa) - they mark different parts of the sentence');
    }

    // If there are word order errors, suggest reviewing sentence patterns
    const orderErrors = errors.filter(e => e.type === 'word_order');
    if (orderErrors.length > 0) {
      suggestions.push('Remember: Tagalog typically follows Verb-Actor-Object word order');
    }

    // Specific suggestions based on word types
    const hasVerb = userWords.some(w => w.type === 'verb');
    const targetHasVerb = targetWords.some(w => w.type === 'verb');
    
    if (!hasVerb && targetHasVerb) {
      suggestions.push('This sentence needs an action word (verb)');
    }

    // Check for missing particles
    const userParticles = userWords.filter(w => w.type === 'particle').map(w => w.id);
    const targetParticles = targetWords.filter(w => w.type === 'particle').map(w => w.id);
    const missingParticles = targetParticles.filter(p => !userParticles.includes(p));
    
    if (missingParticles.length > 0) {
      suggestions.push(`You might be missing these particles: ${missingParticles.join(', ')}`);
    }

    // If score is very low, suggest starting over
    const score = this.calculateScore(
      userWords.map(w => w.id), 
      targetWords.map(w => w.id), 
      errors
    );
    
    if (score < 30) {
      suggestions.push('Consider starting over and building the sentence step by step');
    }

    // Default helpful suggestion
    if (suggestions.length === 0) {
      suggestions.push('Try rearranging the words or check if you\'re missing any particles');
    }

    return suggestions;
  }

  // Helper method to check if a sentence follows common Tagalog patterns
  public identifyPattern(words: WordComponent[]): string | null {
    if (words.length === 0) return null;

    const types = words.map(w => w.type);
    const wordIds = words.map(w => w.id);

    // Verb + Pronoun (simple)
    if (types.length === 2 && types[0] === 'verb' && types[1] === 'pronoun') {
      return 'verb-actor-simple';
    }

    // Verb + ANG + Noun
    if (types.length === 3 && types[0] === 'verb' && wordIds[1] === 'ang' && types[2] === 'noun') {
      return 'verb-actor';
    }

    // Adjective + ANG + Noun
    if (types.length === 3 && types[0] === 'adjective' && wordIds[1] === 'ang' && types[2] === 'noun') {
      return 'adjective-actor';
    }

    // Verb + ANG + Noun + NG + Noun
    if (types.length === 5 && 
        types[0] === 'verb' && 
        wordIds[1] === 'ang' && 
        wordIds[3] === 'ng') {
      return 'verb-actor-object';
    }

    return 'unknown';
  }

  // Generate hints based on the target sentence
  public generateHints(targetSentence: string[], currentAttempt: string[] = []): string[] {
    const hints: string[] = [];
    const targetWords = targetSentence.map(id => this.getWordData(id)).filter(Boolean) as WordComponent[];
    const pattern = this.identifyPattern(targetWords);

    if (currentAttempt.length === 0) {
      // First hint - about sentence structure
      switch (pattern) {
        case 'verb-actor-simple':
          hints.push('Start with the action word (verb), then add who is doing the action');
          break;
        case 'verb-actor':
          hints.push('Start with the action word, then use ANG before the person/thing doing the action');
          break;
        case 'adjective-actor':
          hints.push('Start with the describing word (adjective), then use ANG before the noun');
          break;
        case 'verb-actor-object':
          hints.push('Start with the action, then ANG + actor, then NG + object');
          break;
        default:
          hints.push('Think about what type of word should come first in this sentence');
      }
    } else if (currentAttempt.length < targetSentence.length) {
      // Progressive hints based on what's been placed
      const nextWord = this.getWordData(targetSentence[currentAttempt.length]);
      
      if (nextWord) {
        hints.push(`The next word should be a ${nextWord.type}: "${nextWord.tagalog}"`);
      }
    }

    return hints;
  }
}