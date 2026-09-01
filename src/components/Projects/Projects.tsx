'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Projects.module.scss';
import { Project } from '@/types';

const fallbackProjects: Project[] = [
  {
    id: '1',
    name: 'portfolio-dev',
    description: 'Portfólio pessoal desenvolvido com Next.js, React e TypeScript',
    techStack: ['Next.js', 'TypeScript', 'Framer Motion', 'SASS'],
    githubUrl: 'https://github.com/omar-cama/portfolio',
  },
  {
    id: '2',
    name: 'api-rest-spring',
    description: 'API RESTful com Spring Boot, Hibernate e SQL Server',
    techStack: ['Java', 'Spring Boot', 'Hibernate', 'SQL Server'],
    githubUrl: 'https://github.com/omar-cama/api-spring',
  },
  {
    id: '3',
    name: 'ecommerce-integration',
    description: 'Integração com API do Mercado Livre para gerenciamento de produtos',
    techStack: ['Java', 'Apache Camel', 'REST API'],
    githubUrl: 'https://github.com/omar-cama/mercadolivre-api',
  },
  {
    id: '4',
    name: 'arduino-automation',
    description: 'Sistema de automação residencial com Arduino e Raspberry Pi',
    techStack: ['C++', 'Python', 'IoT'],
    githubUrl: 'https://github.com/omar-cama/arduino-automation',
  },
];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/omar-cama/repos?sort=updated&per_page=8');
        
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const data = await response.json();
        
        const mappedProjects: Project[] = data.map((repo: { name: string; description: string; html_url: string; language: string; stargazers_count: number; forks_count: number }) => ({
          id: repo.name,
          name: repo.name,
          description: repo.description || 'Projeto sem descrição',
          techStack: repo.language ? [repo.language] : [],
          githubUrl: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
        }));

        setProjects(mappedProjects);
      } catch (err) {
        console.log('Using fallback projects');
        setError(true);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.label}>Trabalhos</span>
          <h2 className={styles.title}>Projetos Técnicos</h2>
          <p className={styles.subtitle}>
            Projetos no GitHub demonstrando minhas habilidades em desenvolvimento backend
          </p>
        </motion.div>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <span>Carregando projetos...</span>
          </div>
        ) : (
          <div className={styles.grid}>
            {projects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className={styles.cardContent}>
                  <h3 className={styles.projectName}>{project.name}</h3>
                  <p className={styles.projectDesc}>{project.description}</p>
                  
                  <div className={styles.techStack}>
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span key={tech} className={styles.tech}>{tech}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.stats}>
                    {project.stars !== undefined && (
                      <span className={styles.stat}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        {project.stars}
                      </span>
                    )}
                    {project.forks !== undefined && (
                      <span className={styles.stat}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6zM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25zM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6zM17.625 13.5a.75.75 0 0 0-1.5 0v2.625H13.5a.75.75 0 0 0 0 1.5h2.625v2.625a.75.75 0 0 0 1.5 0v-2.625h2.625a.75.75 0 0 0 0-1.5h-2.625V13.5z" />
                        </svg>
                        {project.forks}
                      </span>
                    )}
                  </div>
                  <span className={styles.cta}>
                    Ver no GitHub
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        <motion.div
          className={styles.viewMore}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a
            href="https://github.com/omar-cama"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewMoreLink}
          >
            Ver todos no GitHub
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;