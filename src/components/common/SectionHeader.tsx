import React from 'react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  eyebrow?: string;
  heading: React.ReactNode;
  description?: React.ReactNode;
  layout?: 'split' | 'stacked' | 'centered';
  theme?: 'dark' | 'light';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  heading,
  description,
  layout = 'split',
  theme = 'dark',
  className = '',
}) => {
  return (
    <div className={`${styles.header} ${styles[layout]} ${styles[theme]} ${className}`.trim()}>
      <div className={styles.leftCol}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h2 className={styles.heading}>{heading}</h2>
      </div>

      {description && (
        <div className={styles.rightCol}>
          <p className={styles.description}>{description}</p>
        </div>
      )}
    </div>
  );
};
