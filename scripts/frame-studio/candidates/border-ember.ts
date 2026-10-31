// Emberforged (Frame Studio's Crafted borders): candidates.
import { bandFillLayer, bandShading, contact, contoursLayer, DROP, glow, glowCracks, glowLines, goldFx, inscription, lin, lineLayer, slot, textureLayer, WARM_GOLD, type Candidate, type Layer } from './common';
import { border } from './crafted';

export const CURRENT = border('emberforged');
const STAGE = { thickness: 0.18, outerSpacing: 0.09 };
const iron = (light = '#4a4e58', dark = '#020203'): Layer[] =>
  bandShading([{ ...bandFillLayer(), name: 'Black iron', paint: lin([light, dark]), effects: [DROP] }], { step: 0.6 });
const grooves = (color = '#060608'): Layer => ({ ...contoursLayer(), name: 'Grooves', count: 2, from: 0.5, spacing: 0.05, width: 0.03, taper: 0, paint: { kind: 'solid', color }, opacity: 0.8 });
const lava = (from: number, hot: string, deep: string, glowColor: string): Layer[] => [
  { ...bandFillLayer(), name: 'Lava', from, to: 1, paint: lin([hot, deep], 45) },
  { ...textureLayer('lava'), name: 'Molten glass', from, to: 1, color: hot, color2: deep, scale: 2.6, amount: 1.4, seed: 0x1a7a },
  { ...lineLayer(), name: 'Lava glow', at: from + (1 - from) / 2, width: (1 - from) * 0.6, paint: { kind: 'solid', color: hot }, opacity: 0.5, blend: 'screen', effects: [glow({ color: glowColor, opacity: 0.7, size: 0.12 })] },
  { ...lineLayer(), name: 'Lava rim', at: from, width: 0.04, paint: { kind: 'solid', color: '#08080a' }, effects: [contact(0.8)] },
];

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-clean-ember',
    name: 'A · Molten ring',
    pitch: 'Black iron shaded with gradients instead of a bevel, two grooves, and a wider ring of glowing lava inside.',
    stage: { ...STAGE, bloom: 0.25 },
    colours: [slot('iron', 'Iron colour', '#4a4e58', ['Black iron']), slot('lava', 'Lava colour', '#ff4a2a', ['Lava', 'Molten glass', 'Lava glow'])],
    layers: () => [...iron(), grooves(), ...lava(0.66, '#ff4a2a', '#5a0606', '#ff3a1a')],
  },
  {
    id: 'b-forge-runes',
    name: 'B · Forge runes',
    pitch: 'Sith AF runes glowing hot on the iron, over a lava ring and glowing cracks.',
    stage: { ...STAGE, bloom: 0.3 },
    colours: [slot('iron', 'Iron colour', '#4a4e58', ['Black iron']), slot('glow', 'Glow colour', '#ff7a2a', ['Runes', 'Glowing cracks', 'Lava', 'Molten glass', 'Lava glow'])],
    layers: () => [
      ...iron(),
      glowCracks('#1a0a04', '#ff7a2a', '#ffb05a', 9, 0.5),
      inscription('sith', '#ffe0b0', { name: 'Runes', at: 0.3, size: 0.36, start: 5, effects: [glow({ color: '#ff7a2a', opacity: 0.9, size: 0.12 })] }),
      ...lava(0.7, '#ff6a2a', '#5a0a04', '#ff5a1a'),
    ],
  },
  {
    id: 'c-frostfire',
    name: 'C · Frostfire',
    pitch: 'The cold twin: frosted iron round a ring of glowing blue ice.',
    stage: { ...STAGE, bloom: 0.25 },
    colours: [slot('iron', 'Iron colour', '#5a6270', ['Black iron', 'Frost']), slot('glow', 'Glow colour', '#4ac8ff', ['Lava', 'Molten glass', 'Lava glow'])],
    layers: () => [
      ...iron('#5a6270', '#04060a'),
      { ...textureLayer('frost'), name: 'Frost', to: 0.6, color: '#e0f0ff', amount: 0.9, scale: 1.3, strength: 0.7, seed: 0xf206, blend: 'screen' },
      grooves(),
      ...lava(0.66, '#8ae8ff', '#06204a', '#4ac8ff'),
    ],
  },
  {
    id: 'd-obsidian-gold',
    name: 'D · Obsidian & gold',
    pitch: 'Glassy obsidian with a gold groove and a ring of molten gold inside.',
    stage: { ...STAGE, bloom: 0.2 },
    colours: [slot('stone', 'Stone colour', '#2a2430', ['Black iron']), slot('gold', 'Gold colour', '#f4b030', ['Gold groove', 'Lava', 'Molten glass', 'Lava glow'])],
    layers: () => [
      ...iron('#3a3440', '#020103'),
      { ...lineLayer(), name: 'Gold groove', at: 0.5, width: 0.05, paint: { kind: 'solid', color: '#d8a838' }, effects: [...goldFx(0.4, WARM_GOLD)] },
      ...lava(0.66, '#ffd060', '#6a3a04', '#ffb030'),
    ],
  },
];
export { glowLines };
