# DECISIONS — Architecture Decision Records

> **Regra:** um ADR é escrito **quando** a decisão é tomada, com data real do dia da decisão.
> Nunca em bloco, nunca antecipado. Se a decisão ainda está em aberto, não vira ADR — vira issue.
> Formato mínimo: contexto, opções consideradas, decisão, consequências.

## D-001 — Portfolio segue estratégia dual-track (creator + dev-for-hire), não CV puro

**Data:** 2026-09-17
**Status:** Aceito

### Contexto

Até 2026-07 o portfolio era planejado como "CV virtual" focado em recrutador enterprise de saúde. Em 2026-09-17 o Omar sinalizou pivô da marca `ohmar_tai` para creator/influencer YouTube, mas não quer queimar o track dev-for-hire.

### Opções consideradas

1. **100% creator** — home vira link em bio pro canal, `/work` sai.
2. **100% recrutador** (proposta original) — CV virtual, sem sinal de creator.
3. **Dual-track** — home creator-first + `/work` e `/cv` visíveis para recrutador.

### Decisão

Dual-track. Home creator-first, mas rotas `/work` e `/cv` mantidas com peso secundário (linkadas no header/footer, não escondidas).

### Consequências

- `content-source.md` extraído do CV Java Backend deixa de ser fonte canônica do posicionamento. Vira contexto para MDX novo em `content/work/` e `content/cv.mdx`.
- Estética precisa expressar personalidade (creator) sem sacrificar rigor (dev). Dispara D-002.
- Copy da home é escrita para o visitante do canal, não pro recrutador — recrutador é servido por rotas dedicadas.

---

## D-002 — Estética híbrida neo-brutalist (base monkeytype + acentos comic cirúrgicos)

**Data:** 2026-09-17
**Status:** Aceito

### Contexto

`main` já mergeou uma v2 monkeytype minimalista (mono-color, terminal-like). O PR #5 originalmente propôs redesign Spider-Verse puro (neon, halftone dominante, mascote). Dois designs em contradição no mesmo repo.

### Opções consideradas

1. **Manter monkeytype puro** — descarta trabalho de arte comic; esconde personalidade do Omar (que gosta de graffiti).
2. **Migrar para Spider-Verse puro** — reverte v2; alto risco de leitura infantil pra parte da audiência dev-for-hire.
3. **Híbrido cirúrgico** — base mono + acentos comic pontuais.

### Decisão

Híbrido. Camada base = monkeytype (obrigatória, 95%+ dos pixels). Camada de acento = elementos comic (glitch RGB, halftone HUD, hard-shadow, onomatopeia SVG) em 1–2 pontos por tela, cirúrgicos. Linguagem: **neo-brutalist** (tendência 2026 já documentada em [Setproduct](https://www.setproduct.com/blog/retro-brutalist-ui-design-2026)).

### Consequências

- Design system reescrito com paleta híbrida: warm-black da v2 + apenas 2 acentos hot/cool (não a paleta neon Spider-Verse inteira).
- Regra explícita: nunca mais de 2 acentos por tela. Camada base funciona sem acentos.
- Fontes: mono como base (JetBrains Mono/Berkeley Mono) + 1 comic accent (Rubik Glitch/Bangers) com `font-display: optional`.
- US-M1-07 (graffitis originais) cancelada como bloqueante — vai pro backlog.
- Spider-Bot mascote (US-M6-07) cortado — puxa demais pro lado infantil.

---

## D-003 — Sem backend Java. Stack Next-only + Edge Functions.

**Data:** 2026-09-17
**Status:** Aceito

### Contexto

Proposta original: monorepo Next + Spring Boot 3 hexagonal + Postgres + Flyway + JWT + admin CRUD + multi-provider LLM (48 US, ~6 meses solo). Conteúdo profissional cabe em ~10 arquivos MDX.

### Opções consideradas

1. **Manter backend Spring como proposto** — vitrine técnica robusta; custo: cold-start em free-tier, 6+ meses de trabalho, redundância vs MDX.
2. **Backend em repo separado** — Spring como case dedicado (github.com/OmarCamaHuara/portfolio-api).
3. **Cortar backend** — Next-only + MDX + Route Handlers Edge para chat/pitch.

### Decisão

Cortar (opção 3). Se demanda por vitrine técnica backend justificar, será tratado como **repositório separado** no futuro, não como parte deste portfolio.

### Consequências

- Milestones M3, M4, M5 (backend, admin, integração backend) removidos do ROADMAP — 19 US deletadas.
- Chat = Route Handler Edge (Vercel AI SDK + Anthropic).
- Contato = Route Handler Node (Resend/Postmark), fim do EmailJS com chave no cliente (US-M0-06).
- Rate-limit + cache = Upstash Redis (free tier no primeiro ano).
- Deploy = Vercel monolito, fim do "deploy backend + banco".

---

## D-004 — Zero PII pessoal no repositório público

**Data:** 2026-09-17
**Status:** Aceito

### Contexto

`docs/00-vision/content-source.md` e o PDF `CV_Omar_BackendJava.pdf` (introduzidos no PR #5) expõem telefone, email pessoal e endereço no repo público. Contato original do site também era via EmailJS com chave hardcoded no cliente.

### Decisão

Nenhum arquivo do repo pode conter PII pessoal (telefone, email pessoal, endereço). Contato = linkedin público + formulário serverless. `content-source.md` e o PDF foram removidos no commit `docs: cortar backend Java, Spider-Verse puro e PII do plano`. História será reescrita antes do merge do PR para garantir que essa PII não sobreviva no `git log`.

### Consequências

- Force-push no branch do PR para eliminar do histórico.
- CV público (`/cv`) é HTML acessível — não PDF baixado.
- PDF opcional gerado sob demanda por Route Handler, sem PII (só linkedin + email profissional configurável em env).
