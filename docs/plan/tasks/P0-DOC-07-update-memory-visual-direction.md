---
id: P0-DOC-07
title: Update memory project-visual-direction (Brittany + monkeytype hybrid)
category: DOC
priority: P0
estimate_hours: 0.5
depends_on: [P0-DOC-05]
blocks: []
status: pending
---

# P0-DOC-07 — Update memory file for visual direction

## Context

The memory file `~/.claude/projects/-home-ohmar-tai-Documents-DEV-PortfolioDev8/memory/project_visual_direction.md` currently records "base monkeytype + Spider-Verse graffiti accents" (dated 2026-09-17). After ADR 0006, this is wrong — Spider-Verse graffiti is explicitly rejected. The memory must be updated to reflect the Brittany-structure + monkeytype-accents hybrid.

**References:**
- `docs/adr/0006-visual-direction-brittany-monkeytype-hybrid.md` (post P0-DOC-05)
- `~/.claude/projects/-home-ohmar-tai-Documents-DEV-PortfolioDev8/memory/project_visual_direction.md`
- `~/.claude/projects/-home-ohmar-tai-Documents-DEV-PortfolioDev8/memory/MEMORY.md`

## Inputs

**Files to read:**
- `~/.claude/projects/-home-ohmar-tai-Documents-DEV-PortfolioDev8/memory/project_visual_direction.md`
- `docs/adr/0006-visual-direction-brittany-monkeytype-hybrid.md`

## Outputs

**Files to modify:**
- `~/.claude/projects/-home-ohmar-tai-Documents-DEV-PortfolioDev8/memory/project_visual_direction.md` — rewrite body with the Brittany + monkeytype hybrid rule
- `~/.claude/projects/-home-ohmar-tai-Documents-DEV-PortfolioDev8/memory/MEMORY.md` — update the one-line hook for this memory

## Implementation steps

1. Read the current memory file.
2. Rewrite the body:
   - Frontmatter `description`: "Base Brittany Chiang (sidebar fixa, navy #0a192f) + accents monkeytype (yellow #e2b714, Roboto Mono). Zero Spider-Verse."
   - Body: lead with the rule, then **Why:** (ADR 0006, 2026-10-08 decision after hybrid visual comparison), then **How to apply:** (dark navy base, yellow accent on CTA/chip/link, cursor pisca in wordmark as single creative accent, zero graffiti/halftone/glitch).
3. Update MEMORY.md one-line hook to match new description.
4. No commit (memories are outside the repo anyway).

## Verification

```bash
grep "monkeytype" ~/.claude/projects/-home-ohmar-tai-Documents-DEV-PortfolioDev8/memory/project_visual_direction.md
# expected: present
grep -c "Spider-Verse" ~/.claude/projects/-home-ohmar-tai-Documents-DEV-PortfolioDev8/memory/project_visual_direction.md
# expected: 1 (only in rejection clause)
grep "Brittany" ~/.claude/projects/-home-ohmar-tai-Documents-DEV-PortfolioDev8/memory/project_visual_direction.md
# expected: present
```

## Non-goals

- Do NOT delete the memory — update it in place.
- Do NOT modify other memory files.

## Open questions

None.
