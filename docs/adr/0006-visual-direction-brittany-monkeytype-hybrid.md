# 0006 — Direção visual: híbrido estrutura Brittany Chiang + accents monkeytype

Em 2026-10-08, após o pivô de posicionamento para "AI engineer backend-first" (ADR 0004), a direção visual do site é ajustada para alinhar à maturidade e à sobriedade exigidas por contratantes técnicos US/EU. A estrutura principal adota a arquitetura de layout de Brittany Chiang (sidebar fixa a 280px/320px com navegação por seção, fundo dark navy `#0a192f`, grid de cards e timeline de experiência), enquanto a identidade visual técnica e interações se baseiam no monkeytype (accent em amarelo puro `#e2b714`, Roboto Mono em UI técnica e chips de stack, e cursor piscante no wordmark).

**Trade-offs aceitos:** A composição hibridiza a navegação corrida estilo portfolio sênior (Brittany Chiang) com toques de tooling de código (monkeytype), exigindo rigor nos tokens para evitar poluição visual. Mitigação: strict tokenization (Instrument Serif em headlines display, Inter no corpo de texto, Roboto Mono estritamente em metadados/UI técnica). O accent amarelo é mantido como ponto único de contraste visual (Von Restorff effect).

**Fica rejeitado:** (a) Estética Spider-Verse / graffiti / halftone / glitch RGB permitida anteriormente no ADR 0003 — revogada e explicitamente proibidida por passar mensagem antiprofissional; (b) Glassmorphism, gradient mesh e scroll parallax; (c) Barras de porcentagem ou gráficos de habilidades fabricados; (d) Mono-everywhere em corpo de texto.

**Supersede parcial de:** ADR 0003 (substitui o fundo dark genérico e detalhes lúdicos pelo layout navy estruturado de Brittany Chiang, mantendo a paleta amarela e Roboto Mono de UI).

Ver: `docs/plan/design-system.md` (especificação completa do design system), `docs/adr/0004-reposition-ai-engineer-backend-first.md`.
