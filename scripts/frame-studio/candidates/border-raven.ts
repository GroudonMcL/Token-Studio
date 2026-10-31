// Raven plume (Frame Studio's Crafted borders): candidates.
import { bandFillLayer, bandShading, BRONZE_STOPS, contact, DROP, glow, lin, lineLayer, metalFx, recolour, repeatLayer, slot, textureLayer, type Candidate, type Layer } from './common';
import { border } from './crafted';

export const CURRENT = border('raven-plume');
const STAGE = { thickness: 0.18, outerSpacing: 0.01 };
/** Feathers laid along the band, two layers deep so they read as plumage rather than lines. */
const plumage = (dark: string, light: string, seed = 0xfea7): Layer[] => [
  { ...textureLayer('feathers'), name: 'Feathers', from: 0.08, to: 0.92, color: dark, amount: 1, scale: 1.3, strength: 1, seed },
  { ...textureLayer('feathers'), name: 'Top feathers', from: 0.12, to: 0.88, color: light, amount: 0.6, scale: 1.1, strength: 0.9, seed: seed + 1, effects: [contact(0.5)] },
];
const rim = (name: string, at: number, color: string, glowColor: string | null, width = 0.06): Layer => ({
  ...lineLayer(), name, at, width, paint: { kind: 'solid', color }, effects: [...metalFx(['#1e0a04', '#6a3014', color, '#f0b08a', '#fff0e0'], 0.6, 0.9), ...(glowColor ? [glow({ color: glowColor, opacity: 0.5, size: 0.08 })] : [])],
});

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-raven-sheen',
    name: 'A · Raven sheen',
    pitch: 'Fuller black plumage with the blue-violet sheen of a raven’s wing, between bright copper rims.',
    stage: { ...STAGE, bloom: 0.15 },
    colours: [slot('feathers', 'Feather colour', '#2a2e38', ['Feathers', 'Top feathers']), slot('rims', 'Rim colour', '#c8602a', ['Outer copper', 'Inner copper'])],
    layers: () => [
      ...bandShading([{ ...bandFillLayer(), name: 'Black band', paint: lin(['#1a1c24', '#020204']), effects: [DROP] }], { step: null }),
      ...plumage('#2a2e38', '#5a6070'),
      { ...bandFillLayer(), name: 'Sheen', from: 0.08, to: 0.92, paint: lin(['#3a2a8a', '#000000', '#1a6a8a'], 30), opacity: 0.5, blend: 'screen' },
      rim('Outer copper', 0.03, '#c8602a', '#ff6a2a'),
      rim('Inner copper', 0.97, '#c8602a', '#ff6a2a'),
    ],
  },
  {
    id: 'b-plume-bone',
    name: 'B · Plume & bone',
    pitch: 'Black feathers threaded with small carved bone beads, like a shaman’s talisman.',
    stage: STAGE,
    colours: [slot('feathers', 'Feather colour', '#2a2e38', ['Feathers', 'Top feathers']), slot('beads', 'Bead colour', '#e8dcc0', ['Bone beads'])],
    layers: () => [
      ...bandShading([{ ...bandFillLayer(), name: 'Black band', paint: lin(['#1a1c24', '#020204']), effects: [DROP] }], { step: null }),
      ...plumage('#2a2e38', '#5a6070'),
      { ...repeatLayer(), name: 'Bone beads', element: 'bead', count: 12, at: 0.5, size: 0.34, stretch: 0.8, fill: '#e8dcc0', raised: true, effects: [contact(0.6)] },
      rim('Outer rim', 0.03, '#8a6a40', null, 0.04),
      rim('Inner rim', 0.97, '#8a6a40', null, 0.04),
    ],
  },
  {
    id: 'c-owl-plume',
    name: 'C · Owl plume',
    pitch: 'Soft brown and cream barred owl feathers between bronze rims.',
    stage: STAGE,
    colours: [slot('feathers', 'Feather colour', '#8a6a44', ['Feathers', 'Top feathers']), slot('rims', 'Rim colour', '#a87a3a', ['Outer bronze', 'Inner bronze'])],
    layers: () => [
      ...bandShading([{ ...bandFillLayer(), name: 'Band', paint: lin(['#5a4028', '#1a0e06']), effects: [DROP] }], { step: null }),
      ...plumage('#8a6a44', '#e8dcc0', 0xfeb1),
      { ...lineLayer(), name: 'Outer bronze', at: 0.03, width: 0.06, paint: { kind: 'solid', color: '#a87a3a' }, effects: metalFx(BRONZE_STOPS, 0.6, 0.9) },
      { ...lineLayer(), name: 'Inner bronze', at: 0.97, width: 0.06, paint: { kind: 'solid', color: '#a87a3a' }, effects: metalFx(BRONZE_STOPS, 0.6, 0.9) },
    ],
  },
  {
    id: 'd-phoenix',
    name: 'D · Phoenix plume',
    pitch: 'Red and gold phoenix feathers with ember-glowing rims.',
    stage: { ...STAGE, bloom: 0.25 },
    colours: [slot('feathers', 'Feather colour', '#c02a1a', ['Feathers', 'Top feathers']), slot('glow', 'Glow colour', '#ff8a2a', ['Outer ember', 'Inner ember'])],
    layers: () => [
      ...bandShading([{ ...bandFillLayer(), name: 'Band', paint: lin(['#5a0a04', '#140202']), effects: [DROP] }], { step: null }),
      ...plumage('#c02a1a', '#f4b030', 0xfeb5),
      { ...lineLayer(), name: 'Outer ember', at: 0.03, width: 0.04, paint: { kind: 'solid', color: '#ffd090' }, effects: [glow({ color: '#ff8a2a', opacity: 0.8, size: 0.12 })] },
      { ...lineLayer(), name: 'Inner ember', at: 0.97, width: 0.04, paint: { kind: 'solid', color: '#ffd090' }, effects: [glow({ color: '#ff8a2a', opacity: 0.8, size: 0.12 })] },
    ],
  },
];
export { recolour };
