import React from 'react';
import { HEALTH_PROFESSIONS } from '../domain/healthEngine';
import { 
  Stethoscope, 
  HeartPulse, 
  Activity, 
  Pill, 
  Apple, 
  Brain, 
  Scan, 
  TestTube, 
  Sparkles,
  Check
} from 'lucide-react';

interface ProfessionSelectorProps {
  selectedProfession: string;
  onSelectProfession: (professionId: string) => void;
  compact?: boolean;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Stethoscope: <Stethoscope className="w-4 h-4" />,
  HeartPulse: <HeartPulse className="w-4 h-4" />,
  Activity: <Activity className="w-4 h-4" />,
  Pill: <Pill className="w-4 h-4" />,
  Apple: <Apple className="w-4 h-4" />,
  Brain: <Brain className="w-4 h-4" />,
  Scan: <Scan className="w-4 h-4" />,
  TestTube: <TestTube className="w-4 h-4" />
};

export const ProfessionSelector: React.FC<ProfessionSelectorProps> = ({
  selectedProfession,
  onSelectProfession,
  compact = false
}) => {
  return (
    <div className={`flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar ${compact ? 'py-1' : 'py-2'}`}>
      <button
        onClick={() => onSelectProfession('all')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
          selectedProfession === 'all'
            ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
        }`}
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Todas as Áreas</span>
      </button>

      {HEALTH_PROFESSIONS.map((prof) => {
        const isSelected = selectedProfession.toLowerCase() === prof.id.toLowerCase();
        return (
          <button
            key={prof.id}
            onClick={() => onSelectProfession(prof.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              isSelected
                ? 'text-white shadow-sm ring-2 ring-offset-1 dark:ring-offset-slate-900 ring-teal-500'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
            style={{
              backgroundColor: isSelected ? prof.color : undefined
            }}
          >
            <span className="opacity-90">{ICON_MAP[prof.iconName] || <Activity className="w-3.5 h-3.5" />}</span>
            <span>{prof.name}</span>
            {isSelected && <Check className="w-3 h-3 ml-0.5" />}
          </button>
        );
      })}
    </div>
  );
};

