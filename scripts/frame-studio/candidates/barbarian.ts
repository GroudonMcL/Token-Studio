// Barbarian: candidates for new versions of Token Maker's Barbarian frame.
import {
  adjust, bandFillLayer, base, bevel, contact, DROP, glow, growthLayer, inscription, lineLayer, metalFx, photo,
  projectFromFrame, recolour, repeatLayer, rims, slot, textureLayer, wear, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('barbarian');
const HIDE = ['#0e0602', '#3a1e0c', '#7a4a26', '#b08050', '#e0c098'];
const IRON = ['#020101', '#0a0808', '#1e1a19', '#4a4240', '#a09088'];

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-clawed-hide',
    name: 'A · Clawed hide',
    pitch: 'Thick leather hide torn by three sets of claw marks, with stitched edges.',
    colours: [slot('hide', 'Hide colour', '#7a4a26', ['Hide']), slot('marks', 'Wound colour', '#3a0804', ['Claw marks'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Hide', paint: photo('leather', 1.4, { lighting: 0.6 }), effects: [recolour(HIDE), bevel({ size: 0.4, gloss: 0.15, highlightOpacity: 0.4 }), DROP] },
      { ...repeatLayer(), name: 'Claw marks', element: 'claw', count: 3, at: 0.5, size: 1.5, fill: '#2a0402', raised: false, shaded: false, effects: [bevel({ direction: 'sunken', size: 0.5, gloss: 0.2 })] },
      { ...lineLayer(), name: 'Stitching', at: 0.08, width: 0.03, dash: 'dashed', paint: { kind: 'solid', color: '#d8c098' } },
      { ...lineLayer(), name: 'Stitching', at: 0.92, width: 0.03, dash: 'dashed', paint: { kind: 'solid', color: '#d8c098' } },
    ],
  },
  {
    id: 'b-bone-sinew',
    name: 'B · Bone & sinew',
    pitch: 'Curved bone tusks lashed round a leather band, pale and polished.',
    colours: [slot('bone', 'Bone colour', '#e0d4b8', ['Tusks']), slot('hide', 'Leather colour', '#5a3418', ['Leather'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Leather', paint: photo('leather', 1.6, { lighting: 0.6 }), effects: [recolour(['#0a0402', '#2a1408', '#5a3418', '#8a6040']), DROP] },
      { ...repeatLayer(), name: 'Tusks', element: 'tooth', count: 18, at: 0.5, size: 0.9, stretch: 0.55, rotation: 0, fill: '#e0d4b8', raised: true, effects: [bevel({ size: 0.6, gloss: 0.6, highlightOpacity: 0.6 }), contact(0.6)] },
    ],
  },
  {
    id: 'c-berserker',
    name: 'C · Berserker iron',
    pitch: 'Battered black iron with claw gashes glowing red, and a Sith AF war-chant along the edge.',
    stage: { bloom: 0.25 },
    colours: [slot('metal', 'Metal colour', '#3a3230', ['Iron']), slot('rage', 'Rage colour', '#ff3a1a', ['Glowing gashes', 'War-chant'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Iron', paint: photo('hammered-metal', 1.6, { lighting: 0.5 }), effects: [wear({ chips: 0.06, polish: 0.5, grime: 0.4, scale: 0.12, scratches: 0.5 }), ...metalFx(IRON, 0.3, 0.5), DROP] },
      { ...repeatLayer(), name: 'Glowing gashes', element: 'gash', count: 4, at: 0.42, size: 1.4, fill: '#ffb060', raised: false, shaded: false, effects: [glow({ color: '#ff3a1a', opacity: 0.9, size: 0.14 })] },
      inscription('sith', '#ffb060', { name: 'War-chant', at: 0.86, size: 0.22, start: 4, effects: [glow({ color: '#ff3a1a', opacity: 0.8, size: 0.1 })] }),
    ],
  },
  {
    id: 'd-wolf-pelt',
    name: 'D · Wolf pelt',
    pitch: 'Soft grey wolf fur with a row of fangs along the outer edge.',
    colours: [slot('fur', 'Fur colour', '#7a7672', ['Fur', 'Pelt']), slot('fangs', 'Fang colour', '#f0e8d8', ['Fangs'])],
    layers: () => [
      ...base({ light: '#b8b2aa', dark: '#2a2624', step: null, rims: false }),
      { ...textureLayer('feathers'), name: 'Fur', color: '#7a7672', opacity: 0.9, seed: 0xfea8, effects: [adjust({ saturation: -0.5 })] },
      { ...repeatLayer(), name: 'Fangs', element: 'tooth', count: 20, at: 0.12, size: 0.38, fill: '#f0e8d8', raised: true, effects: [bevel({ size: 0.5, gloss: 0.5 }), contact(0.5)] },
    ],
  },
  {
    id: 'e-war-paint',
    name: 'E · War paint',
    pitch: 'Your base band in ochre, daubed with bold painted chevrons in white and red.',
    colours: [slot('band', 'Frame colour', '#c0702a', ['Band', 'Pressed-in step']), slot('paint', 'Paint colour', '#f0e8d8', ['Chevrons']), slot('accent', 'Accent colour', '#b0201a', ['Red marks'])],
    layers: () => [
      ...base({ light: '#e8a050', dark: '#3a1a06', step: 0.55 }),
      { ...repeatLayer(), name: 'Chevrons', element: 'chevron', count: 12, at: 0.3, size: 0.8, fill: '#f0e8d8', raised: false, shaded: false, opacity: 0.85 },
      { ...repeatLayer(), name: 'Red marks', element: 'circle', count: 12, offset: 0.5, at: 0.3, size: 0.26, fill: '#b0201a', raised: false, shaded: false, opacity: 0.9 },
    ],
  },
];
export { growthLayer, rims };
