import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const sourceDir = process.env.SOURCE_DIR || '/Users/soumya.m/Downloads/3D RENDER FOR PORTFOLIO';
const publicPortfolioDir = path.resolve(process.cwd(), 'public/portfolio');
const manifestPath = path.resolve(process.cwd(), 'src/data/portfolioProjects.generated.ts');

// Natural sort comparator (handles numbers naturally: 2 before 10)
const naturalCompare = (a, b) => {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
};

// Curated project metadata grounded strictly in the visual render contents
const projectMetadata = {
  '01': {
    title: 'The Amber Horizon Lounge',
    category: 'Contemporary Living Interior',
    tagline: 'Fluted timber paneling and marble console illuminated by warm perimeter glow.',
    imageDescriptions: [
      'Living lounge TV feature wall with custom curved vitrines and low marble console',
      'Living and dining transition framed by arched glass partition and marble dining table',
      'Dining area showcasing six upholstered sculptural chairs and white marble table',
      'Close-up detail of illuminated curved display vitrine with decorative art ceramics',
      'Full wide-angle view of living space highlighting coved ceiling and ambient strip lighting',
      'Sectional sofa perspective facing the wood-paneled entertainment feature wall',
      'Arched entry view from living area toward dining salon and kitchen corridor',
    ],
  },
  '02': {
    title: 'Verdant Marble Living Salon',
    category: 'Luxury Living Room Interior',
    tagline: 'Bookmatched green marble feature wall balanced by sculpted velvet seating.',
    imageDescriptions: [
      'Frontal view of bookmatched green marble TV wall flanked by dark fluted paneling',
      'Wide perspective featuring wireframe ribbon chandelier and open-plan kitchen counter',
      'Intimate lounge seating zone with deep forest-green armchairs and marble coffee tables',
      'Kitchen bar transition highlighting backlit glass cabinets and marble waterfall counter',
      'Corridor perspective showing floor-to-ceiling fluted wood panels and brass reveals',
    ],
  },
  '03': {
    title: 'The Urban Modular Kitchen',
    category: 'Modern Kitchen Interior',
    tagline: 'Matte charcoal cabinetry paired with a waterfall marble breakfast counter.',
    imageDescriptions: [
      'Front elevation of U-shaped matte charcoal cabinetry with integrated appliances and marble bar',
      'Angled viewpoint highlighting waterfall grey marble breakfast counter and counter stool',
      'Close perspective of under-cabinet illumination, quartz backsplash, and gas hob',
    ],
  },
  '04': {
    title: 'The Terracotta Suede Suite',
    category: 'Master Bedroom Interior',
    tagline: 'Layered camel acoustic wall panels complemented by warm drop pendants.',
    imageDescriptions: [
      'Frontal perspective of upholstered bed against camel suede horizontal paneling',
      'Perspective view showing integrated study desk and floating display shelves',
      'Angled viewpoint highlighting brass vertical reveal strips and textured acoustic fabric',
      'Bedside table detail with amber glass pendant light and indoor planter',
    ],
  },
  '05': {
    title: 'The Charcoal Oak Sanctuary',
    category: 'Luxury Bedroom Interior',
    tagline: 'Curved backlit headboard alcove set against deep charcoal fluted woodwork.',
    imageDescriptions: [
      'Front elevation of curved backlit headboard alcove with teardrop glass pendants',
      'Perspective with end-of-bed bench seat, burnt-orange throw, and fluted paneling',
      'Angle toward floor-to-ceiling sheer drapery and polished marble floor reflections',
      'Bedside detail showing fluted timber paneling and rounded marble nightstand',
    ],
  },
  '06': {
    title: 'Onyx & Olive Bedroom Suite',
    category: 'Contemporary Bedroom Interior',
    tagline: 'Matte olive panels accented with black-gold veined marble and integrated wardrobes.',
    imageDescriptions: [
      'Front view of headboard with vertical black-gold marble slab and matte olive panels',
      'Perspective displaying full-height built-in wardrobe wall in textured walnut finish',
      'Angled perspective showcasing soft tray ceiling illumination and upholstered bed',
    ],
  },
  '07': {
    title: 'The Travertine Haven Suite',
    category: 'Master Bedroom Suite',
    tagline: 'Backlit travertine stone niche with integrated fluted millwork and makeup vanity.',
    imageDescriptions: [
      'Front elevation of backlit travertine stone niche, cognac upholstered bed, and vanity',
      'Close perspective of curved makeup dressing table, mirror, and rounded stool',
      'Wide perspective showing floor-to-ceiling lacquered wardrobes and gold ceiling moulding',
    ],
  },
  '08': {
    title: 'Geometric Wave Bedroom',
    category: 'Boutique Bedroom Interior',
    tagline: 'Sculptural geometric wall reliefs paired with a rich rust-leather bed.',
    imageDescriptions: [
      'Frontal elevation of debossed geometric wall tiles and backlit metallic wave panel',
      'Close-up view of sculptural ribbed white pendant light and rust leather winged bed',
      'Perspective highlighting sheer curtain filtration and fluted wardrobe panels',
    ],
  },
  '09': {
    title: 'Champagne & Glass Suite',
    category: 'Luxury Master Bedroom',
    tagline: 'Recessed classical molding framed by smoked glass vitrines and brass sconces.',
    imageDescriptions: [
      'Front elevation of multi-layered headboard molding with perimeter cove lighting',
      'Perspective showcasing full-height smoked glass wardrobe closet with interior lighting',
      'Bedside detail showing black marble vertical insets and minimalist brass linear sconces',
    ],
  },
};

