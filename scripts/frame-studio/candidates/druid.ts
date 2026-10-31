// Druid: candidates for new versions of Token Maker's Druid frame.
import {
  bandFillLayer, base, bevel, contact, DROP, glow, growthLayer, inscription, photo, projectFromFrame, recolour,
  repeatLayer, rims, shapeLayer, SILVER_STOPS, slot, textureLayer, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('druid');

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-living-vine',
    name: 'A · Living vine',
    pitch: 'A vine with fresh leaves winding round a polished wooden hoop.',
    colours: [slot('wood', 'Wood colour', '#7a5230', ['Hoop']), slot('leaves', 'Leaf colour', '#6aa83a', ['Vine'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Hoop', from: 0.2, to: 0.8, paint: photo('wood-planks', 1.4, { angle: 90, lighting: 0.5 }), effects: [bevel({ size: 0.6, gloss: 0.5, highlightOpacity: 0.5 }), DROP] },
      { ...growthLayer('vine'), name: 'Vine', count: 2, thickness: 0.07, amplitude: 0.3, waveLength: 1.5, extraSize: 0.75, color: '#3e5a22', extraColor: '#6aa83a', effects: [bevel({ size: 0.5, gloss: 0.4 }), contact(0.6)] },
    ],
  },
  {
    id: 'b-antlers',
    name: 'B · Antler crown',
    pitch: 'Pale antlers branching out from a band of deep green moss.',
    stage: { bleed: 0.4 },
    colours: [slot('moss', 'Moss colour', '#4a6519', ['Moss']), slot('antler', 'Antler colour', '#d8c8a8', ['Antlers'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Moss', paint: photo('moss', 1.6, { lighting: 0.6 }), effects: [bevel({ profile: 'rounded', size: 0.5, gloss: 0.1, highlightOpacity: 0.35 }), DROP] },
      { ...growthLayer('antlers'), name: 'Antlers', at: 0.1, count: 6, thickness: 0.16, color: '#d8c8a8', effects: [bevel({ size: 0.5, gloss: 0.4 }), contact(0.6)] },
    ],
  },
  {
    id: 'c-stone-circle',
    name: 'C · Glowing stone circle',
    pitch: 'Mossy standing stone with green BabelStone runes glowing in it.',
    stage: { bloom: 0.25 },
    colours: [slot('stone', 'Stone colour', '#6c6b57', ['Stone']), slot('glow', 'Glow colour', '#8aff6a', ['Glowing runes'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Stone', paint: photo('mossy-rock', 1.6, { lighting: 0.6 }), effects: [bevel({ profile: 'chisel', size: 0.25, gloss: 0.15, highlightOpacity: 0.4 }), DROP] },
      inscription('babelstone', '#e0ffd0', { name: 'Glowing runes', size: 0.4, start: 5, effects: [glow({ inner: true, color: '#ffffff', opacity: 0.4, size: 0.04 }), glow({ color: '#8aff6a', opacity: 0.9, size: 0.14 })] }),
    ],
  },
  {
    id: 'd-autumn',
    name: 'D · Autumn wreath',
    pitch: 'A wreath of overlapping autumn leaves in red, orange and gold.',
    colours: [slot('first', 'First leaves', '#c0401a', ['Red leaves']), slot('second', 'Second leaves', '#e09a2a', ['Gold leaves']), slot('wood', 'Twig colour', '#4a3020', ['Twigs'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Twigs', from: 0.3, to: 0.7, paint: photo('bark', 1.6, { angle: 90 }), effects: [DROP] },
      { ...repeatLayer(), name: 'Red leaves', element: 'leaf', count: 26, at: 0.35, size: 1.3, stretch: 0.55, rotation: -60, fill: '#c0401a', raised: false, effects: [bevel({ size: 0.5, gloss: 0.3 }), contact(0.5)] },
      { ...repeatLayer(), name: 'Gold leaves', element: 'leaf', count: 26, offset: 0.5, at: 0.65, size: 1.3, stretch: 0.55, rotation: 60, fill: '#e09a2a', raised: false, effects: [bevel({ size: 0.5, gloss: 0.3 }), contact(0.5)] },
    ],
  },
  {
    id: 'e-moonlit-grove',
    name: 'E · Moonlit grove',
    pitch: 'Deep forest green with silver oak leaves and a crescent moon at the top.',
    stage: { bloom: 0.15 },
    colours: [slot('band', 'Frame colour', '#1e3a22', ['Band', 'Pressed-in step']), slot('silver', 'Silver colour', '#c8ccd4', ['Oak leaves', 'Moon'])],
    layers: () => [
      ...base({ light: '#3a6a3a', dark: '#040e06', step: 0.55 }),
      { ...textureLayer('sparkle'), name: 'Fireflies', color: '#d8ffb0', amount: 0.5, scale: 0.4, seed: 0x5a34 },
      { ...repeatLayer(), name: 'Oak leaves', element: 'icon-oak-leaf', count: 7, offset: 0.5, at: 0.5, size: 1.2, fill: '#c8ccd4', raised: true, effects: [recolour(SILVER_STOPS), bevel({ size: 0.4, gloss: 0.8 }), contact(0.5)] },
      { ...shapeLayer(), name: 'Moon', shape: 'crescent', innerRatio: 0.55, along: 0, across: 0.5, size: 0.8, rotation: -30, fill: '#e8ecf4', outline: null, raised: false, effects: [glow({ color: '#e0f0ff', opacity: 0.7, size: 0.14 })] },
      ...rims(),
    ],
  },
];
