/* A08 · 形式决定功能：七步法 */
(function(){
'use strict';
const ICO={
 sub:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 6h5v6" stroke-dasharray="2 2" opacity=".65"/><path d="M7 12h6"/></svg>',
 mul:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="6" width="11" height="9" rx="2"/><rect x="9" y="10" width="11" height="9" rx="2" stroke-dasharray="3 2" opacity=".8"/></svg>',
 div:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="7" height="6" rx="1.2"/><rect x="14" y="4" width="7" height="6" rx="1.2"/><rect x="8" y="14" width="8" height="6" rx="1.2"/><path d="M6.5 10v4M17.5 10v4" stroke-dasharray="2 2" opacity=".6"/></svg>',
 tu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="13" r="4"/><path d="M12 11h4V7h4M12 15h5v3h-2"/></svg>',
 ad:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6.5" cy="7.5" r="2.5"/><circle cx="17.5" cy="16.5" r="2.5"/><path d="M9 9l6 6" stroke-dasharray="2 2"/><path d="M6.5 3v-1M17.5 21v1"/></svg>'
};
const TOOLS=[
 {k:'sub',n:'减法',d:'拿掉一个组件'},
 {k:'mul',n:'乘法',d:'复制并改变'},
 {k:'div',n:'除法',d:'拆开重排'},
 {k:'tu',n:'一专多能',d:'让它多干一件事'},
 {k:'ad',n:'属性关联',d:'改一个关系'}
];
const ATTRS=['位置','数量','大小','材料','时间'];
const STEPS7=['列组件','用工具','强制形态','强行解释','市场过滤','执行过滤','调整成句'];
const DESC7=['列出产品/流程的组件','选一个工具做强制改变','做出虚拟产品（不管可不可行）','找出好处、市场、顾客','谁会付钱？现在怎么解决？','能不能做？最大障碍是什么？','改一处，说成一句话'];

function formsFor(tool,obj,comps){
  const c=comps[0]||'主体', c2=comps[1]||c, c3=comps[2]||c;
  const O=obj||'这个东西';
  const M={
    sub:['拿掉'+c+'的'+O,'把'+c+'做成可拆的'+O,O+'去掉'+c+'，用'+c2+'顶替'],
    mul:['两个'+c+'的'+O+'（一个改'+ATTRS[1]+'）',O+'多出一个'+c+'，位置挪到'+ATTRS[0]+'之外','把'+c+'复制成可替换的两份'],
    div:['把'+O+'拆成'+c+'+'+c2+'，重新排位置',c+'挪到最后一步的'+O,O+'按时间切成两段，中间插入'+c3],
    tu:['让'+c+'同时负责提示',c+'兼职做'+c2+'的活',O+'的'+c+'顺带记录一件事'],
    ad:[O+'随'+ATTRS[0]+'自动变化',c+'的'+ATTRS[3]+'跟着'+ATTRS[4]+'变','价格不再按'+c+'，按'+ATTRS[4]]
  };
  return M[tool]||M.sub;
}

const L={
id:'A08',week:2,seq:8,title:'形式决定功能：七步法',
kicker:'WEEK 2 · 认知地基',tool:'mind',toolName:'七步法',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>先有一个<em>奇怪的形态</em>，再想它有什么用</h1>
<p>这是 SIT 最反直觉的一条：<b>不是先想需求，而是先做出一个怪东西，再倒过来找它的用途。</b></p></div>
<div class="grid3" style="margin-bottom:14px">
  <div class="panel" style="padding:14px"><div class="mono" style="font-size:9.5px;color:var(--acc)">无腿椅</div>
    <p class="small" style="margin-top:6px">一张没有腿的椅子，只有一块板和一根绑带。它有什么用？</p></div>
  <div class="panel" style="padding:14px"><div class="mono" style="font-size:9.5px;color:var(--acc)">没有屏幕的播放器</div>
    <p class="small" style="margin-top:6px">拿掉屏幕，只剩一个圆盘。为什么反而卖得更好？</p></div>
  <div class="panel" style="padding:14px"><div class="mono" style="font-size:9.5px;color:var(--acc)">中间开槽的课桌</div>
    <p class="small" style="margin-top:6px">一张桌子中间开一道槽，两个人面对面坐。谁需要它？</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>这三个东西是怎么来的</h4><span>单选</span></div>
<div class="opts">
<button class="opt" data-h="a"><span class="k">A</span><span><b>先做用户调研，发现需求，再设计</b><span>需求驱动</span></span></button>
<button class="opt" data-h="b"><span class="k">B</span><span><b>先改形态，再问"谁会要"</b><span>形式决定功能（FFF）</span></span></button>
<button class="opt" data-h="c"><span class="k">C</span><span><b>设计师拍脑袋想出来的</b><span>灵感驱动</span></span></button>
</div>
<div id="hookOut" style="margin-top:12px"></div></div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#hookOut');
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',S.answers.hook===b.dataset.h));
    if(S.answers.hook){
      const ok=S.answers.hook==='b';
      out.innerHTML='<div class="panel" style="border-color:'+(ok?'rgba(78,159,110,.4)':'rgba(216,154,60,.4)')+';background:'+(ok?'rgba(78,159,110,.07)':'rgba(216,154,60,.06)')+'">'+
        '<p class="small" style="font-size:12px">'+(ok
          ? '对。<b>Function Follows Form</b>：先把形态改掉，再倒过来问"谁会为它买单"。这三样都不是从需求出发的，是先有了形态，价值被人补上去的。'
          : '真实答案是 B。这三样都是<b>先改形态</b>：无腿椅是拿掉腿、无屏播放器是拿掉屏幕、双开槽课桌是加了一道槽。改完才去找用途——这就是 SIT 的七步法。')+'</p></div>';
    }
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{S.answers.hook=b.dataset.h;api.save();paint();api.refresh();});
  paint();
},
hint(S){return S.answers.hook?'':'先选一个你的判断';},
gate(S){return !!S.answers.hook;}},

