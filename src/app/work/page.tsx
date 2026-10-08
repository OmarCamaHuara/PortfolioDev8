import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import PageHeader from '@/components/PageHeader/PageHeader';
import PostList from '@/components/PostList/PostList';
import EmptyState from '@/components/EmptyState/EmptyState';
import { getAllPosts } from '@/lib/content';
import styles from './work.module.scss';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Project Write-ups: cada um cobre um projeto real com problema, decisão, trade-off e resultado.',
};

export default async function WorkIndex() {
  const posts = await getAllPosts('work');

  return (
    <>
      <Nav />
      <main id="main" className={styles.main}>
        <PageHeader
          title="Work"
          lede="Cada Project Write-up abaixo cobre um projeto real: qual era o problema, o que decidi, o que trocaria hoje. Sem card de screenshot — só o essencial."
        />

        <section className={styles.content}>
          {posts.length === 0 ? (
            <EmptyState kind="work" />
          ) : (
            <PostList items={posts} basePath="/work" />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
