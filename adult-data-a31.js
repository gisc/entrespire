/* A31 · AVM 上：从属性到价值 · 属性 → 价值 */
(function(){
'use strict';

const MAXLEN=24;
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s==null?'':s).replace(/\s+/g,' ').trim();

/* ---------- 案例素材 ---------- */
const HOOKS=[
  {k:'a',t:'很便宜',s:'一次性剃须刀，便宜到不用比价'},
  {k:'b',t:'随处能买到',s:'便利店、酒店前台、自动售货机都有'},
  {k:'c',t:'用完就扔不心疼',s:'不用洗、不用带，丢了再买一支'},
  {k:'d',t:'质量一般',s:'刀片两三次就钝，刮不太干净'}
];
const HOOK_SAY={
  a:{l:'还停在属性层 · 价格',h:'便宜是客观的：它写在价签上，对所有人都成立。但它不是价值——没有人为了"便宜"两个字买单，人买的是便宜之后能做的事。'},
  b:{l:'还停在属性层 · 渠道',h:'随处能买到是事实，也是 BIC 最硬的一条属性。但它仍然是关于产品的话，不是关于人的话。'},
  c:{l:'走到第二层 · 后果',h:'"不心疼"已经离开产品、落到人身上了。它离价值只差一步：不心疼之后，人省下来的到底是什么？'},
  d:{l:'不是价值 · 是判断',h:'"质量一般"是评价，而且对 BIC 是负向的。价值不要求产品好，只要求它对人有用——这两件事经常相反。'}
};
const BIC=['是 BIC 品牌的','一支几块钱，缺了就补','出差在便利店也能买到','早上不用为它做计划','不用为它做决定'];

const TEST_OPTS=[
  {k:'a',t:'杯身用的是 316 不锈钢',s:'材料和工艺'},
  {k:'b',t:'早上灌满，下午开会水还是热的',s:'可测量的结果'},
  {k:'c',t:'一天不用往茶水间跑',s:'行为上的便利'},
  {k:'d',t:'同事觉得你是个过得讲究的人',s:'别人对你的判断'}
];
const TEST_SAY={
  a:{ok:false,h:'A 是属性。材料写在产品上，换谁来听都同意——它还没有离开产品。'},
  b:{ok:false,h:'B 是可核实的后果：温度能测，所有人都同意。它比 A 靠右，但仍在"产品能做什么"这一侧。'},
  c:{ok:false,h:'C 已经接近价值，很多 B2B 生意就卖 C。但它停在行为层，容易被对手一句"我们也能"抹平。'},
  d:{ok:true,h:'D 站在最右边。它因人而异——换一个不在乎别人怎么看的人，这句就不成立。价值从来不追求"对所有人都成立"，那正是它和属性的分野。'}
};

const PRODUCTS=[
  {k:'cup',n:'自家保温杯',sub:'消费品 · 低单价',attrs:['316 不锈钢内胆','容量 500ml','保温 12 小时','杯盖可整只拆开洗','杯身可激光刻字']},
  {k:'saas',n:'一款 SaaS 工具',sub:'B2B · 订阅制',attrs:['浏览器打开就能用','按月订阅，随时停','提供开放 API','数据存在境内','新员工 10 分钟上手']},
  {k:'train',n:'一次企业培训',sub:'服务 · 按班交付',attrs:['线下集中 2 天','讲师做过同行业项目','30 人小班','案例用学员自己的产品','结课交一份落地方案']}
];
const AT_PH=['材料 / 成分','尺寸 / 容量','时长 / 频次','价格 / 条款','渠道 / 服务'];
const LINT_JUDGE=/高端|优质|领先|舒适|很好|非常好|极致|顶级|贴心|人性化|性价比高|有品质|专业感/;
const LINT_FACT=/\d|不锈钢|陶瓷|钛|铝|铜|木|棉|麻|玻璃|硅胶|塑料|免费|元|折|%|月|年|天|小时|分钟|门店|线上|境内|API|接口|可拆|可洗|可刻|刻字|激光|保温|容量|ml|拆开|清洗|水洗|自动|支持|提供|包含|含|承诺|质保|认证|小班/;

/* 本地追问模板：AI 不在线时也有下一句，且只给一句、不给答案 */
const TPL={
  integ:[[['不用为它改现有流程'],['数据能自己流过去']],[['不用两个系统各录一遍'],['换工具不用搬家']],[['团队不为工具吵架'],['系统跟着业务长']]],
  avail:[[['缺了随时能补上'],['不用提前囤']],[['临时出事也有退路'],['出差在外不至于抓瞎']],[['不用为它做计划'],['意外来了也接得住']]],
  cost:[[['买错了也不心疼'],['不用等促销再决定']],[['试新东西的门槛变低'],['这笔钱不用跟人解释']],[['不用为它做决定'],['钱花在更值的地方']]],
  trust:[[['关键时刻不掉链子'],['出问题之前就被挡住']],[['不用留人盯着'],['家里人用我也不担心']],[['敢把更重要的事交给它'],['我是个可以被托付的人']]],
  easy:[[['第一次用就会'],['不用看说明书']],[['新人不用培训'],['不用专门安排一个人管']],[['团队里没人需要当专家'],['换了谁都能接上']]],
  identity:[[['别人看得出这是你的'],['不是货架上那一批']],[['送出去像认真准备过'],['客户记得住是谁给的']],[['被当成讲究的人'],['关系不用靠话说']]],
  durable:[[['不用小心伺候它'],['磕一下也不影响用']],[['不用一年换一次'],['借给别人也不担心']],[['买一次就把它忘掉'],['东西不坏，人就不被打断']]],
  service:[[['出问题有人接'],['不用自己摸索']],[['第一次做也不会跑偏'],['老板问起来有依据']],[['敢把这件事交给外面的人'],['团队少走一年弯路']]],
  spec:[[['一次给够，不用买两个凑'],['该有的量它都有']],[['家里少一件占地方的东西'],['不用为凑单再下一单']],[['空间和时间留给更重要的事'],['不为小事再跑一趟']]],
  def:[[['用的时候不用再想它'],['不必为它额外准备']],[['手上的事能接着做'],['少一次中途打断']],[['注意力留给更重要的事'],['日子过得顺一点']]]
};
const CATS=[
  ['integ',/API|接口|集成|兼容|开放|导出|对接|系统/i],
  ['avail',/随处|门店|线上|便利店|当天|立刻|即时|随时|24 小时|全年|不打烊|现货/],
  ['cost',/便宜|低价|免费|订阅|按月|按年|折扣|价格|不贵|性价比/],
  ['trust',/安全|稳|可靠|不坏|质保|保固|承诺|兜底|认证|合规|保险|保密|境内|私有化/],
  ['easy',/简单|易|上手|无需|不用学|自动|一键|分钟|零门槛|免培训|打开就能/],
  ['identity',/定制|刻字|专属|联名|限量|配色|手工|签名|礼盒/],
  ['durable',/不锈钢|陶瓷|钛|铝|铜|木|棉|麻|一体|无缝|可拆|可洗|加厚|加固|防水/],
  ['service',/讲师|顾问|陪跑|响应|服务|案例|小班|驻场|回访|答疑|交付|线下|集中/],
  ['spec',/\d|容量|尺寸|重量|长度|口径|毫升|升|克|小时|天|年|层|档/]
];
function classify(t){
  const s=norm(t);
  for(let i=0;i<CATS.length;i++){if(CATS[i][1].test(s))return CATS[i][0];}
  return 'def';
}
function suggest(t,li,seed){
  const set=TPL[classify(t)]||TPL.def;
  const arr=set[li]||set[2];
  return arr[(((seed||0)+li*1)%arr.length+arr.length)%arr.length].slice(0,MAXLEN);
}

/* ---------- 数据形状 ---------- */
function ensure(a){
  const old=Array.isArray(a.attrs)?a.attrs:[];
  a.attrs=[0,1,2,3,4].map(i=>({text:norm(old[i]&&old[i].text)}));
  a.chains=a.chains||{};
  for(let i=0;i<5;i++){const k='at'+i;if(!Array.isArray(a.chains[k]))a.chains[k]=['','',''];}
  a.src=a.src||{};
  if(!Array.isArray(a.picks))a.picks=[];
  return a;
}
function attrs(a){
  return (a.attrs||[]).map((x,i)=>({i:i,key:'at'+i,text:norm(x&&x.text)})).filter(x=>x.text);
}
function depth(a,k){
  const c=a.chains[k]||[];let d=0;
  while(d<3&&norm(c[d]))d++;
  return d;
}
function endpoints(a){
  const out=[];
  attrs(a).forEach(x=>{
    const d=depth(a,x.key);if(d<2)return;
    const t=norm(a.chains[x.key][d-1]);
    if(!t)return;
    out.push({key:x.key,idx:d-1,text:t,attr:x.text,depth:d});
  });
  return out;
}
function endpointKeys(a){return endpoints(a).map(e=>e.key+':'+e.idx);}
function chainOf(a,x){return (a.chains[x.key]||['','','']).slice(0,3);}
function deepest(a){
  let best=null;
  attrs(a).forEach(x=>{
    const d=depth(a,x.key);
    if(!best||d>best.d)best={d:d,x:x,chain:chainOf(a,x)};
  });
  if(!best||best.d===0)return null;
  return best;
}
function chainLine(a,x){
  const d=depth(a,x.key);
  if(!d)return '';
  return norm(x.text)+'：'+chainOf(a,x).slice(0,d).map(norm).join(' → ');
}

/* ---------- 价值树（HTML/CSS，不用 canvas） ---------- */
function treeHTML(a){
  const list=attrs(a);
  if(!list.length)return '<div class="a31-ghost"><div class="a31-ghost-h">示例 · 一条属性走三跳。你的五条会替换掉它</div>'+
    '<div class="a31-tree"><div class="a31-tree-h"><span>属性 · 客观</span><span></span><span>So what ①</span><span></span><span>So what ②</span><span></span><span>So what ③ · 价值</span></div>'+
    '<div class="a31-tb"><div class="a31-tn at"><i>1</i><b>是 BIC 品牌的</b></div><div class="a31-ta">→</div>'+
    '<div class="a31-tn">一支几块钱，缺了就补</div><div class="a31-ta">→</div>'+
    '<div class="a31-tn">出差也买得到</div><div class="a31-ta">→</div>'+
    '<div class="a31-tn val">不用为它做决定</div></div></div>'+
    '<div class="a31-empty" style="margin-top:8px">还没有属性。回第 3 步写五条，这里会按你的属性分枝。</div></div>';
  const ends=endpoints(a);
  const iso={};ends.forEach(e=>{iso[e.text]=(iso[e.text]||0)+1;});
  let h='<div class="a31-tree"><div class="a31-tree-h">'+
    '<span>属性 · 客观</span><span></span><span>So what ①</span><span></span><span>So what ②</span><span></span><span>So what ③ · 价值</span>'+
    '</div>';
  list.forEach((x,bi)=>{
    const c=chainOf(a,x),d=depth(a,x.key);
    h+='<div class="a31-tb"><div class="a31-tn at"><i>'+(bi+1)+'</i><b>'+esc(x.text)+'</b></div>';
    for(let i=0;i<3;i++){
      h+='<div class="a31-ta'+(i>=d?' dim':'')+'">→</div>';
      const v=norm(c[i]);
      if(v){
        const end=(i===d-1&&d>=2);
        h+='<div class="a31-tn'+(end?' val':'')+'">'+esc(v)+(end&&iso[v]===1?'<em class="a31-iso">孤立</em>':'')+'</div>';
      }else if(i===d){
        h+='<div class="a31-tn empty">待填</div>';
      }else{
        h+='<div class="a31-tn void"></div>';
      }
    }
    h+='</div>';
  });
  h+='</div><div class="a31-legend"><span>→ 每跳一层，主语从产品换到人</span><span class="a31-lgv">绿框 = 这条链目前的价值末端</span><span>「孤立」= 只有这一条链通向它</span></div>';
  return h;
}

const R={};

const L={
id:'A31',week:8,seq:31,title:'AVM 上：从属性到价值',
kicker:'WEEK 8 · 属性价值地图',tool:'avm',toolName:'属性价值地图',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>一句属性，<em>离客户有多远</em></h1>
<p>「这把剃须刀是 BIC 品牌的。」这是一条属性：客观、可核实、对所有人都成立。先别往价值上跳——你觉得，它在客户那里最先变成什么？</p></div>
<div class="a31-claim">
  <div class="a31-claim-h"><span>属性 · ATTRIBUTE</span><span>客观 · 可核实</span></div>
  <p>这把剃须刀是 <b>BIC 品牌</b>的。</p>
</div>
<div class="panel" style="margin-top:12px">
  <div class="panel-h"><h4>你的第一反应</h4><span>单选 · 四个都不算错</span></div>
  <div class="opts">
  ${HOOKS.map(o=>`<button class="opt" data-h="${o.k}"><span class="k">${o.k.toUpperCase()}</span><span><b>${o.t}</b><span>${o.s}</span></span></button>`).join('')}
  </div>
  <div id="hookOut" style="margin-top:12px"></div>
</div>`,
init(sec,api){
  const S=api.S;
  const out=sec.querySelector('#hookOut');
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',S.answers.hook===b.dataset.h));
    const k=S.answers.hook;
    if(!k){out.innerHTML='';return;}
    const say=HOOK_SAY[k]||HOOK_SAY.a;
    out.innerHTML='<div class="a31-reveal">'+
      '<div class="a31-reveal-h"><span>你停在哪一层</span><span>'+esc(say.l)+'</span></div>'+
      '<p>'+esc(say.h)+'</p>'+
      '<div class="a31-mini">'+BIC.map((t,i)=>'<span class="a31-mini-i'+(i===BIC.length-1?' v':'')+'">'+esc(t)+'</span>'+(i<BIC.length-1?'<em>→</em>':'')).join('')+'</div>'+
      '<p class="a31-mini-note">这是 BIC 官方 AVM 里的一条链。四个选项没有一个是错答案，它们只是都停在了河的左岸：<b>关于产品</b>。而价值在右岸——<b>关于人</b>。</p>'+
      '<p class="a31-mini-note">同一条属性还能分叉：职业那条链走到「在客户面前始终体面」，再走到「声誉好、升迁顺」。一条属性，几棵树。</p>'+
      '</div>';
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{S.answers.hook=b.dataset.h;api.save();paint();api.refresh();});
  paint();
},
gate(S){return !!S.answers.hook;}},

/* ---------- 2 概念 ---------- */
{id:'concept',name:'概念',short:'概念',kicker:'STEP 2 · 概念',
html:`
<div class="step-h"><h1>左边是产品，<em>右边是人</em></h1>
<p>AVM 只有两列：属性往右追问，长成价值。工具不复杂，难的是你愿不愿意承认——你平时说的卖点，大多还站在左边。</p></div>
<div class="grid2" style="margin-bottom:12px">
  <div class="panel a31-def">
    <div class="panel-h"><h4>属性层</h4><span>左岸</span></div>
    <p class="a31-def-p">关于产品的话：客观、可核实、对所有人成立。</p>
    <div class="a31-eg">316 不锈钢 · 保温 12 小时 · 一支 4 块钱</div>
    <p class="small">检验：换一个人来听，他会不会同意？会，就是属性。</p>
  </div>
  <div class="panel a31-def a31-def-v">
    <div class="panel-h"><h4>价值层</h4><span>右岸</span></div>
    <p class="a31-def-p">关于人的话：主观、因人而异、常常说不清。</p>
    <div class="a31-eg">开会到下午不用分心 · 在客户面前不出丑</div>
    <p class="small">检验：换一个人来听，他可能不同意。不同意，才是价值。</p>
  </div>
</div>
<div class="panel" style="margin-bottom:12px">
  <div class="panel-h"><h4>So what 追问法</h4><span>唯一固定句式</span></div>
  <div class="a31-askq">这对我来说，意味着什么？</div>
  <div class="grid3 a31-rules">
    <div><b>一句只走一步</b><span>把"所以"换成"然后呢"。一步跨两层，中间那层往往是你没想清的地方。</span></div>
    <div><b>每步换主语</b><span>产品 → 用它的人 → 他在意的人。主语不换，说的还是产品。</span></div>
    <div><b>停在有人愿意付钱处</b><span>愿意多付一笔、多走一步、多担一次风险，这三件事出现，链就到岸了。</span></div>
  </div>
  <p class="hint" style="margin-top:10px">什么时候别用：属性根本写不出来（你还不了解这个产品）；追问停在"更好用、更高端"（那是形容词，不是价值）；五条链全通向同一个词（你没有分人）。</p>
</div>
<div class="grid2" style="margin-bottom:12px;align-items:start">
  <div class="panel">
    <div class="panel-h"><h4>连接的强弱</h4><span>决定差异化</span></div>
    <div class="a31-conn">
      <div class="a31-conn-h"><b>强连接</b><span>一问就到</span><div class="a31-strg"><i style="width:100%"></i></div></div>
      <div class="a31-hops"><span>24 小时不停机</span><em>→</em><span>半夜不用被叫起来</span></div>
      <p class="hint">写起来轻松，但对手也能说。强连接做不出差异化。</p>
      <div class="a31-conn-h" style="margin-top:11px"><b>弱连接</b><span>要绕三跳</span><div class="a31-strg weak"><i style="width:34%"></i></div></div>
      <div class="a31-hops v"><span>是 BIC 品牌</span><span>出差也买得到</span><span>早上不用计划</span><span>不用为它做决定</span></div>
      <p class="hint">每多一跳，能跟上来的人就少一批。第三跳开始，说的已经不是产品，是人。</p>
    </div>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>五层示范 · VOLVO</h4><span>同一条属性，五次追问</span></div>
    <div class="a31-chain">
      <div class="a31-chain-i"><span class="a31-chain-n">01</span><b>坚固车架与城市安全系统</b><em>属性</em></div>
      <div class="a31-chain-i"><span class="a31-chain-n">02</span><b>碰撞时乘员舱不变形</b><em>后果</em></div>
      <div class="a31-chain-i"><span class="a31-chain-n">03</span><b>家里人受的伤更轻</b><em>后果</em></div>
      <div class="a31-chain-i"><span class="a31-chain-n">04</span><b>敢让孩子自己坐后排</b><em>意义</em></div>
      <div class="a31-chain-i v"><span class="a31-chain-n">05</span><b>我是一个把家人放在前面的人</b><em>价值</em></div>
    </div>
    <p class="hint" style="margin-top:8px">同一条链还切出三个细分：新手父母、成年子女的父母、需要"可靠"形象的商务人士。</p>
  </div>
</div>
<div class="panel">
  <div class="panel-h"><h4>分界线测试</h4><span>哪一句已经站在价值层</span></div>
  <div class="opts">
  ${TEST_OPTS.map(o=>`<button class="opt" data-t="${o.k}"><span class="k">${o.k.toUpperCase()}</span><span><b>${o.t}</b><span>${o.s}</span></span></button>`).join('')}
  </div>
  <div id="testOut" style="margin-top:10px"></div>
</div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#testOut');
  function paint(){
    sec.querySelectorAll('[data-t]').forEach(b=>b.classList.toggle('on',S.answers.line===b.dataset.t));
    const k=S.answers.line;
    if(!k){out.innerHTML='';return;}
    const say=TEST_SAY[k]||TEST_SAY.a;
    out.innerHTML='<div class="a31-treveal" style="'+(say.ok?'border-color:rgba(78,159,110,.45);background:rgba(78,159,110,.08)':'')+'">'+
      '<b>'+(say.ok?'这一句在右岸':'这一句还在左岸')+'</b><span>'+esc(say.h)+'</span></div>';
  }
  sec.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{S.answers.line=b.dataset.t;api.save();paint();api.refresh();});
  paint();
},
gate(S){return !!S.answers.line;}},

