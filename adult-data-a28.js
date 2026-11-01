/* A28 · 属性关联：实战与伪相关 */
(function(){
'use strict';
const IMG={magnum:'assets-cases-a28-magnum.jpg'};
const VERD={ok:'真依存',pseudo:'伪相关',cond:'看条件'};
const REASONS=[{id:'mech',t:'有机制'},{id:'common',t:'共同原因'},{id:'unmeasure',t:'测不到/测不准'},{id:'nodrive',t:'不驱动'}];
const RL={mech:'有机制',common:'共同原因',unmeasure:'测不到/测不准',nodrive:'不驱动'};

/* 8 条依存提案：真依存 ok / 伪相关 pseudo / 看条件 cond；u = 参考理由 */
const CASES=[
 {id:'c1',no:'01',t:'天气热 → 冷饮涨价',r:'ok',u:'mech',
  why:'气温测得到，需求随温度走，价格当天就能改。一个变量动，另一个跟着动，方向稳定——这是能上线的依存。',
  adv:'同类：啤酒每 7 分钟按当下销量重排一次价目表。'},
 {id:'c2',no:'02',t:'用户步数 → 推荐运动量',r:'ok',u:'mech',
  why:'步数手机就能读。今天走得多，晚上推的就该是拉伸和恢复，不是再加一组。',
  adv:'方向必须写反：步数越高，推荐的运动量越低。方向写反，依存就成了惩罚。'},
 {id:'c3',no:'03',t:'手机电量 → 推荐阅读时长',r:'pseudo',u:'nodrive',
  why:'电量能测，但电量不决定用户想读多久。低电量该做的是省电——降码率、提前缓存，不是换一批内容。',
  adv:'用设备状态冒充用户意图，用户会觉得"这产品在替我决定该看什么"。'},
 {id:'c4',no:'04',t:'气温 → 羽绒服折扣',r:'ok',u:'mech',
  why:'降温，需求起来，折扣收；回暖，库存压着，折扣放。一条能被验证、也能被执行的规则。',
  adv:'难点不在判定，在阈值：几度开始收折扣，要拿去年同期销量定。'},
 {id:'c5',no:'05',t:'通话时长 → 套餐推荐',r:'cond',u:'nodrive',
  why:'时长是一个总数，分不清主叫被叫、是不是亲情号、有没有走网络电话。600 分钟全打给家里人，38 元套餐就够。',
  adv:'看条件：能拆到"计费分钟构成"，这条才成立；只有总时长，推大套餐就是猜。'},
 {id:'c6',no:'06',t:'年龄 → 字体大小',r:'ok',u:'mech',
  why:'老花随年龄加深，字号随老花放大。年龄在注册信息里就有，动作只有字号和行距两个旋钮。',
  adv:'本节最干净的一条：测得到、有机制、用户不用动手。'},
 {id:'c7',no:'07',t:'浏览时长 → 用户满意度',r:'pseudo',u:'nodrive',
  why:'找不到东西也会逛很久；满意的人看到要的东西，20 秒就走。时长是结果的影子，不是满意的原因。',
  adv:'拿时长当满意去优化推荐，产品会学会"怎么让人多待"，而不是"怎么让人办成事"。'},
 {id:'c8',no:'08',t:'地点 → 广告内容',r:'cond',u:'unmeasure',
  why:'位置本身能测，但精度决定真假：到"是否在店内、停留多久"，位置和需求才连得上；只到城市级别，它只是一条噪声。',
  adv:'看条件：先问清定位精度是多少米，再决定这个变量能不能用。'}
];

/* 三条自检 */
const CHECKS=[
 {id:'meas',n:'①',t:'可测吗',s:'系统读得到这个变量吗，误差多大',
  bad:'测不到的变量不是变量。换一个系统真能读到的信号：计步、定位、下单时间、历史记录。',
  good:'可测。再补一句误差：误差大到会误判，就配第二条信号交叉验证。'},
 {id:'cause',n:'②',t:'有因果吗',s:'能说清"因为 A 变了，所以 B 必须变"吗',
  bad:'先把机制讲成一句话。讲不出机制，就回判断台，把它判成伪相关。',
  good:'有机制。再试反方向：变量往回走的时候，产品会怎么动？'},
 {id:'act',n:'③',t:'用户要动手吗',s:'切换是产品做的，还是用户做的',
  bad:'每次都要用户自己切，那这是设置项，不是依存。把切换交给产品。',
  good:'用户不用动手。这是依存和"设置"的分界线。'}
];

const L={
id:'A28',week:7,seq:28,title:'属性关联：实战与伪相关',
kicker:'WEEK 7 · 属性关联',tool:'ad',toolName:'属性关联',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>两条线一起涨，<em>不是一条拉动了另一条</em></h1>
<p>某地 12 个月：冰淇淋卖得越多，溺水的人越多。两条曲线几乎重合，相关系数 0.9 以上。这个"关系"错在哪？</p></div>
<div class="grid2" style="align-items:start;margin-bottom:10px">
  <div class="panel a28-cpanel">
    <div class="panel-h"><h4>12 个月，两条曲线</h4><span>示意</span></div>
    <div class="a28-lg"><i style="background:#D96C7A"></i>冰淇淋销量<i style="background:#7FB0D9"></i>溺水事件<span>各自换算成指数</span></div>
    <svg class="a28-chart" viewBox="0 0 640 206" role="img" aria-label="冰淇淋销量与溺水事件两条曲线在 7 月同时到顶">
      <line x1="34" y1="41" x2="620" y2="41" stroke="#1E2634"/>
      <line x1="34" y1="108.5" x2="620" y2="108.5" stroke="#1E2634" stroke-dasharray="3 4"/>
      <line x1="34" y1="176" x2="620" y2="176" stroke="#1E2634"/>
      <text x="8" y="44" fill="#4A5466" font-size="8">100</text>
      <text x="16" y="111.5" fill="#4A5466" font-size="8">50</text>
      <text x="22" y="179" fill="#4A5466" font-size="8">0</text>
      <line x1="353.6" y1="28" x2="353.6" y2="176" stroke="#5A6679" stroke-dasharray="3 4"/>
      <text x="348" y="19" fill="#8D97AA" font-size="9" text-anchor="end">7 月 · 同时到顶</text>
      <polyline points="34,160.8 87.3,158.1 140.5,150 193.8,131.1 247.1,98.7 300.4,58.2 353.6,42 406.9,48.8 460.2,90.6 513.5,128.4 566.7,152.7 620,159.5" fill="none" stroke="#D96C7A" stroke-width="1.6"/>
      <polyline points="34,167.9 87.3,165.2 140.5,159.8 193.8,140.9 247.1,113.9 300.4,76.1 353.6,57.2 406.9,68 460.2,116.6 513.5,149 566.7,163.9 620,166.6" fill="none" stroke="#7FB0D9" stroke-width="1.6"/>
      <circle cx="353.6" cy="42" r="2.6" fill="#D96C7A"/>
      <circle cx="353.6" cy="57.2" r="2.6" fill="#7FB0D9"/>
      <text x="34" y="194" fill="#4A5466" font-size="8" text-anchor="middle">1月</text>
      <text x="193.8" y="194" fill="#4A5466" font-size="8" text-anchor="middle">4月</text>
      <text x="353.6" y="194" fill="#4A5466" font-size="8" text-anchor="middle">7月</text>
      <text x="513.5" y="194" fill="#4A5466" font-size="8" text-anchor="middle">10月</text>
      <text x="620" y="194" fill="#4A5466" font-size="8" text-anchor="end">12月</text>
    </svg>
    <p class="small" style="margin-top:4px">纵轴不是同一个单位：两条线各自换成指数，才画得到一张图上。</p>
  </div>
  <div class="panel"><div class="panel-h"><h4>它错在哪</h4><span>单选</span></div>
    <div class="opts">
      <button class="opt" data-h="a"><span class="k">A</span><span><b>吃冰淇淋让人下水</b><span>冰淇淋是原因，溺水是结果</span></span></button>
      <button class="opt" data-h="b"><span class="k">B</span><span><b>天热同时推高了这两件事</b><span>有一个共同的第三变量</span></span></button>
      <button class="opt" data-h="c"><span class="k">C</span><span><b>样本太少，说明不了什么</b><span>多收几年数据就好了</span></span></button>
    </div>
  </div>
</div>
<div id="hookOut" class="a28-out"></div>
<div class="a28-teaser" id="hookTeaser">选完这一个，下面会出现同一根温度曲线的另一种用法。</div>
<div class="a28-bridge" id="hookBridge" hidden>
  <img src="${IMG.magnum}" alt="伦敦出租车车顶的 Magnum 冰淇淋广告" loading="lazy">
  <div>
    <div class="a28-bridge-h"><b>同一根温度曲线，这次绑对了</b><span>Magnum · 图：SIT 官方课程材料（已授权）</span></div>
    <p>Magnum 这轮投放只做一件事：<b>气温升到设定值，广告才出现</b>。它没有把"天热"当成解释销量的原因，而是把温度当成<b>可以绑上去的变量</b>——温度动，广告动。<br>同一根曲线，一个用来编因果，一个用来做产品。差别不在数据，在你怎么用它。</p>
  </div>
</div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#hookOut'),bridge=sec.querySelector('#hookBridge'),teaser=sec.querySelector('#hookTeaser');
  const TXT={
    b:'<b>对。</b>天热同时推高了冰淇淋销量和下水人数。两条线一起动，是因为第三条线——气温——在动。把气温固定住（只看同样热的日子），两者的关系基本就没了。<br><b>相关不等于因果</b>：0.9 这个数只说明两条线同向，不说明谁推动了谁。',
    a:'吃冰淇淋不会让人下水。它是"热"的伴生物：越热，买的人越多，下水的人也越多。两条线都是结果，不是原因。',
    c:'样本少会放大噪声，但这里的问题不是样本量。换成十年的数据，两条线还是会一起涨——因为背后站着同一个变量。'
  };
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',S.answers.hook===b.dataset.h));
    if(S.answers.hook){
      const ok=S.answers.hook==='b';
      out.innerHTML='<div class="panel" style="padding:10px 12px;border-color:'+(ok?'rgba(78,159,110,.4)':'rgba(216,154,60,.4)')+';background:'+(ok?'rgba(78,159,110,.07)':'rgba(216,154,60,.06)')+'">'+
        '<p class="small" style="font-size:11.5px;color:#B9C3D2">'+TXT[S.answers.hook]+'</p></div>';
      bridge.hidden=false;teaser.hidden=true;
    }else{bridge.hidden=true;teaser.hidden=false;}
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{S.answers.hook=b.dataset.h;api.save();paint();api.refresh();});
  paint();
},
hint(S){return S.answers.hook?'':'先选一个';},
gate(S){return !!S.answers.hook;}},

