/* =========================================================
   DAY 4 · 测试迭代    发小明 单变量 + 系统
   定指标 → 测试台 → 失败清单 → 只改一处 → 真实用户
   ========================================================= */
(function(){
'use strict';

const r1=v=>Math.round(v*10)/10;
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
function hash(s){let h=7;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))%997;return h;}
function jit(k,span){return ((hash(k)%(span*2+1))-span)/10;}

/* ---------- 四条候选指标：统一 0–10 分，读法写在卡上 ---------- */
const METRICS=[
 {id:'easy',ic:'✅',name:'好用',q:'不教他，他自己一次就用对了',
  how:'把东西递过去，只说"你试试"，然后闭嘴。',
  rubric:'0 分：要人教 / 10 分：一次就对，还知道下一步',
  line:6.5,why:'这条最像"能不能用"。它测的是他，不是你的感觉。',
  say:{low:'他拿着停住 6 秒，等你说下一步。',mid:'他试了 2 次才对，中间停了一下。',hi:'他一次就用对了，还自己找到了下一步。'}},

 {id:'see',ic:'👀',name:'看得见',q:'站 1 米外，他能看见提示',
  how:'让他站在 1 米外，不指、不提醒，看他找不找得到。',
  rubric:'0 分：看不见 / 10 分：一眼看见，还知道它在说什么',
  line:6,why:'很多"不会用"其实是"没看见"。这条能把这个分开。',
  say:{low:'他站 1 米外说"没看见"，凑近才找到。',mid:'他凑到 40 厘米才看清，站远了不确定。',hi:'1 米外一眼看见，还指了指它。'}},

 {id:'solid',ic:'🧱',name:'不散架',q:'连用 5 次，还站得住',
  how:'用完一次检查一次，连续 5 次，记下第几次开始松。',
  rubric:'0 分：一碰就掉 / 10 分：5 次用完还结实',
  line:7,why:'散架不是"他不小心"，是连接方式撑不住。',
  say:{low:'第 2 次就掉了，胶带已经翻边。',mid:'第 3 次开始有点歪，但没散。',hi:'连用 5 次，还是稳稳的。'}},

 {id:'fast',ic:'⏱️',name:'够快',q:'从开始到完事，几秒',
  how:'掐秒表，从他伸手到看见结果，记秒数再换算成分。',
  rubric:'0 分：要等 10 秒以上 / 10 分：2 秒内完事',
  line:6,why:'慢到他会放弃，就等于不能用。速度也是功能。',
  say:{low:'要等 6 秒以上，他已经转头去看别的了。',mid:'大约 4 秒，他会走神一下。',hi:'2 秒内完事，他都没来得及等。'}}
];

/* ---------- 三个测试条件 ---------- */
const CONDS=[
 {id:'day',ic:'☀️',name:'白天',desc:'教室自然光，旁边有人走动',
  mod:{easy:0,see:-.2,solid:0,fast:0},
  note:'白天的光最亮，但旁边有人走动，容易分心。'},
 {id:'night',ic:'🌙',name:'晚上',desc:'只开一盏台灯，房间很暗',
  mod:{easy:-.3,see:-1.6,solid:0,fast:-.4},
  note:'晚上最考验"看得见"：灯和背景一样亮，就等于没有。'},
 {id:'help',ic:'🤝',name:'有人帮忙',desc:'旁边的人会提醒他下一步',
  mod:{easy:.9,see:.1,solid:0,fast:.5},
  note:'有人提醒分数会变高——但这不是他自己会用。'}
];

/* 第一次测试的基准分：主指标一定落在及格线以下 */
const BASE={easy:3.5,see:3.3,solid:3.6,fast:3.1};

/* ---------- 六种失败 ---------- */
const FAILS=[
 {id:'dead',ic:'🔌',name:'没反应',wit:'按了，他没动，或者半天才亮',mean:'不是他不会用——是"开始"这一步不明显。要么开关太小，要么没有回馈。',from:['see']},
 {id:'slow',ic:'🐢',name:'太慢',wit:'他等了 4 秒以上，中间转头了',mean:'能用，但慢到他会放弃。慢，就等于不能用。',from:['fast']},
 {id:'fuss',ic:'🌀',name:'太麻烦',wit:'他要先做两三个动作，才开始',mean:'每多一步，就多一批人放弃。先看能不能减掉一步。',from:['easy']},
 {id:'wrong',ic:'🤔',name:'别人用错',wit:'他动作做对了，结果不是你想要的',mean:'这是最值钱的一条：你的意思没传到他手上。',from:['easy']},
 {id:'drop',ic:'💥',name:'会掉',wit:'用第二次就松了、掉了',mean:'不是"他不小心"，是连接方式撑不住。',from:['solid']},
 {id:'noise',ic:'🔊',name:'太吵',wit:'旁边的人回头看了他一眼',mean:'提示太强也会变成问题：在教室里会被要求关掉。',from:[]}
];

/* ---------- 四处改动：每处只动一个属性 ---------- */
const CHANGES=[
 {id:'pos',ic:'📍',name:'位置',desc:'提示从手背挪到指尖',affect:'看得见 · 够快',
  gain:{see:2.4,fast:1.8,easy:.6,solid:.2}},
 {id:'size',ic:'📏',name:'大小',desc:'提示灯从 5mm 换成 15mm',affect:'看得见 · 好用',
  gain:{see:1.7,easy:1,fast:.6,solid:.5}},
 {id:'mat',ic:'🧱',name:'材料',desc:'胶带换成魔术贴，底板加一层',affect:'不散架 · 好用',
  gain:{solid:2.4,easy:.8,see:.4,fast:.2}},
 {id:'cue',ic:'🔔',name:'提示方式',desc:'从"一直亮"改成"亮一下 + 滴一声"',affect:'好用 · 够快',
  gain:{easy:2.2,fast:1.2,see:.7,solid:.1}}
];

/* 主指标决定今天一起读另外哪两条（一共三条） */
const TRIO={
  easy:['easy','see','fast'],
  see:['see','easy','solid'],
  solid:['solid','easy','fast'],
  fast:['fast','easy','see']
};
const trio=id=>TRIO[id]||TRIO.easy;

