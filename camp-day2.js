/* =========================================================
   DAY 2 · 想出办法    发小明 除法 + 一专多能 + 乘法
   选一个物件 → 拆成 6 个部件 → 换位置/换时间（除法） → 部件×任务矩阵 → 乘法转盘 → 用户投票
   ========================================================= */
(function(){
'use strict';

/* ---------- 常量 ---------- */
const ATTRS=[
  {k:'count',n:'数量',e:'✕2',q:'复制几份'},
  {k:'pos',n:'位置',e:'↔',q:'挪到哪里'},
  {k:'size',n:'大小',e:'⤢',q:'放大或缩小'},
  {k:'mat',n:'材料',e:'▤',q:'换成什么'},
  {k:'time',n:'时间',e:'◷',q:'什么时候才出现'}
];

const TAGS=[
  {k:'cheap',n:'更便宜',e:'💰',s:'少花钱、少材料'},
  {k:'simple',n:'更简单',e:'✓',s:'少一步、少一个零件'},
  {k:'magic',n:'更神奇',e:'✨',s:'让人「哇」一下'}
];
const TAGN={cheap:'更便宜',simple:'更简单',magic:'更神奇'};
const CRITS=[
  {k:'use',n:'他能用吗',s:'能用'},
  {k:'like',n:'他愿意用吗',s:'愿意'},
  {k:'done',n:'今天能做完吗',s:'做完'}
];

/* ---------- 六个物件：每个 6 个部件 + 自己的一张简图 ---------- */
const OBJ=[
{id:'bag',emoji:'🎒',name:'书包',who:'学生 · 每天背',short:'肩带勒、本子找不到',
 complaint:'书一多，肩带勒得肩膀疼；想找一本本子，得把整个包倒出来。',
 tasks:[{k:'拿',e:'📚',label:'把今天要用的书拿出来'},{k:'放',e:'🎒',label:'把作业本塞回去'},{k:'找',e:'🔎',label:'翻出橡皮和饭卡'}],
 mcore:[1,2,3,4],
 svg:`<svg class="d2-svg" viewBox="0 0 400 400" aria-hidden="true">
   <ellipse cx="200" cy="356" rx="98" ry="9" fill="rgba(var(--acc-rgb),.08)"/>
   <path class="st dim" d="M152 120 C112 170 108 270 124 332" style="stroke-width:16;opacity:.28"/>
   <path class="st dim" d="M248 120 C288 170 292 270 276 332" style="stroke-width:16;opacity:.28"/>
   <rect class="fl" x="118" y="98" width="164" height="246" rx="36"/>
   <path class="fl2" d="M118 134 Q118 100 156 100 H244 Q282 100 282 134 V160 Q282 174 266 174 H134 Q118 174 118 160 Z"/>
   <path class="st" d="M170 102 Q200 64 230 102" style="stroke-width:7"/>
   <path class="st" d="M124 198 H276" style="stroke-dasharray:3 5;opacity:.8"/>
   <rect x="188" y="192" width="24" height="12" rx="4" fill="rgba(var(--acc-rgb),.55)"/>
   <rect class="fl2" x="156" y="226" width="88" height="66" rx="16"/>
   <path class="st dim" d="M168 244 H232" style="stroke-dasharray:2 4"/>
   <path class="st" d="M118 238 q-30 6 -30 34 q0 26 32 30"/>
   <path class="st" d="M282 238 q30 6 30 34 q0 26 -32 30"/>
   <path class="st dim" d="M134 322 H266" style="stroke-width:3"/>
 </svg>`,
 parts:[
  {n:'提手',t:'单手提起来，拎着走',spot:'包的顶上',alt:'包的侧面',mat:'硬一点的织带',time:'拎着走的时候',x:50,y:19},
  {n:'肩带',t:'把重量分到两个肩膀',spot:'包背面',alt:'包正面',mat:'宽的软垫带',time:'背起来的时候',x:75,y:55},
  {n:'主袋',t:'装下所有书',spot:'包的正中间',alt:'包的底部',mat:'半透明的网布',time:'装书的时候',x:34,y:72},
  {n:'前袋',t:'放小东西，和书混在一起',spot:'包的正前方',alt:'包的底部外侧',mat:'硬壳',time:'放小东西的时候',x:50,y:64},
  {n:'侧兜',t:'插水杯，常常掉出来',spot:'包的左右两侧',alt:'包的正前方',mat:'弹力布',time:'插水杯的时候',x:23,y:66},
  {n:'拉链',t:'把包合上，防止东西掉',spot:'包口',alt:'包的侧边',mat:'磁吸扣',time:'开合的时候',x:50,y:49.5}
 ]},

{id:'umbrella',emoji:'☂️',name:'雨伞',who:'下雨天 · 手上还拎东西',short:'收起来滴水、没处挂',
 complaint:'雨一大，收起来的伞一路滴水；手里还拎着东西，根本没地方挂。',
 tasks:[{k:'撑',e:'☂️',label:'下雨时把它打开'},{k:'收',e:'🌧️',label:'进屋前收起来'},{k:'挂',e:'🪝',label:'挂在桌边或包上'}],
 mcore:[0,1,3,4],
 svg:`<svg class="d2-svg" viewBox="0 0 400 400" aria-hidden="true">
   <path class="fl" d="M56 208 Q200 26 344 208 Q308 188 272 208 Q236 188 200 208 Q164 188 128 208 Q92 188 56 208 Z"/>
   <path class="st dim" d="M200 44 L124 200 M200 44 L200 204 M200 44 L276 200" style="opacity:.55"/>
   <path class="st" d="M200 22 V44" style="stroke-width:6"/>
   <path class="st" d="M200 206 V334" style="stroke-width:6"/>
   <path class="st" d="M200 334 q0 34 -30 34 q-24 0 -24 -22" style="stroke-width:8"/>
   <path class="st" d="M226 258 q20 6 0 16" style="stroke-width:5"/>
   <circle cx="200" cy="20" r="4.5" fill="rgba(var(--acc-rgb),.6)"/>
 </svg>`,
 parts:[
  {n:'伞面',t:'挡雨',spot:'最上面',alt:'往下挪 10 厘米',mat:'双层布',time:'下雨的时候',x:34,y:36},
  {n:'伞骨',t:'把伞面撑开',spot:'伞面下面',alt:'伞面上面',mat:'碳素杆',time:'撑开的时候',x:67,y:45},
  {n:'伞尖',t:'顶住地面，收伞时先着地',spot:'伞的最顶端',alt:'伞柄末端',mat:'软胶',time:'收伞的时候',x:50,y:6},
  {n:'伞杆',t:'握住，把伞举高',spot:'伞的中间',alt:'伞的侧面',mat:'可伸缩的杆',time:'举着的时候',x:50,y:72},
  {n:'伞柄',t:'手抓的地方，也能挂',spot:'手抓的位置',alt:'伞杆中间',mat:'带挂钩的',time:'收起来的时候',x:43,y:88},
  {n:'伞扣',t:'收起来时把伞绑住',spot:'伞面外侧',alt:'伞柄上',mat:'魔术贴',time:'收伞的时候',x:58,y:64}
 ]},

{id:'hanger',emoji:'🧥',name:'衣架',who:'衣柜 · 衣服总滑下来',short:'衣服滑、肩上留印',
 complaint:'衣架太宽，小衣服一挂就滑下来；裤子挂久了，肩上留两道印。',
 tasks:[{k:'挂',e:'🧥',label:'把衣服挂上去'},{k:'取',e:'✋',label:'拿下来穿'},{k:'收',e:'📦',label:'不用时收起来'}],
 mcore:[1,2,3,4],
 svg:`<svg class="d2-svg" viewBox="0 0 400 400" aria-hidden="true">
   <path class="st" d="M200 48 c0 -24 32 -28 32 -4 c0 18 -32 12 -32 32 v20" style="stroke-width:8"/>
   <circle cx="200" cy="100" r="7" fill="rgba(var(--acc-rgb),.6)"/>
   <path class="st" d="M200 102 L74 198 M200 102 L326 198" style="stroke-width:11"/>
   <path class="st dim" d="M74 198 q-10 18 16 28" style="stroke-width:5;opacity:.55"/>
   <path class="st dim" d="M326 198 q10 18 -16 28" style="stroke-width:5;opacity:.55"/>
   <path class="st" d="M92 226 H308" style="stroke-width:9"/>
   <rect class="fl2" x="104" y="220" width="26" height="34" rx="8"/>
   <rect class="fl2" x="270" y="220" width="26" height="34" rx="8"/>
   <path class="st" d="M134 178 l10 6 M156 162 l10 6" style="opacity:.55;stroke-width:2.4"/>
 </svg>`,
 parts:[
  {n:'挂钩',t:'挂在杆子上，能转方向',spot:'最顶上',alt:'横杆下面',mat:'能锁住的钩',time:'挂上去的时候',x:50,y:12},
  {n:'肩膀',t:'撑住衣服的肩线',spot:'两侧斜边',alt:'中间',mat:'可伸缩的肩',time:'撑衣服的时候',x:30,y:42},
  {n:'横杆',t:'挂裤子，或者搭围巾',spot:'底下',alt:'中间',mat:'带凹槽的杆',time:'挂裤子的时候',x:50,y:56},
  {n:'夹子',t:'夹住裙子和袜子',spot:'横杆两端',alt:'肩膀中间',mat:'布包夹',time:'夹裙子的时候',x:70,y:60},
  {n:'防滑条',t:'让衣服不打滑',spot:'肩膀上面',alt:'横杆上',mat:'硅胶',time:'挂滑的衣服时',x:40,y:42},
  {n:'连接处',t:'把钩子和肩膀连起来',spot:'钩子和肩膀之间',alt:'侧面',mat:'转轴',time:'转方向的时候',x:50,y:25}
 ]},

{id:'cup',emoji:'🥤',name:'水杯',who:'上课 · 放侧兜就漏',short:'侧兜里漏、拧不开',
 complaint:'杯子放书包侧兜，一歪就漏；上课想喝，一只手拧不开。',
 tasks:[{k:'装',e:'💧',label:'灌满水'},{k:'喝',e:'🥤',label:'单手打开喝'},{k:'带',e:'🎒',label:'放进书包侧兜'}],
 mcore:[0,1,2,3],
 svg:`<svg class="d2-svg" viewBox="0 0 400 400" aria-hidden="true">
   <path class="fl" d="M150 152 H250 L240 320 H160 Z"/>
   <rect class="fl2" x="138" y="108" width="124" height="46" rx="14"/>
   <rect class="fl2" x="176" y="88" width="48" height="22" rx="9"/>
   <path class="st" d="M252 162 q34 8 34 40 q0 32 -34 40" style="stroke-width:8"/>
   <path class="st dim" d="M170 198 h18 M168 230 h18 M166 262 h18" style="stroke-width:3;opacity:.6"/>
   <rect class="fl2" x="158" y="314" width="84" height="16" rx="8"/>
   <path class="st dim" d="M154 152 H246" style="opacity:.5"/>
 </svg>`,
 parts:[
  {n:'杯盖',t:'盖住，防漏',spot:'最上面',alt:'杯身侧面',mat:'软的',time:'盖上时',x:40,y:30},
  {n:'翻盖',t:'开一个小口喝水',spot:'杯盖中间',alt:'杯盖边缘',mat:'推拉口',time:'喝水时',x:55,y:24},
  {n:'杯身',t:'装水，握在手里',spot:'中间',alt:'下半截',mat:'双层玻璃',time:'握着时',x:50,y:66},
  {n:'提环',t:'手指勾着拎',spot:'杯盖边上',alt:'杯身侧面',mat:'弹力绳',time:'拎着时',x:71,y:51},
  {n:'刻度',t:'看还剩多少水',spot:'杯身外侧',alt:'杯身里面',mat:'凹凸的',time:'看水量时',x:42,y:52},
  {n:'防滑垫',t:'放桌上不打滑',spot:'杯底',alt:'杯身侧面',mat:'硅胶圈',time:'放桌上时',x:50,y:81}
 ]},

{id:'slipper',emoji:'🩴',name:'拖鞋',who:'浴室门口 · 一踩就滑',short:'湿地面打滑、磨脚背',
 complaint:'洗完澡出来，鞋底一踩水就打滑；鞋面带老把脚背磨红。',
 tasks:[{k:'穿',e:'🦶',label:'一脚蹬进去'},{k:'走',e:'🚿',label:'在湿地面走'},{k:'放',e:'🚪',label:'在门口排整齐'}],
 mcore:[0,1,2,3],
 svg:`<svg class="d2-svg" viewBox="0 0 400 400" aria-hidden="true">
   <path class="fl" d="M200 56 C296 56 340 128 340 214 C340 300 288 348 200 348 C112 348 60 300 60 214 C60 128 104 56 200 56 Z"/>
   <path class="fl2" d="M200 86 C240 86 264 112 264 152 C264 210 248 252 200 270 C152 252 136 210 136 152 C136 112 160 86 200 86 Z" style="opacity:.4"/>
   <path class="st" d="M120 238 Q158 192 194 160" style="stroke-width:22;opacity:.7"/>
   <path class="st" d="M280 238 Q242 192 206 160" style="stroke-width:22;opacity:.7"/>
   <circle cx="200" cy="154" r="10" fill="rgba(var(--acc-rgb),.65)"/>
   <path class="st dim" d="M152 292 H248 M166 308 H234" style="stroke-width:3;opacity:.5"/>
   <path class="st" d="M140 326 Q200 304 260 326" style="stroke-width:9;opacity:.42"/>
 </svg>`,
 parts:[
  {n:'鞋面',t:'压住脚背，让鞋不掉',spot:'脚背上面',alt:'脚背侧面',mat:'软的布',time:'穿的时候',x:44,y:45},
  {n:'鞋底',t:'踩在地上',spot:'最下面',alt:'中间夹一层',mat:'EVA',time:'走路时',x:28,y:62},
  {n:'夹趾',t:'卡在脚趾之间',spot:'脚趾之间',alt:'鞋面中间',mat:'布条',time:'穿的时候',x:52,y:37},
  {n:'防滑纹',t:'抓住地面',spot:'鞋底下面',alt:'鞋底侧面',mat:'橡胶颗粒',time:'踩水时',x:50,y:75},
  {n:'后跟带',t:'走路时不让鞋飞出去',spot:'后跟',alt:'脚背上面',mat:'弹力带',time:'走路时',x:67,y:80},
  {n:'鞋边',t:'包住脚边，不磨脚',spot:'鞋的四周',alt:'只有后跟',mat:'软包边',time:'磨脚时',x:85,y:55}
 ]},

{id:'lunchbox',emoji:'🍱',name:'饭盒',who:'午饭 · 汤会串格',short:'汤会串格、扣太紧',
 complaint:'汤一格洒到饭上；盖子卡扣太紧，一年级的小孩打不开。',
 tasks:[{k:'装',e:'🍚',label:'把菜分格装好'},{k:'开',e:'🔓',label:'自己打开盖子'},{k:'带',e:'🎒',label:'拎去学校'}],
 mcore:[0,2,3,4],
 svg:`<svg class="d2-svg" viewBox="0 0 400 400" aria-hidden="true">
   <rect class="fl" x="92" y="152" width="216" height="168" rx="18"/>
   <rect class="fl2" x="84" y="108" width="232" height="56" rx="18"/>
   <path class="st" d="M170 108 Q200 74 230 108" style="stroke-width:7"/>
   <rect class="fl2" x="100" y="150" width="28" height="34" rx="9"/>
   <rect class="fl2" x="272" y="150" width="28" height="34" rx="9"/>
   <path class="st dim" d="M200 168 V308" style="stroke-dasharray:4 6;opacity:.55"/>
   <path class="st dim" d="M112 198 H188 M212 198 H288" style="stroke-width:3;opacity:.45"/>
   <circle cx="288" cy="134" r="7" fill="rgba(var(--acc-rgb),.55)"/>
 </svg>`,
 parts:[
  {n:'盒盖',t:'盖住，保一点温',spot:'最上面',alt:'盒身侧面',mat:'透明的',time:'打开时',x:35,y:31},
  {n:'盒身',t:'装饭菜',spot:'中间',alt:'下半截',mat:'不锈钢',time:'装饭时',x:34,y:68},
  {n:'卡扣',t:'扣紧，防洒',spot:'两侧',alt:'前面',mat:'磁吸',time:'扣上时',x:68,y:42},
  {n:'分隔格',t:'把菜分开',spot:'盒子里面',alt:'盒盖内侧',mat:'可移动的',time:'装菜时',x:50,y:60},
  {n:'提手',t:'拎着走',spot:'盒盖上面',alt:'盒身侧面',mat:'布带',time:'拎着时',x:50,y:20},
  {n:'透气孔',t:'放热气，不闷',spot:'盒盖上',alt:'盒身侧面',mat:'一个小阀',time:'装热菜时',x:74,y:32}
 ]}
];

/* ---------- 小工具 ---------- */
const getObj=S=>OBJ.find(o=>o.id===S.obj)||OBJ[0];
const attrOf=k=>ATTRS.find(a=>a.k===k)||ATTRS[0];
const ck=(p,a)=>p+'|'+a;
const letter=i=>'ABC'[i]||'?';

function variantText(P,a){
  switch(a){
    case 'count':return '把「'+P.n+'」做成 2 个：一个照旧，一个多做一件事。';
    case 'pos':return '把「'+P.n+'」从'+P.spot+'挪到'+P.alt+'。';
    case 'size':return '把「'+P.n+'」放大到两倍，或者缩到一半。';
    case 'mat':return '把「'+P.n+'」的材料换成'+P.mat+'。';
    case 'time':return '让「'+P.n+'」只在'+P.time+'才出现、才打开。';
    default:return '';
  }
}

function ensureDirs(S){
  if(!Array.isArray(S.dirs))S.dirs=[null,null,null];
  S.dirs=S.dirs.slice(0,3);
  while(S.dirs.length<3)S.dirs.push(null);
}

function scoreOf(S,d){
  const v=(S.scores||{})[ck(d.p,d.a)];
  return Array.isArray(v)?v:[];
}
function totalOf(S,d){return scoreOf(S,d).reduce((a,b)=>a+(b||0),0);}

function rankDirs(S,o){
  const fav=S.fav||'';
  const rows=(S.dirs||[]).map((d,i)=>{
    if(!d)return null;
    const P=o.parts[d.p];
    if(!P)return null;
    return {i:i,d:d,P:P,total:totalOf(S,d),third:(scoreOf(S,d)[2]||0),
      fav:(ck(d.p,d.a)===fav)};
  }).filter(Boolean);
  rows.sort((a,b)=>b.total-a.total||b.third-a.third||((b.fav?1:0)-(a.fav?1:0))||a.i-b.i);
  return rows;
}

function votesDone(S){
  const dirs=(S.dirs||[]).filter(Boolean);
  if(dirs.length<3)return false;
  return dirs.every(d=>{
    const sc=scoreOf(S,d);
    return sc.length===3&&sc.every(v=>v>=1);
  });
}

function wipe(S){
  S.found=[];S.foundObj='';S.ideas=[];S.ideasObj='';
  S.vars=[];S.dirs=[null,null,null];S.dirsObj='';
  S.scores={};S.fav='';S.keep='';S.fail=false;S.reason='';S.draw='';
  S.wp=-1;S.wa='';
}

/* ---------- 证据卡内容（幕 6 与幕 7 共用） ---------- */
function buildEvidence(S){
  const o=getObj(S);
  const dirs=S.dirs||[];
  const all=dirs.map((d,i)=>{
    if(!d||!o.parts[d.p])return null;
    return {i:i,P:o.parts[d.p],d:d,total:totalOf(S,d)};
  }).filter(Boolean);
  const rows=rankDirs(S,o);
  const keep=rows[0]||null;
  const dirText=all.map(r=>letter(r.i)+' '+TAGN[r.d.tag]+'：'+variantText(r.P,r.d.a)).join('\n')||'还没做';
  const resultText=rows.length
    ? all.map(r=>letter(r.i)+' '+r.total+' 分'+(keep&&r.i===keep.i?'（留下）':'（淘汰）')).join('；')
    : '还没投票';
  const found=(S.found||[]).map(i=>o.parts[i]).filter(Boolean);
  const dv=[];
  o.parts.forEach((p,i)=>{
    const sp=(S.div&&S.div.s[i])||0, ti=(S.div&&S.div.t[i])||0;
    if(sp===1)dv.push(p.n+'：'+p.spot+'→'+p.alt);
    if(ti===1)dv.push(p.n+'：'+p.time+'→提前');
    if(ti===2)dv.push(p.n+'：'+p.time+'→延后');
  });
  return {
    title:'第 2 天 · 点子卡',
    short:keep?('拆 6 个部件，留 '+letter(keep.i)+' 号方向'):(o.name+' · 拆开看'),
    fields:[
      {label:'我选的物件',value:o.emoji+' '+o.name+' · '+o.short},
      {label:'我发现的部件',value:found.length?found.map(p=>p.n).join('、')+'（'+found.length+'/6）':'还没拆'},
      {label:'重排的 3 处',value:dv.length?dv.join('；'):'还没重排'},
      {label:'3 个方向',value:dirText},
      {label:'投票结果',value:resultText},
      {label:'留下的方向 + 一句理由',value:keep?(letter(keep.i)+' '+TAGN[keep.d.tag]+'：'+variantText(keep.P,keep.d.a)+' —— '+(S.reason||'还没写理由')):'还没投票'}
    ],
    stamp:'点子卡'
  };
}

/* ---------- 封面 ---------- */
const c={
no:'2',title:'想出办法',kicker:'DAY 2 / 5 · IDEATE',
line1:'想三个办法',line2:'只留一个',
lead:'昨天你找到<b>一个具体的人</b>和一个卡住他的时刻。<br>今天为他拆一件东西，想出 <b>3 个方向</b>，再用投票砍掉 2 个。',
tool:'除法 + 一专多能 + 乘法',words:['拆开','重排','合并','复制'],
meta:['7 幕 · 全天','混龄 7–13 大带小','材料：纸板 + 吸管'],
acc:'#4FE0D0',acc2:'#DFFFFA',rgb:'79,224,208',

acts:[
/* ================= 01 选一个物件 ================= */
{a:'01',name:'选一个物件',time:'30 分',html:`
<div class="ch-head"><div class="act"><b>01</b><span>选一个物件</span><i>不看"最新"，看"最熟"</i></div><h2>先选一件<em>普通到被忽略</em>的东西</h2><p>今天不改它，先把它拆开。选一件<em>你每天都见、有人抱怨过</em>的东西——书包、雨伞、饭盒都行。</p></div>
<div class="cp-hud"><span class="hp brand">发小明 · 一专多能</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">物件 <b data-oname>—</b></span></div>
<div class="cp-split d2-split">
  <div class="cp-stage d2-stage">
    <div class="cp-stage-label">OBJECT DECK · 选一件你真的用过的东西</div>
    <div class="d2-objgrid" data-objs>${OBJ.map((o,i)=>`<button class="d2-objcard" data-o="${o.id}"><i class="oc-no">0${i+1}</i><span class="oc-e">${o.emoji}</span><span class="oc-n">${o.name}</span><span class="oc-s">${o.short}</span></button>`).join('')}</div>
    <div class="d2-objfoot"><span>🔧 能拆开</span><span>🗣 有人抱怨</span><span>⏱ 今天能改</span><em>三条都占，才值得做</em></div>
    <div class="d2-pipe"><span>① 拆开</span><i></i><span>② 合并</span><i></i><span>③ 复制</span><i></i><span>④ 投票</span></div>
  </div>
  <div class="cp-side">
    <div class="cp-panel"><h4>这个物件最常被抱怨的一件事</h4><div class="d2-complaint" data-complaint><span class="muted">还没选。左边点一张卡。</span></div></div>
    <div class="cp-panel"><h4>他做这件事，要做的 3 个动作</h4><div class="d2-tasklist" data-tasks><span class="muted">选完物件再显示</span></div></div>
    <div class="cp-coach"><div class="rb">🤖</div><div class="say"><b>发小明：</b>别急着说"我要发明一个……"。先选一件<em>每天都在用的东西</em>——越普通，越容易拆。</div></div>
    <div class="cp-note" data-note><b>先选一件东西：</b>今天就拆它，不换。</div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>把它拆开 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;S.obj=S.obj||'';
  const comp=sec.querySelector('[data-complaint]'),tasks=sec.querySelector('[data-tasks]'),
        next=sec.querySelector('[data-next]'),note=sec.querySelector('[data-note]'),
        hud=sec.querySelector('[data-oname]'),xpb=sec.querySelector('[data-xp]');
  function paint(){
    sec.querySelectorAll('[data-o]').forEach(b=>b.classList.toggle('on',b.dataset.o===S.obj));
    const o=OBJ.find(x=>x.id===S.obj);
    xpb.textContent=S.xp||0;
    if(!o){
      comp.innerHTML='<span class="muted">还没选。左边点一张卡。</span>';
      tasks.innerHTML='<span class="muted">选完物件再显示</span>';
      hud.textContent='—';next.disabled=true;
      note.innerHTML='<b>先选一件东西：</b>今天就拆它，不换。';
      return;
    }
    comp.innerHTML='<div class="d2-cwho"><span>'+o.emoji+'</span><b>'+o.name+'</b><em>'+o.who+'</em></div><p>'+o.complaint+'</p>';
    tasks.innerHTML=o.tasks.map(t=>'<div class="d2-task"><b>'+t.e+'</b><span><i>'+t.k+'</i>'+t.label+'</span></div>').join('');
    hud.textContent=o.name;next.disabled=false;
    note.innerHTML='<b>可以了：</b>今天不换物件，只把它拆开、再拼回去。';
  }
  sec.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{
    const id=b.dataset.o;
    if(S.obj!==id){S.obj=id;wipe(S);}
    api.save();paint();api.sfx('pop');
    if(!S._xp1){S._xp1=1;api.addXp(5);}
    paint();
  });
  next.onclick=()=>api.go(2);
  paint();
}},

/* ================= 02 拆开看 ================= */
{a:'02',name:'拆开看',time:'45 分',html:`
<div class="ch-head"><div class="act"><b>02</b><span>拆开看</span><i>点亮点，找出部件</i></div><h2>它其实是<em>6 块拼起来的</em></h2><p>图上的亮点，每一个都是一块能单独拆下来的部件。点开它，说出它<em>现在在干什么活</em>。</p></div>
<div class="cp-hud"><span class="hp brand">发小明 · 一专多能</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">部件 <b data-found>0</b>/6</span></div>
<div class="cp-split d2-split d2-split-wide">
  <div class="cp-stage d2-stage">
    <div class="cp-stage-label" data-label>EXPLODED VIEW · 点亮点找部件</div>
    <div class="d2-boardwrap"><div class="d2-board" data-board></div></div>
  </div>
  <div class="cp-side">
    <div class="cp-panel"><h4>部件清单 <span data-count>0/6</span></h4><div class="d2-plist" data-plist></div></div>
    <div class="cp-panel"><h4>它现在在干什么</h4><div class="d2-pdetail" data-pdetail><span class="muted">点一个亮点。</span></div></div>
    <div class="cp-note" data-note><b>怎么算一个部件：</b>能单独拆下来的一块，才算。</div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>用工具改 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;const o=getObj(S);
  if(S.foundObj!==o.id){S.found=[];S.foundObj=o.id;api.save();}
  S.found=S.found||[];
  const board=sec.querySelector('[data-board]'),plist=sec.querySelector('[data-plist]'),
        pdetail=sec.querySelector('[data-pdetail]'),next=sec.querySelector('[data-next]'),
        note=sec.querySelector('[data-note]'),xpb=sec.querySelector('[data-xp]'),
        foundb=sec.querySelector('[data-found]'),count=sec.querySelector('[data-count]'),
        label=sec.querySelector('[data-label]');
  label.textContent='EXPLODED VIEW · '+o.name+' · 点亮点找部件';
  board.innerHTML='<div class="d2-drawing">'+o.svg+'</div>'+o.parts.map((p,i)=>
    '<button class="d2-hot" data-h="'+i+'" style="left:'+p.x+'%;top:'+p.y+'%" aria-label="亮点 '+(i+1)+'"><i>'+(i+1)+'</i></button>'
  ).join('')+'<div class="d2-board-tag">'+o.emoji+' '+o.name+'</div>';

  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>{
      const i=+b.dataset.h,on=S.found.includes(i);
      b.classList.toggle('on',on);
      b.querySelector('i').textContent=on?'✓':(i+1);
    });
    plist.innerHTML=o.parts.map((p,i)=>{
      const on=S.found.includes(i);
      return '<div class="d2-pr'+(on?' on':'')+'"><b>'+(i+1)+'</b><span>'+(on?p.n:'？')+'</span></div>';
    }).join('');
    const n=S.found.length;
    foundb.textContent=n;count.textContent=n+'/6';xpb.textContent=S.xp||0;
    const last=S.found[n-1];
    if(typeof last==='number'&&o.parts[last]){
      const p=o.parts[last];
      pdetail.innerHTML='<div class="d2-pdh"><b>'+p.n+'</b><span>部件 '+(last+1)+'</span></div>'+
        '<p class="d2-pdt">它现在干的活：'+p.t+'</p>'+
        '<p class="d2-pdq">顺便问一句：如果它不干了，这个物件会怎样？</p>';
    }else{
      pdetail.innerHTML='<span class="muted">点一个亮点。</span>';
    }
    next.disabled=n<6;
    if(n<6)note.innerHTML='<b>还差 '+(6-n)+' 个：</b>点图上还在闪的亮点。一个部件 = 能单独拆下来的一块。';
    else note.innerHTML='<b>6 个都找到了：</b>下一步把它们排成一行，看看每个部件还能顺便干点什么。';
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{
    const i=+b.dataset.h;
    if(S.found.includes(i)){api.sfx('tap');paint();return;}
    S.found=S.found.concat(i);api.save();paint();api.sfx('pop');
    const r=b.getBoundingClientRect();
    api.burst(r.left+r.width/2,r.top+r.height/2,14);
    if(S.found.length===6){api.sfx('success');api.confetti(60);api.toast('6 个部件都找到了','🔍');}
  });
  paint();
  if(!S._xp2){S._xp2=1;api.addXp(10);}
  next.onclick=()=>api.go(3);
}},

/* ================= 03 重排（除法） ================= */
{a:'03',name:'重排',time:'45 分',html:`
<div class="ch-head"><div class="act"><b>03</b><span>重排</span><i>发小明 · 除法</i></div><h2>部件一个不少，<em>只换位置和时间</em></h2><p>6 个部件都还在。把其中几个挪到<em>别的位置</em>，或者挪到<em>别的时间</em>，再拼回去——看看会冒出新的用法，还是冒出没人管的事。</p></div>
<div class="cp-hud"><span class="hp brand">发小明 · 除法</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">挪动 <b data-mv>0</b>/3</span></div>
<div class="cp-split d2-split d2-split-wide">
  <div class="cp-stage d2-stage">
    <div class="cp-stage-label" data-label>DIVISION · 拆开之后，按空间或时间重新排</div>
    <div class="d2-divlegend"><span class="dl-o" data-legend></span><span><b>空间</b>它待在哪儿</span><span><b>时间</b>它什么时候出手</span><span class="dl-rule">部件全在 · 只挪位置和时间</span></div>
    <div class="d2-divrows" data-rows></div>
  </div>
  <div class="cp-side">
    <div class="cp-panel"><h4>重排卡 <span data-mcount>0/3</span></h4><div class="d2-divlist" data-list></div></div>
    <div class="cp-coach"><div class="rb">🤖</div><div class="say"><b>发小明：</b>位置一变，功能就可能变。先挪，别急着判断好不好。</div></div>
    <div class="cp-note" data-note></div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>去一专多能 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;const o=getObj(S);
  if(S.divObj!==o.id){S.div={s:{},t:{}};S.divObj=o.id;api.save();}
  S.div=S.div||{s:{},t:{}};S.div.s=S.div.s||{};S.div.t=S.div.t||{};
  const rows=sec.querySelector('[data-rows]'),list=sec.querySelector('[data-list]'),
        note=sec.querySelector('[data-note]'),next=sec.querySelector('[data-next]'),
        xpb=sec.querySelector('[data-xp]'),mvb=sec.querySelector('[data-mv]'),mcount=sec.querySelector('[data-mcount]');
  const legend=sec.querySelector('[data-legend]');if(legend)legend.textContent=o.emoji+' '+o.name;
  const TL=['现在','提前','延后'];
  const tWhy=(p,v)=>v===0?('现在 · '+p.time):v===1?'提前到用它之前':'挪到用完之后';

  function moves(){
    const out=[];
    o.parts.forEach((p,i)=>{
      const s=S.div.s[i]||0,t=S.div.t[i]||0;
      if(s===1)out.push({n:p.n,txt:'位置：'+p.spot+' → '+p.alt});
      if(t===1)out.push({n:p.n,txt:'时间：'+p.time+' → 提前到用它之前'});
      if(t===2)out.push({n:p.n,txt:'时间：'+p.time+' → 挪到用完之后'});
    });
    return out;
  }

  function paint(){
    rows.innerHTML=o.parts.map((p,i)=>{
      const s=S.div.s[i]||0,t=S.div.t[i]||0,on=s===1||t>0;
      return '<div class="d2-divrow'+(on?' on':'')+'">'+
        '<div class="dr-name"><b>'+p.n+'</b><i>'+p.t+'</i></div>'+
        '<div class="dr-ctl"><span>位置</span>'+
          '<button data-d="s" data-i="'+i+'" data-v="0" class="'+(s===0?'on':'')+'">'+p.spot+'</button>'+
          '<button data-d="s" data-i="'+i+'" data-v="1" class="'+(s===1?'on':'')+'" title="挪到：'+p.alt+'">'+p.alt+'</button></div>'+
        '<div class="dr-ctl"><span>时间</span>'+
          TL.map((lab,k)=>'<button data-d="t" data-i="'+i+'" data-v="'+k+'" class="'+(t===k?'on':'')+'" title="'+tWhy(p,k)+'">'+lab+'</button>').join('')+
        '</div></div>';
    }).join('');

    rows.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{
      const i=+b.dataset.i,d=b.dataset.d,v=+b.dataset.v;
      const box=d==='s'?S.div.s:S.div.t;
      if((box[i]||0)===v){api.sfx('tap');return;}
      const before=moves().length;
      box[i]=v;api.save();api.sfx('pop');
      paint();
      if(before<3&&moves().length>=3){api.sfx('success');api.confetti(50);api.toast('已经挪了 3 处','🔀');}
    });

    const mv=moves(),n=mv.length;
    list.innerHTML=n?mv.map((m,k)=>'<div class="d2-divitem"><b>'+(k+1)+'</b><span>'+m.n+' · '+m.txt+'</span></div>').join('')
      :'<span class="muted">还没挪。上面点一个"别的位置"，或者把时间改成"提前 / 延后"。</span>';
    mvb.textContent=n;mcount.textContent=n+'/3';xpb.textContent=S.xp||0;
    next.disabled=n<3;
    if(n<3)note.innerHTML='<b>还差 '+(3-n)+' 处：</b>换个位置、或者把时间提前/延后，都算挪。';
    else note.innerHTML='<b>3 处够了。</b>现在问一句：<em>原来那个位置、那个时间段，现在谁在管这件事？</em>挪走之后没人管的那件事，就是下一步要补的。';
  }
  paint();
  if(!S._xpDiv){S._xpDiv=1;api.addXp(15);}
  next.onclick=()=>api.go(4);
}},

/* ================= 04 用工具改（部件×任务） ================= */
{a:'04',name:'用工具改',time:'50 分',html:`
<div class="ch-head"><div class="act"><b>04</b><span>用工具改</span><i>发小明 · 一专多能</i></div><h2>一个部件，<em>能不能顺手干两件事</em></h2><p>左边三行是他要做的动作，上面四列是部件。点一格——<em>让一个部件同时干两件事</em>，集满 3 张点子卡。</p></div>
<div class="cp-hud"><span class="hp brand">发小明 · 一专多能</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">点子 <b data-ic>0</b>/3</span></div>
<div class="cp-split d2-split">
  <div class="cp-stage d2-stage">
    <div class="cp-stage-label" data-label>MATRIX · 点一格 = 一个"合并"的点子</div>
    <div class="d2-mx" data-mx></div>
  </div>
  <div class="cp-side">
    <div class="cp-panel"><h4>点子卡 <span data-icount>0/3</span></h4><div class="d2-ideas" data-ideas></div></div>
    <div class="cp-note" data-note></div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>去乘法转盘 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;const o=getObj(S);
  if(S.ideasObj!==o.id){S.ideas=[];S.ideasObj=o.id;api.save();}
  S.ideas=S.ideas||[];
  if(S.ideas.length>3)S.ideas=S.ideas.slice(0,3);
  const mx=sec.querySelector('[data-mx]'),ideas=sec.querySelector('[data-ideas]'),
        next=sec.querySelector('[data-next]'),note=sec.querySelector('[data-note]'),
        xpb=sec.querySelector('[data-xp]'),ic=sec.querySelector('[data-ic]'),icount=sec.querySelector('[data-icount]'),
        label=sec.querySelector('[data-label]');
  label.textContent='MATRIX · '+o.name+' · 点一格 = 一个"合并"的点子';
  const cols=o.mcore.map(i=>({i:i,p:o.parts[i]}));

  function paint(){
    let h='<div class="mx-corner"><b>部件</b><span>任务</span></div>';
    h+=cols.map(c=>'<div class="mx-ph"><span>'+c.p.n+'</span><i>'+c.p.t+'</i></div>').join('');
    o.tasks.forEach((t,ti)=>{
      h+='<div class="mx-th"><span>'+t.e+'</span><b>'+t.k+'</b><i>'+t.label+'</i></div>';
      cols.forEach(c=>{
        const k=c.i+'|'+ti,idx=S.ideas.indexOf(k);
        h+='<button class="d2-cell'+(idx>=0?' on':'')+'" data-p="'+c.i+'" data-t="'+ti+'">'+
           '<span class="cl-plus">＋</span><span class="cl-on">'+(idx>=0?('点子 '+(idx+1)):'')+'</span></button>';
      });
    });
    mx.innerHTML=h;
    mx.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{
      const k=b.dataset.p+'|'+b.dataset.t;
      if(S.ideas.includes(k))S.ideas=S.ideas.filter(x=>x!==k);
      else{
        if(S.ideas.length>=3){api.sfx('error');api.toast('已经 3 张了，先拿掉一张再点新的','✋');return;}
        S.ideas=S.ideas.concat(k);
      }
      api.save();api.sfx(S.ideas.includes(k)?'pop':'tap');paint();
    });

    ideas.innerHTML=S.ideas.length?S.ideas.map((k,i)=>{
      const parts=k.split('|').map(Number);
      const p=o.parts[parts[0]],t=o.tasks[parts[1]];
      return '<div class="d2-idea"><b>'+'①②③④'[i]+'</b><div class="di-b"><span>让「'+p.n+'」同时干「'+t.k+'」</span><i>它现在：'+p.t+'</i></div><button class="di-x" data-del="'+k+'" aria-label="拿掉">×</button></div>';
    }).join(''):'<span class="muted">还没有点子。点左边矩阵里的格子。</span>';
    ideas.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{
      S.ideas=S.ideas.filter(x=>x!==b.dataset.del);api.save();api.sfx('tap');paint();
    });

    const n=S.ideas.length;
    ic.textContent=n;icount.textContent=n+'/3';xpb.textContent=S.xp||0;
    next.disabled=n<3;
    if(n<3)note.innerHTML='<b>还差 '+(3-n)+' 张：</b>合并不是硬塞——先问"它本来就懂这件事吗？"';
    else note.innerHTML='<b>3 张够了：</b>这 3 张还是粗点子。下一步去转盘，把它们变成"复制并改变"的具体样子。';
  }
  paint();
  if(!S._xp3){S._xp3=1;api.addXp(10);}
  next.onclick=()=>api.go(5);
}},

