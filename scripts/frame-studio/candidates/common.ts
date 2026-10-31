// Everything a candidate file needs, in one import.
export * from '../../../src/frame-studio/project/houseStyle';
export { knotworkLayer, cellsLayer, chainLayer, gearsLayer } from '../../../src/frame-studio/project/defaults';
export { adjust, material, wear } from '../../../src/frame-studio/project/styles';
export { projectFromFrame } from '../../../src/frame-studio/project/defaults';
import { recolour, GOLD_STOPS, SILVER_STOPS, bevel, shadow, type Effect } from '../../../src/frame-studio/project/houseStyle';

export const ROSE_STOPS = ['#3a1a14', '#8a4a3a', '#d8907a', '#f6d0c0', '#fff4ee'];
export const STEEL_STOPS = ['#101418', '#3a4048', '#7a828c', '#c8ced6', '#f4f8fc'];
export const BRONZE_STOPS = ['#1e1206', '#5a3a18', '#a87a3a', '#e0c08a', '#fff0d0'];
/** Polished metal on any shape: gently rounded, glossy, recoloured. */
export const metalFx = (stops: string[], size = 0.35, gloss = 0.7): Effect[] => [
  bevel({ profile: 'rounded', size, depth: 1, gloss, highlightOpacity: 0.75, shadowOpacity: 0.45, soften: 0.02 }),
  recolour(stops),
  shadow({ opacity: 0.5, distance: 0.04, blur: 0.05 }),
];
export { GOLD_STOPS, SILVER_STOPS };
/** A warmer, deeper gold than the Essentials' champagne gold. */
export const WARM_GOLD = ['#241402', '#6e4a0e', '#c8952e', '#f4d27a', '#fff8e0'];
