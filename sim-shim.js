/* ============================================================
 * 发小明 Genesis · GitHub Pages 静态镜像 — 本地演示 shim
 * 本文件把原站 /api/* 后端接口替换为本机演示实现:
 *  - 内容接口返回镜像时抓取的快照数据 (seeds.js)
 *  - 登录/注册/创作币走页面自带的 localStorage 本地模式
 *  - AI / 支付 / 上传等服务器功能以"演示"方式应答,不产生真实效果
 *  - /api/imgcache/* 图片重写到仓库内打包的副本
 * ============================================================ */
(function () {
  'use strict';
  var scriptSrc = (document.currentScript && document.currentScript.src) || location.href;
  var BASE = scriptSrc.slice(0, scriptSrc.lastIndexOf('/') + 1); // e.g. https://user.github.io/entrespire/
  window.SIM = { base: BASE, demo: true };
  window.SIM_URL = function (p) {
    if (!p) return BASE;
    if (/^https?:\/\//i.test(p)) return p;
    return BASE + String(p).replace(/^\/+/, '');
  };

  var SEEDS = window.SIM_SEEDS || {};
  function json(data, status) {
    return new Response(JSON.stringify(data == null ? {} : data), {
      status: status || 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }
  function demoToast(msg) {
    try {
      var t = document.createElement('div');
      t.textContent = msg;
      t.style.cssText = 'position:fixed;left:50%;bottom:84px;transform:translateX(-50%);z-index:99999;background:rgba(20,24,40,.92);color:#fff;padding:10px 16px;border-radius:12px;font-size:13px;max-width:86vw;text-align:center;box-shadow:0 6px 24px rgba(0,0,0,.35);pointer-events:none';
      document.body.appendChild(t);
      setTimeout(function () { t.style.opacity = '0'; t.style.transition = 'opacity .4s'; }, 2200);
      setTimeout(function () { t.remove(); }, 2700);
    } catch (e) {}
  }

  /* ---------- QR (原为 /api/qr 服务端生成) ---------- */
  function qrDataUrl(text, cb) {
    try {
      if (typeof QRCode === 'undefined') return cb(null);
      var box = document.createElement('div');
      box.style.cssText = 'position:fixed;left:-9999px;top:-9999px';
      document.body.appendChild(box);
      new QRCode(box, { text: text, width: 220, height: 220, correctLevel: QRCode.CorrectLevel.M });
      setTimeout(function () {
        var cv = box.querySelector('canvas');
        var url = cv ? cv.toDataURL('image/png') : (box.querySelector('img') || {}).src || null;
        box.remove();
        cb(url);
      }, 60);
    } catch (e) { cb(null); }
  }

  /* ---------- fetch 拦截 ---------- */
  var origFetch = window.fetch.bind(window);
  window.fetch = function (input, opts) {
    var rawUrl = typeof input === 'string' ? input : (input && input.url) || '';
    var u;
    try { u = new URL(rawUrl, location.href); } catch (e) { return origFetch(input, opts); }
    var idx = u.pathname.indexOf('/api/');
    var isApiRoot = /\/api$/.test(u.pathname);
    if (idx === -1 && !isApiRoot) return origFetch(input, opts);
    var path = idx >= 0 ? u.pathname.slice(idx) : '/api';
    var method = ((opts && opts.method) || (input && input.method) || 'GET').toUpperCase();

    /* 图片缓存 → 仓库内打包副本 */
    if (path.indexOf('/api/imgcache/') === 0) {
      return origFetch(SIM_URL('/'+'api-imgcache-'+path.split('/').pop()), opts);
    }
    /* QR 码 → 本地生成 */
    if (path === '/api/qr') {
      var text = u.searchParams.get('text') || location.href;
      return new Promise(function (res) {
        qrDataUrl(text, function (url) {
          if (url) res(origFetch(url)); else res(json({ ok: false, error: 'demo' }, 404));
        });
      });
    }

    switch (true) {
      /* 强制页面进入自带本地模式 */
      case path === '/api/health':
        return Promise.resolve(json({ ok: false, error: 'static-mirror' }, 404));
      /* 内容快照 */
      case path === '/api/stats': return Promise.resolve(json(SEEDS.stats));
      case path === '/api/settings': return Promise.resolve(json(SEEDS.settings));
      case path === '/api/gallery': return Promise.resolve(json(SEEDS.gallery));
      case path === '/api/leaderboard': return Promise.resolve(json(SEEDS.leaderboard));
      case path === '/api/future/overview': return Promise.resolve(json(SEEDS.future_overview));
      case path === '/api/future/signals': return Promise.resolve(json(SEEDS.future_signals));
      case path === '/api/access/config': return Promise.resolve(json(SEEDS.access_config));
      case path === '/api/problems' && method === 'GET': return Promise.resolve(json(SEEDS.problems));
      case path === '/api/bounties' && method === 'GET': return Promise.resolve(json(SEEDS.bounties));
      case /^\/api\/bounties\/[^/]+$/.test(path) && method === 'GET': {
        var id = decodeURIComponent(path.split('/').pop());
        var list = (SEEDS.bounties && SEEDS.bounties.bounties) || [];
        var b = list.find(function (x) { return x.id === id; }) || list[0];
        return b ? Promise.resolve(json({ ok: true, bounty: b })) : Promise.resolve(json({ ok: false, error: 'not found' }, 404));
      }
      /* 课程通知/作业 → 空的演示数据 */
      case path === '/api/course/notice': return Promise.resolve(json({ ok: true, unread: 0, notices: [] }));
      case path === '/api/course/notice-read':
      case path === '/api/course/work': return Promise.resolve(json({ ok: true, demo: true }));
      /* 课程章节解锁:演示模式一律放行 */
      case path === '/api/access/verify': return Promise.resolve(json({ ok: true, demo: true, token: 'demo-access' }));
      case path === '/api/entitlement/access':
      case path === '/api/entitlement/tick': return Promise.resolve(json({ ok: true, demo: true }));
      case path === '/api/access/unlock':
        demoToast('Demo mode: chapter password check passed locally');
        return Promise.resolve(json({ ok: true, demo: true, token: 'demo-access' }));
      /* 会话:未登录态(页面自带本地登录) */
      case path === '/api/me': return Promise.resolve(json({ ok: false, error: 'demo: no server session' }, 401));
      case path === '/api/me/earn':
      case path === '/api/me/spend': return Promise.resolve(json({ ok: true, points: 3000, demo: true }));
      /* AI 对话 → 演示回复(明确标注) */
      case path === '/api/ai/chat':
        demoToast('Demo mode: AI replies are preset local text');
        return Promise.resolve(json({
          choices: [{ message: { role: 'assistant', content: '[Demo mode] This is a static GitHub Pages mirror - the AI service is not connected. On the live site, FaXiaoMing AI would brainstorm and refine ideas with you here. You can keep browsing the pages, the map and the lessons; all data stays in this browser.' } }]
        }));
      /* AI 评委/润色/语音/识图/生图 → 让页面走自带降级或明确报演示 */
      case path === '/api/fxm/turn': return Promise.resolve(json({ ok: false, error: 'demo' }, 404));
      /* 路演大师 → 本地演示数据(明确标注 demo) */
      case path === '/api/roadshow/mine':
        return Promise.resolve(json({
          works: [{ id: 'demo-work-1', product: 'Solar Schoolbag (demo invention)', hasImg: false, overall: 88 }],
          styles: [
            { id: 'story', name: 'Story Pitch', tag: 'Tell it as a story', rule: 'Problem, twist, reveal', pages: 8 },
            { id: 'investor', name: 'Investor Pitch', tag: 'Numbers first', rule: 'Market, product, ask', pages: 10 }
          ]
        }));
      case path === '/api/roadshow/list': return Promise.resolve(json([]));
      case /^\/api\/roadshow\/voice\//.test(path): return Promise.resolve(json({ ok: true, demo: true }));
      case path === '/api/roadshow/polish/custom': return Promise.resolve(json({ ok: false, error: 'Demo mode: AI polish is not connected' }, 503));
      case path === '/api/tts': return Promise.resolve(json({ ok: false, error: 'Demo mode: voice synthesis is not connected' }, 503));
      case path === '/api/asr': return Promise.resolve(json({ ok: false, error: 'Demo mode: speech recognition is not connected' }, 503));
      case path === '/api/gen-image': return Promise.resolve(json({ ok: false, error: 'Demo mode: AI image generation is not connected' }, 503));
      /* 上传 → 不落盘 */
      case path === '/api/upload':
      case path === '/api/roadshow/upload-asset':
        demoToast('Demo mode: files are not actually uploaded');
        return Promise.resolve(json({ ok: true, demo: true, url: SIM_URL('/assets/ava-faxiaoming.png'), path: SIM_URL('/assets/ava-faxiaoming.png') }));
      /* 支付/充值/兑换 → 明确演示,不产生任何真实交易 */
      case path === '/api/pay/config': return Promise.resolve(json({ enabled: false, demo: true, creditsPerYuan: 100, presets: [] }));
      case path.indexOf('/api/pay/order') === 0:
      case path === '/api/redeem':
        demoToast('Demo mode: no real payment or redemption is made');
        return Promise.resolve(json({ ok: false, error: 'Demo mode: static mirror, no real payments', demo: true }, 403));
      /* 训练营报名 */
      case path === '/api/camp/book':
        demoToast('Demo mode: signup was not submitted');
        return Promise.resolve(json({ ok: true, demo: true }));
      /* 登录/后台 → 演示拒绝 */
      case path === '/api/login':
      case path === '/api/pin/login':
      case path === '/api/register':
      case path === '/api/course-admin/login':
        return Promise.resolve(json({ ok: false, error: 'Demo mode: please use the in-page local register/login' }, 401));
      case path === '/api/report':
      case path.indexOf('/api/report?') === 0:
        return Promise.resolve(json({ ok: false, error: 'Demo mode: growth report needs the live server' }, 404));
      default:
        return Promise.resolve(json({ ok: false, error: 'Demo mode: this feature needs the live server. Everything here stays on your device.', demo: true }, 404));
    }
  };

  /* ---------- DOM 重写:图片/链接等不走 fetch 的资源 ---------- */
  function fixAttr(el, attr) {
    var v = el.getAttribute(attr);
    if (!v || typeof v !== 'string') return;
    if (v.indexOf('/api/qr?') === 0) {
      var text = null;
      try { text = new URL(v, location.href).searchParams.get('text'); } catch (e) {}
      qrDataUrl(text || location.href, function (url) { if (url) el.setAttribute(attr, url); });
      return;
    }
    if (v.indexOf('/api/imgcache/') === 0) { el.setAttribute(attr, SIM_URL('/'+'api-imgcache-'+v.split('/').pop())); return; }
    if (v.charAt(0) === '/' && v.charAt(1) !== '/') {
      el.setAttribute(attr, SIM_URL(v));
    }
  }
  function sweep(root) {
    var nodes = root.querySelectorAll ? root.querySelectorAll('[src^="/"],[href^="/"]') : [];
    nodes.forEach(function (el) {
      if (el.hasAttribute('src')) fixAttr(el, 'src');
      if (el.hasAttribute('href')) fixAttr(el, 'href');
    });
  }
  var observer = new MutationObserver(function (muts) {
    muts.forEach(function (m) {
      if (m.type === 'attributes') { fixAttr(m.target, m.attributeName); }
      else {
        m.addedNodes.forEach(function (n) {
          if (n.nodeType !== 1) return;
          if (n.hasAttribute && n.hasAttribute('src')) fixAttr(n, 'src');
          if (n.hasAttribute && n.hasAttribute('href')) fixAttr(n, 'href');
          sweep(n);
        });
      }
    });
  });
  function start() {
    sweep(document.documentElement);
    observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'href'] });
    /* 演示角标 */
    var badge = document.createElement('div');
    badge.innerHTML = '<span style="opacity:.85">Local demo · GitHub Pages mirror · Data stays on this device · AI/payments are simulated</span>';
    badge.style.cssText = 'position:fixed;left:10px;bottom:10px;z-index:99998;background:rgba(12,16,30,.72);color:#dfe6ff;padding:6px 11px;border-radius:999px;font-size:11px;font-family:-apple-system,"Noto Sans SC",sans-serif;backdrop-filter:blur(6px);pointer-events:none;letter-spacing:.3px';
    document.body.appendChild(badge);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.addEventListener('error',function(e){var t=e.target;if(t&&t.tagName==='IMG'&&/api-imgcache-/.test(t.src||'')&&!t.__fb){t.__fb=1;t.src=SIM_URL('/placeholder.svg');}},true);
  console.log('%cGenesis static mirror · local demo mode', 'color:#7c9bff;font-weight:bold');
})();
