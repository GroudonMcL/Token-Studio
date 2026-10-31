// Harlequin: candidates for new versions of Token Maker's Harlequin frame.
import {
  bandFillLayer, base, bevel, cellsLayer, contact, DROP, glow, goldFx, goldPaint, lin, lineLayer, photo,
  projectFromFrame, recolour, repeatLayer, rims, slot, WARM_GOLD, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('harlequin');
// Diamonds that fit inside the piping and meet tip to tip, one at each corner.
const diamonds = (name: string, fill: string, offset: number, effects = [bevel({ size: 0.15, gloss: 0.6, highlightOpacity: 0.4 })]) => ({
  ...repeatLayer(), name, element: 'diamond' as const, mode: 'count' as const, count: 36, offset, snapToCorners: true, at: 0.5, size: 0.8, stretch: 0.88, fill, raised: false, shaded: false, effects,
});
const goldPiping = (name: string, at: number) => ({ ...lineLayer(), name, at, width: 0.09, paint: goldPaint(1.4), effects: goldFx(0.6, WARM_GOLD) });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-jester',
    name: 'A · Jester’s diamonds',
    pitch: 'Crisp diamonds in two colours, glossy like lacquer, with gold piping along both edges.',
    colours: [slot('first', 'First colour', '#8c2f4a', ['Band', 'Dark diamonds']), slot('second', 'Second colour', '#e8c050', ['Light diamonds']), slot('trim', 'Trim colour', '#c8952e', ['Outer piping', 'Inner piping'])],
    layers: () => [
      ...base({ light: '#d04a6a', dark: '#3a0a18', step: null, rims: false }),
      diamonds('Light diamonds', '#e8c050', 0.5),
      goldPiping('Outer piping', 0.04),
      goldPiping('Inner piping', 0.96),
    ],
  },
  {
    id: 'b-velvet',
    name: 'B · Velvet harlequin',
    pitch: 'Soft patterned velvet in the diamonds, with a satin sheen and gold cord edges.',
    colours: [slot('velvet', 'Velvet colour', '#930320', ['Velvet']), slot('trim', 'Trim colour', '#c8952e', ['Outer piping', 'Inner piping'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Velvet', paint: photo('jacquard', 1.2, { lighting: 0.6 }), effects: [bevel({ size: 0.5, gloss: 0.2, highlightOpacity: 0.35 }), DROP] },
      { ...diamonds('Sheen', '#ffffff', 0.5, []), opacity: 0.12, blend: 'screen' },
      goldPiping('Outer piping', 0.04),
      goldPiping('Inner piping', 0.96),
    ],
  },
  {
    id: 'c-checker',
    name: 'C · Checkered enamel',
    pitch: 'A two-colour chequerboard in glossy enamel between silver rims. Bold and playful.',
    colours: [slot('first', 'First colour', '#1a1a1a', ['Band']), slot('second', 'Second colour', '#f0ece4', ['Squares'])],
    layers: () => [
      ...base({ light: '#4a4a4a', dark: '#050505', step: null, rims: false }),
      { ...repeatLayer(), name: 'Squares', element: 'square', mode: 'count', count: 24, snapToCorners: true, at: 0.25, size: 0.56, stretch: 1.3, fill: '#f0ece4', raised: false, shaded: false, clip: 'band', effects: [bevel({ size: 0.1, gloss: 0.8, highlightOpacity: 0.4 })] },
      { ...repeatLayer(), name: 'Squares', element: 'square', mode: 'count', count: 24, snapToCorners: true, offset: 0.5, at: 0.75, size: 0.56, stretch: 1.3, fill: '#f0ece4', raised: false, shaded: false, clip: 'band', effects: [bevel({ size: 0.1, gloss: 0.8, highlightOpacity: 0.4 })] },
      ...rims(),
    ],
  },
  {
    id: 'd-stained-glass',
    name: 'D · Stained glass',
    pitch: 'Pieces of coloured glass held in dark leading, glowing softly as if lit from behind.',
    stage: { bloom: 0.2 },
    colours: [slot('glass', 'Glass colour', '#3a6ad0', ['Glass']), slot('lead', 'Leading colour', '#1a1a1e', ['Leading'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Leading', paint: lin(['#4a4a50', '#1a1a1e', '#050505']), effects: [DROP] },
      { ...cellsLayer(), name: 'Glass', pattern: 'voronoi', size: 0.55, gap: 0.07, jitter: 0.9, rounding: 0.1, vary: 0.9, color: '#3a6ad0', effects: [bevel({ size: 0.15, gloss: 0.9, highlightOpacity: 0.5 }), glow({ inner: true, color: '#ffffff', opacity: 0.25, size: 0.1 })] },
    ],
  },
  {
    id: 'e-carnival',
    name: 'E · Carnival',
    pitch: 'Bright harlequin diamonds with little gold bells at the points. Festive.',
    colours: [slot('first', 'First colour', '#2a6ad0', ['Band']), slot('second', 'Second colour', '#e03a3a', ['Light diamonds']), slot('bells', 'Bell colour', '#c8952e', ['Bells'])],
    layers: () => [
      ...base({ light: '#5a9aff', dark: '#0a1a50', step: null, rims: false }),
      diamonds('Light diamonds', '#e03a3a', 0.5),
      { ...repeatLayer(), name: 'Bells', element: 'bead', mode: 'spacing', spacing: 1.2, snapToCorners: false, at: 0.5, size: 0.28, fill: '#c8952e', raised: true, effects: [recolour(WARM_GOLD), contact(0.6)] },
      ...rims(),
    ],
  },
];
