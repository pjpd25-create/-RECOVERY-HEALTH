import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  Award, 
  Calendar, 
  User, 
  Activity,
  Loader2,
  Sparkles,
  ChevronRight,
  X,
  FileDown,
  Info,
  Clock,
  ShieldCheck,
  QrCode
} from 'lucide-react';
import { UserProfile, ClinicalCase } from '../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { QRCodeSVG } from 'qrcode.react';
import { exportToPDFSafe } from '../lib/pdfExportSafe';

interface PortfolioExportProps {
  user: UserProfile;
  allCases: ClinicalCase[];
  onClose: () => void;
}

export const PortfolioExport: React.FC<PortfolioExportProps> = ({ user, allCases, onClose }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStep, setExportStep] = useState<'preview' | 'generating'>('preview');

  const completedCases = allCases.filter(c => user.progress.includes(c.id));
  const totalHours = completedCases.reduce((acc, c) => acc + (c.estimatedTime || 0), 0) / 60;

  const radarData = Object.entries(user.categoryScores || {}).map(([name, score]) => ({
    subject: name,
    A: Math.round((score.correct / score.total) * 100),
    fullMark: 100,
  }));

  const handleExport = async () => {
    setIsExporting(true);
    setExportStep('generating');
    
    try {
      await exportToPDFSafe(
        'portfolio-content', 
        `Portfolio_Clinico_${user.name.replace(/\s+/g, '_')}.pdf`
      );
      onClose();
    } catch (error) {
      console.error("Export error:", error);
      alert("Erro ao exportar o portfólio. Por favor, tente novamente.");
    } finally {
      setIsExporting(false);
      setExportStep('preview');
    }
  };

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
        className="bg-white dark:bg-gray-900 w-full max-w-5xl h-[90vh] rounded-[40px] shadow-2xl flex flex-col overflow-hidden border border-white/20"
      >
        {/* Header */}
        <div className="p-6 border-b border-clinical-border dark:border-gray-800 flex items-center justify-between bg-gradient-to-r from-clinical-blue/5 to-purple-500/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-clinical-blue text-white rounded-2xl flex items-center justify-center shadow-lg shadow-clinical-blue/20">
              <FileDown className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black dark:text-white">Portfólio Clínico Exportável</h2>
              <p className="text-xs text-clinical-muted font-bold uppercase tracking-widest">Gere um relatório profissional das suas competências</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-colors"
          >
            <X className="w-6 h-6 text-clinical-muted" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-gray-50 dark:bg-gray-950 custom-scrollbar">
          {/* PDF Preview Area - Using fixed width for consistent capture */}
          <div className="mx-auto bg-white shadow-2xl rounded-xl overflow-hidden" id="portfolio-content" style={{ width: '794px', minHeight: '1123px' }}>
            {/* PDF Header */}
            <div className="p-12 bg-clinical-blue text-white relative overflow-hidden" style={{ backgroundColor: '#0056b3' }}>
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <Award className="w-48 h-48" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-4 border-white/30 shadow-xl">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                    ) : (
                      <User className="w-12 h-12" />
                    )}
                  </div>
                  <div>
                    <h1 className="text-4xl font-black tracking-tight">Portfólio de Competências Clínicas</h1>
                    <p className="font-bold uppercase tracking-widest text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Certificado de Desenvolvimento Profissional</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-8 pt-8 border-t" style={{ borderTopColor: 'rgba(255, 255, 255, 0.2)' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Profissional</p>
                      <p className="text-lg font-black">{user.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Horas Clínicas</p>
                      <p className="text-lg font-black">{totalHours.toFixed(1)}h</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Data de Emissão</p>
                      <p className="text-lg font-black">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PDF Body */}
            <div className="p-12 space-y-12 text-gray-900">
              {/* Summary Stats */}
              <section className="grid grid-cols-3 gap-8">
                <div className="p-6 rounded-3xl border border-gray-100 text-center" style={{ backgroundColor: '#f9fafb' }}>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Casos Resolvidos</p>
                  <p className="text-3xl font-black text-clinical-blue" style={{ color: '#0056b3' }}>{completedCases.length}</p>
                </div>
                <div className="p-6 rounded-3xl border border-gray-100 text-center" style={{ backgroundColor: '#f9fafb' }}>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Pontuação Total</p>
                  <p className="text-3xl font-black text-clinical-green" style={{ color: '#28a745' }}>{user.score} pts</p>
                </div>
                <div className="p-6 rounded-3xl border border-gray-100 text-center" style={{ backgroundColor: '#f9fafb' }}>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Nível de Expertise</p>
                  <p className="text-3xl font-black" style={{ color: '#9333ea' }}>{user.level}</p>
                </div>
              </section>

              {/* Skills Matrix & Radar Chart */}
              <section className="grid grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-xl font-black flex items-center gap-3 border-b-2 pb-2" style={{ borderBottomColor: '#28a745' }}>
                    <Sparkles className="w-6 h-6 text-clinical-green" style={{ color: '#28a745' }} />
                    Matriz de Competências
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(user.categoryScores || {}).map(([cat, score]) => (
                      <div key={cat} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-black uppercase tracking-widest text-gray-500">{cat}</span>
                          <span className="text-xs font-black" style={{ color: '#0056b3' }}>{Math.round((score.correct / score.total) * 100)}%</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#f3f4f6' }}>
                          <div 
                            className="h-full"
                            style={{ width: `${(score.correct / score.total) * 100}%`, backgroundColor: '#0056b3' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-[32px] p-6 flex flex-col items-center justify-center border border-gray-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Visualização de Performance</p>
                  <div style={{ width: '100%', height: '240px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 8, fontWeight: 700, fill: '#6b7280' }} />
                        <Radar
                          name="Competência"
                          dataKey="A"
                          stroke="#0056b3"
                          fill="#0056b3"
                          fillOpacity={0.3}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </section>

              {/* Badges & Achievements */}
              {user.badges && user.badges.length > 0 && (
                <section className="space-y-6">
                  <h3 className="text-xl font-black flex items-center gap-3 border-b-2 pb-2" style={{ borderBottomColor: '#f59e0b' }}>
                    <Award className="w-6 h-6 text-clinical-yellow" style={{ color: '#f59e0b' }} />
                    Conquistas e Especializações
                  </h3>
                  <div className="grid grid-cols-4 gap-4">
                    {user.badges.map((badge) => (
                      <div key={badge.id} className="p-4 bg-white rounded-2xl border border-gray-100 flex flex-col items-center text-center space-y-2 shadow-sm">
                        <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-2xl">
                          {badge.icon}
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-tight">{badge.name}</p>
                          <p className="text-[8px] text-gray-400 font-bold leading-tight">{badge.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Clinical Experience */}
              <section className="space-y-6">
                <h3 className="text-xl font-black flex items-center gap-3 border-b-2 pb-2" style={{ borderBottomColor: '#0056b3' }}>
                  <Activity className="w-6 h-6 text-clinical-blue" style={{ color: '#0056b3' }} />
                  Experiência Clínica Detalhada
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {completedCases.map((c, i) => (
                    <div key={c.id} className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 font-black text-sm">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <div>
                          <h4 className="font-black text-sm">{c.title}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[8px] font-black uppercase tracking-widest text-clinical-blue">{c.category}</span>
                            <span className="text-[8px] text-gray-300 font-bold">• {c.difficulty}</span>
                            <span className="text-[8px] text-gray-300 font-bold">• {c.estimatedTime} min</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-clinical-green">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-[8px] font-black uppercase tracking-widest">Validado</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Footer & Verification */}
              <div className="pt-12 border-t border-gray-100 flex items-center justify-between">
                <div className="space-y-2 text-left max-w-md">
                  <div className="flex items-center gap-2 text-clinical-blue mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Documento Autêntico</span>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Gerado automaticamente pela plataforma RECOVERY HEALTH AI
                  </p>
                  <p className="text-[8px] text-gray-300 leading-relaxed">
                    Este documento serve como um registro de atividades simuladas e não substitui certificações oficiais de ensino superior. A autenticidade pode ser verificada via QR Code.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="p-2 bg-white border border-gray-100 rounded-xl shadow-sm">
                    <QRCodeSVG 
                      value={`https://recoveryhealth.app/verify/${user.uid}`}
                      size={64}
                      level="H"
                    />
                  </div>
                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Validar Portfólio</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-clinical-border dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between">
          <div className="flex items-center gap-4 text-clinical-muted">
            <Info className="w-5 h-5" />
            <p className="text-xs font-bold">O PDF será gerado com alta qualidade para impressão.</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onClose}
              className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-clinical-muted font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              Cancelar
            </button>
            <button 
              onClick={handleExport}
              disabled={isExporting}
              className="px-8 py-4 bg-clinical-blue text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-clinical-blue/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  A Gerar PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Exportar Portfólio
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