/* ---------- 3 工作台：属性 ---------- */
{id:'attr',name:'属性',short:'属性',kicker:'STEP 3 · 工作台',
html:`
<div class="step-h"><h1>先把产品<em>拆成五条事实</em></h1>
<p>属性不是卖点，是事实：材料、尺寸、时长、价格、条款。写不满五条，通常不是产品太简单，是你没看过它的说明书。</p></div>
<div class="panel">
  <div class="panel-h"><h4>1 · 选一个产品</h4><span>预设只是起点</span></div>
  <div class="chips" id="prods">${PRODUCTS.map(p=>`<button class="chip" data-p="${p.k}">${p.n}</button>`).join('')}</div>
  <div class="field" style="margin-top:10px"><label>或自己写一个</label><input id="prodIn" maxlength="24" placeholder="例如：公司的报销流程"></div>
  <div class="hint" id="prodHint" style="margin-top:7px">换成你自己的产品，这张图才有用。预设的产品只是给你看形状。</div>
</div>
<div class="panel" style="margin-top:12px">
  <div class="panel-h"><h4>2 · 五条属性</h4><span id="attrSt">0 / 5</span></div>
  <div class="a31-ats" id="ats"></div>
  <div class="row" style="margin-top:8px"><span class="hint" style="flex:1">点任意一条就能改。只写五条——写不下，说明你还没决定哪条重要。</span>
  <button class="btn sm ghost" id="clearAt">清空</button></div>
</div>
<div class="panel" style="margin-top:12px">
  <div class="panel-h"><h4>属性体检</h4><span>不拦你，只提醒</span></div>
  <div class="grid3" id="health">
    <div class="chk" data-c="n"><i>○</i><b>五条都写满</b><span>少于五条，地图会长歪</span></div>
    <div class="chk" data-c="j"><i>○</i><b>没有形容词</b><span>"高端、舒适"是判断，别人没法核实</span></div>
    <div class="chk" data-c="f"><i>○</i><b>每条都能被第三方核实</b><span>有量、有材料、有条款、有渠道</span></div>
  </div>
  <p class="hint" id="healthNote" style="margin-top:8px"></p>
</div>`,
init(sec,api){
  const S=api.S,a=ensure(S.answers);
  const ats=sec.querySelector('#ats'),prodIn=sec.querySelector('#prodIn'),st=sec.querySelector('#attrSt'),
        note=sec.querySelector('#healthNote');
  let pending=null;

  function rowHTML(i,t){
    return '<div class="a31-at"><span class="a31-at-n">0'+(i+1)+'</span>'+
      '<input class="a31-at-i" data-i="'+i+'" maxlength="20" value="'+esc(t)+'" placeholder="'+AT_PH[i]+'">'+
      '<span class="a31-at-w" data-w="'+i+'"></span></div>';
  }
  function fillRows(){
    ats.innerHTML=a.attrs.map((x,i)=>rowHTML(i,x.text)).join('');
    ats.querySelectorAll('input').forEach(inp=>{
      inp.addEventListener('input',()=>{
        a.attrs[+inp.dataset.i].text=inp.value;
        api.save();paintStatus();api.refresh();
      });
    });
  }
  function paintStatus(){
    const list=attrs(a),n=list.length;
    const judges=list.filter(x=>LINT_JUDGE.test(x.text)).length;
    const facts=list.filter(x=>LINT_FACT.test(x.text)).length;
    st.textContent=n+' / 5';
    st.style.color=n>=5?'var(--ok)':'';
    a.attrs.forEach((x,i)=>{
      const el=ats.querySelector('[data-w="'+i+'"]');if(!el)return;
      const msg=lintMsg(x.text);
      el.textContent=msg||'';
      el.className='a31-at-w'+(msg?' warn':'');
    });
    const c1=n>=5,c2=n>=5&&judges===0,c3=n>=5&&facts>=5;
    [['n',c1],['j',c2],['f',c3]].forEach(([k,on])=>{
      const el=sec.querySelector('#health [data-c="'+k+'"]');
      el.classList.toggle('on',on);el.querySelector('i').textContent=on?'✓':'○';
    });
    note.textContent = n<5?('还差 '+(5-n)+' 条。')
      : (judges?('有 '+judges+' 条是判断，不是属性。换成能被查的东西：价格、材料、时长、条款。')
      : (facts<5?('有 '+(5-facts)+' 条缺可核实的量。补一个数字、材料或条款。')
      : '五条都能被第三方核实。可以往右追问了。'));
  }
  function lintMsg(t){
    const s=norm(t);if(!s)return '';
    if(LINT_JUDGE.test(s))return '这是判断';
    if(!LINT_FACT.test(s))return '缺一个可核实的量';
    return '';
  }
  function paintAll(){
    sec.querySelectorAll('[data-p]').forEach(b=>b.classList.toggle('on',a.prodKey===b.dataset.p));
    prodIn.value=a.prodKey?'':(a.prod||'');
    const cur=PRODUCTS.find(p=>p.k===a.prodKey);
    sec.querySelector('#prodHint').textContent=cur?('已用预设「'+cur.n+'」· '+cur.sub+'。点任意一条都能改。'):'换成你自己的产品，这张图才有用。预设的产品只是给你看形状。';
    fillRows();paintStatus();
  }
  function usePreset(p){
    const cur=a.attrs.map(x=>norm(x.text)).filter(Boolean);
    const same=p.attrs.every((t,i)=>cur[i]===t)&&cur.length===5;
    if(same&&a.prodKey===p.k){api.toast('已经是这五条了。可以直接改，也可以往下走。');return;}
    if(cur.length&&!same&&pending!==p.k){
      pending=p.k;api.toast('再点一次，会覆盖你现在的五条属性');
      setTimeout(()=>{if(pending===p.k)pending=null;},2600);
      return;
    }
    pending=null;
    a.prod=p.n;a.prodKey=p.k;
    a.attrs=p.attrs.map(t=>({text:t}));
    a.chains={};a.src={};a.picks=[];a.opp='';a.oppPlan='';
    api.save();paintAll();api.refresh();
    api.toast('已填入五条属性。往下走，开始追问。');
  }
  sec.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{
    const p=PRODUCTS.find(x=>x.k===b.dataset.p);if(p)usePreset(p);
  });
  prodIn.addEventListener('input',()=>{
    a.prod=prodIn.value;a.prodKey='';
    api.save();paintStatus();api.refresh();
  });
  sec.querySelector('#clearAt').onclick=()=>{
    a.attrs=a.attrs.map(()=>({text:''}));a.chains={};a.src={};a.picks=[];a.opp='';
    api.save();paintAll();api.refresh();
  };
  paintAll();
  R.attr=paintAll;
},
gate(S){return attrs(ensure(S.answers)).length>=5;}},

