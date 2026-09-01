import styles from './GhContributions.module.scss';

type Contribution = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type ApiResponse = {
  total: Record<string, number>;
  contributions: Contribution[];
};

const CELL = 12;
const GAP = 2;
const STRIDE = CELL + GAP;
const DAYS = 7;

const LEVEL_FILL = ['#1a1815', '#4a3a11', '#7a5c15', '#ab7e17', '#e2b714'];

async function fetchContributions(user: string): Promise<ApiResponse | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${user}?y=last`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return (await res.json()) as ApiResponse;
  } catch {
    return null;
  }
}

function toWeeks(contribs: Contribution[]): (Contribution | null)[][] {
  if (contribs.length === 0) return [];
  const first = new Date(contribs[0].date);
  const firstDay = first.getUTCDay();
  const padded: (Contribution | null)[] = Array(firstDay).fill(null);
  const all = padded.concat(contribs);
  const weeks: (Contribution | null)[][] = [];
  for (let i = 0; i < all.length; i += DAYS) {
    weeks.push(all.slice(i, i + DAYS));
  }
  return weeks;
}

type Props = {
  user: string;
};

export default async function GhContributions({ user }: Props) {
  const data = await fetchContributions(user);
  if (!data) return null;

  const weeks = toWeeks(data.contributions);
  const width = weeks.length * STRIDE - GAP;
  const height = DAYS * STRIDE - GAP;
  const total = data.total.lastYear ?? 0;

  return (
    <div className={styles.wrap}>
      <div className={styles.scroller}>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${total} contribuições no último ano no GitHub de ${user}`}
          className={styles.grid}
        >
          {weeks.map((week, wi) =>
            week.map((day, di) => {
              if (!day) return null;
              const x = wi * STRIDE;
              const y = di * STRIDE;
              return (
                <rect
                  key={`${wi}-${di}`}
                  x={x}
                  y={y}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  ry={2}
                  fill={LEVEL_FILL[day.level]}
                >
                  <title>{`${day.date} · ${day.count} contribui${day.count === 1 ? 'ção' : 'ções'}`}</title>
                </rect>
              );
            })
          )}
        </svg>
      </div>

      <p className={styles.footer}>
        <span className={styles.count}>{total.toLocaleString('pt-BR')}</span>{' '}
        contribuições no último ano ·{' '}
        <a
          href={`https://github.com/${user}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          @{user}
        </a>
      </p>
    </div>
  );
}
