import * as React from 'react';
import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Activity, X, Upload, Sparkles, Zap, Camera, 
  ChevronRight, Ruler, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { ai, MODELS } from '../gemini';

interface BiomechanicsLabProps {
  onClose: () => void;
}

export const BiomechanicsLab = ({ onClose }: BiomechanicsLabProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage || !ai) return;
    setIsAnalyzing(true);
    try {
      const base64Data = selectedImage.split(',')[1];
      const response = await ai.models.generateContent({
        model: MODELS.PRO,
        contents: [
          { 
            text: `Você é um especialista em biomecânica e posturologia. 
            Analise esta imagem de um paciente em postura estática (vista anterior, posterior ou lateral).
            Identifique:
            1. Alinhamento da cabeça e pescoço.
            2. Nivelamento dos ombros e escápulas.
            3. Alinhamento da coluna (escoliose, hipercifose, hiperlordose).
            4. Nivelamento da pelve.
            5. Alinhamento de joelhos (valgo/varo) e pés.
            
            Forneça um relatório estruturado com:
            - Achados Principais
            - Desvios Detetados
            - Sugestões de Intervenção Fisioterapêutica.
            
            Responda em Português de Portugal, de forma técnica e profissional.
            Retorne o resultado em formato JSON com as chaves: "findings" (string), "deviations" (array de strings), "suggestions" (array de strings).` 
          },
          { inlineData: { mimeType: "image/jpeg", data: base64Data } }
        ],
        config: {
          responseMimeType: "application/json"
        }
      });

      const result = JSON.parse(response.text || "{}");
      setAnalysis(result);
    } catch (error) {
      console.error(error);
      alert("Erro ao analisar a biomecânica. Tente novamente.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 w-full max-w-5xl h-[90vh] rounded-[40px] overflow-hidden shadow-2xl flex flex-col"
      >
        <div className="bg-gradient-to-r from-clinical-blue to-indigo-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tight uppercase">Laboratório de Biomecânica Digital</h3>
              <p className="text-white/70 text-sm font-medium">Análise Postural Assistida por IA</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-8 h-8" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 bg-clinical-bg dark:bg-gray-900">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side: Upload & Preview */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-[32px] border border-clinical-border dark:border-gray-700 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-black uppercase tracking-tight dark:text-white">Captura de Dados</h4>
                  <Ruler className="text-clinical-blue w-5 h-5" />
                </div>
                
                {!selectedImage ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-[3/4] rounded-[24px] border-4 border-dashed border-clinical-border dark:border-gray-700 flex flex-col items-center justify-center text-clinical-muted hover:text-clinical-blue hover:border-clinical-blue transition-all cursor-pointer bg-gray-50 dark:bg-gray-900 group"
                  >
                    <div className="w-20 h-20 bg-clinical-blue/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Camera className="w-10 h-10" />
                    </div>
                    <p className="mt-4 font-bold uppercase tracking-widest text-xs">Carregar Foto do Paciente</p>
                    <p className="text-[10px] mt-2 opacity-60">Vista Anterior, Posterior ou Lateral</p>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden border border-clinical-border dark:border-gray-700 bg-black">
                      <img src={selectedImage} alt="Preview" className="w-full h-full object-contain" />
                      <button 
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      
                      {/* Simulated Overlay Grid */}
                      <div className="absolute inset-0 pointer-events-none opacity-20">
                        <div className="h-full w-[1px] bg-clinical-blue absolute left-1/2" />
                        <div className="w-full h-[1px] bg-clinical-blue absolute top-1/4" />
                        <div className="w-full h-[1px] bg-clinical-blue absolute top-1/2" />
                        <div className="w-full h-[1px] bg-clinical-blue absolute top-3/4" />
                      </div>
                    </div>
                    
                    <button 
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="w-full py-5 bg-clinical-blue text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-clinical-blue/20 flex items-center justify-center gap-3"
                    >
                      {isAnalyzing ? (
                        <>
                          <Sparkles className="w-6 h-6 animate-spin" /> Processando Biomecânica...
                        </>
                      ) : (
                        <>
                          <Zap className="w-6 h-6" /> Iniciar Análise Postural
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Side: Analysis Results */}
            <div className="space-y-8">
              {!analysis && !isAnalyzing ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-6">
                  <div className="w-24 h-24 bg-clinical-blue/5 rounded-full flex items-center justify-center text-clinical-blue">
                    <Activity className="w-12 h-12 opacity-20" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-tight dark:text-white">Aguardando Dados</h4>
                    <p className="text-clinical-muted text-sm max-w-xs mx-auto mt-2">
                      Carregue uma imagem do paciente para que a nossa IA possa realizar a análise biomecânica detalhada.
                    </p>
                  </div>
                </div>
              ) : isAnalyzing ? (
                <div className="space-y-6 animate-pulse">
                  <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl w-3/4" />
                  <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-3xl" />
                  <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-3xl" />
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-[32px] border border-clinical-border dark:border-gray-700 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 text-clinical-blue">
                      <Sparkles className="w-6 h-6" />
                      <h4 className="text-lg font-black uppercase tracking-tight dark:text-white">Relatório Postural</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-6 bg-clinical-blue/5 rounded-2xl border border-clinical-blue/10">
                        <p className="text-sm text-clinical-text dark:text-gray-300 leading-relaxed">
                          {analysis.findings}
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <h5 className="text-xs font-black uppercase tracking-widest text-clinical-muted flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-500" /> Desvios Detetados
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {analysis.deviations.map((dev: string, i: number) => (
                            <span key={i} className="px-3 py-1.5 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-orange-100 dark:border-orange-500/20">
                              {dev}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h5 className="text-xs font-black uppercase tracking-widest text-clinical-muted flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-clinical-green" /> Recomendações
                        </h5>
                        <ul className="space-y-2">
                          {analysis.suggestions.map((sug: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-clinical-text dark:text-gray-300">
                              <div className="w-5 h-5 bg-clinical-green/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <ChevronRight className="w-3 h-3 text-clinical-green" />
                              </div>
                              {sug}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-indigo-600 rounded-[32px] text-white space-y-4 shadow-xl shadow-indigo-600/20">
                    <h4 className="font-bold flex items-center gap-2">
                      <Zap className="w-5 h-5" /> Próximos Passos
                    </h4>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Esta análise é um auxílio diagnóstico. Recomendamos a realização de testes de mobilidade articular e força muscular para confirmar os achados.
                    </p>
                    <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold text-xs hover:bg-indigo-50 transition-all">
                      Gerar PDF do Relatório
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
