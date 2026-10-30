import {
  StatItem,
  ServiceItem,
  ProjectItem,
  MilestoneItem,
  TeamMember,
  NavLink,
  SocialLink,
  StudioInfo
} from '../types';
import { getAssetUrl } from '../utils/assetUrl';

export const studioInfo: StudioInfo = {
  name: 'Jagdish Narigara',
  legalName: 'Jagdish Narigara Interior Studio',
  statusBadge: 'Open to a Work',
  headline: 'Good design is obvious. Great design is transparent.',
  headlineSub: "We've built our reputation by taking even the boldest visions and making them achievable realities.",
  statementWords: ['WE DESIGN', 'SPACES', 'PEOPLE LOVE'],
  philosophyTitle: 'Our Philosophy',
  philosophyBody: "At Jagdish Narigara, we are driven by a passion for timeless design, innovative thinking, and precise execution. Our approach blends creativity with functionality, crafting spaces that inspire and endure. We work across residential, commercial, hospitality, and institutional projects, delivering designs that are thoughtful, sustainable, and tailor-made for our clients' visions. Every project is a reflection of our commitment to quality, detail, and architectural excellence. We don't just design buildings — we create experiences that leave a lasting impact.",
  founderEyebrow: 'Our Founder',
  founderHeading: 'A Journey of Design, Growth and Innovation',
  founderIntro: 'Beginning with a passion for custom material craft and space planning in 2004, our studio has evolved into a premier multidisciplinary architectural practice. With foundations rooted in bespoke detailing, we transitioned into comprehensive architectural & interior design in 2011, launched our primary design atelier in 2015, and broadened our scope across luxury residences, commercial headquarters, and hospitality landmarks. As our vision grew, so did our multidisciplinary team of architects, planners, and visualizers. Every milestone represents our unwavering commitment to transforming environments with spatial poetry, functionality, and enduring craft.',
  founderName: 'Jagdish Narigara',
  founderTitle: 'Founder & Principal Architect',
  quote: '"We build more than structures — we design customized experiences tuned to your aspirations."',
  teamEyebrow: 'Our Team',
  teamHeading: 'The Skill & Soul Behind Our Projects',
  teamSubtext: 'Meet the talented designers, planners, and technologists who bring innovative visions to life.',
  phone: '+91 87006 55257',
  email: 'contact@jagdishnarigara.com',
  address: 'Main Avenue, Design District, New Delhi, India',
  whatsappUrl: 'https://wa.me/+918700655257',
  marqueeWords: ['Dream', 'Design', 'Develop'],
  copyright: '© 2026 Jagdish Narigara. All Rights Reserved.',
  developerCredit: 'Crafted with architectural precision'
};

export const navLinks: NavLink[] = [
  { id: 'nav-home', label: 'Home', href: '#home' },
  { id: 'nav-about', label: 'About', href: '#abt' },
  { id: 'nav-service', label: 'Service', href: '#service' },
  { id: 'nav-project', label: 'Our work', href: '#project' },
];

export const statsData: StatItem[] = [
  {
    id: 'stat-clients',
    targetNumber: 150,
    suffix: '+',
    label: 'Clients Served',
    padZero: false,
  },
  {
    id: 'stat-projects',
    targetNumber: 210,
    suffix: '+',
    label: 'Successful Projects',
    padZero: false,
  },
  {
    id: 'stat-awards',
    targetNumber: 9,
    suffix: '+',
    label: 'Prestigious Awards',
    padZero: true,
  },
  {
    id: 'stat-experience',
    targetNumber: 18,
    suffix: '+',
    label: 'Years of Experience',
    padZero: false,
  },
];

export const servicesData: ServiceItem[] = [
  {
    id: 'service-arch',
    title: 'Architectural Design',
    iconName: 'Building2',
    description: 'Comprehensive architectural concepts, spatial masterplans, structural harmony, and technical blueprints tailored to modern living.'
  },
  {
    id: 'service-interior',
    title: 'Interior Design',
    iconName: 'Armchair',
    description: 'Harmonious materials, bespoke furniture curation, acoustic engineering, and atmospheric detailing for residential and commercial spaces.'
  },
  {
    id: 'service-urban',
    title: 'Urban Planning',
    iconName: 'Compass',
    description: 'Sustainable community planning, infrastructural choreography, and civic spaces that foster human connection and ecological balance.'
  },
  {
    id: 'service-landscape',
    title: 'Landscaping Design',
    iconName: 'Trees',
    description: 'Seamless integration of natural flora, water features, biophilic microclimates, and stone terraces that embrace their topography.'
  },
  {
    id: 'service-renovation',
    title: 'Building Renovation',
    iconName: 'Hammer',
    description: 'Adaptive reuse, historic restoration, structural reinforcement, and contemporary metamorphosis of heritage and legacy properties.'
  },
  {
    id: 'service-lighting',
    title: 'Lighting Design',
    iconName: 'Lightbulb',
    description: 'Architectural illumination engineering, circadian rhythm daylighting analysis, and evocative mood illumination for luxury environments.'
  },
  {
    id: 'service-feasibility',
    title: 'Feasibility Studies',
    iconName: 'BarChart3',
    description: 'Environmental impact analysis, zoning assessments, cost viability modeling, and structural risk audits prior to site acquisition.'
  },
  {
    id: 'service-code',
    title: 'Building Code',
    iconName: 'FileCheck',
    description: 'Rigorous municipal regulatory compliance, fire life-safety standards, accessibility requirements, and statutory sanction approvals.'
  },
  {
    id: 'service-3d',
    title: '3D Visualization',
    iconName: 'Box',
    description: 'Photorealistic CGI cinematography, immersive virtual reality walkthroughs, and physical scale architectural model fabrication.'
  },
];

