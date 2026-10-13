import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/site';
import { BRANDING } from '@/lib/branding';

const body = `# ${BRANDING.fullName}

> ${BRANDING.tagline} Java 17, Spring Boot,
> hexagonal architecture. LLM/RAG/MCP in production. Open to remote
> US/EU AI engineer roles.

## Writing
- [Writing feed](${SITE_URL}/writing): posts, notes, deep dives
- [RSS](${SITE_URL}/rss.xml)

## Work
- [Project write-ups](${SITE_URL}/work)

## Labs
- [Lab 01 — Semantic search](${SITE_URL}/labs/semantic-search): RAG retrieval over this portfolio.

## Profile
- [Public profile markdown](${SITE_URL}/perfil_llm.public.md)

## Contratação
- [Trabalhe comigo](${SITE_URL}/trabalhe-comigo)
`;

export async function GET() {
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

