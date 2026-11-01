/* A33 · 流程创新：除法与系统 */
(function(){
'use strict';
const FLOWS={
 clinic:{n:'患者就诊',steps:['挂号','候诊','问诊','开检查','缴费','做检查','等报告','回诊']},
 onboard:{n:'新员工入职',steps:['发 offer','签合同','体检','领设备','开账号','入职培训','第一次 1:1','转正评估']},
 expense:{n:'费用报销',steps:['填单','贴票','主管审','财务审','打款','归档']}
};
const TYPES=[
 {k:'skip',n:'跳过',d:'让 A 直接连到 C，中间那步不再经过'},
 {k:'loop',n:'回环',d:'让后面的步骤回到前面，形成循环'},
 {k:'parallel',n:'并行',d:'两条连接同时走，不再排队'}
];

const L={
id:'A33',week:9,seq:33,title:'流程创新：除法与系统',
kicker:'WEEK 9 · 流程与组织',tool:'div',toolName:'流程创新',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>医院把<em>缴费挪到检查之后</em>，为什么更快</h1>
<p>同一批医生、同一台设备、同一栋楼。改的不是资源，是<b>流程里的一条连接</b>。</p></div>
<div class="opts" style="margin-bottom:12px">
<button class="opt" data-h="a"><span class="k">A</span><span><b>因为少排了一次队</b><span>队伍变短</span></span></button>
<button class="opt" data-h="b"><span class="k">B</span><span><b>因为"缴费"不再挡在"做检查"前面</b><span>连接变了</span></span></button>
<button class="opt" data-h="c"><span class="k">C</span><span><b>因为多了自助机</b><span>工具变了</span></span></button>
</div>
<div id="hookOut"></div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#hookOut');
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',S.answers.hook===b.dataset.h));
    if(S.answers.hook){
      const ok=S.answers.hook==='b';
      out.innerHTML='<div class="panel" style="border-color:'+(ok?'rgba(78,159,110,.4)':'rgba(216,154,60,.4)')+';background:'+(ok?'rgba(78,159,110,.07)':'rgba(216,154,60,.06)')+'">'+
        '<p class="small" style="font-size:12px">'+(ok?'对。<b>病人不再"交完钱才能做检查"</b>，而是先做检查、后统一结算。改变的是流程里的一条箭头，不是资源。':'更准确是 B：<b>改的是"缴费 → 做检查"这条箭头</b>。资源没变、人没变，流程的形状变了。')+'</p></div>';
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
<div class="step-h"><h1>流程是一个<em>系统</em>：改一条连接，整条链都变</h1>
<p>五个工具用在产品上叫"改东西"，用在流程上叫"改连接"。改连接比改步骤更省力，也更危险。</p></div>
<div class="grid2" style="margin-bottom:12px">
  <div class="panel"><div class="panel-h"><h4>三种连接改法</h4><span>先认这三种</span></div>
    <div class="stack">${TYPES.map(t=>`<div><b style="font-size:11px;color:var(--ink)">${t.n}</b><p class="small" style="margin-top:2px">${t.d}</p></div>`).join('')}</div></div>
  <div class="panel"><div class="panel-h"><h4>系统视角：三个后果</h4><span>每次改都会发生</span></div>
    <div class="stack">
      <div><b style="font-size:11px;color:var(--ink)">① 瓶颈会移动</b><p class="small" style="margin-top:2px">你松开的地方不堵了，下一处开始堵。</p></div>
      <div><b style="font-size:11px;color:var(--ink)">② 责任会重排</b><p class="small" style="margin-top:2px">谁的工作量变了，要提前说。</p></div>
      <div><b style="font-size:11px;color:var(--ink)">③ 数据会断</b><p class="small" style="margin-top:2px">原来靠这一步产生的记录，改完谁来记？</p></div>
    </div></div>
</div>`,
init(){},hint(){return '';},gate(){return true;}},

/* ---------- 3 改连接 ---------- */
{id:'bench',name:'改连接',short:'改连接',kicker:'STEP 3 · 改连接',
html:`
<div class="step-h"><h1>断开一条，<em>再接一条</em></h1>
<p>选一个流程，用"从 → 到"加一条新连接（跳过 / 回环 / 并行），并写清它改变了什么。至少加 2 条。</p></div>
<div class="bench">
  <div class="bench-h"><b>SYSTEM · 改连接</b><span class="st" id="bSt">0 / 2 条</span></div>
  <div class="bench-b" style="overflow:auto">
    <div class="a33-pick">${Object.keys(FLOWS).map(k=>`<button class="chip" data-f="${k}">${FLOWS[k].n}</button>`).join('')}</div>
    <div class="a33-line" id="line"></div>
    <div class="a33-add">
      <span class="a33-lb">从</span><select id="from"></select>
      <span class="a33-lb">到</span><select id="to"></select>
      <span class="a33-lb">类型</span><select id="type">${TYPES.map(t=>`<option value="${t.k}">${t.n}</option>`).join('')}</select>
      <button class="btn sm" id="addEdge">加这条连接</button>
    </div>
    <div class="a33-why"><input id="edgeWhy" maxlength="40" placeholder="这条连接改变了什么（≥8 字）"></div>
    <div class="a33-list" id="edges"></div>
  </div>
  <div class="bench-f"><span class="small">加完会画在流程线上；写清"改变了什么"才算一条。</span><div style="flex:1"></div><button class="btn sm ghost" id="bReset">重来</button></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;a.edges=a.edges||[];
  const line=sec.querySelector('#line'),edgesEl=sec.querySelector('#edges'),
        fromSel=sec.querySelector('#from'),toSel=sec.querySelector('#to'),
        typeSel=sec.querySelector('#type'),whyIn=sec.querySelector('#edgeWhy'),
        st=sec.querySelector('#bSt');
  const flow=()=>FLOWS[a.flow];
  function fillSelects(){
    const f=flow();if(!f)return;
    const opts=f.steps.map((s,i)=>`<option value="${i}">${i+1}. ${s}</option>`).join('');
    fromSel.innerHTML=opts;toSel.innerHTML=opts;
    if(f.steps.length>1)toSel.value='1';
  }
  function paint(){
    sec.querySelectorAll('[data-f]').forEach(b=>b.classList.toggle('on',a.flow===b.dataset.f));
    const f=flow();
    if(!f){line.innerHTML='<div class="a33-empty">先选一个流程。</div>';edgesEl.innerHTML='';st.textContent='0 / 2 条';fromSel.disabled=toSel.disabled=true;return;}
    fromSel.disabled=toSel.disabled=false;
    const edges=a.edges||[];
    line.innerHTML=f.steps.map((s,i)=>{
      const targets=edges.filter(e=>Number(e.from)===i);
      return `<span class="a33-node${targets.length?' hot':''}">${s}</span>`+(i<f.steps.length-1?'<i class="a33-ar">→</i>':'');
    }).join('')+'<div class="a33-extra">'+edges.map(e=>`<span class="a33-e ${e.t}">${f.steps[+e.from]} ⇢ ${f.steps[+e.to]}</span>`).join('')+'</div>';
    edgesEl.innerHTML=edges.map((e,i)=>`<div class="a33-row"><b>${TYPES.find(t=>t.k===e.t).n}</b>
      <span>${f.steps[+e.from]} → ${f.steps[+e.to]}</span><em>${api.esc(e.why)}</em><button data-del="${i}">×</button></div>`).join('');
    edgesEl.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{a.edges.splice(+b.dataset.del,1);api.save();paint();api.refresh();});
    const valid=edges.filter(e=>(e.why||'').length>=8).length;
    st.textContent=valid+' / 2 条';
  }
  sec.querySelector('#addEdge').onclick=()=>{
    const f=flow();if(!f)return;
    const from=+fromSel.value,to=+toSel.value,t=typeSel.value,why=whyIn.value.trim();
    if(from===to){api.toast('起点和终点不能是同一步');return;}
    if((a.edges||[]).some(e=>e.from===from&&e.to===to)){api.toast('这条已经有了');return;}
    if(why.length<8){api.toast('先写"改变了什么"（≥8 字）');return;}
    a.edges.push({from:from,to:to,t:t,why:why});
    whyIn.value='';api.save();paint();api.refresh();api.toast('已加上');
  };
  sec.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{a.flow=b.dataset.f;a.edges=[];api.save();fillSelects();paint();});
  sec.querySelector('#bReset').onclick=()=>{a.edges=[];api.save();paint();api.refresh();};
  fillSelects();paint();
},
hint(S){const n=(S.answers.edges||[]).filter(e=>(e.why||'').length>=8).length;return n>=2?'':'还差 '+(2-n)+' 条有效连接';},
gate(S){return (S.answers.edges||[]).filter(e=>(e.why||'').length>=8).length>=2;}},

