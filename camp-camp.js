/* =========================================================
   发小明 · 假期 5 天特训营 · 引擎
   一份档案贯通 5 天：fxm_camp_v1
   ========================================================= */
(function(){
'use strict';
const $=(s,r)=>(r||document).querySelector(s);
const $$=(s,r)=>Array.from((r||document).querySelectorAll(s));
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad=n=>String(n).padStart(2,'0');
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));

const Q=new URLSearchParams(location.search);
if(Q.get('shot')==='1')document.documentElement.classList.add('shot'); /* 截图用：关掉入场动画 */
/* 只有五个工具和「盒内思考」原则才带品牌前缀；单变量/系统/整合等是动作，不挂品牌 */
const TOOLRE=/减法|乘法|除法|一专多能|属性关联|盒内思考/;
const toolLabel=s=>{s=String(s||'');return TOOLRE.test(s)?'发小明 · '+s:s;};
const DN=String(clamp(parseInt(Q.get('d')||'1',10)||1,1,5));
const D=(window.FXM_DAYS||{})[DN];
if(!D){document.body.innerHTML='<div style="color:#fff;padding:50px;font-family:sans-serif;font-size:16px">今日数据未加载（day'+DN+'.js）。</div>';return;}

const DAYMETA=[
  {n:'1',t:'看见问题',s:'观察 + 减法'},
  {n:'2',t:'想出办法',s:'除法 + 一专多能 + 乘法'},
  {n:'3',t:'做出原型',s:'属性关联 + 盒内思考'},
  {n:'4',t:'测试迭代',s:'单变量 + 系统'},
  {n:'5',t:'讲给世界',s:'整合 + 路演'}
];

/* ---------- config ---------- */
const ACC=D.acc||'#F5C451', ACC2=D.acc2||'#FFE3A6', RGB=D.rgb||'245,196,81';
document.documentElement.style.setProperty('--acc',ACC);
document.documentElement.style.setProperty('--acc2',ACC2);
document.documentElement.style.setProperty('--acc-rgb',RGB);

/* ---------- archive ---------- */
const KEY='fxm_camp_v1';
let A={v:1,team:{name:'',members:['','','','']},xp:0,days:{},badges:{},startedAt:Date.now()};
try{const raw=JSON.parse(localStorage.getItem(KEY)||'null');if(raw&&typeof raw==='object')A=Object.assign(A,raw);}catch(e){}
if(!A.team)A.team={name:'',members:['','','','']};
if(!A.days)A.days={};if(!A.badges)A.badges={};
const S=A.days[DN]=A.days[DN]||{};
let saveTimer=null;
function flush(){try{localStorage.setItem(KEY,JSON.stringify(A));}catch(e){}}
function save(){clearTimeout(saveTimer);saveTimer=setTimeout(flush,180);}
function saveNow(){flush();}

/* ---------- audio ---------- */
let AC=null,muted=false;
try{muted=localStorage.getItem('fxm_camp_muted')==='1';}catch(e){}
function ac(){if(!AC){const X=window.AudioContext||window.webkitAudioContext;if(!X)return null;AC=new X();}if(AC.state==='suspended')AC.resume().catch(()=>{});return AC;}
function tone(f,d,type,v,delay){if(muted)return;const c=ac();if(!c)return;const t=c.currentTime+(delay||0);const o=c.createOscillator(),g=c.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v==null?.045:v,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+d+.05);}
function sweep(f1,f2,d,v){if(muted)return;const c=ac();if(!c)return;const t=c.currentTime,o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.setValueAtTime(f1,t);o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(v||.04,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+d+.05);}
function noise(d,v,f){if(muted)return;const c=ac();if(!c)return;const n=Math.floor(c.sampleRate*d),b=c.createBuffer(1,n,c.sampleRate),a=b.getChannelData(0);for(let i=0;i<n;i++)a[i]=(Math.random()*2-1)*(1-i/n);const s=c.createBufferSource();s.buffer=b;const q=c.createBiquadFilter();q.type='bandpass';q.frequency.value=f||900;q.Q.value=.7;const g=c.createGain();g.gain.value=v||.045;s.connect(q);q.connect(g);g.connect(c.destination);s.start();}
function sfx(n){
  switch(n){
    case 'tap':tone(520,.05,'square',.02);break;
    case 'pop':sweep(620,980,.12,.055);break;
    case 'chime':[523,659,784].forEach((f,i)=>tone(f,.35,'sine',.045,i*.08));break;
    case 'success':[523,659,784,1047].forEach((f,i)=>tone(f,.4,'sine',.05,i*.09));break;
    case 'whoosh':noise(.28,.045,600);break;
    case 'bell':tone(880,.6,'triangle',.06);tone(1320,.5,'sine',.035,.04);break;
    case 'error':tone(220,.16,'sawtooth',.03);break;
    case 'coin':tone(988,.08,'triangle',.05);tone(1318,.18,'triangle',.045,.06);break;
  }
}
function toggleSound(){muted=!muted;try{localStorage.setItem('fxm_camp_muted',muted?'1':'0');}catch(e){}const b=$('#btnSound');if(b){b.classList.toggle('on',!muted);const s=b.querySelector('span');if(s)s.textContent=muted?'静音':'声音';}if(!muted)sfx('chime');}

