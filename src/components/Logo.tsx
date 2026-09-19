import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showSubtitle = true }) => {
  const isLarge = size === 'lg';
  const isSmall = size === 'sm';

  return (
    <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-teal-500 text-white shadow-sm shrink-0 ${
        isLarge ? 'w-10 h-10 sm:w-11 sm:h-11' : isSmall ? 'w-7 h-7' : 'w-8 h-8 sm:w-9 sm:h-9'
      }`}>
        <Activity className={isLarge ? 'w-5 h-5 sm:w-6 sm:h-6' : isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4 sm:w-5 sm:h-5'} />
        <div className="absolute -bottom-0.5 -right-0.5 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-900" />
      </div>
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
          <span className={`font-black tracking-tight text-slate-900 dark:text-white font-display ${
            isLarge ? 'text-xl sm:text-2xl' : isSmall ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
          }`}>
            RECOVERY
          </span>
          <span className={`font-bold text-teal-600 dark:text-teal-400 ${
            isLarge ? 'text-xl sm:text-2xl' : isSmall ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
          }`}>
            HEALTH
          </span>
        </div>
        {showSubtitle && !isSmall && (
          <span className="hidden sm:block text-[9px] sm:text-[10px] uppercase font-semibold tracking-wider text-slate-600 dark:text-slate-300 mt-0.5 truncate">
            Plataforma Inteligente de Saúde
          </span>
        )}
      </div>
    </div>
  );
};


