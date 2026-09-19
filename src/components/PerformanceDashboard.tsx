import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Download, FileDown } from 'lucide-react';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, Tooltip, LineChart, CartesianGrid, 
  XAxis, YAxis, Line 
} from 'recharts';
import { UserProfile, ClinicalCase } from '../types';
import { Sparkles, Brain, Target, AlertCircle, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { exportToPDFSafe } from '../lib/pdfExportSafe';

interface PerformanceDashboardProps {
  user: UserProfile;
  allCases: ClinicalCase[];
  onSelectCase: (c: ClinicalCase) => void;
}

export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({ user, allCases, onSelectCase }) => {
  const [insights, setInsights] = React.useState<string | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);

  const performanceData = React.useMemo(() => {
    return Object.entries(user.categoryScores || {}).map(([cat, stats]: [string, any]) => ({
      category: cat,
      accuracy: Math.round((stats.correct / stats.total) * 100),
      total: stats.total
    }));
  }, [user.categoryScores]);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await exportToPDFSafe(
        'performance-report',
        `Relatorio_Performance_${user.name.replace(/\s+/g, '_')}.pdf`
      );
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Erro ao exportar o relatório. Tente novamente.");
    } finally {
      setIsExporting(false);
    }
  };

  const generateInsights = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const model = "gemini-3-flash-preview";

      const prompt = `
        Analise o desempenho deste estudante de saúde:
        ${JSON.stringify(performanceData)}
        
        Identifique os 2 principais "pontos cegos" (áreas com menor precisão) e recomende uma estratégia de estudo.
        Seja motivador e técnico. Responda em Português.
        Formate como um parágrafo curto e direto.
      `;

      const response = await ai.models.generateContent({
        model,
        contents: prompt
      });

      setInsights(response.text);
    } catch (err) {
      console.error(err);
      setInsights("Não foi possível gerar insights no momento. Continue praticando!");
    } finally {
      setIsGenerating(false);
    }
  };

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    if (!insights) generateInsights();
  }, []);

  return (
    <motion.div 
      key="dashboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white">Dashboard de Desempenho Preditivo</h2>
        <button
          onClick={handleExportPDF}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2 bg-clinical-blue text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-all disabled:opacity-50"
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <FileDown className="w-4 h-4" />
          )}
          {isExporting ? 'Exportando...' : 'Exportar Relatório (PDF)'}
        </button>
      </div>

      <div id="performance-report" className="space-y-8 p-4 bg-white dark:bg-gray-950 rounded-[40px]">
        {/* AI Insights Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-[40px] text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Brain className="w-32 h-32" />
        </div>
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold">Análise de Performance IA</h3>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10">
            {isGenerating ? (
              <div className="flex items-center gap-3 py-4">
                <Loader2 className="w-5 h-5 animate-spin" />
                <p className="text-sm font-medium animate-pulse">A IA está a analisar os seus padrões de erro...</p>
              </div>
            ) : (
              <p className="text-sm leading-relaxed font-medium">
                {insights || "A processar os seus dados..."}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
              <Target className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-[10px] uppercase font-bold text-white/60 tracking-widest">Ponto Forte</p>
                <p className="text-sm font-bold">
                  {performanceData.sort((a, b) => b.accuracy - a.accuracy)[0]?.category || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-[10px] uppercase font-bold text-white/60 tracking-widest">Ponto Cego</p>
                <p className="text-sm font-bold">
                  {performanceData.sort((a, b) => a.accuracy - b.accuracy)[0]?.category || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-6">
          <h3 className="text-xl font-bold dark:text-white">Radar de Competências</h3>
          <div className="h-[300px] w-full">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={Object.entries(user.categoryScores || {}).map(([name, stats]: [string, any]) => ({
                  subject: name.split(' ')[0],
                  A: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
                  fullMark: 100,
                }))}>
                  <PolarGrid stroke="#eee" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#666', fontSize: 10 }} />
                  <Radar
                    name="Competência"
                    dataKey="A"
                    stroke="#4285F4"
                    fill="#4285F4"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-6">
          <h3 className="text-xl font-bold dark:text-white">Evolução de Pontuação</h3>
          <div className="h-[300px] w-full">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={user.scoreHistory}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="date" hide />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#4285F4" strokeWidth={3} dot={{ r: 4, fill: '#4285F4' }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm">
        <h3 className="text-xl font-bold mb-6 dark:text-white">Análise Detalhada</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(user.categoryScores || {}).map(([cat, stats]: [string, any]) => (
            <div key={cat} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-clinical-border dark:border-gray-700">
              <p className="text-xs font-bold text-clinical-muted uppercase tracking-widest mb-1">{cat}</p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold dark:text-white">{Math.round((stats.correct / stats.total) * 100)}%</p>
                <p className="text-[10px] text-clinical-muted">{stats.correct}/{stats.total} acertos</p>
              </div>
              <div className="mt-2 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-clinical-blue" 
                  style={{ width: `${(stats.correct / stats.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);
};
