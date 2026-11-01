/* A21 · 一专多能：给现有组件一个新任务 */
(function(){
'use strict';
const IMG={pump:'assets-cases-a21-pump.jpg',handle:'assets-cases-a21-handle.jpg'};

/* 8 个"人人都会经过"的组件：old 是它原来在干的活 */
const COMPS=[
 {k:'door',n:'门把手',old:'开门'},
 {k:'stair',n:'楼梯',old:'上下楼'},
 {k:'sill',n:'窗台',old:'放东西'},
 {k:'lift',n:'电梯按钮',old:'按楼层'},
 {k:'bin',n:'垃圾桶',old:'扔垃圾'},
 {k:'lamp',n:'走廊灯',old:'照明'},
 {k:'hydrant',n:'消防栓',old:'灭火'},
 {k:'locker',n:'快递柜',old:'存件取件'}
];
/* 4 个新任务 */
const TASKS=[
 {k:'warn',n:'提示危险',d:'在出事之前让人看见'},
 {k:'stay',n:'让人停留',d:'给一个能停一下的理由'},
 {k:'info',n:'传递信息',d:'把一句话送到眼前'},
 {k:'clean',n:'顺便消毒',d:'借一次必须发生的接触'}
];

const LINK_MIN=8;   /* 一条说明至少 8 字才算成立 */
const OK_NEED=4;    /* 至少 4 条成立才解锁 */
const LINK_MAX=6;   /* 配对台上限，防止刷满 */

const ANS=S=>(S&&S.answers&&S.answers.a21)||{};
let redrawFn=null;
const linksOf=a=>{const L=(a&&a.links)||{};return Object.keys(L).map(k=>L[k]).filter(x=>x&&x.c&&x.t);};
const okN=a=>linksOf(a).filter(x=>String(x.txt||'').trim().length>=LINK_MIN).length;
const cName=k=>(COMPS.find(x=>x.k===k)||{}).n||k;
const tName=k=>(TASKS.find(x=>x.k===k)||{}).n||k;

const FLOW=`<svg class="a21-flow" viewBox="0 0 340 80" aria-hidden="true">
<defs><marker id="a21ar" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 1.2l6 2.8-6 2.8z" fill="currentColor"/></marker></defs>
<g fill="none" stroke="currentColor">
  <rect x="1" y="24" width="72" height="32" rx="7" opacity=".5"/>
  <rect x="192" y="2" width="146" height="30" rx="7" opacity=".5"/>
  <rect x="192" y="48" width="146" height="30" rx="7" opacity=".45" stroke-dasharray="4 3"/>
  <path d="M73 40C110 40 120 17 186 17" opacity=".7" marker-end="url(#a21ar)"/>
  <path d="M73 40C110 40 120 63 186 63" opacity=".7" marker-end="url(#a21ar)"/>
</g>
<g fill="currentColor" font-size="10.5" text-anchor="middle">
  <text x="37" y="44">转盘</text>
  <text x="265" y="21">任务一 · 让孩子玩</text>
  <text x="265" y="67">任务二 · 抽水</text>
</g></svg>`;

const L={
id:'A21',week:6,seq:21,title:'一专多能：给现有组件一个新任务',
kicker:'WEEK 6 · 一专多能',tool:'tu',toolName:'一专多能',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>一个旋转木马，<em>替谁干了活</em></h1>
<p>Play Pump 装在南非的学校操场上。孩子转的那个转盘，下面接了一台水泵。它没有多一台电泵，也没有多一个人。先看图——它是怎么做到的？</p></div>
<div class="grid2" style="align-items:start;margin-bottom:12px">
  <figure class="a21-fig">
    <button class="case-zoom" data-zoom="pump" title="看大图">⤢</button>
    <img src="${IMG.pump}" alt="Play Pump 操场转盘" loading="lazy">
    <figcaption>Play Pump · 孩子转的转盘同时带动水泵　图：SIT 官方课程材料（已授权）</figcaption>
  </figure>
  <div class="panel"><div class="panel-h"><h4>它做了什么</h4><span>单选</span></div>
    <div class="opts">
      <button class="opt" data-h="a"><span class="k">A</span><span><b>加了一台电泵</b><span>孩子玩的时候顺手开一下</span></span></button>
      <button class="opt" data-h="b"><span class="k">B</span><span><b>让转盘多干一件</b><span>转圈的动作同时带动水泵</span></span></button>
      <button class="opt" data-h="c"><span class="k">C</span><span><b>把水泵做小</b><span>塞进转盘的轴里</span></span></button>
    </div>
    <div id="hookOut" style="margin-top:10px"></div></div>
</div>`,
init(sec,api){
  const S=api.S;S.answers.a21=S.answers.a21||{};const a=S.answers.a21;
  const out=sec.querySelector('#hookOut');
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',a.hook===b.dataset.h));
    if(!a.hook){out.innerHTML='';return;}
    const ok=a.hook==='b';
    out.innerHTML='<div class="a21-reveal '+(ok?'ok':'diff')+'">'+
      (ok?'<b>对。</b>转盘原来的任务是让孩子玩；第二个任务是抽水。两个任务共用同一个动作——转得越起劲，水抽得越多。没有新增零件，也没有新增人手，这就是一专多能。'
         :'<b>更准确的是 B。</b>加电泵要电、要维护，那还是"加东西"。孩子转的这个动作本身就是动力：玩 = 抽水。')+
      '<span class="a21-reveal-n">水箱上的广告位由赞助商买断、付掉维护费，那是第三层；先记住这一层：同一个零件，两份活。</span></div>';
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{a.hook=b.dataset.h;api.save();paint();api.refresh();});
  const z=sec.querySelector('[data-zoom]');
  if(z)z.onclick=()=>api.modal('<button class="modal-x">×</button><h3>Play Pump</h3>'+
    '<img src="'+IMG.pump+'" style="width:100%;border-radius:8px;display:block">'+
    '<p class="small" style="margin-top:10px">孩子转的转盘带动下面的水泵，水抽到水箱里。图：SIT 官方课程材料（已授权）</p>');
  paint();
},
hint(S){return ANS(S).hook?'':'先选一个你的判断';},
gate(S){return !!ANS(S).hook;}},

/* ---------- 2 概念 ---------- */
{id:'concept',name:'概念',short:'概念',kicker:'STEP 2 · 概念',
html:`
<div class="step-h" style="margin-bottom:12px"><h1>让已经在场的东西，<em>多干一件</em></h1>
<p>一专多能（Task Unification）：在盒内思考里，给一个<b>已有组件</b>指派一项<b>新任务</b>。不加人、不加零件、不加预算。追问句式只有一句——「这个组件，怎么帮我完成这件事？」</p></div>
<div class="grid2" style="margin-bottom:10px;align-items:start">
  <div class="panel"><div class="panel-h"><h4>三种接法</h4><span>说清是哪一种</span></div>
    <div class="a21-conn"><b>内部</b><span>一个组件里装两个功能</span><em>PullClean 门把手：按压开门时出一次消毒液。</em></div>
    <div class="a21-conn"><b>外部</b><span>借环境里已有的东西</span><em>Play Pump 转盘：孩子本来就要玩，玩带动泵。</em></div>
    <div class="a21-conn"><b>时间</b><span>同一组件，不同时刻做不同的事</span><em>同一间会议室：白天开会，晚上是瑜伽房。</em></div>
  </div>
  <div class="panel"><div class="panel-h"><h4>一条判据</h4><span>只要这一条</span></div>
    ${FLOW}
    <p class="small" style="margin-top:4px">两个任务必须<b>同时成立</b>，谁也不拖累谁。时间型的两件事不同时发生，但也不能让前一件给后一件添麻烦。</p>
    <div class="a21-warn"><b>什么时候别用</b><span>要加零件；两个任务抢同一个动作；第二个任务要靠人额外多做一步。</span></div>
  </div>
</div>
<div class="grid2" style="align-items:start">
  <figure class="a21-fig">
    <button class="case-zoom" data-zoom="handle" title="看大图">⤢</button>
    <img src="${IMG.handle}" alt="PullClean 消毒门把手" loading="lazy">
    <figcaption>PullClean · 开门的手势同时挤出消毒液　图：SIT 官方课程材料（已授权）</figcaption>
  </figure>
  <div class="panel"><div class="panel-h"><h4>先判断一个</h4><span>单选</span></div>
    <div class="opts a21-opts">
      <button class="opt" data-c="a"><span class="k">A</span><span><b>在门边放一瓶免洗洗手液</b><span>再贴一张"请消毒"</span></span></button>
      <button class="opt" data-c="b"><span class="k">B</span><span><b>让门把手按压时出一次消毒液</b><span>开门的手势同时完成消毒</span></span></button>
    </div>
    <div id="cOut" style="margin-top:10px"></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S;S.answers.a21=S.answers.a21||{};const a=S.answers.a21;
  const out=sec.querySelector('#cOut');
  function paint(){
    sec.querySelectorAll('[data-c]').forEach(b=>b.classList.toggle('on',a.c2===b.dataset.c));
    if(!a.c2){out.innerHTML='';return;}
    const ok=a.c2==='b';
    out.innerHTML='<div class="a21-reveal '+(ok?'ok':'diff')+'">'+
      (ok?'<b>对。</b>B 让"门把手"这个已有组件承担了第二个任务，消毒挂在"必须碰把手"这个动作上。'
         :'<b>是 B。</b>A 是在旁边加了一个零件，而且人要先看见、再伸手，多了一步。B 把消毒挂在"必须碰把手"上，不额外要求人做什么。')+
      '</div>';
  }
  sec.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{a.c2=b.dataset.c;api.save();paint();api.refresh();});
  const z=sec.querySelector('[data-zoom]');
  if(z)z.onclick=()=>api.modal('<button class="modal-x">×</button><h3>PullClean 门把手</h3>'+
    '<img src="'+IMG.handle+'" style="width:100%;border-radius:8px;display:block">'+
    '<p class="small" style="margin-top:10px">按压把手时出一次消毒液，把"手消时机"放在门口。图：SIT 官方课程材料（已授权）</p>');
  paint();
},
hint(S){const a=ANS(S);return a.c2?'':'选一个你的判断';},
gate(S){return !!ANS(S).c2;}},