/* ---------- 2 七步法 ---------- */
{id:'seven',name:'七步法',short:'七步',kicker:'STEP 2 · 概念',
html:`
<div class="step-h"><h1>七步，把<em>怪东西</em>变成<em>好生意</em></h1>
<p>前三步是"造形态"，后四步是"找价值"。大多数人跳过前三步直接想点子，所以只能想到大家都能想到的。</p></div>
<div class="a08-flow">
  ${STEPS7.map((s,i)=>`<div class="a08-fstep" data-f="${i}"><span class="a08-fn">${i+1}</span><b>${s}</b><em>${DESC7[i]}</em></div>`).join('')}
</div>
<div class="panel" style="margin-top:12px"><div class="panel-h"><h4>两个过滤器是这条方法的命门</h4><span>少了它们就是自嗨</span></div>
<div class="grid2">
  <div><div class="mono" style="font-size:9.5px;color:var(--acc)">市场过滤</div><p class="small" style="margin-top:4px">谁会为它付钱？他现在是怎么解决的？如果答案是"没人"或"他不觉得是问题"，回到第三步换形态。</p></div>
  <div><div class="mono" style="font-size:9.5px;color:var(--acc)">执行过滤</div><p class="small" style="margin-top:4px">明天能不能动手做？最大的障碍是钱、人、法规还是习惯？说不出来，就还是空想。</p></div>
</div></div>`,
init(sec,api){
  sec.querySelectorAll('.a08-fstep').forEach(el=>el.onclick=()=>el.classList.toggle('a08-on'));
},
hint(){return '点几个步骤，看清它们分别在做什么';},
gate(){return true;}},

