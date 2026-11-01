/* 创新者号 · 未来观测站 v2 */
(function(){
'use strict';
const $ = (s,r)=> (r||document).querySelector(s);
const $$ = (s,r)=> Array.from((r||document).querySelectorAll(s));
const FALLBACK = window.FUTURE_FALLBACK || {overview:{},signals:[]};
const CATS = ['全部','科技','教育','政策','人物','成果'];
const ROUTES = [
  {name:'创新启蒙',range:'01–04',from:1,count:4,color:'#F5C451'},
  {name:'奇思妙想',range:'05–08',from:5,count:4,color:'#FF6B8A'},
  {name:'结构与机械',range:'09–12',from:9,count:4,color:'#4FE0D0'},
  {name:'自然与生活',range:'13–20',from:13,count:8,color:'#38BDF8'},
  {name:'社会与数字',range:'21–28',from:21,count:8,color:'#A78BFA'},
  {name:'系统与项目',range:'29–32',from:29,count:4,color:'#8BD17C'},
  {name:'原型与迭代',range:'33–36',from:33,count:4,color:'#F2A65A'},
  {name:'路演与展会',range:'37–40',from:37,count:4,color:'#E879A6'}
];
const HUBS = [
  {key:'beijing',n:'北京',x:420,y:205,sources:['MOE','QBITAI'],dx:8,dy:-6,anchor:''},
  {key:'boston',n:'波士顿',x:176,y:192,sources:['MIT TR'],dx:-10,dy:-8,anchor:'end'},
  {key:'london',n:'伦敦',x:292,y:142,sources:['NATURE'],dx:-10,dy:-8,anchor:'end'},
  {key:'newyork',n:'纽约',x:188,y:252,sources:['SCIENCE'],dx:-10,dy:10,anchor:'end'},
  {key:'sf',n:'旧金山',x:116,y:285,sources:['EDSURGE'],dx:-10,dy:12,anchor:'end'}
];
const HUB_SOURCE = {};
HUBS.forEach(h=>h.sources.forEach(s=>{ HUB_SOURCE[s]=h.key; }));
const CAT_COLOR = {'政策':'#F5C451','教育':'#8BD17C','科技':'#4FE0D0','人物':'#A78BFA','成果':'#38BDF8'};

let DATA = FALLBACK.overview || {};
let SIGNALS = (FALLBACK.signals||[]).slice();
let SOURCES = [];
let WORKS = [];
let cat='全部', hubFilter=null, sigPage=0, workIdx=0, latestIdx=0;
let sigTimer=null, workTimer=null, latestTimer=null, radarRaf=null, tideRaf=null;
let radarStart = performance.now();

const fmt = n => (n==null||isNaN(n)) ? '—' : Number(n).toLocaleString('zh-CN');
const pad = n => String(n).padStart(2,'0');
const clamp = (v,a,b)=> Math.max(a,Math.min(b,v));
const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(msg){
  let t=$('#toast'); if(!t){ t=document.createElement('div'); t.id='toast'; t.className='toast'; document.body.appendChild(t); }
  t.textContent=msg; t.classList.add('show'); clearTimeout(toast._t); toast._t=setTimeout(()=>t.classList.remove('show'),2200);
}
async function api(path){
  const r=await fetch(path,{cache:'no-store'});
  if(!r.ok) throw new Error('HTTP '+r.status);
  return r.json();
}

/* ---------------- 里程表：每次刷新滚动 1.2s 到真实数字 ---------------- */
function setOdo(el, value){
  if(!el) return;
  const n=Math.max(0,Math.round(Number(value)||0));
  const str=String(n);
  if(el._odoLen!==str.length){
    let html='<span class="od">';
    for(const ch of str) html += /^\d$/.test(ch) ? '<span class="od-digit"><span class="od-reel">'+
      Array.from({length:30},(_,i)=>'<span>'+(i%10)+'</span>').join('')+'</span></span>' : '<span class="od-sep">'+esc(ch)+'</span>';
    html+='</span>';
    el.innerHTML=html; el._odoLen=str.length;
    el._odoCells=$$('.od-digit',el);
    el._odoIdx=[];
  }
  const cells=el._odoCells||[];
  for(let i=0;i<str.length;i++){
    if(!/^\d$/.test(str[i])) continue;
    const target=Number(str[i]);
    const cell=cells[i]; if(!cell) continue;
    const reel=$('.od-reel',cell); if(!reel) continue;
    const prev=(el._odoIdx[i]==null?0:el._odoIdx[i])%10;
    reel.style.transition='none';
    reel.style.transform='translateY(-'+(prev*1.18)+'em)';
    void reel.offsetHeight;
    reel.style.transition='transform 1.2s cubic-bezier(.22,.8,.25,1)';
    reel.style.transform='translateY(-'+((20+target)*1.18)+'em)';
    el._odoIdx[i]=20+target;
  }
}

/* ---------------- clock ---------------- */
function tickClock(){
  const now=new Date();
  $('#clock').textContent=pad(now.getHours())+':'+pad(now.getMinutes())+':'+pad(now.getSeconds());
  $('#date').textContent=now.getFullYear()+'.'+pad(now.getMonth()+1)+'.'+pad(now.getDate())+' · '+['日','一','二','三','四','五','六'][now.getDay()];
  const zones=[['北京','Asia/Shanghai'],['硅谷','America/Los_Angeles'],['伦敦','Europe/London'],['东京','Asia/Tokyo'],['新加坡','Asia/Singapore']];
  $('#worldclocks').innerHTML=zones.map(([n,z])=>{
    let s=''; try{ s=new Intl.DateTimeFormat('zh-CN',{timeZone:z,hour:'2-digit',minute:'2-digit',hour12:false}).format(now); }catch(e){ s='--:--'; }
    return '<span>'+n+' <b>'+s+'</b></span>';
  }).join('')+'<span>MISSION DAY <b>'+Math.max(1,Math.floor((now-new Date('2026-01-01T00:00:00+08:00'))/864e5))+'</b></span>';
}

/* ---------------- 星空 ---------------- */
(function bg(){
  const cv=$('#bg'); if(!cv) return; const ctx=cv.getContext('2d');
  let w,h,dpr=Math.min(2,devicePixelRatio||1),stars=[],dust=[];
  function resize(){
    w=innerWidth; h=innerHeight; cv.width=w*dpr; cv.height=h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    stars=Array.from({length:Math.min(180,Math.round(w*h/14000))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.2+.2,a:Math.random()*6.28,s:Math.random()*.015+.003}));
    dust=Array.from({length:26},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.6+.4,vx:(Math.random()-.5)*.08,vy:(Math.random()-.5)*.08,a:Math.random()*.5+.1}));
  }
  resize(); addEventListener('resize',resize);
  function loop(){
    ctx.clearRect(0,0,w,h);
    ctx.strokeStyle='rgba(56,189,248,.035)'; ctx.lineWidth=1;
    for(let x=0;x<w;x+=64){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke(); }
    for(let y=0;y<h;y+=64){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }
    for(const s of stars){ s.a+=s.s; const al=.12+.5*Math.abs(Math.sin(s.a)); ctx.fillStyle='rgba(234,242,255,'+al.toFixed(3)+')'; ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,6.29); ctx.fill(); }
    for(const d of dust){ d.x+=d.vx; d.y+=d.vy; if(d.x<0)d.x=w; if(d.x>w)d.x=0; if(d.y<0)d.y=h; if(d.y>h)d.y=0; ctx.fillStyle='rgba(79,224,208,'+d.a.toFixed(3)+')'; ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,6.29); ctx.fill(); }
    requestAnimationFrame(loop);
  }
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches) requestAnimationFrame(loop);
})();

