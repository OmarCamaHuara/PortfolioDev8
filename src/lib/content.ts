import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export type ContentKind = 'writing' | 'work';

export type PostType = 'post' | 'note' | 'deep-dive';

export type PostMeta = {
  slug: string;
  title: string;
  type: PostType;
  publishedAt: string;
  updatedAt?: string;
  lang: 'pt-BR' | 'en';
  description?: string;
  tags?: string[];
  readingMinutes: number;
};

export type Post = PostMeta & {
  source: string;
};

const CONTENT_ROOT = path.join(process.cwd(), 'content');

async function listMdxFiles(kind: ContentKind): Promise<string[]> {
  const dir = path.join(CONTENT_ROOT, kind);
  try {
    const entries = await fs.readdir(dir);
    return entries.filter((f) => f.endsWith('.mdx'));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw err;
  }
}

async function readPost(kind: ContentKind, filename: string): Promise<Post> {
  const filepath = path.join(CONTENT_ROOT, kind, filename);
  const raw = await fs.readFile(filepath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  const slug = filename.replace(/\.mdx$/, '');

  return {
    slug: data.slug ?? slug,
    title: data.title,
    type: data.type ?? 'post',
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt,
    lang: data.lang ?? 'pt-BR',
    description: data.description,
    tags: data.tags,
    readingMinutes: Math.ceil(stats.minutes),
    source: content,
  };
}

export async function getAllPosts(kind: ContentKind): Promise<PostMeta[]> {
  const files = await listMdxFiles(kind);
  const posts = await Promise.all(files.map((f) => readPost(kind, f)));
  return posts
    .map(({ source: _source, ...meta }) => meta)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function getPost(
  kind: ContentKind,
  slug: string
): Promise<Post | null> {
  const files = await listMdxFiles(kind);
  const match = files.find((f) => f === `${slug}.mdx`);
  if (!match) return null;
  return readPost(kind, match);
}

export async function getRawSource(
  kind: ContentKind,
  slug: string
): Promise<string | null> {
  const filepath = path.join(CONTENT_ROOT, kind, `${slug}.mdx`);
  try {
    return await fs.readFile(filepath, 'utf-8');
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw err;
  }
}
