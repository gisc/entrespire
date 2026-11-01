/* =========================================================
   发小明 · 世界创新港 · 章节访问门禁
   - 机构管理后台配置：密码、开放/截止日期、单次解锁时长
   - 服务端签发解锁 token；接口不可用时回退本机校验
   ========================================================= */
(function(){
'use strict';
const __gateStyle=document.createElement('style');
__gateStyle.textContent=''
 +'.gate-auth{margin:12px 0 4px;padding:12px 13px;border:1px solid rgba(242,193,78,.28);border-radius:13px;background:rgba(242,193,78,.055);text-align:left}'
 +'.gate-auth-title{font-size:12px;font-weight:700;color:#f2c14e;margin-bottom:7px}'
 +'.gate-auth-ok{font-size:12px;color:#c9d4ff;line-height:1.7}'
 +'.gate-auth-row{display:flex;gap:7px;margin-top:7px}'
 +'.gate-auth-row input{flex:1;min-width:0;border:1px solid rgba(255,255,255,.16);border-radius:8px;background:rgba(255,255,255,.05);color:#fff;padding:9px 10px;font-size:13px;outline:none}'
 +'.gate-auth-row input:focus{border-color:rgba(242,193,78,.65)}'
 +'.gate-auth-row button{border:1px solid rgba(242,193,78,.55);border-radius:8px;background:rgba(242,193,78,.14);color:#ffe3a6;font-size:12px;padding:9px 13px;cursor:pointer;font-family:inherit}'
 +'.gate-auth-row button:hover{background:rgba(242,193,78,.24)}'
 +'.gate-auth-link{display:inline-block;margin-top:8px;font-size:11px;color:#9fd0ff;text-decoration:underline}'
 +'.gate-auth-switch{border:0;background:transparent;color:#9fd0ff;font-size:11px;cursor:pointer;text-decoration:underline;padding:0}';
document.head.appendChild(__gateStyle);
const SOURCE=window.FXM_GATE;
if(!SOURCE) return;
const CFG=Object.assign({},SOURCE);
const CHAPTER=String(CFG.chapter||'01');
const SHOW_HINT=/[?&]hint=1(?:&|$)/.test(location.search);
const LOCAL_KEY='fxm_unlock_v2';
const SERVER_KEY='fxm_course_token_v1';
const $=(s,r)=>(r||document).querySelector(s);
const HASHES=(CFG.passwordHashes||[CFG.passwordHash]).filter(Boolean).map(h=>String(h).toLowerCase());
const fmt=ts=>{
  const d=new Date(ts); if(isNaN(d.getTime())) return '—';
  const p=n=>String(n).padStart(2,'0');
  return d.getFullYear()+'.'+p(d.getMonth()+1)+'.'+p(d.getDate())+' '+p(d.getHours())+':'+p(d.getMinutes());
};
const fmtDay=ts=>{
  const d=new Date(ts); if(isNaN(d.getTime())) return '—';
  const p=n=>String(n).padStart(2,'0');
  return d.getFullYear()+'.'+p(d.getMonth()+1)+'.'+p(d.getDate());
};
function openTs(){ return Date.parse(CFG.openAt||'2026-01-01T00:00:00+08:00'); }
function closeTs(){ return Date.parse(CFG.closeAt||'2099-12-31T23:59:59+08:00'); }
let localMap={},serverMap={};
try{ localMap=JSON.parse(localStorage.getItem(LOCAL_KEY)||'{}')||{}; }catch(e){ localMap={}; }
try{ serverMap=JSON.parse(localStorage.getItem(SERVER_KEY)||'{}')||{}; }catch(e){ serverMap={}; }
function saveLocal(){ try{ localStorage.setItem(LOCAL_KEY,JSON.stringify(localMap)); }catch(e){} }
function saveServer(){ try{ localStorage.setItem(SERVER_KEY,JSON.stringify(serverMap)); }catch(e){} }
let serverMode=false,serverChapter=null;

async function sha(s){
  if(!(window.crypto&&crypto.subtle)) throw new Error('当前环境不支持安全校验，请使用 HTTPS 打开');
  const buf=new TextEncoder().encode(s);
  const h=await crypto.subtle.digest('SHA-256',buf);
  return Array.from(new Uint8Array(h)).map(b=>b.toString(16).padStart(2,'0')).join('');
}
async function sigFor(exp){ return await sha(CHAPTER+':'+(CFG.passwordHash||'')+':'+exp); }
async function localTokenValid(t){
  if(!t||!t.exp||t.exp<=Date.now()) return false;
  try{ return (await sigFor(t.exp))===t.sig; }catch(e){ return false; }
}
function currentExp(){
  if(serverMode && serverMap[CHAPTER]) return serverMap[CHAPTER].exp||0;
  return (localMap[CHAPTER]&&localMap[CHAPTER].exp)||0;
}

/* ---------- 注入界面 ---------- */
const gate=document.createElement('div');
gate.className='gate';
gate.id='fxmGate';
gate.innerHTML=
  '<div class="gate-bg"></div>'+
  '<div class="gate-card" role="dialog" aria-modal="true" aria-labelledby="gateTitle">'+
    '<div class="gate-top"><div class="gate-brand">GENESIS · 世界创新港</div><div class="gate-lock">🔒</div></div>'+
    '<div class="gate-kicker">ENCRYPTED CHAPTER · 限时访问</div>'+
    '<h2 id="gateTitle">第 '+CHAPTER+' 章</h2>'+
    '<p class="gate-title">'+esc(CFG.title||'')+'</p>'+
    '<div class="gate-inst" id="gateInst"></div>'+
    '<div class="gate-window"><span>本章开放时间</span><b id="gateWindow">'+fmt(openTs())+' — '+fmt(closeTs())+'</b></div>'+
    '<div class="gate-status" id="gateStatus"></div>'+
    '<div class="gate-auth" id="gateAuth"></div>'+
    '<label class="gate-label" for="gateInput">本章访问密码</label>'+
    '<div class="gate-row"><input id="gateInput" type="password" autocomplete="off" placeholder="请输入机构提供的访问密码" aria-label="本章访问密码"><button class="gate-eye" id="gateEye" type="button">显示</button></div>'+
    '<button class="gate-enter" id="gateEnter" type="button">进入本章</button>'+
    '<div class="gate-error" id="gateError"></div>'+
    '<div class="gate-hint" id="gateHintRow">内测密码：<b id="gateHint">'+(CFG.hint||'🙆🏻‍♀️')+'</b> · 点击填入</div>'+
    '<div class="gate-foot"><span id="gateLease">本次解锁有效期 '+(CFG.leaseHours||4)+' 小时 · 到期自动重新锁定</span><a href="course-index.html">返回课程目录</a></div>'+
  '</div>';
document.body.appendChild(gate);

function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
const input=$('#gateInput'),enter=$('#gateEnter'),err=$('#gateError'),status=$('#gateStatus'),eye=$('#gateEye');

function authToken(){ try{ return localStorage.getItem('iv3_token')||''; }catch(e){ return ''; } }
function renderAuth(){
  const box=$('#gateAuth'); if(!box) return;
  const tk=authToken();
  if(tk){
    box.innerHTML='<div class="gate-auth-title">学生账号 · 已登录</div>'+
      '<div class="gate-auth-ok">将按当前账号扣创作币（每打开一章 3500）。<br><button class="gate-auth-switch" type="button" id="gateSwitch">切换账号</button></div>';
    const sw=$('#gateSwitch'); if(sw) sw.onclick=function(){ try{ localStorage.removeItem('iv3_token'); }catch(e){} renderAuth(); status.textContent='请先登录学生账号，再输入本章密码'; status.className='gate-status warn'; };
  }else{
    box.innerHTML='<div class="gate-auth-title">先登录学生账号</div>'+
      '<div class="gate-auth-row"><input id="gateNick" placeholder="昵称" autocomplete="username"><input id="gatePwd" type="password" placeholder="密码" autocomplete="current-password"></div>'+
      '<div class="gate-auth-row"><button type="button" id="gateLoginBtn">登录</button><a class="gate-auth-link" href="index.html" target="_blank" rel="noopener">去主站注册/登录 ↗</a></div>';
    const btn=$('#gateLoginBtn'); if(btn) btn.onclick=gateLogin;
    const pwd=$('#gatePwd'); if(pwd) pwd.addEventListener('keydown',function(e){ if(e.key==='Enter'){ e.preventDefault(); gateLogin(); } });
  }
}
async function gateLogin(){
  const nick=($('#gateNick')&&$('#gateNick').value||'').trim();
  const pwd=($('#gatePwd')&&$('#gatePwd').value)||'';
  if(!nick||!pwd){ status.textContent='请输入学生账号和密码'; status.className='gate-status warn'; return; }
  status.textContent='登录中…'; status.className='gate-status';
  try{
    const r=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nick:nick,pwd:pwd})});
    const d=await r.json().catch(function(){return{};});
    if(!r.ok||!d.token) throw new Error(d.error||'登录失败');
    try{ localStorage.setItem('iv3_token',d.token); }catch(e){}
    renderAuth();
    status.textContent='登录成功，请输入本章密码'; status.className='gate-status ok';
    const inp=$('#gateInput'); if(inp) inp.focus();
  }catch(e){ status.textContent=e.message||'登录失败'; status.className='gate-status warn'; }
}
function refreshChrome(){
  const w=$('#gateWindow'); if(w) w.textContent=fmt(openTs())+' — '+fmt(closeTs());
  const i=$('#gateInst');
  if(i){ i.textContent=serverMode?((CFG.institution||'发小明创新学院')+' · 机构专属访问'):'内测版本 · 机构专属访问'; }
  const l=$('#gateLease');
  if(l){ l.textContent='本次解锁有效期 '+leaseLabel()+' · 到期自动重新锁定'; }
  const hr=$('#gateHintRow');
  if(hr){ hr.style.display=SHOW_HINT?'':'none'; }
}
function leaseLabel(){
  const h=Number(CFG.leaseHours)||4;
  if(h>=24 && h%24===0) return (h/24)+' 天';
  if(h>24) return (Math.round(h/24*10)/10)+' 天';
  return h+' 小时';
}
function stateNow(){
  if(serverMode && serverChapter && serverChapter.state) return serverChapter.state;
  const n=Date.now();
  if(n<openTs()) return 'before';
  if(n>closeTs()) return 'after';
  return 'open';
}
function showGate(msg){
  gate.classList.add('show');
  document.documentElement.classList.add('gate-locked');
  refreshChrome();
  status.textContent=''; status.className='gate-status';
  const st=stateNow();
  if(st==='disabled'){
    status.classList.add('warn'); status.textContent='本章已停用，请联系机构管理员。'; enter.disabled=true;
  }else if(st==='before'){
    status.classList.add('warn'); status.textContent='本章尚未开放：将于 '+fmt(openTs())+' 开放。'; enter.disabled=true;
  }else if(st==='after'){
    status.classList.add('warn'); status.textContent='本章开放时间已结束：'+fmt(closeTs())+'。'; enter.disabled=true;
  }else{
    status.classList.add('ok'); status.textContent=serverMode?'本章开放中 · 请输入机构访问密码':'本章开放中 · 请输入访问密码'; enter.disabled=false;
  }
  if(msg){ err.textContent=msg; err.classList.add('on'); } else { err.textContent=''; err.classList.remove('on'); }
  setTimeout(()=>{ if(!enter.disabled) input.focus(); },260);
}
function hideGate(){
  gate.classList.remove('show');
  document.documentElement.classList.remove('gate-locked');
}

