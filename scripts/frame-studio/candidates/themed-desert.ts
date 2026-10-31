// Desert tomb (Themed): candidates.
import { goldFx, lineLayer, panelWords, slot, WARM_GOLD, type Candidate, type Layer } from './common';
import { bevel, contact, curvedPlates, lin, metalFx, photo, recolour, ring, bandFillLayer, DROP } from './themed-kit';
import { themed } from './crafted';

export const CURRENT = themed('desert-tomb');
const STAGE = { thickness: 0.22 };
const SAND = ['#2a1e0e', '#6a5434', '#c8a874', '#e8d4a8', '#fff4dc'];
const blocks = (stops = SAND): Layer[] => [
  { ...bandFillLayer(), name: 'Mortar', paint: lin(['#4a3a20', '#140e06']), effects: [DROP] },
  curvedPlates('Sandstone', 10, '#c8a874', [recolour(stops), contact(0.7)], { from: 0.04, to: 0.96, gap: 0.04 }),
  { ...bandFillLayer(), name: 'Grain', paint: photo('granite', 1.4), opacity: 0.35, blend: 'multiply', clip: 'below' },
];
const lapis = (): Layer[] => [0.12, 0.88].map((at) => ({ ...lineLayer(), name: 'Lapis inlay', at, width: 0.06, paint: { kind: 'solid' as const, color: '#1a3aa0' }, effects: [bevel({ direction: 'sunken', size: 0.5, gloss: 0.8 })] }));
const glyphs = (fill: string, effects: Layer['effects']) => panelWords('yugurian', fill, { count: 10, size: 0.36, start: 5, effects });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-sandstone', name: 'A · Sandstone tomb',
    pitch: 'Sandstone blocks that follow the ring, a glyph carved in each, lapis inlay lines and gold scarabs over every other joint.',
    stage: STAGE,
    colours: [slot('stone', 'Stone colour', '#c8a874', ['Sandstone']), slot('lapis', 'Inlay colour', '#1a3aa0', ['Lapis inlay'])],
    layers: () => [...blocks(), ...lapis(), glyphs('#5a4020', [bevel({ direction: 'sunken', size: 0.6, gloss: 0.3 })]), ring('Scarabs', 'gem', 5, '#d8a838', [...goldFx(0.4, WARM_GOLD), contact(0.6)], { size: 0.5, gemCut: 'cabochon', offset: 0 } as never)],
  },
  {
    id: 'b-lapis-gold', name: 'B · Lapis & gold',
    pitch: 'Deep lapis blue with gold glyphs and gold bands, like a pharaoh’s collar.',
    stage: STAGE,
    colours: [slot('lapis', 'Stone colour', '#1a3aa0', ['Lapis']), slot('gold', 'Gold colour', '#d8a838', ['Gold bands', 'Runes'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Lapis', paint: lin(['#3a6ad0', '#061440']), effects: [DROP] },
      { ...bandFillLayer(), name: 'Lapis', paint: photo('blue-onyx', 3), opacity: 0.5, blend: 'overlay' },
      ...[0.08, 0.92].map((at) => ({ ...lineLayer(), name: 'Gold bands', at, width: 0.12, paint: { kind: 'solid' as const, color: '#d8a838' }, effects: [...metalFx(WARM_GOLD, 0.5, 0.9), contact(0.5)] })),
      glyphs('#f4d27a', goldFx(0.3, WARM_GOLD)),
    ],
  },
  {
    id: 'c-obsidian-tomb', name: 'C · Obsidian tomb',
    pitch: 'Black obsidian blocks with gold glyphs, for a god-king’s burial.',
    stage: STAGE,
    colours: [slot('stone', 'Stone colour', '#2a2430', ['Sandstone']), slot('gold', 'Glyph colour', '#d8a838', ['Runes'])],
    layers: () => [...blocks(['#020103', '#0a080e', '#2a2430', '#5a5460', '#8a8490']), glyphs('#f4d27a', goldFx(0.3, WARM_GOLD))],
  },
  {
    id: 'd-sun-temple', name: 'D · Sun temple',
    pitch: 'Warm red sandstone with a golden sun disc at the top and glyphs round it.',
    stage: STAGE,
    colours: [slot('stone', 'Stone colour', '#c0704a', ['Sandstone'])],
    layers: () => [...blocks(['#2a0e06', '#6a3420', '#c0704a', '#e8a880', '#fff0e0']), glyphs('#4a1a0a', [bevel({ direction: 'sunken', size: 0.6, gloss: 0.3 })]), ring('Sun', 'sun', 1, '#f4d27a', [...goldFx(0.4, WARM_GOLD), contact(0.6)], { size: 1, snapToCorners: false } as never)],
  },
];
