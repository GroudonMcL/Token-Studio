// Shared bits for the Themed candidates (round 2).
import {
  across, bandFillLayer, bandShading, base, bevel, blur, contact, DROP, glow, lin, metalFx, photo, recolour, repeatLayer, textureLayer,
  fractureLayer, type Layer,
} from './common';
import { groupLayer } from '../../../src/frame-studio/project/defaults';

/** A photo band recoloured and shaded with the twin gradient bands. */
export const photoBand = (name: string, picture: Parameters<typeof photo>[0], stops: string[] | null, o: { scale?: number; step?: number | null; angle?: number } = {}): Layer[] =>
  bandShading([{ ...bandFillLayer(), name, paint: photo(picture, o.scale ?? 1.4, { lighting: 0.3, angle: o.angle ?? 0 }), effects: [...(stops ? [recolour(stops)] : []), DROP] }], { step: o.step === undefined ? 0.6 : o.step });
/** Plates that bend with the ring: a ring with radial gaps cut out of it. */
export const curvedPlates = (name: string, count: number, fill: string, effects: Layer['effects'], o: { from?: number; to?: number; gap?: number; offset?: number } = {}): Layer => {
  const from = o.from ?? 0.1, to = o.to ?? 0.9;
  return {
    ...groupLayer([
      { ...bandFillLayer(), name: 'Plate ring', from, to, paint: { kind: 'solid', color: fill } },
      { ...repeatLayer(), name: 'Gaps', element: 'square', count, snapToCorners: false, at: (from + to) / 2, offset: o.offset ?? 0, size: (to - from) * 1.3, stretch: (o.gap ?? 0.08) / ((to - from) * 1.3), fill: '#000000', raised: false, shaded: false },
    ]),
    name, combine: 'subtract', effects,
  };
};
/** A ring of shapes round the band. */
export const ring = (name: string, element: string, count: number, fill: string, effects: Layer['effects'], o: Partial<Layer & { at: number; size: number; stretch: number; offset: number; altColors: string[]; altSizes: number[]; jitterAngle: number; jitterSize: number; wander: number; seed: number; rotation: number; show: boolean[] }> = {}): Layer =>
  ({ ...repeatLayer(), name, element: element as never, count, snapToCorners: false, at: 0.5, size: 0.5, fill, raised: false, effects, ...(o as object) }) as Layer;
/** Forked lightning across the band, glowing. */
export const lightning = (color: string, glowColor: string, seed = 0x11e7): Layer => ({
  ...fractureLayer(), kind: 'lightning', name: 'Lightning', from: 0.1, to: 0.9, count: 5, length: 1.4, branching: 0.6, jagged: 0.8, width: 0.025, color, seed, effects: [glow({ color: glowColor, opacity: 0.9, size: 0.1 })],
});
export { across, bandFillLayer, base, bevel, blur, contact, DROP, glow, lin, metalFx, photo, recolour, textureLayer };
