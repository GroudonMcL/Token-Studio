# Frame review

Before launch, every ready-made frame is reviewed one at a time against the
owner's own designs (the **Essentials**), and new versions are made in the
same house style (`src/frame-studio/project/houseStyle.ts`): a two-tone
gradient band lit from the top left, a reversed pressed-in step, a thin
crease, a lit outer rim, a shadowed inner rim and one soft drop shadow, with
photo textures (through blend modes and recolouring), blurred layered glows,
and bevels only on real materials (gold, enamel, chiselled stone).

Chosen designs go in `src/frame-studio/project/builtInFrames.ts` with their
**colour slots** (`colourSlots.ts`), which Token Maker shows as one colour
picker each. Candidates are drawn with
`npx tsx scripts/frame-studio/candidates/build.ts <frame> <outDir>`.

## The owner's preferences so far

- Clean, saturated gradient bands rather than muddy textures.
- Colour choices on every frame where they make sense: a band colour and a
  highlight colour, picked separately.
- Keeps an original when it already works (Stamped), adding versions beside it.
- Likes glossy, jewellery-like and glowing finishes and warm leather; dropped
  matt clay and patinated copper.
- Frame picker: the pop-out gallery (P1), with versions stacked behind their
  frame.
- Inscriptions use the fictional alphabets (BabelStone Runic, Outer Rim AF,
  Sith AF, Yugurian) as well as the runes, and mix in Token Maker, Crystal
  Frog Maps, Greyhawk and Sammy Smells with made-up phrases
  (houseStyle.ts: INSCRIPTION_WORDS). Rellanic, Davek, Iokharic and Barazhad
  are free for personal use only, so they can't be bundled.
