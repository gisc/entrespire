/* A36 · 组织创新机制：国民银行 */
(function(){
'use strict';

const IMG={bank:'assets-cases-a36-bank.jpg'};

const LAYER={auth:'授权',inc:'激励',chn:'通道'};
const LAYER_Q={
 auth:'谁能拍板：一线手里有没有一个额度或范围，能自己定。',
 inc:'做成了谁得利：好处落在谁身上，做砸了责任落在谁身上。',
 chn:'想法怎么被看见：一个普通员工的想法，经过谁、多久、以什么形式被评估。'
};
const LAYER_FIX={
 auth:'授权的最小改动 = 一个额度 + 一个签字人 + 一次报备。先给 30 天。',
 inc:'激励的最小改动 = 把省下的东西折一部分给做成的人。先算一次，再谈全年。',
 chn:'通道的最小改动 = 一条有时限的入口。48 小时给答复，答不了就说答不了。'
};

/* ---------- 六家组织：每家只判「最缺哪一层」+「一个最小改动」 ---------- */
const ORGS=[
{k:'bank',n:'银行网点',tag:'支行 · 12 人',main:'auth',
 ctx:'客户开一个对公户跑了三趟。柜员知道哪张表多余，但删一格要报到分行。',
 ln:{auth:'柜员和支行长都知道怎么改，卡在「改了谁签字」。',
     inc:'网点的奖金按存款规模算，改流程不加分，也不减分。',
     chn:'柜员的话每周都传到分行，传上去之后没有回音——不缺人听。'},
 chg:[
  {k:'a',t:'支行长 5 万元以下减免权，事后报备',lay:'auth',note:'额度给了，责任也给了。报备不是审批，是留痕。'},
  {k:'b',t:'每季度评服务之星，奖 500 元',lay:'inc',note:'评奖改变的是被看见，不改变谁能改那一格表。'},
  {k:'c',t:'设意见箱，每月汇总一次',lay:'chn',note:'意见箱收得到问题，收不到决定权。'}],
 say:'柜员离问题最近，离决定权最远。给额度、给报备，比再开一次会管用。',
 miss:'这一段不缺听意见的人，缺的是能当场改一格表的人。'},

{k:'hosp',n:'医院科室',tag:'门诊 · 26 人',main:'chn',
 ctx:'病人抽血要跑到另一栋楼。护士长提过把抽血点挪到诊区，提了两年，没下文。',
 ln:{auth:'科主任其实能定抽血点挪不挪，他两年前就点过头。',
     inc:'科室绩效按工作量算，挪不挪抽血点跟奖金无关。',
     chn:'提了两年，没有一次进入一个「必须给答复」的场合。'},
 chg:[
  {k:'a',t:'给科主任 20 万元以下挪位权',lay:'auth',note:'他能定，也同意过；再给一次权，还是没人接。'},
  {k:'b',t:'每周一次堵点会，48 小时内答复',lay:'chn',note:'固定入口加答复时限。这条改的是「想法有没有人接」。'},
  {k:'c',t:'病人满意度计入科室绩效',lay:'inc',note:'满意度会动，但没人知道该改哪一趟。'}],
 say:'想法不是没有，是没有一个固定的、有答复时限的入口。',
 miss:'这一段不缺热情，也不缺权力：主任点头过。缺的是「提了必须有回音」的那条路。'},

{k:'school',n:'学校',tag:'年级组 · 30 人',main:'inc',
 ctx:'老师想带学生做一周的项目式学习。要多备 20 小时课，课时费不变，出了安全问题还算他的。',
 ln:{auth:'调课和实验室，年级组长签一次就能过。',
     inc:'多做 20 小时，收入和风险都不变，全靠个人热情。',
     chn:'教研组每月都有人提，提完照旧。'},
 chg:[
  {k:'a',t:'项目课时按 1.5 倍计，安全预案统一出',lay:'inc',note:'把「多做」折成钱和保障，热情才不用自己贴。'},
  {k:'b',t:'年级组长可一周调 3 节课',lay:'auth',note:'权限早就有，签一次就过——不是这一层。'},
  {k:'c',t:'建教研群，谁有想法随便说',lay:'chn',note:'群已经有三个了，想法还是在群里停住。'}],
 say:'让人多做 20 小时，却不改课时和责任的算法，这件事只能靠几个人硬撑。',
 miss:'这一段不缺权限，也不缺群。缺的是「多做不亏」。'},

{k:'shop',n:'制造车间',tag:'冲压线 · 18 人',main:'inc',
 ctx:'换模要 48 分钟。班组长算过能压到 30 分钟，但省下的时间会被重新定成新定额。',
 ln:{auth:'工装改造 10 万元以下，车间主任自己能签。',
     inc:'省下来的时间变成新定额，他改完等于给自己加活。',
     chn:'改善提案每月收 30 条，班组长那条排在第十四。'},
 chg:[
  {k:'a',t:'换模每降 1 分钟奖 50 元，随工资发',lay:'inc',note:'省下的时间折成钱，他才有理由把 48 变成 30。'},
  {k:'b',t:'主任有 10 万元以下改造签字权',lay:'auth',note:'签字权早就有，他不用，因为改完不划算。'},
  {k:'c',t:'改善提案箱，每月评 3 条',lay:'chn',note:'提案箱收得到建议，改不动定额。'}],
 say:'他会改，也知道怎么改。他不改，是因为改完的收益被收走了。',
 miss:'这一段不缺权力，也不缺提案。缺的是「省下来的归谁」。'},

{k:'web',n:'互联网公司',tag:'产品组 · 40 人',main:'auth',
 ctx:'产品经理有个想法，要进季度规划，得先过三个评审会，再等排期。',
 ln:{auth:'一线不能自己决定做什么，所有事都往上排期。',
     inc:'期权和晋升都在，做成一个功能确实算他的。',
     chn:'需求池里有 400 条，评审会每周都开。'},
 chg:[
  {k:'a',t:'每组每季度 10% 工时，自己定做什么',lay:'auth',note:'不用谁批准就能花的时间，才是真的授权。'},
  {k:'b',t:'设年度最佳创意奖',lay:'inc',note:'奖一年一次，排期一周一次。'},
  {k:'c',t:'建统一需求池，谁都能提',lay:'chn',note:'池子已经有了，里面 400 条。'}],
 say:'通道已经过剩，缺的是「不用谁批准就能花的那 10%」。',
 miss:'这家公司不缺通道，也不缺激励。缺的是「不用批准」的那一小块时间和预算。'},

{k:'gov',n:'政府窗口',tag:'政务大厅 · 9 人',main:'chn',
 ctx:'一个证明要跑三个窗口。办事员每年提 20 条建议，全部停在「已收悉」。',
 ln:{auth:'三个窗口并成一个，要改文件依据，不是窗口能定的。',
     inc:'窗口考核看办件量和投诉，合并窗口不加分。',
     chn:'20 条建议交上去，没有一条有答复，也没有一条被退回说明理由。'},
 chg:[
  {k:'a',t:'窗口负责人可试运行两窗合并 3 个月',lay:'auth',note:'合并确实要授权——但授权之前，得先有人把这条建议接住。'},
  {k:'b',t:'每月堵点会，能定的当场定，不能定 15 天回',lay:'chn',note:'一条有时限的入口。建议不再停在「已收悉」。'},
  {k:'c',t:'评服务标兵，挂年终考核',lay:'inc',note:'标兵改变的是态度，不改变建议去哪。'}],
 say:'建议不是没提，是提了没有下文。先建一条「必须有回音」的路。',
 miss:'合并窗口最终确实要授权。但眼下最堵的是：20 条建议，一条都没有回音。'}
];

/* ---------- 判定 ---------- */
function chgLayer(o,k){const c=o.chg.find(x=>x.k===k);return c?c.lay:'';}
function vd(o,v){
 if(!v||!v.lack||!v.chg)return '';
 const ch=chgLayer(o,v.chg);
 if(!ch)return '';
 if(v.lack===o.main&&ch===o.main)return 'match';
 if(v.lack===ch)return 'sync';
 return 'off';
}
function verdictHTML(o,v,r){
 const ch=chgLayer(o,v.chg);
 if(r==='match')return '<b>对上了。</b>'+o.say;
 if(r==='sync')return '<b>动作跟诊断一致，但这一段最堵的不是这一层。</b>'+o.miss;
 const why=v.lack===o.main
  ?'诊断对了，动作没跟上：这一段最堵的是「'+LAYER[o.main]+'」，你选的改动落在「'+LAYER[ch]+'」上。'
  :'你说缺的是「'+LAYER[v.lack]+'」，选的改动落在「'+LAYER[ch]+'」上，两个都不在这一段最堵的地方。';
 return '<b>诊断和动作对不上。</b>'+why+o.miss;
}

/* ---------- 第五步的两个判断 ---------- */
const OPPOSE=[
 {k:'a',t:'中层：他们的权力来自签字',d:'每件事都要经过我，授权等于把我摘掉'},
 {k:'b',t:'风控与合规：出了事他们写报告',d:'不反对创新，反对没有留痕的创新'},
 {k:'c',t:'一线自己：多一件事，多一份责任',d:'授权到了手上，也可能是多一个锅'},
 {k:'d',t:'说不上来，我还没问过',d:'最诚实的一个答案'}
];
const OPPOSE_NOTE={
 a:'给他留一个仍然要他签的环节（比如事后抽查），比说服他相信授权好用。',
 b:'做成「有额度、有留痕、有抽查」，他们的反对会小很多。',
 c:'先看是不是「做成了没他份、做砸了算他的」——那是激励问题。',
 d:'去问三个会被授权影响的人，记下他们第一句话。'
};
const PILOT=[
 {k:'a',t:'一个 10 人以内的班组，30 天，只改一件事',d:'范围小、有期限、可回退'},
 {k:'b',t:'整个部门一起改',d:'出了问题没有对照'},
 {k:'c',t:'找一个最积极的人，让他自己试',d:'试成了也是特例，别人复制不了'},
 {k:'d',t:'等老板发话再动',d:'通常等不到'}
];
const PILOT_NOTE={
 a:'30 天、一个班组、一件事，出问题当天能改回来。',
 b:'范围一大，分不清是机制有效，还是这三个月特殊。',
 c:'能证明可行，证明不了可复制。要留下别人能照做的三条。',
 d:'机制很少被批准，多半是被默许着长出来的。先做 30 天。'
};

/* ---------- 三步链路（本课重绘，非官方原图） ---------- */
function gate(x,n,t,f){
 return '<path d="M'+(x-26)+' 100V52h52v48" opacity=".5"/>'+
  '<text class="a36-gl" x="'+x+'" y="40" text-anchor="middle">'+n+' '+t+'</text>'+
  '<text class="a36-gf" x="'+x+'" y="116" text-anchor="middle">'+f+'</text>';
}
const CHAIN='<svg class="a36-chain" viewBox="0 0 660 128" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+
 '<path d="M30 76h574" opacity=".45"/>'+
 '<path d="M598 71l10 5-10 5" opacity=".7"/>'+
 '<circle cx="20" cy="76" r="4" fill="currentColor" stroke="none" opacity=".7"/>'+
 '<text class="a36-gs" x="20" y="62" text-anchor="middle">想法</text>'+
 gate(210,'①','通道','没人接 = 靠运气')+
 gate(370,'②','授权','不能拍板 = 空转')+
 gate(530,'③','激励','白干 = 一阵风')+
 '<text class="a36-gs" x="622" y="62" text-anchor="end">落地</text>'+
 '</svg>';

/* ---------- 产出卡 ---------- */
function rows(a){
 const o=a.orgs||{};
 let done=0,match=0;
 ORGS.forEach(x=>{const v=o[x.k]||{};if(v.lack&&v.chg)done++;if(vd(x,v)==='match')match++;});
 const pilot=(PILOT.find(p=>p.k===a.pilot)||{}).t||'—';
 return [
  ['机制体检',done+' / 6 个组织　对上 '+match+' / 6'],
  ['卡在哪层',LAYER[a.lack]||'—'],
  ['要几步',a.steps||'—'],
  ['最小改动',a.fix||'—'],
  ['谁会反对',(OPPOSE.find(p=>p.k===a.oppose)||{}).t||'—'],
  ['试点',pilot+(a.pilotLine?'：'+a.pilotLine:'')]
 ];
}

function NS(S){
 const A=(S&&S.answers)||{};
 if(!A.a36||typeof A.a36!=='object')A.a36={};
 return A.a36;
}
let paintSubmit=null;

const L={
id:'A36',week:9,seq:36,title:'组织创新机制：国民银行',
kicker:'WEEK 9 · 组织与机制',tool:'mind',toolName:'机制',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>一家银行想做创新，<em>先动哪一样</em></h1>
<p>以色列国民银行是以色列第一大银行，市场占有率 25–30%。它用两年做了这样一件事：2,000 名员工参加 170 场创新研讨会，整理出 190 个想法，40 个落地。在那两年开始的时候，管理层先动了一样东西。</p></div>
<div class="a36-hook">
  <figure class="a36-fig">
    <button class="case-zoom" data-zoom="bank" title="看大图">⤢</button>
    <img src="${IMG.bank}" alt="以色列国民银行广告画面" loading="lazy">
    <figcaption class="a36-figcap"><b>以色列国民银行 · 以色列第一大银行</b>
      <span>零售与抵押贷款为主，市场占有率 25–30%。</span>
      <em>图：SIT 官方课程材料 Day3 p.111（已授权）</em></figcaption>
  </figure>
  <div class="a36-hook-r">
    <div class="a36-ask"><span class="a36-ask-k">先猜，不用讲道理</span>
      <p>如果只能先改一处，改哪里？<b>别急着选「最像创新」的那个。</b></p></div>
    <div class="opts">
      <button class="opt" data-h="a"><span class="k">A</span><span><b>招一批设计师</b><span>把界面和体验做好，创新就有了样子</span></span></button>
      <button class="opt" data-h="b"><span class="k">B</span><span><b>成立创新部</b><span>归 CEO 直管，编制十人，独立预算</span></span></button>
      <button class="opt" data-h="c"><span class="k">C</span><span><b>改考核与授权</b><span>谁能拍板、做成了算谁的，写进规则</span></span></button>
      <button class="opt" data-h="d"><span class="k">D</span><span><b>收购一家创业公司</b><span>把外面的人和方法一起买进来</span></span></button>
    </div>
    <p class="a36-mini" style="margin-top:7px">选完这里会给官方材料里的顺序、角色和四个数字。</p>
  </div>
</div>
<div id="a36HookOut" style="margin-top:12px"></div>`,
init(sec,api){
  const S=api.S,a=NS(S),out=sec.querySelector('#a36HookOut');
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',a.hook===b.dataset.h));
    if(!a.hook){out.innerHTML='';return;}
    const ok=a.hook==='c';
    out.innerHTML='<div class="a36-reveal '+(ok?'ok':'warn')+'">'+
      '<div class="a36-reveal-h"><span>'+(ok?'先改的是考核与授权':'你选的这条，很多银行走过')+'</span><span>Day3 p.110–116</span></div>'+
      '<p>先动的不是人，是「谁说了算」。培训也做了：4 天课，40 位「创新教练」，全部从银行最优秀的经理里挑——但这 40 人没有离开原岗位，也没有成立新部门，他们带着原来的团队做项目。停在这里，它就只是一次培训。</p>'+
      '<p>官方材料里，真正让 190 个想法变成 40 个落地的是后面三步：3 天再训 20 位「实施者」，其中 12 位来自教练；12 个主要项目由实施者自己带，其中 8 个在试行；他们为自己的项目<b>直接见决策者</b>。</p>'+
      '<p>材料把这一页命名为「机制」：创新的支持、鼓励、奖励（p.120）。翻成日常话就是三件事——<b>谁能拍板、做成了谁得利、想法怎么被看见</b>。</p>'+
      '<p class="small">'+(ok
        ?'先招人、先设部门、先收购，都能让创新「看起来发生了」。但它们都不改变一件事：一个普通经理能不能自己决定一件事。'
        :'A 招设计师、B 成立创新部、D 买创业公司，这三件都有公司做过，也都能剪彩。但它们不改变一件事：一个普通经理能不能自己决定一件事。')+'</p>'+
      '<p class="a36-quote">2,000 人参加 170 场研讨会 · 190 个想法 · 40 个落地 · 186 个创新点 · 一款对公投资新品 2015 年销售额 7 亿谢克、利润约 3,500 万谢克</p>'+
      '</div>';
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{a.hook=b.dataset.h;api.save();paint();api.refresh();});
  sec.querySelectorAll('[data-zoom]').forEach(b=>b.onclick=e=>{
    e.stopPropagation();
    api.modal('<button class="modal-x">×</button><h3>以色列国民银行 · Day3 p.111</h3>'+
      '<img src="'+IMG.bank+'" alt="" style="width:100%;border-radius:8px;margin:8px 0 10px">'+
      '<p>以色列第一大银行，市场占有率 25–30%。业务四块：零售、抵押贷款、企业商业、资本市场。</p>'+
      '<p class="small">这一节的数字：2,000 人参加 170 场研讨会；190 个想法被整理；40 个落地；186 个创新点按部门与内外部影响分类。</p>'+
      '<p class="small">图：SIT 官方课程材料 Day3 p.111（已授权）。</p>');
  });
  paint();
},
hint(S){return NS(S).hook?'':'先选一个：如果只能先改一处，改哪里';},
gate(S){return !!NS(S).hook;}},

/* ---------- 2 概念 ---------- */
{id:'concept',name:'概念',short:'概念',kicker:'STEP 2 · 概念',
html:`
<div class="step-h"><h1>机制不是制度汇编，是<em>三道门</em></h1>
<p>一个想法要走到落地，得先被看见、再被拍板、最后有人得利。三道门里哪道关着，想法就停在哪儿——停下来的方式还不一样。</p></div>
<div class="a36-def-inline"><b>机制</b><span>让好想法反复发生、并且被推到能拍板的人面前的一套安排。它不靠某个人的热情：人换了，结果还能重复。</span></div>
<div class="panel a36-chain-panel">
  <div class="panel-h"><h4>一个想法要走的三道门</h4><span>本课重绘 · 非官方原图</span></div>
  ${CHAIN}
  <p class="a36-chain-cap">顺序不是重点。有的组织先有通道，有的先给授权；但三道门缺一道，链条就断在那里。一次培训、一场大赛、一个创新月，都是<b>事件</b>——事件会结束，机制不会。</p>
</div>
<div class="a36-mech">
  <div class="a36-layer"><span class="ln">AUTH</span><b>授权 · 谁能拍板</b>
    <p class="q">${LAYER_Q.auth}</p><p class="j">没有它：想法一路往上签，签到最后没人负责。</p></div>
  <div class="a36-layer"><span class="ln">INC</span><b>激励 · 做成了谁得利</b>
    <p class="q">${LAYER_Q.inc}</p><p class="j">没有它：第一年靠热情，第三年靠 KPI，然后没了。</p></div>
  <div class="a36-layer"><span class="ln">CHN</span><b>通道 · 想法怎么被看见</b>
    <p class="q">${LAYER_Q.chn}</p><p class="j">没有它：认识领导的人先被看见，其余靠运气。</p></div>
</div>
<div class="panel a36-choice">
  <div class="panel-h"><h4>下面哪一句是机制？</h4><span>二选一</span></div>
  <div class="opts a36-opts2">
    <button class="opt" data-c2="a"><span class="k">A</span><span><b>我们鼓励创新：每季度评一次创新奖</b><span>写了奖励，没写谁决定、谁能花</span></span></button>
    <button class="opt" data-c2="b"><span class="k">B</span><span><b>5 万元以下支行长自己签，做成了算他网点</b><span>一个额度、一个签字人、一个得利的人</span></span></button>
  </div>
  <div id="a36C2Out" style="margin-top:9px"></div>
</div>
<p class="a36-boundary"><b>什么时候别用：</b>0→1 的阶段别先建机制——先有一个真的做成了的案例，再把它固化成三条。机制建得太早，会变成又一套审批流程。另一个边界：银行、医院这类强监管场景，授权必须带额度上限和事后抽查；给的是「范围内的自主」，不是「无限授权」。</p>`,
init(sec,api){
  const S=api.S,a=NS(S),out=sec.querySelector('#a36C2Out');
  function paint(){
    sec.querySelectorAll('[data-c2]').forEach(b=>b.classList.toggle('on',a.concept===b.dataset.c2));
    if(!a.concept){out.innerHTML='';return;}
    const ok=a.concept==='b';
    out.innerHTML='<div class="a36-reveal '+(ok?'ok':'warn')+'">'+
      '<div class="a36-reveal-h"><span>'+(ok?'这一句能被复述':'这一句是态度')+'</span><span>机制 vs 运动</span></div>'+
      '<p>'+(ok
        ?'B 里有一切能被执行的东西：额度、签字人、得利的人。新员工听一遍就知道自己能做什么。'
        :'A 里没有一句能被执行：谁评、评完谁负责落地、做成了谁得利，都没写。它更像一次活动。')+'</p>'+
      '<p class="small">机制的第一版通常只有三条，能写在一张 A4 上。写不满一页，是因为把制度当成了机制。</p></div>';
  }
  sec.querySelectorAll('[data-c2]').forEach(b=>b.onclick=()=>{a.concept=b.dataset.c2;api.save();paint();api.refresh();});
  paint();
},
hint(S){return NS(S).concept?'':'选一句：哪一句是机制';},
gate(S){return !!NS(S).concept;}},

/* ---------- 3 工作台：机制体检 ---------- */
{id:'bench',name:'工作台',short:'体检台',kicker:'STEP 3 · 机制体检',
html:`
<div class="step-h a36-bench-h"><h1>六家组织，<em>逐个体检</em></h1>
<p>每一段只做两件事：判断它<b>最缺哪一层</b>，再选一个<b>最小改动</b>。最小改动指一个额度、一条时限、一个 30 天的范围——不写制度，不改架构。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>看这一段卡在哪</span>
  <span class="op"><span class="op-n">2</span>判断最缺哪一层</span>
  <span class="op"><span class="op-n">3</span>选一个最小改动</span>
</div>
<div class="bench a36-bench">
  <div class="bench-h"><b>BENCH · 机制体检台</b><span class="st" id="a36St">已体检 0 / 6　·　对上 0 / 6</span></div>
  <div class="bench-b">
    <div class="a36-orgs" id="a36Orgs"></div>
  </div>
  <div class="bench-f">
    <span class="small">「对上」= 你判断的缺层，和改动落的那一层，都是这一段最堵的地方。六个都做完解锁下一步。</span>
    <div style="flex:1"></div>
    <button class="btn sm ghost" id="a36Reset">全部重来</button>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=NS(S);
  if(!a.orgs||typeof a.orgs!=='object')a.orgs={};
  const grid=sec.querySelector('#a36Orgs'),st=sec.querySelector('#a36St');
  grid.innerHTML=ORGS.map((o,i)=>'<div class="a36-org" data-org="'+o.k+'">'+
    '<div class="a36-oh"><span class="n">'+String(i+1)+'</span><b>'+api.esc(o.n)+'</b>'+
    '<span class="tag">'+api.esc(o.tag)+'</span><span class="a36-vd" data-vd>未体检</span></div>'+
    '<p class="a36-ctx">'+api.esc(o.ctx)+'</p>'+
    '<div class="a36-row"><span class="a36-lbl">最缺</span><div class="a36-seg" data-lack>'+
      ['auth','inc','chn'].map(k=>'<button data-v="'+k+'">'+LAYER[k]+'</button>').join('')+'</div></div>'+
    '<div class="a36-row"><span class="a36-lbl">改动</span><div class="a36-chg" data-chg>'+
      o.chg.map(c=>'<button data-v="'+c.k+'"><i>'+c.k.toUpperCase()+'</i><span>'+api.esc(c.t)+'</span></button>').join('')+'</div></div>'+
    '<p class="a36-note" data-note>先判断最缺哪一层，再选一个最小改动。</p>'+
    '</div>').join('');

  function paint(){
    let done=0,match=0;
    grid.querySelectorAll('[data-org]').forEach(el=>{
      const o=ORGS.find(x=>x.k===el.dataset.org),v=a.orgs[o.k]||{};
      el.querySelectorAll('[data-lack] button').forEach(b=>b.classList.toggle('on',v.lack===b.dataset.v));
      el.querySelectorAll('[data-chg] button').forEach(b=>b.classList.toggle('on',v.chg===b.dataset.v));
      el.classList.remove('v-match','v-sync','v-off');
      const chip=el.querySelector('[data-vd]'),note=el.querySelector('[data-note]');
      const r=vd(o,v);
      if(v.lack&&v.chg)done++;
      if(r==='match')match++;
      let cls='a36-vd',txt='未体检';
      if(v.lack&&v.chg){
        cls+=' '+r;
        txt=r==='match'?'对上了':r==='sync'?'待对齐':'错位';
        el.classList.add('v-'+r);
      }else if(v.lack||v.chg){txt='未完成';}
      chip.className=cls;chip.textContent=txt;
      if(r){
        note.className='a36-note on '+r;
        note.innerHTML=verdictHTML(o,v,r);
      }else{
        const last=v._last==='lack'?o.ln[v.lack]:v._last==='chg'?((o.chg.find(c=>c.k===v.chg)||{}).note||''):'';
        note.className='a36-note';
        note.textContent=last||'先判断最缺哪一层，再选一个最小改动。';
      }
    });
    st.textContent='已体检 '+done+' / 6　·　对上 '+match+' / 6';
  }

  grid.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    const el=b.closest('[data-org]');if(!el)return;
    const o=ORGS.find(x=>x.k===el.dataset.org);
    const v=a.orgs[o.k]||(a.orgs[o.k]={});
    if(b.closest('[data-lack]')){
      v.lack=v.lack===b.dataset.v?'':b.dataset.v;v._last='lack';
    }else if(b.closest('[data-chg]')){
      v.chg=v.chg===b.dataset.v?'':b.dataset.v;v._last='chg';
    }else return;
    api.save();paint();api.refresh();
  });
  sec.querySelector('#a36Reset').onclick=()=>{
    a.orgs={};api.save();paint();api.refresh();api.toast('六家组织已回到未体检');
  };
  paint();
},
hint(S){
  const g=NS(S).orgs||{};
  const n=ORGS.filter(o=>{const v=g[o.k]||{};return v.lack&&v.chg;}).length;
  if(n>=6)return '';
  const half=ORGS.filter(o=>{const v=g[o.k]||{};return (v.lack||v.chg)&&!(v.lack&&v.chg);}).length;
  return '还差 '+(6-n)+' 家做完'+(half?'（有 '+half+' 家只选了一半）':'');
},
gate(S){
  const g=NS(S).orgs||{};
  return ORGS.every(o=>{const v=g[o.k]||{};return !!(v.lack&&v.chg);});
}},

