/* A26 · 属性关联：关联矩阵 */
(function(){
'use strict';
const SETS={
 cup:{n:'保温杯',inner:['容量','杯盖结构','保温层','材质','外观','开口方式'],
      outer:['使用者身份','使用场景','天气','购买渠道','每天喝水次数','是否需要分享']},
 meet:{n:'周会',inner:['时长','参会人','议程','记录方式','地点','频率'],
      outer:['团队规模','远程比例','项目阶段','决策类型','老板是否参加','季度目标']}
};
const MIN_CELL=6, MIN_PICK=3;

const L={
id:'A26',week:7,seq:26,title:'属性关联：关联矩阵',
kicker:'WEEK 7 · 属性关联',tool:'ad',toolName:'属性关联',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>36 个格子，<em>怎么不靠灵感找</em></h1>
<p>属性关联最像"做题"：把内部属性和外部变量铺成一张表，一格一格问"这里能不能绑"。靠的不是灵光，是不漏。</p></div>
<div class="opts" style="margin-bottom:12px">
<button class="opt" data-h="a"><span class="k">A</span><span><b>先想 10 个好主意，再挑一个做</b><span>靠灵感</span></span></button>
<button class="opt" data-h="b"><span class="k">B</span><span><b>先把格子铺满，再收敛到 3 个</b><span>先发散后收敛</span></span></button>
<button class="opt" data-h="c"><span class="k">C</span><span><b>问用户想要什么，按需求做</b><span>需求驱动</span></span></button>
</div>
<div id="hookOut"></div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#hookOut');
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',S.answers.hook===b.dataset.h));
    if(S.answers.hook){
      const ok=S.answers.hook==='b';
      out.innerHTML='<div class="panel" style="border-color:'+(ok?'rgba(78,159,110,.4)':'rgba(216,154,60,.4)')+';background:'+(ok?'rgba(78,159,110,.07)':'rgba(216,154,60,.06)')+'">'+
        '<p class="small" style="font-size:12px">'+(ok?'对。<b>先求全，再求好</b>。矩阵的价值不是让你想出最好的点子，是让你不会漏掉那些"看起来不相关"的组合。':'答案是 B。矩阵不产出好点子，它产出<b>不漏</b>。36 格里大部分是废的，但剩下的 3 格往往是你凭灵感想不到的。')+'</p></div>';
    }
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{S.answers.hook=b.dataset.h;api.save();paint();api.refresh();});
  paint();
},
hint(S){return S.answers.hook?'':'先选一个';},
gate(S){return !!S.answers.hook;}},

/* ---------- 2 概念 ---------- */
{id:'concept',name:'概念',short:'概念',kicker:'STEP 2 · 概念',
html:`
<div class="step-h"><h1>发散 36 格，收敛 3 格</h1></div>
<div class="grid2" style="margin-bottom:12px">
  <div class="panel"><div class="panel-h"><h4>怎么填</h4><span>一格一句话</span></div>
    <div class="stack">
      <div><b style="font-size:11px;color:var(--ink)">① 横轴放外部</b><p class="small" style="margin-top:2px">用户、场景、环境、时间——越具体越好。</p></div>
      <div><b style="font-size:11px;color:var(--ink)">② 纵轴放内部</b><p class="small" style="margin-top:2px">产品自己能变的属性，不是功能名。</p></div>
      <div><b style="font-size:11px;color:var(--ink)">③ 每格问一句</b><p class="small" style="margin-top:2px">"当这个外部变量变化时，这个属性能不能跟着变？"</p></div>
    </div></div>
  <div class="panel"><div class="panel-h"><h4>怎么收敛</h4><span>三步</span></div>
    <p class="small" style="line-height:1.9">先填 6 格（不求好，求有字）→ 打分（能测吗 / 有人要吗）→ 取前 3。<br>
    <b>不要在一开始就筛</b>，那会回到"先想 10 个好主意"。</p>
    <div class="tag acc" style="margin-top:10px">矩阵不是决策工具，是搜索工具。</div>
  </div>
</div>`,
init(){},hint(){return '';},gate(){return true;}},

