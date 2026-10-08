import Link from 'next/link';
import styles from './LangToggle.module.scss';

type Variant = {
  lang: 'pt-BR' | 'en';
  href: string;
};

type Props = {
  current: 'pt-BR' | 'en';
  variants: Variant[];
};

const displayLabel: Record<Variant['lang'], string> = {
  'pt-BR': 'pt-br',
  en: 'en',
};

export default function LangToggle({ current, variants }: Props) {
  if (variants.length < 2) return null;

  return (
    <nav className={styles.toggle} aria-label="Idioma">
      {variants.map((v) => {
        const active = v.lang === current;
        const content = (
          <>
            <span className={styles.bracket}>[</span>
            <span className={styles.label}>{displayLabel[v.lang]}</span>
            <span className={styles.bracket}>]</span>
          </>
        );
        return active ? (
          <span
            key={v.lang}
            className={`${styles.item} ${styles.active}`}
            aria-current="page"
          >
            {content}
          </span>
        ) : (
          <Link
            key={v.lang}
            href={v.href}
            className={`${styles.item} no-underline`}
          >
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
