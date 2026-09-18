# Processo — Workflow de uma US

> Como executar uma User Story em uma sessão (com ou sem IA), do início ao commit.
> Complementa [`AGENTS.md`](../../AGENTS.md).

## 0. Pré-requisitos da sessão

1. Ler [`AGENTS.md`](../../AGENTS.md) na raiz (contexto + princípios + convenções — inclui `CONSTITUTION` + `SHARED_RULES` fundidos).
2. Consultar [milestones/ROADMAP.md](../milestones/ROADMAP.md): qual milestone está ativo?
3. Escolher a **próxima US** do milestone ativo com dependências satisfeitas.

## 1. Preparação

- Ler a US inteira: escopo, critérios de aceite, passos, verificação.
- Ler os arquivos listados em *Arquivos afetados*.
- Se algo estiver ambíguo ou conflitar com o código atual: **perguntar ao Omar antes de codar** e registrar a resposta em *Notas de execução*.

## 2. Implementação

- Seguir os *Passos de implementação* na ordem — roteiro, não algemas. Desvios justificados são anotados nas *Notas de execução*.
- Respeitar as convenções de [`AGENTS.md`](../../AGENTS.md).
- Escopo é sagrado: melhoria fora do escopo → *Backlog* do milestone.

## 3. Verificação

- Executar o *Plano de verificação* da US (comandos + checagens manuais).
- CI local: `npm run build && npm run lint && npm run typecheck`.
- Confirmar a *Definition of Done* global.
- **Se a US toca UI: abrir no browser e verificar antes de marcar como pronta** — tipo checking não é feature checking.

## 4. Encerramento

1. Atualizar status da US no arquivo do milestone (`⬜ → ✅`) e contador no ROADMAP.
2. Preencher *Notas de execução* na US.
3. Commit: `US-M?-??: <resumo em português>` + push.
4. Última US do milestone? → escrever learning (`learnings/M?.md`).

## Estados de uma US

| Símbolo | Estado |
|---|---|
| ⬜ | não iniciada |
| 🔵 | em andamento |
| ✅ | concluída (DoD completo) |
| ⏸️ | bloqueada (registrar motivo) |
| 🚫 | cancelada (registrar em DECISIONS.md) |

## Regras de ouro

- **Uma US por sessão.** Terminou cedo? Encerrar bem em vez de abrir outra pela metade.
- **Nunca marcar ✅ sem verificação executada.** "Compilou" não é "verificado".
- **Docs desatualizados são bugs**: mudou algo em `01-architecture/`? Atualiza o doc na mesma US.
