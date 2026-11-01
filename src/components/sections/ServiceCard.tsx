import React from 'react';
import {
  PenTool,
  Lightbulb,
  Sparkles,
  Video,
  Box,
  LayoutGrid,
  Layers,
  LucideIcon
} from 'lucide-react';
import { ServiceItem } from '../../types';
import styles from './ServicesGrid.module.css';

interface ServiceCardProps {
  service: ServiceItem;
}

const iconMap: Record<ServiceItem['iconName'], LucideIcon> = {
  PenTool,
  Lightbulb,
  Sparkles,
  Video,
  Box,
  LayoutGrid,
  Layers,
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const IconComponent = iconMap[service.iconName] || Box;

  return (
    <article className={styles.serviceCard} tabIndex={0} aria-label={service.title}>
      {/* Top Bar: Number & Icon */}
      <div className={styles.cardTopBar}>
        <span className={styles.serviceIndex}>{service.number}</span>
        <div className={styles.iconContainer}>
          <IconComponent className={styles.serviceIcon} size={26} strokeWidth={1.5} aria-hidden="true" />
        </div>
      </div>

      {/* Main Info */}
      <div className={styles.cardInfo}>
        <h3 className={styles.serviceTitle}>{service.title}</h3>
        <p className={styles.serviceDescription}>{service.description}</p>
      </div>

      {/* Deliverable Tags */}
      {service.deliverables && service.deliverables.length > 0 && (
        <div className={styles.deliverablesList} aria-label="Key Deliverables">
          {service.deliverables.map((item, index) => (
            <span key={index} className={styles.deliverableTag}>
              {item}
            </span>
          ))}
        </div>
      )}
    </article>
  );
};
