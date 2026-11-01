/* =========================================================
   世界创新港 · 章节数据
   第 02 章《生活中的问题侦探》
   ========================================================= */
window.FXM_CHAPTERS=window.FXM_CHAPTERS||{};

window.FXM_CHAPTERS['2']={
no:'02',
title:'生活中的问题侦探',
short:'问题侦探',
badge:'问题侦探',
acc:'#FF7A6B',acc2:'#FFC2B8',rgb:'255,122,107',
cover:`
<div class="cover-stars"></div>
<div class="cover-grid">
  <div class="cover-copy">
    <div class="kicker">CHAPTER 02 · 创新启蒙</div>
    <h1>生活中的<br><span class="line2">问题侦探</span></h1>
    <p class="cover-lead">今天，我们不急着发明任何东西。<br>我们先做一件更重要的事：<b style="color:var(--gold2);font-weight:600">找到值得解决的问题。</b></p>
    <div class="cover-meta"><span class="gold">第 02 章</span><span>发现力 · 批判性思维力</span><span>7–13 岁</span><span>8 幕互动</span></div>
    <div class="cover-actions">
      <button class="btn primary" data-go="1"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>接受侦探任务</button>
      <button class="btn ghost" data-notes><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h5"/></svg>教师指引</button>
    </div>
  </div>
  <div class="portal" aria-hidden="true">
    <svg class="rings" viewBox="0 0 520 520" fill="none">
      <circle cx="260" cy="260" r="250" stroke="rgba(255,122,107,.12)" stroke-dasharray="2 9"/>
      <g class="ring-a"><circle cx="260" cy="260" r="210" stroke="rgba(255,122,107,.3)" stroke-dasharray="1 11"/><circle cx="260" cy="260" r="210" stroke="rgba(245,196,81,.24)" stroke-dasharray="90 1200"/></g>
      <g class="ring-b"><circle cx="260" cy="260" r="164" stroke="rgba(255,122,107,.2)" stroke-dasharray="1 13"/><circle cx="260" cy="260" r="164" stroke="rgba(245,196,81,.24)" stroke-dasharray="52 980"/></g>
      <g class="ring-c"><circle cx="260" cy="260" r="118" stroke="rgba(255,122,107,.35)" stroke-dasharray="1 8"/></g>
    </svg>
    <div class="portal-core" style="background:radial-gradient(circle at 34% 28%,#FFD9C9,rgba(255,122,107,.55) 40%,rgba(255,122,107,.06) 70%)"><svg viewBox="0 0 100 100" width="52%" aria-hidden="true"><circle cx="42" cy="42" r="24" fill="none" stroke="#2a1c05" stroke-width="7"/><path d="M60 60l20 20" stroke="#2a1c05" stroke-width="9" stroke-linecap="round"/></svg></div>
    <div class="portal-word pw1">观察</div><div class="portal-word pw2">记录</div><div class="portal-word pw3">追问</div><div class="portal-word pw4">证据</div>
  </div>
</div>
<div class="cover-foot"><span>发小明 Genesis 创新学院 · 让每个孩子都拥有创造的能力</span><span class="kbd"><span><kbd>→</kbd>前进</span><span><kbd>T</kbd>教师指引</span><span><kbd>F</kbd>全屏</span></span></div>`,

acts:[
/* ---------- 01 侦探任务 ---------- */
{a:'01',name:'侦探任务',time:'',
html:`
<div class="ch-head">
  <div class="act"><b>01</b><span>侦探任务</span></div>
  <h2>先别急着解决，<em>先接一个案子</em></h2>
  <p>今天，我们是生活问题侦探。任务不是马上想出一个办法，而是找到一个问题：它真的发生过，经常发生，而且值得继续调查。</p>
</div>
<div class="case-grid">
  <div class="case-file">
    <div class="case-stamp">CASE<br>02</div>
    <div class="case-kicker">发小明侦探事务所 · 任务简报</div>
    <h3>寻找一个“值得研究的问题”</h3>
    <p>教室里、书包里、放学的路上，都藏着一些让人皱眉的小麻烦。它们不一定很大，但一定让某个人不方便。</p>
    <div class="case-rules">
      <div><b>01</b><span>先观察，不急着下结论</span></div>
      <div><b>02</b><span>把你看到的和猜到的分开</span></div>
      <div><b>03</b><span>选一个能继续调查的问题</span></div>
    </div>
    <div class="case-next"><button class="btn primary" data-go="2">开始现场观察 →</button><span>找到 3 个问题，就可以进入下一步</span></div>
  </div>
  <aside class="case-side">
    <div class="case-stat"><b>?</b><span>案件编号</span></div>
    <div class="case-stat"><b>3</b><span>至少找到 3 个问题</span></div>
    <div class="case-stat"><b>0</b><span>现在先不评价</span></div>
    <div class="case-quote">“一个孩子看见水杯倒了，可能马上想到给水杯加一个底座；但进一步观察后，他也许发现，真正的问题是桌面不平、活动空间太小，或者水杯放在了桌边。”</div>
  </aside>
</div>
<div class="ch-foot-note">问题找得越准确，后面的办法就越有可能有效。</div>`,
init(sec,api){}},

/* ---------- 02 现场观察 ---------- */
{a:'02',name:'现场观察',time:'',
html:`
<div class="ch-head">
  <div class="act"><b>02</b><span>现场观察</span></div>
  <h2>把“哪里不方便”，<em>一个个找出来</em></h2>
  <p>点一点现场里发光的物品，把看到的现象收进记录。先不解释原因，只记录你看见的事实。</p>
</div>
<div class="detective-layout">
  <div class="desk-scene">
    <div class="desk-window"></div><div class="desk-shelf"></div>
    <div class="desk-table"><div class="dt-front"></div><div class="dt-leg l"></div><div class="dt-leg r"></div></div>
    <div class="desk-wall"><span class="dw-poster">今天，换个问法</span><span class="dw-clock">🕘</span></div>
    <div class="desk-surface"></div>
    <button class="clue" data-clue="cup" style="left:70%;top:43%"><span class="ci">🥤</span><span class="cn">桌边水杯</span></button>
    <button class="clue" data-clue="pencil" style="left:48%;top:53%"><span class="ci">✏️</span><span class="cn">滚落的铅笔</span></button>
    <button class="clue" data-clue="eraser" style="left:34%;top:59%"><span class="ci">🩹</span><span class="cn">找不到的橡皮</span></button>
    <button class="clue" data-clue="bag" style="left:24%;top:73%"><span class="ci">🎒</span><span class="cn">混在一起的书包</span></button>
    <button class="clue" data-clue="umbrella" style="left:82%;top:68%"><span class="ci">☂️</span><span class="cn">滴水的雨伞</span></button>
    <button class="clue" data-clue="shelf" style="left:63%;top:24%"><span class="ci">📚</span><span class="cn">够不到的书</span></button>
    <div class="room-tip"><i></i>点击物品 · 找到 3 个以上问题</div>
  </div>
  <aside class="detective-panel">
    <div class="dp2-top"><span>现场记录</span><b><em data-count>0</em> / 6</b></div>
    <div class="obs-row"><button data-timer-start>开始观察 3:00</button><span data-timer-num>03:00</span></div>
    <div data-timer class="obs-timer" style="display:none"><i data-timer-bar></i></div>
    <div class="prob-list" data-clue-list><div class="prob-empty">还没有记录。<br>点一点现场里发光的物品，把“哪里不方便”找出来。</div></div>
    <div class="custom-prob"><input data-custom-clue maxlength="24" placeholder="我自己的问题…"><button data-add-clue>+</button></div>
    <div class="select-hint">找到 3 个问题后，下一步：分清事实和猜测。</div>
  </aside>
</div>
<div class="ch-foot-note">先看清楚，再下判断。侦探的第一件工具，不是答案，是眼睛。</div>`,
init(sec,api){
  const CLUES={
    cup:{icon:'🥤',title:'桌边的水杯一碰就倒',obs:'杯子放在桌子最边上，走过去很容易碰到。',who:'同桌、老师、打扫卫生的人'},
    pencil:{icon:'✏️',title:'铅笔总是滚到地上',obs:'铅笔一碰就滚，已经捡了三次。',who:'我、同桌'},
    eraser:{icon:'🩹',title:'橡皮总是找不到',obs:'橡皮不在文具盒里，翻遍书包才找到。',who:'我、同学'},
    bag:{icon:'🎒',title:'书包里的东西混在一起',obs:'书包只有一个大口袋，所有东西都混在一起。',who:'我、妈妈'},
    umbrella:{icon:'☂️',title:'湿雨伞滴了一地水',obs:'雨伞靠在角落，水顺着伞尖流到地上。',who:'值日生、走路的人'},
    shelf:{icon:'📚',title:'书架最上面的书够不到',obs:'最上层的书太高，踮脚也拿不到。',who:'我、个子小的同学'}
  };
  const S=api.S; S.clues=S.clues||[]; S.customClues=S.customClues||[];
  const list=sec.querySelector('[data-clue-list]'),count=sec.querySelector('[data-count]');
  const panel=sec.querySelector('.detective-panel');
  function render(){
    count.textContent=S.clues.length;
    const all=S.clues.map(id=>CLUES[id]||S.customClues.find(c=>c.id===id)).filter(Boolean);
    if(!all.length){ list.innerHTML='<div class="prob-empty">还没有记录。<br>点一点现场里发光的物品，把“哪里不方便”找出来。</div>'; }
    else{
      list.innerHTML=all.map((c,i)=>'<button class="prob-card'+(S.selectedClue===((c.id)||S.clues[i])?' selected':'')+'" data-pick="'+(c.id||S.clues[i])+'"><span class="pi">'+c.icon+'</span><span class="pt"><b>'+api.esc(c.title)+'</b><span>'+api.esc(c.who||'')+'</span></span><span class="pc">'+(S.selectedClue===((c.id)||S.clues[i])?'✓':'')+'</span></button>').join('');
      list.querySelectorAll('[data-pick]').forEach(b=>b.addEventListener('click',()=>{ S.selectedClue=b.dataset.pick; api.save(); render(); api.sfx('tap'); }));
    }
    sec.querySelectorAll('.clue').forEach(c=>c.classList.toggle('found',S.clues.includes(c.dataset.clue)));
    if(S.selectedClue){
      const c=CLUES[S.selectedClue]||S.customClues.find(x=>x.id===S.selectedClue);
      if(c){ const hint=panel.querySelector('.select-hint'); if(hint)hint.innerHTML='已选择：<b>'+api.esc(c.title)+'</b>'; }
    }
  }
  sec.querySelectorAll('.clue').forEach(b=>b.addEventListener('click',()=>{
    const id=b.dataset.clue; if(!S.clues.includes(id)){ S.clues.push(id); S.selectedClue=id; api.save(); api.sfx('pop'); api.burst(innerWidth*.35,innerHeight*.5,18,['#FF7A6B','#F5C451']); }
    render();
    const c=CLUES[id]; if(c)api.toast('记录：'+c.title,'🔍');
  }));
  const add=sec.querySelector('[data-add-clue]'),inp=sec.querySelector('[data-custom-clue]');
  function addCustom(){
    const v=inp.value.trim(); if(!v){api.toast('先写下你发现的问题','🔍');inp.focus();return;}
    const id='c'+Date.now(); S.customClues.push({id,icon:'💭',title:v,obs:'这是我自己发现的问题。',who:'我自己'});
    S.clues.push(id); S.selectedClue=id; inp.value=''; api.save(); render(); api.sfx('success'); api.toast('收进现场记录了','💭');
  }
  add.addEventListener('click',addCustom); inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addCustom();}});
  // hidden timer UI: reuse main timer display
  const tBtn=sec.querySelector('[data-timer-start]'),tNum=sec.querySelector('[data-timer-num]'),tBar=sec.querySelector('[data-timer-bar]');
  let left=180,tId=null,tRun=false;
  const paintT=()=>{ tNum.textContent=String(Math.floor(left/60)).padStart(2,'0')+':'+String(left%60).padStart(2,'0'); if(tBar)tBar.style.width=(left/180*100)+'%'; };
  tBtn.addEventListener('click',()=>{
    if(tRun){clearInterval(tId);tRun=false;tBtn.textContent='继续观察';return;}
    tRun=true;tBtn.textContent='暂停观察';api.sfx('tap');
    tId=setInterval(()=>{left--;paintT();if(left<=0){clearInterval(tId);tRun=false;tBtn.textContent='重新观察';api.sfx('bell');api.toast('观察时间到，找到几个问题了？','⏰');}},1000);
  });
  paintT();
  render();
}},

/* ---------- 03 现象 vs 猜测 ---------- */
{a:'03',name:'事实还是猜测',time:'',
html:`
<div class="ch-head">
  <div class="act"><b>03</b><span>侦探训练</span></div>
  <h2>你看到的，<em>和你猜到的</em></h2>
  <p>侦探最容易犯的错，是把猜测当成事实。把下面六句话分进两个箱子：哪些是你眼睛看到的？哪些是你脑子里猜的原因？</p>
</div>
<div class="pk-host" data-pk></div>
<div class="sort-layout">
  <div class="sort-pool">
    <div class="sort-title">待分类的线索 <span>拖动，或先点卡片再点箱子</span></div>
    <div class="sort-card" draggable="true" data-key="p1" data-answer="fact">铅笔滚到了地上</div>
    <div class="sort-card" draggable="true" data-key="p2" data-answer="guess">桌子太滑了</div>
    <div class="sort-card" draggable="true" data-key="p3" data-answer="fact">橡皮不在文具盒里</div>
    <div class="sort-card" draggable="true" data-key="p4" data-answer="guess">有人拿走了橡皮</div>
    <div class="sort-card" draggable="true" data-key="p5" data-answer="fact">水杯倒在桌边</div>
    <div class="sort-card" draggable="true" data-key="p6" data-answer="guess">杯子太轻，所以容易倒</div>
  </div>
  <div class="sort-bins">
    <div class="sort-bin" data-bin="fact"><div class="bin-head"><b>👀 我看到的</b><span>事实 · 能直接观察到</span></div><div class="bin-list"></div></div>
    <div class="sort-bin" data-bin="guess"><div class="bin-head"><b>💭 我猜的</b><span>原因 · 还需要证据</span></div><div class="bin-list"></div></div>
  </div>
</div>
<div class="ai-row"><button class="btn sm" data-ai>🤖 AI 追问我</button><div class="ai-out" data-ai-out></div></div>
<div class="ch-foot-note">观察到的事实 ≠ 我们猜测的原因。先把两件事分开，调查才不会跑偏。</div>`,
init(sec,api){
  const pk=api.pkBoard(sec,{teams:['A队','B队'],step:10});
  const ai=api.aiPanel(sec,{prompts:['这句话，是你眼睛看到的，还是你脑子里想到的？','如果换一个位置，这件事还会发生吗？','你怎么证明自己的猜测是对的？','还有没有另一种原因，也能解释你看到的现象？']});
  const S=api.S; S.sorted=S.sorted||0;
  const d=api.dragBins(sec,{
    onCorrect(card,bin){
      api.sfx('success'); api.burst(innerWidth*.55,innerHeight*.45,18,['#FF7A6B','#F5C451']);
      if(pk){ pk.add(pk.active,10); pk.next(); }
      S.sorted=(S.sorted||0)+1; api.save();
      if(S.sorted>=6){ api.toast('6 条线索全部分类完成！','🔍'); api.confetti(60); }
    },
    onWrong(){ api.toast('再想想：这是看见的，还是猜的？','💭'); }
  });
  const foot=sec.querySelector('.ch-foot-note');
  const done=()=>{ if(S.sorted>=6){ foot.innerHTML='分对了。接下来，选一条最想继续追查的线索，去问“为什么”。 <button class="btn sm" data-go="4" style="margin-left:10px">追问原因 →</button>'; } };
  const _onCorrect=d; // dragBins doesn't expose callback hook after init; observe via timer
  const ob=setInterval(()=>{ if(S.sorted>=6){ clearInterval(ob); done(); } },500);
  setTimeout(done,300);
}},

