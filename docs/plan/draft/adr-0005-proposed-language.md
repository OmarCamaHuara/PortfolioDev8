# 0005 — Idioma: EN primário, pt-BR como variant por peça

Em 2026-10-08, consequência direta do ADR 0004: com audiência prioritária em recrutador/eng manager US/EU, a Language Policy original do `CONTEXT.md` ("pt-BR default; en variant só pra Deep Dives e Posts de IA") inverte. Site passa a ser **English-first**: rotas canônicas, Hero, Nav, metadata, `/llms.txt`, `/hire-me` nascem em EN. Posts e Project Write-ups aceitam ambas as línguas via frontmatter `lang`, sem exigência de paridade — uma peça pode sair só em EN, só em pt-BR, ou em ambas em momentos diferentes.

**Trade-off aceito:** perde-se parte da fricção zero com a audiência pt-BR do YouTube `QuER SER SEnior` (ADR 0001 contava com ela como primeiro público). Mitigação: rota `/trabalhe-comigo` (pt-BR variant de `/hire-me`), Posts específicos de carreira em pt-BR, e metadata do Post identifica lang pro feed. Risco secundário: SEO internacional exige `hreflang` correto e sitemap bilíngue — adicionar no sprint seguinte, não bloqueia esta ADR.

**Fica rejeitado:** (a) EN only — mataria audiência pt-BR acumulada e fecha porta pra oportunidades em pt-BR (mercado freelance remoto brasileiro); (b) pt-BR primário com `/en` espelhado — SEO ruim e sinal confuso pro recrutador US que cai no `/` primeiro; (c) idioma automático por geolocalização — anti-pattern UX, prende o leitor em uma versão.

**Supersede:** seção `## Language Policy` do `CONTEXT.md` (precisa ser reescrita como parte deste sprint).
