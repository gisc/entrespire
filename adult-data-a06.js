/* A06 · 限制导致创新：以色列与阿波罗 13 */
(function(){
'use strict';

const IMG={
 apollo:'assets-cases-a06-apollo.jpg',
 israel:'assets-cases-a06-israel.jpg'
};

/* ---------- 阿波罗 13 的四样东西 ---------- */
const MAT=[
 {k:'board',n:'纸板',r:'做一块挡板，把气流逼进过滤器',
  svg:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><rect x="6" y="7" width="20" height="18" rx="1.5"/><path d="M6 12h20" opacity=".45"/><path d="M16 7v18" opacity=".18" stroke-dasharray="2 3"/></svg>'},
 {k:'tape',n:'胶带',r:'把四样东西固定住，接缝不许漏气',
  svg:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="14" cy="15" r="9"/><circle cx="14" cy="15" r="3.5" opacity=".55"/><path d="M22 19l5 4-3.5 4.5" opacity=".6" stroke-linejoin="round"/></svg>'},
 {k:'hose',n:'宇航服软管',r:'把气体从方形过滤器引到圆口',
  svg:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M5 10c6 0 6 12 11 12s5-12 11-12"/><rect x="3" y="7" width="4" height="6" rx="1.5"/><rect x="25" y="19" width="4" height="6" rx="1.5"/><path d="M8 13h2M22 19h2" opacity=".4"/></svg>'},
 {k:'bag',n:'塑料袋',r:'套在外面，做一个临时的密封套',
  svg:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M11 6h10l2 6-1 14H10L9 12z"/><path d="M11 6c1.5 2 8.5 2 10 0" opacity=".7"/><path d="M12 18h8" opacity=".4"/></svg>'}
];

/* ---------- 三个任务 ---------- */
const TASK=[
 {k:'ask',n:'让新员工第一周就敢提问',s:'现状：怕问错，三个月后才开口',
  v0:'例如：第一周排一次 90 分钟答疑会，HR 和直属主管都在场，会后整理一份 FAQ',
  c1:'预算一分不加：没有场地、没有茶歇、没有外部讲师。这场答疑还开得成吗？',
  c2:'人不加：HR 和主管不许多花时间，也不许设一个「新人答疑岗」。谁来讲？',
  c3:'只用现有系统：不买新工具。企业微信、飞书、邮件、工单系统，你手上已经有什么？',
  g1:'例如：场地、茶歇、外部讲师',
  g2:'例如：HR 专人跟进、主管的额外时间',
  g3:'例如：新建一个答疑平台'},
 {k:'prod',n:'让客户在 3 分钟内搞懂你们的产品',s:'现状：销售讲 20 分钟，客户只记住一句',
  v0:'例如：拍一条 3 分钟的产品介绍视频，销售见客户前先发过去',
  c1:'预算一分不加：不拍摄、不外包、不请演员。这条片子还做得出来吗？',
  c2:'人不加：不许专职产品市场，也不许销售额外加班。谁来写、谁来剪？',
  c3:'只用现有系统：不买演示平台。官网、公众号、现有 PPT、试用账号，能拼出什么？',
  g1:'例如：拍摄、剪辑、外部脚本',
  g2:'例如：专职产品市场、销售陪拍',
  g3:'例如：新的演示平台、新的官网'},
 {k:'info',n:'让跨部门信息不再丢',s:'现状：群里发过，就算通知过',
  v0:'例如：建一个跨部门大群，所有关键信息必须在群里同步一遍',
  c1:'预算一分不加：不买协同工具，不做系统集成。这个群还怎么管？',
  c2:'人不加：不设专职协调人，不设 PMO。谁来盯漏掉的信息？',
  c3:'只用现有系统：不新开平台。邮件、工单、周会、现有群，只能在这些里面改。',
  g1:'例如：新协同工具、系统集成',
  g2:'例如：专职协调人、PMO',
  g3:'例如：新开一个平台、新流程系统'}
];
const TASKN=TASK.reduce((m,t)=>(m[t.k]=t.n,m),{});

/* ---------- 三条限制 ---------- */
const CONS=[
 {k:'money',cap:'资源',n:'不能增加预算',wall:'封掉：买、外包、加物料',short:'预算',
  why:'钱是最容易被用来绕开问题的资源。这一条一加，「买一个」就不在选项里了。'},
 {k:'people',cap:'人手',n:'不能增加人手',wall:'封掉：专人、加班、借调',short:'人手',
  why:'人一多，问题常常变成「谁来做」。这一条把答案压回「怎么做」。'},
 {k:'system',cap:'系统',n:'只能用现有系统',wall:'封掉：换工具、上新平台',short:'系统',
  why:'新系统会掩盖旧流程的问题。这一条逼你在已经有的东西里改。'}
];

/* ---------- 自己加的限制 ---------- */
const KINDS=[
 {k:'time',n:'更少时间',s:'把 3 个月压成 3 周',ph:'例如：3 周上线，不是 3 个月',
  ex:'放弃「全量上线」，换来 3 周内拿到第一批真实反馈'},
 {k:'money',n:'更少钱',s:'0 新增预算，先跑起来',ph:'例如：0 新增预算，只能用现有供应商',
  ex:'放弃「定制开发」，换来这个季度就能开始试'},
 {k:'people',n:'更少人',s:'就 2 个人，不加人',ph:'例如：只算我和 1 个兼职',
  ex:'放弃「大而全」，换来两个人能守住的范围'},
 {k:'scope',n:'更少功能',s:'只留一个核心功能',ph:'例如：只保留 1 个核心功能，其余下线',
  ex:'放弃「什么都做」，换来一个能被说清楚的功能'}
];

/* ---------- 二选一 ---------- */
const Q1=[
 {k:'a',n:'真的：客户、监管或合同写死了',s:'我改不动，只能在里面做',r:'这类限制要写进方案边界，不是拿来抱怨。你只能在边界里面找新解。'},
 {k:'b',n:'假的：没人规定，是我们一直这么做',s:'它更像一句习惯',r:'自己补上的限制通常最贵。先问一句：谁真的会因为这个拦我？'},
 {k:'c',n:'半真：能谈，但要付代价',s:'时间、关系或钱，总得让一样',r:'大多数限制在这一类。不是不能改，是改了要付账——先算清账。'}
];

/* ---------- 小图 ---------- */
const MECH='<svg class="a06-svg" viewBox="0 0 220 132" fill="none" aria-hidden="true">'+
 '<rect x="6" y="6" width="208" height="120" rx="8" stroke="currentColor" stroke-dasharray="4 5" opacity=".28"/>'+
 '<text x="16" y="23" font-size="8" fill="currentColor" opacity=".45" letter-spacing="1.6">SEARCH SPACE</text>'+
 '<path d="M20 76h54" stroke="currentColor" stroke-width="8" opacity=".1" stroke-linecap="round"/>'+
 '<path d="M20 76h54" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3 4" opacity=".65"/>'+
 '<text x="20" y="64" font-size="9" fill="currentColor" opacity=".7">最熟的那条路</text>'+
 '<path d="M82 40v64" stroke="#C75660" stroke-width="2.2" stroke-linecap="round"/>'+
 '<path d="M76 46l12 7M88 53l-12 7" stroke="#C75660" stroke-width="1.2" opacity=".55" stroke-linecap="round"/>'+
 '<text x="74" y="34" font-size="9" fill="#E39AA2">限制</text>'+
 '<path d="M82 76c18 0 18 28 38 28" stroke="#C9A227" stroke-width="2" stroke-linecap="round"/>'+
 '<circle cx="124" cy="104" r="4" fill="#E6C766"/>'+
 '<text x="134" y="108" font-size="9" fill="currentColor" opacity=".8">新解法</text>'+
 '<path d="M146 104h58" stroke="currentColor" stroke-dasharray="3 5" opacity=".25"/>'+
 '<text x="16" y="118" font-size="8" fill="currentColor" opacity=".38">同一个问题，边界一划，能走的路就变了</text>'+
 '</svg>';

const CLOSED='<svg class="a06-next-svg" viewBox="0 0 210 112" fill="none" aria-hidden="true">'+
 '<rect x="8" y="32" width="194" height="70" rx="6" stroke="currentColor" stroke-dasharray="5 5" opacity=".25"/>'+
 '<text x="14" y="24" font-size="8" fill="currentColor" opacity=".4" letter-spacing="1.4">ON BOARD · 1970</text>'+
 '<rect x="24" y="76" width="24" height="17" rx="1.5" stroke="currentColor" stroke-width="1.4" opacity=".85"/>'+
 '<circle cx="66" cy="84" r="8" stroke="currentColor" stroke-width="1.4" opacity=".85"/><circle cx="66" cy="84" r="3" stroke="currentColor" stroke-width="1.2" opacity=".5"/>'+
 '<path d="M84 90c6-15 12-15 18 0" stroke="currentColor" stroke-width="1.4" opacity=".85" stroke-linecap="round"/>'+
 '<path d="M116 76l9 8-9 8-9-8z" stroke="currentColor" stroke-width="1.4" opacity=".85" stroke-linejoin="round"/>'+
 '<rect x="140" y="74" width="17" height="21" rx="1.5" stroke="currentColor" stroke-width="1.4" opacity=".85"/>'+
 '<path d="M144 80h9M144 84h9M144 88h6" stroke="currentColor" stroke-width="1" opacity=".45"/>'+
 '<path d="M166 78l18-12" stroke="#C9A227" stroke-width="1.3" stroke-dasharray="3 3"/>'+
 '<text x="186" y="62" font-size="16" fill="#E6C766" font-weight="700">?</text>'+
 '<text x="20" y="112" font-size="8" fill="currentColor" opacity=".38">每一件都先问：它还能干什么</text>'+
 '</svg>';

/* ---------- 状态 ---------- */
function str(v){return typeof v==='string'?v:'';}
function normalizeStages(st){
 return [0,1,2].map(i=>{
  const s=st[i]||{};
  return {text:str(s.text),give:str(s.give),done:!!s.done};
 });
}
function view(S){
 const a=(S&&S.answers&&S.answers.a06)||{};
 const m=(a.mine&&typeof a.mine==='object')?a.mine:{};
 return {
  task:str(a.task),v0:str(a.v0),stages:normalizeStages(Array.isArray(a.stages)?a.stages:[]),
  revealed:Math.max(0,Math.min(3,Number(a.revealed)||0)),
  q1:str(a.q1),q2:str(a.q2),
  mine:{proj:str(m.proj),kind:str(m.kind),num:str(m.num),line:str(m.line)}
 };
}
function ensure(S){
 const ans=S.answers;
 if(!ans.a06||typeof ans.a06!=='object')ans.a06={};
 const a=ans.a06;
 if(typeof a.task!=='string')a.task='';
 if(typeof a.v0!=='string')a.v0='';
 if(!Array.isArray(a.stages))a.stages=[];
 a.stages=normalizeStages(a.stages);
 if(typeof a.revealed!=='number'||a.revealed<0||a.revealed>3)a.revealed=0;
 if(typeof a.q1!=='string')a.q1='';
 if(typeof a.q2!=='string')a.q2='';
 if(!a.mine||typeof a.mine!=='object')a.mine={};
 ['proj','kind','num','line'].forEach(k=>{if(typeof a.mine[k]!=='string')a.mine[k]='';});
 return a;
}
const taskOf=k=>TASK.filter(t=>t.k===k)[0]||null;
const kindOf=k=>KINDS.filter(t=>t.k===k)[0]||null;

function prevText(x,i){return i===0?x.v0:x.stages[i-1].text;}
function doneCount(x){return x.stages.filter(s=>s.done).length;}
function latestText(x){
 let t=x.v0;
 x.stages.forEach(s=>{if(s.done)t=s.text;});
 return t;
}
function allDone(x){return x.stages.every(s=>s.done);}
function vOk(t){return (t||'').trim().length>=12;}
function giveOk(t){return (t||'').trim().length>=4;}
function stageReady(x,i){
 const s=x.stages[i];
 return vOk(s.text)&&giveOk(s.give)&&s.text.trim()!==prevText(x,i).trim();
}
function benchGate(x){
 if(!x.task||!vOk(x.v0))return false;
 return x.stages.every(s=>s.done&&vOk(s.text)&&giveOk(s.give));
}
function mineGate(x){
 const m=x.mine;
 return m.proj.trim().length>=8&&!!m.kind&&m.num.trim().length>=2&&m.line.trim().length>=16;
}
function submitGate(x){
 return !!(x.q1&&x.q2.trim().length>=6);
}

const L={
id:'A06',week:2,seq:6,title:'限制导致创新：以色列与阿波罗 13',
kicker:'WEEK 2 · 限制与盒内思考',tool:'mind',toolName:'限制',minutes:45,
steps:[
/* ================= 1 先猜 ================= */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h a06-hook-h"><h1>方形的过滤器，<em>塞进圆口</em></h1>
<p>1970 年 4 月 13 日，阿波罗 13 号的氧气罐在离地球 30 多万公里的地方炸了。三名宇航员挤进登月舱，把它当救生艇。回程还有 3 天，舱里的二氧化碳开始往上走。</p>
<p style="margin-top:6px">登月舱的过滤器是<b>圆的</b>，指令舱带的备用过滤器是<b>方的</b>。地面要教他们在飞船里现做一个转接件。规则只有一句：<b>只能用船上已经有的东西。</b></p></div>
<div class="a06-hook">
  <figure class="a06-photo">
    <button class="case-zoom" data-zoom="apollo" title="看大图">⤢</button>
    <img src="${IMG.apollo}" alt="阿波罗 13 地面控制中心，桌上摆着飞船里的材料" loading="lazy">
    <figcaption><b>阿波罗 13 · 地面控制中心</b><span>桌上摆的，是飞船里能找到的东西</span>
      <em class="a06-src">图：SIT 官方课程材料（已授权）　Day1 p.95</em></figcaption>
  </figure>
  <div class="a06-hook-r">
    <div class="a06-ask"><span class="a06-ask-k">先别查资料</span><p>如果只有这些，<b>你会先抓哪一样？</b></p></div>
    <div class="opts a06-hook-opts" id="a06HookOpts">
      <button class="opt" data-h="a"><span class="k">A</span><span><b>找一根塑料管</b><span>把方形和圆形两头接起来</span></span></button>
      <button class="opt" data-h="b"><span class="k">B</span><span><b>纸板 + 胶带 + 塑料袋</b><span>做一个套子，把方过滤器裹住</span></span></button>
      <button class="opt" data-h="c"><span class="k">C</span><span><b>用指令舱的备用过滤器</b><span>换掉登月舱那个圆的</span></span></button>
      <button class="opt" data-h="d"><span class="k">D</span><span><b>拆宇航服上的零件</b><span>现拆现用，反正人还穿着</span></span></button>
    </div>
    <button class="a06-reselect" id="a06Reselect" type="button">换一个选项</button>
    <div id="a06HookOut" style="margin-top:10px"></div>
  </div>
</div>`,
init(sec,api){
 const S=api.S,out=sec.querySelector('#a06HookOut');
 let showAll=false;
 const V={
  a:['warn','最像，但不成立。船上没有一根两头都对得上的塑料管。真正接上的是宇航服软管——它本来是给宇航员送气的。'],
  b:['ok','最接近。纸板、胶带、塑料袋都在清单里，但还差一件：软管。没有它，套子做出来也不通气。'],
  c:['warn','没有备用。每一只过滤器都在工作。地面能送上去的补给，要等飞船回来以后。'],
  d:['warn','对了一半。软管确实来自宇航服，但不是随便一个零件——是整条送气的通道。']
 };
 function paint(){
  const v=S.answers.a06&&S.answers.a06.hook;
  sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',v===b.dataset.h));
  const opts=sec.querySelector('#a06HookOpts'),rs=sec.querySelector('#a06Reselect');
  if(opts)opts.classList.toggle('collapsed',!!v&&!showAll);
  if(rs)rs.style.display=(v&&!showAll)?'inline-flex':'none';
  if(!v){out.innerHTML='';return;}
  const f=V[v]||V.b;
  out.innerHTML='<div class="a06-reveal '+(f[0]==='ok'?'ok':'warn')+'">'+
    '<div class="a06-reveal-h"><span>揭晓 · 四样东西</span><span>1970 · 阿波罗 13</span></div>'+
    '<div class="a06-mats">'+MAT.map(m=>'<div class="a06-mat"><span class="a06-mat-i">'+m.svg+'</span><b>'+m.n+'</b><em>'+m.r+'</em></div>').join('')+'</div>'+
    '<p class="a06-verdict"><b>你选的是 '+v.toUpperCase()+'。</b>'+f[1]+'</p>'+
    '<p class="small">选 B 的最多：它离答案最近，也正好少一件。</p>'+
    '<div class="a06-key">'+
      '<b>你以为的规则</b><span>找一个现成的转接件。</span>'+
      '<b>实际起作用的那条</b><span>只能用船上已经有的东西。于是「让地面送一个上来」这条最顺的路，先被封死了。</span>'+
    '</div>'+
    '<p class="a06-note">地面没有图纸，也没有视频。步骤是一句一句念上去的；三个人照着剪、贴、套。做完之后，二氧化碳曲线掉头向下。</p>'+
    '</div>';
 }
 sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{
  if(!S.answers.a06||typeof S.answers.a06!=='object')S.answers.a06={};
  S.answers.a06.hook=b.dataset.h;showAll=false;api.save();paint();api.refresh();
 });
 const rs=sec.querySelector('#a06Reselect');
 if(rs)rs.onclick=()=>{showAll=true;paint();};
 sec.querySelectorAll('[data-zoom]').forEach(b=>b.onclick=e=>{
  e.stopPropagation();
  api.modal('<button class="modal-x">×</button><h3>阿波罗 13 · 地面控制中心</h3>'+
   '<img src="'+IMG.apollo+'" style="width:100%;border-radius:8px;margin:8px 0 12px" alt="阿波罗 13 地面控制中心">'+
   '<p>1970 年 4 月 13 日，氧气罐爆炸。登月舱的二氧化碳过滤器是圆的，指令舱备用的是方的。地面用口述教三名宇航员在舱内做了一个转接件。</p>'+
   '<p class="small">图：SIT 官方课程材料（已授权）· Day1 p.95「阿波罗视频」截帧</p>');
 });
 paint();
},
hint(S){const a=S.answers.a06;return a&&a.hook?'':'先选一个：你会先抓哪一样';},
gate(S){const a=S.answers.a06;return !!(a&&a.hook);}},

/* ================= 2 概念 ================= */
{id:'concept',name:'概念',short:'概念',kicker:'STEP 2 · 概念',
html:`
<div class="step-h a06-concept-h"><h1>限制不是障碍，<em>是搜索空间的边界</em></h1>
<p>阿波罗 13 的转接件不是「设计」出来的，是被「只能用船上现有的」这句话逼出来的。同一句话，在以色列变成了滴灌、海水淡化和太阳能。</p></div>
<div class="grid2 a06-top" style="align-items:stretch">
  <div class="panel a06-def">
    <div class="panel-h"><h4>限制</h4><span>Constraint</span></div>
    <p class="a06-def-p">一条你改不动的边界。不是「难一点」，是<b>这条路不存在</b>。</p>
    <div class="a06-def-f">限制越硬，解法越新：它先排除最熟的那条路，剩下的选项少，但通常是你平时不会看的。</div>
    <div class="a06-def-src">SIT Day1 p.75–83 · Constraints Enhance Creativity</div>
  </div>
  <div class="panel a06-mech">
    <div class="panel-h"><h4>限制做了什么</h4><span>一张图</span></div>
    ${MECH}
    <p class="a06-mech-cap">限制把最熟的一段切掉，剩下的地方才有人去。</p>
  </div>
</div>
<div class="a06-cons">
  <div class="a06-con"><div class="a06-con-h"><span>资源</span><em>Resource</em></div>
    <b>船上只有这些</b><p>没有补给，也没有第二艘船。要接气，只能从宇航服上拆一条软管下来。</p></div>
  <div class="a06-con"><div class="a06-con-h"><span>时间</span><em>Time</em></div>
    <b>二氧化碳不等人</b><p>没有评审会，也没有第二轮。地面口述步骤，三个人边做边改。</p></div>
  <div class="a06-con"><div class="a06-con-h"><span>规则</span><em>Rule</em></div>
    <b>方形和圆形不能改</b><p>接口是标准件，谁也改不了。于是不改接口，改出一个转接件。</p></div>
</div>
<div class="panel a06-israel">
  <div class="panel-h"><h4>同一句话，在沙漠里长出的三样东西</h4><span>以色列 · Day1 p.77–83</span></div>
  <div class="a06-israel-b">
    <figure class="a06-israel-fig">
      <img src="${IMG.israel}" alt="滴灌管上的滴头" loading="lazy">
      <figcaption><b>滴灌 · 1964 年起</b><span>水少，就把水直接送到根上</span>
        <em>图：SIT 官方课程材料（已授权）· Day1 p.81</em></figcaption>
    </figure>
    <div class="a06-israel-list">
      <div><i>01</i><b>滴灌</b><span>水少，不再漫灌，把水和肥直接送到每一棵的根上。</span></div>
      <div><i>02</i><b>海水淡化</b><span>淡水少，就把海当成水源——不是省水，是换水源。</span></div>
      <div><i>03</i><b>太阳能</b><span>燃料少，就把太阳当成电厂。日照本身就是现成资源。</span></div>
      <p class="a06-israel-note">不是他们更聪明，是「多浇水」这条路一开始就不存在。</p>
    </div>
  </div>
</div>
<div class="grid2 a06-bottom" style="align-items:start">
  <div class="panel a06-boundary">
    <div class="panel-h"><h4>什么时候别用</h4><span>边界</span></div>
    <ul>
      <li><b>安全、承重、剂量、消防、财务披露</b>：这些不是创意变量。省下的钱不够赔一次事故。</li>
      <li><b>硬到没有解</b>：周期短于一个最小闭环，只会逼出假数据，不会逼出创新。</li>
      <li><b>拿限制当省钱的借口</b>：先砍资源，再要求团队创新——那是惩罚，不是方法。</li>
    </ul>
  </div>
  <div class="panel a06-choice">
    <div class="panel-h"><h4>哪一句，是真的把限制当边界？</h4><span>二选一</span></div>
    <div class="opts a06-opts2">
      <button class="opt" data-c2="a"><span class="k">A</span><span><b>预算就这么多，只能做到这儿了。</b><span>限制被当成了结论</span></span></button>
      <button class="opt" data-c2="b"><span class="k">B</span><span><b>假设预算为零，这件事还成立吗？</b><span>先按最硬的边界做一版</span></span></button>
    </div>
    <div id="a06C2Out" style="margin-top:8px"></div>
  </div>
</div>`,
init(sec,api){
 const S=api.S,out=sec.querySelector('#a06C2Out');
 function paint(){
  const a=S.answers.a06||{},v=a.c2;
  sec.querySelectorAll('[data-c2]').forEach(b=>b.classList.toggle('on',v===b.dataset.c2));
  if(!v){out.innerHTML='';return;}
  const ok=v==='b';
  out.innerHTML='<div class="a06-reveal '+(ok?'ok':'warn')+'">'+
    '<div class="a06-reveal-h"><span>'+(ok?'对':'再想一层')+'</span><span>限制 = 搜索起点</span></div>'+
    '<p class="small">'+(ok
      ? 'B 把限制当前提：先按零预算做一版，再看这笔钱该不该花。A 把限制当结论：话说完，搜索就停了。'
      : 'A 是在陈述结论，不是在找解法。它把「预算不够」变成了「所以不用想了」。B 才是把限制当边界：先在最硬的条件下做一版。')+'</p>'+
    '<p class="small">B 不是假装没钱。它是先按最硬的边界做一版，再决定要不要花那笔钱。</p></div>';
 }
 sec.querySelectorAll('[data-c2]').forEach(b=>b.onclick=()=>{
  if(!S.answers.a06||typeof S.answers.a06!=='object')S.answers.a06={};
  S.answers.a06.c2=b.dataset.c2;api.save();paint();api.refresh();
 });
 paint();
},
hint(S){const a=S.answers.a06;return a&&a.c2?'':'选一句：哪句把限制当边界';},
gate(S){const a=S.answers.a06;return !!(a&&a.c2);}},

/* ================= 3 工作台：加限制 ================= */
{id:'bench',name:'工作台',short:'工作台',kicker:'STEP 3 · 工作台 · 加限制',
html:`
<div class="step-h a06-bench-h"><h1>一条一条，<em>把路堵上</em></h1>
<p>先写一个常规解法。它通常是对的，只是贵。然后系统会一条一条加限制——加一条，你改一版。<b>别提前想三条</b>，那会变成一道算术题。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>选任务，写第 0 版</span>
  <span class="op"><span class="op-n">2</span>加限制，改一版</span>
  <span class="op"><span class="op-n">3</span>三条加完，看前后对照</span>
</div>
<div class="bench a06-bench">
  <div class="bench-h"><b>BENCH · 限制阶梯</b><span class="st" id="a06St">0 / 3 条 · 0 / 4 版</span></div>
  <div class="bench-b a06-bench-b">
    <div class="a06-tasks" id="a06Tasks">
      ${TASK.map(t=>`<button class="a06-task" data-task="${t.k}"><b>${t.n}</b><span>${t.s}</span><i>选它</i></button>`).join('')}
    </div>
    <div class="a06-cols">
      <div class="a06-main">
        <div class="a06-v0">
          <div class="a06-v0-h"><span class="a06-vtag">v0</span><b>第 0 版 · 常规解法</b><em id="a06V0Cnt">0 / 12</em></div>
          <textarea id="a06V0" maxlength="120" placeholder="先选一个任务，再写你现在真会用的办法。别省，把预算、人力、系统都算进去。"></textarea>
          <div class="a06-v0-f">
            <span class="small" id="a06V0Hint">先选任务</span>
            <div style="flex:1"></div>
            <button class="btn sm primary" data-add="0" id="a06Add0" disabled>加第 1 条限制 →</button>
          </div>
        </div>
        <div class="a06-ladder-h"><span>限制阶梯</span><em>系统一条一条加，不提前给</em></div>
        <div class="a06-ladder" id="a06Ladder"></div>
        <div id="a06Editor"></div>
      </div>
      <aside class="a06-side">
        <div class="a06-cmp">
          <div class="a06-cmp-h"><span>限制前 / 限制后</span><em id="a06CmpN">还没有限制</em></div>
          <div id="a06Compare"></div>
        </div>
        <div class="a06-side-note">
          <b>加上的限制不撤回。</b>写坏了，改这一版；不要退回上一版去找安全感。
        </div>
      </aside>
    </div>
  </div>
  <div class="bench-f">
    <span class="small" id="a06Hint">选一个任务开始。三条限制加完，这一节的工作台才算走完。</span>
    <div style="flex:1"></div>
    <button class="btn sm ghost" id="a06Reset">清空重来</button>
  </div>
</div>`,
init(sec,api){
 const S=api.S;
 ensure(S);
 const tasksEl=sec.querySelector('#a06Tasks'),v0El=sec.querySelector('#a06V0'),
       v0Cnt=sec.querySelector('#a06V0Cnt'),v0Hint=sec.querySelector('#a06V0Hint'),
       add0=sec.querySelector('#a06Add0'),ladder=sec.querySelector('#a06Ladder'),
       editor=sec.querySelector('#a06Editor'),cmp=sec.querySelector('#a06Compare'),
       cmpN=sec.querySelector('#a06CmpN'),st=sec.querySelector('#a06St'),
       hintEl=sec.querySelector('#a06Hint');
 let eKey='';

 function paintTasks(){
  const x=ensure(S);
  tasksEl.querySelectorAll('[data-task]').forEach(el=>{
   el.classList.toggle('on',x.task===el.dataset.task);
  });
 }
 function paintV0(){
  const x=ensure(S);
  if(document.activeElement!==v0El&&v0El.value!==x.v0)v0El.value=x.v0;
  const t=taskOf(x.task);
  v0El.placeholder=t?t.v0:'先选一个任务，再写你现在真会用的办法。别省，把预算、人力、系统都算进去。';
  v0Cnt.textContent=(x.v0||'').length+' / 12';
  v0Cnt.classList.toggle('a06-pass',vOk(x.v0));
  add0.disabled=!(x.task&&vOk(x.v0))||x.revealed>0;
  add0.style.display=x.revealed>0?'none':'';
  v0Hint.textContent=!x.task?'先选任务':(vOk(x.v0)?'第 0 版成立。可以加限制了。':'再写具体一点：预算、人力、系统各用到什么');
  v0Hint.classList.toggle('a06-pass',!!(x.task&&vOk(x.v0)));
 }
 function paintLadder(){
  const x=ensure(S);
  ladder.innerHTML=CONS.map((c,i)=>{
   const s=x.stages[i],on=x.revealed>i;
   let state='lock',label='待加',body='';
   if(s.done){
    state='done';label='已记下 v'+(i+1);
    body='<div class="a06-lrow-b"><p>'+api.esc(s.text)+'</p><em>让掉：'+api.esc(s.give)+'</em></div>';
   }else if(on){
    state='now';label='改写中';
    body='<div class="a06-lrow-b"><p>'+c.wall+'　在下面改写 ↓</p></div>';
   }else{
    body='<div class="a06-lrow-b"><p>'+c.wall+'</p></div>';
   }
   return '<div class="a06-lrow '+state+'">'+
     '<div class="a06-lrow-h"><span class="a06-lnum">'+(i+1)+'</span>'+
     '<b>'+(on?c.n:'关于'+c.cap)+'</b><em>'+label+'</em>'+
     (s.done?'<button class="a06-edit" data-edit="'+i+'">改</button>':'')+'</div>'+
     body+'</div>';
  }).join('');
 }
 function editorKey(x){
  return [x.task,x.revealed,x.stages.map(s=>s.done?1:0).join('')].join('|');
 }
 function paintEditor(force){
  const x=ensure(S);
  const k=editorKey(x);
  if(!force&&k===eKey)return;
  eKey=k;
  if(x.revealed===0){
   editor.innerHTML='<div class="a06-empty">第 0 版写好之后，点上面的「加第 1 条限制」。<br>限制会一条一条出现，不会一次给你三条。</div>';
   return;
  }
  const i=x.revealed-1,c=CONS[i],s=x.stages[i],t=taskOf(x.task);
  if(s.done){
   if(x.revealed>=3){
    editor.innerHTML='<div class="a06-finish"><div class="a06-finish-h">✓ 三条限制都加完了</div>'+
      '<p>你手上这一版，是在「不加钱、不加人、不换系统」的条件下还能成立的做法。右边是它和第 0 版的对照。</p></div>';
   }else{
    editor.innerHTML='<div class="a06-finish"><div class="a06-finish-h">✓ 已记下第 '+(i+1)+' 版（'+c.n+'）</div>'+
      '<p>下一条限制现在才出现。加之前，别急着替它想答案。</p>'+
      '<button class="btn primary sm" data-add="'+(i+1)+'">加第 '+(i+2)+' 条限制 →</button></div>';
   }
   return;
  }
  const prev=prevText(x,i);
  editor.innerHTML='<div class="a06-cur">'+
    '<div class="a06-cur-h"><span class="a06-cnum">'+(i+1)+'</span><b>'+c.n+'</b><em>'+c.cap+'限制</em><span class="a06-cur-why">'+c.why+'</span></div>'+
    '<p class="a06-cur-q">'+(t?api.esc(t['c'+(i+1)]):'')+'</p>'+
    '<div class="a06-cur-b">'+
      '<div class="field a06-fld"><label>第 '+(i+1)+' 版 · 只在这条限制下 <em id="a06TextCnt">0 / 12</em></label>'+
      '<textarea id="a06Text" maxlength="140" placeholder="在上一版的基础上改。不要换题，只换做法。">'+api.esc(s.text)+'</textarea></div>'+
      '<div class="a06-cur-r">'+
        '<div class="field a06-fld a06-give"><label>这条限制让我放弃了什么 <em id="a06GiveCnt">0 / 4</em></label>'+
        '<input id="a06Give" maxlength="40" value="'+api.esc(s.give)+'" placeholder="'+(t?api.esc(t['g'+(i+1)]):'例如：外包、加人、换系统')+'"></div>'+
        '<div class="a06-cur-act"><button class="btn sm ghost" data-base="'+i+'">以上一版为底稿</button>'+
        '<button class="btn sm primary" id="a06Record">记下第 '+(i+1)+' 版</button></div>'+
      '</div>'+
    '</div>'+
    '<div class="a06-cur-f"><span class="small" id="a06CurHint">上一版：'+api.esc(prev||'（还没写）')+'</span></div>'+
  '</div>';
  bindEditor();
  paintCounts();
 }
 function paintCounts(){
  const x=ensure(S),i=x.revealed-1;
  if(i<0)return;
  const s=x.stages[i];
  const tc=sec.querySelector('#a06TextCnt'),gc=sec.querySelector('#a06GiveCnt'),
        ch=sec.querySelector('#a06CurHint');
  if(tc)tc.textContent=(s.text||'').length+' / 12';
  if(gc)gc.textContent=(s.give||'').length+' / 4';
  if(tc)tc.classList.toggle('a06-pass',vOk(s.text));
  if(gc)gc.classList.toggle('a06-pass',giveOk(s.give));
  if(ch){
   if(!vOk(s.text))ch.textContent='至少 12 个字。写清在这条限制下，具体谁做什么。';
   else if(!giveOk(s.give))ch.textContent='再写一句：这条限制让你放弃了什么。';
   else if(s.text.trim()===prevText(x,i).trim())ch.textContent='这一版和上一版一字不差——限制没有落到做法上。';
   else ch.textContent='这一版成立。记下它，再加下一条。';
   ch.classList.toggle('a06-pass',stageReady(x,i));
  }
 }
 function paintCompare(){
  const x=ensure(S),n=doneCount(x);
  cmpN.textContent=n?('已加 '+n+' 条'):'还没有限制';
  const after=latestText(x);
  const gives=x.stages.filter(s=>s.done&&s.give);
  cmp.innerHTML='<div class="a06-before"><span>限制前 · 第 0 版</span><p>'+api.esc(x.v0||'还没有写。')+'</p></div>'+
    '<div class="a06-arrow"><i></i><em>'+(n?('经过 '+n+' 条限制'):'加限制之后')+'</em></div>'+
    '<div class="a06-after"><span>限制后 · 第 '+n+' 版</span><p>'+(n?api.esc(after):'还没有。先记下第 1 版。')+'</p></div>'+
    (gives.length?'<div class="a06-gives"><b>让掉的</b>'+gives.map(s=>{
      const idx=x.stages.indexOf(s);
      return '<span>'+CONS[idx].short+'：'+api.esc(s.give)+'</span>';
    }).join('')+'</div>':'')+
    (allDone(x)?'<p class="a06-cmp-done">三条加完。这就是限制干的事：它没给你答案，它只是把原来那条路封了。</p>':'');
 }
 function paintStatus(){
  const x=ensure(S),n=doneCount(x);
  const active=x.stages.findIndex((s,i)=>i<x.revealed&&!s.done);
  st.textContent=n+' / 3 条 · '+(n+(x.v0?1:0))+' / 4 版';
  st.classList.toggle('a06-pass',allDone(x));
  if(!x.task)hintEl.textContent='选一个任务开始。三条限制加完，这一节的工作台才算走完。';
  else if(!vOk(x.v0))hintEl.textContent='先写第 0 版：把预算、人力、系统都用上的那个办法。';
  else if(allDone(x))hintEl.textContent='三条加完。看右边的对照：哪一句是第 0 版里不会出现的？';
  else if(active>=0)hintEl.textContent='第 '+(active+1)+' 条限制已加上：改完这一版，点「记下第 '+(active+1)+' 版」。';
  else hintEl.textContent='第 '+(n+1)+' 条限制还没加——点下面的按钮，加一条，改一版。';
  hintEl.classList.toggle('a06-pass',allDone(x));
 }
 function paintAll(force){
  paintTasks();paintV0();paintLadder();paintEditor(force);paintCompare();paintStatus();api.refresh();
 }

 function bindEditor(){
  const x=ensure(S),i=x.revealed-1;
  if(i<0)return;
  const tx=sec.querySelector('#a06Text'),gv=sec.querySelector('#a06Give');
  const rec=sec.querySelector('#a06Record'),base=sec.querySelector('[data-base="'+i+'"]');
  if(tx){
   tx.addEventListener('input',()=>{
    x.stages[i].text=tx.value;api.save();paintCounts();paintCompare();paintStatus();api.refresh();
   });
   tx.addEventListener('focus',()=>{try{tx.setSelectionRange(tx.value.length,tx.value.length);}catch(e){}});
  }
  if(gv)gv.addEventListener('input',()=>{
   x.stages[i].give=gv.value;api.save();paintCounts();paintCompare();paintStatus();api.refresh();
  });
  if(base)base.onclick=()=>{
   const p=prevText(x,i);
   if(!p){api.toast('上一版还是空的');return;}
   x.stages[i].text=p;api.save();
   if(tx){tx.value=p;tx.focus();try{tx.setSelectionRange(p.length,p.length);}catch(e){}}
   paintCounts();paintCompare();paintStatus();api.refresh();
   api.toast('已放进上一版，现在改它');
  };
  if(rec)rec.onclick=()=>record(i);
 }
 function record(i){
  const x=ensure(S),s=x.stages[i];
  if(!vOk(s.text)){api.toast('第 '+(i+1)+' 版至少 12 个字');return;}
  if(!giveOk(s.give)){api.toast('写一句：这条限制让你放弃了什么');return;}
  if(s.text.trim()===prevText(x,i).trim()){api.toast('这一版和上一版一字不差，先改一处');return;}
  s.done=true;
  api.save();paintAll(true);
  api.toast(i<2?'第 '+(i+1)+' 版记下了。加下一条限制。':'第 3 版记下了。三条限制加完。');
 }

 function addCon(i){
  const x=ensure(S);
  if(i===0){
   if(!x.task){api.toast('先选一个任务');return;}
   if(!vOk(x.v0)){api.toast('第 0 版至少 12 个字');return;}
  }else if(!x.stages[i-1].done){api.toast('先把上一版记下');return;}
  x.revealed=Math.max(x.revealed,i+1);
  api.save();paintAll(true);
  if(i>0)api.toast('第 '+(i+1)+' 条限制：'+CONS[i].n);
  requestAnimationFrame(()=>{
   const t=sec.querySelector('#a06Text');
   if(t)t.focus();
  });
 }

 function confirmBox(title,body,okText,onOk){
  api.modal('<button class="modal-x">×</button><h3>'+title+'</h3><p>'+body+'</p>'+
    '<div class="modal-actions"><button class="btn ghost" id="a06Cancel">取消</button>'+
    '<button class="btn primary" id="a06Ok">'+okText+'</button></div>');
  const c=document.getElementById('a06Cancel');if(c)c.onclick=()=>api.closeModal();
  const o=document.getElementById('a06Ok');if(o)o.onclick=()=>{api.closeModal();onOk();};
 }
 function hasWork(x){return !!x.v0||x.stages.some(s=>s.done||s.text);}

 tasksEl.addEventListener('click',e=>{
  const b=e.target.closest('[data-task]');if(!b)return;
  const x=ensure(S),k=b.dataset.task;
  if(k===x.task)return;
  const go=()=>{
   const a=ensure(S);
   a.task=k;a.v0='';a.revealed=0;
   a.stages=[{text:'',give:'',done:false},{text:'',give:'',done:false},{text:'',give:'',done:false}];
   api.save();paintAll(true);api.toast('已切换到「'+TASKN[k]+'」');
  };
  if(hasWork(x))confirmBox('换任务会清空记录','已经写好的第 0 版和三版改写都会清掉。确定换吗？','换，清空',go);
  else go();
 });

 v0El.addEventListener('input',()=>{
  const x=ensure(S);
  x.v0=v0El.value;api.save();paintV0();paintCompare();paintStatus();api.refresh();
 });

 sec.querySelector('.a06-bench').addEventListener('click',e=>{
  const add=e.target.closest('[data-add]');
  if(add){addCon(+add.dataset.add);return;}
  const ed=e.target.closest('[data-edit]');
  if(ed){
   const x=ensure(S),i=+ed.dataset.edit;
   if(!x.stages[i].done)return;
   const later=x.stages.slice(i+1).some(s=>s.done);
   const go=()=>{
    const a=ensure(S);
    a.stages[i].done=false;
    for(let j=i+1;j<3;j++)a.stages[j]={text:'',give:'',done:false};
    a.revealed=i+1;api.save();paintAll(true);api.toast('改第 '+(i+1)+' 版');
    requestAnimationFrame(()=>{const t=sec.querySelector('#a06Text');if(t)t.focus();});
   };
   if(later)confirmBox('改第 '+(i+1)+' 版？','后面已记下的版本会清空，需要重写。','改，清掉后面',go);
   else go();
   return;
  }
 });

 sec.querySelector('#a06Reset').onclick=()=>{
  const x=ensure(S);
  if(!hasWork(x)){api.toast('已经是空的');return;}
  confirmBox('清空重来？','第 0 版和三版改写都会清掉，任务保留。','清空',()=>{
   const a=ensure(S);a.v0='';a.revealed=0;
   a.stages=[{text:'',give:'',done:false},{text:'',give:'',done:false},{text:'',give:'',done:false}];
   api.save();paintAll(true);api.toast('已清空');
  });
 };

 paintAll(true);
 sec.__a06=function(){paintAll(false);};
},
onEnter(){
 const sec=document.querySelector('.step[data-s="2"]');
 if(sec&&sec.__a06)requestAnimationFrame(sec.__a06);
},
hint(S){
 const x=view(S);
 if(!x.task)return '先选一个任务';
 if(!vOk(x.v0))return '先写第 0 版常规解法（至少 12 个字）';
 const active=x.stages.findIndex((s,i)=>i<x.revealed&&!s.done);
 if(active>=0)return '第 '+(active+1)+' 条限制已加上：改完这一版并记下';
 const next=x.stages.findIndex(s=>!s.done);
 if(next>=0)return '还差第 '+(next+1)+' 条限制：点「加第 '+(next+1)+' 条限制」';
 return '';
},
gate(S){return benchGate(view(S));}},

/* ================= 4 在你的事上 ================= */
{id:'mine',name:'在你的事上',short:'我的',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>给你的项目，<em>主动加一条</em></h1>
<p>刚才的限制是别人给的。这一次你自己加。不是许愿「希望更快」，是写一条你真的会执行的边界。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>写一个真实项目</span>
  <span class="op"><span class="op-n">2</span>选一条限制</span>
  <span class="op"><span class="op-n">3</span>写成数字，再写一句取舍</span>
</div>
<div class="grid2 a06-mine" style="align-items:start">
  <div class="stack">
    <div class="panel">
      <div class="panel-h"><h4>① 你手上的一个真实项目</h4><span>≥ 8 字</span></div>
      <div class="field"><label>写你下周还要推进的那个 <em class="a06-cnt" id="a06ProjCnt">0 / 8</em></label>
        <textarea id="a06Proj" maxlength="60" style="min-height:58px" placeholder="例如：Q1 的客户续约流程改造"></textarea></div>
      <div class="hint" style="margin-top:6px">不要写「提升效率」这种题目。写一个你知道下周要开会的项目。</div>
    </div>
    <div class="panel">
      <div class="panel-h"><h4>② 主动加哪一条</h4><span>选一条，别贪</span></div>
      <div class="a06-kinds" id="a06Kinds">
        ${KINDS.map(k=>`<button class="a06-kind" data-kind="${k.k}"><b>${k.n}</b><span>${k.s}</span></button>`).join('')}
      </div>
      <div class="field" style="margin-top:9px"><label>把限制写成数字或明确边界 <em class="a06-cnt" id="a06NumCnt">0 / 2</em></label>
        <input id="a06Num" maxlength="30" placeholder="先选一条限制"></div>
      <div class="hint" style="margin-top:6px">「更少」不是限制，数字才是。3 周、0 元、2 个人、1 个功能。</div>
    </div>
  </div>
  <div class="stack">
    <div class="panel">
      <div class="panel-h"><h4>③ 这条限制会逼我放弃什么、换来什么</h4><span>≥ 16 字</span></div>
      <div class="field"><label>一句写清两边 <em class="a06-cnt" id="a06LineCnt">0 / 16</em></label>
        <textarea id="a06Line" maxlength="90" style="min-height:80px" placeholder="例如：放弃「全量上线」，换来 3 周内拿到第一批真实反馈"></textarea></div>
      <div class="a06-checks" id="a06Checks">
        <div class="chk" data-c="num"><i>○</i><b>有数字</b><span>不是「更少」，是 3 周 / 0 元 / 2 人</span></div>
        <div class="chk" data-c="give"><i>○</i><b>写了放弃</b><span>放弃、砍掉、下线、不做</span></div>
        <div class="chk" data-c="get"><i>○</i><b>写了换来</b><span>换来、提前、腾出、拿到</span></div>
      </div>
    </div>
    <div class="a06-mcard" id="a06MCard">
      <div class="a06-mcard-h"><span>我的限制卡</span><em>A06</em></div>
      <b id="a06MKind">还没选</b>
      <div class="a06-mnum" id="a06MNum">—</div>
      <p id="a06MLine">写完这一句，你就知道这条限制值不值得加。</p>
    </div>
  </div>
</div>`,
init(sec,api){
 const S=api.S;
 ensure(S);
 const a=()=>ensure(S).mine;
 const proj=sec.querySelector('#a06Proj'),num=sec.querySelector('#a06Num'),line=sec.querySelector('#a06Line'),
       pc=sec.querySelector('#a06ProjCnt'),nc=sec.querySelector('#a06NumCnt'),lc=sec.querySelector('#a06LineCnt'),
       checks=sec.querySelector('#a06Checks'),mKind=sec.querySelector('#a06MKind'),
       mNum=sec.querySelector('#a06MNum'),mLine=sec.querySelector('#a06MLine');
 function check(){
  const m=a();
  const rows=[
   ['num',m.num.trim().length>=2&&/[0-9０-９]|零|全部|只留|只做/.test(m.num)],
   ['give',/放弃|砍掉|不做|下线|减掉|让掉|舍掉/.test(m.line)],
   ['get',/换|得到|腾出|提前|保住|拿到|省下/.test(m.line)]
  ];
  rows.forEach(r=>{
   const el=checks.querySelector('[data-c="'+r[0]+'"]');
   el.classList.toggle('on',r[1]);el.querySelector('i').textContent=r[1]?'✓':'○';
  });
  return rows;
 }
 function counters(){
  const m=a();
  pc.textContent=m.proj.length+' / 8';pc.classList.toggle('a06-pass',m.proj.trim().length>=8);
  nc.textContent=m.num.length+' / 2';nc.classList.toggle('a06-pass',m.num.trim().length>=2);
  lc.textContent=m.line.length+' / 16';lc.classList.toggle('a06-pass',m.line.trim().length>=16);
 }
 function paint(){
  const m=a();
  if(document.activeElement!==proj&&proj.value!==m.proj)proj.value=m.proj;
  if(document.activeElement!==num&&num.value!==m.num)num.value=m.num;
  if(document.activeElement!==line&&line.value!==m.line)line.value=m.line;
  sec.querySelectorAll('[data-kind]').forEach(b=>b.classList.toggle('on',m.kind===b.dataset.kind));
  const k=kindOf(m.kind);
  num.placeholder=k?k.ph:'先选一条限制';
  const exp=k?k.ex:'';
  line.placeholder=exp?('例如：'+exp):'例如：放弃「全量上线」，换来 3 周内拿到第一批真实反馈';
  counters();check();paintPreview();api.refresh();
 }
 function paintPreview(){
  const m=a(),k=kindOf(m.kind);
  mKind.textContent=k?k.n:'还没选';
  mNum.textContent=m.num||'—';
  mLine.textContent=m.line||'写完这一句，你就知道这条限制值不值得加。';
  mLine.classList.toggle('fill',!!m.line);
 }
 function save(){
  api.save();counters();check();paintPreview();api.refresh();
 }
 proj.addEventListener('input',()=>{a().proj=proj.value;save();});
 num.addEventListener('input',()=>{a().num=num.value;save();});
 line.addEventListener('input',()=>{a().line=line.value;save();});
 sec.querySelector('#a06Kinds').addEventListener('click',e=>{
  const b=e.target.closest('[data-kind]');if(!b)return;
  a().kind=b.dataset.kind;
  api.save();paint();
 });
 paint();
 sec.__a06m=function(){paint();};
},
onEnter(){
 const sec=document.querySelector('.step[data-s="3"]');
 if(sec&&sec.__a06m)requestAnimationFrame(sec.__a06m);
},
hint(S){
 const m=view(S).mine;
 if(m.proj.trim().length<8)return '先写一个真实项目（至少 8 个字）';
 if(!m.kind)return '选一条限制：时间 / 钱 / 人 / 功能';
 if(m.num.trim().length<2)return '把限制写成一个数字或明确边界';
 if(m.line.trim().length<16)return '写一句：放弃什么、换来什么（至少 16 个字）';
 return '';
},
gate(S){return mineGate(view(S));}},

/* ================= 5 过滤与提交 ================= */
{id:'submit',name:'过滤与提交',short:'提交',kicker:'STEP 5 · 过滤与提交',
html:`
<div class="step-h"><h1>交卡前，<em>先问两个问题</em></h1>
<p>限制最容易骗人的地方，是它听起来像「没办法」。两个问题，把它拆开：它是不是真的；谁的利益被它动了。</p></div>
<div class="grid2 a06-sub" style="align-items:start">
  <div class="stack">
    <div class="panel a06-q">
      <div class="panel-h"><h4>① 这条限制是真的吗？</h4><span>单选</span></div>
      <p class="a06-q-lead">选你刚才在「在你的事上」加的那一条。</p>
      <div class="opts">
        ${Q1.map(q=>`<button class="opt" data-q1="${q.k}"><span class="k">${q.k.toUpperCase()}</span><span><b>${q.n}</b><span>${q.s}</span></span></button>`).join('')}
      </div>
      <div id="a06Q1Out" style="margin-top:8px"></div>
    </div>
    <div class="panel a06-q">
      <div class="panel-h"><h4>② 谁会第一个反对？</h4><span>≥ 6 字</span></div>
      <div class="field"><label>写一个岗位或一类人 <em class="a06-cnt" id="a06OppCnt">0 / 6</em></label>
        <textarea id="a06Opp" maxlength="80" style="min-height:64px" placeholder="例如：靠返点吃饭的渠道经理——限制一加，他的报价空间就没了"></textarea></div>
      <div class="hint" style="margin-top:6px">「领导不支持」太远。写那个具体损失了东西的人。</div>
    </div>
  </div>
  <div class="stack">
    <div id="a06CardSlot"></div>
    <div class="panel a06-submit">
      <div class="panel-h"><h4>交卡</h4><span id="a06SubSt">卡还不完整</span></div>
      <p class="small">提交后进入班级互评池。未登录只存本机。</p>
      <div class="row" style="margin-top:9px">
        <button class="btn primary" id="a06SubBtn" disabled>提交到班级</button>
        <button class="btn" id="a06ExpBtn">导出 PNG</button>
      </div>
      <div class="a06-sub-note">互评只看三件事：限制是不是真的、前后有没有变、取舍敢不敢写。</div>
    </div>
  </div>
</div>`,
init(sec,api){
 const S=api.S;
 ensure(S);
 const x=()=>ensure(S);
 const opp=sec.querySelector('#a06Opp'),oppCnt=sec.querySelector('#a06OppCnt'),
       q1out=sec.querySelector('#a06Q1Out'),slot=sec.querySelector('#a06CardSlot'),
       btn=sec.querySelector('#a06SubBtn'),st=sec.querySelector('#a06SubSt');
 function paintQ1(){
  const a=x(),v=a.q1;
  sec.querySelectorAll('[data-q1]').forEach(b=>b.classList.toggle('on',v===b.dataset.q1));
  if(!v){q1out.innerHTML='';return;}
  const q=Q1.filter(z=>z.k===v)[0];
  q1out.innerHTML='<div class="a06-q1v"><b>'+q.n+'。</b>'+q.r+'</div>';
 }
 function cardRows(){
  const a=x(),t=taskOf(a.task),n=doneCount(a);
  const gives=a.stages.filter(s=>s.done&&s.give).map(s=>{
   const idx=a.stages.indexOf(s);return CONS[idx].short+'：'+s.give;
  }).join(' / ');
  const k=kindOf(a.mine.kind);
  const mine=a.mine.proj?((k?k.n:'')+(a.mine.num?'（'+a.mine.num+'）':'')+'｜'+a.mine.line):'—';
  return [
   ['任务',t?t.n:'—'],
   ['常规解法',a.v0||'—'],
   ['限制后',n?latestText(a):'—'],
   ['让掉的',gives||'—'],
   ['我给自己加的',mine],
   ['谁先反对',a.q2||'—']
  ];
 }
 function paintCard(){
  const rows=cardRows();
  const miss=rows.filter(r=>!r[1]||r[1]==='—').map(r=>r[0]);
  slot.innerHTML='<div class="outcard a06-card"><div class="oh"><span>DELIVERABLE · A06</span><span>限制改写卡</span></div>'+
   '<h5>我的限制改写卡</h5><div class="kv">'+rows.map(r=>
    '<div><b>'+api.esc(r[0])+'</b><span class="'+(r[1]&&r[1]!=='—'?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+
   '</div>'+
   (miss.length?'<div class="a06-card-miss">还缺 '+miss.length+' 行——回前面几步补上。</div>'
     :'<div class="a06-card-miss a06-card-ok">六行齐了。答完两问就能提交。</div>')+
   '</div>';
 }
 function paintSubmit(){
  const a=x(),ok=submitGate(a);
  btn.disabled=!!S.submitted||!ok;
  btn.textContent=S.submitted?'已提交':(ok?'提交到班级':'先补完两问');
  st.textContent=S.submitted?'已提交 · 进入互评池':(ok?'可以提交':'卡还不完整');
  st.classList.toggle('a06-pass',!!S.submitted||ok);
 }
 function paint(){
  const a=x();
  if(document.activeElement!==opp)opp.value=a.q2;
  oppCnt.textContent=a.q2.length+' / 6';oppCnt.classList.toggle('a06-pass',a.q2.trim().length>=6);
  paintQ1();paintCard();paintSubmit();api.refresh();
 }
 sec.querySelectorAll('[data-q1]').forEach(b=>b.onclick=()=>{
  const a=x();a.q1=b.dataset.q1;api.save();paint();
 });
 opp.addEventListener('input',()=>{
  const a=x();a.q2=opp.value;api.save();
  oppCnt.textContent=a.q2.length+' / 6';oppCnt.classList.toggle('a06-pass',a.q2.trim().length>=6);
  paintCard();paintSubmit();api.refresh();
 });
 btn.onclick=async()=>{
  if(!submitGate(x())){api.toast('先回答两个问题');return;}
  btn.disabled=true;btn.textContent='提交中…';
  try{await api.submit();}catch(e){api.toast('提交出错，已存本机');}
  paint();
 };
 sec.querySelector('#a06ExpBtn').onclick=()=>api.exportCard();
 paint();
 sec.__a06s=function(){paint();};
},
onEnter(){
 const sec=document.querySelector('.step[data-s="4"]');
 if(sec&&sec.__a06s)requestAnimationFrame(sec.__a06s);
},
hint(S){
 const x=view(S);
 if(!x.q1)return '先回答：这条限制是真的吗';
 if(x.q2.trim().length<6)return '再写：谁会第一个反对（至少 6 个字）';
 return '';
},
gate(S){return submitGate(view(S));}},

/* ================= 6 收束 ================= */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>带走<em>三句话</em></h1></div>
<div class="grid3 a06-takes">
  <div class="panel a06-take"><div class="a06-tn">01</div><b>限制是边界</b>
    <p>它不告诉你答案，它先把最熟的那条路封掉。搜索空间小了，你能看见的选项反而变了。</p></div>
  <div class="panel a06-take"><div class="a06-tn">02</div><b>越硬，越新</b>
    <p>软限制只让你更努力，硬限制让你换一条路。「没预算」比「预算少一点」更容易出新东西。</p></div>
  <div class="panel a06-take"><div class="a06-tn">03</div><b>先问真假</b>
    <p>外部给的限制要遵守；自己补的限制要先拆。多数「没办法」，是第二类。</p></div>
</div>
<div class="panel a06-next">
  <div class="panel-h"><h4>下一节 · A07</h4><span>盒内思考：把组件变成资源</span></div>
  <div class="a06-next-b">
    ${CLOSED}
    <div>
      <p class="a06-next-p">A07 会把阿波罗 13 桌上那堆东西列成一张清单：纸板、胶带、软管、塑料袋、手册、手电。然后只问一句：<b>每一样还能干什么？</b></p>
      <p class="small" style="margin-top:6px">这一节，你被限制逼着改；下一节，你主动把限制变成一张资源清单。前者是被动，后者是方法。</p>
      <div class="row" style="margin-top:12px">
        <a class="btn primary" href="index.html">回到课程地图</a>
        <button class="btn" id="a06Again">重看这一节</button>
      </div>
    </div>
  </div>
</div>`,
init(sec,api){sec.querySelector('#a06Again').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '阿波罗 13 那四样东西里，哪一样你一开始根本不会想到？',
 '你最近说过的那句「没办法」，是真限制，还是自己补的？',
 '如果预算砍一半、人不加，你现在这个项目会先砍掉哪一步？',
 '你给团队加的限制，你自己承担代价吗？',
 '限制加上之后，你放弃的那件事，真的非做不可吗？'
]},

card(S){
 const a=view(S),t=taskOf(a.task),n=doneCount(a),k=kindOf(a.mine.kind);
 const gives=a.stages.filter(s=>s.done&&s.give).map(s=>{
  const idx=a.stages.indexOf(s);return CONS[idx].short+'：'+s.give;
 }).join(' / ');
 const mine=a.mine.proj?((k?k.n:'')+(a.mine.num?'（'+a.mine.num+'）':'')+'｜'+a.mine.line):'—';
 return {title:'A06 · 我的限制改写卡',rows:[
  ['任务',t?t.n:'—'],
  ['常规解法',a.v0||'—'],
  ['限制后',n?latestText(a):'—'],
  ['让掉的',gives||'—'],
  ['我给自己加的',mine],
  ['谁先反对',a.q2||'—']
 ]};
},

notes:[
 {t:'本节目标',h:'让学员亲手经历一次「加限制—改写」：限制不是障碍，是把最熟的解法排除掉的那条线。验收不看点子新，看<b>第 0 版与第 3 版之间有没有真的变化</b>。'},
 {t:'时间分配（45′）',h:'先猜 7′ · 概念 8′ · 工作台 14′ · 自己的限制 7′ · 两问与提交 6′ · 收束 3′。工作台至少留 10 分钟让人真写三版，不要替他们总结。'},
 {t:'常见卡点',h:'① 第 0 版就写得很省，后面没得改——先鼓励他把预算、人力、系统都用上；② 三版只换形容词（「更聚焦」「更高效」），追问「谁在做、用什么做、哪一步没了」；③ 把「放弃」写成「没做好」，那不算取舍。'},
 {t:'直播怎么接',h:'看后台：三版都写完的人里，有多少第 3 版还留着「加人/买工具」的影子；再看「让掉的」一栏，挑 2 张卡现场念第 0 版和第 3 版，只问一句<b>「这两版之间，哪一步真的消失了？」</b>。最后统计「我给自己加的限制」选了哪一类——如果一半人选「更少时间」，说明大家最怕的是排期，不是资源。'},
 {t:'事实与素材',h:'阿波罗 13：1970-04-13 氧气罐爆炸，登月舱当救生艇，地面口述步骤、宇航员用纸板、胶带、宇航服软管、塑料袋做转接件，二氧化碳曲线随后回落。图为 SIT 官方课件「阿波罗视频」截帧（Day1 p.95），是电影片段，不是任务原始录像；以色列段用 Day1 p.77–83（滴灌 1964、海水淡化、太阳能）。讲的时候把「电影」和「原始任务」分开说，别让学员以为那是 NASA 实拍。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A06']=L;
})();
