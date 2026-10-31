// The new versions of Token Maker's frames chosen in the frame review
// (docs/FRAME-REVIEW.md), in the owner's house style (houseStyle.ts). Each
// is listed in Token Maker straight after the frame it is a version of,
// with a colour picker per colour slot.

import {
  across,
  adjust,
  bandFillLayer,
  bandShading,
  base,
  bevel,
  blur,
  BRONZE_STOPS,
  contact,
  contoursLayer,
  DROP,
  fractureLayer,
  fromLayers,
  glow,
  glowCracks,
  glowLines,
  goldFx,
  goldPaint,
  growthLayer,
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
  type BandShading,
  type BuiltInFrame,
  type BuiltInGroup,
} from './houseStyle';
import { cellsLayer, groupLayer, knotworkLayer, NEW_EFFECT } from './defaults';
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
  /** Shaded with gradient bands instead of a bevel over the whole band (houseStyle.ts: bandShading). */
  shading?: BandShading;
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

// oak
const OAK = ['#140a04', '#4a2a12', '#8a5a32', '#c89060', '#f0d0a0'];

// magma
const hotRing = (name: string, at: number, color = '#ff6a1a') => ({ ...lineLayer(), name, at, width: 0.06, paint: { kind: 'solid' as const, color: '#ffd080' }, effects: [glow({ color, opacity: 1, size: 0.24 }), blur(0.02)] });

// harlequin
// Diamonds that fit inside the piping and meet tip to tip, one at each corner.
const diamonds = (name: string, fill: string, offset: number, effects = [bevel({ size: 0.15, gloss: 0.6, highlightOpacity: 0.4 })]) => ({
  ...repeatLayer(), name, element: 'diamond' as const, mode: 'count' as const, count: 36, offset, snapToCorners: true, at: 0.5, size: 0.8, stretch: 0.88, fill, raised: false, shaded: false, effects,
});
const goldPiping = (name: string, at: number) => ({ ...lineLayer(), name, at, width: 0.09, paint: goldPaint(1.4), effects: goldFx(0.6, WARM_GOLD) });

// knotwork
const knot = (name: string, color: string, patch = {}) => ({ ...knotworkLayer(), name, width: 0.24, amplitude: 0.28, waveLength: 1.1, color, double: true, shine: false, outlineWidth: 0.025, ...patch });

// bard
const LUTE = ['#140a04', '#4a2a12', '#9a6a3a', '#d8a870', '#f8e0b8'];

// fighter
const fighterSteel = (scale = 2) => photo('hammered-metal', scale, { lighting: 0.4 });

// barbarian
const HIDE = ['#0e0602', '#3a1e0c', '#7a4a26', '#b08050', '#e0c098'];
const hide = (name = 'Hide', stops = HIDE) => ({ ...bandFillLayer(), name, paint: photo('leather', 1.4, { lighting: 0.6 }), effects: [recolour(stops), bevel({ profile: 'rounded', size: 0.45, gloss: 0.15, highlightOpacity: 0.35, soften: 0.04 }), DROP] });

// bard
const goldLines = () => [0.08, 0.92].map((at) => ({ ...lineLayer(), name: 'Gold lines', at, width: 0.06, paint: goldPaint(1.4), effects: goldFx(0.6, WARM_GOLD) }));

// ranger
const LEATHER = ['#0a0602', '#2a1a0a', '#5a3a1a', '#8a6a40', '#c0a070'];

// rogue
const DARK_LEATHER = ['#020202', '#0e0a08', '#2a2220', '#5a4a44', '#8a7a70'];

// artificer
const brass = (scale = 2) => photo('hammered-metal', scale, { lighting: 0.4 });

// cobblestone
const cobbles = (name = 'Cobbles', patch = {}) => ({ ...bandFillLayer(), name, paint: photo('cobblestone', 1.4, { lighting: 0.7 }), effects: [bevel({ profile: 'rounded', size: 0.3, gloss: 0.15, highlightOpacity: 0.4 }), DROP], ...patch });

// ── Crafted frames ──
const laurelGold = (scale = 0.6) => photo('gold', scale, { lighting: 0.4 });
const laurelLeaves = (name: string, at: number, rotation: number, fill: string, stops: string[], o: { count?: number; offset?: number; size?: number } = {}) => ({
  ...repeatLayer(), name, element: 'leaf' as const, count: o.count ?? 24, snapToCorners: false, at, size: o.size ?? 0.9, stretch: 0.42, rotation, offset: o.offset ?? 0,
  fill, fillPaint: laurelGold(), raised: false, effects: [...metalFx(stops, 0.45, 0.8), contact(0.55)],
});
const IRON_PLATE = ['#040506', '#16191e', '#4a5058', '#8a929c', '#d0d6de'];
const ironPlate = (name: string, stops: string[], picture: 'hammered-metal' | 'metal-plate' | 'rust' = 'hammered-metal') =>
  ({ ...bandFillLayer(), name, paint: photo(picture, 1.4, { lighting: 0.3 }), effects: [recolour(stops), DROP] });
const ironRivets = (name: string, at: number, fill: string, stops: string[], count = 16, size = 0.26) =>
  ({ ...repeatLayer(), name, element: 'bead' as const, count, snapToCorners: false, at, size, fill, raised: true, effects: [...metalFx(stops, 0.6, 0.8), contact(0.7)] });
const runeStone = (name: string, picture: Parameters<typeof photo>[0], scale: number, stops?: string[]) =>
  ({ ...bandFillLayer(), name, paint: photo(picture, scale, { lighting: 0.4 }), effects: [...(stops ? [recolour(stops)] : []), DROP] });
const carvedIn = (o: { size?: number; gloss?: number } = {}) => bevel({ direction: 'sunken', size: o.size ?? 0.5, gloss: o.gloss ?? 0.2 });
const briar = (name: string, color: string, thorn: string, o: { count?: number; thickness?: number; amplitude?: number; waveLength?: number; size?: number; seed?: number } = {}) => ({
  ...growthLayer('thorns'), name, count: o.count ?? 2, thickness: o.thickness ?? 0.09, amplitude: o.amplitude ?? 0.28, waveLength: o.waveLength ?? 1.6,
  extraSize: o.size ?? 0.4, color, extraColor: thorn, seed: o.seed ?? 1,
});
const dragonScales = (name: string, color: string, o: { size?: number; gloss?: number; from?: number; to?: number } = {}) => ({
  ...textureLayer('scales'), name, from: o.from ?? 0, to: o.to ?? 1, color, amount: 1, scale: o.size ?? 1.4, strength: 1 + (o.gloss ?? 0.6) * 0.4, seed: 0xd5a1,
});
const dragonUnder = (color: string) => ({ ...bandFillLayer(), name: 'Under', paint: { kind: 'solid' as const, color }, effects: [DROP] });
const dragonEdge = (name: string, at: number) => ({ ...lineLayer(), name, at, width: 0.06, paint: { kind: 'solid' as const, color: '#d8a838' }, effects: [...metalFx(WARM_GOLD, 0.6, 0.9), contact(0.5)] });
const celestialStars = (count = 24, at = 0.5, size = 0.2) => ({ ...repeatLayer(), name: 'Stars', element: 'star' as const, count, snapToCorners: false, at, size, fill: '#f4f0ff', raised: false, shaded: false, altSizes: [1, 0.6, 0.8], effects: [glow({ color: '#c0d0ff', opacity: 0.7, size: 0.06 })] });
// Round, like a real rope: lit along the top edge and shaded underneath, from gradients rather than a bevel.
const ropeRound = () => ({ ...bandFillLayer(), name: 'Round shading', blend: 'overlay' as const, opacity: 0.8, paint: across(['#000000', '#ffffff', '#808080', '#000000']) });
const ropeStrand = (name: string, color: string, o: { from?: number; to?: number; seed?: number } = {}) => [
  { ...bandFillLayer(), name, from: o.from ?? 0, to: o.to ?? 1, paint: { kind: 'solid' as const, color }, effects: [DROP] },
  { ...textureLayer('rope'), name: name + ' twist', from: o.from ?? 0, to: o.to ?? 1, color, amount: 1, strength: 1.2, seed: o.seed ?? 0xbead },
];
const shieldPlanks = (stops?: string[]) => ({ ...bandFillLayer(), name: 'Planks', from: 0.4, to: 1, paint: photo('wood-planks', 1.6, { angle: 90, lighting: 0.3 }), effects: stops ? [recolour(stops)] : [] });
const plankJoins = () => ({ ...repeatLayer(), name: 'Plank joins', element: 'tick' as const, count: 12, snapToCorners: false, at: 0.7, size: 0.6, stretch: 0.12, fill: '#2a1a0c', raised: false, shaded: false, opacity: 0.8, blend: 'multiply' as const });
const shieldRim = (name: string, stops: string[], picture: 'hammered-metal' | 'metal-plate' = 'hammered-metal') =>
  ({ ...bandFillLayer(), name, to: 0.42, paint: photo(picture, 1, { lighting: 0.3 }), effects: [recolour(stops), DROP] });
const shieldNails = (fill: string, stops: string[], count = 12) => ({ ...repeatLayer(), name: 'Nails', element: 'bead' as const, count, snapToCorners: false, at: 0.21, size: 0.3, fill, raised: true, effects: [...metalFx(stops, 0.6, 0.8), contact(0.7)] });
// Shades the rim and the planks separately, each with its own gradient pair.
const shieldShading = () => [
  { ...bandFillLayer(), name: 'Rim shading', to: 0.42, blend: 'overlay' as const, opacity: 0.7, paint: lin(['#ffffff', '#000000']) },
  { ...bandFillLayer(), name: 'Plank shading', from: 0.42, blend: 'overlay' as const, opacity: 0.6, paint: lin(['#000000', '#ffffff']) },
  { ...lineLayer(), name: 'Crease', at: 0.42, width: 0.03, opacity: 0.6, blend: 'overlay' as const, paint: { kind: 'solid' as const, color: '#190500' } },
];

// ── Crafted borders (Frame Studio starting designs) ──
// border-filigree
/** Two gold bands either side of a channel, shaded with gradients, with filigree chased into them. */
const filigreeBands = (stops: string[], from = 0.3, to = 0.72): Layer[] => [
  { ...bandFillLayer(), name: 'Outer gold', to: from + 0.02, paint: lin(['#ffffff', '#606060']), effects: [recolour(stops), DROP] },
  { ...bandFillLayer(), name: 'Inner gold', from: to - 0.02, paint: lin(['#505050', '#f0f0f0']), effects: [recolour(stops), DROP] },
  { ...textureLayer('filigree'), name: 'Outer filigree', to: from + 0.02, color: '#8a6a30', amount: 0.8, scale: 1.5, strength: 1.2, seed: 0xf11, blend: 'multiply' },
  { ...textureLayer('filigree'), name: 'Inner filigree', from: to - 0.02, color: '#8a6a30', amount: 0.8, scale: 1.5, strength: 1.2, seed: 0xf12, blend: 'multiply' },
];
const enamelChannel = (name: string, light: string, dark: string, from = 0.3, to = 0.72): Layer => ({ ...bandFillLayer(), name, from, to, paint: lin([dark, light]), effects: [DROP] });
// border-guild
/** A metal band shaded with the twin gradients (lit band, reversed pressed-in step), cut into blocks. */
const guildBand = (stops: string[], groove: string, o: { blocks?: boolean } = {}): Layer[] => [
  { ...bandFillLayer(), name: 'Band', paint: lin(['#f8f8f8', '#404040']), effects: [recolour(stops), DROP] },
  { ...bandFillLayer(), name: 'Pressed-in step', from: 0.62, to: 1, paint: lin(['#303030', '#e8e8e8']), effects: [recolour(stops)] },
  { ...lineLayer(), name: 'Crease', at: 0.62, width: 0.04, opacity: 0.6, blend: 'multiply', paint: { kind: 'solid', color: groove } },
  ...(o.blocks === false ? [] : [{ ...repeatLayer(), name: 'Block lines', element: 'tick' as const, count: 36, snapToCorners: false, at: 0.31, size: 0.6, stretch: 0.1, rotation: 20, fill: groove, raised: false, shaded: false, opacity: 0.7, blend: 'multiply' as const }]),
  { ...lineLayer(), name: 'Outer rim (lit)', at: 0.02, width: 0.04, blend: 'overlay', paint: { kind: 'solid', color: '#ffffff' }, opacity: 0.7 },
];
const guildStuds = (fill: string, stops: string[], size = 0.95): Layer => ({ ...repeatLayer(), name: 'Studs', element: 'triangle', count: 4, at: 0.5, size, stretch: 1.1, rotation: 180, fill, raised: false, effects: [bevel({ profile: 'chisel', size: 0.4, depth: 1.4, gloss: 0.8 }), recolour(stops), contact(0.6)] });
// border-raven
const RAVEN_STAGE = { thickness: 0.18, outerSpacing: 0.01 };
/** Feathers laid along the band, two layers deep so they read as plumage rather than lines. */
const plumage = (dark: string, light: string, seed = 0xfea7): Layer[] => [
  { ...textureLayer('feathers'), name: 'Feathers', from: 0.08, to: 0.92, color: dark, amount: 1, scale: 1.3, strength: 1, seed },
  { ...textureLayer('feathers'), name: 'Top feathers', from: 0.12, to: 0.88, color: light, amount: 0.6, scale: 1.1, strength: 0.9, seed: seed + 1, effects: [contact(0.5)] },
];
/** Depth: a grained band, the plumage, then the twin gradient rings (lit band, reversed pressed-in step, crease, rims) over it all. */
const deepPlumage = (light: string, dark: string, feathers: Layer[], extra: Layer[] = []): Layer[] =>
  bandShading([{ ...bandFillLayer(), name: 'Band', paint: lin([light, dark]), effects: [DROP] }, overlay('black-onyx', 4, 'overlay', 0.35), ...feathers, ...extra], { step: 0.55, strength: 0.75 });
const plumeRim = (name: string, at: number, color: string, glowColor: string | null, width = 0.06): Layer => ({
  ...lineLayer(), name, at, width, paint: { kind: 'solid', color }, effects: [...metalFx(['#1e0a04', '#6a3014', color, '#f0b08a', '#fff0e0'], 0.6, 0.9), ...(glowColor ? [glow({ color: glowColor, opacity: 0.5, size: 0.08 })] : [])],
});
// border-ember
const EMBER_STAGE = { thickness: 0.18, outerSpacing: 0.09 };
const emberIron = (light = '#4a4e58', dark = '#020203'): Layer[] =>
  bandShading([{ ...bandFillLayer(), name: 'Black iron', paint: lin([light, dark]), effects: [DROP] }], { step: 0.6 });
const emberGrooves = (color = '#060608'): Layer => ({ ...contoursLayer(), name: 'Grooves', count: 2, from: 0.5, spacing: 0.05, width: 0.03, taper: 0, paint: { kind: 'solid', color }, opacity: 0.8 });
const lavaRing = (from: number, hot: string, deep: string, glowColor: string): Layer[] => [
  { ...bandFillLayer(), name: 'Lava', from, to: 1, paint: lin([hot, deep], 45) },
  { ...textureLayer('lava'), name: 'Molten glass', from, to: 1, color: hot, color2: deep, scale: 2.6, amount: 1.4, seed: 0x1a7a },
  { ...lineLayer(), name: 'Lava glow', at: from + (1 - from) / 2, width: (1 - from) * 0.6, paint: { kind: 'solid', color: hot }, opacity: 0.5, blend: 'screen', effects: [glow({ color: glowColor, opacity: 0.7, size: 0.12 })] },
  { ...lineLayer(), name: 'Lava rim', at: from, width: 0.04, paint: { kind: 'solid', color: '#08080a' }, effects: [contact(0.8)] },
];
// border-storm
const STORM_STAGE = { thickness: 0.2, outerSpacing: 0.03 };
const stormDistort = (amount: number, scale = 0.3, seed = 1) => ({ ...NEW_EFFECT.distort(), amount, scale, seed }) as Layer['effects'][number];
const spinBlur = (amount: number) => ({ kind: 'blur' as const, on: true, mode: 'spin' as const, amount, keepShape: false });
/** The storm, in any three colours, kept inside the band (the group is clipped to it). */
const stormRing = (cloud: string, veil: string, edge: string, wisp: string): Layer => ({
  ...groupLayer([
    { ...lineLayer(), name: 'Dark cloud', at: 0.5, width: 0.9, paint: { kind: 'solid', color: cloud }, opacity: 0.85 },
    { ...lineLayer(), name: 'Veil', at: 0.3, width: 0.1, paint: { kind: 'solid', color: veil }, waveAmplitude: 0.5, waveFit: 4, wavePhase: 0.25, opacity: 0.4 },
    { ...lineLayer(), name: 'Edge light', at: 0.18, width: 0.2, paint: { kind: 'solid', color: edge }, waveAmplitude: 0.08, waveFit: 3, blend: 'screen', opacity: 0.9 },
    { ...lineLayer(), name: 'Edge light', at: 0.82, width: 0.16, paint: { kind: 'solid', color: edge }, waveAmplitude: 0.08, waveFit: 2.5, wavePhase: 0.5, blend: 'screen', opacity: 0.7 },
    { ...lineLayer(), name: 'Veil', at: 0.4, width: 0.12, paint: { kind: 'solid', color: veil }, waveAmplitude: 0.4, waveFit: 3.4, opacity: 0.45 },
    { ...lineLayer(), name: 'Veil', at: 0.6, width: 0.1, paint: { kind: 'solid', color: veil }, waveAmplitude: 0.35, waveFit: 2.6, wavePhase: 0.5, opacity: 0.4 },
    { ...textureLayer('smoke'), name: 'Wisps', from: 0.05, to: 0.95, color: wisp, color2: null, amount: 0.7, strength: 0.7, seed: 0x5e0c, blend: 'screen' },
  ]),
  name: 'Storm',
  clip: 'band',
  effects: [stormDistort(0.12, 2.2, 7), spinBlur(0.3), blur(0.05)],
});
const lightning = (color: string, glowColor: string): Layer => ({
  ...fractureLayer(), kind: 'lightning', name: 'Lightning', from: 0.1, to: 0.9, count: 5, length: 1.4, branching: 0.6, jagged: 0.8, width: 0.025, color, seed: 0x11e7,
  effects: [glow({ color: glowColor, opacity: 0.9, size: 0.1 })],
});
// border-plates
const PLATES_STAGE = { thickness: 0.24, outerSpacing: 0.02 };
const PLATE_IRON = ['#0c0c08', '#34342a', '#66665a', '#a6a69a', '#e8e8e0'];
const plateRing = (stops: string[], picture: 'hammered-metal' | 'metal-plate' = 'hammered-metal'): Layer[] =>
  bandShading([{ ...bandFillLayer(), name: 'Iron ring', paint: photo(picture, 1.4, { lighting: 0.3 }), effects: [recolour(stops), DROP] }], { step: null });
