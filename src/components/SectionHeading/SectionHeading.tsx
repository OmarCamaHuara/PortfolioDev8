import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './SectionHeading.module.scss';

type Props = {
  eyebrow: string;
  title: string;
  href?: string;
  hrefLabel?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  href,
  hrefLabel,
}: Props) {
  return (
    <header className={styles.heading}>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.title}>{title}</h2>
      </div>
      {href && hrefLabel && (
        <Link href={href} className={`${styles.link} no-underline`}>
          {hrefLabel}
          <ArrowRight size={16} strokeWidth={1.5} aria-hidden />
        </Link>
      )}
    </header>
  );
}
