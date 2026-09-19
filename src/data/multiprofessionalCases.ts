import { ClinicalCase } from '../types';

export const MULTIPROFESSIONAL_CASES: ClinicalCase[] = [
  // ==========================================
  // MEDICINA
  // ==========================================
  {
    id: 'med-caso-01',
    title: 'Dor Torácica Opressiva Aguda na Emergência',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
    specialty: 'Medicina',
    category: 'Cardiologia e Emergência',
    professionId: 'medicina',
    caseType: 'emergencia',
    academicLevel: 'Internato / Estágio',
    difficulty: 'Médio',
    estimatedTime: 15,
    learningObjectives: [
      'Identificar síndrome coronariana aguda com supra de ST (IAMCSST)',
      'Executar estratificação rápida de risco e diagnóstico diferencial de dor torácica',
      'Prescrever conduta farmacológica imediata (antiagregação, anticoagulação, nitrato) e indicar angioplastia primária'
    ],
    evaluatedCompetencies: ['MED-01', 'MED-02'],
    triageRequired: true,
    triageData: {
      chiefComplaint: 'Dor retroesternal em aperto há 90 minutos, irradiada para mandíbula e MSE, associada a diaforese fria.',
      vitalSigns: {
        bp: '150/95 mmHg',
        hr: 104,
        rr: 22,
        spo2: 96,
        temp: 36.4,
        gcs: 15
      },
      redFlags: ['Dor opressiva típica em repouso', 'Sudorese fria profusa', 'Fator de risco cardiovascular maior'],
      urgencyLevel: 'Laranja (Muito Urgente)',
      targetResponseTimeMinutes: 10,
      recommendedImmediateAction: 'ECG em até 10 minutos (tempo porta-ECG), monitorização, acesso calibroso e analgesia.'
    },
    patient: {
      name: 'Carlos Alberto Mendes',
      age: 58,
      profession: 'Empresário',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      complaint: 'Dor forte no peito que começou enquanto descansava após o almoço.',
      history: 'Hipertenso há 15 anos em uso irregular de Losartana. Tabagista 30 anos-maço. Nega cirurgias ou alergias prévias.',
      symptoms: ['Dor retroesternal opressiva 9/10', 'Diaforese fria', 'Náuseas discretas', 'Sensação de morte iminente'],
      evolutionTime: '90 minutos',
      functionalLimitations: 'Incapaz de deambular no momento pela intensidade da dor.',
      antecedents: 'HAS, Dislipidemia, Tabagismo ativo. Pai faleceu de IAM aos 52 anos.',
      medications: ['Losartana 50mg/dia (irregular)']
    },
    stages: [
      {
        id: 'med-stg-1',
        title: 'História Clínica e Exame Físico Focado',
        description: 'Paciente alerta, sudoreico, taquicárdico. Ausculta pulmonar limpa, sem estase jugular. Ausculta cardíaca em 2T sem sopros.',
        vitals: { bp: '150/95', hr: 104, rr: 22, spo2: 96, temp: 36.4, pain: 9 },
        questions: [
          {
            id: 'med-q1',
            text: 'Diante do quadro de dor torácica aguda de alta suspeita, qual a prioridade diagnóstica indispensável nos primeiros 10 minutos?',
            options: [
              { id: 'A', text: 'Solicitar Raio-X de Tórax e Ecocardiograma transtorácico' },
              { id: 'B', text: 'Realizar Eletrocardiograma (ECG) de 12 derivações e interpretar traçado imediatamente' },
              { id: 'C', text: 'Aguardar o resultado da dosagem de Troponina ultrassensível para decidir conduta' },
              { id: 'D', text: 'Prescrever analgesia com Morfina e aguardar alívio dos sintomas' }
            ],
            correctOption: 'B',
            explanation: 'A diretriz internacional preconiza tempo porta-ECG ≤ 10 minutos para qualquer paciente com dor torácica sugestiva de síndrome coronariana aguda.',
            clinicalPearl: 'O ECG define se há ou não supra de ST, direcionando imediatamente para terapia de reperfusão (angioplastia ou trombólise).'
          }
        ]
      },
      {
        id: 'med-stg-2',
        title: 'Interpretação do ECG e Investigação',
        description: 'O ECG de 12 derivações demonstra supradesnivelamento do segmento ST de 3mm em DII, DIII e aVF, com infradesnivelamento recíproco em DI e aVL.',
        questions: [
          {
            id: 'med-q2',
            text: 'Qual a parede miocárdica acometida e qual artéria coronária é a culpada mais frequente nesse padrão eletrocardiográfico?',
            options: [
              { id: 'A', text: 'Parede Anterior; Artéria Descendente Anterior (ADA)' },
              { id: 'B', text: 'Parede Lateral Alta; Artéria Circunflexa (Cx)' },
              { id: 'C', text: 'Parede Inferior; Artéria Coronária Direita (ACD)' },
              { id: 'D', text: 'Parede Posterior; Artéria Marginal Esquerda' }
            ],
            correctOption: 'C',
            explanation: 'Supradesnivelamento em DII, DIII e aVF reflete infarto de parede inferior, na imensa maioria das vezes causado por oclusão da Coronária Direita (85%) ou Circunflexa com dominância esquerda.',
            clinicalPearl: 'Em todo IAM de parede inferior, é obrigatório rodar as derivações direitas (V3R, V4R) e posteriores (V7, V8) para descartar acometimento de Ventrículo Direito.'
          }
        ]
      },
      {
        id: 'med-stg-3',
        title: 'Conduta Terapêutica Imediata e Reperfusão',
        description: 'Foi confirmada SCA com supra de ST em parede inferior. O tempo estimado de transporte para o laboratório de hemodinâmica local é de 25 minutos.',
        questions: [
          {
            id: 'med-q3',
            text: 'Qual o esquema farmacológico inicial padrão e estratégia de reperfusão indicada?',
            options: [
              { id: 'A', text: 'AAS 300mg VO mastigável + Ticagrelor 180mg (ou Clopidogrel 300/600mg) + Enoxaparina + Encaminhar para Angioplastia Primária imediata (tempo porta-balão < 90 min)' },
              { id: 'B', text: 'Alteplase (trombolítico) imediatamente, dispensando antiagregação plaquetária prévia' },
              { id: 'C', text: 'Apenas Nitroglicerina sublingual e observação clínica em UTI por 24 horas' },
              { id: 'D', text: 'AAS isolado e agendar teste ergométrico ambulatorial em 7 dias' }
            ],
            correctOption: 'A',
            explanation: 'A dupla antiagregação plaquetária (AAS + inibidor P2Y12) associada a anticoagulação plena e rápida transferência para angioplastia primária constitui o padrão-ouro de tratamento.',
            clinicalPearl: 'Cuidado com nitratos se houver suspeita de infarto de ventrículo direito, pois a queda súbita de pré-carga pode precipitar choque cardiogênico severo.'
          }
        ]
      }
    ],
    result: {
      title: 'Conduta Médica de Excelência Realizada',
      description: 'O paciente foi transferido rapidamente para a sala de hemodinâmica, onde a coronariografia evidenciou oclusão de 100% no terço médio da Coronária Direita. Realizado implante de stent farmacológico com sucesso e fluxo TIMI 3 restabelecido. Paciente evoluiu sem disfunção ventricular.',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800'
    },
    clinicalReferences: [
      'Diretriz da Sociedade Brasileira de Cardiologia sobre Tratamento do IAM com Supradesnivelamento do Segmento ST (2020)',
      '2023 ESC Guidelines for the management of acute coronary syndromes'
    ]
  },

  // ==========================================
  // ENFERMAGEM
  // ==========================================
  {
    id: 'enf-caso-01',
    title: 'Sistematização da Assistência de Enfermagem (SAE) ao Paciente Crítico Séptico',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    specialty: 'Enfermagem',
    category: 'Cuidados Intensivos e SAE',
    professionId: 'enfermagem',
    caseType: 'hospitalar',
    academicLevel: 'Graduação Inicial',
    difficulty: 'Médio',
    estimatedTime: 12,
    learningObjectives: [
      'Aplicar o Processo de Enfermagem em 5 etapas no contexto de Sepse',
      'Formular diagnósticos de enfermagem prioritários utilizando a taxonomia NANDA-I',
      'Prescrever intervenções de enfermagem (NIC) para prevenção de lesão por pressão e monitorização hemodinâmica'
    ],
    evaluatedCompetencies: ['ENF-01', 'ENF-02', 'ENF-03'],
    patient: {
      name: 'Maria Helena Souza',
      age: 72,
      profession: 'Aposentada',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
      complaint: 'Internada na UTI por choque séptico de foco pulmonar sob ventilação mecânica invasiva e droga vasoativa.',
      history: 'Pneumonia aspirativa evoluindo com hipotensão refratária a volume. Em uso de Noradrenalina 0.35 mcg/kg/min por CVC em subclávia D.',
      symptoms: ['Sedação RASS -4 sob Fentanil e Midazolam', 'Sinais vitais instáveis', 'Braden = 10 (Alto Risco)'],
      evolutionTime: '3 dias de UTI',
      functionalLimitations: 'Acamada, totalmente dependente de cuidados da equipa.',
      antecedents: 'Acidente Vascular Cerebral prévio com disfagia orofaríngea sequelar.'
    },
    stages: [
      {
        id: 'enf-stg-1',
        title: 'Avaliação Inicial de Enfermagem e Risco de Lesão',
        description: 'Paciente acamada, intubada em Ventilação Mecânica Protetora, acesso venoso central em subclávia D com curativo transparente íntegro. Sonda vesical de demora com débito de 25 mL/h. Escala de Braden: 10.',
        questions: [
          {
            id: 'enf-q1',
            text: 'Com base no escore da Escala de Braden (10 pontos), qual a classificação de risco e a intervenção de enfermagem mandatória?',
            options: [
              { id: 'A', text: 'Baixo risco; mudança de decúbito apenas a cada 6 horas' },
              { id: 'B', text: 'Alto risco; implementação de colchão pneumático, hidratação de pele com AGE e reposicionamento a cada 2 horas com coxim' },
              { id: 'C', text: 'Sem risco; manter paciente em decúbito dorsal horizontal contínuo' },
              { id: 'D', text: 'Risco moderado; aplicação de massagem vigorosa sobre proeminências ósseas hiperemiadas' }
            ],
            correctOption: 'B',
            explanation: 'Braden ≤ 12 indica alto risco para desenvolvimento de lesão por pressão. A mudança periódica de decúbito de 2/2h e alívio de pressão sobre calcâneos e sacro são intervenções baseadas em evidências.',
            clinicalPearl: 'Nunca massageie áreas com hiperemia não reativa sobre proeminências ósseas, pois isso agrava o dano microvascular tecidual.'
          }
        ]
      },
      {
        id: 'enf-stg-2',
        title: 'Formulação de Diagnóstico de Enfermagem (NANDA-I)',
        description: 'Paciente apresenta secreção traqueal espessa esbranquiçada em média quantidade, roncos difusos na ausculta e dessaturação esporádica.',
        questions: [
          {
            id: 'enf-q2',
            text: 'Qual o diagnóstico de enfermagem prioritário com base na taxonomia NANDA-I para este achado respiratório?',
            options: [
              { id: 'A', text: 'Desobstrução ineficaz de vias aéreas relacionada à presença de via aérea artificial e secreções retidas evidenciada por roncos e dessaturação' },
              { id: 'B', text: 'Padrão de sono perturbado relacionado ao ambiente da UTI' },
              { id: 'C', text: 'Conhecimento deficiente sobre doença pulmonar crônica' },
              { id: 'D', text: 'Risco de constipação relacionado à imobilidade' }
            ],
            correctOption: 'A',
            explanation: 'O diagnóstico "Desobstrução ineficaz de vias aéreas" descreve com precisão a incapacidade de eliminar secreções da árvore respiratória para manter as vias aéreas desobstruídas.',
            clinicalPearl: 'A aspiração endotraqueal deve ser realizada sob demanda (quando houver ruídos ou alteração de curva no ventilador) e não por horário fixo.'
          }
        ]
      },
      {
        id: 'enf-stg-3',
        title: 'Segurança na Infusão de Drogas Vasoativas',
        description: 'A infusão de Noradrenalina está em 0.4 mcg/kg/min por bomba de infusão contínua conectada exclusivamente à via distal do Cateter Venoso Central (CVC).',
        questions: [
          {
            id: 'enf-q3',
            text: 'Quais os cuidados essenciais de enfermagem para garantir a segurança na administração de aminas vasoativas?',
            options: [
              { id: 'A', text: 'Administrar em bólus quando a pressão arterial média cair abaixo de 65 mmHg' },
              { id: 'B', text: 'Infundir via periférica de pequeno calibre em dorso de mão' },
              { id: 'C', text: 'Utilizar via exclusiva em cateter venoso central, monitorização contínua de PAM, bomba de infusão volumétrica e dupla checagem no preparo' },
              { id: 'D', text: 'Trocar o equipo de noradrenalina a cada 12 horas sem proteção fotossensível' }
            ],
            correctOption: 'C',
            explanation: 'Drogas vasoativas como Noradrenalina exigem via central exclusiva pelo risco de necrose por extravasamento, controle rigoroso por bomba e monitorização hemodinâmica constante.',
            clinicalPearl: 'Mantenha a solução identificada com etiqueta de alta vigilância/alto risco em destaque.'
          }
        ]
      }
    ],
    result: {
      title: 'Plano de Cuidados de Enfermagem Executado com Sucesso',
      description: 'A aplicação rigorosa do plano de cuidados preveniu lesões por pressão e infecções associadas a dispositivos invasivos. Com o controle infeccioso e suporte de enfermagem qualificado, a paciente foi extubada com sucesso no 5º dia.',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800'
    }
  },

  // ==========================================
  // FARMÁCIA
  // ==========================================
  {
    id: 'farm-caso-01',
    title: 'Conciliação Farmacêutica & Manejo de Interação Medicamentosa Severa',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=800',
    specialty: 'Farmácia',
    category: 'Farmácia Clínica',
    professionId: 'farmacia',
    caseType: 'farmacoterapeutico',
    academicLevel: 'Internato / Estágio',
    difficulty: 'Difícil',
    estimatedTime: 15,
    learningObjectives: [
      'Executar a conciliação medicamentosa de admissão',
      'Identificar problemas relacionados a medicamentos (PRMs) de segurança e interações farmacocinéticas via CYP3A4/Glicoproteína-P',
      'Formular intervenção farmacêutica estruturada ao médico assistente'
    ],
    evaluatedCompetencies: ['FAR-01', 'FAR-02'],
    patient: {
      name: 'Joaquim Antunes Ribeiro',
      age: 69,
      profession: 'Contabilista Aposentado',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
      complaint: 'Internado para tratamento de Pneumonia Adquirida na Comunidade.',
      history: 'Histórico de Fibrilação Atrial não valvar em uso crônico de Varfarina 5mg/dia e Amiodarona 200mg/dia. Foi prescrito Claritromicina 500mg 12/12h EV para o quadro respiratório.',
      symptoms: ['Hematúria macroscópica recente', 'Equimoses espontâneas em antebraço', 'INR na admissão = 7.8 (alvo prévio: 2.0 - 3.0)'],
      evolutionTime: '3 dias de antimicrobiano',
      functionalLimitations: 'Debilitado, sem sangramentos de SNC ativos.',
      antecedents: 'FA crônica, Insuficiência Cardíaca CF II (NYHA).'
    },
    stages: [
      {
        id: 'farm-stg-1',
        title: 'Análise Farmacocinética da Prescrição',
        description: 'Paciente em uso de Varfarina e Amiodarona recebeu adição de Claritromicina há 3 dias. O INR subiu de 2.4 para 7.8, surgindo hematúria.',
        questions: [
          {
            id: 'farm-q1',
            text: 'Qual o mecanismo farmacológico que explica a elevação drástica do INR nesta associação medicamentosa?',
            options: [
              { id: 'A', text: 'A Claritromicina é um potente indutor enzimático do CYP2C9, acelerando a metabolização da varfarina' },
              { id: 'B', text: 'A Claritromicina e a Amiodarona são potentes inibidores das enzimas CYP3A4 e CYP2C9, reduzindo significativamente a depuração hepática da S-varfarina ativa' },
              { id: 'C', text: 'A Amiodarona neutraliza a absorção intestinal de vitamina K vegetal' },
              { id: 'D', text: 'A associação provoca acidose tubular renal sem impacto hepático' }
            ],
            correctOption: 'B',
            explanation: 'A claritromicina e a amiodarona inibem fortemente as isoenzimas do citocromo P450 responsáveis pelo metabolismo do anticoagulante, causando acúmulo plasmático e risco hemorrágico crítico.',
            clinicalPearl: 'Sempre que prescrever macrolídeos ou azólicos em pacientes em uso de varfarina, monitorize o INR ou opte por antimicrobiano alternativo (ex: Azitromicina tem menor potencial de inibição do que Claritromicina).'
          }
        ]
      },
      {
        id: 'farm-stg-2',
        title: 'Intervenção Farmacêutica e Reversão',
        description: 'Com INR = 7.8 e sangramento menor (hematúria), o farmacêutico clínico elabora parecer técnico.',
        questions: [
          {
            id: 'farm-q2',
            text: 'Qual a recomendação farmacoterapêutica imediata mais apropriada?',
            options: [
              { id: 'A', text: 'Aumentar a dose de Varfarina para compensar a infecção bacteriana' },
              { id: 'B', text: 'Suspender temporariamente a Varfarina, administrar Fitomenadiona (Vitamina K1) 1mg a 2.5mg por via oral lenta e substituir o macrolídeo por opção com menor potencial de interação' },
              { id: 'C', text: 'Infundir 4 unidades de concentrado de hemácias imediatamente' },
              { id: 'D', text: 'Manter prescrição inalterada e reavaliar INR em 7 dias' }
            ],
            correctOption: 'B',
            explanation: 'Para INR entre 4.5 e 10 sem sangramento maior com risco de vida, a suspensão da varfarina e uso criterioso de baixa dose de Vitamina K1 oral normalizam o INR em 24-48h com segurança.',
            clinicalPearl: 'Evite administrar Vitamina K1 intramuscular em pacientes anticoagulados devido ao alto risco de volumosos hematomas.'
          }
        ]
      }
    ],
    result: {
      title: 'Intervenção Farmacêutica Aceita com Sucesso',
      description: 'A equipa médica acolheu a recomendação: a claritromicina foi substituída por ceftriaxona + azitromicina, a varfarina foi pausada e administrada vitamina K1 oral. O INR normalizou para 2.3 em 48 horas e o sangramento cessou.',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=800'
    }
  },

  // ==========================================
  // NUTRIÇÃO
  // ==========================================
  {
    id: 'nutri-caso-01',
    title: 'Terapia Nutricional Enteral no Paciente Crítico e Prevenção da Síndrome de Realimentação',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800',
    specialty: 'Nutrição',
    category: 'Nutrição Clínica Hospitalar',
    professionId: 'nutricao',
    caseType: 'nutricional',
    academicLevel: 'Graduação Inicial',
    difficulty: 'Médio',
    estimatedTime: 12,
    learningObjectives: [
      'Identificar risco de Síndrome de Realimentação em pacientes com jejum prolongado',
      'Calcular meta calórica e proteica inicial conservadora',
      'Monitorizar eletrólitos intracelulares (Fósforo, Potássio e Magnésio) na introdução da TNE'
    ],
    evaluatedCompetencies: ['NUT-01', 'NUT-02'],
    patient: {
      name: 'António Ferreira',
      age: 63,
      profession: 'Marceneiro',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
      complaint: 'Admitido na enfermaria após 10 dias de ingestão alimentar quase nula por estenose esofágica benigna.',
      history: 'Perda ponderal involuntária de 12% do peso habitual nos últimos 2 meses. IMC atual = 16.8 kg/m² (Desnutrição Grave). Passada SNE para início de dieta enteral.',
      symptoms: ['Emaciação muscular evidente', 'Fosfato sérico basal = 2.1 mg/dL (limítrofe baixo)', 'Fraqueza generalizada'],
      evolutionTime: '2 meses de perda progressiva',
      functionalLimitations: 'Confinado ao leito por astenia severa.'
    },
    stages: [
      {
        id: 'nutri-stg-1',
        title: 'Estratificação de Risco e Síndrome de Realimentação',
        description: 'Paciente com desnutrição severa e jejum superior a 7 dias. Ao iniciar nutrição, a liberação de insulina pode provocar influxo maciço de eletrólitos para o meio intracelular.',
        questions: [
          {
            id: 'nutri-q1',
            text: 'Qual o distúrbio hidroeletrolítico clássico mais perigoso que define a Síndrome de Realimentação e pode levar a arritmias e parada cardiorrespiratória?',
            options: [
              { id: 'A', text: 'Hipercalcemia e hipernatremia' },
              { id: 'B', text: 'Hipofosfatemia severa, associada a hipocalemia e hipomagnesemia' },
              { id: 'C', text: 'Hipercalemia com acidose metabólica' },
              { id: 'D', text: 'Elevação isolada de ácido úrico' }
            ],
            correctOption: 'B',
            explanation: 'A infusão de glicose estimula a secreção de insulina, que carretia fósforo, potássio e magnésio para dentro das células para a síntese de ATP, causando hipofosfatemia severa com falência miocárdica e neuromuscular.',
            clinicalPearl: 'Reponha tiamina (vitamina B1) antes ou junto com o início da nutrição em pacientes de alto risco.'
          }
        ]
      },
      {
        id: 'nutri-stg-2',
        title: 'Prescrição Dietética Inicial (TNE)',
        description: 'Peso atual: 50 kg. Altura: 1,72m. Como iniciar a Terapia Nutricional Enteral com segurança?',
        questions: [
          {
            id: 'nutri-q2',
            text: 'Qual o aporte calórico inicial recomendado no 1º e 2º dia para prevenir a Síndrome de Realimentação?',
            options: [
              { id: 'A', text: '35 a 40 kcal/kg/dia para rápida recuperação do estado nutricional' },
              { id: 'B', text: '10 a 15 kcal/kg/dia (cerca de 500 a 750 kcal/dia), progredindo lentamente ao longo de 4 a 7 dias conforme eletrólitos estáveis' },
              { id: 'C', text: 'Dieta hipercalórica contínua de 2.500 kcal/dia imediatamente' },
              { id: 'D', text: 'Apenas água destilada por sonda por 15 dias adicionais' }
            ],
            correctOption: 'B',
            explanation: 'A diretriz ASPEN/ESPEN preconiza início cauteloso (10-15 kcal/kg/dia) com dosagem diária de eletrólitos (P, K, Mg) e reposição eletrolítica profilática.',
            clinicalPearl: '"Start low, go slow": O excesso de calorias na largada é a principal causa iatrogênica de óbito na realimentação.'
          }
        ]
      }
    ],
    result: {
      title: 'Plano Nutricional Conduzido com Rigor Científico',
      description: 'A nutrição enteral foi iniciada com fórmula polimérica normocalórica e hipoproteica inicial, associada a tiamina e reposição de fosfato. No 6º dia o paciente atingiu 25 kcal/kg/dia sem alterações eletrolíticas.',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800'
    }
  },

  // ==========================================
  // PSICOLOGIA
  // ==========================================
  {
    id: 'psi-caso-01',
    title: 'Intervenção em Crise e Manejo de Risco Suicida na Clínica Psicológica',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    specialty: 'Psicologia',
    category: 'Psicologia Clínica e Saúde Mental',
    professionId: 'psicologia',
    caseType: 'emergencia',
    academicLevel: 'Internato / Estágio',
    difficulty: 'Difícil',
    estimatedTime: 15,
    learningObjectives: [
      'Realizar avaliação estruturada de risco de suicídio (ideação, intenção, plano e acesso a meios)',
      'Construir um Plano de Segurança colaborativo (Safety Planning Intervention)',
      'Conduzir o encaminhamento multiprofissional ético e acionamento da rede de apoio'
    ],
    evaluatedCompetencies: ['PSI-01', 'PSI-02'],
    patient: {
      name: 'Juliana Vasconcelos',
      age: 24,
      profession: 'Estudante Universitária',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      complaint: 'Procura atendimento referindo sentimento esmagador de desesperança, insônia terminal e choro incontrolável.',
      history: 'Término de relacionamento traumático há 3 semanas. Relata pensamentos recorrentes de que "o mundo seria melhor sem mim". Na anamnese, admite ter estocado medicação analgésica e ansiolítica.',
      symptoms: ['Humor deprimido acentuado', 'Ideação suicida ativa com plano estruturado', 'Desesperança 9/10'],
      evolutionTime: '3 semanas',
      functionalLimitations: 'Ausência às aulas e isolamento social completo no quarto.'
    },
    stages: [
      {
        id: 'psi-stg-1',
        title: 'Investigação do Risco e Exame do Estado Mental',
        description: 'A paciente encontra-se em crise aguda, com choro copioso, contato visual empobrecido e fala em tom baixo.',
        questions: [
          {
            id: 'psi-q1',
            text: 'Qual a postura e pergunta mais adequada para investigar a ideação suicida durante a entrevista clínica?',
            options: [
              { id: 'A', text: 'Evitar falar diretamente sobre suicídio para não induzir a paciente a ter mais pensamentos de morte' },
              { id: 'B', text: 'Perguntar de forma clara, empática e direta sobre a presença de pensamentos de morte, planos específicos, meios disponíveis e intenção' },
              { id: 'C', text: 'Dizer à paciente que ela é jovem e tem muitos motivos para viver, minimizando a dor' },
              { id: 'D', text: 'Encerrar a sessão imediatamente sem acolhimento' }
            ],
            correctOption: 'B',
            explanation: 'A literatura científica e a OMS confirmam que perguntar diretamente sobre suicídio com empatia NÃO induz o ato; pelo contrário, valida o sofrimento e permite avaliar a letalidade.',
            clinicalPearl: 'Investigue 4 pilares: Ideação (frequência) + Intenção (desejo de agir) + Plano (método) + Meio (acesso facilitado).'
          }
        ]
      },
      {
        id: 'psi-stg-2',
        title: 'Construção do Plano de Segurança e Rede de Apoio',
        description: 'Confirmado alto risco de suicídio: a paciente possui medicação estocada e expressa intenção de agir quando ficar sozinha hoje à noite.',
        questions: [
          {
            id: 'psi-q2',
            text: 'Qual a conduta ética e técnica mandatória do psicólogo nesta situação de perigo iminente à vida?',
            options: [
              { id: 'A', text: 'Liberar a paciente para casa mediante apenas um "contrato verbal de não suicídio"' },
              { id: 'B', text: 'Não permitir que a paciente saia desacompanhada, acionar pessoa de confiança com consentimento esclarecido, remover acesso aos meios (medicamentos) e encaminhar para avaliação psiquiátrica / serviço de emergência em saúde mental' },
              { id: 'C', text: 'Agendar retorno para dali a 15 dias sem envolver familiares para manter o sigilo absoluto' },
              { id: 'D', text: 'Pedir que a paciente pratique meditação quando tiver pensamentos ruins' }
            ],
            correctOption: 'B',
            explanation: 'Em situações de risco iminente de autoextermínio, a quebra de sigilo ético justificada é permitida para proteger a vida do paciente, garantindo que não fique desassistido e receba suporte médico imediato.',
            clinicalPearl: 'O Plano de Segurança de Stanley-Brown identifica sinais de alerta pessoais, estratégias de enfrentamento internas, contatos sociais de distração e serviços de emergência (CVV/188 ou SAMU).'
          }
        ]
      }
    ],
    result: {
      title: 'Manejo de Crise Realizado com Proteção à Vida',
      description: 'A mãe da paciente foi acolhida e orientada na sala de atendimento. As medicações foram retiradas de circulação e a paciente foi avaliada pelo serviço de psiquiatria, iniciando tratamento integrado e psicoterapia semanal com plano de segurança ativo.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'
    }
  },

  // ==========================================
  // CASO RAMIFICADO INTERATIVO (BRANCHED SCENARIO)
  // ==========================================
  {
    id: 'branched-caso-01',
    title: 'Simulação Ramificada: Paragem Cardiorrespiratória e Ressuscitação na Emergência',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    specialty: 'Medicina',
    category: 'Medicina de Emergência e Suporte Avançado',
    professionId: 'medicina',
    caseType: 'ramificado',
    academicLevel: 'Graduação Inicial',
    difficulty: 'Difícil',
    estimatedTime: 20,
    isBranched: true,
    branchNodeInitialId: 'node-start',
    branchNodes: {
      'node-start': {
        id: 'node-start',
        title: 'Cenário Inicial: Paciente Inconsciente na Sala Vermelha',
        scenarioText: 'Um homem de 52 anos dá entrada na sala de emergência trazido por familiares, irresponsivo. Você e a equipa assumem o leito.',
        vitals: { bp: '0/0', hr: 0, rr: 0, spo2: 0, temp: 35.8 },
        choices: [
          {
            id: 'c-1',
            label: '1. Checar responsividade, chamar ajuda e checar pulso carotídeo + respiração simultaneamente (em até 10 segundos)',
            description: 'Abordagem padrão das diretrizes ACLS/BLS.',
            impactType: 'favorable',
            impactExplanation: 'Reconhecimento imediato de PCR sem perda de tempo precioso.',
            nextNodeId: 'node-pcr-confirm',
            scoreDelta: 50
          },
          {
            id: 'c-2',
            label: '2. Tentar puncionar veia periférica antes de qualquer outra medida',
            description: 'Tentar acesso venoso antes de avaliar pulso e via aérea.',
            impactType: 'critical',
            impactExplanation: 'Atraso crítico no início das compressões torácicas; a perfusão cerebral cessa rapidamente.',
            nextNodeId: 'node-delay-pcr',
            scoreDelta: -30
          },
          {
            id: 'c-3',
            label: '3. Solicitar Raio-X de tórax e gasometria com urgência',
            description: 'Solicitar exames complementares antes da estabilização básica.',
            impactType: 'adverse',
            impactExplanation: 'Exames laboratoriais não têm lugar no minuto zero de uma PCR não confirmada.',
            nextNodeId: 'node-delay-pcr',
            scoreDelta: -30
          }
        ]
      },
      'node-delay-pcr': {
        id: 'node-delay-pcr',
        title: 'Alerta: Atraso Crítico no Início das Manobras!',
        scenarioText: 'O paciente permanece sem pulso e sem respirar por mais de 2 minutos. O monitor é acoplado tardiamente.',
        vitals: { bp: '0/0', hr: 0, rr: 0, spo2: 0, temp: 35.5 },
        choices: [
          {
            id: 'c-delay-recover',
            label: 'Iniciar compressões torácicas de alta qualidade imediatamente (100-120/min, 5cm) e analisar o ritmo no monitor',
            description: 'Retomar protocolo correto de RCP.',
            impactType: 'favorable',
            impactExplanation: 'Restabelecimento das compressões mecânicas para fluxo coronariano.',
            nextNodeId: 'node-rhythm-fv',
            scoreDelta: 20
          }
        ]
      },
      'node-pcr-confirm': {
        id: 'node-pcr-confirm',
        title: 'Confirmação de PCR e Análise de Ritmo',
        scenarioText: 'Paciente sem pulso carotídeo palpável e em gasping. As pás do desfibrilador são posicionadas no tórax e revelam ritmo desorganizado com ondas caóticas de alta frequência (Fibrilação Ventricular).',
        vitals: { bp: '0/0', hr: 0, rr: 0, spo2: 0, temp: 35.8 },
        choices: [
          {
            id: 'c-shock-immediate',
            label: 'Desfibrilação imediata (Choque de 200J Bifásico) + Reiniciar compressões por 2 minutos imediatamente sem checar pulso pós-choque',
            description: 'Conduta padrão para ritmos chocáveis (FV/TV sem pulso).',
            impactType: 'favorable',
            impactExplanation: 'Choque precoce com reversão do ritmo caótico e perfusão contínua.',
            nextNodeId: 'node-post-first-shock',
            scoreDelta: 50
          },
          {
            id: 'c-admin-atropine',
            label: 'Administrar Atropina 1mg EV e manter apenas ventilação',
            description: 'Conduta incorreta e sem indicação em FV.',
            impactType: 'critical',
            impactExplanation: 'Atropina não tem efeito em FV e foi banida dos protocolos de PCR.',
            nextNodeId: 'node-asystole-fail',
            scoreDelta: -40
          },
          {
            id: 'c-sync-cardiovert',
            label: 'Ligar o botão de sincronização para cardioversão sincronizada',
            description: 'Tentar sincronizar em Fibrilação Ventricular.',
            impactType: 'adverse',
            impactExplanation: 'Em FV não existem ondas R organizadas; o aparelho não irá disparar o choque no modo sincronizado.',
            nextNodeId: 'node-pcr-confirm',
            scoreDelta: -20
          }
        ]
      },
      'node-post-first-shock': {
        id: 'node-post-first-shock',
        title: 'Segundo Ciclo de RCP e Acesso Venoso',
        scenarioText: 'Após o 1º choque, foram completados 2 minutos de compressões com troca de massagista. O ritmo persiste em FV. Foi obtido acesso venoso periférico.',
        vitals: { bp: '0/0', hr: 0, rr: 0, spo2: 0, temp: 36.0 },
        choices: [
          {
            id: 'c-shock2-epi',
            label: '2º Choque (200J) + Reiniciar compressões + Administrar Adrenalina (Epinefrina) 1mg EV em bólus com flush de 20mL',
            description: 'Indicação de adrenalina a partir do 2º choque em ritmo chocável.',
            impactType: 'favorable',
            impactExplanation: 'Vasoconstrição sistêmica e aumento da pressão de perfusão coronariana.',
            nextNodeId: 'node-third-cycle',
            scoreDelta: 40
          },
          {
            id: 'c-intubate-pause',
            label: 'Parar as compressões por 90 segundos para intubação orotraqueal',
            description: 'Interrupção prolongada das compressões.',
            impactType: 'adverse',
            impactExplanation: 'Interrupções nas compressões reduzem drasticamente a chance de RCE (Retorno da Circulação Espontânea).',
            nextNodeId: 'node-third-cycle',
            scoreDelta: -20
          }
        ]
      },
      'node-third-cycle': {
        id: 'node-third-cycle',
        title: 'Terceiro Ciclo e Farmacoterapia Antiarrítmica',
        scenarioText: 'Completados mais 2 minutos de RCP de alta qualidade. Na checagem de ritmo, o paciente ainda apresenta Fibrilação Ventricular refratária.',
        vitals: { bp: '0/0', hr: 0, rr: 0, spo2: 0, temp: 36.0 },
        choices: [
          {
            id: 'c-shock3-amiodarone',
            label: '3º Choque (200J) + Reiniciar compressões + Administrar Amiodarona 300mg EV (ou Lidocaína 1-1.5 mg/kg)',
            description: 'Indicação do 1º antiarrítmico na FV refratária pós 3º choque.',
            impactType: 'favorable',
            impactExplanation: 'Tratamento farmacológico padrão-ouro para quebra da arritmia refratária.',
            nextNodeId: 'node-rosc-success',
            scoreDelta: 50
          }
        ]
      },
      'node-rosc-success': {
        id: 'node-rosc-success',
        title: 'Desfecho: Retorno da Circulação Espontânea (RCE)!',
        scenarioText: 'Ao final do ciclo pós-amiodarona, a checagem revela ritmo sinusal no monitor! Pulso carotídeo e radial palpáveis, amplos.',
        vitals: { bp: '115/70', hr: 88, rr: 14, spo2: 98, temp: 36.2 },
        choices: [],
        isFinalOutcome: true,
        outcomeEvaluation: {
          isSuccess: true,
          summary: 'Parabéns! O paciente sobreviveu com recuperação completa da circulação e preservação neurológica graças à aplicação rigorosa do protocolo ACLS.',
          clinicalDebrief: 'Pontos-chave: tempo mínimo de interrupção nas massagens, choque precoce em ritmos chocáveis (FV/TV), administração de adrenalina no momento exato e amiodarona 300mg para FV refratária.'
        }
      },
      'node-asystole-fail': {
        id: 'node-asystole-fail',
        title: 'Desfecho Desfavorável: Degeneração para Assistolia Irreversível',
        scenarioText: 'Devido a condutas inadequadas e ausência de desfibrilação precoce, a atividade elétrica miocárdica se extinguiu, evoluindo para assistolia refratária.',
        vitals: { bp: '0/0', hr: 0, rr: 0, spo2: 0, temp: 34.9 },
        choices: [],
        isFinalOutcome: true,
        outcomeEvaluation: {
          isSuccess: false,
          summary: 'O paciente não resistiu. Condutas não respaldadas em evidência atrasaram a desfibrilação.',
          clinicalDebrief: 'Em FV, cada minuto de atraso no choque reduz a probabilidade de sobrevivência em 7 a 10%. Revise o algoritmo de PCR do ACLS.'
        }
      }
    },
    patient: {
      name: 'Roberto Valente',
      age: 52,
      profession: 'Motorista',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300',
      complaint: 'Colapso súbito irresponsivo na via pública.',
      history: 'Cardiopata prévio.',
      symptoms: ['Inconsciência', 'Ausência de pulsos centrais', 'Gasping'],
      evolutionTime: 'Poucos minutos',
      functionalLimitations: 'Parada Cardiorrespiratória em curso.'
    },
    stages: [],
    result: {
      title: 'Simulação Ramificada Concluída',
      description: 'Cenário dinâmico onde as escolhas do estudante alteraram o estado hemodinâmico do paciente.',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800'
    }
  },

  // ==========================================
  // CASO MULTIPROFISSIONAL COLABORATIVO
  // ==========================================
  {
    id: 'interprof-caso-01',
    title: 'Simulação Multiprofissional: Cuidado Integrado ao Paciente Politraumatizado em UTI',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
    specialty: 'Saúde Geral',
    category: 'Cuidado Multiprofissional Integrado',
    professionId: 'medicina',
    caseType: 'multiprofissional',
    academicLevel: 'Internato / Estágio',
    difficulty: 'Médio',
    estimatedTime: 18,
    interprofessionalRoles: [
      {
        roleId: 'med',
        roleName: 'Médico Intensivista',
        professionId: 'medicina',
        iconName: 'Stethoscope',
        specificFindings: [
          'TCE Moderado (Glasgow 10 após suspensão de sedação)',
          'Fratura estável de pelve e contusão pulmonar bilateral',
          'Hemodinâmica estável sob desmame de noradrenalina'
        ],
        responsibilities: [
          'Coordenação da reunião clínica diária (Round)',
          'Definição da janela de desmame sedativo e protocolo de extubação',
          'Prescrição de profilaxia de TVP/TEP e analgesia multimodal'
        ],
        recommendedActions: [
          'Liberar teste de respiração espontânea (TRE) em conjunto com a Fisioterapia',
          'Solicitar conciliação de anticoagulantes com o Farmacêutico',
          'Alinhar meta nutricional com o Nutricionista'
        ]
      },
      {
        roleId: 'enf',
        roleName: 'Enfermeiro Intensivista',
        professionId: 'enfermagem',
        iconName: 'HeartPulse',
        specificFindings: [
          'Braden = 12 (Risco Alto); integridade cutânea preservada no momento',
          'Cateter venoso central D4 sem sinais flogísticos',
          'Balanço hídrico das 24h: +450 mL'
        ],
        responsibilities: [
          'Prevenção de infecções relacionadas à assistência (Bundle de PAV e CVC)',
          'Cuidados na mobilização de paciente com fratura pélvica',
          'Avaliação contínua de dor e nível de sedação (RASS / CPOT)'
        ],
        recommendedActions: [
          'Coordenar posicionamento em leito a 45°',
          'Garantir aspiração subglótica contínua',
          'Monitorizar integridade de fixação do tubo orotraqueal'
        ]
      },
      {
        roleId: 'fisio',
        roleName: 'Fisioterapeuta Intensivista',
        professionId: 'fisioterapia',
        iconName: 'Activity',
        specificFindings: [
          'Pressão de Pico: 22 cmH2O, Driving Pressure: 11 cmH2O (adequada)',
          'Gasometria: PaO2/FiO2 = 280 (melhora da troca gasosa)',
          'Força muscular global grau 3 em membros superiores'
        ],
        responsibilities: [
          'Condução da mecânica ventilatória e desmame do ventilador mecânico',
          'Higiene brônquica e manobras de recrutamento se indicado',
          'Início da mobilização precoce no leito (sedestação assistida)'
        ],
        recommendedActions: [
          'Realizar Teste de Respiração Espontânea (TRE) em tubo T ou PSV 7 cmH2O por 30 minutos',
          'Cálculo do Índice de Respiração Rápida e Superficial (Tobin < 105)',
          'Exercícios ativos-assistidos em leito'
        ]
      },
      {
        roleId: 'farm',
        roleName: 'Farmacêutico Clínico',
        professionId: 'farmacia',
        iconName: 'Pill',
        specificFindings: [
          'Depuração de Creatinina estimada em 75 mL/min',
          'Sedação em transição de Fentanil para analgesia por SNE',
          'Prescrição de Enoxaparina profilática 40mg SC'
        ],
        responsibilities: [
          'Garantir adequação de horários para evitar pico cumulativo de sedativos',
          'Conciliação farmacoterapêutica e triagem de interações',
          'Monitorização de plaquetas para profilaxia de HIT (Trombocitopenia Induzida por Heparina)'
        ],
        recommendedActions: [
          'Orientar troca de analgésico EV para via enteral assim que permitida',
          'Verificar contagem de plaquetas de 3/3 dias'
        ]
      },
      {
        roleId: 'nutri',
        roleName: 'Nutricionista Clínico',
        professionId: 'nutricao',
        iconName: 'Apple',
        specificFindings: [
          'Paciente em TNE por bomba a 55 mL/h atingindo 85% da meta calórica',
          'Sem resíduos gástricos elevados ou distensão abdominal'
        ],
        responsibilities: [
          'Atingir meta de 1.5 g/kg/dia de proteínas para cicatrização tecidual',
          'Planejar pausa da dieta enteral 2h antes da extubação traqueal'
        ],
        recommendedActions: [
          'Adequar aporte protéico hipercatabólico pós-trauma',
          'Alinhar cronograma de pausa de dieta com enfermagem/fisioterapia no momento da extubação'
        ]
      }
    ],
    patient: {
      name: 'Leonardo Faria',
      age: 29,
      profession: 'Engenheiro Civil',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
      complaint: 'Vítima de colisão auto x anteparo em alta velocidade, no 5º dia de internação na UTI.',
      history: 'Drenagem de pneumotórax já retirada, fratura de pelve sob conduta conservadora, em desmame ventilatório.',
      symptoms: ['Acordando sob comando', 'Tosse eficaz', 'Troca gasosa estável'],
      evolutionTime: '5º DIT',
      functionalLimitations: 'Acamado sob ventilação mecânica invasiva.'
    },
    stages: [
      {
        id: 'interprof-stg-1',
        title: 'Mesa Redonda Interdisciplinar de Decisão',
        description: 'A equipa multiprofissional reúne-se para avaliar a prontidão do paciente para extubação traqueal e mobilização.',
        questions: [
          {
            id: 'interprof-q1',
            text: 'Qual a principal vantagem da tomada de decisão multiprofissional baseada na comunicação em alça fechada (Closed-Loop Communication) e metodologia SBAR?',
            options: [
              { id: 'A', text: 'Eliminar a necessidade de registos no prontuário do paciente' },
              { id: 'B', text: 'Reduzir erros assistenciais, sincronizar o desmame ventilatório com a pausa alimentar e garantir segurança global do paciente' },
              { id: 'C', text: 'Permitir que uma única profissão tome todas as decisões isoladamente' },
              { id: 'D', text: 'Acelerar a alta sem critérios de segurança' }
            ],
            correctOption: 'B',
            explanation: 'A comunicação interprofissional estruturada (SBAR) previne eventos adversos como aspiração brônquica durante a extubação e desalinhamento de condutas terapêuticas.',
            clinicalPearl: 'A extubação segura é um procedimento multiprofissional: médico indica, fisioterapeuta conduz os testes mecânicos e enfermeiro garante estabilidade e aspiração das vias aéreas.'
          }
        ]
      }
    ],
    result: {
      title: 'Plano de Cuidados Integrado com Sucesso',
      description: 'Com a coordenação entre Medicina, Enfermagem, Fisioterapia, Farmácia e Nutrição, o paciente foi extubado com sucesso, tolerou sedestação à beira do leito e iniciou dieta oral orientada.',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800'
    }
  }
];

export function getCasesByProfession(professionId: string): ClinicalCase[] {
  return MULTIPROFESSIONAL_CASES.filter(
    c => c.professionId?.toLowerCase() === professionId.toLowerCase() ||
         c.specialty?.toLowerCase().includes(professionId.toLowerCase())
  );
}

export function getAllMultiprofessionalCases(): ClinicalCase[] {
  return MULTIPROFESSIONAL_CASES;
}
