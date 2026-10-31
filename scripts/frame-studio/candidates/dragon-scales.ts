// Dragon scales: candidates for new versions of the Crafted Dragon scales frame.
import {
  bandFillLayer, bandShading, bevel, BRONZE_STOPS, textureLayer, contact, DROP, goldFx, inscription, lin, lineLayer,
  metalFx, overlay, photo, recolour, roundShading, scaleRows, glow, repeatLayer, slot, WARM_GOLD, type Candidate,
} from './common';
import { crafted } from './crafted';

export const CURRENT = crafted('dragon-scales');
const scales = (name: string, color: string, o: { size?: number; gloss?: number; from?: number; to?: number } = {}) => ({
  ...textureLayer('scales'), name, from: o.from ?? 0, to: o.to ?? 1, color, amount: 1, scale: o.size ?? 1.4, strength: 1 + (o.gloss ?? 0.6) * 0.4, seed: 0xd5a1,
});
const under = (color: string) => ({ ...bandFillLayer(), name: 'Under', paint: { kind: 'solid' as const, color }, effects: [DROP] });
const goldEdge = (name: string, at: number) => ({ ...lineLayer(), name, at, width: 0.06, paint: { kind: 'solid' as const, color: '#d8a838' }, effects: [...metalFx(WARM_GOLD, 0.6, 0.9), contact(0.5)] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-red-dragon',
    name: 'A · Red dragon',
    pitch: 'Crimson scales, glossy and shaded with the twin gradient bands, between thin gold edges.',
    colours: [slot('scales', 'Scale colour', '#b8322a', ['Scales']), slot('gold', 'Edge colour', '#d8a838', ['Outer edge', 'Inner edge'])],
    layers: () => [...bandShading([under('#200404'), scales('Scales', '#e04a3a', { from: 0.06, to: 0.94 })]), goldEdge('Outer edge', 0.03), goldEdge('Inner edge', 0.97)],
  },
  {
    id: 'b-black-dragon',
    name: 'B · Black dragon',
    pitch: 'Glossy black scales with a violet sheen, like oil on obsidian.',
    colours: [slot('scales', 'Scale colour', '#1a1620', ['Scales']), slot('sheen', 'Sheen colour', '#8a4ad0', ['Sheen'])],
    layers: () => bandShading([
      under('#020104'),
      scales('Scales', '#1a1620', { gloss: 0.9 }),
      { ...bandFillLayer(), name: 'Sheen', paint: lin(['#8a4ad0', '#000000', '#2a8ad0'], 30), opacity: 0.55, blend: 'screen' },
    ]),
  },
  {
    id: 'c-bronze-dragon',
    name: 'C · Bronze dragon',
    pitch: 'Metallic bronze scales, each one catching the light like a coin.',
    colours: [slot('scales', 'Scale colour', '#a87a3a', ['Scales'])],
    layers: () => bandShading([
      under('#1a0e04'),
      { ...scales('Scales', '#a87a3a', { size: 1.6 }), effects: [recolour(BRONZE_STOPS)] },
    ]),
  },
  {
    id: 'd-wyrm-script',
    name: 'D · Wyrm script',
    pitch: 'Green scales on the outside and a gold band in the pressed-in step with draconic words in Sith AF.',
    colours: [slot('scales', 'Scale colour', '#3a7a2a', ['Scales']), slot('band', 'Band colour', '#3a1a08', ['Script band']), slot('gold', 'Script colour', '#d8a838', ['Draconic'])],
    layers: () => [
      ...bandShading([under('#081404'), scales('Scales', '#3a7a2a', { to: 0.58 })], { step: null }),
      { ...bandFillLayer(), name: 'Script band', from: 0.58, to: 1, paint: lin(['#6a3a14', '#140602'], 225) },
      { ...lineLayer(), name: 'Crease', at: 0.58, width: 0.03, opacity: 0.55, blend: 'overlay', paint: { kind: 'solid', color: '#190500' } },
      inscription('sith', '#f4d27a', { name: 'Draconic', at: 0.79, size: 0.3, start: 8, effects: [...goldFx(0.4, WARM_GOLD)] }),
    ],
  },
  {
    id: 'e-sea-serpent',
    name: 'E · Sea serpent',
    pitch: 'Teal and turquoise scales with a wet shine and a row of pearls along the inside.',
    colours: [slot('scales', 'Scale colour', '#1a8a8a', ['Scales']), slot('pearls', 'Pearl colour', '#f0ece4', ['Pearls'])],
    layers: () => [
      ...bandShading([under('#021414'), scales('Scales', '#1a8a8a', { gloss: 0.9 }), overlay('blue-onyx', 3, 'overlay', 0.4)]),
      { ...repeatLayer(), name: 'Pearls', element: 'bead', count: 28, at: 0.86, size: 0.16, fill: '#f0ece4', raised: true, effects: [bevel({ profile: 'rounded', size: 0.8, gloss: 1 }), contact(0.5)] },
    ],
  },
  // Round 2: overlapping rows of scales (houseStyle.ts: scaleRows), which hold together on every shape.
  {
    id: 'f-serpent-coil',
    name: 'F · Serpent coil',
    pitch: 'Green scales running along the band like a great serpent coiled round the token, shaded round.',
    colours: [slot('scales', 'Scale colour', '#3a8a2a', ['Scales'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Under', paint: { kind: 'solid', color: '#061004' }, effects: [DROP] },
      ...scaleRows('#3a8a2a', { outline: '#061004' }),
      roundShading(),
    ],
  },
  {
    id: 'g-red-armour',
    name: 'G · Red dragon armour',
    pitch: 'Big crimson scales overlapping like armour plates, pointing outwards, between gold edges.',
    colours: [slot('scales', 'Scale colour', '#c8322a', ['Scales']), slot('gold', 'Edge colour', '#d8a838', ['Outer edge', 'Inner edge'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Under', paint: { kind: 'solid', color: '#1a0202' }, effects: [DROP] },
      ...scaleRows('#c8322a', { lay: 'armour', outline: '#1a0202' }),
      roundShading(0.7),
      goldEdge('Outer edge', 0.03),
      goldEdge('Inner edge', 0.97),
    ],
  },
  {
    id: 'h-gold-wyrm',
    name: 'H · Gold wyrm',
    pitch: 'A coiled wyrm with polished gold scales, each one catching the light.',
    colours: [slot('scales', 'Scale colour', '#d8a838', ['Scales'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Under', paint: { kind: 'solid', color: '#1a0e02' }, effects: [DROP] },
      ...scaleRows('#d8a838', { outline: '#2a1602', effects: [recolour(WARM_GOLD), contact(0.7)] }),
      roundShading(0.7),
    ],
  },
  {
    id: 'i-frost-wyrm',
    name: 'I · Frost wyrm',
    pitch: 'Pale ice-blue serpent scales with a faint frosty glow along the body.',
    stage: { bloom: 0.15 },
    colours: [slot('scales', 'Scale colour', '#8ac8e8', ['Scales'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Under', paint: { kind: 'solid', color: '#06121e' }, effects: [DROP] },
      ...scaleRows('#8ac8e8', { outline: '#0a1a2a', effects: [contact(0.6), glow({ color: '#bfefff', opacity: 0.35, size: 0.06 })] }),
      roundShading(0.7),
    ],
  },
];
export { photo };

// The original frame's band thickness, unless a candidate sets its own.
for (const c of CANDIDATES) c.stage = { ...{ thickness: 0.18, outerSpacing: 0.02 }, ...c.stage };
