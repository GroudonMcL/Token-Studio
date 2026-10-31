// Shield rim: candidates for new versions of the Crafted Shield rim frame.
import {
  bandFillLayer, bevel, BRONZE_STOPS, contact, DROP, goldFx, inscription, lin, lineLayer, metalFx, photo,
  recolour, repeatLayer, slot, STEEL_STOPS, WARM_GOLD, wear, type Candidate,
} from './common';
import { crafted } from './crafted';

export const CURRENT = crafted('shield-rim');
const planks = (stops?: string[]) => ({ ...bandFillLayer(), name: 'Planks', from: 0.4, to: 1, paint: photo('wood-planks', 1.6, { angle: 90, lighting: 0.3 }), effects: stops ? [recolour(stops)] : [] });
const joins = () => ({ ...repeatLayer(), name: 'Plank joins', element: 'tick' as const, count: 12, snapToCorners: false, at: 0.7, size: 0.6, stretch: 0.12, fill: '#2a1a0c', raised: false, shaded: false, opacity: 0.8, blend: 'multiply' as const });
const rim = (name: string, stops: string[], picture: 'hammered-metal' | 'metal-plate' = 'hammered-metal') =>
  ({ ...bandFillLayer(), name, to: 0.42, paint: photo(picture, 1, { lighting: 0.3 }), effects: [recolour(stops), DROP] });
const nails = (fill: string, stops: string[], count = 12) => ({ ...repeatLayer(), name: 'Nails', element: 'bead' as const, count, snapToCorners: false, at: 0.21, size: 0.3, fill, raised: true, effects: [...metalFx(stops, 0.6, 0.8), contact(0.7)] });
// Shades the rim and the planks separately, each with its own gradient pair.
const shadeRim = () => [
  { ...bandFillLayer(), name: 'Rim shading', to: 0.42, blend: 'overlay' as const, opacity: 0.7, paint: lin(['#ffffff', '#000000']) },
  { ...bandFillLayer(), name: 'Plank shading', from: 0.42, blend: 'overlay' as const, opacity: 0.6, paint: lin(['#000000', '#ffffff']) },
  { ...lineLayer(), name: 'Crease', at: 0.42, width: 0.03, opacity: 0.6, blend: 'overlay' as const, paint: { kind: 'solid' as const, color: '#190500' } },
];

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-viking',
    name: 'A · Viking shield',
    pitch: 'Planks painted deep red, an iron rim and iron nails, shaded with gradients instead of a bevel.',
    colours: [slot('paint', 'Paint colour', '#a01a1a', ['Paint']), slot('rim', 'Rim colour', '#6a7078', ['Steel rim'])],
    layers: () => [
      { ...planks(['#1a0202', '#5a0a0a', '#a01a1a', '#d05a4a', '#f0b0a0']), name: 'Paint' },
      joins(),
      rim('Steel rim', ['#06080a', '#22262c', '#6a7078', '#a8b0b8', '#e0e6ec']),
      nails('#6a7078', STEEL_STOPS),
      ...shadeRim(),
    ],
  },
  {
    id: 'b-bronze-hoplite',
    name: 'B · Bronze hoplite',
    pitch: 'A wide polished bronze rim with a Yugurian battle cry engraved round it, over dark oak.',
    colours: [slot('bronze', 'Bronze colour', '#a87a3a', ['Bronze rim']), slot('wood', 'Wood colour', '#4a2a14', ['Planks'])],
    layers: () => [
      planks(['#0a0402', '#2a160a', '#4a2a14', '#7a5030', '#a8805a']),
      joins(),
      { ...rim('Bronze rim', BRONZE_STOPS), to: 0.5 },
      inscription('yugurian', '#3a2208', { name: 'Battle cry', at: 0.25, size: 0.32, start: 9, effects: [bevel({ direction: 'sunken', size: 0.5, gloss: 0.4 })] }),
      { ...shadeRim()[0], to: 0.5 }, { ...shadeRim()[1], from: 0.5 }, { ...shadeRim()[2], at: 0.5 },
    ],
  },
  {
    id: 'c-knights-heraldry',
    name: 'C · Knight’s heraldry',
    pitch: 'Blue enamel field with a gold rim, gold nails and a fleur-de-lys at each quarter.',
    colours: [slot('field', 'Field colour', '#1a3a8a', ['Field']), slot('gold', 'Gold colour', '#d8a838', ['Gold rim', 'Nails', 'Fleurs'])],
    layers: () => [
      { ...bandFillLayer(), name: 'Field', from: 0.4, to: 1, paint: lin(['#2a5ab0', '#081a48']) },
      { ...repeatLayer(), name: 'Fleurs', element: 'icon-fleur-de-lys', count: 4, at: 0.71, size: 0.62, fill: '#d8a838', raised: false, effects: [...goldFx(0.4, WARM_GOLD)] },
      { ...rim('Gold rim', WARM_GOLD), paint: photo('gold', 1, { lighting: 0.3 }) },
      nails('#d8a838', WARM_GOLD),
      ...shadeRim(),
    ],
  },
  {
    id: 'd-battered',
    name: 'D · Battle-worn',
    pitch: 'A scarred shield: chipped steel rim, splintered planks, one nail missing.',
    colours: [slot('rim', 'Rim colour', '#6a7078', ['Steel rim'])],
    layers: () => [
      planks(['#0a0602', '#2e1e10', '#5a4028', '#8a7050', '#b8a080']),
      joins(),
      { ...rim('Steel rim', ['#06080a', '#22262c', '#6a7078', '#a8b0b8', '#e0e6ec']), effects: [recolour(['#06080a', '#22262c', '#6a7078', '#a8b0b8', '#e0e6ec']), wear({ chips: 0.12, polish: 0.2, grime: 0.6, scale: 0.12, scratches: 0.5 }), DROP] },
      { ...nails('#8a8478', STEEL_STOPS), missing: 0.1 },
      ...shadeRim(),
    ],
  },
  {
    id: 'e-leather-bound',
    name: 'E · Leather-bound',
    pitch: 'Oak planks with a stitched leather edge instead of metal, and brass studs.',
    colours: [slot('leather', 'Leather colour', '#5a3420', ['Leather edge']), slot('brass', 'Stud colour', '#b5813a', ['Nails'])],
    layers: () => [
      planks(),
      joins(),
      { ...bandFillLayer(), name: 'Leather edge', to: 0.42, paint: photo('leather', 1.2, { lighting: 0.3 }), effects: [recolour(['#0a0402', '#2a160a', '#5a3420', '#8a6040', '#b89070']), DROP] },
      { ...lineLayer(), name: 'Stitching', at: 0.36, width: 0.03, dash: 'dashed', paint: { kind: 'solid', color: '#d8c8a0' } },
      { ...lineLayer(), name: 'Stitching', at: 0.06, width: 0.03, dash: 'dashed', paint: { kind: 'solid', color: '#d8c8a0' } },
      nails('#b5813a', BRONZE_STOPS),
      ...shadeRim(),
    ],
  },
];

// The original frame's band thickness, unless a candidate sets its own.
for (const c of CANDIDATES) c.stage = { ...{ thickness: 0.18, outerSpacing: 0.02 }, ...c.stage };
