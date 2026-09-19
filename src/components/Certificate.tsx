import * as React from 'react';
import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  Shield, 
  Award, 
  Download, 
  User,
  Activity
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { exportToPDFSafe } from '../lib/pdfExportSafe';
import { UserProfile } from '../types';

interface CertificateProps {
  user: UserProfile;
  onBack: () => void;
  isAdmin?: boolean;
  setShowPortfolioExport?: (show: boolean) => void;
  settings?: {
    title: string;
    attributionText: string;
    bodyText: string;
  };
}

export const Certificate = ({ user, onBack, isAdmin, setShowPortfolioExport, settings }: CertificateProps) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [customName, setCustomName] = useState(user.name || 'Utilizador Recovery Health');

  const downloadPDF = async () => {
    if (!certificateRef.current) return;
    
    // Adicionamos um ID temporário se não tiver
    const originalId = certificateRef.current.id;
    const tempId = originalId || 'certificate-to-export';
    certificateRef.current.id = tempId;

    try {
      await exportToPDFSafe(
        tempId,
        `Certificado_RecoveryHealth_${customName.replace(/\s+/g, '_')}.pdf`,
        { 
          scale: 3,
          orientation: 'l',
          format: 'a4',
          forcedWidth: 1123
        }
      );
    } catch (error) {
      console.error("Export error:", error);
      alert("Erro ao exportar o certificado. Por favor, tente novamente.");
    } finally {
      if (!originalId) certificateRef.current.id = '';
    }
  };

  const certificateId = Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="space-y-8 max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-clinical-blue font-bold">
          <ChevronLeft className="w-4 h-4" /> Voltar ao Perfil
        </button>
        <div className="flex items-center gap-4">
          {isAdmin && (
            <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-xl">
              <Shield className="w-4 h-4 text-yellow-600" />
              <span className="text-xs font-bold text-yellow-700">Modo Admin: Pode editar o nome abaixo</span>
            </div>
          )}
          <h2 className="text-2xl font-bold dark:text-white">Certificado Digital</h2>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-4">
        <p className="text-sm font-bold text-clinical-muted uppercase tracking-widest">Confirmar Nome no Certificado</p>
        <input 
          type="text" 
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-clinical-border dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none transition-all"
          placeholder="Seu nome completo"
        />
      </div>

      <div 
        ref={certificateRef}
        className="bg-white p-12 shadow-2xl relative overflow-hidden aspect-[1.414/1] w-full max-w-[1000px] mx-auto border-[12px] border-double" 
        style={{ borderColor: '#006432' }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23006432' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
        
        {/* Green Vertical Bar */}
        <div className="absolute top-0 right-0 w-[15%] h-full" style={{ backgroundColor: '#006432' }}></div>

        {/* Corner Ornaments */}
        <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4" style={{ borderColor: '#006432' }}></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4" style={{ borderColor: '#006432' }}></div>

        {/* Medal/Seal */}
        <div className="absolute top-[10%] right-[5%] z-20">
          <div className="relative w-28 h-28">
            <div className="absolute inset-0 rounded-full shadow-2xl border-4 flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #FFD700, #FDB931, #B8860B)', borderColor: '#B8860B' }}>
              <div className="w-20 h-20 rounded-full border-2 border-dashed flex items-center justify-center" style={{ borderColor: '#B8860B' }}>
                <Award className="w-12 h-12" style={{ color: '#B8860B' }} />
              </div>
            </div>
            {/* Ribbons */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              <div className="w-5 h-16 clip-path-ribbon border-x border-b" style={{ backgroundColor: '#B8860B', borderColor: '#8B4513' }}></div>
              <div className="w-5 h-16 clip-path-ribbon border-x border-b" style={{ backgroundColor: '#B8860B', borderColor: '#8B4513' }}></div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 h-full flex flex-col items-center pt-12 pr-[15%] text-center">
          {/* Logo */}
          <div className="mb-6">
            <div className="flex flex-col items-center">
              <div className="w-56 h-56 flex items-center justify-center p-0 mb-0">
                 <img 
                   src="https://lh3.googleusercontent.com/d/1_FRXJYYSheVa7-JDA_3PBa5OsuqRFrPr" 
                   alt="Logo" 
                   className="w-full h-full object-contain" 
                   crossOrigin="anonymous"
                   referrerPolicy="no-referrer"
                 />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="mb-10">
            <h1 className="text-4xl font-serif italic font-bold tracking-widest leading-tight" style={{ color: '#006432' }}>
              {settings?.title || 'CERTIFICADO DE CONCLUSÃO'}
            </h1>
            <div className="w-32 h-1 bg-[#006432] mx-auto mt-2"></div>
          </div>

          {/* Subtitle */}
          <div className="mb-8">
            <p className="text-sm font-bold tracking-widest uppercase" style={{ color: '#212529' }}>
              {settings?.attributionText || 'A RECOVERY HEALTH ATRIBUI O PRESENTE CERTIFICADO A:'}
            </p>
          </div>

          {/* Name */}
          <div className="mb-10 w-full px-8">
            <h2 className="text-5xl font-bold border-b-4 pb-4 inline-block w-full" style={{ color: '#212529', borderBottomColor: 'rgba(0, 100, 50, 0.3)' }}>
              {customName}
            </h2>
          </div>

          {/* Body Text */}
          <div className="mb-16 px-12">
            <p className="text-base leading-relaxed font-medium" style={{ color: '#212529' }}>
              {settings?.bodyText || 'Por ter concluído com elevado mérito o Programa de Treino Clínico Intensivo no sistema RECOVERY HEALTH, evidenciando competências técnicas avançadas, excelência no raciocínio clínico e elevada capacidade de tomada de decisão na prática clínica.'}
            </p>
          </div>

          {/* Signatures */}
          <div className="mt-auto w-full grid grid-cols-2 gap-12 pb-12">
            <div className="flex flex-col items-center space-y-2">
              <div className="h-16 flex items-end justify-center mb-1">
                <img 
                   src="https://lh3.googleusercontent.com/d/1_FRXJYYSheVa7-JDA_3PBa5OsuqRFrPr" 
                   alt="Assinatura Recovery Health" 
                   className="h-full object-contain" 
                   style={{ opacity: 0.8 }} 
                   crossOrigin="anonymous"
                   referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-full h-px" style={{ backgroundColor: 'rgba(0, 100, 50, 0.4)' }}></div>
              <p className="text-xs font-bold uppercase" style={{ color: '#212529' }}>Recovery Health</p>
              <p className="text-[10px] uppercase tracking-widest" style={{ color: '#6c757d' }}>Entidade Certificadora</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="h-16 flex items-end justify-center mb-1">
                <p className="font-serif italic text-2xl" style={{ color: '#006432', opacity: 0.8 }}>Pedro Joaquim</p>
              </div>
              <div className="w-full h-px" style={{ backgroundColor: 'rgba(0, 100, 50, 0.4)' }}></div>
              <p className="text-xs font-bold uppercase" style={{ color: '#212529' }}>Pedro Joaquim</p>
              <p className="text-[10px] uppercase tracking-widest" style={{ color: '#6c757d' }}>O Criador</p>
            </div>
          </div>

          {/* Bottom Center Logo */}
          <div className="absolute bottom-6 left-[42.5%] -translate-x-1/2">
            <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center p-1" style={{ borderColor: '#006432' }}>
              <Activity className="w-8 h-8" style={{ color: '#006432' }} />
            </div>
          </div>

          {/* Date and ID */}
          <div className="absolute bottom-6 left-10 text-[10px] uppercase tracking-widest flex flex-col items-start" style={{ color: '#6c757d' }}>
            <p>Data: {new Date().toLocaleDateString()}</p>
            <p>ID: {certificateId}</p>
          </div>
        </div>

        {/* Decorative Frame */}
        <div className="absolute inset-6 border-2 pointer-events-none" style={{ borderColor: 'rgba(0, 100, 50, 0.3)' }}></div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button 
          onClick={downloadPDF}
          className="px-8 py-4 bg-clinical-green text-white rounded-xl font-bold shadow-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" /> Descarregar Certificado (PDF)
        </button>
        {setShowPortfolioExport && (
          <button 
            onClick={() => setShowPortfolioExport(true)}
            className="px-8 py-4 bg-clinical-blue text-white rounded-xl font-bold shadow-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
          >
            <Activity className="w-5 h-5" /> Descarregar Portfólio Clínico (PDF)
          </button>
        )}
        <button 
          onClick={onBack}
          className="px-8 py-4 bg-gray-100 dark:bg-gray-700 text-clinical-text dark:text-white rounded-xl font-bold shadow-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
        >
          <User className="w-5 h-5" /> Voltar ao Perfil
        </button>
      </div>
    </motion.div>
  );
};

// Removed default export
