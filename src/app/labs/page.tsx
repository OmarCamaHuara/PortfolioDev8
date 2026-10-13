import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import PageHeader from '@/components/PageHeader/PageHeader';
import LabCard from '@/components/LabCard/LabCard';
import { LABS } from '@/content/labs';
import styles from './labs.module.scss';

export const metadata: Metadata = {
  title: 'Labs · Omar Cama',
  description:
    'Artefatos funcionais de IA e demonstrações interativas. Código aberto no GitHub.',
};

export default function LabsPage() {
  return (
    <>
      <Nav />
      <main id="main" className={styles.container}>
        <PageHeader
          title="Labs"
          lede="Artefatos funcionais de IA e experimentos de engenharia. Código aberto no GitHub."
        />
        <ul className={styles.grid}>
          {LABS.map((lab) => (
            <li key={lab.slug}>
              <LabCard {...lab} />
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
