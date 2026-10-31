// Jewelled (Frame Studio's Layered starting designs): candidates.
import { base, contact, glow, growthLayer, lineLayer, metalFx, repeatLayer, SILVER_STOPS, slot, textureLayer, WARM_GOLD, type Candidate, type Layer } from './common';
import { layered } from './crafted';

export const CURRENT = layered('jewelled');
const gems = (fill: string, alt: string[], setting: string, settingStops: string[], o: { count?: number; at?: number; size?: number; glowColor?: string } = {}): Layer => ({
  ...repeatLayer(), name: 'Gems', element: 'gem', count: o.count ?? 12, snapToCorners: false, at: o.at ?? 0.5, size: o.size ?? 0.5, fill, altColors: alt, altSizes: [1, 0.75], raised: false,
  gemFacets: 10, gemSparkle: 0.7, setting: 'claws4', settingColor: setting, settingEffects: metalFx(settingStops, 0.3, 0.9),
  effects: [contact(0.7), ...(o.glowColor ? [glow({ color: o.glowColor, opacity: 0.5, size: 0.08 })] : [])],
});
/** One cut stone repeated round the band, in its own setting. */
const stone = (fill: string, o: { count?: number; at?: number; size?: number; offset?: number; stretch?: number; cut?: 'brilliant' | 'rose' | 'emerald'; setting?: 'claws4' | 'claws6' | 'bezel'; settingColor?: string; settingStops?: string[] } = {}): Layer => ({
  ...repeatLayer(), name: 'Gems', element: 'gem', count: o.count ?? 12, snapToCorners: false, at: o.at ?? 0.5, size: o.size ?? 0.5, offset: o.offset ?? 0, stretch: o.stretch ?? 1, fill, raised: false,
  gemCut: o.cut ?? 'brilliant', gemFacets: 10, gemSparkle: 0.8, setting: o.setting ?? 'claws4', settingColor: o.settingColor ?? '#e4e8f0', settingEffects: metalFx(o.settingStops ?? SILVER_STOPS, 0.3, 0.9), effects: [contact(0.6)],
});
/** A halo of small stones round each of `count` centres (the centre stones go on top). */
const halo = (count: number, fill: string): Layer[] =>
  [[0.14, [-0.06, 0, 0.06]], [0.86, [-0.06, 0, 0.06]], [0.5, [-0.1, 0.1]], [0.3, [-0.09, 0.09]], [0.7, [-0.09, 0.09]]].flatMap(([at, offs]) =>
    (offs as number[]).map((off) => ({ ...stone(fill, { count, at: at as number, size: 0.24, offset: (1 + off) % 1, setting: 'bezel' }), name: 'Halo' })));
