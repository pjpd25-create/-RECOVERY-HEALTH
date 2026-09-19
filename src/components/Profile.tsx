import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, Award, BookOpen, Users, MessageSquare, 
  Settings, Trophy, Activity, CheckCircle2, Star, 
  BarChart3, Download, Shield, LogOut, Clock, 
  AlertCircle, Info, MessageCircle, ShoppingBag,
  CreditCard, ShieldCheck, Lock
} from 'lucide-react';
import { UserProfile, ClinicalCase, Badge, PendingPayment } from '../types';
import { Shop } from './Shop';
import { FriendManager } from './FriendManager';

interface ProfileProps {
  user: UserProfile;
  isAdmin: boolean;
  protectedSetView: (view: any) => void;
  setShowEditProfile: (show: boolean) => void;
  setShowTournamentArena: (show: boolean) => void;
  setShowPerformanceDashboard: (show: boolean) => void;
  setShowPortfolioExport: (show: boolean) => void;
  allCases: ClinicalCase[];
  isCertificatePaid: boolean;
  pendingPayments: PendingPayment[];
  feedback: { stars: number; comment: string };
  setFeedback: React.Dispatch<React.SetStateAction<{ stars: number; comment: string }>>;
  handleLogout: () => void;
  handleBuyItem: (itemId: string, cost: number) => void;
  handleAcceptFriendRequest: (uid: string) => void;
  handleRejectFriendRequest: (uid: string) => void;
  handleSendFriendRequest: (email: string) => void;
  showAlert: (title: string, message: string) => void;
  setShowPaymentModal: (show: boolean) => void;
  sendWhatsAppNotification: (message: string) => void;
  BADGES: Badge[];
}

