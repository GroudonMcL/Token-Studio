// Bard: candidates for new versions of Token Maker's Bard frame.
import {
  bandFillLayer, base, bevel, contact, DROP, glow, goldFx, goldPaint, inscription, lin, lineLayer, photo,
  projectFromFrame, recolour, repeatLayer, rims, slot, textureLayer, WARM_GOLD, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('bard');
const LUTE = ['#140a04', '#4a2a12', '#9a6a3a', '#d8a870', '#f8e0b8'];

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-lute',
    name: 'A · Lute',
    pitch: 'Polished lute wood with four strings running round it and gold notes dancing along them.',
    colours: [slot('wood', 'Wood colour', '#9a6a3a', ['Wood']), slot('notes', 'Note colour', '#c8952e', ['Notes'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Wood', paint: photo('wood-planks', 1.4, { angle: 90, lighting: 0.4 }), effects: [recolour(LUTE), bevel({ size: 0.35, gloss: 0.7, highlightOpacity: 0.6 }), DROP] },
      ...[0.3, 0.43, 0.57, 0.7].map((at) => ({ ...lineLayer(), name: 'Strings', at, width: 0.015, paint: { kind: 'solid' as const, color: '#f4f0e8' }, effects: [contact(0.5)] })),
      { ...repeatLayer(), name: 'Notes', element: 'bardNote', count: 8, at: 0.5, size: 1.05, fill: '#c8952e', raised: true, effects: [recolour(WARM_GOLD), bevel({ size: 0.5, gloss: 0.8 }), contact(0.6)] },
    ],
  },
  {
    id: 'b-velvet-notes',
    name: 'B · Velvet & gold',
    pitch: 'Plum velvet between gold rims, with glowing gold notes. A performer’s stage curtain.',
    stage: { bloom: 0.15 },
    colours: [slot('velvet', 'Velvet colour', '#5a1a5a', ['Velvet']), slot('gold', 'Gold colour', '#c8952e', ['Outer gold', 'Inner gold', 'Notes'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Velvet', paint: photo('jacquard', 1.2, { lighting: 0.6 }), effects: [recolour(['#1a061a', '#4a1a4a', '#8a3a8a', '#d08ad0']), bevel({ size: 0.5, gloss: 0.2, highlightOpacity: 0.35 }), DROP] },
      { ...bandFillLayer(), name: 'Outer gold', to: 0.14, paint: goldPaint(1.4), effects: goldFx(0.5, WARM_GOLD) },
      { ...bandFillLayer(), name: 'Inner gold', from: 0.86, paint: goldPaint(1.4), effects: goldFx(0.5, WARM_GOLD) },
      { ...repeatLayer(), name: 'Notes', element: 'note', count: 10, at: 0.5, size: 0.85, fill: '#f0d080', raised: false, shaded: false, effects: [glow({ color: '#ffc040', opacity: 0.7, size: 0.1 })] },
    ],
  },
  {
    id: 'c-stave',
    name: 'C · Song stave',
    pitch: 'A musical stave of five lines running round your clean band, with notes written along it.',
    colours: [slot('band', 'Frame colour', '#e8e0f0', ['Band', 'Pressed-in step']), slot('ink', 'Ink colour', '#2a1a3a', ['Stave', 'Notes'])],
    layers: () => [
      ...base({ light: '#ffffff', dark: '#8a7a9a', step: null }),
      ...[0.3, 0.4, 0.5, 0.6, 0.7].map((at) => ({ ...lineLayer(), name: 'Stave', at, width: 0.012, paint: { kind: 'solid' as const, color: '#2a1a3a' } })),
      { ...repeatLayer(), name: 'Notes', element: 'note', count: 14, at: 0.48, size: 0.7, fill: '#2a1a3a', raised: false, shaded: false },
    ],
  },
  {
    id: 'd-starlit-song',
    name: 'D · Starlit song',
    pitch: 'Notes glowing like stars on a deep violet night, with a Yugurian lyric round the inside.',
    stage: { bloom: 0.3 },
    colours: [slot('band', 'Frame colour', '#2a1048', ['Band', 'Sparkle']), slot('glow', 'Glow colour', '#d08aff', ['Notes', 'Lyric'])],
    layers: () => [
      ...base({ light: '#4a2a7a', dark: '#06020e', step: null, rims: false }),
      { ...textureLayer('sparkle'), name: 'Sparkle', color: '#f0e0ff', amount: 0.9, scale: 0.45, seed: 0x5a33 },
      { ...repeatLayer(), name: 'Notes', element: 'bardNote', count: 8, at: 0.4, size: 0.55, fill: '#f8e8ff', raised: false, shaded: false, effects: [glow({ color: '#d08aff', opacity: 0.9, size: 0.14 })] },
      inscription('yugurian', '#f0d8ff', { name: 'Lyric', at: 0.86, size: 0.2, start: 6, effects: [glow({ color: '#d08aff', opacity: 0.7, size: 0.08 })] }),
      ...rims(),
    ],
  },
  {
    id: 'e-lyre',
    name: 'E · Golden lyre',
    pitch: 'A rich purple enamel band with gold lyres at the quarters and fine gold lines.',
    colours: [slot('enamel', 'Enamel colour', '#6a2a8a', ['Enamel']), slot('gold', 'Gold colour', '#c8952e', ['Lyres', 'Gold lines'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Enamel', paint: lin(['#a05ad0', '#6a2a8a', '#1a0626']), effects: [bevel({ direction: 'sunken', size: 0.12, gloss: 0.9, highlightOpacity: 0.5 }), DROP] },
      { ...lineLayer(), name: 'Gold lines', at: 0.08, width: 0.06, paint: goldPaint(1.4), effects: goldFx(0.6, WARM_GOLD) },
      { ...lineLayer(), name: 'Gold lines', at: 0.92, width: 0.06, paint: goldPaint(1.4), effects: goldFx(0.6, WARM_GOLD) },
      { ...repeatLayer(), name: 'Lyres', element: 'icon-lyre', count: 4, at: 0.5, size: 1.4, fill: '#c8952e', raised: true, effects: [recolour(WARM_GOLD), bevel({ size: 0.4, gloss: 0.8 }), contact(0.6)] },
    ],
  },
];