/* ---------- 3 任务配对台 ---------- */
{id:'pair',name:'配对台',short:'配对',kicker:'STEP 3 · 任务配对台',
html:`
<div class="step-h"><h1>把"新任务"，<em>接在一个已有组件上</em></h1>
<p>左边 8 个组件，办公室里人人都会经过；右边 4 个新任务。一个组件可以接多个任务。连上不算数，写清<b>它原来在干什么、现在多干什么</b>才算成立。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>点/拖组件</span>
  <span class="op"><span class="op-n">2</span>点任务连上</span>
  <span class="op"><span class="op-n">3</span>写清两件事（≥8 字）</span>
  <span class="op"><span class="op-n">4</span>${OK_NEED} 条成立即解锁</span>
</div>
<div class="bench">
  <div class="bench-h"><b>PAIRING · 组件 × 新任务</b><span class="st" id="a21St">0 / ${OK_NEED} 条成立</span></div>
  <div class="bench-b a21-bench-b">
    <div class="a21-board" id="a21Board">
      <div class="a21-col" id="a21Comps"></div>
      <svg class="a21-wires" id="a21Wires"></svg>
      <div class="a21-col a21-col-r" id="a21Tasks"></div>
    </div>
    <div class="a21-hint" id="a21Hint">先点左边一个组件，再点右边一个任务（也可以直接拖）。连上以后，说明就写在任务卡下面。</div>
    <div class="a21-legend"><span>判据</span><span class="a21-lg">原来的活说清了</span><span class="a21-lg">新任务挂在同一个动作上</span><span class="a21-lg">没有加新零件</span></div>
  </div>
  <div class="bench-f"><span class="small">一条说明 ≥8 字才算成立；写不下去的那条，删掉比硬写有用。</span><div style="flex:1"></div><button class="btn sm ghost" id="a21Reset">重来</button></div>
</div>`,
init(sec,api){
  const S=api.S;S.answers.a21=S.answers.a21||{};const a=S.answers.a21;
  a.links=a.links||{};
  const board=sec.querySelector('#a21Board'),wires=sec.querySelector('#a21Wires'),
        compsEl=sec.querySelector('#a21Comps'),tasksEl=sec.querySelector('#a21Tasks'),
        hint=sec.querySelector('#a21Hint'),st=sec.querySelector('#a21St');
  const NS='http://www.w3.org/2000/svg';
  let sel=null,dragPath=null;

  const key=(c,t)=>c+'_'+t;
  const esc=api.esc;

  compsEl.innerHTML=COMPS.map(c=>`<button class="a21-comp" data-comp="${c.k}" title="原来：${c.old}">
    <span class="a21-meta"><b>${c.n}</b><em>原来：${c.old}</em></span><span class="a21-node"></span></button>`).join('');
  tasksEl.innerHTML=TASKS.map(t=>`<div class="a21-task" data-task="${t.k}">
    <div class="a21-task-h"><span class="a21-node"></span><span class="a21-meta"><b>${t.n}</b><em>${t.d}</em></span><span class="a21-cnt" data-cnt>0</span></div>
    <div class="a21-links" data-links></div></div>`).join('');

  const pos=el=>{if(!el)return{x:0,y:0};const n=el.querySelector('.a21-node')||el;
    const b=board.getBoundingClientRect(),r=n.getBoundingClientRect();
    return {x:r.left-b.left+r.width/2,y:r.top-b.top+r.height/2};};
  const curve=(p,q)=>{const dx=Math.max(30,Math.abs(q.x-p.x)*.45);
    return 'M '+p.x+' '+p.y+' C '+(p.x+dx)+' '+p.y+', '+(q.x-dx)+' '+q.y+', '+q.x+' '+q.y;};

  function redraw(){
    Array.from(wires.querySelectorAll('path')).forEach(p=>p.remove());
    if(!linksOf(a).length)return;
    linksOf(a).forEach(l=>{
      const ce=compsEl.querySelector('[data-comp="'+l.c+'"]'),te=tasksEl.querySelector('[data-task="'+l.t+'"]');
      if(!ce||!te)return;
      const p=document.createElementNS(NS,'path');
      p.setAttribute('class',String(l.txt||'').trim().length>=LINK_MIN?'w-ok':'w-wait');
      p.setAttribute('d',curve(pos(ce),pos(te)));
      wires.appendChild(p);
    });
  }
  function counts(){
    const n={};linksOf(a).forEach(l=>{n[l.t]=(n[l.t]||0)+1;});
    tasksEl.querySelectorAll('[data-task]').forEach(el=>{
      const c=n[el.dataset.task]||0,b=el.querySelector('[data-cnt]');
      b.textContent=c;b.classList.toggle('on',c>0);
    });
  }
  function paintStatus(){
    const ok=okN(a),n=linksOf(a).length;
    st.textContent=ok+' / '+OK_NEED+' 条成立';
    if(!n){hint.className='a21-hint';hint.textContent='先点左边一个组件，再点右边一个任务（也可以直接拖）。';}
    else if(ok<OK_NEED){hint.className='a21-hint';hint.innerHTML='<b>还差 '+(OK_NEED-ok)+' 条</b>：每条都要写清"原来在干什么、现在多干什么"，满 '+LINK_MIN+' 字才算成立。';}
    else{hint.className='a21-hint good';hint.innerHTML='<b>'+ok+' 条成立。</b>可以往下走了——下一步给自己找一个真对象。';}
    compsEl.querySelectorAll('[data-comp]').forEach(el=>el.classList.toggle('sel',sel===el.dataset.comp));
  }
  function renderLinks(){
    const L=linksOf(a);
    TASKS.forEach(t=>{
      const box=tasksEl.querySelector('[data-task="'+t.k+'"] [data-links]');
      const mine=L.filter(l=>l.t===t.k);
      box.innerHTML=mine.map(l=>{
        const ok=String(l.txt||'').trim().length>=LINK_MIN;
        return '<div class="a21-lk'+(ok?' ok':'')+'" data-k="'+key(l.c,l.t)+'">'+
          '<span class="a21-lk-n">'+(ok?'✓ ':'')+esc(cName(l.c))+'</span>'+
          '<input data-in="'+key(l.c,l.t)+'" maxlength="40" value="'+esc(l.txt||'')+'" placeholder="原来…；现在多干什么（≥'+LINK_MIN+' 字）">'+
          '<button class="a21-x" data-x="'+key(l.c,l.t)+'" title="删掉这条">×</button></div>';
      }).join('');
    });
  }
  function paintAll(){counts();paintStatus();renderLinks();redraw();}

  function connect(cid,tid){
    const k=key(cid,tid);
    if(a.links[k]){
      const inp=tasksEl.querySelector('[data-in="'+k+'"]');
      if(inp){inp.focus({preventScroll:true});inp.classList.add('a21-flag');setTimeout(()=>inp.classList.remove('a21-flag'),700);}
      return;
    }
    if(linksOf(a).length>=LINK_MAX){api.toast('先写完手上这 '+LINK_MAX+' 条');return;}
    a.links[k]={c:cid,t:tid,txt:''};
    paintAll();api.save();api.refresh();
    const inp=tasksEl.querySelector('[data-in="'+k+'"]');
    if(inp){inp.focus({preventScroll:true});inp.scrollIntoView({block:'nearest'});}
    api.toast('连上了：'+cName(cid)+' → '+tName(tid)+'，在任务卡下面写说明');
  }

  tasksEl.addEventListener('input',e=>{
    const inp=e.target.closest('[data-in]');if(!inp)return;
    const l=a.links[inp.dataset.in];if(!l)return;
    l.txt=inp.value;
    const ok=String(l.txt).trim().length>=LINK_MIN,row=inp.closest('.a21-lk');
    row.classList.toggle('ok',ok);
    counts();paintStatus();redraw();api.save();api.refresh();
  });
  tasksEl.addEventListener('click',e=>{
    const x=e.target.closest('[data-x]');
    if(x){delete a.links[x.dataset.x];paintAll();api.save();api.refresh();api.toast('已删掉这条');return;}
    if(e.target.closest('.a21-lk'))return;
    const t=e.target.closest('[data-task]');if(!t)return;
    if(!sel){api.toast('先点左边一个组件');return;}
    connect(sel,t.dataset.task);
  });

  let dragging=false;
  function move(e){
    if(!dragging||!dragPath||!sel)return;
    const b=board.getBoundingClientRect();
    const p=pos(compsEl.querySelector('[data-comp="'+sel+'"]'));
    dragPath.setAttribute('d',curve(p,{x:e.clientX-b.left,y:e.clientY-b.top}));
    const el=document.elementFromPoint(e.clientX,e.clientY);
    const t=el&&el.closest?el.closest('[data-task]'):null;
    tasksEl.querySelectorAll('.a21-task').forEach(x=>x.classList.toggle('over',x===t));
  }
  function up(e){
    window.removeEventListener('pointermove',move);
    dragging=false;
    if(dragPath){dragPath.remove();dragPath=null;}
    const el=document.elementFromPoint(e.clientX,e.clientY);
    const t=el&&el.closest?el.closest('[data-task]'):null;
    tasksEl.querySelectorAll('.a21-task').forEach(x=>x.classList.remove('over'));
    if(t&&sel)connect(sel,t.dataset.task);
  }
  board.addEventListener('pointerdown',e=>{
    const c=e.target.closest('[data-comp]');if(!c)return;
    e.preventDefault();
    sel=c.dataset.comp;paintStatus();
    dragging=true;
    if(!dragPath){dragPath=document.createElementNS(NS,'path');dragPath.setAttribute('class','w-drag');wires.appendChild(dragPath);}
    move(e);
    window.addEventListener('pointermove',move);
    window.addEventListener('pointerup',up,{once:true});
  });
  compsEl.querySelectorAll('[data-comp]').forEach(c=>c.onclick=()=>{
    sel=c.dataset.comp;paintStatus();
    hint.className='a21-hint';
    hint.innerHTML='已选 <b>'+esc(cName(sel))+'</b>，再点右边一个任务。一个组件可以接两个任务。';
  });
  sec.querySelector('#a21Reset').onclick=()=>{
    a.links={};sel=null;paintAll();api.save();api.refresh();
    api.toast('已清空配对');
  };
  window.addEventListener('resize',()=>{try{redraw();}catch(e){}});
  if(window.ResizeObserver){
    let raf=0;
    new ResizeObserver(()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{try{redraw();}catch(e){}});}).observe(board);
  }
  redrawFn=redraw;
  paintAll();
},
onEnter(){try{if(redrawFn)redrawFn();}catch(e){}},
hint(S){const ok=okN(ANS(S)),n=linksOf(ANS(S)).length;
  if(!n)return '先连一条：组件 → 任务';
  if(ok<OK_NEED)return '还差 '+(OK_NEED-ok)+' 条写满 '+LINK_MIN+' 字';
  return '';},
