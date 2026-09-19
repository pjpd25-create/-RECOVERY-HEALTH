import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Zap } from 'lucide-react';

interface AICaseGeneratorModalProps {
  showAiCaseModal: boolean;
  setShowAiCaseModal: (show: boolean) => void;
  aiCaseTheme: string;
  setAiCaseTheme: (theme: string) => void;
  handleGenerateAiCase: () => void;
  isGeneratingAiCase: boolean;
}

export const AICaseGeneratorModal: React.FC<AICaseGeneratorModalProps> = ({
  showAiCaseModal,
  setShowAiCaseModal,
  aiCaseTheme,
  setAiCaseTheme,
  handleGenerateAiCase,
  isGeneratingAiCase
}) => {
  if (!showAiCaseModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-[32px] p-8 shadow-2xl space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold flex items-center gap-2 dark:text-white">
              <Sparkles className="text-purple-600" /> Gerar Caso com IA
            </h3>
            <button onClick={() => setShowAiCaseModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <X className="w-6 h-6 text-clinical-muted" />
            </button>
          </div>
          <p className="text-clinical-muted">
            Descreva o tema ou patologia que deseja que a IA utilize para criar um caso clínico completo.
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold dark:text-white ml-1">Tema do Caso</label>
              <input 
                type="text"
                value={aiCaseTheme}
                onChange={(e) => setAiCaseTheme(e.target.value)}
                placeholder="Ex: Entorse de Tornozelo Grau II, Hérnia Discal L5-S1..."
                className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-clinical-border dark:border-gray-700 focus:ring-2 focus:ring-purple-600 outline-none transition-all dark:text-white"
              />
            </div>
            <button 
              onClick={handleGenerateAiCase}
              disabled={isGeneratingAiCase || !aiCaseTheme}
              className="w-full py-4 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGeneratingAiCase ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Gerando Caso...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" /> Gerar Agora
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
