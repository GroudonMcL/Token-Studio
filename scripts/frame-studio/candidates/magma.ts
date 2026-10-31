// Magma: candidates for new versions of Token Maker's Magma frame.
import {
  adjust, bandFillLayer, base, bevel, blur, cellsLayer, DROP, glow, glowCracks, goldFx, goldPaint, inscription, lin,
  lineLayer, overlay, photo, projectFromFrame, slot, textureLayer, WARM_GOLD, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('magma');
const hotRing = (name: string, at: number, color = '#ff6a1a') => ({ ...lineLayer(), name, at, width: 0.06, paint: { kind: 'solid' as const, color: '#ffd080' }, effects: [glow({ color, opacity: 1, size: 0.24 }), blur(0.02)] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-crust',
    name: 'A · Cooling crust',
    pitch: 'Dark plates of cooled rock floating on bright molten lava that glows through every gap.',
    stage: { bloom: 0.3, bleed: 0.2 },
    colours: [slot('fire', 'Lava colour', '#ff6a1a', ['Molten lava']), slot('rock', 'Crust colour', '#2a1e1c', ['Crust'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Molten lava', paint: lin(['#ffe080', '#ff6a1a', '#a01a02']), effects: [glow({ color: '#ff6a1a', opacity: 0.6, size: 0.14 }), DROP] },
      { ...cellsLayer(), name: 'Crust', pattern: 'voronoi', size: 0.55, gap: 0.06, jitter: 0.9, rounding: 0.35, vary: 0.3, color: '#2a1e1c', effects: [bevel({ profile: 'rounded', size: 0.25, gloss: 0.2, surface: 'cracked', surfaceDepth: 0.5, highlightOpacity: 0.3 })] },
    ],
  },
  {
    id: 'b-obsidian-fire',
    name: 'B · Obsidian & fire',
    pitch: 'Black volcanic glass with a ring of fire glowing along both edges.',
    stage: { bloom: 0.3 },
    colours: [slot('glass', 'Glass colour', '#1a1416', ['Band']), slot('fire', 'Fire colour', '#ff6a1a', ['Outer fire', 'Inner fire'])],
    layers: () => [
      ...base({ light: '#4a3a3e', dark: '#020102', step: null, rims: false }),
      overlay('black-onyx', 6, 'overlay', 0.7),
      hotRing('Outer fire', 0.05),
      hotRing('Inner fire', 0.95),
    ],
  },
  {
    id: 'c-ember-streaks',
    name: 'C · Ember streaks',
    pitch: 'Streaks of embers dragged round the band, with sparks drifting off them.',
    stage: { bloom: 0.25 },
    colours: [slot('fire', 'Ember colour', '#ff6a1a', ['Embers', 'Sparks'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Embers', paint: photo('molten-rock', 2, { angle: 90 }), effects: [adjust({ contrast: 0.3 }), bevel({ size: 0.3, gloss: 0.3, highlightOpacity: 0.3 }), DROP] },
      { ...textureLayer('sparkle'), name: 'Sparks', color: '#ffc060', amount: 0.5, scale: 0.5, seed: 0x5a2d, effects: [glow({ color: '#ff6a1a', opacity: 0.7, size: 0.06 })] },
    ],
  },
  {
    id: 'd-volcanic-script',
    name: 'D · Volcanic script',
    pitch: 'Dark basalt with a Sith AF inscription glowing like magma, between two hot seams.',
    stage: { bloom: 0.25 },
    colours: [slot('rock', 'Rock colour', '#211c17', ['Basalt']), slot('fire', 'Fire colour', '#ff5a10', ['Glowing script', 'Outer seam', 'Inner seam'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Basalt', paint: photo('dark-rock', 2.4, { lighting: 0.5 }), effects: [adjust({ brightness: -0.2 }), bevel({ profile: 'chisel', size: 0.3, gloss: 0.2, highlightOpacity: 0.3 }), DROP] },
      inscription('sith', '#ffe0a0', { name: 'Glowing script', size: 0.44, start: 2, effects: [glow({ inner: true, color: '#fff4c0', opacity: 0.6, size: 0.04 }), glow({ color: '#ff5a10', opacity: 0.9, size: 0.18 })] }),
      hotRing('Outer seam', 0.08, '#ff5a10'),
      hotRing('Inner seam', 0.92, '#ff5a10'),
    ],
  },
  {
    id: 'e-molten-gold',
    name: 'E · Molten gold',
    pitch: 'Rich gold cracked open, with molten metal glowing through the cracks.',
    stage: { bloom: 0.25 },
    colours: [slot('gold', 'Gold colour', '#c8952e', ['Gold']), slot('fire', 'Glow colour', '#ff7a1a', ['Glowing cracks'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Gold', paint: goldPaint(2.4), effects: [...goldFx(0.35, WARM_GOLD), DROP] },
      { ...glowCracks('#2a1004', '#ff7a1a', '#ffc04a', 7), name: 'Glowing cracks', opacity: 0.8 },
    ],
  },
];