/* ---------- 4 在你的事上 ---------- */
{id:'mine',name:'在你的事上',short:'在你的事',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>你的组织里，一个想法<em>要过几道门</em></h1>
<p>不写制度，写你上周见过的那一次：谁提的、交给了谁、等了多久、最后谁点头。</p></div>
<div class="grid2" style="align-items:start">
  <div class="panel">
    <div class="panel-h"><h4>① 从产生到被批准，要几步</h4><span>至少 10 字</span></div>
    <div class="field"><textarea id="a36Steps" maxlength="90" placeholder="例：柜员提给主管 → 周会讨论 → 报分行 → 等季度预算 → 批，前后 6 周"></textarea></div>
    <p class="a36-mini" id="a36StepsN">用 → 分隔，能看出几步。</p>
    <div class="row" style="margin-top:2px"><span class="small" id="a36StepsLen">0 / 90</span></div>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>② 卡在哪一层</h4><span>三选一</span></div>
    <div class="a36-seg big" data-ml>
      <button data-v="auth">授权</button><button data-v="inc">激励</button><button data-v="chn">通道</button>
    </div>
    <p class="a36-mini" id="a36LackN">三层里最堵的那一层。选完这里会给一个找法。</p>
    <p class="a36-fixhint" id="a36FixHint">先选 ②，这里会给一个最小改动的找法。</p>
  </div>
</div>
<div class="panel" style="margin-top:12px">
  <div class="panel-h"><h4>③ 你能改的最小一处</h4><span>至少 12 字</span></div>
  <div class="field"><textarea id="a36Fix" maxlength="80" class="a36-ta-lg" placeholder="例：给支行长 5 万元以下减免权，事后报备，先跑 30 天"></textarea></div>
  <div class="row" style="margin-top:7px"><span class="small" id="a36FixLen">0 / 80</span><div style="flex:1"></div>
    <button class="btn sm" id="a36Ask">让 AI 追问我</button></div>
  <div class="a36-check" id="a36Check">
    <span class="a36-ck" data-ck="num">一个数字</span>
    <span class="a36-ck" data-ck="time">一个时限</span>
    <span class="a36-ck" data-ck="who">一个责任人</span>
    <em>写完看一眼：最小改动通常只要这三样。</em>
  </div>
</div>
<div class="a36-ex">
  <div><span class="k">授权</span><p>给支行长 5 万元以下减免权，事后报备</p></div>
  <div><span class="k">激励</span><p>换模每降 1 分钟奖 50 元，随当月工资发</p></div>
  <div><span class="k">通道</span><p>每周一次堵点会，48 小时内给答复</p></div>
</div>`,
init(sec,api){
  const S=api.S,a=NS(S);
  if(typeof a.steps!=='string')a.steps='';
  if(typeof a.fix!=='string')a.fix='';
  const steps=sec.querySelector('#a36Steps'),fix=sec.querySelector('#a36Fix'),
        sLen=sec.querySelector('#a36StepsLen'),fLen=sec.querySelector('#a36FixLen'),
        sN=sec.querySelector('#a36StepsN'),lN=sec.querySelector('#a36LackN'),
        tip=sec.querySelector('#a36FixHint');
  function stepCount(t){const m=(t||'').match(/→|->|＞|>/g);return m?m.length+1:0;}
  function paint(full){
    if(full){
      if(document.activeElement!==steps)steps.value=a.steps||'';
      if(document.activeElement!==fix)fix.value=a.fix||'';
    }
    sLen.textContent=(a.steps||'').length+' / 90';
    fLen.textContent=(a.fix||'').length+' / 80';
    const n=stepCount(a.steps);
    sN.textContent=n>1?'读到 '+n+' 步。再写一句：等了多久。':'用 → 分隔，能看出几步。';
    sec.querySelectorAll('[data-ml] button').forEach(b=>b.classList.toggle('on',a.lack===b.dataset.v));
    lN.textContent=a.lack?LAYER_Q[a.lack]:'三层里最堵的那一层。选完这里会给一个找法。';
    tip.textContent=a.lack?LAYER_FIX[a.lack]:'先选 ②，这里会给一个最小改动的找法。';
    const t=a.fix||'';
    const ck={num:/\d/.test(t),time:/(天|周|月|季度|小时|分钟|个工作日)/.test(t),
      who:/(谁|组长|主任|经理|主管|行长|负责人|店长|校长|科长|窗口)/.test(t)};
    sec.querySelectorAll('[data-ck]').forEach(el=>el.classList.toggle('on',!!ck[el.dataset.ck]));
  }
  steps.addEventListener('input',()=>{a.steps=steps.value;api.save();paint(false);api.refresh();});
  fix.addEventListener('input',()=>{a.fix=fix.value;api.save();paint(false);api.refresh();});
  sec.querySelectorAll('[data-ml] button').forEach(b=>b.onclick=()=>{
    a.lack=a.lack===b.dataset.v?'':b.dataset.v;api.save();paint(false);api.refresh();
  });
  sec.querySelector('#a36Ask').onclick=()=>{
    const tab=document.querySelector('.side-tab[data-tab="ask"]');if(tab)tab.click();
    api.ai('so_what','在我组织里，一个普通员工的想法从产生到被批准，大概是这样的：'+(a.steps||'还没写')+'。我认为卡在'+(a.lack?LAYER[a.lack]:'还没判断')+'这一层。我想改的最小一处是：'+(a.fix||'还没写')+'。');
  };
  paint(true);
},
hint(S){
  const a=NS(S);
  if((a.steps||'').length<10)return '先写清一条路（至少 10 字）：谁提、交给谁、等多久';
  if(!a.lack)return '判断：卡在哪一层（授权 / 激励 / 通道）';
  if((a.fix||'').length<12)return '写你能改的最小一处（至少 12 字）：额度、时限、范围';
  return '';
},
gate(S){
  const a=NS(S);
  return (a.steps||'').length>=10&&!!a.lack&&(a.fix||'').length>=12;
}},

/* ---------- 5 过滤与提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 过滤与提交',
html:`
<div class="step-h a36-sub-h"><h1>两个判断，<em>然后交卡</em></h1>
<p>授权这件事，技术上都做得到。难的是它会动到谁的位置，以及你怎么只在一个小地方试。</p></div>
<div class="grid2" style="align-items:start">
  <div id="a36CardSlot"></div>
  <div class="panel">
    <div class="panel-h"><h4>① 谁会反对授权</h4><span>单选</span></div>
    <div class="opts a36-opts4">
      ${OPPOSE.map(o=>'<button class="opt" data-op="'+o.k+'"><span class="k">'+o.k.toUpperCase()+'</span><span><b>'+o.t+'</b><span>'+o.d+'</span></span></button>').join('')}
    </div>
    <div id="a36OpOut"></div>
  </div>
</div>
<div class="grid2" style="align-items:start;margin-top:10px">
  <div class="panel">
    <div class="panel-h"><h4>② 先在哪一个小团队试</h4><span>单选 + 一句话</span></div>
    <div class="opts a36-opts4">
      ${PILOT.map(o=>'<button class="opt" data-pl="'+o.k+'"><span class="k">'+o.k.toUpperCase()+'</span><span><b>'+o.t+'</b><span>'+o.d+'</span></span></button>').join('')}
    </div>
    <div id="a36PlOut"></div>
    <div class="field" style="margin-top:9px"><label>怎么试：团队、时长、看什么</label>
      <textarea id="a36PilotLine" maxlength="60" placeholder="例：先在 8 人的对公柜组试 30 天，只看对公户平均跑几趟" style="min-height:44px"></textarea></div>
    <div class="row" style="margin-top:6px"><span class="small" id="a36PlLen">0 / 60</span></div>
  </div>
  <div class="panel a36-sub">
    <div class="panel-h"><h4>③ 交卡前自检</h4><span id="a36SubSt">未提交</span></div>
    <div class="a36-ready" id="a36Ready"></div>
    <p class="small" style="margin-top:9px">提交后自动跑一遍机器评审（有用 / 可行 / 证据），再进班级互评池。未登录：只存本机。</p>
    <div class="row" style="margin-top:auto;padding-top:12px">
      <button class="btn primary" id="a36SubBtn">提交到班级</button>
      <button class="btn" id="a36Export">导出 PNG</button>
    </div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=NS(S);
  if(typeof a.pilotLine!=='string')a.pilotLine='';
  const slot=sec.querySelector('#a36CardSlot'),line=sec.querySelector('#a36PilotLine'),
        len=sec.querySelector('#a36PlLen'),st=sec.querySelector('#a36SubSt'),
        btn=sec.querySelector('#a36SubBtn'),opOut=sec.querySelector('#a36OpOut'),
        plOut=sec.querySelector('#a36PlOut'),readyBox=sec.querySelector('#a36Ready');
  function paint(full){
    if(full&&document.activeElement!==line)line.value=a.pilotLine||'';
    len.textContent=(a.pilotLine||'').length+' / 60';
    sec.querySelectorAll('[data-op]').forEach(b=>b.classList.toggle('on',a.oppose===b.dataset.op));
    sec.querySelectorAll('[data-pl]').forEach(b=>b.classList.toggle('on',a.pilot===b.dataset.pl));
    opOut.innerHTML=a.oppose?'<p class="a36-note-in">'+api.esc(OPPOSE_NOTE[a.oppose])+'</p>':'';
    plOut.innerHTML=a.pilot?'<p class="a36-note-in">'+api.esc(PILOT_NOTE[a.pilot])+'</p>':'';
    slot.innerHTML='<div class="outcard a36-card"><div class="oh"><span>DELIVERABLE · A36</span><span>机制体检卡</span></div>'+
      '<h5>机制体检卡</h5><div class="kv">'+rows(a).map(r=>'<div><b>'+api.esc(r[0])+'</b><span class="'+(r[1]!=='—'?'fill':'')+'">'+api.esc(r[1])+'</span></div>').join('')+
      '</div></div>';
    const g=a.orgs||{};
    const done=ORGS.filter(o=>{const v=g[o.k]||{};return v.lack&&v.chg;}).length;
    const items=[
      {ok:done>=6,t:'体检 6 / 6 个组织'},
      {ok:!!a.lack,t:'你判断的卡点'},
      {ok:(a.fix||'').length>=12,t:'最小改动'},
      {ok:!!a.oppose,t:'谁会反对授权'},
      {ok:!!(a.pilot&&(a.pilotLine||'').length>=6),t:'试点：团队、时长、看什么'}
    ];
    readyBox.innerHTML=items.map(i=>'<div class="'+(i.ok?'ok':'')+'"><i>'+(i.ok?'✓':'·')+'</i><span>'+i.t+'</span></div>').join('');
    const ready=!!(a.oppose&&a.pilot&&(a.pilotLine||'').length>=6);
    st.textContent=S.submitted?'已提交':'未提交';
    btn.textContent=S.submitted?'已提交，去看班级':(ready?'提交到班级':'先补完两个判断');
    btn.disabled=!!S.submitted||!ready;
  }
  sec.querySelectorAll('[data-op]').forEach(b=>b.onclick=()=>{a.oppose=b.dataset.op;api.save();paint(false);api.refresh();});
  sec.querySelectorAll('[data-pl]').forEach(b=>b.onclick=()=>{a.pilot=b.dataset.pl;api.save();paint(false);api.refresh();});
  line.addEventListener('input',()=>{a.pilotLine=line.value;api.save();paint(false);api.refresh();});
  btn.onclick=async()=>{
    if(!(a.oppose&&a.pilot&&(a.pilotLine||'').length>=6)){api.toast('先把两个判断补完');return;}
    await api.submit();paint(false);
  };
  sec.querySelector('#a36Export').onclick=()=>api.exportCard();
  paint(true);
  paintSubmit=()=>paint(true);
},
onEnter(){if(paintSubmit)paintSubmit();},
hint(S){
  const a=NS(S);
  if(!a.oppose)return '先判断：谁会反对授权';
  if(!a.pilot)return '再判断：先在哪一个小团队试';
  if((a.pilotLine||'').length<6)return '写一句：团队、时长、看什么';
  return '';
},
gate(S){
  const a=NS(S);
  return !!(a.oppose&&a.pilot&&(a.pilotLine||'').length>=6);
}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>带走<em>三句话</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 三层</div><p class="small" style="margin-top:5px">授权、激励、通道。缺哪层补哪层；用培训补机制，是最常见的一次性投入。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 三句判据</div><p class="small" style="margin-top:5px">没授权 = 空转；没激励 = 一阵风；没通道 = 靠运气。听人抱怨时，对上哪一句。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 最小改动</div><p class="small" style="margin-top:5px">一个额度、一条时限、一个 30 天的试点。机制的第一版应该能写在一张 A4 上。</p></div>
</div>
<p class="a36-closing"><span><b>2,000</b> 人 · <b>170</b> 场 · <b>190</b> 个想法 · <b>40</b> 个落地</span><em>让这些数字成立的不是培训，是那三道门。</em></p>
<div class="panel"><div class="panel-h"><h4>下一节 · 毕业项目开始</h4><span>A37</span></div>
<p class="small">A37 · 项目：选题与组件盘点。十周的最后一段：把一个题目定下来，盘出八到十个组件。题目要小到你今天见过它、30 天能验证。后面三节都在这一个题目上做。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="a36Again">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#a36Again').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '你们公司谁能自己拍板花一笔钱？额度多少？',
 '上一个被批准的想法，从提出到批准用了多久？',
 '做成之后，好处落在谁身上？',
 '如果只给一线一个额度，你会给多少？',
 '你的试点，30 天后用什么判断算成功？'
]},

