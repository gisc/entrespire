/* A34 · 流程创新：组织落地 */
(function(){
'use strict';

const IMG={er:'assets-cases-a34-er.jpg',lab:'assets-cases-a34-lab.jpg'};

/* ---------- 四个卡点 ---------- */
const KP=[
 {k:'kp1',n:'① 没人对整条链负责',s:'① 无主',
  q:'问「这条链上出事找谁」，如果答案是「看哪一段」，就是它。',
  d:'方案写清了每一步做什么，没写谁对从第一步到最后一步负责。'},
 {k:'kp2',n:'② KPI 还是旧的',s:'② 旧 KPI',
  q:'新流程省下来的时间，有没有出现在任何人的考核里。',
  d:'新流程多出来的工时，落在没有考核保护的人头上。'},
 {k:'kp3',n:'③ 中间层的权力被削',s:'③ 削权',
  q:'有没有一级被绕过，或者某个岗位的审批、信息优势消失。',
  d:'他不会说「我舍不得权力」，他会说「合规」「风险」「我们这儿特殊」。'},
 {k:'kp4',n:'④ 异常路径没人设计',s:'④ 异常',
  q:'只写了顺利时怎么走；问「客户不在 / 系统断了 / 票丢了」，答不上来。',
  d:'异常一出现就退回旧流程，三周之后，旧流程就成了默认。'}
];
const WHO=[
 {k:'boss',n:'一把手',d:'能改考核，能指定谁对整条链负责'},
 {k:'mid',n:'中间层',d:'管着一段，也管着这一段的指标和人'},
 {k:'front',n:'一线',d:'每天真的做这个动作的人'},
 {k:'it',n:'IT',d:'能把异常路径做进系统的人'}
];
const kpOf=k=>KP.find(x=>x.k===k);
const whoOf=k=>WHO.find(x=>x.k===k);
const kpName=k=>{const x=kpOf(k);return x?x.n:'—';};
const whoName=k=>{const x=whoOf(k);return x?x.n:'—';};

/* ---------- 六个提案 ---------- */
const CASES=[
 {id:'lab',n:'医院检验前置',d:'抽血与贴条码从检验科窗口挪到分诊台，急诊先抽后诊',
  best:'kp1',who:'front',
  why:'方案写了「由分诊台完成采血」，没写标本几点、由谁、送到哪张台。出现溶血标本时，护理部和检验科都能证明自己没错。',
  whoWhy:'先找分诊台护士和检验科收样员，把交接写成一张纸：几点、几支、谁签字。动作定下来，再找院领导要人。',
  alt:'④ 也会碰到：异常标本谁处理，方案里同样没写。'},

 {id:'accept',n:'客户验收前移',d:'验收从交付前移到每个里程碑，客户逐段签字',
  best:'kp2',who:'boss',
  why:'销售按签约额考核，交付按上线日期考核。验收前移让项目经理多出四次客户会，这笔工时不在任何人的考核里，也没人为「客户不签字」负责。',
  whoWhy:'先找能改考核的人：把「里程碑客户签字率」写进项目经理的考核，销售的一部分奖金后移到验收。',
  alt:'③ 也会碰到：客户经理少了最后一次性搞定的空间。'},

 {id:'expense',n:'报销两级审批',d:'五级审批减到两级，按金额分档，事后抽查',
  best:'kp3',who:'mid',
  why:'被砍掉的那一级不会说「我舍不得权力」，他会说「合规风险」。他真正的损失是：报销单不再经过他，他也就看不到部门在花什么钱。',
  whoWhy:'先给被绕过的那一级一个新位置：月度抽查 10%，异常单仍然过他那一道。权力换成责任，他才不会用风险把流程顶回去。',
  alt:'② 也会碰到：财务的差错率考核没改，他不敢放。'},

 {id:'remote',n:'远程面试',d:'终面从现场改线上，跨城市岗位先线上面',
  best:'kp4',who:'it',
  why:'顺利时的路径写得很清楚：约时间、开链接、面 45 分钟。断线怎么办、两个人同时说话怎么记分、候选人没有摄像头怎么办，一条都没写。第三周，招聘经理自己改回了现场。',
  whoWhy:'先动 IT：把断线重连、录音、结构化评分表做进面试系统。异常路径做进工具，比开会强调「大家尽量线上」有用。',
  alt:'③ 也会碰到：用人经理失去了见一面的判断权。'},

 {id:'checkout',n:'门店自助结账',d:'高峰开四台自助机，两名收银员转岗做引导',
  best:'kp2',who:'mid',
  why:'收银员按件计工时，店长按收银差错和防损考核。自助机把这两笔账都打乱了：漏扫算谁的、引导算不算工时。方案只改了动线，没改指标。',
  whoWhy:'先找店长：把收银差错的考核换成盘点差异率，给自助机一个开关权，在他自己的店里先试两周。',
  alt:'④ 也会碰到：漏扫、重复扫、老人不会用，异常没人接。'},

 {id:'pool',n:'跨部门需求池',d:'所有需求进一个池子，统一排优先级和交付',
  best:'kp1',who:'boss',
  why:'池子有入口，没有池主。需求从进池到上线要穿过四个部门，每个部门只对自己的那一段负责；排期一拖，四个部门都能拿出证据说明不是自己慢。',
  whoWhy:'先要一个名字：池主，对从进池到上线的周期负责。级别要够，能直接改排期，不必每次开会协调。',
  alt:'② 也会碰到：各部门按上线需求数考核，排队等于让自己的 KPI 等别人。'}
];

/* ---------- 两问 ---------- */
const F1=[
 {k:'open',n:'会，当场就说',d:'反对票摆在桌上'},
 {k:'quiet',n:'不会，但会拖',d:'用「再等等」拖住'},
 {k:'unsure',n:'说不准',d:'还没单独问过'}
];
const F1N={
 open:'公开反对是好事：他把代价说出来了。你要准备的是一份替代方案和一个回退时间，不是一套反驳。',
 quiet:'更难。不公开反对的人会用「再等等」「先小范围」拖。给他一个期限，再给他一条可回退的路。',
 unsure:'会前十分钟单独问一次，比会上十分钟便宜。别在会上第一次听到他的意见。'
};
const F2=[
 {k:'yes',n:'有，能绕开',d:'不经过他也能走'},
 {k:'no',n:'没有，必须过他',d:'签字或资源在手上'},
 {k:'unknown',n:'还没想',d:'得先画一遍'}
];
const F2N={
 yes:'有替代路径就先用它跑一遍，再回来谈。绕开不是目的，是让他看见不经过他也行。',
 no:'必须过他，就先改他的责任或考核，别改他的态度。态度在会上改不了。',
 unknown:'先画一遍：从你的动作到他签字之间，有没有一步可以不由他完成。'
};
const F1N_SHORT={open:'会公开反对',quiet:'不公开，会拖',unsure:'说不准'};
const F2N_SHORT={yes:'有不依赖他的路径',no:'必须过他',unknown:'还没想'};

function conclude(a){
 const c1=a.f1,c2=a.f2;
 if(!c1||!c2)return '';
 if(c1==='open'&&c2==='yes')return '他会在会上说，你手上有另一条路。按原计划推进，把他的反对写进会议纪要，同时把替代路径跑到月底。';
 if(c1==='open'&&c2==='no')return '他会在会上说，而你只能过他。先别宣布，用 30 天做出一条替代路径，再回到会上。';
 if(c1==='open'&&c2==='unknown')return '他会在会上说。开会前先画一遍：哪一步可以不由他完成。画不出来，就先别提交。';
 if(c1==='quiet'&&c2==='yes')return '他不会公开说，但会拖。给一个 30 天的期限和一条不经过他的路径，到期只看数据。';
 if(c1==='quiet'&&c2==='no')return '他不会公开说，而你必须过他。先改他的责任，不改他的态度；同时把回退方案写进一页纸。';
 if(c1==='quiet'&&c2==='unknown')return '他不会公开说。先找出那个可以不经他的动作，再谈时间表。';
 if(c1==='unsure'&&c2==='yes')return '先单独问一次。他公开反对时，你至少知道反对的是哪一条，而不是「整体感觉不对」。';
 if(c1==='unsure'&&c2==='no')return '先单独问一次，问清他签字要看到什么。问不出条件，就是不想签。';
 return '先单独问一次，再画一遍路径。两件事都做完，再提交。';
}

/* ---------- 状态 ---------- */
function NS(S){S.answers.a34=S.answers.a34||{};return S.answers.a34;}
function CS(S){const a=S.answers.a34;return (a&&a.cases)||{};}
function doneN(S){
 const c=CS(S);
 return CASES.filter(x=>c[x.id]&&c[x.id].kp&&c[x.id].who).length;
}
function tally(S){
 const c=CS(S),t={kp1:0,kp2:0,kp3:0,kp4:0};
 Object.keys(c).forEach(k=>{const v=c[k];if(v&&v.kp&&t[v.kp]!=null)t[v.kp]++;});
 return t;
}
function filterLine(S){
 const a=S.answers.a34||{};
 if(!a.f1||!a.f2)return '—';
 return F1N_SHORT[a.f1]+' / '+F2N_SHORT[a.f2];
}

/* ---------- 链路图（本课重绘） ---------- */
const MAP=`<svg class="a34-map" viewBox="0 0 660 170" fill="none" aria-hidden="true">
 <path class="a34-m-faint" d="M18 12H642" opacity=".14"/>
 <text class="a34-m-dept" x="133" y="14">护理部</text>
 <text class="a34-m-dept" x="385" y="14">检验科</text>
 <text class="a34-m-dept" x="570" y="14">门诊</text>
 <path class="a34-m-div" d="M263 22V154"/>
 <g class="a34-m-box"><rect x="18" y="56" width="96" height="34" rx="5"/></g>
 <g class="a34-m-box"><rect x="144" y="56" width="104" height="34" rx="5"/></g>
 <g class="a34-m-box"><rect x="278" y="56" width="96" height="34" rx="5"/></g>
 <g class="a34-m-box"><rect x="404" y="56" width="88" height="34" rx="5"/></g>
 <g class="a34-m-box"><rect x="522" y="56" width="96" height="34" rx="5"/></g>
 <text class="a34-m-t" x="66" y="77">分诊台</text>
 <text class="a34-m-t" x="196" y="77">抽血 · 贴条码</text>
 <text class="a34-m-t" x="326" y="77">检验科</text>
 <text class="a34-m-t" x="448" y="77">出报告</text>
 <text class="a34-m-t" x="570" y="77">医生</text>
 <path class="a34-m-ar" d="M114 73H136"/><path class="a34-m-ar" d="M132 69l4 4-4 4"/>
 <path class="a34-m-ar" d="M248 73H270"/><path class="a34-m-ar" d="M266 69l4 4-4 4"/>
 <path class="a34-m-ar" d="M374 73H396"/><path class="a34-m-ar" d="M392 69l4 4-4 4"/>
 <path class="a34-m-ar" d="M492 73H514"/><path class="a34-m-ar" d="M510 69l4 4-4 4"/>
 <circle class="a34-m-ring" cx="263" cy="73" r="12"/>
 <text class="a34-m-hot" x="263" y="77">①</text>
 <text class="a34-m-lb" x="269" y="50">② 旧 KPI：按样本量计</text>
 <text class="a34-m-lb" x="410" y="44">③ 门诊办审批</text>
 <path class="a34-m-lead" d="M196 90V126"/>
 <text class="a34-m-lb" x="188" y="140">④ 异常：溶血 / 条码失败</text>
 <text class="a34-m-hot" x="188" y="156">？</text>
 <text class="a34-m-lb" x="263" y="112">① 整条链无主</text>
</svg>`;

let paint5=null;

const L={
id:'A34',week:9,seq:34,title:'流程创新：组织落地',
kicker:'WEEK 9 · 流程与组织',tool:'div',toolName:'流程创新',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>同一套流程，<em>两个院区两种结局</em></h1>
<p>同一家医院，同一套「检验前置」：把抽血和贴条码从检验科窗口挪到分诊台。<b>A 院区 3 个月跑顺，急诊停留少了 22 分钟；B 院区第 19 天退回原样</b>，护士照旧把管子送到三楼窗口。同一份方案、同一家供应商、同一场培训。</p></div>
<div class="a34-hook">
  <div class="a34-shots">
    <figure class="case-card a34-shot">
      <button class="case-zoom" data-zoom="er" title="看大图">⤢</button>
      <img src="${IMG.er}" alt="急诊入口指示牌" loading="lazy">
      <figcaption><b>急诊入口 · B 院区</b><span>第 19 天，流程退回了原来的窗口。</span>
        <em>图：SIT 官方课程材料（已授权）</em></figcaption>
    </figure>
    <figure class="case-card a34-shot">
      <button class="case-zoom" data-zoom="lab" title="看大图">⤢</button>
      <img src="${IMG.lab}" alt="采血管" loading="lazy">
      <figcaption><b>采血管 · 被挪动的那一步</b><span>从分诊台到检验科，中间有三次交接。</span>
        <em>图：SIT 官方课程材料（已授权）</em></figcaption>
    </figure>
  </div>
  <div class="a34-hook-r">
    <div class="a34-ask"><span class="a34-ask-k">先别急着归因</span>
      <p>A 院区的预算一样紧，B 院区的护士也不是反对——她们只是<b>不知道该把管子交给谁</b>。</p>
      <p style="margin-top:4px">那么，最可能的原因是哪一条？</p></div>
    <div class="opts">
      <button class="opt" data-h="a"><span class="k">A</span><span><b>预算不够</b><span>B 院区砍掉了项目经费</span></span></button>
      <button class="opt" data-h="b"><span class="k">B</span><span><b>流程本身有问题</b><span>这套改法在别的医院也失败</span></span></button>
      <button class="opt" data-h="c"><span class="k">C</span><span><b>没人负责跨部门那一步</b><span>交接挂在两个科室之间</span></span></button>
      <button class="opt" data-h="d"><span class="k">D</span><span><b>员工抵触</b><span>护士不愿意多干一步</span></span></button>
    </div>
  </div>
</div>
<div id="a34HookOut" class="a34-hookout"></div>`,
init(sec,api){
  const S=api.S,a=NS(S),out=sec.querySelector('#a34HookOut');
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',a.hook===b.dataset.h));
    if(!a.hook){out.innerHTML='';return;}
    const ok=a.hook==='c';
    out.innerHTML='<div class="a34-reveal '+(ok?'ok':'warn')+'">'+
      '<div class="a34-reveal-h"><span>'+(ok?'你抓到了这一节的核心':'预算是结果，不是原因')+'</span><span>A 院区 3 个月 · B 院区 19 天</span></div>'+
      '<p>'+(ok?'对。B 院区缺的不是预算，也不是意愿，是一个对「从分诊台到出报告」整条链负责的人。'
        :'更准确的是 C：缺一个对整条链负责的人。预算、抵触、流程设计，在这件事里都是结果。')+'</p>'+
      '<p>A 院区多了这样一个人：检验科指定一位项目负责人，每天早上 8:30 在分诊台站 20 分钟，管条码、管交接、管异常。她的考核里有一条「标本周转时间」。</p>'+
      '<p>B 院区没有这个人。这件事写在两个科室的周会议题里：检验科等护理部先动，护理部等检验科给培训。第 19 天，一支溶血标本没人认，退回窗口，护士长说「还是送三楼吧」。预算在 A 院区也不宽裕；护士并不反对，她们只是不想为一个没人认的环节负责。</p>'+
      '<p><b>缺一个对整条链负责的人。</b></p>'+
      '<p class="a34-note">流程图上多一条箭头，组织里就多一个交接。交接上没有名字，就会退回原样。</p>'+
      '</div>';
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{a.hook=b.dataset.h;api.save();paint();api.refresh();});
  sec.querySelectorAll('[data-zoom]').forEach(b=>b.onclick=e=>{
    e.stopPropagation();
    const id=b.dataset.zoom;
    api.modal('<button class="modal-x">×</button><h3>'+(id==='er'?'急诊入口':'采血管')+'</h3>'+
      '<figure class="a34-zoomfig"><img src="'+IMG[id]+'" alt=""></figure>'+
      '<p>'+(id==='er'?'B 院区急诊入口。流程改动的第 19 天，抽血回到了三楼检验科窗口。'
        :'被挪动的那一步：从分诊台到检验科，中间有三次交接——贴条码、送标本、收样确认。')+'</p>'+
      '<p class="small">图：SIT 官方课程材料（已授权）。教学案例为复合场景，配图来自官方材料。</p>');
  });
  paint();
},
hint(S){return NS(S).hook?'':'先选一个：最可能的原因';},
gate(S){return !!NS(S).hook;}},

/* ---------- 2 概念 ---------- */
{id:'concept',name:'概念',short:'概念',kicker:'STEP 2 · 概念',
html:`
<div class="step-h"><h1>流程改动会<em>穿过组织</em></h1>
<p>流程图上是箭头，组织里是人。一条箭头改掉，三个人的工作量、两级审批、一份记录会同时变。落不了地，通常不是方案错，是这四道坎里有一道没过。</p></div>
<figure class="a34-fig">
  ${MAP}
  <figcaption>图：本课重绘 · 一条被科室边界切开的流程。四个卡点各在自己那一段里，单看谁都正常。</figcaption>
</figure>
<div class="a34-kps">
  ${KP.map(k=>`<div class="a34-kp"><div class="a34-kp-h"><span>${k.s.slice(0,1)}</span><b>${k.n.replace(/^[①②③④]\s*/,'')}</b></div>
    <p class="a34-kp-q">${k.q}</p><p class="a34-kp-d">${k.d}</p></div>`).join('')}
</div>
<div class="a34-choice">
  <div class="panel-h"><h4>流程改完，两个部门都没提反对意见。这说明什么？</h4><span>二选一</span></div>
  <div class="opts a34-opts2">
    <button class="opt" data-c2="a"><span class="k">A</span><span><b>说明这次改得顺</b><span>可以往下推</span></span></button>
    <button class="opt" data-c2="b"><span class="k">B</span><span><b>说明还没人算清自己要多干什么</b><span>先别宣布</span></span></button>
  </div>
  <div id="a34C2Out" class="a34-c2out"></div>
</div>
<div class="a34-boundary"><b>什么时候别用：</b>改动只在一个岗位内部、不经过任何交接、也不改任何人的考核——直接做，不必体检。涉及安全、合规、财务授权、合同留痕的改动，不走这套判断，走正式变更流程。</div>`,
init(sec,api){
  const S=api.S,a=NS(S),out=sec.querySelector('#a34C2Out');
  function paint(){
    sec.querySelectorAll('[data-c2]').forEach(b=>b.classList.toggle('on',a.concept===b.dataset.c2));
    if(!a.concept){out.innerHTML='';return;}
    const ok=a.concept==='b';
    out.innerHTML='<div class="a34-reveal '+(ok?'ok':'warn')+'">'+
      '<div class="a34-reveal-h"><span>'+(ok?'这就是该有的怀疑':'没人反对不等于没人受损')+'</span><span>沉默的会议</span></div>'+
      '<p class="small">'+(ok?'B。反对意见通常在算完工时之后才出现，不在方案会上。两个部门都不说话，多半是还没人确认这件事真的要他做。'
        :'A 可能对，但你现在没有证据。会上不提反对，常见的原因有三个：没听懂、不归他管、还没算工时。三个都不是「同意」。')+'</p>'+
      '<p class="small">A05 里的猴子不会告诉你它怕什么。组织里的人会，但要等他确认这件事真的要他做。</p></div>';
  }
  sec.querySelectorAll('[data-c2]').forEach(b=>b.onclick=()=>{a.concept=b.dataset.c2;api.save();paint();api.refresh();});
  paint();
},
hint(S){return NS(S).concept?'':'选一个判断：两个部门都不反对，说明什么';},
gate(S){return !!NS(S).concept;}},

/* ---------- 3 体检台 ---------- */
{id:'bench',name:'落地体检',short:'体检台',kicker:'STEP 3 · 落地体检台',
html:`
<div class="step-h a34-bench-h"><h1>六条改动，<em>逐条体检</em></h1>
<p>六个提案都在公司里出现过，也都有没做成的版本。每条只判两件事：最可能卡在哪个卡点、先动谁。判完立刻给解释——解释是这条的判断，不是唯一答案。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>读提案</span>
  <span class="op"><span class="op-n">2</span>判最可能卡住的那个卡点</span>
  <span class="op"><span class="op-n">3</span>选先动谁</span>
</div>
<div class="bench a34-bench">
  <div class="bench-h"><b>BENCH · 落地体检台</b><span class="st" id="a34St">已判 0 / 6</span></div>
  <div class="bench-b">
    <div class="a34-grid" id="a34Grid"></div>
    <div class="a34-sum" id="a34Sum"></div>
  </div>
  <div class="bench-f">
    <span class="small">判定按「最可能」，不按「对不对」。判错会给另一个可能，不改判也能往下走。</span>
    <div style="flex:1"></div>
    <span class="small mono" id="a34Tally">① 0 · ② 0 · ③ 0 · ④ 0</span>
    <button class="btn sm ghost" id="a34Reset">全部重来</button>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=NS(S);
  a.cases=a.cases||{};
  const grid=sec.querySelector('#a34Grid'),st=sec.querySelector('#a34St'),
        sum=sec.querySelector('#a34Sum'),tal=sec.querySelector('#a34Tally');
  grid.innerHTML=CASES.map((c,i)=>'<div class="a34-case" data-c="'+c.id+'">'+
    '<div class="a34-case-h"><span class="n">'+String(i+1).padStart(2,'0')+'</span><b>'+api.esc(c.n)+'</b>'+
    '<button class="a34-undo" data-undo title="重判这条">↺</button></div>'+
    '<p class="a34-case-d">'+api.esc(c.d)+'</p>'+
    '<div class="a34-line"><span class="a34-lb">卡在</span><span class="a34-seg" data-seg="kp">'+
      KP.map(k=>'<button data-kp="'+k.k+'" title="'+api.esc(k.n)+'">'+k.s+'</button>').join('')+'</span></div>'+
    '<div class="a34-line"><span class="a34-lb">先动</span><span class="a34-seg" data-seg="who">'+
      WHO.map(w=>'<button data-wh="'+w.k+'" title="'+api.esc(w.d)+'">'+w.n+'</button>').join('')+'</span></div>'+
    '<div class="a34-note" data-note>先判卡点，再选先动谁。</div></div>').join('');

  let lastDone=-1;
  function paint(){
    let done=0;
    grid.querySelectorAll('[data-c]').forEach(el=>{
      const c=CASES.find(x=>x.id===el.dataset.c),v=a.cases[c.id]||{};
      el.querySelectorAll('[data-kp]').forEach(b=>b.classList.toggle('on',v.kp===b.dataset.kp));
      el.querySelectorAll('[data-wh]').forEach(b=>b.classList.toggle('on',v.who===b.dataset.wh));
      const ok=!!(v.kp&&v.who);if(ok)done++;
      el.classList.toggle('done',ok);
      const note=el.querySelector('[data-note]');
      let h='';
      if(v.kp){
        h+='<p class="'+(v.kp===c.best?'hit':'near')+'"><b>'+(v.kp===c.best?'更可能卡在这里':'这条更可能先卡在「'+kpName(c.best)+'」')+'</b>'+api.esc(c.why)+'</p>';
        if(v.kp!==c.best)h+='<p class="alt">'+api.esc(c.alt)+'</p>';
      }
      if(v.who){
        h+='<p class="'+(v.who===c.who?'hit':'near')+'"><b>'+(v.who===c.who?'先动这里':'先动「'+whoName(c.who)+'」更省力')+'</b>'+api.esc(c.whoWhy)+'</p>';
      }
      note.innerHTML=h||'先判卡点，再选先动谁。';
    });
    const t=tally(S);
    if(lastDone>=0&&lastDone<6&&done===6)api.toast('六条判完，可以往下走');
    lastDone=done;
    st.textContent='已判 '+done+' / 6';
    tal.textContent='① '+t.kp1+' · ② '+t.kp2+' · ③ '+t.kp3+' · ④ '+t.kp4;
    sum.classList.toggle('on',done===6);
    if(done===6){
      sum.innerHTML='<b>六条判完。</b>'+
        '<span>① '+t.kp1+' · ② '+t.kp2+' · ③ '+t.kp3+' · ④ '+t.kp4+'　　下一步：把这四个问题问到你自己的改动上。</span>';
    }else{
      sum.innerHTML='<span>还差 '+(6-done)+' 条。判完解锁下一步。</span>';
    }
  }
  grid.addEventListener('click',e=>{
    const un=e.target.closest('[data-undo]');
    if(un){
      const k=un.closest('[data-c]').dataset.c;
      a.cases[k]={};api.save();paint();api.refresh();return;
    }
    const kb=e.target.closest('[data-kp]'),wb=e.target.closest('[data-wh]');
    if(!kb&&!wb)return;
    const el=e.target.closest('[data-c]'),k=el.dataset.c;
    const v=a.cases[k]||(a.cases[k]={});
    if(kb)v.kp=v.kp===kb.dataset.kp?'':kb.dataset.kp;
    if(wb)v.who=v.who===wb.dataset.wh?'':wb.dataset.wh;
    api.save();paint();api.refresh();
  });
  sec.querySelector('#a34Reset').onclick=()=>{
    a.cases={};api.save();paint();api.refresh();api.toast('六条已回到未判状态');
  };
  paint();
},
hint(S){
  const n=doneN(S);
  if(n>=6)return '';
  const c=CS(S);
  const half=CASES.filter(x=>{const v=c[x.id]||{};return (v.kp||v.who)&&!(v.kp&&v.who);}).length;
  return '还差 '+(6-n)+' 条判完'+(half?'（有 '+half+' 条只判了一半）':'');
},
gate(S){return doneN(S)>=6;}},

/* ---------- 4 在你的事上 ---------- */
{id:'mine',name:'在你的事上',short:'在你的事',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>你的改动，<em>最可能死在哪</em></h1>
<p>不用挑最大的，挑一条这季度真的要动的流程。写清三件事：卡在哪、先说服谁、第一个月看什么。</p></div>
<div class="a34-legend">${KP.map(k=>'<span>'+k.s+'　'+k.n.replace(/^[①②③④]\s*/,'')+'</span>').join('')}</div>
<div class="grid2 a34-row">
  <div class="panel">
    <div class="panel-h"><h4>① 哪条流程改动</h4><span>A33 带过来，或写新的</span></div>
    <div class="field"><input id="a34Flow" maxlength="40" placeholder="例如：客户投诉处理"></div>
    <div class="a34-ref" id="a34Ref"></div>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>② 最可能卡在哪</h4><span>≥10 字</span></div>
    <div class="field"><textarea id="a34Block" maxlength="80" placeholder="哪个卡点，以及这条流程里它长什么样"></textarea></div>
    <div class="row" style="margin-top:6px"><span class="small" id="a34BlockLen">0 / 80</span><div style="flex:1"></div><span class="small">写具体的那一步，不写「沟通不畅」</span></div>
  </div>
</div>
<div class="grid2 a34-row" style="margin-top:12px">
  <div class="panel">
    <div class="panel-h"><h4>③ 先说服谁</h4><span>≥8 字</span></div>
    <div class="field"><input id="a34Who" maxlength="40" placeholder="岗位或名字，不写「领导」"></div>
    <div class="row" style="margin-top:6px"><span class="small" id="a34WhoLen">0 / 40</span></div>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>④ 第一个月看什么指标</h4><span>≥10 字</span></div>
    <div class="field"><input id="a34Metric" maxlength="60" placeholder="一个数，月底能拿到"></div>
    <div class="row" style="margin-top:6px"><span class="small" id="a34MetricLen">0 / 60</span></div>
  </div>
</div>
<div class="a34-pre">
  <div><b>卡点</b><span>先问：这条链上出事，谁签字？答「看哪一段」，就是 ①。</span></div>
  <div><b>人</b><span>写岗位，不写「领导」。写不出一个具体的人，多半还没找过他。</span></div>
  <div><b>指标</b><span>一个月底能拿到的数：周转时间、退回率、交接次数。</span></div>
</div>`,
init(sec,api){
  const S=api.S,a=NS(S);
  const flow=sec.querySelector('#a34Flow'),block=sec.querySelector('#a34Block'),
        who=sec.querySelector('#a34Who'),metric=sec.querySelector('#a34Metric'),
        ref=sec.querySelector('#a34Ref');
  const LEN={block:['#a34BlockLen',80],who:['#a34WhoLen',40],metric:['#a34MetricLen',60]};
  function lens(){
    Object.keys(LEN).forEach(k=>{
      const el=sec.querySelector(LEN[k][0]);
      if(el)el.textContent=(a[k]||'').length+' / '+LEN[k][1];
    });
  }
  flow.value=a.flow||'';block.value=a.block||'';who.value=a.who||'';metric.value=a.metric||'';
  flow.addEventListener('input',()=>{a.flow=flow.value;api.save();api.refresh();});
  block.addEventListener('input',()=>{a.block=block.value;lens();api.save();api.refresh();});
  who.addEventListener('input',()=>{a.who=who.value;lens();api.save();api.refresh();});
  metric.addEventListener('input',()=>{a.metric=metric.value;lens();api.save();api.refresh();});

  let prev=null;
  try{const raw=JSON.parse(localStorage.getItem('fxm_adult_v1')||'null');prev=raw&&raw.lessons?raw.lessons.A33:null;}catch(e){prev=null;}
  const pa=prev&&prev.answers?prev.answers:null;
  if(pa&&(pa.proc||(pa.edges&&pa.edges.length))){
    const edge=pa.edges&&pa.edges[0]?pa.edges[0].why:'';
    ref.innerHTML='<b>从 A33 带过来</b><span>'+api.esc(pa.proc||'A33 的流程改动')+(edge?' · '+api.esc(edge):'')+'</span>'+
      '<button class="btn sm ghost" id="a34Use33">用这条</button>';
    ref.querySelector('#a34Use33').onclick=()=>{
      a.flow=pa.proc||'A33 的流程改动';
      flow.value=a.flow;api.save();lens();api.refresh();api.toast('已带入 A33 的流程');
    };
  }else{
    ref.innerHTML='<span>A33 里还没有记录。也可以直接写一条新的。</span>';
  }
  lens();
},
hint(S){
  const a=NS(S);
  if((a.block||'').length<10)return '写「最可能卡在哪」：哪个卡点，这条流程里它长什么样（≥10 字）';
  if((a.who||'').length<8)return '写「先说服谁」：岗位或名字（≥8 字）';
  if((a.metric||'').length<10)return '写「第一个月看什么指标」：一个月底能拿到的数（≥10 字）';
  return '';
},
gate(S){
  const a=NS(S);
  return (a.block||'').length>=10&&(a.who||'').length>=8&&(a.metric||'').length>=10;
}},

/* ---------- 5 过滤与提交 ---------- */
{id:'submit',name:'过滤与提交',short:'提交',kicker:'STEP 5 · 过滤与提交',
html:`
<div class="step-h"><h1>两个问题，<em>再交卡</em></h1>
<p>反对不一定能拦住你。真正决定成败的是：他反对的时候，你手上有没有一条不经过他的路。</p></div>
<div class="grid2 a34-row" style="align-items:start">
  <div class="panel a34-filt">
    <div class="panel-h"><h4>① 反对者会不会公开反对</h4><span>单选</span></div>
    <div class="opts a34-opts3">
      ${F1.map((o,i)=>'<button class="opt" data-f1="'+o.k+'" title="'+o.d+'"><span class="k">'+String.fromCharCode(65+i)+'</span><span><b>'+o.n+'</b><span>'+o.d+'</span></span></button>').join('')}
    </div>
    <div id="a34F1Out" class="a34-fnote"></div>
    <div class="panel-h" style="margin-top:12px"><h4>② 有没有不依赖他的做法</h4><span>单选</span></div>
    <div class="opts a34-opts3">
      ${F2.map((o,i)=>'<button class="opt" data-f2="'+o.k+'" title="'+o.d+'"><span class="k">'+String.fromCharCode(65+i)+'</span><span><b>'+o.n+'</b><span>'+o.d+'</span></span></button>').join('')}
    </div>
    <div id="a34F2Out" class="a34-fnote"></div>
    <div id="a34Concl" class="a34-concl"></div>
  </div>
  <div>
    <div id="a34CardSlot"></div>
    <div class="panel a34-sub">
      <div class="panel-h"><h4>交卡</h4><span id="a34SubSt">未提交</span></div>
      <p class="small">提交后引擎会自动跑一遍机器评审，然后进入班级互评池。</p>
      <div class="row" style="margin-top:9px">
        <button class="btn primary" id="a34SubBtn">提交到班级</button>
        <button class="btn" id="a34Export">导出 PNG</button>
      </div>
      <div class="hint" style="margin-top:7px">未登录：只存本机，不进互评池。</div>
    </div>
  </div>
</div>
<div class="a34-why2"><b>为什么只问这两问</b><span>公开反对是明牌，可以提前准备；不公开的反对会拖，只能靠一条不依赖他的路。两问都答不出，说明你还没单独找过他。</span></div>`,
init(sec,api){
  const S=api.S,a=NS(S);
  const slot=sec.querySelector('#a34CardSlot'),st=sec.querySelector('#a34SubSt'),
        btn=sec.querySelector('#a34SubBtn'),
        f1Out=sec.querySelector('#a34F1Out'),f2Out=sec.querySelector('#a34F2Out'),
        concl=sec.querySelector('#a34Concl');
  function paint(){
    sec.querySelectorAll('[data-f1]').forEach(b=>b.classList.toggle('on',a.f1===b.dataset.f1));
    sec.querySelectorAll('[data-f2]').forEach(b=>b.classList.toggle('on',a.f2===b.dataset.f2));
    f1Out.innerHTML=a.f1?'<p>'+api.esc(F1N[a.f1])+'</p>':'';
    f2Out.innerHTML=a.f2?'<p>'+api.esc(F2N[a.f2])+'</p>':'';
    const cc=conclude(a);
    concl.className='a34-concl'+(cc?' on':'');
    concl.innerHTML='<b>过滤结论</b><span>'+(cc?api.esc(cc):'两问都答完，这里给一句话。')+'</span>';
    const t=tally(S);
    const rows=[
      ['流程改动',a.flow||'—'],
      ['最可能卡在',a.block||'—'],
      ['先说服谁',a.who||'—'],
      ['首月指标',a.metric||'—'],
      ['六条体检',doneN(S)+' / 6　·　无主 '+t.kp1+' · 旧 KPI '+t.kp2+' · 削权 '+t.kp3+' · 异常 '+t.kp4],
      ['过滤',filterLine(S)]
    ];
    slot.innerHTML='<div class="outcard a34-card"><div class="oh"><span>DELIVERABLE · A34</span><span>落地体检卡</span></div>'+
      '<h5>我的落地体检卡</h5><div class="kv">'+
      rows.map(r=>'<div><b>'+api.esc(r[0])+'</b><span class="'+(r[1]!=='—'?'fill':'')+'">'+api.esc(r[1])+'</span></div>').join('')+
      '</div></div>';
    const ready=!!(a.f1&&a.f2);
    st.textContent=S.submitted?'已提交':'未提交';
    btn.textContent=S.submitted?'已提交，去看班级':(ready?'提交到班级':'先答完两个问题');
    btn.disabled=!!S.submitted||!ready;
  }
  sec.querySelectorAll('[data-f1]').forEach(b=>b.onclick=()=>{a.f1=b.dataset.f1;api.save();paint();api.refresh();});
  sec.querySelectorAll('[data-f2]').forEach(b=>b.onclick=()=>{a.f2=b.dataset.f2;api.save();paint();api.refresh();});
  btn.onclick=async()=>{
    if(!(a.f1&&a.f2)){api.toast('先把两个问题答完');return;}
    await api.submit();paint();
  };
  sec.querySelector('#a34Export').onclick=()=>api.exportCard();
  paint();
  paint5=paint;
},
onEnter(){if(paint5)paint5();},
hint(S){
  const a=NS(S);
  if(!a.f1)return '先答：反对者会不会公开反对';
  if(!a.f2)return '再答：有没有不依赖他的做法';
  return '';
},
gate(S){const a=NS(S);return !!(a.f1&&a.f2);}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>带走<em>三句话</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 箭头会穿过人</div><p class="small" style="margin-top:5px">改一条箭头，等于改三个人的工作量。方案只写了好的那一半。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 先找无主那一步</div><p class="small" style="margin-top:5px">出事时找不到人签字的交接，就是最可能的卡点。补人不补流程。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 首月只看一个指标</div><p class="small" style="margin-top:5px">先看交接有没有断，别急着看总产出。总产出要三个月才说明问题。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A35</span></div>
<p class="small">A35 · 商业模式：变量重设。流程跑通之后，问题会往上走一层：这门生意里，哪个变量可以重设——谁付钱、按什么计价、什么时候收。A33 改连接，A34 让连接活下来，A35 换掉整个等式。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="a34Again">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#a34Again').onclick=()=>api.go(0);},
hint(S){return '';},gate(S){return true;}}
],

side:{asks:[
 '这条流程改动，出事时谁的名字会出现在事故报告上？',
 '新流程省下来的时间，算进了谁的考核？',
 '哪一级审批被拿掉了，他会用什么词反对？',
 '顺利时怎么走都写了，出异常时谁接手？',
 '如果推这件事的人下个月调走，这条改动还能活多久？'
]},

card(S){
  const a=(S.answers&&S.answers.a34)||{},t=tally(S);
  return {title:'A34 · 我的落地体检卡',rows:[
    ['流程改动',a.flow||'—'],
    ['最可能卡在',a.block||'—'],
    ['先说服谁',a.who||'—'],
    ['首月指标',a.metric||'—'],
    ['六条体检',doneN(S)+' / 6　·　无主 '+t.kp1+' · 旧 KPI '+t.kp2+' · 削权 '+t.kp3+' · 异常 '+t.kp4],
    ['过滤',filterLine(S)]
  ]};
},

notes:[
 {t:'本节目标',h:'让学员把「流程设计」和「流程落地」分开：改连接是 A33 的事，让连接在组织里活下来是这一节的事。带走一套四问，能用在任何一次流程改动上。'},
 {t:'时间分配',h:'先猜 6′ · 概念 8′ · 体检台 14′ · 在你的事 10′ · 过滤与提交 5′ · 收束 2′。体检台至少留 10 分钟让人真点，六个提案不要替他们判。'},
 {t:'常见卡点',h:'一是把「员工抵触」当主因。提醒：抵触通常是结果，先看那条交接上有没有名字。二是把体检台当测验，非要知道自己选对没有——解释里给的是「更可能」和「另一个可能」，判断允许不同，但要能说出反例。'},
 {t:'直播怎么接',h:'看后台六个提案的判断分布。如果整班把「报销两级审批」都判成 ②，现场追问：被砍掉的那一级是谁，他会用什么词反对。再挑两位学员的「先说服谁」念出来，让全班猜他会不会公开反对，然后对照本人的选择。'},
 {t:'和前后节的关系',h:'A20 拆过「谁不再经过」的责任真空，那是设计层；A34 问的是推行层：谁对整条链负责、考核改没改、中间层损失了什么、异常谁接。A35 把问题再往上抬一层，换商业模式里的变量。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A34']=L;
})();
