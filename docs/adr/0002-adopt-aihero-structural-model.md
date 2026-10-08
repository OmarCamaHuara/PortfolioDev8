# 0002 — Adopt aihero.dev structural model, scoped to Omar's capacity

Confirmada em 2026-09-01 a estrutura de páginas do redesign: Home + `/writing` (Post/Note/Deep Dive) + `/work` (Project Write-up) + Contact-como-bloco-de-footer + surfaces agent-first (`/llms.txt`, `.md` twins). Estrutura decalcada do aihero.dev com escopo reduzido pra caber na capacidade de output do dono. Detalhamento em `docs/design/section-architecture.md`.

Alternativas rejeitadas: (a) preservar Hero/TechStack/Experience/Projects/Contact do site atual — falha ADR 0001; (b) clonar aihero.dev fielmente (Workshops, Cohorts, Events, Skills catalog) — Omar não produz esses formatos; (c) modelo minimalista extremo (single-page + link pro GitHub) — não sustenta Authority Platform. O modelo escolhido preserva as *primitivas* estruturais do aihero.dev (Writing feed, Work feed, no-About, contact-in-footer, agent-first surfaces) mas descarta as camadas de produto pago que dependem de infraestrutura que Omar não tem.

**Trade-off aceito:** a home no dia 1 vai parecer com um blog vazio até o primeiro Post sair. Empty states elegantes (§12 do `visual-direction.md`) mitigam mas não removem o problema. Se em 60 dias não houver 1 Post publicado, revisitar ADR 0001 e este ADR juntos — a estrutura só faz sentido se o output existir.

Direção visual associada: "Editorial Dark, Warm Accent" (Instrument Serif / Inter / JetBrains Mono, `#0e0d0b` fundo, `#e6a24a` acento único). Detalhada em `docs/design/visual-direction.md`. Não é ADR separado — é derivada desta decisão estrutural e pode ser recalibrada sem afetar o contrato de conteúdo.
