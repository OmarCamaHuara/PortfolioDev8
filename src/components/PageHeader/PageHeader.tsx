import styles from './PageHeader.module.scss';

type Props = {
  title: string;
  lede: string;
};

export default function PageHeader({ title, lede }: Props) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.lede}>{lede}</p>
    </header>
  );
}
