// Sending the design to Token Maker inside Token Studio. Frame Studio runs in
// a frame of Token Studio's page; the shell passes the design on to Token
// Maker and switches to it.

import type { FrameProject } from '../project/types';
import { projectTextWithPreview } from './files';

/** The message the shell listens for. */
export const SEND_FRAME_MESSAGE = 'token-studio:send-frame';

/** True when Frame Studio is open inside Token Studio. */
export const inTokenStudio = (): boolean => window.parent !== window;

/** Sends the design, with its preview, to Token Maker. */
export async function sendToTokenMaker(project: FrameProject): Promise<void> {
  const text = await projectTextWithPreview(project);
  window.parent.postMessage({ type: SEND_FRAME_MESSAGE, text, name: project.name }, window.location.origin);
}
