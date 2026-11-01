/* =========================================================
   发小明 · 世界创新港 · 章节引擎
   支持：通用导航 / 教师指引 / 拖拽分类 / 分组 PK /
         AI 追问 / 画布 / 成果卡导出 / 门禁
   ========================================================= */
(function(){
'use strict';
const CH=window.__FXM_CH__||'2';
const C=window.FXM_CHAPTERS&&window.FXM_CHAPTERS[CH];
if(!C){
  document.getElementById('deck').innerHTML='<div style="padding:60px;color:#fff;font-family:sans-serif">章节数据未加载，请检查 chapter-data.js。</div>';
  return;
}
const $=(s,r)=>(r||document).querySelector(s);
const $$=(s,r)=>Array.from((r||document).querySelectorAll(s));
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad=n=>String(n).padStart(2,'0');
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const KEY='fxm_ch'+CH+'_v1';
const ACTS=C.acts||[];
const TOTAL=ACTS.length+1;

/* ---------- state ---------- */
let S={};
try{ S=JSON.parse(localStorage.getItem(KEY)||'{}')||{}; }catch(e){ S={}; }
let saveTimer=null;
function save(){ clearTimeout(saveTimer); saveTimer=setTimeout(()=>{ try{ localStorage.setItem(KEY,JSON.stringify(S)); }catch(e){} },180); }
function saveNow(){ try{ localStorage.setItem(KEY,JSON.stringify(S)); }catch(e){} }

/* ---------- accent ---------- */
const ACC=C.acc||'#F5C451', ACC2=C.acc2||'#FFE3A6', RGB=C.rgb||'245,196,81';
function applyAccent(){
  document.documentElement.style.setProperty('--acc',ACC);
  document.documentElement.style.setProperty('--acc2',ACC2);
  document.documentElement.style.setProperty('--acc-rgb',RGB);
}
applyAccent();

/* ---------- audio ---------- */
let AC=null,muted=false;
try{ muted=localStorage.getItem('fxm_l1_muted')==='1'; }catch(e){}
function ac(){ if(!AC){ const A=window.AudioContext||window.webkitAudioContext; if(!A)return null; AC=new A(); } if(AC.state==='suspended')AC.resume().catch(()=>{}); return AC; }
function tone(f,d,type,v,delay){ if(muted)return; const c=ac(); if(!c)return; const t=c.currentTime+(delay||0); const o=c.createOscillator(),g=c.createGain(); o.type=type||'sine'; o.frequency.setValueAtTime(f,t); g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(v==null?.045:v,t+.012); g.gain.exponentialRampToValueAtTime(.0001,t+d); o.connect(g); g.connect(c.destination); o.start(t); o.stop(t+d+.05); }
function sweep(f1,f2,d,v){ if(muted)return; const c=ac(); if(!c)return; const t=c.currentTime,o=c.createOscillator(),g=c.createGain(); o.type='sine'; o.frequency.setValueAtTime(f1,t); o.frequency.exponentialRampToValueAtTime(f2,t+d); g.gain.setValueAtTime(v||.04,t); g.gain.exponentialRampToValueAtTime(.0001,t+d); o.connect(g); g.connect(c.destination); o.start(t); o.stop(t+d+.05); }
function noise(d,v,f){ if(muted)return; const c=ac(); if(!c)return; const n=Math.floor(c.sampleRate*d),b=c.createBuffer(1,n,c.sampleRate),a=b.getChannelData(0); for(let i=0;i<n;i++)a[i]=(Math.random()*2-1)*(1-i/n); const s=c.createBufferSource(); s.buffer=b; const q=c.createBiquadFilter(); q.type='bandpass'; q.frequency.value=f||900; q.Q.value=.7; const g=c.createGain(); g.gain.value=v||.045; s.connect(q); q.connect(g); g.connect(c.destination); s.start(); }
function sfx(n){
  switch(n){
    case 'tap': tone(520,.05,'square',.02); break;
    case 'pop': sweep(620,980,.12,.055); break;
    case 'chime': [523,659,784].forEach((f,i)=>tone(f,.35,'sine',.045,i*.08)); break;
    case 'success': [523,659,784,1047].forEach((f,i)=>tone(f,.4,'sine',.05,i*.09)); break;
    case 'whoosh': noise(.28,.045,600); break;
    case 'bell': tone(880,.6,'triangle',.06); tone(1320,.5,'sine',.035,.04); break;
    case 'error': tone(220,.16,'sawtooth',.03); break;
    case 'coin': tone(988,.08,'triangle',.05); tone(1318,.18,'triangle',.045,.06); break;
  }
}
function toggleSound(){
  muted=!muted; try{ localStorage.setItem('fxm_l1_muted',muted?'1':'0'); }catch(e){}
  const b=$('#btnSound'); if(b){ b.classList.toggle('on',!muted); const s=b.querySelector('span'); if(s)s.textContent=muted?'静音':'声音'; }
  if(!muted)sfx('chime');
}

/* ---------- starfield ---------- */
(function sky(){
  const cv=$('#sky'),ctx=cv.getContext('2d'); let w=0,h=0,dpr=Math.min(2,devicePixelRatio||1),stars=[],last=0,shoot=null;
  function size(){ w=innerWidth;h=innerHeight;cv.width=w*dpr;cv.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0); stars=Array.from({length:Math.min(140,Math.round(w*h/15000))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.2+.2,a:Math.random(),s:Math.random()*.015+.003})); }
  size(); addEventListener('resize',size);
  function loop(t){
    ctx.clearRect(0,0,w,h);
    for(const s of stars){ s.a+=s.s; ctx.fillStyle='rgba(247,242,230,'+(0.1+0.42*Math.abs(Math.sin(s.a))).toFixed(3)+')'; ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,6.29); ctx.fill(); }
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&t-last>10000&&!shoot){ last=t; shoot={x:Math.random()*w*.6+w*.2,y:Math.random()*h*.25,l:0}; }
    if(shoot){ shoot.l+=7; shoot.x+=5.6; shoot.y+=1.8; const g=ctx.createLinearGradient(shoot.x-60,shoot.y-20,shoot.x,shoot.y); g.addColorStop(0,'rgba(255,227,166,0)'); g.addColorStop(1,'rgba(255,227,166,.55)'); ctx.strokeStyle=g; ctx.lineWidth=1.2; ctx.beginPath(); ctx.moveTo(shoot.x-60,shoot.y-20); ctx.lineTo(shoot.x,shoot.y); ctx.stroke(); if(shoot.l>240)shoot=null; }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

/* ---------- confetti ---------- */
const fxCv=$('#fx'),fxCtx=fxCv.getContext('2d');
let parts=[],fxRunning=false;
function fxSize(){ const d=Math.min(2,devicePixelRatio||1); fxCv.width=innerWidth*d; fxCv.height=innerHeight*d; fxCv.style.width=innerWidth+'px'; fxCv.style.height=innerHeight+'px'; fxCtx.setTransform(d,0,0,d,0,0); }
fxSize(); addEventListener('resize',fxSize);
function burst(x,y,n,colors){
  const cs=colors||['#F5C451','#FFE3A6','#4FE0D0','#FF7A6B','#A78BFA','#FFF'];
  for(let i=0;i<(n||24);i++){ const a=Math.random()*6.28,s=2+Math.random()*6; parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-2,g:.22,life:0,max:50+Math.random()*40,size:2+Math.random()*3,color:cs[(Math.random()*cs.length)|0],rot:Math.random()*6.28,vr:(Math.random()-.5)*.3,c:Math.random()<.4}); }
  startFx();
}
function confetti(n){
  const cs=['#F5C451','#FFE3A6','#4FE0D0','#FF7A6B','#A78BFA','#FFF','#8BD17C'];
  for(let i=0;i<(n||80);i++){ parts.push({x:innerWidth/2+(Math.random()-.5)*innerWidth*.6,y:innerHeight*.3+Math.random()*70,vx:(Math.random()-.5)*8,vy:-Math.random()*10-2,g:.25,life:0,max:100+Math.random()*70,size:2+Math.random()*4,color:cs[(Math.random()*cs.length)|0],rot:Math.random()*6.28,vr:(Math.random()-.5)*.35,c:Math.random()<.4}); }
  startFx();
}
function startFx(){ if(!fxRunning){ fxRunning=true; requestAnimationFrame(fxLoop); } }
function fxLoop(){
  fxCtx.clearRect(0,0,innerWidth,innerHeight);
  for(let i=parts.length-1;i>=0;i--){ const p=parts[i]; p.life++; p.x+=p.vx; p.y+=p.vy; p.vy+=p.g; p.vx*=.995; p.rot+=p.vr;
    fxCtx.save(); fxCtx.globalAlpha=Math.max(0,1-p.life/p.max); fxCtx.translate(p.x,p.y); fxCtx.rotate(p.rot); fxCtx.fillStyle=p.color;
    if(p.c){ fxCtx.beginPath(); fxCtx.arc(0,0,p.size*.6,0,6.29); fxCtx.fill(); } else fxCtx.fillRect(-p.size/2,-p.size/2,p.size,p.size*1.6);
    fxCtx.restore(); if(p.life>=p.max||p.y>innerHeight+40)parts.splice(i,1); }
  if(parts.length)requestAnimationFrame(fxLoop); else { fxRunning=false; fxCtx.clearRect(0,0,innerWidth,innerHeight); }
}

