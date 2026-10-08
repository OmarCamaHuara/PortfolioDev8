# Portfolio Domain

Vocabulário ubíquo do site pessoal do Omar Cama enquanto plataforma de conteúdo **e** camada ativa de "hire me" durante a janela de busca de emprego 2026-H2. Este glossário mantém o código, a copy e as decisões estratégicas alinhados. Se um termo divergir na conversa, afiar aqui antes de mandar para produção. Regras de voz, restrições técnicas e definição de "pronto" não moram aqui — moram em ADRs e nos docs de design.

Contexto único: existe apenas este `CONTEXT.md` na raiz.

## Positioning

**Positioning**:
A frase única que o Omar quer que fique na memória do Reader. Hoje: "AI engineer with senior backend background". Toda decisão de conteúdo ou de UI reforça isso ou é peso morto. Antigo "AI-fluent backend engineer" (ADR 0001) foi refinado — agora o público tem nome: engineering manager / recruiter US/EU contratando AI engineer. Ver ADR 0004.
_Avoid_: brand, personal brand, imagem, angle

**Authority Platform**:
A forma pretendida do site como motor de credibilidade: um lugar onde o Reader volta para pegar sinal, não um currículo estático que se lê uma vez. A palavra "platform" carrega peso — o site publica coisas novas de forma contínua. Durante a janela de busca de emprego (2026-H2) convive com a camada [[Hire Me Layer]].
_Avoid_: portfolio, CV site, site pessoal, homepage

**AI engineer backend-first**:
O nicho específico do Omar. Um engineer que **(a)** entrega sistemas de produção reais em Java/Spring/Oracle (base técnica, prova de disciplina) **e (b)** constrói com LLMs/agents/MCP como artefato funcional, não como demo. As duas metades são inseparáveis; o backend sênior é o que distingue o Omar da enxurrada de "AI engineers" que só fizeram tutoriais. Pra audiência US/EU, headline é a metade (b) e a metade (a) é prova.
_Avoid_: AI-fluent backend (ok como legado, mas evitar em copy nova), full-stack, AI enthusiast, dev generalista, prompt engineer

**Hire Me Layer**:
Camada temporária do site ativa durante a janela de busca de emprego: CTA permanente no Nav, rota `/hire-me` (+ variant `/trabalhe-comigo`), email direto exposto, modalidade/stack/timezone explícitos. Quando a vaga fechar, essa camada é removida em um PR único, deixando o site no modo [[Authority Platform]] puro. Ver ADR 0004.
_Avoid_: careers page (impessoal), contratar o Omar (longo), work with me (vago)

## Content Types

**Post**:
Peça escrita curta ou média (aproximadamente 400-1500 palavras) com uma única opinião ou takeaway. Publicada no feed de Writing. A forma default para a maior parte do output do Omar.
_Avoid_: blog post, artigo, entrada

**Deep Dive**:
Escrita técnica longa (2000+ palavras) que vira material de referência. Raro. Quando o Omar linka um Deep Dive como evidência, o Reader precisa achar um recurso — não uma peça promocional.
_Avoid_: tutorial, guia, long read

**Project Write-up**:
Narrativa de algo que o Omar de fato construiu ou entregou, estruturada em problema → decisão → trade-off → resultado. Substitui o "card de projeto" tradicional. É formalmente um Post, mas carrega peso probatório maior — por isso categorizado à parte.
_Avoid_: project card, case study, entrada de portfolio, showcase

**Note**:
Pensamento ou observação curta publicada. Abaixo de ~400 palavras. Não é tutorial, não é evidência — é o Omar pensando em público. Barato de escrever; mantém o site vivo entre peças maiores.
_Avoid_: microblog, status, tweet, thread

**Skill Demo**:
Um artefato — repositório, demo ao vivo, screencast, snippet executável — que prova uma capacidade. Skill Demos são citados A PARTIR DE Posts, Deep Dives ou Project Write-ups. Não aparecem sozinhos; são evidência de apoio.
_Avoid_: projeto, side project, demo, sample

