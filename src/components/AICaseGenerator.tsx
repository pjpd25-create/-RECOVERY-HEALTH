import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Wand2, 
  Stethoscope, 
  Brain, 
  Activity, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  X,
  Save
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { ClinicalCase, Specialty } from '../types';
import { SPECIALTIES, SPECIALTY_CATEGORIES } from '../constants';

interface AICaseGeneratorProps {
  onSave: (c: ClinicalCase) => void;
  onClose: () => void;
}

export const AICaseGenerator = ({ onSave, onClose }: AICaseGeneratorProps) => {
  const [prompt, setPrompt] = useState('');
  const [specialty, setSpecialty] = useState<Specialty>('Saúde Geral');
  const [difficulty, setDifficulty] = useState<'Fácil' | 'Médio' | 'Difícil'>('Médio');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCase, setGeneratedCase] = useState<ClinicalCase | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateCase = async () => {
    if (!prompt.trim()) {
      setError("Por favor, descreva o cenário do caso.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const model = "gemini-3-flash-preview";

      const systemInstruction = `
        Você é um especialista em educação médica e criação de casos clínicos para estudantes de saúde.
        Sua tarefa é gerar um caso clínico completo e realista baseado na descrição do usuário.
        
        REGRAS IMPORTANTES:
        1. O caso deve ser estruturado em 4 etapas: Avaliação Inicial, Diagnóstico Clínico, Plano de Tratamento e (apenas se a especialidade for Fisioterapia) Prescrição de Exercícios.
        2. Cada etapa deve ter de 1 a 3 perguntas de múltipla escolha (A, B, C, D).
        3. Forneça uma explicação detalhada e uma "Pérola Clínica" para cada pergunta.
        4. O paciente deve ter nome, idade, profissão, queixa principal, história clínica e sintomas.
        5. O resultado final deve descrever a evolução do paciente.
        6. Retorne APENAS o JSON puro, sem blocos de código ou markdown.
        
        ESTRUTURA DO JSON:
        {
          "title": "Título do Caso",
          "category": "Uma das categorias da especialidade ${specialty}",
          "difficulty": "${difficulty}",
          "estimatedTime": 20,
          "image": "URL de imagem médica relevante (use Unsplash)",
          "patient": {
            "name": "Nome Completo",
            "age": 45,
            "profession": "Profissão",
            "complaint": "Queixa principal",
            "history": "História clínica detalhada",
            "symptoms": ["Sintoma 1", "Sintoma 2"],
            "evolutionTime": "Tempo de evolução",
            "functionalLimitations": "Limitações funcionais",
            "image": "URL de imagem do paciente (use Unsplash)"
          },
          "stages": [
            { "title": "Avaliação Inicial", "description": "...", "questions": [...], "multimedia": [] },
            { "title": "Diagnóstico Clínico", "description": "...", "questions": [...], "multimedia": [] },
            { "title": "Plano de Tratamento", "description": "...", "questions": [...], "multimedia": [] }
            // Adicione "Prescrição de Exercícios" apenas se specialty for Fisioterapia
          ],
          "result": { "title": "Resultado", "description": "...", "image": "..." }
        }
      `;

      const response = await ai.models.generateContent({
        model,
        contents: `Gere um caso clínico de ${specialty} com dificuldade ${difficulty} baseado nisto: ${prompt}`,
        config: {
          systemInstruction,
          responseMimeType: "application/json"
        }
      });

      const data = JSON.parse(response.text);
      
      // Add ID and ensure specialty
      const finalCase: ClinicalCase = {
        ...data,
        id: `ai_${Date.now()}`,
        specialty
      };

      setGeneratedCase(finalCase);
    } catch (err) {
      console.error("Erro ao gerar caso:", err);
      setError("Falha ao gerar o caso. Tente novamente com uma descrição diferente.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-clinical-border dark:border-gray-700 flex flex-col max-h-[90vh]"
      >
        <div className="bg-gradient-to-r from-clinical-blue to-indigo-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6" />
            <h3 className="text-2xl font-bold">Gerador de Casos IA</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-6">
          {!generatedCase ? (
            <>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-clinical-muted uppercase tracking-widest">Especialidade</label>
                    <select 
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value as Specialty)}
                      className="w-full px-4 py-3 rounded-xl border border-clinical-border dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none"
                    >
                      {SPECIALTIES.map(spec => <option key={spec} value={spec}>{spec}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-clinical-muted uppercase tracking-widest">Dificuldade</label>
                    <select 
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-xl border border-clinical-border dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none"
                    >
                      <option value="Fácil">Fácil</option>
                      <option value="Médio">Médio</option>
                      <option value="Difícil">Difícil</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-clinical-muted uppercase tracking-widest">Descrição do Cenário</label>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ex: Idoso com dor no quadril e histórico de queda recente..."
                    className="w-full px-4 py-3 rounded-xl border border-clinical-border dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none min-h-[120px] resize-none"
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                )}

                <button
                  onClick={generateCase}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full py-4 bg-clinical-blue hover:bg-clinical-blue/90 disabled:opacity-50 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-clinical-blue/20"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Gerando Caso...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Gerar Caso com IA
                    </>
                  )}
                </button>
              </div>

              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
                <h5 className="font-bold text-blue-900 dark:text-blue-100 flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4" /> Dica da IA
                </h5>
                <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                  Quanto mais detalhes você fornecer (idade, sintomas específicos, exames), mais rico e preciso será o caso gerado.
                </p>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl">
                <div className="flex items-center gap-3 text-green-700 dark:text-green-400 mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                  <h4 className="text-xl font-bold">Caso Gerado com Sucesso!</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-bold text-green-800 dark:text-green-300">Título: {generatedCase.title}</p>
                  <p className="text-sm text-green-700 dark:text-green-400">Paciente: {generatedCase.patient.name}, {generatedCase.patient.age} anos</p>
                  <p className="text-sm text-green-700 dark:text-green-400">Especialidade: {generatedCase.specialty}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setGeneratedCase(null)}
                  className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-2xl font-bold transition-all"
                >
                  Descartar e Tentar Novamente
                </button>
                <button
                  onClick={() => onSave(generatedCase)}
                  className="flex-1 py-4 bg-clinical-blue hover:bg-clinical-blue/90 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-clinical-blue/20"
                >
                  <Save className="w-5 h-5" />
                  Salvar Caso
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
