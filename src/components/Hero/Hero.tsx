import Link from 'next/link';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.headline}>
          AI engineer com<br />
          background sênior em backend.
        </h1>

        <p className={styles.dek}>
          Construo e coloco em produção sistemas integrados a LLM com o rigor e disciplina de backend sênior. Formalizando AWS.
        </p>

        <div className={styles.cta}>
          <Link href="/trabalhe-comigo" className={styles.ctaPrimary}>
            Trabalhe comigo →
          </Link>
          <Link href="/writing" className={styles.ctaSecondary}>
            Ver artigos
          </Link>
        </div>
      </div>
    </section>
  );
}

