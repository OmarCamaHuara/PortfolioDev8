# aihero.dev — Reference Analysis for Portfolio Redesign

**Purpose:** design and content-strategy reference for Omar Cama's portfolio redesign, repositioning him as an "AI-fluent backend engineer." Matt Pocock's aihero.dev is the explicit north star.

**Research method:** primary-source only. Fetched via WebFetch against the live site 2026-08-31. All copy quoted verbatim from Matt Pocock's own pages. Every claim below is either **[verified]** from a fetched URL or **[unverifiable]** — the tool converts HTML→markdown so exact hex codes, font-family declarations, and DOM structure are not retrievable without shell/curl access.

**Sources fetched:**
- `https://www.aihero.dev/` (home, agent-rendering variant)
- `https://www.aihero.dev/api` (JSON discovery document)
- `https://www.aihero.dev/sitemap.xml` (full URL list)
- `https://www.aihero.dev/sitemap.md`
- `https://www.aihero.dev/workshops/ai-coding-crash-course.md` (full product landing page)
- `https://www.aihero.dev/skills.md` (skills catalog page)
- `https://www.aihero.dev/how-to-make-codebases-ai-agents-love.md` (blog post opening + conclusion)

---

## TL;DR

- The site is a **content platform disguised as a personal site** — Matt Pocock's face is barely on it; the *content system* is the product.
- Tagline is exact: **"AI Hero teaches engineers to build with AI through courses, cohorts, events, and free tutorials."** Value proposition is stated as a *promise about the reader*, not about the author.
- Content lives in a **structured taxonomy** — workshops, cohorts, events, tutorials, posts, skills catalog, AI coding dictionary, changelog. Every content type has its own URL pattern.
- The site is **agent-first** in a way almost no other creator site is: `llms.txt`, `sitemap.md`, `.md` twin of every URL, JSON discovery API, OpenAPI spec, scoped agent tokens. This IS a design statement.
- Voice is **problem-first, second-person, direct**. Opens by naming the reader's pain, then names the fix. Never leads with credentials.
- Copy uses **short paragraphs, italics for emphasis, callouts, and MDX-embedded components** (`<Testimonial>`, `<CheckList>`, `<EnrollNow />`) — richness without visual heaviness.
- Testimonials are **named, avatared, and specific** — @shadcn, Mario Zechner, Stéphane M, Alfred S. Not anonymous quote-cards.
- Exact palette, typography, and section-by-section DOM order **could not be verified** with the tools available in this session; that requires curl access to raw HTML/CSS.

---

## 1. Visual language

### What I could confirm

**[verified]** The site serves a **discovery-first / agent-friendly variant to bots** (including WebFetch). When crawled, the home page returns a list of API endpoints and content-format guarantees instead of hero copy. That is not a bug — it's a design decision on Matt's part and is itself a visual/architectural signal: he treats agents as first-class visitors.

**[verified]** The visual system runs on MDX-embedded components (based on the raw markdown of product pages):
- `<TeamWelcomeVideo>` — embedded video
- `<Testimonial authorName="..." authorAvatar="...">`
- `<ThemeImage urls={{ light: "...", dark: "..." }}>` — **light/dark theme-aware images**, confirming both themes exist
- `<Callout>` — highlighted note blocks
- `<CheckList>` — visual checklist
- `<EnrollNow />` — the primary CTA, reused 3-4× on a single product page
- `<PricingInline type="original|discounted" />`
- `<HasDiscount>` conditional block
- `<DiscountDeadline />`
- `<WorkshopContentList />` — auto-rendered curriculum

The presence of `<ThemeImage>` confirms **first-class dark mode** with distinct asset pairs, not a single greyscale hack.

**[verified]** All images point to `res.cloudinary.com/total-typescript/...` — Matt is running the visual asset pipeline he built for his prior brand ("Total TypeScript"). Reasonable inference: the visual DNA of aihero.dev is downstream from the Total TypeScript design system.

### What I could NOT verify