/* ---------------- 站内数字 ---------------- */
function renderStats(){
  const s=DATA.stats||{}, today=DATA.today||{};
  const items=[['创新者',s.users,'人'],['作品',s.works,'件'],['项目',s.projects,'个'],['迭代',s.iterations,'次'],['今日新点子',today.ideas,'条'],['课程',s.courses||40,'章']];
  const grid=$('#stats');
  if(grid.dataset.ready!=='1'){
    grid.innerHTML=items.map(([k,v,u])=>'<div class="stat"><b><span class="od"></span><i>'+u+'</i></b><span>'+k+'</span></div>').join('');
    grid.dataset.ready='1';
  }
  items.forEach(([k,v,u],i)=>{
    const od=grid.children[i] && grid.children[i].querySelector('.od');
    if(od) setOdo(od,v);
  });
  const idx=clamp(DATA.index||70,0,99);
  setOdo($('#indexVal'),idx);
  const c=2*Math.PI*48;
  $('#indexArc').style.strokeDasharray=(c*idx/100).toFixed(1)+' '+c.toFixed(1);
  const ang=(-90+idx*3.6)*Math.PI/180;
  $('#indexDot').setAttribute('cx',(60+48*Math.cos(ang)).toFixed(2));
  $('#indexDot').setAttribute('cy',(60+48*Math.sin(ang)).toFixed(2));
  $('#indexState').textContent=idx>=90?'高能创新场':idx>=80?'持续升温':'正在蓄能';
  const mod=DATA.stats||{};
  const ml=$('#moduleLine'); if(ml) ml.innerHTML='路演 <b>'+fmt(mod.roadshows)+'</b> · 问题墙 <b>'+fmt(mod.problems)+'</b> · 悬赏 <b>'+fmt(mod.bounties)+'</b> · 评审 <b>'+fmt(mod.reviews)+'</b>';
  const top=(DATA.top||[])[0];
  $('#indexNote').textContent=top?('TOP · '+top.title+' / '+top.creator):'站内实时统计 + 环境脉冲';
}

