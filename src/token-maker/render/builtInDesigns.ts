// The built-in Frame Studio designs (owner feedback, document v11): the old
// picture frames (gilded laurel, iron rivets, runestone…) rebuilt from
// layers and photo textures in Frame Studio
// (src/frame-studio/project/pictureFrameTemplates.ts, copied into
// frameStudio/). They are listed with the drawn frames and used like any
// Frame Studio design, so they follow the token's shape and thickness.

import type { DesignFrame, FrameSettings } from '../document/types';
import { createProject } from '../frameStudio/project/defaults';
import { PICTURE_FRAME_TEMPLATES } from '../frameStudio/project/pictureFrameTemplates';

/** The id a built-in design has in a document (`builtin:gilded-laurel`). */
const PREFIX = 'builtin:';

export interface BuiltInDesign {
  id: string;
  name: string;
  /** The band it was made for, in the same units as the token's frame settings. */
  band: Pick<FrameSettings, 'thickness' | 'outerSpacing'>;
}

export const BUILT_IN_DESIGNS: readonly BuiltInDesign[] = PICTURE_FRAME_TEMPLATES.map((t) => ({
  id: PREFIX + t.id,
  name: t.name,
  band: { thickness: t.stage?.thickness ?? 0.14, outerSpacing: t.stage?.outerSpacing ?? 0.05 },
}));

export const isBuiltInDesign = (id: string | null | undefined): boolean => !!id?.startsWith(PREFIX);

/**
 * A built-in design as the frame, by its id. The old picture frames' ids
 * (`gilded-laurel`) work too, so tokens saved with them get the new design.
 */
export function builtInDesignFrame(id: string): DesignFrame | null {
  const key = id.startsWith(PREFIX) ? id.slice(PREFIX.length) : id;
  const t = PICTURE_FRAME_TEMPLATES.find((x) => x.id === key);
  if (!t) return null;
  const project = createProject(t.make(), t.name);
  return { id: PREFIX + t.id, name: t.name, project: { ...project, stage: { ...project.stage, ...t.stage } } };
}
