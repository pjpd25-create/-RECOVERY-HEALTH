import React, { useState } from 'react';
import { ClinicalCase, InterprofessionalRoleView } from '../types';
import { 
  Users, 
  Stethoscope, 
  HeartPulse, 
  Activity, 
  Pill, 
  Apple, 
  CheckCircle2, 
  MessageSquare, 
  ArrowRight,
  ClipboardList,
  Sparkles,
  Award
} from 'lucide-react';

interface InterprofessionalSimulatorProps {
  caseData: ClinicalCase;
  onComplete: (score: number) => void;
  onExit: () => void;
}

const ROLE_ICONS: Record<string, React.ReactNode> = {
  Stethoscope: <Stethoscope className="w-5 h-5" />,
  HeartPulse: <HeartPulse className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  Pill: <Pill className="w-5 h-5" />,
  Apple: <Apple className="w-5 h-5" />
};

export const InterprofessionalSimulator: React.FC<InterprofessionalSimulatorProps> = ({
  caseData,
  onComplete,
  onExit
}) => {
  const roles: InterprofessionalRoleView[] = caseData.interprofessionalRoles || [];
  const [activeRoleId, setActiveRoleId] = useState<string>(roles[0]?.roleId || 'med');
  const [completedRoles, setCompletedRoles] = useState<string[]>([]);
  const [roundDecisions, setRoundDecisions] = useState<Record<string, boolean>>({});
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showSummary, setShowSummary] = useState<boolean>(false);

  const activeRole = roles.find(r => r.roleId === activeRoleId) || roles[0];

  const handleToggleRoleCompleted = (roleId: string) => {
    if (!completedRoles.includes(roleId)) {
      setCompletedRoles(prev => [...prev, roleId]);
    }
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const stages = caseData?.stages || [];
  const currentStage = stages[currentStageIdx];

  const handleFinishRound = () => {
    setShowSummary(true);
  };

  if (showSummary) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center shadow-lg">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 mx-auto flex items-center justify-center mb-4">
          <Award className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Simulação Multiprofissional Concluída
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm max-w-lg mx-auto mt-2">
          Você analisou as perspetivas e competências interdisciplinares de {roles.length} profissões de saúde e consolidou o plano de cuidados conjunto.
        </p>

        <div className="my-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {roles.map(r => (
            <div key={r.roleId} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-left">
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                {r.roleName}
              </div>
              <div className="text-[11px] text-slate-500 mt-1 truncate">
                {r.responsibilities[0]}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-teal-50/50 dark:bg-teal-950/20 rounded-2xl border border-teal-200/50 dark:border-teal-900/40 text-left text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
          <strong className="text-teal-700 dark:text-teal-300 font-bold block mb-1">Competência de Comunicação Interprofissional Atingida:</strong>
          A integração da comunicação em alça fechada e respeito às atribuições privativas de cada profissão reduz em até 40% a ocorrência de eventos adversos na transição de cuidados críticos.
        </div>

        <button
          onClick={() => onComplete(150)}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold text-sm shadow-md hover:opacity-95"
        >
          Registrar no Portfólio de Competências
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            Mesa Redonda / Round Interdisciplinar
          </div>
          <h2 className="text-xl sm:text-2xl font-black">{caseData.title}</h2>
          <p className="text-slate-300 text-xs mt-1">
            Alterne entre os especialistas para ver achados específicos e unificar a tomada de decisão.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onExit}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all"
          >
            Sair da Mesa
          </button>
        </div>
      </div>

      {/* Role Navigation Bar */}
      <div className="p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {roles.map(role => {
          const isActive = activeRoleId === role.roleId;
          const isDone = completedRoles.includes(role.roleId);

          return (
            <button
              key={role.roleId}
              onClick={() => {
                setActiveRoleId(role.roleId);
                handleToggleRoleCompleted(role.roleId);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive 
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <span className={isActive ? 'text-teal-400 dark:text-teal-600' : 'text-slate-500'}>
                {ROLE_ICONS[role.iconName] || <Activity className="w-4 h-4" />}
              </span>
              <span>{role.roleName}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
            </button>
          );
        })}
      </div>

      {/* Role Specific Perspective & Findings */}
      {activeRole && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left panel: Perspective & Clinical Findings */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400">
                {ROLE_ICONS[activeRole.iconName] || <Activity className="w-6 h-6" />}
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Perspetiva Clínica</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">{activeRole.roleName}</div>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Achados Específicos da Categoria
              </div>
              <ul className="space-y-2">
                {activeRole.specificFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Atribuições e Responsabilidades
              </div>
              <ul className="space-y-2">
                {activeRole.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Panel: Integrated Plan of Care & Interactive Round Questions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  <ClipboardList className="w-4 h-4" />
                  Recomendações da {activeRole.roleName} para a Mesa
                </div>
                <span className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 rounded-full font-bold">
                  SBAR Format
                </span>
              </div>

              <div className="space-y-2.5">
                {activeRole.recommendedActions.map((action, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 text-xs font-medium text-slate-800 dark:text-slate-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 mt-0.5 shrink-0" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Questions for the round */}
            {currentStage && (
              <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Decisão Coletiva da Equipe
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  {currentStage.questions[0]?.text}
                </h4>

                <div className="space-y-2.5">
                  {currentStage.questions[0]?.options.map(opt => {
                    const isSelected = answers[currentStage.questions[0].id] === opt.id;
                    const isCorrect = opt.id === currentStage.questions[0].correctOption;
                    const showFeedback = !!answers[currentStage.questions[0].id];

                    return (
                      <button
                        key={opt.id}
                        disabled={showFeedback}
                        onClick={() => handleSelectOption(currentStage.questions[0].id, opt.id)}
                        className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-medium border transition-all flex items-start gap-3 ${
                          isSelected
                            ? isCorrect
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-500 dark:text-emerald-200'
                              : 'bg-rose-50 border-rose-500 text-rose-900 dark:bg-rose-950/40 dark:border-rose-500 dark:text-rose-200'
                            : showFeedback && isCorrect
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-300'
                            : 'border-slate-200 dark:border-slate-800 hover:border-teal-500/50 bg-slate-50/50 dark:bg-slate-800/40'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                          {opt.id}
                        </span>
                        <span className="flex-1">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {answers[currentStage.questions[0]?.id] && (
                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={handleFinishRound}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs shadow hover:opacity-90 transition-all"
                    >
                      Finalizar Round Interprofissional
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