/* ---------- 3 矩阵搜 ---------- */
{id:'matrix',name:'矩阵',short:'矩阵',kicker:'STEP 3 · 矩阵搜索',
html:`
<div class="step-h"><h1>先铺 <em>6 格</em>，再挑 <em>3 格</em></h1>
<p>点格子 → 写一句"当…时，…跟着变"（≥6 字）。填满 6 格后，从里面挑 3 个最想试的。</p></div>
<div class="bench">
  <div class="bench-h"><b id="mTitle">DEPENDENCY · 保温杯</b><span class="st" id="mSt">0 / 6 格</span></div>
  <div class="bench-b" style="overflow:auto">
    <div class="a26-pick" id="picks">${Object.keys(SETS).map(k=>`<button class="chip" data-s="${k}">${SETS[k].n}</button>`).join("")}</div>
    <div class="a26-mx" id="mx"></div>
    <div class="a26-list" id="list"></div>
  </div>
  <div class="bench-f"><span class="small">填 6 格解锁"挑 3 格"；填得糙没关系，先有字。</span><div style="flex:1"></div><button class="btn sm ghost" id="mReset">重来</button></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;a.cells=a.cells||{};a.pick=a.pick||[];a.set=a.set||'cup';
  const mx=sec.querySelector('#mx'),listEl=sec.querySelector('#list'),st=sec.querySelector('#mSt'),title=sec.querySelector('#mTitle');
  let sel=null;
  const set=()=>SETS[a.set];
  const filled=()=>Object.keys(a.cells).filter(k=>(a.cells[k]||'').length>=6);
  function paint(){
    sec.querySelectorAll('[data-s]').forEach(b=>b.classList.toggle('on',a.set===b.dataset.s));
    title.textContent='DEPENDENCY · '+set().n;
    mx.innerHTML='<div class="a26-corner"></div>'+set().outer.map(o=>`<div class="a26-hx">${o}</div>`).join('')+
      set().inner.map(i=>`<div class="a26-hy">${i}</div>`+set().outer.map(o=>{
        const key=i+'|'+o,v=a.cells[key],picked=(a.pick||[]).indexOf(key)>=0;
        return `<button class="a26-cell${v?' has':''}${picked?' picked':''}${sel===key?' sel':''}" data-k="${key}" title="${i} × ${o}">${picked?'★':v?'●':''}</button>`;
      }).join('')).join('');
    mx.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{sel=b.dataset.k;paint();renderList();});
    const n=filled().length;
    st.textContent=n+' / 6 格 · 已挑 '+((a.pick||[]).length)+' / 3';
    a.unlocked=n>=MIN_CELL;
    if(a.unlocked&&!a._wasUnlocked){a._wasUnlocked=true;setTimeout(()=>{try{listEl.scrollIntoView({block:'nearest',behavior:'smooth'});}catch(e){}},60);}
    if(!a.unlocked)a._wasUnlocked=false;
    api.refresh();
  }
  function renderList(){
    const keys=Object.keys(a.cells||{});
    const edit=sel?`<div class="a26-edit"><span>${sel.replace('|',' × ')}</span>
      <input id="cellIn" maxlength="40" value="${api.esc(a.cells[sel]||'')}" placeholder="当…时，…跟着变（≥6 字）">
      <button class="btn sm" id="cellSave">记下</button></div>`:'';
    listEl.innerHTML=edit+(keys.length?keys.map(k=>{
      const picked=(a.pick||[]).indexOf(k)>=0;
      return `<div class="a26-row${picked?' on':''}"><b>${k.replace('|',' × ')}</b><span>${api.esc(a.cells[k])}</span>
        <button class="a26-pickb${picked?' on':''}" data-p="${k}" ${a.unlocked?'':'disabled'}>${picked?'★ 已挑':'挑它'}</button>
        <button class="a26-del" data-d="${k}">×</button></div>`;
    }).join(''):'<div class="a26-empty">点上面的格子，从第一个开始。</div>');
    const inp=listEl.querySelector('#cellIn');
    if(inp){
      inp.focus();inp.setSelectionRange(inp.value.length,inp.value.length);
      const save=()=>{const v=inp.value.trim();if(v.length<6)return;a.cells[sel]=v;api.save();paint();renderList();};
      listEl.querySelector('#cellSave').onclick=save;
      inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();save();}});
    }
    listEl.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{
      const k=b.dataset.p;a.pick=a.pick||[];
      if(a.pick.indexOf(k)>=0)a.pick=a.pick.filter(x=>x!==k);
      else if(a.pick.length<MIN_PICK)a.pick=a.pick.concat(k);
      else api.toast('挑 3 个就够了');
      api.save();paint();renderList();
    });
    listEl.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{
      delete a.cells[b.dataset.d];a.pick=(a.pick||[]).filter(x=>x!==b.dataset.d);
      api.save();paint();renderList();
    });
  }
  sec.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{a.set=b.dataset.s;a.cells={};a.pick=[];sel=null;api.save();paint();renderList();});
  sec.querySelector('#mReset').onclick=()=>{a.cells={};a.pick=[];sel=null;api.save();paint();renderList();};
  paint();renderList();
},
hint(S){const a=S.answers;const n=Object.keys(a.cells||{}).filter(k=>(a.cells[k]||'').length>=6).length;
  if(n<MIN_CELL)return '还差 '+(MIN_CELL-n)+' 格没填';if((a.pick||[]).length<MIN_PICK)return '还要挑 '+(MIN_PICK-(a.pick||[]).length)+' 个';return '';},
gate(S){const a=S.answers;const n=Object.keys(a.cells||{}).filter(k=>(a.cells[k]||'').length>=6).length;
  return n>=MIN_CELL&&(a.pick||[]).length>=MIN_PICK;}},

/* ---------- 4 在你的事上 ---------- */
{id:'mine',name:'在你的事上',short:'在你的事',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>挑你挑中的那一格，<em>写深入一点</em></h1></div>
<div class="grid2">
  <div class="panel"><div class="panel-h"><h4>① 你挑的那一格</h4><span>内部 × 外部</span></div>
    <div class="field"><input id="pair" maxlength="30" placeholder="例如：容量 × 每天喝水次数"></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">② 外部变量怎么测</h4><span>≥10 字</span></div>
    <div class="field"><textarea id="sense" maxlength="50" placeholder="用什么信号判断它变了"></textarea></div></div>
  <div class="panel"><div class="panel-h"><h4>③ 产品怎么跟着变</h4><span>≥12 字</span></div>
    <div class="field"><textarea id="react" maxlength="60" placeholder="具体动作，不要只写智能调节"></textarea></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">④ 谁最需要它</h4><span>≥6 字</span></div>
    <div class="field"><input id="user" maxlength="30" placeholder="一个具体的人"></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  ['pair','sense','react','user'].forEach(k=>{const el=sec.querySelector('#'+k);el.value=a[k]||'';el.addEventListener('input',()=>{a[k]=el.value;api.save();api.refresh();});});
},
hint(S){const a=S.answers;if((a.pair||'').length<3)return '写那一格';if((a.sense||'').length<10)return '没写怎么测';if((a.react||'').length<12)return '没写怎么变';if((a.user||'').length<6)return '没写谁需要';return '';},
gate(S){const a=S.answers;return !!((a.pair||'').length>=3&&(a.sense||'').length>=10&&(a.react||'').length>=12&&(a.user||'').length>=6);}},

/* ---------- 5 提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 产出',
html:`
<div class="step-h"><h1>交一张<em>矩阵卡</em></h1></div>
<div class="grid2" style="align-items:start">
  <div id="cardSlot"></div>
  <div class="panel"><div class="panel-h"><h4>补一句</h4><span>会被同事看到</span></div>
    <div class="field"><label>36 格里，哪一格最不像会成立、但你越想越觉得有意思</label><textarea id="odd" maxlength="50" placeholder="写那一格和一句理由"></textarea></div>
    <div class="row" style="margin-top:10px"><button class="btn primary" id="subBtn">提交</button><button class="btn" id="export2">导出 PNG</button></div>
    <div class="hint" id="subSt" style="margin-top:8px">未提交</div></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const slot=sec.querySelector('#cardSlot'),odd=sec.querySelector('#odd'),btn=sec.querySelector('#subBtn'),st=sec.querySelector('#subSt');
  function paint(){
    odd.value=a.odd||'';
    const picks=(a.pick||[]).map(k=>k.replace('|',' × ')+'：'+(a.cells[k]||'')).join('；');
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A26</span><span>矩阵卡</span></div>'+
      '<h5>'+api.esc(a.pair||'我的依存')+'</h5><div class="kv">'+
      [['对象',(SETS[a.set]||{}).n],['填格数',Object.keys(a.cells||{}).length+' 格'],['挑中 3 格',picks],
       ['怎么测',a.sense],['怎么变',a.react],['谁需要',a.user],['最怪的一格',a.odd]]
      .map(r=>'<div><b>'+r[0]+'</b><span class="'+(r[1]?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+'</div></div>';
    st.textContent=S.submitted?'已提交':'未提交';btn.disabled=!!S.submitted;btn.textContent=S.submitted?'已提交':'提交';
  }
  odd.addEventListener('input',()=>{a.odd=odd.value;api.save();paint();api.refresh();});
  btn.onclick=async()=>{await api.submit();paint();};
  sec.querySelector('#export2').onclick=()=>api.exportCard();
  paint();
},
hint(S){return (S.answers.odd||'').length>=4?'':'写一句"最怪的一格"';},
gate(S){return (S.answers.odd||'').length>=4;}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>矩阵的价值是<em>不漏</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 先铺满</div><p class="small" style="margin-top:5px">一开始就筛，等于回到灵感。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 一格一句</div><p class="small" style="margin-top:5px">写不出"当…时…"的格子，就是没想清。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 最怪的先留</div><p class="small" style="margin-top:5px">越不像成立的，越可能在没人做过的地方。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A27</span></div>
<p class="small">A27 · 属性关联：三个案例还原。看真实产品是怎么把"一个变量跟着另一个变量"做成体验的。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '你这一格，外部变量真的测得到吗？',
 '如果它测错了，产品会怎么错？',
 '谁最需要这个依存？能指出一个人吗？',
 '36 格里，你最想删掉哪一格？为什么？',
 '这个依存，竞品为什么没做？'
]},

card(S){
  const a=S.answers||{};
  return {title:'A26 · 矩阵卡',rows:[
    ['对象',(SETS[a.set]||{}).n||'—'],
    ['填格数',Object.keys(a.cells||{}).length+' 格'],
    ['挑中',(a.pick||[]).map(k=>k.replace('|',' × ')).join('、')||'—'],
    ['怎么测',a.sense||'—'],['怎么变',a.react||'—'],['谁需要',a.user||'—']
  ]};
},
notes:[
 {t:'本节目标',h:'让学员用矩阵做一次系统搜索，先发散 6 格再收敛 3 格。'},
 {t:'时间分配',h:'先猜 5′ · 概念 6′ · 矩阵 20′ · 在你的事 9′ · 提交 5′。'},
 {t:'常见卡点',h:'学员会只填"看起来合理"的格子。要求先填 6 格，哪怕很怪。'},
 {t:'直播怎么接',h:'把全班挑中的格子汇总，看哪一列被集中选中——那一列就是群体的盲区或共识。'},
 {t:'和 A25 的关系',h:'A25 学写一条，A26 学铺满再收。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A26']=L;
})();
