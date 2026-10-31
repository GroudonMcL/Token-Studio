// Dwarven bronze (Frame Studio's Layered starting designs): candidates.
import { bandFillLayer, bandShading, BRONZE_STOPS, contact, DROP, glow, glowCracks, goldFx, inscription, lin, metalFx, photo, recolour, repeatLayer, slot, STEEL_STOPS, WARM_GOLD, bevel, type Candidate, type Layer } from './common';
import { layered } from './crafted';

export const CURRENT = layered('dwarven-bronze');
const band = (name: string, stops: string[], picture: 'hammered-metal' | 'granite' = 'hammered-metal'): Layer =>
  ({ ...bandFillLayer(), name, paint: photo(picture, 1.4, { lighting: 0.3 }), effects: [recolour(stops), DROP] });
const plates = (fill: string, stops: string[]): Layer => ({ ...repeatLayer(), name: 'Plates', element: 'plate', count: 8, snapToCorners: false, at: 0.5, size: 0.62, fill, raised: false, effects: [...metalFx(stops, 0.2, 0.7), contact(0.7)] });
const rivets = (fill: string, stops: string[]): Layer[] => [0.17, 0.83].map((at) => ({ ...repeatLayer(), name: 'Rivets', element: 'bead' as const, count: 8, offset: 0.5, snapToCorners: false, at, size: 0.12, fill, raised: true, effects: [...metalFx(stops, 0.6, 0.8), contact(0.6)] }));
const runes = (fill: string, effects: Layer['effects'], font: 'yugurian' | 'babelstone' = 'yugurian') => inscription(font, fill, { name: 'Runes', at: 0.5, size: 0.3, start: 10, effects });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-forge-bronze',
    name: 'A · Forged bronze',
    pitch: 'Hammered bronze in the twin gradient bands, faceted bronze plates, Yugurian runes engraved between them, and rivets.',
    colours: [slot('bronze', 'Bronze colour', '#a87a3a', ['Bronze band', 'Plates', 'Rivets'])],
    layers: () => [...bandShading([band('Bronze band', BRONZE_STOPS)]), runes('#3a2208', [bevel({ direction: 'sunken', size: 0.5, gloss: 0.4 })]), plates('#a87a3a', BRONZE_STOPS), ...rivets('#d8a858', BRONZE_STOPS)],
  },
  {
    id: 'b-gold-runes',
    name: 'B · Glowing forge runes',
    pitch: 'Dark bronze with the runes glowing forge-gold and cracks of fire between the plates.',
    stage: { bloom: 0.25 },
    colours: [slot('bronze', 'Bronze colour', '#7a5428', ['Bronze band', 'Plates']), slot('glow', 'Glow colour', '#ffb03a', ['Runes', 'Glowing cracks'])],
    layers: () => [
      ...bandShading([band('Bronze band', ['#0a0602', '#2a1a0a', '#7a5428', '#b08a58', '#e0c090'])]),
      glowCracks('#1a0a04', '#ff9a3a', '#ffc070', 5, 0.6),
      runes('#ffe0a0', [glow({ color: '#ffb03a', opacity: 0.9, size: 0.1 })]),
      plates('#7a5428', ['#0a0602', '#2a1a0a', '#7a5428', '#b08a58', '#e0c090']),
    ],
  },
  {
    id: 'c-steel-gold',
    name: 'C · Steel & gold',
    pitch: 'Dwarven steel with gold plates and gold rivets.',
    colours: [slot('steel', 'Steel colour', '#5a606a', ['Bronze band']), slot('gold', 'Gold colour', '#d8a838', ['Plates', 'Rivets', 'Runes'])],
    layers: () => [
      ...bandShading([band('Bronze band', ['#040506', '#16191e', '#5a606a', '#9aa0aa', '#d8dce4'])]),
      runes('#f4d27a', [...goldFx(0.4, WARM_GOLD)]),
      plates('#d8a838', WARM_GOLD),
      ...rivets('#d8a838', WARM_GOLD),
    ],
  },
  {
    id: 'd-stone-bronze',
    name: 'D · Stone & bronze',
    pitch: 'A grey granite ring held by bronze plates and rivets, with BabelStone runes carved in.',
    colours: [slot('stone', 'Stone colour', '#8a8680', ['Bronze band']), slot('bronze', 'Bronze colour', '#a87a3a', ['Plates', 'Rivets'])],
    layers: () => [
      ...bandShading([band('Bronze band', ['#14130f', '#4a4842', '#8a8680', '#c8c4ba', '#f0ece2'], 'granite')]),
      runes('#3a3830', [bevel({ direction: 'sunken', size: 0.6, gloss: 0.2 })], 'babelstone'),
      plates('#a87a3a', BRONZE_STOPS),
      ...rivets('#d8a858', BRONZE_STOPS),
    ],
  },
];
export { lin, STEEL_STOPS };
