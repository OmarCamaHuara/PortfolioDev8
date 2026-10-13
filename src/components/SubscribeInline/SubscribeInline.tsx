import Link from 'next/link';
import { CONTACT_EMAIL } from '@/lib/contact';
import styles from './SubscribeInline.module.scss';

export default function SubscribeInline() {
  return (
    <section id="subscribe" className={styles.subscribe}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Acompanhe os próximos artigos.</h2>
        <p className={styles.body}>
          Sem plataforma de newsletter por enquanto — configurarei uma quando houver leitores suficientes. Por enquanto:{' '}
          <Link href="/rss.xml">assine o RSS</Link> ou envie um e-mail direto{' '}
          <a href={`mailto:${CONTACT_EMAIL}?subject=Inscrever`}>para mim</a>{' '}
          com &ldquo;Inscrever&rdquo; no assunto para ser avisado.
        </p>
      </div>
    </section>
  );
}