/* ---------- toast / modal ---------- */
let toastTimer=null;
function toast(msg,icon){
  const el=$('#toast'); if(!el)return;
  $('#toastText').textContent=msg; const i=el.querySelector('i'); if(i)i.textContent=icon||'✓';
  el.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('show'),2600);
}
function openModal(html){
  const m=$('#modal'),box=$('#modalBox');
  box.innerHTML=html; m.classList.add('show');
  const x=box.querySelector('.modal-x,[data-close]'); if(x)x.onclick=closeModal;
  m.onclick=e=>{ if(e.target===m)closeModal(); };
}
function closeModal(){ const m=$('#modal'); if(m)m.classList.remove('show'); const b=$('#modalBox'); if(b)b.innerHTML=''; }

/* ---------- curtain ---------- */
let curtainTimer=null;
function showCurtain(n){
  const el=$('#curtainTrans'); if(!el)return;
  const label=n===0?'序章':(ACTS[n-1]?ACTS[n-1].name:'');
  $('#curtainNo').textContent='CHAPTER '+(C.no||CH);
  $('#curtainTitle').textContent=label;
  el.classList.add('show'); clearTimeout(curtainTimer); curtainTimer=setTimeout(()=>el.classList.remove('show'),430);
}

/* ---------- build deck ---------- */
const deck=$('#deck');
deck.innerHTML='<section class="ch cover" data-ch="0">'+(C.cover||'')+'</section>'+
  ACTS.map((a,i)=>'<section class="ch" data-ch="'+(i+1)+'" data-act="'+esc(a.a||pad(i+1))+'" data-title="'+esc(a.name||'')+'"><div class="ch-body">'+(a.html||'')+'</div></section>').join('');

