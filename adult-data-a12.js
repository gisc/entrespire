/* A12 · 减法：最大阻力路径与边界 */
(function(){
'use strict';
const CASES=[
 {id:'c1',p:'把酒店的"前台"拿掉，只剩自助机',r:'ok',
  why:'功能还在：入住、发卡、退房都能由机器完成；新用户是"不想跟人说话的人"。',
  res:'机器坏了怎么办？——最大阻力是"异常处理"，不是入住本身。',resK:'ab'},
 {id:'c2',p:'把汽车的"刹车踏板"拿掉，改用语音刹车',r:'bad',
  why:'功能没被保住：语音有延迟、会听错，安全底线不能交给它。拿掉的是"可靠执行"，不是"操作形式"。',
  res:'安全冗余不能被"新交互"替掉。',resK:'safe'},
 {id:'c3',p:'把会议的"会议室"拿掉，改成异步文档',r:'cond',
  why:'看条件：同步决策类会议拿不掉，信息同步类可以。要按会议类型分开。',
  res:'最大阻力是"决策需要当场拍板"，不是"大家想见面"。',resK:'decide'},
 {id:'c4',p:'把课本的"插图"全拿掉，只留文字',r:'bad',
  why:'功能变了：插图承担的是"理解"，不是装饰。拿掉后阅读理解成本上升。',
  res:'它看着像装饰，其实是一个功能组件。',resK:'func'},
 {id:'c5',p:'把耳机的"线"拿掉',r:'ok',
  why:'功能还在：声音照样传；新用户是"运动中的人"。最大阻力是电池与配对，被后续产品解决了。',
  res:'最大阻力是"续航与连接"，不是音质。',resK:'power'},
 {id:'c6',p:'把医院的"挂号窗口"拿掉，全改线上',r:'cond',
  why:'看条件：年轻人可以，老人不行。要么留一个人工兜底，要么把"帮老人挂号"变成新岗位。',
  res:'最大阻力是"不会用手机的人"，不是窗口本身。',resK:'who'},
 {id:'c7',p:'把餐厅的"菜单"拿掉，只做当日一道菜',r:'ok',
  why:'功能还在：点菜变少，但"决定吃什么"的成本被拿掉了；新用户是"选择疲劳的人"。',
  res:'最大阻力是"特殊饮食需求"，要用备注或替代餐补位。',resK:'diet'},
 {id:'c8',p:'把软件的"确认弹窗"全拿掉，点一下就执行',r:'bad',
  why:'功能没保住：确认弹窗承担的是"可撤销/防误触"，不是流程冗余。',
  res:'它挡住的是误操作，不是效率。',resK:'undo'}
];

const L={
id:'A12',week:3,seq:12,title:'减法：最大阻力路径与边界',
kicker:'WEEK 3 · 减法',tool:'sub',toolName:'减法边界',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>减法最容易的错：<em>把功能一起拿掉了</em></h1>
<p>SIT 的减法有一条硬规矩：<b>拿掉的是组件，不是功能。</b>功能必须还在，只是换了一个东西来承担。下面四个提案，哪一个是"真减法"？</p></div>
<div class="opts" style="margin-bottom:12px">
<button class="opt" data-h="a"><span class="k">A</span><span><b>拿掉汽车的刹车踏板，改用语音刹车</b><span>看起来更"智能"</span></span></button>
<button class="opt" data-h="b"><span class="k">B</span><span><b>拿掉耳机的线</b><span>声音照样传，只是换了传输方式</span></span></button>
<button class="opt" data-h="c"><span class="k">C</span><span><b>拿掉课本里的所有插图</b><span>更"纯粹"</span></span></button>
<button class="opt" data-h="d"><span class="k">D</span><span><b>拿掉软件的确认弹窗</b><span>点一下就执行，更快</span></span></button>
</div>
<div id="hookOut"></div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#hookOut');
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',S.answers.hook===b.dataset.h));
    if(S.answers.hook){
      const ok=S.answers.hook==='b';
      out.innerHTML='<div class="panel" style="border-color:'+(ok?'rgba(78,159,110,.4)':'rgba(216,154,60,.4)')+';background:'+(ok?'rgba(78,159,110,.07)':'rgba(216,154,60,.06)')+'">'+
        '<p class="small" style="font-size:12px">'+(ok
          ? '对。<b>线被拿掉，声音还在</b>——功能没丢，只是从"有线传输"换成了"无线传输"。另外三个都是把功能一起拿掉了：刹车是可靠执行、插图是理解、确认弹窗是可撤销。'
          : '真减法是 <b>B</b>：线没了，声音还在。A/C/D 拿掉的都是功能本身——刹车是可靠执行、插图是理解、确认弹窗是防误触。')+'</p></div>';
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
<div class="step-h"><h1>最大阻力路径：<em>拿掉之后最难的那一环</em></h1>
<p>减法不是找"最没用的零件"拿掉，而是找"拿掉之后，最难补位的那一环"。那一环，就是你的价值主张要落的地方。</p></div>
<div class="grid2" style="margin-bottom:12px">
  <div class="panel"><div class="panel-h"><h4>三条边界</h4><span>缺一条就不是减法</span></div>
    <div class="stack">
      <div><div class="mono" style="font-size:9.5px;color:var(--acc)">① 功能还在</div><p class="small" style="margin-top:3px">拿掉后这件事还能做成。做不到，就是毁坏。</p></div>
      <div><div class="mono" style="font-size:9.5px;color:var(--acc)">② 有人补位</div><p class="small" style="margin-top:3px">用户自己、环境、另一个组件，必须有人接。</p></div>
      <div><div class="mono" style="font-size:9.5px;color:var(--acc)">③ 新用户说得出来</div><p class="small" style="margin-top:3px">能指着一个人说"他因此受益"，不是"大家更方便"。</p></div>
    </div></div>
  <div class="panel"><div class="panel-h"><h4>最大阻力路径怎么找</h4><span>一句话</span></div>
    <p class="small" style="line-height:1.9">拿掉之后，问：<b>"这一环现在由谁来做？"</b><br>
    如果答案是"没人做"，那不是减法失败，是<b>你发现了真正的需求</b>——把这一环做成新东西，就是创新点。</p>
    <div class="tag acc" style="margin-top:10px">例：耳机没线 → 阻力是续航与配对 → 后来长出充电盒</div>
  </div>
</div>
<div class="panel"><div class="panel-h"><h4>检查一下</h4><span>单选</span></div>
<div class="opts">
<button class="opt" data-c="a"><span class="k">A</span><span><b>阻力越小越好</b><span>越顺越容易落地</span></span></button>
<button class="opt" data-c="b"><span class="k">B</span><span><b>阻力最大的那一环，就是价值所在</b><span>谁解决了它，谁拿到新用户</span></span></button>
</div></div>`,
init(sec,api){
  const S=api.S;
  function paint(){sec.querySelectorAll('[data-c]').forEach(b=>b.classList.toggle('on',S.answers.c2===b.dataset.c));}
  sec.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{S.answers.c2=b.dataset.c;api.save();paint();api.refresh();});
  paint();
},
hint(S){return S.answers.c2?'':'选一个你的判断';},
gate(S){return !!S.answers.c2;}},

/* ---------- 3 判断台 ---------- */
{id:'judge',name:'判断台',short:'判断',kicker:'STEP 3 · 判断台',
html:`
<div class="step-h"><h1>八个提案：<em>成立、毁坏，还是看条件</em></h1>
<p>选一个判断，再看"最大阻力在哪"。选完会告诉你为什么——这里没有标准答案，只有能不能自圆其说。</p></div>
<div class="bench">
  <div class="bench-h"><b>BOUNDARY · 减法边界判断</b><span class="st" id="jSt">0 / 8</span></div>
  <div class="bench-b" style="overflow:auto">
    <div class="a12-grid" id="jGrid"></div>
  </div>
  <div class="bench-f"><span class="small">提示：选"看条件"的，一定要说清"看什么条件"。</span><div style="flex:1"></div><button class="btn sm ghost" id="jReset">重来</button></div>
</div>`,
init(sec,api){
  const S=api.S;S.answers.judge=S.answers.judge||{};
  const grid=sec.querySelector('#jGrid'),st=sec.querySelector('#jSt');
  const LAB={ok:'成立',bad:'毁坏',cond:'看条件'};
  function paint(){
    grid.innerHTML=CASES.map(c=>{
      const v=S.answers.judge[c.id]||{};
      return '<div class="a12-card'+(v.r?' done':'')+'" data-card="'+c.id+'">'+
        '<div class="a12-p">'+c.p+'</div>'+
        '<div class="a12-r">'+['ok','bad','cond'].map(r=>'<button class="a12-rb'+(v.r===r?' on '+r:'')+'" data-r="'+r+'" data-id="'+c.id+'">'+LAB[r]+'</button>').join('')+'</div>'+
        (v.r?'<div class="a12-why '+(v.r===c.r?'good':'diff')+'">'+(v.r===c.r?'✓ 和参考判断一致':'△ 参考判断：'+LAB[c.r])+'<br>'+c.why+'</div>':'')+
        (v.r?'<div class="a12-res"><b>最大阻力在哪：</b>'+c.res+'</div>':'')+
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
hint(S){const n=Object.values(S.answers.judge||{}).filter(v=>v&&v.r).length;return n>=8?'':'还差 '+(8-n)+' 个提案没判断';},
gate(S){return Object.values(S.answers.judge||{}).filter(v=>v&&v.r).length>=8;}},

/* ---------- 4 在你的事上 ---------- */
{id:'mine',name:'在你的事上',short:'在你的事',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>把你的减法，<em>逼到最难的那一环</em></h1>
<p>写你真正想拿掉的一个组件（可以是 A11 那一节的）。然后回答：谁补位、阻力在哪、你怎么解决。</p></div>
<div class="grid2">
  <div class="panel"><div class="panel-h"><h4>① 拿掉什么</h4><span>≥4 字</span></div>
    <div class="field"><input id="cut" maxlength="40" placeholder="例如：酒店前台的人工登记"></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">② 功能由谁补</h4><span>选一个</span></div>
    <div class="chips" id="who">
      ${['用户自己','环境/流程','另一个组件','没人补（需求消失）'].map(w=>`<button class="chip" data-w="${w}">${w}</button>`).join('')}
    </div></div>
  <div class="panel"><div class="panel-h"><h4>③ 最大阻力在哪</h4><span>≥10 字</span></div>
    <div class="field"><textarea id="res" maxlength="60" placeholder="拿掉之后，最难的那一环是什么？谁会被卡住？"></textarea></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">④ 你怎么解决它</h4><span>≥12 字</span></div>
    <div class="field"><textarea id="fix" maxlength="60" placeholder="别写加强培训，写一个具体动作"></textarea></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const cut=sec.querySelector('#cut'),res=sec.querySelector('#res'),fix=sec.querySelector('#fix');
  [['cut',cut],['res',res],['fix',fix]].forEach(([k,el])=>{
    el.value=a[k]||'';el.addEventListener('input',()=>{a[k]=el.value;api.save();api.refresh();});
  });
  function paint(){sec.querySelectorAll('[data-w]').forEach(b=>b.classList.toggle('on',a.who===b.dataset.w));}
  sec.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{a.who=b.dataset.w;api.save();paint();api.refresh();});
  paint();
},
hint(S){const a=S.answers;if((a.cut||'').length<4)return '先写拿掉什么';if(!a.who)return '选一个谁补位';if((a.res||'').length<10)return '阻力没写够';if((a.fix||'').length<12)return '解决办法没写够';return '';},
gate(S){const a=S.answers;return !!((a.cut||'').length>=4&&a.who&&(a.res||'').length>=10&&(a.fix||'').length>=12);}},

/* ---------- 5 提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 产出',
html:`
<div class="step-h"><h1>交一张<em>边界卡</em></h1>
<p>这张卡只证明一件事：你知道自己的减法边界在哪。</p></div>
<div class="grid2" style="align-items:start">
  <div id="cardSlot"></div>
  <div class="panel"><div class="panel-h"><h4>提交</h4><span id="subSt">未提交</span></div>
    <p class="small">提交后会先跑一次 AI 评审，再进入班级互评。</p>
    <div class="row" style="margin-top:10px"><button class="btn primary" id="subBtn">提交</button>
    <button class="btn" id="export2">导出 PNG</button></div></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const slot=sec.querySelector('#cardSlot'),btn=sec.querySelector('#subBtn'),st=sec.querySelector('#subSt');
  function paint(){
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A12</span><span>边界卡</span></div>'+
      '<h5>'+api.esc(a.cut||'我的减法')+'</h5><div class="kv">'+
      [['拿掉',a.cut],['谁补位',a.who],['最大阻力',a.res],['怎么解决',a.fix]]
      .map(r=>'<div><b>'+r[0]+'</b><span class="'+(r[1]?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+'</div></div>';
    st.textContent=S.submitted?'已提交':'未提交';
    btn.textContent=S.submitted?'已提交':'提交';
    btn.disabled=!!S.submitted;
  }
  btn.onclick=async()=>{await api.submit();paint();};
  sec.querySelector('#export2').onclick=()=>api.exportCard();
  paint();
},
hint(){return '';},
gate(){return true;}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>减法到这里，<em>你已经能判断了</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 拿组件不拿功能</div><p class="small" style="margin-top:5px">功能没了就是毁坏，不是减法。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 阻力即价值</div><p class="small" style="margin-top:5px">最难补的那一环，就是新产品的落点。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 说得出新用户</div><p class="small" style="margin-top:5px">指得出一个人，不是"大家更方便"。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A13</span></div>
<p class="small">A13 · 乘法：复制必须改变。减法让你学会"少"，乘法开始让你学会"多"——但多出来的那个必须不一样。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '你拿掉的那个东西，功能现在由谁做？',
 '如果没人补位，这是需求还是漏洞？',
 '最大阻力是技术、习惯，还是某个岗位？',
 '你的新用户，能在办公室里指出一个真人吗？',
 '这条减法如果失败，最可能失败在哪一步？'
]},

card(S){
  const a=S.answers||{};
  return {title:'A12 · 边界卡',rows:[
    ['拿掉',a.cut||'—'],['谁补位',a.who||'—'],
    ['最大阻力',a.res||'—'],['怎么解决',a.fix||'—']
  ]};
},
notes:[
 {t:'本节目标',h:'让学员能判断一个减法提案是"成立/毁坏/看条件"，并能指出最大阻力路径。'},
 {t:'时间分配',h:'先猜 5′ · 概念 8′ · 判断台 15′ · 在你的事 12′ · 提交 5′。'},
 {t:'常见卡点',h:'学员常把"删掉流程"当减法。追问："删掉之后这件事还成不成？谁接？'},
 {t:'直播怎么接',h:'看判断台的错法：如果把"看条件"都判成"成立"，直播就讲"条件是什么"。'},
 {t:'和 A09/A11 的关系',h:'A09 认得出、A11 做得出、A12 判断得住。三节合起来才是完整的减法能力。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A12']=L;
})();
