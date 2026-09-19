import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Download, 
  Users, 
  Swords, 
  BarChart3, 
  BookOpen,
  Loader2,
  X,
  FileDown,
  ShieldCheck,
  Activity,
  Target
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { exportToPDFSafe } from '../lib/pdfExportSafe';
import { UserProfile, ClinicalCase } from '../types';

interface AdminReportsExportProps {
  type: 'users' | 'cases' | 'ranking' | 'duels' | 'project_summary';
  data: {
    allUsers?: UserProfile[];
    allCases?: ClinicalCase[];
    duelRecords?: any[];
    leaderboard?: any[];
  };
  onClose: () => void;
}

export const AdminReportsExport: React.FC<AdminReportsExportProps> = ({ type, data, onClose }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStep, setExportStep] = useState<'preview' | 'generating'>('preview');

  const handleExport = async () => {
    setIsExporting(true);
    setExportStep('generating');
    
    try {
      const filenames = {
        users: 'Lista_de_Jogadores',
        cases: 'Relatorio_Casos_Clinicos',
        ranking: 'Ranking_Geral',
        duels: 'Historico_de_Duelos',
        project_summary: 'Resumo_Projeto_RECOVERY_HEALTH'
      };

      await exportToPDFSafe(
        'report-content',
        `${filenames[type]}_${new Date().toISOString().split('T')[0]}.pdf`
      );
      onClose();
    } catch (error) {
      console.error("Export error:", error);
      alert("Erro ao exportar o relatório. Por favor, tente novamente.");
    } finally {
      setIsExporting(false);
      setExportStep('preview');
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'users':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-2 border-b pb-8">
              <h1 className="text-3xl font-black text-clinical-blue">Lista de Jogadores Registados</h1>
              <p className="text-clinical-muted font-bold uppercase tracking-widest text-xs">RECOVERY HEALTH - Relatório Administrativo</p>
              <p className="text-xs text-gray-400">Gerado em: {new Date().toLocaleString()}</p>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-100">
                  <th className="py-4 px-4 text-[10px] uppercase font-black tracking-widest">Nome</th>
                  <th className="py-4 px-4 text-[10px] uppercase font-black tracking-widest">Email</th>
                  <th className="py-4 px-4 text-[10px] uppercase font-black tracking-widest">Nível</th>
                  <th className="py-4 px-4 text-[10px] uppercase font-black tracking-widest">Pontos</th>
                  <th className="py-4 px-4 text-[10px] uppercase font-black tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.allUsers?.map((u, i) => (
                  <tr key={i}>
                    <td className="py-4 px-4 font-bold text-sm">{u.name}</td>
                    <td className="py-4 px-4 text-xs text-gray-500">{u.email}</td>
                    <td className="py-4 px-4 text-sm font-black text-clinical-blue">{u.level}</td>
                    <td className="py-4 px-4 text-sm font-black text-clinical-green">{u.score}</td>
                    <td className="py-4 px-4">
                      <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${u.isPremium ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'}`}>
                        {u.isPremium ? 'Premium' : 'Grátis'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'cases':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-2 border-b pb-8">
              <h1 className="text-3xl font-black text-clinical-blue">Relatório de Casos Clínicos</h1>
              <p className="text-clinical-muted font-bold uppercase tracking-widest text-xs">RECOVERY HEALTH - Estatísticas de Resolução</p>
              <p className="text-xs text-gray-400">Gerado em: {new Date().toLocaleString()}</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {data.allCases?.map((c, i) => {
                const completions = data.allUsers?.filter(u => u.progress?.includes(c.id)).length || 0;
                return (
                  <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-clinical-blue">{c.title}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{c.category} • {c.difficulty}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-clinical-green">{completions}</p>
                      <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">Resoluções</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 'ranking':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-2 border-b pb-8">
              <h1 className="text-3xl font-black text-clinical-blue">Ranking Geral de Performance</h1>
              <p className="text-clinical-muted font-bold uppercase tracking-widest text-xs">RECOVERY HEALTH - Classificação Global</p>
              <p className="text-xs text-gray-400">Gerado em: {new Date().toLocaleString()}</p>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-100">
                  <th className="py-4 px-4 text-[10px] uppercase font-black tracking-widest">Posição</th>
                  <th className="py-4 px-4 text-[10px] uppercase font-black tracking-widest">Utilizador</th>
                  <th className="py-4 px-4 text-[10px] uppercase font-black tracking-widest">Nível</th>
                  <th className="py-4 px-4 text-[10px] uppercase font-black tracking-widest">Pontuação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {(data.allUsers || []).sort((a, b) => b.score - a.score).map((u, i) => (
                  <tr key={i}>
                    <td className="py-4 px-4 font-black text-clinical-blue">#{i + 1}</td>
                    <td className="py-4 px-4 font-bold text-sm">{u.name}</td>
                    <td className="py-4 px-4 text-sm font-black">{u.level}</td>
                    <td className="py-4 px-4 text-sm font-black text-clinical-green">{u.score} pts</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'duels':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-2 border-b pb-8">
              <h1 className="text-3xl font-black text-clinical-blue">Histórico de Duelos Clínicos</h1>
              <p className="text-clinical-muted font-bold uppercase tracking-widest text-xs">RECOVERY HEALTH - Registos de Confrontos</p>
              <p className="text-xs text-gray-400">Gerado em: {new Date().toLocaleString()}</p>
            </div>
            <div className="space-y-4">
              {data.duelRecords?.map((duel, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-gray-400 mb-4">
                    <span>{new Date(duel.timestamp).toLocaleString()}</span>
                    <span>Duelo #{i + 1}</span>
                  </div>
                  <div className="flex items-center justify-between gap-8">
                    <div className="text-center flex-1">
                      <p className={`font-black text-sm ${duel.winnerUid === duel.player1Uid ? 'text-clinical-green' : 'text-gray-900'}`}>{duel.player1Name}</p>
                      <p className="text-2xl font-black">{duel.player1Score}</p>
                    </div>
                    <div className="text-clinical-muted font-black italic">VS</div>
                    <div className="text-center flex-1">
                      <p className={`font-black text-sm ${duel.winnerUid === duel.player2Uid ? 'text-clinical-green' : 'text-gray-900'}`}>{duel.player2Name}</p>
                      <p className="text-2xl font-black">{duel.player2Score}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                    <p className="text-[10px] font-black uppercase text-clinical-blue">
                      Vencedor: {duel.winnerUid === 'draw' ? 'Empate' : (duel.winnerUid === duel.player1Uid ? duel.player1Name : duel.player2Name)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'project_summary':
        return (
          <div className="space-y-8 p-4">
            <div className="text-center space-y-4 border-b pb-12">
              <div className="w-24 h-24 bg-clinical-blue text-white rounded-[32px] flex items-center justify-center mx-auto shadow-xl shadow-blue-500/20">
                <ShieldCheck className="w-12 h-12" />
              </div>
              <h1 className="text-3xl font-black text-clinical-blue leading-tight">RECOVERY HEALTH</h1>
              <p className="text-clinical-muted font-bold uppercase tracking-widest text-sm">Plataforma Multidisciplinar Baseada em Simulação Clínica para Desenvolvimento do Raciocínio Clínico em Ciências da Saúde</p>
            </div>

            <div className="grid grid-cols-2 gap-8 text-sm">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Autor</p>
                <p className="font-black text-clinical-blue">Pedro Manuel Afonso Joaquim</p>
                <p className="text-xs text-gray-500">Profissional de Educação Física e Graduando em Fisioterapia</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Localização</p>
                <p className="font-black text-gray-700">Malanje – Angola</p>
              </div>
            </div>

            <div className="space-y-6 text-gray-800 leading-relaxed text-sm text-justify">
              <section className="space-y-3">
                <h2 className="text-xl font-black text-clinical-blue flex items-center gap-2">
                  <Activity className="w-5 h-5" /> Resumo
                </h2>
                <p>
                  A formação em ciências da saúde enfrenta desafios estruturais relacionados à limitação da prática clínica durante o processo formativo, comprometendo o desenvolvimento do raciocínio clínico e da tomada de decisão profissional. Este trabalho apresenta a plataforma RECOVERY HEALTH, uma solução digital inovadora baseada na simulação de casos clínicos, gamificação e aprendizagem ativa.
                </p>
                <p>
                  A plataforma abrange sete áreas da saúde — saúde geral, enfermagem, medicina dentária, medicina geral, análises clínicas, farmácia e fisioterapia — organizadas em 12 categorias por área, com 100 casos clínicos por categoria, totalizando aproximadamente 8.400 cenários clínicos simulados.
                </p>
                <p>
                  Além disso, integra uma biblioteca científica e um sistema de certificação progressiva, no qual o utilizador, após a resolução de 15 casos clínicos, pode desbloquear conteúdos e emitir certificados em formato PDF. A plataforma apresenta elevado potencial de impacto educacional, científico e social, especialmente em contextos com limitações de acesso à prática clínica.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-black text-clinical-blue flex items-center gap-2">
                  <Target className="w-5 h-5" /> Objetivos
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Apresentar a plataforma RECOVERY HEALTH como uma solução inovadora para o desenvolvimento do raciocínio clínico.</li>
                  <li>Descrever a estrutura e as funcionalidades da plataforma.</li>
                  <li>Analisar as vantagens pedagógicas da simulação clínica e da gamificação no ensino da saúde.</li>
                  <li>Discutir o impacto potencial da plataforma na formação de profissionais de saúde em Angola.</li>
                  <li>Propor estratégias de validação científica e expansão da ferramenta.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-black text-clinical-blue flex items-center gap-2">
                  <BookOpen className="w-5 h-5" /> Metodologia
                </h2>
                <p>
                  O desenvolvimento da plataforma baseou-se em metodologias de Design Thinking e Aprendizagem Baseada em Problemas (PBL). A arquitetura técnica foi estruturada para permitir a escalabilidade de casos clínicos, garantindo que cada cenário apresente uma anamnese detalhada, exames complementares, opções de diagnóstico e condutas terapêuticas baseadas em evidências.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-black text-clinical-blue flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> Conclusão
                </h2>
                <p>
                  A RECOVERY HEALTH posiciona-se como uma ferramenta disruptiva no cenário educacional das ciências da saúde. Ao democratizar o acesso à simulação clínica de alta qualidade, a plataforma contribui para a redução do erro clínico e para o fortalecimento das competências profissionais, preparando os estudantes para os desafios reais da prática hospitalar e ambulatorial.
                </p>
              </section>

              <div className="pt-12 border-t border-gray-100 text-center italic text-clinical-muted font-bold">
                “Inovação e Ciência ao serviço da Saúde em Angola.”
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 w-full max-w-4xl h-[90vh] rounded-[40px] shadow-2xl flex flex-col overflow-hidden border border-white/20"
      >
        {/* Header */}
        <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900 z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-clinical-blue/10 text-clinical-blue rounded-2xl flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black dark:text-white">Pré-visualização do Relatório</h2>
              <p className="text-xs text-clinical-muted font-bold uppercase tracking-widest">Formato PDF Profissional</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-colors"
          >
            <X className="w-6 h-6 text-clinical-muted" />
          </button>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50 dark:bg-gray-950 custom-scrollbar">
          <div className="mx-auto bg-white shadow-2xl rounded-xl overflow-hidden" id="report-content" style={{ width: '794px', minHeight: '1123px' }}>
            <div className="p-12">
              {renderContent()}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between">
          <div className="flex items-center gap-3 text-clinical-muted">
            <FileDown className="w-5 h-5" />
            <span className="text-xs font-bold">O PDF será gerado em alta resolução (A4)</span>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={onClose}
              className="px-8 py-4 text-clinical-muted font-black uppercase tracking-widest text-xs hover:text-clinical-text transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={handleExport}
              disabled={isExporting}
              className="px-8 py-4 bg-clinical-blue text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-clinical-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {exportStep === 'generating' ? 'A Gerar PDF...' : 'A Preparar...'}
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Descarregar PDF
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
