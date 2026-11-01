/* A40 · 项目：路演与认证 */
(function(){
'use strict';
function load(){
  try{
    const A=JSON.parse(localStorage.getItem('fxm_adult_v1')||'{}');
    const L=A.lessons||{};
    const s=(id)=>((L[id]&&L[id].answers)||{});
    return {
      topic:s('A37').topic||'',
      comps:(s('A37').comps||[]).length,
      main:s('A39').main||'',
      why:s('A39').why||'',
      prove:s('A39').prove||'',
      subs:['A37','A38','A39'].filter(id=>L[id]&&L[id].submitted)
    };
  }catch(e){return {topic:'',comps:0,main:'',why:'',prove:'',subs:[]};}
}
const D=load();

const CHECKS=[
 {k:'who',n:'说清了谁痛',d:'一个具体岗位，不是"大家"'},
 {k:'what',n:'说清了改了什么',d:'拿掉/复制/挪走了哪个组件'},
 {k:'still',n:'说清了为什么还成立',d:'功能由谁接住'},
 {k:'gate',n:'说清了市场与执行',d:'两门各一句'},
 {k:'next',n:'说清了下一步',d:'30 天内能验证的一件事'},
 {k:'time',n:'控制在 3 分钟内',d:'按计时器走过一遍'}
];

const L={
id:'A40',week:10,seq:40,title:'项目：路演与认证',
kicker:'WEEK 10 · 毕业项目',tool:'mind',toolName:'项目',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>三分钟路演，<em>最常死在第二句</em></h1>
<p>第一句讲痛点大家都懂，第二句就开始讲技术、讲愿景、讲市场规模——听众开始看手机。</p></div>
<div class="opts" style="margin-bottom:12px">
<button class="opt" data-h="a"><span class="k">A</span><span><b>把市场规模讲大</b><span>三千亿赛道</span></span></button>
<button class="opt" data-h="b"><span class="k">B</span><span><b>说清"我把哪个组件怎么了，谁因此改用什么"</b><span>具体改动</span></span></button>
<button class="opt" data-h="c"><span class="k">C</span><span><b>把技术原理讲透</b><span>显得专业</span></span></button>
</div>
<div id="hookOut"></div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#hookOut');
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',S.answers.hook===b.dataset.h));
    if(S.answers.hook){
      const ok=S.answers.hook==='b';
      out.innerHTML='<div class="panel" style="border-color:'+(ok?'rgba(78,159,110,.4)':'rgba(216,154,60,.4)')+';background:'+(ok?'rgba(78,159,110,.07)':'rgba(216,154,60,.06)')+'">'+
        '<p class="small" style="font-size:12px">'+(ok?'对。<b>"我把哪个组件怎么了"是这门课唯一的语言</b>。听众记不住三千亿，但记得住"杯盖从拧三圈变成一按"。':'答案是 B。三分钟里，<b>具体改动</b>比市场规模有说服力——因为它是你做的，不是行业报告写的。')+'</p></div>';
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
<div class="step-h"><h1>三分钟四句话</h1></div>
<div class="grid2" style="margin-bottom:12px">
  <div class="panel"><div class="panel-h"><h4>结构</h4><span>每句 30–45 秒</span></div>
    <div class="stack">
      <div><b style="font-size:11px;color:var(--ink)">① 谁痛</b><p class="small" style="margin-top:2px">一个岗位 + 一个具体动作 + 每天几次。</p></div>
      <div><b style="font-size:11px;color:var(--ink)">② 我改了什么</b><p class="small" style="margin-top:2px">哪个组件、怎么改、变成什么。</p></div>
      <div><b style="font-size:11px;color:var(--ink)">③ 为什么成立</b><p class="small" style="margin-top:2px">功能由谁接住 + 两门过滤各一句。</p></div>
      <div><b style="font-size:11px;color:var(--ink)">④ 下一步</b><p class="small" style="margin-top:2px">30 天内验证一件事。</p></div>
    </div></div>
  <div class="panel"><div class="panel-h"><h4>结业认证看什么</h4><span>六项</span></div>
    <div class="stack">${CHECKS.map(c=>`<div><b style="font-size:10.5px;color:var(--ink)">${c.n}</b><p class="small" style="margin-top:1px">${c.d}</p></div>`).join('')}</div></div>
</div>
<div class="panel"><div class="panel-h"><h4>你的项目</h4><span>来自 A37–A39</span></div>
<p class="small">${D.topic?'题目：<b>'+esc0(D.topic)+'</b>':'题目：<span style="color:#C9A227">还没定（A37）</span>'}　·　组件 ${D.comps} 个　·　主推：${D.main?'<b>'+esc0(D.main)+'</b>':'<span style="color:#C9A227">还没选（A39）</span>'}<br>
已提交：${D.subs.length?D.subs.join(' / '):'<span style="color:#C9A227">还没有</span>'}</p></div>`,
init(){},hint(){return '';},gate(){return true;}},

/* ---------- 3 写路演稿 + 计时 ---------- */
{id:'pitch',name:'路演稿',short:'路演',kicker:'STEP 3 · 三分钟路演稿',
html:`
<div class="step-h"><h1>四句话，<em>写成能念出来的一段</em></h1>
<p>每句都有字数上限——上限不是限制你，是逼你删掉形容词。</p></div>
<div class="a40-timer" id="timer">
  <div class="a40-clock" id="clock">03:00</div>
  <button class="btn sm primary" id="tStart">开始计时</button>
  <button class="btn sm ghost" id="tReset">归零</button>
  <span class="small" id="tNote">念一遍你的稿子，看会不会超。</span>
</div>
<div class="grid2">
  <div class="panel"><div class="panel-h"><h4>① 谁痛</h4><span id="c1">0 / 40</span></div>
    <div class="field"><textarea id="s1" maxlength="40" placeholder="一个岗位 + 每天要做的一个动作"></textarea></div>
    <div class="panel-h" style="margin:10px 0 6px"><h4 style="font-size:9.5px">② 我改了什么</h4><span id="c2">0 / 50</span></div>
    <div class="field"><textarea id="s2" maxlength="50" placeholder="哪个组件、怎么改、变成什么"></textarea></div></div>
  <div class="panel"><div class="panel-h"><h4>③ 为什么成立</h4><span id="c3">0 / 60</span></div>
    <div class="field"><textarea id="s3" maxlength="60" placeholder="功能由谁接住 + 市场与执行各一句"></textarea></div>
    <div class="panel-h" style="margin:10px 0 6px"><h4 style="font-size:9.5px">④ 下一步</h4><span id="c4">0 / 40</span></div>
    <div class="field"><textarea id="s4" maxlength="40" placeholder="30 天内验证的一件事"></textarea></div></div>
</div>
<div class="panel" style="margin-top:10px"><div class="panel-h"><h4>连起来念一遍</h4><span>这就是你的三分钟</span></div>
<div class="a40-script" id="script"></div></div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const ids=['s1','s2','s3','s4'];
  const clock=sec.querySelector('#clock'),note=sec.querySelector('#tNote');
  let t=180,timer=null;
  function fmt(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
  function tick(){t=Math.max(0,t-1);clock.textContent=fmt(t);if(t===0){clearInterval(timer);timer=null;note.textContent='时间到。超时的部分，就是该删的部分。';}}
  sec.querySelector('#tStart').onclick=()=>{
    if(timer){clearInterval(timer);timer=null;sec.querySelector('#tStart').textContent='继续';return;}
    sec.querySelector('#tStart').textContent='暂停';
    timer=setInterval(tick,1000);
  };
  sec.querySelector('#tReset').onclick=()=>{clearInterval(timer);timer=null;t=180;clock.textContent=fmt(t);sec.querySelector('#tStart').textContent='开始计时';note.textContent='念一遍你的稿子，看会不会超。';};
  function paint(){
    ids.forEach((id,i)=>{
      const el=sec.querySelector('#'+id);el.value=a[id]||'';
      sec.querySelector('#c'+(i+1)).textContent=(a[id]||'').length+' / '+el.maxLength;
    });
    const parts=[a.s1,a.s2,a.s3,a.s4].filter(Boolean);
    sec.querySelector('#script').innerHTML=parts.length
      ? '<p><b>谁痛：</b>'+api.esc(a.s1||'')+'</p><p><b>改了什么：</b>'+api.esc(a.s2||'')+'</p><p><b>为什么成立：</b>'+api.esc(a.s3||'')+'</p><p><b>下一步：</b>'+api.esc(a.s4||'')+'</p>'
      : '<div class="small">四句都写一点，这里会连成一段。</div>';
    api.refresh();
  }
  ids.forEach(id=>{const el=sec.querySelector('#'+id);el.addEventListener('input',()=>{a[id]=el.value;api.save();paint();});});
  paint();
},
hint(S){const a=S.answers;for(const [k,n] of [['s1','谁痛'],['s2','改了什么'],['s3','为什么成立'],['s4','下一步']]){if((a[k]||'').length<(k==='s3'?20:12))return n+' 还没写够';}return '';},
gate(S){const a=S.answers;return (a.s1||'').length>=12&&(a.s2||'').length>=12&&(a.s3||'').length>=20&&(a.s4||'').length>=12;}},

/* ---------- 4 认证自检 ---------- */
{id:'cert',name:'认证',short:'认证',kicker:'STEP 4 · 结业自检',
html:`
<div class="step-h"><h1>六项自检，<em>给结业一个说法</em></h1>
<p>这不是考试，是让你知道"如果明天就要讲给老板听，你缺哪一块"。</p></div>
<div class="panel"><div class="panel-h"><h4>我做到了吗</h4><span id="cSt">0 / 6</span></div>
  <div class="a40-checks" id="checks">${CHECKS.map(c=>`<button class="a40-chk" data-k="${c.k}"><i>○</i><b>${c.n}</b><span>${c.d}</span></button>`).join('')}</div>
</div>
<div class="panel" style="margin-top:12px"><div class="panel-h"><h4>认证结果</h4><span>实时</span></div>
  <div id="certOut" class="a40-cert"></div></div>`,
init(sec,api){
  const S=api.S;S.answers.checks=S.answers.checks||[];
  const box=sec.querySelector('#checks'),st=sec.querySelector('#cSt'),out=sec.querySelector('#certOut');
  function paint(){
    box.querySelectorAll('[data-k]').forEach(b=>{
      const on=(S.answers.checks||[]).indexOf(b.dataset.k)>=0;
      b.classList.toggle('on',on);b.querySelector('i').textContent=on?'●':'○';
    });
    const n=(S.answers.checks||[]).length;
    st.textContent=n+' / 6';
    const subs=D.subs.length;
    const ok=n>=5&&subs>=2;
    out.innerHTML='<div class="a40-res '+(ok?'ok':'warn')+'"><b>'+(ok?'可以路演了':'还差一点')+'</b>'+
      '<p class="small">自检 '+n+' / 6　·　项目产出已提交 '+subs+' / 3（A37–A39）</p>'+
      '<p class="small">'+(ok?'六项里至少做到五项、且前面三节至少交了两节，就算完成结业要求。':'把没做到的补上——缺的那一项，就是你下次汇报会被问住的地方。')+'</p></div>';
  }
  box.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{
    const k=b.dataset.k;const a=S.answers.checks;
    if(a.indexOf(k)>=0)a.splice(a.indexOf(k),1);else a.push(k);
    api.save();paint();api.refresh();
  });
  paint();
},
hint(S){return (S.answers.checks||[]).length>=5?'':'六项里至少勾五项';},
gate(S){return (S.answers.checks||[]).length>=5;}},

/* ---------- 5 提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 产出',
html:`
<div class="step-h"><h1>交一张<em>结业卡</em></h1></div>
<div class="grid2" style="align-items:start">
  <div id="cardSlot"></div>
  <div class="panel"><div class="panel-h"><h4>最后一句</h4><span>会被全班看到</span></div>
    <div class="field"><label>这门课里，你最想带走的一句话</label><textarea id="last" maxlength="50" placeholder="例如：先改形态，再找价值"></textarea></div>
    <div class="row" style="margin-top:10px"><button class="btn primary" id="subBtn">提交结业卡</button><button class="btn" id="export2">导出 PNG</button></div>
    <div class="hint" id="subSt" style="margin-top:8px">未提交</div></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const slot=sec.querySelector('#cardSlot'),last=sec.querySelector('#last'),btn=sec.querySelector('#subBtn'),st=sec.querySelector('#subSt');
  function paint(){
    last.value=a.last||'';
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A40</span><span>结业卡</span></div>'+
      '<h5>'+api.esc(D.main||D.topic||'我的项目')+'</h5><div class="kv">'+
      [['题目',D.topic],['改了什么',a.s2],['为什么成立',a.s3],['下一步',a.s4],['自检',(a.checks||[]).length+' / 6'],['带走一句',a.last]]
      .map(r=>'<div><b>'+r[0]+'</b><span class="'+(r[1]?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+'</div></div>';
    st.textContent=S.submitted?'已提交':'未提交';btn.disabled=!!S.submitted;btn.textContent=S.submitted?'已提交':'提交结业卡';
  }
  last.addEventListener('input',()=>{a.last=last.value;api.save();paint();api.refresh();});
  btn.onclick=async()=>{await api.submit();paint();};
  sec.querySelector('#export2').onclick=()=>api.exportCard();
  paint();
},
hint(S){return (S.answers.last||'').length>=4?'':'写一句"最想带走的一句话"';},
gate(S){return (S.answers.last||'').length>=4;}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>四十节之后，<em>剩下这三句</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 先形态</div><p class="small" style="margin-top:5px">先想需求，只会得到调研里已有的答案。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 两个过滤</div><p class="small" style="margin-top:5px">市场问谁付钱，执行问明天能不能做。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 只改一处</div><p class="small" style="margin-top:5px">改太多，你不知道是哪一处起的作用。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>结业</h4><span>A01–A40</span></div>
<p class="small">你走完了 40 节：5 个工具、3 类固着、2 个过滤，和一个自己的项目。<br>
真正的开始是下一次，你在会议室里说"我们把这一步拿掉试试"的时候。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '第一句话能不能让听的人点头？',
 '你改的到底是哪个组件？',
 '功能由谁接住？',
 '两门过滤你各给了几分？为什么？',
 '30 天后你拿什么证明它成立？'
]},

card(S){
  const a=S.answers||{};
  return {title:'A40 · 结业卡',rows:[
    ['题目',D.topic||'—'],['改了什么',a.s2||'—'],['为什么成立',a.s3||'—'],
    ['下一步',a.s4||'—'],['自检',(a.checks||[]).length+' / 6'],['带走一句',a.last||'—']
  ]};
},
notes:[
 {t:'本节目标',h:'让学员用三分钟讲清自己的项目，并完成结业自检。'},
 {t:'时间分配',h:'先猜 4′ · 概念 5′ · 写稿 + 计时 20′ · 自检 8′ · 提交 8′。'},
 {t:'常见卡点',h:'学员会背稿但不练。要求至少按计时器念一遍。'},
 {t:'直播怎么接',h:'每人 3 分钟，讲师只问一句："如果只能保留一处改动，你留哪个？"'},
 {t:'结业判定',h:'六项自检 ≥5 且 A37–A39 提交 ≥2，视为完成；未完成者下一期补。'}
]};

function esc0(s){return String(s||'').replace(/[<>&]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]));}

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A40']=L;
})();
