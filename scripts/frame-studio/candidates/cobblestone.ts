// Cobblestone, round 3: Mossy cobbles is in; more options closer to it.
import {
  bandFillLayer, bevel, contact, DROP, growthLayer, overlay, photo, projectFromFrame, rims, slot, textureLayer,
  type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('cobblestone');
const cobbles = (name = 'Cobbles', patch = {}) => ({ ...bandFillLayer(), name, paint: photo('cobblestone', 1.4, { lighting: 0.7 }), effects: [bevel({ profile: 'rounded', size: 0.3, gloss: 0.15, highlightOpacity: 0.4 }), DROP], ...patch });

export const CANDIDATES: Candidate[] = [
  {
    id: 'l-overgrown',
    name: 'L · Overgrown path',
    pitch: 'Mossy cobbles with an ivy vine creeping across them.',
    colours: [slot('stone', 'Stone colour', '#928b80', ['Cobbles']), slot('ivy', 'Ivy colour', '#3a6a2a', ['Ivy'])],
    layers: () => [
      cobbles(),
      { ...textureLayer('lichen'), name: 'Moss', color: '#6a8a2a', amount: 0.7, opacity: 0.7, seed: 0x11c7 },
      { ...growthLayer('vine'), name: 'Ivy', count: 1, thickness: 0.05, amplitude: 0.32, waveLength: 1.4, extraSize: 0.55, color: '#2a3a1a', extraColor: '#3a6a2a', effects: [bevel({ size: 0.5, gloss: 0.4 }), contact(0.6)] },
      ...rims(),
    ],
  },
  {
    id: 'm-after-rain',
    name: 'M · After the rain',
    pitch: 'Dark wet cobbles glistening after rain, with a cool sheen across the tops of the stones.',
    colours: [slot('stone', 'Stone colour', '#5a5e66', ['Cobbles'])],
    layers: () => [
      { ...cobbles(), effects: [{ kind: 'adjust', on: true, hue: 0, saturation: -0.4, brightness: -0.35, contrast: 0.3 }, bevel({ profile: 'rounded', size: 0.35, gloss: 0.95, highlightOpacity: 0.8 }), DROP] },
      { ...bandFillLayer(), name: 'Sheen', blend: 'screen', opacity: 0.35, paint: { kind: 'linear', angle: 45, followLight: true, stops: [{ at: 0, color: '#c8d8f0', opacity: 1 }, { at: 0.6, color: '#000000', opacity: 0 }] } },
      ...rims(),
    ],
  },
  {
    id: 'n-forest-path',
    name: 'N · Forest path',
    pitch: 'Cobbles half covered in fallen autumn leaves and soft earth.',
    colours: [slot('stone', 'Stone colour', '#928b80', ['Cobbles']), slot('leaves', 'Leaf colour', '#a0602a', ['Leaves'])],
    layers: () => [
      cobbles(),
      { ...bandFillLayer(), name: 'Leaves', paint: photo('forest-floor', 1.2), opacity: 0.9, effects: [{ kind: 'distort', on: true, amount: 0.15, scale: 0.35, seed: 11 }, contact(0.5)], clip: 'band', from: 0, to: 0.6 },
      ...rims(),
    ],
  },
  {
    id: 'o-lichen-granite',
    name: 'O · Lichen granite',
    pitch: 'Speckled granite blocks patched with orange and yellow lichen, like an old wall in the hills.',
    colours: [slot('stone', 'Stone colour', '#6a6a6c', ['Granite']), slot('lichen', 'Lichen colour', '#d8a020', ['Lichen'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Granite', paint: photo('lichen-rock', 1.4, { lighting: 0.6 }), effects: [bevel({ profile: 'chisel', size: 0.25, gloss: 0.2, highlightOpacity: 0.4 }), DROP] },
      { ...textureLayer('lichen'), name: 'Lichen', color: '#d8a020', amount: 0.55, opacity: 0.6, seed: 0x11c8 },
      ...rims(),
    ],
  },
  {
    id: 'p-snowy',
    name: 'P · Snowy cobbles',
    pitch: 'Cobbles under a fresh dusting of snow, with frost creeping in from the edges.',
    colours: [slot('stone', 'Stone colour', '#8a8680', ['Cobbles']), slot('snow', 'Snow colour', '#f4f8ff', ['Snow', 'Frost'])],
    layers: () => [
      cobbles(),
      { ...bandFillLayer(), name: 'Snow', from: 0, to: 0.3, paint: photo('snow', 1.4), opacity: 0.85, effects: [{ kind: 'distort', on: true, amount: 0.1, scale: 0.3, seed: 12 }, bevel({ size: 0.4, gloss: 0.4, highlightOpacity: 0.6 }), contact(0.4)] },
      { ...textureLayer('frost'), name: 'Frost', color: '#f4f8ff', opacity: 0.4, seed: 0xf206 },
      ...rims(),
    ],
  },
];
export { overlay };