/* ---------- sky ---------- */
(function sky(){
  const cv=$('#sky');if(!cv)return;const ctx=cv.getContext('2d');let w=0,h=0,dpr=Math.min(2,devicePixelRatio||1),stars=[],last=0,shoot=null;
  function size(){w=innerWidth;h=innerHeight;cv.width=w*dpr;cv.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);stars=Array.from({length:Math.min(120,Math.round(w*h/17000))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.2+.2,a:Math.random(),s:Math.random()*.015+.003}));}
  size();addEventListener('resize',size);
  function loop(t){
    ctx.clearRect(0,0,w,h);
    for(const s of stars){s.a+=s.s;ctx.fillStyle='rgba(247,242,230,'+(0.08+0.36*Math.abs(Math.sin(s.a))).toFixed(3)+')';ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,6.29);ctx.fill();}
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&t-last>12000&&!shoot){last=t;shoot={x:Math.random()*w*.6+w*.2,y:Math.random()*h*.25,l:0};}
    if(shoot){shoot.l+=7;shoot.x+=5.6;shoot.y+=1.8;const g=ctx.createLinearGradient(shoot.x-60,shoot.y-20,shoot.x,shoot.y);g.addColorStop(0,'rgba(255,227,166,0)');g.addColorStop(1,'rgba(255,227,166,.5)');ctx.strokeStyle=g;ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(shoot.x-60,shoot.y-20);ctx.lineTo(shoot.x,shoot.y);ctx.stroke();if(shoot.l>240)shoot=null;}
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

/* ---------- fx ---------- */
const fxCv=$('#fx'),fxCtx=fxCv?fxCv.getContext('2d'):null;
let parts=[],fxRunning=false;
function fxSize(){if(!fxCv)return;const d=Math.min(2,devicePixelRatio||1);fxCv.width=innerWidth*d;fxCv.height=innerHeight*d;fxCv.style.width=innerWidth+'px';fxCv.style.height=innerHeight+'px';fxCtx.setTransform(d,0,0,d,0,0);}
fxSize();addEventListener('resize',fxSize);
function burst(x,y,n,colors){
  if(!fxCtx)return;
  const cs=colors||[ACC,ACC2,'#4FE0D0','#FF7A6B','#A78BFA','#FFF'];
  for(let i=0;i<(n||24);i++){const a=Math.random()*6.28,s=2+Math.random()*6;parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-2,g:.22,life:0,max:50+Math.random()*40,size:2+Math.random()*3,color:cs[(Math.random()*cs.length)|0],rot:Math.random()*6.28,vr:(Math.random()-.5)*.3,c:Math.random()<.4});}
  startFx();
}
function confetti(n){
  if(!fxCtx)return;
  const cs=[ACC,ACC2,'#4FE0D0','#FF7A6B','#A78BFA','#FFF','#8BD17C'];
  for(let i=0;i<(n||80);i++){parts.push({x:innerWidth/2+(Math.random()-.5)*innerWidth*.6,y:innerHeight*.3+Math.random()*70,vx:(Math.random()-.5)*8,vy:-Math.random()*10-2,g:.25,life:0,max:100+Math.random()*70,size:2+Math.random()*4,color:cs[(Math.random()*cs.length)|0],rot:Math.random()*6.28,vr:(Math.random()-.5)*.35,c:Math.random()<.4});}
  startFx();
}
function startFx(){if(!fxRunning&&fxCtx){fxRunning=true;requestAnimationFrame(fxLoop);}}
function fxLoop(){
  fxCtx.clearRect(0,0,innerWidth,innerHeight);
  for(let i=parts.length-1;i>=0;i--){const p=parts[i];p.life++;p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.vx*=.995;p.rot+=p.vr;
    fxCtx.save();fxCtx.globalAlpha=Math.max(0,1-p.life/p.max);fxCtx.translate(p.x,p.y);fxCtx.rotate(p.rot);fxCtx.fillStyle=p.color;
    if(p.c){fxCtx.beginPath();fxCtx.arc(0,0,p.size*.6,0,6.29);fxCtx.fill();}else fxCtx.fillRect(-p.size/2,-p.size/2,p.size,p.size*1.6);
    fxCtx.restore();if(p.life>=p.max||p.y>innerHeight+40)parts.splice(i,1);}
  if(parts.length)requestAnimationFrame(fxLoop);else{fxRunning=false;fxCtx.clearRect(0,0,innerWidth,innerHeight);}
}

/* ---------- toast / modal ---------- */
let toastTimer=null;
function toast(msg,icon){
  const el=$('#toast');if(!el)return;
  $('#toastText').textContent=msg;const i=el.querySelector('i');if(i)i.textContent=icon||'✓';
  el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2500);
}
function openModal(html){
  const m=$('#modal'),box=$('#modalBox');if(!m)return;
  box.innerHTML=html;m.classList.add('show');
  const x=box.querySelector('.modal-x,[data-close]');if(x)x.onclick=closeModal;
  m.onclick=e=>{if(e.target===m)closeModal();};
}
function closeModal(){const m=$('#modal');if(m)m.classList.remove('show');const b=$('#modalBox');if(b)b.innerHTML='';}

/* ---------- evidence archive ---------- */
function setEvidence(ev){
  if(!ev)return;
  S.evidence=Object.assign({ts:Date.now(),day:DN},ev);
  A.days[DN]=S;saveNow();
  return S.evidence;
}
function dayData(n){return A.days[String(n)]||{};}
function markDone(){S.done=true;S.ts=Date.now();A.xp=Math.max(A.xp||0,0);saveNow();}
function grantBadge(id,name){
  A.badges[id]={name:name,day:DN,ts:Date.now()};
  A.days[DN]=S;saveNow();
}
function addXp(n){S.xp=(S.xp||0)+n;A.xp=(A.xp||0)+n;save();}
function teamName(){return (A.team&&A.team.name)||'小小发明家';}

