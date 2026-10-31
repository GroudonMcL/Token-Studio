// Gilded filigree (Frame Studio's Crafted borders): candidates.
import { bandFillLayer, contact, DROP, glow, goldFx, inscription, lin, overlay, photo, recolour, slot, textureLayer, WARM_GOLD, type Candidate, type Layer } from './common';
import { border } from './crafted';

export const CURRENT = border('gilded-filigree');
const PALE_GOLD = ['#3a2c12', '#8a7444', '#ccb47e', '#f0e4bc', '#fffcf2'];
/** Two gold bands either side of a channel, shaded with gradients, with filigree chased into them. */
const goldBands = (stops: string[], from = 0.3, to = 0.72): Layer[] => [
  { ...bandFillLayer(), name: 'Outer gold', to: from + 0.02, paint: lin(['#ffffff', '#606060']), effects: [recolour(stops), DROP] },
  { ...bandFillLayer(), name: 'Inner gold', from: to - 0.02, paint: lin(['#505050', '#f0f0f0']), effects: [recolour(stops), DROP] },
  { ...textureLayer('filigree'), name: 'Outer filigree', to: from + 0.02, color: '#8a6a30', amount: 0.8, scale: 1.5, strength: 1.2, seed: 0xf11, blend: 'multiply' },
  { ...textureLayer('filigree'), name: 'Inner filigree', from: to - 0.02, color: '#8a6a30', amount: 0.8, scale: 1.5, strength: 1.2, seed: 0xf12, blend: 'multiply' },
];
const channel = (name: string, light: string, dark: string, from = 0.3, to = 0.72): Layer => ({ ...bandFillLayer(), name, from, to, paint: lin([dark, light]), effects: [DROP] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-clean-filigree',
    name: 'A · Clean filigree',
    pitch: 'The same idea made calmer: smooth red enamel with a few gold flecks, between pale gold bands shaded with gradients, not bevels.',
    stage: { thickness: 0.25, outerSpacing: 0.01 },
    colours: [slot('enamel', 'Enamel colour', '#c04a22', ['Enamel', 'Gold leaf']), slot('gold', 'Gold colour', '#ccb47e', ['Outer gold', 'Inner gold', 'Outer filigree', 'Inner filigree'])],
    layers: () => [
      channel('Enamel', '#e0602a', '#5a1406'),
      { ...textureLayer('mottled'), name: 'Gold leaf', from: 0.3, to: 0.72, color: '#ecd496', color2: '#fff8e0', amount: 0.15, scale: 2.8, strength: 0.6, seed: 0x6011 },
      ...goldBands(PALE_GOLD),
    ],
  },
  {
    id: 'b-sapphire-filigree',
    name: 'B · Sapphire filigree',
    pitch: 'Deep blue enamel glittering faintly, between warm gold filigree bands.',
    colours: [slot('enamel', 'Enamel colour', '#1a3aa0', ['Enamel']), slot('gold', 'Gold colour', '#c8952e', ['Outer gold', 'Inner gold', 'Outer filigree', 'Inner filigree'])],
    stage: { thickness: 0.25, outerSpacing: 0.01 },
    layers: () => [
      channel('Enamel', '#3a6ae0', '#060e30'),
      { ...textureLayer('sparkle'), name: 'Glitter', from: 0.3, to: 0.72, color: '#e8f0ff', amount: 0.6, scale: 0.5, seed: 0x5a38 },
      ...goldBands(WARM_GOLD),
    ],
  },
  {
    id: 'c-filigree-script',
    name: 'C · Emerald script',
    pitch: 'Emerald enamel with a raised gold Yugurian inscription running through it, between filigree bands.',
    colours: [slot('enamel', 'Enamel colour', '#1a7a4a', ['Enamel']), slot('gold', 'Gold colour', '#c8952e', ['Outer gold', 'Inner gold', 'Outer filigree', 'Inner filigree', 'Inscription'])],
    stage: { thickness: 0.25, outerSpacing: 0.01 },
    layers: () => [
      channel('Enamel', '#2aa868', '#041a0c'),
      ...goldBands(WARM_GOLD),
      inscription('yugurian', '#f4d27a', { name: 'Inscription', at: 0.51, size: 0.3, start: 3, effects: [...goldFx(0.4, WARM_GOLD)] }),
    ],
  },
  {
    id: 'd-ivory-gold',
    name: 'D · Ivory & gold',
    pitch: 'A channel of white marble veined with gold, between pale gold filigree bands. Light and regal.',
    colours: [slot('stone', 'Stone colour', '#f0ece4', ['Marble']), slot('gold', 'Gold colour', '#ccb47e', ['Outer gold', 'Inner gold', 'Outer filigree', 'Inner filigree'])],
    stage: { thickness: 0.25, outerSpacing: 0.01 },
    layers: () => [
      { ...bandFillLayer(), name: 'Marble', from: 0.3, to: 0.72, paint: photo('marble', 1.6), effects: [DROP] },
      { ...bandFillLayer(), name: 'Marble shading', from: 0.3, to: 0.72, paint: lin(['#000000', '#ffffff']), blend: 'overlay', opacity: 0.5 },
      ...goldBands(PALE_GOLD),
    ],
  },
];
export { contact, glow, goldFx, overlay };
