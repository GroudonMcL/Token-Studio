// Brass & beads (Frame Studio's Layered starting designs): candidates.
import { base, BRONZE_STOPS, contact, metalFx, recolour, repeatLayer, slot, WARM_GOLD, bevel, type Candidate, type Layer } from './common';
import { layered } from './crafted';

export const CURRENT = layered('brass-beads');
const beads = (name: string, fill: string, effects: Layer['effects'], o: { at?: number; size?: number; count?: number; alt?: string[]; altSizes?: number[] } = {}): Layer =>
  ({ ...repeatLayer(), name, element: 'bead', count: o.count ?? 24, snapToCorners: false, at: o.at ?? 0.78, size: o.size ?? 0.27, fill, altColors: o.alt ?? [], altSizes: o.altSizes ?? [], raised: true, effects: [...effects, contact(0.6)] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-polished-brass',
    name: 'A · Polished brass',
    pitch: 'Warm brass in the twin gradient bands, with a ring of polished brass beads in the pressed-in step.',
    colours: [slot('brass', 'Brass colour', '#c8952e', ['Band', 'Pressed-in step', 'Beads'])],
    layers: () => [...base({ light: '#f0c060', dark: '#4a2a06', step: 0.58 }), beads('Beads', '#d8a838', metalFx(WARM_GOLD, 0.6, 0.9))],
  },
  {
    id: 'b-brass-pearls',
    name: 'B · Brass & pearls',
    pitch: 'Brass with a string of pearls, big and small, in the pressed-in step.',
    colours: [slot('brass', 'Brass colour', '#c8952e', ['Band', 'Pressed-in step']), slot('pearls', 'Pearl colour', '#f0ece4', ['Pearls'])],
    layers: () => [...base({ light: '#f0c060', dark: '#4a2a06', step: 0.58 }), beads('Pearls', '#f0ece4', [bevel({ profile: 'rounded', size: 0.8, gloss: 1 })], { count: 32, altSizes: [1, 0.7] })],
  },
  {
    id: 'c-brass-jet',
    name: 'C · Brass & jet',
    pitch: 'A black enamel step set with glossy jet beads, framed by brass.',
    colours: [slot('brass', 'Brass colour', '#c8952e', ['Band']), slot('enamel', 'Enamel colour', '#14141a', ['Pressed-in step', 'Jet beads'])],
    layers: () => [...base({ light: '#f0c060', dark: '#4a2a06', step: 0.55, stepLight: '#3a3a44', stepDark: '#020204' }), beads('Jet beads', '#14141a', [bevel({ profile: 'rounded', size: 0.8, gloss: 1, highlightOpacity: 0.8 })])],
  },
  {
    id: 'd-copper-turquoise',
    name: 'D · Copper & turquoise',
    pitch: 'Rosy copper with turquoise beads alternating with small copper ones.',
    colours: [slot('copper', 'Copper colour', '#c06a3a', ['Band', 'Pressed-in step']), slot('beads', 'Bead colour', '#30b0a8', ['Beads'])],
    layers: () => [
      ...base({ light: '#f0a070', dark: '#3a1406', step: 0.58 }),
      beads('Beads', '#30b0a8', [bevel({ profile: 'rounded', size: 0.7, gloss: 0.7 })], { count: 32, alt: ['#c06a3a'], altSizes: [1, 0.6] }),
    ],
  },
];
export { BRONZE_STOPS, recolour };
