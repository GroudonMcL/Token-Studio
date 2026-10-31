// Infernal: candidates for new versions of Token Maker's Infernal frame.
import {
  adjust, bandFillLayer, base, bevel, blur, contact, DROP, glow, glowCracks, lineLayer, metalFx, overlay, photo,
  projectFromFrame, recolour, repeatLayer, shapeLayer, slot, textLayer, textureLayer, wear, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('infernal');
const OATH = 'BURN · BREAK · BIND · NONE ESCAPE THE PIT · WHAT IS PROMISED IS OWED · ';
const fireRunes = (fill: string, glowColor: string, at: number, size: number) => ({
  ...textLayer(),
  name: 'Burning runes',
  font: 'runes' as const,
  text: OATH.repeat(3),
  size,
  spacing: 0.22,
  at,
  fill,
  effects: [glow({ inner: true, color: '#fff4c0', opacity: 0.6, size: 0.04 }), glow({ color: glowColor, opacity: 0.9, size: 0.18 })],
});
const IRON = ['#020101', '#0a0808', '#1e1a19', '#4a4240', '#a09088'];

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-hellfire-runes',
    name: 'A · Hellfire runes',
    pitch: 'Infernal in your style: a charcoal-to-crimson band with runes burning orange in the pressed-in step.',
    stage: { bloom: 0.25 },
    colours: [slot('band', 'Frame colour', '#8a1a10', ['Band', 'Pressed-in step']), slot('fire', 'Fire colour', '#ff6a1a', ['Burning runes', 'Ember seam'])],
    layers: () => [
      ...base({ light: '#8a1a10', dark: '#0a0202', step: 0.5 }),
      { ...lineLayer(), name: 'Ember seam', at: 0.5, width: 0.025, paint: { kind: 'solid', color: '#ffd080' }, effects: [glow({ color: '#ff6a1a', opacity: 0.9, size: 0.12 })] },
      fireRunes('#ffe8a0', '#ff6a1a', 0.75, 0.4),
    ],
  },
  {
    id: 'b-brimstone',
    name: 'B · Brimstone',
    pitch: 'Dark volcanic rock split by your glowing lava cracks, with a hot glow round the edges.',
    stage: { bloom: 0.3, bleed: 0.2 },
    colours: [slot('fire', 'Fire colour', '#ff4a10', ['Glowing cracks', 'Second cracks', 'Glowing lines'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Rock', paint: photo('dark-rock', 3, { lighting: 0.4 }), effects: [adjust({ brightness: -0.35, contrast: 0.3 }), bevel({ profile: 'chisel', size: 0.35, gloss: 0.15, highlightOpacity: 0.25 }), DROP] },
      glowCracks('#1a0804', '#ef1d06', '#ff8a2a'),
      { ...glowCracks('#1a0804', '#ff6a06', '#ffd04a', 1, 0.7), name: 'Second cracks' },
      { ...lineLayer(), name: 'Glowing lines', at: 0.03, width: 0.03, paint: { kind: 'solid', color: '#ffb060' }, effects: [glow({ color: '#ff4a10', opacity: 0.8, size: 0.14 })] },
      { ...lineLayer(), name: 'Glowing lines', at: 0.97, width: 0.03, paint: { kind: 'solid', color: '#ffb060' }, effects: [glow({ color: '#ff4a10', opacity: 0.8, size: 0.14 })] },
    ],
  },
  {
    id: 'c-iron-spikes',
    name: 'C · Infernal iron',
    pitch: 'Blackened, scarred iron with spikes along the outside and a red-hot seam.',
    stage: { bloom: 0.2 },
    colours: [slot('metal', 'Metal colour', '#3a3230', ['Iron', 'Spikes']), slot('fire', 'Fire colour', '#ff3a10', ['Hot seam'])],
    layers: () => [
      { ...repeatLayer(), name: 'Spikes', element: 'spike', count: 16, at: -0.2, size: 0.95, stretch: 0.45, fill: '#5a5250', raised: false, effects: [...metalFx(IRON, 0.5, 0.6)] },
      { ...bandFillLayer(), name: 'Iron', paint: photo('hammered-metal', 1.6, { lighting: 0.5 }), effects: [wear({ chips: 0.04, polish: 0.4, grime: 0.4, scale: 0.12, scratches: 0.3 }), ...metalFx(IRON, 0.25, 0.5), DROP] },
      { ...lineLayer(), name: 'Hot seam', at: 0.6, width: 0.04, paint: { kind: 'solid', color: '#ffb060' }, effects: [glow({ color: '#ff3a10', opacity: 0.95, size: 0.16 })] },
    ],
  },
  {
    id: 'd-blood-enamel',
    name: 'D · Blood pact',
    pitch: 'Glossy blood-red enamel between black iron rims, with glowing pentagram sigils at the quarters.',
    stage: { bloom: 0.2 },
    colours: [slot('enamel', 'Enamel colour', '#a01020', ['Enamel']), slot('metal', 'Metal colour', '#3a3230', ['Outer iron', 'Inner iron']), slot('fire', 'Sigil colour', '#ff6a1a', ['Sigils'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Enamel', paint: { kind: 'linear', angle: 45, followLight: false, stops: [{ at: 0, color: '#ff4050', opacity: 1 }, { at: 0.5, color: '#a01020', opacity: 1 }, { at: 1, color: '#200204', opacity: 1 }] }, effects: [bevel({ direction: 'sunken', size: 0.15, gloss: 0.9, highlightOpacity: 0.6, soften: 0.02 }), DROP] },
      { ...bandFillLayer(), name: 'Outer iron', to: 0.22, paint: photo('hammered-metal', 1.6, { lighting: 0.5 }), effects: metalFx(IRON, 0.45, 0.6) },
      { ...bandFillLayer(), name: 'Inner iron', from: 0.78, paint: photo('hammered-metal', 1.6, { lighting: 0.5 }), effects: metalFx(IRON, 0.45, 0.6) },
      { ...shapeLayer(), name: 'Sigils', shape: 'star', sides: 5, innerRatio: 0.38, along: 0.125, across: 0.5, size: 0.75, fill: '#ffd080', outline: null, raised: false, mirror: 'four', effects: [glow({ color: '#ff6a1a', opacity: 0.9, size: 0.16 }), contact(0.5)] },
    ],
  },
  {
    id: 'e-smoulder',
    name: 'E · Smoulder',
    pitch: 'Smoke curling over deep red embers, with sparks drifting through it. Moody and soft.',
    stage: { bloom: 0.25 },
    colours: [slot('band', 'Ember colour', '#6a0e06', ['Band']), slot('smoke', 'Smoke colour', '#5a4a48', ['Smoke']), slot('sparks', 'Spark colour', '#ffb040', ['Sparks'])],
    layers: () => [
      ...base({ light: '#c0300a', dark: '#120202', step: null, rims: false }),
      overlay('lava-flow', 6, 'overlay', 0.6, { angle: 30 }),
      { ...textureLayer('smoke'), name: 'Smoke', color: '#5a4a48', color2: '#120604', opacity: 0.8, seed: 0x5e0c },
      { ...textureLayer('sparkle'), name: 'Sparks', color: '#ffb040', amount: 1, scale: 0.5, seed: 0x5a2c, effects: [glow({ color: '#ff6a1a', opacity: 0.7, size: 0.06 }), blur(0.005)] },
      { ...lineLayer(), name: 'Rim', at: 0.02, width: 0.04, blend: 'overlay', paint: { kind: 'linear', angle: 45, followLight: true, stops: [{ at: 0, color: '#ffe0c0', opacity: 0.9 }, { at: 1, color: '#000000', opacity: 0 }] } },
    ],
  },
];
export { recolour };
