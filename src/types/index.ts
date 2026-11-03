/**
 * TypeScript types and interfaces for Jagdish Narigara Interior Design Studio.
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
  number: string;
  title: string;
  iconName: 'PenTool' | 'Lightbulb' | 'Sparkles' | 'Video' | 'Box' | 'LayoutGrid' | 'Layers';
  description: string;
  deliverables?: string[];
}

export interface ProcessStep {
  id: string;
  number: string;
  phase: string;
  title: string;
  summary: string;
  description: string;
  deliverables: string[];
  benefit: string;
  iconName: 'LayoutGrid' | 'PenTool' | 'Box' | 'Sparkles';
}

export interface ProjectGalleryImage {
  src: string;
  thumbSrc?: string;
  width?: number;
  height?: number;
  alt: string;
  caption?: string;
}

export interface ProjectItem {
  id: string;
  slug?: string;
  title: string;
  category: string;
  tagline?: string;
  year?: string;
  location?: string;
  imageSrc: string;
  images?: ProjectGalleryImage[];
}

export interface MilestoneItem {
  id: string;
  date: string;
  title: string;
  description: string;
  tags?: string[];
}

export interface AwardItem {
  id: string;
  year: string;
  title: string;
  category: string;
  project: string;
  description: string;
}

export interface SoloAdvantage {
  id: string;
  number: string;
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
  awardsEyebrow?: string;
  awardsHeading?: string;
  awardsSubtext?: string;
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
