# 0007 — Revisão do escopo de backend: Spring Boot aprovado para o Lab RAG

Em 2026-10-08, alinhado ao reposicionamento como "AI engineer backend-first" (ADR 0004), formaliza-se a reversão parcial da decisão de arquitetura anterior (memória `project-backend-scope` de 2026-09-17, que restringia o site a Next-only com Edge Functions). Para comprovar senioridade técnica real em Java e sistemas de produção, aprova-se o desenvolvimento do **Lab RAG (busca semântica e assistente de conteúdo)** em **Spring Boot 3 + Postgres/pgvector + Docker** no subdiretório `rag-api/`.

**Fronteira rígida de escopo:** O backend em Spring Boot existe **exclusivamente** para atender os endpoints da API do Lab RAG (`POST /api/search` em v1 e `POST /api/chat` em v2). Todo o restante da plataforma de conteúdo (feed de Writing, páginas de Work, `/hire-me`, `/llms.txt`, SSR e rotas estáticas) **permanece rigorosamente Next-only**. A aplicação Spring Boot não deve expandir para gerenciar autenticação, CMS ou funções fora do contexto do Lab RAG.

**Supersede parcial de:** Memória `project-backend-scope` (2026-09-17) — revoga-se a proibição absoluta de Java/Spring Boot e Postgres no repositório, restrigindo o uso a um serviço isolado de suporte ao Lab.

Ver: `docs/plan/rag-architecture.md` (especificação de arquitetura do Lab RAG), `docs/adr/0004-reposition-ai-engineer-backend-first.md`.
