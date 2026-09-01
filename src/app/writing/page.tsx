import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import PageHeader from '@/components/PageHeader/PageHeader';
import PostList from '@/components/PostList/PostList';
import EmptyState from '@/components/EmptyState/EmptyState';
import SubscribeInline from '@/components/SubscribeInline/SubscribeInline';
import { getAllPosts } from '@/lib/content';
import styles from './writing.module.scss';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Posts, Notes e Deep Dives sobre backend, integração de IA e engenharia de produção honesta.',
};

export default async function WritingIndex() {
  const posts = await getAllPosts('writing');

  return (
    <>
      <Nav />
      <main id="main" className={styles.main}>
        <PageHeader
          title="Writing"
          lede="Posts, Notes e Deep Dives. O que escrevi tentando fazer backend e IA conviverem sem gambiarra."
        />

        <section className={styles.content}>
          {posts.length === 0 ? (
            <EmptyState kind="writing" />
          ) : (
            <PostList items={posts} basePath="/writing" />
          )}
        </section>

        <SubscribeInline />
      </main>
      <Footer />
    </>
  );
}