/* ---------- 三个真实用户，各 3 个观察动作 ---------- */
const USERS=[
 {id:'gpa',emoji:'👴',name:'爷爷',tag:'70 岁 · 手有点抖 · 没戴老花镜',
  who:'他不会问，会自己试。试不出来就放着不动，等你想起来。',
  steps:[
   {t:'他先把提示灯拿反了，灯朝着自己',v:'misuse',
    why:'他按"顺手"的方向拿。如果只有一种拿法是对的，说明形状没帮他。'},
   {t:'他找了 5 秒，才摸到开关',v:'friction',alt:'他慢了一点，但自己找到了。动作是对的。',
    why:''},
   {t:'灯亮了，他看了一会儿，没说话',v:'confused',alt:'他没看懂灯在说什么——这不是"用错"，是提示的意思没讲清。',
    why:''}]},

 {id:'mate',emoji:'🧑‍🎓',name:'同学',tag:'同班 · 第一次见这个东西',
  who:'他会先猜，猜不对就乱按。他最怕在别人面前显得不会用。',
  steps:[
   {t:'他先把东西翻过来，找开关在哪',v:'friction',alt:'他找了一下就找到了。动作是对的。',
    why:''},
   {t:'他按了三次开关，以为第一次没成功',v:'misuse',
    why:'因为按下去没有"已经开了"的回馈。他只能靠再按一次来确认。'},
   {t:'他做完问：这样算好了吗？',v:'confused',alt:'他做完了，只是不敢确定——这是缺一个"完成了"的信号。',
    why:''}]},

 {id:'teacher',emoji:'👩‍🏫',name:'老师',tag:'40 岁 · 会先读说明再动手',
  who:'她会先看卡片上的字，再动手。她不会乱按，但会按字面理解。',
  steps:[
   {t:'她先读了一遍你写的卡片，才动手',v:'friction',alt:'她读了说明再动手，这是对的，而且正是你想要的。',
    why:''},
   {t:'她把开关按在"关"的位置，等了三秒',v:'misuse',
    why:'开关上没有"开/关"的字，她按字面理解成了"按下去就是关"。'},
   {t:'她说：这个声音我听不出是成功还是失败',v:'confused',alt:'她听不出结果——不是用错，是反馈太像了。',
    why:''}]}
];

const M=id=>METRICS.find(x=>x.id===id)||null;
const C=id=>CONDS.find(x=>x.id===id)||null;
const CH=id=>CHANGES.find(x=>x.id===id)||null;
const U=id=>USERS.find(x=>x.id===id)||null;

/* ---------- 两次读数都是算出来的，不写死结果 ---------- */
function runFirst(condId,primaryId){
  const c=C(condId)||CONDS[0];
  const out={};
  METRICS.forEach(m=>{
    let v=BASE[m.id]+(c.mod[m.id]||0);
    if(m.id!==primaryId)v+=jit(m.id+'|'+c.id,4);
    out[m.id]=r1(cl(v,1.4,9.4));
  });
  // 第一次主指标一定没过线：及格线最低 5 分，所以压到 4.6 以下
  out[primaryId]=r1(cl(Math.min(out[primaryId],4.6),1.4,4.6));
  return {cond:c.id,metric:primaryId,scores:out,ts:Date.now()};
}
function runSecond(t1,changeId){
  const ch=CH(changeId);if(!t1||!ch)return null;
  const out={};
  METRICS.forEach(m=>{
    const g=1.1+(ch.gain[m.id]||0)+jit('2|'+m.id+'|'+ch.id,2);
    out[m.id]=r1(cl(t1.scores[m.id]+g,1.4,9.6));
  });
  return {cond:t1.cond,metric:t1.metric,change:ch.id,scores:out,ts:Date.now()};
}

function sayOf(m,v){return m.say[v<5.5?'low':(v<7.5?'mid':'hi')];}
function worstOf(scores,ids){
  const list=(ids||METRICS.map(m=>m.id)).slice().sort((a,b)=>scores[a]-scores[b]);
  return M(list[0]);
}
function lineTone(v){
  if(v<=5.5)return '勉强能用的线：可以，但别停在 5 分。';
  if(v<=7.5)return '这是"同学能用"的线：今天的目标就是它。';
  return '这是"他愿意天天用"的线：今天大概到不了，先看数据。';
}
function suggested(f,S){
  if(!f.from.length)return false;
  const sc=S.t1&&S.t1.scores;if(!sc)return false;
  const weak=trio(S.metric).slice().sort((a,b)=>(sc[a]||0)-(sc[b]||0)).slice(0,2);
  return f.from.some(id=>weak.indexOf(id)>=0);
}
/* 这处改动是不是正好打在主指标上 */
function hits(ch,m){return !!ch&&(ch.gain[m.id]||0)>=1;}

/* ---------- 证据卡内容（第 5 幕写入，第 6 幕再生成一次） ---------- */
function evidenceOf(S){
  const m=M(S.metric)||METRICS[0];
  const line=(typeof S.line==='number')?S.line:m.line;
  const t1=S.t1||null,t2=S.t2||null;
  const c1=t1?C(t1.cond):null;
  const fails=FAILS.filter(f=>(S.fails||[]).indexOf(f.id)>=0);
  const chg=t2?CH(t2.change):CH(S.change);
  const u=U(S.user),step=(u&&S.obsStep>=0)?u.steps[S.obsStep]:null;
  const v1=t1?t1.scores[m.id]:null,v2=t2?t2.scores[m.id]:null;
  const d=(v1!=null&&v2!=null)?r1(v2-v1):null;
  const short=(v1!=null&&v2!=null)
    ?(m.name+' '+v1+'→'+v2+'，'+(chg?('只改'+chg.name):'只改一处'))
    :(m.name+' · 及格线 '+line+' 分');
  const w=t1?worstOf(t1.scores,trio(t1.metric)):null;
  return {
    title:'第 4 天 · 测试记录',short:short,
    fields:[
      {label:'主指标 / 及格线',value:m.ic+' '+m.name+' · 及格线 '+line+' 分'},
      {label:'第一次测试',value:t1?(c1.name+'：主指标 '+v1+' 分（没到线）· 最弱 '+w.name+' '+t1.scores[w.id]+' 分'):'—'},
      {label:'失败清单',value:fails.length?fails.map(f=>f.name).join(' / '):'—'},
      {label:'只改的那一处',value:chg?(chg.name+'：'+chg.desc):'—'},
      {label:'第二次测试',value:(v2!=null)?(v2+' 分（'+(d>0?'+':'')+d+'）· '+(v2>=line?'过线了':'还差 '+r1(line-v2)+' 分')):'—'},
      {label:'真实用户用错的地方',value:step?(u.name+'：'+step.t+(S.note?('。我记的：'+S.note):'')):'—'}
    ],
    stamp:'测试记录'
  };
}

/* ---------- 卡片 HTML（先算好，再拼进每一幕） ---------- */
const METRIC_CARDS=METRICS.map(m=>
  '<button class="d4-mcard" data-m="'+m.id+'"><span class="mi">'+m.ic+'</span>'+
  '<span class="mb"><b>'+m.name+'</b><i>'+m.q+'</i></span><span class="mt">主指标</span></button>').join('');

const COND_CARDS=CONDS.map(c=>
  '<button class="d4-cond" data-c="'+c.id+'"><span class="ci">'+c.ic+'</span><b>'+c.name+'</b><i>'+c.desc+'</i></button>').join('');

const FAIL_CARDS=FAILS.map(f=>
  '<button class="d4-fail" data-f="'+f.id+'"><span class="fh"><span class="fi">'+f.ic+'</span><b>'+f.name+'</b><span class="fk">✓</span></span>'+
  '<i class="fw">'+f.wit+'</i><span class="fm">这说明：'+f.mean+'</span></button>').join('');

