import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import Prose from '@/components/Prose/Prose';
import PostMeta from '@/components/PostMeta/PostMeta';
import { getAllPosts, getPost } from '@/lib/content';
import styles from './project.module.scss';

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getAllPosts('work');
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost('work', slug);
  if (!post) return { title: 'Não encontrado' };
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function WorkProject({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPost('work', slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main id="main" className={styles.main}>
        <article className={styles.article}>
          <PostMeta post={post} />
          <h1 className={styles.title}>{post.title}</h1>
          {post.description && (
            <p className={styles.dek}>{post.description}</p>
          )}
          <Prose>
            <MDXRemote source={post.source} />
          </Prose>
        </article>
      </main>
      <Footer />
    </>
  );
}
