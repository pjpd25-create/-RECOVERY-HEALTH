import React from 'react';
import { motion } from 'motion/react';
import { 
  Activity, ChevronRight, LogIn, ShieldCheck, Star, Trophy, 
  BookOpen, Stethoscope, Swords 
} from 'lucide-react';
import { UserProfile, ClinicalCase } from '../types';

interface HomeProps {
  user: UserProfile;
  coverImageGlobal: string;
  protectedSetView: (view: any) => void;
  setView: (view: any) => void;
  handleGoogleLogin: () => void;
  isAdmin: boolean;
  allCases: ClinicalCase[];
  handleStartCase: (c: ClinicalCase) => void;
}

export const Home: React.FC<HomeProps> = ({
  user,
  coverImageGlobal,
  protectedSetView,
  setView,
  handleGoogleLogin,
  isAdmin,
  allCases,
  handleStartCase
}) => {
  return (
    <motion.div 
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-16"
    >
      <section className="relative min-h-[90vh] py-16 md:py-24 -mt-8 flex items-center justify-center text-center px-4 md:px-12 rounded-b-[40px] md:rounded-b-[100px] shadow-2xl overflow-visible">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110"
          style={{ backgroundImage: `url(${coverImageGlobal})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-clinical-blue/60 via-clinical-text/80 to-clinical-text"></div>
        </div>
        
        <div className="relative z-20 space-y-8 md:space-y-12 w-full max-w-5xl mx-auto px-2">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="bg-white/10 backdrop-blur-md p-5 sm:p-8 md:p-12 rounded-[28px] sm:rounded-[40px] md:rounded-[60px] border border-white/20 shadow-2xl w-full max-w-4xl mx-auto">
              <div className="flex flex-col items-center gap-3 sm:gap-6 text-white text-center">
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 flex items-center justify-center bg-clinical-green/20 rounded-2xl md:rounded-[32px] border border-clinical-green/30">
                  <Activity className="w-6 h-6 sm:w-10 sm:h-10 md:w-14 md:h-14 text-clinical-green" />
                </div>
                <div className="space-y-2 max-w-full">
                  <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black tracking-tight uppercase leading-tight break-words px-1 max-w-full">
                    RECOVERY <span className="text-clinical-green">HEALTH</span>
                  </h1>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-4 px-2 sm:px-6">
            <p className="text-white/95 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto font-medium drop-shadow-md leading-relaxed break-words">
              Domine a prática clínica, aprimore o seu raciocínio e tome decisões que transformam vidas.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4 pt-1 px-1">
            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4 w-full max-w-2xl">
              {user.email ? (
                <>
                  <button 
                    onClick={() => protectedSetView('categories')}
                    className="flex-1 min-w-[140px] sm:min-w-[180px] px-4 py-3 sm:px-8 sm:py-4 bg-clinical-green text-white rounded-2xl font-black text-sm sm:text-lg shadow-xl shadow-clinical-green/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                  >
                    INICIAR MISSÃO 
                    <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => protectedSetView('profile')}
                    className="flex-1 min-w-[100px] sm:min-w-[140px] px-4 py-3 sm:px-8 sm:py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-2xl font-bold text-sm sm:text-lg hover:bg-white/20 transition-all text-center"
                  >
                    Perfil
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setView('login')}
                    className="flex-1 min-w-[110px] sm:min-w-[140px] px-4 py-3 sm:px-6 sm:py-4 bg-clinical-blue text-white rounded-2xl font-black text-sm sm:text-lg shadow-xl shadow-clinical-blue/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 group"
                  >
                    ENTRAR <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button 
                    onClick={() => setView('register')}
                    className="flex-1 min-w-[110px] sm:min-w-[140px] px-4 py-3 sm:px-6 sm:py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-2xl font-bold text-sm sm:text-lg hover:bg-white/20 transition-all text-center"
                  >
                    REGISTAR
                  </button>
                  <button 
                    onClick={handleGoogleLogin}
                    className="flex-1 min-w-[120px] sm:min-w-[140px] px-4 py-3 sm:px-6 sm:py-4 bg-white text-clinical-dark rounded-2xl font-bold text-sm sm:text-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <img src="https://www.google.com/favicon.ico" className="w-4 h-4 sm:w-5 sm:h-5" alt="Google" referrerPolicy="no-referrer" />
                    GOOGLE
                  </button>
                </>
              )}
              {isAdmin && (
                <button 
                  onClick={() => protectedSetView('admin')}
                  className="w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-4 bg-red-600/20 backdrop-blur-md border border-red-600/30 text-white rounded-2xl font-bold text-sm sm:text-lg hover:bg-red-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 sm:w-6 sm:h-6" /> Admin
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Case of the Week */}
        <div className="bg-gradient-to-r from-clinical-blue to-blue-800 rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <img 
              src="https://picsum.photos/seed/medical-tech/800/600" 
              alt="Background" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold uppercase tracking-widest">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> Caso da Semana
              </div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                Trauma Complexo de Joelho em Atleta de Elite
              </h2>
              <p className="text-lg text-white/80 leading-relaxed max-w-xl">
                Desafie o seu raciocínio clínico com este caso real de rotura multiligamentar. Avalie a biomecânica, defina o diagnóstico diferencial e planeie a reabilitação pós-cirúrgica.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-black/20 rounded-xl text-sm">
                  <Trophy className="w-4 h-4 text-yellow-400" /> +500 XP Extra
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-black/20 rounded-xl text-sm">
                  <Activity className="w-4 h-4 text-clinical-green" /> Nível Difícil
                </div>
              </div>
              <button 
                onClick={() => {
                  const featuredCase = allCases.find(c => c.difficulty === 'Difícil') || allCases[0];
                  handleStartCase(featuredCase);
                }}
                className="px-8 py-4 bg-white text-clinical-blue rounded-2xl font-black text-lg hover:bg-blue-50 transition-all shadow-xl flex items-center gap-2"
              >
                ACEITAR DESAFIO <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <div className="hidden lg:block">
              <div className="relative group">
                <div className="absolute -inset-4 bg-white/10 rounded-[40px] blur-2xl group-hover:bg-white/20 transition-all"></div>
                <img 
                  src="https://picsum.photos/seed/knee-trauma/600/400" 
                  alt="Featured Case" 
                  className="relative rounded-[32px] shadow-2xl border border-white/20 object-cover w-full aspect-[3/2]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Paciente</p>
                      <p className="font-bold text-lg">Ricardo S., 24 anos</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Especialidade</p>
                      <p className="font-bold text-lg">Desportiva</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <button 
            onClick={() => protectedSetView('categories')}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-clinical-border dark:border-gray-700 space-y-3 shadow-sm hover:shadow-md transition-all text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-clinical-blue group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg dark:text-white">Casos Reais</h3>
            <p className="text-sm text-clinical-muted">Simulações baseadas em evidências científicas e prática hospitalar.</p>
          </button>
          <button 
            onClick={() => protectedSetView('categories')}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-clinical-border dark:border-gray-700 space-y-3 shadow-sm hover:shadow-md transition-all text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-clinical-green group-hover:scale-110 transition-transform">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg dark:text-white">Raciocínio Clínico</h3>
            <p className="text-sm text-clinical-muted">Avalie, diagnostique e trate pacientes com precisão técnica.</p>
          </button>
          <button 
            onClick={() => protectedSetView('leaderboard')}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-clinical-border dark:border-gray-700 space-y-3 shadow-sm hover:shadow-md transition-all text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg dark:text-white">Ranking Global</h3>
            <p className="text-sm text-clinical-muted">Compare o seu desempenho com outros profissionais da área.</p>
          </button>
          <button 
            onClick={() => protectedSetView('duels')}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl border-2 border-clinical-blue/30 bg-clinical-blue/5 p-6 space-y-3 shadow-sm hover:shadow-md transition-all text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-clinical-blue/10 flex items-center justify-center text-clinical-blue group-hover:scale-110 transition-transform">
              <Swords className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg dark:text-white">Modo Duelo 1v1</h3>
            <p className="text-sm text-clinical-muted">Desafie outros profissionais de saúde em tempo real e prove o seu valor.</p>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
