---
id: P4-OPS-01
title: Decide — trading-mvp public, forked-curated public, or stay private
category: OPS
priority: P4
estimate_hours: 1
depends_on: [P2-CONTENT-02]
blocks: []
status: pending
---

# P4-OPS-01 — trading-mvp visibility decision

## Context

`trading-mvp` (TradingImpossível) is Omar's strongest personal technical project. Currently private. The Project Write-up (P2-CONTENT-02) stands even without the repo link, but a clickable code artifact is 10x stronger evidence.

**References:**
- `content/work/trading-impossivel.mdx` (post P2-CONTENT-02)
- https://github.com/OmarCamaHuara/trading-mvp (private)

## Inputs

**Needs from user:**
- Decision on visibility.

## Outputs

**Files to modify:**
- `content/work/trading-impossivel.mdx` — update `githubUrl` based on decision
- GitHub repo visibility (via `gh repo edit`)

## Implementation steps

Present 3 options to user and get a decision:

**Option A: Make trading-mvp public now.**
- `gh repo edit OmarCamaHuara/trading-mvp --visibility public`
- Update Write-up with the link.
- Pros: strongest signal. Cons: all code public, including any WIP ideas, API keys (must audit secrets first).

**Option B: Fork into `trading-mvp-public` with curated commits.**
- Create a public fork with squashed history and secret-scanned content.
- Keep original private for ongoing experimentation.
- Pros: safer. Cons: 2x maintenance.

**Option C: Keep private.**
- Write-up links to a 10-min video walkthrough screencast instead.
- Pros: full control. Cons: weaker evidence than code.

Suggested path: Option A with secret audit. Run `gh secret list --app`, `git log -p | grep -i "api[_-]key\|token\|password"` before flipping public.

## Verification

```bash
# If Option A chosen:
gh repo view OmarCamaHuara/trading-mvp --json visibility --jq .visibility
# expected: "PUBLIC"
# And:
grep "githubUrl" content/work/trading-impossivel.mdx
# expected: non-null URL
```

## Non-goals

- Do NOT flip public without secret audit.
- Do NOT commit changes to this plan if Option C.

## Open questions

- Decision from user.
- Any secrets committed historically in trading-mvp?
