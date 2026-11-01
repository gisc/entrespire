/* A05 · 组织的猴子实验 */
(function(){
'use strict';

const VN={retire:'可退役',reform:'需改造',keep:'保留'};
const VREASON={
 retire:'问题不在了，拿掉也没人察觉。这条规则的理由已经不在房间里。',
 reform:'目的还在，形式可以更轻：换一种做法，别取消目的。',
 keep:'问题还在，拿掉会出事。这条先别动，它挡的是真东西。'
};

/* 三问 → 三色。③ 是主判据，② 只用来区分「保留」和「需改造」。 */
function verdict(v){
  if(!v||!v.q1||!v.q2||!v.q3)return '';
  if(v.q3==='none')return 'retire';
  if(v.q3==='alt')return 'reform';
  return v.q2==='alive'?'keep':'reform';
}

const RULES=[
{k:'r1',n:'报销要贴 5 张单',tag:'财务',
 q1:[
  {k:'a',l:'防虚报',note:'纸票时代，五张单是唯一能对上账的证据：票、审批、行程、签到、事由。'},
  {k:'b',l:'防丢票',note:'少一张退回来，确实省了财务的核对时间——那是副作用，不是目的。'},
  {k:'c',l:'好归档',note:'归档是结果，不是原因。当年真正怕的是有人拿假票换钱。'}],
 q2:[
  {k:'alive',l:'在',note:'虚报还在，只是信息现在在系统里，不在纸上。'},
  {k:'shift',l:'变了',note:'问题换了形式：多报、拆单、重复报，靠数张数拦不住。'},
  {k:'gone',l:'没了',note:'电子发票、对公支付、行程直连之后，「票对不上」这个具体问题基本消失。'}],
 q3:[
  {k:'bad',l:'会出事',note:'会。没有抽查和事后追责，一定有人试。'},
  {k:'alt',l:'有替代',note:'有。系统比对加 10% 抽查，比五张纸更硬。'},
  {k:'none',l:'没人察觉',note:'多数人不会察觉，除了财务——他们的核对方式要跟着换。'}],
 adv:{retire:'五张纸的功能，系统已经接了。改成「系统比对 + 抽查 10%」，先跑一个季度。',
      reform:'别删报销，删「五张」。票、审批、行程留一样，其余交给系统。',
      keep:'还没有系统比对的话，五张纸就是唯一的核对手段。先补系统，再谈退役。'}},

{k:'r2',n:'日报抄送 3 个领导',tag:'信息',
 q1:[
  {k:'a',l:'三个领导各管一段',note:'当年三个人分管人、钱、客户，日报是他们唯一的进度来源。抄送名单是组织结构，不是信息需求。'},
  {k:'b',l:'留书面证据',note:'留痕是真的，但那是抄送的副产品。当年要的是进度，不是证据。'},
  {k:'c',l:'养成写日报的习惯',note:'习惯是结果。没有谁会为了培养习惯，专门设计一份日报。'}],
 q2:[
  {k:'alive',l:'在',note:'进度还得让人知道，只是现在系统里、群里都有。'},
  {k:'shift',l:'变了',note:'问题换了：不是没信息，是信息太多，日报成了第二份记录。'},
  {k:'gone',l:'没了',note:'不少团队的进度已经由看板自动生成，日报不再承担同步功能。'}],
 q3:[
  {k:'bad',l:'会出事',note:'会。跨部门出问题时，没人说得清当时谁答应了什么。'},
  {k:'alt',l:'有替代',note:'有。项目群置顶加周会看板，比日报实时，也比日报短。'},
  {k:'none',l:'没人察觉',note:'多半没人察觉。三个领导里，通常只有一个人会点开。'}],
 adv:{retire:'名单按「谁会做决定」重写，不是按「谁的级别高」。先删掉不看的两个。',
      reform:'日报可以留，但改成「只写卡住的事」，抄送只给需要拍板的那个人。',
      keep:'如果客户合同要求留痕，先别动，但要写清留多久、给谁看、谁负责归档。'}},

{k:'r3',n:'周会必须开 2 小时',tag:'会议',
 q1:[
  {k:'a',l:'跨厂区只能当面同步',note:'当年厂区分散、电话难打，一周只能见一次面，两小时是把事说完的长度。'},
  {k:'b',l:'让所有人对齐',note:'「对齐」是目的，不是原因。原因是从前没有别的对齐方式。'},
  {k:'c',l:'领导的时间表',note:'时间表是结果。两小时是为内容定的，不是为某个人定的。'}],
 q2:[
  {k:'alive',l:'在',note:'有些事还是只能当面吵完，比如预算怎么分。'},
  {k:'shift',l:'变了',note:'要同步的信息早就会前发了，剩下的两小时大多在等迟到的人。'},
  {k:'gone',l:'没了',note:'同步已经发生在群里，周会真正需要的是决策，不是通报。'}],
 q3:[
  {k:'bad',l:'会出事',note:'会。有些分歧不当面说，会在会后变成两个版本。'},
  {k:'alt',l:'有替代',note:'有。30 分钟议题制，只留有分歧的三件事，其余会前书面过。'},
  {k:'none',l:'没人察觉',note:'不会有人察觉少了一小时，除非那一小时本来就在等某个人。'}],
 adv:{retire:'先砍到 45 分钟，议题提前 24 小时收。第二周就知道哪半小时是空的。',
      reform:'保留周会，改成「三个有分歧的议题 + 一个决定」，超时的另开小会。',
      keep:'如果这是唯一的跨部门决策场，别砍时长，砍人数和议题数。'}},

{k:'r4',n:'采购要 4 级审批',tag:'采购',
 q1:[
  {k:'a',l:'金额大，出事要担责',note:'早年一笔采购能顶半年利润，四级是四个人的专业判断：需求、预算、合规、技术。'},
  {k:'b',l:'防吃回扣',note:'防回扣靠的是比价和留痕，不是签字的人数。'},
  {k:'c',l:'流程规范',note:'「规范」是同义反复：规范就是这套流程它自己。'}],
 q2:[
  {k:'alive',l:'在',note:'大额采购的风险还在，但 5 万以下的小额采购也被四级卡着。'},
  {k:'shift',l:'变了',note:'风险从「买贵了」变成「买错了」和「买了不用」，四级审批都看不出来。'},
  {k:'gone',l:'没了',note:'集采、框架协议、比价平台上线后，单笔采购的价格风险大幅下降。'}],
 q3:[
  {k:'bad',l:'会出事',note:'会。没有第二双眼睛，一定有人把需求写成自己想要的样子。'},
  {k:'alt',l:'有替代',note:'有。按金额分档：5 万以下两级，50 万以上四级，再加事后抽查。'},
  {k:'none',l:'没人察觉',note:'不会。审批人自己会先反对，因为这改变了他们的工作量。'}],
 adv:{retire:'先只对小额退役：5 万以下两级，跑三个月，看有没有出事。',
      reform:'别取消审批，改分档。审批的价值在金额和风险，不在签字的人数。',
      keep:'大额那一档先别动。把四级留在 50 万以上，其余按金额往下减。'}},

{k:'r5',n:'工位不能放私人物品',tag:'现场',
 q1:[
  {k:'a',l:'客户来参观',note:'早年客户常到工位参观，工位是公司形象的一部分。这条规则是给客人看的。'},
  {k:'b',l:'防丢失',note:'防丢失靠的是柜子和门禁，不是桌面。'},
  {k:'c',l:'便于清洁',note:'清洁是物业的活。桌面收不收，不影响拖地。'}],
 q2:[
  {k:'alive',l:'在',note:'形象还是有价值，但客户现在多在会议室和样品间。'},
  {k:'shift',l:'变了',note:'办公形态变了：共享工位、远程办公，桌面已经不是「谁的」了。'},
  {k:'gone',l:'没了',note:'参观动线早就不走工位区，这条规则现在只管自己人。'}],
 q3:[
  {k:'bad',l:'会出事',note:'会。有人会堆到影响邻座，或者把安全要求的东西放没了。'},
  {k:'alt',l:'有替代',note:'有。给每人一个柜子，加一条「不影响邻座」的底线，比「不能放」清楚。'},
  {k:'none',l:'没人察觉',note:'没人会察觉，除了行政——他们少了一项每周检查。'}],
 adv:{retire:'参观改到会议室和样品间，工位就不必替公司站台。',
      reform:'把「不能放」改成「不能挡住通道、不能影响邻座」，其余不管。',
      keep:'如果工位真的在客户参观动线上，先留，但把标准拍成照片，别靠口头。'}},

{k:'r6',n:'汇报 PPT 不许超过 20 页',tag:'汇报',
 q1:[
  {k:'a',l:'董事会只给 20 分钟',note:'当年汇报在董事会上，20 页是会议时长除以每页讨论时间算出来的。'},
  {k:'b',l:'逼你说重点',note:'「逼你说重点」是这条规则后来的用法，不是它诞生的原因。'},
  {k:'c',l:'省打印费',note:'打印费从来不是重点，重点是谁有时间听。'}],
 q2:[
  {k:'alive',l:'在',note:'注意力还是有限，但限制页数已经不是唯一的办法。'},
  {k:'shift',l:'变了',note:'汇报从「现场讲」变成「先发后讲」，页数不再是时长。'},
  {k:'gone',l:'没了',note:'很多人先看材料再开会，页数多少和会议效率没有关系了。'}],
 q3:[
  {k:'bad',l:'会出事',note:'不会出大事，但会有人用 20 页讲一件三句话能说完的事。'},
  {k:'alt',l:'有替代',note:'有。第一页必须有结论和数字，附录不限页数。'},
  {k:'none',l:'没人察觉',note:'没人察觉。真正被记住的通常只有第一页。'}],
 adv:{retire:'取消页数上限，改成「第一页必须是结论加一个数字」。',
      reform:'保留 20 页，但把附录拆出去：正文 20 页，论证随便放。',
      keep:'如果领导确实只给 20 分钟，页数限制是合理的，但要写清是「讲」20 页，不是「写」20 页。'}}
];

const OPPOSE=[
 {k:'a',t:'靠这条规则省事的人',d:'审批的人、核对的人、写模板的人'},
 {k:'b',t:'靠这条规则免责的人',d:'出过事，这条规则是他的挡箭牌'},
 {k:'c',t:'没人会反对，只是没人想过',d:'通常意味着没人真的在用它'},
 {k:'d',t:'说不上来，我还没问过',d:'最诚实的一个答案'}
];
const OPPOSE_NOTE={
 a:'他们不是坏人，工作量是被这条规则定义的。先给他一个更轻的替代，再谈取消。',
 b:'这类反对最难，因为它不谈效率，谈责任。要么留一个更小的免责动作，要么把责任一起改掉。',
 c:'先问三个每天填它的人。没人反对，往往是因为没人真的在读它。',
 d:'那就先别交卡。问三个人，记下他们说的理由——这本身就是一次考古。'
};
const PILOT=[
 {k:'a',t:'一个部门停 30 天',d:'有期限、有记录、可回退'},
 {k:'b',t:'改成抽查，看有没有人发现',d:'要知道自己在测什么'},
 {k:'c',t:'开一次会宣布取消',d:'宣布不等于停止'},
 {k:'d',t:'直接全公司取消',d:'除非确认过没有硬约束'}
];
const PILOT_NOTE={
 a:'最稳的一种：30 天、一个部门、一份记录。出了事能立刻改回来，这就是它的全部价值。',
 b:'也算试点，但先写清在测什么：测合规会不会破，还是测有没有人发现。两件事的结论不一样。',
 c:'宣布不等于停止。规则会以口头形式回来，而且下一次更难改。',
 d:'除非你已经确认没有安全、合规、财务授权约束，否则这不是试点，是赌。'
};

/* ---------- 现场示意图（本课重绘，非官方原图） ---------- */
const MONKEY='<g id="a05mon">'+
 '<circle cx="-3" cy="-48" r="5.5"/><circle cx="27" cy="-48" r="5.5"/>'+
 '<ellipse cx="12" cy="-46" rx="11" ry="11.5"/>'+
 '<ellipse cx="12" cy="-41.5" rx="7.5" ry="5.5"/>'+
 '<circle cx="7.5" cy="-50" r="1.4" fill="currentColor" stroke="none"/>'+
 '<circle cx="16.5" cy="-50" r="1.4" fill="currentColor" stroke="none"/>'+
 '<path d="M8.5 -39q3.5 3 7 0"/>'+
 '<path d="M4 -31c0 8-1 11-1 19h18c0-8-1-11-1-19"/>'+
 '<path d="M2 -25c-6 4-8 9-8 15"/>'+
 '<path d="M22 -25c6 4 8 9 8 15"/>'+
 '<path d="M9 -12v12M16 -12v12"/>'+
 '<path d="M21 -20c10 1 13 7 11 13"/>'+
 '</g>';

const SCENE='<svg class="a05-scene" viewBox="0 0 640 380" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">'+
 '<defs>'+MONKEY+'</defs>'+
 /* 顶与地 */
 '<path d="M40 26h560" opacity=".18"/>'+
 '<path d="M40 318h560" opacity=".38"/>'+
 '<path d="M40 318l-10 8M80 318l-10 8M120 318l-10 8M160 318l-10 8M200 318l-10 8M240 318l-10 8M280 318l-10 8M320 318l-10 8M360 318l-10 8M400 318l-10 8M440 318l-10 8M480 318l-10 8M520 318l-10 8M560 318l-10 8M600 318l-10 8" opacity=".12"/>'+
 /* 台子 */
 '<rect x="256" y="292" width="336" height="26" rx="2" opacity=".55"/>'+
 '<path d="M262 296h324" opacity=".3"/>'+
 /* 梯子 */
 '<path d="M206 318L282 92M250 318L326 92"/>'+
 '<path d="M213 300l45 0M220 278l45 0M227 256l45 0M234 234l45 0M241 212l45 0M248 190l45 0M255 168l45 0M262 146l45 0M269 124l45 0M276 102l45 0" opacity=".55"/>'+
 /* 香蕉 */
 '<path d="M344 26v22" opacity=".25"/>'+
 '<path d="M339 49h10" stroke="#C9A227" stroke-width="2.4"/>'+
 '<g stroke="#C9A227" stroke-width="5.2" stroke-linecap="round" opacity=".92">'+
 '<path d="M342 53c-8 7-12 18-11 29"/>'+
 '<path d="M345 53c-2 10-1 21 2 29"/>'+
 '<path d="M348 53c6 8 9 18 8 27"/>'+
 '</g>'+
 '<path d="M331 80l-2 5M347 82l-1 5M356 79l0 5" stroke="#C9A227" stroke-width="2" opacity=".7"/>'+
 /* 冷水 */
 '<path d="M40 78h16" opacity=".5"/>'+
 '<rect x="56" y="70" width="18" height="16" rx="3"/>'+
 '<path d="M74 78h6" opacity=".7"/>'+
 '<path d="M80 82c46 14 96 54 118 118" stroke="#6FA8E8" stroke-width="1.3" stroke-dasharray="3 6" opacity=".7"/>'+
 '<path d="M80 90c52 22 104 76 126 148" stroke="#6FA8E8" stroke-width="1.3" stroke-dasharray="3 6" opacity=".55"/>'+
 '<path d="M80 98c58 30 112 96 138 168" stroke="#6FA8E8" stroke-width="1.3" stroke-dasharray="3 6" opacity=".4"/>'+
 '<circle cx="118" cy="112" r="1.8" fill="#6FA8E8" stroke="none" opacity=".8"/>'+
 '<circle cx="152" cy="150" r="1.6" fill="#6FA8E8" stroke="none" opacity=".7"/>'+
 '<circle cx="186" cy="196" r="1.5" fill="#6FA8E8" stroke="none" opacity=".55"/>'+
 '<circle cx="214" cy="244" r="1.4" fill="#6FA8E8" stroke="none" opacity=".45"/>'+
 /* 五只 */
 '<use href="#a05mon" x="292" y="292"/>'+
 '<use href="#a05mon" x="356" y="292"/>'+
 '<use href="#a05mon" x="420" y="292"/>'+
 '<use href="#a05mon" x="484" y="292"/>'+
 '<use href="#a05mon" x="548" y="292"/>'+
 /* 新来的 */
 '<g transform="translate(148,318) scale(1.06)"><use href="#a05mon" opacity=".8"/></g>'+
 '<circle cx="162" cy="228" r="13" stroke-dasharray="3 3" opacity=".45"/>'+
 '<text class="a05-qm" x="162" y="234">?</text>'+
 /* 标注 */
 '<text class="a05-lb" x="40" y="52">冷水</text>'+
 '<text class="a05-lb" x="366" y="62">香蕉</text>'+
 '<text class="a05-lb" x="292" y="344">五只猴子 · 都被浇过</text>'+
 '<text class="a05-lb acc" x="104" y="352">第六只 · 从没被浇过</text>'+
 '<text class="a05-lb" x="262" y="150" text-anchor="end">梯子</text>'+
 '</svg>';

const L={
id:'A05',week:2,seq:5,title:'组织的猴子实验',
kicker:'WEEK 2 · 组织惯性',tool:'mind',toolName:'组织惯性',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>它们为什么，<em>不敢上梯子</em></h1>
<p>1967 年，五只猴子被放进一间房。房中央有一架梯子，梯子顶端挂着香蕉。规则只有一条：<b>只要有一只猴子往上爬，五只全部被冷水浇。</b>几十轮之后，没有猴子再碰梯子。</p></div>
<div class="a05-hook">
  <figure class="a05-fig">
    <button class="case-zoom" data-zoom="scene" title="看大图">⤢</button>
    ${SCENE}
    <figcaption class="a05-figcap"><b>房间示意 · 五只猴子 / 梯子 / 冷水</b>
      <span>香蕉在梯子顶端。谁往上爬，五只一起被浇。</span>
      <em>图：本课重绘，非官方原图　依据 SIT 官方课程材料 Day1 p.47–57</em></figcaption>
  </figure>
  <div class="a05-hook-r">
    <div class="a05-ask"><span class="a05-ask-k">先别讲道理</span>
      <p>后来，实验者把猴子<b>一只一只</b>换掉。最后一只被换进来时，房间里已经<b>没有任何一只被浇过冷水</b>。</p>
      <p style="margin-top:5px">它第一次往梯子上爬，接下来会怎样——它<b>为什么</b>最后也不敢上了？</p></div>
    <div class="opts">
      <button class="opt" data-h="a"><span class="k">A</span><span><b>怕挨打</b><span>被同伴揍过，疼是它自己的记忆</span></span></button>
      <button class="opt" data-h="b"><span class="k">B</span><span><b>看别人挨打</b><span>它没挨过冷水，只看见别人挨揍</span></span></button>
      <button class="opt" data-h="c"><span class="k">C</span><span><b>没人告诉它为什么</b><span>规则传下来了，理由没传下来</span></span></button>
      <button class="opt" data-h="d"><span class="k">D</span><span><b>它自己试过</b><span>爬过一次，被拽下来打了一顿</span></span></button>
    </div>
    <div id="a05HookOut" style="margin-top:10px"></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#a05HookOut');
  function paint(){
    const v=S.answers.hook;
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',v===b.dataset.h));
    if(!v){out.innerHTML='';return;}
    const ok=v==='c';
    out.innerHTML='<div class="a05-reveal '+(ok?'ok':'warn')+'">'+
      '<div class="a05-reveal-h"><span>'+(ok?'你抓住了这一节要的东西':'四句都对了一半')+'</span><span>五只猴子 · Stage 4</span></div>'+
      '<p>它试过一次（D），被四只同伴拽下来打了一顿（A）；从那以后，它也开始打下一个上梯子的（B）。而<b>从头到尾，没有人告诉过它为什么</b>（C）。</p>'+
      '<p class="small">前三个说的都是行为，只有 C 说的是这条规则的<b>状态</b>：理由已经不在房间里了。'+
        (ok?'　你选的就是这一条。':'　所以四个都对了一半，但只有 C 是这一节要解剖的东西。')+'</p>'+
      '<p><b>它继承的不是冷水，是一条没人记得原因的规则。</b></p>'+
      '<p class="small">五只全部换完之后，房间里没有一个被浇过冷水的猴子，也没有一个知道香蕉为什么不能拿。但规矩还在：谁敢上梯子，四只一起把它拽下来。</p>'+
      '<p class="a05-note">官方那一页只有一句问句：<b>When will they learn? When will we?</b>（Day1 p.46）　实验记录见 Stephenson 1967；SIT 在课上把它拆成四个阶段讲。</p>'+
      '</div>';
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{S.answers.hook=b.dataset.h;api.save();paint();api.refresh();});
  sec.querySelectorAll('[data-zoom]').forEach(b=>b.onclick=e=>{
    e.stopPropagation();
    api.modal('<button class="modal-x">×</button><h3>五只猴子 · 房间示意</h3>'+
      '<div class="a05-fig" style="margin:8px 0 12px">'+SCENE+'</div>'+
      '<p>香蕉在梯子顶端。任何一只往上爬，五只一起被冷水浇。几十轮之后，没有猴子再碰梯子。</p>'+
      '<p class="small">图：本课重绘，非官方原图。依据 SIT 官方课程材料 Day1 p.47–57。</p>');
  });
  paint();
},
hint(S){return S.answers.hook?'':'先选一个：它为什么最后也不敢上了';},
gate(S){return !!S.answers.hook;}},

/* ---------- 2 概念 ---------- */
{id:'concept',name:'概念',short:'概念',kicker:'STEP 2 · 概念',
html:`
<div class="step-h"><h1>规则活下来了，<em>理由没有</em></h1>
<p>组织里也有这样的房间。规则被写下来时总有原因：一次事故、一笔钱、一个客户的要求。几年后，原因走了，规则还在——它写在「我们这儿就是这样」里。</p></div>
<div class="a05-concepts">
  <div class="panel a05-def">
    <div class="panel-h"><h4>组织惯性</h4><span>Organizational Fixedness</span></div>
    <p class="a05-def-p">一组曾经有效、现在仍在执行、但已经没人说得清原因的做法。</p>
    <p class="small" style="margin-top:6px">它不是懒。执行一条旧规则，比重新论证一条旧规则便宜得多。</p>
    <p class="a05-silent"><b>沉默的证据</b>「还在执行」被当成「还有用」。这两件事没有关系。</p>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>组织层级的思维定势</h4><span>Day1 p.58</span></div>
    <div class="a05-qlist">
      <div><span>01</span><p>「我们这儿就是这样。」</p></div>
      <div><span>02</span><p>「我们领先市场，为什么要改？」</p></div>
      <div><span>03</span><p>「他去年拒过这个想法，你凭什么觉得这次不一样？」</p></div>
      <div><span>04</span><p>「想法很好，但我们没有时间也没有资源。」</p></div>
    </div>
    <p class="a05-qcap">这四句里没有一句在讨论事实。它们讨论的是<b>谁承担改变的成本</b>。</p>
  </div>
</div>
<div class="panel a05-choice" style="margin-top:12px">
  <div class="panel-h"><h4>哪一句更接近组织的真实状态？</h4><span>二选一</span></div>
  <div class="opts a05-opts2">
    <button class="opt" data-c2="a"><span class="k">A</span><span><b>这条规则还在执行，说明它还有用。</b><span>沉默的证据</span></span></button>
    <button class="opt" data-c2="b"><span class="k">B</span><span><b>这条规则还在执行，只说明还没人停下来问过它。</b><span>考古的起点</span></span></button>
  </div>
  <div id="a05C2Out" style="margin-top:9px"></div>
</div>
<div class="panel" style="margin-top:12px">
  <div class="panel-h"><h4>规则考古三问</h4><span>顺序不能换</span></div>
  <div class="a05-three">
    <div class="a05-three-i"><span class="a05-n">1</span><b>当初解决什么问题</b>
      <p>说得出具体的人、事故、一笔钱。说不出，就先别判。</p></div>
    <div class="a05-three-i"><span class="a05-n">2</span><b>那个问题今天还在吗</b>
      <p>在 / 变了 / 没了。最常见的是「变了」：问题还在，但不是原来那个。</p></div>
    <div class="a05-three-i"><span class="a05-n">3</span><b>拿掉会真的出事吗</b>
      <p>会出事 / 有替代 / 没人察觉。这一问最容易被高估。</p></div>
  </div>
  <p class="a05-boundary"><b>什么时候别用：</b>安全、合规、财务授权、合同留痕——这四类先执行，再考古。它们常是有人用一次事故换来的，退役要走正式流程。</p>
</div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#a05C2Out');
  function paint(){
    const v=S.answers.concept;
    sec.querySelectorAll('[data-c2]').forEach(b=>b.classList.toggle('on',v===b.dataset.c2));
    if(!v){out.innerHTML='';return;}
    const ok=v==='b';
    out.innerHTML='<div class="a05-reveal '+(ok?'ok':'warn')+'">'+
      '<div class="a05-reveal-h"><span>'+(ok?'这就是考古的姿态':'先承认它可能有用')+'</span><span>沉默的证据</span></div>'+
      '<p class="small">'+(ok
        ? 'B 不否定「有用」，它只是把「有用」从推断变成待验证。上一题的四只猴子，执行的就是 A。'
        : 'A 可能对，但你现在没有证据。它把「还在执行」当成了「还有用」——这正是猴子们继承下来的那句：我们这儿就是这样。')+'</p></div>';
  }
  sec.querySelectorAll('[data-c2]').forEach(b=>b.onclick=()=>{S.answers.concept=b.dataset.c2;api.save();paint();api.refresh();});
  paint();
},
hint(S){return S.answers.concept?'':'选一句：哪句更接近组织的真实状态';},
gate(S){return !!S.answers.concept;}},

/* ---------- 3 工作台：规则考古台 ---------- */
{id:'bench',name:'工作台',short:'考古台',kicker:'STEP 3 · 规则考古台',
html:`
<div class="step-h a05-bench-h"><h1>六条规则，<em>逐条考古</em></h1>
<p>下面六条都真实存在于公司里，你可能每周都在执行其中三条。<b>每条只做三件事</b>：找回它当初的问题、判断那个问题今天还在不在、估一下拿掉会怎样。三问答完，它会自己落到一个颜色里。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>① 当初解决什么</span>
  <span class="op"><span class="op-n">2</span>② 那个问题今天还在吗</span>
  <span class="op"><span class="op-n">3</span>③ 拿掉会怎样</span>
</div>
<div class="bench a05-bench">
  <div class="bench-h"><b>BENCH · 规则考古台</b><span class="st" id="a05St">已判 0 / 6</span></div>
  <div class="bench-b">
    <div class="a05-rules" id="a05Rules"></div>
  </div>
  <div class="bench-f">
    <span class="small">判定：③ 没人察觉 → <b style="color:#9ED3B4">可退役</b>；③ 有替代 → <b style="color:#EFCB94">需改造</b>；③ 会出事 → ② 在则<b style="color:#A9C4FA">保留</b>，否则需改造。走完 3 条解锁。</span>
    <div style="flex:1"></div>
    <button class="btn sm ghost" id="a05Reset">全部重来</button>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  if(!a.rules||typeof a.rules!=='object')a.rules={};
  const grid=sec.querySelector('#a05Rules'),st=sec.querySelector('#a05St');
  function seg(q,lbl,opts){
    return '<div class="a05-q"><span class="lbl" title="'+lbl+'">'+lbl+'</span><span class="a05-seg" data-q="'+q+'">'+
      opts.map(o=>'<button data-v="'+o.k+'" title="'+api.esc(o.note)+'">'+api.esc(o.l)+'</button>').join('')+
      '</span></div>';
  }
  grid.innerHTML=RULES.map((r,i)=>'<div class="a05-rule" data-rule="'+r.k+'">'+
    '<div class="a05-rule-h"><span class="n">'+String(i+1)+'</span><b>'+api.esc(r.n)+'</b>'+
    '<span class="a05-tag">'+r.tag+'</span><span class="a05-vd" data-vd>未判</span>'+
    '<button class="a05-undo" data-undo title="这条重判">↺</button></div>'+
    seg('q1','① 当初解决',r.q1)+seg('q2','② 今天还在',r.q2)+seg('q3','③ 拿掉之后',r.q3)+
    '<p class="a05-why" data-why>三问都答完，这里给结论。</p></div>').join('');

  function paint(){
    let done=0;const c={retire:0,reform:0,keep:0};
    grid.querySelectorAll('[data-rule]').forEach(el=>{
      const r=RULES.find(x=>x.k===el.dataset.rule),v=a.rules[r.k]||{};
      el.querySelectorAll('[data-q]').forEach(sg=>{
        const q=sg.dataset.q;
        sg.querySelectorAll('button').forEach(b=>b.classList.toggle('on',v[q]===b.dataset.v));
      });
      const vd=verdict(v),chip=el.querySelector('[data-vd]');
      el.classList.remove('v-retire','v-reform','v-keep');
      chip.className='a05-vd';
      const why=el.querySelector('[data-why]');
      if(vd){
        done++;c[vd]++;
        el.classList.add('v-'+vd);chip.classList.add(vd);chip.textContent=VN[vd];
        why.className='a05-why done '+vd;
        why.innerHTML='<b>'+VN[vd]+'</b>'+api.esc(r.adv[vd]);
      }else{
        chip.textContent=(v.q1||v.q2||v.q3)?'未完成':'未判';
        const last=v._last,opt=last&&(r[last]||[]).find(o=>o.k===v[last]);
        why.className='a05-why';
        why.innerHTML=opt?'<b>'+(last==='q1'?'①':last==='q2'?'②':'③')+'</b>'+api.esc(opt.note):'三问都答完，这里给结论。';
      }
    });
    st.textContent='已判 '+done+' / 6　·　可退役 '+c.retire+' · 需改造 '+c.reform+' · 保留 '+c.keep;
  }

  grid.addEventListener('click',e=>{
    const un=e.target.closest('[data-undo]');
    if(un){
      const k=un.closest('[data-rule]').dataset.rule;
      a.rules[k]={};api.save();paint();api.refresh();return;
    }
    const b=e.target.closest('[data-q] button');if(!b)return;
    const el=b.closest('[data-rule]'),k=el.dataset.rule,q=b.closest('[data-q]').dataset.q;
    const v=a.rules[k]||(a.rules[k]={});
    if(v[q]===b.dataset.v){delete v[q];delete v._last;}
    else{v[q]=b.dataset.v;v._last=q;}
    api.save();paint();api.refresh();
  });
  sec.querySelector('#a05Reset').onclick=()=>{
    a.rules={};api.save();paint();api.refresh();
    api.toast('六条规则已回到未判状态');
  };
  paint();
},
hint(S){
  const rs=S.answers.rules||{};
  const n=RULES.filter(r=>verdict(rs[r.k])).length;
  if(n>=3)return '';
  const half=RULES.filter(r=>{const v=rs[r.k]||{};return (v.q1||v.q2||v.q3)&&!verdict(v);}).length;
  return '还差 '+(3-n)+' 条走完三问'+(half?'（有 '+half+' 条答了一半）':'');
},
gate(S){
  const rs=S.answers.rules||{};
  return RULES.filter(r=>verdict(rs[r.k])).length>=3;
}},

