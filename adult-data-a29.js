/* A29 · 产品概念：两个工具叠加 · 叠加台 */
(function(){
'use strict';

const IMG={
  device:'assets-cases-a29-sedasys.jpg',
  room:'assets-cases-a29-or.jpg'
};

/* ---------- 预设对象：各带 8 个参考组件 ---------- */
const PRESETS=[
  {n:'家用血压计',comps:['袖带','显示屏','充气管','电池仓','测量键','语音播报','收纳盒','说明书']},
  {n:'客户提案会',comps:['议程','主讲人','提案文档','报价单','会议室','签到表','问答环节','会议纪要']},
  {n:'门店交接班',comps:['交接本','收银抽屉','钥匙','值班表','库存表','工作群','巡检表','班前会']}
];

/* ---------- 五个工具 ---------- */
const TOOLS=[
  {k:'sub',n:'减法',d:'拿掉一个组件',act:c=>'拿掉「'+c+'」'},
  {k:'mul',n:'乘法',d:'复制并改变一个组件',act:c=>'复制「'+c+'」并改一处'},
  {k:'div',n:'除法',d:'拆开并重排一个组件',act:c=>'把「'+c+'」拆开重排'},
  {k:'tu',n:'一专多能',d:'让一个组件多干一件事',act:c=>'让「'+c+'」兼任第二件事'},
  {k:'ad',n:'属性关联',d:'让一个组件跟着变量变',act:c=>'让「'+c+'」跟着一个变量变'}
];
const MIN_COMP=6, MIN_LINE=15, MIN_SOLVE=8, MIN_KEEP=10;

const T=k=>TOOLS.find(t=>t.k===k)||null;
const tname=k=>{const t=T(k);return t?t.n:'—';};
const norm=s=>String(s==null?'':s).replace(/\s+/g,' ').trim();

function view(S){
  const x=(S&&S.answers&&S.answers.a29)||{};
  const str=v=>typeof v==='string'?v:'';
  const comps=Array.isArray(x.comps)
    ? x.comps.map(c=>typeof c==='string'?c:(c&&c.n)).filter(Boolean)
    : [];
  return {
    hook:str(x.hook), seq:str(x.seq),
    obj:str(x.obj), comps:comps,
    aTool:str(x.aTool), aComp:str(x.aComp), bTool:str(x.bTool), bComp:str(x.bComp),
    line:str(x.line), solveA:str(x.solveA), solveB:str(x.solveB),
    ownObj:str(x.ownObj), ownA:str(x.ownA), ownAComp:str(x.ownAComp),
    ownB:str(x.ownB), ownBComp:str(x.ownBComp), ownLine:str(x.ownLine), keep:str(x.keep),
    q1:str(x.q1), q2:str(x.q2)
  };
}
function ensure(S){
  const ans=S.answers;
  if(!ans.a29||typeof ans.a29!=='object')ans.a29={};
  const x=ans.a29;
  if(!Array.isArray(x.comps))x.comps=[];
  x.comps=x.comps.map(c=>typeof c==='string'?c:(c&&c.n)).filter(Boolean);
  ['hook','seq','obj','aTool','aComp','bTool','bComp','line','solveA','solveB',
   'ownObj','ownA','ownAComp','ownB','ownBComp','ownLine','keep','q1','q2']
    .forEach(k=>{if(typeof x[k]!=='string')x[k]='';});
  return x;
}
function clearLine(x){x.line='';x.solveA='';x.solveB='';}
function resetAll(x){x.aTool='';x.aComp='';x.bTool='';x.bComp='';clearLine(x);}
function labGate(x){
  return !!(x.obj&&x.comps.length>=MIN_COMP&&x.aTool&&x.aComp&&x.bTool&&x.bComp&&
    x.aTool!==x.bTool&&x.bComp!==x.aComp&&
    x.line.trim().length>=MIN_LINE&&
    x.solveA.trim().length>=MIN_SOLVE&&x.solveB.trim().length>=MIN_SOLVE);
}
function ownGate(x){
  return !!(x.ownObj.trim().length>=2&&x.ownA&&x.ownB&&x.ownA!==x.ownB&&
    x.ownAComp.trim()&&x.ownBComp.trim()&&x.ownAComp.trim()!==x.ownBComp.trim()&&
    x.ownLine.trim().length>=MIN_LINE&&x.keep.trim().length>=MIN_KEEP);
}
function pairNote(a,b){
  const M={
    'sub>tu':'少掉的那件事，交给现场本来就在的东西接。',
    'sub>mul':'先腾出位置，再让复制件去干第二件事。',
    'sub>div':'先拿掉一处，再把剩下的步骤重排。',
    'sub>ad':'先拿掉一处，再让剩下的部分跟着变量走。',
    'mul>tu':'复制件接第二件事，原件继续干原来的活。',
    'mul>div':'复制件换到另一个位置，和原件分工。',
    'mul>ad':'复制件跟着变量走，原件保持稳定。',
    'mul>sub':'先把复制件立住，再拿掉被它替掉的那一件。',
    'div>tu':'重排之后空出来的那个位置，顺便干一件事。',
    'div>ad':'重排之后，位置由变量决定，不用人判断。',
    'div>sub':'先重排，再把多余的那一步拿掉。',
    'tu>mul':'让一个组件兼任，再把这件事复制给第二个人。',
    'tu>ad':'新任务由变量触发，不用再派人盯着。',
    'tu>sub':'先让一个组件多干一件事，再拿掉另一个组件。',
    'ad>tu':'变量一来，那个组件就顺手多干一件事。',
    'ad>mul':'变量先接上，再让复制件跟着它变。',
    'ad>sub':'先接上变量，再把靠人判断的那一步拿掉。'
  };
  return M[a+'>'+b]||'两个改动落在不同组件上，各解决一件事。';
}
function solveText(k){
  const M={
    sub:'拿掉之后，成本、重量或一次操作被腾出来；功能要由别的组件或现场资源接住。',
    mul:'复制件接第二个任务，原件继续干原来的活；不是多加一个一样的。',
    div:'步骤数不变，位置或先后变了；等待被挪到流程的另一头。',
    tu:'它干原活的同时顺带完成第二件事，不新增零件，多出一个产出。',
    ad:'它跟着一个外部变量自动变，用户不用再手动判断。'
  };
  return M[k]||'';
}
function verdictOf(q1,q2){
  if(!q1||!q2)return {t:'两问都答完，才有判断。',k:''};
  if(q1==='c')return {t:'会抵消：第二个工具把第一个的结果改回去了。回叠加台，把工具 B 换到另一个组件。',k:'bad'};
  if(q1==='b')return {t:'有一点抵消：两个改动都在向用户要注意力。留一个更硬的，另一个降级为可选。',k:'warn'};
  if(q2==='c')return {t:'说不清：写不出用户版本，说明这张卡还停在工具层。先别提交。',k:'warn'};
  if(q2==='b')return {t:'要三句以上：把一句话压到 30 字以内，再提交。',k:'warn'};
  return {t:'可以提交：两个改动各改各的，也说得清。',k:'ok'};
}

const L={
id:'A29',week:8,seq:29,title:'产品概念：两个工具叠加',
kicker:'WEEK 8 · 产品概念 · 叠加',tool:'mind',toolName:'工具叠加',minutes:45,

steps:[
/* ================= 1 先猜 ================= */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>一台设备，<em>被两个工具动过</em></h1>
<p>强生爱惜康的 Sedasys 想解决一件事：让镇静不再必须等麻醉师。最后它没有屏幕、没有键盘、没有备用电池。先猜：这是哪两个工具叠出来的？</p></div>
<div class="a29-hero">
  <figure class="a29-fig contain">
    <div class="a29-fig-b">
      <img src="${IMG.device}" alt="Sedasys 镇静设备，带屏幕、键盘、药盒与电源">
      <button class="case-zoom" data-zoom="device" title="放大">⤢</button>
    </div>
    <figcaption><b>AS IS · Sedasys</b><span>屏幕、键盘、备用电池都还在</span><em>图：SIT 官方课程材料（已授权）</em></figcaption>
  </figure>
  <figure class="a29-fig">
    <div class="a29-fig-b">
      <img src="${IMG.room}" alt="手术室现场，监护仪和屏幕本来就在">
      <button class="case-zoom" data-zoom="room" title="放大">⤢</button>
    </div>
    <figcaption><b>它被放进去的现场</b><span>屏幕、监护、补给本来就在</span><em>图：SIT 官方课程材料（已授权）</em></figcaption>
  </figure>
</div>
<div class="panel a29-hookpanel" style="margin-top:12px">
  <div class="panel-h"><h4>你的判断</h4><span>单选 · 选完揭晓</span></div>
  <div class="opts">
    <button class="opt" data-h="a"><span class="k">A</span><span><b>减法 + 一专多能</b><span>先拿掉，再让现场已有的东西接手</span></span></button>
    <button class="opt" data-h="b"><span class="k">B</span><span><b>减法 + 乘法</b><span>拿掉主屏，再复制一块副屏</span></span></button>
    <button class="opt" data-h="c"><span class="k">C</span><span><b>除法 + 属性关联</b><span>重排步骤，再让剂量跟着变量走</span></span></button>
  </div>
  <div id="hookOut" style="margin-top:12px"></div>
</div>`,
init(sec,api){
  const x=ensure(api.S),out=sec.querySelector('#hookOut');
  const ZOOM={
    device:{t:'Sedasys 镇静设备',s:'AS IS：屏幕、键盘、药盒、电源都在。后来的两轮减法，拿掉的正是其中最显眼的几件。'},
    room:{t:'手术室现场',s:'监护仪、墙上屏幕、现场补给本来就在。一专多能动的就是这些已有组件，不是新买一件。'}
  };
  sec.querySelectorAll('[data-zoom]').forEach(b=>b.onclick=()=>{
    const z=ZOOM[b.dataset.zoom];if(!z)return;
    api.modal('<button class="modal-x">×</button><h3>'+api.esc(z.t)+'</h3>'+
      '<img src="'+IMG[b.dataset.zoom]+'" alt="'+api.esc(z.t)+'" style="width:100%;display:block;border:1px solid #2A3547;border-radius:8px">'+
      '<p class="small" style="margin-top:8px">'+api.esc(z.s)+'<br>图：SIT 官方课程材料（已授权）</p>');
  });
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',x.hook===b.dataset.h));
    if(!x.hook){
      out.innerHTML='<div class="a29-wait"><b>先选一个</b><span>答案不在工具名里，在“哪个工具动了哪个组件”。</span></div>';
      return;
    }
    const ok=x.hook==='a';
    const wrong=x.hook==='b'
      ?'复制一块副屏再改小，确实能做到“没有主屏”；但那是多了一块屏，不是少了一块。Sedasys 没买新屏幕，它用了手术室墙上已经有的那块。'
      :'重排和接变量都能解释一部分，但解释不了“没有屏幕还能看见参数”。参数显示在监护仪上——那是给现有设备派了新活，不是挪步骤。';
    out.innerHTML='<div class="a29-reveal">'+
      '<div class="a29-reveal-h"><span>揭晓</span><span>A · 减法 + 一专多能</span></div>'+
      '<p>'+(ok?'对。这不是一个工具做了一半、另一个补一脚，是两个工具各自改了不同的组件。':wrong)+'</p>'+
      '<div class="a29-two">'+
        '<div><b>工具 A · 减法</b><span>作用于设备自己的组件</span><em>屏幕 · 键盘 · 备用电池</em></div>'+
        '<div class="b"><b>工具 B · 一专多能</b><span>作用于手术室里已有的组件</span><em>监护仪屏幕 · 现场补给</em></div>'+
      '</div>'+
      '<div class="a29-note">减法让设备少了一块屏；一专多能让手术室那块屏多了一个任务。两个工具落在不同组件上，所以没有互相抵消。</div>'+
    '</div>';
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{
    x.hook=b.dataset.h;api.save();paint();api.refresh();
  });
  paint();
},
hint(S){return view(S).hook?'':'先选一个判断';},
gate(S){return !!view(S).hook;}},

/* ================= 2 概念 ================= */
{id:'concept',name:'两个原则',short:'概念',kicker:'STEP 2 · 概念',
html:`
<div class="step-h"><h1>叠加不是多用几个工具，<em>是把两个工具放到不同组件上</em></h1>
<p>两个原则：① 两个工具作用于不同组件；② 先做减法，再做加法。第一条决定成不成立，第二条决定难不难。</p></div>
<div class="grid2" style="margin-bottom:12px;align-items:start">
  <div class="panel a29-pr">
    <div class="a29-pr-n">原则 01 · 不同组件</div>
    <h4>落在同一个组件上，第二个会把第一个改回去</h4>
    <p class="small">判断只需要一句：两个工具动的是不是同一块东西？</p>
    <div class="a29-cancel">
      <div class="a29-cancel-row"><span>减法</span><b>拿掉屏幕</b></div>
      <div class="a29-cancel-row"><span>乘法</span><b>复制屏幕，改成常亮</b></div>
      <div class="a29-cancel-x">同一组件</div>
      <div class="a29-cancel-out">净结果：你还是有一块屏</div>
    </div>
  </div>
  <div class="panel a29-pr">
    <div class="a29-pr-n">原则 02 · 先减后加</div>
    <h4>先腾出位置，再加东西</h4>
    <p class="small">减法先腾出成本、位置和决策空间；加法后做，才有地方放。反过来，先加的东西已经花了钱、进了样机、有人负责，再想拿掉，阻力来自组织而不是产品。</p>
    <div class="a29-order-list">
      <div class="on"><b>推荐</b><span>减法 → 一专多能 / 乘法 / 除法 / 属性关联</span></div>
      <div><b>可用</b><span>除法 → 减法：先重排，再拿掉多余的一步</span></div>
      <div class="warn"><b>谨慎</b><span>加法 → 减法：新东西已经立项，通常拿不掉</span></div>
      <div class="bad"><b>不要</b><span>同一组件上用两个工具</span></div>
    </div>
  </div>
</div>
<div class="grid2" style="align-items:start">
  <div class="panel">
    <div class="panel-h"><h4>什么时候别叠</h4><span>边界</span></div>
    <ul class="a29-no">
      <li><b>两个工具解决同一个问题。</b>都只是让用户少一步，一个就够。</li>
      <li><b>说不出各自作用于哪个组件。</b>说不出来，通常是一个工具被说了两遍。</li>
      <li><b>为了让提案显得复杂。</b>工具数量不是创新程度。</li>
    </ul>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>同一组改动，哪种顺序更容易成立</h4><span>二选一</span></div>
    <div class="opts">
      <button class="opt" data-seq="a"><span class="k">A</span><span><b>先拿掉屏幕，再决定显示交给谁</b><span>先减，再找补位</span></span></button>
      <button class="opt" data-seq="b"><span class="k">B</span><span><b>先装一块副屏，再把主屏拿掉</b><span>先加，再减</span></span></button>
    </div>
    <div id="seqOut" style="margin-top:10px"></div>
  </div>
</div>
<div class="panel a29-chain" style="margin-top:12px">
  <div class="panel-h"><h4>一条链：两个工具怎么接力</h4><span>Sedasys · 两轮合并看</span></div>
  <div class="a29-chainflow">
    <div class="a29-cn"><i>设备</i><b>屏幕 · 键盘 · 备用电池</b><span>先电池，后屏幕与键盘</span></div>
    <span class="a29-ca">减法 →</span>
    <div class="a29-cn"><i>少掉</i><b>没有屏，也没有键盘</b><span>功能还欠一个出口</span></div>
    <span class="a29-ca">一专多能 →</span>
    <div class="a29-cn"><i>现场</i><b>监护仪屏幕 · 补给</b><span>本来就在，不用新买</span></div>
    <span class="a29-ca">=</span>
    <div class="a29-cn out"><i>结果</i><b>不用麻醉师的镇静设备</b><span>两个改动落在不同组件上</span></div>
  </div>
</div>`,
init(sec,api){
  const x=ensure(api.S),out=sec.querySelector('#seqOut');
  function paint(){
    sec.querySelectorAll('[data-seq]').forEach(b=>b.classList.toggle('on',x.seq===b.dataset.seq));
    if(!x.seq){out.innerHTML='';return;}
    const ok=x.seq==='a';
    out.innerHTML='<div class="a29-seqr'+(ok?' ok':'')+'">'+
      '<b>'+(ok?'对。先减，问题立刻变成“显示还能交给谁”':'顺序反了')+'</b>'+
      '<span>'+(ok
        ?'你会在现场找资源，不会去买一块新屏。减法腾出来的位置，正好放一专多能。'
        :'副屏一旦立项、开模、进物料清单，主屏就拿不掉了；最后你会得到两块屏，而不是一台没有屏的设备。')+'</span></div>';
  }
  sec.querySelectorAll('[data-seq]').forEach(b=>b.onclick=()=>{
    x.seq=b.dataset.seq;api.save();paint();api.refresh();
  });
  paint();
},
hint(S){return view(S).seq?'':'选一个顺序判断';},
gate(S){return !!view(S).seq;}},

/* ================= 3 叠加台 ================= */
{id:'lab',name:'叠加台',short:'叠加',kicker:'STEP 3 · 工作台',
html:`
<div class="step-h a29-tight"><h1>选一个对象，<em>把两个工具放到两个组件上</em></h1>
<p>工具 B 不能碰工具 A 占用的组件；碰了会被拦下——这是叠加成立的最低条件。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>选对象</span>
  <span class="op"><span class="op-n">2</span>组件 ≥ 6</span>
  <span class="op"><span class="op-n">3</span>工具 A → 组件 X</span>
  <span class="op"><span class="op-n">4</span>工具 B → 组件 Y</span>
  <span class="op"><span class="op-n">5</span>生成一句话</span>
</div>
<div class="a29-lab">
  <div class="a29-lab-h"><b>STACK BENCH · 叠加台</b>
    <span class="a29-lab-st"><span id="a29St">0 / 5</span><span class="a29-dots" id="a29Dots"><i></i><i></i><i></i><i></i><i></i></span></span>
  </div>
  <div class="a29-lab-b">
    <div class="a29-objrow">
      <div class="a29-objbox">
        <div class="a29-h"><b>① 对象</b><span>3 选 1，或自己写</span></div>
        <div class="a29-objs" id="a29Objs">
          ${PRESETS.map(p=>`<button class="a29-obj" data-o="${p.n}"><b>${p.n}</b><span>${p.comps.length} 个参考组件</span></button>`).join('')}
        </div>
        <div class="a29-add">
          <input id="a29ObjIn" maxlength="24" placeholder="例如：售后工单流程" autocomplete="off">
          <button class="btn sm" id="a29ObjUse">用这个</button>
        </div>
      </div>
      <div class="a29-compbox">
        <div class="a29-h"><b>② 组件</b><span id="a29CompCnt">0 / 6</span></div>
        <div class="meter a29-meter"><i id="a29CompBar" style="width:0%"></i></div>
        <div class="chips a29-comps" id="a29Comps"></div>
        <div class="a29-add">
          <input id="a29CompIn" maxlength="12" placeholder="加一个组件，回车确认" autocomplete="off">
          <button class="btn sm" id="a29CompAdd">加</button>
        </div>
        <div class="hint" id="a29CompHint">先选对象。</div>
      </div>
    </div>
    <div class="a29-slots">
      <div class="a29-slot a">
        <div class="a29-slot-h"><span>工具 A</span><b id="a29ASt">未选</b></div>
        <div class="a29-tools" id="a29ToolsA"></div>
        <div class="a29-target-h">作用于 <span id="a29ATarget">未选组件</span></div>
        <div class="a29-targets" id="a29TargetsA"></div>
      </div>
      <div class="a29-slot b">
        <div class="a29-slot-h"><span>工具 B</span><b id="a29BSt">未选</b></div>
        <div class="a29-tools" id="a29ToolsB"></div>
        <div class="a29-target-h">作用于 <span id="a29BTarget">未选组件</span></div>
        <div class="a29-targets" id="a29TargetsB"></div>
      </div>
    </div>
    <div class="a29-warn" id="a29Warn" aria-live="polite"></div>
    <div class="a29-pair" id="a29Pair"></div>
    <div class="a29-gen">
      <div class="a29-h"><b>③ 生成一句话</b><span class="a29-gen-r"><span class="a29-cnt" id="a29LineCnt">0 / ${MIN_LINE}</span><button class="btn primary sm" id="a29Gen" disabled>生成</button></span></div>
      <textarea id="a29Line" maxlength="110" placeholder="生成后改写：说清拿掉/改变了什么，谁因此少了一步。"></textarea>
      <div class="grid2 a29-solves">
        <div class="field"><label>工具 A 解决了什么 <span class="a29-cnt" id="a29SolveACnt">0 / ${MIN_SOLVE}</span></label><textarea id="a29SolveA" maxlength="100"></textarea></div>
        <div class="field"><label>工具 B 解决了什么 <span class="a29-cnt" id="a29SolveBCnt">0 / ${MIN_SOLVE}</span></label><textarea id="a29SolveB" maxlength="100"></textarea></div>
      </div>
      <div class="hint" id="a29GenHint" style="margin-top:6px">生成的是草稿，把组件名改成你产品里的具体动作。</div>
    </div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,x=ensure(S);
  const objsEl=sec.querySelector('#a29Objs'),objIn=sec.querySelector('#a29ObjIn');
  const compsEl=sec.querySelector('#a29Comps'),compIn=sec.querySelector('#a29CompIn');
  const compCnt=sec.querySelector('#a29CompCnt'),compBar=sec.querySelector('#a29CompBar'),compHint=sec.querySelector('#a29CompHint');
  const tA=sec.querySelector('#a29ToolsA'),tB=sec.querySelector('#a29ToolsB');
  const gA=sec.querySelector('#a29TargetsA'),gB=sec.querySelector('#a29TargetsB');
  const aSt=sec.querySelector('#a29ASt'),bSt=sec.querySelector('#a29BSt');
  const aTg=sec.querySelector('#a29ATarget'),bTg=sec.querySelector('#a29BTarget');
  const warnEl=sec.querySelector('#a29Warn'),pairEl=sec.querySelector('#a29Pair');
  const line=sec.querySelector('#a29Line'),lineCnt=sec.querySelector('#a29LineCnt');
  const sA=sec.querySelector('#a29SolveA'),sB=sec.querySelector('#a29SolveB');
  const sACnt=sec.querySelector('#a29SolveACnt'),sBCnt=sec.querySelector('#a29SolveBCnt');
  const genBtn=sec.querySelector('#a29Gen'),genHint=sec.querySelector('#a29GenHint');
  const st=sec.querySelector('#a29St'),dots=sec.querySelector('#a29Dots');

  function setWarn(msg,kind){
    warnEl.className='a29-warn on '+(kind||'idle');
    warnEl.innerHTML='<b>'+(kind==='bad'?'被拦下':kind==='ok'?'成立':'提示')+'</b><span>'+api.esc(msg)+'</span>';
    if(kind==='bad'){
      warnEl.classList.remove('a29-shake');void warnEl.offsetWidth;warnEl.classList.add('a29-shake');
    }
  }
  function setCnt(el,val,min){
    el.textContent=val+' / '+min;
    el.classList.toggle('a29-pass',val>=min);
  }
  function presetOf(name){return PRESETS.find(p=>p.n===name)||null;}
  function hasWork(){return !!(x.aTool||x.aComp||x.bTool||x.bComp||x.line||x.solveA||x.solveB);}

  function paintObjs(){
    objsEl.querySelectorAll('[data-o]').forEach(b=>b.classList.toggle('on',x.obj===b.dataset.o));
    if(document.activeElement!==objIn)objIn.value=(x.obj&&!presetOf(x.obj))?x.obj:'';
  }
  function paintComps(){
    if(!x.comps.length){
      compsEl.innerHTML='<span class="small">'+(x.obj?'还没有组件，至少 6 个。':'先选对象，组件才会有参照。')+'</span>';
    }else{
      compsEl.innerHTML=x.comps.map(c=>
        '<button class="chip a29-comp" data-del="'+api.esc(c)+'" title="删除">'+api.esc(c)+'<span class="x">×</span></button>'
      ).join('');
      compsEl.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{
        const name=b.dataset.del,i=x.comps.indexOf(name);
        if(i<0)return;
        x.comps.splice(i,1);
        if(x.aComp===name)x.aComp='';
        if(x.bComp===name)x.bComp='';
        clearLine(x);api.save();paintAll();api.refresh();
      });
    }
    const n=x.comps.length;
    compCnt.textContent=n+' / '+MIN_COMP;
    compBar.style.width=Math.min(100,n/MIN_COMP*100)+'%';
    compBar.style.background=n>=MIN_COMP?'var(--ok)':'var(--acc)';
    if(!x.obj)compHint.textContent='先选对象。';
    else if(!n)compHint.textContent='从最大的那个组件开始，至少 '+MIN_COMP+' 个。';
    else if(n<MIN_COMP)compHint.textContent='还差 '+(MIN_COMP-n)+' 个组件。';
    else compHint.textContent='组件够了。点一个组件，把它指给某个工具。';
  }
  function paintTools(){
    [['a',tA],['b',tB]].forEach(p=>{
      const sel=p[0]==='a'?x.aTool:x.bTool;
      p[1].innerHTML=TOOLS.map(t=>
        '<button class="a29-tool'+(sel===t.k?' on':'')+'" data-tool="'+t.k+'" data-slot="'+p[0]+'" title="'+api.esc(t.d)+'">'+
        '<span class="a29-tool-i">'+api.icon(t.k)+'</span><b>'+t.n+'</b></button>'
      ).join('');
      p[1].querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>{
        const slot=b.dataset.slot,k=b.dataset.tool;
        const other=slot==='a'?x.bTool:x.aTool;
        if(other===k){
          setWarn('同一个工具用两次，是把一件事做两遍，不算叠加。换一个工具。','bad');
          return;
        }
        if(slot==='a')x.aTool=k;else x.bTool=k;
        clearLine(x);api.save();paintAll();api.refresh();
      });
    });
    aSt.textContent=x.aTool?(tname(x.aTool)+(x.aComp?' · '+x.aComp:'')):'未选';
    bSt.textContent=x.bTool?(tname(x.bTool)+(x.bComp?' · '+x.bComp:'')):'未选';
    aTg.textContent=x.aComp?('「'+x.aComp+'」'):'未选组件';
    bTg.textContent=x.bComp?('「'+x.bComp+'」'):'未选组件';
  }
  function paintTargets(){
    [['a',gA],['b',gB]].forEach(p=>{
      const slot=p[0],el=p[1];
      const sel=slot==='a'?x.aComp:x.bComp;
      const other=slot==='a'?x.bComp:x.aComp;
      if(!x.comps.length){
        el.innerHTML='<span class="a29-tempty">先加组件</span>';
        return;
      }
      el.innerHTML=x.comps.map(c=>{
        const taken=c===other;
        return '<button class="a29-t'+(sel===c?' on':'')+(taken?' taken':'')+'" data-target="'+api.esc(c)+'" data-slot="'+slot+'" data-taken="'+(taken?'1':'0')+'"'+
          (taken?' aria-disabled="true" title="已被工具 '+(slot==='a'?'B':'A')+' 占用"':'')+'>'+
          api.esc(c)+(taken?'<i class="a29-lock">'+(slot==='a'?'B':'A')+'占</i>':'')+'</button>';
      }).join('');
      el.querySelectorAll('[data-target]').forEach(b=>b.onclick=()=>{
        const name=b.dataset.target;
        if(b.dataset.taken==='1'){
          const otherName=slot==='a'?'B':'A';
          setWarn('「'+name+'」已经被工具 '+otherName+' 占用了。两个工具落在同一个组件上，后一个会把前一个改回去。换一个组件。','bad');
          return;
        }
        if(slot==='a')x.aComp=name;else x.bComp=name;
        clearLine(x);api.save();paintAll();api.refresh();
      });
    });
  }
  function paintWarn(){
    if(x.aComp&&x.bComp&&x.aComp===x.bComp){
      setWarn('无效：两个工具都在「'+x.aComp+'」。同一个组件上叠两个工具，后一个会把前一个改回去。','bad');
    }else if(x.aTool&&x.bTool&&x.aTool===x.bTool){
      setWarn('无效：同一个工具用了两次。换一个工具，才算两个工具叠加。','bad');
    }else if(x.aComp&&x.bComp){
      setWarn('两个工具落在不同组件上。叠加成立的最低条件已经满足。','ok');
    }else if(x.obj){
      setWarn('工具 B 不能碰工具 A 已占用的组件。点被占用的组件会被拦下。','idle');
    }else{
      setWarn('先选一个对象，再从左边挑两个工具，各指一个组件。','idle');
    }
  }
  function paintPair(){
    const A=T(x.aTool),B=T(x.bTool);
    if(!A||!B){
      pairEl.innerHTML='<span class="a29-pair-idle">两个工具选好之后，这里会显示它们各自落在哪个组件上。</span>';
      return;
    }
    let cls='',note='顺序：'+A.n+' → '+B.n;
    if(x.aComp&&x.bComp&&x.aComp===x.bComp){cls='bad';note='无效：同一组件';}
    else if(x.aTool==='sub'&&x.bTool!=='sub'){cls='ok';note='先减后加 · 推荐顺序';}
    else if(x.bTool==='sub'&&x.aTool!=='sub'){cls='warn';note='先加后减 · 先确认拿得掉';}
    else if(x.aTool==='div'){cls='ok';note='先重排，再叠加';}
    pairEl.innerHTML='<div class="a29-pair-flow">'+
      '<span class="a29-pf"><b>'+A.n+'</b><em>'+(x.aComp?'「'+api.esc(x.aComp)+'」':'未选组件')+'</em></span>'+
      '<i>→</i>'+
      '<span class="a29-pf b"><b>'+B.n+'</b><em>'+(x.bComp?'「'+api.esc(x.bComp)+'」':'未选组件')+'</em></span>'+
      '</div><span class="a29-pair-note '+cls+'">'+api.esc(note)+'</span>';
  }
  function paintStatus(){
    const arr=[
      !!(x.obj&&x.comps.length>=MIN_COMP),
      !!(x.aTool&&x.aComp),
      !!(x.bTool&&x.bComp&&x.aTool!==x.bTool&&x.bComp!==x.aComp),
      x.line.trim().length>=MIN_LINE,
      x.solveA.trim().length>=MIN_SOLVE&&x.solveB.trim().length>=MIN_SOLVE
    ];
    st.textContent=arr.filter(Boolean).length+' / 5';
    dots.querySelectorAll('i').forEach((i,k)=>i.classList.toggle('on',arr[k]));
    genBtn.disabled=!(arr[0]&&arr[1]&&arr[2]);
    genBtn.textContent=x.line?'重新生成':'生成';
    if(!arr[0])genHint.textContent='先把对象和至少 6 个组件准备好。';
    else if(!arr[1]||!arr[2])genHint.textContent='两个工具、两个不同组件，选齐了才能生成。';
    else genHint.textContent='生成的是草稿，把组件名改成你产品里的具体动作。';
    setCnt(lineCnt,x.line.trim().length,MIN_LINE);
    setCnt(sACnt,x.solveA.trim().length,MIN_SOLVE);
    setCnt(sBCnt,x.solveB.trim().length,MIN_SOLVE);
  }
  function paintInputs(){
    if(document.activeElement!==line)line.value=x.line||'';
    if(document.activeElement!==sA)sA.value=x.solveA||'';
    if(document.activeElement!==sB)sB.value=x.solveB||'';
  }
  function paintAll(){paintObjs();paintComps();paintTools();paintTargets();paintWarn();paintPair();paintInputs();paintStatus();}

  function applyObj(name,load){
    x.obj=name;
    x.comps=load&&presetOf(name)?presetOf(name).comps.slice():[];
    resetAll(x);
    api.save();paintAll();api.refresh();
  }
  function askChange(fn){
    api.modal('<button class="modal-x">×</button><h3>换对象？</h3>'+
      '<p>换对象会清空已拆的组件、两个工具的选择和生成的一句话，不能撤回。</p>'+
      '<div class="modal-actions"><button class="btn ghost" id="a29ChgNo">取消</button><button class="btn primary" id="a29ChgYes">换</button></div>');
    document.querySelector('#a29ChgNo').onclick=()=>api.closeModal();
    document.querySelector('#a29ChgYes').onclick=()=>{api.closeModal();fn();};
  }
  function choosePreset(name){
    if(x.obj===name){
      if(!x.comps.length){x.comps=presetOf(name).comps.slice();api.save();paintAll();api.refresh();api.toast('已载入参考组件');}
      else api.toast('已经是这个对象');
      return;
    }
    const run=()=>{applyObj(name,true);api.toast('已载入「'+name+'」的 '+presetOf(name).comps.length+' 个组件');};
    if(hasWork()){askChange(run);return;}
    run();
  }
  function useCustom(){
    const v=norm(objIn.value);
    if(!v){api.toast('写一个对象，例如：售后工单流程');objIn.focus();return;}
    if(presetOf(v)){choosePreset(v);return;}
    if(v===x.obj)return;
    const run=()=>{applyObj(v,false);api.toast('对象已换。组件要自己列，至少 6 个');};
    if(hasWork()){askChange(run);return;}
    run();
  }
  function addComp(){
    if(!x.obj){api.toast('先选对象');objIn.focus();return;}
    const name=norm(compIn.value);
    if(!name){compIn.focus();return;}
    if(name.length>12){api.toast('组件名控制在 12 字内');return;}
    if(x.comps.indexOf(name)>=0){api.toast('这个组件已经在清单里');compIn.value='';return;}
    if(x.comps.length>=12){api.toast('组件够多了，先删再添');return;}
    x.comps.push(name);compIn.value='';
    api.save();paintAll();api.refresh();
  }
  function generate(){
    if(!(x.obj&&x.comps.length>=MIN_COMP&&x.aTool&&x.aComp&&x.bTool&&x.bComp)){
      api.toast('先把对象、组件和两个工具选齐');return;
    }
    if(x.bComp===x.aComp){
      setWarn('两个工具在同一个组件上，生成没有意义。换一个组件。','bad');return;
    }
    if(x.aTool===x.bTool){
      setWarn('同一个工具用两次，生成出来只是重复。换一个工具。','bad');return;
    }
    const A=T(x.aTool),B=T(x.bTool);
    x.line=x.obj+'：'+A.act(x.aComp)+'，'+B.act(x.bComp)+'——'+pairNote(x.aTool,x.bTool);
    x.solveA=solveText(x.aTool);
    x.solveB=solveText(x.bTool);
    api.save();paintInputs();paintStatus();api.refresh();
    api.toast('已生成草稿。下一步是改写，不是照抄');
  }

  objsEl.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>choosePreset(b.dataset.o));
  sec.querySelector('#a29ObjUse').onclick=useCustom;
  objIn.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();useCustom();}});
  sec.querySelector('#a29CompAdd').onclick=addComp;
  compIn.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();addComp();}});
  line.addEventListener('input',()=>{
    x.line=line.value;api.save();paintStatus();api.refresh();
  });
  sA.addEventListener('input',()=>{x.solveA=sA.value;api.save();paintStatus();api.refresh();});
  sB.addEventListener('input',()=>{x.solveB=sB.value;api.save();paintStatus();api.refresh();});
  genBtn.onclick=generate;

  paintAll();
  sec.__a29lab=function(){paintAll();};
},
onEnter(){
  const sec=document.querySelector('.step[data-s="2"]');
  if(sec&&sec.__a29lab)sec.__a29lab();
},
hint(S){
  const x=view(S);
  if(!x.obj)return '先选一个对象，或自己写一个';
  if(x.comps.length<MIN_COMP)return '组件还差 '+(MIN_COMP-x.comps.length)+' 个';
  if(!x.aTool)return '给工具 A 选一个工具';
  if(!x.aComp)return '给工具 A 指一个组件';
  if(!x.bTool)return '给工具 B 选一个工具';
  if(!x.bComp)return '给工具 B 指一个组件，不能和 A 相同';
  if(x.bTool===x.aTool)return '工具 B 不能和工具 A 是同一个';
  if(x.bComp===x.aComp)return '两个工具落在同一个组件上，换一个';
  if(x.line.trim().length<MIN_LINE)return '还差 '+(MIN_LINE-x.line.trim().length)+' 字才到一句话';
  if(x.solveA.trim().length<MIN_SOLVE||x.solveB.trim().length<MIN_SOLVE)return '两个工具各自解决了什么，各 ≥8 字';
  return '';
},
gate(S){return labGate(view(S));}},

