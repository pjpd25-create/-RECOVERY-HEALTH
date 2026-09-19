import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { UserProfile } from '../types';

interface LeaderboardProps {
  leaderboard: any[];
  user: UserProfile;
  setView: (view: any) => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard, user, setView }) => {
  return (
    <motion.div 
      key="leaderboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between">
        <button onClick={() => setView('profile')} className="flex items-center gap-2 text-clinical-blue font-bold">
          <ChevronLeft className="w-4 h-4" /> Voltar ao Perfil
        </button>
        <h2 className="text-2xl font-bold dark:text-white">Ranking Global</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-900 border-b border-clinical-border dark:border-gray-700">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-clinical-muted uppercase tracking-widest">Posição</th>
              <th className="px-6 py-4 text-xs font-bold text-clinical-muted uppercase tracking-widest">Utilizador</th>
              <th className="px-6 py-4 text-xs font-bold text-clinical-muted uppercase tracking-widest">Nível</th>
              <th className="px-6 py-4 text-xs font-bold text-clinical-muted uppercase tracking-widest">Casos</th>
              <th className="px-6 py-4 text-xs font-bold text-clinical-muted uppercase tracking-widest">Pontuação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {(leaderboard || []).map((entry, idx) => (
              <tr key={idx} className={entry.name === user?.name ? 'bg-clinical-blue/5' : ''}>
                <td className="px-6 py-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    idx === 0 ? 'bg-yellow-400 text-white' : 
                    idx === 1 ? 'bg-gray-300 text-white' : 
                    idx === 2 ? 'bg-amber-600 text-white' : 
                    'text-clinical-muted'
                  }`}>
                    {idx + 1}
                  </div>
                </td>
                <td className="px-6 py-4 font-bold dark:text-white">{entry.name}</td>
                <td className="px-6 py-4 text-clinical-muted">{entry.level}</td>
                <td className="px-6 py-4 text-clinical-muted">{entry.completedCases}</td>
                <td className="px-6 py-4 font-display font-bold text-clinical-blue">{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
