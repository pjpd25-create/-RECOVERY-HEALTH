import React, { useState } from 'react';
import { ClinicalCase, BranchNode, BranchDecisionChoice } from '../types';
import { 
  Heart, 
  Activity, 
  Wind, 
  Droplet, 
  Thermometer, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Award,
  AlertTriangle,
  FileText,
  User
} from 'lucide-react';

interface BranchedCaseSimulatorProps {
  caseData: ClinicalCase;
  onComplete: (score: number, passed: boolean) => void;
  onExit: () => void;
}

export const BranchedCaseSimulator: React.FC<BranchedCaseSimulatorProps> = ({
  caseData,
  onComplete,
  onExit
}) => {
  const initialNodeId = caseData.branchNodeInitialId || (caseData.branchNodes ? Object.keys(caseData.branchNodes)[0] : '');
  const [currentNodeId, setCurrentNodeId] = useState<string>(initialNodeId);
  const [historyNodes, setHistoryNodes] = useState<{ node: BranchNode; chosenOption: BranchDecisionChoice }[]>([]);
  const [totalScore, setTotalScore] = useState<number>(100);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [lastChoice, setLastChoice] = useState<BranchDecisionChoice | null>(null);

  const currentNode: BranchNode | undefined = caseData.branchNodes?.[currentNodeId];

  const handleSelectChoice = (choice: BranchDecisionChoice) => {
    setSelectedChoiceId(choice.id);
    setLastChoice(choice);
    setShowExplanation(true);
  };

  const handleProceedToNextNode = () => {
    if (!lastChoice || !currentNode) return;

    setTotalScore(prev => Math.max(0, Math.min(200, prev + lastChoice.scoreDelta)));
    setHistoryNodes(prev => [...prev, { node: currentNode, chosenOption: lastChoice }]);
    
    setCurrentNodeId(lastChoice.nextNodeId);
    setSelectedChoiceId(null);
    setShowExplanation(false);
    setLastChoice(null);
  };

  const handleRestart = () => {
    setCurrentNodeId(initialNodeId);
    setHistoryNodes([]);
    setTotalScore(100);
    setSelectedChoiceId(null);
    setShowExplanation(false);
    setLastChoice(null);
  };

  if (!currentNode) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Cenário Ramificado Não Configurado</h3>
        <p className="text-slate-500 text-sm mt-2">Não foi possível carregar os nós da árvore de decisão deste caso.</p>
        <button 
          onClick={onExit}
          className="mt-6 px-6 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-semibold hover:bg-slate-700"
        >
          Voltar aos Casos
        </button>
      </div>
    );
  }

  // Outcome screen
  if (currentNode.isFinalOutcome) {
    const isSuccess = currentNode.outcomeEvaluation?.isSuccess ?? true;
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className={`p-8 rounded-3xl border text-center shadow-lg transition-all ${
          isSuccess 
            ? 'bg-emerald-50/80 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/50' 
            : 'bg-rose-50/80 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/50'
        }`}>
          <div className="inline-flex p-4 rounded-2xl mb-4 shadow-sm bg-white dark:bg-slate-800">
            {isSuccess ? (
              <CheckCircle2 className="w-16 h-16 text-emerald-500" />
            ) : (
              <XCircle className="w-16 h-16 text-rose-500" />
            )}
          </div>

          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
            isSuccess ? 'text-emerald-900 dark:text-emerald-300' : 'text-rose-900 dark:text-rose-300'
          }`}>
            {currentNode.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto mt-3 leading-relaxed">
            {currentNode.outcomeEvaluation?.summary || currentNode.scenarioText}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-800 dark:text-white shadow-sm">
            <Award className="w-4 h-4 text-amber-500" />
            Pontuação de Tomada de Decisão: {totalScore} pts
          </div>

          {currentNode.outcomeEvaluation?.clinicalDebrief && (
            <div className="mt-8 text-left p-6 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-wider mb-2">
                <FileText className="w-4 h-4" />
                Debriefing Clínico Baseado em Evidências
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {currentNode.outcomeEvaluation.clinicalDebrief}
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 font-semibold text-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Repetir Cenário com Outras Decisões
            </button>
            <button
              onClick={() => onComplete(totalScore, isSuccess)}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-sm shadow-md transition-all"
            >
              Concluir e Salvar Desempenho
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* History log of choices */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Trilha de Decisões do Caso</h4>
          <div className="space-y-3">
            {historyNodes.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
                <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-800 dark:text-white">{step.node.title}</div>
                  <div className="text-teal-600 dark:text-teal-400 mt-0.5">Escolha: {step.chosenOption.label}</div>
                  <div className="text-slate-500 mt-0.5">{step.chosenOption.impactExplanation}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Simulador Clínico Ramificado
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              {caseData.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
            Pontos: <span className="text-teal-600 dark:text-teal-400">{totalScore}</span>
          </div>
          <button
            onClick={onExit}
            className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Patient & Vitals Monitor Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Patient card */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <img 
            src={caseData.patient.image} 
            alt={caseData.patient.name}
            className="w-14 h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-700" 
          />
          <div className="min-w-0 flex-1">
            <div className="font-bold text-slate-900 dark:text-white truncate">{caseData.patient.name}</div>
            <div className="text-xs text-slate-500">{caseData.patient.age} anos • {caseData.patient.profession}</div>
            <div className="text-[11px] text-teal-600 dark:text-teal-400 font-medium truncate mt-0.5">
              {caseData.patient.complaint}
            </div>
          </div>
        </div>

        {/* Vital Signs Monitor */}
        <div className="md:col-span-2 p-4 bg-slate-950 text-emerald-400 rounded-2xl border border-slate-800 font-mono shadow-inner">
          <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-widest pb-2 border-b border-slate-800/80">
            <span>Monitor Hemodinâmico em Tempo Real</span>
            <span className="flex items-center gap-1 text-emerald-400 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> LIVE
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 pt-3 text-center">
            <div className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <Heart className="w-3 h-3 text-rose-500" /> FC
              </div>
              <div className="text-base font-bold text-white mt-0.5">
                {currentNode.vitals?.hr || 0} <span className="text-[9px] text-slate-400">bpm</span>
              </div>
            </div>

            <div className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <Droplet className="w-3 h-3 text-blue-400" /> PA
              </div>
              <div className="text-base font-bold text-white mt-0.5">
                {currentNode.vitals?.bp || '0/0'}
              </div>
            </div>

            <div className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <Wind className="w-3 h-3 text-teal-400" /> FR
              </div>
              <div className="text-base font-bold text-white mt-0.5">
                {currentNode.vitals?.rr || 0} <span className="text-[9px] text-slate-400">rpm</span>
              </div>
            </div>

            <div className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <Activity className="w-3 h-3 text-amber-400" /> SpO₂
              </div>
              <div className="text-base font-bold text-white mt-0.5">
                {currentNode.vitals?.spo2 || 0}%
              </div>
            </div>

            <div className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <Thermometer className="w-3 h-3 text-purple-400" /> Temp
              </div>
              <div className="text-base font-bold text-white mt-0.5">
                {currentNode.vitals?.temp || 0}°C
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Situation Card */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-3">
            Momento Clínico Atual
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {currentNode.title}
          </h3>
          <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed mt-2 whitespace-pre-line">
            {currentNode.scenarioText}
          </p>
        </div>

        {/* Choices List */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Qual a sua conduta imediata?
          </div>

          <div className="grid grid-cols-1 gap-3">
            {currentNode.choices.map((choice) => {
              const isSelected = selectedChoiceId === choice.id;
              return (
                <button
                  key={choice.id}
                  disabled={showExplanation}
                  onClick={() => handleSelectChoice(choice)}
                  className={`p-4 rounded-2xl border text-left transition-all relative ${
                    isSelected
                      ? choice.impactType === 'favorable'
                        ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                        : choice.impactType === 'critical'
                        ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30'
                        : 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-teal-500/60 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                    {choice.label}
                  </div>
                  {choice.description && (
                    <div className="text-xs text-slate-500 mt-1">
                      {choice.description}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Immediate Feedback & Proceed Button */}
        {showExplanation && lastChoice && (
          <div className={`mt-6 p-5 rounded-2xl border animate-in fade-in slide-in-from-bottom-2 duration-200 ${
            lastChoice.impactType === 'favorable'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-900/60 dark:text-emerald-200'
              : lastChoice.impactType === 'critical'
              ? 'bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-200'
              : 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-900/60 dark:text-amber-200'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm mb-1">
              {lastChoice.impactType === 'favorable' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              )}
              <span>Impacto da Decisão ({lastChoice.scoreDelta > 0 ? `+${lastChoice.scoreDelta}` : lastChoice.scoreDelta} pts)</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed mt-1">
              {lastChoice.impactExplanation}
            </p>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleProceedToNextNode}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs shadow hover:opacity-90 transition-all"
              >
                Avançar no Caso Clínico
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
