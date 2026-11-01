/* A30 · 产品概念：可行性五问 */
(function(){
'use strict';

const IMG={ solarad:'assets-cases-a30-solarad.jpg' };

/* ---------- 五问 ---------- */
const QS=[
 {k:'who', n:'①', t:'谁付钱',    d:'能指名一个人或一个岗位，他今年就要为这件事掏钱。', miss:'常错：说“所有人都需要”。'},
 {k:'how', n:'②', t:'他才有多少', d:'他一年在这件事上花的钱或时间，报得出一个数。',      miss:'常错：把“便宜”当成“买得起”。'},
 {k:'now', n:'③', t:'现在怎么解决', d:'说得出他今天用的替代方案，以及它具体差在哪一步。', miss:'常错：把“没人做”当成“没有替代”。'},
 {k:'make',n:'④', t:'能不能做出来', d:'用今天买得到的材料，做出一个能连续工作 8 小时的样机。', miss:'常错：把“理论上可以”当成“做得出来”。'},
 {k:'keep',n:'⑤', t:'做出来谁维护', d:'坏的那天，谁到场、谁付钱、多久修好。',            miss:'常错：等装到现场才想这件事。'}
];
const LVN=['挂','要验证','过'];
const VN=['卡住','需验证','通过'];

/* ---------- 六个概念：每问三条，level 2 过 / 1 要验证 / 0 挂 ---------- */
const CON=[
{id:'c1',n:'阴天也能充的太阳能充电宝',tag:'消费电子 · 硬件',rv:0,rk:'make',
 sc:'一块 A4 板缝进背包，自带 10,000 mAh。卖点：阴天也能充。',
 ref:'卡在④。钱有人付、替代方案清楚、也没有可坏的活动件；难在阴天的能量密度。',
 a:{
  who:[['露营、徒步的人，出发前会单独买一块电源',2,'付钱的人具体到一类出行方式，这笔钱他每年都花。'],
       ['“所有手机用户”——谁都要充电',0,'“所有人”说不出预算科目，等于没人付钱。'],
       ['户外俱乐部，按次租给会员',1,'会付，但先要一个数：一年租出去多少次。']],
  how:[['“应该不少，现在谁不带充电宝”',0,'“应该”是猜。猜出来的数支撑不了任何决定。'],
       ['只肯为应急付一次钱，平时用插座',1,'一次性支出撑不起复购——这是个要验证的前提。'],
       ['一年在充电宝、营地电源上花 300–600 元',2,'有金额、有频次，能算出一个市场。']],
  now:[['没有替代方案，这是空白',0,'没有替代方案，通常意味着没有需求，不是没有产品。'],
       ['带两块充电宝，或到营地插电；差在重量和排队',2,'替代方案清楚，而且说得出它差在哪一步。'],
       ['带一块大的，重但够用',1,'“够用”是最难打的对手。要验证的是他愿不愿意换。']],
  make:[['板面 0.06 m²，阴天 1–2 W，充满要 30 小时以上',0,'物理约束：算得出来的做不到，就是做不到。'],
       ['换成高效板，阴天也能到 6 W',0,'面积没变、光照没变，6 W 不会凭空出现。这是把希望当参数。'],
       ['把板做到背包那么大',0,'板够大了，包也背不动了——问题被挪给了用户。']],
  keep:[['寄回厂家检测，往返两周',0,'两周没有电，用户会因为这一条退货。'],
       ['用户自己擦板面，不用上门',1,'不用上门是对的，但“擦”救不了划伤和老化。'],
       ['没有活动件，坏了整块换，成本 80 元',2,'维护成本低于换新，用户自己就能处理。']]}},

{id:'c2',n:'村口的游乐场水泵',tag:'公共设施 · 社会创新',rv:0,rk:'keep',
 sc:'孩子玩的旋转木马连着水泵，玩着玩着水就上来了。',
 ref:'卡在⑤。前四问都过：援助机构出钱、一台 5 万摊到每人 160 元、比走两公里强、三十年前的技术。装完第二年密封圈坏了，当地买不到件，只能等下一次援助。',
 a:{
  who:[['村民自筹，用得上就愿意出',0,'“用得上”不等于“愿意出钱”，这是最常见的假设。'],
       ['援助机构按村立项，一台一笔预算',2,'预算科目清楚，采购方明确，能算一年几台。'],
       ['学校和援助机构出钱，村民不出',1,'出钱的人和使用的人不是同一个，这本身要验证。']],
  how:[['一台 5 万元，一个村 300 人，摊到每人 160 元',2,'有单价、有人数，账算得出来。'],
       ['一台 5 万元，由一家企业认捐',1,'认捐能成一台，成不了 100 台——规模要另算。'],
       ['很便宜，比打井便宜',0,'“便宜”不是数字。没有单价就没有可行性。']],
  now:[['没有，他们只能走很远',0,'“没有”要证据：走多远、一天几趟，都要有数。'],
       ['有的村有手压泵，有的没有',1,'覆盖率不明，先要知道你替换的是哪一种。'],
       ['手压泵，或走两公里去河边；差在取水时间',2,'替代方案具体，痛点能折成小时。']],
  make:[['要防冻、防沙、防孩子卡手，做不出来',0,'说不清哪一条过不去，说明还没真正评估。'],
       ['转盘加泵体，三十年前的技术，当地能装',2,'用今天买得到的件能做出来，安装也不需要专家。'],
       ['泵体要定制，转盘可以用现成的',1,'能做，但要验证定制件的交期。']],
  keep:[['零件当地买不到，等援助方下次来修',0,'装得上，修不了——这是两件事。'],
       ['培训一个村民当维修员',1,'方向对，但要验证这个人的时间从哪来、件钱谁出。'],
       ['坏了就换新的',0,'换新的钱谁出？没有这一句，第五问就没有答。']]}},

{id:'c3',n:'24 小时无人健身房',tag:'本地生活 · 门店',rv:1,rk:'keep',
 sc:'县城 200 m²，30 台器械，扫码进门，没有店员。',
 ref:'⑤ 最容易被低估。门禁、监控都是现成的；难在“坏的那天谁到场”——老板的时间就是这家店的天花板。',
 a:{
  who:[['周边 3 公里、25–40 岁的上班族，年卡',2,'半径、年龄、付费方式都说得出来。'],
       ['想健身又怕被推销的人',1,'“怕推销”是情绪，要验证它能不能变成一张年卡。'],
       ['所有人，健身是刚需',0,'“刚需”是形容词。它不会来办卡。']],
  how:[['比请私教便宜很多',0,'便宜是相对值，不是他能掏的钱。'],
       ['月卡 199，先试再续',1,'月卡降低门槛，也降低留存——要验证续费率。'],
       ['年卡 1,200 元，县城同类 1,500–2,000',2,'有对比价，价格带站得住。']],
  now:[['县城没有健身房，这是空白',0,'空白常常是“有人试过、没成”，不是没人想到。'],
       ['去市里连锁店，或在家跟视频练',2,'替代方案清楚：一个是距离，一个是没人管。'],
       ['小区里有个活动室，器械很旧',1,'替换对象明确，但要验证他会不会为“新”换地方。']],
  make:[['门禁、监控、扫码开柜都是现成设备',2,'没有一项要自己研发。'],
       ['门禁要能和年卡系统打通',1,'能打通，但要验证供应商肯不肯做小客户。'],
       ['要自己开发一套会员系统',0,'自己开发，是把一门生意变成两个项目。']],
  keep:[['器械坏了、有人晕倒、厕所脏，都要老板到',1,'能维持，但老板的时间就是天花板——这是要算的成本。'],
       ['请一个兼职，每天巡场两小时',2,'有责任人、有工时，成本算得出来。'],
       ['装摄像头，远程看着就行',0,'摄像头看得见，抬不动人。']]}},

{id:'c4',n:'宠物临终关怀（上门）',tag:'本地服务 · 高客单',rv:0,rk:'how',
 sc:'上门做安乐与告别，一次 1,800–3,500 元。',
 ref:'卡在②。客单价高，但一个城市一年只有几百单，摊不开两台车、两个人。',
 a:{
  who:[['所有养宠的人',0,'相当一部分养宠人不接受安乐，这一句就砍掉一大块市场。'],
       ['宠物医院转介的客户',1,'转介能来单，但命脉握在别人手里。'],
       ['把宠物当家人的城市养宠家庭，愿意为“不痛苦”付钱',2,'人群具体，付费意愿有场景支撑。']],
  how:[['一个城市一年只有几百单，养不活一个团队',0,'客单价高，但频次太低：固定成本摊不开。'],
       ['一次 2,000 元，一个月 10 单',1,'还要算固定成本：车、药、人，10 单够不够。'],
       ['一次 2,000，一个月 30 单才打平',2,'至少知道打平线在哪——这是能算的。']],
  now:[['没有人在做',0,'没人做要查清楚：是没想到，还是做不成。'],
       ['宠物医院里做，或自己带回家处理',2,'替代方案清楚，差在“在哪、谁陪着”。'],
       ['有的医院能介绍，但不做仪式',1,'半替代：他已经在付钱，只是买不到后半段。']],
  make:[['车、保温箱、药、一个持证兽医，都是现成的',2,'没有一项要突破技术。'],
       ['需要兽医资质，可以合作',1,'合作能解决，但要验证排班能不能随叫随到。'],
       ['要自己养一个兽医团队',0,'那是另一个生意，不是这一个。']],
  keep:[['接到单再找人',0,'临终这件事不能“到时候再说”。'],
       ['固定两人小组，一人主理一人备勤',2,'责任到人，出问题知道找谁。'],
       ['两个全职，轮班，夜里出车',1,'能维护，但要验证夜里出车的成本。']]}},

{id:'c5',n:'AI 会议纪要',tag:'B2B · SaaS',rv:0,rk:'now',
 sc:'开会自动录音转写，会后 5 分钟出一份带待办的纪要。',
 ref:'卡在③。人找得到、钱出得起、技术现成；难在他现在的做法“麻烦但能忍”，没到要花钱的程度。',
 a:{
  who:[['20–200 人公司的行政或总助，他负责会后整理',2,'具体到岗位，而且这件事现在就在他手上。'],
       ['老板——他觉得会开得太久',1,'老板会点头，但签字的人常是行政。'],
       ['所有开会的公司',0,'“所有公司”意味着没有切入点。']],
  how:[['他们会觉得应该免费',0,'如果真这么想，要换人群，而不是降价。'],
       ['一个 50 人的公司，一年在这上面花 6,000–12,000 元',2,'有金额区间，能算出客单价上限。'],
       ['愿意一个月付 300 元',1,'有价格，但要验证是不是随口说的。']],
  now:[['行政记一份，或者会后问参会的人',0,'他不觉得这是问题，只是“麻烦一点”——这就够让它停在原地。'],
       ['用免费转写工具，再手工整理',1,'已经在用工具，说明有意识——但要验证他会不会付费升级。'],
       ['有实习生专门记，一个月 3,000 元',2,'已经在花钱，这是最好的信号。']],
  make:[['要自己训练一个行业模型',0,'这是三年的事，不是三个月。'],
       ['行业词识别要调，准确率 85% 左右',1,'能用，但要验证 85% 够不够。'],
       ['转写用现成接口，摘要用现成模型',2,'没有一项要自己训练模型。']],
  keep:[['SaaS 标准运维，一个客服对 200 家',2,'有比例、有边界，成本算得出来。'],
       ['客户自己管账号，出问题提工单',1,'能维护，但要验证一个人能扛多少客户。'],
       ['每家都要上门部署',0,'上门部署会把毛利吃光。']]}},

{id:'c6',n:'试衣间里结账',tag:'零售 · 流程',rv:2,rk:'keep',
 sc:'试衣间挂钩上装一台手持 POS，试好了当场付，出门只过防盗门。',
 ref:'五问都过。付钱的是店长、账算得清、设备现成、故障走原报修流程。',
 a:{
  who:[['顾客，他们愿意为不排队付钱',0,'顾客不为流程付钱，只为商品付钱。'],
       ['门店店长，改造预算在门店，转化率算他的',2,'付钱的人是店长，不是顾客——这一点先分清。'],
       ['区域运营，按门店试点批预算',1,'预算层级更高、周期更长，但钱是真的。']],
  how:[['省下的是顾客的时间，很难折成钱',0,'折不成钱，就进不了门店的预算表。'],
       ['一台手持 POS 2,000 元，先试两家店',1,'试点的账算得清，全面铺开的账还没算。'],
       ['一家店改造 3 万元，一年多卖 200 件就回本',2,'投入与回收都能算。']],
  now:[['排队 6 分钟，试完的衣服常被放回架上',2,'替代方案和损失都量化了，这是最强的一种。'],
       ['去收银台排队，平均 6 分钟',1,'痛点能量化，但 6 分钟够不够让人改变行为，要验证。'],
       ['没什么问题，大家习惯了',0,'“习惯了”是最贵的对手。']],
  make:[['要改整套收银系统',0,'改系统是总部级项目，不是门店试点。'],
       ['手持 POS、挂钩支架、防盗门都是现成设备',2,'没有一项要研发。'],
       ['POS 要和门店库存系统对接',1,'能对接，但要验证 IT 排期。']],
  keep:[['要专门配一个 IT 驻店',0,'一家店配一个 IT，账立刻不成立。'],
       ['设备坏了店员重启，退货在后台补录',1,'有人接，但多了一道手工补录。'],
       ['店员每天交接时检查，故障走现有报修',2,'维护落在现有流程里，不新增岗位。']]}}
];

const FATAL={a:'会致命',b:'不会，但会拖慢',c:'还不知道'};
const COST={a:'半天 · 0 元',b:'两周 · 2 千元',c:'两个月 · 5 万元'};

/* ---------- 判定 ---------- */
function X(S){return (S.answers||{}).a30||{};}
function pOf(S,id){return (X(S).pick||{})[id]||{};}
function stateOf(C,p){
  const lv=QS.map(q=>{const i=p[q.k];return (i===undefined||i===null||!C.a[q.k][i])?null:C.a[q.k][i][1];});
  if(lv.some(v=>v===null))return null;
  return lv.some(v=>v===0)?0:(lv.some(v=>v===1)?1:2);
}
function doneN(S){return CON.filter(C=>stateOf(C,pOf(S,C.id))!==null).length;}
function tally(S){
  const t=[0,0,0];
  CON.forEach(C=>{const v=stateOf(C,pOf(S,C.id));if(v!==null)t[v]++;});
  return t;
}

function matchText(x){
  if(!x||!x.weak||!x.cost)return '';
  const mk=['who','how','now'].indexOf(x.weak)>=0;
  const CL={
    a: mk?'✓ 匹配。市场类的问题只能问人：3 个人、各 20 分钟。'
        : (x.weak==='make'?'△ 不够。④ 问不出来，得让它真的跑一次。'
        : '△ 不够。⑤ 要等它坏一次，问人问不出维修成本。'),
    b: '✓ 匹配。两周、2 千，够做一个手工版，也够让 1 个人用 5 天。',
    c: '△ 过度。这是“确认能做之后”的钱。'
  };
  const FL={
    a:'你说它会致命——先别做样机，用最便宜的方式确认。',
    b:'你说它不致命——验证是为了知道代价，不是证伪。',
    c:'你说还不知道——把它写成一句能被否掉的话。'
  };
  return '<div><b>成本</b>'+CL[x.cost]+'</div>'+(x.fatal?'<div style="margin-top:6px"><b>致命性</b>'+FL[x.fatal]+'</div>':'');
}

const L={
id:'A30',week:8,seq:30,title:'产品概念：可行性五问',
kicker:'WEEK 8 · 场景迁移',tool:'mind',toolName:'可行性五问',minutes:45,
steps:[
/* ================= 1 先猜 ================= */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>看起来<em>马上能卖</em>的东西，常常做不出来</h1>
<p>这张广告是真的做出来了：2013 年，NIVEA 在巴西的杂志里印了一块太阳能板。翻到这一页，把它摊在沙滩上，插上线就能给手机充电。前后 8 个月：3 个月找板、3 个月开发、2 个月试印。</p>
<p>有人照这个思路做产品：一块 A4 大小的板缝进背包，号称<b>阴天也能充</b>。先猜——五问里，哪一问会先挂？</p></div>
<div class="a30-hero">
  <figure class="a30-photo">
    <button class="case-zoom" data-zoom="solarad" title="看大图">⤢</button>
    <img src="${IMG.solarad}" alt="NIVEA SUN 太阳能广告充电器：杂志广告页上印着太阳能板，插线给手机充电" loading="lazy">
    <figcaption><b>NIVEA SUN · Solar Ad Charger</b><span>板印在纸上，线接手机：把广告页做成充电器。</span>
      <em class="a30-src">图：SIT 官方课程材料（已授权）　TU 库 p.94</em></figcaption>
  </figure>
  <div class="a30-ask">
    <div class="a30-ask-k">三选一 · 哪一问先挂</div>
    <div class="opts">
      <button class="opt" data-h="a"><span class="k">A</span><span><b>① 谁付钱</b><span>市场</span></span></button>
      <button class="opt" data-h="b"><span class="k">B</span><span><b>④ 能不能做出来</b><span>工程</span></span></button>
      <button class="opt" data-h="c"><span class="k">C</span><span><b>⑤ 做出来谁维护</b><span>售后</span></span></button>
    </div>
    <p class="a30-note">先凭直觉选。揭晓不给答案，给一个能算的数字。</p>
  </div>
</div>
<div id="a30HookOut" style="margin-top:12px"></div>`,
init(sec,api){
  const S=api.S,x=S.answers.a30=S.answers.a30||{},out=sec.querySelector('#a30HookOut');
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',x.hook===b.dataset.h));
    if(!x.hook){out.innerHTML='';return;}
    const ok=x.hook==='b';
    const nums='<p><b>算一遍：</b>A4 约 0.06 m²；阴天辐照约 100 W/m²（晴天的十分之一）；组件效率 20%，到手 1–2 W。10,000 mAh 约 37 Wh，理想 19 小时，实际 30 小时以上。晴天 10 W 上下，也要 4 小时。</p>';
    let why;
    if(ok) why='<p>对。前四问里只有④过不去：付钱的人有（露营徒步，一年在电上花几百块），现在怎么解决也有（带两块充电宝），维护更不是问题（没有活动件）。</p>';
    else if(x.hook==='a') why='<p><b>不是①。</b>付钱的人具体：露营、徒步的人，一年在充电宝和营地电源上花几百块。这一问过得去。</p>';
    else why='<p><b>不是⑤。</b>它没有活动件，坏了整块换，成本 80 元。第五问也过得去。</p>';
    out.innerHTML='<div class="a30-rev '+(ok?'ok':'warn')+'">'+
      '<div class="a30-rev-h"><span>'+(ok?'你看见了':'再看一眼')+'</span><span>挂：④ 能不能做出来</span></div>'+
      why+nums+
      '<p>图里那块板能成，是因为条件全对：沙滩、夏天、一次只补一点、广告物料不用维护。<b>同一块板缝进背包，条件就变了。</b></p>'+
      '<p class="small">五问不评分，只找“哪一问过不去”。找到那一问，你才知道下一步的时间该花在哪。</p>'+
      '</div>';
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{x.hook=b.dataset.h;api.save();paint();api.refresh();});
  sec.querySelectorAll('[data-zoom]').forEach(b=>b.onclick=e=>{
    e.stopPropagation();
    api.modal('<button class="modal-x">×</button><h3>NIVEA SUN · Solar Ad Charger</h3>'+
      '<img src="'+IMG.solarad+'" style="width:100%;border-radius:8px;margin:8px 0 12px" alt="太阳能广告充电器">'+
      '<p>广告页上印一块太阳能板，读者在沙滩上把它摊开、插线，就能给手机充一点电。</p>'+
      '<p class="small">它在沙滩上能用，是因为阳光、面积、时长三个条件同时成立。做产品时，这三个条件不会自己到齐。</p>'+
      '<p class="small">图：SIT 官方课程材料（已授权）　TU 库 p.94</p>');
  });
  paint();
},
hint(S){return (S.answers.a30&&S.answers.a30.hook)?'':'先选一个：哪一问最先过不去';},
gate(S){return !!(S.answers.a30&&S.answers.a30.hook);}},

/* ================= 2 概念 ================= */
{id:'concept',name:'概念',short:'五问',kicker:'STEP 2 · 概念',
html:`
<div class="step-h"><h1>五问，<em>每一问都有判据</em></h1>
<p>五问不是问卷，是五个否决点。任何一问过不去，这个概念先停下；五问都过，才轮到谈怎么把它做大。</p></div>
<div class="a30-def">
  <div class="a30-defk">SIT · 概念可行性</div>
  <p>一个概念能不能往下走，看五件事：谁付钱、他才有多少、现在怎么解决、能不能做出来、做出来谁维护。</p>
  <span class="a30-defs">前两问关于市场，第三问关于替代，第四问关于工程，第五问关于时间。</span>
</div>
<div class="a30-five">
  ${QS.map(q=>`<div class="a30-f"><span class="a30-fn">${q.n}</span><b>${q.t}</b><div class="a30-fx"><em>${q.d}</em><s>${q.miss}</s></div></div>`).join('')}
</div>
<div class="grid2 a30-c2">
  <div class="panel"><div class="panel-h"><h4>什么时候别用这五问</h4><span>三种情况</span></div>
    <div class="stack">
      <div><div class="mono" style="font-size:9.5px;color:var(--acc)">你要的是“做什么”</div><p class="small" style="margin-top:3px">五问只淘汰，不生成。生成用 A08 七步和五个工具。</p></div>
      <div><div class="mono" style="font-size:9.5px;color:var(--acc)">概念还没成形</div><p class="small" style="margin-top:3px">说不清“给谁、做什么”，五问只会得到五个“待定”。</p></div>
      <div><div class="mono" style="font-size:9.5px;color:var(--acc)">已经决定要做</div><p class="small" style="margin-top:3px">那时该问的是资源与排期，不是可行性。</p></div>
    </div></div>
  <div class="panel"><div class="panel-h"><h4>哪一问最容易被跳过</h4><span>二选一</span></div>
    <div class="opts">
      <button class="opt" data-c="a"><span class="k">A</span><span><b>① 谁付钱</b><span>最难回答，所以最先被跳过</span></span></button>
      <button class="opt" data-c="b"><span class="k">B</span><span><b>⑤ 谁维护</b><span>做出来之前，这个问题还不存在</span></span></button>
    </div>
    <div id="a30C2" style="margin-top:10px"></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,x=S.answers.a30=S.answers.a30||{},out=sec.querySelector('#a30C2');
  function paint(){
    sec.querySelectorAll('[data-c]').forEach(b=>b.classList.toggle('on',x.c2===b.dataset.c));
    if(!x.c2){out.innerHTML='';return;}
    const ok=x.c2==='b';
    out.innerHTML='<div class="a30-rev '+(ok?'ok':'warn')+'" style="padding:9px 11px">'+
      '<p style="margin:0">'+(ok
        ? '对。<b>① 难，但会被追问；⑤ 不是难，是还看不见</b>——装到现场之前，没人问“坏的那天谁到场”。手环、投影，都挂在⑤。'
        : '答案是 B。<b>① 难，但它像商业问题，一定会被追问；⑤ 不是难，是还看不见</b>——装到现场之前，没人问“坏的那天谁到场”。')+
      '</p></div>';
  }
  sec.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{x.c2=b.dataset.c;api.save();paint();api.refresh();});
  paint();
},
hint(S){return (S.answers.a30&&S.answers.a30.c2)?'':'选一个你的判断';},
gate(S){return !!(S.answers.a30&&S.answers.a30.c2);}},

/* ================= 3 五问体检台 ================= */
{id:'screen',name:'体检台',short:'体检台',kicker:'STEP 3 · 五问体检台',
html:`
<div class="step-h"><h1>六个概念，<em>各让它们挂一次</em></h1>
<p>每个概念答五问，每问选一条最接近你判断的。<br>五问答完给总判定：<b>卡住 / 需验证 / 通过</b>；走完 4 个解锁“我的概念”。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>选一个概念</span>
  <span class="op"><span class="op-n">2</span>五问逐条点</span>
  <span class="op"><span class="op-n">3</span>看总判定</span>
  <span class="op"><span class="op-n">4</span>写你自己的</span>
</div>
<div class="bench a30-bench">
  <div class="bench-h"><b>SCREENING · 五问体检台</b><span class="st" id="a30St">0 / 6</span></div>
  <div class="bench-b">
    <div class="a30-wrap">
      <div class="a30-list" id="a30List"></div>
      <div class="a30-detail" id="a30Detail"></div>
    </div>
  </div>
  <div class="bench-f a30-bf"><span class="small" id="a30Foot">至少 4 个概念走完五问，才解锁下面的“我的概念”。</span>
    <div style="flex:1"></div>
    <button class="btn sm ghost" id="a30Prev">上一问</button>
    <button class="btn sm" id="a30Next">下一问</button>
    <button class="btn sm ghost" id="a30Sum" style="display:none">看总判定</button>
    <button class="btn sm ghost" id="a30Reset">重来</button></div>
</div>
<div class="panel a30-mine locked" id="a30Mine">
  <div class="panel-h"><h4>我的概念 · 五问各写一句</h4><span id="a30MineSt">锁定 · 还差 4 个概念</span></div>
  <div class="a30-mgrid">
    <div class="field"><label>概念名</label><input id="a30Name" maxlength="30" placeholder="一句话：给谁做什么"></div>
    <div class="field"><label>① 谁付钱</label><input id="a30MWho" maxlength="40" placeholder="一个岗位或一类人"></div>
    <div class="field"><label>② 他才有多少</label><input id="a30MHow" maxlength="40" placeholder="一年花多少钱或时间"></div>
    <div class="field"><label>③ 现在怎么解决</label><input id="a30MNow" maxlength="40" placeholder="今天用什么，差在哪一步"></div>
    <div class="field"><label>④ 能不能做出来</label><input id="a30MMake" maxlength="40" placeholder="用现成材料做样机"></div>
    <div class="field"><label>⑤ 谁维护</label><input id="a30MKeep" maxlength="40" placeholder="坏了谁到场、谁付钱"></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,x=S.answers.a30=S.answers.a30||{};
  x.pick=x.pick||{};x.mine=x.mine||{};
  const list=sec.querySelector('#a30List'),det=sec.querySelector('#a30Detail'),
        st=sec.querySelector('#a30St'),foot=sec.querySelector('#a30Foot'),
        mine=sec.querySelector('#a30Mine'),mineSt=sec.querySelector('#a30MineSt');
  let sel=x.sel||CON[0].id,qi=(x.qi===undefined?0:x.qi),unlocked=x.unlocked||false;
  if(!CON.some(c=>c.id===sel))sel=CON[0].id;

  /* --- 概念列表 --- */
  function paintList(){
    list.innerHTML=CON.map(C=>{
      const p=x.pick[C.id]||{},v=stateOf(C,p);
      const dots=QS.map(q=>{
        const i=p[q.k],lv=(i===undefined||!C.a[q.k][i])?null:C.a[q.k][i][1];
        return '<i class="'+(lv===null?'':lv===0?'no':lv===1?'chk':'ok')+'"></i>';
      }).join('');
      const left=QS.filter(q=>p[q.k]===undefined).length;
      return '<button class="a30-case'+(sel===C.id?' on':'')+(v!==null?' done':'')+'" data-c="'+C.id+'">'+
        '<span class="a30-cn"><b>'+C.n+'</b><em>'+C.tag+'</em></span>'+
        '<span class="a30-dots">'+dots+'</span>'+
        '<span class="a30-cv '+(v===null?'':['no','chk','ok'][v])+'">'+(v===null?left+' 问待答':VN[v])+'</span>'+
        '</button>';
    }).join('');
    list.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{
      sel=b.dataset.c;x.sel=sel;
      const p=x.pick[sel]||{},i=QS.findIndex(q=>p[q.k]===undefined);
      qi=i<0?0:i;x.qi=qi;api.save();paint();
    });
  }

  /* --- 当前概念的五问 --- */
  function paintDetail(){
    const C=CON.find(c=>c.id===sel),p=x.pick[C.id]=x.pick[C.id]||{};
    if(qi>4)qi=4;
    const q=QS[qi],idx=p[q.k],v=stateOf(C,p);
    const answered=QS.filter(qq=>p[qq.k]!==undefined).length;
    const chips=QS.map((qq,i)=>{
      const ii=p[qq.k],lv=(ii===undefined||!C.a[qq.k][ii])?null:C.a[qq.k][ii][1];
      return '<button class="a30-qc'+(i===qi?' on':'')+(lv===null?'':' '+['no','chk','ok'][lv])+'" data-q="'+i+'">'+
        '<s>'+qq.n+'</s>'+qq.t+'</button>';
    }).join('');
    const showQ=(v===null)||!!x.openQ;
    let h='<div class="a30-dh"><div><b>'+C.n+'</b><em>'+C.tag+'</em></div><span class="a30-pg">'+answered+' / 5</span></div>';
    h+='<p class="a30-sc">'+C.sc+'</p>';
    h+='<div class="a30-qs">'+chips+'</div>';
    if(showQ){
      h+='<div class="a30-qbox"><div class="a30-qt"><s>'+q.n+'</s>'+q.t+'</div><p class="a30-qr">判据：'+q.d+'</p>';
      h+='<div class="a30-opts">'+C.a[q.k].map((o,i)=>
        '<button class="a30-opt'+(idx===i?' on '+['no','chk','ok'][o[1]]:'')+'" data-o="'+i+'">'+
        '<i>'+['A','B','C'][i]+'</i><span>'+o[0]+'</span></button>').join('')+'</div>';
      if(idx!==undefined){
        const o=C.a[q.k][idx];
        h+='<div class="a30-fb '+['no','chk','ok'][o[1]]+'"><b>'+LVN[o[1]]+'</b>'+o[2]+'</div>';
      }else{
        h+='<div class="a30-fb empty">三句里只有一句站得住。选最接近你判断的那一条。</div>';
      }
    }
    if(v!==null&&!showQ){
      const bad=QS.filter(qq=>C.a[qq.k][p[qq.k]][1]===0);
      const chk=QS.filter(qq=>C.a[qq.k][p[qq.k]][1]===1);
      let sum;
      if(bad.length)sum='卡在 '+bad.map(qq=>qq.n+' '+qq.t).join('、')+'。';
      else if(chk.length)sum='没有一问过不去，但有 '+chk.length+' 问要验证：'+chk.map(qq=>qq.n+' '+qq.t).join('、')+'。';
      else sum='五问都过。可以往下走，先找 3 个人试。';
      h+='<div class="a30-verd '+['no','chk','ok'][v]+'"><div class="a30-vh"><span>总判定</span><b>'+VN[v]+'</b></div>'+
         '<p>'+sum+'</p>'+
         '<p class="a30-ref"><s>参考卡点</s>'+C.ref+'</p>';
      if(v!==C.rv)h+='<p class="a30-diff">你的判定和参考不一致：参考是“'+VN[C.rv]+'”。回看'+(QS.find(qq=>qq.k===C.rk)||{}).n+'，你选的那一条算不算数。</p>';
      h+='</div>';
      h+='<p class="small" style="margin-top:6px">想改哪一问，点上面的问题标签。</p>';
    }
    det.innerHTML=h;
    det.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{
      qi=+b.dataset.q;x.qi=qi;x.openQ=(v!==null);api.save();paintDetail();
    });
    det.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{
      p[q.k]=+b.dataset.o;
      if(QS.every(qq=>p[qq.k]!==undefined))x.openQ=false;
      x.qi=qi;api.save();paint();
    });
    prevB.disabled=qi===0;
    nextB.disabled=(idx===undefined||qi>=4);
    sumB.style.display=(v!==null&&showQ)?'':'none';
  }

  /* --- 我的概念 --- */
  const MF=[['name','#a30Name'],['who','#a30MWho'],['how','#a30MHow'],['now','#a30MNow'],['make','#a30MMake'],['keep','#a30MKeep']];
  function paintMine(){
    const done=doneN(S),ok=done>=4;
    mine.classList.toggle('locked',!ok);
    MF.forEach(([k,s])=>{const el=sec.querySelector(s);el.value=x.mine[k]||'';el.disabled=!ok;});
    mineSt.textContent=ok?'已解锁 · 每问 ≥8 字':'锁定 · 还差 '+(4-done)+' 个概念';
    if(ok&&!unlocked){unlocked=true;x.unlocked=true;api.save();api.toast('已解锁：写你自己的概念');}
  }
  MF.forEach(([k,s])=>{
    const el=sec.querySelector(s);
    el.addEventListener('input',()=>{x.mine[k]=el.value;api.save();api.refresh();});
  });

  function paintStat(){
    const t=tally(S),done=t[0]+t[1]+t[2];
    st.textContent=done+' / 6 · 卡住 '+t[0]+' · 需验证 '+t[1]+' · 通过 '+t[2];
    foot.textContent=done>=4
      ? '体检记录：'+done+' 个概念走完，卡住 '+t[0]+'、需验证 '+t[1]+'、通过 '+t[2]+'。'
      : '至少 4 个概念走完五问，才解锁下面的“我的概念”。还差 '+(4-done)+' 个。';
  }

  function paint(){paintList();paintDetail();paintMine();paintStat();api.refresh();}

  const prevB=sec.querySelector('#a30Prev'),nextB=sec.querySelector('#a30Next'),sumB=sec.querySelector('#a30Sum');
  prevB.onclick=()=>{qi=Math.max(0,qi-1);x.qi=qi;api.save();paintDetail();};
  nextB.onclick=()=>{qi=Math.min(4,qi+1);x.qi=qi;api.save();paintDetail();};
  sumB.onclick=()=>{x.openQ=false;api.save();paintDetail();};
  sec.querySelector('#a30Reset').onclick=()=>{
    CON.forEach(C=>{delete x.pick[C.id];});
    x.qi=0;qi=0;x.openQ=false;x.unlocked=false;unlocked=false;
    api.save();paint();api.toast('体检记录已清空');
  };
  sec.__paint=paint;
  paint();
},
onEnter(api){const s=document.querySelector('.step.on');if(s&&s.__paint&&s.dataset.s==='2')s.__paint();},
hint(S){
  const d=doneN(S);
  if(d<4)return '体检台还差 '+(4-d)+' 个概念（已走完 '+d+' 个）';
  const m=X(S).mine||{};
  const miss=QS.filter(q=>(m[q.k]||'').trim().length<8);
  if(miss.length)return '“我的概念”还有 '+miss.length+' 问没写够（各 ≥8 字）';
  return '';
},
gate(S){
  if(doneN(S)<4)return false;
  const m=X(S).mine||{};
  return QS.every(q=>(m[q.k]||'').trim().length>=8);
}},

/* ================= 4 在你的事上 ================= */
{id:'mine',name:'在你的事上',short:'在你的事',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>把你自己的概念，<em>逼到最卡的那一问</em></h1>
<p>五问里挑一问：你最不想回答、又最可能出问题的那一个。然后写清楚怎么验证它——不是“多想想”，是一个能做完的动作。</p></div>
<div class="grid2" style="align-items:start">
  <div class="panel"><div class="panel-h"><h4>① 最卡的一问</h4><span>选一个</span></div>
    <div class="a30-weak" id="a30Weak"></div>
    <div class="a30-guide" id="a30Guide"></div>
  </div>
  <div class="panel"><div class="panel-h"><h4>② 怎么验证它</h4><span id="a30VerCnt">0 / 15</span></div>
    <div class="field"><label>一个动作、一个对象、一个判断标准</label>
      <textarea id="a30Verify" maxlength="120" placeholder="例如：找 3 个上个月露过营的人，各问 20 分钟，问他们上一次为电花钱是什么时候、花了多少。三个人里有两个说不出数字，就算不过。"></textarea></div>
    <div class="a30-eg">
      <div><s>不行</s>再调研一下，多问问身边的人。</div>
      <div><s>可行</s>找 3 个人，各问 20 分钟，问上一次为这件事花钱的时间和金额。</div>
    </div>
    <p class="a30-note" style="margin-top:8px">验证要能被否掉：写出“看到什么就算不过”。</p>
  </div>
</div>`,
init(sec,api){
  const S=api.S,x=S.answers.a30=S.answers.a30||{};
  x.mine=x.mine||{};
  const weak=sec.querySelector('#a30Weak'),guide=sec.querySelector('#a30Guide'),
        ta=sec.querySelector('#a30Verify'),cnt=sec.querySelector('#a30VerCnt');
  const G={
   who:'问人：找 3 个候选人，问“上一次为这件事花钱是什么时候、多少”。说不出数字就是不过。',
   how:'问人加算账：把他的年支出写成一个区间，再问“这个数你认不认”。',
   now:'看现场：跟着他走一遍现在的做法，记下卡在第几步、花几分钟。',
   make:'做手工版：用现成材料拼一个，让它连续跑 8 小时，看在哪一步断。',
   keep:'找一次真实故障：问一个已经用过同类东西的人，“上次坏是谁修的、花了多久”。'
  };
  function paint(){
    weak.innerHTML=QS.map(q=>{
      const v=(x.mine[q.k]||'').trim();
      return '<button class="a30-wk'+(x.weak===q.k?' on':'')+'" data-w="'+q.k+'">'+
        '<s>'+q.n+'</s><span><b>'+q.t+'</b><em>'+(v?api.esc(v.slice(0,26))+(v.length>26?'…':''):'还没写')+'</em></span></button>';
    }).join('');
    weak.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{x.weak=b.dataset.w;api.save();paint();api.refresh();});
    const cur=x.weak;
    if(cur){
      const q=QS.find(qq=>qq.k===cur);
      guide.innerHTML='<div class="a30-gh">这一问怎么验证</div>'+
        '<div class="a30-g on"><b>'+q.n+' '+q.t+'</b><p>'+G[cur]+'</p></div>';
    }else{
      guide.innerHTML='<div class="a30-gh">三类问题，三种验证</div>'+
        '<div class="a30-g"><b>市场 · ①②③</b><p>问人：上一次为这件事花钱是什么时候、多少。</p></div>'+
        '<div class="a30-g"><b>工程 · ④</b><p>做手工版，让它连续跑 8 小时，看在哪一步断。</p></div>'+
        '<div class="a30-g"><b>维护 · ⑤</b><p>找一个已经坏掉的同类，问上次是谁修的、花了多久。</p></div>';
    }
    ta.value=x.verify||'';
    cnt.textContent=(x.verify||'').trim().length+' / 15';
  }
  ta.addEventListener('input',()=>{x.verify=ta.value;cnt.textContent=ta.value.trim().length+' / 15';api.save();api.refresh();});
  sec.__paint=paint;
  paint();
},
onEnter(api){const s=document.querySelector('.step.on');if(s&&s.__paint&&s.dataset.s==='3')s.__paint();},
hint(S){
  const x=X(S);
  if(!x.weak)return '先挑最卡的一问';
  const n=(x.verify||'').trim().length;
  if(n<15)return '验证方法还差 '+(15-n)+' 字';
  return '';
},
gate(S){const x=X(S);return !!(x.weak&&(x.verify||'').trim().length>=15);}},

