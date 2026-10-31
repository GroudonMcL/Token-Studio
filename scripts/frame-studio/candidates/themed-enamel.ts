// Enamelled gold (Frame Studio's Themed starting designs): candidates.
import { bandFillLayer, bevel, contact, DROP, glow, lin, lineLayer, metalFx, recolour, repeatLayer, ROSE_STOPS, SILVER_STOPS, slot, WARM_GOLD, type Candidate, type Layer } from './common';
import { themed } from './crafted';

export const CURRENT = themed('enamel-gold');
const STAGE = { thickness: 0.18 };
/** Gold (or another metal) either side of an enamel channel, each shaded with its own gradient. */
const metalBands = (stops: string[]): Layer[] => [
  { ...bandFillLayer(), name: 'Metal', to: 0.28, paint: lin(['#ffffff', '#505050']), effects: [recolour(stops), DROP] },
  { ...bandFillLayer(), name: 'Metal', from: 0.72, paint: lin(['#404040', '#f0f0f0']), effects: [recolour(stops), DROP] },
];
const enamel = (light: string, dark: string, glowColor: string): Layer[] => [
  { ...bandFillLayer(), name: 'Enamel', from: 0.26, to: 0.74, paint: lin([dark, light]), effects: [glow({ inner: true, color: glowColor, opacity: 0.25, size: 0.1 })] },
  { ...lineLayer(), name: 'Enamel edge', at: 0.27, width: 0.03, paint: { kind: 'solid', color: '#000000' }, opacity: 0.4, blend: 'multiply' },
];
const beading = (fill: string, stops: string[]): Layer[] => [0.13, 0.87].map((at) => ({ ...repeatLayer(), name: 'Beading', element: 'bead' as const, mode: 'spacing' as const, spacing: 0.28, snapToCorners: false, at, size: 0.14, fill, raised: false, effects: [...metalFx(stops, 0.6, 0.9)] }));
const stones = (fill: string, setting: string, stops: string[], cut: 'brilliant' | 'cabochon' = 'brilliant', count = 4): Layer => ({ ...repeatLayer(), name: 'Stones', element: 'gem', count, snapToCorners: false, at: 0.5, size: 0.85, fill, raised: false, gemCut: cut, gemFacets: 10, gemSparkle: 0.8, setting: 'claws4', settingColor: setting, settingEffects: metalFx(stops, 0.3, 0.9), effects: [contact(0.7)] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-sapphire-enamel',
    name: 'A · Sapphire enamel',
    pitch: 'Warm gold shaded with gradients, a glossy blue enamel channel, gold beading and four sapphires in claws.',
    stage: STAGE,
    colours: [slot('gold', 'Metal colour', '#c8952e', ['Metal', 'Beading']), slot('enamel', 'Enamel colour', '#1d3f8f', ['Enamel']), slot('gems', 'Stone colour', '#2a5ad0', ['Stones'])],
    layers: () => [...metalBands(WARM_GOLD), ...enamel('#3a6ad0', '#081a48', '#7aa8ff'), ...beading('#e8c060', WARM_GOLD), stones('#2a5ad0', '#d8a838', WARM_GOLD)],
  },
  {
    id: 'b-ruby-cloisonne',
    name: 'B · Ruby cloisonné',
    pitch: 'Red enamel divided by fine gold wires into cells, with cabochon rubies.',
    stage: STAGE,
    colours: [slot('gold', 'Metal colour', '#c8952e', ['Metal', 'Wires']), slot('enamel', 'Enamel colour', '#a01828', ['Enamel']), slot('gems', 'Stone colour', '#c0102a', ['Stones'])],
    layers: () => [
      ...metalBands(WARM_GOLD),
      ...enamel('#d83040', '#3a0408', '#ff7a8a'),
      { ...repeatLayer(), name: 'Wires', element: 'tick', count: 32, snapToCorners: false, at: 0.5, size: 0.5, stretch: 0.08, fill: '#e8c060', raised: false, effects: metalFx(WARM_GOLD, 0.6, 0.9) },
      stones('#c0102a', '#d8a838', WARM_GOLD, 'cabochon', 8),
    ],
  },
  {
    id: 'c-silver-emerald',
    name: 'C · Silver & green enamel',
    pitch: 'Silver with an emerald-green enamel channel and emeralds in silver claws.',
    stage: STAGE,
    colours: [slot('metal', 'Metal colour', '#a8aeb8', ['Metal', 'Beading']), slot('enamel', 'Enamel colour', '#0f6a4a', ['Enamel']), slot('gems', 'Stone colour', '#0f9a5a', ['Stones'])],
    layers: () => [...metalBands(SILVER_STOPS), ...enamel('#2aa878', '#02200e', '#7affc0'), ...beading('#e4e8f0', SILVER_STOPS), stones('#0f9a5a', '#d8dce4', SILVER_STOPS)],
  },
  {
    id: 'd-rose-gold-pearl',
    name: 'D · Rose gold & white enamel',
    pitch: 'Rose gold round a pearly white enamel channel, with pink sapphires.',
    stage: STAGE,
    colours: [slot('metal', 'Metal colour', '#d8907a', ['Metal', 'Beading']), slot('enamel', 'Enamel colour', '#f0ece4', ['Enamel']), slot('gems', 'Stone colour', '#e0608a', ['Stones'])],
    layers: () => [...metalBands(ROSE_STOPS), ...enamel('#ffffff', '#b8b0a8', '#ffffff'), ...beading('#f0b8a0', ROSE_STOPS), stones('#e0608a', '#e8b0a0', ROSE_STOPS)],
  },
];
export { bevel };
