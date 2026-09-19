export interface ClinicalFlowStep {
  id: string;
  name: string;
  description: string;
  formSectionKey: string;
  iconName: string;
}

export interface FormFieldDefinition {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'scale' | 'checklist' | 'vitals' | 'tags';
  options?: string[];
  placeholder?: string;
  helpText?: string;
  required?: boolean;
}

export interface FormSectionDefinition {
  id: string;
  title: string;
  description?: string;
  fields: FormFieldDefinition[];
}

export interface SpecialtyDefinition {
  id: string;
  name: string;
  description: string;
  subspecialties: string[];
  commonConditions: string[];
  recommendedInstruments: string[];
}

export interface CompetencyDefinition {
  id: string;
  code: string;
  title: string;
  domain: 'Diagnóstico' | 'Intervenção' | 'Comunicação' | 'Segurança do Paciente' | 'Ética & Deontologia' | 'Trabalho Interdisciplinar';
  level: 'Básico' | 'Intermédio' | 'Avançado' | 'Especialista';
  description: string;
}

export interface ProfessionProfile {
  id: string;
  name: string;
  code: string;
  category: string;
  iconName: string;
  color: string;
  accentBg: string;
  description: string;
  scopeOfPractice: string;
  clinicalReasoningModel: string;
  specialties: SpecialtyDefinition[];
  clinicalFlow: ClinicalFlowStep[];
  formTemplate: FormSectionDefinition[];
  competencies: CompetencyDefinition[];
  caseTypes: string[];
  triageSystem: string;
  assessmentInstruments: string[];
}

