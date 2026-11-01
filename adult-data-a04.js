/* A04 · 关系固着：5 个苹果分给 6 个孩子 */
(function(){
'use strict';

const IMG={apples:'assets-cases-a04-apples.jpg',cut:'assets-cases-a04-apple-cut.jpg'};

/* ---------- 关系板：4 类对象 × 3 条现成规则 ---------- */
const COLS=[
 {k:'big',n:'越大越贵',s:'量 → 价'},
 {k:'early',n:'越早越便宜',s:'时间 → 价'},
 {k:'far',n:'越远越贵',s:'距离 → 成本'}
];
const ROWS=[
 {k:'price',n:'价格',s:'卖多少钱'},
 {k:'time',n:'时间',s:'花多久'},
 {k:'place',n:'地点',s:'在哪发生'},
 {k:'people',n:'人群',s:'卖给谁'}
];
const ACTS=[
 {k:'inv',n:'反过来',d:'高低翻转，看谁反而受益'},
 {k:'dec',n:'脱钩',d:'断开原关系，改接一个新变量'},
 {k:'add',n:'加一个条件',d:'只在某个条件下成立，其余放开'}
];
const CELLS={
 'price.big':{
   t:'杯型越大，价格越高',
   base:'中杯 18、大杯 21：杯型越大，价格越高。',
   inv:'杯型越大，单价越低：大杯 21 卖成 19，靠加料把钱赚回来。',
   dec:'价格不跟杯型走，改跟「坐了多久」走：坐 10 分钟和坐 2 小时不同价。',
   add:'杯型只定基础价：换燕麦奶、加一份浓缩，价格跟「改了几次配方」走。'
 },
 'price.early':{
   t:'订得越早，价格越低',
   base:'提前 14 天订房 8 折，越靠近入住越贵。',
   inv:'越晚订越便宜：最后 48 小时清尾房，价格反而低。',
   dec:'价格不跟预订时间走，改跟「这一单带几个孩子」走。',
   add:'早订只锁房、不锁价：入住当天按满房率补差。'
 },
 'price.far':{
   t:'送得越远，运费越高',
   base:'3 公里内 5 元，每多 1 公里加 2 元。',
   inv:'送得越远越便宜：同一方向合并配送，远单每单摊得更低。',
   dec:'配送费不按距离，按「这单占不占保温箱」走。',
   add:'距离只算起步价：超过 5 公里改按「路上花了多久」计价。'
 },
 'time.big':{
   t:'用得越久，收费越高',
   base:'会议室每小时 200 元，用多久算多久。',
   inv:'用得越久，每小时越便宜：第 4 小时起打 5 折。',
   dec:'收费不按小时，按「这间房今天有没有被别人订走」走。',
   add:'时长只算基础费：超出预约 15 分钟才加收，按分钟计。'
 },
 'time.early':{
   t:'交得越早，加急费越低',
   base:'提前 3 天交稿免加急费，越晚越贵。',
   inv:'越晚交越便宜：错峰排产，工厂空档期反而给折扣。',
   dec:'加急费不跟交稿时间走，按「这单占不占打样机」走。',
   add:'交稿时间只决定排队顺序：真要插单，按「影响了几张单」加价。'
 },
 'time.far':{
   t:'离截止越近，改动越贵',
   base:'离交付还有 7 天改需求加 10%，3 天内加 30%。',
   inv:'离截止越近越便宜：反正要返工，一起改不再加钱。',
   dec:'改动成本不看到截止还有几天，看「改的件有没有开模」。',
   add:'时间只决定要不要审批：同一处改到第 4 次才开始计价。'
 },
 'place.big':{
   t:'铺面越大，租金越高',
   base:'按平米计价，100 平和 300 平一个单价。',
   inv:'铺面越大，每平米越便宜：大店拿折扣，小店单价高。',
   dec:'租金不按面积，按「门口每天过多少人」走。',
   add:'面积只算保底租金：营业额过线之后按比例抽成。'
 },
 'place.early':{
   t:'进场越早，摊位费越低',
   base:'早鸟价 8 折，越靠近开展越贵。',
   inv:'越晚进场越便宜：开展第二天下午主办方清位，半价。',
   dec:'摊位费不按报名顺序，按「这个品类是不是独一份」走。',
   add:'早鸟价只保 7 天：第 8 天起回标准价，位置不动。'
 },
 'place.far':{
   t:'离电梯越远，租金越低',
   base:'同一层，离电梯越远越便宜，最里侧打 7 折。',
   inv:'离电梯越远越贵：走到最里面的客人，目标更明确。',
   dec:'租金不按到电梯的距离，按「这一层有没有餐饮」走。',
   add:'距离只算基础租金：能做外摆的铺位另外加价。'
 },
 'people.big':{
   t:'客户越大，服务越贵',
   base:'按人头收费，一家 200 人就是 200 份钱。',
   inv:'客户越大，人均越便宜：按阶梯降价，200 人打 7 折。',
   dec:'收费不按人头，按「这家一年提了多少工单」走。',
   add:'人头只算席位费：超过 50 人的部分，按实际登录人数计。'
 },
 'people.early':{
   t:'加入越早，年费越低',
   base:'创始会员 999，之后每年涨 100。',
   inv:'越晚加入越便宜：新会员首年 5 折，老会员原价。',
   dec:'年费不按加入时间，按「这一年用了几次」走。',
   add:'早鸟价只锁一年：第二年按上一年的使用量续费。'
 },
 'people.far':{
   t:'客户越远，上门费越高',
   base:'20 公里外上门加 80 元路费。',
   inv:'越远越便宜：一趟多跑几家，路费摊薄。',
   dec:'上门费不按距离，按「这趟能不能顺路看第二家」走。',
   add:'距离只算基础路费：同一栋楼的第 2 家起免上门费。'
 }
};
const MIN_RULES=3, MAX_RULES=6;
const MIN_REL=10, MIN_REW=15, MIN_WHO=8, MIN_Q=8;

const rowOf=k=>ROWS.filter(r=>r.k===k)[0]||{n:'对象',s:''};
const colOf=k=>COLS.filter(c=>c.k===k)[0]||{n:'规则',s:''};
const actOf=k=>ACTS.filter(a=>a.k===k)[0]||{n:'改法',d:''};

/* ---------- 状态 ---------- */
function view(S){
  const a=(S&&S.answers&&S.answers.a04)||{};
  const str=v=>typeof v==='string'?v:'';
  const rules=Array.isArray(a.rules)?a.rules.filter(r=>r&&r.id&&r.text).map(r=>({
    id:String(r.id),cell:String(r.cell||''),act:String(r.act||''),text:String(r.text)
  })):[];
  const sel=(a.sel&&typeof a.sel==='object')?{r:str(a.sel.r),c:str(a.sel.c)}:{r:'',c:''};
  return {
    hook:str(a.hook),pick:str(a.pick),rules:rules,sel:sel,
    rel:str(a.rel),rewrite:str(a.rewrite),useRule:str(a.useRule),who:str(a.who),
    against:str(a.against),pilot:str(a.pilot)
  };
}
function ensure(S){
  const ans=S.answers;
  if(!ans.a04||typeof ans.a04!=='object')ans.a04={};
  const x=ans.a04;
  if(!Array.isArray(x.rules))x.rules=[];
  if(!x.sel||typeof x.sel!=='object')x.sel={r:'',c:''};
  ['hook','pick','rel','rewrite','useRule','who','against','pilot'].forEach(k=>{if(typeof x[k]!=='string')x[k]='';});
  return x;
}
function ruleStats(x){
  const m={inv:0,dec:0,add:0};
  x.rules.forEach(r=>{if(m[r.act]!==undefined)m[r.act]++;});
  return m;
}
function fullGate(x){
  return !!(x.rules.length>=MIN_RULES&&x.rel.trim().length>=MIN_REL&&
    x.rewrite.trim().length>=MIN_REW&&x.who.trim().length>=MIN_WHO&&
    x.against.trim().length>=MIN_Q&&x.pilot.trim().length>=MIN_Q);
}
function needRows(x){
  return [
    {k:'生成规则',ok:x.rules.length>=MIN_RULES,tip:x.rules.length+' / '+MIN_RULES+' 条'},
    {k:'那条关系',ok:x.rel.trim().length>=MIN_REL,tip:x.rel?x.rel.length+' / '+MIN_REL:'还没写'},
    {k:'改写',ok:x.rewrite.trim().length>=MIN_REW,tip:x.rewrite?x.rewrite.length+' / '+MIN_REW:'还没写'},
    {k:'谁受益',ok:x.who.trim().length>=MIN_WHO,tip:x.who?x.who.length+' / '+MIN_WHO:'还没写'},
    {k:'谁反对',ok:x.against.trim().length>=MIN_Q,tip:x.against?'已写':'还没写'},
    {k:'先在哪试',ok:x.pilot.trim().length>=MIN_Q,tip:x.pilot?'已写':'还没写'}
  ];
}

const L={
id:'A04',week:1,seq:4,title:'关系固着：5 个苹果分给 6 个孩子',
kicker:'WEEK 1 · 认知地基 · 关系固着',tool:'ad',toolName:'关系固着',minutes:45,

steps:[
/* ================= 1 先猜 ================= */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>5 个苹果，<em>6 个孩子</em></h1>
<p>桌上 5 个苹果，6 个孩子，每人拿到的必须一样多，苹果不能剩。先别算——先说你会怎么分。</p></div>
<div class="grid2 a04-hook">
  <figure class="a04-fig a04-fig-hero">
    <img src="${IMG.apples}" alt="五个苹果并排放在桌面上" loading="lazy">
    <figcaption>
      <b>桌上的 5 个苹果</b>
      <span>6 个孩子，一人一份，一样多</span>
      <em>图：SIT 官方课程材料（已授权）</em>
    </figcaption>
  </figure>
  <div class="panel">
    <div class="panel-h"><h4>你的分法</h4><span>单选</span></div>
    <div class="opts">
      <button class="opt" data-h="a"><span class="k">A</span><span><b>每个苹果切成 6 块，每人 5 块</b><span>30 块，正好分完</span></span></button>
      <button class="opt" data-h="b"><span class="k">B</span><span><b>榨成果汁，平均倒 6 杯</b><span>总量不变，按体积分</span></span></button>
      <button class="opt" data-h="c"><span class="k">C</span><span><b>这次让一个孩子先不吃</b><span>先按 5 个人分</span></span></button>
      <button class="opt" data-h="d"><span class="k">D</span><span><b>再去买一个，凑成 6 个</b><span>让题目变成 6 ÷ 6</span></span></button>
    </div>
  </div>
</div>
<div id="hookOut"></div>`,
init(sec,api){
  sec.classList.add('a04-step');
  const S=api.S,x=ensure(S),out=sec.querySelector('#hookOut');
  const V={
    a:['ok','对，这条路成立。官方给的方案就是这个方向：切开——但不是切成 6 块。'],
    b:['ok','成立。榨汁是另一条路：把「一个苹果」变成「一杯」，分配单位换了，总量没变。'],
    c:['warn','这不是分配：你把 6 个人变成了 5 个人。问题没解，只是绕开了。'],
    d:['warn','这不是分配：你把 5 个变成了 6 个。题目被改了，那条关系还在。']
  };
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',x.hook===b.dataset.h));
    if(!x.hook){
      out.innerHTML='<div class="panel a04-wait"><div class="panel-h"><h4>等你选完</h4><span>一种分法</span></div>'+
        '<p class="small">先选一个。选完再看官方怎么分——它可能不在你的第一直觉里。</p></div>';
      return;
    }
    const v=V[x.hook]||V.a;
    out.innerHTML='<div class="panel a04-reveal">'+
      '<div class="panel-h"><h4>揭晓 · 官方答案</h4><span>Day 2 · p.2–4</span></div>'+
      '<div class="a04-split">'+
        '<div>'+
          '<div class="a04-ans">切开，但不必切成 6 块</div>'+
          '<p class="a04-body">3 个苹果对半切，2 个苹果切三份：6 个半块 + 6 个三分之一块。'+
            '每个孩子拿半个加三分之一，正好六分之五。没有把任何一个苹果切成 6 块。</p>'+
          '<div class="a04-verdict '+(v[0]==='ok'?'ok':'warn')+'"><b>你选的是 '+x.hook.toUpperCase()+
            '。</b> '+v[1]+'</div>'+
        '</div>'+
        '<figure class="a04-fig a04-fig-sm">'+
          '<img src="'+IMG.cut+'" alt="切开的青苹果" loading="lazy">'+
          '<figcaption><b>官方建议的切法</b><span>一个苹果切成三份</span>'+
          '<em>图：SIT 官方课程材料（已授权）</em></figcaption>'+
        '</figure>'+
      '</div>'+
      '<div class="a04-quote">「不能把每个苹果都切成 6 块。」<span>官方那一页的原话。它先堵掉最顺手的解法，再逼你问：到底哪条规矩不能动？</span></div>'+
      '<div class="a04-key">'+
        '<b>你以为的规则</b><span>一个苹果，只能给一个孩子。</span>'+
        '<b>实际的关系</b><span>「一份」被绑在「一个完整的苹果」上。切开就断了这条关系——而这条关系没人规定过，是你自己补上的。</span>'+
      '</div></div>';
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{
    x.hook=b.dataset.h;api.save();paint();api.refresh();
  });
  paint();
},
hint(S){return view(S).hook?'':'先选一个分法';},
gate(S){return !!view(S).hook;}},

/* ================= 2 概念 ================= */
{id:'concept',name:'概念',short:'概念',kicker:'STEP 2 · 概念',
html:`
<div class="step-h"><h1>固着不在物体上，<em>在两个变量之间</em></h1>
<p>A02 是「这东西只能这么用」，A03 是「这些东西只能这样摆」。今天第三种：<b>「这两件事只能这样连着」</b>。</p></div>
<div class="grid2" style="align-items:start;margin-bottom:12px">
  <div class="panel a04-def">
    <div class="panel-h"><h4>关系固着</h4><span>Relational Fixedness</span></div>
    <p>把产品或情境里<b>变量之间的关系</b>，当成静态的、永久不变的。于是看不见：改掉这条关系，能长出新结构。</p>
    <div class="a04-def-f">变量 = 可变的特征：价格、大小、时间、距离、人群。「不是东西不能改」，是「谁跟谁绑着」不能改。</div>
    <div class="a04-src">官方定义 · Day 2 p.5</div>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>两个变量，一条关系</h4><span>能改的只有三处</span></div>
    <div class="a04-link"><span class="a04-node">杯型</span><i class="a04-line"></i><span class="a04-node">价格</span></div>
    <div class="a04-link-note">现在：杯型越大，价格越高</div>
    <div class="a04-ways">
      <div><b>反过来</b><span>杯型越大，单价越低 —— 大杯靠加料赚钱</span></div>
      <div><b>脱钩</b><span>价格不跟杯型走，改跟「坐了多久」走</span></div>
      <div><b>加条件</b><span>只在堂食时按杯型定价，外带统一价</span></div>
    </div>
  </div>
</div>
<div class="grid2" style="align-items:start;margin-bottom:12px">
  <div class="panel a04-ask">
    <div class="panel-h"><h4>自查</h4><span>回到刚才那道题</span></div>
    <div class="a04-askq">你刚才默认了哪条「必须这样」的关系？</div>
    <div class="a04-q-list">
      <div><i>01</i><span>这两个变量里，哪一个你根本没想过能动？</span></div>
      <div><i>02</i><span>这条关系是谁定的：客户、监管，还是你们一直这么做？</span></div>
      <div><i>03</i><span>改了它，谁的收入会变少？</span></div>
    </div>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>什么时候别改</h4><span>边界</span></div>
    <ul class="a04-no">
      <li><b>物理与安全约束</b>：剂量对体重、承重对材料。改了会出事。</li>
      <li><b>法规披露</b>：呈现方式可以改，披露义务不能改。</li>
      <li><b>改完没人能验证因果</b>：那是伪相关，不是新关系（A28 专门讲）。</li>
    </ul>
  </div>
</div>
<div class="panel">
  <div class="panel-h"><h4>哪一句是「关系固着」在说话</h4><span>二选一</span></div>
  <div class="a04-pick">
    <button class="opt" data-p="a"><span class="k">A</span><span><b>我们的报价必须按成本加成，否则不接单。</b><span>一句话里藏着一条不能动的关系</span></span></button>
    <button class="opt" data-p="b"><span class="k">B</span><span><b>我们上个月把报价上调了 5%。</b><span>一个事实，没有关系</span></span></button>
  </div>
  <div id="pickOut"></div>
</div>`,
init(sec,api){
  sec.classList.add('a04-step');
  const S=api.S,x=ensure(S),out=sec.querySelector('#pickOut');
  function paint(){
    sec.querySelectorAll('[data-p]').forEach(b=>b.classList.toggle('on',x.pick===b.dataset.p));
    if(!x.pick){out.innerHTML='';return;}
    const ok=x.pick==='a';
    out.innerHTML='<div class="a04-pickv">'+(ok
      ? '<b>对。</b>「成本高→价格高」被当成了规则来引用。它没说这次想怎么定价，它说的是「只能这么定」。'
      : '<b>再看一眼。</b>B 只记录了一次变化：上个月涨了 5%。它没有说「为什么必须这样」。A 才是——把成本与价格的关系，当成不能动的规矩。')+
      '</div>';
  }
  sec.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{
    x.pick=b.dataset.p;api.save();paint();api.refresh();
  });
  paint();
},
hint(S){return view(S).pick?'':'二选一：哪一句是关系固着';},
gate(S){return !!view(S).pick;}},

/* ================= 3 关系板 ================= */
{id:'board',name:'关系板',short:'关系板',kicker:'STEP 3 · 工作台',
html:`
<div class="step-h"><h1>改一条关系，<em>看它长出什么</em></h1>
<p>下面每个格子，都是「大家都觉得只能这样」的一条关系。点一个格子，选一种改法，它会给你一句可以直接拿去用的新规则。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>点一个格子</span>
  <span class="op"><span class="op-n">2</span>选一种改法</span>
  <span class="op"><span class="op-n">3</span>生成新规则，至少 3 条</span>
</div>
<div class="bench a04-bench">
  <div class="bench-h"><b>RELATION BOARD · 4 类对象 × 3 条现成规则</b><span class="st" id="bSt">0 / 3</span></div>
  <div class="bench-b">
    <div class="a04-board" id="board"></div>
  </div>
  <div class="bench-f">
    <span class="small" id="bHint">点任意一个格子开始。</span>
    <div style="flex:1"></div>
    <button class="btn sm ghost" id="bClear">清空重来</button>
  </div>
</div>
<div class="grid2" style="align-items:start;margin-top:12px">
  <div class="panel" id="moveSlot"></div>
  <div class="panel">
    <div class="panel-h"><h4>已生成的规则</h4><span id="rCnt">0 / 3</span></div>
    <div class="a04-list" id="rList"></div>
  </div>
</div>`,
init(sec,api){
  sec.classList.add('a04-step');
  const S=api.S,x=ensure(S);
  const board=sec.querySelector('#board'),bSt=sec.querySelector('#bSt'),bHint=sec.querySelector('#bHint');
  const moveSlot=sec.querySelector('#moveSlot'),rList=sec.querySelector('#rList'),rCnt=sec.querySelector('#rCnt');

  board.innerHTML='<div class="a04-corner">对象 / 规则</div>'+
    COLS.map(c=>'<div class="a04-colh"><b>'+c.n+'</b><span>'+c.s+'</span></div>').join('')+
    ROWS.map(r=>'<div class="a04-rowlab"><b>'+r.n+'</b><span>'+r.s+'</span></div>'+
      COLS.map(c=>{
        const cell=CELLS[r.k+'.'+c.k];
        return '<button class="a04-cell" data-r="'+r.k+'" data-c="'+c.k+'" title="'+api.esc(cell.base)+'">'+
          '<span class="dot"></span><b>'+cell.t+'</b></button>';
      }).join('')).join('');

  function paintBoard(){
    board.querySelectorAll('.a04-cell').forEach(el=>{
      const key=el.dataset.r+'.'+el.dataset.c;
      const used=x.rules.some(r=>r.cell===key);
      el.classList.toggle('on',x.sel.r===el.dataset.r&&x.sel.c===el.dataset.c);
      el.classList.toggle('used',used);
    });
    const n=x.rules.length;
    bSt.textContent=n+' / '+MIN_RULES;
    bSt.classList.toggle('a04-pass',n>=MIN_RULES);
    bHint.innerHTML=n>=MIN_RULES
      ?('已生成 '+n+' 条。挑一条你愿意拿去用的，下一步会用到。')
      :('还差 '+(MIN_RULES-n)+' 条。每个格子的「脱钩」最容易出新东西。');
    rCnt.textContent=n+' / '+MIN_RULES;
    rCnt.classList.toggle('a04-pass',n>=MIN_RULES);
  }
  function paintMove(){
    if(!x.sel.r||!x.sel.c){
      moveSlot.innerHTML='<div class="panel-h"><h4>改法</h4><span>先点一个格子</span></div>'+
        '<div class="a04-empty">左边 12 个格子里随便点一个。<br>每个格子上方写着它现在的关系，鼠标停一下能看到完整一句。</div>';
      return;
    }
    const key=x.sel.r+'.'+x.sel.c,cell=CELLS[key];
    if(!cell){moveSlot.innerHTML='';return;}
    const r=rowOf(x.sel.r),c=colOf(x.sel.c);
    moveSlot.innerHTML='<div class="panel-h"><h4>'+r.n+' · '+c.n+'</h4><span>当前规则</span></div>'+
      '<p class="a04-base">'+api.esc(cell.base)+'</p>'+
      '<div class="a04-acts">'+ACTS.map(a=>{
        const done=x.rules.some(z=>z.cell===key&&z.act===a.k);
        return '<button class="a04-act'+(done?' done':'')+'" data-act="'+a.k+'">'+
          '<b>'+a.n+'</b><span>'+a.d+'</span><i>'+(done?'✓':'→')+'</i></button>';
      }).join('')+'</div>';
  }
  function paintList(){
    if(!x.rules.length){
      rList.innerHTML='<div class="a04-empty">还没有。点一个格子，选个「反过来」试试——不对再撤回，不用怕。</div>';
      return;
    }
    rList.innerHTML=x.rules.map(r=>{
      const row=rowOf((r.cell.split('.')[0]||''));
      return '<div class="a04-rule"><div class="a04-rtag">'+actOf(r.act).n+
        '<em>'+row.n+'</em></div><p>'+api.esc(r.text)+'</p>'+
        '<button class="a04-undo" data-undo="'+r.id+'">撤回</button></div>';
    }).join('');
  }
  function paintAll(){paintBoard();paintMove();paintList();api.refresh();}

  function gen(act){
    const key=x.sel.r+'.'+x.sel.c,cell=CELLS[key];
    if(!cell){api.toast('先点一个格子');return;}
    if(x.rules.some(z=>z.cell===key&&z.act===act)){api.toast('这条已经生成过了，换一种改法');return;}
    if(x.rules.length>=MAX_RULES){api.toast('6 条够了，先挑一条去用');return;}
    x.rules.push({
      id:key+'.'+act+'.'+Math.random().toString(36).slice(2,7),
      cell:key,act:act,text:cell[act]
    });
    api.save();paintAll();
    api.toast('已生成，可以撤回');
  }

  board.addEventListener('click',e=>{
    const b=e.target.closest('[data-r]');if(!b)return;
    x.sel={r:b.dataset.r,c:b.dataset.c};
    api.save();paintAll();
  });
  moveSlot.addEventListener('click',e=>{
    const b=e.target.closest('[data-act]');if(!b)return;
    gen(b.dataset.act);
  });
  rList.addEventListener('click',e=>{
    const b=e.target.closest('[data-undo]');if(!b)return;
    const id=b.dataset.undo;
    x.rules=x.rules.filter(z=>z.id!==id);
    if(x.useRule===id)x.useRule='';
    api.save();paintAll();api.toast('已撤回');
  });
  sec.querySelector('#bClear').onclick=()=>{
    if(!x.rules.length&&!x.sel.r){api.toast('已经是空的');return;}
    x.rules=[];x.sel={r:'',c:''};x.useRule='';
    api.save();paintAll();api.toast('已清空');
  };
  paintAll();
  sec.__a04=function(){paintAll();};
},
onEnter(){
  const sec=document.querySelector('.step[data-s="2"]');
  if(sec&&sec.__a04)sec.__a04();
},
hint(S){const n=view(S).rules.length;return n>=MIN_RULES?'':'还差 '+(MIN_RULES-n)+' 条规则';},
gate(S){return view(S).rules.length>=MIN_RULES;}},

/* ================= 4 在你的事上 ================= */
{id:'mine',name:'在你的事上',short:'我的',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>把你业务里的那条关系，<em>改一次</em></h1>
<p>找一个「大家都觉得只能这样」的关系。不用改得漂亮，要改得具体：新关系跟什么走，你得说得出来。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>写那条关系（≥10 字）</span>
  <span class="op"><span class="op-n">2</span>用上面生成的规则改写（≥15 字）</span>
  <span class="op"><span class="op-n">3</span>写谁会因此受益</span>
</div>
<div class="grid2" style="align-items:start">
  <div class="stack">
    <div class="panel">
      <div class="panel-h"><h4>① 那条关系</h4><span>≥ 10 字</span></div>
      <div class="field">
        <label>大家都觉得只能这样 <em class="a04-cnt" id="relCnt">0 / 10</em></label>
        <textarea id="relIn" maxlength="90" style="min-height:72px" placeholder="例如：客户等级越高，折扣越大——我们一直这么定价"></textarea>
      </div>
      <div class="hint" style="margin-top:7px">要写出两个变量：谁跟谁绑在一起。只写「行业惯例」不算。</div>
    </div>
    <div class="panel">
      <div class="panel-h"><h4>② 改写</h4><span>≥ 15 字</span></div>
      <div id="rulePick"></div>
      <div class="field" style="margin-top:8px">
        <label>新关系跟什么走 <em class="a04-cnt" id="rewCnt">0 / 15</em></label>
        <textarea id="rewIn" maxlength="120" style="min-height:72px" placeholder="例如：折扣不按客户等级，按这一年实际提了多少工单"></textarea>
      </div>
    </div>
  </div>
  <div class="stack">
    <div class="panel">
      <div class="panel-h"><h4>③ 谁会因此受益</h4><span>≥ 8 字</span></div>
      <div class="field">
        <label>具体到一类人，不是「客户」 <em class="a04-cnt" id="whoCnt">0 / 8</em></label>
        <textarea id="whoIn" maxlength="80" style="min-height:64px" placeholder="例如：一年只买两次、但每次量很大的项目型客户"></textarea>
      </div>
    </div>
    <div class="panel">
      <div class="panel-h"><h4>自查</h4><span>三条同时亮</span></div>
      <div class="a04-chk" id="chk">
        <div class="chk" data-c="two"><i>○</i><b>是两个变量的关系</b><span>能指出谁跟谁绑着</span></div>
        <div class="chk" data-c="new"><i>○</i><b>说清了新关系</b><span>跟什么走，不用「更灵活」</span></div>
        <div class="chk" data-c="who"><i>○</i><b>受益人是一个具体的人</b><span>岗位、客群或一类用户</span></div>
      </div>
    </div>
  </div>
</div>`,
init(sec,api){
  sec.classList.add('a04-step');
  const S=api.S,x=ensure(S);
  const relIn=sec.querySelector('#relIn'),rewIn=sec.querySelector('#rewIn'),whoIn=sec.querySelector('#whoIn');
  const relCnt=sec.querySelector('#relCnt'),rewCnt=sec.querySelector('#rewCnt'),whoCnt=sec.querySelector('#whoCnt');
  const pick=sec.querySelector('#rulePick'),chk=sec.querySelector('#chk');

  function paintPick(){
    if(!x.rules.length){
      pick.innerHTML='<div class="a04-mine-empty"><span>还没有生成规则。先回上一步，在关系板上改 3 条。</span>'+
        '<button class="btn sm" id="backBoard">回关系板</button></div>';
      const b=pick.querySelector('#backBoard');
      if(b)b.onclick=()=>api.go(2);
      return;
    }
    pick.innerHTML='<div class="a04-chiprow">'+x.rules.map(r=>
      '<button class="a04-chip'+(x.useRule===r.id?' on':'')+'" data-use="'+r.id+'" title="'+api.esc(r.text)+'">'+
      '<b>'+actOf(r.act).n+'</b><span>'+api.esc(r.text)+'</span></button>').join('')+'</div>'+
      '<div class="hint">点一条，直接填进下面的框里，再改成你的事。</div>';
  }
  function counters(){
    [[relCnt,x.rel.length,MIN_REL],[rewCnt,x.rewrite.length,MIN_REW],[whoCnt,x.who.length,MIN_WHO]].forEach(t=>{
      t[0].textContent=t[1]+' / '+t[2];
      t[0].classList.toggle('pass',t[1]>=t[2]);
    });
    const t=x.rewrite;
    const rows=[
      ['two',x.rel.trim().length>=MIN_REL],
      ['new',x.rewrite.trim().length>=MIN_REW&&!/更灵活|更好用|更人性/.test(t)],
      ['who',x.who.trim().length>=MIN_WHO]
    ];
    rows.forEach(r=>{
      const el=chk.querySelector('[data-c="'+r[0]+'"]');
      if(!el)return;
      el.classList.toggle('on',r[1]);
      el.querySelector('i').textContent=r[1]?'✓':'○';
    });
  }
  function paintFields(){
    if(relIn.value!==x.rel)relIn.value=x.rel;
    if(rewIn.value!==x.rewrite)rewIn.value=x.rewrite;
    if(whoIn.value!==x.who)whoIn.value=x.who;
    counters();
  }
  function paintAll(){paintPick();paintFields();api.refresh();}

  relIn.addEventListener('input',()=>{x.rel=relIn.value;api.save();counters();api.refresh();});
  rewIn.addEventListener('input',()=>{x.rewrite=rewIn.value;api.save();counters();api.refresh();});
  whoIn.addEventListener('input',()=>{x.who=whoIn.value;api.save();counters();api.refresh();});
  pick.addEventListener('click',e=>{
    const b=e.target.closest('[data-use]');if(!b)return;
    const r=x.rules.filter(z=>z.id===b.dataset.use)[0];if(!r)return;
    x.useRule=r.id;x.rewrite=r.text;
    api.save();paintAll();
  });
  paintAll();
  sec.__a04=function(){paintAll();};
},
onEnter(){
  const sec=document.querySelector('.step[data-s="3"]');
  if(sec&&sec.__a04)sec.__a04();
},
hint(S){const x=view(S);
  const miss=[];
  if(x.rel.trim().length<MIN_REL)miss.push('那条关系');
  if(x.rewrite.trim().length<MIN_REW)miss.push('改写');
  if(x.who.trim().length<MIN_WHO)miss.push('谁受益');
  return miss.length?('还差：'+miss.join(' / ')):'';},
gate(S){const x=view(S);
  return x.rel.trim().length>=MIN_REL&&x.rewrite.trim().length>=MIN_REW&&x.who.trim().length>=MIN_WHO;}},

/* ================= 5 过滤与提交 ================= */
{id:'submit',name:'过滤与提交',short:'过滤',kicker:'STEP 5 · 过滤与提交',
html:`
<div class="step-h"><h1>交之前，<em>先过两个人</em></h1>
<p>一条新关系不可能让所有人受益。先想清楚谁会反对，再想清楚先拿谁试——这两问比点子本身更能决定它活不活。</p></div>
<div class="grid2" style="align-items:start">
  <div class="stack">
    <div class="panel">
      <div class="panel-h"><h4>① 谁现在会反对</h4><span>≥ 8 字</span></div>
      <div class="field">
        <label>写一个岗位或一类人 <em class="a04-cnt" id="agCnt">0 / 8</em></label>
        <textarea id="agIn" maxlength="90" style="min-height:64px" placeholder="例如：靠大客户返点吃饭的渠道经理"></textarea>
      </div>
      <div class="hint" style="margin-top:7px">反对者通常是靠这条关系吃饭的人：提成、审批权、渠道返点。</div>
    </div>
    <div class="panel">
      <div class="panel-h"><h4>② 先在哪一小群人身上试</h4><span>≥ 8 字</span></div>
      <div class="field">
        <label>20 人以内，两周能看出结果 <em class="a04-cnt" id="piCnt">0 / 8</em></label>
        <textarea id="piIn" maxlength="90" style="min-height:64px" placeholder="例如：新签的 8 家项目型客户，先跑一个季度"></textarea>
      </div>
      <div class="hint" style="margin-top:7px">范围要小到能被观察，时间要短到能反悔。</div>
    </div>
    <div class="a04-sub">
      <button class="btn primary" id="subBtn" disabled>提交到班级</button>
      <button class="btn" id="expBtn">导出 PNG</button>
      <span class="small" id="subSt">卡还不完整</span>
    </div>
  </div>
  <div class="stack">
    <div id="cardSlot"></div>
    <div class="panel">
      <div class="panel-h"><h4>同班怎么评这张卡</h4><span>互评口径</span></div>
      <div class="a04-rate">
        <div><b>关系</b><span>原来那条，真的是两个变量的关系吗。</span></div>
        <div><b>具体</b><span>新关系跟什么走，别人能不能复述。</span></div>
        <div><b>阻力</b><span>反对者与试点，是不是具体到能找上门。</span></div>
      </div>
    </div>
  </div>
</div>`,
init(sec,api){
  sec.classList.add('a04-step');
  const S=api.S,x=ensure(S);
  const agIn=sec.querySelector('#agIn'),piIn=sec.querySelector('#piIn');
  const agCnt=sec.querySelector('#agCnt'),piCnt=sec.querySelector('#piCnt');
  const slot=sec.querySelector('#cardSlot'),subBtn=sec.querySelector('#subBtn'),subSt=sec.querySelector('#subSt');

  function counters(){
    [[agCnt,x.against.length,MIN_Q],[piCnt,x.pilot.length,MIN_Q]].forEach(t=>{
      t[0].textContent=t[1]+' / '+t[2];
      t[0].classList.toggle('pass',t[1]>=t[2]);
    });
  }
  function paintCard(){
    const miss=needRows(x).filter(r=>!r.ok).map(r=>r.k);
    const c=L.card(S);
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A04</span><span>关系改写卡</span></div>'+
      '<h5>'+api.esc(c.title)+'</h5><div class="kv">'+
      c.rows.map(r=>'<div><b>'+api.esc(r[0])+'</b><span class="'+(r[1]&&r[1]!=='—'?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+
      '</div></div>'+
      (miss.length
        ?'<div class="a04-miss">还欠：'+api.esc(miss.join(' · '))+'</div>'
        :'<div class="a04-miss a04-done">卡齐了。提交后进入班级互评池。</div>');
  }
  function paintSubmit(){
    const ok=fullGate(x);
    subBtn.disabled=!!S.submitted||!ok;
    subBtn.textContent=S.submitted?'已提交':'提交到班级';
    subSt.textContent=S.submitted?'已提交 · 进入互评池':(ok?'可以提交':'卡还不完整');
    subSt.classList.toggle('a04-pass',!!S.submitted||ok);
  }
  function paintAll(){
    if(agIn.value!==x.against)agIn.value=x.against;
    if(piIn.value!==x.pilot)piIn.value=x.pilot;
    counters();paintCard();paintSubmit();api.refresh();
  }
  agIn.addEventListener('input',()=>{x.against=agIn.value;api.save();counters();paintCard();paintSubmit();api.refresh();});
  piIn.addEventListener('input',()=>{x.pilot=piIn.value;api.save();counters();paintCard();paintSubmit();api.refresh();});
  subBtn.onclick=async()=>{
    if(!fullGate(x)){api.toast('卡还不完整，先补齐');return;}
    subBtn.disabled=true;subBtn.textContent='提交中…';
    try{await api.submit();}catch(e){api.toast('提交出错，已存本机');}
    paintAll();
  };
  sec.querySelector('#expBtn').onclick=()=>api.exportCard();
  paintAll();
  sec.__a04=function(){paintAll();};
},
onEnter(){
  const sec=document.querySelector('.step[data-s="4"]');
  if(sec&&sec.__a04)sec.__a04();
},
hint(S){const x=view(S);return (x.against.trim().length>=MIN_Q&&x.pilot.trim().length>=MIN_Q)?'':'两个问题都写上才能提交';},
gate(S){const x=view(S);return x.against.trim().length>=MIN_Q&&x.pilot.trim().length>=MIN_Q;}},

/* ================= 6 收束 ================= */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>今天带走<em>三件事</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel a04-take"><div class="a04-tn">01</div>
    <b>关系不是规则</b>
    <p>「苹果必须整个分」「价格必须按成本加成」——听上去像规矩，其实都是关系被当成了规矩。规矩有人签过字，关系没有。</p></div>
  <div class="panel a04-take"><div class="a04-tn">02</div>
    <b>只有三种改法</b>
    <p>反过来、脱钩、加一个条件。改完要说得出「新关系跟什么走」，否则它只是换了个形容词。</p></div>
  <div class="panel a04-take"><div class="a04-tn">03</div>
    <b>一次只改一条</b>
    <p>同时改三条，你无法判断是哪条起了作用。新关系最贵的成本不是设计，是验证。</p></div>
</div>
<div class="panel a04-next">
  <div class="panel-h"><h4>下一节 · A05</h4><span>组织的猴子实验</span></div>
  <div class="a04-next-body">
    <svg viewBox="0 0 120 96" class="a04-next-svg" aria-hidden="true">
      <rect x="8" y="6" width="104" height="82" rx="4" fill="none" stroke="#33415A"/>
      <path d="M22 88V6M34 88V6M46 88V6M58 88V6M70 88V6M82 88V6M94 88V6M106 88V6" stroke="#232D3D"/>
      <path d="M26 80V44M38 80V44M26 52h12M26 62h12M26 72h12" stroke="#C9A227" stroke-opacity=".7"/>
      <path d="M84 42c7-3 12 1 12 6 0 5-5 8-10 7-2-.6-3.4-2-3-4" fill="none" stroke="#E6C766" stroke-linecap="round"/>
      <path d="M102 24c0-4 2.5-6.5 2.5-6.5S107 20 107 24a2.5 2.5 0 0 1-5 0z" fill="none" stroke="#5B8DEF"/>
      <path d="M104.5 32v7" stroke="#5B8DEF" stroke-dasharray="2 2" opacity=".75"/>
      <g fill="none" stroke="#8D97AA">
        <circle cx="54" cy="77" r="4"/><circle cx="64" cy="79" r="4"/><circle cx="74" cy="77" r="4"/>
        <circle cx="59" cy="68" r="3"/><circle cx="69" cy="67.5" r="3"/>
      </g>
    </svg>
    <div>
      <p class="a04-next-p">笼子里五只猴子。谁爬梯子拿香蕉，全场被冷水浇。后来换进新猴子——它一爬，就被老猴子打。打它的那几只，自己也没被浇过。</p>
      <p class="small" style="margin-top:6px">下一节看：组织里那些「不能这么做」，是谁定的，为什么没人再问。</p>
    </div>
  </div>
  <div class="row" style="margin-top:12px">
    <a class="btn primary" href="index.html">回到课程地图</a>
    <button class="btn" id="againBtn">重看这一节</button>
  </div>
</div>`,
init(sec,api){sec.classList.add('a04-step');sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '你说的「只能这样」，是客户定的、监管定的，还是你们自己一直这么做？',
 '这条关系如果反过来，谁的收入会立刻变少？',
 '脱钩之后，价格（或服务）该跟哪个变量走？那个变量你们现在测得到吗？',
 '谁会因为这条新关系受益？具体到一个岗位或一类客户。',
 '如果只在一个小群里试两周，你用什么判断它成立？'
]},

card(S){
  const x=view(S);const st=ruleStats(x);
  const parts=[];
  if(st.inv)parts.push('反过来 '+st.inv);
  if(st.dec)parts.push('脱钩 '+st.dec);
  if(st.add)parts.push('加条件 '+st.add);
  return {title:'A04 · 我的关系改写卡',rows:[
    ['生成规则',x.rules.length+' 条'+(parts.length?'（'+parts.join(' · ')+'）':'')],
    ['原来那条',x.rel||'—'],
    ['新关系',x.rewrite||'—'],
    ['谁受益',x.who||'—'],
    ['谁反对',x.against||'—'],
    ['先在哪试',x.pilot||'—']
  ]};
},

notes:[
 {t:'本节目标',h:'让学员看见：固着不只在物件上，也在「谁跟谁绑着」上。验收标准不是点子新，是<b>能说出改了哪条关系、新关系跟什么走</b>。'},
 {t:'时间分配（45′）',h:'自学 27′：谜题 4′ · 定义与二选一 7′ · 关系板 10′ · 自己的改写 6′。直播 13′：只讲 3 张卡与 2 条生成的规则。提交与互评 5′。'},
 {t:'常见卡点',h:'① 把「加一个功能」当成改关系：追问「哪个变量现在跟着哪个变量动了」；② 改写只写「更灵活、更人性」：要求说出「跟什么走」；③ 反对者写「领导不支持」：追问「这条关系一变，谁的钱少拿了」。'},
 {t:'直播怎么接',h:'打开直播中控，先看学员生成的规则：<b>挑 2 条还把价格死死绑在成本上的</b>，再挑 1 条把关系接到一个他们自己测不到的变量上的（那是伪相关）。现场只问一句：<b>「这条新关系，谁的收入会变少？」</b>让全班在弹幕里答，再回到三种改法：反过来 / 脱钩 / 加条件。'},
 {t:'判分口径',h:'原来那条是不是两个变量的关系 40%；新关系是否具体到「跟什么走」30%；受益人与试点范围是否具体 30%。不评点子新不新，评说清没说清。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A04']=L;
})();
