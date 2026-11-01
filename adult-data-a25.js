/* A25 · 属性关联：内部变量与外部变量 */
(function(){
'use strict';
const OBJ={
 k:'car',n:'一把办公椅',
 internal:['座高','靠背角度','扶手高度','材质','颜色','轮子'],
 external:['使用者身高','使用时长','房间温度','地面材质','会议/独处']
};
const CELLS=[];
OBJ.external.forEach(e=>{OBJ.internal.forEach(i=>{CELLS.push({i:i,e:e});});});

const L={
id:'A25',week:7,seq:25,title:'属性关联：内部变量与外部变量',
kicker:'WEEK 7 · 属性关联',tool:'ad',toolName:'属性关联',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>安全气囊，<em>跟什么绑在一起</em></h1>
<p>气囊不是"更好地保护人"，它只做了一件事：让"是否弹出"跟一个变量绑定。</p></div>
<div class="opts" style="margin-bottom:12px">
<button class="opt" data-h="a"><span class="k">A</span><span><b>跟车速绑定：超过 30km/h 就弹</b><span>速度触发</span></span></button>
<button class="opt" data-h="b"><span class="k">B</span><span><b>跟驾驶员体重绑定：重的人多弹一点</b><span>体重触发</span></span></button>
<button class="opt" data-h="c"><span class="k">C</span><span><b>跟是否系安全带反向绑定：没系才弹</b><span>反向依存</span></span></button>
</div>
<div id="hookOut"></div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#hookOut');
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',S.answers.hook===b.dataset.h));
    if(S.answers.hook){
      const ok=S.answers.hook==='a';
      out.innerHTML='<div class="panel" style="border-color:'+(ok?'rgba(78,159,110,.4)':'rgba(216,154,60,.4)')+';background:'+(ok?'rgba(78,159,110,.07)':'rgba(216,154,60,.06)')+'">'+
        '<p class="small" style="font-size:12px">'+(ok?'对。<b>弹出与否，被绑在"减速度/车速"这个外部变量上</b>。它没有变得更"强"，只是变得"会看情况"。':'最典型的是 A：<b>减速到某个阈值才弹</b>。属性关联的本质就是这句——让一个变量的取值，跟着另一个变量走。')+'</p></div>';
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
<div class="step-h"><h1>让 A 跟着 B 变</h1>
<p>属性关联有两种：内部变量之间互相绑，或者内部变量绑到一个外部变量上。后者更容易出新东西。</p></div>
<div class="grid2" style="margin-bottom:12px">
  <div class="panel"><div class="panel-h"><h4>内部 × 内部</h4><span>产品自己跟自己绑</span></div>
    <p class="small">靠背角度 ↔ 座高：靠背一躺，座位自动降低。<br>
    <b>好处</b>：结构上的巧思。<b>局限</b>：不改变谁会买。</p></div>
  <div class="panel"><div class="panel-h"><h4>内部 × 外部</h4><span>绑到用户/环境</span></div>
    <p class="small">座高 ↔ 使用者身高：一坐上去自动调。<br>
    <b>好处</b>：产生新用户、新场景。<b>难点</b>：外部变量要能测到。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>三条判据</h4><span>缺一条就还是"可调"</span></div>
<div class="stack">
  <div><b style="font-size:11px;color:var(--ink)">① 外部变量测得到吗</b><p class="small" style="margin-top:2px">身高能测（压力/红外），心情测不到——测不到就绑不上。</p></div>
  <div><b style="font-size:11px;color:var(--ink)">② 变化方向说得清吗</b><p class="small" style="margin-top:2px">"身高越高，座高越高"是一句可验证的话；"更舒服"不是。</p></div>
  <div><b style="font-size:11px;color:var(--ink)">③ 用户要做什么</b><p class="small" style="margin-top:2px">最好是他什么都不用做，坐上去就发生。</p></div>
</div></div>`,
init(){},hint(){return '';},gate(){return true;}},

/* ---------- 3 关联矩阵 ---------- */
{id:'matrix',name:'矩阵',short:'矩阵',kicker:'STEP 3 · 关联矩阵',
html:`
<div class="step-h"><h1>在<em>矩阵</em>里点三个格子</h1>
<p>横轴是外部变量，纵轴是内部属性。点一个格子，就建立一条依存，然后写清"当…变化时，…怎么变"。</p></div>
<div class="bench">
  <div class="bench-h"><b>DEPENDENCY · 办公椅</b><span class="st" id="mSt">0 / 3 条依存</span></div>
  <div class="bench-b" style="overflow:auto">
    <div class="a25-mx" id="mx"></div>
    <div id="deps" class="a25-deps"></div>
  </div>
  <div class="bench-f"><span class="small">先点格子，再写一句"当…时…"；写满 3 条解锁。</span><div style="flex:1"></div><button class="btn sm ghost" id="mReset">重来</button></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;a.deps=a.deps||{};
  const mx=sec.querySelector('#mx'),depsEl=sec.querySelector('#deps'),st=sec.querySelector('#mSt');
  let sel=null;
  function paint(){
    mx.innerHTML='<div class="a25-corner"></div>'+OBJ.external.map(e=>`<div class="a25-hx">${e}</div>`).join('')+
      OBJ.internal.map(i=>`<div class="a25-hy">${i}</div>`+OBJ.external.map(e=>{
        const key=i+'|'+e, has=a.deps[key], on=sel===key;
        return `<button class="a25-cell${has?' has':''}${on?' sel':''}" data-k="${key}" title="${i} × ${e}">${has?'●':''}</button>`;
      }).join('')).join('');
    mx.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{sel=b.dataset.k;paint();renderDeps();});
    const n=Object.keys(a.deps||{}).filter(k=>(a.deps[k]||'').length>=8).length;
    st.textContent=n+' / 3 条依存';
    api.refresh();
  }
  function renderDeps(){
    const keys=Object.keys(a.deps||{});
    const cur=sel&&!a.deps[sel]?`<div class="a25-edit"><div class="a25-eh">${sel.replace('|',' × ')}</div>
      <input id="depIn" maxlength="40" placeholder="当…时，…怎么变（≥8 字）"><button class="btn sm" id="depAdd">记下</button></div>`:'';
    depsEl.innerHTML=cur+keys.map(k=>`<div class="a25-dep"><b>${k.replace('|',' × ')}</b><span>${api.esc(a.deps[k])}</span><button data-del="${k}">×</button></div>`).join('');
    const inp=depsEl.querySelector('#depIn');
    if(inp){
      inp.focus();
      const add=()=>{const v=inp.value.trim();if(v.length<8)return;a.deps[sel]=v;api.save();sel=null;paint();renderDeps();};
      depsEl.querySelector('#depAdd').onclick=add;
      inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();add();}});
    }
    depsEl.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{delete a.deps[b.dataset.del];api.save();paint();renderDeps();});
  }
  sec.querySelector('#mReset').onclick=()=>{a.deps={};sel=null;api.save();paint();renderDeps();};
  paint();renderDeps();
},
hint(S){const n=Object.keys(S.answers.deps||{}).filter(k=>(S.answers.deps[k]||'').length>=8).length;return n>=3?'':'还差 '+(3-n)+' 条依存';},
gate(S){return Object.keys(S.answers.deps||{}).filter(k=>(S.answers.deps[k]||'').length>=8).length>=3;}},

