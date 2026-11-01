/* =========================================================
   DAY 5 · 讲给世界    发小明 整合
   成长线展板（自动读 1–4 天）→ 一页纸 → 三分钟稿 → 彩排 → 发布 → 结营
   ========================================================= */
(function(){
'use strict';

const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- 读前四天的记录（整营"数据贯通"的地方） ---------- */
function evOf(api,n){const d=api.dayData(n);return (d&&d.evidence)||{};}
function fv(ev,key){
  if(!ev||!ev.fields)return '';
  for(const f of ev.fields){if(String(f.label||'').indexOf(key)>=0)return String(f.value||'');}
  return '';
}
function stripWho(s){s=String(s||'');const i=s.indexOf('：');return (i>0&&i<12)?s.slice(i+1):s;}
function nameOnly(s){return String(s||'').split(/（|\(/)[0].trim();}

/* ---------- 固定展位 / 简报字段 / 计时分段 / 徽章墙 ---------- */
const BOOTHS=[
 {k:'problem',no:'01',name:'问题',day:1,ask:'为谁？卡在哪？'},
 {k:'idea',no:'02',name:'办法',day:2,ask:'三个方向，留哪个？'},
 {k:'proto',no:'03',name:'原型',day:3,ask:'能拿在手上吗？'},
 {k:'test',no:'04',name:'测试',day:4,ask:'改一处，好多少？'},
 {k:'now',no:'05',name:'现在',day:5,ask:'今天讲什么？'}
];

const FIELDS=[
 {k:'who',no:'01',t:'为谁',ph:'例如：我爷爷，72 岁，一个人住'},
 {k:'problem',no:'02',t:'什么问题',ph:'他什么时候最难受？当时怎么办？'},
 {k:'tools',no:'03',t:'用了什么工具',ph:'减法 / 一专多能 / 乘法 / 单变量'},
 {k:'made',no:'04',t:'做出什么',ph:'一只脚一落地就亮的拖鞋灯'},
 {k:'tested',no:'05',t:'测出什么',ph:'第一次…只改一处…第二次…'},
 {k:'next',no:'06',t:'下一步',ph:'把灯调亮一点，再请 3 位邻居试一次'}
];

const SEGS=[
 {t:'0–40 秒',name:'开场',what:'我是谁 + 为谁',tip:'两句话就够，说慢一点。',prompt:'看着观众，先说出你们的名字，再指一下展板上的第 1 张卡。'},
 {t:'40–120 秒',name:'主体',what:'什么问题 + 怎么改 + 测出什么',tip:'每说一句，指一张卡。',prompt:'一个问题、一处改动、一次测试。这是全场最重要的 80 秒。'},
 {t:'120–180 秒',name:'收尾',what:'下一步 + 一句心里话',tip:'说完停 2 秒，等掌声。',prompt:'下一步要具体到「下周做什么」。最后留一句你自己想说的话。'}
];

const WALL=[
 {id:'observer',icon:'👁️',name:'观察员',d:1},
 {id:'idea',icon:'💡',name:'点子工程师',d:2},
 {id:'proto',icon:'🛠️',name:'原型工人',d:3},
 {id:'tester',icon:'📊',name:'测试员',d:4},
 {id:'inventor',icon:'🏅',name:'小小发明家',d:5}
];

/* ---------- 卡片：全部来自前四天，缺记录就写"待补" ---------- */
function cardsOf(api){
  const d1=evOf(api,1),d2=evOf(api,2),d3=evOf(api,3),d4=evOf(api,4);
  const rule=fv(d3,'规则'),fix=fv(d4,'改的那一处');
  return [
    {id:'d1',day:1,icon:'🔍',title:d1.title||'第 1 天 · 问题卡',short:d1.short||'待补',missing:!d1.short},
    {id:'d2',day:2,icon:'💡',title:d2.title||'第 2 天 · 方向卡',short:d2.short||'待补',missing:!d2.short},
    {id:'d3',day:3,icon:'🛠️',title:d3.title||'第 3 天 · 原型卡',short:d3.short||'待补',missing:!d3.short},
    {id:'d4',day:4,icon:'📊',title:d4.title||'第 4 天 · 测试记录',short:d4.short||'待补',missing:!d4.short},
    {id:'now',day:5,icon:'🎤',title:'第 5 天 · 我们的作品',
      short:fix?('改过一处：'+fix):(rule?('能演示：'+rule):'待补'),
      missing:!(fix||rule)}
  ];
}

/* ---------- 一页纸预填 ---------- */
function prefillOf(api){
  const d1=evOf(api,1),d3=evOf(api,3),d4=evOf(api,4);
  const fix=fv(d4,'改的那一处');
  return {
    who:fv(d1,'我选的人')||'',
    problem:stripWho(d1.short||''),
    tools:'减法 / 一专多能 / 乘法 / 单变量',
    made:d3.short||fv(d3,'规则')||'',
    tested:d4.short||[fv(d4,'第一次结果'),fv(d4,'第二次结果')].filter(Boolean).join(' → '),
    next:fix?('把「'+fix+'」再做一版，再请 3 个人试一次'):''
  };
}

/* ---------- 三分钟稿 ---------- */
function genScript(api){
  const S=api.S;
  const d1=evOf(api,1),d2=evOf(api,2),d3=evOf(api,3),d4=evOf(api,4);
  const b=(S&&S.brief)||{};
  const who=b.who||fv(d1,'我选的人')||'一位我们认识的人';
  const problem=b.problem||stripWho(d1.short||'');
  const cut=fv(d1,'拿掉的一步');
  const idea=d2.short||'';
  const made=b.made||d3.short||fv(d3,'规则')||'';
  const first=fv(d4,'第一次结果');
  const tested=b.tested||d4.short||'';
  const fix=fv(d4,'改的那一处');
  const second=fv(d4,'第二次结果');
  const next=b.next||'';
  const L=[];
  L.push('（一）我是谁');
  L.push('我们是「'+api.teamName()+'」。五天里，我们只做了一件事：为一个人，做一件东西。');
  L.push('（二）为谁');
  L.push('我们为'+who+'做。');
  L.push('（三）什么问题');
  L.push(problem||'他有一个每天都遇到的小麻烦：一件小事，每天都要多做一步。');
  L.push('（四）怎么改');
  if(cut)L.push('我们先做减法：'+cut+'。');
  else L.push('我们先做减法：拿掉一步，看他怎么绕过去。');
  L.push('想出来的办法是：'+(idea||'把两件事合成一件')+'。');
  L.push('我们真的做出来了：'+(made||'一个能拿在手上的丑原型')+'。');
  L.push('（五）测出什么');
  if(tested)L.push('测试记录：'+tested+'。');
  else{
    L.push('第一次测试：'+(first||'它不太听话，我们记下了三个问题')+'。');
    if(fix)L.push('后来我们只改了一处：'+fix+'。');
    else L.push('后来我们只改了一处：把最容易卡住的地方换了个位置。');
    L.push('第二次测试：'+(second||'比第一次好一点，他愿意再用一次')+'。');
  }
  L.push('（六）下一步');
  L.push(next||'再请 3 个人试一次，把最容易卡住的地方改掉。');
  L.push('（七）一句心里话');
  L.push('它不漂亮，但它真的帮到了一个人。');
  return L.join('\n');
}

/* ---------- 5 条证据线 ---------- */
function linesOf(api){
  const S=api.S||{};
  const arr=[evOf(api,1).short,evOf(api,2).short,evOf(api,3).short,evOf(api,4).short];
  const express=!!(S.fbShow&&(S.runs||0)>=1);
  arr.push(express?'ok':'');
  return arr.filter(Boolean).length;
}

/* ---------- 第 5 天证据（幕 5 跳转前 + 幕 6 结营共用） ---------- */
function dayEvidence(api){
  const S=api.S||{};
  const all=cardsOf(api);
  const ordered=BOOTHS.map(b=>{
    const id=S.board&&S.board[b.k];
    const card=all.find(x=>x.id===id);
    return b.name+'：'+(card?(card.missing?'待补':card.short):'空');
  });
  const placed=BOOTHS.filter(b=>S.board&&S.board[b.k]).length;
  const pct=S.energy||0;
  const lines=linesOf(api);
  return {
    title:'第 5 天 · 成长线展板',
    short:placed+' 张卡上板 · 掌声 '+pct+'% · 证据 '+lines+'/5',
    fields:[
      {label:'展板上的 5 个展位',value:ordered.join('／')},
      {label:'我为谁做的',value:(S.brief&&S.brief.who)||fv(evOf(api,1),'我选的人')||'—'},
      {label:'一页纸上的下一步',value:(S.brief&&S.brief.next)||'—'},
      {label:'彩排 / 正式发布',value:'彩排 '+(S.runs||0)+' 次，卡住 '+(S.stuck||0)+' 次，现场掌声 '+pct+'%'},
      {label:'观众反馈（彩排两条 + 发布一条）',value:'记住：'+(S.fb1||'—')+'／想知道：'+(S.fb2||'—')+'／发布时：'+(S.fbShow||'—')},
      {label:'证据完整度',value:lines+'/5 条线（问题 / 办法 / 原型 / 测试 / 表达）'}
    ],stamp:'结营'
  };
}

const DAY_TITLE='讲给世界';

const c={
no:'5',title:DAY_TITLE,kicker:'DAY 5 / 5 · SHOW',
line1:'讲给',line2:'世界听',
lead:'最后一天，不发明新东西。<br>把五天的证据摆成一条线，用 <b>3 分钟</b>讲清楚：你为谁做了什么，它 <b>真的被改好过</b>。',
tool:'整合',words:['证据','成长线','路演','掌声'],
meta:['6 幕 · 全天','混龄 7–13 大带小','一大一小一起上台'],
acc:'#FF7A6B',acc2:'#FFD9D3',rgb:'255,122,107',

acts:[
/* ---------- 01 ---------- */
{a:'01',name:'成长线展板',time:'45 分',html:`
<div class="ch-head"><div class="act"><b>01</b><span>成长线展板</span><i>自动读取第 1–4 天</i></div><h2>五天的证据，<em>摆成一条线</em></h2><p>前四天的记录已经自动放上桌，加上今天。点一张卡，再点一个展位——把「问题 → 办法 → 原型 → 测试 → 现在」排给观众看。</p></div>
<div class="cp-hud"><span class="hp brand">整合</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">上板 <b data-cnt>0</b>/5</span><span class="hp">读到 <b data-src>0</b>/4 天</span></div>
<div class="cp-split d5-fill">
  <div class="cp-stage d5-board">
    <div class="cp-stage-label">GROWTH BOARD · 点卡 → 点展位（再点一次取回）</div>
    <div class="d5-booths" data-booths></div>
    <div class="d5-tray">
      <div class="d5-trayhead"><b>未上板的卡</b><span data-traycnt>5</span><em>选一张，再点上面的展位</em></div>
      <div class="d5-traycards" data-tray></div>
    </div>
  </div>
  <div class="cp-side">
    <div class="cp-panel"><h4>前四天的记录</h4><div class="d5-src" data-srcbox></div></div>
    <div class="cp-panel"><h4>这张卡说的是</h4><div class="d5-info" data-info></div></div>
    <div class="cp-note" data-note><b>先点一张卡：</b>卡片左上角写着它来自第几天。</div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>写一页纸简报 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;
  if(!S.board||typeof S.board!=='object')S.board={};
  BOOTHS.forEach(b=>{if(typeof S.board[b.k]!=='string')S.board[b.k]='';});
  S.pick='';
  const boothsEl=sec.querySelector('[data-booths]'),trayEl=sec.querySelector('[data-tray]'),
        info=sec.querySelector('[data-info]'),note=sec.querySelector('[data-note]'),next=sec.querySelector('[data-next]'),
        cntEl=sec.querySelector('[data-cnt]'),srcEl=sec.querySelector('[data-src]'),trayCnt=sec.querySelector('[data-traycnt]'),
        srcBox=sec.querySelector('[data-srcbox]'),xpEl=sec.querySelector('[data-xp]');
  let CARDS=cardsOf(api);
  const rule=fv(evOf(api,3),'规则'),fix=fv(evOf(api,4),'改的那一处');
  const slotKeys=BOOTHS.map(b=>b.k);

  function slotOf(id){return slotKeys.find(k=>S.board[k]===id)||'';}
  function cardRows(card){
    if(card.id==='now')return [rule,fix].filter(Boolean).slice(0,2);
    const ev=evOf(api,card.day);
    return (ev.fields||[]).slice(0,2).map(f=>String(f.value||'')).filter(Boolean);
  }
  function cardHTML(card,inSlot){
    const rows=inSlot?cardRows(card):[];
    return '<button type="button" class="d5-card'+(inSlot?' in-slot':'')+(card.missing?' missing':'')+(S.pick===card.id?' sel':'')+'" data-cid="'+card.id+'">'
      +'<span class="d5-cc-top"><i>DAY '+card.day+'</i><em>'+card.icon+'</em></span>'
      +'<b>'+esc(card.title)+'</b>'
      +'<span class="d5-cc-short">'+esc(card.short)+'</span>'
      +(rows.length?'<div class="d5-cc-rows">'+rows.map(v=>'<div><span>'+esc(v)+'</span></div>').join('')+'</div>':'')
      +(card.missing?'<span class="d5-cc-miss">待补</span>':'')
      +(inSlot?'<span class="d5-cc-hint">再点取回</span>':'')
      +'</button>';
  }
  function paintInfo(){
    const id=S.pick;
    if(!id){
      info.innerHTML='<div class="d5-ih"><i>卡</i><b>点一张卡，看它来自哪天</b></div>'
        +'<p class="d5-ishort">卡片左上角写着 DAY 几。前四天没记录的，会写「待补」。</p>'
        +'<div class="d5-ikv"><div><b>提示</b><span>先点上板，再问一句：观众看得懂吗？</span></div></div>';
      return;
    }
    const card=CARDS.find(x=>x.id===id);if(!card)return;
    const day=card.id==='now'?5:card.day;
    const ev=day===5?{}:evOf(api,day);
    const rows=card.id==='now'
      ?[['能演示',rule||'—'],['改的那一处',fix||'—']]
      :(ev.fields||[]).slice(0,2).map(f=>[f.label,f.value]);
    info.innerHTML='<div class="d5-ih"><i>DAY '+day+'</i><b>'+esc(card.title)+'</b></div>'
      +'<p class="d5-ishort">'+esc(card.short)+'</p>'
      +(rows.length?'<div class="d5-ikv">'+rows.map(r=>'<div><b>'+esc(r[0])+'</b><span>'+esc(r[1])+'</span></div>').join('')+'</div>':'');
  }
  function paint(){
    CARDS=cardsOf(api);
    const placed=CARDS.filter(x=>slotOf(x.id));
    const n=placed.length;
    boothsEl.innerHTML=BOOTHS.map(b=>{
      const card=S.board[b.k]?CARDS.find(x=>x.id===S.board[b.k]):null;
      return '<div class="d5-booth'+(S.pick?' ready':'')+'" data-slot="'+b.k+'">'
        +'<div class="d5-node">'+b.no+'</div>'
        +'<div class="d5-bhead"><b>'+b.name+'</b><em>DAY '+b.day+'</em></div>'
        +'<div class="d5-bask">'+b.ask+'</div>'
        +'<div class="d5-bslot'+(card?' filled':'')+'">'+(card?cardHTML(card,true):'<span class="d5-empty">卡放这里</span>')+'</div>'
        +'</div>';
    }).join('');
    const left=CARDS.filter(x=>!slotOf(x.id));
    trayEl.innerHTML=left.length?left.map(x=>cardHTML(x,false)).join(''):'<div class="d5-traydone">5 张卡都上板了 ✓</div>';
    cntEl.textContent=n;trayCnt.textContent=left.length;
    const srcN=[1,2,3,4].filter(i=>evOf(api,i).short).length;
    srcEl.textContent=srcN;
    srcBox.innerHTML=[1,2,3,4].map(i=>{
      const ev=evOf(api,i);
      return '<div class="d5-srow'+(ev.short?' on':'')+'"><b>DAY '+i+'</b><span>'+esc(ev.short||'这天没有记录')+'</span><em class="'+(ev.short?'':'miss')+'">'+(ev.short?'✓':'待补')+'</em></div>';
    }).join('');
    const mismatch=BOOTHS.filter(b=>{
      const id=S.board[b.k];if(!id)return false;
      return id!==(b.k==='now'?'now':'d'+b.day);
    }).length;
    let nt='';
    if(n<4)nt='<b>还差 '+(4-n)+' 张：</b>把卡放上展位。至少 4 张才能开讲。';
    else if(srcN<4)nt='<b>能开讲了：</b>有 '+(4-srcN)+' 天没留下记录，卡上写着「待补」。讲的时候就说「那天我们还没测」，这也是证据。';
    else nt='<b>五天的证据齐了：</b>这张展板能自己讲故事。检查一下卡片上的 DAY 数字，从左到右排好了吗？';
    if(n>=4&&mismatch)nt+=' <span class="d5-warn">有 '+mismatch+' 张卡和展位顺序不一致，观众可能会看乱。</span>';
    note.innerHTML=nt;
    next.disabled=n<4;
    xpEl.textContent=S.xp||0;
    paintInfo();
  }
  function onCard(id){
    const slot=slotOf(id);
    if(S.pick===id){
      if(slot){S.board[slot]='';S.pick='';api.sfx('tap');api.toast('取回，卡回到下面','↩️');}
      else{S.pick='';api.sfx('tap');}
    }else{
      S.pick=id;api.sfx('tap');
      if(slot)api.toast('这张卡已上板，可以挪到别的展位','👆');
    }
    api.save();paint();
  }
  function onBooth(slot){
    const cur=S.board[slot]||'';
    if(!S.pick){
      if(cur){S.pick=cur;api.sfx('tap');paint();}
      else{api.sfx('error');api.toast('先点下面的一张卡','👆');}
      return;
    }
    const pick=S.pick,from=slotOf(pick);
    if(from===slot){S.pick='';api.sfx('tap');paint();return;}
    S.board[slot]=pick;
    if(from)S.board[from]=cur;
    S.pick='';
    api.sfx('pop');
    if(cur)api.toast('两张卡换了个位置','🔁');
    if(BOOTHS.filter(b=>S.board[b.k]).length===5)api.toast('5 张卡都上板了','🎉');
    api.save();paint();
  }
  boothsEl.addEventListener('click',e=>{
    const card=e.target.closest('[data-cid]');
    if(card){onCard(card.dataset.cid);return;}
    const booth=e.target.closest('[data-slot]');
    if(booth)onBooth(booth.dataset.slot);
  });
  trayEl.addEventListener('click',e=>{
    const card=e.target.closest('[data-cid]');
    if(card)onCard(card.dataset.cid);
  });
  paint();
  if(!S._xp1){S._xp1=1;api.addXp(15);}
  next.onclick=()=>api.go(2);
  api.aiPanel(sec,{prompts:['这 5 张卡里，哪一张最有力？','哪一张写着「待补」？讲的时候怎么补？','顺序换一下，哪一段观众会听不懂？']});
}},

/* ---------- 02 ---------- */
{a:'02',name:'一页纸简报',time:'45 分',html:`
<div class="ch-head"><div class="act"><b>02</b><span>一页纸简报</span><i>六个格子，一张纸</i></div><h2>一张纸，<em>讲清来路</em></h2><p>六个格子，把五天压到一张纸上。前四天的内容已经替你填好——但每一格都要换成你自己的话。</p></div>
<div class="cp-hud"><span class="hp brand">SHOW · 一页纸</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">写好 <b data-filled>0</b>/6</span><span class="hp">有我的话 <b data-edited>0</b> 格</span></div>
<div class="cp-split d5-fill">
  <div class="cp-stage d5-paper-wrap">
    <div class="cp-stage-label">ONE PAGER · 点格子就能改，自动保存</div>
    <div class="d5-paper">
      <div class="d5-phead">
        <div><span>GENESIS · CAMP · DAY 5</span><b>一页纸简报</b></div>
        <em data-team>小小发明家</em>
      </div>
      <div class="d5-pgrid" data-fields></div>
      <div class="d5-pfoot"><span>一大一小一起上台 · 各讲一半 · 3 分钟</span><i>发小明创新学院</i></div>
    </div>
  </div>
  <div class="cp-side">
    <div class="cp-panel"><h4>预填来源</h4><div class="d5-src" data-src></div>
      <div class="d5-pre"><button class="btn ghost sm" data-pre>↻ 补全空格</button><span>只补空着的格子</span></div></div>
    <div class="cp-panel"><h4>这张纸能带走</h4>
      <button class="btn sm d5-dl" data-dl>⬇ 下载一页纸 PNG</button>
      <div class="d5-phint">打印出来，上台拿在手里。</div></div>
    <div class="cp-note" data-note><b>提示：</b>六格都写满，再把至少一格改成你自己的话。</div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>写三分钟稿 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;
  if(!S.brief||typeof S.brief!=='object')S.brief={};
  if(!S.briefEdited||typeof S.briefEdited!=='object')S.briefEdited={};
  const grid=sec.querySelector('[data-fields]'),note=sec.querySelector('[data-note]'),next=sec.querySelector('[data-next]'),
        srcEl=sec.querySelector('[data-src]'),filledEl=sec.querySelector('[data-filled]'),editedEl=sec.querySelector('[data-edited]'),
        xpEl=sec.querySelector('[data-xp]'),teamEl=sec.querySelector('[data-team]');
  teamEl.textContent=api.teamName();

  function applyPrefill(overwrite){
    const p=prefillOf(api);let n=0;
    FIELDS.forEach(f=>{
      const cur=String(S.brief[f.k]||'').trim();
      if(!overwrite&&cur)return;
      if(p[f.k]&&p[f.k]!==cur){S.brief[f.k]=p[f.k];n++;}
    });
    if(n)api.save();
    return n;
  }
  if(!S.brief.who&&!S.brief.problem&&!S.brief.made&&!S.brief.tested)applyPrefill(true);

  grid.innerHTML=FIELDS.map(f=>'<div class="d5-pf" data-k="'+f.k+'">'
    +'<label><i>'+f.no+'</i>'+f.t+'<em class="d5-ck">✓</em></label>'
    +'<textarea data-f="'+f.k+'" rows="2" maxlength="120" placeholder="'+esc(f.ph)+'"></textarea>'
    +'</div>').join('');
  function renderValues(){
    FIELDS.forEach(f=>{
      const ta=grid.querySelector('[data-f="'+f.k+'"]');
      if(ta&&ta.value!==String(S.brief[f.k]||''))ta.value=String(S.brief[f.k]||'');
    });
  }
  function paint(){
    let filled=0;
    FIELDS.forEach(f=>{
      const ok=String(S.brief[f.k]||'').trim().length>=2;
      if(ok)filled++;
      const box=grid.querySelector('[data-k="'+f.k+'"]');
      if(box)box.classList.toggle('ok',ok);
    });
    const edited=Object.keys(S.briefEdited).length;
    filledEl.textContent=filled;editedEl.textContent=edited;
    srcEl.innerHTML=[1,2,3,4].map(i=>{
      const ev=evOf(api,i);
      return '<div class="d5-srow'+(ev.short?' on':'')+'"><b>DAY '+i+'</b><span>'+esc(ev.title||'暂无记录')+'</span><em class="'+(ev.short?'':'miss')+'">'+(ev.short?'✓':'待补')+'</em></div>';
    }).join('');
    const empty=FIELDS.filter(f=>String(S.brief[f.k]||'').trim().length<2);
    next.disabled=!(empty.length===0&&edited>0);
    if(empty.length)note.innerHTML='<b>还差 '+empty.length+' 格：</b>'+empty.map(f=>f.t).join('、')+'。每格至少写 2 个字。';
    else if(!edited)note.innerHTML='<b>一格都还没改：</b>把至少一格换成你自己的话。机器读出来的记录，得用你的口气讲。';
    else note.innerHTML='<b>可以了：</b>这张纸能带走上台。下载一份，打印出来拿在手里。';
    xpEl.textContent=S.xp||0;
  }
  grid.addEventListener('input',e=>{
    const ta=e.target.closest('[data-f]');if(!ta)return;
    const k=ta.dataset.f;
    S.brief[k]=ta.value;S.briefEdited[k]=1;
    api.save();paint();
  });
  sec.querySelector('[data-pre]').onclick=()=>{
    const n=applyPrefill(false);renderValues();paint();
    if(n){api.sfx('pop');api.toast('补上了 '+n+' 个空格','✨');}
    else{api.sfx('error');api.toast('没有空格要补','👀');}
  };
  sec.querySelector('[data-dl]').onclick=()=>{
    api.previewSheet({
      title:'第 5 天 · 一页纸简报',
      subtitle:'五天的来路，写在一张纸上',
      name:api.teamName(),
      code:'FXM-CAMP-D5-PAGER',
      stamp:'一页纸',
      footer:'发小明 5 天特训营 · 结营路演',
      fields:FIELDS.map(f=>({label:f.t,value:String(S.brief[f.k]||'').trim()||'—'}))
    });
  };
  renderValues();paint();
  if(!S._xp2){S._xp2=1;api.addXp(10);}
  next.onclick=()=>api.go(3);
  api.aiPanel(sec,{prompts:['这一格里，哪句话是别人说的原话？','把「大家」换成一个人的名字。','「测出什么」有没有两个数字？']});
}},

/* ---------- 03 ---------- */
{a:'03',name:'三分钟稿',time:'40 分',html:`
<div class="ch-head"><div class="act"><b>03</b><span>三分钟稿</span><i>生成 → 改 → 计时</i></div><h2>三分钟，<em>讲成一个故事</em></h2><p>顺序是固定的：我是谁 → 为谁 → 什么问题 → 怎么改 → 测出什么 → 下一步。先让页面写一版，再改成你说话的口气。</p></div>
<div class="cp-hud"><span class="hp brand">SHOW · 写稿</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">稿子 <b data-wc>0</b> 字</span><span class="hp">目标 <b>200+</b></span></div>
<div class="cp-split d5-fill">
  <div class="cp-stage d5-script-stage">
    <div class="cp-stage-label">SCRIPT · 生成后可以随便改</div>
    <div class="d5-shead"><b>我的三分钟稿</b><div><span class="d5-scrollhint">框内可滚动看全文</span><button class="btn ghost sm" data-gen>✨ 按前四天数据生成</button><span class="d5-save" data-save>自动保存</span></div></div>
    <textarea class="d5-textarea" data-script spellcheck="false" placeholder="点右上角生成，或直接开始写。"></textarea>
    <div class="d5-segs" data-segs></div>
    <div class="d5-seghint" data-hint></div>
  </div>
  <div class="cp-side">
    <div class="cp-panel d5-timer-panel" data-tpanel data-seg="0" data-timer>
      <h4>180 秒计时</h4>
      <div class="d5-tnum"><b data-timer-num>180</b><span>秒</span><em data-tstate>待开始</em></div>
      <div class="d5-tbar"><i data-timer-bar></i></div>
      <div class="d5-tbtns"><button class="btn primary sm" data-timer-start>开始 180 秒</button><button class="btn ghost sm" data-timer-reset>重置</button></div>
    </div>
    <div class="cp-note" data-note><b>先写满 200 字：</b>大约一分钟。讲满 3 分钟要 350 字左右。</div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>去彩排 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;
  if(!S.script)S.script=genScript(api);
  S.seg=typeof S.seg==='number'?S.seg:0;
  const ta=sec.querySelector('[data-script]'),segs=sec.querySelector('[data-segs]'),hint=sec.querySelector('[data-hint]'),
        wcEl=sec.querySelector('[data-wc]'),note=sec.querySelector('[data-note]'),next=sec.querySelector('[data-next]'),
        xpEl=sec.querySelector('[data-xp]'),saveEl=sec.querySelector('[data-save]'),tpanel=sec.querySelector('[data-tpanel]');
  ta.value=S.script;

  segs.innerHTML=SEGS.map((s,i)=>'<button type="button" class="d5-seg" data-seg="'+i+'">'
    +'<b>'+s.t+'</b><span>'+s.name+' · '+s.what+'</span><em>'+s.tip+'</em></button>').join('');

  function segHint(i){
    SEGS.forEach((s,k)=>{
      const b=segs.querySelector('[data-seg="'+k+'"]');
      if(b)b.classList.toggle('on',k===i);
    });
    const s=SEGS[i];
    hint.innerHTML='<b>'+s.t+' · '+s.name+'</b><span>'+s.prompt+'</span>';
  }
  function segState(el){
    const si=el>=120?2:(el>=40?1:0);
    tpanel.dataset.seg=String(si);
    SEGS.forEach((s,k)=>{
      const b=segs.querySelector('[data-seg="'+k+'"]');
      if(!b)return;
      b.classList.toggle('done',k<si);
      b.classList.toggle('on',k===si);
    });
    const s=SEGS[si];
    hint.innerHTML='<b>'+s.t+' · '+s.name+'</b><span>'+s.prompt+'</span>';
    return si;
  }
  function paint(){
    const n=S.script.replace(/\s/g,'').length;
    wcEl.textContent=n;
    next.disabled=n<200;
    if(n<200)note.innerHTML='<b>还差 '+(200-n)+' 字：</b>再补一句「他怎么用」或者「你改的是哪一处」。';
    else note.innerHTML='<b>可以了：</b>稿子 '+n+' 字。先读一遍，把读不顺的句子划掉——读不顺，讲也不顺。';
    xpEl.textContent=S.xp||0;
    saveEl.classList.add('on');saveEl.textContent='已保存';
    setTimeout(()=>{saveEl.classList.remove('on');saveEl.textContent='自动保存';},1400);
  }
  ta.addEventListener('input',()=>{
    S.script=ta.value;api.save();paint();
    segHint(S.seg);
  });
  sec.querySelector('[data-gen]').onclick=()=>{
    S.script=genScript(api);ta.value=S.script;api.save();paint();
    api.sfx('chime');api.toast('按前四天的数据重写了一版','✨');
  };
  segs.addEventListener('click',e=>{
    const b=e.target.closest('[data-seg]');if(!b)return;
    S.seg=+b.dataset.seg;api.save();segHint(S.seg);api.sfx('tap');
  });
  api.timer(sec,{seconds:180,onTick:(left,total)=>{
    const el=Math.max(0,total-left);
    const si=segState(el);
    const st=sec.querySelector('[data-tstate]');
    if(st)st.textContent=left>=total?'待开始':(left>0?'进行中':'时间到');
    if(left>0&&left<total)S.seg=si;
  },onEnd:()=>{
    api.sfx('bell');api.toast('3 分钟到，讲完了吗？','⏰');
  }});
  paint();segState(0);
  if(!S._xp3){S._xp3=1;api.addXp(15);}
  next.onclick=()=>api.go(4);
  api.aiPanel(sec,{prompts:['第一句能不能更短？','「怎么改」这一段，能不能指着一张卡说？','哪一句是你自己的话，不是稿子里的？']});
}},

/* ---------- 04 ---------- */
{a:'04',name:'彩排',time:'40 分',html:`
<div class="ch-head"><div class="act"><b>04</b><span>彩排</span><i>卡住是正常的</i></div><h2>先彩排一次，<em>卡住也没关系</em></h2><p>180 秒，一大一小各讲一半。卡住的时候按「我卡住了」——它会告诉你从哪儿接下去。讲完请两位观众各说一句。</p></div>
<div class="cp-hud"><span class="hp brand">SHOW · 彩排</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">彩排 <b data-runs>0</b> 次</span><span class="hp">卡住 <b data-stuck>0</b> 次</span><span class="hp">反馈 <b data-fbn>0</b>/2</span></div>
<div class="cp-split d5-fill">
  <div class="cp-stage d5-rehearse">
    <div class="cp-stage-label">REHEARSAL · 一大一小，各讲一半</div>
    <div class="d5-rstage">
      <div class="d5-spot"></div>
      <div class="d5-rhead"><span>彩排台</span><em data-rstate>还没开始</em></div>
      <div class="d5-rtimer" data-timer>
        <div class="d5-rnum"><b data-timer-num>180</b><span>秒</span></div>
        <div class="d5-rbar"><i data-timer-bar></i></div>
        <div class="d5-rbtns"><button class="btn primary sm" data-timer-start>开始 180 秒</button><button class="btn ghost sm" data-timer-reset>重置</button></div>
      </div>
      <div class="d5-outline" data-outline></div>
      <div class="d5-rescue" data-rescue></div>
      <div class="d5-rbtns2">
        <button class="btn sm d5-stuckbtn" data-stuckbtn>🙋 我卡住了</button>
        <button class="btn primary sm" data-finish>✅ 讲完了，记这次彩排</button>
      </div>
    </div>
  </div>
  <div class="cp-side">
    <div class="cp-panel" data-fbpanel><h4>观众反馈 · 两条</h4>
      <div class="cp-field"><label>他记住了什么</label><textarea data-fb1 maxlength="60" placeholder="例如：他说他记住了那只袜子灯"></textarea></div>
      <div class="cp-field" style="margin-top:6px"><label>他还想知道什么</label><textarea data-fb2 maxlength="60" placeholder="例如：他想知道灯能亮多久"></textarea></div>
    </div>
    <div class="cp-note" data-note><b>先讲一次：</b>点「开始 180 秒」，讲完点「讲完了」。</div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>布置正式舞台 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;
  if(!S.script)S.script=genScript(api);
  S.runs=S.runs||0;S.stuck=S.stuck||0;S.fb1=S.fb1||'';S.fb2=S.fb2||'';
  const note=sec.querySelector('[data-note]'),next=sec.querySelector('[data-next]'),xpEl=sec.querySelector('[data-xp]'),
        runsEl=sec.querySelector('[data-runs]'),stuckEl=sec.querySelector('[data-stuck]'),fbnEl=sec.querySelector('[data-fbn]'),
        outline=sec.querySelector('[data-outline]'),rescue=sec.querySelector('[data-rescue]'),rstate=sec.querySelector('[data-rstate]'),
        fbPanel=sec.querySelector('[data-fbpanel]'),numEl=sec.querySelector('[data-timer-num]'),
        startBtn=sec.querySelector('[data-timer-start]'),fb1=sec.querySelector('[data-fb1]'),fb2=sec.querySelector('[data-fb2]');
  fb1.value=S.fb1;fb2.value=S.fb2;
  const TIPS=[
    '停 2 秒，喝一口水。看第 3 段的第一句，从那儿接着讲。',
    '说一句「我接着说」，然后指着展板第 3 张卡讲你改的那一处。',
    '想不起数字就说「大概」，别停下来找数字。',
    '把话筒放低一点，看一眼你的伙伴，让他接一句。'
  ];
  function segmentTexts(){
    const raw=String(S.script||'').split(/（[一二三四五六七]）/).filter(x=>x.trim());
    const groups=[[0,1],[2,3,4],[5,6]];
    return groups.map(g=>g.map(i=>raw[i]||'').join('\n').trim());
  }
  function paintOutline(){
    const texts=segmentTexts();
    outline.innerHTML=SEGS.map((s,i)=>{
      const tx=texts[i]||'';
      const n=tx.replace(/\s/g,'').length;
      return '<div class="d5-orow"><b>'+s.t+'</b><span>'+s.what+'</span><em>'+(n?n+' 字':'空')+'</em></div>';
    }).join('');
  }
  function finish(){
    const left=+numEl.textContent||0;
    if(left>=180){
      api.sfx('error');api.toast('先点「开始 180 秒」，讲一段再记','⏰');
      return;
    }
    if(startBtn.textContent==='暂停')startBtn.click();
    S.runs=(S.runs||0)+1;S.lastRun=Math.max(0,180-left);
    api.save();paint();
    api.sfx('success');api.toast('第 '+S.runs+' 次彩排记下了，用时 '+S.lastRun+' 秒','👏');
    api.burst(innerWidth*.4,innerHeight*.55,26,['#FF7A6B','#FFD9D3','#F5C451']);
    rstate.textContent='已记下第 '+S.runs+' 次';
    rescue.classList.remove('show');
  }
  function paint(){
    runsEl.textContent=S.runs;stuckEl.textContent=S.stuck;
    const fbN=(String(S.fb1).trim()?1:0)+(String(S.fb2).trim()?1:0);
    fbnEl.textContent=fbN;
    paintOutline();
    next.disabled=!(S.runs>=1&&fbN===2);
    fbPanel.classList.toggle('need',fbN<2);
    if(!S.runs&&fbN<2)note.innerHTML='<b>先讲一次：</b>点「开始 180 秒」，讲完点「讲完了」，再请两位观众各说一句。';
    else if(!S.runs)note.innerHTML='<b>还差一次彩排：</b>两条反馈有了，但还没「讲完了」。';
    else if(fbN<2)note.innerHTML='<b>还差 '+(2-fbN)+' 条反馈：</b>问观众两句——你记住了什么？你还想知道什么？';
    else note.innerHTML='<b>可以上台了：</b>彩排 '+S.runs+' 次，卡住 '+S.stuck+' 次。带着这两条反馈去正式发布。';
    xpEl.textContent=S.xp||0;
  }
  api.timer(sec,{seconds:180,onTick:(left,total)=>{
    if(left===total)rstate.textContent='还没开始';
    else if(left>0)rstate.textContent='正在讲 · 剩 '+left+' 秒';
    else rstate.textContent='时间到';
  },onEnd:()=>{finish();}});
  startBtn.addEventListener('click',()=>{rescue.classList.remove('show');});
  sec.querySelector('[data-stuckbtn]').onclick=()=>{
    S.stuck=(S.stuck||0)+1;api.save();
    if(startBtn.textContent==='暂停')startBtn.click();
    rescue.innerHTML='<b>🙋 我卡住了 · 第 '+S.stuck+' 次</b><p>'+TIPS[(S.stuck-1)%TIPS.length]+'</p>';
    rescue.classList.add('show');
    api.sfx('whoosh');paint();
  };
  sec.querySelector('[data-finish]').onclick=finish;
  fb1.addEventListener('input',()=>{S.fb1=fb1.value;api.save();paint();});
  fb2.addEventListener('input',()=>{S.fb2=fb2.value;api.save();paint();});
  paint();
  if(!S._xp4){S._xp4=1;api.addXp(15);}
  next.onclick=()=>api.go(5);
  api.aiPanel(sec,{prompts:['刚才卡住的那一秒，你本来想说什么？','哪一句观众有反应？','如果只留两分钟，你删哪一段？']});
}},

/* ---------- 05 ---------- */
{a:'05',name:'正式发布',time:'40 分',html:`
<div class="ch-head"><div class="act"><b>05</b><span>正式发布</span><i>灯打开，鼓掌</i></div><h2>今天，<em>站在灯下面</em></h2><p>展板立在旁边，一页纸拿在手里。点 👏 攒掌声，讲完记下观众说的那一句。</p></div>
<div class="cp-hud"><span class="hp brand">SHOW · 发布</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">掌声 <b data-pct>0%</b></span><span class="hp">反馈 <b data-fbn>0</b>/1</span></div>
<div class="cp-split d5-fill">
  <div class="cp-stage d5-show">
    <div class="d5-curtain"></div>
    <div class="d5-show-stage">
      <div class="d5-showtop"><span>SHOW TIME · 结营路演</span><em data-clock>180 秒</em></div>
      <div class="d5-beam"></div>
      <div class="d5-showmid">
        <div class="d5-mic">🎤</div>
        <b class="d5-showname" data-showname>小小发明家</b>
        <span class="d5-tagline" data-tagline>为一个人发明一件东西</span>
      </div>
      <div class="d5-applause">
        <button type="button" class="d5-clap" data-clap aria-label="给掌声">👏<span>点我给掌声</span></button>
        <div class="d5-energy">
          <div class="d5-ebar"><i data-ebar></i></div>
          <div class="d5-emeta"><span>掌声能量</span><b data-pct2>0%</b></div>
        </div>
      </div>
      <div class="d5-seats" data-seats><span>🙂</span><span>😀</span><span>👏</span><span>😮</span><span>🤩</span></div>
      <div class="d5-floats" data-floats></div>
    </div>
  </div>
  <div class="cp-side">
    <div class="cp-panel d5-timer-panel" data-tpanel data-seg="2" data-timer>
      <h4>180 秒计时</h4>
      <div class="d5-tnum"><b data-timer-num>180</b><span>秒</span><em data-tstate>待开始</em></div>
      <div class="d5-tbar"><i data-timer-bar></i></div>
      <div class="d5-tbtns"><button class="btn primary sm" data-timer-start>开始 180 秒</button><button class="btn ghost sm" data-timer-reset>重置</button></div>
    </div>
    <div class="cp-panel"><h4>观众反馈 · 一条</h4>
      <div class="cp-field"><label>他说的一句话</label><textarea data-fb maxlength="70" placeholder="例如：他说想给他爸爸也做一个"></textarea></div>
    </div>
    <div class="cp-note" data-note><b>先攒掌声：</b>掌声到 60% 再记反馈。</div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>发布完成，去结营 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;
  S.energy=S.energy||0;S.claps=S.claps||0;S.fbShow=S.fbShow||'';
  const pctEl=sec.querySelector('[data-pct]'),pct2=sec.querySelector('[data-pct2]'),bar=sec.querySelector('[data-ebar]'),
        seats=sec.querySelector('[data-seats]'),note=sec.querySelector('[data-note]'),next=sec.querySelector('[data-next]'),
        xpEl=sec.querySelector('[data-xp]'),fbnEl=sec.querySelector('[data-fbn]'),fb=sec.querySelector('[data-fb]'),
        floats=sec.querySelector('[data-floats]'),clock=sec.querySelector('[data-clock]'),clap=sec.querySelector('[data-clap]'),
        tpanel=sec.querySelector('[data-tpanel]');
  fb.value=S.fbShow;
  const who=nameOnly((S.brief&&S.brief.who)||'');
  sec.querySelector('[data-showname]').textContent=api.teamName();
  sec.querySelector('[data-tagline]').textContent=who?('为 '+who+' 做的一件东西'):'为一个人发明一件东西';
  function paint(){
    const pct=Math.max(0,Math.min(100,Math.round(S.energy||0)));
    pctEl.textContent=pct+'%';pct2.textContent=pct+'%';
    bar.style.width=pct+'%';
    Array.from(seats.children).forEach((sp,i)=>{
      sp.classList.toggle('on',pct>=(i+1)*20-8);
    });
    const hasFb=String(S.fbShow||'').trim().length>=2;
    fbnEl.textContent=hasFb?1:0;
    next.disabled=!(pct>=60&&hasFb);
    if(pct<60&&!hasFb)note.innerHTML='<b>还差掌声和一句话：</b>掌声到 60%，再记下观众说的那一句。';
    else if(pct<60)note.innerHTML='<b>掌声还差 '+(60-pct)+'%：</b>点右边的 👏，给台上的人一点能量。';
    else if(!hasFb)note.innerHTML='<b>还差一条反馈：</b>问观众一句「你记住了什么」，照他的话写下来。';
    else note.innerHTML='<b>可以收尾了：</b>掌声 '+pct+'%，还有观众的一句话。去结营，领这 5 天的证书。';
    xpEl.textContent=S.xp||0;
  }
  clap.addEventListener('click',()=>{
    S.energy=Math.min(100,(S.energy||0)+6+Math.floor(Math.random()*5));
    S.claps=(S.claps||0)+1;
    api.save();paint();
    api.sfx('coin');
    const f=document.createElement('i');
    f.textContent='👏';
    f.style.left=(12+Math.random()*70)+'%';
    f.style.fontSize=(14+Math.random()*13)+'px';
    floats.appendChild(f);
    setTimeout(()=>f.remove(),1200);
    clap.classList.remove('pop');void clap.offsetWidth;clap.classList.add('pop');
    if(S.energy>=100)api.confetti(40);
  });
  fb.addEventListener('input',()=>{S.fbShow=fb.value;api.save();paint();});
  api.timer(sec,{seconds:180,onTick:(left,total)=>{
    const el=Math.max(0,total-left);
    const si=el>=120?2:(el>=40?1:0);
    tpanel.dataset.seg=String(si);
    clock.textContent=left>0?left+' 秒':'时间到';
    const st=sec.querySelector('[data-tstate]');
    if(st)st.textContent=left>=total?'待开始':(left>0?'进行中':'时间到');
  },onEnd:()=>{api.sfx('bell');api.toast('3 分钟到，谢谢大家','🎉');}});
  paint();
  if(!S._xp5){S._xp5=1;api.addXp(15);}
  next.onclick=()=>{
    api.setEvidence(dayEvidence(api));
    api.sfx('success');api.confetti(110);
    setTimeout(()=>api.go(6),260);
  };
  api.aiPanel(sec,{prompts:['第一句话，你要看着谁说？','掌声最响的时候，你在讲哪一张卡？','观众问的那个问题，你会怎么答？']});
}},

/* ---------- 06 ---------- */
{a:'06',name:'结营',time:'45 分',build(sec,api){
  api.grantBadge('inventor','小小发明家');
  api.renderFinale(sec,{
    badge:{icon:'🏅',name:'小小发明家'},
    headline:'你们把一件事，<em>从头讲到了尾</em>',
    sub:'五天，从一个人的麻烦，走到一件能被测试、被讲清楚的东西。今天不是交作业，是把这段路讲给世界听。',
    journey:[
      {i:'🔍',b:'看见问题',s:'一个人 + 一个时刻'},
      {i:'💡',b:'想出办法',s:'三个方向留一个'},
      {i:'🛠️',b:'做出原型',s:'能拿在手上的丑东西'},
      {i:'📊',b:'测试迭代',s:'只改一处，再测一次'}
    ],
    reflect:[
      '五天里，哪一句别人说的话改变了你的做法？',
      '你的展板上，哪张卡最弱？上台时你怎么补？',
      '如果还有第 6 天，你只想改哪一处？'
    ],
    homework:{title:'家庭任务 · 给家里人讲一遍',body:'把展板和一页纸带回家，给家里人讲 3 分钟，请他在纸背面写一句「我还想知道什么」。'},
    quote:'“讲得清楚，不是因为嘴好，是因为<em>证据够</em>。”',
    evidence(){return dayEvidence(api);},
    cert:'growth'
  });
  const body=sec.querySelector('.ch-body');
  if(body){
    const lines=linesOf(api);
    const wall=document.createElement('div');
    wall.className='d5-wall';
    wall.innerHTML='<div class="d5-wallhead"><b>证据墙 · 5 条线</b><span>'+lines+'/5 有证据</span></div>'
      +'<div class="d5-badges">'+WALL.map((b,i)=>{
        const has=i<4?!!evOf(api,b.d).short:!!(api.S.fbShow&&(api.S.runs||0)>=1);
        return '<div class="d5-badge'+(has?' on':'')+'"><i>'+b.icon+'</i><b>'+b.name+'</b><em>'+b.d+'</em></div>';
      }).join('')+'</div>';
    const anchor=body.querySelector('.reflect');
    if(anchor)anchor.parentNode.insertBefore(wall,anchor);else (body.querySelector('.finale')||body).appendChild(wall);
  }
  setTimeout(()=>api.confetti(90),350);
}}
],

notes:[
{html:`<div class="note-block"><h4>今天的目标</h4><p>1）把 5 天的证据摆成一条线；2）用 3 分钟讲清一个人、一个麻烦、一次改动；3）一大一小一起上台，各讲一半。</p><p>今天不讲新工具。今天只做一件事：<b>把已经做过的事讲明白</b>。讲不清，通常是做得不够具体。</p><h4>大带小</h4><p>上台必须一大一小两个人。大孩子讲「问题 + 怎么改」，小孩子讲「为谁 + 测出什么」。</p><div class="warn">最常见的跑偏：孩子开始背稿、抢话、比谁讲得好。把注意力拉回证据：<b>「你这句话，有哪张卡支持？」</b></div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>把 5 张卡放上 5 个展位，形成一条观众能看懂的成长线。</p><h4>关键提问</h4><ul><li>这 5 张卡里，哪一张最有力？</li><li>哪一张写着「待补」？讲的时候怎么补？</li><li>顺序换一下，哪一段观众会听不懂？</li></ul><h4>大带小</h4><p>大孩子读卡片上的 DAY 和标题，小孩子决定卡放哪个展位。</p><div class="warn">不要替孩子把卡放好。放错也是一种证据：问一句「观众看得懂吗？」</div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>把五天压成一张纸：6 个格子都能用一句话说清。</p><h4>关键提问</h4><ul><li>这一格里，哪句话是别人说的原话？</li><li>能不能把「大家」换成一个人的名字？</li><li>「测出什么」有没有两个数字？</li></ul><h4>大带小</h4><p>大孩子负责写「什么问题 / 怎么改」，小孩子负责写「为谁 / 下一步」，写完互相念一遍。</p><div class="quote">六个格子不需要漂亮，只需要具体：一个名字、一个时刻、一处改动、两个结果。</div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>按固定顺序生成一版稿子，再改成自己说话的口气，用计时器试读。</p><h4>关键提问</h4><ul><li>第一句能不能更短？</li><li>「怎么改」这一段，能不能指着一张卡说？</li><li>哪一句是你自己的话，不是稿子里的？</li></ul><h4>大带小</h4><p>大孩子管计时、删句子；小孩子练开头两句，练到不用看稿。</p><div class="warn">3 分钟大约 350 字。稿子超过 450 字一定超时——先删，再练。</div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>至少完整彩排一次：180 秒、一大一小、卡住能接上、收两条观众反馈。</p><h4>关键提问</h4><ul><li>刚才卡住的那一秒，你本来想说什么？</li><li>哪一句观众有反应？</li><li>如果只留两分钟，你删哪一段？</li></ul><h4>大带小</h4><p>一人讲一半，卡住时另一个人接一句，不要停下来互相看。</p><div class="quote">「我卡住了」不是失败，是彩排里最值钱的一秒：它告诉你哪一段还没真的懂。</div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>完成正式发布：灯亮、计时、掌声、一条真实反馈。</p><h4>关键提问</h4><ul><li>第一句话，你要看着谁说？</li><li>掌声最响的时候，你在讲哪一张卡？</li><li>观众问的那个问题，你会怎么答？</li></ul><h4>大带小</h4><p>小孩子先说第一段（为谁），大孩子收尾（下一步）。中间由大孩子递话筒、指展板。</p><div class="warn">不要催「快点讲完」。允许有一组超时——超时也是当天要复盘的证据。</div></div>`},
{html:`<div class="note-block"><h4>收尾 20 分钟</h4><p>1）点「下载结营证书」，每组一张，读一遍 5 条证据线；2）贴徽章墙，一大一小互相说一句「我记住你哪一句」；3）家长参观：展板 + 一页纸 + 原型摆在桌上，孩子站着讲。</p><h4>教师复盘 3 问</h4><ul><li>有几组能不看稿讲满 3 分钟？</li><li>有几组在台上回应了观众的一条反馈？</li><li>哪一组还在说「很厉害」「很好用」，而说不出一个具体时刻？</li></ul><p>材料准备：把 5 天的证据卡装订成一本、证书打印、展板留在教室一周；把每组的「下一步」写在便签上，贴在门口。</p></div>`}
]};

window.FXM_DAYS=window.FXM_DAYS||{};
window.FXM_DAYS['5']=c;
})();
