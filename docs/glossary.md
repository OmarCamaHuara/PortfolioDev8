# Glossário

| Termo | Significado neste projeto |
|---|---|
| **US (User Story)** | Unidade de trabalho pequena (1–3h), executável em uma sessão, documentada em `us/M?/US-M?-??.md`. |
| **Milestone (M0–M2, M6, M7)** | Agrupamento de US com objetivo próprio. Ver `milestones/ROADMAP.md`. |
| **DoD** | Definition of Done — critérios de aceite da US + checklist global de `AGENTS.md`. |
| **Dual-track** | O produto serve duas audiências (creator/YouTube + dev-for-hire) sem privilegiar uma em detrimento da outra. |
| **Neo-brutalist híbrido** | Linguagem visual: base monkeytype (mono, minimalismo) + acentos comic cirúrgicos (glitch, halftone, hard-shadow). |
| **Camada de acento** | Elementos comic-book usados **1–2 por tela no máximo**. Nunca fundo dominante. |
| **Halftone / Ben-Day dots** | Padrão de pontinhos de impressão de quadrinho — usado só em HUD widget < 300px, nunca como wallpaper. |
| **Glitch RGB** | Aberração cromática vermelho/ciano em hover de título ou transição de rota (≤ 200ms). |
| **Hard shadow** | `box-shadow: 4px 4px 0 var(--fg)` — CTA primário do hero (1 por tela). |
| **Onomatopeia** | SVG texto expressivo ("SHIP IT!") em CTA de conversão. |
| **Content-as-code** | Conteúdo vive em MDX/YAML versionado no repo. Sem CMS, sem banco. |
| **Edge Function / Route Handler** | Endpoints serverless do Next em runtime Edge (baixa latência, custo baixo). Onde IA e contato rodam. |
| **Provider** | Fornecedor de LLM (Anthropic, OpenAI, mock). Trocável via `AI_PROVIDER` sem tocar em código. |
| **Guardrails de injection** | Camada obrigatória de defesa contra prompt injection: sanitização + allow-list + delimitadores + prompt sandwich. |
| **Aprovação humana no pitch** | Pitch por vaga é gerado mas não exibido publicamente sem revisão do Omar por email. |
| **Rate-limit (Upstash Redis)** | 10 msgs/5min por IP no chat, 1 pitch/hora. TTL curto para minimizar retenção de PII. |
| **Modo sem IA** | Quando o teto diário estoura ou o provider falha, UI mostra fallback claro com contato direto — o site nunca quebra por causa da IA. |
| **Agent-first surfaces** | Rotas otimizadas para LLM crawlers: `.md` twins, `llms.txt`, `sitemap.xml`, `rss.xml`. |
| **ADR** | Architecture Decision Record — entrada em `DECISIONS.md` escrita **quando** uma decisão é tomada, não em bloco. |
