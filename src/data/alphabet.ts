import { Letter } from '@/types';

export const tagalogAlphabet: Letter[] = [
  // Vowels
  {
    letter: 'A',
    type: 'vowel',
    pronunciation: 'ah',
    examples: ['ako (I)', 'araw (day)', 'anak (child)']
  },
  {
    letter: 'E',
    type: 'vowel',
    pronunciation: 'eh',
    examples: ['ewan (I don\'t know)', 'english', 'enero (January)']
  },
  {
    letter: 'I',
    type: 'vowel',
    pronunciation: 'ee',
    examples: ['ito (this)', 'isda (fish)', 'init (heat)']
  },
  {
    letter: 'O',
    type: 'vowel',
    pronunciation: 'oh',
    examples: ['oo (yes)', 'okra', 'obra (work)']
  },
  {
    letter: 'U',
    type: 'vowel',
    pronunciation: 'oo',
    examples: ['ulan (rain)', 'uma (farm)', 'ulo (head)']
  },
  
  // Consonants
  {
    letter: 'B',
    type: 'consonant',
    pronunciation: 'bah',
    examples: ['bata (child)', 'bahay (house)', 'bago (new)']
  },
  {
    letter: 'K',
    type: 'consonant',
    pronunciation: 'kah',
    examples: ['kumusta (how are you)', 'kain (eat)', 'kuya (older brother)']
  },
  {
    letter: 'D',
    type: 'consonant',
    pronunciation: 'dah',
    examples: ['dito (here)', 'damit (clothes)', 'dalawa (two)']
  },
  {
    letter: 'G',
    type: 'consonant',
    pronunciation: 'gah',
    examples: ['galing (good/from)', 'gawa (made)', 'gusto (want/like)']
  },
  {
    letter: 'H',
    type: 'consonant',
    pronunciation: 'hah',
    examples: ['hindi (no/not)', 'hinog (ripe)', 'hagdan (stairs)']
  },
  {
    letter: 'L',
    type: 'consonant',
    pronunciation: 'lah',
    examples: ['laki (big)', 'lamig (cold)', 'laging (always)']
  },
  {
    letter: 'M',
    type: 'consonant',
    pronunciation: 'mah',
    examples: ['mabait (kind)', 'mata (eyes)', 'malaki (big)']
  },
  {
    letter: 'N',
    type: 'consonant',
    pronunciation: 'nah',
    examples: ['naman (also)', 'nasa (at/in)', 'ngayon (now)']
  },
  {
    letter: 'NG',
    type: 'consonant',
    pronunciation: 'ngah',
    examples: ['ngayon (now)', 'ngunit (but)', 'ngipin (teeth)']
  },
  {
    letter: 'P',
    type: 'consonant',
    pronunciation: 'pah',
    examples: ['pamilya (family)', 'pera (money)', 'pagkain (food)']
  },
  {
    letter: 'R',
    type: 'consonant',
    pronunciation: 'rah',
    examples: ['rito (here)', 'regalo (gift)', 'rami (many)']
  },
  {
    letter: 'S',
    type: 'consonant',
    pronunciation: 'sah',
    examples: ['salamat (thank you)', 'siya (he/she)', 'sino (who)']
  },
  {
    letter: 'T',
    type: 'consonant',
    pronunciation: 'tah',
    examples: ['tayo (we/us)', 'tubig (water)', 'takot (fear)']
  },
  {
    letter: 'W',
    type: 'consonant',
    pronunciation: 'wah',
    examples: ['wala (nothing)', 'walang (no/none)', 'wag (don\'t)']
  },
  {
    letter: 'Y',
    type: 'consonant',
    pronunciation: 'yah',
    examples: ['yung (the)', 'yan (that)', 'yaya (nanny)']
  }
];

export const pronunciationTips = [
  {
    tip: 'Vowels are always pronounced the same way in Tagalog',
    explanation: 'Unlike English, Tagalog vowels have consistent sounds'
  },
  {
    tip: 'The letter "NG" is one sound',
    explanation: 'Pronounced like the "ng" in "song" but at the beginning of words'
  },
  {
    tip: 'Roll your R\'s lightly',
    explanation: 'The Tagalog R is a light trill, not as strong as Spanish'
  },
  {
    tip: 'Stress usually falls on the second-to-last syllable',
    explanation: 'Most Tagalog words are stressed on the penultimate syllable'
  }
];