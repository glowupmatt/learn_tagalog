'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { WordComponent } from '@/data/sentence-building';

interface SortableWordChipProps {
  id: string;
  word: WordComponent;
  onRemove: () => void;
  isDragOverlay?: boolean;
}

export function SortableWordChip({ 
  id, 
  word, 
  onRemove 
}: SortableWordChipProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ 
    id,
    disabled: false
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        inline-flex items-center space-x-2 px-3 py-2 md:px-4 md:py-3 rounded-lg text-white font-medium text-sm
        cursor-grab active:cursor-grabbing select-none transition-all duration-150 min-h-12 md:min-h-auto
        ${getTypeColor(word.type)}
        ${isDragging ? 'opacity-60 scale-90 rotate-2 z-50' : 'opacity-100 scale-100'}
        shadow-lg hover:shadow-xl transform hover:scale-110 hover:-translate-y-1 relative group
        border-2 border-white border-opacity-20 hover:border-opacity-40
        touch-manipulation
      `}
    >
      <span className="text-xs">{getTypeIcon(word.type)}</span>
      <span className="font-medium">{word.tagalog}</span>
      <span className="text-xs opacity-75">({word.english})</span>
      
      {/* Remove button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="ml-2 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:bg-opacity-30 rounded-full p-1 transition-all duration-200"
        title="Remove from sentence"
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}