/* ================= 04 动手做（乘法转盘） ================= */
{a:'05',name:'动手做',time:'65 分',html:`
<div class="ch-head"><div class="act"><b>05</b><span>动手做</span><i>发小明 · 乘法</i></div><h2>复制一份，<em>只改一个地方</em></h2><p>转盘里圈是部件、外圈是属性。选一个部件 + 一个属性，<em>乘</em>出一个变体；把三个变体填进 A / B / C，各贴一个标签。</p></div>
<div class="cp-hud"><span class="hp brand">发小明 · 乘法</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">方向 <b data-dc>0</b>/3</span><span class="hp">变体 <b data-vc>0</b></span></div>
<div class="cp-split d2-split d2-split4">
  <div class="cp-stage d2-stage">
    <div class="cp-stage-label">MULTIPLY · 部件 × 属性 = 一个"复制并改变"的变体</div>
    <div class="d2-wheeltop">
      <div class="d2-wheel" data-wheel></div>
      <div class="d2-gen" data-gen></div>
    </div>
    <div class="d2-drawbox">
      <div class="cp-draw">
        <div class="cp-draw-tools">
          <button data-color="#4FE0D0" style="background:#4FE0D0" class="on" aria-label="青色"></button>
          <button data-color="#FFE3A6" style="background:#FFE3A6" aria-label="米色"></button>
          <button data-color="#FF7A6B" style="background:#FF7A6B" aria-label="珊瑚色"></button>
          <button data-size="4" class="tsz">细</button>
          <button data-size="10" class="tsz on">粗</button>
          <button data-eraser class="tsz">擦</button>
          <button data-clear class="tsz">清</button>
        </div>
        <canvas data-draw width="1100" height="260"></canvas>
        <div class="hintline">在这里画一张草图（可选）</div>
      </div>
    </div>
  </div>
  <div class="cp-side">
    <div class="cp-panel d2-dirpanel"><h4>三个方向 <span data-dcount>0/3</span></h4><div class="d2-dirs" data-dirs></div></div>
    <div class="cp-note" data-note></div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>拿去投票 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;const o=getObj(S);
  if(S.dirsObj!==o.id){
    S.vars=[];S.dirs=[null,null,null];S.scores={};S.fav='';S.keep='';S.fail=false;
    S.reason='';S.dirsObj=o.id;S.wp=-1;S.wa='';
    api.save();
  }
  ensureDirs(S);S.vars=S.vars||[];
  if(typeof S.wp!=='number')S.wp=-1;
  S.wa=S.wa||'';

  const wheel=sec.querySelector('[data-wheel]'),gen=sec.querySelector('[data-gen]'),
        dirsEl=sec.querySelector('[data-dirs]'),next=sec.querySelector('[data-next]'),
        note=sec.querySelector('[data-note]'),xpb=sec.querySelector('[data-xp]'),
        dcb=sec.querySelector('[data-dc]'),vcb=sec.querySelector('[data-vc]'),
        dcount=sec.querySelector('[data-dcount]');

  /* --- 轮盘：内圈 6 个部件，外圈 5 个属性 --- */
  const pos=(r,i,n)=>{const a=(-90+i*360/n)*Math.PI/180;return [50+r*Math.cos(a),50+r*Math.sin(a)];};
  let wh='<div class="d2-orbit"></div><div class="d2-orbit o2"></div><button class="d2-hub" data-spin aria-label="转一下"></button>';
  o.parts.forEach((p,i)=>{
    const xy=pos(31,i,6);
    wh+='<button class="d2-wp" data-wp="'+i+'" style="left:'+xy[0].toFixed(2)+'%;top:'+xy[1].toFixed(2)+'%">'+p.n+'</button>';
  });
  ATTRS.forEach((a,i)=>{
    const xy=pos(45,i,5);
    wh+='<button class="d2-wa" data-wa="'+a.k+'" style="left:'+xy[0].toFixed(2)+'%;top:'+xy[1].toFixed(2)+'%">'+a.n+'</button>';
  });
  wheel.innerHTML=wh;

  function cur(){return S.wp>=0&&S.wa?ck(S.wp,S.wa):'';}
  function generated(){const k=cur();return !!k&&S.vars.some(v=>ck(v.p,v.a)===k);}

  function spin(){
    const p=S.wp,a=S.wa;
    if(p<0||!a){api.sfx('error');api.toast('先选一个部件，再选一个属性','✋');return;}
    const k=ck(p,a);
    if(!S.vars.some(v=>ck(v.p,v.a)===k)){S.vars.push({p:p,a:a});if(S.vars.length>8)S.vars.shift();}
    api.save();paint();api.sfx('pop');
    wheel.classList.remove('spin');void wheel.offsetWidth;wheel.classList.add('spin');
    const r=wheel.getBoundingClientRect();api.burst(r.left+r.width/2,r.top+r.height/2,18);
  }
  function fill(p,a){
    if(!S.vars.some(v=>v.p===p&&v.a===a)){api.sfx('error');api.toast('先「转一下」，把它生成出来','🎲');return;}
    if(S.dirs.every(Boolean)){api.sfx('error');api.toast('三个方向都满了，先拿掉一个','✋');return;}
    if(S.dirs.some(d=>d&&d.p===p&&d.a===a)){api.sfx('error');api.toast('这个变体已经在方向里了','↩️');return;}
    const i=S.dirs.findIndex(d=>!d);
    S.dirs[i]={p:p,a:a,tag:''};
    api.save();paint();api.sfx('chime');api.toast('填进方向 '+letter(i),'→');
  }

  function paintWheel(){
    wheel.querySelectorAll('[data-wp]').forEach(b=>b.classList.toggle('on',+b.dataset.wp===S.wp));
    wheel.querySelectorAll('[data-wa]').forEach(b=>b.classList.toggle('on',b.dataset.wa===S.wa));
    const hub=wheel.querySelector('.d2-hub');
    const p=S.wp>=0?o.parts[S.wp]:null,a=S.wa?attrOf(S.wa):null;
    hub.innerHTML=p||a?('<b>'+(p?p.n:'？')+'</b><i>×</i><b>'+(a?a.n:'？')+'</b><small>点我转一下</small>'):'<b>部件</b><i>×</i><b>属性</b><small>先选两边</small>';
  }

  function paintGen(){
    const p=S.wp>=0?o.parts[S.wp]:null,a=S.wa?attrOf(S.wa):null;
    const isGen=generated();
    gen.innerHTML=
      '<div class="d2-genhead"><span>复制并改变</span><em>'+(S.vars.length?('已有 '+S.vars.length+' 个变体'):'还没转')+'</em></div>'+
      '<div class="d2-gencombo"><b>'+(p?p.n:'部件')+'</b><i>×</i><b>'+(a?a.n:'属性')+'</b></div>'+
      '<p class="d2-gendesc">'+(isGen&&p&&a?variantText(p,a.k):'选了部件和属性，点「转一下」，看它变成一个什么变体。')+'</p>'+
      '<div class="d2-genbtns"><button class="btn sm primary" data-spin>🎲 转一下</button>'+
      '<button class="btn sm ghost" data-fill '+(isGen?'':'disabled')+'>填进方向 →</button></div>'+
      '<div class="d2-pool">'+(S.vars.length?S.vars.map(v=>'<button class="d2-vchip" data-var="'+v.p+'|'+v.a+'">「'+o.parts[v.p].n+'×'+attrOf(v.a).n+'」</button>').join(''):'<span class="muted">生成过的变体会排在这里</span>')+'</div>';
    gen.querySelectorAll('[data-spin]').forEach(b=>b.onclick=spin);
    gen.querySelectorAll('[data-fill]').forEach(b=>b.onclick=()=>{if(S.wp>=0&&S.wa)fill(S.wp,S.wa);});
    gen.querySelectorAll('[data-var]').forEach(b=>b.onclick=()=>{
      const v=b.dataset.var.split('|');fill(+v[0],v[1]);
    });
  }

  function paintDirs(){
    dirsEl.innerHTML=S.dirs.map((d,i)=>{
      if(!d){
        return '<div class="d2-dir empty"><div class="dd-top"><b>'+letter(i)+'</b><span class="dd-t">在右边生成一个变体，填进来</span></div><div class="dd-tags"><span class="dd-hint">标签：更便宜 / 更简单 / 更神奇</span></div></div>';
      }
      const P=o.parts[d.p],A=attrOf(d.a);
      return '<div class="d2-dir'+(d.tag?' has-tag':'')+'"><div class="dd-top"><b>'+letter(i)+'</b><span class="dd-t"><em>「'+P.n+'×'+A.n+'」</em>'+variantText(P,d.a)+'</span><button class="dd-x" data-clr="'+i+'" aria-label="拿掉">×</button></div>'+
        '<div class="dd-tags">'+TAGS.map(t=>'<button class="dd-tag t-'+t.k+(d.tag===t.k?' on':'')+'" data-dir="'+i+'" data-tag="'+t.k+'" title="'+t.s+'">'+t.e+' '+t.n+'</button>').join('')+'</div></div>';
    }).join('');
    dirsEl.querySelectorAll('[data-tag]').forEach(b=>b.onclick=()=>{
      const i=+b.dataset.dir,k=b.dataset.tag,d=S.dirs[i];if(!d)return;
      if(d.tag!==k&&S.dirs.some((x,j)=>x&&j!==i&&x.tag===k)){
        api.sfx('error');api.toast('这个标签另一个方向用过了，三个方向要贴得不一样','🏷️');return;
      }
      d.tag=d.tag===k?'':k;api.save();api.sfx('tap');paint();
    });
    dirsEl.querySelectorAll('[data-clr]').forEach(b=>b.onclick=()=>{
      S.dirs[+b.dataset.clr]=null;api.save();api.sfx('tap');paint();
    });
  }

  function paint(){
    paintWheel();paintGen();paintDirs();
    const filled=S.dirs.filter(Boolean).length;
    const tagged=S.dirs.filter(d=>d&&d.tag).length;
    const uniq=new Set(S.dirs.filter(d=>d&&d.tag).map(d=>d.tag)).size;
    dcb.textContent=filled;vcb.textContent=S.vars.length;
    dcount.textContent=tagged+'/3';xpb.textContent=S.xp||0;
    const ok=filled===3&&tagged===3&&uniq===3;
    next.disabled=!ok;
    if(filled<3)note.innerHTML='<b>还差 '+(3-filled)+' 个方向：</b>选部件 + 选属性 → 转一下 → 填进 A/B/C。';
    else if(tagged<3)note.innerHTML='<b>还有方向没贴标签：</b>每个方向贴一个——更便宜 / 更简单 / 更神奇。';
    else if(uniq<3)note.innerHTML='<b>标签重复了：</b>三个方向要贴得不一样，不然三个方向会变成同一个方向。';
    else note.innerHTML='<b>三个方向齐了：</b>标签不同，才叫三个方向。下一步：请别人来投票。';
  }

  wheel.querySelectorAll('[data-wp]').forEach(b=>b.onclick=()=>{S.wp=+b.dataset.wp;api.save();api.sfx('tap');paint();});
  wheel.querySelectorAll('[data-wa]').forEach(b=>b.onclick=()=>{S.wa=b.dataset.wa;api.save();api.sfx('tap');paint();});
  wheel.querySelector('[data-spin]').onclick=spin;

  paint();
  if(!S._xp4){S._xp4=1;api.addXp(10);}

  /* --- 手绘区：按实际尺寸设像素，避免拉伸 --- */
  const cv=sec.querySelector('[data-draw]');
  if(cv){
    const r=cv.getBoundingClientRect();
    if(r.width>10&&r.height>10){cv.width=Math.round(r.width*2);cv.height=Math.round(r.height*2);}
    const drawer=api.initDrawing(sec,url=>{S.draw=url;api.save();});
    if(drawer&&S.draw)drawer.load(S.draw);
  }

  next.onclick=()=>api.go(6);
}},

/* ================= 05 测试（用户投票） ================= */
{a:'06',name:'测试',time:'50 分',html:`
<div class="ch-head"><div class="act"><b>06</b><span>测试</span><i>用户投票 · 允许失败</i></div><h2>三条标准，<em>淘汰两个</em></h2><p>请隔壁组当用户：三项各打 1–5 分。分数最高的留下——<em>它可能不是你最喜欢的那个</em>。</p></div>
<div class="cp-hud"><span class="hp brand">用户投票</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">已评 <b data-prog>0</b>/9</span><span class="hp">留下 <b data-keep>—</b></span></div>
<div class="cp-split d2-split d2-split5">
  <div class="cp-stage d2-stage">
    <div class="cp-stage-label">USER VOTE · 三项各 1–5 分 · 三项加起来比一比</div>
    <div class="d2-vcards" data-vcards></div>
    <div class="d2-vfoot"><b>投票的人不是评委，是使用者。</b>同分时，先看「今天能做完吗」；还同分，由组长定。</div>
  </div>
  <div class="cp-side">
    <div class="cp-panel"><h4>投票结果</h4><div class="d2-rank" data-rank></div></div>
    <div class="d2-callout" data-callout></div>
    <div class="cp-field"><label>为什么留它？一句理由（印在证据卡上）</label><textarea data-reason maxlength="60" placeholder="例如：它只改了一个部件，今天就能做完"></textarea></div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>写进证据卡 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;const o=getObj(S);
  if(S.dirsObj!==o.id){S.dirs=[null,null,null];S.scores={};S.fav='';S.keep='';S.fail=false;S.reason='';S.dirsObj=o.id;api.save();}
  ensureDirs(S);S.scores=S.scores||{};S.fav=S.fav||'';

  const vcards=sec.querySelector('[data-vcards]'),rankEl=sec.querySelector('[data-rank]'),
        call=sec.querySelector('[data-callout]'),next=sec.querySelector('[data-next]'),
        prog=sec.querySelector('[data-prog]'),keepb=sec.querySelector('[data-keep]'),
        xpb=sec.querySelector('[data-xp]'),reason=sec.querySelector('[data-reason]');
  reason.value=S.reason||'';
  reason.addEventListener('input',()=>{S.reason=reason.value;api.save();});

  const dirKeys=()=>S.dirs.filter(Boolean).map(d=>ck(d.p,d.a));

  function paintCards(){
    const complete=votesDone(S);
    const rows=rankDirs(S,o);
    const keep=complete&&rows[0]?rows[0]:null;
    if(!S.dirs.filter(Boolean).length){
      vcards.innerHTML='<div class="d2-vintro"><div class="vi-i">🗳️</div>'+
        '<b>先有三个方向，才有得投</b>'+
        '<p>回幕 5：选一个部件 + 一个属性 → 转一下 → 填进 A / B / C，每个方向贴一个不同的标签。</p>'+
        '<div class="vi-crit"><span>他能用吗</span><span>他愿意用吗</span><span>今天能做完吗</span></div>'+
        '<button class="btn sm primary" data-back>回幕 5 生成方向 →</button></div>';
      vcards.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>api.go(5));
      return;
    }
    vcards.innerHTML=S.dirs.map((d,i)=>{
      if(!d)return '<div class="d2-vcard ghost"><div class="d2-vhead"><b>'+letter(i)+'</b><span class="d2-vsum">—</span></div><p class="d2-vtxt">这个方向还没生成。</p><button class="d2-back" data-back>回幕 5 生成 →</button></div>';
      const P=o.parts[d.p],A=attrOf(d.a),k=ck(d.p,d.a),sc=scoreOf(S,d),tot=totalOf(S,d);
      const isFav=S.fav===k;
      const isKeep=keep&&keep.i===i;
      const st=complete?(isKeep?'keep':'out'):'';
      return '<div class="d2-vcard'+(isKeep?' keep':'')+(S.fail&&isFav&&!isKeep?' lost':'')+'">'+
        '<div class="d2-vhead"><b>'+letter(i)+'</b>'+(d.tag?'<span class="d2-tag t-'+d.tag+'">'+TAGN[d.tag]+'</span>':'')+
          '<span class="d2-vsum">'+(sc.length?tot:'0')+'<i>/15</i></span>'+
          (st?'<span class="d2-vstat '+st+'">'+(st==='keep'?'留下':'淘汰')+'</span>':'')+'</div>'+
        '<p class="d2-vtxt">'+variantText(P,d.a)+'<i>它现在：'+P.t+'</i></p>'+
        '<div class="d2-vmeta"><span>复制 '+P.n+'</span><span>只改 '+A.n+'</span></div>'+
        '<button class="d2-fav'+(isFav?' on':'')+'" data-fav="'+i+'">'+(isFav?'♥ 我最喜欢':'♡ 标成我最喜欢')+'</button>'+
        '<div class="d2-crits"><div class="d2-crithead">打分 1–5 <em>三项</em></div>'+CRITS.map((c,ci)=>
          '<div class="d2-crit"><span>'+c.s+'</span><div class="d2-dots">'+
            [1,2,3,4,5].map(v=>'<button data-s="'+i+'" data-c="'+ci+'" data-val="'+v+'" class="'+(sc[ci]===v?'on':'')+'" aria-label="'+c.n+' '+v+' 分">'+v+'</button>').join('')+
          '</div></div>').join('')+
        '</div></div>';
    }).join('');

    vcards.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{
      const i=+b.dataset.s,ci=+b.dataset.c,v=+b.dataset.val;
      const d=S.dirs[i];if(!d)return;
      const k=ck(d.p,d.a);
      const arr=(S.scores[k]||[0,0,0]).slice();
      arr[ci]=v;S.scores[k]=arr;
      api.save();api.sfx('tap');paint();
    });
    vcards.querySelectorAll('[data-fav]').forEach(b=>b.onclick=()=>{
      const i=+b.dataset.fav,d=S.dirs[i];if(!d)return;
      const k=ck(d.p,d.a);
      S.fav=S.fav===k?'':k;api.save();api.sfx('pop');paint();
    });
    vcards.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>api.go(5));
  }

  function paintRank(complete,rows,keep){
    if(!rows.length){
      rankEl.innerHTML='<div class="d2-emptyrank"><span class="muted">还没有方向。先回幕 5 生成三个。</span></div>';
      return;
    }
    const max=15;
    rankEl.innerHTML=rows.slice().sort((a,b)=>a.i-b.i).map(r=>{
      const st=keep?(r.i===keep.i?'keep':'out'):'wait';
      return '<div class="d2-rankrow '+st+'"><b>'+letter(r.i)+'</b>'+
        '<div class="d2-rbar"><i style="width:'+(r.total/max*100).toFixed(0)+'%"></i></div>'+
        '<span class="d2-rsc">'+r.total+'<i>/15</i></span>'+
        (r.fav?'<em class="d2-heart" title="我最喜欢">♥</em>':'')+
        '<span class="d2-rstat">'+(st==='keep'?'留下':st==='out'?'淘汰':'待评')+'</span></div>';
    }).join('');
  }

  function paintCallout(complete,rows,keep){
    const total=S.dirs.filter(Boolean).length;
    const done=S.dirs.filter(Boolean).reduce((a,d)=>a+(scoreOf(S,d).filter(v=>v>=1).length||0),0);
    if(total<3){
      call.className='d2-callout warn';
      call.innerHTML='<b>还差 '+(3-total)+' 个方向：</b>先回幕 5，用转盘凑齐 A / B / C，再来投票。<div class="d2-callrow"><button class="btn sm ghost" data-back>回幕 5</button></div>';
    }else if(!complete){
      call.className='d2-callout';
      call.innerHTML='<b>还差 '+(9-done)+' 格：</b>三项都打完，才会计总分。<em>评分时想：这是"我觉得"，还是"他用过之后的表现"？</em>';
    }else{
      const fail=!!(S.fail&&keep);
      if(fail){
        const favRow=rows.find(r=>r.fav);
        const keepN=letter(keep.i),favN=favRow?letter(favRow.i):'?';
        const scores=rows.slice().sort((a,b)=>a.i-b.i).map(r=>letter(r.i)+' '+r.total+' 分').join(' / ');
        call.className='d2-callout bad show';
        call.innerHTML='<b>💔 你最喜欢的被淘汰了。</b>'+
          '<p>这是第 2 天最常见的失败：<em>喜欢</em>和<em>有人愿意用</em>不是一回事。</p>'+
          '<p class="d2-cdata">'+scores+'。留下的 '+keepN+' 不是"想得最酷"的，是三项都过得去的。你最喜欢的 '+favN+'，最低的是哪一项？</p>'+
          '<div class="d2-callrow"><button class="btn sm ghost" data-back>回幕 5 改一处</button><button class="btn sm ghost" data-retry>重新投票</button></div>';
      }else if(!S.fav){
        call.className='d2-callout show';
        call.innerHTML='<b>结果出来了。</b>现在标一个「我最喜欢」——<em>看看你的感觉和投票一样吗</em>。';
      }else{
        call.className='d2-callout ok show';
        call.innerHTML='<b>你最喜欢的也赢了。</b>再问一句：它赢在哪一项？如果「今天能做完」只有 2 分，明天就会卡住。';
      }
    }
    call.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>api.go(5));
    call.querySelectorAll('[data-retry]').forEach(b=>b.onclick=()=>{
      S.scores={};S.keep='';S.fail=false;S._voted=false;S._wasFail=false;
      api.save();api.sfx('tap');paint();
    });
  }

  function paint(){
    const complete=votesDone(S);
    const rows=rankDirs(S,o);
    const keep=complete&&rows[0]?rows[0]:null;
    S.keep=keep?ck(keep.d.p,keep.d.a):'';
    S.fail=!!(complete&&S.fav&&keep&&ck(keep.d.p,keep.d.a)!==S.fav);
    if(S.fav&&dirKeys().indexOf(S.fav)<0)S.fav='';

    paintCards();paintRank(complete,rows,keep);paintCallout(complete,rows,keep);

    const done=S.dirs.filter(Boolean).reduce((a,d)=>a+(scoreOf(S,d).filter(v=>v>=1).length||0),0);
    prog.textContent=done;
    keepb.textContent=keep?letter(keep.i)+' 号':'—';
    xpb.textContent=S.xp||0;
    next.disabled=!keep;

    if(complete&&!S._voted){S._voted=true;api.sfx('success');if(!S.fail)api.confetti(40);}
    const nowFail=!!(complete&&S.fail);
    if(nowFail&&!S._wasFail){
      api.sfx('error');api.toast('你最喜欢的被淘汰了','💔');
      api.burst(innerWidth*.5,innerHeight*.4,26,['#FF7A6B','#FFB3A8','#4FE0D0']);
    }
    S._wasFail=nowFail;
  }

  paint();
  if(!S._xp5){S._xp5=1;api.addXp(15);}
  next.onclick=()=>{api.setEvidence(buildEvidence(S));api.go(7);};
}},

