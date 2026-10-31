// Writes each candidate of a frame as a .framestudio.json file and draws a
// sheet of them beside the current frame:
//   npx tsx scripts/frame-studio/candidates/build.ts <frame> <outDir>
import '../napi';
import { createCanvas } from '@napi-rs/canvas';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createProject } from '../../../src/frame-studio/project/defaults';
import { serializeProject } from '../../../src/frame-studio/project/migrate';
import type { FrameProject } from '../../../src/frame-studio/project/types';
import type { Ctx } from '../../../src/frame-studio/render/canvas';
import { loadPictures } from '../../../src/frame-studio/render/pictures';
import { renderProject } from '../../../src/frame-studio/render/renderProject';
import { sampleArt } from '../../../src/frame-studio/engine/legacy/sampleArt';
import { registerShippedFonts } from '../nodeFonts';
import type { Candidate } from './kit';

registerShippedFonts();
const [frame, outDir] = process.argv.slice(2);
const mod = (await import(`./${frame}.ts`)) as { CURRENT: () => FrameProject; CANDIDATES: Candidate[] };
mkdirSync(outDir, { recursive: true });

const art = sampleArt((w, h) => createCanvas(w, h) as unknown as HTMLCanvasElement, 600);
async function draw(project: FrameProject, size: number, shape: string, file: string) {
  const c = createCanvas(size, size);
  const ctx = c.getContext('2d');
  await loadPictures(project);
  renderProject(ctx as unknown as Ctx, { ...project, stage: { ...project.stage, shape: shape as never, showArt: true } }, size, { cache: false, clear: true, art });
  writeFileSync(file, c.toBuffer('image/png'));
}

const entries: { id: string; name: string; pitch: string; project: FrameProject }[] = [
  { id: 'current', name: 'Current', pitch: 'As it is now.', project: mod.CURRENT() },
  ...mod.CANDIDATES.map((c) => {
    const p = createProject(c.layers(), c.name);
    return { id: c.id, name: c.name, pitch: c.pitch, project: { ...p, stage: { ...p.stage, ...c.stage } } };
  }),
];
for (const e of entries) {
  if (e.id !== 'current') writeFileSync(join(outDir, `${e.id}.framestudio.json`), serializeProject(e.project));
  await draw(e.project, 420, 'circle', join(outDir, `${e.id}.png`));
  await draw(e.project, 200, 'hexagon', join(outDir, `${e.id}-hex.png`));
  await draw(e.project, 120, 'circle', join(outDir, `${e.id}-small.png`));
}
writeFileSync(join(outDir, 'index.json'), JSON.stringify(entries.map(({ id, name, pitch }) => ({ id, name, pitch })), null, 1));
console.log(`${entries.length} → ${outDir}`);
