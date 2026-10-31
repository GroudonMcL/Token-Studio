// Round 3 trials: curved riveted plates, and overlapping-row dragon scales with gradient bands clipped to the scales.
import { shadow } from '../../../src/frame-studio/project/styles';
import { bandFillLayer, bandShading, BRONZE_STOPS, contact, DROP, lin, lineLayer, metalFx, photo, recolour, repeatLayer, slot, WARM_GOLD, glow, type Candidate, type Layer } from './common';
import { groupLayer } from '../../../src/frame-studio/project/defaults';
import { border } from './crafted';

export const CURRENT = border('riveted-plates');

/** Plates that bend with the ring: one ring with radial gaps cut out of it. */
export const curvedPlates = (name: string, count: number, fill: string, stops: string[], o: { from?: number; to?: number; gap?: number } = {}): Layer => ({
  ...groupLayer([
    { ...bandFillLayer(), name: 'Plate ring', from: o.from ?? 0.1, to: o.to ?? 0.9, paint: { kind: 'solid', color: fill } },
    { ...repeatLayer(), name: 'Gaps', element: 'square', count, snapToCorners: false, at: 0.5, size: 1.2, stretch: o.gap ?? 0.07, fill: '#000000', raised: false, shaded: false },
  ]),
  name, combine: 'subtract', effects: [...metalFx(stops, 0.12, 0.6), contact(0.8)],
});
const rivets = (name: string, at: number, count: number, fill: string, stops: string[]): Layer => ({
  ...repeatLayer(), name, element: 'bead', count, snapToCorners: false, at, size: 0.09, fill, raised: true, effects: [...metalFx(stops, 0.6, 0.8), contact(0.7)],
});
const ironRing = (stops: string[]): Layer[] =>
  bandShading([{ ...bandFillLayer(), name: 'Iron ring', paint: photo('metal-plate', 1.4, { lighting: 0.3 }), effects: [recolour(stops), DROP] }], { step: null });

/** Overlapping rows of outlined scales, each offset half a scale, clipped to the band. */
const scaleRows = (color: string, outline: string, lay: 'serpent' | 'armour' = 'serpent', effects: Layer['effects'] = [contact(0.7)], outlineWidth = 0.06): Layer => {
  const serpent = lay === 'serpent';
  const n = serpent ? 4 : 3;
  return {
    ...groupLayer(Array.from({ length: n }, (_v, r) => ({
      ...repeatLayer(), name: 'Scale row', element: 'drop' as const, mode: 'spacing' as const, spacing: serpent ? 0.42 : 0.5, at: 0.2 + (r * 0.6) / (n - 1), size: serpent ? 0.6 : 0.8,
      rotation: serpent ? 90 : 180, offset: r % 2 ? 0.5 : 0, fill: color, clip: 'band' as const, outline, outlineWidth, raised: false, shaded: true, effects,
    }))),
    name: 'Scales',
  };
};
/** The twin gradient bands, only on the scales (clipped to the layer below). */
const scaleShading = (strength = 0.75): Layer => ({
  ...groupLayer([
    { ...bandFillLayer(), name: 'Shading', paint: lin(['#ffffff', '#000000']) },
    { ...bandFillLayer(), name: 'Pressed-in shading', from: 0.55, paint: lin(['#000000', '#ffffff']) },
    { ...lineLayer(), name: 'Crease', at: 0.55, width: 0.03, paint: { kind: 'solid', color: '#000000' }, opacity: 0.6 },
  ]),
  name: 'Scale shading', blend: 'overlay', opacity: strength, clip: 'below',
});
const under = (color: string): Layer => ({ ...bandFillLayer(), name: 'Under', paint: { kind: 'solid', color }, effects: [DROP] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'p-curved-bulwark', name: 'P · Curved bulwark', pitch: '', stage: { thickness: 0.24, outerSpacing: 0.02 },
    colours: [slot('bronze', 'Plate colour', '#a87a3a', ['Plates'])],
    layers: () => [
      ...ironRing(['#020203', '#0e1014', '#3a3e46', '#6a707a', '#a8b0b8']),
      curvedPlates('Plates', 12, '#a87a3a', BRONZE_STOPS),
      rivets('Rivets', 0.24, 24, '#d8a838', WARM_GOLD),
      rivets('Rivets', 0.76, 24, '#d8a838', WARM_GOLD),
    ],
  },
  {
    id: 'q-serpent', name: 'Q · Serpent', pitch: '', stage: { thickness: 0.18 },
    layers: () => [under('#061004'), scaleRows('#3a8a2a', '#061004'), scaleShading()],
  },
  {
    id: 'r-armour', name: 'R · Armour', pitch: '', stage: { thickness: 0.18 },
    layers: () => [under('#1a0202'), scaleRows('#c8322a', '#1a0202', 'armour'), scaleShading()],
  },
  {
    id: 's-gold', name: 'S · Gold', pitch: '', stage: { thickness: 0.18 },
    layers: () => [under('#1a0e02'), scaleRows('#d8a838', '#2a1602', 'serpent', [recolour(WARM_GOLD), contact(0.7)]), scaleShading(0.6)],
  },
  {
    id: 'q2-serpent-shadowed', name: 'Q2 · Serpent coil, soft outlines', pitch: '', stage: { thickness: 0.18 },
    // A thin outline in a darker green instead of black, and each row casts a soft shadow on the row beneath it.
    layers: () => [under('#061004'), scaleRows('#3a8a2a', '#123a0c', 'serpent', [shadow({ opacity: 0.75, distance: 0.05, blur: 0.06 })], 0.03), scaleShading()],
  },
];
export { glow };