/* ---------- dots ---------- */
function buildDots(){
  const labels=['序章'].concat(ACTS.map(a=>a.name||''));
  $('#dots').innerHTML=labels.map((l,i)=>'<button class="dot'+(i===0?' active':'')+'" data-i="'+i+'" data-label="'+esc(l)+'" aria-label="第'+i+'幕 '+esc(l)+'">'+(i===0?'序':pad(i))+'</button>').join('');
  $$('#dots .dot').forEach(d=>d.addEventListener('click',()=>go(+d.dataset.i)));
}

/* ---------- navigation ---------- */
let cur=0;
function go(n,opts){
  opts=opts||{};
  n=clamp(n,0,TOTAL-1);
  if(n===cur&&!opts.force)return;
  if(!opts.instant&&n>cur){ showCurtain(n); sfx('whoosh'); }
  else if(!opts.instant&&n<cur)sfx('tap');
  cur=n;
  $$('.ch').forEach(el=>el.classList.remove('active'));
  const sec=$('.ch[data-ch="'+n+'"]');
  if(sec)sec.classList.add('active');
  document.body.className='ch-'+n;
  $$('#dots .dot').forEach((d,i)=>{ d.classList.toggle('active',i===n); d.classList.toggle('done',i<n); });
  $('#progressBar').style.width=(n/(TOTAL-1)*100)+'%';
  $('#tbAct').textContent=C.no||CH;
  $('#tbTitle').textContent=n===0?'序章':(ACTS[n-1]?ACTS[n-1].name:'');
  const nextLabel=n>=TOTAL-1?'回到课程目录':(ACTS[n].name||'下一幕');
  $('#nextLabel').textContent=nextLabel;
  renderNotes(n);
  onEnter(n);
  if(sec)sec.scrollTop=0;
}
function onEnter(n){
  if(n<=0)return;
  const sec=$('.ch[data-ch="'+n+'"]'),a=ACTS[n-1]; if(!sec||!a)return;
  if(a.init&&!a._bound){ a._bound=true; try{ a.init(sec,api); }catch(e){ console.error('[init act '+n+']',e); } }
  if(a.onEnter){ try{ a.onEnter(sec,api); }catch(e){ console.error('[enter act '+n+']',e); } }
}

