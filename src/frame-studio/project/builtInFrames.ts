// Token Studio's ready-made frames, as Frame Studio designs: the owner's
// Essentials, the new versions of Token Maker's frames chosen in the frame
// review (docs/FRAME-REVIEW.md), and the old picture frames
// (pictureFrameTemplates.ts). Token Maker lists them in its frame picker,
// with a colour picker for each of a design's colour slots; Frame Studio
// offers them in New, ready to change.

import type { ColourSlot } from './colourSlots';
import { CRAFTED_TEMPLATES } from './craftedTemplates';
import { LAYERED_TEMPLATES } from './defaults';
import { ESSENTIALS_DATA } from './essentialsData';
import { FRAME_VERSIONS } from './frameVersions';
import { fromLayers, slot, type BuiltInFrame } from './houseStyle';
import { parseProject } from './migrate';
import { PICTURE_FRAME_TEMPLATES } from './pictureFrameTemplates';

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

// ── The old picture frames ──────────────────────────────────────────────────

const CRAFTED: BuiltInFrame[] = PICTURE_FRAME_TEMPLATES.map((t) => ({
  id: t.id,
  name: t.name,
  description: t.description,
  group: 'Crafted',
  colours: [],
  project: fromLayers(t.name, t.make, t.stage),
}));

// ── Frame Studio's Crafted borders, reviewed the same way ───────────────────

const BORDERS: BuiltInFrame[] = CRAFTED_TEMPLATES.map((t) => ({
  id: t.id,
  name: t.name,
  description: t.description,
  group: 'Crafted',
  colours: [],
  project: fromLayers(t.name, t.make, t.stage),
}));
/** The Crafted borders, by id: Frame Studio lists these and their new versions in their own section of New. */
export const BORDER_IDS: ReadonlySet<string> = new Set(CRAFTED_TEMPLATES.map((t) => t.id));

/**
 * Frames the owner retired in the frame review: Token Maker leaves them out of
 * its picker unless a token already uses one (their new versions stand on
 * their own), and Frame Studio leaves them out of New.
 */
export const RETIRED_FRAMES: ReadonlySet<string> = new Set(['dragon-scales', 'raven-plume', 'riveted-plates', 'brass-beads', 'jewelled', 'dwarven-bronze', 'eldritch-crystal', 'radiant-gold', 'royal-inscription', 'rune-plates', 'moon-stars', 'frostbound', 'celtic', 'royal', 'grim-iron']);

// ── Frame Studio's Layered starting designs, once reviewed ───────────────────

/** The Layered designs the frame review has reached: Token Maker lists these (in Crafted) with their new versions. */
const REVIEWED_LAYERED = new Set(['brass-beads', 'glowing-runes', 'jewelled', 'battle-steel', 'night-sky', 'dwarven-bronze', 'eldritch-crystal', 'radiant-gold', 'hellforged-iron', 'royal-inscription', 'rune-plates', 'moon-stars', 'frostbound', 'celtic', 'royal', 'grim-iron']);
const LAYERED: BuiltInFrame[] = LAYERED_TEMPLATES.filter((t) => REVIEWED_LAYERED.has(t.id)).map((t) => ({
  id: t.id,
  name: t.name,
  description: t.description,
  group: 'Crafted',
  colours: [],
  project: fromLayers(t.name, t.make),
}));
/** Every Layered design's id: Frame Studio lists their new versions with them in the Layered section of New. */
export const LAYERED_IDS: ReadonlySet<string> = new Set(LAYERED_TEMPLATES.map((t) => t.id));

export const BUILT_IN_FRAMES: readonly BuiltInFrame[] = [...ESSENTIALS, ...FRAME_VERSIONS, ...CRAFTED, ...BORDERS, ...LAYERED];
export type { BuiltInFrame, BuiltInGroup } from './houseStyle';
export const builtInFrameById = (id: string) => BUILT_IN_FRAMES.find((f) => f.id === id);
