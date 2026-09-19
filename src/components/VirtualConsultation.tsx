import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, X, Send, User, Sparkles, 
  Brain, ClipboardList, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { ai, MODELS } from '../gemini';

interface VirtualConsultationProps {
  onClose: () => void;
}

export const VirtualConsultation = ({ onClose }: VirtualConsultationProps) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'patient' | 'system', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [consultationStatus, setConsultationStatus] = useState<'setup' | 'chat' | 'summary'>('setup');
  const [patientData, setPatientData] = useState<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startConsultation = async () => {
    setIsLoading(true);
    try {
      if (!ai) return;
      
      const response = await ai.models.generateContent({
        model: MODELS.FLASH,
        contents: "Gere um perfil de paciente fictício para uma consulta de fisioterapia. Inclua: Nome, Idade, Profissão, Queixa Principal (ex: dor no ombro), História da Doença Atual (HDA) e Antecedentes Pessoais. Responda em JSON.",
        config: { responseMimeType: "application/json" }
      });

      const data = JSON.parse(response.text || "{}");
      setPatientData(data);
      setConsultationStatus('chat');
      setMessages([
        { role: 'system', text: "Consulta iniciada. O paciente está na sala. Comece a anamnese." },
        { role: 'patient', text: `Bom dia, Dr(a). Eu sou o ${data.Nome || data.nome}. Vim aqui porque ${data.QueixaPrincipal || data.queixa_principal}.` }
      ]);
    } catch (error) {
      console.error(error);
      alert("Erro ao iniciar consulta.");
    } finally {
      setIsLoading(false);
    }
  };

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
            systemInstruction: `Você é um paciente chamado ${patientData.Nome || patientData.nome}, de ${patientData.Idade || patientData.idade} anos. 
            Sua queixa: ${patientData.QueixaPrincipal || patientData.queixa_principal}. 
            Sua história: ${patientData.HDA || patientData.hda}.
            Responda de forma realista, com emoção e detalhes, mas sem dar o diagnóstico diretamente. 
            Seja um pouco vago se a pergunta não for específica. 
            Mantenha as respostas em Português de Portugal.`
          }
        });
      }

      const response = await chatSessionRef.current.sendMessage({ message: userMsg });
      const patientMsg = response.text || "Não sei bem o que dizer...";
      setMessages(prev => [...prev, { role: 'patient', text: patientMsg }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'system', text: "Erro na conexão com o paciente." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const finishConsultation = async () => {
    setIsLoading(true);
    try {
      if (!ai) return;
      const chatHistory = messages.map(m => `${m.role}: ${m.text}`).join('\n');
      const response = await ai.models.generateContent({
        model: MODELS.PRO,
        contents: `Analise esta anamnese realizada por um estudante de fisioterapia:\n\n${chatHistory}\n\nO paciente real tinha: ${JSON.stringify(patientData)}\n\nForneça um feedback sobre a qualidade das perguntas, o que faltou perguntar e uma nota de 0 a 100 para o raciocínio clínico. Responda em Português de Portugal.`
      });
      
      setMessages(prev => [...prev, { role: 'system', text: response.text || "Feedback não disponível." }]);
      setConsultationStatus('summary');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-[40px] overflow-hidden shadow-2xl flex flex-col h-[80vh]"
      >
        <div className="bg-clinical-blue p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6" />
            <h3 className="text-xl font-black uppercase tracking-tight">Teleconsulta Simulada (IA)</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-clinical-bg dark:bg-gray-900">
          {consultationStatus === 'setup' ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 bg-clinical-blue/10 rounded-full flex items-center justify-center text-clinical-blue">
                <User className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-black dark:text-white">NOVO PACIENTE VIRTUAL</h4>
                <p className="text-clinical-muted max-w-sm mx-auto">
                  A IA irá gerar um paciente com uma condição clínica aleatória. O seu objetivo é realizar a anamnese completa e chegar ao diagnóstico.
                </p>
              </div>
              <button 
                onClick={startConsultation}
                disabled={isLoading}
                className="px-8 py-4 bg-clinical-blue text-white rounded-2xl font-bold hover:bg-blue-600 transition-all flex items-center gap-2"
              >
                {isLoading ? "Gerando Paciente..." : "Iniciar Consulta"}
                <Sparkles className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : m.role === 'system' ? 'justify-center' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-3xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-clinical-blue text-white rounded-tr-none shadow-lg shadow-clinical-blue/10' 
                      : m.role === 'system'
                      ? 'bg-gray-100 dark:bg-gray-800 text-clinical-muted text-xs font-bold italic border border-clinical-border dark:border-gray-700'
                      : 'bg-white dark:bg-gray-800 dark:text-white border border-clinical-border dark:border-gray-700 rounded-tl-none shadow-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-3xl border border-clinical-border dark:border-gray-700 rounded-tl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-clinical-blue rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-clinical-blue rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-clinical-blue rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </>
          )}
        </div>

        {consultationStatus === 'chat' && (
          <div className="p-4 border-t border-clinical-border dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Faça uma pergunta ao paciente..."
                className="flex-1 px-5 py-4 rounded-2xl bg-clinical-bg dark:bg-gray-900 dark:text-white border-none focus:ring-2 focus:ring-clinical-blue outline-none text-sm font-medium"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-4 bg-clinical-blue text-white rounded-2xl hover:bg-blue-600 transition-all disabled:opacity-50 shadow-lg shadow-clinical-blue/20"
              >
                <Send className="w-6 h-6" />
              </button>
            </form>
            <button 
              onClick={finishConsultation}
              className="w-full py-2 text-xs font-bold text-clinical-muted hover:text-clinical-blue transition-colors flex items-center justify-center gap-2"
            >
              <ClipboardList className="w-4 h-4" /> Finalizar Consulta e Receber Feedback
            </button>
          </div>
        )}

        {consultationStatus === 'summary' && (
          <div className="p-6 bg-clinical-blue text-white">
            <button 
              onClick={onClose}
              className="w-full py-4 bg-white text-clinical-blue rounded-2xl font-bold hover:bg-gray-50 transition-all"
            >
              Voltar ao Hub
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