/* ---------- notes ---------- */
function renderNotes(n){
  const sched=$('#noteSched'),body=$('#noteBody'); if(!sched||!body)return;
  const labels=['序章'].concat(ACTS.map(a=>a.name||''));
  sched.innerHTML=labels.map((l,i)=>'<div class="ns-item'+(i===n?' on':'')+'" data-note="'+i+'"><b>'+(i===0?'序':pad(i))+'</b><span>'+esc(l)+'</span><i>'+(i===0?'':(ACTS[i-1].time||''))+'</i></div>').join('');
  $$('#noteSched .ns-item').forEach(el=>el.addEventListener('click',()=>go(+el.dataset.note)));
  const note=(C.notes||[])[n]||(C.notes||[])[0];
  body.innerHTML=note?note.html:'<div class="note-block"><p>暂无教师指引。</p></div>';
}
function toggleNotes(force){
  const el=$('#notes'); if(!el)return;
  const on=force==null?!el.classList.contains('open'):force;
  el.classList.toggle('open',on); $('#btnNotes').classList.toggle('on',on);
  if(on){ renderNotes(cur); sfx('tap'); }
}

/* ---------- drawing ---------- */
function initDrawing(root,onChange){
  const cv=root.querySelector('[data-draw]'); if(!cv)return null;
  const ctx=cv.getContext('2d'); ctx.lineCap='round'; ctx.lineJoin='round';
  let color='#F5C451',size=7,erasing=false,drawing=false,last=null,undoStack=[];
  const pos=e=>{ const r=cv.getBoundingClientRect(); return {x:(e.clientX-r.left)*cv.width/r.width,y:(e.clientY-r.top)*cv.height/r.height}; };
  function pushUndo(){ try{ undoStack.push(cv.toDataURL('image/png')); if(undoStack.length>14)undoStack.shift(); }catch(e){} }
  function hideHint(){ const h=root.querySelector('.canvas-hint'); if(h)h.classList.add('hide'); }
  function saveDraw(){ if(onChange){ try{ onChange(cv.toDataURL('image/png')); }catch(e){} } }
  cv.addEventListener('pointerdown',e=>{ e.preventDefault(); cv.setPointerCapture(e.pointerId); pushUndo(); drawing=true; last=pos(e); ctx.globalCompositeOperation=erasing?'destination-out':'source-over'; ctx.strokeStyle=color; ctx.lineWidth=erasing?size*2.3:size; ctx.fillStyle=color; ctx.beginPath(); ctx.arc(last.x,last.y,ctx.lineWidth/2,0,6.29); if(!erasing)ctx.fill(); hideHint(); });
  cv.addEventListener('pointermove',e=>{ if(!drawing)return; e.preventDefault(); const p=pos(e); ctx.globalCompositeOperation=erasing?'destination-out':'source-over'; ctx.strokeStyle=color; ctx.lineWidth=erasing?size*2.3:size; ctx.beginPath(); ctx.moveTo(last.x,last.y); ctx.lineTo(p.x,p.y); ctx.stroke(); last=p; });
  const end=()=>{ if(!drawing)return; drawing=false; saveDraw(); };
  cv.addEventListener('pointerup',end); cv.addEventListener('pointercancel',end); cv.addEventListener('pointerleave',()=>{ if(drawing)end(); });
  const tool=root.querySelector('[data-draw-tools]');
  if(tool){
    $$('[data-color]',tool).forEach(b=>b.addEventListener('click',()=>{ color=b.dataset.color; erasing=false; $$('[data-color]',tool).forEach(x=>x.classList.toggle('on',x===b)); $$('[data-size]',tool).forEach(x=>x.classList.remove('on')); const er=tool.querySelector('[data-eraser]'); if(er)er.classList.remove('on'); sfx('tap'); }));
    $$('[data-size]',tool).forEach(b=>b.addEventListener('click',()=>{ size=+b.dataset.size; erasing=false; $$('[data-size]',tool).forEach(x=>x.classList.toggle('on',x===b)); const er=tool.querySelector('[data-eraser]'); if(er)er.classList.remove('on'); sfx('tap'); }));
    const er=tool.querySelector('[data-eraser]'); if(er)er.addEventListener('click',()=>{ erasing=!erasing; er.classList.toggle('on',erasing); sfx('tap'); });
    const un=tool.querySelector('[data-undo]'); if(un)un.addEventListener('click',()=>{ const d=undoStack.pop(); if(!d)return; const img=new Image(); img.onload=()=>{ ctx.clearRect(0,0,cv.width,cv.height); ctx.drawImage(img,0,0); saveDraw(); }; img.src=d; });
    const cl=tool.querySelector('[data-clear]'); if(cl)cl.addEventListener('click',()=>{ pushUndo(); ctx.clearRect(0,0,cv.width,cv.height); saveDraw(); const h=root.querySelector('.canvas-hint'); if(h)h.classList.remove('hide'); });
  }
  return {
    toDataURL:()=>cv.toDataURL('image/png'),
    load(url){ if(!url)return; const img=new Image(); img.onload=()=>{ ctx.clearRect(0,0,cv.width,cv.height); ctx.drawImage(img,0,0,cv.width,cv.height); hideHint(); }; img.src=url; },
    clear(){ ctx.clearRect(0,0,cv.width,cv.height); saveDraw(); }
  };
}

