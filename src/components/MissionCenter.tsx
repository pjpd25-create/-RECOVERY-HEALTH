import React from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  BookOpen, 
  Users, 
  GraduationCap, 
  User, 
  Terminal,
  ArrowRight,
  Target,
  Trophy,
  Zap
} from 'lucide-react';
import { UserProfile } from '../types';

interface MissionCenterProps {
  user: UserProfile;
  onAction: (action: string) => void;
}

export const MissionCenter: React.FC<MissionCenterProps> = ({ user, onAction }) => {
  const missions = [
    {
      id: 'start',
      title: 'Começar',
      description: 'Inicie a sua jornada de aprendizagem guiada.',
      icon: Play,
      color: 'bg-blue-500',
      action: 'home'
    },
    {
      id: 'cases',
      title: 'Casos Clínicos',
      description: 'Resolva casos reais e teste os seus diagnósticos.',
      icon: BookOpen,
      color: 'bg-emerald-500',
      action: 'categories'
    },
    {
      id: 'community',
      title: 'Comunidade',
      description: 'Interaja com outros profissionais e estudantes.',
      icon: Users,
      color: 'bg-purple-500',
      action: 'social'
    },
    {
      id: 'groups',
      title: 'Grupos de Estudo',
      description: 'Participe em grupos focados em temas específicos.',
      icon: GraduationCap,
      color: 'bg-orange-500',
      action: 'groups'
    },
    {
      id: 'profile',
      title: 'Perfil',
      description: 'Veja o seu progresso, conquistas e certificados.',
      icon: User,
      color: 'bg-indigo-500',
      action: 'profile'
    },
    {
      id: 'advanced',
      title: 'Hackers / Desafios',
      description: 'Aprendizagem avançada e desafios de alto nível.',
      icon: Terminal,
      color: 'bg-red-500',
      action: 'advanced'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-black text-clinical-dark mb-4 flex items-center gap-3">
          <Target className="w-10 h-10 text-clinical-blue" />
          Central de Missões 🎯
        </h1>
        <p className="text-clinical-muted text-lg max-w-2xl">
          Bem-vindo de volta, <span className="text-clinical-blue font-bold">{user.name}</span>! 
          Escolha a sua próxima missão e continue a sua evolução na saúde.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {missions.map((mission, index) => (
          <motion.button
            key={mission.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onAction(mission.action)}
            className="group relative bg-white p-8 rounded-3xl border-2 border-transparent hover:border-clinical-blue transition-all duration-300 text-left shadow-xl shadow-gray-200/50 overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${mission.color} opacity-5 -mr-8 -mt-8 rounded-full group-hover:scale-150 transition-transform duration-500`} />
            
            <div className={`${mission.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-current/20 group-hover:scale-110 transition-transform`}>
              <mission.icon className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-clinical-dark mb-2 group-hover:text-clinical-blue transition-colors">
              {mission.title}
            </h3>
            <p className="text-clinical-muted mb-6">
              {mission.description}
            </p>

            <div className="flex items-center gap-2 text-clinical-blue font-bold group-hover:translate-x-2 transition-transform">
              Entrar na Missão
              <ArrowRight className="w-5 h-5" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Stats Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-16 bg-clinical-dark rounded-3xl p-8 text-white flex flex-wrap items-center justify-around gap-8"
      >
        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-4 rounded-2xl">
            <Zap className="w-8 h-8 text-yellow-400" />
          </div>
          <div>
            <div className="text-3xl font-black">{user.level}</div>
            <div className="text-white/60 text-sm uppercase tracking-wider font-bold">Nível Atual</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-4 rounded-2xl">
            <Trophy className="w-8 h-8 text-clinical-blue" />
          </div>
          <div>
            <div className="text-3xl font-black">{user.score}</div>
            <div className="text-white/60 text-sm uppercase tracking-wider font-bold">Pontos Totais</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-4 rounded-2xl">
            <Users className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <div className="text-3xl font-black">{user.friends?.length || 0}</div>
            <div className="text-white/60 text-sm uppercase tracking-wider font-bold">Conexões</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
