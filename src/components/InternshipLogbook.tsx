import React, { useState } from 'react';
import { InternshipPlacement, InternshipLog } from '../types';
import { 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  FileCheck, 
  Building2, 
  MapPin, 
  User, 
  BookOpen,
  Calendar
} from 'lucide-react';

interface InternshipLogbookProps {
  onBack: () => void;
}

const MOCK_PLACEMENTS: InternshipPlacement[] = [
  {
    id: 'plc-01',
    name: 'Estágio Curricular Supervisionado em Urgência & Emergência',
    unitName: 'Pronto Socorro Central & UTI Geral',
    healthFacility: 'Hospital Universitário Central',
    city: 'Luanda / Lisboa',
    professionId: 'medicina',
    supervisorName: 'Dra. Teresa Alencastro',
    supervisorEmail: 't.alencastro@hospital.org',
    totalRequiredHours: 400,
    completedHours: 260,
    status: 'in_progress'
  },
  {
    id: 'plc-02',
    name: 'Prática Clínica Integrada em Cuidados Primários e Saúde da Família',
    unitName: 'Centro de Saúde Comunitário Norte',
    healthFacility: 'Unidade Básica de Saúde',
    city: 'Porto / Luanda',
    professionId: 'enfermagem',
    supervisorName: 'Enf. Chefe Manuel Rocha',
    supervisorEmail: 'm.rocha@saude.gov',
    totalRequiredHours: 320,
    completedHours: 320,
    status: 'completed'
  }
];

const INITIAL_LOGS: InternshipLog[] = [
  {
    id: 'log-1',
    placementId: 'plc-01',
    studentUid: 'usr-1',
    date: '2026-08-12',
    hours: 8,
    activityDescription: 'Atendimento e triagem de 6 pacientes com queixas agudas no Pronto Socorro. Realização de sutura simples de antebraço e interpretação de 4 ECGs sob supervisão direta.',
    patientsAssisted: 6,
    proceduresPerformed: ['Sutura simples', 'Eletrocardiograma', 'Punção Venosa'],
    supervisorApproved: true,
    supervisorNotes: 'Excelente raciocínio clínico e postura ética no acolhimento.',
    competencyTags: ['Emergência', 'Sutura', 'ECG']
  },
  {
    id: 'log-2',
    placementId: 'plc-01',
    studentUid: 'usr-1',
    date: '2026-08-14',
    hours: 6,
    activityDescription: 'Acompanhamento do Round na UTI Geral. Discussão do desmame de ventilação mecânica e cálculo de balanço hídrico.',
    patientsAssisted: 4,
    proceduresPerformed: ['Monitorização Hemodinâmica', 'Gasometria Arterial'],
    supervisorApproved: true,
    supervisorNotes: 'Participação ativa na discussão dos casos com a equipa multiprofissional.',
    competencyTags: ['UTI', 'Ventilação Mecânica', 'Gasometria']
  }
];

