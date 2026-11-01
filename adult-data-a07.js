/* A07 · 盒内思考：把组件变成资源 */
(function(){
'use strict';

const IMG={components:'assets-cases-a07-components.jpg'};

/* ---------- 四个维度 ---------- */
const DIMS=[
 {k:'thing', n:'物',  sub:'设备 · 材料 · 库存', q:'它有多重／多快／多空／还能动吗'},
 {k:'people',n:'人',  sub:'同事 · 客户 · 供应商', q:'谁知道／谁能签／谁每天路过'},
 {k:'info',  n:'信息',sub:'单据 · 记录 · 群消息', q:'哪条信息已经存在、但没人读'},
 {k:'place', n:'场地',sub:'房间 · 通道 · 时段', q:'哪个位置、哪个时段是空的'}
];
const DIMN=DIMS.reduce((m,d)=>(m[d.k]=d.n,m),{});
const SUG={
 thing:['前台的旧打印机','仓库的推车','客户退回的样机','角落里闲置的显示器'],
 people:['每周来送水的师傅','值班保安','最常接售后电话的同事','已经离职但还联系的旧同事'],
 info:['工单系统里的备注','客户群里的聊天记录','每月的退货单','巡检表上没人看的空格'],
 place:['下午空着的会议室','走廊尽头那面墙','大楼门口的雨棚','仓库靠门的空地']
};

/* ---------- 任务 ---------- */
const TASKS=[
 {k:'t1',n:'让新人第一周就知道该找谁',need:'他得知道「这件事归谁」'},
 {k:'t2',n:'让一件拖了很久的事有人接',need:'得有人先动第一下'},
 {k:'t3',n:'让等待的时间不显得长',need:'等的人手上要有事'}
];

/* ---------- 先猜 ---------- */
const HOOK=[
 {k:'a',n:'装一台 X 光机，照出没装肥皂的盒子',s:'查得出来，但要人看片、要停机改造'},
 {k:'b',n:'在传送带上加一台秤，重量不对就报警',s:'准，但产线要停线、要接线'},
 {k:'c',n:'在传送带旁边放一台风扇，对着盒子吹',s:'听起来最不像个办法'},
 {k:'d',n:'加一道人工检查，两个人轮班看',s:'明天就能上，成本是两个人力'}
];
const REASON=[
 {k:'a',s:'因为它最便宜',fb:'便宜是结果，不是原因。同样便宜的办法还有「让人盯着」，但它要占两个人的班。风扇之所以成立，是因为它用上了重量差——这个差别本来就在盒子里。'},
 {k:'b',s:'因为它借的东西本来就在盒子里：重量',fb:'对。<b>空盒和满盒的差别，一直在盒子里</b>：重量。风扇没有增加任何检测环节，它把「判断」换成了「物理结果」——风只吹得动空盒。检测要多一个人、多一道工序；吹，只要一度电。'},
 {k:'c',s:'因为它比 X 光机更准',fb:'不准确。风扇分不出「装了半块肥皂」的盒子，它只分得出轻重。它解决的不是全部漏装，是「完全空盒」这一种。这也是盒内思考的老实话：手边的资源都有边界。'}
];

const SOL=`<svg viewBox="0 0 340 186" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">
<path d="M10 170h320" opacity=".2"/>
<rect x="20" y="104" width="220" height="9" rx="4.5"/>
<circle cx="38" cy="126" r="9"/><circle cx="222" cy="126" r="9"/>
<path d="M38 135v33M222 135v33" opacity=".26"/>
<path d="M58 113l5 7M98 113l5 7M138 113l5 7M178 113l5 7" opacity=".15"/>
<rect x="52" y="74" width="32" height="30" rx="2"/>
<path d="M52 84h32" opacity=".42"/>
<rect x="104" y="74" width="32" height="30" rx="2"/>
<path d="M104 84h32" opacity=".42"/>
<g transform="rotate(-24 188 44)">
 <rect x="172" y="28" width="32" height="30" rx="2" stroke-dasharray="4 3"/>
 <path d="M172 38h32" opacity=".25"/>
</g>
<path d="M214 74C206 34 180 22 170 44" stroke-dasharray="2 5" opacity=".45"/>
<path d="M170 52C158 82 152 122 148 152" stroke-dasharray="2 5" opacity=".45"/>
<circle cx="292" cy="96" r="27"/>
<path d="M292 96c-2-11 7-17 13-11s-1 12-13 11z" fill="currentColor" fill-opacity=".14"/>
<path d="M292 96c9 6 7 16 0 17s-11-7 0-17z" fill="currentColor" fill-opacity=".14"/>
<path d="M292 96c-11 4-17-4-14-11s13-2 14 11z" fill="currentColor" fill-opacity=".14"/>
<circle cx="292" cy="96" r="2.6" fill="currentColor" stroke="none"/>
<path d="M292 123v36M277 159h30" opacity=".28"/>
<path d="M263 86c-12-5-22-8-32-11" stroke-dasharray="4 4" opacity=".55"/>
<path d="M264 96c-13-1-23-3-33-5" stroke-dasharray="4 4" opacity=".35"/>
<path d="M263 106c-12 3-21 4-31 3" stroke-dasharray="4 4" opacity=".24"/>
<path d="M118 156h48l-6 30h-36z"/>
<path d="M116 156h52" opacity=".5"/>
<path d="M132 162l-3 20M146 162l-2 20M159 162l1 20" opacity=".16"/>
</svg>`;

/* ---------- 二选一（概念） ---------- */
const C2=[
 {k:'a',s:'我们有一台打印机。',t:'只有名词，没有属性'},
 {k:'b',s:'那台打印机每天空转 6 小时，就在门口。',t:'说的是「有什么」，不是「是什么」'}
];

/* ---------- 过滤两问 ---------- */
const Q1=[
 {k:'a',s:'是盒内。清单里本来就有，没为它花钱、没为它加人。'},
 {k:'b',s:'不完全是。我其实添了一样东西。'}
];
const Q2=[
 {k:'a',s:'不影响。原来的活照干，只是多借了一个属性。'},
 {k:'b',s:'会影响。替代解里已经写了原来那件活谁接。'}
];

/* ---------- 纯文本工具函数 ---------- */
const sentOf=u=>'用「'+(u.rn||'')+'」的「'+(u.attr||'')+'」，解决「'+(u.tn||'')+'」';
const sentLen=u=>sentOf(u).length;
const sentHTML=(u,api)=>'用<b>「'+api.esc(u.rn)+'」</b>的<b>「'+api.esc(u.attr||'……')+'」</b>，解决<b>「'+api.esc(u.tn)+'」</b>';
const boxCount=(box,d)=>box.filter(x=>x.dim===d).length;

const L={
id:'A07',week:2,seq:7,title:'盒内思考：把组件变成资源',
kicker:'WEEK 2 · 盒内思考',tool:'mind',toolName:'盒内思考',minutes:45,
steps:[
/* ================= 1 先猜 ================= */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>不买设备，<em>怎么堵住空盒</em></h1>
<p>肥皂厂的包装线偶尔漏装：盒子封了口，里面没有肥皂，一箱一箱发出去，客户拆开才发现。厂长只加了一条限制：<b>不许买新设备</b>。会上提了四个方案。</p></div>
<div class="a07-hook">
  <div class="a07-hook-l">
    <figure class="a07-fig">
      <div class="a07-svg">${SOL}</div>
      <figcaption><b>包装线：盒子过传送带，风扇站在末端</b><span>空盒轻，满盒重。差别一直在，只是没人用它。</span><em>图：本课绘制（示意）</em></figcaption>
    </figure>
    <div id="a07HookOut"></div>
  </div>
  <div class="a07-pick">
    <div class="a07-ask"><span>先别算成本</span><p>如果是你，<b>会选哪一个？</b></p></div>
    <div class="opts">
      ${HOOK.map(o=>'<button class="opt" data-h="'+o.k+'"><span class="k">'+o.k.toUpperCase()+'</span><span><b>'+o.n+'</b><span>'+o.s+'</span></span></button>').join('')}
    </div>
    <div id="a07ReasonOut"></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#a07HookOut'),rout=sec.querySelector('#a07ReasonOut');
  function paint(){
    const v=S.answers.hook,r=S.answers.reason;
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',v===b.dataset.h));
    if(!v){out.innerHTML='';rout.innerHTML='';return;}
    const ok=v==='c';
    out.innerHTML='<div class="a07-reveal '+(ok?'ok':'warn')+'">'+
      '<div class="a07-reveal-h"><span>'+(ok?'你选对了':'再看一眼')+'</span><span>C · 一台风扇</span></div>'+
      '<p><b>一台风扇，对着传送带吹。装了肥皂的盒子重，纹丝不动；空盒轻，被吹下传送带。</b>地上放个筐接着。成本：一台风扇，一个下午。</p>'+
      '<p>'+(ok
        ? '你没有停在「检测」这个词上。四个方案里，只有 C 没有增加一道工序。'
        : 'A、B、D 都在「加一道检测」：加设备、加工序、加两个人。它们不是错，是贵，而且慢——一条产线上，多一个环节就多一次停线。')+'</p>'+
      '<p class="a07-note">这则案例的版本很多，数字也对不上。看它动手的位置就够了：<b>不在「买什么」，在「已经有什么」。</b></p>'+
      '</div>';
    rout.innerHTML='<div class="a07-follow">'+
      '<p class="a07-q">追问：为什么最「土」的办法最有效？</p>'+
      '<div class="a07-reason">'+REASON.map(x=>'<button class="opt a07-r'+(r===x.k?' on':'')+'" data-r="'+x.k+'"><span class="k">'+x.k.toUpperCase()+'</span><span><b>'+x.s+'</b></span></button>').join('')+'</div>'+
      (r?'<p class="a07-fb">'+REASON.filter(x=>x.k===r)[0].fb+'</p>':'')+
      '</div>';
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{
    S.answers.hook=b.dataset.h;api.save();paint();api.refresh();
  });
  rout.addEventListener('click',e=>{
    const b=e.target.closest('[data-r]');if(!b)return;
    S.answers.reason=b.dataset.r;api.save();paint();api.refresh();
  });
  paint();
},
hint(S){
  if(!S.answers.hook)return '先选一个：如果是你，会选哪个方案';
  if(!S.answers.reason)return '再回答追问：为什么最「土」的办法最有效';
  return '';
},
gate(S){return !!(S.answers.hook&&S.answers.reason);}},

/* ================= 2 概念 ================= */
{id:'concept',name:'概念',short:'概念',kicker:'STEP 2 · 概念',
html:`
<div class="step-h"><h1>同一个东西，<em>换个说法就是资源</em></h1>
<p>官方讲义第 93 页只有一句标题：<b>列出你盒子里的资源</b>。配图是一辆车，被拆成几千个零件。</p></div>
<div class="a07-concepts">
  <div class="panel a07-def">
    <div class="panel-h"><h4>组件 → 资源</h4><span>Component → Resource</span></div>
    <div class="a07-two">
      <div><b>组件</b><p>系统里已经存在的一个部件。名词。数得出来：几台设备、几个人、哪几张表。</p></div>
      <div><b>资源</b><p>这个部件能提供的某种属性。同一个部件，说出来的是「它有什么」，不是「它是什么」。</p></div>
    </div>
    <div class="a07-swap">
      <div class="a07-swap-l">「我们有 <b>前台那台旧打印机</b>」</div>
      <div class="a07-swap-a">↓ 换一个说法</div>
      <div class="a07-swap-r">「它<b>每天空转 6 小时</b>，而且<b>就在门口</b>」</div>
    </div>
  </div>
  <figure class="a07-photo">
    <button class="case-zoom" data-zoom="components" title="看大图">⤢</button>
    <img src="${IMG.components}" alt="一辆汽车被拆成几千个零件，平铺在白底上" loading="lazy">
    <figcaption><b>列出你盒子里的资源</b><span>零件是组件；能拿来说事的，是它身上的属性。</span>
      <em>图：SIT 官方课程材料（已授权）　Day1 p.93</em></figcaption>
  </figure>
</div>
<div class="a07-bottom">
  <div class="panel">
    <div class="panel-h"><h4>清单的四个维度</h4><span>每一维问一句，问的是属性</span></div>
    <div class="a07-table">
      ${DIMS.map(d=>'<div class="a07-tr"><b>'+d.n+'</b><span class="a07-ex">'+d.sub+'</span><span class="a07-q">'+d.q+'</span></div>').join('')}
    </div>
    <p class="a07-boundary"><b>什么时候别用：</b>安全、承重、绝缘、医疗、食品接触、法务合规——这六类不拿「手边的」去替代。缺关键能力时，硬凑比采购贵。<b>盒内思考是搜索的顺序，不是信仰。</b></p>
  </div>
  <div class="panel a07-choice">
    <div class="panel-h"><h4>哪一句，已经把组件说成了资源？</h4><span>二选一</span></div>
    <div class="opts a07-c2">
      ${C2.map(o=>'<button class="opt" data-c2="'+o.k+'"><span class="k">'+o.k.toUpperCase()+'</span><span><b>'+o.s+'</b><span>'+o.t+'</span></span></button>').join('')}
    </div>
    <div id="a07C2Out" style="margin-top:9px"></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#a07C2Out');
  function paint(){
    const v=S.answers.concept;
    sec.querySelectorAll('[data-c2]').forEach(b=>b.classList.toggle('on',v===b.dataset.c2));
    out.innerHTML=v?'<div class="a07-reveal '+(v==='b'?'ok':'warn')+'">'+
      '<div class="a07-reveal-h"><span>'+(v==='b'?'对':'还差一步')+'</span><span>组件 / 资源</span></div>'+
      '<p>'+(v==='b'
        ? 'B 把名词换成了属性：空转时间、位置。A 只是清单，还不知道要借它什么。'
        : 'A 是组件清单，还不能用在句子里。补成「空转 6 小时」，它才是资源。')+'</p></div>':'';
  }
  sec.querySelectorAll('[data-c2]').forEach(b=>b.onclick=()=>{
    S.answers.concept=b.dataset.c2;api.save();paint();api.refresh();
  });
  sec.querySelectorAll('[data-zoom]').forEach(b=>b.onclick=e=>{
    e.stopPropagation();
    api.modal('<button class="modal-x">×</button><h3>列出你盒子里的资源</h3>'+
      '<img src="'+IMG.components+'" style="width:100%;border-radius:8px;margin:8px 0 12px" alt="汽车零件平铺">'+
      '<p>把系统拆到零件级，逐个问：它还能提供什么？清单的长度，决定后面能组合出多少可能。</p>'+
      '<p class="small">图：SIT 官方课程材料（已授权）　Day1 p.93</p>');
  });
  paint();
},
hint(S){return S.answers.concept?'':'选一句：哪句已经把组件说成了资源';},
gate(S){return !!S.answers.concept;}},

/* ================= 3 工作台 ================= */
{id:'bench',name:'工作台',short:'工作台',kicker:'STEP 3 · 清单 → 转化',
html:`
<div class="step-h"><h1>把你的盒子<em>倒出来</em></h1>
<p>先列清单，再谈方案。清单不到 12 项，右边的任务不解锁——这不是为难你，是让你先把「我有什么」数清楚。三个任务，各收一条。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>四个维度各添几项，凑够 12</span>
  <span class="op"><span class="op-n">2</span>拖一项资源到任务上</span>
  <span class="op"><span class="op-n">3</span>写清它提供的是哪个属性</span>
  <span class="op"><span class="op-n">4</span>每项资源只能用一次</span>
</div>
<div class="bench a07-bench">
  <div class="bench-h"><b>BENCH · 盒内清单 → 资源转化</b><span class="st" id="a07St">0 / 12 项 · 0 / 3 组合</span></div>
  <div class="bench-b a07-bench-b">
    <div class="a07-box">
      <div class="a07-box-h"><h4>① 你的盒子</h4><span id="a07BoxN">0 项</span></div>
      <div class="a07-dims" id="a07Dims"></div>
      <div class="a07-sugs" id="a07Sugs"></div>
      <div class="a07-add">
        <input id="a07AddIn" maxlength="18" placeholder="再加一项：它在你这儿叫什么" autocomplete="off">
        <select id="a07AddDim" title="放到哪一维">${DIMS.map(d=>'<option value="'+d.k+'">'+d.n+'</option>').join('')}</select>
        <button class="btn sm" id="a07AddBtn">加入</button>
      </div>
    </div>
    <div class="a07-tasks">
      <div class="a07-tasks-h"><h4>② 拖到任务上</h4><span id="a07Tip">清单满 12 项后解锁</span></div>
      <div id="a07TaskList"></div>
    </div>
  </div>
  <div class="bench-f"><span class="small">一个任务只收一条。<b>每项资源也只能用一次</b>，用掉就置灰；点「撤回」，资源和任务位一起还给你。</span><div style="flex:1"></div><button class="btn sm ghost" id="a07Reset">清空重来</button></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  if(!Array.isArray(a.box))a.box=[];
  if(!Array.isArray(a.uses))a.uses=[];
  if(!a.draft||typeof a.draft!=='object')a.draft=null;
  if(typeof a.seq!=='number')a.seq=0;
  if(typeof a.cseq!=='number')a.cseq=a.uses.length;

  const dims=sec.querySelector('#a07Dims'),sugs=sec.querySelector('#a07Sugs'),list=sec.querySelector('#a07TaskList'),
        st=sec.querySelector('#a07St'),tip=sec.querySelector('#a07Tip'),
        boxN=sec.querySelector('#a07BoxN'),
        addIn=sec.querySelector('#a07AddIn'),addDim=sec.querySelector('#a07AddDim'),
        resetBtn=sec.querySelector('#a07Reset');
  let sel=null,resetArm=0;

  const has=n=>a.box.some(x=>x.n===n);
  const usedBy=id=>a.uses.filter(u=>u.rid===id)[0];
  const taskOf=k=>TASKS.filter(t=>t.k===k)[0];

  function composerHTML(d){
    const len=(d.attr||'').length;
    return '<div class="a07-compose">'+
      '<div class="a07-compose-l"><span>用</span><b>'+api.esc(d.rn)+'</b><span>的</span>'+
      '<input class="a07-attr" maxlength="14" placeholder="属性：空转时间／位置" value="'+api.esc(d.attr||'')+'">'+
      '<span>，解决</span><b>'+api.esc(d.tn)+'</b></div>'+
      '<div class="a07-sent">'+sentHTML({rn:d.rn,tn:d.tn,attr:d.attr},api)+'</div>'+
      '<div class="a07-cf"><span class="small a07-len">'+(len?'共 '+sentLen({rn:d.rn,tn:d.tn,attr:d.attr})+' 字（至少 12）':'先写属性，两个字以上')+'</span>'+
      '<div style="flex:1"></div><button class="btn sm ghost" data-cancel>取消</button><button class="btn sm primary" data-keep>记下这条</button></div>'+
      '</div>';
  }

  function paint(){
    dims.innerHTML=DIMS.map(d=>{
      const items=a.box.filter(x=>x.dim===d.k);
      return '<div class="a07-dim" data-dim="'+d.k+'">'+
        '<div class="a07-dim-h"><b>'+d.n+'</b><span>'+d.sub+'</span><em>'+items.length+'</em></div>'+
        '<div class="a07-items">'+(items.length?items.map(x=>{
          const u=usedBy(x.id);
          return '<div class="a07-item'+(sel===x.id?' sel':'')+(u?' used':'')+'" data-rid="'+x.id+'" title="'+(u?'已用：「'+api.esc(u.tn)+'」':'拖到右边的任务上')+'">'+
            '<span class="a07-item-n">'+api.esc(x.n)+'</span>'+
            (u?'<span class="a07-used">已用</span>':'<button class="a07-del" data-del="'+x.id+'" title="删掉">×</button>')+
            '</div>';
        }).join(''):'<div class="a07-empty">还没有</div>')+'</div>'+
        '</div>';
    }).join('');

    sugs.innerHTML='<span class="a07-sugs-h">常见项，点一下加入（不够就自己写）</span>'+
      DIMS.map(d=>SUG[d.k].slice(0,2).map(n=>'<button class="a07-sug'+(has(n)?' on':'')+'" data-sug="'+d.k+'|'+api.esc(n)+'" title="'+api.esc(n)+'"><i>'+d.n+'</i><span>'+api.esc(n)+'</span></button>').join('')).join('');

    list.innerHTML=TASKS.map((t,i)=>{
      const us=a.uses.filter(u=>u.tk===t.k)[0];
      const drafting=a.draft&&a.draft.tk===t.k;
      return '<div class="a07-task'+(drafting?' on':'')+(us?' done':'')+'" data-task="'+t.k+'">'+
        '<div class="a07-task-h"><span class="a07-task-k">T'+(i+1)+'</span><b>'+t.n+'</b></div>'+
        '<div class="a07-task-need">要的是：'+t.need+'</div>'+
        (drafting?composerHTML(a.draft)
          :(us?'<div class="a07-uses"><div class="a07-use"><p>'+sentHTML(us,api)+'</p><button class="a07-back" data-back="'+us.id+'">撤回</button></div></div>'
             :'<div class="a07-slot'+(a.uses.length>=3||a.box.length<12?' full':'')+'">'+(a.box.length<12?'清单满 12 项后解锁':'拖一项资源到这个任务上，或先点左边一项再点这里')+'</div>'))+
        '</div>';
    }).join('');

    boxN.textContent=a.box.length+' 项';
    st.textContent=a.box.length+' / 12 项 · '+a.uses.length+' / 3 组合';
    tip.textContent=a.box.length<12?('还差 '+(12-a.box.length)+' 项')
      :(a.uses.length>=TASKS.length?'三个任务都满了':('还差 '+(TASKS.length-a.uses.length)+' 个任务'));
    api.refresh();
  }

  function add(n,k){
    n=(n||'').replace(/\s+/g,' ').trim();
    if(!n){api.toast('先写一项');return;}
    if(n.length>18){api.toast('一项写 18 个字以内');return;}
    if(has(n)){api.toast('清单里已经有了');return;}
    a.seq++;a.box.push({id:'r'+a.seq,n:n,dim:k||'thing'});api.save();paint();
  }
  function del(id){
    if(usedBy(id)){api.toast('这项已经用掉了。先撤回那条组合。');return;}
    if(a.draft&&a.draft.rid===id){api.toast('这项正在组合里，先取消那条。');return;}
    a.box=a.box.filter(x=>x.id!==id);
    if(sel===id)sel=null;
    api.save();paint();
  }
  function openCompose(rid,tk){
    const it=a.box.filter(x=>x.id===rid)[0];if(!it)return;
    if(usedBy(rid)){api.toast('这项已经用掉了。先撤回那条组合。');return;}
    if(a.box.length<12){api.toast('先把清单列到 12 项');return;}
    if(a.uses.filter(u=>u.tk===tk)[0]){api.toast('这个任务已经有一条了。先撤回它，再换。');return;}
    if(a.uses.length>=TASKS.length){api.toast('三个任务都满了。撤回一条，才能换。');return;}
    const t=taskOf(tk);if(!t)return;
    a.draft={rid:rid,rn:it.n,tk:tk,tn:t.n,attr:''};
    sel=null;api.save();paint();
    const inp=list.querySelector('.a07-attr');if(inp)inp.focus();
  }
  function keep(){
    const d=a.draft;if(!d)return;
    const attr=(d.attr||'').trim();
    if(attr.length<2){api.toast('先写它提供的是哪个属性（两个字以上）');const i=list.querySelector('.a07-attr');if(i)i.focus();return;}
    if(usedBy(d.rid)){api.toast('这项已经被用掉了');a.draft=null;paint();return;}
    a.cseq++;
    a.uses.push({id:'c'+a.cseq,rid:d.rid,rn:d.rn,tk:d.tk,tn:d.tn,attr:attr});
    a.draft=null;api.save();paint();
    api.toast('第 '+a.uses.length+' 条记下了');
  }
  function withdraw(id){
    a.uses=a.uses.filter(u=>u.id!==id);api.save();paint();
    api.toast('已撤回，这项资源回到可用');
  }

  /* ---- 点击 ---- */
  sugs.addEventListener('click',e=>{
    const s=e.target.closest('[data-sug]');if(!s)return;
    const p=s.dataset.sug.split('|');add(p.slice(1).join('|'),p[0]);
  });
  dims.addEventListener('click',e=>{
    const d=e.target.closest('[data-del]');if(d){del(d.dataset.del);return;}
    const it=e.target.closest('[data-rid]');if(!it)return;
    if(usedBy(it.dataset.rid)){api.toast('这项已经用掉了。先撤回那条组合。');return;}
    sel=sel===it.dataset.rid?null:it.dataset.rid;
    paint();
  });
  list.addEventListener('click',e=>{
    const back=e.target.closest('[data-back]');if(back){withdraw(back.dataset.back);return;}
    const keepBtn=e.target.closest('[data-keep]');if(keepBtn){keep();return;}
    const cancel=e.target.closest('[data-cancel]');if(cancel){a.draft=null;api.save();paint();return;}
    if(e.target.closest('.a07-compose'))return;
    const card=e.target.closest('[data-task]');if(!card)return;
    if(a.box.length<12){api.toast('先把清单列到 12 项');return;}
    if(!sel){api.toast('先在左边点一项资源');return;}
    if(a.uses.length>=TASKS.length){api.toast('三个任务都满了。撤回一条，才能换。');return;}
    openCompose(sel,card.dataset.task);
  });
  list.addEventListener('input',e=>{
    const i=e.target.closest('.a07-attr');if(!i||!a.draft)return;
    a.draft.attr=i.value;api.save();
    const wrap=i.closest('.a07-compose');
    wrap.querySelector('.a07-sent').innerHTML=sentHTML({rn:a.draft.rn,tn:a.draft.tn,attr:a.draft.attr},api);
    wrap.querySelector('.a07-len').textContent=(a.draft.attr||'').length
      ?'共 '+sentLen({rn:a.draft.rn,tn:a.draft.tn,attr:a.draft.attr})+' 字（至少 12）'
      :'先写属性，两个字以上';
    api.refresh();
  });

  /* ---- 拖拽 ---- */
  let dragId=null,sx=0,sy=0,moved=false;
  function mv(e){
    if(!dragId)return;
    if(!moved){
      if(Math.abs(e.clientX-sx)+Math.abs(e.clientY-sy)<8)return;
      moved=true;
      const el=dims.querySelector('[data-rid="'+dragId+'"]');
      if(el)el.classList.add('drag');
    }
    const under=document.elementFromPoint(e.clientX,e.clientY);
    const tk=under&&under.closest?under.closest('[data-task]'):null;
    list.querySelectorAll('[data-task]').forEach(t=>t.classList.toggle('over',t===tk));
  }
  function up(e){
    window.removeEventListener('pointermove',mv);
    const id=dragId;dragId=null;
    list.querySelectorAll('[data-task]').forEach(t=>t.classList.remove('over'));
    Array.prototype.forEach.call(dims.querySelectorAll('.a07-item.drag'),el=>el.classList.remove('drag'));
    if(!moved||!id)return;
    const under=document.elementFromPoint(e.clientX,e.clientY);
    const tk=under&&under.closest?under.closest('[data-task]'):null;
    if(tk)openCompose(id,tk.dataset.task);
  }
  dims.addEventListener('pointerdown',e=>{
    const it=e.target.closest('[data-rid]');if(!it)return;
    if(e.target.closest('[data-del]'))return;
    dragId=it.dataset.rid;sx=e.clientX;sy=e.clientY;moved=false;
    window.addEventListener('pointermove',mv);
    window.addEventListener('pointerup',up,{once:true});
  });

  /* ---- 添加 / 重来 ---- */
  function submitAdd(){
    add(addIn.value,addDim.value);
    addIn.value='';
    addIn.focus();
  }
  sec.querySelector('#a07AddBtn').onclick=submitAdd;
  addIn.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();submitAdd();}});

  resetBtn.onclick=()=>{
    const now=Date.now();
    if(now-resetArm<3200){
      a.box=[];a.uses=[];a.draft=null;sel=null;resetArm=0;
      resetBtn.textContent='清空重来';api.save();paint();api.toast('已清空，重新列');
      return;
    }
    resetArm=now;resetBtn.textContent='再点一次确认';
    setTimeout(()=>{if(Date.now()-resetArm>=3100)resetBtn.textContent='清空重来';},3400);
  };

  paint();
},
hint(S){
  const a=S.answers,box=a.box||[],uses=a.uses||[];
  if(box.length<12)return '盒内清单还差 '+(12-box.length)+' 项（四个维度都要有）';
  const miss=DIMS.filter(d=>!box.some(x=>x.dim===d.k));
  if(miss.length)return '「'+miss.map(d=>d.n).join('、')+'」这一维还是 0 项';
  if(uses.length<TASKS.length)return '还差 '+(TASKS.length-uses.length)+' 条：把一项资源拖到空着的任务上';
  const bad=uses.filter(u=>(u.attr||'').trim().length<2||sentLen(u)<12)[0];
  if(bad)return '有一条组合还缺属性：写清它提供的是什么（两个字以上）';
  return '';
},
gate(S){
  const a=S.answers,box=a.box||[],uses=a.uses||[];
  if(box.length<12)return false;
  if(!DIMS.every(d=>box.some(x=>x.dim===d.k)))return false;
  if(uses.length<3)return false;
  return uses.every(u=>(u.attr||'').trim().length>=2&&sentLen(u)>=12);
}},

