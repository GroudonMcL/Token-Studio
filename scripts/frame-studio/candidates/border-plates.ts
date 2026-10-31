// Riveted plates (Frame Studio's Crafted borders): candidates.
import { bandFillLayer, bandShading, BRONZE_STOPS, contact, DROP, glow, lin, lineLayer, metalFx, photo, recolour, repeatLayer, slot, STEEL_STOPS, WARM_GOLD, type Candidate, type Layer } from './common';
import { border } from './crafted';

export const CURRENT = border('riveted-plates');
const STAGE = { thickness: 0.24, outerSpacing: 0.02 };
const IRON = ['#0c0c08', '#34342a', '#66665a', '#a6a69a', '#e8e8e0'];
const ring = (stops: string[], picture: 'hammered-metal' | 'metal-plate' = 'hammered-metal'): Layer[] =>
  bandShading([{ ...bandFillLayer(), name: 'Iron ring', paint: photo(picture, 1.4, { lighting: 0.3 }), effects: [recolour(stops), DROP] }], { step: null });
/** Plates laid round the band, kept inside it; a little turn and size variety if `loose`. */
const plates = (name: string, at: number, count: number, size: number, fill: string, stops: string[], o: { loose?: boolean; offset?: number; seed?: number } = {}): Layer => ({
  ...repeatLayer(), name, element: 'square', count, snapToCorners: false, at, size, stretch: 1.5, offset: o.offset ?? 0, fill, shaded: false, raised: false,
  clip: 'band', jitterSize: o.loose ? 0.15 : 0, jitterAngle: o.loose ? 8 : 0, seed: o.seed ?? 11,
  effects: [...metalFx(stops, 0.12, 0.6), contact(0.8)],
});
const rivets = (name: string, at: number, count: number, fill: string, stops: string[], offset = 0): Layer => ({
  ...repeatLayer(), name, element: 'bead', count, snapToCorners: false, at, offset, size: 0.09, fill, raised: true, effects: [...metalFx(stops, 0.6, 0.8), contact(0.7)],
});

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-tidy-plates',
    name: 'A · Ordered plates',
    pitch: 'Even iron plates neatly riveted round a shaded iron ring, all inside the band.',
    stage: STAGE,
    colours: [slot('iron', 'Iron colour', '#66665a', ['Iron ring', 'Outer plates', 'Inner plates', 'Rivets'])],
    layers: () => [
      ...ring(IRON),
      plates('Outer plates', 0.27, 14, 0.42, '#a4a49e', IRON),
      plates('Inner plates', 0.73, 14, 0.42, '#9c9c96', IRON, { offset: 0.5 }),
      rivets('Rivets', 0.27, 28, '#c8c8c0', IRON, 0.25),
      rivets('Rivets', 0.73, 28, '#c8c8c0', IRON, 0.75),
    ],
  },
  {
    id: 'b-patchwork',
    name: 'B · Patchwork repair',
    pitch: 'Mismatched plates hammered on at slight angles, some rusted, as if patched after many battles.',
    stage: STAGE,
    colours: [slot('iron', 'Iron colour', '#66665a', ['Iron ring', 'Outer plates']), slot('rust', 'Rust colour', '#9a4a1e', ['Rusted plates'])],
    layers: () => [
      ...ring(IRON),
      plates('Outer plates', 0.3, 12, 0.48, '#a4a49e', IRON, { loose: true }),
      { ...plates('Rusted plates', 0.7, 10, 0.44, '#9a4a1e', ['#140602', '#4a1a08', '#9a4a1e', '#d0884a', '#f0c090'], { loose: true, offset: 0.5, seed: 12 }), fillPaint: photo('rust', 0.8) },
      rivets('Rivets', 0.3, 24, '#c8c8c0', IRON, 0.25),
    ],
  },
  {
    id: 'c-dwarven-bulwark',
    name: 'C · Dwarven bulwark',
    pitch: 'Bronze plates with gold rivets on dark iron, square and solid like a dwarven gate.',
    stage: STAGE,
    colours: [slot('iron', 'Iron colour', '#3a3e46', ['Iron ring']), slot('bronze', 'Plate colour', '#a87a3a', ['Plates']), slot('gold', 'Rivet colour', '#d8a838', ['Rivets'])],
    layers: () => [
      ...ring(['#020203', '#0e1014', '#3a3e46', '#6a707a', '#a8b0b8'], 'metal-plate'),
      plates('Plates', 0.5, 12, 0.8, '#a87a3a', BRONZE_STOPS),
      rivets('Rivets', 0.24, 24, '#d8a838', WARM_GOLD, 0.25),
      rivets('Rivets', 0.76, 24, '#d8a838', WARM_GOLD, 0.25),
    ],
  },
  {
    id: 'd-forge-glow',
    name: 'D · Forge seams',
    pitch: 'Blackened steel plates with a red-hot glow showing in the seams between them.',
    stage: { ...STAGE, bloom: 0.2 },
    colours: [slot('steel', 'Steel colour', '#3a3e46', ['Plates']), slot('glow', 'Glow colour', '#ff5a1a', ['Seam glow'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Under', paint: lin(['#1a0604', '#040101']), effects: [DROP] },
      { ...lineLayer(), name: 'Seam glow', at: 0.5, width: 0.9, paint: { kind: 'solid', color: '#ff5a1a' }, opacity: 0.6, effects: [glow({ color: '#ff3a0a', opacity: 0.6, size: 0.1 })] },
      plates('Plates', 0.5, 12, 0.86, '#3a3e46', ['#020203', '#0e1014', '#3a3e46', '#7a808a', '#c0c8d0']),
      rivets('Rivets', 0.5, 12, '#8a929c', STEEL_STOPS, 0.5),
    ],
  },
];
