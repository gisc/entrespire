/* 发小明 · 教师创新力特训营 — 网页课件引擎 */
(function(){
'use strict';
const COURSE = window.FXM_COURSE;
const LESSONS = window.FXM_LESSONS || [];
const SCHEDULE = window.FXM_SCHEDULE || [];
const $ = (s,r)=> (r||document).querySelector(s);
const $$ = (s,r)=> Array.from((r||document).querySelectorAll(s));
const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const store = {
  get(k,d){ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):d; }catch(e){ return d; } },
  set(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} },
  del(k){ try{ localStorage.removeItem(k); }catch(e){} }
};
const KEY_DONE='fxm_training_done_v2';
const KEY_LAST='fxm_training_last_v2';

let flat=[], idx=0, visited=new Set(store.get(KEY_DONE,[]));
COURSE.sessions.forEach((s,si)=> s.scenes.forEach((sc,ci)=> flat.push({s,si,sc,ci,key:s.id+'-'+ci})));

function current(){ return flat[idx]; }
function sessionDone(s){ return s.scenes.every((_,i)=> visited.has(s.id+'-'+i)); }

/* ---------------- starfield ---------------- */
(function stars(){
  const cv=$('#stars'); if(!cv) return;
  const ctx=cv.getContext('2d'); let w,h,dpr=Math.min(2,devicePixelRatio||1),arr=[];
  function resize(){
    w=innerWidth; h=innerHeight; cv.width=w*dpr; cv.height=h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    arr=Array.from({length:Math.min(180,Math.round(w*h/13000))},()=>({
      x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.3+.25,a:Math.random()*6.28,s:Math.random()*.012+.003
    }));
  }
  resize(); addEventListener('resize',resize);
  function loop(t){
    ctx.clearRect(0,0,w,h);
    for(const s of arr){
      s.a+=s.s;
      const al=.18+.5*Math.abs(Math.sin(s.a));
      ctx.fillStyle='rgba(247,242,230,'+al.toFixed(3)+')';
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,6.29); ctx.fill();
    }
    requestAnimationFrame(loop);
  }
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches) requestAnimationFrame(loop);
})();

/* ---------------- chrome ---------------- */
function buildRail(){
  const rail=$('#rail'); if(!rail) return;
  rail.innerHTML=COURSE.sessions.map((s,i)=>
    '<button class="raildot" data-goto="'+flat.findIndex(f=>f.s.id===s.id)+'" type="button" aria-label="'+esc(s.title)+'"><span>'+esc(s.num+' · '+s.title)+'</span></button>'
  ).join('');
  rail.addEventListener('click',e=>{
    const b=e.target.closest('[data-goto]'); if(!b) return;
    go(parseInt(b.dataset.goto,10));
  });
}
function buildMenu(){
  const list=$('#menuList'); if(!list) return;
  list.innerHTML=COURSE.sessions.map(s=>{
    const i=flat.findIndex(f=>f.s.id===s.id);
    return '<button class="menu-item'+(sessionDone(s)?' done':'')+'" data-goto="'+i+'" type="button">'+
      '<b>'+esc(s.num)+'</b><span>'+esc(s.title)+'<small>'+esc(s.subtitle)+' · '+s.minutes+' 分钟</small></span></button>';
  }).join('');
  list.addEventListener('click',e=>{
    const b=e.target.closest('[data-goto]'); if(!b) return;
    closeOverlay('menuOverlay'); go(parseInt(b.dataset.goto,10));
  });
}
function buildKit(){
  const grid=$('#kitGrid'); if(!grid) return;
  const docs=[
    ['40课地图.pdf','40 课地图','8 条航线 + 40 章授课要点；A4 四页，可打印。'],
    ['课堂提问卡.pdf','课堂提问卡','五句追问 + 三句替代话术；A4 一张。'],
    ['问题卡.pdf','问题卡','现象 / 猜测 / 谁 / 何时 / 哪里；A5 双面。'],
    ['创意卡.pdf','创意卡','SIT 五工具 + 六个限制角度；A5 双面。'],
    ['设计画布.pdf','设计画布','为谁 / 解决什么 / 三个功能 / 先做哪个；A4。'],
    ['迭代卡.pdf','迭代记录卡','以为什么 / 实际什么 / 下一次只改一处；A5。'],
    ['路演卡.pdf','路演卡','四句话 + 同伴反馈句式；A5 双面。'],
    ['21天行动卡.pdf','21 天行动卡','1-3-1 + 磨课伙伴；A4。'],
    ['微试讲评分表.pdf','微试讲评分表','六维评分 + 反馈协议；A4。']
  ];
  grid.innerHTML=docs.map(d=>'<div class="kit-card"><h3>'+esc(d[1])+'</h3><p>'+esc(d[2])+'</p><a href="pdf/'+encodeURIComponent(d[0])+'" target="_blank" rel="noopener">下载 PDF ↗</a></div>').join('');
}
function buildAgenda(){
  const grid=$('#agendaGrid'); if(!grid) return;
  grid.innerHTML=[1,2].map(d=>{
    const rows=SCHEDULE.filter(x=>x.d===d).map(x=>
      '<div class="agenda-row"><span>'+esc(x.time)+'</span><b>'+esc(x.title)+'<small style="display:block;color:var(--faint);font-weight:400">'+esc(x.form)+' · '+esc(x.out)+'</small></b></div>'
    ).join('');
    return '<div class="agenda-day"><h3>Day '+d+' · '+(d===1?'先当学生':'再当老师')+'</h3>'+rows+'</div>';
  }).join('');
}

/* ---------------- render ---------------- */
function sceneHead(sc, s){
  return '<div class="scene-head"><div class="kicker">'+esc(sc.kicker||'')+'</div>'+
    '<h1 class="scene-title">'+sc.title+'</h1>'+
    (sc.lead?'<p class="lead">'+sc.lead+'</p>':'')+'</div>';
}
function sceneHTML(sc, s){
  if(sc.type==='cover'){
    return '<section class="scene scene-cover">'+
      '<div class="cover-copy"><div class="cover-num">航段 '+esc(s.num)+' · '+s.minutes+' 分钟</div>'+
      '<div class="kicker">'+esc(sc.kicker||'')+'</div>'+
      '<h1 class="cover-title">'+sc.title+'</h1>'+
      '<p class="cover-lead">'+sc.lead+'</p>'+
      '<div class="cover-actions"><button class="btn primary" data-next type="button">开始这一段 →</button>'+
      '<button class="btn ghost" data-notes type="button">讲师提示</button></div>'+
      '<p class="hint" style="margin-top:14px">按 → 翻页 · N 讲师提示 · M 目录 · 附件下载 · F 全屏</p></div>'+
      '<div class="cover-visual"><img src="'+esc(sc.image||'assets-pencil.png')+'" alt=""></div></section>';
  }
  if(sc.type==='story'){
    return '<section class="scene"><div class="story-grid"><div class="story-copy">'+
      '<div class="kicker">'+esc(sc.kicker||'')+'</div><h1 class="scene-title">'+sc.title+'</h1>'+
      '<div class="story-body">'+sc.body.map(p=>'<p>'+p+'</p>').join('')+'</div>'+
      (sc.quote?'<div class="quote-card"><q>'+sc.quote+'</q><span>'+esc(sc.by||'')+'</span></div>':'')+
      '</div><figure class="story-visual"><img src="'+esc(sc.image||'')+'" alt=""><figcaption>'+esc(sc.caption||'课堂片段 · 人物为化名，情节综合真实课堂改编')+'</figcaption></figure></div>'+
      (sc.widget?'<div class="widget" data-widget="'+esc(sc.widget)+'" style="margin-top:20px"></div>':'')+
      '</section>';
  }
  if(sc.type==='split'){
    return '<section class="scene">'+sceneHead(sc,s)+'<div class="split-grid">'+sc.cards.map(c=>
      '<div class="card '+(c.accent||'')+'"><div class="num">'+esc(c.num)+'</div><h3>'+esc(c.title)+'</h3><p>'+esc(c.body)+'</p></div>'
    ).join('')+'</div></section>';
  }
  if(sc.type==='route'){
    return '<section class="scene">'+sceneHead(sc,s)+
      '<div class="route-grid" id="routeGrid"></div>'+
      '<div class="widget" data-widget="ticket"></div></section>';
  }
  if(sc.type==='widget'){
    return '<section class="scene">'+sceneHead(sc,s)+
      '<div class="widget" data-widget="'+esc(sc.widget)+'"></div></section>';
  }
  if(sc.type==='bridge'){
    return '<section class="scene">'+sceneHead(sc,s)+'<div class="bridge-grid"><div class="takeaways">'+
      sc.takeaways.map((t,i)=>'<div class="take"><b>0'+(i+1)+'</b><span>'+esc(t)+'</span></div>').join('')+
      '</div><div class="toolcard"><h3>'+esc(sc.tool.title)+'</h3><p>'+esc(sc.tool.desc)+'</p>'+
      '<a class="btn primary small" href="'+esc(sc.tool.href)+'" target="_blank" rel="noopener">'+esc(sc.tool.label)+' ↗</a>'+
      '<div class="nextline">下一段 <b>'+esc(sc.next||'')+'</b></div></div></div></section>';
  }
  if(sc.type==='closing'){
    return '<section class="scene scene-closing"><div class="kicker">'+esc(sc.kicker||'')+'</div>'+
      '<h1 class="closing-title">'+sc.title+'</h1><p class="lead" style="margin:0 auto 8px">'+esc(sc.lead||'')+'</p>'+
      '<div class="closing-links"><button class="btn primary" data-goto="0" type="button">再走一遍 ↺</button>'+
      '<button class="btn ghost" data-kit type="button">打开附件</button>'+
      '<a class="btn ghost" href="../" target="_blank">返回教师工作台 ↗</a></div>'+
      '<p class="hint" style="margin-top:28px">发小明创新教育 · 教师特训营 · V2.0</p></section>';
  }
  return '<section class="scene">'+sceneHead(sc,s)+'</section>';
}