/* ---------- drawing ---------- */
function initDrawing(root,onChange){
  const cv=root.querySelector('[data-draw]');if(!cv)return null;
  const ctx=cv.getContext('2d');ctx.lineCap='round';ctx.lineJoin='round';
  let color=ACC,size=6,erasing=false,drawing=false,last=null,undoStack=[];
  const pos=e=>{const r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)*cv.width/r.width,y:(e.clientY-r.top)*cv.height/r.height};};
  function pushUndo(){try{undoStack.push(cv.toDataURL('image/png'));if(undoStack.length>12)undoStack.shift();}catch(e){}}
  function hideHint(){const h=root.querySelector('.hintline');if(h)h.classList.add('hide');}
  function saveDraw(){if(onChange){try{onChange(cv.toDataURL('image/png'));}catch(e){}}}
  cv.addEventListener('pointerdown',e=>{e.preventDefault();cv.setPointerCapture(e.pointerId);pushUndo();drawing=true;last=pos(e);ctx.globalCompositeOperation=erasing?'destination-out':'source-over';ctx.strokeStyle=color;ctx.lineWidth=erasing?size*2.3:size;ctx.fillStyle=color;ctx.beginPath();ctx.arc(last.x,last.y,ctx.lineWidth/2,0,6.29);if(!erasing)ctx.fill();hideHint();});
  cv.addEventListener('pointermove',e=>{if(!drawing)return;e.preventDefault();const p=pos(e);ctx.globalCompositeOperation=erasing?'destination-out':'source-over';ctx.strokeStyle=color;ctx.lineWidth=erasing?size*2.3:size;ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.stroke();last=p;});
  const end=()=>{if(!drawing)return;drawing=false;saveDraw();};
  cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);cv.addEventListener('pointerleave',()=>{if(drawing)end();});
  const tool=root.querySelector('[data-draw-tools]');
  if(tool){
    $$('[data-color]',tool).forEach(b=>b.addEventListener('click',()=>{color=b.dataset.color;erasing=false;$$('[data-color]',tool).forEach(x=>x.classList.toggle('on',x===b));const er=tool.querySelector('[data-eraser]');if(er)er.classList.remove('on');sfx('tap');}));
    $$('[data-size]',tool).forEach(b=>b.addEventListener('click',()=>{size=+b.dataset.size;erasing=false;$$('[data-size]',tool).forEach(x=>x.classList.toggle('on',x===b));const er=tool.querySelector('[data-eraser]');if(er)er.classList.remove('on');sfx('tap');}));
    const er=tool.querySelector('[data-eraser]');if(er)er.addEventListener('click',()=>{erasing=!erasing;er.classList.toggle('on',erasing);sfx('tap');});
    const un=tool.querySelector('[data-undo]');if(un)un.addEventListener('click',()=>{const d=undoStack.pop();if(!d)return;const img=new Image();img.onload=()=>{ctx.clearRect(0,0,cv.width,cv.height);ctx.drawImage(img,0,0);saveDraw();};img.src=d;});
    const cl=tool.querySelector('[data-clear]');if(cl)cl.addEventListener('click',()=>{pushUndo();ctx.clearRect(0,0,cv.width,cv.height);saveDraw();const h=root.querySelector('.hintline');if(h)h.classList.remove('hide');});
  }
  return {
    toDataURL:()=>cv.toDataURL('image/png'),
    load(url){if(!url)return;const img=new Image();img.onload=()=>{ctx.clearRect(0,0,cv.width,cv.height);ctx.drawImage(img,0,0,cv.width,cv.height);hideHint();};img.src=url;},
    clear(){ctx.clearRect(0,0,cv.width,cv.height);saveDraw();}
  };
}

