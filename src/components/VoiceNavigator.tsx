import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Navigation, Volume2, Loader2, Sparkles, X } from 'lucide-react';
import { View } from '../types';

interface VoiceNavigatorProps {
  onNavigate: (view: View) => void;
  onSearch: (query: string) => void;
  onToggleTheme: () => void;
  hideFloatingButton?: boolean;
  onListeningChange?: (isListening: boolean) => void;
}

export const VoiceNavigator: React.FC<VoiceNavigatorProps> = ({ 
  onNavigate, 
  onSearch, 
  onToggleTheme,
  hideFloatingButton = false,
  onListeningChange
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const processCommand = useCallback((text: string) => {
    const command = text.toLowerCase();
    setIsProcessing(true);
    
    let actionTaken = false;
    let message = '';

    if (command.includes('perfil') || command.includes('meu perfil')) {
      onNavigate('profile');
      message = 'A navegar para o seu perfil...';
      actionTaken = true;
    } else if (command.includes('casos') || command.includes('categorias')) {
      onNavigate('categories');
      message = 'A abrir a lista de casos clínicos...';
      actionTaken = true;
    } else if (command.includes('ranking') || command.includes('leaderboard')) {
      onNavigate('leaderboard');
      message = 'A carregar o ranking global...';
      actionTaken = true;
    } else if (command.includes('duelos') || command.includes('duelo')) {
      onNavigate('duels');
      message = 'A entrar na arena de duelos...';
      actionTaken = true;
    } else if (command.includes('escuro') || command.includes('claro') || command.includes('tema')) {
      onToggleTheme();
      message = 'A alternar o tema visual...';
      actionTaken = true;
    } else if (command.includes('procurar') || command.includes('pesquisar')) {
      const query = command.replace('procurar', '').replace('pesquisar', '').trim();
      if (query) {
        onSearch(query);
        message = `A pesquisar por: ${query}`;
        actionTaken = true;
      }
    }

    if (actionTaken) {
      setFeedbackMessage(message);
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 3000);
    } else {
      setFeedbackMessage('Comando não reconhecido. Tente "Ir para perfil" ou "Mudar tema".');
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 3000);
    }

    setIsProcessing(false);
    setIsListening(false);
  }, [onNavigate, onSearch, onToggleTheme]);

  useEffect(() => {
    let recognition: any = null;

    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'pt-PT';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processCommand(text);
      };
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (recognition) recognition.stop();
    };
  }, [processCommand]);

  useEffect(() => {
    onListeningChange?.(isListening);
  }, [isListening, onListeningChange]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      const SpeechRec = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      if (SpeechRec) {
        try {
          new SpeechRec().stop();
        } catch (e) {}
      }
      setIsListening(false);
    } else {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.lang = 'pt-PT';
          recognition.continuous = false;
          recognition.interimResults = false;
          recognition.onstart = () => setIsListening(true);
          recognition.onend = () => setIsListening(false);
          recognition.onresult = (event: any) => {
            const text = event.results[0][0].transcript;
            setTranscript(text);
            processCommand(text);
          };
          recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
          };
          recognition.start();
        } catch (err) {
          console.error('Error starting recognition:', err);
          setIsListening(false);
        }
      } else {
        alert('O seu navegador não suporta reconhecimento de voz.');
      }
    }
  }, [isListening, processCommand]);

  useEffect(() => {
    (window as any).toggleVoiceNavigator = toggleListening;
    return () => {
      delete (window as any).toggleVoiceNavigator;
    };
  }, [toggleListening]);

  return (
    <>
      {/* Feedback Toast - Canto Superior Esquerdo */}
      <div className="fixed top-18 left-4 sm:left-6 z-[110] flex flex-col items-start gap-4 pointer-events-none">
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 p-3.5 rounded-2xl shadow-xl border border-clinical-blue/30 flex items-center gap-3 max-w-xs pointer-events-auto backdrop-blur-md"
            >
              <div className="w-7 h-7 bg-clinical-blue text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs">
                <Navigation className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs font-bold text-gray-800 dark:text-white leading-tight">{feedbackMessage}</p>
              <button 
                onClick={() => setShowFeedback(false)} 
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-clinical-muted ml-auto"
                title="Fechar"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Button (optional, hidden by default when controlled in header) */}
      {!hideFloatingButton && (
        <div className="fixed bottom-32 right-6 z-50 flex flex-col items-end gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleListening}
            className={`w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center transition-all relative group ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white dark:bg-gray-800 text-clinical-blue border border-clinical-blue/20'}`}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            
            {/* Tooltip */}
            <div className="absolute right-full mr-4 px-3 py-2 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
              Navegação por Voz
            </div>

            {/* Listening Rings */}
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-2xl border-4 border-red-500 animate-ping opacity-20" />
                <div className="absolute -inset-2 rounded-3xl border-2 border-red-500/30 animate-pulse" />
              </>
            )}
          </motion.button>
        </div>
      )}

      {/* Compact Voice Listening Card - Canto Superior Esquerdo, sem bloquear a tela */}
      <AnimatePresence>
        {isListening && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed top-18 left-4 sm:left-6 z-[120] bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-2xl border border-teal-500/40 flex flex-col gap-3 max-w-xs backdrop-blur-md"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-red-500 text-white rounded-xl flex items-center justify-center animate-pulse shadow-md shadow-red-500/30">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-900 dark:text-white">A ouvir comando...</h4>
                  <p className="text-[10px] text-clinical-muted font-medium">Fale um comando ou destino</p>
                </div>
              </div>
              <button 
                onClick={toggleListening}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                title="Cancelar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[10px] font-semibold text-gray-600 dark:text-gray-300">
              <span className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">«Ir para perfil»</span>
              <span className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">«Ver casos»</span>
              <span className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">«Modo escuro»</span>
              <span className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">«Duelos»</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
