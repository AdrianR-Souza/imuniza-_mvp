// Base de conhecimento (demo, offline) para o chat de dúvidas sobre vacinas.
// Em produção, isso seria substituído por uma busca em fontes oficiais (RAG),
// mas aqui simulamos com respostas pré-curadas e busca por palavras-chave.
// Cobre pelo menos uma dúvida por vacina do calendário nacional (PNI) + mitos
// gerais mais comuns nas redes sociais. Alguns itens são "parcialmente
// verdade" de propósito — nem todo risco relatado sobre vacina é mentira, e
// isso é importante para manter a credibilidade da resposta.

export const MYTHS = [
  // ---- Mitos gerais (cross-vacinas) ----------------------------------
  {
    id: 'autismo',
    keywords: ['autismo', 'autista', 'wakefield'],
    claim: '"Vacina causa autismo"',
    verdict: 'mito',
    summary:
      'Não existe evidência científica de que qualquer vacina cause autismo. Esse mito nasceu de um estudo de 1998 (Andrew Wakefield) que foi retratado pela revista científica por fraude, e o autor perdeu a licença médica.',
    expectedEffects: ['Dor local', 'Febre baixa por 1-2 dias', 'Manchas leves (tríplice viral), sem gravidade'],
    seekCareIf: 'Febre muito alta, convulsão ou reação alérgica grave (rara).',
    indication: 'Tríplice viral: 2 doses, a partir de 12 meses de idade.',
    sources: [
      'OMS — Vaccines and Autism (mito desmentido)',
      'CDC — Vaccine Safety: Autism',
      'Ministério da Saúde — Mitos e Verdades sobre Vacinas',
    ],
  },
  {
    id: 'infertilidade',
    keywords: ['infertilidade', 'infertil', 'esteril'],
    claim: '"Vacina causa infertilidade"',
    verdict: 'mito',
    summary:
      'Não há evidência de que vacinas (HPV, Covid-19 ou outras do calendário nacional) causem infertilidade em homens ou mulheres. Estudos de acompanhamento com milhões de pessoas não encontraram essa associação.',
    expectedEffects: ['Dor local', 'Tontura leve (fique sentado alguns minutos após a dose de HPV)'],
    seekCareIf: 'Desmaio prolongado ou sinais de reação alérgica grave.',
    indication: 'HPV: recomendada a partir dos 9 anos. Covid-19: conforme grupo e esquema vigente.',
    sources: ['OMS — Q&A on HPV vaccines', 'Sociedade Brasileira de Imunizações (SBIm)'],
  },
  {
    id: 'sobrecarga-imunologica',
    keywords: ['sobrecarreg', 'imunolog'],
    claim: '"Tomar muitas vacinas ao mesmo tempo sobrecarrega o sistema imunológico"',
    verdict: 'mito',
    summary:
      'O sistema imunológico de um bebê lida, todos os dias, com muito mais estímulos do ambiente do que os presentes em todas as vacinas do calendário juntas. Não há evidência de "sobrecarga" por tomar vacinas combinadas nas datas recomendadas.',
    expectedEffects: ['Febre baixa', 'Irritabilidade e choro no dia da aplicação'],
    seekCareIf: 'Febre acima de 39-40°C ou choro incontrolável por mais de 3 horas.',
    indication: 'Seguir o calendário nacional de vacinação por idade.',
    sources: ['Sociedade Brasileira de Pediatria (SBP)', 'CDC — Multiple Vaccines and the Immune System'],
  },
  {
    id: 'imunidade-natural',
    keywords: ['natural'],
    claim: '"É melhor pegar a doença naturalmente do que se vacinar"',
    verdict: 'mito',
    summary:
      'A imunidade adquirida pela doença natural vem acompanhada do risco real de complicações graves (pneumonia, encefalite, sequelas, óbito) — risco que a vacina evita, gerando proteção sem passar pela doença.',
    expectedEffects: ['Reações leves e temporárias, muito menos graves que a doença em si'],
    seekCareIf: 'Qualquer reação incomum e persistente após a vacina.',
    indication: 'Varia por vacina — consulte o calendário nacional.',
    sources: ['OMS — Vaccine Safety Basics', 'Ministério da Saúde — PNI'],
  },
  {
    id: 'mercurio-aluminio',
    keywords: ['mercuri', 'alumini', 'toxin', 'metais', 'pesados'],
    claim: '"Vacinas têm metais pesados tóxicos (mercúrio, alumínio) que fazem mal"',
    verdict: 'parcialmente mito',
    summary:
      'Algumas vacinas usam sais de alumínio como adjuvante (em quantidade muito pequena e segura, estudada há décadas) e o timerosal (derivado de mercúrio, diferente do metilmercúrio tóxico) já foi removido da maioria das vacinas do calendário infantil brasileiro. As doses usadas não atingem níveis tóxicos.',
    expectedEffects: ['Endurecimento leve ou vermelhidão no local da aplicação'],
    seekCareIf: 'Nódulo que cresce, tem pus ou dor intensa persistente.',
    indication: 'Consulte a bula/ficha técnica de cada vacina para composição detalhada.',
    sources: ['ANVISA — Bulários de vacinas', 'OMS — Vaccine ingredients'],
  },
  {
    id: 'vacina-importada-melhor',
    keywords: ['importad', 'particul'],
    claim: '"Vacina importada/particular é mais eficaz que a do SUS"',
    verdict: 'mito',
    summary:
      'Todas as vacinas usadas no Brasil, públicas ou privadas, precisam do registro da ANVISA e seguem os mesmos critérios de segurança e eficácia. A diferença entre rede pública e privada costuma ser de marca/fabricante ou disponibilidade, não de qualidade da proteção.',
    expectedEffects: ['Reações leves esperadas, semelhantes entre marcas de uma mesma vacina'],
    seekCareIf: 'Reação incomum ou persistente, independentemente de onde foi aplicada.',
    indication: 'Consulte o calendário nacional — o SUS oferece gratuitamente a maioria das vacinas recomendadas por idade.',
    sources: ['ANVISA — Registro de vacinas', 'Ministério da Saúde — PNI'],
  },
  {
    id: 'esquema-incompleto',
    keywords: ['incomplet'],
    claim: '"Já tomei uma dose e não tive reação, não preciso completar o esquema"',
    verdict: 'mito',
    summary:
      'Muitas vacinas precisam de 2 ou mais doses para gerar proteção completa e duradoura — a primeira dose costuma "apresentar" o agente ao sistema imune, e as doses seguintes consolidam a memória imunológica. Esquema incompleto pode significar proteção parcial ou insuficiente.',
    expectedEffects: ['Reações leves podem variar entre doses, incluindo nenhuma reação perceptível'],
    seekCareIf: 'Qualquer reação incomum após qualquer dose do esquema.',
    indication: 'Siga o número de doses e o intervalo recomendado para cada vacina.',
    sources: ['Sociedade Brasileira de Imunizações (SBIm)', 'Ministério da Saúde — Calendário de Vacinação'],
  },
  {
    id: 'amamentacao-protege',
    keywords: ['amamenta', 'materno'],
    claim: '"Amamentação já protege o bebê, não precisa vacinar"',
    verdict: 'mito',
    summary:
      'O leite materno oferece proteção importante, mas parcial e temporária, contra algumas infecções — não substitui a proteção específica e duradoura que as vacinas do calendário oferecem contra doenças graves como coqueluche, meningite e poliomielite.',
    expectedEffects: ['Reações leves e esperadas nas doses do calendário infantil'],
    seekCareIf: 'Febre alta, choro incontrolável ou reação incomum após a vacina.',
    indication: 'Seguir o calendário da criança mesmo durante a amamentação.',
    sources: ['Sociedade Brasileira de Pediatria (SBP)', 'OMS — Breastfeeding and Immunization'],
  },

  // ---- Por vacina/doença ------------------------------------------------
  {
    id: 'bcg-causa-tuberculose',
    keywords: ['bcg', 'tuberculos'],
    claim: '"A vacina BCG pode dar tuberculose no bebê"',
    verdict: 'parcialmente mito',
    summary:
      'A BCG usa uma bactéria viva enfraquecida, e a ferida/cicatriz local faz parte da resposta esperada — não é a doença. Em bebês com imunodeficiência grave (rara e geralmente ainda não diagnosticada ao nascer), pode haver complicação local mais séria, por isso a triagem de sinais de alerta é importante.',
    expectedEffects: ['Ferida local que evolui para uma pequena cicatriz (esperado)', 'Gânglio na axila, geralmente sem gravidade'],
    seekCareIf: 'Ferida com pus intenso além de 3 meses, gânglio muito grande/dolorido ou sinais de infecção generalizada.',
    indication: 'Dose única, preferencialmente ainda na maternidade.',
    sources: ['Ministério da Saúde — Manual de Normas de Vacinação (BCG)', 'SBIm — Calendário de Vacinação'],
  },
  {
    id: 'hepatite-b-recem-nascido',
    keywords: ['hepatite b', 'parto', 'recem nascid'],
    claim: '"Hepatite B só pega quem tem \'comportamento de risco\', bebê não precisa tomar ao nascer"',
    verdict: 'mito',
    summary:
      'A vacina é aplicada nas primeiras 24h de vida porque o maior risco de cronificação da hepatite B é justamente a transmissão da mãe para o bebê durante o parto — inclusive de mães que não sabem que têm o vírus. Quanto mais cedo a infecção ocorre na vida, maior a chance de virar hepatite crônica.',
    expectedEffects: ['Dor local, febre baixa (comum e esperado)'],
    seekCareIf: 'Reação alérgica grave (rara), febre alta persistente.',
    indication: 'Dose ao nascer, idealmente nas primeiras 24 horas de vida.',
    sources: ['Ministério da Saúde — Hepatite B', 'OMS — Hepatitis B vaccine position paper'],
  },
  {
    id: 'penta-morte-subita',
    keywords: ['pentavalente', 'morte subita', 'sids'],
    claim: '"A vacina pentavalente pode causar morte súbita do bebê"',
    verdict: 'mito',
    summary:
      'Grandes estudos populacionais não encontraram relação causal entre vacinas do calendário infantil e a síndrome da morte súbita do lactente (SMSL). A coincidência de idade (ambas mais comuns nos primeiros meses de vida) já foi bastante estudada e não indica causalidade.',
    expectedEffects: ['Febre, choro, dor e vermelhidão no local (comuns e esperados)'],
    seekCareIf: 'Choro incontrolável por mais de 3h, febre acima de 39-40°C, convulsão.',
    indication: '3 doses aos 2, 4 e 6 meses.',
    sources: ['CDC — Vaccines Do Not Cause SIDS', 'OMS — Vaccine Safety Basics'],
  },
  {
    id: 'gotinha-poliomielite',
    keywords: ['gotinha', 'polio', 'vop'],
    claim: '"A vacina gotinha (oral) pode dar pólio na criança"',
    verdict: 'parcialmente verdade',
    summary:
      'A vacina oral (VOP, com vírus vivo atenuado) tem um risco extremamente raro de causar poliomielite associada à vacina. Por isso o Brasil usa hoje majoritariamente a VIP (injetável, com vírus inativado/morto) no esquema infantil, que não tem esse risco — a VOP é usada de forma pontual em campanhas, conforme orientação do PNI.',
    expectedEffects: ['Dor leve no local (VIP) ou nenhum efeito perceptível (VOP)'],
    seekCareIf: 'Fraqueza muscular de início súbito após a dose oral (muito raro) ou febre alta persistente.',
    indication: '3 doses de VIP + reforços aos 15 meses e 4 anos, conforme calendário atual.',
    sources: ['OMS — Polio vaccines: WHO position paper', 'Ministério da Saúde — Calendário Técnico de Vacinação'],
  },
  {
    id: 'rotavirus-intussuscepcao',
    keywords: ['rotavirus', 'intussuscep', 'intestin'],
    claim: '"A vacina de rotavírus pode entortar/virar o intestino do bebê"',
    verdict: 'parcialmente verdade',
    summary:
      'Existe, sim, um risco raro de intussuscepção (uma parte do intestino desliza sobre a outra) associado à vacina de rotavírus, um pouco maior nos dias seguintes à dose — por isso ela só é recomendada dentro de uma janela de idade estrita (a partir de 6 semanas, com prazo final para a última dose). Fora dessa ressalva, o benefício de prevenir diarreia grave supera muito o risco raro.',
    expectedEffects: ['Irritabilidade leve, fezes mais amolecidas por 1-2 dias'],
    seekCareIf: 'Choro intenso tipo cólica, vômitos, sangue nas fezes ou barriga inchada nos dias após a dose.',
    indication: '2 doses, aos 2 e 4 meses — respeitar rigorosamente a janela de idade recomendada.',
    sources: ['OMS — Rotavirus vaccines: WHO position paper', 'Ministério da Saúde — Rotavírus Humano'],
  },
  {
    id: 'pneumonia-resfriado-forte',
    keywords: ['pneumonia', 'pneumococ'],
    claim: '"Pneumonia é só um resfriado forte, não precisa vacinar contra isso"',
    verdict: 'mito',
    summary:
      'A pneumonia bacteriana causada pelo pneumococo é uma das principais causas de internação e morte evitável por vacina em crianças pequenas e idosos no mundo — bem diferente de um resfriado comum, pode evoluir para insuficiência respiratória e sepse.',
    expectedEffects: ['Dor e inchaço local, febre baixa'],
    seekCareIf: 'Febre alta persistente, falta de ar, confusão mental (em idosos).',
    indication: 'Doses na infância; dose para grupos de risco e idosos.',
    sources: ['OMS — Pneumococcal disease', 'Ministério da Saúde — Vacina Pneumocócica'],
  },
  {
    id: 'meningite-rara',
    keywords: ['meningite', 'meningococ'],
    claim: '"Meningite é rara, não preciso vacinar meu filho contra isso"',
    verdict: 'mito',
    summary:
      'A doença meningocócica é rara em termos populacionais, mas tem evolução muito rápida (horas) e alta letalidade mesmo com tratamento — é justamente por ser grave e imprevisível, e não por ser comum, que a vacinação preventiva é recomendada.',
    expectedEffects: ['Dor local, febre baixa por 1-2 dias'],
    seekCareIf: 'Febre alta + dor de cabeça intensa + rigidez de nuca + manchas roxas na pele: procurar emergência imediatamente.',
    indication: 'Doses na infância + reforço aos 11-12 anos (meningocócica ACWY).',
    sources: ['Ministério da Saúde — Doença Meningocócica', 'CDC — Meningococcal Disease'],
  },
  {
    id: 'catapora-vacina-zoster',
    keywords: ['catapora', 'varicela', 'zoster', 'cobreiro'],
    claim: '"Catapora é inofensiva e a vacina pode causar cobreiro (zoster) depois"',
    verdict: 'parcialmente mito',
    summary:
      'A catapora costuma ser leve na infância, mas pode ter complicações (infecção de pele, pneumonia, raramente encefalite) e é mais grave em adolescentes, adultos e gestantes. Sobre o zoster: o vírus vacinal também pode, em teoria, ficar latente e reativar — mas estudos mostram que quem toma a vacina tem risco de zoster menor do que quem teve a infecção natural pela catapora.',
    expectedEffects: ['Febre baixa e poucas lesões de pele leves (raro)'],
    seekCareIf: 'Febre alta, lesões com pus extenso, dificuldade respiratória.',
    indication: '1 a 2 doses a partir de 12-15 meses.',
    sources: ['CDC — Varicella Vaccine Safety', 'Sociedade Brasileira de Imunizações (SBIm)'],
  },
  {
    id: 'hepatite-a-mar-sujo',
    keywords: ['hepatite a', 'mar sujo', 'creche'],
    claim: '"Hepatite A é só de \'mar sujo\', meu filho não precisa se vacinar"',
    verdict: 'mito',
    summary:
      'A hepatite A se transmite por via fecal-oral, principalmente por água ou alimentos contaminados e contato próximo — ambientes como creches, com trocas de fralda e higiene das mãos ainda em desenvolvimento, são um cenário comum de transmissão, não só água do mar.',
    expectedEffects: ['Dor local, mal-estar leve'],
    seekCareIf: 'Pele/olhos amarelados, urina muito escura, vômitos persistentes.',
    indication: 'Dose única aos 15 meses.',
    sources: ['Ministério da Saúde — Hepatite A', 'CDC — Hepatitis A Questions and Answers'],
  },
  {
    id: 'tetano-corte-recente',
    keywords: ['tetano', 'cort'],
    claim: '"Só preciso da vacina de tétano se eu me cortar agora"',
    verdict: 'mito',
    summary:
      'A proteção contra tétano (e difteria) diminui com o tempo, por isso o reforço (dT) é recomendado a cada 10 anos independentemente de ferimento recente — o tétano vem de esporos presentes no solo e em objetos enferrujados, e o momento do ferimento não é o momento ideal para começar a se proteger.',
    expectedEffects: ['Dor no braço, febre baixa'],
    seekCareIf: 'Febre alta ou reação local muito extensa.',
    indication: 'Reforço a cada 10 anos (dT) durante toda a vida.',
    sources: ['Ministério da Saúde — Tétano Acidental', 'OMS — Tetanus vaccine'],
  },
  {
    id: 'hpv-vida-sexual',
    keywords: ['hpv', 'sexual', 'promiscuidade'],
    claim: '"Vacina de HPV incentiva o início da vida sexual precoce" / "Só menina precisa tomar"',
    verdict: 'mito',
    summary:
      'Estudos comparando adolescentes vacinados e não vacinados não encontraram relação entre a vacina e o início da atividade sexual. E a recomendação inclui meninos: eles também podem desenvolver cânceres relacionados ao HPV e transmitem o vírus, então vacinar os dois sexos amplia a proteção coletiva.',
    expectedEffects: ['Dor local, tontura leve (fique sentado alguns minutos após a dose)'],
    seekCareIf: 'Desmaio prolongado ou reação alérgica.',
    indication: '1 a 2 doses, recomendada a partir dos 9 anos, meninas e meninos.',
    sources: ['OMS — Q&A on HPV vaccines', 'Ministério da Saúde — Calendário do Adolescente'],
  },
  {
    id: 'dengue-quem-nunca-teve',
    keywords: ['dengue', 'qdenga'],
    claim: '"A vacina de dengue é perigosa para quem nunca teve dengue"',
    verdict: 'parcialmente verdade',
    summary:
      'Esse cuidado tem base real: uma vacina anterior contra dengue (usada em outros países) mostrou maior risco de formas graves em quem nunca havia tido a doença antes de vacinar. A vacina usada hoje no Brasil (QDenga) tem perfil de segurança diferente, mas por isso a faixa etária e os critérios de indicação definidos pelo município/PNI existem — não é para "todo mundo, de qualquer jeito".',
    expectedEffects: ['Dor local, dor de cabeça leve, febre baixa'],
    seekCareIf: 'Sangramentos, dor abdominal intensa, vômitos persistentes após dengue.',
    indication: '2 doses, faixa etária e critérios definidos pelo programa municipal de imunização.',
    sources: ['Ministério da Saúde — Vacina Dengue (QDenga)', 'OMS — Dengue vaccines position paper'],
  },
  {
    id: 'febre-amarela-efeitos',
    keywords: ['febre amarela'],
    claim: '"A vacina de febre amarela é muito perigosa"',
    verdict: 'parcialmente mito',
    summary:
      'A vacina é segura para a grande maioria das pessoas e essencial em áreas de risco. Eventos adversos graves são raros, mais associados à primeira dose em pessoas com certas condições (ex.: imunossupressão) — por isso a triagem antes da aplicação é importante.',
    expectedEffects: ['Febre baixa', 'Dor de cabeça leve por 1-2 dias'],
    seekCareIf: 'Febre alta com icterícia (pele/olhos amarelados) ou sangramentos incomuns.',
    indication: 'Dose aos 9 meses + reforço aos 4 anos; 1 dose para adultos não vacinados em área de risco.',
    sources: ['Ministério da Saúde — Vacina Febre Amarela', 'OMS — Yellow Fever Vaccine Safety'],
  },
  {
    id: 'gripe-vacina-da-gripe',
    keywords: ['gripad'],
    claim: '"A vacina da gripe pode me dar gripe"',
    verdict: 'mito',
    summary:
      'A vacina injetável usa vírus inativado (morto) ou fragmentos do vírus — ela não pode causar a gripe. O mal-estar leve que algumas pessoas sentem é a resposta do sistema imunológico se preparando, não uma infecção.',
    expectedEffects: ['Dor local', 'Febre baixa por 1 dia', 'Leve mal-estar'],
    seekCareIf: 'Falta de ar ou febre alta persistente por mais de 3 dias.',
    indication: 'Dose anual, prioritária para idosos, crianças pequenas e grupos de risco.',
    sources: ['CDC — Misconceptions about Flu Vaccines', 'Ministério da Saúde — Campanha de Influenza'],
  },
  {
    id: 'gripe-gestante',
    keywords: ['gestante', 'gravida'],
    claim: '"Grávida não pode tomar vacina da gripe"',
    verdict: 'mito',
    summary:
      'Pelo contrário: gestantes são grupo prioritário na campanha de influenza, porque têm maior risco de complicações da gripe, e a vacinação também ajuda a proteger o bebê nos primeiros meses de vida, antes de ele poder ser vacinado.',
    expectedEffects: ['Dor local, febre baixa por 1 dia'],
    seekCareIf: 'Falta de ar ou febre alta persistente.',
    indication: 'Recomendada em qualquer fase da gestação, durante a campanha anual.',
    sources: ['Ministério da Saúde — Calendário da Gestante', 'CDC — Flu Vaccine Safety in Pregnancy'],
  },
  {
    id: 'covid-vacina-DNA',
    keywords: ['dna', 'genetica'],
    claim: '"Vacinas de mRNA (Covid-19) alteram o DNA das pessoas"',
    verdict: 'mito',
    summary:
      'O mRNA das vacinas não entra no núcleo da célula, onde fica o DNA, e é degradado pelo organismo em poucos dias após ensinar as células a produzir uma proteína que estimula a resposta imune.',
    expectedEffects: ['Dor local', 'Febre baixa', 'Cansaço por 1-2 dias'],
    seekCareIf: 'Falta de ar, dor no peito ou reação alérgica grave nas primeiras horas.',
    indication: 'Conforme grupo prioritário e esquema vigente no seu município.',
    sources: ['OMS — Como funcionam as vacinas de mRNA', 'Fiocruz — Perguntas e respostas sobre Covid-19'],
  },
  {
    id: 'covid-miocardite',
    keywords: ['miocardit'],
    claim: '"A vacina de Covid-19 causa problemas graves no coração em jovens"',
    verdict: 'parcialmente verdade',
    summary:
      'Existe um risco real, porém raro, de miocardite (inflamação no músculo do coração), mais descrito em homens jovens após vacinas de mRNA, geralmente leve e de recuperação rápida. Esse risco é bem menor do que o risco de miocardite causada pela própria infecção por Covid-19, que costuma ser mais grave.',
    expectedEffects: ['Dor local, febre baixa, cansaço por 1-2 dias'],
    seekCareIf: 'Dor no peito, palpitações ou falta de ar nos dias seguintes à dose.',
    indication: 'Esquema inicial + reforços, conforme grupo etário e de risco vigente.',
    sources: ['CDC — Myocarditis after mRNA COVID-19 vaccination', 'OMS — COVID-19 vaccine safety'],
  },
  {
    id: 'vsr-nao-existe-prevencao',
    keywords: ['vsr', 'sincicial'],
    claim: '"Não existe prevenção para o vírus sincicial respiratório (VSR)"',
    verdict: 'mito',
    summary:
      'Hoje já existe vacina específica contra o VSR para grupos de maior risco, como pessoas idosas e gestantes (que protegem o recém-nascido) — antes disso, a prevenção dependia só de medidas gerais de higiene, mas isso mudou.',
    expectedEffects: ['Dor local, fadiga leve'],
    seekCareIf: 'Falta de ar ou piora respiratória progressiva.',
    indication: 'Dose para idosos e gestantes (proteção do recém-nascido), conforme disponibilidade local.',
    sources: ['Ministério da Saúde — Vacina VSR', 'OMS — RSV vaccines'],
  },
]

const ACCENTS = { á: 'a', à: 'a', ã: 'a', â: 'a', ä: 'a', é: 'e', ê: 'e', è: 'e', ë: 'e', í: 'i', ì: 'i', î: 'i', ï: 'i', ó: 'o', ò: 'o', õ: 'o', ô: 'o', ö: 'o', ú: 'u', ù: 'u', û: 'u', ü: 'u', ç: 'c' }

const norm = (s) =>
  s
    .toLowerCase()
    .split('')
    .map((ch) => ACCENTS[ch] || ch)
    .join('')

export function findMyth(query) {
  const q = norm(query)
  let best = null
  let bestScore = 0
  for (const myth of MYTHS) {
    let score = 0
    for (const kw of myth.keywords) {
      if (q.includes(norm(kw))) score += kw.split(' ').length
    }
    if (score > bestScore) {
      bestScore = score
      best = myth
    }
  }
  return bestScore > 0 ? best : null
}
