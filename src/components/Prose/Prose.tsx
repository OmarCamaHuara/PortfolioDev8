import styles from './Prose.module.scss';

export default function Prose({ children }: { children: React.ReactNode }) {
  return <article className={styles.prose}>{children}</article>;
}
