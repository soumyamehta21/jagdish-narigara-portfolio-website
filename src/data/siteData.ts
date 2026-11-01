import {
  StatItem,
  ServiceItem,
  ProcessStep,
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
  legalName: 'Jagdish Narigara Interior Design Studio',
  statusBadge: 'Open to Projects',
  headline: 'Bespoke spaces designed with precision & timeless artistry.',
  headlineSub: 'Transforming spaces into timeless, functional, and visually breathtaking interiors through precision space planning, technical drafting, and hyper-realistic 3D visualization.',
  statementWords: ['WE DESIGN', 'INTERIORS', 'YOU CHERISH'],
  philosophyTitle: 'Our Design Philosophy',
  philosophyBody: "At Jagdish Narigara Interior Studio, we believe great interiors seamlessly balance functional ergonomics with visual elegance. Every space is approached with meticulous care — from initial spatial planning and detailed drafting to photorealistic 3D visualization and lighting orchestration. We transform residential and commercial interiors into curated environments tailored to reflect individual lifestyles and aspirations. We don't just furnish spaces — we choreograph experiences that inspire and endure.",
  founderEyebrow: 'My Journey',
  founderHeading: 'From Classroom to Landmark Projects',
  founderIntro: 'Beginning with custom material craft and spatial detailing in 2004, Jagdish Narigara has dedicated his career to the art of luxury interiors. Over the past twenty years, our practice has grown into a specialized interior design and 3D visualization studio. From technical 2D drafting and interior elevations to hyper-realistic 3D renderings and immersive walkthroughs, our mission is to ensure every interior detail is visualized, refined, and flawlessly realized before construction begins.',
  founderName: 'Jagdish Narigara',
  founderTitle: 'Founder & Principal Interior Designer',
  quote: '"An interior is the natural projection of the soul. When space, light, and materiality converge in harmony, everyday living is elevated into an art form."',
  teamEyebrow: 'Our Studio',
  teamHeading: 'The Skill & Soul Behind Every Interior',
  teamSubtext: 'Meet the talented interior designers, 3D visualizers, space planners, and technical drafters who bring extraordinary spaces to life.',
  phone: '+91 87006 55257',
  email: 'contact@jagdishnarigara.com',
  address: 'Main Avenue, Design District, New Delhi, India',
  whatsappUrl: 'https://wa.me/+918700655257',
  marqueeWords: ['Plan', 'Draft', 'Model', 'Visualize', 'Transform'],
  copyright: '© 2026 Jagdish Narigara. All Rights Reserved.',
  developerCredit: 'Crafted with interior precision'
};

