// Grim iron (Frame Studio's Layered starting designs): candidates.
import { bandFillLayer, bandShading, contact, DROP, goldFx, lin, metalFx, photo, recolour, repeatLayer, slot, textureLayer, WARM_GOLD, bevel, type Candidate, type Layer } from './common';
import { layered } from './crafted';

export const CURRENT = layered('grim-iron');
const STAGE = { thickness: 0.18 };
const IRON = ['#020203', '#14141a', '#3a3834', '#6a6660', '#a8a49c'];
const BONE = ['#2a2418', '#6a5e48', '#c8bca0', '#ece4d0', '#fffcf2'];
const iron = (stops = IRON): Layer[] => bandShading([
  { ...bandFillLayer(), name: 'Iron', paint: photo('hammered-metal', 1.4, { lighting: 0.3 }), effects: [recolour(stops), DROP] },
  { ...textureLayer('chainmail'), name: 'Chainmail', color: '#8a8e96', from: 0.22, to: 0.78, seed: 1, opacity: 0.8 },
], { step: null });
const emblems = (element: string, fill: string, effects: Layer['effects'], show: boolean[] = [true, false], size = 0.92): Layer => ({ ...repeatLayer(), name: element === 'skull' ? 'Skulls' : 'Emblems', element: element as never, count: 8, snapToCorners: false, at: 0.5, size, fill, show, raised: false, effects });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-grim-iron',
    name: 'A · Grim iron',
    pitch: 'Dark iron over chainmail, shaded with gradients, rust in the creases, and bone skulls and paw prints in turn.',
    stage: STAGE,
    colours: [slot('iron', 'Iron colour', '#3a3834', ['Iron', 'Chainmail']), slot('bone', 'Bone colour', '#e8dcc0', ['Skulls', 'Emblems'])],
    layers: () => [
      ...iron(),
      { ...textureLayer('rust'), name: 'Rust', color: '#8a3b12', opacity: 0.6, seed: 0x2057 },
      emblems('skull', '#e8dcc0', [recolour(BONE), bevel({ size: 0.4, gloss: 0.4 }), contact(0.7)]),
      emblems('paw', '#c9b48a', [recolour(BONE), contact(0.6)], [false, true], 0.66),
    ],
  },
  {
    id: 'b-bone-ring',
    name: 'B · Bone ring',
    pitch: 'Black iron with a ring of skulls and crossed bones, yellowed like old ivory.',
    stage: STAGE,
    colours: [slot('iron', 'Iron colour', '#2a2824', ['Iron', 'Chainmail']), slot('bone', 'Bone colour', '#e8dcc0', ['Skulls', 'Emblems'])],
    layers: () => [
      ...iron(['#020202', '#0c0c0c', '#2a2824', '#4a4844', '#7a7670']),
      emblems('skull', '#e8dcc0', [recolour(BONE), bevel({ size: 0.4, gloss: 0.4 }), contact(0.7)]),
      emblems('icon-skull-crossed-bones', '#e8dcc0', [recolour(BONE), contact(0.6)], [false, true], 0.8),
    ],
  },
  {
    id: 'c-wolf-den',
    name: 'C · Wolf’s den',
    pitch: 'Dark leather and iron with direwolf heads and paw prints in turn.',
    stage: STAGE,
    colours: [slot('leather', 'Leather colour', '#3a2a20', ['Iron']), slot('metal', 'Emblem colour', '#a8a49c', ['Emblems'])],
    layers: () => [
      ...bandShading([{ ...bandFillLayer(), name: 'Iron', paint: photo('leather', 1.4, { lighting: 0.4 }), effects: [recolour(['#050302', '#1a120c', '#3a2a20', '#6a5444', '#9a8474']), DROP] }], { step: null }),
      emblems('icon-direwolf', '#c8c4bc', [...metalFx(['#1a1a1a', '#4a4844', '#8a8680', '#c8c4bc', '#f0ece4'], 0.4, 0.8), contact(0.7)]),
      emblems('paw', '#a8a49c', [...metalFx(IRON, 0.4, 0.7), contact(0.6)], [false, true], 0.66),
    ],
  },
  {
    id: 'd-crowned-skulls',
    name: 'D · Crowned skulls',
    pitch: 'Black iron with gold crowned skulls, for a lich or a pirate king.',
    stage: STAGE,
    colours: [slot('iron', 'Iron colour', '#2a2824', ['Iron', 'Chainmail']), slot('gold', 'Gold colour', '#d8a838', ['Emblems'])],
    layers: () => [...iron(['#020202', '#0c0c0c', '#2a2824', '#4a4844', '#7a7670']), emblems('icon-crowned-skull', '#d8a838', [...goldFx(0.4, WARM_GOLD), contact(0.7)], [true], 0.9)],
  },
];
export { lin };
