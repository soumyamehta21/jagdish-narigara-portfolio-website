import React from 'react';
import { studioInfo, teamMembersData } from '../../data/siteData';
import { SectionHeader } from '../common/SectionHeader';
import styles from './TeamGrid.module.css';

export const TeamGrid: React.FC = () => {
  return (
    <section className={styles.teamSection} aria-label="Our Architecture & Interior Design Team">
      <div className={styles.container}>
        {/* Section Header */}
        <SectionHeader
          eyebrow={studioInfo.teamEyebrow}
          heading={<>The Skill &amp; Soul <br className={styles.desktopBr} />Behind Our Projects</>}
          description={studioInfo.teamSubtext}
          layout="split"
        />

        {/* Large Team Hero Photograph matching reference */}
        <div className={styles.imageCard}>
          <img
            src="/images/team.jpg"
            alt="Jagdish Narigara architectural studio multidisciplinary design team"
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
