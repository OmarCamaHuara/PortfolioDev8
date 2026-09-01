'use client';

import { useRef, useState, FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.scss';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-100px' });

  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current || loading) return;

    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      await emailjs.sendForm(
        'service_q6m4yyk',
        'template_ov1c5iv',
        formRef.current,
        'Q3MnvIZINe6pIW1uo'
      );
      setSuccess(true);
      formRef.current.reset();
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/omar-js/', icon: 'linkedin' },
    { name: 'GitHub', url: 'https://github.com/omar-cama', icon: 'github' },
    { name: 'YouTube', url: 'https://www.youtube.com/@robotex_dev', icon: 'youtube' },
    { name: 'WhatsApp', url: 'https://wa.me/5511980808286', icon: 'whatsapp' },
  ];

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <motion.div
          className={styles.info}
          ref={ref}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>Contato</span>
          <h2 className={styles.title}>
            Vamos Trabalhar <span>Juntos</span>
          </h2>
          <p className={styles.subtitle}>
            Estou sempre aberto a novas oportunidades e desafios. Entre em contato!
          </p>

          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <span className={styles.icon}>✉️</span>
              <div>
                <h4>Email</h4>
                <a href="mailto:omar.js2023@gmail.com">omar.js2023@gmail.com</a>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.icon}>📱</span>
              <div>
                <h4>WhatsApp</h4>
                <a href="https://wa.me/5511980808286">+55 (11) 98080-8286</a>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.icon}>📍</span>
              <div>
                <h4>Localização</h4>
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </div>

          <div className={styles.socialLinks}>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.formWrapper}
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form ref={formRef} onSubmit={sendEmail} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="name"
                placeholder="Seu nome"
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                placeholder="Seu email"
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <textarea
                name="message"
                placeholder="Sua mensagem"
                required
                rows={6}
                className={styles.textarea}
              />
            </div>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Mensagem'}
            </button>
            {error && <p className={styles.error}>Erro ao enviar mensagem. Tente novamente.</p>}
            {success && <p className={styles.success}>Mensagem enviada com sucesso!</p>}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;