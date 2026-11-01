/* A37 · 项目：选题与组件盘点 */
(function(){
'use strict';
const CRIT=[
 {k:'see',n:'你每天见得到',d:'不是"听说过"，是你今天见过它、用过它。'},
 {k:'pay',n:'有人愿意付钱',d:'能指出一个会掏钱的人或部门。'},
 {k:'test',n:'30 天能验证',d:'不用等到明年，一个月内能拿到反馈。'}
];
const DIM=[{k:'obj',n:'物'},{k:'ppl',n:'人'},{k:'info',n:'信息'},{k:'place',n:'场地'}];

function loadHistory(){
  try{
    const A=JSON.parse(localStorage.getItem('fxm_adult_v1')||'{}');
    const L=A.lessons||{};
    const pick=(id,keys)=>{
      const s=L[id]&&L[id].answers;if(!s)return '';
      for(const k of keys){if(s[k]&&typeof s[k]==='string')return s[k];}
      return '';
    };
    return [
      ['A11 减法',pick('A11',['obj','sentence','forward'])],
      ['A15 乘法',pick('A15',['obj','formText','scene'])],
      ['A19 重排',pick('A19',['proc','name','flow'])],
      ['A23 一专多能',pick('A23',['obj','plan'])],
      ['A25 依存',pick('A25',['inner','rule'])],
      ['A32 机会',pick('A32',['weak','make'])]
    ].filter(x=>x[1]);
  }catch(e){return [];}
}

const L={
id:'A37',week:10,seq:37,title:'项目：选题与组件盘点',
kicker:'WEEK 10 · 毕业项目',tool:'mind',toolName:'项目',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>毕业项目最常见的死法：<em>题目选大了</em></h1>
<p>十周下来，工具都会了。真正卡住人的是选题——"公司数字化转型"这种题目，做到第三周就写不下去了。</p></div>
<div class="opts" style="margin-bottom:12px">
<button class="opt" data-h="a"><span class="k">A</span><span><b>选一个足够大的题目，才有创新空间</b><span>格局要大</span></span></button>
<button class="opt" data-h="b"><span class="k">B</span><span><b>选一个你每天见得到、30 天能验证的小对象</b><span>小而具体</span></span></button>
<button class="opt" data-h="c"><span class="k">C</span><span><b>选老板最关心的战略议题</b><span>容易立项</span></span></button>
</div>
<div id="hookOut"></div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#hookOut');
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',S.answers.hook===b.dataset.h));
    if(S.answers.hook){
      const ok=S.answers.hook==='b';
      out.innerHTML='<div class="panel" style="border-color:'+(ok?'rgba(78,159,110,.4)':'rgba(216,154,60,.4)')+';background:'+(ok?'rgba(78,159,110,.07)':'rgba(216,154,60,.06)')+'">'+
        '<p class="small" style="font-size:12px">'+(ok?'对。<b>小到能看清每个组件</b>，才用得上这五把工具。题目越大，越只能谈战略，谈不了"拿掉哪个零件"。':'答案是 B。题目越大，越落不到组件上；而五个工具全都要求"能指着具体的东西"。<b>小不是格局小，是能落地。</b>')+'</p></div>';
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
<div class="step-h"><h1>选题三问，组件四类</h1></div>
<div class="grid2" style="margin-bottom:12px">
  <div class="panel"><div class="panel-h"><h4>选题三问</h4><span>三问都要过</span></div>
    <div class="stack">${CRIT.map(c=>`<div><b style="font-size:11px;color:var(--ink)">${c.n}</b><p class="small" style="margin-top:2px">${c.d}</p></div>`).join('')}</div></div>
  <div class="panel"><div class="panel-h"><h4>组件四类</h4><span>盘点时别漏</span></div>
    <div class="stack">${DIM.map(d=>`<div><b style="font-size:11px;color:var(--ink)">${d.n}</b></div>`).join('')}
      <p class="small" style="margin-top:6px">至少要盘出 8 个组件，四类都要有。组件必须是"能被单独拆下来的一块"。</p></div></div>
</div>
<div class="panel"><div class="panel-h"><h4>项目路线</h4><span>后面三节</span></div>
<p class="small">A37 选题目 + 盘组件 → A38 用五个工具各出一个虚拟产品 → A39 双过滤留下三个 → A40 路演与认证。</p></div>`,
init(){},hint(){return '';},gate(){return true;}},

/* ---------- 3 选题体检 ---------- */
{id:'pick',name:'选题',short:'选题',kicker:'STEP 3 · 选题体检',
html:`
<div class="step-h"><h1>三个候选，<em>过一遍三问</em></h1>
<p>先写三个候选对象（各 ≥4 字），每个用三问打分（1–5），系统算出总分。别急着选最高的，先看哪一问最低。</p></div>
<div class="bench">
  <div class="bench-h"><b>PROJECT · 选题体检</b><span class="st" id="pSt">0 / 3 个候选</span></div>
  <div class="bench-b" style="overflow:auto">
    <div class="a37-cands" id="cands"></div>
    <div class="a37-verdict" id="verdict"></div>
  </div>
  <div class="bench-f"><span class="small">三项都打过分，候选才算完成。</span><div style="flex:1"></div><button class="btn sm ghost" id="pReset">重来</button></div>
</div>`,
init(sec,api){
  const S=api.S;S.answers.cands=S.answers.cands||[{},{},{}];
  const box=sec.querySelector('#cands'),st=sec.querySelector('#pSt'),vd=sec.querySelector('#verdict');
  function paint(){
    box.innerHTML=S.answers.cands.map((c,i)=>`<div class="a37-cand${c.name?' on':''}">
      <div class="a37-ch"><span class="a37-n">候选 ${i+1}</span>
        <input data-name="${i}" maxlength="20" value="${api.esc(c.name||'')}" placeholder="例如：前台登记表"></div>
      <div class="a37-sc">${CRIT.map(k=>`<div class="a37-s"><span>${k.n}</span>
        <div class="a37-dots">${[1,2,3,4,5].map(v=>`<button class="${(c[k.k]||0)>=v?'on':''}" data-i="${i}" data-k="${k.k}" data-v="${v}">${v}</button>`).join('')}</div>
      </div>`).join('')}</div>
    </div>`).join('');
    box.querySelectorAll('[data-name]').forEach(inp=>inp.oninput=()=>{S.answers.cands[+inp.dataset.name].name=inp.value;api.save();api.refresh();});
    box.querySelectorAll('.a37-dots button').forEach(b=>b.onclick=()=>{
      const i=+b.dataset.i;S.answers.cands[i][b.dataset.k]=+b.dataset.v;api.save();paint();api.refresh();
    });
    const done=S.answers.cands.filter(c=>c.name&&c.see&&c.pay&&c.test);
    st.textContent=done.length+' / 3 个候选';
    if(done.length){
      const scored=done.map(c=>({n:c.name,s:(c.see+c.pay+c.test),low:Math.min(c.see,c.pay,c.test),
        lowK:CRIT.slice().sort((a,b)=>c[a.k]-c[b.k])[0].n}));
      scored.sort((a,b)=>b.low-a.low||b.s-a.s);
      vd.innerHTML='<div class="a37-vt"><b>建议先做：'+api.esc(scored[0].n)+'</b>（总分 '+scored[0].s+'，最低一项 '+scored[0].low+'）<br>'+
        '<span>理由：选题先看"最弱那一问"，它决定你会不会在第三周卡住。</span></div>'+
        scored.slice(1).map(x=>'<div class="a37-vr">'+api.esc(x.n)+'　总分 '+x.s+'　最弱：'+x.lowK+'</div>').join('');
    }else vd.innerHTML='<div class="a37-vt dim">三个候选都打完分，这里会给建议。</div>';
  }
  sec.querySelector('#pReset').onclick=()=>{S.answers.cands=[{},{},{}];api.save();paint();api.refresh();};
  paint();
},
hint(S){const n=(S.answers.cands||[]).filter(c=>c.name&&c.see&&c.pay&&c.test).length;return n>=3?'':'还差 '+(3-n)+' 个候选没打分';},
gate(S){return (S.answers.cands||[]).filter(c=>c.name&&c.see&&c.pay&&c.test).length>=3;}},

/* ---------- 4 组件盘点 ---------- */
{id:'inv',name:'组件',short:'组件',kicker:'STEP 4 · 组件盘点',
html:`
<div class="step-h"><h1>把选中的东西，<em>拆成 8 个组件</em></h1>
<p>写下你的题目，然后按四类盘组件。组件是"能被单独拆下来的一块"。</p></div>
<div class="grid2">
  <div class="panel"><div class="panel-h"><h4>① 你的题目</h4><span>≥4 字</span></div>
    <div class="field"><input id="topic" maxlength="24" placeholder="例如：公司前台登记"></div>
    <div class="hint" id="topicHint" style="margin-top:8px">越具体越好：能指着一个人说"他每天都在用"。</div>
    <div class="panel-h" style="margin:14px 0 6px"><h4 style="font-size:9.5px">历史回顾：你之前做过什么</h4><span>自动读取</span></div>
    <div class="a37-hist" id="hist"></div>
  </div>
  <div class="panel"><div class="panel-h"><h4>② 组件盘点</h4><span id="invSt">0 / 8</span></div>
    <div class="chips" id="invChips"></div>
    <div class="row" style="margin-top:8px"><input id="invIn" maxlength="12" placeholder="加一个组件" style="flex:1;background:#0D131C;border:1px solid var(--line2);border-radius:7px;padding:8px 10px;font-size:12px">
      <select id="invDim" style="background:#0D131C;border:1px solid var(--line2);border-radius:7px;padding:8px;font-size:11px;color:var(--dim)">
        ${DIM.map(d=>`<option value="${d.k}">${d.n}</option>`).join('')}</select>
      <button class="btn sm" id="invAdd">加入</button></div>
    <div class="a37-four" id="four"></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;a.comps=a.comps||[];
  const topic=sec.querySelector('#topic'),chips=sec.querySelector('#invChips'),
        invIn=sec.querySelector('#invIn'),dimSel=sec.querySelector('#invDim'),
        four=sec.querySelector('#four'),st=sec.querySelector('#invSt'),hist=sec.querySelector('#hist');
  const h=loadHistory();
  hist.innerHTML=h.length?h.map(x=>`<div class="a37-hrow"><b>${x[0]}</b><span>${api.esc(x[1])}</span></div>`).join('')
    :'<div class="hint">还没做过前面的实战课，不影响这一节。</div>';
  function paint(){
    topic.value=a.topic||'';
    chips.innerHTML=a.comps.map((c,i)=>`<button class="chip on" data-del="${i}">${api.esc(c.n)}<span class="x">×</span></button>`).join('')||'<span class="small">还没加组件</span>';
    const byDim=d=>a.comps.filter(c=>c.d===d);
    four.innerHTML=DIM.map(d=>`<div class="a37-dim"><b>${d.n}</b><span>${byDim(d.k).map(c=>api.esc(c.n)).join('、')||'—'}</span></div>`).join('');
    const n=a.comps.length;st.textContent=n+' / 8';
    chips.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{a.comps.splice(+b.dataset.del,1);api.save();paint();api.refresh();});
    api.refresh();
  }
  function add(){
    const v=invIn.value.trim();if(!v||a.comps.length>=14||a.comps.some(c=>c.n===v))return;
    a.comps.push({n:v,d:dimSel.value});invIn.value='';api.save();paint();
  }
  sec.querySelector('#invAdd').onclick=add;
  invIn.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();add();}});
  topic.addEventListener('input',()=>{a.topic=topic.value;api.save();api.refresh();});
  paint();
},
hint(S){const a=S.answers;if((a.topic||'').length<4)return '先写题目';if((a.comps||[]).length<8)return '组件还差 '+(8-(a.comps||[]).length)+' 个';const dims=new Set((a.comps||[]).map(c=>c.d));if(dims.size<4)return '四类里还有空的';return '';},
gate(S){const a=S.answers;if((a.topic||'').length<4)return false;if((a.comps||[]).length<8)return false;const dims=new Set((a.comps||[]).map(c=>c.d));return dims.size>=4;}},

