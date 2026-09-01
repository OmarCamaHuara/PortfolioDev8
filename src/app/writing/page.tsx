import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import PageHeader from '@/components/PageHeader/PageHeader';
import PostList from '@/components/PostList/PostList';
import EmptyState from '@/components/EmptyState/EmptyState';
import SubscribeInline from '@/components/SubscribeInline/SubscribeInline';
import ConfigToolbar from '@/components/ConfigToolbar/ConfigToolbar';
import { getAllPosts, PostType } from '@/lib/content';
import styles from './writing.module.scss';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Posts, Notes e Deep Dives sobre backend, integração de IA e engenharia de produção honesta.',
};

const FILTER_ITEMS = [
  { key: 'all', label: 'all' },
  { key: 'post', label: 'posts' },
  { key: 'note', label: 'notes' },
  { key: 'deep-dive', label: 'deep dives' },
];

const VALID_TYPES: PostType[] = ['post', 'note', 'deep-dive'];

export default async function WritingIndex({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const all = await getAllPosts('writing');
  const filtered =
    type && VALID_TYPES.includes(type as PostType)
      ? all.filter((p) => p.type === type)
      : all;

  return (
    <>
      <Nav />
      <main id="main" className={styles.main}>
        <PageHeader
          title="Writing"
          lede="Posts, Notes e Deep Dives. O que escrevi tentando fazer backend e IA conviverem sem gambiarra."
        />

        <div className={styles.toolbarWrap}>
          <ConfigToolbar
            paramName="type"
            items={FILTER_ITEMS}
            ariaLabel="Filtrar por tipo"
          />
        </div>

        <section className={styles.content}>
          {filtered.length === 0 ? (
            <EmptyState kind="writing" />
          ) : (
            <PostList items={filtered} basePath="/writing" />
          )}
        </section>

        <SubscribeInline />
      </main>
      <Footer />
    </>
  );
}
