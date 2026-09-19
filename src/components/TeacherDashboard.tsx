import React, { useState } from 'react';
import { Classroom, Assignment } from '../types';
import { 
  GraduationCap, 
  Users, 
  FileText, 
  Plus, 
  CheckCircle2, 
  BarChart3, 
  Clock, 
  Search, 
  BookOpen, 
  Award,
  ChevronRight
} from 'lucide-react';

interface TeacherDashboardProps {
  onBack: () => void;
}

const MOCK_CLASSROOMS: Classroom[] = [
  {
    id: 'cls-1',
    name: 'Turma MED-2026.1 - Clínica Médica & Emergência',
    code: 'MED2026-A',
    discipline: 'Clínica Médica I',
    professionId: 'medicina',
    teacherUid: 'teacher-1',
    teacherName: 'Prof. Dr. Eduardo Vasconcelos',
    studentsCount: 38,
    activeAssignments: 2,
    createdAt: '2026-02-10',
    students: [
      { uid: 'st-1', name: 'Ana Beatriz Ramos', email: 'anab@student.edu', joinedAt: '2026-02-12', avgScore: 92 },
      { uid: 'st-2', name: 'Bruno Henrique Silva', email: 'brunoh@student.edu', joinedAt: '2026-02-12', avgScore: 84 },
      { uid: 'st-3', name: 'Carolina Dias', email: 'carold@student.edu', joinedAt: '2026-02-15', avgScore: 78 }
    ]
  },
  {
    id: 'cls-2',
    name: 'Turma ENF-2026.1 - Cuidados Críticos & SAE',
    code: 'ENF2026-B',
    discipline: 'Enfermagem em Terapia Intensiva',
    professionId: 'enfermagem',
    teacherUid: 'teacher-1',
    teacherName: 'Prof. Dr. Eduardo Vasconcelos',
    studentsCount: 42,
    activeAssignments: 1,
    createdAt: '2026-02-15',
    students: [
      { uid: 'st-4', name: 'Diana Albuquerque', email: 'diana@student.edu', joinedAt: '2026-02-16', avgScore: 95 },
      { uid: 'st-5', name: 'Fábio Gomes', email: 'fabio@student.edu', joinedAt: '2026-02-16', avgScore: 88 }
    ]
  }
];