const CHANGE_CARDS=CHANGES.map(c=>
  '<button class="d4-chg" data-c="'+c.id+'"><span class="ci">'+c.ic+'</span><b>改'+c.name+'</b><i>'+c.desc+'</i><em>可能影响：'+c.affect+'</em></button>').join('');

const USER_CARDS=USERS.map(u=>
  '<button class="d4-user" data-u="'+u.id+'"><span class="ui">'+u.emoji+'</span><b>'+u.name+'</b><i>'+u.tag+'</i></button>').join('');

const c={
no:'4',title:'测试迭代',kicker:'DAY 4 / 5 · TEST',
line1:'只改一处',line2:'再测一次',
lead:'今天不比谁做得好。<br>今天要证明：<b>它到底行不行</b>——定一条及格线，测两次，中间只改一个地方。',
tool:'单变量 + 系统',words:['指标','读数','失败','单变量'],
meta:['6 幕 · 全天','混龄 7–13 大带小','材料：原型 + 秒表 + 任务单'],
acc:'#A78BFA',acc2:'#E9E1FF',rgb:'167,139,250',

acts:[
/* ---------- 01 定指标 ---------- */
{a:'01',name:'定指标',time:'30 分',html:`
<div class="ch-head"><div class="act"><b>01</b><span>定指标</span><i>先定"怎么算过关"</i></div><h2>先决定看什么，<em>再决定改什么</em></h2><p>今天不做新东西，今天要证明：它到底行不行。选<em>一条</em>主指标，再画一条及格线——测试才有标准。</p></div>
<div class="cp-hud"><span class="hp brand">单变量</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">主指标 <b data-mname>—</b></span><span class="hp">及格线 <b data-mline>—</b></span></div>
<div class="cp-split">
  <div class="cp-stage d4-stage">
    <div class="cp-stage-label">METRICS · 四选一，今天只盯这一条</div>
    <div class="d4-ms" data-ms>${METRIC_CARDS}</div>
    <div class="d4-line" data-linebox>
      <div class="d4-line-top"><span>及格线</span><b data-lnum>—</b><em data-lhint>先选主指标</em></div>
      <input class="d4-range" type="range" min="5" max="10" step="0.5" value="6.5" data-line aria-label="及格线">
      <div class="d4-line-ax"><span>5 · 勉强能用</span><span>7.5 · 同学能用</span><span>10 · 离不开它</span></div>
    </div>
  </div>
  <div class="cp-side">
    <div class="cp-panel"><h4>这条指标怎么读</h4><div class="d4-def" data-mdef><span class="muted">还没选。左边点一张卡。</span></div></div>
    <div class="cp-panel"><h4>及格线怎么定</h4><div class="cp-kv" data-linewhy><div class="row"><b>—</b><span class="muted">先选主指标</span></div></div></div>
    <div class="cp-coach"><div class="rb">🤖</div><div class="say"><b>发小明：</b>及格线不是越高越好。定一个<em>他真能用</em>的线，然后看数据怎么打你的脸。</div></div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>去测试台 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;const xp=sec.querySelector('[data-xp]');
  const line=sec.querySelector('[data-line]'),lnum=sec.querySelector('[data-lnum]'),lhint=sec.querySelector('[data-lhint]');
  const box=sec.querySelector('[data-linebox]'),mdef=sec.querySelector('[data-mdef]'),lwhy=sec.querySelector('[data-linewhy]');
  const mname=sec.querySelector('[data-mname]'),mline=sec.querySelector('[data-mline]'),next=sec.querySelector('[data-next]');
  function paint(){
    const m=M(S.metric);
    sec.querySelectorAll('[data-m]').forEach(b=>b.classList.toggle('on',b.dataset.m===S.metric));
    line.disabled=!m;box.classList.toggle('off',!m);
    if(m){
      if(typeof S.line!=='number')S.line=m.line;
      line.value=S.line;
      lnum.innerHTML=S.line+'<small>分</small>';
      lhint.textContent=lineTone(S.line);
      mdef.innerHTML='<b>'+m.ic+' '+m.q+'</b>怎么量：'+m.how+'<span class="rb">'+m.rubric+'</span>';
      lwhy.innerHTML='<div class="row"><b>5 分</b><span>勉强能用：他能凑合，但要人帮</span></div>'+
        '<div class="row"><b>'+m.line+' 分</b><span>建议线：比较像"他自己会用"</span></div>'+
        '<div class="row"><b>9 分</b><span>他愿意天天用——今天先别贪</span></div>';
    }else{
      lnum.textContent='—';lhint.textContent='先选主指标';
      mdef.innerHTML='<span class="muted">还没选。左边点一张卡。</span>';
      lwhy.innerHTML='<div class="row"><b>—</b><span class="muted">先选主指标</span></div>';
    }
    mname.textContent=m?m.name:'—';
    mline.textContent=m?(S.line+' 分'):'—';
    next.disabled=!m;
    xp.textContent=S.xp||0;
  }
  sec.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{
    if(S.metric===b.dataset.m)return;
    S.metric=b.dataset.m;
    const m=M(S.metric);S.line=m.line;
    api.save();api.sfx('pop');paint();
    api.toast('主指标：'+m.name+' · 及格线 '+m.line+' 分','🎯');
    if(!S._xp1){S._xp1=1;api.addXp(10);paint();}
  });
  line.addEventListener('input',()=>{S.line=+line.value;api.save();paint();});
  line.addEventListener('change',()=>api.sfx('tap'));
  paint();
  sec._d4paint=paint;
  next.onclick=()=>api.go(2);
},onEnter(sec){if(sec._d4paint)sec._d4paint();}},

/* ---------- 02 测试台 ---------- */
{a:'02',name:'测试台',time:'45 分',html:`
<div class="ch-head"><div class="act"><b>02</b><span>测试台</span><i>先测一次，别急着改</i></div><h2>第一次测试，<em>大概率不会过</em></h2><p>换一个条件，同一件东西的结果就不一样。选一个条件，点运行——三条指标会一起跳出来。</p></div>
<div class="cp-hud"><span class="hp brand">测试</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">条件 <b data-cname>—</b></span><span class="hp">主指标 <b data-mname>—</b></span><span class="hp">及格线 <b data-mline>—</b></span><span class="hp">读数 <b data-try>未运行</b></span></div>
<div class="cp-split">
  <div class="cp-stage d4-stage">
    <div class="cp-stage-label">TEST BENCH · 同一件东西，换个条件，结果不一样</div>
    <div class="d4-conds" data-conds>${COND_CARDS}</div>
    <div class="d4-runrow"><button class="btn primary sm" data-run>▶ 运行测试</button><span class="hint" data-runhint>先选一个条件</span></div>
    <div class="d4-meters" data-meters></div>
    <div class="d4-verdict" data-verdict><span class="muted">还没有读数。选一个条件，点"运行测试"。</span></div>
  </div>
  <div class="cp-side">
    <div class="cp-panel"><h4>这次的条件</h4><div class="cp-kv" data-cinfo><div class="row"><b>—</b><span class="muted">先选条件</span></div></div></div>
    <div class="cp-panel"><h4>读一遍这三条</h4><div class="cp-kv" data-t1sum><div class="row"><b>—</b><span class="muted">还没读数</span></div></div></div>
    <div class="cp-note" data-note><b>提示：</b>先选条件，再运行。第一次没到线是正常的。</div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>去列失败清单 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;const xp=sec.querySelector('[data-xp]');
  const meters=sec.querySelector('[data-meters]'),verdict=sec.querySelector('[data-verdict]');
  const cinfo=sec.querySelector('[data-cinfo]'),sum=sec.querySelector('[data-t1sum]');
  const note=sec.querySelector('[data-note]'),next=sec.querySelector('[data-next]');
  const run=sec.querySelector('[data-run]'),runhint=sec.querySelector('[data-runhint]');
  const cname=sec.querySelector('[data-cname]'),mname=sec.querySelector('[data-mname]');
  const mline=sec.querySelector('[data-mline]'),tryb=sec.querySelector('[data-try]');

  function paintMeters(scores,primary,line){
    meters.innerHTML=trio(primary).map(id=>{
      const m=M(id),v=scores?scores[m.id]:null,isP=m.id===primary,idle=v==null;
      const tone=idle?'':(v>=line?'good':'bad');
      return '<div class="d4-mtr'+(isP?' primary':'')+(tone?' '+tone:'')+(idle?' idle':'')+'" data-mtr="'+m.id+'">'+
        '<div class="mt-top"><span class="mt-name">'+m.ic+' '+m.name+(isP?'<em>主指标</em>':'')+'</span>'+
        '<b class="mt-val">'+(idle?'<small class="mt-idle">未测</small>':v+'<small>分</small>')+'</b></div>'+
        '<div class="bar'+(idle?' idle':'')+'">'+(idle?'':'<i data-fill="'+m.id+'" style="width:0%"></i>')+'<u style="left:'+(line*10)+'%"></u></div>'+
        '<div class="mt-say">'+(idle?'还没测：点上面的「运行测试」，这里会出现读数。':sayOf(m,v))+'</div></div>';
    }).join('');
    if(!scores)return;
    meters.querySelectorAll('[data-fill]').forEach((f,i)=>{
      const v=scores[f.dataset.fill];if(v==null)return;
      setTimeout(()=>{f.style.width=(v*10)+'%';},60+i*110);
    });
  }

  function paint(){
    const m=M(S.metric)||METRICS[0];
    const line=(typeof S.line==='number')?S.line:m.line;
    // 主指标换了 → 旧读数作废
    if(S.t1&&S.t1.metric!==S.metric){S.t1=null;S.t2=null;api.save();}
    const c=C(S.cond),t1=S.t1;
    sec.querySelectorAll('[data-c]').forEach(b=>b.classList.toggle('on',b.dataset.c===S.cond));
    cname.textContent=c?c.name:'—';
    mname.textContent=S.metric?m.name:'—';
    mline.textContent=S.metric?(line+' 分'):'—';
    tryb.textContent=t1?'第 1 次':'未运行';
    run.disabled=!S.cond;
    runhint.textContent=S.cond?('会按「'+c.name+'」跑一次'):'先选一个条件';
    cinfo.innerHTML=c
      ?('<div class="row"><b>条件</b><span>'+c.ic+' '+c.name+' · '+c.desc+'</span></div><div class="row"><b>提示</b><span>'+c.note+'</span></div>')
      :'<div class="row"><b>—</b><span class="muted">先选条件</span></div>';
    paintMeters(t1?t1.scores:null,S.metric||m.id,line);

    if(!t1){
      verdict.className='d4-verdict';
      verdict.innerHTML='<span class="muted">还没有读数。选一个条件，点"运行测试"。</span>';
      sum.innerHTML='<div class="row"><b>—</b><span class="muted">还没读数</span></div>';
    }else{
      const v=t1.scores[t1.metric],pass=v>=line,w=worstOf(t1.scores,trio(t1.metric));
      verdict.className='d4-verdict '+(pass?'good':'bad');
      verdict.innerHTML='<div class="dv-main"><b>'+(pass?'过线了':'没到线')+'</b><span>主指标 '+v+' / 及格线 '+line+' 分</span></div>'+
        '<p>'+(pass?'过了线，但先别高兴——看看另外两条。':'差 '+r1(line-v)+' 分。这不是"做坏了"，是今天第一个可以拿来改的数据。')+'</p>'+
        '<p class="dv-worst">三条里最弱的是「'+w.name+'」'+t1.scores[w.id]+' 分。</p>';
      sum.innerHTML='<div class="row"><b>第一次</b><span>主指标 '+v+' 分（'+(pass?'过线':'没到线')+'）</span></div>'+
        '<div class="row"><b>及格线</b><span>'+line+' 分</span></div>'+
        '<div class="row"><b>最弱</b><span>'+w.ic+' '+w.name+' '+t1.scores[w.id]+' 分</span></div>';
    }

    if(!S.cond)note.innerHTML='<b>先选条件：</b>白天、晚上、有人帮忙——同一件东西，三种结果。';
    else if(!t1)note.innerHTML='<b>条件已选：'+c.name+'。</b>点"运行测试"，把三条读数记下来。';
    else if(t1.cond!==S.cond)note.innerHTML='<b>条件换了：</b>再跑一次，会覆盖第一次的读数。条件变了，数据就不能直接比。';
    else note.innerHTML='<b>记下了：</b>主指标 '+t1.scores[t1.metric]+' 分，没到线。下一步把问题分开写——是没反应，还是太麻烦？';
    next.disabled=!t1;
    xp.textContent=S.xp||0;
  }

  sec.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{
    if(S.cond===b.dataset.c)return;
    S.cond=b.dataset.c;api.save();api.sfx('pop');paint();
  });
  run.onclick=()=>{
    if(!S.cond){api.toast('先选一个测试条件','☝️');return;}
    if(!S.metric){S.metric='easy';S.line=M('easy').line;api.toast('还没定指标，先按建议：好用 / 6.5 分','🎯');}
    const had=S.t1;
    S.t1=runFirst(S.cond,S.metric);
    S.t2=null;
    api.save();api.sfx('chime');
    api.burst(innerWidth*.34,innerHeight*.52,18,['#A78BFA','#E9E1FF','#FF7A6B']);
    paint();
    api.toast(had?'读数更新了：第 1 次':'第一次读数：没到线','📉');
    if(!S._xp2){S._xp2=1;api.addXp(15);paint();}
  };
  paint();
  sec._d4paint=paint;
  next.onclick=()=>api.go(3);
},onEnter(sec){if(sec._d4paint)sec._d4paint();}},