/* ---------- 04 追问原因 ---------- */
{a:'04',name:'追问原因',time:'',
html:`
<div class="ch-head">
  <div class="act"><b>04</b><span>追问原因</span></div>
  <h2>一个问题，<em>不止一个原因</em></h2>
  <p>选一个你最想追查的问题，沿着四条线索问“为什么”。再选出你准备收集的证据——侦探不靠感觉，靠证据。</p>
</div>
<div class="why-layout ch2-why">
  <div class="why-focus">
    <span class="wf-k">我正在调查</span>
    <b data-problem>铅笔总是滚到地上</b>
    <div class="wf-sub">点下面的原因，展开追问；再选证据。</div>
  </div>
  <div class="why-board">
    <button class="why-node" data-cause="position"><span>📍</span><b>位置</b><em>它放在哪里？</em></button>
    <button class="why-node" data-cause="shape"><span>🔵</span><b>形状</b><em>它为什么容易滚？</em></button>
    <button class="why-node" data-cause="action"><span>🖐️</span><b>动作</b><em>是谁碰了它？</em></button>
    <button class="why-node" data-cause="environment"><span>🪑</span><b>环境</b><em>桌面平不平？</em></button>
  </div>
  <div class="why-detail" data-why-detail>
    <div class="sit-cond">
      <div class="sit-cond-top"><span class="sit-tag">SIT · 属性关联</span><b>如果换一个条件，现象会怎样变？</b></div>
      <div class="cond-chips"><button data-cond="shape">换成六角铅笔</button><button data-cond="place">放进笔槽</button><button data-cond="tilt">桌面倾斜</button></div>
      <div class="cond-out" data-cond-out>选一个条件，看看问题会不会变。</div>
    </div>
  </div>
  <aside class="evidence-side">
    <div class="us-head"><span>我的调查计划</span><b><span data-ev-count>0</span> / 3</b></div>
    <div class="evidence-list" data-ev-list><div class="prob-empty" style="font-size:10px">还没有证据。先点一个原因，再选调查方法。</div></div>
    <button class="to-proposal" data-go="5">带着计划去评估 →</button>
  </aside>
</div>
<div class="ai-row"><button class="btn sm" data-ai>🤖 AI 追问我</button><div class="ai-out" data-ai-out></div></div>
<div class="ch-foot-note">“为什么”可以问很多次，但每一次都要落到一个可以观察、可以验证的证据上。</div>`,
init(sec,api){
  const S=api.S; S.evidence=S.evidence||[]; S.causes=S.causes||[];
  const DATA={
    position:{q:'如果把它从桌边移到桌子中间，还会滚吗？',ev:['换一个位置，再试一次','在不同位置各放一次']},
    shape:{q:'换一支不是圆柱形的笔，还会滚吗？',ev:['换一支六角铅笔试','换一支带笔夹的笔试']},
    action:{q:'不动它的时候，它也会滚吗？',ev:['观察 10 分钟不动它','请同桌记录谁碰到了它']},
    environment:{q:'桌面是平的吗？',ev:['用水平尺/水杯水面检查桌面','把桌子换一个方向试']}
  };
  const detail=sec.querySelector('[data-why-detail]'),list=sec.querySelector('[data-ev-list]'),cnt=sec.querySelector('[data-ev-count]');
  const prob=sec.querySelector('[data-problem]');
  if(S.problem)prob.textContent=S.problem;
  function renderEv(){
    cnt.textContent=S.evidence.length;
    const to=sec.querySelector('.to-proposal'); if(to)to.classList.toggle('on',S.evidence.length>0);
    list.innerHTML=S.evidence.length?S.evidence.map((t,i)=>'<div class="ev-item"><b>'+(i+1)+'</b><span>'+api.esc(t)+'</span></div>').join(''):'<div class="prob-empty" style="font-size:10px">还没有证据。先点一个原因，再选调查方法。</div>';
  }
  sec.querySelectorAll('.why-node').forEach(b=>b.addEventListener('click',()=>{
    const k=b.dataset.cause,d=DATA[k]; if(!d)return;
    sec.querySelectorAll('.why-node').forEach(x=>x.classList.toggle('active',x===b));
    detail.innerHTML='<div class="wd-q">“'+api.esc(d.q)+'”</div><div class="wd-label">我可以这样收集证据</div><div class="wd-chips">'+d.ev.map((t,i)=>'<button class="evidence-chip" data-ev="'+api.esc(t)+'">'+api.esc(t)+'</button>').join('')+'</div>';
    detail.querySelectorAll('[data-ev]').forEach(c=>c.addEventListener('click',()=>{
      const t=c.dataset.ev; if(S.evidence.includes(t)){api.toast('这条证据已经在计划里了','✓');return;}
      if(S.evidence.length>=3){api.toast('最多先选 3 条证据，够开始调查了','🔍');return;}
      S.evidence.push(t); S.causes.push(k); api.save(); renderEv(); c.classList.add('on'); api.sfx('success'); api.toast('加入调查计划','✓');
    }));
    api.sfx('tap');
  }));
  renderEv();
  const co=sec.querySelector('[data-cond-out]');const CONDS={shape:'如果换成六角铅笔 → 不容易滚，问题可能消失。',place:'如果放进笔槽 → 不会滚，问题变成“笔槽够不够用”。',tilt:'如果桌面倾斜 → 滚得更快，环境也是原因之一。'};
  sec.querySelectorAll('[data-cond]').forEach(b=>b.addEventListener('click',()=>{sec.querySelectorAll('[data-cond]').forEach(x=>x.classList.toggle('on',x===b));if(co)co.textContent=CONDS[b.dataset.cond]||'';api.sfx('tap');}));
  api.aiPanel(sec,{prompts:['你准备怎么证明这个原因是真的？','如果这个原因不成立，还有什么可能？','你观察到的现象，能支持你的猜测吗？','下一步最小的一次调查，可以怎么做？']});
}},

/* ---------- 05 优先级 ---------- */
{a:'05',name:'给问题排序',time:'',
html:`
<div class="ch-head">
  <div class="act"><b>05</b><span>给问题排序</span></div>
  <h2>不是所有问题，<em>都值得马上研究</em></h2>
  <p>用四个维度给候选问题打分。分数不是标准答案，只是帮你把“我真的很想研究”说清楚。</p>
</div>
<div class="matrix">
  <div class="matrix-head"><span>候选问题</span><span>真实程度</span><span>发生频率</span><span>影响程度</span><span>可探索性</span><span>总分</span></div>
  <div class="matrix-row" data-prob="pencil"><div class="mr-name"><b>铅笔总是滚到地上</b><span>学习时经常发生</span></div><div class="mr-stars" data-crit="real"></div><div class="mr-stars" data-crit="freq"></div><div class="mr-stars" data-crit="impact"></div><div class="mr-stars" data-crit="explore"></div><div class="mr-total" data-total>0</div></div>
  <div class="matrix-row" data-prob="eraser"><div class="mr-name"><b>橡皮总是找不到</b><span>写作业时很浪费时间</span></div><div class="mr-stars" data-crit="real"></div><div class="mr-stars" data-crit="freq"></div><div class="mr-stars" data-crit="impact"></div><div class="mr-stars" data-crit="explore"></div><div class="mr-total" data-total>0</div></div>
  <div class="matrix-row" data-prob="umbrella"><div class="mr-name"><b>湿雨伞滴了一地水</b><span>雨天教室容易滑</span></div><div class="mr-stars" data-crit="real"></div><div class="mr-stars" data-crit="freq"></div><div class="mr-stars" data-crit="impact"></div><div class="mr-stars" data-crit="explore"></div><div class="mr-total" data-total>0</div></div>
</div>
<div class="matrix-foot"><span>每项 1–3 分 · 点星星打分</span><button class="btn primary" data-pick-problem disabled>选它作为我的调查问题 →</button></div>
<div class="ai-row"><button class="btn sm" data-ai>🤖 AI 追问我</button><div class="ai-out" data-ai-out></div></div>
<div class="ch-foot-note">评分只是帮助思考的工具，不是科学测量，也不必把分数最高的问题机械地作为最终选择。</div>`,
init(sec,api){
  const S=api.S; S.matrix=S.matrix||{};
  const names={pencil:'铅笔总是滚到地上',eraser:'橡皮总是找不到',umbrella:'湿雨伞滴了一地水'};
  let picked='';
  const rows=sec.querySelectorAll('.matrix-row');
  rows.forEach(row=>{
    const id=row.dataset.prob;
    row.querySelectorAll('.mr-stars').forEach(cell=>{
      const crit=cell.dataset.crit; cell.innerHTML='';
      for(let i=1;i<=3;i++){ const b=document.createElement('button'); b.type='button'; b.className='star-btn'; b.textContent='★'; b.dataset.v=i; b.onclick=()=>{ S.matrix[id]=S.matrix[id]||{}; S.matrix[id][crit]=i; api.save(); paint(row); api.sfx('tap'); }; cell.appendChild(b); }
    });
    row.addEventListener('click',e=>{ if(e.target.closest('.star-btn'))return; picked=id; rows.forEach(r=>r.classList.toggle('selected',r===row)); const btn=sec.querySelector('[data-pick-problem]'); if(btn){btn.disabled=false;} });
  });
  function paint(row){
    const id=row.dataset.prob,m=S.matrix[id]||{}; let total=0;
    row.querySelectorAll('.mr-stars').forEach(cell=>{ const crit=cell.dataset.crit,v=m[crit]||0; total+=v; cell.querySelectorAll('.star-btn').forEach(b=>b.classList.toggle('on',+b.dataset.v<=v)); });
    row.querySelector('[data-total]').textContent=total;
  }
  rows.forEach(paint);
  sec.querySelector('[data-pick-problem]').onclick=()=>{
    if(!picked){api.toast('先点一行候选问题','🔍');return;}
    S.problem=names[picked]; S.problemId=picked; api.save(); api.sfx('success'); api.toast('就研究这个：'+S.problem,'✓'); api.go(6);
  };
  api.aiPanel(sec,{prompts:['这个问题真的发生过吗？你亲眼见过几次？','它影响了谁？影响有多大？','如果只能研究一个，你最想搞清楚哪个？','你有没有可能解决它？需要什么材料？']});
}},

