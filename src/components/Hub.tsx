import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Stethoscope, 
  MessageCircle, 
  Users, 
  User, 
  Trophy, 
  ChevronRight, 
  BookOpen, 
  Activity, 
  Lock, 
  Library,
  GraduationCap,
  Building2,
  Briefcase,
  ShieldAlert,
  GitFork,
  HeartHandshake,
  Sparkles,
  Award,
  CheckCircle2
} from 'lucide-react';
import { UserProfile, View, Specialty } from '../types';
import { SPECIALTIES } from '../constants';
import { ProfessionSelector } from './ProfessionSelector';
import { HEALTH_PROFESSIONS } from '../domain/healthEngine';

interface HubProps {
  user: UserProfile;
  protectedSetView: (view: View) => void;
  setSelectedSpecialty: (spec: Specialty) => void;
  setSelectedCategory: (cat: string | null) => void;
  setView: (view: View) => void;
  isAdmin: boolean;
  onOpenCabinet: () => void;
}

export const Hub: React.FC<HubProps> = ({ 
  user, 
  protectedSetView, 
  setSelectedSpecialty, 
  setSelectedCategory, 
  setView,
  isAdmin,
  onOpenCabinet
}) => {
  const [selectedProfFilter, setSelectedProfFilter] = useState<string>('all');

  return (
    <motion.div 
      key="hub"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto space-y-10 py-8"
    >
      {/* Hero Welcome & Identity */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-900/50 text-teal-700 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> RECOVERY HEALTH • Plataforma Multiprofissional
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tight">
          Formação, Simulação & Desenvolvimento em <span className="text-teal-600 dark:text-teal-400">Saúde</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Olá, <strong className="text-slate-900 dark:text-white">{user.name}</strong>! Escolha uma área ou módulo para desenvolver competências clínicas essenciais.
        </p>
      </div>

      {/* Health Profession Filter Pills */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Navegar por Profissão de Saúde:
        </div>
        <ProfessionSelector 
          selectedProfession={selectedProfFilter}
          onSelectProfession={setSelectedProfFilter}
        />
      </div>

      {/* Main Specialized Modules Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Módulos de Formação & Simulação Clínica
          </h2>
          <span className="text-xs text-teal-600 dark:text-teal-400 font-bold">Diretrizes 2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* OSCE Simulator */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setView('osce')}
            className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-950 text-white text-left shadow-lg flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="space-y-3 relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md text-teal-300">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-teal-300 font-bold block">Avaliação Prática</span>
                <h3 className="text-xl font-black">Estações OSCE</h3>
                <p className="text-slate-300 text-xs mt-1">Exame Clínico Objetivo Estruturado com cronômetro e checklist.</p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-bold text-teal-300 relative z-10">
              <span>Praticar Estação</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>

          {/* Triage Simulator */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setView('triage')}
            className="p-6 rounded-3xl bg-gradient-to-br from-rose-900 via-red-900 to-rose-950 text-white text-left shadow-lg flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="space-y-3 relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md text-rose-300">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-rose-300 font-bold block">Emergência</span>
                <h3 className="text-xl font-black">Triagem Manchester</h3>
                <p className="text-slate-300 text-xs mt-1">Classificação de risco, discriminadores e metas temporais.</p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-bold text-rose-300 relative z-10">
              <span>Iniciar Triagem</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>

          {/* Internship Logbook */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setView('internship')}
            className="p-6 rounded-3xl bg-gradient-to-br from-teal-900 via-emerald-900 to-teal-950 text-white text-left shadow-lg flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="space-y-3 relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md text-emerald-300">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold block">Prática Clínica</span>
                <h3 className="text-xl font-black">Caderneta de Estágio</h3>
                <p className="text-slate-300 text-xs mt-1">Horas, registo de procedimentos e visto de supervisores.</p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-bold text-emerald-300 relative z-10">
              <span>Acessar Caderneta</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>

          {/* Teacher Suite */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setView('teacher')}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left shadow-md flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/60 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold block">Docência</span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Portal do Docente</h3>
                <p className="text-slate-500 text-xs mt-1">Crie turmas, aplique tarefas e acompanhe métricas de alunos.</p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <span>Gerenciar Turmas</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>

          {/* Institution Dashboard */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setView('institution')}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left shadow-md flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-teal-50 dark:bg-teal-950/60 rounded-2xl flex items-center justify-center text-teal-600 dark:text-teal-400">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-teal-600 dark:text-teal-400 font-bold block">Institucional</span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Painel da Reitoria</h3>
                <p className="text-slate-500 text-xs mt-1">Analytics multi-campus e relatórios para acreditação.</p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-bold text-teal-600 dark:text-teal-400">
              <span>Ver Relatórios</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>

          {/* Virtual AI Consultation */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => protectedSetView('virtual_consultation')}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left shadow-md flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/60 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold block">Anamnese IA</span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Teleconsulta Virtual</h3>
                <p className="text-slate-500 text-xs mt-1">Treine entrevistas clínicas com pacientes inteligentes.</p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
              <span>Iniciar Consulta</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Specialties & Clinical Cases Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Trilhas por Especialidade
          </h2>
          <span className="text-xs text-slate-400 font-semibold">Selecione para ver casos</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SPECIALTIES.map((spec) => {
            const isUnlocked = spec === 'Saúde Geral' || spec === user.specialty || isAdmin || true;
            
            return (
              <motion.button
                key={spec}
                whileHover={isUnlocked ? { scale: 1.03, y: -3 } : {}}
                whileTap={isUnlocked ? { scale: 0.97 } : {}}
                onClick={() => {
                  if (isUnlocked) {
                    setSelectedSpecialty(spec);
                    setSelectedCategory(null);
                    setView('categories');
                  }
                }}
                className="relative overflow-hidden group p-6 rounded-3xl text-left border shadow-sm transition-all border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-teal-500/60"
              >
                <div className="relative z-10 space-y-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 group-hover:bg-teal-600 group-hover:text-white transition-all">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">{spec}</h3>
                    <p className="text-slate-500 text-xs font-medium mt-0.5">
                      Casos clínicos e condutas baseadas em evidências
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400">
                    <span>Explorar casos</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* PedroJoaquim Cabinet Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-8 rounded-3xl bg-gradient-to-br from-amber-600 to-amber-700 text-white relative overflow-hidden group shadow-xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 group-hover:scale-110 transition-transform duration-1000" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">
              <Library className="w-3 h-3" /> Biblioteca Científica & Acervo Completo
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              Armário de <span className="text-amber-200">Elite</span>
            </h2>
            <p className="text-amber-100 text-sm max-w-xl">
              Aceda a milhares de obras científicas, diretrizes internacionais, tratados de anatomia e protocolos de conduta.
            </p>
          </div>
          <button 
            onClick={() => {
              onOpenCabinet();
              setView('library');
            }}
            className="px-8 py-4 bg-white text-amber-700 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-lg shrink-0"
          >
            Abrir Acervo
          </button>
        </div>
      </motion.div>

      {/* Bottom Nav Bar */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { id: 'social', title: 'Comunidade', icon: MessageCircle },
            { id: 'groups', title: 'Grupos de Estudo', icon: Users },
            { id: 'library', title: 'Evidências', icon: BookOpen },
            { id: 'leaderboard', title: 'Ranking', icon: Trophy },
            { id: 'profile', title: 'Meu Perfil', icon: User },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => protectedSetView(item.id as View)}
              className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col items-center gap-1.5 hover:border-teal-500 transition-all group"
            >
              <item.icon className="w-5 h-5 text-slate-400 group-hover:text-teal-600 transition-colors" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

