# Imuniza+

App em React (Vite + Tailwind + Framer Motion) com três frentes, pensado como MVP de hackathon:

1. **Minhas vacinas** (`/vacinas`) — checklist do calendário nacional de vacinação (PNI), do nascimento até idoso. Ao marcar uma vacina como não tomada, mostra um relatório com a doença prevenida, possíveis consequências, efeitos adversos esperados e quando procurar atendimento.
2. **Tire sua dúvida** (`/duvidas`) — chat onde o usuário cola uma alegação vista nas redes (ex: TikTok) e recebe uma resposta estruturada (mito/fato, efeitos esperados, indicação da vacina e fontes). Hoje usa uma base de conhecimento curada offline (`src/data/myths.js`) — em produção, isso seria trocado por uma busca em tempo real em fontes oficiais (RAG).
3. **Modo Aprender** (`/aprender`) — quiz estilo Duolingo que dá XP por resposta certa, com barra de nível persistente (`src/context/AppContext.jsx`, salva em `localStorage`).

## Rodando localmente

```bash
npm install
npm run dev       # ambiente de desenvolvimento
npm run build     # build de produção em dist/
npm run preview   # servir o build de produção
```

## Estrutura

```
src/
  context/AppContext.jsx   # estado global: perfil, vacinas marcadas, XP/nível
  data/vaccines.js          # catálogo de vacinas do calendário nacional
  data/myths.js              # base de mitos/fatos para o chat
  data/quiz.js                # perguntas do modo Aprender + curva de XP
  components/                 # LevelBar, CoverageRing, Layout (nav responsiva), Onboarding, XpToast
  pages/                       # Home, Vacinas, Duvidas, Aprender, Perfil
```

## Próximos passos sugeridos

- Trocar `findMyth()` (busca por palavra-chave) por uma busca real em fontes oficiais (RAG) com citação de fonte verificável.
- Adicionar cadastro real de paciente / integração com Conecte SUS para puxar histórico vacinal automaticamente.
- Ligar o modelo de negócio discutido (CPSI / Lei Complementar 182/2021) como piloto remunerado com uma prefeitura.

⚠️ Conteúdo educativo — não substitui avaliação de um profissional de saúde.
