// Archmage's sigil ring (Themed): candidates.
import { contoursLayer, goldFx, inscription, panelWords, ROSE_STOPS, SILVER_STOPS, slot, WARM_GOLD, type Candidate, type Layer } from './common';
import { base, contact, glow, metalFx, ring } from './themed-kit';
import { themed } from './crafted';

export const CURRENT = themed('archmage');
const STAGE = { thickness: 0.2, bloom: 0.25 };
const lines = (color: string, stops: string[]): Layer => ({ ...contoursLayer(), name: 'Contour lines', count: 2, from: 0.06, spacing: 0.88, width: 0.035, taper: 0, paint: { kind: 'solid', color }, effects: [...metalFx(stops, 0.5, 0.9)] });
const sigils = (element: string, fill: string, stops: string[], glowColor: string): Layer => ring('Sigils', element, 4, fill, [...goldFx(0.4, stops), glow({ color: glowColor, opacity: 0.6, size: 0.12 })], { size: 0.8 });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-midnight-sigils', name: 'A · Midnight sigils',
    pitch: 'Midnight blue in the twin gradient bands, gold contour lines, a glowing Outer Rim AF inscription and gold star sigils at the quarters.',
    stage: STAGE,
    colours: [slot('band', 'Band colour', '#1a2460', ['Band', 'Pressed-in step']), slot('gold', 'Gold colour', '#d8a838', ['Contour lines', 'Sigils']), slot('glow', 'Glow colour', '#a8d8ff', ['Inscription'])],
    layers: () => [...base({ light: '#2a3a90', dark: '#04061a', step: null }), lines('#d8a838', WARM_GOLD), inscription('outerRim', '#e0f0ff', { at: 0.5, size: 0.38, start: 18, effects: [glow({ color: '#6ab0ff', opacity: 0.9, size: 0.1 })] }), sigils('icon-seven-pointed-star', '#f4d27a', WARM_GOLD, '#ffe8a0')],
  },
  {
    id: 'b-violet-runes', name: 'B · Violet archmage',
    pitch: 'Deep violet with silver lines, BabelStone runes glowing lilac and silver star sigils.',
    stage: STAGE,
    colours: [slot('band', 'Band colour', '#3a1a6a', ['Band', 'Pressed-in step']), slot('silver', 'Silver colour', '#d8dce4', ['Contour lines', 'Sigils']), slot('glow', 'Glow colour', '#d0a8ff', ['Inscription'])],
    layers: () => [...base({ light: '#5a2a9a', dark: '#0a0418', step: null }), lines('#d8dce4', SILVER_STOPS), inscription('babelstone', '#f0e0ff', { at: 0.5, size: 0.38, start: 19, effects: [glow({ color: '#b08aff', opacity: 0.9, size: 0.1 })] }), sigils('star', '#e4e8f0', SILVER_STOPS, '#e0d0ff')],
  },
  {
    id: 'c-sigil-panels', name: 'C · Sigil panels',
    pitch: 'Midnight blue with a glowing word in each of eight panels between gold sigils.',
    stage: STAGE,
    colours: [slot('band', 'Band colour', '#1a2460', ['Band', 'Pressed-in step']), slot('gold', 'Gold colour', '#d8a838', ['Contour lines', 'Sigils']), slot('glow', 'Glow colour', '#a8d8ff', ['Runes'])],
    layers: () => [...base({ light: '#2a3a90', dark: '#04061a', step: null }), lines('#d8a838', WARM_GOLD), panelWords('yugurian', '#e0f0ff', { size: 0.4, offset: 0, effects: [glow({ color: '#6ab0ff', opacity: 0.9, size: 0.1 })] }), { ...sigils('star', '#f4d27a', WARM_GOLD, '#ffe8a0'), count: 8, size: 0.5 } as Layer],
  },
  {
    id: 'd-blood-sigils', name: 'D · Blood sigils',
    pitch: 'Black and crimson with rose-gold lines, red-glowing Sith AF runes and pentacle sigils.',
    stage: STAGE,
    colours: [slot('band', 'Band colour', '#3a0a14', ['Band', 'Pressed-in step']), slot('glow', 'Glow colour', '#ff3a4a', ['Inscription'])],
    layers: () => [...base({ light: '#6a1a2a', dark: '#0a0204', step: null }), lines('#d8907a', ROSE_STOPS), inscription('sith', '#ffd0d0', { at: 0.5, size: 0.36, start: 20, effects: [glow({ color: '#ff3a4a', opacity: 0.9, size: 0.1 })] }), sigils('icon-pentagram-rose', '#d8907a', ROSE_STOPS, '#ff6a7a')],
  },
];
export { contact };
