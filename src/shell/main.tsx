import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/grenze/600.css';
import '@fontsource/atkinson-hyperlegible/400.css';
import '@fontsource/atkinson-hyperlegible/700.css';
import '../token-maker/styles/tokens.css';
import './palettes.css';
import './shell.css';
import { Shell } from './Shell';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Shell />
  </StrictMode>,
);
