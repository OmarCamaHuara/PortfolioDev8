'use client';

import { useState } from 'react';
import styles from './semantic-search.module.scss';

const SUGGESTED_PROMPTS = [
  'Spring Boot in production',
  'AI engineering practice',
  'Available for remote roles?',
];

export default function SemanticSearch() {
  const [query, setQuery] = useState('');

  const handlePromptClick = (prompt: string) => {
    setQuery(prompt);
  };

  return (
    <div className={styles.searchBox}>
      <div className={styles.prompts}>
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            className={styles.promptBtn}
            onClick={() => handlePromptClick(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className={styles.inputGroup}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask or search anything about Omar's portfolio..."
          className={styles.input}
        />
        <button type="submit" className={styles.submitBtn}>
          Search →
        </button>
      </form>
    </div>
  );
}
