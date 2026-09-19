import React from 'react';
import { 
  Building2, 
  Users, 
  GraduationCap, 
  ShieldCheck, 
  TrendingUp, 
  FileSpreadsheet, 
  MapPin, 
  BookOpen,
  Award
} from 'lucide-react';

interface InstitutionDashboardProps {
  onBack: () => void;
}

export const InstitutionDashboard: React.FC<InstitutionDashboardProps> = ({ onBack }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            Painel Executivo Institucional & Reitoria
          </div>
          <h2 className="text-xl sm:text-2xl font-black">Centro Universitário de Ciências da Saúde</h2>
          <p className="text-slate-300 text-xs mt-1">
            Métricas multi-campus, relatórios para comissões de avaliação/acreditação e acompanhamento de egressos.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onBack}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all"
          >
            Voltar ao Hub
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-teal-600" />
            Total de Alunos Ativos
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">1.840</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">+14% neste semestre</div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            Cursos de Graduação
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">7 Áreas</div>
          <div className="text-[11px] text-slate-400 font-semibold mt-1">Medicina, Enfermagem, etc.</div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Simulações Realizadas
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">24.500+</div>
          <div className="text-[11px] text-teal-600 font-semibold mt-1">94% de taxa de conclusão</div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            Índice de Acreditação
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">Nota 4.9 / 5.0</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">Padrão Ouro Internacional</div>
        </div>
      </div>

      {/* Program Performance Breakdown */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Desempenho por Curso e Programa de Saúde</h3>
          <span className="text-xs text-slate-400 font-semibold">Atualizado em tempo real</span>
        </div>

        <div className="space-y-3">
          {[
            { name: 'Medicina Humana', students: 520, score: 89, color: 'bg-blue-600' },
            { name: 'Enfermagem Geral & Obstétrica', students: 440, score: 92, color: 'bg-emerald-600' },
            { name: 'Fisioterapia & Reabilitação', students: 310, score: 91, color: 'bg-teal-600' },
            { name: 'Ciências Farmacêuticas', students: 240, score: 86, color: 'bg-purple-600' },
            { name: 'Nutrição & Dietética', students: 190, score: 88, color: 'bg-amber-600' },
            { name: 'Psicologia Clínica & Saúde Mental', students: 140, score: 93, color: 'bg-rose-600' }
          ].map((prog, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${prog.color}`} />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{prog.name}</div>
                  <div className="text-[11px] text-slate-500">{prog.students} Estudantes Matriculados</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-32 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`${prog.color} h-full rounded-full`}
                    style={{ width: `${prog.score}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-white w-12 text-right">
                  {prog.score}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
