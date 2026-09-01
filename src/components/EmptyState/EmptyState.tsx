import styles from './EmptyState.module.scss';

type Kind = 'writing' | 'work';

const copy: Record<Kind, { title: string; body: string }> = {
  writing: {
    title: 'Primeiro Post no forno.',
    body:
      'Estou escrevendo o primeiro texto agora. Assunto: como manter um agente de IA dentro dos trilhos num codebase Java/Spring de verdade. Assina o RSS ali no rodapé se quiser saber quando sair.',
  },
  work: {
    title: 'Primeiro Project Write-up saindo.',
    body:
      'Não vou listar todos os repos do GitHub aqui. Vou publicar narrativas de projetos que mostram problema, decisão, trade-off e resultado. O primeiro é sobre integrar LLMs num backend que já existia — sai em breve.',
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
