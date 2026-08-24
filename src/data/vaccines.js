// Catálogo consolidado do Calendário Nacional de Vacinação (PNI / Ministério da Saúde),
// organizado por fase da vida, do nascimento até a pessoa idosa (60-70+ anos).
// Conteúdo educativo — não substitui orientação de um profissional de saúde.

export const PHASES = [
  { id: 'crianca', label: 'Criança', range: '0 a 9 anos', icon: '🧒' },
  { id: 'adolescente', label: 'Adolescente', range: '10 a 19 anos', icon: '🧑' },
  { id: 'adulto', label: 'Adulto', range: '20 a 59 anos', icon: '🧑‍💼' },
  { id: 'idoso', label: 'Pessoa idosa', range: '60+ anos', icon: '🧓' },
]

export const VACCINES = [
  {
    id: 'bcg',
    name: 'BCG',
    icon: '🩹',
    phases: ['crianca'],
    doseInfo: 'Dose única, ao nascer',
    disease: 'Formas graves de tuberculose',
    diseaseDetail:
      'Protege principalmente contra as formas graves da tuberculose na infância, como a tuberculose miliar e a meningite tuberculosa.',
    consequences: [
      'Maior risco de meningite tuberculosa em bebês e crianças pequenas',
      'Maior risco de tuberculose disseminada (miliar), com pior prognóstico',
    ],
    adverseEffects: ['Ferida local que evolui para uma pequena cicatriz (esperado)', 'Gânglio na axila, geralmente sem gravidade'],
    seekCareIf: ['Ferida com pus intenso, febre alta ou gânglio muito grande e dolorido'],
  },
  {
    id: 'hepb',
    name: 'Hepatite B',
    icon: '🧬',
    phases: ['crianca', 'adolescente', 'adulto', 'idoso'],
    doseInfo: 'Ao nascer (crianças) ou 3 doses (não vacinados)',
    disease: 'Hepatite B',
    diseaseDetail:
      'Infecção viral do fígado que pode se tornar crônica, especialmente quando adquirida ao nascer ou na infância.',
    consequences: [
      'Hepatite crônica, cirrose hepática',
      'Maior risco de câncer de fígado a longo prazo',
      'Transmissão para outras pessoas (contato sexual, sangue, mãe-filho)',
    ],
    adverseEffects: ['Dor local, febre baixa (comum e esperado)'],
    seekCareIf: ['Reação alérgica grave (rara), febre alta persistente'],
  },
  {
    id: 'penta',
    name: 'Pentavalente',
    icon: '💉',
    phases: ['crianca'],
    doseInfo: '3 doses aos 2, 4 e 6 meses',
    disease: 'Difteria, tétano, coqueluche, Hib e Hepatite B',
    diseaseDetail:
      'Combina proteção contra cinco doenças, incluindo a Haemophilus influenzae tipo B, causa importante de meningite bacteriana em bebês.',
    consequences: [
      'Coqueluche grave em bebês (pode ser fatal em menores de 1 ano)',
      'Meningite ou pneumonia por Haemophilus influenzae b',
      'Difteria (obstrução das vias respiratórias) e tétano neonatal',
    ],
    adverseEffects: ['Febre, choro, dor e vermelhidão no local (comuns e esperados)'],
    seekCareIf: ['Choro incontrolável por mais de 3h, febre acima de 39-40°C, convulsão'],
  },
  {
    id: 'vip',
    name: 'VIP / VOP (Poliomielite)',
    icon: '🦵',
    phases: ['crianca'],
    doseInfo: '3 doses + reforços aos 15 meses e 4 anos',
    disease: 'Poliomielite (paralisia infantil)',
    diseaseDetail: 'Doença viral que pode causar paralisia permanente, principalmente em crianças pequenas.',
    consequences: ['Paralisia flácida permanente de membros', 'Risco de paralisia dos músculos respiratórios em casos graves'],
    adverseEffects: ['Dor leve no local (raro mal-estar)'],
    seekCareIf: ['Febre alta persistente ou reação incomum no local'],
  },
  {
    id: 'rotavirus',
    name: 'Rotavírus',
    icon: '🍼',
    phases: ['crianca'],
    doseInfo: '2 doses aos 2 e 4 meses',
    disease: 'Diarreia grave por rotavírus',
    diseaseDetail: 'Principal causa de diarreia grave e hospitalização por desidratação em bebês no mundo.',
    consequences: ['Desidratação grave', 'Hospitalização por diarreia intensa e vômitos'],
    adverseEffects: ['Irritabilidade leve, fezes mais amolecidas por 1-2 dias'],
    seekCareIf: ['Sinais de desidratação: boca seca, urina escassa, sonolência excessiva'],
  },
  {
    id: 'pneumo',
    name: 'Pneumocócica (10/20-valente)',
    icon: '🫁',
    phases: ['crianca', 'idoso'],
    doseInfo: 'Doses na infância; dose para grupos de risco e idosos',
    disease: 'Pneumonia, meningite e otite por pneumococo',
    diseaseDetail: 'Previne infecções invasivas causadas pela bactéria pneumococo, comuns em crianças pequenas e idosos.',
    consequences: ['Pneumonia grave', 'Meningite bacteriana', 'Sepse (infecção generalizada)'],
    adverseEffects: ['Dor e inchaço local, febre baixa'],
    seekCareIf: ['Febre alta persistente, falta de ar, confusão mental (em idosos)'],
  },
  {
    id: 'meningo',
    name: 'Meningocócica C / ACWY',
    icon: '🧠',
    phases: ['crianca', 'adolescente'],
    doseInfo: 'Doses na infância + reforço aos 11-12 anos',
    disease: 'Meningite e meningococcemia',
    diseaseDetail:
      'Doença de evolução muito rápida (horas), que pode levar à morte ou deixar sequelas graves mesmo com tratamento.',
    consequences: [
      'Meningite bacteriana com risco de morte em poucas horas',
      'Sequelas neurológicas, surdez, amputações em casos de meningococcemia',
    ],
    adverseEffects: ['Dor local, febre baixa por 1-2 dias'],
    seekCareIf: ['Febre alta + dor de cabeça intensa + rigidez de nuca + manchas roxas na pele: procurar emergência imediatamente'],
  },
  {
    id: 'triplice',
    name: 'Tríplice Viral (SCR)',
    icon: '🤒',
    phases: ['crianca', 'adolescente', 'adulto'],
    doseInfo: '2 doses, a partir de 12 meses',
    disease: 'Sarampo, caxumba e rubéola',
    diseaseDetail:
      'O sarampo é altamente contagioso e pode causar complicações graves; a rubéola na gravidez pode causar má-formação no bebê.',
    consequences: [
      'Sarampo: pneumonia, encefalite (inflamação cerebral), óbito',
      'Rubéola na gestação: síndrome da rubéola congênita (surdez, catarata, malformações no bebê)',
      'Caxumba: meningite, inflamação testicular/ovariana',
    ],
    adverseEffects: ['Febre e manchas leves de 5 a 12 dias após a dose (esperado, não é contagioso)'],
    seekCareIf: ['Febre muito alta, convulsão ou manchas roxas na pele'],
  },
  {
    id: 'varicela',
    name: 'Varicela',
    icon: '🔴',
    phases: ['crianca', 'adolescente'],
    doseInfo: '1 a 2 doses a partir de 12-15 meses',
    disease: 'Catapora (varicela)',
    diseaseDetail: 'Geralmente leve na infância, mas pode ter complicações e é mais grave em adolescentes e adultos.',
    consequences: ['Infecção bacteriana da pele', 'Pneumonia e, raramente, encefalite'],
    adverseEffects: ['Febre baixa e poucas lesões de pele leves (raro)'],
    seekCareIf: ['Febre alta, lesões com pus extenso, dificuldade respiratória'],
  },
  {
    id: 'hepa',
    name: 'Hepatite A',
    icon: '🧫',
    phases: ['crianca'],
    doseInfo: 'Dose única aos 15 meses',
    disease: 'Hepatite A',
    diseaseDetail: 'Transmitida por água/alimentos contaminados; geralmente autolimitada, mas pode ser grave.',
    consequences: ['Hepatite aguda com icterícia', 'Raramente, insuficiência hepática aguda'],
    adverseEffects: ['Dor local, mal-estar leve'],
    seekCareIf: ['Pele/olhos amarelados, urina muito escura, vômitos persistentes'],
  },
  {
    id: 'dtp-dt',
    name: 'DTP / dT / dTpa (reforços)',
    icon: '💪',
    phases: ['crianca', 'adolescente', 'adulto', 'idoso'],
    doseInfo: 'Reforços a cada 10 anos (dT) durante toda a vida',
    disease: 'Difteria, tétano e coqueluche',
    diseaseDetail: 'A proteção contra tétano e difteria diminui com o tempo — por isso o reforço é necessário a cada 10 anos.',
    consequences: [
      'Tétano após ferimentos (mesmo pequenos), com risco de morte',
      'Difteria com obstrução das vias respiratórias',
    ],
    adverseEffects: ['Dor no braço, febre baixa'],
    seekCareIf: ['Febre alta ou reação local muito extensa'],
  },
  {
    id: 'hpv',
    name: 'HPV',
    icon: '🎗️',
    phases: ['adolescente'],
    doseInfo: '1 a 2 doses, recomendada a partir dos 9 anos',
    disease: 'Câncer de colo de útero e outros cânceres relacionados ao HPV',
    diseaseDetail: 'Protege contra os tipos de HPV mais associados ao câncer de colo do útero, ânus, orofaringe e verrugas genitais.',
    consequences: [
      'Maior risco de câncer de colo do útero ao longo da vida',
      'Maior risco de outros cânceres associados ao HPV (ânus, orofaringe)',
    ],
    adverseEffects: ['Dor local, tontura leve (fique sentado alguns minutos após a dose)'],
    seekCareIf: ['Desmaio prolongado ou reação alérgica'],
  },
  {
    id: 'dengue',
    name: 'Dengue (QDenga)',
    icon: '🦟',
    phases: ['adolescente'],
    doseInfo: '2 doses, faixa etária definida pelo município',
    disease: 'Dengue',
    diseaseDetail: 'Reduz o risco de formas graves de dengue em quem já teve ou vier a ter contato com o vírus.',
    consequences: ['Formas graves de dengue (hemorrágica)', 'Hospitalização por complicações'],
    adverseEffects: ['Dor local, dor de cabeça leve, febre baixa'],
    seekCareIf: ['Sangramentos, dor abdominal intensa, vômitos persistentes após dengue'],
  },
  {
    id: 'febre-amarela',
    name: 'Febre Amarela',
    icon: '🐒',
    phases: ['crianca', 'adolescente', 'adulto', 'idoso'],
    doseInfo: 'Dose aos 9 meses + reforço aos 4 anos (1 dose para adultos não vacinados)',
    disease: 'Febre amarela',
    diseaseDetail: 'Doença viral transmitida por mosquito, com forma grave que afeta fígado e rins.',
    consequences: ['Forma hemorrágica grave', 'Insuficiência hepática e renal, risco de óbito'],
    adverseEffects: ['Febre baixa, dor de cabeça leve por 1-2 dias'],
    seekCareIf: ['Febre alta com icterícia (pele amarelada) ou sangramentos'],
  },
  {
    id: 'influenza',
    name: 'Influenza (gripe)',
    icon: '🤧',
    phases: ['crianca', 'adulto', 'idoso'],
    doseInfo: 'Dose anual, prioritária para idosos e grupos de risco',
    disease: 'Gripe (Influenza)',
    diseaseDetail: 'Reduz o risco de formas graves da gripe, especialmente importante em idosos e pessoas com doenças crônicas.',
    consequences: ['Pneumonia viral ou bacteriana secundária', 'Descompensação de doenças crônicas (cardíacas, respiratórias)'],
    adverseEffects: ['Dor local, febre baixa por 1 dia'],
    seekCareIf: ['Falta de ar, febre alta persistente por mais de 3 dias'],
  },
  {
    id: 'covid',
    name: 'Covid-19',
    icon: '🦠',
    phases: ['crianca', 'adulto', 'idoso'],
    doseInfo: 'Esquema inicial + reforços (anual/semestral conforme grupo)',
    disease: 'Covid-19',
    diseaseDetail: 'Reduz significativamente o risco de formas graves, hospitalização e óbito por Covid-19.',
    consequences: ['Formas graves com necessidade de hospitalização/UTI', 'Maior risco em idosos e pessoas com comorbidades'],
    adverseEffects: ['Dor local, febre baixa, cansaço por 1-2 dias'],
    seekCareIf: ['Falta de ar, saturação de oxigênio baixa, confusão mental'],
  },
  {
    id: 'vsr',
    name: 'VSR (Vírus Sincicial Respiratório)',
    icon: '👶',
    phases: ['idoso'],
    doseInfo: 'Dose para idosos e gestantes (proteção do recém-nascido)',
    disease: 'Bronquiolite/pneumonia por VSR',
    diseaseDetail: 'Protege grupos de maior risco, como idosos, contra formas graves de infecção respiratória por VSR.',
    consequences: ['Pneumonia grave em idosos', 'Hospitalização por insuficiência respiratória'],
    adverseEffects: ['Dor local, fadiga leve'],
    seekCareIf: ['Falta de ar ou piora respiratória progressiva'],
  },
]

