import Link from 'next/link';
import { PostMeta } from '@/lib/content';
import styles from './PostList.module.scss';

const typeLabel: Record<PostMeta['type'], string> = {
  post: 'Post',
  'deep-dive': 'Deep Dive',
  note: 'Note',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

type Props = {
  items: PostMeta[];
  basePath: '/writing' | '/work';
};

export default function PostList({ items, basePath }: Props) {
  return (
    <ul className={styles.list}>
      {items.map((post) => (
        <li key={post.slug} className={styles.item}>
          <Link href={`${basePath}/${post.slug}`} className={`${styles.link} no-underline`}>
            <div className={styles.meta}>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span className={styles.type}>{typeLabel[post.type]}</span>
            </div>
            <h3 className={styles.title}>{post.title}</h3>
            {post.description && (
              <p className={styles.description}>{post.description}</p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
