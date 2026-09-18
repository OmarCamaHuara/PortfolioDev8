# US-M2-01 — "Minha Jornada" com o CV real em painéis de quadrinho

**Milestone:** M2 — Conteúdo e storytelling do CV
**Status:** ⬜ não iniciada
**Estimativa:** 3h
**Dependências:** US-M1-03

## Contexto / Motivação

A seção atual (`components/workExperiences/WorkExperiences.jsx`) mostra Philips, Recode Pro e AGSIM — desatualizada e divergente do CV oficial. A jornada deve contar a história real como uma HQ: cada experiência é um painel de quadrinho ([content-source.md](../../00-vision/content-source.md)).

## Escopo

**Inclui:**
- Reescrever a seção com os dados canônicos em ordem cronológica inversa: **Premiersoft** (Set/2025–presente, consultor na Philips), **DevLand** (Jan–Abr/2025), **Philips Oncologia** (Jan/2022–Set/2024), **Recode Pro** (Set–Dez/2021).
- Cada experiência em um `ComicPanel`: empresa, cargo, período, 2–4 highlights (versão resumida dos bullets do CV) e tags de tecnologia (sticker).
- Onomatopeias pontuais em conquistas-chave (ex.: "100% de entrega!" na Philips).
- **Confirmar com o Omar** se AGSIM entra na jornada (está no site atual, não está no CV) — registrar a resposta em content-source.md.
- Dados em um módulo local `frontend/content/experiences.js` (preparando a troca por API no M5).

**NÃO inclui:**
- Consumo do backend (US-M5-02); traduções EN/ES (M5).

## Critérios de aceite

- [ ] Jornada mostra as 4 experiências do CV, fiel a datas/cargos/highlights (zero invenção).
- [ ] Painéis com estética comic, animação de entrada (`panelIn`), responsivos.
- [ ] Dados centralizados em `content/experiences.js` (componente sem texto hardcoded).
- [ ] Decisão sobre AGSIM registrada.

## Passos de implementação assistida por IA

1. Perguntar ao Omar sobre AGSIM antes de codar.
2. Criar `frontend/content/experiences.js` copiando fielmente a fonte canônica (estrutura igual à entidade `Experience` do [backend.md](../../01-architecture/backend.md)).
3. Reescrever `WorkExperiences.jsx` usando `ComicPanel`/`SectionHeading`/`Onomatopoeia` e as variantes de motion.
4. Testar responsividade (360px→1440px) e reduced-motion.

## Arquivos afetados

- `frontend/content/experiences.js` — criar
- `frontend/components/workExperiences/*` — reescrever
- `docs/00-vision/content-source.md` — registrar decisão AGSIM

## Plano de verificação

- [ ] Comparação lado a lado com content-source.md: empresas, cargos, datas e highlights idênticos.
- [ ] `npm run dev` visual OK (mobile+desktop); `npm run build` sem erros.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M2-01: ...` + push

## Notas de execução

<preencher na sessão>
