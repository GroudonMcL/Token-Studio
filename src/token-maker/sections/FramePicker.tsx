// The frame picker (owner's choice in the frame review, "P1"): the panel
// shows only the chosen frame and a Change button; Change pops out a gallery
// with a tab per group, search, large thumbnails, and new versions of a
// frame stacked behind it ("+4 versions") until opened.

import { Search, X } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ControlLabel } from '../components';

export interface FrameTile {
  id: string;
  label: string;
  group: string;
  /** The frame it is a version of (its tile id), for the stacks. */
  parent?: string;
  /** More words search finds it by (a retired frame's name, for its versions). */
  aka?: string;
}

export function FramePicker({ tiles, thumbs, value, onChange }: { tiles: readonly FrameTile[]; thumbs: Map<string, string> | null; value: string; onChange: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const current = tiles.find((t) => t.id === value);
  const parent = current?.parent ? tiles.find((t) => t.id === current.parent) : undefined;
  const close = () => {
    setOpen(false);
    button.current?.focus();
  };
  return (
    <div className="frame-pick" data-control="frame-picker" data-help-id="frame.style">
      <ControlLabel label="Frame" helpId="frame.style" />
      <div className="frame-pick__current" data-testid="current-frame">
        <Thumb src={thumbs?.get(value)} size={56} />
        <div className="frame-pick__current-text">
          <strong>{current?.label ?? 'Frame'}</strong>
          <small>{parent ? `${current!.group} · version of ${parent.label}` : current?.group}</small>
        </div>
        <button ref={button} type="button" className="btn btn--primary frame-pick__change" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>
          Change frame
        </button>
      </div>
      {open &&
        createPortal(
          <Gallery
            tiles={tiles}
            thumbs={thumbs}
            value={value}
            onPick={(id) => {
              onChange(id);
              close();
            }}
            onClose={close}
          />,
          document.body,
        )}
    </div>
  );
}

function Thumb({ src, size }: { src: string | undefined; size: number }) {
  return src ? <img src={src} alt="" width={size} height={size} /> : <span className="tile__blank" style={{ width: size, height: size }} />;
}

function Gallery({ tiles, thumbs, value, onPick, onClose }: { tiles: readonly FrameTile[]; thumbs: Map<string, string> | null; value: string; onPick: (id: string) => void; onClose: () => void }) {
  const titleId = useId();
  const box = useRef<HTMLDivElement>(null);
  const groups = useMemo(() => [...new Set(tiles.map((t) => t.group))], [tiles]);
  const chosen = tiles.find((t) => t.id === value);
  const [tab, setTab] = useState(chosen?.group ?? groups[0]);
  const [query, setQuery] = useState('');
  const [stacks, setStacks] = useState<Set<string>>(() => new Set(chosen?.parent ? [chosen.parent] : []));
  const versions = useMemo(() => {
    const m = new Map<string, FrameTile[]>();
    for (const t of tiles) if (t.parent) m.set(t.parent, [...(m.get(t.parent) ?? []), t]);
    return m;
  }, [tiles]);

  useEffect(() => {
    const start = box.current?.querySelector<HTMLElement>('[aria-checked="true"]') ?? box.current?.querySelector<HTMLElement>('input');
    start?.focus();
  }, []);

  const q = query.trim().toLowerCase();
  const labelOf = (id: string | undefined) => tiles.find((t) => t.id === id)?.label ?? '';
  const shown: ReactNode[] = [];
  const tileButton = (t: FrameTile, version = false) => (
    <button
      key={t.id}
      type="button"
      role="radio"
      aria-checked={t.id === value}
      className={`frame-pick__tile${version ? ' frame-pick__tile--version' : ''}`}
      onClick={() => onPick(t.id)}
    >
      <Thumb src={thumbs?.get(t.id)} size={72} />
      <span>{t.label}</span>
    </button>
  );
  if (q) {
    for (const t of tiles) if (`${t.label} ${labelOf(t.parent)} ${t.aka ?? ''} ${t.group}`.toLowerCase().includes(q)) shown.push(tileButton(t, !!t.parent));
  } else {
    for (const t of tiles.filter((x) => x.group === tab && !x.parent)) {
      const vs = versions.get(t.id) ?? [];
      const openStack = stacks.has(t.id);
      shown.push(
        <div key={t.id} className="frame-pick__cell">
          {tileButton(t)}
          {vs.length > 0 && (
            <button
              type="button"
              className="frame-pick__stack"
              aria-expanded={openStack}
              aria-label={`${openStack ? 'Hide' : 'Show'} ${vs.length} versions of ${t.label}`}
              onClick={() => setStacks((s) => new Set(openStack ? [...s].filter((x) => x !== t.id) : [...s, t.id]))}
            >
              {openStack ? 'Hide' : `+${vs.length}`}
            </button>
          )}
        </div>,
      );
      if (openStack) shown.push(...vs.map((v) => tileButton(v, true)));
    }
  }

  return (
    <div className="frame-pick__backdrop" onPointerDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={box}
        className="frame-pick__gallery"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.stopPropagation();
            onClose();
          }
        }}
      >
        <div className="frame-pick__head">
          <h2 id={titleId}>Choose a frame</h2>
          <label className="frame-pick__search">
            <Search size={16} aria-hidden="true" />
            <input type="search" placeholder="Search frames" aria-label="Search frames" value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <button type="button" className="icon-btn" aria-label="Close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="frame-pick__body">
          <div className="frame-pick__tabs" role="tablist" aria-label="Frame groups">
            {groups.map((g) => (
              <button key={g} type="button" role="tab" aria-selected={!q && g === tab} className="frame-pick__tab" onClick={() => (setTab(g), setQuery(''))}>
                {g}
                <small>{tiles.filter((t) => t.group === g).length}</small>
              </button>
            ))}
          </div>
          <div className="frame-pick__grid" role="radiogroup" aria-label={q ? 'Matching frames' : `${tab} frames`}>
            {shown.length ? shown : <p className="frame-pick__none">No frames match “{query}”.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
