/* =========================================================
   发小明 · 世界创新港 · 第 01 章
   《世界为什么不能换一种方式？》互动课件逻辑
   ========================================================= */
(function(){
'use strict';

/* ---------- 小工具 ---------- */
const $=(s,r)=>(r||document).querySelector(s);
const $$=(s,r)=>Array.from((r||document).querySelectorAll(s));
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad=n=>String(n).padStart(2,'0');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 章节 ---------- */
const CH=[
  {t:'序章',short:'序章',a:'序',time:'课前',acc:'#F5C451',acc2:'#FFE3A6',rgb:'245,196,81'},
  {t:'这支铅笔，只能写字吗？',short:'铅笔',a:'01',time:'10 MIN',acc:'#F5C451',acc2:'#FFE3A6',rgb:'245,196,81'},
  {t:'如果，换一种方式呢？',short:'四件物品',a:'02',time:'10 MIN',acc:'#4FE0D0',acc2:'#B9FFF6',rgb:'79,224,208'},
  {t:'问题侦探',short:'问题侦探',a:'03',time:'20 MIN',acc:'#FF7A6B',acc2:'#FFC2B8',rgb:'255,122,107'},
  {t:'一个问题，三个答案',short:'创意爆发',a:'04',time:'20 MIN',acc:'#A78BFA',acc2:'#D8C8FF',rgb:'167,139,250'},
  {t:'四个镜头，升级想法',short:'四镜头',a:'05',time:'10 MIN',acc:'#4FE0D0',acc2:'#B9FFF6',rgb:'79,224,208'},
  {t:'我的第一个创新提案',short:'提案',a:'06',time:'25 MIN',acc:'#F5C451',acc2:'#FFE3A6',rgb:'245,196,81'},
  {t:'创意发布会',short:'发布会',a:'07',time:'15 MIN',acc:'#FF7A6B',acc2:'#FFC2B8',rgb:'255,122,107'},
  {t:'问题发现者',short:'徽章',a:'08',time:'10 MIN',acc:'#F5C451',acc2:'#FFE3A6',rgb:'245,196,81'}
];

/* ---------- 数据 ---------- */
const USES={
  draw:{icon:'✏️',name:'写字画画',desc:'笔尖划过纸面，留下线条、颜色和想法。'},
  measure:{icon:'📏',name:'量一量',desc:'一支铅笔大约 18 厘米，可以当一把临时尺子。'},
  roll:{icon:'🧻',name:'卷一卷',desc:'把纸卷在笔杆上，就能做出纸筒、纸卷和小望远镜。'},
  spin:{icon:'🌀',name:'转一转',desc:'穿过笔杆的轴，可以变成小车轮、陀螺或风车。'},
  stand:{icon:'📐',name:'撑一撑',desc:'几支笔绑在一起，可以做成小支架或三脚架。'},
  drum:{icon:'🥁',name:'敲一敲',desc:'笔帽和笔杆能敲出不同的节奏，变成一支小鼓棒。'}
};
const OBJECTS={
  cup:{alts:[
    {t:'会提醒的杯子',d:'杯壁上的小灯按时间亮起：该喝水了。'},
    {t:'推不倒的杯子',d:'底部加一个软吸盘，碰到也只是晃一下。'},
    {t:'一只手拿稳的杯子',d:'两边都有把手，还加了防滑纹。'}
  ]},
  bag:{alts:[
    {t:'拉着走的书包',d:'装上轮子和拉杆，重的时候不用一直背着。'},
    {t:'会分类的书包',d:'每个东西都有自己的小房间，一眼就能找到。'},
    {t:'能坐下的书包',d:'放下书包，打开就是一个小板凳。'}
  ]},
  chair:{alts:[
    {t:'三条腿的椅子',d:'少一条腿，反而更稳？把三条腿摆成三角形试试。'},
    {t:'变成梯子的椅子',d:'翻过来，椅背就是梯子的两条边。'},
    {t:'摇一摇的椅子',d:'写累了，就轻轻摇一摇。'}
  ]},
  umbrella:{alts:[
    {t:'背在背上的伞',d:'固定在书包上，双手就自由了。'},
    {t:'会收雨水的伞',d:'雨水顺着小管子流进瓶子，地上就不湿了。'},
    {t:'会发光的伞',d:'伞边亮起来，夜里走路更安全。'}
  ]}
};
const PROBLEMS={
  cup:{icon:'🥤',title:'桌角的杯子，一碰就倒',obs:'杯子放在桌子最边上，走过去很容易碰到。',why:'是杯子太轻、桌面太滑，还是它放的位置不对？',who:'同桌、老师、打扫卫生的人'},
  bag:{icon:'🎒',title:'书包里找一块橡皮，要翻半天',obs:'书包只有一个大口袋，所有东西全混在一起。',why:'是没有分隔，还是东西放进去时没有固定位置？',who:'我自己、同学'},
  chair:{icon:'🪑',title:'坐上去会晃的椅子',obs:'椅子有一条腿比别的短，一坐上去就晃。',why:'是腿不一样长，还是地面不平？',who:'坐这把椅子的人'},
  umbrella:{icon:'☂️',title:'雨伞滴了一地水',obs:'湿雨伞靠在角落，水顺着伞尖流到地上。',why:'是伞没有地方挂，还是地面没有接水的地方？',who:'值日生、走路的人'},
  cable:{icon:'🔌',title:'插线板上的线缠成一团',obs:'好几根线绕在一起，想拔一根却拉出三根。',why:'是线太长、没有收纳，还是插头没有标记？',who:'充电的人、打扫的人'},
  shelf:{icon:'📚',title:'书架最上面的书够不到',obs:'最上层的书放得太高，踮脚也拿不到。',why:'是书架太高，还是常用的书放错了层？',who:'我、个子小的同学'}
};
const ANGLES=[
  {k:'noelec',icon:'🔋',name:'不用电',prompt:'如果完全不用电，这个问题还能怎么解决？'},
  {k:'paper',icon:'📦',name:'只用纸和绳',prompt:'如果只能用纸板、绳子和胶带，你会怎么做？'},
  {k:'shape',icon:'🔺',name:'改变形状',prompt:'如果把它的形状彻底改变，会变成什么样？'},
  {k:'combine',icon:'🧩',name:'组合',prompt:'如果把它和另一件日常物品组合起来呢？'},
  {k:'reverse',icon:'🔄',name:'反过来想',prompt:'如果不阻止问题发生，而是让它变得没关系，会怎样？'},
  {k:'cheap',icon:'🪙',name:'只有十块钱',prompt:'如果整个方案只能用十块钱，你会怎么选材料？'}
];
const LENSES=[
  {k:'easy',icon:'🖐️',name:'更方便',c:'#4FE0D0',tag:'EASY',q:'少一步、少一只手、少找一个东西——能省掉哪个动作？',tips:['固定在不用找的地方','一只手就能操作','把两个动作合成一个']},
  {k:'fun',icon:'🎈',name:'更有趣',c:'#F5C451',tag:'FUN',q:'如果孩子会主动想用它，它会长什么样？',tips:['加一个游戏规则','让它会回应你','把使用变成小仪式']},
  {k:'cheap',icon:'🪙',name:'更省钱',c:'#8BD17C',tag:'CHEAP',q:'哪个零件可以换成纸板、绳子或家里的旧物？',tips:['用旧纸箱做主体','用橡皮筋代替弹簧','减少一个零件']},
  {k:'safe',icon:'🛡️',name:'更安全',c:'#FF7A6B',tag:'SAFE',q:'哪里可能夹手、割手、弄脏？怎么改？',tips:['把尖角包起来','给活动部件加限位','让材料更轻更软']}
];
const NOTES=[
{t:'课前准备',time:'课前 5 分钟',html:`
  <div class="note-block"><h4>本幕目标</h4><p>把课堂从“听讲模式”切换成“创造模式”：今天不找标准答案，只找更好的答案。</p>
  <h4>关键提问</h4><div class="quote">“如果今天不考你正确答案，只请你找一找：有没有更好的答案？”</div>
  <h4>操作提示</h4><ul><li>点击“全屏”或按 <b>F</b>，投影效果最好。</li><li>确认声音开启；每幕右下角有“下一幕”。</li><li>按 <b>T</b> 随时打开本指引，按 <b>→</b> 翻页。</li></ul>
  <h4>课前材料</h4><p>白纸、彩笔、便利贴、剪刀、胶带；每组一套。纸质任务卡可替代第 6 幕的电子表单。</p>
  <div class="warn">第一课不要求孩子做出作品。核心成果是：开始用发明家的眼光看生活。</div></div>`},
{t:'铅笔的多用途',time:'10 分钟',html:`
  <div class="note-block"><h4>本幕目标</h4><p>打破“一个物品只有一个用途”的思维定式，让孩子体验“还有没有不一样的答案”。</p>
  <h4>关键提问</h4><ul><li>“铅笔只能用来写字吗？”</li><li>“还有没有和刚才完全不一样的用途？”</li><li>“如果不用来写字呢？”</li></ul>
  <h4>操作提示</h4><p>请孩子说，老师点光点。每发现一个，读一遍说明，再追问“还有吗”。找到 3 个后，输入框会解锁，可以记录孩子自己的第 7 种可能。</p>
  <h4>常见困难</h4><p>孩子只说“画画、写字”时，不要否定，继续追问：“如果它不能碰到纸呢？”“如果把它折断呢？”“如果把它绑起来呢？”</p>
  <div class="warn">不要在这一幕评价“有没有用”。先让想法出现，评价留到后面。</div></div>`},
{t:'四件物品',time:'10 分钟',html:`
  <div class="note-block"><h4>本幕目标</h4><p>把“换一种方式”从铅笔扩展到日常物品，理解“熟悉 ≠ 只能这样”。</p>
  <h4>关键提问</h4><div class="quote">“水杯只能长成现在这样吗？<br>书包一定要背在背上吗？<br>椅子一定要有四条腿吗？<br>雨伞一定要靠人拿着吗？”</div>
  <h4>操作提示</h4><p>点卡片翻转；每张卡片有 3 种“如果”，点“再换一种”继续。探索 3 张后出现全班投票，点一次算一票，可以让孩子举手、老师代点。</p>
  <h4>常见困难</h4><p>孩子说“不可能”时，先接住：“你说得对，现在不可能。那如果只改一点点呢？”不要急着讲可行性。</p></div>`},
{t:'问题侦探',time:'20 分钟',html:`
  <div class="note-block"><h4>本幕目标</h4><p>从“物品还能怎样”转向“生活哪里不方便”，并练习把问题说具体。</p>
  <h4>关键提问</h4><ul><li>“哪里不方便？谁遇到了？”</li><li>“你看到的是现象，还是你猜的原因？”</li><li>“如果只能研究一个，你最想搞清楚哪个？”</li></ul>
  <h4>操作提示</h4><p>点教室里的 6 个发光点；点“开始观察 5:00”做现场计时。找到至少 3 个问题后，点问题卡或“就研究这个”完成选择。孩子也可以输入自己的问题。</p><p>课堂可以加一个小 PK：每确认一个问题，给 A 队或 B 队 +10；点“AI 追问我”获取一个追问。</p>
  <h4>常见困难</h4><p>孩子说“都差不多”时，请他指出具体位置和动作：“是走到哪里碰到？碰的是杯子的哪一边？”</p>
  <div class="warn">这一幕不急着想解决办法。先看清楚问题，是后面所有创意的地基。</div></div>`},
{t:'三个答案',time:'20 分钟',html:`
  <div class="note-block"><h4>本幕目标</h4><p>围绕同一个问题产生至少 3 个不同方向的解决办法，体验“先数量，后质量”。</p>
  <h4>关键提问</h4><ul><li>“如果不用电，还能怎么做？”</li><li>“如果只用纸和绳呢？”</li><li>“反过来想，会怎样？”</li></ul>
  <h4>操作提示</h4><p>点 6 个角度中的一个，或按“随便给我一个角度”。每个角度都会给一句限制。把想法写进 3 个槽，然后把最想试的想法拖到“拖到这里”区域，或点“选它”。点“AI 追问我”获取一个新的限制角度。</p>
  <h4>常见困难</h4><p>三个想法雷同时，换一个角度再写；孩子说“想不出来”时，给他一个具体限制，比说“再想想”有效。</p>
  <div class="warn">不要在这一幕说“这个太幼稚”“这个做不出来”。先接住，再筛选。</div></div>`},
{t:'四镜头',time:'10 分钟',html:`
  <div class="note-block"><h4>本幕目标</h4><p>学习用“更方便、更有趣、更省钱、更安全”四个角度改进同一个想法。</p>
  <h4>关键提问</h4><ul><li>“少一步、少一只手，能省掉哪个动作？”</li><li>“如果孩子会主动想用它，它长什么样？”</li><li>“哪个零件可以换成旧物？”</li><li>“哪里可能夹手、割手？”</li></ul>
  <h4>操作提示</h4><p>至少升级 2 个角度。每个镜头下面的小提示可以点，会自动填进输入框，孩子可以改。</p>
  <h4>常见困难</h4><p>升级变成“加更多功能”时，提醒：功能越多不一定越好。好的升级，是让原来的问题被解决得更彻底。</p></div>`},
{t:'创新提案',time:'25 分钟',html:`
  <div class="note-block"><h4>本幕目标</h4><p>完成第一张《我的第一个创新提案》：问题、使用者、办法、原理、下一步，以及一张设计图。</p>
  <h4>关键提问</h4><ul><li>“你的办法靠什么起作用？”</li><li>“如果只能改进一个地方，你改哪里？”</li><li>“别人听得懂你说的‘它怎样解决问题’吗？”</li></ul>
  <h4>操作提示</h4><p>可以每组一台设备，也可以老师用大屏演示、孩子在纸质任务卡上画。填写后点“生成我的创新提案”，可下载图片或打印。</p>
  <h4>常见困难</h4><p>孩子不会写字时，允许画图 + 口述，老师代记关键词。不要替孩子设计答案，用提问帮他把答案说清楚。</p></div>`},
{t:'创意发布会',time:'15 分钟',html:`
  <div class="note-block"><h4>本幕目标</h4><p>用 60 秒讲清楚：我发现的问题、我的办法、它怎样起作用、我还想改进什么。</p>
  <h4>关键提问</h4><p>观众可以问：“它真的能解决问题吗？”“如果材料不够怎么办？”“还有谁需要它？”</p>
  <h4>操作提示</h4><p>点“开始 60 秒”；最后 5 秒会变红并提示。同学点“鼓掌”加油；点“下一位同学”重置计时和掌声。</p>
  <h4>两条课堂规则</h4><ul><li>先理解，再建议。</li><li>可以讨论方案，不能嘲笑提出方案的人。</li></ul>
  <div class="warn">孩子紧张时，允许他看着屏幕上的句子说，或者只展示设计图，由老师协助表达。</div></div>`},
{t:'徽章与收尾',time:'10 分钟',html:`
  <div class="note-block"><h4>本幕目标</h4><p>回顾今天的创造过程，颁发“问题发现者”徽章，把课堂延伸到家庭。</p>
  <h4>三个反思问题</h4><ul><li>今天，你发现了什么以前没有认真注意到的问题？</li><li>你提出的哪一个办法，最想继续做下去？为什么？</li><li>如果下次再做一次，你想改进哪里？</li></ul>
  <h4>家庭任务</h4><p>一周内记录 3 个新的生活问题；和家长一起找一件“不太好用”的物品，记录它哪里不方便，并想一个改进办法。</p>
  <h4>结束话术</h4><div class="quote">“发明家并不是一开始就知道答案的人。发明家是那些愿意多看一眼、多问一句、多试一次的人。”</div>
  <div class="warn">如果时间不够，徽章可以课后发放；家庭任务一定要留，它是第 2 章的素材。</div></div>`}
];

/* ---------- 状态 ---------- */
const KEY='fxm_l1_v1';
function blank(){
  return {
    ch:0,
    uses:[],customUses:[],
    alts:{cup:0,bag:0,chair:0,umbrella:0},explored:[],
    votes:{cup:0,bag:0,chair:0,umbrella:0},
    found:[],customProbs:[],selectedProb:'',pk:{A:0,B:0},
    ideas:[],picked:-1,angle:'',
    upgrades:[],lenses:[],
    name:'',problem:'',who:'',solution:'',how:'',improve:'',
    drawing:''
  };
}
let S=blank();
try{
  const raw=localStorage.getItem(KEY);
  if(raw){
    const o=JSON.parse(raw);
    const b=blank();
    Object.keys(b).forEach(k=>{ if(o[k]!==undefined) b[k]=o[k]; });
    b.alts=Object.assign(blank().alts,o.alts||{});
    b.votes=Object.assign(blank().votes,o.votes||{});
    S=b;
  }
}catch(e){}
let saveTimer=null;
function save(){
  clearTimeout(saveTimer);
  saveTimer=setTimeout(()=>{ try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){} },220);
}
function saveNow(){ try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){} }

