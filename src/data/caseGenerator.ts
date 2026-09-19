import { ClinicalCase, Specialty, Multimedia, Category, CaseStage } from '../types';
import { SPECIALTIES, SPECIALTY_CATEGORIES } from '../constants';

const MALE_NAMES = [
  'António', 'Carlos', 'Joaquim', 'Pedro', 'Manuel', 'José', 'Francisco', 'João', 'Fernando', 'Ricardo', 
  'Miguel', 'Luís', 'Paulo', 'Jorge', 'André', 'Tiago', 'Bruno', 'Gonçalo', 'Nuno', 'Rui',
  'Alberto', 'Bernardo', 'Cristiano', 'Daniel', 'Eduardo', 'Filipe', 'Gabriel', 'Hugo', 'Igor', 'João Pedro',
  'Leonardo', 'Marco', 'Nelson', 'Orlando', 'Patrício', 'Rafael', 'Sérgio', 'Tomás', 'Urbano', 'Vítor',
  'Xavier', 'Yuri', 'Zacarias', 'Afonso', 'Benedito', 'Caio', 'Duarte', 'Estêvão', 'Fabiano', 'Gilberto',
  'Hélder', 'Ivo', 'Joel', 'Kevin', 'Leandro', 'Marcelo', 'Natan', 'Osvaldo', 'Plínio', 'Quintino',
  'Samuel', 'Tadeu', 'Ulisses', 'Valdemar', 'Wagner', 'Xerxes', 'Yago', 'Zeno', 'Américo', 'Batista',
  'Cláudio', 'Dionísio', 'Emanuel', 'Fausto', 'Geraldo', 'Hernâni', 'Isidro', 'Januário', 'Lázaro', 'Modesto'
];

const FEMALE_NAMES = [
  'Maria', 'Ana', 'Isabel', 'Cláudia', 'Sofia', 'Rita', 'Marta', 'Patrícia', 'Sílvia', 'Helena', 
  'Cristina', 'Beatriz', 'Inês', 'Joana', 'Catarina', 'Daniela', 'Sara', 'Teresa', 'Luísa', 'Paula',
  'Alice', 'Bárbara', 'Camila', 'Diana', 'Elsa', 'Fernanda', 'Glória', 'Iolanda', 'Jéssica', 'Laura',
  'Madalena', 'Natália', 'Olga', 'Priscila', 'Queli', 'Raquel', 'Sónia', 'Tatiana', 'Úrsula', 'Vanessa',
  'Wanda', 'Xana', 'Yara', 'Zulmira', 'Amélia', 'Branca', 'Cecília', 'Dora', 'Ester', 'Filomena',
  'Graça', 'Hilda', 'Irene', 'Júlia', 'Kátia', 'Lúcia', 'Mónica', 'Neuza', 'Otília', 'Pilar',
  'Quitéria', 'Rosa', 'Susana', 'Telma', 'Umbelina', 'Vera', 'Ximena', 'Yvone', 'Zélia', 'Adelaide',
  'Berta', 'Célia', 'Dalila', 'Eunice', 'Fátima', 'Gisela', 'Hortênsia', 'Ilda', 'Julieta', 'Lídia'
];

const SURNAMES = [
  'Silva', 'Santos', 'Oliveira', 'Pereira', 'Rodrigues', 'Almeida', 'Costa', 'Gomes', 'Martins', 'Lopes', 
  'Fernandes', 'Gonçalves', 'Carvalho', 'Mendes', 'Barbosa', 'Ribeiro', 'Pinto', 'Cardoso', 'Teixeira', 'Sousa',
  'Vieira', 'Castro', 'Coelho', 'Correia', 'Duarte', 'Esteves', 'Figueiredo', 'Fonseca', 'Freitas', 'Guerra',
  'Henriques', 'Jesus', 'Laranjeira', 'Leite', 'Machado', 'Marques', 'Moreira', 'Mota', 'Nascimento', 'Neto',
  'Nunes', 'Pacheco', 'Paiva', 'Reis', 'Rocha', 'Sampaio', 'Soares', 'Tavares', 'Valente', 'Vaz',
  'Amaral', 'Azevedo', 'Basto', 'Branco', 'Cunha', 'Dias', 'Ferreira', 'Geraldes', 'Jordão', 'Lima',
  'Magalhães', 'Nogueira', 'Pina', 'Queirós', 'Sacadura', 'Teles', 'Uchoa', 'Valadares', 'Ximenes', 'Zagalo',
  'Borges', 'Cabral', 'Dantas', 'Espírito Santo', 'Furtado', 'Galvão', 'Hipólito', 'Igrejas', 'Lacerda', 'Macedo'
];

const PROFESSIONS = [
  'Motorista', 'Enfermeiro', 'Professor', 'Contabilista', 'Engenheiro', 'Atleta', 'Reformado', 'Estudante', 
  'Cozinheiro', 'Vendedor', 'Administrativo', 'Arquiteto', 'Médico', 'Polícia', 'Bombeiro',
  'Carpinteiro', 'Eletricista', 'Canalizador', 'Mecânico', 'Padeiro', 'Cabeleireiro', 'Esteticista', 'Advogado', 
  'Designer', 'Programador', 'Jornalista', 'Fotógrafo', 'Músico', 'Pintor', 'Escultor',
  'Agricultor', 'Pescador', 'Jardineiro', 'Veterinário', 'Psicólogo', 'Fisioterapeuta', 'Nutricionista', 
  'Farmacêutico', 'Dentista', 'Ótico', 'Rececionista', 'Secretário', 'Gerente', 'Diretor', 'Consultor',
  'Analista', 'Técnico', 'Operário', 'Empregado de Mesa', 'Barman', 'Segurança', 'Limpeza', 'Vigilante',
  'Pintor de Construção', 'Pedreiro', 'Soldador', 'Arquivista', 'Bibliotecário', 'Tradutor', 'Intérprete',
  'Taxista', 'Carteiro', 'Talhante', 'Peixeiro', 'Sapateiro', 'Alfaiate', 'Costureira', 'Bordadeira',
  'Mestre de Obras', 'Topógrafo', 'Geólogo', 'Biólogo', 'Químico', 'Físico', 'Astrónomo', 'Arqueólogo',
  'Antropólogo', 'Sociólogo', 'Político', 'Diplomata', 'Juiz', 'Procurador', 'Notário', 'Solicitador'
];

const MALE_IMAGES = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800'
];

const FEMALE_IMAGES = [
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1567532939604-b6b5b0ad2f01?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=800'
];

const RADIOLOGY_IMAGES = [
  'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?auto=format&fit=crop&q=80&w=800'
];

const MEDICINE_IMAGES = [
  'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1505751172676-53ad2495713b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=800'
];

const DENTAL_IMAGES = [
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1625217527288-93919c99650a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1468493858157-0da44aaf1d13?auto=format&fit=crop&q=80&w=800'
];

const NURSING_IMAGES = [
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce2?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1581056344415-3abb473d756c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800'
];

const LAB_IMAGES = [
  'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800'
];

const PHARMACY_IMAGES = [
  'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=800'
];

const EVALUATION_IMAGES = [
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&q=80&w=800'
];

const DIAGNOSIS_IMAGES = [
  'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=800'
];

const TREATMENT_IMAGES = [
  'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1591258739299-5b65d5cbb235?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=800'
];

const EXERCISE_IMAGES = [
  'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800'
];

const RESULT_IMAGES = [
  'https://images.unsplash.com/photo-1505751172676-53ad2495713b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'
];

const PHYSIO_IMAGES = EVALUATION_IMAGES;

const PHYSIO_VIDEOS = [
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'https://www.w3schools.com/html/movie.mp4',
  'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
];

const CATEGORY_IMAGES: Record<string, string[]> = {
  'Coluna Vertebral': [
    'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=800'
  ],
  'Neurológico': [
    'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80&w=800'
  ],
  'Cardiorrespiratória': [
    'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80&w=800'
  ],
  'Traumato-Ortopédica': [
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=800'
  ],
  'Desportivo': [
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'
  ],
  'Pediátrica': [
    'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'
  ],
  'Geriátrica': [
    'https://images.unsplash.com/photo-1581056344415-3abb473d756c?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?auto=format&fit=crop&q=80&w=800'
  ]
};

const getSpecialtyImages = (specialty: Specialty) => {
  switch (specialty) {
    case 'Saúde Geral': return MEDICINE_IMAGES; // Use medicine images as default for general health
    case 'Medicina Geral': return MEDICINE_IMAGES;
    case 'Medicina Dentária': return DENTAL_IMAGES;
    case 'Enfermagem': return NURSING_IMAGES;
    case 'Análises Clínicas': return LAB_IMAGES;
    case 'Farmácia': return PHARMACY_IMAGES;
    default: return PHYSIO_IMAGES;
  }
};

const getStageImage = (stage: string, category: string, specialty: Specialty) => {
  let images: string[] = [];
  switch (stage) {
    case 'evaluation':
      images = EVALUATION_IMAGES;
      break;
    case 'diagnosis':
      images = DIAGNOSIS_IMAGES;
      break;
    case 'treatment':
      images = TREATMENT_IMAGES;
      break;
    case 'exercises':
      images = EXERCISE_IMAGES;
      break;
    default:
      images = RESULT_IMAGES;
  }
  
  // Mix with specialty images
  const specialtySpecific = getSpecialtyImages(specialty);
  if (specialtySpecific.length > 0 && Math.random() > 0.4) {
    return specialtySpecific[Math.floor(Math.random() * specialtySpecific.length)];
  }
  
  // Mix with category images if available for variety but keep it clinical
  const categorySpecific = CATEGORY_IMAGES[category] || [];
  if (categorySpecific.length > 0 && Math.random() > 0.5) {
    return categorySpecific[Math.floor(Math.random() * categorySpecific.length)];
  }
  
  return images[Math.floor(Math.random() * images.length)];
};

const GENERIC_SYMPTOMS = [
  'Fadiga leve', 'Dificuldade em dormir', 'Ligeira perda de apetite', 'Irritabilidade', 'Cefaleia tensional ocasional',
  'Sensação de pernas pesadas', 'Ligeiro desconforto abdominal', 'Ansiedade leve', 'Dificuldade de concentração',
  'Suores frios ocasionais', 'Alteração ligeira do trânsito intestinal', 'Sensação de boca seca'
];

const CATEGORY_SYMPTOMS: Record<string, string[]> = {
  'Coluna Vertebral': [
    'Dor que irradia para os glúteos', 'Sensação de peso na região lombar', 'Rigidez matinal < 15 min',
    'Parestesia distal leve', 'Dor ao mudar de posição na cama', 'Espasmo muscular paravertebral',
    'Dificuldade em manter a posição sentada', 'Sensação de instabilidade ao caminhar'
  ],
  'Neurológico': [
    'Ligeira falta de coordenação', 'Tremor fino nas mãos', 'Alteração da sensibilidade tátil',
    'Dificuldade em realizar movimentos finos', 'Sensação de desequilíbrio leve', 'Fadiga mental precoce',
    'Lentidão na resposta motora', 'Parestesia em "luva" ou "meia"'
  ],
  'Cardiorrespiratória': [
    'Dispneia aos grandes esforços', 'Tosse seca irritativa', 'Sensação de opressão torácica leve',
    'Palpitações ao stress', 'Cansaço precoce na marcha', 'Necessidade de usar duas almofadas para dormir',
    'Edema maleolar vespertino', 'Sibilância ocasional'
  ],
  'Traumato-Ortopédica': [
    'Dor articular à palpação', 'Ligeiro edema pós-esforço', 'Crepitação indolor',
    'Sensação de "falha" articular', 'Rigidez após imobilização prolongada', 'Fraqueza muscular por inibição álgica',
    'Dificuldade em realizar amplitudes máximas', 'Calor local discreto'
  ],
  'Desportivo': [
    'Dor muscular tardia (DOMS)', 'Sensação de "fisgada" muscular', 'Cãibras frequentes',
    'Diminuição da performance habitual', 'Fadiga muscular localizada', 'Instabilidade funcional',
    'Dor que cede com o aquecimento', 'Rigidez pós-treino'
  ],
  'Pediátrica': [
    'Irritabilidade e choro fácil', 'Recusa em realizar certas posturas', 'Atraso ligeiro no desenvolvimento motor',
    'Alteração do padrão de sono', 'Dificuldade na sucção ou alimentação', 'Hipotonia leve',
    'Assimetria de movimentos', 'Desinteresse pelo brincar'
  ],
  'Geriátrica': [
    'Medo de cair (ptofobia)', 'Marcha com passos curtos', 'Dificuldade em levantar da cadeira',
    'Rigidez articular generalizada', 'Perda de massa muscular (sarcopenia)', 'Alteração do equilíbrio estático',
    'Dificuldade em realizar AVDs complexas', 'Confusão mental leve em ambientes novos'
  ],
  'Fisioterapia Reumatológica': ['Rigidez matinal prolongada', 'Deformidade em "pescoço de cisne"', 'Nódulos de Heberden', 'Pannus sinovial', 'Sinovite simétrica', 'Dor noturna inflamatória'],
  'Fisioterapia em Queimados': ['Cicatriz hipertrófica', 'Contratura cutânea', 'Retração cicatricial', 'Dor neuropática periférica', 'Limitação por brida', 'Pele com textura cerosa'],
  'Fisioterapia em Amputados': ['Dor fantasma', 'Sensação de membro fantasma', 'Edema do coto', 'Neuroma de amputação', 'Instabilidade protética', 'Dermatite de contacto no coto'],
  'Fisioterapia em Traumato-Ortopedia Desportiva': ['Rotura ligamentar', 'Lesão meniscal', 'Instabilidade funcional', 'Défice proprioceptivo', 'Tendinopatia reativa', 'Inibição muscular artrogénica'],
  'Fisioterapia em Cirurgia (Pré e Pós-operatória)': ['Edema pós-cirúrgico', 'Aderência cicatricial', 'Défice de expansão pulmonar', 'Trombose venosa profunda', 'Íleo paralítico', 'Deiscência de sutura leve'],
  'Fisioterapia em Doenças Infecciosas': ['Mialgia generalizada', 'Fadiga pós-viral', 'Défice de força por desuso', 'Polineuropatia crítica', 'Sarcopenia infeciosa', 'Intolerância ao ortostatismo'],
  'Fisioterapia em Saúde Mental / Psiquiátrica': ['Tensão psicossomática', 'Bloqueio respiratório emocional', 'Rigidez por neurolépticos', 'Disfunção da imagem corporal', 'Bradicinesia psicogénica', 'Alteração do tónus afetivo'],
  'Fisioterapia em Geriatria Avançada': ['Instabilidade postural severa', 'Sarcopenia grave', 'Risco de queda elevado', 'Marcha senil a pequenos passos', 'Disfunção cognitiva motora', 'Fragilidade (frailty)'],
  'Fisioterapia em Neonatologia': ['Torcicolo congénito', 'Paralisia braquial obstétrica', 'Disfunção respiratória neonatal', 'Atraso no desenvolvimento motor', 'Hipotonia benigna', 'Assimetria craniana'],
  'Fisioterapia Respiratória Pediátrica': ['Bronquiolite obliterante', 'Sibilância recorrente', 'Tiragem subcostal', 'Secreções espessas', 'Défice de ventilação localizado', 'Expiração prolongada'],
  'Fisioterapia Neuropediátrica': ['Paralisia cerebral espástica', 'Diplegia', 'Reflexos primitivos persistentes', 'Espasticidade em tesoura', 'Aplasia motora', 'Espasticidade flutuante'],
  'Fisioterapia em Lesão Medular': ['Paraplegia', 'Tetraplegia', 'Bexiga neurogénica', 'Disreflexia autonómica', 'Úlceras por pressão', 'Espasticidade infra-lesional'],
  'Fisioterapia em AVC': ['Hemiplegia', 'Afasia de expressão', 'Negligência hemiespacial', 'Sinergia flexora', 'Subluxação do ombro', 'Clonus'],
  'Fisioterapia em Doenças Neurodegenerativas': ['Bradicinesia', 'Tremor de intenção', 'Rigidez em roda dentada', 'Instabilidade de marcha', 'Disfagia', 'Micrografia'],
  'Fisioterapia em Disfunções Temporomandibulares (DTM)': ['Estalido articular', 'Luxação discal com redução', 'Trismo', 'Bruxismo de vigília', 'Desvio mandibular', 'Cefaleia miogénica'],
  'Fisioterapia em Linfedema': ['Sinal de Stemmer positivo', 'Edema duro de membro', 'Fibrose tecidular', 'Linfangiossarcoma', 'Pele em casca de laranja', 'Sensação de peso no membro'],
  'Fisioterapia em Disfunções Sexuais': ['Vaginismo', 'Dispareunia', 'Hipertonia do soalho pélvico', 'Incontinência urinária de esforço', 'Prolapso de órgãos pélvicos', 'Anorgasmia facultativa'],
  'Fisioterapia Hospitalar': ['Descondicionamento físico', 'Risco de aspiração', 'Pneumonia nosocomial', 'Polineuropatia do doente crítico', 'Disfunção diafragmática', 'Atelectasia'],
  'Fisioterapia Domiciliar (Home Care)': ['Dependência nas AVDs', 'Ambiente doméstico inseguro', 'Falta de apoio familiar', 'Imobilidade no leito', 'Anquilose funcional', 'Défice de transferências'],
  'Fisioterapia Robótica': ['Dependência de exosqueleto', 'Fadiga por interface robótica', 'Coordenação máquina-homem', 'Marcha robótica assistida', 'Estímulo neuroplástico', 'Desajuste da órtese'],
  'Fisioterapia com Realidade Virtual': ['Cinetose', 'Défice de feedback visual', 'Imersão limitada', 'Coordenação óculo-manual', 'Motivação aumentada', 'Desorientação espacial temporária'],
  'Fisioterapia Esportiva de Alta Performance': ['Overtraining', 'Fadiga central', 'Défice de potência anaeróbia', 'Lactato elevado persistente', 'Lesão por microtrauma acumulado', 'Desequilíbrio agonista/antagonista'],
  'Fisioterapia Integrativa': ['Desequilíbrio energético', 'Tensão miofascial sistémica', 'Disfunção autonómica', 'Inflamação crónica', 'Stress oxidativo', 'Disfunção miofascial'],
  'Fisioterapia Preventiva': ['Má postura ergonómica', 'Défice de flexibilidade preventiva', 'Fraqueza de CORE', 'Risco ocupacional', 'Comprometimento funcional leve', 'Fadiga muscular postural'],
  'Osteopatia': ['Disfunção osteopática vertebral', 'Restrição de mobilidade sacra', 'Tensão craniana', 'Disfunção visceral', 'Espasmo diafragmático', 'Facilitação segmentar'],
  'Quiropraxia': ['Subluxação vertebral', 'Restrição articular segmentar', 'Compressão radicular', 'Disfunção sacroilíaca', 'Contratura antálgica', 'Instabilidade posicional'],
  'Dry Needling (Agulhamento Seco)': ['Ponto gatilho miofascial ativo', 'Banda tensa muscular', 'Dor referida característica', 'Resposta de contração local', 'Restrição isquémica', 'Hipersensibilidade local'],
  'Bandagem Funcional (Kinesio Taping)': ['Instabilidade articular leve', 'Edema linfático superficial', 'Inibição muscular', 'Facilitação neuromuscular', 'Derrame tecidular', 'Má postura corrigível'],
  'Terapia Miofascial': ['Restrição de deslizamento fascial', 'Ponto gatilho latente', 'Tensão em cadeias musculares', 'Aderência tecidular', 'Perda de elasticidade fascial', 'Retracção de fáscia profunda'],
  'Conceito Bobath': ['Défice de reação de equilíbrio', 'Tónus postural anormal', 'Falta de controlo proximal', 'Padrão de movimento anormal', 'Défice de preensão funcional', 'Inibição de reflexos'],
  'Método McKenzie': ['Centralização da dor', 'Derangement discal', 'Disfunção mecânica', 'Postura de inclinação lateral', 'Preferência direcional', 'Fenómeno de periferização'],
  'Hematologia Clínica': ['Anemia', 'Trombocitopenia', 'Leucocitose', 'Blastos no sangue periférico', 'Pancitopenia'],
  'Bioquímica Clínica': ['Hiperglicemia', 'Hipercolesterolemia', 'Elevação de transaminases', 'Azotémia', 'Creatinina elevada'],
  'Microbiologia': ['Bacteriúria', 'Leucocitúria', 'Gram positivo em cultura', 'Sépsis', 'Infeção fúngica'],
  'Imunologia': ['ANA positivo', 'Hipocomplementemia', 'IgE elevada', 'Autoanticorpos ativos', 'Imunodeficiência'],
  'Genética Clínica': ['Trissomia', 'Cariótipo alterado', 'Mutação de novo', 'Disfunção enzimática genética', 'Malformação congénita'],
  'Toxicologia': ['Níveis de paracetamol tóxicos', 'Acidose metabólica', 'Hepatotoxicidade aguda', 'Pupilas mióticas por opioides', 'Insucesso renal agudo'],
  'Parasitologia': ['Ovos de helmintas', 'Quistos de Giardia', 'Amoebas ativas', 'Infestação intestinal', 'Anemia parasitária'],
  'Uroanálise': ['Hematúria', 'Proteinúria', 'Cilindros granulares', 'Cristais de oxalato', 'Leucocitúria maciça'],
  'Endocrinologia Laboratorial': ['TSH elevado/baixo', 'Prolactina alta', 'Cortisol basal alterado', 'PTH elevado', 'Marcadores ósseos elevados'],
  'Citologia': ['ASCUS', 'LSIL', 'HSIL', 'Células glandulares atípicas', 'Carcinoma in situ'],
  'Hemostase': ['INR prolongado', 'Tempo de Tromboplastina alterado', 'D-Dímeros elevados', 'Fatores de coagulação deficientes', 'Trombofilia'],
  'Biologia Molecular': ['Carga viral detetável', 'Mutação específica identificada', 'Polimorfismo de DNA', 'RNA viral', 'Expressão génica alterada']
};

const getCategoryImage = (category: string, specialty: Specialty) => {
  const categoryImages = CATEGORY_IMAGES[category];
  if (categoryImages && categoryImages.length > 0) {
    return categoryImages[Math.floor(Math.random() * categoryImages.length)];
  }
  const specialtyImages = getSpecialtyImages(specialty);
  return specialtyImages[Math.floor(Math.random() * specialtyImages.length)];
};

interface QuestionTemplate {
  text: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

interface StageTemplate {
  title: string;
  description: string;
  questions: QuestionTemplate[];
}

interface CaseTemplate {
  complaints: string[];
  histories: string[];
  symptoms: string[][];
  evolutionTimes: string[];
  functionalLimitations: string[];
  stages?: StageTemplate[];
  questions?: {
    evaluation: QuestionTemplate[];
    diagnosis: QuestionTemplate[];
    treatment: QuestionTemplate[];
    exercises?: QuestionTemplate[];
  };
}

const SPECIALTY_BASE_TEMPLATES: Record<Specialty, CaseTemplate> = {
  'Saúde Geral': {
    complaints: [
      'Mal-estar geral e fadiga.', 'Dor persistente em região não especificada.', 'Alterações no sono e apetite.',
      'Dificuldade em realizar atividades quotidianas.', 'Sensação de falta de energia.', 'Desconforto físico generalizado.',
      'Preocupação com o estado de saúde atual.', 'Necessidade de check-up preventivo.', 'Sintomas vagos mas persistentes.',
      'Dificuldade de concentração e memória.', 'Alterações de humor associadas a mal-estar.', 'Limitação funcional progressiva.'
    ],
    histories: [
      'Início gradual dos sintomas nos últimos meses.', 'História familiar de condições crónicas.', 'Estilo de vida sedentário e stressante.',
      'Recuperação lenta de doença anterior.', 'Mudança recente nos hábitos de vida.', 'Preocupação com envelhecimento saudável.',
      'História de múltiplas queixas sem diagnóstico claro.', 'Necessidade de orientação em saúde multidisciplinar.', 'Acompanhamento de rotina após evento agudo.',
      'Agravamento de sintomas sob stress emocional.', 'História de automedicação sem sucesso.', 'Procura por melhoria da qualidade de vida.'
    ],
    symptoms: [
      ['Fadiga crónica', 'Dificuldade de concentração', 'Irritabilidade'],
      ['Dor difusa', 'Rigidez matinal leve', 'Sono não reparador'],
      ['Alteração do apetite', 'Variação de peso', 'Desconforto gástrico'],
      ['Tonturas ocasionais', 'Palpitações leves', 'Ansiedade'],
      ['Limitação de esforço', 'Cansaço ao subir escadas', 'Falta de ar leve']
    ],
    evolutionTimes: ['1 mês', '3 meses', '6 meses', '1 ano', 'Vários anos', 'Fase subaguda (2 semanas)', 'Progressivo há 2 meses'],
    functionalLimitations: [
      'Dificuldade em manter la produtividade no trabalho.', 'Limitação na realização de exercício físico.', 'Dificuldade em manter vida social ativa.',
      'Necessidade de repouso frequente durante o dia.', 'Incapacidade de realizar tarefas domésticas pesadas.', 'Alteração na qualidade do sono e descanso.',
      'Dificuldade em subir escadas ou caminhar longas distâncias.', 'Dependência de terceiros para algumas atividades.', 'Impacto negativo na qualidade de vida global.'
    ],
    stages: [
      {
        title: 'Avaliação Clínica',
        description: 'Coleta de dados e sinais vitais.',
        questions: [
          { text: 'Qual o primeiro passo numa avaliação de saúde geral?', options: ['Anamnese detalhada', 'Exame de sangue', 'Prescrição de fármacos', 'Cirurgia imediata'], correctIdx: 0, explanation: 'A história clínica é a base de qualquer avaliação de saúde.' },
          { text: 'Os sinais vitais incluem:', options: ['TA, FC, FR e Temperatura', 'Apenas o peso', 'Cor dos olhos', 'Força muscular'], correctIdx: 0, explanation: 'São indicadores básicos das funções vitais do organismo.' },
          { text: 'O IMC (Índice de Massa Corporal) avalia:', options: ['Relação peso/altura', 'Percentagem de gordura exata', 'Força óssea', 'Nível de hidratação'], correctIdx: 0, explanation: 'É um indicador rápido de estado nutricional.' },
          { text: 'A avaliação da dor deve considerar:', options: ['Localização, intensidade e tipo', 'Apenas a intensidade', 'Só se o paciente chora', 'Nada, a dor é psicológica'], correctIdx: 0, explanation: 'A dor é multidimensional e requer caracterização completa.' }
        ]
      },
      {
        title: 'Diagnóstico',
        description: 'Identificação da condição principal.',
        questions: [
          { text: 'Um diagnóstico diferencial serve para:', options: ['Distinguir entre doenças semelhantes', 'Confirmar a primeira hipótese', 'Aumentar o custo do exame', 'Nenhuma das anteriores'], correctIdx: 0, explanation: 'Permite excluir condições com sintomas parecidos.' },
          { text: 'Sintomas "red flags" indicam:', options: ['Necessidade de investigação urgente', 'Saúde perfeita', 'Cura próxima', 'Apenas stress'], correctIdx: 0, explanation: 'São sinais de alerta para patologias graves.' },
          { text: 'A prevenção primária visa:', options: ['Evitar o aparecimento da doença', 'Tratar a doença instalada', 'Reabilitar sequelas', 'Fazer o diagnóstico precoce'], correctIdx: 0, explanation: 'Foca na promoção da saúde e proteção específica.' }
        ]
      },
      {
        title: 'Plano de Cuidados',
        description: 'Definição das intervenções necessárias.',
        questions: [
          { text: 'A adesão ao tratamento depende de:', options: ['Comunicação clara e literacia', 'Apenas do preço', 'Só da vontade do médico', 'Nada, o paciente decide'], correctIdx: 0, explanation: 'O entendimento do plano é crucial para o sucesso.' },
          { text: 'Uma abordagem multidisciplinar envolve:', options: ['Vários profissionais de saúde', 'Apenas um médico', 'Só o paciente e a família', 'Ninguém, o tratamento é isolado'], correctIdx: 0, explanation: 'Diferentes valências colaboram para o bem-estar do paciente.' },
          { text: 'O estilo de vida saudável inclui:', options: ['Dieta equilibrada e exercício', 'Fumar pouco', 'Dormir 3 horas', 'Beber apenas café'], correctIdx: 0, explanation: 'São pilares fundamentais da saúde preventiva.' }
        ]
      },
      {
        title: 'Promoção da Saúde',
        description: 'Orientações para manutenção do bem-estar.',
        questions: [
          { text: 'A recomendação da OMS para atividade física é:', options: ['150-300 min moderados/semana', '10 min por mês', 'Apenas correr maratonas', 'Ficar sentado'], correctIdx: 0, explanation: 'Níveis mínimos para benefícios substanciais à saúde.' },
          { text: 'O exercício físico regular ajuda a prevenir:', options: ['Doenças cardiovasculares e diabetes', 'Apenas miopia', 'Cáries dentárias', 'Nada'], correctIdx: 0, explanation: 'Reduz significativamente o risco de doenças crónicas.' },
          { text: 'O treino de força em adultos visa:', options: ['Manutenção da massa muscular e osso', 'Apenas estética', 'Ficar mais alto', 'Nada'], correctIdx: 0, explanation: 'É essencial para o metabolismo e funcionalidade.' }
        ]
      }
    ]
  },
  'Fisioterapia': {
    complaints: [
      'Dor articular persistente.', 'Limitação de movimento.', 'Fraqueza muscular.', 
      'Instabilidade articular.', 'Rigidez matinal prolongada.', 'Dor aguda ao esforço.',
      'Dificuldade em manter o equilíbrio.', 'Parestesia nos membros.', 'Edema persistente.',
      'Cãibras frequentes.', 'Perda de coordenação motora.', 'Dor referida à distância.'
    ],
    histories: [
      'Início após esforço físico intenso.', 'História de lesão antiga mal recuperada.', 'Sedentarismo prolongado.',
      'Traumatismo direto recente.', 'Pós-operatório de 3 meses.', 'Doença degenerativa progressiva.',
      'Sobrecarga repetitiva no trabalho.', 'Queda da própria altura.', 'Acidente desportivo.',
      'Agravamento progressivo sem causa aparente.', 'História de múltiplas entorses.', 'Uso de calçado inadequado.'
    ],
    symptoms: [
      ['Dor à palpação', 'Edema leve', 'Calor local'], 
      ['Fraqueza muscular', 'Rigidez articular', 'Crepitação'],
      ['Diminuição da ADM', 'Espasmo muscular', 'Parestesia'],
      ['Instabilidade', 'Dor à descarga de peso', 'Bloqueio articular'],
      ['Atrofia muscular', 'Alteração da marcha', 'Fadiga precoce']
    ],
    evolutionTimes: ['2 semanas', '1 mês', '3 meses', '6 meses', '1 ano', 'Fase aguda (48h)', 'Recorrente há anos'],
    functionalLimitations: [
      'Dificuldade em realizar AVDs.', 'Limitação na marcha.'
    ],
    stages: [
      {
        title: 'Avaliação Fisioterapêutica',
        description: 'Exame físico e testes específicos.',
        questions: [
          { text: 'Qual o principal teste de mobilidade?', options: ['Goniometria', 'Raio-X', 'Sangue', 'Visão'], correctIdx: 0, explanation: 'A goniometria mede a amplitude de movimento.' },
          { text: 'A palpação visa identificar:', options: ['Pontos gatilho e edema', 'Fraturas internas', 'Nível de glicose', 'Capacidade auditiva'], correctIdx: 0, explanation: 'A palpação avalia a integridade dos tecidos moles.' },
          { text: 'O teste de força muscular manual (escala de 0 a 5) avalia:', options: ['Contração e resistência', 'Velocidade de reação', 'Flexibilidade', 'Equilíbrio'], correctIdx: 0, explanation: 'A escala de Oxford é o padrão ouro clínico.' },
          { text: 'A inspeção postural observa:', options: ['Desvios e assimetrias', 'Batimento cardíaco', 'Reflexos pupilares', 'Audição'], correctIdx: 0, explanation: 'Identifica compensações e desequilíbrios estruturais.' },
          { text: 'O sinal de cacifo é usado para avaliar:', options: ['Edema', 'Força', 'Sensibilidade', 'Coordenação'], correctIdx: 0, explanation: 'A pressão digital deixa uma depressão se houver edema.' },
          { text: 'A avaliação da sensibilidade superficial testa:', options: ['Tato fino e dor', 'Força bruta', 'Visão periférica', 'Olfato'], correctIdx: 0, explanation: 'Dermátomos são testados para identificar lesões nervosas.' },
          { text: 'O teste de reflexos osteotendinosos avalia:', options: ['Integridade medular', 'Força muscular', 'Flexibilidade', 'Equilíbrio estático'], correctIdx: 0, explanation: 'Reflexos como o patelar indicam o estado do arco reflexo.' },
          { text: 'A escala visual analógica (EVA) mede:', options: ['Intensidade da dor', 'Amplitude de movimento', 'Força muscular', 'Nível de stress'], correctIdx: 0, explanation: 'É uma ferramenta subjetiva mas validada para dor.' },
          { text: 'O teste de equilíbrio de Berg é usado em:', options: ['Doentes neurológicos e idosos', 'Atletas de elite apenas', 'Recém-nascidos', 'Fraturas agudas'], correctIdx: 0, explanation: 'Avalia o risco de queda e equilíbrio funcional.' },
          { text: 'A auscultação pulmonar na fisioterapia visa:', options: ['Detetar ruídos adventícios', 'Medir a tensão arterial', 'Verificar a visão', 'Ouvir o estômago'], correctIdx: 0, explanation: 'Identifica secreções ou obstruções nas vias aéreas.' }
        ]
      },
      {
        title: 'Diagnóstico Cinesiofuncional',
        description: 'Identificação de disfunções do movimento.',
        questions: [
          { text: 'A dor mecânica piora com:', options: ['Movimento', 'Repouso', 'Sono', 'Alimentação'], correctIdx: 0, explanation: 'Dores mecânicas são exacerbadas pelo movimento.' },
          { text: 'O diagnóstico funcional foca em:', options: ['Limitações de movimento', 'Nome da doença', 'Cura definitiva', 'Apenas na dor'], correctIdx: 0, explanation: 'A fisioterapia foca na funcionalidade do indivíduo.' },
          { text: 'Uma dor inflamatória caracteriza-se por:', options: ['Rigidez matinal prolongada', 'Melhoria com o repouso', 'Início súbito ao saltar', 'Ausência de calor local'], correctIdx: 0, explanation: 'Dores inflamatórias costumam ser piores em repouso e de manhã.' },
          { text: 'A capsulite adesiva (ombro congelado) limita:', options: ['Todos os movimentos do ombro', 'Apenas a flexão', 'Só a rotação interna', 'A força da mão'], correctIdx: 0, explanation: 'Apresenta um padrão capsular de restrição.' },
          { text: 'A ciatalgia é frequentemente causada por:', options: ['Hérnia discal lombar', 'Entorse de tornozelo', 'Cefaleia', 'Gastrite'], correctIdx: 0, explanation: 'A compressão das raízes nervosas lombares irradia dor.' },
          { text: 'A síndrome do impacto subacromial afeta:', options: ['Tendões da coifa dos rotadores', 'O menisco', 'O tendão de Aquiles', 'O ligamento cruzado'], correctIdx: 0, explanation: 'Causa dor ao elevar o braço lateralmente.' },
          { text: 'A osteoartrose é uma doença:', options: ['Degenerativa articular', 'Infeciosa aguda', 'Apenas muscular', 'Psicológica'], correctIdx: 0, explanation: 'Envolve o desgaste da cartilagem hialina.' },
          { text: 'A fibromialgia caracteriza-se por:', options: ['Dor generalizada e pontos sensíveis', 'Fratura óssea', 'Infeção viral', 'Perda de visão'], correctIdx: 0, explanation: 'É uma síndrome de sensibilização central.' },
          { text: 'Uma entorse de grau II envolve:', options: ['Rutura parcial de ligamentos', 'Apenas estiramento', 'Rutura total', 'Fratura óssea'], correctIdx: 0, explanation: 'Há instabilidade leve e dor moderada.' },
          { text: 'A escoliose idiopática é um desvio:', options: ['Tridimensional da coluna', 'Apenas lateral', 'Só para a frente', 'Só para trás'], correctIdx: 0, explanation: 'Envolve inclinação, rotação e alteração sagital.' }
        ]
      },
      {
        title: 'Intervenção Fisioterapêutica',
        description: 'Recursos manuais e eletroterápicos.',
        questions: [
          { text: 'O calor superficial promove:', options: ['Vasodilatação', 'Vasoconstrição', 'Frio', 'Gelo'], correctIdx: 0, explanation: 'O calor aumenta o fluxo sanguíneo.' },
          { text: 'A eletroterapia (TENS) é usada para:', options: ['Analgesia', 'Fortalecimento', 'Queimar gordura', 'Crescer osso'], correctIdx: 0, explanation: 'O TENS foca no controlo da dor.' },
          { text: 'A crioterapia (gelo) é indicada em:', options: ['Fase aguda inflamatória', 'Dores crónicas de anos', 'Antes do aquecimento', 'Pele com feridas abertas'], correctIdx: 0, explanation: 'Reduz o metabolismo local e o edema inicial.' },
          { text: 'A massagem transversa profunda (Cyriax) visa:', options: ['Romper aderências', 'Relaxamento geral', 'Drenagem linfática', 'Induzir o sono'], correctIdx: 0, explanation: 'Promove a reorganização das fibras de colagénio.' },
          { text: 'O ultrassom terapêutico tem efeitos:', options: ['Térmicos e mecânicos', 'Apenas elétricos', 'Radioativos', 'Químicos'], correctIdx: 0, explanation: 'Aumenta a permeabilidade celular e o fluxo sanguíneo.' },
          { text: 'A hidroterapia usa as propriedades da:', options: ['Flutuabilidade e pressão', 'Eletricidade', 'Luz solar', 'Gravidade aumentada'], correctIdx: 0, explanation: 'A água facilita o movimento e reduz o impacto.' },
          { text: 'A cinesioterapia é o tratamento através do:', options: ['Movimento', 'Calor', 'Frio', 'Som'], correctIdx: 0, explanation: 'É a base da reabilitação física.' },
          { text: 'A técnica de Maitland foca em:', options: ['Mobilização articular', 'Fortalecimento muscular', 'Alongamento', 'Massagem de relaxamento'], correctIdx: 0, explanation: 'Usa oscilações graduadas para reduzir a dor e rigidez.' },
          { text: 'O Kinesio Taping serve para:', options: ['Suporte neuromuscular', 'Imobilização total', 'Cura de fraturas', 'Substituir cirurgia'], correctIdx: 0, explanation: 'Auxilia na função muscular e drenagem linfática.' },
          { text: 'A reeducação postural global (RPG) foca nas:', options: ['Cadeias musculares', 'Apenas num músculo', 'Ossos isolados', 'Visão'], correctIdx: 0, explanation: 'Trabalha o corpo de forma integrada e global.' }
        ]
      },
      {
        title: 'Cinesioterapia e Exercícios',
        description: 'Exercícios terapêuticos específicos.',
        questions: [
          { text: 'Exercícios isométricos envolvem:', options: ['Contração sem movimento', 'Movimento rápido', 'Saltos', 'Corrida'], correctIdx: 0, explanation: 'Isometria é contração estática.' },
          { text: 'O alongamento estático deve durar:', options: ['15 a 30 segundos', '2 segundos', '5 minutos', '1 hora'], correctIdx: 0, explanation: 'Tempo ideal para relaxamento das fibras.' },
          { text: 'Exercícios de propriocepção melhoram o:', options: ['Equilíbrio e consciência corporal', 'Tamanho do músculo', 'Fôlego', 'Audição'], correctIdx: 0, explanation: 'Treinam os recetores sensoriais nas articulações.' },
          { text: 'O treino excêntrico é eficaz para:', options: ['Tendinopatias', 'Fase aguda de fratura', 'Apenas relaxamento', 'Dormir melhor'], correctIdx: 0, explanation: 'Estimula a síntese de colagénio nos tendões.' },
          { text: 'Exercícios de cadeia cinética fechada (CCF):', options: ['Têm a extremidade fixa', 'Têm a extremidade livre', 'São feitos no ar', 'Não usam força'], correctIdx: 0, explanation: 'Exemplo: agachamento (pés fixos no chão).' },
          { text: 'O método Pilates foca no:', options: ['Controlo do "core" e respiração', 'Levantamento de peso máximo', 'Velocidade de corrida', 'Saltos altos'], correctIdx: 0, explanation: 'Fortalece a musculatura profunda do tronco.' },
          { text: 'Exercícios de Williams são indicados para:', options: ['Lombalgia (flexão)', 'Cervicalgia', 'Entorse de tornozelo', 'Ombro'], correctIdx: 0, explanation: 'Focam no alongamento e fortalecimento lombar em flexão.' },
          { text: 'Exercícios de Codman são usados no:', options: ['Ombro (pendulares)', 'Joelho', 'Anca', 'Pé'], correctIdx: 0, explanation: 'Usam a gravidade para decoaptação articular suave.' },
          { text: 'O treino de marcha com obstáculos visa:', options: ['Melhorar a funcionalidade real', 'Aumentar a velocidade', 'Cansar o paciente', 'Nada'], correctIdx: 0, explanation: 'Prepara o paciente para desafios do dia-a-dia.' },
          { text: 'Exercícios pliométricos envolvem:', options: ['Ciclo de alongamento-encurtamento', 'Movimentos lentos', 'Apenas repouso', 'Massagem'], correctIdx: 0, explanation: 'Desenvolvem potência muscular através de saltos e explosão.' }
        ]
      }
    ]
  },
  'Medicina Geral': {
    complaints: [
      'Febre e mal-estar geral.', 'Cefaleia persistente.', 'Dor abdominal difusa.', 
      'Tosse seca há 3 semanas.', 'Tonturas e palpitações.', 'Perda de peso não intencional.',
      'Fadiga extrema.', 'Alterações no trânsito intestinal.', 'Dor torácica atípica.',
      'Poliúria e polidipsia.', 'Erupção cutânea pruriginosa.', 'Suores noturnos.'
    ],
    histories: [
      'Início após exposição a ambiente frio.', 'História familiar de hipertensão e diabetes.', 'Stress laboral elevado.',
      'Mudança recente de hábitos alimentares.', 'Viagem recente ao estrangeiro.', 'Contacto com pessoas doentes.',
      'Tabagismo de longa data.', 'Consumo excessivo de álcool.', 'Sedentarismo e obesidade.',
      'Uso crónico de medicação anti-inflamatória.', 'História de alergias sazonais.', 'Exposição a agentes químicos.'
    ],
    symptoms: [
      ['Febre (38.5°C)', 'Calafrios', 'Mialgia'],
      ['Cefaleia holocraniana', 'Náuseas', 'Fotofobia'],
      ['Dor epigástrica', 'Enfartamento pós-prandial', 'Pirose'],
      ['Tosse produtiva', 'Expectoração amarelada', 'Dispneia'],
      ['Palpitações', 'Tonturas ao levantar', 'Síncope']
    ],
    evolutionTimes: ['3 dias', '1 semana', '2 semanas', '1 mês', '6 meses', 'Início súbito há 24h', 'Intermitente há 3 meses'],
    functionalLimitations: [
      'Incapacidade de trabalhar.', 'Dificuldade em manter a concentração.', 'Limitação na atividade física.',
      'Dificuldade em alimentar-se.', 'Interrupção das atividades sociais.', 'Necessidade de repouso absoluto.',
      'Dificuldade em subir escadas.', 'Incapacidade de conduzir.', 'Impacto na qualidade do sono.'
    ],
    stages: [
      {
        title: 'Anamnese e Exame Físico',
        description: 'Coleta de sintomas e sinais clínicos.',
        questions: [
          { text: 'Qual o principal objetivo da semiologia médica?', options: ['Identificar sinais e sintomas', 'Prescrever fármacos', 'Realizar cirurgias', 'Cobrar consultas'], correctIdx: 0, explanation: 'A semiologia é o estudo dos sinais e sintomas das doenças.' }
        ]
      },
      {
        title: 'Raciocínio Clínico e Diagnóstico',
        description: 'Definição da hipótese diagnóstica principal.',
        questions: [
          { text: 'O padrão-ouro para diagnóstico de pneumonia é:', options: ['Radiografia de tórax', 'Exame de sangue', 'Ausculta apenas', 'Palpação'], correctIdx: 0, explanation: 'A imagem é crucial para confirmar o infiltrado pulmonar.' }
        ]
      },
      {
        title: 'Conduta Médica',
        description: 'Prescrição e encaminhamentos.',
        questions: [
          { text: 'A primeira linha de tratamento para hipertensão leve costuma ser:', options: ['Mudança no estilo de vida', 'Cirurgia cardíaca', 'Repouso absoluto', 'Diálise'], correctIdx: 0, explanation: 'Dieta e exercício são intervenções iniciais fundamentais.' }
        ]
      }
    ]
  },
  'Enfermagem': {
    complaints: [
      'Febre 38.5ºC', 'Mialgia', 'Astenia', 
      'Hipertensão', 'Cefaleia', 'Visão turva', 
      'Dor epigástrica', 'Náuseas', 'Enfartamento',
      'Tosse produtiva', 'Dispneia leve', 'Sibilância',
      'Poliúria', 'Sede excessiva', 'Boca seca'
    ],
    histories: [
      'Pós-operatório imediato.', 'Doente crónico com múltiplas patologias.', 'Isolamento social e falta de apoio.',
      'Recém-diagnosticado com patologia grave.', 'Idoso a viver sozinho.', 'História de quedas frequentes.',
      'Imobilidade prolongada no leito.', 'Alta hospitalar recente.', 'Grávida de risco.',
      'Utente em cuidados paliativos.', 'Criança com calendário vacinal atrasado.', 'Vítima de queimadura doméstica.'
    ],
    symptoms: [
      ['Febre 38.5ºC', 'Mialgia', 'Astenia'], 
      ['Hipertensão', 'Cefaleia', 'Visão turva'], 
      ['Dor epigástrica', 'Náuseas', 'Enfartamento'],
      ['Tosse produtiva', 'Dispneia leve', 'Sibilância'],
      ['Poliúria', 'Sede excessiva', 'Boca seca']
    ],
    evolutionTimes: ['3 dias', '1 semana', '15 dias', '1 mês', '3 meses', 'Início súbito', 'Evolução insidiosa'],
    functionalLimitations: [
      'Intolerância ao esforço físico.', 'Dificuldade de concentração.', 'Interrupção do sono.',
      'Incapacidade laboral temporária.', 'Dificuldade em manter a rotina diária.', 'Limitação na alimentação.'
    ],
    stages: [
      {
        title: 'Sistematização da Assistência (SAE)',
        description: 'Coleta de dados e histórico de enfermagem.',
        questions: [
          { text: 'A primeira etapa da SAE é:', options: ['Histórico de Enfermagem', 'Diagnóstico', 'Planejamento', 'Implementação'], correctIdx: 0, explanation: 'O histórico inicia o processo de coleta de dados.' }
        ]
      },
      {
        title: 'Diagnóstico de Enfermagem (NANDA)',
        description: 'Identificação de respostas humanas.',
        questions: [
          { text: 'O diagnóstico de enfermagem foca em:', options: ['Respostas humanas', 'Cura da patologia', 'Prescrição médica', 'Cirurgia'], correctIdx: 0, explanation: 'Enfermeiros diagnosticam como o paciente reage à sua condição.' }
        ]
      },
      {
        title: 'Intervenções de Enfermagem (NIC)',
        description: 'Ações diretas e indiretas de cuidado.',
        questions: [
          { text: 'Uma intervenção prioritária em paciente com risco de queda é:', options: ['Manter grades do leito elevadas', 'Administrar sedativos', 'Deixar o paciente sozinho', 'Apagar todas as luzes'], correctIdx: 0, explanation: 'A segurança do paciente é uma prioridade fundamental na enfermagem.' }
        ]
      }
    ]
  },
  'Medicina Dentária': {
    complaints: [
      'Dor de dentes aguda ao frio.', 'Sangramento gengival ao escovar.', 'Sensibilidade dentária persistente.',
      'Perda de uma restauração.', 'Dor na articulação temporomandibular.', 'Halitose persistente.',
      'Mobilidade dentária.', 'Manchas escuras nos dentes.', 'Ferida na mucosa que não cicatriza.',
      'Dificuldade em mastigar alimentos duros.', 'Desejo de melhorar a estética do sorriso.', 'Desconforto com prótese atual.'
    ],
    histories: [
      'Higiene oral deficiente.', 'Consumo excessivo de açúcares.', 'História de bruxismo noturno.',
      'Ausência de consultas de rotina há 2 anos.', 'Tratamentos ortodônticos prévios.', 'Hábito de fumar.',
      'Traumatismo dentário na infância.', 'Uso de próteses antigas mal adaptadas.', 'Medo de dentista (odontofobia).',
      'História familiar de periodontite.', 'Gravidez atual.', 'Diabetes não controlada.'
    ],
    symptoms: [
      ['Cárie profunda', 'Sensibilidade à percussão'], 
      ['Gengivite', 'Tártaro abundante', 'Halitose'], 
      ['Desgaste dentário', 'Dor muscular facial', 'Estalido na ATM'],
      ['Recessão gengival', 'Exposição radicular', 'Hipersensibilidade'],
      ['Abcesso dentário', 'Edema facial leve', 'Fístula']
    ],
    evolutionTimes: ['2 dias', '1 semana', '1 mês', 'Vários meses', 'Anos', 'Início súbito após trauma'],
    functionalLimitations: [
      'Dificuldade na mastigação.', 'Limitação na abertura bucal.', 'Desconforto estético ao sorrir.',
      'Dificuldade na fala (fonética).', 'Dor ao bocejar.', 'Evitar certos alimentos.'
    ],
    stages: [
      {
        title: 'Avaliação Clínica Odontológica',
        description: 'Exame intraoral e testes de vitalidade.',
        questions: [
          { text: 'O teste de vitalidade pulpar usa:', options: ['Estímulo térmico', 'Luz UV', 'Pressão arterial', 'Auscultação'], correctIdx: 0, explanation: 'O frio ou calor testam a resposta do nervo.' },
          { text: 'A sonda periodontal mede:', options: ['Profundidade do sulco', 'Dureza do esmalte', 'Cor do dente', 'Tamanho da língua'], correctIdx: 0, explanation: 'Avalia a saúde dos tecidos de suporte.' },
          { text: 'O odontograma serve para:', options: ['Registar o estado de cada dente', 'Medir a força da mordida', 'Ver a cor da gengiva', 'Nada'], correctIdx: 0, explanation: 'É o mapa clínico da boca do paciente.' }
        ]
      },
      {
        title: 'Diagnóstico e Patologia Oral',
        description: 'Identificação de cáries, periodontite e outras lesões.',
        questions: [
          { text: 'O sangramento gengival é sinal de:', options: ['Inflamação', 'Dente saudável', 'Excesso de cálcio', 'Falta de açúcar'], correctIdx: 0, explanation: 'A gengivite causa inflamação e sangramento.' },
          { text: 'A cárie dentária é causada por:', options: ['Bactérias e açúcar', 'Falta de cálcio apenas', 'Beber muita água', 'Genética apenas'], correctIdx: 0, explanation: 'É uma doença multifatorial bacteriana.' },
          { text: 'A periodontite caracteriza-se por:', options: ['Perda de osso e suporte', 'Apenas manchas', 'Dentes brancos', 'Nada'], correctIdx: 0, explanation: 'É a evolução da gengivite sem tratamento.' }
        ]
      },
      {
        title: 'Plano de Tratamento e Intervenção',
        description: 'Procedimentos restauradores, endodônticos ou cirúrgicos.',
        questions: [
          { text: 'A destartarização visa remover:', options: ['Cálculo dentário', 'Esmalte', 'Dentina', 'Polpa'], correctIdx: 0, explanation: 'Remove a placa bacteriana calcificada.' },
          { text: 'A endodontia é popularmente conhecida como:', options: ['Tratamento de canal', 'Extração', 'Limpeza', 'Aparelho'], correctIdx: 0, explanation: 'Trata a polpa dentária infetada.' },
          { text: 'Uma restauração (chumbo) serve para:', options: ['Tapar a cavidade da cárie', 'Mudar a cor do dente', 'Prender o dente', 'Nada'], correctIdx: 0, explanation: 'Devolve a forma e função ao dente.' }
        ]
      },
      {
        title: 'Orientações e Prevenção',
        description: 'Higiene oral e cuidados preventivos.',
        questions: [
          { text: 'A técnica de escovagem correta deve ser:', options: ['Suave e sistemática', 'Rápida e forte', 'Apenas com água', 'Uma vez por semana'], correctIdx: 0, explanation: 'A eficácia depende da técnica e não da força.' },
          { text: 'O uso do fio dentário deve ser:', options: ['Diário', 'Uma vez por mês', 'Apenas quando há comida presa', 'Nunca'], correctIdx: 0, explanation: 'O fio limpa onde a escova não chega.' }
        ]
      }
    ]
  },

  'Análises Clínicas': {
    complaints: [
      'Cansaço extremo e palidez.', 'Exames de rotina alterados.', 'Suspeita de infeção urinária.',
      'Controlo de diabetes.', 'Hematomas frequentes sem trauma.', 'Icterícia (pele amarela).',
      'Dor lombar e urina turva.', 'Suspeita de gravidez.', 'Monitorização de função tiroideia.',
      'Rastreio de DSTs.', 'Avaliação de risco cardiovascular.', 'Dificuldade em estancar sangramentos.'
    ],
    histories: [
      'Check-up anual.', 'Monitorização de terapia anticoagulante.', 'Investigação de anemia.',
      'Rastreio de doenças metabólicas.', 'História familiar de dislipidemia.', 'Uso de fármacos hepatotóxicos.',
      'Gravidez em curso.', 'Atleta de alta competição.', 'Dieta vegetariana estrita.',
      'Exposição ocupacional a metais pesados.', 'Pós-transfusão sanguínea.', 'Suspeita de erro laboratorial prévio.'
    ],
    symptoms: [
      ['Hemoglobina baixa', 'Microcitose', 'Hipocromia'], 
      ['Leucocitose', 'PCR elevada', 'Neutrofilia'], 
      ['Glicemia de jejum > 126mg/dL', 'HbA1c elevada'],
      ['Ureia e Creatinina elevadas', 'TFG diminuída'],
      ['Bilirrubina total elevada', 'AST e ALT alteradas']
    ],
    evolutionTimes: ['Recente', 'Crónico', 'Monitorização mensal', 'Agudo', 'Urgência'],
    functionalLimitations: [
      'Astenia (falta de forças).', 'Dificuldade em realizar jejum prolongado.', 'Ansiedade face aos resultados.',
      'Limitação por fadiga crónica.', 'Necessidade de colheitas frequentes.', 'Restrições alimentares pré-exame.'
    ],
    questions: {
      evaluation: [
        { text: 'O jejum recomendado para perfil lipídico é de:', options: ['12 horas', '2 horas', 'Não precisa', '24 horas'], correctIdx: 0, explanation: 'Garante a estabilidade dos triglicerídeos.' },
        { text: 'A hemólise da amostra pode:', options: ['Alterar os resultados', 'Melhorar a cor', 'Não tem efeito', 'Aumentar a glicose'], correctIdx: 0, explanation: 'A rotura de glóbulos vermelhos liberta potássio e enzimas.' },
        { text: 'A colheita de sangue venoso deve ser feita:', options: ['Preferencialmente na fossa cubital', 'No pé', 'Na orelha', 'Nada'], correctIdx: 0, explanation: 'Zona com veias mais acessíveis e calibrosas.' },
        { text: 'O garrote deve ser mantido por no máximo:', options: ['1 minuto', '10 minutos', '1 hora', 'Nada'], correctIdx: 0, explanation: 'Evita a hemoconcentração e garroteamento excessivo.' },
        { text: 'A identificação do tubo deve ser feita:', options: ['À frente do doente após colheita', 'Antes do doente chegar', 'No dia seguinte', 'Nada'], correctIdx: 0, explanation: 'Evita trocas de amostras e erros graves.' },
        { text: 'O tubo de tampa roxa (EDTA) é usado para:', options: ['Hemograma', 'Glicose', 'Coagulação', 'Nada'], correctIdx: 0, explanation: 'Preserva a morfologia celular.' },
        { text: 'O tubo de tampa azul (Citrato) é para:', options: ['Estudos de coagulação', 'Colesterol', 'Urina', 'Nada'], correctIdx: 0, explanation: 'Inibe a coagulação de forma reversível.' },
        { text: 'A urina tipo II requer colheita de:', options: ['Jato médio', 'Primeiro jato', 'Último jato', 'Nada'], correctIdx: 0, explanation: 'Evita contaminação da uretra distal.' },
        { text: 'A ordem correta dos tubos evita:', options: ['Contaminação cruzada de aditivos', 'Quebra dos tubos', 'Fome do técnico', 'Nada'], correctIdx: 0, explanation: 'Garante a integridade química de cada amostra.' },
        { text: 'A centrifugação serve para:', options: ['Separar soro/plasma das células', 'Misturar melhor', 'Aquecer o sangue', 'Nada'], correctIdx: 0, explanation: 'Usa a força centrífuga para sedimentar elementos figurados.' }
      ],
      diagnosis: [
        { text: 'O aumento de neutrófilos sugere:', options: ['Infeção bacteriana', 'Alergia', 'Vírus', 'Parasitas'], correctIdx: 0, explanation: 'Neutrófilos respondem a bactérias.' },
        { text: 'A anemia ferropénica caracteriza-se por:', options: ['Ferritina baixa', 'Ferro alto', 'VCM elevado', 'Plaquetas baixas'], correctIdx: 0, explanation: 'A falta de reservas de ferro é o primeiro sinal.' },
        { text: 'A leucopenia é a:', options: ['Diminuição de glóbulos brancos', 'Aumento de glóbulos vermelhos', 'Falta de plaquetas', 'Nada'], correctIdx: 0, explanation: 'Pode indicar imunossupressão ou infeção viral grave.' },
        { text: 'A hiperglicemia de jejum (>126 mg/dL) sugere:', options: ['Diabetes Mellitus', 'Hipotiroidismo', 'Anemia', 'Nada'], correctIdx: 0, explanation: 'Valor de referência para diagnóstico de diabetes.' },
        { text: 'A creatinina elevada indica problemas na:', options: ['Função renal', 'Função hepática', 'Visão', 'Nada'], correctIdx: 0, explanation: 'É um marcador de filtração glomerular.' },
        { text: 'A bilirrubina elevada causa:', options: ['Icterícia (pele amarela)', 'Pele azul', 'Cabelo branco', 'Nada'], correctIdx: 0, explanation: 'Acumulação de pigmento biliar nos tecidos.' },
        { text: 'O tempo de protrombina (TP) avalia a:', options: ['Via extrínseca da coagulação', 'Via intrínseca', 'Força do coração', 'Nada'], correctIdx: 0, explanation: 'Monitoriza a terapia com varfarina.' },
        { text: 'A PCR (Proteína C Reativa) é um marcador de:', options: ['Inflamação aguda', 'Cancro apenas', 'Gravidez', 'Nada'], correctIdx: 0, explanation: 'Sobe rapidamente em resposta a lesão ou infeção.' },
        { text: 'O exame de fezes (coprocultura) deteta:', options: ['Bactérias patogénicas intestinais', 'Glicose', 'Colesterol', 'Nada'], correctIdx: 0, explanation: 'Identifica causas de diarreia infeciosa.' },
        { text: 'O teste de gravidez deteta a hormona:', options: ['beta-hCG', 'Insulina', 'Cortisol', 'Nada'], correctIdx: 0, explanation: 'Produzida pela placenta após a implantação.' }
      ],
      treatment: [
        { text: 'A fase pré-analítica é crítica para:', options: ['Qualidade do resultado', 'Velocidade apenas', 'Custo', 'Estética'], correctIdx: 0, explanation: 'A maioria dos erros ocorre na colheita e transporte.' },
        { text: 'O uso de anticoagulantes nos tubos serve para:', options: ['Manter o sangue fluido', 'Mudar a cor', 'Aumentar o volume', 'Nada'], correctIdx: 0, explanation: 'Permite a análise de sangue total ou plasma.' },
        { text: 'O transporte de amostras deve ser:', options: ['Rápido e em condições térmicas', 'Lento', 'Ao sol', 'Nada'], correctIdx: 0, explanation: 'Evita a degradação de analitos sensíveis.' },
        { text: 'A calibração dos equipamentos garante:', options: ['Exatidão dos resultados', 'Que o aparelho dure mais', 'Menor gasto de luz', 'Nada'], correctIdx: 0, explanation: 'Compara o valor medido com um padrão conhecido.' },
        { text: 'O controlo de qualidade interno deteta:', options: ['Erros aleatórios e sistemáticos', 'Apenas roubos', 'Falta de café', 'Nada'], correctIdx: 0, explanation: 'Garante a reprodutibilidade dos exames.' },
        { text: 'A biossegurança no laboratório visa:', options: ['Proteger o técnico e o ambiente', 'Gastar luvas', 'Ficar bonito', 'Nada'], correctIdx: 0, explanation: 'Evita acidentes com material biológico.' },
        { text: 'O descarte de agulhas deve ser em:', options: ['Contentor de perfurantes rígido', 'Lixo comum', 'Saco plástico', 'Nada'], correctIdx: 0, explanation: 'Previne picadas acidentais e infeções.' },
        { text: 'A validação técnica do resultado é feita por:', options: ['Analista clínico/Farmacêutico', 'Recepcionista', 'Segurança', 'Nada'], correctIdx: 0, explanation: 'Revisão crítica antes da libertação do laudo.' },
        { text: 'O uso de vácuo na colheita permite:', options: ['Volume de sangue exato', 'Sangue mais limpo', 'Menos dor', 'Nada'], correctIdx: 0, explanation: 'Os tubos aspiram apenas o necessário para o aditivo.' },
        { text: 'A reanálise é necessária quando:', options: ['O resultado é absurdo ou crítico', 'O técnico está aborrecido', 'O doente pede', 'Nada'], correctIdx: 0, explanation: 'Confirma valores que fogem muito ao padrão.' }
      ],
      exercises: [
        { text: 'A hidratação antes da colheita ajuda a:', options: ['Facilitar o acesso venoso', 'Mudar o sangue', 'Aumentar a glicose', 'Nada'], correctIdx: 0, explanation: 'Veias hidratadas são mais fáceis de puncionar.' },
        { text: 'O repouso antes da colheita evita:', options: ['Alterações hormonais e metabólicas', 'Sono', 'Fome', 'Cansaço'], correctIdx: 0, explanation: 'O esforço físico altera valores como a CK e glicose.' },
        { text: 'Evitar álcool 24h antes dos exames:', options: ['Evita alterações no fígado e lípidos', 'É indiferente', 'Melhora o sabor', 'Nada'], correctIdx: 0, explanation: 'O álcool interfere em muitos processos metabólicos.' },
        { text: 'Não fumar antes da colheita evita:', options: ['Alterações na glicose e leucócitos', 'Cheiro a tabaco', 'Fome', 'Nada'], correctIdx: 0, explanation: 'A nicotina tem efeitos sistémicos imediatos.' },
        { text: 'Manter a dieta habitual nos dias anteriores:', options: ['Garante um resultado real', 'Não importa', 'Deve-se fazer dieta rigorosa', 'Nada'], correctIdx: 0, explanation: 'O exame deve refletir o estado normal do doente.' },
        { text: 'A higiene genital antes da urina evita:', options: ['Contaminação bacteriana externa', 'Ardor', 'Mudança de cor', 'Nada'], correctIdx: 0, explanation: 'Garante que as bactérias vistas são da bexiga/uretra.' },
        { text: 'Informar sobre medicamentos usados ajuda na:', options: ['Interpretação dos resultados', 'Venda de mais remédios', 'Confusão do técnico', 'Nada'], correctIdx: 0, explanation: 'Muitos fármacos interferem quimicamente nos testes.' },
        { text: 'O relaxamento durante a punção evita:', options: ['Venoconstrição e dor', 'Hematomas gigantes', 'Desmaio sempre', 'Nada'], correctIdx: 0, explanation: 'Músculos relaxados facilitam o procedimento.' },
        { text: 'Pressionar o local da punção após colheita:', options: ['Previne hematomas', 'Faz o sangue voltar', 'Dói mais', 'Nada'], correctIdx: 0, explanation: 'Ajuda na hemostasia local.' },
        { text: 'Seguir as instruções de colheita de fezes:', options: ['Garante a viabilidade da amostra', 'É opcional', 'É só para chatear', 'Nada'], correctIdx: 0, explanation: 'Amostras mal colhidas podem dar falsos negativos.' }
      ]
    }
  },
  'Farmácia': {
    complaints: [
      'Dúvidas sobre interações medicamentosas.', 'Efeitos secundários de nova terapia.', 'Dificuldade em aderir ao tratamento.',
      'Necessidade de aconselhamento sobre suplementos.', 'Reação alérgica cutânea leve.', 'Esquecimento de tomas frequentes.',
      'Dificuldade em engolir comprimidos grandes.', 'Sintomas de gripe e procura de automedicação.', 'Desejo de cessação tabágica.',
      'Problemas com o armazenamento de insulina.', 'Dúvidas sobre o uso de inaladores.', 'Pedido de medição de parâmetros (PA, Glicemia).'
    ],
    histories: [
      'Polifarmácia (mais de 5 fármacos).', 'Início de tratamento para hipertensão.', 'Uso de automedicação frequente.',
      'História de alergias medicamentosas.', 'Doente idoso com défice cognitivo leve.', 'Uso de produtos naturais e chás.',
      'Mudança recente de genéricos.', 'Viagem planeada para zona tropical.', 'Dificuldades económicas para adquirir medicação.',
      'História de toxicidade medicamentosa.', 'Amamentação e necessidade de medicação.', 'Prática de desporto e uso de suplementos.'
    ],
    symptoms: [
      ['Boca seca', 'Tonturas', 'Obstipação'], 
      ['Erupção cutânea', 'Prurido', 'Edema'], 
      ['Esquecimento de doses', 'Confusão de horários'],
      ['Náuseas', 'Gastralgia', 'Diarreia'],
      ['Tosse seca (efeito IECA)', 'Cefaleia']
    ],
    evolutionTimes: ['Início do tratamento', 'Uso continuado', 'Agudo', 'Recorrente', 'Pós-alteração de dose'],
    functionalLimitations: [
      'Confusão na toma dos medicamentos.', 'Medo de efeitos adversos.', 'Custo elevado da terapia.',
      'Dificuldade em abrir embalagens.', 'Incapacidade de ler folhetos informativos.', 'Dependência de terceiros para a medicação.'
    ],
    questions: {
      evaluation: [
        { text: 'A reconciliação terapêutica serve para:', options: ['Evitar erros de medicação', 'Vender mais', 'Mudar marcas', 'Nada'], correctIdx: 0, explanation: 'Garante que o doente toma o que realmente precisa.' },
        { text: 'A farmacovigilância monitoriza:', options: ['Reações adversas', 'Preços', 'Vendas', 'Publicidade'], correctIdx: 0, explanation: 'Garante a segurança contínua dos medicamentos no mercado.' },
        { text: 'A anamnese farmacêutica foca no:', options: ['Uso de medicamentos e adesão', 'Diagnóstico médico', 'Cirurgia', 'Nada'], correctIdx: 0, explanation: 'Identifica problemas relacionados com a medicação.' },
        { text: 'O perfil farmacoterapêutico é o:', options: ['Registo de toda a medicação do doente', 'Preço dos remédios', 'Nome do médico', 'Nada'], correctIdx: 0, explanation: 'Permite detetar duplicações ou interações.' },
        { text: 'A medição da glicemia capilar avalia:', options: ['Nível de açúcar no momento', 'Colesterol', 'Tensão arterial', 'Nada'], correctIdx: 0, explanation: 'Rastreio rápido para diabetes.' },
        { text: 'A medição da tensão arterial na farmácia:', options: ['Deve seguir protocolo de repouso', 'É feita a correr', 'Não serve para nada', 'Nada'], correctIdx: 0, explanation: 'Ajuda no rastreio e monitorização da HTA.' },
        { text: 'O teste de gravidez de farmácia deteta:', options: ['hCG na urina', 'Insulina', 'Ferro', 'Nada'], correctIdx: 0, explanation: 'Teste imunocromatográfico de alta sensibilidade.' },
        { text: 'A avaliação da técnica de inalação é vital para:', options: ['Asmáticos e doentes com DPOC', 'Gripe comum', 'Dor de estômago', 'Nada'], correctIdx: 0, explanation: 'Técnica incorreta leva ao insucesso terapêutico.' },
        { text: 'O rastreio de risco cardiovascular avalia:', options: ['PA, Glicemia, Colesterol e IMC', 'Apenas a visão', 'A força das mãos', 'Nada'], correctIdx: 0, explanation: 'Identifica utentes em risco para encaminhamento.' },
        { text: 'A revisão da medicação visa:', options: ['Otimizar a terapia e reduzir riscos', 'Aumentar o número de comprimidos', 'Mudar para marcas caras', 'Nada'], correctIdx: 0, explanation: 'Melhora a segurança e eficácia do tratamento.' }
      ],
      diagnosis: [
        { text: 'Uma interação fármaco-alimento comum é:', options: ['Sumo de toranja', 'Água', 'Pão', 'Arroz'], correctIdx: 0, explanation: 'A toranja inibe enzimas que metabolizam muitos fármacos.' },
        { text: 'O índice terapêutico estreito significa:', options: ['Pequena margem de segurança', 'Grande segurança', 'Efeito rápido', 'Baixo custo'], correctIdx: 0, explanation: 'Pequenas variações na dose podem ser tóxicas ou ineficazes.' },
        { text: 'Um PRM (Problema Relacionado com Medicamento) é:', options: ['Qualquer evento que interfira no resultado', 'Apenas o preço alto', 'A cor da caixa', 'Nada'], correctIdx: 0, explanation: 'Pode ser falta de adesão, RAM, interação, etc.' },
        { text: 'A polifarmácia aumenta o risco de:', options: ['Interações e quedas', 'Saúde perfeita', 'Menos gastos', 'Nada'], correctIdx: 0, explanation: 'Mais fármacos significam maior complexidade e riscos.' },
        { text: 'O efeito "primeira passagem" ocorre no:', options: ['Fígado', 'Coração', 'Pulmão', 'Pé'], correctIdx: 0, explanation: 'Metabolização inicial antes de chegar à circulação sistémica.' },
        { text: 'A biodisponibilidade é a:', options: ['Fração de fármaco que chega à circulação', 'Velocidade de venda', 'Duração na prateleira', 'Nada'], correctIdx: 0, explanation: 'Indica quanto do remédio realmente vai atuar.' },
        { text: 'Uma Reação Adversa ao Medicamento (RAM) é:', options: ['Efeito nocivo e não desejado', 'O efeito esperado', 'A cura da doença', 'Nada'], correctIdx: 0, explanation: 'Ocorre em doses normais para fins terapêuticos.' },
        { text: 'A teratogenicidade refere-se a danos no:', options: ['Feto durante a gravidez', 'Fígado do adulto', 'Rim do idoso', 'Nada'], correctIdx: 0, explanation: 'Fármacos que causam malformações congénitas.' },
        { text: 'O sinergismo ocorre quando:', options: ['Dois fármacos potenciam o efeito', 'Um anula o outro', 'Não acontece nada', 'Nada'], correctIdx: 0, explanation: '1 + 1 > 2 em termos de efeito terapêutico.' },
        { text: 'A tolerância medicamentosa é a:', options: ['Necessidade de doses maiores para o mesmo efeito', 'Alergia grave', 'Cura rápida', 'Nada'], correctIdx: 0, explanation: 'O corpo habitua-se à substância.' }
      ],
      treatment: [
        { text: 'O armazenamento correto garante a:', options: ['Estabilidade do fármaco', 'Cor da caixa', 'Beleza', 'Peso'], correctIdx: 0, explanation: 'Luz e calor podem degradar o princípio ativo.' },
        { text: 'Um medicamento genérico deve ter:', options: ['Bioequivalência', 'Mesma cor', 'Mesmo preço', 'Mesmo tamanho'], correctIdx: 0, explanation: 'Deve atuar da mesma forma que o de referência.' },
        { text: 'A via de administração mais rápida em emergência é:', options: ['Intravenosa', 'Oral', 'Tópica', 'Retal'], correctIdx: 0, explanation: 'Entra diretamente na corrente sanguínea.' },
        { text: 'Medicamentos termolábeis devem ser guardados:', options: ['No frigorífico (2-8ºC)', 'No congelador', 'Ao sol', 'No armário da casa de banho'], correctIdx: 0, explanation: 'Exemplo: Insulinas e algumas vacinas.' },
        { text: 'O prazo de validade após abertura é crítico em:', options: ['Colírios (gotas olhos)', 'Comprimidos', 'Pensos', 'Nada'], correctIdx: 0, explanation: 'Risco de contaminação microbiana após abrir.' },
        { text: 'A dose unitária visa:', options: ['Reduzir erros e desperdício', 'Aumentar o lucro', 'Dificultar a toma', 'Nada'], correctIdx: 0, explanation: 'Cada dose é embalada e identificada individualmente.' },
        { text: 'O aconselhamento farmacêutico foca na:', options: ['Uso correto e segurança', 'Venda casada', 'Substituição por chás', 'Nada'], correctIdx: 0, explanation: 'Garante que o utente sabe como tomar.' },
        { text: 'Fármacos de libertação prolongada:', options: ['Não devem ser partidos ou mastigados', 'Podem ser esmagados', 'Atuam em 5 minutos', 'Nada'], correctIdx: 0, explanation: 'A quebra destrói o mecanismo de libertação lenta.' },
        { text: 'A automedicação responsável é para:', options: ['Sintomas menores e autolimitados', 'Doenças graves', 'Antibióticos', 'Nada'], correctIdx: 0, explanation: 'Uso de MNSRM com conselho do farmacêutico.' },
        { text: 'O descarte de medicamentos fora de uso deve ser:', options: ['Na farmácia (VALORMED)', 'No lixo comum', 'No cano da banca', 'Nada'], correctIdx: 0, explanation: 'Evita contaminação ambiental e acidentes.' }
      ],
      exercises: [
        { text: 'A adesão à terapia é essencial para:', options: ['Sucesso do tratamento', 'Gastar dinheiro', 'Aumentar a dor', 'Nada'], correctIdx: 0, explanation: 'Sem adesão, não há efeito terapêutico.' },
        { text: 'O uso de organizadores de medicação ajuda na:', options: ['Adesão e segurança', 'Beleza', 'Velocidade', 'Nada'], correctIdx: 0, explanation: 'Evita esquecimentos e duplicações de tomas.' },
        { text: 'Definir alarmes no telemóvel ajuda a:', options: ['Cumprir horários das tomas', 'Gastar bateria', 'Acordar vizinhos', 'Nada'], correctIdx: 0, explanation: 'Ferramenta útil para medicação crónica complexa.' },
        { text: 'Associar a toma a uma rotina diária (ex: pequeno-almoço):', options: ['Facilita a memorização', 'Estraga o remédio', 'Não tem efeito', 'Nada'], correctIdx: 0, explanation: 'Cria um hábito saudável.' },
        { text: 'Ler o folheto informativo permite:', options: ['Conhecer riscos e benefícios', 'Assustar o doente', 'Perder tempo', 'Nada'], correctIdx: 0, explanation: 'Informa sobre como agir em caso de esquecimento ou RAM.' },
        { text: 'Manter uma lista atualizada da medicação na carteira:', options: ['Vital em caso de emergência', 'É perigoso', 'É inútil', 'Nada'], correctIdx: 0, explanation: 'Ajuda equipas médicas a saber o que o doente toma.' },
        { text: 'Verificar a validade dos medicamentos em casa:', options: ['Evita tomar produtos ineficazes', 'É perda de tempo', 'Deve ser feito anualmente', 'Nada'], correctIdx: 0, explanation: 'Garante que a farmácia caseira está segura.' },
        { text: 'Não partilhar medicação com vizinhos/amigos:', options: ['Evita riscos graves à saúde', 'É falta de educação', 'Não tem problema', 'Nada'], correctIdx: 0, explanation: 'O que serve para um pode ser tóxico para outro.' },
        { text: 'Esclarecer dúvidas com o farmacêutico sempre que necessário:', options: ['Promove o uso seguro', 'Incomoda o profissional', 'É opcional', 'Nada'], correctIdx: 0, explanation: 'O farmacêutico é o especialista do medicamento.' },
        { text: 'Guardar medicamentos fora do alcance das crianças:', options: ['Previne intoxicações acidentais', 'É só para quem tem filhos', 'Não é importante', 'Nada'], correctIdx: 0, explanation: 'Medida de segurança doméstica fundamental.' }
      ]
    }
  },
  'Nutrição': {
    complaints: [
      'Dificuldade no controlo de peso e compulsão alimentar.',
      'Sintomas gastrointestinais após ingestão alimentar e inchaço.',
      'Fadiga crónica e suspeita de deficiência nutricional.',
      'Desconforto pós-prandial e má digestão.',
      'Necessidade de adequação da dieta desportiva.',
      'Controlo glicémico instável em diabetes tipo 2.'
    ],
    histories: [
      'Histórico de dietas restritivas sem acompanhamento profissional.',
      'Sedentarismo com hábitos alimentares desregulados.',
      'Diagnóstico recente de dislipidemia mista e esteatose hepática.',
      'Rotina de treinos de alta intensidade e procura por hipertrofia.',
      'Intolerância alimentar recém-descoberta.'
    ],
    symptoms: [
      ['Sensação de plenitude gástrica', 'Distensão abdominal', 'Meteorismo'],
      ['Variação acentuada de peso', 'Fraqueza muscular', 'Unhas frágeis'],
      ['Picos de fome noturna', 'Ansiedade alimentar', 'Desejo de doces']
    ],
    evolutionTimes: ['2 semanas', '1 mês', '6 meses', '1 ano', 'Crónico'],
    functionalLimitations: [
      'Dificuldade no planeamento e preparação de refeições saudáveis.',
      'Queda do rendimento desportivo por défice calórico.',
      'Desconforto digestivo no ambiente de trabalho.'
    ],
    stages: [
      {
        title: 'Avaliação Nutricional & Inquérito Alimentar',
        description: 'Recolha de dados antropométricos, recordatório alimentar de 24h e bioquímica.',
        questions: [
          { text: 'Qual o instrumento mais utilizado para avaliar o consumo alimentar habitual?', options: ['Recordatório de 24 horas e Questionário de Frequência', 'Apenas pesagem de alimentos', 'Biópsia gástrica', 'Densitometria'], correctIdx: 0, explanation: 'O recordatório de 24h aliado à frequência alimentar fornece um perfil detalhado.' },
          { text: 'A bioimpedância elétrica avalia:', options: ['Massa magra, massa gorda e água corporal', 'Apenas o peso bruto', 'A densidade mineral óssea direta', 'A capacidade pulmonar'], correctIdx: 0, explanation: 'Avalia a oposição dos tecidos à passagem de corrente elétrica.' },
          { text: 'A prega cutânea tricipital estima principalmente:', options: ['Reserva de gordura subcutânea', 'Massa muscular esquelética', 'Grau de hidratação', 'Volume visceral'], correctIdx: 0, explanation: 'É um marcador clássico de tecido adiposo periférico.' }
        ]
      },
      {
        title: 'Diagnóstico Nutricional',
        description: 'Identificação de carências, excessos ou distúrbios metabólicos.',
        questions: [
          { text: 'A ferritina sérica baixa com hemoglobina diminuída indica:', options: ['Anemia ferropénica', 'Anemia megaloblástica por B12', 'Excesso de ferro', 'Hiperuricemia'], correctIdx: 0, explanation: 'A ferritina reflete os depósitos corporais de ferro.' },
          { text: 'O Índice Glicémico (IG) de um alimento reflete:', options: ['A velocidade de elevação da glicemia sanguínea', 'O valor calórico total', 'A quantidade de sódio', 'O teor de fibras'], correctIdx: 0, explanation: 'Mede o impacto imediato na glicemia comparado à glicose pura.' }
        ]
      },
      {
        title: 'Conduta e Prescrição Dietética',
        description: 'Cálculo de necessidades energéticas e plano alimentar individualizado.',
        questions: [
          { text: 'Para promoção de saciedade e controlo glicémico, recomenda-se:', options: ['Aumento de fibras solúveis e insolúveis com boa hidratação', 'Exclusão total de proteínas', 'Dieta líquida estrita', 'Jejum contínuo'], correctIdx: 0, explanation: 'As fibras retardam o esvaziamento gástrico e a absorção de glicose.' },
          { text: 'A ingestão proteica recomendada para hipertrofia em adultos treinados situa-se entre:', options: ['1,6 a 2,2 g/kg/dia', '0,4 g/kg/dia', '5,0 g/kg/dia', 'Apenas 10g por dia'], correctIdx: 0, explanation: 'Diretrizes internacionais de nutrição desportiva recomendam 1,6 a 2,2 g/kg/dia.' }
        ]
      }
    ]
  },
  'Psicologia Clínica': {
    complaints: [
      'Ansiedade generalizada, inquietação e insónia.',
      'Sintomas depressivos, anedonia e falta de motivação.',
      'Dificuldades relacionais e episódios de pânico.',
      'Esgotamento emocional associado a burnout profissional.',
      'Luto prolongado e sentimentos de desesperança.'
    ],
    histories: [
      'Sobrecarga profissional e académica nos últimos 6 meses.',
      'Perda de ente querido e ausência de rede de suporte.',
      'Histórico de crises de ansiedade na adolescência.',
      'Isolamento social progressivo após rutura conjugal.'
    ],
    symptoms: [
      ['Taquicardia situacional', 'Hipervigilância', 'Tensão muscular'],
      ['Tristeza persistente', 'Alteração do sono', 'Fadiga mental'],
      ['Pensamentos intrusivos', 'Evitação fóbica', 'Autocrítica excessiva']
    ],
    evolutionTimes: ['1 mês', '3 meses', '6 meses', '1 ano', 'Crónico'],
    functionalLimitations: [
      'Dificuldade de concentração no trabalho e absentismo.',
      'Prejuízo nas relações familiares e sociais.',
      'Incapacidade de tomar decisões quotidianas sob stress.'
    ],
    stages: [
      {
        title: 'Avaliação Psicológica & Aliança Terapêutica',
        description: 'Anamnese psicológica, identificação de queixas e estabelecimento de vínculo.',
        questions: [
          { text: 'O primeiro objetivo da entrevista clínica inicial em psicologia é:', options: ['Construir a aliança terapêutica e compreender a queixa', 'Emitir um diagnóstico definitivo imediato', 'Prescrever medicação psicotrópica', 'Aplicar todos os testes numa única sessão'], correctIdx: 0, explanation: 'A relação de confiança é a base de todo o processo de avaliação e intervenção.' },
          { text: 'O inventário de Beck (BDI) é amplamente utilizado para avaliar:', options: ['Gravidade de sintomas depressivos', 'QI geral', 'Disfunção motora', 'Atenção visual'], correctIdx: 0, explanation: 'O BDI é um instrumento padronizado de autorrelato para depressão.' }
        ]
      },
      {
        title: 'Formulação do Caso Clínico',
        description: 'Compreensão biopsicossocial do paciente e conceptualização cognitiva.',
        questions: [
          { text: 'Na Terapia Cognitivo-Comportamental (TCC), pensamentos automáticos disfuncionais:', options: ['Influenciam diretamente emoções e comportamentos', 'Não têm qualquer impacto clínico', 'São sempre conscientes e lógicos', 'Devem ser ignorados pelo terapeuta'], correctIdx: 0, explanation: 'A tríade cognitiva demonstra a relação mútua entre cognição, afeto e conduta.' },
          { text: 'A dessensibilização sistemática é indicada para:', options: ['Fobias específicas e perturbações de ansiedade', 'Transtornos psicóticos agudos', 'Amnésia retrógrada', 'Afasia de Broca'], correctIdx: 0, explanation: 'Associa a exposição gradual a técnicas de relaxamento.' }
        ]
      },
      {
        title: 'Intervenção e Plano Terapêutico',
        description: 'Definição de objetivos, reestruturação cognitiva e psicoeducação.',
        questions: [
          { text: 'A psicoeducação visa:', options: ['Explicar ao paciente o funcionamento dos seus sintomas e do tratamento', 'Substituir a consulta médica', 'Forçar mudanças comportamentais sem consenso', 'Realizar testes psicométricos'], correctIdx: 0, explanation: 'Aumenta a autonomia, adesão e adesão às estratégias de enfrentamento.' },
          { text: 'A técnica de "Registo de Pensamentos Disfuncionais" (RPD) serve para:', options: ['Identificar, testar e reestruturar distorções cognitivas', 'Apenas anotar despesas diárias', 'Medir a pressão arterial', 'Avaliar a memória recente'], correctIdx: 0, explanation: 'Permite ao paciente encontrar pensamentos alternativos mais adaptativos.' }
        ]
      }
    ]
  },
  'Radiologia e Imagem Médica': {
    complaints: [
      'Investigação de trauma ósseo e suspeita de fratura.',
      'Dor torácica atípica para radiografia e tomografia.',
      'Cefaleia súbita de forte intensidade para exclusão de hemorragia.',
      'Exame de rastreio mamográfico e ecográfico.',
      'Dor abdominal aguda para ecografia de urgência.'
    ],
    histories: [
      'Queda de altura com impacto no membro superior.',
      'Tosse crónica e perda ponderal não intencional.',
      'Traumatismo cranioencefálico leve em acidente de viação.',
      'Controlo evolutivo de nódulo hepático conhecido.'
    ],
    symptoms: [
      ['Dor localizada à palpação', 'Edema ósseo', 'Deformidade visível'],
      ['Opacidade pulmonar', 'Tosse', 'Falta de ar'],
      ['Sinais de hipertensão intracraniana', 'Náuseas', 'Vertigem']
    ],
    evolutionTimes: ['Agudo (horas)', '24-48 horas', '1 semana', 'Evolução lenta'],
    functionalLimitations: [
      'Imobilização forçada do segmento lesado.',
      'Ansiedade durante o posicionamento para exames de imagem.',
      'Restrição de mobilidade por dor intensa.'
    ],
    stages: [
      {
        title: 'Indicação e Escolha do Método de Imagem',
        description: 'Avaliação dos princípios de radioproteção ALARA e indicação clínica.',
        questions: [
          { text: 'O princípio fundamental de proteção radiológica "ALARA" significa:', options: ['As Low As Reasonably Achievable (tão baixa quanto razoavelmente exequível)', 'Aumentar a radiação para maior nitidez', 'Usar raio-X em todas as consultas', 'Desligar os equipamentos à noite'], correctIdx: 0, explanation: 'Visa minimizar a dose de radiação ionizante ao mínimo necessário.' },
          { text: 'A ecografia (ultrassonografia) tem como grande vantagem:', options: ['Ausência de radiação ionizante e avaliação em tempo real', 'Alta dose de raios gama', 'Visualização perfeita através de ossos espessos', 'Substituir a biópsia sempre'], correctIdx: 0, explanation: 'Utiliza ondas sonoras de alta frequência, sendo segura até na gestação.' }
        ]
      },
      {
        title: 'Aquisição e Posicionamento Radiográfico',
        description: 'Técnicas de posicionamento, incidências e contrastes.',
        questions: [
          { text: 'Em radiografia de tórax de rotina, as incidências padrão são:', options: ['Póstero-Anterior (PA) e Perfil Esquerdo', 'Apenas Oblíqua Direita', 'Ântero-Posterior em decúbito', 'Axial'], correctIdx: 0, explanation: 'PA e Perfil reduzem a ampliação da silhueta cardíaca e oferecem visão tridimensional.' },
          { text: 'A Ressonância Magnética é contraindicada em pacientes com:', options: ['Marcadores ou dispositivos metálicos ferromagnéticos não compatíveis', 'Alergia ao iodo', 'Idade avançada', 'Hipertensão arterial'], correctIdx: 0, explanation: 'O campo magnético de alta intensidade pode deslocar ou aquecer objetos ferromagnéticos.' }
        ]
      },
      {
        title: 'Interpretação e Relatório Radiológico',
        description: 'Identificação de achados normais vs patológicos.',
        questions: [
          { text: 'Uma imagem hiperdensa na Tomografia Computadorizada (TC) de crânio agudo sugere:', options: ['Sangramento agudo / hemorragia recente', 'Ar livre', 'Líquor normal', 'Gordura'], correctIdx: 0, explanation: 'O sangue fresco apresenta atenuação elevada (brilhante/hiperdenso) na TC.' },
          { text: 'A consolidação alveolar com broncograma aéreo é típica de:', options: ['Pneumonia bacteriana', 'Pneumotórax', 'Enfisema pulmonar', 'Derrame pleural maciço'], correctIdx: 0, explanation: 'O preenchimento de exsudato nos alvéolos preserva o ar nos brônquios visíveis.' }
        ]
      }
    ]
  },
  'Terapia da Fala': {
    complaints: [
      'Engasgos frequentes com líquidos e dificuldade na deglutição (disfagia).',
      'Atraso significativo no desenvolvimento da linguagem em criança de 3 anos.',
      'Rouquidão persistente (disfonia) em profissional da voz.',
      'Dificuldade de compreensão e expressão após Acidente Vascular Cerebral (AVC).',
      'Trocas fonológicas persistentes na fala e escrita.'
    ],
    histories: [
      'Pós-AVC com hemiparesia direita e paralisia facial.',
      'Uso vocal abusivo em contexto de ensino sem aquecimento vocal.',
      'Histórico de prematuridade e intubação orotraqueal prolongada.',
      'Doença de Parkinson em estadio inicial com voz monótona e hipofonia.'
    ],
    symptoms: [
      ['Tosse ao engolir', 'Voz molhada pós-deglutição', 'Perda de peso'],
      ['Rouquidão', 'Fadiga vocal ao final do dia', 'Tensão laríngea'],
      ['Dificuldade em nomear objetos (anomia)', 'Disartria', 'Apraxia de fala']
    ],
    evolutionTimes: ['2 semanas pós-AVC', '3 meses de rouquidão', 'Desenvolvimento gradual', 'Crónico progressivo'],
    functionalLimitations: [
      'Risco de broncoaspiração e pneumonia aspirativa.',
      'Incapacidade de exercer a profissão docente por perda vocal.',
      'Isolamento e frustração na comunicação familiar diária.'
    ],
    stages: [
      {
        title: 'Avaliação Fonoaudiológica / Terapia da Fala',
        description: 'Exame clínico da motricidade orofacial, voz e deglutição.',
        questions: [
          { text: 'O teste da deglutição à beira do leito deve avaliar primordialmente:', options: ['Sinais de penetração/aspiração laringotraqueal (tosse, voz molhada)', 'A acuidade visual', 'A força dos membros inferiores', 'A glicemia capilar'], correctIdx: 0, explanation: 'Garante a segurança da alimentação e previne pneumonias aspirativas.' },
          { text: 'A escala GRBAS é utilizada na clínica para:', options: ['Avaliação percetivo-auditiva da qualidade vocal', 'Classificação de disfagias graves', 'Avaliação do vocabulário infantil', 'Teste de audiometria'], correctIdx: 0, explanation: 'Mede Grau de disfonia, Rugosidade, Breu (soprosidade), Astenia e Tensão (Strain).' }
        ]
      },
      {
        title: 'Diagnóstico Funcional da Comunicação e Deglutição',
        description: 'Classificação de afasias, disartrias, disfonias e níveis de disfagia.',
        questions: [
          { text: 'A afasia de Broca caracteriza-se principalmente por:', options: ['Compreensão relativamente preservada com expressão não-fluente e anomia', 'Discurso fluente porém sem sentido', 'Perda auditiva bilateral', 'Dificuldade exclusiva em engolir'], correctIdx: 0, explanation: 'Lesão no córtex frontal inferior esquerdo afeta a programação motora da linguagem.' },
          { text: 'Nódulos vocais ("calos nas cordas vocais") são tipicamente causados por:', options: ['Sobrecarga e abuso vocal com impacto mecânico repetido', 'Infeção viral aguda', 'Fratura da cartilagem tireoide', 'Falta de vitamina D'], correctIdx: 0, explanation: 'Lesões benignas decorrentes de traumatismo fonatório contínuo.' }
        ]
      },
      {
        title: 'Plano de Reabilitação Fonoaudiológica',
        description: 'Terapia vocal, exercícios de motricidade orofacial e adaptação de consistências.',
        questions: [
          { text: 'Na disfagia para líquidos finos, a conduta compensatória imediata envolve:', options: ['Uso de espessante alimentar para adequar a viscosidade', 'Acelerar a velocidade da oferta', 'Oferecer líquidos deitados', 'Cortar toda a hidratação'], correctIdx: 0, explanation: 'Líquidos mais viscosos diminuem a velocidade de trânsito orofaríngeo prevenindo aspiração.' },
          { text: 'Técnicas de trato vocal semiocluído (ex: fonação em tubos/canudos) visam:', options: ['Economia vocal e equilíbrio das pressões subglótica e supraglótica', 'Aumentar a inflamação laríngea', 'Paralisar as cordas vocais', 'Substituir a fala'], correctIdx: 0, explanation: 'Otimizam a ressonância e reduzem a sobrecarga fonatória.' }
        ]
      }
    ]
  },
  'Terapia Ocupacional': {
    complaints: [
      'Incapacidade de realizar Atividades de Vida Diária (AVDs) de forma independente.',
      'Perda de destreza manual e preensão fina pós-trauma de mão.',
      'Dificuldades no planeamento motor e integração sensorial em contexto escolar.',
      'Necessidade de adaptação ergonómica no posto de trabalho.',
      'Declínio funcional em idoso com perda de autonomia doméstica.'
    ],
    histories: [
      'Sequela pós-fratura de rádio distal com rigidez articular.',
      'Diagnóstico de Perturbação do Espetro do Autismo (PEA) com hipersensibilidade tátil.',
      'Doente com artrite reumatoide com deformidades em "pescoço de cisne".',
      'Pós-traumatismo crânio-encefálico em processo de reabilitação profissional.'
    ],
    symptoms: [
      ['Défice de pinça digital', 'Fraqueza de preensão', 'Dor ao manusear talheres'],
      ['Insegurança postural', 'Aversão a estímulos táteis e auditivos', 'Desorganização motora'],
      ['Lentidão nas transferências posturais', 'Fadiga ao vestir/despir', 'Risco de queda']
    ],
    evolutionTimes: ['1 mês pós-cirurgia', 'Desenvolvimento infantil', '3 meses', 'Crónico'],
    functionalLimitations: [
      'Dependência de cuidadores para higiene e alimentação.',
      'Impossibilidade de utilizar teclado e rato no trabalho.',
      'Restrição na participação comunitária e lazer.'
    ],
    stages: [
      {
        title: 'Avaliação do Desempenho Ocupacional',
        description: 'Mapeamento de AVDs básicas (AVDB), instrumentais (AVDI) e contexto de vida.',
        questions: [
          { text: 'A Medida Canadiana de Desempenho Ocupacional (COPM) é focada em:', options: ['Identificar prioridades e problemas percecionados pelo próprio cliente', 'Apenas medir a força muscular em kg', 'Avaliar a pressão intracraniana', 'Calcular o IMC'], correctIdx: 0, explanation: 'É um instrumento centrado no cliente para medir autocuidado, produtividade e lazer.' },
          { text: 'As Atividades de Vida Diária Básicas (AVDB) incluem:', options: ['Alimentar-se, vestir-se, tomar banho e higiene pessoal', 'Gerir investimentos bancários', 'Conduzir automóveis de carga', 'Fazer compras no supermercado'], correctIdx: 0, explanation: 'São tarefas fundamentais orientadas para o cuidado com o próprio corpo.' }
        ]
      },
      {
        title: 'Análise de Tarefas e Prescrição de Tecnologia Assistiva',
        description: 'Identificação de barreiras arquitetónicas e desenvolvimento de adaptações.',
        questions: [
          { text: 'Para um paciente com preensão manual fraca e dor articular, a indicação correta é:', options: ['Talheres e utensílios com cabos engrossados e antiderrapantes', 'Talheres extremamente finos e pesados', 'Proibir a alimentação autónoma', 'Imobilizar as duas mãos'], correctIdx: 0, explanation: 'Cabos engrossados reduzem a força articular necessária para a preensão.' },
          { text: 'Na Terapia de Integração Sensorial de Ayres, o objetivo é:', options: ['Ajudar o sistema nervoso central a processar e integrar estímulos sensoriais', 'Eliminar todas as sensações do ambiente', 'Forçar estímulos aversivos sem pausa', 'Aplicar apenas medicamentos'], correctIdx: 0, explanation: 'Promove respostas adaptativas ricas para melhor interação com o meio.' }
        ]
      },
      {
        title: 'Intervenção e Reinserção Ocupacional',
        description: 'Treino de competências funcionais, proteção articular e retorno ao trabalho.',
        questions: [
          { text: 'Os princípios de economia de energia e proteção articular visam:', options: ['Distribuir o esforço por articulações maiores e intercalar repouso', 'Carregar todo o peso com os dedos', 'Realizar tarefas pesadas sem pausas', 'Evitar qualquer movimento'], correctIdx: 0, explanation: 'Previnem a progressão de deformidades e a fadiga muscular excessiva.' },
          { text: 'A adaptação ambiental domiciliária para prevenção de quedas no idoso inclui:', options: ['Instalação de barras de apoio na casa de banho e remoção de tapetes soltos', 'Uso de chão encerado e pouca luz', 'Manter objetos pesados em prateleiras altas', 'Deixar fios no chão'], correctIdx: 0, explanation: 'Elimina perigos ambientais que causam perda de equilíbrio e fraturas.' }
        ]
      }
    ]
  },
  'Saúde Pública & Epidemiologia': {
    complaints: [
      'Aumento atípico de casos febris com exantema em comunidade local.',
      'Surtos de diarreia aguda em ambiente escolar.',
      'Baixa cobertura vacinal em crianças menores de 5 anos.',
      'Necessidade de rastreio comunitário de hipertensão e diabetes.',
      'Elevada incidência de acidentes de trabalho em setor industrial.'
    ],
    histories: [
      'Contaminação recente de fonte de abastecimento de água local.',
      'Hesitação vacinal propagada por desinformação nas redes.',
      'Transmissão sazonal de arboviroses em época chuvosa.',
      'Envelhecimento populacional com carência de serviços primários.'
    ],
    symptoms: [
      ['Febre alta', 'Mialgia intensa', 'Cefaleia retro-orbitária'],
      ['Vómitos', 'Diarreia aquosa profusa', 'Desidratação comunitária'],
      ['Tosse produtiva persistente', 'Sudorese noturna', 'Perda de peso']
    ],
    evolutionTimes: ['Surto agudo (dias)', 'Semanas epidemiológicas', 'Tendência anual'],
    functionalLimitations: [
      'Sobrecarga dos centros de saúde e unidades de emergência.',
      'Queda de produtividade comunitária e absentismo escolar.',
      'Impacto socioeconómico severo em famílias vulneráveis.'
    ],
    stages: [
      {
        title: 'Vigilância Epidemiológica e Notificação',
        description: 'Investigação do surto, definição de caso e cálculo de indicadores.',
        questions: [
          { text: 'A taxa de incidência mede:', options: ['O número de casos novos numa população em risco durante um período', 'O total de casos existentes num dado momento', 'O número de mortes dividido por nascimentos', 'Apenas a eficácia de vacinas'], correctIdx: 0, explanation: 'Indica a velocidade e o risco com que novos casos surgem.' },
          { text: 'A curva epidémica tem como objetivo principal:', options: ['Identificar o tipo de exposição (fonte comum ou propagada) e o pico do surto', 'Contar apenas despesas financeiras', 'Prever o clima', 'Substituir a vacinação'], correctIdx: 0, explanation: 'A distribuição dos casos no tempo revela a dinâmica de transmissão.' }
        ]
      },
      {
        title: 'Medidas de Controlo e Bloqueio de Transmissão',
        description: 'Isolamento, rastreio de contactos e intervenção ambiental.',
        questions: [
          { text: 'No controlo de um surto de transmissão hídrica, a medida primordial é:', options: ['Garantir cloração/desinfeção da água e fornecer fontes seguras', 'Apenas prescrever antibióticos a toda a população', 'Fechar todas as escolas indefinidamente', 'Ignorar os casos leves'], correctIdx: 0, explanation: 'Cortar a fonte de contaminação é essencial para cessar a transmissão.' },
          { text: 'A imunidade de grupo (ou de rebanho) é alcançada quando:', options: ['Uma proporção suficiente da população está imune, protegendo os vulneráveis', 'Ninguém toma vacinas', 'Apenas 10% da população é tratada', 'O vírus deixa de sofrer mutações'], correctIdx: 0, explanation: 'Reduz a probabilidade de um indivíduo infetado encontrar alguém suscetível.' }
        ]
      },
      {
        title: 'Políticas de Promoção e Educação para a Saúde',
        description: 'Campanhas de comunicação, vacinação e reforço dos cuidados primários.',
        questions: [
          { text: 'A prevenção primordial e primária atua sobre:', options: ['Determinantes sociais da saúde e fatores de risco antes da doença surgir', 'Sequelas pós-cirúrgicas tardias', 'Apenas transplantes de órgãos', 'Tratamentos paliativos terminais'], correctIdx: 0, explanation: 'Foca em estilos de vida, saneamento, vacinação e políticas públicas saudáveis.' },
          { text: 'A auditoria e rastreio populacional organizado (ex: cancro colorretal/colo uterino) constitui:', options: ['Prevenção secundária para diagnóstico e tratamento precoce', 'Prevenção terciária de reabilitação', 'Erro estatístico', 'Tratamento paliativo'], correctIdx: 0, explanation: 'Deteta a patologia em fase assintomática inicial, melhorando o prognóstico.' }
        ]
      }
    ]
  },
  'Biotecnologia & Genética Médica': {
    complaints: [
      'Investigação de doença rara hereditária com padrão familiar.',
      'Aconselhamento genético pré-concepcional em casal consanguíneo.',
      'Avaliação de mutações somáticas para terapia-alvo em oncologia.',
      'Suspeita clínica de anomalia cromossómica em recém-nascido.',
      'Monitorização de carga viral por PCR em tempo real.'
    ],
    histories: [
      'Histórico familiar de cancro de mama/ovário em idade precoce (genes BRCA).',
      'Filho anterior com atraso de desenvolvimento psicomotor de etiologia desconhecida.',
      'Falhas recorrentes de implantação em fertilização in vitro.',
      'Doença neuromuscular degenerativa com padrão autossómico recessivo.'
    ],
    symptoms: [
      ['Dismorfismos faciais leves', 'Atraso de crescimento', 'Hipotonia neonatal'],
      ['Mutações patogénicas identificadas', 'História familiar positiva'],
      ['Resistência a terapêutica convencional', 'Alterações enzimáticas']
    ],
    evolutionTimes: ['Congénito', 'Investigação molecular', 'Aconselhamento'],
    functionalLimitations: [
      'Necessidade de acompanhamento multidisciplinar especializado.',
      'Ansiedade familiar face a prognósticos genéticos.',
      'Complexidade no acesso a terapias génicas inovadoras.'
    ],
    stages: [
      {
        title: 'Indicação e Metodologia de Testagem Molecular',
        description: 'Escolha entre Cariótipo, Microarray (aCGH), PCR e Sequenciação de Nova Geração (NGS).',
        questions: [
          { text: 'Para detetar microdeleções ou duplicações submicroscópicas de DNA, o teste padrão é:', options: ['Array-CGH (hibridização genómica comparativa)', 'Cariótipo convencional de baixa resolução', 'Eletroforese de hemoglobina', 'Hemograma'], correctIdx: 0, explanation: 'O aCGH tem resolução milhares de vezes superior ao cariótipo clássico.' },
          { text: 'A técnica de PCR (Reação em Cadeia da Polimerase) baseia-se em:', options: ['Amplificação exponencial in vitro de sequências específicas de DNA', 'Medir a coagulação sanguínea', 'Quebrar todo o DNA celular sem leitura', 'Criar bactérias nocivas'], correctIdx: 0, explanation: 'Utiliza primers, Taq polimerase e ciclos térmicos para multiplicar DNA alvo.' }
        ]
      },
      {
        title: 'Interpretação de Variantes Genéticas e Laudo Molecular',
        description: 'Classificação de variantes segundo critérios ACMG (patogénica, benigna, VUS).',
        questions: [
          { text: 'Uma variante classificada como VUS (Variante de Significado Incerto) significa que:', options: ['Não há evidência científica suficiente no momento para afirmar se é patogénica ou benigna', 'É 100% causadora de doença grave', 'É certamente um gene normal', 'O teste foi mal colhido'], correctIdx: 0, explanation: 'Requer reavaliação periódica na literatura médica à medida que surgem novos dados.' },
          { text: 'A farmacogenómica estuda:', options: ['Como as variações genéticas individuais influenciam a resposta e toxicidade aos medicamentos', 'Apenas a produção de vacinas', 'O preço de medicamentos', 'A digestão de alimentos'], correctIdx: 0, explanation: 'Permite medicina de precisão adaptando fármacos e doses ao perfil genético do utente.' }
        ]
      },
      {
        title: 'Aconselhamento Genético e Terapias Avançadas',
        description: 'Comunicação de riscos, hereditariedade e introdução a terapias génicas/biológicas.',
        questions: [
          { text: 'O princípio central do Aconselhamento Genético é ser:', options: ['Não-diretivo, respeitando a autonomia e decisões informadas do paciente', 'Autoritário e obrigatório', 'Focado em impor a esterilização', 'Meramente comercial'], correctIdx: 0, explanation: 'O profissional informa riscos e opções, capacitando a família a decidir livremente.' },
          { text: 'A tecnologia CRISPR-Cas9 atua como:', options: ['Uma ferramenta de edição genómica precisa com corte direcionado de DNA', 'Um tipo de exame de raio-x', 'Um antibiótico clássico', 'Uma cirurgia tradicional'], correctIdx: 0, explanation: 'Permite modificar sequências de DNA com alta especificidade usando RNA guia e nuclease.' }
        ]
      }
    ]
  }
};

const HISTORY_TEMPLATES: Record<string, CaseTemplate> = {
  'Coluna Vertebral': {
    complaints: [
      'Dor lombar irradiada para a perna direita.', 
      'Cervicalgia com formigueiro nos braços.', 
      'Rigidez matinal na coluna.', 
      'Dor na região torácica ao respirar fundo.', 
      'Sensação de "choque" ao inclinar o pescoço.',
      'Dor lombar que piora ao sentar.',
      'Parestesia nos dedos das mãos.',
      'Dificuldade em manter a postura ereta.',
      'Dor aguda ao tossir ou espirrar.',
      'Fraqueza nos membros inferiores.'
    ],
    histories: [
      'Paciente refere início súbito após levantamento de peso.', 
      'História de má postura prolongada no trabalho.', 
      'Traumatismo antigo em queda de escadas.', 
      'Sedentarismo e uso excessivo de smartphone.', 
      'Atividade laboral que exige rotações frequentes do tronco.',
      'Acidente de viação com efeito de chicote (whiplash).',
      'Prática de musculação sem supervisão adequada.',
      'História familiar de discopatia degenerativa.',
      'Início insidioso após mudança de colchão.',
      'Gravidez recente com aumento da lordose lombar.'
    ],
    symptoms: [
      ['Dor L4-L5', 'Parestesia L5', 'Fraqueza tibial anterior'], 
      ['Dor cervical', 'Cefaleia tensional', 'Tonturas'], 
      ['Escoliose leve', 'Contratura paravertebral', 'Giba costal'],
      ['Hérnia discal L5-S1', 'Sinal de Lasègue positivo', 'Diminuição de reflexo aquiliano'],
      ['Espondilolistese', 'Dor à extensão lombar', 'Instabilidade segmentar']
    ],
    evolutionTimes: [
      '3 dias (fase aguda)', '2 semanas', '1 mês', '6 meses (crónico)', '1 ano',
      'Início súbito há 24h', 'Recorrente há 2 anos', 'Progressivo há 3 meses',
      '4 semanas após esforço', '10 dias'
    ],
    functionalLimitations: [
      'Dificuldade em permanecer sentado por mais de 20 min.',
      'Incapacidade de realizar flexão do tronco.',
      'Dificuldade em calçar meias e sapatos.',
      'Limitação na marcha prolongada.',
      'Dor ao realizar rotações do pescoço.',
      'Dificuldade em carregar pesos leves.',
      'Interrupção do sono devido à dor.',
      'Dificuldade em conduzir por longas distâncias.',
      'Limitação na prática de desporto habitual.',
      'Necessidade de apoio para levantar da cama.'
    ],
    questions: {
      evaluation: [
        { text: 'Qual o teste neurodinâmico para o nervo ciático?', options: ['Teste de Lasègue', 'Teste de Phalen', 'Teste de Thompson', 'Teste de Lachman'], correctIdx: 0, explanation: 'O teste de Lasègue avalia a irritação das raízes nervosas lombares.' },
        { text: 'O teste de Spurling avalia qual região?', options: ['Cervical', 'Lombar', 'Torácica', 'Sacroilíaca'], correctIdx: 0, explanation: 'O teste de Spurling é usado para diagnosticar radiculopatia cervical.' },
        { text: 'A manobra de Neri é utilizada para avaliar:', options: ['Radiculopatia lombar', 'Instabilidade cervical', 'Escoliose', 'Artrose torácica'], correctIdx: 0, explanation: 'A manobra de Neri (flexão da cabeça com perna estendida) avalia a tensão radicular.' },
        { text: 'O teste de Slump avalia:', options: ['Tensão neural global', 'Força de quadríceps', 'Equilíbrio', 'Visão'], correctIdx: 0, explanation: 'O Slump é um teste neurodinâmico altamente sensível para a coluna.' },
        { text: 'A palpação do processo espinhoso de C2 é facilitada por:', options: ['Ser o primeiro processo bífido palpável', 'Estar ao nível da mandíbula', 'Ser inexistente', 'Estar escondido pelo atlas'], correctIdx: 0, explanation: 'C2 é o primeiro processo espinhoso palpável abaixo do occipital.' },
        { text: 'O teste de distração cervical visa:', options: ['Aliviar sintomas radiculares', 'Aumentar a dor', 'Provocar tonturas', 'Testar a força'], correctIdx: 0, explanation: 'A distração aumenta o espaço foraminal, aliviando a compressão nervosa.' }
      ],
      diagnosis: [
        { text: 'Dor irradiada para o dermátomo de L5 sugere compressão em:', options: ['L4-L5', 'L5-S1', 'L3-L4', 'S1-S2'], correctIdx: 0, explanation: 'A raiz de L5 sai entre as vértebras L4 e L5.' },
        { text: 'A manobra de Valsalva positiva na coluna sugere:', options: ['Hérnia discal', 'Fratura', 'Escoliose', 'Artrose'], correctIdx: 0, explanation: 'A manobra de Valsalva aumenta a pressão intratecal, exacerbando dores de origem discal.' },
        { text: 'A síndrome da cauda equina é caracterizada por:', options: ['Anestesia em sela e perda de esfíncteres', 'Dor no joelho', 'Cefaleia', 'Tosse'], correctIdx: 0, explanation: 'É uma emergência médica por compressão das raízes sacrais.' },
        { text: 'A espondilólise é mais comum em qual vértebra?', options: ['L5', 'C1', 'T12', 'S1'], correctIdx: 0, explanation: 'L5 é a vértebra mais afetada por fraturas de stress no arco vertebral.' },
        { text: 'O sinal de Babinski positivo no adulto indica:', options: ['Lesão do trato corticoespinhal', 'Lesão de nervo periférico', 'Normalidade', 'Fadiga'], correctIdx: 0, explanation: 'Indica lesão do neurónio motor superior.' },
        { text: 'A escoliose estrutural diferencia-se da funcional por:', options: ['Presença de gibosidade no teste de Adams', 'Dor intensa', 'Idade do paciente', 'Lado da curva'], correctIdx: 0, explanation: 'A gibosidade indica rotação vertebral fixa.' }
      ],
      treatment: [
        { text: 'Qual a prioridade na fase aguda da lombalgia?', options: ['Controlo da dor', 'Fortalecimento intenso', 'Alongamento extremo', 'Manipulação brusca'], correctIdx: 0, explanation: 'Na fase aguda, o foco é a analgesia e proteção tecidual.' },
        { text: 'A tração cervical é contraindicada em caso de:', options: ['Instabilidade atlanto-axial', 'Hérnia discal', 'Cervicalgia tensional', 'Artrose'], correctIdx: 0, explanation: 'A instabilidade é uma contraindicação absoluta para tração.' },
        { text: 'O uso de TENS na coluna visa:', options: ['Analgesia via teoria das comportas', 'Aumento de força', 'Cura da hérnia', 'Redução da gordura'], correctIdx: 0, explanation: 'O TENS bloqueia a transmissão dolorosa a nível medular.' },
        { text: 'A reeducação postural foca em:', options: ['Equilíbrio de cadeias musculares', 'Músculos isolados apenas', 'Repouso absoluto', 'Uso de coletes'], correctIdx: 0, explanation: 'Trabalha a harmonia global do sistema musculoesquelético.' },
        { text: 'O calor superficial é indicado para:', options: ['Relaxamento muscular e aumento de fluxo', 'Inflamação aguda', 'Hemorragias', 'Infeções'], correctIdx: 0, explanation: 'O calor promove a vasodilatação e relaxamento de tecidos moles.' },
        { text: 'A estabilização segmentar foca em quais músculos?', options: ['Multífidos e Transverso do abdómen', 'Bíceps e Tríceps', 'Quadríceps', 'Trapézio'], correctIdx: 0, explanation: 'Estes músculos são os principais estabilizadores locais da coluna.' }
      ],
      exercises: [
        { text: 'Os exercícios de McKenzie focam principalmente em:', options: ['Extensão', 'Flexão', 'Rotação', 'Inclinação lateral'], correctIdx: 0, explanation: 'O método McKenzie utiliza frequentemente a extensão para centralizar a dor discal.' },
        { text: 'O fortalecimento do core é essencial para:', options: ['Estabilidade segmentar', 'Aumentar a flexibilidade', 'Reduzir a altura', 'Melhorar a visão'], correctIdx: 0, explanation: 'O core estabiliza a coluna durante movimentos funcionais.' },
        { text: 'O exercício de "Ponte" trabalha principalmente:', options: ['Cadeia posterior e glúteos', 'Peitorais', 'Bíceps', 'Pescoço'], correctIdx: 0, explanation: 'A ponte é excelente para ativação de glúteos e eretores da espinha.' },
        { text: 'Alongamento de isquiotibiais é importante na lombalgia para:', options: ['Reduzir a retroversão pélvica', 'Aumentar a lordose', 'Melhorar a audição', 'Nada'], correctIdx: 0, explanation: 'Isquiotibiais curtos puxam a bacia para retroversão, retificando a lombar.' },
        { text: 'O "Dead Bug" é um exercício de:', options: ['Controlo motor e estabilidade do core', 'Velocidade', 'Flexibilidade passiva', 'Equilíbrio'], correctIdx: 0, explanation: 'Treina a dissociação de membros mantendo a coluna estável.' },
        { text: 'Exercícios de Williams focam em:', options: ['Flexão lombar', 'Extensão cervical', 'Rotação torácica', 'Salto'], correctIdx: 0, explanation: 'Williams propôs a flexão para reduzir a compressão nas facetas articulares.' }
      ]
    }
  },
  'Membros Inferiores': {
    complaints: [
      'Instabilidade no joelho ao caminhar.', 
      'Dor aguda no tornozelo após entorse.', 
      'Fraqueza na anca ao subir escadas.', 
      'Dor na planta do pé ao acordar.', 
      'Sensação de "bloqueio" no joelho.',
      'Dor na face lateral da anca ao dormir.',
      'Crepitação retro-patelar ao agachar.',
      'Dificuldade em realizar a dorsiflexão.',
      'Dor no tendão de Aquiles após corrida.',
      'Sensação de "perna pesada" ao final do dia.'
    ],
    histories: [
      'Lesão desportiva durante partida de futebol.', 
      'Início insidioso após aumento de carga em corrida.', 
      'Pós-traumático em acidente doméstico.', 
      'Uso de calçado inadequado por longos períodos.', 
      'Entorse em inversão durante caminhada em terreno irregular.',
      'Queda de altura com impacto nos calcanhares.',
      'Sobrecarga laboral em pé durante 8 horas.',
      'História de cirurgia prévia no menisco.',
      'Prática de trail running em terrenos técnicos.',
      'Artrose de anca diagnosticada há 2 anos.'
    ],
    symptoms: [
      ['Edema no joelho', 'Gaveta anterior positiva', 'Dor na linha articular'], 
      ['Edema maleolar', 'Equimose lateral', 'Dor ao apoio'], 
      ['Dor no calcâneo', 'Tensão na fáscia plantar', 'Rigidez matinal'],
      ['Trocanterite', 'Dor à palpação lateral', 'Trendelenburg positivo'],
      ['Condromalácia patelar', 'Dor ao subir escadas', 'Sinal do cinema']
    ],
    evolutionTimes: [
      '5 dias após entorse', '3 semanas', '2 meses', '4 meses', '8 meses',
      'Início insidioso há 6 semanas', 'Pós-traumático há 48h', '1 ano de evolução',
      '10 dias após cirurgia', '6 meses'
    ],
    functionalLimitations: [
      'Dificuldade em subir e descer escadas.',
      'Claudicação na marcha (coxear).',
      'Incapacidade de realizar agachamento.',
      'Instabilidade ao caminhar em terrenos irregulares.',
      'Dor ao permanecer em pé por longos períodos.',
      'Limitação na amplitude de flexão do joelho.',
      'Dificuldade em realizar saltos ou corrida.',
      'Bloqueio articular ocasional.',
      'Necessidade de uso de auxiliar de marcha (canhota).',
      'Dificuldade em entrar e sair do carro.'
    ],
    questions: {
      evaluation: [
        { text: 'Qual teste avalia o ligamento cruzado anterior?', options: ['Teste de Lachman', 'Teste de McMurray', 'Teste de Appley', 'Teste de Valgo'], correctIdx: 0, explanation: 'O teste de Lachman é o mais sensível para rotura do LCA.' },
        { text: 'O teste de Thompson avalia a integridade de:', options: ['Tendão de Aquiles', 'Ligamento deltoide', 'Fascia plantar', 'Menisco medial'], correctIdx: 0, explanation: 'A ausência de flexão plantar ao comprimir a gemada indica rotura do tendão de Aquiles.' },
        { text: 'O teste de gaveta posterior avalia qual estrutura?', options: ['LCP (Ligamento Cruzado Posterior)', 'LCA', 'Menisco', 'Ligamento Colateral'], correctIdx: 0, explanation: 'Avalia a translação posterior da tíbia sobre o fémur.' },
        { text: 'O teste de McMurray é utilizado para detetar:', options: ['Lesões meniscais', 'Instabilidade de tornozelo', 'Fractura de fémur', 'Bursite'], correctIdx: 0, explanation: 'Utiliza rotações e flexão/extensão para provocar sintomas meniscais.' },
        { text: 'O teste de Ober avalia a tensão em:', options: ['Banda iliotibial', 'Quadríceps', 'Isquiotibiais', 'Psoas'], correctIdx: 0, explanation: 'Avalia o encurtamento do tensor da fáscia lata e banda iliotibial.' },
        { text: 'O teste de Ely avalia o encurtamento de:', options: ['Reto femoral', 'Glúteo máximo', 'Gémeos', 'Tibial anterior'], correctIdx: 0, explanation: 'A flexão do joelho provoca elevação da bacia se o reto femoral estiver curto.' }
      ],
      diagnosis: [
        { text: 'O sinal de Trendelenburg indica fraqueza de:', options: ['Glúteo médio', 'Quadríceps', 'Isquiotibiais', 'Glúteo máximo'], correctIdx: 0, explanation: 'O glúteo médio estabiliza a bacia no plano frontal durante o apoio unipodal.' },
        { text: 'Dor na interlinha articular do joelho sugere:', options: ['Lesão meniscal', 'Lesão de LCA', 'Tendinite patelar', 'Bursite'], correctIdx: 0, explanation: 'A dor localizada na interlinha é um sinal clássico de patologia meniscal.' },
        { text: 'A síndrome da banda iliotibial é comum em:', options: ['Corredores e ciclistas', 'Nadadores', 'Pianistas', 'Escritores'], correctIdx: 0, explanation: 'O atrito repetitivo no epicôndilo lateral do fémur causa inflamação.' },
        { text: 'O "pé plano" caracteriza-se por:', options: ['Diminuição do arco longitudinal medial', 'Aumento do arco', 'Dedos em garra', 'Calcanhar varo'], correctIdx: 0, explanation: 'O desabamento do arco medial leva ao pé plano.' },
        { text: 'A doença de Osgood-Schlatter afeta:', options: ['Tuberosidade da tíbia', 'Cabeça do fémur', 'Calcâneo', 'Patela'], correctIdx: 0, explanation: 'É uma osteocondrite da tuberosidade tibial, comum em adolescentes ativos.' },
        { text: 'O sinal de Clarke avalia:', options: ['Condromalácia patelar', 'Rotura de menisco', 'Instabilidade de anca', 'Entorse'], correctIdx: 0, explanation: 'Avalia a dor ao comprimir a patela contra o fémur durante a contração do quadríceps.' }
      ],
      treatment: [
        { text: 'O protocolo PEACE & LOVE é indicado para:', options: ['Lesões de tecidos moles', 'Fraturas expostas', 'Infeções', 'Artrose avançada'], correctIdx: 0, explanation: 'É a atualização do protocolo de gestão de lesões agudas.' },
        { text: 'O uso de gelo na fase aguda visa:', options: ['Vasoconstrição e analgesia', 'Aumentar o metabolismo', 'Promover edema', 'Dilatar vasos'], correctIdx: 0, explanation: 'O gelo ajuda a controlar o processo inflamatório inicial e a dor.' },
        { text: 'A mobilização articular grau I e II visa:', options: ['Alívio da dor e nutrição articular', 'Ganho de ADM', 'Estiramento capsular', 'Manipulação'], correctIdx: 0, explanation: 'Graus baixos de Maitland são usados para analgesia.' },
        { text: 'O uso de muletas no pós-op de anca serve para:', options: ['Proteção de carga e equilíbrio', 'Aumentar a velocidade', 'Exercitar os braços', 'Nada'], correctIdx: 0, explanation: 'Reduz o stress na articulação em fase de cicatrização.' },
        { text: 'A drenagem linfática manual é útil em:', options: ['Edemas pós-traumáticos', 'Fraturas agudas', 'Infeções ativas', 'Tumores'], correctIdx: 0, explanation: 'Auxilia na reabsorção do excesso de fluido intersticial.' },
        { text: 'O fortalecimento isométrico é seguro em:', options: ['Fases iniciais de reabilitação', 'Fases finais apenas', 'Nunca', 'Apenas em atletas'], correctIdx: 0, explanation: 'Permite ativação muscular sem movimento articular doloroso.' }
      ],
      exercises: [
        { text: 'Exercícios excêntricos são padrão ouro para:', options: ['Tendinopatias', 'Roturas completas', 'Paralisia total', 'Fraturas agudas'], correctIdx: 0, explanation: 'A carga excêntrica promove a remodelação do colagénio no tendão.' },
        { text: 'O agachamento búlgaro foca principalmente em:', options: ['Quadríceps e Glúteos', 'Bíceps braquial', 'Abdominais', 'Trapézios'], correctIdx: 0, explanation: 'É um exercício excelente para força e estabilidade de membros inferiores.' },
        { text: 'O exercício de "Clamshell" foca em:', options: ['Rotadores externos da anca', 'Flexores do joelho', 'Extensores do pé', 'Abdominais'], correctIdx: 0, explanation: 'Fortalece o glúteo médio e rotadores externos, vitais para a estabilidade da anca.' },
        { text: 'O treino de equilíbrio em disco de proprioceção visa:', options: ['Estabilidade do tornozelo', 'Aumentar a altura', 'Reduzir a visão', 'Nada'], correctIdx: 0, explanation: 'Melhora a resposta neuromuscular após entorses.' },
        { text: 'Elevação de calcanhares (Calf Raises) trabalha:', options: ['Tríceps sural (gémeos e sóleo)', 'Quadríceps', 'Tibial anterior', 'Isquiotibiais'], correctIdx: 0, explanation: 'Essencial para a força de impulsão na marcha e corrida.' },
        { text: 'O exercício de "Monster Walk" com banda elástica foca em:', options: ['Abdutores da anca', 'Flexores do pescoço', 'Bíceps', 'Tríceps'], correctIdx: 0, explanation: 'Excelente para ativação do glúteo médio em cadeia cinética fechada.' }
      ]
    }
  },
  'Membros Superiores': {
    complaints: [
      'Dificuldade em elevar o braço acima da cabeça.', 
      'Dor no cotovelo ao segurar objetos.', 
      'Parestesia na mão durante a noite.', 
      'Fraqueza na preensão manual.', 
      'Dor no ombro ao dormir de lado.',
      'Instabilidade no ombro após luxação.',
      'Dor no punho ao usar o teclado.',
      'Dedo em gatilho no polegar.',
      'Dor na face lateral do cotovelo.',
      'Sensação de "ombro congelado".'
    ],
    histories: [
      'Movimentos repetitivos em ambiente laboral.', 
      'Queda sobre o membro superior estendido.', 
      'Sobrecarga em treino de ginásio.', 
      'Uso intensivo de computador e rato.', 
      'Traumatismo direto em queda de bicicleta.',
      'Prática de ténis (cotovelo de tenista).',
      'Atividade de pintura de tetos prolongada.',
      'História de diabetes (fator de risco para capsulite).',
      'Esforço súbito ao carregar malas pesadas.',
      'Luxação do ombro durante jogo de andebol.'
    ],
    symptoms: [
      ['Teste de Neer positivo', 'Arco doloroso', 'Fraqueza supraespinhoso'], 
      ['Epicondilalgia lateral', 'Dor à extensão do punho', 'Diminuição de força'], 
      ['Sinal de Tinel positivo', 'Atrofia tenar', 'Parestesia 1º-3º dedos'],
      ['Capsulite adesiva', 'Limitação severa de rotação externa', 'Dor noturna'],
      ['Instabilidade de ombro', 'Teste de apreensão positivo', 'Sulcus sign']
    ],
    evolutionTimes: [
      '2 semanas', '1 mês', '3 meses', '5 meses', '1 ano',
      'Início súbito após esforço repetitivo', '6 semanas', '10 meses',
      '4 dias (agudo)', '7 meses'
    ],
    functionalLimitations: [
      'Dificuldade em realizar preensão (aperto de mão).',
      'Incapacidade de elevar o braço acima de 90 graus.',
      'Dificuldade em realizar higiene pessoal.',
      'Limitação na rotação interna (colocar mão atrás das costas).',
      'Dor ao utilizar o rato do computador.',
      'Dificuldade em carregar sacos de compras.',
      'Limitação na amplitude de extensão do cotovelo.',
      'Perda de força para abrir frascos.',
      'Dificuldade em vestir uma camisola.',
      'Dor ao realizar movimentos de torção (ex: abrir porta).'
    ],
    questions: {
      evaluation: [
        { text: 'Qual teste avalia o impacto subacromial?', options: ['Teste de Neer', 'Teste de Cozen', 'Teste de Speed', 'Teste de Yergason'], correctIdx: 0, explanation: 'O teste de Neer avalia o impacto das estruturas no espaço subacromial.' },
        { text: 'O teste de Phalen avalia qual patologia?', options: ['Síndrome do Túnel Cárpico', 'Epicondilite', 'Tenossinovite de De Quervain', 'Rotura da Baixa Rotadora'], correctIdx: 0, explanation: 'O teste de Phalen aumenta a pressão no nervo mediano no punho.' },
        { text: 'O teste de Hawkins-Kennedy avalia:', options: ['Impacto subacromial', 'Instabilidade de cotovelo', 'Fractura de punho', 'Lesão de nervo ulnar'], correctIdx: 0, explanation: 'É um teste de provocação para o manguito rotador.' },
        { text: 'O teste de Cozen é usado para diagnosticar:', options: ['Epicondilite lateral', 'Epicondilite medial', 'Síndrome do túnel cárpico', 'Bursite'], correctIdx: 0, explanation: 'Avalia a dor na origem dos extensores do punho.' },
        { text: 'O teste de Jobe (Empty Can) avalia qual músculo?', options: ['Supraespinhoso', 'Infraespinhoso', 'Subescapular', 'Redondo menor'], correctIdx: 0, explanation: 'É o teste clássico para avaliar a integridade do supraespinhoso.' },
        { text: 'O teste de Allen avalia:', options: ['Circulação arterial da mão', 'Força de preensão', 'Sensibilidade', 'Coordenação'], correctIdx: 0, explanation: 'Verifica a patência das artérias radial e ulnar.' }
      ],
      diagnosis: [
        { text: 'O teste de Finkelstein é positivo na:', options: ['Tenossinovite de De Quervain', 'Síndrome do Canal de Guyon', 'Dedo em gatilho', 'Epicondilite medial'], correctIdx: 0, explanation: 'Avalia a inflamação dos tendões do abdutor longo e extensor curto do polegar.' },
        { text: 'Dor à supinação resistida com o cotovelo fletido sugere:', options: ['Lesão do bíceps', 'Epicondilite lateral', 'Lesão do tríceps', 'Bursite olecraniana'], correctIdx: 0, explanation: 'O bíceps é um potente supinador do antebraço.' },
        { text: 'A "mão em garra" sugere lesão de qual nervo?', options: ['Nervo Ulnar', 'Nervo Mediano', 'Nervo Radial', 'Nervo Axilar'], correctIdx: 0, explanation: 'A paralisia dos intrínsecos inervados pelo ulnar causa esta deformidade.' },
        { text: 'A epicondilite medial é também conhecida como:', options: ['Cotovelo de golfista', 'Cotovelo de tenista', 'Cotovelo de mineiro', 'Nenhuma'], correctIdx: 0, explanation: 'Afeta a origem dos flexores do punho no epicôndilo medial.' },
        { text: 'A deformidade de Boutonnière afeta:', options: ['Dedos da mão', 'Ombro', 'Cotovelo', 'Punho'], correctIdx: 0, explanation: 'É uma rotura do tendão extensor central na articulação IFP.' },
        { text: 'O sinal de Tinel no punho sugere:', options: ['Compressão do nervo mediano', 'Fractura', 'Artrose', 'Tendinite'], correctIdx: 0, explanation: 'A percussão sobre o nervo provoca parestesias se houver compressão.' }
      ],
      treatment: [
        { text: 'Na fase inicial da capsulite adesiva, o foco é:', options: ['Controlo da dor', 'Ganho agressivo de ADM', 'Fortalecimento máximo', 'Imobilização total'], correctIdx: 0, explanation: 'A fase "congelante" exige foco na analgesia e movimentos suaves.' },
        { text: 'A iontoforese pode ser usada para:', options: ['Administrar fármacos via pele', 'Aumentar a força', 'Reparar ossos', 'Melhorar a visão'], correctIdx: 0, explanation: 'Usa corrente elétrica para introduzir iões medicamentosos nos tecidos.' },
        { text: 'O uso de tipoia pós-cirurgia de ombro visa:', options: ['Proteção das suturas e repouso', 'Aumentar a força', 'Exercitar o braço', 'Nada'], correctIdx: 0, explanation: 'Evita a tração excessiva nos tecidos em cicatrização.' },
        { text: 'A termoterapia profunda (Ondas Curtas) é útil para:', options: ['Aumentar extensibilidade tecidual', 'Inflamação aguda', 'Hemorragias', 'Pacientes com pacemaker'], correctIdx: 0, explanation: 'O calor profundo relaxa tecidos e melhora a circulação.' },
        { text: 'O deslizamento neural do nervo mediano é indicado para:', options: ['Síndrome do Túnel Cárpico', 'Fractura de rádio', 'Epicondilite', 'Luxação'], correctIdx: 0, explanation: 'Melhora a mobilidade do nervo no seu trajeto.' },
        { text: 'A massagem transversa profunda (Cyriax) é usada em:', options: ['Tendinopatias crónicas', 'Feridas abertas', 'Infeções', 'Hematomas agudos'], correctIdx: 0, explanation: 'Visa romper aderências e promover a remodelação tecidual.' }
      ],
      exercises: [
        { text: 'Os exercícios de Codman são indicados para:', options: ['Mobilização passiva do ombro', 'Fortalecimento do punho', 'Estabilidade do cotovelo', 'Alongamento do pescoço'], correctIdx: 0, explanation: 'São exercícios pendulares que usam a gravidade para mobilizar a articulação.' },
        { text: 'O fortalecimento dos rotadores externos é vital para:', options: ['Estabilidade da cabeça umeral', 'Aumentar a flexão do punho', 'Melhorar a preensão', 'Reduzir a cifose'], correctIdx: 0, explanation: 'A coaptação da cabeça do úmero depende da integridade da baia rotadora.' },
        { text: 'Exercícios de "Wall Crawl" (aranha na parede) visam:', options: ['Ganho de amplitude de elevação', 'Força de tríceps', 'Equilíbrio', 'Nada'], correctIdx: 0, explanation: 'Ajudam o paciente a ganhar ADM de forma assistida.' },
        { text: 'O fortalecimento da preensão manual pode ser feito com:', options: ['Handgrip ou bolas de espuma', 'Pesos de perna', 'Caminhada', 'Salto'], correctIdx: 0, explanation: 'Melhora a funcionalidade da mão em atividades diárias.' },
        { text: 'Exercícios de estabilização escapular focam em:', options: ['Serrátil anterior e Trapézio inferior', 'Bíceps', 'Peitoral maior', 'Deltoide'], correctIdx: 0, explanation: 'Uma escápula estável é a base para o movimento do ombro.' },
        { text: 'O alongamento do peitoral menor é importante para:', options: ['Reduzir a protração do ombro', 'Aumentar a cifose', 'Melhorar a audição', 'Nada'], correctIdx: 0, explanation: 'O peitoral menor curto puxa a escápula para a frente e para baixo.' }
      ]
    }
  },
  'Neurológico': {
    complaints: [
      'Hemiparésia com dificuldade na marcha.', 
      'Tremor em repouso e rigidez muscular.', 
      'Falta de equilíbrio e coordenação.', 
      'Dificuldade na fala e deglutição.', 
      'Perda de sensibilidade fina.',
      'Fraqueza muscular ascendente.',
      'Visão dupla e fadiga extrema.',
      'Dificuldade em realizar movimentos precisos.',
      'Alteração do tónus muscular (espasticidade).',
      'Perda de controlo de esfíncteres.'
    ],
    histories: [
      'Sequela de Acidente Vascular Cerebral (AVC).', 
      'Diagnóstico recente de Doença de Parkinson.', 
      'Esclerose Múltiama em fase de surto-remissão.', 
      'Traumatismo Cranioencefálico (TCE) em acidente.', 
      'Lesão Medular incompleta.',
      'Síndrome de Guillain-Barré após infeção.',
      'Esclerose Lateral Amiotrófica (ELA).',
      'Tumor cerebral removido cirurgicamente.',
      'Neuropatia diabética periférica.',
      'Paralisia facial periférica (Bell).'
    ],
    symptoms: [
      ['Espasticidade', 'Hiperreflexia', 'Sinal de Babinski'], 
      ['Bradicinesia', 'Marcha festinante', 'Fácies em máscara'], 
      ['Ataxia', 'Dismetria', 'Nistagmo'],
      ['Hipotonia', 'Arreflexia', 'Fraqueza distal'],
      ['Disfagia', 'Disartria', 'Labilidade emocional']
    ],
    evolutionTimes: [
      '24 horas (início súbito)', '1 semana', '2 semanas', '1 mês', '3 meses',
      '6 meses', '1 ano', 'Pós-AVC há 15 dias', 'Progressivo há 2 meses', '5 dias'
    ],
    functionalLimitations: [
      'Dificuldade em realizar a marcha de forma independente.',
      'Incapacidade de realizar preensão fina (pinça).',
      'Dificuldade em manter o equilíbrio em pé.',
      'Limitação na realização de transferências (cama-cadeira).',
      'Dificuldade na deglutição (disfagia).',
      'Incapacidade de fechar o olho (paralisia facial).',
      'Dificuldade na comunicação verbal (disartria).',
      'Limitação na amplitude de movimento por espasticidade.',
      'Necessidade de supervisão constante para segurança.',
      'Dificuldade em realizar atividades de vida diária (AVDs).'
    ],
    questions: {
      evaluation: [
        { text: 'O sinal de Babinski indica lesão de:', options: ['Neurónio Motor Superior', 'Neurónio Motor Inferior', 'Cerebelo', 'Gânglios da Base'], correctIdx: 0, explanation: 'O sinal de Babinski é um sinal clássico de libertação piramidal (NMS).' },
        { text: 'A escala de Ashworth avalia:', options: ['Espasticidade', 'Força muscular', 'Equilíbrio', 'Coordenação'], correctIdx: 0, explanation: 'A escala de Ashworth quantifica o tónus muscular e a resistência ao movimento passivo.' },
        { text: 'O teste de Romberg avalia:', options: ['Equilíbrio estático e proprioceção', 'Força de preensão', 'Visão periférica', 'Audição'], correctIdx: 0, explanation: 'O teste de Romberg verifica a integridade das vias propriocecionais e vestibulares.' },
        { text: 'A escala de Glasgow é usada para avaliar:', options: ['Nível de consciência', 'Força muscular', 'Amplitude de movimento', 'Equilíbrio'], correctIdx: 0, explanation: 'Avalia a resposta ocular, verbal e motora após lesão cerebral.' },
        { text: 'O teste de "índice-nariz" avalia a função de:', options: ['Cerebelo', 'Lobo frontal', 'Nervo ótico', 'Medula espinhal'], correctIdx: 0, explanation: 'Avalia a coordenação e a presença de dismetria.' },
        { text: 'A escala de Fugl-Meyer é específica para:', options: ['Recuperação pós-AVC', 'Doença de Parkinson', 'Esclerose Múltipla', 'Lesão Medular'], correctIdx: 0, explanation: 'É uma escala detalhada para avaliar a função motora e sensorial pós-AVC.' }
      ],
      diagnosis: [
        { text: 'A marcha festinante é típica de:', options: ['Doença de Parkinson', 'AVC', 'Lesão Medular', 'Ataxia Cerebelosa'], correctIdx: 0, explanation: 'Caracteriza-se por passos curtos e rápidos com o tronco inclinado para a frente.' },
        { text: 'Uma lesão no cerebelo provoca tipicamente:', options: ['Ataxia', 'Paralisia total', 'Perda de memória', 'Cegueira'], correctIdx: 0, explanation: 'O cerebelo coordena o movimento e o equilíbrio.' },
        { text: 'A "marcha ceifante" é característica de:', options: ['Hemiparésia pós-AVC', 'Parkinson', 'Lesão de nervo radial', 'Ataxia'], correctIdx: 0, explanation: 'O paciente realiza uma circumdução do membro inferior espástico.' },
        { text: 'O tremor de intenção sugere lesão no:', options: ['Cerebelo', 'Gânglios da base', 'Córtex motor', 'Nervo periférico'], correctIdx: 0, explanation: 'O tremor aparece durante a execução de um movimento voluntário.' },
        { text: 'A rigidez em "roda dentada" é sinal de:', options: ['Parkinsonismo', 'Espasticidade', 'Hipotonia', 'Miopia'], correctIdx: 0, explanation: 'É a resistência intermitente ao movimento passivo típica do Parkinson.' },
        { text: 'A paralisia de Bell afeta qual nervo craniano?', options: ['VII (Facial)', 'V (Trigémeo)', 'III (Oculomotor)', 'X (Vago)'], correctIdx: 0, explanation: 'Causa paralisia súbita dos músculos de um lado da face.' }
      ],
      treatment: [
        { text: 'O conceito Bobath foca na:', options: ['Inibição de padrões anormais', 'Fortalecimento isolado', 'Uso de ortóteses rígidas', 'Repouso no leito'], correctIdx: 0, explanation: 'Bobath foca na facilitação do movimento normal e inibição da espasticidade.' },
        { text: 'A toxina botulínica é usada na neuro para:', options: ['Reduzir a espasticidade focal', 'Aumentar a força', 'Curar o Parkinson', 'Melhorar a fala'], correctIdx: 0, explanation: 'Atua na placa motora reduzindo a contração muscular excessiva.' },
        { text: 'A Terapia por Contensão Induzida (TCI) visa:', options: ['Forçar o uso do membro afetado', 'Imobilizar o membro afetado', 'Reduzir a dor', 'Nada'], correctIdx: 0, explanation: 'Inibe o uso do membro são para promover a neuroplasticidade no afetado.' },
        { text: 'A estimulação elétrica funcional (FES) é usada para:', options: ['Gerar contração funcional em músculos paralisados', 'Queimar gordura', 'Aumentar a audição', 'Reduzir a visão'], correctIdx: 0, explanation: 'Auxilia em movimentos como a dorsiflexão durante a marcha.' },
        { text: 'O treino de dupla tarefa é importante para:', options: ['Melhorar a autonomia e reduzir quedas', 'Causar confusão', 'Aumentar a dor', 'Nada'], correctIdx: 0, explanation: 'Prepara o paciente para situações reais onde deve caminhar e falar/pensar ao mesmo tempo.' },
        { text: 'A realidade virtual na reabilitação neuro visa:', options: ['Aumentar o engajamento e feedback', 'Isolar o paciente', 'Reduzir o movimento', 'Nada'], correctIdx: 0, explanation: 'Proporciona um ambiente seguro e motivador para o treino motor.' }
      ],
      exercises: [
        { text: 'Exercícios de Frenkel são usados para:', options: ['Coordenação e Ataxia', 'Aumentar a massa muscular', 'Melhorar a respiração', 'Reduzir a febre'], correctIdx: 0, explanation: 'São exercícios de precisão visualmente guiados para pacientes atáxicos.' },
        { text: 'O treino de marcha com suspensão parcial de peso ajuda em:', options: ['Neuroplasticidade', 'Aumentar a dor', 'Reduzir a atenção', 'Causar quedas'], correctIdx: 0, explanation: 'Permite o treino precoce do padrão de marcha com segurança.' },
        { text: 'Exercícios de Kabat (PNF) utilizam:', options: ['Padrões diagonais e espirais', 'Movimentos apenas retilíneos', 'Repouso absoluto', 'Apenas pesos leves'], correctIdx: 0, explanation: 'A facilitação neuromuscular propriocetiva usa padrões funcionais de movimento.' },
        { text: 'O exercício de "ponte" na neuro é útil para:', options: ['Controlo de tronco e força de glúteos', 'Melhorar a visão', 'Reduzir a audição', 'Nada'], correctIdx: 0, explanation: 'Fundamental para a preparação para a marcha e transferências.' },
        { text: 'Exercícios de equilíbrio em base instável visam:', options: ['Melhorar as reações de retificação', 'Causar tonturas', 'Reduzir a força', 'Nada'], correctIdx: 0, explanation: 'Desafiam o sistema nervoso a manter o centro de gravidade.' },
        { text: 'O treino de alcance de objetos foca em:', options: ['Coordenação olho-mão e funcionalidade', 'Força de pernas', 'Respiração', 'Nada'], correctIdx: 0, explanation: 'Essencial para a independência em atividades de vida diária.' }
      ]
    }
  },
  'Postural': {
    complaints: [
      'Desvio visível na coluna e dor escapular.', 
      'Projeção anterior da cabeça e ombros.', 
      'Assimetria nas ancas.', 
      'Dor nos pés ao final do dia.', 
      'Cansaço muscular nas costas.',
      'Dificuldade em manter-se sentado direito.',
      'Sensação de que um ombro está mais alto.',
      'Dor nos joelhos por desalinhamento.',
      'Cefaleias frequentes ao final do dia.',
      'Desgaste assimétrico do calçado.'
    ],
    histories: [
      'Escoliose idiopática detetada na adolescência.', 
      'Hábitos posturais viciosos em teletrabalho.', 
      'Compensação muscular por dismetria de membros.', 
      'Uso de mochilas pesadas na infância.', 
      'Atividade profissional em pé por longas horas.',
      'Prática de desporto assimétrico (ex: ténis).',
      'Traumatismo antigo que alterou a marcha.',
      'Crescimento rápido durante a puberdade.',
      'Uso frequente de saltos altos.',
      'Cirurgia abdominal que gerou retração cicatricial.'
    ],
    symptoms: [
      ['Escoliose', 'Giba costal', 'Desnível de ombros'], 
      ['Cifose aumentada', 'Escápulas aladas', 'Encurtamento peitoral'], 
      ['Hiperlordose', 'Anteversão pélvica', 'Protrusão abdominal'],
      ['Pé plano valgo', 'Genu valgo', 'Rotação interna de fémur'],
      ['Cabeça protusa', 'Retração de suboccipitais', 'Tensão cervical']
    ],
    evolutionTimes: [
      'Anos de evolução (crónico)', 'Detetado há 6 meses', '1 ano', '2 anos', '5 anos',
      'Início na adolescência', 'Progressivo há 3 meses', 'Recorrente há 10 anos',
      'Detetado em exame de rotina', '8 meses'
    ],
    functionalLimitations: [
      'Dificuldade em manter a postura ereta por longos períodos.',
      'Incapacidade de realizar flexão total do tronco.',
      'Dificuldade em respirar profundamente (restrição torácica).',
      'Limitação na prática de atividades físicas de impacto.',
      'Dor ao permanecer sentado em cadeiras sem suporte.',
      'Dificuldade em realizar movimentos de torção do tronco.',
      'Fadiga muscular precoce ao final do dia.',
      'Dificuldade em encontrar vestuário adequado.',
      'Limitação na amplitude de rotação cervical.',
      'Desconforto estético que afeta a autoconfiança.'
    ],
    questions: {
      evaluation: [
        { text: 'O teste de Adams avalia:', options: ['Escoliose estrutural', 'Cifose postural', 'Pé plano', 'Genu valgo'], correctIdx: 0, explanation: 'O teste de Adams evidencia a gibosidade em escolioses estruturais.' },
        { text: 'A avaliação postural deve ser feita em:', options: ['Ortostatismo', 'Decúbito dorsal', 'Sentado', 'Suspensão'], correctIdx: 0, explanation: 'A postura é avaliada preferencialmente em pé para observar a ação da gravidade.' },
        { text: 'A fotogrametria é usada para:', options: ['Análise postural computadorizada', 'Medir a febre', 'Testar a visão', 'Nada'], correctIdx: 0, explanation: 'Usa fotos e software para medir ângulos e desvios posturais.' },
        { text: 'O fio de prumo na avaliação postural serve para:', options: ['Verificar o alinhamento vertical', 'Medir a força', 'Testar o equilíbrio', 'Nada'], correctIdx: 0, explanation: 'É uma ferramenta clássica para observar desvios em relação à linha de gravidade.' },
        { text: 'A observação do triângulo do talhe avalia:', options: ['Simetria do tronco', 'Força de braços', 'Flexibilidade de pernas', 'Nada'], correctIdx: 0, explanation: 'O espaço entre o braço e a cintura indica desvios laterais da coluna.' },
        { text: 'A avaliação da pisada no podoscópio identifica:', options: ['Tipo de pé (plano, cavo, normal)', 'Força do tornozelo', 'Comprimento da perna', 'Nada'], correctIdx: 0, explanation: 'Mostra as áreas de maior pressão na planta do pé.' }
      ],
      diagnosis: [
        { text: 'A hipercifose torácica costuma associar-se a:', options: ['Encurtamento de peitorais', 'Fraqueza de abdominais', 'Encurtamento de isquiotibiais', 'Fraqueza de quadríceps'], correctIdx: 0, explanation: 'A postura cifótica leva frequentemente ao encurtamento adaptativo dos peitorais.' },
        { text: 'O ângulo de Cobb é usado para medir:', options: ['Escoliose', 'Cifose', 'Lordose', 'Todas as anteriores'], correctIdx: 3, explanation: 'O ângulo de Cobb quantifica curvaturas da coluna em exames de imagem.' },
        { text: 'A anteprojeção da cabeça causa sobrecarga em:', options: ['Músculos suboccipitais', 'Gémeos', 'Abdominais', 'Nada'], correctIdx: 0, explanation: 'Leva a dores cervicais e cefaleias tensionais.' },
        { text: 'O genu valgo é o desalinhamento dos joelhos em:', options: ['"X"', '"O"', 'Frente', 'Trás'], correctIdx: 0, explanation: 'Os joelhos aproximam-se e os tornozelos afastam-se.' },
        { text: 'A báscula de bacia pode indicar:', options: ['Dismetria de membros inferiores', 'Força de braços', 'Problemas de visão', 'Nada'], correctIdx: 0, explanation: 'Um lado da bacia está mais alto que o outro, muitas vezes por pernas de tamanhos diferentes.' },
        { text: 'A escápula alada sugere fraqueza de:', options: ['Serrátil anterior', 'Bíceps', 'Peitoral', 'Nada'], correctIdx: 0, explanation: 'O serrátil não consegue manter a escápula colada à grade costal.' }
      ],
      treatment: [
        { text: 'O RPG (Reeducação Postural Global) foca em:', options: ['Cadeias musculares', 'Músculos isolados', 'Apenas ossos', 'Massagem relaxante'], correctIdx: 0, explanation: 'O RPG trata o corpo como um todo através de cadeias musculares.' },
        { text: 'Palmilhas propriocecionais visam:', options: ['Reprogramar a postura via pés', 'Aumentar a altura', 'Amortecer apenas', 'Aquecer os pés'], correctIdx: 0, explanation: 'Atuam nos recetores da planta do pé para corrigir a postura.' }
      ],
      exercises: [
        { text: 'Exercícios de fortalecimento de core ajudam na:', options: ['Estabilização da coluna', 'Força de braços', 'Visão', 'Nada'], correctIdx: 0, explanation: 'Um core forte protege a coluna e melhora a postura.' },
        { text: 'Alongamentos de peitorais corrigem a:', options: ['Hipercifose', 'Hiperlordose', 'Escoliose', 'Nada'], correctIdx: 0, explanation: 'Contrariam o enrolamento dos ombros para a frente.' }
      ]
    }
  },
  'Desportivo': {
    complaints: [
      'Dor muscular súbita durante sprint.', 
      'Tendinopatia persistente após competição.', 
      'Bloqueio articular no joelho.', 
      'Instabilidade recorrente no ombro.', 
      'Dor na canela ao correr.',
      'Cãibras frequentes durante o treino.',
      'Perda de rendimento desportivo.',
      'Dor no calcanhar ao saltar.',
      'Sensação de "estalido" no músculo.',
      'Inflamação após atividade física intensa.'
    ],
    histories: [
      'Atleta de alta competição com sobrecarga de treino.', 
      'Lesão aguda em contexto de jogo federado.', 
      'Má gestão de períodos de descanso e recuperação.', 
      'Mudança brusca de piso ou calçado desportivo.', 
      'Retorno precoce à atividade após lesão anterior.',
      'Traumatismo direto em desporto de contacto.',
      'Aumento súbito de volume ou intensidade de treino.',
      'Desequilíbrio muscular entre agonistas e antagonistas.',
      'Falta de aquecimento adequado antes da prova.',
      'História de múltiplas entorses recidivantes.'
    ],
    symptoms: [
      ['Rotura muscular', 'Hematoma local', 'Dor à contração'], 
      ['Tendinite aquiliana', 'Espessamento do tendão', 'Crepitação'], 
      ['Pubalgia', 'Dor aos adutores', 'Fraqueza de core'],
      ['Periostite tibial', 'Dor à palpação da tíbia', 'Edema local'],
      ['Lesão de menisco', 'Bloqueio articular', 'Dor à rotação']
    ],
    evolutionTimes: [
      'Início súbito durante competição', '2 dias (agudo)', '1 semana', '3 semanas',
      '2 meses (recorrente)', '6 meses', '1 ano', 'Pós-cirurgia há 1 mês',
      '48 horas após trauma', '10 dias'
    ],
    functionalLimitations: [
      'Incapacidade de realizar sprint (corrida rápida).',
      'Dificuldade em realizar mudanças de direção bruscas.',
      'Dor ao realizar saltos ou aterragem.',
      'Limitação na prática do gesto desportivo específico.',
      'Dificuldade em realizar remates ou pontapés.',
      'Incapacidade de completar o tempo total de treino.',
      'Dor ao realizar alongamentos dinâmicos.',
      'Instabilidade articular percebida durante o esforço.',
      'Necessidade de interrupção da atividade competitiva.',
      'Dificuldade em realizar movimentos explosivos.'
    ],
    questions: {
      evaluation: [
        { text: 'Qual o protocolo inicial para lesões agudas?', options: ['POLICE', 'HARM', 'HEAT', 'STRETCH'], correctIdx: 0, explanation: 'POLICE foca na proteção e carga ideal precoce.' },
        { text: 'A escala de Borg avalia:', options: ['Perceção de esforço', 'Força máxima', 'Flexibilidade', 'Velocidade'], correctIdx: 0, explanation: 'É usada para monitorizar a intensidade do exercício.' },
        { text: 'O teste de Lachman avalia a integridade de:', options: ['Ligamento Cruzado Anterior (LCA)', 'Ligamento Cruzado Posterior (LCP)', 'Menisco medial', 'Ligamento Colateral'], correctIdx: 0, explanation: 'É o teste mais sensível para diagnosticar rotura de LCA.' },
        { text: 'O teste de gaveta anterior no tornozelo avalia:', options: ['Ligamento talofibular anterior', 'Ligamento deltoide', 'Tendão de Aquiles', 'Nada'], correctIdx: 0, explanation: 'Avalia a instabilidade após entorse lateral do tornozelo.' },
        { text: 'O teste de McMurray é usado para detetar:', options: ['Lesão meniscal', 'Rotura de ligamento', 'Fractura de patela', 'Bursite'], correctIdx: 0, explanation: 'A presença de um "clique" ou dor indica rotura meniscal.' },
        { text: 'O teste de "Y" avalia:', options: ['Equilíbrio dinâmico e controlo motor', 'Força de braços', 'Visão', 'Nada'], correctIdx: 0, explanation: 'É um teste funcional para estabilidade de membros inferiores.' }
      ],
      diagnosis: [
        { text: 'Uma rotura muscular de grau II envolve:', options: ['Dano parcial das fibras', 'Apenas estiramento', 'Rotura completa', 'Fratura óssea'], correctIdx: 0, explanation: 'O grau II é uma lesão parcial significativa com perda de função.' },
        { text: 'A "Tríade da Mulher Atleta" inclui:', options: ['Amenorreia, Osteoporose, Distúrbio Alimentar', 'Dor, Edema, Calor', 'Força, Velocidade, Agilidade', 'Nenhuma das anteriores'], correctIdx: 0, explanation: 'É uma síndrome grave que afeta a saúde e performance.' },
        { text: 'A tríade de O\'Donoghue envolve lesão de:', options: ['LCA, LCM e Menisco Medial', 'LCP, LCL e Menisco Lateral', 'Patela, Fémur e Tíbia', 'Nada'], correctIdx: 0, explanation: 'É uma lesão grave e comum em desportos de contacto.' },
        { text: 'A pubalgia é comum em jogadores de:', options: ['Futebol', 'Natação', 'Xadrez', 'Ténis de mesa'], correctIdx: 0, explanation: 'Os movimentos de remate e mudanças de direção causam stress na sínfise púbica.' },
        { text: 'O "cotovelo de tenista" é tecnicamente:', options: ['Epicondilalgia lateral', 'Epicondilalgia medial', 'Bursite olecraniana', 'Nada'], correctIdx: 0, explanation: 'Afeta os extensores do punho no epicôndilo lateral.' },
        { text: 'A síndrome da banda iliotibial causa dor na:', options: ['Face lateral do joelho', 'Face medial do joelho', 'Virilha', 'Nada'], correctIdx: 0, explanation: 'É comum em corredores por atrito da banda no epicôndilo lateral.' }
      ],
      treatment: [
        { text: 'O protocolo POLICE substituiu o RICE para incluir:', options: ['Optimal Loading (Carga Ideal)', 'Pain (Dor)', 'Ice (Gelo)', 'Nada'], correctIdx: 0, explanation: 'A carga precoce e controlada acelera a recuperação tecidual.' },
        { text: 'A crioterapia é mais eficaz nas primeiras:', options: ['48-72 horas', '1 semana', '2 semanas', '1 mês'], correctIdx: 0, explanation: 'O gelo é crucial na fase inflamatória aguda.' },
        { text: 'O retorno ao desporto (Return to Play) deve ser:', options: ['Progressivo e baseado em critérios funcionais', 'Imediato após a dor passar', 'Apenas após 1 ano', 'Nada'], correctIdx: 0, explanation: 'Garante que o atleta está apto e reduz o risco de nova lesão.' },
        { text: 'A massagem desportiva pré-evento visa:', options: ['Ativação muscular e circulatória', 'Relaxamento profundo', 'Causar dor', 'Nada'], correctIdx: 0, explanation: 'Prepara os tecidos para o esforço intenso.' },
        { text: 'O uso de Kinesio Taping pode ajudar em:', options: ['Proprioceção e suporte leve', 'Curar fraturas', 'Substituir cirurgias', 'Nada'], correctIdx: 0, explanation: 'Fornece feedback sensorial e suporte sem restringir o movimento.' },
        { text: 'A hidroterapia é excelente para atletas por:', options: ['Reduzir o impacto articular', 'Aumentar a gravidade', 'Secar a pele', 'Nada'], correctIdx: 0, explanation: 'Permite exercícios precoces com menor carga nas articulações.' }
      ],
      exercises: [
        { text: 'O treino pliométrico foca em:', options: ['Ciclo de alongamento-encurtamento', 'Força isométrica', 'Flexibilidade passiva', 'Resistência aeróbica'], correctIdx: 0, explanation: 'Pliometria desenvolve potência através de saltos e movimentos rápidos.' },
        { text: 'O treino de equilíbrio em superfícies instáveis visa:', options: ['Proprioceção', 'Aumentar a força máxima', 'Reduzir a agilidade', 'Causar lesões'], correctIdx: 0, explanation: 'Melhora a resposta neuromuscular para prevenir novas lesões.' },
        { text: 'Exercícios pliométricos focam em:', options: ['Ciclo de alongamento-encurtamento e potência', 'Flexibilidade passiva', 'Repouso', 'Nada'], correctIdx: 0, explanation: 'Melhoram a capacidade explosiva do atleta.' },
        { text: 'O fortalecimento excêntrico de isquiotibiais (Nordic Curls) previne:', options: ['Roturas musculares', 'Cefaleias', 'Gripe', 'Nada'], correctIdx: 0, explanation: 'É um dos exercícios mais estudados para prevenir lesões na corrida.' },
        { text: 'O treino de agilidade com escada (Agility Ladder) foca em:', options: ['Coordenação e rapidez de pés', 'Força máxima', 'Flexibilidade', 'Nada'], correctIdx: 0, explanation: 'Melhora a resposta neuromuscular em desportos de campo.' },
        { text: 'Exercícios de estabilização de core são vitais para:', options: ['Transferência de força entre membros', 'Aumentar a altura', 'Reduzir a visão', 'Nada'], correctIdx: 0, explanation: 'Um tronco estável permite movimentos mais eficientes dos braços e pernas.' }
      ]
    }
  },
  'Geriátrica': {
    complaints: [
      'Medo de cair e perda de mobilidade.', 
      'Dor articular generalizada por osteoartrose.', 
      'Dificuldade em levantar-se da cadeira.', 
      'Incontinência urinária de esforço.', 
      'Perda de força nas mãos.',
      'Tonturas ao levantar-se rapidamente.',
      'Dificuldade em subir e descer escadas.',
      'Rigidez matinal que demora a passar.',
      'Cansaço extremo após pequenas caminhadas.',
      'Dificuldade em vestir-se sozinho.'
    ],
    histories: [
      'Processo degenerativo natural associado ao envelhecimento.', 
      'História de quedas frequentes no domicílio.', 
      'Sedentarismo prolongado e sarcopenia.', 
      'Pós-hospitalização prolongada.', 
      'Isolamento social e declínio cognitivo leve.',
      'História de fratura de colo de fémur.',
      'Polifarmácia com efeitos secundários no equilíbrio.',
      'Osteoporose com risco de fratura aumentado.',
      'Diabetes tipo II com perda de sensibilidade nos pés.',
      'Artroplastia total do joelho há 5 anos.'
    ],
    symptoms: [
      ['Osteoartrose de joelho', 'Crepitação articular', 'Rigidez matinal'], 
      ['Sarcopenia', 'Diminuição de massa muscular', 'Marcha lenta'], 
      ['Instabilidade postural', 'Aumento da base de suporte', 'Oscilação excessiva'],
      ['Osteoporose', 'Cifose senil', 'Risco de fratura'],
      ['Défice cognitivo', 'Dificuldade em seguir comandos', 'Desorientação']
    ],
    evolutionTimes: [
      'Processo degenerativo de longa data', '6 meses', '1 ano', '2 anos', '5 anos',
      'Pós-queda há 15 dias', 'Recorrente há 10 anos', 'Progressivo há 3 meses',
      '1 mês após hospitalização', '10 meses'
    ],
    functionalLimitations: [
      'Dificuldade em realizar a marcha de forma independente.',
      'Incapacidade de levantar-se da cadeira sem apoio.',
      'Dificuldade em realizar higiene pessoal sozinho.',
      'Limitação na realização de tarefas domésticas leves.',
      'Medo de sair de casa desacompanhado.',
      'Dificuldade em entrar e sair da banheira.',
      'Limitação na amplitude de movimento por dor articular.',
      'Dificuldade em manipular objetos pequenos (ex: botões).',
      'Cansaço rápido ao realizar atividades de vida diária.',
      'Necessidade de adaptações no ambiente doméstico.'
    ],
    questions: {
      evaluation: [
        { text: 'O teste "Timed Up and Go" (TUG) avalia:', options: ['Mobilidade funcional e risco de queda', 'Força de braços', 'Visão periférica', 'Capacidade pulmonar'], correctIdx: 0, explanation: 'O TUG mede o tempo para levantar, caminhar 3m e voltar a sentar.' },
        { text: 'A escala de Berg é usada para avaliar:', options: ['Equilíbrio funcional', 'Força muscular', 'Flexibilidade', 'Memória'], correctIdx: 0, explanation: 'É uma das escalas mais validadas para equilíbrio em idosos.' },
        { text: 'O teste de "Sentar e Levantar" em 30 segundos avalia:', options: ['Força de membros inferiores', 'Resistência aeróbica', 'Flexibilidade de ombros', 'Nada'], correctIdx: 0, explanation: 'É um indicador direto de força funcional e risco de sarcopenia.' },
        { text: 'A avaliação da sarcopenia envolve:', options: ['Massa muscular, força e performance física', 'Apenas o peso', 'Apenas a altura', 'Nada'], correctIdx: 0, explanation: 'A sarcopenia é a perda de massa e função muscular com a idade.' },
        { text: 'O Mini-Mental State Examination (MMSE) avalia:', options: ['Função cognitiva', 'Força muscular', 'Equilíbrio', 'Visão'], correctIdx: 0, explanation: 'Rastreia défices cognitivos que podem afetar a reabilitação.' },
        { text: 'A escala visual analógica (EVA) é adaptada para idosos com:', options: ['Escala de faces ou numérica simples', 'Cores apenas', 'Sons', 'Nada'], correctIdx: 0, explanation: 'Facilita a comunicação da dor em pacientes com dificuldades cognitivas.' }
      ],
      diagnosis: [
        { text: 'A osteoartrose caracteriza-se por:', options: ['Degeneração da cartilagem articular', 'Infeção óssea', 'Inflamação sistémica', 'Nada'], correctIdx: 0, explanation: 'É a patologia articular mais comum no envelhecimento.' },
        { text: 'A fragilidade (frailty) no idoso envolve:', options: ['Perda de reserva fisiológica e vulnerabilidade', 'Apenas ossos partidos', 'Apenas surdez', 'Nada'], correctIdx: 0, explanation: 'É uma síndrome multissistémica que aumenta o risco de eventos adversos.' },
        { text: 'A osteoporose é diagnosticada principalmente por:', options: ['Densitometria óssea', 'Raio-X simples', 'Análise de sangue', 'Nada'], correctIdx: 0, explanation: 'Mede a densidade mineral óssea para avaliar o risco de fratura.' },
        { text: 'A incontinência urinária de esforço ocorre ao:', options: ['Tossir, rir ou fazer esforço', 'Dormir', 'Comer', 'Nada'], correctIdx: 0, explanation: 'A fraqueza do pavimento pélvico não suporta o aumento da pressão abdominal.' },
        { text: 'A demência de Alzheimer afeta inicialmente:', options: ['Memória recente e orientação', 'Força muscular', 'Visão', 'Nada'], correctIdx: 0, explanation: 'O declínio cognitivo precede as alterações motoras graves.' },
        { text: 'A hipotensão ortostática é:', options: ['Queda da tensão ao levantar', 'Aumento da tensão ao comer', 'Tensão baixa constante', 'Nada'], correctIdx: 0, explanation: 'Causa tonturas e é uma causa comum de quedas em idosos.' }
      ],
      treatment: [
        { text: 'O treino de força em idosos deve ser:', options: ['Progressivo e adaptado à tolerância', 'Evitado a todo o custo', 'Apenas com pesos leves', 'Nada'], correctIdx: 0, explanation: 'O fortalecimento é a melhor forma de combater a sarcopenia e fragilidade.' },
        { text: 'A adaptação do domicílio visa:', options: ['Prevenir quedas e aumentar a autonomia', 'Mudar a decoração', 'Aumentar o valor da casa', 'Nada'], correctIdx: 0, explanation: 'Remover tapetes e colocar barras de apoio são medidas vitais.' },
        { text: 'A hidrocinesioterapia é benéfica por:', options: ['Reduzir o impacto e facilitar o movimento', 'Aumentar a dor', 'Secar a pele', 'Nada'], correctIdx: 0, explanation: 'A flutuabilidade ajuda idosos com artrose a exercitarem-se com menos dor.' },
        { text: 'O uso de auxiliares de marcha (ex: andarilho) serve para:', options: ['Aumentar a base de suporte e segurança', 'Cansar mais o paciente', 'Reduzir a visão', 'Nada'], correctIdx: 0, explanation: 'Compensa o défice de equilíbrio e força.' },
        { text: 'A fisioterapia respiratória no idoso foca em:', options: ['Higiene brônquica e expansão pulmonar', 'Aumentar a força muscular', 'Reduzir o oxigénio', 'Nada'], correctIdx: 0, explanation: 'Previne infeções respiratórias, comuns nesta faixa etária.' },
        { text: 'A educação do cuidador é importante para:', options: ['Garantir a continuidade dos cuidados e segurança', 'Substituir o fisioterapeuta', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O cuidador deve saber como auxiliar nas transferências e exercícios.' }
      ],
      exercises: [
        { text: 'Exercícios de equilíbrio (ex: Tai Chi) reduzem:', options: ['O risco de quedas', 'A inteligência', 'O apetite', 'Nada'], correctIdx: 0, explanation: 'Melhoram o controlo postural e a confiança.' },
        { text: 'O fortalecimento do quadríceps é vital para:', options: ['Independência no levantar e caminhar', 'Melhorar a audição', 'Reduzir a visão', 'Nada'], correctIdx: 0, explanation: 'É o músculo chave para a mobilidade funcional.' },
        { text: 'Exercícios de Kegel são indicados para:', options: ['Fortalecimento do pavimento pélvico', 'Fortalecimento do pescoço', 'Melhorar a digestão', 'Nada'], correctIdx: 0, explanation: 'Ajudam no controlo da incontinência urinária.' },
        { text: 'Alongamentos suaves visam:', options: ['Manter a flexibilidade e prevenir rigidez', 'Causar roturas', 'Aumentar a força bruta', 'Nada'], correctIdx: 0, explanation: 'Melhoram a qualidade do movimento e reduzem dores musculares.' },
        { text: 'Caminhadas regulares promovem:', options: ['Saúde cardiovascular e densidade óssea', 'Perda de memória', 'Aumento da dor', 'Nada'], correctIdx: 0, explanation: 'É uma atividade acessível e altamente benéfica para o idoso.' },
        { text: 'Exercícios de coordenação motora fina ajudam em:', options: ['Atividades como abotoar e comer', 'Correr maratonas', 'Nadar', 'Nada'], correctIdx: 0, explanation: 'Mantêm a destreza necessária para a autonomia diária.' }
      ]
    }
  },
  'Pediátrica': {
    complaints: [
      'Atraso no desenvolvimento motor.', 
      'Alteração na forma de caminhar (marcha em pontas).', 
      'Torcicolo congénito.', 
      'Dificuldade em manter a cabeça erguida.', 
      'Assimetria no uso dos membros.',
      'Dificuldade em rolar ou gatinhar.',
      'Pés virados para dentro ao caminhar.',
      'Cansaço excessivo durante a brincadeira.',
      'Dificuldade em manipular objetos pequenos.',
      'Desvio na coluna detetado no rastreio escolar.'
    ],
    histories: [
      'Prematuridade com necessidade de estimulação precoce.', 
      'Paralisia Cerebral com espasticidade ligeira.', 
      'Disfunção sensorial e motora em idade escolar.', 
      'História de parto distócico.', 
      'Deteção de displasia da anca.',
      'Síndrome de Down com hipotonia marcada.',
      'Atraso global do desenvolvimento sem causa definida.',
      'Lesão do plexo braquial durante o parto.',
      'Doença neuromuscular (ex: Duchenne).',
      'Espina bífida operada ao nascimento.'
    ],
    symptoms: [
      ['Espasticidade', 'Reflexos primitivos persistentes', 'Atraso motor'], 
      ['Hipotonia', 'Hipermobilidade articular', 'Dificuldade de controlo'], 
      ['Plagiocefalia', 'Inclinação cervical', 'Limitação de rotação'],
      ['Marcha em pontas', 'Encurtamento de gémeos', 'Instabilidade'],
      ['Dismetria de membros', 'Claudicação', 'Assimetria pélvica']
    ],
    evolutionTimes: [
      'Desde o nascimento', 'Detetado há 1 mês', '3 meses', '6 meses', '1 ano',
      'Início ao começar a gatinhar', 'Detetado no rastreio escolar', '2 semanas',
      'Progressivo há 2 meses', '10 meses'
    ],
    functionalLimitations: [
      'Atraso na aquisição de marcos motores (sentar, gatinhar).',
      'Dificuldade em manter o equilíbrio sentado ou em pé.',
      'Incapacidade de realizar preensão voluntária.',
      'Dificuldade em interagir com brinquedos.',
      'Limitação na mobilidade global por hipertonia.',
      'Dificuldade em realizar a marcha sem apoio.',
      'Incapacidade de realizar transferências de forma independente.',
      'Dificuldade na alimentação por défices motores.',
      'Limitação na participação em atividades lúdicas com pares.',
      'Necessidade de apoio constante para posicionamento.'
    ],
    questions: {
      evaluation: [
        { text: 'A escala GMFCS avalia a função motora na:', options: ['Paralisia Cerebral', 'Síndrome de Down', 'Autismo', 'Espina Bífida'], correctIdx: 0, explanation: 'A GMFCS é o padrão para classificar a função motora na PC.' },
        { text: 'Os reflexos primitivos devem:', options: ['Integrar-se com o desenvolvimento', 'Permanecer para sempre', 'Nunca aparecer', 'Ser voluntários'], correctIdx: 0, explanation: 'A persistência de reflexos primitivos pode indicar atraso neurológico.' }
      ],
      diagnosis: [
        { text: 'O torcicolo congénito deve ser tratado com:', options: ['Posicionamento e alongamento suave', 'Imobilização rígida', 'Cirurgia imediata', 'Repouso absoluto'], correctIdx: 0, explanation: 'O tratamento conservador precoce é eficaz na maioria dos casos.' },
        { text: 'A hipotonia é característica da:', options: ['Síndrome de Down', 'Paralisia Cerebral Espástica', 'AVC isquémico', 'Tétano'], correctIdx: 0, explanation: 'A baixa tensão muscular é comum na trissomia 21.' }
      ],
      treatment: [
        { text: 'O tratamento pediátrico deve ser baseado em:', options: ['Lúdico e motivador', 'Repetição mecânica', 'Silêncio absoluto', 'Castigos e prémios'], correctIdx: 0, explanation: 'A criança aprende e colabora melhor através do brincar.' },
        { text: 'A equoterapia utiliza o cavalo para:', options: ['Estimulação motora e sensorial', 'Apenas diversão', 'Substituir a fisioterapia', 'Aumentar o medo'], correctIdx: 0, explanation: 'O movimento do cavalo simula a marcha humana e estimula o core.' }
      ],
      exercises: [
        { text: 'O treino de "Tummy Time" é essencial para:', options: ['Controlo cervical', 'Fortalecer as pernas', 'Melhorar a visão', 'Dormir melhor'], correctIdx: 0, explanation: 'Colocar o bebé de barriga para baixo estimula a extensão cervical e dorsal.' },
        { text: 'Exercícios de alcance manual visam:', options: ['Coordenação óculo-manual', 'Força de pernas', 'Equilíbrio sentado', 'Nenhuma das anteriores'], correctIdx: 0, explanation: 'Desenvolvem a função do membro superior e preensão.' }
      ]
    }
  },
  'Cardiorrespiratória': {
    complaints: [
      'Cansaço aos pequenos esforços (dispneia).', 
      'Tosse produtiva e dificuldade em expectorar.', 
      'Palpitações e dor torácica leve.', 
      'Dificuldade em respirar deitado.', 
      'Sensação de aperto no peito.',
      'Pieira ou sibilância ao respirar.',
      'Inchaço nas pernas e tornozelos.',
      'Cansaço extremo ao subir um lanço de escadas.',
      'Tosse seca persistente.',
      'Necessidade de usar várias almofadas para dormir.'
    ],
    histories: [
      'Doença Pulmonar Obstrutiva Crónica (DPOC).', 
      'Pós-operatório de cirurgia cardíaca.', 
      'Recuperação de infeção respiratória grave.', 
      'História de tabagismo pesado.', 
      'Insuficiência Cardíaca Congestiva.',
      'Asma brônquica desde a infância.',
      'Fibrose quística com exacerbações frequentes.',
      'Enfarte agudo do miocárdio há 6 meses.',
      'Bronquiectasias com hipersecreção.',
      'Pneumonia bilateral com internamento em UCI.'
    ],
    symptoms: [
      ['Dispneia', 'Uso de musculatura acessória', 'Sibilância'], 
      ['Tosse produtiva', 'Roncos à auscultação', 'Febre baixa'], 
      ['Edema periférico', 'Cansaço extremo', 'Taquicardia'],
      ['Diminuição de sons respiratórios', 'Cianose labial', 'Baqueteamento digital'],
      ['Hipertensão arterial', 'Arritmia', 'Intolerância ao decúbito']
    ],
    evolutionTimes: [
      'Início súbito há 48h', '1 semana', '2 semanas', '1 mês', '3 meses',
      '6 meses', '1 ano', 'Crónico há 5 anos', 'Progressivo há 2 meses', '10 dias'
    ],
    functionalLimitations: [
      'Dispneia aos pequenos esforços (ex: vestir-se).',
      'Incapacidade de subir um lanço de escadas.',
      'Dificuldade em realizar caminhadas curtas.',
      'Limitação na realização de AVDs por fadiga.',
      'Incapacidade de dormir em decúbito dorsal (plano).',
      'Dificuldade em falar frases completas sem interrupção.',
      'Necessidade de pausas frequentes durante a marcha.',
      'Limitação na prática de qualquer exercício físico.',
      'Dificuldade em realizar tarefas domésticas simples.',
      'Dependência de oxigénio suplementar para esforço.'
    ],
    questions: {
      evaluation: [
        { text: 'Qual teste avalia a capacidade funcional?', options: ['Teste de Caminhada de 6 Minutos', 'Espirometria', 'Gasometria', 'Raio-X'], correctIdx: 0, explanation: 'O TC6M avalia a tolerância ao exercício e funcionalidade.' },
        { text: 'A auscultação pulmonar com "crepitações" sugere:', options: ['Presença de líquido/secreções', 'Vias aéreas limpas', 'Asma', 'Pneumotórax'], correctIdx: 0, explanation: 'Crepitações indicam abertura de alvéolos colapsados ou presença de fluido.' }
      ],
      diagnosis: [
        { text: 'A espirometria mede:', options: ['Volumes e fluxos pulmonares', 'Oxigenação do sangue', 'Força do coração', 'Pressão arterial'], correctIdx: 0, explanation: 'É o teste padrão para diagnosticar doenças obstrutivas e restritivas.' },
        { text: 'A saturação de oxigénio normal é acima de:', options: ['95%', '80%', '70%', '50%'], correctIdx: 0, explanation: 'Valores abaixo de 95% podem indicar hipoxemia.' }
      ],
      treatment: [
        { text: 'A técnica de "Pursed-lip" ajuda a:', options: ['Prevenir colapso das vias aéreas', 'Aumentar a frequência respiratória', 'Reduzir a oxigenação', 'Aumentar o volume residual'], correctIdx: 0, explanation: 'Lábios franzidos mantêm a pressão positiva nas vias aéreas.' },
        { text: 'A drenagem postural utiliza:', options: ['Gravidade para mover secreções', 'Apenas massagem', 'Exercícios de força', 'Água quente'], correctIdx: 0, explanation: 'Posiciona o paciente para que a gravidade auxilie na limpeza brônquica.' }
      ],
      exercises: [
        { text: 'O treino aeróbico na reabilitação cardíaca deve ser:', options: ['Monitorizado e progressivo', 'Sempre em alta intensidade', 'Evitado', 'Apenas caminhada lenta'], correctIdx: 0, explanation: 'A monitorização da FC e TA é vital para a segurança.' },
        { text: 'Exercícios de expansão costal visam:', options: ['Aumentar o volume inspiratório', 'Reduzir a tosse', 'Fortalecer as pernas', 'Melhorar a digestão'], correctIdx: 0, explanation: 'Melhoram a ventilação em áreas menos expandidas do pulmão.' }
      ]
    }
  },
  'Traumato-Ortopédica': {
    complaints: [
      'Dor intensa após fratura consolidada.', 
      'Limitação articular pós-imobilização.', 
      'Edema persistente em articulação.', 
      'Deformidade óssea residual.', 
      'Instabilidade articular pós-trauma.',
      'Dor ao apoio do membro inferior.',
      'Fraqueza muscular por desuso.',
      'Sensação de "areia" na articulação.',
      'Dificuldade em realizar movimentos de torção.',
      'Cicatriz dolorosa e aderente.'
    ],
    histories: [
      'Fratura de rádio distal após queda.', 
      'Luxação recidivante do ombro.', 
      'Lesão ligamentar complexa com indicação conservadora.', 
      'Acidente de viação com múltiplas fraturas.', 
      'Queda de altura com impacto nos membros inferiores.',
      'Entorse grave do joelho com suspeita de rotura.',
      'Fratura da diáfise do fémur operada.',
      'Lesão por esmagamento em contexto laboral.',
      'Queda de bicicleta com fratura da clavícula.',
      'História de pseudoartrose (falha na consolidação).'
    ],
    symptoms: [
      ['Rigidez pós-gesso', 'Atrofia muscular', 'Dor à mobilização'], 
      ['Instabilidade articular', 'Apprehension test positivo', 'Fraqueza'], 
      ['Pseudoartrose', 'Dor persistente', 'Calo ósseo exuberante'],
      ['Edema articular', 'Calor local', 'Limitação funcional'],
      ['Crepitação óssea', 'Deformidade visível', 'Equimose']
    ],
    evolutionTimes: [
      '2 dias (agudo)', '1 semana', '3 semanas', '1 mês', '2 meses',
      '6 meses (crónico)', '1 ano', 'Pós-trauma há 48h', 'Progressivo há 3 meses', '10 dias'
    ],
    functionalLimitations: [
      'Dificuldade em realizar apoio de peso no membro inferior.',
      'Incapacidade de realizar preensão manual (segurar objetos).',
      'Dificuldade em realizar a higiene pessoal.',
      'Limitação na amplitude de movimento articular.',
      'Dor intensa ao realizar movimentos de torção.',
      'Dificuldade em subir e descer escadas.',
      'Incapacidade de realizar atividades de vida diária (AVDs).',
      'Limitação na prática de atividades físicas habituais.',
      'Necessidade de uso de auxiliares de marcha (canhotas).',
      'Dificuldade em realizar movimentos finos (escrever).'
    ],
    questions: {
      evaluation: [
        { text: 'A consolidação óssea primária ocorre com:', options: ['Estabilidade absoluta (cirurgia)', 'Estabilidade relativa (gesso)', 'Movimentação precoce', 'Tração esquelética'], correctIdx: 0, explanation: 'A estabilidade absoluta permite a consolidação sem formação de calo.' },
        { text: 'O sinal de "tecla de piano" indica lesão na:', options: ['Articulação acromioclavicular', 'Anca', 'Joelho', 'Tornozelo'], correctIdx: 0, explanation: 'É típico de luxação acromioclavicular por rotura ligamentar.' },
        { text: 'O teste de gaveta anterior no joelho avalia:', options: ['Ligamento Cruzado Anterior (LCA)', 'Menisco', 'Ligamento Colateral', 'Nada'], correctIdx: 0, explanation: 'Avalia a translação anterior da tíbia em relação ao fémur.' },
        { text: 'A goniometria serve para medir:', options: ['Amplitude de movimento articular', 'Força muscular', 'Equilíbrio', 'Nada'], correctIdx: 0, explanation: 'Quantifica os graus de movimento de uma articulação.' },
        { text: 'O teste de Phalen é usado para avaliar:', options: ['Síndrome do Túnel do Carpo', 'Epicondilite', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A flexão forçada do punho reproduz sintomas de com pressão do nervo mediano.' }
      ],
      diagnosis: [
        { text: 'Qual a complicação comum de imobilização prolongada?', options: ['Rigidez articular', 'Aumento de força', 'Melhoria de proprioceção', 'Hipertrofia muscular'], correctIdx: 0, explanation: 'A imobilização leva à retração capsular e rigidez.' },
        { text: 'A síndrome compartimental é uma:', options: ['Emergência médica', 'Situação normal', 'Lesão leve', 'Doença crónica'], correctIdx: 0, explanation: 'O aumento da pressão no compartimento muscular pode causar necrose.' },
        { text: 'Uma fratura exposta tem elevado risco de:', options: ['Osteomielite (infeção óssea)', 'Cura rápida', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O contacto do osso com o meio externo facilita a entrada de bactérias.' },
        { text: 'A atrofia de Sudeck (DSR) caracteriza-se por:', options: ['Dor desproporcional e alterações vasomotoras', 'Aumento de força', 'Nada', 'Nada'], correctIdx: 0, explanation: 'É uma síndrome de dor regional complexa pós-trauma.' },
        { text: 'A miosite ossificante é:', options: ['Formação de osso dentro do músculo', 'Inflamação simples', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ocorre frequentemente após trauma muscular direto e hematoma.' }
      ],
      treatment: [
        { text: 'A carga precoce após fratura operada:', options: ['Depende da estabilidade da fixação', 'É sempre proibida', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Se a síntese for estável, a carga estimula a consolidação.' },
        { text: 'A hidroterapia é benéfica por:', options: ['Reduzir o impacto articular (flutuação)', 'Ser mais difícil', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Permite movimentos com menos dor e carga.' },
        { text: 'O uso de TENS na fase aguda visa:', options: ['Controlo da dor (analgesia)', 'Aumentar a força', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Atua através da teoria das comportas ou libertação de endorfinas.' },
        { text: 'A mecanoterapia utiliza:', options: ['Aparelhos e pesos para fortalecimento', 'Apenas as mãos', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Usa a resistência mecânica para melhorar a função muscular.' },
        { text: 'O treino de marcha com canadianas deve:', options: ['Garantir a segurança e o padrão correto', 'Ser feito sem apoio', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Evita compensações e quedas durante a recuperação.' }
      ],
      exercises: [
        { text: 'Exercícios isométricos são indicados quando:', options: ['O movimento articular está contraindicado', 'Queremos máxima potência', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Mantêm o tónus sem stressar a articulação.' },
        { text: 'O treino de proprioceção ajuda a:', options: ['Prevenir novas lesões e melhorar o equilíbrio', 'Aumentar a massa muscular', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Melhora a percepção da posição articular no espaço.' },
        { text: 'Exercícios de cadeia cinética fechada (CCF):', options: ['Têm maior co-contração e estabilidade', 'São isolados', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ex: Agachamento, onde a extremidade distal está fixa.' },
        { text: 'O alongamento muscular visa:', options: ['Recuperar a flexibilidade e prevenir encurtamentos', 'Aumentar a força', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Essencial após períodos de imobilização.' },
        { text: 'A progressão dos exercícios deve ser:', options: ['Gradual e baseada na tolerância à dor', 'Sempre máxima', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Respeita a biologia da cicatrização dos tecidos.' }
      ]
    }
  },
  'Pós-Cirúrgica': {
    complaints: [
      'Dor na cicatriz e aderências teciduais.', 
      'Fraqueza muscular extrema após cirurgia.', 
      'Inchaço e calor local.', 
      'Dificuldade em realizar movimentos básicos.', 
      'Medo de romper a sutura.',
      'Derrame articular persistente.',
      'Limitação da amplitude de movimento.',
      'Parestesia em redor da incisão.',
      'Dificuldade em realizar a higiene pessoal.',
      'Instabilidade ao caminhar com auxiliares.'
    ],
    histories: [
      'Artroplastia total da anca (prótese).', 
      'Reconstrução do Ligamento Cruzado Anterior (LCA).', 
      'Herniorrafia discal recente.', 
      'Meniscectomia parcial por artroscopia.', 
      'Osteossíntese de fémur com cavilha.',
      'Artroplastia total do joelho.',
      'Reparação da baixa rotadora do ombro.',
      'Sutura de tendão de Aquiles.',
      'Laminectomia descompressiva.',
      'Osteotomia de correção de valgo.'
    ],
    symptoms: [
      ['Edema pós-operatório', 'Cicatriz hipomóvel', 'Dor controlada'], 
      ['Inibição muscular quadríceps', 'Derrame articular', 'Limitação flexão'], 
      ['Parestesia residual', 'Fraqueza', 'Dor lombar'],
      ['Sinais inflamatórios', 'Limitação de ADM', 'Atrofia'],
      ['Aderência cicatricial', 'Hipersensibilidade', 'Tensão']
    ],
    evolutionTimes: [
      '24 horas pós-op', '3 dias', '1 semana', '2 semanas', '1 mês',
      '3 meses', '6 meses', '1 ano', '10 dias', '5 dias'
    ],
    functionalLimitations: [
      'Dificuldade em realizar movimentos na articulação operada.',
      'Incapacidade de realizar carga total no membro inferior.',
      'Dificuldade em realizar transferências (cama-cadeira).',
      'Limitação na realização de AVDs por dor pós-operatória.',
      'Dificuldade em realizar a higiene da ferida cirúrgica.',
      'Incapacidade de conduzir veículos por tempo indeterminado.',
      'Dificuldade em subir e descer escadas.',
      'Limitação na amplitude de movimento por edema.',
      'Necessidade de supervisão para deambulação segura.',
      'Dificuldade em realizar preensão por inibição muscular.'
    ],
    questions: {
      evaluation: [
        { text: 'A mobilização precoce pós-cirurgia visa:', options: ['Prevenir TVP e aderências', 'Aumentar a dor', 'Romper a sutura', 'Reduzir a força'], correctIdx: 0, explanation: 'Mover cedo previne trombose e rigidez tecidual.' },
        { text: 'O sinal de Homans avalia:', options: ['Trombose Venosa Profunda', 'Força de quadríceps', 'Flexão da anca', 'Sensibilidade'], correctIdx: 0, explanation: 'Dor na gemada à dorsiflexão passiva pode indicar TVP.' }
      ],
      diagnosis: [
        { text: 'A inibição muscular artrogénica é comum no:', options: ['Joelho pós-cirúrgico', 'Ombro traumático', 'Punho fraturado', 'Tornozelo entorsado'], correctIdx: 0, explanation: 'O derrame articular inibe a contração do quadríceps.' },
        { text: 'Uma cicatriz "quelóide" é:', options: ['Crescimento excessivo de tecido', 'Uma cicatriz normal', 'Uma ferida aberta', 'Infeção'], correctIdx: 0, explanation: 'É uma resposta exagerada de cicatrização.' }
      ],
      treatment: [
        { text: 'A massagem cicatricial serve para:', options: ['Prevenir aderências', 'Aumentar a dor', 'Abrir os pontos', 'Mudar a cor da pele'], correctIdx: 0, explanation: 'Mantém a mobilidade dos planos teciduais.' },
        { text: 'O uso de CPM (Movimento Passivo Contínuo) ajuda no:', options: ['Ganho de ADM sem esforço', 'Fortalecimento', 'Equilíbrio', 'Emagrecimento'], correctIdx: 0, explanation: 'Máquina que move a articulação de forma lenta e constante.' }
      ],
      exercises: [
        { text: 'Exercícios de "bombagem" de tornozelo visam:', options: ['Retorno venoso', 'Força de braços', 'Alongar o pescoço', 'Melhorar a audição'], correctIdx: 0, explanation: 'Auxiliam na prevenção de TVP e redução de edema.' },
        { text: 'O treino de transferência (cama-cadeira) é vital para:', options: ['Autonomia precoce', 'Cansar o paciente', 'Aumentar a dor', 'Nenhuma das anteriores'], correctIdx: 0, explanation: 'Garante a segurança e independência funcional básica.' }
      ]
    }
  },
  'Radiologia Oral': {
    complaints: [
      'Preciso de exames para o dentista.', 'Sinto algo duro na gengiva.', 'Dente não nasce.',
      'Desejo fazer um implante.', 'Dor persistente após extração.', 'Inchaço na mandíbula.',
      'Dentes a mudar de posição.', 'Check-up de rotina.', 'Dificuldade em abrir a boca.',
      'Ferida que não cicatriza.'
    ],
    histories: [
      'Check-up anual.', 'Planeamento cirúrgico.', 'Dúvida diagnóstica.',
      'História de trauma facial.', 'Tratamento ortodôntico prévio.', 'Fumador de longa data.',
      'Uso de bifosfonatos.', 'Radioterapia prévia em cabeça e pescoço.', 'História familiar de quistos.',
      'Avaliação de dentes do siso.'
    ],
    symptoms: [
      ['Imagem radiolúcida', 'Imagem radiopaca', 'Halo esclerótico'], 
      ['Reabsorção radicular', 'Dente impactado', 'Dilaceração radicular'],
      ['Expansão de corticais', 'Desvio de canal mandibular', 'Reabsorção óssea'],
      ['Cálculo salivar', 'Agenesia dentária', 'Dente supranumerário'],
      ['Espessamento do ligamento periodontal', 'Perda de lâmina dura']
    ],
    evolutionTimes: ['Semanas', 'Meses', 'Anos', 'Dias', 'Descoberta ocasional'],
    functionalLimitations: [
      'Necessidade de diagnóstico preciso.', 'Risco de lesões ocultas.',
      'Dificuldade no planeamento de implantes.', 'Incerteza sobre a posição de dentes inclusos.',
      'Limitação na avaliação de patologias ósseas.', 'Necessidade de guiar biópsia.'
    ],
    questions: {
      evaluation: [
        { text: 'O avental de chumbo serve para:', options: ['Proteção radiológica', 'Ficar bonito', 'Nada', 'Aquecer'], correctIdx: 0, explanation: 'Protege órgãos sensíveis da radiação.' },
        { text: 'A radiografia panorâmica é ideal para:', options: ['Visão geral dos maxilares', 'Ver cáries pequenas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Permite ver dentes, ossos e seios maxilares numa só imagem.' },
        { text: 'O sensor digital em vez de filme:', options: ['Reduz a dose de radiação', 'Aumenta a radiação', 'Nada', 'Nada'], correctIdx: 0, explanation: 'É mais sensível, exigindo menos exposição.' },
        { text: 'A técnica periapical serve para:', options: ['Ver o dente e o osso circundante', 'Ver apenas a coroa', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Mostra o dente desde a coroa até à raiz e osso periapical.' },
        { text: 'O erro de "alongamento" na imagem deve-se a:', options: ['Ângulo vertical incorreto', 'Paciente mexeu-se', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ocorre quando o feixe de raios-X é muito horizontal.' }
      ],
      diagnosis: [
        { text: 'Uma mancha preta no raio-X pode ser:', options: ['Cárie ou infeção', 'Osso denso', 'Nada', 'Sujidade'], correctIdx: 0, explanation: 'Zonas menos densas aparecem escuras (radiolúcidas).' },
        { text: 'Um dente "impactado" é aquele que:', options: ['Não nasceu por falta de espaço ou barreira', 'Nasceu torto', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Fica retido dentro do osso ou gengiva.' },
        { text: 'A reabsorção radicular externa pode indicar:', options: ['Inflamação ou trauma', 'Dente saudável', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ocorre perda de tecido radicular por atividade clástica.' },
        { text: 'Um odontoma é considerado:', options: ['Um tumor benigno (hamartoma)', 'Um cancro maligno', 'Nada', 'Nada'], correctIdx: 0, explanation: 'É uma malformação de tecidos dentários.' },
        { text: 'O canal mandibular contém o:', options: ['Nervo alveolar inferior', 'Nervo ótico', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Estrutura vital a evitar em cirurgias de implantes.' }
      ],
      treatment: [
        { text: 'A Tomografia Computadorizada (CBCT) é usada para:', options: ['Planeamento 3D de implantes', 'Ver cáries simples', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Permite avaliar volume e densidade óssea com precisão.' },
        { text: 'O raio-X digital tem como vantagem ecológica:', options: ['Não usar químicos de revelação', 'Gastar menos papel', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Elimina o uso de líquidos tóxicos e chumbo dos filmes.' },
        { text: 'A telerradiografia lateral é essencial na:', options: ['Ortodontia', 'Endodontia', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Usada para traçados cefalométricos e estudo do perfil.' },
        { text: 'Radiografias interproximais (bitewing) detetam:', options: ['Cáries entre os dentes', 'Infeções na raiz', 'Nada', 'Nada'], correctIdx: 0, explanation: 'São ideais para visualizar as faces de contacto dos dentes.' },
        { text: 'O uso de posicionadores serve para:', options: ['Padronizar a imagem e evitar erros', 'Segurar o paciente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Garante o paralelismo entre o filme e o dente.' }
      ],
      exercises: [
        { text: 'Ficar imóvel durante o exame:', options: ['Evita imagens tremidas', 'É opcional', 'Nada', 'Dói'], correctIdx: 0, explanation: 'Garante a nitidez do diagnóstico.' },
        { text: 'Remover objetos metálicos (brincos, piercings):', options: ['Evita artefactos na imagem', 'É por estética', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O metal bloqueia os raios-X e causa sombras fantasmas.' },
        { text: 'A língua no céu da boca na panorâmica:', options: ['Melhora a visão das raízes superiores', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Evita a sobreposição de ar sobre os dentes superiores.' },
        { text: 'O uso de protetor de tiroide é:', options: ['Recomendado em exames intraorais', 'Proibido', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Protege a glândula tiroide da radiação dispersa.' },
        { text: 'A calibração do equipamento deve ser:', options: ['Periódica por técnicos qualificados', 'Nunca feita', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Garante a segurança e a qualidade da imagem.' }
      ]
    }
  },
  'Disfunção Temporomandibular': {
    complaints: [
      'Estalidos ao abrir a boca.', 'Dor de ouvido.', 'Dificuldade em bocejar.',
      'Mandíbula "presa" ao acordar.', 'Dor de cabeça nas têmporas.', 'Zumbido no ouvido.',
      'Dificuldade em mastigar alimentos duros.', 'Sensação de cansaço no rosto.',
      'Dentes sensíveis sem cárie.', 'Desvio da mandíbula ao abrir.'
    ],
    histories: [
      'Stress e ansiedade.', 'Bruxismo (ranger dentes).', 'Trauma na mandíbula.',
      'Tratamento ortodôntico longo.', 'Hábitos parafuncionais (roer unhas).',
      'Artrite reumatoide.', 'Depressão e distúrbios do sono.', 'História de luxação da ATM.',
      'Uso de próteses mal adaptadas.', 'Postura cervical inadequada.'
    ],
    symptoms: [
      ['Ruídos articulares', 'Desvio na abertura', 'Estalidos'], 
      ['Dor muscular facial', 'Trismo', 'Mialgia'],
      ['Cefaleia tensional', 'Otalgia referida', 'Zumbido'],
      ['Limitação da abertura bucal', 'Bloqueio articular'],
      ['Desgaste dentário', 'Hipertrofia do masseter']
    ],
    evolutionTimes: ['Meses', 'Anos', 'Semanas', 'Agudo (dias)', 'Recorrente'],
    functionalLimitations: [
      'Dificuldade em comer alimentos duros.', 'Cefaleias tensionais.',
      'Dificuldade na fala prolongada.', 'Interrupção do sono pela dor.',
      'Limitação na abertura bucal para higiene ou tratamentos.',
      'Impacto na qualidade de vida e bem-estar emocional.'
    ],
    questions: {
      evaluation: [
        { text: 'A palpação muscular avalia:', options: ['Pontos de dor e tensão', 'Força muscular', 'Nada', 'Cor'], correctIdx: 0, explanation: 'Identifica áreas de mialgia ou pontos-gatilho.' },
        { text: 'A abertura bucal normal em adultos é de:', options: ['40 a 50 mm', '10 a 20 mm', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Valores abaixo de 35-40 mm sugerem limitação.' },
        { text: 'O ruído tipo "crepitação" sugere:', options: ['Alterações degenerativas (artrose)', 'Deslocamento de disco', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Som de "areia" indica atrito entre superfícies ósseas.' },
        { text: 'O questionário RDC/TMD serve para:', options: ['Diagnóstico padronizado de DTM', 'Ver cáries', 'Nada', 'Nada'], correctIdx: 0, explanation: 'É o padrão ouro para investigação clínica e psicológica.' },
        { text: 'A palpação da ATM deve ser feita:', options: ['Com a boca aberta e fechada', 'Apenas fechada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Avalia o movimento do côndilo e presença de dor.' }
      ],
      diagnosis: [
        { text: 'O bruxismo do sono é considerado:', options: ['Um distúrbio do movimento relacionado ao sono', 'Uma doença dentária', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Tem origem no sistema nervoso central.' },
        { text: 'O deslocamento do disco com redução causa:', options: ['Estalido (click)', 'Bloqueio total', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O disco volta à posição correta durante a abertura.' },
        { text: 'A dor miofascial refere-se a:', options: ['Dor nos músculos da mastigação', 'Dor no osso', 'Nada', 'Nada'], correctIdx: 0, explanation: 'É a causa mais comum de dor orofacial não dentária.' },
        { text: 'O trismo é definido como:', options: ['Limitação da abertura bucal', 'Excesso de saliva', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Pode ser causado por espasmo muscular ou inflamação.' },
        { text: 'A cefaleia atribuída à DTM localiza-se na:', options: ['Região temporal ou masseterina', 'Nuca apenas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Frequentemente confundida com enxaqueca.' }
      ],
      treatment: [
        { text: 'A goteira oclusal serve para:', options: ['Proteger dentes e relaxar músculos', 'Limpar dentes', 'Nada', 'Extrair'], correctIdx: 0, explanation: 'Distribui forças e reduz a carga na articulação.' },
        { text: 'A fisioterapia na DTM foca em:', options: ['Exercícios, calor e relaxamento', 'Apenas massagem', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ajuda a restaurar a função e reduzir a dor muscular.' },
        { text: 'O uso de calor húmido ajuda a:', options: ['Promover o relaxamento muscular', 'Contrair o músculo', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Aumenta a circulação e alivia a tensão.' },
        { text: 'A toxina botulínica pode ser usada para:', options: ['Reduzir a força de contração muscular', 'Curar a DTM', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Indicada em casos graves de hiperatividade muscular.' },
        { text: 'A educação do paciente foca em:', options: ['Evitar hábitos parafuncionais', 'Comer alimentos duros', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O autocuidado é a base do tratamento conservador.' }
      ],
      exercises: [
        { text: 'Exercícios de relaxamento ajudam a:', options: ['Reduzir a tensão muscular', 'Aumentar a dor', 'Nada', 'Dormir'], correctIdx: 0, explanation: 'Diminuem a atividade muscular excessiva.' },
        { text: 'A postura da língua em repouso deve ser:', options: ['No céu da boca, sem tocar nos dentes', 'Entre os dentes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Promove o relaxamento da mandíbula.' },
        { text: 'Exercícios de abertura controlada visam:', options: ['Melhorar a coordenação do movimento', 'Forçar a abertura', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Evitam desvios e estalidos.' },
        { text: 'Evitar mascar pastilha elástica ajuda a:', options: ['Reduzir a fadiga muscular', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Pastilha é um hábito parafuncional que sobrecarrega a ATM.' },
        { text: 'A correção da postura cervical pode:', options: ['Melhorar a função da mandíbula', 'Piorar a dor', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Existe uma forte relação funcional entre pescoço e ATM.' }
      ]
    }
  },
  'Odontogeriatria': {
    complaints: [
      'Boca muito seca.', 'Dificuldade em usar a prótese.', 'Dentes a abanar.',
      'Dor ao comer.', 'Feridas debaixo da dentadura.', 'Dificuldade em higienizar.',
      'Mau hálito persistente.', 'Alteração no paladar.', 'Dentes muito escuros.',
      'Perda de peso por dificuldade mastigatória.'
    ],
    histories: [
      'Uso de múltiplos medicamentos.', 'Doenças sistémicas crónicas (Diabetes, HTA).',
      'Dificuldade motora (Artrite, Parkinson).', 'História de cancro oral na família.',
      'Uso de próteses há mais de 10 anos.', 'Declínio cognitivo leve.',
      'Falta de autonomia para higiene.', 'Solidão e depressão.',
      'Osteoporose e uso de bisfosfonatos.', 'História de tabagismo.'
    ],
    symptoms: [
      ['Xerostomia', 'Raízes expostas', 'Atrofia da mucosa'], 
      ['Cárie radicular', 'Mobilidade dentária', 'Periodontite'],
      ['Estomatite protética', 'Queilite angular', 'Candidíase'],
      ['Língua despapilada', 'Petéquias', 'Lesões ulceradas'],
      ['Edentulismo parcial ou total', 'Reabsorção do rebordo']
    ],
    evolutionTimes: ['Anos', 'Meses', 'Semanas', 'Progressivo', 'Súbito'],
    functionalLimitations: [
      'Dificuldade em engolir (disfagia).', 'Desnutrição por má mastigação.',
      'Dificuldade na fala e socialização.', 'Dor crónica orofacial.',
      'Incapacidade de realizar higiene oral adequada.',
      'Baixa autoestima pela estética dentária.'
    ],
    questions: {
      evaluation: [
        { text: 'O fluxo salivar é importante para:', options: ['Proteção e lubrificação', 'Nada', 'Sabor apenas', 'Falar'], correctIdx: 0, explanation: 'A saliva previne cáries e ajuda na deglutição.' },
        { text: 'A avaliação da mucosa oral no idoso visa:', options: ['Rastreio de cancro oral', 'Ver a cor dos dentes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A incidência de lesões malignas aumenta com a idade.' },
        { text: 'Próteses antigas e desadaptadas causam:', options: ['Reabsorção óssea e lesões', 'Melhor mastigação', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O trauma constante acelera a perda de osso.' },
        { text: 'A higiene das próteses deve ser feita com:', options: ['Escova macia e sabão neutro', 'Pasta de dentes abrasiva', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A pasta de dentes pode riscar o acrílico da prótese.' },
        { text: 'O teste de mastigação avalia a:', options: ['Eficiência funcional', 'Cor dos dentes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Verifica se o paciente consegue processar alimentos.' }
      ],
      diagnosis: [
        { text: 'A xerostomia é frequentemente:', options: ['Efeito secundário de fármacos', 'Normal da idade', 'Nada', 'Fungo'], correctIdx: 0, explanation: 'Muitos medicamentos reduzem a produção salivar.' },
        { text: 'A cárie radicular é comum em idosos devido a:', options: ['Recessão gengival e exposição da raiz', 'Comer muitos doces', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O cemento da raiz é menos resistente que o esmalte.' },
        { text: 'A candidíase oral (sapinho) associa-se a:', options: ['Baixa imunidade ou uso de prótese', 'Falta de sol', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O fungo Candida albicans aproveita a debilidade do hospedeiro.' },
        { text: 'A periodontite no idoso pode agravar:', options: ['Diabetes e doenças cardíacas', 'A visão', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Existe uma relação bidirecional entre inflamação oral e sistémica.' },
        { text: 'A queilite angular (ferida no canto da boca) sugere:', options: ['Perda de dimensão vertical ou fungos', 'Gripe', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Comum em portadores de próteses desgastadas.' }
      ],
      treatment: [
        { text: 'Substitutos salivares ajudam no:', options: ['Conforto e proteção', 'Crescer dentes', 'Nada', 'Dormir'], correctIdx: 0, explanation: 'Aliviam a sensação de boca seca.' },
        { text: 'O rebasamento da prótese serve para:', options: ['Adaptar a prótese ao rebordo atual', 'Mudar a cor', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Melhora a retenção e estabilidade.' },
        { text: 'O uso de flúor tópico é indicado para:', options: ['Prevenir cáries radiculares', 'Branquear dentes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Remineraliza o cemento e dentina expostos.' },
        { text: 'A remoção da prótese para dormir é:', options: ['Essencial para o descanso dos tecidos', 'Opcional', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Evita infeções fúngicas e inflamação da mucosa.' },
        { text: 'A adaptação da escova (cabo engrossado) ajuda:', options: ['Idosos com limitações motoras', 'Apenas crianças', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Facilita a preensão e eficácia da escovagem.' }
      ],
      exercises: [
        { text: 'Visitas frequentes ao dentista:', options: ['Previnem complicações graves', 'São opcionais', 'Nada', 'Dói'], correctIdx: 0, explanation: 'Permitem intervir precocemente em idosos.' },
        { text: 'Beber água frequentemente ajuda a:', options: ['Aliviar a secura da boca', 'Limpar os rins apenas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Mantém a mucosa hidratada.' },
        { text: 'Exercícios de fonoaudiologia podem ajudar na:', options: ['Deglutição e fala', 'Força das pernas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Melhoram a função muscular orofacial.' },
        { text: 'A automassagem das glândulas salivares:', options: ['Pode estimular a produção de saliva', 'É perigosa', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ajuda no esvaziamento glandular.' },
        { text: 'O uso de fio dental ou escovilhão:', options: ['Deve ser mantido enquanto houver dentes', 'É inútil no idoso', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A higiene interproximal é vital para evitar perdas dentárias.' }
      ]
    }
  },
  'Cuidados Intensivos': {
    complaints: [
      'Instabilidade hemodinâmica.', 'Dificuldade na ventilação mecânica.', 'Alteração do estado de consciência.',
      'Sepsis grave.', 'Insuficiência renal aguda.', 'Pós-operatório complexo.',
      'Traumatismo cranioencefálico grave.', 'Choque anafilático.', 'Paragem cardiorrespiratória revertida.',
      'Insuficiência respiratória aguda.'
    ],
    histories: [
      'Pós-operatório de cirurgia cardíaca.', 'Choque sético.', 'Politraumatismo.',
      'Doença pulmonar obstrutiva crónica (DPOC) agudizada.', 'Enfarte agudo do miocárdio.',
      'Acidente vascular cerebral (AVC) hemorrágico.', 'Pancreatite aguda grave.',
      'Queimaduras de 3º grau extensas.', 'Intoxicação medicamentosa grave.',
      'História de múltiplas comorbilidades.'
    ],
    symptoms: [
      ['Hipotensão', 'Taquipneia', 'Taquicardia'], 
      ['Oligúria', 'Dessaturação', 'Cianose'],
      ['Acidose metabólica', 'Hiperlactatemia', 'Anúria'],
      ['Agitação psicomotora', 'Coma', 'Pupilas não reativas'],
      ['Febre alta', 'Leucocitose', 'Plaquetopenia']
    ],
    evolutionTimes: ['Horas', 'Dias', 'Minutos', 'Súbito', 'Crítico'],
    functionalLimitations: [
      'Dependência total de cuidados.', 'Risco elevado de complicações multiorgânicas.',
      'Incapacidade de comunicação verbal (sedação/entubação).',
      'Imobilidade prolongada no leito.', 'Risco de infeções nosocomiais.',
      'Necessidade de suporte vital avançado.'
    ],
    questions: {
      evaluation: [
        { text: 'O balanço hídrico rigoroso serve para:', options: ['Avaliar função renal e volúmia', 'Ver a fome', 'Nada', 'Dormir'], correctIdx: 0, explanation: 'Monitoriza a entrada e saída de líquidos para evitar sobrecarga ou desidratação.' },
        { text: 'A escala de Richmond (RASS) avalia:', options: ['Nível de agitação e sedação', 'Dor apenas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Fundamental para ajustar a sedação no doente crítico.' },
        { text: 'A monitorização da Pressão Venosa Central (PVC) indica:', options: ['Status de volume e pré-carga', 'Pressão arterial', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ajuda a guiar a reposição de fluidos.' },
        { text: 'O débito urinário mínimo esperado é de:', options: ['0.5 ml/kg/hora', '2 ml/kg/hora', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Valores abaixo indicam risco de lesão renal aguda.' },
        { text: 'A gasometria arterial avalia:', options: ['Equilíbrio ácido-base e oxigenação', 'Apenas o açúcar', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Essencial para ajustar parâmetros ventilatórios.' }
      ],
      diagnosis: [
        { text: 'A monitorização invasiva permite:', options: ['Dados em tempo real e precisos', 'Nada', 'Ver televisão', 'Dormir'], correctIdx: 0, explanation: 'Fornece valores constantes de pressões arteriais ou intracranianas.' },
        { text: 'O choque sético caracteriza-se por:', options: ['Hipotensão que não responde a fluidos', 'Apenas febre', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Requer uso de vasopressores para manter a perfusão.' },
        { text: 'A Síndrome de Dificuldade Respiratória Aguda (SDRA) causa:', options: ['Hipoxemia grave e infiltrados bilaterais', 'Tosse leve', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Lesão alveolar difusa que exige ventilação protetora.' },
        { text: 'O delírio na UCI é frequentemente:', options: ['Uma disfunção cerebral aguda', 'Normal do sono', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Associado a pior prognóstico e maior tempo de internamento.' },
        { text: 'A falência multiorgânica (MODS) ocorre quando:', options: ['Dois ou mais sistemas falham', 'Apenas o rim falha', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Resposta inflamatória sistémica descontrolada.' }
      ],
      treatment: [
        { text: 'A aspiração de secreções previne:', options: ['Obstrução e pneumonia', 'Gripe', 'Nada', 'Fome'], correctIdx: 0, explanation: 'Mantém a patência das vias aéreas no doente entubado.' },
        { text: 'A ventilação mecânica invasiva visa:', options: ['Garantir trocas gasosas e repouso muscular', 'Curar o pulmão', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Suporte temporário até à resolução da causa base.' },
        { text: 'O uso de noradrenalina serve para:', options: ['Aumentar a pressão arterial (vasopressor)', 'Baixar a febre', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Melhora a perfusão de órgãos vitais no choque.' },
        { text: 'A nutrição enteral precoce ajuda a:', options: ['Manter a barreira intestinal e evitar translocação', 'Engordar o doente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Fundamental para a imunidade e recuperação.' },
        { text: 'O desmame ventilatório (weaning) é:', options: ['O processo de transição para respiração espontânea', 'Desligar a máquina subitamente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Deve ser feito de forma gradual e monitorizada.' }
      ],
      exercises: [
        { text: 'O posicionamento no leito evita:', options: ['Úlceras por pressão e atelectasias', 'Cegueira', 'Nada', 'Fome'], correctIdx: 0, explanation: 'Alivia a pressão e melhora a ventilação-perfusão.' },
        { text: 'A mobilização precoce na UCI visa:', options: ['Prevenir a fraqueza adquirida na UCI', 'Cansar o doente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Reduz o tempo de ventilação e internamento.' },
        { text: 'Exercícios passivos de amplitude de movimento:', options: ['Mantêm a integridade articular', 'Aumentam a força', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Evitam contracturas em doentes sedados.' },
        { text: 'O treino de sedestação (sentar) à beira da cama:', options: ['Melhora a função respiratória e alerta', 'É proibido', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Primeiro passo para a verticalização do doente.' },
        { text: 'A fisioterapia respiratória foca na:', options: ['Higiene brônquica e reexpansão pulmonar', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Previne complicações como a pneumonia associada à ventilação.' }
      ]
    }
  },
  'Urgência e Emergência': {
    complaints: ['Dor precordial súbita.', 'Dispneia grave.', 'Hemorragia externa ativa.'],
    histories: ['Acidente de viação.', 'Queda de altura.', 'Ingestão de substâncias tóxicas.'],
    symptoms: [['Escala de Glasgow baixa', 'Sinais de choque'], ['Dor intensa', 'Agitação psicomotora']],
    evolutionTimes: ['Minutos', 'Horas', 'Imediato'],
    functionalLimitations: ['Risco de vida imediato.', 'Necessidade de estabilização rápida.'],
    questions: {
      evaluation: [{ text: 'A triagem de Manchester serve para:', options: ['Priorizar o atendimento', 'Escolher o médico', 'Nada', 'Dormir'], correctIdx: 0, explanation: 'Define a urgência baseada na gravidade.' }],
      diagnosis: [{ text: 'O protocolo ABCDE foca na:', options: ['Estabilização vital', 'História antiga', 'Nada', 'Fome'], correctIdx: 0, explanation: 'Abordagem sistemática ao doente crítico.' }],
      treatment: [{ text: 'O acesso venoso periférico serve para:', options: ['Administrar fármacos e fluidos', 'Nada', 'Ver sangue', 'Dormir'], correctIdx: 0, explanation: 'Via rápida de administração terapêutica.' }],
      exercises: [{ text: 'Manter a calma ajuda na:', options: ['Eficiência do socorro', 'Nada', 'Piorar tudo', 'Dormir'], correctIdx: 0, explanation: 'Permite raciocínio claro em situações de stress.' }]
    }
  },
  'Saúde Materna': {
    complaints: ['Contrações uterinas.', 'Perda de líquido amniótico.', 'Náuseas e vómitos matinais.'],
    histories: ['Primigesta.', 'Diabetes gestacional.', 'Pós-parto imediato.'],
    symptoms: [['Dilatação cervical', 'Batimentos fetais'], ['Lóquios', 'Ingurgitamento mamário']],
    evolutionTimes: ['Horas', 'Semanas', 'Meses'],
    functionalLimitations: ['Limitação da mobilidade no final da gravidez.', 'Necessidade de repouso.'],
    questions: {
      evaluation: [{ text: 'A manobra de Leopold serve para:', options: ['Ver a posição do feto', 'Ver a cor', 'Nada', 'Dormir'], correctIdx: 0, explanation: 'Palpação abdominal para identificar a estática fetal.' }],
      diagnosis: [{ text: 'A pré-eclâmpsia caracteriza-se por:', options: ['HTA e proteinúria', 'Gripe', 'Nada', 'Fome'], correctIdx: 0, explanation: 'É uma complicação grave da gravidez.' }],
      treatment: [{ text: 'O aleitamento materno promove:', options: ['Imunidade e vínculo', 'Nada', 'Doença', 'Fome'], correctIdx: 0, explanation: 'É o melhor alimento para o recém-nascido.' }],
      exercises: [{ text: 'Caminhadas leves na gravidez:', options: ['Melhoram a circulação', 'São proibidas', 'Nada', 'Dói'], correctIdx: 0, explanation: 'Ajudam no controlo do peso e bem-estar.' }]
    }
  },
  'Saúde Infantil': {
    complaints: ['Febre e recusa alimentar.', 'Dificuldade respiratória.', 'Assadura persistente.'],
    histories: ['Recém-nascido prematuro.', 'Calendário vacinal.', 'Desenvolvimento psicomotor.'],
    symptoms: [['Choro inconsolável', 'Desidratação'], ['Tiragem intercostal', 'Letargia']],
    evolutionTimes: ['Horas', 'Dias', 'Semanas'],
    functionalLimitations: ['Interrupção do sono.', 'Atraso no crescimento.'],
    questions: {
      evaluation: [{ text: 'O teste do pezinho deteta:', options: ['Doenças metabólicas', 'Cor dos olhos', 'Nada', 'Dormir'], correctIdx: 0, explanation: 'Rastreio precoce de patologias graves.' }],
      diagnosis: [{ text: 'A desidratação na criança vê-se pela:', options: ['Turgor da pele e fontanela', 'Cor do cabelo', 'Nada', 'Fome'], correctIdx: 0, explanation: 'Sinais clínicos de perda de fluidos.' }],
      treatment: [{ text: 'A hidratação oral é a:', options: ['Primeira linha na diarreia', 'Última opção', 'Nada', 'Perigosa'], correctIdx: 0, explanation: 'Repõe eletrólitos de forma segura.' }],
      exercises: [{ text: 'Estimular o gatinhar ajuda no:', options: ['Desenvolvimento motor', 'Nada', 'Sono', 'Fome'], correctIdx: 0, explanation: 'Fortalece músculos e coordenação.' }]
    }
  },
  'Saúde Mental': {
    complaints: ['Ansiedade extrema.', 'Tristeza profunda e isolamento.', 'Alucinações auditivas.'],
    histories: ['Episódio psicótico prévio.', 'Consumo de substâncias.', 'História de trauma.'],
    symptoms: [['Ideação suicida', 'Anedonia'], ['Delírios', 'Logorreia']],
    evolutionTimes: ['Semanas', 'Meses', 'Anos'],
    functionalLimitations: ['Incapacidade de manter relações sociais.', 'Dificuldade no autocuidado.'],
    questions: {
      evaluation: [{ text: 'A relação terapêutica baseia-se na:', options: ['Empatia e escuta ativa', 'Autoridade', 'Nada', 'Dormir'], correctIdx: 0, explanation: 'Fundamental para a aliança com o doente.' }],
      diagnosis: [{ text: 'A depressão não é apenas:', options: ['Tristeza passageira', 'Doença', 'Nada', 'Fome'], correctIdx: 0, explanation: 'É uma patologia complexa e multifatorial.' }],
      treatment: [{ text: 'A adesão à terapêutica evita:', options: ['Recaídas', 'Cura total', 'Nada', 'Fome'], correctIdx: 0, explanation: 'Mantém a estabilidade dos neurotransmissores.' }],
      exercises: [{ text: 'Técnicas de relaxamento ajudam no:', options: ['Controlo da ansiedade', 'Nada', 'Piorar', 'Dormir'], correctIdx: 0, explanation: 'Reduzem a ativação do sistema nervoso.' }]
    }
  },
  'Saúde Comunitária': {
    complaints: ['Falta de acesso a cuidados.', 'Dificuldade na gestão da medicação.', 'Necessidade de vacinação.'],
    histories: ['Família numerosa em risco.', 'Idoso isolado.', 'Bairro com saneamento precário.'],
    symptoms: [['Baixa literacia em saúde', 'Isolamento'], ['Falta de saneamento', 'Desnutrição']],
    evolutionTimes: ['Anos', 'Meses', 'Semanas'],
    functionalLimitations: ['Barreiras geográficas e económicas.', 'Falta de suporte familiar.'],
    questions: {
      evaluation: [{ text: 'A visita domiciliária permite:', options: ['Avaliar o contexto real', 'Nada', 'Passear', 'Dormir'], correctIdx: 0, explanation: 'Observa as condições de vida e suporte.' }],
      diagnosis: [{ text: 'A promoção da saúde foca na:', options: ['Prevenção e educação', 'Cura apenas', 'Nada', 'Fome'], correctIdx: 0, explanation: 'Capacita as pessoas para cuidarem da sua saúde.' }],
      treatment: [{ text: 'O PNV serve para:', options: ['Imunização em massa', 'Nada', 'Gastar dinheiro', 'Dormir'], correctIdx: 0, explanation: 'Programa Nacional de Vacinação.' }],
      exercises: [{ text: 'Grupos de caminhada promovem:', options: ['Saúde e socialização', 'Nada', 'Doença', 'Fome'], correctIdx: 0, explanation: 'Atividade física em contexto comunitário.' }]
    }
  },
  'Gerontologia': {
    complaints: ['Quedas frequentes.', 'Confusão mental noturna.', 'Incontinência urinária.'],
    histories: ['Polifarmácia.', 'Demência de Alzheimer.', 'Osteoporose.'],
    symptoms: [['Fragilidade', 'Sarcopenia'], ['Défice cognitivo', 'Polipatologia']],
    evolutionTimes: ['Anos', 'Meses', 'Semanas'],
    functionalLimitations: ['Dependência nas atividades diárias.', 'Risco de imobilidade.'],
    questions: {
      evaluation: [{ text: 'A avaliação geriátrica global vê:', options: ['Físico, mental e social', 'Só o corpo', 'Nada', 'Dormir'], correctIdx: 0, explanation: 'Abordagem holística ao idoso.' }],
      diagnosis: [{ text: 'O delirium é uma:', options: ['Alteração aguda da consciência', 'Doença crónica', 'Nada', 'Fome'], correctIdx: 0, explanation: 'Frequentemente causado por infeções ou fármacos.' }],
      treatment: [{ text: 'A revisão da medicação evita:', options: ['Interações e quedas', 'Nada', 'Cura', 'Dormir'], correctIdx: 0, explanation: 'Reduz a carga de fármacos desnecessários.' }],
      exercises: [{ text: 'Treino de equilíbrio previne:', options: ['Quedas', 'Cegueira', 'Nada', 'Fome'], correctIdx: 0, explanation: 'Aumenta a segurança na marcha.' }]
    }
  },
  'Oncologia': {
    complaints: ['Dor oncológica intensa.', 'Náuseas pós-quimioterapia.', 'Fadiga extrema.'],
    histories: ['Carcinoma da mama.', 'Tratamento radioterápico.', 'Cuidados paliativos.'],
    symptoms: [['Caquexia', 'Alopécia'], ['Neutropenia', 'Mucosite']],
    evolutionTimes: ['Meses', 'Anos', 'Semanas'],
    functionalLimitations: ['Imunossupressão severa.', 'Limitação da autonomia.'],
    questions: {
      evaluation: [{ text: 'A escala de dor é essencial para:', options: ['Ajustar a analgesia', 'Nada', 'Ver televisão', 'Dormir'], correctIdx: 0, explanation: 'Permite um controlo rigoroso do sofrimento.' }],
      diagnosis: [{ text: 'O estadiamento define a:', options: ['Extensão da doença', 'Cor do tumor', 'Nada', 'Fome'], correctIdx: 0, explanation: 'Ajuda a decidir o melhor tratamento.' }],
      treatment: [{ text: 'A quimioterapia atua nas:', options: ['Células de divisão rápida', 'Nada', 'Bactérias', 'Dormir'], correctIdx: 0, explanation: 'Alvo principal são as células tumorais.' }],
      exercises: [{ text: 'Exercício leve no cancro ajuda na:', options: ['Fadiga oncológica', 'Nada', 'Piorar', 'Dormir'], correctIdx: 0, explanation: 'Melhora a qualidade de vida e energia.' }]
    }
  },
  'Bloco Operatório': {
    complaints: ['Ansiedade pré-operatória.', 'Dor no local da incisão.', 'Náuseas pós-anestesia.'],
    histories: ['Jejum pré-operatório.', 'Alergia ao látex.', 'Cirurgia programada.'],
    symptoms: [['Sinais vitais estáveis', 'Ferida operatória'], ['Hipotermia', 'Retenção urinária']],
    evolutionTimes: ['Horas', 'Dias', 'Minutos'],
    functionalLimitations: ['Imobilidade temporária.', 'Necessidade de vigilância contínua.'],
    questions: {
      evaluation: [{ text: 'A Checklist da OMS serve para:', options: ['Segurança do doente', 'Nada', 'Contar dinheiro', 'Dormir'], correctIdx: 0, explanation: 'Previne erros e eventos adversos.' }],
      diagnosis: [{ text: 'A esterilização garante a:', options: ['Ausência de microrganismos', 'Nada', 'Limpeza visual', 'Fome'], correctIdx: 0, explanation: 'Evita infeções do local cirúrgico.' }],
      treatment: [{ text: 'O penso cirúrgico deve ser:', options: ['Assético', 'Sujo', 'Nada', 'Opcional'], correctIdx: 0, explanation: 'Protege a ferida de contaminações.' }],
      exercises: [{ text: 'Levante precoce ajuda a prevenir:', options: ['Tromboses', 'Cegueira', 'Nada', 'Fome'], correctIdx: 0, explanation: 'Estimula a circulação sanguínea.' }]
    }
  },
  'Reabilitação': {
    complaints: ['Dificuldade em andar após AVC.', 'Perda de força muscular.', 'Incapacidade funcional.'],
    histories: ['Lesão medular.', 'Amputação de membro.', 'Doença neurológica crónica.'],
    symptoms: [['Espasticidade', 'Atrofia'], ['Défice de equilíbrio', 'Contratura']],
    evolutionTimes: ['Meses', 'Anos', 'Semanas'],
    functionalLimitations: ['Dependência de ajudas técnicas.', 'Limitação da participação social.'],
    questions: {
      evaluation: [{ text: 'O índice de Barthel avalia a:', options: ['Independência nas AVDs', 'Força', 'Nada', 'Visão'], correctIdx: 0, explanation: 'Mede a capacidade funcional do doente.' }],
      diagnosis: [{ text: 'A reabilitação foca no:', options: ['Potencial residual', 'Nada', 'Passado', 'Fome'], correctIdx: 0, explanation: 'Maximiza as capacidades que o doente ainda tem.' }],
      treatment: [{ text: 'O ensino ao cuidador é:', options: ['Crucial para a continuidade', 'Nada', 'Opcional', 'Dormir'], correctIdx: 0, explanation: 'Garante cuidados seguros em casa.' }],
      exercises: [{ text: 'O treino de marcha aumenta a:', options: ['Autonomia', 'Nada', 'Doença', 'Fome'], correctIdx: 0, explanation: 'Devolve a capacidade de deslocação.' }]
    }
  },
  'Gestão de Feridas': {
    complaints: ['Ferida que não fecha.', 'Dor e odor na úlcera.', 'Exsudado abundante.'],
    histories: ['Insuficiência venosa.', 'Pé diabético.', 'Imobilidade prolongada.'],
    symptoms: [['Tecido de granulação', 'Eslacelo'], ['Necrose', 'Bordos macerados']],
    evolutionTimes: ['Semanas', 'Meses', 'Anos'],
    functionalLimitations: ['Dificuldade na locomoção.', 'Risco de infeção sistémica.'],
    questions: {
      evaluation: [{ text: 'A escala de Braden avalia o:', options: ['Risco de úlceras', 'Nada', 'Tamanho', 'Cor'], correctIdx: 0, explanation: 'Identifica doentes em risco de pressão.' }],
      diagnosis: [{ text: 'O exsudado purulento indica:', options: ['Infeção', 'Cura', 'Nada', 'Saúde'], correctIdx: 0, explanation: 'Presença de bactérias e inflamação.' }],
      treatment: [{ text: 'O penso húmido promove a:', options: ['Cicatrização fisiológica', 'Nada', 'Infeção', 'Dormir'], correctIdx: 0, explanation: 'Mantém o ambiente ideal para as células.' }],
      exercises: [{ text: 'Aliviar a pressão na zona ajuda a:', options: ['Cicatrizar', 'Nada', 'Piorar', 'Dormir'], correctIdx: 0, explanation: 'Permite a reperfusão dos tecidos.' }]
    }
  },
  'Cuidados Paliativos': {
    complaints: ['Sofrimento multidimensional.', 'Dispneia em repouso.', 'Boca seca e sede.'],
    histories: ['Doença terminal avançada.', 'Falência de órgãos.', 'Necessidade de conforto.'],
    symptoms: [['Agonia', 'Estertores'], ['Caquexia extrema', 'Delirium']],
    evolutionTimes: ['Dias', 'Semanas', 'Meses'],
    functionalLimitations: ['Dependência total.', 'Fim de vida próximo.'],
    questions: {
      evaluation: [{ text: 'O foco dos paliativos é a:', options: ['Qualidade de vida e conforto', 'Cura', 'Nada', 'Dormir'], correctIdx: 0, explanation: 'Alívio do sofrimento em todas as esferas.' }],
      diagnosis: [{ text: 'A dor total inclui aspetos:', options: ['Físicos, sociais e espirituais', 'Nada', 'Só físicos', 'Fome'], correctIdx: 0, explanation: 'Conceito de Cicely Saunders.' }],
      treatment: [{ text: 'A sedação paliativa serve para:', options: ['Aliviar sintomas refratários', 'Nada', 'Matar', 'Dormir'], correctIdx: 0, explanation: 'Reduz a consciência para evitar sofrimento insuportável.' }],
      exercises: [{ text: 'O apoio à família é:', options: ['Parte integrante do cuidado', 'Nada', 'Opcional', 'Fome'], correctIdx: 0, explanation: 'O núcleo familiar também sofre e precisa de suporte.' }]
    }
  },
  'Hematologia Clínica': {
    complaints: ['Cansaço extremo.', 'Hematomas espontâneos.', 'Palidez cutânea.'],
    histories: ['Anemia ferropénica prévia.', 'Exposição a benzeno.', 'História familiar de talassémia.'],
    symptoms: [['Hemoglobina 8g/dL', 'Microcitose'], ['Plaquetopenia', 'Leucocitose']],
    evolutionTimes: ['1 semana', '1 mês', 'Crónico'],
    functionalLimitations: ['Falta de ar ao esforço.', 'Risco de hemorragia.'],
    questions: {
      evaluation: [{ text: 'O VCM avalia o:', options: ['Tamanho dos glóbulos vermelhos', 'Número de plaquetas', 'Nada', 'Glicose'], correctIdx: 0, explanation: 'Volume Corpuscular Médio indica se a anemia é micro, normo ou macrocítica.' }],
      diagnosis: [{ text: 'A presença de blastos sugere:', options: ['Leucemia aguda', 'Anemia leve', 'Nada', 'Infeção viral'], correctIdx: 0, explanation: 'Blastos são células imaturas malignas.' }],
      treatment: [{ text: 'O tratamento da anemia ferropénica é:', options: ['Suplementação de ferro', 'Vitamina C apenas', 'Nada', 'Antibiótico'], correctIdx: 0, explanation: 'Repõe as reservas de ferro do organismo.' }],
      exercises: [{ text: 'Evitar desportos de contacto se:', options: ['Plaquetas baixas', 'Nada', 'Sempre', 'Fome'], correctIdx: 0, explanation: 'Previne hemorragias graves por trauma.' }]
    }
  },
  'Bioquímica Clínica': {
    complaints: ['Sede excessiva.', 'Urinas escuras.', 'Dor abdominal.'],
    histories: ['Diabetes Mellitus.', 'Dislipidemia.', 'Consumo de álcool.'],
    symptoms: [['Glicemia 250mg/dL', 'Glicosúria'], ['ALT/AST elevadas', 'Bilirrubina alta']],
    evolutionTimes: ['Dias', 'Semanas', 'Meses'],
    functionalLimitations: ['Fadiga.', 'Necessidade de dieta rigorosa.'],
    questions: {
      evaluation: [{ text: 'A creatinina é marcador de:', options: ['Função renal', 'Fígado', 'Coração', 'Nada'], correctIdx: 0, explanation: 'Produto do metabolismo muscular filtrado pelo rim.' }],
      diagnosis: [{ text: 'Colesterol LDL elevado é fator de:', options: ['Risco cardiovascular', 'Saúde', 'Nada', 'Fome'], correctIdx: 0, explanation: 'O "mau" colesterol deposita-se nas artérias.' }],
      treatment: [{ text: 'O controlo glicémico evita:', options: ['Complicações tardias', 'Nada', 'Cura total', 'Fome'], correctIdx: 0, explanation: 'Previne retinopatia, nefropatia e neuropatia.' }],
      exercises: [{ text: 'O jejum para análises costuma ser de:', options: ['8 a 12 horas', '1 hora', 'Nada', '24 horas'], correctIdx: 0, explanation: 'Garante valores basais estáveis.' }]
    }
  },
  'Microbiologia': {
    complaints: ['Febre e arrepios.', 'Disúria e polaciúria.', 'Expectoração purulenta.'],
    histories: ['Uso recente de antibióticos.', 'Internamento hospitalar.', 'Infeção urinária recorrente.'],
    symptoms: [['Urocultura positiva', 'Bacteriúria'], ['Gram positivo', 'Resistência a antibióticos']],
    evolutionTimes: ['48 horas', '1 semana', 'Dias'],
    functionalLimitations: ['Mal-estar geral.', 'Risco de sépsis.'],
    questions: {
      evaluation: [{ text: 'O antibiograma serve para:', options: ['Ver sensibilidade a fármacos', 'Contar bactérias', 'Nada', 'Dormir'], correctIdx: 0, explanation: 'Identifica qual antibiótico mata a bactéria.' }],
      diagnosis: [{ text: 'A coloração de Gram distingue:', options: ['Tipos de parede bacteriana', 'Vírus', 'Nada', 'Fungos'], correctIdx: 0, explanation: 'Divide em Gram-positivas e Gram-negativas.' }],
      treatment: [{ text: 'Antibióticos de largo espetro:', options: ['Atuam em muitas bactérias', 'São mais fracos', 'Nada', 'Só vírus'], correctIdx: 0, explanation: 'Usados quando não se conhece o agente específico.' }],
      exercises: [{ text: 'Completar o ciclo de antibiótico:', options: ['Evita resistências', 'É opcional', 'Nada', 'Dói'], correctIdx: 0, explanation: 'Garante a eliminação total do agente.' }]
    }
  },
  'Imunologia': {
    complaints: ['Alergias sazonais.', 'Dores articulares e rash.', 'Infeções frequentes.'],
    histories: ['Lúpus Eritematoso Sistémico.', 'Imunodeficiência.', 'Rinite alérgica.'],
    symptoms: [['ANA positivo', 'Anti-dsDNA'], ['IgE elevada', 'Hipocomplementemia']],
    evolutionTimes: ['Meses', 'Anos', 'Semanas'],
    functionalLimitations: ['Sensibilidade ao sol.', 'Restrições alimentares.'],
    questions: {
      evaluation: [{ text: 'O teste de ELISA deteta:', options: ['Antigénios ou anticorpos', 'Glicose', 'Nada', 'Ossos'], correctIdx: 0, explanation: 'Técnica imunoenzimática muito sensível.' }],
      diagnosis: [{ text: 'Doenças autoimunes ocorrem por:', options: ['Ataque ao próprio corpo', 'Vírus', 'Nada', 'Fome'], correctIdx: 0, explanation: 'O sistema imune perde a tolerância ao "self".' }],
      treatment: [{ text: 'Imunossupressores servem para:', options: ['Diminuir a resposta imune', 'Aumentar defesas', 'Nada', 'Dormir'], correctIdx: 0, explanation: 'Controlam a inflamação em doenças autoimunes.' }],
      exercises: [{ text: 'Evitar alérgenos conhecidos:', options: ['Previne crises', 'Nada', 'É indiferente', 'Dói'], correctIdx: 0, explanation: 'Medida primária no controlo de alergias.' }]
    }
  },
  'Genética Clínica': {
    complaints: ['Atraso no desenvolvimento.', 'História familiar de doença rara.', 'Infertilidade.'],
    histories: ['Consanguinidade.', 'Idade materna avançada.', 'Abortos de repetição.'],
    symptoms: [['Cariótipo alterado', 'Trissomia'], ['Mutação genética', 'Dismorfias']],
    evolutionTimes: ['Congénito', 'Anos', 'Desde o nascimento'],
    functionalLimitations: ['Deficiência intelectual.', 'Malformações físicas.'],
    questions: {
      evaluation: [{ text: 'O cariótipo analisa os:', options: ['Cromossomas', 'Genes individuais', 'Nada', 'Proteínas'], correctIdx: 0, explanation: 'Vê o número e estrutura dos cromossomas.' }],
      diagnosis: [{ text: 'A Trissomia 21 é a presença de:', options: ['3 cromossomas 21', '2 cromossomas 21', 'Nada', '47 cromossomas X'], correctIdx: 0, explanation: 'Causa a Síndrome de Down.' }],
      treatment: [{ text: 'O aconselhamento genético serve para:', options: ['Avaliar riscos na descendência', 'Curar genes', 'Nada', 'Dormir'], correctIdx: 0, explanation: 'Informa a família sobre padrões de herança.' }],
      exercises: [{ text: 'A terapia génica foca em:', options: ['Corrigir genes defeituosos', 'Nada', 'Musculação', 'Dormir'], correctIdx: 0, explanation: 'Área emergente da medicina molecular.' }]
    }
  },
  'Toxicologia': {
    complaints: ['Sonolência e confusão.', 'Náuseas e vómitos.', 'Exposição ocupacional a químicos.'],
    histories: ['Ingestão acidental de fármacos.', 'Tentativa de autólise.', 'Trabalho em indústria química.'],
    symptoms: [['Níveis séricos elevados', 'Pupilas mióticas'], ['Hepatotoxicidade', 'Acidose metabólica']],
    evolutionTimes: ['Horas', 'Minutos', 'Dias'],
    functionalLimitations: ['Risco de falência multiorgânica.', 'Alteração do estado mental.'],
    questions: {
      evaluation: [{ text: 'O screening toxicológico deteta:', options: ['Drogas e venenos', 'Vitaminas', 'Nada', 'Glicose'], correctIdx: 0, explanation: 'Pesquisa substâncias tóxicas no sangue ou urina.' }],
      diagnosis: [{ text: 'O antídoto para opioides é:', options: ['Naloxona', 'Carvão ativado', 'Nada', 'Água'], correctIdx: 0, explanation: 'Reverte rapidamente a depressão respiratória.' }],
      treatment: [{ text: 'O carvão ativado serve para:', options: ['Impedir a absorção', 'Aumentar excreção', 'Nada', 'Dormir'], correctIdx: 0, explanation: 'Adsorve o tóxico no trato gastrointestinal.' }],
      exercises: [{ text: 'Usar EPIs na indústria previne:', options: ['Intoxicações crónicas', 'Nada', 'Gripe', 'Fome'], correctIdx: 0, explanation: 'Protege contra a inalação ou contacto dérmico.' }]
    }
  },
  'Parasitologia': {
    complaints: ['Prurido anal noturno.', 'Diarreia e dor abdominal.', 'Presença de "vermes" nas fezes.'],
    histories: ['Consumo de água não tratada.', 'Falta de higiene das mãos.', 'Viagem a zonas endémicas.'],
    symptoms: [['Ovos nas fezes', 'Quistos de Giardia'], ['Eosinofilia', 'Anemia']],
    evolutionTimes: ['Semanas', 'Meses', 'Dias'],
    functionalLimitations: ['Desconforto abdominal.', 'Perda de peso.'],
    questions: {
      evaluation: [{ text: 'O exame parasitológico de fezes vê:', options: ['Ovos e parasitas', 'Bactérias apenas', 'Nada', 'Sangue'], correctIdx: 0, explanation: 'Identifica helmintas e protozoários.' }],
      diagnosis: [{ text: 'A Giardíase causa tipicamente:', options: ['Diarreia esteatorreica', 'Obstipação', 'Nada', 'Febre alta'], correctIdx: 0, explanation: 'Diarreia com gordura por má absorção.' }],
      treatment: [{ text: 'O tratamento usa:', options: ['Antiparasitários', 'Antibióticos comuns', 'Nada', 'Vitaminas'], correctIdx: 0, explanation: 'Fármacos como albendazol ou metronidazol.' }],
      exercises: [{ text: 'Lavar bem as frutas e vegetais:', options: ['Previne ingestão de ovos', 'Nada', 'É opcional', 'Dói'], correctIdx: 0, explanation: 'Elimina a contaminação fecal-oral.' }]
    }
  },
  'Uroanálise': {
    complaints: ['Urina com cheiro forte.', 'Ardor ao urinar.', 'Alteração da cor da urina.'],
    histories: ['Infeção urinária.', 'Cálculos renais.', 'Diabetes.'],
    symptoms: [['Leucocitúria', 'Nitritos positivos'], ['Hematúria', 'Cilindros hialinos']],
    evolutionTimes: ['Dias', 'Semanas', 'Horas'],
    functionalLimitations: ['Desconforto pélvico.', 'Urgência miccional.'],
    questions: {
      evaluation: [{ text: 'A fita reativa (dipstick) avalia:', options: ['Vários parâmetros químicos', 'Só o pH', 'Nada', 'Bactérias'], correctIdx: 0, explanation: 'Teste rápido para glicose, nitritos, sangue, etc.' }],
      diagnosis: [{ text: 'Nitritos positivos sugerem:', options: ['Infeção bacteriana', 'Saúde', 'Nada', 'Diabetes'], correctIdx: 0, explanation: 'Algumas bactérias convertem nitratos em nitritos.' }],
      treatment: [{ text: 'Beber muita água ajuda a:', options: ['Diluir a urina e limpar', 'Nada', 'Piorar', 'Dormir'], correctIdx: 0, explanation: 'Facilita a eliminação de resíduos e bactérias.' }],
      exercises: [{ text: 'A colheita deve ser do:', options: ['Jato médio', 'Início do jato', 'Nada', 'Fim do jato'], correctIdx: 0, explanation: 'Evita a contaminação pela flora uretral.' }]
    }
  },
  'Endocrinologia Laboratorial': {
    complaints: ['Cansaço e frio constante.', 'Nervosismo e palpitações.', 'Dificuldade em engravidar.'],
    histories: ['Doença da tiroide.', 'Infertilidade.', 'Stress crónico.'],
    symptoms: [['TSH elevado', 'T4 livre baixo'], ['Cortisol alto', 'Prolactina elevada']],
    evolutionTimes: ['Meses', 'Anos', 'Semanas'],
    functionalLimitations: ['Alterações de humor.', 'Metabolismo lento.'],
    questions: {
      evaluation: [{ text: 'O TSH avalia a função da:', options: ['Tiroide (via hipófise)', 'Suprarrenal', 'Nada', 'Pâncreas'], correctIdx: 0, explanation: 'Hormona estimulante da tiroide.' }],
      diagnosis: [{ text: 'TSH baixo e T4 alto indicam:', options: ['Hipertiroidismo', 'Hipotiroidismo', 'Nada', 'Saúde'], correctIdx: 0, explanation: 'A tiroide está a produzir em excesso.' }],
      treatment: [{ text: 'A levotiroxina repõe:', options: ['Hormona tiroideia', 'Insulina', 'Nada', 'Ferro'], correctIdx: 0, explanation: 'Tratamento padrão para o hipotiroidismo.' }],
      exercises: [{ text: 'O cortisol é conhecido como:', options: ['Hormona do stress', 'Hormona do sono', 'Nada', 'Fome'], correctIdx: 0, explanation: 'Aumenta em situações de tensão prolongada.' }]
    }
  },
  'Citologia': {
    complaints: ['Rastreio de rotina.', 'Nódulo na mama.', 'Alteração no colo do útero.'],
    histories: ['HPV positivo.', 'Tabagismo.', 'Antecedentes familiares de cancro.'],
    symptoms: [['Células atípicas', 'Displasia'], ['ASCUS', 'LSIL/HSIL']],
    evolutionTimes: ['Anos', 'Meses', 'Semanas'],
    functionalLimitations: ['Ansiedade pelo resultado.', 'Necessidade de colposcopia.'],
    questions: {
      evaluation: [{ text: 'O Papanicolau analisa:', options: ['Células do colo uterino', 'Sangue', 'Nada', 'Urina'], correctIdx: 0, explanation: 'Rastreio fundamental para o cancro do colo.' }],
      diagnosis: [{ text: 'A citologia deteta alterações:', options: ['Pré-cancerosas', 'Só cancro avançado', 'Nada', 'Gripe'], correctIdx: 0, explanation: 'Permite intervir antes da progressão para cancro.' }],
      treatment: [{ text: 'A vacina do HPV previne:', options: ['Lesões precursoras', 'Gripe', 'Nada', 'Fome'], correctIdx: 0, explanation: 'Protege contra os tipos mais oncogénicos do vírus.' }],
      exercises: [{ text: 'Fazer o rastreio regularmente:', options: ['Salva vidas', 'É opcional', 'Nada', 'Dói'], correctIdx: 0, explanation: 'A deteção precoce é a chave do sucesso.' }]
    }
  },
  'Hemostase': {
    complaints: ['Hemorragias nasais frequentes.', 'Perna inchada e dorida.', 'Sangramento excessivo após cirurgia.'],
    histories: ['Uso de varfarina.', 'Trombose Venosa Profunda.', 'Hemofilia.'],
    symptoms: [['INR elevado', 'Tempo de Protrombina'], ['D-Dímeros altos', 'Fibrinogénio baixo']],
    evolutionTimes: ['Horas', 'Dias', 'Semanas'],
    functionalLimitations: ['Risco de embolia pulmonar.', 'Necessidade de evitar traumas.'],
    questions: {
      evaluation: [{ text: 'O INR monitoriza a:', options: ['Hipocoagulação oral', 'Glicose', 'Nada', 'Fome'], correctIdx: 0, explanation: 'Padroniza os resultados do tempo de protrombina.' }],
      diagnosis: [{ text: 'D-Dímeros elevados sugerem:', options: ['Trombose/Embolia', 'Saúde', 'Nada', 'Anemia'], correctIdx: 0, explanation: 'Produto da degradação da fibrina (coágulo).' }],
      treatment: [{ text: 'Anticoagulantes servem para:', options: ['Prevenir coágulos', 'Parar hemorragias', 'Nada', 'Dormir'], correctIdx: 0, explanation: 'Evitam a formação de trombos perigosos.' }],
      exercises: [{ text: 'Usar meias de compressão ajuda na:', options: ['Prevenção de TVP', 'Visão', 'Nada', 'Fome'], correctIdx: 0, explanation: 'Melhora o retorno venoso e evita estase.' }]
    }
  },
  'Biologia Molecular': {
    complaints: ['Dúvida sobre paternidade.', 'Carga viral elevada.', 'Pesquisa de mutação específica.'],
    histories: ['Infeção por HIV/Hepatite.', 'Planeamento familiar.', 'Diagnóstico de precisão.'],
    symptoms: [['PCR positiva', 'Sequenciação de DNA'], ['Carga viral detetável', 'Polimorfismo']],
    evolutionTimes: ['Dias', 'Semanas', 'Anos'],
    functionalLimitations: ['Necessidade de tratamento específico.', 'Impacto psicossocial.'],
    questions: {
      evaluation: [{ text: 'A PCR (Reação em Cadeia da Polimerase):', options: ['Amplifica o DNA', 'Mata vírus', 'Nada', 'Dormir'], correctIdx: 0, explanation: 'Permite detetar quantidades mínimas de material genético.' }],
      diagnosis: [{ text: 'A carga viral mede a:', options: ['Quantidade de vírus no sangue', 'Força do vírus', 'Nada', 'Cor'], correctIdx: 0, explanation: 'Essencial para monitorizar o tratamento do HIV/Hepatites.' }],
      treatment: [{ text: 'A medicina personalizada baseia-se na:', options: ['Genética do doente', 'Sorte', 'Nada', 'Fome'], correctIdx: 0, explanation: 'Tratamentos ajustados ao perfil molecular.' }],
      exercises: [{ text: 'O teste de paternidade compara:', options: ['Marcadores genéticos', 'Tipo de sangue apenas', 'Nada', 'Cor dos olhos'], correctIdx: 0, explanation: 'Usa regiões altamente variáveis do DNA.' }]
    }
  },
  'Farmácia Comunitária': {
    complaints: ['Dúvida sobre a toma do medicamento.', 'Efeito secundário inesperado.', 'Necessidade de medição da tensão.'],
    histories: ['Utente polimedicado.', 'Automedicação frequente.', 'Dificuldade na leitura do folheto.'],
    symptoms: [['Confusão posológica', 'Interação medicamentosa'], ['Reação adversa', 'Baixa adesão']],
    evolutionTimes: ['Dias', 'Semanas', 'Meses'],
    functionalLimitations: ['Risco de erro terapêutico.', 'Descontrolo de patologias crónicas.'],
    questions: {
      evaluation: [
        { text: 'A dispensa de medicamentos exige:', options: ['Conferência da receita', 'Nada', 'Rapidez apenas', 'Dormir'], correctIdx: 0, explanation: 'Garante que o doente recebe o que foi prescrito.' },
        { text: 'A medição da pressão arterial na farmácia:', options: ['Deve seguir um protocolo rigoroso', 'É apenas um número', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Requer repouso prévio e técnica correta.' },
        { text: 'O rastreio de glicémia capilar avalia:', options: ['O nível de açúcar no sangue no momento', 'A cor do sangue', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Útil para deteção precoce de diabetes.' },
        { text: 'A avaliação da adesão terapêutica verifica se:', options: ['O doente toma os medicamentos como indicado', 'O doente tem dinheiro', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Identifica falhas na toma que comprometem a saúde.' },
        { text: 'A anamnese farmacêutica foca em:', options: ['Histórico de alergias e uso de outros fármacos', 'Apenas a queixa atual', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Evita interações e reações adversas.' }
      ],
      diagnosis: [
        { text: 'O farmacêutico comunitário promove a:', options: ['Uso racional do medicamento', 'Venda máxima', 'Nada', 'Fome'], correctIdx: 0, explanation: 'Educa o utente para a toma correta e segura.' },
        { text: 'Um Problema Relacionado com Medicamentos (PRM) é:', options: ['Qualquer evento que interfira no resultado desejado', 'Uma doença nova', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Pode ser falta de adesão, dose incorreta ou interação.' },
        { text: 'A automedicação responsável consiste em:', options: ['Tratar sintomas leves com aconselhamento', 'Tomar antibióticos sem receita', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Uso de MNSRM sob orientação do farmacêutico.' },
        { text: 'A suspeita de Reação Adversa (RAM) deve ser:', options: ['Notificada ao sistema de farmacovigilância', 'Ignorada se for leve', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Contribui para a segurança de todos os utentes.' },
        { text: 'O erro de posologia ocorre quando:', options: ['A dose ou o intervalo estão incorretos', 'O remédio é caro', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Pode levar a falha terapêutica ou toxicidade.' }
      ],
      treatment: [
        { text: 'O aconselhamento farmacêutico foca na:', options: ['Segurança e eficácia', 'Nada', 'Preço', 'Dormir'], correctIdx: 0, explanation: 'Maximiza os benefícios e minimiza riscos.' },
        { text: 'A indicação farmacêutica para tosse seca visa:', options: ['Aliviar o reflexo da tosse (antitússico)', 'Expulsar muco', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Diferente da tosse com expetoração, que requer expetorantes.' },
        { text: 'O uso de suplementos alimentares deve:', options: ['Ser orientado para evitar excessos ou interações', 'Ser livre para todos', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Podem interagir com medicamentos de prescrição.' },
        { text: 'A aplicação de injetáveis na farmácia:', options: ['Requer formação específica e local adequado', 'Pode ser feita em qualquer lugar', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Garante a segurança e higiene do procedimento.' },
        { text: 'O tratamento de feridas leves (curativos):', options: ['Exige limpeza com soro e antissético adequado', 'Usa apenas água da torneira', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Previne infeções e ajuda na cicatrização.' }
      ],
      exercises: [
        { text: 'Organizar a medicação em caixas:', options: ['Melhora a adesão', 'Nada', 'Confunde', 'Dói'], correctIdx: 0, explanation: 'Facilita a rotina de toma do doente.' },
        { text: 'Ler o folheto informativo serve para:', options: ['Conhecer contraindicações e efeitos comuns', 'Assustar o doente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Informa sobre o uso correto e riscos.' },
        { text: 'Verificar o prazo de validade regularmente:', options: ['Garante que o fármaco mantém a sua potência', 'É desnecessário', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Medicamentos fora de prazo podem ser ineficazes ou tóxicos.' },
        { text: 'Guardar os medicamentos num local fresco e seco:', options: ['Evita a degradação pelo calor e humidade', 'Pode ser na casa de banho', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A humidade da casa de banho estraga muitos comprimidos.' },
        { text: 'Não partilhar medicação com familiares:', options: ['Evita erros graves, pois cada caso é único', 'É uma boa forma de poupar', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O que serve para um pode ser perigoso para outro.' }
      ]
    }
  },
  'Farmácia Hospitalar': {
    complaints: ['Medicamento não disponível na enfermaria.', 'Dúvida sobre estabilidade de injetável.', 'Necessidade de nutrição parentérica.'],
    histories: ['Doente internado em cuidados intensivos.', 'Protocolo de quimioterapia.', 'Cirurgia complexa programada.'],
    symptoms: [['Erro de medicação evitado', 'Intervenção farmacêutica'], ['Estabilidade físico-química', 'Incompatibilidade']],
    evolutionTimes: ['Horas', 'Minutos', 'Dias'],
    functionalLimitations: ['Risco de eventos adversos graves.', 'Necessidade de suporte vital.'],
    questions: {
      evaluation: [
        { text: 'A dose unitária serve para:', options: ['Segurança e controlo de custos', 'Nada', 'Gastar tempo', 'Dormir'], correctIdx: 0, explanation: 'Reduz erros de administração e desperdício.' },
        { text: 'A validação farmacêutica da prescrição:', options: ['Deteta erros e interações', 'É opcional', 'Nada', 'Fome'], correctIdx: 0, explanation: 'Barreira de segurança antes da administração.' },
        { text: 'O controlo de stock de estupefacientes:', options: ['É rigoroso e obrigatório por lei', 'É feito a olho', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Evita desvios e garante o uso legal.' },
        { text: 'A monitorização de níveis plasmáticos (TDM):', options: ['Ajusta a dose para evitar toxicidade', 'Vê a cor do sangue', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Vital para fármacos com janela terapêutica estreita.' },
        { text: 'A inspeção de carrinhos de emergência:', options: ['Garante que os fármacos vitais estão prontos e válidos', 'É feita uma vez por ano', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Essencial para a resposta rápida em paragens cardíacas.' }
      ],
      diagnosis: [
        { text: 'A reconciliação terapêutica evita:', options: ['Omissões e duplicados', 'Nada', 'Saúde', 'Fome'], correctIdx: 0, explanation: 'Garante continuidade do tratamento no internamento.' },
        { text: 'Um erro de medicação é:', options: ['Qualquer evento evitável que possa causar dano', 'Um efeito secundário normal', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Pode ocorrer na prescrição, dispensa ou administração.' },
        { text: 'A incompatibilidade físico-química ocorre quando:', options: ['Dois fármacos reagem negativamente num soro', 'O doente não gosta do remédio', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Pode causar precipitação ou perda de efeito.' },
        { text: 'A farmacovigilância hospitalar deteta:', options: ['Reações adversas graves em doentes internados', 'Apenas o preço', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ajuda a melhorar a segurança dos protocolos.' },
        { text: 'A análise de custo-efetividade ajuda a:', options: ['Escolher o melhor tratamento pelo menor custo', 'Comprar o mais barato sempre', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Otimiza os recursos limitados do hospital.' }
      ],
      treatment: [
        { text: 'A central de misturas intravenosas:', options: ['Garante a esterilidade', 'Nada', 'Faz sumos', 'Dormir'], correctIdx: 0, explanation: 'Prepara injetáveis em ambiente controlado.' },
        { text: 'A nutrição parentérica total (NPT) é para:', options: ['Doentes que não podem usar o trato digestivo', 'Pessoas com dieta', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Fornece nutrientes diretamente na veia.' },
        { text: 'A quimioterapia citotóxica exige:', options: ['Manipulação em câmara de fluxo laminar vertical', 'Cozinha comum', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Protege o operador e o produto de contaminação.' },
        { text: 'O uso de antibióticos de reserva requer:', options: ['Autorização e controlo rigoroso (Stewardship)', 'Uso livre', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Evita o aparecimento de multirresistências.' },
        { text: 'A farmácia clínica na enfermaria visa:', options: ['Otimizar a terapia junto da equipa médica', 'Apenas entregar caixas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O farmacêutico participa ativamente nas decisões clínicas.' }
      ],
      exercises: [
        { text: 'Verificar a identidade do doente antes da administração:', options: ['Evita dar o remédio à pessoa errada', 'É opcional', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Um dos "certos" da administração de medicação.' },
        { text: 'Reportar erros ou "quase-erros" serve para:', options: ['Melhorar o sistema e evitar repetições', 'Castigar quem errou', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Cultura de segurança foca na melhoria do processo.' },
        { text: 'Manter a organização das prateleiras por som/grafia (LASA):', options: ['Evita trocas entre nomes parecidos', 'É apenas estética', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Fármacos Look-Alike Sound-Alike são fonte comum de erros.' },
        { text: 'Higienizar as mãos entre preparações:', options: ['Previne contaminações cruzadas', 'Nada', 'Gasta sabão', 'Nada'], correctIdx: 0, explanation: 'Pilar básico do controlo de infeção hospitalar.' },
        { text: 'Confirmar a validade e aspeto do fármaco:', options: ['Garante que o produto está em condições de uso', 'Nada', 'É perda de tempo', 'Nada'], correctIdx: 0, explanation: 'Alterações de cor ou partículas podem indicar degradação.' }
      ]
    }
  },
  'Farmacologia Clínica': {
    complaints: ['Medicamento não faz efeito.', 'Sintomas de toxicidade.', 'Dúvida sobre ajuste de dose.'],
    histories: ['Insuficiência renal ou hepática.', 'Variabilidade genética.', 'Uso de fármacos com janela estreita.'],
    symptoms: [['Nível plasmático fora do intervalo', 'Farmacocinética alterada'], ['Farmacodinâmica', 'Efeito teto']],
    evolutionTimes: ['Horas', 'Dias', 'Semanas'],
    functionalLimitations: ['Falência terapêutica.', 'Risco de toxicidade severa.'],
    questions: {
      evaluation: [
        { text: 'A monitorização de fármacos avalia:', options: ['Níveis no sangue', 'Cor da urina', 'Nada', 'Fome'], correctIdx: 0, explanation: 'Ajusta a dose para manter eficácia e segurança.' },
        { text: 'A depuração (clearance) renal indica:', options: ['A capacidade do rim em remover o fármaco', 'A cor da urina', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Fundamental para ajustar doses em insuficiência renal.' },
        { text: 'O volume de distribuição (Vd) relaciona:', options: ['A quantidade no corpo com a concentração no sangue', 'O peso do doente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Indica se o fármaco se distribui muito pelos tecidos ou fica no sangue.' },
        { text: 'A concentração mínima eficaz (CME) é:', options: ['O nível abaixo do qual não há efeito terapêutico', 'A dose máxima', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O fármaco deve estar acima deste nível para funcionar.' },
        { text: 'O estado de equilíbrio (steady-state) atinge-se após:', options: ['Cerca de 4 a 5 meias-vidas', '1 hora', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Quando a taxa de entrada é igual à taxa de eliminação.' }
      ],
      diagnosis: [
        { text: 'A biodisponibilidade é a:', options: ['Fração que chega à circulação', 'Velocidade', 'Nada', 'Cor'], correctIdx: 0, explanation: 'Indica quanto do fármaco é realmente aproveitado.' },
        { text: 'A janela terapêutica é o intervalo entre:', options: ['A dose eficaz e a dose tóxica', 'O pequeno-almoço e o jantar', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Fármacos com janela estreita são mais perigosos.' },
        { text: 'O efeito de primeira passagem ocorre no:', options: ['Fígado', 'Cérebro', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O metabolismo hepático reduz a quantidade de fármaco que chega ao sangue.' },
        { text: 'A afinidade de um fármaco pelo recetor define:', options: ['A força da ligação entre ambos', 'A cor do comprimido', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Quanto maior a afinidade, mais fácil é a ligação.' },
        { text: 'Um agonista é uma substância que:', options: ['Ativa um recetor e produz resposta', 'Bloqueia o recetor', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Mimetiza a ação de substâncias naturais do corpo.' }
      ],
      treatment: [
        { text: 'A meia-vida de um fármaco define o:', options: ['Intervalo entre tomas', 'Preço', 'Nada', 'Dormir'], correctIdx: 0, explanation: 'Tempo necessário para a concentração cair para metade.' },
        { text: 'A dose de carga serve para:', options: ['Atingir rapidamente níveis terapêuticos', 'Gastar mais remédio', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Usada quando se precisa de efeito imediato em fármacos lentos.' },
        { text: 'A via intravenosa garante:', options: ['100% de biodisponibilidade', 'Absorção lenta', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O fármaco entra diretamente na circulação.' },
        { text: 'A indução enzimática pode levar a:', options: ['Menor efeito de outros fármacos', 'Maior toxicidade sempre', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Aumenta o metabolismo e a eliminação de outros medicamentos.' },
        { text: 'O ajuste de dose em idosos deve considerar:', options: ['A redução da função renal e hepática', 'Apenas a idade', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Evita a acumulação e toxicidade por eliminação lenta.' }
      ],
      exercises: [
        { text: 'A farmacogenómica estuda a:', options: ['Resposta baseada nos genes', 'Nada', 'Musculação', 'Dormir'], correctIdx: 0, explanation: 'Explica porque pessoas reagem diferente ao mesmo fármaco.' },
        { text: 'A adesão terapêutica é influenciada por:', options: ['Complexidade do regime e efeitos secundários', 'Apenas o preço', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Regimes simples (1x ao dia) melhoram a adesão.' },
        { text: 'A monitorização de efeitos adversos deve ser:', options: ['Contínua durante todo o tratamento', 'Feita só no início', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Alguns efeitos só aparecem após uso prolongado.' },
        { text: 'O ensino ao doente sobre o fármaco inclui:', options: ['Como tomar, o que esperar e sinais de alerta', 'Nada', 'Apenas o nome', 'Nada'], correctIdx: 0, explanation: 'Aumenta a segurança e o sucesso do tratamento.' },
        { text: 'A revisão da medicação (medication review) visa:', options: ['Eliminar fármacos desnecessários ou perigosos', 'Aumentar a venda', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Reduz a polifarmácia e o risco de interações.' }
      ]
    }
  },
  'Toxicologia Medicamentosa': {
    complaints: ['Sobredosagem acidental.', 'Efeito adverso grave.', 'Tentativa de suicídio com fármacos.'],
    histories: ['Ingestão de paracetamol em excesso.', 'Uso de antidepressivos.', 'Mistura com álcool.'],
    symptoms: [['Hepatotoxicidade', 'Depressão respiratória'], ['Arritmias', 'Convulsões']],
    evolutionTimes: ['Minutos', 'Horas', 'Dias'],
    functionalLimitations: ['Risco de morte.', 'Danos permanentes em órgãos.'],
    questions: {
      evaluation: [
        { text: 'O antídoto para o paracetamol é:', options: ['N-acetilcisteína', 'Água', 'Nada', 'Aspirina'], correctIdx: 0, explanation: 'Repõe a glutationa e protege o fígado.' },
        { text: 'O nível sérico de um tóxico ajuda a:', options: ['Determinar a gravidade e o tratamento', 'Ver a cor do sangue', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Essencial em intoxicações por lítio, digoxina ou teofilina.' },
        { text: 'O eletrocardiograma (ECG) é vital para detetar:', options: ['Arritmias causadas por fármacos cardiotóxicos', 'Fraturas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Muitos antidepressivos e antipsicóticos afetam o intervalo QT.' },
        { text: 'A gasometria arterial avalia:', options: ['O equilíbrio ácido-base (acidose/alcalose)', 'Apenas o oxigénio', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Importante em intoxicações por salicilatos ou metanol.' },
        { text: 'A avaliação do estado de consciência (Escala de Glasgow):', options: ['Mede o nível de depressão do SNC', 'Vê a força muscular', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Indica o risco de aspiração e necessidade de entubação.' }
      ],
      diagnosis: [
        { text: 'Sinais de intoxicação por opioides:', options: ['Miose e bradipneia', 'Midríase', 'Nada', 'Fome'], correctIdx: 0, explanation: 'Pupilas "em ponta de alfinete" e respiração lenta.' },
        { text: 'A síndrome colinérgica (ex: inseticidas) causa:', options: ['Salivação, lacrimejo e diarreia', 'Boca seca', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Excesso de acetilcolina no organismo.' },
        { text: 'A intoxicação por benzodiazepinas causa:', options: ['Sonolência, ataxia e fala arrastada', 'Agitação extrema', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Depressão do sistema nervoso central.' },
        { text: 'O toxidrome simpaticomimético (ex: cocaína) causa:', options: ['Taquicardia, hipertensão e midríase', 'Bradicardia', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ativação excessiva do sistema simpático.' },
        { text: 'A insuficiência hepática aguda por paracetamol:', options: ['Ocorre por acumulação do metabolito tóxico NAPQI', 'É imediata', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Os sintomas graves aparecem geralmente após 24-48h.' }
      ],
      treatment: [
        { text: 'A lavagem gástrica deve ser feita:', options: ['Na 1ª hora após ingestão', 'Sempre', 'Nada', 'Nunca'], correctIdx: 0, explanation: 'Eficácia diminui drasticamente após 60 minutos.' },
        { text: 'O carvão ativado serve para:', options: ['Adsorver o tóxico no trato gastrointestinal', 'Provocar o vómito', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Impede a absorção do veneno para o sangue.' },
        { text: 'O Flumazenil é o antídoto para:', options: ['Benzodiazepinas', 'Opioides', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Reverte a sedação excessiva.' },
        { text: 'A Naloxona é usada para reverter:', options: ['Overdose de opioides (heroína, morfina)', 'Álcool', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Bloqueia os recetores opioides rapidamente.' },
        { text: 'A alcalinização urinária ajuda a eliminar:', options: ['Salicilatos (aspirina)', 'Paracetamol', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Aumenta a excreção renal de ácidos fracos.' }
      ],
      exercises: [
        { text: 'Manter medicamentos fora do alcance:', options: ['Previne intoxicações infantis', 'Nada', 'É opcional', 'Dói'], correctIdx: 0, explanation: 'Medida básica de segurança doméstica.' },
        { text: 'Nunca trocar medicamentos de embalagem:', options: ['Evita confusões fatais com outros produtos', 'Nada', 'É boa ideia', 'Nada'], correctIdx: 0, explanation: 'A embalagem original tem o nome e a validade.' },
        { text: 'Não induzir o vómito em caso de ingestão de corrosivos:', options: ['Evita nova queimadura no esófago', 'É o melhor a fazer', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O ácido/base queima ao entrar e ao sair.' },
        { text: 'Ter o número do Centro de Informação Antivenenos (CIAV):', options: ['Permite orientação rápida em caso de emergência', 'Nada', 'É inútil', 'Nada'], correctIdx: 0, explanation: 'Apoio especializado 24h por dia.' },
        { text: 'Eliminar medicamentos fora de uso na farmácia (Valormed):', options: ['Evita acumulação perigosa em casa', 'Nada', 'Pode ir para o lixo comum', 'Nada'], correctIdx: 0, explanation: 'Garante o tratamento seguro dos resíduos.' }
      ]
    }
  },
  'Farmacognosia': {
    complaints: ['Quero usar plantas medicinais.', 'Chá não está a fazer efeito.', 'Dúvida sobre interação com ervas.'],
    histories: ['Uso de fitoterapia.', 'Conhecimento popular.', 'Interesse em produtos naturais.'],
    symptoms: [['Princípio ativo natural', 'Metabolito secundário'], ['Toxicidade vegetal', 'Adulteração']],
    evolutionTimes: ['Semanas', 'Meses', 'Anos'],
    functionalLimitations: ['Risco de interações desconhecidas.', 'Falta de padronização.'],
    questions: {
      evaluation: [{ text: 'A farmacognosia estuda:', options: ['Drogas de origem natural', 'Sintéticos apenas', 'Nada', 'Dormir'], correctIdx: 0, explanation: 'Foca em plantas, animais e minerais medicinais.' }],
      diagnosis: [{ text: 'O princípio ativo é a:', options: ['Substância com efeito biológico', 'Planta toda', 'Nada', 'Água'], correctIdx: 0, explanation: 'Molécula responsável pela ação terapêutica.' }],
      treatment: [{ text: 'O Hipericão interage com:', options: ['Muitos medicamentos', 'Nada', 'Só água', 'Fome'], correctIdx: 0, explanation: 'É um potente indutor enzimático.' }],
      exercises: [{ text: 'Produtos naturais também podem:', options: ['Ser tóxicos e interagir', 'Ser sempre seguros', 'Nada', 'Cura tudo'], correctIdx: 0, explanation: 'Natural não significa isento de riscos.' }]
    }
  },
  'Tecnologia Farmacêutica': {
    complaints: ['Dificuldade em engolir comprimidos.', 'Necessidade de formulação especial.', 'Medicamento com sabor desagradável.'],
    histories: ['Doente pediátrico ou geriátrico.', 'Necessidade de libertação prolongada.', 'Alergia a excipientes.'],
    symptoms: [['Forma farmacêutica', 'Excipiente'], ['Estabilidade da fórmula', 'Solubilidade']],
    evolutionTimes: ['Dias', 'Semanas', 'Meses'],
    functionalLimitations: ['Incapacidade de tomar a forma padrão.', 'Baixa adesão por sabor/tamanho.'],
    questions: {
      evaluation: [{ text: 'Os excipientes servem para:', options: ['Dar forma e estabilidade', 'Curar', 'Nada', 'Dormir'], correctIdx: 0, explanation: 'Substâncias inertes que auxiliam a formulação.' }],
      diagnosis: [{ text: 'Cápsulas de libertação prolongada:', options: ['Não devem ser abertas', 'Podem mastigar-se', 'Nada', 'Fome'], correctIdx: 0, explanation: 'A abertura altera o perfil de absorção.' }],
      treatment: [{ text: 'A manipulação farmacêutica permite:', options: ['Personalizar a dose e forma', 'Nada', 'Gastar dinheiro', 'Dormir'], correctIdx: 0, explanation: 'Ajusta o medicamento às necessidades do doente.' }],
      exercises: [{ text: 'Conservar na embalagem original:', options: ['Protege da luz e humidade', 'Nada', 'É opcional', 'Dói'], correctIdx: 0, explanation: 'Garante a estabilidade até ao fim da validade.' }]
    }
  },
  'Análises Bromatológicas': {
    complaints: ['Suspeita de intoxicação alimentar.', 'Dúvida sobre rótulo nutricional.', 'Alteração no sabor do alimento.'],
    histories: ['Consumo de alimentos crus.', 'Surto em cantina.', 'Dieta específica.'],
    symptoms: [['Contaminação microbiológica', 'Aditivos alimentares'], ['Valor nutricional', 'Fraude alimentar']],
    evolutionTimes: ['Horas', 'Dias', 'Semanas'],
    functionalLimitations: ['Risco de surto alimentar.', 'Desnutrição ou obesidade.'],
    questions: {
      evaluation: [{ text: 'A bromatologia estuda os:', options: ['Alimentos', 'Medicamentos apenas', 'Nada', 'Ossos'], correctIdx: 0, explanation: 'Analisa composição, valor nutricional e higiene.' }],
      diagnosis: [{ text: 'A Salmonella é um perigo:', options: ['Biológico', 'Químico', 'Físico', 'Nada'], correctIdx: 0, explanation: 'Bactéria comum em ovos e carnes mal cozinhadas.' }],
      treatment: [{ text: 'A pasteurização serve para:', options: ['Eliminar patogénicos', 'Cozinhar', 'Nada', 'Dormir'], correctIdx: 0, explanation: 'Tratamento térmico que preserva o alimento.' }],
      exercises: [{ text: 'Lavar as mãos antes de cozinhar:', options: ['Evita contaminação cruzada', 'Nada', 'É opcional', 'Dói'], correctIdx: 0, explanation: 'Medida higiénica fundamental.' }]
    }
  },
  'Farmacovigilância': {
    complaints: ['Apareceu uma mancha após o fármaco.', 'Sinto-me mal com este lote.', 'O medicamento não fez nada.'],
    histories: ['Uso de medicamento novo no mercado.', 'Reação adversa prévia.', 'Suspeita de defeito de qualidade.'],
    symptoms: [['RAM (Reação Adversa)', 'Falta de eficácia'], ['Erro de medicação', 'Sinal de segurança']],
    evolutionTimes: ['Dias', 'Semanas', 'Meses'],
    functionalLimitations: ['Risco para a saúde pública.', 'Necessidade de retirada do mercado.'],
    questions: {
      evaluation: [{ text: 'A farmacovigilância deteta:', options: ['Reações adversas e riscos', 'Nada', 'Vendas', 'Dormir'], correctIdx: 0, explanation: 'Monitoriza a segurança após a comercialização.' }],
      diagnosis: [{ text: 'Uma RAM grave deve ser:', options: ['Notificada rapidamente', 'Esquecida', 'Nada', 'Fome'], correctIdx: 0, explanation: 'Permite atualizar a informação de segurança.' }],
      treatment: [{ text: 'O sistema de notificação serve para:', options: ['Proteger a saúde pública', 'Nada', 'Castigar médicos', 'Dormir'], correctIdx: 0, explanation: 'Identifica novos riscos desconhecidos.' }],
      exercises: [{ text: 'Ler o folheto informativo ajuda a:', options: ['Conhecer riscos e benefícios', 'Nada', 'Assustar', 'Dormir'], correctIdx: 0, explanation: 'Informa o doente sobre o que esperar.' }]
    }
  },
  'Atenção Farmacêutica': {
    complaints: ['Não consigo organizar os meus comprimidos.', 'Tenho medo de misturar as ervas com o remédio.', 'Sinto que tomo comprimidos a mais.'],
    histories: ['Idoso com múltiplas patologias.', 'Alta hospitalar recente.', 'Baixa literacia em saúde.'],
    symptoms: [['Problema Relacionado com Medicamento', 'Falta de adesão'], ['Duplicação terapêutica', 'Interação']],
    evolutionTimes: ['Meses', 'Anos', 'Semanas'],
    functionalLimitations: ['Incapacidade de gerir a própria saúde.', 'Risco de hospitalização.'],
    questions: {
      evaluation: [{ text: 'O acompanhamento farmacoterapêutico:', options: ['Melhora resultados de saúde', 'Nada', 'É só conversa', 'Dormir'], correctIdx: 0, explanation: 'Foca no doente e não apenas no fármaco.' }],
      diagnosis: [{ text: 'Um PRM (Problema Relacionado com Medicamento):', options: ['Pode causar insucesso ou dano', 'Nada', 'É normal', 'Fome'], correctIdx: 0, explanation: 'Qualquer evento que interfira no resultado desejado.' }],
      treatment: [{ text: 'O plano de cuidados farmacêuticos:', options: ['Define metas e intervenções', 'Nada', 'É opcional', 'Dormir'], correctIdx: 0, explanation: 'Estratégia para resolver problemas detetados.' }],
      exercises: [{ text: 'A educação para a saúde capacita:', options: ['O doente para o autocuidado', 'Nada', 'O médico', 'Dormir'], correctIdx: 0, explanation: 'Torna o doente parceiro no tratamento.' }]
    }
  },
  'Gestão Farmacêutica': {
    complaints: ['Medicamento está esgotado.', 'O preço subiu muito.', 'Dificuldade em gerir o stock.'],
    histories: ['Ruptura de stock nacional.', 'Gestão de inventário.', 'Controlo de custos hospitalares.'],
    symptoms: [['Falta de stock', 'Custo-benefício'], ['Gestão de compras', 'Logística']],
    evolutionTimes: ['Semanas', 'Meses', 'Anos'],
    functionalLimitations: ['Interrupção de tratamentos.', 'Prejuízo económico.'],
    questions: {
      evaluation: [{ text: 'A gestão de stock evita:', options: ['Rupturas e prazos expirados', 'Nada', 'Vendas', 'Dormir'], correctIdx: 0, explanation: 'Garante que o medicamento está lá quando preciso.' }],
      diagnosis: [{ text: 'A farmacoeconomia avalia o:', options: ['Custo e eficácia comparada', 'Nada', 'Lucro apenas', 'Fome'], correctIdx: 0, explanation: 'Ajuda a decidir onde investir recursos limitados.' }],
      treatment: [{ text: 'O sistema de inventário deve ser:', options: ['Rigoroso e atualizado', 'Nada', 'Aleatório', 'Dormir'], correctIdx: 0, explanation: 'Fundamental para a continuidade do serviço.' }],
      exercises: [{ text: 'Verificar validades regularmente:', options: ['Garante a segurança do utente', 'Nada', 'É opcional', 'Dói'], correctIdx: 0, explanation: 'Evita a dispensa de produtos ineficazes.' }]
    }
  },
  'Cosmetologia': {
    complaints: ['Pele muito seca e com escamas.', 'Reação a um creme de rosto.', 'Manchas de acne.'],
    histories: ['Pele atópica.', 'Uso de cosméticos inadequados.', 'Exposição solar sem proteção.'],
    symptoms: [['Dermatite de contacto', 'Xerose'], ['Comedões', 'Hiperpigmentação']],
    evolutionTimes: ['Dias', 'Semanas', 'Meses'],
    functionalLimitations: ['Desconforto estético.', 'Prurido e ardor.'],
    questions: {
      evaluation: [{ text: 'A cosmetologia foca na:', options: ['Beleza e saúde da pele', 'Cura de doenças graves', 'Nada', 'Dormir'], correctIdx: 0, explanation: 'Produtos para limpar, proteger e embelezar.' }],
      diagnosis: [{ text: 'Um cosmético hipoalergénico:', options: ['Tem menor risco de alergia', 'Nunca dá alergia', 'Nada', 'Fome'], correctIdx: 0, explanation: 'Formulado para minimizar reações.' }],
      treatment: [{ text: 'A hidratação cutânea mantém a:', options: ['Barreira protetora', 'Visão', 'Nada', 'Dormir'], correctIdx: 0, explanation: 'Evita a perda de água transepidérmica.' }],
      exercises: [{ text: 'Limpar a pele diariamente:', options: ['Remove impurezas e poluição', 'Nada', 'Estraga', 'Dói'], correctIdx: 0, explanation: 'Passo essencial na rotina de skincare.' }]
    }
  },
  'Radiofarmácia': {
    complaints: ['Vou fazer um exame de medicina nuclear.', 'Dúvida sobre radiação no corpo.', 'Necessidade de radiofármaco específico.'],
    histories: ['Diagnóstico de cancro.', 'Cintigrafia óssea marcada.', 'Tratamento de hipertiroidismo.'],
    symptoms: [['Emissão de radiação', 'Radiofármaco'], ['Captação específica', 'Decaimento radioativo']],
    evolutionTimes: ['Horas', 'Minutos', 'Dias'],
    functionalLimitations: ['Necessidade de isolamento temporário.', 'Risco de exposição radiológica.'],
    questions: {
      evaluation: [{ text: 'O radiofármaco é composto por:', options: ['Fármaco + Radionuclídeo', 'Só radiação', 'Nada', 'Água'], correctIdx: 0, explanation: 'O fármaco leva a radiação ao alvo específico.' }],
      diagnosis: [{ text: 'A medicina nuclear permite:', options: ['Ver a função dos órgãos', 'Ver só anatomia', 'Nada', 'Fome'], correctIdx: 0, explanation: 'Imagiologia funcional e molecular.' }],
      treatment: [{ text: 'O Iodo-131 é usado para:', options: ['Tratar cancro da tiroide', 'Gripe', 'Nada', 'Dormir'], correctIdx: 0, explanation: 'A tiroide capta o iodo que destrói as células.' }],
      exercises: [{ text: 'A proteção radiológica foca em:', options: ['Tempo, distância e blindagem', 'Nada', 'Sorte', 'Fome'], correctIdx: 0, explanation: 'Três pilares para reduzir a dose recebida.' }]
    }
  },
  'Ocupacional': {
    complaints: [
      'Síndrome do túnel cárpico por uso de rato.', 
      'Lombalgia por transporte de cargas.', 
      'Tensão muscular no pescoço.', 
      'Dor nos ombros ao digitar.', 
      'Fadiga visual e cefaleias.',
      'Dor nos punhos ao final do dia.',
      'Sensação de formigueiro nas mãos.',
      'Cansaço nas pernas por estar muito tempo em pé.',
      'Dor nas costas ao carregar pesos.',
      'Tensão nos trapézios e mandíbula.'
    ],
    histories: [
      'Ergonomia deficiente no posto de trabalho.', 
      'Jornadas laborais extensas sem pausas.', 
      'Esforço físico repetitivo e manual.', 
      'Ambiente de trabalho com vibrações constantes.', 
      'Postura estática prolongada em linha de montagem.',
      'Uso intensivo de ferramentas vibratórias.',
      'Trabalho em armazém com levantamento de cargas.',
      'Posto de trabalho com iluminação inadequada.',
      'Stress ocupacional elevado.',
      'Mudança recente de mobiliário de escritório.'
    ],
    symptoms: [
      ['LER/DORT', 'Tensão em trapézios', 'Parestesia mãos'], 
      ['Lombalgia ocupacional', 'Tensão lombar', 'Fadiga'], 
      ['Epicondilite', 'Dor ao digitar', 'Fraqueza punho'],
      ['Síndrome do desfiladeiro torácico', 'Mãos frias', 'Dor cervical'],
      ['Fascite plantar ocupacional', 'Dor ao apoio', 'Tensão']
    ],
    evolutionTimes: [
      'Anos de exposição laboral', '6 meses', '1 ano', '2 anos', '5 anos',
      'Início recente após mudança de posto', 'Progressivo há 3 meses',
      'Recorrente há 10 anos', 'Detetado em exame ocupacional', '8 meses'
    ],
    functionalLimitations: [
      'Dificuldade em permanecer sentado por longos períodos.',
      'Incapacidade de realizar movimentos repetitivos sem dor.',
      'Dificuldade em utilizar o teclado e rato do computador.',
      'Limitação na realização de tarefas que exijam força.',
      'Dor ao realizar movimentos de rotação do pescoço.',
      'Dificuldade em carregar pesos leves no ambiente de trabalho.',
      'Fadiga muscular precoce durante a jornada laboral.',
      'Dificuldade em manter a concentração devido ao desconforto.',
      'Limitação na prática de atividades de lazer após o trabalho.',
      'Necessidade de pausas frequentes para alívio da dor.'
    ],
    questions: {
      evaluation: [
        { text: 'A ergonomia foca na adaptação do:', options: ['Trabalho ao homem', 'Homem ao trabalho', 'Salário ao esforço', 'Tempo à produção'], correctIdx: 0, explanation: 'Ergonomia visa adaptar o ambiente às capacidades humanas.' },
        { text: 'O questionário de Nordic avalia:', options: ['Sintomas osteomusculares', 'Força máxima', 'Visão', 'Audição'], correctIdx: 0, explanation: 'É uma ferramenta padrão para rastreio de dores ocupacionais.' }
      ],
      diagnosis: [
        { text: 'Pausas ativas durante o trabalho ajudam a:', options: ['Reduzir fadiga muscular', 'Aumentar o stress', 'Diminuir a produtividade', 'Causar mais lesões'], correctIdx: 0, explanation: 'Pausas curtas e exercícios reduzem a sobrecarga muscular.' },
        { text: 'A síndrome de Burnout é relacionada ao:', options: ['Stress crónico no trabalho', 'Excesso de exercício', 'Falta de sono apenas', 'Infeção viral'], correctIdx: 0, explanation: 'É um estado de exaustão emocional e física ligado ao trabalho.' }
      ],
      treatment: [
        { text: 'A ginástica laboral deve ser:', options: ['Curta e específica', 'Muito intensa', 'Obrigatória por 2 horas', 'Apenas alongamentos'], correctIdx: 0, explanation: 'Deve ser integrada no horário de trabalho de forma leve.' },
        { text: 'A correção da altura do monitor visa prevenir:', options: ['Cervicalgia', 'Dor no pé', 'Diarreia', 'Queda de cabelo'], correctIdx: 0, explanation: 'O monitor deve estar ao nível dos olhos para evitar flexão cervical.' }
      ],
      exercises: [
        { text: 'Alongamentos de punho e dedos são vitais para:', options: ['Prevenir LER/DORT', 'Aumentar a força de pernas', 'Melhorar a voz', 'Reduzir a altura'], correctIdx: 0, explanation: 'Compensam a postura de flexão constante ao digitar.' },
        { text: 'Exercícios de mobilidade torácica ajudam quem:', options: ['Trabalha muito tempo sentado', 'Corre maratonas', 'Dorme de barriga para baixo', 'Nenhuma das anteriores'], correctIdx: 0, explanation: 'Contrariam a postura cifótica induzida pelo trabalho de secretária.' }
      ]
    }
  },
  'Cardiologia': {
    complaints: [
      'Dor torácica em aperto ao esforço.', 'Palpitações e tonturas.', 'Falta de ar ao deitar.', 
      'Inchaço nos tornozelos.', 'Cansaço extremo inexplicável.', 'Desmaios súbitos.',
      'Sensação de batimento irregular.', 'Dor no braço esquerdo e mandíbula.', 'Suores frios e náuseas.',
      'Dificuldade em subir escadas por fadiga.'
    ],
    histories: [
      'Hipertensão arterial não controlada.', 'História familiar de enfarte precoce.', 'Tabagismo ativo (20 cigarros/dia).',
      'Diabetes Mellitus tipo 2.', 'Sedentarismo e obesidade grau I.', 'Stress laboral elevado.',
      'Colesterol elevado (LDL > 160).', 'Uso de contracetivos orais e tabagismo.', 'História de febre reumática na infância.',
      'Consumo excessivo de álcool e sal.'
    ],
    symptoms: [
      ['Dor retroesternal', 'Irradiação para braço', 'Diaforese'], 
      ['Dispneia de esforço', 'Ortopneia', 'Edema maleolar'], 
      ['Palpitações', 'Pulso irregular', 'Ansiedade'],
      ['Cianose periférica', 'Extremidades frias', 'Turgência jugular'],
      ['Síncope', 'Hipotensão ortostática', 'Bradicardia']
    ],
    evolutionTimes: ['2 horas (agudo)', '1 semana', '1 mês', '6 meses', 'Início súbito', 'Recorrente há anos'],
    functionalLimitations: [
      'Incapacidade de realizar caminhadas longas.', 'Dificuldade em subir um lanço de escadas.', 'Limitação nas tarefas domésticas.',
      'Necessidade de dormir com 3 almofadas.', 'Interrupção do trabalho por fadiga.', 'Medo de realizar esforço físico.'
    ],
    questions: {
      evaluation: [
        { text: 'Qual o exame padrão para avaliar o ritmo cardíaco?', options: ['Eletrocardiograma (ECG)', 'Raio-X', 'Ecografia abdominal', 'Análise de urina'], correctIdx: 0, explanation: 'O ECG regista a atividade elétrica do coração.' },
        { text: 'A medição da tensão arterial deve ser feita:', options: ['Em ambos os braços no repouso', 'Apenas no braço direito', 'A correr', 'Depois de beber café'], correctIdx: 0, explanation: 'Garante a deteção de assimetrias e valores basais.' },
        { text: 'O teste de esforço visa avaliar:', options: ['Resposta cardíaca ao stress físico', 'Força muscular das pernas', 'Capacidade de visão', 'Audição'], correctIdx: 0, explanation: 'Deteta isquemia induzida pelo exercício.' },
        { text: 'A auscultação cardíaca foca em:', options: ['Sopros e ritmos anormais', 'Sons do pulmão apenas', 'Ruídos do estômago', 'Nada'], correctIdx: 0, explanation: 'Identifica valvulopatias e arritmias.' },
        { text: 'O ecocardiograma usa:', options: ['Ultrassom', 'Radiação X', 'Magnetismo', 'Luz'], correctIdx: 0, explanation: 'Permite ver a estrutura e função das câmaras cardíacas.' },
        { text: 'A oximetria de pulso indica:', options: ['Saturação de oxigénio', 'Nível de glicose', 'Colesterol', 'Nada'], correctIdx: 0, explanation: 'Mede a eficácia da troca gasosa e transporte.' }
      ],
      diagnosis: [
        { text: 'Dor torácica que alivia com repouso sugere:', options: ['Angina estável', 'Enfarte agudo', 'Gripe', 'Dor muscular'], correctIdx: 0, explanation: 'A angina estável é provocada pelo esforço e cede ao repouso.' },
        { text: 'A insuficiência cardíaca esquerda causa:', options: ['Congestão pulmonar e dispneia', 'Inchaço apenas nas pernas', 'Dor de estômago', 'Cefaleia'], correctIdx: 0, explanation: 'O sangue acumula-se nos pulmões por falha do ventrículo esquerdo.' },
        { text: 'A fibrilhação auricular caracteriza-se por:', options: ['Ritmo irregular e risco de AVC', 'Ritmo muito lento', 'Cura espontânea', 'Nada'], correctIdx: 0, explanation: 'É a arritmia sustentada mais comum.' },
        { text: 'O enfarte do miocárdio é causado por:', options: ['Obstrução de uma artéria coronária', 'Falta de ar', 'Excesso de exercício apenas', 'Frio'], correctIdx: 0, explanation: 'A interrupção do fluxo causa morte do tecido cardíaco.' },
        { text: 'A hipertensão arterial é um fator de risco para:', options: ['AVC e Insuficiência Cardíaca', 'Miopia', 'Cáries', 'Gripe'], correctIdx: 0, explanation: 'Sobrecarga crónica do sistema cardiovascular.' },
        { text: 'A pericardite é a inflamação da:', options: ['Membrana que envolve o coração', 'Músculo cardíaco', 'Válvula mitral', 'Aorta'], correctIdx: 0, explanation: 'Causa dor torácica que piora ao inspirar.' }
      ],
      treatment: [
        { text: 'Os betabloqueadores servem para:', options: ['Reduzir a frequência cardíaca e TA', 'Aumentar a energia', 'Curar infeções', 'Nada'], correctIdx: 0, explanation: 'Diminuem o trabalho do coração.' },
        { text: 'A nitroglicerina sublingual é usada para:', options: ['Aliviar dor de angina rapidamente', 'Baixar a febre', 'Dormir melhor', 'Nada'], correctIdx: 0, explanation: 'Promove a vasodilatação coronária imediata.' },
        { text: 'As estatinas visam:', options: ['Controlar o colesterol LDL', 'Aumentar a glicose', 'Subir a tensão', 'Nada'], correctIdx: 0, explanation: 'Previnem a formação de placas de ateroma.' },
        { text: 'A angioplastia é um procedimento para:', options: ['Desobstruir artérias com balão/stent', 'Trocar o coração', 'Medir a visão', 'Nada'], correctIdx: 0, explanation: 'Restaura o fluxo sanguíneo coronário.' },
        { text: 'O uso de diuréticos ajuda na:', options: ['Redução do edema e volume sanguíneo', 'Hidratação', 'Ganho de peso', 'Nada'], correctIdx: 0, explanation: 'Eliminam o excesso de sal e água.' },
        { text: 'A reabilitação cardíaca foca em:', options: ['Exercício supervisionado e dieta', 'Repouso absoluto', 'Apenas medicação', 'Nada'], correctIdx: 0, explanation: 'Melhora a capacidade funcional e reduz mortalidade.' }
      ],
      exercises: [
        { text: 'O exercício aeróbico deve ser:', options: ['Moderado e regular', 'Extremo e raro', 'Evitado', 'Apenas musculação'], correctIdx: 0, explanation: 'Caminhada, natação ou ciclismo fortalecem o coração.' },
        { text: 'A caminhada de 30 min por dia:', options: ['Melhora a saúde cardiovascular', 'Faz mal aos joelhos sempre', 'É inútil', 'Nada'], correctIdx: 0, explanation: 'Recomendação base para prevenção primária e secundária.' },
        { text: 'O treino de força em cardiopatas:', options: ['Deve ser leve e sem prender a respiração', 'É proibido', 'Deve ser máximo', 'Nada'], correctIdx: 0, explanation: 'Ajuda na autonomia sem sobrecarregar o coração excessivamente.' },
        { text: 'A cessação tabágica é:', options: ['A medida mais eficaz de tratamento', 'Opcional', 'Irrelevante após os 60 anos', 'Nada'], correctIdx: 0, explanation: 'Reduz drasticamente o risco de novos eventos.' },
        { text: 'O controlo do peso reduz a:', options: ['Sobrecarga cardíaca', 'Visão', 'Audição', 'Nada'], correctIdx: 0, explanation: 'Menos massa corporal exige menos esforço do coração.' },
        { text: 'Técnicas de relaxamento ajudam a:', options: ['Controlar a TA e stress', 'Aumentar a frequência cardíaca', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Reduzem a ativação do sistema simpático.' }
      ]
    }
  },
  'Pediatria': {
    complaints: [
      'Febre alta e irritabilidade.', 'Tosse e pieira há 2 dias.', 'Vómitos e diarreia persistentes.', 
      'Manchas vermelhas no corpo.', 'Dor de ouvidos e choro inconsolável.', 'Falta de apetite e apatia.',
      'Dificuldade em respirar (nariz entupido).', 'Dor abdominal súbita.', 'Atraso no crescimento.',
      'Comportamento estranho ou sonolência excessiva.'
    ],
    histories: [
      'Contacto com crianças doentes na creche.', 'Calendário vacinal incompleto.', 'Nascimento prematuro.',
      'Introdução de novos alimentos recente.', 'História de alergias na família.', 'Episódios prévios de bronquiolite.',
      'Mudança de ambiente ou stress familiar.', 'Exposição a fumo de tabaco em casa.', 'Picada de inseto recente.',
      'Ingestão acidental de produto desconhecido.'
    ],
    symptoms: [
      ['Febre 39ºC', 'Exantema maculopapular', 'Prurido'], 
      ['Tosse sibilante', 'Tiragem subcostal', 'Taquipneia'], 
      ['Diarreia líquida', 'Sinais de desidratação', 'Olhos encovados'],
      ['Otorreia', 'Membrana timpânica hiperemiada', 'Febre'],
      ['Vómitos em jato', 'Distensão abdominal', 'Ausência de fezes']
    ],
    evolutionTimes: ['12 horas', '24 horas', '3 dias', '1 semana', 'Início súbito', 'Recorrente'],
    functionalLimitations: [
      'Recusa alimentar.', 'Dificuldade em dormir.', 'Incapacidade de brincar.',
      'Choro persistente.', 'Dificuldade na marcha (se já caminhar).', 'Apatia e falta de interação.'
    ],
    questions: {
      evaluation: [
        { text: 'O triângulo de avaliação pediátrica observa:', options: ['Aparência, Respiração e Circulação', 'Peso, Altura e Idade', 'Apenas a febre', 'Nada'], correctIdx: 0, explanation: 'Avaliação visual rápida do estado da criança.' },
        { text: 'A medição da temperatura retal é:', options: ['A mais precisa em bebés', 'Proibida', 'Menos fiável', 'Nada'], correctIdx: 0, explanation: 'Reflete melhor a temperatura central em lactentes.' },
        { text: 'A fontanela (moleirinha) deprimida sugere:', options: ['Desidratação', 'Fome', 'Sono', 'Inteligência'], correctIdx: 0, explanation: 'Sinal de perda grave de líquidos.' },
        { text: 'A auscultação pulmonar na criança foca em:', options: ['Sibilância e fervores', 'Sons do coração apenas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Identifica obstruções ou infeções respiratórias.' },
        { text: 'O peso e altura devem ser registados em:', options: ['Curvas de percentil', 'Livro de notas apenas', 'Não é necessário', 'Nada'], correctIdx: 0, explanation: 'Monitoriza o crescimento em relação à média populacional.' },
        { text: 'A observação da hidratação inclui:', options: ['Mucosas, choro com lágrimas e urina', 'Apenas a cor da pele', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Avalia o balanço hídrico da criança.' }
      ],
      diagnosis: [
        { text: 'A bronquiolite é causada principalmente por:', options: ['Vírus (VRS)', 'Bactérias', 'Frio apenas', 'Açúcar'], correctIdx: 0, explanation: 'Infeção viral das pequenas vias aéreas.' },
        { text: 'A otite média aguda causa frequentemente:', options: ['Dor de ouvidos e febre', 'Dor de barriga', 'Tosse', 'Nada'], correctIdx: 0, explanation: 'Infeção comum após constipações.' },
        { text: 'O exantema súbito (6ª doença) caracteriza-se por:', options: ['Febre alta que desaparece e surge manchas', 'Manchas que coçam muito', 'Tosse', 'Nada'], correctIdx: 0, explanation: 'Doença viral comum na infância.' },
        { text: 'A gastroenterite aguda requer atenção à:', options: ['Desidratação', 'Força muscular', 'Visão', 'Nada'], correctIdx: 0, explanation: 'A perda de líquidos em crianças é muito rápida.' },
        { text: 'A asma pediátrica manifesta-se por:', options: ['Tosse noturna e pieira', 'Febre alta', 'Manchas na pele', 'Nada'], correctIdx: 0, explanation: 'Inflamação crónica das vias aéreas.' },
        { text: 'A varicela apresenta-se com:', options: ['Vesículas pruriginosas em várias fases', 'Apenas febre', 'Dor de garganta', 'Nada'], correctIdx: 0, explanation: 'Doença infeciosa altamente contagiosa.' }
      ],
      treatment: [
        { text: 'O paracetamol em crianças deve ser doseado por:', options: ['Peso', 'Idade apenas', 'Altura', 'Desejo dos pais'], correctIdx: 0, explanation: 'Garante a segurança e eficácia da dose.' },
        { text: 'A lavagem nasal com soro é vital para:', options: ['Desobstruir as vias aéreas', 'Curar a febre', 'Alimentar a criança', 'Nada'], correctIdx: 0, explanation: 'Ajuda a criança a respirar e comer melhor.' },
        { text: 'O soro de reidratação oral é usado em:', options: ['Diarreia e vómitos', 'Tosse', 'Dor de ouvidos', 'Nada'], correctIdx: 0, explanation: 'Repõe água e eletrólitos perdidos.' },
        { text: 'Os antibióticos em pediatria:', options: ['Só devem ser usados em infeções bacterianas', 'Curam gripes e vírus', 'São opcionais', 'Nada'], correctIdx: 0, explanation: 'O uso indevido cria resistências.' },
        { text: 'A hidratação é a base do tratamento em:', options: ['Quase todas as doenças infantis', 'Apenas fraturas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Manter o equilíbrio hídrico é fundamental.' },
        { text: 'O repouso e conforto ajudam na:', options: ['Recuperação do sistema imunitário', 'Piora da doença', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Permite ao corpo focar na cura.' }
      ],
      exercises: [
        { text: 'O brincar é considerado:', options: ['A principal atividade de desenvolvimento', 'Perda de tempo', 'Obrigação', 'Nada'], correctIdx: 0, explanation: 'Através do jogo a criança aprende e recupera.' },
        { text: 'Estimular o gatinhar ajuda na:', options: ['Coordenação e força', 'Visão apenas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Etapa importante do desenvolvimento motor.' },
        { text: 'A leitura para a criança promove:', options: ['Desenvolvimento cognitivo e linguagem', 'Sono apenas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Estimula o cérebro e o vínculo afetivo.' },
        { text: 'Atividades ao ar livre ajudam na:', options: ['Síntese de Vitamina D e imunidade', 'Apenas em ficar sujo', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O sol e o movimento são essenciais.' },
        { text: 'Limitar o tempo de ecrã (TV/Tablet) previne:', options: ['Atrasos no desenvolvimento e sono', 'Cáries', 'Fraturas', 'Nada'], correctIdx: 0, explanation: 'O excesso de ecrãs é prejudicial em idades precoces.' },
      ]
    }
  },
  'Pneumologia': {
    complaints: [
      'Tosse persistente com expetoração amarelada.', 'Falta de ar ao caminhar.', 'Dor no peito ao respirar fundo.', 
      'Pieira (assobio) no peito à noite.', 'Tosse com sangue (hemoptise).', 'Cansaço extremo e perda de peso.',
      'Rouquidão persistente.', 'Febre e arrepios de frio.', 'Dificuldade em respirar em ambientes com fumo.',
      'Sensação de aperto no peito.'
    ],
    histories: [
      'Tabagismo pesado (40 maços-ano).', 'Exposição profissional a amianto ou poeiras.', 'História de asma na infância.',
      'Internamento recente por pneumonia.', 'Contacto com doente com tuberculose.', 'Uso de inaladores de forma irregular.',
      'Alergias sazonais e rinite.', 'Refluxo gastroesofágico.', 'História de cancro do pulmão na família.',
      'Trabalho em minas ou construção civil.'
    ],
    symptoms: [
      ['Tosse produtiva', 'Febre', 'Dor pleurítica'], 
      ['Dispneia', 'Sibilância', 'Uso de músculos acessórios'], 
      ['Hemoptise', 'Perda de peso', 'Sudorese noturna'],
      ['Roncos e fervores à auscultação', 'Cianose labial'],
      ['Tosse seca', 'Dificuldade inspiratória', 'Aperto torácico']
    ],
    evolutionTimes: ['3 dias', '2 semanas', '1 mês', '6 meses', 'Crónico há anos', 'Progressivo'],
    functionalLimitations: [
      'Incapacidade de subir escadas sem parar.', 'Dificuldade em falar frases longas.', 'Limitação na prática de desporto.',
      'Necessidade de oxigénio em casa.', 'Interrupção do sono por tosse.', 'Evita sair de casa em dias frios.'
    ],
    questions: {
      evaluation: [
        { text: 'A espirometria avalia:', options: ['Volumes e fluxos pulmonares', 'A cor do pulmão', 'O batimento cardíaco', 'Nada'], correctIdx: 0, explanation: 'É o exame fundamental para avaliar a função respiratória.' },
        { text: 'A oximetria de pulso mede:', options: ['Saturação de oxigénio no sangue', 'Nível de açúcar', 'Tensão arterial', 'Nada'], correctIdx: 0, explanation: 'Indica a eficácia da oxigenação tecidual.' },
        { text: 'O Raio-X de tórax serve para ver:', options: ['Infiltrados, massas ou derrames', 'Fraturas no pé', 'Cáries', 'Nada'], correctIdx: 0, explanation: 'Permite visualizar a estrutura pulmonar e pleural.' },
        { text: 'A auscultação pulmonar deteta:', options: ['Sons anormais como fervores ou sibilância', 'Sons do estômago apenas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Identifica obstruções ou presença de líquido.' },
        { text: 'A análise da expetoração (escarro) serve para:', options: ['Identificar agentes infeciosos', 'Ver a cor dos olhos', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Guia a escolha do antibiótico correto.' },
        { text: 'O teste de marcha de 6 minutos avalia:', options: ['Capacidade funcional e tolerância ao esforço', 'Velocidade de corrida', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Mede o impacto da doença respiratória no dia-a-dia.' }
      ],
      diagnosis: [
        { text: 'A DPOC é causada principalmente por:', options: ['Tabagismo', 'Falta de exercício', 'Comer muito doce', 'Nada'], correctIdx: 0, explanation: 'A exposição ao fumo do tabaco causa inflamação crónica.' },
        { text: 'A pneumonia caracteriza-se por:', options: ['Infeção do parênquima pulmonar', 'Apenas tosse seca', 'Dor de pernas', 'Nada'], correctIdx: 0, explanation: 'Causa consolidação alveolar visível no Raio-X.' },
        { text: 'A asma é uma doença:', options: ['Inflamatória crónica das vias aéreas', 'Contagiosa', 'Curável com 1 comprimido', 'Nada'], correctIdx: 0, explanation: 'Causa episódios reversíveis de obstrução brônquica.' },
        { text: 'O cancro do pulmão manifesta-se frequentemente por:', options: ['Tosse persistente e hemoptise', 'Dor de dentes', 'Manchas na pele', 'Nada'], correctIdx: 0, explanation: 'Sintomas de alarme que requerem investigação rápida.' },
        { text: 'A tuberculose é causada por:', options: ['Mycobacterium tuberculosis', 'Um vírus', 'Frio', 'Nada'], correctIdx: 0, explanation: 'Bactéria transmitida por via aérea.' },
        { text: 'O derrame pleural é a:', options: ['Acumulação de líquido no espaço pleural', 'Inflamação do pulmão', 'Falta de ar', 'Nada'], correctIdx: 0, explanation: 'Comprime o pulmão e dificulta a expansão.' }
      ],
      treatment: [
        { text: 'Os broncodilatadores servem para:', options: ['Abrir as vias aéreas', 'Parar a febre', 'Curar infeções', 'Nada'], correctIdx: 0, explanation: 'Relaxam o músculo liso dos brônquios.' },
        { text: 'Os corticoides inalados visam:', options: ['Reduzir a inflamação das vias aéreas', 'Aumentar os músculos', 'Curar a dor', 'Nada'], correctIdx: 0, explanation: 'Tratamento de base para o controlo da asma e DPOC.' },
        { text: 'A oxigenoterapia é indicada em:', options: ['Hipoxemia crónica', 'Qualquer tosse', 'Cansaço leve', 'Nada'], correctIdx: 0, explanation: 'Mantém níveis seguros de oxigénio nos órgãos.' },
        { text: 'A fisioterapia respiratória ajuda a:', options: ['Limpar secreções e melhorar a ventilação', 'Substituir os remédios', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Técnicas que auxiliam na higiene brônquica.' },
        { text: 'A cessação tabágica é:', options: ['A medida mais importante para travar a DPOC', 'Opcional', 'Inútil', 'Nada'], correctIdx: 0, explanation: 'É a única intervenção que altera o declínio da função pulmonar.' },
        { text: 'As vacinas da gripe e pneumonia previnem:', options: ['Exacerbações e complicações graves', 'A asma', 'O cancro', 'Nada'], correctIdx: 0, explanation: 'Protegem doentes vulneráveis de infeções fatais.' }
      ],
      exercises: [
        { text: 'A respiração com lábios franzidos ajuda a:', options: ['Manter as vias aéreas abertas por mais tempo', 'Respirar mais rápido', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Cria uma pressão positiva que evita o colapso brônquico.' },
        { text: 'Caminhadas regulares melhoram a:', options: ['Capacidade aeróbica e reduzem a dispneia', 'Visão', 'Audição', 'Nada'], correctIdx: 0, explanation: 'O treino muscular reduz a demanda ventilatória.' },
        { text: 'Exercícios de expansão torácica visam:', options: ['Melhorar a ventilação basal', 'Fortalecer os braços apenas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Aumentam a mobilidade da grelha costal.' },
        { text: 'O uso de incentivadores inspiratórios ajuda a:', options: ['Prevenir atelectasias (colapso pulmonar)', 'Curar a tosse', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Estimulam inspirações profundas e sustentadas.' },
        { text: 'A hidratação adequada é importante para:', options: ['Fluir as secreções (tornar mais fáceis de tossir)', 'Aumentar a febre', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Mantém o muco menos espesso.' },
        { text: 'Técnicas de relaxamento reduzem a:', options: ['Ansiedade associada à falta de ar', 'Capacidade pulmonar', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ajudam a controlar o pânico durante crises de dispneia.' }
      ]
    }
  },
  'Gastroenterologia': {
    complaints: [
      'Dor abdominal tipo cólica.', 'Azia e refluxo ácido constante.', 'Diarreia persistente há 1 semana.', 
      'Prisão de ventre (obstipação) severa.', 'Sangue nas fezes.', 'Náuseas e vómitos frequentes.',
      'Inchaço abdominal (distensão).', 'Dificuldade em engolir (disfagia).', 'Pele e olhos amarelados (icterícia).',
      'Perda de apetite e emagrecimento.'
    ],
    histories: [
      'Consumo excessivo de álcool.', 'Uso prolongado de anti-inflamatórios.', 'História familiar de cancro do cólon.',
      'Infeção por Helicobacter pylori.', 'Intolerância ao glúten ou lactose.', 'Stress elevado e síndrome do cólon irritável.',
      'Viagem recente a país com saneamento precário.', 'Hemorroidas ou fissuras anais.', 'Cálculos na vesícula (pedras).',
      'Hepatite crónica.'
    ],
    symptoms: [
      ['Epigastralgia', 'Pirose', 'Regurgitação'], 
      ['Dor na fossa ilíaca direita', 'Febre', 'Náuseas'], 
      ['Hemorragia digestiva', 'Melenas', 'Anemia'],
      ['Icterícia', 'Colúria', 'Acolia fecal'],
      ['Alternância entre diarreia e obstipação', 'Muco nas fezes']
    ],
    evolutionTimes: ['24 horas', '1 semana', '1 mês', '6 meses', 'Crónico recorrente', 'Início súbito'],
    functionalLimitations: [
      'Restrição alimentar severa.', 'Dificuldade em trabalhar por dor abdominal.', 'Necessidade de estar perto de uma casa de banho.',
      'Interrupção do sono por refluxo.', 'Fraqueza por má absorção de nutrientes.', 'Impacto social por flatulência ou urgência.'
    ],
    questions: {
      evaluation: [
        { text: 'A endoscopia digestiva alta visualiza:', options: ['Esófago, estômago e duodeno', 'Cólon apenas', 'Fígado', 'Nada'], correctIdx: 0, explanation: 'Exame chave para ver úlceras e inflamações superiores.' },
        { text: 'A colonoscopia é o exame padrão para:', options: ['Rastreio de cancro do cólon e pólipos', 'Ver o estômago', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Permite ver todo o intestino grosso e reto.' },
        { text: 'A ecografia abdominal avalia bem:', options: ['Fígado, vesícula e pâncreas', 'O interior do estômago', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ótima para detetar pedras na vesícula ou massas.' },
        { text: 'A pesquisa de sangue oculto nas fezes serve para:', options: ['Deteção precoce de lesões no cólon', 'Ver se tem parasitas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Rastreio simples para cancro colorretal.' },
        { text: 'O teste do hálito deteta a presença de:', options: ['Helicobacter pylori', 'Diabetes', 'Gripe', 'Nada'], correctIdx: 0, explanation: 'Bactéria associada a úlceras e gastrites.' },
        { text: 'A palpação abdominal procura:', options: ['Massas, dor ou organomegalias', 'Sons do coração', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Parte essencial do exame físico gastrointestinal.' }
      ],
      diagnosis: [
        { text: 'A gastrite é a:', options: ['Inflamação da mucosa do estômago', 'Inflamação do fígado', 'Dor de dentes', 'Nada'], correctIdx: 0, explanation: 'Causada por álcool, stress ou H. pylori.' },
        { text: 'O refluxo gastroesofágico (GERD) causa:', options: ['Azia e retorno de ácido para a boca', 'Diarreia', 'Febre alta', 'Nada'], correctIdx: 0, explanation: 'Falha no esfíncter esofágico inferior.' },
        { text: 'A apendicite manifesta-se tipicamente com:', options: ['Dor no lado inferior direito do abdómen', 'Dor no ombro', 'Dor de cabeça', 'Nada'], correctIdx: 0, explanation: 'Emergência cirúrgica comum.' },
        { text: 'A cirrose hepática é o:', options: ['Estágio avançado de cicatrização do fígado', 'Fígado com gordura apenas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Resulta de lesão crónica (álcool, hepatites).' },
        { text: 'A doença celíaca é uma:', options: ['Intolerância permanente ao glúten', 'Alergia ao leite', 'Falta de açúcar', 'Nada'], correctIdx: 0, explanation: 'Causa inflamação no intestino delgado.' },
        { text: 'A colelitíase é a presença de:', options: ['Pedras na vesícula biliar', 'Pedras no rim', 'Gases', 'Nada'], correctIdx: 0, explanation: 'Pode causar cólicas biliares intensas.' }
      ],
      treatment: [
        { text: 'Os protetores gástricos (ex: Omeprazol) servem para:', options: ['Reduzir a produção de ácido', 'Curar a diarreia', 'Aumentar o apetite', 'Nada'], correctIdx: 0, explanation: 'Inibidores da bomba de protões.' },
        { text: 'A dieta rica em fibras ajuda na:', options: ['Obstipação e saúde do cólon', 'Cura de úlceras', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Melhora o trânsito intestinal.' },
        { text: 'Os antibióticos são usados para erradicar:', options: ['Helicobacter pylori', 'Gases', 'Azia', 'Nada'], correctIdx: 0, explanation: 'Tratamento combinado para curar úlceras.' },
        { text: 'Evitar deitar-se logo após comer ajuda no:', options: ['Refluxo gastroesofágico', 'Emagrecimento', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A gravidade ajuda a manter o conteúdo no estômago.' },
        { text: 'Os probióticos podem ajudar a:', options: ['Equilibrar a flora intestinal', 'Matar vírus', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Úteis após antibióticos ou em diarreias.' },
        { text: 'A cirurgia (colecistectomia) é o tratamento para:', options: ['Pedras na vesícula com sintomas', 'Gastrite', 'Hemorroidas leves', 'Nada'], correctIdx: 0, explanation: 'Remoção da vesícula biliar.' }
      ],
      exercises: [
        { text: 'Caminhadas leves após as refeições:', options: ['Estimulam a digestão e motilidade', 'Causam vómitos sempre', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O movimento ajuda o trânsito gastrointestinal.' },
        { text: 'Exercícios de fortalecimento abdominal:', options: ['Podem ajudar na função intestinal', 'Causam úlceras', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Melhoram a pressão intra-abdominal necessária para a evacuação.' },
        { text: 'Técnicas de respiração diafragmática:', options: ['Reduzem o stress e ajudam na digestão', 'Não fazem nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O sistema digestivo é muito sensível ao stress.' },
        { text: 'Beber 2L de água por dia previne:', options: ['Obstipação (prisão de ventre)', 'Azia', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A água é essencial para formar fezes macias.' },
        { text: 'Evitar roupas muito apertadas na cintura:', options: ['Reduz a pressão abdominal e refluxo', 'É apenas moda', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Menos pressão externa facilita o trabalho do estômago.' },
        { text: 'Praticar ioga ou meditação ajuda em:', options: ['Síndrome do cólon irritável', 'Fraturas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O eixo cérebro-intestino é fundamental nestas patologias.' }
      ]
    }
  },
  'Endocrinologia': {
    complaints: [
      'Sede excessiva e urina frequente.', 'Perda de peso inexplicável.', 'Cansaço e intolerância ao frio.', 
      'Aumento de volume no pescoço (bócio).', 'Tremores e palpitações.', 'Alterações no ciclo menstrual.',
      'Excesso de pelos ou acne súbita.', 'Dificuldade em perder peso.', 'Visão turva.',
      'Feridas que demoram a cicatrizar.'
    ],
    histories: [
      'História familiar de Diabetes Mellitus.', 'Doença autoimune conhecida (ex: Vitiligo).', 'Uso crónico de corticoides.',
      'Gravidez recente (diabetes gestacional).', 'Radioterapia cervical prévia.', 'Dieta rica em açúcares e sedentarismo.',
      'Nódulos na tiroide detetados em rotina.', 'Stress físico ou emocional severo.', 'Uso de suplementos hormonais.',
      'Baixo consumo de iodo.'
    ],
    symptoms: [
      ['Poliúria', 'Polidipsia', 'Polifagia'], 
      ['Exoftalmia', 'Taquicardia', 'Perda de peso'], 
      ['Bradicardia', 'Pele seca', 'Obstipação'],
      ['Acantose nigricans', 'Obesidade central', 'Estrias purpúreas'],
      ['Glicemia em jejum elevada', 'HbA1c > 6.5%']
    ],
    evolutionTimes: ['1 mês', '3 meses', '6 meses', '1 ano', 'Início insidioso', 'Recente'],
    functionalLimitations: [
      'Fadiga que impede o exercício.', 'Dificuldade de concentração (brain fog).', 'Limitação social por idas frequentes à casa de banho.',
      'Impacto na autoestima por alterações físicas.', 'Necessidade de medicação vitalícia.', 'Restrições dietéticas rigorosas.'
    ],
    questions: {
      evaluation: [
        { text: 'A Hemoglobina Glicada (HbA1c) avalia a glicemia de:', options: ['Últimos 2-3 meses', 'Últimas 24 horas', 'Última semana', 'Nada'], correctIdx: 0, explanation: 'Reflete a média da glicose no sangue no período de vida dos eritrócitos.' },
        { text: 'O TSH elevado com T4 livre baixo indica:', options: ['Hipotiroidismo primário', 'Hipertiroidismo', 'Diabetes', 'Nada'], correctIdx: 0, explanation: 'A hipófise tenta estimular a tiroide que não está a funcionar.' },
        { text: 'A prova de tolerância à glicose oral (PTGO) serve para:', options: ['Diagnosticar Diabetes ou Pré-diabetes', 'Ver o colesterol', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Avalia a resposta do corpo a uma carga de açúcar.' },
        { text: 'A palpação da tiroide procura:', options: ['Nódulos, bócio ou irregularidades', 'Sons do pulmão', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Exame físico essencial para patologia tiroideia.' },
        { text: 'O cortisol salivar ou urinário avalia a:', options: ['Glândula suprarrenal', 'Tiroide', 'Pâncreas', 'Nada'], correctIdx: 0, explanation: 'Útil no diagnóstico de Síndrome de Cushing ou insuficiência adrenal.' },
        { text: 'A ecografia da tiroide é usada para:', options: ['Caracterizar nódulos e guiar biópsias', 'Ver o estômago', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Exame de imagem de eleição para a glândula.' }
      ],
      diagnosis: [
        { text: 'A Diabetes Mellitus Tipo 1 é causada por:', options: ['Destruição autoimune das células beta', 'Excesso de peso apenas', 'Velhice', 'Nada'], correctIdx: 0, explanation: 'Leva à deficiência absoluta de insulina.' },
        { text: 'O Hipertiroidismo (Doença de Graves) causa:', options: ['Aceleração do metabolismo e nervosismo', 'Sonolência e ganho de peso', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Excesso de hormonas tiroideias no sangue.' },
        { text: 'A Síndrome de Cushing resulta do:', options: ['Excesso de cortisol', 'Falta de insulina', 'Falta de iodo', 'Nada'], correctIdx: 0, explanation: 'Causa obesidade central, "cara de lua cheia" e estrias.' },
        { text: 'O Hipotiroidismo de Hashimoto é:', options: ['Uma inflamação autoimune da tiroide', 'Uma infeção viral', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Causa mais comum de hipotiroidismo em áreas com iodo suficiente.' },
        { text: 'A Acromegalia é causada pelo excesso de:', options: ['Hormona do crescimento (GH)', 'Insulina', 'Adrenalina', 'Nada'], correctIdx: 0, explanation: 'Leva ao crescimento de extremidades e órgãos em adultos.' },
        { text: 'A Diabetes Insípida relaciona-se com a:', options: ['Hormona Antidiurética (ADH)', 'Insulina', 'Tiroide', 'Nada'], correctIdx: 0, explanation: 'Causa sede e urina extrema, mas sem açúcar elevado.' }
      ],
      treatment: [
        { text: 'A insulina é o tratamento obrigatório na:', options: ['Diabetes Tipo 1', 'Diabetes Tipo 2 leve', 'Gripe', 'Nada'], correctIdx: 0, explanation: 'Substitui a falta total de produção endógena.' },
        { text: 'A Levotiroxina é usada para tratar:', options: ['Hipotiroidismo', 'Hipertiroidismo', 'Diabetes', 'Nada'], correctIdx: 0, explanation: 'É a reposição sintética da hormona T4.' },
        { text: 'A Metformina atua:', options: ['Aumentando a sensibilidade à insulina', 'Dando insulina diretamente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Medicamento de primeira linha para Diabetes Tipo 2.' },
        { text: 'O iodo radioativo é uma opção no:', options: ['Hipertiroidismo', 'Hipotiroidismo', 'Diabetes', 'Nada'], correctIdx: 0, explanation: 'Destrói parte do tecido tiroideu hiperativo.' },
        { text: 'A dieta equilibrada e exercício são vitais no:', options: ['Controlo de todas as doenças endócrinas', 'Apenas em fraturas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Base do tratamento metabólico.' },
        { text: 'Os análogos do GLP-1 ajudam no:', options: ['Controlo glicémico e perda de peso', 'Aumento do apetite', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Nova classe de fármacos muito eficaz na Diabetes Tipo 2.' }
      ],
      exercises: [
        { text: 'O exercício físico aumenta a:', options: ['Sensibilidade à insulina nos músculos', 'Glicose no sangue sempre', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ajuda a baixar os níveis de açúcar de forma natural.' },
        { text: 'O treino de resistência (musculação) ajuda a:', options: ['Melhorar o metabolismo basal', 'Piorar a diabetes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Mais massa muscular consome mais glicose.' },
        { text: 'Caminhadas diárias são recomendadas para:', options: ['Prevenir complicações cardiovasculares', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Doentes endócrinos têm maior risco cardiovascular.' },
        { text: 'O controlo do stress (meditação) ajuda a:', options: ['Baixar os níveis de cortisol', 'Aumentar a glicose', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O stress crónico desregula o sistema endócrino.' },
        { text: 'Dormir 7-8 horas por dia regula a:', options: ['Produção de hormonas como a leptina', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O sono é fundamental para o equilíbrio metabólico.' },
        { text: 'A hidratação é crucial, especialmente na:', options: ['Diabetes descompensada', 'Apenas no frio', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Evita a desidratação por excesso de urina.' }
      ]
    }
  },
  'Neurologia': {
    complaints: [
      'Dor de cabeça (cefaleia) intensa e súbita.', 'Tremores nas mãos em repouso.', 'Perda de força num lado do corpo.', 
      'Dificuldade em falar ou compreender.', 'Esquecimentos frequentes e desorientação.', 'Tonturas e falta de equilíbrio.',
      'Visão dupla ou perda súbita de visão.', 'Crises convulsivas (ataques).', 'Formigueiros (parestesias) constantes.',
      'Dificuldade em caminhar (marcha instável).'
    ],
    histories: [
      'Hipertensão arterial e risco de AVC.', 'História familiar de Doença de Alzheimer.', 'Traumatismo craniano prévio.',
      'Consumo excessivo de álcool e tabaco.', 'Stress crónico e falta de sono.', 'Exposição a toxinas ambientais.',
      'Infeções prévias do sistema nervoso (meningite).', 'Diabetes e neuropatia periférica.', 'Uso de medicamentos psicotrópicos.',
      'Episódios de desmaio sem causa aparente.'
    ],
    symptoms: [
      ['Hemiparésia', 'Afasia', 'Desvio da comissura labial'], 
      ['Tremor de repouso', 'Rigidez muscular', 'Bradicinesia'], 
      ['Cefaleia holocraniana', 'Fotofobia', 'Náuseas'],
      ['Amnésia anterógrada', 'Desorientação temporo-espacial'],
      ['Ataxia', 'Nistagmo', 'Vertigem']
    ],
    evolutionTimes: ['Minutos (agudo)', 'Horas', 'Dias', 'Meses', 'Anos (progressivo)', 'Paroxístico'],
    functionalLimitations: [
      'Incapacidade de realizar higiene pessoal.', 'Dificuldade em comunicar necessidades.', 'Risco elevado de quedas.',
      'Impossibilidade de conduzir.', 'Dependência para alimentação.', 'Isolamento social por défices cognitivos.'
    ],
    questions: {
      evaluation: [
        { text: 'A escala de coma de Glasgow avalia:', options: ['Nível de consciência', 'Força muscular', 'Visão', 'Nada'], correctIdx: 0, explanation: 'Mede abertura ocular, resposta verbal e motora.' },
        { text: 'A Ressonância Magnética (RM) cerebral é superior para:', options: ['Ver tecidos moles e lesões detalhadas', 'Ver apenas ossos', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Oferece excelente contraste anatómico do sistema nervoso.' },
        { text: 'O eletroencefalograma (EEG) regista a:', options: ['Atividade elétrica do cérebro', 'Atividade do coração', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Fundamental no diagnóstico de epilepsia.' },
        { text: 'O teste de Romberg avalia o:', options: ['Equilíbrio estático', 'Olfato', 'Audição', 'Nada'], correctIdx: 0, explanation: 'Deteta problemas na proprioceção ou sistema vestibular.' },
        { text: 'A punção lombar serve para analisar o:', options: ['Líquido cefalorraquidiano (LCR)', 'Sangue', 'Urina', 'Nada'], correctIdx: 0, explanation: 'Identifica infeções, hemorragias ou doenças inflamatórias.' },
        { text: 'A avaliação dos pares cranianos testa:', options: ['Funções sensoriais e motoras da cabeça/pescoço', 'Apenas a força das pernas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Verifica a integridade dos 12 nervos que saem do tronco cerebral.' }
      ],
      diagnosis: [
        { text: 'O AVC isquémico é causado por:', options: ['Falta de sangue por obstrução', 'Ruptura de um vaso', 'Gripe', 'Nada'], correctIdx: 0, explanation: 'É o tipo mais comum de acidente vascular cerebral.' },
        { text: 'A Doença de Parkinson deve-se à falta de:', options: ['Dopamina', 'Serotonina', 'Insulina', 'Nada'], correctIdx: 0, explanation: 'A degeneração da substância negra reduz este neurotransmissor.' },
        { text: 'A Esclerose Múltipla ataca a:', options: ['Bainha de mielina (SNC)', 'Pele', 'Ossos', 'Nada'], correctIdx: 0, explanation: 'Doença autoimune desmielinizante.' },
        { text: 'A Enxaqueca (Migrânea) caracteriza-se por:', options: ['Dor pulsátil unilateral com aura ou náuseas', 'Dor leve em todo o lado', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Cefaleia primária incapacitante.' },
        { text: 'A Doença de Alzheimer causa principalmente:', options: ['Atrofia cerebral e perda de memória', 'Paralisia das pernas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Principal causa de demência em idosos.' },
        { text: 'A Epilepsia define-se por:', options: ['Crises convulsivas recorrentes', 'Um único desmaio', 'Dor de cabeça', 'Nada'], correctIdx: 0, explanation: 'Descargas elétricas anormais e excessivas no cérebro.' }
      ],
      treatment: [
        { text: 'A trombólise no AVC deve ser feita:', options: ['Nas primeiras horas (janela terapêutica)', 'Após 2 dias', 'Nunca', 'Nada'], correctIdx: 0, explanation: 'Visa dissolver o coágulo e salvar tecido cerebral.' },
        { text: 'A Levodopa é o tratamento base para:', options: ['Doença de Parkinson', 'Alzheimer', 'AVC', 'Nada'], correctIdx: 0, explanation: 'Precursor da dopamina que atravessa a barreira hematoencefálica.' },
        { text: 'Os antiepilépticos servem para:', options: ['Prevenir a ocorrência de crises', 'Curar a paralisia', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Estabilizam a atividade elétrica neuronal.' },
        { text: 'A reabilitação (Fisio/Logo/TO) é vital após:', options: ['AVC ou traumatismos', 'Apenas gripes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Promove a neuroplasticidade e recuperação funcional.' },
        { text: 'Os inibidores da colinesterase são usados no:', options: ['Alzheimer leve a moderado', 'Parkinson', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ajudam a manter os níveis de acetilcolina.' },
        { text: 'O controlo da Tensão Arterial previne:', options: ['Novos episódios de AVC', 'Miopia', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A hipertensão é o maior fator de risco modificável.' }
      ],
      exercises: [
        { text: 'Exercícios cognitivos (jogos, leitura) ajudam na:', options: ['Reserva cognitiva e memória', 'Força física', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Estimulam as conexões neuronais.' },
        { text: 'O treino de equilíbrio previne:', options: ['Quedas em doentes neurológicos', 'Cefaleias', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Fundamental para a segurança e autonomia.' },
        { text: 'A fisioterapia motora foca na:', options: ['Amplitude de movimento e força', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Evita contracturas e melhora a marcha.' },
        { text: 'Exercícios de coordenação fina (mãos) ajudam no:', options: ['Parkinson e outras doenças motoras', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Melhoram a destreza para atividades diárias.' },
        { text: 'A terapia da fala é essencial para:', options: ['Disfagia (dificuldade em engolir) e afasia', 'Andar melhor', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Trata distúrbios de comunicação e deglutição.' },
        { text: 'Atividade física aeróbica regular:', options: ['Melhora a neuroplasticidade e humor', 'É proibida', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Aumenta o fluxo sanguíneo cerebral e fatores neurotróficos.' }
      ]
    }
  },
  'Nefrologia': {
    complaints: [
      'Urina com espuma persistente.', 'Inchaço (edema) nas pernas e olhos.', 'Diminuição do volume urinário.', 
      'Dor lombar intensa que irradia para a virilha.', 'Urina com cor de "coca-cola" (hematúria).', 'Cansaço extremo e palidez.',
      'Comichão (prurido) generalizada.', 'Hálito com cheiro a amoníaco.', 'Náuseas matinais e perda de apetite.',
      'Tensão arterial muito difícil de controlar.'
    ],
    histories: [
      'Diabetes Mellitus de longa data.', 'Hipertensão arterial mal controlada.', 'Uso excessivo de anti-inflamatórios.',
      'História de pedras nos rins (litíase).', 'Infeções urinárias de repetição.', 'Doença renal poliquística na família.',
      'Lúpus ou outras doenças autoimunes.', 'Exposição a contrastes radiológicos recentes.', 'Desidratação severa.',
      'Obstrução urinária por próstata aumentada.'
    ],
    symptoms: [
      ['Edema maleolar', 'Hipertensão', 'Oligúria'], 
      ['Proteinúria de 24h elevada', 'Hipoalbuminemia'], 
      ['Creatinina e Ureia elevadas', 'Anemia'],
      ['Cólica renal', 'Hematúria macroscópica'],
      ['Acidose metabólica', 'Hipercalemia']
    ],
    evolutionTimes: ['3 dias', '2 semanas', '1 mês', '6 meses', 'Crónico progressivo', 'Início súbito'],
    functionalLimitations: [
      'Necessidade de diálise 3x por semana.', 'Restrição hídrica rigorosa.', 'Fadiga extrema para atividades diárias.',
      'Cãibras musculares frequentes.', 'Alterações no sono e concentração.', 'Dieta com baixo potássio e fósforo.'
    ],
    questions: {
      evaluation: [
        { text: 'A Taxa de Filtração Glomerular (TFG) avalia:', options: ['A função renal global', 'A cor da urina', 'A força da bexiga', 'Nada'], correctIdx: 0, explanation: 'É o melhor índice para medir o funcionamento dos rins.' },
        { text: 'A Creatinina é um marcador de:', options: ['Função renal', 'Função hepática', 'Diabetes', 'Nada'], correctIdx: 0, explanation: 'Produto do metabolismo muscular eliminado pelos rins.' },
        { text: 'O exame de Urina II (ou tipo 1) deteta:', options: ['Proteínas, sangue e nitritos', 'Apenas açúcar', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Fornece pistas sobre lesão renal ou infeção.' },
        { text: 'A ecografia renal serve para ver:', options: ['Tamanho, forma e presença de pedras ou quistos', 'O interior da uretra', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Exame de imagem inicial para avaliar a estrutura renal.' },
        { text: 'A medição da Tensão Arterial é vital pois:', options: ['A hipertensão lesa os rins e vice-versa', 'Não tem relação', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Os rins regulam a pressão e são vítimas da sua elevação.' },
        { text: 'A análise de eletrólitos (Potássio, Sódio) avalia:', options: ['O equilíbrio hidroelectrolítico', 'A visão', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Os rins são os principais reguladores destes minerais.' }
      ],
      diagnosis: [
        { text: 'A Doença Renal Crónica define-se por:', options: ['Perda progressiva e irreversível da função', 'Uma infeção passageira', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Geralmente causada por Diabetes e Hipertensão.' },
        { text: 'A Glomerulonefrite é a:', options: ['Inflamação dos glomérulos (filtros do rim)', 'Infeção da bexiga', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Pode ser causada por doenças autoimunes ou pós-infeções.' },
        { text: 'A Litíase Renal é popularmente conhecida como:', options: ['Pedra nos rins', 'Infeção urinária', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Formação de cristais no sistema coletor.' },
        { text: 'A Insuficiência Renal Aguda é uma:', options: ['Queda súbita da função renal', 'Doença que dura anos', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Pode ser reversível se tratada a causa (ex: desidratação).' },
        { text: 'A Síndrome Nefrótica caracteriza-se por:', options: ['Grande perda de proteína na urina e edema', 'Apenas dor lombar', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Leva a níveis baixos de proteína no sangue.' },
        { text: 'A Pielonefrite é uma:', options: ['Infeção bacteriana do rim', 'Inflamação do fígado', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Geralmente acompanhada de febre e dor lombar.' }
      ],
      treatment: [
        { text: 'A Hemodiálise serve para:', options: ['Filtrar o sangue artificialmente', 'Curar a diabetes', 'Dar energia', 'Nada'], correctIdx: 0, explanation: 'Substitui a função renal em estágios avançados.' },
        { text: 'O controlo da Diabetes e Hipertensão visa:', options: ['Travar a progressão da doença renal', 'Curar a visão', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Protege os microvasos dos glomérulos.' },
        { text: 'A restrição de sal na dieta ajuda a:', options: ['Controlar a tensão e o edema', 'Aumentar a sede', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Reduz a sobrecarga de volume no corpo.' },
        { text: 'Os quelantes de fósforo são usados para:', options: ['Evitar a acumulação de fósforo no sangue', 'Dar cálcio', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Rins doentes não conseguem eliminar o fósforo adequadamente.' },
        { text: 'A Eritropoietina sintética trata a:', options: ['Anemia da doença renal', 'Infeção', 'Dor', 'Nada'], correctIdx: 0, explanation: 'O rim doente produz menos desta hormona que estimula o sangue.' },
        { text: 'O transplante renal é considerado:', options: ['O melhor tratamento para a falência renal', 'Um procedimento estético', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Oferece melhor qualidade de vida que a diálise.' }
      ],
      exercises: [
        { text: 'Exercício moderado durante a diálise:', options: ['Pode melhorar a eficácia e o humor', 'É proibido', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ajuda na circulação e bem-estar do doente.' },
        { text: 'Caminhadas leves ajudam a:', options: ['Controlar a tensão arterial', 'Curar o rim', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O exercício é parte do controlo cardiovascular.' },
        { text: 'Evitar o sedentarismo previne:', options: ['Complicações cardíacas', 'Pedras nos rins apenas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Doentes renais têm alto risco de enfarte.' },
        { text: 'Exercícios de flexibilidade reduzem:', options: ['Cãibras e dores musculares', 'A ureia', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Comuns em doentes com desequilíbrios minerais.' },
        { text: 'O controlo do peso corporal:', options: ['Reduz a sobrecarga sobre os rins', 'Não tem importância', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A obesidade é um fator de risco para lesão renal.' },
        { text: 'Técnicas de relaxamento ajudam a lidar com:', options: ['A carga emocional da doença crónica', 'A anemia', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A insuficiência renal tem grande impacto psicológico.' }
      ]
    }
  },
  'Hematologia': {
    complaints: [
      'Cansaço extremo e palidez cutânea.', 'Aparecimento de nódoas negras (equimoses) sem trauma.', 'Febre persistente e suores noturnos.', 
      'Gengivas a sangrar com facilidade.', 'Gânglios (ínguas) inchados no pescoço ou axilas.', 'Dor óssea generalizada.',
      'Tonturas e falta de ar ao mínimo esforço.', 'Pequenos pontos vermelhos na pele (petéquias).', 'Feridas que não param de sangrar.',
      'Sensação de enfartamento após comer pouco.'
    ],
    histories: [
      'Anemia crónica desde a infância.', 'Exposição a radiações ou benzeno.', 'História familiar de Hemofilia ou Talassemia.',
      'Tratamento prévio com quimioterapia.', 'Consumo deficiente de carne e vegetais verdes.', 'Doença autoimune (ex: Lúpus).',
      'Perda de sangue abundante em cirurgia ou parto.', 'Uso de medicamentos anticoagulantes.', 'Infeções virais recentes (ex: Mononucleose).',
      'Alcoolismo crónico.'
    ],
    symptoms: [
      ['Palidez', 'Taquicardia', 'Astenia'], 
      ['Petéquias', 'Equimoses', 'Epistaxe'], 
      ['Linfadenopatias', 'Esplenomegalia', 'Febre'],
      ['Icterícia leve', 'Urina escura', 'Esplenomegalia'],
      ['Pica (desejo de comer terra/gelo)', 'Unhas quebradiças']
    ],
    evolutionTimes: ['1 semana', '1 mês', '3 meses', 'Desde a infância', 'Início súbito', 'Progressivo'],
    functionalLimitations: [
      'Incapacidade de subir um lance de escadas.', 'Necessidade de dormir muitas horas por dia.', 'Risco de hemorragia grave em pequenos cortes.',
      'Faltas frequentes ao trabalho por infeções.', 'Dificuldade de concentração e memória.', 'Limitação em atividades físicas de contacto.'
    ],
    questions: {
      evaluation: [
        { text: 'O Hemograma avalia:', options: ['Glóbulos vermelhos, brancos e plaquetas', 'Apenas o açúcar', 'O colesterol', 'Nada'], correctIdx: 0, explanation: 'É o exame base da hematologia.' },
        { text: 'A Ferritina mede as:', options: ['Reservas de ferro no corpo', 'Vitaminas', 'Plaquetas', 'Nada'], correctIdx: 0, explanation: 'Fundamental para diagnosticar anemia ferropénica.' },
        { text: 'O Mielograma é a análise do:', options: ['Interior do osso (medula óssea)', 'Cérebro', 'Músculo', 'Nada'], correctIdx: 0, explanation: 'Avalia a "fábrica" do sangue.' },
        { text: 'O tempo de protrombina (INR) avalia a:', options: ['Coagulação do sangue', 'Força do coração', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Importante para quem toma anticoagulantes.' },
        { text: 'A observação do esfregaço de sangue periférico vê:', options: ['A forma e tamanho das células', 'A cor do plasma apenas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Deteta células anormais ou imaturas.' },
        { text: 'A palpação do baço (esplenomegalia) sugere:', options: ['Destruição aumentada de células ou infiltração', 'Problemas de visão', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O baço é um órgão linfoide e cemitério de hemácias.' }
      ],
      diagnosis: [
        { text: 'A Anemia Ferropénica é causada por:', options: ['Falta de ferro', 'Falta de sol', 'Excesso de água', 'Nada'], correctIdx: 0, explanation: 'Tipo mais comum de anemia no mundo.' },
        { text: 'A Leucemia é um:', options: ['Cancro dos glóbulos brancos', 'Cancro da pele', 'Vírus', 'Nada'], correctIdx: 0, explanation: 'Produção descontrolada de células imaturas na medula.' },
        { text: 'A Hemofilia é uma doença:', options: ['Genética que impede a coagulação', 'Contagiosa', 'De idosos apenas', 'Nada'], correctIdx: 0, explanation: 'Falta de fatores de coagulação (VIII ou IX).' },
        { text: 'O Linfoma é o cancro do:', options: ['Sistema linfático (gânglios)', 'Fígado', 'Osso', 'Nada'], correctIdx: 0, explanation: 'Manifesta-se frequentemente por gânglios aumentados.' },
        { text: 'A Anemia Falciforme caracteriza-se por:', options: ['Glóbulos vermelhos em forma de foice', 'Excesso de ferro', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Doença genética que causa crises de dor e anemia.' },
        { text: 'A Trombocitopenia é a:', options: ['Baixa contagem de plaquetas', 'Alta contagem de glóbulos brancos', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Aumenta o risco de hemorragias e manchas na pele.' }
      ],
      treatment: [
        { text: 'O suplemento de Ferro deve ser tomado com:', options: ['Vitamina C (ex: sumo de laranja)', 'Leite', 'Café', 'Nada'], correctIdx: 0, explanation: 'A vitamina C aumenta a absorção do ferro.' },
        { text: 'A Transfusão de Sangue é usada para:', options: ['Repor hemácias ou plaquetas rapidamente', 'Curar a gripe', 'Dar vitaminas', 'Nada'], correctIdx: 0, explanation: 'Procedimento de emergência ou suporte em doenças crónicas.' },
        { text: 'A Quimioterapia é o tratamento para:', options: ['Leucemias e Linfomas', 'Anemia simples', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Visa destruir as células cancerígenas.' },
        { text: 'O Transplante de Medula Ósseo visa:', options: ['Substituir a medula doente por uma saudável', 'Curar a pele', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Opção curativa em várias doenças graves do sangue.' },
        { text: 'A Vitamina B12 e Ácido Fólico tratam:', options: ['Anemias megaloblásticas', 'Hemofilia', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Essenciais para a formação correta do ADN das células.' },
        { text: 'Evitar aspirina em caso de plaquetas baixas:', options: ['Previne hemorragias graves', 'É indiferente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A aspirina inibe a função das poucas plaquetas existentes.' }
      ],
      exercises: [
        { text: 'Exercício leve (caminhada) na anemia:', options: ['Melhora a oxigenação e reduz a fadiga', 'É perigoso sempre', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Deve ser feito respeitando os limites do cansaço.' },
        { text: 'Evitar desportos de contacto em hemofílicos:', options: ['Previne hemorragias internas graves', 'É apenas por medo', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Pequenos traumas podem causar grandes hematomas articulares.' },
        { text: 'Exercícios de relaxamento ajudam no:', options: ['Controlo da dor em crises falciformes', 'Aumento das plaquetas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O stress pode desencadear crises de dor.' },
        { text: 'Manter as pernas elevadas ajuda se houver:', options: ['Edema ou risco de trombose', 'Anemia', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Melhora o retorno venoso.' },
        { text: 'A hidratação abundante é vital na:', options: ['Anemia falciforme', 'Apenas no verão', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Evita a "colagem" das células em foice nos vasos.' },
      ]
    }
  },
  'Dentística': {
    complaints: [
      'Dente partido após trincar algo duro.', 'Sensibilidade extrema a doces e frio.', 'Mancha escura num dente da frente.', 
      'Restauração antiga que caiu.', 'Espaço entre os dentes (diastema) que incomoda.', 'Dentes amarelados ou com manchas brancas.',
      'Dor ligeira ao mastigar.', 'Acumulação de comida entre dois dentes.', 'Dente com aspeto "gasto" ou curto.',
      'Inestética por restaurações de amálgama (escuras).'
    ],
    histories: [
      'Hábito de ranger os dentes (bruxismo).', 'Consumo excessivo de refrigerantes ou citrinos (erosão).', 'Trauma dentário na infância.',
      'Falta de idas ao dentista há vários anos.', 'Uso de técnicas de branqueamento caseiras sem supervisão.', 'Dieta rica em açúcares.',
      'Má higiene oral por falta de fio dentário.', 'Restaurações extensas feitas há mais de 10 anos.', 'Tabagismo e consumo de café.',
      'Tratamento ortodôntico finalizado recentemente.'
    ],
    symptoms: [
      ['Cárie de esmalte', 'Assintomático', 'Mancha branca'], 
      ['Cárie de dentina', 'Dor ao frio', 'Cavidade visível'], 
      ['Fratura de ângulo incisal', 'Aresta cortante'],
      ['Desgaste cervical (abrasão)', 'Sensibilidade ao toque'],
      ['Alteração cromática', 'Opacidade', 'Linhas de fratura']
    ],
    evolutionTimes: ['1 semana', '1 mês', '6 meses', 'Anos', 'Súbito após trauma', 'Progressivo'],
    functionalLimitations: [
      'Sensibilidade ao mastigar.', 'Dificuldade em higienizar a zona.', 'Desconforto estético ao sorrir.'
    ],
    questions: {
      evaluation: [
        { text: 'O teste de sensibilidade térmica ajuda a avaliar a:', options: ['Vitalidade da polpa', 'Cor do dente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Verifica se o nervo responde normalmente ao frio.' },
        { text: 'A radiografia interproximal (bitewing) deteta:', options: ['Cáries entre os dentes', 'Raízes partidas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ideal para ver cáries escondidas nos pontos de contacto.' },
        { text: 'O uso de revelador de placa bacteriana serve para:', options: ['Mostrar zonas com má escovagem', 'Branquear os dentes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Cora a placa para o paciente ver onde deve melhorar.' },
        { text: 'A transiluminação com luz LED ajuda a ver:', options: ['Fraturas e fendas no esmalte', 'Cáries profundas apenas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A luz revela descontinuidades na estrutura dentária.' },
        { text: 'A escala de cores (ex: Vita) serve para:', options: ['Selecionar a cor da resina composta', 'Medir o tamanho do dente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Garante que a restauração fica esteticamente natural.' },
        { text: 'A sondagem periodontal em dentística serve para:', options: ['Verificar a integridade das margens da restauração', 'Ver se o dente abana', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Deteta degraus ou infiltrações na base do dente.' }
      ],
      diagnosis: [
        { text: 'A cárie dentária é uma doença:', options: ['Infeciosa e açúcar-dependente', 'Genética apenas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Bactérias fermentam açúcares produzindo ácidos que desmineralizam o dente.' },
        { text: 'A erosão dentária é causada por:', options: ['Ácidos não bacterianos (ex: sumos, refluxo)', 'Falta de cálcio', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Desgaste químico da superfície do dente.' },
        { text: 'A abrasão dentária resulta de:', options: ['Escovagem demasiado forte ou traumática', 'Comer doces', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Desgaste mecânico por fricção externa.' },
        { text: 'O bruxismo causa principalmente:', options: ['Atrrição (desgaste dente contra dente)', 'Cáries', 'Nada', 'Nada'], correctIdx: 0, explanation: 'As faces oclusais ficam planas e os dentes mais curtos.' },
        { text: 'Uma restauração infiltrada significa que:', options: ['Há bactérias a entrar por baixo da massa', 'A massa mudou de cor', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Requer substituição para evitar nova cárie profunda.' },
        { text: 'A hipersensibilidade dentinária ocorre quando:', options: ['A dentina fica exposta ao meio oral', 'O esmalte está muito grosso', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Estímulos chegam aos túbulos dentinários e ao nervo.' }
      ],
      treatment: [
        { text: 'A resina composta é o material usado para:', options: ['Restaurações estéticas da cor do dente', 'Fazer aparelhos', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Adere ao dente e permite mimetizar a anatomia natural.' },
        { text: 'O ataque ácido serve para:', options: ['Criar micro-retenções no esmalte e dentina', 'Limpar o dente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Prepara a superfície para o sistema adesivo.' },
        { text: 'O selamento de fissuras é uma medida:', options: ['Preventiva em crianças e jovens', 'Curativa para cáries grandes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Protege as zonas mais profundas dos molares.' },
        { text: 'O branqueamento dentário usa:', options: ['Peróxido de hidrogénio ou carbamida', 'Lixívia', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Liberta oxigénio que quebra as moléculas de pigmento.' },
        { text: 'As facetas (veneers) servem para:', options: ['Corrigir forma e cor dos dentes anteriores', 'Substituir dentes perdidos', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Lâminas finas de cerâmica ou resina coladas na face externa.' },
        { text: 'O acabamento e polimento da restauração:', options: ['Evita a acumulação de placa e melhora o brilho', 'É opcional', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Uma superfície lisa é vital para a saúde gengival.' }
      ],
      exercises: [
        { text: 'A técnica de escovagem de Bass foca-se na:', options: ['Limpeza do sulco gengival', 'Apenas na face de mastigar', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Escova a 45 graus em direção à gengiva.' },
        { text: 'O uso diário de fio dentário limpa:', options: ['As faces entre os dentes (interproximais)', 'A língua', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Onde a escova não chega e onde começam muitas cáries.' },
        { text: 'Evitar alimentos pegajosos e doces entre refeições:', options: ['Reduz o risco de cárie', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Diminui o tempo de exposição aos ácidos.' },
        { text: 'Beber água após consumir alimentos ácidos:', options: ['Ajuda a neutralizar o pH da boca', 'Estraga os dentes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Remove resíduos e estimula a salivação.' },
        { text: 'Aguardar 30 min para escovar após comer citrinos:', options: ['Evita o desgaste do esmalte amolecido', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Dá tempo à saliva para remineralizar a superfície.' },
        { text: 'Massajar a gengiva suavemente durante a escovagem:', options: ['Melhora a circulação e saúde periodontal', 'Causa sangramento', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Mantém os tecidos de suporte saudáveis.' }
      ]
    }
  },
  'Endodontia': {
    complaints: [
      'Dor de dente pulsátil e insuportável à noite.', 'Inchaço na gengiva (abcesso) com pus.', 'Dente que escureceu após uma queda antiga.', 
      'Dor aguda ao mastigar ou tocar no dente.', 'Sensibilidade prolongada ao quente que não passa.', 'Sabor desagradável na boca vindo de um dente.',
      'Dente que parece "mais alto" que os outros.', 'Fístula (bolinha de pus) que vai e vem.', 'Dor que irradia para o ouvido ou cabeça.',
      'Dente com cavidade profunda e dor espontânea.'
    ],
    histories: [
      'Cárie profunda não tratada há meses.', 'Trauma facial (queda, acidente) recente ou antigo.', 'Restauração muito profunda e próxima do nervo.',
      'Tratamento de canal antigo que falhou.', 'Dente usado como suporte de ponte com dor.', 'História de dor forte que parou de repente (necrose).',
      'Vários episódios de abcesso no mesmo local.', 'Uso de antibióticos para dor de dente sem resolver a causa.', 'Dente com desgaste severo por bruxismo.',
      'Preparação para coroa que causou sensibilidade extrema.'
    ],
    symptoms: [
      ['Pulpite irreversível', 'Dor espontânea', 'Pulsátil'], 
      ['Necrose pulpar', 'Teste de frio negativo', 'Escurecimento'], 
      ['Periodontite apical', 'Dor à percussão', 'Extrusão'],
      ['Abcesso periapical', 'Edema facial', 'Febre'],
      ['Fístula ativa', 'Drenagem purulenta', 'Alívio da pressão']
    ],
    evolutionTimes: ['24 horas', '3 dias', '1 semana', 'Meses (fístula)', 'Anos (necrose silenciosa)'],
    functionalLimitations: [
      'Incapacidade de mastigar no dente afetado.', 'Dificuldade em dormir pela dor pulsátil.', 'Limitação na abertura bucal por edema.'
    ],
    questions: {
      evaluation: [
        { text: 'O teste de percussão vertical avalia a:', options: ['Inflamação do ligamento periodontal', 'Cor do dente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Se doer ao bater levemente, a inflamação chegou ao osso.' },
        { text: 'A radiografia periapical mostra:', options: ['A ponta da raiz (ápice) e o osso circundante', 'Apenas a coroa', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Fundamental para ver lesões (quisto/granuloma) no osso.' },
        { text: 'O localizador apical eletrónico serve para:', options: ['Medir o comprimento exato do canal', 'Ver se tem cárie', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Evita que os instrumentos passem para fora da raiz.' },
        { text: 'O teste de cavidade (sem anestesia) é usado para:', options: ['Confirmar necrose em casos duvidosos', 'Torturar o paciente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Se o paciente não sente a broca na dentina, o nervo está morto.' },
        { text: 'A palpação do fundo de sulco deteta:', options: ['Edema ou sensibilidade no osso', 'Cáries', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Indica que a infeção está a tentar sair pelo osso.' },
        { text: 'O isolamento absoluto com dique de borracha:', options: ['É obrigatório para evitar contaminação e acidentes', 'É opcional', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Protege o paciente de engolir limas e mantém o campo estéril.' }
      ],
      diagnosis: [
        { text: 'A Pulpite Irreversível requer:', options: ['Tratamento de canal (desvitalização)', 'Apenas uma massa', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O nervo está inflamado demais para recuperar.' },
        { text: 'A Necrose Pulpar significa que:', options: ['O nervo do dente morreu', 'O dente está saudável', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O canal torna-se um ninho de bactérias e requer limpeza.' },
        { text: 'Uma Lesão Periapical (quisto/granuloma) é:', options: ['Uma resposta óssea à infeção do canal', 'Um tumor maligno', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O corpo tenta conter as bactérias que saem da raiz.' },
        { text: 'O Abcesso Fénix é uma:', options: ['Reativação aguda de uma infeção crónica', 'Infeção leve', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Causa dor súbita num dente que não doía há muito tempo.' },
        { text: 'A reabsorção radicular interna:', options: ['O nervo "come" o dente por dentro', 'É causada por falta de cálcio', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Geralmente ligada a trauma ou inflamação crónica.' },
        { text: 'Um dente com "fratura vertical" tem prognóstico:', options: ['Muito mau, geralmente requer extração', 'Excelente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A fratura permite entrada constante de bactérias no osso.' }
      ],
      treatment: [
        { text: 'A instrumentação do canal serve para:', options: ['Limpar e dar forma ao canal', 'Furar o osso', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Remove o tecido infetado e prepara para a obturação.' },
        { text: 'O Hipoclorito de Sódio é usado para:', options: ['Desinfetar e dissolver restos orgânicos', 'Colar o dente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'É o principal irrigante em endodontia.' },
        { text: 'A Guta-percha é o material usado para:', options: ['Preencher (obturar) o canal limpo', 'Fazer a massa de cima', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Material biocompatível que sela o interior da raiz.' },
        { text: 'O tratamento em sessão única é possível se:', options: ['Não houver infeção aguda ou exsudado', 'O paciente tiver pressa', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Requer técnica rigorosa e diagnóstico favorável.' },
        { text: 'A medicação intracanal (ex: Hidróxido de Cálcio):', options: ['Ajuda a eliminar bactérias entre consultas', 'Tira a dor na hora', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Mantém o canal desinfetado enquanto o osso recupera.' },
        { text: 'Após o canal, o dente deve ser:', options: ['Reabilitado com coroa ou restauração reforçada', 'Deixado aberto', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Dentes desvitalizados são mais frágeis e podem partir.' }
      ],
      exercises: [
        { text: 'Evitar mastigar alimentos duros no dente em tratamento:', options: ['Previne fraturas e dor pós-operatória', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O dente está mais sensível e com restauração provisória.' },
        { text: 'Manter a higiene oral normal na zona:', options: ['Evita a acumulação de placa e inflamação gengival', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A saúde da gengiva ajuda na cicatrização.' },
        { text: 'Aplicar gelo externamente se houver inchaço:', options: ['Ajuda a controlar o edema e a dor', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Nas primeiras 24-48 horas após intervenção cirúrgica.' },
        { text: 'Tomar a medicação prescrita nos horários certos:', options: ['Garante o controlo da infeção e dor', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Fundamental para o sucesso do tratamento.' },
        { text: 'Vigiar o aparecimento de febre ou inchaço maior:', options: ['Pode indicar necessidade de ajustar o tratamento', 'É normal', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Sinais de alerta que requerem contacto com o dentista.' },
        { text: 'Não faltar às consultas de acompanhamento:', options: ['Garante que a lesão no osso está a cicatrizar', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O sucesso final vê-se na radiografia meses depois.' }
      ]
    }
  },
  'Periodontia': {
    complaints: [
      'Gengivas que sangram ao escovar ou comer.', 'Dentes que parecem estar a abanar.', 'Mau hálito persistente (halitose).', 
      'Gengivas muito vermelhas e inchadas.', 'Dentes que parecem "mais compridos" (retração).', 'Sabor metálico na boca.',
      'Espaços a abrir entre os dentes da frente.', 'Sensibilidade ao frio por exposição da raiz.', 'Dor ligeira e latejante na gengiva.',
      'Pus a sair entre o dente e a gengiva.'
    ],
    histories: [
      'Falta de limpezas profissionais há anos.', 'Diabetes descompensada.', 'Hábito de fumar (agrava muito a doença).',
      'História familiar de perda precoce de dentes.', 'Uso de medicamentos que causam inchaço gengival.', 'Gravidez (gengivite gravídica).',
      'Stress e baixa imunidade.', 'Uso de próteses mal adaptadas.', 'Respiração bucal.',
      'Dieta pobre em vitamina C.'
    ],
    symptoms: [
      ['Gengivite', 'Sangramento à sondagem', 'Sem perda óssea'], 
      ['Periodontite leve', 'Bolsas de 4mm', 'Ligeira mobilidade'], 
      ['Periodontite avançada', 'Bolsas > 6mm', 'Perda óssea severa'],
      ['Recessão gengival', 'Exposição radicular', 'Hipersensibilidade'],
      ['Cálculo (tártaro) visível', 'Supuração', 'Halitose']
    ],
    evolutionTimes: ['Meses', 'Anos', 'Progressivo', 'Agudização súbita'],
    functionalLimitations: [
      'Sangramento gengival ao comer.', 'Mobilidade dentária que dificulta a mastigação.', 'Sensibilidade térmica generalizada.'
    ],
    questions: {
      evaluation: [
        { text: 'A sondagem periodontal mede a:', options: ['Profundidade da bolsa entre dente e gengiva', 'Força do dente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Mede o espaço onde a escova não chega e as bactérias vivem.' },
        { text: 'O Índice de Sangramento indica:', options: ['Inflamação ativa na gengiva', 'Falta de ferro', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Gengiva saudável não sangra ao ser tocada levemente.' },
        { text: 'A radiografia ortopantomográfica avalia o:', options: ['Nível do osso de suporte de todos os dentes', 'Apenas cáries', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Permite ver a perda óssea generalizada ou localizada.' },
        { text: 'A mobilidade dentária classifica-se de:', options: ['Grau 0 a 3', 'Leve a forte', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Grau 3 indica movimento vertical, muito grave.' },
        { text: 'O envolvimento de furca ocorre em:', options: ['Dentes com mais de uma raiz (molares)', 'Incisivos', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Quando a perda óssea chega à zona onde as raízes se separam.' },
        { text: 'A placa bacteriana é o fator:', options: ['Etiológico primário (causa principal)', 'Secundário', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Sem placa não há doença periodontal.' }
      ],
      diagnosis: [
        { text: 'A Gengivite é uma inflamação:', options: ['Reversível da gengiva', 'Irreversível do osso', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Com boa higiene, a gengiva volta ao normal.' },
        { text: 'A Periodontite caracteriza-se pela:', options: ['Destruição do osso e ligamento de suporte', 'Apenas cor do dente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'É uma doença crónica que pode levar à perda de dentes.' },
        { text: 'O Tártaro (Cálculo) é:', options: ['Placa bacteriana mineralizada', 'Restos de comida', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Não sai com a escova, apenas com limpeza profissional.' },
        { text: 'A Periodontite Juvenil Afetiva é:', options: ['Uma forma agressiva em jovens', 'Comum em idosos', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Tem forte componente genética e progressão rápida.' },
        { text: 'O Abcesso Periodontal é uma:', options: ['Infeção aguda na bolsa periodontal', 'Cárie no nervo', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Causa dor e inchaço súbito na gengiva.' },
        { text: 'A relação entre Diabetes e Periodontite é:', options: ['Bidirecional (uma agrava a outra)', 'Inexistente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O controlo de uma ajuda no controlo da outra.' }
      ],
      treatment: [
        { text: 'A destartarização e alisamento radicular visam:', options: ['Remover tártaro e bactérias das raízes', 'Branquear os dentes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Limpeza profunda para permitir que a gengiva cole ao dente.' },
        { text: 'A Clorexidina é um antissético usado para:', options: ['Reduzir a carga bacteriana na boca', 'Adoçar o hálito', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Usada em bochechos após cirurgias ou limpezas profundas.' },
        { text: 'A cirurgia de retalho serve para:', options: ['Aceder a bolsas profundas para limpeza direta', 'Mudar a cor da gengiva', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Permite limpar onde os instrumentos manuais não chegam.' },
        { text: 'O enxerto gengival é usado para:', options: ['Tratar retrações e cobrir raízes expostas', 'Fazer o dente crescer', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Melhora a estética e reduz a sensibilidade.' },
        { text: 'A manutenção periodontal deve ser feita:', options: ['A cada 3 a 6 meses', 'Uma vez na vida', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Vital para evitar que a doença volte a progredir.' },
        { text: 'A extração dentária é indicada quando:', options: ['Não há suporte ósseo suficiente para manter o dente', 'A gengiva sangra um pouco', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Último recurso em casos terminais.' }
      ],
      exercises: [
        { text: 'O uso de escovilhões interdentários é vital para:', options: ['Limpar espaços largos entre dentes', 'Limpar a língua', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Mais eficaz que o fio em pacientes com perda óssea.' },
        { text: 'Escovar a língua diariamente reduz:', options: ['A carga bacteriana e o mau hálito', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A língua retém muitos microrganismos.' },
        { text: 'Parar de fumar melhora a:', options: ['Resposta ao tratamento e cicatrização', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O tabaco reduz a circulação na gengiva e mascara o sangramento.' },
        { text: 'Controlar o açúcar no sangue ajuda na:', options: ['Saúde das gengivas em diabéticos', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Menos açúcar no fluido gengival significa menos alimento para bactérias.' },
        { text: 'Beber muita água mantém a boca:', options: ['Hidratada e com fluxo salivar adequado', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A saliva tem propriedades protetoras e antibacterianas.' },
        { text: 'Vigiar sangramentos e procurar o dentista cedo:', options: ['Evita a progressão para perda óssea', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A gengivite é o aviso antes da periodontite.' }
      ]
    }
  },
  'Prótese Dentária': {
    complaints: [
      'Prótese que "salta" ao falar ou comer.', 'Dificuldade em mastigar alimentos mais rijos.', 'Ferida na gengiva causada pela placa.', 
      'Dente da prótese que partiu ou caiu.', 'Prótese antiga que ficou larga.', 'Inestética por ganchos metálicos visíveis.',
      'Desejo de substituir dentes perdidos por algo fixo.', 'Prótese que causa náuseas.', 'Dificuldade em pronunciar certas palavras.',
      'Base da prótese que mudou de cor ou tem tártaro.'
    ],
    histories: [
      'Uso de prótese removível há mais de 5 anos.', 'Perda de vários dentes por cárie ou periodontite.', 'Adaptação difícil a próteses novas.',
      'História de reabsorção óssea acentuada.', 'Uso de adesivos (colas) para segurar a prótese.', 'Quebra acidental da prótese ao cair no chão.',
      'Desejo de melhorar a estética do sorriso.', 'Falta de dentes posteriores que causa sobrecarga nos da frente.', 'História de engasgamento com próteses pequenas.',
      'Uso de prótese provisória após extrações.'
    ],
    symptoms: [
      ['Prótese desadaptada', 'Falta de retenção', 'Instabilidade'], 
      ['Estomatite protética', 'Palato eritematoso', 'Candidíase'], 
      ['Úlcera traumática', 'Dor localizada', 'Hiperplasia'],
      ['Desgaste dos dentes acrílicos', 'Diminuição da dimensão vertical'],
      ['Fratura de conector', 'Gancho frouxo']
    ],
    evolutionTimes: ['1 semana', '1 mês', '6 meses', 'Anos', 'Recentemente', 'Progressivo'],
    functionalLimitations: [
      'Dificuldade na fala (fonética).', 'Instabilidade da prótese ao comer.', 'Feridas na mucosa que impedem o uso da prótese.'
    ],
    questions: {
      evaluation: [
        { text: 'A avaliação da Dimensão Vertical de Oclusão (DVO) serve para:', options: ['Ver se a altura do rosto está correta com a prótese', 'Ver a cor dos dentes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Uma DVO baixa causa aspeto envelhecido e dores na ATM.' },
        { text: 'O teste de estabilidade e retenção avalia se a prótese:', options: ['Se move ou cai durante a função', 'É bonita', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Essencial para o conforto e segurança do paciente.' },
        { text: 'A análise do suporte ósseo e mucoso determina:', options: ['O tipo de prótese mais indicado', 'A cor da gengiva', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Pouco osso pode exigir implantes para segurar a prótese.' },
        { text: 'O uso de modelos de estudo em articulador permite:', options: ['Simular os movimentos da mandíbula', 'Ver cáries', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Garante que a mordida fica equilibrada.' },
        { text: 'A fonética é avaliada pedindo ao paciente para:', options: ['Dizer palavras com "S" e "F"', 'Cantar', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Verifica se os dentes estão bem posicionados para a fala.' },
        { text: 'A estética é validada através da:', options: ['Linha do sorriso e suporte do lábio', 'Apenas cor', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A prótese deve devolver a harmonia facial.' }
      ],
      diagnosis: [
        { text: 'Uma prótese desadaptada causa:', options: ['Reabsorção óssea acelerada e feridas', 'Crescimento de novos dentes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O osso "foge" da pressão irregular.' },
        { text: 'A Estomatite Protética é comum em:', options: ['Pacientes que dormem com a prótese e má higiene', 'Pessoas sem prótese', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Geralmente associada a infeção por Candida.' },
        { text: 'A perda da Dimensão Vertical causa:', options: ['Queilite angular (feridas nos cantos da boca)', 'Melhoria da audição', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O excesso de fecho da boca acumula saliva nos cantos.' },
        { text: 'A hiperplasia inflamatória (épulis) é causada por:', options: ['Bordo da prótese comprido e traumático', 'Falta de dentes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O tecido cresce como resposta à irritação crónica.' },
        { text: 'Dentes acrílicos gastos levam a:', options: ['Eficiência mastigatória reduzida', 'Melhor trituração', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Perdem as cúspides e tornam-se planos.' },
        { text: 'A falta de dentes posteriores causa:', options: ['Sobrecarga e desgaste dos dentes anteriores', 'Melhor estética', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Os dentes da frente não foram feitos para moer comida.' }
      ],
      treatment: [
        { text: 'O rebasamento da prótese serve para:', options: ['Ajustar a base à gengiva que mudou', 'Mudar os dentes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Preenche o espaço vazio entre a prótese e a boca.' },
        { text: 'Uma prótese esquelética (metálica) oferece:', options: ['Maior conforto e estabilidade que a acrílica', 'Menor preço', 'Nada', 'Nada'], correctIdx: 0, explanation: 'É mais fina e apoia-se nos dentes remanescentes.' },
        { text: 'A prótese fixa (coroa/ponte) é cimentada sobre:', options: ['Dentes naturais preparados ou implantes', 'Gengiva livre', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Não é removida pelo paciente, sendo mais natural.' },
        { text: 'O condicionamento de tecidos usa:', options: ['Materiais macios para curar a gengiva inflamada', 'Lixa', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Prepara a boca antes de fazer a prótese definitiva.' },
        { text: 'A prótese híbrida (sobre implantes) combina:', options: ['Estética da prótese total com fixação de implantes', 'Metal e madeira', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Excelente solução para quem não tem dentes nenhuns.' },
        { text: 'O ajuste oclusal visa:', options: ['Equilibrar os contactos ao morder', 'Aumentar o brilho', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Evita pontos de pressão que causam dor ou quebra.' }
      ],
      exercises: [
        { text: 'Limpar a prótese com escova própria e sabão neutro:', options: ['Evita o tártaro e manchas sem riscar o acrílico', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Pastas de dentes comuns podem ser abrasivas para a prótese.' },
        { text: 'Retirar a prótese para dormir permite:', options: ['O descanso e oxigenação dos tecidos', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Previne infeções fúngicas e inflamação.' },
        { text: 'Treinar a fala lendo em voz alta em frente ao espelho:', options: ['Acelera a adaptação fonética', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ajuda a língua a encontrar os novos limites.' },
        { text: 'Começar por comer alimentos macios e em pedaços pequenos:', options: ['Facilita a aprendizagem da mastigação', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A mastigação com prótese requer um novo equilíbrio bilateral.' },
        { text: 'Massajar a gengiva com uma escova macia ou gaze:', options: ['Melhora a circulação nos tecidos de suporte', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Mantém a mucosa saudável sob a prótese.' },
        { text: 'Colocar a prótese num copo com água à noite:', options: ['Evita que o acrílico resseque e deforme', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Mantém a estabilidade dimensional do material.' }
      ]
    }
  },
  'Ortodontia': {
    complaints: [
      'Dentes muito "tortos" ou encavalitados (apinhamento).', 'Dentes da frente muito para a frente (projeção).', 'Espaços grandes entre os dentes.', 
      'Dificuldade em fechar a boca corretamente.', 'Mordida que parece "torta".', 'Dente que não nasceu e está preso no osso.',
      'Dor na articulação da mandíbula.', 'Inestética do perfil facial.', 'Dificuldade em higienizar dentes muito juntos.',
      'Desejo de usar alinhadores invisíveis.'
    ],
    histories: [
      'Hábito de chupar o dedo ou usar chupeta até tarde.', 'Perda precoce de dentes de leite.', 'Respiração bucal crónica.',
      'História familiar de problemas de mordida.', 'Trauma nos dentes da frente.', 'Tratamento ortodôntico prévio sem contenção.',
      'Dificuldade em mastigar ou deglutir.', 'Dores de cabeça frequentes.', 'Uso de instrumentos de sopro.',
      'Desejo de melhorar a autoestima através do sorriso.'
    ],
    symptoms: [
      ['Classe I de Angle', 'Apinhamento anterior', 'Mordida normal'], 
      ['Classe II de Angle', 'Maxila avançada', 'Perfil convexo'], 
      ['Classe III de Angle', 'Mandíbula avançada', 'Perfil côncavo'],
      ['Mordida aberta', 'Dentes não se tocam na frente'],
      ['Mordida cruzada', 'Dentes superiores por dentro dos inferiores']
    ],
    evolutionTimes: ['Anos', 'Desde a infância', 'Progressivo', 'Após perda de dente'],
    functionalLimitations: [
      'Dificuldade na higienização interdentária.', 'Desconforto ao mastigar após ajustes.', 'Feridas na bochecha por atrito do aparelho.'
    ],
    questions: {
      evaluation: [
        { text: 'A telerradiografia lateral serve para:', options: ['Análise cefalométrica (ossos e dentes)', 'Ver cáries', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Mede ângulos e distâncias para planear o movimento.' },
        { text: 'Os modelos de estudo (gesso ou digital) avaliam o:', options: ['Espaço disponível vs espaço necessário', 'Cor do dente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Determina se é preciso extrair dentes ou expandir o arco.' },
        { text: 'A análise facial observa a:', options: ['Simetria, perfil e linha do sorriso', 'Apenas os dentes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O objetivo é a harmonia de todo o rosto.' },
        { text: 'A ortopantomografia deteta:', options: ['Dentes inclusos, agenesias ou supranumerários', 'Apenas cáries', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Visão geral de todos os dentes e raízes.' },
        { text: 'A avaliação da maturação óssea (mão e punho):', options: ['Indica se o paciente ainda vai crescer', 'Verifica fraturas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Vital para decidir o momento de usar aparelhos ortopédicos.' },
        { text: 'O exame intraoral avalia a:', options: ['Saúde das gengivas e presença de cáries', 'Apenas a posição', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Não se coloca aparelho em dentes doentes.' }
      ],
      diagnosis: [
        { text: 'O Apinhamento Dentário resulta de:', options: ['Falta de espaço no arco para todos os dentes', 'Dentes muito pequenos', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Causa dentes rodados ou fora do arco.' },
        { text: 'A Mordida Cruzada Posterior significa que:', options: ['Os dentes de cima mordem por dentro dos de baixo', 'Os dentes não se tocam', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Pode causar desvios na mandíbula e assimetria facial.' },
        { text: 'A Mordida Aberta Anterior é comum em:', options: ['Pacientes com hábitos de sucção ou respiração bucal', 'Idosos', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Os dentes da frente não têm contacto vertical.' },
        { text: 'O Diastema é o:', options: ['Espaço livre entre dois dentes', 'Dente encavalitado', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Comum entre os incisivos centrais superiores.' },
        { text: 'A Sobremordida (Overbite) acentuada é quando:', options: ['Os dentes de cima cobrem demais os de baixo', 'Os dentes estão para a frente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Pode causar trauma na gengiva palatina.' },
        { text: 'Um dente "Incluso" é aquele que:', options: ['Não nasceu e ficou dentro do osso', 'Caiu', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Comum em caninos e sisos.' }
      ],
      treatment: [
        { text: 'O aparelho fixo (brackets) usa:', options: ['Forças leves e contínuas para mover dentes', 'Cola forte', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O osso remodela-se permitindo o movimento dentário.' },
        { text: 'Os alinhadores transparentes são:', options: ['Placas removíveis e estéticas para alinhar dentes', 'Aparelhos fixos', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Trocam-se a cada 1-2 semanas seguindo um plano digital.' },
        { text: 'O expansor palatino (disjuntor) serve para:', options: ['Alargar o maxilar superior (céu da boca)', 'Endireitar dentes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Corrige mordidas cruzadas e ganha espaço.' },
        { text: 'As contenções (fixas ou removíveis) servem para:', options: ['Manter os dentes na posição final e evitar recidiva', 'Mover dentes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Os dentes têm "memória" e tendem a voltar ao sítio antigo.' },
        { text: 'Os elásticos intermaxilares servem para:', options: ['Corrigir a relação entre a arcada superior e inferior', 'Segurar o aparelho', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Melhoram o encaixe da mordida.' },
        { text: 'A extração de pré-molares pode ser necessária para:', options: ['Ganhar espaço em casos de apinhamento severo', 'Apenas por cárie', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Permite alinhar os dentes restantes sem projetar os lábios.' }
      ],
      exercises: [
        { text: 'Higienizar o aparelho com escovas interdentais e passa-fio:', options: ['Evita cáries e inflamação gengival durante o tratamento', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O aparelho retém muita placa bacteriana.' },
        { text: 'Evitar alimentos duros ou pegajosos (pastilhas, pipocas):', options: ['Previne a quebra de brackets e descolagem de peças', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Peças soltas atrasam o tratamento.' },
        { text: 'Usar os elásticos conforme a orientação do ortodontista:', options: ['Garante que a mordida encaixa no tempo previsto', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A colaboração do paciente é fundamental.' },
        { text: 'Fazer bochechos com flúor diariamente:', options: ['Fortalece o esmalte contra manchas brancas (desmineralização)', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Protege as zonas à volta dos brackets.' },
        { text: 'Vigiar pontas de arco que magoam e usar cera ortodôntica:', options: ['Evita aftas e feridas na mucosa', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Conforto durante a fase de alinhamento.' },
        { text: 'Comparecer mensalmente às consultas de ajuste:', options: ['Permite o progresso contínuo do movimento dentário', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Sem ativação, os dentes param de mover.' }
      ]
    }
  },
  'Implantodontia': {
    complaints: [
      'Falta de um ou mais dentes que incomoda ao sorrir.', 'Dificuldade em mastigar por falta de dentes posteriores.', 'Prótese total (dentadura) que abana muito.', 
      'Desejo de ter dentes fixos novamente.', 'Dente que caiu e quer repor rápido.', 'Espaço entre dentes que causa inclinação dos vizinhos.',
      'Insegurança ao falar por medo da prótese cair.', 'Osso que parece estar a "diminuir" onde não há dentes.', 'Dificuldade em saborear alimentos com o palato coberto.',
      'Desejo de uma solução definitiva e duradoura.'
    ],
    histories: [
      'Perda de dentes por cárie ou doença periodontal.', 'Uso de próteses removíveis há muitos anos.', 'Trauma dentário com perda total do dente.',
      'História de insucesso com pontes fixas antigas.', 'Diabetes controlada ou osteoporose.', 'Tabagismo (fator de risco para insucesso).',
      'Uso de bifosfonatos (requer cuidado especial).', 'História de extrações traumáticas.', 'Desejo de reabilitação total.',
      'Falta de dentes congénita (agenesia).'
    ],
    symptoms: [
      ['Edentulismo parcial', 'Espaço edêntulo', 'Atrofia óssea'], 
      ['Edentulismo total', 'Reabsorção severa', 'Instabilidade protética'], 
      ['Peri-implantite', 'Sangramento ao redor do implante', 'Perda óssea'], 
      ['Mucosite peri-implantar', 'Inflamação gengival', 'Sem perda óssea'],
      ['Falta de suporte labial', 'Perfil facial alterado']
    ],
    evolutionTimes: ['Meses', 'Anos', 'Recentemente', 'Desde a extração'],
    functionalLimitations: [
      'Falta de eficiência mastigatória.', 'Insegurança social por falta de dentes.', 'Necessidade de dieta pastosa pós-cirurgia.'
    ],
    questions: {
      evaluation: [
        { text: 'A Tomografia Computadorizada (CBCT) é essencial para:', options: ['Avaliar altura e largura do osso disponível', 'Ver cáries', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Permite planear a posição do implante em 3D.' },
        { text: 'A avaliação da saúde sistémica (exames de sangue):', options: ['Garante que o paciente pode cicatrizar bem', 'Verifica a cor do dente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Diabetes e coagulação são pontos críticos.' },
        { text: 'A análise do espaço protético verifica se:', options: ['Há lugar para o dente novo e se ele encaixa na mordida', 'O dente é branco', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Evita dentes demasiado pequenos ou grandes.' },
        { text: 'A qualidade do osso (densidade) influencia a:', options: ['Estabilidade primária do implante', 'Cor da gengiva', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ossos mais densos seguram melhor o implante no dia da cirurgia.' },
        { text: 'O mapeamento gengival avalia a:', options: ['Presença de gengiva queratinizada (protetora)', 'Apenas a cor', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Vital para a longevidade do implante a longo prazo.' },
        { text: 'A simulação digital (planeamento virtual):', options: ['Permite prever o resultado final antes da cirurgia', 'É apenas para mostrar ao paciente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Aumenta a precisão e segurança do procedimento.' }
      ],
      diagnosis: [
        { text: 'Um Implante Dentário é uma:', options: ['Raiz artificial de titânio colocada no osso', 'Coroa de porcelana', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Serve de base para o dente novo.' },
        { text: 'A Osseointegração é o processo de:', options: ['União direta e funcional entre osso e implante', 'Colagem com resina', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Leva geralmente 3 a 6 meses para completar.' },
        { text: 'A Atrofia Óssea ocorre quando:', options: ['O osso desaparece por falta de estímulo (dente)', 'O dente está presente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Pode exigir enxertos ósseos antes do implante.' },
        { text: 'A Peri-implantite é uma:', options: ['Infeção bacteriana que destrói o osso ao redor do implante', 'Inflamação leve', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Equivalente à periodontite, mas no implante.' },
        { text: 'Carga Imediata é quando:', options: ['O dente provisório é colocado no mesmo dia do implante', 'O tratamento demora um ano', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Requer excelente estabilidade inicial do implante.' },
        { text: 'A Fenestração Óssea é uma:', options: ['Falha no osso que expõe parte do implante', 'Cárie no implante', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Requer correção com enxerto ou membrana.' }
      ],
      treatment: [
        { text: 'O Levantamento do Seio Maxilar serve para:', options: ['Ganhar altura óssea na zona dos molares superiores', 'Endireitar o nariz', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Permite colocar implantes onde o seio maxilar é muito baixo.' },
        { text: 'O Enxerto Ósseo (Bio-Oss ou autólogo) visa:', options: ['Recuperar o volume de osso perdido', 'Branquear dentes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Cria uma base sólida para o implante.' },
        { text: 'O Pilar (Abutment) é a peça que:', options: ['Liga o implante à coroa final', 'Fica dentro do osso', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Fica acima da gengiva e segura o dente.' },
        { text: 'A Coroa sobre Implante pode ser:', options: ['Aparafusada ou cimentada', 'Apenas colada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Aparafusada permite manutenção mais fácil.' },
        { text: 'A cirurgia guiada usa um:', options: ['Guia cirúrgico impresso em 3D para maior precisão', 'Apenas o olho do dentista', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Posiciona o implante exatamente como planeado no computador.' },
        { text: 'A manutenção profissional (limpeza) de implantes:', options: ['É vital para evitar a peri-implantite', 'É desnecessária porque não têm cárie', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Implantes exigem cuidados de higiene rigorosos.' }
      ],
      exercises: [
        { text: 'Usar fio dental específico para implantes ou escovilhões:', options: ['Garante a limpeza eficaz sob as coroas e pontas', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A higiene ao redor do implante é diferente do dente natural.' },
        { text: 'Evitar fumar durante a fase de cicatrização:', options: ['Aumenta drasticamente a taxa de sucesso da osseointegração', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O tabaco prejudica a circulação e a chegada de células de cura.' },
        { text: 'Fazer dieta líquida/pastosa nos primeiros dias pós-cirurgia:', options: ['Evita trauma na zona operada e pontos', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Protege o coágulo e a estabilidade inicial.' },
        { text: 'Não mastigar alimentos muito duros sobre implantes novos:', options: ['Evita sobrecarga mecânica durante a integração', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O implante não tem o ligamento amortecedor do dente.' },
        { text: 'Usar um irrigador oral (Waterpik) pode ajudar na:', options: ['Limpeza de próteses protocolares (fixas totais)', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Remove restos de comida debaixo da prótese.' },
        { text: 'Vigiar qualquer sangramento ou mobilidade do implante:', options: ['São sinais de alerta que requerem consulta urgente', 'É normal', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A deteção precoce de problemas salva o implante.' }
      ]
    }
  },
  'Cirurgia Oral': {
    complaints: [
      'Dente do siso que está a nascer e dói muito.', 'Inchaço no rosto após extração dentária.', 'Dente partido que precisa de ser removido.', 
      'Ferida na boca que não cicatriza.', 'Sensação de "clique" ou bloqueio ao abrir a boca.', 'Dente que ficou preso no osso e não nasce.',
      'Desejo de remover um freio labial muito curto.', 'Pequena "bolinha" na gengiva que deita pus.', 'Dor intensa após comer, na zona de uma extração antiga.',
      'Dificuldade em abrir a boca (trismo).'
    ],
    histories: [
      'História de dentes inclusos ou impactados.', 'Trauma facial recente (queda ou acidente).', 'Uso de anticoagulantes (requer cuidados na cirurgia).',
      'História de infeções dentárias recorrentes.', 'Necessidade de cirurgia pré-protética.', 'Tabagismo (atrasa a cicatrização).',
      'História de alveolite em extrações anteriores.', 'Uso de bifosfonatos.', 'Desejo de realizar biópsia de lesão suspeita.',
      'Encaminhamento da ortodontia para extrações.'
    ],
    symptoms: [
      ['Dente incluso', 'Impactação óssea', 'Pericoronarite'], 
      ['Edema facial', 'Trismo', 'Linfadenopatia'], 
      ['Alveolite seca', 'Dor pulsátil', 'Ausência de coágulo'],
      ['Comunicação bucosinusal', 'Passagem de ar/líquidos pelo nariz'],
      ['Parestesia', 'Dormência no lábio ou língua']
    ],
    evolutionTimes: ['24 horas', '3 dias', '1 semana', 'Meses', 'Súbito', 'Após trauma'],
    functionalLimitations: [
      'Limitação da abertura bucal (trismo).', 'Dificuldade em falar e comer no pós-operatório.', 'Necessidade de repouso físico.'
    ],
    questions: {
      evaluation: [
        { text: 'A ortopantomografia é o exame base para:', options: ['Localizar dentes inclusos e avaliar estruturas vizinhas', 'Ver cáries pequenas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Dá uma visão geral da mandíbula, maxila e seios maxilares.' },
        { text: 'O teste de sensibilidade nervosa avalia:', options: ['Se houve dano nos nervos alveolar ou lingual', 'A cor da gengiva', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Importante em cirurgias próximas de canais nervosos.' },
        { text: 'A palpação de gânglios cervicais procura:', options: ['Sinais de disseminação de infeção ou neoplasia', 'Cáries', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Gânglios aumentados e duros são sinais de alerta.' },
        { text: 'A medição da abertura bucal verifica:', options: ['A presença de trismo ou limitação funcional', 'O tamanho dos dentes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Essencial para planear o acesso cirúrgico.' },
        { text: 'A avaliação da coagulação (INR/Tempo de Protrombina):', options: ['Garante a segurança contra hemorragias', 'Verifica a glicémia', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Vital para pacientes medicados com anticoagulantes.' },
        { text: 'A biópsia incisional é indicada para:', options: ['Remover uma parte da lesão para diagnóstico', 'Remover a lesão toda', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Feita em lesões grandes ou suspeitas de malignidade.' }
      ],
      diagnosis: [
        { text: 'A Pericoronarite é a inflamação da:', options: ['Gengiva que cobre um dente parcialmente erupcionado', 'Raiz do dente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Muito comum em dentes do siso inferiores.' },
        { text: 'Um dente "Impactado" é aquele que:', options: ['Não consegue nascer por falta de espaço ou posição', 'Caiu', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Pode causar reabsorção nos dentes vizinhos.' },
        { text: 'A Alveolite Seca ocorre quando:', options: ['O coágulo se desfaz após a extração, expondo o osso', 'A gengiva cresce rápido', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Causa dor intensa e mau hálito 2-3 dias após a cirurgia.' },
        { text: 'Um Quisto Radicular é uma:', options: ['Lesão inflamatória no ápice de um dente sem vitalidade', 'Cárie superficial', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Pode crescer e destruir o osso ao redor.' },
        { text: 'A Comunicação Bucosinusal é um:', options: ['Furo entre a boca e o seio maxilar após extração', 'Canal de cárie', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Comum em extrações de molares superiores com raízes longas.' },
        { text: 'O Torus Mandibular é um:', options: ['Crescimento ósseo benigno na face interna da mandíbula', 'Cancro oral', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Geralmente não requer tratamento, a menos que incomode a prótese.' }
      ],
      treatment: [
        { text: 'A Exodontia Simples é a:', options: ['Remoção de um dente usando fórceps e alavancas', 'Cirurgia com corte de osso', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Feita em dentes com coroa íntegra e boa exposição.' },
        { text: 'A Osteotomia é o procedimento de:', options: ['Remoção de osso para libertar um dente preso', 'Corte da gengiva', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Necessária em muitos casos de dentes do siso inclusos.' },
        { text: 'A Sutura (pontos) serve para:', options: ['Aproximar os bordos da ferida e ajudar na paragem do sangue', 'Segurar o dente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Protege o coágulo e acelera a cicatrização.' },
        { text: 'A Frenectomia é a cirurgia para:', options: ['Remover ou reposicionar um freio labial ou lingual', 'Tirar o siso', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Resolve problemas de fala ou espaços entre dentes.' },
        { text: 'A Apicectomia consiste na:', options: ['Remoção da ponta da raiz de um dente infetado', 'Extração total', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Última tentativa de salvar o dente após falha do canal.' },
        { text: 'O uso de gelo (crioterapia) nas primeiras 24h:', options: ['Reduz o inchaço e a dor pós-operatória', 'Aumenta o sangue', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Causa vasoconstrição e limita o edema.' }
      ],
      exercises: [
        { text: 'Morder uma gaze seca sobre a ferida por 30-45 min:', options: ['Ajuda na formação e estabilização do coágulo', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A pressão mecânica para a hemorragia inicial.' },
        { text: 'Não fazer bochechos vigorosos nas primeiras 24 horas:', options: ['Evita deslocar o coágulo e causar alveolite', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O coágulo é a base da cicatrização.' },
        { text: 'Dormir com a cabeça mais elevada (dois travesseiros):', options: ['Diminui a pressão sanguínea na cabeça e o inchaço', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ajuda na drenagem linfática do rosto.' },
        { text: 'Evitar esforços físicos intensos por 3 a 5 dias:', options: ['Previne hemorragias secundárias por aumento da pressão', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O repouso é fundamental para a cura dos tecidos.' },
        { text: 'Alimentação fria e pastosa no primeiro dia:', options: ['Evita queimar a zona anestesiada e protege a ferida', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O calor dilata os vasos e pode provocar sangramento.' },
        { text: 'Não usar palhinhas (canudos) para beber líquidos:', options: ['A sucção pode remover o coágulo da ferida', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A pressão negativa é perigosa para o alvéolo vazio.' }
      ]
    }
  },
  'Odontopediatria': {
    complaints: [
      'Criança com dor de dente que não a deixa dormir.', 'Dente de leite que não cai e o definitivo está a nascer atrás.', 'Trauma no dente da frente após queda na escola.', 
      'Manchas brancas ou castanhas nos dentes do bebé.', 'Dificuldade em escovar os dentes por falta de colaboração.', 'Dente de leite que "entrou" para dentro da gengiva após batida.',
      'Aftas ou feridas na boca da criança.', 'Dentes que parecem estar a nascer "tortos".', 'Hábito de chupar o dedo que preocupa os pais.',
      'Primeira consulta de rotina (check-up).'
    ],
    histories: [
      'Uso prolongado de biberão (mamadeira) com açúcar.', 'História de quedas frequentes com impacto na boca.', 'Hábitos de sucção (chupeta, dedo).',
      'Dieta rica em doces e sumos.', 'Medo ou ansiedade extrema perante o dentista.', 'História de cáries precoces na infância.',
      'Respiração bucal ou ressonar.', 'Perda precoce de dentes de leite por cárie.', 'Uso de medicação crónica (xaropes com açúcar).',
      'Dificuldade na fala ou deglutição.'
    ],
    symptoms: [
      ['Cárie de infância precoce', 'Lesões múltiplas', 'Destruição coronária'], 
      ['Dente de leite retido', 'Dente permanente em erupção ectópica'], 
      ['Avulsão dentária', 'Dente fora do alvéolo', 'Trauma'],
      ['Gengivostomatite herpética', 'Febre', 'Várias aftas dolorosas'],
      ['Hipoplasia do esmalte', 'Manchas estruturais', 'Sensibilidade']
    ],
    evolutionTimes: ['Desde ontem', 'Algumas horas (trauma)', 'Meses', 'Progressivo', 'Recently'],
    functionalLimitations: [
      'Dificuldade na alimentação da criança.', 'Interrupção do sono pelo choro/dor.', 'Falta de colaboração na higiene oral.'
    ],
    questions: {
      evaluation: [
        { text: 'O condicionamento comportamental visa:', options: ['Ganhar a confiança da criança para o tratamento', 'Obrigar a criança a abrir a boca', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Usa técnicas como "Dizer-Mostrar-Fazer".' },
        { text: 'A avaliação da cronologia de erupção verifica se:', options: ['Os dentes estão a nascer na idade e ordem correta', 'Os dentes são brancos', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Deteta atrasos ou dentes em falta precocemente.' },
        { text: 'O exame de risco de cárie avalia:', options: ['Dieta, higiene e exposição ao flúor', 'Apenas a força da mordida', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Determina a frequência das consultas de revisão.' },
        { text: 'A radiografia bite-wing em crianças serve para:', options: ['Detetar cáries entre os molares de leite', 'Ver o osso do nariz', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Zonas de contacto difícil de ver a olho nu.' },
        { text: 'A avaliação do freio labial e lingual observa:', options: ['Impacto na fala, amamentação ou posição dos dentes', 'A cor da língua', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Um freio curto pode causar "língua presa".' },
        { text: 'O teste de sensibilidade em dentes traumatizados:', options: ['Monitoriza a vitalidade do nervo após o impacto', 'Verifica se o dente está torto', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Essencial para decidir se é preciso tratamento de canal.' }
      ],
      diagnosis: [
        { text: 'A Cárie de Infância Precoce é causada por:', options: ['Uso frequente de biberão com líquidos açucarados', 'Falta de leite', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Afeta rapidamente vários dentes de leite.' },
        { text: 'A Exfoliação é o processo de:', options: ['Queda natural do dente de leite', 'Nascimento do dente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ocorre quando a raiz do dente de leite é "comida" pelo definitivo.' },
        { text: 'A Intrusão Dentária é quando o dente:', options: ['É empurrado para dentro do osso após um trauma', 'Cai para fora', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Pode danificar o dente permanente que está por baixo.' },
        { text: 'O Selante de Fissura é uma:', options: ['Resina protetora colocada nos sulcos dos molares', 'Cárie profunda', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Previne a acumulação de comida e bactérias em zonas difíceis.' },
        { text: 'A Pulpotomia é o tratamento de:', options: ['Remoção da polpa da coroa num dente de leite', 'Extração do dente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Mantém a raiz viva para o dente não cair antes do tempo.' },
        { text: 'Um Mantenedor de Espaço é usado quando:', options: ['Um dente de leite é perdido cedo demais', 'Os dentes estão tortos', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Evita que os vizinhos inclinem e fechem o lugar do definitivo.' }
      ],
      treatment: [
        { text: 'A aplicação tópica de Flúor serve para:', options: ['Remineralizar o esmalte e torná-lo mais resistente', 'Limpar os dentes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Protege contra os ácidos das bactérias.' },
        { text: 'A restauração de dentes de leite é importante para:', options: ['Manter a função, o espaço e evitar dor/infeção', 'Apenas estética', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Dentes de leite saudáveis guiam os definitivos.' },
        { text: 'O tratamento de canal em dentes de leite (pulpectomia):', options: ['Visa eliminar a infeção e manter o dente na boca', 'É impossível de fazer', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Evita extrações precoces e abcessos.' },
        { text: 'A técnica de ART (Tratamento Restaurador Atraumático):', options: ['Usa instrumentos manuais para remover cárie sem "motorzinho"', 'É feita com laser', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Excelente para crianças com muito medo.' },
        { text: 'A orientação de higiene oral deve incluir:', options: ['Ensinar a técnica correta aos pais e à criança', 'Apenas dar uma escova', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Até aos 8 anos, os pais devem supervisionar a escovagem.' },
        { text: 'O uso de coroas de aço inoxidável serve para:', options: ['Reabilitar dentes de leite com muita destruição', 'Dentes da frente', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Solução duradoura até o dente cair naturalmente.' }
      ],
      exercises: [
        { text: 'Escovar os dentes 2x ao dia com pasta de 1000-1450 ppm flúor:', options: ['É a medida mais eficaz contra a cárie', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A quantidade de pasta deve ser adaptada à idade (grão de arroz ou ervilha).' },
        { text: 'Usar fio dental onde os dentes estão encostados:', options: ['Limpa as zonas onde a escova não entra', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Cáries entre dentes são muito comuns em crianças.' },
        { text: 'Beber água em vez de sumos ou refrigerantes:', options: ['Reduz a exposição ao açúcar e ácidos', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A água ajuda a limpar a boca e hidrata.' },
        { text: 'Abandonar o uso de chupeta ou sucção digital até aos 3 anos:', options: ['Evita deformações no céu da boca e posição dos dentes', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Hábitos prolongados causam mordida aberta.' },
        { text: 'Fazer bochechos com água após comer doces (se não puder escovar):', options: ['Ajuda a remover o excesso de açúcar da boca', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Medida paliativa simples.' },
        { text: 'Visitar o odontopediatra a cada 6 meses:', options: ['Permite detetar problemas no início e criar bons hábitos', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Prevenção é menos traumática que tratamento.' }
      ]
    }
  },
  'Estomatologia': {
    complaints: [
      'Ferida na boca que não cicatriza há mais de 15 dias.', 'Mancha branca ou vermelha na língua que não sai.', 'Boca muito seca e dificuldade em engolir.', 
      'Ardência bucal persistente sem causa aparente.', 'Inchaço indolor no lábio ou bochecha.', 'Alteração no paladar (gosto metálico).',
      'Várias aftas que aparecem ao mesmo tempo.', 'Caroço no pescoço associado a lesão na boca.', 'Sangramento espontâneo da gengiva ou mucosa.',
      'Dificuldade em abrir a boca ou mover a língua.'
    ],
    histories: [
      'Uso prolongado de tabaco e álcool.', 'História de cancro na família.', 'Exposição solar sem proteção nos lábios.',
      'Doenças sistémicas (ex: Lúpus, HIV, Diabetes).', 'Uso de próteses mal adaptadas que causam trauma.', 'Tratamento prévio com radioterapia ou quimioterapia.',
      'Stress e ansiedade (relacionado com aftas ou ardência).', 'Deficiências vitamínicas (B12, Ferro).', 'História de infeções virais (Herpes, HPV).',
      'Uso de múltiplos medicamentos (polifarmácia).'
    ],
    symptoms: [
      ['Leucoplasia', 'Mancha branca', 'Não removível à raspagem'], 
      ['Eritroplasia', 'Mancha vermelha', 'Alto risco de malignidade'], 
      ['Carcinoma Espinocelular', 'Úlcera com bordos endurecidos', 'Indolor no início'],
      ['Candidíase Pseudomembranosa', 'Placas brancas removíveis', 'Ardência'],
      ['Líquen Plano', 'Estrias brancas (Wickham)', 'Bilateral']
    ],
    evolutionTimes: ['2 semanas', '1 mês', '6 meses', 'Anos', 'Recorrente', 'Progressivo'],
    functionalLimitations: [
      'Dor ao comer alimentos ácidos ou picantes.', 'Dificuldade em mover a língua ou engolir.', 'Ansiedade pelo diagnóstico de lesões.'
    ],
    questions: {
      evaluation: [
        { text: 'O autoexame da boca serve para:', options: ['Detetar precocemente alterações suspeitas', 'Substituir o dentista', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O paciente deve conhecer a sua boca normal.' },
        { text: 'A biópsia é o exame definitivo para:', options: ['Confirmar o diagnóstico de lesões suspeitas', 'Ver cáries', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Analisa o tecido ao microscópio.' },
        { text: 'A citologia esfoliativa é útil para:', options: ['Rastreio de infeções fúngicas ou virais', 'Diagnóstico de cancro', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Recolha de células superficiais com uma escova.' },
        { text: 'A palpação bimanual do soalho da boca procura:', options: ['Nódulos ou endurecimentos profundos', 'Dentes a abanar', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Deteta alterações que não se veem à superfície.' },
        { text: 'O teste de fluxo salivar (sialometria) avalia a:', options: ['Quantidade de saliva produzida', 'Qualidade do hálito', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Importante no diagnóstico de xerostomia (boca seca).' },
        { text: 'A luz de fluorescência (Velscope) ajuda a:', options: ['Identificar áreas de tecido anormal não visíveis', 'Branquear dentes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ferramenta auxiliar no rastreio do cancro oral.' }
      ],
      diagnosis: [
        { text: 'O Cancro Oral manifesta-se frequentemente como:', options: ['Uma úlcera indolor que não cicatriza', 'Uma cárie', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A falta de dor no início atrasa o diagnóstico.' },
        { text: 'A Candidíase Oral é uma infeção por:', options: ['Fungos (Candida albicans)', 'Vírus', 'Bactérias', 'Nada'], correctIdx: 0, explanation: 'Comum em bebés, idosos e imunodeprimidos.' },
        { text: 'O Herpes Labial é causado pelo vírus:', options: ['Herpes Simplex (HSV-1)', 'HIV', 'Gripe', 'Nada'], correctIdx: 0, explanation: 'Causa bolhas dolorosas que formam crostas.' },
        { text: 'A Estomatite Aftosa Recorrente são as:', options: ['Aftas comuns que aparecem e desaparecem', 'Feridas de cancro', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Relacionadas com imunidade, stress e trauma.' },
        { text: 'O Mucocele é uma:', options: ['Bolinha de saliva por rotura de uma glândula pequena', 'Cárie na bochecha', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Comum no lábio inferior após mordedura.' },
        { text: 'A Síndrome da Ardência Bucal caracteriza-se por:', options: ['Sensação de queimadura sem lesões visíveis', 'Feridas abertas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Mais comum em mulheres pós-menopausa.' }
      ],
      treatment: [
        { text: 'A remoção de fatores irritantes (ex: dente partido):', options: ['Elimina a causa do trauma crónico na mucosa', 'É apenas estética', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O trauma constante pode levar a lesões pré-malignas.' },
        { text: 'Os corticoides tópicos são usados para:', options: ['Reduzir a inflamação em doenças autoimunes ou aftas', 'Matar bactérias', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ajudam a controlar a dor e a cicatrização.' },
        { text: 'A nistatina ou fluconazol tratam:', options: ['Infeções fúngicas (Candidíase)', 'Vírus do herpes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Medicamentos antifúngicos específicos.' },
        { text: 'A laserterapia de baixa potência ajuda na:', options: ['Cicatrização de feridas e alívio da dor', 'Extração de dentes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Estimula a regeneração celular.' },
        { text: 'Substitutos salivares (saliva artificial) ajudam na:', options: ['Boca seca (xerostomia)', 'Cárie', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Lubrificam a boca e facilitam a fala e deglutição.' },
        { text: 'A cirurgia de remoção de lesões benignas visa:', options: ['Eliminar o desconforto e obter diagnóstico final', 'Apenas estética', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Garante que a lesão não volta a crescer.' }
      ],
      exercises: [
        { text: 'Fazer o autoexame da boca uma vez por mês:', options: ['Permite conhecer a normalidade e notar alterações', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Olhar língua, bochechas, palato e gengivas.' },
        { text: 'Evitar alimentos muito quentes, picantes ou ácidos:', options: ['Reduz a irritação em mucosas sensíveis ou com feridas', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Dá conforto durante a cicatrização.' },
        { text: 'Parar de fumar e reduzir o consumo de álcool:', options: ['Diminui drasticamente o risco de cancro oral', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'São os dois principais fatores de risco.' },
        { text: 'Manter a boca hidratada bebendo água aos golinhos:', options: ['Alivia a sensação de boca seca', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ajuda na autolimpeza da boca.' },
        { text: 'Usar protetor solar labial diariamente:', options: ['Previne o cancro do lábio e o envelhecimento precoce', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O lábio inferior é muito exposto ao sol.' },
        { text: 'Consultar o dentista se uma ferida durar mais de 2 semanas:', options: ['É a regra de ouro para o diagnóstico precoce', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Lesões persistentes devem ser sempre avaliadas.' }
      ]
    }
  },
  'Infectologia': {
    complaints: [
      'Febre alta e persistente com calafrios.', 'Manchas vermelhas na pele e dor de cabeça.', 'Diarréia profusa e desidratação.', 
      'Tosse seca e falta de ar progressiva.', 'Ferida que não cicatriza e tem pus.', 'Dor ao urinar e corrimento.',
      'Amígdalas inchadas com placas brancas.', 'Dor nas articulações e cansaço extremo.', 'Náuseas e olhos amarelados.',
      'Suores noturnos e perda de peso.'
    ],
    histories: [
      'Viagem recente a zona endémica (ex: África, Amazónia).', 'Contacto com pessoas doentes.', 'Picada de inseto (mosquito, carraça).',
      'Consumo de água ou alimentos suspeitos.', 'Comportamento sexual de risco.', 'Uso de drogas injetáveis.',
      'Mordedura de animal (cão, morcego).', 'Cirurgia ou internamento recente.', 'Imunossupressão (HIV, quimioterapia).',
      'Falta de vacinação em dia.'
    ],
    symptoms: [
      ['Febre > 38.5ºC', 'Mialgias', 'Cefaleia'], 
      ['Exantema', 'Linfadenopatias', 'Artralgias'], 
      ['Vómitos', 'Diarreia aquosa', 'Dor abdominal'],
      ['Tosse', 'Expetoração purulenta', 'Crepitações'],
      ['Icterícia', 'Hepatomegalia', 'Urina escura']
    ],
    evolutionTimes: ['24 horas', '3 dias', '1 semana', '2 semanas', 'Início súbito', 'Recorrente'],
    functionalLimitations: [
      'Incapacidade de sair da cama por fraqueza.', 'Necessidade de isolamento respiratório ou de contacto.', 'Dificuldade em ingerir líquidos.',
      'Impacto na rotina por febre alta incapacitante.', 'Risco de transmissão a familiares.', 'Necessidade de internamento hospitalar.'
    ],
    questions: {
      evaluation: [
        { text: 'A Hemocultura serve para:', options: ['Detetar bactérias ou fungos no sangue', 'Ver o nível de açúcar', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Identifica o agente causador da infeção sistémica.' },
        { text: 'A Proteína C Reativa (PCR) elevada sugere:', options: ['Inflamação ou infeção aguda', 'Falta de vitaminas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'É um marcador inespecífico de fase aguda.' },
        { text: 'O teste de HIV deve ser feito:', options: ['Sempre que houver exposição de risco', 'Apenas se houver sintomas', 'Nunca', 'Nada'], correctIdx: 0, explanation: 'O diagnóstico precoce é fundamental para o sucesso do tratamento.' },
        { text: 'A análise do líquor (LCR) é vital na suspeita de:', options: ['Meningite', 'Gripe', 'Diarreia', 'Nada'], correctIdx: 0, explanation: 'Confirma a inflamação das meninges e o agente.' },
        { text: 'O teste rápido da Malária deteta:', options: ['Antigénios do Plasmodium', 'Vírus da gripe', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Permite diagnóstico e tratamento imediato em zonas de risco.' },
        { text: 'A pesquisa de ovos e parasitas nas fezes avalia:', options: ['Infeções parasitárias intestinais', 'Bactérias do pulmão', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Identifica vermes ou protozoários.' }
      ],
      diagnosis: [
        { text: 'A Gripe é causada pelo vírus:', options: ['Influenza', 'HIV', 'Rinovírus', 'Nada'], correctIdx: 0, explanation: 'Causa epidemias sazonais com febre e dores no corpo.' },
        { text: 'A Tuberculose afeta principalmente os:', options: ['Pulmões', 'Ossos apenas', 'Olhos', 'Nada'], correctIdx: 0, explanation: 'Mas pode afetar qualquer órgão (tuberculose extrapulmonar).' },
        { text: 'A Malária é transmitida pela picada do:', options: ['Mosquito Anopheles', 'Carraça', 'Mosca', 'Nada'], correctIdx: 0, explanation: 'Doença parasitária grave comum em climas tropicais.' },
        { text: 'A Hepatite A transmite-se via:', options: ['Fecal-oral (água/alimentos contaminados)', 'Sangue', 'Ar', 'Nada'], correctIdx: 0, explanation: 'Geralmente causa infeção aguda e autolimitada.' },
        { text: 'A Dengue caracteriza-se por:', options: ['Febre alta, dor atrás dos olhos e manchas', 'Tosse e pieira', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Vírus transmitido pelo Aedes aegypti.' },
        { text: 'A Sépsis é uma:', options: ['Resposta inflamatória sistémica grave a uma infeção', 'Infeção leve da pele', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Emergência médica com risco de falência de órgãos.' }
      ],
      treatment: [
        { text: 'Os antibióticos são eficazes contra:', options: ['Bactérias', 'Vírus', 'Fungos apenas', 'Nada'], correctIdx: 0, explanation: 'Não devem ser usados em gripes ou constipações virais.' },
        { text: 'Os antivirais (ex: para HIV ou Herpes) visam:', options: ['Inibir a replicação do vírus', 'Matar bactérias', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Controlam a carga viral no organismo.' },
        { text: 'A hidratação é fundamental em doenças como:', options: ['Cólera ou Dengue', 'Apenas em fraturas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Previne o choque hipovolémico por perda de líquidos.' },
        { text: 'As vacinas são a melhor forma de:', options: ['Prevenir doenças infeciosas', 'Curar uma infeção ativa', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Estimulam o sistema imunitário a criar defesas.' },
        { text: 'O isolamento de doentes com doenças contagiosas:', options: ['Trava a cadeia de transmissão', 'É um castigo', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Protege a comunidade e outros doentes hospitalizados.' },
        { text: 'O uso correto de preservativo previne:', options: ['ISTs (Infeções Sexualmente Transmissíveis)', 'Gripe', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Barreira eficaz contra HIV, Sífilis, etc.' }
      ],
      exercises: [
        { text: 'Repouso absoluto é indicado durante:', options: ['A fase aguda de febre alta', 'Toda a vida', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Permite ao corpo poupar energia para combater o agente.' },
        { text: 'Retorno gradual à atividade física após:', options: ['A resolução dos sintomas e febre', 'O primeiro dia de antibiótico', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Evita recaídas e fadiga extrema.' },
        { text: 'Exercícios respiratórios ajudam na:', options: ['Recuperação de pneumonias', 'Diarreia', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Melhoram a ventilação de áreas afetadas.' },
        { text: 'A lavagem frequente das mãos é um:', options: ['Exercício de higiene vital', 'Hábito opcional', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A medida mais simples e eficaz para evitar infeções.' },
        { text: 'Manter uma boa nutrição ajuda o:', options: ['Sistema imunitário a recuperar', 'Vírus a crescer', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Proteínas e vitaminas são tijolos para as defesas.' },
        { text: 'Acompanhamento médico pós-infeção grave:', options: ['Garante que não há sequelas ou recaídas', 'É desnecessário', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Importante em doenças como Sépsis ou Malária.' }
      ]
    }
  },
  'Dermatologia': {
    complaints: [
      'Mancha na pele que mudou de cor e tamanho.', 'Comichão (prurido) intensa e persistente.', 'Erupção cutânea após uso de cosmético.', 
      'Queda de cabelo acentuada (alopecia).', 'Borbulhas e acne inflamatória.', 'Descamação no couro cabeludo ou cotovelos.',
      'Ferida que não cicatriza há meses.', 'Alteração na cor ou forma das unhas.', 'Bolhas que rebentam e formam crostas.',
      'Vermelhidão e calor na perna (suspeita de infeção).'
    ],
    histories: [
      'Exposição solar excessiva sem proteção.', 'História familiar de melanoma.', 'Uso de novos medicamentos ou cremes.',
      'Stress emocional elevado.', 'Contacto com plantas ou substâncias químicas.', 'História de atopia (asma, rinite).',
      'Diabetes e má circulação.', 'Uso de piscinas ou balneários públicos.', 'Trabalho ao ar livre.',
      'Doença autoimune sistémica.'
    ],
    symptoms: [
      ['Mácula eritematosa', 'Pápula', 'Prurido'], 
      ['Placa descamativa', 'Bordos definidos', 'Prateada'], 
      ['Nevo assimétrico', 'Bordos irregulares', 'Várias cores'],
      ['Pústulas', 'Comedões', 'Cicatrizes de acne'],
      ['Vesículas em base eritematosa', 'Dor tipo queimadura']
    ],
    evolutionTimes: ['1 semana', '1 mês', '6 meses', 'Anos', 'Súbito após exposição', 'Progressivo'],
    functionalLimitations: [
      'Comichão que impede o sono.', 'Desconforto estético e isolamento social.', 'Risco de infeção por coceira.'
    ],
    questions: {
      evaluation: [
        { text: 'A dermatoscopia serve para:', options: ['Avaliar sinais (nevos) com detalhe', 'Ver o interior do estômago', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Usa lentes de aumento para detetar padrões de cancro da pele.' },
        { text: 'A biópsia cutânea é o exame definitivo para:', options: ['Diagnosticar tumores ou doenças inflamatórias', 'Ver a cor da pele apenas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Análise laboratorial de um pequeno fragmento de pele.' },
        { text: 'O teste de contacto (Patch test) identifica:', options: ['Alergias de contacto', 'Alergias alimentares', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Aplica substâncias na pele para ver a reação após 48-72h.' },
        { text: 'A lâmpada de Wood ajuda a diagnosticar:', options: ['Micoses e alterações de pigmentação', 'Fraturas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Usa luz UV para fazer brilhar certos fungos ou bactérias.' },
        { text: 'A observação das unhas e cabelos faz parte do:', options: ['Exame dermatológico completo', 'Exame de visão', 'Nada', 'Nada'], correctIdx: 0, explanation: 'São anexos cutâneos que refletem muitas doenças.' },
        { text: 'O sinal de Nikolsky avalia a:', options: ['Aderência da epiderme (em doenças bolhosas)', 'Força muscular', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Positivo se a pele sai ao esfregar levemente.' }
      ],
      diagnosis: [
        { text: 'O Melanoma é o tipo de cancro da pele:', options: ['Mais perigoso e com risco de metástases', 'Mais comum e inofensivo', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Deriva dos melanócitos e requer cirurgia urgente.' },
        { text: 'A Psoríase é uma doença:', options: ['Autoimune crónica com placas descamativas', 'Contagiosa', 'Causada por falta de higiene', 'Nada'], correctIdx: 0, explanation: 'Acelera o ciclo de renovação das células da pele.' },
        { text: 'A Dermatite Atópica é comum em:', options: ['Crianças com história de alergias', 'Idosos apenas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Causa pele muito seca e comichão intensa.' },
        { text: 'O Carcinoma Basocelular é o tumor:', options: ['Mais frequente, cresce lento e raramente espalha', 'Mais mortal', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Relacionado com exposição solar crónica.' },
        { text: 'A Micose (Tinha) é causada por:', options: ['Fungos', 'Vírus', 'Bactérias', 'Nada'], correctIdx: 0, explanation: 'Gosta de calor e humidade.' },
        { text: 'O Herpes Zoster (Zona) é a reativação do:', options: ['Vírus da varicela', 'Vírus da gripe', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Causa bolhas dolorosas seguindo o trajeto de um nervo.' }
      ],
      treatment: [
        { text: 'Os corticoides tópicos servem para:', options: ['Reduzir a inflamação e comichão', 'Curar micoses', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Devem ser usados com cautela para não afinar a pele.' },
        { text: 'Os antifúngicos tratam:', options: ['Micoses de pele e unhas', 'Acne', 'Cancro', 'Nada'], correctIdx: 0, explanation: 'Podem ser cremes ou comprimidos.' },
        { text: 'O protetor solar é a base da:', options: ['Prevenção do cancro da pele e envelhecimento', 'Cura da acne', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Bloqueia a radiação UV danosa.' },
        { text: 'Os hidratantes (emolientes) são vitais na:', options: ['Dermatite atópica e pele seca', 'Pele oleosa com acne', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Reparam a barreira cutânea.' },
        { text: 'A isotretinoína oral é usada em:', options: ['Acne grave ou resistente', 'Qualquer borbulha', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Medicamento potente que requer vigilância médica rigorosa.' },
        { text: 'A crioterapia (azoto líquido) serve para:', options: ['Queimar verrugas ou lesões pré-cancerosas', 'Hidratar a pele', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Usa o frio extremo para destruir tecido indesejado.' }
      ],
      exercises: [
        { text: 'Evitar coçar a pele previne:', options: ['Infeções secundárias e cicatrizes', 'A cura da doença', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O trauma das unhas abre portas a bactérias.' },
        { text: 'Banhos curtos e mornos ajudam na:', options: ['Pele sensível e atópica', 'Pele oleosa', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A água muito quente remove a gordura natural protetora.' },
        { text: 'O autoexame da pele (regra ABCDE):', options: ['Ajuda a detetar sinais suspeitos cedo', 'É desnecessário', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Vigiar Assimetria, Bordos, Cor, Diâmetro e Evolução.' },
        { text: 'Manter as unhas curtas e limpas:', options: ['Evita lesões por coceira', 'É apenas estética', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Reduz a carga bacteriana sob as unhas.' },
        { text: 'Usar roupas de algodão é melhor para:', options: ['Peles irritadas ou alérgicas', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Tecidos sintéticos ou lã podem irritar mais.' },
        { text: 'A gestão do stress melhora doenças como:', options: ['Psoríase e Dermatite Seborreica', 'Micoses', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Muitas doenças da pele têm um forte componente emocional.' }
      ]
    }
  },
  'Reumatologia': {
    complaints: [
      'Dor e rigidez matinal nas articulações.', 'Inchaço e calor nos dedos das mãos.', 'Dor lombar que melhora com o movimento.', 
      'Cansaço extremo e febre baixa.', 'Olhos e boca muito secos.', 'Dedos das mãos que ficam brancos no frio.',
      'Fraqueza muscular para subir escadas.', 'Dor generalizada em "todo o corpo".', 'Manchas na cara em forma de borboleta.',
      'Dificuldade em fechar o punho.'
    ],
    histories: [
      'História familiar de Artrite Reumatóide.', 'Tabagismo (fator de risco para autoimunidade).', 'Infeção viral ou stress antes do início da dor.',
      'Uso de medicamentos que podem causar lúpus.', 'História de psoríase na pele.', 'Menopausa precoce e osteoporose.',
      'Trabalho com movimentos repetitivos.', 'Episódios de gota prévios.', 'Abortos de repetição (suspeita de SAF).',
      'Exposição solar que causa manchas.'
    ],
    symptoms: [
      ['Sinovite', 'Rigidez matinal > 30 min', 'Simetria'], 
      ['Eritema malar', 'Fotossensibilidade', 'Artrite'], 
      ['Xerostomia', 'Xeroftalmia', 'Cáries frequentes'],
      ['Fenómeno de Raynaud', 'Espessamento da pele', 'Disfagia'],
      ['Dor em pontos específicos (tender points)', 'Sono não reparador']
    ],
    evolutionTimes: ['1 mês', '3 meses', '6 meses', 'Anos', 'Início insidioso', 'Crónico progressivo'],
    functionalLimitations: [
      'Rigidez matinal que atrasa o início do dia.', 'Dificuldade em realizar tarefas manuais finas.', 'Limitação na marcha por dor articular.'
    ],
    questions: {
      evaluation: [
        { text: 'O Fator Reumatóide e o anti-CCP ajudam no diagnóstico de:', options: ['Artrite Reumatóide', 'Artrose', 'Gota', 'Nada'], correctIdx: 0, explanation: 'São anticorpos específicos para esta doença inflamatória.' },
        { text: 'O ANA (ou FAN) é um teste de rastreio para:', options: ['Lúpus e outras doenças autoimunes', 'Infeções', 'Diabetes', 'Nada'], correctIdx: 0, explanation: 'Deteta anticorpos contra o núcleo das células.' },
        { text: 'A Velocidade de Sedimentação (VS) e PCR avaliam:', options: ['Nível de inflamação no corpo', 'A força dos ossos', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Marcadores de atividade da doença.' },
        { text: 'A ecografia articular deteta:', options: ['Inflamação (sinovite) e erosões precoces', 'Apenas fraturas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Muito sensível para ver atividade inflamatória atual.' },
        { text: 'A densitometria óssea serve para diagnosticar:', options: ['Osteoporose', 'Artrite', 'Gota', 'Nada'], correctIdx: 0, explanation: 'Mede a densidade mineral do osso.' },
        { text: 'A análise do líquido sinovial (da articulação) vê:', options: ['Cristais (gota), infeção ou inflamação', 'Apenas sangue', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Exame definitivo para diferenciar tipos de artrite.' }
      ],
      diagnosis: [
        { text: 'A Artrite Reumatóide ataca principalmente:', options: ['A membrana sinovial das pequenas articulações', 'Apenas os ossos grandes', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Causa deformidades se não for tratada cedo.' },
        { text: 'O Lúpus Eritematoso Sistémico (LES) pode afetar:', options: ['Pele, articulações, rins e sangue', 'Apenas a pele', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Doença autoimune multissistémica clássica.' },
        { text: 'A Espondilite Anquilosante afeta a:', options: ['Coluna vertebral e bacia (sacroilíacas)', 'Mãos apenas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Causa dor lombar inflamatória em jovens.' },
        { text: 'A Osteoartrose (Artrose) é o:', options: ['Desgaste da cartilagem articular', 'Inflamação autoimune', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Relacionada com idade, peso e uso mecânico.' },
        { text: 'A Gota é causada pelo excesso de:', options: ['Ácido úrico', 'Açúcar', 'Cálcio', 'Nada'], correctIdx: 0, explanation: 'Forma cristais que causam inflamação súbita e intensa.' },
        { text: 'A Fibromialgia caracteriza-se por:', options: ['Dor crónica generalizada e fadiga', 'Inflamação das juntas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Não há inflamação visível, mas sim alteração na dor.' }
      ],
      treatment: [
        { text: 'Os DMARDs (ex: Metotrexato) visam:', options: ['Modificar a doença e evitar danos articulares', 'Apenas tirar a dor na hora', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Tratamento de base para artrites inflamatórias.' },
        { text: 'Os biológicos são medicamentos que:', options: ['Alvejam partes específicas do sistema imunitário', 'São naturais e sem efeitos', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Revolucionaram o tratamento de casos graves.' },
        { text: 'Os corticoides são usados para:', options: ['Controlar crises inflamatórias rapidamente', 'Uso vitalício em altas doses', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Poderosos anti-inflamatórios, mas com muitos efeitos secundários.' },
        { text: 'O Alopurinol serve para:', options: ['Baixar os níveis de ácido úrico', 'Tirar a dor da gota aguda', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Tratamento preventivo para evitar novas crises de gota.' },
        { text: 'A proteção articular e o exercício ajudam na:', options: ['Manutenção da função e redução da dor', 'Piora da inflamação', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Equilíbrio entre repouso na crise e movimento fora dela.' },
        { text: 'O cálcio e vitamina D são essenciais na:', options: ['Prevenção e tratamento da osteoporose', 'Cura da artrite', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Fortalecem a matriz óssea.' }
      ],
      exercises: [
        { text: 'Exercícios de baixo impacto (natação, hidro) são ideais para:', options: ['Proteger as articulações inflamadas', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Reduzem a carga mecânica enquanto fortalecem.' },
        { text: 'Alongamentos suaves mantêm a:', options: ['Amplitude de movimento e evitam rigidez', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Cruciais para evitar a "anquilose" (fusão) articular.' },
        { text: 'O fortalecimento muscular em redor da junta:', options: ['Reduz a dor e melhora a estabilidade', 'Causa mais desgaste', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Músculos fortes absorvem o impacto que iria para a cartilagem.' },
        { text: 'Caminhadas regulares ajudam na:', options: ['Saúde óssea e cardiovascular', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O impacto leve estimula a formação de osso.' },
        { text: 'Tai Chi e Ioga são benéficos para:', options: ['Equilíbrio, flexibilidade e controlo da dor', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Combinam movimento suave com relaxamento.' },
        { text: 'Respeitar os limites da dor durante o exercício:', options: ['Evita exacerbações da doença', 'É sinal de preguiça', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Não se deve "forçar" uma articulação inflamada.' }
      ]
    }
  },
  'Ginecologia': {
    complaints: [
      'Corrimento vaginal com odor ou comichão.', 'Dor pélvica intensa durante a menstruação.', 'Irregularidade no ciclo menstrual.', 
      'Dificuldade em engravidar há mais de 1 ano.', 'Nódulo palpável na mama.', 'Ondas de calor e suores (menopausa).',
      'Sangramento fora do período menstrual.', 'Dor durante a relação sexual (dispareunia).', 'Perda de urina ao tossir ou rir.',
      'Aumento do volume abdominal e inchaço.'
    ],
    histories: [
      'Início precoce da menstruação (menarca).', 'História familiar de cancro da mama ou ovário.', 'Uso prolongado de contracetivos orais.',
      'Múltiplos parceiros sexuais ou ISTs prévias.', 'Gravidezes e partos anteriores.', 'Tabagismo (risco aumentado para cancro do colo).',
      'Sedentarismo e excesso de peso (SOP).', 'Cirurgias pélvicas prévias.', 'História de endometriose.',
      'Terapia de reposição hormonal.'
    ],
    symptoms: [
      ['Dismenorreia', 'Menorragia', 'Anemia'], 
      ['Prurido vulvar', 'Leucorreia', 'Disúria'], 
      ['Fogachos', 'Irritabilidade', 'Secura vaginal'],
      ['Nódulo mamário indolor', 'Retração da pele'],
      ['Hirsutismo', 'Acne', 'Ciclos anovulatórios']
    ],
    evolutionTimes: ['1 semana', '3 meses', '6 meses', 'Anos', 'Ciclo a ciclo', 'Recentemente'],
    functionalLimitations: [
      'Impacto na vida sexual por dor.', 'Limitação das atividades diárias por cólicas fortes.', 'Ansiedade e alterações de humor.'
    ],
    questions: {
      evaluation: [
        { text: 'O Papanicolau (Citologia) serve para:', options: ['Rastreio de cancro do colo do útero', 'Ver se está grávida', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Deteta alterações celulares precoces causadas pelo HPV.' },
        { text: 'A Ecografia Pélvica avalia o:', options: ['Útero e ovários', 'Estômago', 'Coração', 'Nada'], correctIdx: 0, explanation: 'Exame de imagem base para ver quistos, miomas ou espessura do endométrio.' },
        { text: 'A Mamografia é o exame de eleição para:', options: ['Rastreio de cancro da mama', 'Ver o útero', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Deteta microcalcificações e nódulos não palpáveis.' },
        { text: 'O toque vaginal avalia:', options: ['Tamanho e mobilidade do útero e anexos', 'Apenas a pele externa', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Parte essencial do exame físico ginecológico.' },
        { text: 'A análise de Beta-HCG no sangue serve para:', options: ['Confirmar gravidez', 'Ver se tem infeção', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Hormona produzida durante a gestação.' },
        { text: 'A Colposcopia é indicada quando:', options: ['A citologia é anormal', 'A menstruação atrasa', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Usa um microscópio para ver o colo do útero com detalhe.' }
      ],
      diagnosis: [
        { text: 'A Endometriose é a presença de:', options: ['Endométrio fora do útero', 'Infeção vaginal', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Causa dores intensas e pode levar à infertilidade.' },
        { text: 'A Síndrome dos Ovários Poliquísticos (SOP) causa:', options: ['Irregularidade menstrual e excesso de hormonas masculinas', 'Menopausa precoce', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Distúrbio endócrino comum em idade fértil.' },
        { text: 'Os Miomas Uterinos são:', options: ['Tumores benignos do músculo do útero', 'Cancro maligno', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Muito comuns, podem causar sangramento abundante.' },
        { text: 'A Candidíase Vaginal é uma:', options: ['Infeção por fungos', 'Bactéria sexual', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Causa comichão e corrimento tipo "leite coalhado".' },
        { text: 'O Cancro do Colo do Útero está ligado ao:', options: ['Vírus HPV', 'Excesso de açúcar', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A vacinação e o rastreio são as melhores prevenções.' },
        { text: 'A Menopausa define-se por:', options: ['12 meses sem menstruação', 'Apenas um mês de falha', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Fim da vida reprodutiva por falência ovárica.' }
      ],
      treatment: [
        { text: 'Os contracetivos orais (pílula) servem para:', options: ['Prevenir gravidez e regular o ciclo', 'Curar ISTs', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Inibem a ovulação através de hormonas.' },
        { text: 'A Terapia de Reposição Hormonal (TRH) trata:', options: ['Sintomas graves da menopausa', 'Infeções', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Repõe estrogénios para aliviar calores e proteger ossos.' },
        { text: 'Os antifúngicos tratam a:', options: ['Candidíase', 'Endometriose', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Podem ser óvulos vaginais ou cremes.' },
        { text: 'A cirurgia (Laparoscopia) é comum na:', options: ['Endometriose ou quistos grandes', 'Apenas no parto', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Técnica minimamente invasiva para tratar patologia pélvica.' },
        { text: 'A vacina contra o HPV previne:', options: ['Cancro do colo do útero', 'Gravidez', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Protege contra os tipos de vírus mais oncogénicos.' },
        { text: 'O ácido fólico é recomendado para:', options: ['Mulheres que planeiam engravidar', 'Tratar corrimento', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Previne defeitos no tubo neural do bebé.' }
      ],
      exercises: [
        { text: 'Exercícios de Kegel fortalecem o:', options: ['Pavimento pélvico', 'Abdominais apenas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Previnem a incontinência urinária e prolapsos.' },
        { text: 'Atividade física regular ajuda na:', options: ['Redução dos sintomas de TPM e SOP', 'Piora das cólicas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Melhora o equilíbrio hormonal e humor.' },
        { text: 'O autoexame da mama deve ser feito:', options: ['Mensalmente após a menstruação', 'Todos os dias', 'Nunca', 'Nada'], correctIdx: 0, explanation: 'Ajuda a mulher a conhecer o seu corpo e detetar alterações.' },
        { text: 'Ioga e relaxamento são úteis para:', options: ['Dores pélvicas crónicas e stress', 'Curar infeções', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Reduzem a tensão muscular na zona pélvica.' },
        { text: 'Manter um peso saudável previne:', options: ['Complicações na gravidez e SOP', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O tecido adiposo produz hormonas que afetam o ciclo.' },
        { text: 'Caminhadas ajudam a aliviar:', options: ['A retenção de líquidos e inchaço pré-menstrual', 'Nada', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Melhoram a circulação e drenagem.' }
      ]
    }
  },
  'Fisioterapia em AVC': {
    complaints: [
      'Hemiparésia à direita e dificuldade na fala.',
      'Perda de equilíbrio e coordenação.',
      'Dificuldade em realizar a preensão de objetos.',
      'Assimetria facial e fraqueza num lado do corpo.',
      'Dificuldade em realizar a marcha sem apoio.',
      'Sensação de "braço morto" ou pesado.',
      'Dificuldade em engolir e engasgos frequentes.',
      'Perda de sensibilidade no lado afetado.',
      'Problemas de visão num dos campos visuais.',
      'Confusão mental e desorientação súbita.'
    ],
    histories: [
      'Pós-AVC isquémico há 1 mês com internamento inicial.',
      'Episódio agudo súbito há 15 dias, em fase de estabilização.',
      'Fase crónica de reabilitação (6 meses pós-evento).',
      'AVC hemorrágico com necessidade de drenagem cirúrgica.',
      'História de hipertensão e diabetes como fatores de risco.',
      'Sequela de AVC recorrente com agravamento funcional.',
      'Início recente de fisioterapia domiciliária pós-alta.',
      'Paciente com afasia de Broca e hemiparésia braquial.',
      'AVC em território da artéria cerebral média.',
      'Evento isquémico transitório (AIT) prévio não tratado.'
    ],
    symptoms: [
      ['Espasticidade', 'Sincinesias', 'Clónus'],
      ['Hipotonia inicial', 'Ausência de movimento voluntário', 'Arreflexia'],
      ['Ataxia', 'Dismetria', 'Tremores'],
      ['Heminegligência', 'Apraxia', 'Défice proprioceção'],
      ['Pé equino-varo', 'Reação associada', 'Padronização flexora']
    ],
    evolutionTimes: [
      '15 dias (fase subaguda)', '1 mês', '3 meses', '6 meses (fase crónica)', '1 ano',
      'Recente (7 dias pós-alta)', 'Progressivo há 2 meses', '4 meses', '10 meses', '2 anos'
    ],
    functionalLimitations: [
      'Incapacidade de realizar a marcha independente.',
      'Dependência para Atividades de Vida Diária (AVDs).',
      'Dificuldade em realizar transferências (cama-cadeira).',
      'Limitação na utilização funcional do membro superior afetado.',
      'Risco elevado de quedas por défice de equilíbrio.',
      'Incapacidade de realizar a alimentação de forma autónoma.',
      'Dificuldade em manter a postura sentada sem apoio.',
      'Défice de comunicação verbal (afasia).',
      'Incapacidade de realizar higiene pessoal independente.',
      'Dificuldade em subir e descer escadas.'
    ],
    questions: {
      evaluation: [
        { text: 'Que escala avalia o tónus muscular no AVC?', options: ['Escala de Ashworth Modificada', 'Escala de Borg', 'Escala de Glasgow', 'Escala de Berg'], correctIdx: 0, explanation: 'A Ashworth mede o grau de resistência ao movimento passivo (espasticidade).' },
        { text: 'O sinal de Babinski positivo indica:', options: ['Lesão do neurónio motor superior', 'Lesão de nervo periférico', 'Cansaço', 'Infeção'], correctIdx: 0, explanation: 'É um sinal clássico de libertação piramidal após um AVC.' },
        { text: 'O teste de "Index-Nariz" avalia:', options: ['Coordenação e dismetria', 'Força muscular', 'Flexibilidade', 'Olfato'], correctIdx: 0, explanation: 'Avalia a precisão do movimento motor fino.' }
      ],
      diagnosis: [
        { text: 'A heminegligência é mais comum em lesões no hemisfério:', options: ['Direito (lobo parietal)', 'Esquerdo', 'Frontal apenas', 'Cerebelo'], correctIdx: 0, explanation: 'Resulta na falha em responder a estímulos no lado contralateral à lesão.' },
        { text: 'A espasticidade caracteriza-se por:', options: ['Resistência velocidade-dependente', 'Hipotonia', 'Perda de sensibilidade', 'Apenas dor'], correctIdx: 0, explanation: 'É um distúrbio motor caracterizado por aumento dos reflexos tónicos.' }
      ],
      treatment: [
        { text: 'O conceito Bobath foca-se na:', options: ['Inibição de padrões anormais e facilitação do movimento normal', 'Musculação intensa', 'Apenas alongamentos', 'Nada'], correctIdx: 0, explanation: 'Baseia-se na neuroplasticidade e controlo postural.' },
        { text: 'A Terapia por Restrição do Membro Saudável (CIMT) visa:', options: ['Forçar o uso do membro afetado', 'Imobilizar as pernas', 'Reduzir a dor', 'Nada'], correctIdx: 0, explanation: 'Estratégia para combater o desuso aprendido do braço parésico.' }
      ],
      exercises: [
        { text: 'Exercícios de transferência peso visam melhorar:', options: ['O equilíbrio e a simetria na bipedestação', 'A força de braços', 'A visão', 'A audição'], correctIdx: 0, explanation: 'Essenciais para preparar a marcha e reduzir a heminegligência.' },
        { text: 'O treino de marcha em passadeira com suporte de peso ajuda na:', options: ['Estimulação do padrão de marcha rítmico', 'Perda de gordura apenas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Reduz a carga e permite focar na qualidade do movimento.' }
      ]
    }
  },
  'Fisioterapia Neuropediátrica': {
    complaints: [
      'Atraso no desenvolvimento motor global.',
      'Dificuldade em manter o controlo cefálico.',
      'Postura em tesoura nos membros inferiores.',
      'Dificuldade em realizar o gatinhar.',
      'Pernas muito rígidas e pés "em pontas".',
      'Dificuldade em manipular brinquedos.',
      'Assimetria postural ao estar sentado.',
      'Movimentos involuntários e descoordenação.',
      'Quedas frequentes ao iniciar a marcha.',
      'Dificuldade em manter o equilíbrio no tronco.'
    ],
    histories: [
      'Paralisia Cerebral tipo Diplegia Espástica.',
      'História de prematuridade extrema e anoxia neonatal.',
      'Encefalopatia crónica não progressiva.',
      'Síndrome de Down com hipotonia generalizada.',
      'Atraso no desenvolvimento psicomotor de causa idiopática.',
      'Paralisia Cerebral tipo Hemiplégica.',
      'Sequela de meningite bacteriana na primeira infância.',
      'Distrofia muscular de Duchenne em fase inicial.',
      'Espinha bífida (Mielomeningocele) lombar.',
      'Perturbação do espetro do autismo com défices motores.'
    ],
    symptoms: [
      ['Hipotonia', 'Hipermobilidade articular', 'Atraso reflexos'],
      ['Hipertonia piramidal', 'Clónus esgotável', 'Reflexos vivos'],
      ['Coreoatetose', 'Movimentos distónicos', 'Instabilidade'],
      ['Pé equino', 'Marcha em tesoura', 'Reflexo de Moro persistente'],
      ['Escoliose neurogénica', 'Encurtamento adutores', 'Subluxação anca']
    ],
    evolutionTimes: [
      'Desde o nascimento', '6 meses de vida', '1 ano', '2 anos', '3 anos',
      'Fase de intervenção precoce', 'Escolar inicial', '5 anos', 'Desde os 3 meses', 'Acompanhamento contínuo'
    ],
    functionalLimitations: [
      'Incapacidade de realizar a marcha sem auxiliares.',
      'Dependência nas Atividades de Vida Diária (AVDs).',
      'Dificuldade em manter a postura sentada independente.',
      'Limitação na motricidade fina e manipulação.',
      'Dificuldade em subir e descer escadas.',
      'Incapacidade de manter o controlo cefálico prolongado.',
      'Dificuldade na comunicação e interação social.',
      'Dependência para alimentação e higiene.',
      'Limitação nas atividades lúdicas e escolares.',
      'Instabilidade postural severa.'
    ],
    questions: {
      evaluation: [
        { text: 'Que escala avalia a função motora grossa na Paralisia Cerebral?', options: ['GMFM', 'Ashworth', 'Glasgow', 'Berg'], correctIdx: 0, explanation: 'Gross Motor Function Measure (GMFM) é o padrão-ouro em neuropediatria.' },
        { text: 'O sistema GMFCS classifica:', options: ['O nível de mobilidade funcional', 'A inteligência', 'A visão', 'O peso'], correctIdx: 0, explanation: 'Classifica de I a V a independência motora da criança.' }
      ],
      diagnosis: [
        { text: 'A persistência de reflexos primitivos após o tempo esperado indica:', options: ['Imaturidade ou lesão do SNC', 'Normalidade', 'Fome', 'Sono'], correctIdx: 0, explanation: 'Devem ser integrados para permitir o desenvolvimento motor voluntário.' },
        { text: 'A diplegia espástica afeta predominantemente:', options: ['Membros Inferiores', 'Membros Superiores', 'Apenas um lado', 'O rosto'], correctIdx: 0, explanation: 'É um padrão comum em prematuros com leucomalácia periventricular.' }
      ],
      treatment: [
        { text: 'O uso de ortóteses (AFOs) visa:', options: ['Prevenir deformidades e melhorar a marcha', 'Apenas por estética', 'Aumentar a dor', 'Nada'], correctIdx: 0, explanation: 'Mantém o alinhamento biomecânico do pé e tornozelo.' },
        { text: 'A equoterapia utiliza o cavalo para:', options: ['Melhorar controlo postural e equilíbrio', 'Apenas diversão', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O movimento tridimensional do cavalo estimula respostas posturais.' }
      ],
      exercises: [
        { text: 'Exercícios em bola suíça (Bobath) visam:', options: ['Reações de equilíbrio e endireitamento', 'Apenas força de braços', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A superfície instável estimula o tónus postural.' },
        { text: 'O treino de rastejar e gatinhar é importante para:', options: ['Dissociação de cinturas e força', 'Ver o chão', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Etapas fundamentais para o desenvolvimento da coordenação motora.' }
      ]
    }
  },
  'Fisioterapia em Lesão Medular': {
    complaints: [
      'Incapacidade de mover as pernas após queda.',
      'Perda de sensibilidade abaixo do peito.',
      'Dor neuropática intensa nos membros inferiores.',
      'Dificuldade em controlar a bexiga e intestinos.',
      'Sensação de formigueiro e "choques" constantes.',
      'Fraqueza progressiva nos braços e pernas.',
      'Espasmos musculares involuntários e dolorosos.',
      'Dificuldade em manter a postura sentada.',
      'Feridas que não cicatrizam nas zonas de pressão.',
      'Dificuldade em respirar e tossir eficazmente.'
    ],
    histories: [
      'Traumatismo vertebromedular por acidente de viação.',
      'Queda de altura com fratura de T12.',
      'Lesão medular cervical (C6) por mergulho em águas rasas.',
      'Mielite transversa de início idiopático.',
      'Tumor medular com compressão progressiva.',
      'Lesão incompleta (ASIA B) pós-cirurgia de coluna.',
      'Paraplegia espástica de origem traumática.',
      'Tetraplegia traumática com necessidade de ventilação.',
      'Síndrome de Brown-Séquard por ferimento penetrante.',
      'História de estenose canalar severa com sofrimento medular.'
    ],
    symptoms: [
      ['Paraplegia', 'Anestesia T10', 'Bexiga neurogénica'],
      ['Tetraplegia', 'Insuficiência respiratória restritiva', 'Bradicardia'],
      ['Disreflexia autonómica', 'Sudorese acima da lesão', 'Cefaleia'],
      ['Espasticidade severa', 'Contracturas em flexão', 'Osteoporose'],
      ['Úlceras por pressão', 'Escaras sagradas', 'Dermatite']
    ],
    evolutionTimes: [
      'Fase aguda (internamento)', '1 mês pós-trauma', '3 meses', '6 meses', '1 ano',
      'Fase crónica de reabilitação', 'Recentemente operado', '2 meses', '18 meses', '3 anos'
    ],
    functionalLimitations: [
      'Dependência total para transferências e higiene.',
      'Incapacidade de realizar a marcha independente.',
      'Necessidade de cadeira de rodas para mobilidade.',
      'Dificuldade na gestão intestinal e urinária.',
      'Limitação na função respiratória e tosse.',
      'Necessidade de apoio 24h para AVDs.',
      'Risco elevado de complicações respiratórias.',
      'Incapacidade de manter a estabilidade do tronco.',
      'Limitação na autonomia social e profissional.',
      'Necessidade de adaptação total do domicílio.'
    ],
    questions: {
      evaluation: [
        { text: 'A escala ASIA classifica:', options: ['O nível e completitude da lesão medular', 'A inteligência', 'A dor apenas', 'Nada'], correctIdx: 0, explanation: 'Avalia funções motoras e sensoriais específicas.' },
        { text: 'A disreflexia autonómica é uma emergência em lesões acima de:', options: ['T6', 'L1', 'S2', 'C1'], correctIdx: 0, explanation: 'Caracteriza-se por subida brusca da TA e risco de AVC.' }
      ],
      diagnosis: [
        { text: 'Uma lesão completa (ASIA A) significa:', options: ['Ausência de função motora e sensitiva sacral', 'Paralisia parcial', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Não há preservação de função nos segmentos S4-S5.' },
        { text: 'O choque medular caracteriza-se por:', options: ['Arreflexia e paralisia flácida inicial', 'Espasticidade imediata', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Fase inicial após o trauma com perda de todos os reflexos.' }
      ],
      treatment: [
        { text: 'A verticalização (tilt table) visa:', options: ['Adaptação cardiovascular e densidade óssea', 'Aumentar a paralisia', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Previne a hipotensão ortostática e osteoporose.' },
        { text: 'O treino de transferências é vital para:', options: ['Aumentar a independência e autonomia', 'Ver o teto', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Permite ao paciente mover-se entre cama, cadeira e carro.' }
      ],
      exercises: [
        { text: 'O fortalecimento de membros superiores (tríceps) é crucial para:', options: ['Realizar propulsão da cadeira e transferências', 'Andar de pé', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O tríceps substitui funcionalmente os extensores da perna em transferências.' },
        { text: 'Exercícios respiratórios visam:', options: ['Prevenir atelectasias e pneumonias', 'Aumentar a voz apenas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'A tónica respiratória é afetada em lesões altas.' }
      ]
    }
  },
  'Fisioterapia em Traumato-Ortopedia Desportiva': {
    complaints: [
      'Entorse agudo do tornozelo em jogo.',
      'Instabilidade no joelho após salto.',
      'Dor súbita na coxa ao sprintar.',
      'Luxação do ombro em queda durante treino.',
      'Dor no tendão de Aquiles ao saltar.',
      'Bloqueio articular no joelho.',
      'Dor na virilha ao rematar a bola.',
      'Inflamação no cotovelo (epicondilite) por excesso de carga.',
      'Sensação de "estalo" seguido de dor aguda.',
      'Dificuldade em realizar mudanças de direção.'
    ],
    histories: [
      'Atleta de elite com lesão traumática em competição.',
      'Trauma desportivo agudo em futebol de fim-de-semana.',
      'Sobrecarga biomecânica por erro de treino.',
      'Pós-operatório de reconstrução de LCA.',
      'História de lesões recorrentes no mesmo segmento.',
      'Retorno precoce ao desporto sem reabilitação completa.',
      'Lesão por overuse em maratonista.',
      'Trauma direto em choque com adversário.',
      'Entorse de repetição por instabilidade crónica.',
      'Lesão muscular grau II detetada por ecografia.'
    ],
    symptoms: [
      ['Edema articular', 'Equimose', 'Laxidez ligamentar'],
      ['Dor à palpação tendinosa', 'Crepitação', 'Perda de força'],
      ['Sinal de gaveta positivo', 'Bloqueio meniscal', 'Derrame'],
      ['Hipersensibilidade muscular', 'Nódulo palpável', 'Perda de amplitude'],
      ['Instabilidade subjetiva', 'Apprehension test positivo', 'Fraqueza']
    ],
    evolutionTimes: [
      'Recentemente (há 24h)', '48 horas', '1 semana', '3 semanas', '1 mês',
      'Pós-cirúrgico imediato', 'Crónico recorrente', '10 dias', '5 dias', '2 meses'
    ],
    functionalLimitations: [
      'Incapacidade de realizar o gesto desportivo.',
      'Dificuldade em realizar saltos e aterragem.',
      'Limitação na corrida de alta intensidade.',
      'Instabilidade ao realizar mudanças de direção.',
      'Dor ao realizar alongamentos agressivos.',
      'Incapacidade de manter o nível competitivo.',
      'Necessidade de uso de muletas para marcha.',
      'Dificuldade em subir e descer escadas.',
      'Limitação na amplitude de movimento passiva.',
      'Medo de nova lesão (cinofobia).'
    ],
    questions: {
      evaluation: [
        { text: 'Qual o teste padrão para rotura de LCA?', options: ['Teste de Lachman', 'Teste de Thompson', 'Teste de Phalen', 'Teste de Jobe'], correctIdx: 0, explanation: 'O teste de Lachman é o mais sensível para integridade do LCA.' },
        { text: 'O protocolo PEACE & LOVE foca em:', options: ['Proteção, Elevação, Compressão, Educação e Carga Ótima', 'Apenas gelo e repouso', 'Massagem intensa', 'Nada'], correctIdx: 0, explanation: 'Abordagem moderna que substituiu o RICE/POLICE.' }
      ],
      diagnosis: [
        { text: 'Uma entorse de grau III envolve:', options: ['Rotura completa do ligamento', 'Apenas estiramento', 'Lesão parcial', 'Fratura'], correctIdx: 0, explanation: 'Causa instabilidade articular severa.' },
        { text: 'A síndrome da banda iliotibial é comum em:', options: ['Corredores (overuse)', 'Nado sincronizado', 'Xadrez', 'Nada'], correctIdx: 0, explanation: 'Causa dor na face lateral do joelho por atrito.' }
      ],
      treatment: [
        { text: 'A reabilitação funcional precoce visa:', options: ['Manter a capacidade cardiovascular e neuromuscular', 'Repouso absoluto por 1 mês', 'Gessar sempre', 'Nada'], correctIdx: 0, explanation: 'Evita a desadaptação do atleta e acelera o retorno.' },
        { text: 'O treino excêntrico é indicado para:', options: ['Tendinopatias e prevenção de roturas', 'Gripe', 'Apenas força máxima', 'Nada'], correctIdx: 0, explanation: 'Aumenta a resistência do tendão e músculo à carga.' }
      ],
      exercises: [
        { text: 'O treino pliométrico é essencial para:', options: ['Retorno ao desporto (potência)', 'Apenas flexibilidade', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Prepara o tecido para as forças de impacto e explosão.' },
        { text: 'Exercícios de proprioceção em prancha de equilíbrio visam:', options: ['Controlo neuromuscular e prevenção de recidivas', 'Ganhar massa muscular', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Melhoram a resposta rápida do corpo a desequilíbrios.' }
      ]
    }
  },
  'Fisioterapia em Queimados': {
    complaints: [
      'Dor intensa e restrição de movimento pós-queimadura.',
      'Dificuldade em esticar o braço devido a cicatriz.',
      'Pele muito rígida e seca que "repuxa".',
      'Comichão insuportável na zona cicatrizada.',
      'Dificuldade em realizar a respiração profunda (queimadura torácica).',
      'Feridas que demoram a fechar em zonas de dobra.',
      'Sensibilidade alterada (choques) na zona afetada.',
      'Edema persistente no braço queimado.',
      'Medo de mover o segmento por dor ou rotura cutânea.',
      'Dificuldade em realizar atividades manuais.'
    ],
    histories: [
      'Queimadura térmica de 2º e 3º grau em 30% do corpo.',
      'Acidente doméstico com óleo a ferver há 3 semanas.',
      'Explosão industrial com atingimento de face e tronco.',
      'Pós-operatório de enxertia cutânea em membros inferiores.',
      'Fase de maturação cicatricial (6 meses pós-queimadura).',
      'História de queimadura elétrica com lesão profunda.',
      'Internamento em unidade de queimados por 2 meses.',
      'Sequela de contratura de Dupuytren-like pós-queimadura.',
      'Necessidade de uso de malhas de compressão.',
      'História de infeção secundária em zona de queimadura.'
    ],
    symptoms: [
      ['Brida cicatricial', 'Cicatriz hipertrófica', 'Hipocromia'],
      ['Pele anelástica', 'Restrição de extensão', 'Edema duro'],
      ['Quelóide', 'Prurido intenso', 'Dor neuropática'],
      ['Bradipneia por restrição', 'Atelectasia basal', 'Tossee eficaz'],
      ['Alteração de sensibilidade tátil', 'Hipersensibilidade térmica', 'Fraqueza']
    ],
    evolutionTimes: [
      'Fase aguda (internamento)', '3 semanas pós-enxertia', '2 meses', '6 meses (maturação)', '1 ano',
      'Recentemente operado', '45 dias', 'Recorrente por contratura', '10 dias', '3 meses'
    ],
    functionalLimitations: [
      'Limitação severa na amplitude de movimento (ADM).',
      'Incapacidade de realizar preensão fina.',
      'Incapacidade de realizar a higiene pessoal independente.',
      'Dificuldade em realizar a expansão torácica total.',
      'Dependência para vestir e despir devido à rigidez.',
      'Limitação na marcha por retrações em membros inferiores.',
      'Impacto severo na imagem corporal e isolamento.',
      'Dor constante ao realizar movimentos mínimos.',
      'Necessidade de posicionamento constante com talas.',
      'Dificuldade em manter a postura ereta.'
    ],
    questions: {
      evaluation: [
        { text: 'A "Regra dos Nove" serve para:', options: ['Estimar a percentagem de Área de Superfície Corporal Queimada', 'Ver a profundidade', 'Calcular a dor', 'Nada'], correctIdx: 0, explanation: 'Fundamental para o cálculo de hidratação e prognóstico.' },
        { text: 'A escala de Vancouver avalia:', options: ['A qualidade da cicatriz', 'A dor', 'A força', 'A visão'], correctIdx: 0, explanation: 'Avalia vascularização, pigmentação, maleabilidade e altura da cicatriz.' }
      ],
      diagnosis: [
        { text: 'Uma contractura cicatricial ocorre por:', options: ['Encurtamento do tecido fibroso durante a cura', 'Falta de água', 'Excesso de exercício', 'Nada'], correctIdx: 0, explanation: 'Pode levar a deformidades permanentes se não tratada.' },
        { text: 'Queimaduras de 3º grau caracterizam-se por:', options: ['Atingimento total da derme e epiderme', 'Apenas vermelhidão', 'Bolhas apenas', 'Nada'], correctIdx: 0, explanation: 'Muitas vezes são indolores no centro pela destruição nervosa.' }
      ],
      treatment: [
        { text: 'O uso de malhas compressivas visa:', options: ['Prevenir cicatrizes hipertróficas e quelóides', 'Apenas aquecer', 'Substituir a pele', 'Nada'], correctIdx: 0, explanation: 'A pressão mecânica organiza as fibras de colagénio.' },
        { text: 'O posicionamento em antitendência à contratura deve ser:', options: ['Manter o segmento em máxima extensão funcional', 'Manter dobrado', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O doente tende a adotar posturas antálgicas de flexão.' }
      ],
      exercises: [
        { text: 'Exercícios de alongamento suave e prolongado visam:', options: ['Aumentar a maleabilidade do tecido e ADM', 'Romper a pele', 'Gritar de dor', 'Nada'], correctIdx: 0, explanation: 'Essenciais para remodelar o tecido cicatricial.' },
        { text: 'A massagem cicatricial (frictioning) ajuda a:', options: ['Libertar aderências e bridas', 'Mudar a cor apenas', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Melhora a mobilidade entre as camadas da pele.' }
      ]
    }
  },
  'Fisioterapia em Amputados': {
    complaints: [
      'Sensação de que o pé ainda está lá e dói.',
      'Dificuldade em equilibrar-se na perna que restou.',
      'Feridas e pele vermelha no coto de amputação.',
      'O encaixe da prótese está a apertar muito.',
      'Desejo de voltar a caminhar sem muletas.',
      'Sensação de choque elétrico no "fim" da perna.',
      'Cansaço extremo ao usar a prótese por 10 minutos.',
      'O meu coto mudou de forma e a prótese está larga.',
      'Incapacidade de subir rampas com a nova perna.',
      'Medo de cair ao soltar as mãos do apoio.'
    ],
    histories: [
      'Amputação transtibial por pé diabético complicado.',
      'Amputação transfemoral pós-acidente de moto há 3 meses.',
      'Amputação de membro superior por acidente de trabalho.',
      'Amputação bilateral por doença vascular periférica severa.',
      'Fase de pré-protetização (cicatrização do coto).',
      'Utente com prótese antiga a necessitar de renovação.',
      'Pós-operatório de revisão de coto por neuroma.',
      'Amputação por tumor ósseo (osteossarcoma) em jovem.',
      'História de desadaptação à prótese por dor neuropática.',
      'Amputação de dedos por frostbite (geladura).'
    ],
    symptoms: [
      ['Dor fantasma', 'Sensação fantasma', 'Neuroma de reorganização'],
      ['Edema do coto', 'Coto em forma de cone', 'Pele sensível'],
      ['Atrofia muscular do coto', 'Laxidez ligamentar adjacente', 'Fraqueza'],
      ['Espasticidade no coto', 'Contratura em flexão da anca/joelho', 'Rigidez'],
      ['Instabilidade protética', 'Dermatite de contacto', 'Calosidades']
    ],
    evolutionTimes: [
      'Pós-operatório imediato', '1 mês (coto cicatrizado)', '3 meses (início prótese)', '6 meses', '1 ano',
      'Crónico (mais de 2 anos)', 'Recentemente amputado', '15 dias', '4 meses', '10 meses'
    ],
    functionalLimitations: [
      'Incapacidade de realizar bipedestação sem apoio.',
      'Dependência nas Atividades de Vida Diária (AVDs).',
      'Incapacidade de realizar a marcha funcional autónoma.',
      'Dificuldade em realizar transferências cama-cadeira.',
      'Limitação na vida social e profissional ativa.',
      'Dificuldade em manter a higiene do coto.',
      'Incapacidade de subir e descer degraus.',
      'Dependência de auxiliares de marcha permanentes.',
      'Cansaço excessivo (custo energético elevado da prótese).',
      'Desequilíbrio postural severo.'
    ],
    questions: {
      evaluation: [
        { text: 'A sensação fantasma caracteriza-se por:', options: ['Sentir o membro ausente como se estivesse presente', 'Dor intensa', 'Medo', 'Nada'], correctIdx: 0, explanation: 'É um fenómeno neurológico de representação cortical.' },
        { text: 'Que cuidado é vital com o coto na fase inicial?', options: ['Ligadura compressiva (moldagem)', 'Não tocar', 'Lavar só 1x por semana', 'Nada'], correctIdx: 0, explanation: 'A ligadura ajuda no retorno venoso e na moldagem para a prótese.' }
      ],
      diagnosis: [
        { text: 'A amputação transtibial é feita:', options: ['Abaixo do joelho', 'Acima do joelho', 'No tornozelo', 'Na anca'], correctIdx: 0, explanation: 'Preserva a articulação do joelho, facilitando a marcha.' },
        { text: 'O neuroma de amputação é:', options: ['Crescimento desordenado de fibras nervosas no coto', 'Um cancro', 'Um osso novo', 'Nada'], correctIdx: 0, explanation: 'Causa dor intensa ao toque e dificulta o uso da prótese.' }
      ],
      treatment: [
        { text: 'A dessensibilização do coto serve para:', options: ['Reduzir a hipersensibilidade e preparar para a prótese', 'Aumentar a dor', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Usa diferentes texturas e massagem para normalizar a sensação.' },
        { text: 'O treino de equilíbrio unipodal visa:', options: ['Fortalecer o membro saudável e controlo do tronco', 'Ver TV', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Fundamental para a segurança antes da protetização.' }
      ],
      exercises: [
        { text: 'Exercícios de fortalecimento de glúteo médio são vitais para:', options: ['Estabilidade lateral da bacia na marcha', 'Braços fortes', 'Visão', 'Nada'], correctIdx: 0, explanation: 'Evitam a marcha de Trendelenburg com a prótese.' },
        { text: 'O fortalecimento do quadríceps (em amputados transtibiais) serve para:', options: ['Controlo da fase de apoio da prótese', 'Saltar', 'Nada', 'Nada'], correctIdx: 0, explanation: 'O quadríceps é o principal motor da estabilidade do joelho.' }
      ]
    }
  },
  'Fisioterapia em Geriatria Avançada': {
    complaints: [
      'Quedas frequentes e medo de andar sozinho.',
      'Dificuldade extrema em levantar-se da cama.',
      'Perda de equilíbrio e tonturas constantes.',
      'Dor articular generalizada e rigidez.',
      'Dificuldade em realizar a higiene pessoal.',
      'Incontinência urinária e urgência.',
      'Cansaço após caminhar 5 metros.',
      'Perda de força nas pernas e mãos.',
      'Dificuldade em subir degraus pequenos.',
      'Desorientação e confusão no domicílio.'
    ],
    histories: [
      'Idoso fragilizado com múltiplas patologias.',
      'Pós-hospitalização prolongada por pneumonia.',
      'História de fratura de fémur operada há 2 meses.',
      'Doença de Alzheimer em fase intermédia.',
      'Sarcopenia severa e desnutrição.',
      'Polifarmácia com risco elevado de quedas.',
      'Isolamento social e sedentarismo extremo.',
      'Insuficiência cardíaca e renal concomitantes.',
      'História de AVC com sequelas motoras leves.',
      'Pós-colocação de prótese total da anca.'
    ],
    symptoms: [
      ['Síndrome de fragilidade', 'Marcha senil', 'Base suporte alargada'],
      ['Hipotensão ortostática', 'Tonturas posturais', 'Síncope'],
      ['Sarcopenia', 'Perda de massa muscular', 'Fraqueza preensão'],
      ['Anquilose articular', 'Cifose marcada', 'Diminuição amplitude'],
      ['Alterações equilíbrio', 'Oscilação excessiva', 'Medo de cair']
    ],
    evolutionTimes: [
      'Processo degenerativo longo', '3 meses pós-queda', '1 mês pós-hospitalização', '6 meses', '1 ano',
      'Recentemente agravado', '2 meses', 'Progressivo há anos', 'Fase terminal', 'Acompanhamento paliativo'
    ],
    functionalLimitations: [
      'Dependência para quase todas as AVDs.',
      'Dificuldade em manter a bipedestação por 1 min.',
      'Incapacidade de caminhar sem auxílio de andarilho.',
      'Limitação severa na mobilidade no leito.',
      'Dificuldade em realizar a alimentação independente.',
      'Necessidade de supervisão constante.',
      'Incapacidade de realizar a subida de escadas.',
      'Limitação na interação social por fadiga.',
      'Dificuldade de comunicação por declínio cognitivo.',
      'Necessidade de cadeira de rodas para exterior.'
    ],
    questions: {
      evaluation: [
        { text: 'O teste Timed Up and Go (TUG) avalia:', options: ['Mobilidade funcional e risco de queda', 'Inteligência', 'Visão', 'Nada'], correctIdx: 0, explanation: 'Mede o tempo para levantar, caminhar e sentar.' },
        { text: 'A escala de Berg avalia o:', options: ['Equilíbrio funcional', 'Força de pernas', 'Défice cognitivo', 'Nada'], correctIdx: 0, explanation: 'É composta por 14 itens de tarefas do dia-a-dia.' }
      ],
      diagnosis: [
        { text: 'A sarcopenia é a:', options: ['Perda de massa e função muscular com a idade', 'Perda de memória', 'Doença dos ossos', 'Nada'], correctIdx: 0, explanation: 'Aumenta a fragilidade e o risco de quedas.' },
        { text: 'A osteoporose em idosos aumenta o risco de:', options: ['Fraturas patológicas ou por fragilidade', 'Gripe', 'Diabetes', 'Nada'], correctIdx: 0, explanation: 'O osso fica mais poroso e menos resistente.' }
      ],
      treatment: [
        { text: 'O treino de força em idosos fragilizados deve ser:', options: ['Progressivo e adaptado para evitar lesões', 'Evitado por risco de enfarte', 'Extremo', 'Nada'], correctIdx: 0, explanation: 'É vital para combater a sarcopenia e manter a autonomia.' },
        { text: 'A adaptação do domicílio (retirar tapetes) visa:', options: ['Prevenir quedas', 'Melhorar a estética', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Maximiza a segurança no ambiente onde o idoso vive.' }
      ],
      exercises: [
        { text: 'Exercícios de levantar e sentar visam melhorar:', options: ['A força funcional dos membros inferiores', 'A visão', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Ação fundamental para a independência na casa de banho e refeições.' },
        { text: 'O treino de equilíbrio estático e dinâmico ajuda a:', options: ['Reduzir o medo de cair e aumentar a confiança', 'Curar a artrose', 'Nada', 'Nada'], correctIdx: 0, explanation: 'Melhora o controlo postural.' }
      ]
    }
  }
};

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function generateCases(): ClinicalCase[] {
  const cases: ClinicalCase[] = [];
  let idCounter = 1;
  const usedCombinations = new Set<string>();
  const CASES_PER_CATEGORY = 4;

  SPECIALTIES.forEach(specialty => {
    const specialtyCategories = SPECIALTY_CATEGORIES[specialty] || ['Geral'];
    
    specialtyCategories.forEach(category => {
      for (let i = 0; i < CASES_PER_CATEGORY; i++) {
        const templates: CaseTemplate = (HISTORY_TEMPLATES[category] || SPECIALTY_BASE_TEMPLATES[specialty] || SPECIALTY_BASE_TEMPLATES['Saúde Geral']) as CaseTemplate;
        
        // Normalize templates to always have stages
        const normalizedStages = templates?.stages || (templates?.questions ? [
          { title: 'Avaliação Inicial', description: 'Coleta de dados e sinais vitais.', questions: templates.questions.evaluation },
          { title: 'Diagnóstico Clínico', description: 'Identificação da condição principal.', questions: templates.questions.diagnosis },
          { title: 'Plano de Tratamento', description: 'Definição da estratégia terapêutica.', questions: templates.questions.treatment },
          ...(templates.questions.exercises ? [{ title: 'Prescrição de Exercícios', description: 'Exercícios específicos para a condição.', questions: templates.questions.exercises }] : [])
        ] : (SPECIALTY_BASE_TEMPLATES['Saúde Geral']?.stages || []));

        let isMale = true;
        let name = '';
        let surname = '';
        let age = 0;
        let profession = '';
        let complaint = '';
        let history = '';
        let evolutionTime = '';
        let functionalLimitations = '';
        let symptomSet: string[] = [];
        let combination = '';

        // Anti-duplication logic
        let attempts = 0;
        while (attempts < 200) {
          isMale = Math.random() > 0.5;
          name = isMale ? getRandomItem(MALE_NAMES) : getRandomItem(FEMALE_NAMES);
          surname = getRandomItem(SURNAMES);
          age = 18 + Math.floor(Math.random() * 65);
          
          // Professional variation
          profession = getRandomItem(PROFESSIONS);
          
          const baseComplaint = getRandomItem(templates.complaints);
          const severityPrefix = Math.random() > 0.7 ? (Math.random() > 0.5 ? 'Leve ' : 'Forte ') : '';
          complaint = severityPrefix + baseComplaint.charAt(0).toLowerCase() + baseComplaint.slice(1);
          if (severityPrefix === '') complaint = baseComplaint;

          history = getRandomItem(templates.histories);
          evolutionTime = getRandomItem(templates.evolutionTimes);
          functionalLimitations = getRandomItem(templates.functionalLimitations);
          
          // Enhanced symptom generation for complexity
          const symptomPool = getRandomItem(templates.symptoms);
          const baseSymptoms = [...symptomPool];
          const extraSymptoms: string[] = [];
          
          // Add 1-2 category-specific symptoms if available
          const catPool = CATEGORY_SYMPTOMS[category];
          if (catPool) {
            const numExtra = Math.random() > 0.7 ? 2 : 1;
            for (let j = 0; j < numExtra; j++) {
              const s = getRandomItem(catPool);
              if (!baseSymptoms.includes(s) && !extraSymptoms.includes(s)) {
                extraSymptoms.push(s);
              }
            }
          }

          // Add 1 generic symptom
          const genSymptom = getRandomItem(GENERIC_SYMPTOMS);
          if (!baseSymptoms.includes(genSymptom) && !extraSymptoms.includes(genSymptom)) {
            extraSymptoms.push(genSymptom);
          }

          // 20% chance of a distractor symptom from another category
          if (Math.random() < 0.2) {
            const otherCategories = Object.keys(CATEGORY_SYMPTOMS).filter(c => c !== category);
            const distractorCat = getRandomItem(otherCategories);
            const distractorPool = CATEGORY_SYMPTOMS[distractorCat];
            const distractor = getRandomItem(distractorPool);
            if (!baseSymptoms.includes(distractor) && !extraSymptoms.includes(distractor)) {
              extraSymptoms.push(distractor);
            }
          }

          symptomSet = shuffleArray([...baseSymptoms, ...extraSymptoms]);
          
          // Clinical uniqueness: Ensure the combination of complaint, history and evolution is unique
          combination = `${category}-${complaint.substring(0, 20)}-${history.substring(0, 20)}-${evolutionTime}`;
          
          if (!usedCombinations.has(combination)) {
            usedCombinations.add(combination);
            break;
          }
          attempts++;
        }

        const image = isMale ? getRandomItem(MALE_IMAGES) : getRandomItem(FEMALE_IMAGES);
        
        const stages: CaseStage[] = normalizedStages.map((stageTemplate, sIdx) => {
          const qTemplate = getRandomItem(stageTemplate.questions);
          
          const optionsWithCorrect = qTemplate.options.map((text, oIdx) => ({
            text,
            isCorrect: oIdx === qTemplate.correctIdx
          }));
          
          const shuffledOptions = shuffleArray(optionsWithCorrect);
          const finalOptions = shuffledOptions.map((o, oIdx) => ({
            id: ['A', 'B', 'C', 'D'][oIdx] as 'A' | 'B' | 'C' | 'D',
            text: o.text
          }));
          
          const correctOption = ['A', 'B', 'C', 'D'][shuffledOptions.findIndex(o => o.isCorrect)] as 'A' | 'B' | 'C' | 'D';

          const stageMultimedia: Multimedia[] = [];
          const isVideo = stageTemplate.title.toLowerCase().includes('exercício') || stageTemplate.title.toLowerCase().includes('tratamento');
          
          stageMultimedia.push({
            type: isVideo ? 'video' : 'image',
            url: isVideo ? getRandomItem(PHYSIO_VIDEOS) : getStageImage('evaluation', category, specialty),
            title: stageTemplate.title,
            description: 'Elemento clínico de referência.'
          });

          return {
            id: ['evaluation', 'diagnosis', 'treatment', 'exercises'][sIdx] || `stage-${sIdx}`,
            title: stageTemplate.title,
            description: stageTemplate.description,
            multimedia: stageMultimedia,
            questions: [{
              id: `q-${idCounter}-${sIdx}`,
              text: qTemplate.text,
              options: finalOptions,
              correctOption,
              explanation: qTemplate.explanation,
              clinicalPearl: `Lembre-se: ${qTemplate.explanation.split('.')[0]}.`,
            }]
          };
        });

        const difficulty = getRandomItem(['Fácil', 'Médio', 'Difícil'] as const);
        const estimatedTime = difficulty === 'Fácil' ? 5 : difficulty === 'Médio' ? 10 : 15;

        cases.push({
          id: `gen-case-${idCounter++}`,
          title: `${specialty}: ${category} - Caso ${i + 1}`,
          image: image,
          category,
          specialty,
          difficulty,
          estimatedTime,
          patient: {
            name: `${name} ${surname}`,
            age,
            profession,
            image,
            complaint,
            history,
            symptoms: symptomSet,
            evolutionTime,
            functionalLimitations,
          },
          stages: stages,
          result: {
            title: 'Recuperação Concluída',
            description: 'O paciente recuperou a funcionalidade e retornou às suas atividades diárias com sucesso.',
            image: getCategoryImage(category, specialty),
            multimedia: [
              {
                type: 'image',
                url: getCategoryImage(category, specialty),
                title: 'Resultado Final',
                description: 'Estado final do paciente após o plano de tratamento.'
              }
            ]
          }
        });
      }
    });
  });

  return cases;
}
