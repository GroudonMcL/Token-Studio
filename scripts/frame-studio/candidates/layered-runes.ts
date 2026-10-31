// Glowing runes (Frame Studio's Layered starting designs): candidates.
import { base, glow, glowLines, inscription, overlay, slot, type Candidate } from './common';
import { layered } from './crafted';

export const CURRENT = layered('glowing-runes');

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-babelstone-glow',
    name: 'A · Runic glow',
    pitch: 'Dark slate in the twin gradient bands, BabelStone runes and a soft glowing line in the pressed-in step.',
    stage: { bloom: 0.25 },
    colours: [slot('stone', 'Stone colour', '#2a2c36', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#6fc3ff', ['Runes', 'Glowing lines'])],
    layers: () => [
      ...base({ light: '#4a4e5c', dark: '#06070a', step: 0.62 }),
      overlay('black-onyx', 5, 'overlay', 0.4),
      inscription('babelstone', '#d0f0ff', { name: 'Runes', at: 0.32, size: 0.4, start: 0, effects: [glow({ color: '#6fc3ff', opacity: 0.9, size: 0.12 })] }),
      glowLines(['#e8f8ff', '#8ad0ff'], '#4aa0ff', { count: 1, from: 0.8, width: 0.035, size: 0.12 }),
    ],
  },
  {
    id: 'b-emerald-runes',
    name: 'B · Emerald runes',
    pitch: 'Deep green stone with Yugurian runes glowing emerald.',
    stage: { bloom: 0.25 },
    colours: [slot('stone', 'Stone colour', '#1a3a2a', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#4aff9a', ['Runes', 'Glowing lines'])],
    layers: () => [
      ...base({ light: '#2e5a44', dark: '#020a06', step: 0.62 }),
      inscription('yugurian', '#d0ffe0', { name: 'Runes', at: 0.32, size: 0.4, start: 2, effects: [glow({ color: '#4aff9a', opacity: 0.85, size: 0.12 })] }),
      glowLines(['#e8fff0', '#8affb0'], '#2aff7a', { count: 1, from: 0.8, width: 0.035, size: 0.12 }),
    ],
  },
  {
    id: 'c-fire-runes',
    name: 'C · Fire runes',
    pitch: 'Black basalt with Sith AF runes burning orange-red.',
    stage: { bloom: 0.3 },
    colours: [slot('stone', 'Stone colour', '#2a2220', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#ff6a2a', ['Runes', 'Glowing lines'])],
    layers: () => [
      ...base({ light: '#4a3a34', dark: '#060302', step: 0.62 }),
      overlay('dark-rock', 2, 'overlay', 0.5),
      inscription('sith', '#ffe0b0', { name: 'Runes', at: 0.32, size: 0.38, start: 6, effects: [glow({ color: '#ff6a2a', opacity: 0.9, size: 0.12 })] }),
      glowLines(['#ffe0b0', '#ff8a3a'], '#ff4a1a', { count: 1, from: 0.8, width: 0.035, size: 0.12 }),
    ],
  },
  {
    id: 'd-twin-circle',
    name: 'D · Twin circle',
    pitch: 'Two rings of runes, BabelStone outside and Outer Rim AF inside, either side of a glowing line.',
    stage: { bloom: 0.25 },
    colours: [slot('stone', 'Stone colour', '#2a2c40', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#b08aff', ['Outer runes', 'Inner runes', 'Glowing lines'])],
    layers: () => [
      ...base({ light: '#4a4c6a', dark: '#06060e', step: 0.5 }),
      inscription('babelstone', '#f0e0ff', { name: 'Outer runes', at: 0.26, size: 0.3, start: 4, effects: [glow({ color: '#b08aff', opacity: 0.85, size: 0.1 })] }),
      glowLines(['#f8f0ff', '#c8a8ff'], '#9a6aff', { count: 1, from: 0.48, width: 0.03, size: 0.1 }),
      inscription('outerRim', '#f0e0ff', { name: 'Inner runes', at: 0.74, size: 0.28, start: 8, effects: [glow({ color: '#b08aff', opacity: 0.85, size: 0.1 })] }),
    ],
  },
];
