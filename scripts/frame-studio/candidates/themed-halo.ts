// Celestial halo (Themed): candidates.
import { glowLines, goldFx, ROSE_STOPS, SILVER_STOPS, slot, WARM_GOLD, type Candidate, type Layer } from './common';
import { base, contact, glow, metalFx, ring } from './themed-kit';
import { themed } from './crafted';

export const CURRENT = themed('celestial-halo');
const STAGE = { thickness: 0.2, bloom: 0.35 };
const rays = (color: string): Layer => ring('Rays', 'tick', 72, color, [], { size: 0.85, stretch: 0.1, altSizes: [1, 0.55], opacity: 0.6, blend: 'overlay', shaded: false } as never);
const stars = (fill: string, stops: string[], glowColor: string, count = 8): Layer => ring('Stars', 'star', count, fill, [...metalFx(stops, 0.4, 0.9), glow({ color: glowColor, opacity: 0.7, size: 0.12 })], { size: 0.55, altSizes: [1, 0.6] } as never);

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-white-gold', name: 'A · White-gold halo',
    pitch: 'White gold in the twin gradient bands, a radiant sunburst of rays, glowing stars and a soft heavenly bloom.',
    stage: STAGE,
    colours: [slot('metal', 'Metal colour', '#e8e4d8', ['Band', 'Pressed-in step', 'Stars']), slot('glow', 'Glow colour', '#fff4c0', ['Glowing lines'])],
    layers: () => [...base({ light: '#ffffff', dark: '#8a8678', step: 0.7 }), rays('#ffffff'), stars('#fffbe8', ['#4a4638', '#a8a490', '#e8e4d8', '#fffcf0', '#ffffff'], '#fff4c0'), glowLines(['#ffffff', '#fff4c0'], '#ffe890', { count: 1, from: 0.7, width: 0.025, size: 0.12 })],
  },
  {
    id: 'b-golden-halo', name: 'B · Golden halo',
    pitch: 'Warm gold with a sunburst and golden stars.',
    stage: STAGE,
    colours: [slot('gold', 'Gold colour', '#d8a838', ['Band', 'Pressed-in step', 'Stars'])],
    layers: () => [...base({ light: '#f4d27a', dark: '#4a2a06', step: 0.7 }), rays('#fff0b0'), stars('#f4d27a', WARM_GOLD, '#ffe8a0')],
  },
  {
    id: 'c-dawn-halo', name: 'C · Dawn halo',
    pitch: 'Rose gold and pink dawn light with pale stars.',
    stage: STAGE,
    colours: [slot('metal', 'Metal colour', '#e8b0a0', ['Band', 'Pressed-in step', 'Stars'])],
    layers: () => [...base({ light: '#fce0d8', dark: '#6a3a40', step: 0.7 }), rays('#ffe8f0'), stars('#ffe8e0', ROSE_STOPS, '#ffd0e0')],
  },
  {
    id: 'd-moon-halo', name: 'D · Moon halo',
    pitch: 'Cool silver moonlight with silver stars and a crescent at the top.',
    stage: STAGE,
    colours: [slot('metal', 'Metal colour', '#c8ccd8', ['Band', 'Pressed-in step', 'Stars'])],
    layers: () => [...base({ light: '#e8ecf4', dark: '#3a4050', step: 0.7 }), rays('#ffffff'), stars('#f0f4ff', SILVER_STOPS, '#c8d8ff'), ring('Moon', 'crescent', 1, '#f0f4ff', [...goldFx(0.4, SILVER_STOPS), glow({ color: '#c8d8ff', opacity: 0.6, size: 0.1 }), contact(0.5)], { size: 0.85, snapToCorners: false } as never)],
  },
];
