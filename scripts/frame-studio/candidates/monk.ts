// Monk: candidates for new versions of Token Maker's Monk frame.
import {
  bandFillLayer, base, bevel, blur, contact, DROP, goldFx, goldPaint, inscription, lin, lineLayer, photo,
  projectFromFrame, recolour, repeatLayer, rims, slot, textureLayer, WARM_GOLD, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('monk');

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-prayer-beads',
    name: 'A · Prayer beads',
    pitch: 'A loop of polished wooden prayer beads on a cord, with jade beads at the quarters.',
    colours: [slot('beads', 'Bead colour', '#8a5a32', ['Beads']), slot('jade', 'Jade colour', '#3a9a6a', ['Jade beads']), slot('cord', 'Cord colour', '#c4622c', ['Cord'])],
    layers: () => [
      { ...lineLayer(), name: 'Cord', at: 0.5, width: 0.12, paint: { kind: 'solid', color: '#c4622c' }, effects: [bevel({ size: 0.8, gloss: 0.3 }), DROP] },
      { ...repeatLayer(), name: 'Beads', element: 'bead', mode: 'spacing', spacing: 0.62, snapToCorners: false, at: 0.5, size: 0.62, fill: '#8a5a32', raised: true, effects: [bevel({ profile: 'rounded', size: 0.6, gloss: 0.8, highlightOpacity: 0.7 }), contact(0.6)] },
      { ...repeatLayer(), name: 'Jade beads', element: 'bead', count: 4, at: 0.5, size: 0.8, fill: '#3a9a6a', raised: true, effects: [bevel({ profile: 'rounded', size: 0.6, gloss: 0.95, highlightOpacity: 0.8 }), contact(0.6)] },
    ],
  },
  {
    id: 'b-saffron',
    name: 'B · Saffron robe',
    pitch: 'Folded saffron cloth with a knotted cord running round its middle.',
    colours: [slot('cloth', 'Cloth colour', '#e07a1a', ['Cloth']), slot('cord', 'Cord colour', '#8a2a1a', ['Cord', 'Twist'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Cloth', paint: photo('hessian', 0.8, { lighting: 0.6 }), effects: [recolour(['#2a0a02', '#8a3a06', '#e07a1a', '#ffc070']), bevel({ size: 0.6, gloss: 0.15, highlightOpacity: 0.35 }), DROP] },
      { ...bandFillLayer(), name: 'Cord', from: 0.36, to: 0.64, paint: lin(['#e06a5a', '#a03a2a', '#3a0804']), effects: [bevel({ size: 0.9, gloss: 0.4 }), contact(0.5)] },
      { ...textureLayer('rope'), name: 'Twist', from: 0.36, to: 0.64, color: '#c05a4a', seed: 0xbeae },
    ],
  },
  {
    id: 'c-jade-gold',
    name: 'C · Jade & gold',
    pitch: 'Polished green jade between gold rims, with a Yugurian sutra inscribed in gold.',
    colours: [slot('jade', 'Jade colour', '#3a9a6a', ['Jade']), slot('gold', 'Gold colour', '#c8952e', ['Outer gold', 'Inner gold', 'Sutra'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Jade', paint: photo('blue-onyx', 4, { angle: 60 }), effects: [recolour(['#021a0e', '#0e4a2a', '#3a9a6a', '#8ae0b0']), bevel({ size: 0.4, gloss: 0.95, highlightOpacity: 0.6 }), DROP] },
      { ...bandFillLayer(), name: 'Outer gold', to: 0.14, paint: goldPaint(1.4), effects: goldFx(0.5, WARM_GOLD) },
      { ...bandFillLayer(), name: 'Inner gold', from: 0.86, paint: goldPaint(1.4), effects: goldFx(0.5, WARM_GOLD) },
      inscription('yugurian', '#e8c060', { name: 'Sutra', size: 0.34, start: 7, effects: [bevel({ size: 0.4, gloss: 0.8 })] }),
    ],
  },
  {
    id: 'd-ink-enso',
    name: 'D · Ink circle',
    pitch: 'A single bold brushstroke of black ink on pale rice paper, like a Zen ensō.',
    colours: [slot('paper', 'Paper colour', '#f0e8d8', ['Band']), slot('ink', 'Ink colour', '#141414', ['Ink'])],
    layers: () => [
      ...base({ light: '#fffaf0', dark: '#b8ae98', step: null, rims: false }),
      { ...lineLayer(), name: 'Ink', at: 0.5, width: 0.55, paint: { kind: 'solid', color: '#141414' }, opacity: 0.92, effects: [{ kind: 'distort', on: true, amount: 0.12, scale: 0.25, seed: 4 }, blur(0.01)] },
      ...rims(),
    ],
  },
  {
    id: 'e-bamboo',
    name: 'E · Bamboo',
    pitch: 'Green bamboo, jointed every few inches, glossy and fresh.',
    colours: [slot('bamboo', 'Bamboo colour', '#6a9a3a', ['Band', 'Pressed-in step', 'Joints'])],
    layers: () => [
      ...base({ light: '#b8e070', dark: '#1e3a0a', step: null, rims: false }),
      { ...repeatLayer(), name: 'Joints', element: 'tick', count: 12, at: 0.5, size: 1.1, stretch: 0.18, fill: '#2a4a12', raised: false, shaded: false, opacity: 0.85, effects: [bevel({ size: 0.6, gloss: 0.4 })] },
      { ...lineLayer(), name: 'Sheen', at: 0.3, width: 0.08, paint: { kind: 'solid', color: '#ffffff' }, opacity: 0.25, blend: 'screen', effects: [blur(0.02)] },
      ...rims(),
    ],
  },
];
