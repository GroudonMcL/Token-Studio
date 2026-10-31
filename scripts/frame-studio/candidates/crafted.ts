// Shared bits for the Crafted frames' candidates.
import { builtInFrameById } from '../../../src/frame-studio/project/builtInFrames';
export const crafted = (id: string) => () => builtInFrameById(id)!.project();
