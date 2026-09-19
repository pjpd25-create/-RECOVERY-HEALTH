import * as React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  PlusCircle, 
  X, 
  AlertCircle, 
  Plus, 
  Trash2 
} from 'lucide-react';
import { ClinicalCase, Question, Specialty } from '../types';
import { CATEGORIES, SPECIALTIES } from '../constants';
import { MultimediaEditor } from './MultimediaEditor';

interface CaseEditorProps {
  onSave: (c: ClinicalCase) => void;
  onClose: () => void;
}

export const CaseEditor = ({ onSave, onClose }: CaseEditorProps) => {
  const [formData, setFormData] = useState<Partial<ClinicalCase>>({
    id: `custom_${Date.now()}`,
    title: '',
    specialty: 'Saúde Geral',
    category: 'Saúde Pública',
    difficulty: 'Fácil',
    estimatedTime: 15,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
    patient: {
      name: '',
      age: 0,
      profession: '',
      complaint: '',
      history: '',
      symptoms: [],
      evolutionTime: '',
      functionalLimitations: '',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80'
    },
    stages: [
      { id: 'eval', title: 'Avaliação Inicial', description: '', questions: [], multimedia: [] },
      { id: 'diag', title: 'Diagnóstico Clínico', description: '', questions: [], multimedia: [] },
      { id: 'treat', title: 'Plano de Tratamento', description: '', questions: [], multimedia: [] },
      { id: 'exer', title: 'Prescrição de Exercícios', description: '', questions: [], multimedia: [] }
    ],
    result: {
      title: 'Resultado da Reabilitação',
      description: '',
      image: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80',
      multimedia: []
    }
  });

  const [currentStep, setCurrentStep] = useState<'basic' | 'patient' | 'questions' | 'result'>('basic');
  const [error, setError] = useState<string | null>(null);

  const handleAddQuestion = (stageIdx: number) => {
    const newQuestion: Question = {
      id: `q_${Date.now()}`,
      text: '',
      options: [
        { id: 'A', text: '' },
        { id: 'B', text: '' },
        { id: 'C', text: '' },
        { id: 'D', text: '' }
      ],
      correctOption: 'A',
      explanation: '',
      clinicalPearl: '',
      multimedia: []
    };

    setFormData(prev => {
      const newStages = [...(prev.stages || [])];
      if (newStages[stageIdx]) {
        newStages[stageIdx] = {
          ...newStages[stageIdx],
          questions: [...(newStages[stageIdx].questions || []), newQuestion]
        };
      }
      return { ...prev, stages: newStages };
    });
  };

  const handleSave = () => {
    if (!formData.title || !formData.patient?.name) {
      setError("Por favor, preencha os campos obrigatórios (Título e Nome do Paciente).");
      return;
    }
    
    // Filter out exercises if not Fisioterapia
    const finalStages = formData.specialty === 'Fisioterapia' 
      ? formData.stages 
      : formData.stages?.filter(s => s.id !== 'exer');

    onSave({ ...formData, stages: finalStages } as ClinicalCase);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 w-full max-w-4xl h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-clinical-border dark:border-gray-700 flex flex-col"
      >
        <div className="bg-clinical-blue p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PlusCircle className="w-6 h-6" />
            <h3 className="text-2xl font-bold">Criar Novo Caso Clínico</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-8">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm font-medium">{error}</p>
              <button onClick={() => setError(null)} className="ml-auto">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          {currentStep === 'basic' && (
            <div className="space-y-6">
              <h4 className="text-lg font-bold dark:text-white border-b pb-2">Informações Básicas</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-clinical-muted uppercase tracking-widest">Título do Caso</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-clinical-border dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none"
                    placeholder="Ex: Hérnia Discal L5-S1"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-clinical-muted uppercase tracking-widest">Especialidade</label>
                  <select 
                    value={formData.specialty}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value as Specialty }))}
                    className="w-full px-4 py-3 rounded-xl border border-clinical-border dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none"
                  >
                    {SPECIALTIES.map(spec => <option key={spec} value={spec}>{spec}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-clinical-muted uppercase tracking-widest">Categoria</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full px-4 py-3 rounded-xl border border-clinical-border dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none"
                  >
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-clinical-muted uppercase tracking-widest">Dificuldade</label>
                  <select 
                    value={formData.difficulty}
                    onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as any }))}
                    className="w-full px-4 py-3 rounded-xl border border-clinical-border dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none"
                  >
                    <option value="Fácil">Fácil</option>
                    <option value="Médio">Médio</option>
                    <option value="Difícil">Difícil</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-clinical-muted uppercase tracking-widest">Tempo Estimado (min)</label>
                  <input 
                    type="number" 
                    value={formData.estimatedTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, estimatedTime: Number(e.target.value) }))}
                    className="w-full px-4 py-3 rounded-xl border border-clinical-border dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 'patient' && (
            <div className="space-y-6">
              <h4 className="text-lg font-bold dark:text-white border-b pb-2">Dados do Paciente</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-clinical-muted uppercase tracking-widest">Nome do Paciente</label>
                  <input 
                    type="text" 
                    value={formData.patient?.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, patient: { ...prev.patient!, name: e.target.value } }))}
                    className="w-full px-4 py-3 rounded-xl border border-clinical-border dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-clinical-muted uppercase tracking-widest">Idade</label>
                  <input 
                    type="number" 
                    value={formData.patient?.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, patient: { ...prev.patient!, age: Number(e.target.value) } }))}
                    className="w-full px-4 py-3 rounded-xl border border-clinical-border dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-clinical-muted uppercase tracking-widest">Queixa Principal</label>
                  <textarea 
                    value={formData.patient?.complaint}
                    onChange={(e) => setFormData(prev => ({ ...prev, patient: { ...prev.patient!, complaint: e.target.value } }))}
                    className="w-full px-4 py-3 rounded-xl border border-clinical-border dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none min-h-[80px]"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-clinical-muted uppercase tracking-widest">Sintomas (separados por vírgula)</label>
                  <input 
                    type="text" 
                    value={formData.patient?.symptoms?.join(', ')}
                    onChange={(e) => setFormData(prev => ({ ...prev, patient: { ...prev.patient!, symptoms: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '') } }))}
                    className="w-full px-4 py-3 rounded-xl border border-clinical-border dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none"
                    placeholder="Ex: Dor lombar, Dormência, Fraqueza"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-clinical-muted uppercase tracking-widest">História Clínica</label>
                  <textarea 
                    value={formData.patient?.history}
                    onChange={(e) => setFormData(prev => ({ ...prev, patient: { ...prev.patient!, history: e.target.value } }))}
                    className="w-full px-4 py-3 rounded-xl border border-clinical-border dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none min-h-[120px]"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 'questions' && (
            <div className="space-y-8">
              {formData.stages?.map((stage, stageIdx) => {
                // Only show exercises for Fisioterapia
                if (stage.id === 'exer' && formData.specialty !== 'Fisioterapia') return null;
                
                return (
                  <div key={stage.id} className="space-y-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-clinical-border dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold uppercase tracking-widest text-clinical-blue">{stage.title}</h5>
                    <button 
                      onClick={() => handleAddQuestion(stageIdx)}
                      className="flex items-center gap-2 text-sm font-bold text-clinical-blue hover:underline"
                    >
                      <Plus className="w-4 h-4" /> Adicionar Pergunta
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-clinical-muted uppercase tracking-widest">Descrição da Etapa</label>
                    <textarea 
                      value={stage.description}
                      onChange={(e) => setFormData(prev => {
                        const newStages = [...(prev.stages || [])];
                        newStages[stageIdx] = { ...newStages[stageIdx], description: e.target.value };
                        return { ...prev, stages: newStages };
                      })}
                      className="w-full px-4 py-2 rounded-lg border border-clinical-border dark:bg-gray-900 dark:text-white outline-none text-sm"
                      placeholder="Contexto para esta etapa..."
                    />
                  </div>

                  <MultimediaEditor 
                    items={stage.multimedia || []}
                    onChange={(items) => setFormData(prev => {
                      const newStages = [...(prev.stages || [])];
                      newStages[stageIdx] = { ...newStages[stageIdx], multimedia: items };
                      return { ...prev, stages: newStages };
                    })}
                  />
                  
                  <div className="space-y-6">
                    {stage.questions?.map((q, qIdx) => (
                      <div key={q.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-clinical-border dark:border-gray-700 space-y-4">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-bold text-clinical-muted uppercase tracking-widest">Pergunta {qIdx + 1}</label>
                          <button 
                            onClick={() => {
                              const newQuestions = stage.questions.filter((_, i) => i !== qIdx);
                              setFormData(prev => {
                                const newStages = [...(prev.stages || [])];
                                newStages[stageIdx] = { ...newStages[stageIdx], questions: newQuestions };
                                return { ...prev, stages: newStages };
                              });
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <input 
                          type="text" 
                          value={q.text}
                          onChange={(e) => {
                            const newQuestions = [...stage.questions!];
                            newQuestions[qIdx].text = e.target.value;
                            setFormData(prev => {
                              const newStages = [...(prev.stages || [])];
                              newStages[stageIdx] = { ...newStages[stageIdx], questions: newQuestions };
                              return { ...prev, stages: newStages };
                            });
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-clinical-border dark:bg-gray-900 dark:text-white outline-none"
                          placeholder="Enunciado da pergunta..."
                        />
                        
                        <MultimediaEditor 
                          items={q.multimedia || []}
                          onChange={(items) => {
                            const newQuestions = [...stage.questions!];
                            newQuestions[qIdx].multimedia = items;
                            setFormData(prev => {
                              const newStages = [...(prev.stages || [])];
                              newStages[stageIdx] = { ...newStages[stageIdx], questions: newQuestions };
                              return { ...prev, stages: newStages };
                            });
                          }}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {q.options.map((opt, optIdx) => (
                            <div key={opt.id} className="flex items-center gap-2">
                              <span className="font-bold text-clinical-blue">{opt.id}</span>
                              <input 
                                type="text" 
                                value={opt.text}
                                onChange={(e) => {
                                  const newQuestions = [...stage.questions!];
                                  newQuestions[qIdx].options[optIdx].text = e.target.value;
                                  setFormData(prev => {
                                    const newStages = [...(prev.stages || [])];
                                    newStages[stageIdx] = { ...newStages[stageIdx], questions: newQuestions };
                                    return { ...prev, stages: newStages };
                                  });
                                }}
                                className="flex-grow px-3 py-1 rounded-lg border border-clinical-border dark:bg-gray-900 dark:text-white outline-none text-sm"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-clinical-muted uppercase tracking-widest">Opção Correta</label>
                            <select 
                              value={q.correctOption}
                              onChange={(e) => {
                                const newQuestions = [...stage.questions!];
                                newQuestions[qIdx].correctOption = e.target.value as any;
                                setFormData(prev => {
                                  const newStages = [...(prev.stages || [])];
                                  newStages[stageIdx] = { ...newStages[stageIdx], questions: newQuestions };
                                  return { ...prev, stages: newStages };
                                });
                              }}
                              className="w-full px-3 py-1 rounded-lg border border-clinical-border dark:bg-gray-900 dark:text-white outline-none text-sm"
                            >
                              <option value="A">A</option>
                              <option value="B">B</option>
                              <option value="C">C</option>
                              <option value="D">D</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-clinical-muted uppercase tracking-widest">Pérola Clínica</label>
                            <input 
                              type="text" 
                              value={q.clinicalPearl}
                              onChange={(e) => {
                                const newQuestions = [...stage.questions!];
                                newQuestions[qIdx].clinicalPearl = e.target.value;
                                setFormData(prev => {
                                  const newStages = [...(prev.stages || [])];
                                  newStages[stageIdx] = { ...newStages[stageIdx], questions: newQuestions };
                                  return { ...prev, stages: newStages };
                                });
                              }}
                              className="w-full px-3 py-1 rounded-lg border border-clinical-border dark:bg-gray-900 dark:text-white outline-none text-sm"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-clinical-muted uppercase tracking-widest">Explicação</label>
                          <textarea 
                            value={q.explanation}
                            onChange={(e) => {
                              const newQuestions = [...stage.questions!];
                              newQuestions[qIdx].explanation = e.target.value;
                              setFormData(prev => {
                                const newStages = [...(prev.stages || [])];
                                newStages[stageIdx] = { ...newStages[stageIdx], questions: newQuestions };
                                return { ...prev, stages: newStages };
                              });
                            }}
                            className="w-full px-3 py-1 rounded-lg border border-clinical-border dark:bg-gray-900 dark:text-white outline-none text-sm min-h-[60px]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

          {currentStep === 'result' && (
            <div className="space-y-6">
              <h4 className="text-lg font-bold dark:text-white border-b pb-2">Resultado Final</h4>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-clinical-muted uppercase tracking-widest">Título do Resultado</label>
                  <input 
                    type="text" 
                    value={formData.result?.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, result: { ...prev.result!, title: e.target.value } }))}
                    className="w-full px-4 py-3 rounded-xl border border-clinical-border dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-clinical-muted uppercase tracking-widest">Descrição do Resultado</label>
                  <textarea 
                    value={formData.result?.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, result: { ...prev.result!, description: e.target.value } }))}
                    className="w-full px-4 py-3 rounded-xl border border-clinical-border dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none min-h-[150px]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-clinical-muted uppercase tracking-widest">URL da Imagem de Resultado (Fallback)</label>
                  <input 
                    type="text" 
                    value={formData.result?.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, result: { ...prev.result!, image: e.target.value } }))}
                    className="w-full px-4 py-3 rounded-xl border border-clinical-border dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none"
                  />
                </div>

                <MultimediaEditor 
                  items={formData.result?.multimedia || []}
                  onChange={(items) => setFormData(prev => ({
                    ...prev,
                    result: { ...prev.result!, multimedia: items }
                  }))}
                />
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-clinical-border dark:border-gray-700 flex justify-between items-center">
          <div className="flex gap-2">
            {(['basic', 'patient', 'questions', 'result'] as const).map((s) => (
              <button 
                key={s}
                onClick={() => setCurrentStep(s)}
                className={`w-3 h-3 rounded-full ${currentStep === s ? 'bg-clinical-blue' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          <div className="flex gap-4">
            {currentStep !== 'basic' && (
              <button 
                onClick={() => {
                  if (currentStep === 'result') setCurrentStep('questions');
                  else if (currentStep === 'questions') setCurrentStep('patient');
                  else setCurrentStep('basic');
                }}
                className="px-6 py-2 border border-clinical-border dark:text-white rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                Anterior
              </button>
            )}
            {currentStep !== 'result' ? (
              <button 
                onClick={() => {
                  if (currentStep === 'basic') setCurrentStep('patient');
                  else if (currentStep === 'patient') setCurrentStep('questions');
                  else setCurrentStep('result');
                }}
                className="px-6 py-2 bg-clinical-blue text-white rounded-xl font-bold hover:bg-blue-600 transition-all"
              >
                Próximo
              </button>
            ) : (
              <button 
                onClick={handleSave}
                className="px-8 py-2 bg-clinical-green text-white rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-200"
              >
                Guardar Caso
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Removed default export
