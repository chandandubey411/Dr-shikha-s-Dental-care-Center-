import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const INPUT_DIR  = path.join(__dirname, 'public/images/personal_pics');
const OUTPUT_DIR = path.join(__dirname, 'public/images/personal_pics_compressed');

// Create output dir if not exists
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const exts = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];
const files = fs.readdirSync(INPUT_DIR).filter(f => exts.includes(path.extname(f)));

let totalOriginal = 0;
let totalCompressed = 0;

console.log(`\n🦷 Compressing ${files.length} gallery images → WebP (quality 75, max 1400px)\n`);

for (const file of files) {
  const inputPath  = path.join(INPUT_DIR, file);
  const baseName   = path.parse(file).name;
  const outputPath = path.join(OUTPUT_DIR, `${baseName}.webp`);

  const origSize = fs.statSync(inputPath).size;
  totalOriginal += origSize;

  await sharp(inputPath)
    .resize({ width: 1400, withoutEnlargement: true })  // max 1400px wide
    .webp({ quality: 75 })
    .toFile(outputPath);

  const newSize = fs.statSync(outputPath).size;
  totalCompressed += newSize;

  const pct = (((origSize - newSize) / origSize) * 100).toFixed(1);
  console.log(
    `  ✅ ${file.padEnd(22)} ${(origSize/1024/1024).toFixed(2)} MB  →  ${(newSize/1024).toFixed(0)} KB  (${pct}% smaller)`
  );
}

console.log(`\n📦 Total:  ${(totalOriginal/1024/1024).toFixed(1)} MB  →  ${(totalCompressed/1024/1024).toFixed(1)} MB`);
console.log(`💾 Saved:  ${((totalOriginal-totalCompressed)/1024/1024).toFixed(1)} MB  (${(((totalOriginal-totalCompressed)/totalOriginal)*100).toFixed(1)}% reduction)\n`);
console.log('✨ Done! Compressed images saved to: public/images/personal_pics_compressed/\n');
