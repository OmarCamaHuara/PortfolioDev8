import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import { CONTACT_EMAIL, LINKEDIN_URL, GITHUB_URL } from '@/lib/contact';
import styles from './trabalhe-comigo.module.scss';

export const metadata: Metadata = {
  title: 'Trabalhe comigo · Omar Cama',
  description:
    'Engenheiro backend sênior focado em IA. Disponível para vagas remotas no Brasil e exterior (US/EU). Stack, modalidade, fuso e contato.',
  alternates: {
    canonical: '/trabalhe-comigo',
  },
};

export default function TrabalheComigoPage() {
  return (
    <>
      <Nav />
      <main id="main" className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Trabalhe comigo</h1>
          <p className={styles.lead}>
            Engenheiro backend sênior focado em IA. Disponível para posições remotas no Brasil ou no exterior (US/EU).
          </p>
        </header>

        {/* Seção 1: O que estou procurando */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>O que estou procurando</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Vagas Alvo</div>
              <div className={styles.chips}>
                <span className={styles.chip}>Engenheiro de IA</span>
                <span className={styles.chip}>LLM Engineer</span>
                <span className={styles.chip}>Backend Sênior com IA</span>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Modalidade & Contrato</div>
              <div className={styles.cardBody}>
                Remoto (Brasil / US / EU). PJ, CLT ou contratação direta internacional.
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Fuso Horário</div>
              <div className={styles.cardBody}>
                UTC-3 (São Paulo). Total alinhamento com fuso US East Coast (ET/CT) e boa sobreposição com Europa.
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Duração</div>
              <div className={styles.cardBody}>
                Posições de longo prazo ou contratos contínuos.
              </div>
            </div>
          </div>
        </section>

        {/* Seção 2: Stack que trago */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Stack que trago</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Engenharia Backend</div>
              <div className={styles.chips}>
                <span className={styles.chip}>Java 17</span>
                <span className={styles.chip}>Spring Boot 3</span>
                <span className={styles.chip}>Arquitetura Hexagonal</span>
                <span className={styles.chip}>PostgreSQL</span>
                <span className={styles.chip}>Oracle PL/SQL</span>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Integração com IA & LLM</div>
              <div className={styles.chips}>
                <span className={styles.chip}>Gemini API</span>
                <span className={styles.chip}>OpenAI API</span>
                <span className={styles.chip}>RAG Architecture</span>
                <span className={styles.chip}>pgvector</span>
                <span className={styles.chip}>MCP</span>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Cloud & Infraestrutura</div>
              <div className={styles.chips}>
                <span className={styles.chip}>AWS (Formalizando SAA)</span>
                <span className={styles.chip}>Docker</span>
                <span className={styles.chip}>Kubernetes Básico</span>
                <span className={styles.chip}>GitHub Actions</span>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Ferramentas & Fluxo</div>
              <div className={styles.chips}>
                <span className={styles.chip}>Maven</span>
                <span className={styles.chip}>Git</span>
                <span className={styles.chip}>N8N</span>
                <span className={styles.chip}>DBeaver</span>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 3: O que não procuro */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>O que não procuro</h2>
          <ul className={styles.list}>
            <li className={styles.listItem}>Vagas full-stack com foco pesado em desenvolvimento frontend.</li>
            <li className={styles.listItem}>Contratos curtos ou projetos pontuais com menos de 6 meses.</li>
            <li className={styles.listItem}>Posições que exijam trabalho presencial em tempo integral fora do estado de SP.</li>
          </ul>
        </section>

        {/* Seção 4: Contato */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Contato Direto</h2>
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <span>E-mail:</span>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
            <div className={styles.contactItem}>
              <span>LinkedIn:</span>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                linkedin.com/in/omar-cama-huarahuara
              </a>
            </div>
            <div className={styles.contactItem}>
              <span>GitHub:</span>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                github.com/OmarCamaHuara
              </a>
            </div>
          </div>
        </section>

        {/* Seção 5: Referências & evidências */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Evidências & Projetos</h2>
          <div className={styles.evidenceGrid}>
            <Link href="/work" className={styles.evidenceCard}>
              <div className={styles.evidenceTitle}>Write-ups de Projetos →</div>
              <div className={styles.evidenceDesc}>
                Análises arquiteturais detalhadas de sistemas de produção e plataformas de trading.
              </div>
            </Link>

            <Link href="/labs" className={styles.evidenceCard}>
              <div className={styles.evidenceTitle}>Labs Interativos →</div>
              <div className={styles.evidenceDesc}>
                Demonstrações práticas incluindo a busca semântica RAG do Lab 01 sobre este portfólio.
              </div>
            </Link>

            <Link href="/writing" className={styles.evidenceCard}>
              <div className={styles.evidenceTitle}>Artigos & Textos →</div>
              <div className={styles.evidenceDesc}>
                Construção em público sobre disciplina de engenharia backend e integração de IA.
              </div>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
