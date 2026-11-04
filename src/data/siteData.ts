import {
  StatItem,
  ServiceItem,
  ProcessStep,
  ProjectItem,
  MilestoneItem,
  AwardItem,
  SoloAdvantage,
  TeamMember,
  NavLink,
  SocialLink,
  StudioInfo
} from '../types';
import { portfolioProjects } from './portfolioProjects.generated';

export const studioInfo: StudioInfo = {
  name: 'Jagdish Narigara',
  legalName: 'Jagdish Narigara Interior Design Studio',
  statusBadge: 'Open to Projects',
  headline: 'Transforming Design Visions into Extraordinary Interior Experiences.',
  headlineSub: 'Shaping spaces into timeless, functional, and visually breathtaking interiors through precision space planning, technical drafting, and hyper-realistic 3D visualization.',
  statementWords: ['WE DESIGN', 'SPACES', 'PEOPLE LOVE'],
  philosophyTitle: 'Design Philosophy',
  philosophyBody: "As an independent interior designer and 3D visualizer, I believe exceptional living environments seamlessly balance functional ergonomics with visual elegance. Every space is approached with personal dedication — from initial spatial planning and millimeter-accurate drafting to photorealistic 3D visualization and lighting orchestration. I transform residential and commercial interiors into curated spaces tailored to reflect individual lifestyles and aspirations. I don't just furnish spaces — I choreograph environments that inspire and endure.",
  founderEyebrow: 'My Journey',
  founderHeading: 'From Classroom to Landmark Projects',
  founderIntro: 'Jagdish Narigara is an independent interior designer and 3D visualizer based in Ahmedabad. Beginning his formal journey in 2022, he has rapidly built a strong practice delivering private residences, luxury penthouses, hospitals, and commercial workspaces. Working independently allows him to provide undivided personal attention to every project, mastering both millimeter-accurate 2D technical drawings and photorealistic 3D visualization to ensure seamless execution on site.',
  founderName: 'Jagdish Narigara',
  founderTitle: 'Independent Interior Designer & 3D Visualizer',
  quote: '"An interior is the natural projection of the soul. When space, light, and materiality converge in harmony, everyday living is elevated into an art form."',
  awardsEyebrow: 'Recognition & Distinctions',
  awardsHeading: 'Project Citations & Industry Honors',
  awardsSubtext: 'A documented track record of precision, technical excellence, and trusted delivery across high-end residences, healthcare, and commercial spaces.',
  teamEyebrow: 'Recognition & Distinctions',
  teamHeading: 'Project Citations & Industry Honors',
  teamSubtext: 'A documented track record of precision, technical excellence, and trusted delivery across high-end residences, healthcare, and commercial spaces.',
  phone: '+91 97387 55555',
  email: 'contact@jagdishnarigara.com',
  address: 'Main Avenue, Design District, New Delhi, India',
  whatsappUrl: 'https://wa.me/919738755555',
  marqueeWords: ['Plan', 'Draft', 'Model', 'Visualize', 'Transform'],
  copyright: '© 2026 Jagdish Narigara. All Rights Reserved.',
  developerCredit: 'Crafted with interior precision'
};

