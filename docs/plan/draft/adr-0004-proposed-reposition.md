# 0004 — Reposicionar como AI engineer backend-first para remoto US/EU

Em 2026-10-08, com o dono (Omar) entrando em janela ativa de busca de emprego com horizonte confortável (6+ meses, mercado remoto internacional US/EU), o positioning registrado no ADR 0001 ("AI-fluent backend engineer" como plataforma de autoridade sem público específico) e o pivô temporário pra creator/influencer YouTube (memória `project-target-audience`, 2026-09-17) deixam de servir. Nova audiência prioritária: engineering managers e recrutadores técnicos de empresas US/EU contratando **AI engineer / LLM engineer / AI-adjacent backend sênior**.

Decisão: positioning oficial passa a ser **"AI engineer with senior backend background"**. O eixo Java/Spring/Oracle/Philips deixa de ser headline e vira **prova de que o dono entrega sistemas de produção reais** (contraste contra o AI engineer-só-demo). Labs de IA (RAG, MCP, agents) viram headline — construídos como artefatos funcionais com código aberto, não descrições. Rota `/hire-me` + CTA permanente no Nav endereçam a camada de conversão. Estudos AWS Solutions Architect ficam enquadrados como **"formalizing cloud knowledge I already use in production"**, nunca como "estou aprendendo" — a diferença de framing é inegociável pra senioridade.

**Trade-off aceito:** o site precisa carregar duas camadas simultâneas por 6+ meses — a camada "hire me" (prioridade visual alta, mas chata de construir e inútil depois) e a camada "authority platform" do ADR 0001 (que continua valendo como motor de credibilidade). Risco: o layer hire-me pode fazer o site parecer desesperado se o conteúdo não acompanhar. Mitigação: layer hire-me é um botão + uma página, não domina a Home. Quando a vaga fechar, remover CTA e `/hire-me` em um PR único retorna o site pro modo authority platform puro.

**Supersede parcial de:** ADR 0001 (positioning é refinado, não revogado — authority platform continua, agora com público nomeado) e memória `project-target-audience` 2026-09-17 (pivô creator YouTube é revogado — audiência volta a ser técnica, mas enterprise-saúde fica fora: alvo agora é AI engineering US/EU).

**Fica rejeitado:** (a) positioning puro "AWS Solutions Architect em formação" — sinaliza júnior pra vaga sênior; (b) positioning puro "creator YouTube" — mata o pipeline de vaga enquanto a busca estiver ativa; (c) usar Philips/sistemas médicos como headline — está desalinhado com o nicho US/EU de AI engineering.

Ver: `docs/adr/0005-language-policy-en-primary.md` (consequência direta), `CONTEXT.md` (updated), `docs/perfil_llm.public.md` (fonte canônica derivada).