/* ================= 4 在你的事上 ================= */
{id:'own',name:'在你的事上',short:'我的',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>把你的产品，<em>也叠一次</em></h1>
<p>不换更大的题目。用你手上正在做的那个产品、服务或流程，只改两个组件。最后回答一个取舍：如果只能留一个工具，留哪个。</p></div>
<div class="grid2" style="align-items:start">
  <div class="panel">
    <div class="panel-h"><h4>1 · 你的对象与两个工具</h4><span>组件必须不同</span></div>
    <div class="field"><label>产品 / 服务 / 流程</label><input id="a29OwnObj" maxlength="60" placeholder="例如：给连锁门店做的排班系统" autocomplete="off"></div>
    <div class="a29-ownrow">
      <div class="field"><label>工具 A</label><select id="a29OwnA"></select></div>
      <div class="field"><label>作用于哪个组件</label><input id="a29OwnAComp" maxlength="16" placeholder="例如：店长排班表" autocomplete="off"></div>
    </div>
    <div class="a29-ownrow">
      <div class="field"><label>工具 B</label><select id="a29OwnB"></select></div>
      <div class="field"><label>作用于哪个组件</label><input id="a29OwnBComp" maxlength="16" placeholder="例如：员工手机" autocomplete="off"></div>
    </div>
    <div class="a29-ownwarn" id="a29OwnWarn">两个组件必须不同。名字一样，就是互相抵消。</div>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>2 · 一句话与取舍</h4><span>只写你守得住的</span></div>
    <div class="field"><label>叠加后的产品一句话 <span class="a29-cnt" id="a29OwnLineCnt">0 / ${MIN_LINE}</span></label>
      <textarea id="a29OwnLine" maxlength="90" placeholder="例如：排班系统拿掉店长手动排班表，让员工手机接手换班申请——店长只处理例外。"></textarea></div>
    <div class="field" style="margin-top:12px"><label>如果只保留一个工具，留哪个 <span class="a29-cnt" id="a29KeepCnt">0 / ${MIN_KEEP}</span></label>
      <textarea id="a29Keep" maxlength="100" placeholder="写工具名 + 一个理由。例如：留减法。没有减法，一专多能只是在给一张已经很复杂的表加活。"></textarea></div>
    <div class="row" style="margin-top:8px">
      <button class="btn sm ghost" id="a29Copy">带入叠加台草稿</button>
      <span class="hint">带入后要改成你的产品，不是照抄。</span>
    </div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,x=ensure(S);
  const obj=sec.querySelector('#a29OwnObj'),selA=sec.querySelector('#a29OwnA'),selB=sec.querySelector('#a29OwnB');
  const cA=sec.querySelector('#a29OwnAComp'),cB=sec.querySelector('#a29OwnBComp');
  const line=sec.querySelector('#a29OwnLine'),keep=sec.querySelector('#a29Keep');
  const lineCnt=sec.querySelector('#a29OwnLineCnt'),keepCnt=sec.querySelector('#a29KeepCnt');
  const warn=sec.querySelector('#a29OwnWarn');

  function opts(sel,val){
    sel.innerHTML='<option value="">选一个工具</option>'+TOOLS.map(t=>'<option value="'+t.k+'">'+t.n+'</option>').join('');
    sel.value=val||'';
  }
  function setCnt(el,val,min){el.textContent=val+' / '+min;el.classList.toggle('a29-pass',val>=min);}
  function paintWarn(){
    const a=cA.value.trim(),b=cB.value.trim();
    const ta=selA.value,tb=selB.value;
    if(a&&b&&a===b){warn.className='a29-ownwarn bad';warn.textContent='拦下：两个工具都指向「'+a+'」。同一个组件上叠两个工具，会互相抵消。';}
    else if(ta&&tb&&ta===tb){warn.className='a29-ownwarn bad';warn.textContent='拦下：工具 A 和工具 B 是同一个。换一个工具，才算叠加。';}
    else if(a&&b){warn.className='a29-ownwarn ok';warn.textContent='两个组件不同，可以往下写。';}
    else{warn.className='a29-ownwarn';warn.textContent='两个组件必须不同。名字一样，就是互相抵消。';}
  }
  function paint(){
    if(document.activeElement!==obj)obj.value=x.ownObj||'';
    if(document.activeElement!==cA)cA.value=x.ownAComp||'';
    if(document.activeElement!==cB)cB.value=x.ownBComp||'';
    if(document.activeElement!==line)line.value=x.ownLine||'';
    if(document.activeElement!==keep)keep.value=x.keep||'';
    opts(selA,x.ownA);opts(selB,x.ownB);
    setCnt(lineCnt,(x.ownLine||'').trim().length,MIN_LINE);
    setCnt(keepCnt,(x.keep||'').trim().length,MIN_KEEP);
    paintWarn();
  }
  function bind(el,key){
    el.addEventListener('input',()=>{
      x[key]=el.value;api.save();
      setCnt(lineCnt,(x.ownLine||'').trim().length,MIN_LINE);
      setCnt(keepCnt,(x.keep||'').trim().length,MIN_KEEP);
      paintWarn();api.refresh();
    });
  }
  bind(obj,'ownObj');bind(cA,'ownAComp');bind(cB,'ownBComp');bind(line,'ownLine');bind(keep,'keep');
  selA.addEventListener('change',()=>{x.ownA=selA.value;api.save();paintWarn();api.refresh();});
  selB.addEventListener('change',()=>{x.ownB=selB.value;api.save();paintWarn();api.refresh();});
  sec.querySelector('#a29Copy').onclick=()=>{
    if(!x.obj&&!x.line){api.toast('叠加台还没有内容');return;}
    const run=()=>{
      if(x.obj)x.ownObj=x.obj;
      x.ownA=x.aTool;x.ownAComp=x.aComp;
      x.ownB=x.bTool;x.ownBComp=x.bComp;
      x.ownLine=x.line;
      api.save();paint();api.refresh();api.toast('已带入。把对象和组件改成你自己的');
    };
    if((x.ownObj||x.ownLine)&&(x.ownObj!==x.obj||x.ownLine!==x.line)){
      api.modal('<button class="modal-x">×</button><h3>覆盖现在的草稿？</h3><p>带入会覆盖你已经写的对象、工具、组件和一句话。取舍那一栏不动。</p>'+
        '<div class="modal-actions"><button class="btn ghost" id="a29CopyNo">取消</button><button class="btn primary" id="a29CopyYes">覆盖</button></div>');
      document.querySelector('#a29CopyNo').onclick=()=>api.closeModal();
      document.querySelector('#a29CopyYes').onclick=()=>{api.closeModal();run();};
      return;
    }
    run();
  };
  paint();
},
hint(S){
  const x=view(S);
  if(x.ownObj.trim().length<2)return '先写你的产品/服务';
  if(!x.ownA||!x.ownB)return '两个工具都要选';
  if(x.ownA===x.ownB)return '工具 A 和 B 不能是同一个';
  if(!x.ownAComp.trim()||!x.ownBComp.trim())return '两个工具各指一个组件';
  if(x.ownAComp.trim()===x.ownBComp.trim())return '两个组件不能同名，换一个';
  if(x.ownLine.trim().length<MIN_LINE)return '一句话还差 '+(MIN_LINE-x.ownLine.trim().length)+' 字';
  if(x.keep.trim().length<MIN_KEEP)return '“只留一个”还差 '+(MIN_KEEP-x.keep.trim().length)+' 字';
  return '';
},
gate(S){return ownGate(view(S));}},

