// Mossy stone circle (Themed): candidates.
import { base, glow, growthLayer, panelWords, slot, type Candidate, type Layer } from './common';
import { groupLayer } from '../../../src/frame-studio/project/defaults';
import { bandFillLayer, contact, curvedPlates, lin, photo, recolour, textureLayer } from './themed-kit';
import { themed } from './crafted';

export const CURRENT = themed('druid-circle');
const STAGE = { thickness: 0.22 };
/** The ground behind the stones: the twin gradient rings in an earthy colour. */
const ground = (color: string): Layer[] => base({ light: color, dark: '#020402', step: 0.55 }).map((l) => (l.name === 'Band' ? { ...l, name: 'Ground' } : l));
/** The stones, their texture and whatever grows on them as one group, with gradient rings laid over the stones only. */
const stoneGroup = (stops: string[], extra: Layer[] = []): Layer[] => [
  { ...groupLayer([...stones(stops), ...extra]), name: 'Stones' },
  {
    ...groupLayer([
      { ...bandFillLayer(), name: 'Shading', paint: lin(['#ffffff', '#000000']) },
      { ...bandFillLayer(), name: 'Pressed-in shading', from: 0.55, paint: lin(['#000000', '#ffffff']) },
    ]),
    name: 'Stone shading', blend: 'overlay', opacity: 0.8, clip: 'below',
  },
];
const stones = (stops: string[]): Layer[] => [
  curvedPlates('Stones', 10, '#8a8680', [recolour(stops), contact(0.8)], { from: 0.08, to: 0.92, gap: 0.16 }),
  { ...bandFillLayer(), name: 'Stone texture', from: 0.08, to: 0.92, paint: photo('granite', 1.2), opacity: 0.6, blend: 'multiply', clip: 'below' },
];
const STONE = ['#14130f', '#4a4842', '#8a8680', '#c8c4ba', '#f0ece2'];
const moss = (): Layer => ({ ...bandFillLayer(), name: 'Moss', from: 0.08, to: 0.45, paint: photo('moss', 1), opacity: 0.85, clip: 'below', effects: [{ kind: 'distort', on: true, amount: 0.3, scale: 0.4, seed: 8 } as never] });
const creeper = (leaf: string, extra: 'leaves' | 'berries' = 'leaves'): Layer => ({ ...growthLayer('vine'), name: 'Creeper', count: 1, thickness: 0.03, amplitude: 0.3, waveLength: 2.2, extra, extraSize: 0.36, color: '#2e4a1c', extraColor: leaf, seed: 9, effects: [contact(0.6)] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-standing-stones', name: 'A · Standing stones',
    pitch: 'Ten grey stones that follow the ring, with gradient rings for depth over them and the ground behind, moss on their tops and a creeper threading between them.',
    stage: STAGE,
    colours: [slot('stone', 'Stone colour', '#8a8680', ['Stones']), slot('moss', 'Leaf colour', '#5a8a32', ['Creeper'])],
    layers: () => [...ground('#3a4a2a'), ...stoneGroup(STONE, [moss()]), creeper('#5a8a32')],
  },
  {
    id: 'b-runic-stones', name: 'B · Rune stones',
    pitch: 'The stones carved with a rune each, glowing faint green.',
    stage: { ...STAGE, bloom: 0.25 },
    colours: [slot('stone', 'Stone colour', '#8a8680', ['Stones']), slot('glow', 'Rune colour', '#6aff8a', ['Runes'])],
    layers: () => [...ground('#2a3a24'), ...stoneGroup(STONE), panelWords('babelstone', '#d0ffd8', { count: 10, size: 0.34, effects: [glow({ color: '#4aff6a', opacity: 0.85, size: 0.1 })] })],
  },
  {
    id: 'c-snowy-stones', name: 'C · Winter stones',
    pitch: 'The stone circle in winter, snow on the stones and frost on the ground.',
    stage: STAGE,
    colours: [slot('stone', 'Stone colour', '#7a8088', ['Stones'])],
    layers: () => [...ground('#8a9aa8'), ...stones(['#0a0c10', '#3a4048', '#7a8088', '#c0c6ce', '#f0f4f8']), { ...bandFillLayer(), name: 'Snow', from: 0.08, to: 0.4, paint: photo('snow', 1), clip: 'below', effects: [{ kind: 'distort', on: true, amount: 0.3, scale: 0.4, seed: 6 } as never] }, { ...textureLayer('sparkle'), name: 'Frost', color: '#ffffff', amount: 0.5, scale: 0.4, seed: 0x5a3d }],
  },
  {
    id: 'd-flower-stones', name: 'D · Midsummer stones',
    pitch: 'The stones in a summer meadow, a flowering creeper between them.',
    stage: STAGE,
    colours: [slot('stone', 'Stone colour', '#8a8680', ['Stones']), slot('flowers', 'Flower colour', '#f0d040', ['Creeper'])],
    layers: () => [...ground('#4a7a2a'), ...stones(STONE), creeper('#f0d040', 'berries')],
  },
];
