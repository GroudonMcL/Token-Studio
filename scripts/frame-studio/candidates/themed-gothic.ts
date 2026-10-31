// Gothic thorns (Frame Studio's Themed starting designs): candidates.
import { bandFillLayer, bandShading, bevel, contact, DROP, glow, glowCracks, growthLayer, metalFx, photo, recolour, repeatLayer, SILVER_STOPS, slot, STEEL_STOPS, type Candidate, type Layer } from './common';
import { themed } from './crafted';

export const CURRENT = themed('gothic-thorns');
const STAGE = { thickness: 0.18, bloom: 0.25 };
const stone = (stops = ['#020202', '#0c0a0c', '#24202a', '#4a4450', '#7a7480']): Layer[] =>
  bandShading([{ ...bandFillLayer(), name: 'Black stone', paint: photo('dark-rock', 1.4), effects: [recolour(stops), DROP] }]);
const briars = (stem: string, thorn: string, effects: Layer['effects'] = [bevel({ size: 0.5, gloss: 0.5 }), contact(0.8)]): Layer => ({ ...growthLayer('thorns'), name: 'Briars', count: 2, thickness: 0.055, amplitude: 0.28, waveLength: 1.9, extraSize: 0.26, color: stem, extraColor: thorn, effects });
/** Iron spikes round the outside: reaching past the band is the point. */
const spikes = (): Layer => ({ ...repeatLayer(), name: 'Iron spikes', element: 'spike', count: 12, at: -0.18, size: 0.55, stretch: 0.55, fill: '#5a5e68', raised: false, effects: [bevel({ profile: 'chisel', size: 0.3, gloss: 0.5 }), recolour(STEEL_STOPS), contact(0.7)] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-gothic-thorns',
    name: 'A · Gothic thorns',
    pitch: 'Black stone in the twin gradient bands, bleeding red cracks that glow, thorny briars and iron spikes round the edge.',
    stage: STAGE,
    colours: [slot('stone', 'Stone colour', '#24202a', ['Black stone']), slot('glow', 'Glow colour', '#ff1a2a', ['Glowing cracks'])],
    layers: () => [spikes(), ...stone(), glowCracks('#200206', '#ff1a2a', '#ff7080', 25, 0.8), briars('#1a1012', '#2a1418')],
  },
  {
    id: 'b-silver-thorns',
    name: 'B · Silver thorns',
    pitch: 'Polished silver briars over black stone, with violet cracks.',
    stage: STAGE,
    colours: [slot('metal', 'Thorn colour', '#c8ccd4', ['Briars']), slot('glow', 'Glow colour', '#a04aff', ['Glowing cracks'])],
    layers: () => [...stone(), glowCracks('#100418', '#a04aff', '#c08aff', 27, 0.7), briars('#c8ccd4', '#e8ecf0', [...metalFx(SILVER_STOPS, 0.5, 0.9), contact(0.8)])],
  },
  {
    id: 'c-blood-roses',
    name: 'C · Blood roses',
    pitch: 'Black briars over dark stone, blooming with blood-red roses.',
    stage: STAGE,
    colours: [slot('stone', 'Stone colour', '#24202a', ['Black stone']), slot('roses', 'Rose colour', '#8a0a1a', ['Roses'])],
    layers: () => [...stone(), briars('#1a1012', '#2a1418'), { ...repeatLayer(), name: 'Roses', element: 'icon-rose', count: 6, snapToCorners: false, at: 0.5, size: 0.85, fill: '#8a0a1a', raised: false, effects: [bevel({ size: 0.4, gloss: 0.6 }), glow({ color: '#ff1a2a', opacity: 0.3, size: 0.06 }), contact(0.7)] }],
  },
  {
    id: 'd-bone-thorns',
    name: 'D · Bone thorns',
    pitch: 'Pale bone-white thorns wound over black stone, with a sickly green glow from the cracks.',
    stage: STAGE,
    colours: [slot('bone', 'Thorn colour', '#e8dcc0', ['Briars']), slot('glow', 'Glow colour', '#6aff4a', ['Glowing cracks'])],
    layers: () => [...stone(), glowCracks('#041a02', '#6aff4a', '#c0ffb0', 29, 0.7), briars('#e8dcc0', '#fffcf0', [recolour(['#2a2418', '#6a5e48', '#c8bca0', '#ece4d0', '#fffcf2']), bevel({ size: 0.5, gloss: 0.4 }), contact(0.8)])],
  },
];
