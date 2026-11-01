/* =========================================================
   DAY 3 · 做出原型    发小明 属性关联 + 盒内思考
   规则卡 → 提示通道 → 材料盒 → 四槽拼装 → 丑原型自测 → 证据卡
   ========================================================= */
(function(){
'use strict';

const obj=v=>(v&&typeof v==='object'&&!Array.isArray(v))?v:{};
const mat=id=>MATS.find(x=>x.id===id)||null;

/* ---------- 规则卡的四个条件 / 四种反应 ---------- */
const CONDS=[
 {id:'dark',e:'🌑',n:'太暗',h:'天黑 / 没开灯'},
 {id:'noise',e:'📢',n:'太吵',h:'听不清 / 听不见'},
 {id:'hands',e:'🙌',n:'手不够用',h:'两只手都占着'},
 {id:'far',e:'📏',n:'距离太远',h:'够不到 / 隔得远'}
];
const REACTS=[
 {id:'light',e:'💡',n:'亮起来',see:'有个地方亮了一下'},
 {id:'sound',e:'🔔',n:'发出声音',see:'听到一声响'},
 {id:'move',e:'⚙️',n:'动一下',see:'它自己动了一下'},
 {id:'shape',e:'🔺',n:'变形状',see:'它的形状变了'}
];
const CHECKS=[
 {id:'see',e:'👀',q:'能被看见吗？',hint:'隔 2 米，一眼看得出它变了'},
 {id:'touch',e:'✋',q:'能被摸到吗？',hint:'不用解释，手放上去就知道'},
 {id:'test',e:'📏',q:'能被测到吗？',hint:'能数出来：几次、几秒、多亮'}
];
const ANSWERS=[{v:'yes',n:'能'},{v:'no',n:'还不能'},{v:'untried',n:'还没试'}];

/* ---------- 五个提示通道 ---------- */
const CHANS=[
 {id:'light',e:'💡',n:'光',ex:'台灯、手电、手机闪光灯',pro:'一眼就看见，不用教',con:'白天看不清 · 耗电'},
 {id:'sound',e:'🔊',n:'声',ex:'门铃、闹钟、口哨',pro:'不看也能听见',con:'吵到人 · 听不见的人用不了'},
 {id:'move',e:'⚙️',n:'动',ex:'风扇转、窗帘拉、轮子滚',pro:'看得见它在干活',con:'难做 · 容易卡住'},
 {id:'touch',e:'✋',n:'触',ex:'震一下、凸起来、有阻力',pro:'闭着眼也能感觉到',con:'隔着衣服就没了'},
 {id:'shape',e:'🔺',n:'形',ex:'换颜色、变形状、冒出一张纸',pro:'便宜，一张纸就能做',con:'要凑近看 · 容易被忽略'}
];

/* ---------- 材料盒 12 样（盒内思考） ---------- */
const MATS=[
 {id:'board',e:'📦',n:'纸板',role:'结构',what:'硬，能撑住形状、挡光'},
 {id:'straw',e:'🥤',n:'吸管',role:'结构',what:'轻，能当轴、当杆'},
 {id:'cup',e:'🍵',n:'纸杯',role:'结构',what:'有口有底，能装东西'},
 {id:'tape',e:'🎗️',n:'胶带',role:'连接',what:'粘住两样东西，快但不牢'},
 {id:'clip',e:'🖇️',n:'长尾夹',role:'连接',what:'夹住就固定，还能拆'},
 {id:'rope',e:'🧵',n:'棉绳',role:'连接',what:'拉、绑、吊，能传力'},
 {id:'band',e:'⭕',n:'橡皮筋',role:'动力',what:'拉开就存力，松手就动'},
 {id:'balloon',e:'🎈',n:'气球',role:'动力',what:'吹大存气，放气就冲'},
 {id:'foil',e:'✨',n:'铝箔',role:'提示',what:'反光、遮光、能捏形状'},
 {id:'note',e:'🗒️',n:'便签',role:'提示',what:'写字贴上去，最便宜的提示'},
 {id:'scissor',e:'✂️',n:'剪刀',role:'工具',what:'剪开纸板，圆头安全',teacher:'教师保管',tip:'剪刀由老师保管：用的时候举手，不要自己拿'},
 {id:'knife',e:'🔪',n:'美工刀',role:'工具',what:'切直线，只有老师能用',teacher:'教师操作',tip:'美工刀只能老师操作：你负责说切哪里'}
];

/* ---------- 四个槽 ---------- */
const SLOTS=[
 {id:'body',n:'主体',e:'📦',job:'装得下、立得住'},
 {id:'join',n:'连接',e:'🔗',job:'把两样东西固定在一起'},
 {id:'power',n:'动力',e:'⚙️',job:'让它动起来 / 有变化'},
 {id:'signal',n:'提示',e:'📣',job:'让别人知道它起作用了'}
];

/* ---------- 三个失败模式 ---------- */
const FAILS=[
 {id:'loose',e:'💥',n:'会不会散架',act:'举起来，摇三下',q:'还连着吗？'},
 {id:'stop',e:'🛑',n:'会不会不动',act:'按规则触发一次',q:'它动了吗？'},
 {id:'unclear',e:'🙈',n:'别人看不看得懂',act:'给同伴看 3 秒，不说话',q:'他知道发生了什么吗？'}
];
const JUDGES=[{v:'untried',n:'还没试'},{v:'fine',n:'应该没事'},{v:'bad',n:'已经出问题了'}];
const FIXES=[{id:'pos',n:'位置'},{id:'join',n:'连接'},{id:'power',n:'动力'},{id:'hint',n:'提示'}];
const FIXHINT={
 loose:'只改一处：把最松的一处连接换成长尾夹，或在接缝加一条三角纸板。改完再摇三下。',
 stop:'只改一处：先查动力有没有真的接上——橡皮筋绕几圈？气球的气往哪边走？只动传力这一处。',
 unclear:'只改一处：加一张便签，写三个字「按这里」，贴在会动的地方。别改结构。'
};

/* ---------- 从状态里读出一张证据卡（幕 5 / 幕 6 共用） ---------- */
function evidenceData(api){
  const S=api.S||{};
  const rule=obj(S.rule), chan=obj(S.chan), spec=obj(S.spec), slots=obj(S.slots);
  const co=CONDS.find(x=>x.id===rule.cond), ro=REACTS.find(x=>x.id===rule.react);
  const ruleText=(co&&ro)?('如果'+co.n+'，就'+ro.n):'—';
  const main=CHANS.find(x=>x.id===chan.main), bk=CHANS.find(x=>x.id===chan.backup);
  const mats=(Array.isArray(S.mats)?S.mats:[]).map(id=>mat(id)).filter(Boolean);
  const slotText=SLOTS.map(s=>s.n+'='+(mat(slots[s.id])?mat(slots[s.id]).n:'空')).join(' / ');
  const probs=FAILS.filter(f=>(Array.isArray(S.log)?S.log:[]).indexOf(f.id)>=0).map(f=>f.n).join('；');
  const fix=FIXES.find(x=>x.id===S.fix);
  const head=(spec.name?('「'+spec.name+'」'):'')+(spec.who?('给 '+spec.who):'');
  return {
    title:'第 3 天 · 原型卡',
    short:ruleText+' · '+(main?main.n:'—')+'/'+(bk?bk.n:'—'),
    fields:[
      {label:'规则（如果…就…）',value:ruleText+(ro?('（别人会看到：'+ro.see+'）'):'')},
      {label:'主通道 / 备份通道',value:(main?main.n:'—')+' / '+(bk?bk.n:'—')},
      {label:'用了哪几样材料',value:mats.length?(mats.map(m=>m.n).join('、')+'（共 '+mats.length+' 样）'):'—'},
      {label:'四个槽怎么工作',value:(head?head+' · ':'')+slotText},
      {label:'自测发现的问题',value:probs||'—'},
      {label:'只改一处',value:(fix?('改'+fix.n):'还没定')+((S.retest||0)>0?(' · 重测 '+S.retest+' 次'):'')}
    ],
    stamp:'原型卡',
    drawing:S.draw||null
  };
}

/* ---------- 幕 5 的原型缩略图 ---------- */
function paintProto(sec,S){
  const row=sec.querySelector('[data-proto-row]');if(!row)return;
  const slots=obj(S.slots);
  row.innerHTML=SLOTS.map((s,i)=>{
    const m=mat(slots[s.id]);
    return (i?'<span class="d3-pjoin">+</span>':'')+
      '<span class="d3-pbox'+(m?'':' empty')+'"><i>'+s.n+'</i><b>'+(m?m.e:'❓')+'</b><em>'+(m?m.n:'空')+'</em></span>';
  }).join('');
}

const c={
no:'3',title:'做出原型',kicker:'DAY 3 / 5 · BUILD',
line1:'做出',line2:'一个丑原型',
lead:'今天不追求好看。<br>用盒子里的东西，做出一个 <b>能被别人摸到</b> 的东西，<br>再让它按一句「如果…就…」工作。',
tool:'属性关联 + 盒内思考',
words:['如果','就','装上去','试一试'],
meta:['6 幕 · 全天','混龄 7–13 大带小','材料：盒里 12 样，最多拿 5 样'],
acc:'#FF9A5B',acc2:'#FFE6D2',rgb:'255,154,91',

acts:[
/* ---------- 01 ---------- */
{a:'01',name:'写一张规则卡',time:'30 分',html:`
<div class="ch-head"><div class="act"><b>01</b><span>写一张规则卡</span><i>如果…就…</i></div><h2>先写清楚：<em>它怎么工作</em></h2><p>不是"做个好东西"，是"做个能按规则动的东西"。条件四选一，反应四选一，拼成一句话。</p></div>
<div class="cp-hud"><span class="hp brand">发小明 · 属性关联</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">规则 <b data-rule>未写</b></span><span class="hp">自检 <b data-check>0/3</b></span></div>
<div class="cp-split">
  <div class="cp-stage d3-stage d3-stage-rule">
    <div class="cp-stage-label">RULE CARD · 两个空都填上，这句话才成立</div>
    <div class="d3-rule">
      <div class="d3-k"><b>如果</b><span>什么时候会发生？</span></div>
      <div class="d3-opts4" data-condbox>${CONDS.map(x=>`<button class="d3-opt" data-cond="${x.id}"><span>${x.e}</span><b>${x.n}</b><i>${x.h}</i></button>`).join('')}</div>
      <div class="d3-card" data-card>
        <div class="d3-line"><span>如果</span><b class="blank" data-line-cond>＿＿＿＿</b><span>，</span></div>
        <div class="d3-line"><span>就</span><b class="blank" data-line-react>＿＿＿＿</b><span>。</span></div>
        <div class="d3-see" data-line-see>别人会看到什么？两个空都填上，这句话才成立。</div>
        <span class="d3-card-ico" data-card-ico>？</span>
      </div>
      <div class="d3-k"><b>就</b><span>它做什么，别人一眼能看到？</span></div>
      <div class="d3-opts4" data-reactbox>${REACTS.map(x=>`<button class="d3-opt" data-react="${x.id}"><span>${x.e}</span><b>${x.n}</b><i>${x.see}</i></button>`).join('')}</div>
    </div>
  </div>
  <div class="cp-side">
    <div class="cp-panel"><h4>三条自检 · 现在就能答</h4>
      <div class="d3-checks">
        ${CHECKS.map(x=>`<div class="d3-check"><div class="d3-check-q"><span>${x.e}</span><div><b>${x.q}</b><i>${x.hint}</i></div></div><div class="d3-seg">${ANSWERS.map(o=>`<button data-ck="${x.id}" data-v="${o.v}">${o.n}</button>`).join('')}</div></div>`).join('')}
      </div>
    </div>
    <div class="cp-panel d3-prev"><h4>前几天留下的</h4><div class="cp-kv">
      <div class="row"><b>给谁做</b><span data-who>第 1 天没有记录</span></div>
      <div class="row"><b>第 2 天的方向</b><span data-dir>第 2 天没有记录</span></div>
    </div></div>
    <div class="cp-note" data-note></div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>去挑提示通道 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;
  S.rule=obj(S.rule);S.rule.cond=S.rule.cond||'';S.rule.react=S.rule.react||'';
  S.checks=obj(S.checks);
  if(!S._xp1){S._xp1=1;api.addXp(10);}
  const xp=sec.querySelector('[data-xp]'),ruleHud=sec.querySelector('[data-rule]'),checkHud=sec.querySelector('[data-check]');
  const card=sec.querySelector('[data-card]'),lc=sec.querySelector('[data-line-cond]'),lr=sec.querySelector('[data-line-react]'),see=sec.querySelector('[data-line-see]');
  const note=sec.querySelector('[data-note]'),next=sec.querySelector('[data-next]');
  const whoEl=sec.querySelector('[data-who]'),dirEl=sec.querySelector('[data-dir]');
  const cName=id=>(CONDS.find(x=>x.id===id)||{}).n||'';
  const rObj=id=>REACTS.find(x=>x.id===id)||null;
  const answered=()=>CHECKS.filter(x=>S.checks[x.id]).length;

  /* 跨天：第 1 天的人、第 2 天的方向 */
  try{
    const d1=api.dayData(1)||{},d2=api.dayData(2)||{};
    const f1=(d1.evidence&&d1.evidence.fields)||[];
    const row=f1.find(x=>String(x.label||'').indexOf('我选的人')>=0);
    if(row&&row.value)whoEl.textContent=String(row.value).split('（')[0];
    const d2v=(d2.evidence&&(d2.evidence.short||((d2.evidence.fields||[])[0]||{}).value))||'';
    if(d2v)dirEl.textContent=d2v;
  }catch(e){}

  function paint(){
    sec.querySelectorAll('[data-cond]').forEach(b=>b.classList.toggle('on',b.dataset.cond===S.rule.cond));
    sec.querySelectorAll('[data-react]').forEach(b=>b.classList.toggle('on',b.dataset.react===S.rule.react));
    sec.querySelectorAll('[data-ck]').forEach(b=>b.classList.toggle('on',S.checks[b.dataset.ck]===b.dataset.v));
    const ro=rObj(S.rule.react);
    lc.textContent=cName(S.rule.cond)||'＿＿＿＿';
    lr.textContent=ro?ro.n:'＿＿＿＿';
    lc.classList.toggle('blank',!S.rule.cond);
    lr.classList.toggle('blank',!ro);
    see.innerHTML=ro?('别人会看到 / 听到：<b>'+ro.see+'</b>。这就是你要测的现象。'):'别人会看到什么？两个空都填上，这句话才成立。';
    const ico=sec.querySelector('[data-card-ico]');
    if(ico)ico.textContent=ro?ro.e:'？';
    card.classList.toggle('done',!!(S.rule.cond&&ro));
    const ok=!!(S.rule.cond&&ro),n=answered();
    ruleHud.textContent=ok?'写好了':'未写';
    checkHud.textContent=n+'/3';
    if(!ok){note.innerHTML='<b>先填两个空：</b>什么时候（条件）+ 它做什么（反应）。填完才能去挑通道。';}
    else if(n<3){note.innerHTML='<b>规则有了，还差 '+(3-n)+' 条自检：</b>能被看见 / 能被摸到 / 能被测到。';}
    else{
      const notYet=CHECKS.filter(x=>S.checks[x.id]!=='yes').length;
      note.innerHTML=notYet?('<b>有 '+notYet+' 条还没过：</b>带到第 5 幕，自测时专门试这几条。'):'<b>三条都过了：</b>第 5 幕会用丑原型真的试一遍——先别急着放心。';
    }
    next.disabled=!(ok&&n===3);
    xp.textContent=S.xp||0;
  }
  sec.querySelectorAll('[data-cond]').forEach(b=>b.onclick=()=>{
    const id=b.dataset.cond;S.rule.cond=(S.rule.cond===id?'':id);api.save();api.sfx(S.rule.cond?'pop':'tap');paint();
  });
  sec.querySelectorAll('[data-react]').forEach(b=>b.onclick=()=>{
    const id=b.dataset.react;S.rule.react=(S.rule.react===id?'':id);api.save();api.sfx(S.rule.react?'pop':'tap');paint();
  });
  sec.querySelectorAll('[data-ck]').forEach(b=>b.onclick=()=>{
    S.checks[b.dataset.ck]=b.dataset.v;api.save();api.sfx('tap');
    if(b.dataset.v==='no')api.toast('记下来：这条第 5 幕要专门试','📌');
    paint();
  });
  next.onclick=()=>api.go(2);
  paint();
}},

/* ---------- 02 ---------- */
{a:'02',name:'挑提示通道',time:'45 分',html:`
<div class="ch-head"><div class="act"><b>02</b><span>挑提示通道</span><i>主 + 备份</i></div><h2>别人怎么<em>知道它起作用了</em></h2><p>五个通道，每个都要付代价。选 1 个主通道，再选 1 个不一样的备份——主通道做不出来时，它要能顶上。</p></div>
<div class="cp-hud"><span class="hp brand">发小明 · 属性关联</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">主 <b data-main>未选</b></span><span class="hp">备 <b data-backup>未选</b></span></div>
<div class="cp-split">
  <div class="cp-stage d3-stage">
    <div class="cp-stage-label">SIGNAL · 点一行 = 选中它</div>
    <div class="d3-mode">
      <button data-setmode="main" class="on">① 先选主通道</button>
      <button data-setmode="backup">② 再选备份</button>
      <span class="d3-modehint" data-modehint>点下面任意一行 →</span>
    </div>
    <div class="d3-chans" data-chans>${CHANS.map(x=>`<button class="d3-chan" data-ch="${x.id}">
      <span class="d3-ch-e">${x.e}</span>
      <span class="d3-ch-name"><b>${x.n}</b><i>${x.ex}</i></span>
      <span class="d3-ch-cell"><em>优点</em><span>${x.pro}</span></span>
      <span class="d3-ch-cell cost"><em>代价</em><span>${x.con}</span></span>
      <span class="d3-ch-flag"></span>
    </button>`).join('')}</div>
  </div>
  <div class="cp-side">
    <div class="cp-panel"><h4>主通道</h4><div class="d3-pickbox" data-mainbox></div></div>
    <div class="cp-panel"><h4>备份通道</h4><div class="d3-pickbox" data-backbox></div></div>
    <div class="cp-note" data-note></div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>去材料盒 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;
  S.chan=obj(S.chan);S.chan.main=S.chan.main||'';S.chan.backup=S.chan.backup||'';
  if(!S._xp2){S._xp2=1;api.addXp(15);}
  let mode='main';
  const chans=sec.querySelectorAll('[data-ch]');
  const mainHud=sec.querySelector('[data-main]'),backHud=sec.querySelector('[data-backup]');
  const mainBox=sec.querySelector('[data-mainbox]'),backBox=sec.querySelector('[data-backbox]');
  const note=sec.querySelector('[data-note]'),next=sec.querySelector('[data-next]'),xp=sec.querySelector('[data-xp]');
  const hint=sec.querySelector('[data-modehint]');
  const find=id=>CHANS.find(x=>x.id===id)||null;

  function pickHTML(ch,kind){
    if(!ch)return '<span class="muted">'+(kind==='main'?'还没选主通道':'还没选备份通道')+'</span>';
    return '<div class="d3-pk"><span class="d3-pk-e">'+ch.e+'</span><div><b>'+ch.n+'通道</b><i>'+ch.ex+'</i></div><button class="d3-pk-x" data-clear="'+kind+'" aria-label="清空">×</button></div>'+
      '<div class="d3-pk-row"><em>优点</em><span>'+ch.pro+'</span></div>'+
      '<div class="d3-pk-row cost"><em>代价</em><span>'+ch.con+'</span></div>';
  }
  function setMain(id){
    if(S.chan.main===id){S.chan.main='';api.sfx('tap');return;}
    if(S.chan.backup===id){S.chan.backup=S.chan.main||'';}
    S.chan.main=id;api.sfx('pop');
    if(!S.chan.backup){mode='backup';api.toast('主通道定了，再选一个备份','📡');}
  }
  function setBackup(id){
    if(!S.chan.main){api.sfx('error');api.toast('先选主通道，再选备份——顺序反了会漏掉主要的那条路','✋');return;}
    if(S.chan.main===id){api.sfx('error');api.toast('备份要和主通道不一样——同一个坏了就全坏了','✋');return;}
    if(S.chan.backup===id){S.chan.backup='';api.sfx('tap');return;}
    S.chan.backup=id;api.sfx('pop');mode='main';
    const m=find(S.chan.main);
    api.toast('主 '+(m?m.n:'—')+' · 备 '+(find(id)||{}).n,'📡');
  }
  function paint(){
    chans.forEach(b=>{
      const id=b.dataset.ch;
      b.classList.toggle('is-main',S.chan.main===id);
      b.classList.toggle('is-back',S.chan.backup===id);
      b.querySelector('.d3-ch-flag').textContent=S.chan.main===id?'主':(S.chan.backup===id?'备':'');
    });
    sec.querySelectorAll('[data-setmode]').forEach(b=>b.classList.toggle('on',b.dataset.setmode===mode));
    mainHud.textContent=find(S.chan.main)?find(S.chan.main).n:'未选';
    backHud.textContent=find(S.chan.backup)?find(S.chan.backup).n:'未选';
    mainBox.innerHTML=pickHTML(find(S.chan.main),'main');
    backBox.innerHTML=pickHTML(find(S.chan.backup),'backup');
    sec.querySelectorAll('[data-clear]').forEach(b=>b.onclick=()=>{
      if(b.dataset.clear==='main')S.chan.main='';else S.chan.backup='';
      api.save();api.sfx('tap');paint();
    });
    const both=!!(S.chan.main&&S.chan.backup);
    if(both)hint.textContent='两个都定了。想换主通道，直接点另一行。';
    else if(mode==='backup')hint.textContent='点下面任意一行 = 设为备份（不能和主通道一样）';
    else hint.textContent='点下面任意一行 = 设为主通道';
    if(!S.chan.main)note.innerHTML='<b>先选主通道：</b>它要在这间教室里、只用盒里的材料就能做出来。';
    else if(!S.chan.backup)note.innerHTML='<b>主通道是「'+find(S.chan.main).n+'」。</b>再选一个备份：主通道做不出来、或者坏了，它能顶上。';
    else note.innerHTML='<b>两个都定了。</b>想一想：备份要怎么装在同一个原型上？如果装不上，它就不算备份。';
    next.disabled=!both;
    xp.textContent=S.xp||0;
  }
  sec.querySelectorAll('[data-setmode]').forEach(b=>b.onclick=()=>{
    if(b.dataset.setmode==='backup'&&!S.chan.main){
      api.sfx('error');api.toast('先选主通道，再选备份','✋');
      mode='main';paint();return;
    }
    mode=b.dataset.setmode;api.sfx('tap');paint();
  });
  chans.forEach(b=>b.onclick=()=>{
    if(mode==='backup')setBackup(b.dataset.ch);else setMain(b.dataset.ch);
    api.save();paint();
  });
  next.onclick=()=>api.go(3);
  paint();
}},

/* ---------- 03 ---------- */
{a:'03',name:'材料盒',time:'50 分',html:`
<div class="ch-head"><div class="act"><b>03</b><span>材料盒</span><i>盒内思考</i></div><h2>只能用盒里的东西，<em>最多拿 5 样</em></h2><p>把盒子摊开，一样一样看：它硬不硬？能不能粘？能不能动？剪刀和美工刀由老师保管。</p></div>
<div class="cp-hud"><span class="hp brand">发小明 · 盒内思考</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">已拿 <b data-count>0</b>/5</span></div>
<div class="cp-split">
  <div class="cp-stage d3-stage">
    <div class="cp-stage-label">MATERIAL BOX · 点一下就拿，再点一下放回</div>
    <div class="d3-mats">${MATS.map(m=>`<button class="d3-mat${m.teacher?' d3-mat-tool':''}" data-mat="${m.id}">
      <span class="d3-mat-no" data-no></span>
      <span class="d3-mat-e">${m.e}</span>
      <b>${m.n}</b>
      <i>${m.role}${m.teacher?' · '+m.teacher:''}</i>
      <span class="d3-mat-w">${m.what}</span>
    </button>`).join('')}</div>
    <div class="d3-safe">⚠️ 剪刀由老师保管 · 美工刀只能老师操作 · 气球不吹到脸 · 橡皮筋不朝人弹</div>
  </div>
  <div class="cp-side">
    <div class="cp-panel"><h4>已经拿出来的</h4><div class="d3-tray" data-tray></div></div>
    <div class="cp-note" data-note></div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>去拼四槽 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;
  S.mats=Array.isArray(S.mats)?S.mats.filter(id=>mat(id)):[];
  if(!S._xp3){S._xp3=1;api.addXp(15);}
  const tray=sec.querySelector('[data-tray]'),note=sec.querySelector('[data-note]'),next=sec.querySelector('[data-next]');
  const cnt=sec.querySelector('[data-count]'),xp=sec.querySelector('[data-xp]');

  function paint(){
    sec.querySelectorAll('[data-mat]').forEach(b=>{
      const id=b.dataset.mat,i=S.mats.indexOf(id);
      b.classList.toggle('on',i>=0);
      b.querySelector('[data-no]').textContent=i>=0?(i+1):'';
    });
    cnt.textContent=S.mats.length;
    tray.innerHTML=S.mats.length?S.mats.map(id=>{
      const m=mat(id);
      return '<button class="d3-traychip" data-rm="'+id+'"><span>'+m.e+'</span><b>'+m.n+'</b><i>'+m.role+(m.teacher?' · '+m.teacher:'')+'</i><em>×</em></button>';
    }).join(''):'<span class="muted">盒子还没开。左边点材料。</span>';
    sec.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{
      S.mats=S.mats.filter(x=>x!==b.dataset.rm);api.save();api.sfx('tap');paint();
    });
    const n=S.mats.length,tools=S.mats.filter(id=>mat(id).teacher).length;
    let t;
    if(n<4){t='<b>还差 '+(4-n)+' 样：</b>四个槽（主体 / 连接 / 动力 / 提示）每个都要有东西靠。';}
    else if(n<5){t='<b>'+n+' 样了，够四个槽用。</b>想再拿第 5 样当备用？先想清楚它替哪个槽。';}
    else{t='<b>拿满了 5 样。</b>不能再加——想换，先点一下拿掉一样。';}
    if(tools)t+='<br><b>剪刀 / 美工刀：</b>只有老师能拿，用的时候举手。';
    note.innerHTML=t;
    next.disabled=n<4;
    xp.textContent=S.xp||0;
  }
  sec.querySelectorAll('[data-mat]').forEach(b=>b.onclick=()=>{
    const id=b.dataset.mat,i=S.mats.indexOf(id);
    if(i>=0){S.mats.splice(i,1);api.sfx('tap');}
    else{
      if(S.mats.length>=5){
        api.sfx('error');api.toast('先拿掉一样，再拿新的','✋');
        b.classList.add('d3-shake');setTimeout(()=>b.classList.remove('d3-shake'),420);
        return;
      }
      S.mats.push(id);api.sfx('pop');
      const m=mat(id);
      if(m.teacher)api.toast(m.tip,'⚠️');else api.toast('拿到：'+m.n,'📦');
    }
    api.save();paint();
  });
  next.onclick=()=>api.go(4);
  paint();
}},

/* ---------- 04 ---------- */
{a:'04',name:'四槽拼装',time:'65 分',html:`
<div class="ch-head"><div class="act"><b>04</b><span>四槽拼装</span><i>每个槽都要有东西在干活</i></div><h2>把它拆成<em>四个槽</em>，一个一个装上</h2><p>先在右边点一个材料，再点一个槽。每个槽都要能说出"现在靠什么工作"。四个槽都装上了，才谈得上"能测"。</p></div>
<div class="cp-hud"><span class="hp brand">发小明 · 属性关联</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">槽位 <b data-filled>0</b>/4</span><span class="hp">材料 <b data-mcount>0</b></span></div>
<div class="cp-split">
  <div class="cp-stage d3-stage d3-stage-fill">
    <div class="cp-stage-label">ASSEMBLY · 点材料 → 点槽位</div>
    <div class="d3-held" data-held></div>
    <div class="d3-slots" data-slots></div>
    <div class="d3-draw cp-draw">
      <div class="cp-draw-tools" data-draw-tools>
        <button data-color="#FFE6D2" class="on" style="background:#FFE6D2" aria-label="浅色"></button>
        <button data-color="#FF9A5B" style="background:#FF9A5B" aria-label="橙色"></button>
        <button data-color="#4FE0D0" style="background:#4FE0D0" aria-label="青色"></button>
        <button data-color="#F7F2E6" style="background:#F7F2E6" aria-label="白色"></button>
        <button class="tsz" data-size="4">细</button>
        <button class="tsz on" data-size="8">中</button>
        <button class="tsz" data-size="14">粗</button>
        <button class="tsz" data-eraser>橡皮</button>
        <button class="tsz" data-undo>撤销</button>
        <button class="tsz" data-clear>清空</button>
        <span class="d3-drawtip">画一张草图：四个槽在哪、怎么连</span>
      </div>
      <div class="d3-cwrap"><canvas data-draw width="900" height="200"></canvas><div class="hintline">在这里画一张草图（俯视图 / 侧视图都行）</div></div>
    </div>
  </div>
  <div class="cp-side">
    <div class="cp-panel"><h4>材料 · 点一下拿起</h4><div class="d3-pickmats" data-tray></div></div>
    <div class="cp-panel d3-spec"><h4>规格表</h4>
      <div class="d3-spec-grid">
        <div class="cp-field"><label>它叫什么</label><input data-spec="name" maxlength="16" placeholder="例如：摸黑拖鞋灯"></div>
        <div class="cp-field"><label>给谁用</label><input data-spec="who" maxlength="16" placeholder="例如：爷爷"></div>
      </div>
      <div class="cp-field d3-how"><label>怎么工作（一句）</label><textarea data-spec="how" maxlength="60" placeholder="如果太暗，就亮起来，他不用找开关"></textarea></div>
    </div>
    <div class="cp-note" data-note></div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>去丑原型自测 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;
  S.slots=obj(S.slots);S.spec=obj(S.spec);
  S.mats=Array.isArray(S.mats)?S.mats.filter(id=>mat(id)):[];
  S.spec.name=S.spec.name||'';S.spec.who=S.spec.who||'';S.spec.how=S.spec.how||'';
  Object.keys(S.slots).forEach(k=>{if(!mat(S.slots[k]))delete S.slots[k];});
  if(!S._xp4){S._xp4=1;api.addXp(20);}
  let picked=null;
  const held=sec.querySelector('[data-held]'),slotBox=sec.querySelector('[data-slots]'),tray=sec.querySelector('[data-tray]');
  const filledHud=sec.querySelector('[data-filled]'),mcountHud=sec.querySelector('[data-mcount]');
  const note=sec.querySelector('[data-note]'),next=sec.querySelector('[data-next]'),xp=sec.querySelector('[data-xp]');

  const useCount=id=>SLOTS.filter(s=>S.slots[s.id]===id).length;

  /* 跨天：第 1 天选的人，预填"给谁用" */
  if(!S.spec.who){
    try{
      const d1=api.dayData(1)||{};
      const f1=(d1.evidence&&d1.evidence.fields)||[];
      const row=f1.find(x=>String(x.label||'').indexOf('我选的人')>=0);
      if(row&&row.value)S.spec.who=String(row.value).split('（')[0];
    }catch(e){}
  }

  function slotsHTML(){
    return SLOTS.map(s=>{
      const m=mat(S.slots[s.id]);
      return '<div class="d3-slot'+(m?' on':' empty')+(picked?' ready':'')+'" data-slot="'+s.id+'">'+
        '<div class="d3-slot-head"><span class="d3-slot-k">'+s.n+'</span>'+(m?'<button class="d3-slot-x" data-clear-slot="'+s.id+'" aria-label="清空这个槽">×</button>':'')+'</div>'+
        '<div class="d3-slot-ico">'+(m?m.e:s.e)+'</div>'+
        '<div class="d3-slot-name">'+(m?m.n:s.job)+'</div>'+
        '<div class="d3-slot-work">'+(m?('现在靠 <b>'+m.n+'</b> 工作：'+m.what):('这个槽要：'+s.job))+'</div>'+
        '<div class="d3-slot-tag">'+(m?(m.role+'材料'+(useCount(m.id)>1?(' · 用在 '+useCount(m.id)+' 个槽'):'')):'空槽')+'</div>'+
      '</div>';
    }).join('');
  }
  function trayHTML(){
    if(!S.mats.length)return '<span class="muted">还没拿材料。先回第 3 幕。</span>';
    return S.mats.map(id=>{
      const m=mat(id),u=useCount(id);
      return '<button class="d3-pickmat'+(picked===id?' on':'')+'" data-pickmat="'+id+'"><span>'+m.e+'</span><b>'+m.n+'</b><i>'+(u?('已用 '+u):m.role)+'</i></button>';
    }).join('');
  }
  function paintNote(){
    const filled=SLOTS.filter(s=>S.slots[s.id]).length;
    const missing=SLOTS.filter(s=>!S.slots[s.id]).map(s=>s.n).join(' / ');
    if(filled<4){note.innerHTML='<b>还差 '+(4-filled)+' 个槽：</b>'+missing+'。点右边材料，再点槽位放进去。';}
    else if(!S.spec.name||!S.spec.how){note.innerHTML='<b>四个槽都有东西了。</b>规格表还空着（名称 / 怎么工作）——第 6 幕的证据卡要用它。';}
    else{note.innerHTML='<b>可以往下走了：</b>指着每个槽，对同伴说一句"它靠什么工作"。说不清的槽，就是明天会坏的地方。';}
  }
  function paint(){
    if(picked&&!mat(picked))picked=null;
    slotBox.innerHTML=slotsHTML();
    tray.innerHTML=trayHTML();
    held.className='d3-held'+(picked?' on':'');
    held.innerHTML=picked?('手上：<b>'+mat(picked).e+' '+mat(picked).n+'</b> → 点一个槽放进去'):'手上没有材料 · 点右边一个材料拿起来';
    const filled=SLOTS.filter(s=>S.slots[s.id]).length;
    filledHud.textContent=filled;mcountHud.textContent=S.mats.length;
    paintNote();
    next.disabled=filled<4;
    xp.textContent=S.xp||0;
    bind();
  }
  function bind(){
    sec.querySelectorAll('[data-slot]').forEach(el=>{
      el.onclick=()=>{
        const sid=el.dataset.slot;
        if(picked){
          S.slots[sid]=picked;
          const m=mat(picked),sd=SLOTS.find(x=>x.id===sid);
          picked=null;api.save();api.sfx('pop');
          api.toast(m.n+' 放进「'+sd.n+'」','🧩');
          paint();
        }else if(S.slots[sid]){
          picked=S.slots[sid];delete S.slots[sid];api.save();api.sfx('tap');
          api.toast('拿回来了：点另一个槽放','✋');paint();
        }else{
          api.sfx('error');api.toast('先在右边点一个材料，再点这个槽','👆');
          el.classList.add('d3-shake');setTimeout(()=>el.classList.remove('d3-shake'),420);
        }
      };
    });
    sec.querySelectorAll('[data-clear-slot]').forEach(b=>b.onclick=e=>{
      e.stopPropagation();delete S.slots[b.dataset.clearSlot];api.save();api.sfx('tap');paint();
    });
    sec.querySelectorAll('[data-pickmat]').forEach(b=>b.onclick=()=>{
      const id=b.dataset.pickmat;
      if(picked===id){picked=null;api.sfx('tap');}
      else{picked=id;api.sfx('pop');api.toast('拿起了 '+mat(id).n+'，点一个槽','✋');}
      paint();
    });
  }

  sec.querySelectorAll('[data-spec]').forEach(el=>{
    el.value=S.spec[el.dataset.spec]||'';
    el.addEventListener('input',()=>{S.spec[el.dataset.spec]=el.value;api.save();paintNote();});
  });

  const draw=api.initDrawing(sec,url=>{S.draw=url;api.save();});
  if(draw&&S.draw)draw.load(S.draw);

  sec._d3paint=paint;
  next.onclick=()=>api.go(5);
  paint();
},onEnter(sec,api){
  const S=api.S;
  S.mats=Array.isArray(S.mats)?S.mats.filter(id=>mat(id)):[];
  const sl=obj(S.slots);
  Object.keys(sl).forEach(k=>{if(S.mats.indexOf(sl[k])<0)delete sl[k];});
  if(sec._d3paint)sec._d3paint();
}},

/* ---------- 05 ---------- */
{a:'05',name:'丑原型自测',time:'50 分',html:`
<div class="ch-head"><div class="act"><b>05</b><span>丑原型自测</span><i>允许失败，失败是数据</i></div><h2>先把它<em>弄坏一次</em>，再谈好不好</h2><p>三条只问"会不会坏"。勾"应该没事"不算试过——今天至少要记录 1 个真实问题，下一步才开。</p></div>
<div class="cp-hud"><span class="hp brand">发小明 · 盒内思考</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">判断 <b data-ans>0</b>/3</span><span class="hp">问题 <b data-prob>0</b></span><span class="hp">重测 <b data-retestcount>0</b></span></div>
<div class="cp-split">
  <div class="cp-stage d3-stage d3-stage-ugly">
    <div class="cp-stage-label">UGLY TEST · 先动手试，再回来勾</div>
    <div class="d3-proto">
      <div class="d3-proto-row" data-proto-row></div>
      <button class="btn ghost sm" data-shake>摇三下</button>
    </div>
    <div class="d3-fails">${FAILS.map(f=>`<div class="d3-fail" data-fail="${f.id}">
      <div class="d3-f-head"><span class="d3-f-e">${f.e}</span><div><b>${f.n}</b><i>${f.act} · ${f.q}</i></div></div>
      <div class="d3-f-opts">${JUDGES.map(j=>`<button data-f="${f.id}" data-v="${j.v}">${j.n}</button>`).join('')}</div>
    </div>`).join('')}</div>
    <div class="d3-logbox" data-logbox></div>
  </div>
  <div class="cp-side">
    <div class="cp-panel"><h4>自测记录</h4><div class="d3-found" data-found></div></div>
    <div class="cp-panel"><h4>只改一处</h4>
      <div class="d3-fix" data-fix>${FIXES.map(x=>`<button data-fixid="${x.id}">${x.n}</button>`).join('')}</div>
      <button class="btn ghost sm d3-retest" data-retest disabled>改完，再测一次</button>
    </div>
    <div class="cp-note" data-note></div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>今天就到这，做证据卡 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;
  S.diag=obj(S.diag);S.log=Array.isArray(S.log)?S.log.filter(id=>FAILS.some(f=>f.id===id)):[];
  S.fix=S.fix||'';S.retest=S.retest||0;
  if(!S._xp5){S._xp5=1;api.addXp(15);}
  const ansHud=sec.querySelector('[data-ans]'),probHud=sec.querySelector('[data-prob]'),retHud=sec.querySelector('[data-retestcount]');
  const found=sec.querySelector('[data-found]'),logbox=sec.querySelector('[data-logbox]'),note=sec.querySelector('[data-note]'),next=sec.querySelector('[data-next]');
  const retest=sec.querySelector('[data-retest]'),xp=sec.querySelector('[data-xp]');
  const protoRow=sec.querySelector('[data-proto-row]');

  function paint(){
    sec.querySelectorAll('[data-f]').forEach(b=>b.classList.toggle('on',S.diag[b.dataset.f]===b.dataset.v));
    sec.querySelectorAll('[data-fail]').forEach(el=>{
      const v=S.diag[el.dataset.fail];
      el.classList.toggle('bad',v==='bad');el.classList.toggle('fine',v==='fine');
    });
    sec.querySelectorAll('[data-fixid]').forEach(b=>b.classList.toggle('on',S.fix===b.dataset.fixid));
    const bad=FAILS.filter(f=>S.diag[f.id]==='bad');
    if(bad.length){
      found.innerHTML=bad.map(f=>'<div class="d3-prob"><b>'+f.e+' '+f.n+'</b><span>'+FIXHINT[f.id]+'</span></div>').join('');
    }else if(S.log.length){
      const names=FAILS.filter(f=>S.log.indexOf(f.id)>=0).map(f=>f.n).join('、');
      found.innerHTML='<div class="d3-prob ok"><b>✓ 已经记录过</b><span>'+names+'。你说现在改好了——把改的那一处写下来，明天还要再测一次。</span></div>';
    }else{
      found.innerHTML='<span class="muted">还没记录问题。先试，再判断。</span>';
    }
    const ans=FAILS.filter(f=>S.diag[f.id]).length;
    const fix=FIXES.find(x=>x.id===S.fix);
    ansHud.textContent=ans;probHud.textContent=S.log.length;retHud.textContent=S.retest;
    const names=FAILS.filter(f=>S.log.indexOf(f.id)>=0).map(f=>f.n).join(' / ');
    logbox.innerHTML=S.log.length
      ?('<b>第 1 次自测已记录</b> · 问题：'+names+' · 只改：'+(fix?fix.n:'还没定')+' · 重测 '+S.retest+' 次')
      :'<b>规则：</b>"应该没事"不是试过。至少记录 1 个真实问题，这一天才算有数据。';
    retest.disabled=!(S.log.length&&S.fix);
    if(ans<3){note.innerHTML='<b>还有 '+(3-ans)+' 条没判断。</b>先动手试一次，再回来选。';}
    else if(!S.log.length){note.innerHTML='<b>三条全绿，不算通过。</b>挑你最不放心的一条，真的试一下——"应该没事"不是试过。';}
    else if(!S.fix){note.innerHTML='<b>问题记下来了。</b>现在选"只改一处"：位置 / 连接 / 动力 / 提示，只改这一个。';}
    else if(!S.retest){note.innerHTML='<b>可以往下走了。</b>不过最好改完再测一次（点上面的按钮）——第 4 天要比较两次。';}
    else{note.innerHTML='<b>第 '+(S.retest+1)+' 次自测。</b>三条重新判断一遍：这次哪一条变了？';}
    next.disabled=!(ans===3&&S.log.length>0);
    xp.textContent=S.xp||0;
    paintProto(sec,S);
  }
  sec.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{
    const fid=b.dataset.f,v=b.dataset.v;
    S.diag[fid]=v;
    if(v==='bad'&&S.log.indexOf(fid)<0)S.log.push(fid);
    const ans=FAILS.filter(f=>S.diag[f.id]).length;
    if(ans===3&&!S.log.length){api.sfx('error');api.toast('三条全绿不算通过：至少试出 1 个问题','✋');}
    else if(v==='bad'){api.sfx('pop');api.toast('记下来了：这是数据，不是"你错了"','📌');}
    else api.sfx('tap');
    api.save();paint();
  });
  sec.querySelectorAll('[data-fixid]').forEach(b=>b.onclick=()=>{
    S.fix=(S.fix===b.dataset.fixid?'':b.dataset.fixid);api.save();api.sfx('tap');paint();
  });
  retest.onclick=()=>{
    if(!S.log.length||!S.fix)return;
    S.retest=(S.retest||0)+1;api.save();api.sfx('chime');
    api.toast('第 '+(S.retest+1)+' 次自测：只看你改的那一处','🔁');
    paint();
  };
  const shake=sec.querySelector('[data-shake]');
  if(shake)shake.onclick=()=>{
    protoRow.classList.remove('shaking');void protoRow.offsetWidth;protoRow.classList.add('shaking');
    api.sfx('whoosh');
    setTimeout(()=>{api.toast('看到了什么？去下面勾一条','👀');},700);
  };
  next.onclick=()=>{api.setEvidence(evidenceData(api));api.go(6);};
  paint();
},onEnter(sec,api){paintProto(sec,api.S||{});}},

/* ---------- 06 ---------- */
{a:'06',name:'今日证据卡',time:'45 分',build(sec,api){
  const ev=evidenceData(api);
  api.renderFinale(sec,{
    badge:{icon:'🛠️',name:'原型工人'},
    headline:'今天你手上，<em>有一个能坏的东西</em>',
    sub:'它不好看，但它能按一句规则动起来，还被别人摸过、试过。明天要做的，是让它坏得有数据。',
    journey:[{i:'📝',b:'规则卡',s:'如果…就…能被测'},{i:'📡',b:'提示通道',s:'主 + 备份'},{i:'📦',b:'材料盒',s:'只用盒里 5 样'},{i:'🧩',b:'四个槽',s:'主体/连接/动力/提示'}],
    reflect:['你的规则，别人不用解释就能看懂吗？','四个槽里，哪一个最不牢？你先改它吗？','今天那个问题，是"做不好"还是"还没试"？'],
    homework:{title:'家庭任务 · 让一个人试 30 秒',body:'把原型带回家（或拍张照片），让家里一个人按你的规则用 30 秒。只记一件事：他第一次卡在哪一步。'},
    quote:'“丑的原型不是失败，是<em>还没被改好</em>的证据。”',
    evidence(){return evidenceData(api);}
  });
  if(ev.drawing){const im=new Image();im.src=ev.drawing;}
}}
],

notes:[
{html:`<div class="note-block"><h4>今天的 3 个目标</h4><p>1）写出一句能演示的<b>规则</b>（如果…就…）；2）用盒子里的东西做出一个<b>能被摸到</b>的丑原型；3）至少<b>试出 1 个问题</b>，并决定只改一处。</p><p>今天不追求好看，追求"能坏"：能坏，才有明天可改的地方。</p><h4>大带小</h4><p>大孩子负责画线、剪硬纸板、写规格表；小孩子负责贴便签、递材料、当"第一个用户"说"我没看懂"。</p><div class="warn">常见跑偏：①想把原型做漂亮，一小时都在装饰；②越做越大，桌子放不下；③想加盒子外面的材料（手机、马达、乐高）。盒内思考规则要硬：<b>想加新的，先拿掉一样。</b></div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>把第 2 天的方向压成一句能演示的规则：条件只有一个，反应只有一个。</p><h4>关键提问</h4><ul><li>这个条件今天真的会发生吗？</li><li>它变的时候，隔两米的人看得见吗？</li><li>如果条件一直不出现，你怎么测？</li></ul><p><b>操作提示：</b>让每组把句子读给另一组听，对方复述一遍。复述不出来，就说明还没写具体。</p><div class="warn">混龄：大孩子读句子、把条件写进任务单；小孩子用手指"哪里亮、哪里响"，用身体演一遍。</div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>为规则选一个主提示通道 + 一个能装上去的备份通道，并说清代价。</p><h4>关键提问</h4><ul><li>这个通道在这间教室里能被看见 / 听见吗？</li><li>它的代价（耗电、吵人、难做）你们付得起吗？</li><li>主通道做不出来时，备份真的能顶上吗？</li></ul><p><b>操作提示：</b>让每组把主、备两个通道各画一个小图标，贴在任务单上；说不清代价的组，先做一次小实验（关灯 / 捂耳朵）。</p><div class="warn">混龄：大孩子比较代价、算材料；小孩子用身体演——捂耳朵、眯眼睛、隔着手套摸。</div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>按盒内思考盘点材料，最多 5 样，并说出每样"能干什么"。</p><h4>关键提问</h4><ul><li>这 5 样里，哪一样是"没有就做不成"的？</li><li>有没有两样其实干同一件事？</li><li>想加的东西，能替掉哪一样？</li></ul><h4>安全</h4><p>剪刀由老师保管，美工刀只由老师操作；气球不吹到脸上；橡皮筋不朝人弹。</p><p><b>操作提示：</b>先让每组把 12 样摊在桌上数一遍，再在屏幕上点选；屏幕上的数量要和桌上一致，多拿一样要放回去。</p><div class="warn">混龄：材料员可以由小孩子当（只负责清点、递），大孩子负责决定"拿掉哪一样"。</div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>把材料放进四个槽（主体 / 连接 / 动力 / 提示），并说清每个槽"靠什么工作"。</p><h4>关键提问</h4><ul><li>主体装得下吗？立得住吗？</li><li>连接靠什么固定，会松吗？</li><li>动力从哪来，力怎么传到需要的地方？</li><li>提示别人看得见吗，需要解释吗？</li></ul><p><b>操作提示：</b>屏幕只做结构，实体在桌上同步做。每放一个槽，让孩子用手比一次。</p><div class="warn">混龄：大孩子主刀（剪刀由老师保管），小孩子负责贴、画、当第一个用户。</div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>做一次允许失败的丑原型自测，至少记录 1 个真实问题，并决定"只改一处"。</p><h4>关键提问</h4><ul><li>你试的是"它会不会坏"，还是"你觉得它不会坏"？</li><li>这个问题是"做不好"，还是"还没试"？</li><li>只改一处，你改哪里？</li></ul><div class="warn"><b>教学硬规则：</b>三条全选"应该没事"不算通过，不允许全绿。孩子说"肯定没事"时，只回一句：<b>"摇三下给我看。"</b></div><p><b>操作提示：</b>先把三条读一遍，再动手；每条只许勾一个判断，改别人的判断前先问一句"你试过了吗"。</p><p>混龄：大孩子操作"摇三下"，小孩子当第一个用户，只说"我没看懂"。</p></div>`},
{html:`<div class="note-block"><h4>收尾 20 分钟</h4><p>1）每组下载证据卡（大屏演示一张）；2）发「原型工人」徽章；3）把原型贴上小组名，放到展示区；4）明日预告：<b>"明天测它，只改一处，再测一次。"</b></p><h4>教师复盘 3 问</h4><ul><li>哪一组真的试出了 1 个问题？</li><li>哪一组还停在"应该没事"？</li><li>哪一组的四个槽说不清"靠什么工作"？</li></ul><p>材料准备（第 4 天）：尺子 / 卷尺、计时器（手机）、3 张"用户"标签、便签、胶带补货；提醒孩子带第 3 天的原型。</p><div class="warn">混龄：收材料时，大孩子清点数量、写清单，小孩子负责分类放回盒子并贴标签——明天还要用同一个盒子。</div></div>`}
]};

window.FXM_DAYS=window.FXM_DAYS||{};
window.FXM_DAYS['3']=c;
})();
