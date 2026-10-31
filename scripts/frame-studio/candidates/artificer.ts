// Artificer: candidates for new versions of Token Maker's Artificer frame.
import {
  bandFillLayer, bevel, BRONZE_STOPS, contact, DROP, gearsLayer, glow, inscription, lineLayer, metalFx, photo,
  projectFromFrame, recolour, repeatLayer, rims, slot, STEEL_STOPS, textureLayer, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('artificer');
const brass = (scale = 2) => photo('hammered-metal', scale, { lighting: 0.4 });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-brass-gears',
    name: 'A · Brass gears',
    pitch: 'Interlocking polished brass gears turning all the way round the band.',
    colours: [slot('metal', 'Brass colour', '#d8a048', ['Gears'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Plate', paint: { kind: 'solid', color: '#2a1a08' }, effects: [DROP] },
      { ...gearsLayer(), name: 'Gears', count: 10, at: 0.5, size: 0.95, teeth: 12, spokes: 4, hub: 0.3, altSize: 0.7, interlock: true, color: '#d8a048', effects: [bevel({ size: 0.15, gloss: 0.8 }), contact(0.6)] },
    ],
  },
  {
    id: 'b-copper-pipes',
    name: 'B · Copper pipework',
    pitch: 'Copper pipes running round the band, joined by brass collars and little pressure valves.',
    colours: [slot('pipes', 'Pipe colour', '#c06a3a', ['Pipes']), slot('collars', 'Collar colour', '#b5813a', ['Collars'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Back plate', paint: { kind: 'solid', color: '#1e1a16' }, effects: [DROP] },
      ...[0.3, 0.7].map((at) => ({ ...lineLayer(), name: 'Pipes', at, width: 0.3, paint: { kind: 'solid' as const, color: '#c06a3a' }, effects: [bevel({ profile: 'rounded', size: 0.9, depth: 1.4, gloss: 0.9 }), contact(0.5)] })),
      { ...repeatLayer(), name: 'Collars', element: 'square', count: 8, at: 0.5, size: 0.9, stretch: 0.25, fill: '#b5813a', raised: true, effects: [recolour(BRONZE_STOPS), bevel({ size: 0.4, gloss: 0.8 }), contact(0.6)] },
    ],
  },
  {
    id: 'c-arcane-engine',
    name: 'C · Arcane engine',
    pitch: 'Dark steel plating with glowing blue power lines and a Outer Rim AF schematic etched along it.',
    stage: { bloom: 0.25 },
    colours: [slot('metal', 'Metal colour', '#3a4048', ['Plating']), slot('glow', 'Power colour', '#4ad0ff', ['Power line', 'Schematic'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Plating', paint: brass(1.6), effects: [...metalFx(STEEL_STOPS, 0.2, 0.6), DROP] },
      { ...lineLayer(), name: 'Power line', at: 0.7, width: 0.035, paint: { kind: 'solid', color: '#d0f4ff' }, effects: [glow({ color: '#4ad0ff', opacity: 0.9, size: 0.14 })] },
      inscription('outerRim', '#a8e8ff', { name: 'Schematic', at: 0.32, size: 0.28, start: 3, effects: [glow({ color: '#4ad0ff', opacity: 0.6, size: 0.08 })] }),
    ],
  },
  {
    id: 'd-watchwork',
    name: 'D · Watchwork',
    pitch: 'The inside of a fine watch: tiny gold gears and jewel bearings on a silver plate.',
    colours: [slot('plate', 'Plate colour', '#c8ccd4', ['Plate']), slot('gears', 'Gear colour', '#e0a83a', ['Gears'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Plate', paint: brass(2.4), effects: [...metalFx(['#1e2228', '#5a606a', '#a8aeb8', '#e4e8f0', '#ffffff'], 0.25, 0.9), DROP] },
      { ...textureLayer('brushed'), name: 'Brushing', color: '#ffffff', opacity: 0.3, seed: 0xb706 },
      { ...gearsLayer(), name: 'Gears', count: 14, at: 0.5, size: 0.95, teeth: 14, spokes: 5, hub: 0.25, altSize: 0.6, interlock: true, color: '#e0a83a', effects: [bevel({ size: 0.12, gloss: 0.9 }), contact(0.5)] },
      { ...repeatLayer(), name: 'Jewels', element: 'gem', count: 8, at: 0.5, size: 0.24, fill: '#c0203a', raised: false, gemSparkle: 0.6 },
    ],
  },
  {
    id: 'e-riveted-iron',
    name: 'E · Workshop iron',
    pitch: 'Riveted iron plates with brass bolts, the kind of thing built at a workbench.',
    colours: [slot('metal', 'Iron colour', '#5a5e66', ['Plates']), slot('bolts', 'Bolt colour', '#b5813a', ['Bolts'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Plates', paint: brass(1.6), effects: [...metalFx(['#050608', '#1a1e24', '#5a5e66', '#9aa0aa', '#d8dce4'], 0.2, 0.6), DROP] },
      { ...repeatLayer(), name: 'Plate joins', element: 'tick', count: 10, at: 0.5, size: 1.1, stretch: 0.1, fill: '#0a0a0c', raised: false, shaded: false, opacity: 0.7 },
      { ...repeatLayer(), name: 'Bolts', element: 'bead', count: 20, at: 0.2, size: 0.18, fill: '#b5813a', raised: true, effects: [recolour(BRONZE_STOPS), contact(0.6)] },
      { ...repeatLayer(), name: 'Bolts', element: 'bead', count: 20, at: 0.8, size: 0.18, fill: '#b5813a', raised: true, effects: [recolour(BRONZE_STOPS), contact(0.6)] },
      ...rims(),
    ],
  },
];
