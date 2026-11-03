import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const sourceDir = '/Users/soumya.m/Downloads/3D RENDER FOR PORTFOLIO';

// Natural sort comparator
const naturalCompare = (a, b) => {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
};

const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
const subdirs = entries
  .filter((e) => e.isDirectory() && !e.name.startsWith('.'))
  .map((e) => e.name)
  .sort(naturalCompare);

console.log(`Found ${subdirs.length} subfolders:`, subdirs);

for (const dirName of subdirs) {
  const dirPath = path.join(sourceDir, dirName);
  const files = fs
    .readdirSync(dirPath)
    .filter((f) => !f.startsWith('.') && /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
    .sort(naturalCompare);

  console.log(`\nFolder: ${dirName} (${files.length} images)`);
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const meta = await sharp(filePath).metadata();
    const stats = fs.statSync(filePath);
    console.log(`  - ${file}: ${meta.width}x${meta.height}, ${(stats.size / 1024 / 1024).toFixed(2)} MB, format: ${meta.format}`);
  }
}

