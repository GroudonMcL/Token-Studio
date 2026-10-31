// Draws the Crafted frames as they are now, side by side.
import '../napi';
import { createCanvas } from '@napi-rs/canvas';
import { writeFileSync } from 'node:fs';
import { BUILT_IN_FRAMES } from '../../../src/frame-studio/project/builtInFrames';
import type { Ctx } from '../../../src/frame-studio/render/canvas';
import { loadPictures } from '../../../src/frame-studio/render/pictures';
import { renderProject } from '../../../src/frame-studio/render/renderProject';
import { sampleArt } from '../../../src/frame-studio/engine/legacy/sampleArt';
import { registerShippedFonts } from '../nodeFonts';
registerShippedFonts();
const art = sampleArt((w, h) => createCanvas(w, h) as unknown as HTMLCanvasElement, 600);
const fs = BUILT_IN_FRAMES.filter((f) => f.group === 'Crafted');
const c = createCanvas(300 * fs.length, 300);
for (const [i, f] of fs.entries()) {
  const p = f.project(); await loadPictures(p);
  const t = createCanvas(300, 300);
  renderProject(t.getContext('2d') as unknown as Ctx, { ...p, stage: { ...p.stage, showArt: true } }, 300, { cache: false, clear: true, art });
  c.getContext('2d').drawImage(t, i * 300, 0);
}
writeFileSync(process.argv[2], c.toBuffer('image/png'));