/* ---------- 06 调查报告 ---------- */
{a:'06',name:'调查报告',time:'',
html:`
<div class="ch-head">
  <div class="act"><b>06</b><span>调查报告</span></div>
  <h2>把你的发现，<em>写成一份报告</em></h2>
  <p>不用写得很长。把问题、场景、你看到的、你猜的、下一步怎么查写清楚，就是一份真正的调查报告。</p>
</div>
<div class="report-layout ch2-report">
  <form class="report-form form-two" onsubmit="return false">
    <div class="field"><label>00 我的名字 <b>NAME</b></label><input data-name maxlength="12" placeholder="写下你的名字或昵称"></div>
    <div class="field"><label>01 问题名称 <b>PROBLEM</b></label><input data-f="problem" maxlength="40" placeholder="例如：铅笔总是滚到地上"></div>
    <div class="field"><label>02 发生的场景 <b>SCENE</b></label><input data-f="scene" maxlength="50" placeholder="在哪里、什么时候发生？"></div>
    <div class="field"><label>03 我观察到的现象 <b>FACT</b></label><textarea data-f="fact" maxlength="90" placeholder="只写你看到的，不写你猜的"></textarea></div>
    <div class="field"><label>04 我猜的原因 <b>GUESS</b></label><textarea data-f="guess" maxlength="90" placeholder="可能的原因，还需要证据"></textarea></div>
    <div class="field"><label>05 我还想知道 / 准备怎么查 <b>NEXT</b></label><textarea data-f="next" maxlength="90" placeholder="下一步准备问谁、看什么、试什么？"></textarea></div>
  </form>
  <div class="draw-panel">
    <div class="draw-head"><span>画出你的现场 · SKETCH</span><div class="draw-tools" data-draw-tools>
      <button type="button" data-color="#F5C451" class="on" style="background:#F5C451"></button><button type="button" data-color="#FFFFFF" style="background:#FFF"></button><button type="button" data-color="#4FE0D0" style="background:#4FE0D0"></button><button type="button" data-color="#FF7A6B" style="background:#FF7A6B"></button><button type="button" data-color="#A78BFA" style="background:#A78BFA"></button>
      <button type="button" data-size="3">·</button><button type="button" data-size="7" class="on">●</button><button type="button" data-size="15">⬤</button>
      <button type="button" data-eraser>◻</button><button type="button" data-undo>↺</button><button type="button" data-clear>✕</button>
    </div></div>
    <div class="canvas-wrap"><canvas data-draw width="1000" height="620"></canvas><div class="canvas-hint">画出问题发生的位置<br>圈出你观察到的地方</div></div>
    <div class="draw-foot"><span>支持鼠标 / 手指 / 触控笔</span><span data-draw-state>未开始</span></div>
  </div>
</div>
<div class="proposal-cta"><div class="prop-progress"><div class="pt"><span>报告完成度</span><b data-pct>0%</b></div><div class="pbar"><i data-bar></i></div></div><button class="btn primary" data-gen>生成调查报告 →</button></div>
<div class="ch-foot-note">最后一步不是“写得漂亮”，而是“写得清楚”：问题是什么，我看到了什么，我准备怎么查。</div>`,
init(sec,api){
  const S=api.S; S.report=S.report||{};
  const nameEl=sec.querySelector('[data-name]'); if(nameEl){ nameEl.value=S.name||''; nameEl.addEventListener('input',()=>{S.name=nameEl.value;api.save();}); }
  const fields=sec.querySelectorAll('[data-f]');
  const draw=api.initDrawing(sec,url=>{S.drawing=url;api.save();paint();sec.querySelector('[data-draw-state]').textContent='已保存';});
  if(S.drawing&&draw)draw.load(S.drawing);
  fields.forEach(el=>{ const k=el.dataset.f; el.value=S.report[k]||''; el.addEventListener('input',()=>{S.report[k]=el.value;api.save();paint();}); });
  if(S.problem&&!S.report.problem){S.report.problem=S.problem;const el=sec.querySelector('[data-f="problem"]');if(el)el.value=S.problem;}
  if(S.evidence&&S.evidence.length&&!S.report.next){S.report.next='我准备：'+S.evidence.join('；')+'。';const el=sec.querySelector('[data-f="next"]');if(el)el.value=S.report.next;}
  function paint(){ let n=0; ['problem','scene','fact','guess','next'].forEach(k=>{if((S.report[k]||'').trim())n++;}); if(S.drawing)n++; const pct=Math.round(n/6*100); const p=sec.querySelector('[data-pct]'),b=sec.querySelector('[data-bar]'); if(p)p.textContent=pct+'%'; if(b)b.style.width=pct+'%'; }
  paint();
  sec.querySelector('[data-gen]').onclick=()=>{
    const r=S.report;
    if(!r.problem||!r.fact){api.toast('至少写下问题和你观察到的现象','🔍');return;}
    api.previewSheet({title:'问题侦探调查报告',subtitle:'第 02 章 · 生活中的问题侦探',code:'FXM-CUR-Q1-002',badge:'问题侦探',name:S.name||'小小侦探',date:new Date().toLocaleDateString('zh-CN'),filename:'问题侦探调查报告_'+(S.name||'小小侦探'),stamp:'问题侦探',lab:{chapter:'02',chapterTitle:'生活中的问题侦探',name:S.name||'小小侦探',product:r.problem||'问题侦探报告',problem:r.fact||r.problem,how:r.next||'',improve:r.guess||''},fields:[{label:'问题名称',value:r.problem},{label:'发生的场景',value:r.scene},{label:'我观察到的现象',value:r.fact},{label:'我猜的原因',value:r.guess},{label:'我还想知道 / 准备怎么查',value:r.next}],drawing:S.drawing,drawLabel:'现场示意图 · SKETCH',footer:'观察 → 记录 → 追问 → 证据'});
  };
  api.aiPanel(sec,{prompts:['你写的是现象，还是原因？','这份报告里，哪一句话最需要证据？','如果别人来调查，他还需要知道什么？']});
}},

/* ---------- 07 发布会 + 徽章 ---------- */
{a:'07',name:'侦探发布会',time:'',
html:`
<div class="ch-head">
  <div class="act"><b>07</b><span>侦探发布会</span></div>
  <h2>用一分钟，<em>讲清楚你的发现</em></h2>
  <p>不用背稿。看着屏幕上的句子，把“我发现了什么、我猜为什么、我准备怎么查”讲给同学听。</p>
</div>
<div class="stage-wrap">
  <div class="curtain l"></div><div class="curtain r"></div><div class="spot"></div><div class="stage-floor"></div>
  <div class="stage-content">
    <div class="stage-top"><span>侦探发布会 · 第 <b>1</b> 位</span><span class="who">小小侦探</span></div>
    <div class="speech">
      <p class="lead">大家好，我是 <b data-name>小小侦探</b>。</p>
      <p>我发现的问题是：<b data-p>……</b></p>
      <p>我观察到：<b data-f>……</b></p>
      <p>我猜原因可能是：<b data-g>……</b></p>
      <p>接下来，我准备这样调查：<b data-n>……</b></p>
    </div>
    <div class="stage-controls">
      <div class="timer" data-timer>
        <div class="mini-timer"><b data-timer-num>60</b><span>秒</span></div>
        <div class="timer-btns"><button class="main" data-timer-start>开始 60 秒</button><button data-timer-reset>重置</button></div>
      </div>
      <div class="applause"><button class="applause-btn" data-clap>👏</button><div class="applause-meter"><div class="am-top"><span>掌声能量</span><b><span data-clap-count>0</span></b></div><div class="ambar"><i data-clap-bar></i></div></div></div>
      <button class="btn ghost sm" data-go="8">领取徽章 →</button>
    </div>
  </div>
</div>
<div class="stage-rules"><div class="rule"><span class="ri">👂</span><div><b>先理解，再建议</b><p>先说你听懂了什么，再提出你的问题。</p></div></div><div class="rule"><span class="ri">🤝</span><div><b>可以讨论，不嘲笑</b><p>可以问“你怎么证明”，但不能说“这太傻了”。</p></div></div></div>
<div class="ch-foot-note">讲清楚，比讲得漂亮更重要。让别人理解你的发现，也是侦探能力的一部分。</div>`,
init(sec,api){
  const S=api.S,r=S.report||{};
  const set=(s,v)=>{const el=sec.querySelector(s);if(el)el.textContent=v||'……';};
  set('[data-p]',r.problem||S.problem);set('[data-f]',r.fact);set('[data-g]',r.guess);set('[data-n]',r.next);set('[data-name]',S.name||'小小侦探');
  api.timer(sec,{seconds:60,onEnd:()=>api.toast('时间到，谢谢大家的聆听','⏰')});
  let energy=0,count=0;
  sec.querySelector('[data-clap]').onclick=()=>{ energy=Math.min(100,energy+7); count++; sec.querySelector('[data-clap-count]').textContent=count; sec.querySelector('[data-clap-bar]').style.width=energy+'%'; api.sfx('pop'); api.burst(innerWidth*.5,innerHeight*.55,10,['#FF7A6B','#F5C451','#FFE3A6']); };
}},

/* ---------- 08 徽章 ---------- */
{a:'08',name:'问题侦探徽章',time:'',
html:`
<div class="finale">
  <div class="badge-stage"><div class="badge-rays"></div><div class="badge"><div class="badge-inner">
    <span class="b-kicker">FXM · GENESIS</span><div class="b-star">★</div><b>问题侦探</b><span class="bn" data-badge-name>小小侦探</span><span class="b-date" data-badge-date>第 02 章</span>
  </div></div></div>
  <h2>你已经有了一双<em>侦探的眼睛</em></h2>
  <p class="sub">你完成了一次真正的调查：先观察，再分清事实和猜测，追问原因，做出选择，最后把发现讲给别人听。</p>
  <div class="journey">
    <div class="jstep"><span class="ji">👀</span><b>观察</b><span>看见哪里不方便</span></div>
    <div class="jstep"><span class="ji">🧾</span><b>记录</b><span>把事实写下来</span></div>
    <div class="jstep"><span class="ji">❓</span><b>追问</b><span>找出可能的原因</span></div>
    <div class="jstep"><span class="ji">🎤</span><b>发布</b><span>讲清楚你的发现</span></div>
  </div>
  <div class="reflect"><div><b>想一想 01</b><p>今天你发现的问题，以前有没有注意到？</p></div><div><b>想一想 02</b><p>你差点把哪个猜测当成了事实？</p></div><div><b>想一想 03</b><p>下一步你最想调查什么？</p></div></div>
  <div class="homework"><span class="hi">🏠</span><div><b>家庭任务 · 一周三个问题</b><p>在家里找三个“不太方便”的瞬间，记录你看到的和猜到的，下周带来和同学交换。</p></div></div>
  <div class="final-actions"><button class="btn primary" data-cert>下载侦探证书</button><button class="btn" data-go="7">回到发布会</button><a class="btn ghost" href="course-index.html">回到课程目录</a></div>
  <div class="final-quote">“侦探不是知道所有答案的人，而是愿意多看一眼、多问一句、多找一份证据的人。”</div>
</div>`,
init(sec,api){
  const S=api.S;
  const name=S.name||'小小侦探';
  sec.querySelector('[data-badge-name]').textContent=name;
  sec.querySelector('[data-badge-date]').textContent='2026 · 第 02 章';
  sec.querySelector('[data-cert]').onclick=()=>{
    const r=S.report||{};
    api.downloadSheet({title:'问题侦探证书',subtitle:'第 02 章 · 生活中的问题侦探',code:'FXM-CUR-Q1-002',badge:'问题侦探',name,date:new Date().toLocaleDateString('zh-CN'),filename:'问题侦探证书_'+name,stamp:'问题侦探',fields:[{label:'我发现的问题',value:r.problem||S.problem},{label:'我观察到的现象',value:r.fact},{label:'我准备继续调查',value:r.next}],drawing:S.drawing,drawLabel:'现场示意图',footer:'观察 → 记录 → 追问 → 证据'});
    api.sfx('success');api.confetti(90);
  };
  setTimeout(()=>{api.confetti(80);api.sfx('chime');},400);
}}
],

notes:[
{html:`<div class="note-block"><h4>本章目标</h4><p>训练孩子发现真实问题、区分现象与猜测，用 SIT 属性关联追问“如果换一个条件会怎样”，并选出一个值得继续研究的问题。核心不是“马上做出作品”，而是把问题找准确。</p><h4>教师角色</h4><p>不急着评价问题大小，不急着给答案。用追问帮孩子把“我不喜欢”变成“哪里不方便、谁受影响、什么时候发生”。</p><h4>课堂节奏</h4><p>本章按 8 幕设计，可拆成多次课。建议第 1–3 幕一次，第 4–6 幕一次，第 7–8 幕一次；也可根据班级情况合并。</p><div class="warn">不要在本章要求孩子做出作品。问题找得越准确，第 3、4 章才有可能做出真正有用的东西。</div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>建立侦探任务感：今天先不发明，先找值得研究的问题。</p><h4>关键提问</h4><ul><li>“最近一周，有没有什么事让你觉得不方便？”</li><li>“这个问题真的发生过吗？你亲眼见过几次？”</li><li>“它让谁觉得不方便？”</li></ul><h4>常见困难</h4><p>孩子说“我不喜欢写作业”“我希望作业自动完成”时，不要否定，继续追问：“写作业的哪一步最麻烦？是找东西、坐不住，还是不会做？”</p><div class="warn">先接住孩子的抱怨，再帮他把抱怨变成可以观察的问题。</div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>通过现场观察，找到至少 3 个具体的不方便，并记录下来。</p><h4>关键提问</h4><ul><li>“你看到的是什么？先不解释原因。”</li><li>“它在什么位置？什么时候发生？”</li><li>“如果换一个位置，还会发生吗？”</li></ul><h4>操作提示</h4><p>点现场物品收集线索；也可以输入孩子自己的问题。点“开始观察”做 3 分钟现场计时。不要急着选“最好的问题”，先让数量出来。</p><h4>常见困难</h4><p>孩子说“都差不多”时，请他指出具体位置和动作：“是走到哪里碰到？碰的是杯子的哪一边？”</p></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>区分“我看到的”和“我猜的”，这是本章最重要的思维训练。</p><h4>关键提问</h4><ul><li>“这句话，是你眼睛看到的，还是脑子里想到的？”</li><li>“你怎么证明自己的猜测？”</li><li>“还有没有另一种原因，也能解释同样的现象？”</li></ul><h4>操作提示</h4><p>拖动卡片到“事实”或“猜测”箱子；触屏可以先点卡片再点箱子。答对给当前队伍 +10 分，自动换队。全部分类后进入追问。</p><h4>常见困难</h4><p>孩子把“桌子太滑”当成事实时，追问：“你摸过桌面吗？还是你只是觉得？”</p><div class="warn">不要用“对/错”评价孩子的猜测；猜测是有价值的，只是需要证据。</div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>学习从一个现象追问多个可能原因，并设计最小的调查动作。</p><h4>关键提问</h4><ul><li>“如果换一个位置，还会发生吗？”</li><li>“如果换一支笔，还会发生吗？”</li><li>“你准备怎么证明？”</li></ul><h4>操作提示</h4><p>点四个原因中的任意一个，会展开追问和调查方法；最多选 3 条证据。让孩子说“我准备怎么做”，而不是只说“我觉得”。</p><h4>常见困难</h4><p>孩子只选一个原因就下结论时，提醒：“侦探通常会准备两个可能的解释，再去排除。”</p></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>用四个维度给问题打分，并做出一个有理有据的选择。</p><h4>关键提问</h4><ul><li>“这个问题真的发生过吗？”</li><li>“它经常发生吗？影响了谁？”</li><li>“你有机会继续研究它吗？”</li></ul><h4>操作提示</h4><p>每个维度 1–3 星，点星星打分；点一行选中候选问题。分数不是标准答案，不必机械选最高分。</p><h4>常见困难</h4><p>孩子只看“好不好玩”时，提醒：“如果我们研究它，能不能找到证据？能不能做一个小实验？”</p></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>完成一份《问题侦探调查报告》，留下可继续研究的过程记录。</p><h4>关键提问</h4><ul><li>“你写的是现象，还是原因？”</li><li>“这份报告里，哪一句话最需要证据？”</li><li>“如果别人来调查，他还需要知道什么？”</li></ul><h4>操作提示</h4><p>填写 5 个字段，画一张现场示意图，点“生成调查报告”可下载图片。也可以让孩子先在纸质任务单上写，再由老师录入。</p><h4>常见困难</h4><p>孩子不会写字时，允许画图 + 口述，老师代记关键词。不要替孩子写答案。</p></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>用 60 秒讲清楚“问题、现象、猜测、下一步调查”，并体验被倾听。</p><h4>操作提示</h4><p>点“开始 60 秒”，同学点“鼓掌”加油。先请孩子看屏幕上的句子说，不要求背稿。</p><h4>两条规则</h4><ul><li>先理解，再建议。</li><li>可以讨论证据，不能嘲笑提出猜测的人。</li></ul><div class="warn">孩子紧张时，允许只展示现场示意图，由老师协助表达。</div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>回顾本章的侦探过程，颁发“问题侦探”徽章，把观察延伸到家庭。</p><h4>三个反思问题</h4><ul><li>今天你发现的问题，以前有没有注意到？</li><li>你差点把哪个猜测当成了事实？</li><li>下一步你最想调查什么？</li></ul><h4>家庭任务</h4><p>一周记录 3 个“不太方便”的瞬间：写清楚你看到的、你猜的，以及你准备怎么查。</p><h4>与平台衔接</h4><p>报告可下载，也可以存入“我的实验室”。建议下一步用“六院圆桌”继续发散，用“路演大师”练习表达。</p></div>`}
]
};

