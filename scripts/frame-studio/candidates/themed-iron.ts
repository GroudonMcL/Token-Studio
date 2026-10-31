// Worn iron ring (Frame Studio's Themed starting designs): candidates.
import { bandFillLayer, bandShading, BRONZE_STOPS, contact, DROP, glow, glowCracks, metalFx, photo, recolour, repeatLayer, slot, STEEL_STOPS, wear, type Candidate, type Layer } from './common';
import { themed } from './crafted';

export const CURRENT = themed('worn-iron');
const STAGE = { thickness: 0.2 };
const IRON = ['#020203', '#14161a', '#3e4248', '#787e88', '#c0c6ce'];
const iron = (stops = IRON, w = { chips: 0.3, polish: 0.5, grime: 0.45, scratches: 0.6, scale: 0.25 }): Layer[] =>
  bandShading([{ ...bandFillLayer(), name: 'Iron ring', paint: photo('hammered-metal', 1.4, { lighting: 0.3 }), effects: [recolour(stops), wear(w), DROP] }], { step: 0.82 });
const rivets = (fill: string, stops: string[], count = 12, at = 0.42, size = 0.3): Layer => ({ ...repeatLayer(), name: 'Rivets', element: 'bead', count, snapToCorners: false, at, size, fill, raised: true, effects: [...metalFx(stops, 0.6, 0.8), contact(0.8)] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-battered-iron',
    name: 'A · Battered iron',
    pitch: 'Chipped, scratched blackened iron shaded with gradients and a pressed-in inner rim, with heavy steel rivets.',
    stage: STAGE,
    colours: [slot('iron', 'Iron colour', '#3e4248', ['Iron ring', 'Rivets'])],
    layers: () => [...iron(), rivets('#a8b0ba', STEEL_STOPS)],
  },
  {
    id: 'b-iron-brass',
    name: 'B · Iron & brass',
    pitch: 'Worn iron with heavy brass rivets.',
    stage: STAGE,
    colours: [slot('iron', 'Iron colour', '#3e4248', ['Iron ring']), slot('brass', 'Brass colour', '#b5813a', ['Rivets'])],
    layers: () => [...iron(), rivets('#b5813a', BRONZE_STOPS)],
  },
  {
    id: 'c-ember-iron',
    name: 'C · Smouldering iron',
    pitch: 'Worn iron with embers still glowing in its cracks.',
    stage: { ...STAGE, bloom: 0.25 },
    colours: [slot('iron', 'Iron colour', '#3e4248', ['Iron ring', 'Rivets']), slot('glow', 'Ember colour', '#ff6a1a', ['Glowing cracks'])],
    layers: () => [...iron(), glowCracks('#1a0602', '#ff6a1a', '#ffb05a', 23, 0.7), rivets('#8a929c', STEEL_STOPS)],
  },
  {
    id: 'd-rusted-iron',
    name: 'D · Rust-eaten iron',
    pitch: 'Iron gone orange with rust, the rivets nearly rusted away.',
    stage: STAGE,
    colours: [slot('iron', 'Iron colour', '#5a4a3a', ['Iron ring']), slot('rust', 'Rust colour', '#9a4a1e', ['Rust'])],
    layers: () => [
      ...iron(['#060402', '#2a1a0e', '#5a4a3a', '#8a7a6a', '#c0b0a0']),
      { ...bandFillLayer(), name: 'Rust', paint: photo('rust', 1.2), opacity: 0.75, blend: 'color', clip: 'band' },
      { ...bandFillLayer(), name: 'Rust', paint: photo('rust', 1.2), opacity: 0.4, blend: 'multiply', clip: 'band' },
      rivets('#8a4a24', ['#140602', '#4a1a08', '#9a4a1e', '#d0884a', '#f0c090']),
    ],
  },
];
export { glow };