/* ---------- 租期徽章 ---------- */
let leaseBtn=null,leaseTimer=null;
function ensureLeaseBtn(){
  const tools=$('.tb-tools');
  if(!tools){ setTimeout(ensureLeaseBtn,250); return; }
  if(leaseBtn) return;
  leaseBtn=document.createElement('button');
  leaseBtn.className='tb-btn lease-btn';
  leaseBtn.type='button';
  leaseBtn.title='点击立即锁定本章';
  leaseBtn.onclick=()=>{ lock('已手动锁定本章。'); };
  tools.insertBefore(leaseBtn,tools.firstChild);
  updateLease();
}
function updateLease(){
  if(!leaseBtn) return;
  const exp=currentExp();
  if(!exp||exp<=Date.now()){ leaseBtn.textContent='🔒 已锁定'; leaseBtn.classList.remove('on'); return; }
  const left=Math.max(0,exp-Date.now());
  const d=Math.floor(left/86400000),h=Math.floor(left%86400000/3600000),m=Math.floor(left%3600000/60000),s=Math.floor(left%60000/1000);
  leaseBtn.textContent='🔓 '+(d?d+'天 '+h+'时':(h?h+':':'')+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0'));
  leaseBtn.classList.add('on');
}
function startLeaseTimer(){
  clearInterval(leaseTimer);
  leaseTimer=setInterval(()=>{
    const exp=currentExp();
    if(!exp||exp<=Date.now()){
      clearInterval(leaseTimer);
      delete localMap[CHAPTER]; delete serverMap[CHAPTER]; saveLocal(); saveServer();
      if(leaseBtn){ leaseBtn.textContent='🔒 已锁定'; leaseBtn.classList.remove('on'); }
      showGate('本次访问已到期，请重新输入密码。');
      return;
    }
    updateLease();
  },1000);
  updateLease();
}
async function unlock(animate){
  hideGate(); ensureLeaseBtn(); startLeaseTimer();
  if(animate) gate.classList.add('gate-leaving');
  setTimeout(()=>gate.classList.remove('gate-leaving'),700);
  document.dispatchEvent(new CustomEvent('fxm:unlocked',{detail:{chapter:CHAPTER}}));
}
async function lock(msg){
  delete localMap[CHAPTER]; delete serverMap[CHAPTER]; saveLocal(); saveServer();
  clearInterval(leaseTimer);
  if(leaseBtn){ leaseBtn.textContent='🔒 已锁定'; leaseBtn.classList.remove('on'); }
  showGate(msg||'本章已锁定，请重新输入密码。');
}

/* ---------- 服务端模式 ---------- */
async function fetchServerCfg(){
  try{
    const ctl=new AbortController(); const to=setTimeout(()=>ctl.abort(),2600);
    const r=await fetch('/api/access/config?chapter='+encodeURIComponent(CHAPTER),{cache:'no-store',signal:ctl.signal});
    clearTimeout(to);
    if(!r.ok) return false;
    const d=await r.json();
    if(!d||!d.ok||!d.chapter) return false;
    serverChapter=d.chapter; serverMode=true;
    CFG.institution=d.institution||CFG.institution;
    CFG.openAt=d.chapter.openAt||CFG.openAt;
    CFG.closeAt=d.chapter.closeAt||CFG.closeAt;
    CFG.leaseHours=Number(d.chapter.leaseHours)||CFG.leaseHours;
    if(d.chapter.title) CFG.title=d.chapter.title;
    refreshChrome();
    return true;
  }catch(e){ return false; }
}
async function verifyServerToken(t){
  if(!t||!t.token||!t.exp||t.exp<=Date.now()) return false;
  try{
    const r=await fetch('/api/access/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chapter:CHAPTER,token:t.token})});
    const d=await r.json().catch(()=>({}));
    if(r.ok&&d.ok) return true;
    return false;
  }catch(e){ return t.exp>Date.now(); }
}
async function submitServer(v){
  const headers={'Content-Type':'application/json'};
  const tk=authToken(); if(tk) headers.Authorization='Bearer '+tk;
  const r=await fetch('/api/access/unlock',{method:'POST',headers:headers,body:JSON.stringify({chapter:CHAPTER,password:v})});
  const d=await r.json().catch(()=>({}));
  if(!r.ok||!d.ok){ if(r.status===401) renderAuth(); throw new Error(d.error||'验证失败，请稍后再试'); }
  serverMap[CHAPTER]={token:d.token,exp:d.exp};
  saveServer();
  const exp=d.exp;
  return exp;
}

async function submit(){
  if(enter.disabled) return;
  const v=input.value;
  if(!v){ err.textContent='请输入访问密码'; err.classList.add('on'); input.focus(); return; }
  if(!serverMode){ err.textContent='访问校验服务暂不可用，请检查网络后重试'; err.classList.add('on'); return; }
  enter.disabled=true; enter.textContent='验证中…'; err.classList.remove('on');
  try{
    await submitServer(v);
    enter.textContent='进入本章'; enter.disabled=false; input.value=''; err.textContent=''; err.classList.remove('on');
    await unlock(true);
  }catch(e){
    if(e && e.login){ renderAuth(); }
    err.textContent=e.message||'校验失败，请稍后再试'; err.classList.add('on');
    enter.disabled=false; enter.textContent='进入本章';
  }
}

/* ---------- 绑定 ---------- */
enter.addEventListener('click',submit);
input.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); submit(); } });
eye.addEventListener('click',()=>{
  const show=input.type==='password';
  input.type=show?'text':'password';
  eye.textContent=show?'隐藏':'显示';
});
const hint=$('#gateHint');
if(hint) hint.addEventListener('click',()=>{
  const t=hint.textContent.trim(); if(!t) return;
  input.value=t;
  input.type='text'; eye.textContent='隐藏';
  input.focus();
});
gate.addEventListener('pointerdown',e=>{ if(e.target===gate||e.target.classList.contains('gate-bg')) input.focus(); });