/* ---------- 5 提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 产出',
html:`
<div class="step-h"><h1>交一张<em>项目立项卡</em></h1></div>
<div class="grid2" style="align-items:start">
  <div id="cardSlot"></div>
  <div class="panel"><div class="panel-h"><h4>补两句</h4><span>会被同事看到</span></div>
    <div class="field"><label>为什么是它（≥10 字）</label><textarea id="why" maxlength="60" placeholder="它每天都在浪费谁的时间"></textarea></div>
    <div class="field"><label>谁最痛（≥6 字）</label><input id="pain" maxlength="30" placeholder="一个岗位"></div>
    <div class="row" style="margin-top:10px"><button class="btn primary" id="subBtn">提交</button><button class="btn" id="export2">导出 PNG</button></div>
    <div class="hint" id="subSt" style="margin-top:8px">未提交</div></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const slot=sec.querySelector('#cardSlot'),why=sec.querySelector('#why'),pain=sec.querySelector('#pain'),
        btn=sec.querySelector('#subBtn'),st=sec.querySelector('#subSt');
  function paint(){
    why.value=a.why||'';pain.value=a.pain||'';
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A37</span><span>项目立项卡</span></div>'+
      '<h5>'+api.esc(a.topic||'我的题目')+'</h5><div class="kv">'+
      [['组件',(a.comps||[]).length+' 个'],['四类',[...new Set((a.comps||[]).map(c=>c.d))].length+' / 4'],
       ['为什么是它',a.why],['谁最痛',a.pain]]
      .map(r=>'<div><b>'+r[0]+'</b><span class="'+(r[1]?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+'</div></div>';
    st.textContent=S.submitted?'已提交':'未提交';btn.disabled=!!S.submitted;btn.textContent=S.submitted?'已提交':'提交';
  }
  ['why','pain'].forEach(k=>{const el=sec.querySelector('#'+k);el.addEventListener('input',()=>{a[k]=el.value;api.save();paint();api.refresh();});});
  btn.onclick=async()=>{await api.submit();paint();};
  sec.querySelector('#export2').onclick=()=>api.exportCard();
  paint();
},
hint(S){const a=S.answers;if((a.why||'').length<10)return '写"为什么是它"';if((a.pain||'').length<6)return '写"谁最痛"';return '';},
gate(S){const a=S.answers;return (a.why||'').length>=10&&(a.pain||'').length>=6;}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>接下来三节，<em>都在这个题目上做</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">A38</div><p class="small" style="margin-top:5px">五个工具各出一个虚拟产品，同一个题目。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">A39</div><p class="small" style="margin-top:5px">双过滤：市场与执行，留下三个。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">A40</div><p class="small" style="margin-top:5px">路演 3 分钟 + 结业认证。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A38</span></div>
<p class="small">把同一组组件，分别交给五个工具，做出五个"不管可不可行"的虚拟产品。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '这个题目，你今天见过它吗？',
 '谁会为它的改变付钱？',
 '30 天内你能拿到什么反馈？',
 '如果只能改一个组件，你改哪个？',
 '这个题目会不会大到你只能谈战略？'
]},

card(S){
  const a=S.answers||{};
  return {title:'A37 · 项目立项卡',rows:[
    ['题目',a.topic||'—'],['组件',(a.comps||[]).length+' 个'],
    ['为什么是它',a.why||'—'],['谁最痛',a.pain||'—']
  ]};
},
notes:[
 {t:'本节目标',h:'让学员选出一个"小而具体、30 天能验证"的项目题目，并盘出 8 个以上组件。'},
 {t:'时间分配',h:'先猜 5′ · 概念 6′ · 选题 12′ · 盘点 15′ · 提交 7′。'},
 {t:'常见卡点',h:'学员会写"公司数字化转型"。追问：你今天见过它的哪一块？'},
 {t:'直播怎么接',h:'挑三个题目现场追问"最弱一问"，让全班判断哪个能落地。'},
 {t:'和后面三节的关系',h:'A37 的题目和组件会被 A38–A40 直接引用，务必在这一节定下来。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A37']=L;
})();
