import type { KeyboardEvent } from 'react';
import { PANEL_TABS, TAB_GROUPS, type PanelTab } from './sections';

/**
 * The tool rail down the left of the canvas (owner's choice of layout A):
 * every tab one click away, grouped in the order a token is made. It drives
 * the side panel, which shows only the chosen tab.
 */
export function ToolRail({ active, panelId, onChoose }: { active: PanelTab; panelId: string; onChoose: (id: string) => void }) {
  // Up/Down (and Home/End) move between tabs, as in any vertical tab list.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = PANEL_TABS.indexOf(active);
    const next =
      e.key === 'ArrowDown' ? (i + 1) % PANEL_TABS.length
      : e.key === 'ArrowUp' ? (i - 1 + PANEL_TABS.length) % PANEL_TABS.length
      : e.key === 'Home' ? 0
      : e.key === 'End' ? PANEL_TABS.length - 1
      : -1;
    if (next < 0) return;
    e.preventDefault();
    const tab = PANEL_TABS[next]!;
    onChoose(tab.id);
    e.currentTarget.querySelector<HTMLElement>(`[data-tab="${tab.id}"]`)?.focus();
  };
  return (
    <nav className="tool-rail" aria-label="Token sections">
      <div className="tool-rail__list" role="tablist" aria-label="Settings" aria-orientation="vertical" onKeyDown={onKeyDown}>
        {TAB_GROUPS.map((group) => (
          <div key={group} className="tool-rail__group" role="presentation">
            <span className="tool-rail__group-name" aria-hidden="true">
              {group}
            </span>
            {PANEL_TABS.filter((t) => t.group === group).map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                data-tab={t.id}
                className="tool-rail__tab"
                aria-selected={t.id === active.id}
                aria-controls={panelId}
                tabIndex={t.id === active.id ? 0 : -1}
                onClick={() => onChoose(t.id)}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}