/* =========================================================
   第 03 章《一个问题，一百种想法》
   ========================================================= */
window.FXM_CHAPTERS['3']={
no:'03',
title:'一个问题，一百种想法',
short:'一百种想法',
badge:'创意发散家',
acc:'#A78BFA',acc2:'#D8C8FF',rgb:'167,139,250',
cover:`
<div class="cover-stars"></div>
<div class="cover-grid">
  <div class="cover-copy">
    <div class="kicker">CHAPTER 03 · 创新启蒙</div>
    <h1>一个问题，<br><span class="line2">一百种想法</span></h1>
    <p class="cover-lead">第一个想到的办法，不一定是最好的办法。<br>今天，我们用 <b style="color:var(--gold2);font-weight:600">SIT 五工具</b> 让想法长出不同的方向，再讨论哪一个值得做。</p>
    <div class="cover-meta"><span class="gold">第 03 章</span><span>想象力 · 设计力</span><span>7–13 岁</span><span>6 幕互动</span></div>
    <div class="cover-actions"><button class="btn primary" data-go="1"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>开始发散</button><button class="btn ghost" data-notes><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h5"/></svg>教师指引</button></div>
  </div>
  <div class="portal" aria-hidden="true">
    <svg class="rings" viewBox="0 0 520 520" fill="none">
      <circle cx="260" cy="260" r="250" stroke="rgba(167,139,250,.14)" stroke-dasharray="2 9"/>
      <g class="ring-a"><circle cx="260" cy="260" r="210" stroke="rgba(167,139,250,.3)" stroke-dasharray="1 11"/><circle cx="260" cy="260" r="210" stroke="rgba(245,196,81,.22)" stroke-dasharray="90 1200"/></g>
      <g class="ring-b"><circle cx="260" cy="260" r="164" stroke="rgba(167,139,250,.22)" stroke-dasharray="1 13"/><circle cx="260" cy="260" r="164" stroke="rgba(79,224,208,.2)" stroke-dasharray="52 980"/></g>
    </svg>
    <div class="portal-core" style="background:radial-gradient(circle at 34% 28%,#EDE4FF,rgba(167,139,250,.55) 42%,rgba(167,139,250,.06) 72%)"><svg viewBox="0 0 100 100" width="50%" aria-hidden="true"><path d="M50 14c-14 0-24 10-24 23 0 9 5 14 9 19 3 3 4 6 4 10h22c0-4 1-7 4-10 4-5 9-10 9-19 0-13-10-23-24-23z" fill="none" stroke="#241b3d" stroke-width="5"/><path d="M40 76h20M43 84h14" stroke="#241b3d" stroke-width="5" stroke-linecap="round"/></svg></div>
    <div class="portal-word pw1">减法</div><div class="portal-word pw2">合并</div><div class="portal-word pw3">乘法</div><div class="portal-word pw4">依赖</div>
  </div>
</div>
<div class="cover-foot"><span>发小明 Genesis 创新学院 · 让每个孩子都拥有创造的能力</span><span class="kbd"><span><kbd>→</kbd>前进</span><span><kbd>T</kbd>教师指引</span><span><kbd>F</kbd>全屏</span></span></div>`,

acts:[
{a:'01',name:'纸的挑战',time:'',
html:`
<div class="ch-head"><div class="act"><b>01</b><span>创意热身</span></div><h2>一张纸，<em>除了写字还能做什么？</em></h2><p>先不管“有没有用”。点一点纸周围的空白，看看一张最普通的纸，能变出多少种可能。</p></div>
<div class="paper-layout ch3-paper">
  <div class="paper-stage">
    <div class="paper-sheet"><span>一张纸</span></div>
    <button class="paper-idea" data-use="plane" style="left:20%;top:22%"><b>折纸飞机</b><span>让纸飞起来</span></button>
    <button class="paper-idea" data-use="mat" style="left:80%;top:20%"><b>垫杯垫</b><span>保护桌面</span></button>
    <button class="paper-idea" data-use="tube" style="left:14%;top:56%"><b>卷纸筒</b><span>做望远镜</span></button>
    <button class="paper-idea" data-use="bookmark" style="left:86%;top:56%"><b>做书签</b><span>夹在书里</span></button>
    <button class="paper-idea" data-use="puzzle" style="left:26%;top:86%"><b>撕成拼图</b><span>重新拼起来</span></button>
    <button class="paper-idea" data-use="filter" style="left:74%;top:86%"><b>当滤纸</b><span>试试过滤</span></button>
  </div>
  <aside class="discover-panel">
    <div class="dp-head"><span>已经发现的可能</span><b><em data-count>0</em> / 6</b></div>
    <div class="dp-bar"><i data-bar></i></div>
    <ul class="use-list" data-list><li class="use-empty">还没有发现。点一点纸周围的想法开始吧——<br>越不一样越好。</li></ul>
    <div class="custom-use on"><label>再加一种 · 写下来</label><div class="row"><input data-custom maxlength="20" placeholder="比如：折成小盒子…"><button data-add>+</button></div></div>
  </aside>
</div>
<div class="paper-constraints"><span style="font-size:9.5px;color:var(--faint);align-self:center">换一个条件：</span><button data-c="拿掉一个角" title="SIT 减法">拿掉一个角？</button><button data-c="复制一张纸" title="SIT 乘法">复制一张纸？</button><button data-c="同时装一本书" title="SIT 一专多能">同时装一本书？</button></div>
<div class="ai-row"><button class="btn sm" data-ai>🤖 AI 追问我</button><div class="ai-out" data-ai-out></div></div>
<div class="ch-foot-note" data-cfoot>改变一个条件，想法就会跟着变。先让数量出来，再讨论质量。</div>`,
init(sec,api){
  const S=api.S; S.uses=S.uses||[]; S.customUses=S.customUses||[];
  const USES={
    plane:{icon:'✈️',name:'折纸飞机',desc:'让一张平面的纸，变成会飞的东西。'},
    mat:{icon:'🥤',name:'垫杯垫',desc:'保护桌面，也保护杯子。'},
    tube:{icon:'🔭',name:'卷纸筒',desc:'卷起来，就能看见更远的地方。'},
    bookmark:{icon:'🔖',name:'做书签',desc:'夹在书里，记住读到哪里。'},
    puzzle:{icon:'🧩',name:'撕成拼图',desc:'打碎再重组，变成一个新游戏。'},
    filter:{icon:'🧪',name:'当滤纸',desc:'试一试，它能不能把水变干净。'}
  };
  const list=sec.querySelector('[data-list]'),cnt=sec.querySelector('[data-count]'),bar=sec.querySelector('[data-bar]');
  function render(){
    cnt.textContent=S.uses.length; bar.style.width=(S.uses.length/6*100)+'%';
    const items=S.uses.map(id=>USES[id]).filter(Boolean).map(u=>'<li><span class="ui">'+u.icon+'</span><div><b>'+u.name+'</b><p>'+u.desc+'</p></div></li>');
    S.customUses.forEach(t=>items.push('<li class="custom"><span class="ui">💭</span><div><b>你的想法</b><p>'+api.esc(t)+'</p></div></li>'));
    list.innerHTML=items.length?items.join(''):'<li class="use-empty">还没有发现。点一点纸周围的想法开始吧——<br>越不一样越好。</li>';
    sec.querySelectorAll('.paper-idea').forEach(b=>b.classList.toggle('found',S.uses.includes(b.dataset.use)));
  }
  sec.querySelectorAll('.paper-idea').forEach(b=>b.addEventListener('click',()=>{ const id=b.dataset.use; if(S.uses.includes(id))return; S.uses.push(id); api.save(); render(); api.sfx('pop'); api.burst(innerWidth*.45,innerHeight*.45,16,['#A78BFA','#F5C451']); }));
  const inp=sec.querySelector('[data-custom]'),add=sec.querySelector('[data-add]');
  add.onclick=()=>{ const v=inp.value.trim(); if(!v){api.toast('先写一个想法','💡');inp.focus();return;} S.customUses.push(v); inp.value=''; api.save(); render(); api.sfx('success'); api.toast('记下了：'+v,'💭'); };
  inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();add.click();}});
  sec.querySelectorAll('[data-c]').forEach(b=>b.addEventListener('click',()=>{ sec.querySelectorAll('[data-c]').forEach(x=>x.classList.toggle('on',x===b)); const f=sec.querySelector('[data-cfoot]'); if(f)f.textContent='条件变了：“'+b.dataset.c+'”。再想想，纸还能怎么用？'; api.sfx('tap'); }));
  render();
  api.aiPanel(sec,{prompts:['如果不用手折，还能怎么改变它？','如果纸不是平的，会变成什么？','如果它只能承受重量，不能写字，会变成什么？','还有没有一种用法，和刚才所有答案都不一样？']});
}},

{a:'02',name:'五种方法',time:'',
html:`
<div class="ch-head"><div class="act"><b>02</b><span>方法工作台</span></div><h2>给想法装上<em>五种翅膀</em></h2><p>把左边的方法拖到工作台，或者直接点它。每一种方法都会给你一个不同的追问角度。</p></div>
<div class="method-lab">
  <aside class="method-panel">
    <h4>五种创意方法 · 拖动或点击</h4>
    <div class="method-card" draggable="true" data-method="subtract"><b>➖ 减法</b><span>拿掉一个部件，会怎样？</span></div>
    <div class="method-card" draggable="true" data-method="unify"><b>🔗 一专多能</b><span>让一个部件做两件事</span></div>
    <div class="method-card" draggable="true" data-method="multiply"><b>✖️ 乘法</b><span>复制一个部件，再改变</span></div>
    <div class="method-card" draggable="true" data-method="divide"><b>➗ 除法</b><span>拆成几部分，重新排列</span></div>
    <div class="method-card" draggable="true" data-method="depend"><b>⚡ 属性关联</b><span>如果……就……</span></div>
    <div class="method-drop" data-drop>把方法放到这里</div>
  </aside>
  <div class="idea-lab">
    <div class="idea-problem">我们要解决的问题：<b data-problem>书包里的东西总是乱糟糟的</b></div>
    <div class="idea-prompt" data-prompt>先选一个方法，看看它会怎么追问。</div>
    <div class="idea-slots-5" data-slots></div>
    <div class="idea-composer"><input data-idea maxlength="60" placeholder="写下你的一个办法…"><button data-add-idea>放进想法槽</button></div>
    <div class="ch-foot-note" style="margin-top:8px" data-foot>先让想法长出来。五个想法不用都“靠谱”，但要不一样。</div>
  </div>
</div>
<div class="ai-row"><button class="btn sm" data-ai>🤖 AI 追问我</button><div class="ai-out" data-ai-out></div></div>`,
init(sec,api){
  const S=api.S; S.ideas=S.ideas||[]; S.method=S.method||''; if(!['subtract','unify','multiply','divide','depend'].includes(S.method))S.method=''; S.picked=typeof S.picked==='number'?S.picked:-1;
  let prev={}; try{ prev=JSON.parse(localStorage.getItem('fxm_ch2_v1')||'{}')||{}; }catch(e){}
  S.problem=S.problem||prev.problem||'书包里的东西总是乱糟糟的';
  const PROMPTS={
    subtract:'减法：拿掉一个“看起来必须有”的部件，它还能做什么？',
    unify:'一专多能：让一个部件同时做两件事，而不是简单堆功能。',
    multiply:'乘法：复制一个部件，再改变它的大小、数量或位置。',
    divide:'除法：把整体拆成几部分，再重新排列，会出现什么新结构？',
    depend:'属性关联：如果……就……，让一个条件决定另一个变化。'
  };
  const NAMES={subtract:'减法',unify:'一专多能',multiply:'乘法',divide:'除法',depend:'属性关联'};
  const prob=sec.querySelector('[data-problem]'),prompt=sec.querySelector('[data-prompt]'),slots=sec.querySelector('[data-slots]'),drop=sec.querySelector('[data-drop]'),inp=sec.querySelector('[data-idea]'),foot=sec.querySelector('[data-foot]');
  prob.textContent=S.problem;
  function setMethod(k){
    S.method=k; api.save(); sec.querySelectorAll('.method-card').forEach(c=>c.classList.toggle('active',c.dataset.method===k)); prompt.textContent=PROMPTS[k]||''; if(drop)drop.textContent='当前方法：'+(NAMES[k]||''); api.sfx('tap');
  }
  function render(){
    slots.innerHTML='';
    for(let i=0;i<5;i++){ const it=S.ideas[i]; const d=document.createElement('div'); d.className='slot5'+(it?' filled':'')+(S.picked===i?' picked':''); d.innerHTML='<div class="s5top"><b>'+String(i+1).padStart(2,'0')+'</b><span>'+(it?api.esc(it.method||'自由'):'等待')+'</span></div>'+(it?'<p>'+api.esc(it.text)+'</p><button class="s5pick" data-pick="'+i+'">'+(S.picked===i?'已选它':'选它')+'</button>':'<p class="s5empty">把想法<br>放进这里</p>'); slots.appendChild(d); }
    slots.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>{S.picked=+b.dataset.pick;api.save();render();api.sfx('success');api.toast('选好了：带着它去比较','✓');});
    foot.textContent=S.ideas.length>=5?(S.picked>=0?'五个想法都写好了，也已经选了一个——下一步，去比较它值不值得做。':'五个想法都写好了——选一个最想继续的。'):'用五个 SIT 工具各长出一个想法。不用都“靠谱”，但要不一样。';
  }
  sec.querySelectorAll('.method-card').forEach(c=>{
    c.addEventListener('click',()=>setMethod(c.dataset.method));
    c.addEventListener('dragstart',e=>{try{e.dataTransfer.setData('text/plain',c.dataset.method);}catch(err){} c.classList.add('dragging');});
    c.addEventListener('dragend',()=>c.classList.remove('dragging'));
  });
  if(drop){ drop.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('over');}); drop.addEventListener('dragleave',()=>drop.classList.remove('over')); drop.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('over');setMethod(e.dataTransfer.getData('text/plain')||S.method);}); drop.addEventListener('click',()=>{if(S.method)setMethod(S.method);}); }
  sec.querySelector('[data-add-idea]').onclick=()=>{
    const v=inp.value.trim(); if(!v){api.toast('先写下一个办法','💡');inp.focus();return;} if(S.ideas.length>=5){api.toast('五个槽已经满了','✓');return;} if(S.ideas.some(x=>x.text===v)){api.toast('这个想法已经有了，换一个角度','🔄');return;}
    S.ideas.push({text:v,method:NAMES[S.method]||'自由'}); inp.value=''; api.save(); render(); api.sfx('pop'); if(S.ideas.length===5){setTimeout(()=>{api.sfx('chime');api.toast('五个想法！现在选一个最想继续的','🌟');},300);}
  };
  inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();sec.querySelector('[data-add-idea]').click();}});
  render();
  if(S.method)setMethod(S.method);
  api.aiPanel(sec,{prompts:['拿掉哪个部件，想法会变？','哪两件事可以合并到一个部件？','复制什么，再改变什么？','拆成几部分，怎样重排？','如果……就……，条件是什么？']});
}},

