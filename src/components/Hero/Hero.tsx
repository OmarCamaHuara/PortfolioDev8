import Link from 'next/link';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.headline}>
          Backend engineer <em>escrevendo em público</em> sobre integrar IA com
          disciplina.
        </h1>

        <p className={styles.dek}>
          Sou o Omar Cama. Trabalho com Java, Spring e sistemas médicos na
          Philips. Aqui publico o que aprendi tentando levar LLMs pra dentro de
          código de produção — sem hype, sem vibe coding.
        </p>

        <div className={styles.cta}>
          <Link href="/writing" className={styles.primary}>
            Ler o que já escrevi
          </Link>
        </div>
      </div>
    </section>
  );
}
