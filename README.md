# Entrespire — Genesis Innovation Academy (client-side simulation)

A static, client-side simulation of https://genesis.faxiaoming.site/ ("Faxiaoming Genesis Innovation Academy · Invention King Challenge"), captured on 2026-11-01 and rebuilt to run entirely in the browser on GitHub Pages.

**This is an English demo adaptation of a Chinese original.** UI text is translated to English by a client-side overlay (i18n.js + i18n-dict.js); some deep lesson content may still appear in Chinese.

## What works offline
- All 24 pages of the original site (home, academy map, course portal + lesson player + chapter studio, ICC mock judging, future observatory, adult track, teacher/ops/admin consoles, bounty, camp, terms).
- Registration / login / creator coins: the site's own built-in local mode (localStorage). Accounts and progress stay in your browser only.
- Leaderboard, gallery, real problems and bounties show a snapshot of the live content captured on 2026-11-01 (seeds.js).
- Share-card QR codes are generated locally.

## Demo boundaries (by design)
- AI chat / AI judging / image generation / voice (TTS/ASR): canned or disabled, clearly marked as demo.
- Payments / top-ups / redemption: disabled; no real transaction is ever created (pay/config returns disabled).
- Uploads and camp sign-ups are accepted as demo only — nothing leaves the browser.
- Teacher / ops / admin backends answer "demo" responses; no source-site account actions are possible.

## Structure
Everything is flat (GitHub Pages web-upload friendly). `sim-shim.js` intercepts `/api/*` calls; `seeds.js` holds the content snapshot; `i18n.js`/`i18n-dict.js` provide the English overlay; `api-imgcache-*` are bundled copies of the site's generated images.
