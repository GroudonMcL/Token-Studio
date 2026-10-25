# Token Studio

**Token Maker** and **Frame Studio** in one web app. Token Maker makes tokens for D&D and other tabletop RPGs; Frame Studio designs the frames that go round them. The two title buttons at the top of the page switch between the apps. Both stay open while you switch, so you lose nothing.

**Sending a frame from Frame Studio to Token Maker:** in Frame Studio, click **Export**. Inside Token Studio the menu starts on **Frame for Token Maker**. Click **Send to Token Maker**. Token Studio switches to Token Maker, which uses the design as the token's frame and keeps it in its list of Frame Studio designs (**Frame & shape → Frame type → Frame Studio**). Nothing is downloaded.

Everything runs in the browser, on the visitor's own device: no accounts, no analytics, no cookies.

## Running it

You need Node 22 or newer (`winget install OpenJS.NodeJS.LTS` on Windows).

```powershell
npm install
npx playwright install chromium   # only needed for the end-to-end tests
npm run dev
```

Open the address it prints (usually <http://localhost:5173>).

| Address | What it is |
|---|---|
| `/` | Token Studio: both apps, with the title buttons |
| `/token-maker/` | Token Maker on its own (also `/token-maker/about`, `/token-maker/privacy`, `/token-maker/kit`) |
| `/frame-studio/` | Frame Studio on its own |

## Checking it works

| Command | What it does |
|---|---|
| `npm test` | Unit tests for both apps (Vitest; one project per app, each with its own set-up). |
| `npm run e2e` | End-to-end tests (Playwright): `e2e/shell` tests Token Studio's page and sending a frame; `e2e/token-maker` and `e2e/frame-studio` are each app's own tests, on each app's page. Add `--project=shell` (or `tm-desktop`, `fs-desktop`…) to run only some. |
| `npm run typecheck` | Checks the TypeScript. |
| `npm run lint` | ESLint. |
| `npm run build` | Builds the site into `dist/`, with three pages: `index.html`, `token-maker/index.html` and `frame-studio/index.html`. |
| `npm run preview` | Serves the built `dist/` folder. |
| `npm run tm:…` / `npm run fs:…` | Each app's drawing and sheet scripts (`tm:help-images`, `tm:frame-sheet`, `fs:frame-sheet`, `fs:screenshots`…). They are described in each app's docs. |

## Deploying

Cloudflare now builds new sites as **Workers** (Pages is the older option). In the Cloudflare dashboard:

1. **Workers & Pages → Create application → Import a repository** (or **GitHub**), and pick `Token-Studio`.
2. **Project name:** `token-studio`. It must match `name` in `wrangler.jsonc`.
3. **Build command:** `npm run build`. **Deploy command:** `npx wrangler deploy` (the default). Leave the root directory empty.
4. **Save and Deploy**, then open `https://token-studio.<your-account>.workers.dev`. Check `/api/health` shows `{"ok":true}`.

Every push to `main` deploys again; other branches get a preview link. Node 22 comes from `.node-version`.

How it is set up: `wrangler.jsonc` serves `dist/` and runs `worker/index.ts` first for `/api/*` (Token Maker's image proxy for web imports) and `/token-maker/*` (so `/token-maker/about` gets Token Maker's page). `public/_headers` lets the site show its own pages in frames (`SAMEORIGIN`) and no other site can. Workers reads `_headers` and `_redirects` too.

A Cloudflare **Pages** project still works: build command `npm run build`, output folder `dist`. `functions/` runs the image proxy there and `public/_redirects` handles Token Maker's pages.

## How it fits together

```
index.html, src/shell/        Token Studio's page: the title buttons, and each app in its own frame.
                              Frames keep the apps' styles and keyboard shortcuts (Ctrl+Z…) apart.
token-maker/index.html        Token Maker's page   → src/token-maker/  (was token-maker/src)
frame-studio/index.html       Frame Studio's page  → src/frame-studio/ (was Frame-Studio/src)
server/, functions/, worker/  Token Maker's image proxy, unchanged
public/                       Token Maker's public files (Frame Studio only had the same favicon)
scripts/token-maker/, scripts/frame-studio/   Each app's scripts
e2e/shell, e2e/token-maker, e2e/frame-studio  End-to-end tests
docs/token-maker/, docs/frame-studio/         Each app's design documents and progress lists
```

Sending a frame: Frame Studio (`src/frame-studio/io/tokenStudio.ts`) posts the project file's text, with its preview, to Token Studio's page. The page switches to Token Maker and passes it on as soon as Token Maker says it is ready (`src/token-maker/editor/studioBridge.ts`). Token Maker then opens it exactly like a `.framestudio.json` file. Messages are only accepted from the same site.

### The shared code copies

Each app still has its own copy of some of the other's code, carried over unchanged:

- `src/frame-studio/engine/legacy/` is a copy of Token Maker's frame renderer (`src/token-maker/render/`).
- `src/token-maker/frameStudio/` is a copy of Frame Studio's project reader and renderer.

Each copy has a `SOURCE.json`, and a test fails if a copied file is edited. Frame Studio's old `engine:sync` and `share:export` scripts, which copied these files between the two separate repositories, are not included. To update a copy, copy the files over and update the hashes in its `SOURCE.json`.

## Documents

- Token Maker: [`docs/token-maker/DESIGN.md`](docs/token-maker/DESIGN.md), [`docs/token-maker/PROGRESS.md`](docs/token-maker/PROGRESS.md)
- Frame Studio: [`docs/frame-studio/DESIGN.md`](docs/frame-studio/DESIGN.md), [`docs/frame-studio/PROGRESS.md`](docs/frame-studio/PROGRESS.md)
- Asset credits: [`ASSETS-CREDITS.md`](ASSETS-CREDITS.md) (Token Maker) and [`docs/frame-studio/CREDITS.md`](docs/frame-studio/CREDITS.md) (Frame Studio)