/* ---------- evidence card ---------- */
function wrapText(c,text,maxW){
  const chars=Array.from(String(text||''));const lines=[];let line='';
  for(const ch of chars){if(ch==='\n'){lines.push(line);line='';continue;}const test=line+ch;if(c.measureText(test).width>maxW&&line){lines.push(line);line=ch;}else line=test;}
  if(line)lines.push(line);return lines.length?lines:[''];
}
function makeEvidence(o){
  o=o||{};
  const W=1600,H=1120,cv=document.createElement('canvas');cv.width=W;cv.height=H;const c=cv.getContext('2d');
  c.fillStyle='#FBF3DE';c.fillRect(0,0,W,H);
  const g=c.createRadialGradient(W*.82,0,10,W*.82,0,720);g.addColorStop(0,'rgba(245,196,81,.2)');g.addColorStop(1,'rgba(245,196,81,0)');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.strokeStyle='rgba(160,120,40,.45)';c.lineWidth=2;c.strokeRect(36,36,W-72,H-72);
  c.strokeStyle='rgba(160,120,40,.2)';c.lineWidth=1;c.strokeRect(50,50,W-100,H-100);
  c.fillStyle='#2B3A67';c.font='700 24px "Noto Sans SC","PingFang SC",sans-serif';c.fillText('GENESIS · 发小明创新学院',92,108);
  c.fillStyle='#8A6212';c.font='500 13px "Noto Sans SC","PingFang SC",sans-serif';c.fillText('INVENT FOR ONE · 发明冲刺营 5 天',92,136);
  c.textAlign='right';c.fillStyle='#8A6212';c.font='500 13px "Noto Sans SC",sans-serif';
  c.fillText(o.code||('FXM-CAMP-D'+DN),W-92,124);c.textAlign='left';
  c.fillStyle='#1C2333';c.font='900 50px "Noto Serif SC","Songti SC",serif';c.fillText(o.title||('第 '+DN+' 天 · 证据卡'),92,214);
  c.fillStyle='#6B748F';c.font='500 16px "Noto Sans SC",sans-serif';c.fillText(o.subtitle||'',92,244);
  c.strokeStyle='#1C2333';c.lineWidth=3;c.beginPath();c.moveTo(92,278);c.lineTo(W-92,278);c.stroke();
  c.fillStyle='#8A93A6';c.font='500 12.5px "Noto Sans SC",sans-serif';c.fillText('小组 / 发明家',92,318);
  c.fillStyle='#1C2333';c.font='700 27px "Noto Serif SC","Songti SC",serif';c.fillText(o.name||teamName(),92,354);
  c.textAlign='right';c.fillStyle='#8A93A6';c.font='500 12.5px "Noto Sans SC",sans-serif';c.fillText(o.date||new Date().toLocaleDateString('zh-CN'),W-92,318);c.textAlign='left';

  let y=404;
  (o.fields||[]).forEach(f=>{
    c.fillStyle='#8A6212';c.font='700 12px "Noto Sans SC",sans-serif';c.fillText(f.label||'',92,y);y+=24;
    c.fillStyle='#2B3A67';c.font='500 19px "Noto Sans SC",sans-serif';
    wrapText(c,f.value||'—',800).forEach(ln=>{c.fillText(ln,92,y);y+=30;});
    y+=12;
  });

  // 右栏：5 天成长线
  const bx=960,by=300,bw=548,bh=600;
  c.fillStyle='#FFFCF3';c.strokeStyle='rgba(160,120,40,.35)';c.lineWidth=2;c.beginPath();c.rect(bx,by,bw,bh);c.fill();c.stroke();
  c.fillStyle='#8A6212';c.font='700 12px "Noto Sans SC",sans-serif';c.fillText('5 天成长线 · GROWTH LINE',bx+20,by+30);
  DAYMETA.forEach((m,i)=>{
    const yy=by+70+i*100;
    const done=!!(A.days[m.n]&&A.days[m.n].done);
    const cur=(m.n===DN);
    if(cur){c.fillStyle='rgba(245,196,81,.16)';c.fillRect(bx+14,yy-14,bw-28,76);}
    c.beginPath();c.arc(bx+44,yy+14,17,0,6.29);
    c.fillStyle=done?'#2B3A67':'#EDE3C9';c.fill();
    c.strokeStyle=done?'#2B3A67':'rgba(160,120,40,.4)';c.lineWidth=2;c.stroke();
    c.textAlign='center';c.fillStyle=done?'#FBF3DE':'#A98B52';c.font='700 15px "Noto Sans SC",sans-serif';c.fillText('D'+m.n,bx+44,yy+19);c.textAlign='left';
    c.fillStyle=cur?'#8A6212':'#1C2333';c.font=(cur?'700':'500')+' 18px "Noto Serif SC",serif';c.fillText(m.t,bx+76,yy+12);
    c.fillStyle='#8A93A6';c.font='500 11.5px "Noto Sans SC",sans-serif';c.fillText(m.s,bx+76,yy+32);
    if(done){c.strokeStyle='#8BD17C';c.lineWidth=3;c.beginPath();c.moveTo(bx+bw-58,yy+10);c.lineTo(bx+bw-48,yy+20);c.lineTo(bx+bw-30,yy-2);c.stroke();}
  });
  if(o.drawing){
    const pad=20,maxW=bw-pad*2,maxH=86;
    c.fillStyle='#8A6212';c.font='700 11px "Noto Sans SC",sans-serif';c.fillText('我的草图',bx+20,by+bh-56);
    try{const img=document.createElement('img');img.src=o.drawing;if(img.complete){const sc=Math.min(maxW/img.width,maxH/img.height);c.drawImage(img,bx+(bw-img.width*sc)/2,by+bh-maxH-14,img.width*sc,img.height*sc);}}catch(e){}
  }

  c.strokeStyle='rgba(28,35,51,.22)';c.lineWidth=2;c.beginPath();c.moveTo(92,H-112);c.lineTo(W-92,H-112);c.stroke();
  c.fillStyle='#8A93A6';c.font='500 12.5px "Noto Sans SC",sans-serif';c.fillText('发小明 Genesis 创新学院 · 让每个孩子都拥有创造的能力',92,H-78);
  c.textAlign='right';c.fillText(o.footer||'观察 → 办法 → 原型 → 测试 → 表达',W-92,H-78);c.textAlign='left';
  c.save();c.translate(W-214,H-196);c.rotate(-.16);
  c.strokeStyle='rgba(197,46,46,.5)';c.lineWidth=3;c.beginPath();c.arc(0,0,58,0,6.29);c.stroke();
  c.fillStyle='rgba(197,46,46,.68)';c.textAlign='center';c.font='700 15px "Noto Serif SC",serif';c.fillText(o.stamp||'证据卡',0,-4);
  c.font='500 10.5px "Noto Sans SC",sans-serif';c.fillText('DAY '+DN+' / 5',0,16);c.restore();c.textAlign='left';
  return cv;
}

function previewSheet(o){
  const cv=makeEvidence(o);const url=cv.toDataURL('image/png');
  openModal('<button class="modal-x" data-close>×</button><div class="sheet-preview"><img src="'+url+'" alt="证据卡"></div><div class="modal-actions"><button class="btn primary" id="sheetDl">下载证据卡</button><button class="btn ghost" data-close>继续完善</button></div>');
  const dl=$('#sheetDl');if(dl)dl.onclick=()=>{const a=document.createElement('a');a.download=(o.filename||('证据卡_Day'+DN))+'.png';a.href=url;a.click();sfx('success');toast('证据卡已下载','⬇️');};
  sfx('success');confetti(70);
}

