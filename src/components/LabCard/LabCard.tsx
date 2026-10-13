import Link from 'next/link';
import StackChip from '@/components/StackChip/StackChip';
import styles from './LabCard.module.scss';

type LabCardProps = {
  title: string;
  slug: string;
  status: 'live' | 'wip';
  hint: string;
  description: string;
  stack: string[];
};

export default function LabCard({
  title,
  slug,
  status,
  hint,
  description,
  stack,
}: LabCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.head}>
        <h3 className={styles.title}>{title}</h3>
        <span className={`${styles.badge} ${styles[status]}`}>
          {status.toUpperCase()}
        </span>
      </div>
      <p className={styles.hint}>{hint}</p>
      <p className={styles.description}>{description}</p>
      <ul className={styles.chips}>
        {stack.map((item) => (
          <li key={item}>
            <StackChip label={item} />
          </li>
        ))}
      </ul>
      <Link href={`/labs/${slug}`} className={styles.cta}>
        Try it →
      </Link>
    </article>
  );
}