/* ---------- 2 概念 ---------- */
{id:'concept',name:'概念',short:'概念',kicker:'STEP 2 · 概念',
html:`
<div class="step-h"><h1>三种"看起来像依存"的关系</h1>
<p>属性关联难的不是想出组合，是把假的筛掉。假的有三类，每一类都有一条能当场问出口的判据。</p></div>
<div class="grid2 a28-cpt" style="margin-bottom:10px">
  <div class="panel"><div class="panel-h"><h4>三种伪依存</h4><span>各自的判据</span></div>
    <div class="stack">
      <div><div class="mono" style="font-size:9.5px;color:var(--acc)">① 共同原因</div>
        <p class="small" style="margin-top:2px">A 和 B 都由 C 决定：天热 → 冰淇淋、溺水。C 一动，两条线一起动。<br><b>判据：把 C 固定住，关系还在吗？</b></p></div>
      <div><div class="mono" style="font-size:9.5px;color:var(--acc)">② 只相关不驱动</div>
        <p class="small" style="margin-top:2px">同向出现，却说不出一条从 A 到 B 的机制：浏览时长涨，不等于满意涨——找不到东西也会逛很久。<br><b>判据：能说出"因为 A 变，所以 B 必须变"吗？</b></p></div>
      <div><div class="mono" style="font-size:9.5px;color:var(--acc)">③ 测得到但改不了</div>
        <p class="small" style="margin-top:2px">身高能测，改不了；心情改得了，测不到。绑上去只能变成贴标签。<br><b>判据：产品读得到吗？读到了能做什么动作？</b></p></div>
    </div></div>
  <div class="panel"><div class="panel-h"><h4>翻成三条自检</h4><span>三条全过才是真依存</span></div>
    <p class="small" style="line-height:1.9"><b>① 可测吗</b>　外部变量系统读得到，误差小到不会误判。<br>
    <b>② 有因果吗</b>　机制一句话说得清，方向稳定，反方向也解释得通。<br>
    <b>③ 用户要动手吗</b>　最好什么都不用做。要手动切换的，是设置，不是依存。</p>
    <div class="tag acc" style="margin-top:10px">三条里有一条不过，就先别做</div>
    <p class="small" style="margin-top:12px;line-height:1.75">更近的一次翻车：Google 流感趋势（2008–2015）拿搜索词预测就诊量，头几年很准。2012–13 流感季，它给出的就诊比例是疾控实际数字的两倍以上——媒体报道一多，搜索量就涨，看病的人没涨。搜索量和就诊量，都受"大家有多关注流感"影响。</p>
  </div>
</div>
<div class="panel a28-chk2"><div class="panel-h"><h4>检查一下</h4><span>单选</span></div>
  <div class="opts">
    <button class="opt" data-c="a"><span class="k">A</span><span><b>先算相关系数，越高越可信</b><span>0.8 以上就可以用</span></span></button>
    <button class="opt" data-c="b"><span class="k">B</span><span><b>先找有没有第三个变量同时决定它们</b><span>把共同原因固定住再看</span></span></button>
  </div></div>`,
init(sec,api){
  const S=api.S;
  function paint(){sec.querySelectorAll('[data-c]').forEach(b=>b.classList.toggle('on',S.answers.c2===b.dataset.c));}
  sec.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{S.answers.c2=b.dataset.c;api.save();paint();api.refresh();});
  paint();
},
hint(S){return S.answers.c2?'':'选一个你的判断';},
gate(S){return !!S.answers.c2;}},

