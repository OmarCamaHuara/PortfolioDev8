# Visão do Produto

## O que estamos construindo

Um portfolio **dual-track** para `ohmar_tai`:

1. **Creator/influencer YouTube** (audiência principal): o visitante que chega pelo YouTube, Instagram ou link em bio precisa entender em segundos quem é o Omar, o que ele posta, e por que vale seguir.
2. **Dev-for-hire** (audiência secundária): o recrutador ou parceiro que chega por LinkedIn/GitHub encontra evidência técnica sólida em `/work` e um `/cv` navegável no footer.

O site **não** é um CV em cima de tema. É a extensão da marca pessoal `ohmar_tai`, com a evidência profissional acessível para quem procurar.

## Público-alvo

| Persona | Rota preferida | O que precisa ver |
|---|---|---|
| **Visitante do canal** (chega do YouTube/redes) | `/` (Home) | Personalidade, tom de voz, últimos vídeos/posts, próximos temas, formas de seguir |
| **Recrutador com pressa** (30–60s) | `/work` + `/cv` | Stack, últimas experiências, projetos com métrica, botão de contato |
| **Recrutador técnico** | `/work` + repositórios linkados | Profundidade de código (repo público bem cuidado), decisões técnicas, chatbot para perguntar detalhes |
| **Parceiro/anunciante** | `/` + `/contact` | Alcance, tom, formas de colaboração |

## Diferenciais

1. **Estética neo-brutalist híbrida.** Base monkeytype (mono, minimalismo, alta legibilidade) + acentos comic-book cirúrgicos (glitch em hero, halftone em HUD widget de status, onomatopeia em CTA). Sinaliza rigor técnico *e* personalidade criativa sem cair em nenhum dos extremos.
2. **IA de verdade, contida.** Chatbot que responde sobre o perfil do Omar usando MDX como contexto — com guardrails, rate-limit e disclaimer visível. Pitch por vaga com aprovação humana antes de exibir publicamente.
3. **Agent-first surfaces.** O site é otimizado para ser lido por LLMs (llms.txt, .md twins, sitemap.xml, RSS) — quando ChatGPT/Claude/Perplexity citam o Omar, citam com dados corretos.
4. **Content-as-code.** Tudo em MDX versionado no repo. Não há CMS pra quebrar às 3h da manhã.

## Objetivos mensuráveis

- Visitante identifica **"canal de creator + dev sênior"** sem clicar (hero + primeiro scroll).
- Rota `/cv` acessível e completa em ≤ 2 cliques a partir do footer.
- Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1.
- Chatbot com custo mensal ≤ USD 5 no primeiro ano (rate-limit + cache).
- Zero PII pessoal exposta no repositório (telefone/email pessoal vivem em variáveis de ambiente ou linkedin, nunca em Markdown).

## O que este produto NÃO é

- **Não é um CV virtual.** CV é uma rota (`/cv`), não o produto.
- **Não é o canal do YouTube.** Complementa o canal, não substitui.
- **Não hospeda a plataforma HiraiPro nem outros projetos.** Referencia-os como cases.
- **Não é um template genérico.** É a marca `ohmar_tai`.
- **Não tem backend Java, Postgres, admin CRUD ou app mobile.** Ver `01-architecture/overview.md`.

## Referências de inspiração

- [Setproduct — Retro & brutalist UI 2026 field guide](https://www.setproduct.com/blog/retro-brutalist-ui-design-2026) — base mono + hard shadows + tipografia bold.
- [Alex Mayhew — Neo-Brutalism developer guide](https://alexmayhew.dev/blog/neo-brutalism-developer-guide) — receita técnica.
- [GudlaVishal-23/vishal-gudla-portfolio](https://github.com/GudlaVishal-23/vishal-gudla-portfolio) — teto do lado comic (halftone como HUD, não wallpaper). Rouba-se o padrão, não o over-engineering.
- [afreen668/Glitch-Themed-Portfolio-Website](https://github.com/afreen668/Glitch-Themed-Portfolio-Website) — glitch pontual, boa calibração.
- [DEV — Into The Halftone-Verse](https://dev.to/madsstoumann/into-the-halftone-verse-1ckl) — halftone leve com CSS, sem Three.js.
