// Fighter: candidates for new versions of Token Maker's Fighter frame.
import {
  bandFillLayer, bevel, cellsLayer, contact, DROP, goldFx, goldPaint, inscription, lin, lineLayer, metalFx, photo,
  projectFromFrame, recolour, repeatLayer, rims, slot, STEEL_STOPS, textureLayer, WARM_GOLD, wear, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('fighter');
const steel = (scale = 2) => photo('hammered-metal', scale, { lighting: 0.4 });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-battle-steel',
    name: 'A · Battle steel',
    pitch: 'Bright steel with honest battle scratches and a ring of domed rivets.',
    colours: [slot('metal', 'Metal colour', '#7a828c', ['Steel', 'Rivets'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Steel', paint: steel(), effects: [wear({ chips: 0.02, polish: 0.6, grime: 0.2, scale: 0.1, scratches: 0.6 }), ...metalFx(STEEL_STOPS, 0.3, 0.8), DROP] },
      { ...repeatLayer(), name: 'Rivets', element: 'bead', count: 16, at: 0.5, size: 0.26, fill: '#a8b0ba', raised: true, effects: [recolour(STEEL_STOPS), contact(0.7)] },
      ...rims(),
    ],
  },
  {
    id: 'b-shield-wall',
    name: 'B · Shield wall',
    pitch: 'A row of painted shields in two colours, rimmed in steel, like a shield wall.',
    colours: [slot('paint', 'Shield colour', '#8a1a1a', ['Shields']), slot('metal', 'Metal colour', '#7a828c', ['Outer steel', 'Inner steel'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Under', paint: { kind: 'solid', color: '#1a1a1a' }, effects: [DROP] },
      { ...cellsLayer(), name: 'Shields', pattern: 'grid', from: 0.15, to: 0.85, size: 0.75, gap: 0.06, rounding: 0.4, vary: 0.35, color: '#8a1a1a', effects: [bevel({ profile: 'rounded', size: 0.3, gloss: 0.5, highlightOpacity: 0.5 })] },
      { ...bandFillLayer(), name: 'Outer steel', to: 0.16, paint: steel(1.4), effects: metalFx(STEEL_STOPS, 0.5, 0.8) },
      { ...bandFillLayer(), name: 'Inner steel', from: 0.84, paint: steel(1.4), effects: metalFx(STEEL_STOPS, 0.5, 0.8) },
    ],
  },
  {
    id: 'c-chainmail',
    name: 'C · Chainmail',
    pitch: 'Rows of interlinked steel rings between leather edges.',
    colours: [slot('metal', 'Metal colour', '#a8aeb8', ['Mail']), slot('leather', 'Leather colour', '#5a3418', ['Outer leather', 'Inner leather'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Under', paint: { kind: 'solid', color: '#3a3e46' }, effects: [DROP] },
      { ...textureLayer('chainmail'), name: 'Mail', color: '#a8aeb8', from: 0.12, to: 0.88, seed: 1, effects: [bevel({ size: 0.2, gloss: 0.8 })] },
      { ...bandFillLayer(), name: 'Outer leather', to: 0.14, paint: photo('leather', 1.4, { lighting: 0.6 }), effects: [recolour(['#0a0402', '#2a1408', '#5a3418', '#8a6040']), bevel({ size: 0.5, gloss: 0.2 })] },
      { ...bandFillLayer(), name: 'Inner leather', from: 0.86, paint: photo('leather', 1.4, { lighting: 0.6 }), effects: [recolour(['#0a0402', '#2a1408', '#5a3418', '#8a6040']), bevel({ size: 0.5, gloss: 0.2 })] },
    ],
  },
  {
    id: 'd-crossed-swords',
    name: 'D · Crossed swords',
    pitch: 'Blued steel with crossed swords at the quarters and a Sith AF battle motto between them.',
    colours: [slot('metal', 'Metal colour', '#3a4a6a', ['Blued steel']), slot('silver', 'Silver colour', '#d8dce4', ['Swords', 'Motto'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Blued steel', paint: steel(), effects: [...metalFx(['#04060c', '#141c2e', '#3a4a6a', '#8a9ab8', '#e0e8f8'], 0.3, 0.9), DROP] },
      { ...repeatLayer(), name: 'Swords', element: 'icon-crossed-swords', count: 4, at: 0.5, size: 1.4, fill: '#d8dce4', raised: true, effects: [bevel({ size: 0.4, gloss: 0.9 }), contact(0.6)] },
      inscription('sith', '#d8dce4', { name: 'Motto', size: 0.32, start: 5, effects: [bevel({ size: 0.4, gloss: 0.8 })] }),
      ...rims(),
    ],
  },
  {
    id: 'e-champion',
    name: 'E · Champion',
    pitch: 'Red enamel between gold rims, studded with gold rivets. A tournament champion’s colours.',
    colours: [slot('enamel', 'Enamel colour', '#a01a1a', ['Enamel']), slot('gold', 'Gold colour', '#c8952e', ['Outer gold', 'Inner gold', 'Rivets'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Enamel', paint: lin(['#e04a4a', '#a01a1a', '#2a0404']), effects: [bevel({ direction: 'sunken', size: 0.12, gloss: 0.9, highlightOpacity: 0.5 }), DROP] },
      { ...bandFillLayer(), name: 'Outer gold', to: 0.18, paint: goldPaint(1.4), effects: goldFx(0.5, WARM_GOLD) },
      { ...bandFillLayer(), name: 'Inner gold', from: 0.82, paint: goldPaint(1.4), effects: goldFx(0.5, WARM_GOLD) },
      { ...repeatLayer(), name: 'Rivets', element: 'bead', count: 12, at: 0.5, size: 0.24, fill: '#c8952e', raised: true, effects: [recolour(WARM_GOLD), contact(0.6)] },
    ],
  },
];
