// Autumn leaves (Themed): candidates.
import { goldFx, slot, WARM_GOLD, type Candidate, type Layer } from './common';
import { bevel, contact, photoBand, ring } from './themed-kit';
import { themed } from './crafted';

export const CURRENT = themed('autumn-leaves');
const STAGE = { thickness: 0.2 };
const leaves = (element: string, fill: string, alt: string[], effects: Layer['effects'] = [bevel({ size: 0.3, gloss: 0.3 }), contact(0.6)], count = 22): Layer =>
  ring('Leaves', element, count, fill, effects, { size: 0.5, altColors: alt, altSizes: [1, 0.75, 0.9], jitterAngle: 60, jitterSize: 0.2, wander: 0.5, seed: 12 } as never);

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-birch-leaves', name: 'A · Birch & autumn',
    pitch: 'A birch-bark hoop shaded with gradients, with red, orange and gold leaves tumbling round it.',
    stage: STAGE,
    colours: [slot('bark', 'Bark colour', '#d8d4c8', ['Bark']), slot('leaves', 'Leaf colour', '#c0501a', ['Leaves'])],
    layers: () => [...photoBand('Bark', 'plane-bark', ['#2a2a26', '#8a8a82', '#d8d4c8', '#f0ece4', '#ffffff'], { angle: 90 }), leaves('leaf', '#c0501a', ['#e0a020', '#a01a14', '#d07020'])],
  },
  {
    id: 'b-oak-leaves', name: 'B · Oak & acorns',
    pitch: 'Dark oak bark with brown and amber oak leaves and acorns.',
    stage: STAGE,
    colours: [slot('bark', 'Bark colour', '#5f5040', ['Bark']), slot('leaves', 'Leaf colour', '#a0602a', ['Leaves'])],
    layers: () => [...photoBand('Bark', 'bark', null, { angle: 90 }), leaves('icon-oak-leaf', '#a0602a', ['#c08a30', '#7a4a1a'], undefined, 14), ring('Acorns', 'icon-acorn', 6, '#8a5a2a', [bevel({ size: 0.4, gloss: 0.4 }), contact(0.6)], { size: 0.45, offset: 0.5 } as never)],
  },
  {
    id: 'c-maple', name: 'C · Maple red',
    pitch: 'Scarlet and crimson leaves thick on a dark wooden hoop.',
    stage: STAGE,
    colours: [slot('leaves', 'Leaf colour', '#c01a14', ['Leaves'])],
    layers: () => [...photoBand('Bark', 'wood-planks', ['#140a04', '#3a2210', '#6a4220', '#9a7050', '#c8a080'], { angle: 90 }), leaves('icon-curled-leaf', '#c01a14', ['#e0401a', '#8a0a0a'], undefined, 26)],
  },
  {
    id: 'd-golden-leaves', name: 'D · Gilded leaves',
    pitch: 'Leaves of beaten gold scattered round a dark hoop.',
    stage: STAGE,
    colours: [slot('gold', 'Gold colour', '#d8a838', ['Leaves'])],
    layers: () => [...photoBand('Bark', 'wood-planks', ['#0a0602', '#1e140a', '#3a2814', '#5a4428', '#806040'], { angle: 90 }), leaves('leaf', '#d8a838', [], [...goldFx(0.35, WARM_GOLD), contact(0.6)])],
  },
];
