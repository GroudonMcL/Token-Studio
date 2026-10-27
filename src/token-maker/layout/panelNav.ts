import { useEffect, useState } from 'react';
import { selectDecoration } from '../editor/tools';
import { onRevealSection } from './reveal';
import { PANEL_TABS, tabById, tabOfSection, type SectionId } from './sections';

/**
 * Which tab is showing, and which of its sections is open (a tab with more
 * than one section shows them one at a time, starting with the first).
 * Shared by the desktop tool rail and the phone bottom sheet.
 */
export function usePanelNav(onReveal?: () => void) {
  const [tab, setTabState] = useState(PANEL_TABS[0]!.id);
  const [openSection, setOpenSection] = useState<SectionId | null>(PANEL_TABS[0]!.sections[0]!);

  const setTab = (id: string) => {
    setTabState(id);
    setOpenSection(tabById(id).sections[0]!);
  };

  // A section asked to be shown (e.g. pictures found on a pasted page link).
  useEffect(
    () =>
      onRevealSection((id) => {
        setTabState(tabOfSection(id).id);
        setOpenSection(id);
        onReveal?.();
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // Leaving the Decorations section lets go of the picked decoration, so the art's handles come back.
  useEffect(() => {
    if (openSection !== 'decorations') selectDecoration(null);
  }, [openSection]);

  return { tab: tabById(tab), setTab, openSection, setOpenSection };
}
