// The "cut off at the edge" check (src/render/overflow.ts), kept up to date
// for the token being edited. The canvas runs it shortly after the token
// stops changing; the canvas warning and the Export section both read it.

import { useEffect } from 'react';
import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import type { TokenDocument } from '../document/types';
import { findOverflow, type OverflowReport } from '../render/overflow';
import type { AssetMap, RenderSource } from '../render/render';

export const overflowStore = createStore<{ report: OverflowReport }>(() => ({ report: [] }));

export const useOverflow = () => useStore(overflowStore, (s) => s.report);

/** How long the token must stay still before it is checked again. */
const SETTLE_MS = 250;

/** Checks `doc` once it has stopped changing (not while something is being dragged). */
export function useOverflowCheck(doc: TokenDocument, assets: AssetMap, processedArt: RenderSource | undefined, busy: boolean): void {
  useEffect(() => {
    if (busy) return;
    const id = setTimeout(() => {
      let report: OverflowReport = [];
      try {
        report = doc.art.assetId ? findOverflow(doc, assets, processedArt) : [];
      } catch {
        // A check that can't run says nothing, rather than breaking the canvas.
      }
      const now = overflowStore.getState().report;
      if (report.join() !== now.join()) overflowStore.setState({ report });
    }, SETTLE_MS);
    return () => clearTimeout(id);
  }, [doc, assets, processedArt, busy]);
}
