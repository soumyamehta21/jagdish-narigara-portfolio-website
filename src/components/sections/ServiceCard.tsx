import React from 'react';
import {
  Building2,
  Armchair,
  Compass,
  Trees,
  Hammer,
  Lightbulb,
  BarChart3,
  FileCheck,
  Box,
  LucideIcon
} from 'lucide-react';
import { ServiceItem } from '../../types';
import styles from './ServicesGrid.module.css';

interface ServiceCardProps {
  service: ServiceItem;
}

const iconMap: Record<ServiceItem['iconName'], LucideIcon> = {
  Building2,
  Armchair,
  Compass,
  Trees,
  Hammer,
  Lightbulb,
  BarChart3,
  FileCheck,
  Box
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const IconComponent = iconMap[service.iconName] || Building2;

  return (
    <div className={styles.serviceCard} tabIndex={0} role="article" aria-label={service.title}>
      <div className={styles.iconContainer}>
        <IconComponent className={styles.serviceIcon} size={32} strokeWidth={1.5} aria-hidden="true" />
      </div>
      <div className={styles.cardInfo}>
        <h3 className={styles.serviceTitle}>{service.title}</h3>
      </div>
    </div>
  );
};
