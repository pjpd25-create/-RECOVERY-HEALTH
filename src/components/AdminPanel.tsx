import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, LogOut, LayoutDashboard, Users, Swords, ClipboardList, 
  FileText, ShieldCheck, CheckCircle2, X, BookOpen, Sparkles, Plus, 
  Settings, Trash2, BarChart3, Activity, ImageIcon, Search, Award, Filter
} from 'lucide-react';
import { doc, updateDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { UserProfile, ClinicalCase, OperationType } from '../types';
import { handleFirestoreError } from '../firebase';
import { CATEGORIES } from '../constants';
import { AdminReportsExport } from './AdminReportsExport';

interface AdminPanelProps {
  adminTab: 'dashboard' | 'users' | 'cases' | 'duels' | 'logs' | 'reports' | 'certificate';
  setAdminTab: (tab: 'dashboard' | 'users' | 'cases' | 'duels' | 'logs' | 'reports' | 'certificate') => void;
  pendingPayments: any[];
  allCases: ClinicalCase[];
  allUsers: UserProfile[];
  duelRecords: any[];
  accessLogs: any[];
  user: UserProfile;
  certificateSettings: any;
  setCertificateSettings: (s: any) => void;
  setView: (view: any) => void;
  handleLogout: () => void;
  showAlert: (title: string, message: string) => void;
  showConfirm: (title: string, message: string, onConfirm: () => void) => void;
  setSelectedCase: (c: ClinicalCase | null) => void;
  setShowCaseEditor: (show: boolean) => void;
  setShowAiCaseModal: (show: boolean) => void;
  handleUpdateCoverImage: () => void;
  setSelectedUserForAdmin: (u: UserProfile | null) => void;
  setAllUsers: (users: UserProfile[]) => void;
  downloadCSV: (data: any[], filename: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  adminTab,
  setAdminTab,
  pendingPayments,
  allCases,
  allUsers,
  duelRecords,
  accessLogs,
  user,
  certificateSettings,
  setCertificateSettings,
  setView,
  handleLogout,
  showAlert,
  showConfirm,
  setSelectedCase,
  setShowCaseEditor,
  setShowAiCaseModal,
  handleUpdateCoverImage,
  setSelectedUserForAdmin,
  setAllUsers,
  downloadCSV
}) => {
  const [caseCategoryFilter, setCaseCategoryFilter] = useState<string>('all');
  const [caseSearchQuery, setCaseSearchQuery] = useState<string>('');
  const [exportType, setExportType] = useState<'users' | 'cases' | 'ranking' | 'duels' | 'project_summary' | null>(null);

  const filteredCases = allCases.filter(c => {
    const matchesCategory = caseCategoryFilter === 'all' || c.category === caseCategoryFilter;
    const matchesSearch = c.title.toLowerCase().includes(caseSearchQuery.toLowerCase()) || 
                         c.category.toLowerCase().includes(caseSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div 
      key="admin"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('home')} className="p-2 bg-clinical-bg dark:bg-gray-800 rounded-xl text-clinical-blue hover:bg-clinical-blue/10 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold dark:text-white">Painel Administrativo</h2>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLogout}
            className="px-6 py-2 bg-red-50 text-red-600 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-red-100 transition-all"
          >
            <LogOut className="w-4 h-4" /> Terminar Sessão
          </button>
          <div className="flex bg-clinical-bg dark:bg-gray-800 p-1 rounded-2xl border border-clinical-border dark:border-gray-700 overflow-x-auto no-scrollbar">
          {[
            { id: 'dashboard', label: 'Início', icon: LayoutDashboard },
            { id: 'users', label: 'Utilizadores', icon: Users },
            { id: 'cases', label: 'Casos', icon: BookOpen },
            { id: 'certificate', label: 'Certificado', icon: Award },
            { id: 'duels', label: 'Duelos', icon: Swords },
            { id: 'logs', label: 'Registos', icon: ClipboardList },
            { id: 'reports', label: 'Relatórios', icon: FileText }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                adminTab === tab.id 
                  ? 'bg-clinical-blue text-white shadow-lg shadow-clinical-blue/20' 
                  : 'text-clinical-muted hover:text-clinical-blue'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
          </div>
        </div>
      </div>

      {adminTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Gestão de Pagamentos */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2 dark:text-white">
                <ShieldCheck className="text-clinical-green" /> Pagamentos Pendentes
              </h3>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {pendingPayments.filter(p => p.status === 'pending').length === 0 ? (
                  <p className="text-clinical-muted text-center py-8 italic">Nenhum pagamento pendente.</p>
                ) : (
                  pendingPayments.filter(p => p.status === 'pending').map((pay, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-clinical-border dark:border-gray-700 flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-bold dark:text-white text-sm">{pay.name}</p>
                        <p className="text-[10px] text-clinical-muted">{pay.date}</p>
                        <p className="text-[10px] text-clinical-blue font-bold uppercase mt-1">Pendente</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            if (!pay.id) return;
                            const payRef = doc(db, 'payments', pay.id);
                            updateDoc(payRef, { status: 'approved' })
                            .then(() => showAlert("Sucesso", "Pagamento aprovado!"))
                            .catch(err => console.error(err));
                          }}
                          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                          title="Aprovar"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            if (!pay.id) return;
                            const payRef = doc(db, 'payments', pay.id);
                            updateDoc(payRef, { status: 'rejected' })
                            .then(() => showAlert("Aviso", "Pagamento rejeitado."))
                            .catch(err => console.error(err));
                          }}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                          title="Rejeitar"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Gestão de Casos */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-xl font-bold flex items-center gap-2 dark:text-white">
                  <BookOpen className="text-clinical-blue" /> Casos Clínicos
                </h3>
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowAiCaseModal(true)} className="p-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all" title="Gerar com IA">
                    <Sparkles className="w-4 h-4" />
                  </button>
                  <button onClick={() => { setSelectedCase(null); setShowCaseEditor(true); }} className="p-2 bg-clinical-blue text-white rounded-xl hover:bg-blue-600 transition-all" title="Novo Caso">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-clinical-muted" />
                  <input 
                    type="text" 
                    placeholder="Pesquisar caso..." 
                    value={caseSearchQuery}
                    onChange={(e) => setCaseSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-clinical-bg dark:bg-gray-900 border-none text-sm outline-none focus:ring-2 focus:ring-clinical-blue dark:text-white"
                  />
                </div>
                <div className="relative min-w-[200px]">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-clinical-muted" />
                  <select 
                    value={caseCategoryFilter}
                    onChange={(e) => setCaseCategoryFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-clinical-bg dark:bg-gray-900 border-none text-sm font-bold outline-none focus:ring-2 focus:ring-clinical-blue dark:text-white appearance-none cursor-pointer"
                  >
                    <option value="all">Todas as Categorias</option>
                    {CATEGORIES.sort().map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredCases.length === 0 ? (
                  <p className="col-span-full text-center py-8 text-clinical-muted italic">Nenhum caso encontrado.</p>
                ) : (
                  filteredCases.map((c, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-clinical-border dark:border-gray-700 flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold dark:text-white text-sm truncate">{c.title}</p>
                        <p className="text-[10px] text-clinical-muted uppercase tracking-widest truncate">{c.category}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => { setSelectedCase(c); setShowCaseEditor(true); }} className="p-1.5 text-clinical-blue hover:bg-clinical-blue/10 rounded-lg transition-all">
                          <Settings className="w-4 h-4" />
                        </button>
                        <button onClick={() => {
                          showConfirm("Remover Caso", `Deseja remover "${c.title}"?`, () => {
                            if (c.id) {
                              deleteDoc(doc(db, 'cases', c.id)).then(() => showAlert("Sucesso", "Caso removido!"));
                            }
                          });
                        }} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2 dark:text-white">
                <BarChart3 className="text-clinical-blue" /> Visão Geral
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-6 bg-clinical-blue/5 rounded-2xl border border-clinical-blue/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-clinical-blue tracking-widest">Utilizadores</p>
                    <p className="text-3xl font-black dark:text-white">{allUsers.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-clinical-blue/20" />
                </div>
                <div className="p-6 bg-clinical-green/5 rounded-2xl border border-clinical-green/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-clinical-green tracking-widest">Receita</p>
                    <p className="text-3xl font-black dark:text-white">{pendingPayments.filter(p => p.status === 'approved').length * 1500} Kz</p>
                  </div>
                  <Activity className="w-8 h-8 text-clinical-green/20" />
                </div>
                <div className="p-6 bg-purple-500/5 rounded-2xl border border-purple-500/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-purple-500 tracking-widest">Duelos</p>
                    <p className="text-3xl font-black dark:text-white">{duelRecords.length}</p>
                  </div>
                  <Swords className="w-8 h-8 text-purple-500/20" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-4">
              <h3 className="text-lg font-bold dark:text-white">Ações Rápidas</h3>
              <button 
                onClick={() => {
                  showConfirm("Reiniciar Ranking", "Deseja REINICIAR o ranking? Todos os dados do leaderboard serão apagados.", () => {
                    fetch('/api/admin/reset-leaderboard', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ isAdmin: true, email: user.email })
                    }).then(() => showAlert("Sucesso", "Ranking reiniciado!"));
                  });
                }}
                className="w-full py-3 bg-red-500/10 text-red-500 rounded-xl font-bold text-sm hover:bg-red-500 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Reiniciar Ranking
              </button>
              <button 
                onClick={async () => {
                  try {
                    const qSnap = await getDocs(collection(db, 'users'));
                    const usersData = qSnap.docs.map(doc => ({ ...doc.data(), id: doc.id } as unknown as UserProfile));
                    setAllUsers(usersData);
                    showAlert("Sucesso", "Utilizadores sincronizados com sucesso!");
                  } catch (err) {
                    console.error(err);
                    showAlert("Erro", "Falha ao sincronizar utilizadores.");
                  }
                }}
                className="w-full py-3 bg-clinical-blue/10 text-clinical-blue rounded-xl font-bold text-sm hover:bg-clinical-blue transition-all flex items-center justify-center gap-2"
              >
                <Activity className="w-4 h-4" /> Sincronizar Utilizadores
              </button>
              <button 
                onClick={() => {
                  showConfirm("Limpar Contas", "Deseja remover utilizadores do ranking que não estão registados no sistema?", async () => {
                    const leaderboardRef = collection(db, 'leaderboard');
                    const usersRef = collection(db, 'users');
                    
                    try {
                      const leaderboardSnap = await getDocs(leaderboardRef);
                      const usersSnap = await getDocs(usersRef);
                      const userEmails = new Set(usersSnap.docs.map(d => d.data().email));
                      
                      let removedCount = 0;
                      for (const docSnap of leaderboardSnap.docs) {
                        const data = docSnap.data();
                        if (!userEmails.has(data.email)) {
                          await deleteDoc(doc(db, 'leaderboard', docSnap.id));
                          removedCount++;
                        }
                      }
                      showAlert("Sucesso", `${removedCount} contas fantasmas removidas do ranking.`);
                    } catch (err) {
                      console.error(err);
                      showAlert("Erro", "Falha ao limpar contas.");
                    }
                  });
                }}
                className="w-full py-3 bg-orange-500/10 text-orange-500 rounded-xl font-bold text-sm hover:bg-orange-500 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Limpar Contas Fantasmas
              </button>
              <button 
                onClick={handleUpdateCoverImage}
                className="w-full py-3 bg-clinical-blue/10 text-clinical-blue rounded-xl font-bold text-sm hover:bg-clinical-blue transition-all flex items-center justify-center gap-2"
              >
                <ImageIcon className="w-4 h-4" /> Alterar Capa Global
              </button>
            </div>
          </div>
        </div>
      )}

      {adminTab === 'certificate' && (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold dark:text-white">Configurações do Certificado</h3>
            <button 
              onClick={async () => {
                try {
                  const settingsRef = doc(db, 'settings', 'certificate');
                  await updateDoc(settingsRef, certificateSettings);
                  showAlert("Sucesso", "Configurações do certificado guardadas!");
                } catch (err) {
                  console.error(err);
                  showAlert("Erro", "Falha ao guardar configurações.");
                }
              }}
              className="px-6 py-2 bg-clinical-blue text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-clinical-blue/20"
            >
              Guardar Alterações
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-clinical-muted tracking-widest ml-1">Título do Certificado</label>
                <input 
                  type="text" 
                  value={certificateSettings?.title || ''}
                  onChange={(e) => setCertificateSettings({...certificateSettings, title: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-clinical-bg dark:bg-gray-900 border-none text-sm font-bold outline-none focus:ring-2 focus:ring-clinical-blue dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-clinical-muted tracking-widest ml-1">Texto de Atribuição</label>
                <input 
                  type="text" 
                  value={certificateSettings?.attributionText || ''}
                  onChange={(e) => setCertificateSettings({...certificateSettings, attributionText: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-clinical-bg dark:bg-gray-900 border-none text-sm font-bold outline-none focus:ring-2 focus:ring-clinical-blue dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-clinical-muted tracking-widest ml-1">Corpo do Texto</label>
                <textarea 
                  value={certificateSettings?.bodyText || ''}
                  onChange={(e) => setCertificateSettings({...certificateSettings, bodyText: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-clinical-bg dark:bg-gray-900 border-none text-sm font-bold outline-none focus:ring-2 focus:ring-clinical-blue dark:text-white min-h-[150px] resize-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-6 bg-clinical-bg dark:bg-gray-900 rounded-3xl border border-clinical-border dark:border-gray-700">
                <h4 className="text-sm font-bold mb-4 dark:text-white">Pré-visualização do Texto</h4>
                <div className="space-y-4 text-center">
                  <h1 className="text-xl font-serif italic font-bold text-[#006432]">{certificateSettings?.title || 'CERTIFICADO DE CONCLUSÃO'}</h1>
                  <p className="text-[10px] uppercase tracking-widest text-gray-600">{certificateSettings?.attributionText || 'A RECOVERY HEALTH ATRIBUI O PRESENTE CERTIFICADO A:'}</p>
                  <p className="text-xs leading-relaxed text-gray-800">{certificateSettings?.bodyText || 'Por ter concluído com elevado mérito o Programa de Treino Clínico Intensivo...'}</p>
                </div>
              </div>
              <div className="p-6 bg-clinical-blue/5 rounded-3xl border border-clinical-blue/10">
                <p className="text-xs text-clinical-blue font-medium leading-relaxed">
                  <Activity className="w-4 h-4 inline mr-2" />
                  As alterações feitas aqui serão aplicadas a todos os novos certificados gerados pelos utilizadores.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {adminTab === 'cases' && (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-xl font-bold dark:text-white">Gestão de Casos Clínicos</h3>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowAiCaseModal(true)}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
              >
                <Sparkles className="w-5 h-5" /> Gerar com IA
              </button>
              <button 
                onClick={() => setShowCaseEditor(true)}
                className="px-6 py-3 bg-clinical-blue hover:bg-clinical-blue/90 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-clinical-blue/20"
              >
                <Plus className="w-5 h-5" /> Novo Caso
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-clinical-muted" />
              <input 
                type="text" 
                placeholder="Pesquisar caso..." 
                value={caseSearchQuery}
                onChange={(e) => setCaseSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-clinical-bg dark:bg-gray-900 border-none text-sm outline-none focus:ring-2 focus:ring-clinical-blue dark:text-white"
              />
            </div>
            <div className="relative w-full md:w-64">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-clinical-muted" />
              <select 
                value={caseCategoryFilter}
                onChange={(e) => setCaseCategoryFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-clinical-bg dark:bg-gray-900 border-none text-sm outline-none focus:ring-2 focus:ring-clinical-blue dark:text-white appearance-none"
              >
                <option value="all">Todas as Categorias</option>
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((c, idx) => (
              <div key={idx} className="p-6 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-clinical-border dark:border-gray-700 space-y-4 group">
                <div className="aspect-video rounded-2xl overflow-hidden bg-gray-200">
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-clinical-blue">{c.category}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      c.difficulty === 'Fácil' ? 'bg-green-100 text-green-600' :
                      c.difficulty === 'Médio' ? 'bg-orange-100 text-orange-600' :
                      'bg-red-100 text-red-600'
                    }`}>{c.difficulty}</span>
                  </div>
                  <h4 className="font-bold dark:text-white">{c.title}</h4>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setSelectedCase(c);
                      setShowCaseEditor(true);
                    }}
                    className="flex-1 py-2 bg-clinical-blue/10 text-clinical-blue rounded-xl font-bold text-xs hover:bg-clinical-blue transition-all"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => {
                      showConfirm("Eliminar Caso", `Deseja eliminar o caso "${c.title}"?`, async () => {
                        try {
                          await deleteDoc(doc(db, 'cases', c.id));
                          showAlert("Sucesso", "Caso eliminado!");
                          // You would typically refresh the list here
                        } catch (err) {
                          handleFirestoreError(err, OperationType.DELETE, 'cases');
                        }
                      });
                    }}
                    className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {adminTab === 'users' && (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold dark:text-white">Gestão de Utilizadores</h3>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-clinical-muted" />
              <input 
                type="text" 
                placeholder="Pesquisar utilizador..." 
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-clinical-bg dark:bg-gray-900 border-none text-sm outline-none focus:ring-2 focus:ring-clinical-blue dark:text-white"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-clinical-border dark:border-gray-700">
                  <th className="py-4 px-4 text-[10px] uppercase font-bold text-clinical-muted tracking-widest">Utilizador</th>
                  <th className="py-4 px-4 text-[10px] uppercase font-bold text-clinical-muted tracking-widest">Nível/Score</th>
                  <th className="py-4 px-4 text-[10px] uppercase font-bold text-clinical-muted tracking-widest">Status</th>
                  <th className="py-4 px-4 text-[10px] uppercase font-bold text-clinical-muted tracking-widest">Ações</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((u, idx) => (
                  <tr key={idx} className="border-b border-clinical-border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-clinical-blue/10 flex items-center justify-center text-clinical-blue font-bold text-xs">
                          {u.name ? u.name[0] : 'U'}
                        </div>
                        <div>
                          <p className="font-bold text-sm dark:text-white">{u.name}</p>
                          <p className="text-[10px] text-clinical-muted">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm font-bold dark:text-white">Nível {u.level}</p>
                      <p className="text-[10px] text-clinical-muted">{u.score} Pontos</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${u.isPremium ? 'bg-clinical-yellow/10 text-clinical-yellow' : 'bg-gray-100 text-gray-400'}`}>
                        {u.isPremium ? 'Premium' : 'Grátis'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button 
                        onClick={() => setSelectedUserForAdmin(u)}
                        className="p-2 text-clinical-blue hover:bg-clinical-blue/10 rounded-lg transition-all"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {adminTab === 'duels' && (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-6">
          <h3 className="text-xl font-bold dark:text-white">Monitorização de Duelos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {duelRecords.length === 0 ? (
              <p className="col-span-full text-center py-12 text-clinical-muted italic">Nenhum duelo registado recentemente.</p>
            ) : (
              duelRecords.map((duel, idx) => (
                <div key={idx} className="p-6 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-clinical-border dark:border-gray-700 space-y-4">
                  <div className="flex items-center justify-between text-[10px] text-clinical-muted uppercase tracking-widest">
                    <span>{new Date(duel.timestamp).toLocaleString()}</span>
                    <Swords className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-center flex-1">
                      <p className={`font-bold text-sm ${duel.winnerUid === duel.player1Uid ? 'text-clinical-green' : 'dark:text-white'}`}>{duel.player1Name}</p>
                      <p className="text-xl font-black dark:text-white">{duel.player1Score}</p>
                    </div>
                    <div className="text-clinical-muted font-bold">VS</div>
                    <div className="text-center flex-1">
                      <p className={`font-bold text-sm ${duel.winnerUid === duel.player2Uid ? 'text-clinical-green' : 'dark:text-white'}`}>{duel.player2Name}</p>
                      <p className="text-xl font-black dark:text-white">{duel.player2Score}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-clinical-border dark:border-gray-700 text-center">
                    <p className="text-[10px] font-bold uppercase text-clinical-blue">
                      Vencedor: {duel.winnerUid === 'draw' ? 'Empate' : (duel.winnerUid === duel.player1Uid ? duel.player1Name : duel.player2Name)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {adminTab === 'logs' && (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-6">
          <h3 className="text-xl font-bold dark:text-white">Registos de Acesso</h3>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar font-mono text-xs">
            {accessLogs.map((log, idx) => (
              <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-clinical-border dark:border-gray-700 flex items-center gap-4">
                <span className="text-clinical-muted whitespace-nowrap">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                <span className="font-bold text-clinical-blue whitespace-nowrap">{log.userName}</span>
                <span className="dark:text-gray-300 flex-1 truncate">{log.action}</span>
                <span className="text-[10px] text-clinical-muted italic">{log.userEmail}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {adminTab === 'reports' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl border border-clinical-border dark:border-gray-700 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-clinical-blue/10 flex items-center justify-center text-clinical-blue">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold dark:text-white">Lista de Jogadores</h3>
                <p className="text-xs text-clinical-muted mb-4">Exportar todos os utilizadores registados</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => downloadCSV(allUsers, 'lista_jogadores.csv')}
                    className="flex-1 py-2 bg-gray-100 dark:bg-gray-900 text-clinical-muted rounded-xl font-bold text-[10px] uppercase hover:bg-gray-200 transition-all"
                  >
                    CSV
                  </button>
                  <button 
                    onClick={() => setExportType('users')}
                    className="flex-1 py-2 bg-clinical-blue text-white rounded-xl font-bold text-[10px] uppercase hover:bg-blue-600 transition-all"
                  >
                    PDF
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl border border-clinical-border dark:border-gray-700 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-clinical-green/10 flex items-center justify-center text-clinical-green">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold dark:text-white">Casos Clínicos</h3>
                <p className="text-xs text-clinical-muted mb-4">Relatório de resoluções por caso</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      const caseStats = allCases.map(c => ({
                        id: c.id,
                        title: c.title,
                        category: c.category,
                        difficulty: c.difficulty,
                        completions: allUsers.filter(u => u.progress?.includes(c.id)).length
                      }));
                      downloadCSV(caseStats, 'estatisticas_casos.csv');
                    }}
                    className="flex-1 py-2 bg-gray-100 dark:bg-gray-900 text-clinical-muted rounded-xl font-bold text-[10px] uppercase hover:bg-gray-200 transition-all"
                  >
                    CSV
                  </button>
                  <button 
                    onClick={() => setExportType('cases')}
                    className="flex-1 py-2 bg-clinical-green text-white rounded-xl font-bold text-[10px] uppercase hover:bg-green-600 transition-all"
                  >
                    PDF
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl border border-clinical-border dark:border-gray-700 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold dark:text-white">Ranking Geral</h3>
                <p className="text-xs text-clinical-muted mb-4">Exportar classificação atual</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      const ranking = [...allUsers].sort((a, b) => b.score - a.score).map((u, i) => ({
                        pos: i + 1,
                        name: u.name,
                        score: u.score,
                        level: u.level
                      }));
                      downloadCSV(ranking, 'ranking_geral.csv');
                    }}
                    className="flex-1 py-2 bg-gray-100 dark:bg-gray-900 text-clinical-muted rounded-xl font-bold text-[10px] uppercase hover:bg-gray-200 transition-all"
                  >
                    CSV
                  </button>
                  <button 
                    onClick={() => setExportType('ranking')}
                    className="flex-1 py-2 bg-amber-500 text-white rounded-xl font-bold text-[10px] uppercase hover:bg-amber-600 transition-all"
                  >
                    PDF
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl border border-clinical-border dark:border-gray-700 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <Swords className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold dark:text-white">Histórico de Duelos</h3>
                <p className="text-xs text-clinical-muted mb-4">Exportar todos os confrontos</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => downloadCSV(duelRecords, 'historico_duelos.csv')}
                    className="flex-1 py-2 bg-gray-100 dark:bg-gray-900 text-clinical-muted rounded-xl font-bold text-[10px] uppercase hover:bg-gray-200 transition-all"
                  >
                    CSV
                  </button>
                  <button 
                    onClick={() => setExportType('duels')}
                    className="flex-1 py-2 bg-purple-500 text-white rounded-xl font-bold text-[10px] uppercase hover:bg-purple-600 transition-all"
                  >
                    PDF
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl border border-clinical-border dark:border-gray-700 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-clinical-blue/10 flex items-center justify-center text-clinical-blue">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold dark:text-white">Resumo do Projeto</h3>
                <p className="text-xs text-clinical-muted mb-4">Exportar documento de apresentação</p>
                <button 
                  onClick={() => setExportType('project_summary')}
                  className="w-full py-2 bg-clinical-blue text-white rounded-xl font-bold text-[10px] uppercase hover:bg-blue-600 transition-all"
                >
                  Exportar PDF
                </button>
              </div>
            </div>
          </div>

          {exportType && (
            <AdminReportsExport 
              type={exportType}
              data={{
                allUsers,
                allCases,
                duelRecords,
                leaderboard: [...allUsers].sort((a, b) => b.score - a.score)
              }}
              onClose={() => setExportType(null)}
            />
          )}
        </div>
      )}
    </motion.div>
  );
};
