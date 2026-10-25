// Token Studio: Token Maker and Frame Studio on one page. Each app runs in
// its own frame (so their styles and keyboard shortcuts stay apart), and the
// title buttons at the top switch between them. A design Frame Studio sends
// is passed on to Token Maker, which uses it as the token's frame.

import { useEffect, useRef, useState } from 'react';

type AppId = 'token-maker' | 'frame-studio';

const APPS: { id: AppId; title: string; src: string }[] = [
  { id: 'token-maker', title: 'Token Maker', src: '/token-maker/' },
  { id: 'frame-studio', title: 'Frame Studio', src: '/frame-studio/' },
];

/** Messages between the shell and the apps (see the apps' studioBridge.ts and tokenStudio.ts). */
const SEND_FRAME_MESSAGE = 'token-studio:send-frame';
const FRAME_MESSAGE = 'token-studio:frame';
const READY_MESSAGE = 'token-studio:token-maker-ready';

const APP_KEY = 'token-studio:app';
const THEME_KEY = 'tm.theme';

function savedApp(): AppId {
  try {
    return localStorage.getItem(APP_KEY) === 'frame-studio' ? 'frame-studio' : 'token-maker';
  } catch {
    return 'token-maker';
  }
}

export function Shell() {
  const [app, setApp] = useState<AppId>(savedApp);
  // Frame Studio loads the first time it is shown; Token Maker always loads, so it can take frames.
  const [loaded, setLoaded] = useState<ReadonlySet<AppId>>(() => new Set(['token-maker', app]));
  const tokenMaker = useRef<HTMLIFrameElement>(null);
  const frameStudio = useRef<HTMLIFrameElement>(null);
  const tokenMakerReady = useRef(false);
  const waiting = useRef<string[]>([]);

  const show = (id: AppId) => {
    setApp(id);
    setLoaded((prev) => (prev.has(id) ? prev : new Set([...prev, id])));
    try {
      localStorage.setItem(APP_KEY, id);
    } catch {
      // Not remembered: fine.
    }
  };

  useEffect(() => {
    const origin = window.location.origin;
    const deliver = () => {
      const target = tokenMaker.current?.contentWindow;
      if (!tokenMakerReady.current || !target) return;
      for (const text of waiting.current.splice(0)) target.postMessage({ type: FRAME_MESSAGE, text }, origin);
    };
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== origin) return;
      const data = e.data as { type?: unknown; text?: unknown } | null;
      if (data?.type === READY_MESSAGE && e.source === tokenMaker.current?.contentWindow) {
        tokenMakerReady.current = true;
        deliver();
      } else if (data?.type === SEND_FRAME_MESSAGE && typeof data.text === 'string' && e.source === frameStudio.current?.contentWindow) {
        waiting.current.push(data.text);
        show('token-maker');
        deliver();
      }
    };
    // Token Maker's theme also colours this bar.
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_KEY) document.documentElement.setAttribute('data-theme', e.newValue === 'light' ? 'light' : 'dark');
    };
    window.addEventListener('message', onMessage);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('message', onMessage);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return (
    <div className="studio">
      <header className="studio__bar">
        <img className="studio__logo" src="/favicon.svg" alt="" width={24} height={24} />
        <nav className="studio__apps" aria-label="Apps">
          {APPS.map((a) => (
            <button key={a.id} type="button" className="studio__app" aria-pressed={app === a.id} onClick={() => show(a.id)}>
              {a.title}
            </button>
          ))}
        </nav>
      </header>
      <main className="studio__frames">
        {APPS.map(
          (a) =>
            loaded.has(a.id) && (
              <iframe
                key={a.id}
                ref={a.id === 'token-maker' ? tokenMaker : frameStudio}
                className="studio__frame"
                title={a.title}
                src={a.src}
                data-active={app === a.id}
                // The hidden app can't be reached with the keyboard or a screen reader.
                inert={app !== a.id}
              />
            ),
        )}
      </main>
    </div>
  );
}
