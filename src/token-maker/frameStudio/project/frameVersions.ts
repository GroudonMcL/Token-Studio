// The new versions of Token Maker's frames chosen in the frame review
// (docs/FRAME-REVIEW.md), in the owner's house style (houseStyle.ts). Each
// is listed in Token Maker straight after the frame it is a version of,
// with a colour picker per colour slot.

import {
  adjust,
  bandFillLayer,
  base,
  bevel,
  blur,
  BRONZE_STOPS,
  contact,
  DROP,
  fromLayers,
  glow,
  glowCracks,
  glowLines,
  goldFx,
  goldPaint,
  inscription,
  lin,
  lineLayer,
  metalFx,
  overlay,
  photo,
  recolour,
  repeatLayer,
  rims,
  shapeLayer,
  SILVER_STOPS,
  slot,
  STEEL_STOPS,
  textLayer,
  textureLayer,
  WARM_GOLD,
  type BuiltInFrame,
  type BuiltInGroup,
} from './houseStyle';
import { knotworkLayer } from './defaults';
import { wear } from './styles';
import type { ColourSlot } from './colourSlots';
import type { Layer, StageSettings } from './types';

/** A chosen version, as written in the review's candidate files. */
interface Version {
  id: string;
  name: string;
  description: string;
  group: BuiltInGroup;
  after: string;
  colours: ColourSlot[];
  stage?: Partial<StageSettings>;
  layers: () => Layer[];
}


const INSCRIPTION = 'FATE AND FIRE BEND TO THE WILL OF THE WISE · STARS AND STORM OBEY THE WORD OF THE WISE · ALL THINGS END · ALL THINGS BEGIN ·';
const runes = (color: string, glowColor: string, at = 0.5, size = 0.3): Layer => ({
  ...textLayer(),
  name: 'Runic inscription',
  font: 'runes',
  text: INSCRIPTION,
  size,
  spacing: 0.22,
  at,
  fill: color,
  effects: [glow({ inner: true, color: '#ffffff', opacity: 0.45, size: 0.04 }), glow({ color: glowColor, opacity: 0.85, size: 0.16 })],
});
const silver = lin(['#ffffff', '#8a90a0', '#3a3e4a']);