/* ---------- 4 在你的事上 ---------- */
{id:'mine',name:'在你的事上',short:'在你的事',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>写下你组织里<em>那条没人记得为什么</em>的规则</h1>
<p>不用挑最大的，挑最日常的：每次都要做、没人说得清、问起来会被回一句「一直这样」。写动作，不写感受。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>写一条规则</span>
  <span class="op"><span class="op-n">2</span>三问自查</span>
  <span class="op"><span class="op-n">3</span>重写一句</span>
</div>
<div class="panel">
  <div class="panel-h"><h4>① 那条规则</h4><span>至少 8 个字</span></div>
  <div class="field"><input id="a05Rule" maxlength="60" placeholder="例如：所有需求变更必须走 OA，先找部门经理签字"></div>
  <div class="row" style="margin-top:6px"><span class="small" id="a05RuleLen">0 / 60</span><div style="flex:1"></div><span class="small">写清：谁、每次、必须做什么</span></div>
</div>
<div class="panel" style="margin-top:12px">
  <div class="panel-h"><h4>② 三问自查</h4><span>答案会落到一个颜色里</span></div>
  <div class="a05-mq"><span class="a05-mq-l">① 当初解决什么问题</span>
    <div class="field"><input id="a05Why" maxlength="40" placeholder="一个具体的人、一次事故、一笔钱"></div></div>
  <div class="a05-mq"><span class="a05-mq-l">② 那个问题今天还在吗</span>
    <div class="a05-seg big" data-mq="mq2">
      <button data-v="alive">在</button><button data-v="shift">变了</button><button data-v="gone">没了</button>
    </div></div>
  <div class="a05-mq"><span class="a05-mq-l">③ 拿掉会怎样</span>
    <div class="a05-seg big" data-mq="mq3">
      <button data-v="bad">会出事</button><button data-v="alt">有替代</button><button data-v="none">没人察觉</button>
    </div></div>
  <div id="a05MineOut" class="a05-mine-out">三问答完，这里会给一个颜色。</div>
</div>
<div class="panel" style="margin-top:12px">
  <div class="panel-h"><h4>③ 如果今天重新设计，我会怎么写</h4><span>至少 10 个字</span></div>
  <div class="field"><textarea id="a05Redesign" maxlength="90" placeholder="例如：只留电子发票和审批记录，财务按 10% 抽查，抽到问题追到人"></textarea></div>
  <div class="row" style="margin-top:8px"><span class="small" id="a05ReLen">0 / 90</span><div style="flex:1"></div>
    <button class="btn sm" id="a05Ask">让 AI 追问我</button></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  if(typeof a.rule!=='string')a.rule='';
  if(typeof a.why!=='string')a.why='';
  if(typeof a.redesign!=='string')a.redesign='';
  const rule=sec.querySelector('#a05Rule'),why=sec.querySelector('#a05Why'),
        re=sec.querySelector('#a05Redesign'),rLen=sec.querySelector('#a05RuleLen'),
        reLen=sec.querySelector('#a05ReLen'),out=sec.querySelector('#a05MineOut');
  function paint(full){
    if(full){
      if(document.activeElement!==rule)rule.value=a.rule||'';
      if(document.activeElement!==why)why.value=a.why||'';
      if(document.activeElement!==re)re.value=a.redesign||'';
    }
    rLen.textContent=(a.rule||'').length+' / 60';
    reLen.textContent=(a.redesign||'').length+' / 90';
    sec.querySelectorAll('[data-mq]').forEach(sg=>{
      sg.querySelectorAll('button').forEach(b=>b.classList.toggle('on',a[sg.dataset.mq]===b.dataset.v));
    });
    const vd=verdict({q1:a.why,q2:a.mq2,q3:a.mq3});
    if(vd){
      out.className='a05-mine-out on '+vd;
      out.innerHTML='<b>'+VN[vd]+'</b>'+VREASON[vd]+
        '<span>'+(vd==='retire'?'下一步：先停 30 天，记录出了什么事。'
          :vd==='reform'?'下一步：留下目的，换掉形式——写清换成什么。'
          :'下一步：先别动，但把理由补在规则旁边。给规则补一个理由，本身也是考古。')+'</span>';
    }else{
      out.className='a05-mine-out';
      out.textContent='三问答完，这里会给一个颜色。';
    }
  }
  rule.addEventListener('input',()=>{a.rule=rule.value;api.save();paint(false);api.refresh();});
  why.addEventListener('input',()=>{a.why=why.value;api.save();paint(false);api.refresh();});
  re.addEventListener('input',()=>{a.redesign=re.value;api.save();paint(false);api.refresh();});
  sec.querySelectorAll('[data-mq]').forEach(sg=>sg.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    const k=sg.dataset.mq;
    a[k]=a[k]===b.dataset.v?'':b.dataset.v;
    api.save();paint(false);api.refresh();
  }));
  sec.querySelector('#a05Ask').onclick=()=>{
    document.querySelector('.side-tab[data-tab="ask"]').click();
    api.ai('so_what','我组织里有一条规则：'+(a.rule||'还没写')+'。我认为它当初是为了'+(a.why||'说不清')+'，今天这个问题'+(a.mq2==='alive'?'还在':a.mq2==='shift'?'变了':a.mq2==='gone'?'已经没了':'我还没判断')+'，拿掉'+(a.mq3==='bad'?'会出事':a.mq3==='alt'?'有替代':a.mq3==='none'?'没人察觉':'我还没判断')+'。');
  };
  paint(true);
},
hint(S){
  const a=S.answers;
  if((a.rule||'').length<8)return '先写一条规则（至少 8 个字）：谁、每次、必须做什么';
  if((a.why||'').length<4)return '补上 ①：这条规则当初解决什么问题';
  if(!a.mq2)return '判断 ②：那个问题今天还在吗';
  if(!a.mq3)return '判断 ③：拿掉会怎样';
  if((a.redesign||'').length<10)return '写一句：如果今天重新设计，你会怎么写（至少 10 个字）';
  return '';
},
gate(S){
  const a=S.answers;
  return (a.rule||'').length>=8&&(a.why||'').length>=4&&!!a.mq2&&!!a.mq3&&(a.redesign||'').length>=10;
}},