**Lab**:
Experimento técnico publicado como artefato funcional em `/labs/<slug>`, com código aberto no GitHub. Cada Lab é peça probatória auto-contida: tem UI usável, explicação curta do trade-off e link pro código. Labs são a vitrine primária do positioning [[AI engineer backend-first]] — não "futuros projetos", só o que já funciona. Diferença pra [[Skill Demo]]: Skill Demo é citado dentro de uma peça escrita; Lab tem página própria e vida própria.
_Avoid_: playground (muleta de "ainda não terminei"), sandbox, experimentos (plural vago)

## Feeds and Surfaces

**Writing**:
A coleção de Posts + Deep Dives + Notes. O output contínuo do site. Rota em EN: `/writing`.
_Avoid_: blog, news, updates, feed, textos (pt-BR legado)

**Work**:
A coleção curada de Project Write-ups. Explicitamente **não** é a grade de todos os repos do GitHub do Omar. Rota em EN: `/work`.
_Avoid_: portfolio, projects, showcase, gallery, meus projetos, trabalhos (pt-BR legado)

**Labs**:
A coleção de Labs. Rota: `/labs`. Primeira peça: `/labs/semantic-search`.
_Avoid_: experiments, playground, demos

**Hire Me**:
Rota `/hire-me` (EN) + variant `/trabalhe-comigo` (pt-BR). Lista explícita: modalidade (remoto US/EU/BR), stack preferida, tipos de vaga, email direto, LinkedIn, GitHub, timezone. Faixa salarial opcional.
_Avoid_: contato, careers, trabalhe-conosco

## People

**Reader**:
O visitante-alvo do site. Primário durante a janela de busca de emprego: **engineering manager ou recrutador técnico de empresa US/EU** avaliando o Omar como candidato. Secundário: peer técnico brasileiro interessado em backend+IA (motor do Authority Platform). Não é "user" — este site não é um produto com usuários.
_Avoid_: user, visitor, prospect, viewer, cliente, candidato (o candidato é o Omar, não o Reader)

**Omar**:
O dono do site. Fala em primeira pessoa em Posts, Notes e Project Write-ups. É a palavra a usar em código, ADRs e conteúdo interno. Não "author", não "the developer".
_Avoid_: author, developer, dev, the owner, o autor

## Editorial Terms

**Problem-first**:
O movimento de abertura de qualquer Post, Project Write-up ou seção de landing: nomear a dor do Reader antes de nomear a solução. Termo emprestado do aihero.dev (ver `research/aihero-analysis.md`). Aparece nas revisões de copy como shorthand.
_Avoid_: intro-first, background-first, contextualização

**Real Engineering**:
Contraste taquigráfico contra "vibe coding" e conteúdo de IA movido a hype. É a marca do Matt Pocock, usado com parcimônia — no máximo uma vez por Post e só quando o enquadramento próprio do Omar não alcança. Se aparecer em mais de um Post por semana, provavelmente virou muleta.
_Avoid_: production-grade (corporate demais), boas práticas (genérico demais), profissional

**Formalizing**:
Framing default pra qualquer menção aos estudos AWS. **Nunca** escrever "estou aprendendo AWS" ou "learning AWS" — sinaliza júnior. Sempre **"formalizing cloud knowledge I already use in production"** ou variação. A diferença é a mesma entre "estudante" e "profissional em certificação". Ver ADR 0004.
_Avoid_: learning AWS, studying AWS, AWS journey, caminho pra AWS

## Language Policy

**EN primary**:
Idioma primário do site a partir de 2026-10-08 (ADR 0005). Rotas canônicas, Hero, Nav, metadata, `/llms.txt`, `/hire-me` nascem em EN. Metadata e navegação ficam em EN.

**pt-BR variant**:
Posts e Project Write-ups aceitam ambas as línguas via frontmatter `lang`. Sem exigência de paridade — uma peça pode sair só em EN, só em pt-BR, ou em ambas em momentos diferentes. Rota `/trabalhe-comigo` é a variant explícita de `/hire-me` (não é tradução palavra-a-palavra; é a mesma informação adaptada ao mercado pt-BR).
_Avoid_: translation, tradução, i18n, l10n
