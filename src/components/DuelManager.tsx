import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Zap, Trophy, Search } from 'lucide-react';
import { DuelArena } from './DuelArena';

interface DuelManagerProps {
  duelStatus: 'idle' | 'searching' | 'playing' | 'finished';
  setDuelStatus: (status: 'idle' | 'searching' | 'playing' | 'finished') => void;
  activeDuel: any;
  socket: any;
  opponentScore: number;
  handleJoinDuel: () => void;
  setView: (view: any) => void;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  showAlert: (title: string, message: string) => void;
}

export const DuelManager: React.FC<DuelManagerProps> = ({
  duelStatus,
  setDuelStatus,
  activeDuel,
  socket,
  opponentScore,
  handleJoinDuel,
  setView,
  setUser,
  showAlert
}) => {
  return (
    <motion.div 
      key="duels"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-2xl mx-auto text-center"
    >
      <div className="flex items-center justify-between">
        <button onClick={() => setView('home')} className="flex items-center gap-2 text-clinical-blue font-bold">
          <ChevronLeft className="w-4 h-4" /> Voltar
        </button>
        <h2 className="text-2xl font-bold dark:text-white">Duelos 1v1 em Tempo Real</h2>
      </div>

      {duelStatus === 'idle' && (
        <div className="bg-white dark:bg-gray-800 p-12 rounded-[40px] border border-clinical-border dark:border-gray-700 shadow-xl space-y-8">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto text-purple-600">
            <Zap className="w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold dark:text-white">Arena de Desafios</h3>
            <p className="text-clinical-muted">Enfrente outros fisioterapeutas em tempo real. Quem responder mais rápido e corretamente ganha o dobro de pontos!</p>
          </div>
          <button 
            onClick={handleJoinDuel}
            className="w-full py-6 bg-purple-600 text-white rounded-3xl font-bold text-xl shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all flex items-center justify-center gap-3"
          >
            <Trophy className="w-6 h-6" /> Procurar Oponente
          </button>
        </div>
      )}

      {duelStatus === 'searching' && (
        <div className="bg-white dark:bg-gray-800 p-12 rounded-[40px] border border-clinical-border dark:border-gray-700 shadow-xl space-y-8">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-4 border-4 border-clinical-blue border-b-transparent rounded-full animate-spin [animation-duration:1.5s]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold dark:text-white">Procurando Oponente...</h3>
            <p className="text-clinical-muted italic">Aguardando que outro fisioterapeuta aceite o desafio.</p>
          </div>
          <button 
            onClick={() => {
              setDuelStatus('idle');
              // socket?.emit("leave_queue");
            }}
            className="text-clinical-muted hover:text-red-500 font-bold transition-colors"
          >
            Cancelar Procura
          </button>
        </div>
      )}

      {duelStatus === 'playing' && activeDuel && (
        <DuelArena 
          activeDuel={activeDuel}
          socket={socket!}
          onComplete={(finalScore) => {
            setDuelStatus('finished');
            if (finalScore > opponentScore) {
              // Winner gets bonus
              const bonus = 200;
              setUser((prev: any) => ({ ...prev, score: prev.score + bonus }));
              showAlert("Vitória!", `Vitória! Ganhou ${bonus} pontos de bónus.`);
            }
          }}
          onExit={() => setDuelStatus('idle')}
        />
      )}
    </motion.div>
  );
};
