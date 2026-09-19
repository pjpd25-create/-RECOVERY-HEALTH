import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  Activity, 
  Camera, 
  ArrowLeft, 
  User, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  Award, 
  ShieldCheck, 
  Download, 
  Settings,
  Users,
  Box
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { ClinicalCase } from '../types';
import { ai, MODELS } from '../gemini';
import { PatientChat } from './PatientChat';
import { AnatomyMap } from './AnatomyMap';
import { ImageAnalyzer } from './ImageAnalyzer';
import { BranchedCaseSimulator } from './BranchedCaseSimulator';
import { InterprofessionalSimulator } from './InterprofessionalSimulator';

interface CaseSimulationProps {
  caseData: ClinicalCase;
  mode: 'treino' | 'desafio';
  onComplete: (score: number, correct: number, total: number, mistakes: any[]) => void;
  onExit: () => void;
  isAdmin?: boolean;
  userLives: number;
  onLoseLife: () => void;
  showAlert: (title: string, message: string) => void;
  onOpenRoundTable?: () => void;
  onOpenAnatomyViewer?: (target?: string) => void;
}

export const CaseSimulation = ({ 
  caseData, 
  mode, 
  onComplete, 
  onExit, 
  isAdmin, 
  userLives, 
  onLoseLife, 
  showAlert,
  onOpenRoundTable,
  onOpenAnatomyViewer
}: CaseSimulationProps) => {
  // Check if case is a branched decision tree
  if (caseData.caseType === 'ramificado' || (caseData.branchNodes && Object.keys(caseData.branchNodes).length > 0)) {
    return (
      <BranchedCaseSimulator 
        caseData={caseData} 
        onComplete={(score, passed) => {
          onComplete(score, passed ? 1 : 0, 1, []);
        }} 
        onExit={onExit} 
      />
    );
  }

  // Check if case is an interprofessional multi-role simulation
  if (caseData.caseType === 'multiprofissional' || (caseData.interprofessionalRoles && caseData.interprofessionalRoles.length > 0)) {
    return (
      <InterprofessionalSimulator 
        caseData={caseData} 
        onComplete={(score) => {
          onComplete(score, 1, 1, []);
        }} 
        onExit={onExit} 
      />
    );
  }

  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [failedQuestions, setFailedQuestions] = useState<{ stage: string, question: string, selectedOption: string, correctOption: string, explanation: string }[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeModule, setActiveModule] = useState<'chat' | 'anatomy' | 'image' | null>(null);

  const stages = caseData?.stages || [];
  const isResultStage = currentStageIndex >= stages.length;
  const currentStageData = !isResultStage ? stages[currentStageIndex] : null;

  const totalQuestionsInCase = stages.reduce((acc, s) => {
    return acc + (s.questions?.length || 0);
  }, 0);

  const downloadMistakesPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(`Relatório de Erros - ${caseData.patient.name}`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Data: ${new Date().toLocaleDateString()}`, 20, 30);
    
    let y = 45;
    failedQuestions.forEach((m, i) => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.text(`${i + 1}. Questão (${m.stage}):`, 20, y);
      y += 7;
      doc.setFont("helvetica", "normal");
      const splitText = doc.splitTextToSize(m.question, 170);
      doc.text(splitText, 20, y);
      y += splitText.length * 7;
      
      doc.setTextColor(255, 0, 0);
      doc.text(`Sua resposta: ${m.selectedOption}`, 20, y);
      y += 7;
      doc.setTextColor(0, 128, 0);
      doc.text(`Resposta correta: ${m.correctOption}`, 20, y);
      y += 7;
      doc.setTextColor(0, 0, 0);
      const splitExp = doc.splitTextToSize(`Explicação: ${m.explanation}`, 170);
      doc.text(splitExp, 20, y);
      y += splitExp.length * 7 + 10;
    });
    
    doc.save(`Erros_${caseData.patient.name.replace(/\s+/g, '_')}.pdf`);
  };

  const currentQuestion = currentStageData?.questions?.[currentQuestionIndex];

  useEffect(() => {
    let timer: any;
    if (mode === 'desafio' && !isResultStage && !showFeedback) {
      setTimeLeft(30);
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setTimeout(() => handleAnswer('NONE' as any, 'NONE' as any), 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentQuestion, currentStageIndex, mode, showFeedback]);

  const shuffledOptions = useMemo(() => {
    if (!currentQuestion || !currentQuestion.options) return [];
    
    // Normalize options to ensure they are objects with originalId
    const options = [...currentQuestion.options].map((o, idx) => {
      if (typeof o === 'string') {
        const id = ['A', 'B', 'C', 'D'][idx] as 'A' | 'B' | 'C' | 'D';
        return { text: o, id, originalId: id };
      }
      return { ...o, originalId: o.id };
    });

    // Shuffle
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    // Assign new labels A, B, C, D for the current order
    const labels = ['A', 'B', 'C', 'D', 'E', 'F'];
    return options.map((o, idx) => ({
      ...o,
      id: labels[idx] || String(idx + 1)
    }));
  }, [currentQuestion]);

  const handleAnswer = (ansId: string, originalId: string) => {
    if (showFeedback) return;
    if (mode === 'desafio' && userLives <= 0) {
      showAlert("Sem Vidas", "Você não tem mais vidas! Aguarde a regeneração ou use o modo Treino.");
      onExit();
      return;
    }

    setSelectedAnswer(ansId as any);
    const correct = originalId === currentQuestion?.correctOption;
    setIsCorrect(correct);
    if (correct) {
      setTotalScore(prev => prev + 100);
    } else {
      setMistakesCount(prev => prev + 1);
      if (mode === 'desafio') onLoseLife();
      
      if (currentQuestion && shuffledOptions) {
        setFailedQuestions(prev => [...prev, {
          stage: currentStageData?.title || `Estágio ${currentStageIndex + 1}`,
          question: currentQuestion.text,
          selectedOption: shuffledOptions.find(o => o.id === ansId)?.text || 'Nenhuma',
          correctOption: shuffledOptions.find(o => o.originalId === currentQuestion.correctOption)?.text || '',
          explanation: currentQuestion.explanation
        }]);
      }
    }
    setShowFeedback(true);

    if (!correct) {
      handleGetAiExplanation();
    }
  };

  const handleGetAiExplanation = async () => {
    if (!currentQuestion) return;
    if (!ai) {
      setAiExplanation("Configuração de IA ausente.");
      return;
    }
    setIsAiLoading(true);
    setAiExplanation(null);
    try {
      const correctOptText = shuffledOptions.find(o => o.originalId === currentQuestion.correctOption)?.text || "Resposta correta";
      const response = await ai.models.generateContent({
        model: MODELS.FLASH,
        contents: `Como um tutor de ${caseData.specialty} experiente, explique de forma concisa e didática por que a resposta correta para a seguinte questão é "${correctOptText}".
        
        Caso Clínico: ${caseData.patient.history}
        Questão: ${currentQuestion.text}
        Explicação Técnica: ${currentQuestion.explanation}
        
        Foque em ajudar o estudante a desenvolver o raciocínio clínico.`,
      });
      setAiExplanation(response.text);
    } catch (error) {
      console.error("AI Error:", error);
      setAiExplanation("Não foi possível carregar a explicação da IA no momento.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const nextStep = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    
    if (currentStageData && currentQuestionIndex < (currentStageData.questions || []).length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      if (currentStageIndex < stages.length) {
        setCurrentStageIndex(prev => prev + 1);
        setCurrentQuestionIndex(0);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Case Header */}
      <div className="bg-white p-6 rounded-2xl border border-clinical-border flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-grow space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{caseData.patient.name}</h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActiveModule('chat')}
                className="p-2 bg-clinical-blue/10 hover:bg-clinical-blue/20 text-clinical-blue rounded-xl transition-all flex items-center gap-2 text-xs font-bold"
                title="Conversar com o Paciente"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Chat</span>
              </button>
              <button 
                onClick={() => setActiveModule('anatomy')}
                className="p-2 bg-clinical-blue/10 hover:bg-clinical-blue/20 text-clinical-blue rounded-xl transition-all flex items-center gap-2 text-xs font-bold"
                title="Mapa Anatómico"
              >
                <Activity className="w-4 h-4" />
                <span className="hidden sm:inline">Anatomia</span>
              </button>
              <button 
                onClick={() => setActiveModule('image')}
                className="p-2 bg-clinical-blue/10 hover:bg-clinical-blue/20 text-clinical-blue rounded-xl transition-all flex items-center gap-2 text-xs font-bold"
                title="Análise de Imagem IA"
              >
                <Camera className="w-4 h-4" />
                <span className="hidden sm:inline">IA Imagem</span>
              </button>
              <button 
                onClick={onOpenRoundTable}
                className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-xl transition-all flex items-center gap-2 text-xs font-bold"
                title="Simulação Round Table"
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Round Table</span>
              </button>
              <button 
                onClick={() => onOpenAnatomyViewer?.(caseData.patient.complaint)}
                className="p-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-xl transition-all flex items-center gap-2 text-xs font-bold"
                title="Visualizador 3D"
              >
                <Box className="w-4 h-4" />
                <span className="hidden sm:inline">3D</span>
              </button>
              <div className="w-px h-6 bg-clinical-border mx-1" />
              <button onClick={onExit} className="text-clinical-muted hover:text-red-500 flex items-center gap-2 font-bold transition-colors">
                <ArrowLeft className="w-6 h-6" /> Sair
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-clinical-muted">
            <span className="flex items-center gap-1"><User className="w-4 h-4" /> {caseData.patient.age} anos</span>
            <span className="flex items-center gap-1"><Activity className="w-4 h-4" /> {caseData.patient.profession}</span>
            <span className="flex items-center gap-1 font-bold text-clinical-blue uppercase tracking-wider">{caseData.category}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              caseData.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
              caseData.difficulty === 'Médio' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>{caseData.difficulty}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {caseData.estimatedTime} min</span>
          </div>
          <div className="space-y-1">
            <p className="text-clinical-text font-bold text-sm uppercase tracking-wide">Queixa Principal:</p>
            <p className="text-clinical-text italic">"{caseData.patient.complaint}"</p>
          </div>
          <div className="space-y-1">
            <p className="text-clinical-text font-bold text-sm uppercase tracking-wide">História Clínica:</p>
            <p className="text-clinical-text text-sm leading-relaxed">{caseData.patient.history}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-clinical-text font-bold text-sm uppercase tracking-wide">Tempo de Evolução:</p>
              <p className="text-clinical-text text-sm">{caseData.patient.evolutionTime}</p>
            </div>
            <div className="space-y-1">
              <p className="text-clinical-text font-bold text-sm uppercase tracking-wide">Limitações Funcionais:</p>
              <p className="text-clinical-text text-sm">{caseData.patient.functionalLimitations}</p>
            </div>
            {caseData.patient.symptoms && caseData.patient.symptoms.length > 0 && (
              <div className="space-y-1 md:col-span-2">
                <p className="text-clinical-text font-bold text-sm uppercase tracking-wide">Sintomas:</p>
                <div className="flex flex-wrap gap-2">
                  {caseData.patient.symptoms.map((s, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-50 text-clinical-blue text-xs rounded-lg border border-blue-100">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-4">
        <div className="flex-grow flex justify-between items-center gap-2">
          {stages.map((s, idx) => {
            const isActive = currentStageIndex >= idx;
            return (
              <div key={idx} className="flex-grow flex flex-col gap-2">
                <div className={`h-2 rounded-full transition-colors ${isActive ? 'bg-clinical-blue' : 'bg-gray-200'}`} />
                <p className={`text-[10px] font-bold uppercase text-center hidden sm:block ${isActive ? 'text-clinical-blue' : 'text-clinical-muted'}`}>
                  {s.title}
                </p>
              </div>
            );
          })}
          <div className="flex-grow flex flex-col gap-2">
            <div className={`h-2 rounded-full transition-colors ${isResultStage ? 'bg-clinical-blue' : 'bg-gray-200'}`} />
            <p className={`text-[10px] font-bold uppercase text-center hidden sm:block ${isResultStage ? 'text-clinical-blue' : 'text-clinical-muted'}`}>
              Resultado
            </p>
          </div>
        </div>
        {mode === 'desafio' && !isResultStage && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold border ${timeLeft < 10 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-white text-clinical-blue border-clinical-border'}`}>
            <Clock className="w-4 h-4" />
            {timeLeft}s
          </div>
        )}
      </div>

      {/* Stage Content */}
      <AnimatePresence mode="wait">
        {!isResultStage ? (
          <motion.div 
            key={currentStageIndex + '-' + currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="bg-white p-8 rounded-3xl border border-clinical-border space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-clinical-blue">{currentStageData?.title}</h3>
                <p className="text-clinical-muted">{currentStageData?.description}</p>
              </div>

              {currentQuestion && (
                <div className="space-y-6">
                  {/* Competency & Question Type Tags */}
                  <div className="flex flex-wrap items-center gap-2">
                    {currentQuestion.competencyCode && (
                      <span className="px-2.5 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-[11px] font-mono font-bold text-teal-700 dark:text-teal-300">
                        Competência: {currentQuestion.competencyCode}
                      </span>
                    )}
                    {currentQuestion.questionType && (
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                        {currentQuestion.questionType.replace('_', ' ')}
                      </span>
                    )}
                    {currentQuestion.isRedFlagQuestion && (
                      <span className="px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[11px] font-bold uppercase tracking-wider">
                        Sinal de Alerta Crítico
                      </span>
                    )}
                  </div>

                  <p className="text-lg font-medium leading-relaxed">{currentQuestion.text}</p>
                  
                  {currentQuestion.safetyWarning && (
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{currentQuestion.safetyWarning}</span>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 gap-3">
                    {(shuffledOptions || []).map((opt) => (
                      <button
                        key={opt.id}
                        translate="no"
                        onClick={() => handleAnswer(opt.id, opt.originalId)}
                        disabled={showFeedback}
                        className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 notranslate
                          ${selectedAnswer === opt.id 
                            ? (isCorrect ? 'border-clinical-green bg-green-50' : 'border-red-500 bg-red-50') 
                            : 'border-clinical-border hover:border-clinical-blue hover:bg-blue-50'
                          }
                          ${showFeedback && opt.originalId === currentQuestion.correctOption ? 'border-clinical-green bg-green-50' : ''}
                        `}
                      >
                        <span 
                          translate="no"
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold notranslate
                          ${selectedAnswer === opt.id 
                            ? (isCorrect ? 'bg-clinical-green text-white' : 'bg-red-500 text-white') 
                            : 'bg-gray-100 text-clinical-muted'
                          }
                          ${showFeedback && opt.originalId === currentQuestion.correctOption ? 'bg-clinical-green text-white' : ''}
                        `}>
                          <svg width="100%" height="100%" viewBox="0 0 32 32" className="notranslate">
                            <text 
                              x="50%" 
                              y="50%" 
                              textAnchor="middle" 
                              dominantBaseline="central" 
                              fill="currentColor" 
                              fontSize="16" 
                              fontWeight="bold"
                              className="notranslate"
                            >
                              {opt.id}
                            </text>
                          </svg>
                        </span>
                        <span className="font-medium flex-1">{opt.text}</span>
                        {showFeedback && opt.originalId === currentQuestion.correctOption && (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        )}
                        {showFeedback && selectedAnswer === opt.id && !isCorrect && (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {showFeedback && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className={`p-6 rounded-2xl space-y-3 ${isCorrect ? 'bg-green-50 border border-clinical-green/30' : 'bg-red-50 border border-red-500/30'}`}
                >
                  <div className="flex items-center gap-2">
                    {isCorrect ? <CheckCircle2 className="text-clinical-green" /> : <AlertCircle className="text-red-500" />}
                    <h4 className={`font-bold ${isCorrect ? 'text-clinical-green' : 'text-red-500'}`}>
                      {isCorrect ? 'Resposta Correta! (+100 pts)' : 'Resposta Incorreta'}
                    </h4>
                  </div>
                  <p className="text-sm text-clinical-text leading-relaxed">
                    <span className="font-bold">Explicação:</span> {currentQuestion?.explanation}
                  </p>

                  {currentQuestion?.clinicalPearl && (
                    <div className="mt-4 p-4 bg-white/60 rounded-xl border border-clinical-blue/20 flex gap-3 items-start">
                      <Lightbulb className="w-5 h-5 text-clinical-blue shrink-0 mt-1" />
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-clinical-blue uppercase tracking-widest">Pérola Clínica</p>
                        <p className="text-sm italic text-clinical-text">{currentQuestion.clinicalPearl}</p>
                      </div>
                    </div>
                  )}

                  {!isCorrect && (
                    <div className="mt-4 p-4 bg-clinical-blue/5 rounded-xl border border-clinical-blue/20 space-y-3">
                      <div className="flex items-center gap-2 text-clinical-blue">
                        <Activity className="w-4 h-4 animate-pulse" />
                        <p className="text-xs font-bold uppercase tracking-widest">Tutor IA (Gemini)</p>
                      </div>
                      {isAiLoading ? (
                        <div className="flex items-center gap-2 text-clinical-muted italic text-sm">
                          <div className="w-2 h-2 bg-clinical-blue rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-clinical-blue rounded-full animate-bounce [animation-delay:0.2s]" />
                          <div className="w-2 h-2 bg-clinical-blue rounded-full animate-bounce [animation-delay:0.4s]" />
                          Analisando o seu raciocínio...
                        </div>
                      ) : (
                        <p className="text-sm text-clinical-text leading-relaxed italic">
                          {aiExplanation || "Aguardando análise..."}
                        </p>
                      )}
                    </div>
                  )}

                  <button 
                    onClick={nextStep}
                    className="w-full py-3 bg-clinical-text text-white rounded-xl font-bold mt-2 hover:bg-clinical-blue transition-colors"
                  >
                    Continuar
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-3xl border border-clinical-border text-center space-y-6 max-h-[80vh] overflow-y-auto"
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${mistakesCount > 5 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-clinical-green'}`}>
              {mistakesCount > 5 ? <AlertCircle className="w-10 h-10" /> : <Award className="w-10 h-10" />}
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">
                {mistakesCount > 5 ? 'Recuperação Parcial' : caseData.result.title}
              </h3>
              <p className="text-clinical-muted max-w-md mx-auto">
                {mistakesCount > 5 
                  ? `O paciente teve uma recuperação limitada devido a ${mistakesCount} falhas nos procedimentos. Veja abaixo onde pode melhorar.` 
                  : caseData.result.description}
              </p>
            </div>
            
            {mistakesCount > 5 && (
              <div className="text-left space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <h4 className="font-bold text-clinical-text flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-orange-500" />
                  Relatório de Melhoria:
                </h4>
                <div className="space-y-4">
                  {failedQuestions.map((fail, idx) => (
                    <div key={idx} className="border-l-4 border-orange-400 pl-4 py-1">
                      <p className="text-xs font-bold text-clinical-muted uppercase tracking-widest">{fail.stage}</p>
                      <p className="text-sm font-medium text-clinical-text mb-1">{fail.question}</p>
                      <p className="text-xs text-clinical-green font-bold">Resolução: {fail.correctOption}</p>
                      <p className="text-xs text-clinical-muted italic mt-1">{fail.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6 flex flex-col gap-4 justify-center max-w-md mx-auto">
              <button 
                onClick={() => onComplete(totalScore, totalQuestionsInCase - mistakesCount, totalQuestionsInCase, failedQuestions)}
                className="w-full py-4 bg-clinical-blue text-white rounded-xl font-bold shadow-lg shadow-clinical-blue/20"
              >
                Finalizar Missão
              </button>
              {failedQuestions.length > 0 && (
                <button 
                  onClick={downloadMistakesPDF}
                  className="w-full py-4 bg-white border-2 border-clinical-blue text-clinical-blue rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-clinical-blue/5 transition-all"
                >
                  <Download className="w-5 h-5" /> Descarregar Relatório de Erros
                </button>
              )}
              {isAdmin && (
                <button 
                  onClick={onExit}
                  className="w-full py-4 bg-gray-800 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  <Settings className="w-5 h-5" /> Painel Admin
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Modals for Interactive Modules */}
      <AnimatePresence>
        {activeModule === 'chat' && (
          <PatientChat caseData={caseData} onClose={() => setActiveModule(null)} />
        )}
        {activeModule === 'anatomy' && (
          <AnatomyMap onClose={() => setActiveModule(null)} />
        )}
        {activeModule === 'image' && (
          <ImageAnalyzer caseData={caseData} onClose={() => setActiveModule(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Removed default export