const WIZARD: BuiltInFrame[] = [
  {
    id: 'wizard-sapphire',
    name: 'Sapphire runes',
    description: 'A wizard’s sapphire band with runes glowing in its pressed-in step.',
    group: 'Classes',
    after: 'wizard',
    colours: [slot('band', 'Frame colour', '#5a8cff', ['Band', 'Pressed-in step']), slot('runes', 'Runes colour', '#4aa8ff', ['Runic inscription'])],
    project: fromLayers('Sapphire runes', () => [...base({ light: '#5a8cff', dark: '#0a1440', step: 0.5 }), runes('#d8f0ff', '#4aa8ff', 0.76, 0.42)]),
  },
  {
    id: 'wizard-starweave',
    name: 'Starweave',
    description: 'Night-sky marble with a faint nebula and stars, silver rims and four gold star sigils.',
    group: 'Classes',
    after: 'wizard',
    colours: [slot('band', 'Sky colour', '#3a4ea8', ['Band', 'Texture', 'Nebula', 'Stars']), slot('sigils', 'Sigils colour', '#f0d080', ['Star sigils'])],
    project: fromLayers(
      'Starweave',
      () => [
        ...base({ light: '#3a4ea8', dark: '#070a24', step: null, rims: false }),
        overlay('blue-onyx', 7, 'overlay', 0.55, { angle: 30 }),
        { ...textureLayer('nebula'), name: 'Nebula', color: '#7a5ae0', color2: '#2a6aff', opacity: 0.55, blend: 'screen', seed: 0x2eb },
        { ...textureLayer('sparkle'), name: 'Stars', color: '#f4f0ff', amount: 1.2, scale: 0.6, seed: 0x5a2c },
        { ...lineLayer(), name: 'Silver rim', at: 0.03, width: 0.06, paint: silver, effects: [bevel({ size: 0.6, gloss: 0.9 })] },
        { ...lineLayer(), name: 'Inner silver', at: 0.975, width: 0.05, paint: silver, effects: [bevel({ size: 0.6, gloss: 0.9 })] },
        {
          ...shapeLayer(),
          name: 'Star sigils',
          shape: 'star',
          sides: 8,
          innerRatio: 0.38,
          along: 0.125,
          across: 0.5,
          size: 0.95,
          fill: '#f0d080',
          outline: null,
          raised: false,
          faceted: true,
          facetTable: 0,
          mirror: 'four',
          effects: [...goldFx(0.4), glow({ color: '#ffd870', opacity: 0.45, size: 0.12 })],
        },
      ],
      { bloom: 0.25 },
    ),
  },
  {
    id: 'wizard-ley-lines',
    name: 'Ley lines',
    description: 'A dark band with glowing rings and two rings of glowing runes.',
    group: 'Classes',
    after: 'wizard',
    colours: [slot('band', 'Frame colour', '#2a2f6a', ['Band', 'Pressed-in step', 'Texture']), slot('glow', 'Glow colour', '#6a7aff', ['Glowing lines', 'Runes', 'Inner runes'])],
    project: fromLayers(
      'Ley lines',
      () => [
        ...base({ light: '#2a2f6a', dark: '#05061a', step: 0.5 }),
        overlay('black-onyx', 8, 'screen', 0.35, { angle: -40 }),
        glowLines(['#d8e4ff', '#5a4ae0'], '#6a7aff', { width: 0.05, size: 0.14, opacity: 0.9 }),
        { ...repeatLayer(), name: 'Runes', element: 'rune', mode: 'spacing', spacing: 0.5, snapToCorners: false, at: 0.26, size: 0.36, stretch: 0.7, fill: '#d8e8ff', raised: false, shaded: false, effects: [glow({ color: '#6a8aff', opacity: 0.9, size: 0.14 })] },
        { ...repeatLayer(), name: 'Inner runes', element: 'rune', mode: 'spacing', spacing: 0.5, offset: 0.5, snapToCorners: false, at: 0.74, size: 0.3, stretch: 0.7, fill: '#c8b8ff', raised: false, shaded: false, opacity: 0.85, effects: [glow({ color: '#9a6aff', opacity: 0.9, size: 0.14 })] },
      ],
      { bloom: 0.2, bleed: 0.1 },
    ),
  },
  {
    id: 'wizard-grimoire',
    name: 'Gilded grimoire',
    description: 'Rough-gold rims round a sunken lapis enamel channel with a gold runic inscription.',
    group: 'Classes',
    after: 'wizard',
    colours: [slot('enamel', 'Enamel colour', '#2a5ad8', ['Lapis enamel']), slot('gold', 'Gold colour', '#ccb47e', ['Outer gold', 'Inner gold', 'Runic inscription'])],
    project: fromLayers('Gilded grimoire', () => [
      { ...bandFillLayer(), name: 'Lapis enamel', paint: photo('blue-onyx', 4, { angle: 120, lighting: 0.2 }), effects: [recolour(['#050a30', '#14308a', '#2a5ad8', '#7aa0ff']), DROP] },
      { ...bandFillLayer(), name: 'Channel depth', from: 0.28, to: 0.72, blend: 'overlay', paint: { kind: 'acrossBand', stops: [{ at: 0, color: '#878787', opacity: 1 }, { at: 1, color: '#404040', opacity: 1 }] }, effects: [bevel({ direction: 'sunken', size: 0.15, gloss: 0.5, soften: 0.02 })] },
      { ...bandFillLayer(), name: 'Outer gold', from: 0, to: 0.3, paint: goldPaint(2.1), effects: [...goldFx(0.3), DROP] },
      { ...bandFillLayer(), name: 'Inner gold', from: 0.7, to: 1, paint: goldPaint(3), effects: [...goldFx(0.3), DROP] },
      { ...runes('#f6dc8a', '#ffcf5a', 0.5, 0.34), effects: [bevel({ size: 0.4, gloss: 0.7 }), glow({ color: '#ffc040', opacity: 0.35, size: 0.08 })] },
    ]),
  },
];

// Helpers the versions below share, by frame.
// engraved
const steel = (scale = 2.4) => photo('hammered-metal', scale, { lighting: 0.4 });
const sunk = bevel({ direction: 'sunken', size: 0.5, gloss: 0.5, soften: 0.01 });

// arcane
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

// infernal
const OATH = 'BURN · BREAK · BIND · NONE ESCAPE THE PIT · WHAT IS PROMISED IS OWED · ';
const fireRunes = (fill: string, glowColor: string, at: number, size: number) => ({
  ...textLayer(),
  name: 'Burning runes',
  font: 'runes' as const,
  text: OATH.repeat(3),
  size,
  spacing: 0.22,
  at,
  fill,
  effects: [glow({ inner: true, color: '#fff4c0', opacity: 0.6, size: 0.04 }), glow({ color: glowColor, opacity: 0.9, size: 0.18 })],
});
const IRON = ['#020101', '#0a0808', '#1e1a19', '#4a4240', '#a09088'];

