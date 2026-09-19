import React, { useState, useEffect } from 'react';
import { OSCEStation, OSCEAttempt } from '../types';
import { 
  Clock, 
  CheckSquare, 
  Square, 
  AlertCircle, 
  Award, 
  Play, 
  Pause, 
  RotateCcw, 
  FileText, 
  ShieldCheck, 
  UserCheck,
  ChevronRight
} from 'lucide-react';

const MOCK_OSCE_STATIONS: OSCEStation[] = [
  {
    id: 'osce-01',
    code: 'OSCE-MED-01',
    title: 'Estação de Anamnese & Comunicação de Más Notícias (Protocolo SPIKES)',
    professionId: 'medicina',
    specialty: 'Medicina e Comunicação Clínica',
    scenarioDescription: 'Você está no consultório ambulatorial e deve comunicar a um paciente de 56 anos o diagnóstico histopatológico de neoplasia colônica com indicação cirúrgica.',
    candidateInstructions: 'Nos próximos 7 minutos, acolha o paciente, investigue o conhecimento prévio, forneça as informações de forma clara e empática segundo as etapas do SPIKES, acolha as emoções e proponha o plano terapêutico inicial.',
    patientActorPrompt: 'Paciente ansioso, acompanhado da filha, teme o resultado dos exames mas deseja sinceridade.',
    timeLimitSeconds: 420,
    requiredCompetencies: ['Comunicação Empática', 'Acolhimento de Emoções', 'Explicação Terapêutica'],
    checklist: [
      { id: 'chk-1', skillText: 'Apresentou-se cordial e verificou a identidade e conforto do paciente (Setting)', category: 'Comunicação & Empatia', points: 15 },
      { id: 'chk-2', skillText: 'Investigou o que o paciente já sabia sobre os sintomas e exames prévios (Perception)', category: 'Anamnese & Investigação', points: 15 },
      { id: 'chk-3', skillText: 'Perguntou o quanto o paciente desejava saber de detalhes neste momento (Invitation)', category: 'Comunicação & Empatia', points: 15 },
      { id: 'chk-4', skillText: 'Deu aviso prévio antes da notícia ("Infelizmente os resultados não foram os que esperávamos...") (Knowledge)', category: 'Comunicação & Empatia', points: 20 },
      { id: 'chk-5', skillText: 'Utilizou linguagem clara, sem jargões inacessíveis, fazendo pausas para o paciente absorver (Knowledge)', category: 'Comunicação & Empatia', points: 15 },
      { id: 'chk-6', skillText: 'Acolheu a resposta emocional com escuta ativa e validação (Emotions)', category: 'Comunicação & Empatia', points: 10, criticalItem: true },
      { id: 'chk-7', skillText: 'Resumiu os próximos passos e agendou retorno com plano de cuidados conjunto (Strategy & Summary)', category: 'Conduta & Prescrição', points: 10 }
    ],
    feedbackDebrief: 'Excelente execução de habilidades relacionais. A comunicação de más notícias exige equilíbrio entre clareza técnica e acolhimento humano. O respeito ao ritmo do paciente previne estresse pós-traumático e fortalece a adesão ao tratamento oncológico.'
  },
  {
    id: 'osce-02',
    code: 'OSCE-ENF-01',
    title: 'Estação Prática: Cateterismo Venoso Periférico e Administração Segura (9 Certos)',
    professionId: 'enfermagem',
    specialty: 'Enfermagem Fundamental & Procedimentos',
    scenarioDescription: 'Paciente adulto jovem internado na enfermaria cirúrgica necessitando de reposição hidroeletrolítica e analgesia antes de cirurgia de urgência.',
    candidateInstructions: 'Realize a antissepsia, escolha do dispositivo venoso adequado, punção e fixação estéril, além da checagem dos 9 certos da administração de medicamentos.',
    patientActorPrompt: 'Paciente queixando-se de dor moderada, com veias periféricas finas.',
    timeLimitSeconds: 360,
    requiredCompetencies: ['Assepsia & Biossegurança', 'Destreza Psicomotora', 'Segurança do Paciente'],
    checklist: [
      { id: 'chk-e1', skillText: 'Higienizou as mãos conforme técnica correta da OMS antes do contato', category: 'Segurança & Procedimento', points: 15, criticalItem: true },
      { id: 'chk-e2', skillText: 'Explicou o procedimento ao paciente e confirmou nome completo e pulseira', category: 'Comunicação & Empatia', points: 15 },
      { id: 'chk-e3', skillText: 'Garroteou o membro e selecionou vaso calibroso evitando articulações', category: 'Exame Clínico', points: 15 },
      { id: 'chk-e4', skillText: 'Realizou antissepsia alcoólica com clorexidina 0.5% e aguardou secagem', category: 'Segurança & Procedimento', points: 15 },
      { id: 'chk-e5', skillText: 'Puncionou com bisel voltado para cima, observou refluxo e avançou cateter suavemente', category: 'Segurança & Procedimento', points: 20 },
      { id: 'chk-e6', skillText: 'Fixou com curativo transparente estéril identificando data, hora e calibre', category: 'Segurança & Procedimento', points: 10 },
      { id: 'chk-e7', skillText: 'Descartou perfurocortante em caixa de descarte apropriada sem reencapar agulha', category: 'Segurança & Procedimento', points: 10, criticalItem: true }
    ],
    feedbackDebrief: 'A execução asséptica e a conferência de segurança do paciente são os pilares da excelência no cuidado de enfermagem. O descarte seguro previne acidentes biológicos graves.'
  }
];

