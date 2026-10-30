import React from 'react';
import { studioInfo } from '../../data/siteData';
import styles from './QuoteBand.module.css';

export const QuoteBand: React.FC = () => {
  return (
    <section className={styles.quoteSection} aria-label="Studio Vision Quote">
      <div className={styles.backdropPattern} />
      <div className={styles.container}>
        <blockquote className={styles.blockquote}>
          <p className={styles.quoteText}>{studioInfo.quote}</p>
        </blockquote>
      </div>
    </section>
  );
};
