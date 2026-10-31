// The built-in background pictures (DESIGN.md §6.3), saved in public/backgrounds/
// as 1024 px squares with 96 px thumbnails: open-licence paintings, night-sky
// and space pictures, and photo textures (CC0 or public domain; each one's
// source is below and in ASSETS-CREDITS.md). The ten that were once drawn by
// code (forest, dungeon…) kept their ids, so saved tokens show the new picture.

export type BackgroundGroup = 'Paintings' | 'Space' | 'Textures & paper';

export interface LibraryBackground {
  id: string;
  name: string;
  group: BackgroundGroup;
  /** Where the open-licence picture came from. */
  credit: { title: string; by: string; source: string };
}

export const BACKGROUND_LIBRARY: readonly LibraryBackground[] = [
  { id: 'twilight-sky', name: 'Twilight sky', group: 'Paintings', credit: { title: "Twilight in the Wilderness", by: "Frederic Edwin Church, 1860", source: 'https://clevelandart.org/art/1965.233' } },
  { id: 'red-sunset', name: 'Red sunset', group: 'Paintings', credit: { title: "Red Sunset", by: "Arkhyp Kuindzhi, 1905–8", source: 'https://www.metmuseum.org/art/collection/search/436833' } },
  { id: 'mountains', name: 'Mountains', group: 'Paintings', credit: { title: "The Rocky Mountains, Lander's Peak", by: "Albert Bierstadt, 1863", source: 'https://www.metmuseum.org/art/collection/search/10154' } },
  { id: 'alpine-peaks', name: 'Alpine Peaks', group: 'Paintings', credit: { title: "Panoramic View of the Alps, Les Dents du Midi", by: "Gustave Courbet, 1877", source: 'https://clevelandart.org/art/1964.420' } },
  { id: 'misty-gorge', name: 'Misty Gorge', group: 'Paintings', credit: { title: "A Gorge in the Mountains (Kauterskill Clove)", by: "Sanford Robinson Gifford, 1862", source: 'https://www.metmuseum.org/art/collection/search/10946' } },
  { id: 'deep-woods', name: 'Deep Woods', group: 'Paintings', credit: { title: "In the Woods", by: "Asher Brown Durand, 1855", source: 'https://www.metmuseum.org/art/collection/search/10790' } },
  { id: 'misty-marsh', name: 'Misty Marsh', group: 'Paintings', credit: { title: "Pond at Ville-d'Avray", by: "Jean Baptiste Camille Corot, late 1860s", source: 'https://clevelandart.org/art/1944.80' } },
  { id: 'storm-clouds', name: 'Storm Clouds', group: 'Paintings', credit: { title: "Fir Trees and Storm Clouds", by: "Albert Bierstadt, c. 1870", source: 'https://clevelandart.org/art/1982.37' } },
  { id: 'stormy-sea', name: 'Stormy Sea', group: 'Paintings', credit: { title: "Northeaster", by: "Winslow Homer, 1895; reworked by 1901", source: 'https://www.metmuseum.org/art/collection/search/11130' } },
  { id: 'moonlit-cape', name: 'Moonlit Cape', group: 'Paintings', credit: { title: "The North Cape by Moonlight", by: "Peder Balke, 1848", source: 'https://www.metmuseum.org/art/collection/search/441379' } },
  { id: 'aurora', name: 'Aurora', group: 'Paintings', credit: { title: "Aurora Borealis", by: "Frederic Edwin Church, 1865", source: 'https://www.si.edu/object/saam_1911.4.1' } },
  { id: 'volcano', name: 'Volcano', group: 'Paintings', credit: { title: "An Eruption of Vesuvius", by: "Johan Christian Dahl, 1824", source: 'https://www.metmuseum.org/art/collection/search/438159' } },
  { id: 'desert-dunes', name: 'Desert Dunes', group: 'Paintings', credit: { title: "Halt of Caravans at the Wells of Saba (Beersheba) in the Desert South of Hebron", by: "Charles de Coubertin, 1850", source: 'https://www.metmuseum.org/art/collection/search/441358' } },
  { id: 'ancient-ruins', name: 'Ancient Ruins', group: 'Paintings', credit: { title: "Ruins of an Ancient City", by: "John Martin, c. 1810–20", source: 'https://clevelandart.org/art/1981.13' } },
  { id: 'river-castle', name: 'River Castle', group: 'Paintings', credit: { title: "Castle on a River", by: "Salomon van Ruysdael, 1644", source: 'https://clevelandart.org/art/1973.2' } },
  { id: 'gothic-ruin', name: 'Gothic Ruin', group: 'Paintings', credit: { title: "Gothic Windows in the Ruins of the Monastery at Oybin", by: "Carl Gustav Carus, ca. 1828", source: 'https://www.metmuseum.org/art/collection/search/439122' } },
  { id: 'gothic-nave', name: 'Cathedral', group: 'Paintings', credit: { title: "Interior of a Gothic Church at Night", by: "Pieter Neeffs the Younger, ca. 1660", source: 'https://www.metmuseum.org/art/collection/search/437189' } },
  { id: 'forest', name: 'Forest', group: 'Paintings', credit: { title: "Forest Stream with Vista", by: "Asher B. Durand, 1872", source: 'https://clevelandart.org/art/1960.162' } },
  { id: 'swamp', name: 'Swamp', group: 'Paintings', credit: { title: "The Devil and Tom Walker", by: "John Quidor, 1856", source: 'https://clevelandart.org/art/1967.18' } },
  { id: 'water', name: 'Water', group: 'Paintings', credit: { title: "Low Tide at Pourville, near Dieppe", by: "Claude Monet, 1882", source: 'https://clevelandart.org/art/1947.196' } },
  { id: 'snow', name: 'Snow', group: 'Paintings', credit: { title: "Winter Landscape", by: "Jan Griffier, c. 1680–1718", source: 'https://clevelandart.org/art/2008.287' } },
  { id: 'lava', name: 'Lava', group: 'Paintings', credit: { title: "Mount Vesuvius at Midnight", by: "Albert Bierstadt, 1868", source: 'https://clevelandart.org/art/1949.541' } },
  { id: 'desert', name: 'Desert', group: 'Paintings', credit: { title: "Leaving the Oasis", by: "Jean-Léon Gérôme, 1880s", source: 'https://clevelandart.org/art/1977.126' } },
  { id: 'tavern', name: 'Tavern', group: 'Paintings', credit: { title: "Peasants Smoking in an Inn", by: "David Teniers, c. 1640", source: 'https://clevelandart.org/art/1916.1046' } },
  { id: 'dungeon', name: 'Dungeon', group: 'Paintings', credit: { title: "Subterranean Jail for the Stage", by: "Abel Schlicht, 1788", source: 'https://clevelandart.org/art/2003.23' } },
  { id: 'night-sky', name: 'Night sky', group: 'Space', credit: { title: "Perseid Meteor Shower (the Milky Way over Spruce Knob, West Virginia)", by: "NASA/Bill Ingalls, 2021", source: 'https://images.nasa.gov/details/NHQ202108110005' } },
  { id: 'nebula-cliffs', name: 'Nebula', group: 'Space', credit: { title: "\"Cosmic Cliffs\" in the Carina Nebula (Webb NIRCam)", by: "NASA, ESA, CSA, STScI, 2022", source: 'https://images.nasa.gov/details/carina_nebula' } },
  { id: 'star-cluster', name: 'Star field', group: 'Space', credit: { title: "Hubble Catches Stellar Exodus in Action (globular cluster 47 Tucanae)", by: "NASA, ESA, H. Richer & J. Heyl, 2015", source: 'https://images.nasa.gov/details/hubble-catches-stellar-exodus-in-action_17644845341_o' } },
  { id: 'vellum', name: 'Vellum', group: 'Textures & paper', credit: { title: "Hours of Charles the Noble, King of Navarre: blank fly leaf (vellum)", by: "Master of the Brussels Initials and Associates, c. 1405", source: 'https://clevelandart.org/art/1964.40.329.a' } },
  { id: 'old-paper', name: 'Old Paper', group: 'Textures & paper', credit: { title: "Page from Tales of a Parrot (Tuti-nama): blank page", by: "Mughal India, court of Akbar, c. 1560", source: 'https://clevelandart.org/art/1962.279.1.a' } },
  { id: 'parchment', name: 'Parchment', group: 'Textures & paper', credit: { title: "Paper 005 (crumples lit from its height map, coloured as parchment)", by: "ambientCG", source: 'https://ambientcg.com/view?id=Paper005' } },
  { id: 'old-leather', name: 'Leather', group: 'Textures & paper', credit: { title: "Brown Leather", by: "Rob Tuytel", source: 'https://polyhaven.com/a/brown_leather' } },
  { id: 'tavern-planks', name: 'Tavern Planks', group: 'Textures & paper', credit: { title: "Dark Wooden Planks", by: "Amal Kumar", source: 'https://polyhaven.com/a/dark_wooden_planks' } },
  { id: 'dungeon-wall', name: 'Stone wall', group: 'Textures & paper', credit: { title: "Castle Wall Slates", by: "Rob Tuytel", source: 'https://polyhaven.com/a/castle_wall_slates' } },
  { id: 'stone-flags', name: 'Flagstones', group: 'Textures & paper', credit: { title: "Large Floor Tiles 02", by: "Rob Tuytel", source: 'https://polyhaven.com/a/large_floor_tiles_02' } },
  { id: 'mossy-cobbles', name: 'Mossy Cobbles', group: 'Textures & paper', credit: { title: "Mossy Cobblestone", by: "S\u01a1n Nguy\u1ec5n", source: 'https://polyhaven.com/a/mossy_cobblestone' } },
  { id: 'black-marble', name: 'Black Marble', group: 'Textures & paper', credit: { title: "Marble 006", by: "ambientCG", source: 'https://ambientcg.com/view?id=Marble006' } },
  { id: 'aged-brass', name: 'Aged Brass', group: 'Textures & paper', credit: { title: "Metal 007", by: "ambientCG", source: 'https://ambientcg.com/view?id=Metal007' } },
  { id: 'lava-flow', name: 'Lava crust', group: 'Textures & paper', credit: { title: "Lava 003", by: "ambientCG", source: 'https://ambientcg.com/view?id=Lava003' } },
  { id: 'snowy-ground', name: 'Snowy ground', group: 'Textures & paper', credit: { title: "Snow 015", by: "ambientCG", source: 'https://ambientcg.com/view?id=Snow015' } },
];

export const libraryBackground = (id: string) => BACKGROUND_LIBRARY.find((b) => b.id === id);
export const libraryImageUrl = (id: string) => `/backgrounds/${id}.webp`;
export const libraryThumbUrl = (id: string) => `/backgrounds/${id}-thumb.webp`;
