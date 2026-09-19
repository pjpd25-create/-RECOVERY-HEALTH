import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  Heart, 
  Wind, 
  Activity, 
  Droplet, 
  Thermometer, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  Award,
  ArrowRight
} from 'lucide-react';

interface TriageCase {
  id: string;
  patientName: string;
  age: number;
  chiefComplaint: string;
  historySummary: string;
  vitals: {
    bp: string;
    hr: number;
    rr: number;
    spo2: number;
    temp: number;
    gcs: number;
  };
  discriminatorClues: string[];
  correctColor: 'Vermelho' | 'Laranja' | 'Amarelo' | 'Verde' | 'Azul';
  targetTime: string;
  rationale: string;
}

const TRIAGE_CASES: TriageCase[] = [
  {
    id: 'trg-1',
    patientName: 'Eduardo Martins',
    age: 48,
    chiefComplaint: 'Dor precordial opressiva em queimação há 40 minutos com irradiação para mandíbula e sudorese fria.',
    historySummary: 'Diabético e hipertenso, sem uso de insulina.',
    vitals: { bp: '155/95', hr: 110, rr: 22, spo2: 96, temp: 36.2, gcs: 15 },
    discriminatorClues: ['Dor torácica típica aguda de alta probabilidade', 'Sudorese fria associada', 'Fator de risco cardiovascular maior'],
    correctColor: 'Laranja',
    targetTime: 'Atendimento médico em até 10 minutos',
    rationale: 'Dor torácica de provável origem coronariana aguda sem choque ou insuficiência respiratória iminente enquadra-se no nível Laranja (Muito Urgente - 10 min).'
  },
  {
    id: 'trg-2',
    patientName: 'Sofia Lima',
    age: 22,
    chiefComplaint: 'Crise asmática severa com estridor audível sem estetoscópio, uso de musculatura acessória e cianose labial.',
    historySummary: 'Asma brônquica grave desde a infância.',
    vitals: { bp: '130/80', hr: 135, rr: 38, spo2: 84, temp: 36.8, gcs: 13 },
    discriminatorClues: ['Insuficiência respiratória iminente', 'SpO2 < 90%', 'Cianose e rebaixamento do nível de consciência'],
    correctColor: 'Vermelho',
    targetTime: 'Atendimento imediato (0 minutos - Sala Vermelha)',
    rationale: 'Apresenta ameaça iminente à vida com falência respiratória catastrófica (SpO2 84%, GCS 13). Requer suporte avançado de via aérea imediato.'
  },
  {
    id: 'trg-3',
    patientName: 'Guilherme Castro',
    age: 31,
    chiefComplaint: 'Entorse de tornozelo direito durante jogo de futebol há 2 horas. Consegue apoiar o pé com dor leve e sem deformidade grosseira.',
    historySummary: 'Sem comorbidades prévias.',
    vitals: { bp: '120/75', hr: 72, rr: 14, spo2: 99, temp: 36.5, gcs: 15 },
    discriminatorClues: ['Trauma articular fechado sem sinais de instabilidade', 'Sinais vitais normais', 'Dor leve a moderada'],
    correctColor: 'Verde',
    targetTime: 'Atendimento em até 120 minutos',
    rationale: 'Trauma musculoesquelético sem comprometimento vascular periférico ou deformidade óssea com estabilidade hemodinâmica plena.'
  }
];

const COLOR_CONFIG = {
  Vermelho: {
    bg: 'bg-red-600',
    text: 'text-red-600',
    border: 'border-red-500',
    hover: 'hover:bg-red-700',
    label: 'Emergência (Imediato - 0 min)'
  },
  Laranja: {
    bg: 'bg-orange-500',
    text: 'text-orange-500',
    border: 'border-orange-500',
    hover: 'hover:bg-orange-600',
    label: 'Muito Urgente (10 min)'
  },
  Amarelo: {
    bg: 'bg-amber-400',
    text: 'text-amber-600',
    border: 'border-amber-400',
    hover: 'hover:bg-amber-500',
    label: 'Urgente (60 min)'
  },
  Verde: {
    bg: 'bg-emerald-500',
    text: 'text-emerald-500',
    border: 'border-emerald-500',
    hover: 'hover:bg-emerald-600',
    label: 'Pouco Urgente (120 min)'
  },
  Azul: {
    bg: 'bg-blue-500',
    text: 'text-blue-500',
    border: 'border-blue-500',
    hover: 'hover:bg-blue-600',
    label: 'Não Urgente (240 min)'
  }
};

interface TriageSimulatorProps {
  onBack: () => void;
}