{a:'03',name:'小组接力',time:'',
html:`
<div class="ch-head"><div class="act"><b>03</b><span>小组接力</span></div><h2>在别人的想法上，<em>再加一个变化</em></h2><p>一个人想一个办法，另一个人在这个办法上继续改。比一比：哪一队能接出不一样的方向？</p></div>
<div class="relay-layout">
  <div class="relay-chain" data-chain><div class="prob-empty" style="font-size:11px">还没有接力。请在右边写下第一棒，选择加到 A 队或 B 队。</div></div>
  <aside class="relay-side">
    <div data-pk></div>
    <input class="relay-input" data-relay-input maxlength="60" placeholder="写下这一棒的想法…">
    <div class="relay-btns"><button data-relay="0">加到 A 队</button><button data-relay="1">加到 B 队</button></div>
    <div class="relay-rule">规则：不能只说“一样”，要在上一棒的基础上加一个变化；每接一棒 +10 分。</div>
    <div class="ai-row" style="margin-top:2px"><button class="btn sm" data-ai>🤖 AI 追问</button><div class="ai-out" data-ai-out></div></div>
  </aside>
</div>
<div class="ch-foot-note">集体思考不是“谁说得多”，而是“谁能接住别人的想法，再往前推一步”。</div>`,
init(sec,api){
  const S=api.S; S.chain=S.chain||[]; S.relay=S.relay||0;
  const chain=sec.querySelector('[data-chain]'),inp=sec.querySelector('[data-relay-input]');
  const pk=api.pkBoard(sec,{teams:['A队','B队'],step:10});
  const seeds=['减法：把书包的一个隔层拿掉，看看还能怎么装','一专多能：让肩带同时当提手','乘法：复制一个侧袋，改变它的位置','除法：把书包拆成三个可拆模块'];
  function render(){
    const seed={text:seeds[0],team:0,seed:true};
    const items=[seed].concat(S.chain);
    chain.innerHTML=items.map((c,i)=>'<div class="relay-card" style="--rc:'+(c.team===0?'#FF7A6B':'#4FE0D0')+'"><b>'+(c.seed?'起点':(c.team===0?'A队':'B队')+' · 第 '+(i)+' 棒')+'</b>'+api.esc(c.text)+'</div>').join('')+(S.chain.length<3?'<div class="relay-empty">下一棒 · 等待 A 队或 B 队接上…</div>':'');
  }
  function add(team){
    const v=inp.value.trim(); if(!v){api.toast('先写下这一棒的想法','💭');inp.focus();return;}
    S.chain.push({text:v,team}); inp.value=''; api.save(); render(); if(pk)pk.add(team,10); api.sfx('success'); api.toast((team===0?'A队':'B队')+' 接住了一棒 +10','⚡');
  }
  sec.querySelectorAll('[data-relay]').forEach(b=>b.onclick=()=>add(+b.dataset.relay));
  inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();add(0);}});
  render();
  api.aiPanel(sec,{prompts:['上一棒用了哪个 SIT 工具？','这一棒能不能换一个工具？','如果拿掉一个部件，会怎样？','如果让一个部件多做一件事，会怎样？']});
}},

{a:'04',name:'方案比较',time:'',
html:`
<div class="ch-head"><div class="act"><b>04</b><span>方案比较</span></div><h2>不是“最喜欢”，<em>而是“最适合”</em></h2><p>选三个想法，用五个维度比较。没有绝对最好的方案，只有更适合这个问题的方案。</p></div>
<div class="compare-grid" data-compare>
  <div class="compare-card" data-idea="0"><h4 data-title>想法 1</h4><div data-crits></div><div class="compare-total"><span>总分</span><b data-total>0</b></div><button class="pick-compare" data-pick>选它</button></div>
  <div class="compare-card" data-idea="1"><h4 data-title>想法 2</h4><div data-crits></div><div class="compare-total"><span>总分</span><b data-total>0</b></div><button class="pick-compare" data-pick>选它</button></div>
  <div class="compare-card" data-idea="2"><h4 data-title>想法 3</h4><div data-crits></div><div class="compare-total"><span>总分</span><b data-total>0</b></div><button class="pick-compare" data-pick>选它</button></div>
</div>
<div class="matrix-foot"><span>五个维度：解决问题 · 能做出来 · 材料容易 · 安全 · 可测试</span><button class="btn primary" data-next disabled>带着它去展示 →</button></div>
<div class="ai-row"><button class="btn sm" data-ai>🤖 AI 追问我</button><div class="ai-out" data-ai-out></div></div>
<div class="ch-foot-note">设计的好坏，取决于它是否适合具体的使用者和使用条件。</div>`,
init(sec,api){
  const S=api.S; S.compare=S.compare||{}; S.finalIdea=S.finalIdea||'';
  const CRITS=[['solve','解决问题'],['build','能做出来'],['material','材料容易'],['safe','安全'],['test','可测试']];
  const ideas=(S.ideas||[]).slice(0,3);
  const defaults=['给书包做很多小格子','用颜色标记分类','做一个会提醒的清单'];
  const cards=sec.querySelectorAll('.compare-card');
  cards.forEach((card,i)=>{
    const title=card.querySelector('[data-title]'),box=card.querySelector('[data-crits]');
    title.textContent=ideas[i]?ideas[i].text:defaults[i];
    box.innerHTML=CRITS.map(([k,n])=>'<div class="crit-row"><span>'+n+'</span><div class="crit-stars" data-k="'+k+'">'+[1,2,3].map(v=>'<button type="button" data-v="'+v+'">★</button>').join('')+'</div></div>').join('');
    box.querySelectorAll('.crit-stars').forEach(st=>{ st.querySelectorAll('button').forEach(b=>b.onclick=e=>{e.stopPropagation(); const k=st.dataset.k; S.compare[i]=S.compare[i]||{}; S.compare[i][k]=+b.dataset.v; api.save(); paint(i); api.sfx('tap');}); });
    card.querySelector('[data-pick]').onclick=e=>{e.stopPropagation(); select(i);};
    card.onclick=()=>select(i);
    paint(i);
  });
  function paint(i){ const card=cards[i],m=S.compare[i]||{};let t=0; card.querySelectorAll('.crit-stars').forEach(st=>{const v=m[st.dataset.k]||0;t+=v;st.querySelectorAll('button').forEach(b=>b.classList.toggle('on',+b.dataset.v<=v));}); card.querySelector('[data-total]').textContent=t; }
  function select(i){ S.finalIdea=(ideas[i]?ideas[i].text:defaults[i]); S.finalIndex=i; api.save(); cards.forEach((c,k)=>c.classList.toggle('selected',k===i)); const btn=sec.querySelector('[data-next]'); if(btn)btn.disabled=false; api.sfx('success'); }
  sec.querySelector('[data-next]').onclick=()=>{ if(!S.finalIdea){api.toast('先选一个方案','✓');return;} api.go(5); };
  api.aiPanel(sec,{prompts:['这个方案真的解决了原来的问题吗？','如果材料不够，哪个部分可以简化？','它有没有可能夹手、割手或弄脏？','你怎么测试它有没有效？']});
}},

{a:'05',name:'创意展示',time:'',
html:`
<div class="ch-head"><div class="act"><b>05</b><span>创意展示</span></div><h2>把“为什么选它”，<em>讲清楚</em></h2><p>不是展示谁的想法最酷，而是说清楚：原来的问题是什么，你比较了什么，为什么选这个。</p></div>
<div class="stage-wrap ch3-pitch">
  <div class="curtain l"></div><div class="curtain r"></div><div class="spot"></div><div class="stage-floor"></div>
  <div class="stage-content">
    <div class="stage-top"><span>创意展示 · 我的方案</span><span class="who" data-name>小小创意家</span></div>
    <div class="speech">
      <p class="lead">大家好，我是 <b data-name2>小小创意家</b>。</p>
      <p>我原来遇到的问题是：<b data-p>……</b></p>
      <p>我想到了这些办法：<b data-ideas>……</b></p>
      <p>我决定先尝试：<b data-final>……</b></p>
      <p>因为：<b data-reason>……</b></p>
    </div>
    <div class="stage-controls">
      <div class="timer" data-timer><div class="mini-timer"><b data-timer-num>60</b><span>秒</span></div><div class="timer-btns"><button class="main" data-timer-start>开始 60 秒</button><button data-timer-reset>重置</button></div></div>
      <div class="applause"><button class="applause-btn" data-clap>👏</button><div class="applause-meter"><div class="am-top"><span>掌声能量</span><b><span data-clap-count>0</span></b></div><div class="ambar"><i data-clap-bar></i></div></div></div>
      <button class="btn ghost sm" data-go="6">领取徽章 →</button>
    </div>
  </div>
</div>
<div class="improve-box" style="margin-top:10px"><label>因为……（写一句你的选择理由）</label><input data-reason-input maxlength="90" placeholder="因为它最容易做出来，而且能解决原来的问题。"></div>
<div class="ch-foot-note">先理解，再建议；可以讨论方案，不嘲笑提出方案的人。</div>`,
init(sec,api){
  const S=api.S; const name=S.name||'小小创意家';
  const set=(s,v)=>{const el=sec.querySelector(s);if(el)el.textContent=v||'……';};
  set('[data-name]',name);set('[data-name2]',name);set('[data-p]',S.problem);set('[data-ideas]',(S.ideas||[]).map(x=>x.text).slice(0,3).join('；'));set('[data-tool]',(S.ideas[S.picked]&&S.ideas[S.picked].method)||S.methodName||'SIT 工具');set('[data-final]',S.finalIdea);
  const reason=sec.querySelector('[data-reason-input]'); if(reason){reason.value=S.reason||''; reason.addEventListener('input',()=>{S.reason=reason.value;api.save();set('[data-reason]',S.reason);}); set('[data-reason]',S.reason);}
  api.timer(sec,{seconds:60,onEnd:()=>api.toast('时间到，谢谢大家的聆听','⏰')});
  let energy=0,count=0;
  sec.querySelector('[data-clap]').onclick=()=>{energy=Math.min(100,energy+7);count++;sec.querySelector('[data-clap-count]').textContent=count;sec.querySelector('[data-clap-bar]').style.width=energy+'%';api.sfx('pop');api.burst(innerWidth*.5,innerHeight*.55,10,['#A78BFA','#F5C451','#FFE3A6']);};
  sec.querySelector('[data-go="6"]').onclick=()=>api.go(6);
}},

{a:'06',name:'创意发散家徽章',time:'',
html:`
<div class="finale">
  <div class="badge-stage"><div class="badge-rays"></div><div class="badge"><div class="badge-inner"><span class="b-kicker">FXM · GENESIS</span><div class="b-star">★</div><b>创意发散家</b><span class="bn" data-badge-name>小小创意家</span></div></div></div>
  <h2>你让一个想法，<em>长出了很多条路</em></h2>
  <p class="sub">你完成了一次真正的发散：先让想法变多，再用方法换角度，最后比较、选择，并说清楚为什么。</p>
  <div class="journey"><div class="jstep"><span class="ji">🌱</span><b>生长</b><span>先让想法变多</span></div><div class="jstep"><span class="ji">🛠️</span><b>SIT 五工具</b><span>减法/合并/乘法/除法/依赖</span></div><div class="jstep"><span class="ji">⚖️</span><b>比较</b><span>选出更适合的</span></div><div class="jstep"><span class="ji">🎤</span><b>表达</b><span>说清楚为什么</span></div></div>
  <div class="reflect"><div><b>想一想 01</b><p>哪一个方法，帮你想到了以前不会想到的办法？</p></div><div><b>想一想 02</b><p>你放弃的方案，真的比选中的差吗？</p></div><div><b>想一想 03</b><p>如果继续想，你还能加什么变化？</p></div></div>
  <div class="homework"><span class="hi">🏠</span><div><b>家庭任务 · 一张纸的 10 种用法</b><p>和家人一起，用一张纸想出 10 种不同的用法；选出最想试的一种，下周带来。</p></div></div>
  <div class="final-actions"><button class="btn primary" data-cert>下载创意提案</button><button class="btn" data-go="5">回到展示</button><a class="btn ghost" href="course-index.html">回到课程目录</a></div>
  <div class="final-quote">“先多想，再选择；先尝试，再改进。”</div>
</div>`,
init(sec,api){
  const S=api.S; const name=S.name||'小小创意家'; sec.querySelector('[data-badge-name]').textContent=name;
  sec.querySelector('[data-cert]').onclick=()=>{
    api.previewSheet({title:'我的创意提案',subtitle:'第 03 章 · 一个问题，一百种想法',code:'FXM-CUR-Q1-003',badge:'创意发散家',name,date:new Date().toLocaleDateString('zh-CN'),filename:'我的创意提案_'+name,stamp:'创意发散家',lab:{chapter:'03',chapterTitle:'一个问题，一百种想法',name,product:S.finalIdea||'我的创意提案',problem:S.problem,how:S.reason||'',improve:(S.ideas||[]).map(x=>x.text).join('；')},fields:[{label:'我发现的问题',value:S.problem},{label:'我想到的办法',value:(S.ideas||[]).map(x=>x.text).join('；')},{label:'我决定先尝试',value:S.finalIdea},{label:'因为',value:S.reason}],drawing:S.drawing,drawLabel:'我的方案草图',footer:'SIT 五工具 → 比较 → 表达'});
    api.sfx('success');api.confetti(80);
  };
  setTimeout(()=>{api.confetti(70);api.sfx('chime');},400);
}}
],