/* ---------- 4 在你的事上 ---------- */
{id:'mine',name:'在你的事上',short:'在你的事',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>你的流程，<em>改一条连接</em></h1></div>
<div class="grid2">
  <div class="panel"><div class="panel-h"><h4>① 流程</h4><span>≥6 字</span></div>
    <div class="field"><input id="proc" maxlength="30" placeholder="例如：客户投诉处理"></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">② 要改哪条连接</h4><span>≥12 字</span></div>
    <div class="field"><textarea id="edge" maxlength="60" placeholder="从…到…，原来是…现在改成…"></textarea></div></div>
  <div class="panel"><div class="panel-h"><h4>③ 瓶颈会移到哪</h4><span>≥10 字</span></div>
    <div class="field"><textarea id="bottleneck" maxlength="60" placeholder="松开这里，下一处会在哪堵"></textarea></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">④ 谁的工作量变了</h4><span>≥8 字</span></div>
    <div class="field"><input id="load" maxlength="50" placeholder="一个岗位"></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  ['proc','edge','bottleneck','load'].forEach(k=>{const el=sec.querySelector('#'+k);el.value=a[k]||'';el.addEventListener('input',()=>{a[k]=el.value;api.save();api.refresh();});});
},
hint(S){const a=S.answers;if((a.proc||'').length<6)return '写流程';if((a.edge||'').length<12)return '没写改哪条连接';if((a.bottleneck||'').length<10)return '没写瓶颈移到哪';if((a.load||'').length<8)return '没写谁的工作量变了';return '';},
gate(S){const a=S.answers;return !!((a.proc||'').length>=6&&(a.edge||'').length>=12&&(a.bottleneck||'').length>=10&&(a.load||'').length>=8);}},

