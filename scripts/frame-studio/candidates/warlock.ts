// Warlock: candidates for new versions of Token Maker's Warlock frame.
import {
  bandFillLayer, base, bevel, contact, DROP, glow, glowCracks, growthLayer, inscription, overlay, photo,
  projectFromFrame, repeatLayer, slot, textureLayer, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('warlock');

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-pact-runes',
    name: 'A · Pact runes',
    pitch: 'Deep violet band with the terms of a pact glowing in Sith AF in the pressed-in step.',
    stage: { bloom: 0.25 },
    colours: [slot('band', 'Frame colour', '#5b2d7a', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#c06aff', ['Pact'])],
    layers: () => [
      ...base({ light: '#8a4ab0', dark: '#0e0214', step: 0.5 }),
      inscription('sith', '#f0d8ff', { name: 'Pact', at: 0.75, size: 0.4, start: 7, effects: [glow({ color: '#c06aff', opacity: 0.9, size: 0.14 })] }),
    ],
  },
  {
    id: 'b-eldritch-tendrils',
    name: 'B · Eldritch tendrils',
    pitch: 'Curling purple tendrils writhing through a black band, glowing faintly.',
    stage: { bloom: 0.25 },
    colours: [slot('band', 'Frame colour', '#120818', ['Band']), slot('tendrils', 'Tendril colour', '#8a3ab0', ['Tendrils'])],
    layers: () => [
      ...base({ light: '#2a1a3a', dark: '#020104', step: null }),
      { ...growthLayer('tendrils'), name: 'Tendrils', count: 3, thickness: 0.05, amplitude: 0.22, color: '#8a3ab0', extraColor: '#c06aff', effects: [glow({ color: '#a04aff', opacity: 0.7, size: 0.1 }), bevel({ size: 0.5, gloss: 0.5 })] },
    ],
  },
  {
    id: 'c-watching-eyes',
    name: 'C · Watching eyes',
    pitch: 'Eyes of every size half open in a dark violet hide, watching the token.',
    colours: [slot('hide', 'Hide colour', '#3a1a2a', ['Hide']), slot('eyes', 'Eye colour', '#c8a020', ['Eyes'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Hide', paint: photo('leather', 1.4, { lighting: 0.6 }), effects: [{ kind: 'recolour', on: true, amount: 1, stops: [{ at: 0, color: '#05020a', opacity: 1 }, { at: 0.5, color: '#3a1a2a', opacity: 1 }, { at: 1, color: '#8a5a7a', opacity: 1 }] }, bevel({ size: 0.4, gloss: 0.3 }), DROP] },
      { ...textureLayer('eyes'), name: 'Eyes', color: '#c8a020', seed: 0xe7e6 },
    ],
  },
  {
    id: 'd-void-cracks',
    name: 'D · Void cracks',
    pitch: 'Black obsidian split by cracks that glow with violet light from somewhere beyond.',
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
    id: 'e-hex-sigils',
    name: 'E · Hex sigils',
    pitch: 'Dark violet with glowing pentacle sigils at the quarters and a faint smoke drifting over it.',
    stage: { bloom: 0.25 },
    colours: [slot('band', 'Frame colour', '#2a1038', ['Band', 'Smoke']), slot('glow', 'Sigil colour', '#d08aff', ['Sigils'])],
    layers: () => [
      ...base({ light: '#4a2a6a', dark: '#06020a', step: null }),
      { ...textureLayer('smoke'), name: 'Smoke', color: '#8a6aaa', color2: '#06020a', opacity: 0.6, seed: 0x5e0f },
      { ...repeatLayer(), name: 'Sigils', element: 'icon-pentagram-rose', count: 4, at: 0.5, size: 1.1, fill: '#f0d8ff', raised: false, shaded: false, effects: [glow({ color: '#d08aff', opacity: 0.9, size: 0.14 }), contact(0.4)] },
    ],
  },
];
export { bevel };