/* ---------- 4 追问链 ---------- */
{id:'sowhat',name:'追问',short:'追问',kicker:'STEP 4 · 追问链',
html:`
<div class="step-h"><h1>每一步只问一句：<em>这对我来说意味着什么</em></h1>
<p>一层一层往右走，主语会从产品换成人。三层不一定到岸，但两层之后你已经说不出"参数"了——那才是开始。</p></div>
<div class="panel" style="margin-bottom:12px">
  <div class="panel-h"><h4>追问进度</h4><span id="swSt">0 / 3 条链达标</span></div>
  <div class="meter"><i id="swBar" style="width:0%"></i></div>
  <div class="hint" id="swSub" style="margin-top:7px"></div>
</div>
<div class="panel" style="margin-bottom:12px">
  <div class="panel-h"><h4>价值树</h4><span>边填边长 · 不用等做完</span></div>
  <div id="tree"></div>
</div>
<p class="a31-note">AI 只负责问，不负责答：它把下一问推到右栏，句子由本地模板给出，你可以直接改成自己的话。改过的句子不再算"建议"。</p>
<div id="branches" class="stack"></div>`,
init(sec,api){
  const S=api.S,a=ensure(S.answers);
  const box=sec.querySelector('#branches'),tree=sec.querySelector('#tree'),
        st=sec.querySelector('#swSt'),bar=sec.querySelector('#swBar'),sub=sec.querySelector('#swSub');

  function branchHTML(x,bi){
    const c=chainOf(a,x);
    let h='<div class="panel a31-branch" data-k="'+x.key+'">'+
      '<div class="a31-branch-h"><div><span class="a31-bn">ATTR '+(bi+1)+'</span><b>'+esc(x.text)+'</b></div>'+
      '<button class="btn sm ghost a31-ai" data-k="'+x.key+'">AI 帮我追问</button></div><div class="a31-rows">';
    for(let i=0;i<3;i++){
      const src=a.src[x.key+':'+i]?'建议 · 可改写':'';
      h+='<div class="a31-row'+(norm(c[i])?' filled':'')+'" data-k="'+x.key+'" data-i="'+i+'">'+
        '<span class="a31-rl">'+(i+1)+'</span>'+
        '<input data-k="'+x.key+'" data-i="'+i+'" maxlength="'+MAXLEN+'" value="'+esc(c[i]||'')+'" placeholder="'+(i===0?'这条属性，直接带来什么？':'这对我，意味着什么？')+'">'+
        '<span class="a31-rc">'+norm(c[i]).length+'/24</span>'+
        '<span class="a31-rs">'+src+'</span></div>';
    }
    h+='</div></div>';
    return h;
  }
  function renderBranches(){
    const list=attrs(a);
    if(!list.length){
      box.innerHTML='<div class="panel"><p class="small">还没有属性，追问没有起点。</p><div style="margin-top:8px"><button class="btn sm" data-go="2">回第 3 步写五条属性</button></div></div>';
      return;
    }
    box.innerHTML=list.map((x,i)=>branchHTML(x,i)).join('');
  }
  function stats(){
    const list=attrs(a);
    let done=0,layers=0;
    list.forEach(x=>{const d=depth(a,x.key);layers+=d;if(d>=2)done++;});
    return {done:done,layers:layers,n:list.length};
  }
  function paintStats(){
    const s=stats();
    st.textContent=s.done>=3?(s.done+' 条链达标'):(s.done+' / 3 条链达标');
    st.style.color=s.done>=3?'var(--ok)':'';
    bar.style.width=Math.min(100,Math.round(s.done/3*100))+'%';
    sub.textContent='共 '+s.n+' 条属性，写了 '+s.layers+' 层。达标 = 一条属性至少走到第二层；第一层往往还是产品，第二层才开始是人。';
  }
  function paintTree(){
    tree.innerHTML=treeHTML(a);
  }
  function paintRowMeta(){
    box.querySelectorAll('.a31-row').forEach(row=>{
      const k=row.dataset.k,i=+row.dataset.i,inp=row.querySelector('input');
      const v=norm(inp.value),prev=i>0?norm((a.chains[k]||[])[i-1]):'';
      row.querySelector('.a31-rc').textContent=v.length+'/'+MAXLEN;
      row.classList.toggle('filled',!!v);
      const rs=row.querySelector('.a31-rs');
      let msg='';
      if(v&&a.src[k+':'+i])msg='建议 · 可改写';
      else if(v&&i>0&&!prev)msg='上一层还空着';
      rs.textContent=msg;
      rs.className='a31-rs'+(msg==='上一层还空着'?' warn':'');
    });
  }
  function repaint(){paintStats();paintTree();paintRowMeta();api.refresh();}

  box.addEventListener('input',e=>{
    const inp=e.target.closest('.a31-row input');if(!inp)return;
    const k=inp.dataset.k,i=+inp.dataset.i;
    a.chains[k]=a.chains[k]||['','',''];
    a.chains[k][i]=inp.value;
    delete a.src[k+':'+i];
    api.save();repaint();
  });
  box.addEventListener('click',e=>{
    const btn=e.target.closest('.a31-ai');if(!btn)return;
    const k=btn.dataset.k;
    const x=attrs(a).find(v=>v.key===k);if(!x)return;
    const c=a.chains[k]||['','',''];
    let i=0;while(i<3&&norm(c[i]))i++;
    if(i>=3){api.toast('三层都写满了。再往下问，该换一条属性了。');return;}
    const seed=+k.replace('at','');
    c[i]=suggest(x.text,i,seed);
    a.chains[k]=c;a.src[k+':'+i]=1;
    api.save();
    repaint();
    renderBranches();
    paintRowMeta();
    const inp=box.querySelector('.a31-row[data-k="'+k+'"][data-i="'+i+'"] input');
    if(inp){inp.focus();inp.setSelectionRange(inp.value.length,inp.value.length);}
    try{
      const last=norm(c[i-1]);
      api.ai('so_what','产品：'+norm(a.prod||'（未填）')+'。属性：'+x.text+'。'+(last?'已经问到：'+last+'。':'')+'请只问一句：这对我来说意味着什么？不要给答案，也不要给建议。');
    }catch(err){}
  });
  function paintAll(){renderBranches();repaint();}
  paintAll();
  R.sowhat=paintAll;
},
onEnter(api){if(R[this.id])R[this.id]();},
gate(S){
  const a=ensure(S.answers);
  let n=0;attrs(a).forEach(x=>{if(depth(a,x.key)>=2)n++;});
  return n>=3;
}},