/* ---------- 声音 ---------- */
let AC=null,muted=false;
try{ muted=localStorage.getItem('fxm_l1_muted')==='1'; }catch(e){}
function ac(){
  if(!AC){ const C=window.AudioContext||window.webkitAudioContext; if(!C) return null; AC=new C(); }
  if(AC.state==='suspended') AC.resume().catch(()=>{});
  return AC;
}
function tone(freq,dur,type,vol,delay){
  if(muted) return; const c=ac(); if(!c) return;
  const t=c.currentTime+(delay||0);
  const o=c.createOscillator(),g=c.createGain();
  o.type=type||'sine'; o.frequency.setValueAtTime(freq,t);
  g.gain.setValueAtTime(0,t);
  g.gain.linearRampToValueAtTime(vol==null?.05:vol,t+.012);
  g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  o.connect(g); g.connect(c.destination); o.start(t); o.stop(t+dur+.05);
}
function sweep(f1,f2,dur,vol){
  if(muted) return; const c=ac(); if(!c) return;
  const t=c.currentTime,o=c.createOscillator(),g=c.createGain();
  o.type='sine'; o.frequency.setValueAtTime(f1,t); o.frequency.exponentialRampToValueAtTime(f2,t+dur);
  g.gain.setValueAtTime(vol||.04,t); g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  o.connect(g); g.connect(c.destination); o.start(t); o.stop(t+dur+.05);
}
function noise(dur,vol,freq){
  if(muted) return; const c=ac(); if(!c) return;
  const n=Math.floor(c.sampleRate*dur),buf=c.createBuffer(1,n,c.sampleRate),d=buf.getChannelData(0);
  for(let i=0;i<n;i++) d[i]=(Math.random()*2-1)*(1-i/n);
  const src=c.createBufferSource(); src.buffer=buf;
  const f=c.createBiquadFilter(); f.type='bandpass'; f.frequency.value=freq||900; f.Q.value=.7;
  const g=c.createGain(); g.gain.value=vol||.05;
  src.connect(f); f.connect(g); g.connect(c.destination); src.start();
}
function sfx(name){
  switch(name){
    case 'tap': tone(520,.05,'square',.022); break;
    case 'pop': sweep(620,980,.12,.06); break;
    case 'unlock': tone(660,.1,'sine',.05); tone(990,.14,'sine',.045,.08); break;
    case 'chime': [523,659,784].forEach((f,i)=>tone(f,.35,'sine',.05,i*.08)); break;
    case 'success': [523,659,784,1047].forEach((f,i)=>tone(f,.4,'sine',.055,i*.09)); break;
    case 'whoosh': noise(.28,.05,600); break;
    case 'tick': tone(1100,.03,'square',.02); break;
    case 'bell': tone(880,.6,'triangle',.07); tone(1320,.5,'sine',.04,.04); break;
    case 'applause': for(let i=0;i<5;i++) setTimeout(()=>noise(.08,.035,1200+Math.random()*800),i*45); break;
    case 'error': tone(220,.16,'sawtooth',.035); break;
  }
}
function toggleSound(){
  muted=!muted;
  try{localStorage.setItem('fxm_l1_muted',muted?'1':'0');}catch(e){}
  const b=$('#btnSound');
  b.classList.toggle('on',!muted);
  b.querySelector('span').textContent=muted?'静音':'声音';
  if(!muted) sfx('unlock');
}

