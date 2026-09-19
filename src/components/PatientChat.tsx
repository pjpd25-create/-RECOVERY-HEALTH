import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, X, Send } from 'lucide-react';
import { ClinicalCase } from '../types';
import { ai, MODELS } from '../gemini';

interface PatientChatProps {
  caseData: ClinicalCase;
  onClose: () => void;
}

export const PatientChat = ({ caseData, onClose }: PatientChatProps) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'patient', text: string }[]>([
    { role: 'patient', text: `Olá, sou o ${caseData.patient.name}. Como me pode ajudar hoje?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);

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
      if (!chatSessionRef.current) {
        chatSessionRef.current = ai.chats.create({
          model: MODELS.FLASH,
          config: {
            systemInstruction: `Você é um paciente chamado ${caseData.patient.name}, de ${caseData.patient.age} anos, profissão ${caseData.patient.profession}. 
            Sua queixa principal é: ${caseData.patient.complaint}. 
            História clínica: ${caseData.patient.history}. 
            Sintomas: ${caseData.patient.symptoms.join(', ')}.
            Responda de forma realista, como um paciente falaria. Não dê diagnósticos. 
            Se o aluno fizer perguntas pertinentes à anamnese, forneça as informações de forma natural.
            Mantenha as respostas concisas e em Português de Portugal.`
          }
        });
      }

      const response = await chatSessionRef.current.sendMessage({ message: userMsg });
      const patientMsg = response.text || "Desculpe, não entendi.";
      setMessages(prev => [...prev, { role: 'patient', text: patientMsg }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'patient', text: "Ocorreu um erro na comunicação." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[600px]"
      >
        <div className="bg-clinical-blue p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6" />
            <h3 className="font-bold">Conversar com o Paciente</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-clinical-bg dark:bg-gray-900">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-clinical-blue text-white rounded-tr-none' : 'bg-white dark:bg-gray-800 dark:text-white border border-clinical-border dark:border-gray-700 rounded-tl-none'}`}>
                {m.text}
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

        <div className="p-4 border-t border-clinical-border dark:border-gray-700 bg-white dark:bg-gray-800">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Faça uma pergunta ao paciente..."
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
    </div>
  );
};

// Removed default export
