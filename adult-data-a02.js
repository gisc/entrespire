/* A02 · 功能性固着：蜡烛与图钉盒 */
(function(){
'use strict';

const IMG={candle:'assets-cases-a02-candle.jpg'};

/* ---------- 物品线稿 ---------- */
const O={
 cup:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M8 8h16l-2.2 17H10.2z"/><path d="M7 8h18" opacity=".55"/><path d="M11.5 13.5h9" opacity=".35" stroke-dasharray="2 2"/></svg>',
 clip:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M10 14.5l6-7.5 6 7.5V23H10z"/><path d="M10 17.5h12"/><path d="M8.6 11.4L6 8.6M23.4 11.4L26 8.6" stroke-linecap="round"/></svg>',
 band:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="16" cy="16" rx="11" ry="6.4" transform="rotate(-22 16 16)"/><ellipse cx="16" cy="16" rx="7.6" ry="4.2" transform="rotate(-22 16 16)" opacity=".38"/></svg>',
 note:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M8 5h16v16.5L19.5 27H8z"/><path d="M24 21.5h-4.5V27" opacity=".6"/><path d="M11.5 13h9M11.5 17h9M11.5 21h4.5" opacity=".4"/></svg>',
 a4:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M9 4h10l5 5v19H9z"/><path d="M19 4v5h5"/><path d="M12.5 14h9M12.5 18h9M12.5 22h6" opacity=".4"/></svg>',
 tape:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="14.5" cy="15" r="9"/><circle cx="14.5" cy="15" r="3.6" opacity=".55"/><path d="M22.5 19.5l5 4-3.5 4.5" opacity=".6" stroke-linejoin="round"/></svg>',
 pin:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M22 9.5v11.2a5 5 0 01-10 0V8.8a3.2 3.2 0 016.4 0v11.6a1.6 1.6 0 01-3.2 0v-9.4"/></svg>',
 bottle:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M13 4h6v3.6l2 3.4v17H11V11l2-3.4z"/><path d="M12 15h8" opacity=".4"/><path d="M13 7.6h6" opacity=".55"/></svg>'
};

/* ---------- 任务图标 ---------- */
const T={
 stand:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><rect x="8" y="2.5" width="8" height="13.5" rx="1.6" transform="rotate(12 12 9)"/><path d="M4.5 21h15M9 21l3-5.5L15 21"/></svg>',
 cable:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M3 8c3 0 3 8 6 8s3-8 6-8 3 8 6 8"/><rect x="1.5" y="5.5" width="3" height="5" rx="1"/><rect x="19.5" y="13.5" width="3" height="5" rx="1"/></svg>',
 zone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M12 4v16M3 12h18" stroke-dasharray="2 2" opacity=".6"/></svg>'
};

/* ---------- 数据 ---------- */
const OBJ=[
 {k:'cup',n:'纸杯',job:'喝水',svg:O.cup},
 {k:'clip',n:'长尾夹',job:'夹住一叠纸',svg:O.clip},
 {k:'band',n:'橡皮筋',job:'把东西捆在一起',svg:O.band},
 {k:'note',n:'便签',job:'提醒一件事',svg:O.note},
 {k:'a4',n:'A4 纸',job:'被写、被打印',svg:O.a4},
 {k:'tape',n:'胶带',job:'把两样东西粘住',svg:O.tape},
 {k:'pin',n:'回形针',job:'别住几张纸',svg:O.pin},
 {k:'bottle',n:'矿泉水瓶',job:'装水',svg:O.bottle}
];
const TASK=[
 {k:'stand',n:'让手机立起来',need:'一个能撑住的硬支撑',svg:T.stand},
 {k:'cable',n:'让线不乱',need:'一个能固定或收拢的力',svg:T.cable},
 {k:'zone',n:'让桌面分出区域',need:'一条边界，或一个能圈住东西的位置',svg:T.zone}
];
const OBJN=OBJ.reduce((m,o)=>(m[o.k]=o.n,m),{});
const TASKN=TASK.reduce((m,t)=>(m[t.k]=t.n,m),{});
const OK={
 cup:['zone'],
 clip:['stand','cable'],
 band:['cable'],
 note:['cable','zone'],
 a4:['stand','zone'],
 tape:['stand','cable','zone'],
 pin:['cable'],
 bottle:['zone']
};
const SECOND={
 'cup|zone':'纸杯现在的工作是喝水。倒过来或并排站，它就多了一个「分隔」的活。',
 'clip|stand':'长尾夹现在的工作是夹纸。两只夹住手机下沿，就是两条腿。',
 'clip|cable':'长尾夹现在的工作是夹纸。夹住桌沿，线就有了一个固定的入口。',
 'band|cable':'橡皮筋现在的工作是捆。把线卷起来一箍，它就多了一个「收」的活。',
 'note|cable':'便签现在的工作是提醒。裹住线头一按，它多了一个「束」的活。',
 'note|zone':'便签现在的工作是提醒。贴成一条线，它多了一个「界」的活。',
 'a4|stand':'A4 纸现在的工作是被写。折两下，它多了一个「撑」的活。',
 'a4|zone':'A4 纸现在的工作是被写。立起来，它多了一个「隔」的活。',
 'tape|stand':'胶带现在的工作是粘。整卷立住，就是一个带凹槽的托。',
 'tape|cable':'胶带现在的工作是粘。贴住线，它多了一个「固定」的活。',
 'tape|zone':'胶带现在的工作是粘。拉一条线，它多了一个「划界」的活。',
 'pin|cable':'回形针现在的工作是别纸。别住线头，它多了一个「收」的活。',
 'bottle|zone':'矿泉水瓶现在的工作是装水。立在桌角，它多了一个「收笔」的活。'
};
const BAD={
 'cup|stand':'纸杯现在的工作是「装」。要托住手机，得先剪一道口——这一轮先不动剪刀。',
 'cup|cable':'纸杯现在的工作是喝水。把线团塞进杯子，乱还在，只是被你藏起来了。',
 'clip|zone':'长尾夹现在的工作是「夹住一叠纸」。它能夹住一条边，却画不出一块区域。',
 'band|stand':'橡皮筋现在的工作是「捆住」。它能收紧，不能支撑。手机要的是硬的。',
 'band|zone':'橡皮筋现在的工作是「捆住」。它圈得住一叠纸，圈不出一块桌面。',
 'note|stand':'便签现在的工作是「提醒」。它太软，立不住手机的重量。',
 'a4|cable':'A4 纸现在的工作是「被写」。卷成筒也夹不住线——线要的是一个持续的力。',
 'pin|stand':'回形针现在的工作是「别住几张纸」。它太细，弯了也撑不住手机——这一轮也不许弯。',
 'pin|zone':'回形针现在的工作是「别住几张纸」。它太短，圈不出一块区域。',
 'bottle|stand':'矿泉水瓶现在的工作是「装水」。不剪开，它是个圆柱，手机靠上去会滑。',
 'bottle|cable':'矿泉水瓶现在的工作是「装水」。把线塞进去，乱只是被藏起来。'
};

const DESK=[
 {k:'cup',n:'水杯',job:'装水'},
 {k:'book',n:'笔记本',job:'被写'},
 {k:'pen',n:'笔',job:'写字'},
 {k:'cable',n:'充电线',job:'充电'},
 {k:'note',n:'便利贴',job:'提醒'}
];
const DESKN=DESK.reduce((m,o)=>(m[o.k]=o.n,m),{});

const Q1=[
 {k:'a',s:'它一直在干这件事，我没把它当别的用过'},
 {k:'b',s:'它干的这件事，正好是我要借的那部分'}
];
const Q2=[
 {k:'a',s:'不影响，原来的活照干'},
 {k:'b',s:'会影响，我会先给它找个替代'}
];

const SOL='<svg class="a02-sol" viewBox="0 0 200 132" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true">'+
 '<path d="M18 4v124" opacity=".7"/>'+
 '<path d="M18 10l8 6M18 24l8 6M18 38l8 6M18 52l8 6M18 66l8 6M18 80l8 6M18 94l8 6M18 108l8 6M18 122l8 6" opacity=".13"/>'+
 '<rect x="24" y="60" width="70" height="40" rx="2" opacity=".38"/>'+
 '<path d="M24 60l6 6M94 60l6 6M24 100l6-6M94 100l6-6" opacity=".38"/>'+
 '<rect x="54" y="28" width="18" height="40" rx="2" fill="#0D131C"/>'+
 '<path d="M63 28v-7"/>'+
 '<path d="M63 18c5 4 5 8 0 11-5-3-5-7 0-11z" fill="currentColor" fill-opacity=".16"/>'+
 '<rect x="30" y="66" width="70" height="40" rx="2"/>'+
 '<circle cx="39" cy="75" r="2.2" fill="currentColor" fill-opacity=".22"/>'+
 '<circle cx="91" cy="75" r="2.2" fill="currentColor" fill-opacity=".22"/>'+
 '<circle cx="39" cy="97" r="2.2" fill="currentColor" fill-opacity=".22"/>'+
 '<circle cx="91" cy="97" r="2.2" fill="currentColor" fill-opacity=".22"/>'+
 '</svg>';

const L={
id:'A02',week:1,seq:2,title:'功能性固着：蜡烛与图钉盒',
kicker:'WEEK 1 · 破固着',tool:'mind',toolName:'功能性固着',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>把蜡烛，<em>固定在墙上</em></h1>
<p>1926 年，Duncker 在桌上放了三样东西：一支蜡烛、一盒图钉、一盒火柴。要求只有一句：<b>把蜡烛固定在墙上，点着，蜡油不许滴到地上。</b>不能用别的工具。</p></div>
<div class="a02-hook">
  <figure class="a02-photo">
    <button class="case-zoom" data-zoom="candle" title="看大图">⤢</button>
    <img src="${IMG.candle}" alt="桌上放着一支蜡烛、一把图钉和一盒火柴" loading="lazy">
    <figcaption><b>Duncker 蜡烛实验 · 1926</b><span>桌上只有三样。墙就在旁边。</span>
      <em class="a02-src">图：SIT 官方课程材料（已授权）　Day1 p.86</em></figcaption>
  </figure>
  <div class="a02-hook-r">
    <div class="a02-ask"><span class="a02-ask-k">先别算</span><p>如果是你，<b>第一步会怎么做？</b></p></div>
    <div class="opts">
      <button class="opt" data-h="a"><span class="k">A</span><span><b>用图钉把蜡烛直接钉在墙上</b><span>最快，也最像“把东西挂上去”的直觉</span></span></button>
      <button class="opt" data-h="b"><span class="k">B</span><span><b>点着，用融化的蜡油把蜡烛粘在墙上</b><span>手边有火，蜡油本身就是粘的</span></span></button>
      <button class="opt" data-h="c"><span class="k">C</span><span><b>把图钉盒倒空，用图钉把盒子钉在墙上，盒子当托架</b><span>盒子不再是容器，是一块伸出来的平面</span></span></button>
    </div>
    <div id="a02HookOut" style="margin-top:10px"></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#a02HookOut');
  function paint(){
    const v=S.answers.hook;
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',v===b.dataset.h));
    if(!v){out.innerHTML='';return;}
    const ok=v==='c';
    out.innerHTML='<div class="a02-reveal '+(ok?'ok':'warn')+'">'+
      '<div class="a02-reveal-h"><span>'+(ok?'你看见了':'再看一眼')+'</span><span>C · 倒空图钉盒</span></div>'+
      '<p><b>把图钉盒倒空，用图钉把盒子钉在墙上，蜡烛坐在盒子里。</b>盒子成了一个托架。</p>'+
      '<p class="small">'+(ok
        ? '你看见的不是“盒子”，是“一块能托住东西的平面”。盒子还是那个盒子，用途换了。'
        : 'A 会把蜡烛钉裂；B 的蜡油承不住一支蜡烛的重量。手被卡住之前，眼睛先被卡住了：盒子一直在装图钉。')+'</p>'+
      '<p class="small"><b>图钉盒的功能，被它原来的用途锁住了。</b>它越像一个“专用的容器”，你越难把它当别的用。</p>'+
      '<p class="a02-note">官方现场图里图钉是散放的。原版还有一版把图钉装在盒里——装盒时，想到“倒空盒子”的人明显更少。差别只在那个盒子。</p>'+
      '</div>';
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{S.answers.hook=b.dataset.h;api.save();paint();api.refresh();});
  sec.querySelectorAll('[data-zoom]').forEach(b=>b.onclick=e=>{
    e.stopPropagation();
    api.modal('<button class="modal-x">×</button><h3>Duncker 蜡烛实验 · 1926</h3>'+
      '<img src="'+IMG.candle+'" style="width:100%;border-radius:8px;margin:8px 0 12px" alt="蜡烛、图钉、火柴">'+
      '<p>要求：把蜡烛固定在墙上，点着，蜡油不许滴到地上。只能用桌上这三样东西。</p>'+
      '<p class="small">图：SIT 官方课程材料（已授权）</p>');
  });
  paint();
},
hint(S){return S.answers.hook?'':'先选一个：如果是你，第一步会怎么做';},
gate(S){return !!S.answers.hook;}},

/* ---------- 2 概念 ---------- */
{id:'concept',name:'概念',short:'概念',kicker:'STEP 2 · 概念',
html:`
<div class="step-h a02-concept-h"><h1>它现在的工作，<em>遮住了它还能做的工作</em></h1>
<p>功能性固着不是“笨”，是眼睛被一件事占满了。Duncker 的结论很克制：一个对象的功能一旦被固定，人就不再把它当别的工具使用。</p></div>
<div class="a02-concepts">
  <div class="panel a02-def">
    <div class="panel-h"><h4>功能性固着</h4><span>Duncker 1926</span></div>
    <p class="a02-def-p">Functional Fixedness：看见它在干什么，就很难再看见它还能干什么。</p>
    <p class="small" style="margin-top:6px">不是不知道它长什么样，是不允许它干别的。</p>
  </div>
  <div class="stack" style="gap:8px">
    <div class="panel a02-term"><div class="panel-h"><h4>盒内思考</h4><span>Closed World</span></div>
      <p class="small">不先添东西，先把现有物品数一遍。资源不是没有，是没被看见。</p></div>
    <div class="panel a02-term"><div class="panel-h"><h4>物尽其用</h4><span>现有资源</span></div>
      <p class="small">第二份工作常常不用改造，只要换个位置、朝向或状态。</p></div>
  </div>
</div>
<div class="a02-quote">
  <div><div class="a02-quote-k">一句判断</div><p>这个东西<em>现在的工作</em>，遮住了它<em>还能做的工作</em>。</p></div>
  <div class="a02-quote-fig">${SOL}<span>盒子钉在墙上，蜡烛坐在里面</span></div>
</div>
<div class="panel a02-check-panel" style="margin-top:12px">
  <div class="panel-h"><h4>三步自查</h4><span>每次卡住，按顺序问一遍</span></div>
  <div class="a02-table">
    <div class="a02-tr"><span class="a02-n">1</span><b>它现在在干什么？</b><span>说得出它此刻正在完成的那件事，不是它的名字。</span></div>
    <div class="a02-tr"><span class="a02-n">2</span><b>它还能干什么？</b><span>不买、不拆、不剪，先找三个可能。</span></div>
    <div class="a02-tr"><span class="a02-n">3</span><b>原来的活谁接？</b><span>第二份工作不能让它原来的工作没人干。</span></div>
  </div>
  <p class="a02-boundary"><b>什么时候别用：</b>承重、绝缘、食品接触、医疗、消防——这五类只按原设计用。省下的钱，不够赔一次事故。</p>
</div>
<div class="panel a02-choice" style="margin-top:12px">
  <div class="panel-h"><h4>哪一句，是被“功能”锁住的说法？</h4><span>二选一</span></div>
  <div class="opts a02-opts2">
    <button class="opt" data-c2="a"><span class="k">A</span><span><b>盒子就是装图钉的。</b><span>盒子只被允许干一件事</span></span></button>
    <button class="opt" data-c2="b"><span class="k">B</span><span><b>盒子是装图钉的，倒空了还能当托架。</b><span>先承认它现在干什么，再问还能干什么</span></span></button>
  </div>
  <div id="a02C2Out" style="margin-top:9px"></div>
</div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#a02C2Out');
  function paint(){
    const v=S.answers.concept;
    sec.querySelectorAll('[data-c2]').forEach(b=>b.classList.toggle('on',v===b.dataset.c2));
    if(!v){out.innerHTML='';return;}
    const ok=v==='a';
    out.innerHTML='<div class="a02-reveal '+(ok?'ok':'warn')+'">'+
      '<div class="a02-reveal-h"><span>'+(ok?'对':'换一面看')+'</span><span>功能性固着</span></div>'+
      '<p class="small">'+(ok
        ? 'A 把“现在的用途”当成了“唯一的用途”。这就是功能性固着：盒子只被允许装图钉。'
        : 'B 是解开之后的话。被锁住的是 A：盒子只被允许装图钉，倒空这个动作根本不会出现。')+'</p></div>';
  }
  sec.querySelectorAll('[data-c2]').forEach(b=>b.onclick=()=>{S.answers.concept=b.dataset.c2;api.save();paint();api.refresh();});
  paint();
},
hint(S){return S.answers.concept?'':'选一句：哪句是被“功能”锁住的说法';},
gate(S){return !!S.answers.concept;}},

/* ---------- 3 工作台：第二份工作 ---------- */
{id:'bench',name:'工作台',short:'工作台',kicker:'STEP 3 · 连线工作台',
html:`
<div class="step-h a02-bench-h"><h1>给它<em>第二份工作</em></h1>
<p>八件办公室里最常见的东西，三个真实任务。<b>先不动剪刀、不弯、不粘（胶带除外）</b>——只允许挪位置、换朝向、叠起来、卷起来、夹住。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>点左边一件东西</span>
  <span class="op"><span class="op-n">2</span>点右边一个任务（可连两个）</span>
  <span class="op"><span class="op-n">3</span>连错会说清它现在在干什么</span>
</div>
<div class="bench a02-bench">
  <div class="bench-h"><b>BENCH · 物品 → 第二份工作</b><span class="st" id="a02LkSt">0/3 任务 · 0 件多职</span></div>
  <div class="bench-b">
    <div class="lk a02-lk" id="a02Lk">
      <div class="lk-col" id="a02LkLeft"></div>
      <svg class="lk-wires" id="a02LkWires"></svg>
      <div class="lk-col" id="a02LkRight"></div>
    </div>
    <div class="lk-hint" id="a02LkHint">点左边一件东西，再点右边一个任务。一件东西可以连两个任务。</div>
  </div>
  <div class="bench-f"><span class="small">规则：不剪、不弯、不粘（胶带除外）。连错不扣分，会告诉你它现在在干什么。</span><div style="flex:1"></div><button class="btn sm ghost" id="a02LkReset">重来</button></div>
</div>`,
init(sec,api){
  const S=api.S;
  S.answers.jobs=S.answers.jobs||{};
  S.answers.tries=S.answers.tries||0;
  const board=sec.querySelector('#a02Lk'),wires=sec.querySelector('#a02LkWires'),
        left=sec.querySelector('#a02LkLeft'),right=sec.querySelector('#a02LkRight'),
        hint=sec.querySelector('#a02LkHint'),st=sec.querySelector('#a02LkSt');
  const NS='http://www.w3.org/2000/svg';
  let sel=null,dragPath=null;
  const got=k=>Array.isArray(S.answers.jobs[k])?S.answers.jobs[k]:[];
  const counts=()=>{
    const c={};TASK.forEach(t=>c[t.k]=0);
    OBJ.forEach(o=>got(o.k).forEach(t=>{if(c[t]!==undefined)c[t]++;}));
    return c;
  };

  left.innerHTML=OBJ.map(o=>'<button class="lk-case" data-obj="'+o.k+'">'+
    '<span class="lk-pic">'+o.svg+'</span>'+
    '<span class="lk-meta"><b>'+o.n+'</b><em>现在：'+o.job+'</em></span>'+
    '<span class="lk-badge" data-badge>0</span><span class="lk-node"></span></button>').join('');
  right.innerHTML=TASK.map(t=>'<button class="lk-tool a02-task" data-task="'+t.k+'"><span class="lk-node"></span>'+
    '<span class="tk-ic">'+t.svg+'</span><span class="tk-meta"><b>'+t.n+'</b><em>要的是：'+t.need+'</em></span>'+
    '<span class="cnt" data-cnt>0</span></button>').join('');

  const pt=el=>{if(!el)return{x:0,y:0};const n=el.querySelector('.lk-node')||el;const b=board.getBoundingClientRect(),r=n.getBoundingClientRect();
    return {x:r.left-b.left+r.width/2,y:r.top-b.top+r.height/2};};
  const curve=(a,b)=>{const dx=Math.max(30,Math.abs(b.x-a.x)*.44);return 'M '+a.x+' '+a.y+' C '+(a.x+dx)+' '+a.y+', '+(b.x-dx)+' '+b.y+', '+b.x+' '+b.y;};

  function paint(){
    const cs=counts();
    left.querySelectorAll('[data-obj]').forEach(el=>{
      const n=got(el.dataset.obj).length;
      el.classList.toggle('sel',sel===el.dataset.obj);
      el.classList.toggle('multi',n>=2);
      const b=el.querySelector('[data-badge]');b.textContent=n;b.classList.toggle('on',n>0);
    });
    right.querySelectorAll('[data-task]').forEach(el=>{
      const n=cs[el.dataset.task]||0;
      const cn=el.querySelector('[data-cnt]');cn.textContent=n;cn.classList.toggle('on',n>0);
      el.classList.toggle('done',n>=2);
    });
    const doneT=TASK.filter(t=>cs[t.k]>=2).length;
    const multi=OBJ.filter(o=>got(o.k).length>=2).length;
    st.textContent=doneT+'/3 任务 · '+multi+' 件多职';
  }
  function redraw(){
    Array.from(wires.querySelectorAll('.w-ok')).forEach(p=>p.remove());
    OBJ.forEach(o=>{
      const oe=left.querySelector('[data-obj="'+o.k+'"]');
      got(o.k).forEach(t=>{
        const te=right.querySelector('[data-task="'+t+'"]');
        if(!oe||!te)return;
        const p=document.createElementNS(NS,'path');
        p.setAttribute('class','w-ok');p.setAttribute('d',curve(pt(oe),pt(te)));
        wires.appendChild(p);
      });
    });
  }
  function connect(k,t){
    if(!k||!t)return;
    const arr=got(k);
    if(arr.indexOf(t)>=0){
      hint.className='lk-hint';
      hint.innerHTML='<b>这条已经连了。</b>'+OBJN[k]+' 和「'+TASKN[t]+'」已经在卡上。换一条，或点另一件东西。';
      return;
    }
    S.answers.tries=(S.answers.tries||0)+1;
    if((OK[k]||[]).indexOf(t)>=0){
      arr.push(t);S.answers.jobs[k]=arr;api.save();
      paint();redraw();api.refresh();
      hint.className='lk-hint';
      hint.innerHTML='<b>连上了。</b>'+SECOND[k+'|'+t]+'　再给它连一个任务，或者换一件。';
    }else{
      const oe=left.querySelector('[data-obj="'+k+'"]'),te=right.querySelector('[data-task="'+t+'"]');
      const p=document.createElementNS(NS,'path');
      p.setAttribute('class','w-bad');p.setAttribute('d',curve(pt(oe),pt(te)));wires.appendChild(p);
      setTimeout(()=>p.remove(),480);
      oe.classList.add('lk-shake');setTimeout(()=>oe.classList.remove('lk-shake'),400);
      hint.className='lk-hint bad';
      hint.innerHTML='<b>这一步还不成立。</b>'+(BAD[k+'|'+t]||'先看它现在在干什么，再看这个任务要的是什么。')+'　不是它没用，是这次要的不是它这一项。';
      api.save();
    }
  }
  let dragging=false;
  function move(e){
    if(!dragging||!dragPath||!sel)return;
    const b=board.getBoundingClientRect();
    const a=pt(left.querySelector('[data-obj="'+sel+'"]'));
    const p={x:e.clientX-b.left,y:e.clientY-b.top};
    dragPath.setAttribute('d',curve(a,p));
    const el=document.elementFromPoint(e.clientX,e.clientY);
    const t=el&&el.closest?el.closest('[data-task]'):null;
    right.querySelectorAll('[data-task]').forEach(x=>x.classList.toggle('over',x===t));
  }
  function up(e){
    window.removeEventListener('pointermove',move);
    dragging=false;
    if(dragPath){dragPath.remove();dragPath=null;}
    const el=document.elementFromPoint(e.clientX,e.clientY);
    const task=el&&el.closest?el.closest('[data-task]'):null;
    if(task&&sel)connect(sel,task.dataset.task);
    right.querySelectorAll('[data-task]').forEach(t=>t.classList.remove('over'));
  }
  board.addEventListener('pointerdown',e=>{
    const o=e.target.closest('[data-obj]');
    if(!o)return;
    e.preventDefault();
    const k=o.dataset.obj;
    if(sel!==k){sel=k;paint();}
    dragging=true;
    dragPath=document.createElementNS(NS,'path');
    dragPath.setAttribute('class','w-drag');wires.appendChild(dragPath);
    move(e);
    window.addEventListener('pointermove',move);
    window.addEventListener('pointerup',up,{once:true});
  });
  left.querySelectorAll('[data-obj]').forEach(o=>o.onclick=()=>{
    sel=o.dataset.obj;paint();
    hint.className='lk-hint';
    hint.innerHTML='<b>'+OBJN[sel]+'</b> 现在在干的是「'+OBJ[OBJ.findIndex(x=>x.k===sel)].job+'」。再点右边一个任务。';
  });
  right.querySelectorAll('[data-task]').forEach(t=>t.onclick=()=>{
    if(!sel){hint.className='lk-hint';hint.innerHTML='先点左边一件东西，再点这个任务。';return;}
    connect(sel,t.dataset.task);
  });
  function redraw3(){try{paint();redraw();}catch(e){}}
  window.addEventListener('resize',redraw3);
  sec.querySelector('#a02LkReset').onclick=()=>{
    S.answers.jobs={};sel=null;api.save();paint();redraw();api.refresh();
    hint.className='lk-hint';hint.textContent='点左边一件东西，再点右边一个任务。一件东西可以连两个任务。';
  };
  requestAnimationFrame(redraw3);
  sec.__a02redraw=redraw3;
},
onEnter(){
  const sec=document.querySelector('.step[data-s="2"]');
  if(sec&&sec.__a02redraw)requestAnimationFrame(sec.__a02redraw);
},
hint(S){
  const jobs=S.answers.jobs||{};
  const c={};TASK.forEach(t=>c[t.k]=0);
  OBJ.forEach(o=>((jobs[o.k]||[])).forEach(t=>{if(c[t]!==undefined)c[t]++;}));
  const miss=TASK.filter(t=>c[t.k]<2);
  if(miss.length)return '还差：'+miss.map(t=>t.n).join('、')+' 各需要 2 件东西';
  if(!OBJ.some(o=>(jobs[o.k]||[]).length>=2))return '让同一件东西，连上第二个任务';
  return '';
},
gate(S){
  const jobs=S.answers.jobs||{};
  const c={};TASK.forEach(t=>c[t.k]=0);
  OBJ.forEach(o=>((jobs[o.k]||[])).forEach(t=>{if(c[t]!==undefined)c[t]++;}));
  return TASK.every(t=>c[t.k]>=2)&&OBJ.some(o=>(jobs[o.k]||[]).length>=2);
}},

/* ---------- 4 在你的事上 ---------- */
{id:'mine',name:'在你的事上',short:'在你的事',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h a02-mine-h"><h1>在你的<em>麻烦</em>上，找第二份工作</h1>
<p>不用想大创新。写一件你每天都要重复做、又很烦的小事。然后只从桌上现有的东西里找——<b>先不添新的</b>。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>写下小麻烦</span>
  <span class="op"><span class="op-n">2</span>选两样桌上的东西</span>
  <span class="op"><span class="op-n">3</span>写一句「用 X 做 Y」</span>
</div>
<div class="a02-mine">
<div class="panel">
  <div class="panel-h"><h4>① 每天重复的小麻烦</h4><span>至少 8 个字</span></div>
  <div class="field"><input id="a02Trouble" maxlength="40" placeholder="例如：每天回桌第一件事是翻包找充电线"></div>
  <div class="row" style="margin-top:6px"><span class="small" id="a02TrLen">0 / 40</span><div style="flex:1"></div><span class="small">越具体越好：什么时候、在哪儿、要花多久</span></div>
</div>
<div class="panel" style="margin-top:12px">
  <div class="panel-h"><h4>② 你桌上现在就有的 5 样东西</h4><span>选两样</span></div>
  <div class="a02-desk" id="a02Desk">${DESK.map(d=>'<button class="chip" data-desk="'+d.k+'">'+d.n+'</button>').join('')}</div>
  <div class="a02-jobline" id="a02JobLine">选两样，先看它们现在在干什么。</div>
</div>
<div class="panel" style="margin-top:12px">
  <div class="panel-h"><h4>③ 用 X 做 Y</h4><span>至少 12 个字</span></div>
  <div class="field"><textarea id="a02Use" maxlength="80" placeholder="例如：用便利贴把充电线头裹住并写上「手机」，用水杯压住线，晚上回桌不用再翻包"></textarea></div>
  <div class="row" style="margin-top:8px"><span class="small" id="a02UseLen">0 / 80</span><div style="flex:1"></div><button class="btn sm" id="a02Ask">让 AI 追问我</button></div>
  <div class="grid3" id="a02Checks" style="margin-top:10px">
    <div class="chk" data-c="both"><i>○</i><b>两样都在句子里</b><span>不用“它”“那个”代指</span></div>
    <div class="chk" data-c="act"><i>○</i><b>写清了拿它做什么</b><span>一个动作，不是“利用一下”</span></div>
    <div class="chk" data-c="new"><i>○</i><b>没有添新东西</b><span>只用手边这两样</span></div>
  </div>
</div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  if(!Array.isArray(a.desk))a.desk=[];
  if(typeof a.trouble!=='string')a.trouble='';
  if(typeof a.use!=='string')a.use='';
  const tr=sec.querySelector('#a02Trouble'),use=sec.querySelector('#a02Use'),
        trLen=sec.querySelector('#a02TrLen'),useLen=sec.querySelector('#a02UseLen'),
        jobLine=sec.querySelector('#a02JobLine'),checks=sec.querySelector('#a02Checks');
  const twoNames=()=>a.desk.map(k=>DESKN[k]).filter(Boolean);
  function check(){
    const t=a.use||'',names=twoNames();
    const c1=names.length===2&&names.every(n=>t.indexOf(n)>=0);
    const c2=/用|拿|把|借|折|卷|夹|贴|压|倒|拆|绑|卡|垫|撑|挡|裹|塞|立/.test(t);
    const c3=t.length>0&&!/买一个|买新的|买新|淘宝|京东|下单|采购/.test(t);
    [['both',c1],['act',c2],['new',c3]].forEach(([k,on])=>{
      const el=checks.querySelector('[data-c="'+k+'"]');
      if(!el)return;el.classList.toggle('on',on);el.querySelector('i').textContent=on?'✓':'○';
    });
    return {c1,c2,c3};
  }
  function paint(full){
    if(full){
      if(document.activeElement!==tr)tr.value=a.trouble||'';
      if(document.activeElement!==use)use.value=a.use||'';
    }
    sec.querySelectorAll('[data-desk]').forEach(b=>b.classList.toggle('on',a.desk.indexOf(b.dataset.desk)>=0));
    trLen.textContent=(a.trouble||'').length+' / 40';
    useLen.textContent=(a.use||'').length+' / 80';
    const names=twoNames();
    if(names.length===2){
      const jobs=names.map(n=>{const d=DESK.find(x=>x.n===n);return '<b>'+n+'</b>现在在干什么：'+(d?d.job:'')+'。';});
      jobLine.innerHTML=jobs.join('　');
    }else{
      jobLine.textContent=names.length===1?'再选一样。只选两样。':'选两样，先看它们现在在干什么。';
    }
    check();
  }
  tr.addEventListener('input',()=>{a.trouble=tr.value;api.save();paint(false);api.refresh();});
  use.addEventListener('input',()=>{a.use=use.value;api.save();paint(false);api.refresh();});
  sec.querySelectorAll('[data-desk]').forEach(b=>b.onclick=()=>{
    const k=b.dataset.desk,i=a.desk.indexOf(k);
    if(i>=0)a.desk.splice(i,1);
    else if(a.desk.length<2)a.desk.push(k);
    else{a.desk[0]=a.desk[1];a.desk[1]=k;}
    api.save();paint(false);api.refresh();
  });
  sec.querySelector('#a02Ask').onclick=()=>{
    document.querySelector('.side-tab[data-tab="ask"]').click();
    api.ai('so_what','我每天的小麻烦：'+(a.trouble||'还没写')+'。我选的两样东西：'+twoNames().join('、')+'。我的一句话：'+(a.use||'还没写'));
  };
  paint(true);
},
hint(S){
  const a=S.answers;
  if((a.trouble||'').length<8)return '先写一件每天重复的小麻烦（至少 8 个字）';
  if((a.desk||[]).length!==2)return '从桌上 5 样东西里选两样';
  if((a.use||'').length<12)return '写一句至少 12 个字的「用 X 做 Y」';
  const names=a.desk.map(k=>DESKN[k]).filter(Boolean);
  if(!names.every(n=>(a.use||'').indexOf(n)>=0))return '两样东西都要出现在句子里';
  return '';
},
gate(S){
  const a=S.answers;
  if((a.trouble||'').length<8)return false;
  if((a.desk||[]).length!==2)return false;
  if((a.use||'').length<12)return false;
  const names=a.desk.map(k=>DESKN[k]).filter(Boolean);
  return names.length===2&&names.every(n=>(a.use||'').indexOf(n)>=0);
}},

/* ---------- 5 过滤与提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 过滤与提交',
html:`
<div class="step-h a02-submit-h"><h1>两个判断，<em>然后交卡</em></h1>
<p>这一节不评点子好坏。只看两件事：<b>你看清了它现在在干什么</b>；<b>你没让它原来的活没人干</b>。</p></div>
<div class="grid2" style="align-items:start">
  <div id="a02CardSlot"></div>
  <div class="stack a02-submit-panels" style="gap:10px">
    <div class="panel a02-mini">
      <div class="panel-h"><h4>① 它现在本来在干什么？</h4><span>二选一</span></div>
      <div class="opts">
        <button class="opt" data-q1="a"><span class="k">A</span><span><b>它一直在干这件事</b><span>我没把它当别的用过</span></span></button>
        <button class="opt" data-q1="b"><span class="k">B</span><span><b>它干的这件事，正好是我要借的</b><span>借的是它的重量、形状或位置</span></span></button>
      </div>
    </div>
    <div class="panel a02-mini">
      <div class="panel-h"><h4>② 用了它，会影响它原来的活吗？</h4><span>二选一</span></div>
      <div class="opts">
        <button class="opt" data-q2="a"><span class="k">A</span><span><b>不影响，原来的活照干</b><span>只是多了一个用途</span></span></button>
        <button class="opt" data-q2="b"><span class="k">B</span><span><b>会影响，我会先给它找个替代</b><span>第一步里要写清谁接</span></span></button>
      </div>
    </div>
    <div class="panel a02-first">
      <div class="panel-h"><h4>③ 明天就能试的一步</h4><span>至少 6 个字</span></div>
      <div class="field"><textarea id="a02First" maxlength="60" placeholder="例如：今晚把便利贴贴在充电线头上，写上「手机」" style="min-height:52px"></textarea></div>
      <div class="row" style="margin-top:7px"><span class="small" id="a02FirstLen">0 / 60</span><div style="flex:1"></div><span class="small" id="a02SubSt">未提交</span></div>
      <div id="a02Warn"></div>
      <div class="row" style="margin-top:9px">
        <button class="btn primary" id="a02SubBtn">提交到班级</button>
        <button class="btn" id="a02Export">导出 PNG</button>
        <div style="flex:1"></div>
      </div>
      <div class="hint" style="margin-top:7px">未登录：只存本机，不进互评池。</div>
    </div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const slot=sec.querySelector('#a02CardSlot'),first=sec.querySelector('#a02First'),
        firstLen=sec.querySelector('#a02FirstLen'),st=sec.querySelector('#a02SubSt'),
        btn=sec.querySelector('#a02SubBtn'),warn=sec.querySelector('#a02Warn');
  if(typeof a.first!=='string')a.first='';
  function rows(){
    return [
      ['麻烦',a.trouble||'—'],
      ['两样东西',(a.desk||[]).map(k=>DESKN[k]).filter(Boolean).join(' + ')||'—'],
      ['一句话',a.use||'—'],
      ['原活',(Q1.find(x=>x.k===a.q1)||{}).s||'—'],
      ['影响',(Q2.find(x=>x.k===a.q2)||{}).s||'—'],
      ['明天第一步',a.first||'—']
    ];
  }
  function paint(full){
    if(full&&document.activeElement!==first)first.value=a.first||'';
    firstLen.textContent=(a.first||'').length+' / 60';
    sec.querySelectorAll('[data-q1]').forEach(b=>b.classList.toggle('on',a.q1===b.dataset.q1));
    sec.querySelectorAll('[data-q2]').forEach(b=>b.classList.toggle('on',a.q2===b.dataset.q2));
    slot.innerHTML='<div class="outcard a02-card"><div class="oh"><span>DELIVERABLE · A02</span><span>判断卡</span></div>'+
      '<h5>我的第二份工作卡</h5><div class="kv">'+rows().map(r=>'<div><b>'+api.esc(r[0])+'</b><span class="'+(r[1]!=='—'?'fill':'')+'">'+api.esc(r[1])+'</span></div>').join('')+'</div></div>';
    const ready=!!(a.q1&&a.q2&&(a.first||'').length>=6);
    st.textContent=S.submitted?'已提交':'未提交';
    btn.textContent=S.submitted?'已提交，去看班级':(ready?'提交到班级':'先补完两个判断');
    btn.disabled=!!S.submitted||!ready;
    warn.innerHTML=(a.q2==='b'&&(a.first||'').length>=2)
      ?'<p class="a02-boundary" style="margin-top:6px"><b>你选了“会影响”。</b>第一步里要有一句：原来的活谁来接。</p>':'';
  }
  sec.querySelectorAll('[data-q1]').forEach(b=>b.onclick=()=>{a.q1=b.dataset.q1;api.save();paint(false);api.refresh();});
  sec.querySelectorAll('[data-q2]').forEach(b=>b.onclick=()=>{a.q2=b.dataset.q2;api.save();paint(false);api.refresh();});
  first.addEventListener('input',()=>{a.first=first.value;api.save();paint(false);api.refresh();});
  btn.onclick=async()=>{
    if(!(a.q1&&a.q2&&(a.first||'').length>=6)){api.toast('先把两个判断和明天第一步补完');return;}
    await api.submit();paint(false);
  };
  sec.querySelector('#a02Export').onclick=()=>api.exportCard();
  paint(true);
  paint5=()=>paint(true);
},
onEnter(){if(paint5)paint5();},
hint(S){
  const a=S.answers;
  if(!a.q1)return '先回答：它现在本来在干什么';
  if(!a.q2)return '再回答：会不会影响它原来的活';
  if((a.first||'').length<6)return '写一句明天就能试的一步';
  return '';
},
gate(S){
  const a=S.answers;
  return !!(a.q1&&a.q2&&(a.first||'').length>=6);
}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>带走<em>三句话</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 固着在物品上</div><p class="small" style="margin-top:5px">不是你想不出，是它现在的工作太显眼。先问一句：<b>它还能干什么？</b></p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 第二份工作</div><p class="small" style="margin-top:5px">先看现在在干什么，再找第二份，最后确认原来的活有人接。三步缺一不可。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 先用手边的</div><p class="small" style="margin-top:5px">盒内思考不是清心寡欲，是先把搜索范围缩小到手边。新资源会掩盖真问题。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A03</span></div>
<p class="small">A03 · 结构性固着：画三个圆。下一节不看物品，看结构。三个圆、九个点：难的不是画，是你一开始就认定它们该怎么摆。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="a02Again">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#a02Again').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '如果图钉盒本来就是空的，你还会想到它吗？',
 '你桌上哪件东西，已经三年只干一件事？',
 '你要它干的第二件事，会不会让它原来的活没人干？',
 '你说“没有资源”时，真的数过手边有几样东西吗？',
 '如果你的办法要买新东西才成立，它还算是解决办法吗？'
]},

