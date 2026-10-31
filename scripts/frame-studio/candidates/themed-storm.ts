// Stormcaller (Themed): candidates.
import { slot, type Candidate, type Layer } from './common';
import { base, blur as blurFx, lightning, textureLayer } from './themed-kit';
import { themed } from './crafted';

export const CURRENT = themed('storm-ring');
const STAGE = { thickness: 0.2, bloom: 0.35 };
const clouds = (color: string, color2: string, seed: number): Layer => ({ ...textureLayer('smoke'), name: 'Clouds', color, color2, amount: 1, opacity: 0.9, seed, effects: [blurFx(0.02)] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-thunderhead', name: 'A · Thunderhead',
    pitch: 'Swirling grey storm cloud in the twin gradient bands, crackling with forked lightning.',
    stage: STAGE,
    colours: [slot('cloud', 'Cloud colour', '#3a4450', ['Band', 'Pressed-in step', 'Clouds']), slot('light', 'Lightning colour', '#bfe4ff', ['Lightning'])],
    layers: () => [...base({ light: '#5a6470', dark: '#06080a', step: null }), clouds('#9aa4b0', '#1a2028', 0x5e11), lightning('#f0f8ff', '#6ab0ff')],
  },
  {
    id: 'b-violet-storm', name: 'B · Arcane tempest',
    pitch: 'A violet storm with pink lightning.',
    stage: STAGE,
    colours: [slot('cloud', 'Cloud colour', '#3a2450', ['Band', 'Pressed-in step', 'Clouds']), slot('light', 'Lightning colour', '#ffc8ff', ['Lightning'])],
    layers: () => [...base({ light: '#5a3a7a', dark: '#0a0412', step: null }), clouds('#b08ad0', '#1a0a28', 0x5e12), lightning('#fff0ff', '#e070ff', 0x11e8)],
  },
  {
    id: 'c-red-storm', name: 'C · Blood storm',
    pitch: 'Red-black clouds lit by orange lightning.',
    stage: STAGE,
    colours: [slot('cloud', 'Cloud colour', '#3a1010', ['Band', 'Pressed-in step', 'Clouds']), slot('light', 'Lightning colour', '#ffc080', ['Lightning'])],
    layers: () => [...base({ light: '#6a2020', dark: '#0a0202', step: null }), clouds('#c06050', '#1a0404', 0x5e13), lightning('#fff0d0', '#ff7a2a', 0x11e9)],
  },
  {
    id: 'd-rain', name: 'D · Rainstorm',
    pitch: 'Blue-grey storm with slanting rain and a single bolt.',
    stage: STAGE,
    colours: [slot('cloud', 'Cloud colour', '#2a3a50', ['Band', 'Pressed-in step', 'Clouds'])],
    layers: () => [
      ...base({ light: '#4a5a74', dark: '#04080e', step: null }),
      clouds('#8a9ab0', '#10161e', 0x5e14),
      { ...textureLayer('brushed'), name: 'Rain', color: '#d0e0f0', opacity: 0.35, seed: 0xb708 },
      { ...lightning('#f0f8ff', '#6ab0ff', 0x11ea), count: 2 } as Layer,
    ],
  },
];
