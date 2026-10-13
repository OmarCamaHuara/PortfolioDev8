import styles from './Logo.module.scss';

type Props = {
  size?: 'sm' | 'md';
};

export default function Logo({ size = 'md' }: Props) {
  return (
    <span className={`${styles.logo} ${styles[size]}`}>
      <span className={styles.name} aria-hidden="true">
        ohmar
      </span>
      <span className={styles.underscore} aria-hidden="true">
        _
      </span>
      <span className={styles.name} aria-hidden="true">
        tai
      </span>
      <span className={styles.srOnly}>ohmar_tai</span>
    </span>
  );
}
