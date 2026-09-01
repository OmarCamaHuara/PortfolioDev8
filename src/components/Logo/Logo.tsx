import styles from './Logo.module.scss';

type Props = {
  size?: 'sm' | 'md';
};

export default function Logo({ size = 'md' }: Props) {
  return (
    <span className={`${styles.logo} ${styles[size]}`} aria-hidden="false">
      <span className={styles.name}>ohmar</span>
      <span className={styles.underscore}>_</span>
      <span className={styles.name}>tai</span>
      <span className={styles.srOnly}>ohmar_tai</span>
    </span>
  );
}
