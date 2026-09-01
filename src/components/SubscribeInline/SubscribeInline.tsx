import Link from 'next/link';
import styles from './SubscribeInline.module.scss';

const OMAR_EMAIL = 'omar.js2023@gmail.com';

export default function SubscribeInline() {
  return (
    <section id="subscribe" className={styles.subscribe}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Fica de olho no próximo texto.</h2>
        <p className={styles.body}>
          Newsletter ainda não tem — vou montar quando tiver leitores o
          bastante pra justificar. Por enquanto:{' '}
          <Link href="/rss.xml">assina o RSS</Link> ou manda um mail direto{' '}
          <a href={`mailto:${OMAR_EMAIL}?subject=Subscribe`}>pra mim</a>{' '}
          com &ldquo;Subscribe&rdquo; no assunto que eu te aviso.
        </p>
      </div>
    </section>
  );
}
