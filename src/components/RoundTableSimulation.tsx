import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  MessageSquare, 
  Send, 
  X, 
  Stethoscope, 
  Activity, 
  Heart, 
  Brain,
  Sparkles,
  Loader2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { ClinicalCase } from '../types';

interface RoundTableSimulationProps {
  caseData: ClinicalCase;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'ai';
  agent?: string;
  text: string;
  timestamp: number;
}

const AGENTS = [
  { id: 'physio', name: 'Dr. Silva (Fisioterapeuta)', icon: Activity, color: 'text-clinical-blue' },
  { id: 'doctor', name: 'Dra. Santos (Médica)', icon: Stethoscope, color: 'text-red-500' },
  { id: 'nurse', name: 'Enf. Costa (Enfermeiro)', icon: Heart, color: 'text-green-500' },
  { id: 'nutrition', name: 'Dr. Lima (Nutricionista)', icon: Brain, color: 'text-orange-500' }
];

export const RoundTableSimulation = ({ caseData, onClose }: RoundTableSimulationProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'ai', 
      agent: 'Dra. Santos (Médica)', 
      text: `Olá a todos. Estamos aqui para discutir o caso de ${caseData.patient.name}, ${caseData.patient.age} anos. Queixa principal: ${caseData.patient.complaint}. Quais são as vossas primeiras impressões?`,
      timestamp: Date.now() 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isThinking) return;

    const userMsg: Message = {
      role: 'user',
      text: inputText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const model = "gemini-3-flash-preview";

      const history = messages.map(m => `${m.agent || 'Estudante'}: ${m.text}`).join('\n');
      
      const prompt = `
        Você está em uma reunião multidisciplinar discutindo o seguinte caso clínico:
        ${JSON.stringify(caseData)}
        
        Histórico da conversa:
        ${history}
        
        O estudante disse: "${inputText}"
        
        Agora, gere respostas curtas e profissionais de 2 ou 3 dos seguintes especialistas, reagindo ao que o estudante disse e entre si:
        - Dr. Silva (Fisioterapeuta)
        - Dra. Santos (Médica)
        - Enf. Costa (Enfermeiro)
        - Dr. Lima (Nutricionista)
        
        Formate a resposta como um JSON:
        [
          { "agent": "Nome do Especialista", "text": "Resposta dele..." },
          ...
        ]
      `;

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const aiResponses = JSON.parse(response.text);
      
      const newMessages: Message[] = aiResponses.map((r: any) => ({
        role: 'ai',
        agent: r.agent,
        text: r.text,
        timestamp: Date.now()
      }));

      setMessages(prev => [...prev, ...newMessages]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 w-full max-w-4xl h-[85vh] rounded-[40px] overflow-hidden shadow-2xl border border-white/20 flex flex-col"
      >
        <div className="bg-gradient-to-r from-clinical-blue to-indigo-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black">Round Table Multidisciplinar</h3>
              <p className="text-xs text-white/70 font-bold uppercase tracking-widest">Simulação de Reunião Clínica</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow overflow-hidden flex">
          {/* Sidebar: Participants */}
          <div className="w-64 border-r border-clinical-border dark:border-gray-800 p-6 hidden md:block bg-gray-50 dark:bg-gray-950">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-clinical-muted mb-6">Participantes</h4>
            <div className="space-y-4">
              {AGENTS.map(agent => (
                <div key={agent.id} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-2xl border border-clinical-border dark:border-gray-800 shadow-sm">
                  <div className={`w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${agent.color}`}>
                    <agent.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold dark:text-white truncate">{agent.name}</p>
                    <p className="text-[8px] text-clinical-muted uppercase font-black">Online</p>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-3 p-3 bg-clinical-blue/10 rounded-2xl border border-clinical-blue/20">
                <div className="w-10 h-10 rounded-xl bg-clinical-blue text-white flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-clinical-blue">Você</p>
                  <p className="text-[8px] text-clinical-blue/60 uppercase font-black">Estudante</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
            >
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] space-y-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    {msg.agent && (
                      <p className="text-[10px] font-black uppercase tracking-widest text-clinical-muted ml-2">
                        {msg.agent}
                      </p>
                    )}
                    <div className={`p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-clinical-blue text-white rounded-tr-none' 
                        : 'bg-gray-100 dark:bg-gray-800 dark:text-white rounded-tl-none border border-clinical-border dark:border-gray-700'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-3xl rounded-tl-none flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-clinical-blue" />
                    <span className="text-xs font-bold text-clinical-muted">Os especialistas estão a discutir...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-clinical-border dark:border-gray-800">
              <div className="relative">
                <input 
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Participe na discussão..."
                  className="w-full bg-gray-50 dark:bg-gray-950 border border-clinical-border dark:border-gray-800 rounded-2xl pl-6 pr-14 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-clinical-blue/20 transition-all dark:text-white"
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputText.trim() || isThinking}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-clinical-blue text-white rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
