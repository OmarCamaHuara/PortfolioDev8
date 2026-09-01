'use client';

import { motion } from 'framer-motion';
import styles from './Hero.module.scss';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className={styles.greeting}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Olá, meu nome é
          </motion.span>

          <motion.h1
            className={styles.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className={styles.firstName}>Omar Cama</span>
            <span className={styles.lastName}>Huarahuara</span>
          </motion.h1>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Backend Developer & AI Enthusiast
          </motion.h2>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Desenvolvedor Backend com experiência em APIs, microservices e integração de IA.
            Apaixonado por criar soluções escaláveis que impactam a vida das pessoas.
          </motion.p>

          <motion.div
            className={styles.cta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <a href="#projects" className={styles.primaryBtn}>
              Ver Projetos
            </a>
            <a href="#contact" className={styles.secondaryBtn}>
              Contatar
            </a>
          </motion.div>

          <motion.div
            className={styles.cvDownload}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <a
              href="https://drive.google.com/file/d/1Lin57jAzdqDK_PVDrr6jZeK1ltSouJ_G/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cvLink}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.dot} style={{ background: '#ff5f56' }} />
              <span className={styles.dot} style={{ background: '#ffbd2e' }} />
              <span className={styles.dot} style={{ background: '#27c93f' }} />
              <span className={styles.filename}>backend.ts</span>
            </div>
            <pre className={styles.codeContent}>
              <code>{`interface Developer {
  name: string;
  role: string;
  focus: string[];
}

const omar: Developer = {
  name: "Omar Cama",
  role: "Backend Developer",
  focus: [
    "Java/Spring Boot",
    "APIs & Microservices",
    "AI Integration",
    "Cloud Architecture"
  ]
};`}</code>
            </pre>
          </div>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;