/* ---------- 星空 ---------- */
(function sky(){
  const cv=$('#sky'),ctx=cv.getContext('2d');
  let w=0,h=0,dpr=Math.min(2,devicePixelRatio||1),stars=[],last=0,shoot=null;
  function resize(){
    w=innerWidth;h=innerHeight;cv.width=w*dpr;cv.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    stars=Array.from({length:Math.min(150,Math.round(w*h/14000))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.2+.2,a:Math.random(),s:Math.random()*.015+.003}));
  }
  resize();addEventListener('resize',resize);
  function loop(t){
    ctx.clearRect(0,0,w,h);
    for(const s of stars){ s.a+=s.s; ctx.fillStyle='rgba(247,242,230,'+(0.12+0.45*Math.abs(Math.sin(s.a))).toFixed(3)+')'; ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,6.29); ctx.fill(); }
    if(!reduce && t-last>9000 && !shoot){ last=t; shoot={x:Math.random()*w*.6+w*.2,y:Math.random()*h*.25,l:0,sp:6+Math.random()*4}; }
    if(shoot){ shoot.l+=shoot.sp; shoot.x+=shoot.sp*.8; shoot.y+=shoot.sp*.26;
      const g=ctx.createLinearGradient(shoot.x-60,shoot.y-20,shoot.x,shoot.y);
      g.addColorStop(0,'rgba(255,227,166,0)');g.addColorStop(1,'rgba(255,227,166,.6)');
      ctx.strokeStyle=g;ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(shoot.x-60,shoot.y-20);ctx.lineTo(shoot.x,shoot.y);ctx.stroke();
      if(shoot.l>240) shoot=null; }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
(function coverStars(){
  const box=$('#coverStars'); if(!box) return;
  let html='';
  for(let i=0;i<34;i++){ html+='<i style="left:'+(Math.random()*100).toFixed(1)+'%;top:'+(Math.random()*100).toFixed(1)+'%;animation-delay:'+(Math.random()*4).toFixed(2)+'s;opacity:'+(.15+Math.random()*.5).toFixed(2)+'"></i>'; }
  box.innerHTML=html;
})();

/* ---------- 彩带 / 粒子 ---------- */
const fxCv=$('#fx'),fxCtx=fxCv.getContext('2d');
let parts=[],fxRunning=false;
function fxResize(){ fxCv.width=innerWidth*Math.min(2,devicePixelRatio||1); fxCv.height=innerHeight*Math.min(2,devicePixelRatio||1); fxCv.style.width=innerWidth+'px'; fxCv.style.height=innerHeight+'px'; fxCtx.setTransform(Math.min(2,devicePixelRatio||1),0,0,Math.min(2,devicePixelRatio||1),0,0); }
fxResize(); addEventListener('resize',fxResize);
function burst(x,y,n,colors){
  const cs=colors||['#F5C451','#FFE3A6','#4FE0D0','#FF7A6B','#A78BFA','#FFFFFF'];
  for(let i=0;i<(n||28);i++){
    const a=Math.random()*Math.PI*2, sp=2+Math.random()*7;
    parts.push({x:x,y:y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-2,g:.22+Math.random()*.12,life:0,max:50+Math.random()*50,size:2+Math.random()*4,color:cs[(Math.random()*cs.length)|0],rot:Math.random()*6.28,vr:(Math.random()-.5)*.3,shape:Math.random()<.35?'circle':'rect'});
  }
  startFx();
}
function confetti(n){
  const cs=['#F5C451','#FFE3A6','#4FE0D0','#FF7A6B','#A78BFA','#FFFFFF','#8BD17C'];
  for(let i=0;i<(n||90);i++){
    parts.push({x:innerWidth/2+(Math.random()-.5)*innerWidth*.5,y:innerHeight*.32+Math.random()*80,vx:(Math.random()-.5)*9,vy:-Math.random()*11-2,g:.26,life:0,max:100+Math.random()*80,size:2+Math.random()*5,color:cs[(Math.random()*cs.length)|0],rot:Math.random()*6.28,vr:(Math.random()-.5)*.35,shape:Math.random()<.4?'circle':'rect'});
  }
  startFx();
}
function startFx(){ if(!fxRunning){fxRunning=true;requestAnimationFrame(fxTick);} }
function fxTick(){
  fxCtx.clearRect(0,0,innerWidth,innerHeight);
  for(let i=parts.length-1;i>=0;i--){
    const p=parts[i]; p.life++; p.x+=p.vx; p.y+=p.vy; p.vy+=p.g; p.vx*=.995; p.rot+=p.vr;
    const a=Math.max(0,1-p.life/p.max);
    fxCtx.save(); fxCtx.globalAlpha=a; fxCtx.translate(p.x,p.y); fxCtx.rotate(p.rot); fxCtx.fillStyle=p.color;
    if(p.shape==='circle'){ fxCtx.beginPath(); fxCtx.arc(0,0,p.size*.6,0,6.29); fxCtx.fill(); }
    else fxCtx.fillRect(-p.size/2,-p.size/2,p.size,p.size*1.6);
    fxCtx.restore();
    if(p.life>=p.max||p.y>innerHeight+40) parts.splice(i,1);
  }
  if(parts.length) requestAnimationFrame(fxTick); else { fxRunning=false; fxCtx.clearRect(0,0,innerWidth,innerHeight); }
}

/* ---------- Toast ---------- */
let toastTimer=null;
function toast(msg,icon){
  const el=$('#toast');
  $('#toastText').textContent=msg;
  el.querySelector('i').textContent=icon||'✓';
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove('show'),2600);
}

/* ---------- 幕布 ---------- */
let curtainTimer=null;
function showCurtain(n){
  const el=$('#curtainTrans');
  $('#curtainNo').textContent='ACT '+CH[n].a;
  $('#curtainTitle').textContent=CH[n].short;
  el.classList.add('show');
  clearTimeout(curtainTimer);
  curtainTimer=setTimeout(()=>el.classList.remove('show'),470);
}

/* ---------- 导航 ---------- */
let going=false;
function go(n,opts){
  opts=opts||{};
  n=clamp(n,0,CH.length-1);
  if(n===S.ch && !opts.force) return;
  if(!opts.instant && !beforeLeave(n)) return;
  const prev=S.ch;
  S.ch=n; save();
  if(!opts.instant && n>prev){ showCurtain(n); sfx('whoosh'); }
  else if(!opts.instant && n<prev) sfx('tap');
  $$('.ch').forEach(el=>{ el.classList.remove('active','leaving'); });
  const next=$('.ch[data-ch="'+n+'"]');
  if(next) next.classList.add('active');
  document.body.className='ch-'+n;
  document.documentElement.style.setProperty('--acc',CH[n].acc);
  document.documentElement.style.setProperty('--acc2',CH[n].acc2);
  document.documentElement.style.setProperty('--acc-rgb',CH[n].rgb);
  updateChrome();
  onEnter(n);
  const sc=$('.ch[data-ch="'+n+'"]'); if(sc) sc.scrollTop=0;
  if(n===0){ /* cover */ }
}
function beforeLeave(n){
  if(n<=S.ch) return true;
  if(S.ch===3 && n>3){
    if(!S.found.length){ toast('先找到至少一个问题，再继续','🔍'); sfx('error'); return false; }
    if(!S.selectedProb){ selectProb(S.found[0]); toast('先帮你选了第一个问题，也可以回去换','✓'); }
  }
  if(S.ch===4 && n>4){
    if(!S.ideas.length){ toast('先写下至少一个办法，再继续','💡'); sfx('error'); return false; }
    if(S.picked<0){ S.picked=0; save(); renderIdeas(); toast('先帮你选了第一个想法','✓'); }
  }
  return true;
}
function updateChrome(){
  const c=CH[S.ch];
  $('#tbAct').textContent=c.a;
  $('#tbTitle').textContent=c.t;
  const tbTime=$('#tbTime'); if(tbTime) tbTime.textContent=c.time;
  $('#progressBar').style.width=(S.ch/(CH.length-1)*100)+'%';
  $$('#dots .dot').forEach((d,i)=>{
    d.classList.toggle('active',i===S.ch);
    d.classList.toggle('done',i<S.ch);
  });
  const nl=$('#nextLabel'), nb=$('#btnNext');
  if(S.ch>=CH.length-1){ nl.textContent='回到课程目录'; }
  else { nl.textContent=CH[S.ch+1].t; }
  nb.style.opacity=S.ch>=CH.length-1?.75:1;
  renderNotes();
}
function buildDots(){
  $('#dots').innerHTML=CH.map((c,i)=>'<button class="dot'+(i===0?' active':'')+'" data-i="'+i+'" data-label="'+c.short+'" aria-label="第'+i+'幕 '+c.short+'">'+(i===0?'序':pad(i))+'</button>').join('');
  $$('#dots .dot').forEach(d=>d.addEventListener('click',()=>{go(+d.dataset.i);}));
}

/* ---------- 进入每一幕 ---------- */
function onEnter(n){
  if(n===1) renderUses();
  else if(n===2) renderObjects();
  else if(n===3) renderProblems();
  else if(n===4){ renderAngles(); renderIdeas(); }
  else if(n===5) renderLenses();
  else if(n===6) enterProposal();
  else if(n===7) enterStage();
  else if(n===8) enterFinale();
}

/* =========================================================
   01 铅笔
   ========================================================= */
function renderUses(){
  const count=S.uses.length;
  $('#useCount').textContent=count;
  $('#useBar').style.width=(count/6*100)+'%';
  $$('.hotspot').forEach(h=>{
    const on=S.uses.includes(h.dataset.use);
    h.classList.toggle('found',on);
    h.innerHTML='<span>'+(on?'✓':h.dataset.use?['draw','measure','roll','spin','stand','drum'].indexOf(h.dataset.use)+1:'')+'</span>';
  });
  const items=[];
  S.uses.forEach(id=>{ const u=USES[id]; if(!u) return; items.push('<li><span class="ui">'+u.icon+'</span><div><b>'+u.name+'</b><p>'+u.desc+'</p></div></li>'); });
  S.customUses.forEach(txt=>{ items.push('<li class="custom"><span class="ui">💭</span><div><b>你的想法</b><p>'+esc(txt)+'</p></div></li>'); });
  $('#useList').innerHTML=items.length?items.join(''):'<li class="use-empty">还没有发现。随便点一个光点开始吧——<br>答案没有标准，越不一样越好。</li>';
  $('#customUseBox').classList.toggle('on',count>=3);
  if(count>=6 && !renderUses.done){ renderUses.done=true; sfx('success'); confetti(70); toast('6 / 6 · 你看见了 6 种可能！','🌟'); }
  if(count<6) renderUses.done=false;
}
function findUse(id,ev){
  if(S.uses.includes(id)){ sfx('tap'); return; }
  S.uses.push(id); save(); sfx('pop');
  const u=USES[id];
  if(ev) burst(ev.clientX,ev.clientY,18,['#F5C451','#FFE3A6','#4FE0D0']);
  renderUses();
  toast('发现：'+u.name,'✓');
  if(S.uses.length===3){ setTimeout(()=>toast('已经 3 种了。你还能想到第 7 种吗？','💭'),700); }
}
function spinPencil(){
  const p=$('#pencilSvg'); if(!p) return;
  p.classList.remove('spin'); void p.offsetWidth; p.classList.add('spin');
  sfx('whoosh');
}
function addCustomUse(){
  const inp=$('#customUseInput'),v=inp.value.trim();
  if(!v){ toast('先写下一个用法','✏️'); inp.focus(); return; }
  if(S.customUses.length>=4){ toast('已经记了 4 个啦，留一点给别人','✓'); return; }
  S.customUses.push(v); inp.value=''; save(); renderUses(); sfx('success');
  toast('记下了：'+v,'💭');
  burst(innerWidth/2,innerHeight*.55,20,['#4FE0D0','#F5C451']);
}

