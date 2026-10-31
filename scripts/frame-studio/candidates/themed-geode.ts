// Amethyst geode (Themed): candidates.
import { contoursLayer, slot, type Candidate, type Layer } from './common';
import { across, bandFillLayer, DROP, glow, lin, photo, recolour, textureLayer, contact } from './themed-kit';
import { themed } from './crafted';

export const CURRENT = themed('amethyst-geode');
const STAGE = { thickness: 0.22, bloom: 0.15 };
/** A geode: rough stone crust outside, crystal lining within, each with its own shading. */
const geode = (crust: string[], crystal: string, glowColor: string, inward?: string[]): Layer[] => [
  { ...bandFillLayer(), name: 'Crust', paint: photo('dark-rock', 1.2), effects: [recolour(crust), DROP] },
  { ...bandFillLayer(), name: 'Crust shading', to: 0.4, paint: lin(['#ffffff', '#000000']), blend: 'overlay', opacity: 0.6 },
  { ...bandFillLayer(), name: 'Crystal', from: 0.35, paint: lin(['#000000', crystal]), effects: [glow({ inner: true, color: glowColor, opacity: 0.4, size: 0.1 })] },
  { ...textureLayer('crystal'), name: 'Crystal', from: 0.35, color: crystal, opacity: 0.95, seed: 0xc278 },
  ...(inward ? [{ ...bandFillLayer(), name: 'Crystal', from: 0.35, paint: across(inward), blend: 'color' as const, opacity: 0.9 }, { ...bandFillLayer(), name: 'Crystal light', from: 0.35, paint: across(['#000000', '#808080', '#ffffff']), blend: 'soft-light' as const, opacity: 0.8 }] : []),
  { ...textureLayer('sparkle'), name: 'Glitter', from: 0.35, color: '#ffffff', amount: 0.7, scale: 0.4, seed: 0x5a3e },
  { ...bandFillLayer(), name: 'Rind', from: 0.3, to: 0.4, paint: { kind: 'solid', color: '#f0ece4' }, opacity: 0.6, effects: [contact(0.5)] },
];
const STONE = ['#0a0806', '#2a2420', '#5a5048', '#8a8078', '#b8b0a8'];

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-amethyst', name: 'A · Amethyst geode',
    pitch: 'Grey stone crust outside, a white rind, then glittering crystal going from deep purple to pale lilac towards the centre.',
    stage: STAGE,
    colours: [slot('crust', 'Crust colour', '#5a5048', ['Crust']), slot('crystal', 'Crystal colour', '#9a4ad0', ['Crystal'])],
    layers: () => geode(STONE, '#9a4ad0', '#c08aff', ['#2a0a5a', '#6a2aa0', '#b07ae0', '#f0e0ff']),
  },
  {
    id: 'b-citrine', name: 'B · Citrine geode',
    pitch: 'Warm golden-yellow citrine crystal inside a brown crust.',
    stage: STAGE,
    colours: [slot('crust', 'Crust colour', '#6a5034', ['Crust']), slot('crystal', 'Crystal colour', '#e0a020', ['Crystal'])],
    layers: () => geode(['#0a0602', '#2a1a0a', '#6a5034', '#9a8060', '#c8b090'], '#e0a020', '#ffd060'),
  },
  {
    id: 'c-emerald', name: 'C · Emerald geode',
    pitch: 'Deep green crystal inside a dark crust.',
    stage: STAGE,
    colours: [slot('crust', 'Crust colour', '#3a3a3a', ['Crust']), slot('crystal', 'Crystal colour', '#1aa060', ['Crystal'])],
    layers: () => geode(['#020202', '#141414', '#3a3a3a', '#6a6a6a', '#9a9a9a'], '#1aa060', '#6affa0'),
  },
  {
    id: 'd-agate', name: 'D · Banded agate',
    pitch: 'A slice of agate: bands of colour going from deep blue outside to white at the centre, polished smooth.',
    stage: STAGE,
    colours: [slot('agate', 'Agate colour', '#3a6aa0', ['Agate', 'Bands'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Agate', paint: across(['#0e2440', '#2a5a90', '#6a9ac8', '#c8dcf0', '#ffffff']), effects: [DROP] },
      { ...contoursLayer(), name: 'Bands', count: 7, from: 0.06, spacing: 0.14, width: 0.04, taper: 0.3, paint: { kind: 'solid', color: '#f0f4f8' }, altColor: '#1a3a60', opacity: 0.55, effects: [{ kind: 'distort', on: true, amount: 0.04, scale: 0.4, seed: 3 } as never] },
      { ...bandFillLayer(), name: 'Polish', paint: lin(['#ffffff', '#000000']), blend: 'overlay', opacity: 0.5 },
    ],
  },
];
