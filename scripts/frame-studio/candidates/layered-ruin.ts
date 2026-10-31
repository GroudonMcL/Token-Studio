// Overgrown ruin (Frame Studio's Layered starting designs): candidates.
import { bandFillLayer, bandShading, cellsLayer, contact, DROP, growthLayer, knotworkLayer, photo, recolour, slot, type Candidate, type Layer } from './common';
import { layered } from './crafted';

export const CURRENT = layered('overgrown-ruin');
const stones = (stops: string[]): Layer[] => bandShading([
  { ...bandFillLayer(), name: 'Mortar', paint: { kind: 'solid', color: '#1a1814' }, effects: [DROP] },
  { ...cellsLayer(), name: 'Stone plates', size: 0.85, gap: 0.05, missing: 0.08, vary: 0.35, color: '#8a8478', seed: 7, effects: [recolour(stops)] },
], { step: null });
const STONE = ['#14130f', '#4a4842', '#8a8478', '#c8c4ba', '#f0ece2'];
const vine = (color: string, leaf: string, extra: 'leaves' | 'berries' = 'leaves', seed = 9): Layer => ({ ...growthLayer('vine'), name: 'Creeper', count: 2, thickness: 0.035, amplitude: 0.3, waveLength: 1.8, extra, extraSize: 0.42, color, extraColor: leaf, seed, effects: [contact(0.6)] });
const roots = (): Layer => ({ ...growthLayer('roots'), name: 'Roots', count: 2, thickness: 0.05, color: '#3a2a1a', extraColor: '#3a2a1a', seed: 4, clip: 'band', effects: [contact(0.7)] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-mossy-ruin',
    name: 'A · Mossy ruin',
    pitch: 'Weathered stone blocks shaded with gradients, moss in the joints, roots and a leafy creeper growing over.',
    colours: [slot('stone', 'Stone colour', '#8a8478', ['Stone plates']), slot('leaves', 'Leaf colour', '#5a8a32', ['Creeper', 'Moss'])],
    layers: () => [...stones(STONE), { ...bandFillLayer(), name: 'Moss', paint: photo('moss', 1), opacity: 0.45, blend: 'multiply', clip: 'band' }, roots(), vine('#2e4a1c', '#5a8a32')],
  },
  {
    id: 'b-jungle-ruin',
    name: 'B · Jungle temple',
    pitch: 'Sandstone blocks swallowed by jungle vines with red flowers.',
    colours: [slot('stone', 'Stone colour', '#b89a6a', ['Stone plates']), slot('flowers', 'Flower colour', '#d02a3a', ['Flowers'])],
    layers: () => [...stones(['#2a1e0e', '#6a5434', '#b89a6a', '#e0cca0', '#fff4dc']), vine('#2a4a1a', '#3a7a2a', 'leaves', 11), { ...vine('#2a4a1a', '#d02a3a', 'berries', 13), name: 'Flowers', count: 1 }],
  },
  {
    id: 'c-autumn-ruin',
    name: 'C · Autumn ruin',
    pitch: 'Grey stone with an ivy creeper turned red and orange for autumn.',
    colours: [slot('stone', 'Stone colour', '#8a8478', ['Stone plates']), slot('leaves', 'Leaf colour', '#c0501a', ['Creeper'])],
    layers: () => [...stones(STONE), roots(), vine('#4a2a14', '#c0501a', 'leaves', 15)],
  },
  {
    id: 'd-knot-ruin',
    name: 'D · Ancient knot',
    pitch: 'Stone blocks with a green verdigris knotwork band running round the outside and roots between.',
    colours: [slot('stone', 'Stone colour', '#8a8478', ['Stone plates']), slot('metal', 'Knotwork colour', '#4a9a7a', ['Knotwork band'])],
    layers: () => [
      ...stones(STONE),
      roots(),
      { ...knotworkLayer(), name: 'Knotwork band', at: 0.15, width: 0.08, amplitude: 0.08, waveLength: 0.42, color: '#4a9a7a', outlineWidth: 0.02, shine: true, effects: [recolour(['#0a1a14', '#1a4a3a', '#4a9a7a', '#8ad0b0', '#d0f0e0']), contact(0.6)] },
    ],
  },
];
