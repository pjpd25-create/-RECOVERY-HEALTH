import { Specialty } from './types';

export const USER_STATUSES = [
  'Estudante de Graduação',
  'Estudante Técnico',
  'Pós-Graduando / Residente',
  'Profissional de Saúde',
  'Professor / Docente',
  'Supervisor de Estágio',
  'Coordenador de Curso',
  'Diretor Clínico / Gestor Hospitalar',
  'Investigador Científico'
] as const;

export type UserStatus = typeof USER_STATUSES[number];

export const SPECIALTIES: Specialty[] = [
  'Saúde Geral',
  'Medicina Geral',
  'Medicina Dentária',
  'Enfermagem',
  'Fisioterapia',
  'Análises Clínicas',
  'Farmácia',
  'Nutrição',
  'Psicologia Clínica',
  'Radiologia e Imagem Médica',
  'Terapia da Fala',
  'Terapia Ocupacional',
  'Saúde Pública & Epidemiologia',
  'Biotecnologia & Genética Médica'
];

export const SPECIALTY_CATEGORIES: Record<string, string[]> = {
  'Saúde Geral': [
    'Saúde Pública', 'Promoção da Saúde', 'Epidemiologia', 'Gestão em Saúde',
    'Bioética', 'Políticas de Saúde', 'Saúde Mental', 'Cuidados Primários',
    'Raciocínio Clínico Integrado', 'Segurança do Doente'
  ],
  'Medicina Geral': [
    'Cardiologia', 'Pneumologia', 'Gastroenterologia', 'Endocrinologia',
    'Neurologia', 'Nefrologia', 'Hematologia', 'Infectologia',
    'Dermatologia', 'Reumatologia', 'Ginecologia e Obstetrícia', 'Pediatria',
    'Medicina de Urgência', 'Medicina Intensiva', 'Cirurgia Geral'
  ],
  'Medicina Dentária': [
    'Dentística Restauradora', 'Endodontia', 'Periodontia', 'Prótese Dentária',
    'Ortodontia', 'Implantodontia', 'Cirurgia Oral Menor & Maxilofacial', 'Odontopediatria',
    'Estomatologia & Patologia Oral', 'Radiologia Oral', 'Disfunção Temporomandibular (DTM)', 'Odontogeriatria'
  ],
  'Enfermagem': [
    'Cuidados Intensivos (UCI)', 'Urgência e Emergência Hospitalar', 'Saúde Materna e Obstétrica', 'Saúde Infantil e Pediátrica',
    'Saúde Mental e Psiquiátrica', 'Saúde Comunitária & Familiar', 'Gerontologia & Cuidados ao Idoso', 'Enfermagem Oncológica',
    'Bloco Operatório & Anestesia', 'Reabilitação em Enfermagem', 'Gestão de Feridas Complexas', 'Cuidados Paliativos'
  ],
  'Fisioterapia': [
    'Fisioterapia Traumato-Ortopédica Desportiva', 'Fisioterapia Neurofuncional (AVC & Lesão Medular)', 'Fisioterapia Respiratória & UTI',
    'Fisioterapia Cardiovascular', 'Fisioterapia Reumatológica', 'Fisioterapia Pediátrica & Neonatal',
    'Fisioterapia em Geriatria', 'Fisioterapia Pélvica & Uroginecológica', 'Fisioterapia Dermatofuncional & Queimados',
    'Fisioterapia Hospitalar & Cuidados Críticos', 'Terapia Manual & Osteopatia', 'Ergonomia & Saúde Ocupacional'
  ],
  'Análises Clínicas': [
    'Hematologia Clínica & Hemostase', 'Bioquímica Clínica & Enzimologia', 'Microbiologia Médica & Bacteriológica', 'Imunologia & Serologia',
    'Genética Clínica & Biologia Molecular', 'Toxicologia & Farmacocinética', 'Parasitologia & Micologia', 'Uroanálise & Fluídos Biológicos',
    'Endocrinologia Laboratorial', 'Citopatologia & Histologia'
  ],
  'Farmácia': [
    'Farmácia Comunitária & Cuidados Farmacêuticos', 'Farmácia Hospitalar & Clínica', 'Farmacologia & Toxicologia Clínica', 'Interações Medicamentosas & Segurança',
    'Farmacognosia & Fitoterapia', 'Tecnologia Farmacêutica & Formulação', 'Farmacovigilância & Rastreio', 'Farmacogenómica & Terapias Biológicas'
  ],
  'Nutrição': [
    'Nutrição Clínica Hospitalar & Ambulatorial', 'Nutrição Desportiva & Performance', 'Nutrição Materno-Infantil & Pediátrica',
    'Nutrição Comunitária & Saúde Pública', 'Nutrição Enteral e Parenteral', 'Comportamento Alimentar & Transtornos Alimentares',
    'Nutrição em Doenças Crónicas (Diabetes/Hipertensão)'
  ],
  'Psicologia Clínica': [
    'Avaliação Psicológica & Psicodiagnóstico', 'Terapia Cognitivo-Comportamental (TCC)', 'Psicologia Hospitalar & da Saúde',
    'Neuropsicologia Clínica', 'Intervenção em Crise, Trauma & Luto', 'Psicopatologia do Adulto e Idoso',
    'Psicoterapia Infantil e do Adolescente'
  ],
  'Radiologia e Imagem Médica': [
    'Radiografia Convencional & Digital', 'Tomografia Computadorizada (TC)', 'Ressonância Magnética (RM)',
    'Ultrassonografia / Ecografia Geral & Doppler', 'Mamografia & Densitometria Óssea', 'Medicina Nuclear & Radioterapia',
    'Radiologia Intervencionista & Proteção Radiológica'
  ],
  'Terapia da Fala': [
    'Disfagia & Perturbações da Deglutição', 'Linguagem e Fala Infantil', 'Voz Clínica & Disfonias',
    'Afasiologia & Reabilitação Neurológica', 'Motricidade Orofacial & Funções Estomatognáticas', 'Audiologia & Processamento Auditivo'
  ],
  'Terapia Ocupacional': [
    'Reabilitação Física, Neurológica e Funcional', 'Integração Sensorial & Terapia Pediátrica', 'Saúde Mental & Reinserção Psicossocial',
    'Ergonomia, Trabalho & Reabilitação Profissional', 'Tecnologia Assistiva, Adaptação e Acessibilidade', 'Gerontologia Ocupacional'
  ],
  'Saúde Pública & Epidemiologia': [
    'Vigilância Epidemiológica & Rastreio de Surtos', 'Saúde Global & Doenças Transmissíveis/Tropicais', 'Planeamento, Gestão e Economia da Saúde',
    'Bioestatística Aplicada às Ciências da Saúde', 'Promoção, Educação e Políticas Nacionais de Saúde', 'Saúde Ambiental & Ocupacional'
  ],
  'Biotecnologia & Genética Médica': [
    'Diagnóstico Molecular & PCR/Sequenciação', 'Genética Médica, Rastreio & Aconselhamento Genético', 'Biotecnologia em Saúde e Terapia Génica',
    'Imunogenética & Vacinas Recombinantes', 'Bioinformática & Genómica Funcional'
  ]
};

export const CATEGORIES = Array.from(new Set(Object.values(SPECIALTY_CATEGORIES).flat()));