/* ---------- export sheet ---------- */
function wrapText(ctx,text,maxW){
  const chars=Array.from(String(text||'')); const lines=[]; let line='';
  for(const ch of chars){ if(ch==='\n'){lines.push(line);line='';continue;} const test=line+ch; if(ctx.measureText(test).width>maxW&&line){lines.push(line);line=ch;} else line=test; }
  if(line)lines.push(line); return lines.length?lines:[''];
}
function makeSheet(opts){
  const W=1600,H=1120,cv=document.createElement('canvas');cv.width=W;cv.height=H;const c=cv.getContext('2d');
  c.fillStyle='#FBF3DE';c.fillRect(0,0,W,H);
  const g=c.createRadialGradient(W*.8,0,10,W*.8,0,700);g.addColorStop(0,'rgba(245,196,81,.18)');g.addColorStop(1,'rgba(245,196,81,0)');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.strokeStyle='rgba(160,120,40,.45)';c.lineWidth=2;c.strokeRect(38,38,W-76,H-76);
  c.strokeStyle='rgba(160,120,40,.22)';c.strokeRect(52,52,W-104,H-104);
  c.fillStyle='#2B3A67';c.font='700 25px "Noto Sans SC","PingFang SC",sans-serif';c.fillText('GENESIS · 发小明创新学院',96,112);
  c.fillStyle='#8A6212';c.font='500 13px "Noto Sans SC","PingFang SC",sans-serif';c.fillText('WORLD INNOVATION PORT · CHAPTER '+(C.no||CH),96,140);
  c.textAlign='right';c.fillStyle='#8A6212';c.font='500 13px "Noto Sans SC",sans-serif';c.fillText(opts.code||'FXM-CUR-Q1-'+(C.no||CH),W-96,116);c.fillText(opts.badge||'',W-96,140);c.textAlign='left';
  c.fillStyle='#1C2333';c.font='900 52px "Noto Serif SC","Songti SC",serif';c.fillText(opts.title||'我的创新记录',96,226);
  c.fillStyle='#6B748F';c.font='500 17px "Noto Sans SC",sans-serif';c.fillText(opts.subtitle||'',96,258);
  c.strokeStyle='#1C2333';c.lineWidth=3;c.beginPath();c.moveTo(96,292);c.lineTo(W-96,292);c.stroke();
  c.fillStyle='#8A93A6';c.font='500 13px "Noto Sans SC",sans-serif';c.fillText('小小发明家',96,334);
  c.fillStyle='#1C2333';c.font='700 30px "Noto Serif SC","Songti SC",serif';c.fillText(opts.name||'小小发明家',96,374);
  c.textAlign='right';c.fillStyle='#8A93A6';c.font='500 13px "Noto Sans SC",sans-serif';c.fillText(opts.date||'',W-96,334);c.textAlign='left';
  const leftX=96,leftW=740;let y=424;
  (opts.fields||[]).forEach(f=>{
    c.fillStyle='#8A6212';c.font='700 12px "Noto Sans SC",sans-serif';c.fillText(f.label||'',leftX,y);y+=25;
    c.fillStyle='#2B3A67';c.font='500 20px "Noto Sans SC",sans-serif';
    const lines=wrapText(c,f.value||'—',leftW);
    lines.forEach(ln=>{c.fillText(ln,leftX,y);y+=31;});
    y+=13;
  });
  const bx=900,by=420,bw=600,bh=470;
  c.fillStyle='#FFFCF3';c.strokeStyle='rgba(160,120,40,.35)';c.lineWidth=2;c.beginPath();c.rect(bx,by,bw,bh);c.fill();c.stroke();
  c.fillStyle='#8A6212';c.font='700 12px "Noto Sans SC",sans-serif';c.fillText(opts.drawLabel||'我的设计图 · DESIGN',bx+18,by+28);
  const finish=()=>{
    if(opts.drawing){
      const img=new Image();
      img.onload=()=>{ const pad=18,maxW=bw-pad*2,maxH=bh-58; const sc=Math.min(maxW/img.width,maxH/img.height); const w=img.width*sc,h=img.height*sc; c.drawImage(img,bx+(bw-w)/2,by+44+(maxH-h)/2,w,h); finish2(); };
      img.onerror=finish2; img.src=opts.drawing;
    } else { c.fillStyle='#B9B29E';c.font='500 15px "Noto Sans SC",sans-serif';c.textAlign='center';c.fillText('（'+(opts.drawLabel||'设计图')+'）',bx+bw/2,by+bh/2);c.textAlign='left';finish2(); }
  };
  function finish2(){
    c.strokeStyle='rgba(28,35,51,.25)';c.lineWidth=2;c.beginPath();c.moveTo(96,H-118);c.lineTo(W-96,H-118);c.stroke();
    c.fillStyle='#8A93A6';c.font='500 13px "Noto Sans SC",sans-serif';c.fillText('发小明 Genesis 创新学院 · 让每个孩子都拥有创造的能力',96,H-84);
    c.textAlign='right';c.fillText(opts.footer||'发现 → 想象 → 设计 → 表达',W-96,H-84);c.textAlign='left';
    c.save();c.translate(W-200,H-200);c.rotate(-.2);c.strokeStyle='rgba(197,46,46,.55)';c.lineWidth=3;c.beginPath();c.arc(0,0,64,0,6.29);c.stroke();
    c.fillStyle='rgba(197,46,46,.7)';c.textAlign='center';c.font='700 17px "Noto Serif SC",serif';c.fillText(opts.stamp||C.badge||'创新记录',0,-4);c.font='500 11px "Noto Sans SC",sans-serif';c.fillText('发小明 · 第 '+(C.no||CH)+' 章',0,18);c.restore();c.textAlign='left';
  }
  finish();
  return cv;
}
function saveToLab(rec){
  if(!rec)return;
  let list=[];try{list=JSON.parse(localStorage.getItem('fxm_course_lab_v1')||'[]')||[];}catch(e){list=[];}
  const p=Object.assign({id:'c'+Date.now(),source:'course',date:new Date().toLocaleDateString('zh-CN'),ts:Date.now()},rec);
  list=list.filter(x=>!(x.product===p.product&&x.problem===p.problem&&x.name===p.name));
  list.unshift(p);
  try{localStorage.setItem('fxm_course_lab_v1',JSON.stringify(list.slice(0,24)));}catch(e){toast('本机存储空间不足，请先下载成果卡','⚠️');return;}
  sfx('success'); confetti(70);
  openModal('<button class="modal-x" data-close>×</button><div class="saved-panel"><div class="saved-ic">🎓</div><div class="saved-kicker">SAVED TO MY LAB</div><h3>已存入我的实验室</h3><p>「'+esc(p.product||'我的成果')+'」已经收进你的实验室。下一次从学院地图点「我的实验室」就能找到它。</p><div class="saved-tip"><b>建议下一步</b><span>用「路演大师」把成果讲成故事，生成演讲稿；用「六院圆桌」让六位院长继续帮你发散和打磨。</span></div><div class="saved-actions"><a class="btn primary" href="index.html?scene=lab">去我的实验室</a><a class="btn" href="index.html?scene=roadshow">去路演大师</a><a class="btn" href="index.html?scene=roundtable">去六院圆桌</a></div><button class="btn ghost" data-close>留在本章</button><div class="saved-foot">本机保存 · 换设备或清理浏览器缓存后不会自动同步</div></div>');
  toast('已存入我的实验室','🎓');
}
function previewSheet(opts){
  const cv=makeSheet(opts); const url=cv.toDataURL('image/png');
  openModal('<button class="modal-x" data-close>×</button><div class="sheet-preview"><img src="'+url+'" alt="成果卡"></div><div class="modal-actions">'+(opts.lab?'<button class="btn primary" id="sheetLab">存入我的实验室</button>':'')+'<button class="btn'+(opts.lab?'':' primary')+'" id="sheetDl">下载图片</button><button class="btn ghost" data-close>继续完善</button></div>');
  const dl=$('#sheetDl'); if(dl)dl.onclick=()=>{ const a=document.createElement('a');a.download=(opts.filename||'我的创新记录')+'.png';a.href=url;a.click();sfx('success');toast('成果卡已生成','⬇️'); };
  const lb=$('#sheetLab'); if(lb)lb.onclick=()=>saveToLab(Object.assign({},opts.lab,{drawing:opts.drawing}));
  sfx('success'); confetti(70);
}
function downloadSheet(opts){ const cv=makeSheet(opts); const a=document.createElement('a');a.download=(opts.filename||'我的创新记录')+'.png';a.href=cv.toDataURL('image/png');a.click(); }

