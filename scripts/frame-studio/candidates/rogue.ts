// Rogue: candidates for new versions of Token Maker's Rogue frame.
import {
  bandFillLayer, base, bevel, contact, DROP, glow, inscription, lineLayer, metalFx, photo, projectFromFrame, recolour,
  repeatLayer, rims, slot, STEEL_STOPS, textureLayer, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('rogue');
const DARK_LEATHER = ['#020202', '#0e0a08', '#2a2220', '#5a4a44', '#8a7a70'];

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-shadow-leather',
    name: 'A · Shadow leather',
    pitch: 'Supple black leather with neat grey stitching and a soft sheen. Quiet and close-fitting.',
    colours: [slot('leather', 'Leather colour', '#2a2220', ['Leather']), slot('stitch', 'Stitch colour', '#8a8a8a', ['Stitching'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Leather', paint: photo('leather', 1.4, { lighting: 0.7 }), effects: [recolour(DARK_LEATHER), bevel({ profile: 'rounded', size: 0.45, gloss: 0.5, highlightOpacity: 0.4 }), DROP] },
      ...[0.12, 0.88].map((at) => ({ ...lineLayer(), name: 'Stitching', at, width: 0.03, dash: 'dashed' as const, paint: { kind: 'solid' as const, color: '#8a8a8a' } })),
    ],
  },
  {
    id: 'b-dagger-belt',
    name: 'B · Dagger belt',
    pitch: 'A dark leather belt with four small daggers sheathed along it.',
    colours: [slot('leather', 'Leather colour', '#3a2a20', ['Belt']), slot('metal', 'Blade colour', '#a8b0ba', ['Daggers'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Belt', paint: photo('leather', 1.4, { lighting: 0.6 }), effects: [recolour(['#050302', '#1a120c', '#3a2a20', '#6a5444', '#9a8474']), bevel({ size: 0.4, gloss: 0.3 }), DROP] },
      { ...repeatLayer(), name: 'Daggers', element: 'icon-plain-dagger', count: 4, at: 0.5, size: 1.15, rotation: 90, fill: '#a8b0ba', raised: true, effects: [recolour(STEEL_STOPS), bevel({ size: 0.4, gloss: 0.9 }), contact(0.6)] },
    ],
  },
  {
    id: 'c-thieves-cant',
    name: 'C · Thieves’ cant',
    pitch: 'Charcoal band with secret marks in Outer Rim AF scratched in pale grey, legible only to the guild.',
    colours: [slot('band', 'Frame colour', '#2a2a30', ['Band', 'Pressed-in step']), slot('marks', 'Mark colour', '#b8b8c0', ['Cant'])],
    layers: () => [
      ...base({ light: '#5a5a66', dark: '#050506', step: 0.6 }),
      inscription('outerRim', '#b8b8c0', { name: 'Cant', at: 0.3, size: 0.34, start: 7, effects: [bevel({ direction: 'sunken', size: 0.5, gloss: 0.3 })] }),
    ],
  },
  {
    id: 'd-poison',
    name: 'D · Poisoner',
    pitch: 'Black leather with a thin seam of glowing green poison running through it.',
    stage: { bloom: 0.25 },
    colours: [slot('leather', 'Leather colour', '#1e1e20', ['Leather']), slot('poison', 'Poison colour', '#6aff4a', ['Poison seam'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Leather', paint: photo('leather', 1.4, { lighting: 0.6 }), effects: [recolour(DARK_LEATHER), bevel({ size: 0.4, gloss: 0.4 }), DROP] },
      { ...lineLayer(), name: 'Poison seam', at: 0.5, width: 0.04, paint: { kind: 'solid', color: '#d0ffb0' }, effects: [glow({ color: '#6aff4a', opacity: 0.9, size: 0.16 })] },
    ],
  },
  {
    id: 'e-smoke',
    name: 'E · Smoke & steel',
    pitch: 'Dark gunmetal veiled in drifting smoke, with a thin bright steel edge.',
    colours: [slot('metal', 'Metal colour', '#2a2e36', ['Gunmetal']), slot('smoke', 'Smoke colour', '#8a8a96', ['Smoke'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Gunmetal', paint: photo('hammered-metal', 2), effects: [...metalFx(['#020203', '#0e1014', '#2a2e36', '#6a707a', '#b8c0c8'], 0.3, 0.8), DROP] },
      { ...textureLayer('smoke'), name: 'Smoke', color: '#8a8a96', color2: '#0e1014', opacity: 0.7, seed: 0x5e0d },
      ...rims(),
    ],
  },
];