/* ---------------- 来源网络地球 ---------------- */
function sourceShort(id){
  return ({moe:'MOE',qbitai:'QBITAI',mit:'MIT TR',nature:'NATURE',science:'SCIENCE',edsurge:'EDSURGE'})[id]||'';
}
function hubInfo(h){
  const items=SIGNALS.filter(s=>h.sources.includes(s.source));
  const catCount={};
  items.forEach(s=>{ catCount[s.category]=(catCount[s.category]||0)+1; });
  const topCat=Object.keys(catCount).sort((a,b)=>catCount[b]-catCount[a])[0]||'';
  const src=SOURCES.filter(x=>h.sources.includes(sourceShort(x.id)));
  const online=src.filter(x=>x.ok).length;
  return {h,items,count:items.length,color:CAT_COLOR[topCat]||'#4FE0D0',topCat,online,total:src.length||h.sources.length,src};
}
function renderLatest(){
  const pool=SIGNALS.length?SIGNALS:[];
  if(!pool.length){ $('#globeLatest').textContent='正在接收全球信号…'; return; }
  const s=pool[latestIdx%pool.length];
  const el=$('#globeLatest'); el.textContent=s.title||'—'; el.onclick=()=>{ if(s.link) window.open(s.link,'_blank','noopener'); };
}
function renderGlobe(){
  const hubs=HUBS.map(hubInfo);
  const max=Math.max(1,...hubs.map(x=>x.count));
  const arcs=hubs.filter(x=>x.h.key!=='beijing').map((x,i)=>{
    const p=x.h, mx=(420+p.x)/2, my=(205+p.y)/2-(36+i*5);
    const w=(1.1+Math.min(3.4,x.count/max*3.2)).toFixed(1);
    return '<path class="arc a'+(i%3)+'" style="stroke-width:'+w+'" d="M420,205 Q'+mx+','+my+' '+p.x+','+p.y+'"/>';
  }).join('');
  const nodes=hubs.map(x=>{
    const p=x.h, r=(5+Math.min(8,x.count*.55)).toFixed(1);
    return '<g class="node'+(hubFilter===p.key?' on':'')+(x.online?'':' off')+'" data-hub="'+p.key+'" transform="translate('+p.x+','+p.y+')">'+
      '<circle class="node-pulse" r="'+(Number(r)+3)+'"/>'+
      '<circle class="node-core" r="'+r+'" style="fill:'+x.color+';filter:drop-shadow(0 0 6px '+x.color+'88)"/>'+
      '<text x="'+p.dx+'" y="'+p.dy+'"'+(p.anchor?' text-anchor="'+p.anchor+'"':'')+'>'+p.n+' '+x.count+'</text></g>';
  }).join('');
  $('#globe').innerHTML=
    '<defs><radialGradient id="gg"><stop offset="0" stop-color="#4FE0D0" stop-opacity=".18"/><stop offset="1" stop-color="#4FE0D0" stop-opacity="0"/></radialGradient></defs>'+
    '<circle cx="310" cy="310" r="270" fill="none" stroke="rgba(56,189,248,.08)" stroke-dasharray="1 10"/>'+
    '<circle cx="310" cy="310" r="230" fill="url(#gg)" stroke="rgba(79,224,208,.18)"/>'+
    '<g class="globe-rings">'+
      '<ellipse cx="310" cy="310" rx="230" ry="80" fill="none" stroke="rgba(79,224,208,.18)"/>'+
      '<ellipse cx="310" cy="310" rx="230" ry="150" fill="none" stroke="rgba(56,189,248,.14)"/>'+
      '<ellipse cx="310" cy="310" rx="230" ry="210" fill="none" stroke="rgba(56,189,248,.10)"/>'+
      '<ellipse cx="310" cy="310" rx="80" ry="230" fill="none" stroke="rgba(79,224,208,.12)"/>'+
      '<ellipse cx="310" cy="310" rx="150" ry="230" fill="none" stroke="rgba(56,189,248,.10)"/>'+
      '<ellipse cx="310" cy="310" rx="210" ry="230" fill="none" stroke="rgba(56,189,248,.07)"/>'+
    '</g>'+arcs+nodes+
    '<circle cx="420" cy="205" r="16" fill="none" stroke="rgba(245,196,81,.35)" class="node-orbit"/>';
  const online=hubs.reduce((a,x)=>a+x.online,0);
  const total=hubs.reduce((a,x)=>a+x.total,0);
  setOdo($('#globeTotal'),SIGNALS.length);
  $('#globeSources').textContent=(online||0)+'/'+(total||6)+' 源在线 · 点击节点筛选';
  const active=hubs.find(x=>x.h.key===hubFilter);
  $('#globeStatus').textContent=active?('筛选：'+active.h.n+' · '+active.count+' 条 · 再点清除'):'节点大小 = 信号量 · 点击节点筛选';
  $$('#globe .node').forEach(g=>{
    g.addEventListener('mouseenter',e=>showGlobeTip(g,hubs));
    g.addEventListener('mouseleave',hideGlobeTip);
    g.addEventListener('click',e=>{ e.stopPropagation(); setHub(g.dataset.hub); });
  });
  $('#globe').onclick=e=>{ if(!e.target.closest('.node')) setHub(null); };
  renderLatest();
}
function showGlobeTip(g,hubs){
  const key=g.dataset.hub, info=hubs.find(x=>x.h.key===key); if(!info) return;
  const tip=$('#globeTip'); if(!tip) return;
  const srcLine=info.src.length?info.src.map(x=>x.name+' '+(x.count||0)).join(' · '):info.h.sources.join(' · ');
  const latest=info.items[0];
  tip.innerHTML='<b>'+info.h.n+' · '+info.count+' 条信号</b><span>'+esc(srcLine)+'</span><em>'+(latest?esc(latest.title):'这个来源暂时没有新信号')+'</em>';
  tip.classList.add('on');
  const wrap=$('#globeWrap').getBoundingClientRect(), r=g.getBoundingClientRect();
  let x=r.left-wrap.left+r.width/2+8, y=r.top-wrap.top-12;
  x=Math.max(8,Math.min(wrap.width-240,x));
  y=Math.max(8,Math.min(wrap.height-100,y));
  tip.style.left=x+'px'; tip.style.top=y+'px';
}
function hideGlobeTip(){ const tip=$('#globeTip'); if(tip) tip.classList.remove('on'); }
function setHub(key){
  hubFilter=(key && hubFilter!==key)?key:null;
  cat='全部'; sigPage=0;
  renderFilters(); renderSignals(); renderGlobe(); updateScope();
}
function updateScope(){
  const el=$('#signalScope'); if(!el) return;
  const info=hubFilter?hubInfo(HUBS.find(h=>h.key===hubFilter)):null;
  if(!info){ el.hidden=true; el.textContent=''; return; }
  el.hidden=false; el.textContent='来源：'+info.h.n+' · '+info.count+' 条  ×';
  el.onclick=()=>setHub(null);
}

