/* A35 · 商业模式：变量重设 */
(function(){
'use strict';

const IMG={gym:'assets-cases-a35-gym.jpg'};

/* ---------- 六个可重设变量 ---------- */
const VARS=[
 {k:'unit',n:'计费单位',q:'按什么算钱',o:'按次 / 按月 / 按结果',ex:'月卡取消，改成每次到店 39 元'},
 {k:'payer',n:'付费者',q:'谁签字掏钱',o:'用户付 / 企业付 / 保险付',ex:'同一门课，公司按人头买，个人不掏钱'},
 {k:'timing',n:'时间点',q:'什么时候付',o:'先付 / 后付 / 按效果付',ex:'净水器装完、验收合格再结账'},
 {k:'bundle',n:'打包方式',q:'怎么组合着卖',o:'单卖 / 订阅 / 捆绑',ex:'机器单卖，滤芯做成年度订阅'},
 {k:'risk',n:'风险承担',q:'谁承担损失',o:'退卡 / 空置 / 退货归谁',ex:'不来可退，空置风险从会员转回场馆'},
 {k:'own',n:'所有权',q:'东西归谁',o:'买 / 租 / 共享',ex:'器械按年租，折旧不压在账上'}
];
const NAMES={};VARS.forEach(v=>{NAMES[v.k]=v.n;});
const MIN_RESET=4,MIN_BIZ=4,MIN_VAL=2,MIN_NOBUY=12,MIN_CASH=12,MIN_OPP=8;

/* ---------- 三个生意 × 六个变量 ---------- */
const BIZ={
 gym:{n:'健身房',tag:'年卡 3999 · 月卡 399',vars:{
  unit:{now:'month',opts:[
   {k:'month',l:'按月',c:'每月固定 399 元，来不来都收',w:0},
   {k:'visit',l:'按次',c:'每次到店 39 元，只算进门',w:2,r:'收入从月初挪到每次到店，空置风险转回场馆'},
   {k:'result',l:'按结果',c:'每月 199 元，体测达标再补 200',w:3,r:'效果写进合同，退费争议和体测口径一起找上门'}
  ]},
  payer:{now:'self',opts:[
   {k:'self',l:'会员付',c:'钱由会员自己掏',w:0},
   {k:'corp',l:'企业付',c:'账单由企业按月统一结算',w:3,r:'签字的人从个人变成 HR，续费周期变成一年一签'},
   {k:'insure',l:'保险付',c:'费用从健康险的运动额度里走',w:3,r:'要先过核保和结算，慢，但量大'}
  ]},
  timing:{now:'pre',opts:[
   {k:'pre',l:'预付',c:'月初先把钱收进来',w:0},
   {k:'post',l:'练完付',c:'每次练完离场时结账',w:2,r:'现金少一个月，垫资的是你'},
   {k:'eff',l:'达标付',c:'季度体测达标后，企业才付尾款',w:3,r:'回款晚一个季度，现金流压力最大'}
  ]},
  bundle:{now:'annual',opts:[
   {k:'annual',l:'年卡',c:'一次卖 12 个月，年卡打包',w:0},
   {k:'sub',l:'月订阅',c:'月付可停，随时能走',w:1,r:'续费变成每月一次的小决定，流失更早看得见'},
   {k:'pack',l:'次数包',c:'10 次一包，三个月内用完',w:2,r:'「还剩几次」会替代「来不来」，过期条款容易挨骂'}
  ]},
  risk:{now:'member',opts:[
   {k:'member',l:'会员担',c:'不来也照收，空置风险在会员',w:0},
   {k:'gym',l:'场馆担',c:'不来可退可转，空置风险回到场馆',w:2,r:'你要把上座率算进定价，卖得多不一定赚'},
   {k:'both',l:'共担',c:'前 3 次不满意全退，之后不退',w:1,r:'用 3 次做试用期，退款率变成核心指标'}
  ]},
  own:{now:'buy',opts:[
   {k:'buy',l:'买断',c:'器械自己买，折旧压在账上',w:0},
   {k:'rent',l:'租器械',c:'器械按年租，不压折旧',w:2,r:'资产变轻，但每月固定支出变硬'},
   {k:'share',l:'共享场地',c:'场地与写字楼共用，按小时换',w:2,r:'开店成本降了，营业时间不再由你定'}
  ]}
 }},
 train:{n:'企业培训',tag:'3 天课 12 万 / 30 人',vars:{
  unit:{now:'head',opts:[
   {k:'head',l:'按人头',c:'30 人 12 万，一人 4000',w:0},
   {k:'day',l:'按天',c:'一天 4 万，来几个人都行',w:1,r:'客户会自己控人数，你要控的是课堂质量'},
   {k:'result',l:'按项目',c:'落地 3 个项目，再付 8 万',w:3,r:'收入绑在客户的项目上，你说了不算'}
  ]},
  payer:{now:'hr',opts:[
   {k:'hr',l:'HR 付',c:'培训预算从 HR 走',w:0},
   {k:'biz',l:'业务付',c:'钱从业务部门的预算里出',w:2,r:'签字人换成业务负责人，他要业绩不要学时'},
   {k:'self',l:'学员付',c:'公司补一半，个人出一半',w:3,r:'报名率会掉，到课率会涨'}
  ]},
  timing:{now:'pre',opts:[
   {k:'pre',l:'开课前',c:'开课前一周全款',w:0},
   {k:'post',l:'结课后',c:'课上完再结算',w:1,r:'回款晚 30 天，坏账风险归你'},
   {k:'eff',l:'分期',c:'先付三成，项目落地付尾款',w:3,r:'你得分清哪些结果真是这门课带来的'}
  ]},
  bundle:{now:'course',opts:[
   {k:'course',l:'单卖课',c:'一门课一个报价，单卖',w:0},
   {k:'sub',l:'年订阅',c:'一年四次课，打包成一个价',w:2,r:'从卖一次变成卖一年，续约率成了命门'},
   {k:'consult',l:'课+咨询',c:'课上完接 6 周辅导',w:2,r:'交付变重，讲师要变成顾问'}
  ]},
  risk:{now:'client',opts:[
   {k:'client',l:'企业担',c:'课上完不满意也照付',w:0},
   {k:'us',l:'讲师担',c:'不满意不收钱',w:2,r:'一句话把交付风险全揽过来，先算清退款率'},
   {k:'both',l:'共担',c:'先付三成，剩下看满意度',w:1,r:'满意度怎么测，得在开课前写进合同'}
  ]},
  own:{now:'buyout',opts:[
   {k:'buyout',l:'买断',c:'课程归客户，内部随便用',w:0},
   {k:'license',l:'授权',c:'按年授权，讲师认证另收',w:2,r:'从卖内容变成卖授权，法务要跟上'},
   {k:'co',l:'共建',c:'一起开发，版权共有',w:3,r:'客户成了半个作者，你不能再卖给别人'}
  ]}
 }},
 water:{n:'家用净水器',tag:'整机 2999 · 每年换芯 400',vars:{
  unit:{now:'unit',opts:[
   {k:'unit',l:'按台',c:'一台 2999，装完即止',w:0},
   {k:'liter',l:'按升',c:'0.3 元一升，用多少算多少',w:3,r:'要装流量计，还要让用户相信表是准的'},
   {k:'month',l:'按月',c:'99 元一月，滤芯包含在内',w:2,r:'从卖硬件变成卖服务，收入摊到 24 个月'}
  ]},
  payer:{now:'family',opts:[
   {k:'family',l:'家庭付',c:'用户自己下单付钱',w:0},
   {k:'property',l:'物业付',c:'物业统一采购，含在物业费里',w:2,r:'一签一个小区，回款慢但量大'},
   {k:'insure',l:'保险付',c:'家财险附赠，费用从保单走',w:3,r:'按保险公司的条款交付，改一次要谈半年'}
  ]},
  timing:{now:'once',opts:[
   {k:'once',l:'一次付',c:'装之前付全款',w:0},
   {k:'after',l:'装完付',c:'验收合格再结账',w:1,r:'装完不给钱的概率，要算进价格'},
   {k:'meter',l:'月结',c:'按上月用水量月结',w:3,r:'每月对账，现金流变成细水长流'}
  ]},
  bundle:{now:'machine',opts:[
   {k:'machine',l:'单卖机',c:'机器是机器，滤芯另买',w:0},
   {k:'sub',l:'滤芯订阅',c:'滤芯按年寄，到期自动换',w:2,r:'复购被锁住，用户会盯着「自动续费」'},
   {k:'ins',l:'机器+保险',c:'水质不达标，赔一年滤芯',w:2,r:'你敢保，是因为你知道自己的水质'}
  ]},
  risk:{now:'user',opts:[
   {k:'user',l:'用户担',c:'不达标，用户自己换芯',w:0},
   {k:'us',l:'厂家担',c:'不达标免费换芯，直到合格',w:2,r:'把水质写进承诺，检测口径就是命门'},
   {k:'both',l:'共担',c:'首年不达标退一半',w:1,r:'退一半比全退好执行，也更难解释'}
  ]},
  own:{now:'buy',opts:[
   {k:'buy',l:'买断',c:'机器归用户，坏了算他的',w:0},
   {k:'rent',l:'租赁',c:'押金 300，月租 39，机器归厂家',w:2,r:'机器回到你账上，要开始算残值'},
   {k:'share',l:'小区共用',c:'一栋楼共用一台，按户计费',w:3,r:'从卖家庭变成卖物业，安装与维护都要重排'}
  ]}
 }}
};
const BIZ_KEYS=Object.keys(BIZ);

/* ---------- 读写 ---------- */
function view(S){
  const a=(S&&S.answers&&S.answers.a35)||{};
  const str=v=>typeof v==='string'?v:'';
  const obj=v=>(v&&typeof v==='object')?v:{};
  return {
    hook:str(a.hook),pick:str(a.pick),
    biz:BIZ[a.biz]?a.biz:'gym',plan:obj(a.plan),
    mineBiz:str(a.mineBiz),mineV1:str(a.mineV1),mineN1:str(a.mineN1),
    mineV2:str(a.mineV2),mineN2:str(a.mineN2),noBuy:str(a.noBuy),
    cash:str(a.cash),oppose:str(a.oppose)
  };
}
function ensure(S){
  const ans=S.answers;
  if(!ans.a35||typeof ans.a35!=='object')ans.a35={};
  const x=ans.a35;
  if(!x.plan||typeof x.plan!=='object')x.plan={};
  BIZ_KEYS.forEach(k=>{if(!x.plan[k]||typeof x.plan[k]!=='object')x.plan[k]={};});
  if(!BIZ[x.biz])x.biz='gym';
  ['hook','pick','mineBiz','mineV1','mineN1','mineV2','mineN2','noBuy','cash','oppose']
    .forEach(k=>{if(typeof x[k]!=='string')x[k]='';});
  return x;
}
function planOf(x,bizKey){
  const p=x.plan&&x.plan[bizKey];
  return (p&&typeof p==='object')?p:{};
}
function optOf(b,k,key){
  const v=b.vars[k];if(!v)return null;
  const kk=key||v.now;
  return v.opts.filter(o=>o.k===kk)[0]||v.opts[0];
}
function resetsOf(bizKey,p){
  const b=BIZ[bizKey]||BIZ.gym;
  return VARS.filter(v=>p[v.k]&&p[v.k]!==b.vars[v.k].now).map(v=>v.k);
}
function sentence(bizKey,p){
  const b=BIZ[bizKey]||BIZ.gym;
  const parts=VARS.map(v=>{const o=optOf(b,v.k,p[v.k]);return o?o.c:'';}).filter(Boolean);
  return b.n+'：'+parts.join('；')+'。';
}
function aggressive(bizKey,p){
  const b=BIZ[bizKey]||BIZ.gym;let best=null;
  VARS.forEach(v=>{
    const key=p[v.k];if(!key||key===b.vars[v.k].now)return;
    const o=optOf(b,v.k,key);if(!o)return;
    if(!best||(o.w||0)>best.w)best={v:v.k,l:o.l,w:o.w||0,r:o.r||''};
  });
  return best;
}

const L={
id:'A35',week:9,seq:35,title:'商业模式：变量重设',
kicker:'WEEK 9 · 商业模式',tool:'ad',toolName:'属性关联',minutes:45,
steps:[
/* ================= 1 先猜 ================= */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>月卡改成按次，<em>改的是哪个变量</em></h1>
<p>同一间健身房、同一批器械、同一群教练。只把「按月收」换成「按次收」，价目表、现金流、谁在补贴谁都跟着变。</p></div>
<div class="grid2 a35-hook">
  <figure class="a35-fig">
    <button class="a35-zoom" data-zoom="gym" title="放大">⤢</button>
    <img src="${IMG.gym}" alt="一间健身房，两个人在器械区做俯卧撑" loading="lazy">
    <figcaption>
      <b>一间普通健身房</b>
      <span>月卡 399 元：一个月来 4 次的人和来 20 次的人，付一样的钱</span>
      <em>图：SIT 官方课程材料（已授权）</em>
    </figcaption>
  </figure>
  <div class="panel">
    <div class="panel-h"><h4>它改的是</h4><span>三选一</span></div>
    <div class="opts">
      <button class="opt" data-h="a"><span class="k">A</span><span><b>价格</b><span>把 399 调到别的数</span></span></button>
      <button class="opt" data-h="b"><span class="k">B</span><span><b>计费单位</b><span>钱按什么单位算</span></span></button>
      <button class="opt" data-h="c"><span class="k">C</span><span><b>服务内容</b><span>多给或少给一点东西</span></span></button>
    </div>
    <div class="hint" style="margin-top:9px">先选一个，再看数字怎么变。</div>
  </div>
</div>
<div id="hookOut"></div>`,
init(sec,api){
  sec.classList.add('a35-step');
  const S=api.S,x=ensure(S),out=sec.querySelector('#hookOut');
  const V={
    a:['warn','改价是把 399 变成 359：计费单位还是「月」，来 4 次和来 20 次的人照样付一样的钱。你动了数字，没动结构。'],
    b:['ok','对。单位从「月」换成「次」，价格只是跟着单位重新长出来：39×4＝156，39×20＝780。单位一变，付费者、时间点、风险承担都会跟着晃。'],
    c:['warn','加私教、加淋浴是加东西，价目表还是按月。客户还是被同一张卡锁着，只是卡上多了两个字。']
  };
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',x.hook===b.dataset.h));
    if(!x.hook){
      out.innerHTML='<div class="panel"><div class="panel-h"><h4>等你选完</h4><span>一个变量</span></div>'+
        '<p class="small">选一个。选完会看到同样一间店，按次收费之后，两类会员各自多付了多少、少付了多少。</p></div>';
      return;
    }
    const v=V[x.hook]||V.b;
    out.innerHTML='<div class="panel a35-reveal">'+
      '<div class="panel-h"><h4>揭晓 · 计费单位</h4><span>不是价格</span></div>'+
      '<p class="a35-lead">月卡 399 元。来 20 次的人，单次 20 元；来 4 次的人，单次 100 元。按月收费的真实机制是：<b>常客在补贴不常来的人</b>。换成每次 39 元，这笔补贴就没了。</p>'+
      '<div class="a35-nums">'+
        '<div><b>来 4 次的人</b><span>156 元 / 月，比月卡少付 243</span><em>他本来在为别人买单</em></div>'+
        '<div><b>来 20 次的人</b><span>780 元 / 月，比月卡多付 381</span><em>他会要求次数包，或者封顶</em></div>'+
      '</div>'+
      '<div class="a35-verdict '+(v[0]==='ok'?'ok':'warn')+'"><b>你选的是 '+x.hook.toUpperCase()+'。</b>'+v[1]+'</div>'+
      '<div class="a35-nextline">计费单位、付费者、时间点、打包方式、风险承担、所有权——这六个变量，都可以像这样重设一次。</div>'+
    '</div>';
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{x.hook=b.dataset.h;api.save();paint();api.refresh();});
  const z=sec.querySelector('[data-zoom]');
  if(z)z.onclick=()=>api.modal('<button class="modal-x">×</button><img src="'+IMG.gym+'" alt="健身房" style="width:100%;border-radius:8px;display:block">'+
    '<p class="small" style="margin-top:9px">同一批器械、同一间房。按月收费时，「来 4 次」和「来 20 次」是同一个价。<br>图：SIT 官方课程材料（已授权）</p>');
  paint();
},
hint(S){return view(S).hook?'':'先选一个：价格、计费单位、还是服务内容';},
gate(S){return !!view(S).hook;}},

/* ================= 2 概念 ================= */
{id:'concept',name:'概念',short:'概念',kicker:'STEP 2 · 概念',
html:`
<div class="step-h"><h1>商业模式，是<em>六个变量的一种取法</em></h1>
<p>商业模式不是「卖什么」，是这六个变量各自取了什么值。取法一换，同一个产品就是另一门生意。</p></div>
<div class="a35-vars">
  ${VARS.map(v=>`<div class="a35-vrow"><b>${v.n}</b><span>${v.q}<em>${v.o}</em></span><span class="a35-ex">${v.ex}</span></div>`).join('')}
</div>
<div class="grid2" style="align-items:start;margin-top:12px">
  <div class="panel">
    <div class="panel-h"><h4>什么时候别动</h4><span>边界</span></div>
    <ul class="a35-no">
      <li><b>预付费监管</b>：储值、年卡受备案与资金监管约束。单位能改，钱不能随便先收。</li>
      <li><b>渠道合同</b>：经销商的返点、账期写在合同里。改时间点，等于改别人的现金流。</li>
      <li><b>算不清成本</b>：按结果收费之前，先算得清「一次结果」的成本。算不清就是赌博。</li>
    </ul>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>哪一句是变量重设</h4><span>二选一</span></div>
    <div class="a35-pick">
      <button class="opt" data-p="a"><span class="k">A</span><span><b>月卡从 399 调到 359，老会员再送两周。</b><span>价格动了，单位没动</span></span></button>
      <button class="opt" data-p="b"><span class="k">B</span><span><b>月卡取消，改成 10 次一包，三个月内用完。</b><span>单位、打包、时点一起动了</span></span></button>
    </div>
    <div id="pickOut"></div>
  </div>
</div>`,
init(sec,api){
  sec.classList.add('a35-step');
  const S=api.S,x=ensure(S),out=sec.querySelector('#pickOut');
  function paint(){
    sec.querySelectorAll('[data-p]').forEach(b=>b.classList.toggle('on',x.pick===b.dataset.p));
    if(!x.pick){out.innerHTML='';return;}
    const ok=x.pick==='b';
    out.innerHTML='<div class="a35-pickv">'+(ok
      ?'<b>对。</b>B 的价目表上，除了单价，还多了「次数」和「有效期」两列——计费单位、打包方式、时间点同时变了。'
      :'<b>再看一眼。</b>A 只把数字改了，单位还是「月」；B 连单位带有效期全换掉了。判断标准很土：<b>价目表上除了单价，还有没有别的列变了。</b>')+'</div>';
  }
  sec.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{x.pick=b.dataset.p;api.save();paint();api.refresh();});
  paint();
},
hint(S){return view(S).pick?'':'二选一：哪一句真的换了变量';},
gate(S){return !!view(S).pick;}},

/* ================= 3 变量重设盘 ================= */
{id:'board',name:'变量盘',short:'变量盘',kicker:'STEP 3 · 工作台',
html:`
<div class="step-h"><h1>六个旋钮，<em>拧动其中四个</em></h1>
<p>选一个生意。每个变量只允许取一个值，取回现状就等于没改。每拧一格，下面那句话重写一次。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>选一个生意</span>
  <span class="op"><span class="op-n">2</span>至少 4 个变量离开现状</span>
  <span class="op"><span class="op-n">3</span>读一遍拼出来的那句</span>
</div>
<div class="bench a35-bench">
  <div class="bench-h"><b>VARIABLE BOARD · 变量重设盘</b><span class="st" id="bSt">0 / 6 已重设</span></div>
  <div class="bench-b">
    <div class="a35-top">
      <div class="a35-biz" id="bizPick"></div>
      <div class="a35-say" id="say"></div>
    </div>
    <div class="a35-dials" id="dials"></div>
  </div>
  <div class="bench-f"><span class="small" id="bHint">至少 4 个变量离开现状，才能进下一步。</span><div style="flex:1"></div><button class="btn sm ghost" id="bReset">回到现状</button></div>
</div>`,
init(sec,api){
  sec.classList.add('a35-step');
  const S=api.S,x=ensure(S);
  const bizPick=sec.querySelector('#bizPick'),say=sec.querySelector('#say'),
        dials=sec.querySelector('#dials'),bSt=sec.querySelector('#bSt'),bHint=sec.querySelector('#bHint');

  function paintBiz(){
    bizPick.innerHTML=BIZ_KEYS.map(k=>'<button class="a35-bizbtn'+(x.biz===k?' on':'')+'" data-biz="'+k+'"><b>'+BIZ[k].n+'</b><span>'+BIZ[k].tag+'</span></button>').join('');
  }
  function paintDials(){
    const b=BIZ[x.biz],p=planOf(x,x.biz),ag=aggressive(x.biz,p);
    dials.innerHTML=VARS.map(v=>{
      const vv=b.vars[v.k],sel=p[v.k]||vv.now,changed=sel!==vv.now,hot=!!(ag&&ag.v===v.k);
      const keys=vv.opts.map(o=>o.k),idx=Math.max(0,keys.indexOf(sel));
      const rot=-62+(124*idx/Math.max(1,keys.length-1));
      return '<div class="a35-dial'+(changed?' on':'')+(hot?' hot':'')+'" data-v="'+v.k+'">'+
        '<div class="a35-dh"><b>'+v.n+(hot?'<i class="a35-flag">最激进</i>':'')+'</b><span>'+(changed?'已改 · '+optOf(b,v.k,sel).l:'现状 · '+optOf(b,v.k,vv.now).l)+'</span></div>'+
        '<div class="a35-db">'+
          '<div class="a35-gauge" style="--rot:'+rot.toFixed(1)+'deg"><div class="a35-needle"></div><i></i></div>'+
          '<div class="a35-opts">'+vv.opts.map(o=>'<button class="a35-o'+(sel===o.k?' on':'')+'" data-v="'+v.k+'" data-o="'+o.k+'" title="'+api.esc(o.c)+'">'+o.l+'</button>').join('')+'</div>'+
        '</div></div>';
    }).join('');
  }
  function paintSay(){
    const p=planOf(x,x.biz),n=resetsOf(x.biz,p).length,ag=aggressive(x.biz,p);
    const agTxt=ag
      ?'最激进的一改：<b>'+NAMES[ag.v]+' → '+ag.l+'</b> · '+ag.r
      :'最激进的一改：还没有。六个变量都留在现状，拼出来的就是今天这家店。';
    say.innerHTML='<div class="a35-say-h"><b>拼出来的商业模式</b><span>'+BIZ[x.biz].n+' · 6 个变量</span></div>'+
      '<p>'+api.esc(sentence(x.biz,p))+'</p>'+
      '<div class="a35-aggr">'+agTxt+'</div>';
    bSt.textContent=n+' / 6 已重设';
    bSt.classList.toggle('a35-pass',n>=MIN_RESET);
    bHint.innerHTML=n>=MIN_RESET
      ?('已重设 '+n+' 个变量。把它记下来，下一步落到你自己的生意上。')
      :('还差 '+(MIN_RESET-n)+' 个变量。最容易出新的两个是「付费者」和「风险承担」。');
  }
  function paintAll(){paintBiz();paintDials();paintSay();api.refresh();}

  bizPick.addEventListener('click',e=>{
    const b=e.target.closest('[data-biz]');if(!b)return;
    x.biz=b.dataset.biz;api.save();paintAll();
  });
  dials.addEventListener('click',e=>{
    const b=e.target.closest('[data-o]');if(!b)return;
    const bz=BIZ[x.biz],p=planOf(x,x.biz),k=b.dataset.v,o=b.dataset.o;
    if(!bz.vars[k])return;
    if(o===bz.vars[k].now)delete p[k];else p[k]=o;
    x.plan[x.biz]=p;api.save();paintAll();
  });
  sec.querySelector('#bReset').onclick=()=>{
    const p=planOf(x,x.biz);
    if(!Object.keys(p).length){api.toast('已经是现状了');return;}
    x.plan[x.biz]={};api.save();paintAll();api.toast('已回到现状');
  };
  paintAll();
},
hint(S){const x=view(S);const n=resetsOf(x.biz,planOf(x,x.biz)).length;return n>=MIN_RESET?'':'还差 '+(MIN_RESET-n)+' 个变量';},
gate(S){const x=view(S);return resetsOf(x.biz,planOf(x,x.biz)).length>=MIN_RESET;}},

/* ================= 4 在你的事上 ================= */
{id:'mine',name:'在你的事上',short:'我的',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>你的生意，<em>拧两个变量</em></h1>
<p>不用六个全动。挑两个真能改的，再写清谁会因此不买——那句话比新点子值钱。</p></div>
<div class="grid2" style="align-items:start">
  <div class="stack">
    <div class="panel">
      <div class="panel-h"><h4>① 你的业务</h4><span>≥ 4 字</span></div>
      <div class="field"><input id="mBiz" maxlength="30" placeholder="例如：给连锁药店做慢病会员运营"></div>
      <div class="hint" style="margin-top:7px">写到能看出「卖什么、卖给谁」。只写行业名不算。</div>
    </div>
    <div class="panel">
      <div class="panel-h"><h4>② 重设两个变量</h4><span>变量 + 新值</span></div>
      <div class="a35-mset"><select id="mV1"></select><input id="mN1" maxlength="24" placeholder="改成什么：例如按会员续费率收费"></div>
      <div class="a35-mset"><select id="mV2"></select><input id="mN2" maxlength="24" placeholder="例如：付费者改成物业"></div>
      <div class="hint" style="margin-top:7px">两个变量不能是同一个。写具体的单位、人或时点，不写「更灵活」。</div>
    </div>
  </div>
  <div class="stack">
    <div class="panel">
      <div class="panel-h"><h4>③ 谁会因此不买</h4><span id="noCnt">0 / 12</span></div>
      <div class="field">
        <label>具体到一类人，以及他不买的理由</label>
        <textarea id="mNo" maxlength="90" style="min-height:78px" placeholder="例如：已经囤了三年年卡的老会员，因为按次算他一年要多付 900"></textarea>
      </div>
      <div class="a35-tip">不买通常不是「不喜欢」，是这三件事变了：<b>他要重算预算</b> · <b>他的流程要多一步</b> · <b>他的考核被动了</b>。</div>
    </div>
    <div class="panel">
      <div class="panel-h"><h4>自查</h4><span>三条同时亮</span></div>
      <div class="a35-chk" id="chk">
        <div class="chk" data-c="two"><i>○</i><b>两个变量不是同一个</b><span>单位、付费者、时点，各算一个</span></div>
        <div class="chk" data-c="new"><i>○</i><b>新值说得出口</b><span>是单位或人，不是形容词</span></div>
        <div class="chk" data-c="who"><i>○</i><b>不买的人找得到</b><span>有身份，也有理由</span></div>
      </div>
    </div>
  </div>
</div>`,
init(sec,api){
  sec.classList.add('a35-step');
  const S=api.S,x=ensure(S);
  const mBiz=sec.querySelector('#mBiz'),mV1=sec.querySelector('#mV1'),mV2=sec.querySelector('#mV2'),
        mN1=sec.querySelector('#mN1'),mN2=sec.querySelector('#mN2'),mNo=sec.querySelector('#mNo'),
        noCnt=sec.querySelector('#noCnt'),chk=sec.querySelector('#chk');
  const opts='<option value="">选一个变量</option>'+VARS.map(v=>'<option value="'+v.k+'">'+v.n+'</option>').join('');
  mV1.innerHTML=opts;mV2.innerHTML=opts;

  function counters(){
    noCnt.textContent=x.noBuy.trim().length+' / '+MIN_NOBUY;
    noCnt.classList.toggle('a35-pass',x.noBuy.trim().length>=MIN_NOBUY);
    const t1=(x.mineN1||'').trim(),t2=(x.mineN2||'').trim();
    const rows=[
      ['two',!!x.mineV1&&!!x.mineV2&&x.mineV1!==x.mineV2&&t1.length>=MIN_VAL&&t2.length>=MIN_VAL],
      ['new',(t1+t2).length>=MIN_VAL*2&&!/更灵活|更好用|更人性|更专业/.test(t1+t2)],
      ['who',x.noBuy.trim().length>=MIN_NOBUY]
    ];
    rows.forEach(r=>{
      const el=chk.querySelector('[data-c="'+r[0]+'"]');if(!el)return;
      el.classList.toggle('on',r[1]);
      el.querySelector('i').textContent=r[1]?'✓':'○';
    });
  }
  function apply(){
    if(mBiz.value!==x.mineBiz)mBiz.value=x.mineBiz;
    if(mV1.value!==x.mineV1)mV1.value=x.mineV1;
    if(mV2.value!==x.mineV2)mV2.value=x.mineV2;
    if(mN1.value!==x.mineN1)mN1.value=x.mineN1;
    if(mN2.value!==x.mineN2)mN2.value=x.mineN2;
    if(mNo.value!==x.noBuy)mNo.value=x.noBuy;
    counters();
  }
  mBiz.addEventListener('input',()=>{x.mineBiz=mBiz.value;api.save();api.refresh();});
  mV1.addEventListener('change',()=>{x.mineV1=mV1.value;api.save();counters();api.refresh();});
  mV2.addEventListener('change',()=>{x.mineV2=mV2.value;api.save();counters();api.refresh();});
  mN1.addEventListener('input',()=>{x.mineN1=mN1.value;api.save();counters();api.refresh();});
  mN2.addEventListener('input',()=>{x.mineN2=mN2.value;api.save();counters();api.refresh();});
  mNo.addEventListener('input',()=>{x.noBuy=mNo.value;api.save();counters();api.refresh();});
  apply();
},
hint(S){
  const x=view(S);
  if(x.mineBiz.trim().length<MIN_BIZ)return '先写你的业务';
  if(!x.mineV1)return '选第一个变量';
  if((x.mineN1||'').trim().length<MIN_VAL)return '写第一个新值';
  if(!x.mineV2)return '选第二个变量';
  if((x.mineN2||'').trim().length<MIN_VAL)return '写第二个新值';
  if(x.mineV1===x.mineV2)return '两个变量不能是同一个';
  if(x.noBuy.trim().length<MIN_NOBUY)return '还差「谁会因此不买」';
  return '';
},
gate(S){
  const x=view(S);
  return x.mineBiz.trim().length>=MIN_BIZ&&!!x.mineV1&&!!x.mineV2&&x.mineV1!==x.mineV2&&
    (x.mineN1||'').trim().length>=MIN_VAL&&(x.mineN2||'').trim().length>=MIN_VAL&&
    x.noBuy.trim().length>=MIN_NOBUY;
}},

/* ================= 5 过滤与提交 ================= */
{id:'submit',name:'过滤与提交',short:'提交',kicker:'STEP 5 · 过滤与提交',
html:`
<div class="step-h"><h1>交之前，过<em>两问</em></h1>
<p>改一个变量，账面最先出问题的往往不是收入，是现金流；最先反对的往往不是客户，是自己人。</p></div>
<div class="grid2" style="align-items:start">
  <div class="stack">
    <div class="panel">
      <div class="panel-h"><h4>① 现金流会不会断</h4><span id="cashCnt">0 / 12</span></div>
      <div class="field">
        <label>钱什么时候进、什么时候出，中间那段谁垫</label>
        <textarea id="qCash" maxlength="90" style="min-height:66px" placeholder="例如：预付改月结后，前三个月工资和房租要自己垫 40 万"></textarea>
      </div>
      <div class="hint" style="margin-top:7px">预付变后付，等于你多垫一个月；按效果付，等于多垫一个季度。</div>
    </div>
    <div class="panel">
      <div class="panel-h"><h4>② 谁会先反对</h4><span id="oppCnt">0 / 8</span></div>
      <div class="field">
        <label>写岗位，不写「客户」</label>
        <textarea id="qOpp" maxlength="80" style="min-height:60px" placeholder="例如：靠年卡提成吃饭的会籍销售，和按预付额考核的区域经理"></textarea>
      </div>
      <div class="hint" style="margin-top:7px">反对者的收入、权限或工作量，会因为这一改而变。</div>
    </div>
    <div class="a35-sub">
      <button class="btn primary" id="subBtn" disabled>提交（自动评审）</button>
      <button class="btn" id="expBtn">导出 PNG</button>
      <span class="small" id="subSt">卡还不完整</span>
    </div>
    <div class="hint">提交后先由机器评三个维度（有用 / 可行 / 证据），再进同班互评池。</div>
  </div>
  <div class="stack">
    <div id="cardSlot"></div>
    <div class="a35-rubric"><b>互评三点</b><span>变量是否具体 · 代价是否算过 · 谁不买找得到人</span></div>
  </div>
</div>`,
init(sec,api){
  sec.classList.add('a35-step');
  const S=api.S,x=ensure(S);
  const qCash=sec.querySelector('#qCash'),qOpp=sec.querySelector('#qOpp'),
        cashCnt=sec.querySelector('#cashCnt'),oppCnt=sec.querySelector('#oppCnt'),
        slot=sec.querySelector('#cardSlot'),subBtn=sec.querySelector('#subBtn'),subSt=sec.querySelector('#subSt');

  function okMine(){
    return x.mineBiz.trim().length>=MIN_BIZ&&!!x.mineV1&&!!x.mineV2&&x.mineV1!==x.mineV2&&
      x.mineN1.trim().length>=MIN_VAL&&x.mineN2.trim().length>=MIN_VAL&&x.noBuy.trim().length>=MIN_NOBUY;
  }
  function okQ(){return x.cash.trim().length>=MIN_CASH&&x.oppose.trim().length>=MIN_OPP;}
  function counters(){
    cashCnt.textContent=x.cash.trim().length+' / '+MIN_CASH;
    cashCnt.classList.toggle('a35-pass',x.cash.trim().length>=MIN_CASH);
    oppCnt.textContent=x.oppose.trim().length+' / '+MIN_OPP;
    oppCnt.classList.toggle('a35-pass',x.oppose.trim().length>=MIN_OPP);
  }
  function paintCard(){
    const c=L.card(S);
    const miss=[];
    if(!okMine())miss.push('第 4 步的卡');
    if(x.cash.trim().length<MIN_CASH)miss.push('现金流');
    if(x.oppose.trim().length<MIN_OPP)miss.push('反对者');
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A35</span><span>变量重设卡</span></div>'+
      '<h5>'+api.esc(c.title)+'</h5><div class="kv">'+
      c.rows.map(r=>'<div><b>'+api.esc(r[0])+'</b><span class="'+(r[1]&&r[1]!=='—'?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+
      '</div></div>'+
      (miss.length
        ?'<div class="a35-miss">还欠：'+api.esc(miss.join(' · '))+'</div>'
        :'<div class="a35-miss done">卡齐了。提交后机器先评一遍，再进班级互评。</div>');
  }
  function paintSubmit(){
    const ok=okMine()&&okQ();
    subBtn.disabled=!!S.submitted||!ok;
    subBtn.textContent=S.submitted?'已提交':'提交（自动评审）';
    subSt.textContent=S.submitted?'已提交 · 进入互评池':(ok?'可以提交':'卡还不完整');
    subSt.classList.toggle('a35-pass',!!S.submitted||ok);
  }
  function paintAll(){
    if(qCash.value!==x.cash)qCash.value=x.cash;
    if(qOpp.value!==x.oppose)qOpp.value=x.oppose;
    counters();paintCard();paintSubmit();api.refresh();
  }
  qCash.addEventListener('input',()=>{x.cash=qCash.value;api.save();counters();paintCard();paintSubmit();api.refresh();});
  qOpp.addEventListener('input',()=>{x.oppose=qOpp.value;api.save();counters();paintCard();paintSubmit();api.refresh();});
  subBtn.onclick=async()=>{
    if(!(okMine()&&okQ())){api.toast('卡还不完整，先补齐');return;}
    subBtn.disabled=true;subBtn.textContent='提交中…';
    try{await api.submit();}catch(e){api.toast('提交出错，已存本机');}
    paintAll();
  };
  sec.querySelector('#expBtn').onclick=()=>api.exportCard();
  paintAll();
},
hint(S){
  const x=view(S);
  if(x.cash.trim().length<MIN_CASH)return '还差「现金流会不会断」';
  if(x.oppose.trim().length<MIN_OPP)return '还差「谁会先反对」';
  return '';
},
gate(S){const x=view(S);return x.cash.trim().length>=MIN_CASH&&x.oppose.trim().length>=MIN_OPP;}},

/* ================= 6 收束 ================= */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>今天带走<em>三件事</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel a35-take"><div class="a35-tn">01</div>
    <b>价格是从单位里长出来的</b>
    <p>单位从月换成次，价目表要重算一遍：谁多付、谁少付、谁干脆不来了。只改数字，结构一点没动。</p></div>
  <div class="panel a35-take"><div class="a35-tn">02</div>
    <b>一次只拧一格</b>
    <p>六个变量同时动，你分不清是哪一格让客户掏钱、哪一格把他赶走。先动一个，跑完一个周期再动第二个。</p></div>
  <div class="panel a35-take"><div class="a35-tn">03</div>
    <b>每一格都有人在受益</b>
    <p>现状不是没道理，是有人靠它吃饭。改之前先找到那个人，把话说明白，比事后解释便宜。</p></div>
</div>
<div class="panel a35-next">
  <div class="panel-h"><h4>下一节 · A36</h4><span>组织创新机制</span></div>
  <div class="a35-next-body">
    <svg viewBox="0 0 150 100" class="a35-next-svg" aria-hidden="true">
      <rect x="4" y="38" width="34" height="24" rx="3" fill="none" stroke="#46536A"/>
      <rect x="58" y="38" width="34" height="24" rx="3" fill="none" stroke="#46536A"/>
      <rect x="112" y="38" width="34" height="24" rx="3" fill="none" stroke="#C9A227" stroke-opacity=".8"/>
      <path d="M38 50h20M92 50h20" stroke="#46536A" stroke-dasharray="2 2"/>
      <path d="M46 45l6 5-6 5M100 45l6 5-6 5" fill="none" stroke="#C9A227" stroke-opacity=".7"/>
      <text x="21" y="74" text-anchor="middle" fill="#5A6679" font-size="7" font-family="monospace">教练 40</text>
      <text x="75" y="74" text-anchor="middle" fill="#5A6679" font-size="7" font-family="monospace">实施者 20</text>
      <text x="129" y="74" text-anchor="middle" fill="#8D97AA" font-size="7" font-family="monospace">项目 12</text>
      <path d="M21 38V22h108v16" fill="none" stroke="#2A3547"/>
      <text x="75" y="17" text-anchor="middle" fill="#5A6679" font-size="7" font-family="monospace">2,000 人 · 170 场</text>
    </svg>
    <div>
      <p class="a35-next-p">以色列国民银行没有搞一次全员创新大赛。它选了 40 位最优秀的经理，用 4 天培养成创新教练；再从教练里挑 20 位，3 天训成实施者；12 个主要项目由实施者自己带，直接见决策者。</p>
      <p class="small" style="margin-top:6px">下一节看：把创新做成一套岗位与流程，而不是一次性活动。2,000 人、190 个想法、40 个落地，一款对公新品做到 7 亿谢克。</p>
    </div>
  </div>
  <div class="row" style="margin-top:12px">
    <a class="btn primary" href="index.html">回到课程地图</a>
    <button class="btn" id="againBtn">重看这一节</button>
  </div>
</div>`,
init(sec,api){sec.classList.add('a35-step');sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '改的是计费单位，还是只是把价格调了？',
 '换了付费者之后，谁签字、谁天天在用？',
 '钱什么时候进来？换完单位，你能撑几个月？',
 '这一改，公司里谁的奖金会变少？',
 '六个变量里如果只能动一个，你动哪个？'
]},

card(S){
  const x=view(S),p=planOf(x,x.biz),ag=aggressive(x.biz,p);
  const v1=x.mineV1?(NAMES[x.mineV1]||x.mineV1)+' → '+(x.mineN1||'—'):'—';
  const v2=x.mineV2?(NAMES[x.mineV2]||x.mineV2)+' → '+(x.mineN2||'—'):'—';
  const say=sentence(x.biz,p)+(ag?'　最激进：'+NAMES[ag.v]+' → '+ag.l:'');
  return {title:'A35 · 变量重设卡',rows:[
    ['我的业务',x.mineBiz||'—'],
    ['重设变量',(v1==='—'&&v2==='—')?'—':(v1+' · '+v2)],
    ['盘上那句',say],
    ['谁不买',x.noBuy||'—'],
    ['现金流',x.cash||'—'],
    ['先反对',x.oppose||'—']
  ]};
},

notes:[
 {t:'本节目标',h:'让学员把商业模式拆成六个可重设的变量，并能说清：改了哪一个、谁因此不买、现金流会不会断。验收标准不是点子新，是<b>改得具体、代价算得清</b>。'},
 {t:'时间分配（45′）',h:'自学 27′：先猜 4′ · 六变量 7′ · 变量盘 10′ · 自己的两个变量 6′。直播 13′：只讲 3 张卡、2 个最激进的重设。提交与互评 5′。'},
 {t:'常见卡点',h:'① 把涨价当重设：追问「价目表上除了单价，还有哪一列变了」；② 六个变量全拧一遍：让他只留一个，剩下五个回到现状再比；③ 不买的人写成「客户」：追问「哪个岗位、哪类客、他少拿了什么」。'},
 {t:'直播怎么接',h:'中控里按变量统计：<b>看全班最常拧的是哪一格、最不敢动的是哪一格</b>。通常「计费单位」一堆人改，「风险承担」没人碰。先读 2 张只改了计费单位的卡，现场补问一句：<b>「空置风险现在归谁？」</b> 再读 1 张动了付费者的，问：<b>「谁签字？他为什么愿意签？」</b> 最后把「谁不买」的三类理由投出来，让全班投票哪一类最难说服。'},
 {t:'判分口径',h:'变量是否具体（单位/人/时点，而不是形容词）40%；不买的人与理由是否具体 30%；现金流与反对者是否算过 30%。与 A36 的关系：这一节改的是生意结构，下一节改的是让这种改动能持续发生的组织机制。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A35']=L;
})();