function render(){
  const f=current(); if(!f) return;
  const sc=f.sc, s=f.s;
  $('#stage').innerHTML=sceneHTML(sc,s);
  $('#crumbNum').textContent=s.num;
  $('#crumbTitle').textContent=s.title;
  $('#sceneCounter').textContent=(f.ci+1)+' / '+s.scenes.length;
  $('#sceneKicker').textContent=(sc.kicker||s.en||'').toUpperCase();
  const last=f.idx===flat.length-1;
  $('#btnNext').innerHTML=last?'完成 <b>✓</b>':'下一幕 <b>→</b>';
  $('#btnPrev').disabled=f.idx===0;
  visited.add(f.key); store.set(KEY_DONE,Array.from(visited)); store.set(KEY_LAST,f.key);
  paintProgress();
  updateNotes(sc);
  try{ history.replaceState(null,'','#'+f.key); }catch(e){}
  window.scrollTo({top:0,behavior:'smooth'});
  mountWidget(sc);
  bindCommon();
}
function paintProgress(){
  const pct=Math.round(visited.size/flat.length*100);
  $('#pbar').style.width=pct+'%';
  $$('#rail .raildot').forEach((b,i)=>{
    const s=COURSE.sessions[i]; if(!s) return;
    b.classList.toggle('active',current().s.id===s.id);
    b.classList.toggle('done',sessionDone(s));
  });
  const menu=$('#menuList');
  if(menu) $$('#menuList .menu-item').forEach((b,i)=>{
    const s=COURSE.sessions[i]; if(s) b.classList.toggle('done',sessionDone(s));
  });
}
function updateNotes(sc){
  const f=current();
  $('#notesTime').textContent=(sc.noteTime||f.s.minutes+' 分钟');
  $('#notesBody').innerHTML='<p>'+esc(sc.note||'这一段的讲师提示还没有写。')+'</p>'+
    '<p class="hint" style="margin-top:10px">航段：'+esc(f.s.num+' · '+f.s.title)+' · 第 '+(f.ci+1)+' / '+f.s.scenes.length+' 幕</p>';
}
function go(i){
  if(i<0||i>=flat.length) return;
  idx=i; render();
}
function next(){ if(idx<flat.length-1) go(idx+1); else toast('已经是最后一幕了。'); }
function prev(){ if(idx>0) go(idx-1); }

/* ---------------- common bindings ---------------- */
function bindCommon(){
  $$('[data-next]').forEach(b=>b.onclick=next);
  $$('[data-notes]').forEach(b=>b.onclick=()=>toggleNotes(true));
  $$('[data-goto]').forEach(b=>b.onclick=()=>go(parseInt(b.dataset.goto,10)));
  $$('[data-kit]').forEach(b=>b.onclick=()=>openOverlay('kitOverlay'));
}
function openOverlay(id){ const el=$('#'+id); if(!el) return; el.classList.add('open'); el.setAttribute('aria-hidden','false'); }
function closeOverlay(id){ const el=$('#'+id); if(!el) return; el.classList.remove('open'); el.setAttribute('aria-hidden','true'); }
function toggleNotes(v){ const d=$('#notesDrawer'); const open=v===undefined?!d.classList.contains('open'):v; d.classList.toggle('open',open); d.setAttribute('aria-hidden',String(!open)); $('#btnNotes').classList.toggle('active',open); }
function toast(msg){
  const t=$('#toast'); t.textContent=msg; t.classList.add('show');
  clearTimeout(toast._t); toast._t=setTimeout(()=>t.classList.remove('show'),2200);
}

