// Storm wisps (Frame Studio's Crafted borders): candidates.
import { blur, fractureLayer, glow, lineLayer, slot, textureLayer, type Candidate, type Layer } from './common';
import { groupLayer, NEW_EFFECT } from '../../../src/frame-studio/project/defaults';
import { border } from './crafted';

export const CURRENT = border('storm-wisps');
const STAGE = { thickness: 0.2, outerSpacing: 0.03 };
const distort = (amount: number, scale = 0.3, seed = 1) => ({ ...NEW_EFFECT.distort(), amount, scale, seed }) as Layer['effects'][number];
const spin = (amount: number) => ({ kind: 'blur' as const, on: true, mode: 'spin' as const, amount, keepShape: false });
/** The storm, in any three colours, kept inside the band (the group is clipped to it). */
const storm = (cloud: string, veil: string, edge: string, wisp: string): Layer => ({
  ...groupLayer([
    { ...lineLayer(), name: 'Dark cloud', at: 0.5, width: 0.9, paint: { kind: 'solid', color: cloud }, opacity: 0.85 },
    { ...lineLayer(), name: 'Veil', at: 0.3, width: 0.1, paint: { kind: 'solid', color: veil }, waveAmplitude: 0.5, waveFit: 4, wavePhase: 0.25, opacity: 0.4 },
    { ...lineLayer(), name: 'Edge light', at: 0.18, width: 0.2, paint: { kind: 'solid', color: edge }, waveAmplitude: 0.08, waveFit: 3, blend: 'screen', opacity: 0.9 },
    { ...lineLayer(), name: 'Edge light', at: 0.82, width: 0.16, paint: { kind: 'solid', color: edge }, waveAmplitude: 0.08, waveFit: 2.5, wavePhase: 0.5, blend: 'screen', opacity: 0.7 },
    { ...lineLayer(), name: 'Veil', at: 0.4, width: 0.12, paint: { kind: 'solid', color: veil }, waveAmplitude: 0.4, waveFit: 3.4, opacity: 0.45 },
    { ...lineLayer(), name: 'Veil', at: 0.6, width: 0.1, paint: { kind: 'solid', color: veil }, waveAmplitude: 0.35, waveFit: 2.6, wavePhase: 0.5, opacity: 0.4 },
    { ...textureLayer('smoke'), name: 'Wisps', from: 0.05, to: 0.95, color: wisp, color2: null, amount: 0.7, strength: 0.7, seed: 0x5e0c, blend: 'screen' },
  ]),
  name: 'Storm',
  clip: 'band',
  effects: [distort(0.12, 2.2, 7), spin(0.3), blur(0.05)],
});
const lightning = (color: string, glowColor: string): Layer => ({
  ...fractureLayer(), kind: 'lightning', name: 'Lightning', from: 0.1, to: 0.9, count: 5, length: 1.4, branching: 0.6, jagged: 0.8, width: 0.025, color, seed: 0x11e7,
  effects: [glow({ color: glowColor, opacity: 0.9, size: 0.1 })],
});

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-thunderhead',
    name: 'A · Thunderhead',
    pitch: 'The same storm held inside the band, darker, with forks of lightning crackling through it.',
    stage: { ...STAGE, bloom: 0.3 },
    colours: [slot('cloud', 'Cloud colour', '#10161c', ['Storm']), slot('light', 'Lightning colour', '#bfe4ff', ['Lightning'])],
    layers: () => [storm('#10161c', '#7a8088', '#3a8ad0', '#c0dcf0'), lightning('#f0f8ff', '#6ab0ff')],
  },
  {
    id: 'b-violet-storm',
    name: 'B · Arcane storm',
    pitch: 'A violet storm with magenta light at its edges and pale lightning.',
    stage: { ...STAGE, bloom: 0.3 },
    colours: [slot('cloud', 'Cloud colour', '#1a0e24', ['Storm']), slot('light', 'Lightning colour', '#f0c8ff', ['Lightning'])],
    layers: () => [storm('#1a0e24', '#8a70a0', '#b04ad0', '#e0c0f0'), lightning('#fff0ff', '#d070ff')],
  },
  {
    id: 'c-sandstorm',
    name: 'C · Sandstorm',
    pitch: 'Swirling desert sand, ochre and dust-gold, with no lightning.',
    stage: STAGE,
    colours: [slot('sand', 'Sand colour', '#8a6a3a', ['Storm'])],
    layers: () => [storm('#4a3418', '#c8a870', '#e0a040', '#f0d8a0')],
  },
  {
    id: 'd-sea-mist',
    name: 'D · Sea squall',
    pitch: 'Teal sea-spray and white mist whirling round, like a squall over dark water.',
    stage: { ...STAGE, bloom: 0.15 },
    colours: [slot('sea', 'Sea colour', '#0a2a30', ['Storm'])],
    layers: () => [storm('#0a2a30', '#a8c8c8', '#3ac8b0', '#e8fafa')],
  },
];
