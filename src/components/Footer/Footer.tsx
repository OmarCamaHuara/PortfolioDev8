import Link from 'next/link';
import styles from './Footer.module.scss';

const OMAR_EMAIL = 'omar.js2023@gmail.com';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Contato</h3>
          <ul>
            <li>
              <a href={`mailto:${OMAR_EMAIL}`}>{OMAR_EMAIL}</a>
            </li>
            <li>
              <a
                href="https://github.com/OmarCamaHuara"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/omar-js/"
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
              <Link href="/writing">Writing</Link>
            </li>
            <li>
              <Link href="/work">Work</Link>
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
        <p>© {year} Omar Cama Huarahuara. Escrevendo daqui.</p>
      </div>
    </footer>
  );
}
