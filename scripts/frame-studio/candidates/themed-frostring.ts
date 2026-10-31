// Frostbound ring (Themed): candidates.
import { cellsLayer, glowLines, SILVER_STOPS, slot, type Candidate, type Layer } from './common';
import { base, contact, glow, metalFx, photoBand, ring, textureLayer } from './themed-kit';
import { themed } from './crafted';

export const CURRENT = themed('frost-ring');
const STAGE = { thickness: 0.2, bloom: 0.25 };
const crystals = (color: string, stops: string[]): Layer => ({ ...cellsLayer(), name: 'Crystals', pattern: 'hex', size: 0.42, gap: 0.04, rounding: 0.05, vary: 0.25, color, opacity: 0.85, effects: [...metalFx(stops, 0.25, 0.9)] });
const ICE = ['#04101c', '#1a4a6a', '#6aa8d0', '#c8ecff', '#ffffff'];

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-glacier-crystal', name: 'A · Glacier crystal',
    pitch: 'Hexagonal ice crystals over glacier blue, shaded with gradients, with a cold glowing seam.',
    stage: STAGE,
    colours: [slot('ice', 'Ice colour', '#6aa8d0', ['Band', 'Pressed-in step', 'Crystals'])],
    layers: () => [...base({ light: '#8ac8f0', dark: '#06182a', step: 0.74 }), crystals('#a8d8f8', ICE), glowLines(['#f0fcff', '#a8ecff'], '#4ac8ff', { count: 1, from: 0.74, width: 0.025, size: 0.1 })],
  },
  {
    id: 'b-frozen-silver', name: 'B · Frozen silver',
    pitch: 'Frosted silver with silver snowflakes and a pale blue glow.',
    stage: STAGE,
    colours: [slot('metal', 'Metal colour', '#c8ccd4', ['Band', 'Pressed-in step', 'Snowflakes'])],
    layers: () => [...base({ light: '#e8ecf0', dark: '#3a4048', step: 0.7 }), { ...textureLayer('frost'), name: 'Frost', color: '#ffffff', opacity: 0.7, seed: 0xf208, blend: 'screen' }, ring('Snowflakes', 'snowflake', 8, '#ffffff', [...metalFx(SILVER_STOPS, 0.3, 0.9), glow({ color: '#bfe8ff', opacity: 0.5, size: 0.08 })], { size: 0.6, at: 0.36 } as never)],
  },
  {
    id: 'c-ice-snow', name: 'C · Ice & snow',
    pitch: 'Clear blue ice capped with a soft drift of snow along the outer edge.',
    stage: STAGE,
    colours: [slot('ice', 'Ice colour', '#6aa8d0', ['Ice'])],
    layers: () => [...photoBand('Ice', 'ice', ICE), { ...photoBand('Snow', 'snow', null, { step: null })[0], to: 0.38, effects: [{ kind: 'distort', on: true, amount: 0.25, scale: 0.4, seed: 5 } as never, contact(0.5)], clip: 'band' } as Layer],
  },
  {
    id: 'd-aurora-ice', name: 'D · Aurora ice',
    pitch: 'Dark ice lit from within by green and violet aurora light.',
    stage: { ...STAGE, bloom: 0.3 },
    colours: [slot('ice', 'Ice colour', '#1a3050', ['Band', 'Pressed-in step']), slot('aurora', 'Aurora colour', '#3aff9a', ['Aurora'])],
    layers: () => [...base({ light: '#2a4a70', dark: '#020610', step: null }), { ...textureLayer('nebula'), name: 'Aurora', color: '#3aff9a', color2: '#9a4aff', opacity: 0.7, blend: 'screen', seed: 0x2f5 }, crystals('#8ab8e0', ICE)],
  },
];