export const projectsData: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'The Sky Horizon Penthouse',
    category: 'Interior Architecture',
    year: '2025',
    location: 'Metropolitan Tower',
    imageSrc: getAssetUrl('images/project-1.jpg'),
  },
  {
    id: 'proj-2',
    title: 'Monolithic Concrete Pavilion',
    category: 'Residential Architecture',
    year: '2024',
    location: 'Hillside Reserve',
    imageSrc: getAssetUrl('images/project-2.jpg'),
  },
  {
    id: 'proj-3',
    title: 'Atelier Glasshouse Estate',
    category: 'Private Residence',
    year: '2024',
    location: 'Coastal Escarpment',
    imageSrc: getAssetUrl('images/project-3.jpg'),
  },
  {
    id: 'proj-4',
    title: 'Lumina Contemporary Gallery',
    category: 'Cultural Space',
    year: '2023',
    location: 'Civic Cultural Center',
    imageSrc: getAssetUrl('images/project-4.jpg'),
  },
  {
    id: 'proj-5',
    title: 'The Japandi Courtyard Suite',
    category: 'Bespoke Interior',
    year: '2023',
    location: 'Urban Sanctuary',
    imageSrc: getAssetUrl('images/project-5.jpg'),
  },
  {
    id: 'proj-6',
    title: 'Solstice Cantilever Residence',
    category: 'Sustainable Architecture',
    year: '2022',
    location: 'Lakeside Ridge',
    imageSrc: getAssetUrl('images/project-6.jpg'),
  },
];

export const milestonesData: MilestoneItem[] = [
  {
    id: 'milestone-1',
    date: 'June 2004',
    title: 'Where It All Began',
    description: 'Founder Jagdish Narigara commences his journey by establishing a bespoke material and architectural craft workshop in New Delhi.'
  },
  {
    id: 'milestone-2',
    date: '2004 - 2011',
    title: 'Retail & Material Expansion',
    description: 'Successfully expands custom architectural fixtures and bespoke material galleries across prime design centers, building a loyal clientele.'
  },
  {
    id: 'milestone-3',
    date: '2011 - 2015',
    title: 'New Vision: Interiors',
    description: 'Ventures into end-to-end luxury interior architecture, delivering turnkey spatial transformations with tailored engineering solutions.'
  },
  {
    id: 'milestone-4',
    date: 'Apr 2015',
    title: 'First Interior Office',
    description: 'Inaugurates our dedicated architectural studio atelier focusing on client consultations, material library curation, and blueprint development.'
  },
  {
    id: 'milestone-5',
    date: 'May 2016',
    title: 'Full Shifted to Interiors',
    description: 'Pivots 100% of studio operations into full-scope architectural design, interior architecture, and luxury residential projects.'
  },
  {
    id: 'milestone-6',
    date: 'Mar 2022',
    title: 'Team Growth',
    description: 'Scales the studio by welcoming leading architects, 3D visualizers, landscape planners, and structural consultants to our creative roster.'
  },
  {
    id: 'milestone-7',
    date: 'Jan 2025',
    title: 'Bigger, Better Office',
    description: 'Establishes a state-of-the-art flagship design headquarters with digital fabrication facilities, material lab, and client showcase suites.'
  },
];

export const teamMembersData: TeamMember[] = [
  { id: 'team-1', name: 'Jagdish Narigara', role: 'Principal Architect & Founder', specialty: 'Architectural Vision & Spatial Strategy' },
  { id: 'team-2', name: 'Aarav Mehta', role: 'Lead Interior Architect', specialty: 'Luxury Residential & Materiality' },
  { id: 'team-3', name: 'Simran Roy', role: 'Head of Urban Planning', specialty: 'Sustainable Environments & Civic Masterplans' },
  { id: 'team-4', name: 'Rohan Verma', role: 'Director of 3D Visualization', specialty: 'CGI Cinematography & Computational Design' },
  { id: 'team-5', name: 'Elena Chen', role: 'Senior Landscape Architect', specialty: 'Biophilic Integration & Microclimates' }
];

export const socialLinks: SocialLink[] = [
  { id: 'soc-ig', platform: 'Instagram', url: 'https://www.instagram.com/jagdishnarigara_arch' },
  { id: 'soc-fb', platform: 'Facebook', url: 'https://facebook.com' },
  { id: 'soc-li', platform: 'LinkedIn', url: 'https://www.linkedin.com/in/jagdish-narigara' },
  { id: 'soc-tw', platform: 'Twitter', url: 'https://x.com' },
];
