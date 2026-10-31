// Druid, round 2: more natural, organic options.
import {
  bandFillLayer, bevel, blur, contact, DROP, growthLayer, overlay, photo, projectFromFrame, repeatLayer, shapeLayer,
  slot, textureLayer, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('druid');

export const CANDIDATES: Candidate[] = [
  {
    id: 'f-twisted-roots',
    name: 'F · Twisted roots',
    pitch: 'Gnarled tree roots twisting round each other over dark earth, with moss in the hollows.',
    colours: [slot('roots', 'Root colour', '#6a4a2c', ['Roots']), slot('earth', 'Earth colour', '#2a1e14', ['Earth']), slot('moss', 'Moss colour', '#6a8a2a', ['Moss'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Earth', paint: photo('forest-floor', 1.4, { lighting: 0.4 }), effects: [{ kind: 'recolour', on: true, amount: 0.7, stops: [{ at: 0, color: '#050302', opacity: 1 }, { at: 0.5, color: '#2a1e14', opacity: 1 }, { at: 1, color: '#6a5a40', opacity: 1 }] }, DROP] },
      { ...textureLayer('lichen'), name: 'Moss', color: '#6a8a2a', amount: 0.8, opacity: 0.8, seed: 0x11c6 },
      { ...growthLayer('vine'), name: 'Roots', count: 3, amplitude: 0.22, waveLength: 1.3, gnarl: 0.8, branching: 0, extra: 'none', thickness: 0.12, color: '#6a4a2c', extraColor: '#4a3220', effects: [bevel({ size: 0.6, gloss: 0.25, surface: 'grain', surfaceDepth: 0.6 }), contact(0.6)] },
    ],
  },
  {
    id: 'g-mossy-branch',
    name: 'G · Mossy branch',
    pitch: 'A bent branch thick with moss, with little red-capped mushrooms growing from it.',
    colours: [slot('bark', 'Bark colour', '#56473c', ['Branch']), slot('moss', 'Moss colour', '#5a7a1a', ['Moss']), slot('caps', 'Mushroom colour', '#c02a1a', ['Mushrooms'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Branch', paint: photo('plane-bark', 1.6, { angle: 90, lighting: 0.6 }), effects: [bevel({ profile: 'rounded', size: 0.7, depth: 1.3, gloss: 0.2 }), DROP] },
      { ...bandFillLayer(), name: 'Moss', from: 0, to: 0.55, paint: photo('moss', 1.4), opacity: 0.85, effects: [{ kind: 'distort', on: true, amount: 0.08, scale: 0.2, seed: 6 }, bevel({ size: 0.3, gloss: 0.1 })] },
      { ...repeatLayer(), name: 'Mushrooms', element: 'icon-spotted-mushroom', count: 5, at: 0.55, size: 0.6, fill: '#c02a1a', detail: '#f4ecd8', raised: true, wander: 0.4, effects: [bevel({ size: 0.4, gloss: 0.5 }), contact(0.6)] },
    ],
  },
  {
    id: 'h-bramble',
    name: 'H · Bramble & berries',
    pitch: 'Thorny bramble stems winding round each other, heavy with dark berries.',
    colours: [slot('stem', 'Stem colour', '#4a3a22', ['Brambles']), slot('berries', 'Berry colour', '#3a1050', ['Berries'])],
    layers: () => [
      { ...growthLayer('vine'), name: 'Brambles', count: 2, thickness: 0.07, amplitude: 0.2, waveLength: 1.6, extra: 'thorns', extraSize: 0.18, color: '#4a3a22', extraColor: '#2a1e10', effects: [bevel({ size: 0.5, gloss: 0.3 }), DROP] },
      { ...growthLayer('vine'), name: 'Leaves', count: 1, thickness: 0.04, amplitude: 0.2, waveLength: 2.1, extra: 'leaves', extraSize: 0.35, color: '#3a5a22', extraColor: '#4a7a2a', seed: 4, effects: [bevel({ size: 0.5, gloss: 0.3 }), contact(0.5)] },
      { ...growthLayer('vine'), name: 'Berries', count: 1, thickness: 0.03, amplitude: 0.18, waveLength: 1.8, extra: 'berries', extraSize: 0.32, color: '#4a3a22', extraColor: '#3a1050', seed: 9, effects: [bevel({ size: 0.6, gloss: 0.8 }), contact(0.5)] },
    ],
  },
  {
    id: 'i-meadow',
    name: 'I · Wildflower meadow',
    pitch: 'A strip of meadow grass dotted with small white and yellow flowers.',
    colours: [slot('grass', 'Grass colour', '#4a7a2a', ['Meadow']), slot('flowers', 'Flower colour', '#f4f0e0', ['Flowers'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Meadow', paint: photo('moss', 0.9, { lighting: 0.5 }), effects: [bevel({ profile: 'rounded', size: 0.5, gloss: 0.1, highlightOpacity: 0.3 }), DROP] },
      { ...repeatLayer(), name: 'Flowers', element: 'circle', count: 40, at: 0.5, size: 0.16, fill: '#f4f0e0', raised: true, wander: 0.8, effects: [contact(0.4)] },
      { ...repeatLayer(), name: 'Flower hearts', element: 'circle', count: 40, at: 0.5, size: 0.06, fill: '#f0c020', raised: false, wander: 0.8, shaded: false },
      { ...shapeLayer(), name: 'Big flowers', shape: 'flower', sides: 6, innerRatio: 0.5, along: 0.125, across: 0.5, size: 0.42, fill: '#f8d040', outline: null, raised: false, mirror: 'four', effects: [bevel({ size: 0.4, gloss: 0.4 }), contact(0.5)] },
    ],
  },
  {
    id: 'j-fern',
    name: 'J · Fern & leaf litter',
    pitch: 'Fallen leaves and fern fronds layered over the forest floor, in many greens and browns.',
    colours: [slot('floor', 'Floor colour', '#8e703a', ['Forest floor']), slot('leaves', 'Leaf colour', '#5a8a2a', ['Fronds', 'More fronds'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Forest floor', paint: photo('forest-floor', 1.2, { lighting: 0.5 }), effects: [{ kind: 'adjust', on: true, hue: 0, saturation: 0, brightness: -0.3, contrast: 0.2 }, bevel({ profile: 'rounded', size: 0.4, gloss: 0.1, highlightOpacity: 0.3 }), DROP] },
      { ...repeatLayer(), name: 'Fronds', element: 'leaf', count: 20, at: 0.4, size: 0.62, stretch: 0.42, rotation: -55, fill: '#5a8a2a', raised: false, wander: 0.5, effects: [bevel({ size: 0.5, gloss: 0.3 }), contact(0.5)] },
      { ...repeatLayer(), name: 'More fronds', element: 'leaf', count: 20, offset: 0.5, at: 0.62, size: 0.56, stretch: 0.42, rotation: 50, fill: '#7aa83a', raised: false, wander: 0.5, effects: [bevel({ size: 0.5, gloss: 0.3 }), contact(0.5)] },
    ],
  },
  {
    id: 'k-willow',
    name: 'K · Woven willow',
    pitch: 'Green and brown willow withies woven into a ring, with a few fresh leaves tucked in.',
    colours: [slot('willow', 'Willow colour', '#8a7a4a', ['Withies']), slot('leaves', 'Leaf colour', '#7aa83a', ['Tucked leaves'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Under', paint: { kind: 'solid', color: '#2a2210' }, effects: [DROP] },
      { ...textureLayer('woven'), name: 'Withies', color: '#8a7a4a', seed: 5, effects: [bevel({ size: 0.3, gloss: 0.3 })] },
      overlay('bark', 1.4, 'overlay', 0.4),
      { ...repeatLayer(), name: 'Tucked leaves', element: 'leaf', count: 9, at: 0.5, size: 0.6, stretch: 0.45, rotation: 35, fill: '#7aa83a', raised: false, wander: 0.4, effects: [bevel({ size: 0.5, gloss: 0.3 }), contact(0.5)] },
    ],
  },
];
export { blur };
