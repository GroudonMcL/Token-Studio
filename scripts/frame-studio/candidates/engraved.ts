// Engraved: candidates for new versions of Token Maker's Engraved frame.
import {
  adjust, bandFillLayer, bevel, BRONZE_STOPS, contact, DROP, knotworkLayer, lin, lineLayer, metalFx, photo,
  projectFromFrame, recolour, rims, slot, STEEL_STOPS, textLayer, textureLayer, type Candidate,
} from './common';

export const CURRENT = () => projectFromFrame('engraved');
const steel = (scale = 2.4) => photo('hammered-metal', scale, { lighting: 0.4 });
const sunk = bevel({ direction: 'sunken', size: 0.5, gloss: 0.5, soften: 0.01 });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-scrollwork',
    name: 'A · Scrollwork steel',
    pitch: 'Bright steel with engraved scrolls cut into it, between two polished rims. The classic engraver’s ring.',
    colours: [slot('metal', 'Metal colour', '#7a828c', ['Steel', 'Scrolls', 'Outer rim', 'Inner rim'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Steel', paint: steel(), effects: [...metalFx(STEEL_STOPS, 0.3, 0.8), DROP] },
      { ...textureLayer('filigree'), name: 'Scrolls', color: '#20262c', from: 0.15, to: 0.85, opacity: 0.85, blend: 'multiply', seed: 0xf111, effects: [sunk] },
      { ...lineLayer(), name: 'Outer rim', at: 0.06, width: 0.08, paint: lin(['#ffffff', '#7a828c', '#20262c']), effects: [bevel({ size: 0.6, gloss: 0.9 })] },
      { ...lineLayer(), name: 'Inner rim', at: 0.94, width: 0.08, paint: lin(['#ffffff', '#7a828c', '#20262c']), effects: [bevel({ size: 0.6, gloss: 0.9 })] },
    ],
  },
  {
    id: 'b-silver-inlay',
    name: 'B · Silver inlay',
    pitch: 'Blackened gunmetal with an inscription inlaid in bright silver, like a sword’s fuller.',
    colours: [slot('metal', 'Metal colour', '#3a4048', ['Gunmetal']), slot('inlay', 'Inlay colour', '#e4e8f0', ['Inlaid inscription', 'Inlay lines'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Gunmetal', paint: steel(2), effects: [...metalFx(['#050608', '#181c22', '#3a4048', '#7a828c', '#c8ced6'], 0.3, 0.7), DROP] },
      { ...lineLayer(), name: 'Inlay lines', at: 0.2, width: 0.035, paint: { kind: 'solid', color: '#e4e8f0' }, effects: [bevel({ size: 0.6, gloss: 0.9 })] },
      { ...lineLayer(), name: 'Inlay lines', at: 0.8, width: 0.035, paint: { kind: 'solid', color: '#e4e8f0' }, effects: [bevel({ size: 0.6, gloss: 0.9 })] },
      { ...textLayer(), name: 'Inlaid inscription', font: 'grenze', text: 'FORTUNE FAVOURS THE BOLD · STEEL REMEMBERS · '.repeat(3), size: 0.4, spacing: 0.12, at: 0.5, fill: '#e4e8f0', effects: [bevel({ size: 0.5, gloss: 0.9 }), contact(0.4)] },
      ...rims(),
    ],
  },
  {
    id: 'c-damascus',
    name: 'C · Damascus',
    pitch: 'Folded steel: flowing light and dark grain all the way round, with a polished bevel.',
    colours: [slot('metal', 'Metal colour', '#7a828c', ['Damascus'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Damascus', paint: photo('tiger-rock', 1.4, { angle: 90, lighting: 0.3 }), effects: [adjust({ contrast: 0.8 }), recolour(STEEL_STOPS), bevel({ profile: 'rounded', size: 0.35, gloss: 0.8, highlightOpacity: 0.7, soften: 0.02 }), DROP] },
      ...rims(),
    ],
  },
  {
    id: 'd-knotwork',
    name: 'D · Etched knotwork',
    pitch: 'Steel etched with an interlaced knot band, picked out in a darker colour.',
    colours: [slot('metal', 'Metal colour', '#7a828c', ['Steel']), slot('etch', 'Etching colour', '#1a2a3a', ['Etched knot'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Steel', paint: steel(), effects: [...metalFx(STEEL_STOPS, 0.3, 0.8), DROP] },
      { ...knotworkLayer(), name: 'Etched knot', width: 0.22, amplitude: 0.26, waveLength: 1.1, color: '#1a2a3a', outline: '#c8ced6', outlineWidth: 0.02, outlineOpacity: 0.8, shine: false, double: true, opacity: 0.85, effects: [sunk] },
      ...rims(),
    ],
  },
  {
    id: 'e-bronze-plaque',
    name: 'E · Engraved bronze',
    pitch: 'Warm bronze with a deep-cut inscription and a pressed-in step, like a memorial plaque.',
    colours: [slot('metal', 'Metal colour', '#a87a3a', ['Bronze', 'Pressed-in bronze'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Bronze', paint: steel(2), effects: [...metalFx(BRONZE_STOPS, 0.3, 0.7), DROP] },
      { ...bandFillLayer(), name: 'Pressed-in bronze', from: 0.68, to: 1, paint: lin(['#1e1206', '#e0c08a']), opacity: 0.5, blend: 'soft-light' },
      { ...textLayer(), name: 'Engraving', font: 'grenze', text: 'HERE STANDS A HERO OF THE REALM · '.repeat(3), size: 0.42, spacing: 0.1, at: 0.36, fill: '#2a1a08', effects: [sunk] },
      { ...lineLayer(), name: 'Crease', at: 0.68, width: 0.03, opacity: 0.55, blend: 'overlay', paint: { kind: 'solid', color: '#190500' } },
      ...rims(),
    ],
  },
];