// double
const goldLine = (name: string, at: number, width = 0.11) => ({ ...lineLayer(), name, at, width, paint: goldPaint(1.4), effects: [...goldFx(0.6, WARM_GOLD)] });

const VERSIONS: Version[] = [
  // ── stamped ──
  {
    id: 'stamped-veined',
    name: 'Veined stamp',
    description: 'Stamped in a clean two-tone light, with soft veins only on the shaded side.',
    group: 'Classic',
    after: 'stamped',
    colours: [slot('band', 'Frame colour', '#ff8a3a', ['Band', 'Pressed-in step', 'Veins'])],
    layers: () => [
      ...base({ light: '#ff8a3a', dark: '#3a1004', step: 0.55, rims: false }),
      { ...textureLayer('veins'), name: 'Veins', color: '#d7671f', where: 'shaded', opacity: 0.7, seed: 0x5eed },
      ...rims(),
    ],
  },
  {
    id: 'stamped-leather',
    name: 'Tooled leather',
    description: 'Dyed leather with a tooled groove and stitching round the inside.',
    group: 'Classic',
    after: 'stamped',
    colours: [slot('leather', 'Leather colour', '#a0461c', ['Leather']), slot('stitch', 'Stitching colour', '#f0dcb0', ['Stitching'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Leather', paint: photo('leather', 1.6, { lighting: 0.7 }), effects: [recolour(['#120402', '#4a1a06', '#a0461c', '#d07a40']), bevel({ size: 0.35, gloss: 0.1, highlightOpacity: 0.25, soften: 0.03 }), DROP] },
      { ...lineLayer(), name: 'Tooled groove', at: 0.42, width: 0.05, paint: lin(['#000000', '#000000']), opacity: 0.6, blend: 'multiply', effects: [bevel({ direction: 'sunken', size: 0.6, gloss: 0.2 })] },
      { ...lineLayer(), name: 'Stitching', at: 0.75, width: 0.035, dash: 'dashed', paint: { kind: 'solid', color: '#f0dcb0' }, effects: [contact(0.6)] },
      ...rims(),
    ],
  },
  {
    id: 'stamped-enamel',
    name: 'Brass & enamel',
    description: 'A rounded brass rim with beads outside and a glossy enamel step inside.',
    group: 'Classic',
    after: 'stamped',
    colours: [slot('enamel', 'Enamel colour', '#e0601c', ['Enamel']), slot('metal', 'Metal colour', '#ccb47e', ['Brass rim', 'Brass beads'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Enamel', from: 0.45, to: 1, paint: lin(['#ffa060', '#e0601c', '#4a1404']), effects: [bevel({ direction: 'sunken', size: 0.2, gloss: 0.9, highlightOpacity: 0.6, soften: 0.02 }), DROP] },
      { ...bandFillLayer(), name: 'Brass rim', from: 0, to: 0.5, paint: goldPaint(2.1), effects: [...goldFx(0.35), DROP] },
      { ...repeatLayer(), name: 'Brass beads', element: 'bead', mode: 'spacing', spacing: 0.45, snapToCorners: false, at: 0.25, size: 0.26, fill: '#ccb47e', raised: true, effects: [recolour(['#3a2c12', '#8a7444', '#ccb47e', '#f0e4bc', '#fffcf2']), contact(0.5)] },
    ],
  },
  {
    id: 'stamped-ember',
    name: 'Ember stamp',
    description: 'A stamped band whose seam glows like metal fresh from the forge.',
    group: 'Classic',
    after: 'stamped',
    stage: { bloom: 0.2 },
    colours: [slot('band', 'Frame colour', '#ff6c08', ['Band', 'Pressed-in step', 'Glowing seam'])],
    layers: () => [
      ...base({ light: '#ffb060', dark: '#2a0a02', step: 0.55, stepLight: '#ff6c08', stepDark: '#3a0e02' }),
      overlay('lava-flow', 6, 'overlay', 0.5, { angle: 20 }),
      { ...lineLayer(), name: 'Glowing seam', at: 0.55, width: 0.03, paint: { kind: 'solid', color: '#ffd080' }, effects: [glow({ color: '#ff6c08', opacity: 0.9, size: 0.16 })] },
    ],
  },
  // ── gilded ──
  {
    id: 'gilded-filigree',
    name: 'Filigree',
    description: 'Gold chased with scrolling filigree between bright lit rims.',
    group: 'Classic',
    after: 'gilded',
    colours: [slot('gold', 'Gold colour', '#c8952e', ['Gold', 'Filigree'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Gold', paint: goldPaint(2.4), effects: [...goldFx(0.3, WARM_GOLD), DROP] },
      { ...textureLayer('filigree'), name: 'Filigree', color: '#5a4416', from: 0.12, to: 0.88, opacity: 0.8, blend: 'multiply', seed: 0xf111 },
      { ...lineLayer(), name: 'Outer bead line', at: 0.08, width: 0.05, paint: lin(['#fffcf2', '#8a7444']), effects: [bevel({ size: 0.6, gloss: 0.8 })] },
      { ...lineLayer(), name: 'Inner bead line', at: 0.92, width: 0.05, paint: lin(['#fffcf2', '#8a7444']), effects: [bevel({ size: 0.6, gloss: 0.8 })] },
    ],
  },
  {
    id: 'gilded-lacquer',
    name: 'Gold on lacquer',
    description: 'Glossy black lacquer with fine gold lines and a dusting of gold leaf.',
    group: 'Classic',
    after: 'gilded',
    colours: [slot('lacquer', 'Lacquer colour', '#1a1a20', ['Band']), slot('gold', 'Gold colour', '#e0c070', ['Gold lines', 'Gold leaf'])],
    layers: () => [
      ...base({ light: '#4a4a58', dark: '#050508', step: null, rims: false }),
      { ...textureLayer('sparkle'), name: 'Gold leaf', color: '#e0c070', amount: 1.1, scale: 0.6, seed: 0x901d },
      { ...lineLayer(), name: 'Gold lines', at: 0.14, width: 0.08, paint: lin(['#fff0c0', '#e0c070', '#6a5020']), effects: [bevel({ size: 0.6, gloss: 0.9 }), contact(0.4)] },
      { ...lineLayer(), name: 'Gold lines', at: 0.86, width: 0.08, paint: lin(['#fff0c0', '#e0c070', '#6a5020']), effects: [bevel({ size: 0.6, gloss: 0.9 }), contact(0.4)] },
      ...rims(),
    ],
  },
  // ── engraved ──
  {
    id: 'engraved-scrollwork',
    name: 'Scrollwork steel',
    description: 'Bright steel with engraved scrolls between two polished rims.',
    group: 'Classic',
    after: 'engraved',
    colours: [slot('metal', 'Metal colour', '#7a828c', ['Steel', 'Scrolls', 'Outer rim', 'Inner rim'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Steel', paint: steel(), effects: [...metalFx(STEEL_STOPS, 0.3, 0.8), DROP] },
      { ...textureLayer('filigree'), name: 'Scrolls', color: '#20262c', from: 0.15, to: 0.85, opacity: 0.85, blend: 'multiply', seed: 0xf111, effects: [sunk] },
      { ...lineLayer(), name: 'Outer rim', at: 0.06, width: 0.08, paint: lin(['#ffffff', '#7a828c', '#20262c']), effects: [bevel({ size: 0.6, gloss: 0.9 })] },
      { ...lineLayer(), name: 'Inner rim', at: 0.94, width: 0.08, paint: lin(['#ffffff', '#7a828c', '#20262c']), effects: [bevel({ size: 0.6, gloss: 0.9 })] },
    ],
  },
  {
    id: 'engraved-inlay',
    name: 'Silver inlay',
    description: 'Blackened gunmetal with an inscription in Sith AF inlaid in bright silver.',
    group: 'Classic',
    after: 'engraved',
    colours: [slot('metal', 'Metal colour', '#3a4048', ['Gunmetal']), slot('inlay', 'Inlay colour', '#e4e8f0', ['Inlaid inscription', 'Inlay lines'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Gunmetal', paint: steel(2), effects: [...metalFx(['#050608', '#181c22', '#3a4048', '#7a828c', '#c8ced6'], 0.3, 0.7), DROP] },
      { ...lineLayer(), name: 'Inlay lines', at: 0.2, width: 0.035, paint: { kind: 'solid', color: '#e4e8f0' }, effects: [bevel({ size: 0.6, gloss: 0.9 })] },
      { ...lineLayer(), name: 'Inlay lines', at: 0.8, width: 0.035, paint: { kind: 'solid', color: '#e4e8f0' }, effects: [bevel({ size: 0.6, gloss: 0.9 })] },
      inscription('sith', '#e4e8f0', { name: 'Inlaid inscription', size: 0.42, spacing: 0.12, effects: [bevel({ size: 0.5, gloss: 0.9 }), contact(0.4)] }),
      ...rims(),
    ],
  },
  {
    id: 'engraved-damascus',
    name: 'Damascus',
    description: 'Folded steel with flowing light and dark grain and a polished bevel.',
    group: 'Classic',
    after: 'engraved',
    colours: [slot('metal', 'Metal colour', '#7a828c', ['Damascus'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Damascus', paint: photo('tiger-rock', 1.4, { angle: 90, lighting: 0.3 }), effects: [adjust({ contrast: 0.8 }), recolour(STEEL_STOPS), bevel({ profile: 'rounded', size: 0.35, gloss: 0.8, highlightOpacity: 0.7, soften: 0.02 }), DROP] },
      ...rims(),
    ],
  },
  {
    id: 'engraved-knotwork',
    name: 'Etched knotwork',
    description: 'Steel etched with an interlaced knot band in a darker colour.',
    group: 'Classic',
    after: 'engraved',
    colours: [slot('metal', 'Metal colour', '#7a828c', ['Steel']), slot('etch', 'Etching colour', '#1a2a3a', ['Etched knot'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Steel', paint: steel(), effects: [...metalFx(STEEL_STOPS, 0.3, 0.8), DROP] },
      { ...knotworkLayer(), name: 'Etched knot', width: 0.22, amplitude: 0.26, waveLength: 1.1, color: '#1a2a3a', outline: '#c8ced6', outlineWidth: 0.02, outlineOpacity: 0.8, shine: false, double: true, opacity: 0.85, effects: [sunk] },
      ...rims(),
    ],
  },
  {
    id: 'engraved-bronze',
    name: 'Engraved bronze',
    description: 'Warm bronze with a deep-cut Yugurian inscription and a pressed-in step.',
    group: 'Classic',
    after: 'engraved',
    colours: [slot('metal', 'Metal colour', '#a87a3a', ['Bronze', 'Pressed-in bronze'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Bronze', paint: steel(2), effects: [...metalFx(BRONZE_STOPS, 0.3, 0.7), DROP] },
      { ...bandFillLayer(), name: 'Pressed-in bronze', from: 0.68, to: 1, paint: lin(['#1e1206', '#e0c08a']), opacity: 0.5, blend: 'soft-light' },
      inscription('yugurian', '#2a1a08', { name: 'Engraving', at: 0.36, size: 0.44, spacing: 0.1, start: 3, effects: [sunk] }),
      { ...lineLayer(), name: 'Crease', at: 0.68, width: 0.03, opacity: 0.55, blend: 'overlay', paint: { kind: 'solid', color: '#190500' } },
      ...rims(),
    ],
  },
  // ── arcane ──
  {
    id: 'arcane-sigil',
    name: 'Sigil band',
    description: 'A deep teal-blue band with runes glowing in its pressed-in step and a glowing seam.',
    group: 'Classic',
    after: 'arcane',
    stage: { bloom: 0.2 },
    colours: [slot('band', 'Frame colour', '#2a6a9a', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#6fc3ff', ['Glowing runes', 'Glowing seam'])],
    layers: () => [
      ...base({ light: '#2a6a9a', dark: '#04101c', step: 0.5 }),
      { ...lineLayer(), name: 'Glowing seam', at: 0.5, width: 0.025, paint: { kind: 'solid', color: '#d8f4ff' }, effects: [glow({ color: '#6fc3ff', opacity: 0.9, size: 0.12 })] },
      glowRunes('#e0f6ff', '#6fc3ff', 0.75, 0.4),
    ],
  },
  {
    id: 'arcane-crystal',
    name: 'Arcane crystal',
    description: 'Cracked crystal lit from within, with soft glowing rings.',
    group: 'Classic',
    after: 'arcane',
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
    id: 'arcane-spellbook',
    name: 'Spellbook',
    description: 'Dark leather between gold rims, with glowing runes tooled into it.',
    group: 'Classic',
    after: 'arcane',
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
    id: 'arcane-circuitry',
    name: 'Arcane circuitry',
    description: 'Glowing traces running round a dark band and ending in bright nodes.',
    group: 'Classic',
    after: 'arcane',
    stage: { bloom: 0.3 },
    colours: [slot('band', 'Frame colour', '#16222a', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#5affd0', ['Circuitry', 'Nodes'])],
    layers: () => [
      ...base({ light: '#2a3a48', dark: '#04080a', step: 0.55 }),
      overlay('black-onyx', 8, 'screen', 0.3),
      { ...textureLayer('circuit'), name: 'Circuitry', color: '#5affd0', seed: 0xc1c, effects: [glow({ color: '#5affd0', opacity: 0.7, size: 0.08 }), blur(0.01)] },
      { ...repeatLayer(), name: 'Nodes', element: 'bead', count: 8, at: 0.55, size: 0.22, fill: '#c8fff0', raised: false, shaded: false, effects: [glow({ color: '#5affd0', opacity: 0.9, size: 0.14 })] },
    ],
  },
  // ── infernal ──
  {
    id: 'infernal-hellfire',
    name: 'Hellfire runes',
    description: 'A charcoal-to-crimson band with runes burning in its pressed-in step.',
    group: 'Classic',
    after: 'infernal',
    stage: { bloom: 0.25 },
    colours: [slot('band', 'Frame colour', '#8a1a10', ['Band', 'Pressed-in step']), slot('fire', 'Fire colour', '#ff6a1a', ['Burning runes', 'Ember seam'])],
    layers: () => [
      ...base({ light: '#8a1a10', dark: '#0a0202', step: 0.5 }),
      { ...lineLayer(), name: 'Ember seam', at: 0.5, width: 0.025, paint: { kind: 'solid', color: '#ffd080' }, effects: [glow({ color: '#ff6a1a', opacity: 0.9, size: 0.12 })] },
      fireRunes('#ffe8a0', '#ff6a1a', 0.75, 0.4),
    ],
  },
  {
    id: 'infernal-brimstone',
    name: 'Brimstone',
    description: 'Dark volcanic rock split by glowing lava cracks.',
    group: 'Classic',
    after: 'infernal',
    stage: { bloom: 0.3, bleed: 0.2 },
    colours: [slot('fire', 'Fire colour', '#ff4a10', ['Glowing cracks', 'Second cracks', 'Glowing lines'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Rock', paint: photo('dark-rock', 3, { lighting: 0.4 }), effects: [adjust({ brightness: -0.35, contrast: 0.3 }), bevel({ profile: 'chisel', size: 0.35, gloss: 0.15, highlightOpacity: 0.25 }), DROP] },
      glowCracks('#1a0804', '#ef1d06', '#ff8a2a'),
      { ...glowCracks('#1a0804', '#ff6a06', '#ffd04a', 1, 0.7), name: 'Second cracks' },
      { ...lineLayer(), name: 'Glowing lines', at: 0.03, width: 0.03, paint: { kind: 'solid', color: '#ffb060' }, effects: [glow({ color: '#ff4a10', opacity: 0.8, size: 0.14 })] },
      { ...lineLayer(), name: 'Glowing lines', at: 0.97, width: 0.03, paint: { kind: 'solid', color: '#ffb060' }, effects: [glow({ color: '#ff4a10', opacity: 0.8, size: 0.14 })] },
    ],
  },
  {
    id: 'infernal-iron',
    name: 'Infernal iron',
    description: 'Blackened, scarred iron with spikes along the outside and a red-hot seam.',
    group: 'Classic',
    after: 'infernal',
    stage: { bloom: 0.2 },
    colours: [slot('metal', 'Metal colour', '#3a3230', ['Iron', 'Spikes']), slot('fire', 'Fire colour', '#ff3a10', ['Hot seam'])],
    layers: () => [
      { ...repeatLayer(), name: 'Spikes', element: 'spike', count: 16, at: -0.2, size: 0.95, stretch: 0.45, fill: '#5a5250', raised: false, effects: [...metalFx(IRON, 0.5, 0.6)] },
      { ...bandFillLayer(), name: 'Iron', paint: photo('hammered-metal', 1.6, { lighting: 0.5 }), effects: [wear({ chips: 0.04, polish: 0.4, grime: 0.4, scale: 0.12, scratches: 0.3 }), ...metalFx(IRON, 0.25, 0.5), DROP] },
      { ...lineLayer(), name: 'Hot seam', at: 0.6, width: 0.04, paint: { kind: 'solid', color: '#ffb060' }, effects: [glow({ color: '#ff3a10', opacity: 0.95, size: 0.16 })] },
    ],
  },
  {
    id: 'infernal-blood-pact',
    name: 'Blood pact',
    description: 'Glossy blood-red enamel between black iron rims, with glowing sigils at the quarters.',
    group: 'Classic',
    after: 'infernal',
    stage: { bloom: 0.2 },
    colours: [slot('enamel', 'Enamel colour', '#a01020', ['Enamel']), slot('metal', 'Metal colour', '#3a3230', ['Outer iron', 'Inner iron']), slot('fire', 'Sigil colour', '#ff6a1a', ['Sigils'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Enamel', paint: { kind: 'linear', angle: 45, followLight: false, stops: [{ at: 0, color: '#ff4050', opacity: 1 }, { at: 0.5, color: '#a01020', opacity: 1 }, { at: 1, color: '#200204', opacity: 1 }] }, effects: [bevel({ direction: 'sunken', size: 0.15, gloss: 0.9, highlightOpacity: 0.6, soften: 0.02 }), DROP] },
      { ...bandFillLayer(), name: 'Outer iron', to: 0.22, paint: photo('hammered-metal', 1.6, { lighting: 0.5 }), effects: metalFx(IRON, 0.45, 0.6) },
      { ...bandFillLayer(), name: 'Inner iron', from: 0.78, paint: photo('hammered-metal', 1.6, { lighting: 0.5 }), effects: metalFx(IRON, 0.45, 0.6) },
      { ...shapeLayer(), name: 'Sigils', shape: 'star', sides: 5, innerRatio: 0.38, along: 0.125, across: 0.5, size: 0.75, fill: '#ffd080', outline: null, raised: false, mirror: 'four', effects: [glow({ color: '#ff6a1a', opacity: 0.9, size: 0.16 }), contact(0.5)] },
    ],
  },
  // ── double ──
  {
    id: 'double-gold-enamel',
    name: 'Gold lines on enamel',
    description: 'A glossy coloured band crossed by two gold lines, with gold diamonds at the quarters.',
    group: 'Classic',
    after: 'double',
    colours: [slot('band', 'Frame colour', '#1e4a8a', ['Band']), slot('gold', 'Gold colour', '#c8952e', ['Outer line', 'Inner line', 'Diamonds'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Band', paint: lin(['#4a7ad0', '#1e4a8a', '#04102a']), effects: [bevel({ direction: 'sunken', size: 0.12, gloss: 0.9, highlightOpacity: 0.5, soften: 0.02 }), DROP] },
      goldLine('Outer line', 0.12),
      goldLine('Inner line', 0.88),
      { ...shapeLayer(), name: 'Diamonds', shape: 'polygon', sides: 4, along: 0.125, across: 0.5, size: 0.55, stretch: 0.7, fill: '#c8952e', outline: null, raised: false, faceted: true, facetTable: 0.3, mirror: 'four', effects: [recolour(WARM_GOLD), contact(0.5)] },
    ],
  },
  {
    id: 'double-twin-rings',
    name: 'Twin rings',
    description: 'Two separate rounded rings with a gap between them, each in its own colour.',
    group: 'Classic',
    after: 'double',
    colours: [slot('outer', 'Outer colour', '#e0a040', ['Outer ring']), slot('inner', 'Inner colour', '#c03a2a', ['Inner ring'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Outer ring', to: 0.44, paint: lin(['#ffd080', '#e0a040', '#3a2004']), effects: [bevel({ size: 0.5, gloss: 0.4, highlightOpacity: 0.5 }), DROP] },
      { ...bandFillLayer(), name: 'Inner ring', from: 0.56, paint: lin(['#ff7a6a', '#c03a2a', '#2a0604']), effects: [bevel({ size: 0.5, gloss: 0.4, highlightOpacity: 0.5 }), DROP] },
    ],
  },
  {
    id: 'double-studded',
    name: 'Studded double',
    description: 'Two polished silver lines with a row of silver studs between them.',
    group: 'Classic',
    after: 'double',
    colours: [slot('band', 'Frame colour', '#2a2e38', ['Band']), slot('metal', 'Metal colour', '#a8aeb8', ['Outer line', 'Inner line', 'Studs'])],
    layers: () => [
      ...base({ light: '#4a5060', dark: '#08090c', step: null, rims: false }),
      { ...lineLayer(), name: 'Outer line', at: 0.14, width: 0.08, paint: photo('hammered-metal', 1.4), effects: metalFx(SILVER_STOPS, 0.6, 0.9) },
      { ...lineLayer(), name: 'Inner line', at: 0.86, width: 0.08, paint: photo('hammered-metal', 1.4), effects: metalFx(SILVER_STOPS, 0.6, 0.9) },
      { ...repeatLayer(), name: 'Studs', element: 'bead', mode: 'spacing', spacing: 0.6, snapToCorners: false, at: 0.5, size: 0.3, fill: '#a8aeb8', raised: true, effects: [recolour(SILVER_STOPS), contact(0.6)] },
      ...rims(),
    ],
  },
  {
    id: 'double-fine-lines',
    name: 'Fine lines',
    description: 'A clean two-tone band with two crisp bright lines pressed into it.',
    group: 'Classic',
    after: 'double',
    colours: [slot('band', 'Frame colour', '#c9b27a', ['Band', 'Pressed-in step'])],
    layers: () => [
      ...base({ light: '#e8d8a8', dark: '#3a2c14', step: 0.55 }),
      { ...lineLayer(), name: 'Bright line', at: 0.22, width: 0.035, paint: { kind: 'solid', color: '#fff8e8' }, opacity: 0.7, blend: 'overlay', effects: [bevel({ direction: 'sunken', size: 0.6, gloss: 0.4 })] },
      { ...lineLayer(), name: 'Bright line', at: 0.8, width: 0.035, paint: { kind: 'solid', color: '#fff8e8' }, opacity: 0.7, blend: 'overlay', effects: [bevel({ direction: 'sunken', size: 0.6, gloss: 0.4 })] },
    ],
  },
  {
    id: 'double-cord',
    name: 'Cord between gold',
    description: 'A twisted silk cord between two gold lines.',
    group: 'Classic',
    after: 'double',
    colours: [slot('cord', 'Cord colour', '#8a1a2a', ['Cord', 'Twist']), slot('gold', 'Gold colour', '#c8952e', ['Outer line', 'Inner line'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Cord', from: 0.18, to: 0.82, paint: lin(['#d04a5a', '#8a1a2a', '#2a0408']), effects: [bevel({ size: 0.9, depth: 1.4, gloss: 0.5 }), DROP] },
      { ...textureLayer('rope'), name: 'Twist', from: 0.18, to: 0.82, color: '#c03a4a', amount: 1, strength: 1.2, seed: 0xbead },
      goldLine('Outer line', 0.1, 0.18),
      goldLine('Inner line', 0.9, 0.18),
    ],
  },
  // ── polished ──
  {
    id: 'polished-titanium',
    name: 'Anodised titanium',
    description: 'Brushed titanium with an anodised sheen shifting round the band.',
    group: 'Classic',
    after: 'minimal',
    stage: { bloom: 0.1 },
    colours: [slot('metal', 'Sheen colour', '#5a6aff', ['Titanium', 'Sheen'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Titanium', paint: photo('hammered-metal', 3, { lighting: 0.4 }), effects: [...metalFx(STEEL_STOPS, 0.35, 0.8), DROP] },
      { ...textureLayer('brushed'), name: 'Brushing', color: '#c8ced6', opacity: 0.5, seed: 0xb705 },
      { ...bandFillLayer(), name: 'Sheen', blend: 'color', opacity: 0.7, paint: { kind: 'ring', followLight: false, stops: [{ angle: 0, color: '#3a8aff' }, { angle: 120, color: '#5a6aff' }, { angle: 240, color: '#a04aff' }, { angle: 330, color: '#3a8aff' }] } },
      ...rims(),
    ],
  },
  {
    id: 'polished-pearl',
    name: 'Pearl',
    description: 'Soft glossy pearl with a faint rainbow shimmer.',
    group: 'Classic',
    after: 'minimal',
    colours: [slot('band', 'Pearl colour', '#ece6de', ['Band', 'Pressed-in step'])],
    layers: () => [
      ...base({ light: '#ffffff', dark: '#a8a098', step: 0.55, rims: false }),
      { ...bandFillLayer(), name: 'Shimmer', blend: 'soft-light', opacity: 0.6, paint: lin(['#ffc8e8', '#c8f0ff', '#e8ffd0', '#ffe8c0'], 30) },
      { ...lineLayer(), name: 'Gloss', at: 0.25, width: 0.05, paint: { kind: 'solid', color: '#ffffff' }, opacity: 0.6, blend: 'screen', effects: [glow({ color: '#ffffff', opacity: 0.5, size: 0.08 })] },
      ...rims(),
    ],
  },
  {
    id: 'polished-obsidian',
    name: 'Obsidian',
    description: 'Black volcanic glass polished to a sharp highlight, with a coloured glint.',
    group: 'Classic',
    after: 'minimal',
    colours: [slot('band', 'Glint colour', '#4a3a6a', ['Band', 'Glint'])],
    layers: () => [
      ...base({ light: '#4a3a6a', dark: '#020204', step: null, rims: false }),
      { ...bandFillLayer(), name: 'Glass', paint: photo('black-onyx', 6), opacity: 0.6, blend: 'overlay' },
      { ...bandFillLayer(), name: 'Glint', paint: lin(['#ffffff', '#4a3a6a', '#000000'], 45, true), opacity: 0.35, blend: 'screen', effects: [bevel({ profile: 'rounded', size: 0.5, gloss: 1, highlightOpacity: 0.9 })] },
      ...rims(),
    ],
  },
  // ── next ──
];

export const FRAME_VERSIONS: BuiltInFrame[] = [
  ...WIZARD,
  ...VERSIONS.map(({ layers, stage, ...v }) => ({ ...v, project: fromLayers(v.name, layers, stage) })),
];
