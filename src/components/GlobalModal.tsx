import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, AlertCircle, Info, Sparkles, Edit3 } from 'lucide-react';

interface GlobalModalProps {
  config: {
    show: boolean;
    type: 'success' | 'error' | 'info' | 'ai' | 'alert' | 'confirm' | 'prompt';
    title: string;
    message: string;
    onConfirm?: (value?: any) => void;
    onCancel?: () => void;
    defaultValue?: string;
  };
  onClose: () => void;
}

export const GlobalModal: React.FC<GlobalModalProps> = ({ config, onClose }) => {
  const icons = {
    success: <CheckCircle2 className="w-12 h-12 text-clinical-green" />,
    error: <AlertCircle className="w-12 h-12 text-red-500" />,
    info: <Info className="w-12 h-12 text-clinical-blue" />,
    ai: <Sparkles className="w-12 h-12 text-clinical-blue animate-pulse" />,
    alert: <Info className="w-12 h-12 text-clinical-blue" />,
    confirm: <AlertCircle className="w-12 h-12 text-clinical-blue" />,
    prompt: <Edit3 className="w-12 h-12 text-clinical-blue" />
  };

  const colors = {
    success: 'bg-clinical-green',
    error: 'bg-red-500',
    info: 'bg-clinical-blue',
    ai: 'bg-clinical-blue',
    alert: 'bg-clinical-blue',
    confirm: 'bg-clinical-blue',
    prompt: 'bg-clinical-blue'
  };

  return (
    <AnimatePresence>
      {config.show && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-gray-800 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-clinical-border dark:border-gray-700"
          >
            <div className={`h-2 ${colors[config.type]}`} />
            <div className="p-8 text-center space-y-6">
              <div className="flex justify-center">{icons[config.type]}</div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold dark:text-white">{config.title}</h3>
                <p className="text-clinical-muted leading-relaxed">{config.message}</p>
              </div>
              
              {config.type === 'prompt' && (
                <input
                  type="text"
                  defaultValue={config.defaultValue}
                  id="modal-prompt-input"
                  className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-clinical-border dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none transition-all dark:text-white"
                  autoFocus
                />
              )}

              <div className="flex gap-3">
                {(config.type === 'confirm' || config.type === 'prompt') && (
                  <button 
                    onClick={() => {
                      if (config.onCancel) config.onCancel();
                      onClose();
                    }}
                    className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 text-clinical-muted rounded-2xl font-bold transition-all hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                )}
                <button 
                  onClick={() => {
                    if (config.type === 'prompt') {
                      const input = document.getElementById('modal-prompt-input') as HTMLInputElement;
                      if (config.onConfirm) config.onConfirm(input.value);
                    } else {
                      if (config.onConfirm) config.onConfirm();
                    }
                    onClose();
                  }}
                  className={`flex-1 py-4 ${colors[config.type]} text-white rounded-2xl font-bold shadow-lg transition-all hover:opacity-90`}
                >
                  {config.type === 'confirm' || config.type === 'prompt' ? 'Confirmar' : 'OK'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