/* ================= 5 过滤与提交 ================= */
{id:'submit',name:'过滤与提交',short:'提交',kicker:'STEP 5 · 过滤与提交',
html:`
<div class="step-h"><h1>两问，<em>决定这张卡能不能交</em></h1>
<p>不是打分。两个问题，各自指向一种具体的失败方式：两个工具互相抵消，或者用户根本说不清。</p></div>
<div class="a29-filters">
  <div class="panel">
    <div class="panel-h"><h4>问题 01 · 两个工具会不会互相抵消</h4><span>单选</span></div>
    <div class="opts">
      <button class="opt" data-q1="a"><span class="k">A</span><span><b>不会</b><span>两个工具落在不同组件上，各改各的</span></span></button>
      <button class="opt" data-q1="b"><span class="k">B</span><span><b>有一点</b><span>用户要多学一步，才感觉得到两个改动</span></span></button>
      <button class="opt" data-q1="c"><span class="k">C</span><span><b>会</b><span>第二个工具把第一个的结果改回去了</span></span></button>
    </div>
    <div class="a29-qhint" id="q1Out"></div>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>问题 02 · 用户能不能一句话说清</h4><span>单选</span></div>
    <div class="opts">
      <button class="opt" data-q2="a"><span class="k">A</span><span><b>能</b><span>同事听完，能用自己的话复述一遍</span></span></button>
      <button class="opt" data-q2="b"><span class="k">B</span><span><b>要三句以上</b><span>还得画一张图才说得明白</span></span></button>
      <button class="opt" data-q2="c"><span class="k">C</span><span><b>说不清</b><span>现在只有我自己明白</span></span></button>
    </div>
    <div class="a29-qhint" id="q2Out"></div>
  </div>
</div>
<div class="grid2" style="margin-top:12px;align-items:start">
  <div id="cardSlot"></div>
  <div class="panel">
    <div class="panel-h"><h4>提交</h4><span id="subSt">未提交</span></div>
    <p class="small">提交后引擎会自动跑一次 AI 评审（有用 / 可行 / 证据），再进入班级互评。</p>
    <div class="row" style="margin-top:10px">
      <button class="btn primary" id="subBtn" disabled>提交</button>
      <button class="btn" id="expBtn">导出 PNG</button>
    </div>
    <div class="a29-verdict" id="verdict"></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,x=ensure(S);
  const slot=sec.querySelector('#cardSlot'),subBtn=sec.querySelector('#subBtn'),subSt=sec.querySelector('#subSt');
  const q1Out=sec.querySelector('#q1Out'),q2Out=sec.querySelector('#q2Out'),verdict=sec.querySelector('#verdict');

  const Q1={
    a:'这是叠加成立的最低条件。再看第二问。',
    b:'不是致命问题，但两个改动都在向用户要注意力。先留一个更硬的。',
    c:'回叠加台。把工具 B 换到另一个组件，或把工具 A 换掉。'
  };
  const Q2={
    a:'可以提交。一句话能被复述，说明两个改动指向同一个用户。',
    b:'把一句话压到 30 字以内。压不下去，通常是两个改动服务的是两拨人。',
    c:'先别提交。写不出用户版本，意味着这张卡还停在工具层。'
  };
  function needRows(){
    return [
      {k:'练习：两个工具、两个组件',ok:labGate(x),tip:labGate(x)?'已完成':'回第 3 步'},
      {k:'我的产品与取舍',ok:ownGate(x),tip:ownGate(x)?'已完成':'回第 4 步'},
      {k:'第一问',ok:!!x.q1,tip:x.q1?'已答':'未答'},
      {k:'第二问',ok:!!x.q2,tip:x.q2?'已答':'未答'}
    ];
  }
  function ready(){return labGate(x)&&ownGate(x)&&!!x.q1&&!!x.q2;}
  function paintQ(){
    sec.querySelectorAll('[data-q1]').forEach(b=>b.classList.toggle('on',x.q1===b.dataset.q1));
    sec.querySelectorAll('[data-q2]').forEach(b=>b.classList.toggle('on',x.q2===b.dataset.q2));
    q1Out.innerHTML=x.q1?'<b>'+(x.q1==='a'?'不抵消':'注意')+'</b>'+api.esc(Q1[x.q1]||''):'';
    q1Out.className='a29-qhint'+(x.q1==='a'?' ok':x.q1?' warn':'');
    q2Out.innerHTML=x.q2?'<b>'+(x.q2==='a'?'说得清':'还不够')+'</b>'+api.esc(Q2[x.q2]||''):'';
    q2Out.className='a29-qhint'+(x.q2==='a'?' ok':x.q2?' warn':'');
  }
  function paintVerdict(){
    const v=verdictOf(x.q1,x.q2);
    verdict.className='a29-verdict '+(v.k||'');
    verdict.innerHTML='<b>判断</b><span>'+api.esc(v.t)+'</span>';
  }
  function paintCard(){
    const c=L.card(S);
    const miss=needRows().filter(r=>!r.ok);
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A29</span><span>叠加卡</span></div>'+
      '<h5>'+api.esc(c.title)+'</h5><div class="kv">'+
      c.rows.map(r=>'<div><b>'+api.esc(r[0])+'</b><span class="'+(r[1]&&r[1]!=='—'?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+
      '</div></div>'+
      (miss.length
        ?'<div class="a29-miss">还欠：'+api.esc(miss.map(r=>r.k).join(' · '))+'</div>'+
          '<div class="panel a29-need" style="margin-top:10px"><div class="panel-h"><h4>还差什么</h4><span>四项</span></div>'+
          needRows().map(r=>'<div class="a29-needrow '+(r.ok?'on':'')+'"><i>'+(r.ok?'✓':'○')+'</i><b>'+r.k+'</b><span>'+api.esc(r.tip)+'</span></div>').join('')+
          '</div>'
        :'');
  }
  function paintSubmit(){
    const r=ready();
    subBtn.disabled=!!S.submitted||!r;
    subBtn.textContent=S.submitted?'已提交':(r?'提交到班级':'先补齐卡片');
    subSt.textContent=S.submitted?'已提交 · 进入互评池':(r?'卡齐了 · 可以提交':'卡还不完整');
  }
  function paintAll(){paintQ();paintVerdict();paintCard();paintSubmit();}
  sec.querySelectorAll('[data-q1]').forEach(b=>b.onclick=()=>{
    x.q1=b.dataset.q1;api.save();paintAll();api.refresh();
  });
  sec.querySelectorAll('[data-q2]').forEach(b=>b.onclick=()=>{
    x.q2=b.dataset.q2;api.save();paintAll();api.refresh();
  });
  subBtn.onclick=async()=>{
    if(!ready()){api.toast('卡还不完整，先补齐');return;}
    subBtn.disabled=true;subBtn.textContent='提交中…';
    try{await api.submit();}catch(e){api.toast('提交出错，已存本机');}
    paintAll();
  };
  sec.querySelector('#expBtn').onclick=()=>api.exportCard();
  paintAll();
  sec.__a29sub=function(){paintAll();};
},
onEnter(){
  const sec=document.querySelector('.step[data-s="4"]');
  if(sec&&sec.__a29sub)sec.__a29sub();
},
hint(S){
  const x=view(S);
  if(!labGate(x))return '第 3 步的叠加台还没走完';
  if(!ownGate(x))return '第 4 步的取舍还没写完';
  if(!x.q1)return '先答第一问：会不会互相抵消';
  if(!x.q2)return '再答第二问：一句话说不说得清';
  if(!S.submitted)return '点提交，机器会先评一遍';
  return '';
},
gate(S){return !!(labGate(view(S))&&ownGate(view(S))&&view(S).q1&&view(S).q2&&S.submitted);}},

/* ================= 6 收束 ================= */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>叠加成立，<em>只靠三条</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel a29-take"><div class="a29-k">01 两个工具，两个组件</div><b>同一组件就是互相抵消</b><span>第二个工具会把第一个的结果改回去。说不出组件名，就还没有叠加。</span></div>
  <div class="panel a29-take"><div class="a29-k">02 先减后加</div><b>先腾位置，再放东西</b><span>反过来，加法已经花了钱、进了样机，减法就轮不到产品，只能轮到预算。</span></div>
  <div class="panel a29-take"><div class="a29-k">03 一句话说不清</div><b>就是还没叠好</b><span>用户能复述的那一句，通常只有一个主角、一个场景、少了一步。</span></div>
</div>
<div class="panel a29-next">
  <div class="panel-h"><h4>下一节</h4><span>A30 · 可行性五问</span></div>
  <p class="small">A29 让概念成立；A30 判断它明天能不能动手。同一张叠加卡，过五道问：</p>
  <div class="a29-five">
    <div><i>01</i><b>谁付钱</b><span>现在他为什么愿意掏这笔钱</span></div>
    <div><i>02</i><b>谁来做</b><span>缺的能力是招人、外包，还是根本还没有</span></div>
    <div><i>03</i><b>合不合规</b><span>有没有一条规定，让这个改动不能上线</span></div>
    <div><i>04</i><b>习惯改不改得动</b><span>用户要多学一步，还是少做一步</span></div>
    <div><i>05</i><b>90 天见不见得到结果</b><span>第一个能拿给用户看的东西是什么</span></div>
  </div>
  <div class="row" style="margin-top:12px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div>
</div>`,
init(sec,api){sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},
gate(){return true;}}
],

