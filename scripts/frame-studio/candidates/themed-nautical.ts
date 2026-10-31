// Nautical rope (Themed): candidates.
import { BRONZE_STOPS, goldFx, slot, WARM_GOLD, type Candidate, type Layer } from './common';
import { across, bandFillLayer, contact, metalFx, photoBand, ring, textureLayer } from './themed-kit';
import { themed } from './crafted';

export const CURRENT = themed('nautical');
const STAGE = { thickness: 0.22 };
const rope = (color: string, from = 0.36, to = 0.64): Layer[] => [
  { ...bandFillLayer(), name: 'Rope', from, to, paint: { kind: 'solid', color }, effects: [contact(0.6)] },
  { ...textureLayer('rope'), name: 'Rope', from, to, color, amount: 1, strength: 1.2, seed: 0xbead },
  { ...bandFillLayer(), name: 'Rope shading', from, to, blend: 'overlay', opacity: 0.8, paint: across(['#000000', '#ffffff', '#808080', '#000000']) },
];
const portholes = (stops: string[]): Layer => ring('Portholes', 'circle', 4, '#b5813a', [...metalFx(stops, 0.5, 0.9), contact(0.7)], { size: 0.9, outline: '#2a1a08', outlineWidth: 0.25 } as never);
const coins = (): Layer => ring('Doubloons', 'bead', 8, '#d8a838', [...goldFx(0.5, WARM_GOLD), contact(0.6)], { size: 0.32, offset: 0.5, stretch: 1 } as never);
const WOOD = ['#140a04', '#3a2210', '#7a5230', '#b08a60', '#e0c8a0'];

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-ships-timber', name: 'A · Ship’s timber',
    pitch: 'Weathered timber shaded with gradients, a twisted rope round the middle, brass portholes and gold doubloons.',
    stage: STAGE,
    colours: [slot('wood', 'Wood colour', '#7a5230', ['Timber']), slot('rope', 'Rope colour', '#c8a870', ['Rope'])],
    layers: () => [...photoBand('Timber', 'wood-planks', WOOD, { angle: 90, step: null }), ...rope('#c8a870'), portholes(BRONZE_STOPS), coins()],
  },
  {
    id: 'b-navy', name: 'B · Navy & brass',
    pitch: 'Navy-painted planks, a white rope and brass portholes.',
    stage: STAGE,
    colours: [slot('paint', 'Paint colour', '#1a2a4a', ['Timber']), slot('rope', 'Rope colour', '#f0ece0', ['Rope'])],
    layers: () => [...photoBand('Timber', 'wood-planks', ['#02040a', '#0a1428', '#1a2a4a', '#4a5a7a', '#8a9ab0'], { angle: 90, step: null }), ...rope('#f0ece0'), portholes(BRONZE_STOPS)],
  },
  {
    id: 'c-driftwood', name: 'C · Driftwood & shells',
    pitch: 'Sun-bleached driftwood bound with rope, with shells tucked into it.',
    stage: STAGE,
    colours: [slot('wood', 'Wood colour', '#b8a890', ['Timber']), slot('shells', 'Shell colour', '#f8e8e0', ['Shells'])],
    layers: () => [...photoBand('Timber', 'plane-bark', ['#2a2620', '#6a6050', '#b8a890', '#e0d8c8', '#fffcf4'], { angle: 90, step: null }), ...rope('#c8a870', 0.6, 0.8), ring('Shells', 'shell', 8, '#f8e8e0', [contact(0.6)], { size: 0.5, at: 0.3 } as never)],
  },
  {
    id: 'd-pirate', name: 'D · Pirate’s hoard',
    pitch: 'Black tarred timber, a rope, gold doubloons and a skull and crossbones at the top.',
    stage: STAGE,
    colours: [slot('wood', 'Wood colour', '#2a2018', ['Timber'])],
    layers: () => [...photoBand('Timber', 'wood-planks', ['#020101', '#0e0a06', '#2a2018', '#5a4a3a', '#8a7a6a'], { angle: 90, step: null }), ...rope('#a88a5a'), coins(), ring('Skull', 'icon-skull-crossed-bones', 1, '#f0e8d8', [contact(0.7)], { size: 0.85 } as never)],
  },
];
