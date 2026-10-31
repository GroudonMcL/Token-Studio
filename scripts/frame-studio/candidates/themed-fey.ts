// Fey glade (Frame Studio's Themed starting designs): candidates.
import { base, contact, glow, growthLayer, overlay, repeatLayer, slot, textureLayer, type Candidate, type Layer } from './common';
import { themed } from './crafted';

export const CURRENT = themed('fey-glade');
const STAGE = { thickness: 0.18, bloom: 0.4 };
const tendrils = (color: string, glowColor: string): Layer => ({ ...growthLayer('tendrils'), name: 'Tendrils', count: 2, thickness: 0.035, color, extraColor: '#ffffff', effects: [glow({ color: glowColor, opacity: 0.35, size: 0.1 }), contact(0.5)] });
const dew = (fill: string, glowColor: string, count = 14): Layer => ({ ...repeatLayer(), name: 'Dewdrops', element: 'gem', gemCut: 'cabochon', count, snapToCorners: false, at: 0.5, size: 0.24, fill, raised: false, altSizes: [1, 0.6, 0.8], wander: 0.6, seed: 5, effects: [glow({ color: glowColor, opacity: 0.7, size: 0.1 })] });
const motes = (fill: string, glowColor: string): Layer => ({ ...repeatLayer(), name: 'Motes', element: 'star', count: 40, snapToCorners: false, at: 0.5, size: 0.1, fill, shaded: false, raised: false, altSizes: [1, 0.5, 0.7], wander: 0.8, skipChance: 0.3, seed: 8, effects: [glow({ color: glowColor, opacity: 0.8, size: 0.06 })] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-fey-twilight',
    name: 'A · Fey twilight',
    pitch: 'Teal-to-violet twilight in the twin gradient bands, silver-green tendrils, glowing dewdrops and fairy motes.',
    stage: STAGE,
    colours: [slot('band', 'Band colour', '#1e3a3a', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#7affc8', ['Dewdrops', 'Motes', 'Tendrils'])],
    layers: () => [...base({ light: '#2a5a5a', dark: '#0e0a24', step: 0.6 }), { ...textureLayer('nebula'), name: 'Mist', color: '#3a8a6a', color2: '#5a3aa0', opacity: 0.4, blend: 'screen', seed: 0x2f4 }, tendrils('#9ad0b0', '#7affc8'), dew('#7affd8', '#8affe0'), motes('#ffffe0', '#e0ffb0')],
  },
  {
    id: 'b-moonlit-glade',
    name: 'B · Moonlit glade',
    pitch: 'Midnight blue and silver: pale tendrils, moonlit dewdrops and cool motes.',
    stage: STAGE,
    colours: [slot('band', 'Band colour', '#141e40', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#b0d0ff', ['Dewdrops', 'Motes', 'Tendrils'])],
    layers: () => [...base({ light: '#2a3a6a', dark: '#02040e', step: 0.6 }), tendrils('#c8d8f0', '#b0d0ff'), dew('#d8e8ff', '#b0d0ff'), motes('#ffffff', '#c0d8ff')],
  },
  {
    id: 'c-mushroom-ring',
    name: 'C · Fairy ring',
    pitch: 'A mossy ring of spotted toadstools, with glowing motes drifting over it.',
    stage: STAGE,
    colours: [slot('moss', 'Moss colour', '#3a5a2a', ['Band', 'Pressed-in step']), slot('caps', 'Toadstool colour', '#c02a2a', ['Toadstools'])],
    layers: () => [
      ...base({ light: '#4a7a3a', dark: '#081404', step: null }),
      overlay('moss', 1, 'overlay', 0.7),
      { ...repeatLayer(), name: 'Toadstools', element: 'icon-spotted-mushroom', count: 9, snapToCorners: false, at: 0.5, size: 0.85, fill: '#c02a2a', altSizes: [1, 0.75, 0.85], raised: false, effects: [contact(0.7)] },
      motes('#ffffe0', '#e0ffb0'),
    ],
  },
  {
    id: 'd-fireflies',
    name: 'D · Firefly glade',
    pitch: 'Deep forest green with warm golden fireflies glowing all round it.',
    stage: { ...STAGE, bloom: 0.5 },
    colours: [slot('band', 'Band colour', '#14301a', ['Band', 'Pressed-in step']), slot('glow', 'Firefly colour', '#ffd060', ['Fireflies', 'Tendrils'])],
    layers: () => [
      ...base({ light: '#2a5030', dark: '#020a04', step: 0.6 }),
      tendrils('#4a7a3a', '#3aff6a'),
      { ...dew('#fff0a0', '#ffc040', 24), name: 'Fireflies', gemCut: 'cabochon', size: 0.16 },
    ],
  },
];
