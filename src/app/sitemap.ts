import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/content';
import { SITE_URL } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [writing, work] = await Promise.all([
    getAllPosts('writing'),
    getAllPosts('work'),
  ]);

  const staticUrls: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/writing`, lastModified: new Date() },
    { url: `${SITE_URL}/work`, lastModified: new Date() },
    { url: `${SITE_URL}/labs`, lastModified: new Date() },
    { url: `${SITE_URL}/trabalhe-comigo`, lastModified: new Date() },
  ];

  const writingUrls = writing.map((p) => ({
    url: `${SITE_URL}/writing/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.publishedAt),
  }));

  const workUrls = work.map((p) => ({
    url: `${SITE_URL}/work/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.publishedAt),
  }));

  return [...staticUrls, ...writingUrls, ...workUrls];
}
