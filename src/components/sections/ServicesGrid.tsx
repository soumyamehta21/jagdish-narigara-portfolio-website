import React from 'react';
import { servicesData } from '../../data/siteData';
import { SectionHeader } from '../common/SectionHeader';
import { ServiceCard } from './ServiceCard';
import styles from './ServicesGrid.module.css';

export const ServicesGrid: React.FC = () => {
  return (
    <section id="service" className={styles.servicesSection} aria-label="Interior Design & 3D Visualization Services">
      <div className={styles.container}>
        {/* Section Header */}
        <SectionHeader
          eyebrow="Specialized Services"
          heading={<>Crafting Interiors at <br />Every Precision Edge.</>}
          description="From preliminary space planning and precision 2D drafting to immersive 3D walkthroughs and photorealistic renderings, I deliver end-to-end interior design and visualization solutions tailored to your space."
          layout="split"
        />

        {/* Separator Line */}
        <div className={styles.divider} />

        {/* Grid of 6 Specialized Services */}
        <div className={styles.cardsGrid}>
          {servicesData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};