/* ---------- growth certificate (Day 5) ---------- */
function makeGrowth(){
  const W=1700,H=1200,cv=document.createElement('canvas');cv.width=W;cv.height=H;const c=cv.getContext('2d');
  const g=c.createLinearGradient(0,0,W,H);g.addColorStop(0,'#0A1024');g.addColorStop(.55,'#111A38');g.addColorStop(1,'#0A1024');
  c.fillStyle=g;c.fillRect(0,0,W,H);
  c.strokeStyle='rgba(245,196,81,.5)';c.lineWidth=3;c.strokeRect(44,44,W-88,H-88);
  c.strokeStyle='rgba(245,196,81,.2)';c.lineWidth=1;c.strokeRect(60,60,W-120,H-120);
  c.textAlign='center';
  c.fillStyle='#F5C451';c.font='600 13px "Noto Sans SC",sans-serif';c.fillText('G E N E S I S   ·   I N V E N T   F O R   O N E',W/2,132);
  c.fillStyle='#F7F2E6';c.font='900 62px "Noto Serif SC","Songti SC",serif';c.fillText('5 天发明冲刺营 · 结营证书',W/2,224);
  c.fillStyle='rgba(247,242,230,.72)';c.font='500 20px "Noto Sans SC",sans-serif';c.fillText('为一个人发明一件东西',W/2,272);
  c.fillStyle='#FFE3A6';c.font='700 44px "Noto Serif SC",serif';c.fillText(teamName(),W/2,368);
  c.fillStyle='rgba(247,242,230,.55)';c.font='500 15px "Noto Sans SC",sans-serif';c.fillText('完成 5 天 5 条证据线 · 从问题到能被测试的原型',W/2,406);
  c.strokeStyle='rgba(245,196,81,.25)';c.lineWidth=1;c.beginPath();c.moveTo(200,446);c.lineTo(W-200,446);c.stroke();

  DAYMETA.forEach((m,i)=>{
    const x=150+i*286,y=486,w=250,h=300;
    const dd=dayData(m.n);const done=!!dd.done;
    c.fillStyle=done?'rgba(245,196,81,.08)':'rgba(255,255,255,.03)';
    c.strokeStyle=done?'rgba(245,196,81,.5)':'rgba(255,255,255,.12)';c.lineWidth=2;
    c.beginPath();c.rect(x,y,w,h);c.fill();c.stroke();
    c.textAlign='left';
    c.fillStyle='#F5C451';c.font='700 14px "Noto Sans SC",sans-serif';c.fillText('DAY '+m.n, x+20,y+34);
    c.fillStyle='#F7F2E6';c.font='700 26px "Noto Serif SC",serif';c.fillText(m.t,x+20,y+74);
    c.fillStyle='rgba(247,242,230,.5)';c.font='500 12px "Noto Sans SC",sans-serif';c.fillText(m.s,x+20,y+100);
    const val=(dd.evidence&&(dd.evidence.short||dd.evidence.title))||(done?'已完成':'—');
    c.fillStyle='rgba(247,242,230,.78)';c.font='500 14px "Noto Sans SC",sans-serif';
    wrapText(c,val,w-40).slice(0,7).forEach((ln,k)=>{c.fillText(ln,x+20,y+140+k*24);});
    c.fillStyle=done?'#8BD17C':'rgba(255,255,255,.2)';c.font='600 12px "Noto Sans SC",sans-serif';
    c.fillText(done?'✓ 证据已记录':'未记录',x+20,y+h-24);
    c.textAlign='center';
  });
  c.textAlign='center';
  c.fillStyle='rgba(247,242,230,.6)';c.font='500 14px "Noto Sans SC",sans-serif';
  c.fillText('发小明 Genesis 创新学院 · 世界创新港 · '+new Date().toLocaleDateString('zh-CN'),W/2,H-70);
  return cv;
}
function previewGrowth(){
  const cv=makeGrowth();const url=cv.toDataURL('image/png');
  openModal('<button class="modal-x" data-close>×</button><div class="sheet-preview"><img src="'+url+'" alt="结营证书"></div><div class="modal-actions"><button class="btn primary" id="gDl">下载结营证书</button><button class="btn ghost" data-close>继续</button></div>');
  const dl=$('#gDl');if(dl)dl.onclick=()=>{const a=document.createElement('a');a.download='发小明_5天发明冲刺营_结营证书.png';a.href=url;a.click();sfx('success');toast('结营证书已下载','🏅');};
  sfx('success');confetti(120);
}

/* ---------- timer ---------- */
function timer(root,opts){
  opts=opts||{};
  const box=root.querySelector('[data-timer]');if(!box)return null;
  const num=box.querySelector('[data-timer-num]'),bar=box.querySelector('[data-timer-bar]'),start=box.querySelector('[data-timer-start]'),reset=box.querySelector('[data-timer-reset]');
  const total=opts.seconds||60;let left=total,id=null,running=false;
  const paint=()=>{if(num){num.textContent=Math.ceil(left);num.classList.toggle('warn',left<=10&&left>0);}if(bar)bar.style.width=(left/total*100)+'%';if(opts.onTick)opts.onTick(left,total);};
  const stop=()=>{clearInterval(id);id=null;running=false;if(start)start.textContent='开始 '+total+' 秒';};
  if(start)start.onclick=()=>{if(running){stop();start.textContent='继续';return;}if(left<=0)left=total;running=true;start.textContent='暂停';sfx('tap');id=setInterval(()=>{left-=1;paint();if(left<=5&&left>0)sfx('tap');if(left<=0){stop();sfx('bell');if(opts.onEnd)opts.onEnd();}},1000);};
  if(reset)reset.onclick=()=>{stop();left=total;paint();sfx('tap');};
  paint();
  return {reset(){stop();left=total;paint();},start(){if(start)start.click();}};
}

/* ---------- ai prompts ---------- */
function aiPanel(root,opts){
  opts=opts||{};
  const btn=root.querySelector('[data-ai]'),out=root.querySelector('[data-ai-out]');
  if(!btn||!out)return null;
  const prompts=opts.prompts||[];let i=0;
  btn.onclick=()=>{if(!prompts.length)return;const p=prompts[i%prompts.length];i++;
    out.innerHTML='<b>追问 · '+i+'</b><span>'+esc(p)+'</span>';out.classList.remove('show');void out.offsetWidth;out.classList.add('show');sfx('chime');};
  return {next:()=>btn.click()};
}