/* ---------- 3 前三步 ---------- */
{id:'front',name:'造形态',short:'造形态',kicker:'STEP 3 · 前三步',
html:`
<div class="step-h"><h1>先造一个<em>不管能不能用</em>的形态</h1>
<p>这一屏只做前三步。别急着判断好坏——第四步之后才有资格评价。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>列组件</span>
  <span class="op"><span class="op-n">2</span>选工具</span>
  <span class="op"><span class="op-n">3</span>选一个形态</span>
</div>
<div class="grid2">
  <div class="panel"><div class="panel-h"><h4>① 你要改的东西</h4><span>越普通越好</span></div>
    <div class="field"><input id="obj" maxlength="20" placeholder="例如：公司前台 / 保温杯 / 入职流程"></div>
    <div class="chips" id="objPreset" style="margin-top:8px">
      ${['保温杯','公司前台','入职流程'].map(o=>`<button class="chip" data-obj="${o}">${o}</button>`).join('')}
    </div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">组件</h4><span id="compCnt">0 / 6</span></div>
    <div class="chips" id="comps"></div>
    <div class="row" style="margin-top:8px"><input id="compIn" placeholder="加一个组件，回车确认" maxlength="12" style="flex:1;background:#0D131C;border:1px solid var(--line2);border-radius:7px;padding:8px 10px;font-size:12px">
      <button class="btn sm" id="compAdd">加入</button></div>
    <div class="hint" style="margin-top:6px">至少 6 个。组件是能被单独拆下来的一块。</div>
  </div>
  <div class="panel"><div class="panel-h"><h4>② 选一个工具</h4><span>只选一个</span></div>
    <div class="stack" id="toolPick">
      ${TOOLS.map(t=>`<button class="a08-tool" data-t="${t.k}"><span class="a08-ti">${ICO[t.k]}</span><span><b>${t.n}</b><em>${t.d}</em></span><i>→</i></button>`).join('')}
    </div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">③ 生成的形态（选一个，可改）</h4><span id="formCnt">0</span></div>
    <div class="stack" id="forms"><div class="a08-empty">先选工具，这里会给你三个形态。</div></div>
    <div class="field" id="formEdit" style="margin-top:8px;display:none"><label>改写成你自己的话</label>
      <input id="formText" maxlength="60" placeholder="选一个形态后可以改写"></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  a.comps=a.comps||[];
  const objIn=sec.querySelector('#obj'),compCnt=sec.querySelector('#compCnt'),
        compsEl=sec.querySelector('#comps'),compIn=sec.querySelector('#compIn'),
        formsEl=sec.querySelector('#forms'),formCnt=sec.querySelector('#formCnt'),
        formEdit=sec.querySelector('#formEdit'),formText=sec.querySelector('#formText');
  const PRESET={'保温杯':['杯盖','杯身','密封圈','提绳','杯底','温度贴'],
    '公司前台':['台面','椅子','登记本','电脑','灯','绿植'],
    '入职流程':['offer','体检','签合同','领设备','培训','账号开通']};
  function paint(){
    objIn.value=a.obj||'';
    compsEl.innerHTML=a.comps.map((c,i)=>`<button class="chip on" data-del="${i}">${api.esc(c)}<span class="x">×</span></button>`).join('')||'<span class="small">还没加组件</span>';
    compCnt.textContent=a.comps.length+' / 6';
    sec.querySelectorAll('[data-obj]').forEach(b=>b.classList.toggle('on',a.obj===b.dataset.obj));
    sec.querySelectorAll('[data-t]').forEach(b=>b.classList.toggle('on',a.tool===b.dataset.t));
    const n=(a.forms||[]).length;
    formCnt.textContent=n?n+' 个':'0';
    if(n){
      formsEl.innerHTML=a.forms.map((f,i)=>`<button class="a08-form${a.formIdx===i?' on':''}" data-f="${i}"><b>${api.esc(f)}</b><i>${a.formIdx===i?'✓':'→'}</i></button>`).join('');
      formEdit.style.display='';
      formText.value=a.formText||'';
    }else{
      formsEl.innerHTML='<div class="a08-empty">先选工具，这里会给你三个形态。</div>';
      formEdit.style.display='none';
    }
    compsEl.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{a.comps.splice(+b.dataset.del,1);api.save();paint();api.refresh();});
    formsEl.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{a.formIdx=+b.dataset.f;a.formText=(a.forms||[])[a.formIdx];api.save();paint();api.refresh();});
    api.refresh();
  }
  function addComp(v){
    v=(v||'').trim();
    if(!v||a.comps.length>=12||a.comps.indexOf(v)>=0)return;
    a.comps.push(v);compIn.value='';api.save();paint();
  }
  sec.querySelector('#compAdd').onclick=()=>addComp(compIn.value);
  compIn.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addComp(compIn.value);}});
  sec.querySelectorAll('[data-obj]').forEach(b=>b.onclick=()=>{
    a.obj=b.dataset.obj;
    if(PRESET[a.obj]&&!a.comps.length)a.comps=PRESET[a.obj].slice();
    api.save();paint();
  });
  objIn.addEventListener('input',()=>{a.obj=objIn.value.trim();api.save();paint();});
  sec.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{
    a.tool=b.dataset.t;
    if(a.obj&&a.comps.length>=3){a.forms=formsFor(a.tool,a.obj,a.comps);a.formIdx=null;a.formText='';}
    api.save();paint();
  });
  formText.addEventListener('input',()=>{a.formText=formText.value;api.save();api.refresh();});
  paint();
},
hint(S){const a=S.answers;if(!a.obj)return '先写要改的东西';if((a.comps||[]).length<6)return '组件还差 '+(6-(a.comps||[]).length)+' 个';if(!a.tool)return '选一个工具';if(a.formIdx===null||a.formIdx===undefined)return '选一个生成的形态';return '';},
gate(S){const a=S.answers;return !!(a.obj&&(a.comps||[]).length>=6&&a.tool&&a.formIdx!==null&&a.formIdx!==undefined&&(a.formText||'').length>=6);}},

/* ---------- 4 后四步 ---------- */
{id:'back',name:'找价值',short:'找价值',kicker:'STEP 4 · 后四步',
html:`
<div class="step-h"><h1>现在才有资格问：<em>谁会要它</em></h1>
<p>形态已经定了，不许再改。四步：好处 → 市场过滤 → 执行过滤 → 调一处。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">4</span>强行解释</span>
  <span class="op"><span class="op-n">5</span>市场过滤</span>
  <span class="op"><span class="op-n">6</span>执行过滤</span>
  <span class="op"><span class="op-n">7</span>调整</span>
</div>
<div class="grid2">
  <div class="panel"><div class="panel-h"><h4>④ 三个好处</h4><span>各 ≥10 字</span></div>
    <div class="field"><label>谁会用</label><textarea id="who" maxlength="40" placeholder="一个具体岗位或场景"></textarea></div>
    <div class="field"><label>为什么愿意用（替代了什么）</label><textarea id="why" maxlength="50" placeholder="以前怎么解决，现在少花了什么"></textarea></div>
    <div class="field"><label>最难的一环怎么过</label><textarea id="block" maxlength="50" placeholder="拿掉/改掉之后，谁来补位"></textarea></div>
  </div>
  <div class="panel"><div class="panel-h"><h4>⑤⑥ 双过滤</h4><span>1–5 分</span></div>
    <div class="score">
      <div class="score-i"><div class="lb"><b>市场</b><span>谁会付钱？现在怎么解决？</span></div>
        <div class="stars" data-k="mkt">${[1,2,3,4,5].map(n=>`<button data-v="${n}">${n}</button>`).join('')}</div></div>
      <div class="score-i"><div class="lb"><b>可行</b><span>明天能不能动手？障碍是什么？</span></div>
        <div class="stars" data-k="feas">${[1,2,3,4,5].map(n=>`<button data-v="${n}">${n}</button>`).join('')}</div></div>
    </div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">⑦ 只改一处，让它更可行</h4><span id="adjCnt">0 / 8</span></div>
    <div class="field"><textarea id="adj" maxlength="40" placeholder="例如：先不做 App，用微信群接单两周"></textarea></div>
    <div class="hint" id="verdict" style="margin-top:8px">两个分数都打过，才会有判断。</div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const f={who:sec.querySelector('#who'),why:sec.querySelector('#why'),block:sec.querySelector('#block'),adj:sec.querySelector('#adj')};
  const adjCnt=sec.querySelector('#adjCnt'),verdict=sec.querySelector('#verdict');
  Object.keys(f).forEach(k=>{
    f[k].value=a[k]||'';
    f[k].addEventListener('input',()=>{a[k]=f[k].value;if(k==='adj')adjCnt.textContent=(a.adj||'').length+' / 8';api.save();paintStars();api.refresh();});
  });
  function paintStars(){
    sec.querySelectorAll('.stars').forEach(st=>{
      const k=st.dataset.k,v=a[k]||0;
      st.querySelectorAll('button').forEach(b=>b.classList.toggle('on',+b.dataset.v<=v));
    });
    const m=a.mkt||0,fe=a.feas||0;
    if(m&&fe){
      const t = m<=2?'市场偏弱：谁会付钱还说不清' : fe<=2?'可行偏弱：先做一个手工版' : '可以往下走：先找 3 个人试';
      verdict.innerHTML='<b style="color:var(--acc2)">判断：</b>'+t;
    }else verdict.textContent='两个分数都打过，才会有判断。';
  }
  sec.querySelectorAll('.stars').forEach(st=>{
    st.querySelectorAll('button').forEach(b=>b.onclick=()=>{a[st.dataset.k]=+b.dataset.v;api.save();paintStars();api.refresh();});
  });
  paintStars();
  adjCnt.textContent=(a.adj||'').length+' / 8';
},
hint(S){const a=S.answers;if((a.who||'').length<10||(a.why||'').length<10||(a.block||'').length<10)return '三个好处还没写够';if(!a.mkt||!a.feas)return '市场/可行各打一个分';if((a.adj||'').length<8)return '还差一句"只改一处"';return '';},
gate(S){const a=S.answers;return !!((a.who||'').length>=10&&(a.why||'').length>=10&&(a.block||'').length>=10&&a.mkt&&a.feas&&(a.adj||'').length>=8);}},

