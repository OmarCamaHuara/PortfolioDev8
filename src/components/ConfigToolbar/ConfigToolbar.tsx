'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from './ConfigToolbar.module.scss';

type Item = {
  key: string;
  label: string;
};

type Props = {
  paramName: string;
  items: Item[];
  ariaLabel: string;
};

export default function ConfigToolbar({ paramName, items, ariaLabel }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get(paramName) ?? items[0]?.key;

  return (
    <nav className={styles.toolbar} aria-label={ariaLabel}>
      {items.map((item, i) => {
        const isFirst = i === 0;
        const active = current === item.key || (isFirst && !searchParams.get(paramName));
        const params = new URLSearchParams(searchParams.toString());
        if (isFirst) {
          params.delete(paramName);
        } else {
          params.set(paramName, item.key);
        }
        const query = params.toString();
        const href = query ? `${pathname}?${query}` : pathname;

        return (
          <Link
            key={item.key}
            href={href}
            scroll={false}
            className={`${styles.item} no-underline ${active ? styles.active : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            <span className={styles.bracket}>[</span>
            <span className={styles.label}>{item.label}</span>
            <span className={styles.bracket}>]</span>
          </Link>
        );
      })}
    </nav>
  );
}
