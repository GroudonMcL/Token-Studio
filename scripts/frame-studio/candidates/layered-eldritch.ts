// Eldritch crystal (Frame Studio's Layered starting designs): candidates.
import { base, contact, glow, glowLines, growthLayer, overlay, repeatLayer, slot, textureLayer, type Candidate, type Layer } from './common';
import { layered } from './crafted';

export const CURRENT = layered('eldritch-crystal');
const shards = (fill: string, glowColor: string, count = 12): Layer => ({ ...repeatLayer(), name: 'Crystals', element: 'shard', count, snapToCorners: false, at: 0.5, size: 0.8, fill, altSizes: [1, 0.7, 0.85], jitterAngle: 18, seed: 5, raised: false, effects: [glow({ color: glowColor, opacity: 0.7, size: 0.1 }), contact(0.6)] });
const tendrils = (color: string, glowColor: string): Layer => ({ ...growthLayer('tendrils'), name: 'Tendrils', count: 2, thickness: 0.05, amplitude: 0.25, color, extraColor: color, effects: [glow({ color: glowColor, opacity: 0.4, size: 0.08 }), contact(0.6)] });
const stone = (light: string, dark: string): Layer[] => [...base({ light, dark, step: 0.62 }), overlay('black-onyx', 5, 'overlay', 0.5)];

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-void-crystal',
    name: 'A · Void crystal',
    pitch: 'Obsidian in the twin gradient bands, wound with dark tendrils, with glowing violet crystal shards and a glowing seam.',
    stage: { bloom: 0.3 },
    colours: [slot('stone', 'Stone colour', '#2a2430', ['Band', 'Pressed-in step', 'Tendrils']), slot('glow', 'Crystal colour', '#b06aff', ['Crystals', 'Glowing lines'])],
    layers: () => [...stone('#3a3440', '#020103'), tendrils('#3a1a4a', '#7a3aff'), shards('#c890ff', '#9a5aff'), glowLines(['#f0e0ff', '#c8a0ff'], '#9a5aff', { count: 1, from: 0.9, width: 0.03, size: 0.12 })],
  },
  {
    id: 'b-amethyst-geode',
    name: 'B · Amethyst geode',
    pitch: 'A band split open like a geode: dark rock outside, glittering amethyst crystal inside.',
    stage: { bloom: 0.2 },
    colours: [slot('stone', 'Rock colour', '#4a4038', ['Band']), slot('crystal', 'Crystal colour', '#9a4ad0', ['Geode', 'Crystals'])],
    layers: () => [
      ...stone('#5a5048', '#0a0806'),
      { ...textureLayer('crystal'), name: 'Geode', from: 0.35, to: 1, color: '#9a4ad0', opacity: 0.95, seed: 0xc277 },
      { ...textureLayer('sparkle'), name: 'Glitter', from: 0.35, to: 1, color: '#ffffff', amount: 0.6, scale: 0.4, seed: 0x5a3a },
      shards('#d8a8ff', '#b06aff', 10),
    ],
  },
  {
    id: 'c-eldritch-green',
    name: 'C · Fel crystal',
    pitch: 'Black stone and sickly green crystals, with green tendrils curling through.',
    stage: { bloom: 0.3 },
    colours: [slot('stone', 'Stone colour', '#1a201a', ['Band', 'Pressed-in step']), slot('glow', 'Crystal colour', '#6aff4a', ['Crystals', 'Tendrils', 'Glowing lines'])],
    layers: () => [...stone('#2a342a', '#020402'), tendrils('#1a4a1a', '#4aff2a'), shards('#a8ff8a', '#4aff2a'), glowLines(['#e8ffe0', '#a8ff8a'], '#4aff2a', { count: 1, from: 0.9, width: 0.03, size: 0.12 })],
  },
  {
    id: 'd-ice-crystal',
    name: 'D · Ice shards',
    pitch: 'Frosted blue-grey stone with pale ice crystal shards glowing cold.',
    stage: { bloom: 0.25 },
    colours: [slot('stone', 'Stone colour', '#4a5a6a', ['Band', 'Pressed-in step']), slot('glow', 'Ice colour', '#8ae8ff', ['Crystals', 'Glowing lines'])],
    layers: () => [
      ...stone('#6a7a8a', '#06080c'),
      { ...textureLayer('frost'), name: 'Frost', color: '#e0f4ff', opacity: 0.6, seed: 0xf207, blend: 'screen' },
      shards('#d8f8ff', '#6ad8ff'),
      glowLines(['#f0fcff', '#a8ecff'], '#4ac8ff', { count: 1, from: 0.9, width: 0.03, size: 0.12 }),
    ],
  },
];
