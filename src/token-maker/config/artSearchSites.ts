/**
 * How a site's search can leave out AI art: words to exclude with a minus
 * (-midjourney), with NOT (Reddit), or not at all from a link (the site has
 * its own setting instead, described in AI_FILTER_HINT).
 */
export type NoAiStyle = 'minus' | 'not' | null;

export interface ArtSearchSite {
  name: string;
  url: string;
  noAi: NoAiStyle;
}

/**
 * The sites the "Find art online" buttons search (Import section). To add a
 * site, add a line: its button name, its search address with {q} where the
 * search words go, and how it can leave out AI art. To remove one, delete
 * its line. The first site is the one Enter searches.
 */
export const ART_SEARCH_SITES: readonly ArtSearchSite[] = [
  { name: 'Google Images', url: 'https://www.google.com/search?udm=2&q={q}', noAi: 'minus' },
  { name: 'Pinterest', url: 'https://www.pinterest.com/search/pins/?q={q}', noAi: null },
  { name: 'ArtStation', url: 'https://www.artstation.com/search?query={q}', noAi: null },
  { name: 'DeviantArt', url: 'https://www.deviantart.com/search?q={q}', noAi: null },
  { name: 'Reddit', url: 'https://www.reddit.com/search/?q={q}', noAi: 'not' },
  { name: 'Bing Images', url: 'https://www.bing.com/images/search?q={q}', noAi: 'minus' },
];

/** Words that mark AI art in titles, tags and captions, left out when "Leave out AI art" is on. */
export const AI_WORDS: readonly string[] = ['ai', 'aiart', '"ai art"', '"ai generated"', 'midjourney', '"stable diffusion"', 'dalle', 'nijijourney'];

/** What the sites that can't filter by link offer instead. */
export const AI_FILTER_HINT =
  'Google, Bing and Reddit leave out pictures tagged as AI. Pinterest, ArtStation and DeviantArt can’t be told by a link: on ArtStation use Quick filters → Hide projects created with AI; on DeviantArt turn off AI art in your browse settings.';

/** The search words for one site, with AI words excluded the way that site understands, when asked. */
export function siteSearchTerm(site: ArtSearchSite, term: string, noAi: boolean): string {
  if (!term || !noAi || !site.noAi) return term;
  const words = site.noAi === 'minus' ? AI_WORDS.map((w) => `-${w}`) : ['ai', 'midjourney', '"stable diffusion"'].map((w) => `NOT ${w}`);
  return `${term} ${words.join(' ')}`;
}

/** Words added to the search when "Add “fantasy art”" is on, so results lean towards illustrations. */
export const ART_SEARCH_EXTRA = 'fantasy art';

/** The search words, with the extra words unless they're already there. */
export function artSearchTerm(text: string, addExtra: boolean): string {
  const term = text.trim().replace(/\s+/g, ' ');
  if (!term || !addExtra || term.toLowerCase().includes(ART_SEARCH_EXTRA)) return term;
  return `${term} ${ART_SEARCH_EXTRA}`;
}

/** A site's search address for the words (leaving out AI art when `noAi`, where the site can). */
export function artSearchUrl(site: ArtSearchSite, term: string, noAi = false): string {
  return site.url.replace('{q}', encodeURIComponent(siteSearchTerm(site, term, noAi)));
}
