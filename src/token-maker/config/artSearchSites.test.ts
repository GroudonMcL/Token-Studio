import { ART_SEARCH_SITES, artSearchTerm, artSearchUrl, siteSearchTerm } from './artSearchSites';

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

  it('leaves out AI art where the site can be told, and nowhere else', () => {
    const site = (name: string) => ART_SEARCH_SITES.find((s) => s.name === name)!;
    expect(siteSearchTerm(site('Google Images'), 'goblin', true)).toBe('goblin -ai -aiart -"ai art" -"ai generated" -midjourney -"stable diffusion" -dalle -nijijourney');
    expect(siteSearchTerm(site('Reddit'), 'goblin', true)).toBe('goblin NOT ai NOT midjourney NOT "stable diffusion"');
    expect(siteSearchTerm(site('Pinterest'), 'goblin', true)).toBe('goblin');
    expect(siteSearchTerm(site('Google Images'), 'goblin', false)).toBe('goblin');
    expect(artSearchUrl(site('Bing Images'), 'orc', true)).toContain(encodeURIComponent('orc -ai'));
  });
});