/* ---------- 3 真伪判断台 ---------- */
{id:'judge',name:'真伪判断台',short:'判断',kicker:'STEP 3 · 真伪判断台',
html:`
<div class="step-h"><h1>八条提案：<em>真依存、伪相关，还是看条件</em></h1>
<p>先判它是哪一种，再标出理由——共同原因、测不到、还是不驱动。两个都选完，下面给解释。</p></div>
<div class="bench">
  <div class="bench-h"><b>DEPENDENCY · 真伪判断</b><span class="st" id="jSt">0 / 8</span></div>
  <div class="bench-b a28-bbench"><div class="a28-grid" id="jGrid"></div></div>
  <div class="a28-read" id="jRead"></div>
  <div class="bench-f"><span class="small" id="jSum">提示：判"看条件"的，必须说清看的是什么条件。</span><div style="flex:1"></div><button class="btn sm ghost" id="jReset">重来</button></div>
</div>`,
init(sec,api){
  const S=api.S;S.answers.judge=S.answers.judge||{};
  const grid=sec.querySelector('#jGrid'),st=sec.querySelector('#jSt'),
        read=sec.querySelector('#jRead'),sum=sec.querySelector('#jSum');
  let curId=null;
  const J=()=>S.answers.judge||{};
  function readHTML(){
    const c=CASES.find(x=>x.id===curId);
    if(!c)return '<div class="a28-empty">先判一个提案。判完再标理由，这里给解释。</div>';
    const v=J()[c.id]||{};
    if(!v.r)return '<div class="a28-empty">'+c.no+'　已清空判断。</div>';
    const hit=v.r===c.r;
    let h='<div class="a28-read-h"><b>'+c.no+'</b><span>参考：'+VERD[c.r]+' · '+RL[c.u]+'</span>'+
      (hit?'<i class="a28-ok">✓ 一致</i>':'<i class="a28-diff">△ 你判的是 '+VERD[v.r]+'</i>')+'</div>'+
      '<p>'+c.why+'</p>';
    if(v.u)h+='<p class="a28-adv"><b>'+(v.u===c.u?'理由一致。':'参考理由：'+RL[c.u]+'。')+'</b>'+c.adv+'</p>';
    else h+='<p class="a28-adv a28-wait">还没标理由：它属于哪一类？</p>';
    return h;
  }
  function paint(){
    grid.innerHTML=CASES.map(c=>{
      const v=J()[c.id]||{};
      return '<div class="a28-card'+(v.r?' done':'')+'" data-card="'+c.id+'">'+
        '<div class="a28-top"><span class="a28-no">'+c.no+'</span><span class="a28-p">'+c.t+'</span>'+
        (v.r?'<span class="a28-badge '+(v.r===c.r?'ok':'diff')+'">'+(v.r===c.r?'✓':'△')+'</span>':'')+'</div>'+
        '<div class="a28-r">'+['ok','pseudo','cond'].map(r=>'<button class="a28-rb'+(v.r===r?' on '+r:'')+'" data-r="'+r+'" data-id="'+c.id+'">'+VERD[r]+'</button>').join('')+'</div>'+
        '<div class="a28-rs"><span class="a28-rl">理由</span>'+(v.r?REASONS.map(x=>'<button class="a28-rc'+(v.u===x.id?' on':'')+'" data-u="'+x.id+'" data-id="'+c.id+'">'+x.t+'</button>').join(''):'<span class="a28-rwait">判完再标</span>')+'</div>'+
        '</div>';
    }).join('');
    grid.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{
      const id=b.dataset.id;J()[id]=J()[id]||{};
      J()[id].r=b.dataset.r;curId=id;api.save();paint();api.refresh();
      const el=grid.querySelector('.a28-card[data-card="'+id+'"]');if(el)el.scrollIntoView({block:'nearest'});
    });
    grid.querySelectorAll('[data-u]').forEach(b=>b.onclick=()=>{
      const id=b.dataset.id;J()[id]=J()[id]||{};
      J()[id].u=b.dataset.u;curId=id;api.save();paint();api.refresh();
      const el=grid.querySelector('.a28-card[data-card="'+id+'"]');if(el)el.scrollIntoView({block:'nearest'});
    });
    const vals=Object.values(J()).filter(v=>v&&v.r);
    const withU=vals.filter(v=>v.u).length;
    st.textContent='已判断 '+vals.length+' / 8';
    read.innerHTML=readHTML();
    if(vals.length>=8&&withU>=8){
      const g={ok:0,pseudo:0,cond:0};
      vals.forEach(v=>{g[v.r]=(g[v.r]||0)+1;});
      sum.innerHTML='8 / 8。你判了 '+g.ok+' 条真依存、'+g.pseudo+' 条伪相关、'+g.cond+' 条看条件。'+
        (g.pseudo?'伪相关很少自己暴露——它通常长得比真依存更像"有关系"。':'一条伪相关都没判出来，回去看第 3 和第 7 条。');
    }else{
      sum.textContent=vals.length<8?('还差 '+(8-vals.length)+' 条没判。'):('还有 '+(8-withU)+' 条没标理由。');
    }
  }
  sec.querySelector('#jReset').onclick=()=>{S.answers.judge={};curId=null;api.save();paint();api.refresh();};
  const ks=Object.keys(J()).filter(k=>J()[k]&&J()[k].r);
  if(ks.length)curId=ks[ks.length-1];
  paint();
},
hint(S){
  const v=Object.values(S.answers.judge||{}).filter(x=>x&&x.r);
  if(v.length<8)return '还差 '+(8-v.length)+' 条没判';
  const u=v.filter(x=>x.u).length;
  return u<8?'还有 '+(8-u)+' 条没标理由':'';},
