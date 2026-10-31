// Starfield: candidates for new versions of Token Maker's Starfield frame.
import {
  bandFillLayer, base, bevel, blur, glow, inscription, lin, lineLayer, overlay, projectFromFrame, repeatLayer,
  shapeLayer, slot, textureLayer, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('starfield');
const silver = lin(['#ffffff', '#8a90a0', '#3a3e4a']);

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-deep-space',
    name: 'A · Deep space',
    pitch: 'A violet nebula drifting through a field of stars, between thin silver rims.',
    stage: { bloom: 0.2 },
    colours: [slot('sky', 'Sky colour', '#2a1a5a', ['Band']), slot('nebula', 'Nebula colour', '#d04ab0', ['Nebula'])],
    layers: () => [
      ...base({ light: '#3a2a7a', dark: '#04020e', step: null, rims: false }),
      { ...textureLayer('nebula'), name: 'Nebula', color: '#d04ab0', color2: '#3a6aff', opacity: 0.8, blend: 'screen', seed: 0x2ec },
      { ...textureLayer('sparkle'), name: 'Stars', color: '#ffffff', amount: 1.4, scale: 0.5, seed: 0x5a2e },
      { ...lineLayer(), name: 'Silver rim', at: 0.025, width: 0.05, paint: silver, effects: [bevel({ size: 0.6, gloss: 0.9 })] },
      { ...lineLayer(), name: 'Silver rim', at: 0.975, width: 0.05, paint: silver, effects: [bevel({ size: 0.6, gloss: 0.9 })] },
    ],
  },
  {
    id: 'b-star-chart',
    name: 'B · Star chart',
    pitch: 'A navigator’s star chart: deep blue with thin gold rings and an Outer Rim AF inscription.',
    colours: [slot('sky', 'Chart colour', '#0e1a40', ['Band', 'Stars']), slot('ink', 'Ink colour', '#e8c878', ['Chart rings', 'Chart script', 'Compass points'])],
    layers: () => [
      ...base({ light: '#2a3a7a', dark: '#02040e', step: null, rims: false }),
      { ...textureLayer('sparkle'), name: 'Stars', color: '#c8d8ff', amount: 0.8, scale: 0.4, seed: 0x5a2f },
      { ...lineLayer(), name: 'Chart rings', at: 0.12, width: 0.025, paint: { kind: 'solid', color: '#e8c878' } },
      { ...lineLayer(), name: 'Chart rings', at: 0.88, width: 0.025, paint: { kind: 'solid', color: '#e8c878' } },
      inscription('outerRim', '#e8c878', { name: 'Chart script', size: 0.38, start: 1 }),
      { ...shapeLayer(), name: 'Compass points', shape: 'star', sides: 4, innerRatio: 0.3, along: 0, across: 0.5, size: 0.85, fill: '#e8c878', outline: null, raised: false, mirror: 'four', effects: [glow({ color: '#ffe0a0', opacity: 0.5, size: 0.1 })] },
    ],
  },
  {
    id: 'c-galaxy',
    name: 'C · Galaxy swirl',
    pitch: 'Stars and gas whirling round the band like a spiral galaxy, softly blurred by the spin.',
    stage: { bloom: 0.3 },
    colours: [slot('sky', 'Sky colour', '#140a30', ['Band']), slot('core', 'Glow colour', '#8a6aff', ['Swirl'])],
    layers: () => [
      ...base({ light: '#2a1a5a', dark: '#020108', step: null, rims: false }),
      { ...textureLayer('nebula'), name: 'Swirl', color: '#8a6aff', color2: '#ff6ac8', opacity: 0.9, blend: 'screen', seed: 0x2ed, effects: [{ kind: 'blur', on: true, mode: 'spin', amount: 0.6, keepShape: true }] },
      { ...textureLayer('sparkle'), name: 'Stars', color: '#ffffff', amount: 1.2, scale: 0.45, seed: 0x5a30 },
    ],
  },
  {
    id: 'd-moon-phases',
    name: 'D · Moon phases',
    pitch: 'Silver moons waxing and waning round a midnight band scattered with stars.',
    colours: [slot('sky', 'Sky colour', '#141c3a', ['Band', 'Stars']), slot('moon', 'Moon colour', '#e4e8f0', ['Moons'])],
    layers: () => [
      ...base({ light: '#2a3a6a', dark: '#02040a', step: null }),
      { ...textureLayer('sparkle'), name: 'Stars', color: '#e8ecff', amount: 0.8, scale: 0.45, seed: 0x5a31 },
      { ...repeatLayer(), name: 'Moons', element: 'circle', count: 8, at: 0.5, size: 0.7, fill: '#e4e8f0', raised: false, effects: [bevel({ size: 0.6, gloss: 0.6 }), glow({ color: '#c8d8ff', opacity: 0.5, size: 0.1 })] },
      { ...repeatLayer(), name: 'Moon shadows', element: 'circle', count: 8, at: 0.44, size: 0.62, fill: '#0a0e1e', raised: false, shaded: false, opacity: 0.9, offset: 0.06 },
    ],
  },
  {
    id: 'e-aurora',
    name: 'E · Aurora',
    pitch: 'Ribbons of green and violet aurora light rippling over a starry night.',
    stage: { bloom: 0.3 },
    colours: [slot('first', 'First light', '#40ffa0', ['Aurora']), slot('second', 'Second light', '#a060ff', ['Aurora glow'])],
    layers: () => [
      ...base({ light: '#1a2a4a', dark: '#020408', step: null, rims: false }),
      { ...textureLayer('sparkle'), name: 'Stars', color: '#ffffff', amount: 0.9, scale: 0.4, seed: 0x5a32 },
      { ...bandFillLayer(), name: 'Aurora', from: 0.15, to: 0.6, paint: lin(['#40ffa0', '#40ffa0', '#20a0ff'], 0), opacity: 0.6, blend: 'screen', clip: 'band', effects: [blur(0.06)] },
      { ...bandFillLayer(), name: 'Aurora glow', from: 0.4, to: 0.85, paint: lin(['#a060ff', '#ff60c0'], 0), opacity: 0.5, blend: 'screen', clip: 'band', effects: [blur(0.06)] },
      overlay('blue-onyx', 8, 'soft-light', 0.3),
    ],
  },
];
