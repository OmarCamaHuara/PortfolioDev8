import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import PageHeader from '@/components/PageHeader/PageHeader';
import SemanticSearch from './SemanticSearch';
import styles from './semantic-search.module.scss';

export const metadata: Metadata = {
  title: 'Lab 01 — Semantic Search · Omar Cama',
  description:
    'Top-K RAG retrieval over Omar Cama\'s portfolio using Java 17 + Spring Boot + pgvector + Gemini embeddings.',
};

export default function SemanticSearchPage() {
  return (
    <>
      <Nav />
      <main id="main" className={styles.container}>
        <PageHeader
          title="Lab 01 — Semantic Search"
          lede="Top-K RAG retrieval over this portfolio in Java 17 + pgvector + Gemini."
        />
        <p className={styles.intro}>
          This lab indexes all project write-ups, articles, and public notes into PostgreSQL vector space (`pgvector`). Enter a search query below to retrieve relevant sources with semantic cosine similarity.
        </p>
        <SemanticSearch />
      </main>
      <Footer />
    </>
  );
}
