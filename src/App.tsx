/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useState, useEffect, Component } from 'react';
import { AdminReportsExport } from './components/AdminReportsExport';
import { 
  Activity, 
  User, 
  ChevronRight, 
  ChevronLeft,
  Star, 
  Send, 
  Award, 
  BookOpen, 
  Stethoscope, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ArrowLeft,
  Trophy,
  Camera,
  Upload,
  Trash2,
  Moon,
  Sun,
  Search,
  Shield,
  Filter,
  Download,
  BarChart3,
  Users,
  ShieldCheck,
  Zap,
  Lightbulb,
  Settings,
  Copy,
  MessageCircle,
  MessageSquare,
  ShoppingBag,
  Lock,
  CreditCard,
  Info,
  PlusCircle,
  X,
  Plus,
  Save,
  LogOut,
  LogIn,
  Sparkles,
  Bell,
  Swords,
  UserPlus,
  Image as ImageIcon,
  Video as VideoIcon,
  LayoutDashboard,
  ClipboardList,
  FileText,
  Crown,
  Target,
  Brain,
  Loader2,
  Mic,
  MicOff,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { io, Socket } from 'socket.io-client';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { QRCodeSVG } from 'qrcode.react';
import { View, Category, ClinicalCase, UserProfile, Question, Badge, LeaderboardEntry, Multimedia, CaseStage, FeedItem, StudyGroup, GroupMessage, OperationType, Specialty } from './types';
import { CLINICAL_CASES } from './data/cases';
import { SPECIALTIES, SPECIALTY_CATEGORIES, CATEGORIES, USER_STATUSES } from './constants';

import { GoogleGenAI } from "@google/genai";
import { auth, db, handleFirestoreError } from './firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, signInAnonymously, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, getDoc, getDocs, setDoc, collection, onSnapshot, query, where, updateDoc, addDoc, deleteDoc, orderBy, limit, getDocFromServer } from 'firebase/firestore';

// Component Imports
import { Logo } from './components/Logo';
import { Home } from './components/Home';
import { BiomechanicsLab } from './components/BiomechanicsLab';
import { VirtualConsultation } from './components/VirtualConsultation';
import { CertificateEditor } from './components/CertificateEditor';
import { CategoryList } from './components/CategoryList';
import { Hub } from './components/Hub';
import { Profile } from './components/Profile';
import { Leaderboard } from './components/Leaderboard';
import { Dashboard } from './components/Dashboard';
import { Community } from './components/Community';
import { Footer } from './components/Footer';
import { ReferenceLibrary } from './components/ReferenceLibrary';
import { GlobalModal } from './components/GlobalModal';
import { MissionCenter } from './components/MissionCenter';
import { AdminPanel } from './components/AdminPanel';
import { CaseSimulation } from './components/CaseSimulation';
import { DuelArena } from './components/DuelArena';
import { DuelMode } from './components/DuelMode';
import { Certificate } from './components/Certificate';
import { EditProfileModal } from './components/EditProfileModal';
import { MultimediaViewer } from './components/MultimediaViewer';
import { CaseEditor } from './components/CaseEditor';
import { Shop } from './components/Shop';
import { FriendManager } from './components/FriendManager';
import { MultimediaEditor } from './components/MultimediaEditor';
import { PatientChat } from './components/PatientChat';
import { PerformanceDashboard } from './components/ai/PerformanceDashboard';
import { RoundTableSimulation } from './components/ai/RoundTableSimulation';
import { AnatomyViewer } from './components/AnatomyViewer';
import { VoiceNavigator } from './components/VoiceNavigator';
import { PortfolioExport } from './components/PortfolioExport';
import { TournamentArena } from './components/TournamentArena';
import { AnatomyMap } from './components/AnatomyMap';
import { ImageAnalyzer } from './components/ImageAnalyzer';
import { SocialFeed } from './components/SocialFeed';
import { StudyGroups } from './components/StudyGroups';
import { AIAssistant } from './components/AIAssistant';
import { LiveVoiceAssistant } from './components/LiveVoiceAssistant';
import { OSCESimulator } from './components/OSCESimulator';
import { TriageSimulator } from './components/TriageSimulator';
import { InternshipLogbook } from './components/InternshipLogbook';
import { TeacherDashboard } from './components/TeacherDashboard';
import { InstitutionDashboard } from './components/InstitutionDashboard';
import { InstallAppModal } from './components/InstallAppModal';



async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. The client is offline.");
    }
  }
}

class ErrorBoundary extends Component<any, any> {
  state = { hasError: false, errorInfo: null, isTranslationError: false };

  constructor(props: any) {
    super(props);
  }

