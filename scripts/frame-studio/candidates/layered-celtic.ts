// Celtic knots (Frame Studio's Layered starting designs): candidates.
import { bandFillLayer, bandShading, base, BRONZE_STOPS, contact, DROP, goldFx, knotworkLayer, lineLayer, metalFx, photo, recolour, repeatLayer, SILVER_STOPS, slot, WARM_GOLD, type Candidate, type Layer } from './common';
import { layered } from './crafted';

export const CURRENT = layered('celtic');
const STAGE = { thickness: 0.18 };
const knot = (color: string, stops: string[], o: { at?: number; width?: number } = {}): Layer => ({ ...knotworkLayer(), name: 'Knotwork', at: o.at ?? 0.55, width: o.width ?? 0.16, amplitude: 0.22, waveLength: 0.8, color, outline: '#000000', outlineWidth: 0.03, outlineOpacity: 0.6, shine: true, effects: [recolour(stops), contact(0.6)] });
const battlements = (color: string, stops: string[]): Layer => ({ ...lineLayer(), name: 'Battlements', at: 0.1, width: 0.05, paint: { kind: 'solid', color }, waveAmplitude: 0.05, waveFit: 0.3, waveShape: 'square', effects: [...metalFx(stops, 0.4, 0.8), contact(0.5)] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-emerald-gold',
    name: 'A · Emerald & gold',
    pitch: 'Deep green in the twin gradient bands with a woven gold knot and a gold battlement edge.',
    stage: STAGE,
    colours: [slot('band', 'Band colour', '#2f6a3c', ['Band', 'Pressed-in step']), slot('gold', 'Gold colour', '#d8a838', ['Knotwork', 'Battlements'])],
    layers: () => [...base({ light: '#3e8a4e', dark: '#041408', step: 0.3 }), battlements('#d8a838', WARM_GOLD), knot('#d8a838', WARM_GOLD)],
  },
  {
    id: 'b-silver-blue',
    name: 'B · Silver & blue',
    pitch: 'A silver knot woven through deep blue, with silver battlements.',
    stage: STAGE,
    colours: [slot('band', 'Band colour', '#1a3a7a', ['Band', 'Pressed-in step']), slot('silver', 'Silver colour', '#d8dce4', ['Knotwork', 'Battlements'])],
    layers: () => [...base({ light: '#2a5ab0', dark: '#030a1e', step: 0.3 }), battlements('#d8dce4', SILVER_STOPS), knot('#d8dce4', SILVER_STOPS)],
  },
  {
    id: 'c-triquetra',
    name: 'C · Triquetra',
    pitch: 'Green and gold with a gold triquetra at each quarter, joined by a slim woven knot.',
    stage: STAGE,
    colours: [slot('band', 'Band colour', '#2f6a3c', ['Band', 'Pressed-in step']), slot('gold', 'Gold colour', '#d8a838', ['Knotwork', 'Triquetras'])],
    layers: () => [
      ...base({ light: '#3e8a4e', dark: '#041408', step: null }),
      knot('#d8a838', WARM_GOLD, { at: 0.5, width: 0.1 }),
      { ...repeatLayer(), name: 'Triquetras', element: 'icon-triquetra', count: 4, snapToCorners: false, at: 0.5, size: 0.85, fill: '#d8a838', raised: false, effects: [...goldFx(0.4, WARM_GOLD), contact(0.7)] },
    ],
  },
  {
    id: 'd-stone-bronze',
    name: 'D · Carved stone',
    pitch: 'A grey granite ring with a bronze knot set into it, like an old Celtic cross.',
    stage: STAGE,
    colours: [slot('stone', 'Stone colour', '#8a8680', ['Granite']), slot('bronze', 'Knot colour', '#a87a3a', ['Knotwork'])],
    layers: () => [
      ...bandShading([{ ...bandFillLayer(), name: 'Granite', paint: photo('granite', 1.4), effects: [DROP] }]),
      knot('#a87a3a', BRONZE_STOPS, { at: 0.5 }),
    ],
  },
];
