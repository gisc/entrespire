/* A16 · 乘法：什么时候变成为难用户（边界课） */
(function(){
'use strict';
const IMG={yota:'assets-cases-a16-yota-back.jpg',wash:'assets-cases-a16-twinwash.jpg'};
const BURDEN=['用户','一线员工','维修','成本'];
const LAB={ok:'成立',burden:'变成负担',cond:'看条件'};

/* 8 个乘法提案：成立 / 变成负担 / 看条件；b = 负担落在谁身上 */
const CASES=[
 {id:'j1',no:'01',t:'医院同时开着窗口、自助机、手机 App 三条挂号通道',r:'burden',b:['用户','一线员工'],
  why:'新通道没有替掉旧通道。用户要先判断走哪条，导诊要解释三套规则；走错一次就多排一次队。',
  adv:'加一条通道，就关掉一条。否则新增的全是解释成本。'},
 {id:'j2',no:'02',t:'每间会议室墙上都再挂一块远程参会屏',r:'burden',b:['成本','维修'],
  why:'一间一年用不到五次，但每间都要买、要装、坏了没人报修；真要开远程会的人，还是抱着电脑进会议室。',
  adv:'按使用频率装，不按房间数装。'},
 {id:'j3',no:'03',t:'相机镜头同侧再加一块屏，自拍时能看见自己',r:'ok',b:['成本'],
  why:'复制了屏，改变的是位置，服务的是"自拍构图"这个新场景；代价只是一块小屏和一点结构。',
  adv:'负担小、场景硬，这类乘法最容易活下来。'},
 {id:'j4',no:'04',t:'儿童番茄酱瓶做成三个嘴，一次挤出三条',r:'cond',b:['用户','成本'],
  why:'孩子玩得开心，但三倍的酱、三倍的清理落在家长身上——用的人和买单的人不是同一个。',
  adv:'看谁买单：家长买，就要把"好清理"一起做进去。'},
 {id:'j5',no:'05',t:'一双鞋配五个可换鞋跟，通勤到宴会都覆盖',r:'cond',b:['用户','成本'],
  why:'一双鞋顶五双，但四个备用跟要收纳、会丢、换的时候要蹲下；一年换不到三次的人只会嫌多。',
  adv:'看频率：低频用户手里，复制件就是四个零件。'},
 {id:'j6',no:'06',t:'中控大屏之外，保留空调和双闪的实体键',r:'ok',b:['成本'],
  why:'复制的是"控制入口"，实体键服务的是"不用看就能操作"；多出来的是模具和线束，不是用户的动作。',
  adv:'安全相关的操作，负担宁可落在成本上，不要落在注意力上。'},
 {id:'j7',no:'07',t:'客服系统加一个 AI 入口，原来的工单入口照旧',r:'burden',b:['一线员工','用户'],
  why:'两个入口都开着，用户先被 AI 拦一道再转人工，一线要在两套话术之间切换，工单还常常重复。',
  adv:'AI 入口要么替掉旧入口，要么写清分流规则；两个都开，一线先崩。'},
 {id:'j8',no:'08',t:'洗衣机主滚筒下面加一只洗小件的小筒，做成选配',r:'ok',b:['用户','成本'],
  why:'小筒把"少量、分开洗"从第二次洗衣变成一次；代价是多 34 厘米高度和一笔加价，但买不买由用户自己定。',
  adv:'代价做成选配，不买的人就不用替它付钱。'}
];

const L={
id:'A16',week:4,seq:16,title:'乘法：什么时候变成为难用户',
kicker:'WEEK 4 · 乘法边界',tool:'mul',toolName:'乘法边界',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>多一块屏，<em>账单寄给了谁</em></h1>
<p>YotaPhone 2：正面彩屏，背面再加一块墨水屏。复制、改变、找新场景——三步它都做了，它还是没成为多数人的选择。这条乘法是在哪一步走错的？</p></div>
<div class="grid2" style="align-items:start;margin-bottom:10px">
  <figure class="case-card a16-fig" style="margin:0">
    <img src="${IMG.yota}" alt="YotaPhone 2 背面墨水屏" loading="lazy">
    <figcaption><b>YotaPhone 2 · 背面墨水屏</b><span>同一台机器，两块屏，两个用途　图：SIT 官方课程材料（已授权）</span></figcaption>
  </figure>
  <div class="panel"><div class="panel-h"><h4>它错在哪一步</h4><span>单选</span></div>
    <div class="opts">
      <button class="opt" data-h="a"><span class="k">A</span><span><b>不该复制</b><span>第二块屏本来就不该存在</span></span></button>
      <button class="opt" data-h="b"><span class="k">B</span><span><b>改了，但没有新场景</b><span>墨水屏和彩屏干的是同一件事</span></span></button>
      <button class="opt" data-h="c"><span class="k">C</span><span><b>两边都做了，但多数人不需要</b><span>动作全对，账没算平</span></span></button>
    </div>
    <div id="hookOut" style="margin-top:10px"></div></div>
</div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#hookOut');
  const TXT={
    c:'<b>对。</b>它复制了屏，也把第二块改成常亮省电的墨水屏——动作没问题。真正的负担不是"变厚变重"：8.95 毫米、144 克，比上一代还薄 1 毫米、轻 2 克。负担是 699 欧元的定价，和一块只有少数人天天用的屏。<br><b>负担不一定是物理的。</b>贵、要学、要多一步、要维护，都算。',
    a:'不是"不该复制"：第二块屏确实解决了"看长文时怕没电"。错在代价由所有人付，收益只归少数人。',
    b:'新场景其实找到了——读长文、看行程、锁屏常亮。问题是这个场景太窄，撑不起每个人多付的那 200 欧元。'
  };
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',S.answers.hook===b.dataset.h));
    if(S.answers.hook){
      const ok=S.answers.hook==='c';
      out.innerHTML='<div class="panel" style="padding:10px 12px;border-color:'+(ok?'rgba(78,159,110,.4)':'rgba(216,154,60,.4)')+';background:'+(ok?'rgba(78,159,110,.07)':'rgba(216,154,60,.06)')+'">'+
        '<p class="small" style="font-size:11.5px;color:#B9C3D2">'+TXT[S.answers.hook]+'</p></div>';
    }
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{S.answers.hook=b.dataset.h;api.save();paint();api.refresh();});
  paint();
},
hint(S){return S.answers.hook?'':'先选一个';},
gate(S){return !!S.answers.hook;}},