const vine = (color: string, leaf: string): Layer => ({ ...growthLayer('vine'), name: 'Vine', count: 1, thickness: 0.035, amplitude: 0.22, waveLength: 1.6, extra: 'leaves', extraSize: 0.3, color, extraColor: leaf, effects: metalFx(SILVER_STOPS, 0.4, 0.8) });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-silver-gems',
    name: 'A · Silver & jewels',
    pitch: 'Silver in the twin gradient bands with a silver vine and rubies and sapphires in claw settings.',
    colours: [slot('metal', 'Metal colour', '#a8aeb8', ['Band', 'Pressed-in step', 'Vine']), slot('gems', 'Gem colour', '#c0182a', ['Gems'])],
    layers: () => [...base({ light: '#e8ecf0', dark: '#2a2e36', step: 0.6 }), vine('#c8ccd4', '#e8ecf0'), gems('#c0182a', ['#1f4fd0'], '#d8dce4', SILVER_STOPS)],
  },
  {
    id: 'b-gold-emerald',
    name: 'B · Gold & emerald',
    pitch: 'Warm gold with a row of emeralds in gold claws.',
    colours: [slot('metal', 'Metal colour', '#c8952e', ['Band', 'Pressed-in step']), slot('gems', 'Gem colour', '#0f9a5a', ['Gems'])],
    layers: () => [...base({ light: '#f4d27a', dark: '#3a2006', step: 0.6 }), gems('#0f9a5a', [], '#d8a838', WARM_GOLD, { count: 10, size: 0.55 })],
  },
  {
    id: 'c-jewelled-filigree',
    name: 'C · Jewelled filigree',
    pitch: 'Silver chased with filigree, set with small amethysts and pearls.',
    colours: [slot('metal', 'Metal colour', '#a8aeb8', ['Band', 'Pressed-in step', 'Filigree']), slot('gems', 'Gem colour', '#8a3ac0', ['Gems'])],
    layers: () => [
      ...base({ light: '#e8ecf0', dark: '#2a2e36', step: 0.6 }),
      { ...textureLayer('filigree'), name: 'Filigree', color: '#5a606a', amount: 0.8, scale: 1.4, strength: 1.1, seed: 0xf13, blend: 'multiply' },
      gems('#8a3ac0', ['#f0ece4'], '#d8dce4', SILVER_STOPS, { count: 16, size: 0.4 }),
    ],
  },
  {
    id: 'd-midnight-jewels',
    name: 'D · Midnight jewels',
    pitch: 'Midnight-blue enamel with glowing jewels in silver settings.',
    stage: { bloom: 0.2 },
    colours: [slot('enamel', 'Enamel colour', '#141a4a', ['Band', 'Pressed-in step']), slot('gems', 'Gem colour', '#4ac8ff', ['Gems'])],
    layers: () => [...base({ light: '#2a3480', dark: '#02030e', step: 0.6 }), gems('#4ac8ff', ['#c06aff'], '#d8dce4', SILVER_STOPS, { glowColor: '#8ad0ff' })],
  },
  // Round 2: denser clusters, after real jewellery.
  {
    id: 'e-pave',
    name: 'E · Pavé band',
    pitch: 'Platinum paved with three staggered rows of tiny diamonds, like a pavé wedding band.',
    colours: [slot('metal', 'Metal colour', '#c8ccd4', ['Band', 'Pressed-in step']), slot('gems', 'Stone colour', '#f4f8ff', ['Gems'])],
    layers: () => [
      ...base({ light: '#f0f2f6', dark: '#3a3e46', step: null }),
      ...[0.25, 0.5, 0.75].map((at, r) => stone('#f4f8ff', { count: 56, at, size: 0.24, offset: r % 2 ? 0.5 : 0, setting: 'bezel' })),
    ],
  },
  {
    id: 'f-halo',
    name: 'F · Halo clusters',
    pitch: 'Six big sapphires, each ringed by a halo of small diamonds, on white gold, like cluster rings.',
    colours: [slot('metal', 'Metal colour', '#d8dce4', ['Band', 'Pressed-in step']), slot('gems', 'Centre stone colour', '#1f4fd0', ['Centre stones'])],
    layers: () => [
      ...base({ light: '#f0f2f6', dark: '#3a3e46', step: null }),
      ...halo(6, '#f4f8ff'),
      { ...stone('#1f4fd0', { count: 6, at: 0.5, size: 0.5, setting: 'claws6' }), name: 'Centre stones' },
    ],
  },
  {
    id: 'g-art-deco',
    name: 'G · Art deco',
    pitch: 'Step-cut emeralds between pairs of baguette diamonds, set in platinum with black onyx enamel.',
    colours: [slot('enamel', 'Enamel colour', '#14141a', ['Band', 'Pressed-in step']), slot('gems', 'Gem colour', '#0f9a5a', ['Emeralds'])],
    layers: () => [
      ...base({ light: '#3a3a44', dark: '#020204', step: null }),
      { ...lineLayer(), name: 'Platinum edges', at: 0.06, width: 0.1, paint: { kind: 'solid', color: '#d8dce4' }, effects: metalFx(SILVER_STOPS, 0.4, 0.9) },
      { ...lineLayer(), name: 'Platinum edges', at: 0.94, width: 0.1, paint: { kind: 'solid', color: '#d8dce4' }, effects: metalFx(SILVER_STOPS, 0.4, 0.9) },
      { ...stone('#f4f8ff', { count: 24, at: 0.5, size: 0.44, stretch: 0.35, cut: 'emerald', setting: 'bezel' }), name: 'Baguettes' },
      { ...stone('#0f9a5a', { count: 8, at: 0.5, size: 0.62, stretch: 0.8, cut: 'emerald', setting: 'claws4' }), name: 'Emeralds' },
    ],
  },
  {
    id: 'h-garnet-cluster',
    name: 'H · Victorian garnets',
    pitch: 'Dense clusters of rose-cut garnets on yellow gold, like a Victorian garnet brooch.',
    colours: [slot('metal', 'Metal colour', '#c8952e', ['Band', 'Pressed-in step']), slot('gems', 'Garnet colour', '#8a0a1a', ['Garnets'])],
    layers: () => [
      ...base({ light: '#f4d27a', dark: '#3a2006', step: null }),
      ...[0.28, 0.5, 0.72].map((at, r) => ({ ...stone('#8a0a1a', { count: 40, at, size: r === 1 ? 0.4 : 0.3, offset: r % 2 ? 0.5 : 0, cut: 'rose', setting: 'bezel', settingColor: '#d8a838', settingStops: WARM_GOLD }), name: 'Garnets' })),
    ],
  },
  {
    id: 'i-eternity',
    name: 'I · Eternity band',
    pitch: 'An unbroken row of large brilliant-cut diamonds in white-gold claws, all the way round.',
    stage: { bloom: 0.1 },
    colours: [slot('metal', 'Metal colour', '#d8dce4', ['Band', 'Pressed-in step']), slot('gems', 'Stone colour', '#f4f8ff', ['Gems'])],
    layers: () => [...base({ light: '#f0f2f6', dark: '#3a3e46', step: null }), stone('#f4f8ff', { count: 30, at: 0.5, size: 0.82, setting: 'claws4' })],
  },
];

// The jewellery designs need a wider band to show their stones.
for (const c of CANDIDATES.slice(4)) c.stage = { thickness: 0.2, ...c.stage };
