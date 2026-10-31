// Royal (Frame Studio's Layered starting designs): candidates.
import { base, contact, goldFx, lineLayer, metalFx, repeatLayer, shapeLayer, SILVER_STOPS, slot, textureLayer, WARM_GOLD, type Candidate, type Layer } from './common';
import { layered } from './crafted';

export const CURRENT = layered('royal');
const STAGE = { thickness: 0.18 };
const edges = (color: string, stops: string[]): Layer[] => [0.06, 0.94].map((at) => ({ ...lineLayer(), name: 'Edges', at, width: 0.1, paint: { kind: 'solid' as const, color }, effects: [...metalFx(stops, 0.5, 0.9), contact(0.5)] }));
const fleurs = (color: string, stops: string[]): Layer => ({ ...repeatLayer(), name: 'Fleurs-de-lis', element: 'fleur', count: 8, snapToCorners: false, at: 0.5, size: 0.66, fill: color, show: [false, true], raised: false, effects: [...goldFx(0.4, stops), contact(0.6)] });
const gems = (fill: string, setting: string, stops: string[]): Layer => ({ ...repeatLayer(), name: 'Gems', element: 'gem', count: 8, snapToCorners: false, at: 0.5, size: 0.46, fill, show: [true, false], raised: false, gemFacets: 10, gemSparkle: 0.8, setting: 'claws4', settingColor: setting, settingEffects: metalFx(stops, 0.3, 0.9), effects: [contact(0.6)] });
/** The crown at the top, kept inside the band. */
const crown = (fill: string, stops: string[], detail: string): Layer => ({ ...shapeLayer(), name: 'Crown', shape: 'ornament', element: 'crown', across: 0.5, size: 0.8, stretch: 1.3, fill, outline: null, detail, effects: [...goldFx(0.4, stops), contact(0.6)] });

export const CANDIDATES: Candidate[] = [
  {
    id: 'a-crimson-royal',
    name: 'A · Crimson royal',
    pitch: 'Crimson in the twin gradient bands between polished gold edges, with gold fleurs-de-lis, sapphires in claws and a crown inside the band at the top.',
    stage: STAGE,
    colours: [slot('band', 'Band colour', '#8a1a2a', ['Band', 'Pressed-in step']), slot('gold', 'Gold colour', '#d8a838', ['Edges', 'Fleurs-de-lis', 'Crown']), slot('gems', 'Gem colour', '#2a5ad8', ['Gems'])],
    layers: () => [...base({ light: '#c02a3a', dark: '#1a0206', step: null }), ...edges('#d8a838', WARM_GOLD), fleurs('#e2b85a', WARM_GOLD), gems('#2a5ad8', '#d8a838', WARM_GOLD), crown('#e2b85a', WARM_GOLD, '#a01a2a')],
  },
  {
    id: 'b-royal-blue',
    name: 'B · Royal blue',
    pitch: 'Royal blue and gold, with rubies between the fleurs-de-lis.',
    stage: STAGE,
    colours: [slot('band', 'Band colour', '#1a3a8a', ['Band', 'Pressed-in step']), slot('gold', 'Gold colour', '#d8a838', ['Edges', 'Fleurs-de-lis', 'Crown']), slot('gems', 'Gem colour', '#c0182a', ['Gems'])],
    layers: () => [...base({ light: '#2a5ac0', dark: '#030a24', step: null }), ...edges('#d8a838', WARM_GOLD), fleurs('#e2b85a', WARM_GOLD), gems('#c0182a', '#d8a838', WARM_GOLD), crown('#e2b85a', WARM_GOLD, '#1a3a8a')],
  },
  {
    id: 'c-purple-silver',
    name: 'C · Purple & silver',
    pitch: 'Imperial purple with silver edges, silver fleurs and amethysts.',
    stage: STAGE,
    colours: [slot('band', 'Band colour', '#4a1a6a', ['Band', 'Pressed-in step']), slot('silver', 'Silver colour', '#d8dce4', ['Edges', 'Fleurs-de-lis', 'Crown']), slot('gems', 'Gem colour', '#9a4ad0', ['Gems'])],
    layers: () => [...base({ light: '#6a2a9a', dark: '#0e0218', step: null }), ...edges('#d8dce4', SILVER_STOPS), fleurs('#e4e8f0', SILVER_STOPS), gems('#9a4ad0', '#d8dce4', SILVER_STOPS), crown('#e4e8f0', SILVER_STOPS, '#4a1a6a')],
  },
  {
    id: 'd-ermine',
    name: 'D · Ermine',
    pitch: 'White ermine flecked with black tails between gold edges, like a royal mantle, with a gold crown.',
    stage: STAGE,
    colours: [slot('gold', 'Gold colour', '#d8a838', ['Edges', 'Crown'])],
    layers: () => [
      ...base({ light: '#ffffff', dark: '#b8b4ac', step: null }),
      { ...textureLayer('feathers'), name: 'Fur', color: '#d8d4cc', amount: 0.6, scale: 0.6, strength: 0.6, seed: 0xfe11 },
      { ...repeatLayer(), name: 'Ermine tails', element: 'drop', count: 18, snapToCorners: false, at: 0.5, size: 0.24, stretch: 0.55, rotation: 180, fill: '#141414', altSizes: [1, 0.8], alternateSides: 0.18, raised: false, shaded: false },
      ...edges('#d8a838', WARM_GOLD),
      crown('#e2b85a', WARM_GOLD, '#a01a2a'),
    ],
  },
];
