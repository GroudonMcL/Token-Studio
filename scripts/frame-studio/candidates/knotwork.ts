// Knotwork: candidates for new versions of Token Maker's Knotwork frame.
import {
  bandFillLayer, base, bevel, contact, DROP, glow, goldFx, goldPaint, inscription, knotworkLayer, lin, lineLayer,
  metalFx, photo, projectFromFrame, recolour, rims, SILVER_STOPS, slot, WARM_GOLD, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('knotwork');
const knot = (name: string, color: string, patch = {}) => ({ ...knotworkLayer(), name, width: 0.24, amplitude: 0.28, waveLength: 1.1, color, double: true, shine: false, outlineWidth: 0.025, ...patch });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-celtic-gold',
    name: 'A · Celtic gold',
    pitch: 'Gold knotwork woven over and under on deep green enamel, between gold rims.',
    colours: [slot('enamel', 'Enamel colour', '#1e5a34', ['Enamel']), slot('gold', 'Gold colour', '#c8952e', ['Gold knot', 'Outer rim', 'Inner rim'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Enamel', paint: lin(['#3a8a5a', '#1e5a34', '#04140a']), effects: [bevel({ direction: 'sunken', size: 0.1, gloss: 0.9, highlightOpacity: 0.4 }), DROP] },
      { ...knot('Gold knot', '#c8952e'), effects: [...goldFx(0.4, WARM_GOLD)] },
      { ...lineLayer(), name: 'Outer rim', at: 0.03, width: 0.06, paint: goldPaint(1.4), effects: goldFx(0.6, WARM_GOLD) },
      { ...lineLayer(), name: 'Inner rim', at: 0.97, width: 0.06, paint: goldPaint(1.4), effects: goldFx(0.6, WARM_GOLD) },
    ],
  },
  {
    id: 'b-silver-black',
    name: 'B · Silver on black',
    pitch: 'Bright silver knotwork on glossy black, sharp and elegant.',
    colours: [slot('band', 'Band colour', '#1a1a20', ['Band']), slot('metal', 'Metal colour', '#a8aeb8', ['Silver knot'])],
    layers: () => [
      ...base({ light: '#4a4a58', dark: '#050508', step: null, rims: false }),
      { ...knot('Silver knot', '#c8ccd4'), effects: metalFx(SILVER_STOPS, 0.4, 0.9) },
      ...rims(),
    ],
  },
  {
    id: 'c-carved-stone',
    name: 'C · Carved stone',
    pitch: 'Knotwork carved into weathered stone, like a Pictish cross, with BabelStone runes along the inner edge.',
    colours: [slot('stone', 'Stone colour', '#908372', ['Stone'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Stone', paint: photo('coral-stone', 1.6, { lighting: 0.6 }), effects: [bevel({ profile: 'chisel', size: 0.2, gloss: 0.1, highlightOpacity: 0.4 }), DROP] },
      { ...knot('Carved knot', '#5a5044', { at: 0.42, width: 0.2, amplitude: 0.22, outline: null }), opacity: 0.8, blend: 'multiply', effects: [bevel({ direction: 'sunken', size: 0.5, gloss: 0.1, highlightOpacity: 0.5 })] },
      inscription('babelstone', '#3a3228', { name: 'Carved runes', at: 0.86, size: 0.2, spacing: 0.2, effects: [bevel({ direction: 'sunken', size: 0.6, gloss: 0.1 })] }),
    ],
  },
  {
    id: 'd-leather-braid',
    name: 'D · Braided leather',
    pitch: 'Strips of tan leather braided together over dark leather, with stitched edges.',
    colours: [slot('leather', 'Leather colour', '#3a1e0e', ['Leather']), slot('braid', 'Braid colour', '#b07040', ['Braid', 'Stitching'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Leather', paint: photo('leather', 1.6, { lighting: 0.6 }), effects: [recolour(['#0a0402', '#1e0e06', '#3a1e0e', '#6a3e22']), DROP] },
      { ...knot('Braid', '#b07040'), effects: [bevel({ size: 0.5, gloss: 0.3, highlightOpacity: 0.5 }), contact(0.5)] },
      { ...lineLayer(), name: 'Stitching', at: 0.07, width: 0.03, dash: 'dashed', paint: { kind: 'solid', color: '#b07040' } },
      { ...lineLayer(), name: 'Stitching', at: 0.93, width: 0.03, dash: 'dashed', paint: { kind: 'solid', color: '#b07040' } },
    ],
  },
  {
    id: 'e-fey-glow',
    name: 'E · Fey knot',
    pitch: 'A glowing knot of light woven through a dark band, as if drawn by the fey.',
    stage: { bloom: 0.3 },
    colours: [slot('band', 'Band colour', '#141a2a', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#6affd8', ['Glowing knot'])],
    layers: () => [
      ...base({ light: '#2a3448', dark: '#020306', step: 0.55 }),
      { ...knot('Glowing knot', '#d8fff4', { outline: null, width: 0.16 }), effects: [glow({ color: '#6affd8', opacity: 0.9, size: 0.16 })] },
    ],
  },
];
