Imuniza+

Projeto que fiz para um ideathon, em cima de uma ideia simples: muita gente deixa de vacinar (ou os filhos) por desinformação nas redes, e não existe um jeito fácil de checar isso nem de acompanhar o que já tomou. O Imuniza+ tenta resolver os dois lados — um app pro cidadão acompanhar a própria carteira de vacinação e tirar dúvidas, e um painel pra prefeitura/operadora de saúde que bancaria isso pros beneficiários dela.

Vale deixar claro: isso é um protótipo de hackathon, não um produto pronto. Rodei em cima do tempo que tinha pra apresentação, então tem bastante coisa simulada — está tudo explicado mais embaixo, na parte de limitações.

O que dá pra fazer no app

Do lado do cidadão, o cadastro é rápido (nome, telefone, data de nascimento e a cor do app) e a partir da data de nascimento o sistema já filtra quais vacinas e perguntas fazem sentido pra aquela fase da vida.

A carteira de vacinas (/vacinas) segue o calendário nacional e mostra, pra cada vacina que a pessoa ainda não marcou como tomada, o que ela protege e o que pode acontecer se não tomar — sem ser alarmista, só informativo.

O chat de dúvidas (/duvidas) é a parte que mais gosto: a pessoa cola algo tipo "vi no TikTok que a vacina X causa Y" e recebe uma resposta com o que é mito, o que é fato, efeitos esperados e fonte. Isso hoje é uma base de mitos que escrevi manualmente (uns 26, cobrindo as vacinas mais faladas), não é um LLM respondendo — é busca por palavra-chave numa base curada. Funciona bem pros casos comuns, mas não é genérico.

Tem também um modo de quiz (/aprender) com XP e nível, tipo Duolingo, só pra dar um motivo a mais pra pessoa voltar no app, e uma trilha de recompensas (/beneficios) que desbloqueia prêmios conforme a pessoa vai marcando vacinas tomadas — nada real, é só a mecânica pronta pra quando tiver um parceiro de verdade dando os prêmios.

Do lado da instituição (/empresa), tem um login separado do app do cidadão, um dashboard com cobertura vacinal por região e ranking dos mitos mais perguntados, e uma tela de configurações. O dashboard usa dados inventados — não é cobertura vacinal real de lugar nenhum, é só pra mostrar como ficaria.

Stack

React + Vite + Tailwind + Framer Motion, tudo em JSX sem TypeScript. Não tem backend — o estado fica salvo no localStorage do navegador mesmo.

Rodando
bash
npm install
npm run dev       # dev
npm run build     # build de produção
npm run preview   # serve o build
Estrutura
src/
  App.jsx / Root.jsx              # separa as rotas do app do cidadão e do painel da empresa
  context/AppContext.jsx          # estado do cidadão (perfil, vacinas marcadas, XP)
  data/vaccines.js                # calendário nacional de vacinação
  data/myths.js                   # base de mitos/fatos do chat
  data/quiz.js                    # perguntas do modo aprender
  data/rewards.js                 # marcos da trilha de recompensas
  components/                     # componentes compartilhados do app do cidadão
  pages/                          # Home, Vacinas, Duvidas, Aprender, Beneficios, Perfil
  admin/
    context/AdminAuthContext.jsx  # login/estado da instituição
    data/mockAnalytics.js         # dados fictícios do dashboard
    pages/                        # login, dashboard, configurações
O que é simulado (leia antes de julgar como se fosse produto real)

Não tem backend nem banco de dados — tudo fica no navegador. Não tem autenticação de verdade nem no lado do cidadão nem no da instituição, é só o fluxo montado. O chat não usa IA, é busca em base fixa. Os números do dashboard da empresa são inventados. Não tem integração com Conecte SUS, ANS ou qualquer sistema de agendamento real. O conteúdo sobre vacinas segue o calendário oficial, mas não substitui um profissional de saúde — isso qualquer app de saúde precisa deixar claro.

Se fosse virar produto de verdade

Trocaria a busca do chat por algo real com fontes verificáveis, integraria com Conecte SUS pra puxar histórico de vacinação automaticamente, montaria um backend com autenticação e agregação anônima de dados de verdade pro dashboard, e cobraria da instituição por vida/mês (PMPM) mais uma taxa de implantação — vendendo via licitação pra prefeitura ou direto pra operadora de saúde. A lógica de negócio é simples: cada vacina em dia é um problema (e um custo) evitado depois.