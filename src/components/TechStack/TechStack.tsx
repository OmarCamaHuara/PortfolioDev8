'use client';

import { motion } from 'framer-motion';
import styles from './TechStack.module.scss';
import { TechCategory } from '@/types';

const techCategories: TechCategory[] = [
  {
    name: 'Linguagens',
    icon: '💻',
    technologies: [
      { name: 'Java', icon: '/skills/java.svg', level: 'expert' },
      { name: 'JavaScript', icon: '/skills/javascript.svg', level: 'advanced' },
      { name: 'TypeScript', icon: '/skills/typescript.svg', level: 'advanced' },
    ],
  },
  {
    name: 'Frameworks & Backend',
    icon: '⚙️',
    technologies: [
      { name: 'Spring Boot', icon: '/skills/spring-boot.svg', level: 'expert' },
      { name: 'Hibernate', icon: '/skills/hibernate.svg', level: 'expert' },
      { name: 'Apache Camel', icon: '/skills/apacheCamel.svg', level: 'advanced' },
      { name: 'Freemarker', icon: '/skills/freemarker.png', level: 'intermediate' },
    ],
  },
  {
    name: 'Bases de Dados',
    icon: '🗄️',
    technologies: [
      { name: 'SQL Server', icon: '/skills/microsoft-sql-server.svg', level: 'expert' },
      { name: 'PostgreSQL', icon: '/skills/postgresql.svg', level: 'advanced' },
      { name: 'MySQL', icon: '/skills/mysql.svg', level: 'advanced' },
    ],
  },
  {
    name: 'Cloud & DevOps',
    icon: '☁️',
    technologies: [
      { name: 'Azure', icon: '/skills/azure.svg', level: 'advanced' },
      { name: 'Linux', icon: '/skills/linux.svg', level: 'advanced' },
      { name: 'Git', icon: '/skills/github.svg', level: 'expert' },
      { name: 'Docker', icon: '/skills/docker.svg', level: 'intermediate' },
    ],
  },
  {
    name: 'Ferramentas',
    icon: '🛠️',
    technologies: [
      { name: 'IntelliJ IDEA', icon: '/skills/intellij.svg', level: 'expert' },
      { name: 'Visual Studio Code', icon: '/skills/visualSC.svg', level: 'expert' },
      { name: 'Figma', icon: '/skills/figma.svg', level: 'intermediate' },
    ],
  },
];

const levelLabels = {
  expert: 'Expert',
  advanced: 'Advanced',
  intermediate: 'Intermediate',
};

const TechStack = () => {
  return (
    <section className={styles.techStack} id="tech-stack">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.label}>Stack</span>
          <h2 className={styles.title}>Tecnologias & Ferramentas</h2>
          <p className={styles.subtitle}>
            Tecnologias com as quais trabalho para construir soluções robustas
          </p>
        </motion.div>

        <div className={styles.categories}>
          {techCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              className={styles.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <div className={styles.categoryHeader}>
                <span className={styles.categoryIcon}>{category.icon}</span>
                <h3 className={styles.categoryName}>{category.name}</h3>
              </div>

              <div className={styles.techGrid}>
                {category.technologies.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    className={styles.techCard}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: catIndex * 0.1 + techIndex * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={styles.techIcon}>
                      <img src={tech.icon} alt={tech.name} />
                    </div>
                    <span className={styles.techName}>{tech.name}</span>
                    {tech.level && (
                      <span className={`${styles.level} ${styles[tech.level]}`}>
                        {levelLabels[tech.level]}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;