/* =========================================================
   02 四件物品
   ========================================================= */
function setAlt(card,idx){
  const id=card.dataset.obj,o=OBJECTS[id]; if(!o) return;
  const a=((idx%o.alts.length)+o.alts.length)%o.alts.length;
  card.dataset.alt=a; S.alts[id]=a; save();
  $$('.altgrp',card).forEach(g=>{ g.style.display=(+g.dataset.a===a)?'':'none'; });
  const t=$('.alt-title',card),d=$('.alt-desc',card),no=$('.alt-no',card);
  if(t) t.textContent=o.alts[a].t;
  if(d) d.textContent=o.alts[a].d;
  if(no) no.textContent='另 '+(a+1)+' 种';
}
function flipCard(card){
  const id=card.dataset.obj;
  const was=card.classList.contains('flipped');
  if(!was){
    card.classList.add('flipped');
    setAlt(card,S.alts[id]||0);
    if(!S.explored.includes(id)){ S.explored.push(id); save(); sfx('pop'); }
    else sfx('tap');
    if(S.explored.length>=3) $('#votePanel').classList.add('show');
    renderObjects();
  }
}
function renderObjects(){
  $$('.obj-card').forEach(card=>{
    const id=card.dataset.obj;
    card.classList.toggle('explored',S.explored.includes(id));
    if(card.classList.contains('flipped')) setAlt(card,S.alts[id]||0);
  });
  if(S.explored.length>=3) $('#votePanel').classList.add('show');
  $$('#voteRows .vote-item').forEach(row=>{
    const id=row.dataset.vote,n=S.votes[id]||0;
    const max=Math.max(1,...Object.values(S.votes));
    $('b',row).textContent=n;
    $('.vi-bar i',row).style.width=(n/max*100)+'%';
  });
}
function vote(id,ev){
  S.votes[id]=(S.votes[id]||0)+1; save(); renderObjects(); sfx('tick');
  if(ev) burst(ev.clientX,ev.clientY,6,['#F5C451','#FFE3A6']);
}

/* =========================================================
   03 问题侦探
   ========================================================= */
function getProb(id){
  if(PROBLEMS[id]) return PROBLEMS[id];
  return S.customProbs.find(p=>p.id===id)||null;
}
function renderProblems(){
  $('#probCount').textContent=S.found.length;
  const ot=$('#obsTime'); if(ot) ot.textContent=fmtTime(Math.max(0,obsLeft));
  $$('.room-hotspot').forEach(h=>h.classList.toggle('found',S.found.includes(h.dataset.prob)));
  const list=$('#probList');
  if(!S.found.length){
    list.innerHTML='<div class="prob-empty">还没有采集到问题。<br>点一点左边的发光圆点，把“哪里不方便”找出来。</div>';
  }else{
    list.innerHTML=S.found.map((id,i)=>{
      const p=getProb(id); if(!p) return '';
      return '<button class="prob-card'+(S.selectedProb===id?' selected':'')+'" data-pid="'+esc(id)+'"><span class="pi">'+p.icon+'</span><span class="pt"><b>'+esc(p.title)+'</b><span>'+esc(p.who)+'</span></span><span class="pc">'+(S.selectedProb===id?'✓':'')+'</span></button>';
    }).join('');
    $$('#probList .prob-card').forEach(b=>b.addEventListener('click',()=>selectProb(b.dataset.pid)));
  }
  const hint=$('#selectHint');
  if(S.selectedProb){ hint.className='select-hint ok'; hint.innerHTML='已选择：<b>'+esc(getProb(S.selectedProb)?.title||'')+'</b>'; }
  else if(S.found.length>=3){ hint.className='select-hint'; hint.innerHTML='找到了 <b>'+S.found.length+'</b> 个！现在选一个最想研究的。'; }
  else { hint.className='select-hint'; hint.innerHTML='找到 <b>3 个</b>问题后，选一个最想研究的。'; }
}
function findProblem(id,ev){
  if(!PROBLEMS[id]) return;
  if(!S.found.includes(id)){ S.found.push(id); save(); sfx('pop'); if(ev) burst(ev.clientX,ev.clientY,20,['#FF7A6B','#F5C451','#FFE3A6']); }
  else sfx('tap');
  renderProblems();
  showDetail(id);
  if(S.found.length===3) setTimeout(()=>toast('3 个问题了！选一个最想研究的','🔍'),600);
}
function showDetail(id){
  const p=getProb(id); if(!p) return;
  $('#pdIc').textContent=p.icon;
  $('#pdTitle').textContent=p.title;
  $('#pdObs').textContent=p.obs;
  $('#pdWhy').textContent='猜一猜：'+p.why;
  $('#pdSelect').onclick=()=>{ selectProb(id); $('#probDetail').classList.remove('show'); };
  $('#probDetail').classList.add('show');
}
function selectProb(id){
  const p=getProb(id); if(!p) return;
  S.selectedProb=id; S.problem=p.title; save();
  sfx('success'); renderProblems(); updateProgress();
  toast('就研究这个：'+p.title,'✓');
  burst(innerWidth/2,innerHeight*.45,24,['#FF7A6B','#F5C451']);
}
function addCustomProblem(){
  const inp=$('#customProbInput'),v=inp.value.trim();
  if(!v){ toast('先写下你发现的问题','🔍'); inp.focus(); return; }
  const id='c'+Date.now();
  S.customProbs.push({id,icon:'💭',title:v,obs:'这是你自己发现的问题。',why:'它为什么会发生？谁受影响？',who:'我自己'});
  S.found.push(id); save(); inp.value=''; renderProblems(); selectProb(id);
  toast('把你的问题收进采集袋了','💭');
}
let obsLeft=300,obsTimer=null,obsRunning=false;
function fmtTime(s){ return pad(Math.floor(s/60))+':'+pad(s%60); }
function toggleObs(){
  if(obsRunning){ clearInterval(obsTimer); obsRunning=false; $('#obsStart').textContent='继续观察'; sfx('tap'); return; }
  if(obsLeft<=0) obsLeft=300;
  obsRunning=true; $('#obsStart').textContent='暂停'; sfx('tick');
  obsTimer=setInterval(()=>{
    obsLeft--; $('#obsTime').textContent=fmtTime(Math.max(0,obsLeft));
    if(obsLeft<=10&&obsLeft>0) sfx('tick');
    if(obsLeft<=0){ clearInterval(obsTimer); obsRunning=false; $('#obsStart').textContent='重新计时'; sfx('bell'); toast('观察时间到，找到几个问题了？','⏰'); }
  },1000);
}

/* =========================================================
   04 三个答案
   ========================================================= */
function angleById(k){ return ANGLES.find(a=>a.k===k)||null; }
function renderAngles(){
  $('#angleGrid').innerHTML=ANGLES.map(a=>'<button class="angle-btn'+(S.angle===a.k?' active':'')+'" data-angle="'+a.k+'"><span class="ai">'+a.icon+'</span><span>'+a.name+'</span></button>').join('');
  $$('#angleGrid .angle-btn').forEach(b=>b.addEventListener('click',()=>{ setAngle(b.dataset.angle); }));
  updatePrompt();
}
function updatePrompt(){
  const a=angleById(S.angle);
  const p=$('#anglePrompt');
  if(a) p.innerHTML='针对「<b style="color:var(--ink)">'+esc(S.problem||'你选的问题')+'</b>」，'+a.prompt;
  else p.textContent='先选一个角度，或者直接写下你的想法。三个想法不用都“靠谱”，但要不一样。';
}
function setAngle(k){
  S.angle=k; save(); renderAngles(); sfx('tap');
  const inp=$('#ideaInput'); if(inp) inp.focus();
}
function randomAngle(){
  const btn=$('#diceBtn'); btn.classList.remove('rolling'); void btn.offsetWidth; btn.classList.add('rolling');
  sfx('whoosh');
  const pool=ANGLES.filter(a=>a.k!==S.angle);
  const a=pool[(Math.random()*pool.length)|0];
  setTimeout(()=>{ setAngle(a.k); toast('灵感角度：'+a.name,a.icon); },320);
}
function renderIdeas(){
  $('#ideaProblem').textContent=S.problem||'还没有选择问题';
  const slots=$('#ideaSlots');
  let html='';
  for(let i=0;i<3;i++){
    const it=S.ideas[i];
    if(it){
      html+='<div class="slot filled'+(S.picked===i?' picked':'')+'" data-i="'+i+'"><div class="slot-top"><span class="sn">'+pad(i+1)+'</span><em>'+esc(it.tag)+'</em><button class="sx" data-remove="'+i+'" aria-label="删除">×</button></div><p>'+esc(it.text)+'</p><button class="pick" data-pick="'+i+'">'+(S.picked===i?'已选它 ✓':'选它')+'</button></div>';
    }else{
      html+='<div class="slot" data-i="'+i+'"><div class="slot-top"><span class="sn">'+pad(i+1)+'</span><em>等待一个想法</em></div><p class="s-empty">从左边选一个角度，<br>或者直接写下你的办法。</p></div>';
    }
  }
  slots.innerHTML=html;
  $$('#ideaSlots [data-pick]').forEach(b=>b.addEventListener('click',()=>{ S.picked=+b.dataset.pick; save(); renderIdeas(); sfx('success'); toast('选好了：带着它去升级','✓'); }));
  $$('#ideaSlots .slot.filled').forEach(slot=>{
    slot.draggable=true;
    slot.addEventListener('dragstart',e=>{try{e.dataTransfer.setData('text/plain',slot.dataset.i);}catch(err){} slot.classList.add('dragging');});
    slot.addEventListener('dragend',()=>slot.classList.remove('dragging'));
  });
  $$('#ideaSlots [data-remove]').forEach(b=>b.addEventListener('click',()=>{ const i=+b.dataset.remove; S.ideas.splice(i,1); if(S.picked===i)S.picked=-1; else if(S.picked>i)S.picked--; save(); renderIdeas(); sfx('tap'); }));
  const pct=Math.min(100,Math.round(S.ideas.length/3*100));
  $('#ideaEnergy').style.width=pct+'%';
  $('#energyNum').textContent=pct+'%';
  $('#ideaFoot').textContent=S.ideas.length>=3?(S.picked>=0?'已经选好一个想法。下一步：用四个镜头把它升级。':'三个想法都写好了——选一个最想试的。'):'第一个想到的办法，不一定是最好的办法。先多想，再选择。';
  updatePrompt();
}
function addIdea(){
  const inp=$('#ideaInput'),v=inp.value.trim();
  if(!v){ toast('先写下一个办法','💡'); inp.focus(); return; }
  if(S.ideas.length>=3){ toast('三个槽已经满了。先选一个，或者删除一个再写','✓'); sfx('error'); return; }
  if(S.ideas.some(x=>x.text===v)){ toast('这个想法已经写过了，换一个角度试试','🔄'); sfx('error'); return; }
  const a=angleById(S.angle);
  S.ideas.push({text:v,tag:a?a.name:'自由想法'}); inp.value=''; save(); renderIdeas(); sfx('pop');
  if(S.ideas.length===3){ setTimeout(()=>{sfx('chime'); toast('三个想法！现在选一个最想试的','🌟');},300); }
}

