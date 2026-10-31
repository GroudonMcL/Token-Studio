# Before going public

What to do before Token Studio goes public, from a review on 27 October 2026. When this review ran, `npm run typecheck`, `npm run lint`, `npm test` (1,920 tests) and `npm run build` all passed. The end-to-end tests (`npm run e2e`) were not run.

## 1. Art, credits and licences

- [ ] Replace the AI-made art: see [`AI-ART-REPLACEMENT.md`](AI-ART-REPLACEMENT.md) and the replacement pack.
- [ ] Afterwards, run `npm run tm:help-images` to redraw the help pictures. Also update the tests that compare pictures pixel for pixel (`libraryFiles.test.ts`, the frame and preset tests…).
- [ ] Bring `ASSETS-CREDITS.md` up to date:
  - Remove the rows for art you replaced and add your own ("by GroudonMcL").
  - Fix the code paths: they still say `src/render/…` and `src/frameStudio/…`, but the code is now under `src/token-maker/…`.
  - It says "20 photo textures", but Frame Studio's credits list 32.
  - The "27 code-drawn frames" row says "Owner's own code". If the AI wrote that code, say so, or drop the row once the frames are replaced.
- [ ] Keep the **game-icons.net** credits. They are CC BY 3.0, so credit is a legal requirement, unlike the CC0 art. Token Maker's About page and Frame Studio's welcome card both show them.
- [ ] `ASSETS-CREDITS.md` links to `github.com/GroudonMcL/Frame-Studio/blob/main/docs/CREDITS.md`. Make sure that repository is public, or link to this repository's `docs/frame-studio/CREDITS.md` instead.
- [ ] Choose a licence for the code. There is no `LICENSE` file, so the code is "all rights reserved" by default. That is fine if you mean it. If the repository is public and you want others to reuse the code, add an open licence (MIT, for example).
- [ ] Trademarks: "D&D" appears in the page descriptions. Mentioning it as a description ("for D&D and other tabletop RPGs") is normally fine. Don't use Wizards of the Coast's logos, and don't name the product after D&D.

## 2. Legal pages and contact

- [ ] Add a **contact address** to the About and Privacy pages (email, GitHub Issues or Discord). People will want to report bugs, ask privacy questions and send copyright takedown requests.
- [ ] Add short **Terms of use**:
  - People must have the right to use the pictures they upload or link to.
  - Tokens are for personal use.
  - The tool is provided as it is, with no warranty.
  - You will remove content if asked. Nothing is stored on the server, so this applies only to what the proxy fetches.
- [ ] Privacy page: it says the site is "hosted on Cloudflare Pages". The README now deploys as a Cloudflare **Worker**, so correct the wording if that's how you deploy.
- [ ] No cookies and no analytics means no cookie banner is needed under UK GDPR/PECR. Adding analytics or switching on adverts (`VITE_FEATURE_ADS`) changes that: you would need to update the Privacy page and probably add a consent banner.
- [ ] Web imports: the image proxy fetches pictures from other sites, including Pinterest (`server/pinterest.ts`). Pinterest's terms forbid scraping. Weigh that risk, and consider removing the Pinterest-specific code or keeping it to single pin links.

## 3. Security and abuse

- [ ] Add a Cloudflare **rate-limiting rule** on `/api/*` (Security → WAF). The limiter in the code (90 picture requests and 20 page requests a minute per IP) only counts within one Cloudflare server. Its own comment and the design document both say to add a dashboard rule on top.
- [ ] Set up **usage alerts or a spending cap** on the Cloudflare account. The free Workers plan allows 100,000 requests a day.
- [ ] Consider making `/api/*` answer only requests from your own site (check the `Origin`/`Referer` header), so nobody else can use it as a free image proxy.
- [ ] The proxy already blocks fetches to private addresses, size-limits responses and checks file types (`server/safeFetch.ts`, `ipRanges.ts`, `sniff.ts`). Leave that as it is.
- [ ] Add a full **Content-Security-Policy** and **HSTS** to `public/_headers`. At the moment there is only `frame-ancestors`. The policy has to allow:
  - Hugging Face (for the model)
  - jsDelivr (for the ONNX runtime)
  - `blob:` workers
  - `'wasm-unsafe-eval'`
  
  Test the AI cut-out with the policy on before going live.
- [ ] `npm audit`: 4 high-severity advisories, all in `@huggingface/transformers`' Node-only dependencies (`sharp`, `onnxruntime-node`, `adm-zip`). None of them reach the browser bundle. Moving from 4.2.0 (pinned) to 4.3.1 clears them. Re-test the AI cut-out after the upgrade.

## 4. Performance

- [ ] `pictureData` (Frame Studio's 32 photo textures, embedded as text) builds as a **2.2 MB chunk (1.66 MB gzipped), twice**: once per app. It only loads when a design uses a photo texture, so it doesn't slow the first load. But someone using both apps downloads it twice. Moving the photos into `public/` as separate files would fix that, and each design would then fetch only the photos it uses.
- [ ] Check the first load on a real phone over mobile data (Lighthouse or WebPageTest).
- [ ] The AI model (about 100 MB) downloads only when someone uses AI cut-out, and the page warns about it. Leave it as it is.

## 5. Deploying

- [ ] Choose a **name and a domain**, then add the domain in Cloudflare (Workers → Settings → Domains & Routes).
- [ ] Merge to `main` and check:
  - `https://<domain>/api/health` shows `{"ok":true}`
  - `/`, `/token-maker/`, `/token-maker/about`, `/token-maker/privacy` and `/frame-studio/` all open
  - a web import works on the live site
- [ ] `docs/token-maker/PROGRESS.md` mentions an owner checklist in "README §6". That section is no longer in the README, so restore it or point PROGRESS.md at this file.
- [ ] Add social-share tags (`og:title`, `og:description`, `og:image`), an `apple-touch-icon` PNG and maybe a web manifest. At the moment the favicon is the only icon.
- [ ] Decide how you'll hear about errors. Cloudflare's Workers logs cover the proxy. Browser errors are invisible unless you add something, and that something must go on the Privacy page.

## 6. Testing on real devices

- [ ] Run `npm run e2e` (desktop, tablet and phone).
- [ ] Check by hand on iPhone Safari, Android Chrome, Firefox and desktop Safari. The Playwright tests run only in Chromium. Watch especially:
  - AI cut-out memory use on iPhone
  - copying to the clipboard
  - downloading ZIPs
  - IndexedDB storage in private windows
- [ ] Do a full pass as a new visitor: open the site, try a sample, upload a picture, style it, export it, reload (autosave), then send a frame from Frame Studio to Token Maker.
- [ ] Ask a few people from your group or community to try it before announcing it.

## 7. Launch and after

- [ ] Write a short changelog or version number, so people can report which version they're using.
- [ ] Set up a place for feedback (GitHub Issues, Discord or a subreddit post).
- [ ] Back up the repository, and turn on branch protection for `main` so a bad push doesn't deploy straight away.