/* ---------- 5 过滤与提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 过滤与提交',
html:`
<div class="step-h a05-submit-h"><h1>两个判断，<em>然后交卡</em></h1>
<p>退役一条规则，技术上通常不难。难的是它背后站着谁，以及你怎么给自己留一条退路。</p></div>
<div class="grid2" style="align-items:start">
  <div id="a05CardSlot"></div>
  <div class="panel a05-mini">
    <div class="panel-h"><h4>① 谁会反对？</h4><span>单选</span></div>
    <div class="opts a05-opts4">
      ${OPPOSE.map(o=>'<button class="opt" data-op="'+o.k+'"><span class="k">'+o.k.toUpperCase()+'</span><span><b>'+o.t+'</b><span>'+o.d+'</span></span></button>').join('')}
    </div>
    <div id="a05OpOut"></div>
  </div>
</div>
<div class="grid2" style="align-items:start;margin-top:10px">
  <div class="panel a05-mini">
    <div class="panel-h"><h4>② 最小可行的试点</h4><span>单选 + 一句话</span></div>
    <div class="opts a05-opts4">
      ${PILOT.map(o=>'<button class="opt" data-pl="'+o.k+'"><span class="k">'+o.k.toUpperCase()+'</span><span><b>'+o.t+'</b><span>'+o.d+'</span></span></button>').join('')}
    </div>
    <div id="a05PlOut"></div>
    <div class="field" style="margin-top:9px"><label>怎么试：范围、时长、看什么</label>
      <textarea id="a05PilotLine" maxlength="60" placeholder="例如：先在一个 12 人的部门停 30 天，只看有没有出过一笔错" style="min-height:48px"></textarea></div>
    <div class="row" style="margin-top:6px"><span class="small" id="a05PlLen">0 / 60</span></div>
  </div>
  <div class="panel a05-sub">
    <div class="panel-h"><h4>③ 交卡</h4><span id="a05SubSt">未提交</span></div>
    <p class="small">提交后引擎会自动跑一遍机器评审，然后进入班级互评池。</p>
    <div class="row" style="margin-top:9px">
      <button class="btn primary" id="a05SubBtn">提交到班级</button>
      <button class="btn" id="a05Export">导出 PNG</button>
      <div style="flex:1"></div>
    </div>
    <div class="hint" style="margin-top:7px">未登录：只存本机，不进互评池。</div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  if(typeof a.pilotLine!=='string')a.pilotLine='';
  const slot=sec.querySelector('#a05CardSlot'),line=sec.querySelector('#a05PilotLine'),
        len=sec.querySelector('#a05PlLen'),st=sec.querySelector('#a05SubSt'),
        btn=sec.querySelector('#a05SubBtn'),
        opOut=sec.querySelector('#a05OpOut'),plOut=sec.querySelector('#a05PlOut');
  function rows(){
    const rs=a.rules||{};
    const c={retire:0,reform:0,keep:0};
    RULES.forEach(r=>{const v=verdict(rs[r.k]);if(v)c[v]++;});
    const n=c.retire+c.reform+c.keep;
    return [
      ['规则盘点',n+' / 6 条　可退役 '+c.retire+' · 需改造 '+c.reform+' · 保留 '+c.keep],
      ['我的规则',a.rule||'—'],
      ['当初的问题',a.why||'—'],
      ['今天',({alive:'还在',shift:'变了',gone:'没了'})[a.mq2]||'—'],
      ['拿掉',({bad:'会出事',alt:'有替代',none:'没人察觉'})[a.mq3]||'—'],
      ['重新设计',a.redesign||'—'],
      ['试点',(PILOT.find(x=>x.k===a.pilot)||{}).t||'—']
    ];
  }
  function paint(full){
    if(full&&document.activeElement!==line)line.value=a.pilotLine||'';
    len.textContent=(a.pilotLine||'').length+' / 60';
    sec.querySelectorAll('[data-op]').forEach(b=>b.classList.toggle('on',a.oppose===b.dataset.op));
    sec.querySelectorAll('[data-pl]').forEach(b=>b.classList.toggle('on',a.pilot===b.dataset.pl));
    opOut.innerHTML=a.oppose?'<p class="a05-note-in">'+api.esc(OPPOSE_NOTE[a.oppose])+'</p>':'';
    plOut.innerHTML=a.pilot?'<p class="a05-note-in">'+api.esc(PILOT_NOTE[a.pilot])+'</p>':'';
    slot.innerHTML='<div class="outcard a05-card"><div class="oh"><span>DELIVERABLE · A05</span><span>判断卡</span></div>'+
      '<h5>我的规则考古卡</h5><div class="kv">'+rows().map(r=>'<div><b>'+api.esc(r[0])+'</b><span class="'+(r[1]!=='—'?'fill':'')+'">'+api.esc(r[1])+'</span></div>').join('')+
      '</div></div>';
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
  sec.querySelector('#a05Export').onclick=()=>api.exportCard();
  paint(true);
  paint5=()=>paint(true);
},
onEnter(){if(paint5)paint5();},
hint(S){
  const a=S.answers;
  if(!a.oppose)return '先判断：谁会反对';
  if(!a.pilot)return '再判断：最小可行的试点是哪一种';
  if((a.pilotLine||'').length<6)return '写一句：范围、时长、看什么';
  return '';
},
gate(S){
  const a=S.answers;
  return !!(a.oppose&&a.pilot&&(a.pilotLine||'').length>=6);
}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>带走<em>三句话</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 规则会脱壳</div><p class="small" style="margin-top:5px">理由走了，规则留下。执行它的人越认真，越没人敢问它为什么。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 三问就够</div><p class="small" style="margin-top:5px">当初解决什么 / 今天还在吗 / 拿掉会怎样。三个答案，落在三个颜色上。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 先试点，再宣布</div><p class="small" style="margin-top:5px">退役一条规则的成本不在决定，在回退。给自己留 30 天和一条退路。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A06</span></div>
<p class="small">A06 · 限制导致创新：以色列与阿波罗 13。下一节反过来：不是把规则拿掉，是<b>给你更少的资源</b>。以色列没有水也没有地，阿波罗 13 没有电——限制不是障碍，是搜索空间的边界。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="a05Again">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#a05Again').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '你上一次问「为什么要这么做」，得到的回答是什么？',
 '如果这条规则明天消失，第一个发现的人会是谁？',
 '你公司里哪条规则，是出过一次事之后加上去的？',
 '谁会因为这条规则被拿掉而工作量翻倍？',
 '30 天之后，你用什么判断这次试点算成功？'
]},

card(S){
  const a=S.answers||{};
  const rs=a.rules||{};
  const c={retire:0,reform:0,keep:0};
  RULES.forEach(r=>{const v=verdict(rs[r.k]);if(v)c[v]++;});
  const n=c.retire+c.reform+c.keep;
  return {title:'A05 · 我的规则考古卡',rows:[
    ['规则盘点',n+' / 6 条　可退役 '+c.retire+' · 需改造 '+c.reform+' · 保留 '+c.keep],
    ['我的规则',a.rule||'—'],
    ['当初的问题',a.why||'—'],
    ['今天',({alive:'还在',shift:'变了',gone:'没了'})[a.mq2]||'—'],
    ['拿掉',({bad:'会出事',alt:'有替代',none:'没人察觉'})[a.mq3]||'—'],
    ['重新设计',a.redesign||'—'],
    ['试点',(PILOT.find(x=>x.k===a.pilot)||{}).t||'—']
  ]};
},

notes:[
 {t:'本节目标',h:'让学员承认：组织里大量规则的理由已经消失，而「还在执行」不等于「还有用」。带走一套会后能独立使用的三问。'},
 {t:'时间分配',h:'先猜 6′ · 概念 8′ · 考古台 13′ · 在你的事 10′ · 判断与提交 6′ · 收束 2′。考古台至少留 10 分钟让人真点，不要替他们判。'},
 {t:'常见卡点',h:'一是把「我不喜欢这条规则」当成「这条规则没用」——三问顺序不能换，先给规则一个善意的解释。二是只敢选「保留」，因为选「可退役」像是在批评公司。提醒：判「保留」也要写理由，否则和三问之前没有区别。'},
 {t:'直播怎么接',h:'看后台六条规则的判定分布。如果整班把「周会必须 2 小时」判成可退役，就现场追问：谁会反对？把「谁会反对」这一栏的答案念出来，比讲组织变革有用。再挑 2 条学员自己写的规则，现场做一次三问，只做三问，不给结论。'},
 {t:'现场提醒',h:'提前一周让每人带一条「我们这儿一直这样」的规则，写在便签上带来。没带的人多半会写「考勤」。涉及安全、合规、财务授权、客户合同留痕的，本节只做考古，不做退役决定；现场要明确说出这条边界。'}
]};

let paint5=null;

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A05']=L;
})();
