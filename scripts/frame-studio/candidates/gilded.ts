// Gilded: candidates for new versions of Token Maker's Gilded frame.
import {
  bandFillLayer, base, bevel, contact, DROP, glow, goldFx, WARM_GOLD, goldPaint, lin, lineLayer, metalFx, photo,
  projectFromFrame, recolour, repeatLayer, rims, slot, textureLayer, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('gilded');

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-rich-gold',
    name: 'A · Rich gold',
    pitch: 'Your gold from Gold and red marble across the whole band, with a pressed-in step and a row of gold beads in the crease.',
    colours: [slot('gold', 'Gold colour', '#c8952e', ['Gold', 'Pressed-in gold', 'Beads'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Gold', paint: goldPaint(2.4), effects: [...goldFx(0.3, WARM_GOLD), DROP] },
      { ...bandFillLayer(), name: 'Pressed-in gold', from: 0.55, to: 1, paint: goldPaint(3), effects: [bevel({ direction: 'sunken', size: 0.25, gloss: 0.6, soften: 0.02 }), recolour(WARM_GOLD)] },
      { ...repeatLayer(), name: 'Beads', element: 'bead', mode: 'spacing', spacing: 0.38, snapToCorners: false, at: 0.55, size: 0.2, fill: '#c8952e', raised: true, effects: [recolour(WARM_GOLD), contact(0.5)] },
    ],
  },
  {
    id: 'b-jewelled',
    name: 'B · Jewelled gold',
    pitch: 'Rich gold with four cut gems in claw settings at the quarters.',
    colours: [slot('gold', 'Gold colour', '#c8952e', ['Gold']), slot('gems', 'Gem colour', '#c0203a', ['Gems'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Gold', paint: goldPaint(2.4), effects: [...goldFx(0.35, WARM_GOLD), DROP] },
      { ...lineLayer(), name: 'Groove', at: 0.5, width: 0.06, paint: lin(['#000000', '#000000']), opacity: 0.35, blend: 'multiply', effects: [bevel({ direction: 'sunken', size: 0.6, gloss: 0.3 })] },
      { ...repeatLayer(), name: 'Gems', element: 'gem', count: 4, at: 0.5, size: 1.35, fill: '#c0203a', raised: false, gemSparkle: 0.7, setting: 'claws4', settingEffects: [recolour(WARM_GOLD)], effects: [contact(0.6)] },
    ],
  },
  {
    id: 'c-filigree',
    name: 'C · Filigree',
    pitch: 'Gold chased with scrolling filigree, between bright lit rims. Ornate but still clean at token size.',
    colours: [slot('gold', 'Gold colour', '#c8952e', ['Gold', 'Filigree'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Gold', paint: goldPaint(2.4), effects: [...goldFx(0.3, WARM_GOLD), DROP] },
      { ...textureLayer('filigree'), name: 'Filigree', color: '#5a4416', from: 0.12, to: 0.88, opacity: 0.8, blend: 'multiply', seed: 0xf111 },
      { ...lineLayer(), name: 'Outer bead line', at: 0.08, width: 0.05, paint: lin(['#fffcf2', '#8a7444']), effects: [bevel({ size: 0.6, gloss: 0.8 })] },
      { ...lineLayer(), name: 'Inner bead line', at: 0.92, width: 0.05, paint: lin(['#fffcf2', '#8a7444']), effects: [bevel({ size: 0.6, gloss: 0.8 })] },
    ],
  },
  {
    id: 'd-lacquer',
    name: 'D · Gold on lacquer',
    pitch: 'Glossy black lacquer with fine gold lines and a dusting of gold leaf. Elegant and dark.',
    colours: [slot('lacquer', 'Lacquer colour', '#1a1a20', ['Band']), slot('gold', 'Gold colour', '#e0c070', ['Gold lines', 'Gold leaf'])],
    layers: () => [
      ...base({ light: '#4a4a58', dark: '#050508', step: null, rims: false }),
      { ...textureLayer('sparkle'), name: 'Gold leaf', color: '#e0c070', amount: 1.1, scale: 0.6, seed: 0x901d },
      { ...lineLayer(), name: 'Gold lines', at: 0.14, width: 0.08, paint: lin(['#fff0c0', '#e0c070', '#6a5020']), effects: [bevel({ size: 0.6, gloss: 0.9 }), contact(0.4)] },
      { ...lineLayer(), name: 'Gold lines', at: 0.86, width: 0.08, paint: lin(['#fff0c0', '#e0c070', '#6a5020']), effects: [bevel({ size: 0.6, gloss: 0.9 }), contact(0.4)] },
      ...rims(),
    ],
  },
  {
    id: 'e-rose-gold',
    name: 'E · Rose gold',
    pitch: 'Smooth polished rose gold with a soft sheen and a pressed-in step. Minimal and modern.',
    stage: { bloom: 0.1 },
    colours: [slot('metal', 'Metal colour', '#d8907a', ['Metal', 'Pressed-in metal'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Metal', paint: photo('hammered-metal', 3, { lighting: 0.5 }), effects: [...metalFx(['#2a0e08', '#7a3a2a', '#c87a62', '#f0c0a8', '#fff0e8'], 0.4, 0.9), DROP] },
      { ...bandFillLayer(), name: 'Pressed-in metal', from: 0.55, to: 1, paint: lin(['#3a1a14', '#f6d0c0']), opacity: 0.55, blend: 'soft-light' },
      { ...lineLayer(), name: 'Sheen', at: 0.3, width: 0.04, paint: { kind: 'solid', color: '#fff4ee' }, opacity: 0.5, blend: 'screen', effects: [glow({ color: '#ffd8c8', opacity: 0.5, size: 0.08 })] },
      ...rims(),
    ],
  },
];