/* ---------- 5 找机会 ---------- */
{id:'opportunity',name:'机会',short:'机会',kicker:'STEP 5 · 找机会',
html:`
<div class="step-h"><h1>末端都摆出来了，<em>机会在没人看的那一头</em></h1>
<p>价值链的末端不是一个，是一排。现在只做一件事：从里面挑出最不像"行业共识"的三个。</p></div>
<div class="grid3 a31-crit" style="margin-bottom:12px">
  <div class="panel"><div class="panel-h"><h4>① 没人说过</h4><span>OW</span></div><p class="small">同行的官网上找不到这句话。找得到，就说明它已经被说过、也被比过价。</p></div>
  <div class="panel"><div class="panel-h"><h4>② 孤立价值</h4><span>ISOLATED</span></div><p class="small">只有一条链通向它。别的属性接不上，对手也就没法用一句"我们也有"抹平。</p></div>
  <div class="panel"><div class="panel-h"><h4>③ 能开新细分</h4><span>SEGMENT</span></div><p class="small">说得出具体的一群人、一个时刻。说不出人，就不是机会，是形容词。</p></div>
</div>
<div class="panel" style="margin-bottom:12px">
  <div class="panel-h"><h4>所有价值链末端</h4><span id="oppSt">已选 0 / 3</span></div>
  <div id="oppList" class="a31-opps"></div>
  <p class="hint" id="oppHint" style="margin-top:8px"></p>
</div>
<div class="grid2" style="align-items:start">
  <div class="panel">
    <div class="panel-h"><h4>从三个里选一个</h4><span>只验一个</span></div>
    <div id="pickList"></div>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>验证计划</h4><span id="planLen">0 / 80</span></div>
    <div class="field"><label>谁会为它多付钱 / 多走一步</label>
      <textarea id="plan" maxlength="80" placeholder="例如：一年出差 20 次以上的销售，愿意为「酒店前台也能买到」多走 200 米"></textarea></div>
    <p class="hint" style="margin-top:7px">结构：<b>谁</b> + 在什么<b>时刻</b> + 愿意多付什么、多走哪一步。三个都写到，才算一句话。</p>
    <div class="hint" id="gateNote" style="margin-top:6px"></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=ensure(S.answers);
  const list=sec.querySelector('#oppList'),pick=sec.querySelector('#pickList'),
        st=sec.querySelector('#oppSt'),hint=sec.querySelector('#oppHint'),
        plan=sec.querySelector('#plan'),plen=sec.querySelector('#planLen'),gnote=sec.querySelector('#gateNote');

  function paintList(){
    const ends=endpoints(a);
    const keys=endpointKeys(a);
    a.picks=(a.picks||[]).filter(k=>keys.indexOf(k)>=0);
    if(a.opp&&!a.picks.some(k=>k===a.opp))a.opp='';
    if(!ends.length){
      list.innerHTML='<div class="a31-empty">还没有走到第二层的末端。回第 4 步，让至少三条链各走两层，这里才有东西可挑。</div>';
      st.textContent='已选 0 / 3';
      st.style.color='';
      paintPick();return;
    }
    const count={};ends.forEach(e=>{count[e.text]=(count[e.text]||0)+1;});
    list.innerHTML=ends.map(e=>{
      const k=e.key+':'+e.idx,on=a.picks.indexOf(k)>=0;
      const iso=count[e.text]===1;
      return '<button class="a31-opp'+(on?' on':'')+'" data-k="'+k+'">'+
        '<span class="a31-opp-k">'+(on?'✓':'')+'</span>'+
        '<span class="a31-opp-b"><b>'+esc(e.text)+'</b><em>来自「'+esc(e.attr)+'」· 第 '+e.depth+' 层</em></span>'+
        '<span class="a31-opp-tags">'+(iso?'<i class="iso">孤立</i>':'')+(e.depth>=3?'<i>最深</i>':'')+'</span>'+
        '</button>';
    }).join('');
    st.textContent='已选 '+a.picks.length+' / 3';
    st.style.color=a.picks.length>=3?'var(--ok)':'';
    hint.innerHTML=a.picks.length>=3
      ?'三个够了。再勾下去，你会发现每一个都值得做——那就等于没选。'
      :'逐个过三问：同行说过吗？只有这一条链通向它吗？说得出具体的一群人吗？';
    paintPick();
  }
  function paintPick(){
    const chosen=a.picks.map(k=>{
      const [key,idx]=k.split(':');
      const e=endpoints(a).find(x=>x.key===key&&x.idx===+idx);
      return e?{k:k,e:e}:null;
    }).filter(Boolean);
    if(!chosen.length){
      pick.innerHTML='<div class="a31-empty">先在上面勾三个。少于三个，你不会认真比较。</div>';
      paintGate();return;
    }
    pick.innerHTML=chosen.map(c=>{
      const on=a.opp===c.k;
      return '<button class="a31-pick'+(on?' on':'')+'" data-k="'+c.k+'">'+
        '<span class="a31-pick-k">'+(on?'●':'○')+'</span>'+
        '<span class="a31-pick-b"><b>'+esc(c.e.text)+'</b><em>'+esc(c.e.attr)+' · 第 '+c.e.depth+' 层</em></span></button>';
    }).join('');
    paintGate();
  }
  function paintGate(){
    const n=norm(a.oppPlan).length;
    plen.textContent=n+' / 80';
    const ok=!!a.opp&&n>=12;
    gnote.innerHTML=ok?'<b style="color:var(--ok)">可以了。</b>这一句就是你回公司要问的第一个问题。'
      :(!a.opp?'还差：选一个机会。':'还差 '+(12-n)+' 个字：现在这句还看不出谁会为它动。');
  }
  list.addEventListener('click',e=>{
    const b=e.target.closest('[data-k]');if(!b)return;
    const k=b.dataset.k;
    const i=a.picks.indexOf(k);
    if(i>=0){
      a.picks.splice(i,1);
      if(a.opp===k)a.opp='';
    }else{
      if(a.picks.length>=3){api.toast('只留三个。多选一个，等于一个都不认真验。');return;}
      a.picks.push(k);
    }
    api.save();paintList();api.refresh();
  });
  pick.addEventListener('click',e=>{
    const b=e.target.closest('[data-k]');if(!b)return;
    a.opp=b.dataset.k;api.save();paintPick();api.refresh();
  });
  plan.addEventListener('input',()=>{
    a.oppPlan=plan.value;api.save();paintGate();api.refresh();
  });
  function paintAll(){
    plan.value=a.oppPlan||'';
    paintList();
  }
  paintAll();
  R.opportunity=paintAll;
},
onEnter(api){if(R[this.id])R[this.id]();},
gate(S){
  const a=ensure(S.answers);
  return !!a.opp&&norm(a.oppPlan).length>=12;
}},

/* ---------- 6 提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 6 · 产出',
html:`
<div class="step-h"><h1>交一张<em>能贴到墙上的图</em></h1>
<p>卡是给人看的文字版，图是给会议室用的。A31 的产出不是结论，是你下周要拿去问客户的那张地图。</p></div>
<div class="grid2" style="align-items:start">
  <div id="cardSlot"></div>
  <div class="stack">
    <div class="panel">
      <div class="panel-h"><h4>提交</h4><span id="subSt">未提交</span></div>
      <p class="small">提交后进入班级互评池。评的人只看一件事：<b>这条链的哪一步是他猜的。</b></p>
      <div class="row" style="margin-top:10px">
        <button class="btn primary" id="subBtn">提交</button>
        <button class="btn" id="exportTree">导出 AVM 图</button>
      </div>
      <div class="hint" id="subHint" style="margin-top:8px">未登录：只存本机，不进入互评。</div>
    </div>
    <div class="panel">
      <div class="panel-h"><h4>为什么导出的是图</h4><span>不是卡</span></div>
      <p class="small">右栏「导出产出卡 PNG」已经能带走文字版。这里专门导图，因为 A31 真正要贴到墙上、带进评审会的是那张树：<b>同一张图，销售看末端，产品看属性，老板看断层。</b></p>
    </div>
  </div>
</div>
<div class="panel" style="margin-top:12px">
  <div class="panel-h"><h4>这张图拿去干什么</h4><span>三个用法</span></div>
  <div class="grid3">
    <div><div class="mono" style="font-size:9.5px;color:var(--acc)">对齐用词</div><p class="small" style="margin-top:3px">销售说便宜，产品说渠道，其实是同一条属性。图上看得见。</p></div>
    <div><div class="mono" style="font-size:9.5px;color:var(--acc)">找差异化</div><p class="small" style="margin-top:3px">强连接是行业标配。价值藏在要绕三跳的那几条弱连接上。</p></div>
    <div><div class="mono" style="font-size:9.5px;color:var(--acc)">找细分</div><p class="small" style="margin-top:3px">孤立的末端，通常对应一群还没被服务的人。</p></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=ensure(S.answers);
  const slot=sec.querySelector('#cardSlot'),btn=sec.querySelector('#subBtn'),
        st=sec.querySelector('#subSt'),hint=sec.querySelector('#subHint');

  function paint(){
    const c=L.card(S);
    const rows=c.rows.map(r=>'<div><b>'+esc(r[0])+'</b><span class="'+(r[1]&&r[1]!=='—'?'fill':'')+'">'+esc(r[1]||'—')+'</span></div>').join('');
    const deep=deepest(a),ends=endpoints(a);
    slot.innerHTML='<div class="outcard a31-card"><div class="oh"><span>DELIVERABLE · A31</span><span>AVM 价值树</span></div>'+
      '<h5>'+esc(c.title)+'</h5><div class="kv">'+rows+'</div>'+
      '<div class="a31-card-f"><span>属性 '+attrs(a).length+' 条</span><span>链 '+(deep?deep.d:0)+' 层</span><span>末端 '+ends.length+' 个</span></div>'+
      '</div>';
    const ready=!!a.opp&&norm(a.oppPlan).length>=12;
    st.textContent=S.submitted?'已提交':'未提交';
    st.style.color=S.submitted?'var(--ok)':'';
    btn.textContent=S.submitted?'已提交，去看班级':'提交';
    btn.disabled=!!S.submitted||!ready;
    hint.textContent=S.submitted?'已进入互评池。评的人会先看你的最深一条链。'
      :(ready?'未登录：只存本机，不进入互评。':'还差：回第 5 步选一个机会，并写一句验证计划（≥12 字）。');
  }
  btn.onclick=async()=>{
    if(!a.opp||norm(a.oppPlan).length<12){api.toast('还缺一个机会或一句验证计划');return;}
    await api.submit();paint();
  };
  sec.querySelector('#exportTree').onclick=()=>exportTree(api,a);
  paint();
  R.submit=paint;
},
onEnter(api){if(R[this.id])R[this.id]();},
gate(S){
  const a=ensure(S.answers);
  return !!a.opp&&norm(a.oppPlan).length>=12;
}}
],

