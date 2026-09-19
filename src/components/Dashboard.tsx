import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, Clock, Trophy, Target, 
  TrendingUp, Star, Zap, Activity, 
  BookOpen, Users, MessageSquare, Award
} from 'lucide-react';
import { UserProfile, ClinicalCase } from '../types';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

interface DashboardProps {
  user: UserProfile;
  cases: ClinicalCase[];
  onAction: (action: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, cases, onAction }) => {
  const solvedCasesCount = user.progress?.length || 0;
  const totalCasesCount = cases.length;
  const progressPercentage = totalCasesCount > 0 ? Math.round((solvedCasesCount / totalCasesCount) * 100) : 0;
  
  const stats = [
    { label: 'Casos Resolvidos', value: solvedCasesCount, icon: <CheckCircle2 className="w-5 h-5 text-green-500" />, color: 'bg-green-50' },
    { label: 'Nível Atual', value: user.level, icon: <Trophy className="w-5 h-5 text-yellow-500" />, color: 'bg-yellow-50' },
    { label: 'Pontuação Total', value: user.score, icon: <Star className="w-5 h-5 text-blue-500" />, color: 'bg-blue-50' },
    { label: 'Streak Diário', value: `${user.streak} dias`, icon: <Zap className="w-5 h-5 text-orange-500" />, color: 'bg-orange-50' },
  ];

  const missions = [
    { id: '1', title: 'Primeiro Diagnóstico', description: 'Resolve o teu primeiro caso clínico com sucesso.', progress: user.progress?.length > 0 ? 100 : 0, reward: 100 },
    { id: '2', title: 'Mestre da Anatomia', description: 'Completa 5 desafios de anatomia sem erros.', progress: 60, reward: 250 },
    { id: '3', title: 'Comunicador Nato', description: 'Participa em 10 discussões na comunidade.', progress: 30, reward: 150 },
    { id: '4', title: 'Estudioso Serial', description: 'Mantém um streak de 7 dias consecutivos.', progress: Math.min((user.streak / 7) * 100, 100), reward: 500 },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-3"
          >
            <div className={`w-10 h-10 rounded-2xl ${stat.color} dark:bg-gray-700 flex items-center justify-center`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] text-clinical-muted uppercase tracking-wider font-bold">{stat.label}</p>
              <h3 className="text-xl font-black dark:text-white">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-bold flex items-center gap-2 dark:text-white">
              <TrendingUp className="w-5 h-5 text-clinical-blue" /> Evolução de Pontuação
            </h4>
            <select className="bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-3 py-1 text-xs font-bold outline-none dark:text-white">
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={user.scoreHistory || []}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8' }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#2563eb" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* General Progress */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-6">
          <h4 className="font-bold flex items-center gap-2 dark:text-white">
            <Target className="w-5 h-5 text-clinical-blue" /> Progresso Geral
          </h4>
          
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    className="text-gray-100 dark:text-gray-700 stroke-current"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-clinical-blue stroke-current"
                    strokeWidth="3"
                    strokeDasharray={`${progressPercentage}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black dark:text-white">{progressPercentage}%</span>
                  <span className="text-[8px] text-clinical-muted uppercase font-bold">Concluído</span>
                </div>
              </div>
              <p className="text-xs text-center text-clinical-muted px-4">
                Já resolveste <span className="text-clinical-blue font-bold">{solvedCasesCount}</span> de <span className="font-bold">{totalCasesCount}</span> casos clínicos disponíveis.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-50 dark:border-gray-700">
              <div className="flex items-center justify-between text-xs">
                <span className="text-clinical-muted font-medium">Progresso para Nível {user.level + 1}</span>
                <span className="font-bold dark:text-white">{user.score % 1000} / 1000</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(user.score % 1000) / 10}%` }}
                  className="h-full bg-clinical-blue"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Missions */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="font-bold flex items-center gap-2 dark:text-white">
            <Award className="w-5 h-5 text-clinical-blue" /> Missões Ativas
          </h4>
          <button className="text-xs text-clinical-blue font-bold hover:underline">Ver todas</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {missions.map((mission) => (
            <div key={mission.id} className="p-4 rounded-2xl border border-gray-50 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-bold dark:text-white">{mission.title}</h5>
                <span className="text-[10px] font-bold text-clinical-blue bg-clinical-blue/10 px-2 py-1 rounded-lg">+{mission.reward} XP</span>
              </div>
              <p className="text-[11px] text-clinical-muted leading-relaxed">{mission.description}</p>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-clinical-muted">Progresso</span>
                  <span className="dark:text-white">{mission.progress}%</span>
                </div>
                <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${mission.progress}%` }}
                    className="h-full bg-clinical-blue"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