side:{asks:[
 '两个工具分别作用在哪个组件上？说不出组件，就还没有叠加。',
 '第二个工具，会不会把第一个的结果改回去？',
 '如果先做加法再做减法，你拿得掉吗？',
 '只保留一个工具，你留哪个？为什么不是另一个？',
 '用户会用哪一句话复述你的产品？他自己说得出来吗？'
]},

card(S){
  const x=view(S);
  const A=x.ownA||x.aTool,B=x.ownB||x.bTool;
  const cA=x.ownAComp||x.aComp,cB=x.ownBComp||x.bComp;
  const line=x.ownLine||x.line;
  return {title:'A29 · 两个工具叠加卡',rows:[
    ['对象',x.ownObj||x.obj||'—'],
    ['工具 A',A?(tname(A)+' · '+(cA||'—')):'—'],
    ['工具 B',B?(tname(B)+' · '+(cB||'—')):'—'],
    ['一句话',line||'—'],
    ['各自解决',(x.solveA||x.solveB)?('A：'+(x.solveA||'—')+' / B：'+(x.solveB||'—')):'—'],
    ['只留一个',x.keep||'—']
  ]};
},

notes:[
 {t:'本节目标',h:'让学员分清“用了两个工具”和“两个工具叠加”：前者是数量，后者要求两个工具落在<b>不同组件</b>上，并且能说清各自解决了什么。'},
 {t:'时间分配（45′）',h:'自学 27′：先猜 4′ · 两个原则 6′ · 叠加台 12′ · 在你的事上 5′。直播 13′：只解剖 3 张卡。两问、提交与互评 5′。'},
 {t:'常见卡点',h:'① 两个工具都指向同一个组件，第二个把第一个改回去；② 工具栏里选了五个，卡上只有一个动作；③ 一句话写成“更智能、更高效”，没有说清少掉的是哪一步；④ “只留一个”写成两个都重要——那是没做取舍。'},
 {t:'直播怎么接',h:'打开直播中控，先看两列：<b>被拦下的同组件次数</b>和<b>只留一个</b>。挑 3 张：1 张两个工具分别落在设备与现场（像 Sedasys）、1 张同组件被拦下后改对的、1 张“只留一个”写成两个都留的。现场只问一句：<b>“如果只能留一个，你留哪个？另一个解决的那件事，谁来接？”</b>让学员在弹幕里答，再回到两个原则。'},
 {t:'判分口径',h:'两个工具是否真的作用于不同组件 35%；一句话是否让用户少掉/多出一个具体动作 25%；“各自解决”是否各说一件事 20%；“只留一个”是否有理由 20%。不评点子新不新。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A29']=L;
})();