/* ---------- 4 在你的事上 ---------- */
{id:'mine',name:'在你的事上',short:'在你的事',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>你的产品，<em>绑一个外部变量</em></h1></div>
<div class="grid2">
  <div class="panel"><div class="panel-h"><h4>① 内部属性</h4><span>≥2 字</span></div>
    <div class="field"><input id="inner" maxlength="20" placeholder="例如：推送频率"></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">② 外部变量</h4><span>≥2 字，且测得到</span></div>
    <div class="field"><input id="outer" maxlength="20" placeholder="例如：用户当天已读消息数"></div></div>
  <div class="panel"><div class="panel-h"><h4>③ 依存规则</h4><span>≥12 字</span></div>
    <div class="field"><textarea id="rule" maxlength="60" placeholder="当外部变量变大时，内部属性怎么变"></textarea></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">④ 用户要做什么</h4><span>≥6 字</span></div>
    <div class="field"><input id="action" maxlength="40" placeholder="最好是什么都不用做"></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  ['inner','outer','rule','action'].forEach(k=>{const el=sec.querySelector('#'+k);el.value=a[k]||'';el.addEventListener('input',()=>{a[k]=el.value;api.save();api.refresh();});});
},
hint(S){const a=S.answers;if((a.inner||'').length<2)return '写内部属性';if((a.outer||'').length<2)return '写外部变量';if((a.rule||'').length<12)return '依存规则没写够';if((a.action||'').length<6)return '没写用户要做什么';return '';},
gate(S){const a=S.answers;return !!((a.inner||'').length>=2&&(a.outer||'').length>=2&&(a.rule||'').length>=12&&(a.action||'').length>=6);}},