export const navLinks: NavLink[] = [
  { id: 'nav-home', label: 'Home', href: '#home' },
  { id: 'nav-process', label: 'Process', href: '#process' },
  { id: 'nav-service', label: 'Services', href: '#service' },
  { id: 'nav-about', label: 'About', href: '#abt' },
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
    description: 'Every project begins with a deep analysis of spatial geometry, lifestyle requirements, and circulation corridors. We produce strategic zoning diagrams and multiple layout options to ensure maximum ergonomics and comfort.',
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
    description: 'We translate approved spatial concepts into millimeter-accurate technical drawings. From reflected ceiling lighting plans to joinery sections and interior wall elevations, our drawings leave zero ambiguity for contractors.',
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
    description: 'We construct exact 3D digital replicas of your spaces. Custom wardrobes, media consoles, false ceiling profiles, and bespoke furniture pieces are modeled in volumetric precision before textures are applied.',
    deliverables: ['True-to-Scale 3D Wireframes', 'Bespoke Cabinetry & Joinery 3D', 'Spatial Proportions Review'],
    benefit: 'Enables you to see depth, scale, and volume in three dimensions before finalizing finishes.',
    iconName: 'Box'
  },
  {
    id: 'process-visualization',
    number: '04',
    phase: 'Phase 04',
    title: 'Photorealistic Renderings & 3D Walkthroughs',
    summary: 'Cinematic lighting simulations, luxury material textures, and immersive virtual tours.',
    description: 'Using advanced ray-traced rendering engines, we simulate exact lighting temperatures, daylight casts, marble veining, and fabric sheen. Cinematic animated walkthroughs let you experience the ambience firsthand.',
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
    description: 'High-precision 3D digital massing, custom cabinetry detailing, bespoke furniture models, and custom interior millwork modeled to exact scale.',
    deliverables: ['Bespoke Millwork Models', 'Custom Furniture 3D', 'Volumetric Space Realization']
  },
  {
    id: 'service-space-planning',
    number: '06',
    title: 'Space Planning',
    iconName: 'LayoutGrid',
    description: 'Strategic spatial zoning, ergonomic circulation analysis, and functional furniture positioning to maximize comfort, utility, and visual elegance.',
    deliverables: ['Zoning Diagrams', 'Traffic Flow Optimization', 'Ergonomic Layouts']
  },
  {
    id: 'service-elevations',
    number: '07',
    title: 'Interior Elevations',
    iconName: 'Layers',
    description: 'Detailed vertical wall elevations detailing TV units, wardrobe millwork, vanity designs, feature wall paneling, and material transitions.',
    deliverables: ['Feature Wall Profiles', 'Wardrobe & Kitchen Millwork', 'Vertical Material Mapping']
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'The Sky Horizon Penthouse',
    category: 'Luxury Living & Dining',
    year: '2025',
    location: 'Metropolitan Tower',
    imageSrc: getAssetUrl('images/project-1.jpg'),
  },
  {
    id: 'proj-2',
    title: 'Minimalist Executive Lounge',
    category: 'Bespoke Lounge Interior',
    year: '2024',
    location: 'Hillside Reserve',
    imageSrc: getAssetUrl('images/project-2.jpg'),
  },
  {
    id: 'proj-3',
    title: 'Serene Master Bedroom Suite',
    category: 'Master Suite Interior',
    year: '2024',
    location: 'Coastal Escarpment',
    imageSrc: getAssetUrl('images/project-3.jpg'),
  },
  {
    id: 'proj-4',
    title: 'Lumina Contemporary Gallery',
    category: 'Curated Dining Interior',
    year: '2023',
    location: 'Civic Cultural Center',
    imageSrc: getAssetUrl('images/project-4.jpg'),
  },
  {
    id: 'proj-5',
    title: 'The Japandi Courtyard Suite',
    category: 'Minimalist Interior',
    year: '2023',
    location: 'Urban Sanctuary',
    imageSrc: getAssetUrl('images/project-5.jpg'),
  },
  {
    id: 'proj-6',
    title: 'Solstice Gourmet Kitchen & Bar',
    category: 'Luxury Kitchen Interior',
    year: '2022',
    location: 'Lakeside Ridge',
    imageSrc: getAssetUrl('images/project-6.jpg'),
  },
];

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
    description: 'Continues to deliver bespoke bungalows and residences with a focus on detail and finish.',
    tags: ['The Aviraat Bungalows', 'HaxSmapur', 'Shilp Residency', 'Celestial'],
  },
  {
    id: 'milestone-3',
    date: '2026',
    title: 'Beyond Homes: Healthcare & Workspaces',
    description: 'Expands into commercial and healthcare design, shaping hospitals and a modern IT office.',
    tags: ['Blissmother Hospital', 'Auromax Hospital', 'IT Office, Times Square Grand'],
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

export const teamMembersData: TeamMember[] = [
  { id: 'team-1', name: 'Jagdish Narigara', role: 'Principal Interior Designer & Founder', specialty: 'Interior Vision & Space Planning' },
  { id: 'team-2', name: 'Aarav Mehta', role: 'Senior 3D Visualizer & Rendering Lead', specialty: 'Photorealistic Rendering & Walkthroughs' },
  { id: 'team-3', name: 'Simran Roy', role: 'Senior Space Planning Specialist', specialty: 'Ergonomic Layouts & Interior Flow' },
  { id: 'team-4', name: 'Rohan Verma', role: 'Lead Technical Drafter', specialty: '2D CAD Drafting & Interior Elevations' },
  { id: 'team-5', name: 'Elena Chen', role: 'Lighting & Ceiling Consultant', specialty: 'Reflected Ceiling Plans & Ambiance' }
];

export const socialLinks: SocialLink[] = [
  { id: 'soc-ig', platform: 'Instagram', url: 'https://www.instagram.com/jagdishnarigara_arch' },
  { id: 'soc-fb', platform: 'Facebook', url: 'https://facebook.com' },
  { id: 'soc-li', platform: 'LinkedIn', url: 'https://www.linkedin.com/in/jagdish-narigara' },
  { id: 'soc-tw', platform: 'Twitter', url: 'https://x.com' },
];
