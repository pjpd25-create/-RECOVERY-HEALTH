import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Copy, MessageCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface PaymentModalProps {
  showPaymentModal: boolean;
  setShowPaymentModal: (show: boolean) => void;
  user: UserProfile;
  isPaymentProcessing: boolean;
  setIsPaymentProcessing: (processing: boolean) => void;
  sendWhatsAppNotification: (message: string) => void;
  setPendingPayments: React.Dispatch<React.SetStateAction<any[]>>;
  showAlert: (title: string, message: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  showPaymentModal,
  setShowPaymentModal,
  user,
  isPaymentProcessing,
  setIsPaymentProcessing,
  sendWhatsAppNotification,
  setPendingPayments,
  showAlert
}) => {
  if (!showPaymentModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white dark:bg-gray-800 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-clinical-border dark:border-gray-700"
        >
          <div className="bg-clinical-blue p-6 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold">Desbloquear Certificado</h3>
            <p className="text-white/80 text-sm">Parabéns por completar os 15 casos!</p>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl border border-blue-100 dark:border-blue-800">
                <p className="text-sm font-bold text-clinical-blue uppercase tracking-widest mb-2">Instruções de Pagamento</p>
                <p className="text-clinical-text dark:text-gray-300 text-sm leading-relaxed">
                  Faça o pagamento de <span className="font-bold text-clinical-blue">1.500 Kz</span> via Multicaixa Express para o número abaixo:
                </p>
                <div className="mt-4 p-3 bg-white dark:bg-gray-900 rounded-xl border border-blue-200 dark:border-blue-700 flex items-center justify-between">
                  <span className="text-xl font-mono font-bold text-clinical-blue">933108270</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText('933108270');
                      showAlert("Copiado", 'Número copiado!');
                    }}
                    className="p-2 text-clinical-blue hover:bg-blue-50 dark:hover:bg-blue-800 rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-3 p-3 bg-white dark:bg-gray-900 rounded-xl border border-blue-200 dark:border-blue-700">
                  <p className="text-[10px] uppercase font-bold text-clinical-muted mb-1">IBAN para Transferência</p>
                  <p className="text-xs font-mono font-bold dark:text-white">0040 0000 01904612101 43</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-clinical-muted text-center italic">
                  Após o pagamento, envie o comprovativo (print) para o WhatsApp do criador para libertar o seu certificado.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  const message = `Olá Pedro! Acabei de realizar o pagamento de 1.500 Kz para desbloquear o meu certificado no RECOVERY HEALTH.\n\n*Utilizador:* ${user.name}\n*Email:* ${user.email}\n\nEstou a enviar o comprovativo em anexo.`;
                  sendWhatsAppNotification(message);
                  setIsPaymentProcessing(true);
                  
                  // Record the pending payment
                  const newPayment = {
                    userId: user.email,
                    name: user.name,
                    date: new Date().toLocaleString(),
                    status: 'pending' as const
                  };
                  
                  fetch('/api/payments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newPayment)
                  })
                  .then(res => res.json())
                  .then(data => {
                    if (data.success) {
                      setPendingPayments(prev => [...prev, data.payment]);
                    }
                  })
                  .catch(err => console.error("Failed to record payment:", err));

                  setTimeout(() => {
                    showAlert("Pedido Enviado", "Pedido de libertação enviado! Assim que o Pedro confirmar o pagamento, o seu certificado estará disponível.");
                    setShowPaymentModal(false);
                    setIsPaymentProcessing(false);
                  }, 1000);
                }}
                disabled={isPaymentProcessing}
                className="w-full py-4 bg-clinical-green text-white rounded-2xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-200 dark:shadow-none"
              >
                {isPaymentProcessing ? 'A processar...' : <><MessageCircle className="w-5 h-5" /> Enviar Comprovativo</>}
              </button>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="w-full py-4 text-clinical-muted font-bold hover:text-clinical-text transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
