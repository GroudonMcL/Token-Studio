// Ranger: candidates for new versions of Token Maker's Ranger frame.
import {
  bandFillLayer, bevel, contact, DROP, growthLayer, inscription, lineLayer, photo, projectFromFrame, recolour,
  repeatLayer, slot, textureLayer, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('ranger');
const LEATHER = ['#0a0602', '#2a1a0a', '#5a3a1a', '#8a6a40', '#c0a070'];

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-fletching',
    name: 'A · Arrow fletching',
    pitch: 'Grey-green feathers laid along a leather quiver strap, like the fletching of arrows.',
    colours: [slot('feathers', 'Feather colour', '#6a7a5a', ['Feathers']), slot('leather', 'Leather colour', '#5a3a1a', ['Strap'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Strap', paint: photo('leather', 1.4, { lighting: 0.6 }), effects: [recolour(LEATHER), bevel({ size: 0.4, gloss: 0.2 }), DROP] },
      { ...textureLayer('feathers'), name: 'Feathers', color: '#6a7a5a', from: 0.12, to: 0.88, seed: 0xfeaa, effects: [contact(0.5)] },
    ],
  },
  {
    id: 'b-woodland',
    name: 'B · Woodland cloak',
    pitch: 'Green woollen cloak cloth with an oak-leaf clasp at the top and stitched edges.',
    colours: [slot('cloth', 'Cloth colour', '#3a5a2a', ['Cloak']), slot('clasp', 'Clasp colour', '#a87a3a', ['Clasp'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Cloak', paint: photo('hessian', 0.7, { lighting: 0.6 }), effects: [recolour(['#040a02', '#16260e', '#3a5a2a', '#7a9a5a']), bevel({ size: 0.5, gloss: 0.1 }), DROP] },
      ...[0.08, 0.92].map((at) => ({ ...lineLayer(), name: 'Stitching', at, width: 0.03, dash: 'dashed' as const, paint: { kind: 'solid' as const, color: '#c8b888' } })),
      { ...repeatLayer(), name: 'Clasp', element: 'icon-oak-leaf', count: 1, at: 0.5, size: 0.8, fill: '#a87a3a', raised: true, effects: [recolour(['#1e1206', '#5a3a18', '#a87a3a', '#e0c08a', '#fff0d0']), bevel({ size: 0.4, gloss: 0.8 }), contact(0.6)] },
    ],
  },
  {
    id: 'c-bowstave',
    name: 'C · Yew bowstave',
    pitch: 'Smooth, honey-coloured yew wood bound with green cord, like the grip of a longbow.',
    colours: [slot('wood', 'Wood colour', '#c08850', ['Yew']), slot('cord', 'Cord colour', '#3a6a3a', ['Bindings'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Yew', paint: photo('wood-planks', 1.4, { angle: 90, lighting: 0.4 }), effects: [recolour(['#2a1406', '#7a4a1e', '#c08850', '#f0c890', '#fff0d8']), bevel({ profile: 'rounded', size: 0.6, depth: 1.3, gloss: 0.7 }), DROP] },
      { ...repeatLayer(), name: 'Bindings', element: 'square', count: 8, at: 0.5, size: 0.95, stretch: 0.35, fill: '#3a6a3a', raised: true, effects: [bevel({ size: 0.5, gloss: 0.3, surface: 'grain', surfaceDepth: 0.5 }), contact(0.5)] },
    ],
  },
  {
    id: 'd-trail-runes',
    name: 'D · Trail markings',
    pitch: 'Weathered bark with trail markings in Yugurian carved into it, as a ranger leaves for others.',
    colours: [slot('bark', 'Bark colour', '#5f5640', ['Bark']), slot('carving', 'Carving colour', '#d8c8a0', ['Markings'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Bark', paint: photo('bark', 1.6, { angle: 90, lighting: 0.6 }), effects: [bevel({ profile: 'rounded', size: 0.5, gloss: 0.15 }), DROP] },
      inscription('yugurian', '#d8c8a0', { name: 'Markings', size: 0.4, start: 1, effects: [bevel({ direction: 'sunken', size: 0.5, gloss: 0.2 })] }),
    ],
  },
  {
    id: 'e-pine-wreath',
    name: 'E · Pine wreath',
    pitch: 'Pine boughs and small cones wound into a ring, dark green and fresh.',
    colours: [slot('pine', 'Pine colour', '#2a4a2a', ['Boughs']), slot('cones', 'Cone colour', '#6a4424', ['Cones'])],
    layers: () => [
      { ...growthLayer('vine'), name: 'Boughs', count: 3, thickness: 0.06, amplitude: 0.14, waveLength: 1.4, extra: 'thorns', extraSpacing: 0.14, extraSize: 0.2, color: '#3a2a1a', extraColor: '#2a4a2a', effects: [bevel({ size: 0.4, gloss: 0.3 }), DROP] },
      { ...repeatLayer(), name: 'Cones', element: 'bead', count: 8, at: 0.5, size: 0.34, stretch: 0.7, fill: '#6a4424', raised: true, effects: [bevel({ size: 0.6, gloss: 0.3, surface: 'scales', surfaceDepth: 0.8 }), contact(0.6)] },
    ],
  },
];
