import React from 'react';
import { LogOut, Activity } from 'lucide-react';

interface FooterProps {
  onLogout: () => void;
  userEmail?: string;
}

export const Footer: React.FC<FooterProps> = ({ onLogout, userEmail }) => (
  <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 sm:py-10 mt-12 sm:mt-16 w-full">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
      <div className="flex flex-col items-center md:items-start gap-1.5 w-full md:w-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-md shrink-0">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="text-base sm:text-lg font-black tracking-tight dark:text-white">
            RECOVERY <span className="text-teal-600 dark:text-teal-400">HEALTH</span>
          </span>
        </div>
        <p className="text-xs text-slate-500 max-w-md break-words">
          Plataforma Inteligente de Formação, Simulação e Desenvolvimento em Ciências da Saúde.
        </p>
      </div>
      
      <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
        {userEmail && (
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3">
            <span className="text-xs font-semibold text-slate-400 truncate max-w-[200px] sm:max-w-none">{userEmail}</span>
            <button 
              onClick={onLogout}
              className="flex items-center gap-1.5 text-rose-500 hover:text-rose-600 font-bold text-xs transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Terminar Sessão
            </button>
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs font-semibold text-slate-500">
          <a href="#" className="hover:text-teal-600 transition-colors">Termos de Uso</a>
          <a href="#" className="hover:text-teal-600 transition-colors">Privacidade Clínica</a>
          <a href="#" className="hover:text-teal-600 transition-colors">Suporte Institucional</a>
        </div>
        <p className="text-[11px] text-slate-400 text-center md:text-right">© 2026 RECOVERY HEALTH. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
);

