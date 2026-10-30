import React from 'react';
import { StatItem } from '../../types';
import { useCountUp } from '../../hooks/useCountUp';
import styles from './StatsRow.module.css';

interface StatCardProps {
  stat: StatItem;
}

export const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const { elementRef, displayValue } = useCountUp({
    target: stat.targetNumber,
    duration: 2000,
    padZero: stat.padZero,
  });

  return (
    <div ref={elementRef} className={styles.statCard}>
      <div className={styles.numberWrapper}>
        <span className={styles.statNumber}>{displayValue}</span>
        <span className={styles.statSuffix}>{stat.suffix}</span>
      </div>
      <p className={styles.statLabel}>{stat.label}</p>
    </div>
  );
};
