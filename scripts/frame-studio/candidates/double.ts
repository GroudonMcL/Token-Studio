// Double line: candidates for new versions of Token Maker's Double line frame.
import {
  bandFillLayer, base, bevel, contact, DROP, goldFx, goldPaint, lin, lineLayer, metalFx, photo, projectFromFrame,
  recolour, repeatLayer, rims, shapeLayer, SILVER_STOPS, slot, textureLayer, WARM_GOLD, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('double');
const goldLine = (name: string, at: number, width = 0.11) => ({ ...lineLayer(), name, at, width, paint: goldPaint(1.4), effects: [...goldFx(0.6, WARM_GOLD)] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-gold-on-enamel',
    name: 'A · Gold lines on enamel',
    pitch: 'A glossy coloured band crossed by two bright gold lines, with small gold diamonds at the quarters.',
    colours: [slot('band', 'Frame colour', '#1e4a8a', ['Band']), slot('gold', 'Gold colour', '#c8952e', ['Outer line', 'Inner line', 'Diamonds'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Band', paint: lin(['#4a7ad0', '#1e4a8a', '#04102a']), effects: [bevel({ direction: 'sunken', size: 0.12, gloss: 0.9, highlightOpacity: 0.5, soften: 0.02 }), DROP] },
      goldLine('Outer line', 0.12),
      goldLine('Inner line', 0.88),
      { ...shapeLayer(), name: 'Diamonds', shape: 'polygon', sides: 4, along: 0.125, across: 0.5, size: 0.55, stretch: 0.7, fill: '#c8952e', outline: null, raised: false, faceted: true, facetTable: 0.3, mirror: 'four', effects: [recolour(WARM_GOLD), contact(0.5)] },
    ],
  },
  {
    id: 'b-twin-rings',
    name: 'B · Twin rings',
    pitch: 'Two separate rounded rings with a gap between them, each lit like your Simple band. Each ring takes its own colour.',
    colours: [slot('outer', 'Outer colour', '#e0a040', ['Outer ring']), slot('inner', 'Inner colour', '#c03a2a', ['Inner ring'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Outer ring', to: 0.44, paint: lin(['#ffd080', '#e0a040', '#3a2004']), effects: [bevel({ size: 0.5, gloss: 0.4, highlightOpacity: 0.5 }), DROP] },
      { ...bandFillLayer(), name: 'Inner ring', from: 0.56, paint: lin(['#ff7a6a', '#c03a2a', '#2a0604']), effects: [bevel({ size: 0.5, gloss: 0.4, highlightOpacity: 0.5 }), DROP] },
    ],
  },
  {
    id: 'c-studded',
    name: 'C · Studded double',
    pitch: 'Two polished silver lines with a row of silver studs between them on a dark band.',
    colours: [slot('band', 'Frame colour', '#2a2e38', ['Band']), slot('metal', 'Metal colour', '#a8aeb8', ['Outer line', 'Inner line', 'Studs'])],
    layers: () => [
      ...base({ light: '#4a5060', dark: '#08090c', step: null, rims: false }),
      { ...lineLayer(), name: 'Outer line', at: 0.14, width: 0.08, paint: photo('hammered-metal', 1.4), effects: metalFx(SILVER_STOPS, 0.6, 0.9) },
      { ...lineLayer(), name: 'Inner line', at: 0.86, width: 0.08, paint: photo('hammered-metal', 1.4), effects: metalFx(SILVER_STOPS, 0.6, 0.9) },
      { ...repeatLayer(), name: 'Studs', element: 'bead', mode: 'spacing', spacing: 0.6, snapToCorners: false, at: 0.5, size: 0.3, fill: '#a8aeb8', raised: true, effects: [recolour(SILVER_STOPS), contact(0.6)] },
      ...rims(),
    ],
  },
  {
    id: 'd-fine-lines',
    name: 'D · Fine lines',
    pitch: 'Your Simple band with two crisp bright lines pressed into it. The quietest option.',
    colours: [slot('band', 'Frame colour', '#c9b27a', ['Band', 'Pressed-in step'])],
    layers: () => [
      ...base({ light: '#e8d8a8', dark: '#3a2c14', step: 0.55 }),
      { ...lineLayer(), name: 'Bright line', at: 0.22, width: 0.035, paint: { kind: 'solid', color: '#fff8e8' }, opacity: 0.7, blend: 'overlay', effects: [bevel({ direction: 'sunken', size: 0.6, gloss: 0.4 })] },
      { ...lineLayer(), name: 'Bright line', at: 0.8, width: 0.035, paint: { kind: 'solid', color: '#fff8e8' }, opacity: 0.7, blend: 'overlay', effects: [bevel({ direction: 'sunken', size: 0.6, gloss: 0.4 })] },
    ],
  },
  {
    id: 'e-rope-between',
    name: 'E · Cord between gold',
    pitch: 'A twisted silk cord running between two gold lines, like a frame on an old portrait.',
    colours: [slot('cord', 'Cord colour', '#8a1a2a', ['Cord', 'Twist']), slot('gold', 'Gold colour', '#c8952e', ['Outer line', 'Inner line'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Cord', from: 0.18, to: 0.82, paint: lin(['#d04a5a', '#8a1a2a', '#2a0408']), effects: [bevel({ size: 0.9, depth: 1.4, gloss: 0.5 }), DROP] },
      { ...textureLayer('rope'), name: 'Twist', from: 0.18, to: 0.82, color: '#c03a4a', amount: 1, strength: 1.2, seed: 0xbead },
      goldLine('Outer line', 0.1, 0.18),
      goldLine('Inner line', 0.9, 0.18),
    ],
  },
];