/* ================= 5 过滤与提交 ================= */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 过滤与提交',
html:`
<div class="step-h"><h1>最后一个判断：<em>会不会致命</em>，以及<em>花多少钱去确认</em></h1>
<p>同一个问题，验证成本可以从 0 元到 5 万。选贵的不会更准，只会更晚知道。</p></div>
<div class="grid2" style="align-items:start">
  <div class="stack a30-two">
    <div class="panel"><div class="panel-h"><h4>① 最卡的一问，会不会致命</h4><span id="a30Wk">—</span></div>
      <div class="opts">
        <button class="opt" data-f="a"><span class="k">A</span><span><b>会——它不过，这个概念就不成立</b><span>否决点</span></span></button>
        <button class="opt" data-f="b"><span class="k">B</span><span><b>不会——它只是拖慢，换个做法还能走</b><span>减速带</span></span></button>
        <button class="opt" data-f="c"><span class="k">C</span><span><b>还不知道——要验证完才敢说</b><span>待定</span></span></button>
      </div></div>
    <div class="panel"><div class="panel-h"><h4>② 最小验证成本</h4><span>选一档</span></div>
      <div class="opts">
        <button class="opt" data-k="a"><span class="k">A</span><span><b>半天 · 0 元</b><span>找 3 个目标用户，各聊 20 分钟</span></span></button>
        <button class="opt" data-k="b"><span class="k">B</span><span><b>两周 · 2 千元</b><span>做一个手工版，让 1 个人用 5 天</span></span></button>
        <button class="opt" data-k="c"><span class="k">C</span><span><b>两个月 · 5 万元</b><span>做工程样机，过一轮测试</span></span></button>
      </div></div>
  </div>
  <div><div class="a30-card" id="cardSlot"></div>
    <div class="panel" style="margin-top:10px"><div class="panel-h"><h4>提交</h4><span id="subSt">未提交</span></div>
      <p class="small">提交后先跑一次 AI 评审（有用 / 可行 / 证据），再进入班级互评。</p>
      <div class="row" style="margin-top:10px"><button class="btn primary" id="subBtn">提交</button>
      <button class="btn" id="export2">导出 PNG</button></div></div>
    <div class="a30-match" id="a30Match" style="margin-top:10px">两个都选完，这里给一句判断。</div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,x=S.answers.a30=S.answers.a30||{};
  const slot=sec.querySelector('#cardSlot'),btn=sec.querySelector('#subBtn'),subSt=sec.querySelector('#subSt'),
        match=sec.querySelector('#a30Match'),wk=sec.querySelector('#a30Wk');
  function paint(){
    sec.querySelectorAll('[data-f]').forEach(b=>b.classList.toggle('on',x.fatal===b.dataset.f));
    sec.querySelectorAll('[data-k]').forEach(b=>b.classList.toggle('on',x.cost===b.dataset.k));
    const q=QS.find(qq=>qq.k===x.weak);
    wk.textContent=q?(q.n+' '+q.t):'未选';
    match.innerHTML=matchText(x)||'两个都选完，这里给一句判断。';
    const c=L.card(S);
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A30</span><span>可行性卡</span></div>'+
      '<h5>'+(x.mine&&x.mine.name?api.esc(x.mine.name):'我的概念')+'</h5><div class="kv">'+
      c.rows.map(r=>'<div><b>'+r[0]+'</b><span class="'+(r[1]&&r[1]!=='—'?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+
      '</div></div>';
    const ready=!!(x.fatal&&x.cost);
    subSt.textContent=S.submitted?'已提交':'未提交';
    btn.textContent=S.submitted?'已提交':(ready?'提交':'两个判断都选一下');
    btn.disabled=!!S.submitted||!ready;
  }
  sec.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{x.fatal=b.dataset.f;api.save();paint();api.refresh();});
  sec.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{x.cost=b.dataset.k;api.save();paint();api.refresh();});
  btn.onclick=async()=>{await api.submit();paint();};
  sec.querySelector('#export2').onclick=()=>api.exportCard();
  sec.__paint=paint;
  paint();
},
onEnter(api){const s=document.querySelector('.step.on');if(s&&s.__paint&&s.dataset.s==='4')s.__paint();},
hint(S){const x=X(S);if(!x.fatal)return '先判断：会不会致命';if(!x.cost)return '再选一档验证成本';return '';},
gate(S){const x=X(S);return !!(x.fatal&&x.cost);}},

/* ================= 6 收束 ================= */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>五问只做一件事：<em>让你早一点知道</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 只淘汰，不生成</div><p class="small" style="margin-top:5px">五问能告诉你“这个不行”，不会告诉你“做什么行”。生成是另一套工具。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 挂得最晚的是⑤</div><p class="small" style="margin-top:5px">六张卡按最严的答法：四张挂、一张待验证、一张能走。挂的里面三张挂在后三问。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 验证要便宜</div><p class="small" style="margin-top:5px">验证成本必须小于做错的代价。半天问三个人，比两个月做样机先知道。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A31 / A32</span></div>
<p class="small">A31 · AVM 上：从属性到价值。熬过五问的概念，摊开成一张属性 → 价值的地图，用 Volvo 和 BIC 两把尺子量。<br>
A32 · AVM 下：找机会点。同一张地图上，看哪一格还没人站。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '你的概念里，哪一问是你最想绕过去的？',
 '付钱的人和用的人，是同一个人吗？',
 '如果⑤没人维护，你还愿意做吗？',
 '能不能用半天、0 元，先把最卡的那一问验掉？',
 '这个概念如果明年挂掉，最可能挂在哪一问？'
]},

card(S){
  const x=X(S),t=tally(S),done=t[0]+t[1]+t[2];
  const q=QS.find(qq=>qq.k===x.weak);
  return {title:'A30 · 可行性卡',rows:[
    ['我的概念',(x.mine&&x.mine.name)||'未命名'],
    ['最卡一问',q?(q.n+' '+q.t+'：'+(x.mine[q.k]||'—')):'—'],
    ['怎么验证',x.verify||'—'],
    ['会不会致命',FATAL[x.fatal]||'—'],
    ['验证成本',COST[x.cost]||'—'],
    ['体检记录',done+' / 6 概念 · 卡住 '+t[0]+' · 需验证 '+t[1]+' · 通过 '+t[2]]
  ]};
},

notes:[
 {t:'本节目标',h:'让学员拿到一个能反复用的否决工具：五问逐条有判据，任何一问过不去就先停，不再靠“我觉得行”。'},
 {t:'时间分配',h:'先猜 5′ · 五问 7′ · 体检台 18′（至少 4 个概念）· 在你的事 9′ · 两问与提交 6′。'},
 {t:'常见卡点',h:'学员会用“我觉得能”回答④。追问三个数：面积、功率、小时。也会把“所有人都需要”当①——请他指一个今年有预算科目的人。'},
 {t:'直播怎么接',h:'先看体检台的判定分布，再看学员“最卡的一问”集中在哪一问。三个以上都选⑤的，现场追问“坏的那天谁到场、谁付钱”，比讲十遍定义有用。'},
 {t:'和 A31 的关系',h:'五问只淘汰。活下来的概念进 A31，用 AVM 把属性摊到价值；A32 在同一张图上找没人占的那一格。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A30']=L;
})();