/* =========================================================
   05 四镜头
   ========================================================= */
let curLens=null;
function currentIdea(){ return S.ideas[S.picked]||null; }
function renderLenses(){
  if(!curLens) curLens=S.lenses[0]||'easy';
  const idea=currentIdea();
  $('#lensIdea').textContent=idea?idea.text:'还没有选择想法，可以先回到上一幕选一个。';
  $('#lensRow').innerHTML=LENSES.map(l=>'<button class="lens-btn'+(curLens===l.k?' active':'')+'" data-lens="'+l.k+'" style="--lc:'+l.c+'"><span class="lens-ic">'+l.icon+'</span><span>'+l.name+'</span><em>'+l.tag+'</em></button>').join('');
  $$('#lensRow .lens-btn').forEach(b=>b.addEventListener('click',()=>openLens(b.dataset.lens)));
  renderUpgrades();
  if(curLens) openLens(curLens,true);
}
function openLens(k,silent){
  const l=LENSES.find(x=>x.k===k); if(!l) return;
  curLens=k;
  const panel=$('#lensPanel');
  panel.style.setProperty('--lc',l.c);
  panel.classList.add('active');
  $('#lensQ').textContent='“'+l.q+'”';
  $('#lensTips').innerHTML=l.tips.map(t=>'<span data-tip="'+esc(t)+'">'+esc(t)+'</span>').join('');
  $$('#lensTips span').forEach(s=>s.addEventListener('click',()=>{ const inp=$('#lensInput'); inp.value=s.dataset.tip; inp.focus(); sfx('tap'); }));
  $$('#lensRow .lens-btn').forEach(b=>b.classList.toggle('active',b.dataset.lens===k));
  const input=$('#lensInput'); if(!silent){ input.value=''; input.focus(); sfx('tap'); }
  $('#lensProgress').innerHTML='已升级 <b>'+S.lenses.length+'</b> / 4 个角度';
  if(!silent) burst(innerWidth*.5,innerHeight*.4,10,[l.c,'#FFE3A6']);
}
function addUpgrade(){
  const inp=$('#lensInput'),v=inp.value.trim();
  if(!curLens){ toast('先点一个镜头','🔍'); return; }
  if(!v){ toast('先写下这个升级办法','✏️'); inp.focus(); return; }
  const l=LENSES.find(x=>x.k===curLens);
  if(S.upgrades.some(u=>u.text===v)){ toast('这个升级已经记过了','✓'); return; }
  S.upgrades.push({lens:curLens,text:v,color:l.c});
  if(!S.lenses.includes(curLens)) S.lenses.push(curLens);
  inp.value=''; save(); renderUpgrades(); sfx('success'); burst(innerWidth*.55,innerHeight*.45,22,[l.c,'#F5C451','#FFE3A6']);
  toast('升级记下了：'+l.name,'✓');
  if(S.lenses.length>=2){ $('#toProposal').classList.add('on'); setTimeout(()=>toast('两个角度升级完成，可以写进提案了','🌟'),500); }
}
function renderUpgrades(){
  const box=$('#upgradeList');
  if(!S.upgrades.length){ box.innerHTML='<div class="prob-empty" style="font-size:10px">还没有升级。选一个镜头，写下你的改进。</div>'; }
  else{
    box.innerHTML=S.upgrades.map(u=>{
      const l=LENSES.find(x=>x.k===u.lens);
      return '<div class="up-item" style="--uc:'+(l?l.c:'#F5C451')+'"><b>'+(l?l.name:'升级')+'</b><span>'+esc(u.text)+'</span></div>';
    }).join('');
  }
  const n=S.lenses.length;
  $('#upCount').textContent=n+' / 4';
  $('#lensProgress').innerHTML='已升级 <b>'+n+'</b> / 4 个角度';
  const idea=currentIdea();
  $('#beforeText').textContent=idea?idea.text:'—';
  $('#afterText').textContent=idea?(idea.text+(S.upgrades.length?'；'+S.upgrades.map(u=>u.text).join('；'):'')):'—';
  $('#toProposal').classList.toggle('on',n>=2);
}

/* =========================================================
   06 提案 + 画布
   ========================================================= */
