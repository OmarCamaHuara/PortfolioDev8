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
              eyebrow="Recentes"
              title="Artigos"
              href="/writing"
              hrefLabel="Ver todos"
            />
            <EmptyState kind="writing" />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <SectionHeading
              eyebrow="Destaques"
              title="Projetos"
              href="/work"
              hrefLabel="Ver todos"
            />
            <EmptyState kind="work" />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <SectionHeading eyebrow="Atividade" title="GitHub" />
            <GhContributions user={GH_USER} />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <SectionHeading eyebrow="Agora" title="No que estou trabalhando" />
            <div className={styles.prose}>
              <p>
                Engenheiro backend em produto da área médica (Philips-adjacent), mantendo
                sistemas críticos em produção com Java 17 e Spring Boot. Paralelamente,
                desenvolvendo Lab RAG — busca semântica sobre este portfólio em
                Java + pgvector + Gemini. Formalizando certificação AWS Solutions Architect.
              </p>
              <p>
                Disponível para oportunidades remotas — veja em{' '}
                <a href="/trabalhe-comigo">/trabalhe-comigo</a>.
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
