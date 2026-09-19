import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Brain, 
  Target, 
  ArrowRight,
  Loader2,
  Sparkles,
  BarChart3,
  PieChart as PieChartIcon,
  FileDown
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { UserProfile, ClinicalCase } from '../../types';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { exportToPDFSafe } from '../../lib/pdfExportSafe';

interface PerformanceDashboardProps {
  user: UserProfile;
  allCases: ClinicalCase[];
  onSelectCase: (c: ClinicalCase) => void;
}

export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({ user, allCases, onSelectCase }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [recommendations, setRecommendations] = useState<ClinicalCase[]>([]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await exportToPDFSafe(
        'ai-performance-report',
        `Relatorio_IA_Performance_${user.name.replace(/\s+/g, '_')}.pdf`
      );
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Erro ao exportar o relatório. Tente novamente.");
    } finally {
      setIsExporting(false);
    }
  };

  const categoryData = Object.entries(user.categoryScores || {}).map(([name, data]: [string, any]) => ({
    name,
    accuracy: Math.round((data.correct / data.total) * 100),
    total: data.total
  })).sort((a, b) => b.accuracy - a.accuracy);

  const mistakesByCategory = (user.mistakes || []).reduce((acc: any, m) => {
    acc[m.category] = (acc[m.category] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(mistakesByCategory).map(([name, value]) => ({
    name,
    value
  }));

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const analyzePerformance = async () => {
      if (!user.mistakes || user.mistakes.length === 0) return;
      
      setIsAnalyzing(true);
      try {
        const ai = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY });
        const prompt = `Analise o desempenho deste estudante de saúde baseado nos seus erros recentes:
        Erros: ${JSON.stringify(user.mistakes.slice(-20))}
        Pontuações por categoria: ${JSON.stringify(user.categoryScores)}
        
        Forneça um relatório estruturado em Markdown com:
        1. Diagnóstico de Pontos Cegos (onde o aluno mais falha e porquê)
        2. Recomendações de Estudo (temas específicos para revisar)
        3. Plano de Ação (o que fazer nos próximos 3 dias)
        
        Seja motivador e técnico.`;

        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt
        });

        setAnalysis(response.text);

        // Simple recommendation logic: find cases in categories where user has most mistakes
        const weakCategories = Object.entries(mistakesByCategory)
          .sort((a: any, b: any) => b[1] - a[1])
          .map(e => e[0]);

        const recs = allCases
          .filter(c => weakCategories.includes(c.category) && !user.progress.includes(c.id))
          .slice(0, 3);
        
        setRecommendations(recs);
      } catch (error) {
        console.error("Analysis error:", error);
      } finally {
        setIsAnalyzing(false);
      }
    };

    analyzePerformance();
  }, [user.mistakes]);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black dark:text-white flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-clinical-blue" />
            Dashboard Preditivo
          </h2>
          <p className="text-clinical-muted font-bold">Análise de performance baseada em IA</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center gap-2 px-6 py-3 bg-clinical-blue text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileDown className="w-4 h-4" />
            )}
            {isExporting ? 'Exportando...' : 'Exportar PDF'}
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-clinical-blue/10 text-clinical-blue rounded-2xl border border-clinical-blue/20">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest">IA Ativa</span>
          </div>
        </div>
      </div>

      <div id="ai-performance-report" className="space-y-8 p-4 bg-white dark:bg-gray-950 rounded-[40px]">
        {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-[32px] border border-clinical-border dark:border-gray-700 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-black text-sm uppercase tracking-widest dark:text-white">Precisão Geral</h3>
          </div>
          <div className="text-4xl font-black text-clinical-blue mb-2">
            {categoryData.length > 0 
              ? Math.round(categoryData.reduce((acc, curr) => acc + curr.accuracy, 0) / categoryData.length)
              : 0}%
          </div>
          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-clinical-blue transition-all duration-1000"
              style={{ width: `${categoryData.length > 0 ? categoryData.reduce((acc, curr) => acc + curr.accuracy, 0) / categoryData.length : 0}%` }}
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-[32px] border border-clinical-border dark:border-gray-700 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-600">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="font-black text-sm uppercase tracking-widest dark:text-white">Pontos de Atenção</h3>
          </div>
          <div className="text-4xl font-black text-red-500 mb-2">
            {(user.mistakes || []).length}
          </div>
          <p className="text-xs text-clinical-muted font-bold">Erros registrados nos últimos casos</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-[32px] border border-clinical-border dark:border-gray-700 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-black text-sm uppercase tracking-widest dark:text-white">Domínio</h3>
          </div>
          <div className="text-4xl font-black text-clinical-green mb-2">
            {categoryData.filter(c => c.accuracy >= 80).length}
          </div>
          <p className="text-xs text-clinical-muted font-bold">Categorias com mais de 80% de acerto</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Performance Chart */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] border border-clinical-border dark:border-gray-700 shadow-sm">
          <h3 className="text-xl font-black mb-6 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-clinical-blue" />
            Performance por Categoria
          </h3>
          <div className="h-[300px] w-full">
            {isMounted && (
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 10, fontWeight: 700 }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="accuracy" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            )}
          </div>
        </div>

        {/* Mistakes Distribution */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] border border-clinical-border dark:border-gray-700 shadow-sm">
          <h3 className="text-xl font-black mb-6 dark:text-white flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-red-500" />
            Distribuição de Erros
          </h3>
          <div className="h-[300px] w-full">
            {isMounted && (
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-[10px] font-bold uppercase tracking-wider dark:text-gray-300">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Analysis Section */}
      <div className="bg-gradient-to-br from-clinical-blue/5 to-purple-500/5 p-8 rounded-[40px] border border-clinical-blue/10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Brain className="w-32 h-32 text-clinical-blue" />
        </div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-black mb-6 dark:text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-clinical-blue text-white rounded-2xl flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            Relatório de Performance IA
          </h3>

          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader2 className="w-12 h-12 text-clinical-blue animate-spin" />
              <p className="text-clinical-muted font-bold animate-pulse">A IA está processando o seu histórico...</p>
            </div>
          ) : analysis ? (
            <div className="prose prose-blue dark:prose-invert max-w-none">
              <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-clinical-muted font-bold">Complete mais casos para gerar uma análise detalhada.</p>
            </div>
          )}
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-black dark:text-white flex items-center gap-3">
            <Target className="w-6 h-6 text-clinical-green" />
            Casos Recomendados para Você
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((c) => (
              <motion.div
                key={c.id}
                whileHover={{ y: -5 }}
                onClick={() => onSelectCase(c)}
                className="bg-white dark:bg-gray-800 rounded-[32px] border border-clinical-border dark:border-gray-700 shadow-sm overflow-hidden cursor-pointer group"
              >
                <div className="h-32 relative">
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-1 bg-clinical-blue text-white text-[8px] font-black uppercase tracking-widest rounded-lg">
                      {c.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-black dark:text-white mb-2 line-clamp-1">{c.title}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-clinical-muted font-bold">{c.difficulty}</span>
                    <ArrowRight className="w-4 h-4 text-clinical-blue group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