/* ---------- drag bins ---------- */
function dragBins(root,opts){
  opts=opts||{};
  const cards=$$('.sort-card',root),bins=$$('.sort-bin',root);
  let selected=null,done=0;
  const total=cards.length;
  function select(card){ if(card.classList.contains('placed'))return; selected=card; cards.forEach(c=>c.classList.toggle('selected',c===card)); sfx('tap'); }
  function place(card,bin){
    if(!card||!bin||card.classList.contains('placed'))return;
    const ok=card.dataset.answer===bin.dataset.bin;
    if(ok){
      card.classList.remove('selected'); card.classList.add('placed','correct');
      const list=bin.querySelector('.bin-list')||bin; list.appendChild(card);
      selected=null; done++; sfx('pop'); if(opts.onCorrect)opts.onCorrect(card,bin); if(done===total&&opts.onDone)opts.onDone();
    }else{
      card.classList.add('wrong'); setTimeout(()=>card.classList.remove('wrong'),520);
      sfx('error'); if(opts.onWrong)opts.onWrong(card,bin);
    }
  }
  cards.forEach(card=>{
    card.draggable=true;
    card.addEventListener('click',e=>{ e.stopPropagation(); if(card.classList.contains('placed'))return; select(card); });
    card.addEventListener('dragstart',e=>{ if(card.classList.contains('placed')){e.preventDefault();return;} selected=card; try{e.dataTransfer.setData('text/plain',card.dataset.key||'');}catch(err){} card.classList.add('dragging'); });
    card.addEventListener('dragend',()=>card.classList.remove('dragging'));
  });
  bins.forEach(bin=>{
    bin.addEventListener('click',()=>{ if(selected)place(selected,bin); });
    bin.addEventListener('dragover',e=>{ e.preventDefault(); bin.classList.add('over'); });
    bin.addEventListener('dragleave',()=>bin.classList.remove('over'));
    bin.addEventListener('drop',e=>{ e.preventDefault(); bin.classList.remove('over'); if(selected)place(selected,bin); });
  });
  return {reset(){ cards.forEach(c=>{c.classList.remove('placed','correct','wrong','selected'); const home=root.querySelector('.sort-pool'); if(home)home.appendChild(c); }); done=0; }};
}

