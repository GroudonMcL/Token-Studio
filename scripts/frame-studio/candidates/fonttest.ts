// Not a frame: one band per text font, to compare them.
import { base, inscription, projectFromFrame, type Candidate } from './common';
import { TEXT_FONTS } from '../../../src/frame-studio/project/types';
export const CURRENT = () => projectFromFrame('minimal');
export const CANDIDATES: Candidate[] = TEXT_FONTS.map((f, i) => ({
  id: `${String.fromCharCode(97 + i)}-${f}`,
  name: `${String.fromCharCode(65 + i)} · ${f}`,
  pitch: f,
  layers: () => [...base({ light: '#5a6a8a', dark: '#101420', step: null }), inscription(f, '#f0e8d0', { size: 0.42 })],
}));
