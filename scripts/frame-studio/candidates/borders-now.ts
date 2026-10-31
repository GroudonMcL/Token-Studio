// Draws Frame Studio's Crafted borders as they are now, side by side (round and hexagon).
import '../napi';
import { createCanvas } from '@napi-rs/canvas';
import { writeFileSync } from 'node:fs';
import { CRAFTED_TEMPLATES } from '../../../src/frame-studio/project/craftedTemplates';
import type { Ctx } from '../../../src/frame-studio/render/canvas';
import { loadPictures } from '../../../src/frame-studio/render/pictures';
import { renderProject } from '../../../src/frame-studio/render/renderProject';
import { sampleArt } from '../../../src/frame-studio/engine/legacy/sampleArt';
import { registerShippedFonts } from '../nodeFonts';
import { border } from './crafted';
registerShippedFonts();
const art = sampleArt((w, h) => createCanvas(w, h) as unknown as HTMLCanvasElement, 600);
const c = createCanvas(300 * CRAFTED_TEMPLATES.length, 600);
for (const [i, t] of CRAFTED_TEMPLATES.entries()) {
  const p = border(t.id)(); await loadPictures(p);
  for (const [row, shape] of ['circle', 'hexagon'].entries()) {
    const k = createCanvas(300, 300);
    renderProject(k.getContext('2d') as unknown as Ctx, { ...p, stage: { ...p.stage, shape: shape as never, showArt: true } }, 300, { cache: false, clear: true, art });
    c.getContext('2d').drawImage(k, i * 300, row * 300);
  }
}
writeFileSync(process.argv[2], c.toBuffer('image/png'));
