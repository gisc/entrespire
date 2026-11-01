/* A32 · AVM 下：找机会点 */
(function(){
'use strict';
/* 一张现成的 AVM 图：保温杯 */
const AVM={
 obj:'保温杯',
 rows:[
  {attr:'316 不锈钢',val:'不容易锈',strong:true, users:['每天带饭的人']},
  {attr:'保温 12 小时',val:'开会到下午还是热的',strong:true, users:['一整天在外跑的人']},
  {attr:'一支 4 块钱',val:'丢了不心疼',strong:true, users:['学生']},
  {attr:'杯口有螺纹',val:'拧起来要转三圈',strong:false, users:['一手抱孩子的人']},
  {attr:'500ml 容量',val:'刚好一杯半',strong:false, users:['健身房的人']},
  {attr:'磨砂表面',val:'摸着不打滑',strong:true, users:['手上有油的人']}
 ]
};
const OPPS=[
 {k:'strong',n:'强连接',d:'把已经成立的价值再放大（更极端地满足）'},
 {k:'weak',n:'弱连接',d:'把"有人在意、但产品没做好"的一条做扎实'},
 {k:'focus',n:'焦点',d:'只对一类人，把一条价值做到极致'},
 {k:'diff',n:'差异化',d:'做竞争对手不愿意做的那一条'},
 {k:'isolate',n:'孤立价值',d:'一条价值单独拆出来，做成另一个产品'},
 {k:'segment',n:'新细分',d:'这条价值其实指向一个没人服务的人群'}
];
const GOOD={weak:'weak',strong:'strong',focus:'focus',diff:'diff',isolate:'isolate',segment:'segment'};

const L={
id:'A32',week:8,seq:32,title:'AVM 下：找机会点',
kicker:'WEEK 8 · 产品与 AVM',tool:'avm',toolName:'AVM',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>六条价值里，<em>哪一条是机会</em></h1>
<p>下面是一张保温杯的 AVM 图。已经成立的叫"强连接"，有人在意但没做好的叫"弱连接"。机会通常在后者。</p></div>
<div class="a32-avm">
  ${AVM.rows.map((r,i)=>`<div class="a32-row${r.strong?' strong':' weak'}">
    <div class="a32-a">${r.attr}</div><div class="a32-v">${r.val}</div>
    <div class="a32-s">${r.strong?'强连接':'弱连接'}</div></div>`).join('')}
</div>
<div class="panel"><div class="panel-h"><h4>第一个该动的是哪一条</h4><span>单选</span></div>
<div class="opts">
<button class="opt" data-h="a"><span class="k">A</span><span><b>316 不锈钢</b><span>材料好</span></span></button>
<button class="opt" data-h="b"><span class="k">B</span><span><b>杯口螺纹要拧三圈</b><span>一手抱孩子的人很在意</span></span></button>
<button class="opt" data-h="c"><span class="k">C</span><span><b>4 块钱</b><span>便宜</span></span></button>
</div>
<div id="hookOut" style="margin-top:12px"></div></div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#hookOut');
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',S.answers.hook===b.dataset.h));
    if(S.answers.hook){
      const ok=S.answers.hook==='b';
      out.innerHTML='<div class="panel" style="border-color:'+(ok?'rgba(78,159,110,.4)':'rgba(216,154,60,.4)')+';background:'+(ok?'rgba(78,159,110,.07)':'rgba(216,154,60,.06)')+'">'+
        '<p class="small" style="font-size:12px">'+(ok?'对。<b>弱连接就是机会</b>：一手抱孩子的人确实在意，但产品没为他想过。把这一条做扎实，就是一个新产品（单手开合）。':'更该动的是 B：<b>弱连接</b>。材料、价格都已经成立，改它们只是"更好"；把"拧三圈"改成"单手一按"，会换来一个具体人群。')+'</p></div>';
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
<div class="step-h"><h1>五种机会点</h1>
<p>AVM 画完，图上会留下两种痕迹：扎堆的强连接，和没人管的弱连接。机会几乎都在后者。</p></div>
<div class="grid2" style="margin-bottom:12px">
  <div class="panel"><div class="panel-h"><h4>五种找法</h4><span>选一种就够</span></div>
    <div class="stack">
      ${OPPS.map(o=>`<div><b style="font-size:11px;color:var(--ink)">${o.n}</b><p class="small" style="margin-top:2px">${o.d}</p></div>`).join('')}
    </div></div>
  <div class="panel"><div class="panel-h"><h4>一条判据</h4><span>别贪多</span></div>
    <p class="small" style="line-height:1.9">选中的机会，必须能回答：<b>谁因此改用什么？</b><br>
    如果答案是"大家会更满意"，那不是机会，是优化。</p>
    <div class="tag acc" style="margin-top:10px">强连接也能做机会，但要走"焦点/新细分"——把它做到极端，或只服务一类人。</div>
  </div>
</div>`,
init(){},hint(){return '';},gate(){return true;}},

/* ---------- 3 机会扫描 ---------- */
{id:'scan',name:'机会扫描',short:'扫描',kicker:'STEP 3 · 机会扫描',
html:`
<div class="step-h"><h1>给每条价值<em>贴一个机会类型</em></h1>
<p>六条逐条判断：它是强连接还是弱连接，以及最该用哪种机会点。六条都判完才解锁。</p></div>
<div class="bench">
  <div class="bench-h"><b>AVM · 保温杯 · 机会扫描</b><span class="st" id="sSt">0 / 6</span></div>
  <div class="bench-b" style="overflow:auto"><div class="a32-list" id="sList"></div></div>
  <div class="bench-f"><span class="small">判完会告诉你这条为什么值得/不值得动。</span><div style="flex:1"></div><button class="btn sm ghost" id="sReset">重来</button></div>
</div>`,
init(sec,api){
  const S=api.S;S.answers.scan=S.answers.scan||{};
  const list=sec.querySelector('#sList'),st=sec.querySelector('#sSt');
  function paint(){
    list.innerHTML=AVM.rows.map((r,i)=>{
      const v=S.answers.scan[i]||{};
      return `<div class="a32-item${v.o?' done':''}">
        <div class="a32-ih"><b>${r.attr}</b><span>${r.val}</span></div>
        <div class="a32-tag ${r.strong?'strong':'weak'}">${r.strong?'强连接':'弱连接'}</div>
        <div class="a32-ob">${OPPS.map(o=>`<button class="a32-ob${v.o===o.k?' on':''}" data-i="${i}" data-o="${o.k}">${o.n}</button>`).join('')}</div>
        ${v.o?`<div class="a32-fb ${v.o===GOOD[r.strong?'strong':'weak']?'good':''}">
          ${v.o===GOOD[r.strong?'strong':'weak']?'✓ 这是最常见的选择':'△ 也可以，但更常见的是「'+(r.strong?'强连接放大':'弱连接做实')+'」'}</div>`:''}
      </div>`;
    }).join('');
    list.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{
      const i=b.dataset.i;S.answers.scan[i]={o:b.dataset.o};api.save();paint();api.refresh();
    });
    st.textContent=Object.keys(S.answers.scan).length+' / 6';
  }
  sec.querySelector('#sReset').onclick=()=>{S.answers.scan={};api.save();paint();api.refresh();};
  paint();
},
hint(S){const n=Object.keys(S.answers.scan||{}).length;return n>=6?'':'还差 '+(6-n)+' 条';},
gate(S){return Object.keys(S.answers.scan||{}).length>=6;}},

/* ---------- 4 在你的事上 ---------- */
{id:'mine',name:'在你的事上',short:'在你的事',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>你的 AVM 上，<em>最弱的那一条</em></h1></div>
<div class="grid2">
  <div class="panel"><div class="panel-h"><h4>① 弱连接</h4><span>≥6 字</span></div>
    <div class="field"><input id="weak" maxlength="40" placeholder="例如：杯口螺纹要拧三圈"></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">② 谁在意它</h4><span>≥6 字</span></div>
    <div class="field"><input id="who" maxlength="30" placeholder="一个具体的人"></div></div>
  <div class="panel"><div class="panel-h"><h4>③ 机会类型</h4><span>选一个</span></div>
    <div class="chips" id="opp">${OPPS.slice(1,4).map(o=>`<button class="chip" data-o2="${o.k}">${o.n}</button>`).join('')}</div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">④ 做成什么</h4><span>≥15 字</span></div>
    <div class="field"><textarea id="make" maxlength="60" placeholder="具体到能画出来的一步"></textarea></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  ['weak','who','make'].forEach(k=>{const el=sec.querySelector('#'+k);el.value=a[k]||'';el.addEventListener('input',()=>{a[k]=el.value;api.save();api.refresh();});});
  function paint(){sec.querySelectorAll('[data-o2]').forEach(b=>b.classList.toggle('on',a.opp===b.dataset.o2));}
  sec.querySelectorAll('[data-o2]').forEach(b=>b.onclick=()=>{a.opp=b.dataset.o2;api.save();paint();api.refresh();});
  paint();
},
hint(S){const a=S.answers;if((a.weak||'').length<6)return '写弱连接';if((a.who||'').length<6)return '谁在意';if(!a.opp)return '选一个机会类型';if((a.make||'').length<15)return '做成什么没写够';return '';},
gate(S){const a=S.answers;return !!((a.weak||'').length>=6&&(a.who||'').length>=6&&a.opp&&(a.make||'').length>=15);}},

/* ---------- 5 提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 产出',
html:`
<div class="step-h"><h1>交一张<em>机会卡</em></h1></div>
<div class="grid2" style="align-items:start">
  <div id="cardSlot"></div>
  <div class="panel"><div class="panel-h"><h4>补一句</h4><span>会被同事看到</span></div>
    <div class="field"><label>这个改动会让谁不方便</label><textarea id="cost" maxlength="50" placeholder="说清代价，再说值不值"></textarea></div>
    <div class="row" style="margin-top:10px"><button class="btn primary" id="subBtn">提交</button><button class="btn" id="export2">导出 PNG</button></div>
    <div class="hint" id="subSt" style="margin-top:8px">未提交</div></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const slot=sec.querySelector('#cardSlot'),cost=sec.querySelector('#cost'),btn=sec.querySelector('#subBtn'),st=sec.querySelector('#subSt');
  function paint(){
    cost.value=a.cost||'';
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A32</span><span>机会卡</span></div>'+
      '<h5>'+api.esc(a.weak||'我的机会')+'</h5><div class="kv">'+
      [['弱连接',a.weak],['谁在意',a.who],['机会类型',(OPPS.find(o=>o.k===a.opp)||{}).n],['做成什么',a.make],['谁不方便',a.cost]]
      .map(r=>'<div><b>'+r[0]+'</b><span class="'+(r[1]?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+'</div></div>';
    st.textContent=S.submitted?'已提交':'未提交';btn.disabled=!!S.submitted;btn.textContent=S.submitted?'已提交':'提交';
  }
  cost.addEventListener('input',()=>{a.cost=cost.value;api.save();paint();api.refresh();});
  btn.onclick=async()=>{await api.submit();paint();};
  sec.querySelector('#export2').onclick=()=>api.exportCard();
  paint();
},
hint(S){return (S.answers.cost||'').length>=4?'':'写一句"谁不方便"';},
gate(S){return (S.answers.cost||'').length>=4;}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>AVM 画完，只用回答一个问题</h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 机会在弱连接</div><p class="small" style="margin-top:5px">强连接已经成立，改它只是更好。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 只选一条</div><p class="small" style="margin-top:5px">同时做五条，等于没有焦点。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 说得出人</div><p class="small" style="margin-top:5px">"谁因此改用什么"，答不出就不是机会。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A33</span></div>
<p class="small">A33 · 流程创新：除法与系统。把工具从"产品"搬到"流程"上，你会发现约束变了。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '这条弱连接，谁真的在意？',
 '做成之后，谁会觉得不方便？',
 '为什么竞品没做这一条？',
 '这是机会，还是优化？',
 '如果只能改一处，你改哪？'
]},

card(S){
  const a=S.answers||{};
  return {title:'A32 · 机会卡',rows:[
    ['弱连接',a.weak||'—'],['谁在意',a.who||'—'],['机会类型',(OPPS.find(o=>o.k===a.opp)||{}).n||'—'],['做成什么',a.make||'—'],['谁不方便',a.cost||'—']
  ]};
},
notes:[
 {t:'本节目标',h:'让学员从一张 AVM 图里认出机会点，并能说清"谁因此改用什么"。'},
 {t:'时间分配',h:'先猜 5′ · 概念 8′ · 扫描 15′ · 在你的事 12′ · 提交 5′。'},
 {t:'常见卡点',h:'学员会挑最强的价值去放大。追问：那条已经成立了，放大它还能换来谁？'},
 {t:'直播怎么接',h:'看扫描里被判成"强连接放大"的比例，超过一半就现场讲"机会在弱连接"。'},
 {t:'和 A31 的关系',h:'A31 画图，A32 在图上找机会。两节连上才是完整 AVM。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A32']=L;
})();
