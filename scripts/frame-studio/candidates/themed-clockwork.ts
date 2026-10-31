// Clockwork brass (Themed): candidates.
import { BRONZE_STOPS, chainLayer, gearsLayer, SILVER_STOPS, slot, STEEL_STOPS, WARM_GOLD, type Candidate, type Layer } from './common';
import { base, contact, metalFx, photoBand, recolour, ring } from './themed-kit';
import { themed } from './crafted';

export const CURRENT = themed('clockwork');
const STAGE = { thickness: 0.2 };
const gears = (color: string, stops: string[], o: { count?: number; teeth?: number } = {}): Layer => ({ ...gearsLayer(), name: 'Gears', count: o.count ?? 8, at: 0.5, size: 1.12, teeth: o.teeth ?? 12, spokes: 4, hub: 0.3, altSize: 0.7, interlock: true, color, effects: [...metalFx(stops, 0.15, 0.8), contact(0.6)] });
const rivets = (fill: string, stops: string[]): Layer[] => [0.05, 0.95].map((at) => ring('Rivets', 'bead', 32, fill, [...metalFx(stops, 0.6, 0.8), contact(0.5)], { at, size: 0.08 } as never));

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-brass-gears', name: 'A · Brass clockwork',
    pitch: 'Dark plate shaded with gradients, meshing polished brass gears and rows of rivets.',
    stage: STAGE,
    colours: [slot('plate', 'Plate colour', '#2a2014', ['Band']), slot('brass', 'Brass colour', '#c8952e', ['Gears', 'Rivets'])],
    layers: () => [...base({ light: '#4a3a24', dark: '#0a0602', step: null }), gears('#c8952e', WARM_GOLD), ...rivets('#c8952e', WARM_GOLD)],
  },
  {
    id: 'b-copper-steel', name: 'B · Copper & steel',
    pitch: 'Copper gears meshing with steel ones over dark iron.',
    stage: STAGE,
    colours: [slot('plate', 'Plate colour', '#2a2c32', ['Band'])],
    layers: () => [...base({ light: '#4a4e58', dark: '#040506', step: null }), gears('#c06a3a', ['#1e0a04', '#6a3014', '#c06a3a', '#f0b08a', '#fff0e0'], { count: 8 }), { ...gears('#a8b0ba', STEEL_STOPS, { count: 8 }), offset: 0.5, size: 0.6 } as Layer],
  },
  {
    id: 'c-watchwork', name: 'C · Silver watchwork',
    pitch: 'The inside of a silver pocket watch: fine silver gears and ruby jewel bearings.',
    stage: STAGE,
    colours: [slot('metal', 'Metal colour', '#c8ccd4', ['Band', 'Gears']), slot('gems', 'Jewel colour', '#c0203a', ['Jewels'])],
    layers: () => [...photoBand('Band', 'hammered-metal', SILVER_STOPS, { step: null }), gears('#d8dce4', SILVER_STOPS, { count: 14, teeth: 16 }), ring('Jewels', 'gem', 8, '#c0203a', [contact(0.5)], { size: 0.22, offset: 0.5 } as never)],
  },
  {
    id: 'd-steampunk', name: 'D · Steampunk',
    pitch: 'Brown leather strapped round brass gears and a steel chain.',
    stage: STAGE,
    colours: [slot('leather', 'Leather colour', '#5a3420', ['Band']), slot('brass', 'Brass colour', '#b5813a', ['Gears'])],
    layers: () => [
      ...photoBand('Band', 'leather', ['#0a0402', '#2a160a', '#5a3420', '#8a6040', '#b89070'], { step: null }),
      gears('#b5813a', BRONZE_STOPS, { count: 6 }),
      { ...chainLayer(), name: 'Chain', at: 0.85, linkLength: 0.3, linkWidth: 0.4, thickness: 0.05, color: '#a8b0ba', effects: [...metalFx(STEEL_STOPS, 0.5, 0.8), contact(0.6)] },
    ],
  },
];
export { recolour };