export const Profile: React.FC<ProfileProps> = ({ 
  user, 
  isAdmin, 
  protectedSetView, 
  setShowEditProfile, 
  setShowTournamentArena, 
  setShowPerformanceDashboard, 
  setShowPortfolioExport,
  allCases,
  isCertificatePaid,
  pendingPayments,
  feedback,
  setFeedback,
  handleLogout,
  handleBuyItem,
  handleAcceptFriendRequest,
  handleRejectFriendRequest,
  handleSendFriendRequest,
  showAlert,
  setShowPaymentModal,
  sendWhatsAppNotification,
  BADGES
}) => {
  return (
    <motion.div 
      key="profile"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-5xl mx-auto pb-20"
    >
      {/* Dashboard Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowTournamentArena(true)}
          className="p-6 bg-amber-500 text-white rounded-[32px] shadow-lg shadow-amber-500/20 flex flex-col items-center gap-3 text-center group transition-all"
        >
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Trophy className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Torneios</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowPerformanceDashboard(true)}
          className="p-6 bg-clinical-blue text-white rounded-[32px] shadow-lg shadow-clinical-blue/20 flex flex-col items-center gap-3 text-center group transition-all"
        >
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <BarChart3 className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Performance AI</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowPortfolioExport(true)}
          className="p-6 bg-clinical-green text-white rounded-[32px] shadow-lg shadow-clinical-green/20 flex flex-col items-center gap-3 text-center group transition-all"
        >
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Download className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Exportar Portfólio</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => protectedSetView('social')}
          className="p-6 bg-clinical-text text-white rounded-[32px] shadow-lg shadow-clinical-text/20 flex flex-col items-center gap-3 text-center group transition-all"
        >
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <MessageSquare className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Comunidade</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => protectedSetView('groups')}
          className="p-6 bg-purple-600 text-white rounded-[32px] shadow-lg shadow-purple-600/20 flex flex-col items-center gap-3 text-center group transition-all"
        >
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Meus Grupos</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => protectedSetView('library')}
          className="p-6 bg-indigo-600 text-white rounded-[32px] shadow-lg shadow-indigo-600/20 flex flex-col items-center gap-3 text-center group transition-all"
        >
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Biblioteca</span>
        </motion.button>

        {isAdmin && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => protectedSetView('certificate_editor')}
            className="p-6 bg-pink-600 text-white rounded-[32px] shadow-lg shadow-pink-600/20 flex flex-col items-center gap-3 text-center group transition-all"
          >
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Editor Certificado</span>
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => protectedSetView('hub')}
          className="p-6 bg-clinical-text text-white rounded-[32px] shadow-lg shadow-clinical-text/20 flex flex-col items-center gap-3 text-center group transition-all"
        >
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Activity className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Central de Missões</span>
        </motion.button>

        {isAdmin && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => protectedSetView('admin')}
            className="p-6 bg-red-600 text-white rounded-[32px] shadow-lg shadow-red-600/20 flex flex-col items-center gap-3 text-center group transition-all"
          >
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Painel Admin</span>
          </motion.button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] border border-clinical-border dark:border-gray-700 shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-clinical-blue/10 to-purple-500/10" />
        
        <div className="w-32 h-32 rounded-full bg-clinical-blue/10 flex items-center justify-center text-clinical-blue border-4 border-white dark:border-gray-800 shadow-xl relative z-10 overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <User className="w-16 h-16" />
          )}
        </div>
        <div className="flex-1 text-center md:text-left space-y-2 relative z-10">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <h2 className="text-3xl font-black dark:text-white">{user.name}</h2>
            <button 
              onClick={() => setShowEditProfile(true)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              title="Editar Perfil"
            >
              <Settings className="w-4 h-4 text-clinical-muted" />
            </button>
          </div>
          <p className="text-clinical-muted font-bold">
            {user.status || 'Fisioterapeuta'} {user.age ? `• ${user.age} anos` : ''} • Nível {user.level}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
            <div className="px-4 py-2 bg-clinical-blue/5 rounded-2xl border border-clinical-blue/10">
              <p className="text-[10px] uppercase font-black text-clinical-blue tracking-widest">Pontuação</p>
              <p className="text-xl font-display font-black dark:text-white">{user.score || 0} pts</p>
            </div>
            <div className="px-4 py-2 bg-clinical-green/5 rounded-2xl border border-clinical-green/10">
              <p className="text-[10px] uppercase font-black text-clinical-green tracking-widest">Casos Resolvidos</p>
              <p className="text-xl font-display font-black dark:text-white">{(user.progress || []).length}</p>
            </div>
          </div>
          
          {/* Progress Bar for Certificate */}
          <div className="pt-4 space-y-2">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
              <span className="text-clinical-muted">Progresso para Certificado</span>
              <span className="text-clinical-blue">{Math.min(100, Math.round(((user.progress || []).length / 15) * 100))}%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.round(((user.progress || []).length / 15) * 100))}%` }}
                className="h-full bg-clinical-blue"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 relative z-10">
          <button 
            onClick={() => protectedSetView('dashboard')}
            className="px-6 py-3 bg-clinical-blue text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-clinical-blue/20"
          >
            <BarChart3 className="w-4 h-4" /> Desempenho
          </button>
          <button 
            onClick={() => protectedSetView('leaderboard')}
            className="px-6 py-3 bg-clinical-text text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
          >
            <Trophy className="w-4 h-4" /> Ranking
          </button>
          {isAdmin && (
            <button 
              onClick={() => protectedSetView('admin')}
              className="px-6 py-3 bg-red-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-red-700 transition-all shadow-lg shadow-red-200"
            >
              <ShieldCheck className="w-4 h-4" /> Admin
            </button>
          )}
          <button 
            onClick={handleLogout}
            className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-red-500 rounded-xl font-bold flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all shadow-sm"
          >
            <LogOut className="w-4 h-4" /> Terminar Sessão
          </button>
          <button 
            onClick={() => {
              if (!isCertificatePaid && !isAdmin) {
                setShowPaymentModal(true);
                return;
              }
              if ((user.progress || []).length < 15 && !isAdmin) {
                showAlert("Certificado Indisponível", "Precisa de completar pelo menos 15 casos clínicos para gerar o certificado.");
                return;
              }
              protectedSetView('certificate');
            }}
            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg ${
              isCertificatePaid || isAdmin
                ? 'bg-clinical-blue text-white hover:bg-blue-600 shadow-clinical-blue/20'
                : 'bg-clinical-muted/10 text-clinical-muted hover:bg-clinical-muted/20'
            }`}
          >
            <Award className="w-5 h-5" />
            {isCertificatePaid || isAdmin ? 'Gerar Certificado Digital' : 'Desbloquear Certificado'}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] border border-clinical-border dark:border-gray-700 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-clinical-blue/10 rounded-xl flex items-center justify-center text-clinical-blue">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-black uppercase tracking-widest dark:text-white">Loja de Itens</h3>
        </div>
        <Shop user={user} onBuy={handleBuyItem} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] border border-clinical-border dark:border-gray-700 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600/10 rounded-xl flex items-center justify-center text-purple-600">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-widest dark:text-white">Gestão de Amigos</h3>
          </div>
          <FriendManager 
            user={user} 
            onAccept={handleAcceptFriendRequest} 
            onReject={handleRejectFriendRequest} 
            onSend={handleSendFriendRequest} 
          />
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] border border-clinical-border dark:border-gray-700 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400/10 rounded-xl flex items-center justify-center text-yellow-500">
              <Star className="w-5 h-5 fill-yellow-500" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-widest dark:text-white">Avaliação</h3>
          </div>
          <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
            <p className="text-[10px] uppercase font-black text-clinical-muted tracking-widest text-center">Como avalia a sua experiência?</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star}
                  onClick={() => {
                    setFeedback(prev => ({ ...prev, stars: star }));
                    const message = `Avaliei a plataforma RECOVERY HEALTH com ${star} estrelas!`;
                    window.open(`https://wa.me/244933108270?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star className={`w-8 h-8 ${feedback.stars >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] border border-clinical-border dark:border-gray-700 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-clinical-blue/10 rounded-xl flex items-center justify-center text-clinical-blue">
            <CreditCard className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-black uppercase tracking-widest dark:text-white">Estado do Certificado</h3>
        </div>
        <div className="p-6 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
              isCertificatePaid || isAdmin 
                ? 'bg-clinical-green text-white' 
                : (pendingPayments.some(p => p.userId === user.email && p.status === 'pending') ? 'bg-clinical-blue text-white' : 'bg-yellow-500 text-white')
            }`}>
              {isCertificatePaid || isAdmin 
                ? <CheckCircle2 className="w-7 h-7" /> 
                : (pendingPayments.some(p => p.userId === user.email && p.status === 'pending') ? <Clock className="w-7 h-7" /> : <AlertCircle className="w-7 h-7" />)
              }
            </div>
            <div>
              <p className="font-black dark:text-white text-xl uppercase tracking-tight">
                {isCertificatePaid || isAdmin 
                  ? 'Certificado Desbloqueado' 
                  : (pendingPayments.some(p => p.userId === user.email && p.status === 'pending') ? 'Pagamento em Análise' : 'Certificado Bloqueado')
                }
              </p>
              <p className="text-xs font-bold text-clinical-muted uppercase tracking-widest">
                {isCertificatePaid || isAdmin 
                  ? 'Pode gerar o seu certificado agora.' 
                  : (pendingPayments.some(p => p.userId === user.email && p.status === 'pending') ? 'O seu comprovativo está a ser verificado.' : 'Desbloqueie o seu certificado para download.')
                }
              </p>
            </div>
          </div>
          {!isCertificatePaid && !isAdmin && (
            <button 
              onClick={() => setShowPaymentModal(true)}
              className="w-full md:w-auto px-8 py-4 bg-clinical-blue text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-clinical-blue/20 hover:bg-blue-600"
            >
              {pendingPayments.some(p => p.userId === user.email && p.status === 'pending') ? 'Reenviar Comprovativo' : 'Pagar Agora (1.500 Kz)'}
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100/50 dark:border-blue-900/20">
            <Info className="w-5 h-5 text-clinical-blue shrink-0 mt-0.5" />
            <p className="text-xs text-clinical-muted leading-relaxed">
              O certificado é desbloqueado permanentemente após a aprovação do pagamento. Pode ser gerado após 15 casos concluídos.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50/50 dark:bg-green-900/10 border border-green-100/50 dark:border-green-900/20">
            <MessageCircle className="w-5 h-5 text-clinical-green shrink-0 mt-0.5" />
            <p className="text-xs text-clinical-muted leading-relaxed">
              Dúvidas ou problemas com o pagamento? Entre em contacto com o suporte via WhatsApp: <span className="font-bold text-clinical-text dark:text-white">933 108 270</span>
            </p>
          </div>
        </div>
      </div>

      {/* Rating Box */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold flex items-center gap-2 dark:text-white">
            <Star className="text-yellow-400 fill-yellow-400" /> Avalie a Plataforma
          </h3>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setFeedback(prev => ({ ...prev, stars: star }))}
                className="transition-transform hover:scale-110 active:scale-90"
              >
                <Star 
                  className={`w-10 h-10 ${feedback.stars >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                />
              </button>
            ))}
          </div>
          <div className="flex-1 w-full space-y-4">
            <textarea 
              placeholder="Deixe o seu comentário sobre a sua experiência..."
              value={feedback.comment}
              onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
              className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-clinical-border dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none transition-all resize-none h-24 dark:text-white"
            />
            <button 
              onClick={() => {
                if (feedback.stars === 0) {
                  showAlert("Aviso", "Por favor, selecione uma classificação por estrelas.");
                  return;
                }
                const message = `*Avaliação RECOVERY HEALTH*\n\n*Utilizador:* ${user.name}\n*Estrelas:* ${'⭐'.repeat(feedback.stars)}\n*Comentário:* ${feedback.comment || 'Sem comentário'}`;
                sendWhatsAppNotification(message);
                showAlert("Feedback Enviado", "Obrigado pelo seu feedback! A sua avaliação foi enviada.");
                setFeedback({ stars: 0, comment: '' });
              }}
              className="w-full py-4 bg-clinical-blue text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-clinical-blue/20"
            >
              Enviar Avaliação para o WhatsApp
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] border border-clinical-border dark:border-gray-700 shadow-sm space-y-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-orange-50 dark:bg-orange-950/20 p-6 rounded-[32px] border border-orange-100 dark:border-orange-950/30">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-orange-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <Trophy className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight dark:text-white">Conquistas</h3>
                  <p className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">Galeria de Medalhas</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-4xl font-black text-orange-500">{(user.badges || []).length}</span>
                  <span className="text-sm font-black text-clinical-muted uppercase tracking-widest">/ {BADGES.length}</span>
                </div>
                <p className="text-[10px] font-black text-clinical-muted uppercase tracking-widest">Desbloqueadas</p>
              </div>
            </div>
            
            <div className="px-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-clinical-muted">Nível de Colecionador</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">{Math.round(((user.badges || []).length / BADGES.length) * 100)}%</span>
              </div>
              <div className="h-3 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((user.badges || []).length / BADGES.length) * 100}%` }}
                  className="h-full bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {BADGES.map(badge => {
              const isUnlocked = (user.badges || []).find(b => b.id === badge.id);
              return (
                <motion.div 
                  key={badge.id}
                  whileHover={isUnlocked ? { y: -8, scale: 1.05 } : {}}
                  className={`relative p-5 rounded-[36px] border-2 text-center space-y-3 transition-all duration-300 group ${
                    isUnlocked 
                      ? 'bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-900/50 shadow-xl shadow-orange-500/5 cursor-pointer' 
                      : 'bg-gray-50/30 dark:bg-gray-900/30 border-gray-100 dark:border-gray-800 opacity-40 grayscale'
                  }`}
                >
                  <div className={`w-20 h-20 rounded-[28px] mx-auto flex items-center justify-center text-4xl shadow-md transition-all duration-500 group-hover:rotate-6 ${
                    isUnlocked 
                      ? 'bg-gradient-to-br from-orange-400 to-amber-500 text-white ring-4 ring-orange-50 dark:ring-orange-900/20' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                  }`}>
                    {badge.icon}
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black dark:text-white leading-tight uppercase tracking-tight min-h-[2em] flex items-center justify-center">{badge.name}</p>
                    {isUnlocked ? (
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-2.5 h-2.5 text-orange-500 fill-orange-500" />
                        <span className="text-[8px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest">Raro</span>
                      </div>
                    ) : (
                      <p className="text-[8px] font-black text-clinical-muted uppercase tracking-widest">Bloqueado</p>
                    )}
                  </div>
                  {!isUnlocked && (
                    <div className="absolute top-4 right-4">
                      <Lock className="w-3 h-3 text-gray-400" />
                    </div>
                  )}
                  {isUnlocked && (
                    <div className="absolute -top-1 -right-1">
                      <div className="w-6 h-6 bg-clinical-green text-white rounded-full flex items-center justify-center shadow-lg transform rotate-12">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] border border-clinical-border dark:border-gray-700 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-clinical-green/10 rounded-xl flex items-center justify-center text-clinical-green">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-widest dark:text-white">Atividade</h3>
          </div>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {(user.progress || []).length > 0 ? (
              [...(user.progress || [])].reverse().map((caseId, idx) => {
                const c = allCases.find(cc => cc.id === caseId);
                return (
                  <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 flex items-center justify-between group hover:border-clinical-blue/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-clinical-blue/10 flex items-center justify-center text-clinical-blue group-hover:bg-clinical-blue group-hover:text-white transition-all">
                        <Activity className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-black dark:text-white uppercase tracking-tight">{c?.title || 'Caso Clínico'}</p>
                        <p className="text-[10px] font-bold text-clinical-muted uppercase tracking-widest">{c?.category}</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-clinical-green/10 flex items-center justify-center text-clinical-green">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-clinical-muted italic uppercase tracking-widest text-[10px] font-black">
                Nenhuma atividade registada ainda.
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
