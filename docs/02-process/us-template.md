# Template de User Story

> Copiar este template para `docs/us/M?/US-M?-??-<slug>.md` ao criar uma US nova.
> Manter TODAS as seções — se alguma não se aplica, escrever "N/A" com justificativa.

```markdown
# US-M?-?? — <Título curto e acionável>

**Milestone:** M? — <nome>
**Status:** ⬜ não iniciada
**Estimativa:** <1h | 2h | 3h>
**Dependências:** <IDs de US que precisam estar ✅, ou "nenhuma">

## Contexto / Motivação

<Por que esta US existe. Que problema resolve, que valor entrega. 2–4 frases.>

## Escopo

**Inclui:**
- <item>

**NÃO inclui (explícito):**
- <item que alguém poderia achar que entra, mas não entra>

## Critérios de aceite

- [ ] <comportamento observável 1>
- [ ] <comportamento observável 2>

## Passos de implementação

> Roteiro para a sessão (com ou sem IA):

1. <passo concreto — ex.: "criar componente X em src/components/X.tsx seguindo o padrão de src/components/Hero/">
2. <passo>
3. <passo>

## Arquivos afetados

- `caminho/arquivo` — <criar | modificar | remover>

## Plano de verificação

- [ ] <comando — ex.: `npm run build` sem erros>
- [ ] <checagem manual — ex.: "abrir localhost:3000, hover no título → glitch RGB; ativar reduced-motion → sem glitch">

## Definition of Done

- [ ] Critérios de aceite ✔
- [ ] Plano de verificação executado ✔
- [ ] DoD global de `AGENTS.md` ✔
- [ ] Status atualizado no milestone e ROADMAP
- [ ] Commit `US-M?-??: <resumo>` + push

## Notas de execução

<preenchido durante/após a sessão: decisões, desvios do roteiro, pendências geradas>
```

## Boas práticas ao escrever US

- **Pequena de verdade**: se os passos passam de ~10 ou a estimativa de 3h, dividir.
- **Critérios observáveis**: "usuário vê X ao fazer Y", nunca "código refatorado".
- **Passos executáveis**: citar caminhos reais, padrões existentes a copiar e docs de arquitetura relevantes.
- **Verificação honesta**: incluir o caso negativo (fallback, erro, reduced-motion) quando existir.