notes:[
{html:`<div class="note-block"><h4>本章目标</h4><p>用 SIT 五工具训练创意发散：减法、一专多能、乘法、除法、属性关联。先让想法数量出来，再比较和选择。核心不是“想出最酷的”，而是“能用不同工具想出多个方向，并说出为什么选这个”。</p><h4>教师角色</h4><p>这一章最忌讳过早评价。孩子说“这个不可能”“这个太幼稚”时，先接住：“先把它记下来，我们等会儿再一起看。”</p><h4>课堂节奏</h4><p>本章 6 幕，可拆成多次课。建议第 1–2 幕一次，第 3–4 幕一次，第 5–6 幕一次。</p><div class="warn">不要在发散阶段说“做不出来”。先让想法出现，筛选留到比较阶段。</div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>用一张纸做热身，体验“普通物品也有很多可能”，并练习改变条件。</p><h4>关键提问</h4><ul><li>“除了写字，这张纸还能做什么？”</li><li>“如果不能撕呢？”</li><li>“如果它要承受一本书呢？”</li></ul><h4>操作提示</h4><p>点纸周围的想法卡；孩子说出新的用法时，用输入框记下来。换条件按钮只是提供新角度，不需要判断对错。</p></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>学习 SIT 五工具，并围绕一个问题写出至少 5 个不同方向的办法。</p><h4>关键提问</h4><ul><li>“拿掉一个部件，会怎样？”</li><li>“一个部件能不能做两件事？”</li><li>“复制什么，再改变什么？”</li><li>“拆成几部分，怎样重排？”</li><li>“如果……就……，条件是什么？”</li></ul><h4>操作提示</h4><p>把方法卡拖到工作台，或直接点击。每个方法会给出不同的追问。五个想法槽不必填满同一种方法。</p><h4>常见困难</h4><p>五个想法雷同时，让孩子换一个方法再写；不要追求“靠谱”，先追求“不一样”。</p></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>体验集体接力：在别人的想法上继续加变化，而不是各说各的。</p><h4>关键提问</h4><ul><li>“上一棒的想法，还能加什么？”</li><li>“如果换一个使用者，会怎么用？”</li><li>“这一棒和上一棒，最大的不同是什么？”</li></ul><h4>操作提示</h4><p>老师可以把孩子说的想法输入，选择加到 A 队或 B 队；每接一棒 +10 分。重点是“接住”，不是“得分”。</p><h4>常见困难</h4><p>孩子重复上一个想法时，追问：“如果只能改一个地方，你改哪里？”</p></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>学习用五个维度比较方案，并做出有理由的选择。</p><h4>关键提问</h4><ul><li>“它能解决原来的问题吗？”</li><li>“它能做出来吗？材料够吗？”</li><li>“它安全吗？怎么测试？”</li></ul><h4>操作提示</h4><p>三个方案各打 1–3 星，点“选它”。不需要选总分最高的；要能说出“为什么选它”。</p><div class="warn">强调：不存在适用于所有场景的绝对最佳方案。</div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>用 60 秒讲清楚“问题—多个办法—选择—理由”，并体验被倾听。</p><h4>操作提示</h4><p>点“开始 60 秒”，同学鼓掌。可以让孩子看着屏幕说，不要求背稿。理由可以现场写，也可以先说后写。</p><h4>常见困难</h4><p>孩子只说“因为我觉得好看”时，追问：“除了好看，它有没有解决原来的问题？”</p></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>回顾发散过程，颁发“创意发散家”徽章，把“多想一步”延伸到家庭。</p><h4>三个反思问题</h4><ul><li>哪一个方法帮你想到了以前不会想到的办法？</li><li>你放弃的方案，真的比选中的差吗？</li><li>如果继续想，还能加什么变化？</li></ul><h4>家庭任务</h4><p>一张纸想出 10 种用法，选出最想试的一种。下周带来，和同学交换。</p></div>`}
]
};

/* =========================================================
   第 04 章《我的第一件创意作品》
   ========================================================= */
