import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Smartphone, 
  Monitor, 
  Share, 
  PlusSquare, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  WifiOff 
} from 'lucide-react';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any;
  coverImage?: string;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt,
  coverImage = 'https://lh3.googleusercontent.com/d/1n_zM13DJYSp6WpluuacxP-DPUjeeYY4C'
}) => {
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop'>('android');
  const [isInstalled, setIsInstalled] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    // Detect device / browser
    const ua = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(ua);
    const isAndroid = /android/.test(ua);

    if (isIos) {
      setPlatform('ios');
    } else if (isAndroid) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }

    // Check if already standalone
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true;
    setIsInstalled(isStandalone);
  }, []);

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setInstallSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    }
  };

  const markAsPrompted = () => {
    try {
      localStorage.setItem('recovery_health_install_prompt_dismissed', 'true');
    } catch (e) {}
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[28px] sm:rounded-[36px] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto"
        >
          {/* Close button */}
          <button
            onClick={markAsPrompted}
            className="absolute top-4 right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors backdrop-blur-md"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* App Header Identity Cover Card */}
          <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-950 flex items-end p-4 sm:p-6">
            <img
              src={coverImage}
              alt="Capa de Identidade RECOVERY HEALTH"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.7] transform hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

            {/* App Icon preview floating over cover */}
            <div className="relative z-10 flex items-center gap-3 sm:gap-4 w-full">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-white/80 shadow-2xl flex-shrink-0 bg-slate-900">
                <img
                  src={coverImage}
                  alt="App Icon"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0 flex-1 text-white">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-500/30 border border-teal-400/40 text-[10px] sm:text-xs font-black tracking-wider uppercase text-teal-300 mb-1">
                  <Sparkles className="w-3 h-3 text-teal-300" /> App Permanente
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white truncate leading-tight">
                  RECOVERY <span className="text-teal-400">HEALTH</span>
                </h3>
                <p className="text-xs text-slate-300 line-clamp-1">
                  Formação & Simulação Clínica
                </p>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-7 space-y-5">
            {/* Value Props Pills */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex flex-col items-center gap-1">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-tight">Acesso Rápido</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex flex-col items-center gap-1">
                <Smartphone className="w-4 h-4 text-teal-500" />
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-tight">Ecrã Total</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-tight">100% Seguro</span>
              </div>
            </div>

            {/* Platform Selection Tabs */}
            <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl gap-1">
              <button
                onClick={() => setPlatform('android')}
                className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  platform === 'android'
                    ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Android
              </button>
              <button
                onClick={() => setPlatform('ios')}
                className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  platform === 'ios'
                    ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> iPhone / iPad
              </button>
              <button
                onClick={() => setPlatform('desktop')}
                className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  platform === 'desktop'
                    ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" /> Computador
              </button>
            </div>

            {/* Platform Specific Step Instructions */}
            {platform === 'ios' && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-slate-800 dark:text-slate-200 space-y-3">
                <p className="text-xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                  Como instalar no iPhone / iPad (Safari):
                </p>
                <ol className="text-xs space-y-2.5 font-medium">
                  <li className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                    <span>Toque no botão <strong>Partilhar</strong> <Share className="w-3.5 h-3.5 inline mx-1 text-amber-600" /> na barra inferior do Safari.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                    <span>Role para baixo e selecione <strong>"Adicionar ao Ecrã Principal"</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-amber-600" />.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                    <span>Confirme em <strong>Adicionar</strong>. O aplicativo ficará pronto com a foto de capa oficial!</span>
                  </li>
                </ol>
              </div>
            )}

            {platform === 'android' && (
              <div className="space-y-3">
                {deferredPrompt ? (
                  <button
                    onClick={handleNativeInstall}
                    className="w-full py-4 px-6 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-2xl font-black text-base shadow-xl shadow-teal-600/30 flex items-center justify-center gap-3 transition-all transform active:scale-98"
                  >
                    <Download className="w-5 h-5" /> Instalar Aplicativo Agora
                  </button>
                ) : (
                  <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-slate-800 dark:text-slate-200 space-y-3">
                    <p className="text-xs font-black text-teal-700 dark:text-teal-400 uppercase tracking-wide">
                      Como instalar no Android (Chrome / Navegador):
                    </p>
                    <ol className="text-xs space-y-2.5 font-medium">
                      <li className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                        <span>Toque no menu de <strong>3 pontos (⋮)</strong> no topo do Chrome.</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                        <span>Selecione <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.</span>
                      </li>
                    </ol>
                  </div>
                )}
              </div>
            )}

            {platform === 'desktop' && (
              <div className="space-y-3">
                {deferredPrompt ? (
                  <button
                    onClick={handleNativeInstall}
                    className="w-full py-4 px-6 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white rounded-2xl font-black text-base shadow-xl shadow-teal-600/30 flex items-center justify-center gap-3 transition-all"
                  >
                    <Download className="w-5 h-5" /> Instalar no Computador
                  </button>
                ) : (
                  <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-slate-800 dark:text-slate-200 space-y-2.5">
                    <p className="text-xs font-black text-indigo-700 dark:text-indigo-400 uppercase tracking-wide">
                      Instalação no Computador (Chrome / Edge):
                    </p>
                    <p className="text-xs font-medium leading-relaxed">
                      Clique no ícone de <strong>Instalar ⊕</strong> localizado no lado direito da barra de endereços do seu navegador ou no menu de configurações (⋮).
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Feedback message upon success */}
            {installSuccess && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500 text-emerald-700 dark:text-emerald-300 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Aplicativo instalado com sucesso!
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={markAsPrompted}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Continuar no Navegador
              </button>
              <button
                onClick={markAsPrompted}
                className="py-3 px-5 rounded-xl text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity"
              >
                Entendido
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
