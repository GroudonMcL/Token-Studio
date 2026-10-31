// Draws every frame Token Maker lists (built-in designs and drawn frames, minus the retired ones) as
// labelled contact sheets: one sheet per frame with its new versions beside it, for the frame review.
//   npx tsx scripts/frame-studio/gallery.ts <outDir>
import './napi';
import { createCanvas } from '@napi-rs/canvas';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { FRAME_PRESETS } from '../../src/frame-studio/engine/legacy/catalog';
import { BUILT_IN_FRAMES, RETIRED_FRAMES } from '../../src/frame-studio/project/builtInFrames';
import { projectFromFrame } from '../../src/frame-studio/project/defaults';
import type { FrameProject } from '../../src/frame-studio/project/types';
import type { Ctx } from '../../src/frame-studio/render/canvas';
import { loadPictures } from '../../src/frame-studio/render/pictures';
import { renderProject } from '../../src/frame-studio/render/renderProject';
import { sampleArt } from '../../src/frame-studio/engine/legacy/sampleArt';
import { registerShippedFonts } from './nodeFonts';

registerShippedFonts();
const out = process.argv[2];
mkdirSync(out, { recursive: true });
const art = sampleArt((w, h) => createCanvas(w, h) as unknown as HTMLCanvasElement, 600);
const RETIRED_PRESETS = new Set(['cleric']);
const TILE = 200, LABEL = 34, PER_ROW = 6;

interface Item { name: string; project: () => FrameProject; original?: boolean }
interface Sheet { id: string; group: string; title: string; items: Item[] }
const sheets: Sheet[] = [];
const ess = BUILT_IN_FRAMES.filter((f) => f.group === 'Essentials');
sheets.push({ id: 'essentials', group: 'Essentials', title: 'Essentials', items: ess.map((f) => ({ name: f.name, project: f.project })) });
for (const p of FRAME_PRESETS) {
  if (p.id === 'none') continue;
  const versions = BUILT_IN_FRAMES.filter((f) => f.after === p.id);
  const items: Item[] = [...(RETIRED_PRESETS.has(p.id) ? [] : [{ name: p.name, project: () => projectFromFrame(p.id), original: true }]), ...versions.map((f) => ({ name: f.name, project: f.project }))];
  if (items.length) sheets.push({ id: p.id, group: p.group, title: p.name, items });
}
for (const f of BUILT_IN_FRAMES.filter((b) => b.group !== 'Essentials' && !b.after)) {
  const versions = BUILT_IN_FRAMES.filter((v) => v.after === f.id);
  const items: Item[] = [...(RETIRED_FRAMES.has(f.id) ? [] : [{ name: f.name, project: f.project, original: true }]), ...versions.map((v) => ({ name: v.name, project: v.project }))];
  if (items.length) sheets.push({ id: f.id, group: 'Crafted', title: f.name, items });
}

for (const s of sheets) {
  const cols = Math.min(PER_ROW, s.items.length), rows = Math.ceil(s.items.length / PER_ROW);
  const c = createCanvas(cols * TILE, rows * (TILE + LABEL));
  const ctx = c.getContext('2d');
  for (const [i, it] of s.items.entries()) {
    const p = it.project();
    await loadPictures(p);
    const t = createCanvas(TILE, TILE);
    renderProject(t.getContext('2d') as unknown as Ctx, { ...p, stage: { ...p.stage, showArt: true } }, TILE, { cache: false, clear: true, art });
    const x = (i % PER_ROW) * TILE, y = Math.floor(i / PER_ROW) * (TILE + LABEL);
    ctx.drawImage(t, x, y);
    ctx.fillStyle = it.original ? '#e8c87a' : '#e6e8ee';
    ctx.font = '600 15px "Atkinson Hyperlegible", sans-serif';
    ctx.textAlign = 'center';
    const label = it.name.length > 24 ? it.name.slice(0, 23) + '…' : it.name;
    ctx.fillText(label, x + TILE / 2, y + TILE + 22);
  }
  writeFileSync(join(out, `${s.id}.png`), c.toBuffer('image/png'));
}
writeFileSync(join(out, 'index.json'), JSON.stringify(sheets.map((s) => ({ id: s.id, group: s.group, title: s.title, count: s.items.length, names: s.items.map((i) => i.name) })), null, 1));
console.log(sheets.length, 'sheets,', sheets.reduce((n, s) => n + s.items.length, 0), 'frames');