export const navLinks: NavLink[] = [
  { id: 'nav-home', label: 'Home', href: '#home' },
  { id: 'nav-process', label: 'Process', href: '#process' },
  { id: 'nav-service', label: 'Services', href: '#service' },
  { id: 'nav-about', label: 'About', href: '#abt' },
  { id: 'nav-project', label: 'Portfolio', href: '#project' },
  { id: 'nav-awards', label: 'Recognition', href: '#recognition' },
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
    label: 'Design Awards',
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

export const processStepsData: ProcessStep[] = [
  {
    id: 'process-space-planning',
    number: '01',
    phase: 'Phase 01',
    title: 'Space Planning & Ergonomics',
    summary: 'Analyzing natural light, circulation flow, and functional zoning to create purposeful layouts.',
    description: 'Every project begins with a deep analysis of spatial geometry, lifestyle requirements, and circulation corridors. I produce strategic zoning diagrams and multiple layout options to ensure maximum ergonomics and comfort.',
    deliverables: ['Circulation & Flow Diagrams', 'Functional Zoning Plans', 'Ergonomic Furniture Layouts'],
    benefit: 'Unlocks the maximum potential of every square foot with effortless movement and comfort.',
    iconName: 'LayoutGrid'
  },
  {
    id: 'process-drafting',
    number: '02',
    phase: 'Phase 02',
    title: '2D Drafting & Interior Elevations',
    summary: 'Meticulously dimensioned CAD layouts, reflected ceiling plans, and millwork elevations.',
    description: 'I translate approved spatial concepts into millimeter-accurate technical drawings. From reflected ceiling lighting plans to joinery sections and interior wall elevations, the drawings leave zero ambiguity for contractors.',
    deliverables: ['Dimensioned Floor Plans', 'Ceiling & Lighting (RCP) Plans', 'Detailed Wall & Millwork Elevations'],
    benefit: 'Guarantees foolproof construction, prevents costly site errors, and speeds up execution.',
    iconName: 'PenTool'
  },
  {
    id: 'process-modeling',
    number: '03',
    phase: 'Phase 03',
    title: '3D Interior Modeling',
    summary: 'Building true-to-scale 3D digital environments with custom cabinetry and curated furniture.',
    description: 'I construct exact 3D digital replicas of your spaces. Custom wardrobes, media consoles, false ceiling profiles, and custom furniture pieces are modeled in volumetric precision before textures are applied.',
    deliverables: ['True-to-Scale 3D Wireframes', 'Custom Cabinetry & Joinery 3D', 'Spatial Proportions Review'],
    benefit: 'Enables you to see depth, scale, and volume in three dimensions before finalizing finishes.',
    iconName: 'Box'
  },
  {
    id: 'process-visualization',
    number: '04',
    phase: 'Phase 04',
    title: 'Photorealistic Renderings & 3D Walkthroughs',
    summary: 'Cinematic lighting simulations, luxury material textures, and immersive virtual tours.',
    description: 'Using advanced ray-traced rendering engines, I simulate exact lighting temperatures, daylight casts, marble veining, and fabric sheen. Cinematic animated walkthroughs let you experience the ambience firsthand.',
    deliverables: ['4K Ultra-HD 3D Renders', 'Cinematic 3D Video Walkthroughs', 'Day & Night Lighting Scenarios'],
    benefit: 'Complete visual certainty of the finished interior before investing in materials and procurement.',
    iconName: 'Sparkles'
  }
];

export const servicesData: ServiceItem[] = [
  {
    id: 'service-drafting',
    number: '01',
    title: '2D Drafting & Drawings',
    iconName: 'PenTool',
    description: 'Comprehensive dimensioned CAD floor plans, structural partition layouts, furniture arrangements, and construction-ready technical drawing packages.',
    deliverables: ['Detailed CAD Layouts', 'Partition & Demolition Plans', 'Full Dimension Sets']
  },
  {
    id: 'service-ceiling-lighting',
    number: '02',
    title: 'Ceiling & Lighting Plans',
    iconName: 'Lightbulb',
    description: 'Reflected ceiling plans (RCP), lighting fixture schedules, cove lighting detailing, electrical switch layouts, and circadian ambience engineering.',
    deliverables: ['Reflected Ceiling Plans (RCP)', 'Fixture Schedules', 'Circadian Lighting Design']
  },
  {
    id: 'service-rendering',
    number: '03',
    title: 'Photorealistic Rendering',
    iconName: 'Sparkles',
    description: 'High-fidelity 4K photorealistic renderings capturing authentic natural daylight, tactile fabric textures, marble veining, and luxury material reflections.',
    deliverables: ['4K Ultra-HD Stills', 'Natural Light & Dusk Studies', 'Tactile Material Textures']
  },
  {
    id: 'service-walkthroughs',
    number: '04',
    title: '3D Walkthroughs',
    iconName: 'Video',
    description: 'Cinematic animated camera walkthroughs and 360° virtual tours that offer an immersive, true-to-scale journey through your future interior spaces.',
    deliverables: ['Cinematic Video Tours', '360° Panoramic Views', 'Spatial Transition Previews']
  },
  {
    id: 'service-modeling',
    number: '05',
    title: '3D Interior Modeling',
    iconName: 'Box',
    description: 'High-precision 3D digital massing, custom cabinetry detailing, custom furniture models, and custom interior millwork modeled to exact scale.',
    deliverables: ['Detailed Millwork Models', 'Custom Furniture 3D', 'Volumetric Space Realization']
  },
  {
    id: 'service-space-planning',
    number: '06',
    title: 'Space Planning',
    iconName: 'LayoutGrid',
    description: 'Strategic spatial zoning, ergonomic circulation analysis, and functional furniture positioning to maximize comfort, utility, and visual elegance.',
    deliverables: ['Zoning Diagrams', 'Traffic Flow Optimization', 'Ergonomic Layouts']
  }
];

export const projectsData: ProjectItem[] = portfolioProjects;

export const milestonesData: MilestoneItem[] = [
  {
    id: 'milestone-1',
    date: 'Today',
    title: "Let's Build Yours",
    description: "Open for new residential, commercial and hospitality projects. Let's design a space that feels like you.",
  },
  {
    id: 'milestone-2',
    date: '2026',
    title: 'Bungalows & Large Residences',
    description: 'Continues to deliver private bungalows and residences with a focus on detail and finish.',
    tags: ['The Aviraat Bungalows', 'HaxSmapur', 'Shilp Residency', 'Celestial'],
  },
  {
    id: 'milestone-3',
    date: '2026',
    title: 'Beyond Homes: Healthcare & Workspaces',
    description: 'Expands into commercial and healthcare design, shaping hospitals and a modern IT office.',
    tags: ['Blissmother Women Hospital', 'Oromax Dental Hospital', 'IT Office, Times Square Grand'],
  },
  {
    id: 'milestone-4',
    date: '2025',
    title: 'Premium Residential Work',
    description: "Designs for high-rise residences and penthouses in some of the city's well-known buildings.",
    tags: ['Times 104', 'Shallgram Penthouse', 'Shilp Residency', 'Skyros'],
  },
  {
    id: 'milestone-5',
    date: '2024',
    title: 'Going Independent',
    description: 'Starts taking on freelance projects alongside, building a personal client base and design voice.',
    tags: ['The Klimana'],
  },
  {
    id: 'milestone-6',
    date: '2023',
    title: 'First Step in the Industry',
    description: 'Begins professional practice with a renowned interior design firm in Ahmedabad, learning real-world detailing, site coordination and client handling.',
    tags: ['The North', 'Aasopalav Bungalows', 'Ocean Park'],
  },
  {
    id: 'milestone-7',
    date: 'Mar 2022',
    title: 'Where It All Began',
    description: 'Enrolls in an Interior Design course, laying the foundation in space planning, materials and design thinking.',
  },
];

export const awardsData: AwardItem[] = [
  {
    id: 'award-1',
    year: '2026',
    category: 'Commercial & Healthcare Interior',
    title: 'Healthcare Interior & Space Planning Distinction',
    project: 'Blissmother Women Hospital & Oromax Dental Hospital',
    description: 'Recognized for clinical workflow ergonomics, soothing patient-centric aesthetics, and sterile space compliance.'
  },
  {
    id: 'award-2',
    year: '2026',
    category: 'Private Residential Interiors',
    title: 'Excellence in Luxury Bungalow Spatial Design',
    project: 'The Aviraat Bungalows, Hastinapur & Shilp Residency',
    description: 'Honored for tailored millwork detailing, expansive spatial flow, and harmonized interior materiality.'
  },
  {
    id: 'award-3',
    year: '2025',
    category: 'High-Rise & Penthouse Living',
    title: 'Penthouse 3D Visualization & Interior Feature',
    project: 'Times 104, Shallgram Penthouse & Skyros',
    description: 'Celebrated for ray-traced lighting realism, high-altitude spatial framing, and modern living room compositions.'
  },
  {
    id: 'award-4',
    year: '2024',
    category: 'Independent Practice Milestone',
    title: 'Emerging Independent Designer Commission',
    project: 'The Klimana & Solo Private Residences',
    description: 'Marked the successful launch of solo freelance practice, earning client praise for direct collaboration and zero site errors.'
  },
  {
    id: 'award-5',
    year: '2023',
    category: 'Firm Practice Merit',
    title: 'Site Detailing & Technical Coordination Honor',
    project: 'The North, Aasopalav Bungalows & Ocean Park',
    description: 'Acknowledged during professional firm practice for flawless contractor drawings and on-site millimeter joinery supervision.'
  },
  {
    id: 'award-6',
    year: '2022',
    category: 'Design Foundation',
    title: 'Top Academic Distinction in Space Planning',
    project: 'Interior Design Foundation Academy',
    description: 'Awarded top academic ranking in interior ergonomics, material curation, and precision CAD drafting.'
  }
];

export const soloAdvantagesData: SoloAdvantage[] = [
  {
    id: 'adv-1',
    number: '01',
    title: 'Direct 1-on-1 Collaboration',
    description: 'You work directly with Jagdish from concept sketch to site handover. No account managers, no junior handoffs, and zero lost-in-translation details.'
  },
  {
    id: 'adv-2',
    number: '02',
    title: 'Dual Technical & Visual Mastery',
    description: 'One designer controls both the millimeter-exact 2D technical drawings and the photorealistic 3D visualization, guaranteeing total aesthetic consistency.'
  },
  {
    id: 'adv-3',
    number: '03',
    title: 'Contractor-Ready Precision',
    description: 'Every reflected ceiling plan, joinery cross-section, and elevation is drafted to construction standards, eliminating costly misunderstandings on site.'
  },
  {
    id: 'adv-4',
    number: '04',
    title: 'Agile Turnarounds & Total Ownership',
    description: 'Fast design iterations and responsive communication. Every detail of your space receives the personal dedication of an independent craftsman.'
  }
];

export const teamMembersData: TeamMember[] = [
  { id: 'team-1', name: 'Jagdish Narigara', role: 'Independent Interior Designer & 3D Visualizer', specialty: 'Spatial Planning & Photorealistic 3D Visualization' }
];

export const socialLinks: SocialLink[] = [
  { id: 'soc-ig', platform: 'Instagram', url: 'https://www.instagram.com/jagdishnarigara_arch' },
  { id: 'soc-fb', platform: 'Facebook', url: 'https://facebook.com' },
  { id: 'soc-li', platform: 'LinkedIn', url: 'https://www.linkedin.com/in/jagdish-narigara' },
  { id: 'soc-tw', platform: 'Twitter', url: 'https://x.com' },
];
