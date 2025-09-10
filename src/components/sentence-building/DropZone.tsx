'use client';

import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';

interface DropZoneProps {
  id: string;
  children: ReactNode;
  isEmpty: boolean;
  className?: string;
}

export function DropZone({ id, children, isEmpty, className = '' }: DropZoneProps) {
  const { setNodeRef, isOver } = useDroppable({
    id
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        border-2 border-dashed rounded-lg p-6 transition-all duration-200
        ${isOver 
          ? 'border-blue-400 bg-blue-500 bg-opacity-20 shadow-lg scale-102' 
          : isEmpty 
            ? 'border-gray-500 bg-gray-700 bg-opacity-30' 
            : 'border-gray-600 bg-gray-700 bg-opacity-20'
        }
        ${className}
        min-h-20 flex items-center justify-center
      `}
    >
      {children}
    </div>
  );
}