/* ---------------- 雷达 ---------------- */
function resizeCanvas(cv){
  const dpr=Math.min(2,devicePixelRatio||1), r=cv.getBoundingClientRect();
  if(cv.width!==Math.round(r.width*dpr)||cv.height!==Math.round(r.height*dpr)){ cv.width=Math.round(r.width*dpr); cv.height=Math.round(r.height*dpr); }
  const ctx=cv.getContext('2d'); ctx.setTransform(dpr,0,0,dpr,0,0); return {w:r.width,h:r.height,ctx};
}
function drawRadar(t){
  const cv=$('#radar'); if(!cv) return; const {w,h,ctx}=resizeCanvas(cv);
  const cx=w/2,cy=h/2,R=Math.min(w,h)/2-8;
  ctx.clearRect(0,0,w,h);
  ctx.strokeStyle='rgba(56,189,248,.17)'; ctx.lineWidth=1;
  for(let i=1;i<=4;i++){ ctx.beginPath(); ctx.arc(cx,cy,R*i/4,0,6.29); ctx.stroke(); }
  ctx.strokeStyle='rgba(56,189,248,.1)';
  for(let i=0;i<12;i++){ const a=i*Math.PI/6; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R); ctx.stroke(); }
  const ang=(t-radarStart)*0.00045;
  const grad=ctx.createRadialGradient(cx,cy,0,cx,cy,R);
  grad.addColorStop(0,'rgba(79,224,208,.2)'); grad.addColorStop(.6,'rgba(79,224,208,.05)'); grad.addColorStop(1,'rgba(79,224,208,0)');
  ctx.save(); ctx.translate(cx,cy); ctx.rotate(ang); ctx.beginPath(); ctx.moveTo(0,0); ctx.arc(0,0,R,-.55,0); ctx.closePath(); ctx.fillStyle=grad; ctx.fill();
  ctx.strokeStyle='rgba(79,224,208,.55)'; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(R,0); ctx.stroke(); ctx.restore();
  const blips=[[.2,.35,'#4FE0D0'],[.65,.55,'#F5C451'],[1.1,.72,'#A78BFA'],[1.7,.42,'#FF6B8A'],[2.3,.62,'#38BDF8'],[2.8,.3,'#8BD17C']];
  for(const [a,r,c] of blips){ const x=cx+Math.cos(a)*R*r,y=cy+Math.sin(a)*R*r,pulse=.5+.5*Math.sin(t*.002+a*3); ctx.fillStyle=c; ctx.globalAlpha=.35+.5*pulse; ctx.beginPath(); ctx.arc(x,y,2.2+2.2*pulse,0,6.29); ctx.fill(); ctx.globalAlpha=1; }
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches) radarRaf=requestAnimationFrame(drawRadar);
}
function renderRadar(){
  const counts={AI:0,'量子':0,'机器人':0,'生物':0,'能源':0,'教育':0};
  for(const s of SIGNALS){
    const t=((s.title||'')+' '+(s.summary||'')).toLowerCase();
    if(s.category==='科技'||/ai|人工智能|大模型|算法|芯片|anthropic|openai/.test(t)) counts.AI++;
    if(/量子|quantum/.test(t)) counts['量子']++;
    if(/机器人|robot|具身/.test(t)) counts['机器人']++;
    if(s.category==='成果'||/生物|基因|医疗|健康|bio|gene|health/.test(t)) counts['生物']++;
    if(/能源|电池|光伏|核聚变|energy|battery|climate/.test(t)) counts['能源']++;
    if(s.category==='教育'||s.category==='政策'||/教育|学校|学习|课程|education|school|learning/.test(t)) counts['教育']++;
  }
  const labels=[['AI','AI'],['量子','量子'],['机器人','机器人'],['生物','生物'],['能源','能源'],['教育','教育']];
  const base={AI:96,'量子':78,'机器人':84,'生物':73,'能源':69,'教育':88};
  $('#radarLegend').innerHTML=labels.map(([k,label])=>{
    const score=Math.max(60,Math.min(99,(base[k]||70)+Math.min(3,counts[k]||0)));
    return '<span title="趋势指数：结合公开信号与课程方向"><b>'+label+'</b><em>'+score+'</em></span>';
  }).join('');
  drawRadar(performance.now());
  if(radarRaf) cancelAnimationFrame(radarRaf);
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches) radarRaf=requestAnimationFrame(drawRadar);
}

