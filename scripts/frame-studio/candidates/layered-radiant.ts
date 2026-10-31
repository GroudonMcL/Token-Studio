// Radiant gold (Frame Studio's Layered starting designs): candidates.
import { base, bevel, contact, glow, goldFx, inscription, metalFx, repeatLayer, ROSE_STOPS, SILVER_STOPS, slot, WARM_GOLD, type Candidate, type Layer } from './common';
import { layered } from './crafted';

export const CURRENT = layered('radiant-gold');
const pearls = (at = 0.78, count = 36): Layer => ({ ...repeatLayer(), name: 'Pearls', element: 'bead', count, snapToCorners: false, at, size: 0.14, fill: '#f2eee4', raised: true, effects: [bevel({ profile: 'rounded', size: 0.8, gloss: 1 }), contact(0.5)] });
const gems = (fill: string, settingStops: string[], setting: string, count = 8): Layer => ({ ...repeatLayer(), name: 'Gems', element: 'gem', count, offset: 0.5, snapToCorners: false, at: 0.42, size: 0.48, fill, raised: false, gemFacets: 10, gemSparkle: 0.8, setting: 'claws4', settingColor: setting, settingEffects: metalFx(settingStops, 0.3, 0.9), effects: [contact(0.6)] });
const stars = (fill: string, stops: string[], glowColor: string): Layer => ({ ...repeatLayer(), name: 'Stars', element: 'star', count: 8, snapToCorners: false, at: 0.42, size: 0.62, fill, raised: false, effects: [...metalFx(stops, 0.4, 0.9), glow({ color: glowColor, opacity: 0.6, size: 0.1 })] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-holy-gold',
    name: 'A · Holy gold',
    pitch: 'Warm gold in the twin gradient bands, with glowing gold stars between sapphires, and a string of pearls in the step.',
    stage: { thickness: 0.18, bloom: 0.2 },
    colours: [slot('gold', 'Gold colour', '#c8952e', ['Band', 'Pressed-in step', 'Stars']), slot('gems', 'Gem colour', '#2a5ab8', ['Gems'])],
    layers: () => [...base({ light: '#f4d27a', dark: '#3a2006', step: 0.66 }), stars('#f4d27a', WARM_GOLD, '#ffe8a0'), gems('#2a5ab8', WARM_GOLD, '#d8a838'), pearls()],
  },
  {
    id: 'b-sunburst',
    name: 'B · Sunburst',
    pitch: 'Gold rays radiating across the band from glowing suns at the quarters.',
    stage: { thickness: 0.18, bloom: 0.25 },
    colours: [slot('gold', 'Gold colour', '#c8952e', ['Band', 'Pressed-in step', 'Rays', 'Suns'])],
    layers: () => [
      ...base({ light: '#f4d27a', dark: '#3a2006', step: null }),
      { ...repeatLayer(), name: 'Rays', element: 'tick', count: 72, snapToCorners: false, at: 0.5, size: 0.8, stretch: 0.12, fill: '#fff0b0', altSizes: [1, 0.6], raised: false, shaded: false, opacity: 0.6, blend: 'overlay' },
      { ...repeatLayer(), name: 'Suns', element: 'sun', count: 4, snapToCorners: false, at: 0.5, size: 0.85, fill: '#f4d27a', raised: false, effects: [...goldFx(0.4, WARM_GOLD), glow({ color: '#ffd080', opacity: 0.6, size: 0.12 })] },
    ],
  },
  {
    id: 'c-rose-pearl',
    name: 'C · Rose gold & pearls',
    pitch: 'Soft rose gold with pink sapphires and pearls.',
    stage: { thickness: 0.18 },
    colours: [slot('gold', 'Metal colour', '#d8907a', ['Band', 'Pressed-in step']), slot('gems', 'Gem colour', '#e0608a', ['Gems'])],
    layers: () => [...base({ light: '#f6d0c0', dark: '#3a1a14', step: 0.66 }), gems('#e0608a', ROSE_STOPS, '#e8b0a0'), pearls()],
  },
  {
    id: 'd-divine-script',
    name: 'D · Divine script',
    pitch: 'Gold with a glowing Yugurian prayer round it and white-gold stars at the quarters.',
    stage: { thickness: 0.18, bloom: 0.25 },
    colours: [slot('gold', 'Gold colour', '#c8952e', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#fff0c0', ['Prayer', 'Stars'])],
    layers: () => [
      ...base({ light: '#f4d27a', dark: '#3a2006', step: 0.66 }),
      inscription('yugurian', '#fffbe8', { name: 'Prayer', at: 0.34, size: 0.36, start: 11, effects: [glow({ color: '#ffe8a0', opacity: 0.9, size: 0.1 })] }),
      { ...stars('#f0f2f6', SILVER_STOPS, '#fff0c0'), count: 4, at: 0.83, size: 0.4 },
    ],
  },
];
