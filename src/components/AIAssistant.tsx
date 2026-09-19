import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Send, Search, MapPin, Brain, Zap, MessageSquare, Mic } from 'lucide-react';
import { ai, MODELS, ThinkingLevel } from '../gemini';
import { GenerateContentResponse } from '@google/genai';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  isThinking?: boolean;
  isFast?: boolean;
  grounding?: any[];
}

export interface AIAssistantProps {
  isOpen?: boolean;
  onClose?: () => void;
  hideFloatingButton?: boolean;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  hideFloatingButton = false
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleClose = () => {
    if (externalOnClose) {
      externalOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleOpen = () => {
    setInternalIsOpen(true);
  };
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Olá! Sou o seu Mentor Clínico IA. Como posso ajudar no seu raciocínio clínico hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'general' | 'thinking' | 'fast'>('general');
  const [useSearch, setUseSearch] = useState(false);
  const [useMaps, setUseMaps] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !ai) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      let model = MODELS.FLASH;
      let config: any = {
        systemInstruction: "Você é um Mentor Clínico de elite para profissionais de saúde. Seu objetivo é ajudar no raciocínio clínico, fornecer evidências científicas e guiar o aprendizado. Use Português de Portugal.",
        tools: []
      };

      if (mode === 'thinking') {
        model = MODELS.PRO;
        config.thinkingConfig = { thinkingLevel: ThinkingLevel.HIGH };
      } else if (mode === 'fast') {
        model = MODELS.LITE;
      }

      if (useSearch) {
        config.tools.push({ googleSearch: {} });
      }
      if (useMaps) {
        config.tools.push({ googleMaps: {} });
      }

      const chat = ai.chats.create({
        model,
        config
      });

      // Simple history management for the chat session
      // In a real app, we'd pass the full history, but for now we'll use the chat object's internal state
      const response = await chat.sendMessage({ message: userMsg });
      
      const assistantMsg: Message = {
        role: 'assistant',
        text: response.text || "Não consegui processar a sua solicitação.",
        isThinking: mode === 'thinking',
        isFast: mode === 'fast',
        grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', text: "Ocorreu um erro ao processar a sua mensagem." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!hideFloatingButton && (
        <button 
          onClick={handleOpen}
          className="fixed bottom-24 right-6 p-4 bg-clinical-blue text-white rounded-full shadow-2xl hover:scale-110 transition-all z-[100] group"
          title="Mentor Clínico IA"
        >
          <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed inset-x-2 bottom-2 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[400px] h-[550px] max-h-[90vh] bg-white dark:bg-gray-800 rounded-3xl sm:rounded-[32px] shadow-2xl border border-clinical-border dark:border-gray-700 flex flex-col overflow-hidden z-[200]"
          >
            {/* Header */}
            <div className="bg-clinical-blue p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Mentor Clínico IA</h3>
                  <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Inteligência Gemini</p>
                </div>
              </div>
              <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Fechar">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mode Selector */}
            <div className="p-3 bg-gray-50 dark:bg-gray-900 border-b border-clinical-border dark:border-gray-700 flex gap-2 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setMode('general')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${mode === 'general' ? 'bg-clinical-blue text-white' : 'bg-white dark:bg-gray-800 text-clinical-muted border border-clinical-border dark:border-gray-700'}`}
              >
                <MessageSquare className="w-3 h-3" /> Geral
              </button>
              <button 
                onClick={() => setMode('thinking')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${mode === 'thinking' ? 'bg-purple-600 text-white' : 'bg-white dark:bg-gray-800 text-clinical-muted border border-clinical-border dark:border-gray-700'}`}
              >
                <Brain className="w-3 h-3" /> Raciocínio
              </button>
              <button 
                onClick={() => setMode('fast')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${mode === 'fast' ? 'bg-clinical-green text-white' : 'bg-white dark:bg-gray-800 text-clinical-muted border border-clinical-border dark:border-gray-700'}`}
              >
                <Zap className="w-3 h-3" /> Rápido
              </button>
              <div className="w-px h-6 bg-clinical-border dark:bg-gray-700 mx-1" />
              <button 
                onClick={() => setUseSearch(!useSearch)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${useSearch ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-800 text-clinical-muted border border-clinical-border dark:border-gray-700'}`}
              >
                <Search className="w-3 h-3" /> Pesquisa
              </button>
              <button 
                onClick={() => setUseMaps(!useMaps)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${useMaps ? 'bg-red-500 text-white' : 'bg-white dark:bg-gray-800 text-clinical-muted border border-clinical-border dark:border-gray-700'}`}
              >
                <MapPin className="w-3 h-3" /> Mapas
              </button>
              <div className="w-px h-6 bg-clinical-border dark:bg-gray-700 mx-1" />
              <button 
                onClick={() => {
                  handleClose();
                  (window as any).openLiveAssistant?.();
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-clinical-green text-white hover:bg-green-600 transition-all"
              >
                <Mic className="w-3 h-3" /> Voz Live
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-clinical-bg dark:bg-gray-900">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] space-y-2 ${m.role === 'user' ? 'flex flex-col items-end' : 'flex flex-col items-start'}`}>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-clinical-blue text-white rounded-tr-none' : 'bg-white dark:bg-gray-800 dark:text-white border border-clinical-border dark:border-gray-700 rounded-tl-none'}`}>
                      {m.text}
                    </div>
                    {m.role === 'assistant' && (
                      <div className="flex gap-2">
                        {m.isThinking && <span className="text-[8px] font-bold uppercase tracking-widest text-purple-500 bg-purple-50 px-2 py-0.5 rounded-full">Alta Reflexão</span>}
                        {m.isFast && <span className="text-[8px] font-bold uppercase tracking-widest text-clinical-green bg-green-50 px-2 py-0.5 rounded-full">Resposta Rápida</span>}
                        {m.grounding && <span className="text-[8px] font-bold uppercase tracking-widest text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">Com Fontes Externas</span>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-clinical-border dark:border-gray-700 rounded-tl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-clinical-blue rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-clinical-blue rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-clinical-blue rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-clinical-border dark:border-gray-700 bg-white dark:bg-gray-800">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pergunte qualquer coisa..."
                  className="flex-1 px-4 py-3 rounded-xl bg-clinical-bg dark:bg-gray-900 dark:text-white border-none focus:ring-2 focus:ring-clinical-blue outline-none text-sm"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-3 bg-clinical-blue text-white rounded-xl hover:bg-blue-600 transition-all disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