/* ---------------- 潮汐 ---------------- */
function drawTide(progress=1){
  const cv=$('#tide'); if(!cv) return; const {w,h,ctx}=resizeCanvas(cv);
  const s=DATA.series||{}, vals=(s.events||[]).slice(-14), labels=(s.days||[]).slice(-14);
  const max=Math.max(2,...vals), padL=32,padR=12,padT=12,padB=22, cw=w-padL-padR, ch=h-padT-padB;
  ctx.clearRect(0,0,w,h);
  ctx.strokeStyle='rgba(56,189,248,.1)'; ctx.lineWidth=1;
  for(let i=0;i<=3;i++){ const y=padT+ch*i/3; ctx.beginPath(); ctx.moveTo(padL,y); ctx.lineTo(w-padR,y); ctx.stroke(); }
  ctx.fillStyle='rgba(133,147,172,.65)'; ctx.font='8px ui-monospace, monospace'; ctx.textAlign='right';
  for(let i=0;i<=3;i++){ const y=padT+ch*i/3; ctx.fillText(String(Math.round(max*(1-i/3))),padL-6,y+3); }
  const bw=cw/Math.max(1,vals.length);
  vals.forEach((v,i)=>{ const bh=ch*(v/max)*progress,x=padL+i*bw+bw*.18,y=padT+ch-bh; ctx.fillStyle='rgba(245,196,81,.28)'; ctx.fillRect(x,y,bw*.64,bh); ctx.fillStyle='rgba(245,196,81,.85)'; ctx.fillRect(x,padT+ch-2,bw*.64,2); });
  ctx.beginPath();
  for(let i=0;i<=60;i++){ const x=padL+cw*i/60, env=.22+.12*Math.sin(i*.55)+.06*Math.sin(i*1.9), y=padT+ch*(1-env)*progress; if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y); }
  const grad=ctx.createLinearGradient(0,padT,0,padT+ch);
  grad.addColorStop(0,'rgba(79,224,208,.55)'); grad.addColorStop(1,'rgba(79,224,208,.02)');
  ctx.strokeStyle=grad; ctx.lineWidth=2; ctx.stroke();
  ctx.lineTo(padL+cw,padT+ch); ctx.lineTo(padL,padT+ch); ctx.closePath(); ctx.fillStyle='rgba(79,224,208,.06)'; ctx.fill();
  ctx.fillStyle='rgba(133,147,172,.65)'; ctx.font='8px ui-monospace, monospace'; ctx.textAlign='center';
  [0,Math.floor(labels.length/2),labels.length-1].forEach(i=>{ if(labels[i]) ctx.fillText(labels[i],padL+cw*(i/(labels.length-1||1)),h-6); });
  $('#tideMeta').textContent=(vals.reduce((a,b)=>a+b,0))+' 条事件 · 14 天';
  $('#tideHint').textContent='最近 14 天';
}
function renderTide(){ drawTide(); }

