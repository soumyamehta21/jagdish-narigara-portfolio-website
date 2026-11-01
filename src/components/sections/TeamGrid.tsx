import React from 'react';
import { studioInfo, teamMembersData } from '../../data/siteData';
import { SectionHeader } from '../common/SectionHeader';
import { getAssetUrl } from '../../utils/assetUrl';
import styles from './TeamGrid.module.css';

export const TeamGrid: React.FC = () => {
  return (
    <section className={styles.teamSection} aria-label="Our Interior Design & Visualization Team">
      <div className={styles.container}>
        {/* Section Header */}
        <SectionHeader
          eyebrow={studioInfo.teamEyebrow}
          heading={<>The Skill &amp; Soul <br className={styles.desktopBr} />Behind Every Space</>}
          description={studioInfo.teamSubtext}
          layout="split"
        />

        {/* Large Team Hero Photograph */}
        <div className={styles.imageCard}>
          <img
            src={getAssetUrl('images/team.jpg')}
            alt="Jagdish Narigara interior design studio multidisciplinary team"
            className={styles.teamImage}
            loading="lazy"
            width="1400"
            height="700"
          />
        </div>

        {/* Multidisciplinary Team Roster Cards */}
        <div className={styles.rosterGrid}>
          {teamMembersData.map((member) => (
            <div key={member.id} className={styles.memberPill}>
              <h4 className={styles.memberName}>{member.name}</h4>
              <p className={styles.memberRole}>{member.role}</p>
              <span className={styles.memberSpecialty}>{member.specialty}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