/* ---------- 启动 ---------- */
(async function boot(){
  /* 登录账号（员工 / 测试账号）优先走账号授权，不需要章节密码 */
  try{
    var tk=null; try{ tk=localStorage.getItem('iv3_token'); }catch(e){}
    if(tk){
      var r=await fetch('/api/entitlement/access',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+tk},body:JSON.stringify({course:'course'})});
      var d=await r.json().catch(function(){return {}});
      if(r.ok&&d&&d.ok&&d.allowed){
        document.documentElement.classList.remove('gate-locked');
        if(gate&&gate.parentNode) gate.parentNode.removeChild(gate);
        if(!d.unlimited){
          var tmr=setInterval(async function(){
            try{
              var r2=await fetch('/api/entitlement/tick',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+tk},body:JSON.stringify({course:'course',seconds:60})});
              var d2=await r2.json().catch(function(){return {}});
              if(r2.ok&&d2&&d2.ok&&typeof d2.minutesLeft==='number'&&d2.minutesLeft<=0){
                clearInterval(tmr);
                document.documentElement.classList.add('gate-locked');
                document.body.appendChild(gate);
                gate.classList.add('show');
                var st=gate.querySelector('#gateStatus');
                if(st){ st.textContent='体验时长已用完，请联系销售总监续时'; st.className='gate-status warn'; }
              }
            }catch(e){}
          },60000);
        }
        return;
      }
    }
  }catch(e){}
  renderAuth();
  /* 免费章节（第 01 章）：不弹密码，直接进入（不走租期计时，避免无 token 时被重新锁上） */
  if(CFG.free){
    hideGate();
    document.documentElement.classList.remove('gate-locked');
    if(gate&&gate.parentNode) gate.parentNode.removeChild(gate);
    return;
  }
  showGate('');
  await fetchServerCfg();
  if(!serverMode){
    showGate('访问校验服务暂不可用，请检查网络后重试（课程访问需要联网校验）。');
    enter.disabled=true;
    return;
  }
  const t=serverMap[CHAPTER];
  if(t && t.exp>Date.now()){
    hideGate(); ensureLeaseBtn(); startLeaseTimer();
    if(!(await verifyServerToken(t))){
      delete serverMap[CHAPTER]; saveServer(); showGate('解锁已失效，请重新输入密码。');
    }
    return;
  }
  showGate('');
})();
})();
