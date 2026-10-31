// Draws each built-in version that lights its whole band with a bevel beside
// the same design shaded with gradient bands (houseStyle.ts: bandShading):
//   npx tsx scripts/frame-studio/shading-compare.ts <outDir>
import './napi';
import { createCanvas } from '@napi-rs/canvas';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { BUILT_IN_FRAMES } from '../../src/frame-studio/project/builtInFrames';
import { bandShading } from '../../src/frame-studio/project/houseStyle';
import type { FrameProject, Layer } from '../../src/frame-studio/project/types';
import type { Ctx } from '../../src/frame-studio/render/canvas';
import { loadPictures } from '../../src/frame-studio/render/pictures';
import { renderProject } from '../../src/frame-studio/render/renderProject';
import { sampleArt } from '../../src/frame-studio/engine/legacy/sampleArt';
import { registerShippedFonts } from './nodeFonts';

registerShippedFonts();
const out = process.argv[2];
mkdirSync(out, { recursive: true });
const art = sampleArt((w, h) => createCanvas(w, h) as unknown as HTMLCanvasElement, 600);
const fullBevel = (l: Layer) => l.type === 'bandFill' && l.from <= 0.02 && l.to >= 0.98 && l.effects.some((e) => e.kind === 'bevel');
const shaded = (l: Layer) => l.name === 'Pressed-in shading' || l.name === 'Shading';

async function draw(p: FrameProject, size: number, shape: string, file: string) {
  const c = createCanvas(size, size);
  await loadPictures(p);
  renderProject(c.getContext('2d') as unknown as Ctx, { ...p, stage: { ...p.stage, shape: shape as never, showArt: true } }, size, { cache: false, clear: true, art });
  writeFileSync(file, c.toBuffer('image/png'));
}

const list: { id: string; name: string; inApp: boolean }[] = [];
for (const f of BUILT_IN_FRAMES) {
  if (f.group === 'Essentials' || f.group === 'Crafted') continue;
  const p = f.project();
  const inApp = p.layers.some(shaded);
  if (!inApp && !p.layers.some(fullBevel)) continue;
  const before = inApp ? null : p;
  const after = inApp ? p : { ...p, layers: bandShading(p.layers, { step: 0.55 }) };
  if (before) await draw(before, 420, 'circle', join(out, `${f.id}-before.png`));
  await draw(after, 420, 'circle', join(out, `${f.id}-after.png`));
  await draw(after, 200, 'hexagon', join(out, `${f.id}-after-hex.png`));
  list.push({ id: f.id, name: f.name, inApp });
}
writeFileSync(join(out, 'index.json'), JSON.stringify(list, null, 1));
console.log(list.length, 'versions');