/* ================= 06 证据卡 ================= */
{a:'07',name:'今日证据卡',time:'45 分',build(sec,api){
  api.grantBadge('ideator','点子工程师');
  api.renderFinale(sec,{
    badge:{icon:'💡',name:'点子工程师'},
    headline:'你今天不是"想"出办法，<em>是拆开、重排、乘出来的</em>',
    sub:'拆成 6 个部件，把几个换位置、换时间（除法），再让部件顺手干第二件事，复制、只改一个地方。三条标准投票，只留一个——被淘汰的那个，可能正是你最喜欢的。',
    journey:[{i:'🎒',b:'选物件',s:'普通、有人抱怨、能拆'},{i:'🔍',b:'拆部件',s:'6 块，各干一份活'},{i:'🔀',b:'重排',s:'换位置或换时间'},{i:'✖️',b:'部件×任务',s:'合并出 3 个点子'},{i:'🗳️',b:'投票淘汰',s:'三项打分，只留 1 个'}],
    reflect:['你留下的那个方向，赢在哪一项？输的那两个，真的更差吗？','如果只能改一个部件，你会改哪个？改完它还能干原来的活吗？','你最喜欢它，是因为它好用，还是因为它是你想出来的？'],
    homework:{title:'家庭任务 · 三处"复制并改变"',body:'在家里找 3 件东西，每件说出一个"复制一份、只改一个地方"的改法（数量、位置、大小、材料、时间任选一个）。记下你最喜欢的那一个，明天带来。'},
    quote:'“点子不是从脑子里蹦出来的，是<em>拆开、重排、乘出来，再投票投出来的</em>。”',
    evidence(){return buildEvidence(api.S);}
  });
}}
],