/* ---------- 2 概念 ---------- */
{id:'concept',name:'概念',short:'概念',kicker:'STEP 2 · 概念',
html:`
<div class="step-h"><h1>乘法加的不是零件，<em>是一笔要有人付的账</em></h1>
<p>复制本身不产生负担。负担来自复制件的成本，和它要求别人多做的那一步。三条边界，缺一条就会开始为难用户。</p></div>
<div class="grid2" style="margin-bottom:10px">
  <div class="panel"><div class="panel-h"><h4>三条边界</h4><span>缺一条就别做</span></div>
    <div class="stack">
      <div><div class="mono" style="font-size:9.5px;color:var(--acc)">① 服务不同场景</div><p class="small" style="margin-top:3px">复制件要和原件干不同的事。干同一件事，就是加价加重量。</p></div>
      <div><div class="mono" style="font-size:9.5px;color:var(--acc)">② 代价不转给不需要它的人</div><p class="small" style="margin-top:3px">更重、更贵、更复杂，要么由受益者承担，要么做成可选。</p></div>
      <div><div class="mono" style="font-size:9.5px;color:var(--acc)">③ 两个都得有人用</div><p class="small" style="margin-top:3px">一件常年闲置，就不是乘法，是库存。</p></div>
    </div></div>
  <div class="panel"><div class="panel-h"><h4>什么时候别用</h4><span>三条红线</span></div>
    <p class="small" style="line-height:1.85">· 两个件服务同一批人、同一个场景<br>
    · 受益的人不到一成，代价却由所有人承担<br>
    · 多出来的东西要求用户多学一步、多做一步，而这一步省不掉</p>
    <div class="tag acc" style="margin-top:9px">一句话：做不到"多出来的那个自己付账"，就先别做</div>
  </div>
</div>
<div class="a16-strip">
  <img src="${IMG.wash}" alt="LG Twin Wash 小筒" loading="lazy">
  <div>
    <div class="a16-strip-h"><b>同一个动作，两种命运</b><span>LG Twin Wash · 图：SIT 官方课程材料（已授权）</span></div>
    <p>小筒让机身高出 34 厘米、价格多出三四百美元——但它做成<b>选配</b>，不买的人不用替它付钱。背屏做成<b>标配</b>，每个买手机的人都在为它付钱。<br>差别不在技术，在<b>代价由谁承担</b>。</p>
  </div>
</div>
<div class="panel" style="margin-top:10px"><div class="panel-h"><h4>检查一下</h4><span>单选</span></div>
<div class="opts">
<button class="opt" data-c="a"><span class="k">A</span><span><b>只要复制件有用，代价可以由所有人一起承担</b><span>总量上划算就行</span></span></button>
<button class="opt" data-c="b"><span class="k">B</span><span><b>复制件的代价，应该由用得到它的人承担</b><span>用不上的，不该付</span></span></button>
</div></div>`,
init(sec,api){
  const S=api.S;
  function paint(){sec.querySelectorAll('[data-c]').forEach(b=>b.classList.toggle('on',S.answers.c2===b.dataset.c));}
  sec.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{S.answers.c2=b.dataset.c;api.save();paint();api.refresh();});
  paint();
},
hint(S){return S.answers.c2?'':'选一个你的判断';},
gate(S){return !!S.answers.c2;}},

