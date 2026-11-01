import React from 'react';
import {
  Trophy,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  LucideIcon
} from 'lucide-react';
import { studioInfo, awardsData, soloAdvantagesData } from '../../data/siteData';
import { SectionHeader } from '../common/SectionHeader';
import styles from './AwardsSection.module.css';

const awardIcons: LucideIcon[] = [
  Trophy,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Award
];

export const AwardsSection: React.FC = () => {
  return (
    <section id="recognition" className={styles.awardsSection} aria-label="Awards, Project Citations and Recognition">
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* Section Header */}
        <SectionHeader
          eyebrow={studioInfo.awardsEyebrow || 'Recognition & Distinctions'}
          heading={<>Project Citations &amp; <br className={styles.desktopBr} />Industry Distinctions</>}
          description={studioInfo.awardsSubtext || 'A documented track record of precision, technical excellence, and trusted delivery across high-end residences, healthcare, and commercial spaces.'}
          layout="split"
        />

        {/* 6 Key Awards & Project Recognitions Grid */}
        <div className={styles.awardsGrid}>
          {awardsData.map((award, index) => {
            const Icon = awardIcons[index % awardIcons.length];

            return (
              <article key={award.id} className={styles.awardCard}>
                <div className={styles.cardTopRow}>
                  <span className={styles.yearPill}>{award.year}</span>
                  <div className={styles.iconWrapper} aria-hidden="true">
                    <Icon size={18} strokeWidth={2} />
                  </div>
                </div>

                <span className={styles.categoryTag}>{award.category}</span>
                <h3 className={styles.awardTitle}>{award.title}</h3>
                <span className={styles.projectBadge}>{award.project}</span>
                <p className={styles.awardDesc}>{award.description}</p>
              </article>
            );
          })}
        </div>

        {/* The Independent Practice Advantage */}
        <div className={styles.advantagesWrapper}>
          <div className={styles.advantagesHeader}>
            <span className={styles.advEyebrow}>The Independent Practice Advantage</span>
            <h3 className={styles.advHeading}>
              Why Clients &amp; Contractors Value Direct Collaboration
            </h3>
          </div>

          <div className={styles.advantagesGrid}>
            {soloAdvantagesData.map((adv) => (
              <div key={adv.id} className={styles.advCard}>
                <span className={styles.advNumber}>{adv.number}</span>
                <h4 className={styles.advTitle}>{adv.title}</h4>
                <p className={styles.advText}>{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