/* ---------- drag bins ---------- */
function dragBins(root,opts){
  opts=opts||{};
  const cards=$$('.sort-card',root),bins=$$('.sort-bin',root);
  let selected=null,done=0;const total=cards.length;
  function place(card,bin){
    if(!card||!bin||card.classList.contains('placed'))return;
    if(card.dataset.answer===bin.dataset.bin){
      card.classList.remove('selected');card.classList.add('placed','correct');
      const list=bin.querySelector('.bin-list')||bin;list.appendChild(card);
      selected=null;done++;sfx('pop');if(opts.onCorrect)opts.onCorrect(card,bin);if(done===total&&opts.onDone)opts.onDone();
    }else{card.classList.add('wrong');setTimeout(()=>card.classList.remove('wrong'),520);sfx('error');if(opts.onWrong)opts.onWrong(card,bin);}
  }
  cards.forEach(card=>{
    card.draggable=true;
    card.addEventListener('click',e=>{e.stopPropagation();if(card.classList.contains('placed'))return;selected=card;cards.forEach(c=>c.classList.toggle('selected',c===card));sfx('tap');});
    card.addEventListener('dragstart',e=>{if(card.classList.contains('placed')){e.preventDefault();return;}selected=card;try{e.dataTransfer.setData('text/plain',card.dataset.key||'');}catch(err){}card.classList.add('dragging');});
    card.addEventListener('dragend',()=>card.classList.remove('dragging'));
  });
  bins.forEach(bin=>{
    bin.addEventListener('click',()=>{if(selected)place(selected,bin);});
    bin.addEventListener('dragover',e=>{e.preventDefault();bin.classList.add('over');});
    bin.addEventListener('dragleave',()=>bin.classList.remove('over'));
    bin.addEventListener('drop',e=>{e.preventDefault();bin.classList.remove('over');if(selected)place(selected,bin);});
  });
  return {reset(){cards.forEach(c=>{c.classList.remove('placed','correct','wrong','selected');const home=root.querySelector('.sort-pool');if(home)home.appendChild(c);});done=0;}};
}

/* ---------- cover ---------- */
function coverHTML(){
  const words=(D.words||[]).slice(0,4);
  const metas=(D.meta||[]).slice();
  return '<div class="cover-grid">'+
    '<div class="cover-copy">'+
      '<div class="kicker">'+esc(D.kicker||('DAY '+DN+' / 5'))+'</div>'+
      '<h1>'+esc(D.line1||D.title||'')+'<span class="line2">'+esc(D.line2||D.title||'')+'</span></h1>'+
      '<p class="cover-lead">'+(D.lead||'')+'</p>'+
      '<div class="cover-meta">'+
        '<span class="gold">DAY '+DN+' / 5</span>'+
        (D.tool?'<span>'+esc(toolLabel(D.tool))+'</span>':'')+
        metas.map(m=>'<span>'+esc(m)+'</span>').join('')+
      '</div>'+
      '<div class="cover-actions"><button class="btn primary" data-go="1">进入今日第 1 幕</button><button class="btn ghost" data-notes>教师指引</button><button class="btn ghost" data-team>设置小组</button></div>'+
    '</div>'+
    '<div class="portal" aria-hidden="true">'+
      '<svg class="rings" viewBox="0 0 520 520" fill="none">'+
        '<circle cx="260" cy="260" r="250" stroke="rgba(255,255,255,.08)" stroke-dasharray="2 9"/>'+
        '<g class="ring-a"><circle cx="260" cy="260" r="206" stroke="rgba('+RGB+',.3)" stroke-dasharray="1 11"/></g>'+
        '<g class="ring-b"><circle cx="260" cy="260" r="160" stroke="rgba(255,255,255,.14)" stroke-dasharray="1 13"/></g>'+
      '</svg>'+
      '<div class="portal-core"><b>0'+DN+'</b></div>'+
      words.map((w,i)=>'<div class="portal-word pw'+(i+1)+'">'+esc(w)+'</div>').join('')+
    '</div>'+
  '</div>'+
  '<div class="cover-foot"><span>发小明 Genesis 创新学院 · 发明冲刺营 · 为一个人发明一件东西</span>'+
  '<span><kbd>→</kbd>前进 <kbd>T</kbd>教师指引 <kbd>F</kbd>全屏 <kbd>M</kbd>静音</span></div>';
}