gate(S){return okN(ANS(S))>=OK_NEED;}},

/* ---------- 4 在你的事上 ---------- */
{id:'mine',name:'在你的事上',short:'你的事',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>你那里，<em>人人都会经过的那样东西</em></h1>
<p>不用找新奇物件。找一个人每天必经、必碰、必看的东西——它已经在场，这就是你要用的组件。三句都写满才算过。</p></div>
<div class="grid2" style="align-items:start">
  <div class="panel"><div class="panel-h"><h4>三句话</h4><span>按顺序写</span></div>
    <div class="field" style="margin-bottom:10px"><label>① 它是什么（≥4 字）</label>
      <input id="a21Obj" maxlength="30" placeholder="例如：一楼前台旁边的打卡机"></div>
    <div class="field" style="margin-bottom:10px"><label>② 给它加一个任务（≥12 字）</label>
      <textarea id="a21Add" maxlength="80" placeholder="例如：打卡的那两秒，屏幕显示今天还有几间会议室空着"></textarea></div>
    <div class="field"><label>③ 会不会影响它原来的活（≥10 字）</label>
      <textarea id="a21Imp" maxlength="80" placeholder="例如：打卡不用多一步，只是多看一眼；数据要接会议室系统"></textarea></div>
  </div>
  <div class="panel"><div class="panel-h"><h4>写之前先看三条</h4><span>实时检查</span></div>
    <div class="stack" style="gap:6px">
      <div class="chk" data-c="obj"><i>○</i><b>是一个具体的东西</b><span>能指着它说"就是这个"，不是"效率"</span></div>
      <div class="chk" data-c="add"><i>○</i><b>新任务挂在同一个动作上</b><span>人不用为你这件事多做一步</span></div>
      <div class="chk" data-c="imp"><i>○</i><b>写了会不会拖累原来的活</b><span>变慢、变危险、变难看，都算拖累</span></div>
    </div>
    <div class="a21-eg"><b>一个写完整的例子</b>
      <p>对象：茶水间的饮水机<br>新任务：接水的那 8 秒，屏幕显示三间会议室现在是否占用<br>影响：接水不用多一步，只是多看一眼；数据要接会议室系统，行政每周对一次</p></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S;S.answers.a21=S.answers.a21||{};const a=S.answers.a21;
  const obj=sec.querySelector('#a21Obj'),add=sec.querySelector('#a21Add'),imp=sec.querySelector('#a21Imp');
  function paint(){
    if(document.activeElement!==obj)obj.value=a.obj||'';
    if(document.activeElement!==add)add.value=a.add||'';
    if(document.activeElement!==imp)imp.value=a.impact||'';
    const o=String(a.obj||'').trim().length,d=String(a.add||'').trim().length,m=String(a.impact||'').trim().length;
    sec.querySelectorAll('.chk').forEach(el=>{
      const k=el.dataset.c;
      const on=k==='obj'?o>=4:k==='add'?d>=12:m>=10;
      el.classList.toggle('on',on);el.querySelector('i').textContent=on?'✓':'○';
    });
  }
  obj.addEventListener('input',()=>{a.obj=obj.value;api.save();paint();api.refresh();});
  add.addEventListener('input',()=>{a.add=add.value;api.save();paint();api.refresh();});
  imp.addEventListener('input',()=>{a.impact=imp.value;api.save();paint();api.refresh();});
  paint();
},
hint(S){const a=ANS(S);
  if(String(a.obj||'').trim().length<4)return '先写清"它是什么"';
  if(String(a.add||'').trim().length<12)return '新任务还差 '+(12-String(a.add||'').trim().length)+' 字';
  if(String(a.impact||'').trim().length<10)return '影响还差 '+(10-String(a.impact||'').trim().length)+' 字';
  return '';},
