// Cobblestone: candidates for new versions of Token Maker's Cobblestone frame.
import {
  bandFillLayer, base, bevel, cellsLayer, DROP, fractureLayer, glow, goldFx, goldPaint, lin, lineLayer,
  overlay, photo, projectFromFrame, recolour, rims, slot, textureLayer, WARM_GOLD, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('cobblestone');

export const CANDIDATES: Candidate[] = [
  {
    id: 'c-mossy',
    name: 'C · Mossy cobbles',
    pitch: 'Rounded cobblestones with moss and lichen creeping between them.',
    colours: [slot('stone', 'Stone colour', '#928b80', ['Cobbles']), slot('moss', 'Moss colour', '#7a9a2a', ['Moss'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Cobbles', paint: photo('cobblestone', 1.4, { lighting: 0.7 }), effects: [bevel({ profile: 'rounded', size: 0.3, gloss: 0.15, highlightOpacity: 0.4 }), DROP] },
      { ...textureLayer('lichen'), name: 'Moss', color: '#7a9a2a', amount: 1, opacity: 0.85, seed: 0x11c5 },
      ...rims(),
    ],
  },
  {
    id: 'd-marble-gold',
    name: 'D · Marble & gold',
    pitch: 'Polished marble blocks with a fine gold line inlaid round the middle. Palace stonework.',
    colours: [slot('stone', 'Marble colour', '#d8d0c4', ['Band', 'Texture']), slot('gold', 'Gold colour', '#c8952e', ['Gold inlay'])],
    layers: () => [
      ...base({ light: '#ffffff', dark: '#6a6258', step: null, rims: false }),
      overlay('marble', 1.4, 'multiply', 0.8, { lighting: 0.3 }),
      { ...lineLayer(), name: 'Gold inlay', at: 0.5, width: 0.08, paint: goldPaint(1.4), effects: goldFx(0.6, WARM_GOLD) },
      ...rims(),
    ],
  },
  {
    id: 'f-flagstones',
    name: 'F · Fitted flagstones',
    pitch: 'Neat, rounded hexagonal flagstones fitted tightly together, smooth and clean like a game board.',
    colours: [slot('stone', 'Stone colour', '#8a8a86', ['Flagstones']), slot('joints', 'Joint colour', '#2a2a28', ['Joints'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Joints', paint: lin(['#4a4a46', '#2a2a28', '#0a0a0a']), effects: [DROP] },
      { ...cellsLayer(), name: 'Flagstones', pattern: 'hex', size: 1.1, gap: 0.06, rounding: 0.35, vary: 0.18, color: '#8a8a86', effects: [bevel({ profile: 'rounded', size: 0.3, gloss: 0.35, highlightOpacity: 0.6 })] },
      overlay('granite', 2, 'overlay', 0.4),
    ],
  },
  {
    id: 'g-dungeon',
    name: 'G · Torchlit dungeon',
    pitch: 'Dark dungeon blocks with warm torchlight glowing out of the joints between them.',
    stage: { bloom: 0.25 },
    colours: [slot('stone', 'Stone colour', '#3a3632', ['Blocks']), slot('light', 'Light colour', '#ff9a3a', ['Torchlight'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Torchlight', paint: lin(['#ffd080', '#ff9a3a', '#6a2a06']), effects: [DROP] },
      { ...cellsLayer(), name: 'Blocks', pattern: 'brick', size: 1.0, gap: 0.06, rounding: 0.15, vary: 0.25, color: '#3a3632', effects: [bevel({ profile: 'chisel', size: 0.12, gloss: 0.2, surface: 'cracked', surfaceDepth: 0.5, highlightOpacity: 0.35 }), glow({ color: '#ff9a3a', opacity: 0.6, size: 0.06 })] },
    ],
  },
  {
    id: 'h-pebbles',
    name: 'H · River pebbles',
    pitch: 'Smooth, wet river pebbles of slightly different greys, glossy as if just out of the water.',
    colours: [slot('stone', 'Pebble colour', '#7a7a80', ['Pebbles']), slot('bed', 'Bed colour', '#1e2a2a', ['Riverbed'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Riverbed', paint: lin(['#3a4a4a', '#1e2a2a', '#050a0a']), effects: [DROP] },
      { ...cellsLayer(), name: 'Pebbles', pattern: 'voronoi', size: 0.85, gap: 0.08, jitter: 0.9, rounding: 0.9, vary: 0.45, color: '#7a7a80', effects: [bevel({ profile: 'rounded', size: 0.5, depth: 1.4, gloss: 0.95, highlightOpacity: 0.75 })] },
    ],
  },
  {
    id: 'i-kintsugi',
    name: 'I · Kintsugi stone',
    pitch: 'Pale weathered stone cracked and mended with gold, the cracks catching the light.',
    colours: [slot('stone', 'Stone colour', '#b8b0a2', ['Stone', 'Pressed-in step']), slot('gold', 'Gold colour', '#c8952e', ['Gold seams'])],
    layers: () => [
      ...base({ light: '#e8e0d2', dark: '#5a544a', step: 0.55, rims: false }),
      overlay('coral-stone', 1.6, 'multiply', 0.6),
      { ...fractureLayer(), name: 'Gold seams', kind: 'cracks', from: 0.05, to: 0.95, count: 18, length: 2.8, branching: 0.7, jagged: 0.5, width: 0.09, color: '#c8952e', effects: [recolour(WARM_GOLD), bevel({ size: 0.6, gloss: 0.9 }), glow({ color: '#ffd070', opacity: 0.35, size: 0.06 })] },
      ...rims(),
    ],
  },
  {
    id: 'j-sandstone',
    name: 'J · Sandstone',
    pitch: 'Warm desert sandstone in soft layered bands, worn smooth by the wind.',
    colours: [slot('stone', 'Stone colour', '#d0a070', ['Band', 'Pressed-in step', 'Layers'])],
    layers: () => [
      ...base({ light: '#f0c890', dark: '#6a3a1a', step: 0.55, rims: false }),
      { ...textureLayer('wood'), name: 'Layers', color: '#9a6038', opacity: 0.7, blend: 'multiply', seed: 0x5a5d },
      overlay('cracked-mud', 2.4, 'soft-light', 0.5),
      ...rims(),
    ],
  },
  {
    id: 'k-slate',
    name: 'K · Slate scales',
    pitch: 'Overlapping blue-grey slate tiles, like a castle roof, with a soft sheen.',
    colours: [slot('stone', 'Slate colour', '#4a5260', ['Slates'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Under', paint: { kind: 'solid', color: '#14161a' }, effects: [DROP] },
      { ...cellsLayer(), name: 'Slates', pattern: 'scales', size: 0.95, gap: 0.04, rounding: 0.2, vary: 0.2, color: '#4a5260', effects: [bevel({ profile: 'chisel', size: 0.15, gloss: 0.6, highlightOpacity: 0.5 })] },
      ...rims(),
    ],
  },
];
