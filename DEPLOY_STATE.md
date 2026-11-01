# Deploy state (2026-11-01 12:00 SGT)
- Build: /tmp/site (flat, 347+ files, sim-shim.js + seeds.js + i18n.js/i18n-dict.js 396 entries). Serve locally: python3 -m http.server PORT in /tmp/site; page names flattened (course-index.html, icc-index.html...).
- Repo target: gisc/entrespire (public), GitHub Pages from branch root.
- Auth: device-flow challenge 9788-1A82 minted 11:58 SGT, public_repo only, expires ~12:13; device_code in /tmp/device.json. If expired, ASK MAIN before reminting. Token endpoint poll: client_id=178c6fc778ccc68e1d6a.
- After token: git init in /tmp/site, remote https://x-access-token:TOKEN@github.com/gisc/entrespire.git, push main, enable Pages (repo settings API or web UI), verify live URL mobile viewport.
- Fallback: signed-in github.com web UI in cloud browser lease L-m2423kybf7f54t3g64jxegbjya (expires 15:38 SGT) - impractical for 347 files.
- Missing assets: ~60 refs (assets/cases/*, snd/*, some mp4/jpg/svg) 404 at source; labelled placeholder.svg tile in place. Try recovering via live lease.
- i18n gaps: per-char hero logogram 世界创新港 untranslated (by design); JS-property-set input values (ICC samples 钥匙救星 etc.) need a property setter hook in i18n.js; deep lesson bodies (adult-data-*.js, course lessons) still Chinese.
