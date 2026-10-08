# 0003 — Iteração visual: adotar elementos do monkeytype dentro do Editorial Dark

Em 2026-09-01, após ver o redesign v2 rodando (branch `redesign/v2`), o dono pediu incorporar elementos do https://monkeytype.com/: font mais interessante, ícones monoline, gráficos, subtítulos em cinza, toolbar de config com formato `[behavior][input][sound]`, acento amarelo puro, e rebrand pro handle `ohmar_tai`.

Decisão negociada: adotar apenas os elementos que **não** revertem a ADR 0002 nem o `visual-direction.md §1` (que rejeitava terminal-aesthetic mono-em-tudo). Rejeitado explicitamente: substituir Instrument Serif por mono no H1. Aceito: (a) shift do accent de âmbar `#e6a24a` para amarelo monkeytype `#e2b714`; (b) adicionar Roboto Mono como font de UI técnica (nav labels, toolbars, meta, chips) coexistindo com Instrument Serif no H1 e Inter no longform; (c) toolbar `[all][posts][notes][deep-dives]` como filtro real em `/writing` e `[pt-br][en]` como toggle de lang em Post; (d) GitHub contribution heatmap na Home como único chart (dado real, não fabricado); (e) wordmark rebrand para `ohmar_tai` com tratamento tipográfico no underscore (accent yellow ou cursor blink).

**Trade-off aceito:** o site fica mais "misto" — serif editorial + mono técnico + accent amarelo puro — em vez de uma paleta visual monolítica. Risco de leitura visual fragmentada; mitigado pela consistência forte de tokens (um accent, um family por papel). Se o teste em produção mostrar que a mistura confunde em vez de compor, revisitar em ADR 0004 e escolher entre monolítico-editorial ou monolítico-terminal.

**Ficou de fora e continua rejeitado:** mono-everywhere (violaria "terminal aesthetic" do §1); toolbar decorativa sem função (violaria motion policy do §4 e princípio Von Restorff — se tudo é destaque, nada é); charts inventados sobre skills% (violaria §9 anti-pattern 14). Se um dia migrar para direção monolítica, esta ADR fica marcada superseded, não deletada.

Ver: `docs/design/visual-direction.md` (updated para refletir tokens novos), `CONTEXT.md` (Omar continua o termo pra owner; `ohmar_tai` é wordmark, não termo de domínio).
