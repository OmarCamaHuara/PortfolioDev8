/**
 * Single source of truth for site configuration, branding, and contact info.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ohmar.dev';

export const CONTACT = {
  email: 'omar.js2023@gmail.com',
  github: 'https://github.com/OmarCamaHuara',
  linkedin: 'https://linkedin.com/in/omar-cama-huarahuara',
  youtube: 'https://youtube.com/@QuERSERSEnior',
} as const;

export const BRANDING = {
  name: 'Omar Cama',
  fullName: 'Omar Cama Huarahuara',
  title: 'Omar Cama — AI engineer com background sênior em backend',
  tagline: 'AI engineer com background sênior em backend.',
  lead: 'Construo e coloco em produção sistemas integrados a LLM com o rigor e disciplina de backend sênior. Formalizando AWS. Disponível para trabalho remoto.',
  description:
    'AI engineer que constrói e coloca em produção sistemas integrados a LLM com o rigor e disciplina de backend sênior. Java 17, Spring Boot, Postgres, RAG, MCP.',
  shortDescription:
    'AI engineer com background sênior em backend focado em LLMs, RAG e sistemas em produção.',
} as const;

export const SITE_CONFIG = {
  url: SITE_URL,
  contact: CONTACT,
  branding: BRANDING,
} as const;
