import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  MessageSquare, 
  Send, 
  Bot, 
  Stethoscope, 
  Activity, 
  Apple, 
  UserCircle,
  Loader2,
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';
import { ClinicalCase } from '../../types';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

interface RoundTableSimulationProps {
  caseData: ClinicalCase;
  onClose: () => void;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  specialty: string;
  avatar: string;
  color: string;
  icon: React.ReactNode;
}

interface Message {
  id: string;
  agentId: string;
  text: string;
  timestamp: string;
}

export const RoundTableSimulation: React.FC<RoundTableSimulationProps> = ({ caseData, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeAgentIndex, setActiveAgentIndex] = useState(-1);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const agents: Agent[] = [
    { 
      id: 'physio', 
      name: 'Dr. Silva', 
      role: 'Fisioterapeuta', 
      specialty: 'Reabilitação Musculoesquelética', 
      avatar: 'https://picsum.photos/seed/physio/200/200',
      color: 'bg-clinical-blue',
      icon: <Activity className="w-4 h-4" />
    },
    { 
      id: 'doctor', 
      name: 'Dra. Santos', 
      role: 'Médica Ortopedista', 
      specialty: 'Cirurgia do Quadril', 
      avatar: 'https://picsum.photos/seed/doctor/200/200',
      color: 'bg-clinical-green',
      icon: <Stethoscope className="w-4 h-4" />
    },
    { 
      id: 'nurse', 
      name: 'Enf. Ricardo', 
      role: 'Enfermeiro', 
      specialty: 'Gestão de Dor e Cuidados', 
      avatar: 'https://picsum.photos/seed/nurse/200/200',
      color: 'bg-purple-600',
      icon: <UserCircle className="w-4 h-4" />
    },
    { 
      id: 'nutritionist', 
      name: 'Dra. Lima', 
      role: 'Nutricionista', 
      specialty: 'Nutrição Clínica e Inflamação', 
      avatar: 'https://picsum.photos/seed/nutri/200/200',
      color: 'bg-orange-500',
      icon: <Apple className="w-4 h-4" />
    }
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startDiscussion = async () => {
    if (messages.length > 0) return;
    
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY });
      
      // We'll generate the initial discussion in one go to simulate a natural flow
      const prompt = `Simule uma reunião de mesa redonda multidisciplinar sobre este caso clínico:
      Caso: ${caseData.title}
      Paciente: ${caseData.patient.name}, ${caseData.patient.age} anos.
      Queixa: ${caseData.patient.complaint}
      História: ${caseData.patient.history}
      
      Agentes na mesa:
      1. Dr. Silva (Fisioterapeuta)
      2. Dra. Santos (Médica Ortopedista)
      3. Enf. Ricardo (Enfermeiro)
      4. Dra. Lima (Nutricionista)
      
      Gere uma conversa curta e técnica (máximo 8 mensagens no total) onde eles discutem o diagnóstico e o plano de cuidados integrado.
      O formato deve ser um JSON array de objetos: [{"agentId": "physio|doctor|nurse|nutritionist", "text": "..."}]
      
      Mantenha as personalidades:
      - Fisioterapeuta foca em biomecânica e função.
      - Médica foca em patologia e exames.
      - Enfermeiro foca em dor e adesão.
      - Nutricionista foca em suporte metabólico e inflamação.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const discussion = JSON.parse(response.text);
      
      // Simulate typing for each message
      for (let i = 0; i < discussion.length; i++) {
        const msg = discussion[i];
        const agentIndex = agents.findIndex(a => a.id === msg.agentId);
        setActiveAgentIndex(agentIndex);
        await new Promise(r => setTimeout(r, 1500)); // Simulate thinking/typing
        
        setMessages(prev => [...prev, {
          id: `msg_${Date.now()}_${i}`,
          agentId: msg.agentId,
          text: msg.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
      
      setActiveAgentIndex(-1);
    } catch (error) {
      console.error("Round table error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    startDiscussion();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 w-full max-w-5xl h-[85vh] rounded-[40px] shadow-2xl flex flex-col overflow-hidden border border-white/20"
      >
        {/* Header */}
        <div className="p-6 border-b border-clinical-border dark:border-gray-800 flex items-center justify-between bg-gradient-to-r from-clinical-blue/5 to-purple-500/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-clinical-blue text-white rounded-2xl flex items-center justify-center shadow-lg shadow-clinical-blue/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black dark:text-white">Mesa Redonda Multidisciplinar</h2>
              <p className="text-xs text-clinical-muted font-bold uppercase tracking-widest">Discussão de Caso: {caseData.title}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-colors"
          >
            <X className="w-6 h-6 text-clinical-muted" />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar - Agents */}
          <div className="w-64 border-r border-clinical-border dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 p-6 hidden md:block overflow-y-auto">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-clinical-muted mb-6">Equipa Clínica</h3>
            <div className="space-y-6">
              {agents.map((agent, idx) => (
                <div key={agent.id} className={`flex items-center gap-3 transition-opacity duration-300 ${activeAgentIndex !== -1 && activeAgentIndex !== idx ? 'opacity-40' : 'opacity-100'}`}>
                  <div className="relative">
                    <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-xl object-cover border-2 border-white dark:border-gray-800 shadow-sm" />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${agent.color} text-white rounded-lg flex items-center justify-center border-2 border-white dark:border-gray-800`}>
                      {agent.icon}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-black dark:text-white">{agent.name}</p>
                    <p className="text-[9px] text-clinical-muted font-bold uppercase tracking-tight">{agent.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-4 bg-clinical-blue/5 rounded-2xl border border-clinical-blue/10">
              <div className="flex items-center gap-2 text-clinical-blue mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">IA Insight</span>
              </div>
              <p className="text-[10px] text-clinical-muted font-bold leading-relaxed">
                Esta simulação utiliza agentes de IA treinados em diferentes especialidades para fornecer uma visão holística do paciente.
              </p>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence>
                {messages.map((msg) => {
                  const agent = agents.find(a => a.id === msg.agentId)!;
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="flex gap-4"
                    >
                      <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0 shadow-sm" />
                      <div className="space-y-1 max-w-[85%]">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black dark:text-white">{agent.name}</span>
                          <span className={`px-2 py-0.5 ${agent.color} text-white text-[8px] font-black uppercase tracking-widest rounded-md`}>
                            {agent.role}
                          </span>
                          <span className="text-[9px] text-clinical-muted font-bold">{msg.timestamp}</span>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl rounded-tl-none border border-clinical-border dark:border-gray-800">
                          <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed">
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {activeAgentIndex !== -1 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-4"
                >
                  <img src={agents[activeAgentIndex].avatar} alt="Typing" className="w-10 h-10 rounded-xl object-cover animate-pulse" />
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl rounded-tl-none border border-clinical-border dark:border-gray-800 flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-clinical-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-clinical-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-clinical-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-clinical-muted">
                      {agents[activeAgentIndex].name} está a escrever...
                    </span>
                  </div>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area (Simulated) */}
            <div className="p-6 border-t border-clinical-border dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
              <div className="relative">
                <input 
                  type="text" 
                  disabled
                  placeholder="A discussão está a decorrer..."
                  className="w-full bg-white dark:bg-gray-800 border border-clinical-border dark:border-gray-700 rounded-2xl px-6 py-4 pr-12 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-clinical-blue/20 transition-all disabled:opacity-50"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-clinical-blue text-white rounded-xl shadow-lg shadow-clinical-blue/20 opacity-50 cursor-not-allowed">
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[9px] text-center mt-3 text-clinical-muted font-bold uppercase tracking-widest">
                Observe a discussão entre os especialistas para aprender abordagens integradas.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
