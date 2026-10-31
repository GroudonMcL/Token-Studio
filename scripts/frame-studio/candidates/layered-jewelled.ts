// Jewelled (Frame Studio's Layered starting designs): candidates.
import { base, contact, glow, growthLayer, metalFx, repeatLayer, SILVER_STOPS, slot, textureLayer, WARM_GOLD, type Candidate, type Layer } from './common';
import { layered } from './crafted';

export const CURRENT = layered('jewelled');
const gems = (fill: string, alt: string[], setting: string, settingStops: string[], o: { count?: number; at?: number; size?: number; glowColor?: string } = {}): Layer => ({
  ...repeatLayer(), name: 'Gems', element: 'gem', count: o.count ?? 12, snapToCorners: false, at: o.at ?? 0.5, size: o.size ?? 0.5, fill, altColors: alt, altSizes: [1, 0.75], raised: false,
  gemFacets: 10, gemSparkle: 0.7, setting: 'claws4', settingColor: setting, settingEffects: metalFx(settingStops, 0.3, 0.9),
  effects: [contact(0.7), ...(o.glowColor ? [glow({ color: o.glowColor, opacity: 0.5, size: 0.08 })] : [])],
});
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
];
