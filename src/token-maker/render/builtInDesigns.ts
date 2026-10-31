// The built-in Frame Studio designs (src/frame-studio/project/builtInFrames.ts,
// copied into frameStudio/): the owner's Essentials, the new versions of the
// drawn frames, and the old picture frames (gilded laurel, iron rivets…).
// They are listed with the drawn frames and used like any Frame Studio
// design, so they follow the token's shape and thickness; their colour
// slots each get a colour picker.

import type { DesignFrame, FrameSettings } from '../document/types';
import { BUILT_IN_FRAMES, type BuiltInGroup } from '../frameStudio/project/builtInFrames';
import { cleanChoices, recolourProject, type ColourChoices, type ColourSlot } from '../frameStudio/project/colourSlots';

/** The id a built-in design has in a document (`builtin:gilded-laurel`). */
const PREFIX = 'builtin:';

export interface BuiltInDesign {
  id: string;
  name: string;
  group: BuiltInGroup;
  /** Listed straight after this drawn frame, if any. */
  after?: string;
  colours: ColourSlot[];
  /** The band it was made for, in the same units as the token's frame settings. */
  band: Pick<FrameSettings, 'thickness' | 'outerSpacing'>;
}

const projects = new Map(BUILT_IN_FRAMES.map((f) => [f.id, f.project()]));

export const BUILT_IN_DESIGNS: readonly BuiltInDesign[] = BUILT_IN_FRAMES.map((f) => {
  const stage = projects.get(f.id)!.stage;
  return { id: PREFIX + f.id, name: f.name, group: f.group, after: f.after, colours: f.colours, band: { thickness: stage.thickness, outerSpacing: stage.outerSpacing } };
});

export const isBuiltInDesign = (id: string | null | undefined): boolean => !!id?.startsWith(PREFIX);
export const builtInDesignById = (id: string | null | undefined) => BUILT_IN_DESIGNS.find((b) => b.id === id || b.id === PREFIX + id);

/**
 * A built-in design as the frame, by its id, in the chosen colours. The old
 * picture frames' ids (`gilded-laurel`) work too, so tokens saved with them
 * get the new design.
 */
export function builtInDesignFrame(id: string, colours: ColourChoices = {}): DesignFrame | null {
  const key = id.startsWith(PREFIX) ? id.slice(PREFIX.length) : id;
  const f = BUILT_IN_FRAMES.find((x) => x.id === key);
  if (!f) return null;
  const chosen = cleanChoices(colours, f.colours);
  const project = recolourProject(structuredClone(projects.get(f.id)!), f.colours, chosen);
  return { id: PREFIX + f.id, name: f.name, project, ...(Object.keys(chosen).length ? { colours: chosen } : {}) };
}
