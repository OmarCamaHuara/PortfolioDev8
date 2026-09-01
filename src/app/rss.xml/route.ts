import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/content';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://omar-cama.dev';

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const [writing, work] = await Promise.all([
    getAllPosts('writing'),
    getAllPosts('work'),
  ]);

  const items = [...writing.map((p) => ({ p, basePath: '/writing' })), ...work.map((p) => ({ p, basePath: '/work' }))]
    .sort((a, b) => (a.p.publishedAt < b.p.publishedAt ? 1 : -1))
    .map(({ p, basePath }) => {
      const url = `${SITE_URL}${basePath}/${p.slug}`;
      return `    <item>
      <title>${escape(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      ${p.description ? `<description>${escape(p.description)}</description>` : ''}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Omar Cama — Writing</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>AI-fluent backend engineer. Posts, Notes, Deep Dives e Project Write-ups.</description>
    <language>pt-BR</language>
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