/* ---------- 5 提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 产出',
html:`
<div class="step-h"><h1>交一张<em>流程卡</em></h1></div>
<div class="grid2" style="align-items:start">
  <div id="cardSlot"></div>
  <div class="panel"><div class="panel-h"><h4>补一句</h4><span>会被同事看到</span></div>
    <div class="field"><label>最可能失败在哪一步</label><textarea id="risk" maxlength="50" placeholder="以及怎么提前发现"></textarea></div>
    <div class="row" style="margin-top:10px"><button class="btn primary" id="subBtn">提交</button><button class="btn" id="export2">导出 PNG</button></div>
    <div class="hint" id="subSt" style="margin-top:8px">未提交</div></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const slot=sec.querySelector('#cardSlot'),risk=sec.querySelector('#risk'),btn=sec.querySelector('#subBtn'),st=sec.querySelector('#subSt');
  function paint(){
    risk.value=a.risk||'';
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A33</span><span>流程卡</span></div>'+
      '<h5>'+api.esc(a.proc||'我的流程')+'</h5><div class="kv">'+
      [['改的连接',a.edge],['瓶颈移向',a.bottleneck],['工作量变化',a.load],['最可能失败',a.risk]]
      .map(r=>'<div><b>'+r[0]+'</b><span class="'+(r[1]?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+'</div></div>';
    st.textContent=S.submitted?'已提交':'未提交';btn.disabled=!!S.submitted;btn.textContent=S.submitted?'已提交':'提交';
  }
  risk.addEventListener('input',()=>{a.risk=risk.value;api.save();paint();api.refresh();});
  btn.onclick=async()=>{await api.submit();paint();};
  sec.querySelector('#export2').onclick=()=>api.exportCard();
  paint();
},
hint(S){return (S.answers.risk||'').length>=4?'':'写一句"最可能失败"';},
gate(S){return (S.answers.risk||'').length>=4;}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>改连接，比改步骤便宜，也更难收场</h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 瓶颈会移动</div><p class="small" style="margin-top:5px">松开的堵点，会在下一处重新出现。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 责任会重排</div><p class="small" style="margin-top:5px">谁多干了一件，要提前说，不然会被抵制。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 数据会断</div><p class="small" style="margin-top:5px">原来靠那一步产生的记录，改完谁来记。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A34</span></div>
<p class="small">A34 · 流程创新：组织落地。同一条流程，为什么在 A 部门能跑通、在 B 部门就卡住。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '这条连接改掉之后，谁的工作量变了？',
 '瓶颈会移到哪一步？',
 '原来的记录现在谁在记？',
 '如果只改一条连接，你改哪条？',
 '谁会因为这条改动被追责？'
]},

card(S){
  const a=S.answers||{};
  return {title:'A33 · 流程卡',rows:[
    ['流程',a.proc||'—'],['改的连接',a.edge||'—'],['瓶颈移向',a.bottleneck||'—'],['工作量变化',a.load||'—'],['最可能失败',a.risk||'—']
  ]};
},
notes:[
 {t:'本节目标',h:'让学员把工具从产品搬到流程上，理解"改连接=改系统"。'},
 {t:'时间分配',h:'先猜 5′ · 概念 8′ · 改连接 15′ · 在你的事 12′ · 提交 5′。'},
 {t:'常见卡点',h:'学员会去删步骤。提醒：删除是减法，加/改连接才是流程创新。'},
 {t:'直播怎么接',h:'看全班"瓶颈移向"写在哪，如果都写"不知道"，就讲系统视角三条。'},
 {t:'和 A17–A20 的关系',h:'A17–A20 讲"挪一步"，A33 讲"改连接"，A34 讲"为什么落不了地"。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A33']=L;
})();
