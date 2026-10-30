import React from 'react';
import { studioInfo } from '../../data/siteData';
import styles from './StatementBand.module.css';

export const StatementBand: React.FC = () => {
  return (
    <section className={styles.brandSection} aria-label="Studio Statement">
      <div className={styles.container}>
        {studioInfo.statementWords.map((word, index) => (
          <h2 key={index} className={styles.statementLine}>
            {word}
          </h2>
        ))}
      </div>
    </section>
  );
};