const FIELDS={fName:'name',fProblem:'problem',fSolution:'solution',fHow:'how',fImprove:'improve'};
function enterProposal(){
  Object.keys(FIELDS).forEach(id=>{ const el=$('#'+id); if(el) el.value=S[FIELDS[id]]||''; });
  $$('#whoChips button').forEach(b=>b.classList.toggle('on',b.dataset.who===S.who));
  initCanvas();
  updateProgress();
  if(S.drawing) loadDrawing();
}
function updateProgress(){
  let filled=0; const total=6;
  if(S.name.trim())filled++;
  if(S.problem.trim())filled++;
  if(S.who.trim())filled++;
  if(S.solution.trim())filled++;
  if(S.how.trim())filled++;
  if(S.drawing)filled++;
  const pct=Math.round(filled/total*100);
  const p=$('#propPct'),b=$('#propBar');
  if(p)p.textContent=pct+'%';
  if(b)b.style.width=pct+'%';
}
let drawInit=false;
let dctx=null,drawing=false,lastPt=null,dcolor='#F5C451',dsize=7,erasing=false,undoStack=[];
function initCanvas(){
  if(drawInit) return;
  const cv=$('#drawCanvas'); if(!cv) return;
  dctx=cv.getContext('2d');
  dctx.lineCap='round'; dctx.lineJoin='round';
  drawInit=true;
  const pos=e=>{
    const r=cv.getBoundingClientRect();
    return {x:(e.clientX-r.left)*cv.width/r.width,y:(e.clientY-r.top)*cv.height/r.height};
  };
  cv.addEventListener('pointerdown',e=>{
    if(e.button!==undefined&&e.button!==0&&e.pointerType==='mouse')return;
    e.preventDefault(); cv.setPointerCapture(e.pointerId);
    pushUndo(); drawing=true; lastPt=pos(e);
    dctx.globalCompositeOperation=erasing?'destination-out':'source-over';
    dctx.strokeStyle=dcolor; dctx.lineWidth=erasing?dsize*2.4:dsize;
    dctx.beginPath(); dctx.arc(lastPt.x,lastPt.y,dctx.lineWidth/2,0,6.29); dctx.fillStyle=dcolor; if(!erasing)dctx.fill();
    hideHint();
  });
  cv.addEventListener('pointermove',e=>{
    if(!drawing)return; e.preventDefault();
    const p=pos(e);
    dctx.globalCompositeOperation=erasing?'destination-out':'source-over';
    dctx.strokeStyle=dcolor; dctx.lineWidth=erasing?dsize*2.4:dsize;
    dctx.beginPath(); dctx.moveTo(lastPt.x,lastPt.y); dctx.lineTo(p.x,p.y); dctx.stroke();
    lastPt=p;
  });
  const end=()=>{ if(!drawing)return; drawing=false; saveDrawing(); };
  cv.addEventListener('pointerup',end); cv.addEventListener('pointercancel',end); cv.addEventListener('pointerleave',e=>{if(drawing)end();});
}
function hideHint(){ const h=$('#canvasHint'); if(h)h.classList.add('hide'); const s=$('#drawState'); if(s)s.textContent='绘制中…'; }
function pushUndo(){
  try{ undoStack.push($('#drawCanvas').toDataURL('image/png')); if(undoStack.length>14)undoStack.shift(); }catch(e){}
}
function saveDrawing(){
  const cv=$('#drawCanvas'); if(!cv)return;
  S.drawing=cv.toDataURL('image/png'); save(); updateProgress();
  const s=$('#drawState'); if(s)s.textContent='已保存';
}
function loadDrawing(){
  const cv=$('#drawCanvas'); if(!cv||!S.drawing)return;
  const img=new Image();
  img.onload=()=>{ const c=cv.getContext('2d'); c.clearRect(0,0,cv.width,cv.height); c.drawImage(img,0,0,cv.width,cv.height); hideHint(); const s=$('#drawState'); if(s)s.textContent='已载入'; };
  img.src=S.drawing;
}
function clearDraw(){
  const cv=$('#drawCanvas'); if(!cv)return;
  pushUndo(); cv.getContext('2d').clearRect(0,0,cv.width,cv.height);
  S.drawing=''; save(); updateProgress();
  $('#canvasHint').classList.remove('hide'); $('#drawState').textContent='已清空';
}
function undoDraw(){
  const cv=$('#drawCanvas'); if(!cv||!undoStack.length)return;
  const d=undoStack.pop(); const img=new Image();
  img.onload=()=>{ const c=cv.getContext('2d'); c.clearRect(0,0,cv.width,cv.height); c.drawImage(img,0,0); S.drawing=cv.toDataURL('image/png'); save(); updateProgress(); };
  img.src=d;
}
function genProposal(){
  if(!S.name.trim()){ toast('先写下你的名字','✏️'); $('#fName').focus(); return; }
  if(!S.problem.trim()){ toast('写下你发现的问题','🔍'); $('#fProblem').focus(); return; }
  if(!S.solution.trim()){ toast('给你的办法起一个名字','💡'); $('#fSolution').focus(); return; }
  if(!S.how.trim()){ toast('说说它怎样解决问题','🛠️'); $('#fHow').focus(); return; }
  openProposal(); sfx('success'); confetti(100); burst(innerWidth/2,innerHeight*.5,40,['#F5C451','#FFE3A6','#4FE0D0']);
}
function proposalDate(){ const d=new Date(); return d.getFullYear()+'.'+pad(d.getMonth()+1)+'.'+pad(d.getDate()); }
function openProposal(){
  const who=S.who||'需要它的人';
  const html='<button class="modal-x" id="modalX" aria-label="关闭">×</button>'+
  '<div class="prop-card">'+
    '<div class="pc-head"><div class="pc-brand">GENESIS · 发小明创新学院<small>WORLD INNOVATION PORT · CHAPTER 01</small></div><div class="pc-no">FXM-CUR-Q1-001<br>我的第一个创新提案</div></div>'+
    '<h3>我的第一个创新提案</h3><div class="pc-sub">《世界为什么不能换一种方式？》· 第 01 章</div>'+
    '<div class="pc-name"><span>小小发明家</span><b>'+esc(S.name)+'</b><span class="date">'+proposalDate()+'</span></div>'+
    '<div class="pc-body"><div class="pc-fields">'+
      '<div class="pc-field"><label>我发现的问题</label><p>'+esc(S.problem)+'</p></div>'+
      '<div class="pc-field"><label>谁会遇到这个问题</label><p>'+esc(who)+'</p></div>'+
      '<div class="pc-field"><label>我的办法</label><p><b>'+esc(S.solution)+'</b><br>'+esc(S.how)+'</p></div>'+
      '<div class="pc-field"><label>我还想改进</label><p>'+esc(S.improve||'先把它做出来，再根据测试结果改进。')+'</p></div>'+
    '</div><div class="pc-draw"><label>我的设计图 · DESIGN</label><div class="dwrap">'+(S.drawing?'<img src="'+S.drawing+'" alt="设计图">':'<span class="empty">（把设计图画在右侧画板上，会出现在这里）</span>')+'</div></div></div>'+
    '<div class="pc-foot"><span>发小明 Genesis 创新学院 · 让每个孩子都拥有创造的能力</span><span>发现 → 想象 → 设计 → 表达</span></div>'+
    '<div class="pc-stamp"><b>问题发现者</b>发小明 · 第01章</div>'+
  '</div>'+
  '<div class="modal-actions"><button class="btn primary" id="saveLab">存入我的实验室</button><button class="btn" id="dlProp">下载提案图片</button><button class="btn ghost" id="printProp">打印 / 存为 PDF</button><button class="btn ghost" id="closeProp">继续完善</button></div>';
  $('#modalBox').innerHTML=html;
  $('#modal').classList.add('show');
  $('#modalX').onclick=closeModal; $('#closeProp').onclick=closeModal;
  $('#saveLab').onclick=saveToCourseLab;
  $('#dlProp').onclick=()=>{ downloadProposal(); toast('提案图片已生成','⬇️'); };
  $('#printProp').onclick=()=>{ window.print(); };
}
function closeModal(){ $('#modal').classList.remove('show'); $('#modalBox').innerHTML=''; }
function wrapText(ctx,text,maxW){
  const chars=Array.from(String(text||'')); const lines=[]; let line='';
  for(const ch of chars){
    if(ch==='\n'){ lines.push(line); line=''; continue; }
    const test=line+ch;
    if(ctx.measureText(test).width>maxW&&line){ lines.push(line); line=ch; }
    else line=test;
  }
  if(line) lines.push(line);
  return lines.length?lines:[''];
}
function saveToCourseLab(){
  if(!S.solution.trim()||!S.problem.trim()){ toast('先把问题和办法写完整','✏️'); return; }
  const p={
    id:'c'+Date.now(),
    source:'course',
    chapter:'01',
    chapterTitle:'世界为什么不能换一种方式？',
    name:S.name||'小小发明家',
    product:S.solution,
    problem:S.problem,
    who:S.who||'需要它的人',
    how:S.how,
    improve:S.improve,
    drawing:S.drawing||'',
    date:proposalDate(),
    ts:Date.now()
  };
  let list=[];
  try{ list=JSON.parse(localStorage.getItem('fxm_course_lab_v1')||'[]')||[]; }catch(e){ list=[]; }
  list=list.filter(x=>!(x.product===p.product&&x.problem===p.problem&&x.name===p.name));
  list.unshift(p);
  try{ localStorage.setItem('fxm_course_lab_v1',JSON.stringify(list.slice(0,24))); }catch(e){ toast('本机存储空间不足，请先下载提案','⚠️'); return; }
  sfx('success'); burst(innerWidth/2,innerHeight*.45,36,['#F5C451','#FFE3A6','#4FE0D0']);
  showLabSaved(p);
}
function showLabSaved(p){
  $('#modalBox').innerHTML='<button class="modal-x" id="savedX" aria-label="关闭">×</button>'+
    '<div class="saved-panel">'+
      '<div class="saved-ic">🎓</div>'+
      '<div class="saved-kicker">SAVED TO MY LAB</div>'+
      '<h3>已存入我的实验室</h3>'+
      '<p>「'+esc(p.product)+'」已经收进你的实验室。下一次从学院地图点「我的实验室」就能找到它。</p>'+
      '<div class="saved-tip"><b>建议下一步</b><span>用「路演大师」把提案讲成故事，生成演讲稿；用「六院圆桌」让六位院长继续帮你发散和打磨。</span></div>'+
      '<div class="saved-actions">'+
        '<a class="btn primary" href="index.html?scene=lab">去我的实验室</a>'+
        '<a class="btn" href="index.html?scene=roadshow">去路演大师</a>'+
        '<a class="btn" href="index.html?scene=roundtable">去六院圆桌</a>'+
      '</div>'+
      '<button class="btn ghost" id="savedBack">留在本章</button>'+
      '<div class="saved-foot">本机保存 · 换设备或清理浏览器缓存后不会自动同步</div>'+
    '</div>';
  $('#modal').classList.add('show');
  $('#savedX').onclick=closeModal;
  $('#savedBack').onclick=closeModal;
  toast('已存入我的实验室','🎓');
}
function downloadProposal(){
  const W=1600,H=1120,cv=document.createElement('canvas');cv.width=W;cv.height=H;
  const c=cv.getContext('2d');
  c.fillStyle='#FBF3DE';c.fillRect(0,0,W,H);
  const g=c.createRadialGradient(W*.8,0,10,W*.8,0,700);g.addColorStop(0,'rgba(245,196,81,.2)');g.addColorStop(1,'rgba(245,196,81,0)');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.strokeStyle='rgba(160,120,40,.45)';c.lineWidth=2;c.strokeRect(38,38,W-76,H-76);
  c.strokeStyle='rgba(160,120,40,.22)';c.strokeRect(52,52,W-104,H-104);
  c.fillStyle='#2B3A67';c.font='700 26px "Noto Sans SC","PingFang SC",sans-serif';c.fillText('GENESIS · 发小明创新学院',96,112);
  c.fillStyle='#8A6212';c.font='500 14px "Noto Sans SC","PingFang SC",sans-serif';c.fillText('WORLD INNOVATION PORT · CHAPTER 01',96,140);
  c.textAlign='right';c.fillStyle='#8A6212';c.font='500 14px "Noto Sans SC",sans-serif';c.fillText('FXM-CUR-Q1-001',W-96,116);c.fillText('我的第一个创新提案',W-96,140);c.textAlign='left';
  c.fillStyle='#1C2333';c.font='900 54px "Noto Serif SC","Songti SC",serif';c.fillText('我的第一个创新提案',96,226);
  c.fillStyle='#6B748F';c.font='500 17px "Noto Sans SC",sans-serif';c.fillText('《世界为什么不能换一种方式？》· 第 01 章',96,258);
  c.strokeStyle='#1C2333';c.lineWidth=3;c.beginPath();c.moveTo(96,292);c.lineTo(W-96,292);c.stroke();
  c.fillStyle='#8A93A6';c.font='500 14px "Noto Sans SC",sans-serif';c.fillText('小小发明家',96,336);
  c.fillStyle='#1C2333';c.font='700 32px "Noto Serif SC","Songti SC",serif';c.fillText(S.name||'小小发明家',96,378);
  c.textAlign='right';c.fillStyle='#8A93A6';c.font='500 14px "Noto Sans SC",sans-serif';c.fillText(proposalDate(),W-96,336);c.textAlign='left';

  const leftX=96,leftW=740;let y=430;
  function field(label,text,big){
    c.fillStyle='#8A6212';c.font='700 13px "Noto Sans SC",sans-serif';c.fillText(label,leftX,y);y+=26;
    c.fillStyle='#2B3A67';c.font=(big?'700 ':'500 ')+(big?22:20)+'px "Noto Sans SC",sans-serif';
    const lines=wrapText(c,text||'—',leftW);
    lines.forEach((ln,i)=>{c.fillStyle=i===0&&big?'#1C2333':'#2B3A67';c.fillText(ln,leftX,y);y+=32;});
    y+=14;
  }
  field('我发现的问题',S.problem);
  field('谁会遇到这个问题',S.who||'需要它的人');
  field('我的办法',(S.solution||'')+(S.how?' —— '+S.how:''),true);
  field('我还想改进什么',S.improve||'先把它做出来，再根据测试结果改进。');

  const bx=900,by=420,bw=600,bh=470;
  c.fillStyle='#FFFCF3';c.strokeStyle='rgba(160,120,40,.35)';c.lineWidth=2;c.beginPath();c.rect(bx,by,bw,bh);c.fill();c.stroke();
  c.fillStyle='#8A6212';c.font='700 12px "Noto Sans SC",sans-serif';c.fillText('我的设计图 · DESIGN',bx+18,by+28);
  const img=new Image();
  const finish=()=>{
    if(img.src&&img.width){
      const iw=img.width,ih=img.height,pad=18,maxW=bw-pad*2,maxH=bh-58;
      const sc=Math.min(maxW/iw,maxH/ih);const w=iw*sc,h=ih*sc;
      c.drawImage(img,bx+(bw-w)/2,by+44+(maxH-h)/2,w,h);
    }else{
      c.fillStyle='#B9B29E';c.font='500 15px "Noto Sans SC",sans-serif';c.textAlign='center';c.fillText('（设计图）',bx+bw/2,by+bh/2);c.textAlign='left';
    }
    c.strokeStyle='rgba(28,35,51,.25)';c.lineWidth=2;c.beginPath();c.moveTo(96,H-118);c.lineTo(W-96,H-118);c.stroke();
    c.fillStyle='#8A93A6';c.font='500 13px "Noto Sans SC",sans-serif';c.fillText('发小明 Genesis 创新学院 · 让每个孩子都拥有创造的能力',96,H-84);
    c.textAlign='right';c.fillText('发现 → 想象 → 设计 → 表达',W-96,H-84);c.textAlign='left';
    c.save();c.translate(W-200,H-200);c.rotate(-.2);c.strokeStyle='rgba(197,46,46,.55)';c.lineWidth=3;c.beginPath();c.arc(0,0,64,0,6.29);c.stroke();
    c.fillStyle='rgba(197,46,46,.7)';c.textAlign='center';c.font='700 17px "Noto Serif SC",serif';c.fillText('问题发现者',0,-4);c.font='500 11px "Noto Sans SC",sans-serif';c.fillText('发小明 · 第01章',0,18);c.restore();c.textAlign='left';
    const a=document.createElement('a');a.download='我的第一个创新提案_'+(S.name||'小小发明家')+'.png';a.href=cv.toDataURL('image/png');a.click();
  };
  if(S.drawing){ img.onload=finish; img.src=S.drawing; } else finish();
}