/* ================= 4 在你的事上 ================= */
{id:'mine',name:'在你的事上',short:'在你的事',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>你一直想<em>买点什么</em>的那件事</h1>
<p>写一件你最近想靠「加钱、加人、加设备」解决的事。然后把手绑在盒子里，只用手上有的东西，给一个替代解。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>写下你想买／想加的是什么</span>
  <span class="op"><span class="op-n">2</span>从清单里点两项，插进句子</span>
  <span class="op"><span class="op-n">3</span>写成一句能照着做的替代解</span>
</div>
<div class="panel">
  <div class="panel-h"><h4>① 我想买／想加的</h4><span>至少 8 个字</span></div>
  <div class="field"><input id="a07Buy" maxlength="40" placeholder="例如：想再加一个客服，专门回微信上的售后问题"></div>
  <div class="row" style="margin-top:6px"><span class="small" id="a07BuyLen">0 / 40</span><div style="flex:1"></div><span class="small">写清是哪件事、卡在哪儿</span></div>
</div>
<div class="panel" style="margin-top:12px">
  <div class="panel-h"><h4>② 盒内替代解</h4><span>至少 15 个字</span></div>
  <div class="a07-picks" id="a07Picks"></div>
  <div class="field" style="margin-top:8px"><textarea id="a07Alt" maxlength="90" placeholder="例如：用巡检表的空格改成售后登记，让值班保安交接时抄一行"></textarea></div>
  <div class="row" style="margin-top:8px"><span class="small" id="a07AltLen">0 / 90</span><div style="flex:1"></div><button class="btn sm" id="a07Ask">让 AI 追问我</button></div>
</div>
<div class="panel" style="margin-top:12px">
  <div class="panel-h"><h4>③ 三条检查</h4><span>实时</span></div>
  <div class="grid3" id="a07Checks">
    <div class="chk" data-c="box"><i>○</i><b>用到了清单里的东西</b><span>句子里有它的名字，不是「用现有资源」这种说法</span></div>
    <div class="chk" data-c="nobuy"><i>○</i><b>没有买、没有招、没有外包</b><span>出现了这几个词，就还是老办法</span></div>
    <div class="chk" data-c="attr"><i>○</i><b>说清了借的是哪个属性</b><span>时间、位置、谁认识谁、哪张表</span></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  if(typeof a.buy!=='string')a.buy='';
  if(typeof a.alt!=='string')a.alt='';
  const buy=sec.querySelector('#a07Buy'),alt=sec.querySelector('#a07Alt'),
        buyLen=sec.querySelector('#a07BuyLen'),altLen=sec.querySelector('#a07AltLen'),
        picks=sec.querySelector('#a07Picks'),checks=sec.querySelector('#a07Checks');

  const names=()=>(a.box||[]).map(x=>x.n);
  const hitBox=t=>names().filter(n=>t.indexOf(n)>=0);
  const NOBUY=/(买|采购|下单|招聘|招人|外包|再招|加人|新增人手)/;

  function chk(){
    const t=a.alt||'',hits=hitBox(t);
    const c1=hits.length>0;
    const c2=t.length>0&&!NOBUY.test(t);
    const c3=/时间|位置|重量|空|闲|每天|每周|小时|分钟|记录|备注|单子|签字|权限|钥匙|路线|路过|认识|顺手|顺便|交接/.test(t);
    [['box',c1],['nobuy',c2],['attr',c3]].forEach(([k,on])=>{
      const el=checks.querySelector('[data-c="'+k+'"]');
      if(!el)return;el.classList.toggle('on',on);el.querySelector('i').textContent=on?'✓':'○';
    });
    return {c1,c2,c3,hits};
  }
  function paintChips(){
    const box=a.box||[];
    picks.innerHTML=box.length
      ?'<span class="a07-pick-h">点一下，插进句子里：</span>'+box.map(x=>'<button class="chip a07-chip" data-ins="'+x.id+'">'+api.esc(x.n)+'</button>').join('')
      :'<span class="small">清单还是空的。回上一步，先把盒子列出来。</span>';
  }
  function paint(full){
    if(full){
      if(document.activeElement!==buy)buy.value=a.buy||'';
      if(document.activeElement!==alt)alt.value=a.alt||'';
    }
    buyLen.textContent=(a.buy||'').length+' / 40';
    altLen.textContent=(a.alt||'').length+' / 90';
    chk();
  }
  function insert(name){
    if(document.activeElement!==alt){
      alt.value=(alt.value||'')+((alt.value||'').length?'，':'')+name;
    }else{
      const t=alt.value,s=alt.selectionStart,e=alt.selectionEnd;
      const sep=s>0&&!/[，,。；;、\s]$/.test(t.slice(0,s))?'，':'';
      const ins=sep+name;
      alt.value=t.slice(0,s)+ins+t.slice(e);
      const p=s+ins.length;alt.setSelectionRange(p,p);
    }
    a.alt=alt.value;api.save();paint(false);api.refresh();
  }
  buy.addEventListener('input',()=>{a.buy=buy.value;api.save();paint(false);api.refresh();});
  alt.addEventListener('input',()=>{a.alt=alt.value;api.save();paint(false);api.refresh();});
  picks.addEventListener('click',e=>{
    const b=e.target.closest('[data-ins]');if(!b)return;
    const it=(a.box||[]).filter(x=>x.id===b.dataset.ins)[0];
    if(it)insert(it.n);
  });
  sec.querySelector('#a07Ask').onclick=()=>{
    document.querySelector('.side-tab[data-tab="ask"]').click();
    api.ai('so_what','我想买／想加的是：'+(a.buy||'还没写')+'。我只用手上这些东西给的替代解：'+(a.alt||'还没写'));
  };
  paintChips();paint(true);
  repaint=()=>{paintChips();paint(true);};
},
onEnter(){if(repaint)repaint();},
hint(S){
  const a=S.answers;
  if((a.buy||'').length<8)return '先写下你想买／想加的是什么（至少 8 个字）';
  if((a.alt||'').length<15)return '再写一句盒内替代解（至少 15 个字）';
  const names=(a.box||[]).map(x=>x.n);
  if(!names.some(n=>(a.alt||'').indexOf(n)>=0))return '句子里要点到清单里的一项，不能只说「用现有资源」';
  return '';
},
gate(S){
  const a=S.answers;
  if((a.buy||'').length<8)return false;
  if((a.alt||'').length<15)return false;
  const names=(a.box||[]).map(x=>x.n);
  return names.some(n=>(a.alt||'').indexOf(n)>=0);
}},

