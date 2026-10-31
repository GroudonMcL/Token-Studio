// Necropolis (Themed): candidates.
import { cellsLayer, chainLayer, goldFx, growthLayer, slot, WARM_GOLD, type Candidate, type Layer } from './common';
import { base, bevel, contact, glow, metalFx, photoBand, recolour, ring, textureLayer } from './themed-kit';
import { themed } from './crafted';

export const CURRENT = themed('necropolis');
const STAGE = { thickness: 0.2, bloom: 0.25 };
const BONE = ['#2a2418', '#6a5e48', '#c8bca0', '#ece4d0', '#fffcf2'];
const bones = (stops = BONE): Layer => ({ ...cellsLayer(), name: 'Bone plates', pattern: 'brick', size: 0.6, gap: 0.05, rounding: 0.3, vary: 0.3, color: '#c8bca0', effects: [recolour(stops), bevel({ size: 0.3, gloss: 0.3 }), contact(0.6)] });
const chain = (color: string, stops: string[]): Layer => ({ ...chainLayer(), name: 'Chain', at: 0.5, linkLength: 0.45, linkWidth: 0.5, thickness: 0.08, color, effects: [...metalFx(stops, 0.5, 0.7), contact(0.7)] });
const roots = (): Layer => ({ ...growthLayer('roots'), name: 'Roots', count: 2, thickness: 0.045, color: '#2a2016', extraColor: '#2a2016', seed: 6, clip: 'band', effects: [contact(0.7)] });
const mist = (color: string): Layer => ({ ...textureLayer('smoke'), name: 'Mist', color, color2: null, opacity: 0.5, blend: 'screen', seed: 0x5e15, effects: [glow({ color, opacity: 0.4, size: 0.08 })] });
const RUST = ['#140602', '#4a1a08', '#8a3a14', '#c06a3a', '#e8a070'];

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-bone-chains', name: 'A · Bone & chain',
    pitch: 'Yellowed bone plates on a dark band, bound with a rusted chain and dead roots, under a sickly green mist.',
    stage: STAGE,
    colours: [slot('bone', 'Bone colour', '#c8bca0', ['Bone plates']), slot('glow', 'Mist colour', '#8aff6a', ['Mist'])],
    layers: () => [...base({ light: '#2a2a20', dark: '#040402', step: null }), bones(), roots(), chain('#8a3a14', RUST), mist('#8aff6a')],
  },
  {
    id: 'b-crypt-stone', name: 'B · Crypt stone',
    pitch: 'Dark crypt stone with carved skulls set into it.',
    stage: STAGE,
    colours: [slot('stone', 'Stone colour', '#4a4842', ['Stone']), slot('bone', 'Skull colour', '#e8dcc0', ['Skulls'])],
    layers: () => [...photoBand('Stone', 'granite', ['#020202', '#14130f', '#4a4842', '#7a7870', '#aaa8a0']), ring('Skulls', 'skull', 10, '#e8dcc0', [recolour(BONE), bevel({ size: 0.4, gloss: 0.4 }), contact(0.7)], { size: 0.7 } as never)],
  },
  {
    id: 'c-spectral', name: 'C · Spectral',
    pitch: 'Ghostly pale bone in a cold blue mist, with spectral chains.',
    stage: { ...STAGE, bloom: 0.35 },
    colours: [slot('bone', 'Bone colour', '#a8b8c8', ['Bone plates']), slot('glow', 'Mist colour', '#6ad0ff', ['Mist'])],
    layers: () => [...base({ light: '#1a2a3a', dark: '#02060a', step: null }), bones(['#0a141e', '#3a5a6a', '#a8b8c8', '#d8e8f0', '#ffffff']), { ...chain('#a8c8e0', ['#0a141e', '#3a5a6a', '#a8c8e0', '#d8f0ff', '#ffffff']), effects: [glow({ color: '#6ad0ff', opacity: 0.6, size: 0.08 })] } as Layer, mist('#6ad0ff')],
  },
  {
    id: 'd-gilded-tomb', name: 'D · Gilded tomb',
    pitch: 'Black stone with gold skulls and a gold chain, for a lich’s sepulchre.',
    stage: STAGE,
    colours: [slot('stone', 'Stone colour', '#1a1a1e', ['Band', 'Pressed-in step']), slot('gold', 'Gold colour', '#d8a838', ['Skulls', 'Chain'])],
    layers: () => [...base({ light: '#3a3a40', dark: '#020203', step: null }), chain('#d8a838', WARM_GOLD), ring('Skulls', 'skull', 6, '#d8a838', [...goldFx(0.4, WARM_GOLD), contact(0.7)], { size: 0.75 } as never)],
  },
];
