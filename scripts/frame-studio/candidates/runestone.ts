// Runestone: candidates for new versions of the Crafted Runestone frame.
import {
  bandFillLayer, bandShading, bevel, contact, DROP, glow, glowCracks, inscription, overlay, photo, recolour,
  repeatLayer, slot, textureLayer, goldFx, WARM_GOLD, type Candidate,
} from './common';
import { crafted } from './crafted';

export const CURRENT = crafted('runestone');
const stone = (name: string, picture: Parameters<typeof photo>[0], scale: number, stops?: string[]) =>
  ({ ...bandFillLayer(), name, paint: photo(picture, scale, { lighting: 0.4 }), effects: [...(stops ? [recolour(stops)] : []), DROP] });
const carved = (o: { size?: number; gloss?: number } = {}) => bevel({ direction: 'sunken', size: o.size ?? 0.5, gloss: o.gloss ?? 0.2 });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-standing-stone',
    name: 'A · Standing stone',
    pitch: 'Pale granite shaded with the twin gradient bands, with BabelStone runes carved in and glowing blue.',
    stage: { bloom: 0.25 },
    colours: [slot('stone', 'Stone colour', '#8a8680', ['Stone']), slot('glow', 'Rune colour', '#4ac8ff', ['Runes'])],
    layers: () => bandShading([
      stone('Stone', 'granite', 1.4, ['#14130f', '#4a4842', '#8a8680', '#c8c4ba', '#f0ece2']),
      inscription('babelstone', '#c8f0ff', { name: 'Runes', at: 0.3, size: 0.4, start: 0, effects: [carved(), glow({ color: '#4ac8ff', opacity: 0.85, size: 0.12 })] }),
    ]),
  },
  {
    id: 'b-mossy-runestone',
    name: 'B · Mossy runestone',
    pitch: 'Old weathered stone with moss creeping over the outer edge and runes carved but long gone dark.',
    colours: [slot('stone', 'Stone colour', '#7a786e', ['Stone']), slot('moss', 'Moss colour', '#5a7a2a', ['Moss'])],
    layers: () => bandShading([
      stone('Stone', 'mossy-rock', 1.4),
      { ...bandFillLayer(), name: 'Moss', from: 0, to: 0.45, paint: photo('moss', 1), opacity: 0.85, clip: 'band', effects: [{ kind: 'distort', on: true, amount: 0.3, scale: 0.4, seed: 8 }, contact(0.4)] },
      inscription('babelstone', '#3a382e', { name: 'Runes', at: 0.75, size: 0.32, start: 3, effects: [carved({ size: 0.6 })] }),
    ]),
  },
  {
    id: 'c-ember-runes',
    name: 'C · Ember runes',
    pitch: 'Dark volcanic rock split by glowing cracks, with Yugurian runes burning orange.',
    stage: { bloom: 0.3 },
    colours: [slot('stone', 'Stone colour', '#3a3430', ['Stone']), slot('glow', 'Glow colour', '#ff7a2a', ['Glowing cracks', 'Runes'])],
    layers: () => bandShading([
      stone('Stone', 'dark-rock', 1.4),
      glowCracks('#1a0a04', '#ff7a2a', '#ffb05a', 7, 0.7),
      inscription('yugurian', '#ffe0b0', { name: 'Runes', at: 0.3, size: 0.38, start: 1, effects: [carved(), glow({ color: '#ff7a2a', opacity: 0.9, size: 0.12 })] }),
    ]),
  },
  {
    id: 'd-frost-runes',
    name: 'D · Frost runes',
    pitch: 'Blue-grey stone furred with frost, with BabelStone runes glowing icy cyan.',
    stage: { bloom: 0.25 },
    colours: [slot('stone', 'Stone colour', '#6a7a88', ['Stone']), slot('glow', 'Rune colour', '#8af0ff', ['Runes'])],
    layers: () => bandShading([
      stone('Stone', 'granite', 1.4, ['#06080c', '#2a3440', '#6a7a88', '#b8c8d6', '#f0f8ff']),
      { ...textureLayer('frost'), name: 'Frost', color: '#e8f8ff', opacity: 0.7, seed: 0xf205 },
      inscription('babelstone', '#e8fcff', { name: 'Runes', at: 0.3, size: 0.4, start: 5, effects: [carved(), glow({ color: '#8af0ff', opacity: 0.85, size: 0.12 })] }),
    ]),
  },
  {
    id: 'e-gilded-slate',
    name: 'E · Gilded slate',
    pitch: 'Smooth dark slate with runes carved in and filled with gold leaf, and a gold rune stone at each quarter.',
    colours: [slot('stone', 'Slate colour', '#2e3238', ['Stone']), slot('gold', 'Gold colour', '#d8a838', ['Runes', 'Rune stones'])],
    layers: () => bandShading([
      stone('Stone', 'black-onyx', 3, ['#020304', '#121418', '#2e3238', '#5a606a', '#8a909a']),
      inscription('babelstone', '#f4d27a', { name: 'Runes', at: 0.76, size: 0.28, start: 2, effects: [...goldFx(0.3, WARM_GOLD)] }),
      { ...repeatLayer(), name: 'Rune stones', element: 'icon-rune-stone', count: 4, at: 0.2, size: 0.38, fill: '#d8a838', raised: false, effects: [...goldFx(0.4, WARM_GOLD), contact(0.5)] },
    ]),
  },
];
export { overlay };

// The original frame's band thickness, unless a candidate sets its own.
for (const c of CANDIDATES) c.stage = { ...{ thickness: 0.2, outerSpacing: 0.02 }, ...c.stage };
