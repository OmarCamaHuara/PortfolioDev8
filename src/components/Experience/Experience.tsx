'use client';

import { motion } from 'framer-motion';
import styles from './Experience.module.scss';
import { Experience as ExperienceType } from '@/types';

const experiences: ExperienceType[] = [
  {
    id: '1',
    company: 'PHILIPS',
    role: 'Desenvolvedor Backend',
    period: '2022 - Presente',
    description: 'Desenvolvimento de APIs críticas para o setor médico, resolução de desafios complexos e integração de sistemas legados.',
    highlights: [
      'Desenvolvimento de APIs RESTful',
      'Integração de sistemas legados',
      'Melhoria de performance',
    ],
    companyUrl: 'https://www.philips.com',
  },
  {
    id: '2',
    company: 'RECODE PRO',
    role: 'Instrutor de Programação',
    period: '2021 - 2022',
    description: 'Formação de novos desenvolvedores, promovendo um ambiente de aprendizado inclusivo e incentivando a paixão pela tecnologia.',
    highlights: [
      'Ensino de Java e JavaScript',
      'Mentoria de alunos',
      'Trabalho em equipe',
    ],
    companyUrl: 'https://www.rederecode.com.br',
  },
  {
    id: '3',
    company: 'AGSIM SRL',
    role: 'Desenvolvedor',
    period: '2020 - 2021',
    description: 'Contribuição para aprendizado contínuo, versatilidade e adaptabilidade profissional em ambiente desafiador.',
    highlights: [
      'Desenvolvimento backend',
      'Trabalho em equipe',
      'Aprendizado contínuo',
    ],
    companyUrl: 'https://g.co/kgs/DyHgQZe',
  },
];

const Experience = () => {
  return (
    <section className={styles.experience} id="experience">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.label}>Jornada</span>
          <h2 className={styles.title}>Experiência Profissional</h2>
          <p className={styles.subtitle}>
            Uma jornada de aprendizado contínuo e impacto através de grandes oportunidades
          </p>
        </motion.div>

        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={styles.timelineItem}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className={styles.timelineLine}>
                <div className={styles.dot} />
              </div>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.company}>{exp.company}</h3>
                  <span className={styles.period}>{exp.period}</span>
                </div>
                <h4 className={styles.role}>{exp.role}</h4>
                <p className={styles.description}>{exp.description}</p>
                <ul className={styles.highlights}>
                  {exp.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Ver empresa
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;