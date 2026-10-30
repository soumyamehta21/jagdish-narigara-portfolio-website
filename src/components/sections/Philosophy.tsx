import React from 'react';
import { studioInfo } from '../../data/siteData';
import styles from './Philosophy.module.css';

export const Philosophy: React.FC = () => {
  return (
    <section id="abt" className={styles.philosophySection} aria-label="Our Architectural Philosophy">
      <div className={styles.container}>
        <div className={styles.blueprintCol}>
          <div className={styles.blueprintCard}>
            <img
              src="/images/architectural-plan.svg"
              alt="Detailed architectural blueprint floor plan diagram"
              className={styles.blueprintImg}
              loading="lazy"
              width="800"
              height="600"
            />
          </div>
        </div>

        <div className={styles.contentCol}>
          <span className={styles.eyebrow}>Our Philosophy</span>
          <h2 className={styles.heading}>Crafting Spaces that Transcend Function</h2>
          <div className={styles.bodyText}>
            <p className={styles.leadPara}>
              At {studioInfo.name}, we are driven by an enduring passion for timeless design, innovative thinking, and architectural rigor.
            </p>
            <p className={styles.para}>
              {studioInfo.philosophyBody}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
