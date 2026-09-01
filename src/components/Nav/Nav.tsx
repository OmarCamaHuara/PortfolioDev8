'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo/Logo';
import styles from './Nav.module.scss';

const links = [
  { href: '/writing', label: 'Writing' },
  { href: '/work', label: 'Work' },
  { href: '/#subscribe', label: 'Subscribe' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={`${styles.wordmark} no-underline`} aria-label="ohmar_tai — home">
          <Logo size="md" />
        </Link>

        <nav className={styles.desktopLinks} aria-label="Principal">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="no-underline">
              {link.label}
            </Link>
          ))}
        </nav>

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

      {open && (
        <div id="mobile-nav" className={styles.mobileSheet}>
          <nav aria-label="Principal — mobile">
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
