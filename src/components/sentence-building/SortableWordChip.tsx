'use client';

import { WordComponent } from '@/data/sentence-building';

interface SortableWordChipProps {
  word: WordComponent;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export function SortableWordChip({
  word,
  canMoveUp,
  canMoveDown,
  onRemove,
  onMoveUp,
  onMoveDown
}: SortableWordChipProps) {

  const getTypeColor = (type: WordComponent['type']) => {
    switch (type) {
      case 'particle':
        return 'bg-red-600 hover:bg-red-700';
      case 'verb':
        return 'bg-green-600 hover:bg-green-700';
      case 'noun':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'pronoun':
        return 'bg-purple-600 hover:bg-purple-700';
      case 'adjective':
        return 'bg-orange-600 hover:bg-orange-700';
      case 'determiner':
        return 'bg-pink-600 hover:bg-pink-700';
      case 'location':
        return 'bg-teal-600 hover:bg-teal-700';
      case 'time':
        return 'bg-indigo-600 hover:bg-indigo-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  const getTypeIcon = (type: WordComponent['type']) => {
    switch (type) {
      case 'particle':
        return '⚡';
      case 'verb':
        return '🏃';
      case 'noun':
        return '📦';
      case 'pronoun':
        return '👤';
      case 'adjective':
        return '🎨';
      case 'determiner':
        return '👆';
      case 'location':
        return '📍';
      case 'time':
        return '⏰';
      default:
        return '📝';
    }
  };

  return (
    <div className={`
      inline-flex items-center space-x-1 px-3 py-2 md:px-4 md:py-3 rounded-lg text-white font-medium text-sm
      select-none transition-all duration-150 min-h-12 md:min-h-auto
      ${getTypeColor(word.type)}
      opacity-100 scale-100
      shadow-lg hover:shadow-xl relative group
      border-2 border-white border-opacity-20 hover:border-opacity-40
      touch-manipulation
    `}>
      {/* Move Up Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMoveUp();
        }}
        disabled={!canMoveUp}
        className="opacity-60 group-hover:opacity-100 hover:bg-blue-500 hover:bg-opacity-30 rounded-full p-1 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        title="Move left"
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      <span className="text-xs">{getTypeIcon(word.type)}</span>
      <span className="font-medium">{word.tagalog}</span>
      <span className="text-xs opacity-75">({word.english})</span>

      {/* Move Down Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMoveDown();
        }}
        disabled={!canMoveDown}
        className="opacity-60 group-hover:opacity-100 hover:bg-blue-500 hover:bg-opacity-30 rounded-full p-1 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        title="Move right"
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Remove button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="opacity-60 group-hover:opacity-100 hover:bg-red-500 hover:bg-opacity-30 rounded-full p-1 transition-all duration-200"
        title="Remove from sentence"
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}