side:{asks:[
  '这条属性，客户在什么场景下会真的在意？',
  '你刚写的那句是价值，还是换了个说法的属性？',
  '如果客户根本不知道这条属性，他还会为它多付钱吗？',
  '这条链上哪一步是你猜的、手上没有证据？',
  '同一个末端，说得出是谁、在什么时刻、愿意多走哪一步吗？'
]},

card(S){
  const a=ensure((S&&S.answers)||{});
  const deep=deepest(a);
  const chain=deep?chainLine(a,deep.x):'—';
  return {title:'A31 · 我的价值树',rows:[
    ['产品',norm(a.prod)||'—'],
    ['属性',(attrs(a).length||0)+' 条'],
    ['最深链',chain||'—'],
    ['机会',a.opp?((endpoints(a).find(e=>e.key+':'+e.idx===a.opp)||{}).text||'—'):'—'],
    ['验证',norm(a.oppPlan)||'—']
  ]};
},
notes:[
  {t:'本节目标',h:'让学员亲手把一条属性追问到价值，并承认自己平时说的卖点大多还停在左岸。' },
  {t:'时间分配',h:'先猜 5′ · 概念 8′ · 属性 10′ · 追问 12′ · 找机会 7′ · 提交 3′。45′ 紧，属性那一步不要拖。' },
  {t:'常见卡点',h:'三处：把"便宜/高端"当价值；链断在形容词（更好用、更省心）；五条链全通向同一个词，说明没有分人。' },
  {t:'直播怎么接',h:'看中控台里全班末端词的重复度：重复度越高，说明这个班的行业共识越硬。挑三张上墙——一条强连接、一条弱连接、一条孤立价值，只问一句"这一步凭什么成立"。' },
  {t:'案例口径',h:'BIC 与 Volvo 均为 SIT 官方 AVM 案例，可引用；对外传播含客户名的案例前先确认授权。Harmonic Scalpel（强生爱惜康）留作进阶，本节不展开。' }
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A31']=L;

/* ---------- 导出：把价值树画成 PNG（自绘 canvas，不引外部库） ---------- */
function exportTree(api,a){
  const list=attrs(a);
  if(!list.length){api.toast('还没有属性，导不出图');return;}
  if(!list.some(x=>depth(a,x.key)>0)){api.toast('还没有任何一条链。先回第 4 步追问。');return;}
  const W=1680,M=70,GAP=44,RH=128,HEAD=272,FOOT=96;
  const CW=Math.floor((W-M*2-GAP*3)/4);
  const H=HEAD+list.length*RH+FOOT;
  const cv=document.createElement('canvas');cv.width=W;cv.height=H;
  const g=cv.getContext('2d');
  const rr=(x,y,w,h,r)=>{g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath();};
  const wrap=(text,maxW)=>{const chars=Array.from(String(text||''));const out=[];let line='';
    for(const ch of chars){if(g.measureText(line+ch).width>maxW&&line){out.push(line);line=ch;}else line+=ch;}
    if(line)out.push(line);return out.length?out:[''];};

  g.fillStyle='#0A0E15';g.fillRect(0,0,W,H);
  g.strokeStyle='#2A3547';g.lineWidth=2;g.strokeRect(32,32,W-64,H-64);
  g.fillStyle='#C9A227';g.font='500 15px "PingFang SC","Microsoft YaHei",sans-serif';
  g.fillText('SIT 创新专业大师版 · AVM 属性价值地图',M,88);
  g.fillStyle='#E9E7E2';g.font='700 38px "Songti SC","PingFang SC",serif';
  g.fillText('从属性到价值',M,142);
  g.fillStyle='#5A6679';g.font='15px "PingFang SC","Microsoft YaHei",sans-serif';
  g.fillText(norm(a.prod)||'未命名产品',M,176);
  g.fillStyle='#3F4A5C';g.font='13px ui-monospace,monospace';
  g.fillText(list.length+' 条属性 · '+new Date().toLocaleDateString('zh-CN'),M,200);

  const labels=['属性 · 客观','So what ①','So what ②','So what ③ · 价值'];
  g.font='500 15px "PingFang SC","Microsoft YaHei",sans-serif';
  labels.forEach((t,i)=>{
    g.fillStyle=i===3?'#9ED3B4':'#5A6679';
    g.fillText(t,M+i*(CW+GAP),HEAD-24);
  });

  list.forEach((x,ri)=>{
    const y=HEAD+ri*RH;
    const c=chainOf(a,x),d=depth(a,x.key),cy=y+RH/2;
    const cell=(i,text,kind)=>{
      const bx=M+i*(CW+GAP),by=y+12,bw=CW,bh=RH-24;
      if(kind==='void')return;
      const valNode=(kind==='val'),emptyNode=(kind==='empty');
      g.setLineDash(emptyNode?[6,7]:[]);
      g.fillStyle=valNode?'rgba(78,159,110,.10)':(emptyNode?'rgba(255,255,255,.012)':'#111823');
      g.strokeStyle=valNode?'rgba(78,159,110,.55)':(emptyNode?'#252F3F':(kind==='at'?'#3A475E':'#2A3547'));
      g.lineWidth=valNode?2:1.5;
      rr(bx,by,bw,bh,10);g.fill();g.stroke();g.setLineDash([]);
      if(kind==='at'){
        g.fillStyle='#C9A227';g.font='600 13px ui-monospace,monospace';
        g.fillText('0'+(ri+1),bx+16,by+26);
        g.fillStyle='#E9E7E2';g.font='600 21px "PingFang SC","Microsoft YaHei",sans-serif';
        const lines=wrap(text,bw-32).slice(0,2);
        const start=by+bh/2+(lines.length===1?14:-2);
        lines.forEach((l,li)=>g.fillText(l,bx+16,start+li*29));
      }else if(emptyNode){
        g.fillStyle='#3F4A5C';g.font='18px "PingFang SC",sans-serif';
        g.fillText('—',bx+16,by+bh/2+6);
      }else{
        g.fillStyle=valNode?'#DFF0E5':'#C9CFDA';
        g.font=(valNode?'600 ':'')+'20px "PingFang SC","Microsoft YaHei",sans-serif';
        const lines=wrap(text,bw-32).slice(0,2);
        const start=by+bh/2+(lines.length===1?8:-6);
        lines.forEach((l,li)=>g.fillText(l,bx+16,start+li*28));
      }
    };
    cell(0,x.text,'at');
    for(let i=0;i<3;i++){
      if(i>d)continue;
      const ax=M+i*(CW+GAP)+CW,ay=cy;
      g.strokeStyle=i>=d?'#232C3B':'#3A475E';
      g.lineWidth=1.6;
      g.beginPath();g.moveTo(ax+6,ay);g.lineTo(ax+GAP-14,ay);g.stroke();
      g.beginPath();g.moveTo(ax+GAP-14,ay);g.lineTo(ax+GAP-21,ay-4);g.lineTo(ax+GAP-21,ay+4);g.closePath();
      g.fillStyle=i>=d?'#232C3B':'#3A475E';g.fill();
      const v=norm(c[i]);
      if(v)cell(i+1,v,(i===d-1&&d>=2)?'val':'n');
      else if(i===d)cell(i+1,'','empty');
      else cell(i+1,'','void');
    }
  });

  g.fillStyle='#4A5466';g.font='12px "PingFang SC","Microsoft YaHei",sans-serif';
  g.fillText('发小明 · SIT 系统创新思维 · 每跳一层，主语从产品换到人 · 本文件由课程系统生成',M,H-52);
  const link=document.createElement('a');
  link.download='SIT大师版_A31_价值树.png';
  link.href=cv.toDataURL('image/png');
  link.click();
  api.toast('价值树已导出');
}
})();