export const InternshipLogbook: React.FC<InternshipLogbookProps> = ({ onBack }) => {
  const [placements] = useState<InternshipPlacement[]>(MOCK_PLACEMENTS);
  const [selectedPlacementId, setSelectedPlacementId] = useState<string>(MOCK_PLACEMENTS[0].id);
  const [logs, setLogs] = useState<InternshipLog[]>(INITIAL_LOGS);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New Log Form State
  const [newDate, setNewDate] = useState<string>('2026-08-15');
  const [newHours, setNewHours] = useState<number>(6);
  const [newPatients, setNewPatients] = useState<number>(5);
  const [newDesc, setNewDesc] = useState<string>('');
  const [newProcedures, setNewProcedures] = useState<string>('Punção Venosa, Anamnese Estruturada');

  const activePlacement = placements.find(p => p.id === selectedPlacementId) || placements[0];
  const activeLogs = logs.filter(l => l.placementId === selectedPlacementId);

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc) return;

    const newLogItem: InternshipLog = {
      id: `log-${Date.now()}`,
      placementId: selectedPlacementId,
      studentUid: 'current-user',
      date: newDate,
      hours: Number(newHours),
      activityDescription: newDesc,
      patientsAssisted: Number(newPatients),
      proceduresPerformed: newProcedures.split(',').map(s => s.trim()).filter(Boolean),
      supervisorApproved: false,
      competencyTags: ['Prática Clínica']
    };

    setLogs(prev => [newLogItem, ...prev]);
    setShowAddModal(false);
    setNewDesc('');
  };

  const progressPct = Math.min(100, Math.round((activePlacement.completedHours / activePlacement.totalRequiredHours) * 100));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Briefcase className="w-4 h-4" />
            Caderneta Digital de Estágio & Prática Clínica
          </div>
          <h2 className="text-xl sm:text-2xl font-black">Livro de Registos e Horas de Estágio</h2>
          <p className="text-slate-300 text-xs mt-1">
            Controle de carga horária, registro de atendimentos, validação de procedimentos e visto de supervisores.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-900 text-xs font-bold shadow transition-all"
          >
            <Plus className="w-4 h-4" />
            Registrar Dia de Estágio
          </button>
          <button
            onClick={onBack}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all"
          >
            Voltar
          </button>
        </div>
      </div>

      {/* Placement Selector & Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {placements.map(p => {
          const isSelected = selectedPlacementId === p.id;
          const pct = Math.round((p.completedHours / p.totalRequiredHours) * 100);

          return (
            <button
              key={p.id}
              onClick={() => setSelectedPlacementId(p.id)}
              className={`p-5 rounded-3xl border text-left transition-all flex flex-col justify-between ${
                isSelected 
                  ? 'border-teal-500 bg-teal-50/40 dark:bg-teal-950/20 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-teal-600 dark:text-teal-400 uppercase tracking-wider">{p.professionId}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    p.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {p.status === 'completed' ? 'Concluído' : 'Em Curso'}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2">
                  {p.name}
                </h4>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <Building2 className="w-3 h-3" /> {p.healthFacility}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  <span>Horas: {p.completedHours}h / {p.totalRequiredHours}h</span>
                  <span>{pct}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-teal-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, pct)}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Placement Detail & Supervisor Info */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">{activePlacement.name}</h3>
          <div className="text-xs text-slate-500 flex flex-wrap items-center gap-3 mt-1">
            <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> {activePlacement.unitName}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {activePlacement.city}</span>
            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> Supervisor: {activePlacement.supervisorName}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
            Total Registrado: {activeLogs.reduce((acc, l) => acc + l.hours, 0)} horas nesta sessão
          </span>
        </div>
      </div>

      {/* Daily Logs Table */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Registos de Atividades Clínicas Práticas
        </h3>

        <div className="space-y-3">
          {activeLogs.map(log => (
            <div key={log.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-xs font-mono font-bold flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {log.date}
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-white">
                    {log.hours} Horas de Prática
                  </span>
                  <span className="text-xs text-slate-500">
                    • {log.patientsAssisted} Pacientes Atendidos
                  </span>
                </div>

                <div>
                  {log.supervisorApproved ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-semibold">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Visto do Supervisor Aprovado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-xs font-semibold">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      Aguardando Validação do Supervisor
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {log.activityDescription}
              </p>

              {/* Procedures & Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] text-slate-400 font-semibold mr-1">Procedimentos:</span>
                {log.proceduresPerformed.map((p, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[10px] text-slate-700 dark:text-slate-200 font-medium">
                    {p}
                  </span>
                ))}
              </div>

              {log.supervisorNotes && (
                <div className="p-2.5 rounded-xl bg-teal-50/50 dark:bg-teal-950/30 text-[11px] text-teal-900 dark:text-teal-200 italic">
                  <strong>Parecer do Supervisor:</strong> "{log.supervisorNotes}"
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal to add log entry */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Registrar Turno / Atividade Prática</h3>

            <form onSubmit={handleAddLog} className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Data</label>
                  <input 
                    type="date" 
                    value={newDate} 
                    onChange={e => setNewDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Horas</label>
                  <input 
                    type="number" 
                    value={newHours} 
                    onChange={e => setNewHours(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Pacientes</label>
                  <input 
                    type="number" 
                    value={newPatients} 
                    onChange={e => setNewPatients(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Descrição do Atendimento / Casos Vistos</label>
                <textarea 
                  rows={3}
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder="Relate sucintamente os casos discutidos, condutas e decisões..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Procedimentos Realizados (separados por vírgula)</label>
                <input 
                  type="text" 
                  value={newProcedures} 
                  onChange={e => setNewProcedures(e.target.value)}
                  placeholder="ex: Ausculta, Eletrocardiograma, Gasometria"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow"
                >
                  Salvar Registo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
