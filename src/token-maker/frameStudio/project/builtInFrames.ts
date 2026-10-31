// Token Studio's ready-made frames, as Frame Studio designs: the owner's
// Essentials, the new versions of Token Maker's frames chosen in the frame
// review (docs/FRAME-REVIEW.md), and the old picture frames
// (pictureFrameTemplates.ts). Token Maker lists them in its frame picker,
// with a colour picker for each of a design's colour slots; Frame Studio
// offers them in New, ready to change.

import { createProject } from './defaults';
import type { ColourSlot } from './colourSlots';
import { ESSENTIALS_DATA } from './essentialsData';
import {
  bandFillLayer,
  base,
  bevel,
  DROP,
  glow,
  glowLines,
  goldFx,
  goldPaint,
  lin,
  lineLayer,
  overlay,
  photo,
  recolour,
  repeatLayer,
  shapeLayer,
  textLayer,
  textureLayer,
} from './houseStyle';
import { parseProject } from './migrate';
import { PICTURE_FRAME_TEMPLATES } from './pictureFrameTemplates';
import type { FrameProject, Layer, StageSettings } from './types';

/** Where a frame is listed in Token Maker's picker. */
export type BuiltInGroup = 'Essentials' | 'Classic' | 'Textures' | 'Classes' | 'Crafted';

export interface BuiltInFrame {
  id: string;
  name: string;
  description: string;
  group: BuiltInGroup;
  /** Listed straight after this Token Maker frame (its preset id), if any. */
  after?: string;
  colours: ColourSlot[];
  /** The design in its own colours. */
  project: () => FrameProject;
}

const fromLayers = (name: string, layers: () => Layer[], stage: Partial<StageSettings> = {}) => () => {
  const p = createProject(layers(), name);
  return { ...p, stage: { ...p.stage, ...stage } };
};

const slot = (id: string, name: string, colour: string, layers: string[]): ColourSlot => ({ id, name, default: colour, layers });

// ── Essentials: the owner's designs ─────────────────────────────────────────

const ESSENTIAL_INFO: Record<string, { description: string; colours: ColourSlot[] }> = {
  simple: { description: 'A clean two-tone band with a pressed-in step.', colours: [slot('band', 'Frame colour', '#ff525a', ['Band', 'Pressed-in step'])] },
  'dual-tone': {
    description: 'The Simple band with a different colour on each step.',
    colours: [slot('outer', 'Outer colour', '#fd3e30', ['Band']), slot('inner', 'Inner colour', '#ffb833', ['Pressed-in step'])],
  },
  'small-gradient': { description: 'A silver band washed with a three-colour gradient.', colours: [slot('band', 'Frame colour', '#00ffe1', ['Band fill'])] },
  'clean-gradient': {
    description: 'A glowing gradient band with veined marbling in its shade.',
    colours: [slot('band', 'Frame colour', '#ff6c08', ['Band', 'Pressed-in step', 'Veins and marbling'])],
  },
  rainbow: { description: 'Every colour of the rainbow round a silver band.', colours: [] },
  marble: {
    description: 'Pale onyx marble with a soft coloured glow.',
    colours: [slot('band', 'Marble colour', '#e9ddde', ['Default']), slot('glow', 'Glow colour', '#fa1ec0', ['Contours'])],
  },
  'gold-red-marble': {
    description: 'Red marble set in two rounded gold rims, with gold tendrils.',
    colours: [slot('marble', 'Marble colour', '#c74829', ['Blue onyx']), slot('gold', 'Gold colour', '#ccb47e', ['Outer gold', 'Inner gold', 'Growth', 'Growth copy'])],
  },
  'glowing-ice': {
    description: 'A ring of cracked ice glowing from within.',
    colours: [slot('glow', 'Glow colour', '#4db2ff', ['Band copy', 'Band copy copy', 'Cracks', 'Cracks copy', 'Contours copy'])],
  },
  'glowing-lava': {
    description: 'Molten lava with glowing cracks and a hot glow.',
    colours: [slot('glow', 'Glow colour', '#fb6704', ['Band copy', 'Cracks', 'Cracks copy', 'Contours'])],
  },
};

const ESSENTIALS: BuiltInFrame[] = ESSENTIALS_DATA.map((d) => ({
  id: d.id,
  name: d.name,
  group: 'Essentials',
  ...ESSENTIAL_INFO[d.id],
  project: () => {
    const read = parseProject(d.project);
    if (!read.ok) throw new Error(`Built-in frame ${d.id}: ${read.error}`);
    return read.project;
  },
}));

// ── Wizard ──────────────────────────────────────────────────────────────────

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

// ── The old picture frames ──────────────────────────────────────────────────

const CRAFTED: BuiltInFrame[] = PICTURE_FRAME_TEMPLATES.map((t) => ({
  id: t.id,
  name: t.name,
  description: t.description,
  group: 'Crafted',
  colours: [],
  project: fromLayers(t.name, t.make, t.stage),
}));

export const BUILT_IN_FRAMES: readonly BuiltInFrame[] = [...ESSENTIALS, ...WIZARD, ...CRAFTED];
export const builtInFrameById = (id: string) => BUILT_IN_FRAMES.find((f) => f.id === id);
