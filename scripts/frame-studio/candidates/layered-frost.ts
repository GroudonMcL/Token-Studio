// Frostbound (Frame Studio's Layered starting designs): candidates.
import { bandFillLayer, bandShading, base, contact, DROP, glow, glowCracks, glowLines, inscription, lineLayer, recolour, metalFx, photo, repeatLayer, SILVER_STOPS, slot, textureLayer, type Candidate, type Layer } from './common';
import { layered } from './crafted';

export const CURRENT = layered('frostbound');
const STAGE = { thickness: 0.18, bloom: 0.25 };
const flakes = (count = 6, size = 0.6): Layer => ({ ...repeatLayer(), name: 'Snowflakes', element: 'snowflake', count, snapToCorners: false, at: 0.5, size, fill: '#ffffff', raised: false, effects: [...metalFx(SILVER_STOPS, 0.3, 0.9), glow({ color: '#9fd8ff', opacity: 0.6, size: 0.08 })] });
const frost = (): Layer => ({ ...textureLayer('frost'), name: 'Frost', color: '#e6f6ff', opacity: 0.8, seed: 0xf205, blend: 'screen' });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-frost-steel',
    name: 'A · Frost steel',
    pitch: 'Icy blue steel in the twin gradient bands, furred with frost, with a glowing zigzag and silver snowflakes.',
    stage: STAGE,
    colours: [slot('ice', 'Ice colour', '#6f93b8', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#9fd8ff', ['Zigzag'])],
    layers: () => [
      ...base({ light: '#a8c8e8', dark: '#0a1a2a', step: 0.62 }),
      frost(),
      { ...lineLayer(), name: 'Zigzag', at: 0.5, width: 0.03, paint: { kind: 'solid', color: '#eaf8ff' }, waveAmplitude: 0.3, waveFit: 0.5, waveShape: 'zigzag', effects: [glow({ color: '#9fd8ff', opacity: 0.8, size: 0.1 })] },
      flakes(),
    ],
  },
  {
    id: 'b-glacier',
    name: 'B · Glacier',
    pitch: 'Clear glacier ice split by cracks that glow cold blue from within.',
    stage: STAGE,
    colours: [slot('ice', 'Ice colour', '#8ab8d8', ['Ice']), slot('glow', 'Glow colour', '#4ac8ff', ['Glowing cracks'])],
    layers: () => [
      ...bandShading([{ ...bandFillLayer(), name: 'Ice', paint: photo('ice', 1.4), effects: [recolour(['#04101c', '#1a4a6a', '#6aa8d0', '#c8ecff', '#ffffff']), DROP] }]),
      glowCracks('#0a2030', '#4ac8ff', '#c0f0ff', 21, 0.8),
    ],
  },
  {
    id: 'c-snowfall',
    name: 'C · Snowfall',
    pitch: 'Deep winter blue with a flurry of snowflakes of every size.',
    stage: STAGE,
    colours: [slot('sky', 'Sky colour', '#1a3a6a', ['Band', 'Pressed-in step'])],
    layers: () => [
      ...base({ light: '#2a5a9a', dark: '#040c1a', step: null }),
      { ...textureLayer('sparkle'), name: 'Snow', color: '#ffffff', amount: 1, scale: 0.4, seed: 0x5a3b },
      { ...flakes(14, 0.5), altSizes: [1, 0.55, 0.75], wander: 0.6, jitterAngle: 30, seed: 6 },
    ],
  },
  {
    id: 'd-frozen-runes',
    name: 'D · Frozen runes',
    pitch: 'Frosted grey-blue stone with BabelStone runes glowing icy cyan and a glowing seam.',
    stage: STAGE,
    colours: [slot('stone', 'Stone colour', '#5a6a7a', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#8af0ff', ['Runes', 'Glowing lines'])],
    layers: () => [
      ...base({ light: '#7a8a9a', dark: '#06080c', step: 0.66 }),
      frost(),
      inscription('babelstone', '#e8fcff', { name: 'Runes', at: 0.32, size: 0.4, start: 6, effects: [glow({ color: '#8af0ff', opacity: 0.9, size: 0.12 })] }),
      glowLines(['#f0fcff', '#a8ecff'], '#4ac8ff', { count: 1, from: 0.82, width: 0.03, size: 0.1 }),
    ],
  },
];
export { contact };
