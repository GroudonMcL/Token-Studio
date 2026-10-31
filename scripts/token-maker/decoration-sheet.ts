// Renders every decoration (at its default snap point, with mirroring as it
// starts) on one sheet, for checking by eye like the frame and effect sheets.
// Uses the same renderer as the site.
//   npm run decoration-sheet -- out.png [size]
import { createCanvas } from '@napi-rs/canvas';
import { writeFileSync } from 'node:fs';
import { createDocument, DECORATIONS, newDecoration } from '../../src/token-maker/document/defaults';
import type { TokenDocument } from '../../src/token-maker/document/types';
import { setCanvasFactory } from '../../src/token-maker/image/processedArt';
import type { Ctx } from '../../src/token-maker/render/frameKit';
import { renderToken, type RenderSource } from '../../src/token-maker/render/render';
import { sampleArt } from '../../src/token-maker/render/sampleArt';

const out = process.argv[2] ?? 'decoration-sheet.png';
const size = Number(process.argv[3] ?? 220);
const make = (w: number, h: number) => createCanvas(w, h) as unknown as HTMLCanvasElement;
setCanvasFactory(make);

const cols = 6;
const label = 24;
const cells = DECORATIONS.length;
const rows = Math.ceil(cells / cols);
const sheet = createCanvas(cols * size, rows * (size + label));
const ctx = sheet.getContext('2d');
ctx.fillStyle = '#3a3d46';
ctx.fillRect(0, 0, sheet.width, sheet.height);
const art = sampleArt(make);

function cell(i: number, name: string, doc: TokenDocument, assets: Map<string, RenderSource>) {
  const x = (i % cols) * size;
  const y = Math.floor(i / cols) * (size + label);
  const c = createCanvas(size, size);
  renderToken(c.getContext('2d') as unknown as Ctx, doc, assets, size);
  ctx.drawImage(c, x, y + label);
  ctx.fillStyle = '#f0e6cc';
  ctx.font = '15px sans-serif';
  ctx.fillText(name, x + 8, y + 17);
}

DECORATIONS.forEach((info, i) => {
  const doc = createDocument();
  doc.art.assetId = 'asset:sample';
  doc.decorations = [newDecoration(info.kind, 'd')];
  cell(i, info.name, doc, new Map([['asset:sample', art]]));
});
writeFileSync(out, sheet.toBuffer('image/png'));
console.log(`Wrote ${out}`);
