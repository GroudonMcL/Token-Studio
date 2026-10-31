// Night sky (Frame Studio's Layered starting designs): candidates.
import { base, glow, glowLines, metalFx, repeatLayer, SILVER_STOPS, slot, textureLayer, type Candidate, type Layer } from './common';
import { bandFillLayer } from './common';
import { layered } from './crafted';

export const CURRENT = layered('night-sky');
const dusk = (): Layer => ({
  ...bandFillLayer(), name: 'Dusk', blend: 'overlay', opacity: 0.8,
  paint: { kind: 'ring', stops: [{ angle: 0, color: '#1a1a4a' }, { angle: 90, color: '#0b0d1e' }, { angle: 180, color: '#3a2a6a' }, { angle: 225, color: '#c06aa0' }, { angle: 270, color: '#3a2a6a' }], followLight: true },
});
const stars = (count = 30): Layer => ({ ...repeatLayer(), name: 'Stars', element: 'star', count, snapToCorners: false, at: 0.4, size: 0.18, fill: '#fff8f0', altSizes: [1, 0.5, 0.75, 0.4], wander: 0.5, seed: 9, raised: false, shaded: false, effects: [glow({ color: '#c0d0ff', opacity: 0.7, size: 0.06 })] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-dusk-midnight',
    name: 'A · Dusk to midnight',
    pitch: 'Twin gradient bands in deep blue, with a dusk glow round one side, a nebula haze, stars and a glowing line.',
    stage: { bloom: 0.25 },
    colours: [slot('sky', 'Sky colour', '#1a1a4a', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#cfc4ff', ['Glowing lines'])],
    layers: () => [
      ...base({ light: '#2a2a6a', dark: '#04040e', step: 0.66 }),
      dusk(),
      { ...textureLayer('nebula'), name: 'Haze', color: '#6a4ad0', color2: '#2a6ad0', opacity: 0.35, blend: 'screen', seed: 0x2f1 },
      stars(),
      glowLines(['#f0ecff', '#cfc4ff'], '#8a7aff', { count: 1, from: 0.76, width: 0.03, size: 0.1 }),
    ],
  },
  {
    id: 'b-constellations',
    name: 'B · Constellations',
    pitch: 'Bright stars of every size in a dark band, as clear as a winter night, with silver rims.',
    stage: { bloom: 0.2 },
    colours: [slot('sky', 'Sky colour', '#0e1430', ['Band', 'Pressed-in step'])],
    layers: () => [...base({ light: '#1e2a5a', dark: '#02030a', step: null }), { ...textureLayer('sparkle'), name: 'Starlight', color: '#ffffff', amount: 1, scale: 0.5, seed: 0x5a39 }, stars(40)],
  },
  {
    id: 'c-aurora',
    name: 'C · Aurora',
    pitch: 'Green and teal northern lights rippling through a night-blue band.',
    stage: { bloom: 0.3 },
    colours: [slot('sky', 'Sky colour', '#0a1a2a', ['Band', 'Pressed-in step']), slot('aurora', 'Aurora colour', '#3aff9a', ['Aurora'])],
    layers: () => [
      ...base({ light: '#1a3050', dark: '#02060a', step: null }),
      { ...textureLayer('nebula'), name: 'Aurora', color: '#3aff9a', color2: '#2ac8ff', opacity: 0.75, blend: 'screen', seed: 0x2f2 },
      stars(20),
    ],
  },
  {
    id: 'd-moonlit',
    name: 'D · Moonlit',
    pitch: 'A soft midnight band with a silver crescent moon at each quarter and stars between.',
    stage: { bloom: 0.2 },
    colours: [slot('sky', 'Sky colour', '#141a4a', ['Band', 'Pressed-in step']), slot('moons', 'Moon colour', '#d8dce4', ['Moons'])],
    layers: () => [
      ...base({ light: '#2a3480', dark: '#02030e', step: 0.66 }),
      stars(24),
      { ...repeatLayer(), name: 'Moons', element: 'crescent', count: 4, snapToCorners: false, at: 0.45, size: 0.8, fill: '#d8dce4', raised: false, effects: [...metalFx(SILVER_STOPS, 0.4, 0.9), glow({ color: '#c0d0ff', opacity: 0.5, size: 0.08 })] },
    ],
  },
];
