---
id: P2-CONTENT-02
title: Project Write-up — TradingImpossível (text-only, no repo link if still private)
category: CONTENT
priority: P2
estimate_hours: 3
depends_on: [P0-DOC-01]
blocks: [P4-OPS-01]
status: pending
---

# P2-CONTENT-02 — Project Write-up: TradingImpossível

## Context

TradingImpossível (repo `trading-mvp`, currently private) is one of Omar's strongest personal projects: AI-assisted paper trading platform in Java 21 + Spring Boot + Next.js, actively developed. It's the headline Project Write-up for the AI engineer backend-first positioning. Written in the problem → decision → trade-off → result structure from CONTEXT.md.

**References:**
- `CONTEXT.md` § Project Write-up (format)
- `docs/perfil_llm.public.md` § Personal projects (summary line)
- GitHub repo (if public) at https://github.com/OmarCamaHuara/trading-mvp

## Inputs

**Files to read:**
- `docs/perfil_llm.public.md`
- Repo README (if accessible)

**Needs from user:**
- Short interview on: the actual problem the project solves, the architecture decisions made, concrete trade-offs encountered, measurable results if any (uptime, backtest P&L, latency etc.).
- Decision on repo visibility (P4-OPS-01 — if private stays private, link is replaced with "repo private — happy to walk through in interview").

## Outputs

**Files to create:**
- `content/work/trading-impossivel.mdx`

## Implementation steps

1. Interview the user (via comments or Open Questions) to capture:
   - The problem: what inefficiency in trading does this address?
   - Why AI-assisted vs. fully automated?
   - Why Java 21/Spring Boot and not Python?
   - What's the biggest architecture decision made and why?
   - Any measurable result (backtest returns, uptime, data processed)?
2. Create `content/work/trading-impossivel.mdx`:
   ```mdx
   ---
   title: "TradingImpossível — AI-assisted paper trading platform"
   type: project
   publishedAt: 2026-10-22
   lang: en
   description: "Java 21 + Spring Boot + Next.js. Why AI-assisted, not autonomous. The architecture call I regret and the one I don't."
   tags: [java, spring-boot, trading, ai]
   stack: [Java 21, Spring Boot, Next.js, PostgreSQL]
   demoUrl: null
   githubUrl: null  # if private, keep null; if public, add URL
   ---

   ## Problem

   [2-3 paragraphs: the actual trading problem being solved — not "I wanted
   to learn trading" but the structural inefficiency the platform addresses.]

   ## Decision

   [2-3 paragraphs: architecture choices — Java 21 over Python, AI-assisted
   over fully autonomous, resilient architecture choices.]

   ## Trade-off

   [1-2 paragraphs: the explicit trade-off accepted. Example:
   "Choosing Spring Boot bought me enterprise reliability but cost me the
   speed of Python's ML ecosystem. For the strategies I'm testing, the
   trade is right — ML is at inference, not training."]

   ## Result

   [1-2 paragraphs: measurable outcomes. If no production outcomes yet,
   state honestly: "In active development. Current state: X backtested
   strategies pass, Y failed, Z pending. First live paper trade
   expected M."]
   ```
3. Target 1200-1800 words.
4. If repo is private per P4-OPS-01, add a note at the bottom:
   > The repo is currently private. Happy to walk through the code in an interview — reach out via `/hire-me`.
5. No commit.

## Verification

```bash
test -f content/work/trading-impossivel.mdx && echo OK
grep -c "problem\|Problem" content/work/trading-impossivel.mdx
# expected: >=1
grep -c "trade-off\|Trade-off" content/work/trading-impossivel.mdx
# expected: >=1
wc -w content/work/trading-impossivel.mdx
# expected: 1000-2000
npm run build
# expected: /work shows new project; /work/trading-impossivel renders
```

## Non-goals

- Do NOT fabricate measurable results. If no production numbers, say so.
- Do NOT describe this as a tutorial or how-to.
- Do NOT include proprietary trading algorithms if any.
- Do NOT commit.

## Open questions

- Interview user for the 4 bullets above (problem, decisions, trade-offs, results).
- Confirm repo visibility decision (depends on P4-OPS-01).
