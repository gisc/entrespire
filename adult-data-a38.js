/* A38 · 项目：十个虚拟产品 */
(function(){
'use strict';
const TOOLS=[
 {k:'sub',n:'减法',ask:'拿掉 {c}，剩下的东西为什么还能成立？'},
 {k:'mul',n:'乘法',ask:'复制 {c}，把复制件改成什么？'},
 {k:'div',n:'除法',ask:'把 {c} 挪到另一个时间或位置，会怎样？'},
 {k:'tu',n:'一专多能',ask:'让 {c} 顺便多干一件什么事？'},
 {k:'ad',n:'属性关联',ask:'让 {c} 跟着哪个外部变量变？'}
];

function proj(){
  try{
    const A=JSON.parse(localStorage.getItem('fxm_adult_v1')||'{}');
    const s=(A.lessons&&A.lessons.A37&&A.lessons.A37.answers)||{};
    return {topic:s.topic||'',comps:(s.comps||[]).map(c=>c.n)};
  }catch(e){return {topic:'',comps:[]};}
}
const P=proj();

const L={
id:'A38',week:10,seq:38,title:'项目：十个虚拟产品',
kicker:'WEEK 10 · 毕业项目',tool:'mind',toolName:'项目',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>为什么是<em>十个</em>，不是三个</h1>
<p>前三个一定是你能想到的，第四到第十个才是这门课要的。数量不是为了多，是为了<b>把"合理"耗光</b>。</p></div>
<div class="opts" style="margin-bottom:12px">
<button class="opt" data-h="a"><span class="k">A</span><span><b>十个里总有一个能用</b><span>概率</span></span></button>
<button class="opt" data-h="b"><span class="k">B</span><span><b>先把"合理"的想法全部用完，剩下的才是新的</b><span>耗光合理性</span></span></button>
<button class="opt" data-h="c"><span class="k">C</span><span><b>十个里可以互相拼</b><span>组合</span></span></button>
</div>
<div id="hookOut"></div>
<div class="panel" style="margin-top:12px"><div class="panel-h"><h4>你的题目</h4><span>来自 A37</span></div>
<p class="small">${P.topic?'<b>'+api0()+'</b>':'<span style="color:#C9A227">还没在 A37 定题目——不影响这一节，但这一节会失去"连续感"。</span>'}</p></div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#hookOut');
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',S.answers.hook===b.dataset.h));
    if(S.answers.hook){
      const ok=S.answers.hook==='b';
      out.innerHTML='<div class="panel" style="border-color:'+(ok?'rgba(78,159,110,.4)':'rgba(216,154,60,.4)')+';background:'+(ok?'rgba(78,159,110,.07)':'rgba(216,154,60,.06)')+'">'+
        '<p class="small" style="font-size:12px">'+(ok?'对。<b>前三个是"正常答案"</b>，它们会占据你的注意力。做到第七个开始，你会被迫去碰那些"不太对"的组合。':'答案是 B。<b>数量是把"合理"耗光的工具</b>。你不是在找好点子，是在用掉所有显而易见的点子。')+'</p></div>';
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
<div class="step-h"><h1>五个工具，每个出两个</h1>
<p>同一个题目、同一组组件，交给五个工具各做两遍。第二遍通常比第一遍怪——这就对了。</p></div>
<div class="grid3" style="margin-bottom:12px">
  ${TOOLS.map(t=>`<div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">${t.n}</div>
    <p class="small" style="margin-top:5px">${t.ask.replace('{c}','某个组件')}</p></div>`).join('')}
</div>
<div class="panel"><div class="panel-h"><h4>三条规矩</h4><span>这一节不看可行性</span></div>
<div class="stack">
  <div><b style="font-size:11px;color:var(--ink)">① 每条 ≥6 字</b><p class="small" style="margin-top:2px">写清"改了什么、变成什么样"，不要只写名词。</p></div>
  <div><b style="font-size:11px;color:var(--ink)">② 第二遍必须和第一遍不一样</b><p class="small" style="margin-top:2px">同一个工具的两条思路不同，才算真的想了两遍。</p></div>
  <div><b style="font-size:11px;color:var(--ink)">③ 丑的留着</b><p class="small" style="margin-top:2px">这一节的产出越"不合理"，A39 的双过滤越有用。</p></div>
</div></div>`,
init(){},hint(){return '';},gate(){return true;}},

/* ---------- 3 十个产品 ---------- */
{id:'ten',name:'十个',short:'十个',kicker:'STEP 3 · 十个虚拟产品',
html:`
<div class="step-h"><h1>填满十条，<em>不许空着</em></h1>
<p>每个工具两条。工具箱里有提示按钮，点一下会拿你的组件生成一句"该往哪想"。</p></div>
<div class="bench">
  <div class="bench-h"><b>PROJECT · 十个虚拟产品</b><span class="st" id="tSt">0 / 10</span></div>
  <div class="bench-b" style="overflow:auto"><div class="a38-list" id="list"></div></div>
  <div class="bench-f"><span class="small">凑不够就先写丑的——丑的比空着有用。</span><div style="flex:1"></div><button class="btn sm ghost" id="tReset">重来</button></div>
</div>`,
init(sec,api){
  const S=api.S;S.answers.items=S.answers.items||{};
  const list=sec.querySelector('#list'),st=sec.querySelector('#tSt');
  const comp=c=>(P.comps.length?P.comps[(c)%P.comps.length]:'它');
  function paint(){
    list.innerHTML=TOOLS.map((t,ti)=>{
      const a1=(S.answers.items[t.k+'_1']||''),a2=(S.answers.items[t.k+'_2']||'');
      return `<div class="a38-row"><div class="a38-th"><span class="a38-k">${t.n}</span>
        <button class="a38-hint" data-hint="${t.k}" title="提示">?</button></div>
        <div class="a38-in"><input data-k="${t.k}_1" maxlength="46" value="${api.esc(a1)}" placeholder="第 1 个：${t.ask.replace('{c}',comp(ti*2))}"></div>
        <div class="a38-in"><input data-k="${t.k}_2" maxlength="46" value="${api.esc(a2)}" placeholder="第 2 个：换一个方向"></div>
      </div>`;
    }).join('');
    list.querySelectorAll('[data-k]').forEach(inp=>inp.oninput=()=>{
      S.answers.items[inp.dataset.k]=inp.value;api.save();count();api.refresh();
    });
    list.querySelectorAll('[data-hint]').forEach(b=>b.onclick=()=>{
      const t=TOOLS.find(x=>x.k===b.dataset.hint);
      api.toast(t.ask.replace('{c}',comp(Math.floor(Math.random()*3))));
    });
    count();
  }
  function count(){
    const it=S.answers.items||{};
    const n=TOOLS.reduce((a,t)=>a+((it[t.k+'_1']||'').length>=6?1:0)+((it[t.k+'_2']||'').length>=6?1:0),0);
    st.textContent=n+' / 10';
  }
  sec.querySelector('#tReset').onclick=()=>{S.answers.items={};api.save();paint();api.refresh();};
  paint();
},
hint(S){const it=S.answers.items||{};
  const n=TOOLS.reduce((a,t)=>a+((it[t.k+'_1']||'').length>=6?1:0)+((it[t.k+'_2']||'').length>=6?1:0),0);
  return n>=10?'':'还差 '+(10-n)+' 条';},
gate(S){const it=S.answers.items||{};
  return TOOLS.reduce((a,t)=>a+((it[t.k+'_1']||'').length>=6?1:0)+((it[t.k+'_2']||'').length>=6?1:0),0)>=10;}},

/* ---------- 4 挑三个最怪的 ---------- */
{id:'weird',name:'最怪的',short:'最怪',kicker:'STEP 4 · 挑最怪的',
html:`
<div class="step-h"><h1>从十条里，<em>挑三个最怪的</em></h1>
<p>不是挑最好的，是挑"你一开始会觉得不可能的"。A39 会拿它们去做双过滤。</p></div>
<div class="panel"><div class="panel-h"><h4>你的十条</h4><span>点三下</span></div>
  <div class="a38-pick" id="picks"></div>
  <div class="hint" id="pickHint" style="margin-top:9px">选 3 个。</div></div>`,
init(sec,api){
  const S=api.S;S.answers.picks=S.answers.picks||[];
  const box=sec.querySelector('#picks'),hint=sec.querySelector('#pickHint');
  function paint(){
    const it=S.answers.items||{};
    const all=[];
    TOOLS.forEach(t=>[1,2].forEach(n=>{const v=it[t.k+'_'+n]||'';if(v.length>=6)all.push({k:t.k+'_'+n,label:t.n+' · '+v});}));
    box.innerHTML=all.length?all.map(x=>{
      const on=(S.answers.picks||[]).indexOf(x.k)>=0;
      return `<button class="a38-p${on?' on':''}" data-p="${x.k}"><b>${x.label.split(' · ')[0]}</b><span>${api.esc(x.label.split(' · ')[1])}</span></button>`;
    }).join(''):'<div class="small">先把上面十条填满。</div>';
    box.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{
      const k=b.dataset.p,a=S.answers.picks;
      if(a.indexOf(k)>=0)a.splice(a.indexOf(k),1);
      else if(a.length<3)a.push(k); else api.toast('选 3 个就够了');
      S.answers.picks=a;api.save();paint();api.refresh();
    });
    hint.textContent='已选 '+(S.answers.picks||[]).length+' / 3';
  }
  paint();
},
hint(S){return (S.answers.picks||[]).length>=3?'':'还差 '+(3-(S.answers.picks||[]).length)+' 个';},
gate(S){return (S.answers.picks||[]).length>=3;}},

/* ---------- 5 提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 产出',
html:`
<div class="step-h"><h1>交一张<em>十选三卡</em></h1></div>
<div class="grid2" style="align-items:start">
  <div id="cardSlot"></div>
  <div class="panel"><div class="panel-h"><h4>补一句</h4><span>会被同事看到</span></div>
    <div class="field"><label>十条里，你自己最不喜欢哪一条（以及为什么留着它）</label><textarea id="ugly" maxlength="60" placeholder="最不喜欢的往往最值得看"></textarea></div>
    <div class="row" style="margin-top:10px"><button class="btn primary" id="subBtn">提交</button><button class="btn" id="export2">导出 PNG</button></div>
    <div class="hint" id="subSt" style="margin-top:8px">未提交</div></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const slot=sec.querySelector('#cardSlot'),ugly=sec.querySelector('#ugly'),btn=sec.querySelector('#subBtn'),st=sec.querySelector('#subSt');
  function paint(){
    ugly.value=a.ugly||'';
    const it=a.items||{};
    const lines=(a.picks||[]).map(k=>{
      const t=TOOLS.find(x=>x.k===k.split('_')[0]);
      return '<div><b>'+(t?t.n:'')+'</b><span class="fill">'+api.esc(it[k]||'')+'</span></div>';
    }).join('');
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A38</span><span>十选三</span></div>'+
      '<h5>'+api.esc(P.topic||'我的题目')+'</h5><div class="kv">'+
      [['完成',TOOLS.reduce((a,t)=>a+((it[t.k+'_1']||'').length>=6?1:0)+((it[t.k+'_2']||'').length>=6?1:0),0)+' / 10 条']].map(r=>'<div><b>'+r[0]+'</b><span>'+r[1]+'</span></div>').join('')+
      lines+'<div><b>最不喜欢</b><span class="'+(a.ugly?'fill':'')+'">'+api.esc(a.ugly||'—')+'</span></div></div></div>';
    st.textContent=S.submitted?'已提交':'未提交';btn.disabled=!!S.submitted;btn.textContent=S.submitted?'已提交':'提交';
  }
  ugly.addEventListener('input',()=>{a.ugly=ugly.value;api.save();paint();api.refresh();});
  btn.onclick=async()=>{await api.submit();paint();};
  sec.querySelector('#export2').onclick=()=>api.exportCard();
  paint();
},
hint(S){return (S.answers.ugly||'').length>=4?'':'写一句"最不喜欢哪条"';},
gate(S){return (S.answers.ugly||'').length>=4;}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>下一节：把十个<em>砍到三个</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 数量耗光合理性</div><p class="small" style="margin-top:5px">第十个才是你的。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 每个工具两遍</div><p class="small" style="margin-top:5px">第二遍才是这个工具的深度。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 丑的留着</div><p class="small" style="margin-top:5px">双过滤不是筛掉丑的，是筛掉不可行的。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A39</span></div>
<p class="small">A39 · 双过滤：市场与执行。十个里，只有三个能活下来——过程比结果重要。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '这一条和上一条有什么不同？',
 '如果用户第一眼看到它，会说什么？',
 '它拿掉/复制/挪走的是哪个组件？',
 '这条为什么让你觉得"不太对"？',
 '有没有哪条你不敢写出来？'
]},

card(S){
  const a=S.answers||{},it=a.items||{};
  const rows=[['题目',P.topic||'—']];
  (a.picks||[]).forEach(k=>{const t=TOOLS.find(x=>x.k===k.split('_')[0]);rows.push([t?t.n:'—',it[k]||'—']);});
  rows.push(['最不喜欢',a.ugly||'—']);
  return {title:'A38 · 十选三',rows:rows};
},
notes:[
 {t:'本节目标',h:'让学员用五个工具各出两个虚拟产品，把"显而易见的想法"耗光。'},
 {t:'时间分配',h:'先猜 4′ · 概念 6′ · 十个 22′ · 挑选 8′ · 提交 5′。'},
 {t:'常见卡点',h:'学员写三条就停了。要求五个工具都要两条，哪怕写"很蠢的一版"。'},
 {t:'直播怎么接',h:'现场收 10 条，挑最"不合理"的一条让全班改，看它能被救活还是真不行。'},
 {t:'和 A39 的关系',h:'A38 求多，A39 求少。顺序不能反。'}
]};

/* 顶部题目用的占位转义（顶层没有 api） */
function api0(){return String(P.topic).replace(/[<>&]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]));}

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A38']=L;
})();