/* ---------------- 信号 + 作品 ---------------- */
function timeAgo(ts){
  if(!ts) return '刚刚'; const d=Date.now()-ts;
  if(d<3600e3) return Math.max(1,Math.floor(d/60e3))+' 分钟前';
  if(d<864e5) return Math.floor(d/3600e3)+' 小时前';
  return Math.floor(d/864e5)+' 天前';
}
function filteredSignals(){
  let list=SIGNALS;
  if(hubFilter){ const h=HUBS.find(x=>x.key===hubFilter); if(h) list=list.filter(s=>h.sources.includes(s.source)); }
  if(cat!=='全部') list=list.filter(s=>s.category===cat);
  return list;
}
function renderSignals(){
  const list=filteredSignals();
  const pageSize=innerHeight<850?3:4;
  const maxPage=Math.max(1,Math.ceil(list.length/pageSize));
  sigPage=((sigPage%maxPage)+maxPage)%maxPage;
  const view=list.slice(sigPage*pageSize,sigPage*pageSize+pageSize);
  $('#signalList').innerHTML=view.length?view.map(s=>
    '<a class="signal-item" href="'+esc(s.link||'#')+'" target="_blank" rel="noopener">'+
    '<div class="meta"><span class="cat '+esc(s.category)+'">'+esc(s.category||'信号')+'</span><span>'+esc(s.source||'')+'</span><span>'+timeAgo(s.published)+'</span></div>'+
    '<h3>'+esc(s.title)+'</h3></a>'
  ).join(''):'<div class="loading">这个范围暂时没有信号，换个分类或点地球节点试试。</div>';
  const ok=SOURCES.filter(x=>x.ok).length||6;
  const scope=hubFilter?(' · 来源 '+HUBS.find(h=>h.key===hubFilter).n):'';
  $('#signalMeta').textContent='RSS · '+ok+' 源 · '+list.length+' 条'+scope;
  $('#signalMeta').title=(SOURCES.filter(x=>x.ok).map(x=>x.name).join(' / ')||'教育部 / 量子位 / MIT TR / Nature / ScienceDaily / EdSurge');
  if(DATA.generatedAt) $('#signalSync').textContent='SYNC '+new Date(DATA.generatedAt).toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'});
  updateScope();
  clearTimeout(sigTimer);
  if(list.length>pageSize) sigTimer=setTimeout(()=>{ sigPage++; renderSignals(); },7000);
}
function renderFilters(){
  $('#signalFilters').innerHTML=CATS.map(c=>'<button type="button" class="'+(c===cat?'on':'')+'" data-cat="'+c+'">'+c+'</button>').join('');
  $$('#signalFilters button').forEach(b=>b.onclick=()=>{ cat=b.dataset.cat; sigPage=0; renderFilters(); renderSignals(); });
}
function renderTicker(){
  const list=SIGNALS.slice(0,6);
  const one=list.map(s=>'<span><b>'+esc(s.category||'信号')+'</b> · '+esc(s.title)+'</span>').join('');
  $('#tickerTrack').innerHTML=one+one;
  $('#tickerSync').textContent='SYNC '+(DATA.generatedAt?new Date(DATA.generatedAt).toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'}):'—');
}

/* ---------------- 学院公开作品 ---------------- */
async function loadWorks(){
  try{
    const d=await api('/api/gallery');
    const items=(d&&d.items)||[];
    WORKS=items.filter(x=>x&&x.poster&&x.name);
    if(workIdx>=WORKS.length) workIdx=0;
    renderWorks();
    startWorkTimer();
  }catch(e){ WORKS=[]; renderWorks(); }
}
function startWorkTimer(){
  clearInterval(workTimer);
  workTimer=setInterval(()=>{ if(document.hidden) return; if(!WORKS.length) return; workIdx=(workIdx+1)%WORKS.length; renderWorks(); },7000);
}
function renderWorks(){
  const box=$('#workCard'); if(!box) return;
  const w=WORKS[workIdx];
  $('#worksCount').textContent=WORKS.length?WORKS.length+' 件公开':'—';
  if(!w){ box.innerHTML='<div class="work-empty">学院公开作品正在入库<br>授权公开后就会出现在这里</div>'; return; }
  box.innerHTML=
    '<div class="work-poster"><img id="workImg" src="'+esc(w.poster)+'" alt="'+esc(w.name)+'" loading="lazy" decoding="async"></div>'+
    '<div class="work-copy"><span class="tag">PUBLIC WORK · 公开作品</span><h3>'+esc(w.name)+'</h3>'+
    '<p>'+esc(w.creator||'匿名发明家')+(w.slogan?' · '+esc(w.slogan):'')+'</p>'+
    '<div class="work-nav"><button type="button" id="workPrev" aria-label="上一件">‹</button><b>'+(workIdx+1)+' / '+WORKS.length+'</b><button type="button" id="workNext" aria-label="下一件">›</button><span class="link-hint" id="workOpen">看大图 ↗</span></div></div>';
  $('#workPrev').onclick=()=>{ workIdx=(workIdx-1+WORKS.length)%WORKS.length; renderWorks(); startWorkTimer(); };
  $('#workNext').onclick=()=>{ workIdx=(workIdx+1)%WORKS.length; renderWorks(); startWorkTimer(); };
  $('#workOpen').onclick=()=>window.open(w.poster,'_blank','noopener');
  const img=$('#workImg'); img.onclick=()=>window.open(w.poster,'_blank','noopener');
  const nx=WORKS[(workIdx+1)%WORKS.length]; if(nx){ const im=new Image(); im.src=nx.poster; }
  box.onmouseenter=()=>clearInterval(workTimer);
  box.onmouseleave=()=>startWorkTimer();
}

/* ---------------- 星座 ---------------- */
function renderConstellation(){
  $('#constellation').innerHTML=ROUTES.map(r=>{
    const dots=Array.from({length:r.count},(_,i)=>'<a href="course-chapter.html?ch='+(r.from+i)+'" target="_blank" title="第 '+(r.from+i)+' 章"></a>').join('');
    return '<div class="route-col" style="--rc:'+r.color+'"><b>'+r.name+'</b><small>'+r.range+' · '+r.count+' 章</small><div class="route-dots">'+dots+'</div></div>';
  }).join('');
}

/* ---------------- 数据加载 ---------------- */
function applyOverview(ov){
  if(!ov||!ov.ok) return false;
  DATA=ov; renderStats(); renderTide(); renderRadar(); return true;
}
function retrySignals(n){
  if(n>=3) return;
  setTimeout(async()=>{
    try{
      const d=await api('/api/future/signals');
      if(d&&d.items&&d.items.length&&!d.pending){
        SIGNALS=d.items; SOURCES=d.sources||[]; latestIdx=0;
        renderFilters(); renderSignals(); renderTicker(); renderRadar(); renderGlobe();
      }else retrySignals(n+1);
    }catch(e){ retrySignals(n+1); }
  },8000);
}
async function load(force){
  const btn=$('#btnRefresh'); if(btn){ btn.disabled=true; btn.textContent='同步中…'; }
  try{
    const [ov,sig]=await Promise.allSettled([api('/api/future/overview'),api('/api/future/signals')]);
    if(ov.status==='fulfilled'&&ov.value&&ov.value.ok) applyOverview(ov.value);
    if(sig.status==='fulfilled'&&sig.value&&sig.value.items&&sig.value.items.length){
      SIGNALS=sig.value.items; SOURCES=sig.value.sources||[]; latestIdx=0;
      renderFilters(); renderSignals(); renderTicker(); renderRadar(); renderGlobe();
      if(sig.value.pending) retrySignals(0);
    }
    if(ov.status==='rejected'&&sig.status==='rejected') toast('使用离线数据 · 网络信号较弱');
    else if(!force) toast('未来观测站已同步');
  }catch(e){ toast('已切换到离线数据'); }
  finally{ if(btn){ btn.disabled=false; btn.textContent='刷新数据 ↻'; } }
}

/* ---------------- 大字 ---------------- */
function setBig(on){
  document.body.classList.toggle('big',!!on);
  const b=$('#btnBig'); if(b) b.textContent=on?'A+ 大字 ✓':'A+ 大字';
  try{ localStorage.setItem('fxm_future_big',on?'1':'0'); }catch(e){}
}

/* ---------------- boot ---------------- */
function boot(){
  if(FALLBACK.signals&&FALLBACK.signals.length) SIGNALS=FALLBACK.signals;
  if(FALLBACK.overview) applyOverview(FALLBACK.overview);
  renderGlobe(); renderFilters(); renderSignals(); renderTicker(); renderConstellation(); renderWorks();
  tickClock(); setInterval(tickClock,1000);
  const saved=localStorage.getItem('fxm_future_big');
  setBig(saved==null?innerWidth>=1500:saved==='1');
  load(false); loadWorks();
  setInterval(()=>load(true),60*1000);      /* 每分钟刷新一次 → 数字滚动 1.2s */
  setInterval(loadWorks,10*60*1000);
  setInterval(()=>{ latestIdx++; renderLatest(); },8000);
  $('#btnRefresh').onclick=()=>load(true);
  $('#btnBig').onclick=()=>setBig(!document.body.classList.contains('big'));
  $('#btnSignalsNext').onclick=()=>{ sigPage++; renderSignals(); };
  $('#btnFull').onclick=()=>{ if(document.fullscreenElement) document.exitFullscreen&&document.exitFullscreen(); else document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen(); };
  addEventListener('resize',()=>{ drawTide(); drawRadar(performance.now()); });
  document.addEventListener('visibilitychange',()=>{ if(document.hidden){ if(radarRaf) cancelAnimationFrame(radarRaf); } else { renderRadar(); } });
}
boot();
})();