/* ---------------- boot ---------------- */
buildRail(); buildMenu(); buildKit(); buildAgenda();
function start(){
  const m=location.hash.match(/^#([a-z0-9]+)-(\d+)$/i);
  let i=0;
  if(m){ const k=m[1]+'-'+m[2]; const j=flat.findIndex(f=>f.key===k); if(j>=0) i=j; }
  else { const last=store.get(KEY_LAST,''); const j=flat.findIndex(f=>f.key===last); if(j>=0) i=j; }
  idx=i; render();
}

/* topbar */
$('#btnNext').onclick=next;
$('#btnPrev').onclick=prev;
$('#btnNotes').onclick=()=>toggleNotes();
$('#btnNotesClose').onclick=()=>toggleNotes(false);
$('#btnMenu').onclick=()=>openOverlay('menuOverlay');
$('#btnKit').onclick=()=>openOverlay('kitOverlay');
$('#btnAgenda').onclick=()=>openOverlay('agendaOverlay');
$('#btnFull').onclick=()=>{
  if(document.fullscreenElement) document.exitFullscreen&&document.exitFullscreen();
  else document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen();
};
$('#btnReset').onclick=()=>{
  if(!confirm('清除本机进度？不会影响课程内容。')) return;
  visited=new Set(); store.del(KEY_DONE); store.del(KEY_LAST); paintProgress(); toast('进度已清除');
};
$$('[data-close]').forEach(b=>b.onclick=()=>closeOverlay(b.dataset.close));
$$('.overlay').forEach(o=>o.addEventListener('click',e=>{ if(e.target===o) closeOverlay(o.id); }));
addEventListener('keydown',e=>{
  if(e.key==='Escape'){ $$('.overlay.open').forEach(o=>closeOverlay(o.id)); toggleNotes(false); return; }
  const tag=(e.target.tagName||'').toLowerCase();
  if(tag==='input'||tag==='textarea'||tag==='select') return;
  if(e.key==='ArrowRight'||e.key===' '||e.key==='PageDown'){ e.preventDefault(); next(); }
  else if(e.key==='ArrowLeft'||e.key==='PageUp'){ e.preventDefault(); prev(); }
  else if(e.key==='f'||e.key==='F'){ $('#btnFull').click(); }
  else if(e.key==='n'||e.key==='N'){ toggleNotes(); }
  else if(e.key==='m'||e.key==='M'){ openOverlay('menuOverlay'); }
});
/* swipe */
let sx=0,sy=0;
$('#stage').addEventListener('touchstart',e=>{ sx=e.touches[0].clientX; sy=e.touches[0].clientY; },{passive:true});
$('#stage').addEventListener('touchend',e=>{
  const dx=e.changedTouches[0].clientX-sx, dy=e.changedTouches[0].clientY-sy;
  if(Math.abs(dx)>60 && Math.abs(dx)>Math.abs(dy)){ if(dx<0) next(); else prev(); }
},{passive:true});

window.FXM_APP={go,next,prev,toast,openOverlay,closeOverlay,esc,store};

/* ================================================================
   widgets
   ================================================================ */
function mountWidget(sc){
  const host=$('[data-widget]'); if(!host) return;
  const name=host.dataset.widget;
  const map={
    'first-response':firstResponse,'hotspots':hotspots,'responses':responses,
    'fiveq':fiveq,'tools':tools,'dice':dice,'canvas':canvas,'coins':coins,
    'diagnosis':diagnosis,'pitch4':pitch4,'pitch':pitch,'map40':map40,
    'platform':platform,'conditions':conditions,'lessonplan':lessonplan,
    'rubric':rubric,'action131':action131,'lightwall':lightwall,'ticket':ticket
  };
  if(map[name]) map[name](host,sc);
}

/* ---------- 01 第一句话 ---------- */
function firstResponse(host){
  const opts=[
    {t:'“没关系，再想想。”',tag:'安慰',cls:'bad',score:12,r:'阿哲低下头，继续等。他没有得到一个可以动手的入口。'},
    {t:'“不用电，只能用纸板、绳子和橡皮筋。做一个让橡皮不滚下桌的东西。”',tag:'给限制',cls:'good',score:92,r:'阿哲开始翻材料。限制没有告诉他答案，但给了他一个可以动手的起点。'},
    {t:'“你看别人怎么做。”',tag:'给样例',cls:'',score:34,r:'阿哲照着别人的做，作品完成了，但他说不出自己为什么这样设计。'}
  ];
  host.innerHTML='<div class="resp-student"><div class="avatar">哲</div><div class="bubble">“我想不出来。”</div></div>'+
    '<div class="resp-grid">'+opts.map((o,i)=>'<button class="resp-card" data-i="'+i+'" type="button"><b>'+o.t+'</b><span>'+o.tag+'</span></button>').join('')+'</div>'+
    '<div class="resp-result show" id="frResult"><b>先选一个。</b><p>三种接法，会把孩子带向三个不同的下一步。</p><div class="meter"><i style="width:8%"></i></div></div>';
  host.querySelectorAll('.resp-card').forEach(b=>b.onclick=()=>{
    const o=opts[+b.dataset.i];
    host.querySelectorAll('.resp-card').forEach(x=>x.classList.remove('good','bad'));
    b.classList.add(o.cls||'');
    const box=$('#frResult',host); box.classList.add('show');
    $('b',box).textContent=o.tag+'：'+o.t;
    $('p',box).textContent=o.r;
    $('.meter i',box).style.width=o.score+'%';
  });
}

/* ---------- 02 问题侦探 ---------- */
const PROBLEMS=[
  {id:1,x:65,y:35,title:'桌角的杯子，一碰就倒',obs:'杯子放在桌子最边上，走过去很容易碰到。',who:'同桌、老师、打扫卫生的人',q:'是杯子太轻、桌面太滑，还是它放的位置不对？'},
  {id:2,x:76,y:80,title:'书包里找一块橡皮，要翻半天',obs:'书包只有一个大口袋，所有东西全混在一起。',who:'我自己、同学',q:'是没有分隔，还是东西放进去时没有固定位置？'},
  {id:3,x:43,y:72,title:'坐上去会晃的椅子',obs:'椅子有一条腿比别的短，一坐上去就晃。',who:'坐这把椅子的人',q:'是腿不一样长，还是地面不平？'},
  {id:4,x:96,y:72,title:'雨伞滴了一地水',obs:'湿雨伞靠在角落，水顺着伞尖流到地上。',who:'值日生、走路的人',q:'是伞没有地方挂，还是地面没有接水的地方？'},
  {id:5,x:56,y:88,title:'插线板上的线缠成一团',obs:'好几根线绕在一起，想拔一根却拉出三根。',who:'充电的人、打扫的人',q:'是线太长、没有收纳，还是插头没有标记？'},
  {id:6,x:89,y:3,title:'书架最上面的书够不到',obs:'最上层的书放得太高，踮脚也拿不到。',who:'我、个子小的同学',q:'是书架太高，还是常用的书放错了层？'}
];
function hotspots(host){
  let found=new Set();
  host.innerHTML='<div class="hotspot-layout"><div class="hotspot-wrap"><img src="assets-classroom-scene.jpg" alt="教室场景">'+
    PROBLEMS.map(p=>'<button class="spot" style="left:'+p.x+'%;top:'+p.y+'%" data-id="'+p.id+'" type="button" aria-label="'+esc(p.title)+'">'+p.id+'</button>').join('')+
    '</div><div class="problem-panel" id="problemPanel"><h3>问题采集袋</h3><p class="hint">点左边的发光位置，把“哪里不方便”找出来。找到 3 个，再选一个最想研究的。</p><div class="bag" id="bag"></div><p class="hint" id="bagCount" style="margin-top:10px">0 / 6</p><div style="border-top:1px solid var(--line);margin-top:16px;padding-top:12px" class="hint"><b style="color:var(--gold)">侦探笔记</b><br>① 先看，不急着解决<br>② 现象和猜测分开<br>③ 找到 3 个，再选 1 个</div></div></div>';
  const panel=$('#problemPanel',host), bag=$('#bag',host);
  host.querySelectorAll('.spot').forEach(b=>b.onclick=()=>{
    const p=PROBLEMS.find(x=>x.id===+b.dataset.id); if(!p) return;
    found.add(p.id); b.classList.add('found');
    panel.innerHTML='<div class="kicker">问题 '+String(p.id).padStart(2,'0')+'</div><h3>'+esc(p.title)+'</h3><p>'+esc(p.obs)+'</p><p><b style="color:var(--gold)">谁会遇到：</b>'+esc(p.who)+'</p><p><b style="color:var(--gold)">可以追问：</b>'+esc(p.q)+'</p><div class="bag" id="bag">'+[...found].map(id=>{const q=PROBLEMS.find(x=>x.id===id);return '<span class="on">'+esc(q.title.slice(0,10))+'…</span>'}).join('')+'</div><p class="hint" id="bagCount" style="margin-top:10px">'+found.size+' / 6 · '+(found.size>=3?'可以选一个研究了':'再找 '+(3-found.size)+' 个')+'</p>'+(found.size>=3?'<button class="btn primary small" id="chooseProblem" type="button">就研究这个 →</button>':'');
    const btn=$('#chooseProblem',panel); if(btn) btn.onclick=()=>{ toast('已选入你的问题采集袋：'+p.title); btn.textContent='已选 ✓'; btn.disabled=true; };
  });
}

/* ---------- 03 三种接法 ---------- */
function responses(host){
  const opts=[
    {t:'“那你做个底座。”',tag:'给答案',cls:'bad',score:14,r:'孩子“哦”了一声，等老师给下一步。他学会的是：答案在老师那里。'},
    {t:'“为什么会倒？”',tag:'追问',cls:'',score:56,r:'孩子说“桌子太滑”。老师再问“还有呢？”孩子又说“杯子太轻、放得太靠边”。想法开始变多。'},
    {t:'“如果桌子是斜的呢？”',tag:'换条件',cls:'good',score:92,r:'孩子愣了一下，说：“那我可以在杯底加一圈软的东西？”——他自己找到了一个新方向。'}
  ];
  host.innerHTML='<div class="resp-student"><div class="avatar">生</div><div class="bubble">“我的水杯总是倒。”</div></div>'+
    '<div class="resp-grid">'+opts.map((o,i)=>'<button class="resp-card" data-i="'+i+'" type="button"><b>'+o.t+'</b><span>'+o.tag+'</span></button>').join('')+'</div>'+
    '<div class="resp-result show" id="rResult"><b>先选一个。</b><p>同一句话，三种接法。你选的那一句，决定孩子接下来是等答案，还是开始思考。</p><div class="meter"><i style="width:8%"></i></div></div>';
  host.querySelectorAll('.resp-card').forEach(b=>b.onclick=()=>{
    const o=opts[+b.dataset.i];
    host.querySelectorAll('.resp-card').forEach(x=>x.classList.remove('good','bad'));
    b.classList.add(o.cls||'');
    const box=$('#rResult',host); box.classList.add('show');
    $('b',box).textContent=o.tag+'：'+o.t;
    $('p',box).textContent=o.r;
    $('.meter i',box).style.width=o.score+'%';
  });
}

/* ---------- 04 五个追问 ---------- */
function fiveq(host){
  const qs=[
    ['还有吗？','“除了这个，还有没有完全不一样的办法？”'],
    ['你怎么知道？','“你看到了什么？有没有证据？”'],
    ['如果……呢？','“如果不用电 / 如果只能改一处 / 如果对象换成老人？”'],
    ['谁最需要？','“谁最常遇到？他上一次遇到是什么时候？”'],
    ['先改哪一个？','“如果只改一个地方，你改哪里？为什么？”']
  ];
  host.innerHTML='<div class="qgrid">'+qs.map((q,i)=>'<button class="qcard" data-i="'+i+'" type="button"><b>'+q[0]+'</b><span>追问 '+(i+1)+'</span><p>'+q[1]+'</p></button>').join('')+'</div>'+
    '<div class="dont-grid">'+[
      ['“这个做不出来。”','改成：“先记下来，等会儿一起看。”'],
      ['“不对。”','改成：“你怎么知道？还有别的可能吗？”'],
      ['“我来帮你做。”','改成：“你想先试哪一步？”']
    ].map((d,i)=>'<div class="dont" data-i="'+i+'"><b>'+d[0]+'</b><span>'+d[1]+'</span></div>').join('')+'</div>'+
    '<p class="hint" style="margin-top:12px">点卡片翻开例子。三句“不要说”，不是禁止，是换一个说法。</p>';
  host.querySelectorAll('.qcard').forEach(b=>b.onclick=()=>b.classList.toggle('open'));
  host.querySelectorAll('.dont').forEach(b=>b.onclick=()=>b.classList.toggle('open'));
}

/* ---------- 05 五个工具 + 想法墙 ---------- */
function tools(host){
  const ts=[
    ['减法','拿掉一个部件，逼出新用途','雨伞拿掉伞面，还能怎么挡雨？'],
    ['一专多能','一个部件，做两件事','书包背带同时当反光条 / 挂钩'],
    ['乘法','复制一个部件，再改变它','两个轮子变三个、四个、大小不同'],
    ['除法','拆成几个部分，重新组合','水杯拆成杯盖、杯身、杯底'],
    ['属性关联','改一个属性，看另一个怎么变','杯底变宽，稳定性怎么变？']
  ];
  const ideas=[
    ['杯底加吸盘','属性关联'],['杯口加盖子','减法'],['杯身加配重','属性关联'],['杯底变宽','属性关联'],
    ['杯子挂桌边','一专多能'],['杯子变软','属性关联'],['杯子会提醒','一专多能'],['杯子套在手上','一专多能'],
    ['杯子变不倒翁','属性关联'],['杯子长脚','乘法'],['杯子吸在桌面','一专多能'],['杯子有警报','一专多能'],
    ['杯子变轻','减法'],['杯子变重','属性关联'],['杯子能折叠','除法'],['杯子能叠','乘法']
  ];
  host.innerHTML='<div class="qgrid" style="grid-template-columns:repeat(5,1fr)">'+ts.map((t,i)=>
    '<button class="qcard" data-i="'+i+'" type="button"><b>'+t[0]+'</b><span>工具 '+(i+1)+'</span><p>'+t[1]+'<br><em style="color:var(--gold2);font-style:normal">'+t[2]+'</em></p></button>'
  ).join('')+'</div>'+
  '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin:18px 0 4px"><b style="font-family:var(--serif);font-size:16px">同一个问题，16 个方向</b><span class="hint">点一张，看看它来自哪个工具</span></div>'+
  '<div class="idea-grid" id="ideaGrid">'+ideas.map((x,i)=>'<button class="idea" data-tool="'+esc(x[1])+'" type="button">'+esc(x[0])+'<small>'+esc(x[1])+'</small></button>').join('')+'</div>'+
  '<p class="hint" id="ideaTag" style="margin-top:10px">问题：水杯总是倒。先别评价，先让方向变多。</p>';
  host.querySelectorAll('.qcard').forEach(b=>b.onclick=()=>b.classList.toggle('open'));
  host.querySelectorAll('.idea').forEach(b=>b.onclick=()=>{
    host.querySelectorAll('.idea').forEach(x=>x.classList.remove('open')); b.classList.add('open');
    $('#ideaTag',host).textContent='“'+b.textContent.replace(b.querySelector('small').textContent,'')+'” 来自：'+b.dataset.tool+'。同一个问题，可以有很多种长法。';
  });
}

/* ---------- 06 创意骰子 ---------- */
function dice(host){
  const tools=['减法','一专多能','乘法','除法','属性关联','盒内思考'];
  const objects=['水杯','书包','椅子','雨伞','教室','校门口'];
  const prompts={
    '减法':'拿掉一个“看起来必须有”的部件，它还怎么用？',
    '一专多能':'让一个部件同时做两件事，省掉一个零件。',
    '乘法':'复制一个部件，改变它的大小、数量或位置。',
    '除法':'把它拆成 3 个部分，重新组合。',
    '属性关联':'改变一个属性（大小/重量/位置），另一个会怎么变？',
    '盒内思考':'只能用教室里现有的材料，你能做什么？'
  };
  let cur={tool:'减法',obj:'水杯'};
  function paint(){
    host.querySelectorAll('.die').forEach((d,i)=>{
      d.querySelector('b').textContent=tools[i];
      d.querySelector('span').textContent=i%2===0?'工具':'';
      d.classList.toggle('on',tools[i]===cur.tool);
    });
    $('#challenge',host).innerHTML='用 <b>'+cur.tool+'</b> 改造 <b>'+cur.obj+'</b>：'+prompts[cur.tool]+'<br><span class="hint">至少写 3 个不同的方向；不许说“不可能”。</span>';
  }
  host.innerHTML='<div class="dice-grid">'+tools.map((t,i)=>'<div class="die"><b>'+t+'</b><span>'+(i%2===0?'工具':'')+'</span></div>').join('')+'</div>'+
    '<div class="challenge" id="challenge"></div>'+
    '<textarea class="idea-input" id="ideaText" placeholder="写 3 个想法，每个一行。例：杯底加一圈橡皮筋；杯子挂在桌边；杯子变成一个不倒翁……"></textarea>'+
    '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><button class="btn primary small" id="rollBtn" type="button">🎲 摇一次</button><button class="btn small" id="saveIdea" type="button">保存到我的想法</button><span class="hint" id="ideaCount"></span></div>';
  paint();
  $('#rollBtn',host).onclick=()=>{
    cur.tool=tools[Math.floor(Math.random()*tools.length)];
    cur.obj=objects[Math.floor(Math.random()*objects.length)];
    host.querySelectorAll('.die').forEach(d=>d.classList.add('rolling'));
    setTimeout(()=>{ host.querySelectorAll('.die').forEach(d=>d.classList.remove('rolling')); paint(); },420);
  };
  $('#ideaText',host).value=store.get('fxm_dice_text','');
  $('#ideaText',host).oninput=e=>store.set('fxm_dice_text',e.target.value);
  $('#saveIdea',host).onclick=()=>{
    const v=$('#ideaText',host).value.trim();
    if(!v){ toast('先写一个想法，再保存。'); return; }
    const arr=store.get('fxm_my_ideas',[]); arr.unshift({t:new Date().toLocaleString(),v}); store.set('fxm_my_ideas',arr.slice(0,30));
    toast('已保存到本机。下次回来还能看到。');
  };
}

/* ---------- 07 设计画布 ---------- */
function canvas(host){
  const qs=[
    ['为谁做？','他上一次遇到这个问题是什么时候？','不要写“大家”，写一个具体的人。'],
    ['解决什么？','哪一件事最让他不方便？','越具体越好：不是“书包很乱”，而是“找橡皮要翻半天”。'],
    ['哪三个功能？','如果只能保留三个，你留哪三个？','功能不是越多越好，排一个顺序。'],
    ['先做哪一个？','怎么证明它有用？','先做一个能测试的核心功能。']
  ];
  host.innerHTML='<div class="canvas-grid"><div class="canvas-paper"><div class="sketch">在这里画：形状 / 部件 / 材料 / 用法</div></div><div class="canvas-q">'+
    qs.map((q,i)=>'<div class="cq" data-i="'+i+'"><b>'+q[0]+'</b><span>'+q[1]+'<br><em style="color:var(--gold2);font-style:normal">'+q[2]+'</em></span></div>').join('')+
    '</div></div><div style="margin-top:14px"><button class="btn small" id="printCanvas" type="button">打印这张画布</button> <span class="hint">A4 一张，四个问题 + 一块画图区。</span></div>';
  host.querySelectorAll('.cq').forEach(b=>b.onclick=()=>b.classList.toggle('open'));
  $('#printCanvas',host).onclick=()=>printCard('设计画布', '<p>为谁做？<br><br>解决什么？<br><br>哪三个功能？<br><br>先做哪一个？怎么测试？</p><div style="height:420px;border:1.5px dashed #999;margin-top:18px;border-radius:8px"></div>');
}

/* ---------- 08 材料币 ---------- */
function coins(host){
  const mats=[
    {n:'纸板',c:3},{n:'吸管',c:2},{n:'瓶盖',c:1},{n:'胶带',c:1},
    {n:'橡皮筋',c:1},{n:'纸杯',c:2},{n:'小马达',c:5},{n:'电池',c:4}
  ];
  let sel=new Set();
  function paint(){
    const total=[...sel].reduce((a,i)=>a+mats[i].c,0);
    host.querySelectorAll('.material').forEach((b,i)=>b.classList.toggle('on',sel.has(i)));
    $('#coinTotal',host).textContent=total;
    let msg='';
    if(total>10) msg='超预算了。拿走一个，或者换一个更便宜的。';
    else if(sel.size===0) msg='先选 3 样。不要“全都买”，材料越多，孩子越不取舍。';
    else if(total<=10) msg='还剩 '+(10-total)+' 个币。留一点给测试和返工。';
    $('#coinMsg',host).textContent=msg;
  }
  host.innerHTML='<div class="coinbar"><span>材料预算</span><span>已用 <b id="coinTotal">0</b> / 10 币</span></div>'+
    '<div class="coin-grid">'+mats.map((m,i)=>'<button class="material" data-i="'+i+'" type="button"><b>'+m.n+'</b><span>材料</span><em>'+m.c+' 币</em></button>').join('')+'</div>'+
    '<div class="coin-feedback" id="coinMsg"></div>';
  host.querySelectorAll('.material').forEach(b=>b.onclick=()=>{
    const i=+b.dataset.i; if(sel.has(i)) sel.delete(i); else sel.add(i); paint();
  });
  paint();
}

/* ---------- 09 失败诊断 ---------- */
function diagnosis(host){
  const opts=[
    ['动力','先看两轮转速是否一致：把车架空，轻推，听声音、看轮子。'],
    ['结构','先看车架是否歪：把车放在桌面，看四个轮子是否同时着地。'],
    ['行走','先看轮子是否装歪、轴是否平行：让车直行 1 米，量偏移。'],
    ['载物','先看杯子是否偏心：空车 vs 载水各跑一次。']
  ];
  host.innerHTML='<div class="diag-grid"><div class="diag-visual"><img src="assets-car.svg" alt="小车"></div><div><p class="hint" style="margin:0 0 8px">现象：小车一开就向左偏，杯子里的水洒了。你先查哪个子系统？</p><div class="diag-choices">'+opts.map((o,i)=>'<button class="diag-btn" data-i="'+i+'" type="button">'+o[0]+'</button>').join('')+'</div><div class="diag-result" id="diagResult">没有标准答案。重要的是：说出“现象 → 证据 → 判断”。</div></div></div>';
  host.querySelectorAll('.diag-btn').forEach(b=>b.onclick=()=>{
    host.querySelectorAll('.diag-btn').forEach(x=>x.classList.remove('good','bad')); b.classList.add('good');
    const o=opts[+b.dataset.i]; const r=$('#diagResult',host);
    r.innerHTML='<b style="color:var(--gold)">'+o[0]+'：</b>'+o[1]+'<br><span class="hint">诊断可以错。关键是说清“你看到了什么、为什么这样判断、下一步测什么”。</span>';
  });
}

/* ---------- 10 四句话 ---------- */
function pitch4(host){
  const qs=[
    ['我发现了一个什么问题？','“教室后面的插线板，线总是缠在一起，想拔一根会拉出三根。”'],
    ['我设计了什么解决办法？','“我做了一个带夹子的线夹，把每根线分开夹住，还贴了标签。”'],
    ['我怎样制作和测试它？','“我用纸板、夹子和标签做了一版。请 5 个同学试，4 个人说比原来好找。”'],
    ['如果继续改进，我还想做什么？','“我想让夹子可以粘在桌边，不占地方；还想加一个‘哪根线是哪根’的颜色。”']
  ];
  host.innerHTML='<div class="qgrid" style="grid-template-columns:repeat(2,1fr)">'+qs.map((q,i)=>
    '<button class="qcard" data-i="'+i+'" type="button"><b>'+q[0]+'</b><span>第 '+(i+1)+' 句</span><p>'+q[1]+'</p></button>'
  ).join('')+'</div><p class="hint" style="margin-top:12px">四句话，刚好 30–60 秒。不要背稿，看着屏幕说。</p>';
  host.querySelectorAll('.qcard').forEach(b=>b.onclick=()=>b.classList.toggle('open'));
}

/* ---------- 11 60 秒计时 ---------- */
function pitch(host){
  let left=60, timer=null, running=false;
  host.innerHTML='<div class="pitch-layout"><div><div class="pitch-ring" id="ring"><div><b id="ringNum">60</b><span>SECONDS</span></div></div></div><div>'+
    '<div class="pitch-prompts"><span>我发现了一个什么问题？</span><span>我设计了什么解决办法？</span><span>我怎样制作和测试它？</span><span>如果继续改进，我还想做什么？</span></div>'+
    '<textarea class="idea-input" id="pitchText" placeholder="写关键词，不要写稿。例：插线板 / 线夹 / 5 个同学试 / 粘桌边……"></textarea>'+
    '<div class="pitch-btns"><button class="btn primary small" id="pitchStart" type="button">开始 60 秒</button><button class="btn small" id="pitchReset" type="button">重置</button><button class="btn small" id="pitchPrint" type="button">生成我的路演卡</button></div></div></div>';
  function paint(){
    $('#ringNum',host).textContent=String(left).padStart(2,'0');
    const deg=(60-left)/60*360;
    $('#ring',host).style.background='conic-gradient(var(--gold) '+deg+'deg, rgba(255,255,255,.06) '+deg+'deg)';
  }
  function stop(){ running=false; clearInterval(timer); timer=null; $('#pitchStart',host).textContent='开始 60 秒'; }
  $('#pitchStart',host).onclick=()=>{
    if(running){ stop(); return; }
    if(left<=0) left=60;
    running=true; $('#pitchStart',host).textContent='暂停';
    timer=setInterval(()=>{ left--; paint(); if(left<=0){ stop(); toast('时间到。停。听的人只问一个问题。'); } },1000);
  };
  $('#pitchReset',host).onclick=()=>{ stop(); left=60; paint(); };
  $('#pitchText',host).value=store.get('fxm_pitch_text','');
  $('#pitchText',host).oninput=e=>store.set('fxm_pitch_text',e.target.value);
  $('#pitchPrint',host).onclick=()=>{
    const v=$('#pitchText',host).value.trim()||'（还没有写关键词）';
    printCard('我的 60 秒路演卡','<p><b>我发现了一个什么问题？</b><br>________________________________________</p><p><b>我设计了什么解决办法？</b><br>________________________________________</p><p><b>我怎样制作和测试它？</b><br>________________________________________</p><p><b>如果继续改进，我还想做什么？</b><br>________________________________________</p><hr><p style="color:#666">我的关键词：<br>'+esc(v).replace(/\n/g,'<br>')+'</p>');
  };
  paint();
}

/* ---------- 12 40 课地图 ---------- */
const PHASE_META=[
  ['创新启蒙','01–04','#F5C451'],['奇思妙想','05–08','#FF7A6B'],
  ['结构与机械','09–12','#4FE0D0'],['自然与生活','13–20','#38BDF8'],
  ['社会与数字','21–28','#A78BFA'],['系统与项目','29–32','#8BD17C'],
  ['原型与迭代','33–36','#F2A65A'],['路演与展会','37–40','#E879A6']
];
function map40(host){
  host.innerHTML='<div class="coinbar"><span>8 条航线 · 40 章 · 约 260 幕</span><span><button class="btn small" id="randomChapter" type="button">随机一章</button></span></div>'+
    '<div class="map40"><div class="map-routes" id="mapRoutes"></div><div class="chapter-panel" id="chapterPanel"><div class="empty-panel">点左边任意一章<br>看它“要解决什么、留下什么、最容易踩什么坑”</div></div></div>';
  const wrap=$('#mapRoutes',host);
  PHASE_META.forEach(([name,range,color])=>{
    const ls=LESSONS.filter(l=>l.phase===name);
    if(!ls.length) return;
    const row=document.createElement('div'); row.className='map-route';
    row.innerHTML='<h4>'+name+'<span>'+range+' · '+ls.length+' 章</span></h4><div class="chips">'+
      ls.map(l=>'<button class="chip" data-no="'+l.no+'" type="button" title="'+esc(l.title)+'">'+String(l.no).padStart(2,'0')+'</button>').join('')+'</div>';
    wrap.appendChild(row);
  });
  wrap.addEventListener('click',e=>{
    const b=e.target.closest('.chip'); if(!b) return;
    wrap.querySelectorAll('.chip').forEach(x=>x.classList.remove('on')); b.classList.add('on');
    showLesson(host,+b.dataset.no);
  });
  $('#randomChapter',host).onclick=()=>{
    const l=LESSONS[Math.floor(Math.random()*LESSONS.length)];
    const b=wrap.querySelector('.chip[data-no="'+l.no+'"]'); if(b){ b.click(); b.scrollIntoView({block:'center',behavior:'smooth'}); }
  };
  showLesson(host,1);
}
function showLesson(host,no){
  const l=LESSONS.find(x=>x.no===no); if(!l) return;
  const p=PHASE_META.find(x=>x[0]===l.phase)||['','','#F5C451'];
  $('#chapterPanel',host).innerHTML='<div class="no" style="color:'+p[2]+'">CHAPTER '+String(l.no).padStart(2,'0')+' · '+esc(l.phase)+'</div>'+
    '<h3>'+esc(l.title)+'</h3>'+
    '<div class="meta"><span class="pill">'+esc(l.tool)+'</span><span class="pill">'+esc(l.periods)+' 次课</span><span class="pill">'+esc(l.acts)+' 幕</span></div>'+
    '<p><b style="color:var(--gold)">一句话目标：</b>'+esc(l.goal)+'</p>'+
    '<p><b style="color:var(--gold)">学生成果：</b>'+esc(l.output)+'</p>'+
    '<p><b style="color:var(--gold)">三个授课要点：</b></p><ul>'+l.points.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>'+
    '<p style="margin-top:9px"><b style="color:var(--coral)">常见困难：</b>'+esc(l.hard)+'</p>'+
    '<p><b style="color:var(--teal)">一个技巧：</b>'+esc(l.tip)+'</p>'+
    '<p><b style="color:var(--gold)">关键提问：</b>'+esc(l.q)+'</p>'+
    '<a class="btn small" style="margin-top:8px" href="course-chapter.html?ch='+l.no+'" target="_blank" rel="noopener">打开这一章 ↗</a>';
}

/* ---------- 13 平台导览 ---------- */
function platform(host){
  const spots=[
    {x:84,y:7,t:'T 指引',d:'按 T 打开教师指引。每一幕都有：本幕目标、关键提问、操作提示、常见困难。'},
    {x:76,y:38,t:'教师指引面板',d:'不需要另做 PPT。备课时只读三行：本幕目标、第一个关键提问、最常见困难。'},
    {x:90,y:7,t:'全屏',d:'按 F 全屏。投影前先按 F，再按 → 翻页。'},
    {x:95,y:94,t:'下一幕',d:'每一幕右下角都有“下一幕”；也可以用键盘 →。'},
    {x:50,y:97,t:'进度',d:'底部是本章进度。不要赶进度；学生做完、说完，再翻。'}
  ];
  const checks=[
    '进入第 01 章，找到“开始上课”','按 T，打开教师指引','找到“本幕目标”','找到“关键提问”至少 2 条',
    '找到“常见困难”或“操作提示”','按 F 全屏，再按 → 翻 3 幕','找到章节门禁 / 密码提示',
    '完成一次课堂互动：点亮 / 投票 / 选择','生成或下载一张提案 / 徽章','找到本章的“家庭任务”'
  ];
  const done=store.get('fxm_platform_check',[]);
  host.innerHTML='<div class="platform-layout"><div class="platform-shot"><img src="assets-guide.png" alt="教师指引截图">'+
    spots.map((s,i)=>'<button class="platform-spot" style="left:'+s.x+'%;top:'+s.y+'%" data-i="'+i+'" type="button" aria-label="'+esc(s.t)+'">'+(i+1)+'</button>').join('')+
    '</div><div class="platform-info" id="platformInfo"><h3>点一个热点</h3><p>这张截图就是老师上课时看到的界面。左边是课程，右边是教师指引。</p><p class="hint">按 T 打开 / 关闭；按 → 翻页；按 F 全屏。</p></div></div>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px"><div class="checklist">'+
      checks.slice(0,5).map((c,i)=>'<label class="check"><input type="checkbox" data-check="'+i+'" '+(done.includes(i)?'checked':'')+'><span>'+c+'</span></label>').join('')+
    '</div><div class="checklist">'+
      checks.slice(5).map((c,i)=>'<label class="check"><input type="checkbox" data-check="'+(i+5)+'" '+(done.includes(i+5)?'checked':'')+'><span>'+c+'</span></label>').join('')+
    '</div></div>'+
    '<div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap"><a class="btn small" href="course-lesson-01.html" target="_blank" rel="noopener">打开第 01 章 ↗</a><a class="btn small ghost" href="../" target="_blank">回到教师工作台 ↗</a><span class="hint" id="checkCount">已完成 '+done.length+' / 10</span></div>';
  host.querySelectorAll('.platform-spot').forEach(b=>b.onclick=()=>{
    const s=spots[+b.dataset.i]; const info=$('#platformInfo',host);
    info.innerHTML='<h3>'+esc(s.t)+'</h3><p>'+esc(s.d)+'</p>';
    host.querySelectorAll('.platform-spot').forEach(x=>x.classList.remove('on')); b.classList.add('on');
  });
  host.querySelectorAll('[data-check]').forEach(cb=>cb.onchange=()=>{
    const arr=Array.from(host.querySelectorAll('[data-check]:checked')).map(x=>+x.dataset.check);
    store.set('fxm_platform_check',arr); $('#checkCount',host).textContent='已完成 '+arr.length+' / 10';
  });
}

/* ---------- 14 校本适配 ---------- */
const CONDITIONS=[
  {id:'a',name:'40 分钟切片',cond:'每周 1 节，40 分钟',bars:[[5,'#F5C451'],[10,'#4FE0D0'],[15,'#FF7A6B'],[10,'#38BDF8']],
   text:'一章拆 3–4 次；每次只做 2–3 幕。保留“做”和“说”，砍掉“讲”。',
   bullets:['开场 5 分钟：一个物件 / 一个问题','发现 + 设计 10 分钟：只画关键结构','创造 15 分钟：只做一个核心功能','验证 + 分享 10 分钟：测一次，说一句']},
  {id:'b',name:'大班 / 无设备',cond:'40–50 人，只有投影',bars:[[10,'#F5C451'],[15,'#4FE0D0'],[15,'#FF7A6B'],[5,'#38BDF8']],
   text:'教师一台设备 + 大屏；纸笔任务卡；小组角色。不强制人手一屏。',
   bullets:['教师演示，学生用任务卡','每组一张 A3 纸 + 一套材料','角色卡：观察 / 设计 / 制作 / 测试 / 表达','下课前收 3 张证据卡，不追求人人上台']},
  {id:'c',name:'跨学科 / 项目周',cond:'一周项目制，多学科',bars:[[2,'#F5C451'],[2,'#4FE0D0'],[2,'#FF7A6B'],[2,'#38BDF8']],
   text:'一章扩成 3–5 天；接入语文、科学、美术、信息。',
   bullets:['Day 1 发现问题 + 用户访谈','Day 2 科学原理 + 设计图','Day 3 制作 + 测试','Day 4 迭代 + 路演','Day 5 展览 + 反思']}
];
function conditions(host){
  host.innerHTML='<div class="tabs">'+CONDITIONS.map((c,i)=>'<button class="tab'+(i===0?' active':'')+'" data-i="'+i+'" type="button">'+c.name+'</button>').join('')+'</div><div class="tab-body" id="condBody"></div>';
  function paint(i){
    const c=CONDITIONS[i];
    $('#condBody',host).innerHTML='<div class="kicker">'+esc(c.cond)+'</div><h4>'+esc(c.name)+'</h4><p>'+esc(c.text)+'</p>'+
      '<div class="mini-timeline">'+c.bars.map(b=>'<i style="flex:'+b[0]+';background:'+b[1]+'"></i>').join('')+'</div>'+
      '<ul style="margin:12px 0 0;padding-left:18px;color:var(--dim);font-size:12px;line-height:1.9">'+c.bullets.map(b=>'<li>'+esc(b)+'</li>').join('')+'</ul>';
    host.querySelectorAll('.tab').forEach((b,j)=>b.classList.toggle('active',j===i));
  }
  host.querySelectorAll('.tab').forEach(b=>b.onclick=()=>paint(+b.dataset.i));
  paint(0);
}

/* ---------- 15 一页纸教案 ---------- */
function lessonplan(host){
  const key='fxm_lessonplan';
  const v=store.get(key,{});
  host.innerHTML='<div class="form-grid">'+
    '<div class="field full"><label>课题</label><input id="lpTitle" value="'+esc(v.title||'')+'" placeholder="第几章 / 哪几幕 / 第几课时"></div>'+
    '<div class="field full"><label>目标（学生做完能做什么）</label><input id="lpGoal" value="'+esc(v.goal||'')+'" placeholder="一句话，可观察"></div>'+
    '<div class="field full"><label>流程（时间 / 教师动作 / 学生动作）</label><textarea id="lpFlow" placeholder="0–5 开场…&#10;5–15 发现…&#10;15–30 创造…">'+esc(v.flow||'')+'</textarea></div>'+
    '<div class="field"><label>三个关键提问</label><textarea id="lpQ" placeholder="①…&#10;②…&#10;③…">'+esc(v.q||'')+'</textarea></div>'+
    '<div class="field"><label>材料 / 安全</label><textarea id="lpMat" placeholder="基础材料 / 替代材料 / 安全提示">'+esc(v.mat||'')+'</textarea></div>'+
    '<div class="field full"><label>每个学生留下什么证据</label><input id="lpEvi" value="'+esc(v.evi||'')+'" placeholder="问题卡 / 设计图 / 测试记录 / 60 秒视频"></div>'+
    '</div><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><button class="btn primary small" id="lpPrint" type="button">生成 / 打印教案</button><button class="btn small" id="lpSave" type="button">保存到本机</button><span class="hint" id="lpMsg"></span></div>';
  function read(){
    return {title:$('#lpTitle',host).value,goal:$('#lpGoal',host).value,flow:$('#lpFlow',host).value,q:$('#lpQ',host).value,mat:$('#lpMat',host).value,evi:$('#lpEvi',host).value};
  }
  $('#lpSave',host).onclick=()=>{ store.set(key,read()); $('#lpMsg',host).textContent='已保存'; toast('教案已保存到本机'); };
  $('#lpPrint',host).onclick=()=>{
    const d=read();
    printCard('一页纸校本教案','<p><b>课题：</b>'+esc(d.title)+'</p><p><b>目标：</b>'+esc(d.goal)+'</p><p><b>流程：</b><br>'+esc(d.flow).replace(/\n/g,'<br>')+'</p><p><b>关键提问：</b><br>'+esc(d.q).replace(/\n/g,'<br>')+'</p><p><b>材料 / 安全：</b><br>'+esc(d.mat).replace(/\n/g,'<br>')+'</p><p><b>证据：</b>'+esc(d.evi)+'</p>');
  };
}

/* ---------- 16 微试讲评分 ---------- */
function rubric(host){
  const rows=[['目标',15],['提问',20],['节奏',15],['参与',20],['成果',15],['安全与边界',15]];
  host.innerHTML='<div class="rubric">'+rows.map((r,i)=>'<div class="rubric-row"><span>'+r[0]+'</span><input type="range" min="1" max="5" value="4" data-w="'+r[1]+'" data-i="'+i+'"><b>4</b></div>').join('')+'</div>'+
    '<div style="display:flex;align-items:end;justify-content:space-between;gap:12px;margin-top:16px"><div><div class="score" id="rubricScore">80</div><small class="hint">满分 100 · 80 分通过</small></div><div class="hint" id="rubricMsg" style="max-width:420px">拖动滑块自评。不要追求完美，追求“下一次只改一处”。</div></div>';
  function calc(){
    let total=0;
    host.querySelectorAll('input[type=range]').forEach(r=>{
      const val=+r.value; const w=+r.dataset.w; total+=w*(val/5);
      r.parentElement.querySelector('b').textContent=val;
    });
    const score=Math.round(total);
    $('#rubricScore',host).textContent=score;
    $('#rubricMsg',host).textContent=score>=80?'通过。把“下一次只改一处”写下来。':score>=60?'还差一点。21 天内复讲一次。':'先别急着复讲；回到“目标”和“参与”两行，各改一个动作。';
  }
  host.querySelectorAll('input[type=range]').forEach(r=>r.oninput=calc);
  calc();
}

/* ---------- 17 21 天行动 ---------- */
function action131(host){
  const key='fxm_action131'; const v=store.get(key,{});
  host.innerHTML='<div class="form-grid">'+
    '<div class="field"><label>回校 7 天内要上的一课</label><input id="aDate" value="'+esc(v.date||'')+'" placeholder="第几章 / 哪个班 / 哪一天"></div>'+
    '<div class="field"><label>我的磨课伙伴</label><input id="aPartner" value="'+esc(v.partner||'')+'" placeholder="姓名 / 手机"></div>'+
    '<div class="field full"><label>要准备的 3 个资源</label><input id="aRes" value="'+esc(v.res||'')+'" placeholder="材料 / 任务卡 / 场地或设备"></div>'+
    '<div class="field full"><label>最想解决的一个问题</label><input id="aProb" value="'+esc(v.prob||'')+'" placeholder="写具体，不写“学生不积极”"></div>'+
    '</div><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><button class="btn primary small" id="aPrint" type="button">生成 21 天行动卡</button><button class="btn small" id="aSave" type="button">保存到本机</button></div>';
  function read(){ return {date:$('#aDate',host).value,partner:$('#aPartner',host).value,res:$('#aRes',host).value,prob:$('#aProb',host).value}; }
  $('#aSave',host).onclick=()=>{ store.set(key,read()); toast('行动卡已保存'); };
  $('#aPrint',host).onclick=()=>{
    const d=read();
    printCard('21 天行动卡','<table style="width:100%;border-collapse:collapse"><tr><td style="width:34%;padding:10px;border:1px solid #ddd"><b>1</b><br>回校 7 天内要上的一课</td><td style="padding:10px;border:1px solid #ddd">'+esc(d.date)+'</td></tr><tr><td style="padding:10px;border:1px solid #ddd"><b>3</b><br>要准备的 3 个资源</td><td style="padding:10px;border:1px solid #ddd">'+esc(d.res)+'</td></tr><tr><td style="padding:10px;border:1px solid #ddd"><b>1</b><br>最想解决的一个问题</td><td style="padding:10px;border:1px solid #ddd">'+esc(d.prob)+'</td></tr><tr><td style="padding:10px;border:1px solid #ddd">磨课伙伴</td><td style="padding:10px;border:1px solid #ddd">'+esc(d.partner)+'</td></tr></table><p style="margin-top:18px">第 7 天复盘：我做到了什么？我卡在哪里？下一次只改什么？</p><p>第 21 天复盘：学生留下了什么证据？我的下一步是什么？</p>');
  };
}

/* ---------- 18 点灯墙 ---------- */
function lightwall(host){
  const key='fxm_lightwall';
  let list=store.get(key,[]);
  host.innerHTML='<div class="lightwall"><div><div class="lamps" id="lamps">'+Array.from({length:12},(_,i)=>'<button class="lampbtn" data-i="'+i+'" type="button">✦</button>').join('')+'</div><p class="hint" id="lampCount" style="margin-top:10px">0 盏灯亮着</p></div><div><div class="field"><label>我要点亮……</label><textarea id="lwText" placeholder="一个学生 / 一个课堂瞬间 / 一个改变"></textarea></div><div style="display:flex;gap:8px;margin-top:8px"><button class="btn primary small" id="lwAdd" type="button">点亮一盏</button><button class="btn small" id="lwReset" type="button">重来</button></div><div class="commit-list" id="commitList"></div></div></div>';
  function paint(){
    const lamps=host.querySelectorAll('.lampbtn');
    lamps.forEach((b,i)=>b.classList.toggle('on',i<list.length));
    $('#lampCount',host).textContent=list.length+' 盏灯亮着';
    $('#commitList',host).innerHTML=list.slice(-8).map(x=>'<div class="commit">“'+esc(x)+'”</div>').join('');
  }
  host.querySelectorAll('.lampbtn').forEach(b=>b.onclick=()=>{
    const i=+b.dataset.i;
    if(i<list.length){ list.splice(i,1); } else { const v=$('#lwText',host).value.trim(); if(!v){ toast('先写一句“我要点亮……”。'); return; } list.push(v); $('#lwText',host).value=''; }
    store.set(key,list); paint();
  });
  $('#lwAdd',host).onclick=()=>{
    const v=$('#lwText',host).value.trim(); if(!v){ toast('先写一句“我要点亮……”。'); return; }
    if(list.length>=12){ toast('12 盏灯都亮了。可以点一盏熄灭，换一句。'); return; }
    list.push(v); store.set(key,list); $('#lwText',host).value=''; paint(); toast('点亮了。');
  };
  $('#lwReset',host).onclick=()=>{ if(confirm('清除所有点灯记录？')){ list=[]; store.set(key,list); paint(); } };
  paint();
}

/* ---------- 19 船票 + 航线 ---------- */
function ticket(host){
  const grid=$('#routeGrid');
  if(grid){
    grid.innerHTML=COURSE.sessions.map(s=>'<button class="route-card'+(sessionDone(s)?' done':'')+'" data-goto="'+flat.findIndex(f=>f.s.id===s.id)+'" type="button"><b>'+s.num+'</b><span>'+s.title+'</span><small>'+s.minutes+' 分钟 · '+esc(s.subtitle)+'</small></button>').join('');
    grid.querySelectorAll('.route-card').forEach(b=>b.onclick=()=>go(parseInt(b.dataset.goto,10)));
  }
  const saved=store.get('fxm_ticket','');
  host.innerHTML='<div class="form-grid"><div class="field full"><label>我的船票 · 今天想带走的一个问题</label><input id="ticketInput" value="'+esc(saved)+'" placeholder="例：怎么让班上最安静的那个孩子也开口？"></div></div><div style="display:flex;gap:8px;align-items:center;margin-top:10px"><button class="btn primary small" id="ticketSave" type="button">写上船票</button><span class="hint" id="ticketMsg">'+(saved?'已写下。最后一天我们会再拿出来。':'写一个具体的问题，不要写“提升能力”。')+'</span></div>';
  $('#ticketSave',host).onclick=()=>{
    const v=$('#ticketInput',host).value.trim(); if(!v){ toast('先写一个问题。'); return; }
    store.set('fxm_ticket',v); $('#ticketMsg',host).textContent='已写下：'+v; toast('船票已保存');
  };
}

/* ---------- print ---------- */
function printCard(title,body){
  const w=window.open('','_blank','width=920,height=1200');
  if(!w){ toast('浏览器拦截了新窗口，请允许弹出窗口。'); return; }
  w.document.write('<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>'+esc(title)+'</title><style>'+
    'body{font-family:"PingFang SC","Microsoft YaHei",sans-serif;color:#111;line-height:1.75;padding:42px 48px;max-width:820px;margin:0 auto}'+
    'h1{font-family:"Songti SC","STSong",serif;font-size:28px;margin:0 0 4px}'+
    '.kicker{font-size:10px;letter-spacing:.2em;color:#8a5a12;margin-bottom:10px}'+
    '.foot{margin-top:34px;font-size:10px;color:#888;border-top:1px solid #ddd;padding-top:10px}'+
    'hr{border:0;border-top:1px solid #ddd;margin:18px 0}'+
    'p{margin:8px 0}table{font-size:13px}input,textarea{border:0;border-bottom:1px solid #bbb;font-family:inherit}'+
    '@media print{body{padding:0}.noprint{display:none}}'+
    '</style></head><body><div class="kicker">发小明 · 教师创新力特训营</div><h1>'+esc(title)+'</h1>'+body+
    '<div class="foot">发小明创新教育 · 世界创新港 · 教师特训营 V2.0 · 可复印用于校内教研</div>'+
    '<script>setTimeout(function(){window.print()},350)<\/script></body></html>');
  w.document.close();
}
addEventListener('hashchange',function(){
  const m=location.hash.match(/^#([a-z0-9]+)-(\d+)$/i); if(!m) return;
  const j=flat.findIndex(f=>f.key===m[1]+'-'+m[2]); if(j>=0 && j!==idx){ idx=j; render(); }
});
setTimeout(start,0);
})();
