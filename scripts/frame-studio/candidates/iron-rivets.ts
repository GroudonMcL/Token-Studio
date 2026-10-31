// Iron rivets: candidates for new versions of the Crafted Iron rivets frame.
import {
  bandFillLayer, bandShading, bevel, BRONZE_STOPS, contact, DROP, glow, inscription, lineLayer, metalFx, overlay, photo,
  recolour, repeatLayer, slot, STEEL_STOPS, textureLayer, type Candidate,
} from './common';
import { crafted } from './crafted';

export const CURRENT = crafted('iron-rivets');
const IRON = ['#040506', '#16191e', '#4a5058', '#8a929c', '#d0d6de'];
const plate = (name: string, stops: string[], picture: 'hammered-metal' | 'metal-plate' | 'rust' = 'hammered-metal') =>
  ({ ...bandFillLayer(), name, paint: photo(picture, 1.4, { lighting: 0.3 }), effects: [recolour(stops), DROP] });
const rivets = (name: string, at: number, fill: string, stops: string[], count = 16, size = 0.26) =>
  ({ ...repeatLayer(), name, element: 'bead' as const, count, snapToCorners: false, at, size, fill, raised: true, effects: [...metalFx(stops, 0.6, 0.8), contact(0.7)] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-blackened',
    name: 'A · Blackened iron',
    pitch: 'Dark hammered iron shaded with the twin gradient bands, with a ring of bright steel rivets.',
    colours: [slot('iron', 'Iron colour', '#4a5058', ['Iron plate']), slot('rivets', 'Rivet colour', '#a8b0ba', ['Rivets'])],
    layers: () => bandShading([plate('Iron plate', IRON), rivets('Rivets', 0.3, '#a8b0ba', STEEL_STOPS)]),
  },
  {
    id: 'b-rusted',
    name: 'B · Rusted plate',
    pitch: 'Iron gone orange with rust at the edges, held together with dark rivets.',
    colours: [slot('rust', 'Rust colour', '#9a4a1e', ['Rust']), slot('rivets', 'Rivet colour', '#5a5e66', ['Rivets'])],
    layers: () => bandShading([
      plate('Iron plate', IRON),
      { ...bandFillLayer(), name: 'Rust', paint: photo('rust', 1.2), opacity: 0.9, blend: 'color', clip: 'band' },
      { ...bandFillLayer(), name: 'Rust', paint: photo('rust', 1.2), opacity: 0.35, blend: 'multiply', clip: 'band' },
      rivets('Rivets', 0.3, '#5a5e66', IRON),
    ]),
  },
  {
    id: 'c-dwarven-strap',
    name: 'C · Dwarven strapwork',
    pitch: 'Heavy iron plates with joins between them, two rows of rivets and a thin brass trim line.',
    colours: [slot('iron', 'Iron colour', '#4a5058', ['Iron plate']), slot('brass', 'Brass colour', '#b5813a', ['Brass trim', 'Rivets'])],
    layers: () => bandShading([
      plate('Iron plate', IRON, 'metal-plate'),
      { ...repeatLayer(), name: 'Plate joins', element: 'tick', count: 8, at: 0.5, size: 1.1, stretch: 0.08, fill: '#050608', raised: false, shaded: false, opacity: 0.75 },
      { ...lineLayer(), name: 'Brass trim', at: 0.5, width: 0.05, paint: { kind: 'solid', color: '#b5813a' }, effects: [...metalFx(BRONZE_STOPS, 0.6, 0.8), contact(0.5)] },
      rivets('Rivets', 0.22, '#b5813a', BRONZE_STOPS, 24, 0.16),
      rivets('Rivets', 0.78, '#b5813a', BRONZE_STOPS, 24, 0.16),
    ]),
  },
  {
    id: 'd-forge-script',
    name: 'D · Forge script',
    pitch: 'Black iron with a Sith AF inscription glowing forge-orange between two rows of rivets.',
    stage: { bloom: 0.2 },
    colours: [slot('iron', 'Iron colour', '#3a3e46', ['Iron plate']), slot('glow', 'Glow colour', '#ff7a2a', ['Forge script'])],
    layers: () => bandShading([
      plate('Iron plate', ['#020203', '#0e1014', '#3a3e46', '#6a707a', '#a8b0b8']),
      rivets('Rivets', 0.14, '#8a929c', STEEL_STOPS, 24, 0.14),
      rivets('Rivets', 0.86, '#8a929c', STEEL_STOPS, 24, 0.14),
      inscription('sith', '#ffd0a0', { name: 'Forge script', at: 0.5, size: 0.36, start: 6, effects: [glow({ color: '#ff7a2a', opacity: 0.9, size: 0.12 })] }),
    ], { step: null }),
  },
  {
    id: 'e-gunmetal',
    name: 'E · Gunmetal bolts',
    pitch: 'Smooth blue-grey gunmetal with hex bolts and a fine brushed finish.',
    colours: [slot('metal', 'Metal colour', '#3a4450', ['Gunmetal', 'Brushing']), slot('bolts', 'Bolt colour', '#c8ced6', ['Bolts'])],
    layers: () => bandShading([
      { ...bandFillLayer(), name: 'Gunmetal', paint: { kind: 'linear', angle: 45, followLight: false, stops: [{ at: 0, color: '#6a7686', opacity: 1 }, { at: 1, color: '#0c1016', opacity: 1 }] }, effects: [DROP] },
      { ...textureLayer('brushed'), name: 'Brushing', color: '#ffffff', opacity: 0.25, seed: 0xb707 },
      { ...repeatLayer(), name: 'Bolts', element: 'bead', count: 12, at: 0.3, size: 0.3, fill: '#c8ced6', raised: true, effects: [...metalFx(STEEL_STOPS, 0.5, 0.9), contact(0.7)] },
    ]),
  },
];
export { bevel, overlay };

// The original frame's band thickness, unless a candidate sets its own.
for (const c of CANDIDATES) c.stage = { ...{ thickness: 0.2, outerSpacing: 0.02 }, ...c.stage };
