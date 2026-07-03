import fs from 'fs';
import path from 'path';

const framesDir = path.resolve('public', 'frames');
const frameCount = 120;
const width = 1920;
const height = 1080;

// Ensure directory exists
if (!fs.existsSync(framesDir)) {
  fs.mkdirSync(framesDir, { recursive: true });
}

console.log(`Generating ${frameCount} SVG frames...`);

for (let i = 0; i < frameCount; i++) {
  const progress = i / (frameCount - 1);
  
  // Create an abstract animation: A circle moving across and changing color
  const cx = width * 0.2 + (width * 0.6 * progress);
  const cy = height / 2 + Math.sin(progress * Math.PI * 2) * 200;
  
  const r = 200 + Math.sin(progress * Math.PI * 4) * 100;
  
  // Color shifting from orange to blue
  const rColor = Math.round(255 * (1 - progress));
  const gColor = Math.round(100 * (1 - Math.abs(progress - 0.5) * 2));
  const bColor = Math.round(255 * progress);
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#0a0a0a"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="rgb(${rColor},${gColor},${bColor})" opacity="0.8"/>
  <text x="${width/2}" y="${height/2}" font-family="sans-serif" font-size="100" font-weight="bold" fill="white" opacity="0.1" text-anchor="middle" dominant-baseline="middle">FRAME ${String(i).padStart(4, '0')}</text>
</svg>`;

  const filename = `frame_${String(i).padStart(4, '0')}.svg`;
  fs.writeFileSync(path.join(framesDir, filename), svg);
}

console.log('Done!');
