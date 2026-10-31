// Rose wreath (Frame Studio's Themed starting designs): candidates.
import { bandFillLayer, bandShading, contact, DROP, goldFx, growthLayer, photo, recolour, repeatLayer, slot, WARM_GOLD, bevel, type Candidate, type Layer } from './common';
import { themed } from './crafted';

export const CURRENT = themed('rose-wreath');
const STAGE = { thickness: 0.18 };
const hoop = (stops: string[], picture: 'wood-planks' | 'bark' | 'plane-bark' = 'wood-planks'): Layer[] =>
  bandShading([{ ...bandFillLayer(), name: 'Hoop', from: 0.15, to: 0.85, paint: photo(picture, 1.4, { angle: 90, lighting: 0.3 }), effects: [recolour(stops), DROP] }], { step: null });
const vine = (stem: string, leaf: string, o: { extra?: 'leaves' | 'berries' | 'thorns'; seed?: number; count?: number; size?: number } = {}): Layer => ({ ...growthLayer('vine'), name: o.extra === 'berries' ? 'Berries' : 'Vine', count: o.count ?? 2, thickness: 0.05, amplitude: 0.26, waveLength: 2, extra: o.extra ?? 'leaves', extraSize: o.size ?? 0.42, color: stem, extraColor: leaf, seed: o.seed ?? 3, effects: [bevel({ size: 0.4, gloss: 0.3 }), contact(0.6)] });
const roses = (fill: string, effects: Layer['effects'], count = 4, size = 0.95): Layer => ({ ...repeatLayer(), name: 'Roses', element: 'icon-rose', count, snapToCorners: false, at: 0.5, size, fill, raised: false, effects });
const WOOD = ['#140a04', '#3a2210', '#7a5230', '#b08a60', '#e0c8a0'];

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-red-roses',
    name: 'A · Red rose wreath',
    pitch: 'A wooden hoop shaded with gradients, a leafy vine, red berries and four deep red roses.',
    stage: STAGE,
    colours: [slot('leaves', 'Leaf colour', '#4a8a2a', ['Vine']), slot('roses', 'Rose colour', '#b01828', ['Roses', 'Berries'])],
    layers: () => [...hoop(WOOD), vine('#3a5220', '#4a8a2a'), vine('#3a5220', '#c8283a', { extra: 'berries', count: 1, seed: 7, size: 0.28 }), roses('#b01828', [bevel({ size: 0.4, gloss: 0.5 }), contact(0.7)])],
  },
  {
    id: 'b-white-roses',
    name: 'B · White roses & birch',
    pitch: 'Pale birch bark twined with soft green leaves and white roses.',
    stage: STAGE,
    colours: [slot('leaves', 'Leaf colour', '#6a9a4a', ['Vine']), slot('roses', 'Rose colour', '#f4f0e8', ['Roses'])],
    layers: () => [...hoop(['#2a2a26', '#8a8a82', '#d8d4c8', '#f0ece4', '#ffffff'], 'plane-bark'), vine('#4a6a2a', '#6a9a4a'), roses('#f4f0e8', [bevel({ size: 0.4, gloss: 0.4 }), contact(0.6)], 6, 0.85)],
  },
  {
    id: 'c-briar-rose',
    name: 'C · Briar rose',
    pitch: 'A thorny briar wound round dark bark, with dark red roses blooming along it.',
    stage: STAGE,
    colours: [slot('stem', 'Stem colour', '#3a2a1a', ['Vine']), slot('roses', 'Rose colour', '#8a0a1a', ['Roses'])],
    layers: () => [...hoop(['#060402', '#1a120a', '#3a2a1a', '#6a5440', '#9a8470'], 'bark'), vine('#3a2a1a', '#1a1008', { extra: 'thorns', size: 0.35 }), vine('#2a3a1a', '#3a6a2a', { seed: 9, count: 1, size: 0.34 }), roses('#8a0a1a', [bevel({ size: 0.4, gloss: 0.6 }), contact(0.7)], 6, 0.85)],
  },
  {
    id: 'd-golden-roses',
    name: 'D · Golden roses',
    pitch: 'A jeweller’s wreath: gilded vine, leaves and roses in warm gold.',
    stage: STAGE,
    colours: [slot('gold', 'Gold colour', '#c8952e', ['Vine', 'Roses'])],
    layers: () => [
      { ...growthLayer('vine'), name: 'Vine', count: 2, thickness: 0.05, amplitude: 0.26, waveLength: 2, extra: 'leaves', extraSize: 0.45, color: '#a8782a', extraColor: '#d8a838', seed: 3, effects: [...goldFx(0.35, WARM_GOLD), DROP] },
      roses('#d8a838', [...goldFx(0.4, WARM_GOLD), contact(0.7)], 4, 1),
    ],
  },
];
