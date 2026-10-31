// Starship hull (Themed): candidates.
import { glowLines, slot, STEEL_STOPS, type Candidate, type Layer } from './common';
import { cellsLayer } from './common';
import { base, contact, curvedPlates, DROP, glow, lin, metalFx, ring, bandFillLayer } from './themed-kit';
import { themed } from './crafted';

export const CURRENT = themed('starship');
const STAGE = { thickness: 0.2, bloom: 0.3 };
const hull = (fill: string, stops: string[]): Layer[] => [
  { ...bandFillLayer(), name: 'Under', paint: lin(['#1a1e24', '#020304']), effects: [DROP] },
  curvedPlates('Plates', 16, fill, [...metalFx(stops, 0.1, 0.7), contact(0.8)], { from: 0.06, to: 0.94, gap: 0.05 }),
];
const lights = (color: string, glowColor: string): Layer => glowLines(['#ffffff', color], glowColor, { count: 2, from: 0.2, spacing: 0.6, width: 0.025, size: 0.1 });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-gunmetal-hull', name: 'A · Gunmetal hull',
    pitch: 'Curved gunmetal hull plates with cyan running lights along both edges and small lit ports.',
    stage: STAGE,
    colours: [slot('metal', 'Hull colour', '#4a5260', ['Plates']), slot('glow', 'Light colour', '#4ae0ff', ['Glowing lines', 'Ports'])],
    layers: () => [...hull('#4a5260', ['#040506', '#1a1e24', '#4a5260', '#8a929e', '#d0d6de']), lights('#8af0ff', '#2ad0ff'), ring('Ports', 'square', 16, '#c8f8ff', [glow({ color: '#4ae0ff', opacity: 0.8, size: 0.06 })], { size: 0.1, offset: 0.5, shaded: false } as never)],
  },
  {
    id: 'b-hazard', name: 'B · Hazard plating',
    pitch: 'Dark plates with yellow-and-black hazard chevrons and amber warning lights.',
    stage: STAGE,
    colours: [slot('metal', 'Hull colour', '#3a3e46', ['Plates']), slot('hazard', 'Hazard colour', '#f0c020', ['Chevrons'])],
    layers: () => [
      ...hull('#3a3e46', STEEL_STOPS),
      ring('Chevrons', 'chevron', 24, '#f0c020', [contact(0.5)], { size: 0.4, stretch: 1.2, shaded: false, at: 0.5 } as never),
      lights('#ffd070', '#ffa020'),
    ],
  },
  {
    id: 'c-bio-hull', name: 'C · Living hull',
    pitch: 'An alien ship grown, not built: violet cells glowing green where they join.',
    stage: STAGE,
    colours: [slot('hull', 'Hull colour', '#4a2a6a', ['Cells']), slot('glow', 'Glow colour', '#6aff8a', ['Glow'])],
    layers: () => [
      ...base({ light: '#2a3a2a', dark: '#020402', step: null }),
      { ...bandFillLayer(), name: 'Glow', from: 0.1, to: 0.9, paint: { kind: 'solid', color: '#6aff8a' }, opacity: 0.5, effects: [glow({ color: '#4aff6a', opacity: 0.6, size: 0.1 })] },
      { ...cellsLayer(), name: 'Cells', pattern: 'voronoi', size: 0.55, gap: 0.06, rounding: 0.6, vary: 0.3, color: '#4a2a6a', effects: [...metalFx(['#0a0214', '#2a1440', '#4a2a6a', '#8a5aaa', '#c8a0e0'], 0.4, 0.6), contact(0.6)] },
    ],
  },
  {
    id: 'd-white-armour', name: 'D · White armour',
    pitch: 'Clean white armour plating with blue running lights.',
    stage: STAGE,
    colours: [slot('metal', 'Plate colour', '#e8ecf0', ['Plates']), slot('glow', 'Light colour', '#4a8aff', ['Glowing lines'])],
    layers: () => [...hull('#e8ecf0', ['#4a4e56', '#9aa0aa', '#d8dce4', '#f4f6f8', '#ffffff']), lights('#a0c8ff', '#4a8aff')],
  },
];
