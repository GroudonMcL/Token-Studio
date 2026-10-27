import { Settings2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
