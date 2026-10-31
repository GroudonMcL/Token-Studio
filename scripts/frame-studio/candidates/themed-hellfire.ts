// Hellfire ring (Themed): candidates.
import { glowCracks, overlay, slot, type Candidate, type Layer } from './common';
import { base, glow, photoBand, ring, textureLayer } from './themed-kit';
import { themed } from './crafted';

export const CURRENT = themed('hellfire-ring');
const STAGE = { thickness: 0.2, bloom: 0.35, bleed: 0.2 };
const ROCK = ['#020101', '#140604', '#3a1a10', '#6a3a28', '#9a6a50'];
const flames = (fill: string, glowColor: string): Layer => ring('Flames', 'flame', 14, fill, [glow({ color: glowColor, opacity: 0.8, size: 0.12 })], { at: 0.55, size: 0.55, altSizes: [1, 0.7, 0.85], shaded: false } as never);
const embers = (color: string): Layer => ({ ...textureLayer('sparkle'), name: 'Embers', color, amount: 0.8, scale: 0.5, seed: 0x5a3c, effects: [glow({ color, opacity: 0.6, size: 0.04 })] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-hellfire', name: 'A · Hellfire',
    pitch: 'Molten rock shaded with gradients, split by blurred burning cracks, with flames licking along it and embers.',
    stage: STAGE,
    colours: [slot('rock', 'Rock colour', '#3a1a10', ['Rock']), slot('fire', 'Fire colour', '#ff6a1a', ['Glowing cracks', 'Flames'])],
    layers: () => [...photoBand('Rock', 'dark-rock', ROCK), glowCracks('#1a0602', '#ff6a1a', '#ffc070', 31, 0.9), flames('#ffd070', '#ff5a1a'), embers('#ffb050')],
  },
  {
    id: 'b-blue-hellfire', name: 'B · Blue hellfire',
    pitch: 'The same fire burning blue and white, hotter and stranger.',
    stage: STAGE,
    colours: [slot('rock', 'Rock colour', '#1a1a2a', ['Rock']), slot('fire', 'Fire colour', '#4a8aff', ['Glowing cracks', 'Flames'])],
    layers: () => [...photoBand('Rock', 'dark-rock', ['#010102', '#04060e', '#1a1a2a', '#3a3a5a', '#6a6a8a']), glowCracks('#020618', '#4a8aff', '#c0e0ff', 33, 0.9), flames('#d0e8ff', '#4a8aff'), embers('#a0c8ff')],
  },
  {
    id: 'c-ash', name: 'C · Ash & ember',
    pitch: 'Grey ash still glowing underneath, with sparks drifting off it.',
    stage: STAGE,
    colours: [slot('ash', 'Ash colour', '#5a5450', ['Band', 'Pressed-in step']), slot('fire', 'Ember colour', '#ff7a2a', ['Glowing cracks'])],
    layers: () => [...base({ light: '#7a746e', dark: '#1a1614', step: null }), overlay('cracked-mud', 1.4, 'overlay', 0.6), glowCracks('#1a0602', '#ff7a2a', '#ffb05a', 35, 0.6), embers('#ffa040')],
  },
  {
    id: 'd-lava-flow', name: 'D · Lava flow',
    pitch: 'A ring of flowing lava, crusted dark at the edges and bright in the middle.',
    stage: STAGE,
    colours: [slot('lava', 'Lava colour', '#ff4a1a', ['Lava'])],
    layers: () => [...photoBand('Lava', 'lava-flow', null, { step: null }), { ...textureLayer('lava'), name: 'Lava', from: 0.3, to: 0.7, color: '#ff6a2a', color2: '#5a0a04', opacity: 0.7, blend: 'screen', seed: 0x1a7c }],
  },
];
