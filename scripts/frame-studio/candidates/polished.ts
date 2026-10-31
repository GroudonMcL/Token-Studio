// Polished: candidates for new versions of Token Maker's Polished frame.
import {
  bandFillLayer, base, bevel, DROP, glow, lin, lineLayer, metalFx, photo, projectFromFrame, rims, SILVER_STOPS, slot,
  STEEL_STOPS, textureLayer, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('minimal');

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-chrome',
    name: 'A · Mirror chrome',
    pitch: 'High-contrast chrome that reflects a bright sky and dark ground all the way round.',
    colours: [slot('metal', 'Metal colour', '#a8b0bc', ['Chrome'])],
    layers: () => [
      {
        ...bandFillLayer(),
        name: 'Chrome',
        paint: { kind: 'ring', followLight: true, stops: [0, 40, 80, 120, 160, 200, 225, 250, 290, 330].map((angle, i) => ({ angle, color: ['#2a3038', '#0e1014', '#5a6470', '#f4f8ff', '#8a94a0', '#ffffff', '#ffffff', '#c8d0da', '#1a1e24', '#6a7480'][i] })) },
        effects: [bevel({ profile: 'rounded', size: 0.5, depth: 1.2, gloss: 1, highlightOpacity: 0.8, soften: 0.02 }), DROP],
      },
      ...rims(),
    ],
  },
  {
    id: 'b-stepped-steel',
    name: 'B · Stepped steel',
    pitch: 'Your Simple band in polished steel: a lit outer half and a pressed-in inner step.',
    colours: [slot('metal', 'Metal colour', '#8a8f99', ['Band', 'Pressed-in step'])],
    layers: () => [...base({ light: '#f0f4fa', dark: '#2a2e36', step: 0.55 })],
  },
  {
    id: 'c-titanium',
    name: 'C · Anodised titanium',
    pitch: 'Brushed titanium with an anodised sheen that shifts from blue to violet round the band.',
    stage: { bloom: 0.1 },
    colours: [slot('metal', 'Sheen colour', '#5a6aff', ['Titanium', 'Sheen'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Titanium', paint: photo('hammered-metal', 3, { lighting: 0.4 }), effects: [...metalFx(STEEL_STOPS, 0.35, 0.8), DROP] },
      { ...textureLayer('brushed'), name: 'Brushing', color: '#c8ced6', opacity: 0.5, seed: 0xb705 },
      { ...bandFillLayer(), name: 'Sheen', blend: 'color', opacity: 0.7, paint: { kind: 'ring', followLight: false, stops: [{ angle: 0, color: '#3a8aff' }, { angle: 120, color: '#5a6aff' }, { angle: 240, color: '#a04aff' }, { angle: 330, color: '#3a8aff' }] } },
      ...rims(),
    ],
  },
  {
    id: 'd-pearl',
    name: 'D · Pearl',
    pitch: 'Soft glossy pearl with a faint rainbow shimmer, light and calm.',
    colours: [slot('band', 'Pearl colour', '#ece6de', ['Band', 'Pressed-in step'])],
    layers: () => [
      ...base({ light: '#ffffff', dark: '#a8a098', step: 0.55, rims: false }),
      { ...bandFillLayer(), name: 'Shimmer', blend: 'soft-light', opacity: 0.6, paint: lin(['#ffc8e8', '#c8f0ff', '#e8ffd0', '#ffe8c0'], 30) },
      { ...lineLayer(), name: 'Gloss', at: 0.25, width: 0.05, paint: { kind: 'solid', color: '#ffffff' }, opacity: 0.6, blend: 'screen', effects: [glow({ color: '#ffffff', opacity: 0.5, size: 0.08 })] },
      ...rims(),
    ],
  },
  {
    id: 'e-obsidian',
    name: 'E · Obsidian',
    pitch: 'Black volcanic glass, polished to a sharp highlight, with a faint coloured glint.',
    colours: [slot('band', 'Glint colour', '#4a3a6a', ['Band', 'Glint'])],
    layers: () => [
      ...base({ light: '#4a3a6a', dark: '#020204', step: null, rims: false }),
      { ...bandFillLayer(), name: 'Glass', paint: photo('black-onyx', 6), opacity: 0.6, blend: 'overlay' },
      { ...bandFillLayer(), name: 'Glint', paint: lin(['#ffffff', '#4a3a6a', '#000000'], 45, true), opacity: 0.35, blend: 'screen', effects: [bevel({ profile: 'rounded', size: 0.5, gloss: 1, highlightOpacity: 0.9 })] },
      ...rims(),
    ],
  },
];
export { SILVER_STOPS };
