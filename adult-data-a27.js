/* A27 · 属性关联：三个案例还原 */
(function(){
'use strict';

const IMG={
  airbag:'assets-cases-a27-airbag.png',
  pen:'assets-cases-a27-pen.png',
  curtain:'assets-cases-a27-curtain.png'
};

/* ---------- 三个案例：每案三栏 ---------- */
const CASES=[
{
 k:'airbag',n:'安全气囊',brand:'汽车被动安全 · 1950s–',img:'airbag',
 sum:'弹出与否，绑在减速度上',
 orig:'一次正面撞击，30 毫秒内要做一个决定',
 origIn:'是否弹出',origOut:'车身减速度',origRule:'减速度越过标定阈值就点火',
 note:'控制器读的是减速度：约 13–23 km/h 撞固定壁的量级就足以越过标定点火；判断窗口 30 毫秒，充满约 50 毫秒。车速不进这条判断。',
 alt:['车内坐了几个人','后排是否有儿童座椅','路面是否结冰','驾驶员连续驾驶时长'],
 cols:[
  {id:'inner',h:'内部属性',tip:'产品自己能变的那个量',
   ph:'例如：弹，还是不弹',
   cands:['是否弹出','充气强度','点火时机','气囊容积'],
   off:'是否弹出，以及点火时机。气囊只有两个状态：弹，或不弹；双级气体发生器也只是点一级或两级，强度只有两档。',
   keys:['弹出','点火','双级','两级'],
   why:'官方把属性收得极窄：不做"更软或更硬"，只做"弹或不弹"。属性越窄，依存越容易被验证。'},
  {id:'outer',h:'外部变量',tip:'产品外面、能测到的量',
   ph:'例如：撞得有多急',
   cands:['减速度','车速','体重','是否系安全带','撞击位置'],
   off:'车身减速度。控制器里两个加速度传感器加一个 safing 传感器，30 毫秒内读完，再拿去比阈值。',
   keys:['减速度','加速度','传感器'],
   why:'不是车速：车速只说明车在动，减速度说明它停得多急。同样 30 km/h，蹭护栏和撞水泥墩差一个量级。'},
  {id:'rule',h:'依存规则',tip:'写成"当…时，…"',
   ph:'当…时，气囊…',
   cands:['减速度越过阈值就点火','车速超过 30 就弹','没系安全带就不弹'],
   off:'当减速度在 30 毫秒内越过标定阈值时，点火；低于阈值不点。方向：减速度越大，点火越早，两级都点。',
   keys:['阈值','30','越早','点火','两级'],
   why:'方向必须是单调、能写下来的。"减速越大越早弹"可以验证；"智能判断"不能。'}
 ]
},
{
 k:'pen',n:'BIC 圆珠笔',brand:'书写工具 · 一次性圆珠笔品类',img:'pen',
 sum:'笔身长度，绑在"笔此刻在哪"上',
 orig:'一支笔要在口袋里不硌人，在桌面上握得住',
 origIn:'笔身长度',origOut:'放哪：口袋还是桌面',origRule:'插进口袋就缩短，拔出就伸长',
 note:'标准圆珠笔约 14–15 cm，衬衫口袋深约 12 cm——所以笔会露头、笔尖顶袋底。改的是"长度"这一栏，不是加一个新部件。',
 alt:['笔被谁拿着（左撇子/右撇子）','写在什么纸上','笔还剩多少墨水','当天要不要过安检'],
 cols:[
  {id:'inner',h:'内部属性',tip:'产品自己能变的那个量',
   ph:'例如：笔有多长',
   cands:['笔身长度','笔帽长度','笔杆粗细','笔夹'],
   off:'笔身长度。同一支笔在 12 cm 与 14.5 cm 之间变：收进去短到不顶袋底，拉出来长到握得住。',
   keys:['长度','12','14','伸缩'],
   why:'不是加一个更小的笔帽，是让长度本身成为变量。长度一变，口袋与桌面这两个场景同时被照顾到。'},
  {id:'outer',h:'外部变量',tip:'产品外面、能测到的量',
   ph:'例如：笔现在插在哪',
   cands:['放哪：口袋还是桌面','口袋深度','手的大小','桌面笔座'],
   off:'笔此刻在哪：插在衬衫口袋里，还是立在桌面笔座里、握在手里。不用传感器——插拔这个动作本身就是信号。',
   keys:['口袋','桌面','握在','场景'],
   why:'最好的外部变量往往不要额外测量：它已经被用户的动作读出来了。插进口袋，就是一次不需要付费的读数。'},
  {id:'rule',h:'依存规则',tip:'写成"当…时，…"',
   ph:'当笔…时，长度…',
   cands:['插进口袋就缩短','放在桌面就伸长','按一下切换'],
   off:'当笔插进衬衫口袋时，笔身缩到 12 cm 以内，笔尖不顶袋底、笔夹还露在外面；当它被拔出、立在桌面或握在手里时，回到 14.5 cm。',
   keys:['插进','口袋','12','14','拔出','桌面'],
   why:'触发量是"插拔"这个本来就要做的动作，用户不多做一个动作。多一个按钮，这条依存就退回成设置项。'}
 ]
},
{
 k:'curtain',n:'Volvo 侧气帘',brand:'沃尔沃 · 1998 年 S80 起',img:'curtain',
 sum:'气帘多硬，绑在乘员体型与坐姿上',
 orig:'侧碰与翻滚时，头离车窗只有几厘米',
 origIn:'气帘压力与展开行程',origOut:'乘员体型与坐姿',origRule:'头离车窗越近，压力越低',
 note:'沃尔沃 1998 年把侧气帘做成标配：覆盖 A 柱到 C 柱的整个侧窗，翻滚时保持充气数秒。展开位置绑在车窗区域上，压力长期固定——用覆盖兜住所有体型。',
 alt:['乘员是否系安全带','座椅靠背角度','车窗是否开着','碰撞来自侧面还是翻滚'],
 cols:[
  {id:'inner',h:'内部属性',tip:'产品自己能变的那个量',
   ph:'例如：气帘充得多硬',
   cands:['气帘压力','展开行程','展开时机','气帘长度'],
   off:'气帘的充气压力与展开行程：压力决定它有多硬，行程决定它覆盖到车窗的哪一沿。',
   keys:['压力','行程','多硬','覆盖'],
   why:'压力与行程是两个量，官方只把行程绑到了"车窗区域"上。剩下的一半，才是这一节要补的地方。'},
  {id:'outer',h:'外部变量',tip:'产品外面、能测到的量',
   ph:'例如：人坐得多高、多靠窗',
   cands:['乘员体型与坐姿','车速','撞击方向','是否系安全带'],
   off:'乘员的体型与坐姿：身高、坐得靠前还是靠外、头离侧窗多远。座椅位置传感器和坐垫里的重量传感器已经在车上。',
   keys:['体型','坐姿','身高','头离','座椅','重量'],
   why:'撞击方向是触发量，不是强度量。要让"多硬"跟着变，得读人，不是读撞击。'},
  {id:'rule',h:'依存规则',tip:'写成"当…时，…"',
   ph:'当乘员…时，气帘…',
   cands:['头离车窗越近，压力越低','体型越小，覆盖越靠下','一律满压展开'],
   off:'当头离侧窗越近、体型越小时，气帘压力越低、展开越靠下沿；坐得远、体型大时满压展开。方向：距离越近，压力越低。',
   keys:['越近','越低','压力','距离','体型'],
   why:'"一律满压"也是一种依存——只是绑在一个常数上。把它换成人，规则立刻变成一条有方向的斜线。'}
 ]
}
];
const BY={};CASES.forEach(c=>BY[c.k]=c);
const COLS=['inner','outer','rule'];
const MIN={inner:2,outer:2,rule:6};

/* ---------- 状态 ---------- */
function blankRestore(){
  const o={};CASES.forEach(c=>{o[c.k]={inner:'',outer:'',rule:''};});return o;
}
function ensure(S){
  const ans=S.answers;
  if(!ans.a27||typeof ans.a27!=='object')ans.a27={};
  const a=ans.a27;
  if(!a.restore||typeof a.restore!=='object')a.restore=blankRestore();
  CASES.forEach(c=>{if(!a.restore[c.k]||typeof a.restore[c.k]!=='object')a.restore[c.k]={inner:'',outer:'',rule:''};});
  if(!BY[a.caseTab])a.caseTab='airbag';
  if(typeof a.mineCase!=='string')a.mineCase='';
  if(typeof a.newOuter!=='string')a.newOuter='';
  if(typeof a.react!=='string')a.react='';
  if(typeof a.wrong!=='string')a.wrong='';
  return a;
}
function val(a,k,id){const r=(a&&a.restore&&a.restore[k])||{};return (r[id]||'').trim();}
function filled(a){let n=0;CASES.forEach(c=>COLS.forEach(id=>{if(val(a,c.k,id).length>=MIN[id])n++;}));return n;}
function filledOf(a,k){return COLS.filter(id=>val(a,k,id).length>=MIN[id]).length;}
function unlocked(a){return filled(a)>=9;}
function hitsOf(col,text){
  const t=(text||'').toLowerCase();
  return col.keys.filter(k=>t.indexOf(k.toLowerCase())>=0);
}
function brief(a,k){
  const i=val(a,k,'inner'),o=val(a,k,'outer'),r=val(a,k,'rule');
  if(!i&&!o&&!r)return '—';
  return (i||'—')+' × '+(o||'—')+(r?'：'+r:'');
}
let api=null;

function markOff(text,keys,user){
  const u=(user||'').toLowerCase();
  const escRe=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const ks=keys.slice().sort((x,y)=>y.length-x.length).map(escRe);
  const re=new RegExp('('+ks.join('|')+')','g');
  let out='',last=0,m;
  while((m=re.exec(text))){
    out+=api.esc(text.slice(last,m.index));
    out+='<em class="'+(u.indexOf(m[0].toLowerCase())>=0?'a27-hit':'a27-miss')+'">'+api.esc(m[0])+'</em>';
    last=m.index+m[0].length;
  }
  out+=api.esc(text.slice(last));
  return out;
}

const L={
id:'A27',week:7,seq:27,title:'属性关联：三个案例还原',
kicker:'WEEK 7 · 属性关联',tool:'ad',toolName:'属性关联',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>气囊弹出的那一刻，<em>它跟什么绑在一起</em></h1>
<p>不是"更安全的气囊"，是"会看情况的气囊"。先选一个你直觉里最可能的触发量，再看它实际读的是什么。</p></div>
<div class="a27-hook">
  <figure class="a27-photo">
    <button class="case-zoom" data-zoom="airbag" title="看大图">⤢</button>
    <img src="${IMG.airbag}" alt="汽车正面撞上固定壁，气囊在驾驶员与方向盘之间展开；右侧是减速度在 30 毫秒内越过阈值的曲线">
    <figcaption><b>正面撞击 · 30 毫秒</b><span>左边是溃缩区，右边是判断窗口。</span>
      <em class="a27-src">示意：自绘，依据 SIT 属性关联定义</em></figcaption>
  </figure>
  <div class="a27-hook-r">
    <div class="a27-ask"><span class="a27-ask-k">先别查</span><p>弹不弹，跟<em>哪个量</em>绑定？</p></div>
    <div class="opts">
      <button class="opt" data-h="a"><span class="k">A</span><span><b>车速</b><span>超过 30 km/h 就弹</span></span></button>
      <button class="opt" data-h="b"><span class="k">B</span><span><b>体重</b><span>坐垫测出体重，重的人多弹一点</span></span></button>
      <button class="opt" data-h="c"><span class="k">C</span><span><b>是否系安全带</b><span>没系才弹，系了就不弹</span></span></button>
    </div>
  </div>
</div>
<div id="a27HookOut" style="margin-top:12px"></div>`,
init(sec,apiIn){
  api=apiIn;
  const S=api.S,out=sec.querySelector('#a27HookOut'),a=ensure(S);
  function paint(){
    const v=a.hook;
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',v===b.dataset.h));
    if(!v){out.innerHTML='';return;}
    const say={
      a:'车速只说明车在动。同样 30 km/h，蹭一下护栏和撞上水泥墩，减速度差一个量级——气囊要分的是后者。',
      b:'体重测得到（坐垫里的传感器就在测），但它管的是"副驾气囊要不要关"，不管"这一下弹不弹"。',
      c:'系了也会弹。安全带是另一条依存：它改的是点火策略与力度，不是"弹不弹"。这条线仍然由减速度画。'
    }[v];
    out.innerHTML='<div class="a27-reveal">'+
      '<div class="a27-reveal-h"><span>三个都不是</span><span>它绑的是 · 减速度</span></div>'+
      '<p><b>控制器只读一个量：车身减速度。</b>加速度传感器 30 毫秒内采样完，越过标定阈值就点火——两个状态，中间没有第三档。</p>'+
      '<p class="small">'+say+'</p>'+
      '<div class="a27-facts">'+
        '<div><b>30</b><span>ms 判断窗口</span></div>'+
        '<div><b>50</b><span>ms 气囊充满</span></div>'+
        '<div><b>13–23</b><span>km/h 撞固定壁的量级</span></div>'+
        '<div><b>3</b><span>个传感器交叉确认</span></div>'+
      '</div>'+
      '<p class="a27-note">属性关联的第一个动作，是给"变"找一个测得到的量。气囊没变聪明，它只是有了一个触发量。</p>'+
      '</div>';
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{a.hook=b.dataset.h;api.save();paint();api.refresh();});
  sec.querySelectorAll('[data-zoom]').forEach(b=>b.onclick=e=>{
    e.stopPropagation();
    api.modal('<button class="modal-x">×</button><h3>正面撞击 · 30 毫秒</h3>'+
      '<img src="'+IMG.airbag+'" style="width:100%;border-radius:8px;margin:8px 0 12px" alt="气囊与减速度曲线示意">'+
      '<p>左边是溃缩区：车头先变形，把撞击时间拉长。右边是控制器看到的曲线——减速度在 30 毫秒内冲过阈值，点火。</p>'+
      '<p class="small">示意：自绘，依据 SIT 属性关联定义（Day2 p.9、p.63）。</p>');
  });
  paint();
},
hint(S){return ensure(S).hook?'':'先选一个：车速、体重，还是安全带';},
gate(S){return !!ensure(S).hook;}},

/* ---------- 2 概念 ---------- */
{id:'concept',name:'三栏法',short:'三栏',kicker:'STEP 2 · 概念',
html:`
<div class="step-h"><h1>一条依存，<em>三栏</em>就写完了</h1>
<p>内部属性 × 外部变量 → 当…时… 。第二栏决定这条依存能不能成立：测不到，后面全是空话。</p></div>
<div class="a27-chain">
  <div class="a27-node"><span>01</span><b>内部属性</b><em>产品自己能变的量</em></div>
  <i class="a27-ar">×</i>
  <div class="a27-node"><span>02</span><b>外部变量</b><em>产品外面、测得到的量</em></div>
  <i class="a27-ar">→</i>
  <div class="a27-node ac"><span>03</span><b>当…时，…</b><em>一句可验证的规则</em></div>
  <i class="a27-ar">→</i>
  <div class="a27-node"><span>04</span><b>用户不做动作</b><em>他感觉不到切换</em></div>
</div>
<div class="grid2" style="margin-top:12px;align-items:start">
  <div class="panel a27-rules">
    <div class="panel-h"><h4>三条判据</h4><span>缺一条就还是"可调"</span></div>
    <div class="a27-rule"><b>01</b><div><strong>外部变量测得到吗</strong><span>减速度有传感器；"用户想要"没有。测不到，就绑不上。</span></div></div>
    <div class="a27-rule"><b>02</b><div><strong>方向说得清吗</strong><span>"距离越近、压力越低"能验证；"更智能"不能。</span></div></div>
    <div class="a27-rule"><b>03</b><div><strong>用户要做动作吗</strong><span>插拔、坐下、上车，都是本来就要做的；多按一个按钮，就成了设置项。</span></div></div>
  </div>
  <div class="panel a27-fake">
    <div class="panel-h"><h4>伪依存</h4><span>只是加了个开关</span></div>
    <p class="a27-fake-p">给保温杯加一个"会议模式"按钮：灯变暗、提示音静音。<b>看起来它懂了场景，其实决定还在用户手里。</b></p>
    <div class="a27-fake-row"><b>判据</b><span>触发量如果是"用户按一下"，它就不是外部变量。</span></div>
    <div class="a27-fake-row"><b>后果</b><span>开关把决定推回用户；依存把决定放进产品。多一个开关，多一次忘记。</span></div>
  </div>
</div>
<div class="panel a27-choice" style="margin-top:10px">
  <div class="panel-h"><h4>哪一句才算依存成立</h4><span>二选一</span></div>
  <div class="opts a27-opts2">
    <button class="opt" data-c2="a"><span class="k">A</span><span><b>当用户需要安静时，耳机自动降噪。</b><span>"需要安静"由谁来读？</span></span></button>
    <button class="opt" data-c2="b"><span class="k">B</span><span><b>当环境噪音超过 70 分贝时，降噪深度提高一档。</b><span>有阈值，有方向</span></span></button>
  </div>
  <div id="a27C2Out" style="margin-top:9px"></div>
</div>`,
init(sec,apiIn){
  api=apiIn;
  const S=api.S,out=sec.querySelector('#a27C2Out'),a=ensure(S);
  function paint(){
    const v=a.concept;
    sec.querySelectorAll('[data-c2]').forEach(b=>b.classList.toggle('on',v===b.dataset.c2));
    if(!v){out.innerHTML='';return;}
    const ok=v==='b';
    out.innerHTML='<div class="a27-reveal'+(ok?'':' warn')+'">'+
      '<div class="a27-reveal-h"><span>'+(ok?'B 成立':'A 还差一步')+'</span><span>判据：测得到 + 方向明确</span></div>'+
      '<p class="small">'+(ok
        ? 'B 写得出三栏：内部属性是降噪深度，外部变量是环境噪音，规则是"超过 70 分贝就提高一档"。两个量都测得到，方向单一。'
        : 'A 的三栏填不满第二栏："需要安静"没有读数。最后还是要用户按一下——那就回到了开关。')+'</p>'+
      '<p class="small">依存可以被<b>建立</b>（减速度→点火），可以被<b>改变</b>（压力从固定改成跟人走），也可以被<b>取消</b>——CK One 拆掉了"性别↔香型"这条，一个 SKU 卖给两个人。</p></div>';
  }
  sec.querySelectorAll('[data-c2]').forEach(b=>b.onclick=()=>{a.concept=b.dataset.c2;api.save();paint();api.refresh();});
  paint();
},
hint(S){return ensure(S).concept?'':'选一句：哪一句才算依存成立';},
gate(S){return !!ensure(S).concept;}},

/* ---------- 3 工作台：三栏还原台 ---------- */
{id:'bench',name:'还原台',short:'还原台',kicker:'STEP 3 · 三栏还原台',
html:`
<div class="step-h"><h1>把三个案例，<em>拆回三栏</em></h1>
<p class="a27-hide-sh">每个案例一屏，三栏都填：内部属性、外部变量、依存规则。九栏填完，才解锁"看官方还原"——对照，不判对错。</p></div>
<div class="op-row a27-ops">
  <span class="op"><span class="op-n">1</span>选一个案例</span>
  <span class="op"><span class="op-n">2</span>点候选词，或自己写</span>
  <span class="op"><span class="op-n">3</span>九栏齐了，对照官方</span>
</div>
<div class="bench a27-bench">
  <div class="bench-h"><b>BENCH · 三栏还原台</b><span class="st" id="a27St">0 / 9 栏 · 0 / 3 案例</span></div>
  <div class="bench-b">
    <div class="a27-tabs" id="a27Tabs"></div>
    <div class="a27-panes" id="a27Panes"></div>
    <div class="a27-cmp" id="a27Cmp"></div>
  </div>
  <div class="bench-f">
    <span class="small" id="a27Lock">九栏填完，解锁官方还原</span>
    <div style="flex:1"></div>
    <button class="btn sm ghost" id="a27Clear">重填本案例</button>
    <button class="btn sm" id="a27See" disabled>看官方还原</button>
  </div>
</div>
<div class="a27-credit">案例示意：自绘 · 依据 SIT 属性关联定义（Day2 p.9、p.63）与 AD 案例库</div>`,
init(sec,apiIn){
  api=apiIn;
  const S=api.S,a=ensure(S);
  const tabs=sec.querySelector('#a27Tabs'),panes=sec.querySelector('#a27Panes'),
        cmp=sec.querySelector('#a27Cmp'),st=sec.querySelector('#a27St'),
        lock=sec.querySelector('#a27Lock'),see=sec.querySelector('#a27See');
  let cmpOpen=false,ACT=a.caseTab;

  tabs.innerHTML=CASES.map(c=>'<button class="a27-tab" data-tab="'+c.k+'">'+
    '<span class="a27-th"><img src="'+IMG[c.img]+'" alt=""></span>'+
    '<span class="a27-tb"><b>'+c.n+'</b><em data-tp>0 / 3</em></span><i class="a27-dot"></i></button>').join('');

  panes.innerHTML=CASES.map(c=>'<div class="a27-pane" data-pane="'+c.k+'"><div class="a27-cols">'+
    c.cols.map((col,i)=>'<div class="a27-col" data-col="'+col.id+'">'+
      '<div class="a27-col-h"><span class="a27-col-n">0'+(i+1)+'</span><b>'+col.h+'</b></div>'+
      '<div class="a27-col-t">'+col.tip+'</div>'+
      '<div class="a27-cands">'+col.cands.map(p=>'<button class="chip" data-cand="'+api.esc(p)+'" data-c="'+col.id+'">'+api.esc(p)+'</button>').join('')+'</div>'+
      '<textarea data-f="'+col.id+'" maxlength="110" placeholder="'+api.esc(col.ph)+'"></textarea>'+
      '<div class="a27-meta"><span data-cn>0</span> / 110</div>'+
    '</div>').join('')+
    '</div><div class="a27-case-note"><b>官方备注</b><span>'+c.note+'</span></div></div>').join('');

  const paneOf=k=>panes.querySelector('[data-pane="'+k+'"]');

  function paintChips(k){
    const r=a.restore[k];
    paneOf(k).querySelectorAll('.a27-col').forEach(colEl=>{
      const id=colEl.dataset.col,v=(r[id]||'');
      colEl.querySelectorAll('[data-cand]').forEach(ch=>ch.classList.toggle('on',v.indexOf(ch.dataset.cand)>=0));
      colEl.querySelector('[data-cn]').textContent=v.length;
    });
  }
  function paintTabs(){
    tabs.querySelectorAll('[data-tab]').forEach(t=>{
      const k=t.dataset.tab,n=filledOf(a,k);
      t.classList.toggle('on',k===ACT);
      t.classList.toggle('done',n===3);
      t.querySelector('[data-tp]').textContent=n+' / 3';
    });
  }
  function paintStatus(){
    st.textContent=filled(a)+' / 9 栏 · '+CASES.filter(c=>filledOf(a,c.k)===3).length+' / 3 案例';
    see.textContent=cmpOpen?'收起官方还原':'看官方还原';
    see.disabled=cmpOpen?false:!unlocked(a);
    lock.textContent=cmpOpen?'对照完收起，可以继续改':(unlocked(a)?'九栏齐了：点"看官方还原"对照':'九栏填完，解锁官方还原');
  }
  function showPane(k){
    ACT=k;a.caseTab=k;
    panes.querySelectorAll('.a27-pane').forEach(p=>p.classList.toggle('on',p.dataset.pane===k));
    paintTabs();
    if(cmpOpen)renderCmp(k);
  }
  function renderCmp(k){
    const c=BY[k],r=a.restore[k]||{};
    cmp.innerHTML='<div class="a27-cmp-h"><div><b>官方还原 · '+c.n+'</b>'+
      '<span>'+c.brand+'　对照不是判卷：<em class="a27-hit">绿</em>=你提到了，<em class="a27-miss">黄</em>=官方提到你没有</span></div>'+
      '<button class="btn sm ghost" id="a27CmpX">收起对照</button></div>'+
      c.cols.map((col,i)=>{
        const u=(r[col.id]||'').trim();
        const hit=hitsOf(col,u),miss=col.keys.filter(x=>hit.indexOf(x)<0);
        const diff=!hit.length
          ? '官方这一栏落在「'+col.keys.join('、')+'」，你写的是另一个方向。先看它为什么这样落。'
          : (miss.length
            ? '官方还落到「'+miss.join('、')+'」；你已经提到的：'+hit.join('、')+'。'
            : '官方的主要落点你都提到了。再看一眼它为什么这样取舍。');
        return '<div class="a27-cmp-r">'+
          '<div class="a27-cmp-k"><span>0'+(i+1)+'</span><b>'+col.h+'</b>'+
            '<em class="'+(hit.length?'hit':'miss')+'">'+(hit.length?'你提到 '+hit.length+' 处':'0 处重合')+'</em></div>'+
          '<div class="a27-cmp-u"><b>你写的</b><span>'+api.esc(u||'（这一栏还空着）')+'</span></div>'+
          '<div class="a27-cmp-o"><b>官方</b><span>'+markOff(col.off,col.keys,u)+'</span></div>'+
          '<div class="a27-cmp-w"><b>为什么</b><span>'+col.why+'</span></div>'+
          '<div class="a27-cmp-d">'+diff+'</div>'+
        '</div>';
      }).join('');
    cmp.querySelector('#a27CmpX').onclick=()=>{cmpOpen=false;paintCmp();};
  }
  function paintCmp(){
    cmp.classList.toggle('on',cmpOpen);
    panes.classList.toggle('hide',cmpOpen);
    if(cmpOpen)renderCmp(ACT);
    paintStatus();
    const bb=sec.querySelector('.a27-bench .bench-b');
    if(cmpOpen&&bb){
      bb.scrollTop=0;
      requestAnimationFrame(()=>{
        if(bb.scrollHeight>bb.clientHeight+6)lock.textContent='对照三栏，下面还有，滚动查看';
      });
    }
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
  sec.querySelector('#a27Clear').onclick=()=>{
    a.restore[ACT]={inner:'',outer:'',rule:''};
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
  if(filled(a)<9)return '九栏还差 '+(9-filled(a))+' 栏（每个案例三栏）';
  return '';
},
gate(S){return unlocked(ensure(S));}},

/* ---------- 4 在你的事上 ---------- */
{id:'mine',name:'换外部变量',short:'换变量',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>案例不换，<em>只换那个外部变量</em></h1>
<p>三栏里最有弹性的是第二栏。换掉它，规则和产品都得跟着动——只换名字不算。</p></div>
<div class="a27-pick" id="a27Pick"></div>
<div class="grid2" style="margin-top:12px;align-items:start">
  <div class="panel">
    <div class="panel-h"><h4>① 新外部变量</h4><span>≥8 字，且测得到</span></div>
    <div class="field"><input id="a27Outer" maxlength="40" placeholder="例如：后排是否装了儿童座椅"></div>
    <div class="chips" id="a27OuterPre" style="margin-top:8px"></div>
    <div class="a27-orig" id="a27Orig">先选一个案例。</div>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>② 产品要怎么跟着变</h4><span>≥15 字</span></div>
    <div class="field"><textarea id="a27React" maxlength="150" placeholder="例如：如果后排有儿童座椅，气帘展开压力降一档、行程多覆盖 5 cm，同时后门童锁自动落锁。"></textarea></div>
    <div class="a27-meta"><span id="a27ReLen">0</span> / 150</div>
    <div class="a27-remind">换掉第二栏之后：① 原来的规则还成不成立　② 产品要多读一个什么信号　③ 用户会不会多做一个动作。</div>
  </div>
</div>
<div class="panel a27-shift" style="margin-top:12px">
  <div class="panel-h"><h4>换掉第二栏，三栏都跟着动</h4><span>规则一个字都不用改，说明换的只是名字</span></div>
  <div class="a27-shift3">
    <div><span>第二栏</span><b>先变</b><em>新变量总要多读一点东西：谁在车上、坐哪、多久没休息。读不到，这条依存就不成立。</em></div>
    <div><span>第三栏</span><b>常常要重写</b><em>旧阈值是给旧变量标定的。换成人之后，"越近越软"的拐点要重新找一次。</em></div>
    <div><span>第一栏</span><b>有时要加档</b><em>只有两个状态的属性撑不住更细的判断——可能要从"弹/不弹"变成三档。</em></div>
  </div>
</div>`,
init(sec,apiIn){
  api=apiIn;
  const S=api.S,a=ensure(S);
  const pick=sec.querySelector('#a27Pick'),outer=sec.querySelector('#a27Outer'),
        pre=sec.querySelector('#a27OuterPre'),orig=sec.querySelector('#a27Orig'),
        react=sec.querySelector('#a27React'),reLen=sec.querySelector('#a27ReLen');
  pick.innerHTML=CASES.map(c=>'<button class="a27-pick-c" data-mc="'+c.k+'">'+
    '<img src="'+IMG[c.img]+'" alt=""><span><b>'+c.n+'</b><em>'+c.origOut+'</em></span><i>→</i></button>').join('');
  function paintPick(){
    pick.querySelectorAll('[data-mc]').forEach(b=>b.classList.toggle('on',a.mineCase===b.dataset.mc));
    const c=BY[a.mineCase];
    orig.innerHTML=c
      ? '<b>原来的三栏</b><span>'+c.origIn+' × '+c.origOut+'　→　'+c.origRule+'</span>'
      : '<b>原来的三栏</b><span>先选一个案例。</span>';
    pre.innerHTML=c?c.alt.map(g=>'<button class="chip" data-g="'+api.esc(g)+'">'+api.esc(g)+'</button>').join(''):'';
    pre.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{
      outer.value=b.dataset.g;a.newOuter=outer.value;api.save();api.refresh();
    });
  }
  outer.value=a.newOuter||'';
  react.value=a.react||'';
  pick.querySelectorAll('[data-mc]').forEach(b=>b.onclick=()=>{
    a.mineCase=b.dataset.mc;paintPick();api.save();api.refresh();
  });
  outer.addEventListener('input',()=>{a.newOuter=outer.value;api.save();api.refresh();});
  react.addEventListener('input',()=>{a.react=react.value;reLen.textContent=a.react.length;api.save();api.refresh();});
  sec.__a27mine=()=>{paintPick();};
  paintPick();reLen.textContent=(a.react||'').length;
},
onEnter(){
  const sec=document.querySelector('.step[data-s="3"]');
  if(sec&&sec.__a27mine)sec.__a27mine();
},
hint(S){
  const a=ensure(S);
  if(!a.mineCase)return '先选一个案例';
  if((a.newOuter||'').trim().length<8)return '写下新的外部变量（至少 8 字）';
  if((a.react||'').trim().length<15)return '还差一句：产品要怎么跟着变（至少 15 字）';
  return '';
},
gate(S){
  const a=ensure(S);
  return !!(a.mineCase&&(a.newOuter||'').trim().length>=8&&(a.react||'').trim().length>=15);
}},

/* ---------- 5 过滤与提交 ---------- */
{id:'submit',name:'过滤与提交',short:'提交',kicker:'STEP 5 · 过滤与提交',
html:`
<div class="step-h"><h1>两个过滤，<em>然后交卡</em></h1>
<p>新换上的外部变量，先过两问：测得到吗？测错了会怎样？</p></div>
<div class="grid2" style="align-items:start">
  <div id="a27CardSlot"></div>
  <div class="stack" style="gap:10px">
    <div class="panel">
      <div class="panel-h"><h4>① 新外部变量测得到吗</h4><span>1–5 分</span></div>
      <div class="score"><div class="score-i">
        <div class="lb"><b>有没有现成的读数</b><span>1 = 只能问用户，5 = 本来就在测</span></div>
        <div class="stars" data-k="measure">${[1,2,3,4,5].map(n=>'<button data-v="'+n+'">'+n+'</button>').join('')}</div>
      </div></div>
      <div class="hint" id="a27ScoreHint" style="margin-top:8px">打分之后，这里给一句判断。</div>
    </div>
    <div class="panel">
      <div class="panel-h"><h4>② 测错了会怎样</h4><span>≥8 字</span></div>
      <div class="field"><textarea id="a27Wrong" maxlength="90" placeholder="例如：距离读小了一档，气帘压力偏低，侧碰时头部没有缓冲。"></textarea></div>
      <div class="a27-meta"><span id="a27WrLen">0</span> / 90</div>
    </div>
    <div class="panel">
      <div class="panel-h"><h4>提交</h4><span id="a27SubSt">未提交</span></div>
      <div class="row"><button class="btn primary" id="a27Sub">提交</button>
        <button class="btn" id="a27Exp">导出 PNG</button></div>
      <div class="hint" style="margin-top:6px">提交后引擎先跑一次 AI 评审（有用 / 可行 / 证据），再进班级互评。</div>
    </div>
  </div>
</div>
<div class="panel a27-read" style="margin-top:12px">
  <div class="panel-h"><h4>这张卡会被怎么读</h4><span>互评时先看这三处</span></div>
  <div class="a27-read3">
    <div><span>01</span><b>外部变量：是不是本来就在测</b><em>要用户先戴设备、先填问卷才拿到的读数，多半站不住。</em></div>
    <div><span>02</span><b>规则：方向能不能写成一句</b><em>写不出"越…越…"，就还停在"可以调"。</em></div>
    <div><span>03</span><b>换变量：三栏有没有连锁</b><em>规则一个字都没改，说明换的只是名字。</em></div>
  </div>
</div>`,
init(sec,apiIn){
  api=apiIn;
  const S=api.S,a=ensure(S);
  const slot=sec.querySelector('#a27CardSlot'),wrong=sec.querySelector('#a27Wrong'),
        wrLen=sec.querySelector('#a27WrLen'),hintEl=sec.querySelector('#a27ScoreHint'),
        st=sec.querySelector('#a27SubSt'),btn=sec.querySelector('#a27Sub');
  const JUDGE={
    1:'1 分：只能靠问用户。这条依存现在还是一个愿望。',
    2:'2 分：偶尔读得到，同一场景两次读数还不一样。',
    3:'3 分：读得到，但要用户配合——戴设备、填表、点确认。',
    4:'4 分：车上或机内已经有传感器，读得到，延迟能接受。',
    5:'5 分：本来就在测，取一次数不要钱，方向还单调。'
  };
  function paint(full){
    if(full&&document.activeElement!==wrong)wrong.value=a.wrong||'';
    wrLen.textContent=(a.wrong||'').length;
    sec.querySelectorAll('.stars[data-k="measure"] button').forEach(b=>b.classList.toggle('on',+b.dataset.v<=(a.measure||0)));
    hintEl.textContent=a.measure?JUDGE[a.measure]:'打分之后，这里给一句判断。';
    const c=api.card();
    slot.innerHTML='<div class="outcard a27-card"><div class="oh"><span>DELIVERABLE · A27</span><span>依存还原卡</span></div>'+
      '<h5>'+api.esc(c.title)+'</h5><div class="kv">'+(c.rows||[]).map(r=>
        '<div><b>'+api.esc(r[0])+'</b><span class="'+(r[1]&&r[1]!=='—'?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+'</div></div>';
    const ready=!!(a.measure&&(a.wrong||'').trim().length>=8);
    st.textContent=S.submitted?'已提交':'未提交';
    btn.textContent=S.submitted?'已提交，去看班级':(ready?'提交':'先补完两个过滤');
    btn.disabled=!!S.submitted||!ready;
  }
  sec.querySelectorAll('.stars[data-k="measure"] button').forEach(b=>b.onclick=()=>{
    a.measure=+b.dataset.v;api.save();paint(false);api.refresh();
  });
  wrong.addEventListener('input',()=>{a.wrong=wrong.value;api.save();paint(false);api.refresh();});
  btn.onclick=async()=>{
    if(!(a.measure&&(a.wrong||'').trim().length>=8)){api.toast('先把两个过滤补完');return;}
    await api.submit();paint(false);
  };
  sec.querySelector('#a27Exp').onclick=()=>api.exportCard();
  sec.__a27paint=()=>paint(true);
  paint(true);
},
onEnter(){
  const sec=document.querySelector('.step[data-s="4"]');
  if(sec&&sec.__a27paint)sec.__a27paint();
},
hint(S){
  const a=ensure(S);
  if(!a.measure)return '先给"新外部变量测得到吗"打分';
  if((a.wrong||'').trim().length<8)return '写一句：测错了会怎样（至少 8 字）';
  return '';
},
gate(S){
  const a=ensure(S);
  return !!(a.measure&&(a.wrong||'').trim().length>=8);
}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>带走<em>三句话</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 属性越窄越好</div>
    <p class="small" style="margin-top:5px">气囊只做"弹或不弹"。属性收窄到两个状态，依存才容易被验证。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 触发量最好是现成的</div>
    <p class="small" style="margin-top:5px">插拔、坐下、上车——用户本来就要做的动作，读它不要钱。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 规则要能写成一句</div>
    <p class="small" style="margin-top:5px">"越近越软"能验证；"智能调节"不能。写不出来，就是还没想清。</p></div>
</div>
<div class="panel" style="margin-bottom:12px">
  <div class="panel-h"><h4>三个案例，一张表</h4><span>同一个动作，三种触发量</span></div>
  <div class="a27-table">
    <div class="a27-tr a27-thd"><span>案例</span><span>内部属性</span><span>外部变量</span><span>依存规则</span></div>
    <div class="a27-tr"><b>安全气囊</b><span>是否弹出</span><span>车身减速度</span><span>越过阈值就点火</span></div>
    <div class="a27-tr"><b>BIC 圆珠笔</b><span>笔身长度</span><span>口袋还是桌面</span><span>插进口袋就缩短</span></div>
    <div class="a27-tr"><b>Volvo 侧气帘</b><span>压力与行程</span><span>体型与坐姿</span><span>头越近，压力越低</span></div>
  </div>
</div>
<div class="a27-end">依存不是"更智能"，是<em>这一次，它知道该用哪一档</em>。</div>
<div class="grid2" style="margin-bottom:12px;align-items:start">
  <div class="panel">
    <div class="panel-h"><h4>三个案例的共同点</h4><span>都不是加功能</span></div>
    <div class="a27-close">
      <div><b>01</b><span>内部属性都只有一个，而且只取两三个值。</span></div>
      <div><b>02</b><span>外部变量都在产品外面，且都已经被测到了——传感器、动作、位置。</span></div>
      <div><b>03</b><span>规则都能写成一句"越…越…"，写不成的那条，还没成立。</span></div>
    </div>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>留给 A28 的两个问题</h4><span>带着走</span></div>
    <div class="a27-close">
      <div><b>01</b><span>两个变量总是一起动，怎么判断谁在驱动谁？</span></div>
      <div><b>02</b><span>你的产品里，哪个量现在就在测，却没人拿它去改别的属性？</span></div>
    </div>
  </div>
</div>
<div class="panel">
  <div class="panel-h"><h4>下一节</h4><span>A28</span></div>
  <p class="small">A28 · 属性关联：实战与伪相关。换你自己的产品，把三栏填满；再专门拆一种最容易骗过自己的情况——两个变量一起动，但谁也不驱动谁。</p>
  <div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a>
    <button class="btn" id="a27Again">重看这一节</button></div>
</div>`,
init(sec,apiIn){api=apiIn;sec.querySelector('#a27Again').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '你的外部变量，真的能在产品里读到吗？还是要先问用户？',
 '换上新的外部变量后，原来的规则一个字都不用改吗？',
 '这个依存，用户需要多做一个动作吗？',
 '测错一档时，谁会受伤、谁会赔钱？',
 '三个案例里，哪一个的触发量是"本来就有的动作"？'
]},

card(S){
  const a=(S.answers&&S.answers.a27)||{};
  const mine=a.mineCase&&BY[a.mineCase];
  return {title:'A27 · 依存还原卡',rows:[
    ['气囊',brief(a,'airbag')],
    ['圆珠笔',brief(a,'pen')],
    ['侧气帘',brief(a,'curtain')],
    ['换变量',mine?(mine.n+' → '+(a.newOuter||'—')):'—'],
    ['怎么变',a.react||'—'],
    ['过滤',(a.measure?'测得 '+a.measure+'/5 · ':'')+(a.wrong||'—')]
  ]};
},

notes:[
 {t:'本节目标',h:'用三个已成立的案例，把属性关联压成三栏：内部属性、外部变量、依存规则。学员要能看出每个案例真正读的是哪个量——气囊读减速度、笔读场景、气帘读人，而不是读那个最显眼的量（车速、口袋深度、撞击方向）。'},
 {t:'时间分配',h:'先猜 4′ · 三栏法 8′ · 还原台 16′ · 换变量 8′ · 两问与提交 7′ · 收束 2′。还原台至少留 12 分钟让人真填；对照环节不要抢答。'},
 {t:'常见卡点',h:'第一栏最常写成功能名（"保护""缓冲"），要求改成可以取两个值的量。第二栏最常写成"用户需求"，追问一句：这个数从哪读出来。第三栏最常写成"自动调节"，要求补方向和阈值。换变量那一步，很多人只换名字，规则一字不改——直接问：那到底哪一栏变了。'},
 {t:'直播怎么接',h:'打开后台看九栏和"换变量"卡：先挑一个第二栏写"用户需求"的，问"这个数从哪读出来"；再挑一个换了变量、规则却没动的，问"原来的规则为什么还成立"。最后把三张卡的第二栏并排放，让全班看同一件事：能被产品读到的量，通常都很朴素。'},
 {t:'案例口径',h:'气囊：控制器读减速度，约 13–23 km/h 撞固定壁的量级越过标定点火，判断窗口 30 毫秒、充满约 50 毫秒；车速不进这条判断，体重用于副驾气囊开关，安全带影响点火策略但不改"弹不弹"。圆珠笔：14–15 cm 的笔配 12 cm 的口袋，改的是长度这一栏。侧气帘：沃尔沃 1998 年 S80 起标配、覆盖整个侧窗、翻滚时保持充气；压力绑到体型与坐姿是这条依存的延伸，不要说成沃尔沃已量产的做法。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A27']=L;
})();