// Slugify helper
const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

async function run() {
  console.log(`Starting Portfolio Asset Processing...`);
  console.log(`Source directory: ${sourceDir}`);
  console.log(`Output directory: ${publicPortfolioDir}`);

  if (!fs.existsSync(sourceDir)) {
    console.error(`ERROR: Source directory not found: ${sourceDir}`);
    process.exit(1);
  }

  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
  const subdirs = entries
    .filter((e) => e.isDirectory() && !e.name.startsWith('.'))
    .map((e) => e.name)
    .sort(naturalCompare);

  if (subdirs.length !== 9) {
    console.warn(`WARNING: Expected exactly 9 project folders, found ${subdirs.length}:`, subdirs);
  } else {
    console.log(`Discovered 9 project folders in natural order:`, subdirs);
  }

  // Ensure output directory exists
  fs.mkdirSync(publicPortfolioDir, { recursive: true });

  let totalSourceBytes = 0;
  let totalOptimizedBytes = 0;
  const projectsData = [];

  for (let folderIdx = 0; folderIdx < subdirs.length; folderIdx++) {
    const folderName = subdirs[folderIdx];
    const folderPath = path.join(sourceDir, folderName);
    const meta = projectMetadata[folderName] || {
      title: `Project ${folderName}`,
      category: 'Interior Design',
      tagline: 'Curated interior space designed with precision 3D visualization.',
      imageDescriptions: [],
    };

    const slug = slugify(meta.title);
    const projectOutDir = path.join(publicPortfolioDir, slug);
    fs.mkdirSync(projectOutDir, { recursive: true });

    const files = fs
      .readdirSync(folderPath)
      .filter((f) => !f.startsWith('.') && /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
      .sort(naturalCompare);

    console.log(`\nProcessing Folder [${folderName}] -> ${slug} (${files.length} images)...`);

    const projectImages = [];
    let coverImagePath = '';

    for (let imgIdx = 0; imgIdx < files.length; imgIdx++) {
      const fileName = files[imgIdx];
      const filePath = path.join(folderPath, fileName);
      const fileStats = fs.statSync(filePath);
      totalSourceBytes += fileStats.size;

      const baseName = `img-${String(imgIdx + 1).padStart(2, '0')}`;
      const largeFileName = `${baseName}-large.webp`;
      const thumbFileName = `${baseName}-thumb.webp`;

      const largeOutPath = path.join(projectOutDir, largeFileName);
      const thumbOutPath = path.join(projectOutDir, thumbFileName);

      // Generate large modal view (max 1920x1920)
      const largeInfo = await sharp(filePath)
        .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 84 })
        .toFile(largeOutPath);
      totalOptimizedBytes += largeInfo.size;

      // Generate thumbnail (max 320x320)
      const thumbInfo = await sharp(filePath)
        .resize(320, 320, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(thumbOutPath);
      totalOptimizedBytes += thumbInfo.size;

      // If it's the first image, also generate card cover (max 1200x1200)
      if (imgIdx === 0) {
        const coverFileName = 'cover.webp';
        const coverOutPath = path.join(projectOutDir, coverFileName);
        const coverInfo = await sharp(filePath)
          .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 82 })
          .toFile(coverOutPath);
        totalOptimizedBytes += coverInfo.size;
        coverImagePath = `portfolio/${slug}/${coverFileName}`;
      }

      const altDesc = meta.imageDescriptions[imgIdx] || `${meta.title} render view ${imgIdx + 1}`;
      const captionText = meta.imageDescriptions[imgIdx] || '';

      projectImages.push({
        src: `portfolio/${slug}/${largeFileName}`,
        thumbSrc: `portfolio/${slug}/${thumbFileName}`,
        width: largeInfo.width,
        height: largeInfo.height,
        alt: `${meta.title}, view ${imgIdx + 1} of ${files.length}: ${altDesc}`,
        caption: captionText,
      });
    }

    projectsData.push({
      id: `proj-${folderIdx + 1}`,
      slug,
      title: meta.title,
      category: meta.category,
      tagline: meta.tagline,
      // [Year] TODO: Add exact completion year once provided by client
      year: undefined,
      // [Location] TODO: Add project location once provided by client
      location: undefined,
      imageSrc: coverImagePath,
      images: projectImages,
    });
  }

  // Generate TypeScript Manifest
  const manifestContent = `/**
 * AUTO-GENERATED PORTFOLIO PROJECTS MANIFEST
 * Generated on: ${new Date().toISOString()}
 * Re-run generator via: npm run generate:portfolio
 */

import { ProjectItem } from '../types';
import { getAssetUrl } from '../utils/assetUrl';

export const portfolioProjects: ProjectItem[] = [
${projectsData
  .map(
    (p) => `  {
    id: '${p.id}',
    slug: '${p.slug}',
    title: ${JSON.stringify(p.title)},
    category: ${JSON.stringify(p.category)},
    tagline: ${JSON.stringify(p.tagline)},
    // [Year] TODO: Add exact completion year once provided by client
    year: undefined,
    // [Location] TODO: Add project location once provided by client
    location: undefined,
    imageSrc: getAssetUrl('${p.imageSrc}'),
    images: [
${p.images
  .map(
    (img) => `      {
        src: getAssetUrl('${img.src}'),
        thumbSrc: getAssetUrl('${img.thumbSrc}'),
        width: ${img.width},
        height: ${img.height},
        alt: ${JSON.stringify(img.alt)},
        caption: ${JSON.stringify(img.caption)},
      },`
  )
  .join('\n')}
    ],
  },`
  )
  .join('\n')}
];
`;

  fs.writeFileSync(manifestPath, manifestContent, 'utf-8');
  console.log(`\nManifest written to: ${manifestPath}`);

  const sourceMB = (totalSourceBytes / 1024 / 1024).toFixed(2);
  const optimizedMB = (totalOptimizedBytes / 1024 / 1024).toFixed(2);
  const savingsPercent = (((totalSourceBytes - totalOptimizedBytes) / totalSourceBytes) * 100).toFixed(1);

  console.log(`\n========================================`);
  console.log(`OPTIMIZATION SUMMARY`);
  console.log(`========================================`);
  console.log(`Total Source Assets:    ${sourceMB} MB`);
  console.log(`Total Optimized WebP:   ${optimizedMB} MB`);
  console.log(`Bandwidth Saved:        ${savingsPercent}% reduction`);
  console.log(`Projects Processed:     ${projectsData.length}`);
  console.log(`Total Image Views:      ${projectsData.reduce((acc, p) => acc + p.images.length, 0)}`);
  console.log(`========================================\n`);
}

run().catch((err) => {
  console.error('Fatal error during portfolio generation:', err);
  process.exit(1);
});