/* ---------- 3 负担判断台 ---------- */
{id:'judge',name:'负担判断台',short:'判断',kicker:'STEP 3 · 负担判断台',
html:`
<div class="step-h"><h1>八个提案：<em>成立、变成负担，还是看条件</em></h1>
<p>先判它是哪一种，再标出负担落在谁身上——用户、一线员工、维修，还是成本。两个都选完才给解释。</p></div>
<div class="bench">
  <div class="bench-h"><b>BURDEN · 乘法负担判断</b><span class="st" id="jSt">0 / 8</span></div>
  <div class="bench-b a16-bbench"><div class="a16-grid" id="jGrid"></div></div>
  <div class="a16-read" id="jRead"></div>
  <div class="bench-f"><span class="small" id="jSum">提示：选"看条件"的，必须说清看的是什么条件。</span><div style="flex:1"></div><button class="btn sm ghost" id="jReset">重来</button></div>
</div>`,
init(sec,api){
  const S=api.S;S.answers.judge=S.answers.judge||{};
  const grid=sec.querySelector('#jGrid'),st=sec.querySelector('#jSt'),
        read=sec.querySelector('#jRead'),sum=sec.querySelector('#jSum');
  let curId=null;
  const J=()=>S.answers.judge||{};
  function readHTML(){
    const c=CASES.find(x=>x.id===curId);
    if(!c) return '<div class="a16-empty">先判一个提案。判完再标负担落在谁身上，这里会给解释。</div>';
    const v=J()[c.id]||{};
    const bs=v.b||[];
    if(!v.r) return '<div class="a16-empty">'+c.no+'　已清空判断。</div>';
    const hit=v.r===c.r;
    let h='<div class="a16-read-h"><b>'+c.no+'</b><span>参考判断：'+LAB[c.r]+'</span>'+(hit?'<i class="a16-ok">✓ 一致</i>':'<i class="a16-diff">△ 你判的是 '+LAB[v.r]+'</i>')+'</div>'+
      '<p>'+c.why+'</p>';
    if(bs.length) h+='<p class="a16-adv"><b>负担在'+bs.join('、')+'身上。</b>'+c.adv+'</p>';
    else h+='<p class="a16-adv a16-wait">还没标负担：这份成本最后落在谁那里？</p>';
    return h;
  }
  function paint(){
    grid.innerHTML=CASES.map(c=>{
      const v=J()[c.id]||{},bs=v.b||[];
      return '<div class="a16-card'+(v.r?' done':'')+'" data-card="'+c.id+'">'+
        '<div class="a16-top"><span class="a16-no">'+c.no+'</span><span class="a16-p">'+c.t+'</span>'+
        (v.r?'<span class="a16-badge '+(v.r===c.r?'ok':'diff')+'">'+(v.r===c.r?'✓':'△')+'</span>':'')+'</div>'+
        '<div class="a16-r">'+['ok','burden','cond'].map(r=>'<button class="a16-rb'+(v.r===r?' on '+r:'')+'" data-r="'+r+'" data-id="'+c.id+'">'+LAB[r]+'</button>').join('')+'</div>'+
        (v.r?'<div class="a16-b"><span class="a16-bl">负担落在</span>'+BURDEN.map(bn=>'<button class="a16-bc'+(bs.indexOf(bn)>=0?' on':'')+'" data-b="'+bn+'" data-id="'+c.id+'">'+bn+'</button>').join('')+'</div>':'')+
        '</div>';
    }).join('');
    grid.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{
      const id=b.dataset.id;J()[id]=J()[id]||{};
      J()[id].r=b.dataset.r;curId=id;api.save();paint();api.refresh();
      const el=grid.querySelector('.a16-card[data-card="'+id+'"]');if(el)el.scrollIntoView({block:'nearest'});
    });
    grid.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{
      const id=b.dataset.id,val=b.dataset.b;J()[id]=J()[id]||{};
      const arr=J()[id].b||[];
      const i=arr.indexOf(val);
      if(i<0)arr.push(val);else arr.splice(i,1);
      J()[id].b=arr;curId=id;api.save();paint();api.refresh();
      const el=grid.querySelector('.a16-card[data-card="'+id+'"]');if(el)el.scrollIntoView({block:'nearest'});
    });
    const vals=Object.values(J()).filter(v=>v&&v.r);
    st.textContent=vals.length+' / 8';
    read.innerHTML=readHTML();
    const done=vals.filter(v=>(v.b||[]).length).length;
    if(done>=8){
      const u=Object.values(J()).filter(v=>(v.b||[]).indexOf('用户')>=0).length;
      sum.innerHTML='8 / 8。'+(u?('你把 '+u+' 个提案的负担标在"用户"身上。'):'')+'乘法的代价最安静：用户不会投诉重了 30 克，他们只是不再买。';
    }else{
      sum.textContent=vals.length<8?('还差 '+(8-vals.length)+' 个提案没判断。'):('还有 '+(8-done)+' 个没标负担落在谁身上。');
    }
  }
  sec.querySelector('#jReset').onclick=()=>{S.answers.judge={};curId=null;api.save();paint();api.refresh();};
  const ks=Object.keys(J()).filter(k=>J()[k]&&J()[k].r);
  if(ks.length)curId=ks[ks.length-1];
  paint();
},
hint(S){
  const v=Object.values(S.answers.judge||{}).filter(x=>x&&x.r);
  if(v.length<8)return '还差 '+(8-v.length)+' 个提案没判断';
  const b=v.filter(x=>(x.b||[]).length).length;
  return b<8?'还有 '+(8-b)+' 个没标负担':'';},
