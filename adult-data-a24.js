/* A24 · 一专多能：双重任务互斥 */
(function(){
'use strict';
const CASES=[
 {id:'k1',t:'方向盘上加杯架，打方向时顺手喝水',r:'bad',why:'手要同时握方向盘和拿杯子——同一身体部位在同一时刻被两个任务占用。',c:'body'},
 {id:'k2',t:'电梯按钮上贴消毒膜，按一次消一次',r:'ok',why:'按按钮和消毒发生在同一动作里，不额外占手，也不额外占时间。',c:'ok'},
 {id:'k3',t:'儿童安全座椅上装 iPad 支架，长途看动画',r:'cond',why:'看条件：短途会加剧晕车与依赖，长途且家长在旁时可以。要看使用场景。',c:'time'},
 {id:'k4',t:'消防栓旁放饮水杯，顺便接水',r:'bad',why:'消防通道被占用，安全任务被第二个任务挤掉了——安全边界不能共享。',c:'safe'},
 {id:'k5',t:'雨伞手柄做成开瓶器',r:'ok',why:'开瓶发生在伞收起来之后，两个任务不同时发生，但同一组件，成立。',c:'time'},
 {id:'k6',t:'手术器械上刻二维码，扫一下看说明',r:'bad',why:'器械表面不能有凹槽藏污——清洁与安全任务是硬约束，不能被信息任务占用。',c:'safe'},
 {id:'k7',t:'会议桌嵌无线充电，手机放桌上就充电',r:'ok',why:'放手机是已经在发生的动作，充电搭在同一个动作上，不抢注意力。',c:'ok'},
 {id:'k8',t:'工牌里塞定位芯片，顺便统计在岗',r:'cond',why:'看条件：效率统计和隐私边界要员工知情同意，否则会引发抵触。',c:'consent'}
];
const REASONS={body:'同一身体部位被占用',time:'不在同一时刻，可以并存',safe:'安全/卫生边界不能共享',consent:'涉及知情同意',ok:'不冲突'};

const L={
id:'A24',week:6,seq:24,title:'一专多能：双重任务互斥',
kicker:'WEEK 6 · 一专多能',tool:'tu',toolName:'一专多能',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>为什么<strong>杯架不能装在方向盘上</strong></h1>
<p>同样的思路——一个东西多干一件事——有的成立，有的出事故。区别不在创意，在"两个任务会不会打架"。</p></div>
<div class="opts" style="margin-bottom:12px">
<button class="opt" data-h="a"><span class="k">A</span><span><b>杯子会挡住仪表盘</b><span>视野问题</span></span></button>
<button class="opt" data-h="b"><span class="k">B</span><span><b>手要同时握方向和拿杯子，同一个身体部位被占用</b><span>互斥</span></span></button>
<button class="opt" data-h="c"><span class="k">C</span><span><b>方向盘会变重</b><span>重量问题</span></span></button>
</div>
<div id="hookOut"></div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#hookOut');
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',S.answers.hook===b.dataset.h));
    if(S.answers.hook){
      const ok=S.answers.hook==='b';
      out.innerHTML='<div class="panel" style="border-color:'+(ok?'rgba(78,159,110,.4)':'rgba(216,154,60,.4)')+';background:'+(ok?'rgba(78,159,110,.07)':'rgba(216,154,60,.06)')+'">'+
        '<p class="small" style="font-size:12px">'+(ok?'对。<b>两只手在同一时刻只能做一件事</b>。一专多能最硬的约束不是"能不能装"，是"两个任务是不是抢同一个资源"。':'核心是 B：<b>手在同一时刻只能握方向或拿杯子</b>。抢同一个资源（手、眼睛、注意力、安全边界），就一定互斥。')+'</p></div>';
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
<div class="step-h"><h1>四种<em>抢资源</em>的方式</h1></div>
<div class="grid2" style="margin-bottom:12px">
  <div class="panel"><div class="panel-h"><h4>互斥的四种原因</h4><span>认得出就够</span></div>
    <div class="stack">
      <div><div class="mono" style="font-size:9.5px;color:var(--acc)">身体</div><p class="small" style="margin-top:3px">同一只手、同一双眼睛在同一时刻只能做一件。</p></div>
      <div><div class="mono" style="font-size:9.5px;color:var(--acc)">时间</div><p class="small" style="margin-top:3px">两个任务必须同时发生，但物理上只能轮流。</p></div>
      <div><div class="mono" style="font-size:9.5px;color:var(--acc)">安全/卫生</div><p class="small" style="margin-top:3px">硬约束不能被第二个任务占用，哪怕只占一点。</p></div>
      <div><div class="mono" style="font-size:9.5px;color:var(--acc)">知情</div><p class="small" style="margin-top:3px">第二个任务在采集信息，用户不知道就是问题。</p></div>
    </div></div>
  <div class="panel"><div class="panel-h"><h4>怎么判</h4><span>三问</span></div>
    <p class="small" style="line-height:1.9">① 两个任务抢的是不是同一样东西（手/眼/时间/安全面）？<br>
    ② 能不能错开时刻？<br>
    ③ 错不开的话，哪个任务更重要？</p>
    <div class="tag acc" style="margin-top:10px">能错开＝成立；错不开且同等重要＝互斥。</div>
  </div>
</div>`,
init(){},hint(){return '';},gate(){return true;}},

/* ---------- 3 判断台 ---------- */
{id:'judge',name:'判断台',short:'判断',kicker:'STEP 3 · 判断台',
html:`
<div class="step-h"><h1>八个提案：<em>成立、互斥，还是看条件</em></h1>
<p>先判断，再选"为什么会打架"。选完给解释。</p></div>
<div class="bench">
  <div class="bench-h"><b>TU · 互斥判断</b><span class="st" id="jSt">0 / 8</span></div>
  <div class="bench-b" style="overflow:auto"><div class="a24-grid" id="jGrid"></div></div>
  <div class="bench-f"><span class="small">判"看条件"的，一定要说清看什么条件。</span><div style="flex:1"></div><button class="btn sm ghost" id="jReset">重来</button></div>
</div>`,
init(sec,api){
  const S=api.S;S.answers.judge=S.answers.judge||{};
  const grid=sec.querySelector('#jGrid'),st=sec.querySelector('#jSt');
  const LAB={ok:'成立',bad:'互斥',cond:'看条件'};
  function paint(){
    grid.innerHTML=CASES.map(c=>{
      const v=S.answers.judge[c.id]||{};
      return '<div class="a24-card'+(v.r?' done':'')+'"><div class="a24-p">'+c.t+'</div>'+
        '<div class="a24-r">'+['ok','bad','cond'].map(r=>`<button class="a24-rb${v.r===r?' on '+r:''}" data-r="${r}" data-id="${c.id}">${LAB[r]}</button>`).join('')+'</div>'+
        (v.r?'<div class="a24-c">原因：'+REASONS[c.c]+'</div>':'')+
        (v.r?'<div class="a24-why '+(v.r===c.r?'good':'diff')+'">'+(v.r===c.r?'✓ 一致':'△ 参考答案：'+LAB[c.r])+'<br>'+c.why+'</div>':'')+
        '</div>';
    }).join('');
    grid.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{
      const id=b.dataset.id;S.answers.judge[id]=S.answers.judge[id]||{};
      S.answers.judge[id].r=b.dataset.r;api.save();paint();api.refresh();
    });
    st.textContent=Object.values(S.answers.judge).filter(v=>v&&v.r).length+' / 8';
  }
  sec.querySelector('#jReset').onclick=()=>{S.answers.judge={};api.save();paint();api.refresh();};
  paint();
},
hint(S){const n=Object.values(S.answers.judge||{}).filter(v=>v&&v.r).length;return n>=8?'':'还差 '+(8-n)+' 个没判断';},
gate(S){return Object.values(S.answers.judge||{}).filter(v=>v&&v.r).length>=8;}},

/* ---------- 4 在你的事上 ---------- */
{id:'mine',name:'在你的事上',short:'在你的事',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>你的双任务，<em>过一遍互斥检查</em></h1></div>
<div class="grid2">
  <div class="panel"><div class="panel-h"><h4>① 你的双任务</h4><span>从 A23 带入或自己写</span></div>
    <div class="field"><textarea id="pair" maxlength="60" placeholder="例如：门把手一边被握，一边用颜色提示里面有没有人"></textarea></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">② 抢的是同一样东西吗</h4><span>选一个</span></div>
    <div class="chips" id="what">
      ${['抢手/眼','抢时间','抢安全面','不抢（成立）'].map(w=>`<button class="chip" data-w="${w}">${w}</button>`).join('')}
    </div></div>
  <div class="panel"><div class="panel-h"><h4>③ 怎么错开</h4><span>≥12 字</span></div>
    <div class="field"><textarea id="sep" maxlength="60" placeholder="错开时刻、换个部位、减到最少……"></textarea></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">④ 如果错不开，谁优先</h4><span>≥8 字</span></div>
    <div class="field"><textarea id="pri" maxlength="60" placeholder="安全优先 / 原任务优先 / 看场景"></textarea></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  ['pair','sep','pri'].forEach(k=>{const el=sec.querySelector('#'+k);if(!el)return;el.value=a[k]||'';el.addEventListener('input',()=>{a[k]=el.value;api.save();api.refresh();});});
  function paint(){sec.querySelectorAll('[data-w]').forEach(b=>b.classList.toggle('on',a.what===b.dataset.w));}
  sec.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{a.what=b.dataset.w;api.save();paint();api.refresh();});
  paint();
},
hint(S){const a=S.answers;if((a.pair||'').length<8)return '先写双任务';if(!a.what)return '选"抢什么"';if((a.sep||'').length<12)return '没写怎么错开';if((a.pri||'').length<8)return '没写谁优先';return '';},
gate(S){const a=S.answers;return !!((a.pair||'').length>=8&&a.what&&(a.sep||'').length>=12&&(a.pri||'').length>=8);}},

/* ---------- 5 提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 产出',
html:`
<div class="step-h"><h1>交一张<em>互斥检查卡</em></h1></div>
<div class="grid2" style="align-items:start">
  <div id="cardSlot"></div>
  <div class="panel"><div class="panel-h"><h4>补一句</h4><span>会被同事看到</span></div>
    <div class="field"><label>如果只能保留一个任务，你保留哪个</label><textarea id="keep" maxlength="40" placeholder="以及为什么"></textarea></div>
    <div class="row" style="margin-top:10px"><button class="btn primary" id="subBtn">提交</button><button class="btn" id="export2">导出 PNG</button></div>
    <div class="hint" id="subSt" style="margin-top:8px">未提交</div></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const slot=sec.querySelector('#cardSlot'),keep=sec.querySelector('#keep'),btn=sec.querySelector('#subBtn'),st=sec.querySelector('#subSt');
  function paint(){
    keep.value=a.keep||'';
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A24</span><span>互斥检查卡</span></div>'+
      '<h5>'+api.esc(a.pair||'我的双任务')+'</h5><div class="kv">'+
      [['抢什么',a.what],['怎么错开',a.sep],['谁优先',a.pri],['只留一个',a.keep]]
      .map(r=>'<div><b>'+r[0]+'</b><span class="'+(r[1]?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+'</div></div>';
    st.textContent=S.submitted?'已提交':'未提交';btn.disabled=!!S.submitted;btn.textContent=S.submitted?'已提交':'提交';
  }
  keep.addEventListener('input',()=>{a.keep=keep.value;api.save();paint();api.refresh();});
  btn.onclick=async()=>{await api.submit();paint();};
  sec.querySelector('#export2').onclick=()=>api.exportCard();
  paint();
},
hint(S){return (S.answers.keep||'').length>=4?'':'写一句"只留一个"';},
gate(S){return (S.answers.keep||'').length>=4;}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>能错开的，才是好的一专多能</h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 抢资源就互斥</div><p class="small" style="margin-top:5px">手、眼、时间、安全面，被两件事同时占就会出事。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 错开时刻最稳</div><p class="small" style="margin-top:5px">不在同一时刻发生的两个任务，几乎不会打架。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 安全不让位</div><p class="small" style="margin-top:5px">安全、卫生、法务是硬约束，不能拿来换效率。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A25</span></div>
<p class="small">A25 · 属性关联：内部变量与外部变量。一个变量动，另一个跟着动——这是最像"设计"的工具。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '两个任务抢的是手、眼、时间，还是安全？',
 '能不能把它们错开，而不是硬塞在一起？',
 '如果错不开，哪个任务更重要？',
 '用户知道第二个任务在收集什么吗？',
 '出事故时，第一个被追责的是谁？'
]},

card(S){
  const a=S.answers||{};
  return {title:'A24 · 互斥检查卡',rows:[
    ['双任务',a.pair||'—'],['抢什么',a.what||'—'],['怎么错开',a.sep||'—'],['谁优先',a.pri||'—'],['只留一个',a.keep||'—']
  ]};
},
notes:[
 {t:'本节目标',h:'让学员能判断一个一专多能提案是成立、互斥还是看条件，并给出错开方案。'},
 {t:'时间分配',h:'先猜 5′ · 概念 7′ · 判断台 15′ · 在你的事 10′ · 提交 5′。'},
 {t:'常见卡点',h:'学员会把"看起来酷"当成立。追问：两个任务同时发生时，谁在让位？'},
 {t:'直播怎么接',h:'看判断台错法：把"看条件"都判成"成立"的，现场追条件。'},
 {t:'和 A23 的关系',h:'A23 教做出来，A24 教判断能不能留。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A24']=L;
})();
