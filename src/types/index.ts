/**
 * TypeScript types and interfaces for the architecture studio portfolio website.
 */

export interface StatItem {
  id: string;
  targetNumber: number;
  suffix: string;
  label: string;
  padZero?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: 'Building2' | 'Armchair' | 'Compass' | 'Trees' | 'Hammer' | 'Lightbulb' | 'BarChart3' | 'FileCheck' | 'Box';
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  location: string;
  imageSrc: string;
}

export interface MilestoneItem {
  id: string;
  date: string;
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export interface StudioInfo {
  name: string;
  legalName: string;
  statusBadge: string;
  headline: string;
  headlineSub: string;
  statementWords: string[];
  philosophyTitle: string;
  philosophyBody: string;
  founderEyebrow: string;
  founderHeading: string;
  founderIntro: string;
  founderName: string;
  founderTitle: string;
  quote: string;
  teamEyebrow: string;
  teamHeading: string;
  teamSubtext: string;
  phone: string;
  email: string;
  address: string;
  whatsappUrl: string;
  marqueeWords: string[];
  copyright: string;
  developerCredit: string;
}
