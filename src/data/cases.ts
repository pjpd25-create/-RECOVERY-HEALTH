import { ClinicalCase } from '../types';
import { generateCases } from './caseGenerator';
import { MULTIPROFESSIONAL_CASES } from './multiprofessionalCases';

const baseCases = generateCases().map(c => ({
  ...c,
  professionId: c.professionId || (
    c.specialty === 'Medicina Geral' ? 'medicina' :
    c.specialty === 'Enfermagem' ? 'enfermagem' :
    c.specialty === 'Farmácia' ? 'farmacia' :
    c.specialty === 'Análises Clínicas' ? 'analises-clinicas' :
    c.specialty === 'Medicina Dentária' ? 'medicina' :
    'fisioterapia'
  )
}));

export const CLINICAL_CASES: ClinicalCase[] = [
  ...MULTIPROFESSIONAL_CASES,
  ...baseCases
];