gate(S){
  const v=Object.values(S.answers.judge||{}).filter(x=>x&&x.r);
  return v.length>=8&&v.filter(x=>(x.b||[]).length).length>=8;}},

/* ---------- 4 负担体检 ---------- */
{id:'checkup',name:'负担体检',short:'体检',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>给你自己的乘法，<em>做一次负担体检</em></h1>
<p>用 A15 那条变体，或者现在想一个。要回答的只有三件事：多了什么、谁承担、用什么抵消。</p></div>
<div class="grid2" style="align-items:start">
  <div class="panel"><div class="panel-h"><h4>① 你的乘法</h4><span>≥6 字</span></div>
    <div class="field"><input id="mul" maxlength="48" placeholder="例如：售后工单系统再加一个客户自助查询入口"></div>
    <div class="row" style="margin-top:8px"><button class="btn sm ghost" id="pullA15">从 A15 带入</button><span class="hint" id="pullHint">A15 的变体会存在这台机器上</span></div>
    <div class="panel-h" style="margin:14px 0 6px"><h4 style="font-size:9.5px">② 多了什么</h4><span>可多选</span></div>
    <div class="chips a16-chips" id="more">${['重量','步骤','价格','学习成本','维护','空间'].map(x=>`<button class="chip" data-m="${x}">${x}</button>`).join('')}</div>
  </div>
  <div class="panel"><div class="panel-h"><h4>③ 谁承担</h4><span>可多选</span></div>
    <div class="chips a16-chips" id="who">${BURDEN.map(x=>`<button class="chip" data-w="${x}">${x}</button>`).join('')}</div>
    <div class="panel-h" style="margin:14px 0 6px"><h4 style="font-size:9.5px">④ 用什么抵消</h4><span>≥15 字</span></div>
    <div class="field"><textarea id="offset" maxlength="80" placeholder="写一个具体动作：做成选配、合并旧入口、自动带出信息……别写「加强引导」"></textarea></div>
    <div class="hint" id="offHint" style="margin-top:8px">抵消不是"提醒用户"，是让这份负担消失或变小。</div>
  </div>
</div>
<div class="a16-sum">
  <div class="a16-sum-h"><b>体检单</b><span>随填写更新</span></div>
  <div class="a16-sum-g">
    <div><b>多了</b><span id="sMore">—</span></div>
    <div><b>谁承担</b><span id="sWho">—</span></div>
    <div><b>抵消</b><span id="sOff">—</span></div>
  </div>
  <p class="a16-sum-v" id="sVerdict">三格填完，这里给一句判断。</p>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  a.more=a.more||[];a.who=a.who||[];
  const mul=sec.querySelector('#mul'),offset=sec.querySelector('#offset'),offHint=sec.querySelector('#offHint'),
        sMore=sec.querySelector('#sMore'),sWho=sec.querySelector('#sWho'),sOff=sec.querySelector('#sOff'),sVerdict=sec.querySelector('#sVerdict');
  mul.value=a.mul||'';offset.value=a.offset||'';
  function paint(){
    sec.querySelectorAll('[data-m]').forEach(b=>b.classList.toggle('on',a.more.indexOf(b.dataset.m)>=0));
    sec.querySelectorAll('[data-w]').forEach(b=>b.classList.toggle('on',a.who.indexOf(b.dataset.w)>=0));
    const n=(a.offset||'').length;
    if(!n)offHint.innerHTML='抵消不是"提醒用户"，是让这份负担消失或变小。';
    else if(n<15)offHint.innerHTML='还差 '+(15-n)+' 字。写清楚改哪一个部件、哪一步。';
    else if(a.who.indexOf('用户')>=0)offHint.innerHTML='<b>负担落在用户身上。</b>最后问一句：他能不能不选它？能，就做成选配；不能，就把它做小。';
    else offHint.innerHTML='<b>负担没落在用户身上。</b>再确认一次：一线员工每天要多做的那一步，算不算用户等的时间？';
    sMore.textContent=a.more.length?a.more.join('、'):'—';
    sWho.textContent=a.who.length?a.who.join('、'):'—';
    sOff.textContent=n>=15?a.offset:(n?('还差 '+(15-n)+' 字'):'—');
    if(n>=15&&a.who.length){
      sVerdict.textContent=a.who.indexOf('用户')>=0
        ?'负担压在用户身上。抵消方案是唯一的缓冲——抵消不了，就把它改成选配。'
        :'负担落在组织内部。用户感知不到，但它最后会以"更慢"和"更贵"回到用户身上。';
      sVerdict.className='a16-sum-v on';
    }else{
      sVerdict.textContent='三格填完，这里给一句判断。';
      sVerdict.className='a16-sum-v';
    }
  }
  mul.addEventListener('input',()=>{a.mul=mul.value;api.save();api.refresh();});
  offset.addEventListener('input',()=>{a.offset=offset.value;api.save();paint();api.refresh();});
  sec.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{
    const v=b.dataset.m,i=a.more.indexOf(v);if(i<0)a.more.push(v);else a.more.splice(i,1);
    api.save();paint();api.refresh();});
  sec.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{
    const v=b.dataset.w,i=a.who.indexOf(v);if(i<0)a.who.push(v);else a.who.splice(i,1);
    api.save();paint();api.refresh();});
  sec.querySelector('#pullA15').onclick=()=>{
    let t='';
    try{
      const r=JSON.parse(localStorage.getItem('fxm_adult_v1')||'null');
      const x=r&&r.lessons&&r.lessons.A15&&r.lessons.A15.answers;
      t=(x&&(x.formText||x.scene))||'';
    }catch(e){t='';}
    if(t){a.mul=t;mul.value=t;api.save();api.refresh();api.toast('已带入 A15 的变体');}
    else api.toast('这台机器上还没有 A15 的记录，直接写一个新的');
  };
  paint();
},
hint(S){const a=S.answers;
  if((a.mul||'').length<6)return '先写你的乘法是什么';
  if(!(a.more||[]).length)return '选至少一项"多了什么"';
  if(!(a.who||[]).length)return '选谁承担这份负担';
  if((a.offset||'').length<15)return '抵消方案没写够 15 字';
  return '';},
