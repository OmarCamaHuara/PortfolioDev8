---
id: P2-CONTENT-03
title: Project Write-up — hiria_pro (pulls from public GH README)
category: CONTENT
priority: P2
estimate_hours: 2
depends_on: [P0-DOC-01]
blocks: []
status: pending
---

# P2-CONTENT-03 — Project Write-up: hiria_pro

## Context

`hiria_pro` is a public Python project in Omar's GitHub described as "Application management and planning for interview and CV generation". Highly relevant to the current moment (meta-project built during the job search itself). Write-up frames it as evidence of: self-tooling for job search, Python competency, AI integration for CV generation. Pulls content from the public GH README.

**References:**
- https://github.com/OmarCamaHuara/hiria_pro (public)
- `CONTEXT.md` § Project Write-up

## Inputs

**Files to read:**
- README of `hiria_pro` on GitHub (fetch via `gh repo view OmarCamaHuara/hiria_pro --json description,...` or clone)

## Outputs

**Files to create:**
- `content/work/hiria-pro.mdx`

## Implementation steps

1. Clone or fetch the README of `hiria_pro` to understand the current scope.
2. Create `content/work/hiria-pro.mdx`:
   ```mdx
   ---
   title: "hiria_pro — self-tooling for the job search"
   type: project
   publishedAt: 2026-10-29
   lang: en
   description: "Python tool for application management and CV generation. The meta-project I built because I needed it myself."
   tags: [python, llm, cv, job-search]
   stack: [Python, LLM API, CLI]
   demoUrl: null
   githubUrl: "https://github.com/OmarCamaHuara/hiria_pro"
   ---

   ## Problem

   Job search is a tracking problem disguised as a motivation problem. I was
   losing applications in Excel sheets and copy-pasting CV variants for
   each role. Not a technical difficulty — just a lossy workflow.

   ## Decision

   Built hiria_pro as a Python CLI with [AI integration for X / template-based
   CV generation / local storage with Y]. Deliberately NOT a web app — the
   workflow lives in the terminal because that's where I live.

   [Expand with the actual tool capabilities.]

   ## Trade-off

   [What was explicitly cut: multi-user support? Browser UI? OAuth? Keep
   the single-user single-machine assumption until there's a reason to
   generalize.]

   ## Result

   [How it's used now: N applications tracked, N CVs generated. Any
   insight from using it — like what categories of role convert best.]

   The repo is public and used personally — contributions welcome if someone
   wants to adapt the templates for another market.
   ```
3. Target 900-1500 words.
4. Confirm every detail against the public README; do not invent features.
5. No commit.

## Verification

```bash
test -f content/work/hiria-pro.mdx && echo OK
grep -c "hiria_pro" content/work/hiria-pro.mdx
# expected: >=1
grep -c "https://github.com/OmarCamaHuara/hiria_pro" content/work/hiria-pro.mdx
# expected: >=1
npm run build
# expected: /work shows new project; /work/hiria-pro renders
```

## Non-goals

- Do NOT invent features not present in the repo.
- Do NOT describe it as production software for others. It's a self-tool.
- Do NOT commit.

## Open questions

- Fetch and read the actual README before writing. Interview user if README is sparse.
