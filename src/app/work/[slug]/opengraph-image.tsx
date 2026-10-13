import { ImageResponse } from 'next/og';
import { getPost, getAllPosts } from '@/lib/content';
import { BRANDING } from '@/lib/branding';

export const alt = 'Project cover';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  const posts = await getAllPosts('work');
  return posts.map(({ slug }) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost('work', slug);
  const title = post?.title ?? 'Project';
  const description = post?.description;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0a192f',
          padding: '70px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '26px', color: '#e2b714', fontWeight: 700 }}>
            ohmar.dev
          </span>
          <span style={{ fontSize: '26px', color: '#8892b0' }}>/</span>
          <span style={{ fontSize: '26px', color: '#8892b0' }}>work</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '52px',
              fontWeight: 700,
              lineHeight: 1.2,
              color: '#ccd6f6',
              maxWidth: '1040px',
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: '24px',
                color: '#8892b0',
                lineHeight: 1.4,
                maxWidth: '960px',
              }}
            >
              {description}
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #233554',
            paddingTop: '24px',
          }}
        >
          <span style={{ fontSize: '22px', color: '#8892b0' }}>
            {BRANDING.name} · {BRANDING.title}
          </span>
          <span
            style={{
              fontSize: '18px',
              color: '#e2b714',
              border: '1px solid #e2b714',
              padding: '6px 16px',
              borderRadius: '999px',
            }}
          >
            ohmar.dev →
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
