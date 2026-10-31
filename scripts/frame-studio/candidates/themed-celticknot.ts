// Celtic knot (Themed): candidates.
import { BRONZE_STOPS, knotworkLayer, SILVER_STOPS, slot, WARM_GOLD, type Candidate, type Layer } from './common';
import { base, contact, lin, photoBand, recolour, bandFillLayer, DROP } from './themed-kit';
import { themed } from './crafted';

export const CURRENT = themed('celtic-knot');
const STAGE = { thickness: 0.2 };
const knot = (color: string, stops: string[], double = false): Layer => ({ ...knotworkLayer(), name: 'Knotwork', at: 0.5, width: 0.16, amplitude: 0.28, waveLength: 0.85, color, outline: '#000000', outlineWidth: 0.03, outlineOpacity: 0.6, shine: true, double, effects: [recolour(stops), contact(0.7)] });
const rims = (stops: string[]): Layer[] => [
  { ...bandFillLayer(), name: 'Rims', to: 0.12, paint: lin(['#ffffff', '#505050']), effects: [recolour(stops), DROP] },
  { ...bandFillLayer(), name: 'Rims', from: 0.88, paint: lin(['#404040', '#f0f0f0']), effects: [recolour(stops)] },
];

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-silver-green', name: 'A · Silver on green',
    pitch: 'Silver knotwork woven over and under on green enamel, between silver rims shaded with gradients.',
    stage: STAGE,
    colours: [slot('enamel', 'Enamel colour', '#1f6a3c', ['Band']), slot('silver', 'Silver colour', '#d8dce4', ['Knotwork', 'Rims'])],
    layers: () => [...base({ light: '#2e8a50', dark: '#031408', step: null }), ...rims(SILVER_STOPS), knot('#d8dce4', SILVER_STOPS)],
  },
  {
    id: 'b-gold-red', name: 'B · Gold on red',
    pitch: 'A double gold knot on deep red enamel between gold rims.',
    stage: STAGE,
    colours: [slot('enamel', 'Enamel colour', '#8a1a24', ['Band']), slot('gold', 'Gold colour', '#d8a838', ['Knotwork', 'Rims'])],
    layers: () => [...base({ light: '#c02a3a', dark: '#1a0206', step: null }), ...rims(WARM_GOLD), knot('#d8a838', WARM_GOLD, true)],
  },
  {
    id: 'c-bronze-blue', name: 'C · Bronze on blue',
    pitch: 'Bronze knotwork on midnight-blue enamel.',
    stage: STAGE,
    colours: [slot('enamel', 'Enamel colour', '#1a2a5a', ['Band']), slot('bronze', 'Bronze colour', '#a87a3a', ['Knotwork', 'Rims'])],
    layers: () => [...base({ light: '#2a4a8a', dark: '#02061a', step: null }), ...rims(BRONZE_STOPS), knot('#a87a3a', BRONZE_STOPS)],
  },
  {
    id: 'd-carved-moss', name: 'D · Mossy carved stone',
    pitch: 'A stone knot carved in grey granite, with moss in the hollows.',
    stage: STAGE,
    colours: [slot('stone', 'Stone colour', '#8a8680', ['Stone', 'Knotwork'])],
    layers: () => [...photoBand('Stone', 'mossy-rock', null, { step: null }), knot('#a8a49c', ['#14130f', '#4a4842', '#8a8680', '#c8c4ba', '#f0ece2'])],
  },
];
