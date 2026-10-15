import styles from './EmptyState.module.scss';

type Kind = 'writing' | 'work';

const copy: Record<Kind, { title: string; body: string }> = {
  writing: {
    title: 'Primeiro artigo em andamento.',
    body:
      'Escrevendo o primeiro post sobre como manter agentes IA de código dentro dos trilhos em bases Java/Spring de produção. Assine o RSS no rodapé para ser notificado.',
  },
  work: {
    title: 'Primeiro projeto sendo documentado.',
    body:
      'Em vez de apenas listar repositórios do GitHub, escrevo narrativas arquiteturais detalhando problemas reais, decisões de design, trade-offs e resultados em produção.',
  },
};

export default function EmptyState({ kind }: { kind: Kind }) {
  const { title, body } = copy[kind];
  return (
    <div className={styles.emptyState}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.body}>{body}</p>
    </div>
  );
}
