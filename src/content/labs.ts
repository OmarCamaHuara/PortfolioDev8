export type Lab = {
  slug: string;
  title: string;
  status: 'live' | 'wip';
  hint: string;
  description: string;
  stack: string[];
};

export const LABS: Lab[] = [
  {
    slug: 'semantic-search',
    title: 'Lab 01 — Semantic Search',
    status: 'live',
    hint: 'Try: "spring and oracle"',
    description:
      'Top-K RAG retrieval over this portfolio. Java 17 + Spring Boot + pgvector + Google text-embedding-004.',
    stack: ['Java 17', 'Spring Boot', 'pgvector', 'Gemini embeddings'],
  },
];
