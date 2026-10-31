// Rope: candidates for new versions of the Crafted Rope frame.
import {
  across, bandFillLayer, bandShading, bevel, BRONZE_STOPS, contact, DROP, goldFx, lineLayer, metalFx, photo, recolour,
  repeatLayer, slot, textureLayer, WARM_GOLD, type Candidate,
} from './common';
import { crafted } from './crafted';

export const CURRENT = crafted('rope');
// Round, like a real rope: lit along the top edge and shaded underneath, from gradients rather than a bevel.
const roundShade = () => ({ ...bandFillLayer(), name: 'Round shading', blend: 'overlay' as const, opacity: 0.8, paint: across(['#000000', '#ffffff', '#808080', '#000000']) });
const rope = (name: string, color: string, o: { from?: number; to?: number; seed?: number } = {}) => [
  { ...bandFillLayer(), name, from: o.from ?? 0, to: o.to ?? 1, paint: { kind: 'solid' as const, color }, effects: [DROP] },
  { ...textureLayer('rope'), name: name + ' twist', from: o.from ?? 0, to: o.to ?? 1, color, amount: 1, strength: 1.2, seed: o.seed ?? 0xbead },
];

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-hemp',
    name: 'A · Hemp rope',
    pitch: 'The same hemp rope, made round with layered gradients instead of a bevel, with real fibres showing.',
    stage: { thickness: 0.14, outerSpacing: 0.03 },
    colours: [slot('rope', 'Rope colour', '#a8885a', ['Rope', 'Rope twist'])],
    layers: () => [
      ...rope('Rope', '#a8885a'),
      { ...bandFillLayer(), name: 'Fibres', paint: photo('rope', 0.6), opacity: 0.5, blend: 'overlay' },
      roundShade(),
    ],
  },
  {
    id: 'b-sailors',
    name: 'B · Sailor’s rope',
    pitch: 'Tarred rope coiled over a navy band, with a brass ring lashed on at each quarter.',
    colours: [slot('band', 'Band colour', '#1a2a4a', ['Band']), slot('rope', 'Rope colour', '#c8a870', ['Rope', 'Rope twist']), slot('brass', 'Ring colour', '#b5813a', ['Rings'])],
    layers: () => [
      ...bandShading([{ ...bandFillLayer(), name: 'Band', paint: { kind: 'linear', angle: 45, followLight: false, stops: [{ at: 0, color: '#2a4a7a', opacity: 1 }, { at: 1, color: '#040a18', opacity: 1 }] }, effects: [DROP] }], { step: null }),
      ...rope('Rope', '#c8a870', { from: 0.25, to: 0.75 }),
      { ...roundShade(), from: 0.25, to: 0.75 },
      { ...repeatLayer(), name: 'Rings', element: 'circle', count: 4, at: 0.5, size: 0.8, fill: '#b5813a', outline: null, raised: true, effects: [...metalFx(BRONZE_STOPS, 0.5, 0.9), contact(0.7)] },
    ],
  },
  {
    id: 'c-leather-cord',
    name: 'C · Braided leather',
    pitch: 'A tight plait of dark leather cord with a soft sheen, bound with a copper wire every so often.',
    stage: { thickness: 0.14, outerSpacing: 0.03 },
    colours: [slot('leather', 'Leather colour', '#5a3420', ['Cord', 'Cord twist']), slot('wire', 'Binding colour', '#c06a3a', ['Bindings'])],
    layers: () => [
      ...rope('Cord', '#5a3420', { seed: 0xbeef }),
      { ...bandFillLayer(), name: 'Leather', paint: photo('leather', 0.8), opacity: 0.45, blend: 'overlay' },
      roundShade(),
      { ...repeatLayer(), name: 'Bindings', element: 'square', count: 8, at: 0.5, size: 1, stretch: 0.22, fill: '#c06a3a', raised: true, effects: [...metalFx(['#1e0a04', '#6a3014', '#c06a3a', '#f0b08a', '#fff0e0'], 0.6, 0.9), contact(0.6)] },
    ],
  },
  {
    id: 'd-royal-cord',
    name: 'D · Royal cord',
    pitch: 'Crimson silk cord twisted with gold thread, like the rope on a throne room curtain.',
    stage: { thickness: 0.14, outerSpacing: 0.03 },
    colours: [slot('cord', 'Cord colour', '#a01828', ['Cord', 'Cord twist']), slot('gold', 'Thread colour', '#d8a838', ['Gold thread'])],
    layers: () => [
      ...rope('Cord', '#a01828', { seed: 0xbe0d }),
      { ...textureLayer('rope'), name: 'Gold thread', color: '#d8a838', amount: 0.5, strength: 1, opacity: 0.85, seed: 0xbe1d, effects: [recolour(WARM_GOLD)] },
      roundShade(),
    ],
  },
  {
    id: 'e-rope-wood',
    name: 'E · Lashed ring',
    pitch: 'A ring of smooth wood, shaded with gradient bands, lashed with rope bindings at eight points.',
    colours: [slot('wood', 'Wood colour', '#8a5a30', ['Wood']), slot('rope', 'Rope colour', '#c8a870', ['Lashings'])],
    layers: () => [
      ...bandShading([{ ...bandFillLayer(), name: 'Wood', paint: photo('wood-planks', 1.4, { angle: 90, lighting: 0.3 }), effects: [recolour(['#1a0c04', '#4a2a12', '#8a5a30', '#c89a68', '#f0d8b0']), DROP] }]),
      { ...repeatLayer(), name: 'Lashings', element: 'square', count: 8, at: 0.5, size: 1.08, stretch: 0.32, fill: '#c8a870', fillPaint: photo('rope', 0.3), raised: true, effects: [bevel({ profile: 'rounded', size: 0.6, gloss: 0.2 }), contact(0.6)] },
    ],
  },
];
export { goldFx, lineLayer };

// The original frame's band thickness, unless a candidate sets its own.
for (const c of CANDIDATES) c.stage = { ...{ thickness: 0.14, outerSpacing: 0.03 }, ...c.stage };
