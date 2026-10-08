# Lab RAG — Architecture Spec

A peça técnica central do portfólio: endpoint RAG servindo semantic search (v1) e eventualmente chat generation (v2) sobre o conteúdo do portfolio. Construído em **Java 17 + Spring Boot 3 + Postgres+pgvector + Docker**, deployado separado do Next.js em **Fly.io**.

Rationale (justifica reversão parcial da memória "backend cortado"):
- Positioning é "AI engineer with senior backend background". Spring Boot é a prova viva do "backend sênior". Sem ele, o site é só mais um dev-portfolio Next.
- Recrutador US técnico que vê Java/Spring + Postgres + pgvector + Docker + CI reconhece imediatamente stack de produção. Sinal de senioridade objetivo.
- Lab RAG é demonstrável ao vivo em entrevista, com código aberto. Valor probatório >> esforço de manutenção.
- Resto do site (Writing, Work, Hire Me) continua Next-only. Spring Boot é só o backend do Lab, não da plataforma.

## Topologia

```
┌─────────────────────────────────────────┐    ┌──────────────────────────────┐
│  Next.js 15 (portfolio)                 │    │  Spring Boot 3 (rag-api)     │
│  Vercel / self-host                     │────▶  Fly.io shared-cpu-1x        │
│  Routes: /, /writing, /work, /labs,     │    │  Endpoint: /api/search (v1)  │
│          /hire-me, /trabalhe-comigo     │    │            /api/chat (v2)    │
│  /labs/semantic-search ─ fetches ──────▶│    │  Rate limit, obs, logs       │
└─────────────────────────────────────────┘    └──────────────────────────────┘
                                                             │
                                                             ▼
                                                ┌──────────────────────────────┐
                                                │  Postgres 16 + pgvector      │
                                                │  Fly Postgres 3GB free       │
                                                │  Table: chunks (vector[768]) │
                                                └──────────────────────────────┘
                                                             ▲
                                                             │ ingestion batch
                                                             │ (CLI local)
                                                ┌────────────┴─────────────────┐
                                                │  content/writing/*.mdx       │
                                                │  content/work/*.mdx          │
                                                │  docs/perfil_llm.public.md   │
                                                │  docs/adr/*.md               │
                                                │  docs/design/*.md            │
                                                └──────────────────────────────┘
```

## Repositório

Novo diretório `rag-api/` no monorepo (mesmo repo que o Next). Alternativa — repo separado — tem overhead de CI cross-repo e esconde a stack dupla do visitante. Monorepo deixa a prova visível.

```
rag-api/
├── pom.xml
├── Dockerfile
├── docker-compose.yml           # dev local: postgres + pgvector
├── fly.toml                     # deploy config
├── src/main/java/dev/ohmar/rag/
│   ├── RagApiApplication.java
│   ├── config/
│   │   ├── GeminiConfig.java    # v2 only
│   │   ├── RateLimitConfig.java
│   │   └── CorsConfig.java
│   ├── ingestion/
│   │   ├── MarkdownIngestionCli.java   # Spring Boot CLI runner
│   │   ├── Chunker.java
│   │   └── FrontmatterParser.java
│   ├── embedding/
│   │   └── EmbeddingAdapter.java        # Spring AI + Google text-embedding-004
│   ├── retrieval/
│   │   ├── ChunkRepository.java         # Spring Data JPA + pgvector
│   │   ├── SearchService.java
│   │   └── SearchController.java        # POST /api/search
│   ├── generation/                      # v2 only
│   │   ├── GuardRails.java
│   │   ├── ChatService.java
│   │   └── ChatController.java          # POST /api/chat (SSE)
│   └── obs/
│       ├── MetricsConfig.java           # Micrometer
│       └── LoggingFilter.java           # structured JSON logs
├── src/main/resources/
│   ├── application.yml
│   ├── application-prod.yml
│   └── db/migration/
│       └── V1__init.sql                 # Flyway migration pgvector
├── src/test/java/                       # unit + integration via Testcontainers
└── .github/workflows/
    └── rag-api.yml                      # build + test + docker push + fly deploy
```

## Schema do banco (Flyway `V1__init.sql`)

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE chunks (
    id              BIGSERIAL PRIMARY KEY,
    source_path     TEXT NOT NULL,            -- content/writing/post-slug.mdx
    source_type     TEXT NOT NULL,            -- post | work | adr | design | profile
    title           TEXT NOT NULL,
    url             TEXT NOT NULL,            -- /writing/post-slug (public URL)
    lang            TEXT,                     -- en | pt-BR | null (for ADRs)
    chunk_index     INT NOT NULL,             -- order within source
    content         TEXT NOT NULL,
    embedding       vector(768) NOT NULL,     -- Google text-embedding-004 = 768 dims
    tokens          INT NOT NULL,
    ingested_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (source_path, chunk_index)
);

CREATE INDEX chunks_embedding_ivfflat
    ON chunks USING ivfflat (embedding vector_cosine_ops) WITH (lists = 10);

