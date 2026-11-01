/* A23 · 一专多能：八步实战 */
(function(){
'use strict';
const OBJECTS=[
 {k:'door',n:'办公室门',comps:['门把手','门板','门禁读卡器','闭门器','门牌','脚垫']},
 {k:'cart',n:'超市购物车',comps:['扶手','车筐','轮子','儿童座椅','扫码器','篮筐']},
 {k:'desk',n:'工位',comps:['桌面','椅子','显示器','台灯','抽屉','插座']}
];
const TASKS=[
 {k:'signal',n:'提示',d:'顺带告诉人一件事'},
 {k:'carry',n:'承载',d:'顺手多放一样东西'},
 {k:'pass',n:'传递',d:'把信息或物品传出去'},
 {k:'clean',n:'清洁',d:'经过时顺手清洁'},
 {k:'record',n:'记录',d:'留下一次数据'},
 {k:'power',n:'供电',d:'顺带提供电或能量'}
];
const CHECKS=[
 {k:'same',n:'会不会和原来的任务同时发生？',d:'不同时发生，就不算真正的一专多能。'},
 {k:'force',n:'会不会影响受力或安全？',d:'扶手加东西，握感和承重先过一遍。'},
 {k:'attention',n:'会不会抢走注意力？',d:'太多提示等于没有提示。'}
];

function docTasks(sec){return sec.querySelectorAll('[data-t]');}

const L={
id:'A23',week:6,seq:23,title:'一专多能：八步实战',
kicker:'WEEK 6 · 一专多能',tool:'tu',toolName:'一专多能',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>扶手加个 iPad 支架，<em>为什么没人用</em></h1>
<p>有人在购物车扶手上装了平板支架，想让顾客边逛边看广告。三个月后全拆了。问题出在哪一步？</p></div>
<div class="opts" style="margin-bottom:12px">
<button class="opt" data-h="a"><span class="k">A</span><span><b>平板太贵，被偷了</b><span>成本问题</span></span></button>
<button class="opt" data-h="b"><span class="k">B</span><span><b>扶手是推车时手一直握着的地方，加了支架就没法握</b><span>两个任务打架</span></span></button>
<button class="opt" data-h="c"><span class="k">C</span><span><b>广告内容不好看</b><span>内容问题</span></span></button>
</div>
<div id="hookOut"></div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#hookOut');
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',S.answers.hook===b.dataset.h));
    if(S.answers.hook){
      const ok=S.answers.hook==='b';
      out.innerHTML='<div class="panel" style="border-color:'+(ok?'rgba(78,159,110,.4)':'rgba(216,154,60,.4)')+';background:'+(ok?'rgba(78,159,110,.07)':'rgba(216,154,60,.06)')+'">'+
        '<p class="small" style="font-size:12px">'+(ok?'对。<b>扶手的第一任务是"握着推"，第二任务"看广告"和它同时发生、抢同一个身体位置</b>——两个任务打架，一专多能就不成立。':'更根本的是 B：扶手要握，支架要占位置，<b>两个任务同时抢同一个地方</b>。一专多能的硬条件不是"能不能加上去"，是"两个任务能不能同时成立、谁也不拖累谁"。')+'</p></div>';
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
<div class="step-h"><h1>一个组件，<em>同时干两件事</em></h1>
<p>一专多能不加新东西。它只做一件事：让已经在场的东西，多承担一个任务。</p></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">内部</div><p class="small" style="margin-top:5px">同一个组件里塞两个功能：带灯的螺丝刀。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">外部</div><p class="small" style="margin-top:5px">借环境里的东西：旋转木马借孩子的玩心抽水。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">时间</div><p class="small" style="margin-top:5px">同一组件不同时刻做不同事：白天是桌，晚上是床。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>三条冲突检查</h4><span>不加这三问就是自嗨</span></div>
<div class="stack">
  <div><b style="font-size:11px;color:var(--ink)">① 同时性或时间型</b><p class="small" style="margin-top:2px">两个任务要么同时发生、共享同一个动作；要么属于"时间型"（同一组件在不同时刻做不同事，如雨伞开瓶器）。两种都算，但都不能互相添麻烦。</p></div>
  <div><b style="font-size:11px;color:var(--ink)">② 受力与安全</b><p class="small" style="margin-top:2px">加的东西会不会让原来的活变得危险。</p></div>
  <div><b style="font-size:11px;color:var(--ink)">③ 注意力</b><p class="small" style="margin-top:2px">多出来的提示会不会盖住原来的提示。</p></div>
</div></div>`,
init(){},hint(){return '';},gate(){return true;}},

/* ---------- 3 实战台 ---------- */
{id:'bench',name:'实战台',short:'实战',kicker:'STEP 3 · 实战台',
html:`
<div class="step-h"><h1>给你的对象，<em>加一个任务</em></h1>
<p>四步：选对象 → 选组件 → 选新任务 → 生成三个方案并改写。最后必须过三道冲突检查。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>选对象</span>
  <span class="op"><span class="op-n">2</span>选组件</span>
  <span class="op"><span class="op-n">3</span>选新任务</span>
  <span class="op"><span class="op-n">4</span>选方案 + 过三关</span>
</div>
<div class="grid3">
  <div class="panel"><div class="panel-h"><h4>① 对象</h4><span>三选一</span></div>
    <div class="stack">${OBJECTS.map(o=>`<button class="a23-obj" data-o="${o.k}"><b>${o.n}</b><i>→</i></button>`).join('')}</div></div>
  <div class="panel"><div class="panel-h"><h4>② 组件</h4><span>选一个</span></div>
    <div class="chips" id="comps"><span class="small">先选对象</span></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">③ 新任务</h4><span>选一个</span></div>
    <div class="chips" id="tasks">${TASKS.map(t=>`<button class="chip" data-t="${t.k}">${t.n}</button>`).join('')}</div>
    <div class="hint" id="tHint" style="margin-top:6px">六个方向里选一个。</div></div>
  <div class="panel"><div class="panel-h"><h4>④ 三个方案</h4><span id="vCnt">0</span></div>
    <div class="stack" id="variants"><div class="a23-empty">选完组件和新任务，会出现三个方案。</div></div></div>
</div>
<div class="grid2" style="margin-top:12px">
  <div class="panel"><div class="panel-h"><h4>改写成一个能说的方案</h4><span>≥12 字</span></div>
    <div class="field"><textarea id="plan" maxlength="60" placeholder="用「X 一边做 A，一边做 B」说清楚"></textarea></div></div>
  <div class="panel"><div class="panel-h"><h4>三道冲突检查</h4><span>选</span></div>
    <div class="chips" id="checks">${CHECKS.map(c=>`<button class="chip" data-c="${c.k}">${c.n}</button>`).join('')}</div>
    <div class="hint" id="cHint" style="margin-top:6px">三道都点一遍，表示你检查过。</div></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;a.checks=a.checks||[];
  const compsEl=sec.querySelector('#comps'),varEl=sec.querySelector('#variants'),
        tHint=sec.querySelector('#tHint'),cHint=sec.querySelector('#cHint');
  const plan=sec.querySelector('#plan'),checksEl=sec.querySelector('#checks');
  const obj=()=>OBJECTS.find(o=>o.k===a.obj);
  function variants(){
    const o=obj();if(!o||!a.comp||!a.tk)return [];
    const c=a.comp,n=o.n,t=TASKS.find(x=>x.k===a.tk).n;
    const M={
      signal:[`${c}上留一条 ${n} 色带，一眼看出状态`,`${c}自己会亮，不用找开关`,`${c}摸上去就知道该往哪走`],
      carry:[`${c}顺手能挂住一杯咖啡`,`${c}凹下去一格放手机`,`${c}边缘加一道槽放笔`],
      pass:[`${c}把信息传给下一个人的手机`,`${c}上写一句会被看见的话`,`${c}离开时自动带一条记录`],
      clean:[`${c}每次被碰就擦一次`,`${c}的表面做成自清洁`,`${c}底部藏一块可换的擦布`],
      record:[`${c}记下今天被用了多少次`,`${c}记下谁最后碰过它`,`${c}把使用时长变成一条曲线`],
      power:[`${c}被推的时候顺便发电`,`${c}借手温给传感器供电`,`${c}接一根线给旁边的设备充电`]
    };
    return M[a.tk]||[];
  }
  function paint(){
    sec.querySelectorAll('[data-o]').forEach(b=>b.classList.toggle('on',a.obj===b.dataset.o));
    const o=obj();
    compsEl.innerHTML=o?o.comps.map(c=>`<button class="chip${a.comp===c?' on':''}" data-comp="${c}">${c}</button>`).join(''):'<span class="small">先选对象</span>';
    sec.querySelectorAll('[data-t]').forEach(b=>b.classList.toggle('on',a.tk===b.dataset.t));
    if(a.tk)tHint.innerHTML='<b>'+(TASKS.find(t=>t.k===a.tk)||{}).n+'：</b>'+(TASKS.find(t=>t.k===a.tk)||{}).d;
    const vs=variants();
    varEl.innerHTML=vs.length?vs.map((v,i)=>`<button class="a23-var${a.vIdx===i?' on':''}" data-v="${i}"><b>${api.esc(v)}</b><i>${a.vIdx===i?'✓':'→'}</i></button>`).join(''):'<div class="a23-empty">选完组件和新任务，会出现三个方案。</div>';
    sec.querySelector('#vCnt').textContent=vs.length?vs.length+' 个':'0';
    plan.value=a.plan||'';
    sec.querySelectorAll('#checks [data-c]').forEach(b=>b.classList.toggle('on',(a.checks||[]).indexOf(b.dataset.c)>=0));
    cHint.textContent=(a.checks||[]).length>=3?'三道都过了。':'还差 '+(3-(a.checks||[]).length)+' 道没点。';
    varEl.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{a.vIdx=+b.dataset.v;a.plan=vs[+b.dataset.v];api.save();paint();api.refresh();});
    compsEl.querySelectorAll('[data-comp]').forEach(b=>b.onclick=()=>{a.comp=b.dataset.comp;a.vIdx=null;api.save();paint();});
    api.refresh();
  }
  sec.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{a.obj=b.dataset.o;a.comp='';a.tk='';a.vIdx=null;api.save();paint();});
  docTasks(sec).forEach(b=>b.onclick=()=>{a.tk=b.dataset.t;a.vIdx=null;api.save();paint();});
  checksEl.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{
    const k=b.dataset.c;
    a.checks=(a.checks||[]).indexOf(k)>=0?(a.checks||[]).filter(x=>x!==k):(a.checks||[]).concat(k);
    api.save();paint();
  });
  plan.addEventListener('input',()=>{a.plan=plan.value;api.save();api.refresh();});
  paint();
},
hint(S){const a=S.answers;if(!a.obj)return '先选对象';if(!a.comp)return '选一个组件';if(!a.tk)return '选新任务';if(a.vIdx===null||a.vIdx===undefined)return '挑一个方案';if((a.plan||'').length<12)return '方案没写够';if((a.checks||[]).length<3)return '三道冲突检查没过完';return '';},
gate(S){const a=S.answers;return !!(a.obj&&a.comp&&a.tk&&a.vIdx!==null&&a.vIdx!==undefined&&(a.plan||'').length>=12&&(a.checks||[]).length>=3);}},