/* ---------- group PK ---------- */
function pkBoard(root,opts){
  opts=opts||{};
  const box=root.querySelector('[data-pk]'); if(!box)return null;
  const step=opts.step||10, teams=opts.teams||['A队','B队'];
  box.innerHTML='<div class="pk-board"><div class="pk-team active" data-team="0"><span class="pt-name">'+teams[0]+'</span><b data-score>0</b><button type="button" data-add>+'+step+'</button></div><div class="pk-team" data-team="1"><span class="pt-name">'+teams[1]+'</span><b data-score>0</b><button type="button" data-add>+'+step+'</button></div><button type="button" class="pk-switch" data-switch>换队</button></div><div class="pk-tip">当前答题：<b data-active>'+teams[0]+'</b> · 答对 +'+step+'，自动换队</div>';
  const scores=[0,0]; let active=0;
  const update=()=>{ $$('.pk-team',box).forEach((el,i)=>{ el.classList.toggle('active',i===active); const s=el.querySelector('[data-score]'); if(s)s.textContent=scores[i]; }); const a=box.querySelector('[data-active]'); if(a)a.textContent=teams[active]; };
  $$('.pk-team',box).forEach((el,i)=>{
    const add=el.querySelector('[data-add]'); if(add)add.onclick=()=>{ scores[active]+=step; if(opts.onAdd)opts.onAdd(active,step); update(); sfx('coin'); };
    el.addEventListener('click',e=>{ if(e.target.closest('[data-add]'))return; active=i; update(); sfx('tap'); });
  });
  const sw=box.querySelector('[data-switch]'); if(sw)sw.onclick=()=>{ active=1-active; update(); sfx('tap'); };
  update();
  return {add(team,pts){ scores[team]+=(pts||step); update(); }, get active(){return active;}, next(){active=1-active;update();}, reset(){scores[0]=scores[1]=0;active=0;update();}, scores};
}

/* ---------- AI prompts ---------- */
function aiPanel(root,opts){
  opts=opts||{};
  const btn=root.querySelector('[data-ai]'),out=root.querySelector('[data-ai-out]');
  if(!btn||!out)return null;
  const prompts=opts.prompts||[]; let i=0;
  btn.onclick=()=>{
    if(!prompts.length)return;
    const p=prompts[i%prompts.length]; i++;
    out.innerHTML='<b>AI 追问 · '+(i)+'</b><span>'+esc(p)+'</span>';
    out.classList.remove('show'); void out.offsetWidth; out.classList.add('show');
    sfx('chime');
  };
  if(opts.auto&&prompts.length){ setTimeout(()=>{ if(!out.textContent) btn.click(); },600); }
  return {next:()=>btn.click()};
}

