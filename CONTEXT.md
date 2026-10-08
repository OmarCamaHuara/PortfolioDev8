# Portfolio Domain

Vocabulário ubíquo do site pessoal do Omar Cama enquanto plataforma de conteúdo. Este glossário mantém o código, a copy e as decisões estratégicas alinhados. Se um termo divergir na conversa, afiar aqui antes de mandar para produção. Regras de voz, restrições técnicas e definição de "pronto" não moram aqui — moram em ADRs e nos docs de design.

Contexto único: existe apenas este `CONTEXT.md` na raiz.

## Positioning

**Positioning**:
A frase única que o Omar quer que fique na memória do Reader. Hoje: "AI-fluent backend engineer". Toda decisão de conteúdo ou de UI reforça isso ou é peso morto.
_Avoid_: brand, personal brand, imagem, angle

**Authority Platform**:
A forma pretendida do site: um lugar onde o Reader volta para pegar sinal, não um currículo estático que se lê uma vez. A palavra "platform" carrega peso — o site publica coisas novas de forma contínua.
_Avoid_: portfolio, CV site, site pessoal, homepage

**AI-fluent backend**:
O nicho específico do Omar. Um backend engineer que entrega sistemas de produção (Java/Spring, software médico) E integra LLMs / agents / tooling de IA com disciplina de engenheiro. As duas metades são inseparáveis; conteúdo que fica só em uma delas enfraquece o positioning.
_Avoid_: AI engineer (genérico demais, público errado), full-stack, AI enthusiast, dev generalista

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

## Feeds and Surfaces

**Writing**:
A coleção de Posts + Deep Dives + Notes. O output contínuo do site. Em pt-BR na UI: "Textos".
_Avoid_: blog, news, updates, feed

**Work**:
A coleção curada de Project Write-ups. Explicitamente **não** é a grade de todos os repos do GitHub do Omar. Em pt-BR na UI: "Trabalhos" (não "Projetos" — cheiro de currículo).
_Avoid_: portfolio, projects, showcase, gallery, meus projetos

## People

**Reader**:
O visitante-alvo do site: peer técnico ou engineering manager interessado em backend com integração de IA. Também: comunidade tech brasileira. Não é "user" — este site não é um produto com usuários.
_Avoid_: user, visitor, prospect, viewer, cliente

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

## Language Policy

**pt-BR default**:
Idioma primário do site. Metadata, navegação, Notes e Project Write-ups nascem em pt-BR.

**en variant**:
Deep Dives e Posts focados em IA têm versão em inglês. O público de AI engineering é majoritariamente anglófono. "Variant" (não "translation") — versões em inglês podem sair semanas antes da pt-BR ou vice-versa; paridade estrita não é regra.
_Avoid_: translation, tradução, i18n