window.FXM_CHAPTERS['4']={
no:'04',
title:'我的第一件创意作品',
short:'第一件作品',
badge:'小小工程师',
acc:'#4FE0D0',acc2:'#B9FFF6',rgb:'79,224,208',
cover:`
<div class="cover-stars"></div>
<div class="cover-grid">
  <div class="cover-copy">
    <div class="kicker">CHAPTER 04 · 创新启蒙</div>
    <h1>我的第一件<br><span class="line2">创意作品</span></h1>
    <p class="cover-lead">从这一章开始，想法要变成真正的东西。<br>不用做得很复杂，先做出一件<b style="color:var(--gold2);font-weight:600">能测试、能改进</b>的作品。</p>
    <div class="cover-meta"><span class="gold">第 04 章</span><span>设计力 · 实践力 · 改进力</span><span>7–13 岁</span><span>7 幕互动</span></div>
    <div class="cover-actions"><button class="btn primary" data-go="1"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>开始制作</button><button class="btn ghost" data-notes><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h5"/></svg>教师指引</button></div>
  </div>
  <div class="portal" aria-hidden="true">
    <svg class="rings" viewBox="0 0 520 520" fill="none">
      <circle cx="260" cy="260" r="250" stroke="rgba(79,224,208,.14)" stroke-dasharray="2 9"/>
      <g class="ring-a"><circle cx="260" cy="260" r="210" stroke="rgba(79,224,208,.3)" stroke-dasharray="1 11"/><circle cx="260" cy="260" r="210" stroke="rgba(245,196,81,.22)" stroke-dasharray="90 1200"/></g>
      <g class="ring-b"><circle cx="260" cy="260" r="164" stroke="rgba(79,224,208,.22)" stroke-dasharray="1 13"/><circle cx="260" cy="260" r="164" stroke="rgba(167,139,250,.2)" stroke-dasharray="52 980"/></g>
    </svg>
    <div class="portal-core" style="background:radial-gradient(circle at 34% 28%,#D8FFF9,rgba(79,224,208,.55) 42%,rgba(79,224,208,.06) 72%)"><svg viewBox="0 0 100 100" width="52%" aria-hidden="true"><path d="M30 64l30-30 12 12-30 30H30z" fill="none" stroke="#0a2a26" stroke-width="5" stroke-linejoin="round"/><path d="M56 34l10-10 12 12-10 10M30 64l-6 20 20-6" fill="none" stroke="#0a2a26" stroke-width="5" stroke-linejoin="round"/></svg></div>
    <div class="portal-word pw1">设计</div><div class="portal-word pw2">选材</div><div class="portal-word pw3">制作</div><div class="portal-word pw4">改进</div>
  </div>
</div>
<div class="cover-foot"><span>发小明 Genesis 创新学院 · 让每个孩子都拥有创造的能力</span><span class="kbd"><span><kbd>→</kbd>前进</span><span><kbd>T</kbd>教师指引</span><span><kbd>F</kbd>全屏</span></span></div>`,

acts:[
{a:'01',name:'选一个项目',time:'',
html:`
<div class="ch-head"><div class="act"><b>01</b><span>选项目</span></div><h2>先做一件<em>今天就能做完</em>的作品</h2><p>不用做最复杂的。选一个你真正想解决、今天又能做出初步模型的问题。</p></div>
<div class="project-grid" data-projects>
  <div class="project-card" data-project="pen"><div class="project-icon">✏️</div><b>防止文具滚落的笔托</b><p>笔总是滚到地上？做一个能让笔停下来的小托架。</p><div class="project-meta"><span>纸板 · 夹子</span><span>★ 容易</span></div><button class="pick-project">选它</button></div>
  <div class="project-card" data-project="box"><div class="project-icon">🗃️</div><b>便于分类的收纳盒</b><p>橡皮、尺子、彩笔混在一起？做一个有分隔的小盒子。</p><div class="project-meta"><span>纸板 · 胶带</span><span>★★ 中等</span></div><button class="pick-project">选它</button></div>
  <div class="project-card" data-project="stand"><div class="project-icon">📖</div><b>稳定支撑书本的阅读架</b><p>书总是立不住？做一个能让书稳稳站着的小支架。</p><div class="project-meta"><span>纸板 · 吸管</span><span>★★ 中等</span></div><button class="pick-project">选它</button></div>
  <div class="project-card" data-project="sort"><div class="project-icon">🧩</div><b>帮助分类学习用品的装置</b><p>东西总是找不到？做一个一眼就能分类的装置。</p><div class="project-meta"><span>纸盒 · 彩笔</span><span>★★★ 挑战</span></div><button class="pick-project">选它</button></div>
</div>
<div class="case-file" style="margin-top:12px;padding:14px 18px"><div class="case-kicker">我的选择</div><div style="font-size:12px;line-height:1.8;color:var(--dim)" data-project-note>先选一个项目。今天不是完成所有未来的发明，而是把其中一个可实现的功能做出来。</div><div class="case-next"><button class="btn primary" data-go="2" disabled data-next>画设计图 →</button><span>先选项目，再画图</span></div></div>
<div class="ch-foot-note">项目没有高低之分。能做完、能测试、能改进，就是好项目。</div>`,
init(sec,api){
  const S=api.S; S.project=S.project||''; S.projectName=S.projectName||'';
  const NAMES={pen:'防止文具滚落的笔托',box:'便于分类的收纳盒',stand:'稳定支撑书本的阅读架',sort:'帮助分类学习用品的装置'};
  const note=sec.querySelector('[data-project-note]'),next=sec.querySelector('[data-next]');
  function render(){ sec.querySelectorAll('.project-card').forEach(c=>c.classList.toggle('selected',c.dataset.project===S.project)); if(S.project){note.innerHTML='你选择了：<b style="color:var(--teal)">'+NAMES[S.project]+'</b>。下一步，画出它的形状、部件和使用方式。';next.disabled=false;} }
  sec.querySelectorAll('.project-card').forEach(c=>{ c.onclick=()=>{S.project=c.dataset.project;S.projectName=NAMES[S.project];api.save();render();api.sfx('tap');}; const b=c.querySelector('.pick-project'); if(b)b.onclick=e=>{e.stopPropagation();c.click();}; });
  render();
  api.aiPanel(sec,{prompts:['这个项目，最难做的是哪一部分？','你能用教室里现有的材料做出来吗？','它真的能解决原来的问题吗？','如果只能保留一个功能，你保留哪个？']});
}},

{a:'02',name:'画设计图',time:'',
html:`
<div class="ch-head"><div class="act"><b>02</b><span>画设计图</span></div><h2>先画出来，<em>再动手</em></h2><p>设计图不用专业，但必须能帮你想清楚：它长什么样、由哪些部分组成、用什么材料、怎么用。</p></div>
<div class="st-merge" data-merge>
  <div class="st-merge-top"><span class="sit-tag">SIT · 一专多能</span><b>让一个部件做两件事</b></div>
  <div class="st-merge-row"><em>部件</em><button data-mpart="base">底座</button><button data-mpart="clip">夹子</button><button data-mpart="divider">分隔</button><button data-mpart="lid">盖子</button><button data-mpart="stand">支架</button></div>
  <div class="st-merge-row"><em>任务</em><button data-mtask="support">支撑</button><button data-mtask="fix">固定</button><button data-mtask="sort">分类</button><button data-mtask="protect">保护</button><button data-mtask="carry">提手</button><button data-mtask="hang">挂</button></div>
  <div class="st-merge-out" data-merge-out>选一个部件，再选两个任务。</div>
</div>
<div class="report-layout ch4-design">
  <form class="report-form form-two" onsubmit="return false">
    <div class="field"><label>00 我的名字 <b>NAME</b></label><input data-name maxlength="12" placeholder="写下你的名字或昵称"></div>
    <div class="field"><label>01 我的作品叫什么 <b>NAME IT</b></label><input data-f="name" maxlength="24" placeholder="给它起一个名字"></div>
    <div class="field"><label>02 它长什么样 <b>SHAPE</b></label><textarea data-f="shape" maxlength="70" placeholder="大致形状、大小"></textarea></div>
    <div class="field"><label>03 它由哪些部分组成 <b>PARTS</b></label><textarea data-f="parts" maxlength="70" placeholder="底座、夹子、分隔…"></textarea></div>
    <div class="field"><label>04 用什么材料 <b>MATERIAL</b></label><textarea data-f="material" maxlength="70" placeholder="纸板、吸管、橡皮筋…"></textarea></div>
    <div class="field"><label>05 怎么使用 <b>USE</b></label><textarea data-f="use" maxlength="70" placeholder="放在哪里、怎么放、怎么取"></textarea></div>
  </form>
  <div class="draw-panel">
    <div class="draw-head"><span>画出你的设计 · DESIGN</span><div class="draw-tools" data-draw-tools>
      <button type="button" data-color="#4FE0D0" class="on" style="background:#4FE0D0"></button><button type="button" data-color="#FFFFFF" style="background:#FFF"></button><button type="button" data-color="#F5C451" style="background:#F5C451"></button><button type="button" data-color="#FF7A6B" style="background:#FF7A6B"></button><button type="button" data-color="#A78BFA" style="background:#A78BFA"></button>
      <button type="button" data-size="3">·</button><button type="button" data-size="7" class="on">●</button><button type="button" data-size="15">⬤</button><button type="button" data-eraser>◻</button><button type="button" data-undo>↺</button><button type="button" data-clear>✕</button>
    </div></div>
    <div class="canvas-wrap"><canvas data-draw width="1000" height="620"></canvas><div class="canvas-hint">画出大致形状和主要部件<br>标注材料和使用方式</div></div>
    <div class="draw-foot"><span>支持鼠标 / 手指 / 触控笔</span><span data-draw-state>未开始</span></div>
  </div>
</div>
<div class="proposal-cta"><div class="prop-progress"><div class="pt"><span>设计图完成度</span><b data-pct>0%</b></div><div class="pbar"><i data-bar></i></div></div><button class="btn primary" data-gen>生成我的设计图 →</button><button class="btn ghost" data-go="3">去选材料 →</button></div>
`,
init(sec,api){
  const S=api.S; S.design=S.design||{}; S.merge=S.merge||{part:'',tasks:[]};
  const MNAME={base:'底座',clip:'夹子',divider:'分隔',lid:'盖子',stand:'支架'};const TNAME={support:'支撑',fix:'固定',sort:'分类',protect:'保护',carry:'提手',hang:'挂'};
  const mo=sec.querySelector('[data-merge-out]');
  function paintMerge(){sec.querySelectorAll('[data-mpart]').forEach(b=>b.classList.toggle('on',b.dataset.mpart===S.merge.part));sec.querySelectorAll('[data-mtask]').forEach(b=>b.classList.toggle('on',S.merge.tasks.includes(b.dataset.mtask)));if(S.merge.part&&S.merge.tasks.length===2){mo.innerHTML='<b>'+MNAME[S.merge.part]+'</b> = '+TNAME[S.merge.tasks[0]]+' + '+TNAME[S.merge.tasks[1]]+' → 一个部件，两项任务。';}else mo.textContent='选一个部件，再选两个任务。';}
  sec.querySelectorAll('[data-mpart]').forEach(b=>b.onclick=()=>{S.merge.part=b.dataset.mpart;api.save();paintMerge();api.sfx('tap');});
  sec.querySelectorAll('[data-mtask]').forEach(b=>b.onclick=()=>{const t=b.dataset.mtask;if(S.merge.tasks.includes(t))S.merge.tasks=S.merge.tasks.filter(x=>x!==t);else{if(S.merge.tasks.length>=2)S.merge.tasks.shift();S.merge.tasks.push(t);}api.save();paintMerge();api.sfx('tap');});
  paintMerge();
  const nameEl=sec.querySelector('[data-name]'); if(nameEl){nameEl.value=S.name||'';nameEl.addEventListener('input',()=>{S.name=nameEl.value;api.save();});}
  const draw=api.initDrawing(sec,url=>{S.drawing=url;api.save();paint();sec.querySelector('[data-draw-state]').textContent='已保存';});
  if(S.drawing&&draw)draw.load(S.drawing);
  sec.querySelectorAll('[data-f]').forEach(el=>{const k=el.dataset.f;el.value=S.design[k]||'';el.addEventListener('input',()=>{S.design[k]=el.value;api.save();paint();});});
  sec.querySelectorAll('[data-check]').forEach(c=>{c.checked=!!(S.design['chk_'+c.dataset.check]);c.addEventListener('change',()=>{S.design['chk_'+c.dataset.check]=c.checked;api.save();});});
  function paint(){let n=0;['name','shape','parts','material','use'].forEach(k=>{if((S.design[k]||'').trim())n++;});if(S.drawing)n++;const p=Math.round(n/6*100);const pe=sec.querySelector('[data-pct]'),b=sec.querySelector('[data-bar]');if(pe)pe.textContent=p+'%';if(b)b.style.width=p+'%';}
  paint();
  sec.querySelector('[data-gen]').onclick=()=>{
    const d=S.design;if(!d.name||!d.shape){api.toast('至少写下作品名称和大致形状','✏️');return;}
    api.previewSheet({title:'我的作品设计图',subtitle:'第 04 章 · 我的第一件创意作品',code:'FXM-CUR-Q1-004',badge:'小小工程师',name:S.name||'小小工程师',date:new Date().toLocaleDateString('zh-CN'),filename:'我的作品设计图_'+(S.name||'小小工程师'),stamp:'小小工程师',lab:{chapter:'04',chapterTitle:'我的第一件创意作品',name:S.name||'小小工程师',product:d.name||'我的作品',problem:S.problem||S.projectName,how:d.use||'',improve:S.improve||''},fields:[{label:'作品名称',value:d.name},{label:'它长什么样',value:d.shape},{label:'主要部件',value:d.parts},{label:'材料',value:d.material},{label:'怎么使用',value:d.use}],drawing:S.drawing,drawLabel:'我的设计图 · DESIGN',footer:'设计 → 选材 → 制作 → 测试 → 改进'});
  };
  sec.querySelector('[data-go="3"]').addEventListener('click',()=>api.go(3));
}},

{a:'03',name:'选材料',time:'',
html:`
<div class="ch-head"><div class="act"><b>03</b><span>选材料</span></div><h2>在有限材料里，<em>做出最好的选择</em></h2><p>你只有 10 个材料币。把需要的材料放进材料篮，够用就好，不必把所有东西都拿一遍。</p></div>
<div class="material-lab">
  <div class="material-grid" data-materials>
    <div class="material-card" draggable="true" data-mat="card" data-cost="2" data-name="纸板"><span class="mi">📦</span><div><b>纸板</b><span>主体结构</span></div><span class="mc">2</span></div>
    <div class="material-card" draggable="true" data-mat="straw" data-cost="1" data-name="吸管"><span class="mi">🥤</span><div><b>吸管</b><span>支撑 / 轴</span></div><span class="mc">1</span></div>
    <div class="material-card" draggable="true" data-mat="clip" data-cost="1" data-name="夹子"><span class="mi">🖇️</span><div><b>夹子</b><span>固定 / 夹住</span></div><span class="mc">1</span></div>
    <div class="material-card" draggable="true" data-mat="band" data-cost="1" data-name="橡皮筋"><span class="mi">➰</span><div><b>橡皮筋</b><span>弹力 / 捆扎</span></div><span class="mc">1</span></div>
    <div class="material-card" draggable="true" data-mat="tape" data-cost="2" data-name="胶带"><span class="mi">🩹</span><div><b>胶带</b><span>连接 / 加固</span></div><span class="mc">2</span></div>
    <div class="material-card" draggable="true" data-mat="stick" data-cost="2" data-name="小木棒"><span class="mi">🪵</span><div><b>小木棒</b><span>支架 / 轴</span></div><span class="mc">2</span></div>
  </div>
  <aside class="relay-side">
    <div class="us-head"><span>材料篮</span><b><span data-count>0</span> 件</b></div>
    <div class="basket" data-basket><div class="basket-list" data-basket-list><div class="prob-empty" style="font-size:10px">把材料拖进来，或点一下材料卡。</div></div></div>
    <div class="budget"><span>已用</span><b data-total>0</b><span>/ 10 材料币</span><div class="budget-bar"><i data-budget-bar></i></div></div>
    <div class="relay-rule" data-mat-tip>先选 2–4 件真正需要的材料。多余的零件会让作品更重、更难做。</div>
    <div class="ai-row"><button class="btn sm" data-ai>🤖 AI 追问</button><div class="ai-out" data-ai-out></div></div>
    <button class="to-proposal on" data-go="4">材料选好了，去排步骤 →</button>
  </aside>
</div>
<div class="ch-foot-note">材料不是越多越好。好的设计，常常是用更少的材料解决更多的问题。</div>`,
init(sec,api){
  const S=api.S; S.materials=S.materials||[];
  const list=sec.querySelector('[data-basket-list]'),cnt=sec.querySelector('[data-count]'),total=sec.querySelector('[data-total]'),bar=sec.querySelector('[data-budget-bar]'),tip=sec.querySelector('[data-mat-tip]');
  const COST={card:2,straw:1,clip:1,band:1,tape:2,stick:2},NAME={card:'纸板',straw:'吸管',clip:'夹子',band:'橡皮筋',tape:'胶带',stick:'小木棒'};
  function render(){
    const sum=S.materials.reduce((a,k)=>a+COST[k],0);cnt.textContent=S.materials.length;total.textContent=sum;bar.style.width=Math.min(100,sum/10*100)+'%';
    list.innerHTML=S.materials.length?S.materials.map(k=>'<span class="basket-chip">'+NAME[k]+' · '+COST[k]+'</span>').join(''):'<div class="prob-empty" style="font-size:10px">把材料拖进来，或点一下材料卡。</div>';
    sec.querySelectorAll('.material-card').forEach(c=>c.classList.toggle('in',S.materials.includes(c.dataset.mat)));
    tip.textContent=sum>10?'超出预算了！拿掉一件，或者换一种更便宜的材料。':(S.materials.length<2?'再选一件材料，才能做出结构。':'预算内，材料也够了。下一步：安排制作顺序。');
    tip.style.color=sum>10?'#FFB3A8':'';
    const go=sec.querySelector('[data-go="4"]'); if(go)go.classList.toggle('on',sum<=10&&S.materials.length>=2);
  }
  function toggle(k){ if(S.materials.includes(k))S.materials=S.materials.filter(x=>x!==k); else { if(S.materials.reduce((a,x)=>a+COST[x],0)+COST[k]>10){api.toast('超出 10 个材料币了，先拿掉一件','🪙');return;} S.materials.push(k); } api.save();render();api.sfx('tap'); }
  sec.querySelectorAll('.material-card').forEach(c=>{
    c.onclick=()=>toggle(c.dataset.mat);
    c.addEventListener('dragstart',e=>{try{e.dataTransfer.setData('text/plain',c.dataset.mat);}catch(err){}});
  });
  const basket=sec.querySelector('[data-basket]'); if(basket){basket.addEventListener('dragover',e=>e.preventDefault());basket.addEventListener('drop',e=>{e.preventDefault();const k=e.dataTransfer.getData('text/plain');if(k&&!S.materials.includes(k))toggle(k);});}
  render();
  api.aiPanel(sec,{prompts:['哪一件材料是“必须有”的？','哪一件可以换成更便宜的东西？','如果胶带不够，你还能怎么连接？','你的作品最可能从哪里坏掉？']});
}},

{a:'04',name:'制作步骤',time:'',
html:`
<div class="ch-head"><div class="act"><b>04</b><span>制作步骤</span></div><h2>先把顺序排对，<em>再动手</em></h2><p>下面四步被打乱了。把步骤拖到正确顺序，或者先点一步、再点另一步交换。排对后，按清单开始制作。</p></div>
<div class="report-layout">
  <div class="steps-list" data-steps>
    <div class="step-card" draggable="true" data-step="test"><span class="step-num">?</span><span>测试作品，记录它能不能解决问题</span><span class="step-grip">⋮⋮</span></div>
    <div class="step-card" draggable="true" data-step="cut"><span class="step-num">?</span><span>按设计图剪裁材料</span><span class="step-grip">⋮⋮</span></div>
    <div class="step-card" draggable="true" data-step="draw"><span class="step-num">?</span><span>在材料上画出尺寸和部件</span><span class="step-grip">⋮⋮</span></div>
    <div class="step-card" draggable="true" data-step="build"><span class="step-num">?</span><span>组装、固定，做出初步原型</span><span class="step-grip">⋮⋮</span></div>
  </div>
  <aside class="relay-side">
    <div class="us-head"><span>制作清单</span><b data-step-state>未开始</b></div>
    <div class="design-checks" style="flex-direction:column;align-items:flex-start">
      <label class="check-item"><input type="checkbox" data-chk="draw">画线：标出尺寸</label>
      <label class="check-item"><input type="checkbox" data-chk="cut">剪裁：注意工具安全</label>
      <label class="check-item"><input type="checkbox" data-chk="build">组装：先固定再加固</label>
      <label class="check-item"><input type="checkbox" data-chk="test">测试：记录结果</label>
    </div>
    <div class="relay-rule">排对顺序后，每完成一步就勾选。遇到问题，先记下来，不要急着拆掉重做。</div>
    <button class="to-proposal" data-go="5">去测试与改进 →</button>
  </aside>
</div>
<div class="ch-foot-note">先画线再剪，先组装再加固，先测试再改进。顺序对了，返工就少了。</div>`,
init(sec,api){
  const S=api.S; S.steps=S.steps||[]; S.checks=S.checks||{};
  const ORDER=['draw','cut','build','test'];
  const list=sec.querySelector('[data-steps]'),state=sec.querySelector('[data-step-state]');
  let selected=null;
  if(!S.steps.length)S.steps=['test','cut','draw','build'];
  function render(){
    list.innerHTML='';
    S.steps.forEach((k,i)=>{ const card=document.createElement('div'); card.className='step-card'+(ORDER[i]===k?' correct':''); card.draggable=true; card.dataset.step=k; card.innerHTML='<span class="step-num">'+(i+1)+'</span><span>'+({draw:'在材料上画出尺寸和部件',cut:'按设计图剪裁材料',build:'组装、固定，做出初步原型',test:'测试作品，记录它能不能解决问题'}[k])+'</span><span class="step-grip">⋮⋮</span>'; list.appendChild(card); });
    list.querySelectorAll('.step-card').forEach((c,i)=>{
      c.onclick=()=>{ if(selected==null){selected=i;c.style.borderColor='var(--teal)';return;} const j=selected; selected=null; const t=S.steps[i];S.steps[i]=S.steps[j];S.steps[j]=t;api.save();render();api.sfx('tap'); };
      c.addEventListener('dragstart',e=>{selected=i;try{e.dataTransfer.setData('text/plain',String(i));}catch(err){} c.classList.add('dragging');});
      c.addEventListener('dragend',()=>c.classList.remove('dragging'));
      c.addEventListener('dragover',e=>e.preventDefault());
      c.addEventListener('drop',e=>{e.preventDefault();const from=+(e.dataTransfer.getData('text/plain')||selected);if(from==null||from===i)return;const t=S.steps[i];S.steps[i]=S.steps[from];S.steps[from]=t;selected=null;api.save();render();api.sfx('pop');});
    });
    const ok=S.steps.every((k,i)=>ORDER[i]===k); state.textContent=ok?'顺序正确 ✓':'还差一点'; state.style.color=ok?'var(--teal)':'';
    const go=sec.querySelector('[data-go="5"]'); if(go)go.classList.toggle('on',ok);
    if(ok){api.sfx('chime');api.toast('顺序对了！可以开始制作了','🔧');}
  }
  // ensure correct order is not shown initially; if saved correct, fine
  render();
  sec.querySelectorAll('[data-chk]').forEach(c=>{c.checked=!!S.checks[c.dataset.chk];c.addEventListener('change',()=>{S.checks[c.dataset.chk]=c.checked;api.save();});});
  api.aiPanel(sec,{prompts:['哪一步最容易出错？','剪裁之前，你需要再确认什么？','如果装反了，怎么发现？','测试时，你准备记录哪些结果？']});
}},

{a:'05',name:'测试与改进',time:'',
html:`
<div class="ch-head"><div class="act"><b>05</b><span>测试与改进</span></div><h2>第一次测试，<em>不是判决</em></h2><p>测试是收集信息，不是证明“我成功了”或“我失败了”。记录结果，找一个最值得改的地方。</p></div>
<div class="test-grid">
  <div class="test-card"><h4>功能测试</h4><p>它能不能解决原来的问题？</p><div class="test-result" data-result="fn"><button data-v="success">成功</button><button data-v="partial">部分</button><button data-v="fail">失败</button></div></div>
  <div class="test-card"><h4>稳定测试</h4><p>它会不会倒、晃、散开？</p><div class="test-result" data-result="stable"><button data-v="success">稳定</button><button data-v="partial">有点晃</button><button data-v="fail">倒了</button></div></div>
  <div class="test-card"><h4>安全测试</h4><p>有没有尖角、夹手、容易割到的地方？</p><div class="test-result" data-result="safe"><button data-v="success">安全</button><button data-v="partial">要注意</button><button data-v="fail">有风险</button></div></div>
</div>
<div class="report-layout" style="margin-top:10px">
  <div class="improve-box"><label>我发现了什么问题</label><textarea data-found maxlength="90" placeholder="例如：放书的时候会往前倒。"></textarea></div>
  <div class="improve-box"><label>我最想改进的一个地方</label><textarea data-improve maxlength="90" placeholder="例如：把底座加宽，或者把支点往后移。"></textarea></div>
</div>
<div class="stage-rules" style="margin-top:10px"><div class="rule"><span class="ri">🔁</span><div><b>改进不是重做</b><p>先只改一个地方，再测一次，看看变化是不是来自这个改动。</p></div></div><div class="rule"><span class="ri">🧾</span><div><b>留下记录</b><p>第一次测试、改进后的测试，都要留下结果。失败也是数据。</p></div></div></div>
<div class="proposal-cta"><div class="prop-progress"><div class="pt"><span>测试记录</span><b data-test-pct>0%</b></div><div class="pbar"><i data-test-bar></i></div></div><button class="btn primary" data-go="6">去发布会 →</button></div>`,
init(sec,api){
  const S=api.S; S.test=S.test||{}; S.found=S.found||''; S.improve=S.improve||'';
  const found=sec.querySelector('[data-found]'),improve=sec.querySelector('[data-improve]');
  found.value=S.found;improve.value=S.improve;
  found.addEventListener('input',()=>{S.found=found.value;api.save();paint();});improve.addEventListener('input',()=>{S.improve=improve.value;api.save();paint();});
  sec.querySelectorAll('.test-result').forEach(box=>{ const k=box.dataset.result; box.querySelectorAll('button').forEach(b=>{ if(S.test[k]===b.dataset.v)b.classList.add('on'); b.onclick=()=>{S.test[k]=b.dataset.v;api.save();box.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));api.sfx('tap');paint();}; }); });
  function paint(){let n=0;['fn','stable','safe'].forEach(k=>{if(S.test[k])n++;});if(S.found.trim())n++;if(S.improve.trim())n++;const p=Math.round(n/5*100);sec.querySelector('[data-test-pct]').textContent=p+'%';sec.querySelector('[data-test-bar]').style.width=p+'%';}
  paint();
  api.aiPanel(sec,{prompts:['这次测试，哪一项最出乎你的意料？','如果只改一个地方，你改哪里？','改完之后，你准备怎么再测一次？','失败的那一次，告诉了你什么？']});
}},

