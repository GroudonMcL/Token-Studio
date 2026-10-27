import { Settings2 } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { MenuStyleSwitch } from './MenuStyleSwitch';

/**
 * The top bar's settings button: how much each section shows (Simple /
 * Advanced / Expert). It sat above the sections until the tool rail; it's a
 * preference set once, so it moved here (owner's choice of layout A).
 */
export function PanelSettings() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const box = useRef<HTMLDivElement>(null);
  // Placed under the button but kept on screen: on phones the button can sit at the left of the top bar's second row.
  const [place, setPlace] = useState<CSSProperties>({});
  useLayoutEffect(() => {
    if (!open || !button.current) return;
    const r = button.current.getBoundingClientRect();
    const width = Math.min(300, window.innerWidth - 24);
    setPlace({ top: r.bottom + 6, left: Math.max(12, Math.min(r.right - width, window.innerWidth - width - 12)), right: 'auto' });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    box.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus();
    const onDown = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node) && !button.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  return (
    <div className="palette-picker">
      <button ref={button} type="button" className="icon-btn" aria-label="Panel settings" title="Panel settings" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <Settings2 size={18} />
      </button>
      {open && (
        <div
          ref={box}
          className="palette-menu panel-settings"
          style={place}
          role="dialog"
          aria-label="Panel settings"
          onKeyDown={(e) => {
            if (e.key !== 'Escape') return;
            e.stopPropagation();
            setOpen(false);
            button.current?.focus();
          }}
        >
          <p className="palette-menu__title">Panel settings</p>
          <MenuStyleSwitch />
        </div>
      )}
    </div>
  );
}