card(S){
  const a=NS(S);
  return {title:'A36 · 机制体检卡',rows:rows(a)};
},

notes:[
 {t:'本节目标',h:'让学员把「创新」从培训与口号，看成三层机制：授权、激励、通道。带走一次体检和一处能落地的改动。'},
 {t:'时间分配',h:'先猜 6′ · 概念 9′ · 体检台 14′ · 在你的事 10′ · 过滤与提交 5′ · 收束 1′。体检台至少留 10 分钟让人真点，不要替他们判。'},
 {t:'常见卡点',h:'一是把「缺激励」当成「人不行」——车间那条最典型：他会改，改完收益被收走。二是诊断和动作对不上：说缺授权，却选了一个评奖。工作台会当场指出来，不用讲师纠正。'},
 {t:'直播怎么接',h:'看后台六家组织「最缺哪一层」的分布。如果整班把医院判成「缺授权」，就念医院那条的注：主任两年前就点过头。再挑 2 位学员写的最小改动，现场问三件事：额度多少、谁签字、30 天后看什么。'},
 {t:'现场提醒',h:'提前一周让每人带一个「我们知道怎么改、但改不动」的具体例子。讲到授信、合规、医疗安全这类强监管动作时，强调授权必须带额度上限与事后抽查；本节给的是「范围内的自主」，不是取消审批。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A36']=L;
})();