export const HEALTH_PROFESSIONS: ProfessionProfile[] = [
  {
    id: 'medicina',
    name: 'Medicina',
    code: 'MED',
    category: 'Ciências Médicas',
    iconName: 'Stethoscope',
    color: 'text-blue-600 dark:text-blue-400',
    accentBg: 'bg-blue-500/10 border-blue-500/30',
    description: 'Diagnóstico médico, investigação etiológica, farmacoterapia, cirurgia e gestão clínica integral.',
    scopeOfPractice: 'Diagnóstico nosológico, prescrição médica, procedimentos cirúrgicos e invasivos, formulação de conduta diagnóstica e terapêutica.',
    clinicalReasoningModel: 'Hipotético-Dedutivo & Diagnóstico Diferencial (Anamnese → Exame Físico → Hipóteses → Exames Complementares → Diagnóstico Nosológico → Conduta Farmacológica/Cirúrgica/Seguimento)',
    specialties: [
      {
        id: 'med-clinica',
        name: 'Clínica Médica / Medicina Interna',
        description: 'Abordagem diagnóstica e terapêutica de patologias em adultos.',
        subspecialties: ['Cardiologia', 'Pneumologia', 'Gastroenterologia', 'Nefrologia', 'Endocrinologia', 'Reumatologia', 'Infectologia', 'Hematologia'],
        commonConditions: ['Insuficiência Cardíaca', 'DPOC Descompensada', 'Diabetes Mellitus Descompensada', 'Sepse', 'Pneumonia Adquirida na Comunidade', 'Insuficiência Renal Aguda'],
        recommendedInstruments: ['Escore de Framingham', 'CURB-65', 'Escore qSOFA', 'Escore Wells', 'TIMI Risk Score']
      },
      {
        id: 'med-emergencia',
        name: 'Medicina de Emergência e Cuidados Intensivos',
        description: 'Estabilização crítica, ressuscitação e suporte avançado de vida.',
        subspecialties: ['Trauma', 'Emergências Cardiológicas', 'Insuficiência Respiratória Aguda', 'Choque', 'Toxicologia'],
        commonConditions: ['Infarto Agudo do Miocárdio', 'Acidente Vascular Cerebral Agudo', 'Choque Séptico', 'Politraumatismo', 'Paragem Cardiorrespiratória'],
        recommendedInstruments: ['Glasgow Coma Scale', 'APACHE II', 'Sofa Score', 'Protocolo ACLS', 'Protocolo ATLS']
      },
      {
        id: 'med-cirurgia',
        name: 'Cirurgia Geral e Especializada',
        description: 'Manejo pré, intra e pós-operatório e patologias cirúrgicas agudas.',
        subspecialties: ['Cirurgia do Aparelho Digestivo', 'Cirurgia Torácica', 'Cirurgia Vascular', 'Neurocirurgia', 'Ortopedia'],
        commonConditions: ['Apendicite Aguda', 'Colecistite Aguda', 'Oclusão Intestinal', 'Hemorragia Digestiva', 'Trauma Cranioencefálico'],
        recommendedInstruments: ['Escore Alvarado', 'Classificação ASA', 'Checklist de Cirurgia Segura OMS']
      },
      {
        id: 'med-pediatria',
        name: 'Pediatria e Neonatologia',
        description: 'Desenvolvimento, puericultura e patologias infantis da infância à adolescência.',
        subspecialties: ['Neonatologia', 'Cardiologia Pediátrica', 'Pneumopediatria', 'Infectopediatria'],
        commonConditions: ['Bronquiolite Viral Aguda', 'Desidratação Aguda', 'Crise Asmática na Criança', 'Convulsão Febril', 'Icterícia Neonatal'],
        recommendedInstruments: ['Escore de Apgar', 'Tabelas OMS de Crescimento', 'Escore PALS']
      }
    ],
    clinicalFlow: [
      { id: 'step-anamnese', name: 'História Clínica (Anamnese)', description: 'Queixa principal, HDA, antecedentes pessoais/familiares e hábitos', formSectionKey: 'sec-anamnese', iconName: 'FileText' },
      { id: 'step-exame-fisico', name: 'Exame Físico Geral e Específico', description: 'Ectoscopia, sinais vitais e avaliação segmentar de sistemas', formSectionKey: 'sec-exame-fisico', iconName: 'Search' },
      { id: 'step-hipoteses', name: 'Hipóteses & Diagnóstico Diferencial', description: 'Elaboração de diagnósticos sindrômicos e diagnósticos nosológicos prováveis', formSectionKey: 'sec-hipoteses', iconName: 'HelpCircle' },
      { id: 'step-exames-comp', name: 'Investigação Complementar', description: 'Exames laboratoriais, eletrocardiograma, imagiologia e biópsias', formSectionKey: 'sec-exames', iconName: 'Activity' },
      { id: 'step-diagnostico', name: 'Diagnóstico Definitivo / Conclusão', description: 'Confirmação diagnóstica baseada em evidências clínicas e exames', formSectionKey: 'sec-diagnostico', iconName: 'CheckCircle' },
      { id: 'step-conduta', name: 'Conduta Terapêutica & Prescrição', description: 'Medidas não farmacológicas, farmacoterapia, indicação cirúrgica e encaminhamento', formSectionKey: 'sec-conduta', iconName: 'Shield' }
    ],
    formTemplate: [
      {
        id: 'sec-anamnese',
        title: 'Anamnese Médica',
        fields: [
          { id: 'qp', label: 'Queixa Principal (QP)', type: 'text', placeholder: 'Ex: Dor torácica opressiva há 2 horas', required: true },
          { id: 'hda', label: 'História da Doença Atual (HDA)', type: 'textarea', placeholder: 'Início, localização, irradiação, intensidade, fatores de melhora/piora...', required: true },
          { id: 'is', label: 'Interrogatório Sintomatológico (ISDA)', type: 'textarea', placeholder: 'Sintomas cardiovasculares, respiratórios, gastrointestinais...' },
          { id: 'ant_pessoais', label: 'Antecedentes Pessoais Patológicos', type: 'text', placeholder: 'HAS, DM2, dislipidemia, cirurgias prévias...' },
          { id: 'alergias', label: 'Alergias Medicamentosas', type: 'text', placeholder: 'Nega ou especificar...' }
        ]
      },
      {
        id: 'sec-exame-fisico',
        title: 'Exame Clínico Objetivo',
        fields: [
          { id: 'vitals', label: 'Sinais Vitais (PA, FC, FR, SpO2, Temp)', type: 'vitals', required: true },
          { id: 'ectoscopia', label: 'Ectoscopia / Estado Geral', type: 'text', placeholder: 'LOTE, anictérico, acianótico, perfusão periférica...' },
          { id: 'ap_cardio', label: 'Aparelho Cardiovascular', type: 'text', placeholder: 'Ritmo cardíaco, bulhas normofonéticas, sopros...' },
          { id: 'ap_resp', label: 'Aparelho Respiratório', type: 'text', placeholder: 'Murmúrio vesicular, ruídos adventícios...' },
          { id: 'abdome', label: 'Exame Abdominal', type: 'text', placeholder: 'Plano, ruídos hidroaéreos, indolor à palpação, descompressão...' }
        ]
      },
      {
        id: 'sec-hipoteses',
        title: 'Raciocínio Clínico & Diagnóstico Diferencial',
        fields: [
          { id: 'hipotese_principal', label: 'Hipótese Diagnóstica Principal', type: 'text', required: true },
          { id: 'diagnosticos_diferenciais', label: 'Diagnósticos Diferenciais a Descartar', type: 'textarea', required: true },
          { id: 'estratificacao_risco', label: 'Estratificação de Risco / Escore Clínico', type: 'text', placeholder: 'Ex: TIMI 4, GRACE 142, Wells alto...' }
        ]
      },
      {
        id: 'sec-exames',
        title: 'Exames Complementares Solicitados',
        fields: [
          { id: 'laboratorio', label: 'Exames Laboratoriais (Hemograma, Marcadores, Função Renal)', type: 'textarea' },
          { id: 'imagem_graficos', label: 'Exames de Imagem / ECG / Outros', type: 'textarea' },
          { id: 'interpretacao_achados', label: 'Interpretação dos Achados Críticos', type: 'textarea' }
        ]
      },
      {
        id: 'sec-conduta',
        title: 'Conduta Médica & Prescrição',
        fields: [
          { id: 'medidas_imediatas', label: 'Medidas Gerais e Suporte Imediato', type: 'textarea', placeholder: 'Monitorização contínua, oxigenoterapia se SpO2 < 90%, acesso venoso...' },
          { id: 'prescricao', label: 'Prescrição Farmacológica (Doses e Vias)', type: 'textarea', placeholder: '1. AAS 300mg VO mastigável\n2. Clopidogrel 300mg VO\n3. Nitroglicerina EV...', required: true },
          { id: 'plano_seguimento', label: 'Critérios de Alta / Transferência / Reavaliação', type: 'textarea' }
        ]
      }
    ],
    competencies: [
      { id: 'comp-med-1', code: 'MED-01', title: 'Diagnóstico Diferencial Síndromes Cardiovasculares', domain: 'Diagnóstico', level: 'Avançado', description: 'Capacidade de diferenciar dor torácica coronariana de causas aórticas, pulmonares e esofágicas.' },
      { id: 'comp-med-2', code: 'MED-02', title: 'Prescrição Racional e Segurança Farmacológica', domain: 'Intervenção', level: 'Avançado', description: 'Prescrição adequada respeitando função renal, interações medicamentosas e diretrizes atualizadas.' },
      { id: 'comp-med-3', code: 'MED-03', title: 'Comunicação de Notícias Difíceis (SPIKES)', domain: 'Comunicação', level: 'Intermédio', description: 'Aplicação do protocolo SPIKES para transmissão ética e empática de diagnósticos graves.' }
    ],
    caseTypes: ['Emergência / UTI', 'Ambulatorial / Consultório', 'Internamento Hospitalar', 'Diagnóstico Diferencial Complexo', 'Cirúrgico Pré/Pós-Op'],
    triageSystem: 'Protocolo de Manchester / ESI (Emergency Severity Index)',
    assessmentInstruments: ['Glasgow', 'CURB-65', 'Wells', 'Framingham', 'SOFA', 'APACHE II', 'Child-Pugh']
  },
  {
    id: 'enfermagem',
    name: 'Enfermagem',
    code: 'ENF',
    category: 'Ciências de Enfermagem',
    iconName: 'HeartPulse',
    color: 'text-emerald-600 dark:text-emerald-400',
    accentBg: 'bg-emerald-500/10 border-emerald-500/30',
    description: 'Processo de Enfermagem, Sistematização da Assistência (SAE), cuidados intensivos, segurança do paciente e gestão do cuidado.',
    scopeOfPractice: 'Consulta de enfermagem, diagnósticos de enfermagem (NANDA-I), prescrição de cuidados (NIC), resultados esperados (NOC), procedimentos invasivos e cuidados contínuos.',
    clinicalReasoningModel: 'Processo de Enfermagem / SAE (Coleta de Dados → Diagnóstico de Enfermagem NANDA → Planejamento NOC → Implementação NIC → Avaliação/Evolução SOAPIE)',
    specialties: [
      {
        id: 'enf-med-cirurgica',
        name: 'Enfermagem Médico-Cirúrgica e UTI',
        description: 'Cuidados críticos ao paciente hemodinamicamente instável e pós-operatório complexo.',
        subspecialties: ['Terapia Intensiva', 'Centro Cirúrgico', 'Urgência e Emergência', 'Cardiologia Intensiva'],
        commonConditions: ['Sepse / Choque', 'Insuficiência Respiratória em Ventilação Mecânica', 'Politrauma', 'Pós-operatório de Cirurgia Cardíaca'],
        recommendedInstruments: ['Escala de Braden', 'Escala de Morse', 'Escala de RASS', 'Escala de CAM-ICU', 'Escala de Glasgow']
      },
      {
        id: 'enf-materno-infantil',
        name: 'Enfermagem Obstétrica e Pediátrica',
        description: 'Assistência ao parto humanizado, puerpério, cuidados neonatais e pediátricos.',
        subspecialties: ['Obstetrícia', 'Neonatologia / UTIN', 'Pediatria Clínica'],
        commonConditions: ['Pré-eclâmpsia', 'Trabalho de Parto', 'Prematuridade Extrema', 'Distúrbios Respiratórios Neonatais'],
        recommendedInstruments: ['Partograma OMS', 'Escala de Silverman-Andersen', 'Escore de Apgar']
      },
      {
        id: 'enf-saude-comunitaria',
        name: 'Enfermagem Comunitária e Saúde da Família',
        description: 'Vigilância em saúde, imunização, acompanhamento de doenças crónicas e consultas de enfermagem.',
        subspecialties: ['Atenção Primária', 'Saúde Mental Comunitária', 'Tratamento de Feridas Crónicas'],
        commonConditions: ['Úlceras de Perna / Lesão por Pressão', 'Pé Diabético', 'Hipertensão Arterial não Controlada', 'Puericultura'],
        recommendedInstruments: ['Escala PUSH (Feridas)', 'Genograma e Ecomapa', 'Calendário Vacinal']
      }
    ],
    clinicalFlow: [
      { id: 'step-historico-enf', name: 'Histórico & Investigação de Enfermagem', description: 'Entrevista de enfermagem, exame físico céfalo-caudal e identificação de necessidades humanas básicas', formSectionKey: 'sec-hist-enf', iconName: 'ClipboardList' },
      { id: 'step-diagnostico-nanda', name: 'Diagnósticos de Enfermagem (NANDA-I)', description: 'Formulação de diagnósticos com título, fatores relacionados e características definidoras', formSectionKey: 'sec-diag-nanda', iconName: 'Tag' },
      { id: 'step-planeamento-noc', name: 'Planejamento de Resultados (NOC)', description: 'Metas e indicadores de resultados esperados para o paciente', formSectionKey: 'sec-plan-noc', iconName: 'Target' },
      { id: 'step-intervencoes-nic', name: 'Prescrição & Intervenções (NIC)', description: 'Ações de enfermagem, cuidados prescritos, vias, frequência e procedimentos', formSectionKey: 'sec-interv-nic', iconName: 'Zap' },
      { id: 'step-evolucao-soapie', name: 'Evolução de Enfermagem (SOAPIE)', description: 'Registro sistemático: Subjetivo, Objetivo, Avaliação, Plano, Intervenção, Evolução', formSectionKey: 'sec-evol-soapie', iconName: 'FileCheck' }
    ],
    formTemplate: [
      {
        id: 'sec-hist-enf',
        title: 'Histórico de Enfermagem & Avaliação Céfalo-Caudal',
        fields: [
          { id: 'motivo_internamento', label: 'Motivo do Internamento / Queixa do Paciente', type: 'text', required: true },
          { id: 'nivel_consciencia', label: 'Nível de Consciência & Escala RASS / Glasgow', type: 'text', placeholder: 'Alerta, orientado no tempo e espaço...' },
          { id: 'integridade_cutanea', label: 'Integridade Cutânea & Risco de Lesão (Braden)', type: 'select', options: ['Pele íntegra', 'Risco Leve (Braden 15-18)', 'Risco Moderado (Braden 13-14)', 'Alto Risco (Braden 10-12)', 'Risco Severo (Braden ≤9)'], required: true },
          { id: 'dispositivos_invasivos', label: 'Dispositivos Invasivos em Uso', type: 'text', placeholder: 'CVC em subclávia D (D3), SVD em sistema fechado, TOT nº 8.0...' },
          { id: 'risco_quedas', label: 'Avaliação de Risco de Quedas (Morse)', type: 'select', options: ['Baixo Risco (0-24)', 'Risco Médio (25-44)', 'Alto Risco (≥45)'] }
        ]
      },
      {
        id: 'sec-diag-nanda',
        title: 'Diagnósticos de Enfermagem (Taxonomia NANDA-I)',
        fields: [
          { id: 'diag_enf_1', label: 'Diagnóstico 1 (Título + Fatores Relacionados + Evidências)', type: 'textarea', placeholder: 'Ex: Padrão respiratório ineficaz relacionado à fadiga muscular evidenciado por dispneia e uso de musculatura acessória.', required: true },
          { id: 'diag_enf_2', label: 'Diagnóstico 2 (Risco ou Real)', type: 'textarea', placeholder: 'Ex: Risco de lesão por pressão relacionado à imobilidade física e umidade.' },
          { id: 'diag_enf_3', label: 'Diagnóstico 3', type: 'textarea' }
        ]
      },
      {
        id: 'sec-plan-noc',
        title: 'Resultados Esperados (NOC)',
        fields: [
          { id: 'metas_curto_prazo', label: 'Metas a Curto Prazo (24h - 48h)', type: 'textarea', placeholder: 'Manter SpO2 > 94% com parâmetros ventilatórios protetores...', required: true },
          { id: 'indicadores_sucesso', label: 'Indicadores de Sucesso Clínico', type: 'text' }
        ]
      },
      {
        id: 'sec-interv-nic',
        title: 'Prescrição e Cuidados de Enfermagem (NIC)',
        fields: [
          { id: 'prescricao_cuidados', label: 'Plano de Cuidados de Enfermagem', type: 'textarea', placeholder: '1. Manter cabeceira elevada a 30-45° continuamente;\n2. Realizar mudança de decúbito de 2/2h;\n3. Aspiração traqueal em sistema fechado se ruídos adventícios;\n4. Monitorizar balanço hídrico rigoroso de 2/2h;\n5. Curativo oclusivo estéril em inserção de CVC com clorexidina alcoólica.', required: true }
        ]
      },
      {
        id: 'sec-evol-soapie',
        title: 'Evolução de Enfermagem (Metodologia SOAPIE)',
        fields: [
          { id: 'soapie_text', label: 'Registro da Evolução de Enfermagem', type: 'textarea', placeholder: 'S: Paciente relata alívio da dor...\nO: Afebril, PA 120/75, FC 78 bpm, diurese clara...\nA: Melhora da dinâmica respiratória...\nP: Mantido plano de cuidados...\nI: Administrada medicação analgésica conforme prescrição...\nE: Paciente calmo, refere ausência de dor após 30min.', required: true }
        ]
      }
    ],
    competencies: [
      { id: 'comp-enf-1', code: 'ENF-01', title: 'Sistematização da Assistência e NANDA/NIC/NOC', domain: 'Diagnóstico', level: 'Avançado', description: 'Capacidade de construir raciocínio diagnóstico de enfermagem estruturado com fundamentação teórica.' },
      { id: 'comp-enf-2', code: 'ENF-02', title: 'Segurança na Administração de Medicamentos', domain: 'Segurança do Paciente', level: 'Avançado', description: 'Aplicação dos 9 certos da administração medicamentosa e dupla checagem de eletrólitos/alto risco.' },
      { id: 'comp-enf-3', code: 'ENF-03', title: 'Prevenção de Infecções Relacionadas à Assistência (IRAS)', domain: 'Segurança do Paciente', level: 'Intermédio', description: 'Aplicação de bundles para prevenção de PAV, ITU-AC e IPCS.' }
    ],
    caseTypes: ['Cuidados Críticos em UTI', 'Centro Cirúrgico & Perioperatório', 'Saúde Materno-Infantil', 'Urgência e Triagem Manchester', 'Atenção Básica e Consulta de Enfermagem'],
    triageSystem: 'Protocolo de Manchester / ESI',
    assessmentInstruments: ['Escala de Braden', 'Escala de Morse', 'Escala RASS', 'CAM-ICU', 'Partograma', 'Push Scale']
  },
  {
    id: 'fisioterapia',
    name: 'Fisioterapia',
    code: 'FISIO',
    category: 'Ciências da Reabilitação',
    iconName: 'Activity',
    color: 'text-amber-600 dark:text-amber-400',
    accentBg: 'bg-amber-500/10 border-amber-500/30',
    description: 'Diagnóstico cinesiológico-funcional, biomecânica, reabilitação neuromusculoesquelética, cinesioterapia e terapia intensiva.',
    scopeOfPractice: 'Avaliação funcional e postural, testes ortopédicos especiais, eletrotermofototerapia, prescrição de cinesioterapia, reabilitação respiratória e desmame ventilatório.',
    clinicalReasoningModel: 'Classificação Internacional de Funcionalidade (CIF) & Diagnóstico Cinesiológico Funcional (Anamnese Funcional → Avaliação Biomecânica/Especial → Diagnóstico Funcional → Objetivos Terapêuticos → Prescrição Cinesioterapêutica → Reavaliação Funcional)',
    specialties: [
      {
        id: 'fisio-ortopedia',
        name: 'Fisioterapia Traumato-Ortopédica e Desportiva',
        description: 'Reabilitação de lesões musculotendíneas, articulares, pós-operatórios ortopédicos e retorno ao desporto.',
        subspecialties: ['Membro Superior e Ombro', 'Coluna Vertebral e Pelve', 'Joelho e Tornozelo', 'Biomecânica da Corrida'],
        commonConditions: ['Lesão de Ligamento Cruzado Anterior (LCA)', 'Lombalgia Mecânica / Hérnia Discal', 'Tendinopatia do Manguito Rotador', 'Entorse de Tornozelo', 'Síndrome Patelofemoral'],
        recommendedInstruments: ['Goniometria', 'Escala de Oxford (Força)', 'Escala EVA (Dor)', 'Questionário DASH', 'Questionário Roland-Morris', 'Y-Balance Test']
      },
      {
        id: 'fisio-neuro',
        name: 'Fisioterapia Neurofuncional',
        description: 'Recuperação motora, controlo postural, marcha e plasticidade neural em doentes neurológicos.',
        subspecialties: ['Neurologia do Adulto', 'Neuropediatria', 'Reabilitação Vestibular'],
        commonConditions: ['Sequelas de AVC', 'Doença de Parkinson', 'Traumatismo Raquimedular', 'Paralisia Cerebral', 'Esclerose Múltipla'],
        recommendedInstruments: ['Escala de Ashworth Modificada (Espasticidade)', 'Escala de Equilíbrio de Berg', 'Timed Up and Go (TUG)', 'Fugl-Meyer', 'Escala de Barthel']
      },
      {
        id: 'fisio-resp-uti',
        name: 'Fisioterapia Respiratória e Terapia Intensiva',
        description: 'Mecânica respiratória, mobilização precoce, higiene brônquica e condução de ventilação mecânica.',
        subspecialties: ['UTI Adulto', 'UTI Neonatal/Pediátrica', 'Reabilitação Pulmonar Ambulatorial'],
        commonConditions: ['SDRA', 'DPOC Agudizada', 'Atelectasias', 'Desmame Difícil da Ventilação Mecânica', 'Polineuropatia do Doente Crítico'],
        recommendedInstruments: ['Manovacuometria (PImáx/PEmáx)', 'Pletismografia / Espirometria', 'Índice de Tobin (f/Vt)', 'Escala Chelsea de Mobilidade (CPAx)']
      }
    ],
    clinicalFlow: [
      { id: 'step-anamnese-func', name: 'Anamnese Funcional & História Clínica', description: 'Queixa funcional principal, mecanismo de lesão, impacto em AVDs e objetivos do paciente', formSectionKey: 'sec-anamnese-fisio', iconName: 'UserCheck' },
      { id: 'step-exame-biomecanico', name: 'Exame Biomecânico & Testes Especiais', description: 'Avaliação postural, goniometria, testes ortopédicos provocativos, palpação e força muscular', formSectionKey: 'sec-exame-biomecanico', iconName: 'Move' },
      { id: 'step-diag-funcional', name: 'Diagnóstico Cinesiológico-Funcional (CIF)', description: 'Identificação de disfunções do movimento, limitações de atividade e restrições na participação', formSectionKey: 'sec-diag-funcional', iconName: 'ShieldAlert' },
      { id: 'step-plano-cinesio', name: 'Plano Terapêutico & Prescrição de Exercícios', description: 'Cinesioterapia, terapia manual, recursos eletroterapêuticos, dosagem e progressão', formSectionKey: 'sec-plano-cinesio', iconName: 'PlayCircle' },
      { id: 'step-reavaliacao', name: 'Reavaliação Funcional & Critérios de Alta', description: 'Mensuração de ganhos de amplitude, força, funcionalidade e critérios de retorno à atividade/esporte', formSectionKey: 'sec-reavaliacao', iconName: 'TrendingUp' }
    ],
    formTemplate: [
      {
        id: 'sec-anamnese-fisio',
        title: 'Anamnese Cinesiológico-Funcional',
        fields: [
          { id: 'queixa_funcional', label: 'Queixa Funcional Principal', type: 'text', placeholder: 'Ex: Incapacidade de agachar e correr devido a instabilidade no joelho D', required: true },
          { id: 'mecanismo_lesao', label: 'Mecanismo de Lesão & Histórico da Disfunção', type: 'textarea', placeholder: 'Entorse com rotação externa há 3 semanas durante jogo de futebol...', required: true },
          { id: 'impacto_avds', label: 'Impacto nas Atividades da Vida Diária (AVDs / Esporte)', type: 'textarea', placeholder: 'Dificuldade para subir escadas, claudicação...' },
          { id: 'dor_eva', label: 'Intensidade da Dor (Escala Visual Analógica 0-10)', type: 'select', options: ['0 (Sem dor)', '1', '2', '3', '4', '5 (Moderada)', '6', '7', '8', '9', '10 (Insuportável)'], required: true }
        ]
      },
      {
        id: 'sec-exame-biomecanico',
        title: 'Avaliação Física, Postural & Testes Especiais',
        fields: [
          { id: 'inspecao_palpacao', label: 'Inspeção Estática/Dinâmica & Palpação', type: 'textarea', placeholder: 'Edema articular (++), hipertermia local, hipotrofia de quadríceps...' },
          { id: 'adm_goniometria', label: 'Amplitude de Movimento (ADM / Goniometria)', type: 'text', placeholder: 'Flexão joelho D: 95° (E: 135°); Extensão joelho D: -5° (E: 0°)' },
          { id: 'forca_oxford', label: 'Força Muscular (Graus de Oxford 0 a 5)', type: 'text', placeholder: 'Quadríceps D: Grau 3+; Isquiotibiais D: Grau 4' },
          { id: 'testes_ortopedicos', label: 'Testes Clínicos Especiais Realizados', type: 'textarea', placeholder: 'Lachman (+), Gaveta Anterior (+), Pivot-Shift (+), Menisco/McMurray (-)', required: true }
        ]
      },
      {
        id: 'sec-diag-funcional',
        title: 'Diagnóstico Cinesiológico-Funcional (Framework CIF)',
        fields: [
          { id: 'diagnostico_cif', label: 'Diagnóstico Funcional', type: 'textarea', placeholder: 'Disfunção na estabilidade ligamentar do joelho direito associada a déficit de força de extensores e restrição na marcha e corrida.', required: true },
          { id: 'fatores_ambientais_pessoais', label: 'Fatores Pessoais e Contextuais', type: 'text', placeholder: 'Atleta amador motivado, boa rede de apoio familiar.' }
        ]
      },
      {
        id: 'sec-plano-cinesio',
        title: 'Conduta Fisioterapêutica & Prescrição Cinesioterapêutica',
        fields: [
          { id: 'objetivos_curto_medio', label: 'Objetivos Fisioterapêuticos (Curto e Médio Prazo)', type: 'textarea', placeholder: '1. Controle do quadro álgico e edema;\n2. Ganho de extensão completa (0°);\n3. Ativação isométrica e recrutamento de vasto medial.', required: true },
          { id: 'prescricao_cinesioterapia', label: 'Prescrição Detalhada de Exercícios & Recursos', type: 'textarea', placeholder: '1. Crioterapia por 20min pós-sessão;\n2. Eletroestimulação NMES no quadríceps associada a extensão ativa;\n3. SLR (Straight Leg Raise) 3x10 repetições;\n4. Treino proprioceptivo em descarga parcial de peso.', required: true }
        ]
      }
    ],
    competencies: [
      { id: 'comp-fisio-1', code: 'FIS-01', title: 'Execução e Interpretação de Testes Ortopédicos', domain: 'Diagnóstico', level: 'Avançado', description: 'Conhecimento da acurácia, sensibilidade e especificidade de testes ortopédicos especiais.' },
      { id: 'comp-fisio-2', code: 'FIS-02', title: 'Prescrição Cinesioterapêutica Baseada em Evidências', domain: 'Intervenção', level: 'Avançado', description: 'Dosagem precisa de volume, intensidade, biomecânica e progressão neuromuscular de exercícios.' },
      { id: 'comp-fisio-3', code: 'FIS-03', title: 'Condução de Desmame e Ventilação Mecânica na UTI', domain: 'Intervenção', level: 'Especialista', description: 'Avaliação de mecânica pulmonar e aplicação de protocolos de desmame e mobilização precoce.' }
    ],
    caseTypes: ['Traumato-Ortopédico e Desportivo', 'Neurológico Adulto e Pediátrico', 'Respiratório e Terapia Intensiva', 'Reabilitação Cardiovascular', 'Saúde da Mulher e Pélvica'],
    triageSystem: 'Rastreio de Bandeiras Vermelhas (Red Flags) e Amarelas (Yellow Flags)',
    assessmentInstruments: ['Goniometria', 'Escala Ashworth', 'Escala Berg', 'TUG', 'Índice de Barthel', 'DASH', 'Roland-Morris', 'Manovacuometria']
  },
  {
    id: 'farmacia',
    name: 'Farmácia',
    code: 'FARM',
    category: 'Ciências Farmacêuticas',
    iconName: 'Pill',
    color: 'text-purple-600 dark:text-purple-400',
    accentBg: 'bg-purple-500/10 border-purple-500/30',
    description: 'Farmácia clínica, conciliação medicamentosa, farmacocinética, identificação de reações adversas e gestão farmacoterapêutica.',
    scopeOfPractice: 'Análise de prescrições, identificação de problemas relacionados a medicamentos (PRMs), ajuste de dose em disfunção renal/hepática, monitorização terapêutica e aconselhamento ao paciente.',
    clinicalReasoningModel: 'Método Dáder / Soap Farmacêutico (História Farmacoterapêutica → Conciliação Medicamentosa → Identificação de PRMs / Interações → Intervenção Farmacêutica → Plano de Seguimento)',
    specialties: [
      {
        id: 'farm-clinica',
        name: 'Farmácia Clínica e Hospitalar',
        description: 'Manejo farmacoterapêutico no leito hospitalar e unidades de terapia intensiva.',
        subspecialties: ['Farmacocinética Clínica', 'Antimicrobial Stewardship', 'Nutrição Parenteral', 'Farmácia Oncológica'],
        commonConditions: ['Toxicidade por Vancomicina/Aminoglicosídeos', 'Interações de Anticoagulantes Orais', 'Ajuste de Dose em DRC', 'Reações Adversas a Quimioterápicos'],
        recommendedInstruments: ['Fórmula Cockcroft-Gault (ClCr)', 'Critérios de Beers (Geriatria)', 'Critérios STOPP/START', 'Tabela de Compatibilidade Y-Site']
      },
      {
        id: 'farm-comunitaria',
        name: 'Farmácia Comunitária e Atenção Farmacêutica',
        description: 'Dispensação orientada, adesão terapêutica em doenças crónicas e automedicação responsável.',
        subspecialties: ['Cuidado ao Paciente Diabético e Hipertenso', 'Educação em Saúde', 'Farmacovigilância'],
        commonConditions: ['Polifarmácia no Idoso', 'Não Adesão ao Tratamento Anti-hipertensivo', 'Interações Alimento-Medicamento'],
        recommendedInstruments: ['Teste de Morisky-Green (Adesão)', 'Questionário Haynes-Sackett', 'Calculadora de Equivalência de Estatinas']
      }
    ],
    clinicalFlow: [
      { id: 'step-anamnese-farm', name: 'História Farmacoterapêutica', description: 'Levantamento de todos os medicamentos de uso contínuo, fitoterápicos, automedicação e alergias', formSectionKey: 'sec-anamnese-farm', iconName: 'ListOrdered' },
      { id: 'step-conciliacao', name: 'Conciliação Medicamentosa & Exames', description: 'Cruzamento da prescrição atual com histórico, função renal/hepática e exames laboratoriais', formSectionKey: 'sec-conciliacao', iconName: 'Shuffle' },
      { id: 'step-ident-prms', name: 'Identificação de PRMs & Interações', description: 'Classificação de Problemas Relacionados a Medicamentos (Necessidade, Efetividade, Segurança)', formSectionKey: 'sec-ident-prms', iconName: 'AlertTriangle' },
      { id: 'step-interv-farm', name: 'Intervenção Farmacêutica Proposta', description: 'Recomendação técnica fundamentada ao prescritor (ajuste de dose, troca de fármaco, desmame)', formSectionKey: 'sec-interv-farm', iconName: 'FileEdit' },
      { id: 'step-seguimento-farm', name: 'Plano de Seguimento & Orientação ao Paciente', description: 'Orientações de administração, monitorização de efeitos adversos e calendário posológico', formSectionKey: 'sec-seguimento-farm', iconName: 'Calendar' }
    ],
    formTemplate: [
      {
        id: 'sec-anamnese-farm',
        title: 'História Farmacoterapêutica do Paciente',
        fields: [
          { id: 'medicamentos_em_uso', label: 'Medicamentos em Uso (Fármaco, Dose, Posologia, Tempo)', type: 'textarea', placeholder: '1. Enalapril 20mg 12/12h\n2. Espironolactona 25mg 1x/dia\n3. Metformina 850mg 2x/dia\n4. Omeprazol 20mg em jejum...', required: true },
          { id: 'automedicacao_fitoterapicos', label: 'Automedicação, Chás, Suplementos e Fitoterápicos', type: 'text', placeholder: 'Uso de AINE (Ibuprofeno) frequente por conta própria...' },
          { id: 'adesao_terapeutica', label: 'Nível de Adesão Farmacoterapêutica', type: 'select', options: ['Adesão Completa (Morisky 4)', 'Média Adesão (Morisky 2-3)', 'Baixa Adesão (Morisky 0-1)'], required: true }
        ]
      },
      {
        id: 'sec-ident-prms',
        title: 'Avaliação de PRMs, Interações e Toxicidade',
        fields: [
          { id: 'taxonomia_prm', label: 'Classificação do Problema Relacionado ao Medicamento', type: 'select', options: ['PRM 1: Medicamento Não Necessário', 'PRM 2: Necessidade de Medicamento Adicional', 'PRM 3: Inefetividade Não Quantitativa', 'PRM 4: Inefetividade Quantitativa (Subdose)', 'PRM 5: Insegurança Não Quantitativa (RAM)', 'PRM 6: Insegurança Quantitativa (Sobredose)'], required: true },
          { id: 'descricao_interacao_risco', label: 'Descrição da Interação Fármaco-Fármaco ou Fármaco-Doença', type: 'textarea', placeholder: 'Risco de hipercalemia grave pela associação de Enalapril + Espironolactona + AINE com ClCr estimado em 32 mL/min.', required: true }
        ]
      },
      {
        id: 'sec-interv-farm',
        title: 'Intervenção Farmacêutica e Conduta',
        fields: [
          { id: 'proposta_intervencao', label: 'Proposta de Intervenção Farmacêutica', type: 'textarea', placeholder: 'Sugerido ao médico assistente suspender Ibuprofeno, reavaliar eletrólitos séricos (K+) em 48h e ajustar posologia conforme ClCr.', required: true },
          { id: 'grau_aceitacao', label: 'Status da Intervenção', type: 'select', options: ['Proposta Aceita com Alteração de Prescrição', 'Proposta sob Análise da Equipa', 'Proposta Não Aceita com Justificativa'] }
        ]
      }
    ],
    competencies: [
      { id: 'comp-farm-1', code: 'FAR-01', title: 'Farmacocinética Clínica e Ajuste de Doses', domain: 'Intervenção', level: 'Avançado', description: 'Capacidade de calcular depuração renal e propor regimes terapêuticos individualizados.' },
      { id: 'comp-farm-2', code: 'FAR-02', title: 'Identificação e Manejo de Interações Medicamentosas', domain: 'Segurança do Paciente', level: 'Avançado', description: 'Reconhecimento precoce de interações farmacocinéticas e farmacodinâmicas graves.' }
    ],
    caseTypes: ['Conciliação Medicamentosa Hospitalar', 'Ajuste Farmacocinético em UTI', 'Atenção Farmacêutica em Polifarmácia', 'Manejo de Reações Adversas Graves', 'Dispensação e Orientação Clínica'],
    triageSystem: 'Estratificação de Complexidade Farmacoterapêutica',
    assessmentInstruments: ['Cockcroft-Gault', 'Critérios Beers', 'Critérios STOPP/START', 'Morisky-Green', 'Algoritmo de Naranjo (RAM)']
  },
  {
    id: 'nutricao',
    name: 'Nutrição e Dietética',
    code: 'NUTRI',
    category: 'Ciências da Nutrição',
    iconName: 'Apple',
    color: 'text-lime-600 dark:text-lime-400',
    accentBg: 'bg-lime-500/10 border-lime-500/30',
    description: 'Diagnóstico nutricional, avaliação antropométrica, terapia nutricional enteral/parenteral e dietoterapia personalizada.',
    scopeOfPractice: 'Avaliação do estado nutricional, cálculo de necessidades energéticas e de macronutrientes, prescrição dietoterápica e monitorização de dietas hospitalares.',
    clinicalReasoningModel: 'Processo de Cuidado Nutricional (PCN) (Avaliação Nutricional → Diagnóstico Nutricional PES → Intervenção Dietética → Monitorização e Reavaliação)',
    specialties: [
      {
        id: 'nutri-clinica-hosp',
        name: 'Nutrição Clínica e Terapia Nutricional Hospitalar',
        description: 'Cuidado nutricional em pacientes internados, oncológicos, desnutridos e em TNE/TNP.',
        subspecialties: ['Terapia Nutricional Enteral e Parenteral', 'Nutrição em Nefrologia', 'Nutrição Oncológica'],
        commonConditions: ['Desnutrição Hospitalar Grave', 'Síndrome de Realimentação', 'Diabetes e Dislipidemia', 'Doença Renal Crônica em Hemodiálise'],
        recommendedInstruments: ['NRS-2002', 'ASG (Avaliação Subjetiva Global)', 'MUST', 'Circunferência da Panturrilha']
      },
      {
        id: 'nutri-esportiva',
        name: 'Nutrição Desportiva e Estética',
        description: 'Otimização da composição corporal, rendimento desportivo e periodização de nutrientes.',
        subspecialties: ['Hipertrofia e Emagrecimento', 'Endurance e Esportes Coletivos'],
        commonConditions: ['Déficit Energético Relativo no Esporte (RED-S)', 'Sarcopenia', 'Obesidade'],
        recommendedInstruments: ['Bioimpedância Tetrapolar', 'Dobra Cutânea (Pollock 7)', 'Recordatório 24 Horas']
      }
    ],
    clinicalFlow: [
      { id: 'step-anamnese-alim', name: 'Anamnese Alimentar & Estilo de Vida', description: 'Recordatório 24h, frequência alimentar, aversões, intolerâncias e rotina', formSectionKey: 'sec-anamnese-alim', iconName: 'Coffee' },
      { id: 'step-antropometria', name: 'Antropometria & Bioquímica Nutricional', description: 'Peso, altura, IMC, dobras cutâneas, albumina, transferrina e eletrólitos', formSectionKey: 'sec-antropometria', iconName: 'Ruler' },
      { id: 'step-diag-nutri', name: 'Diagnóstico Nutricional (Formato PES)', description: 'Problema (P) relacionado à Etiologia (E) evidenciado por Sinais e Sintomas (S)', formSectionKey: 'sec-diag-nutri', iconName: 'CheckSquare' },
      { id: 'step-prescricao-diet', name: 'Prescrição Dietética & Plano Alimentar', description: 'Definição de VET (kcal/dia), gramas/kg de proteína, distribuição de macros e micronutrientes', formSectionKey: 'sec-prescricao-diet', iconName: 'Utensils' }
    ],
    formTemplate: [
      {
        id: 'sec-anamnese-alim',
        title: 'Anamnese Nutricional & Inquérito Alimentar',
        fields: [
          { id: 'habito_alimentar', label: 'Recordatório 24h & Inquérito Alimentar', type: 'textarea', placeholder: 'Café da manhã: pão branco com café adoçado...\nAlmoço: arroz, feijão, carne frita...', required: true },
          { id: 'ingestao_hidrica', label: 'Ingestão Hídrica Diária Estimada', type: 'text', placeholder: 'Ex: 1.200 mL/dia' },
          { id: 'trato_gastrointestinal', label: 'Sintomas TGI (Náuseas, Vômitos, Diarreia, Constipação)', type: 'text', placeholder: 'Nega náuseas, relata constipação crônica...' }
        ]
      },
      {
        id: 'sec-antropometria',
        title: 'Dados Antropométricos e Estado Nutricional',
        fields: [
          { id: 'peso_altura_imc', label: 'Peso Atual, Altura e IMC Calculado', type: 'text', placeholder: 'Peso: 68 kg | Estatura: 1,70 m | IMC: 23,5 kg/m²', required: true },
          { id: 'triagem_nrs', label: 'Triagem de Risco Nutricional (NRS-2002 / ASG)', type: 'select', options: ['Sem Risco (NRS < 3)', 'Em Risco Nutricional (NRS ≥ 3)', 'Desnutrição Moderada', 'Desnutrição Severa'], required: true }
        ]
      },
      {
        id: 'sec-diag-nutri',
        title: 'Diagnóstico Nutricional (PES)',
        fields: [
          { id: 'diagnostico_pes', label: 'Diagnóstico PES', type: 'textarea', placeholder: 'Ingestão proteico-calórica inadequada (P) relacionada ao aumento do catabolismo e anorexia (E) evidenciada por perda de peso involuntária de 8% no último mês (S).', required: true }
        ]
      },
      {
        id: 'sec-prescricao-diet',
        title: 'Conduta e Planejamento Dietoterápico',
        fields: [
          { id: 'calculo_vet', label: 'Necessidades Energéticas e Proteicas', type: 'text', placeholder: 'VET: 2.100 kcal (30 kcal/kg/dia) | Proteínas: 1,5 g/kg/dia (102g)', required: true },
          { id: 'plano_dietoterapico', label: 'Prescrição do Plano / Fórmula Enteral', type: 'textarea', placeholder: 'Dieta hipercalórica e hiperproteica fracionada em 6 refeições. Inclusão de suplemento oral com 1.5 kcal/mL e 20g de proteína/dia.', required: true }
        ]
      }
    ],
    competencies: [
      { id: 'comp-nut-1', code: 'NUT-01', title: 'Cálculo de Necessidades em Doenças Crônicas e Críticas', domain: 'Intervenção', level: 'Avançado', description: 'Determinação precisa de metas calóricas, proteicas e restrições eletrolíticas.' },
      { id: 'comp-nut-2', code: 'NUT-02', title: 'Terapia Nutricional Enteral e Prevenção de Realimentação', domain: 'Segurança do Paciente', level: 'Avançado', description: 'Monitorização de fosfato, potássio e progressão segura de dietas em pacientes desnutridos.' }
    ],
    caseTypes: ['Nutrição Clínica Hospitalar e TNE', 'Nutrição em Doenças Renais e Hepáticas', 'Manejo da Obesidade e Síndrome Metabólica', 'Nutrição Materno-Infantil', 'Nutrição no Esporte e Alto Rendimento'],
    triageSystem: 'Triagem de Risco Nutricional (NRS-2002 / MUST)',
    assessmentInstruments: ['NRS-2002', 'ASG', 'MUST', 'Equações de Harris-Benedict / Mifflin', 'Dobra Cutânea Tricipital']
  },
  {
    id: 'psicologia',
    name: 'Psicologia',
    code: 'PSI',
    category: 'Ciências Psicológicas e Saúde Mental',
    iconName: 'Brain',
    color: 'text-rose-600 dark:text-rose-400',
    accentBg: 'bg-rose-500/10 border-rose-500/30',
    description: 'Avaliação psicológica, psicoterapia baseada em evidências, neuropsicologia, intervenção em crise e saúde mental integral.',
    scopeOfPractice: 'Entrevista psicológica, psicodiagnóstico, aplicação de instrumentos e testes validados, formulação de caso clínico, manejo psicoterápico e intervenção em ideação suicida.',
    clinicalReasoningModel: 'Formulação de Caso Clínico & Psicoterapia Baseada em Evidências (Entrevista Clínica → Exame do Estado Mental → Instrumentos Psicométricos → Formulação Cognitivo-Comportamental/Dinâmica → Plano Terapêutico)',
    specialties: [
      {
        id: 'psi-clinica',
        name: 'Psicologia Clínica e Saúde Mental',
        description: 'Tratamento de transtornos de ansiedade, humor, trauma e personalidade.',
        subspecialties: ['Terapia Cognitivo-Comportamental (TCC)', 'Terapia do Esquema', 'Intervenção em Crise e Risco de Suicídio'],
        commonConditions: ['Transtorno Depressivo Maior', 'Transtorno do Pânico / Agorafobia', 'Transtorno de Ansiedade Generalizada (TAG)', 'TEPT', 'Transtorno Borderline'],
        recommendedInstruments: ['BDI-II (Depressão)', 'BAI (Ansiedade)', 'Escala de Ideação Suicida de Beck (BSS)', 'PHQ-9', 'GAD-7']
      },
      {
        id: 'psi-hospitalar',
        name: 'Psicologia Hospitalar e da Saúde',
        description: 'Acompanhamento do adoecimento, luto, adesão a tratamentos médicos e cuidados paliativos.',
        subspecialties: ['Oncopsicologia', 'Psicologia em UTI', 'Preparação Cirúrgica'],
        commonConditions: ['Ansiedade Periprocedimento', 'Processo de Luto Antecipatório', 'Não Adesão ao Tratamento Oncológico'],
        recommendedInstruments: ['Termômetro de Distress', 'Escala HADS', 'Mini-Exame do Estado Mental (MEEM)']
      }
    ],
    clinicalFlow: [
      { id: 'step-entrevista-psi', name: 'Entrevista Clínica & Queixa Manifesta', description: 'Histórico pessoal, dinâmica familiar, eventos precipitantes e exame das funções mentais', formSectionKey: 'sec-entrevista-psi', iconName: 'MessageSquare' },
      { id: 'step-estado-mental', name: 'Exame do Estado Mental & Risco', description: 'Aparência, humor, afeto, pensamento, juízo crítico, ideação suicida ou heteroagressiva', formSectionKey: 'sec-estado-mental', iconName: 'Eye' },
      { id: 'step-formulacao-caso', name: 'Formulação de Caso Clínico', description: 'Crenças nucleares, esquemas iniciais desadaptativos, comportamentos mantenedores e hipótese diagnóstica', formSectionKey: 'sec-formulacao-caso', iconName: 'Layers' },
      { id: 'step-plano-psico', name: 'Plano Terapêutico & Intervenções', description: 'Metas acordadas, reestruturação cognitiva, técnicas de regulação emocional e psicoeducação', formSectionKey: 'sec-plano-psico', iconName: 'Compass' }
    ],
    formTemplate: [
      {
        id: 'sec-entrevista-psi',
        title: 'Entrevista Clínica Inicial e Dados de História',
        fields: [
          { id: 'demanda_paciente', label: 'Queixa Principal e Demanda Espontânea', type: 'textarea', placeholder: 'Paciente busca atendimento referindo crises intensas de angústia e taquicardia...', required: true },
          { id: 'fatores_desencadeantes', label: 'Eventos Estressores Recentes e Histórico Psicossocial', type: 'textarea', placeholder: 'Término de relacionamento há 2 meses associado a demissão no trabalho...' }
        ]
      },
      {
        id: 'sec-estado-mental',
        title: 'Exame do Estado Mental e Avaliação de Risco',
        fields: [
          { id: 'humor_afeto', label: 'Humor e Afeto Observado', type: 'text', placeholder: 'Humor deprimido, afeto hipomodulado e congruente com o relato...', required: true },
          { id: 'avaliacao_suicidio', label: 'Avaliação de Risco de Suicídio (Triagem Crítica)', type: 'select', options: ['Ausência de Risco / Ideação Negada', 'Ideação Passiva de Morte (Sem plano)', 'Risco Moderado (Ideação com plano vago)', 'Alto Risco Iminente (Plano concreto e intenção - Requer Ação Imediata)'], required: true },
          { id: 'instrumentos_aplicados', label: 'Escores em Escalas (BDI, BAI, PHQ-9, GAD-7)', type: 'text', placeholder: 'PHQ-9: 18 (Depressão Moderadamente Grave) | GAD-7: 15 (Ansiedade Grave)' }
        ]
      },
      {
        id: 'sec-formulacao-caso',
        title: 'Formulação Psicológica do Caso',
        fields: [
          { id: 'crencas_comportamentos', label: 'Hipótese Diagnóstica & Mecanismos Mantenedores', type: 'textarea', placeholder: 'Crença central de desvalia ("Eu sou incapaz"). Evitação de situações sociais mantém o ciclo de isolamento e humor disfórico.', required: true }
        ]
      },
      {
        id: 'sec-plano-psico',
        title: 'Plano Terapêutico & Contrato Psicológico',
        fields: [
          { id: 'intervencoes_propostas', label: 'Técnicas e Metas Psicoterapêuticas', type: 'textarea', placeholder: '1. Psicoeducação sobre o ciclo da ansiedade;\n2. Registro de Pensamentos Disfuncionais (RPD);\n3. Ativação comportamental com agendamento de atividades prazerosas;\n4. Treinamento de respiração diafragmática.', required: true }
        ]
      }
    ],
    competencies: [
      { id: 'comp-psi-1', code: 'PSI-01', title: 'Manejo de Crise e Avaliação de Risco de Suicídio', domain: 'Segurança do Paciente', level: 'Especialista', description: 'Identificação imediata de fatores de risco, plano de segurança e encaminhamento psiquiátrico de urgência.' },
      { id: 'comp-psi-2', code: 'PSI-02', title: 'Formulação de Caso em TCC e Intervenções Cognitivas', domain: 'Intervenção', level: 'Avançado', description: 'Capacidade de mapear pensamentos automáticos, crenças e estruturar experimentos comportamentais.' }
    ],
    caseTypes: ['Transtornos do Humor e Ansiedade', 'Intervenção em Crise e Risco de Suicídio', 'Psicologia Hospitalar e Adoecimento', 'Luto e Perdas Significativas', 'Transtornos de Personalidade'],
    triageSystem: 'Protocolo de Avaliação de Risco Suicida e Crise Psicológica',
    assessmentInstruments: ['BDI-II', 'BAI', 'PHQ-9', 'GAD-7', 'BSS', 'MEEM', 'Termômetro de Distress']
  },
  {
    id: 'imagiologia',
    name: 'Radiologia e Imagiologia Médica',
    code: 'RAD',
    category: 'Diagnóstico por Imagem',
    iconName: 'Eye',
    color: 'text-cyan-600 dark:text-cyan-400',
    accentBg: 'bg-cyan-500/10 border-cyan-500/30',
    description: 'Interpretação e realização de exames de Raio-X, Tomografia Computadorizada (TC), Ressonância Magnética (RM) e Ultrassonografia.',
    scopeOfPractice: 'Avaliação técnica de aquisição de imagens, identificação sistemática de padrões patológicos, semiologia radiológica e laudos descritivos.',
    clinicalReasoningModel: 'Análise Sistemática de Imagem (Indicação Clínica → Avaliação da Qualidade Técnica → Padrões de Densidade/Sinal → Localização Anatômica → Correlação Clínico-Radiológica)',
    specialties: [
      {
        id: 'rad-torax',
        name: 'Radiologia Torácica e Cardiovascular',
        description: 'Avaliação de parênquima pulmonar, mediastino, silhueta cardíaca e vasos da base.',
        subspecialties: ['Radiografia de Tórax', 'TC de Alta Resolução (TCAR)', 'Angiotomografia de Artérias Coronárias'],
        commonConditions: ['Pneumotórax Hipertensivo', 'Consolidação Pneumônica / Broncograma Aéreo', 'Tromboembolismo Pulmonar (TEP)', 'Edema Agudo de Pulmão'],
        recommendedInstruments: ['Critérios Fleischner (Nódulos)', 'Protocolo de TEP', 'Escore Coronariano de Cálcio (Agatston)']
      },
      {
        id: 'rad-neuro-musculo',
        name: 'Neurorradiologia e Musculoesquelético',
        description: 'Imagens do SNC, coluna vertebral, articulações e tecidos moles.',
        subspecialties: ['TC e RM de Crânio', 'RM Articular e Coluna', 'Radiologia do Trauma'],
        commonConditions: ['AVC Isquêmico x Hemorrágico', 'Fraturas Ósseas Ocultas', 'Ruptura de Ligamentos e Meniscos', 'Hérnias Discais'],
        recommendedInstruments: ['Escore ASPECTS (AVC)', 'Classificação de Salter-Harris', 'Classificação de Neer']
      }
    ],
    clinicalFlow: [
      { id: 'step-analise-tecnica', name: 'Indicação Clínica & Análise Técnica do Exame', description: 'Verificação da incidência, penetração, rotação, artefatos e contraste utilizado', formSectionKey: 'sec-analise-tecnica', iconName: 'Camera' },
      { id: 'step-semiologia-imagem', name: 'Semiologia Radiológica & Descrição de Achados', description: 'Opacidades, densidades (hipo/hiperdenso), intensidades de sinal (T1/T2) e linhas anatômicas', formSectionKey: 'sec-semiologia-imagem', iconName: 'Sliders' },
      { id: 'step-conclusao-laudo', name: 'Impressão Diagnóstica & Correlação Clínica', description: 'Laudo conclusivo estruturado correlacionado com a suspeita clínica inicial', formSectionKey: 'sec-conclusao-laudo', iconName: 'FileText' }
    ],
    formTemplate: [
      {
        id: 'sec-analise-tecnica',
        title: 'Dados do Exame e Parâmetros Técnicos',
        fields: [
          { id: 'modalidade_incidencia', label: 'Modalidade do Exame & Projeções/Sequências', type: 'text', placeholder: 'Ex: Radiografia de Tórax em PA e Perfil / TC de Crânio sem contraste', required: true },
          { id: 'qualidade_tecnica', label: 'Qualidade Técnica da Aquisição', type: 'select', options: ['Excelente / Adequada', 'Inspiração Subótima', 'Artefato de Movimento Discreto', 'Inadequada para Laudo'] }
        ]
      },
      {
        id: 'sec-semiologia-imagem',
        title: 'Descrição Sistemática dos Achados Radiológicos',
        fields: [
          { id: 'achados_principais', label: 'Achados Descritivos Detalhados', type: 'textarea', placeholder: 'Presença de opacidade alveolar com broncograma aéreo em lobo inferior direito. Seios costofrênicos livres. Silhueta cardíaca com dimensões preservadas.', required: true },
          { id: 'achados_negativos_relevantes', label: 'Achados Negativos Relevantes', type: 'text', placeholder: 'Ausência de pneumotórax, derrame pleural ou desvio de mediastino.' }
        ]
      },
      {
        id: 'sec-conclusao-laudo',
        title: 'Impressão Diagnóstica / Conclusão do Laudo',
        fields: [
          { id: 'conclusao_laudo', label: 'Impressão Diagnóstica Final', type: 'textarea', placeholder: 'Quadro radiológico compatível com pneumonia lobar aguda em base pulmonar direita.', required: true }
        ]
      }
    ],
    competencies: [
      { id: 'comp-rad-1', code: 'RAD-01', title: 'Diferenciação Imediata de AVC Isquêmico e Hemorrágico na TC', domain: 'Diagnóstico', level: 'Avançado', description: 'Reconhecimento de hiperdensidade aguda (sangramento) versus hipodensidade e perda de diferenciação córtico-subcortical.' },
      { id: 'comp-rad-2', code: 'RAD-02', title: 'Identificação de Emergências Torácicas (Pneumotórax / TEP)', domain: 'Diagnóstico', level: 'Avançado', description: 'Detecção rápida de linha pleural visceral e falhas de enchimento em angiotomografia.' }
    ],
    caseTypes: ['Emergências Torácicas e Abdominais', 'Neurorradiologia de Urgência (AVC/TCE)', 'Traumatologia e Fraturas', 'Patologia Pulmonar Crônica e Nódulos'],
    triageSystem: 'Comunicação de Achados Críticos Imediatos',
    assessmentInstruments: ['ASPECTS', 'Critérios Fleischner', 'Classificação BI-RADS', 'Classificação LI-RADS']
  },
  {
    id: 'analises-clinicas',
    name: 'Análises Clínicas e Laboratório Biomédico',
    code: 'LAB',
    category: 'Medicina Laboratorial',
    iconName: 'FlaskConical',
    color: 'text-indigo-600 dark:text-indigo-400',
    accentBg: 'bg-indigo-500/10 border-indigo-500/30',
    description: 'Interpretação de hemogramas, bioquímica sérica, coagulograma, microbiologia, antibiogramas e testes moleculares.',
    scopeOfPractice: 'Validação técnica e analítica de exames laboratoriais, identificação de valores de pânico, correlação fisiopatológica e antibiograma.',
    clinicalReasoningModel: 'Análise Laboratorial & Fisiopatologia (Fase Pré-Analítica → Análise dos Parâmetros Quantitativos → Morfologia/Microbiologia → Correlação Fisiopatológica → Notificação de Valores Críticos)',
    specialties: [
      {
        id: 'lab-hematologia',
        name: 'Hematologia Laboratorial e Coagulação',
        description: 'Série vermelha, série branca, plaquetas e coagulopatias.',
        subspecialties: ['Anemias', 'Leucemias e Mielodisplasias', 'Coagulograma e Trombose'],
        commonConditions: ['Anemia Ferropriva x Talassemia', 'Leucocitose com Desvio à Esquerda (Infecção)', 'Leucemia Aguda com Blastos', 'CIVD'],
        recommendedInstruments: ['Índices Hematimétricos (VCM, HCM, RDW)', 'Tempo de Protrombina (INR)', 'TTPA', 'D-Dímero']
      },
      {
        id: 'lab-bioquimica-micro',
        name: 'Bioquímica Clínica e Microbiologia',
        description: 'Função renal, hepática, marcadores cardíacos, culturas e antibiogramas.',
        subspecialties: ['Enzimologia e Marcadores', 'Microbiologia e Resistência Bacteriana', 'Gasometria Arterial'],
        commonConditions: ['Troponina Elevada no IAM', 'Distúrbios Ácido-Base Graves', 'Bactérias Multirresistentes (KPC/MRSA)', 'Insuficiência Hepática Aguda'],
        recommendedInstruments: ['Gasometria Arterial (pH, pCO2, HCO3, BE, Lactato)', 'Painel Renal / Hepático', 'Antibiograma (CIM)']
      }
    ],
    clinicalFlow: [
      { id: 'step-avaliacao-pre-analitica', name: 'Validação Pré-Analítica & Amostra', description: 'Verificação de hemólise, lipemia, anticoagulante correto e dados do paciente', formSectionKey: 'sec-pre-analitica', iconName: 'Check' },
      { id: 'step-analise-parametros', name: 'Análise de Parâmetros & Morfologia', description: 'Valores numéricos, desvios de referência, lâmina microscópica e curvas gráficas', formSectionKey: 'sec-parametros-lab', iconName: 'Activity' },
      { id: 'step-correlacao-clinica', name: 'Correlação Fisiopatológica & Parecer', description: 'Interpretação clínica integrada e alerta de valores críticos (valores de pânico)', formSectionKey: 'sec-correlacao-lab', iconName: 'AlertCircle' }
    ],
    formTemplate: [
      {
        id: 'sec-pre-analitica',
        title: 'Validação Pré-Analítica da Amostra',
        fields: [
          { id: 'qualidade_amostra', label: 'Aspecto da Amostra & Integridade', type: 'select', options: ['Amostra Adequada (Sem interferentes)', 'Hemólise Leve (+)', 'Hemólise Intensa (Requer nova coleta)', 'Lipemia / Icterícia Acentuada'] }
        ]
      },
      {
        id: 'sec-parametros-lab',
        title: 'Resultados Numéricos & Achados Microscópicos',
        fields: [
          { id: 'valores_alterados', label: 'Parâmetros Alterados Relevantes', type: 'textarea', placeholder: 'Hb: 8.2 g/dL | VCM: 72 fL | RDW: 18.5% | Leucócitos: 16.500/mm³ com 12% de bastões | Plaquetas: 95.000/mm³', required: true },
          { id: 'morfologia_celular', label: 'Morfologia Celular Microscópica', type: 'text', placeholder: 'Microcitose acentuada, hipocromia, presença de granulações tóxicas nos neutrófilos.' }
        ]
      },
      {
        id: 'sec-correlacao-lab',
        title: 'Interpretação Fisiopatológica e Notificação de Pânico',
        fields: [
          { id: 'laudo_fisiopatologico', label: 'Parecer / Interpretação Laboratorial', type: 'textarea', placeholder: 'Quadro hematológico sugere processo infeccioso bacteriano agudo (leucocitose com desvio à esquerda escalonado) associado a anemia microcítica e plaquetopenia de consumo.', required: true },
          { id: 'valor_panico', label: 'Comunicação de Valor Crítico (Pânico)', type: 'select', options: ['Não configurado valor de pânico', 'Valor Crítico Notificado Imediatamente à Equipa Assistencial'] }
        ]
      }
    ],
    competencies: [
      { id: 'comp-lab-1', code: 'LAB-01', title: 'Interpretação de Distúrbios Ácido-Base Complexos', domain: 'Diagnóstico', level: 'Avançado', description: 'Cálculo de Anion Gap, delta gap e identificação de distúrbios mistos.' },
      { id: 'comp-lab-2', code: 'LAB-02', title: 'Interpretação de Hemogramas e Reações Leucemoides vs. Neoplasias', domain: 'Diagnóstico', level: 'Avançado', description: 'Reconhecimento morfológico de blastos e diferenciação de processos reativos graves.' }
    ],
    caseTypes: ['Interpretação de Gasometrias e Distúrbios Eletrolíticos', 'Hematologia e Coagulopatias Graves', 'Microbiologia e Leitura de Antibiogramas', 'Marcadores Bioquímicos no Paciente Crítico'],
    triageSystem: 'Notificação de Valores Críticos (Valores de Pânico)',
    assessmentInstruments: ['Anion Gap', 'Índices de Wintrobe', 'Curvas de Coagulação', 'CIM (Concentração Inibitória Mínima)']
  }
];

export function getProfessionById(id: string): ProfessionProfile | undefined {
  return HEALTH_PROFESSIONS.find(p => p.id === id || p.code.toLowerCase() === id.toLowerCase());
}

export function getAllProfessions(): ProfessionProfile[] {
  return HEALTH_PROFESSIONS;
}
