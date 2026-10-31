// Bard, round 2: more options with the fictional alphabets and runes.
import {
  bandFillLayer, base, bevel, contact, DROP, glow, goldFx, goldPaint, inscription, lin, lineLayer, overlay, photo,
  projectFromFrame, recolour, repeatLayer, rims, slot, textureLayer, WARM_GOLD, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('bard');
const goldLines = () => [0.08, 0.92].map((at) => ({ ...lineLayer(), name: 'Gold lines', at, width: 0.06, paint: goldPaint(1.4), effects: goldFx(0.6, WARM_GOLD) }));

export const CANDIDATES: Candidate[] = [
  {
    id: 'f-outer-rim-chorus',
    name: 'F · Outer Rim chorus',
    pitch: 'Deep teal enamel with lyrics in Outer Rim AF glowing between two gold lines.',
    stage: { bloom: 0.2 },
    colours: [slot('enamel', 'Enamel colour', '#0e5a6a', ['Enamel']), slot('glow', 'Lyric colour', '#8affe8', ['Lyrics']), slot('gold', 'Gold colour', '#c8952e', ['Gold lines'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Enamel', paint: lin(['#2a9aaa', '#0e5a6a', '#021a20']), effects: [bevel({ direction: 'sunken', size: 0.12, gloss: 0.9, highlightOpacity: 0.5 }), DROP] },
      ...goldLines(),
      inscription('outerRim', '#e0fff8', { name: 'Lyrics', size: 0.4, start: 2, effects: [glow({ color: '#8affe8', opacity: 0.85, size: 0.12 })] }),
    ],
  },
  {
    id: 'g-runic-chant',
    name: 'G · Runic chant',
    pitch: 'Carved dark wood with a chant in runes running round it and gold notes between the verses.',
    colours: [slot('wood', 'Wood colour', '#5a3418', ['Wood']), slot('gold', 'Gold colour', '#c8952e', ['Chant', 'Notes'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Wood', paint: photo('medieval-wood', 1.6, { angle: 90, lighting: 0.5 }), effects: [recolour(['#0a0402', '#2a1408', '#5a3418', '#9a6a40', '#d8b088']), bevel({ size: 0.35, gloss: 0.5 }), DROP] },
      inscription('runes', '#e8c060', { name: 'Chant', at: 0.3, size: 0.32, start: 9, effects: [bevel({ size: 0.4, gloss: 0.8 })] }),
      { ...repeatLayer(), name: 'Notes', element: 'note', count: 8, at: 0.74, size: 0.38, fill: '#c8952e', raised: true, effects: [recolour(WARM_GOLD), bevel({ size: 0.5, gloss: 0.8 }), contact(0.5)] },
    ],
  },
  {
    id: 'h-sith-aria',
    name: 'H · Crimson aria',
    pitch: 'Crimson velvet with an aria written in Sith AF in gold, framed by gold lines. Operatic.',
    colours: [slot('velvet', 'Velvet colour', '#8a1022', ['Velvet']), slot('gold', 'Gold colour', '#c8952e', ['Aria', 'Gold lines'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Velvet', paint: photo('jacquard', 1.2, { lighting: 0.6 }), effects: [bevel({ size: 0.5, gloss: 0.2, highlightOpacity: 0.35 }), DROP] },
      ...goldLines(),
      inscription('sith', '#f0d080', { name: 'Aria', size: 0.38, start: 3, effects: [bevel({ size: 0.4, gloss: 0.8 }), contact(0.4)] }),
    ],
  },
  {
    id: 'i-ballad-parchment',
    name: 'I · Ballad on parchment',
    pitch: 'Aged parchment with a ballad written in BabelStone runes in brown ink, and a red ribbon edge.',
    colours: [slot('paper', 'Parchment colour', '#e0cca0', ['Band', 'Texture']), slot('ink', 'Ink colour', '#4a2a10', ['Ballad']), slot('ribbon', 'Ribbon colour', '#a01a2a', ['Ribbon'])],
    layers: () => [
      ...base({ light: '#f8e8c0', dark: '#8a6a40', step: null, rims: false }),
      overlay('cracked-mud', 2.4, 'multiply', 0.35),
      inscription('babelstone', '#4a2a10', { name: 'Ballad', at: 0.42, size: 0.36, start: 4 }),
      { ...lineLayer(), name: 'Ribbon', at: 0.92, width: 0.12, paint: lin(['#e04a5a', '#a01a2a', '#3a0408']), effects: [bevel({ size: 0.7, gloss: 0.5 }), contact(0.5)] },
      ...rims(),
    ],
  },
  {
    id: 'j-moon-verse',
    name: 'J · Moonlit verse',
    pitch: 'Silver notes and a Yugurian verse on midnight blue, with a faint shimmer of stars.',
    stage: { bloom: 0.2 },
    colours: [slot('band', 'Frame colour', '#141c3a', ['Band', 'Stars']), slot('silver', 'Silver colour', '#e4e8f0', ['Notes', 'Verse'])],
    layers: () => [
      ...base({ light: '#2a3a6a', dark: '#02040a', step: 0.6 }),
      { ...textureLayer('sparkle'), name: 'Stars', color: '#e8ecff', amount: 0.6, scale: 0.4, seed: 0x5a35 },
      { ...repeatLayer(), name: 'Notes', element: 'bardNote', count: 8, at: 0.3, size: 0.48, fill: '#e4e8f0', raised: false, shaded: false, effects: [glow({ color: '#c8d8ff', opacity: 0.7, size: 0.1 })] },
      inscription('yugurian', '#e4e8f0', { name: 'Verse', at: 0.8, size: 0.26, start: 8, effects: [glow({ color: '#c8d8ff', opacity: 0.6, size: 0.08 })] }),
    ],
  },
];
export { rims };
