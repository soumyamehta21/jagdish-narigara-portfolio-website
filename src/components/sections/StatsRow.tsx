import React from 'react';
import { statsData } from '../../data/siteData';
import { StatCard } from './StatCard';
import { getAssetUrl } from '../../utils/assetUrl';
import styles from './StatsRow.module.css';

export const StatsRow: React.FC = () => {
  return (
    <section id="statistic" className={styles.statsSection} aria-label="Studio Statistics">
      <div className={styles.bgImageWrapper}>
        <img
          src={getAssetUrl('images/stats-bg.jpg')}
          alt="Architectural space background"
          className={styles.bgImage}
          loading="lazy"
          width="1600"
          height="800"
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.container}>
        <div className={styles.statsGrid}>
          {statsData.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};