gate(S){
  const v=Object.values(S.answers.judge||{}).filter(x=>x&&x.r);
  return v.length>=8&&v.filter(x=>x.u).length>=8;}},

/* ---------- 4 实战台 ---------- */
{id:'mine',name:'在你的事上',short:'实战',kicker:'STEP 4 · 实战台',
html:`
<div class="step-h"><h1>给你的产品，<em>写一条能上线的依存</em></h1>
<p>三个空各至少 8 个字。写完做三条自检——不过就改，改到三条全过才解锁。</p></div>
<div class="grid2 a28-mine" style="margin-bottom:10px">
  <div class="panel"><div class="panel-h"><h4>① 内部属性</h4><span>产品自己能变的</span></div>
    <div class="field"><input id="inner" maxlength="24" placeholder="例如：推荐内容的时长"></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">② 外部变量</h4><span>系统测得到的</span></div>
    <div class="field"><input id="outer" maxlength="24" placeholder="例如：用户今天已走的步数"></div>
  </div>
  <div class="panel"><div class="panel-h"><h4>③ 依存规则</h4><span>≥8 字，要有方向</span></div>
    <div class="field"><textarea id="rule" maxlength="70" placeholder="当外部变量变大时，内部属性怎么变——写清方向"></textarea></div>
    <p class="hint" id="ruleHint" style="margin-top:6px">写不出方向，就是还没想清。反方向也试一遍。</p>
  </div>
</div>
<div class="a28-selfs" id="selfs">
${CHECKS.map(c=>`<div class="a28-self" data-c="${c.id}">
  <div class="a28-q"><i>${c.n}</i><div><b>${c.t}</b><span>${c.s}</span></div></div>
  <div class="a28-yn">
    <button class="a28-y" data-c="${c.id}" data-v="1">过</button>
    <button class="a28-n" data-c="${c.id}" data-v="0">不过</button>
  </div>
  <p class="a28-why" data-w="${c.id}"></p>
</div>`).join('')}
</div>
<div class="a28-lock" id="lock">
  <div class="a28-lock-h"><b>解锁</b><span id="lockN">0 / 3</span></div>
  <div class="a28-bar"><i id="lockBar" style="width:0%"></i></div>
  <p id="lockMsg">三条自检全过，这一步才算完成。</p>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;a.checks=a.checks||{};
  const lock=sec.querySelector('#lock'),lockN=sec.querySelector('#lockN'),
        lockBar=sec.querySelector('#lockBar'),lockMsg=sec.querySelector('#lockMsg'),
        ruleHint=sec.querySelector('#ruleHint');
  const texts=['inner','outer','rule'];
  texts.forEach(k=>{const el=sec.querySelector('#'+k);el.value=a[k]||'';
    el.addEventListener('input',()=>{a[k]=el.value;api.save();paint();api.refresh();});});
  function paint(){
    let n=0;
    CHECKS.forEach(c=>{
      const row=sec.querySelector('.a28-self[data-c="'+c.id+'"]');
      const v=a.checks[c.id];
      row.classList.toggle('has',v!==undefined);
      row.classList.toggle('ok',v===1);
      row.classList.toggle('no',v===0);
      row.querySelector('.a28-y').classList.toggle('on',v===1);
      row.querySelector('.a28-n').classList.toggle('on',v===0);
      const w=row.querySelector('[data-w]');
      w.textContent=v===1?c.good:v===0?c.bad:'';
      w.className='a28-why'+(v===1?' ok':v===0?' no':'');
      if(v===1)n++;
    });
    const short=texts.filter(k=>(a[k]||'').length<8).length;
    const full=n>=3&&short===0;
    lock.classList.toggle('on',full);
    lockN.textContent=n+' / 3';
    lockBar.style.width=(n/3*100)+'%';
    lockMsg.textContent=full?'三条全过，可以进入提交。':
      short?('还有 '+short+' 个空没写够 8 字。'):
      ('还差 '+(3-n)+' 条自检——不过就改，改完再判。');
    ruleHint.textContent=(a.rule||'').length>=8?'方向已写清。再确认：反方向走的时候，产品会怎么动？':'写不出方向，就是还没想清。反方向也试一遍。';
  }
  sec.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{
    a.checks[b.dataset.c]=+b.dataset.v;api.save();paint();api.refresh();
  });
  paint();
},
hint(S){
  const a=S.answers;
  if((a.inner||'').length<8)return '内部属性没写够 8 字';
  if((a.outer||'').length<8)return '外部变量没写够 8 字';
  if((a.rule||'').length<8)return '依存规则没写够 8 字';
  const c=a.checks||{};
  if(c.meas!==1)return '自检① 可测吗：还没过';
  if(c.cause!==1)return '自检② 有因果吗：还没过';
  if(c.act!==1)return '自检③ 用户要动手吗：还没过';
  return '';},
gate(S){
  const a=S.answers,c=a.checks||{};
  return !!((a.inner||'').length>=8&&(a.outer||'').length>=8&&(a.rule||'').length>=8&&c.meas===1&&c.cause===1&&c.act===1);}},

/* ---------- 5 过滤与提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 过滤与提交',
html:`
<div class="step-h"><h1>两问之后，<em>再决定交不交</em></h1>
<p>这两问不是流程，是用来劝退的。答完还站得住，再交。</p></div>
<div class="grid2" style="align-items:start;margin-bottom:10px">
  <div id="cardSlot"></div>
  <div class="panel"><div class="panel-h"><h4>提交</h4><span id="subSt">未提交</span></div>
    <p class="small">提交后先跑一次 AI 评审：有用、可行、证据三个维度，各 5 分。不登录只存本机。</p>
    <div class="row" style="margin-top:10px"><button class="btn primary" id="subBtn">提交</button><button class="btn" id="export2">导出 PNG</button></div>
    <div class="hint" id="subHint" style="margin-top:8px">两问答完才能提交。</div></div>
</div>
<div class="grid2 a28-qbox" id="qBox">
  <div class="panel"><div class="panel-h"><h4>问一 · 测错代价</h4><span>单选</span></div>
    <div class="opts">
      <button class="opt" data-q1="a"><span class="k">A</span><span><b>低：推荐偏一点，用户察觉不到</b><span>错了也没人受伤</span></span></button>
      <button class="opt" data-q1="b"><span class="k">B</span><span><b>中：推错一次，用户要退一次、改一次</b><span>多一步操作</span></span></button>
      <button class="opt" data-q1="c"><span class="k">C</span><span><b>高：一次误判就伤人、伤钱、伤信任</b><span>不敢让它错</span></span></button>
    </div></div>
  <div class="panel"><div class="panel-h"><h4>问二 · 有没有更稳的替代变量</h4><span>单选</span></div>
    <div class="opts">
      <button class="opt" data-q2="a"><span class="k">A</span><span><b>有，我打算换成它</b><span>更慢或更贵，但更准</span></span></button>
      <button class="opt" data-q2="b"><span class="k">B</span><span><b>有，但代价太大，先用手上这个</b><span>先用，留后路</span></span></button>
      <button class="opt" data-q2="c"><span class="k">C</span><span><b>没有，这就是最稳的那个</b><span>已经到底了</span></span></button>
    </div>
    <div class="field a28-altbox" id="altBox" style="margin-top:8px;display:none"><label>换成什么</label>
      <input id="alt" maxlength="40" placeholder="例如：用下单时间代替点击热情"></div></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const slot=sec.querySelector('#cardSlot'),btn=sec.querySelector('#subBtn'),st=sec.querySelector('#subSt'),
        hint=sec.querySelector('#subHint'),altBox=sec.querySelector('#altBox'),alt=sec.querySelector('#alt');
  const Q1={a:'低：推荐偏一点',b:'中：用户多退一次',c:'高：一次误判就伤人'};
  const Q2={a:'有，换成它',b:'有，暂不换',c:'没有，就它'};
  const okGate=()=>!!(a.q1&&a.q2&&(a.q2!=='a'||(a.alt||'').length>=6));
  function paint(){
    const ck=a.checks||{};
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A28</span><span>依存卡</span></div>'+
      '<h5>'+api.esc(a.inner||'我的依存')+'</h5><div class="kv">'+
      [['外部变量',a.outer],['依存规则',a.rule],
       ['三条自检',(ck.meas===1?'可测 ':'')+(ck.cause===1?'有因果 ':'')+(ck.act===1?'用户不动手':'')],
       ['测错代价',Q1[a.q1]||''],['更稳的变量',(Q2[a.q2]||'')+(a.q2==='a'&&a.alt?'：'+a.alt:'')]]
      .map(r=>'<div><b>'+r[0]+'</b><span class="'+(r[1]?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+'</div></div>';
    sec.querySelectorAll('[data-q1]').forEach(b=>b.classList.toggle('on',a.q1===b.dataset.q1));
    sec.querySelectorAll('[data-q2]').forEach(b=>b.classList.toggle('on',a.q2===b.dataset.q2));
    altBox.style.display=a.q2==='a'?'':'none';
    alt.value=a.alt||'';
    st.textContent=S.submitted?'已提交':'未提交';
    btn.textContent=S.submitted?'已提交':'提交';
    btn.disabled=!!S.submitted;
    hint.textContent=okGate()?(S.submitted?'已提交，进入互评池。':'可以提交了。'):'两问答完才能提交。';
  }
  sec.querySelectorAll('[data-q1]').forEach(b=>b.onclick=()=>{a.q1=b.dataset.q1;api.save();paint();api.refresh();});
  sec.querySelectorAll('[data-q2]').forEach(b=>b.onclick=()=>{a.q2=b.dataset.q2;api.save();paint();api.refresh();});
  alt.addEventListener('input',()=>{a.alt=alt.value;api.save();paint();api.refresh();});
  btn.onclick=async()=>{
    if(!okGate()){api.toast('先把两问答完');return;}
    await api.submit();paint();
  };
  sec.querySelector('#export2').onclick=()=>api.exportCard();
  paint();
},
hint(S){const a=S.answers;
  if(!a.q1)return '先答第一问';
  if(!a.q2)return '再答第二问';
  if(a.q2==='a'&&(a.alt||'').length<6)return '写了要换，就写清换成什么';
  return '';},
gate(S){const a=S.answers;
  return !!(a.q1&&a.q2&&(a.q2!=='a'||(a.alt||'').length>=6));}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>属性关联到这里，<em>你手上多了一道筛</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 一起动，先找第三个</div><p class="small" style="margin-top:5px">两条线同时上下，多半是同一个变量在推。固定住它，关系常常就消失了。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 能测不等于该绑</div><p class="small" style="margin-top:5px">还要有机制、方向稳、用户不用动手。缺一条，就退回"设置项"。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 代价决定要不要更准</div><p class="small" style="margin-top:5px">测错只是推偏，可以用快的变量；一次误判就伤人，就得换更慢更准的。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A29</span></div>
<p class="small">A29 · 产品概念：两个工具叠加。单个工具给的是"一个改动"，产品概念要你把属性关联接到减法或除法上，做成一句话能讲清、一个人能记住的东西。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '这两条线一起动，第三个变量可能是什么？',
 '你测到的这个变量，用户自己能改吗？',
 '方向反过来的时候，产品会怎么错？',
 '测错一次，代价落在谁身上？',
 '有没有一个更慢、但更准的替代变量？'
]},

