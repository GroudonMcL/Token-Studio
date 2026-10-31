// Tidal ring (Frame Studio's Themed starting designs): candidates.
import { bandFillLayer, base, bevel, contact, glow, lineLayer, overlay, photo, recolour, repeatLayer, slot, type Candidate, type Layer } from './common';
import { themed } from './crafted';

export const CURRENT = themed('tidal-ring');
const STAGE = { thickness: 0.2 };
const waves = (swell: string, foam: string): Layer[] => [
  { ...lineLayer(), name: 'Swell', at: 0.42, width: 0.3, paint: { kind: 'solid', color: swell }, waveAmplitude: 0.16, waveFit: 1.3, clip: 'band', opacity: 0.85 },
  { ...lineLayer(), name: 'Foam crests', at: 0.28, width: 0.06, paint: { kind: 'solid', color: foam }, waveAmplitude: 0.16, waveFit: 1.3, wavePhase: 0.1, clip: 'band', effects: [{ kind: 'distort', on: true, amount: 0.05, scale: 0.12, seed: 9 } as never, glow({ color: foam, opacity: 0.4, size: 0.08 })] },
];
const bubbles = (): Layer => ({ ...repeatLayer(), name: 'Bubbles', element: 'circle', count: 30, snapToCorners: false, at: 0.66, size: 0.1, fill: '#bfefff', outline: '#e8ffff', outlineWidth: 0.12, opacity: 0.55, raised: false, shaded: false, altSizes: [1, 0.6, 0.8], wander: 0.4, seed: 3 });
const pearls = (fill = '#f4f0ea'): Layer => ({ ...repeatLayer(), name: 'Pearls', element: 'bead', count: 36, snapToCorners: false, at: 0.9, size: 0.12, fill, raised: true, effects: [bevel({ profile: 'rounded', size: 0.8, gloss: 1 }), contact(0.5)] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-tidal',
    name: 'A · Tidal ring',
    pitch: 'Deep water in the twin gradient bands, a rolling swell with foam crests, bubbles, and a string of pearls inside the band.',
    stage: STAGE,
    colours: [slot('sea', 'Sea colour', '#0a4a6a', ['Band', 'Pressed-in step', 'Swell'])],
    layers: () => [...base({ light: '#1a7aa0', dark: '#021a2a', step: 0.8 }), ...waves('#2a9ac0', '#e8fbff'), bubbles(), pearls()],
  },
  {
    id: 'b-coral-reef',
    name: 'B · Coral reef',
    pitch: 'Pink coral stone with shells and pearls, washed by a turquoise sea.',
    stage: STAGE,
    colours: [slot('coral', 'Coral colour', '#e08a7a', ['Coral']), slot('sea', 'Sea colour', '#2ab0b0', ['Swell'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Coral', paint: photo('coral-stone', 1.4), effects: [recolour(['#2a0a08', '#8a3a30', '#e08a7a', '#f8c8b8', '#fff4f0']), contact(0.6)] },
      { ...waves('#2ab0b0', '#e8fbff')[0], at: 0.75, width: 0.3 },
      { ...repeatLayer(), name: 'Shells', element: 'shell', count: 8, snapToCorners: false, at: 0.35, size: 0.55, fill: '#fff0e0', raised: false, effects: [bevel({ size: 0.4, gloss: 0.6 }), contact(0.6)] },
      pearls(),
    ],
  },
  {
    id: 'c-stormy-sea',
    name: 'C · Stormy sea',
    pitch: 'Grey-green storm waves under a dark sky, with white spray.',
    stage: STAGE,
    colours: [slot('sea', 'Sea colour', '#2a3a3a', ['Band', 'Pressed-in step', 'Swell'])],
    layers: () => [...base({ light: '#4a5a5a', dark: '#040808', step: 0.8 }), overlay('black-onyx', 4, 'screen', 0.3), ...waves('#5a7a7a', '#f0f8f8'), bubbles()],
  },
  {
    id: 'd-lagoon',
    name: 'D · Lagoon',
    pitch: 'Clear turquoise lagoon water over sand, with gentle foam and pearls.',
    stage: STAGE,
    colours: [slot('sea', 'Sea colour', '#1ab0b8', ['Band', 'Pressed-in step', 'Swell'])],
    layers: () => [...base({ light: '#5ae0e0', dark: '#0a5a6a', step: 0.8 }), ...waves('#8af0f0', '#ffffff'), pearls('#fff8f0')],
  },
];
