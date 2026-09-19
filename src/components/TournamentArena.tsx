import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Users, 
  Timer, 
  Sword, 
  Shield, 
  Zap, 
  Star, 
  ChevronRight, 
  Loader2,
  Sparkles,
  Award,
  Calendar,
  X,
  Play
} from 'lucide-react';
import { UserProfile, ClinicalCase } from '../types';

interface TournamentArenaProps {
  user: UserProfile;
  onJoinDuel: () => void;
  onClose: () => void;
}

interface Tournament {
  id: string;
  title: string;
  description: string;
  startTime: string;
  participants: number;
  prize: string;
  status: 'upcoming' | 'live' | 'finished';
  category: string;
}

export const TournamentArena: React.FC<TournamentArenaProps> = ({ user, onJoinDuel, onClose }) => {
  const [activeTab, setActiveTab] = useState<'tournaments' | 'rankings' | 'rewards'>('tournaments');
  const [tournaments, setTournaments] = useState<Tournament[]>([
    {
      id: 't1',
      title: 'Grande Slam de Ortopedia',
      description: 'O maior torneio de diagnóstico ortopédico da semana.',
      startTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
      participants: 124,
      prize: '5000 XP + Badge Lendário',
      status: 'upcoming',
      category: 'Traumato-Ortopédica'
    },
    {
      id: 't2',
      title: 'Duelo de Titãs: Coluna Vertebral',
      description: 'Prove que é o mestre da reabilitação espinhal.',
      startTime: new Date(Date.now() - 1800000).toISOString(), // Started 30 mins ago
      participants: 89,
      prize: '2500 XP + Certificado Especial',
      status: 'live',
      category: 'Coluna Vertebral'
    },
    {
      id: 't3',
      title: 'Copa Geriátrica 2026',
      description: 'Foco em mobilidade e prevenção de quedas no idoso.',
      startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      participants: 45,
      prize: '1500 XP + Skin de Avatar',
      status: 'upcoming',
      category: 'Geriátrica'
    }
  ]);

  const rankings = [
    { rank: 1, name: 'Dr. João Silva', score: 15400, avatar: 'https://picsum.photos/seed/1/100/100' },
    { rank: 2, name: 'Ana Costa', score: 14200, avatar: 'https://picsum.photos/seed/2/100/100' },
    { rank: 3, name: 'Pedro Santos', score: 13800, avatar: 'https://picsum.photos/seed/3/100/100' },
    { rank: 4, name: user.name, score: user.score, avatar: user.avatar, isUser: true },
    { rank: 5, name: 'Maria Oliveira', score: 12500, avatar: 'https://picsum.photos/seed/5/100/100' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 w-full max-w-5xl h-[85vh] rounded-[40px] shadow-2xl flex flex-col overflow-hidden border border-white/20"
      >
        {/* Header */}
        <div className="p-8 border-b border-clinical-border dark:border-gray-800 bg-gradient-to-br from-clinical-blue to-purple-700 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Trophy className="w-48 h-48" />
          </div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-md border border-white/30 shadow-xl">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-black tracking-tight">Arena de Torneios</h2>
                <p className="text-white/70 font-bold uppercase tracking-widest text-xs mt-1">Competição Global em Tempo Real</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-3 hover:bg-white/10 rounded-2xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-8 mt-8 relative z-10">
            {[
              { id: 'tournaments', label: 'Torneios Ativos', icon: Calendar },
              { id: 'rankings', label: 'Ranking Global', icon: Award },
              { id: 'rewards', label: 'Recompensas', icon: Zap }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 pb-2 border-b-2 transition-all text-xs font-black uppercase tracking-widest ${activeTab === tab.id ? 'border-white text-white' : 'border-transparent text-white/50 hover:text-white/80'}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-gray-50 dark:bg-gray-950">
          <AnimatePresence mode="wait">
            {activeTab === 'tournaments' && (
              <motion.div 
                key="tournaments"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tournaments.map((t) => (
                    <motion.div
                      key={t.id}
                      whileHover={{ y: -5 }}
                      className="bg-white dark:bg-gray-800 p-6 rounded-[32px] border border-clinical-border dark:border-gray-700 shadow-sm relative overflow-hidden group"
                    >
                      {t.status === 'live' && (
                        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-red-500 text-white text-[8px] font-black uppercase tracking-widest rounded-full animate-pulse">
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          AO VIVO
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-clinical-blue/10 text-clinical-blue rounded-xl flex items-center justify-center">
                            <Sword className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-black dark:text-white">{t.title}</h4>
                            <p className="text-[10px] text-clinical-muted font-bold uppercase tracking-widest">{t.category}</p>
                          </div>
                        </div>
                        
                        <p className="text-xs text-clinical-muted font-bold leading-relaxed">{t.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100 dark:border-gray-700">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-clinical-blue" />
                            <span className="text-xs font-black dark:text-gray-300">{t.participants} Inscritos</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-clinical-green" />
                            <span className="text-xs font-black dark:text-gray-300">{t.prize}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 text-clinical-muted">
                            <Timer className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">
                              {t.status === 'live' ? 'Termina em 2h' : `Inicia em ${new Date(t.startTime).toLocaleTimeString()}`}
                            </span>
                          </div>
                          <button 
                            onClick={onJoinDuel}
                            className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${t.status === 'live' ? 'bg-clinical-blue text-white shadow-lg shadow-clinical-blue/20 hover:scale-105' : 'bg-gray-100 dark:bg-gray-700 text-clinical-muted hover:bg-gray-200'}`}
                          >
                            {t.status === 'live' ? 'Entrar Agora' : 'Inscrever-se'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'rankings' && (
              <motion.div 
                key="rankings"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="bg-white dark:bg-gray-800 rounded-[32px] border border-clinical-border dark:border-gray-700 overflow-hidden shadow-sm">
                  {rankings.map((entry, idx) => (
                    <div 
                      key={idx} 
                      className={`p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-700 last:border-0 ${entry.isUser ? 'bg-clinical-blue/5' : ''}`}
                    >
                      <div className="flex items-center gap-6">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${idx === 0 ? 'bg-yellow-400 text-white' : idx === 1 ? 'bg-gray-300 text-white' : idx === 2 ? 'bg-orange-400 text-white' : 'text-clinical-muted'}`}>
                          {entry.rank}
                        </div>
                        <div className="flex items-center gap-4">
                          <img src={entry.avatar || 'https://picsum.photos/seed/user/100/100'} alt={entry.name} className="w-12 h-12 rounded-2xl object-cover border-2 border-white dark:border-gray-700 shadow-sm" />
                          <div>
                            <h4 className="font-black dark:text-white flex items-center gap-2">
                              {entry.name}
                              {entry.isUser && <span className="px-2 py-0.5 bg-clinical-blue text-white text-[8px] font-black uppercase tracking-widest rounded-md">Tu</span>}
                            </h4>
                            <p className="text-[10px] text-clinical-muted font-bold uppercase tracking-widest">Mestre Clínico</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-black text-clinical-blue">{entry.score.toLocaleString()} pts</p>
                        <p className="text-[9px] text-clinical-muted font-bold uppercase tracking-widest">Pontuação Global</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'rewards' && (
              <motion.div 
                key="rewards"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {[
                  { title: 'Badge de Ouro', xp: '10,000 XP', icon: Award, color: 'text-yellow-500' },
                  { title: 'Skin Lendária', xp: '5,000 XP', icon: Zap, color: 'text-purple-500' },
                  { title: 'Certificado Pro', xp: '2,500 XP', icon: Shield, color: 'text-clinical-blue' }
                ].map((reward, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-[32px] border border-clinical-border dark:border-gray-700 shadow-sm text-center space-y-4 group">
                    <div className={`w-20 h-20 mx-auto bg-gray-50 dark:bg-gray-900 rounded-[24px] flex items-center justify-center transition-transform group-hover:scale-110 ${reward.color}`}>
                      <reward.icon className="w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="font-black dark:text-white">{reward.title}</h4>
                      <p className="text-[10px] text-clinical-muted font-bold uppercase tracking-widest">{reward.xp}</p>
                    </div>
                    <button className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-clinical-muted font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-gray-200 transition-all">
                      Resgatar
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Info */}
        <div className="p-8 border-t border-clinical-border dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://picsum.photos/seed/${i+10}/100/100`} className="w-10 h-10 rounded-xl border-4 border-white dark:border-gray-900 shadow-sm" />
              ))}
            </div>
            <p className="text-xs font-bold text-clinical-muted">
              <span className="text-clinical-blue font-black">+250 profissionais</span> online agora
            </p>
          </div>
          <button 
            onClick={onJoinDuel}
            className="px-10 py-4 bg-clinical-blue text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-clinical-blue/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
          >
            <Play className="w-4 h-4 fill-current" />
            Começar Duelo Rápido
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
