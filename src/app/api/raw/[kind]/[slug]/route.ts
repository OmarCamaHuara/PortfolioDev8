import { NextResponse } from 'next/server';
import { getRawSource, ContentKind } from '@/lib/content';

const VALID_KINDS: ContentKind[] = ['writing', 'work'];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ kind: string; slug: string }> }
) {
  const { kind, slug } = await params;
  if (!VALID_KINDS.includes(kind as ContentKind)) {
    return new NextResponse('Not found', { status: 404 });
  }
  const source = await getRawSource(kind as ContentKind, slug);
  if (!source) return new NextResponse('Not found', { status: 404 });
  return new NextResponse(source, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
