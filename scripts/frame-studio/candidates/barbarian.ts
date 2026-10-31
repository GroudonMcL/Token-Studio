// Barbarian, round 2: more organic, and nothing strays outside the band
// unless it is meant to (owner's feedback).
import {
  adjust, bandFillLayer, base, bevel, blur, contact, DROP, growthLayer, lineLayer, photo, projectFromFrame, recolour,
  repeatLayer, slot, textureLayer, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('barbarian');
const HIDE = ['#0e0602', '#3a1e0c', '#7a4a26', '#b08050', '#e0c098'];
const hide = (name = 'Hide', stops = HIDE) => ({ ...bandFillLayer(), name, paint: photo('leather', 1.4, { lighting: 0.6 }), effects: [recolour(stops), bevel({ profile: 'rounded', size: 0.45, gloss: 0.15, highlightOpacity: 0.35, soften: 0.04 }), DROP] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'f-laced-hide',
    name: 'F · Laced hide',
    pitch: 'Tanned hide laced round with a zigzag leather thong through punched holes, soft and hand-made.',
    colours: [slot('hide', 'Hide colour', '#7a4a26', ['Hide']), slot('lace', 'Lace colour', '#d8b888', ['Lacing'])],
    layers: () => [
      hide(),
      { ...repeatLayer(), name: 'Holes', element: 'circle', count: 32, at: 0.2, size: 0.1, fill: '#1a0a04', raised: false, shaded: false },
      { ...repeatLayer(), name: 'Holes', element: 'circle', count: 32, offset: 0.5, at: 0.8, size: 0.1, fill: '#1a0a04', raised: false, shaded: false },
      { ...lineLayer(), name: 'Lacing', at: 0.5, width: 0.05, paint: { kind: 'solid', color: '#d8b888' }, waveAmplitude: 0.3, waves: 32, waveShape: 'triangle', effects: [bevel({ size: 0.7, gloss: 0.3 }), contact(0.5)] },
    ],
  },
  {
    id: 'g-fur-trim',
    name: 'G · Fur trim',
    pitch: 'A thick ruff of brown fur over a leather band, with soft uneven edges like a real pelt.',
    colours: [slot('fur', 'Fur colour', '#6a4a30', ['Fur']), slot('hide', 'Leather colour', '#4a2a14', ['Hide'])],
    layers: () => [
      hide('Hide', ['#0a0402', '#24120a', '#4a2a14', '#7a5030', '#a88060']),
      { ...textureLayer('feathers'), name: 'Fur', color: '#b08a60', from: 0.05, to: 0.75, scale: 0.6, amount: 1.4, seed: 0xfea9, effects: [{ kind: 'distort', on: true, amount: 0.05, scale: 0.15, seed: 5 }, blur(0.006), contact(0.5)] },
    ],
  },
  {
    id: 'h-gnarled-bone',
    name: 'H · Gnarled bone',
    pitch: 'Knotted, twisting bone and root grown into a ring, pale and weathered.',
    colours: [slot('bone', 'Bone colour', '#d8c8a8', ['Bone', 'Roots'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Bone', from: 0.25, to: 0.75, paint: photo('coral-stone', 2, { lighting: 0.4 }), effects: [recolour(['#2a2014', '#7a6a50', '#d8c8a8', '#f8f0e0']), bevel({ profile: 'rounded', size: 0.9, depth: 1.3, gloss: 0.3 }), DROP] },
      { ...growthLayer('vine'), name: 'Roots', count: 2, thickness: 0.13, amplitude: 0.18, waveLength: 1.2, gnarl: 0.7, branching: 0, extra: 'none', color: '#c8b898', extraColor: '#a89878', effects: [bevel({ size: 0.6, gloss: 0.3 }), contact(0.6)] },
    ],
  },
  {
    id: 'i-woven-sinew',
    name: 'I · Woven sinew',
    pitch: 'Strips of rawhide woven over and under, like a hunter’s basket or shield.',
    colours: [slot('rawhide', 'Rawhide colour', '#b08a5a', ['Weave']), slot('hide', 'Edge colour', '#4a2a14', ['Outer edge', 'Inner edge'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Under', paint: { kind: 'solid', color: '#2a1a0c' }, effects: [DROP] },
      { ...textureLayer('woven'), name: 'Weave', color: '#b08a5a', from: 0.12, to: 0.88, seed: 3, effects: [bevel({ size: 0.25, gloss: 0.2 })] },
      { ...lineLayer(), name: 'Outer edge', at: 0.06, width: 0.12, paint: { kind: 'solid', color: '#4a2a14' }, effects: [bevel({ size: 0.8, gloss: 0.2 })] },
      { ...lineLayer(), name: 'Inner edge', at: 0.94, width: 0.12, paint: { kind: 'solid', color: '#4a2a14' }, effects: [bevel({ size: 0.8, gloss: 0.2 })] },
    ],
  },
  {
    id: 'j-ochre-spirals',
    name: 'J · Ochre spirals',
    pitch: 'Soft hide painted with curling ochre spirals and dots, like cave or tribal painting.',
    colours: [slot('hide', 'Hide colour', '#a87a50', ['Hide']), slot('paint', 'Paint colour', '#b0401a', ['Spirals', 'Dots'])],
    layers: () => [
      hide('Hide', ['#1a0e06', '#5a3a20', '#a87a50', '#d8b088', '#f4e0c0']),
      { ...growthLayer('tendrils'), name: 'Spirals', count: 2, thickness: 0.045, amplitude: 0.22, waveLength: 2.2, curl: 520, branching: 0.6, branchLength: 0.6, color: '#a0301a', thickness: 0.07, opacity: 0.95 },
      { ...repeatLayer(), name: 'Dots', element: 'circle', count: 24, at: 0.15, size: 0.09, fill: '#b0401a', raised: false, shaded: false, opacity: 0.8, blend: 'multiply' },
      { ...repeatLayer(), name: 'Dots', element: 'circle', count: 24, offset: 0.5, at: 0.85, size: 0.09, fill: '#b0401a', raised: false, shaded: false, opacity: 0.8, blend: 'multiply' },
    ],
  },
  {
    id: 'k-war-club',
    name: 'K · War club',
    pitch: 'A ring of rough, gnarled wood like a war club, studded with iron nails inside the band.',
    colours: [slot('wood', 'Wood colour', '#56473c', ['Club wood']), slot('studs', 'Stud colour', '#5a5a60', ['Studs'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Club wood', paint: photo('plane-bark', 1.6, { angle: 90, lighting: 0.6 }), effects: [adjust({ contrast: 0.2 }), bevel({ profile: 'rounded', size: 0.6, depth: 1.3, gloss: 0.2, highlightOpacity: 0.45, soften: 0.04 }), { kind: 'distort', on: true, amount: 0.04, scale: 0.3, seed: 2 }, DROP] },
      { ...repeatLayer(), name: 'Studs', element: 'bead', count: 12, at: 0.5, size: 0.28, fill: '#5a5a60', raised: true, effects: [recolour(['#050506', '#1e1e22', '#5a5a60', '#a8a8b0']), contact(0.6)] },
    ],
  },
];
export { base };
