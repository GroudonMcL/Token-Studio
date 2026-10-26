// Token Studio's colour schemes (palettes.css). The choice is kept in this
// browser as 'ts.palette' and set as <html data-palette> on the page and in
// both apps; each page's index.html applies it before painting, and a change
// in one app reaches the others through the storage event.

import { useEffect, useState } from 'react';

export const PALETTES = [
  { id: 'lamplit', name: 'Lamplit', note: 'The original: navy top, warm charcoal and brass.' },
  { id: 'harbour', name: 'Harbour dusk', note: 'Grey-navy panels, cyan edges, gold highlights.' },
  { id: 'teal', name: 'Deep current', note: 'Navy running down into dark cyan, with gold.' },
  { id: 'sea', name: 'Sea from space', note: 'Indigo, ocean blue and teal, gold and seafoam.' },
  { id: 'abyss', name: 'Abyssal indigo', note: 'Indigo and dusk violet with warm gold.' },
  { id: 'glass', name: 'Glass tide', note: 'Royal blue to cyan, like frosted glass.' },
  { id: 'obsidian', name: 'Obsidian glow', note: 'Near-black, with a gold glow on what is chosen.' },
  { id: 'graphite', name: 'Graphite', note: 'Quiet neutral greys, gold for what matters.' },
  { id: 'midnight', name: 'Graphite on navy', note: 'Graphite panels on a navy page, top to bottom.' },
  { id: 'slate', name: 'Slate lagoon', note: 'Grey slate with lagoon-cyan focus and gold.' },
  { id: 'verdigris', name: 'Verdigris', note: 'Blue-green copper patina and brass.' },
] as const;

export type PaletteId = (typeof PALETTES)[number]['id'];

export const PALETTE_KEY = 'ts.palette';
export const DEFAULT_PALETTE: PaletteId = 'lamplit';

const isPalette = (v: unknown): v is PaletteId => PALETTES.some((p) => p.id === v);

export function readPalette(): PaletteId {
  try {
    const v = localStorage.getItem(PALETTE_KEY);
    return isPalette(v) ? v : DEFAULT_PALETTE;
  } catch {
    return DEFAULT_PALETTE;
  }
}

export function applyPalette(id: PaletteId): void {
  document.documentElement.setAttribute('data-palette', id);
}

/** The chosen scheme and a setter that applies and remembers it; follows changes made in the other app. */
export function usePalette() {
  const [palette, setPalette] = useState<PaletteId>(readPalette);
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== PALETTE_KEY) return;
      const next = isPalette(e.newValue) ? e.newValue : DEFAULT_PALETTE;
      applyPalette(next);
      setPalette(next);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  const choose = (id: PaletteId) => {
    applyPalette(id);
    setPalette(id);
    try {
      if (id === DEFAULT_PALETTE) localStorage.removeItem(PALETTE_KEY);
      else localStorage.setItem(PALETTE_KEY, id);
    } catch {
      /* storage blocked: the choice just won't be remembered */
    }
  };
  return [palette, choose] as const;
}
