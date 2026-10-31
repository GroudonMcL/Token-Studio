// Cobblestone: candidates for new versions of Token Maker's Cobblestone frame.
import {
  bandFillLayer, base, bevel, cellsLayer, DROP, glow, goldFx, goldPaint, inscription, lineLayer, overlay, photo,
  projectFromFrame, rims, slot, textureLayer, WARM_GOLD, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('cobblestone');

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-castle-wall',
    name: 'A · Castle wall',
    pitch: 'Real castle brickwork wrapped round the band, with chiselled edges and deep mortar.',
    colours: [slot('stone', 'Stone colour', '#87785e', ['Bricks'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Mortar', paint: { kind: 'solid', color: '#3a342a' }, effects: [DROP] },
      { ...cellsLayer(), name: 'Bricks', pattern: 'brick', size: 0.5, gap: 0.05, rounding: 0.12, vary: 0.3, color: '#87785e', effects: [bevel({ profile: 'chisel', size: 0.12, gloss: 0.15, highlightOpacity: 0.5, surface: 'cracked', surfaceDepth: 0.4 })] },
      overlay('castle-brick', 1.2, 'overlay', 0.7),
    ],
  },
  {
    id: 'b-rune-stones',
    name: 'B · Rune stones',
    pitch: 'A ring of separate cut stones with a Yugurian inscription glowing across them.',
    stage: { bloom: 0.2 },
    colours: [slot('stone', 'Stone colour', '#7d7a72', ['Stones']), slot('glow', 'Glow colour', '#7ae6ff', ['Glowing inscription'])],
    layers: () => [
      { ...cellsLayer(), name: 'Stones', pattern: 'brick', size: 0.9, gap: 0.05, rounding: 0.3, vary: 0.25, color: '#7d7a72', effects: [bevel({ profile: 'chisel', size: 0.15, gloss: 0.15, surface: 'cracked', surfaceDepth: 0.4 }), DROP] },
      inscription('yugurian', '#e0faff', { name: 'Glowing inscription', size: 0.4, start: 1, effects: [glow({ inner: true, color: '#ffffff', opacity: 0.5, size: 0.04 }), glow({ color: '#7ae6ff', opacity: 0.9, size: 0.14 })] }),
    ],
  },
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
    id: 'e-granite',
    name: 'E · Polished granite',
    pitch: 'Dark speckled granite polished to a shine, with your pressed-in step. Clean and heavy.',
    colours: [slot('stone', 'Stone colour', '#4e4e4f', ['Band', 'Pressed-in step'])],
    layers: () => [
      ...base({ light: '#9a9a9c', dark: '#0a0a0c', step: 0.55, rims: false }),
      overlay('granite', 2, 'overlay', 0.9),
      { ...bandFillLayer(), name: 'Shine', paint: { kind: 'linear', angle: 45, followLight: true, stops: [{ at: 0, color: '#ffffff', opacity: 0.35 }, { at: 0.5, color: '#ffffff', opacity: 0 }] }, blend: 'screen' },
      ...rims(),
    ],
  },
];
