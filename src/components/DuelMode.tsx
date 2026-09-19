import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Users,
  Swords,
  Trophy,
  Activity,
  AlertCircle
} from 'lucide-react';
import { UserProfile } from '../types';

interface DuelModeProps {
  user: UserProfile;
  onBack: () => void;
}

export const DuelMode = ({ user, onBack }: DuelModeProps) => {
  const [duelState, setDuelState] = useState<'searching' | 'found' | 'playing' | 'finished'>('searching');
  const [opponent, setOpponent] = useState<any>(null);

  useEffect(() => {
    if (duelState === 'searching') {
      const timer = setTimeout(() => {
        setOpponent({
          name: 'Dr. Silva',
          level: user.level + Math.floor(Math.random() * 3),
          score: Math.floor(user.score * 0.9)
        });
        setDuelState('found');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [duelState, user.level, user.score]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-clinical-blue font-bold">
          <ChevronLeft className="w-4 h-4" /> Sair do Duelo
        </button>
        <h2 className="text-2xl font-bold dark:text-white">Duelo 1v1</h2>
      </div>

      <AnimatePresence mode="wait">
        {duelState === 'searching' && (
          <motion.div 
            key="searching"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="bg-white dark:bg-gray-800 p-12 rounded-3xl border border-clinical-border dark:border-gray-700 text-center space-y-8"
          >
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 border-4 border-clinical-blue border-t-transparent rounded-full animate-spin" />
              <div className="absolute inset-4 bg-clinical-blue/10 rounded-full flex items-center justify-center">
                <Users className="w-12 h-12 text-clinical-blue" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold dark:text-white">Procurando Oponente...</h3>
              <p className="text-clinical-muted">A encontrar um fisioterapeuta ao teu nível.</p>
            </div>
          </motion.div>
        )}

        {duelState === 'found' && (
          <motion.div 
            key="found"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
          >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 text-center space-y-4">
              <div className="w-20 h-20 bg-clinical-blue text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                {user.name ? user.name[0] : 'U'}
              </div>
              <div>
                <h4 className="font-bold dark:text-white">{user.name || 'Tu'}</h4>
                <p className="text-sm text-clinical-muted">Nível {user.level}</p>
              </div>
            </div>

            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-red-500 text-white rounded-2xl flex items-center justify-center mx-auto rotate-45 shadow-lg shadow-red-200">
                <Swords className="w-8 h-8 -rotate-45" />
              </div>
              <button 
                onClick={() => setDuelState('playing')}
                className="px-8 py-4 bg-clinical-blue text-white rounded-2xl font-bold shadow-xl hover:bg-blue-600 transition-all"
              >
                Começar Duelo
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 text-center space-y-4">
              <div className="w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                {opponent?.name[0]}
              </div>
              <div>
                <h4 className="font-bold dark:text-white">{opponent?.name}</h4>
                <p className="text-sm text-clinical-muted">Nível {opponent?.level}</p>
              </div>
            </div>
          </motion.div>
        )}

        {duelState === 'playing' && (
          <motion.div 
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-clinical-muted italic">Simulação de Duelo em desenvolvimento...</p>
            <button 
              onClick={() => setDuelState('finished')}
              className="mt-8 px-6 py-2 bg-clinical-blue text-white rounded-xl"
            >
              Simular Fim
            </button>
          </motion.div>
        )}

        {duelState === 'finished' && (
          <motion.div 
            key="finished"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 p-12 rounded-3xl border border-clinical-border dark:border-gray-700 text-center space-y-8"
          >
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold dark:text-white">Vitória!</h3>
              <p className="text-clinical-muted">Ganhaste +50 pontos de bónus.</p>
            </div>
            <button 
              onClick={onBack}
              className="px-8 py-4 bg-clinical-blue text-white rounded-2xl font-bold shadow-xl hover:bg-blue-600 transition-all"
            >
              Voltar ao Menu
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Removed default export