/* ---------- 4 在你的事上 ---------- */
{id:'mine',name:'在你的事上',short:'在你的事',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>你身边那个<em>人人都会碰</em>的东西</h1></div>
<div class="grid2">
  <div class="panel"><div class="panel-h"><h4>① 它是什么</h4><span>≥4 字</span></div>
    <div class="field"><input id="thing" maxlength="20" placeholder="例如：电梯按钮 / 前台笔筒 / 会议室门牌"></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">② 它原来在干什么</h4><span>≥6 字</span></div>
    <div class="field"><input id="origin" maxlength="30" placeholder="例如：让人按楼层"></div></div>
  <div class="panel"><div class="panel-h"><h4>③ 你想给它加什么任务</h4><span>≥12 字</span></div>
    <div class="field"><textarea id="add" maxlength="60" placeholder="顺手提醒 / 顺手记录 / 顺手消毒……"></textarea></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">④ 原来的活会不会被影响</h4><span>≥10 字</span></div>
    <div class="field"><textarea id="impact" maxlength="60" placeholder="会被影响的话，怎么让它不打架"></textarea></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const f={thing:sec.querySelector('#thing'),origin:sec.querySelector('#origin'),add:sec.querySelector('#add'),impact:sec.querySelector('#impact')};
  Object.keys(f).forEach(k=>{f[k].value=a[k]||'';f[k].addEventListener('input',()=>{a[k]=f[k].value;api.save();api.refresh();});});
},
hint(S){const a=S.answers;if((a.thing||'').length<4)return '先写它是什么';if((a.origin||'').length<6)return '写它原来干什么';if((a.add||'').length<12)return '新任务没写够';if((a.impact||'').length<10)return '没写会不会打架';return '';},
gate(S){const a=S.answers;return !!((a.thing||'').length>=4&&(a.origin||'').length>=6&&(a.add||'').length>=12&&(a.impact||'').length>=10);}},

