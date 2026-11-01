/* A10 · 减法：三个案例还原 */
(function(){
'use strict';

const IMG={
  ipod:'assets-cases-a10-ipod.jpg',
  mykey:'assets-cases-a10-mykey.jpg',
  sedasys:'assets-cases-a10-sedasys.jpg'
};

/* ---------- 三个案例：每案三栏 ---------- */
const CASES=[
{
 k:'ipod',n:'iPod Shuffle',brand:'苹果 · 2005',img:'ipod',
 sum:'拿掉屏幕，把“选”交给随机',
 note:'官方口径：As Is 减法。拿掉图形界面和实时选曲，不补任何东西。卖点是“不用选，随机听”。（Day1 p.114）',
 orig:'跑步、健身的人：手上有汗，眼睛不看设备',
 groups:['健身房租借','游泳馆前台','儿童听力'],
 cols:[
  {id:'cut',h:'拿掉了什么',tip:'具体到组件，不写“体验”',
   ph:'例如：屏幕，和屏幕才能做的实时选曲',
   cands:['屏幕','实时选曲','图形界面','耳机口'],
   off:'屏幕，以及屏幕才能做的实时选曲——整个图形界面拿掉。',
   keys:['屏幕','选曲','界面'],
   why:'官方把它叫 As Is：不补任何东西，直接拿残缺形态去卖。屏幕不是被便宜方案替代，是被放弃。'},
  {id:'fill',h:'功能由谁补',tip:'点名一个已有功能、一件物，或“不新增”',
   ph:'例如：随机播放接管了“选”',
   cands:['随机播放','圆盘按键','没有新增部件','手机选歌'],
   off:'没有新增任何部件。产品里本来就有的随机播放接管了“选”，播放、音量、下一首还在圆盘按键上。',
   keys:['没有新增','随机','圆盘','按键'],
   why:'官方把这叫 As Is：不装新东西，也不假装没缺。听的功能还在，选择被交出去了。'},
  {id:'who',h:'新用户是谁',tip:'具体到一类人，不写“所有人”',
   ph:'例如：跑步的人，手上都是汗',
   cands:['跑步的人','健身房里的人','不想选歌的人','发烧友'],
   off:'跑步和健身的人：手上有汗、眼睛不看设备；还有不想建歌单的人。',
   keys:['跑步','健身','不想选','不想建'],
   why:'场景决定谁会接受“看不见”。坐在电脑前挑歌的人不会。'}
 ]
},
{
 k:'mykey',n:'福特 MyKey',brand:'福特 · 北美',img:'mykey',
 sum:'拿掉一把钥匙的绝对权限，让限制可恢复',
 note:'官方口径：限制集中在孩子那把钥匙上，父母的车不受影响；安全带未系时音响静音，直到系上。（Day1 p.115）',
 orig:'给孩子买车的家长：付钱的人不坐驾驶位',
 groups:['车队管理者','租车公司','驾校教练'],
 cols:[
  {id:'cut',h:'拿掉了什么',tip:'具体到组件或权限，不写“自由”',
   ph:'例如：那把钥匙的限速与音量权限',
   cands:['那把钥匙的权限','车速上限','音量上限','安全带提醒','发动机'],
   off:'一把钥匙的权限：限速 80 英里、音量封顶 44%、不系安全带就静音、低油量提前到 75 英里报警。',
   keys:['钥匙','权限','80','44','音量','安全带'],
   why:'拿掉的是权限，不是能力。发动机、刹车、最高车速都没有改。'},
  {id:'fill',h:'功能由谁补',tip:'点名一个具体的人或物',
   ph:'例如：另一把钥匙，换回就恢复',
   cands:['另一把钥匙','车主预设','车的性能','仪表提示'],
   off:'另一把钥匙。车没变，换回主人钥匙全部恢复；限制由车主在车辆信息中心里预先写进钥匙芯片。',
   keys:['另一把','钥匙','车主','恢复','预设','信息'],
   why:'补位者不在车里，在钥匙里。所以限制是可恢复的：同一辆车，两套权限。'},
  {id:'who',h:'新用户是谁',tip:'具体到一类人，不写“所有人”',
   ph:'例如：给孩子买车的家长',
   cands:['给孩子买车的家长','车队管理者','租车公司','新手司机'],
   off:'给孩子买车的家长：付钱的人不坐在驾驶位上。',
   keys:['家长','父母','孩子','付钱'],
   why:'MyKey 的用户是车主，不是驾驶者。这是它最反常识的一处：使用者被限制，购买者获得控制。'}
 ]
},
{
 k:'sedasys',n:'Sedasys',brand:'强生爱惜康 · 2014 十大医疗创新',img:'sedasys',
 sum:'拿掉备用电池和屏幕键盘，让非麻醉医生也能做镇静',
 note:'官方口径：先省成本与手术室占地；断电安全借 crash cart，显示借床旁监护仪。2014 年克利夫兰诊所十大医疗创新。（Day1 p.138–144）',
 orig:'没有麻醉医生的内镜中心：医生和护士自己完成镇静',
 groups:['体检中心','牙科诊所','急诊留观室'],
 cols:[
  {id:'cut',h:'拿掉了什么',tip:'具体到组件，按顺序写',
   ph:'例如：备用电池，再是屏幕和键盘',
   cands:['备用电池','屏幕和键盘','落地机柜','输液泵'],
   off:'先拿掉备用电池，再拿掉机身上的屏幕和键盘；机器从落地大柜变成床旁的小盒。',
   keys:['备用电池','电池','屏幕','键盘','机柜'],
   why:'两刀都砍在“看起来不能没有”的部件上：断电安全、参数显示。省下的是成本和手术室最贵的东西——占地。'},
  {id:'fill',h:'功能由谁补',tip:'点名手术室里已经有的东西',
   ph:'例如：手术室里的 crash cart',
   cands:['手术室的 crash cart','现有监护仪屏幕','麻醉医生','护士站'],
   off:'断电安全借手术室现有的 crash cart（自带备用电池），加一个转接接口；显示借床旁监护仪屏幕的余量，因为护士本来就在看病人。',
   keys:['crash','推车','备用电池','监护仪','床旁','屏幕','接口','护士'],
   why:'被质疑“断电怎么办”时，他们没有把电池装回去，而是去房间里找已经存在的资源。'},
  {id:'who',h:'新用户是谁',tip:'具体到一类机构或岗位',
   ph:'例如：没有麻醉医生的内镜中心',
   cands:['没有麻醉医生的内镜中心','日间手术室','急诊科','三甲医院麻醉科'],
   off:'没有麻醉医生的内镜中心与日间手术室：医生和护士自己完成镇静，诊所省掉一份麻醉师的人力。',
   keys:['内镜','日间','麻醉','医生','护士','诊所'],
   why:'设备变小只是手段；真正的变化是“谁能操作它”。新用户不是医院，是没有麻醉科的地方。'}
 ]
}
];
const BY={};CASES.forEach(c=>BY[c.k]=c);
const COLS=['cut','fill','who'];

/* ---------- 状态 ---------- */
function blankRestore(){
  const o={};CASES.forEach(c=>{o[c.k]={cut:'',fill:'',who:''};});return o;
}
function ensure(S){
  const ans=S.answers;
  if(!ans.a10||typeof ans.a10!=='object')ans.a10={};
  const a=ans.a10;
  if(!a.restore||typeof a.restore!=='object')a.restore=blankRestore();
  CASES.forEach(c=>{if(!a.restore[c.k]||typeof a.restore[c.k]!=='object')a.restore[c.k]={cut:'',fill:'',who:''};});
  if(!BY[a.caseTab])a.caseTab='ipod';
  if(typeof a.mineGroup!=='string')a.mineGroup='';
  if(typeof a.mineChange!=='string')a.mineChange='';
  if(typeof a.workaround!=='string')a.workaround='';
  return a;
}
function field(a,k,id){return ((a.restore[k]||{})[id]||'').trim();}
function filled(a){let n=0;CASES.forEach(c=>COLS.forEach(id=>{if(field(a,c.k,id).length>=4)n++;}));return n;}
function doneCases(a){return CASES.filter(c=>COLS.every(id=>field(a,c.k,id).length>=4)).length;}
function unlocked(a){return filled(a)>=9;}
function hitsOf(col,text){
  const t=(text||'').toLowerCase();
  return col.keys.filter(k=>t.indexOf(k.toLowerCase())>=0);
}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function escapeRe(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
function markOff(text,keys,user){
  const u=(user||'').toLowerCase();
  const ks=keys.slice().sort((x,y)=>y.length-x.length).map(escapeRe);
  const re=new RegExp('('+ks.join('|')+')','g');
  let out='',last=0,m;
  while((m=re.exec(text))){
    out+=esc(text.slice(last,m.index));
    const hit=u.indexOf(m[0].toLowerCase())>=0;
    out+='<em class="'+(hit?'a10-hit':'a10-miss')+'">'+esc(m[0])+'</em>';
    last=m.index+m[0].length;
  }
  out+=esc(text.slice(last));
  return out;
}
function brief(a,k){
  const r=(a.restore||{})[k]||{};
  const v=COLS.map(id=>(r[id]||'').trim()).filter(Boolean);
  return v.length?v.join(' → '):'—';
}

const L={
id:'A10',week:3,seq:10,title:'减法：三个案例还原',
kicker:'WEEK 3 · 减法 · 案例解剖',tool:'sub',toolName:'减法',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>同一辆车，<em>两把钥匙</em>：拿掉的是速度，还是权限？</h1>
<p>福特 MyKey 让家长限制孩子开的那辆车：限速 80 英里、音量封顶、不系安全带就静音。先选一个判断。</p></div>
<div class="a10-hook">
  <figure class="a10-photo">
    <button class="case-zoom" data-zoom="mykey" title="看大图">⤢</button>
    <img src="${IMG.mykey}" alt="福特 MyKey 仪表盘，显示 SPEED LIMITED TO 80 MPH" loading="lazy">
    <figcaption><b>福特 MyKey</b><span>仪表上多了一行：SPEED LIMITED TO 80 MPH。</span>
      <em class="a10-src">图：SIT 官方课程材料（已授权）　Day1 p.115</em></figcaption>
  </figure>
  <div class="a10-hook-r">
    <div class="a10-ask"><span class="a10-ask-k">先别查</span><p>MyKey 拿掉的是<em>哪一样</em>？</p></div>
    <div class="opts">
      <button class="opt" data-h="a"><span class="k">A</span><span><b>速度</b><span>把车的最高速度从工程上锁在 80 英里</span></span></button>
      <button class="opt" data-h="b"><span class="k">B</span><span><b>权限</b><span>同一辆车，这把钥匙少了几项权利</span></span></button>
      <button class="opt" data-h="c"><span class="k">C</span><span><b>仪表</b><span>拿掉速度表，让人不知道开多快</span></span></button>
    </div>
  </div>
</div>
<div id="a10HookOut" style="margin-top:12px"></div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#a10HookOut'),a=ensure(S);
  function paint(){
    const v=a.hook;
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',v===b.dataset.h));
    if(!v){out.innerHTML='';return;}
    const ok=v==='b';
    out.innerHTML='<div class="a10-reveal '+(ok?'ok':'warn')+'">'+
      '<div class="a10-reveal-h"><span>'+(ok?'你看见了':'换个角度看')+'</span><span>B · 权限</span></div>'+
      '<p><b>福特没有动发动机。</b>限速 80 英里、音量封顶 44%、不系安全带就静音、低油量提前到 75 英里报警——这些限制都绑在<b>一把钥匙</b>上。同一辆车，换回主人钥匙，全部恢复。</p>'+
      '<p class="small">'+(ok
        ? '你抓住的是“同一辆车”这四个字。拿掉的不是车的能力，是这把钥匙能用到多少。'
        : (v==='a'
          ? '你选的是速度。但车的最高速度没变：换回主人钥匙，80 英里以上照样能开。被拿走的是这把钥匙的权限。'
          : '仪表还在，而且多了一行字。被拿走的是权限，不是信息。'))+'</p>'+
      '<div class="a10-facts">'+
        '<div><b>80</b><span>mph 上限</span></div>'+
        '<div><b>44%</b><span>音量封顶</span></div>'+
        '<div><b>75</b><span>英里就提醒加油</span></div>'+
        '<div><b>1</b><span>把钥匙承载全部限制</span></div>'+
      '</div>'+
      '<p class="a10-note">这是时间性减法：不是让车变慢，是让某个人在某段时间里慢。限制可以撤销。</p>'+
      '</div>';
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{a.hook=b.dataset.h;api.save();paint();api.refresh();});
  sec.querySelectorAll('[data-zoom]').forEach(b=>b.onclick=e=>{
    e.stopPropagation();
    api.modal('<button class="modal-x">×</button><h3>福特 MyKey</h3>'+
      '<img src="'+IMG.mykey+'" style="width:100%;border-radius:8px;margin:8px 0 12px" alt="MyKey 仪表盘">'+
      '<p>仪表上的 SPEED LIMITED TO 80 MPH，来自一把被编程过的钥匙。同一辆车的另一把钥匙不受影响。</p>'+
      '<p class="small">图：SIT 官方课程材料（已授权）　Day1 p.115</p>');
  });
  paint();
},
hint(S){return ensure(S).hook?'':'先选一个：拿掉的是速度、权限，还是仪表';},
gate(S){return !!ensure(S).hook;}},

/* ---------- 2 概念 ---------- */
{id:'concept',name:'三栏法',short:'三栏',kicker:'STEP 2 · 概念',
html:`
<div class="step-h"><h1>一个案例，<em>三栏</em>就能拆开</h1>
<p class="a10-hide-sh">拿掉什么 → 功能由谁补 → 新用户是谁。第二栏是命门：写“用户自己适应”，等于没补。</p></div>
<div class="a10-chain">
  <div class="a10-node"><span>01</span><b>一个组件被拿掉</b><em>屏幕 / 权限 / 电池</em></div>
  <i class="a10-ar">→</i>
  <div class="a10-node wn"><span>02</span><b>功能悬空</b><em>这条功能谁兑现？</em></div>
  <i class="a10-ar">→</i>
  <div class="a10-node ac"><span>03</span><b>补位者接住</b><em>已有功能 / 同款 / 现场物</em></div>
  <i class="a10-ar">→</i>
  <div class="a10-node"><span>04</span><b>新用户出现</b><em>因为少了它而受益的人</em></div>
</div>
<div class="grid2" style="margin-top:12px;align-items:start">
  <div class="panel a10-def">
    <div class="panel-h"><h4>三栏法</h4><span>案例还原</span></div>
    <p class="a10-def-p">拿掉什么 → 功能由谁补 → 新用户是谁。</p>
    <div class="a10-def-rule"><b>判据</b><span>功能必须还在。少了组件，功能由别人接住；功能跟着一起消失，那是毁坏，不是减法。</span></div>
    <div class="a10-def-src">依据 SIT 减法定义（Day1 p.113）：去掉一个看起来不可能没有的组件，再为残缺形态找用途。</div>
  </div>
  <div class="panel a10-fill3">
    <div class="panel-h"><h4>补位只有三种</h4><span>本节三个案例各占一种</span></div>
    <div><span>01</span><b>已有功能接管</b><em>iPod：随机播放接管“选”，不新增一个零件。</em></div>
    <div><span>02</span><b>另一件同款</b><em>MyKey：另一把钥匙补回完整权限，车没变。</em></div>
    <div><span>03</span><b>现场已有的东西</b><em>Sedasys：crash cart 的电池、床旁的监护仪。</em></div>
  </div>
</div>
<div class="panel a10-no" style="margin-top:10px">
  <div class="panel-h"><h4>什么时候别用</h4><span>省下的钱不够赔一次事故</span></div>
  <div class="a10-no3">
    <div><b>安全冗余只能有一份</b><span>医用电源、刹车、消防——不能靠“别人也有”来补。</span></div>
    <div><b>法规写死的项</b><span>剂量上限、身份核验、报警阈值，拿掉就是违规。</span></div>
    <div><b>补位的人不在现场</b><span>或者他不能可靠地接住，这条减法就还不成立。</span></div>
  </div>
</div>
<div class="panel a10-choice" style="margin-top:10px">
  <div class="panel-h"><h4>哪一句，才算减法成立？</h4><span>二选一</span></div>
  <div class="opts a10-opts2">
    <button class="opt" data-c2="a"><span class="k">A</span><span><b>拿掉之后还能开机、还能用，就算成立。</b><span>东西还在转，只是少了一块</span></span></button>
    <button class="opt" data-c2="b"><span class="k">B</span><span><b>原来的功能由具体的人或物接住，才算成立。</b><span>缺的那块有人补，用户才拿到完整价值</span></span></button>
  </div>
  <div id="a10C2Out" style="margin-top:9px"></div>
</div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#a10C2Out'),a=ensure(S);
  function paint(){
    const v=a.concept;
    sec.querySelectorAll('[data-c2]').forEach(b=>b.classList.toggle('on',v===b.dataset.c2));
    if(!v){out.innerHTML='';return;}
    const ok=v==='b';
    out.innerHTML='<div class="a10-reveal '+(ok?'ok':'warn')+'">'+
      '<div class="a10-reveal-h"><span>'+(ok?'对':'再进一步')+'</span><span>判据：功能必须还在</span></div>'+
      '<p class="small">'+(ok
        ? 'B 是减法。屏幕没了，听歌还在；电池没了，断电安全还在——只是换了人来兑现。'
        : 'A 是清库存。功能跟着组件一起消失，用户拿到的是一个残次品——那叫毁坏，不叫减法。')+'</p>'+
      '<p class="small">iPod 是特例：<b>不新增部件</b>，用产品里本来就有的随机播放接住“选”。不补零件，不等于功能没人管。</p></div>';
  }
  sec.querySelectorAll('[data-c2]').forEach(b=>b.onclick=()=>{a.concept=b.dataset.c2;api.save();paint();api.refresh();});
  paint();
},
hint(S){return ensure(S).concept?'':'选一句：哪一句才算减法成立';},
gate(S){return !!ensure(S).concept;}},

/* ---------- 3 工作台：三栏还原台 ---------- */
{id:'bench',name:'还原台',short:'还原台',kicker:'STEP 3 · 三栏还原台',
html:`
<div class="step-h"><h1>把三个案例，<em>拆回三栏</em></h1>
<p>每个案例一屏，三栏都填。九栏填完，才解锁“看官方还原”——对照，不判卷。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>选一个案例</span>
  <span class="op"><span class="op-n">2</span>点候选词，或自己写</span>
  <span class="op"><span class="op-n">3</span>三个都填完，对照官方</span>
</div>
<div class="bench a10-bench">
  <div class="bench-h"><b>BENCH · 三栏还原台</b><span class="st" id="a10St">0 / 9 栏 · 0 / 3 案例</span></div>
  <div class="bench-b">
    <div class="a10-tabs" id="a10Tabs"></div>
    <div class="a10-panes" id="a10Panes"></div>
    <div class="a10-cmp" id="a10Cmp"></div>
  </div>
  <div class="bench-f">
    <span class="small" id="a10Lock">九栏填完，解锁官方还原</span>
    <div style="flex:1"></div>
    <button class="btn sm ghost" id="a10Clear">重填本案例</button>
    <button class="btn sm" id="a10See" disabled>看官方还原</button>
  </div>
</div>
<div class="a10-credit">案例图：SIT 官方课程材料（已授权）· Day1 p.114–144</div>`,
init(sec,api){
  const S=api.S,a=ensure(S);
  const tabs=sec.querySelector('#a10Tabs'),panes=sec.querySelector('#a10Panes'),
        cmp=sec.querySelector('#a10Cmp'),st=sec.querySelector('#a10St'),
        lock=sec.querySelector('#a10Lock'),see=sec.querySelector('#a10See');
  let cmpOpen=false,ACT=a.caseTab;

  tabs.innerHTML=CASES.map(c=>'<button class="a10-tab" data-tab="'+c.k+'">'+
    '<span class="a10-th"><img src="'+IMG[c.img]+'" alt=""></span>'+
    '<span class="a10-tb"><b>'+c.n+'</b><em data-tp>0 / 3</em></span><i class="a10-dot"></i></button>').join('');

  panes.innerHTML=CASES.map(c=>'<div class="a10-pane" data-pane="'+c.k+'"><div class="a10-cols">'+
    c.cols.map((col,i)=>'<div class="a10-col" data-col="'+col.id+'">'+
      '<div class="a10-col-h"><span class="a10-col-n">0'+(i+1)+'</span><b>'+col.h+'</b></div>'+
      '<div class="a10-col-t">'+col.tip+'</div>'+
      '<div class="a10-cands">'+col.cands.map(p=>'<button class="chip" data-cand="'+api.esc(p)+'" data-c="'+col.id+'">'+api.esc(p)+'</button>').join('')+'</div>'+
      '<textarea data-f="'+col.id+'" maxlength="90" placeholder="'+api.esc(col.ph)+'"></textarea>'+
      '<div class="a10-meta"><span data-cn>0</span> / 90</div>'+
    '</div>').join('')+
    '</div><div class="a10-case-note"><b>官方备注</b><span>'+c.note+'</span></div></div>').join('');

  const paneOf=k=>panes.querySelector('[data-pane="'+k+'"]');

  function paintChips(k){
    const r=a.restore[k];
    paneOf(k).querySelectorAll('.a10-col').forEach(colEl=>{
      const id=colEl.dataset.col,v=(r[id]||'');
      colEl.querySelectorAll('[data-cand]').forEach(ch=>ch.classList.toggle('on',v.indexOf(ch.dataset.cand)>=0));
      colEl.querySelector('[data-cn]').textContent=v.length;
    });
  }
  function paintTabs(){
    tabs.querySelectorAll('[data-tab]').forEach(t=>{
      const k=t.dataset.tab;
      const n=COLS.filter(id=>field(a,k,id).length>=4).length;
      t.classList.toggle('on',k===ACT);
      t.classList.toggle('done',n===3);
      t.querySelector('[data-tp]').textContent=n+' / 3';
    });
  }
  function paintStatus(){
    st.textContent=filled(a)+' / 9 栏 · '+doneCases(a)+' / 3 案例';
    see.textContent=cmpOpen?'收起官方还原':'看官方还原';
    see.disabled=cmpOpen?false:!unlocked(a);
    lock.textContent=cmpOpen?'对照完收起，可以继续改':(unlocked(a)?'九栏齐了：点“看官方还原”对照':'九栏填完，解锁官方还原');
  }
  function showPane(k){
    ACT=k;a.caseTab=k;
    panes.querySelectorAll('.a10-pane').forEach(p=>p.classList.toggle('on',p.dataset.pane===k));
    paintTabs();
    if(cmpOpen)renderCmp(k);
  }
  function renderCmp(k){
    const c=BY[k],r=a.restore[k]||{};
    cmp.innerHTML='<div class="a10-cmp-h"><div><b>官方还原 · '+c.n+'</b>'+
      '<span>'+c.brand+'　对照不是判卷：<em class="a10-hit">绿</em>=你提到了，<em class="a10-miss">黄</em>=官方提到了你没有</span></div>'+
      '<button class="btn sm ghost" id="a10CmpX">收起对照</button></div>'+
      c.cols.map((col,i)=>{
        const u=(r[col.id]||'').trim();
        const hit=hitsOf(col,u),miss=col.keys.filter(x=>hit.indexOf(x)<0);
        const diff=!hit.length
          ? '官方这一栏落在「'+col.keys.join('、')+'」。你写的是另一个方向——先看它为什么这样落，不判对错。'
          : (miss.length
            ? '官方还落在「'+miss.join('、')+'」；你写到的：'+hit.join('、')+'。'
            : '官方的主要落点你都提到了。再看一眼它为什么这样取舍。');
        return '<div class="a10-cmp-r">'+
          '<div class="a10-cmp-k"><span>0'+(i+1)+'</span><b>'+col.h+'</b>'+
            '<em class="'+(hit.length?'hit':'miss')+'">'+(hit.length?'你提到 '+hit.length+' 处':'0 处重合')+'</em></div>'+
          '<div class="a10-cmp-u"><b>你写的</b><span>'+api.esc(u||'（这一栏还空着）')+'</span></div>'+
          '<div class="a10-cmp-o"><b>官方</b><span>'+markOff(col.off,col.keys,u)+'</span></div>'+
          '<div class="a10-cmp-w"><b>为什么</b><span>'+col.why+'</span></div>'+
          '<div class="a10-cmp-d">'+diff+'</div>'+
        '</div>';
      }).join('');
    cmp.querySelector('#a10CmpX').onclick=()=>{cmpOpen=false;paintCmp();};
  }
  function paintCmp(){
    cmp.classList.toggle('on',cmpOpen);
    panes.classList.toggle('hide',cmpOpen);
    if(cmpOpen)renderCmp(ACT);
    paintStatus();
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
  sec.querySelector('#a10Clear').onclick=()=>{
    a.restore[ACT]={cut:'',fill:'',who:''};
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
{id:'mine',name:'换用户群',short:'换人群',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>案例不换，<em>只换人</em></h1>
<p>同一套减法，换一群用户，三栏里至少有一栏要重写。写清：哪一栏变、变成什么。</p></div>
<div class="a10-pick" id="a10Pick"></div>
<div class="a10-credit">案例图：SIT 官方课程材料（已授权）</div>
<div class="grid2" style="margin-top:12px;align-items:start">
  <div class="panel">
    <div class="panel-h"><h4>新的用户群</h4><span>≥4 字</span></div>
    <div class="field"><input id="a10Group" maxlength="30" placeholder="例如：车队管理者"></div>
    <div class="chips" id="a10GroupPre" style="margin-top:8px"></div>
    <div class="a10-orig" id="a10Orig">先选一个案例。</div>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>这会改掉哪一栏</h4><span>≥15 字</span></div>
    <div class="field"><textarea id="a10Change" maxlength="140" placeholder="例如：新用户变成车队，第二栏的补位者从另一把钥匙变成排班表和后台；第一栏拿掉的还是权限，但口径从安全变成油耗与事故责任。"></textarea></div>
    <div class="a10-meta"><span id="a10ChLen">0</span> / 140</div>
    <div class="a10-remind">三栏：① 拿掉什么　② 谁补位　③ 新用户。写清哪一栏变、变成什么。</div>
  </div>
</div>
<div class="panel a10-shift" style="margin-top:12px">
  <div class="panel-h"><h4>换人群之后，三栏会连锁</h4><span>只改第三栏，等于换个名字</span></div>
  <div class="a10-shift3">
    <div><span>第三栏</span><b>先变</b><em>用户换了，他为什么受益也跟着换。MyKey 从家长换成车队，卖点从“安全”变成“油耗与事故责任”。</em></div>
    <div><span>第二栏</span><b>常常跟着变</b><em>补位者可能不在新场景里。牙科诊所借不到 crash cart，这一栏就得重新找。</em></div>
    <div><span>第一栏</span><b>有时要换</b><em>拿掉的东西在新场景里未必最贵。换人群不是换名字，是重新选一次“拿掉什么”。</em></div>
  </div>
</div>
<div class="panel a10-eg" style="margin-top:12px">
  <div class="panel-h"><h4>同一个换人群，两种写法</h4><span>差在有没有连锁</span></div>
  <div class="a10-eg2">
    <div class="no"><b>只换名字</b><span>用户：车队管理者。拿掉什么、谁补位：照旧。</span><em>车队里没有“家长那把钥匙”，第二栏已经不成立。</em></div>
    <div class="yes"><b>三栏连锁</b><span>第一栏改成“司机的驾驶权限”，第二栏改成“排班表 + 后台限速”，第三栏才是车队调度。</span><em>三栏各自站得住，案例才算真的换了人。</em></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=ensure(S);
  const pick=sec.querySelector('#a10Pick'),group=sec.querySelector('#a10Group'),
        pre=sec.querySelector('#a10GroupPre'),orig=sec.querySelector('#a10Orig'),
        change=sec.querySelector('#a10Change'),chLen=sec.querySelector('#a10ChLen');
  pick.innerHTML=CASES.map(c=>'<button class="a10-pick-c" data-mc="'+c.k+'">'+
    '<img src="'+IMG[c.img]+'" alt=""><span><b>'+c.n+'</b><em>'+c.orig+'</em></span><i>→</i></button>').join('');
  function paintPick(){
    pick.querySelectorAll('[data-mc]').forEach(b=>b.classList.toggle('on',a.mineCase===b.dataset.mc));
    const c=BY[a.mineCase];
    orig.innerHTML='<b>原用户</b><span>'+(c?c.orig:'先选一个案例。')+'</span>';
    pre.innerHTML=c?c.groups.map(g=>'<button class="chip" data-g="'+api.esc(g)+'">'+api.esc(g)+'</button>').join(''):'';
    pre.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{
      group.value=b.dataset.g;a.mineGroup=group.value;api.save();api.refresh();
    });
  }
  group.value=a.mineGroup||'';
  change.value=a.mineChange||'';
  pick.querySelectorAll('[data-mc]').forEach(b=>b.onclick=()=>{
    a.mineCase=b.dataset.mc;
    paintPick();api.save();api.refresh();
  });
  group.addEventListener('input',()=>{a.mineGroup=group.value;api.save();api.refresh();});
  change.addEventListener('input',()=>{a.mineChange=change.value;chLen.textContent=a.mineChange.length;api.save();api.refresh();});
  paintPick();chLen.textContent=(a.mineChange||'').length;
},
hint(S){
  const a=ensure(S);
  if(!a.mineCase)return '先选一个案例';
  if((a.mineGroup||'').trim().length<4)return '写下新的用户群（至少 4 个字）';
  if((a.mineChange||'').trim().length<15)return '还差一句：这会改掉哪一栏（至少 15 字）';
  return '';
},
gate(S){
  const a=ensure(S);
  return !!(a.mineCase&&(a.mineGroup||'').trim().length>=4&&(a.mineChange||'').trim().length>=15);
}},

/* ---------- 5 过滤与提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 过滤与提交',
html:`
<div class="step-h"><h1>两个过滤，<em>然后交卡</em></h1>
<p>三栏填得再顺，也要过两问：新用户真的存在吗？他们现在怎么凑合？</p></div>
<div class="grid2" style="align-items:start">
  <div id="a10CardSlot"></div>
  <div class="stack" style="gap:10px">
    <div class="panel">
      <div class="panel-h"><h4>① 新用户真的存在吗</h4><span>1–5 分</span></div>
      <div class="score"><div class="score-i">
        <div class="lb"><b>能叫出一个具体的人或岗位</b><span>1 = 只是“所有人”，5 = 说得出名字、场景、预算</span></div>
        <div class="stars" data-k="newScore">${[1,2,3,4,5].map(n=>'<button data-v="'+n+'">'+n+'</button>').join('')}</div>
      </div></div>
      <div class="hint" id="a10ScoreHint" style="margin-top:8px">打分之后，这里给一句判断。</div>
    </div>
    <div class="panel">
      <div class="panel-h"><h4>② 他们现在怎么凑合</h4><span>≥8 字</span></div>
      <div class="field"><textarea id="a10Work" maxlength="80" placeholder="例如：家长坐在副驾上盯着，或者干脆不让孩子开夜路"></textarea></div>
      <div class="a10-meta"><span id="a10WkLen">0</span> / 80</div>
    </div>
    <div class="panel">
      <div class="panel-h"><h4>提交</h4><span id="a10SubSt">未提交</span></div>
      <div class="row"><button class="btn primary" id="a10Sub">提交</button>
        <button class="btn" id="a10Exp">导出 PNG</button></div>
      <div class="hint" style="margin-top:6px">提交后引擎先跑一次 AI 评审（有用 / 可行 / 证据），再进班级互评。</div>
    </div>
  </div>
</div>
<div class="panel a10-read" style="margin-top:12px">
  <div class="panel-h"><h4>这张卡会被怎么读</h4><span>互评时先看这三处</span></div>
  <div class="a10-read3">
    <div><span>01</span><b>第一栏：拿掉的是不是“看起来不能没有”</b><em>拿掉一个可有可无的零件，没有人会问“这还能用吗”。</em></div>
    <div><span>02</span><b>第二栏：补位者有没有名字</b><em>“用户自己适应”会被划掉。要有人或物，最好就在现场。</em></div>
    <div><span>03</span><b>换人群：三栏有没有连锁</b><em>只改第三栏，通常是把案例换了个名字。</em></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=ensure(S);
  const slot=sec.querySelector('#a10CardSlot'),work=sec.querySelector('#a10Work'),
        wkLen=sec.querySelector('#a10WkLen'),hintEl=sec.querySelector('#a10ScoreHint'),
        st=sec.querySelector('#a10SubSt'),btn=sec.querySelector('#a10Sub');
  const JUDGE={1:'只有“所有人”这三个字：新用户还不存在。',2:'说不出具体的人：先找一个你认识的岗位。',3:'有一个人影，但还说不清他为什么现在就需要。',4:'说得出人和场景：可以去找他聊十分钟。',5:'名字、场景、预算都对得上：这是一个真用户。'};
  function paint(full){
    if(full&&document.activeElement!==work)work.value=a.workaround||'';
    wkLen.textContent=(a.workaround||'').length;
    sec.querySelectorAll('.stars[data-k="newScore"] button').forEach(b=>b.classList.toggle('on',+b.dataset.v<=(a.newScore||0)));
    hintEl.textContent=a.newScore?JUDGE[a.newScore]:'打分之后，这里给一句判断。';
    slot.innerHTML='<div class="outcard a10-card"><div class="oh"><span>DELIVERABLE · A10</span><span>还原卡</span></div>'+
      '<h5>三案例还原卡</h5><div class="kv">'+api.card().rows.map(r=>'<div><b>'+api.esc(r[0])+'</b><span class="'+(r[1]&&r[1]!=='—'?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+'</div></div>';
    const ready=!!(a.newScore&&(a.workaround||'').trim().length>=8);
    st.textContent=S.submitted?'已提交':'未提交';
    btn.textContent=S.submitted?'已提交，去看班级':(ready?'提交':'先补完两个过滤');
    btn.disabled=!!S.submitted||!ready;
  }
  sec.querySelectorAll('.stars[data-k="newScore"] button').forEach(b=>b.onclick=()=>{
    a.newScore=+b.dataset.v;api.save();paint(false);api.refresh();
  });
  work.addEventListener('input',()=>{a.workaround=work.value;api.save();paint(false);api.refresh();});
  btn.onclick=async()=>{
    if(!(a.newScore&&(a.workaround||'').trim().length>=8)){api.toast('先把两个过滤补完');return;}
    await api.submit();paint(false);
  };
  sec.querySelector('#a10Exp').onclick=()=>api.exportCard();
  sec.__a10paint=()=>paint(true);
  paint(true);
},
onEnter(){
  const sec=document.querySelector('.step[data-s="4"]');
  if(sec&&sec.__a10paint)sec.__a10paint();
},
hint(S){
  const a=ensure(S);
  if(!a.newScore)return '先给“新用户真的存在吗”打分';
  if((a.workaround||'').trim().length<8)return '写一句：他们现在怎么凑合（至少 8 字）';
  return '';
},
gate(S){
  const a=ensure(S);
  return !!(a.newScore&&(a.workaround||'').trim().length>=8);
}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>带走<em>三句话</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 第二栏是命门</div>
    <p class="small" style="margin-top:5px">谁把这个功能接住？点名一个人或一件现成物。“用户自己适应”不是补位。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 补位只有三种</div>
    <p class="small" style="margin-top:5px">已有功能接管 / 另一件同款 / 现场已有的东西。三种都成立，代价不同。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 用户常常不是使用者</div>
    <p class="small" style="margin-top:5px">MyKey 的用户是车主，Sedasys 的用户是没有麻醉科的地方。付钱的人和被限制的人，可以不是同一批。</p></div>
</div>
<div class="panel" style="margin-bottom:12px">
  <div class="panel-h"><h4>三个案例，一张表</h4><span>同一把刀，三种补位</span></div>
  <div class="a10-table">
    <div class="a10-tr a10-thd"><span>案例</span><span>拿掉什么</span><span>谁补位</span><span>新用户</span></div>
    <div class="a10-tr"><b>iPod Shuffle</b><span>屏幕与实时选曲</span><span>随机播放，不新增零件</span><span>跑步、健身的人</span></div>
    <div class="a10-tr"><b>福特 MyKey</b><span>一把钥匙的权限</span><span>另一把钥匙</span><span>给孩子买车的家长</span></div>
    <div class="a10-tr"><b>Sedasys</b><span>备用电池、屏幕键盘</span><span>crash cart、床旁监护仪</span><span>没有麻醉科的诊所</span></div>
  </div>
</div>
<div class="a10-end">减法不是“拿掉”，是拿掉之后，<em>还有人接住</em>。</div>
<div class="panel">
  <div class="panel-h"><h4>下一节</h4><span>A11</span></div>
  <p class="small">A11 · 减法：在我的对象上跑一遍。换你自己的对象：列组件，挑一个看起来不能没有的拿掉，然后把这三栏填满。这一次没人给你官方还原。</p>
  <div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a>
    <button class="btn" id="a10Again">重看这一节</button></div>
</div>`,
init(sec,api){sec.querySelector('#a10Again').onclick=()=>api.go(0);},
hint(S){return '';},gate(S){return true;}}
],

side:{asks:[
 '第二栏你写的是“用户自己适应”吗？现场谁真的把这个活接了？',
 'iPod 没有新增任何零件也成立。你的案例属于哪一种补位？',
 'MyKey 的用户是家长，不是司机。你的事里，付钱的人和用的人是同一批吗？',
 '换了用户群之后，第一栏拿掉的东西要不要跟着换？',
 '如果补位的人不在现场，这个减法还成立吗？'
]},

card(S){
  const a=(S.answers&&S.answers.a10)||{};
  const pick=a.mineCase&&BY[a.mineCase];
  return {title:'A10 · 三案例还原卡',rows:[
    ['iPod',brief(a,'ipod')],
    ['MyKey',brief(a,'mykey')],
    ['Sedasys',brief(a,'sedasys')],
    ['换人群',pick?(pick.n+' → '+(a.mineGroup||'—')):'—'],
    ['改哪栏',a.mineChange||'—'],
    ['过滤',(a.newScore?'新用户 '+a.newScore+'/5 · ':'')+(a.workaround||'—')]
  ]};
},

notes:[
 {t:'本节目标',h:'用三个已成立的案例，把减法从“敢拿掉”推到“拿掉之后谁接住”。三栏法是后面 A11、A12 的通用解剖刀：第二栏写不出来，减法就还停在口号。'},
 {t:'时间分配',h:'先猜 4′ · 三栏法 8′ · 还原台 16′ · 换用户群 8′ · 两个过滤与提交 7′ · 收束 2′。还原台至少留 10 分钟让人真填，不要替他们念答案。'},
 {t:'常见卡点',h:'第二栏最容易写成“用户自己适应”“习惯就好”——要求点名一个人或一件现成物。第二个卡点是三栏写成同义复述：拿掉屏幕 / 没屏幕了 / 不用屏幕的人。让他把每栏读成一句独立的话。'},
 {t:'直播怎么接',h:'打开后台看九栏和“换用户群”卡：先挑一个第二栏写“用户适应”的，问“现场谁把这个活接了”；再挑一个换了人群、三栏却一字未改的，问“那到底哪一栏变了”。两张卡并排放，比讲三个案例有效。'},
 {t:'案例口径',h:'MyKey 的 80 mph、44% 音量、75 英里提前提醒来自官方备注；Sedasys 先拿备用电池、再拿屏幕键盘，中间被“断电怎么办”顶住，用 crash cart 和现有监护仪补位；iPod 是 As Is，不新增零件。三条都不要讲成“省成本”。补充一句：Sedasys 后来停售，减法成立不等于生意成立。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A10']=L;
})();
