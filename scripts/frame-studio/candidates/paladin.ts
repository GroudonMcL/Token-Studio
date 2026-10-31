// Paladin: candidates for new versions of Token Maker's Paladin frame.
import {
  bandFillLayer, base, bevel, contact, DROP, glow, goldFx, goldPaint, inscription, lin, lineLayer, metalFx, photo,
  projectFromFrame, recolour, repeatLayer, SILVER_STOPS, slot, WARM_GOLD, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('paladin');

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-oathbound',
    name: 'A · Oathbound silver',
    pitch: 'Polished white silver with a gold oath inscribed in BabelStone runes and gold crosses at the quarters.',
    colours: [slot('metal', 'Metal colour', '#c8ccd4', ['Silver']), slot('gold', 'Gold colour', '#c8952e', ['Oath', 'Crosses'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Silver', paint: photo('hammered-metal', 2.4), effects: [...metalFx(SILVER_STOPS, 0.35, 0.95), DROP] },
      inscription('babelstone', '#c8952e', { name: 'Oath', size: 0.32, start: 2, effects: [recolour(WARM_GOLD), bevel({ size: 0.4, gloss: 0.8 })] }),
      { ...repeatLayer(), name: 'Crosses', element: 'cross', count: 4, at: 0.5, size: 0.72, fill: '#c8952e', raised: true, effects: [recolour(WARM_GOLD), bevel({ size: 0.5, gloss: 0.8 }), contact(0.6)] },
    ],
  },
  {
    id: 'b-tabard',
    name: 'B · Tabard',
    pitch: 'A blue cloth tabard band trimmed with gold braid, like a knight’s surcoat.',
    colours: [slot('cloth', 'Cloth colour', '#1e3a8a', ['Cloth']), slot('gold', 'Gold colour', '#c8952e', ['Outer braid', 'Inner braid'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Cloth', paint: photo('hessian', 0.7, { lighting: 0.6 }), effects: [recolour(['#02061a', '#0e1e4a', '#1e3a8a', '#5a7ad0']), bevel({ size: 0.5, gloss: 0.15, highlightOpacity: 0.3 }), DROP] },
      ...[0.08, 0.92].map((at, i) => ({ ...lineLayer(), name: i ? 'Inner braid' : 'Outer braid', at, width: 0.12, paint: goldPaint(1.2), dash: 'solid' as const, effects: goldFx(0.7, WARM_GOLD) })),
    ],
  },
  {
    id: 'c-radiant-shield',
    name: 'C · Radiant shield',
    pitch: 'Bright steel with a glowing golden seam and a soft holy aura, like a blessed shield rim.',
    stage: { bloom: 0.3 },
    colours: [slot('metal', 'Metal colour', '#a8b0bc', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#ffd870', ['Holy seam'])],
    layers: () => [
      ...base({ light: '#f4f8ff', dark: '#3a4250', step: 0.55 }),
      { ...lineLayer(), name: 'Holy seam', at: 0.55, width: 0.035, paint: { kind: 'solid', color: '#fff4d0' }, effects: [glow({ color: '#ffd870', opacity: 0.9, size: 0.18 })] },
    ],
  },
  {
    id: 'd-lion-crest',
    name: 'D · Lion & crown',
    pitch: 'Royal blue enamel between gold rims, with gold crowns at the quarters.',
    colours: [slot('enamel', 'Enamel colour', '#1e3a8a', ['Enamel']), slot('gold', 'Gold colour', '#c8952e', ['Outer gold', 'Inner gold', 'Crowns'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Enamel', paint: lin(['#4a6ad0', '#1e3a8a', '#040a24']), effects: [bevel({ direction: 'sunken', size: 0.12, gloss: 0.9, highlightOpacity: 0.5 }), DROP] },
      { ...bandFillLayer(), name: 'Outer gold', to: 0.16, paint: goldPaint(1.4), effects: goldFx(0.5, WARM_GOLD) },
      { ...bandFillLayer(), name: 'Inner gold', from: 0.84, paint: goldPaint(1.4), effects: goldFx(0.5, WARM_GOLD) },
      { ...repeatLayer(), name: 'Crowns', element: 'icon-crown', count: 4, at: 0.5, size: 1.1, fill: '#c8952e', raised: true, effects: [recolour(WARM_GOLD), bevel({ size: 0.4, gloss: 0.8 }), contact(0.5)] },
    ],
  },
  {
    id: 'e-dawnsteel',
    name: 'E · Dawnsteel',
    pitch: 'Steel washed in the warm light of dawn, with a Sith AF vow etched in pale gold.',
    colours: [slot('band', 'Frame colour', '#e0b890', ['Band', 'Pressed-in step']), slot('etch', 'Etching colour', '#fff0c0', ['Vow'])],
    layers: () => [
      ...base({ light: '#fff0d8', dark: '#5a4a5a', step: 0.6 }),
      inscription('sith', '#fff0c0', { name: 'Vow', at: 0.28, size: 0.3, start: 6, effects: [bevel({ direction: 'sunken', size: 0.5, gloss: 0.4 })] }),
    ],
  },
];
