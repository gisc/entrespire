/* =========================================================
   发小明 · 课程兑换码门禁（一次有效 + 有效小时数）
   用法：<script>window.FXM_LOCK={scope:'adult'|'camp'}</script>
        <script src="adult-lock.js"></script>   ← 放在 </body> 前
   规则：创新版 A01、特训营第 1 天免费；其余需要兑换码
   退出：右上角 × / Esc / 点遮罩 / 返回课程目录，都能走
   ========================================================= */
(function(){
'use strict';
var S=window.FXM_LOCK||{}; var scope=S.scope||'';
if(scope!=='adult'&&scope!=='camp') return;

var q=new URLSearchParams(location.search);
var free=false;
if(scope==='adult') free=((q.get('l')||'A01').toUpperCase()==='A01');
else free=((q.get('d')||'1')==='1');
if(free) return;

var CATALOG='adult-index.html';
var FREE_HREF=(scope==='adult'?'adult-lesson.html?l=A01':'day.html?d=1');
var SCOPE_NAME=(scope==='adult'?'创新专业版':'假期 5 天特训营');
var KEY='fxm_pass_'+scope;
function load(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){return null}}
function save(v){try{localStorage.setItem(KEY,JSON.stringify(v))}catch(e){}}

var css=document.createElement('style');
css.textContent=''+
'#fxmLock{position:fixed;left:0;top:0;width:100vw;max-width:100vw;height:100dvh;z-index:99999;box-sizing:border-box;overflow-x:hidden;display:flex;align-items:center;justify-content:center;'+
'padding:16px;padding-bottom:calc(16px + env(safe-area-inset-bottom));overflow-y:auto;-webkit-overflow-scrolling:touch;'+
'background:radial-gradient(900px 520px at 50% 0%,rgba(245,196,81,.10),transparent 60%),rgba(5,8,18,.97);'+
'backdrop-filter:blur(10px);font-family:"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif;color:#F7F2E6}'+
'#fxmLock .fk-card{box-sizing:border-box;position:relative;flex:0 1 auto;width:100%;max-width:420px;min-width:0;overflow-wrap:anywhere;max-height:calc(100dvh - 32px);overflow-y:auto;'+
'border:1px solid rgba(245,196,81,.30);border-radius:18px;padding:26px 24px 22px;'+
'background:linear-gradient(180deg,rgba(20,26,44,.97),rgba(10,14,28,.99));box-shadow:0 30px 80px -40px rgba(0,0,0,.9)}'+
'#fxmLock .fk-x{position:absolute;top:10px;right:10px;width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,255,255,.16);'+
'background:rgba(255,255,255,.05);color:#A3ABC2;font-size:20px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center}'+
'#fxmLock .fk-x:active{background:rgba(255,255,255,.12)}'+
'#fxmLock .fk-k{font-size:10px;letter-spacing:.28em;color:#F5C451;padding-right:34px}'+
'#fxmLock h2{font-size:21px;margin:10px 0 8px;font-weight:700;letter-spacing:.02em;padding-right:34px}'+
'#fxmLock p{font-size:12.5px;line-height:1.85;color:#A3ABC2;margin:0 0 14px}'+
'#fxmLock p b{color:#FFE3A6;font-weight:600}'+
'#fxmLock input{width:100%;padding:13px 14px;border-radius:11px;border:1px solid rgba(255,255,255,.16);'+
'background:rgba(255,255,255,.04);color:#F7F2E6;font-size:17px;letter-spacing:.16em;text-align:center;'+
'font-family:ui-monospace,Menlo,Consolas,monospace;text-transform:uppercase}'+
'#fxmLock input:focus{outline:none;border-color:rgba(79,224,208,.65);background:rgba(79,224,208,.05)}'+
'#fxmLock input::placeholder{letter-spacing:.1em;color:rgba(163,171,194,.5);font-size:14px}'+
'#fxmLock .fk-go{width:100%;margin-top:12px;padding:13px 18px;border:none;border-radius:11px;cursor:pointer;'+
'background:linear-gradient(135deg,#F5C451,#e8a93a);color:#1a1405;font-size:15px;font-weight:700;font-family:inherit}'+
'#fxmLock .fk-go:disabled{opacity:.55;cursor:wait}'+
'#fxmLock .fk-err{min-height:18px;margin-top:8px;font-size:12.5px;color:#FF9A8A}'+
'#fxmLock .fk-links{display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;margin-top:10px;font-size:12.5px}'+
'#fxmLock .fk-links a{color:#9FD0FF;text-decoration:none;border-bottom:1px solid rgba(159,208,255,.35);padding-bottom:1px}'+
'#fxmLock .fk-links a:active{opacity:.6}'+
'#fxmLock .fk-help{margin-top:14px;padding:10px 12px;border-radius:10px;background:rgba(245,196,81,.06);'+
'border:1px solid rgba(245,196,81,.18);font-size:11.5px;line-height:1.8;color:#A3ABC2}'+
'#fxmLock .fk-help b{color:#F5C451}'+
'@media (max-width:520px){#fxmLock .fk-card{padding:22px 18px 18px}#fxmLock h2{font-size:19px}}';
document.head.appendChild(css);

var el=document.createElement('div');
el.id='fxmLock';
el.innerHTML='<div class="fk-card">'+
  '<button class="fk-x" id="fkClose" aria-label="关闭并返回课程目录" title="关闭">×</button>'+
  '<div class="fk-k">ACCESS CODE · 课程兑换码</div>'+
  '<h2>输入兑换码，进入这节课</h2>'+
  '<p>'+SCOPE_NAME+'：除第一节外，每节课凭兑换码进入。<b>一节一码，兑换成功后开始计时</b>，到期再来需要新的码。</p>'+
  '<input id="fkCode" maxlength="14" placeholder="ABCD-EFGH-JKLM" autocomplete="off" spellcheck="false" autocapitalize="characters" inputmode="text">'+
  '<div class="fk-err" id="fkErr"></div>'+
  '<button class="fk-go" id="fkGo">解锁这节</button>'+
  '<div class="fk-links">'+
    '<a href="'+CATALOG+'">← 返回课程目录</a>'+
    '<a href="'+FREE_HREF+'">先看第一节（免费）</a>'+
  '</div>'+
  '<div class="fk-help">没有兑换码？向 <b>发小明的老师</b> 索取，说明要上哪门课、哪一节即可。'+
  (scope==='adult'?'<br><b>注意：</b>这里要的是课程兑换码，不是「用邀请码加入班级」的那个邀请码。':'')+'</div>'+
'</div>';
window.__FXM_LOCK_READY=true;
document.documentElement.appendChild(el);

var input=document.getElementById('fkCode'), btn=document.getElementById('fkGo'),
    errEl=document.getElementById('fkErr'), closeBtn=document.getElementById('fkClose');
function err(m){ errEl.textContent=m||''; }
function hide(){ el.style.display='none'; document.documentElement.classList.remove('fkx-lock'); }
function exitToCatalog(){ location.href=CATALOG; }

/* 退出：× / Esc / 点遮罩空白处 —— 三条路都能走 */
closeBtn.onclick=exitToCatalog;
el.addEventListener('click',function(e){ if(e.target===el) exitToCatalog(); });
document.addEventListener('keydown',function(e){ if(e.key==='Escape'){ e.preventDefault(); exitToCatalog(); } });

/* 输入即格式化：大写、只留字母数字、每 4 位加连字符 */
input.addEventListener('input',function(){
  var v=(input.value||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,12);
  input.value=v.replace(/(.{4})/g,'$1-').replace(/-$/,'');
});

async function verify(tok){
  try{
    var r=await fetch('/api/codes/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:tok,scope:scope})});
    var d=await r.json().catch(function(){return {}});
    if(r.ok&&d.ok) return d;
  }catch(e){}
  return null;
}

/* 登录用户（员工 / 测试账号）优先走账号授权，不需要兑换码 */
var AC_LEFT=null, AC_TIMER=null;
function courseKey(){ return scope==='adult'?'adult':'camp'; }
async function checkAccountAccess(){
  var tk=null; try{ tk=localStorage.getItem('iv3_token'); }catch(e){}
  if(!tk) return null;
  try{
    var r=await fetch('/api/entitlement/access',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+tk},body:JSON.stringify({course:courseKey()})});
    if(!r.ok) return null;
    var d=await r.json();
    if(d&&d.ok) return d;
  }catch(e){}
  return null;
}
function startTick(){
  if(AC_TIMER) return;
  AC_TIMER=setInterval(async function(){
    var tk=null; try{ tk=localStorage.getItem('iv3_token'); }catch(e){}
    if(!tk) return;
    try{
      var r=await fetch('/api/entitlement/tick',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+tk},body:JSON.stringify({course:courseKey(),seconds:60})});
      var d=await r.json().catch(function(){return {}});
      if(r.ok&&d&&d.ok&&typeof d.minutesLeft==='number'){
        AC_LEFT=d.minutesLeft;
        if(AC_LEFT<=0){ clearInterval(AC_TIMER); AC_TIMER=null; el.style.display=''; err('体验时长已用完，请联系销售总监续时'); }
      }
    }catch(e){}
  },60000);
}
checkAccountAccess().then(function(d){
  if(d&&d.allowed){
    hide(); if(!d.unlimited) startTick();
    return;
  }
  if(d&&d.allowed===false&&d.role==='test'){
    err(d.reason||'这节课的体验时长已用完，请联系销售总监续时');
  }
});

