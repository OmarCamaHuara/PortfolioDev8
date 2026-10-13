import styles from './StackChip.module.scss';

type StackChipProps = {
  label: string;
  active?: boolean;
};

export default function StackChip({ label, active = false }: StackChipProps) {
  return (
    <span className={`${styles.chip} ${active ? styles.active : ''}`}>
      {label}
    </span>
  );
}
