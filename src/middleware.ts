import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const match = pathname.match(/^\/(writing|work)\/(.+)\.md$/);
  if (match) {
    const [, kind, slug] = match;
    const url = request.nextUrl.clone();
    url.pathname = `/api/raw/${kind}/${slug}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/writing/:path*', '/work/:path*'],
};
