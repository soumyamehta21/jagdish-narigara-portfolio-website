import React from 'react';
import { servicesData } from '../../data/siteData';
import { SectionHeader } from '../common/SectionHeader';
import { ServiceCard } from './ServiceCard';
import styles from './ServicesGrid.module.css';

export const ServicesGrid: React.FC = () => {
  return (
    <section id="service" className={styles.servicesSection} aria-label="Our Architecture & Interior Services">
      <div className={styles.container}>
        {/* Section Header */}
        <SectionHeader
          eyebrow="Our services"
          heading="Adorning you at every edge."
          description="We make even the wildest architectural dreams into dramatic yet feasible finished products anyone would be proud of."
          layout="split"
        />

        {/* Separator Line */}
        <div className={styles.divider} />

        {/* Grid of 9 Cards */}
        <div className={styles.cardsGrid}>
          {servicesData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};
