// Makes the help pictures' goblins from the owner's True Goblin (public/sample/true-goblin.png):
//   true-goblin-mask.png  — white where the goblin is (its gradient background flood-filled away
//                           from the edges, stopping at its dark outline and at sudden colour changes);
//                           it stands in for the AI cut-out in the help pictures.
//   true-goblin-flat.png  — the goblin on flat white, for the flat-colour background removal pictures.
// Run with `npx tsx scripts/token-maker/true-goblin.ts` after the sample picture changes.
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { writeFileSync } from 'node:fs';

const OUT = 'scripts/token-maker/fixtures';

const img = await loadImage('public/sample/true-goblin.png');
const w = img.width;
const h = img.height;
const c = createCanvas(w, h);
const ctx = c.getContext('2d');
ctx.drawImage(img, 0, 0);
const px = ctx.getImageData(0, 0, w, h);
const d = px.data;

const lum = (i: number) => 0.3 * d[i * 4]! + 0.59 * d[i * 4 + 1]! + 0.11 * d[i * 4 + 2]!;
const dist = (a: number, b: number) => Math.abs(d[a * 4]! - d[b * 4]!) + Math.abs(d[a * 4 + 1]! - d[b * 4 + 1]!) + Math.abs(d[a * 4 + 2]! - d[b * 4 + 2]!);

// Background: reached from the top, left and right edges through light pixels whose colour changes only gently.
const bg = new Uint8Array(w * h);
const stack: number[] = [];
const seed = (i: number) => {
  if (!bg[i] && lum(i) > 90) {
    bg[i] = 1;
    stack.push(i);
  }
};
for (let x = 0; x < w; x++) seed(x);
for (let y = 0; y < h; y++) {
  seed(y * w);
  seed(y * w + w - 1);
}
while (stack.length) {
  const i = stack.pop()!;
  const x = i % w;
  const y = (i / w) | 0;
  for (const [nx, ny] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]] as const) {
    if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
    const j = ny * w + nx;
    if (!bg[j] && lum(j) > 90 && dist(i, j) < 40) {
      bg[j] = 1;
      stack.push(j);
    }
  }
}

// A soft edge: each pixel's alpha is the share of its 3×3 neighbourhood that is goblin.
const alpha = new Uint8ClampedArray(w * h);
for (let y = 0; y < h; y++)
  for (let x = 0; x < w; x++) {
    let n = 0;
    let t = 0;
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        const xx = x + dx;
        const yy = y + dy;
        if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
        t++;
        if (!bg[yy * w + xx]) n++;
      }
    alpha[y * w + x] = Math.round((n / t) * 255);
  }

const mask = createCanvas(w, h);
const mctx = mask.getContext('2d');
const m = mctx.createImageData(w, h);
for (let i = 0; i < w * h; i++) {
  m.data[i * 4] = m.data[i * 4 + 1] = m.data[i * 4 + 2] = alpha[i]!;
  m.data[i * 4 + 3] = 255;
}
mctx.putImageData(m, 0, 0);
writeFileSync(`${OUT}/true-goblin-mask.png`, mask.toBuffer('image/png'));

const flat = createCanvas(w, h);
const fctx = flat.getContext('2d');
const f = fctx.createImageData(w, h);
for (let i = 0; i < w * h; i++) {
  const a = alpha[i]! / 255;
  for (let k = 0; k < 3; k++) f.data[i * 4 + k] = Math.round(d[i * 4 + k]! * a + 251 * (1 - a));
  f.data[i * 4 + 3] = 255;
}
fctx.putImageData(f, 0, 0);
writeFileSync(`${OUT}/true-goblin-flat.png`, flat.toBuffer('image/png'));
console.log('Wrote', `${OUT}/true-goblin-mask.png`, 'and', `${OUT}/true-goblin-flat.png`);
