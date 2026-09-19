export type View = 
  | 'hub' 
  | 'home' 
  | 'learn'
  | 'simulate'
  | 'assess'
  | 'profile' 
  | 'categories' 
  | 'case' 
  | 'leaderboard' 
  | 'admin' 
  | 'dashboard' 
  | 'certificate' 
  | 'certificate_editor' 
  | 'duels' 
  | 'login' 
  | 'register' 
  | 'social' 
  | 'groups' 
  | 'complete_profile' 
  | 'mission_center' 
  | 'library' 
  | 'biomechanics' 
  | 'advanced_tools' 
  | 'virtual_consultation'
  | 'teacher'
  | 'institution'
  | 'osce'
  | 'internship'
  | 'interprofessional'
  | 'portfolio'
  | 'triage'
  | 'cms';

export type UserRole = 'student' | 'teacher' | 'coordinator' | 'institution_admin' | 'admin' | 'supervisor' | 'user';

export interface CaseSimulationProps {
  caseData: ClinicalCase;
  mode: 'treino' | 'desafio' | 'ramificado' | 'interprofissional';
  onComplete: (score: number, correct: number, total: number, mistakes: any[]) => void;
  onExit: () => void;
  isAdmin?: boolean;
  userLives: number;
  onLoseLife: () => void;
  showAlert: (title: string, message: string) => void;
  selectedRole?: string;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export type Specialty = 
  | 'Saúde Geral'
  | 'Medicina Geral'
  | 'Medicina Dentária'
  | 'Enfermagem'
  | 'Fisioterapia'
  | 'Análises Clínicas'
  | 'Farmácia'
  | 'Nutrição'
  | 'Psicologia Clínica'
  | 'Radiologia e Imagem Médica'
  | 'Terapia da Fala'
  | 'Terapia Ocupacional'
  | 'Saúde Pública & Epidemiologia'
  | 'Biotecnologia & Genética Médica'
  | string;

export type Category = string;

export interface Multimedia {
  type: 'image' | 'video' | 'anatomy' | 'exam';
  url: string;
  title?: string;
  description?: string;
  interactiveData?: any; // For anatomy hotspots or exam annotations
}

export interface Question {
  id: string;
  text: string;
  options: {
    id: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  clinicalPearl?: string; 
  multimedia?: Multimedia[]; 
  isAnatomyTask?: boolean;
  questionType?: 'multipla_escolha' | 'verdadeiro_falso' | 'discursiva' | 'interpretacao_exame' | 'decisao_clinica';
  competencyCode?: string;
  professionScope?: string;
  isRedFlagQuestion?: boolean;
  safetyWarning?: string;
}

export interface CaseStage {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  multimedia?: Multimedia[]; 
  isChatStage?: boolean;
  chatPrompt?: string;
  formSectionKey?: string;
  vitals?: {
    bp?: string;
    hr?: number;
    rr?: number;
    spo2?: number;
    temp?: number;
    pain?: number;
  };
}

export interface BranchDecisionChoice {
  id: string;
  label: string;
  description: string;
  impactType: 'favorable' | 'adverse' | 'neutral' | 'critical';
  impactExplanation: string;
  nextNodeId: string;
  vitalsChange?: {
    bp?: string;
    hr?: number;
    rr?: number;
    spo2?: number;
    temp?: number;
  };
  scoreDelta: number;
}

export interface BranchNode {
  id: string;
  title: string;
  scenarioText: string;
  multimedia?: Multimedia[];
  vitals?: {
    bp: string;
    hr: number;
    rr: number;
    spo2: number;
    temp: number;
  };
  choices: BranchDecisionChoice[];
  isFinalOutcome?: boolean;
  outcomeEvaluation?: {
    isSuccess: boolean;
    summary: string;
    clinicalDebrief: string;
  };
}

export interface InterprofessionalRoleView {
  roleId: string;
  roleName: string;
  professionId: string;
  iconName: string;
  specificFindings: string[];
  responsibilities: string[];
  recommendedActions: string[];
}

export interface TriageScenarioData {
  chiefComplaint: string;
  vitalSigns: {
    bp: string;
    hr: number;
    rr: number;
    spo2: number;
    temp: number;
    gcs: number;
  };
  redFlags: string[];
  urgencyLevel: 'Vermelho (Emergência)' | 'Laranja (Muito Urgente)' | 'Amarelo (Urgente)' | 'Verde (Pouco Urgente)' | 'Azul (Não Urgente)';
  targetResponseTimeMinutes: number;
  recommendedImmediateAction: string;
}

export interface ClinicalCase {
  id: string;
  title: string; 
  image: string; 
  specialty: Specialty;
  category: Category;
  professionId?: string; // 'medicina' | 'enfermagem' | 'fisioterapia' | 'farmacia' | 'nutricao' | 'psicologia' | etc.
  caseType?: 'ambulatorial' | 'hospitalar' | 'emergencia' | 'internamento' | 'rastreio' | 'diagnostico_diferencial' | 'cirurgico' | 'farmacoterapeutico' | 'nutricional' | 'multiprofissional' | 'ramificado';
  academicLevel?: 'Graduação Inicial' | 'Internato / Estágio' | 'Pós-Graduação / Residência' | 'Profissional';
  difficulty: 'Fácil' | 'Médio' | 'Difícil'; 
  estimatedTime: number; 
  learningObjectives?: string[];
  evaluatedCompetencies?: string[];
  triageRequired?: boolean;
  triageData?: TriageScenarioData;
  isBranched?: boolean;
  branchNodeInitialId?: string;
  branchNodes?: { [nodeId: string]: BranchNode };
  interprofessionalRoles?: InterprofessionalRoleView[];
  clinicalFormAnswers?: Record<string, any>;
  patient: {
    name: string;
    age: number;
    profession: string;
    image: string;
    complaint: string;
    history: string;
    symptoms: string[];
    evolutionTime: string;
    functionalLimitations: string;
    antecedents?: string;
    medications?: string[];
  };
  stages: CaseStage[];
  result: {
    title: string;
    description: string;
    image: string;
    multimedia?: Multimedia[];
  };
  clinicalReferences?: string[];
  version?: string;
  author?: string;
  reviewer?: string;
  status?: 'draft' | 'under_review' | 'approved' | 'published';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface ScoreEntry {
  date: string;
  score: number;
}

export interface UserProfile {
  uid?: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  age?: number;
  status?: string;
  password?: string;
  level: number;
  score: number;
  progress: string[]; // IDs of completed cases
  badges: Badge[]; 
  scoreHistory: ScoreEntry[];
  lastExamDate?: string; 
  isPremium?: boolean; 
  lives: number; 
  lastLifeRegen?: string; 
  streak: number; 
  lastActivityDate?: string; 
  streakFreezeCount: number; 
  friends: string[]; 
  friendRequests: { uid: string, name: string, avatar?: string }[];
  categoryScores?: { [key: string]: { correct: number, total: number } }; 
  professionScores?: { [professionId: string]: { score: number, cases: number } };
  mistakes?: {
    caseId: string;
    questionId: string;
    questionText: string;
    category: string;
    date: string;
  }[];
  tournamentStats?: {
    wins: number;
    losses: number;
    rank: number;
    points: number;
  };
  notifications?: Notification[]; 
  groups?: string[]; 
  feed?: FeedItem[]; 
  role?: UserRole;
  institutionId?: string;
  institutionName?: string;
  courseProgramId?: string;
  academicEnrollmentId?: string;
  bio?: string;
  specialty?: string;
  primaryProfessionId?: string; // 'medicina' | 'enfermagem' | 'fisioterapia' | etc.
  completedMissions?: string[];
  acquiredCompetencies?: {
    code: string;
    title: string;
    score: number;
    level: string;
    unlockedAt: string;
  }[];
}

// Teacher & Academic Models
export interface Classroom {
  id: string;
  name: string;
  code: string; // e.g. "ENF2026-A"
  discipline: string;
  professionId: string;
  teacherUid: string;
  teacherName: string;
  institutionId?: string;
  studentsCount: number;
  students: {
    uid: string;
    name: string;
    email: string;
    joinedAt: string;
    avgScore: number;
  }[];
  activeAssignments: number;
  createdAt: string;
}

export interface Assignment {
  id: string;
  classroomId: string;
  classroomName: string;
  title: string;
  description: string;
  caseIds: string[];
  osceStationIds?: string[];
  dueDate: string;
  durationMinutes: number;
  totalPoints: number;
  submissionsCount: number;
  totalStudents: number;
  status: 'active' | 'closed' | 'draft';
  createdAt: string;
}

// OSCE Models
export interface OSCEChecklistItem {
  id: string;
  skillText: string;
  category: 'Comunicação & Empatia' | 'Anamnese & Investigação' | 'Exame Clínico' | 'Raciocínio & Diagnóstico' | 'Segurança & Procedimento' | 'Conduta & Prescrição';
  points: number;
  criticalItem?: boolean; // If failed, limits maximum score
}

export interface OSCEStation {
  id: string;
  code: string;
  title: string;
  professionId: string;
  specialty: string;
  scenarioDescription: string;
  candidateInstructions: string;
  patientActorPrompt: string;
  timeLimitSeconds: number; // e.g. 420 (7 minutes)
  checklist: OSCEChecklistItem[];
  feedbackDebrief: string;
  requiredCompetencies: string[];
}

export interface OSCEAttempt {
  id: string;
  stationId: string;
  stationTitle: string;
  studentUid: string;
  studentName: string;
  scorePercentage: number;
  passed: boolean;
  timeSpentSeconds: number;
  evaluatedItems: { [itemId: string]: boolean };
  examinerNotes: string;
  completedAt: string;
}

// Internship Models
export interface InternshipPlacement {
  id: string;
  name: string;
  unitName: string;
  healthFacility: string;
  city: string;
  professionId: string;
  supervisorName: string;
  supervisorEmail: string;
  totalRequiredHours: number;
  completedHours: number;
  status: 'in_progress' | 'completed' | 'pending';
}

export interface InternshipLog {
  id: string;
  placementId: string;
  studentUid: string;
  date: string;
  hours: number;
  activityDescription: string;
  patientsAssisted: number;
  proceduresPerformed: string[];
  supervisorApproved: boolean;
  supervisorNotes?: string;
  competencyTags: string[];
}

// Institution Models
export interface Institution {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  campuses: string[];
  programs: string[];
  totalStudents: number;
  totalTeachers: number;
  activeClasses: number;
  subscriptionPlan: 'Enterprise Academic' | 'Health System Partner' | 'Standard';
  validUntil: string;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  members: string[]; 
  adminUid: string;
  createdAt: string;
  messages: GroupMessage[];
}

export interface GroupMessage {
  id: string;
  senderUid: string;
  senderName: string;
  text: string;
  createdAt: string;
}

export interface FeedItem {
  id: string;
  userUid: string;
  userName: string;
  userAvatar?: string;
  type: 'achievement' | 'case_completed' | 'level_up' | 'post';
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  likes: string[]; 
  reactions?: {
    fire: string[]; 
    heart: string[]; 
  };
  views?: string[]; 
  comments: FeedComment[];
  createdAt: string;
}

export interface FeedComment {
  id: string;
  userUid: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
}

export interface Reference {
  id: string;
  title: string;
  category: Category | 'Geral';
  professionId?: string;
  content: string;
  clinicalPearl?: string;
  image?: string;
  tags: string[];
  relatedSpecialties?: Specialty[];
  relatedReferences?: string[]; 
  externalLinks?: { label: string, url: string }[];
  lastUpdated: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'friend_request';
  read: boolean;
  createdAt: string;
  fromUid?: string; 
}

export interface LeaderboardEntry {
  uid: string;
  email: string;
  name: string;
  score: number;
  level: number;
  completedCases: number;
  profession?: string;
}

export interface PendingPayment {
  id?: string;
  userId: string;
  name: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