/* ---------- 03 失败清单 ---------- */
{a:'03',name:'失败清单',time:'50 分',html:`
<div class="ch-head"><div class="act"><b>03</b><span>失败清单</span><i>把"没做好"说具体</i></div><h2>不是"失败了"，<em>是这 6 种里的哪几种</em></h2><p>勾出这次真的出现的。每一条后面都有一句"这说明什么"——写下来，它比分数有用。</p></div>
<div class="cp-hud"><span class="hp brand">系统</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">勾选 <b data-fn>0</b>/6</span><span class="hp">够了吗 <b data-fok>还没</b></span></div>
<div class="cp-split">
  <div class="cp-stage d4-stage">
    <div class="cp-stage-label">FAILURE LIST · 这次测试真的出现了哪些</div>
    <div class="d4-fails" data-fails>${FAIL_CARDS}</div>
  </div>
  <div class="cp-side">
    <div class="cp-panel"><h4>你勾下的问题</h4><div class="d4-picked" data-picked><span class="muted">还没勾。左边点一个。</span></div></div>
    <div class="cp-note" data-note><b>提示：</b>勾"这次真的出现了"的，不要勾"可能会"。</div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>只改一处 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;S.fails=S.fails||[];
  const xp=sec.querySelector('[data-xp]'),fn=sec.querySelector('[data-fn]'),fok=sec.querySelector('[data-fok]');
  const picked=sec.querySelector('[data-picked]'),note=sec.querySelector('[data-note]'),next=sec.querySelector('[data-next]');
  function paint(){
    sec.querySelectorAll('[data-f]').forEach(b=>{
      const id=b.dataset.f,on=S.fails.indexOf(id)>=0,f=FAILS.find(x=>x.id===id);
      b.classList.toggle('on',on);
      let tag=b.querySelector('.sug');
      if(suggested(f,S)){
        if(!tag){tag=document.createElement('span');tag.className='sug';tag.textContent='数据里有';b.querySelector('.fh').appendChild(tag);}
      }else if(tag)tag.remove();
    });
    fn.textContent=S.fails.length;
    const ok=S.fails.length>=2;
    fok.textContent=ok?'够了':'还没';fok.style.color=ok?'#8BD17C':'';
    picked.innerHTML=S.fails.length?S.fails.map(id=>{
      const f=FAILS.find(x=>x.id===id);
      return '<div class="d4-pk"><b>'+f.ic+' '+f.name+'</b>'+f.mean+'</div>';
    }).join(''):'<span class="muted">还没勾。左边点一个。</span>';
    if(!S.fails.length)note.innerHTML='<b>先看清单：</b>只勾这次测试里真的出现的，不要勾"我觉得可能会"。';
    else if(!ok)note.innerHTML='<b>再勾一条：</b>一次测试很少只出一个问题。至少 2 条，才能看出是不是同一处的问题。';
    else note.innerHTML='<b>勾了 '+S.fails.length+' 条。</b>下一步只挑一条最想改的——不是全都改。';
    next.disabled=!ok;
    xp.textContent=S.xp||0;
  }
  sec.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{
    const id=b.dataset.f;
    if(S.fails.indexOf(id)>=0)S.fails=S.fails.filter(x=>x!==id);
    else S.fails=S.fails.concat(id);
    api.save();api.sfx(S.fails.indexOf(id)>=0?'pop':'tap');paint();
    if(S.fails.length>=2&&!S._xp3){S._xp3=1;api.addXp(10);paint();}
  });
  paint();
  sec._d4paint=paint;
  next.onclick=()=>api.go(4);
},onEnter(sec){if(sec._d4paint)sec._d4paint();}},

/* ---------- 04 只改一处 ---------- */
{a:'04',name:'只改一处',time:'50 分',html:`
<div class="ch-head"><div class="act"><b>04</b><span>只改一处</span><i>单变量</i></div><h2>只改一个地方，<em>再测一次</em></h2><p>改两处，你就不知道是哪一处起的作用。选<em>一处</em>，其他全都不动，然后重测。</p></div>
<div class="cp-hud"><span class="hp brand">单变量</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">只改了 <b data-chgn>—</b></span><span class="hp">第二次 <b data-t2>未测</b></span></div>
<div class="cp-split">
  <div class="cp-stage d4-stage">
    <div class="cp-stage-label">ONE CHANGE · 只能改一处，其他都不动</div>
    <div class="d4-changes" data-changes>${CHANGE_CARDS}</div>
    <div class="d4-lock" data-lock></div>
    <div class="d4-runrow"><button class="btn primary sm" data-retest>🔁 重测一次</button><span class="hint" data-rethint>先选一处改动</span></div>
    <div class="d4-cmp" data-cmp></div>
  </div>
  <div class="cp-side">
    <div class="cp-panel"><h4>单变量：为什么只能改一处</h4><p class="d4-why">改两处，分数变了你也不知道是谁的功劳。这不是规矩，是让数据说话的方法。</p>
      <div class="cp-kv" data-locks><div class="row"><b>没改</b><span class="muted">—</span></div></div></div>
    <div class="cp-panel"><h4>两次对比</h4><div class="cp-kv" data-cmpkv><div class="row"><b>—</b><span class="muted">还没有第二次</span></div></div></div>
    <div class="cp-note" data-note><b>提示：</b>先去第 2 幕跑一次测试。</div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>找真实用户 →</button><button class="btn ghost sm" data-back hidden>← 回第 2 幕测第一次</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;const xp=sec.querySelector('[data-xp]');
  const chgn=sec.querySelector('[data-chgn]'),t2b=sec.querySelector('[data-t2]');
  const lock=sec.querySelector('[data-lock]'),locks=sec.querySelector('[data-locks]');
  const retest=sec.querySelector('[data-retest]'),rethint=sec.querySelector('[data-rethint]');
  const cmp=sec.querySelector('[data-cmp]'),cmpkv=sec.querySelector('[data-cmpkv]');
  const note=sec.querySelector('[data-note]'),next=sec.querySelector('[data-next]'),back=sec.querySelector('[data-back]');

  function barHTML(label,v,line,second){
    const st=!second?'':(v==null?'':(v>=line?' pass':' fail'));
    return '<div class="d4-cbar'+(second?' sec':'')+st+'"><span class="cl">'+label+'</span>'+
      '<div class="cw"><i data-c'+(second?'2':'1')+'="1" style="width:0%"></i><u style="left:'+(line*10)+'%"></u></div>'+
      '<b>'+(v==null?'—':v)+'</b></div>';
  }
  function paintCmp(m,line,t1,t2){
    if(!t1){
      cmp.innerHTML='<div class="d4-cmp-head"><span>主指标 · '+m.name+'</span><b>待第一次</b></div>'+
        barHTML('第一次',null,line,false)+barHTML('第二次',null,line,true)+
        '<div class="d4-cmp-foot">先去第 2 幕跑一次测试，这里才有对比。</div>';
      return;
    }
    const v1=t1.scores[m.id],v2=t2?t2.scores[m.id]:null,d=v2==null?null:r1(v2-v1);
    const chg=CH(t2?t2.change:S.change);
    cmp.innerHTML='<div class="d4-cmp-head"><span>主指标 · '+m.name+' · 及格线 '+line+' 分</span><b>'+
      (d==null?'待重测':((d>0?'+':'')+d+' 分'))+'</b></div>'+
      barHTML('第一次',v1,line,false)+barHTML('第二次',v2,line,true)+
      '<div class="d4-cmp-foot">'+(v2==null
        ?'选一处改动，点"重测一次"。两根柱子用同一条及格线。'
        :(v2>=line
          ?'<b>过线了</b>：同一条条件、同一条指标，中间只改了一处。'
          :(hits(chg,m)
            ?'<b>只差 '+r1(line-v2)+' 分。</b>方向对了——改的正是这条主指标，只是还差一点。'
            :'<b>还差 '+r1(line-v2)+' 分。</b>这次改的是「'+ch.name+'」，主要影响别的指标，主指标几乎没动。')))+'</div>';
    setTimeout(()=>{
      const a=cmp.querySelector('[data-c1]'),b=cmp.querySelector('[data-c2]');
      if(a)a.style.width=(v1*10)+'%';
      if(b&&v2!=null)b.style.width=(v2*10)+'%';
    },70);
  }

  function paint(){
    const m=M(S.metric)||METRICS[0];
    const line=(typeof S.line==='number')?S.line:m.line;
    if(S.t1&&S.t1.metric!==S.metric){S.t1=null;S.t2=null;api.save();}
    const t1=S.t1,t2=S.t2,ch=CH(S.change);
    sec.querySelectorAll('[data-c]').forEach(b=>{
      b.classList.toggle('on',b.dataset.c===S.change);
      b.disabled=!t1;
    });
    chgn.textContent=ch?ch.name:'—';
    t2b.textContent=t2?'已完成':'未测';
    lock.innerHTML='<span>这次只改了</span><b>'+(ch?ch.name+'：'+ch.desc:'— 还没选')+'</b>'+
      '<em>没改的：'+(t1?('条件 '+C(t1.cond).name+' · '):'')+'主指标 '+(S.metric?m.name:'—')+' · 及格线 '+(S.metric?line+' 分':'—')+'</em>';
    locks.innerHTML='<div class="row"><b>没改</b><span>'+(t1?('条件 · '+C(t1.cond).name):'条件')+'</span></div>'+
      '<div class="row"><b>没改</b><span>主指标 · '+m.name+'</span></div>'+
      '<div class="row"><b>没改</b><span>及格线 · '+line+' 分</span></div>'+
      '<div class="row"><b>改了</b><span>'+(ch?(ch.name+'（'+ch.affect+'）'):'— 还没选')+'</span></div>';
    retest.disabled=!(t1&&ch);
    rethint.textContent=!t1?'先有第一次的读数':(!ch?'先选一处改动':'条件不变，只重测这一次');
    back.hidden=!!t1;
    paintCmp(m,line,t1,t2);

    if(t2){
      const v1=t1.scores[m.id],v2=t2.scores[m.id],d=r1(v2-v1);
      const others=trio(t1.metric).filter(id=>id!==m.id).map(id=>{
        const x=M(id),dd=r1(t2.scores[id]-t1.scores[id]);
        return x.name+' '+t1.scores[id]+'→'+t2.scores[id]+'（'+(dd>0?'+':'')+dd+'）';
      }).join(' · ');
      cmpkv.innerHTML='<div class="row"><b>主指标</b><span>'+m.name+'（及格线 '+line+'）</span></div>'+
        '<div class="row"><b>第一次</b><span>'+v1+' 分</span></div>'+
        '<div class="row"><b>第二次</b><span>'+v2+' 分（'+(d>0?'+':'')+d+'）</span></div>'+
        '<div class="row"><b>结论</b><span>'+(v2>=line?'过线了':'还差 '+r1(line-v2)+' 分')+'</span></div>'+
        '<div class="row"><b>顺带</b><span>'+others+'</span></div>';
    }else if(t1){
      cmpkv.innerHTML='<div class="row"><b>第一次</b><span>'+t1.scores[m.id]+' 分</span></div>'+
        '<div class="row"><b>第二次</b><span class="muted">还没测</span></div>';
    }else{
      cmpkv.innerHTML='<div class="row"><b>—</b><span class="muted">还没有第二次</span></div>';
    }

    if(!t1)note.innerHTML='<b>先去第 2 幕：</b>没有第一次的读数，就没有对比。这一步不能跳。';
    else if(!ch)note.innerHTML='<b>选一处：</b>想清楚——它应该影响哪条指标？';
    else if(!t2)note.innerHTML='<b>这次只改了「'+ch.name+'」。</b>条件、指标、及格线都没动——现在重测。';
    else{
      const v2=t2.scores[m.id];
      if(v2>=line)note.innerHTML='<b>过线了：'+t1.scores[m.id]+' → '+v2+'。</b>只改了一处，所以这个变化能算在这处改动上。';
      else if(hits(ch,m))note.innerHTML='<b>从 '+t1.scores[m.id]+' 到 '+v2+'，只差 '+r1(line-v2)+' 分。</b>方向是对的：改的正是主指标，还差一点点。';
      else note.innerHTML='<b>从 '+t1.scores[m.id]+' 到 '+v2+'，还差 '+r1(line-v2)+' 分。</b>你改的是「'+ch.name+'」——它不在主指标这条线上。下一处该改哪里，数据已经指出来了。';
    }
    next.disabled=!t2;
    xp.textContent=S.xp||0;
  }

  sec.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{
    if(!S.t1){api.toast('先去第 2 幕测第一次','☝️');return;}
    const id=b.dataset.c;
    if(S.change===id)return;
    const had=S.t2;
    S.change=id;
    if(S.t2&&S.t2.change!==id){S.t2=null;if(had)api.toast('换了改动，得重新测一次','🔁');}
    api.save();api.sfx('tap');paint();
  });
  retest.onclick=()=>{
    if(!S.t1){api.toast('先去第 2 幕测第一次','☝️');return;}
    if(!S.change){api.toast('先选一处改动','☝️');return;}
    S.t2=runSecond(S.t1,S.change);
    api.save();api.sfx('success');paint();
    api.burst(innerWidth*.32,innerHeight*.55,22,['#A78BFA','#E9E1FF','#8BD17C']);
    api.toast('第二次：'+S.t2.scores[S.t1.metric]+' 分','🔁');
    if(!S._xp4){S._xp4=1;api.addXp(20);paint();}
  };
  back.onclick=()=>api.go(2);
  paint();
  sec._d4paint=paint;
  next.onclick=()=>api.go(5);
},onEnter(sec){if(sec._d4paint)sec._d4paint();}},