/* ---------- 5 提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 产出',
html:`
<div class="step-h"><h1>七步走完，<em>交一张能评的卡</em></h1>
<p>这张卡的价值不在点子新不新，在于<b>七步是不是真的走完了</b>。</p></div>
<div class="grid2" style="align-items:start">
  <div id="cardSlot"></div>
  <div class="stack">
    <div class="panel"><div class="panel-h"><h4>最后一句</h4><span>会被同事看到</span></div>
      <div class="field"><label>如果只保留一句话，你想让人记住什么</label><textarea id="memo" maxlength="50" placeholder="例如：先改形态，再找价值"></textarea></div></div>
    <div class="panel"><div class="panel-h"><h4>提交</h4><span id="subSt">未提交</span></div>
      <p class="small">提交后引擎会先跑一次 AI 评审（有用/可行/证据），再进入班级互评。</p>
      <div class="row" style="margin-top:10px"><button class="btn primary" id="subBtn">提交</button>
      <button class="btn" id="export2">导出 PNG</button></div></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const memo=sec.querySelector('#memo'),slot=sec.querySelector('#cardSlot'),
        btn=sec.querySelector('#subBtn'),st=sec.querySelector('#subSt');
  function paint(){
    memo.value=a.memo||'';
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A08</span><span>七步卡</span></div>'+
      '<h5>'+api.esc(a.formText||'我的形态')+'</h5><div class="kv">'+
      [['对象',a.obj],['组件',(a.comps||[]).length+' 个'],['工具',(TOOLS.find(t=>t.k===a.tool)||{}).n],['形态',a.formText],
       ['谁会用',a.who],['为什么',a.why],['最难一环',a.block],['市场/可行',(a.mkt||'-')+' / '+(a.feas||'-')],['只改一处',a.adj],['记住一句',a.memo]]
      .map(r=>'<div><b>'+r[0]+'</b><span class="'+(r[1]?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+'</div></div>';
    const ready=(a.memo||'').length>=4;
    st.textContent=S.submitted?'已提交':'未提交';
    btn.textContent=S.submitted?'已提交':(ready?'提交':'先写最后一句');
    btn.disabled=!!S.submitted||!ready;
  }
  memo.addEventListener('input',()=>{a.memo=memo.value;api.save();paint();api.refresh();});
  btn.onclick=async()=>{await api.submit();paint();};
  sec.querySelector('#export2').onclick=()=>api.exportCard();
  paint();
},
hint(S){return (S.answers.memo||'').length>=4?'':'写一句"如果只记住一句话"';},
gate(S){return (S.answers.memo||'').length>=4;}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>这七步，后面 <em>32 节</em>都在用它</h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 先形态</div><p class="small" style="margin-top:5px">先想需求，你只会想到调研里已经有的答案。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 两个过滤</div><p class="small" style="margin-top:5px">市场问"谁付钱"，执行问"明天能不能做"。缺一个就是自嗨。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 只改一处</div><p class="small" style="margin-top:5px">改太多，你不知道是哪一处起的作用。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A09</span></div>
<p class="small">A09 · 减法：拿掉一个重要组件。你会第一次系统地把"最重要的东西"拿掉，然后被逼着解释它为什么还能成立。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '你的形态里，哪一步是"不得不"改的？',
 '如果市场过滤只给 2 分，你会换形态还是换人群？',
 '这个形态最难的执行障碍，是钱、人、法规，还是习惯？',
 '你的"只改一处"，是不是在改形态本身？',
 '七步里你最想跳过哪一步？为什么？'
]},

card(S){
  const a=S.answers||{};
  return {title:'A08 · 七步卡',rows:[
    ['对象',a.obj||'—'],
    ['工具',(TOOLS.find(t=>t.k===a.tool)||{}).n||'—'],
    ['形态',a.formText||'—'],
    ['谁会用',a.who||'—'],
    ['为什么',a.why||'—'],
    ['市场/可行',(a.mkt||'-')+' / '+(a.feas||'-')],
    ['只改一处',a.adj||'—'],
    ['记住一句',a.memo||'—']
  ]};
},
notes:[
 {t:'本节目标',h:'让学员完整走一遍七步法，知道"先形态后功能"有先后顺序，不是口号。'},
 {t:'时间分配',h:'先猜 5′ · 七步 8′ · 造形态 12′ · 找价值 12′ · 提交点评 8′。'},
 {t:'常见卡点',h:'学员会在第 3 步就判断"这不可行"。要明确说：第 4 步之前不许评价。'},
 {t:'直播怎么接',h:'看班级双过滤分布：市场低的多就重做市场过滤，可行低的多就讲"最小可行一步"。'},
 {t:'和后面 32 节的关系',h:'后面每个工具只替换第 2 步，其余六步不变；本节要把流程刻进去。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A08']=L;
})();
