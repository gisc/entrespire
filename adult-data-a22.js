/* A22 · 一专多能：三个案例还原 */
(function(){
'use strict';

const IMG={
  pump:'assets-cases-a22-playpump.jpg',
  driver:'assets-cases-a22-screwdriver.svg',
  band:'assets-cases-a22-wristband.svg'
};

/* ---------- 每案三栏：原任务 / 新任务 / 为什么不打架 ---------- */
const COLS=[
  {id:'old',h:'原任务',tip:'这个组件本来在干什么',min:3},
  {id:'new',h:'新任务',tip:'同一个组件多干了什么',min:3},
  {id:'why',h:'为什么不打架',tip:'说清是哪一种：内部、外部，还是时间',min:5}
];

const CASES=[
{
 k:'pump',n:'Play Pump',brand:'南非 · 操场上的旋转木马',tag:'官方口径',img:'pump',
 orig:'孩子想玩：转盘转得越快越好',
 note:'官方口径：孩子转旋转木马时，地下水被抽进 2,500 升水箱；从旋转到往复，传动只有两个工作零件。玩的人从来不会短缺。图：SIT 官方课程材料（已授权）；Day3 p.34、TU 库 p.42。',
 cols:{
  old:{cands:['孩子玩耍','转盘旋转','消耗体力','操场设施'],
   ph:'例如：让孩子愿意一圈一圈地转',
   off:'让孩子玩：转盘转起来，孩子愿意一圈一圈地转，越转越快。',
   keys:['玩','转','孩子','游乐','木马','体力'],
   why:'官方先承认它是游乐设施：它本来就为“好玩”存在，不为打水存在。'},
  new:{cands:['抽地下水','往水箱蓄水','龙头取水','给路灯发电'],
   ph:'例如：把转动的力接到水泵上',
   off:'抽水：转动的力接到水泵上，地下水被抽进 2,500 升水箱；妈妈和孩子在龙头接水。',
   keys:['抽水','水泵','水','水箱','龙头','蓄水','地下'],
   why:'新任务不是“再建一个水站”，是把已有的旋转接去驱动水泵。官方数字：2,500 升水箱、传动只有两个工作零件。'},
  why:{cands:['借孩子本来就要玩的力','不增加人手','孩子不必知道','同一段玩耍时间'],
   ph:'例如：借操场上本来就在玩的力，玩的时候水就在抽',
   off:'外部接法：借操场上本来就在玩的力——孩子本来就要玩，玩带动泵；不需要额外人手，也不需要孩子知道自己在打水。',
   keys:['外部','本来','玩','孩子','不用','不增加','同一','一起','不知道','操场','环境'],
   why:'外部接法借的是环境里已有的东西：孩子本来就要玩，玩就是动力。水站没有多雇人，孩子也没有多做一个动作。'}
 }
},
{
 k:'driver',n:'带灯的螺丝刀',brand:'工具 · 灯装在批头旁边',tag:'还原依据',img:'driver',
 orig:'拧螺丝：把批头对准螺丝，转动手腕',
 note:'本节还原：灯装在批头旁边，和批头共享同一个指向；对位的那一秒，光已经在。官方判据见 Day3 p.35、p.69：给已有组件派新任务，不新增人手、不新增零件。',
 cols:{
  old:{cands:['拧螺丝','批头对准螺孔','转动手腕','收纳在工具箱'],
   ph:'例如：把批头对准螺丝，拧紧',
   off:'拧螺丝：把批头对准螺丝，转动手腕，把螺丝拧紧。',
   keys:['拧','螺丝','批头','对准','手腕','紧'],
   why:'这是螺丝刀唯一被承认的任务。灯如果不能服务这个动作，它就只是粘在工具上的第二件东西。'},
  new:{cands:['照亮工作点','照清批头','当手电用','提示电量'],
   ph:'例如：照亮批头正前方的那颗螺丝',
   off:'照亮工作点：让光落在批头正前方的那颗螺丝上，暗处也能对准。',
   keys:['照亮','照清','光','灯','暗','工作点','对准'],
   why:'新任务是“照到批头正前方”，不是“有个手电筒”。差别在光的落点：必须在工作点上。'},
  why:{cands:['同一个机身里','共用一块电池','同一个指向','不占一只手'],
   ph:'例如：一个机身里装两件事，共用一块电池',
   off:'内部接法：一个机身里装两件事——拧和照，共用同一块电池、同一个握法；灯装在批头旁边，和批头共享同一个指向，对准的那一秒光已经在。',
   keys:['内部','同一','电池','机身','对准','指向','同时','顺便','不用','不占'],
   why:'内部接法是一个组件里装两个功能。灯没有自己的开关动作：你握住、对准，光和批头一起到位。位置一错就不成立——装在手柄尾部，手挡住光；装在电池仓，光被外壳关住。'}
 }
},
{
 k:'band',n:'医院腕带',brand:'住院 · 一条带子三个时刻',tag:'还原依据',img:'band',
 orig:'护士每次接触病人，先确认“你是谁”',
 note:'本节还原：腕带本来就戴在手腕上，是护士每次接触病人的第一落点；扫码核对发生在给药前，和“确认这个人是谁”是同一个动作。官方判据同上（Day3 p.35、p.69）。',
 cols:{
  old:{cands:['标识身份','写姓名住院号','防止抱错','区分床位'],
   ph:'例如：腕带上写着姓名和住院号',
   off:'标识身份：腕带上写姓名、住院号和条码，用来认人、防止抱错。',
   keys:['身份','姓名','名字','住院号','标识','认人','抱错','条码'],
   why:'腕带原本的任务是“证明这个人是谁”。它不负责治疗，只负责识别。'},
  new:{cands:['给药前扫码核对','记录给药时间','病区门禁识别','防走失定位'],
   ph:'例如：给药前扫一下，核对药名和剂量',
   off:'给药前扫码核对姓名、住院号、药名和剂量；离开病区时，门禁读到腕带就知道人去了哪里。',
   keys:['扫码','核对','用药','给药','药名','剂量','防走失','门禁','定位','离开'],
   why:'新任务有两件：给药核对、防走失。两件都不是新设备，都是这条带子多干的一点活。'},
  why:{cands:['入院时写身份','给药前扫码','离开病区被门禁读到','不用再加设备'],
   ph:'例如：入院时是身份，给药前是核对，离开病区是门禁',
   off:'时间接法：同一条带子同时带着身份、核对、防走失三件事；入院时写身份，给药前扫码核对，离开病区时门禁读到它——三个时刻各用一次，不抢同一个动作。',
   keys:['时间','同时','入院','给药','离开','门禁','核对','同一','不同','时刻','不用'],
   why:'三件事同时在带上，只是分别在不同时刻被用到。时间接法不要求它们挤在同一秒，只要求前一件不给后一件添麻烦；腕带一直戴在手上，不用再加一个定位器。'}
 }
}
];
const BY={};CASES.forEach(c=>BY[c.k]=c);
const JUDGE={yes:'会打架',no:'不会打架',cond:'看条件'};

/* ---------- 状态 ---------- */
function blankRestore(){
  const o={};CASES.forEach(c=>{o[c.k]={};COLS.forEach(s=>{o[c.k][s.id]='';});});return o;
}
function ensure(S){
  const ans=S.answers;
  if(!ans.a22||typeof ans.a22!=='object')ans.a22={};
  const a=ans.a22;
  if(!a.restore||typeof a.restore!=='object')a.restore=blankRestore();
  CASES.forEach(c=>{
    if(!a.restore[c.k]||typeof a.restore[c.k]!=='object')a.restore[c.k]={};
    COLS.forEach(s=>{if(typeof a.restore[c.k][s.id]!=='string')a.restore[c.k][s.id]='';});
  });
  if(!BY[a.caseTab])a.caseTab=CASES[0].k;
  ['hook','mineCase','mineTask','mineJudge','mineWhy','whoHard','whoCost'].forEach(k=>{
    if(typeof a[k]!=='string')a[k]='';
  });
  return a;
}
function field(a,k,id){return ((a.restore[k]||{})[id]||'');}
function colOk(id,v){const s=COLS.find(x=>x.id===id);return String(v||'').trim().length>=(s?s.min:4);}
function filled(a){let n=0;CASES.forEach(c=>COLS.forEach(s=>{if(colOk(s.id,field(a,c.k,s.id)))n++;}));return n;}
function doneCases(a){return CASES.filter(c=>COLS.every(s=>colOk(s.id,field(a,c.k,s.id)))).length;}
function unlocked(a){return doneCases(a)===3;}
function brief(a,k){
  const r=(a.restore&&a.restore[k])||{};
  const v=COLS.map(s=>(r[s.id]||'').trim()).filter(Boolean);
  return v.length?v.join(' → '):'—';
}
function hitsOf(col,text){
  const t=(text||'').toLowerCase();
  return col.keys.filter(k=>t.indexOf(String(k).toLowerCase())>=0);
}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function escapeRe(s){return String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
function markOff(text,keys,user){
  const u=(user||'').toLowerCase();
  const ks=keys.slice().sort((x,y)=>String(y).length-String(x).length).map(escapeRe);
  if(!ks.length)return esc(text);
  const re=new RegExp('('+ks.join('|')+')','gi');
  let out='',last=0,m;
  while((m=re.exec(text))){
    out+=esc(text.slice(last,m.index));
    const hit=u.indexOf(m[0].toLowerCase())>=0;
    out+='<em class="'+(hit?'a22-hit':'a22-miss')+'">'+esc(m[0])+'</em>';
    last=m.index+m[0].length;
  }
  out+=esc(text.slice(last));
  return out;
}
function diffText(col,u,hits){
  const miss=col.keys.filter(k=>hits.indexOf(k)<0);
  if(!u)return '这一栏你还空着。先写自己的版本，再回来对照。';
  if(!hits.length)return '你和官方落在不同位置：官方落在「'+miss.slice(0,4).join('、')+'」。这是另一个入口，不判对错——先看它为什么这样落。';
  if(!miss.length)return '官方的主要落点你都提到了。差别在组合方式：官方把它写成一条因果，你写的是几个词。';
  return '你提到「'+hits.join('、')+'」；官方还落在「'+miss.slice(0,4).join('、')+'」。两边都成立，先看差在哪一步。';
}

const L={
id:'A22',week:6,seq:22,title:'一专多能：三个案例还原',
kicker:'WEEK 6 · 一专多能 · 案例解剖',tool:'tu',toolName:'一专多能',minutes:45,
steps:[
/* ================= 1 先猜 ================= */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>带灯的螺丝刀，<em>灯装在哪</em>？</h1>
<p>同一把螺丝刀，多了一个 LED。三个位置只能选一个：选错，灯还能亮，但它已经不是这把螺丝刀的一部分了。</p></div>
<div class="a22-hook">
  <figure class="a22-photo">
    <button class="case-zoom" data-zoom="driver" title="看大图">⤢</button>
    <img src="${IMG.driver}" alt="带灯螺丝刀的三个候选位置：A 手柄尾部、B 批头旁边、C 电池仓" loading="lazy">
    <figcaption><b>带灯的螺丝刀 · 三个候选位置</b><span>暗处有一颗螺丝。灯装 A、B、C 哪一处，才真的帮上忙？</span>
      <em class="a22-src">线稿：本节按一专多能判据重绘</em></figcaption>
  </figure>
  <div class="a22-hook-r">
    <div class="a22-ask"><span>先别查</span><p>灯装在<em>哪一处</em>最合理？</p></div>
    <div class="opts">
      <button class="opt" data-h="a"><span class="k">A</span><span><b>手柄尾部</b><span>装在握把最末端，像一支小手电</span></span></button>
      <button class="opt" data-h="b"><span class="k">B</span><span><b>批头旁边</b><span>贴着批头，光从工作点旁边出来</span></span></button>
      <button class="opt" data-h="c"><span class="k">C</span><span><b>电池仓</b><span>和电池装在一起，打开仓盖才看得到</span></span></button>
    </div>
  </div>
</div>
<div id="a22HookOut" style="margin-top:12px"></div>`,
init(sec,api){
  const S=api.S,a=ensure(S),out=sec.querySelector('#a22HookOut');
  const NAME={a:'手柄尾部',b:'批头旁边',c:'电池仓'};
  function paint(){
    const v=a.hook;
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',v===b.dataset.h));
    if(!v){out.innerHTML='';return;}
    const ok=v==='b';
    const why={
      a:'A 不是不亮，是光从手的后面来。手柄和手掌挡在光路上，握得越紧，影子离螺丝越近。它更像一支挂在螺丝刀上的手电。',
      c:'C 的光被外壳关住了。电池仓是换电池时打开的地方，不是工作点；灯装进去，只在换电池那一刻有用。',
      b:'B 让灯和批头共享同一个指向：批头对准哪儿，光照到哪儿。你本来就要对准，光是顺便到的。'
    }[v];
    out.innerHTML='<div class="a22-reveal '+(ok?'ok':'warn')+'">'+
      '<div class="a22-reveal-h"><span>'+(ok?'位置对了':'位置换了，任务就换了')+'</span><span>B · 批头旁边</span></div>'+
      '<p><b>'+why+'</b></p>'+
      '<p class="small">为什么位置决定它成不成立：一专多能不新增第二个动作。灯只有和“对准”共用同一个位置、同一个指向、同一秒钟，才不需要被单独打开、单独瞄准。位置一换，它就从螺丝刀的一部分，变成第二件工具。</p>'+
      '<div class="a22-facts">'+
        '<div><b>3</b><span>个候选位置</span></div>'+
        '<div><b>1</b><span>个共用指向</span></div>'+
        '<div><b>0</b><span>个新增动作</span></div>'+
      '</div>'+
      '<p class="a22-note">你选的是 '+(ok?'B':'「'+NAME[v]+'」')+'。选错不扣分：这一段要你看的是，位置一改，新任务还搭不搭在旧动作上。</p>'+
      '</div>';
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{a.hook=b.dataset.h;api.save();paint();api.refresh();});
  sec.querySelectorAll('[data-zoom]').forEach(b=>b.onclick=e=>{
    e.stopPropagation();
    api.modal('<button class="modal-x">×</button><h3>三个候选位置</h3>'+
      '<img src="'+IMG.driver+'" style="width:100%;border-radius:8px;background:#0B1018;margin:6px 0 10px" alt="带灯螺丝刀的三个位置">'+
      '<p>A 手柄尾部：光要越过整只手和整根手柄，握紧时最先被挡住。C 电池仓：光被封在外壳里，只有开仓时看得见。B 批头旁边：光和批头同向，指哪儿照哪儿。</p>'+
      '<p class="small">线稿：本节按一专多能判据重绘。</p>');
  });
  paint();
},
hint(S){return ensure(S).hook?'':'先选一个位置：手柄尾部、批头旁边，还是电池仓';},
gate(S){return !!ensure(S).hook;}},

/* ================= 2 概念 ================= */
{id:'concept',name:'三栏法',short:'三栏法',kicker:'STEP 2 · 概念',
html:`
<div class="step-h"><h1>一专多能，<em>三栏</em>就还原了</h1>
<p>原任务、新任务、为什么两者不打架。第三栏是命门：说不清搭在哪，就只是给产品加了一件东西。</p></div>
<div class="a22-chain">
  <div class="a22-node"><span>01</span><b>原任务</b><em>这个组件本来就在干的活</em></div>
  <i class="a22-ar">→</i>
  <div class="a22-node wn"><span>02</span><b>新任务</b><em>同一个组件，多干一件什么</em></div>
  <i class="a22-ar">→</i>
  <div class="a22-node ac"><span>03</span><b>为什么不打架</b><em>内部两个功能 / 外部借现成 / 时间上分先后</em></div>
</div>
<div class="grid2" style="margin-top:12px;align-items:start">
  <div class="panel a22-def">
    <div class="panel-h"><h4>三栏法</h4><span>案例还原</span></div>
    <p class="a22-def-p">原任务 → 新任务 → 为什么不打架。</p>
    <div class="a22-rule"><b>判据</b><span>不新增人手、不新增零件。新任务必须搭在旧动作上；搭不上，就是加了一件工具。</span></div>
    <div class="a22-def-src">依据 SIT 一专多能定义（Day3 p.35、p.69）：给已有组件派新任务，不新增人手与零件。追问：“这个组件，怎么帮我完成这件事？”</div>
  </div>
  <div class="panel a22-fill3">
    <div class="panel-h"><h4>三种接法</h4><span>三个案例各一种，先认主接法</span></div>
    <div><span>01</span><b>内部接法</b><em>一个组件装两个功能。螺丝刀：拧 + 照，共用一块电池。</em></div>
    <div><span>02</span><b>外部接法</b><em>借环境里已有的东西。Play Pump：孩子本来就要玩。</em></div>
    <div><span>03</span><b>时间接法</b><em>同一组件，不同时刻各干一件。腕带：入院、给药、离开病区。</em></div>
  </div>
</div>
<div class="panel a22-no" style="margin-top:10px">
  <div class="panel-h"><h4>什么时候别用</h4><span>三种「假」的一专多能</span></div>
  <div class="a22-no3">
    <div><b>要单独操作</b><span>新任务有自己的开关、自己的充电口，用户得多记一步。</span></div>
    <div><b>抢同一只手</b><span>两件事都要占住手，只能轮流做，那不叫同时。</span></div>
    <div><b>把维护藏起来</b><span>不新增零件，但新增了清洗、校准、换耗材，成本只是换了个人付。</span></div>
  </div>
</div>
<div class="panel a22-choice" style="margin-top:10px">
  <div class="panel-h"><h4>哪一句，才算一专多能？</h4><span>二选一</span></div>
  <div class="opts a22-opts2">
    <button class="opt" data-c2="a"><span class="k">A</span><span><b>给螺丝刀配一个头灯，用的时候戴在头上。</b><span>双手还能拧，光也够亮</span></span></button>
    <button class="opt" data-c2="b"><span class="k">B</span><span><b>把 LED 装到批头旁边，批头指哪儿、光照哪儿。</b><span>灯没有自己的开关动作</span></span></button>
  </div>
  <div id="a22C2Out" style="margin-top:9px"></div>
</div>`,
init(sec,api){
  const S=api.S,a=ensure(S),out=sec.querySelector('#a22C2Out');
  function paint(){
    const v=a.c2;
    sec.querySelectorAll('[data-c2]').forEach(b=>b.classList.toggle('on',v===b.dataset.c2));
    if(!v){out.innerHTML='';return;}
    const ok=v==='b';
    out.innerHTML='<div class="a22-reveal '+(ok?'ok':'warn')+'">'+
      '<div class="a22-reveal-h"><span>'+(ok?'对':'再看一眼')+'</span><span>判据：新任务搭没搭在旧动作上</span></div>'+
      '<p class="small">'+(ok
        ? 'B 把灯装进同一个机身，是内部接法：灯没有自己的开关动作，你把批头对准，光就到了。'
        : 'A 的头灯也能照亮，但它是另一件工具：要单独戴、单独充电、单独记得带。它不在机身里，不是内部接法。')+'</p>'+
      '<p class="small">判据不是“有没有灯”，是“多出来的这件事，有没有搭在原来的动作上”。搭不上，就是加法。</p></div>';
  }
  sec.querySelectorAll('[data-c2]').forEach(b=>b.onclick=()=>{a.c2=b.dataset.c2;api.save();paint();api.refresh();});
  paint();
},
hint(S){return ensure(S).c2?'':'选一句：哪一句才算一专多能';},
gate(S){return !!ensure(S).c2;}},

/* ================= 3 工作台：三栏还原台 ================= */
{id:'bench',name:'还原台',short:'还原台',kicker:'STEP 3 · 三栏还原台',
html:`
<div class="step-h"><h1>三个案例，<em>各还原一屏</em></h1>
<p>每个案例三栏：原任务、新任务、为什么不打架。九栏都填完，才解锁“看官方还原”——对照用来看差别，不判对错。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>选一个案例</span>
  <span class="op"><span class="op-n">2</span>点候选词，或自己写</span>
  <span class="op"><span class="op-n">3</span>三个都填完，逐栏对照</span>
</div>
<div class="bench a22-bench">
  <div class="bench-h"><b>BENCH · 三栏还原台</b><span class="st" id="a22St">0 / 9 栏 · 0 / 3 案例</span></div>
  <div class="bench-b">
    <div class="a22-tabs" id="a22Tabs"></div>
    <div class="a22-panes" id="a22Panes"></div>
    <div class="a22-cmp" id="a22Cmp"></div>
  </div>
  <div class="bench-f">
    <span class="small" id="a22Lock">九栏填完，解锁官方还原</span>
    <div style="flex:1"></div>
    <button class="btn sm ghost" id="a22Clear">重填本案例</button>
    <button class="btn sm" id="a22See" disabled>看官方还原</button>
  </div>
</div>
<div class="a22-credit">图：Play Pump 来自 SIT 官方课程材料（已授权）· Day3 p.34 / TU 库 p.42；螺丝刀与腕带为线稿，本节按官方判据重绘。</div>`,
init(sec,api){
  const S=api.S,a=ensure(S);
  const tabs=sec.querySelector('#a22Tabs'),panes=sec.querySelector('#a22Panes'),
        cmp=sec.querySelector('#a22Cmp'),st=sec.querySelector('#a22St'),
        lock=sec.querySelector('#a22Lock'),see=sec.querySelector('#a22See');
  let cmpOpen=false,ACT=a.caseTab;

  tabs.innerHTML=CASES.map(c=>'<button class="a22-tab" data-tab="'+c.k+'">'+
    '<span class="a22-th"><img src="'+IMG[c.img]+'" alt=""></span>'+
    '<span class="a22-tb"><b>'+esc(c.n)+'</b><em data-tp>0 / 3</em></span><i class="a22-dot"></i></button>').join('');

  panes.innerHTML=CASES.map(c=>'<div class="a22-pane" data-pane="'+c.k+'"><div class="a22-cols">'+
    COLS.map((col,i)=>'<div class="a22-col" data-col="'+col.id+'">'+
      '<div class="a22-col-h"><span class="a22-col-n">0'+(i+1)+'</span><b>'+col.h+'</b></div>'+
      '<div class="a22-col-t">'+col.tip+'</div>'+
      '<div class="a22-cands">'+c.cols[col.id].cands.map(p=>'<button class="chip" data-cand="'+esc(p)+'" data-c="'+col.id+'">'+esc(p)+'</button>').join('')+'</div>'+
      '<textarea data-f="'+col.id+'" maxlength="80" placeholder="'+esc(c.cols[col.id].ph)+'"></textarea>'+
      '<div class="a22-meta"><span data-cn>0</span> / 80</div>'+
    '</div>').join('')+
    '</div><div class="a22-case-note"><b>'+c.tag+'</b><span>'+c.note+'</span></div></div>').join('');

  const paneOf=k=>panes.querySelector('[data-pane="'+k+'"]');

  function paintChips(k){
    const r=a.restore[k];
    paneOf(k).querySelectorAll('.a22-col').forEach(colEl=>{
      const id=colEl.dataset.col,v=(r[id]||'');
      colEl.querySelectorAll('[data-cand]').forEach(ch=>ch.classList.toggle('on',v.indexOf(ch.dataset.cand)>=0));
      colEl.querySelector('[data-cn]').textContent=v.length;
      colEl.classList.toggle('filled',colOk(id,v));
    });
  }
  function paintTabs(){
    tabs.querySelectorAll('[data-tab]').forEach(t=>{
      const k=t.dataset.tab;
      const n=COLS.filter(s=>colOk(s.id,field(a,k,s.id))).length;
      t.classList.toggle('on',k===ACT);
      t.classList.toggle('done',n===3);
      t.querySelector('[data-tp]').textContent=n+' / 3';
    });
  }
  function paintStatus(){
    st.textContent=filled(a)+' / 9 栏 · '+doneCases(a)+' / 3 案例';
    see.textContent=cmpOpen?'收起官方还原':'看官方还原';
    see.disabled=cmpOpen?false:!unlocked(a);
    lock.textContent=cmpOpen
      ? '对照不是判卷：绿=你写到，黄=官方写到、你没写'
      : (unlocked(a)?'九栏齐了：点“看官方还原”逐栏对照':'九栏填完，解锁官方还原');
  }
  function showPane(k){
    ACT=k;a.caseTab=k;
    panes.querySelectorAll('.a22-pane').forEach(p=>p.classList.toggle('on',p.dataset.pane===k));
    paintTabs();
    if(cmpOpen)renderCmp(k);
  }
  function renderCmp(k){
    const c=BY[k],r=a.restore[k]||{};
    cmp.innerHTML='<div class="a22-cmp-h">'+
      '<div class="a22-ctabs">'+CASES.map(x=>'<button class="a22-ctab'+(x.k===k?' on':'')+'" data-ctab="'+x.k+'">'+esc(x.n)+'</button>').join('')+'</div>'+
      '<button class="btn sm ghost" id="a22CmpX">收起</button></div>'+
      '<div class="a22-cmp-top"><b>官方还原 · '+esc(c.n)+'</b><span>'+esc(c.brand)+'。逐栏对照：先看你写的，再看官方写的；不判对错。</span></div>'+
      COLS.map((col,i)=>{
        const d=c.cols[col.id],u=(r[col.id]||'').trim();
        const hit=hitsOf(d,u);
        return '<div class="a22-cmp-r">'+
          '<div class="a22-cmp-k"><span>0'+(i+1)+'</span><b>'+col.h+'</b>'+
            '<em class="'+(hit.length?'hit':'miss')+'">'+(hit.length?'你提到 '+hit.length+' 处':'0 处重合')+'</em></div>'+
          '<div class="a22-cmp-u"><b>你写的</b><span>'+esc(u||'（这一栏还空着）')+'</span></div>'+
          '<div class="a22-cmp-o"><b>官方写的</b><span>'+markOff(d.off,d.keys,u)+'</span></div>'+
          '<div class="a22-cmp-w"><b>为什么</b><span>'+d.why+'</span></div>'+
          '<div class="a22-cmp-d"><b>差在哪</b><span>'+diffText(d,u,hit)+'</span></div>'+
        '</div>';
      }).join('');
    cmp.querySelector('#a22CmpX').onclick=()=>{cmpOpen=false;paintCmp();};
    cmp.querySelectorAll('[data-ctab]').forEach(b=>b.onclick=()=>{
      a.caseTab=b.dataset.ctab;showPane(a.caseTab);api.save();api.refresh();
    });
  }
  function paintCmp(){
    cmp.classList.toggle('on',cmpOpen);
    panes.classList.toggle('hide',cmpOpen);
    tabs.classList.toggle('hide-cmp',cmpOpen);
    if(cmpOpen)renderCmp(ACT);
    paintStatus();
    api.refresh();
  }

  panes.addEventListener('input',e=>{
    const ta=e.target.closest('textarea[data-f]');
    if(!ta)return;
    const pane=ta.closest('[data-pane]'),k=pane.dataset.pane,id=ta.dataset.f;
    a.restore[k][id]=ta.value;
    paintChips(k);
    if(cmpOpen){cmpOpen=false;paintCmp();}
    paintTabs();paintStatus();api.save();api.refresh();
  });
  panes.addEventListener('click',e=>{
    const ch=e.target.closest('[data-cand]');
    if(!ch)return;
    const pane=ch.closest('[data-pane]'),k=pane.dataset.pane,id=ch.dataset.c;
    const ta=pane.querySelector('textarea[data-f="'+id+'"]');
    const p=ch.dataset.cand;
    let v=ta.value;
    if(v.indexOf(p)>=0){
      v=v.replace(p,'').replace(/；{2,}/g,'；').replace(/^；+|；+$/g,'');
    }else{
      v=(v?v.replace(/；+$/,'')+'；':'')+p;
    }
    ta.value=v;
    a.restore[k][id]=v;
    paintChips(k);paintTabs();paintStatus();
    if(cmpOpen){cmpOpen=false;paintCmp();}
    api.save();api.refresh();
  });
  tabs.addEventListener('click',e=>{
    const t=e.target.closest('[data-tab]');
    if(!t)return;
    showPane(t.dataset.tab);
    paintStatus();api.save();api.refresh();
  });
  see.onclick=()=>{
    if(!unlocked(a)&&!cmpOpen){api.toast('九栏填完，才解锁官方还原');return;}
    cmpOpen=!cmpOpen;
    paintCmp();
  };
  sec.querySelector('#a22Clear').onclick=()=>{
    a.restore[ACT]={};COLS.forEach(s=>{a.restore[ACT][s.id]='';});
    paneOf(ACT).querySelectorAll('textarea').forEach(t=>{t.value='';});
    cmpOpen=false;
    paintChips(ACT);paintTabs();paintStatus();paintCmp();
    api.save();api.refresh();
    api.toast('已清空 '+BY[ACT].n);
  };

  CASES.forEach(c=>{
    const r=a.restore[c.k];
    paneOf(c.k).querySelectorAll('textarea').forEach(t=>{t.value=r[t.dataset.f]||'';});
    paintChips(c.k);
  });
  showPane(ACT);
  paintStatus();
},
hint(S){
  const a=ensure(S);
  const n=filled(a);
  if(n<9)return '九栏还差 '+(9-n)+' 栏（每个案例三栏，第三栏至少 5 字）';
  return '';
},
gate(S){return unlocked(ensure(S));}},

/* ================= 4 在你的事上：换掉新任务 ================= */
{id:'mine',name:'换新任务',short:'换任务',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>案例不换，<em>只换新任务</em></h1>
<p>挑一个案例，把“新任务”换成另一件事。然后判断：它和原任务会不会打架。会、不会、看条件，都要有一句理由。</p></div>
<div class="a22-pick" id="a22Pick"></div>
<div class="a22-orig" id="a22Orig">先选一个案例。</div>
<div class="grid2" style="margin-top:10px;align-items:start">
  <div class="panel">
    <div class="panel-h"><h4>新的“新任务”</h4><span>≥12 字</span></div>
    <div class="field"><textarea id="a22Task" maxlength="100" placeholder="例如：让转盘顺便给路灯发电，白天转、晚上亮"></textarea></div>
    <div class="a22-meta"><span id="a22TaskLen">0</span> / 100　·　至少 12 字</div>
    <div class="a22-remind" id="a22TaskHint">换一件事，不换案例。写清“谁在什么时刻，多得到了什么”。</div>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>它和原任务会不会打架</h4><span>三选一 + 一句理由</span></div>
    <div class="a22-judge" id="a22Judge">
      <button data-j="yes">会打架</button>
      <button data-j="no">不会</button>
      <button data-j="cond">看条件</button>
    </div>
    <div class="field" style="margin-top:8px"><textarea id="a22Why" maxlength="100" placeholder="例如：转得快才能发电，但孩子玩多久不由水站决定——条件是不装变速机构"></textarea></div>
    <div class="a22-meta"><span id="a22WhyLen">0</span> / 100　·　至少 10 字</div>
  </div>
</div>
<div class="a22-test" style="margin-top:10px">
  <div class="a22-test-h"><b>三问自检</b><span>判断之前，先过一遍</span></div>
  <div class="a22-test3">
    <div><span>手</span><b>要占同一只手吗</b><em>两件事都要用手，只能轮流做，就不是同一时刻。</em></div>
    <div><span>时</span><b>要占同一段时间吗</b><em>新任务需不需要停下来、等一等、另外安排一次。</em></div>
    <div><span>位</span><b>要占同一个位置吗</b><em>两件事抢同一个落点，通常只有一件能到位。</em></div>
  </div>
</div>
<div id="a22MineOut" style="margin-top:10px"></div>`,
init(sec,api){
  const S=api.S,a=ensure(S);
  const pick=sec.querySelector('#a22Pick'),orig=sec.querySelector('#a22Orig'),
        task=sec.querySelector('#a22Task'),taskLen=sec.querySelector('#a22TaskLen'),
        taskHint=sec.querySelector('#a22TaskHint'),why=sec.querySelector('#a22Why'),
        whyLen=sec.querySelector('#a22WhyLen'),out=sec.querySelector('#a22MineOut');
  pick.innerHTML=CASES.map(c=>'<button class="a22-pick-c" data-mc="'+c.k+'">'+
    '<img src="'+IMG[c.img]+'" alt=""><span><b>'+esc(c.n)+'</b><em>'+esc(c.orig)+'</em></span><i>→</i></button>').join('');
  const TIPS={
    pump:'换一件事，不换案例。写清它借的是操场上哪样现成的东西。',
    driver:'灯之外，这个机身里还能装什么？写清它和“拧”共用哪块电池、哪个动作。',
    band:'除了核对和防走失，这条带子还能在哪个时刻多干一件事？'
  };
  const FB={
    yes:'你说会打架。那就先指出抢的是哪一样：手、时间，还是位置。抢的那一样，就是这个方案要付的代价。',
    no:'你说不会。那要能说出它搭在哪：同一股力、同一个位置，还是同一段时间。说不出来，通常只是“还没看见打架”。',
    cond:'看条件是最常见的诚实答案。把条件写出来：在什么场景成立，对谁不成立，什么时候会翻车。'
  };
  function paintPick(){
    pick.querySelectorAll('[data-mc]').forEach(b=>b.classList.toggle('on',a.mineCase===b.dataset.mc));
    const c=BY[a.mineCase];
    orig.innerHTML=c
      ? '<b>这个案例</b><span><em>原任务</em>'+esc(c.orig)+'　<em>原来的新任务</em>'+esc(c.cols.new.off)+'</span>'
      : '<b>先选一个案例</b><span>三个案例任选一个，下面的“原任务”和“新任务”会跟着换。</span>';
    taskHint.textContent=c?TIPS[c.k]:'换一件事，不换案例。写清“谁在什么时刻，多得到了什么”。';
  }
  function paintJudge(){
    sec.querySelectorAll('[data-j]').forEach(b=>b.classList.toggle('on',a.mineJudge===b.dataset.j));
    const v=a.mineJudge,whyTxt=(a.mineWhy||'').trim();
    const c=BY[a.mineCase];
    if(!v){out.innerHTML='';return;}
    if(!c){out.innerHTML='<div class="a22-reveal warn"><p class="small">先选一个案例，再判断。</p></div>';return;}
    const taskTxt=(a.mineTask||'').trim();
    out.innerHTML='<div class="a22-reveal judge">'+
      '<div class="a22-reveal-h"><span>'+JUDGE[v]+'</span><span>'+esc(c.n)+'</span></div>'+
      '<p class="small"><b>'+FB[v]+'</b></p>'+
      (taskTxt?'<p class="small">你换的新任务：'+esc(taskTxt)+'</p>':'')+
      (whyTxt&&whyTxt.length>=10?'<p class="small">你的理由：'+esc(whyTxt)+'</p>':'<p class="small">还差一句理由（至少 10 字）：它搭在哪，或者抢在哪。</p>')+
      '</div>';
  }
  task.value=a.mineTask||'';
  why.value=a.mineWhy||'';
  taskLen.textContent=(a.mineTask||'').length;
  whyLen.textContent=(a.mineWhy||'').length;
  pick.querySelectorAll('[data-mc]').forEach(b=>b.onclick=()=>{
    a.mineCase=b.dataset.mc;
    paintPick();paintJudge();api.save();api.refresh();
  });
  task.addEventListener('input',()=>{
    a.mineTask=task.value;taskLen.textContent=a.mineTask.length;
    paintJudge();api.save();api.refresh();
  });
  why.addEventListener('input',()=>{
    a.mineWhy=why.value;whyLen.textContent=a.mineWhy.length;
    paintJudge();api.save();api.refresh();
  });
  sec.querySelectorAll('[data-j]').forEach(b=>b.onclick=()=>{
    a.mineJudge=b.dataset.j;paintJudge();api.save();api.refresh();
  });
  paintPick();paintJudge();
},
hint(S){
  const a=ensure(S);
  if(!a.mineCase)return '先挑一个案例';
  if((a.mineTask||'').trim().length<12)return '写下新的“新任务”（至少 12 字）';
  if(!a.mineJudge)return '判断：会打架、不会，还是看条件';
  if((a.mineWhy||'').trim().length<10)return '还差一句理由（至少 10 字）';
  return '';
},
gate(S){
  const a=ensure(S);
  return !!(a.mineCase&&(a.mineTask||'').trim().length>=12&&
    a.mineJudge&&(a.mineWhy||'').trim().length>=10);
}},

/* ================= 5 过滤与提交 ================= */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 过滤与提交',
html:`
<div class="step-h"><h1>两个过滤，<em>然后交卡</em></h1>
<p>三栏填得再顺，也要过两问：谁最不适应？维护成本最后落在谁身上？</p></div>
<div class="grid2" style="align-items:start">
  <div id="a22CardSlot"></div>
  <div class="stack" style="gap:10px">
    <div class="panel">
      <div class="panel-h"><h4>① 谁最不适应</h4><span>≥4 字</span></div>
      <div class="field"><textarea id="a22Hard" maxlength="80" placeholder="例如：打水的妈妈——她习惯了在水站等，现在要等孩子玩够"></textarea></div>
      <div class="a22-meta"><span id="a22HardLen">0</span> / 80</div>
      <div class="a22-chips" id="a22HardChips"></div>
    </div>
    <div class="panel">
      <div class="panel-h"><h4>② 维护成本落在谁</h4><span>≥4 字</span></div>
      <div class="field"><textarea id="a22Cost" maxlength="80" placeholder="例如：学校的维修工——转轴、密封圈、水泵都要他一个人管"></textarea></div>
      <div class="a22-meta"><span id="a22CostLen">0</span> / 80</div>
      <div class="a22-chips" id="a22CostChips"></div>
    </div>
    <div class="panel">
      <div class="panel-h"><h4>提交</h4><span id="a22SubSt">未提交</span></div>
      <div class="row"><button class="btn primary" id="a22Sub">提交</button>
        <button class="btn" id="a22Exp">导出 PNG</button></div>
      <div class="hint" style="margin-top:6px">提交后引擎自动跑一次 AI 评审（有用 / 可行 / 证据），再进班级互评。</div>
    </div>
  </div>
</div>
<div class="panel a22-read" style="margin-top:12px">
  <div class="panel-h"><h4>这张卡会被怎么读</h4><span>互评时先看这三处</span></div>
  <div class="a22-read3">
    <div><span>01</span><b>新任务是不是“另一件工具”</b><em>有自己的开关、自己的电、自己的携带动作，就不算一专多能。</em></div>
    <div><span>02</span><b>第三栏有没有说清搭在哪</b><em>同一股力、同一个位置、同一段时间，至少说中一个。</em></div>
    <div><span>03</span><b>维护成本有没有人认领</b><em>“不新增人手”不等于没有成本，只是成本换了个人付。</em></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=ensure(S);
  const slot=sec.querySelector('#a22CardSlot'),hard=sec.querySelector('#a22Hard'),
        cost=sec.querySelector('#a22Cost'),hardLen=sec.querySelector('#a22HardLen'),
        costLen=sec.querySelector('#a22CostLen'),st=sec.querySelector('#a22SubSt'),
        btn=sec.querySelector('#a22Sub');
  const HARD=['打水的妈妈','一线使用者','现场主管','维护班组','买单的人'];
  const COST=['学校维修工','工具管理员','护士站值班','信息科工程师','物业维修'];
  function chips(el,list,key){
    el.innerHTML=list.map(x=>'<button class="chip" data-v="'+api.esc(x)+'">'+api.esc(x)+'</button>').join('');
    el.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{
      const v=b.dataset.v;
      const cur=(a[key]||'');
      a[key]=cur?(cur.indexOf(v)>=0?cur:cur.replace(/；+$/,'')+'；'+v):v;
      api.save();paint(true);api.refresh();
    });
  }
  function paint(full){
    if(full){
      hard.value=a.whoHard||'';
      cost.value=a.whoCost||'';
      hardLen.textContent=(a.whoHard||'').length;
      costLen.textContent=(a.whoCost||'').length;
    }
    slot.innerHTML='<div class="outcard a22-card"><div class="oh"><span>DELIVERABLE · A22</span><span>还原卡</span></div>'+
      '<h5>三案例还原卡</h5><div class="kv">'+api.card().rows.map(r=>
        '<div><b>'+api.esc(r[0])+'</b><span class="'+(r[1]&&r[1]!=='—'?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+'</div></div>';
    const ready=!!((a.whoHard||'').trim().length>=4&&(a.whoCost||'').trim().length>=4);
    st.textContent=S.submitted?'已提交':'未提交';
    btn.textContent=S.submitted?'已提交，去看班级':(ready?'提交':'先补完两个过滤');
    btn.disabled=!!S.submitted||!ready;
  }
  hard.addEventListener('input',()=>{
    a.whoHard=hard.value;hardLen.textContent=a.whoHard.length;paint(false);api.save();api.refresh();
  });
  cost.addEventListener('input',()=>{
    a.whoCost=cost.value;costLen.textContent=a.whoCost.length;paint(false);api.save();api.refresh();
  });
  btn.onclick=async()=>{
    if(!((a.whoHard||'').trim().length>=4&&(a.whoCost||'').trim().length>=4)){api.toast('先把两个过滤补完');return;}
    await api.submit();paint(false);
  };
  sec.querySelector('#a22Exp').onclick=()=>api.exportCard();
  sec.__a22paint=()=>paint(true);
  chips(sec.querySelector('#a22HardChips'),HARD,'whoHard');
  chips(sec.querySelector('#a22CostChips'),COST,'whoCost');
  paint(true);
},
onEnter(){
  const sec=document.querySelector('.step[data-s="4"]');
  if(sec&&sec.__a22paint)sec.__a22paint();
},
hint(S){
  const a=ensure(S);
  if((a.whoHard||'').trim().length<4)return '写一句：谁最不适应（至少 4 字）';
  if((a.whoCost||'').trim().length<4)return '写一句：维护成本落在谁（至少 4 字）';
  return '';
},
gate(S){
  const a=ensure(S);
  return !!((a.whoHard||'').trim().length>=4&&(a.whoCost||'').trim().length>=4);
}},

/* ================= 6 收束 ================= */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>带走<em>三句话</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 新任务要搭在旧动作上</div>
    <p class="small" style="margin-top:5px">搭不上，就是加了一件工具。工具要单独开、单独带、单独充电。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 接法只有三种</div>
    <p class="small" style="margin-top:5px">内部：一个组件两个功能；外部：借环境里现成的；时间：不同时刻各干一件。三个案例各一种。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 “不打架”要说得出来</div>
    <p class="small" style="margin-top:5px">说不出搭在哪，通常只是还没看见冲突。看条件，也要把条件写出来。</p></div>
</div>
<div class="panel" style="margin-bottom:12px">
  <div class="panel-h"><h4>三个案例，一张表</h4><span>同一把刀，三种接法</span></div>
  <div class="a22-table">
    <div class="a22-tr a22-thd"><span>案例</span><span>原任务</span><span>新任务</span><span>接法</span></div>
    <div class="a22-tr"><b>Play Pump</b><span>孩子玩转盘</span><span>抽地下水进 2,500 升水箱</span><span>外部：借孩子本来就要玩的力</span></div>
    <div class="a22-tr"><b>带灯螺丝刀</b><span>把批头对准螺丝</span><span>照亮工作点</span><span>内部：一个机身两件事</span></div>
    <div class="a22-tr"><b>医院腕带</b><span>确认“你是谁”</span><span>给药核对、防走失</span><span>时间：三个时刻各干一件</span></div>
  </div>
</div>
<div class="a22-end">一专多能不是“再加一个功能”，是<em>让同一个东西，在同一个动作里多干一件事</em>。</div>
<div class="panel">
  <div class="panel-h"><h4>下一节</h4><span>A23</span></div>
  <p class="small">A23 · 一专多能：八步实战。换你自己的对象：列组件，挑一个已经在场的，从八个步骤走到一项新任务。这一次没有官方还原，只有你的现场。</p>
  <div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a>
    <button class="btn" id="a22Again">重看这一节</button></div>
</div>`,
init(sec,api){sec.querySelector('#a22Again').onclick=()=>api.go(0);},
hint(S){return '';},gate(S){return true;}}
],

side:{asks:[
 'Play Pump 里，孩子知道自己在打水吗？不知道，为什么反而成立？',
 '螺丝刀的灯如果装在手柄尾部，哪一个动作被挡住了？',
 '腕带多做的两件事，为什么没有让护士多做一个动作？',
 '你换的那个新任务，和原任务抢的是同一只手、同一段时间，还是同一个动作？',
 '维护成本落在谁身上？那个人有没有被算进“不新增人手”？'
]},

card(S){
  const a=(S.answers&&S.answers.a22)||{};
  const pick=a.mineCase&&BY[a.mineCase];
  return {title:'A22 · 三案例还原卡',rows:[
    ['Play Pump',brief(a,'pump')],
    ['带灯螺丝刀',brief(a,'driver')],
    ['医院腕带',brief(a,'band')],
    ['换任务',pick?(pick.n+' → '+((a.mineTask||'').trim()||'—')):'—'],
    ['判断',(JUDGE[a.mineJudge]||'—')+((a.mineWhy||'').trim()?' · '+a.mineWhy.trim():'')],
    ['两问','最不适应：'+((a.whoHard||'').trim()||'—')+' · 维护：'+((a.whoCost||'').trim()||'—')]
  ]};
},

notes:[
 {t:'本节目标',h:'用三个已成立的案例，把一专多能从“加个功能”推到“给已有组件派新活”。三栏法的命门是第三栏：说不清新任务搭在哪，案例就还停在加法。A23 的八步实战完全依赖这一栏。'},
 {t:'时间分配',h:'先猜 4′ · 三栏法 9′ · 还原台 16′ · 换新任务 8′ · 两个过滤与提交 6′ · 收束 2′。还原台至少留 10 分钟让人真填，不要替他们念官方还原。'},
 {t:'常见卡点',h:'第一栏容易写成“这个东西是用来××的”，太抽象；要求写到具体动作，比如“把批头对准螺丝”。第三栏最容易写成“两者互不影响”，这等于没解释；要求先认是哪一种接法——内部两个功能、外部借现成、时间上分先后，再说清具体搭在哪。第二个卡点是把“加一个手电筒”当成一专多能。第三个卡点是“时间型=不同时=不成立”：A21 的时间型允许不同时刻，只要前一件不给后一件添麻烦；A23 的同时性检查主要针对内部、外部型。腕带三件事同时在带上，分别在不同时刻被用到。'},
 {t:'直播怎么接',h:'打开后台看三栏和“换新任务”卡：先挑一个第三栏写“互不影响”的，问“它到底搭在哪”；再挑一个换了新任务、判断写“不会”却只有一句“挺好的”，问“那你说的不会，是没冲突还是没看见”。两张卡并排放，比讲三个案例有效。'},
 {t:'案例口径',h:'Play Pump 的 2,500 升水箱、两个工作零件、旋转转往复来自官方备注（Day3 p.34 / TU 库 p.42）。带灯螺丝刀与医院腕带没有对应的官方单页，是按 Day3 p.35、p.69 的一专多能判据整理的还原；讲课时说“按判据还原”，不要说“官方原页”。螺丝刀确实多了一颗 LED——判的是“用户没有多出一个动作”，灯借的是同一块电池、同一个握法、同一个指向；这一层建议当场说破，比回避更有说服力。腕带部分不承诺定位精度，只讲“门禁读到腕带”这一层。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A22']=L;
})();
