import React from 'react';
import { studioInfo } from '../../data/siteData';
import styles from './Marquee.module.css';

export const Marquee: React.FC = () => {
  // Format the sequence "Dream • Design • Develop • "
  const textPattern = studioInfo.marqueeWords.join(' • ') + ' • ';
  // Repeat to ensure smooth continuous coverage
  const marqueeContent = `${textPattern} ${textPattern} ${textPattern} ${textPattern} `;

  return (
    <section className={styles.marqueeSection} aria-label="Studio Motto Marquee">
      <div className={styles.marqueeTrack}>
        <div className={styles.marqueeInner} aria-hidden="true">
          <span className={styles.marqueeText}>{marqueeContent}</span>
          <span className={styles.marqueeText}>{marqueeContent}</span>
        </div>
      </div>
      <p className="sr-only">Studio Motto: {studioInfo.marqueeWords.join(', ')}</p>
    </section>
  );
};