card(S){
  const a=S.answers||{},ck=a.checks||{};
  const Q1={a:'低：推荐偏一点',b:'中：用户多退一次',c:'高：一次误判就伤人'};
  const Q2={a:'有，换成它',b:'有，暂不换',c:'没有，就它'};
  return {title:'A28 · 依存卡',rows:[
    ['内部属性',a.inner||'—'],
    ['外部变量',a.outer||'—'],
    ['依存规则',a.rule||'—'],
    ['三条自检',(ck.meas===1?'✓可测':'✗可测')+' / '+(ck.cause===1?'✓有因果':'✗有因果')+' / '+(ck.act===1?'✓用户不动手':'✗要用户动手')],
    ['测错代价',Q1[a.q1]||'—'],
    ['更稳的变量',(Q2[a.q2]||'—')+(a.q2==='a'&&a.alt?'：'+a.alt:'')]
  ]};
},

notes:[
 {t:'本节目标',h:'把属性关联从"会写一条"推到"能判真假"：8 条提案里分出真依存、伪相关、看条件，再给自己的产品写一条过得了三道自检的规则。'},
 {t:'时间分配',h:'先猜 6′ · 概念 8′ · 真伪判断台 18′ · 实战台 9′ · 两问与提交 4′。判断台是本节重心，为赶进度压缩它，这节课就白上了。'},
 {t:'常见卡点',h:'判"看条件"时只说"要看情况"，不说看什么条件、到什么粒度算成立。另外不少人把"电量 → 内容"判成真依存——那是把设备状态当成了用户意图。'},
 {t:'直播怎么接',h:'先把 8 条的全班判断汇总，看第 3 条（电量 → 阅读时长）和第 7 条（时长 → 满意度）哪一条错得最多，现场只讲那一条。再请一位三条自检全过的学员，用 30 秒说服一个怀疑的人。'},
 {t:'和 A25–A27 的关系',h:'A25 学写一条，A26 学铺满再收，A27 看真实产品怎么绑，A28 只做一件事：把假的筛掉。案例库建议本段配一个 2020 后的对照案例，但官方素材截止 2017：本节用 Google 流感趋势（2008–2015）作反例、Magnum 只在天热时投广告作正例，讲师可在现场补一条最近的推荐或定价翻车新闻。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A28']=L;
})();
