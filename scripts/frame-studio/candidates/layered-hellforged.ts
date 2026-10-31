// Hellforged iron (Frame Studio's Layered starting designs): candidates.
import { bandFillLayer, bandShading, bevel, contact, DROP, glow, glowCracks, glowLines, inscription, lin, photo, recolour, repeatLayer, slot, STEEL_STOPS, type Candidate, type Layer } from './common';
import { layered } from './crafted';

export const CURRENT = layered('hellforged-iron');
const IRON = ['#020203', '#0c0d10', '#2a2c32', '#5a5e68', '#a0a6b0'];
const iron = (): Layer[] => bandShading([{ ...bandFillLayer(), name: 'Iron band', paint: photo('hammered-metal', 1.4, { lighting: 0.3 }), effects: [recolour(IRON), DROP] }], { step: 0.66 });
/** Iron spikes round the outside: reaching past the band is the point here. */
const spikes = (): Layer => ({ ...repeatLayer(), name: 'Spikes', element: 'spike', count: 16, at: -0.12, size: 0.5, stretch: 0.7, fill: '#5a5e68', raised: false, snapToCorners: true, effects: [bevel({ profile: 'chisel', size: 0.3, gloss: 0.5 }), recolour(STEEL_STOPS), contact(0.6)] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-hellforged',
    name: 'A · Hellforged',
    pitch: 'Blackened iron in the twin gradient bands, split by blurred glowing cracks, with iron spikes round the edge.',
    stage: { bloom: 0.3, bleed: 0.2 },
    colours: [slot('iron', 'Iron colour', '#2a2c32', ['Iron band', 'Spikes']), slot('glow', 'Fire colour', '#ff5a1a', ['Glowing cracks'])],
    layers: () => [spikes(), ...iron(), glowCracks('#1a0602', '#ff5a1a', '#ffb05a', 13, 0.9)],
  },
  {
    id: 'b-infernal-runes',
    name: 'B · Infernal runes',
    pitch: 'Black iron with Sith AF runes burning red-hot round it, and a glowing seam.',
    stage: { bloom: 0.3 },
    colours: [slot('iron', 'Iron colour', '#2a2c32', ['Iron band']), slot('glow', 'Fire colour', '#ff3a1a', ['Runes', 'Glowing lines'])],
    layers: () => [
      ...iron(),
      inscription('sith', '#ffd0a0', { name: 'Runes', at: 0.32, size: 0.4, start: 12, effects: [glow({ color: '#ff3a1a', opacity: 0.9, size: 0.12 })] }),
      glowLines(['#ffe0b0', '#ff6a2a'], '#ff3a0a', { count: 1, from: 0.84, width: 0.03, size: 0.12 }),
    ],
  },
  {
    id: 'c-brimstone',
    name: 'C · Brimstone',
    pitch: 'Iron crusted with sulphur, with yellow-orange fire in its cracks and spikes round the edge.',
    stage: { bloom: 0.3 },
    colours: [slot('iron', 'Iron colour', '#2a2c32', ['Iron band', 'Spikes']), slot('glow', 'Fire colour', '#ffc020', ['Glowing cracks'])],
    layers: () => [spikes(), ...iron(), { ...bandFillLayer(), name: 'Sulphur', paint: photo('lichen-rock', 1.2), opacity: 0.35, blend: 'overlay' }, glowCracks('#1a1002', '#ffc020', '#fff08a', 17, 0.9)],
  },
  {
    id: 'd-soulfire',
    name: 'D · Soulfire',
    pitch: 'Iron cracked open on a ghostly green fire.',
    stage: { bloom: 0.35, bleed: 0.2 },
    colours: [slot('iron', 'Iron colour', '#2a2c32', ['Iron band']), slot('glow', 'Fire colour', '#4aff7a', ['Glowing cracks'])],
    layers: () => [...iron(), glowCracks('#021a06', '#4aff7a', '#c0ffd0', 19, 1)],
  },
];
export { lin };
