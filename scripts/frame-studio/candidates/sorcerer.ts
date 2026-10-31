// Sorcerer: candidates for new versions of Token Maker's Sorcerer frame.
import {
  bandFillLayer, base, bevel, cellsLayer, contact, DROP, glow, glowLines, inscription, lin, overlay, photo,
  projectFromFrame, repeatLayer, slot, textureLayer, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('sorcerer');

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-dragon-hide',
    name: 'A · Dragon hide',
    pitch: 'Overlapping red dragon scales with a glossy sheen, darker towards the edges.',
    colours: [slot('scales', 'Scale colour', '#b8322a', ['Scales'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Under', paint: { kind: 'solid', color: '#2a0604' }, effects: [DROP] },
      { ...cellsLayer(), name: 'Scales', pattern: 'scales', size: 0.55, gap: 0.03, rounding: 0.3, vary: 0.25, color: '#b8322a', effects: [bevel({ profile: 'rounded', size: 0.3, gloss: 0.8, highlightOpacity: 0.6 })] },
    ],
  },
  {
    id: 'b-wild-magic',
    name: 'B · Wild magic',
    pitch: 'A swirl of colours shifting round the band, with sparks of raw magic. Unpredictable.',
    stage: { bloom: 0.3 },
    colours: [slot('first', 'First colour', '#ff3a6a', ['Swirl']), slot('second', 'Second colour', '#3a8aff', ['Swirl glow'])],
    layers: () => [
      ...base({ light: '#4a2a6a', dark: '#06020e', step: null }),
      { ...textureLayer('nebula'), name: 'Swirl', color: '#ff3a6a', color2: '#3a8aff', opacity: 0.9, blend: 'screen', seed: 0x2ee },
      { ...textureLayer('sparkle'), name: 'Swirl glow', color: '#ffffff', amount: 1, scale: 0.5, seed: 0x5a36, effects: [glow({ color: '#c08aff', opacity: 0.7, size: 0.06 })] },
    ],
  },
  {
    id: 'c-bloodline',
    name: 'C · Draconic bloodline',
    pitch: 'Dark red band with a glowing ember seam and a Sith AF inscription in the tongue of dragons.',
    stage: { bloom: 0.25 },
    colours: [slot('band', 'Frame colour', '#7a1a14', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#ff8a3a', ['Glowing lines', 'Draconic'])],
    layers: () => [
      ...base({ light: '#b8322a', dark: '#120202', step: 0.55 }),
      glowLines(['#ffd090', '#ff6a2a'], '#ff6a1a', { count: 2, from: 0.05, spacing: 0.9, width: 0.035, size: 0.12 }),
      inscription('sith', '#ffd0a0', { name: 'Draconic', at: 0.3, size: 0.32, start: 2, effects: [glow({ color: '#ff8a3a', opacity: 0.8, size: 0.1 })] }),
    ],
  },
  {
    id: 'd-storm-sorcery',
    name: 'D · Storm sorcery',
    pitch: 'Dark storm-blue band crackling with lightning between two glowing rings.',
    stage: { bloom: 0.35 },
    colours: [slot('band', 'Frame colour', '#1a2a4a', ['Band']), slot('glow', 'Lightning colour', '#8ad0ff', ['Glowing lines', 'Lightning'])],
    layers: () => [
      ...base({ light: '#3a4a7a', dark: '#02040a', step: null }),
      overlay('black-onyx', 6, 'screen', 0.35),
      glowLines(['#e8f8ff', '#8ad0ff'], '#4aa0ff', { count: 2, from: 0.07, spacing: 0.86, width: 0.03, size: 0.14 }),
      { ...textureLayer('smoke'), name: 'Lightning', color: '#e8f8ff', color2: '#1a2a4a', opacity: 0.6, blend: 'screen', seed: 0x5e0e },
    ],
  },
  {
    id: 'e-crystal-heart',
    name: 'E · Crystal heart',
    pitch: 'Faceted ruby crystal set in a dark band, with four cut gems glowing from within.',
    stage: { bloom: 0.25 },
    colours: [slot('crystal', 'Crystal colour', '#c02a4a', ['Crystal', 'Gems'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Crystal', paint: lin(['#ff6a8a', '#c02a4a', '#2a0410']), effects: [DROP] },
      { ...textureLayer('crystal'), name: 'Facets', color: '#c02a4a', opacity: 0.8, seed: 0xc276 },
      { ...repeatLayer(), name: 'Gems', element: 'gem', count: 4, at: 0.5, size: 0.75, fill: '#c02a4a', raised: false, gemSparkle: 0.8, effects: [glow({ color: '#ff4a6a', opacity: 0.6, size: 0.12 }), contact(0.5)] },
    ],
  },
];
export { photo };
