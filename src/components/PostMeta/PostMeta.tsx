import { PostMeta as Meta } from '@/lib/content';
import styles from './PostMeta.module.scss';

const typeLabel: Record<Meta['type'], string> = {
  post: 'Post',
  'deep-dive': 'Deep Dive',
  note: 'Note',
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function PostMeta({ post }: { post: Meta }) {
  return (
    <div className={styles.meta}>
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      <span className={styles.sep}>·</span>
      <span className={styles.type}>{typeLabel[post.type]}</span>
      <span className={styles.sep}>·</span>
      <span>{post.readingMinutes} min de leitura</span>
    </div>
  );
}