/* ---------- finale ---------- */
function finaleHTML(f,A_){
  const ev=typeof f.evidence==='function'?f.evidence():f.evidence;
  const jl=f.journey||[];
  const journeys=jl.map(j=>'<div class="jstep"><span class="ji">'+j.i+'</span><b>'+esc(j.b)+'</b><span>'+esc(j.s)+'</span></div>').join('');
  const reflects=(f.reflect||[]).map((r,i)=>'<div><b>想一想 0'+(i+1)+'</b><p>'+esc(r)+'</p></div>').join('');
  return '<div class="finale">'+
    '<div class="badge-stage"><div class="badge-rays"></div><div class="badge"><div class="badge-inner">'+
      '<span class="b-kicker">GENESIS · CAMP</span><div class="b-ic">'+(f.badge.icon||'🏅')+'</div>'+
      '<b>'+esc(f.badge.name||'徽章')+'</b><span class="bn">'+esc(teamName())+'</span><span class="b-date">DAY '+DN+' / 5 · '+esc(D.title||'')+'</span>'+
    '</div></div></div>'+
    '<h2>'+f.headline+'</h2><p class="sub">'+f.sub+'</p>'+
    (journeys?'<div class="journey'+(jl.length!==4?' j'+jl.length:'')+'">'+journeys+'</div>':'')+
    (reflects?'<div class="reflect">'+reflects+'</div>':'')+
    (f.homework?'<div class="homework"><span class="hi">🏠</span><div><b>'+esc(f.homework.title)+'</b><p>'+esc(f.homework.body)+'</p></div></div>':'')+
    '<div class="final-actions">'+
      '<button class="btn primary" data-cert>下载今日证据卡</button>'+
      (f.cert==='growth'?'<button class="btn" data-growth>下载结营证书</button>':'')+
      '<button class="btn ghost" data-go="1">重看今天</button>'+
      '<a class="btn ghost" href="index.html">回到营总览</a>'+
    '</div>'+
    '<div class="final-quote">'+f.quote+'</div>'+
  '</div>';
}
function renderFinale(sec,f){
  sec.innerHTML='<div class="ch-body">'+finaleHTML(f)+'</div>';
  const cert=sec.querySelector('[data-cert]');
  if(cert)cert.onclick=()=>{
    const ev=typeof f.evidence==='function'?f.evidence():f.evidence;
    previewSheet(Object.assign({title:'第 '+DN+' 天 · 证据卡',subtitle:(D.title||'')+' · '+(D.tool||''),name:teamName(),code:'FXM-CAMP-D'+DN,stamp:f.badge.name||'证据卡',footer:'第 '+DN+' 天 / 5'},ev));
    if(!S.done){markDone();addXp(20);}
  };
  const gr=sec.querySelector('[data-growth]');
  if(gr)gr.onclick=()=>previewGrowth();
  markDone();
  if(!S.xp){addXp(10);}
}

/* ---------- build ---------- */
const ACTS=(D.acts||[]).slice();
const TOTAL=ACTS.length+1;
const deck=$('#deck');
deck.innerHTML='<section class="ch cover" data-ch="0"><div class="ch-body">'+coverHTML()+'</div></section>'+
  ACTS.map((a,i)=>'<section class="ch" data-ch="'+(i+1)+'" data-act="'+esc(a.a||pad(i+1))+'" data-title="'+esc(a.name||'')+'"><div class="ch-body">'+(a.html||'')+'</div></section>').join('');

function buildDots(){
  const labels=['序章'].concat(ACTS.map(a=>a.name||''));
  $('#dots').innerHTML=labels.map((l,i)=>'<button class="dot'+(i===0?' active':'')+'" data-i="'+i+'" data-label="'+esc(l)+'" aria-label="第 '+i+' 幕 '+esc(l)+'">'+(i===0?'序':pad(i))+'</button>').join('');
  $$('#dots .dot').forEach(d=>d.addEventListener('click',()=>go(+d.dataset.i)));
}

let cur=0;
function go(n,opts){
  opts=opts||{};
  n=clamp(n,0,TOTAL-1);
  if(n===cur&&!opts.force)return;
  if(!opts.instant&&n>cur){showCurtain(n);sfx('whoosh');}else if(!opts.instant&&n<cur)sfx('tap');
  cur=n;
  $$('.ch').forEach(el=>el.classList.remove('active'));
  const sec=$('.ch[data-ch="'+n+'"]');
  if(sec){
    if(!sec.dataset.built&&ACTS[n-1]&&typeof ACTS[n-1].build==='function'){
      sec.dataset.built='1';
      try{ACTS[n-1].build(sec,api);}catch(e){console.error('[build '+n+']',e);}
    }
    sec.classList.add('active');
  }
  document.body.className='d-'+DN+' ch-'+n;
  $$('#dots .dot').forEach((d,i)=>{d.classList.toggle('active',i===n);d.classList.toggle('done',i<n);});
  $('#progressBar').style.width=(n/(TOTAL-1)*100)+'%';
  $('#tbAct').textContent='DAY '+DN;
  $('#tbTitle').textContent=n===0?(D.title||''):(ACTS[n-1]?ACTS[n-1].name:'');
  const nextLabel=n>=TOTAL-1?'回到营总览':(ACTS[n].name||'下一幕');
  $('#nextLabel').textContent=nextLabel;
  renderNotes(n);
  onEnter(n);
  if(sec)sec.scrollTop=0;
}

function onEnter(n){
  if(n<=0)return;
  const sec=$('.ch[data-ch="'+n+'"]'),a=ACTS[n-1];if(!sec||!a)return;
  if(a.init&&!a._bound){a._bound=true;try{a.init(sec,api);}catch(e){console.error('[init act '+n+']',e);}}
  if(a.onEnter){try{a.onEnter(sec,api);}catch(e){console.error('[enter act '+n+']',e);}}
}

let curtainTimer=null;
function showCurtain(n){
  const el=$('#curtainTrans');if(!el)return;
  const label=n===0?'序章':(ACTS[n-1]?ACTS[n-1].name:'');
  $('#curtainNo').textContent='DAY '+DN+' / 5';
  $('#curtainTitle').textContent=label;
  el.classList.add('show');clearTimeout(curtainTimer);curtainTimer=setTimeout(()=>el.classList.remove('show'),420);
}

function renderNotes(n){
  const sched=$('#noteSched'),body=$('#noteBody');if(!sched||!body)return;
  const labels=['序章'].concat(ACTS.map(a=>a.name||''));
  sched.innerHTML=labels.map((l,i)=>'<div class="ns-item'+(i===n?' on':'')+'" data-note="'+i+'"><b>'+(i===0?'序':pad(i))+'</b><span>'+esc(l)+'</span><i>'+(i===0?'':(ACTS[i-1].time||''))+'</i></div>').join('');
  $$('#noteSched .ns-item').forEach(el=>el.addEventListener('click',()=>go(+el.dataset.note)));
  const note=(D.notes||[])[n]||(D.notes||[])[0];
  body.innerHTML=note?note.html:'<div class="note-block"><p>暂无教师指引。</p></div>';
}
function toggleNotes(force){
  const el=$('#notes');if(!el)return;
  const on=force==null?!el.classList.contains('open'):force;
  el.classList.toggle('open',on);$('#btnNotes').classList.toggle('on',on);
  if(on){renderNotes(cur);sfx('tap');}
}