gate(S){const a=ANS(S);
  return String(a.obj||'').trim().length>=4&&String(a.add||'').trim().length>=12&&String(a.impact||'').trim().length>=10;}},

/* ---------- 5 过滤与提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 过滤与提交',
html:`
<div class="step-h"><h1>先过两问，<em>再交</em></h1>
<p>这两问答不上来，方案先别交。它们比"点子好不好"更能说明它会不会落地。</p></div>
<div class="grid2" style="align-items:start;margin-bottom:12px">
  <div class="panel"><div class="panel-h"><h4>两问</h4><span>都要答</span></div>
    <div class="a21-q"><b>① 用户会不会觉得别扭？</b><span>1 = 很别扭，5 = 完全不别扭</span>
      <div class="stars" id="a21Stars"></div>
      <div class="a21-scale"><span>别扭</span><span>不别扭</span></div></div>
    <div class="a21-q" style="border-top:1px solid var(--line);padding-top:10px">
      <b>② 谁维护？</b><span>写岗位或人，别写"相关部门"</span>
      <input id="a21Owner" maxlength="24" placeholder="例如：楼层保洁，每天早班一次"></div>
    <div class="hint" id="a21QHint" style="margin-top:10px">两问都答了才算过。</div>
  </div>
  <div id="a21CardSlot"></div>
</div>
<div class="panel"><div class="row">
  <button class="btn primary" id="a21Sub">提交</button>
  <button class="btn" id="a21Exp">导出 PNG</button>
  <span class="small" id="a21SubSt">未提交</span>
  <div style="flex:1"></div>
  <span class="small">提交后先过机器评审，再进同班互评</span>
</div></div>`,
init(sec,api){
  const S=api.S;S.answers.a21=S.answers.a21||{};const a=S.answers.a21;
  const stars=sec.querySelector('#a21Stars'),owner=sec.querySelector('#a21Owner'),
        qh=sec.querySelector('#a21QHint'),slot=sec.querySelector('#a21CardSlot'),
        btn=sec.querySelector('#a21Sub'),subSt=sec.querySelector('#a21SubSt');
  stars.innerHTML=[1,2,3,4,5].map(n=>'<button data-v="'+n+'">'+n+'</button>').join('');
  function rows(){
    const c=L.card(S);
    return '<div class="outcard"><div class="oh"><span>DELIVERABLE · A21</span><span>一专多能卡</span></div>'+
      '<h5>'+api.esc(c.title)+'</h5><div class="kv">'+
      c.rows.map(r=>'<div><b>'+api.esc(r[0])+'</b><span class="'+(r[1]&&r[1]!=='—'?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+
      '</div></div>';
  }
  function paint(){
    stars.querySelectorAll('button').forEach(b=>b.classList.toggle('on',+b.dataset.v<=+(a.awkward||0)));
    if(document.activeElement!==owner)owner.value=a.owner||'';
    const okA=!!a.awkward,okB=String(a.owner||'').trim().length>=4;
    qh.innerHTML=okA&&okB?'<b style="color:#9ED3B4">两问都过了。</b>'
      :'还差：'+(!okA?'别扭那题（1–5）':'')+(!okA&&!okB?'、':'')+(!okB?'谁维护':'');
    slot.innerHTML=rows();
    subSt.textContent=S.submitted?'已提交':'未提交';
    btn.textContent=S.submitted?'已提交，去互评':'提交';
    btn.disabled=!!S.submitted;
  }
  stars.querySelectorAll('button').forEach(b=>b.onclick=()=>{a.awkward=+b.dataset.v;api.save();paint();api.refresh();});
  owner.addEventListener('input',()=>{a.owner=owner.value;api.save();paint();api.refresh();});
  btn.onclick=async()=>{await api.submit();paint();};
  sec.querySelector('#a21Exp').onclick=()=>api.exportCard();
  paint();
},
hint(S){const a=ANS(S);
  if(!a.awkward)return '先答"别扭"1–5';
  if(String(a.owner||'').trim().length<4)return '写清谁维护';
  return '';},
gate(S){const a=ANS(S);return !!a.awkward&&String(a.owner||'').trim().length>=4;}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>一专多能，<em>只多问一句</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 不加东西</div><p class="small" style="margin-top:5px">新任务派给<b>已经在场</b>的组件。一加零件，就不是一专多能了。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 三种接法</div><p class="small" style="margin-top:5px">内部、外部、时间。先说清是哪一种，判据才用得上。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 一条判据</div><p class="small" style="margin-top:5px">两个任务同时成立、谁也不拖累谁。抢同一个动作的，放弃。</p></div>
</div>
<div class="panel" style="margin-bottom:12px"><div class="panel-h"><h4>明天的一步</h4><span>3 分钟</span></div>
<p class="small" id="a21WrapNext">明天站到你选的那件东西<span id="a21WrapObj"></span>旁边 3 分钟：数一数有多少人经过、每人碰它几次。第二个任务要挂在他们本来就会做的那个动作上。</p></div>
<div class="panel a21-quote" style="margin-bottom:12px">
<p>同一个零件，两份活。<br>判断它成立不成立，只看一句：<b>两个任务能不能同时成立、谁也不拖累谁。</b></p></div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A22</span></div>
<p class="small">A22 · 一专多能：三个案例还原。Play Pump 的转盘一边给孩子玩一边抽水，带灯螺丝刀一边拧一边照，医院腕带同时做身份核对与防走失——看这三个案例里，<b>第二个任务到底派给了谁、又借了什么</b>。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div></div>`,
init(sec,api){
  const a=ANS(api.S),o=sec.querySelector('#a21WrapObj');
  if(o&&String(a.obj||'').trim())o.textContent='（'+a.obj+'）';
  sec.querySelector('#againBtn').onclick=()=>api.go(0);
},
onEnter(api){
  const a=ANS(api.S),o=document.querySelector('#a21WrapObj');
  if(o&&String(a.obj||'').trim())o.textContent='（'+a.obj+'）';
},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '这个组件原来在干什么？一句话，别加形容词。',
 '新任务和原来的活，共用的是同一个动作吗？',
 '两个任务打架时，你牺牲哪一个？为什么？',
 '别人要多做一步吗？多这一步，他凭什么愿意？',
 '谁维护？他手上今天已经有多少活？'
]},

card(S){
  const a=ANS(S);
  const pairs=linksOf(a).filter(x=>String(x.txt||'').trim().length>=LINK_MIN).map(x=>cName(x.c)+'→'+tName(x.t));
  const hook={a:'A 加了一台电泵',b:'B 转盘多干一件',c:'C 水泵做小了'}[a.hook]||'—';
  return {title:'A21 · 一专多能卡',rows:[
    ['先判断',hook],
    ['配对',pairs.length?pairs.join('；'):'—'],
    ['我的对象',a.obj||'—'],
    ['新任务',a.add||'—'],
    ['会不会拖累',a.impact||'—'],
    ['自检','别扭 '+(a.awkward?a.awkward+'/5':'—')+' · 维护：'+(a.owner||'—')]
  ]};
},
notes:[
 {t:'本节目标',h:'让学员能指着一件现成的东西说出"它还能多干哪件事"，并用一条判据筛掉自嗨的方案。'},
 {t:'时间分配',h:'先猜 5′ · 概念 8′ · 配对台 15′ · 你的事 10′ · 两问与提交 5′ · 收束 2′。'},
 {t:'常见卡点',h:'学员把"在旁边加一个"当一专多能。追问三句：加零件了吗？原来的活有没有变？第二个任务要靠人额外多做一步吗？'},
 {t:'直播怎么接',h:'投屏配对台：先看哪几个组件被连得最多，再挑两条"同一个组件连了两个任务"的说明当众读——一条同时成立、一条互相拖累，让班里判。'},
 {t:'和 A22 的关系',h:'A22 用三个真实案例还原"第二个任务派给了谁"；本节只要求做对动作、过得了判据。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A21']=L;
})();
