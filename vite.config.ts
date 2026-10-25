/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { devApi } from './server/devApi.ts';

/** In `npm run dev` and `npm run preview`, Token Maker's own pages (/token-maker/about…) get Token Maker's page. */
function tokenMakerPages(): Plugin {
  const rewrite = (req: { url?: string }, _res: unknown, next: () => void) => {
    const path = req.url?.split('?')[0] ?? '';
    if (/^\/token-maker\/[^.]+$/.test(path)) req.url = '/token-maker/index.html';
    next();
  };
  return {
    name: 'token-maker-pages',
    configureServer: (server) => void server.middlewares.use(rewrite),
    configurePreviewServer: (server) => void server.middlewares.use(rewrite),
  };
}

export default defineConfig({
  plugins: [react(), devApi(), tokenMakerPages()],
  build: {
    rollupOptions: {
      // Token Studio's page, and the two apps it shows.
      input: { main: 'index.html', tokenMaker: 'token-maker/index.html', frameStudio: 'frame-studio/index.html' },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    css: false,
    // Each app keeps its own test set-up.
    projects: [
      {
        extends: true,
        test: { name: 'token-maker', include: ['src/token-maker/**/*.test.{ts,tsx}', 'server/**/*.test.ts'], setupFiles: ['./src/token-maker/test/setup.ts'] },
      },
      {
        extends: true,
        test: { name: 'frame-studio', include: ['src/frame-studio/**/*.test.{ts,tsx}'], setupFiles: ['./src/frame-studio/test/setup.ts'] },
      },
      {
        extends: true,
        test: { name: 'shell', include: ['src/shell/**/*.test.{ts,tsx}'], setupFiles: ['./src/token-maker/test/setup.ts'] },
      },
    ],
  },
});
