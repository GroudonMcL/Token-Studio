// @vitest-environment node
// Owner feedback: what would be cut off at the exported square's edge, decorations
// under the frame and the frame lit like the art, drawn with @napi-rs/canvas.
import { createCanvas } from '@napi-rs/canvas';
import { createDocument, newDecoration } from '../document/defaults';
import type { TokenDocument } from '../document/types';
import { setCanvasFactory } from '../image/processedArt';
import type { Ctx } from './frameKit';
import { findOverflow } from './overflow';
import { renderToken, type RenderSource } from './render';

const make = (w: number, h: number) => createCanvas(w, h) as unknown as HTMLCanvasElement;
setCanvasFactory(make);

function solid(color: string, w = 200, h = 200): RenderSource {
  const c = make(w, h);
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, w, h);
  return { image: c, width: w, height: h };
}

const ART = solid('#3a8a3a');
const assets = new Map([['art', ART]]);

/** A token with art, no shadow, no label and nothing reaching out. */
function base(): TokenDocument {
  const d = createDocument();
  return { ...d, art: { ...d.art, assetId: 'art' }, shadows: { ...d.shadows, outer: { ...d.shadows.outer, enabled: false } }, label: null, decorations: [] };
}

function draw(doc: TokenDocument, size = 200) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  renderToken(ctx as unknown as Ctx, doc, assets, size);
  const data = ctx.getImageData(0, 0, size, size).data;
  return (x: number, y: number) => {
    const i = (Math.round(y) * size + Math.round(x)) * 4;
    return [data[i]!, data[i + 1]!, data[i + 2]!, data[i + 3]!] as const;
  };
}

describe('cut off at the edge', () => {
  it('finds nothing on a plain token', () => {
    expect(findOverflow(base(), assets)).toEqual([]);
  });

  it('blames a big, far drop shadow when the token has no outer spacing', () => {
    const d = base();
    d.frame = { ...d.frame, outerSpacing: 0 };
    d.shadows = { ...d.shadows, outer: { ...d.shadows.outer, enabled: true, distance: 0.3, blur: 0.1, opacity: 1 } };
    expect(findOverflow(d, assets)).toEqual(['shadow']);
  });

  it('blames a decoration that sticks out past the square', () => {
    const d = base();
    d.decorations = [{ ...newDecoration('gem'), place: 'free', x: 0.98, y: 0, size: 0.6 }];
    expect(findOverflow(d, assets)).toContain('decorations');
  });
});

describe('decorations under the frame', () => {
  it('draws them before the frame, so the frame covers them', () => {
    const d = base();
    d.frame = { ...d.frame, thickness: 0.3, outerSpacing: 0.1 };
    const gem = { ...newDecoration('gem'), place: 'top' as const, size: 0.4, color: '#2040ff' };
    // The middle of the band at the top, where the gem sits.
    const over = draw({ ...d, decorations: [gem] })(100, 25);
    const under = draw({ ...d, decorations: [{ ...gem, underFrame: true }] })(100, 25);
    expect(over).not.toEqual(under);
    expect(under).toEqual(draw(d)(100, 25));
  });
});

describe('light the frame', () => {
  it('changes the frame only when switched on, and leaves the art alone', () => {
    const d = base();
    d.lighting = { ...d.lighting, enabled: false, strength: 80, falloff: 80, direction: 0 };
    const off = draw(d);
    const on = draw({ ...d, lighting: { ...d.lighting, frame: true } });
    // The far side of the frame (left, away from a light on the right) gets darker.
    const farOff = off(17, 100);
    const farOn = on(17, 100);
    expect(farOn[3]).toBe(farOff[3]);
    expect(farOn[0] + farOn[1] + farOn[2]).toBeLessThan(farOff[0] + farOff[1] + farOff[2]);
    // The art in the middle is untouched.
    expect(on(100, 100)).toEqual(off(100, 100));
    // Corners outside the round frame stay see-through.
    expect(on(2, 2)[3]).toBe(0);
  });
});
