// Shared bits for the Crafted frames' candidates.
import { builtInFrameById } from '../../../src/frame-studio/project/builtInFrames';
export const crafted = (id: string) => () => builtInFrameById(id)!.project();
import { CRAFTED_TEMPLATES } from '../../../src/frame-studio/project/craftedTemplates';
import { createProject } from '../../../src/frame-studio/project/defaults';
/** A Frame Studio starting design (Crafted borders) as it is now. */
export const border = (id: string) => () => {
  const t = CRAFTED_TEMPLATES.find((x) => x.id === id)!;
  const p = createProject(t.make(), t.name);
  return { ...p, stage: { ...p.stage, ...t.stage } };
};
import { LAYERED_TEMPLATES } from '../../../src/frame-studio/project/defaults';
/** A Frame Studio starting design (Layered) as it is now. */
export const layered = (id: string) => () => {
  const t = LAYERED_TEMPLATES.find((x) => x.id === id)!;
  return createProject(t.make(), t.name);
};
import { THEMED_TEMPLATES, themedProject } from '../../../src/frame-studio/project/themedTemplates';
/** A Frame Studio starting design (Themed) as it is now. */
export const themed = (id: string) => () => themedProject(THEMED_TEMPLATES.find((x) => x.id === id)!);