/* ================= 5 过滤与提交 ================= */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 过滤与提交',
html:`
<div class="step-h a07-submit-h"><h1>两个判断，<em>然后交卡</em></h1>
<p>这一节不评点子好坏。只看两件事：<b>它真是盒内的吗</b>；<b>它原来的活有没有人接</b>。</p></div>
<div class="grid2" style="align-items:start">
  <div id="a07CardSlot"></div>
  <div class="stack" style="gap:10px">
    <div class="panel a07-mini">
      <div class="panel-h"><h4>① 这真是盒内吗</h4><span>二选一</span></div>
      <div class="opts">
        ${Q1.map(o=>'<button class="opt" data-q1="'+o.k+'"><span class="k">'+o.k.toUpperCase()+'</span><span><b>'+o.s+'</b></span></button>').join('')}
      </div>
    </div>
    <div class="panel a07-mini">
      <div class="panel-h"><h4>② 它原来的活会不会被影响</h4><span>二选一</span></div>
      <div class="opts">
        ${Q2.map(o=>'<button class="opt" data-q2="'+o.k+'"><span class="k">'+o.k.toUpperCase()+'</span><span><b>'+o.s+'</b></span></button>').join('')}
      </div>
    </div>
    <div class="panel a07-send">
      <div class="panel-h"><h4>③ 交卡</h4><span id="a07SubSt">未提交</span></div>
      <div id="a07Warn"></div>
      <div class="row" style="margin-top:9px">
        <button class="btn primary" id="a07SubBtn">提交到班级</button>
        <button class="btn" id="a07Export">导出 PNG</button>
        <div style="flex:1"></div>
      </div>
      <div class="hint" style="margin-top:7px">未登录：只存本机，不进互评池。</div>
    </div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const slot=sec.querySelector('#a07CardSlot'),st=sec.querySelector('#a07SubSt'),
        btn=sec.querySelector('#a07SubBtn'),warn=sec.querySelector('#a07Warn');

  function comboLine(){
    return (a.uses||[]).map((u,i)=>'①②③'[i]+'用「'+u.rn+'」的「'+u.attr+'」解决「'+u.tn+'」').join('；');
  }
  function rows(){
    const box=a.box||[];
    return [
      ['盒内清单',box.length?box.length+' 项（'+DIMS.map(d=>d.n+' '+boxCount(box,d.k)).join(' · ')+'）':'—'],
      ['三条组合',comboLine()||'—'],
      ['我想买的',a.buy||'—'],
      ['盒内替代',a.alt||'—'],
      ['盒内判断',(Q1.filter(x=>x.k===a.q1)[0]||{}).s||'—'],
      ['原活谁接',(Q2.filter(x=>x.k===a.q2)[0]||{}).s||'—']
    ];
  }
  function paint(){
    sec.querySelectorAll('[data-q1]').forEach(b=>b.classList.toggle('on',a.q1===b.dataset.q1));
    sec.querySelectorAll('[data-q2]').forEach(b=>b.classList.toggle('on',a.q2===b.dataset.q2));
    slot.innerHTML='<div class="outcard a07-card"><div class="oh"><span>DELIVERABLE · A07</span><span>资源卡</span></div>'+
      '<h5>我的盒内资源卡</h5><div class="kv">'+rows().map(r=>'<div><b>'+api.esc(r[0])+'</b><span class="'+(r[1]!=='—'?'fill':'')+'">'+api.esc(r[1])+'</span></div>').join('')+'</div></div>';
    const ready=!!(a.q1&&a.q2);
    st.textContent=S.submitted?'已提交':'未提交';
    btn.textContent=S.submitted?'已提交，去看班级':(ready?'提交到班级':'先答两个判断');
    btn.disabled=!!S.submitted||!ready;
    warn.innerHTML=a.q1==='b'
      ?'<p class="a07-boundary"><b>你选了「不完全是」。</b>那这一步就不算盒内思考：要么把它从替代解里划掉，要么承认你加了资源。</p>'
      :(a.q2==='b'?'<p class="a07-boundary"><b>你选了「会影响」。</b>回头看一眼替代解：原来那件活，谁接。</p>':'');
  }
  sec.querySelectorAll('[data-q1]').forEach(b=>b.onclick=()=>{a.q1=b.dataset.q1;api.save();paint();api.refresh();});
  sec.querySelectorAll('[data-q2]').forEach(b=>b.onclick=()=>{a.q2=b.dataset.q2;api.save();paint();api.refresh();});
  btn.onclick=async()=>{
    if(!(a.q1&&a.q2)){api.toast('先把两个判断答完');return;}
    await api.submit();paint();
  };
  sec.querySelector('#a07Export').onclick=()=>api.exportCard();
  paint();
  paint5=()=>paint();
},
onEnter(){if(paint5)paint5();},
hint(S){
  const a=S.answers;
  if(!a.q1)return '先回答：这真是盒内吗';
  if(!a.q2)return '再回答：它原来的活会不会被影响';
  return '';
},
gate(S){return !!(S.answers.q1&&S.answers.q2);}},

/* ================= 6 收束 ================= */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>带走<em>三句话</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 先数，再想</div><p class="small" style="margin-top:5px">卡住的时候先列清单。列不到 12 项，说明你还没看清自己手上有什么——不是没资源，是没数过。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 组件是名词，资源是属性</div><p class="small" style="margin-top:5px">「我们有打印机」不是资源；「打印机每天空转 6 小时」才是。换个说法，零件就变成了材料。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 一次只能用一项</div><p class="small" style="margin-top:5px">稀缺不是限制，是排序。每项只能用一次，你才会认真比较：这一项，最该用在哪。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A08</span></div>
<p class="small">A08 · 形式决定功能：七步法。下一节把这几节的判断收成一条流程：从列清单、动一次手，到给一个自己都不太敢认的东西找市场。七步走完，你会知道「先有形状，再找用途」是怎么操作的。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="a07Again">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#a07Again').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '你列到第 12 项的时候，是不是想了很久？那一项为什么最容易被漏掉？',
 '你说「我们什么都没有」的时候，数过人、信息和场地吗？',
 '你写的那句「用 X 的 Y」，Y 是一个属性，还是一个功能的名字？',
 '如果每项资源只能用一次，你会把它留给哪个任务？',
 '你想要的「买点什么」，能不能先用盒内的东西顶三个月？'
]},

card(S){
  const a=S.answers||{},box=a.box||[],uses=a.uses||[];
  return {title:'A07 · 我的盒内资源卡',rows:[
    ['盒内清单',box.length?box.length+' 项（'+DIMS.map(d=>d.n+' '+boxCount(box,d.k)).join(' · ')+'）':'—'],
    ['三条组合',uses.length?uses.map((u,i)=>'①②③'[i]+'用「'+u.rn+'」的「'+u.attr+'」解决「'+u.tn+'」').join('；'):'—'],
    ['我想买的',a.buy||'—'],
    ['盒内替代',a.alt||'—'],
    ['盒内判断',(Q1.filter(x=>x.k===a.q1)[0]||{}).s||'—'],
    ['原活谁接',(Q2.filter(x=>x.k===a.q2)[0]||{}).s||'—']
  ]};
},

notes:[
 {t:'本节目标',h:'让学员把「我缺资源」改成「我没数过」。两件事必须发生：清单真的数到 12 项；每一条组合都说得出借的是哪个属性。'},
 {t:'时间分配',h:'先猜 5′ · 概念 7′ · 工作台 16′ · 在你的事 9′ · 两个判断与提交 6′ · 收束 2′。工作台留够时间：多数人前 6 项很快，第 10 项开始才是真思考。'},
 {t:'常见卡点',h:'一是清单里全是「物」，人、信息、场地空着——那三个维度往往最不花钱。二是把功能名当属性写（写「打印」而不是「空转 6 小时」）。三是组合写成「用 A 帮忙做 B」，没有属性这一层。三种都不扣分，现场各挑一个改一遍。'},
 {t:'直播怎么接',h:'看后台四项数据：四维分布里哪一维为 0、12 项用了多久、每项资源被用在哪、组合句里 Y 是属性还是功能。挑 2 张「人／信息」为 0 的卡，当场让他补两项再重做一条组合——补完往往比原来那条更好。'},
 {t:'现场道具与板书',h:'带一台小风扇、一个空纸盒、一个装满的纸盒，现场吹一次，比讲十句有用。白板画四个格子（物／人／信息／场地），让全班先各填一项再开始，能省掉一半「想不出来」。'}
]};

let repaint=null,paint5=null;

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A07']=L;
})();
