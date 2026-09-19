import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, X, Volume2, VolumeX, Sparkles, Activity } from 'lucide-react';
import { ai, MODELS, Modality } from '../gemini';

export const LiveVoiceAssistant = ({ onClose }: { onClose: () => void }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState('Pronto para iniciar');
  
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startSession = async () => {
    if (!ai) return;
    setIsConnecting(true);
    setStatus('Conectando ao Gemini Live...');

    try {
      const session = await ai.live.connect({
        model: MODELS.LIVE,
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: "Você é um Mentor Clínico em tempo real. Responda de forma concisa e direta por voz. Use Português de Portugal.",
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } }
          }
        },
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            setStatus('Em conversa...');
            startAudioCapture();
          },
          onmessage: async (message) => {
            if (message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data) {
              const base64Audio = message.serverContent.modelTurn.parts[0].inlineData.data;
              playAudioResponse(base64Audio);
            }
            if (message.serverContent?.interrupted) {
              stopAudioPlayback();
            }
          },
          onclose: () => {
            stopSession();
          },
          onerror: (err) => {
            console.error(err);
            setStatus('Erro na conexão');
            stopSession();
          }
        }
      });
      sessionRef.current = session;
    } catch (error) {
      console.error(error);
      setIsConnecting(false);
      setStatus('Falha ao iniciar');
    }
  };

  const startAudioCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const audioContext = new AudioContext({ sampleRate: 16000 });
      audioContextRef.current = audioContext;
      
      const source = audioContext.createMediaStreamSource(stream);
      sourceRef.current = source;
      
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;
      
      processor.onaudioprocess = (e) => {
        if (isMuted || !sessionRef.current) return;
        const inputData = e.inputBuffer.getChannelData(0);
        // Convert Float32 to Int16 PCM
        const pcmData = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7FFF;
        }
        const base64Data = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)));
        sessionRef.current.sendRealtimeInput({
          audio: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
        });
      };
      
      source.connect(processor);
      processor.connect(audioContext.destination);
    } catch (error) {
      console.error('Erro ao capturar áudio:', error);
      setStatus('Erro no microfone');
    }
  };

  const playAudioResponse = (base64Data: string) => {
    if (!audioContextRef.current) return;
    const binaryString = atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    const pcmData = new Int16Array(bytes.buffer);
    const float32Data = new Float32Array(pcmData.length);
    for (let i = 0; i < pcmData.length; i++) {
        float32Data[i] = pcmData[i] / 0x7FFF;
    }
    
    const buffer = audioContextRef.current.createBuffer(1, float32Data.length, 16000);
    buffer.getChannelData(0).set(float32Data);
    
    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextRef.current.destination);
    source.start();
  };

  const stopAudioPlayback = () => {
    // Simple implementation: would need to track active sources for better control
  };

  const stopSession = () => {
    setIsActive(false);
    sessionRef.current?.close();
    sessionRef.current = null;
    
    processorRef.current?.disconnect();
    sourceRef.current?.disconnect();
    streamRef.current?.getTracks().forEach(t => t.stop());
    audioContextRef.current?.close();
    
    audioContextRef.current = null;
    processorRef.current = null;
    sourceRef.current = null;
    streamRef.current = null;
    setStatus('Sessão encerrada');
  };

  useEffect(() => {
    return () => stopSession();
  }, []);

  return (
    <div className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 w-full max-w-md rounded-[40px] p-8 text-center space-y-8 shadow-2xl border border-white/10"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-clinical-blue">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-widest">Gemini Live</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <X className="w-6 h-6 dark:text-white" />
          </button>
        </div>

        <div className="relative flex items-center justify-center py-12">
          <AnimatePresence>
            {isActive && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-48 h-48 bg-clinical-blue/20 rounded-full animate-ping" />
                <div className="absolute w-40 h-40 bg-clinical-blue/30 rounded-full animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all ${isActive ? 'bg-clinical-blue scale-110 shadow-2xl shadow-clinical-blue/40' : 'bg-gray-100 dark:bg-gray-700'}`}>
            {isActive ? (
              <Volume2 className="w-12 h-12 text-white animate-bounce" />
            ) : (
              <Mic className="w-12 h-12 text-clinical-muted" />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black dark:text-white">Conversa por Voz</h3>
          <p className="text-clinical-muted font-medium">{status}</p>
        </div>

        <div className="flex justify-center gap-4">
          {!isActive ? (
            <button 
              onClick={startSession}
              disabled={isConnecting}
              className="px-8 py-4 bg-clinical-blue text-white rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-xl shadow-clinical-blue/20 disabled:opacity-50"
            >
              {isConnecting ? 'Conectando...' : 'Iniciar Conversa'}
            </button>
          ) : (
            <>
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`p-6 rounded-2xl transition-all ${isMuted ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-clinical-muted'}`}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              <button 
                onClick={stopSession}
                className="px-8 py-4 bg-red-500 text-white rounded-2xl font-black text-lg hover:bg-red-600 transition-all shadow-xl shadow-red-500/20"
              >
                Encerrar
              </button>
            </>
          )}
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-clinical-muted uppercase tracking-widest">
            <Activity className="w-3 h-3" />
            Latência Ultra-Baixa
          </div>
        </div>
      </motion.div>
    </div>
  );
};