{a:'06',name:'作品发布会',time:'',
html:`
<div class="ch-head"><div class="act"><b>06</b><span>作品发布会</span></div><h2>用一分钟，<em>讲清楚你的作品</em></h2><p>不用背稿。看着屏幕上的句子，把“我想解决什么、作品怎样解决、第一次测试发生了什么、我做了哪些改进”讲给大家听。</p></div>
<div class="stage-wrap ch4-pitch">
  <div class="curtain l"></div><div class="curtain r"></div><div class="spot"></div><div class="stage-floor"></div>
  <div class="stage-content">
    <div class="stage-top"><span>作品发布会 · 第 1 位</span><span class="who" data-name>小小工程师</span></div>
    <div class="speech">
      <p class="lead">大家好，我是 <b data-name2>小小工程师</b>。</p>
      <p>我想解决的问题是：<b data-p>……</b></p>
      <p>我的作品叫 <b data-work>……</b>，它通过 <b data-how>……</b> 来解决问题。</p>
      <p>第一次测试：<b data-test>……</b></p>
      <p>我做的改进是：<b data-improve>……</b></p>
    </div>
    <div class="stage-controls">
      <div class="timer" data-timer><div class="mini-timer"><b data-timer-num>60</b><span>秒</span></div><div class="timer-btns"><button class="main" data-timer-start>开始 60 秒</button><button data-timer-reset>重置</button></div></div>
      <div class="applause"><button class="applause-btn" data-clap>👏</button><div class="applause-meter"><div class="am-top"><span>掌声能量</span><b><span data-clap-count>0</span></b></div><div class="ambar"><i data-clap-bar></i></div></div></div>
      <button class="btn ghost sm" data-go="7">领取徽章 →</button>
    </div>
  </div>
</div>
<div class="stage-rules"><div class="rule"><span class="ri">👂</span><div><b>先理解，再建议</b><p>先说你听懂了什么，再提出你的问题。</p></div></div><div class="rule"><span class="ri">🤝</span><div><b>可以讨论，不嘲笑</b><p>可以问“它真的能解决问题吗”，但不能说“这太丑了”。</p></div></div></div>
<div class="ch-foot-note">讲清楚“我做了什么、为什么这样做、测试结果怎样”，比作品是否漂亮更重要。</div>`,
init(sec,api){
  const S=api.S; const name=S.name||'小小工程师';
  const set=(s,v)=>{const el=sec.querySelector(s);if(el)el.textContent=v||'……';};
  set('[data-name]',name);set('[data-name2]',name);set('[data-p]',S.problem||S.projectName);set('[data-work]',S.design&&S.design.name);set('[data-how]',S.design&&S.design.use);set('[data-test]',S.found);set('[data-improve]',S.improve);
  api.timer(sec,{seconds:60,onEnd:()=>api.toast('时间到，谢谢大家的聆听','⏰')});
  let energy=0,count=0;
  sec.querySelector('[data-clap]').onclick=()=>{energy=Math.min(100,energy+7);count++;sec.querySelector('[data-clap-count]').textContent=count;sec.querySelector('[data-clap-bar]').style.width=energy+'%';api.sfx('pop');api.burst(innerWidth*.5,innerHeight*.55,10,['#4FE0D0','#F5C451','#FFE3A6']);};
  sec.querySelector('[data-go="7"]').onclick=()=>api.go(7);
}},

{a:'07',name:'小小工程师徽章',time:'',
html:`
<div class="finale">
  <div class="badge-stage"><div class="badge-rays"></div><div class="badge"><div class="badge-inner"><span class="b-kicker">FXM · GENESIS</span><div class="b-star">★</div><b>小小工程师</b><span class="bn" data-badge-name>小小工程师</span></div></div></div>
  <h2>你做出了第一件<em>能测试的作品</em></h2>
  <p class="sub">你完成了一次真实的工程过程：选项目、画设计图、选材料、排步骤、做测试、找改进，再把作品讲给别人听。</p>
  <div class="journey"><div class="jstep"><span class="ji">📐</span><b>设计</b><span>画出自己的想法</span></div><div class="jstep"><span class="ji">📦</span><b>选材</b><span>在限制里做选择</span></div><div class="jstep"><span class="ji">🔧</span><b>制作</b><span>把图纸变成实物</span></div><div class="jstep"><span class="ji">🔁</span><b>改进</b><span>用测试结果改作品</span></div></div>
  <div class="reflect"><div><b>想一想 01</b><p>你的设计图，和最后的作品一样吗？哪里变了？</p></div><div><b>想一想 02</b><p>第一次测试失败的地方，告诉了你什么？</p></div><div><b>想一想 03</b><p>如果再做一版，你最想改进哪里？</p></div></div>
  <div class="homework"><span class="hi">🏠</span><div><b>家庭任务 · 给作品找第二个用户</b><p>把作品给家人用一次，记录他哪里用得不顺手，下一版试着改进。</p></div></div>
  <div class="final-actions"><button class="btn primary" data-cert>下载作品设计卡</button><button class="btn" data-go="6">回到发布会</button><a class="btn ghost" href="course-index.html">回到课程目录</a></div>
  <div class="final-quote">“第一次做得不完美，很正常。工程师不是不失败，而是每次都从失败里拿走一点东西。”</div>
</div>`,
init(sec,api){
  const S=api.S; const name=S.name||'小小工程师'; sec.querySelector('[data-badge-name]').textContent=name;
  sec.querySelector('[data-cert]').onclick=()=>{
    const d=S.design||{};
    api.previewSheet({title:'我的作品设计卡',subtitle:'第 04 章 · 我的第一件创意作品',code:'FXM-CUR-Q1-004',badge:'小小工程师',name,date:new Date().toLocaleDateString('zh-CN'),filename:'我的作品设计卡_'+name,stamp:'小小工程师',lab:{chapter:'04',chapterTitle:'我的第一件创意作品',name,product:(S.design&&S.design.name)||'我的作品',problem:S.problem||S.projectName,how:(S.design&&S.design.use)||'',improve:S.improve||''},fields:[{label:'作品名称',value:d.name},{label:'解决的问题',value:S.problem||S.projectName},{label:'它怎样工作',value:d.use},{label:'第一次测试',value:S.found},{label:'我的改进',value:S.improve}],drawing:S.drawing,drawLabel:'我的设计图',footer:'设计 → 选材 → 制作 → 测试 → 改进'});
    api.sfx('success');api.confetti(90);
  };
  setTimeout(()=>{api.confetti(80);api.sfx('chime');},400);
}}
],

notes:[
{html:`<div class="note-block"><h4>本章目标</h4><p>让孩子经历一次完整的“从设计图到实物”的过程：选项目、用 SIT 一专多能设计一个部件做两件事、画设计图、选材料、制作、测试、改进、发布。作品不需要复杂，关键是能测试、能改进。</p><h4>教师角色</h4><p>不要替孩子做关键步骤。可以提供材料、工具和安全帮助，但设计选择留给孩子。测试失败时，不要急着安慰“没关系”，先问：“你看到了什么？”</p><h4>课堂节奏</h4><p>本章 7 幕，建议拆成 2–3 次课：设计一次，制作与测试一次，发布一次。材料准备见教师教案。</p><div class="warn">工具安全：剪刀、美工刀、热熔胶等由教师统一管理；低龄孩子使用圆头剪刀。</div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>从四个项目中选一个今天能完成初步模型的项目。</p><h4>关键提问</h4><ul><li>“你最想解决哪一个问题？”</li><li>“今天能做完吗？需要哪些材料？”</li><li>“如果做不完，先做哪一部分？”</li></ul><h4>常见困难</h4><p>孩子选了一个过于复杂的项目时，不要直接否定，帮他把项目缩小：“今天我们只做它的一个功能，可以吗？”</p></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>画出能指导制作的设计图：形状、部件、材料、用法。</p><h4>关键提问</h4><ul><li>“它长什么样？大概多大？”</li><li>“哪个部件可以同时做两件事？”</li><li>“由哪几个部分组成？”</li><li>“用什么材料？为什么？”</li><li>“怎么用？放在哪里？”</li></ul><h4>操作提示</h4><p>画布可以只用一种颜色画轮廓，再用另一种颜色标部件。画得不好没关系，能看懂就行。</p></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>在 10 个材料币的限制下，选择真正需要的材料。</p><h4>关键提问</h4><ul><li>“哪一件是必须有的？”</li><li>“哪一件可以换成更便宜的？”</li><li>“如果胶带不够，还能怎么连接？”</li></ul><h4>操作提示</h4><p>材料卡可以拖动，也可以点击。超出预算会提示。不要追求“材料最多”，追求“够用”。</p></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>理解制作顺序：先画线、再剪裁、再组装、最后测试。</p><h4>关键提问</h4><ul><li>“哪一步最容易出错？”</li><li>“剪之前要确认什么？”</li><li>“如果装反了，怎么发现？”</li></ul><h4>操作提示</h4><p>拖动步骤排序，或点两步交换。排对后，按清单勾选。制作时提醒工具安全。</p></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>用测试收集信息，并选择一个最值得改的地方。</p><h4>关键提问</h4><ul><li>“这次测试，哪一项最出乎意料？”</li><li>“如果只改一个地方，你改哪里？”</li><li>“改完怎么再测一次？”</li></ul><h4>常见困难</h4><p>孩子说“全都不好，我想重做”时，提醒：“先只改一个地方，看看是不是这个原因。”</p><div class="warn">失败不是判决，是数据。不要用“成功/失败”评价孩子，评价他是否记录了、分析了、改进了。</div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>用 60 秒讲清楚作品、测试与改进，并体验被倾听。</p><h4>操作提示</h4><p>点“开始 60 秒”，同学鼓掌。可以让孩子拿着作品说，也可以看着屏幕说。</p><h4>两条规则</h4><ul><li>先理解，再建议。</li><li>可以讨论作品，不能嘲笑做作品的人。</li></ul></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>回顾工程过程，颁发“小小工程师”徽章，把测试延伸到家庭。</p><h4>三个反思问题</h4><ul><li>设计图和最后的作品一样吗？哪里变了？</li><li>第一次测试失败的地方，告诉了你什么？</li><li>如果再做一版，最想改进哪里？</li></ul><h4>家庭任务</h4><p>把作品给家人用一次，记录哪里不顺手，下一版试着改进。</p><h4>与平台衔接</h4><p>设计卡可下载，也可以存入“我的实验室”。建议下一步用“路演大师”讲作品故事，用“六院圆桌”继续发散。</p></div>`}
]
};