/* ---------- 05 真实用户 ---------- */
{a:'05',name:'真实用户',time:'50 分',html:`
<div class="ch-head"><div class="act"><b>05</b><span>真实用户</span><i>不教他，只观察</i></div><h2>他会用错，<em>那不是他笨</em></h2><p>选一个人，把东西递给他，<em>不要教</em>。看他的手、看他的眼睛，记下他停住的那一步。</p></div>
<div class="cp-hud"><span class="hp brand">系统</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">用户 <b data-uname>—</b></span><span class="hp">用错点 <b data-uok>未指出</b></span></div>
<div class="cp-split">
  <div class="cp-stage d4-stage">
    <div class="cp-stage-label">REAL USER · 不是你自己，也不是你同桌</div>
    <div class="d4-users" data-users>${USER_CARDS}</div>
    <div class="d4-runrow"><button class="btn primary sm" data-try disabled>👤 让他试一次</button><span class="hint" data-tryhint>先选一个人</span></div>
    <div class="d4-obs" data-obs></div>
  </div>
  <div class="cp-side">
    <div class="cp-panel"><h4>他是谁</h4><div class="d4-uinfo" data-uinfo><span class="muted">先选一个人。</span></div></div>
    <div class="cp-field"><label>我记一句：他哪一步用错了？为什么？</label><textarea data-notein maxlength="80" placeholder="例如：他拿反了，因为两边看起来一样"></textarea></div>
    <div class="cp-note" data-note><b>提示：</b>只观察，不说话，不帮他。</div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>做今日证据卡 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;S.note=S.note||'';
  const xp=sec.querySelector('[data-xp]'),uname=sec.querySelector('[data-uname]'),uok=sec.querySelector('[data-uok]');
  const users=sec.querySelector('[data-users]'),uinfo=sec.querySelector('[data-uinfo]');
  const obs=sec.querySelector('[data-obs]'),tryBtn=sec.querySelector('[data-try]'),tryHint=sec.querySelector('[data-tryhint]');
  const note=sec.querySelector('[data-note]'),next=sec.querySelector('[data-next]'),ta=sec.querySelector('[data-notein]');
  let revealing=false,timer=null;
  ta.value=S.note;

  function obsHTML(u,limit){
    if(!u||limit<1)return '<div class="d4-ob-empty"><span>👀</span><b>还没有观察记录</b>'+
      '<i>'+(u?'点"让他试一次"。他往哪伸手、在哪停、有没有先看你的脸，都会一条一条记在这里。':'先选一个人，再点"让他试一次"。只观察，不教他。')+'</i></div>';
    return u.steps.map((s,i)=>{
      const shown=i<limit,ok=S.obsStep===i;
      return '<button class="d4-ob'+(shown?' show click':'')+(ok?' ok':'')+'" data-o="'+i+'"'+(shown?'':' disabled')+'>'+
        '<span class="on-n">'+(i+1)+'</span>'+
        '<span class="on-b"><b>'+s.t+'</b>'+(ok?'<span class="on-w">✓ 记下了：问题出在这一步，不是他手笨。</span>':'')+'</span>'+
        '<span class="on-x">'+(ok?'就是这一步':'指出 →')+'</span></button>';
    }).join('');
  }
  function paintObs(){obs.innerHTML=obsHTML(U(S.user),S.obsSeen?3:0);}
  function paint(){
    const u=U(S.user);
    users.querySelectorAll('[data-u]').forEach(b=>b.classList.toggle('on',b.dataset.u===S.user));
    tryBtn.disabled=!u||revealing;
    uname.textContent=u?u.name:'—';
    uok.textContent=S.obsStep>=0?'已指出':'未指出';uok.style.color=S.obsStep>=0?'#8BD17C':'';
    uinfo.innerHTML=u
      ?('<div class="d4-uhead"><span>'+u.emoji+'</span><b>'+u.name+'</b></div><p class="d4-utag">'+u.tag+'</p><p class="d4-uwhy">'+u.who+'</p>')
      :'<span class="muted">先选一个人。</span>';
    tryHint.textContent=!u?'先选一个人':(revealing?'他正在用，别出声…':(S.obsSeen?'看完了。点他做错的那一步':'点一下，他会试一次'));
    paintObs();
    if(S.obsStep>=0){
      const s=u.steps[S.obsStep];
      note.innerHTML='<b>记下来了：</b>'+s.why+' 再写一句你的话，就可以做证据卡。';
    }else if(!u)note.innerHTML='<b>先选一个人：</b>爷爷、同学、老师——注意，不要选你自己。';
    else if(!S.obsSeen)note.innerHTML='<b>点"让他试一次"。</b>你只观察：他的手往哪去、在哪停、有没有先看你的脸。';
    else note.innerHTML='<b>三步都在这儿了。</b>点你认为他做错的那一步——不是慢的那一步。';
    next.disabled=!(S.obsStep>=0&&(S.note||'').trim().length>=4);
    xp.textContent=S.xp||0;
  }

  users.querySelectorAll('[data-u]').forEach(b=>b.onclick=()=>{
    const id=b.dataset.u;
    if(S.user===id)return;
    S.user=id;S.obsSeen=false;S.obsStep=-1;
    if(timer){clearInterval(timer);timer=null;revealing=false;}
    api.save();api.sfx('pop');paint();
  });
  tryBtn.onclick=()=>{
    const u=U(S.user);if(!u||revealing)return;
    if(S.obsSeen){paint();return;}
    revealing=true;let n=0;
    obs.innerHTML=obsHTML(u,0);
    tryBtn.disabled=true;tryHint.textContent='他正在用，别出声、别帮他…';
    if(timer)clearInterval(timer);
    timer=setInterval(()=>{
      if(!sec.isConnected){clearInterval(timer);timer=null;revealing=false;return;}
      n++;
      obs.innerHTML=obsHTML(u,Math.min(n,3));
      api.sfx('tap');
      if(n>=3){
        clearInterval(timer);timer=null;revealing=false;
        S.obsSeen=true;api.save();paint();
        api.toast('他试完了。三步都在上面','👀');
      }
    },820);
  };
  obs.addEventListener('click',e=>{
    const b=e.target.closest('[data-o]');if(!b)return;
    if(revealing||!S.obsSeen)return;
    const u=U(S.user);if(!u)return;
    if(S.obsStep>=0)return;
    const i=+b.dataset.o,s=u.steps[i];
    if(s.v!=='misuse'){
      api.sfx('error');api.toast('这一步他其实做对了，再看看别的','👀');
      b.classList.add('shake');setTimeout(()=>b.classList.remove('shake'),420);
      let w=b.querySelector('.on-w');
      if(!w){w=document.createElement('span');w.className='on-w';b.querySelector('.on-b').appendChild(w);}
      w.textContent='这一步不算错：'+s.alt;
      b.classList.add('hintw');
      return;
    }
    S.obsStep=i;api.save();api.sfx('success');
    api.burst(innerWidth*.4,innerHeight*.62,22,['#A78BFA','#E9E1FF','#8BD17C']);
    if(!S._xp5){S._xp5=1;api.addXp(10);}
    paint();
    ta.focus();
  });
  ta.addEventListener('input',()=>{S.note=ta.value;api.save();paint();});
  paint();
  sec._d4paint=()=>{if(!revealing)paint();else xp.textContent=S.xp||0;};
  next.onclick=()=>{api.setEvidence(evidenceOf(S));api.go(6);};
},onEnter(sec){if(sec._d4paint)sec._d4paint();}},

/* ---------- 06 今日证据卡 ---------- */
{a:'06',name:'今日证据卡',time:'45 分',build(sec,api){
  const S=api.S;
  if(!S.evidence)api.setEvidence(evidenceOf(S));
  api.renderFinale(sec,{
    badge:{icon:'🧪',name:'测试员'},
    headline:'你测了两次，<em>只改了一处</em>',
    sub:'你没有靠"我觉得更好"来说话。你有一条读数、一张失败清单、一处改动，和第二次读数。这是发明里最硬的一半。',
    journey:[{i:'🎯',b:'定指标',s:'先定怎么算过关'},{i:'🧪',b:'跑第一次',s:'读数 + 没到线'},{i:'📋',b:'失败清单',s:'把问题写下来'},{i:'🔁',b:'只改一处',s:'再测 + 对比'}],
    reflect:['两次测试之间，你只动了哪一处？其他真的都没动吗？','真实用户用错的那一步，是"他笨"，还是"设计没说清"？','如果明天还能改一处，你会改哪？为什么？'],
    homework:{title:'家庭任务 · 让一个人用一次',body:'把今天改好的东西给家里一个人用，不许教他。记下他第一句话，和他在哪一步停住。'},
    quote:'“一个人用错的那一步，<em>就是设计还没说清楚的那一句</em>。”',
    evidence(){return evidenceOf(api.S);}
  });
}}
],

notes:[
{html:`<div class="note-block"><h4>今天的 3 个目标</h4><p>1）每组有<b>一条主指标 + 一条及格线</b>；2）跑出<b>两次读数</b>，中间只改一处；3）让一个<b>真实的人</b>用一次，记下他用错的那一步。</p><p>今天不讲新工具，只做一件事：把"我觉得更好"换成"数据说好了一点"。</p><h4>大带小</h4><p>大孩子负责读表、记数字、算差值；小孩子负责观察用户的手和眼睛——他看到的那一下，往往比分数准。<b>不要让大孩子替小孩子点屏幕。</b></p><div class="warn">今天最常见的跑偏：一次改三处，然后说"变好了"。温柔地拦一下：<b>"你改了三处，那到底是哪一处起的作用？"</b></div></div>`},

{html:`<div class="note-block"><h4>本幕目标</h4><p>选定 1 个主指标，画一条及格线。让孩子理解：没有指标，就没有"好不好"。</p><h4>关键提问</h4><ul><li>这条指标，测的是他，还是你的感觉？</li><li>及格线定在几分，他才真的能用？</li><li>如果只能看一条，你看哪条？</li></ul><h4>操作提示</h4><p>四张卡选一张，拖滑块定线（最低 5 分）。建议 6–7 分：这是"同学能用"的线。</p><p><b>大带小：</b>大孩子读卡上的"怎么量"，小孩子用手指着说"我想看他会不会自己用"。</p></div>`},

{html:`<div class="note-block"><h4>本幕目标</h4><p>跑出第一份读数。允许失败，而且第一次基本一定失败——这是设计好的，不是 bug。</p><h4>关键提问</h4><ul><li>为什么同一个东西，白天和晚上测出来不一样？</li><li>有人帮忙时的分数，算他自己会用吗？</li><li>三条里最弱的是哪条？它和主指标是一回事吗？</li></ul><div class="warn">"有人帮忙"这一档分数会变高，正好用来讲：<b>被教会的分数，不是他自己的水平。</b></div><p><b>大带小：</b>大孩子读数、报数；小孩子负责按"运行测试"，并说一句"他刚才停在哪"。</p></div>`},

{html:`<div class="note-block"><h4>本幕目标</h4><p>把"没做好"翻译成六种具体失败，勾出这次真的出现的。每条后面都有一句"这说明什么"。</p><h4>关键提问</h4><ul><li>这条是你看到的，还是你猜的？</li><li>"别人用错"和"没反应"，是不是同一件事？</li><li>这六条里，哪一条最值得先改？</li></ul><h4>操作提示</h4><p>至少勾 2 条才能下一步。屏幕上标"数据里有"的那几条，是从读数推出来的，可以让孩子对照。</p><p><b>大带小：</b>大孩子负责勾选和写字；小孩子负责说"他当时做了什么动作"，原话记下来。</p></div>`},

{html:`<div class="note-block"><h4>本幕目标</h4><p>单变量：条件不变、指标不变、及格线不变，只改一处，再测一次。</p><h4>关键提问</h4><ul><li>你改的这一处，会影响哪条指标？</li><li>其他都没动吗？你怎么证明？</li><li>如果分数没怎么变，是改错了地方，还是改得不够？</li></ul><div class="quote">改两处，你就不知道是哪一处起的作用。这就是"单变量"：一次只让一个东西变。</div><p><b>大带小：</b>大孩子负责把两次数字写进任务单并算差值；小孩子负责在原型上真的动手改那一处。</p></div>`},

{html:`<div class="note-block"><h4>本幕目标</h4><p>让一个真实的人（教师或同伴扮演）用一次。只观察，不指导，记录他停住或用错的那一步。</p><h4>关键提问</h4><ul><li>他哪一步停住了？停了多久？</li><li>他有没有先看你的脸？那说明他在等提示。</li><li>用错的那一步，是"他笨"，还是"设计没说清"？</li></ul><div class="warn">边界：真实用户由教师或同伴扮演，<b>不请家长中途进场</b>；不催促、不替他做。安全：所有测试在桌面进行。</div><p><b>大带小：</b>大孩子当记录员（记动作和秒数），小孩子当"看眼睛"的人——他最先看到用户皱眉的那一秒。</p></div>`},

{html:`<div class="note-block"><h4>收尾 20 分钟</h4><p>1）每组下载今日证据卡；2）发"测试员"徽章；3）明日预告：<b>"明天你要把 5 天的证据讲成 3 分钟。"</b></p><h4>教师复盘 3 问</h4><ul><li>有几组能说清"我只改了哪一处"？</li><li>有几组的第二次读数真的变了？没变的组，数据说明了什么？</li><li>哪一组还在说"用户不会用"？明天单独盯这一组，帮他们把"他笨"改成"我没说清"。</li></ul><p>材料准备：明天 A3 展板纸、马克笔、手机支架（拍路演）；提醒孩子把 4 天的原型都带来。</p></div>`}
]};

window.FXM_DAYS=window.FXM_DAYS||{};
window.FXM_DAYS['4']=c;
})();
