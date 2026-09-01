import { NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ohmar-tai.dev';

const body = `# Omar Cama — AI-fluent backend engineer

Backend engineer writing about production systems and pragmatic AI
integration. Bilingual (pt-BR default, EN for AI-focused content).

## Discovery
- Home: ${SITE_URL}/
- Writing feed: ${SITE_URL}/writing (Posts, Notes, Deep Dives)
- Work feed: ${SITE_URL}/work (Project Write-ups)
- Sitemap: ${SITE_URL}/sitemap.xml
- RSS: ${SITE_URL}/rss.xml

## Formats
Every Post and Project Write-up is served as HTML and as raw markdown.
Append \`.md\` to any /writing/<slug> or /work/<slug> URL to fetch
the raw MDX source with \`Content-Type: text/markdown\`.

## Contact
Email: omar.js2023@gmail.com
GitHub: https://github.com/OmarCamaHuara
LinkedIn: https://www.linkedin.com/in/omar-js/
`;

export async function GET() {
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
