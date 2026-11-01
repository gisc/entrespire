/* 发小明 · 45 分钟课堂收束
   20 分钟原课件 → 10 分钟人脑静思 → 15 分钟人机共创
   由 chapter.js / lesson.js 在最后一幕调用 window.FXM45.show()。 */
(function(){
  'use strict';
  if (window.FXM45) return;
  var css = document.createElement('style');
  css.textContent = ''
    + '#fxm45{position:fixed;inset:0;z-index:99999;background:radial-gradient(900px 600px at 50% 12%,rgba(242,193,78,.13),transparent 60%),radial-gradient(700px 500px at 85% 88%,rgba(109,141,255,.10),transparent 60%),repeating-linear-gradient(135deg,rgba(255,255,255,.022) 0 1px,transparent 1px 22px),linear-gradient(160deg,#0b1220,#05070d 62%,#0b0a06);color:#f3ead8;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;overflow:auto;font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif}'
    + '#fxm45 .f45-close{position:absolute;top:18px;right:20px;width:42px;height:42px;border-radius:50%;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.04);color:#cfc7b6;font-size:22px;line-height:1;cursor:pointer;z-index:3}'
    + '#fxm45 .f45-close:hover{color:#fff;border-color:rgba(242,193,78,.65)}'
    + '#fxm45 .f45-inner{max-width:980px;width:100%;margin:auto}'
    + '#fxm45 .f45-kicker{font-size:11px;letter-spacing:.32em;color:#d9b45a;margin-bottom:16px}'
    + '#fxm45 .f45-title{font-family:"Songti SC","STSong",serif;font-size:clamp(24px,4.4vw,46px);font-weight:900;line-height:1.35;letter-spacing:.04em;margin:0 auto 18px;max-width:900px}'
    + '#fxm45 .f45-sub{font-size:13px;line-height:1.9;color:#9aa6bd;margin:0 auto 6px;max-width:720px}'
    + '#fxm45 .f45-clock{font-family:"Songti SC","STSong",serif;font-size:clamp(130px,24vw,260px);font-weight:900;line-height:1;letter-spacing:.02em;color:#f2c14e;text-shadow:0 0 60px rgba(242,193,78,.28),0 20px 70px rgba(0,0,0,.6);margin:10px 0 8px;font-variant-numeric:tabular-nums}'
    + '#fxm45 .f45-small{font-size:12px;letter-spacing:.16em;color:#6f7b93}'
    + '#fxm45 .f45-think{max-width:760px;margin:6px auto 0;border:1px solid rgba(242,193,78,.26);border-radius:16px;padding:14px 20px;background:rgba(10,16,28,.62);box-shadow:0 18px 50px rgba(0,0,0,.28)}'
    + '#fxm45 .f45-think-label{font-size:13px;letter-spacing:.2em;color:#d9b45a;margin-bottom:6px}'
    + '#fxm45 .f45-q{font-family:"Songti SC","STSong",serif;font-size:clamp(20px,2.4vw,30px);line-height:1.7;color:#f7e7c6;min-height:2.4em;transition:opacity .35s ease}'
    + '#fxm45 .f45-q.fade{opacity:0}'
    + '#fxm45 .f45-dots{display:flex;gap:6px;justify-content:center;margin-top:8px}'
    + '#fxm45 .f45-dots i{width:6px;height:6px;border-radius:50%;background:rgba(242,193,78,.25);transition:.2s}'
    + '#fxm45 .f45-dots i.on{background:#f2c14e;box-shadow:0 0 10px rgba(242,193,78,.6)}'
    + '#fxm45 .f45-add{position:absolute;left:20px;bottom:18px;border:1px solid rgba(242,193,78,.25);background:transparent;color:#8d7a50;border-radius:999px;padding:7px 12px;font-size:11px;cursor:pointer;letter-spacing:.08em}'
    + '#fxm45 .f45-add:hover{color:#f2c14e;border-color:rgba(242,193,78,.6)}'
    + '#fxm45 .f45-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:30px}'
    + '#fxm45 .f45-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:999px;padding:13px 26px;font-size:14px;font-weight:700;text-decoration:none;cursor:pointer;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.04);color:#f3ead8;transition:.2s}'
    + '#fxm45 .f45-btn:hover{transform:translateY(-1px);border-color:rgba(242,193,78,.7);color:#fff}'
    + '#fxm45 .f45-btn.pri{background:linear-gradient(120deg,#f2c14e,#ffd97a);border-color:#f2c14e;color:#1a1405}'
    + '#fxm45 .f45-btn.pri:hover{color:#1a1405;filter:brightness(1.04)}'
    + '#fxm45 .f45-co{display:none}'
    + '#fxm45.co .f45-quiet{display:none}'
    + '#fxm45.co .f45-co{display:block}'
    + '#fxm45.co .f45-close{display:none}'
    + '#fxm45.co .f45-add{display:none}'
    + '#fxm45 .f45-co .f45-title{color:#f7e7c6}'
    + '#fxm45 .f45-timer{display:inline-flex;align-items:baseline;gap:6px;border:1px solid rgba(242,193,78,.28);border-radius:999px;padding:7px 14px;color:#d9b45a;font-size:12px;letter-spacing:.12em;margin-top:8px}'
    + '#fxm45 .f45-timer b{font-size:18px;color:#f2c14e;font-variant-numeric:tabular-nums}'
    + '@media(max-width:720px){#fxm45{padding:18px}#fxm45 .f45-clock{font-size:clamp(96px,30vw,180px)}#fxm45 .f45-close{top:10px;right:10px}#fxm45 .f45-actions{gap:8px}#fxm45 .f45-btn{padding:11px 18px;font-size:13px}#fxm45 .f45-think{padding:11px 14px}#fxm45 .f45-think-label{font-size:11px}#fxm45 .f45-q{font-size:clamp(17px,4.6vw,22px)}}';
  document.head.appendChild(css);

  function show(){
    if (document.getElementById('fxm45')) return;
    var ov = document.createElement('div');
    ov.id = 'fxm45';
    ov.innerHTML = ''
      + '<button class="f45-close" type="button" aria-label="跳过静思">×</button>'
      + '<button class="f45-add" type="button" title="老师可给全班多 2 分钟">老师 +2 分钟</button>'
      + '<div class="f45-inner">'
      +   '<div class="f45-quiet">'
      +     '<div class="f45-kicker">HUMAN TIME · 人脑时间</div>'
      +     '<div class="f45-title">现在，停下 AI 与电脑的支持，<br>请拿出你的草稿纸与笔，<br>10 分钟自己思考，为人类的创意加分！</div>'
      +     '<div class="f45-clock" id="f45Clock">10:00</div>'
      +     '<div class="f45-think"><div class="f45-think-label">请用人脑思考：</div><div class="f45-q" id="f45Q">谁最受这个问题折磨？</div><div class="f45-dots" id="f45Dots"><i class="on"></i><i></i><i></i></div></div>'
      +     '<div class="f45-small" style="margin-top:12px">草稿纸 + 笔 · 不查资料 · 不问 AI</div>'
      +   '</div>'
      +   '<div class="f45-co">'
      +     '<div class="f45-kicker">HUMAN × AI · 共创时间</div>'
      +     '<div class="f45-title">现在，欢迎进入<br>人脑与智脑共创模式！</div>'
      +     '<div class="f45-sub">把你刚才在纸上想到的那一个点，带回灵感大厅或我的实验室。<br>不用一次做完，先完成一个小交付：一张证据卡 / 一次迭代 / 一句用户原话。</div>'
      +     '<div class="f45-timer">建议共创 <b id="f45CoClock">15:00</b></div>'
      +     '<div class="f45-small" style="margin-top:10px">前 5 分钟由 G 组先讲，其他组只提一个问题</div>'
      +     '<div class="f45-actions">'
      +       '<a class="f45-btn pri" href="index.html?scene=inspire">去灵感大厅</a>'
      +       '<a class="f45-btn" href="index.html?scene=mylab">去我的实验室</a>'
      +       '<a class="f45-btn" href="course-index.html">回课程目录</a>'
      +     '</div>'
      +   '</div>'
      + '</div>';
    document.body.appendChild(ov);
    var left = 600, coLeft = 900, timer = null, coTimer = null, done = false;
    var clock = ov.querySelector('#f45Clock');
    var coClock = ov.querySelector('#f45CoClock');
    var QS = ['谁最受这个问题折磨？','我现在最硬的证据是什么？','如果只能改一个地方，我改哪里？'];
    var qi = 0, qEl = ov.querySelector('#f45Q'), qDots = ov.querySelector('#f45Dots');
    var qTimer = setInterval(function(){
      if(done) return;
      qi = (qi + 1) % QS.length;
      if(qEl){ qEl.classList.add('fade'); }
      setTimeout(function(){ if(qEl){ qEl.textContent = QS[qi]; qEl.classList.remove('fade'); } if(qDots){ Array.prototype.forEach.call(qDots.children,function(d,i){ d.className = i===qi?'on':''; }); } }, 320);
    }, 7000);
    function fmt(n){ var m = Math.floor(n/60), s = n%60; return (m<10?'0':'')+m+':'+(s<10?'0':'')+s; }
    function paint(){ if(clock) clock.textContent = fmt(Math.max(0,left)); }
    function toCo(){
      if (done) return; done = true;
      clearInterval(timer); timer = null; if(qTimer) clearInterval(qTimer); qTimer = null;
      ov.classList.add('co');
      if (coTimer) clearInterval(coTimer);
      coTimer = setInterval(function(){
        coLeft--;
        if(coClock) coClock.textContent = fmt(Math.max(0,coLeft));
        if(coLeft <= 0){ clearInterval(coTimer); coTimer = null; if(coClock) coClock.textContent = '时间到'; }
      }, 1000);
    }
    timer = setInterval(function(){
      left--;
      paint();
      if(left <= 0) toCo();
    }, 1000);
    paint();
    ov.querySelector('.f45-close').onclick = toCo;
    var addBtn = ov.querySelector('.f45-add');
    if(addBtn) addBtn.onclick = function(){ if(done) return; left += 120; paint(); addBtn.textContent = '已加 2 分钟'; setTimeout(function(){ addBtn.textContent = '老师 +2 分钟'; }, 1600); };
    document.addEventListener('keydown', function esc(e){
      if(e.key === 'Escape' && document.getElementById('fxm45')){
        document.removeEventListener('keydown', esc); toCo();
      }
    });
  }
  window.FXM45 = {show: show};
})();
