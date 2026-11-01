/* A39 · 项目：双过滤 */
(function(){
'use strict';
const TOOLN={sub:'减法',mul:'乘法',div:'除法',tu:'一专多能',ad:'属性关联'};
function load(){
  try{
    const A=JSON.parse(localStorage.getItem('fxm_adult_v1')||'{}');
    const L=A.lessons||{};
    const s38=(L.A38&&L.A38.answers)||{};
    const s37=(L.A37&&L.A37.answers)||{};
    const items=s38.items||{};
    const picks=(s38.picks||[]).map(k=>({k:k,tool:TOOLN[k.split('_')[0]]||'',text:items[k]||''})).filter(x=>x.text);
    return {topic:s37.topic||'',picks:picks};
  }catch(e){return {topic:'',picks:[]};}
}
const D=load();

const L={
id:'A39',week:10,seq:39,title:'项目：双过滤',
kicker:'WEEK 10 · 毕业项目',tool:'mind',toolName:'项目',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>十个产品，<em>为什么最后只留一个</em></h1>
<p>双过滤不是选"最好的"，是选<b>同时过两道门</b>的。市场门问"谁付钱"，执行门问"明天能不能做"。</p></div>
<div class="opts" style="margin-bottom:12px">
<button class="opt" data-h="a"><span class="k">A</span><span><b>选市场分最高的</b><span>需求优先</span></span></button>
<button class="opt" data-h="b"><span class="k">B</span><span><b>选两门都过、且执行分不低于 3 的</b><span>双门</span></span></button>
<button class="opt" data-h="c"><span class="k">C</span><span><b>选最容易做的</b><span>先跑起来</span></span></button>
</div>
<div id="hookOut"></div>
<div class="panel" style="margin-top:12px"><div class="panel-h"><h4>你的三个候选</h4><span>来自 A38</span></div>
<p class="small">${D.picks.length?D.picks.map(x=>'<b style="color:#E9E7E2">'+esc0(x.tool)+'</b>　'+esc0(x.text)).join('<br>'):'<span style="color:#C9A227">还没在 A38 选出三个——可以在下面自己写三个候选。</span>'}</p></div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#hookOut');
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',S.answers.hook===b.dataset.h));
    if(S.answers.hook){
      const ok=S.answers.hook==='b';
      out.innerHTML='<div class="panel" style="border-color:'+(ok?'rgba(78,159,110,.4)':'rgba(216,154,60,.4)')+';background:'+(ok?'rgba(78,159,110,.07)':'rgba(216,154,60,.06)')+'">'+
        '<p class="small" style="font-size:12px">'+(ok?'对。<b>两道门都要过</b>。市场 5 分、执行 1 分的那条，是"很好但做不出来"；反过来是"能做但没人要"。':'答案是 B。<b>市场高执行低 = 空想，执行高市场低 = 白干。</b>双过滤的意义是让你在两个方向上都失败一次，而不是在一个方向上自我说服。')+'</p></div>';
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
<div class="step-h"><h1>两道门，六个问题</h1></div>
<div class="grid2" style="margin-bottom:12px">
  <div class="panel"><div class="panel-h"><h4>市场门</h4><span>谁会付钱</span></div>
    <div class="stack">
      <div><b style="font-size:11px;color:var(--ink)">① 谁掏钱</b><p class="small" style="margin-top:2px">具体到岗位或人群，不是"企业"。 </p></div>
      <div><b style="font-size:11px;color:var(--ink)">② 他现在怎么解决</b><p class="small" style="margin-top:2px">说不出替代方案，说明痛感不够。</p></div>
      <div><b style="font-size:11px;color:var(--ink)">③ 多久能验证</b><p class="small" style="margin-top:2px">超过三个月的验证，课内做不完。</p></div>
    </div></div>
  <div class="panel"><div class="panel-h"><h4>执行门</h4><span>明天能不能做</span></div>
    <div class="stack">
      <div><b style="font-size:11px;color:var(--ink)">④ 能不能做出来</b><p class="small" style="margin-top:2px">现有能力 + 现有资源，不算"招个人就行"。</p></div>
      <div><b style="font-size:11px;color:var(--ink)">⑤ 最大障碍</b><p class="small" style="margin-top:2px">钱、人、法规、习惯，选一个最主要的。</p></div>
      <div><b style="font-size:11px;color:var(--ink)">⑥ 谁维护</b><p class="small" style="margin-top:2px">做出来没人管，三个月就废。</p></div>
    </div></div>
</div>
<div class="panel"><div class="panel-h"><h4>判定规则</h4><span>就一条</span></div>
<p class="small">两门都 ≥3 分才算"过"。过门的多于一个时，选<b>执行分更高</b>的——因为课内要的是"能动手"，不是"最漂亮"。</p></div>`,
init(){},hint(){return '';},gate(){return true;}},

/* ---------- 3 双过滤 ---------- */
{id:'filter',name:'双过滤',short:'过滤',kicker:'STEP 3 · 双过滤',
html:`
<div class="step-h"><h1>三条候选，<em>各过两道门</em></h1>
<p>每条都要填：谁掏钱（≥4 字）、现在怎么解决（≥6 字）、最大障碍（选一个），再打两个分。</p></div>
<div class="bench">
  <div class="bench-h"><b>FILTER · 市场 × 执行</b><span class="st" id="fSt">0 / 3 条</span></div>
  <div class="bench-b" style="overflow:auto"><div class="a39-list" id="list"></div></div>
  <div class="bench-f"><span class="small">两门都 ≥3 才算过；下面会给排序。</span><div style="flex:1"></div><button class="btn sm ghost" id="fReset">重来</button></div>
</div>`,
init(sec,api){
  const S=api.S;S.answers.cands=S.answers.cands||D.picks.map(p=>({text:p.text,tool:p.tool})).concat(D.picks.length?[]:[{text:'',tool:''},{text:'',tool:''},{text:'',tool:''}]);
  S.answers.cands=S.answers.cands.slice(0,3);
  while(S.answers.cands.length<3)S.answers.cands.push({text:'',tool:''});
  const list=sec.querySelector('#list'),st=sec.querySelector('#fSt');
  const BLOCK=['钱','人','法规','习惯'];
  function paint(){
    list.innerHTML=S.answers.cands.map((c,i)=>`<div class="a39-card">
      <div class="a39-h"><b>候选 ${i+1}</b><span>${c.tool?api.esc(c.tool):''}</span></div>
      <input class="a39-t" data-t="${i}" maxlength="46" value="${api.esc(c.text||'')}" placeholder="这条产品是什么（≥6 字）">
      <div class="a39-g2">
        <input data-who="${i}" maxlength="20" value="${api.esc(c.who||'')}" placeholder="谁掏钱（≥4 字）">
        <input data-now="${i}" maxlength="30" value="${api.esc(c.now||'')}" placeholder="现在怎么解决（≥6 字）">
      </div>
      <div class="a39-block">${BLOCK.map(b=>`<button class="${c.block===b?'on':''}" data-b="${i}" data-v="${b}">${b}</button>`).join('')}</div>
      <div class="a39-sc">
        <div><span>市场</span>${[1,2,3,4,5].map(v=>`<button class="${(c.mkt||0)>=v?'on':''}" data-s="${i}" data-k="mkt" data-v="${v}">${v}</button>`).join('')}</div>
        <div><span>执行</span>${[1,2,3,4,5].map(v=>`<button class="${(c.exe||0)>=v?'on':''}" data-s="${i}" data-k="exe" data-v="${v}">${v}</button>`).join('')}</div>
      </div>
    </div>`).join('')+`<div class="a39-rank" id="rank"></div>`;
    list.querySelectorAll('[data-t]').forEach(el=>el.oninput=()=>{S.answers.cands[+el.dataset.t].text=el.value;api.save();api.refresh();});
    list.querySelectorAll('[data-who]').forEach(el=>el.oninput=()=>{S.answers.cands[+el.dataset.who].who=el.value;api.save();api.refresh();});
    list.querySelectorAll('[data-now]').forEach(el=>el.oninput=()=>{S.answers.cands[+el.dataset.now].now=el.value;api.save();api.refresh();});
    list.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{S.answers.cands[+b.dataset.b].block=b.dataset.v;api.save();paint();api.refresh();});
    list.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{
      const i=+b.dataset.s,k=b.dataset.k;S.answers.cands[i][k]=+b.dataset.v;api.save();paint();api.refresh();
    });
    const done=S.answers.cands.filter(c=>(c.text||'').length>=6&&(c.who||'').length>=4&&(c.now||'').length>=6&&c.block&&c.mkt&&c.exe);
    st.textContent=done.length+' / 3 条';
    const rank=list.querySelector('#rank');
    if(done.length){
      const passed=done.map(c=>({c:c,m:Math.min(c.mkt,c.exe)})).filter(x=>x.m>=3);
      const pick=passed.sort((a,b)=>b.c.exe-a.c.exe)[0];
      rank.innerHTML=pick?'<div class="a39-pass"><b>建议主推：'+api.esc(pick.c.text)+'</b><br>'+
        '<span>市场 '+pick.c.mkt+' / 执行 '+pick.c.exe+'　两门都过，执行更高——课内能动手。</span></div>'
        :'<div class="a39-fail"><b>三条都没过门。</b><br><span>最常见的补救：把市场分最低的一条，换一个更具体的人群再算一次。</span></div>'+
          done.map(c=>'<div class="a39-rr">'+api.esc(c.text)+'　市场 '+c.mkt+'　执行 '+c.exe+'</div>').join('');
    }else rank.innerHTML='<div class="a39-pass dim">三条都填完，这里会给建议。</div>';
  }
  sec.querySelector('#fReset').onclick=()=>{S.answers.cands=[{},{},{}];api.save();paint();api.refresh();};
  paint();
},
hint(S){const n=(S.answers.cands||[]).filter(c=>(c.text||'').length>=6&&(c.who||'').length>=4&&(c.now||'').length>=6&&c.block&&c.mkt&&c.exe).length;return n>=3?'':'还差 '+(3-n)+' 条';},
gate(S){return (S.answers.cands||[]).filter(c=>(c.text||'').length>=6&&(c.who||'').length>=4&&(c.now||'').length>=6&&c.block&&c.mkt&&c.exe).length>=3;}},

/* ---------- 4 决定 ---------- */
{id:'decide',name:'决定',short:'决定',kicker:'STEP 4 · 决定',
html:`
<div class="step-h"><h1>选一个主推，<em>一个备选</em></h1></div>
<div class="grid2">
  <div class="panel"><div class="panel-h"><h4>① 主推哪条</h4><span>≥6 字</span></div>
    <div class="field"><input id="main" maxlength="46" placeholder="复制上面一条"></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">② 为什么是它</h4><span>≥15 字</span></div>
    <div class="field"><textarea id="why" maxlength="70" placeholder="两门哪一门更强，强在哪"></textarea></div></div>
  <div class="panel"><div class="panel-h"><h4>③ 备选哪条、什么时候启用</h4><span>≥15 字</span></div>
    <div class="field"><textarea id="backup" maxlength="70" placeholder="主推卡住时，什么条件下换成它"></textarea></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">④ 放弃的那条，放弃理由</h4><span>≥10 字</span></div>
    <div class="field"><textarea id="drop" maxlength="60" placeholder="哪一门没过，为什么救不回来"></textarea></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  ['main','why','backup','drop'].forEach(k=>{const el=sec.querySelector('#'+k);el.value=a[k]||'';el.addEventListener('input',()=>{a[k]=el.value;api.save();api.refresh();});});
},
hint(S){const a=S.answers;if((a.main||'').length<6)return '写主推';if((a.why||'').length<15)return '为什么是它没写够';if((a.backup||'').length<15)return '备选没写够';if((a.drop||'').length<10)return '放弃理由没写够';return '';},
gate(S){const a=S.answers;return !!((a.main||'').length>=6&&(a.why||'').length>=15&&(a.backup||'').length>=15&&(a.drop||'').length>=10);}},

/* ---------- 5 提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 产出',
html:`
<div class="step-h"><h1>交一张<em>项目决策卡</em></h1></div>
<div class="grid2" style="align-items:start">
  <div id="cardSlot"></div>
  <div class="panel"><div class="panel-h"><h4>补一句</h4><span>会被同事看到</span></div>
    <div class="field"><label>如果 30 天后只能证明一件事，你证明什么</label><textarea id="prove" maxlength="60" placeholder="一句可验证的话"></textarea></div>
    <div class="row" style="margin-top:10px"><button class="btn primary" id="subBtn">提交</button><button class="btn" id="export2">导出 PNG</button></div>
    <div class="hint" id="subSt" style="margin-top:8px">未提交</div></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const slot=sec.querySelector('#cardSlot'),pr=sec.querySelector('#prove'),btn=sec.querySelector('#subBtn'),st=sec.querySelector('#subSt');
  function paint(){
    pr.value=a.prove||'';
    const c=(a.cands||[]).find(x=>x.text===a.main)||{};
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A39</span><span>项目决策卡</span></div>'+
      '<h5>'+api.esc(a.main||'我的主推')+'</h5><div class="kv">'+
      [['市场/执行',(c.mkt||'-')+' / '+(c.exe||'-')],['为什么是它',a.why],['备选',a.backup],['放弃理由',a.drop],['30 天证明',a.prove]]
      .map(r=>'<div><b>'+r[0]+'</b><span class="'+(r[1]?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+'</div></div>';
    st.textContent=S.submitted?'已提交':'未提交';btn.disabled=!!S.submitted;btn.textContent=S.submitted?'已提交':'提交';
  }
  pr.addEventListener('input',()=>{a.prove=pr.value;api.save();paint();api.refresh();});
  btn.onclick=async()=>{await api.submit();paint();};
  sec.querySelector('#export2').onclick=()=>api.exportCard();
  paint();
},
hint(S){return (S.answers.prove||'').length>=4?'':'写一句"30 天证明什么"';},
gate(S){return (S.answers.prove||'').length>=4;}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>最后一节：<em>三分钟讲清它</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 两门都过</div><p class="small" style="margin-top:5px">市场高执行低是空想，反过来是白干。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 同分看执行</div><p class="small" style="margin-top:5px">课内要的是能动手，不是最漂亮。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 留一个备选</div><p class="small" style="margin-top:5px">主推卡住时，你知道换哪个。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A40</span></div>
<p class="small">A40 · 路演与认证。三分钟讲清一个产品，加上整门课的结业判定。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '谁会掏钱？说出一个岗位。',
 '他现在怎么解决？',
 '最大障碍是钱、人、法规还是习惯？',
 '做出来谁维护？',
 '30 天后你想证明什么？'
]},

card(S){
  const a=S.answers||{};
  return {title:'A39 · 项目决策卡',rows:[
    ['主推',a.main||'—'],['为什么',a.why||'—'],['备选',a.backup||'—'],['放弃理由',a.drop||'—'],['30 天证明',a.prove||'—']
  ]};
},
notes:[
 {t:'本节目标',h:'让学员用市场/执行两道门，从三个候选里选出主推与备选。'},
 {t:'时间分配',h:'先猜 4′ · 概念 6′ · 双过滤 20′ · 决定 10′ · 提交 5′。'},
 {t:'常见卡点',h:'学员会给三条都打 4–5 分。要求至少一条有一门 ≤2，逼出真实判断。'},
 {t:'直播怎么接',h:'看有多少"市场 5 执行 2"的卡，现场问：这条你下周能动手吗？'},
 {t:'和 A40 的关系',h:'A39 选出来的主推，就是 A40 路演的内容。'}
]};

function esc0(s){return String(s||'').replace(/[<>&]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]));}

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A39']=L;
})();