export function vaccinesForPhase(phaseId) {
  return VACCINES.filter((v) => v.phases.includes(phaseId))
}

export function ageFromBirthDate(birthDateStr) {
  const birth = new Date(birthDateStr)
  if (Number.isNaN(birth.getTime())) return null
  const today = new Date()
  if (birth > today) return null
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--
  return age
}

// A partir da data de nascimento, determina automaticamente a fase da vida
// (usada para o avatar e para filtrar vacinas/perguntas relevantes).
export function phaseFromBirthDate(birthDateStr) {
  const age = ageFromBirthDate(birthDateStr)
  if (age === null || age < 0) return null
  if (age < 10) return 'crianca'
  if (age < 20) return 'adolescente'
  if (age < 60) return 'adulto'
  return 'idoso'
}

// Vacinas "relevantes" para alguém na fase X: todas as vacinas recomendadas
// da fase mais nova até a fase atual (ex.: um adulto já deveria ter tomado
// as vacinas de criança e adolescente também).
export function relevantVaccines(phaseId) {
  const idx = PHASES.findIndex((p) => p.id === phaseId)
  if (idx === -1) return VACCINES
  const eligiblePhaseIds = PHASES.slice(0, idx + 1).map((p) => p.id)
  return VACCINES.filter((v) => v.phases.some((ph) => eligiblePhaseIds.includes(ph)))
}