gate(S){const a=S.answers;
  return !!((a.mul||'').length>=6&&(a.more||[]).length&&(a.who||[]).length&&(a.offset||'').length>=15);}},

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
<div class="grid2 a16-qbox" id="qBox">
  <div class="panel"><div class="panel-h"><h4>问一 · 用户会不会放弃</h4><span>单选</span></div>
    <div class="opts">
      <button class="opt" data-q1="a"><span class="k">A</span><span><b>不会，收益明显大于负担</b></span></button>
      <button class="opt" data-q1="b"><span class="k">B</span><span><b>可能会，要看他用得多不多</b></span></button>
      <button class="opt" data-q1="c"><span class="k">C</span><span><b>会，多数人会退回原来的办法</b></span></button>
    </div></div>
  <div class="panel"><div class="panel-h"><h4>问二 · 有没有更轻的替代</h4><span>单选</span></div>
    <div class="opts">
      <button class="opt" data-q2="a"><span class="k">A</span><span><b>有，我打算改成它</b><span>更轻、同样拿到收益</span></span></button>
      <button class="opt" data-q2="b"><span class="k">B</span><span><b>有，但代价更大</b><span>轻不了，只能这样</span></span></button>
      <button class="opt" data-q2="c"><span class="k">C</span><span><b>没有，这就是最轻的路</b></span></button>
    </div>
    <div class="field a16-altbox" id="altBox" style="margin-top:8px;display:none"><label>改哪一处</label>
      <input id="alt" maxlength="40" placeholder="例如：把标配的背屏改成阅读版选配"></div></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const slot=sec.querySelector('#cardSlot'),btn=sec.querySelector('#subBtn'),st=sec.querySelector('#subSt'),
        hint=sec.querySelector('#subHint'),altBox=sec.querySelector('#altBox'),alt=sec.querySelector('#alt');
  const Q1={a:'不会放弃',b:'可能会放弃',c:'会放弃'};
  const Q2={a:'有，改成更轻的',b:'有，但代价更大',c:'没有更轻的'};
  const okGate=()=>!!(a.q1&&a.q2&&(a.q2!=='a'||(a.alt||'').length>=6));
  function paint(){
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A16</span><span>负担卡</span></div>'+
      '<h5>'+api.esc(a.mul||'我的乘法')+'</h5><div class="kv">'+
      [['多了什么',(a.more||[]).join('、')],['谁承担',(a.who||[]).join('、')],['怎么抵消',a.offset],
       ['会不会放弃',Q1[a.q1]||''],['更轻的替代',(Q2[a.q2]||'')+(a.q2==='a'&&a.alt?'：'+a.alt:'')]]
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
  if(a.q2==='a'&&(a.alt||'').length<6)return '写了要改，就写清改哪一处';
  return '';},