/* ---------- timer ---------- */
function timer(root,opts){
  opts=opts||{};
  const box=root.querySelector('[data-timer]'); if(!box)return null;
  const num=box.querySelector('[data-timer-num]'), bar=box.querySelector('[data-timer-bar]'), start=box.querySelector('[data-timer-start]'), reset=box.querySelector('[data-timer-reset]');
  const total=opts.seconds||60; let left=total,id=null,running=false;
  const paint=()=>{ if(num)num.textContent=Math.ceil(left); if(bar)bar.style.width=(left/total*100)+'%'; if(num)num.classList.toggle('warn',left<=10&&left>0); };
  const stop=()=>{ clearInterval(id); id=null; running=false; if(start)start.textContent='开始 '+total+' 秒'; };
  if(start)start.onclick=()=>{ if(running){ stop(); start.textContent='继续'; return; } if(left<=0)left=total; running=true; start.textContent='暂停'; sfx('tap'); id=setInterval(()=>{ left-=1; paint(); if(left<=5&&left>0)sfx('tap'); if(left<=0){ stop(); sfx('bell'); if(opts.onEnd)opts.onEnd(); } },1000); };
  if(reset)reset.onclick=()=>{ stop(); left=total; paint(); sfx('tap'); };
  paint();
  return {reset(){stop();left=total;paint();}, start(){if(start)start.click();}};
}

/* ---------- generic API ---------- */
const api={$,$$,esc,clamp,pad,S,save,saveNow,toast,sfx,confetti,burst,go,openModal,closeModal,initDrawing,previewSheet,downloadSheet,makeSheet,saveToLab,dragBins,pkBoard,aiPanel,timer,state:()=>S,chapter:C};

/* ---------- bind chrome ---------- */
function bind(){
  buildDots();
  $('#btnPrev').onclick=()=>go(cur-1);
  $('#btnNext').onclick=()=>{ if(cur>=TOTAL-1){ if(window.FXM45) window.FXM45.show(); else location.href='course-index.html'; return;} go(cur+1); };
  $('#btnNotes').onclick=()=>toggleNotes();
  $('#closeNotes').onclick=()=>toggleNotes(false);
  $('#btnSound').onclick=toggleSound;
  $('#btnFull').onclick=()=>{ if(!document.fullscreenElement)document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen().catch(()=>{}); else document.exitFullscreen&&document.exitFullscreen().catch(()=>{}); };
  deck.addEventListener('click',e=>{ const b=e.target.closest('[data-go]'); if(b){e.preventDefault();go(+b.dataset.go);} const n=e.target.closest('[data-notes]'); if(n){e.preventDefault();toggleNotes(true);} });
  document.addEventListener('keydown',e=>{
    const t=e.target; const typing=t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.tagName==='SELECT'||t.isContentEditable);
    if(e.key==='Escape'){ if($('#modal').classList.contains('show')){closeModal();return;} if($('#notes').classList.contains('open')){toggleNotes(false);return;} }
    if(typing)return;
    if(e.key==='ArrowRight'||e.key==='PageDown'||e.key===' '){e.preventDefault(); if(cur<TOTAL-1)go(cur+1);}
    else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault(); go(cur-1);}
    else if(e.key==='t'||e.key==='T'){e.preventDefault();toggleNotes();}
    else if(e.key==='m'||e.key==='M'){e.preventDefault();toggleSound();}
    else if(e.key==='f'||e.key==='F'){e.preventDefault(); $('#btnFull').click();}
  });
  const m=$('#modal'); if(m)m.addEventListener('click',e=>{if(e.target===m)closeModal();});
  document.addEventListener('pointerdown',()=>ac(),{once:true});
}

/* ---------- boot ---------- */
try{
  bind();
  const q=new URLSearchParams(location.search);
  const start=clamp(parseInt(q.get('act')||'0',10)||0,0,TOTAL-1);
  cur=-1; go(start,{instant:true,force:true});
  window.CH={go,state:()=>S,chapter:C,api};
}catch(e){
  console.error(e);
  document.body.innerHTML='<div style="color:#fff;padding:40px;font-family:sans-serif"><h1>章节加载出错</h1><pre>'+esc(e.stack||e.message)+'</pre></div>';
}
})();