/* ---------- 5 提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 产出',
html:`
<div class="step-h"><h1>交一张<em>双任务卡</em></h1></div>
<div class="grid2" style="align-items:start">
  <div id="cardSlot"></div>
  <div class="panel"><div class="panel-h"><h4>补一句</h4><span>会被同事看到</span></div>
    <div class="field"><label>这个新任务，最该先给谁用</label><textarea id="who" maxlength="50" placeholder="一个具体岗位或场景，不写"所有人""></textarea></div>
    <div class="row" style="margin-top:10px"><button class="btn primary" id="subBtn">提交</button><button class="btn" id="export2">导出 PNG</button></div>
    <div class="hint" id="subSt" style="margin-top:8px">未提交</div></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const slot=sec.querySelector('#cardSlot'),who=sec.querySelector('#who'),btn=sec.querySelector('#subBtn'),st=sec.querySelector('#subSt');
  function paint(){
    who.value=a.who||'';
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A23</span><span>双任务卡</span></div>'+
      '<h5>'+api.esc(a.plan||'我的方案')+'</h5><div class="kv">'+
      [['对象',(OBJECTS.find(o=>o.k===a.obj)||{}).n],['组件',a.comp],['新任务',(TASKS.find(t=>t.k===a.tk)||{}).n],['方案',a.plan],['谁先用',a.who]]
      .map(r=>'<div><b>'+r[0]+'</b><span class="'+(r[1]?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+'</div></div>';
    st.textContent=S.submitted?'已提交':'未提交';btn.disabled=!!S.submitted;btn.textContent=S.submitted?'已提交':'提交';
  }
  who.addEventListener('input',()=>{a.who=who.value;api.save();paint();api.refresh();});
  btn.onclick=async()=>{await api.submit();paint();};
  sec.querySelector('#export2').onclick=()=>api.exportCard();
  paint();
},
hint(S){return (S.answers.who||'').length>=4?'':'写一句"谁先用"';},
gate(S){return (S.answers.who||'').length>=4;}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>一专多能的<em>一条硬线</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 不加东西</div><p class="small" style="margin-top:5px">加的是任务，不是零件。要加零件就是加法。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 同时或错时成立</div><p class="small" style="margin-top:5px">同时发生要互不拖累；时间型（先后做）也要互不影响。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 先过三关</div><p class="small" style="margin-top:5px">同时性、受力、注意力，缺一关就会像那个扶手支架。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A24</span></div>
<p class="small">A24 · 一专多能：双重任务互斥。什么时候两个任务不能同时存在，怎么判断。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '新任务和原来的任务，真的同时发生吗？',
 '多出来的那个东西，会不会挡手？',
 '如果两个任务抢同一个位置，你会让谁先？',
 '这个新任务，谁来维护？',
 '没人用的时候，怎么知道是设计错了？'
]},

card(S){
  const a=S.answers||{};
  return {title:'A23 · 双任务卡',rows:[
    ['对象',(OBJECTS.find(o=>o.k===a.obj)||{}).n||'—'],
    ['组件',a.comp||'—'],['新任务',(TASKS.find(t=>t.k===a.tk)||{}).n||'—'],
    ['方案',a.plan||'—'],['谁先用',a.who||'—']
  ]};
},
notes:[
 {t:'本节目标',h:'让学员能在一个已有组件上加第二个任务，并过三道冲突检查。'},
 {t:'时间分配',h:'先猜 5′ · 概念 7′ · 实战台 18′ · 在你的事 10′ · 提交 5′。'},
 {t:'常见卡点',h:'学员会"加一个东西"而不是"加一个任务"。追问：你加的是零件还是任务？'},
 {t:'直播怎么接',h:'看学员的三道检查点了没：只点不写的，现场让他说受力怎么变。'},
 {t:'和 A21/A22 的关系',h:'A21 认得出、A22 拆得开、A23 做得出。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A23']=L;
})();
