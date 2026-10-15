import Link from 'next/link';
import { CONTACT_EMAIL, LINKEDIN_URL, GITHUB_URL } from '@/lib/contact';
import styles from './Footer.module.scss';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Contato</h3>
          <ul>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
            <li>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Site</h3>
          <ul>
            <li>
              <Link href="/writing">Artigos</Link>
            </li>
            <li>
              <Link href="/work">Projetos</Link>
            </li>
            <li>
              <Link href="/labs">Labs</Link>
            </li>
            <li>
              <Link href="/trabalhe-comigo">Trabalhe comigo</Link>
            </li>
            <li>
              <Link href="/rss.xml">RSS</Link>
            </li>
            <li>
              <Link href="/llms.txt">llms.txt</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.baseline}>
        <p>© {year} Omar Cama Huarahuara. Escrevendo em público.</p>
      </div>
    </footer>
  );
}

