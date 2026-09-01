import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import Hero from '@/components/Hero/Hero';
import EmptyState from '@/components/EmptyState/EmptyState';
import SubscribeInline from '@/components/SubscribeInline/SubscribeInline';
import SectionHeading from '@/components/SectionHeading/SectionHeading';
import GhContributions from '@/components/GhContributions/GhContributions';
import styles from './page.module.scss';

const GH_USER = process.env.NEXT_PUBLIC_GITHUB_USER ?? 'OmarCamaHuara';

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />

        <section className={styles.section}>
          <div className={styles.inner}>
            <SectionHeading
              eyebrow="Latest"
              title="Writing"
              href="/writing"
              hrefLabel="Tudo"
            />
            <EmptyState kind="writing" />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <SectionHeading
              eyebrow="Selected"
              title="Work"
              href="/work"
              hrefLabel="Tudo"
            />
            <EmptyState kind="work" />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <SectionHeading eyebrow="Ativo" title="GitHub" />
            <GhContributions user={GH_USER} />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <SectionHeading eyebrow="Agora" title="Onde eu tô" />
            <div className={styles.prose}>
              <p>
                Backend na Philips, mexendo em sistemas médicos que rodam há
                anos e não podem cair. Nas horas restantes: estudando como
                integrar LLMs em código que já existia — não em greenfield de
                demo. As duas coisas se conversam mais do que parece.
              </p>
              <p>
                Também tô construindo este site em público, começando por
                escrever sobre o que aprendi tentando fazer AI-coding parar de
                quebrar coisa aleatória em codebases sérios.
              </p>
            </div>
          </div>
        </section>

        <SubscribeInline />
      </main>
      <Footer />
    </>
  );
}
