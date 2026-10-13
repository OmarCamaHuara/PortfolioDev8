'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo/Logo';
import styles from './Nav.module.scss';

const links = [
  { href: '/writing', label: 'Artigos' },
  { href: '/work', label: 'Projetos' },
  { href: '/labs', label: 'Labs' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [open]);

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={`${styles.wordmark} no-underline`} aria-label="ohmar_tai — início">
          <Logo size="md" />
        </Link>

        <div className={styles.navRight}>
          <nav className={styles.desktopLinks} aria-label="Navegação Principal">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="no-underline">
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/trabalhe-comigo"
            className={styles.openToWork}
            aria-label="Disponível para contratação. Clique para detalhes."
          >
            <span className={styles.pulseDot} aria-hidden="true" />
            Disponível
          </Link>

          <button
            className={styles.menuButton}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className={styles.mobileSheet}>
          <nav aria-label="Navegação Mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="no-underline"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

