// Stamped: candidates for a new version of Token Maker's Stamped frame.
import { projectFromFrame } from '../../../src/frame-studio/project/defaults';
import {
  bandFillLayer,
  base,
  bevel,
  contact,
  DROP,
  glow,
  goldFx,
  goldPaint,
  lin,
  lineLayer,
  overlay,
  photo,
  recolour,
  repeatLayer,
  rims,
  textureLayer,
  type Candidate,
} from '../../../src/frame-studio/project/houseStyle';
import { adjust, wear } from '../../../src/frame-studio/project/styles';

export const CURRENT = () => projectFromFrame('stamped');
const slot = (id: string, name: string, colour: string, layers: string[]) => ({ id, name, default: colour, layers });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-veined',
    name: 'A · Veined stamp',
    pitch: 'Stamped tidied into your style: your Simple band in Stamped orange, with soft veins only in the shade. Close to your Clean gradient, but with a flat two-tone light.',
    colours: [slot('band', 'Frame colour', '#ff8a3a', ['Band', 'Pressed-in step', 'Veins'])],
    layers: () => [
      ...base({ light: '#ff8a3a', dark: '#3a1004', step: 0.55, rims: false }),
      { ...textureLayer('veins'), name: 'Veins', color: '#d7671f', where: 'shaded', opacity: 0.7, seed: 0x5eed },
      ...rims(),
    ],
  },
  {
    id: 'b-copper',
    name: 'B · Hammered copper',
    pitch: 'A real metal: hammered copper with a pressed-in step and green verdigris settling in the crease.',
    colours: [slot('metal', 'Metal colour', '#c8703a', ['Copper', 'Pressed-in copper']), slot('patina', 'Patina colour', '#4ab89a', ['Verdigris'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Copper', paint: photo('hammered-metal', 1.4, { lighting: 0.6 }), effects: [recolour(['#1a0602', '#5a220a', '#a8501e', '#e08a4a', '#ffd0a0']), DROP] },
      { ...bandFillLayer(), name: 'Pressed-in copper', from: 0.55, to: 1, paint: photo('hammered-metal', 1.1, { lighting: 0.6, angle: 180 }), effects: [recolour(['#1a0602', '#5a220a', '#a8501e', '#e08a4a', '#ffd0a0']), bevel({ direction: 'sunken', size: 0.25, gloss: 0.6, soften: 0.02 }), adjust({ brightness: -0.25 })] },
      { ...textureLayer('mottled'), name: 'Verdigris', color: '#4ab89a', color2: '#a8f0d8', from: 0.35, to: 0.75, amount: 1, scale: 1.4, opacity: 0.5, blend: 'hard-light', seed: 0x307 },
      ...rims(),
    ],
  },
  {
    id: 'c-tooled-leather',
    name: 'C · Tooled leather',
    pitch: 'Warm and handmade: dyed leather with a tooled groove and cream stitching round the inside.',
    colours: [slot('leather', 'Leather colour', '#a0461c', ['Leather']), slot('stitch', 'Stitching colour', '#f0dcb0', ['Stitching'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Leather', paint: photo('leather', 1.6, { lighting: 0.7 }), effects: [recolour(['#120402', '#4a1a06', '#a0461c', '#d07a40']), bevel({ size: 0.35, gloss: 0.1, highlightOpacity: 0.25, soften: 0.03 }), DROP] },
      { ...lineLayer(), name: 'Tooled groove', at: 0.42, width: 0.05, paint: lin(['#000000', '#000000']), opacity: 0.6, blend: 'multiply', effects: [bevel({ direction: 'sunken', size: 0.6, gloss: 0.2 })] },
      { ...lineLayer(), name: 'Stitching', at: 0.75, width: 0.035, dash: 'dashed', paint: { kind: 'solid', color: '#f0dcb0' }, effects: [contact(0.6)] },
      ...rims(),
    ],
  },
  {
    id: 'd-terracotta',
    name: 'D · Fired clay',
    pitch: 'Matt and earthy: terracotta with a fine crackle, a pressed-in step and a chipped edge. No shine at all.',
    colours: [slot('clay', 'Clay colour', '#c8643a', ['Clay', 'Pressed-in clay'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Clay', paint: photo('cracked-mud', 2.4, { lighting: 0.5 }), effects: [recolour(['#3a1408', '#8a3a1a', '#c8643a', '#f0a070']), wear({ chips: 0.05, polish: 0, grime: 0.3, scale: 0.1, scratches: 0 }), DROP] },
      { ...bandFillLayer(), name: 'Pressed-in clay', from: 0.55, to: 1, paint: lin(['#3a1408', '#c8643a']), opacity: 0.6, blend: 'multiply' },
      { ...lineLayer(), name: 'Crease', at: 0.55, width: 0.03, opacity: 0.55, blend: 'overlay', paint: { kind: 'solid', color: '#190500' } },
      ...rims(),
    ],
  },
  {
    id: 'e-enamel-brass',
    name: 'E · Brass & enamel',
    pitch: 'Jewellery-like: a rounded brass rim outside and a glossy coloured enamel step inside.',
    colours: [slot('enamel', 'Enamel colour', '#e0601c', ['Enamel']), slot('metal', 'Metal colour', '#ccb47e', ['Brass rim', 'Brass beads'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Enamel', from: 0.45, to: 1, paint: lin(['#ffa060', '#e0601c', '#4a1404']), effects: [bevel({ direction: 'sunken', size: 0.2, gloss: 0.9, highlightOpacity: 0.6, soften: 0.02 }), DROP] },
      { ...bandFillLayer(), name: 'Brass rim', from: 0, to: 0.5, paint: goldPaint(2.1), effects: [...goldFx(0.35), DROP] },
      { ...repeatLayer(), name: 'Brass beads', element: 'bead', mode: 'spacing', spacing: 0.45, snapToCorners: false, at: 0.25, size: 0.26, fill: '#ccb47e', raised: true, effects: [recolour(['#3a2c12', '#8a7444', '#ccb47e', '#f0e4bc', '#fffcf2']), contact(0.5)] },
    ],
  },
  {
    id: 'f-sunset',
    name: 'F · Ember stamp',
    pitch: 'Your Clean gradient light with a hot glow: the step glows orange from inside like a stamp fresh from the forge.',
    stage: { bloom: 0.2 },
    colours: [slot('band', 'Frame colour', '#ff6c08', ['Band', 'Pressed-in step', 'Glowing seam'])],
    layers: () => [
      ...base({ light: '#ffb060', dark: '#2a0a02', step: 0.55, stepLight: '#ff6c08', stepDark: '#3a0e02' }),
      overlay('lava-flow', 6, 'overlay', 0.5, { angle: 20 }),
      { ...lineLayer(), name: 'Glowing seam', at: 0.55, width: 0.03, paint: { kind: 'solid', color: '#ffd080' }, effects: [glow({ color: '#ff6c08', opacity: 0.9, size: 0.16 })] },
    ],
  },
];