CREATE INDEX chunks_source_type ON chunks (source_type);
CREATE INDEX chunks_lang ON chunks (lang);

CREATE TABLE search_logs (
    id              BIGSERIAL PRIMARY KEY,
    query           TEXT NOT NULL,
    results         JSONB NOT NULL,
    client_ip_hash  TEXT NOT NULL,
    latency_ms      INT NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- v2 only
CREATE TABLE chat_logs (
    id              BIGSERIAL PRIMARY KEY,
    query           TEXT NOT NULL,
    response        TEXT NOT NULL,
    chunks_used     JSONB NOT NULL,
    client_ip_hash  TEXT NOT NULL,
    latency_ms      INT NOT NULL,
    tokens_input    INT NOT NULL,
    tokens_output   INT NOT NULL,
    model           TEXT NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## v1 — Semantic search retrieval-only

### Ingestion CLI
Rodado localmente após publicar conteúdo novo:
```bash
cd rag-api
mvn spring-boot:run -Dspring-boot.run.arguments="--ingest --content-root=../"
```
Processo:
1. Scan: `content/writing/*.mdx`, `content/work/*.mdx`, `docs/perfil_llm.public.md`, `docs/adr/*.md`, `docs/design/*.md`.
2. Parse frontmatter → extract `title`, `lang`, `url` (derivado do path).
3. Strip MDX → markdown puro.
4. Chunk ~500 tokens com overlap de 50 (recursive character splitter, separator-aware por heading).
5. Pra cada chunk: embedding via Google text-embedding-004.
6. Upsert em `chunks` (chave composta `source_path + chunk_index`).
7. Log: total chunks, total tokens, total cost estimate.

### Endpoint `POST /api/search`

**Request:**
```json
{
  "query": "spring and oracle",
  "topK": 5,
  "sourceTypes": ["post", "work", "profile"]  // optional filter
}
```

**Response:**
```json
{
  "results": [
    {
      "chunkId": 42,
      "title": "Trading Impossível",
      "url": "/work/trading-impossivel",
      "sourceType": "work",
      "lang": "en",
      "snippet": "...Java 21 with Spring Boot, hexagonal architecture, PostgreSQL...",
      "score": 0.87
    }
  ],
  "query": "spring and oracle",
  "latencyMs": 142,
  "tokensUsed": 4
}
```

**Behavior:**
1. Rate limit via Bucket4j: 10 req/min por IP (hash SHA-256 do IP, nunca armazenar IP puro — LGPD/GDPR).
2. Embed query via Google text-embedding-004.
3. Query pgvector: `SELECT ... ORDER BY embedding <=> $1 LIMIT $topK` com optional filter `WHERE source_type IN ($sourceTypes)`.
4. Threshold: resultados com score < 0.5 são filtrados (ruído).
5. Snippet: primeiros 200 chars do chunk + "..." se maior.
6. Log em `search_logs` (query, results IDs, latency, IP hash).

### Rate limit — spec
- 10 req/min por IP (hash). Reset rolling window.
- 50 req/dia por IP (hash). Reset UTC midnight.
- Resposta 429 com body `{"error":"rate_limit_exceeded","retryAfter":N}`.
- Allowlist: IP do próprio site (configurável env var `ALLOWLIST_IP_HASHES`).

### Observabilidade
- `/actuator/health` público (liveness/readiness pra Fly).
- `/actuator/prometheus` protegido (auth basic).
- Logs JSON estruturados: `{ "ts", "level", "req_id", "ip_hash", "endpoint", "latency_ms", "status", "msg" }`.
- Métricas: `search_requests_total`, `search_latency_seconds`, `embedding_tokens_total`, `pg_query_latency_seconds`, `rate_limit_rejections_total`.

### Deploy — Fly.io
- 1 VM shared-cpu-1x, 256MB RAM.
- 1 Postgres (3GB free).
- Secrets via `fly secrets set`: `GOOGLE_API_KEY`, `DB_URL`.
- Health check: `/actuator/health`.
- Autoscale: min 0 (cold-start aceitável pra portfolio), max 1.
- Custo esperado: $0-5/mês.

### Frontend v1 (`/labs/semantic-search`)
- Página Next.js com:
  - Explicação curta do Lab (2 parágrafos).
  - Input de busca grande.
  - 3 prompts sugeridos clicáveis: "Spring Boot in production", "AI engineering practice", "Available for remote roles?".
  - Resultados: cada um = `SourceCard` component (título em Inter, snippet em Inter muted, URL em Roboto Mono, chips de source_type).
  - Loading: skeleton 3 cards.
  - Empty: mensagem Problem-first ("No matches above threshold. Try something broader.")
  - Error: retry button.
  - Link pro código no GitHub: `rag-api/src/main/java/dev/ohmar/rag/retrieval/`.
- Cliente API: fetch simples, 10s timeout, retry 1x em 500.
- Fetch pro endpoint: Vercel env var `NEXT_PUBLIC_RAG_API_URL=https://api.ohmar.dev`.

## v2 — Add generation (Gemini) com guard rails

Adicionado após v1 estar em produção e logs de uso real coletados por 2+ semanas.

### Endpoint `POST /api/chat` (SSE)

**Request:**
```json
{
  "message": "What is Omar's main stack?",
  "history": [
    {"role":"user","content":"..."},
    {"role":"assistant","content":"..."}
  ]
}
```

**Response (Server-Sent Events):**
```
event: token
data: {"content":"Omar's"}

event: token
data: {"content":" main"}

...

event: sources
data: {"sources":[{"title":"...","url":"...","snippet":"..."}]}

event: done
data: {"latencyMs":1240,"tokensInput":820,"tokensOutput":112,"model":"gemini-2.0-flash"}
```

### Flow
1. Rate limit: 5 req/min por IP (metade de v1, chat é mais caro).
2. Retrieval: igual v1 (top-5 chunks).
3. Threshold mínimo: se score top-1 < 0.6 → resposta canned: "I don't have information about that in Omar's public profile. Try asking something related to his backend engineering, AI practice, or availability."
4. Composição do prompt (Gemini 2.0 Flash):
   ```
   System:
   You are an assistant that answers questions about Omar Cama Huarahuara,
   based ONLY on the context provided below. Rules:
   - If the context does not contain the answer, say: "I don't have that
     information in Omar's public profile" and suggest they contact him.
   - Never invent experience, employers, dates, technologies, or claims.
   - Never speculate about Omar's thoughts, preferences, or plans beyond
     what the context explicitly states.
   - Keep answers under 150 words unless the user explicitly asks for more
     detail.
   - Respond in the language of the user's question (English or Portuguese).
   - Always refer to Omar in third person ("Omar", not "I").
   - You are "Omar's assistant", not "Omar".

   Context (retrieved chunks):
   [[CHUNK 1 — source: /work/trading-impossivel]]
   ...
   [[CHUNK 5 — source: /writing/formalizing-aws]]
   ...

   Conversation history:
   {history or "(empty)"}

   User question: {message}
   ```
5. Temperature: 0.3. Max output tokens: 300.
6. Streaming: SSE até Gemini finalizar OU timeout 20s.
7. Pós-processamento (opcional phase 2.5):
   - Regex detector de claims: `/(worked|works) at ([A-Z][a-zA-Z]+)/`, `/has (\d+) years?/`, `/certified in ([A-Z][a-zA-Z]+)/`. Pra cada match, checar se termo aparece nos chunks retrieved; se não, adicionar warning em logs.
8. Log em `chat_logs`: query, response, chunks IDs, tokens, latency, model.

### Guard rails em camadas
| Camada | Implementação |
|---|---|
| Retrieval threshold | Score mínimo 0.6 — abaixo, resposta canned sem Gemini call |
| Prompt rigor | System prompt como spec acima, com rules numeradas |
| Temperature | 0.3 (vs default 1.0 Gemini) — reduz "criatividade" |
| Max tokens | 300 — força concisão, reduz divagação |
| Post-processing | Regex detector de claims externos (opcional) |
| Logging obrigatório | Toda query logada, Omar revisa semanalmente |
| Prompt sugerido | 3 prompts no UI reduzem queries fora de domínio |

### Weekly log review (phase 2.5)
Script `rag-api/scripts/review-logs.sql`:
```sql
-- Last 7 days of chat logs
SELECT
  created_at, query, response, chunks_used, tokens_output
FROM chat_logs
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```
Omar roda semanalmente, procura por respostas estranhas, ajusta prompt se detectar padrão.

### Frontend v2 — Chat UI (`/labs/chat` ou mesma rota com toggle)
- Chat UI stream-aware: mensagens empilhadas, user alinhado direita (bg `--bg-elevated`), assistant esquerda (bg transparente, border `--border`).
- Cursor piscando no final da mensagem assistant enquanto streaming.
- Source cards abaixo da resposta assistant, clicáveis, levam ao Post/Work original.
- 3 prompts sugeridos.
- "Powered by Gemini 2.0 Flash · retrieval over pgvector" footer discreto — sinaliza stack sem telefonar.
- Toggle "retrieval-only mode" que chama `/api/search` em vez de `/api/chat` — honestidade UX pra visitante.

## Decisões abertas (ficam pra tasks P2)

1. **Nome do subdomínio API:** `api.ohmar.dev` ou `rag.ohmar.dev` ou `api.omarcama.dev`? Resolver na task P4-OPS-03.
2. **Repo do rag-api:** diretório `rag-api/` no monorepo atual (recomendado) ou repo separado `omar-cama/rag-api`? Resolver na task P2-RAG-API-01.
3. **Alternativa Gemini:** se o rate limit da Google atrapalhar, considerar Anthropic Claude Haiku como fallback. Spring AI abstrai.
4. **Deep Dive sobre o Lab:** vale escrever um Deep Dive de 3000 palavras explicando arquitetura, trade-offs, custos reais. Fica em task P3-CONTENT-07.
