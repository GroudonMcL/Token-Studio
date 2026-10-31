// Cleric: candidates for new versions of Token Maker's Cleric frame.
import {
  bandFillLayer, base, bevel, contact, DROP, glow, goldFx, goldPaint, inscription, lineLayer, metalFx, overlay, photo,
  projectFromFrame, recolour, repeatLayer, rims, SILVER_STOPS, slot, WARM_GOLD, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('cleric');

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-sunburst',
    name: 'A · Sunburst',
    pitch: 'A rich gold band with golden rays bursting outwards all the way round.',
    stage: { bloom: 0.2 },
    colours: [slot('gold', 'Gold colour', '#c8952e', ['Rays', 'Gold'])],
    layers: () => [
      { ...repeatLayer(), name: 'Rays', element: 'spike', count: 24, at: -0.25, size: 0.7, stretch: 0.4, accentEvery: 2, accentScale: 1.5, fill: '#c8952e', raised: false, effects: [recolour(WARM_GOLD), bevel({ profile: 'chisel', size: 0.5, gloss: 0.8 }), glow({ color: '#ffd870', opacity: 0.4, size: 0.1 })] },
      { ...bandFillLayer(), name: 'Gold', paint: goldPaint(2.4), effects: [...goldFx(0.35, WARM_GOLD), DROP] },
    ],
  },
  {
    id: 'b-holy-light',
    name: 'B · Holy light',
    pitch: 'A white-gold band glowing with radiant light, with a BabelStone prayer inscribed in gold.',
    stage: { bloom: 0.35, bleed: 0.2 },
    colours: [slot('band', 'Frame colour', '#fff0c0', ['Band', 'Pressed-in step']), slot('glow', 'Light colour', '#ffd870', ['Radiance', 'Prayer'])],
    layers: () => [
      ...base({ light: '#ffffff', dark: '#c8a050', step: 0.55 }),
      { ...lineLayer(), name: 'Radiance', at: 0.55, width: 0.04, paint: { kind: 'solid', color: '#ffffff' }, effects: [glow({ color: '#ffd870', opacity: 0.9, size: 0.2 })] },
      inscription('babelstone', '#a07010', { name: 'Prayer', at: 0.28, size: 0.32, effects: [glow({ color: '#ffd870', opacity: 0.5, size: 0.06 })] }),
    ],
  },
  {
    id: 'c-silver-sapphire',
    name: 'C · Silver & sapphire',
    pitch: 'Polished silver with holy symbols at the quarters, each set between two cut sapphires.',
    colours: [slot('metal', 'Metal colour', '#a8aeb8', ['Silver', 'Symbols']), slot('gems', 'Gem colour', '#2a5ad0', ['Sapphires'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Silver', paint: photo('hammered-metal', 2.4), effects: [...metalFx(SILVER_STOPS, 0.35, 0.9), DROP] },
      { ...repeatLayer(), name: 'Symbols', element: 'icon-holy-symbol', count: 4, at: 0.5, size: 1.4, fill: '#c8ccd4', raised: true, effects: [recolour(SILVER_STOPS), bevel({ size: 0.4, gloss: 0.9 }), contact(0.6)] },
      { ...repeatLayer(), name: 'Sapphires', element: 'gem', count: 8, offset: 0.5, at: 0.5, size: 0.5, fill: '#2a5ad0', raised: false, gemSparkle: 0.7, effects: [contact(0.5)] },
    ],
  },
  {
    id: 'd-temple-marble',
    name: 'D · Temple marble',
    pitch: 'White temple marble with gold inlaid lines and golden suns at the quarters.',
    colours: [slot('stone', 'Marble colour', '#ece6dc', ['Band', 'Texture']), slot('gold', 'Gold colour', '#c8952e', ['Gold lines', 'Suns'])],
    layers: () => [
      ...base({ light: '#ffffff', dark: '#8a8278', step: null, rims: false }),
      overlay('marble', 1.4, 'multiply', 0.6, { lighting: 0.3 }),
      { ...lineLayer(), name: 'Gold lines', at: 0.14, width: 0.05, paint: goldPaint(1.4), effects: goldFx(0.6, WARM_GOLD) },
      { ...lineLayer(), name: 'Gold lines', at: 0.86, width: 0.05, paint: goldPaint(1.4), effects: goldFx(0.6, WARM_GOLD) },
      { ...repeatLayer(), name: 'Suns', element: 'icon-heraldic-sun', count: 4, at: 0.5, size: 1.4, fill: '#c8952e', raised: true, effects: [recolour(WARM_GOLD), bevel({ size: 0.4, gloss: 0.8 }), contact(0.5)] },
      ...rims(),
    ],
  },
  {
    id: 'e-dawn',
    name: 'E · Dawn',
    pitch: 'Your clean band in a dawn gradient of rose and gold, with a soft glowing seam. Gentle and hopeful.',
    stage: { bloom: 0.2 },
    colours: [slot('band', 'Frame colour', '#ffb070', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#fff0c0', ['Dawn seam'])],
    layers: () => [
      ...base({ light: '#fff0b0', dark: '#a03a5a', step: 0.55, stepLight: '#ffd080', stepDark: '#6a1a3a' }),
      { ...lineLayer(), name: 'Dawn seam', at: 0.55, width: 0.03, paint: { kind: 'solid', color: '#fff0c0' }, effects: [glow({ color: '#ffd080', opacity: 0.8, size: 0.14 })] },
    ],
  },
];
