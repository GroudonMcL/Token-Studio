// Rune-carved plates (Frame Studio's Layered starting designs): candidates.
import { bandFillLayer, bandShading, bevel, BRONZE_STOPS, contact, DROP, glow, goldFx, panelWords, lin, metalFx, photo, recolour, SILVER_STOPS, slot, WARM_GOLD, type Candidate, type Layer } from './common';
import { groupLayer, repeatLayer } from '../../../src/frame-studio/project/defaults';
import { layered } from './crafted';

export const CURRENT = layered('rune-plates');
const IRON = ['#020203', '#0c0d10', '#2a2c32', '#5a5e68', '#a0a6b0'];
const ring = (stops: string[] = IRON, picture: 'hammered-metal' | 'granite' = 'hammered-metal'): Layer[] =>
  bandShading([{ ...bandFillLayer(), name: 'Band', paint: photo(picture, 1.4, { lighting: 0.3 }), effects: [recolour(stops), DROP] }], { step: null });
/** Eight thick plates that bend with the ring (one ring with radial gaps cut out), lit as metal. */
const plates = (fill: string, effects: Layer['effects'], gap = 0.14): Layer => ({
  ...groupLayer([
    { ...bandFillLayer(), name: 'Plate ring', from: 0.1, to: 0.9, paint: { kind: 'solid', color: fill } },
    { ...repeatLayer(), name: 'Gaps', element: 'square', count: 8, snapToCorners: false, at: 0.5, size: 1.04, stretch: gap / 1.04, fill: '#000000', raised: false, shaded: false },
  ]),
  name: 'Plates', combine: 'subtract', effects,
});
/** One rune word in the middle of each plate, small enough to stay off the plate's bevelled edges. */
const runes = (fill: string, effects: Layer['effects'], font: 'babelstone' | 'yugurian' = 'babelstone') => panelWords(font, fill, { size: 0.34, spacing: 0.08, start: 3, effects });
const carved = () => bevel({ direction: 'sunken', size: 0.6, gloss: 0.4 });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-carved-bronze',
    name: 'A · Carved bronze plates',
    pitch: 'Eight thick bronze plates that bend with the ring, BabelStone runes carved deep into them, on dark iron.',
    stage: { thickness: 0.2 },
    colours: [slot('iron', 'Iron colour', '#2a2c32', ['Band']), slot('bronze', 'Plate colour', '#a87a3a', ['Plates'])],
    layers: () => [...ring(), plates('#a87a3a', [...metalFx(BRONZE_STOPS, 0.15, 0.7), contact(0.8)]), runes('#3a2208', [carved()])],
  },
  {
    id: 'b-stone-plates',
    name: 'B · Standing stones',
    pitch: 'Granite slabs round a dark ring, with runes chiselled into each.',
    stage: { thickness: 0.2 },
    colours: [slot('stone', 'Stone colour', '#8a8680', ['Plates'])],
    layers: () => [
      ...ring(['#020202', '#0e0e0c', '#2a2824', '#4a4842', '#6a6862']),
      plates('#8a8680', [bevel({ profile: 'chisel', size: 0.12, gloss: 0.2 }), contact(0.8)]),
      { ...bandFillLayer(), name: 'Granite', from: 0.1, to: 0.9, paint: photo('granite', 1.4), opacity: 0.8, blend: 'multiply', clip: 'below' },
      runes('#3a3830', [carved()]),
    ],
  },
  {
    id: 'c-glowing-plates',
    name: 'C · Runelit plates',
    pitch: 'Iron plates with the runes glowing blue from inside, and blue light showing in the gaps.',
    stage: { thickness: 0.2, bloom: 0.3 },
    colours: [slot('iron', 'Plate colour', '#5a5e68', ['Plates']), slot('glow', 'Glow colour', '#4ac8ff', ['Runes', 'Gap glow'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Gap glow', paint: lin(['#0a2a4a', '#020a14']), effects: [DROP, glow({ color: '#4ac8ff', opacity: 0.5, size: 0.1, inner: true })] },
      plates('#5a5e68', [...metalFx(IRON, 0.15, 0.6), contact(0.8)]),
      runes('#d0f4ff', [glow({ color: '#4ac8ff', opacity: 0.9, size: 0.12 })]),
    ],
  },
  {
    id: 'd-silver-gold',
    name: 'D · Silver & gold runes',
    pitch: 'Silver plates with gold Yugurian runes inlaid in them.',
    stage: { thickness: 0.2 },
    colours: [slot('metal', 'Plate colour', '#a8aeb8', ['Plates']), slot('gold', 'Rune colour', '#d8a838', ['Runes'])],
    layers: () => [...ring(), plates('#a8aeb8', [...metalFx(SILVER_STOPS, 0.15, 0.8), contact(0.8)]), runes('#f4d27a', goldFx(0.3, WARM_GOLD), 'yugurian')],
  },
];
