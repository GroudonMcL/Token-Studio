import { ART_SEARCH_SITES, artSearchTerm, artSearchUrl } from './artSearchSites';

describe('Find art online', () => {
  it('adds "fantasy art" unless it is off or already there', () => {
    expect(artSearchTerm('  goblin   shaman ', true)).toBe('goblin shaman fantasy art');
    expect(artSearchTerm('goblin shaman', false)).toBe('goblin shaman');
    expect(artSearchTerm('Goblin Fantasy Art', true)).toBe('Goblin Fantasy Art');
    expect(artSearchTerm('   ', true)).toBe('');
  });

  it("fills each site's search address with the encoded words", () => {
    const urls = ART_SEARCH_SITES.map((site) => artSearchUrl(site, 'goblin & orc #1'));
    expect(urls).toEqual([
      'https://www.google.com/search?udm=2&q=goblin%20%26%20orc%20%231',
      'https://www.pinterest.com/search/pins/?q=goblin%20%26%20orc%20%231',
      'https://www.artstation.com/search?query=goblin%20%26%20orc%20%231',
      'https://www.deviantart.com/search?q=goblin%20%26%20orc%20%231',
      'https://www.reddit.com/search/?q=goblin%20%26%20orc%20%231',
      'https://www.bing.com/images/search?q=goblin%20%26%20orc%20%231',
    ]);
  });
});