interface OSCESimulatorProps {
  onBack: () => void;
}

export const OSCESimulator: React.FC<OSCESimulatorProps> = ({ onBack }) => {
  const [selectedStation, setSelectedStation] = useState<OSCEStation | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isRunning) {
      setIsRunning(false);
      setIsCompleted(true);
    }
    return () => clearInterval(interval);
  }, [isRunning, timerSeconds]);

  const handleStartStation = (st: OSCEStation) => {
    setSelectedStation(st);
    setTimerSeconds(st.timeLimitSeconds);
    setIsRunning(true);
    setCheckedItems({});
    setIsCompleted(false);
  };

  const handleToggleCheck = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const calculateScore = () => {
    if (!selectedStation) return 0;
    return selectedStation.checklist.reduce((acc, item) => {
      return acc + (checkedItems[item.id] ? item.points : 0);
    }, 0);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider mb-1">
            <UserCheck className="w-4 h-4" />
            Simulação de Exame Clínico Estruturado (OSCE)
          </div>
          <h2 className="text-xl sm:text-2xl font-black">Estações Práticas de Avaliação</h2>
          <p className="text-slate-300 text-xs mt-1">
            Avaliação de habilidades clínicas com cronômetro, checklist padronizado e feedback de competências.
          </p>
        </div>

        <button
          onClick={onBack}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all shrink-0"
        >
          Voltar ao Hub
        </button>
      </div>

      {!selectedStation ? (
        /* Station Catalog */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_OSCE_STATIONS.map(st => (
            <div 
              key={st.id}
              className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-teal-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-bold">
                    {st.code}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    {Math.floor(st.timeLimitSeconds / 60)} min
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  {st.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-2">
                  {st.scenarioDescription}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {st.requiredCompetencies.map((comp, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-medium">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-slate-100 dark:border-slate-800 mt-5 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">{st.checklist.length} itens avaliados</span>
                <button
                  onClick={() => handleStartStation(st)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-all"
                >
                  Entrar na Estação
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Active OSCE Station */
        <div className="space-y-6">
          {/* Active Station Banner */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            <div>
              <div className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">{selectedStation.code}</div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">{selectedStation.title}</h3>
              <div className="text-xs text-slate-500 mt-1">{selectedStation.specialty}</div>
            </div>

            {/* Timer widget */}
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded-2xl border font-mono font-bold text-lg flex items-center gap-2 ${
                timerSeconds < 60 
                  ? 'bg-rose-50 border-rose-300 text-rose-600 animate-pulse dark:bg-rose-950/40 dark:border-rose-900' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-white'
              }`}>
                <Clock className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span>{formatTime(timerSeconds)}</span>
              </div>

              <button
                onClick={() => setIsRunning(!isRunning)}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
                title={isRunning ? 'Pausar' : 'Retomar'}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setSelectedStation(null)}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
                title="Voltar às estações"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Candidate Scenario Instructions */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <FileText className="w-4 h-4 text-teal-600" />
                Instruções ao Candidato
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedStation.candidateInstructions}
              </p>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Ator / Paciente Simulado
                </div>
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                  {selectedStation.patientActorPrompt}
                </div>
              </div>
            </div>

            {/* Checklist of Evaluated Skills */}
            <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  Checklist do Examinador (Grade de Competências)
                </div>
                <div className="text-xs font-bold text-teal-600 dark:text-teal-400">
                  Pontuação Atual: {calculateScore()} / 100 pts
                </div>
              </div>

              <div className="space-y-2.5">
                {selectedStation.checklist.map(item => {
                  const isChecked = !!checkedItems[item.id];
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleToggleCheck(item.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                        isChecked 
                          ? 'bg-teal-50/70 border-teal-400 text-teal-950 dark:bg-teal-950/30 dark:border-teal-700 dark:text-teal-200' 
                          : 'bg-slate-50/50 border-slate-200 text-slate-700 dark:bg-slate-800/40 dark:border-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-xs sm:text-sm font-semibold leading-snug">
                          {item.skillText}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-slate-500">{item.category}</span>
                          <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400">+{item.points} pts</span>
                          {item.criticalItem && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-bold">
                              Item Crítico
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => setIsCompleted(true)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs shadow hover:opacity-90 transition-all"
                >
                  Finalizar Avaliação da Estação
                </button>
              </div>

              {/* Debrief & Feedback Modal / Block */}
              {isCompleted && (
                <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-sm text-teal-300 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Resultado Oficial da Estação OSCE
                    </div>
                    <div className="text-lg font-black text-white">
                      {calculateScore()} / 100% {calculateScore() >= 70 ? '• APROVADO' : '• REAVALIAÇÃO'}
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedStation.feedbackDebrief}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