/* ---------- 5 提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 产出',
html:`
<div class="step-h"><h1>交一张<em>依存卡</em></h1></div>
<div class="grid2" style="align-items:start">
  <div id="cardSlot"></div>
  <div class="panel"><div class="panel-h"><h4>补一句</h4><span>会被同事看到</span></div>
    <div class="field"><label>这个外部变量如果测不准，会出什么问题</label><textarea id="risk" maxlength="50" placeholder="误判时产品会怎么错"></textarea></div>
    <div class="row" style="margin-top:10px"><button class="btn primary" id="subBtn">提交</button><button class="btn" id="export2">导出 PNG</button></div>
    <div class="hint" id="subSt" style="margin-top:8px">未提交</div></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const slot=sec.querySelector('#cardSlot'),risk=sec.querySelector('#risk'),btn=sec.querySelector('#subBtn'),st=sec.querySelector('#subSt');
  function paint(){
    risk.value=a.risk||'';
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A25</span><span>依存卡</span></div>'+
      '<h5>'+api.esc(a.inner||'我的依存')+'</h5><div class="kv">'+
      [['内部属性',a.inner],['外部变量',a.outer],['规则',a.rule],['用户动作',a.action],['误判风险',a.risk]]
      .map(r=>'<div><b>'+r[0]+'</b><span class="'+(r[1]?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+'</div></div>';
    st.textContent=S.submitted?'已提交':'未提交';btn.disabled=!!S.submitted;btn.textContent=S.submitted?'已提交':'提交';
  }
  risk.addEventListener('input',()=>{a.risk=risk.value;api.save();paint();api.refresh();});
  btn.onclick=async()=>{await api.submit();paint();};
  sec.querySelector('#export2').onclick=()=>api.exportCard();
  paint();
},
hint(S){return (S.answers.risk||'').length>=4?'':'写一句误判风险';},
gate(S){return (S.answers.risk||'').length>=4;}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>最像"设计"的那个工具</h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 能测才绑</div><p class="small" style="margin-top:5px">外部变量测不到，依存就是空话。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 方向要明确</div><p class="small" style="margin-top:5px">"越高越…"能验证；"更舒服"不能。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 用户不做动作</div><p class="small" style="margin-top:5px">要用户手动切换的，只是"设置"，不是依存。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A26</span></div>
<p class="small">A26 · 属性关联：关联矩阵。把 6 个外部变量 × 6 个内部属性铺开，系统性地找 36 个可能。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '这个外部变量，真的测得到吗？',
 '用户需要手动切换吗？要的话还叫依存吗？',
 '变量往反方向走时，产品会怎样？',
 '绑错了会伤害谁？',
 '这个依存能不能被一眼看出来？'
]},

card(S){
  const a=S.answers||{};
  return {title:'A25 · 依存卡',rows:[
    ['内部属性',a.inner||'—'],['外部变量',a.outer||'—'],['规则',a.rule||'—'],['用户动作',a.action||'—'],['误判风险',a.risk||'—']
  ]};
},
notes:[
 {t:'本节目标',h:'让学员分清内部×内部、内部×外部两种依存，并能写出一条可验证的依存规则。'},
 {t:'时间分配',h:'先猜 5′ · 概念 8′ · 矩阵 15′ · 在你的事 10′ · 提交 5′。'},
 {t:'常见卡点',h:'学员会写"更智能地调节"。追问：调什么、跟什么调、怎么测。'},
 {t:'直播怎么接',h:'看矩阵里大家点的格子集中在哪一行，现场讨论那一行为什么被忽略。'},
 {t:'和 A26 的关系',h:'A26 把矩阵铺满，做系统搜索；本节先学会写一条。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A25']=L;
})();