export const TriageSimulator: React.FC<TriageSimulatorProps> = ({ onBack }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [evaluated, setEvaluated] = useState<boolean>(false);

  const currentCase = TRIAGE_CASES[currentIdx];

  const handleSelectColor = (color: string) => {
    if (evaluated) return;
    setSelectedColor(color);
    setEvaluated(true);
    if (color === currentCase.correctColor) {
      setScore(s => s + 50);
    }
  };

  const handleNextCase = () => {
    setSelectedColor(null);
    setEvaluated(false);
    if (currentIdx < TRIAGE_CASES.length - 1) {
      setCurrentIdx(i => i + 1);
    }
  };

  const isLast = currentIdx === TRIAGE_CASES.length - 1;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4" />
            Protocolo Manchester de Triagem de Emergência
          </div>
          <h2 className="text-xl sm:text-2xl font-black">Simulador de Classificação de Risco</h2>
          <p className="text-slate-300 text-xs mt-1">
            Avalie discriminadores de gravidade, sinais vitais e determine o tempo alvo de resposta clínica.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-bold text-teal-300">
            Pontuação: {score} pts
          </div>
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all"
          >
            Voltar
          </button>
        </div>
      </div>

      {/* Case Card */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
              Caso de Triagem {currentIdx + 1} de {TRIAGE_CASES.length}
            </span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {currentCase.patientName} ({currentCase.age} anos)
            </h3>
          </div>
        </div>

        {/* Chief Complaint */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Queixa Principal & História Rápida</div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">"{currentCase.chiefComplaint}"</p>
          <div className="text-xs text-slate-500 mt-1">Histórico: {currentCase.historySummary}</div>
        </div>

        {/* Vital Signs Grid */}
        <div className="p-4 bg-slate-950 text-white rounded-2xl font-mono text-xs shadow-inner">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">Sinais Vitais de Admissão</div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">PA</div>
              <div className="font-bold text-emerald-400 text-sm mt-0.5">{currentCase.vitals.bp}</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">FC</div>
              <div className="font-bold text-rose-400 text-sm mt-0.5">{currentCase.vitals.hr} bpm</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">FR</div>
              <div className="font-bold text-teal-400 text-sm mt-0.5">{currentCase.vitals.rr} rpm</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">SpO₂</div>
              <div className="font-bold text-amber-400 text-sm mt-0.5">{currentCase.vitals.spo2}%</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">Temp</div>
              <div className="font-bold text-purple-400 text-sm mt-0.5">{currentCase.vitals.temp}°C</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">Glasgow</div>
              <div className="font-bold text-blue-400 text-sm mt-0.5">{currentCase.vitals.gcs} / 15</div>
            </div>
          </div>
        </div>

        {/* Triage Decision Buttons */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Selecione a Prioridade de Atendimento (Manchester):
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            {(['Vermelho', 'Laranja', 'Amarelo', 'Verde', 'Azul'] as const).map(color => {
              const cfg = COLOR_CONFIG[color];
              const isSelected = selectedColor === color;
              const isCorrect = evaluated && color === currentCase.correctColor;

              return (
                <button
                  key={color}
                  disabled={evaluated}
                  onClick={() => handleSelectColor(color)}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    isSelected 
                      ? `${cfg.bg} text-white font-bold shadow-md`
                      : evaluated && isCorrect
                      ? 'ring-2 ring-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 bg-slate-50/50 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <span className="text-xs font-black uppercase tracking-wider">{color}</span>
                  <span className="text-[10px] opacity-80">{cfg.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback Section */}
        {evaluated && (
          <div className={`p-5 rounded-2xl border space-y-2 animate-in fade-in ${
            selectedColor === currentCase.correctColor
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200'
              : 'bg-rose-50 border-rose-300 text-rose-900 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-200'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {selectedColor === currentCase.correctColor ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600" />
              )}
              <span>
                {selectedColor === currentCase.correctColor 
                  ? 'Classificação Perfeita! (+50 pts)' 
                  : `Classificação Incorreta (Cor Correta: ${currentCase.correctColor})`}
              </span>
            </div>

            <p className="text-xs leading-relaxed">
              <strong>Justificativa Técnica:</strong> {currentCase.rationale}
            </p>
            <div className="text-xs font-semibold">
              <strong>Meta Temporal:</strong> {currentCase.targetTime}
            </div>

            <div className="pt-3 flex justify-end">
              <button
                onClick={handleNextCase}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs shadow hover:opacity-90 transition-all"
              >
                {isLast ? 'Finalizar Triagem' : 'Próximo Paciente'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
