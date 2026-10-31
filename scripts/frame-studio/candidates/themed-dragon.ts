// Dragonscale (Themed): candidates. Texture scales, as the owner preferred, with clipped gradient bands.
import { goldFx, lineLayer, slot, WARM_GOLD, type Candidate, type Layer } from './common';
import { bandFillLayer, contact, DROP, glow, lin, metalFx, recolour, ring, textureLayer } from './themed-kit';
import { themed } from './crafted';

export const CURRENT = themed('dragon-scale');
const STAGE = { thickness: 0.2 };
const scales = (color: string, under: string): Layer[] => [
  { ...bandFillLayer(), name: 'Under', paint: { kind: 'solid', color: under }, effects: [DROP] },
  { ...textureLayer('scales'), name: 'Scales', from: 0.08, to: 0.92, color, amount: 1, scale: 1.4, strength: 1.2, seed: 0xd5a1 },
  { ...bandFillLayer(), name: 'Shading', paint: lin(['#ffffff', '#000000']), blend: 'overlay', opacity: 0.6 },
];
const edges = (color: string, stops: string[]): Layer[] => [0.03, 0.97].map((at) => ({ ...lineLayer(), name: 'Edges', at, width: 0.06, paint: { kind: 'solid' as const, color }, effects: [...metalFx(stops, 0.6, 0.9), contact(0.5)] }));
const eye = (fill: string, glowColor: string): Layer => ring('Eye', 'gem', 1, fill, [glow({ color: glowColor, opacity: 0.7, size: 0.12 }), contact(0.6)], { size: 0.5, stretch: 0.6, gemCut: 'cabochon' } as never);
const ridge = (fill: string, stops: string[]): Layer => ring('Horn ridge', 'tooth', 24, fill, [...goldFx(0.3, stops)], { at: 0.12, size: 0.22, rotation: 180 } as never);

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-crimson-dragon', name: 'A · Crimson dragon',
    pitch: 'Crimson scales shaded with a gradient, gold edges, a row of gold horn tips and a glowing amber dragon’s eye at the top.',
    stage: { ...STAGE, bloom: 0.2 },
    colours: [slot('scales', 'Scale colour', '#d03a2a', ['Scales']), slot('gold', 'Gold colour', '#d8a838', ['Edges', 'Horn ridge'])],
    layers: () => [...scales('#d03a2a', '#200404'), ridge('#f4d27a', WARM_GOLD), ...edges('#d8a838', WARM_GOLD), eye('#ffa020', '#ffc040')],
  },
  {
    id: 'b-emerald-dragon', name: 'B · Emerald dragon',
    pitch: 'Green scales with bronze edges and a glowing yellow eye.',
    stage: { ...STAGE, bloom: 0.2 },
    colours: [slot('scales', 'Scale colour', '#3a9a3a', ['Scales'])],
    layers: () => [...scales('#3a9a3a', '#041004'), ...edges('#a87a3a', ['#1e1206', '#5a3a18', '#a87a3a', '#e0c08a', '#fff0d0']), eye('#e0ff40', '#c0ff40')],
  },
  {
    id: 'c-gold-dragon', name: 'C · Gold dragon',
    pitch: 'Gleaming gold scales with a sapphire eye.',
    stage: { ...STAGE, bloom: 0.2 },
    colours: [slot('scales', 'Scale colour', '#d8a838', ['Scales'])],
    layers: () => [...scales('#d8a838', '#2a1602').map((l) => (l.name === 'Scales' ? { ...l, effects: [recolour(WARM_GOLD)] } : l)), eye('#2a5ad0', '#6aa0ff')],
  },
  {
    id: 'd-shadow-dragon', name: 'D · Shadow dragon',
    pitch: 'Black scales with a violet sheen and a glowing violet eye.',
    stage: { ...STAGE, bloom: 0.25 },
    colours: [slot('scales', 'Scale colour', '#2a2034', ['Scales']), slot('glow', 'Eye colour', '#b06aff', ['Eye'])],
    layers: () => [...scales('#2a2034', '#020104'), { ...bandFillLayer(), name: 'Sheen', paint: lin(['#8a4ad0', '#000000', '#2a8ad0'], 30), opacity: 0.45, blend: 'screen' }, eye('#c890ff', '#9a5aff')],
  },
];