var cur=load();
if(cur&&cur.token&&cur.exp>Date.now()){
  verify(cur.token).then(function(d){
    if(d){ hide(); return; }
    if(cur.exp>Date.now()){ hide(); return; } /* 离线时按本地有效期放行 */
    save(null); err('访问已到期，请重新输入兑换码');
  });
}

async function redeem(){
  var code=(input.value||'').trim().toUpperCase();
  if(!/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code)){ err('请输入完整的 12 位兑换码，例如 ABCD-EFGH-JKLM'); input.focus(); return; }
  err(''); btn.disabled=true; btn.textContent='验证中…';
  try{
    var r=await fetch('/api/codes/redeem',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code:code,scope:scope})});
    var d=await r.json().catch(function(){return {}});
    if(!r.ok||!d.ok) throw new Error(d.error||'兑换失败，请稍后再试');
    save({token:d.token,exp:d.exp});
    hide();
  }catch(ex){
    err(ex.message||'网络异常，请稍后再试');
  }finally{
    btn.disabled=false; btn.textContent='解锁这节';
  }
}
btn.onclick=redeem;
input.addEventListener('keydown',function(e){ if(e.key==='Enter'){ e.preventDefault(); redeem(); } });
setTimeout(function(){ try{ input.focus(); }catch(e){} },300);
})();