/* =========================================================
   07 发布会
   ========================================================= */
let timeLeft=60,timerId=null,timerRunning=false,clapEnergy=0,clapCount=0,speakerNo=1;
const RING_C=2*Math.PI*32;
function enterStage(){ updateSpeech(); updateTimerUI(); $('timerArc') && ($('#timerArc').style.strokeDasharray=RING_C); }
function updateSpeech(){
  const name=S.name||'小小发明家';
  $('#speakerName').textContent=name;
  const p=(v,ph)=>v?esc(v):ph;
  $('#speechText').innerHTML=
    '<p class="lead">大家好，我是 <b>'+esc(name)+'</b>。</p>'+
    '<p>我发现了一个问题：<b>'+p(S.problem,'……')+'</b></p>'+
    '<p>这个问题会让 <b>'+p(S.who,'……')+'</b> 感到不方便。</p>'+
    '<p>所以，我想设计一个 <b>'+p(S.solution,'……')+'</b>。</p>'+
    '<p>它通过 <b>'+p(S.how,'……')+'</b> 来解决问题。</p>'+
    '<p>如果继续研究，我还想 <b>'+p(S.improve,'……')+'</b>。</p>';
}
function updateTimerUI(){
  const arc=$('#timerArc'),num=$('#timerNum');
  if(!arc||!num)return;
  const frac=timeLeft/60;
  arc.style.strokeDasharray=RING_C;
  arc.style.strokeDashoffset=RING_C*(1-frac);
  arc.style.stroke=timeLeft<=5?'#FF7A6B':'#F5C451';
  num.textContent=Math.ceil(timeLeft);
  num.classList.toggle('warn',timeLeft<=5&&timeLeft>0);
}
function startTimer(){
  if(timerRunning){ clearInterval(timerId);timerRunning=false;$('#timerStart').textContent='继续';sfx('tap');return; }
  if(timeLeft<=0)timeLeft=60;
  timerRunning=true;$('#timerStart').textContent='暂停';sfx('tick');
  timerId=setInterval(()=>{
    timeLeft-=1;updateTimerUI();
    if(timeLeft<=5&&timeLeft>0)sfx('tick');
    if(timeLeft<=0){clearInterval(timerId);timerRunning=false;$('#timerStart').textContent='再讲一次';sfx('bell');toast('时间到，谢谢大家！','⏰');confetti(50);}
  },1000);
}
function resetTimer(){ clearInterval(timerId);timerRunning=false;timeLeft=60;$('#timerStart').textContent='开始 60 秒';updateTimerUI();sfx('tap'); }
function applause(ev){
  clapEnergy=Math.min(100,clapEnergy+4+Math.random()*4);
  clapCount++;
  $('#applauseCount').textContent=clapCount;
  $('#applauseBar').style.width=clapEnergy+'%';
  sfx('applause');
  const box=$('#applauseParticles'); if(box){
    for(let i=0;i<4;i++){
      const s=document.createElement('span');
      s.textContent=['👏','✨','🌟','💛'][(Math.random()*4)|0];
      const x=ev?ev.clientX-innerWidth/2+innerWidth/2:innerWidth/2;
      s.style.left=(50+(Math.random()-.5)*30)+'%';
      s.style.bottom=(10+Math.random()*25)+'%';
      s.style.setProperty('--dx',((Math.random()-.5)*160).toFixed(0)+'px');
      s.style.setProperty('--rot',((Math.random()-.5)*80).toFixed(0)+'deg');
      box.appendChild(s); setTimeout(()=>s.remove(),1250);
    }
  }
  if(clapEnergy>=100&&!applause.done){ applause.done=true; confetti(60); toast('掌声爆棚！','👏'); setTimeout(()=>applause.done=false,3000); }
}
function nextSpeaker(){
  speakerNo++; $('#speakerNo').textContent=speakerNo;
  resetTimer(); clapEnergy=0;clapCount=0;$('#applauseCount').textContent='0';$('#applauseBar').style.width='0%';
  sfx('whoosh'); toast('有请下一位小小发明家','🎤');
}

/* =========================================================
   08 徽章
   ========================================================= */
let finaleDone=false;
function enterFinale(){
  const name=S.name||'小小发明家';
  $('#badgeName').textContent=name;
  const d=new Date();
  $('#badgeDate').textContent=d.getFullYear()+' · 第 01 章';
  if(!finaleDone){ finaleDone=true; setTimeout(()=>{confetti(120);sfx('chime');},350); }
}
function downloadBadge(){
  const W=1200,H=1200,cv=document.createElement('canvas');cv.width=W;cv.height=H;
  const c=cv.getContext('2d');
  const bg=c.createRadialGradient(W/2,H*.42,40,W/2,H*.42,700);bg.addColorStop(0,'#1B2340');bg.addColorStop(1,'#060A18');
  c.fillStyle=bg;c.fillRect(0,0,W,H);
  c.save();c.translate(W/2,H/2);
  for(let i=0;i<36;i++){c.rotate(Math.PI/18);c.fillStyle='rgba(245,196,81,'+(i%2?.06:.12)+')';c.beginPath();c.moveTo(0,0);c.arc(0,0,600,-.035,.035);c.closePath();c.fill();}
  c.restore();
  c.strokeStyle='#F5C451';c.lineWidth=10;c.beginPath();c.arc(W/2,H/2,330,0,6.29);c.stroke();
  c.strokeStyle='rgba(255,227,166,.35)';c.lineWidth=2;c.beginPath();c.arc(W/2,H/2,350,0,6.29);c.stroke();
  const ring=c.createRadialGradient(W/2,H*.42,20,W/2,H/2,330);ring.addColorStop(0,'#141C36');ring.addColorStop(1,'#080D1E');
  c.fillStyle=ring;c.beginPath();c.arc(W/2,H/2,320,0,6.29);c.fill();
  c.textAlign='center';
  c.fillStyle='#F5C451';c.font='600 16px "Noto Sans SC",sans-serif';c.fillText('F X M   ·   G E N E S I S',W/2,340);
  c.font='900 90px "Noto Serif SC",serif';c.fillText('★',W/2,470);
  c.fillStyle='#FFE3A6';c.font='900 64px "Noto Serif SC",serif';c.fillText('问题发现者',W/2,590);
  c.fillStyle='#F7F2E6';c.font='700 34px "Noto Sans SC",sans-serif';c.fillText(S.name||'小小发明家',W/2,660);
  c.fillStyle='#8A93A6';c.font='500 16px "Noto Sans SC",sans-serif';c.fillText('第 01 章 · 世界为什么不能换一种方式？',W/2,710);
  c.fillText(proposalDate(),W/2,740);
  c.fillStyle='#6D7690';c.font='500 14px "Noto Sans SC",sans-serif';c.fillText('发小明 · 世界创新港 在线课堂',W/2,850);
  c.fillStyle='#F5C451';c.font='500 13px "Noto Sans SC",sans-serif';c.fillText('“发明家是愿意多看一眼、多问一句、多试一次的人。”',W/2,900);
  const a=document.createElement('a');a.download='问题发现者徽章_'+(S.name||'小小发明家')+'.png';a.href=cv.toDataURL('image/png');a.click();
  sfx('success');toast('徽章已下载','🏅');
}

/* =========================================================
   教师指引
   ========================================================= */
function renderNotes(){
  const body=$('#noteBody'),sched=$('#noteSched');
  if(!body||!sched)return;
  sched.innerHTML=CH.map((c,i)=>'<div class="ns-item'+(i===S.ch?' on':'')+'" data-note="'+i+'"><b>'+(i===0?'序':pad(i))+'</b><span>'+c.short+'</span><i>'+c.time+'</i></div>').join('');
  $$('#noteSched .ns-item').forEach(el=>el.addEventListener('click',()=>{ go(+el.dataset.note); }));
  const n=NOTES[S.ch]||NOTES[0];
  body.innerHTML=n.html;
}
function toggleNotes(force){
  const el=$('#notes');
  const open=force==null?!el.classList.contains('open'):force;
  el.classList.toggle('open',open);
  $('#btnNotes').classList.toggle('on',open);
  if(open){ renderNotes(); sfx('tap'); }
}
function toggleFull(){
  if(!document.fullscreenElement){ document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen().catch(()=>{}); }
  else document.exitFullscreen&&document.exitFullscreen().catch(()=>{});
}

/* =========================================================
   重置
   ========================================================= */
function confirmRestart(){
  $('#modalBox').innerHTML='<button class="modal-x" id="modalX">×</button><div style="padding:34px 30px 10px;text-align:center"><h3 style="font-family:var(--serif);font-size:24px;margin-bottom:12px">重新上一次？</h3><p style="font-size:13px;color:var(--dim);line-height:1.9;max-width:460px;margin:0 auto">这会清空这一课的名字、问题、想法、提案和设计图。已经下载的图片不会受影响。</p></div><div class="modal-actions"><button class="btn primary" id="doRestart">清空并重新开始</button><button class="btn ghost" id="cancelRestart">取消</button></div>';
  $('#modal').classList.add('show');
  $('#modalX').onclick=closeModal;$('#cancelRestart').onclick=closeModal;
  $('#doRestart').onclick=()=>{
    S=blank();saveNow();closeModal();undoStack=[];curLens=null;clapEnergy=0;clapCount=0;finaleDone=false;
    const cv=$('#drawCanvas');if(cv)cv.getContext('2d').clearRect(0,0,cv.width,cv.height);
    $('#canvasHint').classList.remove('hide');$('#drawState').textContent='未开始';
    go(0,{instant:true,force:true});toast('已清空，重新开始','↺');sfx('whoosh');
  };
}

