// Moon & stars (Frame Studio's Layered starting designs): candidates.
import { base, contact, glow, lineLayer, metalFx, repeatLayer, SILVER_STOPS, slot, textureLayer, WARM_GOLD, type Candidate, type Layer } from './common';
import { layered } from './crafted';

export const CURRENT = layered('moon-stars');
const STAGE = { thickness: 0.18, bloom: 0.2 };
const moonsAndStars = (fill: string, stops: string[], glowColor: string, at = 0.55): Layer[] => [
  { ...repeatLayer(), name: 'Moons', element: 'crescent', count: 8, snapToCorners: false, at, size: 0.6, fill, show: [true, false], raised: false, effects: [...metalFx(stops, 0.4, 0.9), glow({ color: glowColor, opacity: 0.5, size: 0.08 })] },
  { ...repeatLayer(), name: 'Stars', element: 'star', count: 8, snapToCorners: false, at, size: 0.44, fill, show: [false, true], raised: false, effects: [...metalFx(stops, 0.4, 0.9), glow({ color: glowColor, opacity: 0.5, size: 0.08 })] },
];
const scallop = (color: string, stops: string[]): Layer => ({ ...lineLayer(), name: 'Scalloped edge', at: 0.08, width: 0.05, paint: { kind: 'solid', color }, waveAmplitude: 0.06, waveFit: 0.45, waveShape: 'scallop', effects: [...metalFx(stops, 0.5, 0.9), contact(0.5)] });
const sparkle = (seed = 0x5a2c): Layer => ({ ...textureLayer('sparkle'), name: 'Sparkles', color: '#fff6d0', seed, amount: 0.7, scale: 0.7 });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-midnight-moons',
    name: 'A · Midnight moons',
    pitch: 'Midnight blue in the twin gradient bands, gold moons and stars in turn, sparkles and a silver scalloped edge.',
    stage: STAGE,
    colours: [slot('sky', 'Sky colour', '#1f2a5a', ['Band', 'Pressed-in step']), slot('gold', 'Moon colour', '#f4d27a', ['Moons', 'Stars'])],
    layers: () => [...base({ light: '#34449a', dark: '#04060e', step: 0.72 }), sparkle(), scallop('#d8dce4', SILVER_STOPS), ...moonsAndStars('#f4d27a', WARM_GOLD, '#fff2b0')],
  },
  {
    id: 'b-moon-phases',
    name: 'B · Moon phases',
    pitch: 'The moon waxing and waning round the band in silver, from crescent to full and back.',
    stage: STAGE,
    colours: [slot('sky', 'Sky colour', '#141a3a', ['Band', 'Pressed-in step']), slot('moons', 'Moon colour', '#e4e8f0', ['Moons'])],
    layers: () => [
      ...base({ light: '#2a3470', dark: '#02030a', step: null }),
      sparkle(0x5a2d),
      { ...repeatLayer(), name: 'Moons', element: 'crescent', count: 8, snapToCorners: false, at: 0.5, size: 0.62, fill: '#e4e8f0', show: [true, true, true, false, true, true, true, false], raised: false, effects: [...metalFx(SILVER_STOPS, 0.4, 0.9), glow({ color: '#c0d0ff', opacity: 0.5, size: 0.08 })] },
      { ...repeatLayer(), name: 'Moons', element: 'bead', count: 2, offset: 0.75, snapToCorners: false, at: 0.5, size: 0.58, fill: '#e4e8f0', raised: false, effects: [...metalFx(SILVER_STOPS, 0.5, 0.9), glow({ color: '#c0d0ff', opacity: 0.6, size: 0.1 })] },
    ],
  },
  {
    id: 'c-violet-silver',
    name: 'C · Violet & silver',
    pitch: 'Deep violet with silver moons and stars and a silver scalloped edge.',
    stage: STAGE,
    colours: [slot('sky', 'Sky colour', '#3a1a5a', ['Band', 'Pressed-in step']), slot('silver', 'Moon colour', '#e4e8f0', ['Moons', 'Stars', 'Scalloped edge'])],
    layers: () => [...base({ light: '#5a2a8a', dark: '#0a0214', step: 0.72 }), sparkle(0x5a2e), scallop('#d8dce4', SILVER_STOPS), ...moonsAndStars('#e4e8f0', SILVER_STOPS, '#e0d0ff')],
  },
  {
    id: 'd-dawn-moons',
    name: 'D · Dawn moons',
    pitch: 'A sky going from rose to indigo, with pale gold moons and stars.',
    stage: STAGE,
    colours: [slot('sky', 'Sky colour', '#a04a7a', ['Band', 'Pressed-in step']), slot('gold', 'Moon colour', '#f4d27a', ['Moons', 'Stars'])],
    layers: () => [...base({ light: '#f0a0b0', dark: '#2a1a5a', step: 0.72 }), sparkle(0x5a2f), ...moonsAndStars('#f8e8b0', WARM_GOLD, '#fff2d0')],
  },
];
