// Gilded laurel: candidates for new versions of the Crafted Gilded laurel frame.
import {
  bandFillLayer, bandShading, base, bevel, contact, DROP, goldFx, growthLayer, inscription, lineLayer, metalFx, photo,
  repeatLayer, SILVER_STOPS, slot, WARM_GOLD, ROSE_STOPS, type Candidate,
} from './common';
import { crafted } from './crafted';

export const CURRENT = crafted('gilded-laurel');
const gold = (scale = 0.6) => photo('gold', scale, { lighting: 0.4 });
const leaves = (name: string, at: number, rotation: number, fill: string, stops: string[], o: { count?: number; offset?: number; size?: number } = {}) => ({
  ...repeatLayer(), name, element: 'leaf' as const, count: o.count ?? 24, snapToCorners: false, at, size: o.size ?? 0.9, stretch: 0.42, rotation, offset: o.offset ?? 0,
  fill, fillPaint: gold(), raised: false, effects: [...metalFx(stops, 0.45, 0.8), contact(0.55)],
});

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-enamel-laurel',
    name: 'A · Laurel on enamel',
    pitch: 'Gold laurel leaves laid on a deep green enamel band with a pressed-in step, like a victor’s medal.',
    colours: [slot('band', 'Enamel colour', '#1e5a3a', ['Band', 'Pressed-in step']), slot('gold', 'Leaf colour', '#d8a838', ['Outer leaves', 'Inner leaves', 'Gold beads'])],
    layers: () => [
      ...base({ light: '#2e8a58', dark: '#04180c', step: 0.55 }),
      leaves('Outer leaves', 0.3, -68, '#d8a838', WARM_GOLD),
      leaves('Inner leaves', 0.72, 68, '#d8a838', WARM_GOLD, { offset: 0.5 }),
      { ...repeatLayer(), name: 'Gold beads', element: 'bead', count: 4, at: 0.5, size: 0.4, fill: '#e8c050', raised: true, effects: [...metalFx(WARM_GOLD, 0.5, 0.9), contact(0.6)] },
    ],
  },
  {
    id: 'b-victors-wreath',
    name: 'B · Victor’s wreath',
    pitch: 'A real wreath: gilded laurel twigs growing round, tied with a red ribbon at the top and bottom.',
    colours: [slot('gold', 'Leaf colour', '#d8a838', ['Wreath', 'Second wreath']), slot('ribbon', 'Ribbon colour', '#a81a24', ['Ribbon'])],
    layers: () => [
      { ...growthLayer('vine'), name: 'Wreath', count: 2, thickness: 0.05, amplitude: 0.16, waveLength: 1.3, extra: 'leaves', extraSpacing: 0.1, extraSize: 0.55, color: '#a8782a', extraColor: '#d8a838', effects: [...goldFx(0.35, WARM_GOLD), DROP] },
      { ...growthLayer('vine'), name: 'Second wreath', count: 1, thickness: 0.035, amplitude: 0.22, waveLength: 1.9, extra: 'leaves', extraSpacing: 0.13, extraSize: 0.45, color: '#a8782a', extraColor: '#e8c060', seed: 5, effects: [...goldFx(0.35, WARM_GOLD), contact(0.5)] },
      { ...repeatLayer(), name: 'Ribbon', element: 'square', count: 2, at: 0.5, size: 1, stretch: 0.45, fill: '#a81a24', raised: true, effects: [bevel({ profile: 'rounded', size: 0.5, gloss: 0.6 }), contact(0.6)] },
    ],
  },
  {
    id: 'c-olive-silver',
    name: 'C · Silver olive',
    pitch: 'Slim silver olive leaves on a cool slate band, shaded with the twin gradients rather than a bevel.',
    colours: [slot('band', 'Band colour', '#3a4652', ['Band', 'Pressed-in step']), slot('leaves', 'Leaf colour', '#c8ccd4', ['Outer leaves', 'Inner leaves'])],
    layers: () => [
      ...base({ light: '#62707e', dark: '#0a0e12', step: 0.55 }),
      { ...leaves('Outer leaves', 0.3, -72, '#c8ccd4', SILVER_STOPS, { count: 30, size: 0.8 }), stretch: 0.32 },
      { ...leaves('Inner leaves', 0.72, 72, '#c8ccd4', SILVER_STOPS, { count: 30, size: 0.8, offset: 0.5 }), stretch: 0.32 },
    ],
  },
  {
    id: 'd-laurel-oath',
    name: 'D · Laurel oath',
    pitch: 'A single row of laurel round the outside and a Yugurian oath engraved in the pressed-in step.',
    colours: [slot('band', 'Band colour', '#7a1a1e', ['Band', 'Pressed-in step']), slot('gold', 'Gold colour', '#d8a838', ['Laurel', 'Oath'])],
    layers: () => [
      ...base({ light: '#b03038', dark: '#1a0204', step: 0.55 }),
      leaves('Laurel', 0.28, -70, '#d8a838', WARM_GOLD, { count: 28, size: 0.75 }),
      inscription('yugurian', '#f4d27a', { name: 'Oath', at: 0.78, size: 0.3, start: 4, effects: [...goldFx(0.4, WARM_GOLD), contact(0.5)] }),
    ],
  },
  {
    id: 'e-autumn-laurel',
    name: 'E · Autumn laurel',
    pitch: 'Rose-gold and copper leaves with small red berries on a warm brown band.',
    colours: [slot('band', 'Band colour', '#5a3020', ['Band', 'Pressed-in step']), slot('leaves', 'Leaf colour', '#d8907a', ['Outer leaves', 'Inner leaves']), slot('berries', 'Berry colour', '#b01a1a', ['Berries'])],
    layers: () => [
      ...base({ light: '#8a5034', dark: '#140604', step: 0.55 }),
      leaves('Outer leaves', 0.3, -68, '#d8907a', ROSE_STOPS),
      leaves('Inner leaves', 0.72, 68, '#d8907a', ROSE_STOPS, { offset: 0.5 }),
      { ...repeatLayer(), name: 'Berries', element: 'bead', count: 12, at: 0.5, size: 0.22, fill: '#b01a1a', raised: true, effects: [bevel({ profile: 'rounded', size: 0.7, gloss: 0.9 }), contact(0.6)] },
    ],
  },
];
export { bandFillLayer, bandShading, lineLayer };

// The original frame's band thickness, unless a candidate sets its own.
for (const c of CANDIDATES) c.stage = { ...{ thickness: 0.2, outerSpacing: 0.03 }, ...c.stage };
