// Celestial star: candidates for new versions of the Crafted Celestial star frame.
import {
  bandFillLayer, base, bevel, contact, DROP, glow, goldFx, inscription, lineLayer, metalFx, recolour, repeatLayer, ROSE_STOPS,
  SILVER_STOPS, slot, textureLayer, WARM_GOLD, type Candidate,
} from './common';
import { crafted } from './crafted';

export const CURRENT = crafted('celestial');
const stars = (count = 24, at = 0.5, size = 0.2) => ({ ...repeatLayer(), name: 'Stars', element: 'star' as const, count, snapToCorners: false, at, size, fill: '#f4f0ff', raised: false, shaded: false, altSizes: [1, 0.6, 0.8], effects: [glow({ color: '#c0d0ff', opacity: 0.7, size: 0.06 })] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-gold-compass',
    name: 'A · Gold compass star',
    pitch: 'The same compass star in gold, over a deep blue band with a soft nebula and the twin gradient shading.',
    stage: { thickness: 0.12, outerSpacing: 0.14, bloom: 0.2 },
    colours: [slot('sky', 'Sky colour', '#1a2a78', ['Band', 'Pressed-in step', 'Nebula']), slot('gold', 'Gold colour', '#d8a838', ['Star points'])],
    layers: () => [
      { ...repeatLayer(), name: 'Star points', element: 'spike', count: 8, at: -0.5, size: 2.2, stretch: 0.5, offset: 1, accentEvery: 2, accentScale: 1.36, fill: '#d8a838', raised: false, effects: [bevel({ profile: 'chisel', size: 0.5, gloss: 0.9 }), recolour(WARM_GOLD), DROP] },
      ...base({ light: '#2a4ab0', dark: '#040a24', step: 0.55 }),
      { ...textureLayer('nebula'), name: 'Nebula', color: '#6a4ad0', color2: '#2a8ad0', opacity: 0.5, blend: 'screen', seed: 0x2ef },
      stars(),
    ],
  },
  {
    id: 'b-night-ring',
    name: 'B · Night ring',
    pitch: 'No points, just the sky: a nebula band full of stars, with a silver crescent moon at each quarter.',
    stage: { bloom: 0.2 },
    colours: [slot('sky', 'Sky colour', '#141a4a', ['Band', 'Pressed-in step']), slot('moons', 'Moon colour', '#d8dce4', ['Moons'])],
    layers: () => [
      ...base({ light: '#2a3480', dark: '#02030e', step: null }),
      { ...textureLayer('nebula'), name: 'Nebula', color: '#8a3ab0', color2: '#2a6ad0', opacity: 0.7, blend: 'screen', seed: 0x2f0 },
      { ...textureLayer('sparkle'), name: 'Starlight', color: '#ffffff', amount: 1, scale: 0.5, seed: 0x5a37 },
      { ...repeatLayer(), name: 'Moons', element: 'crescent', count: 4, at: 0.5, size: 1, fill: '#d8dce4', raised: false, effects: [...metalFx(SILVER_STOPS, 0.4, 0.9), glow({ color: '#c0d0ff', opacity: 0.5, size: 0.08 })] },
    ],
  },
  {
    id: 'c-sun-moon',
    name: 'C · Sun & moon',
    pitch: 'Day fading into night round the band: gold sun at the top, silver moon at the bottom, stars between.',
    stage: { bloom: 0.2 },
    colours: [slot('day', 'Day colour', '#e8a040', ['Band']), slot('night', 'Night colour', '#141a4a', ['Night'])],
    layers: () => [
      ...base({ light: '#f4c060', dark: '#a85020', step: null }),
      { ...bandFillLayer(), name: 'Night', paint: { kind: 'linear', angle: 90, followLight: false, stops: [{ at: 0.3, color: '#141a4a', opacity: 0 }, { at: 0.7, color: '#141a4a', opacity: 1 }] } },
      { ...stars(16, 0.5, 0.18), offset: 0.5 },
      { ...repeatLayer(), name: 'Sun', element: 'sun', count: 1, at: 0.5, size: 1.15, fill: '#f4d27a', raised: false, effects: [...goldFx(0.4, WARM_GOLD), glow({ color: '#ffd080', opacity: 0.6, size: 0.1 })] },
      { ...repeatLayer(), name: 'Moon', element: 'crescent', count: 1, offset: 0.5, at: 0.5, size: 1, fill: '#d8dce4', raised: false, effects: [...metalFx(SILVER_STOPS, 0.4, 0.9), glow({ color: '#c0d0ff', opacity: 0.5, size: 0.08 })] },
    ],
  },
  {
    id: 'd-astrolabe',
    name: 'D · Astrolabe',
    pitch: 'A brass astrolabe ring with fine degree marks and star names in Outer Rim AF.',
    colours: [slot('brass', 'Brass colour', '#b5813a', ['Band', 'Pressed-in step']), slot('marks', 'Mark colour', '#2a1a08', ['Degrees', 'Star names'])],
    layers: () => [
      ...base({ light: '#e0b060', dark: '#3a2208', step: 0.62 }),
      { ...repeatLayer(), name: 'Degrees', element: 'tick', count: 72, at: 0.8, size: 0.3, stretch: 0.2, fill: '#2a1a08', raised: false, shaded: false, accentEvery: 6, accentScale: 1.7 },
      inscription('outerRim', '#2a1a08', { name: 'Star names', at: 0.3, size: 0.34, start: 5, effects: [bevel({ direction: 'sunken', size: 0.5, gloss: 0.4 })] }),
    ],
  },
  {
    id: 'e-dawn',
    name: 'E · Dawn star',
    pitch: 'Rose-gold compass points over a soft pink-to-lilac dawn band with a few pale stars.',
    stage: { thickness: 0.12, outerSpacing: 0.14, bloom: 0.15 },
    colours: [slot('sky', 'Sky colour', '#c06a8a', ['Band', 'Pressed-in step']), slot('metal', 'Point colour', '#d8907a', ['Star points'])],
    layers: () => [
      { ...repeatLayer(), name: 'Star points', element: 'spike', count: 8, at: -0.5, size: 2.2, stretch: 0.5, offset: 1, accentEvery: 2, accentScale: 1.36, fill: '#d8907a', raised: false, effects: [bevel({ profile: 'chisel', size: 0.5, gloss: 0.9 }), recolour(ROSE_STOPS), DROP] },
      ...base({ light: '#f0a0b0', dark: '#4a2a6a', step: 0.55 }),
      stars(16, 0.5, 0.18),
    ],
  },
];
export { bandFillLayer, contact, DROP, lineLayer, ROSE_STOPS };

// The original frame's band thickness, unless a candidate sets its own.
for (const c of CANDIDATES) c.stage = { ...{ thickness: 0.16, outerSpacing: 0.03 }, ...c.stage };