/* ---------- team ---------- */
function openTeam(){
  const t=A.team||{name:'',members:['','','','']};
  const roles=['队长','记录员','材料员','发言人'];
  openModal('<button class="modal-x" data-close>×</button><div style="padding:24px 26px">'+
    '<div class="kicker">TEAM SETUP</div><h3 style="font-family:var(--serif);font-size:24px;margin:10px 0 6px">我们的小组</h3>'+
    '<p style="font-size:12px;color:var(--dim);line-height:1.7;margin-bottom:14px">名字会出现在每天的<b style="color:var(--gold2)">证据卡</b>和结营证书上。角色每天轮换一次。</p>'+
    '<div class="cp-field" style="margin-bottom:10px"><label>小组名</label><input id="tmName" maxlength="18" placeholder="例如：拆拆拆小队" value="'+esc(t.name)+'"></div>'+
    '<div class="cp-cards c2">'+roles.map((r,i)=>'<div class="cp-field"><label>'+r+'</label><input data-mem="'+i+'" maxlength="10" placeholder="名字" value="'+esc((t.members||[])[i]||'')+'"></div>').join('')+'</div>'+
    '<div class="modal-actions" style="margin-top:16px;border:0;padding:0"><button class="btn primary" id="tmSave">保存</button><button class="btn ghost" data-close>取消</button></div>'+
    '</div>');
  $('#tmSave').onclick=()=>{
    A.team.name=($('#tmName').value||'').trim();
    A.team.members=$$('[data-mem]').map(el=>el.value.trim());
    saveNow();paintTeam();closeModal();toast('小组已保存','👥');
  };
}
function paintTeam(){
  const el=$('#tbTeamName');if(!el)return;
  const n=(A.team&&A.team.name)||'设置小组';
  el.textContent=n;
}

/* ---------- bind ---------- */
const api={$,$$,esc,clamp,pad,S,A,dayData,save,saveNow,toast,sfx,confetti,burst,go,openModal,closeModal,initDrawing,
  previewSheet,makeEvidence,setEvidence,markDone,grantBadge,addXp,teamName,openTeam,timer,aiPanel,dragBins,renderFinale,finaleHTML,previewGrowth,day:DN,cfg:D};

function bind(){
  buildDots();paintTeam();
  $('#btnPrev').onclick=()=>go(cur-1);
  $('#btnNext').onclick=()=>{if(cur>=TOTAL-1){location.href='index.html';return;}go(cur+1);};
  $('#btnNotes').onclick=()=>toggleNotes();
  $('#closeNotes').onclick=()=>toggleNotes(false);
  $('#btnSound').onclick=toggleSound;
  $('#btnFull').onclick=()=>{if(!document.fullscreenElement)document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen().catch(()=>{});else document.exitFullscreen&&document.exitFullscreen().catch(()=>{});};
  const tm=$('#btnTeam');if(tm)tm.onclick=openTeam;
  deck.addEventListener('click',e=>{
    const b=e.target.closest('[data-go]');if(b){e.preventDefault();go(+b.dataset.go);}
    const n=e.target.closest('[data-notes]');if(n){e.preventDefault();toggleNotes(true);}
    const t=e.target.closest('[data-team]');if(t){e.preventDefault();openTeam();}
  });
  document.addEventListener('keydown',e=>{
    const tg=e.target;const typing=tg&&(tg.tagName==='INPUT'||tg.tagName==='TEXTAREA'||tg.tagName==='SELECT'||tg.isContentEditable);
    if(e.key==='Escape'){if($('#modal').classList.contains('show')){closeModal();return;}if($('#notes').classList.contains('open')){toggleNotes(false);return;}}
    if(typing)return;
    if(e.key==='ArrowRight'||e.key==='PageDown'||e.key===' '){e.preventDefault();if(cur<TOTAL-1)go(cur+1);}
    else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();go(cur-1);}
    else if(e.key==='t'||e.key==='T'){e.preventDefault();toggleNotes();}
    else if(e.key==='m'||e.key==='M'){e.preventDefault();toggleSound();}
    else if(e.key==='f'||e.key==='F'){e.preventDefault();$('#btnFull').click();}
  });
  const m=$('#modal');if(m)m.addEventListener('click',e=>{if(e.target===m)closeModal();});
  document.addEventListener('pointerdown',()=>ac(),{once:true});
}

/* ---------- boot ---------- */
try{
  const setT=(sel,val)=>{const el=$(sel);if(el)el.textContent=val;};
  document.title='DAY '+DN+' · '+(D.title||'')+' | 发小明 发明冲刺营';
  setT('#tbAct','DAY '+DN);
  setT('#tbTitle',D.title||'');
  setT('#tbTool',D.tool?toolLabel(D.tool):'');
  setT('#tbTeamName',(A.team&&A.team.name)||'设置小组');
  setT('#tbChapterNo','CAMP · DAY '+DN+' / 5');
  setT('#notesKicker','教师指引 · DAY '+DN+' / 5');
  setT('#curtainNo','DAY '+DN+' / 5');
  bind();
  const start=clamp(parseInt(Q.get('act')||'0',10)||0,0,TOTAL-1);
  cur=-1;go(start,{instant:true,force:true});
  window.CAMP={go,api,state:()=>S,archive:()=>A,day:DN};
}catch(e){
  console.error(e);
  document.body.innerHTML='<div style="color:#fff;padding:40px;font-family:sans-serif"><h1>课件加载出错</h1><pre>'+esc(e.stack||e.message)+'</pre></div>';
}
})();
