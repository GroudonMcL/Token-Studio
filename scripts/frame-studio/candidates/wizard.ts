// Wizard: candidates for a new version of Token Maker's Wizard frame.
import { projectFromFrame } from '../../../src/frame-studio/project/defaults';
import {
  base,
  goldPaint,
  SILVER_STOPS,
  bevel,
  blur,
  contact,
  DROP,
  glow,

  glowLines,
  goldFx,
  lin,
  lineLayer,
  overlay,
  photo,
  recolour,
  repeatLayer,
  rims,
  shapeLayer,
  solid,
  textLayer,
  textureLayer,
  bandFillLayer,
  fractureLayer,
  type Candidate,
} from './kit';

export const CURRENT = () => projectFromFrame('wizard');

const INSCRIPTION = 'FATE AND FIRE BEND TO THE WILL OF THE WISE · STARS AND STORM OBEY THE WORD OF THE WISE · ALL THINGS END · ALL THINGS BEGIN ·';
const runes = (color: string, glowColor: string, at = 0.5, size = 0.3) => ({
  ...textLayer(),
  name: 'Runic inscription',
  font: 'runes' as const,
  text: INSCRIPTION,
  size,
  spacing: 0.22,
  at,
  fill: color,
  effects: [glow({ inner: true, color: '#ffffff', opacity: 0.45, size: 0.04 }), glow({ color: glowColor, opacity: 0.85, size: 0.16 })],
});
const quarterStars = (fill: string, glowColor: string, size = 0.7, along = 0.125) => ({
  ...shapeLayer(),
  name: 'Star sigils',
  shape: 'star' as const,
  sides: 8,
  innerRatio: 0.38,
  along,
  across: 0.5,
  size,
  fill,
  outline: null,
  raised: false,
  faceted: true,
  facetTable: 0,
  mirror: 'four' as const,
  effects: [contact(0.5), glow({ color: glowColor, opacity: 0.55, size: 0.14 })],
});

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-sapphire',
    name: 'A · Sapphire inscription',
    pitch: 'Closest to today: your Simple band in deep sapphire, with the runes glowing in the pressed-in step.',
    layers: () => [...base({ light: '#5a8cff', dark: '#0a1440', step: 0.5 }), runes('#d8f0ff', '#4aa8ff', 0.76, 0.42)],
  },
  {
    id: 'b-starweave',
    name: 'B · Starweave',
    pitch: 'Night-sky marble with a faint nebula and twinkling stars, a silver lit rim and four gold star sigils.',
    stage: { bloom: 0.25 },
    layers: () => [
      ...base({ light: '#3a4ea8', dark: '#070a24', step: null, rims: false }),
      overlay('blue-onyx', 7, 'overlay', 0.55, { angle: 30 }),
      { ...textureLayer('nebula'), name: 'Nebula', color: '#7a5ae0', color2: '#2a6aff', opacity: 0.55, blend: 'screen', seed: 0x2eb },
      { ...textureLayer('sparkle'), name: 'Stars', color: '#f4f0ff', amount: 1.2, scale: 0.6, seed: 0x5a2c },
      { ...lineLayer(), name: 'Silver rim', at: 0.03, width: 0.06, paint: lin(['#ffffff', '#8a90a0', '#3a3e4a']), effects: [bevel({ size: 0.6, gloss: 0.9 })] },
      { ...lineLayer(), name: 'Inner silver', at: 0.975, width: 0.05, paint: lin(['#ffffff', '#8a90a0', '#3a3e4a']), effects: [bevel({ size: 0.6, gloss: 0.9 })] },
      { ...quarterStars('#f0d080', '#ffd870', 0.95), effects: [...goldFx(0.4), glow({ color: '#ffd870', opacity: 0.45, size: 0.12 })] },
    ],
  },
  {
    id: 'c-ley-glow',
    name: 'C · Ley-line glow',
    pitch: 'Your glowing-ice treatment in arcane blue-violet: dark band, glowing rings and glowing runes, with bloom.',
    stage: { bloom: 0.2, bleed: 0.1 },
    layers: () => [
      ...base({ light: '#2a2f6a', dark: '#05061a', step: 0.5 }),
      overlay('black-onyx', 8, 'screen', 0.35, { angle: -40 }),
      glowLines(['#d8e4ff', '#5a4ae0'], '#6a7aff', { width: 0.05, size: 0.14, opacity: 0.9 }),
      { ...repeatLayer(), name: 'Runes', element: 'rune', mode: 'spacing', spacing: 0.5, snapToCorners: false, at: 0.26, size: 0.36, stretch: 0.7, fill: '#d8e8ff', raised: false, shaded: false, effects: [glow({ color: '#6a8aff', opacity: 0.9, size: 0.14 })] },
      { ...repeatLayer(), name: 'Inner runes', element: 'rune', mode: 'spacing', spacing: 0.5, offset: 0.5, snapToCorners: false, at: 0.74, size: 0.3, stretch: 0.7, fill: '#c8b8ff', raised: false, shaded: false, opacity: 0.85, effects: [glow({ color: '#9a6aff', opacity: 0.9, size: 0.14 })] },
    ],
  },
  {
    id: 'd-gilded-grimoire',
    name: 'D · Gilded grimoire',
    pitch: 'Rich and classic: rough-gold rims round a sunken lapis enamel channel with a gold runic inscription.',
    layers: () => [
      { ...bandFillLayer(), name: 'Lapis enamel', paint: photo('blue-onyx', 4, { angle: 120, lighting: 0.2 }), effects: [recolour(['#050a30', '#14308a', '#2a5ad8', '#7aa0ff']), DROP] },
      { ...bandFillLayer(), name: 'Channel depth', from: 0.28, to: 0.72, blend: 'overlay', paint: { kind: 'acrossBand', stops: [{ at: 0, color: '#878787', opacity: 1 }, { at: 1, color: '#404040', opacity: 1 }] }, effects: [bevel({ direction: 'sunken', size: 0.15, gloss: 0.5, soften: 0.02 })] },
      { ...bandFillLayer(), name: 'Outer gold', from: 0, to: 0.3, paint: goldPaint(2.1), effects: [...goldFx(0.3), DROP] },
      { ...bandFillLayer(), name: 'Inner gold', from: 0.7, to: 1, paint: goldPaint(3), effects: [...goldFx(0.3), DROP] },
      { ...runes('#f6dc8a', '#ffcf5a', 0.5, 0.34), effects: [bevel({ size: 0.4, gloss: 0.7 }), glow({ color: '#ffc040', opacity: 0.35, size: 0.08 })] },
    ],
  },
  {
    id: 'e-amethyst',
    name: 'E · Amethyst arcanist',
    pitch: 'A change of colour: violet crystal facets, glowing lilac runes and silver crescent moons at the quarters.',
    stage: { bloom: 0.2 },
    layers: () => [
      ...base({ light: '#9a5ae8', dark: '#12042a', step: null, rims: false }),
      { ...textureLayer('crystal'), name: 'Crystal facets', color: '#7a4ad0', opacity: 0.55, blend: 'overlay', seed: 0xc275 },
      ...rims(),
      runes('#f4e4ff', '#c070ff', 0.5, 0.38),
      { ...shapeLayer(), name: 'Moons', shape: 'crescent' as const, innerRatio: 0.55, rotation: -30, along: 0.125, across: 0.5, size: 0.72, fill: '#c8ccd8', outline: null, raised: false, mirror: 'four' as const, effects: [bevel({ size: 0.5, gloss: 0.8 }), recolour(SILVER_STOPS), contact(0.6), glow({ color: '#d8c0ff', opacity: 0.5, size: 0.12 })] },
    ],
  },
  {
    id: 'f-stormcaller',
    name: 'F · Stormcaller',
    pitch: 'Dramatic: black onyx crackling with blue lightning between two glowing rings.',
    stage: { bloom: 0.4, bleed: 0.3 },
    layers: () => [
      ...base({ light: '#3a4a70', dark: '#05070c', step: null }),
      overlay('black-onyx', 6, 'hard-light', 0.7, { angle: 60 }),
      { ...fractureLayer(), name: 'Lightning', kind: 'lightning', count: 8, length: 2.2, width: 0.03, jagged: 0.75, branching: 0.4, color: '#eaf6ff', from: 0.2, to: 0.8, effects: [glow({ color: '#40a0ff', opacity: 0.9, size: 0.15 })] },
      { ...lineLayer(), name: 'Outer glow ring', at: 0.06, width: 0.04, paint: solid('#cfe8ff'), effects: [glow({ color: '#3a8aff', opacity: 0.9, size: 0.2 }), blur(0.03)] },
      { ...lineLayer(), name: 'Inner glow ring', at: 0.94, width: 0.04, paint: solid('#cfe8ff'), effects: [glow({ color: '#3a8aff', opacity: 0.9, size: 0.2 }), blur(0.03)] },
    ],
  },
];
