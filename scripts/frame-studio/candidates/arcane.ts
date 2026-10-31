// Arcane: candidates for new versions of Token Maker's Arcane frame.
import {
  bandFillLayer, base, bevel, blur, contact, DROP, glow, glowCracks, glowLines, GOLD_STOPS, goldFx, goldPaint, lineLayer,
  overlay, photo, projectFromFrame, recolour, repeatLayer, slot, textLayer, textureLayer, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('arcane');
const SPELL = 'BY THE LIGHT OF THE FIRST STAR · LET WHAT IS HIDDEN BE SEEN · LET WHAT IS BOUND BE FREE · ';
const glowRunes = (fill: string, glowColor: string, at: number, size: number) => ({
  ...textLayer(),
  name: 'Glowing runes',
  font: 'runes' as const,
  text: SPELL.repeat(2),
  size,
  spacing: 0.22,
  at,
  fill,
  effects: [glow({ inner: true, color: '#ffffff', opacity: 0.5, size: 0.04 }), glow({ color: glowColor, opacity: 0.9, size: 0.16 })],
});

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-sigil-band',
    name: 'A · Sigil band',
    pitch: 'Arcane tidied into your style: a deep teal-blue band with the runes glowing cyan in the pressed-in step and a glowing seam.',
    stage: { bloom: 0.2 },
    colours: [slot('band', 'Frame colour', '#2a6a9a', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#6fc3ff', ['Glowing runes', 'Glowing seam'])],
    layers: () => [
      ...base({ light: '#2a6a9a', dark: '#04101c', step: 0.5 }),
      { ...lineLayer(), name: 'Glowing seam', at: 0.5, width: 0.025, paint: { kind: 'solid', color: '#d8f4ff' }, effects: [glow({ color: '#6fc3ff', opacity: 0.9, size: 0.12 })] },
      glowRunes('#e0f6ff', '#6fc3ff', 0.75, 0.4),
    ],
  },
  {
    id: 'b-magic-circle',
    name: 'B · Magic circle',
    pitch: 'A summoning circle: thin glowing rings with runes between them on a near-black band, with bloom.',
    stage: { bloom: 0.35, bleed: 0.15 },
    colours: [slot('band', 'Frame colour', '#141a2a', ['Band']), slot('glow', 'Glow colour', '#6fc3ff', ['Glowing lines', 'Glowing runes'])],
    layers: () => [
      ...base({ light: '#2a3048', dark: '#020308', step: null }),
      glowLines(['#e8f8ff', '#6fc3ff'], '#6fc3ff', { count: 3, from: 0.06, spacing: 0.44, width: 0.035, size: 0.12 }),
      glowRunes('#e8f8ff', '#6fc3ff', 0.28, 0.3),
      { ...glowRunes('#e8f8ff', '#6fc3ff', 0.72, 0.3), name: 'Glowing runes', reverse: true },
    ],
  },
  {
    id: 'c-crystal',
    name: 'C · Arcane crystal',
    pitch: 'Your glowing-ice treatment in arcane blue: cracked crystal lit from within, with soft glowing rings.',
    stage: { bloom: 0.3, bleed: 0.3 },
    colours: [slot('glow', 'Glow colour', '#4a8aff', ['Crystal', 'Tint', 'Glowing cracks', 'Glowing lines'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Crystal', paint: photo('ice', 9, { angle: -70 }), effects: [bevel({ profile: 'chisel', size: 0.45, depth: 1.8, gloss: 0.1, highlightOpacity: 0.4 }), DROP] },
      { ...bandFillLayer(), name: 'Tint', blend: 'overlay', paint: { kind: 'linear', angle: 45, followLight: false, stops: [{ at: 0, color: '#b0c8ff', opacity: 1 }, { at: 1, color: '#2a3ab5', opacity: 1 }] } },
      { ...glowCracks('#dbe0ff', '#4a8aff', '#4a8aff'), opacity: 0.45 },
      glowLines(['#e0e8ff', '#2a4ab5'], '#4a8aff', { width: 0.06 }),
    ],
  },
  {
    id: 'd-spellbook',
    name: 'D · Spellbook',
    pitch: 'Like a grimoire’s cover: dark leather between gold rims, with glowing runes tooled into it.',
    stage: { bloom: 0.15 },
    colours: [slot('leather', 'Leather colour', '#2a3a5a', ['Leather']), slot('gold', 'Gold colour', '#ccb47e', ['Outer gold', 'Inner gold']), slot('glow', 'Glow colour', '#6fc3ff', ['Glowing runes'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Leather', paint: photo('leather', 1.6, { lighting: 0.6 }), effects: [recolour(['#04060c', '#141c2e', '#2a3a5a', '#5a6a8a']), DROP] },
      { ...bandFillLayer(), name: 'Outer gold', to: 0.2, paint: goldPaint(2), effects: goldFx(0.4) },
      { ...bandFillLayer(), name: 'Inner gold', from: 0.8, paint: goldPaint(2), effects: goldFx(0.4) },
      { ...glowRunes('#e0f6ff', '#6fc3ff', 0.5, 0.36), effects: [bevel({ direction: 'sunken', size: 0.4, gloss: 0.3 }), glow({ color: '#6fc3ff', opacity: 0.8, size: 0.12 })] },
    ],
  },
  {
    id: 'e-ley-circuit',
    name: 'E · Arcane circuitry',
    pitch: 'Glowing traces running round a dark band and ending in bright nodes, like spellwork wired into the frame.',
    stage: { bloom: 0.3 },
    colours: [slot('band', 'Frame colour', '#16222a', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#5affd0', ['Circuitry', 'Nodes'])],
    layers: () => [
      ...base({ light: '#2a3a48', dark: '#04080a', step: 0.55 }),
      overlay('black-onyx', 8, 'screen', 0.3),
      { ...textureLayer('circuit'), name: 'Circuitry', color: '#5affd0', seed: 0xc1c, effects: [glow({ color: '#5affd0', opacity: 0.7, size: 0.08 }), blur(0.01)] },
      { ...repeatLayer(), name: 'Nodes', element: 'bead', count: 8, at: 0.55, size: 0.22, fill: '#c8fff0', raised: false, shaded: false, effects: [glow({ color: '#5affd0', opacity: 0.9, size: 0.14 })] },
    ],
  },
];
export { contact, GOLD_STOPS, recolour };