const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    classroomId: 'cls-1',
    classroomName: 'Turma MED-2026.1',
    title: 'Avaliação Prática: Síndrome Coronariana Aguda & ECG',
    description: 'Resolução do caso de IAMCSST de parede inferior e prescrição inicial na sala de emergência.',
    caseIds: ['med-caso-01'],
    dueDate: '2026-08-20',
    durationMinutes: 45,
    totalPoints: 100,
    submissionsCount: 31,
    totalStudents: 38,
    status: 'active',
    createdAt: '2026-08-10'
  },
  {
    id: 'asg-2',
    classroomId: 'cls-2',
    classroomName: 'Turma ENF-2026.1',
    title: 'Estudo de Caso SAE: Choque Séptico & Escala de Braden',
    description: 'Formulação de 3 diagnósticos NANDA-I e intervenções de prevenção de lesão por pressão.',
    caseIds: ['enf-caso-01'],
    dueDate: '2026-08-22',
    durationMinutes: 30,
    totalPoints: 100,
    submissionsCount: 39,
    totalStudents: 42,
    status: 'active',
    createdAt: '2026-08-12'
  }
];

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onBack }) => {
  const [classrooms, setClassrooms] = useState<Classroom[]>(MOCK_CLASSROOMS);
  const [assignments, setAssignments] = useState<Assignment[]>(MOCK_ASSIGNMENTS);
  const [activeTab, setActiveTab] = useState<'classes' | 'assignments' | 'analytics'>('classes');
  const [showCreateClassModal, setShowCreateClassModal] = useState<boolean>(false);
  const [newClassName, setNewClassName] = useState<string>('');
  const [newClassDiscipline, setNewClassDiscipline] = useState<string>('');
  const [newClassProfession, setNewClassProfession] = useState<string>('medicina');

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName) return;

    const newClass: Classroom = {
      id: `cls-${Date.now()}`,
      name: newClassName,
      code: `RH-${Math.floor(1000 + Math.random() * 9000)}`,
      discipline: newClassDiscipline || 'Ciências da Saúde',
      professionId: newClassProfession,
      teacherUid: 'current-teacher',
      teacherName: 'Prof. Atual',
      studentsCount: 0,
      activeAssignments: 0,
      createdAt: new Date().toISOString().split('T')[0],
      students: []
    };

    setClassrooms(prev => [newClass, ...prev]);
    setShowCreateClassModal(false);
    setNewClassName('');
    setNewClassDiscipline('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4" />
            Suite Acadêmica do Docente / Preceptor
          </div>
          <h2 className="text-xl sm:text-2xl font-black">Portal do Professor & Supervisor</h2>
          <p className="text-slate-300 text-xs mt-1">
            Gestão de turmas, criação de tarefas com casos clínicos e monitorização de competências individuais.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowCreateClassModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-900 text-xs font-bold shadow transition-all"
          >
            <Plus className="w-4 h-4" />
            Criar Nova Turma
          </button>
          <button
            onClick={onBack}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all"
          >
            Voltar
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('classes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'classes'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          Minhas Turmas ({classrooms.length})
        </button>

        <button
          onClick={() => setActiveTab('assignments')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'assignments'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          Tarefas & Avaliações ({assignments.length})
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'analytics'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Desempenho & Competências
        </button>
      </div>

      {/* Tab Content: Classes */}
      {activeTab === 'classes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classrooms.map(cls => (
            <div key={cls.id} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono text-xs font-bold">
                    Código: {cls.code}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">{cls.name}</h3>
                  <div className="text-xs text-slate-500 mt-0.5">{cls.discipline} • {cls.professionId}</div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-black text-slate-900 dark:text-white">{cls.studentsCount}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Estudantes</div>
                </div>
              </div>

              {/* Student list preview */}
              <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Estudantes Destaque</div>
                {cls.students.map(st => (
                  <div key={st.uid} className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{st.name}</span>
                    <span className="text-teal-600 dark:text-teal-400 font-bold">{st.avgScore}% de Média</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold">{cls.activeAssignments} Tarefas Ativas</span>
                <button className="text-teal-600 dark:text-teal-400 font-bold inline-flex items-center gap-1 hover:underline">
                  Gerenciar Turma <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Assignments */}
      {activeTab === 'assignments' && (
        <div className="space-y-3">
          {assignments.map(asg => (
            <div key={asg.id} className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400">
                  <span>{asg.classroomName}</span>
                  <span>•</span>
                  <span>Prazo: {asg.dueDate}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{asg.title}</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xl">{asg.description}</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-base font-black text-slate-900 dark:text-white">
                    {asg.submissionsCount} / {asg.totalStudents}
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Entregas</div>
                </div>

                <button className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow hover:opacity-90">
                  Ver Respostas
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Analytics */}
      {activeTab === 'analytics' && (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Mapa de Aquisição de Competências da Turma</h3>
            <p className="text-xs text-slate-500 mt-0.5">Visão consolidada do domínio de competências clínicas essenciais.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <div className="text-xs font-bold text-slate-500">Raciocínio Clínico & Diagnóstico</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">88.4%</div>
              <div className="text-[10px] text-slate-400 mt-1">Acima da média institucional</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <div className="text-xs font-bold text-slate-500">Prescrição e Conduta Segura</div>
              <div className="text-2xl font-black text-teal-600 dark:text-teal-400 mt-1">82.1%</div>
              <div className="text-[10px] text-slate-400 mt-1">Nível de proficiência adequado</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <div className="text-xs font-bold text-slate-500">Comunicação e Empatia (OSCE)</div>
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">91.0%</div>
              <div className="text-[10px] text-slate-400 mt-1">Destaque excelente na avaliação</div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create Class */}
      {showCreateClassModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Criar Nova Turma Acadêmica</h3>

            <form onSubmit={handleCreateClass} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Nome da Turma</label>
                <input 
                  type="text" 
                  value={newClassName}
                  onChange={e => setNewClassName(e.target.value)}
                  placeholder="ex: Turma Farmácia 2026.2"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Disciplina / Módulo</label>
                <input 
                  type="text" 
                  value={newClassDiscipline}
                  onChange={e => setNewClassDiscipline(e.target.value)}
                  placeholder="ex: Farmacoterapia & Interações"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Área da Saúde</label>
                <select
                  value={newClassProfession}
                  onChange={e => setNewClassProfession(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="medicina">Medicina</option>
                  <option value="enfermagem">Enfermagem</option>
                  <option value="fisioterapia">Fisioterapia</option>
                  <option value="farmacia">Farmácia</option>
                  <option value="nutricao">Nutrição</option>
                  <option value="psicologia">Psicologia</option>
                  <option value="radiologia">Radiologia</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateClassModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow"
                >
                  Criar Turma
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
