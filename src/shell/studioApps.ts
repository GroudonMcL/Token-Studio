// The two apps of Token Studio, and the message an app sends the page to
// switch to the other one (the switch sits in each app's own top bar).

export type AppId = 'token-maker' | 'frame-studio';

export const APPS: { id: AppId; title: string; src: string }[] = [
  { id: 'token-maker', title: 'Token Maker', src: '/token-maker/' },
  { id: 'frame-studio', title: 'Frame Studio', src: '/frame-studio/' },
];

/** Sent by an app to the page: show this app. */
export const SHOW_APP_MESSAGE = 'token-studio:show-app';

/** True when the app is open inside Token Studio's page. */
export const inTokenStudio = (): boolean => typeof window !== 'undefined' && window.parent !== window;

export function showApp(app: AppId): void {
  window.parent.postMessage({ type: SHOW_APP_MESSAGE, app }, window.location.origin);
}
