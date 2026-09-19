import * as React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, X, User, Info } from 'lucide-react';

interface AnatomyMapProps {
  onClose: () => void;
}

export const AnatomyMap = ({ onClose }: AnatomyMapProps) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const anatomyParts = [
    { id: 'head', name: 'Cabeça', x: 50, y: 10 },
    { id: 'neck', name: 'Pescoço', x: 50, y: 18 },
    { id: 'shoulder_r', name: 'Ombro Direito', x: 35, y: 25 },
    { id: 'shoulder_l', name: 'Ombro Esquerdo', x: 65, y: 25 },
    { id: 'chest', name: 'Peito', x: 50, y: 30 },
    { id: 'spine_c', name: 'Coluna Cervical', x: 50, y: 22 },
    { id: 'spine_t', name: 'Coluna Torácica', x: 50, y: 35 },
    { id: 'spine_l', name: 'Coluna Lombar', x: 50, y: 45 },
    { id: 'hip_r', name: 'Anca Direita', x: 40, y: 55 },
    { id: 'hip_l', name: 'Anca Esquerda', x: 60, y: 55 },
    { id: 'knee_r', name: 'Joelho Direito', x: 40, y: 75 },
    { id: 'knee_l', name: 'Joelho Esquerdo', x: 60, y: 75 },
    { id: 'ankle_r', name: 'Tornozelo Direito', x: 40, y: 90 },
    { id: 'ankle_l', name: 'Tornozelo Esquerdo', x: 60, y: 90 },
  ];

  return (
    <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[80vh]"
      >
        <div className="bg-clinical-blue p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6" />
            <h3 className="font-bold">Mapa Anatómico Interativo</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          <div className="flex-1 relative bg-clinical-bg dark:bg-gray-900 p-8 flex items-center justify-center">
            <div className="relative w-64 h-[500px] border-2 border-clinical-border dark:border-gray-700 rounded-full bg-white dark:bg-gray-800/50 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <User className="w-full h-full" />
              </div>
              
              {anatomyParts.map(part => (
                <button 
                  key={part.id}
                  onClick={() => setSelectedPart(part.name)}
                  className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-md transition-all transform -translate-x-1/2 -translate-y-1/2 hover:scale-150 ${selectedPart === part.name ? 'bg-red-500 scale-150 z-10' : 'bg-clinical-blue'}`}
                  style={{ left: `${part.x}%`, top: `${part.y}%` }}
                  title={part.name}
                />
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-64 bg-white dark:bg-gray-800 border-l border-clinical-border dark:border-gray-700 p-6 overflow-y-auto">
            <h4 className="font-bold text-sm uppercase tracking-widest text-clinical-muted mb-4">Detalhes da Região</h4>
            {selectedPart ? (
              <div className="space-y-4">
                <div className="p-4 bg-clinical-blue/5 rounded-2xl border border-clinical-blue/20">
                  <p className="font-bold text-clinical-blue">{selectedPart}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-clinical-muted uppercase">Possíveis Patologias</p>
                  <ul className="text-xs space-y-1 dark:text-gray-300">
                    <li>• Inflamação local</li>
                    <li>• Lesão ligamentar</li>
                    <li>• Tensão muscular</li>
                  </ul>
                </div>
                <button className="w-full py-3 bg-clinical-blue text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all">
                  Ver Testes Específicos
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-clinical-muted">
                <Info className="w-8 h-8 mb-2 opacity-20" />
                <p className="text-xs">Selecione um ponto no mapa para ver detalhes anatómicos.</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Removed default export