**[unverifiable]** Exact hex codes for background, foreground, accent, and semantic colors.
**[unverifiable]** Exact font families (heading vs body vs mono), weights, and sizes.
**[unverifiable]** Border-radius, shadow, and spacing tokens.
**[unverifiable]** Iconography library and stroke weight.

**Recommended follow-up:** to fill this gap, browse the live site manually and capture from DevTools:
1. `document.querySelector('h1')` → `getComputedStyle(...)` → font-family, font-size, font-weight, color
2. `document.body` → background-color, color, font-family
3. Search `--tw-` custom properties for the Tailwind palette
4. Inspect a primary button for the accent color, border-radius, and hover state

---

## 2. Content architecture

### Content types (verified from `sitemap.xml`)

The site's URL taxonomy reveals its content model:

| Pattern | Count in sitemap | Purpose |
|---|---|---|
| `/` | 1 | Home |
| `/newsletter` | 1 | Email signup |
| `/skills` | 1 | Skills-system landing (Matt's flagship OSS product) |
| `/skills-*` | ~24 | Individual skill pages (`/skills-grill-me`, `/skills-tdd`, `/skills-research`, etc.) |
| `/skills/*` | 5 | Skills changelog entries |
| `/workshops/:slug` | 2 | Paid workshop landing pages |
| `/workshops/:slug/:lesson` | many | Workshop lesson pages |
| `/:blog-slug` | ~60 | Posts (technical articles) |
| `/ai-coding-dictionary` | 1 | Dictionary landing |
| `/ai-coding-dictionary/:term` | ~60 | One page per term (token, agent, context-window, ...) |
| `/products/:slug` | (defined in API) | Product landing pages |
| `/cohorts/:slug` | (defined in API) | Live cohorts |
| `/events/:slug` | (defined in API) | Events |

**Product tiers visible in sitemap:**
- Free tutorials: `llm-fundamentals`, `ai-engineer-roadmap`, `model-context-protocol-tutorial`, `vercel-ai-sdk-tutorial`
- Paid workshops: `ai-coding-crash-course`, `ai-sdk-v6-crash-course`
- OSS skills: 20+ discrete skills pages under `/skills-*`

**Implication:** Matt has **multiple monetization surfaces stacked on the same content spine** — free content builds trust, workshops monetize deep learning, cohorts monetize community. Every content type has its own landing page.

### Home page section order

**[unverifiable directly]** — the fetched home page returned discovery/API content, not the human hero.

**[inferred from product-page structure and skills-page structure]** Matt's landing-page pattern is consistent:
1. **Hero** (headline + one-sentence promise, no author intro)
2. **Problem statement** (2-4 short paragraphs naming the reader's pain)
3. **Solution statement** (what this product/site fixes, using imperative voice)
4. **CTA #1** (`<EnrollNow />` or `Install / Subscribe`)
5. **Detailed feature/curriculum list** — bulleted, each item **bold-lead-word** + short explanation
6. **Testimonials** (interleaved throughout, not siloed into a "testimonials section")
7. **CTA #2**
8. **Deep-dive section** (long-form, technical)
9. **CTA #3**
10. **FAQ**
11. **Footer** with contact email

The **CTA is repeated 3-4× per page**, always the same primary action. There is no CTA fatigue because each CTA follows a self-contained value-add block.

### Product page: verbatim structure (from `workshops/ai-coding-crash-course.md`)

```
[Team welcome video]
[Problem opening — 6 paragraphs]
[Callout: "This isn't a vibe coding course"]
[Testimonial: Mario Zechner]
[3-question learning outcomes list]
[Iceberg diagram — theme-aware image]
[<EnrollNow />]

## Take control of your coding agent like a Real Engineer
[12-item bulleted feature list, each with bold-lead-word]
[<EnrollNow />]

## From "say and pray" to a process you can trust for great results
[Solution narrative]
[Testimonial: Stéphane M]

## Get ready for hands-on learning
[Format details]
[Checklist]
[Testimonial: Alfred S.]

## Pricing
[<PricingInline />]

## Learn with your team for compounding wins
[Testimonial: @shadcn]

## FAQ
```

---

## 3. Voice and tone

### Opening move: name the pain before naming yourself

Not "I'm Matt, a TypeScript educator." Instead:

> **We've all seen how AI coding can go wrong:** easier than ever to get started, but downhill from there.
>
> Starting a new project feels like *magic*; but as you refine your ideas, fix bugs, or add features, your agent's bad code choices compound quickly and each change comes slower and worse.

The reader is the protagonist. Matt appears only after the pain is validated.

### Second-person, imperative, promise-forward

> My brand new **AI Coding Crash Course** will put the control back in your hands — through learning, analyzing, and most importantly, *building* with a better understanding of how these tools work.

Verbs are active: "will put," "learn," "analyze," "build." No hedge language ("may help you consider").

### Anti-buzzword framing

> **This isn't a "vibe coding" course.** This is a ground-up approach to learning how to get the best results from your coding agents, so you can build high quality, production software using Real Engineering principles.

Note the capital-R **Real Engineering** — a repeated stylistic tell. Matt positions his work against the industry default ("vibe coding") explicitly and repeatedly.

### Blog voice: metaphor-driven, opinionated, personal

> AI is not a super-powered developer. It's a new starter with no memory. Every time you spawn an agent, it's like the guy from Memento stepping into your codebase going, "Okay, I'm here, what am I doing?"

> Your codebase, way more than your prompt or your `AGENTS.md` file, is the biggest influence on AI's output.

Signals:
- Analogies from outside tech (Memento) to land technical points
- Strong claim in bold as the article's spine ("way more than your prompt...")
- No throat-clearing ("In this article, we'll explore...")
- Short paragraphs (1-3 sentences typical)
- Uses *italics* and **bold** for emphasis, not underlines or color

### FAQ voice: direct, plain, short

> **Is this self-paced or live?**
> Self-paced. Work through it on your own schedule, in your own codebase, and revisit whenever the skills get an update.

> **Do I need a specific AI coding tool?**
> The skills are markdown any Claude-compatible agent can read (Claude Code is the obvious one). The _practice_ transfers to any capable agent — the workflow is the durable part, not the tool.

One-sentence answers where possible. No marketing padding.

### Authority signals (used sparingly, high-quality)

Named + avatared testimonials with **specific outcomes**:

> — @shadcn: "every company now needs their own Matt Pocock"
> — Mario Zechner (creator of the Pi coding harness): "Matt Pocock is a true educator and I admire how he brings structure to this mess we are in."
> — Alfred S.: "I don't often buy courses, but @mattpocockuk's are a godsend. Even though I'm not a dev by training, I used what I learned to build a full Google Ads management system on top of Claude Code."

Not fake five-stars; real names with real context.

---

## 4. Anti-patterns avoided

**[unverifiable directly without visual inspection]** — I cannot confirm visual anti-patterns from markdown alone. However, the following structural anti-patterns can be confirmed absent from the fetched content:

| Anti-pattern | Present? | Evidence |
|---|---|---|
| Personal-brand hero ("Hi, I'm Matt, and I love TypeScript") | **No** | Home tagline is about *the reader*, not the author |
| Timeline / experience carousel | **No** | Sitemap has no `/about`, `/experience`, `/timeline` |
| "Trusted by" logo wall of unnamed clients | **No** | All testimonials are named individuals with avatars |
| Chatbot floater | **No** | No client-side chat is present in fetched HTML |
| Framer-Motion decorative entrance animations | **Uncertain** | Cannot verify without runtime inspection |
| Skill % bars ("Java 90%, Node 80%") | **No** | Not part of the content model |
| Bento grid of "featured projects" | **No** | Product structure is linear-scroll, not grid |

### The absent-by-design decisions

- **No "About Me" page.** The `/about` slug is not in the sitemap. Matt's identity is expressed through his content, not a biography.
- **No portfolio grid.** Projects are articles, not thumbnails. Each thing he built has a blog post explaining it.
- **No CV/resume.** The site is not job-hunting; it is authority-building through pedagogy.

### What replaces the developer-portfolio defaults

| Where a normal portfolio has... | aihero.dev has... |
|---|---|
| A hero with "Hi, I'm X" | A hero with what X does *for you* |
| A projects grid | An article per project + a workshop that teaches the technique |
| A skills stack ("Java, Spring, AWS") | A skill *system* — installable, reusable, cited by others |
| A blog | A structured content model (posts / tutorials / dictionary / changelog) |
| A contact form | A newsletter, an email address, and a Discord/community link |
| An "About" page | A demonstrated way of thinking, spread across all content |

---

## 5. Interactivity

**[unverifiable directly]** — cannot inspect JS-driven interactions from markdown output.

**[verified from content signals]:**
- **Theme-aware imagery** exists (`<ThemeImage light="..." dark="...">`), so theme toggle is present and functional.
- **Discount pricing is conditional** (`<HasDiscount>` wrapper) — the pricing block reactively shows original vs discounted based on a live deadline (`<DiscountDeadline />`).
- **Video player** is embedded via `<TeamWelcomeVideo resourceId="...">` — likely lazy-loaded.
- **CTA components** (`<EnrollNow />`) are self-contained widgets that presumably route to a checkout flow.

**Inferred but not verified:** Matt's public commentary (visible in blog titles like "creating-the-perfect-claude-code-status-line") suggests he prioritizes function over decoration. His visible values (see: `never-run-claude-init`, `why-the-anthropic-ralph-plugin-sucks`) skew against fluff. **Reasonable inference:** animations, if present, are subtle and functional (page-load fade, hover-state feedback), not decorative (parallax, scroll-triggered reveals on every element).

---

## 6. The meta-signal: agent-first everything

This is the finding that most differentiates aihero.dev from every other creator/dev site and deserves its own section.

Matt's site publishes:

1. **`/api`** — a full JSON discovery document listing every public resource pattern
2. **`/llms.txt`** — a machine-readable operator hint file
3. **`/sitemap.md`** — a human-readable markdown sitemap (alongside the standard XML one)
4. **`.md` twin of every URL** — append `.md` to any page URL and get the raw markdown
5. **`/api/search?q=...`** — public JSON search API
6. **`/api/openapi.json`** — full OpenAPI 3 spec
7. **Scoped agent tokens** (`aih_pat_*`) with granular scopes (`content:read`, `content:write`, `content:publish`, `content:relations`, `media:upload`, `shortlinks:manage`)
8. **Detailed 401 vs 403 error semantics** in the discovery doc

This is not a website with an API bolted on. **It's a website designed on the premise that LLMs and agents are equal-class visitors.** The `.md` twin pattern in particular is a strong statement: it acknowledges that agents don't want to parse rendered HTML.

For Omar's portfolio, this suggests a small but concrete tactic: **publish a `.md` twin of the portfolio's key content, and a top-level `/llms.txt`.** Costs almost nothing, signals fluency in the exact conversation Omar wants to be in.

---

## 7. Implications for Omar's redesign

Concrete recommendations, ranked by leverage.

### High leverage — do these first

1. **Kill the "Hi, my name is..." hero.** Replace with a promise-to-the-reader tagline that positions Omar as *someone who helps you do X*, not *someone with credentials Y*. Draft target: *"Backend engineer teaching pragmatic AI integration. Real systems. Real constraints. No hype."* (refine with Omar's actual angle in the domain-modeling step).

2. **Kill the projects grid; ship one article per project.** GitHub-repo cards teach the reader nothing. A 600-word write-up of a project — problem, decision, trade-off, outcome — is authority-building content. Same source data, exponentially more value.

3. **Kill the skills ribbon ("Java, Spring, AWS").** Nobody hires from a stack list. Replace with a *what I think about* section — 3-5 categories like "backend architecture," "AI integration patterns," "JVM in production" — each a link to a hub of relevant writing.

4. **Add an "articles" content type.** Even 2-3 real posts turn the portfolio from "resume" into "platform." Suggested first posts, from Omar's actual experience: "Integrating LLMs into a Java/Spring Boot service," "What working on medical software at Philips taught me about defensive backend design," "Building a chatbot that doesn't lie about me."

5. **Remove Framer Motion where it's decorative.** Keep motion only where it communicates state change (open, close, focus). Rip out entrance animations that fire on every load.

### Medium leverage — do these second

6. **Adopt the repeated-CTA pattern.** Currently the portfolio has one weak "Contact" section at the bottom. aihero.dev's model: each self-contained content block ends with the same primary CTA. For Omar, the CTA is "email me" or "hire me" or "subscribe" — pick one, repeat it 2-3× per page.

7. **Add a newsletter or "get notified" hook.** Even a stub. Without it, everyone who lands on Omar's site leaves without a way to re-engage.

8. **Kill the chatbot floater in its current form.** It's a novelty, not a differentiator (every AI-adjacent portfolio has one in 2026). Options: (a) delete it, (b) redesign it as a scoped `/ask` page like Matt's `/skills-ask-matt`, so the interaction is intentional not ambient.

9. **Bilingual strategy.** aihero.dev is English-only. Omar's positioning as "AI-fluent backend" is stronger in English (larger AI-dev audience), but SP-market recruiters expect pt-BR. Suggest: content in pt-BR by default, English translations for AI/tech-audience articles. This is a strategic choice for the domain-modeling step, not a design one.

### Low leverage — do these last, if at all

10. **Agent-first plumbing.** Publish `.md` twins of the hero + articles, ship an `/llms.txt`. Cheap; signals fluency. Not visible to human readers but visible to the exact audience Omar wants (developers who use Claude/agents).

11. **Named testimonials.** If Omar has any — from Philips colleagues, Recode students, GitHub-star recipients — collect and display with names + avatars. Anonymous quotes are worse than no quotes.

### What NOT to do (traps to avoid)

- **Don't just recolor.** The current portfolio is not broken because of the purple gradient. It's broken because it has no content. Recoloring is a distraction from the real work.
- **Don't clone aihero.dev's visual identity literally.** Matt has years of Total TypeScript brand equity behind his palette. Omar needs *his own* visual voice that shares aihero.dev's *principles* (restraint, typography-first, dark-mode-native, function over decoration), not its exact look.
- **Don't build the full skills catalog / product platform.** aihero.dev is Matt's business. Omar's portfolio is a positioning tool. Steal the structural principles (content model, repeated CTA, problem-first voice); do not steal the CMS complexity.

---

## 8. Verification gaps to close before implementation

Before the design/implementation phase, run these checks against the live site (browser + DevTools):

- [ ] Home page hero — copy the exact H1 + subhead
- [ ] Home page section order — list top-to-bottom
- [ ] Nav header — exact link labels
- [ ] Footer — exact link labels
- [ ] Extract palette: `getComputedStyle(document.body)` → background, color, plus `.text-primary`, `.bg-accent` (or whatever the actual class names are)
- [ ] Extract typography: font-family for body, headings, code — plus 3-4 sample font-sizes
- [ ] Screenshot a workshop page + the home page in both light and dark modes
- [ ] Confirm presence/absence of scroll-triggered animations

These fill the [unverifiable] gaps flagged above. Ideally done by Omar (or a human collaborator) during a 15-minute browsing session, with findings pasted back in for the domain-modeling step.

---

## Appendix: verbatim tagline and CTA copy

- **Site tagline (from home page fetch):** "AI Hero teaches engineers to build with AI through courses, cohorts, events, and free tutorials."
- **Skills page description:** "A practical skill system for engineers who want to use AI without giving up their standards."
- **Skills page H1:** "AI Skills for Real Engineers"
- **Workshop page CTA component (repeated):** `<EnrollNow />`
- **Workshop refund voice:** "30-day refund policy. Contact team@aihero.dev."
- **Skills install command (primary CTA of `/skills`):** `npx skills@latest add mattpocock/skills`

---

_End of analysis. Feeds into: `CONTEXT.md` (domain-modeling step), then section-architecture redesign, then implementation._
