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
- Ornaments stay inside the band unless reaching out is the point.
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
| Cobblestone | Textures | Kept, plus Mossy cobbles; round 3. |
| Magma | Textures | Kept, plus Cooling crust, Obsidian & fire, Ember streaks, Volcanic script. |
| Harlequin | Textures | Kept, with its diamonds now inside the band and meeting tip to tip; plus Jester's diamonds, Velvet harlequin, Checkered enamel (tiles line up on every shape), Stained glass, Carnival. |
| Knotwork | Textures | Kept, plus Celtic gold, Silver on black, Carved stone knot, Braided leather, Fey knot. |
| Starfield | Textures | Kept, plus Deep space, Star chart, Galaxy swirl, Moon phases, Aurora. |
| Barbarian | Classes | Kept; round 2 (more organic, nothing outside the band). |
| Bard | Classes | Kept, plus Lute, Velvet & gold, Starlit song, Golden lyre; round 2 with more fonts. |
| Cleric | Classes | Original retired from the picker; Holy light, Silver & sapphire, Temple marble, Dawn. |
| Druid | Classes | Kept, plus Glowing stone circle; round 2 (more natural). |
| Fighter | Classes | Kept, plus Battle steel, Shield wall, Chainmail, Champion. |
| Monk | Classes | Kept, plus Saffron robe, Jade & gold, Ink circle. |
| Paladin, Ranger, Rogue, Sorcerer, Warlock, Artificer | Classes | Choosing: five candidates each. |

After Token Maker's 34 frames, Frame Studio's 43 starting designs (Layered,
Crafted borders, Themed) are reviewed the same way: 77 frames in all.
