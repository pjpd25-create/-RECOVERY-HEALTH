import * as React from 'react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Multimedia } from '../types';

export function MultimediaViewer({ items }: { items: Multimedia[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const current = items[currentIndex];

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-clinical-border group">
        {current.type === 'image' ? (
          <img 
            src={current.url} 
            alt={current.title} 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        ) : (
          <video 
            src={current.url} 
            controls 
            className="w-full h-full object-contain"
          />
        )}
        
        {items.length > 1 && (
          <>
            <button 
              onClick={() => setCurrentIndex(prev => (prev > 0 ? prev - 1 : items.length - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setCurrentIndex(prev => (prev < items.length - 1 ? prev + 1 : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
      <div className="flex items-center justify-between px-2">
        <div className="space-y-1">
          <p className="text-sm font-bold text-clinical-text">{current.title}</p>
          <p className="text-xs text-clinical-muted italic">{current.description}</p>
        </div>
        {items.length > 1 && (
          <p className="text-xs font-bold text-clinical-muted uppercase tracking-widest">
            {currentIndex + 1} / {items.length}
          </p>
        )}
      </div>
    </div>
  );
}