card(S){
  const a=S.answers||{};
  return {title:'A02 · 我的第二份工作卡',rows:[
    ['麻烦',a.trouble||'—'],
    ['两样东西',(a.desk||[]).map(k=>DESKN[k]).filter(Boolean).join(' + ')||'—'],
    ['一句话',a.use||'—'],
    ['原活',(Q1.find(x=>x.k===a.q1)||{}).s||'—'],
    ['影响',(Q2.find(x=>x.k===a.q2)||{}).s||'—'],
    ['明天第一步',a.first||'—']
  ]};
},

notes:[
 {t:'本节目标',h:'让学员承认：不是想不出办法，是看见的用途太少。能说出“它现在在干什么”，才可能说出“它还能干什么”。'},
 {t:'时间分配',h:'先猜 6′ · 概念 6′ · 工作台 12′ · 在你的事 10′ · 两个判断与提交 8′ · 收束 3′。工作台至少留 8 分钟让人真连，不要只讲答案。'},
 {t:'常见卡点',h:'学员会说“这个实验我看过”。让他现场连 8 件物品：看过答案，不等于手上有第二个用途。另一种卡点是只连“合理”的，不敢连“有点怪”的——先让他连上，再判断。'},
 {t:'直播怎么接',h:'看后台提交：两问里选“会影响”的有多少、明天第一步里有多少是“买一个新东西”。挑 2 张卡现场追问：它现在在干什么？原来的活谁接？把这两问答清楚，比点评点子有用。'},
 {t:'现场道具',h:'带一支蜡烛、一盒图钉、一盒火柴。先真做一次再放图。做不出来，比讲得出来更有说服力。点蜡烛前确认场地许可，必要时用电子烛。'}
]};

let paint5=null;

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A02']=L;
})();
