'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ChatBot.module.scss';
import { ChatMessage } from '@/types';

const SYSTEM_PROMPT = `Você é um assistente virtual que conhece profundamente o portfólio de Omar Cama Huarahuara.

Aqui estão as informações sobre ele:

**Nome:** Omar Cama Huarahuara
**Título:** Backend Developer & AI Enthusiast
**Localização:** São Paulo, Brasil
**Contato:** omar.js2023@gmail.com | +55 (11) 98080-8286

**Formação:**
- Análise e Desenvolvimento de Sistemas (em andamento)

**Experiência Profissional:**
1. **PHILIPS** - Desenvolvedor Backend
   - Desenvolvimento de APIs críticas para o setor médico
   - Integração de sistemas legados
   - Resolução de desafios complexos

2. **RECODE PRO** - Instrutor de Programação
   - Formação de novos desenvolvedores
   - Ensinamento de programação e trabalho em equipe
   - Promoção de ambiente de aprendizado inclusivo

3. **AGSIM SRL** - Desenvolvedor
   - Aprendizado contínuo e versatilidade
   - Desenvolvimento de habilidades técnicas
   - Trabalho em equipe em ambiente desafiador

**Tech Stack:**
- Linguagens: Java, JavaScript, TypeScript
- Frameworks: Spring Boot, Hibernate, Apache Camel
- Databases: SQL Server, PostgreSQL, MySQL
- Cloud: Azure, Linux
- Ferramentas: IntelliJ IDEA, VS Code, Git, Figma

**Projetos Pessoais:**
- Tech Reviews e DIY (YouTube)
- IA em Foco (pesquisas sobre IA)
- E-commerce com API do Mercado Livre
- Automação com Arduino e Raspberry Pi

**Links:**
- LinkedIn: https://www.linkedin.com/in/omar-js/
- GitHub: https://github.com/omar-cama
- YouTube: https://www.youtube.com/@robotex_dev

**Disponibilidade:**
- Atualmente buscando novas oportunidades
- Open para projetos freelancer e vagas CLT

Responda de forma amigável, profissional e em português brasileiro. Use formatação clara com bullet points quando apropiado.`;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Sou o assistente virtual do Omar. Posso responder perguntas sobre ele, suas habilidades, experiência e projetos. Como posso ajudar?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input.trim(),
          history: messages,
          systemPrompt: SYSTEM_PROMPT,
        }),
      });

      const data = await response.json();

      if (data.response) {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Erro ao processar mensagem');
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Desculpe, estou com dificuldades técnicas no momento. Você pode tentar novamente ou entrar em contato diretamente pelo email omar.js2023@gmail.com',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <motion.button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <span className={styles.aiIcon}>🤖</span>
        <span className={styles.pulse} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatWindow}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.chatHeader}>
              <div className={styles.headerInfo}>
                <span className={styles.aiBadge}>IA</span>
                <h3>Assistente Virtual</h3>
              </div>
              <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className={styles.chatMessages}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`${styles.message} ${styles[msg.role]}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {msg.role === 'assistant' && (
                    <div className={styles.avatar}>
                      <span>🤖</span>
                    </div>
                  )}
                  <div className={styles.messageContent}>
                    <p>{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className={`${styles.message} ${styles.assistant}`}>
                  <div className={styles.avatar}>
                    <span>🤖</span>
                  </div>
                  <div className={styles.messageContent}>
                    <div className={styles.typing}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className={styles.chatInput}>
              <input
                type="text"
                placeholder="Pergunte sobre o Omar..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <button onClick={handleSend} disabled={isLoading || !input.trim()}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;