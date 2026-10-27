/**
 * The sites the "Find art online" buttons search (Import section). To add a
 * site, add a line: its button name and its search address, with {q} where
 * the search words go. To remove one, delete its line. The first site is
 * the one Enter searches.
 */
export const ART_SEARCH_SITES: readonly { name: string; url: string }[] = [
  { name: 'Google Images', url: 'https://www.google.com/search?udm=2&q={q}' },
  { name: 'Pinterest', url: 'https://www.pinterest.com/search/pins/?q={q}' },
  { name: 'ArtStation', url: 'https://www.artstation.com/search?query={q}' },
  { name: 'DeviantArt', url: 'https://www.deviantart.com/search?q={q}' },
  { name: 'Reddit', url: 'https://www.reddit.com/search/?q={q}' },
  { name: 'Bing Images', url: 'https://www.bing.com/images/search?q={q}' },
];

/** Words added to the search when "Add “fantasy art”" is on, so results lean towards illustrations. */
export const ART_SEARCH_EXTRA = 'fantasy art';

/** The search words, with the extra words unless they're already there. */
export function artSearchTerm(text: string, addExtra: boolean): string {
  const term = text.trim().replace(/\s+/g, ' ');
  if (!term || !addExtra || term.toLowerCase().includes(ART_SEARCH_EXTRA)) return term;
  return `${term} ${ART_SEARCH_EXTRA}`;
}

/** A site's search address for the words. */
export function artSearchUrl(site: { url: string }, term: string): string {
  return site.url.replace('{q}', encodeURIComponent(term));
}
