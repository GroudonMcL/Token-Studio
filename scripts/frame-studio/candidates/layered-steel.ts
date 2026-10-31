// Battle-worn steel (Frame Studio's Layered starting designs): candidates.
import { bandFillLayer, bevel, bandShading, BRONZE_STOPS, contact, DROP, lin, metalFx, recolour, repeatLayer, slot, STEEL_STOPS, textureLayer, type Candidate, type Layer } from './common';
import { layered } from './crafted';

export const CURRENT = layered('battle-steel');
const steel = (light: string, dark: string, o: { wear?: number; tint?: string } = {}): Layer[] => [
  { ...bandFillLayer(), name: 'Steel band', paint: lin([light, dark]), effects: [DROP] },
  { ...textureLayer('hammered'), name: 'Hammered', color: light, amount: 0.6, seed: 0x2e3d },
  { ...textureLayer('wear'), name: 'Battle wear', color: o.tint ?? light, amount: o.wear ?? 1, seed: 0xf16 },
];
const rivets = (fill: string, stops: string[], at = 0.3, count = 16): Layer => ({ ...repeatLayer(), name: 'Rivets', element: 'bead', count, snapToCorners: false, at, size: 0.22, fill, raised: true, effects: [...metalFx(stops, 0.6, 0.8), contact(0.7)] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-shaded-steel',
    name: 'A · Battle steel',
    pitch: 'Hammered, scratched steel shaded with the twin gradient bands, with bright steel rivets.',
    colours: [slot('steel', 'Steel colour', '#8a8f99', ['Steel band', 'Hammered', 'Battle wear', 'Rivets'])],
    layers: () => [...bandShading(steel('#b8bec8', '#2a2e36'), { step: 0.62 }), rivets('#c8ced6', STEEL_STOPS)],
  },
  {
    id: 'b-notched',
    name: 'B · Notched blade',
    pitch: 'Steel cut with sword notches along the outer edge, as if it took a hundred blows.',
    colours: [slot('steel', 'Steel colour', '#8a8f99', ['Steel band', 'Hammered', 'Battle wear'])],
    layers: () => [
      ...bandShading(steel('#b8bec8', '#2a2e36', { wear: 1.4 }), { step: 0.62 }),
      { ...repeatLayer(), name: 'Notches', element: 'gash', count: 10, snapToCorners: false, at: 0.22, size: 0.4, fill: '#14161a', raised: false, shaded: false, jitterAngle: 25, jitterSize: 0.3, seed: 4, opacity: 0.85 },
    ],
  },
  {
    id: 'c-blackened-brass',
    name: 'C · Blackened & brass',
    pitch: 'Blackened steel with brass rivets in two rows.',
    colours: [slot('steel', 'Steel colour', '#3a3e46', ['Steel band', 'Hammered', 'Battle wear']), slot('brass', 'Rivet colour', '#b5813a', ['Rivets'])],
    layers: () => [...bandShading(steel('#5a606a', '#06070a'), { step: 0.62 }), rivets('#b5813a', BRONZE_STOPS, 0.2, 20), rivets('#b5813a', BRONZE_STOPS, 0.8, 20)],
  },
  {
    id: 'd-bloodied',
    name: 'D · Bloodied steel',
    pitch: 'Dark steel spattered with blood: red in its scratches and dents, and glossy drops across the band.',
    colours: [slot('steel', 'Steel colour', '#6a707a', ['Steel band', 'Hammered']), slot('stain', 'Stain colour', '#8a1010', ['Battle wear'])],
    layers: () => [
      ...bandShading(steel('#8a909a', '#14161a', { tint: '#8a1010', wear: 1.3 }), { step: 0.62 }),
      { ...textureLayer('scatter'), name: 'Blood spatter', color: '#7a0a0a', color2: '#b01a14', amount: 2.4, scale: 0.7, strength: 1.4, seed: 0xb100d, clip: 'band', effects: [{ kind: 'distort', on: true, amount: 0.35, scale: 0.15, seed: 4 } as never] },
      { ...repeatLayer(), name: 'Blood spatter', element: 'drop', count: 28, snapToCorners: false, at: 0.45, size: 0.34, fill: '#9a0c0c', altSizes: [1, 0.5, 0.7, 0.35], wander: 0.7, jitterAngle: 180, jitterSize: 0.4, skipChance: 0.1, seed: 21, raised: false, shaded: false, clip: 'band', effects: [bevel({ profile: 'rounded', size: 0.6, gloss: 0.9, highlightOpacity: 0.6 })] },
      rivets('#a8b0ba', STEEL_STOPS),
    ],
  },
];
export { recolour };
