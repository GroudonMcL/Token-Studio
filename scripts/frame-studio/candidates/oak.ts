// Oak: candidates for new versions of Token Maker's Oak frame.
import {
  adjust, bandFillLayer, base, bevel, BRONZE_STOPS, contact, DROP, inscription, lin, lineLayer, metalFx, overlay, photo,
  projectFromFrame, recolour, repeatLayer, rims, slot, textureLayer, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('oak');
const OAK = ['#140a04', '#4a2a12', '#8a5a32', '#c89060', '#f0d0a0'];

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-varnished',
    name: 'A · Varnished oak',
    pitch: 'Real oak grain running round the band under a glossy varnish, with your pressed-in step.',
    colours: [slot('wood', 'Wood colour', '#8a5a32', ['Oak', 'Pressed-in oak'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Oak', paint: photo('wood-planks', 1.4, { angle: 90, lighting: 0.4 }), effects: [recolour(OAK), bevel({ size: 0.35, gloss: 0.7, highlightOpacity: 0.6, soften: 0.02 }), DROP] },
      { ...bandFillLayer(), name: 'Pressed-in oak', from: 0.55, to: 1, paint: lin(['#140a04', '#c89060']), opacity: 0.45, blend: 'soft-light' },
      { ...lineLayer(), name: 'Crease', at: 0.55, width: 0.03, opacity: 0.55, blend: 'overlay', paint: { kind: 'solid', color: '#190500' } },
      ...rims(),
    ],
  },
  {
    id: 'b-brass-bound',
    name: 'B · Brass-bound oak',
    pitch: 'Oak bound by two brass bands and studded with brass nails, like an old sea chest.',
    colours: [slot('wood', 'Wood colour', '#8a5a32', ['Oak']), slot('metal', 'Metal colour', '#a87a3a', ['Outer brass', 'Inner brass', 'Nails'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Oak', paint: photo('medieval-wood', 1.6, { angle: 90, lighting: 0.5 }), effects: [recolour(OAK), DROP] },
      { ...bandFillLayer(), name: 'Outer brass', to: 0.2, paint: photo('hammered-metal', 1.4), effects: metalFx(BRONZE_STOPS, 0.5, 0.8) },
      { ...bandFillLayer(), name: 'Inner brass', from: 0.8, paint: photo('hammered-metal', 1.4), effects: metalFx(BRONZE_STOPS, 0.5, 0.8) },
      { ...repeatLayer(), name: 'Nails', element: 'bead', count: 12, at: 0.5, size: 0.24, fill: '#a87a3a', raised: true, effects: [recolour(BRONZE_STOPS), contact(0.6)] },
    ],
  },
  {
    id: 'c-carved-runes',
    name: 'C · Rune-carved oak',
    pitch: 'Dark oak with a BabelStone runic inscription carved deep into it.',
    colours: [slot('wood', 'Wood colour', '#6a4024', ['Oak'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Oak', paint: photo('medieval-wood', 1.6, { angle: 90, lighting: 0.5 }), effects: [recolour(['#0a0402', '#2a160a', '#6a4024', '#a87850', '#e0c098']), bevel({ size: 0.3, gloss: 0.3 }), DROP] },
      inscription('babelstone', '#1a0c04', { name: 'Carved runes', size: 0.46, spacing: 0.18, effects: [bevel({ direction: 'sunken', size: 0.6, gloss: 0.2, highlightOpacity: 0.5 })] }),
      ...rims(),
    ],
  },
  {
    id: 'd-living-bark',
    name: 'D · Living bark',
    pitch: 'Rough plane-tree bark with patches of green moss growing over it.',
    colours: [slot('bark', 'Bark colour', '#56473c', ['Bark']), slot('moss', 'Moss colour', '#6a8a2a', ['Moss'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Bark', paint: photo('plane-bark', 2, { angle: 90, lighting: 0.6 }), effects: [bevel({ profile: 'rounded', size: 0.45, gloss: 0.1, highlightOpacity: 0.4 }), DROP] },
      { ...textureLayer('lichen'), name: 'Moss', color: '#6a8a2a', amount: 1.3, opacity: 0.9, seed: 0x11c4 },
    ],
  },
  {
    id: 'e-driftwood',
    name: 'E · Driftwood',
    pitch: 'Pale, sun-bleached driftwood with soft grey grain and a gentle sheen. Light and calm.',
    colours: [slot('wood', 'Wood colour', '#b8b0a4', ['Driftwood', 'Pressed-in step'])],
    layers: () => [
      ...base({ light: '#e8e2d8', dark: '#4a4440', step: 0.55, rims: false }),
      overlay('medieval-wood', 1.6, 'multiply', 0.55, { angle: 90 }),
      { ...bandFillLayer(), name: 'Driftwood', paint: photo('medieval-wood', 1.6, { angle: 90 }), opacity: 0.4, blend: 'luminosity', effects: [adjust({ saturation: -0.8 })] },
      ...rims(),
    ],
  },
];