  static getDerivedStateFromError(error: any) {
    const isTranslationError = error?.message?.includes('insertBefore') || error?.message?.includes('removeChild');
    return { 
      hasError: true, 
      errorInfo: error.message,
      isTranslationError
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-clinical-bg p-6">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-[32px] shadow-2xl border border-clinical-border dark:border-gray-700 max-w-md w-full text-center space-y-6">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-2xl font-black dark:text-white">Algo correu mal</h1>
            <p className="text-clinical-muted leading-relaxed">
              {this.state.isTranslationError 
                ? "Ocorreu um erro causado pela tradução automática do navegador. Por favor, desative a tradução para esta página e recarregue."
                : "Ocorreu um erro inesperado. Por favor, tente recarregar a página."}
            </p>
            {this.state.errorInfo && (
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl text-left overflow-auto max-h-40">
                <code className="text-xs text-red-500">{this.state.errorInfo}</code>
              </div>
            )}
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-clinical-blue text-white rounded-2xl font-black hover:bg-blue-600 transition-all shadow-lg shadow-clinical-blue/20"
            >
              RECARREGAR PÁGINA
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

const GEMINI_KEY = process.env.GEMINI_API_KEY || '';
const ai = GEMINI_KEY ? new GoogleGenAI({ apiKey: GEMINI_KEY }) : null;

// --- Components ---




// --- Main App ---

const BADGES: Badge[] = [
  { id: 'first_case', name: 'Primeiro Passo', description: 'Completou o seu primeiro caso clínico.', icon: '🎯' },
  { id: 'spine_master', name: 'Mestre da Coluna', description: 'Completou 5 casos de Coluna Vertebral.', icon: '🦴' },
  { id: 'speed_demon', name: 'Raciocínio Relâmpago', description: 'Respondeu corretamente em tempo recorde.', icon: '⚡' },
  { id: 'perfect_score', name: 'Perfeição Clínica', description: 'Completou um caso sem errar nenhuma pergunta.', icon: '⭐' },
  { id: 'level_10', name: 'Veterano', description: 'Atingiu o nível 10.', icon: '🏆' },
];

const COVER_IMAGE = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80';

const sendWhatsAppNotification = (message: string) => {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/933108270?text=${encoded}`, '_blank');
};

function AppContent() {
  const [view, setView] = useState<View>('home');
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const overrideObj = localStorage.getItem('fisiofasp_theme_manual_override');
      if (overrideObj) {
        const data = JSON.parse(overrideObj);
        if (Date.now() - data.timestamp < 4 * 60 * 60 * 1000) {
          return data.mode === 'dark';
        }
      }
      const hour = new Date().getHours();
      if (hour >= 18 || hour < 6) return true;
      const saved = localStorage.getItem('fisiofasp_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      const hour = new Date().getHours();
      return hour >= 18 || hour < 6;
    }
  });
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [showLiveAssistant, setShowLiveAssistant] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    (window as any).openLiveAssistant = () => setShowLiveAssistant(true);
    return () => { delete (window as any).openLiveAssistant; };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('fisiofasp_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('fisiofasp_theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const checkTimeTheme = () => {
      try {
        const overrideObj = localStorage.getItem('fisiofasp_theme_manual_override');
        if (overrideObj) {
          const data = JSON.parse(overrideObj);
          if (Date.now() - data.timestamp < 4 * 60 * 60 * 1000) {
            return;
          }
        }
        const hour = new Date().getHours();
        setDarkMode(hour >= 18 || hour < 6);
      } catch (e) {
        const hour = new Date().getHours();
        setDarkMode(hour >= 18 || hour < 6);
      }
    };
    const timer = setInterval(checkTimeTheme, 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const [showInstallModal, setShowInstallModal] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Auto-prompt on first access (per user request)
    try {
      const hasPrompted = localStorage.getItem('recovery_health_first_access_prompted') || 
                          localStorage.getItem('recovery_health_install_prompt_dismissed');
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                           (window.navigator as any).standalone === true;
      if (!hasPrompted && !isStandalone) {
        const timeout = setTimeout(() => {
          setShowInstallModal(true);
          localStorage.setItem('recovery_health_first_access_prompted', 'true');
        }, 1200);
        return () => {
          clearTimeout(timeout);
          window.removeEventListener('beforeinstallprompt', handler);
        };
      }
    } catch (err) {}

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = () => {
    setShowInstallModal(true);
  };

  const [adminTab, setAdminTab] = useState<'dashboard' | 'users' | 'cases' | 'duels' | 'logs' | 'reports' | 'certificate'>('dashboard');
  const [adminViewingUser, setAdminViewingUser] = useState<UserProfile | null>(null);
  const [selectedUserForAdmin, setSelectedUserForAdmin] = useState<UserProfile | null>(null);
  const [modalConfig, setModalConfig] = useState<{
    show: boolean;
    title: string;
    message: string;
    type: 'alert' | 'confirm' | 'prompt';
    onConfirm?: (value?: any) => void;
    onCancel?: () => void;
    defaultValue?: string;
  }>({ show: false, title: '', message: '', type: 'alert' });

  const showAlert = (title: string, message: string) => {
    setModalConfig({ show: true, title, message, type: 'alert' });
  };

  const showConfirm = (title: string, message: string, onConfirm: () => void) => {
    setModalConfig({ show: true, title, message, type: 'confirm', onConfirm });
  };

  const showPrompt = (title: string, message: string, onConfirm: (val: string) => void, defaultValue: string = '') => {
    setModalConfig({ show: true, title, message, type: 'prompt', onConfirm, defaultValue });
  };

  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, show: false }));
  };

  const [mode, setMode] = useState<'treino' | 'desafio'>('desafio');
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty>('Saúde Geral');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<ClinicalCase | null>(null);
  const [coverImageGlobal, setCoverImageGlobal] = useState('https://lh3.googleusercontent.com/d/1n_zM13DJYSp6WpluuacxP-DPUjeeYY4C');
  const [isLocked, setIsLocked] = useState(true);
  const [isCertificatePaid, setIsCertificatePaid] = useState(() => {
    try {
      const saved = localStorage.getItem('recovery_health_certificate_paid') || localStorage.getItem('fisiofasp_certificate_paid');
      return saved === 'true';
    } catch (e) {
      return false;
    }
  });
  const [certificateSettings, setCertificateSettings] = useState({
    title: 'CERTIFICADO DE CONCLUSÃO',
    attributionText: 'A RECOVERY HEALTH ATRIBUI O PRESENTE CERTIFICADO A:',
    bodyText: 'Por ter concluído com elevado mérito o Programa de Treino Clínico Intensivo no sistema RECOVERY HEALTH, evidenciando competências técnicas avançadas, excelência no raciocínio clínico e elevada capacidade de tomada de decisão na prática clínica.'
  });
  const [pendingPayments, setPendingPayments] = useState<{ id?: string, userId: string, name: string, date: string, status: 'pending' | 'approved' | 'rejected' }[]>(() => {
    try {
      const saved = localStorage.getItem('recovery_health_pending_payments') || localStorage.getItem('fisiofasp_pending_payments');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [accessLogs, setAccessLogs] = useState<any[]>([]);
  const [duelRecords, setDuelRecords] = useState<any[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>({});
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('fisiofasp_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          progress: parsed.progress || [],
          badges: parsed.badges || [],
          scoreHistory: parsed.scoreHistory || [],
          lives: parsed.lives ?? 5,
          categoryScores: parsed.categoryScores || {},
          streak: parsed.streak || 0,
          lastActivityDate: parsed.lastActivityDate || null,
          streakFreezeCount: parsed.streakFreezeCount || 0,
          friends: parsed.friends || [],
          friendRequests: parsed.friendRequests || [],
          notifications: parsed.notifications || []
        };
      }
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
    }
    return {
      name: '',
      email: '',
      level: 1,
      score: 0,
      progress: [],
      badges: [],
      scoreHistory: [],
      isPremium: false,
      lives: 5,
      categoryScores: {},
      streak: 0,
      lastActivityDate: null,
      streakFreezeCount: 0,
      friends: [],
      friendRequests: [],
      notifications: []
    };
  });

  useEffect(() => {
    if (user && (user.uid || user.email)) {
      localStorage.setItem('fisiofasp_user', JSON.stringify(user));
    }
  }, [user]);

  // Life Regeneration Logic
  useEffect(() => {
    document.title = "RECOVERY HEALTH v1.0";
    const interval = setInterval(() => {
      setUser(prev => {
        if (prev.lives >= 5) return prev;
        
        const now = new Date();
        const lastRegen = prev.lastLifeRegen ? new Date(prev.lastLifeRegen) : new Date();
        const diffMinutes = (now.getTime() - lastRegen.getTime()) / (1000 * 60);
        
        if (diffMinutes >= 30) { // Regenerate 1 life every 30 minutes
          const livesToAdd = Math.floor(diffMinutes / 30);
          const newLives = Math.min(5, prev.lives + livesToAdd);
          return {
            ...prev,
            lives: newLives,
            lastLifeRegen: now.toISOString()
          };
        }
        return prev;
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const updateUser = async (newData: Partial<UserProfile>) => {
    if (!auth.currentUser && !user.email) return;
    try {
      const uid = auth.currentUser?.uid || user.email.replace(/\./g, '_');
      await setDoc(doc(db, 'users', uid), newData, { merge: true });
      
      // Update leaderboard if score or level changed
      if (newData.score !== undefined || newData.level !== undefined) {
        const updatedUser = { ...user, ...newData };
        const leaderboardRef = doc(db, 'leaderboard', uid);
        await setDoc(leaderboardRef, {
          uid: uid,
          email: user.email,
          name: user.name,
          score: updatedUser.score,
          level: updatedUser.level,
          completedCases: updatedUser.progress?.length || 0,
          lastUpdate: new Date().toISOString()
        }, { merge: true });
      }

      setUser(prev => prev ? { ...prev, ...newData } : null as any);
    } catch (error) {
      const uid = auth.currentUser?.uid || user.email.replace(/\./g, '_');
      handleFirestoreError(error, OperationType.UPDATE, `users/${uid}`);
    }
  };

  const logAccess = async (action: string) => {
    if (!user.email) return;
    try {
      await addDoc(collection(db, 'logs'), {
        userUid: user.email.replace(/\./g, '_'),
        userName: user.name,
        userEmail: user.email,
        timestamp: new Date().toISOString(),
        action
      });
    } catch (err) {
      console.error("Failed to log access:", err);
    }
  };

  const downloadCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      showAlert("Aviso", "Não há dados para descarregar.");
      return;
    }
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).map(v => {
      const val = typeof v === 'object' ? JSON.stringify(v) : v;
      return `"${String(val).replace(/"/g, '""')}"`;
    }).join(',')).join('\n');
    const csvContent = "\uFEFF" + headers + "\n" + rows; // Add BOM for Excel
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Firebase Auth & Data Sync
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, 'users', firebaseUser.uid);
        try {
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            const userData = userSnap.data() as UserProfile;
            setUser({
              ...userData,
              uid: firebaseUser.uid // Ensure UID is present
            });
          } else {
            // Check if user exists with email-based ID (migration)
            if (firebaseUser.email) {
              const emailRef = doc(db, 'users', firebaseUser.email.replace(/\./g, '_'));
              const emailSnap = await getDoc(emailRef);
              if (emailSnap.exists()) {
                const emailData = emailSnap.data() as UserProfile;
                const migratedUser = { ...emailData, uid: firebaseUser.uid };
                await setDoc(userRef, migratedUser);
                await deleteDoc(emailRef);
                setUser(migratedUser);
                return;
              }
            }

            const newUser: UserProfile = {
              uid: firebaseUser.uid,
              name: firebaseUser.displayName || 'Utilizador',
              email: firebaseUser.email || '',
              level: 1,
              score: 0,
              progress: [],
              badges: [],
              scoreHistory: [],
              isPremium: false,
              avatar: firebaseUser.photoURL || undefined,
              lives: 5,
              lastLifeRegen: new Date().toISOString(),
              categoryScores: {},
              streak: 0,
              lastActivityDate: null,
              streakFreezeCount: 0,
              friends: [],
              friendRequests: [],
              groups: [],
              notifications: []
            };
            await setDoc(userRef, newUser);
            
            // Also create leaderboard entry
            await setDoc(doc(db, 'leaderboard', firebaseUser.uid), {
              uid: firebaseUser.uid,
              email: newUser.email,
              name: newUser.name,
              score: 0,
              level: 1,
              completedCases: 0,
              lastUpdate: new Date().toISOString()
            });

            setUser(newUser);
          }
          // Automatically redirect to Mission Center if on home/login/register
          setView(prev => {
            if (prev === 'home' || prev === 'login' || prev === 'register') {
              return 'mission_center';
            }
            return prev;
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${firebaseUser.uid}`);
        }
      } else {
        // Clear user state if not authenticated, but keep essential structure
        setUser({
          name: '',
          email: '',
          level: 1,
          score: 0,
          progress: [],
          badges: [],
          scoreHistory: [],
          isPremium: false,
          lives: 5,
          categoryScores: {},
          streak: 0,
          streakFreezeCount: 0,
          friends: [],
          friendRequests: [],
          groups: [],
          notifications: []
        });
      }
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
      showAlert("Sucesso", "Login realizado com sucesso!");
      setView('mission_center');
    } catch (error: any) {
      if (error.code === 'auth/cancelled-popup-request' || 
          error.code === 'auth/popup-closed-by-user' ||
          (error.message && error.message.includes('auth/popup-closed-by-user')) ||
          (error.message && error.message.includes('auth/cancelled-popup-request'))) {
        // Silent as user cancelled
      } else {
        console.error("Login Error:", error);
        showAlert("Erro", "Falha ao realizar login.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSaveProfile = async (updatedUser: UserProfile) => {
    try {
      if (user.uid && user.uid !== 'admin_legacy') {
        await setDoc(doc(db, 'users', user.uid), updatedUser, { merge: true });
        setUser(updatedUser);
        setShowEditProfile(false);
        showAlert("Sucesso", "Perfil atualizado com sucesso!");
      } else if (user.uid === 'admin_legacy') {
        setUser(updatedUser);
        setShowEditProfile(false);
        showAlert("Sucesso", "Perfil local atualizado (Admin).");
      }
    } catch (err) {
      console.error("Failed to update profile:", err);
      handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
      showAlert("Erro", "Não foi possível atualizar o perfil.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser({
        name: '',
        email: '',
        level: 1,
        score: 0,
        progress: [],
        badges: [],
        scoreHistory: [],
        isPremium: false,
        lives: 5,
        categoryScores: {},
        streak: 0,
        lastActivityDate: null,
        streakFreezeCount: 0,
        friends: [],
        friendRequests: [],
        notifications: []
      });
      setView('home');
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handleBuyItem = (itemId: string, cost: number) => {
    if (user.score < cost) {
      showAlert("Saldo Insuficiente", "Pontuação insuficiente para adquirir este item!");
      return;
    }

    const updatedUser = { ...user, score: user.score - cost };

    if (itemId === 'streak_freeze') {
      updatedUser.streakFreezeCount = (updatedUser.streakFreezeCount || 0) + 1;
      showAlert("Sucesso", "Congelamento de Streak adquirido!");
    } else if (itemId === 'extra_life') {
      updatedUser.lives = Math.min(5, (updatedUser.lives || 0) + 1);
      showAlert("Sucesso", "Vida Extra adquirida!");
    } else if (itemId === 'premium_pass') {
      updatedUser.isPremium = true;
      setIsCertificatePaid(true);
      showAlert("Sucesso", "Passe Premium ativado! Certificados agora são gratuitos.");
    }

    updateUser(updatedUser);
  };

  const handleSendFriendRequest = async (targetEmail: string) => {
    if (!user.email) return;
    if (targetEmail === user.email) {
      showAlert("Erro", "Não pode adicionar-se a si mesmo!");
      return;
    }
    showAlert("Sucesso", `Pedido de amizade enviado para ${targetEmail}! (Simulação)`);
  };

  const handleAcceptFriendRequest = (uid: string) => {
    const request = user.friendRequests.find(r => r.uid === uid);
    if (!request) return;

    const updatedUser = {
      ...user,
      friends: [...(user.friends || []), uid],
      friendRequests: user.friendRequests.filter(r => r.uid !== uid),
      notifications: [
        ...(user.notifications || []),
        {
          id: Math.random().toString(36).substr(2, 9),
          title: 'Novo Amigo!',
          message: `Agora é amigo de ${request.name}.`,
          type: 'success' as const,
          read: false,
          createdAt: new Date().toISOString()
        }
      ]
    };
    setUser(updatedUser);
    showAlert("Sucesso", `Agora é amigo de ${request.name}!`);
  };

  const handleRejectFriendRequest = (uid: string) => {
    const updatedUser = {
      ...user,
      friendRequests: user.friendRequests.filter(r => r.uid !== uid)
    };
    setUser(updatedUser);
  };

  useEffect(() => {
    // Check if user needs to complete profile (only for non-anonymous users)
    const isAnonymous = auth.currentUser?.isAnonymous;
    const hasCompletedProfile = user.age && user.phone && user.status;
    
    if (user.uid && user.uid !== 'admin_legacy' && !isAnonymous && !hasCompletedProfile) {
      // Only force complete_profile if they just logged in and are on home/login/register
      if (view === 'home' || view === 'login' || view === 'register') {
        setView('complete_profile');
      }
    }
  }, [user.uid, user.age, user.phone, user.status, view]);

  useEffect(() => {
    localStorage.setItem('fisiofasp_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('fisiofasp_certificate_paid', isCertificatePaid.toString());
  }, [isCertificatePaid]);

  useEffect(() => {
    localStorage.setItem('fisiofasp_pending_payments', JSON.stringify(pendingPayments));
  }, [pendingPayments]);

  const [tempName, setTempName] = useState(user.email === 'pjoaquim1705@gmail.com' ? 'Pedro Joaquim' : '');
  const [tempEmail, setTempEmail] = useState(user.email === 'pjoaquim1705@gmail.com' ? 'pjoaquim1705@gmail.com' : '');
  const [tempAge, setTempAge] = useState('');
  const [tempStatus, setTempStatus] = useState<string>(USER_STATUSES[0]);
  const [tempPhone, setTempPhone] = useState('');
  const [tempSpecialty, setTempSpecialty] = useState<Specialty>(SPECIALTIES[0]);
  const [feedback, setFeedback] = useState({ stars: 0, comment: '' });
  useEffect(() => {
    testConnection();
  }, []);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => darkMode ? 'dark' : 'light');

  const toggleDarkMode = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    setTheme(nextMode ? 'dark' : 'light');
    try {
      localStorage.setItem('fisiofasp_theme_manual_override', JSON.stringify({
        mode: nextMode ? 'dark' : 'light',
        timestamp: Date.now()
      }));
      localStorage.setItem('fisiofasp_theme', nextMode ? 'dark' : 'light');
    } catch (e) {}
  };
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [adminStats, setAdminStats] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cabinetMode, setCabinetMode] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState<'Todos' | 'Fácil' | 'Médio' | 'Difícil'>('Todos');
  const [showPearl, setShowPearl] = useState<string | null>(null);
  const [examTimer, setExamTimer] = useState<number | null>(null);
  const [isExamHardcore, setIsExamHardcore] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showCaseEditor, setShowCaseEditor] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [showGoogleDirectModal, setShowGoogleDirectModal] = useState(false);
  const [googleDirectEmail, setGoogleDirectEmail] = useState('pjoaquim1705@gmail.com');
  const [googleDirectName, setGoogleDirectName] = useState('Pedro Joaquim');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerAge, setRegisterAge] = useState('');
  const [registerStatus, setRegisterStatus] = useState<string>(USER_STATUSES[0]);
  const [registerSpecialty, setRegisterSpecialty] = useState<Specialty>(SPECIALTIES[0]);
  const [registerPhone, setRegisterPhone] = useState('');
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const [customCases, setCustomCases] = useState<ClinicalCase[]>(() => {
    const saved = localStorage.getItem('fisiofasp_custom_cases');
    return saved ? JSON.parse(saved) : [];
  });

  const allCases = [...CLINICAL_CASES, ...customCases];

  const [showAiCaseModal, setShowAiCaseModal] = useState(false);
  const [showPerformanceDashboard, setShowPerformanceDashboard] = useState(false);
  const [showRoundTable, setShowRoundTable] = useState(false);
  const [showAnatomyViewer, setShowAnatomyViewer] = useState(false);
  const [showPortfolioExport, setShowPortfolioExport] = useState(false);
  const [showTournamentArena, setShowTournamentArena] = useState(false);
  const [exportType, setExportType] = useState<'users' | 'cases' | 'ranking' | 'duels' | 'project_summary' | null>(null);
  const [anatomyTarget, setAnatomyTarget] = useState('Joelho');
  const [aiCaseTheme, setAiCaseTheme] = useState('');
  const [isGeneratingAiCase, setIsGeneratingAiCase] = useState(false);

  const handleGenerateAiCase = async () => {
    if (!aiCaseTheme || !ai) {
      if (!ai) showAlert("Configuração de IA", "Configuração de IA ausente. Verifique a chave API.");
      return;
    }
    setIsGeneratingAiCase(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Gere um caso clínico de saúde completo no formato JSON baseado no tema: "${aiCaseTheme}".
        O JSON deve seguir exatamente esta estrutura:
        {
          "title": "Título do Caso",
          "category": "Uma das categorias: Coluna Vertebral, Membros Inferiores, Membros Superiores, Neurológico, Postural, Desportivo, Geriátrica, Pediátrica, Cardiorrespiratória, Traumato-Ortopédica, Pós-Cirúrgica, Ocupacional",
          "difficulty": "Fácil, Médio ou Difícil",
          "estimatedTime": 15,
          "patient": {
            "name": "Nome do Paciente",
            "age": 30,
            "profession": "Profissão",
            "image": "https://picsum.photos/seed/patient/400/400",
            "complaint": "Queixa principal",
            "history": "História clínica detalhada",
            "symptoms": ["Sintoma 1", "Sintoma 2"],
            "evolutionTime": "Tempo de evolução",
            "functionalLimitations": "Limitações funcionais"
          },
          "stages": {
            "evaluation": { "title": "Avaliação", "description": "Descrição", "questions": [{ "id": "A", "text": "Pergunta", "options": [{"id": "A", "text": "Opção A"}, {"id": "B", "text": "Opção B"}, {"id": "C", "text": "Opção C"}, {"id": "D", "text": "Opção D"}], "correctOption": "A", "explanation": "Explicação", "clinicalPearl": "Dica clínica" }] },
            "diagnosis": { "title": "Diagnóstico", "description": "Descrição", "questions": [...] },
            "treatment": { "title": "Tratamento", "description": "Descrição", "questions": [...] },
            "exercises": { "title": "Exercícios", "description": "Descrição", "questions": [...] },
            "result": { "title": "Resultado", "description": "Descrição", "image": "https://picsum.photos/seed/result/800/600" }
          }
        }
        Certifique-se de que cada estágio (evaluation, diagnosis, treatment, exercises) tenha pelo menos 1 pergunta.`,
        config: { responseMimeType: "application/json" }
      });

      const generatedCase = JSON.parse(response.text);
      const newCase: ClinicalCase = {
        ...generatedCase,
        id: `ai_${Date.now()}`
      };

      // Save to Firestore
      const caseRef = doc(collection(db, 'cases'));
      await setDoc(caseRef, { ...newCase, id: caseRef.id });
      
      setCustomCases(prev => [...prev, { ...newCase, id: caseRef.id }]);
      setShowAiCaseModal(false);
      setAiCaseTheme('');
      showAlert("Sucesso", "Caso gerado com sucesso pela IA!");
    } catch (error) {
      console.error("AI Case Gen Error:", error);
      showAlert("Erro", "Erro ao gerar caso com IA. Verifique o console.");
    } finally {
      setIsGeneratingAiCase(false);
    }
  };

  const [socket, setSocket] = useState<Socket | null>(null);
  const [duelStatus, setDuelStatus] = useState<'idle' | 'searching' | 'playing' | 'finished'>('idle');
  const [activeDuel, setActiveDuel] = useState<any>(null);
  const [opponentScore, setOpponentScore] = useState(0);
  const [opponentFinished, setOpponentFinished] = useState(false);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on("duel_matched", (duelData) => {
      // Pick random questions for the duel
      const duelQuestions: any[] = [];
      const validCases = CLINICAL_CASES.filter(c => c && c.stages && Array.isArray(c.stages) && c.stages.length > 0);
      
      for (let i = 0; i < 5; i++) {
        if (validCases.length === 0) break;
        const randomCase = validCases[Math.floor(Math.random() * validCases.length)];
        const stages = Array.isArray(randomCase.stages) ? randomCase.stages : Object.values(randomCase.stages || {});
        const stagesWithQuestions = stages.filter((s: any) => s && s.questions && Array.isArray(s.questions) && s.questions.length > 0);
        if (stagesWithQuestions.length > 0) {
          const randomStage = stagesWithQuestions[Math.floor(Math.random() * stagesWithQuestions.length)] as any;
          const randomQuestion = randomStage.questions[Math.floor(Math.random() * randomStage.questions.length)];
          if (randomQuestion) {
            duelQuestions.push({ ...randomQuestion, caseTitle: randomCase.title });
          }
        }
      }
      
      setActiveDuel({ ...duelData, questions: duelQuestions });
      setDuelStatus('playing');
      setOpponentScore(0);
      setOpponentFinished(false);
    });

    newSocket.on("opponent_score_update", ({ score }) => {
      setOpponentScore(score);
    });

    newSocket.on("opponent_finished", () => {
      setOpponentFinished(true);
    });

    newSocket.on("opponent_disconnected", () => {
      showAlert("Duelo Encerrado", "O oponente desconectou-se.");
      setDuelStatus('idle');
      setActiveDuel(null);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleJoinDuel = () => {
    if (!user || !socket) return;
    setDuelStatus('searching');
    socket.emit("join_duel_queue", { name: user.name, level: user.level });
  };

  const handleSaveNewCase = (newCase: ClinicalCase) => {
    const updatedCustom = [...customCases, newCase];
    setCustomCases(updatedCustom);
    localStorage.setItem('fisiofasp_custom_cases', JSON.stringify(updatedCustom));
    setShowCaseEditor(false);
  };

  useEffect(() => {
    let timer: any;
    if (examTimer !== null && examTimer > 0) {
      timer = setInterval(() => {
        setExamTimer(prev => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (examTimer === 0) {
      // Auto-submit or handle timeout
      showAlert("Tempo Esgotado", "O tempo para este caso terminou!");
      // For now, just reset or move to next
    }
    return () => clearInterval(timer);
  }, [examTimer]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsSnap = await getDoc(doc(db, 'settings', 'certificate'));
        if (settingsSnap.exists()) {
          setCertificateSettings(settingsSnap.data() as any);
        }
      } catch (err) {
        console.error("Error fetching certificate settings:", err);
      }
    };
    fetchSettings();
  }, []);

  const isAdmin = (user?.email === 'pjoaquim1705@gmail.com' || user?.role === 'admin') && !!user?.uid;

  useEffect(() => {
    if (user.uid) {
      const userRef = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfile;
          setUser(prev => {
            // Only update if data is different to avoid unnecessary re-renders
            if (JSON.stringify(prev) !== JSON.stringify({ ...prev, ...data })) {
              return { ...prev, ...data };
            }
            return prev;
          });
        }
      }, (error) => {
        // Silent error for permissions during auth transition
        if (error.code !== 'permission-denied') {
          console.error("User profile sync error:", error);
        }
      });
      return () => unsubscribe();
    }
  }, [user.uid]);

  useEffect(() => {
    if (isAdmin && user.uid) {
      const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
        const usersData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as unknown as UserProfile));
        setAllUsers(usersData);
      }, (error) => {
        // Only log if it's not a permission error during auth transition
        if (error.code !== 'permission-denied') {
          console.error("Failed to fetch all users:", error);
          handleFirestoreError(error, OperationType.LIST, 'users');
        }
      });
      return () => unsubscribe();
    }
  }, [isAdmin, user.uid]);

  const handleLoseLife = () => {
    if (user.lives > 0) {
      updateUser({ lives: user.lives - 1 });
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(darkMode);

  const handlePasswordReset = async () => {
    if (!loginEmail) {
      showAlert("Recuperação de Senha", "Por favor, insira o seu email primeiro.");
      return;
    }
    setIsResettingPassword(true);
    try {
      const { sendPasswordResetEmail } = await import('firebase/auth');
      await sendPasswordResetEmail(auth, loginEmail);
      showAlert("Sucesso", "Email de recuperação enviado! Verifique a sua caixa de entrada (e a pasta de Spam).");
    } catch (error: any) {
      console.error("Reset Password Error:", error);
      showAlert("Erro", "Não foi possível enviar o email de recuperação. Verifique se o email está correto.");
    } finally {
      setIsResettingPassword(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoggingIn) return;
    setLoginErrors({});
    setIsLoggingIn(true);

    // Special Admin Login (Pedro)
    if (loginEmail === 'pjoaquim1705@gmail.com' && loginPassword === 'Fisio@2026') {
      try {
        await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        showAlert("Sucesso", "Bem-vindo, Administrador! Acesso total concedido.");
        setView('profile');
        logAccess("Login Admin");
        return;
      } catch (err: any) {
        console.warn("Admin auth failed, checking if account needs creation:", err.code);
        if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
          try {
            // Auto-create admin if it doesn't exist with these special credentials
            const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
            const firebaseUser = userCredential.user;
            await updateProfile(firebaseUser, { displayName: "Admin Pedro" });
            
            const adminUser: UserProfile = {
              uid: firebaseUser.uid,
              name: "Admin Pedro",
              email: loginEmail,
              level: 10,
              score: 1000,
              progress: [],
              badges: [],
              scoreHistory: [],
              isPremium: true,
              lives: 99,
              lastLifeRegen: new Date().toISOString(),
              categoryScores: {},
              streak: 0,
              lastActivityDate: null,
              streakFreezeCount: 10,
              friends: [],
              friendRequests: [],
              notifications: [],
              role: 'admin'
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), adminUser);
            setUser(adminUser);
            setView('profile');
            showAlert("Sucesso", "Conta de Administrador criada e autenticada!");
            return;
          } catch (createErr) {
            console.error("Failed to auto-create admin:", createErr);
          }
        }
      }
    }

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      showAlert("Sucesso", "Login realizado com sucesso!");
      setView('profile');
      logAccess("Login Email/Password");
    } catch (error: any) {
      console.error("Login Error:", error);
      let message = "Falha ao realizar login. Verifique as suas credenciais.";
      const newErrors: Record<string, string> = {};

      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
        newErrors.email = "Email não encontrado ou formato inválido.";
        message = "O email inserido não está associado a nenhuma conta ou o formato é inválido.";
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        newErrors.password = "Senha incorreta.";
        message = "A senha introduzida está incorreta. Por favor, tente novamente ou recupere a sua senha.";
      } else if (error.code === 'auth/too-many-requests') {
        message = "Acesso bloqueado temporariamente por excesso de tentativas. Tente novamente em alguns minutos.";
      } else if (error.code === 'auth/user-disabled') {
        message = "Esta conta foi desativada pelo administrador.";
      } else if (error.code === 'auth/network-request-failed') {
        message = "Erro de rede. Verifique a sua ligação à internet.";
      }
      
      setLoginErrors(newErrors);
      showAlert("Erro de Acesso", message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleDirectGoogleConnect = async (customEmail?: string, customName?: string) => {
    setIsLoggingIn(true);
    const emailToUse = (customEmail || googleDirectEmail || 'pjoaquim1705@gmail.com').trim().toLowerCase();
    const nameToUse = (customName || googleDirectName || (emailToUse === 'pjoaquim1705@gmail.com' ? 'Pedro Joaquim' : 'Profissional Google')).trim();
    const mockUid = 'google_' + btoa(emailToUse).replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);

    try {
      // 1. Try to check if user document exists in Firestore
      let existingUser: UserProfile | null = null;
      try {
        const q = query(collection(db, 'users'), where('email', '==', emailToUse));
        const qSnap = await getDocs(q);
        if (!qSnap.empty) {
          existingUser = qSnap.docs[0].data() as UserProfile;
        } else {
          const directDoc = await getDoc(doc(db, 'users', mockUid));
          if (directDoc.exists()) {
            existingUser = directDoc.data() as UserProfile;
          }
        }
      } catch (err) {
        console.warn("Could not query firestore for google user:", err);
      }

      if (existingUser) {
        if (emailToUse === 'pjoaquim1705@gmail.com') {
          existingUser.role = 'admin';
        }
        setUser(existingUser);
        setView('hub');
        showAlert("Acesso Concluído", `Bem-vindo de volta, ${existingUser.name}!`);
      } else {
        const newUser: UserProfile = {
          uid: mockUid,
          name: nameToUse,
          email: emailToUse,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nameToUse}`,
          level: 1,
          score: 0,
          progress: [],
          badges: [],
          scoreHistory: [],
          isPremium: false,
          lives: 5,
          lastLifeRegen: new Date().toISOString(),
          categoryScores: {},
          streak: 0,
          lastActivityDate: null,
          streakFreezeCount: 0,
          friends: [],
          friendRequests: [],
          notifications: [],
          role: emailToUse === 'pjoaquim1705@gmail.com' ? 'admin' : 'user',
          status: USER_STATUSES[0],
          specialty: SPECIALTIES[0]
        };

        try {
          await setDoc(doc(db, 'users', mockUid), newUser, { merge: true });
        } catch (e) {
          console.warn("Setting local state for new google user:", e);
        }

        setUser(newUser);
        setView('hub');
        showAlert("Sucesso", `Conta Google vinculada com sucesso! Bem-vindo ao RECOVERY HEALTH.`);
      }
      setShowGoogleDirectModal(false);
    } catch (error: any) {
      console.error("Direct Google login error:", error);
      showAlert("Erro", "Não foi possível conectar a conta Google. Tente novamente.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      
      // Check if user exists in Firestore
      let userDoc;
      try {
        userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      } catch (err) {
        console.warn("Error getting user doc:", err);
      }
      
      if (userDoc && userDoc.exists()) {
        const userData = userDoc.data() as UserProfile;
        if (firebaseUser.email === 'pjoaquim1705@gmail.com') {
          userData.role = 'admin';
        }
        setUser(userData);
        setView('hub');
        showAlert("Sucesso", `Bem-vindo, ${userData.name}!`);
      } else {
        // New user from Google
        const newUser: UserProfile = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || 'Utilizador Google',
          email: firebaseUser.email || '',
          avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.displayName || 'user'}`,
          level: 1,
          score: 0,
          progress: [],
          badges: [],
          scoreHistory: [],
          isPremium: false,
          lives: 5,
          lastLifeRegen: new Date().toISOString(),
          categoryScores: {},
          streak: 0,
          lastActivityDate: null,
          streakFreezeCount: 0,
          friends: [],
          friendRequests: [],
          notifications: [],
          role: firebaseUser.email === 'pjoaquim1705@gmail.com' ? 'admin' : 'user',
          status: USER_STATUSES[0],
          specialty: SPECIALTIES[0]
        };
        
        try {
          await setDoc(doc(db, 'users', firebaseUser.uid), newUser, { merge: true });
        } catch (err) {
          console.warn("Error saving new user doc:", err);
        }
        setUser(newUser);
        setView('hub');
        showAlert("Sucesso", "Conta criada com sucesso via Google! Bem-vindo ao RECOVERY HEALTH.");
      }
    } catch (error: any) {
      if (error.code === 'auth/cancelled-popup-request' || 
          error.code === 'auth/popup-closed-by-user' ||
          (error.message && error.message.includes('auth/popup-closed-by-user')) ||
          (error.message && error.message.includes('auth/cancelled-popup-request'))) {
        // Silent as user cancelled
      } else {
        console.error("Google Login Error:", error);
        setShowGoogleDirectModal(true);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoggingIn) return;
    setRegisterErrors({});
    setIsLoggingIn(true);

    const newErrors: Record<string, string> = {};
    if (registerName.length < 3) {
      newErrors.name = "O nome deve ter pelo menos 3 caracteres.";
    }
    if (registerPassword.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres.";
    }
    if (!registerAge || parseInt(registerAge) < 14) {
      newErrors.age = "Idade mínima de 14 anos.";
    }
    if (registerPhone.trim().length < 9) {
      newErrors.phone = "Insira um contacto válido.";
    }

    if (Object.keys(newErrors).length > 0) {
      setRegisterErrors(newErrors);
      showAlert("Erro de Registo", "Por favor, corrija os campos destacados.");
      setIsLoggingIn(false);
      return;
    }

    try {
      let firebaseUser;
      
      try {
        // 1. Try to create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        firebaseUser = userCredential.user;
      } catch (authError: any) {
        console.error("Registration Auth Error:", authError);
        const authErrors: Record<string, string> = {};
        if (authError.code === 'auth/email-already-in-use') {
          authErrors.email = "Este email já está em uso.";
          setRegisterErrors(authErrors);
          throw authError;
        } else if (authError.code === 'auth/invalid-email') {
          authErrors.email = "Este endereço de email não é válido.";
          setRegisterErrors(authErrors);
          throw authError;
        } else if (authError.code === 'auth/weak-password') {
          authErrors.password = "A senha deve ter pelo menos 6 caracteres e incluir letras e números.";
          setRegisterErrors(authErrors);
          throw authError;
        } else if (authError.code === 'auth/network-request-failed') {
          throw new Error("Erro de rede ao tentar criar conta.");
        } else {
          throw authError;
        }
      }

      if (!firebaseUser) throw new Error("Não foi possível autenticar o utilizador após o registo.");

      // 3. Update Auth profile with name
      await updateProfile(firebaseUser, { displayName: registerName });

      // 4. Create user profile in Firestore
      const newUser: UserProfile = {
        uid: firebaseUser.uid,
        name: registerName,
        email: registerEmail,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${registerName}`,
        age: registerAge ? parseInt(registerAge) : undefined,
        status: registerStatus,
        specialty: registerSpecialty,
        phone: registerPhone,
        level: 1,
        score: 0,
        progress: [],
        badges: [],
        scoreHistory: [],
        isPremium: false,
        lives: 5,
        lastLifeRegen: new Date().toISOString(),
        categoryScores: {},
        streak: 0,
        lastActivityDate: null,
        streakFreezeCount: 0,
        friends: [],
        friendRequests: [],
        notifications: [],
        role: registerEmail === 'pjoaquim1705@gmail.com' ? 'admin' : 'user'
      };

      // Use setDoc which is idempotent
      await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
      
      // 5. Create leaderboard entry
      await setDoc(doc(db, 'leaderboard', firebaseUser.uid), {
        uid: firebaseUser.uid,
        email: registerEmail,
        name: registerName,
        score: 0,
        level: 1,
        completedCases: 0,
        lastUpdate: new Date().toISOString()
      });

      setUser(newUser);
      setView('profile');
      showAlert("Sucesso", "Conta preparada com sucesso! Bem-vindo ao FisioFASP.");
      logAccess("Registo/Recuperação Email");
    } catch (error: any) {
      console.error("Registration Error:", error);
      let message = "Não foi possível criar a sua conta neste momento. Por favor, tente novamente mais tarde.";
      
      if (error.code === 'auth/email-already-in-use') {
        message = "Este email já está associado a uma conta. Tente fazer login ou recupere a sua senha.";
      } else if (error.code === 'auth/weak-password') {
        message = "A sua senha é demasiado fraca. Use pelo menos 6 caracteres intercalando letras e números.";
      } else if (error.code === 'auth/invalid-email') {
        message = "O email inserido não é válido. Verifique se existe algum erro de digitação.";
      } else if (error.code === 'auth/operation-not-allowed') {
        message = "O registo por email está temporariamente desativado. Contacte o suporte.";
      } else if (error.message && error.message.includes("network")) {
        message = "Verifique a sua ligação à internet e tente novamente.";
      }
      
      showAlert("Erro no Registo", message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  useEffect(() => {
    if (isAuthReady && user.uid) {
      const q = query(collection(db, 'leaderboard'), orderBy('score', 'desc'), limit(100));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const entries = snapshot.docs.map(doc => doc.data() as LeaderboardEntry);
        setLeaderboard(entries);
      }, (error) => {
        if (error.code !== 'permission-denied') {
          handleFirestoreError(error, OperationType.GET, 'leaderboard');
        }
      });
      return () => unsubscribe();
    }
  }, [user.uid, isAuthReady]);

  useEffect(() => {
    if (isAuthReady && isAdmin && user.uid) {
      const q = query(collection(db, 'payments'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const entries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
        setPendingPayments(entries);
      }, (error) => {
        if (error.code !== 'permission-denied') {
          handleFirestoreError(error, OperationType.GET, 'payments');
        }
      });

      const logsQ = query(collection(db, 'logs'), orderBy('timestamp', 'desc'), limit(100));
      const unsubscribeLogs = onSnapshot(logsQ, (snapshot) => {
        const entries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAccessLogs(entries);
      }, (error) => {
        if (error.code !== 'permission-denied') {
          handleFirestoreError(error, OperationType.GET, 'logs');
        }
      });

      const duelsQ = query(collection(db, 'duels'), orderBy('timestamp', 'desc'), limit(50));
      const unsubscribeDuels = onSnapshot(duelsQ, (snapshot) => {
        const entries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDuelRecords(entries);
      }, (error) => {
        if (error.code !== 'permission-denied') {
          handleFirestoreError(error, OperationType.GET, 'duels');
        }
      });

      return () => {
        unsubscribe();
        unsubscribeLogs();
        unsubscribeDuels();
      };
    }
  }, [isAdmin, user.uid, isAuthReady]);

  useEffect(() => {
    if (isAuthReady && user.email && user.email !== 'guest@fisiofasp.com') {
      const q = query(collection(db, 'payments'), where('userEmail', '==', user.email), where('status', '==', 'approved'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          setIsCertificatePaid(true);
        }
      }, (error) => {
        if (error.code !== 'permission-denied') {
          handleFirestoreError(error, OperationType.GET, 'payments');
        }
      });
      return () => unsubscribe();
    }
  }, [user.email, isAuthReady]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('fisiofasp_theme', theme);
  }, [theme]);

  useEffect(() => {
    if (isAuthReady && user.uid && !isAdmin && !user.specialty && user.email !== '') {
      // Force specialty selection if not set (for old users or Google sign-ups)
      // Admins are exempt
      setView('complete_profile');
    }
  }, [user.uid, user.specialty, isAuthReady, isAdmin]);

  const hasNotifiedAccess = React.useRef(false);

  // Persistence
  useEffect(() => {
    const fetchWithRetry = async (url: string, retries = 3, delay = 1000): Promise<any> => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
      } catch (err) {
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchWithRetry(url, retries - 1, delay * 1.5);
        }
        throw err;
      }
    };

    // Health check with retry
    fetchWithRetry('/api/health')
      .then(data => console.log("API Health Check:", data))
      .catch(err => console.warn("API Health Check Failed after retries:", err));

    // Fetch global settings from Firestore directly (client-side)
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, "settings", "global");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.coverImageGlobal) setCoverImageGlobal(data.coverImageGlobal);
          if (data.isLocked) setIsLocked(true);
          console.log("Settings fetched client-side");
        } else {
          throw new Error("Not found");
        }
      } catch (err) {
        // Fallback to server if client-side fails
        fetchWithRetry('/api/settings')
          .then(data => {
            if (data.coverImageGlobal) setCoverImageGlobal(data.coverImageGlobal);
            if (data.isLocked) setIsLocked(true);
          })
          .catch(e => {
            console.error("Failed to fetch settings from server after retries:", e);
            // Fallback to default if both fail
            setCoverImageGlobal("https://lh3.googleusercontent.com/d/1n_zM13DJYSp6WpluuacxP-DPUjeeYY4C");
          });
      }
    };
    fetchSettings();

    const savedUser = localStorage.getItem('fisiofasp_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to parse saved user:", e);
      }
    }
    
    // Notify "Novo acesso ao RECOVERY HEALTH" on first load
    if (!hasNotifiedAccess.current) {
      console.log('Novo acesso ao RECOVERY HEALTH');
      hasNotifiedAccess.current = true;
    }
  }, []);

  useEffect(() => {
    if (user.name) {
      localStorage.setItem('recovery_health_user', JSON.stringify(user));
    }
  }, [user]);

  const handleStartMission = () => {
    let nameToUse = user.name;
    
    if (!nameToUse) {
      if (!tempName || tempName.trim().length < 3) {
        showAlert("Erro", "Por favor, insira um nome válido com pelo menos 3 caracteres.");
        return;
      }
      nameToUse = tempName.trim();
    }
    
    const isNew = !user.name;
    const newUser = { 
      ...user, 
      name: nameToUse,
      email: tempEmail || user.email,
      age: tempAge ? Number(tempAge) : user.age,
      status: tempStatus || user.status,
      phone: tempPhone || user.phone
    };
    setUser(newUser);
    
    // Notification logic
    const message = isNew 
      ? `Novo utilizador registado no RECOVERY HEALTH: ${nameToUse}`
      : `Novo acesso ao RECOVERY HEALTH: ${nameToUse}`;
    
    sendWhatsAppNotification(message);
    setView('home');
  };

  const handleUpdateCoverImage = () => {
    if (isLocked) {
      showAlert("Ação Bloqueada", "A imagem de capa é permanente e não pode ser alterada.");
      return;
    }
    showPrompt(
      "Alterar Capa", 
      "Insira a URL da nova imagem de capa (esta ação será permanente):", 
      (newUrl) => {
        if (newUrl && newUrl !== coverImageGlobal) {
          fetch('/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ coverImageGlobal: newUrl, isAdmin, email: user.email })
          })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              setCoverImageGlobal(newUrl);
              setIsLocked(true);
            }
          })
          .catch(err => console.error("Failed to update cover image:", err));
        }
      },
      coverImageGlobal
    );
  };

  const handleResetProgress = () => {
    showConfirm('Resetar Progresso', 'Tem a certeza que deseja resetar todo o seu progresso?', () => {
      const resetUser = {
        ...user,
        level: 1,
        score: 0,
        progress: []
      };
      setUser(resetUser);
      localStorage.setItem('fisiofasp_user', JSON.stringify(resetUser));
    });
  };

  const categories: Category[] = [
    'Coluna Vertebral', 'Membros Inferiores', 'Membros Superiores', 
    'Neurológico', 'Postural', 'Desportivo', 'Geriátrica', 
    'Pediátrica', 'Cardiorrespiratória', 'Traumato-Ortopédica', 
    'Pós-Cirúrgica', 'Ocupacional'
  ];

  const protectedSetView = (newView: View) => {
    const restrictedViews: View[] = ['categories', 'social', 'groups', 'profile', 'dashboard', 'leaderboard', 'duels', 'case', 'admin', 'hub'];
    
    // If trying to access restricted view without login
    if (restrictedViews.includes(newView) && !user.email) {
      showAlert("Acesso Restrito", "Por favor, entre na sua conta ou registe-se para aceder a esta funcionalidade.");
      setView('home');
      return;
    }

    // If logged in and trying to access home, redirect to profile
    if (newView === 'home' && user.email) {
      setView('profile');
      return;
    }

    if (['admin', 'certificate_editor', 'case_editor', 'multimedia_editor'].includes(newView) && !isAdmin) {
      showAlert("Acesso Negado", "Esta área é restrita a administradores.");
      return;
    }

    setView(newView);
  };

  const handleStartCase = (c: ClinicalCase) => {
    if (!user.email) {
      showAlert("Acesso Restrito", "Por favor, entre na sua conta ou registe-se para resolver casos.");
      setView('home');
      return;
    }
    setMode('desafio');
    setSelectedCase(c);
    setView('case');
  };

  const handleSendFeedback = () => {
    const message = `Feedback do utilizador:
Nome: ${user?.name}
Avaliação: ${feedback.stars} estrelas
Comentário: ${feedback.comment}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/933108270?text=${encoded}`, '_blank');
  };

  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-clinical-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="text-clinical-muted font-bold animate-pulse">Carregando RECOVERY HEALTH...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-clinical-bg">
      {/* Global Modal */}
      <GlobalModal config={modalConfig} onClose={closeModal} />

      {/* Header */}
      {true && (
        <header className="bg-white dark:bg-gray-900 border-b border-clinical-border dark:border-gray-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-1.5 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <button onClick={() => protectedSetView(user.email ? 'profile' : 'home')} className="hover:opacity-80 transition-opacity shrink-0">
                <Logo />
              </button>

              <div className="h-5 w-px bg-gray-200 dark:bg-gray-700 mx-0.5 hidden sm:block" />

              {/* Toolbar em Miniatura: Voz, Mentor IA e Modo Escuro */}
              <div 
                id="miniature-top-left-dock"
                className="flex items-center gap-0.5 sm:gap-1 bg-gray-100/90 dark:bg-gray-800/90 p-1 rounded-xl border border-gray-200/80 dark:border-gray-700/80 shadow-xs backdrop-blur-xs shrink-0"
                title="Ações Rápidas: Voz, Mentor IA e Modo Escuro"
              >
                {/* 1. Navegação de Voz */}
                <button
                  id="btn-mini-voice"
                  onClick={() => {
                    if ((window as any).toggleVoiceNavigator) {
                      (window as any).toggleVoiceNavigator();
                    }
                  }}
                  className={`relative p-1.5 rounded-lg transition-all flex items-center justify-center ${
                    isVoiceListening
                      ? 'bg-red-500 text-white shadow-xs animate-pulse'
                      : 'text-gray-600 dark:text-gray-300 hover:text-clinical-blue dark:hover:text-cyan-400 hover:bg-white dark:hover:bg-gray-700'
                  }`}
                  title={isVoiceListening ? "Parar Navegação por Voz" : "Navegação por Voz"}
                  aria-label="Navegação por Voz"
                >
                  {isVoiceListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isVoiceListening && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-400 rounded-full animate-ping" />
                  )}
                </button>

                {/* 2. Mentor Clínico IA */}
                <button
                  id="btn-mini-mentor"
                  onClick={() => setIsAIAssistantOpen(prev => !prev)}
                  className={`relative p-1.5 rounded-lg transition-all flex items-center justify-center group ${
                    isAIAssistantOpen
                      ? 'bg-clinical-blue text-white shadow-xs'
                      : 'text-gray-600 dark:text-gray-300 hover:text-clinical-blue dark:hover:text-cyan-400 hover:bg-white dark:hover:bg-gray-700'
                  }`}
                  title={isAIAssistantOpen ? "Fechar Mentor Clínico IA" : "Mentor Clínico IA"}
                  aria-label="Mentor Clínico IA"
                >
                  <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>

                {/* 3. Modo Escuro */}
                <button
                  id="btn-mini-darkmode"
                  onClick={toggleDarkMode}
                  className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-white dark:hover:bg-gray-700 transition-all flex items-center justify-center"
                  title={darkMode ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
                  aria-label={darkMode ? "Modo Claro" : "Modo Escuro"}
                >
                  {darkMode ? (
                    <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
                  ) : (
                    <Moon className="w-4 h-4 text-clinical-blue hover:-rotate-12 transition-transform" />
                  )}
                </button>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1.5">
              {!user.email && (
                <button onClick={() => protectedSetView('home')} className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all ${view === 'home' ? 'bg-clinical-blue/10 text-clinical-blue' : 'bg-gray-100 dark:bg-gray-800 text-clinical-muted hover:bg-gray-200 dark:hover:bg-gray-700'}`}>Início</button>
              )}
              <button onClick={() => protectedSetView('categories')} className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all ${view === 'categories' ? 'bg-clinical-blue/10 text-clinical-blue' : 'bg-gray-100 dark:bg-gray-800 text-clinical-muted hover:bg-gray-200 dark:hover:bg-gray-700'}`}>Casos</button>
              <button onClick={() => protectedSetView('library')} className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all ${view === 'library' ? 'bg-clinical-blue/10 text-clinical-blue' : 'bg-gray-100 dark:bg-gray-800 text-clinical-muted hover:bg-gray-200 dark:hover:bg-gray-700'}`}>Biblioteca</button>
              <button onClick={() => protectedSetView('social')} className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all ${view === 'social' ? 'bg-clinical-blue/10 text-clinical-blue' : 'bg-gray-100 dark:bg-gray-800 text-clinical-muted hover:bg-gray-200 dark:hover:bg-gray-700'}`}>Comunidade</button>
              <button onClick={() => protectedSetView('groups')} className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all ${view === 'groups' ? 'bg-clinical-blue/10 text-clinical-blue' : 'bg-gray-100 dark:bg-gray-800 text-clinical-muted hover:bg-gray-200 dark:hover:bg-gray-700'}`}>Grupos</button>
              <button onClick={() => protectedSetView('profile')} className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all ${view === 'profile' ? 'bg-clinical-blue/10 text-clinical-blue' : 'bg-gray-100 dark:bg-gray-800 text-clinical-muted hover:bg-gray-200 dark:hover:bg-gray-700'}`}>Perfil</button>
              {isAdmin && (
                <button onClick={() => protectedSetView('admin')} className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all ${view === 'admin' ? 'bg-red-500/10 text-red-500' : 'bg-gray-100 dark:bg-gray-800 text-clinical-muted hover:bg-gray-200 dark:hover:bg-gray-700'}`}>Admin</button>
              )}
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Permanent App Install Button */}
              <button
                onClick={() => setShowInstallModal(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 hover:from-teal-500/20 hover:to-emerald-500/20 border border-teal-500/30 text-teal-600 dark:text-teal-400 rounded-xl text-xs font-black transition-all shadow-xs shrink-0"
                title="Instalar como App Permanente"
              >
                <Download className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span className="hidden sm:inline">Instalar</span>
              </button>

              {user.email && (
                <div className="text-right hidden xl:block mr-1">
                  <p className="text-[10px] font-black text-clinical-blue uppercase tracking-widest leading-none">Pontos</p>
                  <button 
                    onClick={() => protectedSetView('leaderboard')}
                    className="text-xs font-display font-black dark:text-white hover:text-clinical-blue transition-colors"
                  >
                    {user.score}
                  </button>
                </div>
              )}

              {user.email ? (
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => protectedSetView('profile')} 
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-clinical-blue/10 flex items-center justify-center text-clinical-blue overflow-hidden border-2 border-transparent hover:border-clinical-blue transition-all shrink-0"
                    title="Ver Perfil"
                  >
                    {user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : <User className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-500 rounded-xl font-bold text-xs hover:bg-red-100 transition-all shrink-0"
                    title="Terminar Sessão"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sair
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={handleGoogleLogin}
                    className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 border border-clinical-border dark:border-gray-700 text-clinical-dark dark:text-white rounded-xl font-bold text-xs hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shrink-0"
                  >
                    <img src="https://www.google.com/favicon.ico" className="w-3.5 h-3.5" alt="Google" referrerPolicy="no-referrer" />
                    Google
                  </button>
                  <button 
                    onClick={() => setView('login')}
                    className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-clinical-blue text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-blue-600 transition-all shrink-0"
                  >
                    <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Entrar
                  </button>
                </div>
              )}

              {/* Mobile Hamburger Menu Button */}
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
                className="lg:hidden p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
                aria-label="Abrir Menu de Navegação"
                title="Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 text-red-500" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer Navigation Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-4 py-4 space-y-2 shadow-xl"
              >
                <div className="grid grid-cols-2 gap-2 text-sm font-bold">
                  {!user.email && (
                    <button
                      onClick={() => { protectedSetView('home'); setIsMobileMenuOpen(false); }}
                      className={`p-2.5 rounded-xl text-left transition-all ${view === 'home' ? 'bg-clinical-blue text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}
                    >
                      Início
                    </button>
                  )}
                  <button
                    onClick={() => { protectedSetView('categories'); setIsMobileMenuOpen(false); }}
                    className={`p-2.5 rounded-xl text-left transition-all ${view === 'categories' ? 'bg-clinical-blue text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}
                  >
                    Casos Clínicos
                  </button>
                  <button
                    onClick={() => { protectedSetView('library'); setIsMobileMenuOpen(false); }}
                    className={`p-2.5 rounded-xl text-left transition-all ${view === 'library' ? 'bg-clinical-blue text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}
                  >
                    Biblioteca
                  </button>
                  <button
                    onClick={() => { protectedSetView('social'); setIsMobileMenuOpen(false); }}
                    className={`p-2.5 rounded-xl text-left transition-all ${view === 'social' ? 'bg-clinical-blue text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}
                  >
                    Comunidade
                  </button>
                  <button
                    onClick={() => { protectedSetView('groups'); setIsMobileMenuOpen(false); }}
                    className={`p-2.5 rounded-xl text-left transition-all ${view === 'groups' ? 'bg-clinical-blue text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}
                  >
                    Grupos
                  </button>
                  <button
                    onClick={() => { protectedSetView('profile'); setIsMobileMenuOpen(false); }}
                    className={`p-2.5 rounded-xl text-left transition-all ${view === 'profile' ? 'bg-clinical-blue text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}
                  >
                    Meu Perfil
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => { protectedSetView('admin'); setIsMobileMenuOpen(false); }}
                      className={`col-span-2 p-2.5 rounded-xl text-left transition-all ${view === 'admin' ? 'bg-red-500 text-white' : 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50'}`}
                    >
                      Painel de Administrador
                    </button>
                  )}
                </div>

                {user.email && (
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate max-w-[200px]">
                      {user.email}
                    </span>
                    <button
                      onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                      className="px-3 py-1.5 bg-red-50 text-red-500 dark:bg-red-950/40 rounded-xl text-xs font-bold flex items-center gap-1"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sair
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      )}

      <main className={`flex-grow ${view === 'home' ? '' : 'max-w-7xl mx-auto w-full px-3 sm:px-6 py-4 sm:py-8'}`}>
        <AnimatePresence mode="wait">
          {view === 'login' && (
            <motion.div 
              key="login"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-2xl space-y-8"
            >
              <div className="text-center space-y-2">
                <Logo />
                <h2 className="text-2xl font-bold dark:text-white pt-4">Bem-vindo de volta</h2>
                <p className="text-clinical-muted">Aceda à sua conta para continuar o treino.</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold dark:text-white ml-1">Email</label>
                  <input 
                    type="email" 
                    required
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      if (loginErrors.email) setLoginErrors(prev => {
                        const next = { ...prev };
                        delete next.email;
                        return next;
                      });
                    }}
                    className={`w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border ${loginErrors.email ? 'border-red-500' : 'border-clinical-border dark:border-gray-700'} focus:ring-2 focus:ring-clinical-blue outline-none transition-all dark:text-white`}
                    placeholder="exemplo@email.com"
                  />
                  {loginErrors.email && <p className="text-xs text-red-500 font-bold ml-1">{loginErrors.email}</p>}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-sm font-bold dark:text-white">Senha</label>
                    <button 
                      type="button"
                      onClick={handlePasswordReset}
                      disabled={isResettingPassword}
                      className="text-xs text-clinical-blue hover:underline font-bold"
                    >
                      {isResettingPassword ? 'Enviando...' : 'Esqueceu-se da senha?'}
                    </button>
                  </div>
                  <input 
                    type="password" 
                    required
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      if (loginErrors.password) setLoginErrors(prev => {
                        const next = { ...prev };
                        delete next.password;
                        return next;
                      });
                    }}
                    className={`w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border ${loginErrors.password ? 'border-red-500' : 'border-clinical-border dark:border-gray-700'} focus:ring-2 focus:ring-clinical-blue outline-none transition-all dark:text-white`}
                    placeholder="••••••••"
                  />
                  {loginErrors.password && <p className="text-xs text-red-500 font-bold ml-1">{loginErrors.password}</p>}
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-clinical-blue text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-clinical-blue/20"
                >
                  Entrar
                </button>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700"></div></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-gray-800 px-2 text-clinical-muted">Ou</span></div>
                </div>

                <button 
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full py-4 bg-white dark:bg-gray-900 border border-clinical-border dark:border-gray-700 text-clinical-dark dark:text-white rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-3"
                >
                  <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" referrerPolicy="no-referrer" />
                  Entrar com Google
                </button>
              </form>

              <div className="text-center">
                <p className="text-sm text-clinical-muted">
                  Não tem uma conta? 
                  <button onClick={() => setView('register')} className="text-clinical-blue font-bold ml-1 hover:underline">Registe-se aqui</button>
                </p>
                <button onClick={() => setView('home')} className="text-xs text-clinical-muted mt-4 hover:underline flex items-center justify-center gap-1 mx-auto">
                  <ChevronLeft className="w-3 h-3" /> Voltar
                </button>
              </div>
            </motion.div>
          )}

          {view === 'register' && (
            <motion.div 
              key="register"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-2xl space-y-8"
            >
              <div className="text-center space-y-2">
                <Logo />
                <h2 className="text-2xl font-bold dark:text-white pt-4">Criar Nova Conta</h2>
                <p className="text-clinical-muted">Junte-se à maior plataforma de saúde.</p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold dark:text-white ml-1">Nome Completo</label>
                    <input 
                      type="text" 
                      required
                      minLength={3}
                      value={registerName}
                      onChange={(e) => {
                        setRegisterName(e.target.value);
                        if (registerErrors.name) setRegisterErrors(prev => {
                          const next = { ...prev };
                          delete next.name;
                          return next;
                        });
                      }}
                      className={`w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border ${registerErrors.name ? 'border-red-500' : 'border-clinical-border dark:border-gray-700'} focus:ring-2 focus:ring-clinical-blue outline-none transition-all dark:text-white`}
                      placeholder="Seu nome"
                    />
                    {registerErrors.name && <p className="text-[10px] text-red-500 font-bold ml-1">{registerErrors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold dark:text-white ml-1">Email</label>
                    <input 
                      type="email" 
                      required
                      value={registerEmail}
                      onChange={(e) => {
                        setRegisterEmail(e.target.value);
                        if (registerErrors.email) setRegisterErrors(prev => {
                          const next = { ...prev };
                          delete next.email;
                          return next;
                        });
                      }}
                      className={`w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border ${registerErrors.email ? 'border-red-500' : 'border-clinical-border dark:border-gray-700'} focus:ring-2 focus:ring-clinical-blue outline-none transition-all dark:text-white`}
                      placeholder="exemplo@email.com"
                    />
                    {registerErrors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{registerErrors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold dark:text-white ml-1">Senha</label>
                    <input 
                      type="password" 
                      required
                      value={registerPassword}
                      onChange={(e) => {
                        setRegisterPassword(e.target.value);
                        if (registerErrors.password) setRegisterErrors(prev => {
                          const next = { ...prev };
                          delete next.password;
                          return next;
                        });
                      }}
                      className={`w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border ${registerErrors.password ? 'border-red-500' : 'border-clinical-border dark:border-gray-700'} focus:ring-2 focus:ring-clinical-blue outline-none transition-all dark:text-white`}
                      placeholder="••••••••"
                    />
                    {registerErrors.password && <p className="text-[10px] text-red-500 font-bold ml-1">{registerErrors.password}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold dark:text-white ml-1">Idade</label>
                    <input 
                      type="number" 
                      required
                      value={registerAge}
                      onChange={(e) => {
                        setRegisterAge(e.target.value);
                        if (registerErrors.age) setRegisterErrors(prev => {
                          const next = { ...prev };
                          delete next.age;
                          return next;
                        });
                      }}
                      className={`w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border ${registerErrors.age ? 'border-red-500' : 'border-clinical-border dark:border-gray-700'} focus:ring-2 focus:ring-clinical-blue outline-none transition-all dark:text-white`}
                      placeholder="Sua idade"
                    />
                    {registerErrors.age && <p className="text-[10px] text-red-500 font-bold ml-1">{registerErrors.age}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold dark:text-white ml-1">Telefone</label>
                    <input 
                      type="tel" 
                      required
                      value={registerPhone}
                      onChange={(e) => {
                        setRegisterPhone(e.target.value);
                        if (registerErrors.phone) setRegisterErrors(prev => {
                          const next = { ...prev };
                          delete next.phone;
                          return next;
                        });
                      }}
                      className={`w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border ${registerErrors.phone ? 'border-red-500' : 'border-clinical-border dark:border-gray-700'} focus:ring-2 focus:ring-clinical-blue outline-none transition-all dark:text-white`}
                      placeholder="Seu contacto"
                    />
                    {registerErrors.phone && <p className="text-[10px] text-red-500 font-bold ml-1">{registerErrors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold dark:text-white ml-1">Status Profissional / Académico</label>
                    <select 
                      value={registerStatus}
                      onChange={(e) => setRegisterStatus(e.target.value)}
                      className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-clinical-border dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none transition-all dark:text-white text-sm"
                    >
                      {USER_STATUSES.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold dark:text-white ml-1">Especialidade Principal</label>
                    <select 
                      value={registerSpecialty}
                      onChange={(e) => setRegisterSpecialty(e.target.value as any)}
                      className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-clinical-border dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none transition-all dark:text-white"
                    >
                      {SPECIALTIES.map(spec => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                    <p className="text-[10px] text-clinical-muted ml-1">Esta será a sua área de foco principal na plataforma.</p>
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-clinical-green text-white rounded-2xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-clinical-green/20"
                >
                  Criar Conta
                </button>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700"></div></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-gray-800 px-2 text-clinical-muted">Ou</span></div>
                </div>

                <button 
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full py-4 bg-white dark:bg-gray-900 border border-clinical-border dark:border-gray-700 text-clinical-dark dark:text-white rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-3"
                >
                  <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" referrerPolicy="no-referrer" />
                  Registar com Google
                </button>
              </form>

              <div className="text-center">
                <p className="text-sm text-clinical-muted">
                  Já tem uma conta? 
                  <button onClick={() => setView('login')} className="text-clinical-blue font-bold ml-1 hover:underline">Faça login</button>
                </p>
                <button onClick={() => setView('home')} className="text-xs text-clinical-muted mt-4 hover:underline flex items-center justify-center gap-1 mx-auto">
                  <ChevronLeft className="w-3 h-3" /> Voltar
                </button>
              </div>
            </motion.div>
          )}

          {view === 'complete_profile' && !isAdmin && (!user.age || !user.phone) && (
            <motion.div 
              key="complete_profile_form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-2xl space-y-8"
            >
              <div className="text-center space-y-2">
                <Logo />
                <h2 className="text-2xl font-bold dark:text-white pt-4">Complete seu Perfil</h2>
                <p className="text-clinical-muted">Precisamos de mais algumas informações para personalizar sua experiência.</p>
              </div>

              <form onSubmit={async (e) => {
                e.preventDefault();
                const updatedUser = {
                  ...user,
                  age: parseInt(tempAge) || undefined,
                  status: tempStatus,
                  phone: tempPhone
                };
                try {
                  if (user.uid && user.uid !== 'admin_legacy') {
                    await setDoc(doc(db, 'users', user.uid), updatedUser, { merge: true });
                  }
                  setUser(updatedUser);
                  setView('hub');
                  showAlert("Sucesso", "Perfil completado com sucesso!");
                } catch (err) {
                  console.error("Failed to update profile:", err);
                  handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
                  showAlert("Erro", "Não foi possível atualizar o perfil.");
                }
              }} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold dark:text-white ml-1">Idade</label>
                  <input 
                    type="number" 
                    required
                    value={tempAge}
                    onChange={(e) => setTempAge(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-clinical-border dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none transition-all dark:text-white"
                    placeholder="Sua idade"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold dark:text-white ml-1">Telefone</label>
                  <input 
                    type="tel" 
                    required
                    value={tempPhone}
                    onChange={(e) => setTempPhone(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-clinical-border dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none transition-all dark:text-white"
                    placeholder="Seu contacto"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold dark:text-white ml-1">Status Profissional / Académico</label>
                  <select 
                    value={tempStatus}
                    onChange={(e) => setTempStatus(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-clinical-border dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none transition-all dark:text-white text-sm"
                  >
                    {USER_STATUSES.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-clinical-green text-white rounded-2xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-clinical-green/20"
                >
                  Finalizar Cadastro
                </button>
                <button 
                  type="button"
                  onClick={() => setView('mission_center')}
                  className="w-full py-4 bg-gray-100 dark:bg-gray-700 text-clinical-muted dark:text-gray-300 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                >
                  Pular por agora
                </button>
              </form>
            </motion.div>
          )}

          {view === 'complete_profile' && !isAdmin && (user.age && user.phone) && !user.specialty && (
            <motion.div 
              key="complete_profile_specialty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-2xl space-y-8"
            >
              <div className="text-center space-y-2">
                <Brain className="w-16 h-16 text-clinical-blue mx-auto" />
                <h2 className="text-2xl font-bold dark:text-white pt-4">Selecione a sua Área</h2>
                <p className="text-clinical-muted">Para personalizar a sua experiência, escolha a sua especialidade principal.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold dark:text-white ml-1">Especialidade Principal</label>
                  <div className="grid grid-cols-1 gap-3">
                    {SPECIALTIES.map(spec => (
                      <button
                        key={spec}
                        onClick={() => {
                          updateUser({ specialty: spec });
                          setView('hub');
                          showAlert("Perfil Atualizado", `A sua área principal foi definida como ${spec}.`);
                        }}
                        className={`p-4 rounded-2xl border text-left font-bold transition-all flex items-center justify-between group ${spec === 'Saúde Geral' ? 'border-clinical-border dark:border-gray-700 hover:border-clinical-blue' : 'border-clinical-border dark:border-gray-700 hover:border-clinical-blue'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-clinical-blue/10 flex items-center justify-center text-clinical-blue group-hover:bg-clinical-blue group-hover:text-white transition-all">
                            <Stethoscope className="w-4 h-4" />
                          </div>
                          <span className="dark:text-white">{spec}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-clinical-muted" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'hub' && user && (
            <Hub 
              user={user} 
              protectedSetView={protectedSetView} 
              setSelectedSpecialty={setSelectedSpecialty} 
              setSelectedCategory={setSelectedCategory} 
              setView={setView} 
              isAdmin={isAdmin}
              onOpenCabinet={() => setCabinetMode(true)}
            />
          )}

          {view === 'home' && (
            <Home 
              user={user} 
              coverImageGlobal={coverImageGlobal} 
              protectedSetView={protectedSetView} 
              setView={setView} 
              handleGoogleLogin={handleGoogleLogin}
              isAdmin={isAdmin} 
              allCases={allCases} 
              handleStartCase={handleStartCase} 
            />
          )}

          {view === 'categories' && (
            <CategoryList 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              difficultyFilter={difficultyFilter}
              setDifficultyFilter={setDifficultyFilter}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSpecialty={selectedSpecialty}
              setSelectedSpecialty={setSelectedSpecialty}
              allCases={allCases}
              handleStartCase={handleStartCase}
              CATEGORIES={CATEGORIES}
              onBack={() => setView('hub')}
            />
          )}

          {view === 'library' && (
            <motion.div
              key="library"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ReferenceLibrary 
                onBack={() => { setView('hub'); setCabinetMode(false); }} 
                showAlert={showAlert} 
                initialShowCabinet={cabinetMode}
              />
            </motion.div>
          )}

          {view === 'biomechanics' && (
            <BiomechanicsLab onClose={() => setView('hub')} />
          )}

          {view === 'virtual_consultation' && (
            <VirtualConsultation onClose={() => setView('hub')} />
          )}

          {view === 'social' && (
            <SocialFeed user={user} setUser={setUser} showPrompt={showPrompt} />
          )}

          {view === 'groups' && (
            <StudyGroups user={user} showPrompt={showPrompt} />
          )}

          {view === 'case' && selectedCase && (
            <div translate="no" className="notranslate">
              <CaseSimulation 
                caseData={selectedCase} 
                mode={mode}
                isAdmin={isAdmin}
                showAlert={showAlert}
                userLives={user?.lives || 0}
                onLoseLife={handleLoseLife}
                onOpenRoundTable={() => setShowRoundTable(true)}
                onOpenAnatomyViewer={(target) => {
                  setAnatomyTarget(target || '');
                  setShowAnatomyViewer(true);
                }}
                onComplete={(score, correct, total, mistakes) => {
                  if (user) {
                    if (mode === 'desafio') {
                      const isFirst = (user.progress || []).length === 0;
                      const newProgress = [...(user.progress || []), selectedCase.id];
                      const newScore = (user.score || 0) + score;
                      const newLevel = Math.floor(newScore / 500) + 1;
                      
                      // Score history entry
                      const newHistory = [...(user.scoreHistory || []), { date: new Date().toLocaleDateString(), score: newScore }];
                      
                      // Category scores update
                      const newCategoryScores = { ...(user.categoryScores || {}) };
                      const cat = selectedCase.category;
                      if (!newCategoryScores[cat]) {
                        newCategoryScores[cat] = { correct: 0, total: 0 };
                      }
                      newCategoryScores[cat].correct += correct;
                      newCategoryScores[cat].total += total;

                      // Mistakes update
                      const newMistakes = [...(user.mistakes || []), ...mistakes.map((m: any) => ({
                        caseId: selectedCase.id,
                        questionId: m.id,
                        questionText: m.text,
                        category: selectedCase.category,
                        date: new Date().toISOString()
                      }))].slice(-50); // Keep last 50 mistakes

                      // Badge logic
                      const newBadges = [...(user.badges || [])];
                      if (isFirst) {
                        const b = BADGES.find(b => b.id === 'first_case')!;
                        if (!newBadges.find(nb => nb.id === b.id)) newBadges.push({ ...b, unlockedAt: new Date().toISOString() });
                      }
                      if (newProgress.filter(id => allCases.find(c => c.id === id)?.category === 'Coluna Vertebral').length >= 5) {
                        const b = BADGES.find(b => b.id === 'spine_master')!;
                        if (!newBadges.find(nb => nb.id === b.id)) newBadges.push({ ...b, unlockedAt: new Date().toISOString() });
                      }
                      if (score === 400) { // All 4 questions correct
                        const b = BADGES.find(b => b.id === 'perfect_score')!;
                        if (!newBadges.find(nb => nb.id === b.id)) newBadges.push({ ...b, unlockedAt: new Date().toISOString() });
                      }
                      if (newLevel >= 10) {
                        const b = BADGES.find(b => b.id === 'level_10')!;
                        if (!newBadges.find(nb => nb.id === b.id)) newBadges.push({ ...b, unlockedAt: new Date().toISOString() });
                      }

                      // Streak logic
                      let newStreak = user.streak || 0;
                      const today = new Date().toLocaleDateString();
                      const lastActivity = user.lastActivityDate;
                      let usedFreeze = false;
                      
                      if (lastActivity) {
                        const lastDate = new Date(lastActivity);
                        const diffTime = Math.abs(new Date(today).getTime() - lastDate.getTime());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        
                        if (diffDays === 1) {
                          newStreak += 1;
                        } else if (diffDays > 1) {
                          // Check for streak freeze
                          if (user.streakFreezeCount > 0) {
                            // Streak protected!
                            showAlert("Proteção de Streak", "Proteção de Streak ativada! A sua sequência foi mantida.");
                            newStreak += 1;
                            usedFreeze = true;
                          } else {
                            newStreak = 1;
                          }
                        }
                      } else {
                        newStreak = 1;
                      }

                      const updatedData = {
                        score: newScore,
                        level: newLevel,
                        progress: newProgress,
                        badges: newBadges,
                        scoreHistory: newHistory,
                        categoryScores: newCategoryScores,
                        mistakes: newMistakes,
                        lastExamDate: new Date().toISOString(),
                        streak: newStreak,
                        lastActivityDate: today,
                        streakFreezeCount: usedFreeze ? Math.max(0, user.streakFreezeCount - 1) : user.streakFreezeCount
                      };

                      updateUser(updatedData);

                      // Add to feed
                      addDoc(collection(db, 'feed'), {
                        userUid: auth.currentUser?.uid,
                        userName: user.name,
                        userAvatar: user.avatar || null,
                        type: 'case_completed',
                        content: `Completou o caso clínico: ${selectedCase.patient.name} com ${score} pontos!`,
                        likes: [],
                        comments: [],
                        createdAt: new Date().toISOString()
                      }).catch(err => handleFirestoreError(err, OperationType.CREATE, 'feed'));
                      
                      showAlert("Missão Concluída", `Missão concluída! Ganhou ${score} pontos.`);
                    } else {
                      showAlert("Modo Treino", "Modo Treino concluído! No modo treino não são atribuídos pontos ou progresso para o certificado.");
                    }

                    setView('profile');
                    setSelectedCase(null);
                  }
                }}
                onExit={() => {
                  if (isAdmin) setView('admin');
                  else setView('categories');
                }}
              />
            </div>
          )}

          {view === 'profile' && user && (
            <Profile 
              user={user}
              isAdmin={isAdmin}
              protectedSetView={protectedSetView}
              setShowEditProfile={setShowEditProfile}
              setShowTournamentArena={setShowTournamentArena}
              setShowPerformanceDashboard={setShowPerformanceDashboard}
              setShowPortfolioExport={setShowPortfolioExport}
              allCases={allCases}
              isCertificatePaid={isCertificatePaid}
              pendingPayments={pendingPayments}
              feedback={feedback}
              setFeedback={setFeedback}
              handleLogout={handleLogout}
              handleBuyItem={handleBuyItem}
              handleAcceptFriendRequest={handleAcceptFriendRequest}
              handleRejectFriendRequest={handleRejectFriendRequest}
              handleSendFriendRequest={handleSendFriendRequest}
              showAlert={showAlert}
              setShowPaymentModal={setShowPaymentModal}
              sendWhatsAppNotification={sendWhatsAppNotification}
              BADGES={BADGES}
            />
          )}

          {view === 'mission_center' && user && (
            <MissionCenter 
              user={user} 
              onAction={(action) => protectedSetView(action as View)} 
            />
          )}

          {view === 'leaderboard' && (
            <motion.div 
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-between">
                <button onClick={() => setView('profile')} className="flex items-center gap-2 text-clinical-blue font-bold">
                  <ChevronLeft className="w-4 h-4" /> Voltar ao Perfil
                </button>
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold dark:text-white">Ranking Global</h2>
                  <button 
                    onClick={() => setExportType('ranking')}
                    className="p-2 bg-clinical-blue/10 text-clinical-blue rounded-xl hover:bg-clinical-blue hover:text-white transition-all flex items-center gap-2 text-xs font-bold"
                  >
                    <Download className="w-4 h-4" /> Exportar PDF
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-gray-900 border-b border-clinical-border dark:border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-clinical-muted uppercase tracking-widest">Posição</th>
                      <th className="px-6 py-4 text-xs font-bold text-clinical-muted uppercase tracking-widest">Utilizador</th>
                      <th className="px-6 py-4 text-xs font-bold text-clinical-muted uppercase tracking-widest">Nível</th>
                      <th className="px-6 py-4 text-xs font-bold text-clinical-muted uppercase tracking-widest">Casos</th>
                      <th className="px-6 py-4 text-xs font-bold text-clinical-muted uppercase tracking-widest">Pontuação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {(leaderboard || []).map((entry, idx) => (
                      <tr key={idx} className={entry.name === user?.name ? 'bg-clinical-blue/5' : ''}>
                        <td className="px-6 py-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            idx === 0 ? 'bg-yellow-400 text-white' : 
                            idx === 1 ? 'bg-gray-300 text-white' : 
                            idx === 2 ? 'bg-amber-600 text-white' : 
                            'text-clinical-muted'
                          }`}>
                            {idx + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold dark:text-white">{entry.name}</td>
                        <td className="px-6 py-4 text-clinical-muted">{entry.level}</td>
                        <td className="px-6 py-4 text-clinical-muted">{entry.completedCases}</td>
                        <td className="px-6 py-4 font-display font-bold text-clinical-blue">{entry.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {view === 'dashboard' && user && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <button onClick={() => setView('profile')} className="flex items-center gap-2 text-clinical-blue font-bold">
                  <ChevronLeft className="w-4 h-4" /> Voltar ao Perfil
                </button>
                <h2 className="text-2xl font-bold dark:text-white">Dashboard de Desempenho</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-6">
                  <h3 className="text-xl font-bold dark:text-white">Radar de Competências</h3>
                  <div className="h-[300px] w-full">
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
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-6">
                  <h3 className="text-xl font-bold dark:text-white">Evolução de Pontuação</h3>
                  <div className="h-[300px] w-full">
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
            </motion.div>
          )}

          {view === 'duels' && (
            <motion.div 
              key="duels"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 max-w-2xl mx-auto text-center"
            >
              <div className="flex items-center justify-between">
                <button onClick={() => setView('home')} className="flex items-center gap-2 text-clinical-blue font-bold">
                  <ChevronLeft className="w-4 h-4" /> Voltar
                </button>
                <h2 className="text-2xl font-bold dark:text-white">Duelos 1v1 em Tempo Real</h2>
              </div>

              {duelStatus === 'idle' && (
                <div className="bg-white dark:bg-gray-800 p-12 rounded-[40px] border border-clinical-border dark:border-gray-700 shadow-xl space-y-8">
                  <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto text-purple-600">
                    <Zap className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold dark:text-white">Arena de Desafios</h3>
                    <p className="text-clinical-muted">Enfrente outros fisioterapeutas em tempo real. Quem responder mais rápido e corretamente ganha o dobro de pontos!</p>
                  </div>
                  <button 
                    onClick={handleJoinDuel}
                    className="w-full py-6 bg-purple-600 text-white rounded-3xl font-bold text-xl shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all flex items-center justify-center gap-3"
                  >
                    <Trophy className="w-6 h-6" /> Procurar Oponente
                  </button>
                </div>
              )}

              {duelStatus === 'searching' && (
                <div className="bg-white dark:bg-gray-800 p-12 rounded-[40px] border border-clinical-border dark:border-gray-700 shadow-xl space-y-8">
                  <div className="relative w-32 h-32 mx-auto">
                    <div className="absolute inset-0 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                    <div className="absolute inset-4 border-4 border-clinical-blue border-b-transparent rounded-full animate-spin [animation-duration:1.5s]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Search className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold dark:text-white">Procurando Oponente...</h3>
                    <p className="text-clinical-muted italic">Aguardando que outro fisioterapeuta aceite o desafio.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setDuelStatus('idle');
                      // socket?.emit("leave_queue");
                    }}
                    className="text-clinical-muted hover:text-red-500 font-bold transition-colors"
                  >
                    Cancelar Procura
                  </button>
                </div>
              )}

              {duelStatus === 'playing' && activeDuel && (
                <DuelArena 
                  activeDuel={activeDuel}
                  socket={socket!}
                  onComplete={(finalScore) => {
                    setDuelStatus('finished');
                    if (finalScore > opponentScore) {
                      // Winner gets bonus
                      const bonus = 200;
                      setUser(prev => ({ ...prev, score: prev.score + bonus }));
                      showAlert("Vitória!", `Vitória! Ganhou ${bonus} pontos de bónus.`);
                    }
                  }}
                  onExit={() => setDuelStatus('idle')}
                />
              )}
            </motion.div>
          )}
          {view === ('reference' as any) && (
            <motion.div 
              key="reference"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <button onClick={() => setView('home')} className="flex items-center gap-2 text-clinical-blue font-bold">
                  <ChevronLeft className="w-4 h-4" /> Voltar
                </button>
                <h2 className="text-2xl font-bold dark:text-white">Biblioteca de Referência</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1 space-y-4">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm">
                    <h3 className="font-bold mb-4 dark:text-white">Categorias</h3>
                    <div className="space-y-2">
                      {['Geral', ...categories].map(cat => (
                        <button 
                          key={cat}
                          className="w-full text-left px-4 py-2 rounded-xl text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors dark:text-white"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="md:col-span-3 space-y-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-clinical-muted w-5 h-5" />
                    <input 
                      type="text"
                      placeholder="Pesquisar termos técnicos, testes ou tratamentos..."
                      className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white dark:bg-gray-800 border border-clinical-border dark:border-gray-700 shadow-sm outline-none focus:ring-2 focus:ring-clinical-blue transition-all dark:text-white"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-clinical-border dark:border-gray-700 shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 bg-blue-50 text-clinical-blue text-[10px] font-bold uppercase rounded-full">Ortopedia</span>
                          <span className="text-[10px] text-clinical-muted">Atualizado em 15/03/2026</span>
                        </div>
                        <h4 className="text-lg font-bold dark:text-white">Teste de Lachman</h4>
                        <p className="text-sm text-clinical-muted leading-relaxed">
                          O teste de Lachman é um teste clínico utilizado para diagnosticar a integridade do ligamento cruzado anterior (LCA). É considerado o teste mais sensível para rupturas agudas do LCA...
                        </p>
                        <div className="py-4">
                          <MultimediaViewer items={[
                            { type: 'image', url: 'https://picsum.photos/seed/lachman/600/400', title: 'Manobra de Lachman' },
                            { type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Demonstração em Vídeo' }
                          ]} />
                        </div>
                        <div className="flex gap-2">
                          <span className="text-[10px] bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg dark:text-white">#LCA</span>
                          <span className="text-[10px] bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg dark:text-white">#Joelho</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
           {view === 'certificate_editor' && isAdmin && (
            <CertificateEditor 
              onBack={() => setView('profile')} 
              userName={user?.name}
            />
          )}

          {view === 'admin' && isAdmin && (
            <AdminPanel 
              adminTab={adminTab}
              setAdminTab={(tab) => setAdminTab(tab as any)}
              pendingPayments={pendingPayments}
              allCases={allCases}
              allUsers={allUsers}
              duelRecords={duelRecords}
              accessLogs={accessLogs}
              user={user}
              certificateSettings={certificateSettings}
              setCertificateSettings={setCertificateSettings}
              setView={protectedSetView}
              handleLogout={handleLogout}
              showAlert={showAlert}
              showConfirm={showConfirm}
              setSelectedCase={setSelectedCase}
              setShowCaseEditor={setShowCaseEditor}
              setShowAiCaseModal={setShowAiCaseModal}
              handleUpdateCoverImage={handleUpdateCoverImage}
              setSelectedUserForAdmin={setSelectedUserForAdmin}
              setAllUsers={setAllUsers}
              downloadCSV={downloadCSV}
            />
          )}
          {view === 'certificate' && (user || adminViewingUser) && (
            <Certificate 
              user={adminViewingUser || user} 
              onBack={() => {
                if (adminViewingUser) {
                  setAdminViewingUser(null);
                  setView('admin');
                } else {
                  setView('profile');
                }
              }} 
              isAdmin={isAdmin} 
              setShowPortfolioExport={setShowPortfolioExport}
              settings={certificateSettings}
            />
          )}

          {view === 'osce' && (
            <OSCESimulator onBack={() => setView('hub')} />
          )}

          {view === 'triage' && (
            <TriageSimulator onBack={() => setView('hub')} />
          )}

          {view === 'internship' && (
            <InternshipLogbook onBack={() => setView('hub')} />
          )}

          {view === 'teacher' && (
            <TeacherDashboard onBack={() => setView('hub')} />
          )}

          {view === 'institution' && (
            <InstitutionDashboard onBack={() => setView('hub')} />
          )}
        </AnimatePresence>

        {/* Payment Modal */}
        <AnimatePresence>
          {showPaymentModal && (
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
          )}
        </AnimatePresence>

      {/* AI Case Modal */}
      <AnimatePresence>
        {showAiCaseModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-[40px] shadow-2xl p-8 border border-white/20"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-clinical-blue text-white rounded-2xl flex items-center justify-center shadow-lg shadow-clinical-blue/20">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black dark:text-white">Gerador de Casos IA</h2>
                    <p className="text-xs text-clinical-muted font-bold uppercase tracking-widest">Criação Instantânea por Gemini</p>
                  </div>
                </div>
                <button onClick={() => setShowAiCaseModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl">
                  <X className="w-6 h-6 text-clinical-muted" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-clinical-muted ml-4">Tema ou Cenário Clínico</label>
                  <textarea 
                    value={aiCaseTheme}
                    onChange={(e) => setAiCaseTheme(e.target.value)}
                    placeholder="Ex: Idoso com dor no quadril e histórico de queda..."
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-clinical-border dark:border-gray-700 rounded-3xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-clinical-blue/20 transition-all min-h-[120px]"
                  />
                </div>

                <button 
                  onClick={handleGenerateAiCase}
                  disabled={isGeneratingAiCase || !aiCaseTheme}
                  className="w-full py-4 bg-clinical-blue text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-clinical-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isGeneratingAiCase ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      A Gerar Caso...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Gerar Caso Clínico
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Performance Dashboard Modal */}
      <AnimatePresence>
        {showPerformanceDashboard && user && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white dark:bg-gray-950 overflow-y-auto p-4 md:p-8"
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-end mb-4">
                <button 
                  onClick={() => setShowPerformanceDashboard(false)}
                  className="p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl hover:bg-gray-200 transition-all"
                >
                  <X className="w-6 h-6 text-clinical-muted" />
                </button>
              </div>
              <PerformanceDashboard 
                user={user} 
                allCases={allCases} 
                onSelectCase={(c) => {
                  setSelectedCase(c);
                  setView('case');
                  setShowPerformanceDashboard(false);
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Round Table Modal */}
      <AnimatePresence>
        {showRoundTable && selectedCase && (
          <RoundTableSimulation 
            caseData={selectedCase} 
            onClose={() => setShowRoundTable(false)} 
          />
        )}
      </AnimatePresence>

      {/* Anatomy Viewer Modal */}
      <AnimatePresence>
        {showAnatomyViewer && (
          <AnatomyViewer 
            targetArea={anatomyTarget}
            onClose={() => setShowAnatomyViewer(false)} 
          />
        )}
      </AnimatePresence>

      {/* Portfolio Export Modal */}
      <AnimatePresence>
        {showPortfolioExport && user && (
          <PortfolioExport 
            user={user} 
            allCases={allCases} 
            onClose={() => setShowPortfolioExport(false)} 
          />
        )}
      </AnimatePresence>

      {/* Tournament Arena Modal */}
      <AnimatePresence>
        {showTournamentArena && user && (
          <TournamentArena 
            user={user} 
            onJoinDuel={() => {
              setShowTournamentArena(false);
              protectedSetView('duels');
            }}
            onClose={() => setShowTournamentArena(false)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {exportType && (
          <AdminReportsExport 
            type={exportType}
            data={{
              allUsers,
              allCases,
              duelRecords,
              leaderboard: leaderboard || []
            }}
            onClose={() => setExportType(null)}
          />
        )}
      </AnimatePresence>

      {/* Voice Navigator */}
      <VoiceNavigator 
        onNavigate={(v) => protectedSetView(v)}
        onSearch={(q) => {
          setSearchQuery(q);
          protectedSetView('categories');
        }}
        onToggleTheme={toggleDarkMode}
        hideFloatingButton={true}
        onListeningChange={setIsVoiceListening}
      />

      <AnimatePresence>
        {showEditProfile && (
          <EditProfileModal 
            user={user}
            onSave={handleSaveProfile}
            onClose={() => setShowEditProfile(false)}
            onLogout={handleLogout}
          />
        )}

        {/* Mode Selection Modal Removed */}
      </AnimatePresence>

      <AnimatePresence>
        {showCaseEditor && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="min-h-full flex items-center justify-center py-8 w-full">
              <CaseEditor 
                onSave={handleSaveNewCase}
                onClose={() => setShowCaseEditor(false)}
              />
            </div>
          </div>
        )}
      </AnimatePresence>
      </main>

      <Footer onLogout={handleLogout} userEmail={user?.email || ''} />

      {/* Floating Install Prompt Button (only if browser PWA install event triggered) */}
      {showInstallButton && (
        <div className="fixed bottom-6 right-6 z-[100]">
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={handleInstallClick}
            className="p-3.5 bg-clinical-green text-white rounded-full shadow-2xl hover:bg-green-600 transition-all flex items-center justify-center"
            title="Instalar Aplicativo"
          >
            <Download className="w-5 h-5" />
          </motion.button>
        </div>
      )}

      {/* AI Components */}
      <AIAssistant 
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        hideFloatingButton={true}
      />
      <AnimatePresence>
        {showLiveAssistant && (
          <LiveVoiceAssistant onClose={() => setShowLiveAssistant(false)} />
        )}
      </AnimatePresence>

      {/* PWA / Permanent App Installation Modal */}
      <InstallAppModal 
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        deferredPrompt={deferredPrompt}
        coverImage={coverImageGlobal}
      />

      {/* Google Direct Access & Domain Authorization Modal */}
      <AnimatePresence>
        {showGoogleDirectModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-gray-800 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-clinical-border dark:border-gray-700 space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center border border-blue-100 dark:border-blue-800">
                    <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black dark:text-white">Autenticação Google</h3>
                    <p className="text-xs text-clinical-muted">Aceda à sua conta RECOVERY HEALTH</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowGoogleDirectModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-clinical-muted"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Fast track button for administrator */}
              <div className="p-4 bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-clinical-blue dark:text-blue-400">Conta Google Verificada</span>
                  <span className="text-[10px] px-2 py-0.5 bg-clinical-blue text-white font-bold rounded-full">Admin</span>
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300 font-bold">pjoaquim1705@gmail.com (Pedro Joaquim)</p>
                <button
                  onClick={() => handleDirectGoogleConnect('pjoaquim1705@gmail.com', 'Pedro Joaquim')}
                  className="w-full mt-2 py-3 bg-clinical-blue text-white rounded-xl font-bold text-xs hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
                >
                  <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" referrerPolicy="no-referrer" />
                  Entrar Imediatamente como Administrador
                </button>
              </div>

              {/* Custom Google Email Connection */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold dark:text-white">Ou entre com outro email Google:</label>
                <div className="space-y-2">
                  <input
                    type="email"
                    value={googleDirectEmail}
                    onChange={(e) => setGoogleDirectEmail(e.target.value)}
                    placeholder="seu.email@gmail.com"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-clinical-border dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none text-sm dark:text-white font-medium"
                  />
                  <input
                    type="text"
                    value={googleDirectName}
                    onChange={(e) => setGoogleDirectName(e.target.value)}
                    placeholder="Seu Nome Completo"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-clinical-border dark:border-gray-700 focus:ring-2 focus:ring-clinical-blue outline-none text-sm dark:text-white font-medium"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleDirectGoogleConnect(googleDirectEmail, googleDirectName)}
                  className="w-full py-3 bg-clinical-green text-white rounded-xl font-bold text-xs hover:bg-green-600 transition-all shadow-md shadow-green-500/20"
                >
                  Conectar e Entrar com este Google
                </button>
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-gray-700 text-center">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="text-xs text-clinical-blue hover:underline font-bold"
                >
                  Tentar abrir janela de Pop-up do Google novamente
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}
