// Royal inscription (Frame Studio's Layered starting designs): candidates.
import { bandFillLayer, base, bevel, contact, contoursLayer, goldFx, inscription, metalFx, photo, recolour, repeatLayer, SILVER_STOPS, slot, WARM_GOLD, type Candidate, type Layer } from './common';
import { layered } from './crafted';

export const CURRENT = layered('royal-inscription');
const engraved = () => bevel({ direction: 'sunken', size: 0.5, gloss: 0.4 });
const lines = (color: string): Layer => ({ ...contoursLayer(), name: 'Contour lines', count: 2, from: 0.06, spacing: 0.88, width: 0.03, taper: 0, paint: { kind: 'solid', color }, effects: [engraved()] });
const gems = (fill: string, setting: string, stops: string[], count = 10): Layer => ({ ...repeatLayer(), name: 'Gems', element: 'gem', count, snapToCorners: false, at: 0.74, size: 0.4, fill, raised: false, gemFacets: 10, gemSparkle: 0.8, setting: 'claws4', settingColor: setting, settingEffects: metalFx(stops, 0.3, 0.9), effects: [contact(0.6)] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-royal-gold',
    name: 'A · Royal gold',
    pitch: 'Gold in the twin gradient bands, an Outer Rim AF inscription engraved round the top, fine contour lines and rubies in claws.',
    stage: { thickness: 0.18 },
    colours: [slot('gold', 'Gold colour', '#c8952e', ['Band', 'Pressed-in step']), slot('gems', 'Gem colour', '#b0182a', ['Gems'])],
    layers: () => [...base({ light: '#f4d27a', dark: '#3a2006', step: 0.55 }), lines('#5a3a10'), inscription('outerRim', '#5a3a10', { name: 'Inscription', at: 0.28, size: 0.32, start: 13, effects: [engraved()] }), gems('#b0182a', '#d8a838', WARM_GOLD)],
  },
  {
    id: 'b-crimson-gold',
    name: 'B · Crimson & gold',
    pitch: 'Crimson enamel with a raised gold inscription and gold edges.',
    stage: { thickness: 0.18 },
    colours: [slot('enamel', 'Enamel colour', '#8a1020', ['Band', 'Pressed-in step']), slot('gold', 'Gold colour', '#c8952e', ['Inscription', 'Gold edges'])],
    layers: () => [
      ...base({ light: '#c02a3a', dark: '#1a0206', step: null }),
      ...[0.04, 0.96].map((at) => ({ ...lines('#d8a838'), name: 'Gold edges', count: 1, from: at, width: 0.07, effects: goldFx(0.4, WARM_GOLD) })),
      inscription('outerRim', '#f4d27a', { name: 'Inscription', at: 0.5, size: 0.4, start: 14, effects: goldFx(0.4, WARM_GOLD) }),
    ],
  },
  {
    id: 'c-silver-sapphire',
    name: 'C · Silver & sapphire',
    pitch: 'Silver with an engraved Yugurian inscription and sapphires in silver claws.',
    stage: { thickness: 0.18 },
    colours: [slot('metal', 'Metal colour', '#a8aeb8', ['Band', 'Pressed-in step']), slot('gems', 'Gem colour', '#1f4fd0', ['Gems'])],
    layers: () => [...base({ light: '#e8ecf0', dark: '#2a2e36', step: 0.55 }), lines('#3a3e46'), inscription('yugurian', '#3a3e46', { name: 'Inscription', at: 0.28, size: 0.32, start: 15, effects: [engraved()] }), gems('#1f4fd0', '#d8dce4', SILVER_STOPS)],
  },
  {
    id: 'd-royal-velvet',
    name: 'D · Royal velvet',
    pitch: 'Purple velvet with a gold inscription embroidered round it, between gold piping.',
    stage: { thickness: 0.18 },
    colours: [slot('velvet', 'Velvet colour', '#4a1a6a', ['Velvet']), slot('gold', 'Gold colour', '#c8952e', ['Inscription', 'Gold piping'])],
    layers: () => [
      ...base({ light: '#6a2a8a', dark: '#0e0214', step: null }).map((l) => (l.name === 'Band' ? { ...l, name: 'Velvet' } : l)),
      { ...bandFillLayer(), name: 'Velvet', paint: photo('jacquard', 1.2), opacity: 0.5, blend: 'overlay', effects: [recolour(['#0e0214', '#2a0a3a', '#4a1a6a', '#8a5aaa', '#c8a0e0'])] },
      ...[0.06, 0.94].map((at) => ({ ...lines('#d8a838'), name: 'Gold piping', count: 1, from: at, width: 0.06, effects: goldFx(0.5, WARM_GOLD) })),
      inscription('outerRim', '#f4d27a', { name: 'Inscription', at: 0.5, size: 0.38, start: 16, effects: goldFx(0.3, WARM_GOLD) }),
    ],
  },
];
