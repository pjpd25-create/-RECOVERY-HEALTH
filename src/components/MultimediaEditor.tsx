import * as React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Multimedia } from '../types';

interface MultimediaEditorProps {
  items: Multimedia[];
  onChange: (items: Multimedia[]) => void;
}

export const MultimediaEditor = ({ items, onChange }: MultimediaEditorProps) => {
  const handleAdd = () => {
    onChange([...items, { type: 'image', url: '', title: '', description: '' }]);
  };

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number, field: keyof Multimedia, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange(newItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-clinical-muted uppercase tracking-widest">Multimédia (Imagens/Vídeos)</label>
        <button onClick={handleAdd} className="text-xs font-bold text-clinical-blue hover:underline flex items-center gap-1">
          <Plus className="w-3 h-3" /> Adicionar
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-clinical-border dark:border-gray-700 space-y-2">
            <div className="flex items-center gap-2">
              <select 
                value={item.type}
                onChange={(e) => handleUpdate(idx, 'type', e.target.value as any)}
                className="px-2 py-1 rounded-lg border border-clinical-border dark:bg-gray-900 dark:text-white text-xs outline-none"
              >
                <option value="image">Imagem</option>
                <option value="video">Vídeo</option>
              </select>
              <input 
                type="text" 
                value={item.url}
                onChange={(e) => handleUpdate(idx, 'url', e.target.value)}
                placeholder="URL do ficheiro"
                className="flex-grow px-2 py-1 rounded-lg border border-clinical-border dark:bg-gray-900 dark:text-white text-xs outline-none"
              />
              <button onClick={() => handleRemove(idx)} className="p-1 text-red-500 hover:bg-red-50 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input 
                type="text" 
                value={item.title}
                onChange={(e) => handleUpdate(idx, 'title', e.target.value)}
                placeholder="Título"
                className="px-2 py-1 rounded-lg border border-clinical-border dark:bg-gray-900 dark:text-white text-xs outline-none"
              />
              <input 
                type="text" 
                value={item.description}
                onChange={(e) => handleUpdate(idx, 'description', e.target.value)}
                placeholder="Descrição"
                className="px-2 py-1 rounded-lg border border-clinical-border dark:bg-gray-900 dark:text-white text-xs outline-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Removed default export
