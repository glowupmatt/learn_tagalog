'use client';

import { useDraggable } from '@dnd-kit/core';
import { WordComponent } from '@/data/sentence-building';

interface WordChipProps {
  id: string;
  word: WordComponent;
  isDragging?: boolean;
  onClick?: () => void;
  showClickHint?: boolean;
}

export function WordChip({ 
  id, 
  word, 
  isDragging = false, 
  onClick,
  showClickHint = false 
}: WordChipProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging: isActiveDragging
  } = useDraggable({
    id,
    disabled: false
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const getTypeColor = (type: WordComponent['type']) => {
    switch (type) {
      case 'particle':
        return 'bg-red-500 hover:bg-red-600';
      case 'verb':
        return 'bg-green-500 hover:bg-green-600';
      case 'noun':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'pronoun':
        return 'bg-purple-500 hover:bg-purple-600';
      case 'adjective':
        return 'bg-orange-500 hover:bg-orange-600';
      case 'determiner':
        return 'bg-pink-500 hover:bg-pink-600';
      case 'location':
        return 'bg-teal-500 hover:bg-teal-600';
      case 'time':
        return 'bg-indigo-500 hover:bg-indigo-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
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
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`
        inline-flex items-center space-x-2 px-3 py-2 md:px-4 md:py-3 rounded-lg text-white font-medium text-sm
        ${onClick ? 'cursor-pointer hover:cursor-pointer' : 'cursor-grab active:cursor-grabbing'} 
        select-none transition-all duration-150 min-h-12 md:min-h-auto
        ${getTypeColor(word.type)}
        ${isActiveDragging || isDragging ? 'opacity-60 scale-90 rotate-3' : 'opacity-100 scale-100'}
        shadow-lg hover:shadow-xl transform hover:scale-110 hover:-translate-y-1
        border-2 border-white border-opacity-20 hover:border-opacity-40
        touch-manipulation
        ${onClick ? 'hover:ring-2 hover:ring-white hover:ring-opacity-50 active:scale-95' : ''}
      `}
    >
      <span className="text-xs">{getTypeIcon(word.type)}</span>
      <span className="font-medium">{word.tagalog}</span>
      <span className="text-xs opacity-75">({word.english})</span>
      {showClickHint && (
        <span className="text-xs opacity-60 ml-1">👆</span>
      )}
    </div>
  );
}