/* =========================================================
   事件绑定
   ========================================================= */
function bind(){
  buildDots();
  $('#btnPrev').onclick=()=>go(S.ch-1);
  $('#btnNext').onclick=()=>{ if(S.ch>=CH.length-1){ if(window.FXM45) window.FXM45.show(); else location.href='course-index.html'; return;} go(S.ch+1); };
  $('#btnNotes').onclick=()=>toggleNotes();
  $('#closeNotes').onclick=()=>toggleNotes(false);
  $('#coverNotes').onclick=()=>toggleNotes(true);
  $('#btnSound').onclick=toggleSound;
  $('#btnFull').onclick=toggleFull;
  $$('[data-go]').forEach(el=>el.addEventListener('click',()=>go(+el.dataset.go)));

  /* 01 */
  $$('.hotspot').forEach(h=>h.addEventListener('click',e=>{e.stopPropagation();findUse(h.dataset.use,e);}));
  $('#addUse').onclick=addCustomUse;
  $('#customUseInput').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addCustomUse();}});

  /* 02 */
  $$('.obj-card').forEach(card=>{
    card.addEventListener('click',e=>{
      if(e.target.closest('.nextAlt')||e.target.closest('.back-btn'))return;
      if(!card.classList.contains('flipped'))flipCard(card);
    });
    const nx=$('.nextAlt',card); if(nx)nx.addEventListener('click',e=>{e.stopPropagation();setAlt(card,(S.alts[card.dataset.obj]||0)+1);sfx('pop');});
    const bk=$('.back-btn',card); if(bk)bk.addEventListener('click',e=>{e.stopPropagation();card.classList.remove('flipped');sfx('tap');});
  });
  $$('#voteRows .vote-item').forEach(row=>row.addEventListener('click',e=>vote(row.dataset.vote,e)));

  /* 03 */
  $$('.room-hotspot').forEach(h=>h.addEventListener('click',e=>{
    e.stopPropagation();findProblem(h.dataset.prob,e);
    const panel=$('#roomPanel'),r=panel.getBoundingClientRect();
    const z=document.createElement('div');z.className='zoom-ring';z.style.left=((e.clientX-r.left)/r.width*100)+'%';z.style.top=((e.clientY-r.top)/r.height*100)+'%';panel.appendChild(z);setTimeout(()=>z.remove(),780);
  }));
  $('#obsStart').onclick=toggleObs;
  $('#addProb').onclick=addCustomProblem;
  $('#customProbInput').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addCustomProblem();}});

  /* 04 */
  $('#diceBtn').onclick=randomAngle;
  $('#addIdea').onclick=addIdea;
  $('#ideaInput').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addIdea();}});

  /* 05 */
  $('#addUpgrade').onclick=addUpgrade;
  $('#lensInput').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();addUpgrade();}});

  /* 06 */
  Object.keys(FIELDS).forEach(id=>{
    const el=$('#'+id); if(!el)return;
    el.addEventListener('input',()=>{ S[FIELDS[id]]=el.value; save(); updateProgress(); });
  });
  $$('#whoChips button').forEach(b=>b.addEventListener('click',()=>{
    S.who=b.dataset.who;save();
    $$('#whoChips button').forEach(x=>x.classList.toggle('on',x===b));sfx('tap');updateProgress();
  }));
  $('#genProposal').onclick=genProposal;
  $$('#colors .color').forEach(b=>b.addEventListener('click',()=>{
    dcolor=b.dataset.color;erasing=false;
    $$('#colors .color').forEach(x=>x.classList.toggle('on',x===b));
    $('#eraser').classList.remove('on');sfx('tap');
  }));
  $$('[data-size]').forEach(b=>b.addEventListener('click',()=>{
    dsize=+b.dataset.size;erasing=false;
    $$('[data-size]').forEach(x=>x.classList.toggle('on',x===b));
    $('#eraser').classList.remove('on');sfx('tap');
  }));
  $('#eraser').onclick=()=>{ erasing=!erasing; $('#eraser').classList.toggle('on',erasing); sfx('tap'); };
  $('#undo').onclick=undoDraw;
  $('#clearDraw').onclick=clearDraw;

  /* 07 */
  $('#timerStart').onclick=startTimer;
  $('#timerReset').onclick=resetTimer;
  $('#applauseBtn').onclick=applause;
  $('#nextSpeaker').onclick=nextSpeaker;

  /* 08 */
  $('#dlBadge').onclick=downloadBadge;
  $('#restartBtn').onclick=confirmRestart;

  /* 小组 PK（第 3 幕） */
  const pkState=S.pk=S.pk||{A:0,B:0};
  const renderPk=()=>{ $$('#pkLite .pkl-team').forEach(t=>{ const s=t.querySelector('[data-score]'); if(s)s.textContent=pkState[t.dataset.team]||0; }); };
  $$('#pkLite .pkl-team button').forEach(b=>b.addEventListener('click',()=>{ const t=b.closest('.pkl-team').dataset.team; pkState[t]=(pkState[t]||0)+10; save(); renderPk(); sfx('coin'); toast(t+' 队 +10','⚡'); }));
  renderPk();
  /* 拖拽选想法（第 4 幕） */
  const pz=$('#pickZone');
  if(pz){
    pz.addEventListener('dragover',e=>{e.preventDefault();pz.classList.add('over');});
    pz.addEventListener('dragleave',()=>pz.classList.remove('over'));
    pz.addEventListener('drop',e=>{e.preventDefault();pz.classList.remove('over');const i=parseInt(e.dataTransfer.getData('text/plain'),10);if(!isNaN(i)&&S.ideas[i]){S.picked=i;save();renderIdeas();sfx('success');toast('选好了：带着它去升级','✓');}});
  }
  /* AI 追问（第 4 幕） */
  const AI_PROMPTS=['如果完全不用电，这个问题还能怎么解决？','如果只能用纸板、绳子和胶带，你会怎么做？','如果把它反过来看，会怎样？','如果让一个更小的孩子来用，它需要改什么？','如果只能保留一个功能，你保留哪个？'];
  let aiIdx=0;
  const aiBtn=$('#aiAsk');
  if(aiBtn) aiBtn.addEventListener('click',()=>{ const out=$('#aiOut'); if(!out)return; const p=AI_PROMPTS[aiIdx%AI_PROMPTS.length];aiIdx++; out.innerHTML='<b>AI 追问 · '+aiIdx+'</b><span>'+esc(p)+'</span>';out.classList.remove('show');void out.offsetWidth;out.classList.add('show');sfx('chime'); });
  /* keyboard */
  document.addEventListener('keydown',e=>{
    const t=e.target;
    const typing=t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.tagName==='SELECT'||t.isContentEditable);
    if(e.key==='Escape'){
      if($('#modal').classList.contains('show')){closeModal();return;}
      if($('#notes').classList.contains('open')){toggleNotes(false);return;}
    }
    if(typing)return;
    if(e.key==='ArrowRight'||e.key==='PageDown'||e.key===' '){ e.preventDefault(); if(S.ch>=CH.length-1)return; go(S.ch+1); }
    else if(e.key==='ArrowLeft'||e.key==='PageUp'){ e.preventDefault(); go(S.ch-1); }
    else if(e.key==='t'||e.key==='T'){ e.preventDefault(); toggleNotes(); }
    else if(e.key==='m'||e.key==='M'){ e.preventDefault(); toggleSound(); }
    else if(e.key==='f'||e.key==='F'){ e.preventDefault(); toggleFull(); }
    else if((e.key==='a'||e.key==='A')&&S.ch===7){ e.preventDefault(); applause(); }
  });

  /* modal backdrop */
  $('#modal').addEventListener('click',e=>{ if(e.target===$('#modal'))closeModal(); });

  /* resume audio on first gesture */
  document.addEventListener('pointerdown',()=>{ac();},{once:true});
}

/* =========================================================
   启动
   ========================================================= */
function demo(){
  S.name='小海';S.problem='书包里找一块橡皮，要翻半天';S.who='同学';
  S.solution='会分类的书包';S.how='每个东西都有自己的小格子，一眼就能找到';
  S.improve='想给它加一个会提醒整理的小灯';
  S.found=['bag','cup','chair'];S.selectedProb='bag';
  S.ideas=[{text:'给书包做很多小格子，每样东西放固定位置',tag:'组合'},{text:'用颜色标记，每个口袋只放一类东西',tag:'改变形状'},{text:'做一个会提醒的清单，出门前检查',tag:'不用电'}];
  S.picked=0;S.angle='combine';
  S.upgrades=[{lens:'easy',text:'把最常用的橡皮放在最外面的小口袋',color:'#4FE0D0'},{lens:'fun',text:'给每个口袋画一个小表情，放对了就笑',color:'#F5C451'}];
  S.lenses=['easy','fun'];
  S.uses=['draw','measure','roll'];S.customUses=['当书签'];
  S.alts={cup:1,bag:2,chair:0,umbrella:1};S.explored=['cup','bag','chair'];
  S.votes={cup:5,bag:8,chair:3,umbrella:2};
}
try{
  const q=new URLSearchParams(location.search);
  if(q.get('demo')==='1') demo();
  bind();
  const start=parseInt(q.get('ch')||'0',10)||0;
  S.ch=0;
  go(start,{instant:true,force:true});
  if(start===0) sfx('chime');
  window.L1={
    go, spinPencil, findUse, addCustomUse, flipCard, setAlt, vote,
    findProblem, selectProb, addCustomProblem, setAngle, addIdea,
    openLens, addUpgrade, genProposal, downloadProposal, startTimer, resetTimer, applause, nextSpeaker,
    downloadBadge, toggleNotes, demo, state:()=>S
  };
}catch(err){
  console.error(err);
  document.body.innerHTML='<div style="color:#fff;padding:40px;font-family:sans-serif"><h1>课件加载出错</h1><pre>'+esc(err.stack||err.message)+'</pre></div>';
}
})();
