# Portfolio Plan — Omar Cama, 2026-H2

Fonte única de verdade pra execução do redesign do portfólio durante a janela de busca de emprego do Omar (horizonte 6+ meses, mercado remoto US/EU, perfil AI engineer / LLM engineer / AI-adjacent backend sênior).

Este plano é escrito pra ser executado por **outra LLM**, sem acesso ao histórico de chat que o produziu. Cada task em `tasks/` é auto-contida: contexto, inputs, outputs, verificação. Dependências entre tasks são declaradas explicitamente.

## Estado do planejamento

| Dimensão | Decisão | Fonte |
|---|---|---|
| Audiência primária | Engineering manager / recrutador técnico US/EU contratando AI engineer sênior remoto | `draft/adr-0004-proposed-reposition.md` |
| Audiência secundária | Peer técnico brasileiro, comunidade AI engineering | idem |
| Positioning | "AI engineer with senior backend background". Java/Spring/Oracle = prova. Labs IA = headline. | idem |
| Framing AWS | **"Formalizing cloud knowledge I already use in production"**. Nunca "learning AWS". | idem |
| Idioma | EN primário. pt-BR variant por peça via frontmatter `lang`. | `draft/adr-0005-proposed-language.md` |
| Direção visual | **Híbrido: estrutura Brittany Chiang + accents monkeytype (yellow + mono UI)**. Zero graffiti/Spider-Verse. | `design-system.md` |
| Backend | **Reversão parcial** da memória "Next-only": Spring Boot 3 + Postgres+pgvector + Docker viabilizam Lab RAG. Resto do site continua Next-only. | `rag-architecture.md` |
| Lab #01 (v1) | Semantic search retrieval-only (sem geração) sobre portfolio content | `rag-architecture.md` § v1 |
| Lab #01 (v2) | Adiciona geração Gemini com guard rails rigorosos | `rag-architecture.md` § v2 |
| Camada hire-me | Temporária. Rota `/hire-me` + `/trabalhe-comigo` + CTA permanente no Nav. Removida em um PR único quando a vaga fechar. | — |

## Como esta pasta se organiza

```
docs/plan/
├── README.md                    # este arquivo
├── design-system.md             # tokens, type, componentes, layout
├── rag-architecture.md          # Lab RAG v1 + v2 (Spring Boot + pgvector + Gemini)
├── task-template.md             # formato padrão de task card
├── backlog.md                   # lista completa de tasks priorizada
├── draft/                       # specs propostas, pendentes de promoção pra docs/
│   ├── adr-0004-proposed-reposition.md
│   ├── adr-0005-proposed-language.md
│   ├── context-md-proposed.md
│   └── perfil_llm.public.md
└── tasks/                       # task cards individuais, 1 arquivo por task
    └── P0-DOC-01-formalize-adr-0004.md   # exemplo detalhado
```

## Regras de execução

1. **Independência dentro de prioridade.** Tasks com o mesmo prefixo de prioridade (P0, P1, P2, P3, P4) podem rodar em paralelo. Tasks de prioridade N dependem apenas de que tasks P0..P(N-1) estejam concluídas, não entre si.
2. **Task card = contexto completo.** A LLM executora não precisa consultar outras tasks nem o histórico de chat. Links pra ADRs e specs estão no card.
3. **Verificação obrigatória.** Toda task tem seção "Verification" com comandos específicos. Sem verificar, a task não está concluída.
4. **Non-goals explícitos.** Toda task declara o que NÃO está no escopo pra evitar scope creep.
5. **Promoção de draft.** As specs em `draft/` só viram verdade do site via tasks P0-DOC-*. Antes disso elas são proposta.
6. **Memórias Claude Code.** As memórias em `~/.claude/.../memory/` (fora do repo) refletem decisões deste plano. LLM executora que carrega memórias verá positioning novo mesmo antes das tasks P0 rodarem — isso é esperado.

## Interaction protocol — Open questions

Cada task card tem uma seção `## Open questions` ao final. Elas se dividem em dois tipos:

**Tipo A — Precisam de resposta do usuário antes da execução.** Exemplos: email a usar no `/hire-me`, LinkedIn URL slug, status real do Projeto Fênix, domínio final, visibilidade do `trading-mvp`. **A LLM executora NÃO deve inventar nem usar placeholder sem perguntar.**

**Protocolo obrigatório** quando a task carrega Open questions do Tipo A:
1. Antes de começar a implementar, a LLM executora apresenta ao usuário todas as Open questions pendentes **em uma única rodada de perguntas** (não uma por uma, pra respeitar o tempo do Omar).
2. Usa `AskUserQuestion` se disponível, ou lista as perguntas numeradas em uma mensagem de chat.
3. Formato recomendado: `**Antes de executar <ID>, preciso confirmar:**` + lista numerada com opções sugeridas.
4. Aguarda respostas. Só então começa a execução.
5. Documenta as respostas no commit (`<ID>: <subject> — resolved: email=X, linkedin=Y`).

**Tipo B — Notas de ambiguidade já resolvidas.** Exemplos: "pattern list é starting point, revisar em 2 semanas". Essas ficam como anotação histórica, não bloqueiam execução.

Como distinguir: Tipo A tem a forma "Confirm X?" ou "What value for Y?" ou "Decide between A/B/C". Tipo B tem a forma "Note that Z" ou "Review after N".

Se a LLM executora não tem certeza, trata como Tipo A (pergunta). Melhor perguntar e saber do que inventar.

## Resumo da ordem de ataque

- **P0 — Formalize decisions (4-6h total, hoje):** promover ADRs do draft, atualizar CONTEXT.md, escrever ADR 0006 (visual) + ADR 0007 (reversão backend-cortado).
- **P1 — Hire-me layer + design foundation + Hero/Home (1 semana):** rota `/hire-me`, CTA Nav, SCSS tokens, Hero EN, Home seção "Now" EN, llms.txt EN. Site passa a sinalizar busca de emprego.
- **P2 — Lab RAG v1 + Sidebar + Content seed (3-4 semanas):** Spring Boot projeto, retrieval endpoint, UI de busca, Sidebar Brittany-style, 3 Posts/Work seed, deploy Fly.io. Site tem vitrine técnica + sai do EmptyState.
- **P3 — Lab RAG v2 (geração) + content expansion (2-3 semanas):** adiciona endpoint `/api/chat` com Gemini + guard rails, chat UI com streaming, 2 Posts a mais.
- **P4 — Operations & polish (contínuo):** domínio custom, hreflang, fechar PR #5, decisão sobre repos privados.

Ver `backlog.md` pra lista completa de ~45 tasks.