/* ---------- 教师指引（7 条） ---------- */
notes:[
{html:`<div class="note-block"><h4>今天的 3 个目标</h4><p>1）拆开一件普通物件，说出 <b>6 个部件</b>各干什么；2）把部件<b>换位置或换时间</b>（除法）；3）用「一专多能」和「乘法」各生成 3 个方向；4）用三条标准投票，<b>淘汰 2 个</b>，只留 1 个。</p><p>今天不讲"什么是好点子"。只做一件事：让每组有一个<b>说得清、比得过</b>的方向。</p><h4>大带小</h4><p>大孩子负责读题、转盘、算总分；小孩子负责点热点、指"哪个看着最烦"、画草图。<b>不要替对方写字。</b></p><div class="warn">今天最常见的跑偏：孩子说"我想到一个超酷的"，但说不出它由哪几个部件组成。温柔地拉回来：<b>"它坏在哪一块？我们先把那一块找出来。"</b></div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>选一件<b>每天都用、有人真的抱怨过</b>的物件。物件越普通，越容易拆。</p><h4>关键提问</h4><ul><li>这个东西谁在用？他什么时候最烦？</li><li>这句抱怨，你听谁说过？</li><li>它是"不好用"，还是"用不起"？</li></ul><p>不要选"最新最酷"的。选"最熟"的——熟，才拆得动。</p><p><b>大带小：</b>大孩子读出六张卡的抱怨，小孩子指"哪一件我家有"。</p></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>把整体拆成 6 个部件，并说出每个部件<b>现在承担的活</b>。</p><h4>关键提问</h4><ul><li>这个部件不干了，会发生什么？</li><li>它现在是不是顺便还干了别的活？</li><li>哪个部件看起来最没用？真的没用吗？</li></ul><div class="quote">部件 = 能单独拆下来的一块。孩子说"整个包"，就追问："包上哪一块能拧下来、剪下来、撕下来？"</div><p><b>大带小：</b>大孩子记部件名，小孩子点亮点、数"找到几个了"。</p></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>用除法：6 个部件一个不少，把其中几个<b>在空间上换位置</b>，或者<b>在时间上提前 / 延后</b>，再看拼回去的样子。</p><h4>关键提问</h4><ul><li>你挪的是位置，还是时间？</li><li>挪走之后，原来那件事现在谁在管？</li><li>这个新组合是更方便了，还是只是"不一样"？</li></ul><div class="quote"><b>除法 = 把拆开的组件重新分配时间或空间，再重新组合。</b>判据只有一句：部件全在，只有位置或时间变了。拆完还放回原位、还在同一时刻，那只是分解，不是除法。</div><p><b>大带小：</b>大孩子判断"这个位置说得通吗"，小孩子负责点按钮、说"我想让它挪到这儿"。</p><div class="warn">别让孩子把"加一个新部件"当除法——那就又变回加法了。只准挪，不准加。</div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>用一专多能：让一个部件同时干两件事。理解"合并不是硬塞"。</p><h4>关键提问</h4><ul><li>这个部件本来就懂这件事吗？</li><li>合并之后，谁多干了活？</li><li>哪一格你觉得最荒唐？荒唐在哪？</li></ul><p>12 格里只留 3 张。留下的 3 张要能说出"它为什么可能行"。</p><p><b>大带小：</b>大孩子判断题"可行不可行"，小孩子负责点格子、说"这张好玩"。</p></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>用乘法（复制 + 改变一个属性）生成 3 个方向，并给每个方向贴一个标签。</p><h4>关键提问</h4><ul><li>你复制的是哪一部分？</li><li>你只改了哪一个属性？</li><li>三个方向真的不一样吗，还是换了说法？</li></ul><div class="warn">三个方向必须贴<b>三个不同</b>的标签。标签重复，说明三个方向其实是同一个。</div><p><b>大带小：</b>大孩子操作转盘、写方向，小孩子画草图、决定"哪个更神奇"。</p></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>请隔壁组当用户，用三条标准投票，<b>接受"我最喜欢的被淘汰"</b>。</p><h4>关键提问</h4><ul><li>三项里，哪一项最低？</li><li>如果只能改一处，改哪？</li><li>你喜欢它，是因为它好用，还是因为它是你想的？</li></ul><div class="quote">同分时先看「今天能做完吗」；还同分，由组长定。规则要先说清楚，再投票。</div><p>失败提示出现时，<b>不要马上安慰</b>。先问："数据里，它输在哪一项？"再让孩子回幕 5 改一个部件、重新投一次。</p><p><b>大带小：</b>大孩子算总分、说规则，小孩子举手投"他愿意用吗"。</p></div>`},
{html:`<div class="note-block"><h4>收尾 20 分钟</h4><p>1）每组下载今日证据卡（大屏演示一张）；2）发「点子工程师」徽章；3）把 3 张方向草图贴到墙上，标出留下的那一个。</p><p>明日预告：<b>"明天你要把留下的那个方向，做成一个能摸到的丑原型。"</b></p><h4>教师复盘 3 问</h4><ul><li>有几组能说出 6 个部件，而不是"整个东西"？</li><li>有几组的三个方向真的不一样（标签不重复）？</li><li>有几组经历过"最喜欢的被淘汰"，并且改了其中一处？</li></ul><p>材料准备：明天的材料盒（纸板、吸管、纸杯、橡皮筋、铝箔）先摆到桌上；剪刀、美工刀由教师保管。</p></div>`}
]};

window.FXM_DAYS=window.FXM_DAYS||{};
window.FXM_DAYS['2']=c;
})();
