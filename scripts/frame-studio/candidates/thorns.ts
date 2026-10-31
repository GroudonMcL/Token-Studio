// Thorns: candidates for new versions of the Crafted Thorns frame.
import {
  bandFillLayer, bandShading, bevel, contact, DROP, glow, growthLayer, metalFx, photo, recolour, repeatLayer, SILVER_STOPS,
  slot, textureLayer, type Candidate,
} from './common';
import { crafted } from './crafted';

export const CURRENT = crafted('thorns');
const briar = (name: string, color: string, thorn: string, o: { count?: number; thickness?: number; amplitude?: number; waveLength?: number; size?: number; seed?: number } = {}) => ({
  ...growthLayer('thorns'), name, count: o.count ?? 2, thickness: o.thickness ?? 0.09, amplitude: o.amplitude ?? 0.28, waveLength: o.waveLength ?? 1.6,
  extraSize: o.size ?? 0.4, color, extraColor: thorn, seed: o.seed ?? 1,
});

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-rose-briar',
    name: 'A · Rose briar',
    pitch: 'Dark thorny stems wound round each other with deep red roses blooming at intervals.',
    stage: { thickness: 0.16, outerSpacing: 0.06 },
    colours: [slot('stem', 'Stem colour', '#3a2a1a', ['Briar', 'Second briar']), slot('roses', 'Rose colour', '#a01828', ['Roses'])],
    layers: () => [
      { ...briar('Briar', '#3a2a1a', '#1a120a'), effects: [bevel({ size: 0.5, gloss: 0.3 }), DROP] },
      { ...briar('Second briar', '#4a3420', '#1e140a', { count: 1, thickness: 0.06, waveLength: 2.2, seed: 7 }), effects: [bevel({ size: 0.5, gloss: 0.3 }), contact(0.6)] },
      { ...growthLayer('vine'), name: 'Leaves', count: 1, thickness: 0.025, amplitude: 0.2, waveLength: 1.9, extra: 'leaves', extraSize: 0.3, color: '#2a3a1a', extraColor: '#2e5a22', seed: 3, effects: [bevel({ size: 0.4, gloss: 0.3 }), contact(0.5)] },
      { ...repeatLayer(), name: 'Roses', element: 'icon-rose', count: 8, at: 0.5, size: 1.1, fill: '#a01828', raised: false, effects: [bevel({ size: 0.4, gloss: 0.5 }), contact(0.6)] },
    ],
  },
  {
    id: 'b-bark-bramble',
    name: 'B · Bramble on bark',
    pitch: 'A narrow ring of bark, shaded with gradient bands, with a thorny bramble climbing over it.',
    stage: { thickness: 0.16, outerSpacing: 0.04 },
    colours: [slot('bark', 'Bark colour', '#5f5040', ['Bark']), slot('stem', 'Bramble colour', '#4a3020', ['Bramble'])],
    layers: () => [
      ...bandShading([{ ...bandFillLayer(), name: 'Bark', from: 0.2, to: 0.8, paint: photo('bark', 1.4, { angle: 90, lighting: 0.4 }), effects: [recolour(['#0a0604', '#2a1e14', '#5f5040', '#8a7a64', '#b8a888']), DROP] }], { step: null }),
      { ...briar('Bramble', '#4a3020', '#24160a', { count: 2, thickness: 0.07, amplitude: 0.32, size: 0.35 }), effects: [bevel({ size: 0.5, gloss: 0.35 }), contact(0.7)] },
    ],
  },
  {
    id: 'c-withered',
    name: 'C · Withered',
    pitch: 'Grey, dead thorns twisted into a ring, with a thin mist curling through them.',
    stage: { thickness: 0.16, outerSpacing: 0.06 },
    colours: [slot('stem', 'Thorn colour', '#7a746a', ['Briar', 'Second briar']), slot('mist', 'Mist colour', '#b8c0c8', ['Mist'])],
    layers: () => [
      { ...briar('Briar', '#7a746a', '#3a3630', { thickness: 0.08, amplitude: 0.32 }), effects: [bevel({ size: 0.45, gloss: 0.2 }), DROP] },
      { ...briar('Second briar', '#5a564e', '#2a2824', { count: 1, thickness: 0.06, waveLength: 2.4, seed: 11 }), effects: [bevel({ size: 0.45, gloss: 0.2 }), contact(0.6)] },
      { ...textureLayer('smoke'), name: 'Mist', color: '#b8c0c8', color2: null, opacity: 0.8, blend: 'screen', seed: 0x5e10 },
    ],
  },
  {
    id: 'd-blood-thorns',
    name: 'D · Blood thorns',
    pitch: 'Black briars with red-tipped thorns and a few glowing drops of blood hanging inside the ring.',
    stage: { thickness: 0.16, outerSpacing: 0.06, bloom: 0.2 },
    colours: [slot('stem', 'Stem colour', '#1e1416', ['Briar', 'Second briar']), slot('blood', 'Blood colour', '#d01a2a', ['Drops'])],
    layers: () => [
      { ...briar('Briar', '#1e1416', '#6a0a12'), effects: [bevel({ size: 0.5, gloss: 0.5 }), DROP] },
      { ...briar('Second briar', '#2a1a1c', '#8a0e18', { count: 1, thickness: 0.06, waveLength: 2.2, seed: 7 }), effects: [bevel({ size: 0.5, gloss: 0.5 }), contact(0.6)] },
      { ...repeatLayer(), name: 'Drops', element: 'drop', count: 8, at: 0.6, size: 0.5, rotation: 180, fill: '#d01a2a', raised: false, effects: [bevel({ profile: 'rounded', size: 0.7, gloss: 0.9 }), glow({ color: '#ff2a3a', opacity: 0.6, size: 0.08 })] },
    ],
  },
  {
    id: 'e-silver-thorns',
    name: 'E · Silverwork thorns',
    pitch: 'A jeweller’s crown of thorns in polished silver, set with small amethysts.',
    stage: { thickness: 0.16, outerSpacing: 0.06 },
    colours: [slot('metal', 'Metal colour', '#c8ccd4', ['Briar', 'Second briar']), slot('gems', 'Gem colour', '#8a3ac0', ['Gems'])],
    layers: () => [
      { ...briar('Briar', '#c8ccd4', '#e8ecf0', { thickness: 0.07 }), effects: [...metalFx(SILVER_STOPS, 0.5, 0.9), DROP] },
      { ...briar('Second briar', '#a8aeb8', '#d8dce4', { count: 1, thickness: 0.05, waveLength: 2.2, seed: 7 }), effects: [...metalFx(SILVER_STOPS, 0.5, 0.9), contact(0.6)] },
      { ...repeatLayer(), name: 'Gems', element: 'gem', count: 6, at: 0.5, size: 0.36, fill: '#8a3ac0', raised: false, gemSparkle: 0.7, effects: [contact(0.6)] },
    ],
  },
];
