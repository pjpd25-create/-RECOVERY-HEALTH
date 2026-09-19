import * as React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, X, Upload, Sparkles, Zap } from 'lucide-react';
import { ClinicalCase } from '../types';
import { ai, MODELS } from '../gemini';

interface ImageAnalyzerProps {
  caseData: ClinicalCase;
  onClose: () => void;
}

export const ImageAnalyzer = ({ caseData, onClose }: ImageAnalyzerProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!selectedImage || !ai) return;
    setIsAnalyzing(true);
    try {
      const response = await ai.models.generateContent({
        model: MODELS.PRO,
        contents: [
          { text: `Analise esta imagem de um exame de saúde para o caso: ${caseData.title}. O paciente apresenta: ${caseData.patient.complaint}. Descreva possíveis achados clínicos relevantes para um profissional de saúde. Seja técnico mas didático. Responda em Português de Portugal.` },
          { inlineData: { mimeType: "image/jpeg", data: await fetchImageAsBase64(selectedImage) } }
        ]
      });
      setAnalysis(response.text || "Não foi possível analisar a imagem.");
    } catch (error) {
      console.error(error);
      setAnalysis("Erro ao analisar imagem.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  async function fetchImageAsBase64(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        resolve(base64.split(',')[1]);
      };
      reader.readAsDataURL(blob);
    });
  }

  return (
    <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[80vh]"
      >
        <div className="bg-clinical-blue p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Camera className="w-6 h-6" />
            <h3 className="font-bold">Análise de Imagem IA</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold dark:text-white">Imagens do Caso</h4>
              <div className="grid grid-cols-2 gap-4">
                {caseData.stages[0]?.multimedia?.map((m, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedImage(m.url)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${selectedImage === m.url ? 'border-clinical-blue scale-95' : 'border-transparent hover:border-clinical-blue/50'}`}
                  >
                    <img src={m.url} alt={m.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
                <div className="aspect-square rounded-2xl border-2 border-dashed border-clinical-border dark:border-gray-700 flex flex-col items-center justify-center text-clinical-muted hover:text-clinical-blue hover:border-clinical-blue transition-all cursor-pointer">
                  <Upload className="w-6 h-6 mb-2" />
                  <span className="text-[10px] font-bold uppercase">Upload</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold dark:text-white">Pré-visualização</h4>
              {selectedImage ? (
                <div className="space-y-4">
                  <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-clinical-border dark:border-gray-700">
                    <img src={selectedImage} alt="Preview" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full py-4 bg-clinical-blue text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-clinical-blue/20 flex items-center justify-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <Sparkles className="w-5 h-5 animate-pulse" /> Analisando...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" /> Iniciar Análise IA
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="aspect-video rounded-2xl bg-clinical-bg dark:bg-gray-900 border border-clinical-border dark:border-gray-700 flex items-center justify-center text-clinical-muted italic text-sm">
                  Selecione uma imagem para analisar
                </div>
              )}
            </div>
          </div>
          
          {analysis && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-clinical-blue/5 rounded-3xl border border-clinical-blue/20 space-y-4"
            >
              <div className="flex items-center gap-2 text-clinical-blue font-bold">
                <Sparkles className="w-5 h-5" />
                <h4>Relatório de Análise IA</h4>
              </div>
              <div className="text-sm text-clinical-text dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {analysis}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Removed default export
