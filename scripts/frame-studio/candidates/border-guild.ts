// Guild ring (Frame Studio's Crafted borders): candidates.
import { bandFillLayer, bevel, BRONZE_STOPS, contact, DROP, inscription, lin, lineLayer, metalFx, recolour, repeatLayer, SILVER_STOPS, slot, WARM_GOLD, type Candidate, type Layer } from './common';
import { border } from './crafted';

export const CURRENT = border('guild-gold');
/** A metal band shaded with the twin gradients (lit band, reversed pressed-in step), cut into blocks. */
const guildBand = (stops: string[], groove: string, o: { blocks?: boolean } = {}): Layer[] => [
  { ...bandFillLayer(), name: 'Band', paint: lin(['#f8f8f8', '#404040']), effects: [recolour(stops), DROP] },
  { ...bandFillLayer(), name: 'Pressed-in step', from: 0.62, to: 1, paint: lin(['#303030', '#e8e8e8']), effects: [recolour(stops)] },
  { ...lineLayer(), name: 'Crease', at: 0.62, width: 0.04, opacity: 0.6, blend: 'multiply', paint: { kind: 'solid', color: groove } },
  ...(o.blocks === false ? [] : [{ ...repeatLayer(), name: 'Block lines', element: 'tick' as const, count: 36, snapToCorners: false, at: 0.31, size: 0.6, stretch: 0.1, rotation: 20, fill: groove, raised: false, shaded: false, opacity: 0.7, blend: 'multiply' as const }]),
  { ...lineLayer(), name: 'Outer rim (lit)', at: 0.02, width: 0.04, blend: 'overlay', paint: { kind: 'solid', color: '#ffffff' }, opacity: 0.7 },
];
const studs = (fill: string, stops: string[], size = 0.95): Layer => ({ ...repeatLayer(), name: 'Studs', element: 'triangle', count: 4, at: 0.5, size, stretch: 1.1, rotation: 180, fill, raised: false, effects: [bevel({ profile: 'chisel', size: 0.4, depth: 1.4, gloss: 0.8 }), recolour(stops), contact(0.6)] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-gold-guild',
    name: 'A · Gold guild ring',
    pitch: 'The gold guild ring shaded with the twin gradients instead of a bevel, its four arrow studs kept inside the band.',
    stage: { thickness: 0.15, outerSpacing: 0.02 },
    colours: [slot('metal', 'Metal colour', '#c8952e', ['Band', 'Pressed-in step', 'Studs'])],
    layers: () => [...guildBand(WARM_GOLD, '#4a2c08'), studs('#c8952e', WARM_GOLD)],
  },
  {
    id: 'b-silver-sapphire',
    name: 'B · Silver & sapphire',
    pitch: 'A silver guild ring with a cut sapphire set at each quarter instead of the arrow studs.',
    stage: { thickness: 0.15, outerSpacing: 0.02 },
    colours: [slot('metal', 'Metal colour', '#b8bcc4', ['Band', 'Pressed-in step']), slot('gems', 'Gem colour', '#1f4fd0', ['Gems'])],
    layers: () => [
      ...guildBand(SILVER_STOPS, '#2a2e36'),
      { ...repeatLayer(), name: 'Gems', element: 'gem', count: 4, at: 0.5, size: 0.8, fill: '#1f4fd0', raised: false, gemFacets: 10, gemSparkle: 0.8, setting: 'claws4', settingColor: '#d8dce4', settingEffects: [...metalFx(SILVER_STOPS, 0.3, 0.9)], effects: [contact(0.7)] },
    ],
  },
  {
    id: 'c-guild-seal',
    name: 'C · Guild seal',
    pitch: 'The guild’s name and motto engraved round the gold band in Outer Rim AF, with the four studs.',
    stage: { thickness: 0.17, outerSpacing: 0.02 },
    colours: [slot('metal', 'Metal colour', '#c8952e', ['Band', 'Pressed-in step', 'Studs']), slot('engraving', 'Engraving colour', '#3a2006', ['Motto'])],
    layers: () => [
      ...guildBand(WARM_GOLD, '#4a2c08', { blocks: false }),
      inscription('outerRim', '#3a2006', { name: 'Motto', at: 0.31, size: 0.4, start: 1, effects: [bevel({ direction: 'sunken', size: 0.5, gloss: 0.4 })] }),
      studs('#c8952e', WARM_GOLD, 0.8),
    ],
  },
  {
    id: 'd-bronze-enamel',
    name: 'D · Bronze & enamel',
    pitch: 'A bronze guild ring with a blue enamel step on the inside and bronze studs.',
    stage: { thickness: 0.15, outerSpacing: 0.02 },
    colours: [slot('metal', 'Metal colour', '#a87a3a', ['Band', 'Studs']), slot('enamel', 'Enamel colour', '#1a4a8a', ['Pressed-in step'])],
    layers: () => {
      const ls = guildBand(BRONZE_STOPS, '#2a1606');
      ls[1] = { ...bandFillLayer(), name: 'Pressed-in step', from: 0.62, to: 1, paint: lin(['#0a1a38', '#3a7ac8']) };
      return [...ls, studs('#a87a3a', BRONZE_STOPS)];
    },
  },
];
