# Task Template — final hybrid format

Format: **YAML frontmatter + markdown body** with optional Gherkin Acceptance Criteria section for tasks with multiple verification scenarios.

## Filename

`P<N>-<CATEGORY>-<NN>-<kebab-slug>.md`

Examples: `P0-DOC-01-formalize-adr-0004.md`, `P2-RAG-API-05-retrieval-endpoint.md`.

| Field | Values |
|---|---|
| `P<N>` | P0 (fundações), P1 (hire-me + home), P2 (Lab RAG v1 + UI), P3 (Lab RAG v2 + content), P4 (ops/polish) |
| `<CATEGORY>` | DOC, DESIGN, UI, UI-SHELL, UI-FEED, CONTENT, HIRE, RAG-API, RAG-UI, OPS |
| `<NN>` | Zero-padded sequence within P+CATEGORY |

## Body format

```markdown
---
id: <P<N>-<CATEGORY>-<NN>>
title: <Imperative title>
category: <CATEGORY>
priority: P<N>
estimate_hours: <N>
depends_on: [<task_ids>]  # empty list = none
blocks: [<task_ids>]      # empty list = none
status: pending            # pending | in_progress | done
---

# <ID> — <Imperative title>

## Context

Why this task exists. 2-4 sentences max. Links to specs.

**References:**
- `docs/plan/README.md` § section
- `docs/plan/<spec>.md` § section
- `docs/adr/<N>-*.md` (if applicable)

## Inputs

**Files to read:**
- `<path>` — purpose

**External:**
- API/package/env var (if any)

## Outputs

**Files to create:**
- `<path>`

**Files to modify:**
- `<path>` — specific changes

**Behavior / API contracts (if applicable):**
- <description>

## Implementation steps

1. Specific action
2. Specific action
N. Final action

## Verification

```bash
<command>
# expected: <output>
```

**Manual checks:**
- [ ] <check>

## Acceptance Criteria (OPTIONAL — only when multiple scenarios)

Use Gherkin only when the task has multiple non-trivial verification
scenarios (ex: UI tasks with empty/error/loading/success states).

**Scenario 1: <name>**
```gherkin
Given <precondition>
When <action>
Then <expected outcome>
```

## Non-goals

- Do NOT <X>

## Open questions

- Question (or "None")
```

## Independence rules

- Tasks within the same priority level are independent and can run in parallel.
- A task in priority N depends only on P0..P(N-1) being complete, not on other tasks in priority N.
- When a task truly needs an artifact from a sibling task (same priority), that artifact must be stubbable or mockable.
- `depends_on` is for cross-priority dependencies only.

## Effort scale

| Hours | Characterization |
|---|---|
| 0.5 | Config change, env var, one small file edit |
| 1 | Small feature in 1 component, short ADR, Note MDX |
| 2 | Medium feature, 2-3 files, review design system |
| 3-4 | Large feature, 5+ files, external API integration |
| >4 | Break into sub-tasks |

## Rigid rules

1. Never "etc." — list every item.
2. Never implicit dependencies — all deps in `depends_on`.
3. Verification uses real commands with expected output, not "verify it works".
4. Non-goals required (minimum 1 item).
5. If body >200 lines, probably 2 tasks disguised as 1.
6. All file paths repo-absolute.
7. Side effects declared (new deps, config, `.gitignore` additions).