/** Plates laid round the band, kept inside it; a little turn and size variety if `loose`. */
const loosePlates = (name: string, at: number, count: number, size: number, fill: string, stops: string[], o: { loose?: boolean; offset?: number; seed?: number } = {}): Layer => ({
  ...repeatLayer(), name, element: 'square', count, snapToCorners: false, at, size, stretch: 1.5, offset: o.offset ?? 0, fill, shaded: false, raised: false,
  clip: 'band', jitterSize: o.loose ? 0.15 : 0, jitterAngle: o.loose ? 8 : 0, seed: o.seed ?? 11,
  effects: [...metalFx(stops, 0.12, 0.6), contact(0.8)],
});
/** Plates that bend with the ring: one ring of metal with radial gaps cut out of it (a group that subtracts). */
const curvedPlates = (name: string, count: number, fill: string, stops: string[], o: { from?: number; to?: number; gap?: number; offset?: number } = {}): Layer => ({
  ...groupLayer([
    { ...bandFillLayer(), name: 'Plate ring', from: o.from ?? 0.1, to: o.to ?? 0.9, paint: { kind: 'solid', color: fill } },
    { ...repeatLayer(), name: 'Gaps', element: 'square', count, snapToCorners: false, at: ((o.from ?? 0.1) + (o.to ?? 0.9)) / 2, offset: o.offset ?? 0, size: ((o.to ?? 0.9) - (o.from ?? 0.1)) * 1.3, stretch: (o.gap ?? 0.06) / (((o.to ?? 0.9) - (o.from ?? 0.1)) * 1.3), fill: '#000000', raised: false, shaded: false },
  ]),
  name, combine: 'subtract', effects: [...metalFx(stops, 0.12, 0.6), contact(0.8)],
});
const plateRivets = (name: string, at: number, count: number, fill: string, stops: string[], offset = 0): Layer => ({
  ...repeatLayer(), name, element: 'bead', count, snapToCorners: false, at, offset, size: 0.09, fill, raised: true, effects: [...metalFx(stops, 0.6, 0.8), contact(0.7)],
});

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
    shading: {},
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
    shading: {},
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
    shading: {},
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
    shading: {},
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
    shading: {},
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
    shading: {},
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
    shading: {},
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
  // ── oak ──
  {
    id: 'oak-varnished',
    shading: {},
    name: 'Varnished oak',
    description: 'Real oak grain under a glossy varnish, with a pressed-in step.',
    group: 'Textures',
    after: 'oak',
    colours: [slot('wood', 'Wood colour', '#8a5a32', ['Oak', 'Pressed-in oak'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Oak', paint: photo('wood-planks', 1.4, { angle: 90, lighting: 0.4 }), effects: [recolour(OAK), bevel({ size: 0.35, gloss: 0.7, highlightOpacity: 0.6, soften: 0.02 }), DROP] },
      { ...bandFillLayer(), name: 'Pressed-in oak', from: 0.55, to: 1, paint: lin(['#140a04', '#c89060']), opacity: 0.45, blend: 'soft-light' },
      { ...lineLayer(), name: 'Crease', at: 0.55, width: 0.03, opacity: 0.55, blend: 'overlay', paint: { kind: 'solid', color: '#190500' } },
      ...rims(),
    ],
  },
  {
    id: 'oak-brass-bound',
    name: 'Brass-bound oak',
    description: 'Oak bound by two brass bands and studded with brass nails, like an old sea chest.',
    group: 'Textures',
    after: 'oak',
    colours: [slot('wood', 'Wood colour', '#8a5a32', ['Oak']), slot('metal', 'Metal colour', '#a87a3a', ['Outer brass', 'Inner brass', 'Nails'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Oak', paint: photo('medieval-wood', 1.6, { angle: 90, lighting: 0.5 }), effects: [recolour(OAK), DROP] },
      { ...bandFillLayer(), name: 'Outer brass', to: 0.2, paint: photo('hammered-metal', 1.4), effects: metalFx(BRONZE_STOPS, 0.5, 0.8) },
      { ...bandFillLayer(), name: 'Inner brass', from: 0.8, paint: photo('hammered-metal', 1.4), effects: metalFx(BRONZE_STOPS, 0.5, 0.8) },
      { ...repeatLayer(), name: 'Nails', element: 'bead', count: 12, at: 0.5, size: 0.24, fill: '#a87a3a', raised: true, effects: [recolour(BRONZE_STOPS), contact(0.6)] },
    ],
  },
  {
    id: 'oak-rune-carved',
    shading: {},
    name: 'Rune-carved oak',
    description: 'Dark oak with a BabelStone runic inscription carved deep into it.',
    group: 'Textures',
    after: 'oak',
    colours: [slot('wood', 'Wood colour', '#6a4024', ['Oak'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Oak', paint: photo('medieval-wood', 1.6, { angle: 90, lighting: 0.5 }), effects: [recolour(['#0a0402', '#2a160a', '#6a4024', '#a87850', '#e0c098']), bevel({ size: 0.3, gloss: 0.3 }), DROP] },
      inscription('babelstone', '#1a0c04', { name: 'Carved runes', size: 0.46, spacing: 0.18, effects: [bevel({ direction: 'sunken', size: 0.6, gloss: 0.2, highlightOpacity: 0.5 })] }),
      ...rims(),
    ],
  },
  {
    id: 'oak-living-bark',
    shading: {},
    name: 'Living bark',
    description: 'Rough tree bark with patches of moss growing over it.',
    group: 'Textures',
    after: 'oak',
    colours: [slot('bark', 'Bark colour', '#56473c', ['Bark']), slot('moss', 'Moss colour', '#6a8a2a', ['Moss'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Bark', paint: photo('plane-bark', 2, { angle: 90, lighting: 0.6 }), effects: [bevel({ profile: 'rounded', size: 0.45, gloss: 0.1, highlightOpacity: 0.4 }), DROP] },
      { ...textureLayer('lichen'), name: 'Moss', color: '#6a8a2a', amount: 1.3, opacity: 0.9, seed: 0x11c4 },
    ],
  },
  // ── magma ──
  {
    id: 'magma-crust',
    name: 'Cooling crust',
    description: 'Dark plates of cooled rock on bright molten lava glowing through every gap.',
    group: 'Textures',
    after: 'magma',
    stage: { bloom: 0.3, bleed: 0.2 },
    colours: [slot('fire', 'Lava colour', '#ff6a1a', ['Molten lava']), slot('rock', 'Crust colour', '#2a1e1c', ['Crust'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Molten lava', paint: lin(['#ffe080', '#ff6a1a', '#a01a02']), effects: [glow({ color: '#ff6a1a', opacity: 0.6, size: 0.14 }), DROP] },
      { ...cellsLayer(), name: 'Crust', pattern: 'voronoi', size: 0.55, gap: 0.06, jitter: 0.9, rounding: 0.35, vary: 0.3, color: '#2a1e1c', effects: [bevel({ profile: 'rounded', size: 0.25, gloss: 0.2, surface: 'cracked', surfaceDepth: 0.5, highlightOpacity: 0.3 })] },
    ],
  },
  {
    id: 'magma-obsidian-fire',
    name: 'Obsidian & fire',
    description: 'Black volcanic glass with fire glowing along both edges.',
    group: 'Textures',
    after: 'magma',
    stage: { bloom: 0.3 },
    colours: [slot('glass', 'Glass colour', '#1a1416', ['Band']), slot('fire', 'Fire colour', '#ff6a1a', ['Outer fire', 'Inner fire'])],
    layers: () => [
      ...base({ light: '#4a3a3e', dark: '#020102', step: null, rims: false }),
      overlay('black-onyx', 6, 'overlay', 0.7),
      hotRing('Outer fire', 0.05),
      hotRing('Inner fire', 0.95),
    ],
  },
  {
    id: 'magma-embers',
    shading: {},
    name: 'Ember streaks',
    description: 'Streaks of embers round the band, with sparks drifting off them.',
    group: 'Textures',
    after: 'magma',
    stage: { bloom: 0.25 },
    colours: [slot('fire', 'Ember colour', '#ff6a1a', ['Embers', 'Sparks'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Embers', paint: photo('molten-rock', 2, { angle: 90 }), effects: [adjust({ contrast: 0.3 }), bevel({ size: 0.3, gloss: 0.3, highlightOpacity: 0.3 }), DROP] },
      { ...textureLayer('sparkle'), name: 'Sparks', color: '#ffc060', amount: 0.5, scale: 0.5, seed: 0x5a2d, effects: [glow({ color: '#ff6a1a', opacity: 0.7, size: 0.06 })] },
    ],
  },
  {
    id: 'magma-script',
    name: 'Volcanic script',
    description: 'Dark basalt with a Sith AF inscription glowing like magma between two hot seams.',
    group: 'Textures',
    after: 'magma',
    stage: { bloom: 0.25 },
    colours: [slot('rock', 'Rock colour', '#211c17', ['Basalt']), slot('fire', 'Fire colour', '#ff5a10', ['Glowing script', 'Outer seam', 'Inner seam'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Basalt', paint: photo('dark-rock', 2.4, { lighting: 0.5 }), effects: [adjust({ brightness: -0.2 }), bevel({ profile: 'chisel', size: 0.3, gloss: 0.2, highlightOpacity: 0.3 }), DROP] },
      inscription('sith', '#ffe0a0', { name: 'Glowing script', size: 0.44, start: 2, effects: [glow({ inner: true, color: '#fff4c0', opacity: 0.6, size: 0.04 }), glow({ color: '#ff5a10', opacity: 0.9, size: 0.18 })] }),
      hotRing('Outer seam', 0.08, '#ff5a10'),
      hotRing('Inner seam', 0.92, '#ff5a10'),
    ],
  },
  // ── harlequin ──
  {
    id: 'harlequin-jester',
    name: 'Jester’s diamonds',
    description: 'Glossy diamonds in two colours with gold piping along both edges.',
    group: 'Textures',
    after: 'harlequin',
    colours: [slot('first', 'First colour', '#8c2f4a', ['Band', 'Dark diamonds']), slot('second', 'Second colour', '#e8c050', ['Light diamonds']), slot('trim', 'Trim colour', '#c8952e', ['Outer piping', 'Inner piping'])],
    layers: () => [
      ...base({ light: '#d04a6a', dark: '#3a0a18', step: null, rims: false }),
      diamonds('Light diamonds', '#e8c050', 0.5),
      goldPiping('Outer piping', 0.04),
      goldPiping('Inner piping', 0.96),
    ],
  },
  {
    id: 'harlequin-velvet',
    shading: {},
    name: 'Velvet harlequin',
    description: 'Patterned velvet with a satin sheen and gold cord edges.',
    group: 'Textures',
    after: 'harlequin',
    colours: [slot('velvet', 'Velvet colour', '#930320', ['Velvet']), slot('trim', 'Trim colour', '#c8952e', ['Outer piping', 'Inner piping'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Velvet', paint: photo('jacquard', 1.2, { lighting: 0.6 }), effects: [bevel({ size: 0.5, gloss: 0.2, highlightOpacity: 0.35 }), DROP] },
      { ...diamonds('Sheen', '#ffffff', 0.5, []), opacity: 0.12, blend: 'screen' },
      goldPiping('Outer piping', 0.04),
      goldPiping('Inner piping', 0.96),
    ],
  },
  {
    id: 'harlequin-checker',
    name: 'Checkered enamel',
    description: 'A two-colour chequerboard in glossy enamel between rims.',
    group: 'Textures',
    after: 'harlequin',
    colours: [slot('first', 'First colour', '#1a1a1a', ['Band']), slot('second', 'Second colour', '#f0ece4', ['Squares'])],
    layers: () => [
      ...base({ light: '#4a4a4a', dark: '#050505', step: null, rims: false }),
      { ...repeatLayer(), name: 'Squares', element: 'square', mode: 'count', count: 24, snapToCorners: true, at: 0.25, size: 0.56, stretch: 1.3, fill: '#f0ece4', raised: false, shaded: false, clip: 'band', effects: [bevel({ size: 0.1, gloss: 0.8, highlightOpacity: 0.4 })] },
      { ...repeatLayer(), name: 'Squares', element: 'square', mode: 'count', count: 24, snapToCorners: true, offset: 0.5, at: 0.75, size: 0.56, stretch: 1.3, fill: '#f0ece4', raised: false, shaded: false, clip: 'band', effects: [bevel({ size: 0.1, gloss: 0.8, highlightOpacity: 0.4 })] },
      ...rims(),
    ],
  },
  {
    id: 'harlequin-stained-glass',
    name: 'Stained glass',
    description: 'Pieces of coloured glass in dark leading, glowing softly.',
    group: 'Textures',
    after: 'harlequin',
    stage: { bloom: 0.2 },
    colours: [slot('glass', 'Glass colour', '#3a6ad0', ['Glass']), slot('lead', 'Leading colour', '#1a1a1e', ['Leading'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Leading', paint: lin(['#4a4a50', '#1a1a1e', '#050505']), effects: [DROP] },
      { ...cellsLayer(), name: 'Glass', pattern: 'voronoi', size: 0.55, gap: 0.07, jitter: 0.9, rounding: 0.1, vary: 0.9, color: '#3a6ad0', effects: [bevel({ size: 0.15, gloss: 0.9, highlightOpacity: 0.5 }), glow({ inner: true, color: '#ffffff', opacity: 0.25, size: 0.1 })] },
    ],
  },
  {
    id: 'harlequin-carnival',
    name: 'Carnival',
    description: 'Bright harlequin diamonds with little gold bells at the points.',
    group: 'Textures',
    after: 'harlequin',
    colours: [slot('first', 'First colour', '#2a6ad0', ['Band']), slot('second', 'Second colour', '#e03a3a', ['Light diamonds']), slot('bells', 'Bell colour', '#c8952e', ['Bells'])],
    layers: () => [
      ...base({ light: '#5a9aff', dark: '#0a1a50', step: null, rims: false }),
      diamonds('Light diamonds', '#e03a3a', 0.5),
      { ...repeatLayer(), name: 'Bells', element: 'bead', mode: 'spacing', spacing: 1.2, snapToCorners: false, at: 0.5, size: 0.28, fill: '#c8952e', raised: true, effects: [recolour(WARM_GOLD), contact(0.6)] },
      ...rims(),
    ],
  },
  // ── knotwork ──
  {
    id: 'knotwork-celtic-gold',
    shading: {},
    name: 'Celtic gold',
    description: 'Gold knotwork woven over and under on green enamel, between gold rims.',
    group: 'Textures',
    after: 'knotwork',
    colours: [slot('enamel', 'Enamel colour', '#1e5a34', ['Enamel']), slot('gold', 'Gold colour', '#c8952e', ['Gold knot', 'Outer rim', 'Inner rim'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Enamel', paint: lin(['#3a8a5a', '#1e5a34', '#04140a']), effects: [bevel({ direction: 'sunken', size: 0.1, gloss: 0.9, highlightOpacity: 0.4 }), DROP] },
      { ...knot('Gold knot', '#c8952e'), effects: [...goldFx(0.4, WARM_GOLD)] },
      { ...lineLayer(), name: 'Outer rim', at: 0.03, width: 0.06, paint: goldPaint(1.4), effects: goldFx(0.6, WARM_GOLD) },
      { ...lineLayer(), name: 'Inner rim', at: 0.97, width: 0.06, paint: goldPaint(1.4), effects: goldFx(0.6, WARM_GOLD) },
    ],
  },
  {
    id: 'knotwork-silver',
    name: 'Silver on black',
    description: 'Bright silver knotwork on glossy black.',
    group: 'Textures',
    after: 'knotwork',
    colours: [slot('band', 'Band colour', '#1a1a20', ['Band']), slot('metal', 'Metal colour', '#a8aeb8', ['Silver knot'])],
    layers: () => [
      ...base({ light: '#4a4a58', dark: '#050508', step: null, rims: false }),
      { ...knot('Silver knot', '#c8ccd4'), effects: metalFx(SILVER_STOPS, 0.4, 0.9) },
      ...rims(),
    ],
  },
  {
    id: 'knotwork-carved-stone',
    shading: {},
    name: 'Carved stone knot',
    description: 'Knotwork carved into weathered stone, with BabelStone runes along the inner edge.',
    group: 'Textures',
    after: 'knotwork',
    colours: [slot('stone', 'Stone colour', '#908372', ['Stone'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Stone', paint: photo('coral-stone', 1.6, { lighting: 0.6 }), effects: [bevel({ profile: 'chisel', size: 0.2, gloss: 0.1, highlightOpacity: 0.4 }), DROP] },
      { ...knot('Carved knot', '#5a5044', { at: 0.42, width: 0.2, amplitude: 0.22, outline: null }), opacity: 0.8, blend: 'multiply', effects: [bevel({ direction: 'sunken', size: 0.5, gloss: 0.1, highlightOpacity: 0.5 })] },
      inscription('babelstone', '#3a3228', { name: 'Carved runes', at: 0.86, size: 0.2, spacing: 0.2, effects: [bevel({ direction: 'sunken', size: 0.6, gloss: 0.1 })] }),
    ],
  },
  {
    id: 'knotwork-leather',
    name: 'Braided leather',
    description: 'Tan leather strips braided over dark leather, with stitched edges.',
    group: 'Textures',
    after: 'knotwork',
    colours: [slot('leather', 'Leather colour', '#3a1e0e', ['Leather']), slot('braid', 'Braid colour', '#b07040', ['Braid', 'Stitching'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Leather', paint: photo('leather', 1.6, { lighting: 0.6 }), effects: [recolour(['#0a0402', '#1e0e06', '#3a1e0e', '#6a3e22']), DROP] },
      { ...knot('Braid', '#b07040'), effects: [bevel({ size: 0.5, gloss: 0.3, highlightOpacity: 0.5 }), contact(0.5)] },
      { ...lineLayer(), name: 'Stitching', at: 0.07, width: 0.03, dash: 'dashed', paint: { kind: 'solid', color: '#b07040' } },
      { ...lineLayer(), name: 'Stitching', at: 0.93, width: 0.03, dash: 'dashed', paint: { kind: 'solid', color: '#b07040' } },
    ],
  },
  {
    id: 'knotwork-fey',
    name: 'Fey knot',
    description: 'A glowing knot of light woven through a dark band.',
    group: 'Textures',
    after: 'knotwork',
    stage: { bloom: 0.3 },
    colours: [slot('band', 'Band colour', '#141a2a', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#6affd8', ['Glowing knot'])],
    layers: () => [
      ...base({ light: '#2a3448', dark: '#020306', step: 0.55 }),
      { ...knot('Glowing knot', '#d8fff4', { outline: null, width: 0.16 }), effects: [glow({ color: '#6affd8', opacity: 0.9, size: 0.16 })] },
    ],
  },
  // ── starfield ──
  {
    id: 'starfield-deep-space',
    name: 'Deep space',
    description: 'A violet nebula drifting through stars, between thin silver rims.',
    group: 'Textures',
    after: 'starfield',
    stage: { bloom: 0.2 },
    colours: [slot('sky', 'Sky colour', '#2a1a5a', ['Band']), slot('nebula', 'Nebula colour', '#d04ab0', ['Nebula'])],
    layers: () => [
      ...base({ light: '#3a2a7a', dark: '#04020e', step: null, rims: false }),
      { ...textureLayer('nebula'), name: 'Nebula', color: '#d04ab0', color2: '#3a6aff', opacity: 0.8, blend: 'screen', seed: 0x2ec },
      { ...textureLayer('sparkle'), name: 'Stars', color: '#ffffff', amount: 1.4, scale: 0.5, seed: 0x5a2e },
      { ...lineLayer(), name: 'Silver rim', at: 0.025, width: 0.05, paint: silver, effects: [bevel({ size: 0.6, gloss: 0.9 })] },
      { ...lineLayer(), name: 'Silver rim', at: 0.975, width: 0.05, paint: silver, effects: [bevel({ size: 0.6, gloss: 0.9 })] },
    ],
  },
  {
    id: 'starfield-star-chart',
    name: 'Star chart',
    description: 'A navigator\'s star chart with gold rings and an Outer Rim AF inscription.',
    group: 'Textures',
    after: 'starfield',
    colours: [slot('sky', 'Chart colour', '#0e1a40', ['Band', 'Stars']), slot('ink', 'Ink colour', '#e8c878', ['Chart rings', 'Chart script', 'Compass points'])],
    layers: () => [
      ...base({ light: '#2a3a7a', dark: '#02040e', step: null, rims: false }),
      { ...textureLayer('sparkle'), name: 'Stars', color: '#c8d8ff', amount: 0.8, scale: 0.4, seed: 0x5a2f },
      { ...lineLayer(), name: 'Chart rings', at: 0.12, width: 0.025, paint: { kind: 'solid', color: '#e8c878' } },
      { ...lineLayer(), name: 'Chart rings', at: 0.88, width: 0.025, paint: { kind: 'solid', color: '#e8c878' } },
      inscription('outerRim', '#e8c878', { name: 'Chart script', size: 0.38, start: 1 }),
      { ...shapeLayer(), name: 'Compass points', shape: 'star', sides: 4, innerRatio: 0.3, along: 0, across: 0.5, size: 0.85, fill: '#e8c878', outline: null, raised: false, mirror: 'four', effects: [glow({ color: '#ffe0a0', opacity: 0.5, size: 0.1 })] },
    ],
  },
  {
    id: 'starfield-galaxy',
    name: 'Galaxy swirl',
    description: 'Stars and gas whirling round the band like a spiral galaxy.',
    group: 'Textures',
    after: 'starfield',
    stage: { bloom: 0.3 },
    colours: [slot('sky', 'Sky colour', '#140a30', ['Band']), slot('core', 'Glow colour', '#8a6aff', ['Swirl'])],
    layers: () => [
      ...base({ light: '#2a1a5a', dark: '#020108', step: null, rims: false }),
      { ...textureLayer('nebula'), name: 'Swirl', color: '#8a6aff', color2: '#ff6ac8', opacity: 0.9, blend: 'screen', seed: 0x2ed, effects: [{ kind: 'blur', on: true, mode: 'spin', amount: 0.6, keepShape: true }] },
      { ...textureLayer('sparkle'), name: 'Stars', color: '#ffffff', amount: 1.2, scale: 0.45, seed: 0x5a30 },
    ],
  },
  {
    id: 'starfield-moons',
    name: 'Moon phases',
    description: 'Silver moons waxing and waning round a starry midnight band.',
    group: 'Textures',
    after: 'starfield',
    colours: [slot('sky', 'Sky colour', '#141c3a', ['Band', 'Stars']), slot('moon', 'Moon colour', '#e4e8f0', ['Moons'])],
    layers: () => [
      ...base({ light: '#2a3a6a', dark: '#02040a', step: null }),
      { ...textureLayer('sparkle'), name: 'Stars', color: '#e8ecff', amount: 0.8, scale: 0.45, seed: 0x5a31 },
      { ...repeatLayer(), name: 'Moons', element: 'circle', count: 8, at: 0.5, size: 0.7, fill: '#e4e8f0', raised: false, effects: [bevel({ size: 0.6, gloss: 0.6 }), glow({ color: '#c8d8ff', opacity: 0.5, size: 0.1 })] },
      { ...repeatLayer(), name: 'Moon shadows', element: 'circle', count: 8, at: 0.44, size: 0.62, fill: '#0a0e1e', raised: false, shaded: false, opacity: 0.9, offset: 0.06 },
    ],
  },
  {
    id: 'starfield-aurora',
    name: 'Aurora',
    description: 'Ribbons of green and violet aurora over a starry night.',
    group: 'Textures',
    after: 'starfield',
    stage: { bloom: 0.3 },
    colours: [slot('first', 'First light', '#40ffa0', ['Aurora']), slot('second', 'Second light', '#a060ff', ['Aurora glow'])],
    layers: () => [
      ...base({ light: '#1a2a4a', dark: '#020408', step: null, rims: false }),
      { ...textureLayer('sparkle'), name: 'Stars', color: '#ffffff', amount: 0.9, scale: 0.4, seed: 0x5a32 },
      { ...bandFillLayer(), name: 'Aurora', from: 0.15, to: 0.6, paint: lin(['#40ffa0', '#40ffa0', '#20a0ff'], 0), opacity: 0.6, blend: 'screen', clip: 'band', effects: [blur(0.06)] },
      { ...bandFillLayer(), name: 'Aurora glow', from: 0.4, to: 0.85, paint: lin(['#a060ff', '#ff60c0'], 0), opacity: 0.5, blend: 'screen', clip: 'band', effects: [blur(0.06)] },
      overlay('blue-onyx', 8, 'soft-light', 0.3),
    ],
  },
  // ── bard ──
  {
    id: 'bard-lute',
    shading: {},
    name: 'Lute',
    description: 'Polished lute wood with strings running round it and gold notes along them.',
    group: 'Classes',
    after: 'bard',
    colours: [slot('wood', 'Wood colour', '#9a6a3a', ['Wood']), slot('notes', 'Note colour', '#c8952e', ['Notes'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Wood', paint: photo('wood-planks', 1.4, { angle: 90, lighting: 0.4 }), effects: [recolour(LUTE), bevel({ size: 0.35, gloss: 0.7, highlightOpacity: 0.6 }), DROP] },
      ...[0.3, 0.43, 0.57, 0.7].map((at) => ({ ...lineLayer(), name: 'Strings', at, width: 0.015, paint: { kind: 'solid' as const, color: '#f4f0e8' }, effects: [contact(0.5)] })),
      { ...repeatLayer(), name: 'Notes', element: 'bardNote', count: 8, at: 0.5, size: 1.05, fill: '#c8952e', raised: true, effects: [recolour(WARM_GOLD), bevel({ size: 0.5, gloss: 0.8 }), contact(0.6)] },
    ],
  },
  {
    id: 'bard-velvet',
    name: 'Velvet & gold',
    description: 'Plum velvet between gold rims, with glowing gold notes.',
    group: 'Classes',
    after: 'bard',
    stage: { bloom: 0.15 },
    colours: [slot('velvet', 'Velvet colour', '#5a1a5a', ['Velvet']), slot('gold', 'Gold colour', '#c8952e', ['Outer gold', 'Inner gold', 'Notes'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Velvet', paint: photo('jacquard', 1.2, { lighting: 0.6 }), effects: [recolour(['#1a061a', '#4a1a4a', '#8a3a8a', '#d08ad0']), bevel({ size: 0.5, gloss: 0.2, highlightOpacity: 0.35 }), DROP] },
      { ...bandFillLayer(), name: 'Outer gold', to: 0.14, paint: goldPaint(1.4), effects: goldFx(0.5, WARM_GOLD) },
      { ...bandFillLayer(), name: 'Inner gold', from: 0.86, paint: goldPaint(1.4), effects: goldFx(0.5, WARM_GOLD) },
      { ...repeatLayer(), name: 'Notes', element: 'note', count: 10, at: 0.5, size: 0.85, fill: '#f0d080', raised: false, shaded: false, effects: [glow({ color: '#ffc040', opacity: 0.7, size: 0.1 })] },
    ],
  },
  {
    id: 'bard-starlit',
    name: 'Starlit song',
    description: 'Notes glowing like stars on a deep violet night, with a Yugurian lyric.',
    group: 'Classes',
    after: 'bard',
    stage: { bloom: 0.3 },
    colours: [slot('band', 'Frame colour', '#2a1048', ['Band', 'Sparkle']), slot('glow', 'Glow colour', '#d08aff', ['Notes', 'Lyric'])],
    layers: () => [
      ...base({ light: '#4a2a7a', dark: '#06020e', step: null, rims: false }),
      { ...textureLayer('sparkle'), name: 'Sparkle', color: '#f0e0ff', amount: 0.9, scale: 0.45, seed: 0x5a33 },
      { ...repeatLayer(), name: 'Notes', element: 'bardNote', count: 8, at: 0.4, size: 0.55, fill: '#f8e8ff', raised: false, shaded: false, effects: [glow({ color: '#d08aff', opacity: 0.9, size: 0.14 })] },
      inscription('yugurian', '#f0d8ff', { name: 'Lyric', at: 0.86, size: 0.2, start: 6, effects: [glow({ color: '#d08aff', opacity: 0.7, size: 0.08 })] }),
      ...rims(),
    ],
  },
  {
    id: 'bard-lyre',
    name: 'Golden lyre',
    description: 'Purple enamel with gold lyres at the quarters and fine gold lines.',
    group: 'Classes',
    after: 'bard',
    colours: [slot('enamel', 'Enamel colour', '#6a2a8a', ['Enamel']), slot('gold', 'Gold colour', '#c8952e', ['Lyres', 'Gold lines'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Enamel', paint: lin(['#a05ad0', '#6a2a8a', '#1a0626']), effects: [bevel({ direction: 'sunken', size: 0.12, gloss: 0.9, highlightOpacity: 0.5 }), DROP] },
      { ...lineLayer(), name: 'Gold lines', at: 0.08, width: 0.06, paint: goldPaint(1.4), effects: goldFx(0.6, WARM_GOLD) },
      { ...lineLayer(), name: 'Gold lines', at: 0.92, width: 0.06, paint: goldPaint(1.4), effects: goldFx(0.6, WARM_GOLD) },
      { ...repeatLayer(), name: 'Lyres', element: 'icon-lyre', count: 4, at: 0.5, size: 1.4, fill: '#c8952e', raised: true, effects: [recolour(WARM_GOLD), bevel({ size: 0.4, gloss: 0.8 }), contact(0.6)] },
    ],
  },
  // ── cleric ──
  {
    id: 'cleric-holy-light',
    name: 'Holy light',
    description: 'A white-gold band glowing with radiant light, with a BabelStone prayer in gold.',
    group: 'Classes',
    after: 'cleric',
    stage: { bloom: 0.35, bleed: 0.2 },
    colours: [slot('band', 'Frame colour', '#fff0c0', ['Band', 'Pressed-in step']), slot('glow', 'Light colour', '#ffd870', ['Radiance', 'Prayer'])],
    layers: () => [
      ...base({ light: '#ffffff', dark: '#c8a050', step: 0.55 }),
      { ...lineLayer(), name: 'Radiance', at: 0.55, width: 0.04, paint: { kind: 'solid', color: '#ffffff' }, effects: [glow({ color: '#ffd870', opacity: 0.9, size: 0.2 })] },
      inscription('babelstone', '#a07010', { name: 'Prayer', at: 0.28, size: 0.32, effects: [glow({ color: '#ffd870', opacity: 0.5, size: 0.06 })] }),
    ],
  },
  {
    id: 'cleric-silver',
    shading: {},
    name: 'Silver & sapphire',
    description: 'Polished silver with holy symbols at the quarters between cut sapphires.',
    group: 'Classes',
    after: 'cleric',
    colours: [slot('metal', 'Metal colour', '#a8aeb8', ['Silver', 'Symbols']), slot('gems', 'Gem colour', '#2a5ad0', ['Sapphires'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Silver', paint: photo('hammered-metal', 2.4), effects: [...metalFx(SILVER_STOPS, 0.35, 0.9), DROP] },
      { ...repeatLayer(), name: 'Symbols', element: 'icon-holy-symbol', count: 4, at: 0.5, size: 1.4, fill: '#c8ccd4', raised: true, effects: [recolour(SILVER_STOPS), bevel({ size: 0.4, gloss: 0.9 }), contact(0.6)] },
      { ...repeatLayer(), name: 'Sapphires', element: 'gem', count: 8, offset: 0.5, at: 0.5, size: 0.5, fill: '#2a5ad0', raised: false, gemSparkle: 0.7, effects: [contact(0.5)] },
    ],
  },
  {
    id: 'cleric-temple',
    name: 'Temple marble',
    description: 'White marble with gold inlaid lines and golden suns at the quarters.',
    group: 'Classes',
    after: 'cleric',
    colours: [slot('stone', 'Marble colour', '#ece6dc', ['Band', 'Texture']), slot('gold', 'Gold colour', '#c8952e', ['Gold lines', 'Suns'])],
    layers: () => [
      ...base({ light: '#ffffff', dark: '#8a8278', step: null, rims: false }),
      overlay('marble', 1.4, 'multiply', 0.6, { lighting: 0.3 }),
      { ...lineLayer(), name: 'Gold lines', at: 0.14, width: 0.05, paint: goldPaint(1.4), effects: goldFx(0.6, WARM_GOLD) },
      { ...lineLayer(), name: 'Gold lines', at: 0.86, width: 0.05, paint: goldPaint(1.4), effects: goldFx(0.6, WARM_GOLD) },
      { ...repeatLayer(), name: 'Suns', element: 'icon-heraldic-sun', count: 4, at: 0.5, size: 1.4, fill: '#c8952e', raised: true, effects: [recolour(WARM_GOLD), bevel({ size: 0.4, gloss: 0.8 }), contact(0.5)] },
      ...rims(),
    ],
  },
  {
    id: 'cleric-dawn',
    name: 'Dawn',
    description: 'A dawn gradient of rose and gold with a soft glowing seam.',
    group: 'Classes',
    after: 'cleric',
    stage: { bloom: 0.2 },
    colours: [slot('band', 'Frame colour', '#ffb070', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#fff0c0', ['Dawn seam'])],
    layers: () => [
      ...base({ light: '#fff0b0', dark: '#a03a5a', step: 0.55, stepLight: '#ffd080', stepDark: '#6a1a3a' }),
      { ...lineLayer(), name: 'Dawn seam', at: 0.55, width: 0.03, paint: { kind: 'solid', color: '#fff0c0' }, effects: [glow({ color: '#ffd080', opacity: 0.8, size: 0.14 })] },
    ],
  },
  // ── druid ──
  {
    id: 'druid-stone-circle',
    shading: {},
    name: 'Glowing stone circle',
    description: 'Mossy standing stone with green BabelStone runes glowing in it.',
    group: 'Classes',
    after: 'druid',
    stage: { bloom: 0.25 },
    colours: [slot('stone', 'Stone colour', '#6c6b57', ['Stone']), slot('glow', 'Glow colour', '#8aff6a', ['Glowing runes'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Stone', paint: photo('mossy-rock', 1.6, { lighting: 0.6 }), effects: [bevel({ profile: 'chisel', size: 0.25, gloss: 0.15, highlightOpacity: 0.4 }), DROP] },
      inscription('babelstone', '#e0ffd0', { name: 'Glowing runes', size: 0.4, start: 5, effects: [glow({ inner: true, color: '#ffffff', opacity: 0.4, size: 0.04 }), glow({ color: '#8aff6a', opacity: 0.9, size: 0.14 })] }),
    ],
  },
  // ── fighter ──
  {
    id: 'fighter-battle-steel',
    shading: {},
    name: 'Battle steel',
    description: 'Bright steel with battle scratches and a ring of domed rivets.',
    group: 'Classes',
    after: 'fighter',
    colours: [slot('metal', 'Metal colour', '#7a828c', ['Steel', 'Rivets'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Steel', paint: fighterSteel(), effects: [wear({ chips: 0.02, polish: 0.6, grime: 0.2, scale: 0.1, scratches: 0.6 }), ...metalFx(STEEL_STOPS, 0.3, 0.8), DROP] },
      { ...repeatLayer(), name: 'Rivets', element: 'bead', count: 16, at: 0.5, size: 0.26, fill: '#a8b0ba', raised: true, effects: [recolour(STEEL_STOPS), contact(0.7)] },
      ...rims(),
    ],
  },
  {
    id: 'fighter-shield-wall',
    name: 'Shield wall',
    description: 'A row of painted shields rimmed in steel.',
    group: 'Classes',
    after: 'fighter',
    colours: [slot('paint', 'Shield colour', '#8a1a1a', ['Shields']), slot('metal', 'Metal colour', '#7a828c', ['Outer steel', 'Inner steel'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Under', paint: { kind: 'solid', color: '#1a1a1a' }, effects: [DROP] },
      { ...cellsLayer(), name: 'Shields', pattern: 'grid', from: 0.15, to: 0.85, size: 0.75, gap: 0.06, rounding: 0.4, vary: 0.35, color: '#8a1a1a', effects: [bevel({ profile: 'rounded', size: 0.3, gloss: 0.5, highlightOpacity: 0.5 })] },
      { ...bandFillLayer(), name: 'Outer steel', to: 0.16, paint: fighterSteel(1.4), effects: metalFx(STEEL_STOPS, 0.5, 0.8) },
      { ...bandFillLayer(), name: 'Inner steel', from: 0.84, paint: fighterSteel(1.4), effects: metalFx(STEEL_STOPS, 0.5, 0.8) },
    ],
  },
  {
    id: 'fighter-chainmail',
    name: 'Chainmail',
    description: 'Interlinked steel rings between leather edges.',
    group: 'Classes',
    after: 'fighter',
    colours: [slot('metal', 'Metal colour', '#a8aeb8', ['Mail']), slot('leather', 'Leather colour', '#5a3418', ['Outer leather', 'Inner leather'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Under', paint: { kind: 'solid', color: '#3a3e46' }, effects: [DROP] },
      { ...textureLayer('chainmail'), name: 'Mail', color: '#a8aeb8', from: 0.12, to: 0.88, seed: 1, effects: [bevel({ size: 0.2, gloss: 0.8 })] },
      { ...bandFillLayer(), name: 'Outer leather', to: 0.14, paint: photo('leather', 1.4, { lighting: 0.6 }), effects: [recolour(['#0a0402', '#2a1408', '#5a3418', '#8a6040']), bevel({ size: 0.5, gloss: 0.2 })] },
      { ...bandFillLayer(), name: 'Inner leather', from: 0.86, paint: photo('leather', 1.4, { lighting: 0.6 }), effects: [recolour(['#0a0402', '#2a1408', '#5a3418', '#8a6040']), bevel({ size: 0.5, gloss: 0.2 })] },
    ],
  },
  {
    id: 'fighter-champion',
    shading: {},
    name: 'Champion',
    description: 'Red enamel between gold rims, studded with gold rivets.',
    group: 'Classes',
    after: 'fighter',
    colours: [slot('enamel', 'Enamel colour', '#a01a1a', ['Enamel']), slot('gold', 'Gold colour', '#c8952e', ['Outer gold', 'Inner gold', 'Rivets'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Enamel', paint: lin(['#e04a4a', '#a01a1a', '#2a0404']), effects: [bevel({ direction: 'sunken', size: 0.12, gloss: 0.9, highlightOpacity: 0.5 }), DROP] },
      { ...bandFillLayer(), name: 'Outer gold', to: 0.18, paint: goldPaint(1.4), effects: goldFx(0.5, WARM_GOLD) },
      { ...bandFillLayer(), name: 'Inner gold', from: 0.82, paint: goldPaint(1.4), effects: goldFx(0.5, WARM_GOLD) },
      { ...repeatLayer(), name: 'Rivets', element: 'bead', count: 12, at: 0.5, size: 0.24, fill: '#c8952e', raised: true, effects: [recolour(WARM_GOLD), contact(0.6)] },
    ],
  },
  // ── monk ──
  {
    id: 'monk-saffron',
    shading: {},
    name: 'Saffron robe',
    description: 'Folded saffron cloth with a knotted cord round its middle.',
    group: 'Classes',
    after: 'monk',
    colours: [slot('cloth', 'Cloth colour', '#e07a1a', ['Cloth']), slot('cord', 'Cord colour', '#8a2a1a', ['Cord', 'Twist'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Cloth', paint: photo('hessian', 0.8, { lighting: 0.6 }), effects: [recolour(['#2a0a02', '#8a3a06', '#e07a1a', '#ffc070']), bevel({ size: 0.6, gloss: 0.15, highlightOpacity: 0.35 }), DROP] },
      { ...bandFillLayer(), name: 'Cord', from: 0.36, to: 0.64, paint: lin(['#e06a5a', '#a03a2a', '#3a0804']), effects: [bevel({ size: 0.9, gloss: 0.4 }), contact(0.5)] },
      { ...textureLayer('rope'), name: 'Twist', from: 0.36, to: 0.64, color: '#c05a4a', seed: 0xbeae },
    ],
  },
  {
    id: 'monk-jade',
    name: 'Jade & gold',
    description: 'Polished jade between gold rims, with a Yugurian sutra in gold.',
    group: 'Classes',
    after: 'monk',
    colours: [slot('jade', 'Jade colour', '#3a9a6a', ['Jade']), slot('gold', 'Gold colour', '#c8952e', ['Outer gold', 'Inner gold', 'Sutra'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Jade', paint: photo('blue-onyx', 4, { angle: 60 }), effects: [recolour(['#021a0e', '#0e4a2a', '#3a9a6a', '#8ae0b0']), bevel({ size: 0.4, gloss: 0.95, highlightOpacity: 0.6 }), DROP] },
      { ...bandFillLayer(), name: 'Outer gold', to: 0.14, paint: goldPaint(1.4), effects: goldFx(0.5, WARM_GOLD) },
      { ...bandFillLayer(), name: 'Inner gold', from: 0.86, paint: goldPaint(1.4), effects: goldFx(0.5, WARM_GOLD) },
      inscription('yugurian', '#e8c060', { name: 'Sutra', size: 0.34, start: 7, effects: [bevel({ size: 0.4, gloss: 0.8 })] }),
    ],
  },
  {
    id: 'monk-ink',
    name: 'Ink circle',
    description: 'A single bold brushstroke of black ink on pale rice paper.',
    group: 'Classes',
    after: 'monk',
    colours: [slot('paper', 'Paper colour', '#f0e8d8', ['Band']), slot('ink', 'Ink colour', '#141414', ['Ink'])],
    layers: () => [
      ...base({ light: '#fffaf0', dark: '#b8ae98', step: null, rims: false }),
      { ...lineLayer(), name: 'Ink', at: 0.5, width: 0.55, paint: { kind: 'solid', color: '#141414' }, opacity: 0.92, effects: [{ kind: 'distort', on: true, amount: 0.12, scale: 0.25, seed: 4 }, blur(0.01)] },
      ...rims(),
    ],
  },
  // ── cobblestone ──
  {
    id: 'cobblestone-mossy',
    name: 'Mossy cobbles',
    description: 'Rounded cobblestones with moss and lichen creeping between them.',
    group: 'Textures',
    after: 'cobblestone',
    shading: {},
    colours: [slot('stone', 'Stone colour', '#928b80', ['Cobbles']), slot('moss', 'Moss colour', '#7a9a2a', ['Moss'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Cobbles', paint: photo('cobblestone', 1.4, { lighting: 0.7 }), effects: [bevel({ profile: 'rounded', size: 0.3, gloss: 0.15, highlightOpacity: 0.4 }), DROP] },
      { ...textureLayer('lichen'), name: 'Moss', color: '#7a9a2a', amount: 1, opacity: 0.85, seed: 0x11c5 },
      ...rims(),
    ],
  },
  // ── barbarian ──
  {
    id: 'barbarian-fur',
    shading: {},
    name: 'Fur trim',
    description: 'A thick ruff of fur over a leather band, with soft uneven edges like a real pelt.',
    group: 'Classes',
    after: 'barbarian',
    colours: [slot('fur', 'Fur colour', '#6a4a30', ['Fur']), slot('hide', 'Leather colour', '#4a2a14', ['Hide'])],
    layers: () => [
      hide('Hide', ['#0a0402', '#24120a', '#4a2a14', '#7a5030', '#a88060']),
      { ...textureLayer('feathers'), name: 'Fur', color: '#b08a60', from: 0.05, to: 0.75, scale: 0.6, amount: 1.4, seed: 0xfea9, effects: [{ kind: 'distort', on: true, amount: 0.05, scale: 0.15, seed: 5 }, blur(0.006), contact(0.5)] },
    ],
  },
  {
    id: 'barbarian-bone',
    name: 'Gnarled bone',
    description: 'Knotted, twisting bone grown into a ring, pale and weathered.',
    group: 'Classes',
    after: 'barbarian',
    colours: [slot('bone', 'Bone colour', '#d8c8a8', ['Bone', 'Roots'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Bone', from: 0.25, to: 0.75, paint: photo('coral-stone', 2, { lighting: 0.4 }), effects: [recolour(['#2a2014', '#7a6a50', '#d8c8a8', '#f8f0e0']), bevel({ profile: 'rounded', size: 0.9, depth: 1.3, gloss: 0.3 }), DROP] },
      { ...growthLayer('vine'), name: 'Roots', count: 2, thickness: 0.13, amplitude: 0.18, waveLength: 1.2, gnarl: 0.7, branching: 0, extra: 'none', color: '#c8b898', extraColor: '#a89878', effects: [bevel({ size: 0.6, gloss: 0.3 }), contact(0.6)] },
    ],
  },
  {
    id: 'barbarian-club',
    shading: {},
    name: 'War club',
    description: 'A ring of rough, gnarled wood like a war club, studded with iron nails.',
    group: 'Classes',
    after: 'barbarian',
    colours: [slot('wood', 'Wood colour', '#56473c', ['Club wood']), slot('studs', 'Stud colour', '#5a5a60', ['Studs'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Club wood', paint: photo('plane-bark', 1.6, { angle: 90, lighting: 0.6 }), effects: [adjust({ contrast: 0.2 }), bevel({ profile: 'rounded', size: 0.6, depth: 1.3, gloss: 0.2, highlightOpacity: 0.45, soften: 0.04 }), { kind: 'distort', on: true, amount: 0.04, scale: 0.3, seed: 2 }, DROP] },
      { ...repeatLayer(), name: 'Studs', element: 'bead', count: 12, at: 0.5, size: 0.28, fill: '#5a5a60', raised: true, effects: [recolour(['#050506', '#1e1e22', '#5a5a60', '#a8a8b0']), contact(0.6)] },
    ],
  },
  // ── bard ──
  {
    id: 'bard-chorus',
    shading: {},
    name: 'Outer Rim chorus',
    description: 'Deep teal enamel with lyrics in Outer Rim AF glowing between gold lines.',
    group: 'Classes',
    after: 'bard',
    stage: { bloom: 0.2 },
    colours: [slot('enamel', 'Enamel colour', '#0e5a6a', ['Enamel']), slot('glow', 'Lyric colour', '#8affe8', ['Lyrics']), slot('gold', 'Gold colour', '#c8952e', ['Gold lines'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Enamel', paint: lin(['#2a9aaa', '#0e5a6a', '#021a20']), effects: [bevel({ direction: 'sunken', size: 0.12, gloss: 0.9, highlightOpacity: 0.5 }), DROP] },
      ...goldLines(),
      inscription('outerRim', '#e0fff8', { name: 'Lyrics', size: 0.4, start: 2, effects: [glow({ color: '#8affe8', opacity: 0.85, size: 0.12 })] }),
    ],
  },
  {
    id: 'bard-aria',
    name: 'Crimson aria',
    description: 'Crimson velvet with an aria in Sith AF in gold, framed by gold lines.',
    group: 'Classes',
    after: 'bard',
    colours: [slot('velvet', 'Velvet colour', '#8a1022', ['Velvet']), slot('gold', 'Gold colour', '#c8952e', ['Aria', 'Gold lines'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Velvet', paint: photo('jacquard', 1.2, { lighting: 0.6 }), effects: [bevel({ size: 0.5, gloss: 0.2, highlightOpacity: 0.35 }), DROP] },
      ...goldLines(),
      inscription('sith', '#f0d080', { name: 'Aria', size: 0.38, start: 3, effects: [bevel({ size: 0.4, gloss: 0.8 }), contact(0.4)] }),
    ],
  },
  {
    id: 'bard-moon-verse',
    name: 'Moonlit verse',
    description: 'Silver notes and a Yugurian verse on midnight blue with a shimmer of stars.',
    group: 'Classes',
    after: 'bard',
    stage: { bloom: 0.2 },
    colours: [slot('band', 'Frame colour', '#141c3a', ['Band', 'Stars']), slot('silver', 'Silver colour', '#e4e8f0', ['Notes', 'Verse'])],
    layers: () => [
      ...base({ light: '#2a3a6a', dark: '#02040a', step: 0.6 }),
      { ...textureLayer('sparkle'), name: 'Stars', color: '#e8ecff', amount: 0.6, scale: 0.4, seed: 0x5a35 },
      { ...repeatLayer(), name: 'Notes', element: 'bardNote', count: 8, at: 0.3, size: 0.48, fill: '#e4e8f0', raised: false, shaded: false, effects: [glow({ color: '#c8d8ff', opacity: 0.7, size: 0.1 })] },
      inscription('yugurian', '#e4e8f0', { name: 'Verse', at: 0.8, size: 0.26, start: 8, effects: [glow({ color: '#c8d8ff', opacity: 0.6, size: 0.08 })] }),
    ],
  },
  // ── druid ──
  {
    id: 'druid-bramble',
    name: 'Bramble & berries',
    description: 'Thorny bramble stems winding round each other, heavy with dark berries.',
    group: 'Classes',
    after: 'druid',
    colours: [slot('stem', 'Stem colour', '#4a3a22', ['Brambles']), slot('berries', 'Berry colour', '#3a1050', ['Berries'])],
    layers: () => [
      { ...growthLayer('vine'), name: 'Brambles', count: 2, thickness: 0.07, amplitude: 0.2, waveLength: 1.6, extra: 'thorns', extraSize: 0.18, color: '#4a3a22', extraColor: '#2a1e10', effects: [bevel({ size: 0.5, gloss: 0.3 }), DROP] },
      { ...growthLayer('vine'), name: 'Leaves', count: 1, thickness: 0.04, amplitude: 0.2, waveLength: 2.1, extra: 'leaves', extraSize: 0.35, color: '#3a5a22', extraColor: '#4a7a2a', seed: 4, effects: [bevel({ size: 0.5, gloss: 0.3 }), contact(0.5)] },
      { ...growthLayer('vine'), name: 'Berries', count: 1, thickness: 0.03, amplitude: 0.18, waveLength: 1.8, extra: 'berries', extraSize: 0.32, color: '#4a3a22', extraColor: '#3a1050', seed: 9, effects: [bevel({ size: 0.6, gloss: 0.8 }), contact(0.5)] },
    ],
  },
  {
    id: 'druid-meadow',
    shading: {},
    name: 'Wildflower meadow',
    description: 'A strip of meadow grass dotted with small white and yellow flowers.',
    group: 'Classes',
    after: 'druid',
    colours: [slot('grass', 'Grass colour', '#4a7a2a', ['Meadow']), slot('flowers', 'Flower colour', '#f4f0e0', ['Flowers'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Meadow', paint: photo('moss', 0.9, { lighting: 0.5 }), effects: [bevel({ profile: 'rounded', size: 0.5, gloss: 0.1, highlightOpacity: 0.3 }), DROP] },
      { ...repeatLayer(), name: 'Flowers', element: 'circle', count: 40, at: 0.5, size: 0.16, fill: '#f4f0e0', raised: true, wander: 0.8, effects: [contact(0.4)] },
      { ...repeatLayer(), name: 'Flower hearts', element: 'circle', count: 40, at: 0.5, size: 0.06, fill: '#f0c020', raised: false, wander: 0.8, shaded: false },
      { ...shapeLayer(), name: 'Big flowers', shape: 'flower', sides: 6, innerRatio: 0.5, along: 0.125, across: 0.5, size: 0.42, fill: '#f8d040', outline: null, raised: false, mirror: 'four', effects: [bevel({ size: 0.4, gloss: 0.4 }), contact(0.5)] },
    ],
  },
  // ── cobblestone ──
  {
    id: 'cobblestone-forest-path',
    name: 'Forest path',
    description: 'Cobbles half covered in fallen autumn leaves and soft earth.',
    group: 'Textures',
    after: 'cobblestone',
    shading: {},
    colours: [slot('stone', 'Stone colour', '#928b80', ['Cobbles']), slot('leaves', 'Leaf colour', '#a0602a', ['Leaves'])],
    layers: () => [
      cobbles(),
      { ...bandFillLayer(), name: 'Leaves', paint: photo('forest-floor', 1.2), opacity: 0.9, effects: [{ kind: 'distort', on: true, amount: 0.15, scale: 0.35, seed: 11 }, contact(0.5)], clip: 'band', from: 0, to: 0.6 },
      ...rims(),
    ],
  },
  {
    id: 'cobblestone-lichen-granite',
    name: 'Lichen granite',
    description: 'Speckled granite patched with orange and yellow lichen.',
    group: 'Textures',
    after: 'cobblestone',
    shading: {},
    colours: [slot('stone', 'Stone colour', '#6a6a6c', ['Granite']), slot('lichen', 'Lichen colour', '#d8a020', ['Lichen'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Granite', paint: photo('lichen-rock', 1.4, { lighting: 0.6 }), effects: [bevel({ profile: 'chisel', size: 0.25, gloss: 0.2, highlightOpacity: 0.4 }), DROP] },
      { ...textureLayer('lichen'), name: 'Lichen', color: '#d8a020', amount: 0.55, opacity: 0.6, seed: 0x11c8 },
      ...rims(),
    ],
  },
  // ── paladin ──
  {
    id: 'paladin-oathbound',
    shading: {},
    name: 'Oathbound silver',
    description: 'White silver with a gold oath in BabelStone runes and gold crosses at the quarters.',
    group: 'Classes',
    after: 'paladin',
    colours: [slot('metal', 'Metal colour', '#c8ccd4', ['Silver']), slot('gold', 'Gold colour', '#c8952e', ['Oath', 'Crosses'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Silver', paint: photo('hammered-metal', 2.4), effects: [...metalFx(SILVER_STOPS, 0.35, 0.95), DROP] },
      inscription('babelstone', '#c8952e', { name: 'Oath', size: 0.32, start: 2, effects: [recolour(WARM_GOLD), bevel({ size: 0.4, gloss: 0.8 })] }),
      { ...repeatLayer(), name: 'Crosses', element: 'cross', count: 4, at: 0.5, size: 0.72, fill: '#c8952e', raised: true, effects: [recolour(WARM_GOLD), bevel({ size: 0.5, gloss: 0.8 }), contact(0.6)] },
    ],
  },
  {
    id: 'paladin-tabard',
    shading: {},
    name: 'Tabard',
    description: 'A blue cloth tabard band trimmed with gold braid.',
    group: 'Classes',
    after: 'paladin',
    colours: [slot('cloth', 'Cloth colour', '#1e3a8a', ['Cloth']), slot('gold', 'Gold colour', '#c8952e', ['Outer braid', 'Inner braid'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Cloth', paint: photo('hessian', 0.7, { lighting: 0.6 }), effects: [recolour(['#02061a', '#0e1e4a', '#1e3a8a', '#5a7ad0']), bevel({ size: 0.5, gloss: 0.15, highlightOpacity: 0.3 }), DROP] },
      ...[0.08, 0.92].map((at, i) => ({ ...lineLayer(), name: i ? 'Inner braid' : 'Outer braid', at, width: 0.12, paint: goldPaint(1.2), dash: 'solid' as const, effects: goldFx(0.7, WARM_GOLD) })),
    ],
  },
  {
    id: 'paladin-radiant',
    name: 'Radiant shield',
    description: 'Bright steel with a glowing golden seam, like a blessed shield rim.',
    group: 'Classes',
    after: 'paladin',
    stage: { bloom: 0.3 },
    colours: [slot('metal', 'Metal colour', '#a8b0bc', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#ffd870', ['Holy seam'])],
    layers: () => [
      ...base({ light: '#f4f8ff', dark: '#3a4250', step: 0.55 }),
      { ...lineLayer(), name: 'Holy seam', at: 0.55, width: 0.035, paint: { kind: 'solid', color: '#fff4d0' }, effects: [glow({ color: '#ffd870', opacity: 0.9, size: 0.18 })] },
    ],
  },
  {
    id: 'paladin-crowns',
    shading: {},
    name: 'Royal crowns',
    description: 'Royal blue enamel between gold rims, with gold crowns at the quarters.',
    group: 'Classes',
    after: 'paladin',
    colours: [slot('enamel', 'Enamel colour', '#1e3a8a', ['Enamel']), slot('gold', 'Gold colour', '#c8952e', ['Outer gold', 'Inner gold', 'Crowns'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Enamel', paint: lin(['#4a6ad0', '#1e3a8a', '#040a24']), effects: [bevel({ direction: 'sunken', size: 0.12, gloss: 0.9, highlightOpacity: 0.5 }), DROP] },
      { ...bandFillLayer(), name: 'Outer gold', to: 0.16, paint: goldPaint(1.4), effects: goldFx(0.5, WARM_GOLD) },
      { ...bandFillLayer(), name: 'Inner gold', from: 0.84, paint: goldPaint(1.4), effects: goldFx(0.5, WARM_GOLD) },
      { ...repeatLayer(), name: 'Crowns', element: 'icon-crown', count: 4, at: 0.5, size: 1.1, fill: '#c8952e', raised: true, effects: [recolour(WARM_GOLD), bevel({ size: 0.4, gloss: 0.8 }), contact(0.5)] },
    ],
  },
  {
    id: 'paladin-dawnsteel',
    name: 'Dawnsteel',
    description: 'Steel in the warm light of dawn, with a Sith AF vow etched in pale gold.',
    group: 'Classes',
    after: 'paladin',
    colours: [slot('band', 'Frame colour', '#e0b890', ['Band', 'Pressed-in step']), slot('etch', 'Etching colour', '#fff0c0', ['Vow'])],
    layers: () => [
      ...base({ light: '#fff0d8', dark: '#5a4a5a', step: 0.6 }),
      inscription('sith', '#fff0c0', { name: 'Vow', at: 0.28, size: 0.3, start: 6, effects: [bevel({ direction: 'sunken', size: 0.5, gloss: 0.4 })] }),
    ],
  },
  // ── ranger ──
  {
    id: 'ranger-fletching',
    shading: {},
    name: 'Arrow fletching',
    description: 'Grey-green feathers along a leather quiver strap.',
    group: 'Classes',
    after: 'ranger',
    colours: [slot('feathers', 'Feather colour', '#6a7a5a', ['Feathers']), slot('leather', 'Leather colour', '#5a3a1a', ['Strap'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Strap', paint: photo('leather', 1.4, { lighting: 0.6 }), effects: [recolour(LEATHER), bevel({ size: 0.4, gloss: 0.2 }), DROP] },
      { ...textureLayer('feathers'), name: 'Feathers', color: '#6a7a5a', from: 0.12, to: 0.88, seed: 0xfeaa, effects: [contact(0.5)] },
    ],
  },
  {
    id: 'ranger-cloak',
    shading: {},
    name: 'Woodland cloak',
    description: 'Green woollen cloak cloth with an oak-leaf clasp and stitched edges.',
    group: 'Classes',
    after: 'ranger',
    colours: [slot('cloth', 'Cloth colour', '#3a5a2a', ['Cloak']), slot('clasp', 'Clasp colour', '#a87a3a', ['Clasp'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Cloak', paint: photo('hessian', 0.7, { lighting: 0.6 }), effects: [recolour(['#040a02', '#16260e', '#3a5a2a', '#7a9a5a']), bevel({ size: 0.5, gloss: 0.1 }), DROP] },
      ...[0.08, 0.92].map((at) => ({ ...lineLayer(), name: 'Stitching', at, width: 0.03, dash: 'dashed' as const, paint: { kind: 'solid' as const, color: '#c8b888' } })),
      { ...repeatLayer(), name: 'Clasp', element: 'icon-oak-leaf', count: 1, at: 0.5, size: 0.8, fill: '#a87a3a', raised: true, effects: [recolour(['#1e1206', '#5a3a18', '#a87a3a', '#e0c08a', '#fff0d0']), bevel({ size: 0.4, gloss: 0.8 }), contact(0.6)] },
    ],
  },
  {
    id: 'ranger-bowstave',
    shading: {},
    name: 'Yew bowstave',
    description: 'Honey-coloured yew bound with green cord, like a longbow\'s grip.',
    group: 'Classes',
    after: 'ranger',
    colours: [slot('wood', 'Wood colour', '#c08850', ['Yew']), slot('cord', 'Cord colour', '#3a6a3a', ['Bindings'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Yew', paint: photo('wood-planks', 1.4, { angle: 90, lighting: 0.4 }), effects: [recolour(['#2a1406', '#7a4a1e', '#c08850', '#f0c890', '#fff0d8']), bevel({ profile: 'rounded', size: 0.6, depth: 1.3, gloss: 0.7 }), DROP] },
      { ...repeatLayer(), name: 'Bindings', element: 'square', count: 8, at: 0.5, size: 0.95, stretch: 0.35, fill: '#3a6a3a', raised: true, effects: [bevel({ size: 0.5, gloss: 0.3, surface: 'grain', surfaceDepth: 0.5 }), contact(0.5)] },
    ],
  },
  {
    id: 'ranger-trail',
    shading: {},
    name: 'Trail markings',
    description: 'Weathered bark with Yugurian trail markings carved into it.',
    group: 'Classes',
    after: 'ranger',
    colours: [slot('bark', 'Bark colour', '#5f5640', ['Bark']), slot('carving', 'Carving colour', '#d8c8a0', ['Markings'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Bark', paint: photo('bark', 1.6, { angle: 90, lighting: 0.6 }), effects: [bevel({ profile: 'rounded', size: 0.5, gloss: 0.15 }), DROP] },
      inscription('yugurian', '#d8c8a0', { name: 'Markings', size: 0.4, start: 1, effects: [bevel({ direction: 'sunken', size: 0.5, gloss: 0.2 })] }),
    ],
  },
  {
    id: 'ranger-pine',
    name: 'Pine wreath',
    description: 'Pine boughs and small cones wound into a ring.',
    group: 'Classes',
    after: 'ranger',
    colours: [slot('pine', 'Pine colour', '#2a4a2a', ['Boughs']), slot('cones', 'Cone colour', '#6a4424', ['Cones'])],
    layers: () => [
      { ...growthLayer('vine'), name: 'Boughs', count: 3, thickness: 0.06, amplitude: 0.14, waveLength: 1.4, extra: 'thorns', extraSpacing: 0.14, extraSize: 0.2, color: '#3a2a1a', extraColor: '#2a4a2a', effects: [bevel({ size: 0.4, gloss: 0.3 }), DROP] },
      { ...repeatLayer(), name: 'Cones', element: 'bead', count: 8, at: 0.5, size: 0.34, stretch: 0.7, fill: '#6a4424', raised: true, effects: [bevel({ size: 0.6, gloss: 0.3, surface: 'scales', surfaceDepth: 0.8 }), contact(0.6)] },
    ],
  },
  // ── rogue ──
  {
    id: 'rogue-shadow-leather',
    shading: {},
    name: 'Shadow leather',
    description: 'Supple black leather with neat grey stitching.',
    group: 'Classes',
    after: 'rogue',
    colours: [slot('leather', 'Leather colour', '#2a2220', ['Leather']), slot('stitch', 'Stitch colour', '#8a8a8a', ['Stitching'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Leather', paint: photo('leather', 1.4, { lighting: 0.7 }), effects: [recolour(DARK_LEATHER), bevel({ profile: 'rounded', size: 0.45, gloss: 0.5, highlightOpacity: 0.4 }), DROP] },
      ...[0.12, 0.88].map((at) => ({ ...lineLayer(), name: 'Stitching', at, width: 0.03, dash: 'dashed' as const, paint: { kind: 'solid' as const, color: '#8a8a8a' } })),
    ],
  },
  {
    id: 'rogue-daggers',
    shading: {},
    name: 'Dagger belt',
    description: 'A dark leather belt with four daggers sheathed along it.',
    group: 'Classes',
    after: 'rogue',
    colours: [slot('leather', 'Leather colour', '#3a2a20', ['Belt']), slot('metal', 'Blade colour', '#a8b0ba', ['Daggers'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Belt', paint: photo('leather', 1.4, { lighting: 0.6 }), effects: [recolour(['#050302', '#1a120c', '#3a2a20', '#6a5444', '#9a8474']), bevel({ size: 0.4, gloss: 0.3 }), DROP] },
      { ...repeatLayer(), name: 'Daggers', element: 'icon-plain-dagger', count: 4, at: 0.5, size: 1.15, rotation: 90, fill: '#a8b0ba', raised: true, effects: [recolour(STEEL_STOPS), bevel({ size: 0.4, gloss: 0.9 }), contact(0.6)] },
    ],
  },
  {
    id: 'rogue-cant',
    name: 'Thieves’ cant',
    description: 'Charcoal band with secret marks in Outer Rim AF.',
    group: 'Classes',
    after: 'rogue',
    colours: [slot('band', 'Frame colour', '#2a2a30', ['Band', 'Pressed-in step']), slot('marks', 'Mark colour', '#b8b8c0', ['Cant'])],
    layers: () => [
      ...base({ light: '#5a5a66', dark: '#050506', step: 0.6 }),
      inscription('outerRim', '#b8b8c0', { name: 'Cant', at: 0.3, size: 0.34, start: 7, effects: [bevel({ direction: 'sunken', size: 0.5, gloss: 0.3 })] }),
    ],
  },
  {
    id: 'rogue-poison',
    shading: {},
    name: 'Poisoner',
    description: 'Black leather with a glowing seam of green poison.',
    group: 'Classes',
    after: 'rogue',
    stage: { bloom: 0.25 },
    colours: [slot('leather', 'Leather colour', '#1e1e20', ['Leather']), slot('poison', 'Poison colour', '#6aff4a', ['Poison seam'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Leather', paint: photo('leather', 1.4, { lighting: 0.6 }), effects: [recolour(DARK_LEATHER), bevel({ size: 0.4, gloss: 0.4 }), DROP] },
      { ...lineLayer(), name: 'Poison seam', at: 0.5, width: 0.04, paint: { kind: 'solid', color: '#d0ffb0' }, effects: [glow({ color: '#6aff4a', opacity: 0.9, size: 0.16 })] },
    ],
  },
  {
    id: 'rogue-smoke',
    shading: {},
    name: 'Smoke & steel',
    description: 'Dark gunmetal veiled in drifting smoke.',
    group: 'Classes',
    after: 'rogue',
    colours: [slot('metal', 'Metal colour', '#2a2e36', ['Gunmetal']), slot('smoke', 'Smoke colour', '#8a8a96', ['Smoke'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Gunmetal', paint: photo('hammered-metal', 2), effects: [...metalFx(['#020203', '#0e1014', '#2a2e36', '#6a707a', '#b8c0c8'], 0.3, 0.8), DROP] },
      { ...textureLayer('smoke'), name: 'Smoke', color: '#8a8a96', color2: '#0e1014', opacity: 0.7, seed: 0x5e0d },
      ...rims(),
    ],
  },
  // ── sorcerer ──
  {
    id: 'sorcerer-wild-magic',
    name: 'Wild magic',
    description: 'A swirl of shifting colours with sparks of raw magic.',
    group: 'Classes',
    after: 'sorcerer',
    stage: { bloom: 0.3 },
    colours: [slot('first', 'First colour', '#ff3a6a', ['Swirl']), slot('second', 'Second colour', '#3a8aff', ['Swirl glow'])],
    layers: () => [
      ...base({ light: '#4a2a6a', dark: '#06020e', step: null }),
      { ...textureLayer('nebula'), name: 'Swirl', color: '#ff3a6a', color2: '#3a8aff', opacity: 0.9, blend: 'screen', seed: 0x2ee },
      { ...textureLayer('sparkle'), name: 'Swirl glow', color: '#ffffff', amount: 1, scale: 0.5, seed: 0x5a36, effects: [glow({ color: '#c08aff', opacity: 0.7, size: 0.06 })] },
    ],
  },
  {
    id: 'sorcerer-bloodline',
    name: 'Draconic bloodline',
    description: 'Dark red with a glowing ember seam and a Sith AF inscription.',
    group: 'Classes',
    after: 'sorcerer',
    stage: { bloom: 0.25 },
    colours: [slot('band', 'Frame colour', '#7a1a14', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#ff8a3a', ['Glowing lines', 'Draconic'])],
    layers: () => [
      ...base({ light: '#b8322a', dark: '#120202', step: 0.55 }),
      glowLines(['#ffd090', '#ff6a2a'], '#ff6a1a', { count: 2, from: 0.05, spacing: 0.9, width: 0.035, size: 0.12 }),
      inscription('sith', '#ffd0a0', { name: 'Draconic', at: 0.3, size: 0.32, start: 2, effects: [glow({ color: '#ff8a3a', opacity: 0.8, size: 0.1 })] }),
    ],
  },
  {
    id: 'sorcerer-storm',
    name: 'Storm sorcery',
    description: 'Storm-blue band crackling between two glowing rings.',
    group: 'Classes',
    after: 'sorcerer',
    stage: { bloom: 0.35 },
    colours: [slot('band', 'Frame colour', '#1a2a4a', ['Band']), slot('glow', 'Lightning colour', '#8ad0ff', ['Glowing lines', 'Lightning'])],
    layers: () => [
      ...base({ light: '#3a4a7a', dark: '#02040a', step: null }),
      overlay('black-onyx', 6, 'screen', 0.35),
      glowLines(['#e8f8ff', '#8ad0ff'], '#4aa0ff', { count: 2, from: 0.07, spacing: 0.86, width: 0.03, size: 0.14 }),
      { ...textureLayer('smoke'), name: 'Lightning', color: '#e8f8ff', color2: '#1a2a4a', opacity: 0.6, blend: 'screen', seed: 0x5e0e },
    ],
  },
  {
    id: 'sorcerer-crystal',
    name: 'Crystal heart',
    description: 'Faceted ruby crystal with four cut gems glowing from within.',
    group: 'Classes',
    after: 'sorcerer',
    stage: { bloom: 0.25 },
    colours: [slot('crystal', 'Crystal colour', '#c02a4a', ['Crystal', 'Gems'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Crystal', paint: lin(['#ff6a8a', '#c02a4a', '#2a0410']), effects: [DROP] },
      { ...textureLayer('crystal'), name: 'Facets', color: '#c02a4a', opacity: 0.8, seed: 0xc276 },
      { ...repeatLayer(), name: 'Gems', element: 'gem', count: 4, at: 0.5, size: 0.75, fill: '#c02a4a', raised: false, gemSparkle: 0.8, effects: [glow({ color: '#ff4a6a', opacity: 0.6, size: 0.12 }), contact(0.5)] },
    ],
  },
  // ── warlock ──
  {
    id: 'warlock-pact',
    name: 'Pact runes',
    description: 'Deep violet with a pact glowing in Sith AF in the pressed-in step.',
    group: 'Classes',
    after: 'warlock',
    stage: { bloom: 0.25 },
    colours: [slot('band', 'Frame colour', '#5b2d7a', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#c06aff', ['Pact'])],
    layers: () => [
      ...base({ light: '#8a4ab0', dark: '#0e0214', step: 0.5 }),
      inscription('sith', '#f0d8ff', { name: 'Pact', at: 0.75, size: 0.4, start: 7, effects: [glow({ color: '#c06aff', opacity: 0.9, size: 0.14 })] }),
    ],
  },
  {
    id: 'warlock-tendrils',
    name: 'Eldritch tendrils',
    description: 'Curling purple tendrils writhing through a black band.',
    group: 'Classes',
    after: 'warlock',
    stage: { bloom: 0.25 },
    colours: [slot('band', 'Frame colour', '#120818', ['Band']), slot('tendrils', 'Tendril colour', '#8a3ab0', ['Tendrils'])],
    layers: () => [
      ...base({ light: '#2a1a3a', dark: '#020104', step: null }),
      { ...growthLayer('tendrils'), name: 'Tendrils', count: 3, thickness: 0.05, amplitude: 0.22, color: '#8a3ab0', extraColor: '#c06aff', effects: [glow({ color: '#a04aff', opacity: 0.7, size: 0.1 }), bevel({ size: 0.5, gloss: 0.5 })] },
    ],
  },
  {
    id: 'warlock-eyes',
    shading: {},
    name: 'Watching eyes',
    description: 'Eyes of every size half open in a dark violet hide.',
    group: 'Classes',
    after: 'warlock',
    colours: [slot('hide', 'Hide colour', '#3a1a2a', ['Hide']), slot('eyes', 'Eye colour', '#c8a020', ['Eyes'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Hide', paint: photo('leather', 1.4, { lighting: 0.6 }), effects: [{ kind: 'recolour', on: true, amount: 1, stops: [{ at: 0, color: '#05020a', opacity: 1 }, { at: 0.5, color: '#3a1a2a', opacity: 1 }, { at: 1, color: '#8a5a7a', opacity: 1 }] }, bevel({ size: 0.4, gloss: 0.3 }), DROP] },
      { ...textureLayer('eyes'), name: 'Eyes', color: '#c8a020', seed: 0xe7e6 },
    ],
  },
  {
    id: 'warlock-void',
    name: 'Void cracks',
    description: 'Black obsidian split by cracks glowing violet.',
    group: 'Classes',
    after: 'warlock',
    stage: { bloom: 0.3, bleed: 0.2 },
    colours: [slot('glow', 'Glow colour', '#a04aff', ['Glowing cracks', 'Second cracks'])],
    layers: () => [
      ...base({ light: '#3a3040', dark: '#020103', step: null }),
      overlay('black-onyx', 6, 'overlay', 0.7),
      glowCracks('#100418', '#a04aff', '#c08aff'),
      { ...glowCracks('#100418', '#6a2aff', '#a08aff', 3, 0.7), name: 'Second cracks' },
    ],
  },
  {
    id: 'warlock-sigils',
    name: 'Hex sigils',
    description: 'Dark violet with glowing sigils at the quarters and drifting smoke.',
    group: 'Classes',
    after: 'warlock',
    stage: { bloom: 0.25 },
    colours: [slot('band', 'Frame colour', '#2a1038', ['Band', 'Smoke']), slot('glow', 'Sigil colour', '#d08aff', ['Sigils'])],
    layers: () => [
      ...base({ light: '#4a2a6a', dark: '#06020a', step: null }),
      { ...textureLayer('smoke'), name: 'Smoke', color: '#8a6aaa', color2: '#06020a', opacity: 0.6, seed: 0x5e0f },
      { ...repeatLayer(), name: 'Sigils', element: 'icon-pentagram-rose', count: 4, at: 0.5, size: 1.1, fill: '#f0d8ff', raised: false, shaded: false, effects: [glow({ color: '#d08aff', opacity: 0.9, size: 0.14 }), contact(0.4)] },
    ],
  },
  // ── artificer ──
  {
    id: 'artificer-pipes',
    name: 'Copper pipework',
    description: 'Copper pipes joined by brass collars round the band.',
    group: 'Classes',
    after: 'artificer',
    colours: [slot('pipes', 'Pipe colour', '#c06a3a', ['Pipes']), slot('collars', 'Collar colour', '#b5813a', ['Collars'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Back plate', paint: { kind: 'solid', color: '#1e1a16' }, effects: [DROP] },
      ...[0.3, 0.7].map((at) => ({ ...lineLayer(), name: 'Pipes', at, width: 0.3, paint: { kind: 'solid' as const, color: '#c06a3a' }, effects: [bevel({ profile: 'rounded', size: 0.9, depth: 1.4, gloss: 0.9 }), contact(0.5)] })),
      { ...repeatLayer(), name: 'Collars', element: 'square', count: 8, at: 0.5, size: 0.9, stretch: 0.25, fill: '#b5813a', raised: true, effects: [recolour(BRONZE_STOPS), bevel({ size: 0.4, gloss: 0.8 }), contact(0.6)] },
    ],
  },
  {
    id: 'artificer-workshop',
    name: 'Workshop iron',
    description: 'Riveted iron plates with brass bolts.',
    group: 'Classes',
    after: 'artificer',
    colours: [slot('metal', 'Iron colour', '#5a5e66', ['Plates']), slot('bolts', 'Bolt colour', '#b5813a', ['Bolts'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Plates', paint: brass(1.6), effects: [...metalFx(['#050608', '#1a1e24', '#5a5e66', '#9aa0aa', '#d8dce4'], 0.2, 0.6), DROP] },
      { ...repeatLayer(), name: 'Plate joins', element: 'tick', count: 10, at: 0.5, size: 1.1, stretch: 0.1, fill: '#0a0a0c', raised: false, shaded: false, opacity: 0.7 },
      { ...repeatLayer(), name: 'Bolts', element: 'bead', count: 20, at: 0.2, size: 0.18, fill: '#b5813a', raised: true, effects: [recolour(BRONZE_STOPS), contact(0.6)] },
      { ...repeatLayer(), name: 'Bolts', element: 'bead', count: 20, at: 0.8, size: 0.18, fill: '#b5813a', raised: true, effects: [recolour(BRONZE_STOPS), contact(0.6)] },
      ...rims(),
    ],
  },
  // ── gilded-laurel ──
  {
    id: 'gilded-laurel-enamel',
    name: 'Laurel on enamel',
    description: 'Gold laurel leaves laid on a deep green enamel band with a pressed-in step, like a victor’s medal.',
    group: 'Crafted',
    after: 'gilded-laurel',
    stage: { thickness: 0.2, outerSpacing: 0.03 },
    colours: [slot('band', 'Enamel colour', '#1e5a3a', ['Band', 'Pressed-in step']), slot('gold', 'Leaf colour', '#d8a838', ['Outer leaves', 'Inner leaves'])],
    layers: () => [
      ...base({ light: '#2e8a58', dark: '#04180c', step: 0.55 }),
      laurelLeaves('Outer leaves', 0.3, -68, '#d8a838', WARM_GOLD),
      laurelLeaves('Inner leaves', 0.72, 68, '#d8a838', WARM_GOLD, { offset: 0.5 }),
    ],
  },
  {
    id: 'gilded-laurel-wreath',
    name: 'Victor’s wreath',
    description: 'A real wreath: gilded laurel twigs growing round each other.',
    group: 'Crafted',
    after: 'gilded-laurel',
    stage: { thickness: 0.2, outerSpacing: 0.03 },
    colours: [slot('gold', 'Leaf colour', '#d8a838', ['Wreath', 'Second wreath'])],
    layers: () => [
      { ...growthLayer('vine'), name: 'Wreath', count: 2, thickness: 0.05, amplitude: 0.16, waveLength: 1.3, extra: 'leaves', extraSpacing: 0.1, extraSize: 0.55, color: '#a8782a', extraColor: '#d8a838', effects: [...goldFx(0.35, WARM_GOLD), DROP] },
      { ...growthLayer('vine'), name: 'Second wreath', count: 1, thickness: 0.035, amplitude: 0.22, waveLength: 1.9, extra: 'leaves', extraSpacing: 0.13, extraSize: 0.45, color: '#a8782a', extraColor: '#e8c060', seed: 5, effects: [...goldFx(0.35, WARM_GOLD), contact(0.5)] },
    ],
  },
  {
    id: 'gilded-laurel-jewelled',
    name: 'Jewelled wreath',
    description: 'The gilded wreath with six sharply cut sapphires held in gold claws round it.',
    group: 'Crafted',
    after: 'gilded-laurel',
    stage: { thickness: 0.2, outerSpacing: 0.03 },
    colours: [slot('gold', 'Leaf colour', '#d8a838', ['Wreath', 'Second wreath', 'Gems']), slot('gems', 'Gem colour', '#1f4fd0', ['Gems'])],
    layers: () => [
      { ...growthLayer('vine'), name: 'Wreath', count: 2, thickness: 0.05, amplitude: 0.16, waveLength: 1.3, extra: 'leaves', extraSpacing: 0.1, extraSize: 0.55, color: '#a8782a', extraColor: '#d8a838', effects: [...goldFx(0.35, WARM_GOLD), DROP] },
      { ...growthLayer('vine'), name: 'Second wreath', count: 1, thickness: 0.035, amplitude: 0.22, waveLength: 1.9, extra: 'leaves', extraSpacing: 0.13, extraSize: 0.45, color: '#a8782a', extraColor: '#e8c060', seed: 5, effects: [...goldFx(0.35, WARM_GOLD), contact(0.5)] },
      { ...repeatLayer(), name: 'Gems', element: 'gem', count: 6, at: 0.5, size: 0.85, fill: '#1f4fd0', raised: false, gemCut: 'brilliant', gemFacets: 10, gemTable: 0.46, gemCrown: 1, gemSparkle: 0.8, setting: 'claws6', settingColor: '#d8a838', settingEffects: [...goldFx(0.3, WARM_GOLD)], effects: [contact(0.7)] },
    ],
  },
  {
    id: 'gilded-laurel-silver-olive',
    name: 'Silver olive',
    description: 'Slim silver olive leaves on a cool slate band, shaded with the twin gradients rather than a bevel.',
    group: 'Crafted',
    after: 'gilded-laurel',
    stage: { thickness: 0.2, outerSpacing: 0.03 },
    colours: [slot('band', 'Band colour', '#3a4652', ['Band', 'Pressed-in step']), slot('leaves', 'Leaf colour', '#c8ccd4', ['Outer leaves', 'Inner leaves'])],
    layers: () => [
      ...base({ light: '#62707e', dark: '#0a0e12', step: 0.55 }),
      { ...laurelLeaves('Outer leaves', 0.3, -72, '#c8ccd4', SILVER_STOPS, { count: 30, size: 0.8 }), stretch: 0.32 },
      { ...laurelLeaves('Inner leaves', 0.72, 72, '#c8ccd4', SILVER_STOPS, { count: 30, size: 0.8, offset: 0.5 }), stretch: 0.32 },
    ],
  },
  {
    id: 'gilded-laurel-oath',
    name: 'Laurel oath',
    description: 'A single row of laurel round the outside and a Yugurian oath engraved in the pressed-in step.',
    group: 'Crafted',
    after: 'gilded-laurel',
    stage: { thickness: 0.2, outerSpacing: 0.03 },
    colours: [slot('band', 'Band colour', '#7a1a1e', ['Band', 'Pressed-in step']), slot('gold', 'Gold colour', '#d8a838', ['Laurel', 'Oath'])],
    layers: () => [
      ...base({ light: '#b03038', dark: '#1a0204', step: 0.55 }),
      laurelLeaves('Laurel', 0.28, -70, '#d8a838', WARM_GOLD, { count: 28, size: 0.75 }),
      inscription('yugurian', '#f4d27a', { name: 'Oath', at: 0.78, size: 0.3, start: 4, effects: [...goldFx(0.4, WARM_GOLD), contact(0.5)] }),
    ],
  },
  // ── iron-rivets ──
  {
    id: 'iron-rivets-blackened',
    name: 'Blackened iron',
    description: 'Dark hammered iron shaded with the twin gradient bands, with a ring of bright steel rivets.',
    group: 'Crafted',
    after: 'iron-rivets',
    stage: { thickness: 0.2, outerSpacing: 0.02 },
    colours: [slot('iron', 'Iron colour', '#4a5058', ['Iron plate']), slot('rivets', 'Rivet colour', '#a8b0ba', ['Rivets'])],
    layers: () => bandShading([ironPlate('Iron plate', IRON_PLATE), ironRivets('Rivets', 0.3, '#a8b0ba', STEEL_STOPS)]),
  },
  {
    id: 'iron-rivets-rusted',
    name: 'Rusted plate',
    description: 'Iron gone orange with rust at the edges, held together with dark rivets.',
    group: 'Crafted',
    after: 'iron-rivets',
    stage: { thickness: 0.2, outerSpacing: 0.02 },
    colours: [slot('rust', 'Rust colour', '#9a4a1e', ['Rust']), slot('rivets', 'Rivet colour', '#5a5e66', ['Rivets'])],
    layers: () => bandShading([
      ironPlate('Iron plate', IRON_PLATE),
      { ...bandFillLayer(), name: 'Rust', paint: photo('rust', 1.2), opacity: 0.9, blend: 'color', clip: 'band' },
      { ...bandFillLayer(), name: 'Rust', paint: photo('rust', 1.2), opacity: 0.35, blend: 'multiply', clip: 'band' },
      ironRivets('Rivets', 0.3, '#5a5e66', IRON_PLATE),
    ]),
  },
  {
    id: 'iron-rivets-dwarven',
    name: 'Dwarven strapwork',
    description: 'Heavy iron plates with joins between them, two rows of rivets and a thin brass trim line.',
    group: 'Crafted',
    after: 'iron-rivets',
    stage: { thickness: 0.2, outerSpacing: 0.02 },
    colours: [slot('iron', 'Iron colour', '#4a5058', ['Iron plate']), slot('brass', 'Brass colour', '#b5813a', ['Brass trim', 'Rivets'])],
    layers: () => bandShading([
      ironPlate('Iron plate', IRON_PLATE, 'metal-plate'),
      { ...repeatLayer(), name: 'Plate joins', element: 'tick', count: 8, at: 0.5, size: 1.1, stretch: 0.08, fill: '#050608', raised: false, shaded: false, opacity: 0.75 },
      { ...lineLayer(), name: 'Brass trim', at: 0.5, width: 0.05, paint: { kind: 'solid', color: '#b5813a' }, effects: [...metalFx(BRONZE_STOPS, 0.6, 0.8), contact(0.5)] },
      ironRivets('Rivets', 0.22, '#b5813a', BRONZE_STOPS, 24, 0.16),
      ironRivets('Rivets', 0.78, '#b5813a', BRONZE_STOPS, 24, 0.16),
    ]),
  },
  {
    id: 'iron-rivets-forge-script',
    name: 'Forge script',
    description: 'Black iron with a Sith AF inscription glowing forge-orange between two rows of rivets.',
    group: 'Crafted',
    after: 'iron-rivets',
    stage: { thickness: 0.2, outerSpacing: 0.02, bloom: 0.2 },
    colours: [slot('iron', 'Iron colour', '#3a3e46', ['Iron plate']), slot('glow', 'Glow colour', '#ff7a2a', ['Forge script'])],
    layers: () => bandShading([
      ironPlate('Iron plate', ['#020203', '#0e1014', '#3a3e46', '#6a707a', '#a8b0b8']),
      ironRivets('Rivets', 0.14, '#8a929c', STEEL_STOPS, 24, 0.14),
      ironRivets('Rivets', 0.86, '#8a929c', STEEL_STOPS, 24, 0.14),
      inscription('sith', '#ffd0a0', { name: 'Forge script', at: 0.5, size: 0.36, start: 6, effects: [glow({ color: '#ff7a2a', opacity: 0.9, size: 0.12 })] }),
    ], { step: null }),
  },
  {
    id: 'iron-rivets-gunmetal',
    name: 'Gunmetal bolts',
    description: 'Smooth blue-grey gunmetal with hex bolts and a fine brushed finish.',
    group: 'Crafted',
    after: 'iron-rivets',
    stage: { thickness: 0.2, outerSpacing: 0.02 },
    colours: [slot('metal', 'Metal colour', '#3a4450', ['Gunmetal', 'Brushing']), slot('bolts', 'Bolt colour', '#c8ced6', ['Bolts'])],
    layers: () => bandShading([
      { ...bandFillLayer(), name: 'Gunmetal', paint: { kind: 'linear', angle: 45, followLight: false, stops: [{ at: 0, color: '#6a7686', opacity: 1 }, { at: 1, color: '#0c1016', opacity: 1 }] }, effects: [DROP] },
      { ...textureLayer('brushed'), name: 'Brushing', color: '#ffffff', opacity: 0.25, seed: 0xb707 },
      { ...repeatLayer(), name: 'Bolts', element: 'bead', count: 12, at: 0.3, size: 0.3, fill: '#c8ced6', raised: true, effects: [...metalFx(STEEL_STOPS, 0.5, 0.9), contact(0.7)] },
    ]),
  },
  // ── runestone ──
  {
    id: 'runestone-mossy',
    name: 'Mossy runestone',
    description: 'Old weathered stone with moss creeping over the outer edge and runes carved but long gone dark.',
    group: 'Crafted',
    after: 'runestone',
    stage: { thickness: 0.2, outerSpacing: 0.02 },
    colours: [slot('stone', 'Stone colour', '#7a786e', ['Stone']), slot('moss', 'Moss colour', '#5a7a2a', ['Moss'])],
    layers: () => bandShading([
      runeStone('Stone', 'mossy-rock', 1.4),
      { ...bandFillLayer(), name: 'Moss', from: 0, to: 0.45, paint: photo('moss', 1), opacity: 0.85, clip: 'band', effects: [{ kind: 'distort', on: true, amount: 0.3, scale: 0.4, seed: 8 }, contact(0.4)] },
      inscription('babelstone', '#3a382e', { name: 'Runes', at: 0.75, size: 0.32, start: 3, effects: [carvedIn({ size: 0.6 })] }),
    ]),
  },
  {
    id: 'runestone-ember',
    name: 'Ember runes',
    description: 'Dark volcanic rock split by glowing cracks, with Yugurian runes burning orange.',
    group: 'Crafted',
    after: 'runestone',
    stage: { thickness: 0.2, outerSpacing: 0.02, bloom: 0.3 },
    colours: [slot('stone', 'Stone colour', '#3a3430', ['Stone']), slot('glow', 'Glow colour', '#ff7a2a', ['Glowing cracks', 'Runes'])],
    layers: () => bandShading([
      runeStone('Stone', 'dark-rock', 1.4),
      glowCracks('#1a0a04', '#ff7a2a', '#ffb05a', 7, 0.7),
      inscription('yugurian', '#ffe0b0', { name: 'Runes', at: 0.3, size: 0.38, start: 1, effects: [carvedIn(), glow({ color: '#ff7a2a', opacity: 0.9, size: 0.12 })] }),
    ]),
  },
  {
    id: 'runestone-frost',
    name: 'Frost runes',
    description: 'Blue-grey stone furred with frost, with BabelStone runes glowing icy cyan.',
    group: 'Crafted',
    after: 'runestone',
    stage: { thickness: 0.2, outerSpacing: 0.02, bloom: 0.25 },
    colours: [slot('stone', 'Stone colour', '#6a7a88', ['Stone']), slot('glow', 'Rune colour', '#8af0ff', ['Runes'])],
    layers: () => bandShading([
      runeStone('Stone', 'granite', 1.4, ['#06080c', '#2a3440', '#6a7a88', '#b8c8d6', '#f0f8ff']),
      { ...textureLayer('frost'), name: 'Frost', color: '#e8f8ff', opacity: 0.7, seed: 0xf205 },
      inscription('babelstone', '#e8fcff', { name: 'Runes', at: 0.3, size: 0.4, start: 5, effects: [carvedIn(), glow({ color: '#8af0ff', opacity: 0.85, size: 0.12 })] }),
    ]),
  },
  {
    id: 'runestone-gilded-slate',
    name: 'Gilded slate',
    description: 'Smooth dark slate with runes carved in and filled with gold leaf, and a gold rune stone at each quarter.',
    group: 'Crafted',
    after: 'runestone',
    stage: { thickness: 0.2, outerSpacing: 0.02 },
    colours: [slot('stone', 'Slate colour', '#2e3238', ['Stone']), slot('gold', 'Gold colour', '#d8a838', ['Runes', 'Rune stones'])],
    layers: () => bandShading([
      runeStone('Stone', 'black-onyx', 3, ['#020304', '#121418', '#2e3238', '#5a606a', '#8a909a']),
      inscription('babelstone', '#f4d27a', { name: 'Runes', at: 0.76, size: 0.28, start: 2, effects: [...goldFx(0.3, WARM_GOLD)] }),
      { ...repeatLayer(), name: 'Rune stones', element: 'icon-rune-stone', count: 4, at: 0.2, size: 0.38, fill: '#d8a838', raised: false, effects: [...goldFx(0.4, WARM_GOLD), contact(0.5)] },
    ]),
  },
  // ── thorns ──
  {
    id: 'thorns-rose-briar',
    name: 'Rose briar',
    description: 'Dark thorny stems wound round each other with deep red roses blooming at intervals.',
    group: 'Crafted',
    after: 'thorns',
    stage: { thickness: 0.16, outerSpacing: 0.06 },
    colours: [slot('stem', 'Stem colour', '#3a2a1a', ['Briar', 'Second briar']), slot('roses', 'Rose colour', '#a01828', ['Roses'])],
    layers: () => [
      { ...briar('Briar', '#3a2a1a', '#1a120a'), effects: [bevel({ size: 0.5, gloss: 0.3 }), DROP] },
      { ...briar('Second briar', '#4a3420', '#1e140a', { count: 1, thickness: 0.06, waveLength: 2.2, seed: 7 }), effects: [bevel({ size: 0.5, gloss: 0.3 }), contact(0.6)] },
      { ...growthLayer('vine'), name: 'Leaves', count: 1, thickness: 0.025, amplitude: 0.2, waveLength: 1.9, extra: 'leaves', extraSize: 0.3, color: '#2a3a1a', extraColor: '#2e5a22', seed: 3, effects: [bevel({ size: 0.4, gloss: 0.3 }), contact(0.5)] },
      { ...repeatLayer(), name: 'Roses', element: 'icon-rose', count: 8, at: 0.5, size: 1.1, fill: '#a01828', raised: false, effects: [bevel({ size: 0.4, gloss: 0.5 }), contact(0.6)] },
    ],
  },
  {
    id: 'thorns-bark-bramble',
    name: 'Bramble on bark',
    description: 'A narrow ring of bark, shaded with gradient bands, with a thorny bramble climbing over it.',
    group: 'Crafted',
    after: 'thorns',
    stage: { thickness: 0.16, outerSpacing: 0.04 },
    colours: [slot('bark', 'Bark colour', '#5f5040', ['Bark']), slot('stem', 'Bramble colour', '#4a3020', ['Bramble'])],
    layers: () => [
      ...bandShading([{ ...bandFillLayer(), name: 'Bark', from: 0.2, to: 0.8, paint: photo('bark', 1.4, { angle: 90, lighting: 0.4 }), effects: [recolour(['#0a0604', '#2a1e14', '#5f5040', '#8a7a64', '#b8a888']), DROP] }], { step: null }),
      { ...briar('Bramble', '#4a3020', '#24160a', { count: 2, thickness: 0.07, amplitude: 0.32, size: 0.35 }), effects: [bevel({ size: 0.5, gloss: 0.35 }), contact(0.7)] },
    ],
  },
  {
    id: 'thorns-silverwork',
    name: 'Silverwork thorns',
    description: 'A jeweller’s crown of thorns in polished silver, set with small amethysts.',
    group: 'Crafted',
    after: 'thorns',
    stage: { thickness: 0.16, outerSpacing: 0.06 },
    colours: [slot('metal', 'Metal colour', '#c8ccd4', ['Briar', 'Second briar']), slot('gems', 'Gem colour', '#8a3ac0', ['Gems'])],
    layers: () => [
      { ...briar('Briar', '#c8ccd4', '#e8ecf0', { thickness: 0.07 }), effects: [...metalFx(SILVER_STOPS, 0.5, 0.9), DROP] },
      { ...briar('Second briar', '#a8aeb8', '#d8dce4', { count: 1, thickness: 0.05, waveLength: 2.2, seed: 7 }), effects: [...metalFx(SILVER_STOPS, 0.5, 0.9), contact(0.6)] },
      { ...repeatLayer(), name: 'Gems', element: 'gem', count: 6, at: 0.5, size: 0.36, fill: '#8a3ac0', raised: false, gemSparkle: 0.7, effects: [contact(0.6)] },
    ],
  },
  // ── dragon-scales ──
  {
    id: 'dragon-scales-red',
    name: 'Red dragon',
    description: 'Crimson scales, glossy and shaded with the twin gradient bands, between thin gold edges.',
    group: 'Crafted',
    after: 'dragon-scales',
    stage: { thickness: 0.18, outerSpacing: 0.02 },
    colours: [slot('scales', 'Scale colour', '#b8322a', ['Scales']), slot('gold', 'Edge colour', '#d8a838', ['Outer edge', 'Inner edge'])],
    layers: () => [...bandShading([dragonUnder('#200404'), dragonScales('Scales', '#e04a3a', { from: 0.06, to: 0.94 })]), dragonEdge('Outer edge', 0.03), dragonEdge('Inner edge', 0.97)],
  },
  {
    id: 'dragon-scales-black',
    name: 'Black dragon',
    description: 'Glossy black scales with a violet sheen, like oil on obsidian.',
    group: 'Crafted',
    after: 'dragon-scales',
    stage: { thickness: 0.18, outerSpacing: 0.02 },
    colours: [slot('scales', 'Scale colour', '#1a1620', ['Scales']), slot('sheen', 'Sheen colour', '#8a4ad0', ['Sheen'])],
    layers: () => bandShading([
      dragonUnder('#020104'),
      dragonScales('Scales', '#1a1620', { gloss: 0.9 }),
      { ...bandFillLayer(), name: 'Sheen', paint: lin(['#8a4ad0', '#000000', '#2a8ad0'], 30), opacity: 0.55, blend: 'screen' },
    ]),
  },
  {
    id: 'dragon-scales-wyrm-script',
    name: 'Wyrm script',
    description: 'Green scales on the outside and a gold band in the pressed-in step with draconic words in Sith AF.',
    group: 'Crafted',
    after: 'dragon-scales',
    stage: { thickness: 0.18, outerSpacing: 0.02 },
    colours: [slot('scales', 'Scale colour', '#3a7a2a', ['Scales']), slot('band', 'Band colour', '#3a1a08', ['Script band']), slot('gold', 'Script colour', '#d8a838', ['Draconic'])],
    layers: () => [
      ...bandShading([dragonUnder('#081404'), dragonScales('Scales', '#3a7a2a', { to: 0.58 })], { step: null }),
      { ...bandFillLayer(), name: 'Script band', from: 0.58, to: 1, paint: lin(['#6a3a14', '#140602'], 225) },
      { ...lineLayer(), name: 'Crease', at: 0.58, width: 0.03, opacity: 0.55, blend: 'overlay', paint: { kind: 'solid', color: '#190500' } },
      inscription('sith', '#f4d27a', { name: 'Draconic', at: 0.79, size: 0.3, start: 8, effects: [...goldFx(0.4, WARM_GOLD)] }),
    ],
  },
  // ── celestial ──
  {
    id: 'celestial-sun-moon',
    name: 'Sun & moon',
    description: 'Day fading into night round the band: gold sun at the top, silver moon at the bottom, stars between.',
    group: 'Crafted',
    after: 'celestial',
    stage: { thickness: 0.16, outerSpacing: 0.03, bloom: 0.2 },
    colours: [slot('day', 'Day colour', '#e8a040', ['Band']), slot('night', 'Night colour', '#141a4a', ['Night'])],
    layers: () => [
      ...base({ light: '#f4c060', dark: '#a85020', step: null }),
      { ...bandFillLayer(), name: 'Night', paint: { kind: 'linear', angle: 90, followLight: false, stops: [{ at: 0.3, color: '#141a4a', opacity: 0 }, { at: 0.7, color: '#141a4a', opacity: 1 }] } },
      { ...celestialStars(16, 0.5, 0.18), offset: 0.5 },
      { ...repeatLayer(), name: 'Sun', element: 'sun', count: 1, snapToCorners: false, at: 0.5, size: 1.15, fill: '#f4d27a', raised: false, effects: [...goldFx(0.4, WARM_GOLD), glow({ color: '#ffd080', opacity: 0.6, size: 0.1 })] },
      { ...repeatLayer(), name: 'Moon', element: 'crescent', count: 1, snapToCorners: false, offset: 0.5, at: 0.5, size: 1, fill: '#d8dce4', raised: false, effects: [...metalFx(SILVER_STOPS, 0.4, 0.9), glow({ color: '#c0d0ff', opacity: 0.5, size: 0.08 })] },
    ],
  },
  {
    id: 'celestial-astrolabe',
    name: 'Astrolabe',
    description: 'A brass astrolabe ring with fine degree marks and star names in Outer Rim AF.',
    group: 'Crafted',
    after: 'celestial',
    stage: { thickness: 0.16, outerSpacing: 0.03 },
    colours: [slot('brass', 'Brass colour', '#b5813a', ['Band', 'Pressed-in step']), slot('marks', 'Mark colour', '#2a1a08', ['Degrees', 'Star names'])],
    layers: () => [
      ...base({ light: '#e0b060', dark: '#3a2208', step: 0.62 }),
      { ...repeatLayer(), name: 'Degrees', element: 'tick', count: 72, at: 0.8, size: 0.3, stretch: 0.2, fill: '#2a1a08', raised: false, shaded: false, accentEvery: 6, accentScale: 1.7 },
      inscription('outerRim', '#2a1a08', { name: 'Star names', at: 0.3, size: 0.34, start: 5, effects: [bevel({ direction: 'sunken', size: 0.5, gloss: 0.4 })] }),
    ],
  },
  // ── rope ──
  {
    id: 'rope-sailors',
    name: 'Sailor’s rope',
    description: 'Tarred rope coiled over a navy band, with a brass ring lashed on at each quarter.',
    group: 'Crafted',
    after: 'rope',
    stage: { thickness: 0.14, outerSpacing: 0.03 },
    colours: [slot('band', 'Band colour', '#1a2a4a', ['Band']), slot('rope', 'Rope colour', '#c8a870', ['Rope', 'Rope twist']), slot('brass', 'Ring colour', '#b5813a', ['Rings'])],
    layers: () => [
      ...bandShading([{ ...bandFillLayer(), name: 'Band', paint: { kind: 'linear', angle: 45, followLight: false, stops: [{ at: 0, color: '#2a4a7a', opacity: 1 }, { at: 1, color: '#040a18', opacity: 1 }] }, effects: [DROP] }], { step: null }),
      ...ropeStrand('Rope', '#c8a870', { from: 0.25, to: 0.75 }),
      { ...ropeRound(), from: 0.25, to: 0.75 },
      { ...repeatLayer(), name: 'Rings', element: 'circle', count: 4, at: 0.5, size: 0.8, fill: '#b5813a', outline: null, raised: true, effects: [...metalFx(BRONZE_STOPS, 0.5, 0.9), contact(0.7)] },
    ],
  },
  {
    id: 'rope-braided-leather',
    name: 'Braided leather',
    description: 'A tight plait of dark leather cord with a soft sheen, bound with a copper wire every so often.',
    group: 'Crafted',
    after: 'rope',
    stage: { thickness: 0.14, outerSpacing: 0.03 },
    colours: [slot('leather', 'Leather colour', '#5a3420', ['Cord', 'Cord twist']), slot('wire', 'Binding colour', '#c06a3a', ['Bindings'])],
    layers: () => [
      ...ropeStrand('Cord', '#5a3420', { seed: 0xbeef }),
      { ...bandFillLayer(), name: 'Leather', paint: photo('leather', 0.8), opacity: 0.45, blend: 'overlay' },
      ropeRound(),
      { ...repeatLayer(), name: 'Bindings', element: 'square', count: 8, at: 0.5, size: 1, stretch: 0.22, fill: '#c06a3a', raised: true, effects: [...metalFx(['#1e0a04', '#6a3014', '#c06a3a', '#f0b08a', '#fff0e0'], 0.6, 0.9), contact(0.6)] },
    ],
  },
  // ── shield-rim ──
  {
    id: 'shield-rim-viking',
    name: 'Viking shield',
    description: 'Planks painted deep red, an iron rim and iron nails, shaded with gradients instead of a bevel.',
    group: 'Crafted',
    after: 'shield-rim',
    stage: { thickness: 0.18, outerSpacing: 0.02 },
    colours: [slot('paint', 'Paint colour', '#a01a1a', ['Paint']), slot('rim', 'Rim colour', '#6a7078', ['Steel rim'])],
    layers: () => [
      { ...shieldPlanks(['#1a0202', '#5a0a0a', '#a01a1a', '#d05a4a', '#f0b0a0']), name: 'Paint' },
      plankJoins(),
      shieldRim('Steel rim', ['#06080a', '#22262c', '#6a7078', '#a8b0b8', '#e0e6ec']),
      shieldNails('#6a7078', STEEL_STOPS),
      ...shieldShading(),
    ],
  },
  {
    id: 'shield-rim-hoplite',
    name: 'Bronze hoplite',
    description: 'A wide polished bronze rim with a Yugurian battle cry engraved round it, over dark oak.',
    group: 'Crafted',
    after: 'shield-rim',
    stage: { thickness: 0.18, outerSpacing: 0.02 },
    colours: [slot('bronze', 'Bronze colour', '#a87a3a', ['Bronze rim']), slot('wood', 'Wood colour', '#4a2a14', ['Planks'])],
    layers: () => [
      shieldPlanks(['#0a0402', '#2a160a', '#4a2a14', '#7a5030', '#a8805a']),
      plankJoins(),
      { ...shieldRim('Bronze rim', BRONZE_STOPS), to: 0.5 },
      inscription('yugurian', '#3a2208', { name: 'Battle cry', at: 0.25, size: 0.32, start: 9, effects: [bevel({ direction: 'sunken', size: 0.5, gloss: 0.4 })] }),
      { ...shieldShading()[0], to: 0.5 }, { ...shieldShading()[1], from: 0.5 }, { ...shieldShading()[2], at: 0.5 },
    ],
  },
  {
    id: 'shield-rim-heraldry',
    name: 'Knight’s heraldry',
    description: 'Blue enamel field with a gold rim, gold nails and a fleur-de-lys at each quarter.',
    group: 'Crafted',
    after: 'shield-rim',
    stage: { thickness: 0.18, outerSpacing: 0.02 },
    colours: [slot('field', 'Field colour', '#1a3a8a', ['Field']), slot('gold', 'Gold colour', '#d8a838', ['Gold rim', 'Nails', 'Fleurs'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Field', from: 0.4, to: 1, paint: lin(['#2a5ab0', '#081a48']) },
      { ...repeatLayer(), name: 'Fleurs', element: 'icon-fleur-de-lys', count: 4, at: 0.71, size: 0.62, fill: '#d8a838', raised: false, effects: [...goldFx(0.4, WARM_GOLD)] },
      { ...shieldRim('Gold rim', WARM_GOLD), paint: photo('gold', 1, { lighting: 0.3 }) },
      shieldNails('#d8a838', WARM_GOLD),
      ...shieldShading(),
    ],
  },
  {
    id: 'shield-rim-battle-worn',
    name: 'Battle-worn',
    description: 'A scarred shield: chipped steel rim, splintered planks, one nail missing.',
    group: 'Crafted',
    after: 'shield-rim',
    stage: { thickness: 0.18, outerSpacing: 0.02 },
    colours: [slot('rim', 'Rim colour', '#6a7078', ['Steel rim'])],
    layers: () => [
      shieldPlanks(['#0a0602', '#2e1e10', '#5a4028', '#8a7050', '#b8a080']),
      plankJoins(),
      { ...shieldRim('Steel rim', ['#06080a', '#22262c', '#6a7078', '#a8b0b8', '#e0e6ec']), effects: [recolour(['#06080a', '#22262c', '#6a7078', '#a8b0b8', '#e0e6ec']), wear({ chips: 0.12, polish: 0.2, grime: 0.6, scale: 0.12, scratches: 0.5 }), DROP] },
      { ...shieldNails('#8a8478', STEEL_STOPS), missing: 0.1 },
      ...shieldShading(),
    ],
  },
  {
    id: 'shield-rim-leather-bound',
    name: 'Leather-bound',
    description: 'Oak planks with a stitched leather edge instead of metal, and brass studs.',
    group: 'Crafted',
    after: 'shield-rim',
    stage: { thickness: 0.18, outerSpacing: 0.02 },
    colours: [slot('leather', 'Leather colour', '#5a3420', ['Leather edge']), slot('brass', 'Stud colour', '#b5813a', ['Nails'])],
    layers: () => [
      shieldPlanks(),
      plankJoins(),
      { ...bandFillLayer(), name: 'Leather edge', to: 0.42, paint: photo('leather', 1.2, { lighting: 0.3 }), effects: [recolour(['#0a0402', '#2a160a', '#5a3420', '#8a6040', '#b89070']), DROP] },
      { ...lineLayer(), name: 'Stitching', at: 0.36, width: 0.03, dash: 'dashed', paint: { kind: 'solid', color: '#d8c8a0' } },
      { ...lineLayer(), name: 'Stitching', at: 0.06, width: 0.03, dash: 'dashed', paint: { kind: 'solid', color: '#d8c8a0' } },
      shieldNails('#b5813a', BRONZE_STOPS),
      ...shieldShading(),
    ],
  },
  // ── border-filigree ──
  {
    id: 'gilded-filigree-sapphire',
    name: 'Sapphire filigree',
    description: 'Deep blue enamel glittering faintly, between warm gold filigree bands.',
    group: 'Crafted',
    after: 'gilded-filigree',
    colours: [slot('enamel', 'Enamel colour', '#1a3aa0', ['Enamel']), slot('gold', 'Gold colour', '#c8952e', ['Outer gold', 'Inner gold', 'Outer filigree', 'Inner filigree'])],
    stage: { thickness: 0.25, outerSpacing: 0.01 },
    layers: () => [
      enamelChannel('Enamel', '#3a6ae0', '#060e30'),
      { ...textureLayer('sparkle'), name: 'Glitter', from: 0.3, to: 0.72, color: '#e8f0ff', amount: 0.6, scale: 0.5, seed: 0x5a38 },
      ...filigreeBands(WARM_GOLD),
    ],
  },
  {
    id: 'gilded-filigree-emerald-script',
    name: 'Emerald script',
    description: 'Emerald enamel with a raised gold Yugurian inscription running through it, between filigree bands.',
    group: 'Crafted',
    after: 'gilded-filigree',
    colours: [slot('enamel', 'Enamel colour', '#1a7a4a', ['Enamel']), slot('gold', 'Gold colour', '#c8952e', ['Outer gold', 'Inner gold', 'Outer filigree', 'Inner filigree', 'Inscription'])],
    stage: { thickness: 0.25, outerSpacing: 0.01 },
    layers: () => [
      enamelChannel('Enamel', '#2aa868', '#041a0c'),
      ...filigreeBands(WARM_GOLD),
      inscription('yugurian', '#f4d27a', { name: 'Inscription', at: 0.51, size: 0.3, start: 3, effects: [...goldFx(0.4, WARM_GOLD)] }),
    ],
  },
  // ── border-guild ──
  {
    id: 'guild-gold-shaded',
    name: 'Gold guild ring',
    description: 'The gold guild ring shaded with the twin gradients instead of a bevel, its four arrow studs kept inside the band.',
    group: 'Crafted',
    after: 'guild-gold',
    stage: { thickness: 0.15, outerSpacing: 0.02 },
    colours: [slot('metal', 'Metal colour', '#c8952e', ['Band', 'Pressed-in step', 'Studs'])],
    layers: () => [...guildBand(WARM_GOLD, '#4a2c08'), guildStuds('#c8952e', WARM_GOLD)],
  },
  {
    id: 'guild-silver-sapphire',
    name: 'Silver & sapphire',
    description: 'A silver guild ring with a cut sapphire set at each quarter instead of the arrow studs.',
    group: 'Crafted',
    after: 'guild-gold',
    stage: { thickness: 0.15, outerSpacing: 0.02 },
    colours: [slot('metal', 'Metal colour', '#b8bcc4', ['Band', 'Pressed-in step']), slot('gems', 'Gem colour', '#1f4fd0', ['Gems'])],
    layers: () => [
      ...guildBand(SILVER_STOPS, '#2a2e36'),
      { ...repeatLayer(), name: 'Gems', element: 'gem', count: 4, at: 0.5, size: 0.8, fill: '#1f4fd0', raised: false, gemFacets: 10, gemSparkle: 0.8, setting: 'claws4', settingColor: '#d8dce4', settingEffects: [...metalFx(SILVER_STOPS, 0.3, 0.9)], effects: [contact(0.7)] },
    ],
  },
  {
    id: 'guild-bronze-enamel',
    name: 'Bronze & enamel',
    description: 'A bronze guild ring with a blue enamel step on the inside and bronze studs.',
    group: 'Crafted',
    after: 'guild-gold',
    stage: { thickness: 0.15, outerSpacing: 0.02 },
    colours: [slot('metal', 'Metal colour', '#a87a3a', ['Band', 'Studs']), slot('enamel', 'Enamel colour', '#1a4a8a', ['Pressed-in step'])],
    layers: () => {
      const ls = guildBand(BRONZE_STOPS, '#2a1606');
      ls[1] = { ...bandFillLayer(), name: 'Pressed-in step', from: 0.62, to: 1, paint: lin(['#0a1a38', '#3a7ac8']) };
      return [...ls, guildStuds('#a87a3a', BRONZE_STOPS)];
    },
  },
  // ── border-raven ──
  {
    id: 'raven-plume-sheen',
    name: 'Raven sheen',
    description: 'Fuller black plumage with the blue-violet sheen of a raven’s wing, between bright copper rims.',
    group: 'Crafted',
    after: 'raven-plume',
    stage: { ...RAVEN_STAGE, bloom: 0.15 },
    colours: [slot('feathers', 'Feather colour', '#2a2e38', ['Feathers', 'Top feathers']), slot('rims', 'Rim colour', '#c8602a', ['Outer copper', 'Inner copper'])],
    layers: () => [
      ...deepPlumage('#2a2c38', '#020204', plumage('#2a2e38', '#5a6070'), [{ ...bandFillLayer(), name: 'Sheen', from: 0.08, to: 0.92, paint: lin(['#3a2a8a', '#000000', '#1a6a8a'], 30), opacity: 0.5, blend: 'screen' }]),
      plumeRim('Outer copper', 0.03, '#c8602a', '#ff6a2a'),
      plumeRim('Inner copper', 0.97, '#c8602a', '#ff6a2a'),
    ],
  },
  {
    id: 'raven-plume-bone',
    name: 'Plume & bone',
    description: 'Black feathers threaded with small carved bone beads, like a shaman’s talisman.',
    group: 'Crafted',
    after: 'raven-plume',
    stage: RAVEN_STAGE,
    colours: [slot('feathers', 'Feather colour', '#2a2e38', ['Feathers', 'Top feathers']), slot('beads', 'Bead colour', '#e8dcc0', ['Bone beads'])],
    layers: () => [
      ...deepPlumage('#2a2c38', '#020204', plumage('#2a2e38', '#5a6070')),
      { ...repeatLayer(), name: 'Bone beads', element: 'bead', count: 12, at: 0.5, size: 0.34, stretch: 0.8, fill: '#e8dcc0', raised: true, effects: [contact(0.6)] },
      plumeRim('Outer rim', 0.03, '#8a6a40', null, 0.04),
      plumeRim('Inner rim', 0.97, '#8a6a40', null, 0.04),
    ],
  },
  {
    id: 'raven-plume-owl',
    name: 'Owl plume',
    description: 'Soft brown and cream barred owl feathers between bronze rims.',
    group: 'Crafted',
    after: 'raven-plume',
    stage: RAVEN_STAGE,
    colours: [slot('feathers', 'Feather colour', '#8a6a44', ['Feathers', 'Top feathers']), slot('rims', 'Rim colour', '#a87a3a', ['Outer bronze', 'Inner bronze'])],
    layers: () => [
      ...deepPlumage('#6a4c30', '#140a04', plumage('#8a6a44', '#e8dcc0', 0xfeb1)),
      { ...lineLayer(), name: 'Outer bronze', at: 0.03, width: 0.06, paint: { kind: 'solid', color: '#a87a3a' }, effects: metalFx(BRONZE_STOPS, 0.6, 0.9) },
      { ...lineLayer(), name: 'Inner bronze', at: 0.97, width: 0.06, paint: { kind: 'solid', color: '#a87a3a' }, effects: metalFx(BRONZE_STOPS, 0.6, 0.9) },
    ],
  },
  // ── border-ember ──
  {
    id: 'emberforged-molten',
    name: 'Molten ring',
    description: 'Black iron shaded with gradients instead of a bevel, two grooves, and a wider ring of glowing lava inside.',
    group: 'Crafted',
    after: 'emberforged',
    stage: { ...EMBER_STAGE, bloom: 0.25 },
    colours: [slot('iron', 'Iron colour', '#4a4e58', ['Black iron']), slot('lava', 'Lava colour', '#ff4a2a', ['Lava', 'Molten glass', 'Lava glow'])],
    layers: () => [...emberIron(), emberGrooves(), ...lavaRing(0.66, '#ff4a2a', '#5a0606', '#ff3a1a')],
  },
  {
    id: 'emberforged-forge-runes',
    name: 'Forge runes',
    description: 'Sith AF runes glowing hot on the iron, over a lava ring and glowing cracks.',
    group: 'Crafted',
    after: 'emberforged',
    stage: { ...EMBER_STAGE, bloom: 0.3 },
    colours: [slot('iron', 'Iron colour', '#4a4e58', ['Black iron']), slot('glow', 'Glow colour', '#ff7a2a', ['Runes', 'Glowing cracks', 'Lava', 'Molten glass', 'Lava glow'])],
    layers: () => [
      ...emberIron(),
      glowCracks('#1a0a04', '#ff7a2a', '#ffb05a', 9, 0.5),
      inscription('sith', '#ffe0b0', { name: 'Runes', at: 0.3, size: 0.36, start: 5, effects: [glow({ color: '#ff7a2a', opacity: 0.9, size: 0.12 })] }),
      ...lavaRing(0.7, '#ff6a2a', '#5a0a04', '#ff5a1a'),
    ],
  },
  {
    id: 'emberforged-frostfire',
    name: 'Frostfire',
    description: 'The cold twin: frosted iron round a ring of glowing blue ice.',
    group: 'Crafted',
    after: 'emberforged',
    stage: { ...EMBER_STAGE, bloom: 0.25 },
    colours: [slot('iron', 'Iron colour', '#5a6270', ['Black iron', 'Frost']), slot('glow', 'Glow colour', '#4ac8ff', ['Lava', 'Molten glass', 'Lava glow'])],
    layers: () => [
      ...emberIron('#5a6270', '#04060a'),
      { ...textureLayer('frost'), name: 'Frost', to: 0.6, color: '#e0f0ff', amount: 0.9, scale: 1.3, strength: 0.7, seed: 0xf206, blend: 'screen' },
      emberGrooves(),
      ...lavaRing(0.66, '#8ae8ff', '#06204a', '#4ac8ff'),
    ],
  },
  // ── border-storm ──
  {
    id: 'storm-wisps-arcane',
    name: 'Arcane storm',
    description: 'A violet storm with magenta light at its edges and pale lightning.',
    group: 'Crafted',
    after: 'storm-wisps',
    stage: { ...STORM_STAGE, bloom: 0.3 },
    colours: [slot('cloud', 'Cloud colour', '#1a0e24', ['Storm']), slot('light', 'Lightning colour', '#f0c8ff', ['Lightning'])],
    layers: () => [stormRing('#1a0e24', '#8a70a0', '#b04ad0', '#e0c0f0'), lightning('#fff0ff', '#d070ff')],
  },
  {
    id: 'storm-wisps-sea-squall',
    name: 'Sea squall',
    description: 'Teal sea-spray and white mist whirling round, like a squall over dark water.',
    group: 'Crafted',
    after: 'storm-wisps',
    stage: { ...STORM_STAGE, bloom: 0.15 },
    colours: [slot('sea', 'Sea colour', '#0a2a30', ['Storm'])],
    layers: () => [stormRing('#0a2a30', '#a8c8c8', '#3ac8b0', '#e8fafa')],
  },
  // ── border-plates ──
  {
    id: 'riveted-plates-ordered',
    name: 'Ordered plates',
    description: 'Even iron plates neatly riveted round a shaded iron ring, all inside the band.',
    group: 'Crafted',
    after: 'riveted-plates',
    stage: PLATES_STAGE,
    colours: [slot('iron', 'Iron colour', '#66665a', ['Iron ring', 'Outer plates', 'Inner plates', 'Rivets'])],
    layers: () => [
      ...plateRing(PLATE_IRON),
      loosePlates('Outer plates', 0.27, 14, 0.42, '#a4a49e', PLATE_IRON),
      loosePlates('Inner plates', 0.73, 14, 0.42, '#9c9c96', PLATE_IRON, { offset: 0.5 }),
      plateRivets('Rivets', 0.27, 28, '#c8c8c0', PLATE_IRON, 0.25),
      plateRivets('Rivets', 0.73, 28, '#c8c8c0', PLATE_IRON, 0.75),
    ],
  },
  {
    id: 'riveted-plates-forge-seams',
    name: 'Forge seams',
    description: 'Blackened steel plates with a red-hot glow showing in the seams between them.',
    group: 'Crafted',
    after: 'riveted-plates',
    stage: { ...PLATES_STAGE, bloom: 0.2 },
    colours: [slot('steel', 'Steel colour', '#3a3e46', ['Plates']), slot('glow', 'Glow colour', '#ff5a1a', ['Seam glow'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Under', paint: lin(['#1a0604', '#040101']), effects: [DROP] },
      { ...lineLayer(), name: 'Seam glow', at: 0.5, width: 0.9, paint: { kind: 'solid', color: '#ff5a1a' }, opacity: 0.6, effects: [glow({ color: '#ff3a0a', opacity: 0.6, size: 0.1 })] },
      loosePlates('Plates', 0.5, 12, 0.86, '#3a3e46', ['#020203', '#0e1014', '#3a3e46', '#7a808a', '#c0c8d0']),
      plateRivets('Rivets', 0.5, 12, '#8a929c', STEEL_STOPS, 0.5),
    ],
  },
  {
    id: 'riveted-plates-bulwark',
    name: 'Dwarven bulwark',
    description: 'Bronze plates that bend with the ring, gold rivets evenly spaced over the plate centres and the gaps, on dark iron.',
    group: 'Crafted',
    after: 'riveted-plates',
    stage: PLATES_STAGE,
    colours: [slot('iron', 'Iron colour', '#3a3e46', ['Iron ring']), slot('bronze', 'Plate colour', '#a87a3a', ['Plates']), slot('gold', 'Rivet colour', '#d8a838', ['Rivets'])],
    layers: () => [
      ...plateRing(['#020203', '#0e1014', '#3a3e46', '#6a707a', '#a8b0b8'], 'metal-plate'),
      curvedPlates('Plates', 12, '#a87a3a', BRONZE_STOPS),
      plateRivets('Rivets', 0.22, 24, '#d8a838', WARM_GOLD),
      plateRivets('Rivets', 0.78, 24, '#d8a838', WARM_GOLD),
    ],
  },
  // ── next ──
];

export const FRAME_VERSIONS: BuiltInFrame[] = [
  ...WIZARD,
  ...VERSIONS.map(({ layers, stage, shading, ...v }) => ({ ...v, project: fromLayers(v.name, shading ? () => bandShading(layers(), shading) : layers, stage) })),
];