gate(S){const a=S.answers;
  return !!(a.q1&&a.q2&&(a.q2!=='a'||(a.alt||'').length>=6));}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>乘法到这里，<em>你多了一把秤</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 动作对不等于账对</div><p class="small" style="margin-top:5px">复制、改变、新场景都做了，也可能没人买。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 代价要找到人</div><p class="small" style="margin-top:5px">落在不用它的人身上，就是为难用户。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 能选配就别标配</div><p class="small" style="margin-top:5px">让受益者自己付钱，是最轻的乘法。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A17</span></div>
<p class="small">A17 · 除法：空间与时间重排。乘法让你学会"多一个"，除法要你把一个整体拆开、重新排——拆完之后，谁来做原来那个人做的事？</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '多出来的那一块，能不能做成选配？',
 '你加的东西，谁每天要多做一个动作？',
 '如果用户一周只用一次，他还愿意为它付钱吗？',
 '这笔负担落在成本上，还是落在人身上？',
 '把复制件拿掉，你的乘法还剩下什么？'
]},

card(S){
  const a=S.answers||{};
  const Q1={a:'不会放弃',b:'可能会放弃',c:'会放弃'};
  const Q2={a:'有，改成更轻的',b:'有，但代价更大',c:'没有更轻的'};
  return {title:'A16 · 负担卡',rows:[
    ['我的乘法',a.mul||'—'],
    ['多了什么',(a.more||[]).join('、')||'—'],
    ['谁承担',(a.who||[]).join('、')||'—'],
    ['怎么抵消',a.offset||'—'],
    ['会不会放弃',Q1[a.q1]||'—'],
    ['更轻的替代',Q2[a.q2]?Q2[a.q2]+(a.q2==='a'&&a.alt?'：'+a.alt:''):'—']
  ]};
},

notes:[
 {t:'本节目标',h:'让学员给乘法算账：判断一条乘法是成立、变成负担还是看条件，并能指出负担落在谁身上。'},
 {t:'时间分配',h:'先猜 5′ · 概念 8′ · 负担判断台 18′ · 负担体检 10′ · 两问与提交 4′。判断台是本节重心，别压缩。'},
 {t:'常见卡点',h:'学员只会说"更重、更贵"，说不出人。追问："谁每天要多做一个动作？谁会因为这件事多排一次队？"'},
 {t:'直播怎么接',h:'看判断台里"用户"被标了几次。八个提案全标用户，说明还没分清成本和人的差别；挑一个判成"成立"的现场问：它的代价被谁付掉了？'},
 {t:'和 A13–A15 的关系',h:'A13 学动作、A14 看案例、A15 自己跑一遍，A16 只做一件事：算账。动作越熟，越容易忘记算账。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A16']=L;
})();