- No bevel lighting over a whole band: shade with the twin gradient bands
  (houseStyle.ts: bandShading, a version's `shading` flag). 39 versions use
  it. A whole-band bevel stays where it suits the material: Tooled leather, Scrollwork steel,
  Damascus, Brimstone, Infernal iron, Gold lines on enamel, Anodised titanium,
  Volcanic script, Velvet & gold, Golden lyre, Jade & gold, Crimson aria and
  Workshop iron (mostly polished metal, enamel and glossy surfaces).
- Ornaments stay inside the band unless reaching out is the point, and clear of text; text sits between or inside plates, never under or across their edges (houseStyle.ts: panelWords).
- On hexagons and squares, icons and emblems point out from the centre (repeat facing 'along', format 12); 'edge' keeps the old square-to-the-side facing.
- Prefers organic, natural textures for nature and primal frames.
- Usually keeps the current frame and most new versions; drops busy or matt ones.
- Kept for Wizard: the calm and the rich versions (Sapphire runes, Starweave,
  Ley lines, Gilded grimoire). Not kept: the violet crystal and lightning
  versions.

## Progress

| Frame | Group | Result |
|---|---|---|
| Essentials (9) | Essentials | The owner's designs, added as they were made, without the "FM_" names. |
| Wizard | Classes | Four new versions added after Wizard: Sapphire runes, Starweave, Ley lines, Gilded grimoire. |
| Stamped | Classic | Kept as it is, plus four versions after it: Veined stamp, Tooled leather, Brass & enamel, Ember stamp. |
| Gilded | Classic | Kept, plus Filigree and Gold on lacquer. |
| Engraved | Classic | Kept, plus Scrollwork steel, Silver inlay (Sith AF), Damascus, Etched knotwork, Engraved bronze (Yugurian). |
| Arcane | Classic | Kept, plus Sigil band, Arcane crystal, Spellbook, Arcane circuitry. |
| Infernal | Classic | Kept, plus Hellfire runes, Brimstone, Infernal iron, Blood pact. |
| Double line | Classic | Kept, with its diamonds now set into the band; plus Gold lines on enamel, Twin rings, Studded double, Fine lines, Cord between gold. |
| Polished | Classic | Kept, plus Anodised titanium, Pearl, Obsidian. |
| Oak | Textures | Kept, plus Varnished oak, Brass-bound oak, Rune-carved oak, Living bark. |
| Cobblestone | Textures | Kept, plus Mossy cobbles, Forest path, Lichen granite (shaded with gradient bands). |
| Magma | Textures | Kept, plus Cooling crust, Obsidian & fire, Ember streaks, Volcanic script. |
| Harlequin | Textures | Kept, with its diamonds now inside the band and meeting tip to tip; plus Jester's diamonds, Velvet harlequin, Checkered enamel (tiles line up on every shape), Stained glass, Carnival. |
| Knotwork | Textures | Kept, plus Celtic gold, Silver on black, Carved stone knot, Braided leather, Fey knot. |
| Starfield | Textures | Kept, plus Deep space, Star chart, Galaxy swirl, Moon phases, Aurora. |
| Barbarian | Classes | Kept, plus Fur trim, Gnarled bone, War club. |
| Bard | Classes | Kept, plus Lute, Velvet & gold, Starlit song, Golden lyre, Outer Rim chorus, Crimson aria, Moonlit verse. |
| Cleric | Classes | Original retired from the picker; Holy light, Silver & sapphire, Temple marble, Dawn. |
| Druid | Classes | Kept, plus Glowing stone circle, Bramble & berries, Wildflower meadow. |
| Fighter | Classes | Kept, plus Battle steel, Shield wall, Chainmail, Champion. |
| Monk | Classes | Kept, plus Saffron robe, Jade & gold, Ink circle. |
| Paladin, Ranger, Rogue, Warlock | Classes | Kept, plus all five versions each. |
| Sorcerer | Classes | Kept, plus Wild magic, Draconic bloodline, Storm sorcery, Crystal heart. |
| Artificer | Classes | Kept, plus Copper pipework, Workshop iron. |
| Gilded laurel | Crafted | Kept (beads removed), plus Laurel on enamel, Victor’s wreath, Jewelled wreath, Silver olive, Laurel oath. |
| Iron rivets | Crafted | Kept, plus Blackened iron, Rusted plate, Dwarven strapwork, Forge script, Gunmetal bolts. |
| Runestone | Crafted | Kept (cracks softened), plus Mossy runestone, Ember runes, Frost runes, Gilded slate. |
| Thorns | Crafted | Kept, plus Rose briar, Bramble on bark, Silverwork thorns. |
| Dragon scales | Crafted | Original retired; Red dragon, Black dragon, Wyrm script. Overlapping-row scales tried and dropped. |
| Celestial star | Crafted | Kept, plus Sun & moon, Astrolabe. |
| Rope | Crafted | Kept, plus Sailor’s rope, Braided leather. |
| Shield rim | Crafted | Kept, plus all five. |
| Gilded filigree | Crafted borders | Kept, plus Sapphire filigree, Emerald script. |
| Guild ring | Crafted borders | Kept (gold and silver), plus Gold guild ring, Silver & sapphire, Bronze & enamel. |
| Raven plume | Crafted borders | Retired; Raven sheen, Plume & bone, Owl plume, with gradient rings and a grained band for depth. |
| Emberforged | Crafted borders | Kept, plus Molten ring, Forge runes, Frostfire. |
| Storm wisps | Crafted borders | Kept, plus Arcane storm, Sea squall. |
| Riveted plates | Crafted borders | Retired; Ordered plates, Forge seams, Dwarven bulwark (curved plates with gaps, rivets over plate centres and gaps), Curved ordered plates, Curved forge seams. |
| Brass & beads | Layered | Retired; Polished brass, Brass & jet. |
| Glowing runes | Layered | Kept, plus Runic glow, Emerald runes, Fire runes, Twin circle. |
| Jewelled | Layered | Retired; Silver & jewels, Pavé band, Art deco, Victorian garnets, Eternity band. |
| Battle-worn steel | Layered | Kept, plus Notched blade, Bloodied steel (blood spatter). |
| Night sky | Layered | Kept, plus Dusk to midnight, Constellations, Aurora (with depth). |
| Dwarven bronze | Layered | Retired; Forged bronze, Steel & gold (runes between the plates), Runic bronze (no plates, big runes). |
| Eldritch crystal | Layered | Retired; Amethyst geode. |
| Radiant gold | Layered | Retired; Holy gold, Rose gold & pearls, Divine script. |
| Hellforged iron | Layered | Kept, plus Hellforged. |
| Royal inscription | Layered | Retired; Royal gold, Crimson & gold, Silver & sapphire, Royal velvet. |
| Rune-carved plates | Layered | Retired; four curved-plate versions, one rune word inside each plate. |
| Overgrown ruin | Layered | Kept as it is; new versions dropped. |
| Dragon scales | Crafted | Also Serpent coil: overlapping rows (third steps) with soft outlines, row shadows and clipped gradient bands. |

After Token Maker's 34 frames, Frame Studio's 43 starting designs (Layered,
Crafted borders, Themed) are reviewed the same way: 77 frames in all.
