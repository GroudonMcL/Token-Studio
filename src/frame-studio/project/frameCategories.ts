// The broad categories Token Studio's frames are listed under (owner's request:
// by look and material, no class categories). Each frame is filed by its
// stack: a drawn frame or built-in design together with its new versions.

export const FRAME_CATEGORIES = [
  'Essentials',
  'Metal & Gems',
  'Stone & Earth',
  'Wood & Nature',
  'Elements',
  'Magic',
  'Sky & Stars',
  'Dark & Grim',
  'Hide, Cloth & Rope',
] as const;
export type FrameCategory = (typeof FRAME_CATEGORIES)[number];

/**
 * The category of each stack, by the id of its first frame: a drawn frame's
 * preset id or a built-in design's id. Stacks whose first frame was removed
 * in the frame review keep their old id here, so their versions stay filed.
 */
const STACKS: Record<string, FrameCategory> = {
  // Drawn frames (Token Maker's presets).
  none: 'Essentials',
  stamped: 'Metal & Gems',
  gilded: 'Metal & Gems',
  engraved: 'Metal & Gems',
  double: 'Metal & Gems',
  minimal: 'Metal & Gems',
  knotwork: 'Metal & Gems',
  fighter: 'Metal & Gems',
  paladin: 'Metal & Gems',
  artificer: 'Metal & Gems',
  cleric: 'Metal & Gems',
  cobblestone: 'Stone & Earth',
  oak: 'Wood & Nature',
  druid: 'Wood & Nature',
  ranger: 'Wood & Nature',
  magma: 'Elements',
  infernal: 'Elements',
  arcane: 'Magic',
  wizard: 'Magic',
  sorcerer: 'Magic',
  bard: 'Magic',
  starfield: 'Sky & Stars',
  warlock: 'Dark & Grim',
  barbarian: 'Hide, Cloth & Rope',
  harlequin: 'Hide, Cloth & Rope',
  monk: 'Hide, Cloth & Rope',
  rogue: 'Hide, Cloth & Rope',
  // The old picture frames.
  'gilded-laurel': 'Metal & Gems',
  'iron-rivets': 'Metal & Gems',
  'shield-rim': 'Metal & Gems',
  runestone: 'Stone & Earth',
  thorns: 'Wood & Nature',
  celestial: 'Sky & Stars',
  'dragon-scales': 'Hide, Cloth & Rope',
  rope: 'Hide, Cloth & Rope',
  // Frame Studio's Crafted borders.
  'filigree-border': 'Metal & Gems',
  'guild-gold': 'Metal & Gems',
  'riveted-plates': 'Metal & Gems',
  emberforged: 'Elements',
  'storm-wisps': 'Elements',
  'raven-plume': 'Hide, Cloth & Rope',
  // Frame Studio's Layered designs.
  'brass-beads': 'Metal & Gems',
  jewelled: 'Metal & Gems',
  'battle-steel': 'Metal & Gems',
  'dwarven-bronze': 'Metal & Gems',
  'radiant-gold': 'Metal & Gems',
  'royal-inscription': 'Metal & Gems',
  'rune-plates': 'Metal & Gems',
  royal: 'Metal & Gems',
  celtic: 'Stone & Earth',
  'hellforged-iron': 'Elements',
  frostbound: 'Elements',
  'glowing-runes': 'Magic',
  'eldritch-crystal': 'Magic',
  'night-sky': 'Sky & Stars',
  'moon-stars': 'Sky & Stars',
  'grim-iron': 'Dark & Grim',
  // Frame Studio's Themed designs.
  'enamel-gold': 'Metal & Gems',
  'worn-iron': 'Metal & Gems',
  starship: 'Metal & Gems',
  clockwork: 'Metal & Gems',
  'celtic-knot': 'Metal & Gems',
  'druid-circle': 'Stone & Earth',
  'desert-tomb': 'Stone & Earth',
  'amethyst-geode': 'Stone & Earth',
  'rose-wreath': 'Wood & Nature',
  'fey-glade': 'Wood & Nature',
  'autumn-leaves': 'Wood & Nature',
  'tidal-ring': 'Elements',
  'hellfire-ring': 'Elements',
  'frost-ring': 'Elements',
  'storm-ring': 'Elements',
  archmage: 'Magic',
  'celestial-halo': 'Sky & Stars',
  'gothic-thorns': 'Dark & Grim',
  necropolis: 'Dark & Grim',
  'dragon-scale': 'Hide, Cloth & Rope',
  nautical: 'Hide, Cloth & Rope',
};

/** The category a frame is listed under: its stack's (a version is filed with the frame it was made from). */
export function categoryOf(id: string, after?: string): FrameCategory {
  return STACKS[after ?? id] ?? STACKS[id] ?? 'Metal & Gems';
}

/** Whether a stack has been given a category (every frame should be). */
export const isFiled = (id: string) => id in STACKS;

/** Where a category comes in the list. */
export const categoryRank = (c: string) => {
  const i = (FRAME_CATEGORIES as readonly string[]).indexOf(c);
  return i < 0 ? FRAME_CATEGORIES.length : i;
};
