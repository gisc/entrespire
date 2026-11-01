/* A09 · 减法：拿掉一个重要组件 · 判断台 */
(function(){
'use strict';

const IMG={ipod:'assets-cases-a09-ipod.jpg',chair:'assets-cases-a09-chair.jpg'};

/* ---------- 官方七步（Day1 p.134） ---------- */
const STEPS7=[
 {n:'列组件',d:'拆成能单独拿掉的一块'},
 {n:'去除一个重要部分',d:'选"没有它就不成立"的'},
 {n:'想象虚拟产品',d:'先画出来，不管可不可行'},
 {n:'好处、市场、顾客',d:'谁受益，谁付钱'},
 {n:'挑战与克服',d:'最难那一环怎么过'},
 {n:'必要调整',d:'只改一处，让它落地'},
 {n:'描述想法',d:'一句话说清，不用形容词'}
];

/* ---------- 三条判据 ---------- */
const JUDGE=[
 {k:'01',t:'重要组件',d:'拿掉之后，用户第一反应是"这还能用吗"。没人这么问，你拿掉的是配件。'},
 {k:'02',t:'功能必须还在',d:'原来的活要有人接：用户自己、环境、另一个组件，或需求被换掉。没人接，是毁坏。'},
 {k:'03',t:'最大阻力路径',d:'拿掉之后最难的那一环，往往就是价值所在——官方叫它 The Path of Most Resistance。'}
];

/* ---------- 判断台：六个真实减法 ---------- */
const FILL=[
 {k:'user',n:'用户自己',d:'人用自己的身体、时间或判断补上'},
 {k:'env',n:'环境',d:'现场条件、场地、别人的安排'},
 {k:'part',n:'另一个组件',d:'产品或服务里已有的另一件东西'},
 {k:'none',n:'没人补',d:'这个需求被换掉了'}
];
const CASE=[
 {k:'shuffle',n:'Shuffle',yr:'2005',tag:'播放器',slot:'01',sub:'一个圆盘，四个键',
  scene:'苹果最便宜的一台 iPod。正面只有一个圆盘和四个键，没有可以看的地方。',
  rm:['屏幕','电池','耳机口'],rmOk:0,
  rmWhy:'屏幕最贵，也最像"不能少"。它不只是显示，它是"看歌名、选歌"的入口。',
  rmBad:[null,'拿掉电池它就不响——那是坏掉，不是减法。','声音总得有出口。2005 年还没有另一条路可走。'],
  fill:'none',
  fillWhy:'苹果没有把"选歌"还给你，它把"选"这件事换掉了：按一下，随机给你一首。',
  fillBad:{
   user:'耳朵和"下一首"确实在替你筛。但下一首键只是"不要这首"，不是"我要那首"——挑选没有被还回来。',
   env:'环境没有接这件事。你在任何地方听，它都一样随机。',
   part:'没有另一个组件在替你选歌。圆盘只负责跳过，不负责挑选。'},
  why:'屏幕是"看歌名、选歌"的入口。入口没了，苹果不补，直接把需求换成"不用挑"。这是官方标注的 As Is：不补任何东西，直接用残缺形态卖。'},

 {k:'chair',n:'儿童餐椅',yr:'绑带款',tag:'家用',slot:'02',sub:'一块座面，一根绑带',
  scene:'一块座面、一根绑带，没有别的。它被绑在现成的餐桌或椅子上用，收起来只有一本书厚。',
  rm:['椅腿','绑带','座面'],rmOk:0,
  rmWhy:'椅腿的活不是"支撑"，是"把孩子升到餐桌的高度"。',
  rmBad:[null,'绑带还在，它就是补位的那一件。','座面是剩下的全部，它没被拿掉。'],
  fill:'env',
  fillWhy:'餐桌，或者一把普通椅子。孩子够到了桌面，椅子就不需要自己长高。',
  fillBad:{
   part:'绑带管固定，不管高度。这是两件事，别混在一起。',
   user:'孩子不是靠自己用力坐上去的。',
   none:'高度必须有人接，否则这把椅子不成立。'},
  why:'"升高"交给了餐桌或现成的椅子——盒内思考里现成的东西。绑带只负责固定。拿掉椅腿之后，这把椅子反而能叠、能带走。'},

 {k:'bike',n:'城市短途车',yr:'2008 概念',tag:'出行',slot:'03',sub:'三公里以内',
  scene:'为三公里以内的路设计的车。上车就走，下车就锁，没有需要调节的地方。',
  rm:['鞍座','车把','脚踏'],rmOk:0,
  rmWhy:'鞍座干两件事：承重，和让人坐下。它是这台车上最像"不能少"的一块。',
  rmBad:[null,'车把还在，转向要用。','脚踏还在，而且现在还要负责承重。'],
  fill:'part',
  fillWhy:'承重从鞍座转到脚踏和车架。同一批零件，多接了一件事。',
  fillBad:{
   user:'站着是人做的动作，但承重不是意志，是结构。',
   env:'路面没有替你承担体重。',
   none:'体重总得落在某处，落在脚踏和车架上。'},
  why:'鞍座没了，承重交给脚踏与车架——不是新增零件，是让已有零件多接一件事。三公里的路，本来也不值得坐下。'},

 {k:'placebo',n:'双盲试验',yr:'糖片',tag:'医疗',slot:'04',sub:'糖片 对 真药',
  scene:'一组人吃到的是糖片，另一组吃到的是真药。两组都测到了改善，差距没有想象中大。',
  rm:['有效成分','糖衣','说明书'],rmOk:0,
  rmWhy:'有效成分是"药理作用"的载体。它一没，这片药就只剩形式。',
  rmBad:[null,'糖衣是辅料，它本来就不是"有效"的那部分。','说明书没被拿掉，安慰剂也有说明书。'],
  fill:'user',
  fillWhy:'病人自己。期待、仪式、"我在被治疗"这件事，不写在成分表里，但它确实在起作用。',
  fillBad:{
   env:'诊室和医生的态度会放大它，但接住"药效"的是病人自己。',
   part:'糖片里没有另一个组件能当药。',
   none:'如果真没人接，双盲试验里就不该测到差异。'},
  why:'这是减法里最不舒服的一例：补位的东西不在产品里，在人身上。所以它必须双盲——你不知道自己吃的是哪一片。'},

 {k:'hotel',n:'自助入住',yr:'无人前台',tag:'服务',slot:'05',sub:'手机开门，夜里没人',
  scene:'到店不排队，手机开门。夜里大堂没有人值班，退房把卡丢进箱子就行。',
  rm:['前台','客房','早餐'],rmOk:0,
  rmWhy:'前台是一个人，也是一组动作：登记、发钥匙、回答问询。拿掉的是"这组动作由一个人完成"。',
  rmBad:[null,'客房是它卖的东西，拿掉就不是酒店了。','早餐还开着，只是也改成了自助。'],
  fill:'part',
  fillWhy:'自助机、手机房卡、App。前台的三件事被拆开，分给服务里另外三件东西。',
  fillBad:{
   user:'客人多做了几步，但登记和发钥匙不是客人自己完成的。',
   env:'大堂没有替你做登记。',
   none:'登记和开门必须有人做，只是不再由一个人做。'},
  why:'人没有被"省掉"，是被挪到了别的位置——夜里没人值班，白天的前台更可能认得你。减法动的是分工，不是人数。'},

 {k:'bistro',n:'街角小馆',yr:'黑板菜单',tag:'餐饮',slot:'06',sub:'黑板写今天有什么',
  scene:'门口一块黑板，写着今天有什么。坐下不用点菜，厨房上什么你吃什么。',
  rm:['菜单','厨房','服务员'],rmOk:0,
  rmWhy:'菜单干三件事：告知、定价、让人选。它是一张纸，也是这家店的规则。',
  rmBad:[null,'厨房是它唯一的固定资产，拿掉就没饭了。','服务员还在，只是不再递菜单。'],
  fill:'env',
  fillWhy:'当天到货的食材。今天有什么，就是今天的菜单。',
  fillBad:{
   user:'客人放弃选择，不等于客人补位。',
   part:'黑板是"另一个组件"，但黑板上写什么不由店决定，由当天到货决定——黑板只是把环境写出来。',
   none:'"今天能吃什么"得有人说，说的人是市场。'},
  why:'菜单没了，接位的是当天到货和市价。所以这类店一天一个样，也便宜——它把"选择"这件成本，还给了菜市场。'}
];
const CASE_N=CASE.reduce((m,c)=>(m[c.k]=c,m),{});

const L={
id:'A09',week:3,seq:9,title:'减法：拿掉一个重要组件',
kicker:'WEEK 3 · 减法',tool:'sub',toolName:'减法',minutes:45,
steps:[
/* ========== 1 先猜 ========== */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>先拿掉一个，<em>再解释它为什么还成立</em></h1>
<p>2005 年，苹果在 iPod 家族里放了一台最不像 iPod 的机器。它比谁都便宜，也卖得很好。先猜：它拿掉了什么？</p></div>
<div class="a09-hero">
  <figure class="a09-photo">
    <button class="case-zoom" data-zoom="ipod" title="看大图">⤢</button>
    <img src="${IMG.ipod}" alt="iPod Shuffle：正面只有一个圆盘和四个键，没有屏幕" loading="lazy">
    <figcaption><b>iPod Shuffle · 2005</b><span>正面只有一个圆盘，四个键。</span>
      <em class="a09-src">图：SIT 官方课程材料（已授权）　Day1 p.114</em></figcaption>
  </figure>
  <div class="a09-ask">
    <div class="a09-ask-k">三选一</div>
    <div class="opts">
      <button class="opt" data-h="a"><span class="k">A</span><span><b>电池</b><span>没有电池就不响，最像"必须有"</span></span></button>
      <button class="opt" data-h="b"><span class="k">B</span><span><b>屏幕</b><span>不看歌名，也不选歌</span></span></button>
      <button class="opt" data-h="c"><span class="k">C</span><span><b>耳机口</b><span>声音没有出口</span></span></button>
    </div>
    <p class="a09-note" style="margin-top:10px">先凭印象选。揭晓说的不是"答案"，是它凭什么还成立。</p>
  </div>
</div>
<div id="a09HookOut" style="margin-top:12px"></div>`,
init(sec,api){
  const S=api.S,x=S.answers.a09=S.answers.a09||{},out=sec.querySelector('#a09HookOut');
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',x.hook===b.dataset.h));
    if(!x.hook){out.innerHTML='';return;}
    const ok=x.hook==='b';
    let why;
    if(ok) why='屏幕最贵，也最像"必须"。它不只是玻璃和液晶——它是"看歌名、选歌"这个入口。';
    else if(x.hook==='a') why='<b>电池不是这一件。</b>拿掉电池它就不响了，那是坏掉，不是减法。减法有一条底线：东西还得能用，只是少了一个入口。';
    else why='<b>耳机口不是这一件。</b>没有出口，声音无处可去，功能也没有替代路径——2005 年还没有别的路可走。';
    out.innerHTML='<div class="a09-rev '+(ok?'ok':'warn')+'">'+
      '<div class="a09-rev-h"><span>'+(ok?'你看见了':'再看一眼')+'</span><span>B · 屏幕</span></div>'+
      '<p>'+why+'</p>'+
      '<p>关键在这句：<b>拿掉的不是"零件"，是一个你认为不能少的功能入口。</b>屏幕只是两块材料；贵的是"我要听第 7 首"这句话。</p>'+
      '<p class="small">入口没了，"选歌"没有消失——它被换成了"不用选"。按一下，随机给你一首，不喜欢就下一首。它卖的不是残缺的 iPod，是"今天不挑"。</p>'+
      '<p class="a09-note">官方把它标注为 As Is 减法：不补任何东西，直接用残缺的形态去卖。</p>'+
      '</div>';
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{x.hook=b.dataset.h;api.save();paint();api.refresh();});
  sec.querySelectorAll('[data-zoom]').forEach(b=>b.onclick=e=>{
    e.stopPropagation();
    api.modal('<button class="modal-x">×</button><h3>iPod Shuffle · 2005</h3>'+
      '<img src="'+IMG.ipod+'" style="width:100%;border-radius:8px;margin:8px 0 12px" alt="iPod Shuffle">'+
      '<p>正面只有一个圆盘和四个键。没有屏幕，没有歌名，没有"第 7 首"。</p>'+
      '<p class="small">图：SIT 官方课程材料（已授权）　Day1 p.114</p>');
  });
  paint();
},
hint(S){return (S.answers.a09&&S.answers.a09.hook)?'':'先选一个：它拿掉了什么';},
gate(S){return !!(S.answers.a09&&S.answers.a09.hook);}},

/* ========== 2 概念 ========== */
{id:'concept',name:'概念',short:'概念',kicker:'STEP 2 · 概念',
html:`
<div class="step-h"><h1>七步加三条判据，<em>减法才不是删东西</em></h1>
<p>官方定义只有两句：减去一个"产品不可能没有"的基本要素，再为这个残缺形态找用途。</p></div>
<div class="a09-def">
  <span class="a09-defk">DEFINITION · Day1 p.113</span>
  <p>去除一个看起来产品不可能没有的一个基本要素。</p>
  <span class="a09-defs">判据不是"少了东西"，而是"少了之后谁反而更受益"。</span>
</div>
<div class="a09-flow">
  ${STEPS7.map((s,i)=>`<div class="a09-f"><span class="a09-fn">${i+1}</span><b>${s.n}</b><em>${s.d}</em></div>`).join('')}
</div>
<div class="a09-judge">
  ${JUDGE.map(j=>`<div class="a09-j"><span class="a09-jk">${j.k}</span><b>${j.t}</b><p>${j.d}</p></div>`).join('')}
</div>
<div class="a09-c2">
  <div class="panel">
    <div class="panel-h"><h4>同一把椅子，哪一次是减法？</h4><span>二选一</span></div>
    <div class="opts">
      <button class="opt" data-c2="a"><span class="k">A</span><span><b>去掉椅腿，用绑带固定到桌边或椅子上</b><span>"够到餐桌"这件事，交给桌子或椅子</span></span></button>
      <button class="opt" data-c2="b"><span class="k">B</span><span><b>去掉椅腿，座面直接放在地上</b><span>"够到餐桌"这件事，没人接</span></span></button>
    </div>
    <div id="a09C2Out" style="margin-top:8px"></div>
  </div>
  <figure class="a09-photo a09-photo-sm">
    <img src="${IMG.chair}" alt="无腿儿童餐椅：座面用绑带固定在现成的椅子上" loading="lazy">
    <figcaption><b>无腿椅</b><span>升高交给桌子或椅子，绑带只负责固定。</span>
      <em class="a09-src">图：SIT 官方课程材料（已授权）　Day1 p.118</em></figcaption>
  </figure>
</div>`,
init(sec,api){
  const S=api.S,x=S.answers.a09=S.answers.a09||{},out=sec.querySelector('#a09C2Out');
  function paint(){
    sec.querySelectorAll('[data-c2]').forEach(b=>b.classList.toggle('on',x.c2===b.dataset.c2));
    if(!x.c2){out.innerHTML='';return;}
    const ok=x.c2==='a';
    out.innerHTML='<div class="a09-rev '+(ok?'ok':'warn')+'">'+
      '<div class="a09-rev-h"><span>'+(ok?'对':'换一面看')+'</span><span>判据 ②</span></div>'+
      '<p>'+(ok
        ? 'A 把"够到餐桌"交给了桌子：椅子还成立，还能叠、能带走。'
        : 'B 也拿掉了椅腿，"够到餐桌"却没人接——孩子坐在地上。')+'</p>'+
      '<p class="small"><b>减法与"弄坏东西"只隔一条线：那件事有没有人接。</b></p>'+
      '</div>';
  }
  sec.querySelectorAll('[data-c2]').forEach(b=>b.onclick=()=>{x.c2=b.dataset.c2;api.save();paint();api.refresh();});
  paint();
},
hint(S){return (S.answers.a09&&S.answers.a09.c2)?'':'选一句：哪一次是减法，不是毁坏';},
gate(S){return !!(S.answers.a09&&S.answers.a09.c2);}},

/* ========== 3 判断台 ========== */
{id:'bench',name:'判断台',short:'判断台',kicker:'STEP 3 · 判断台',
html:`
<div class="step-h"><h1>六个真实减法，<em>只判断两件事</em></h1>
<p>不生成方案。六个已经发生的减法，只判断两件事：<b>拿掉了什么</b>，<b>那件事后来由谁接</b>。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>点一个案例</span>
  <span class="op"><span class="op-n">2</span>判断拿掉了什么</span>
  <span class="op"><span class="op-n">3</span>判断谁补位</span>
</div>
<div class="bench a09-bench">
  <div class="bench-h"><b>BENCH · 减法判断台</b><span class="st" id="a09St">已判断 0 / 6</span></div>
  <div class="bench-b">
    <div class="a09-grid" id="a09Grid"></div>
    <div id="a09Detail"></div>
    <div class="a09-log" id="a09Log"></div>
  </div>
  <div class="bench-f"><span class="small" id="a09Foot">选错不扣分，会给一句解释。</span><div style="flex:1"></div><button class="btn sm ghost" id="a09Reset">重来</button></div>
</div>`,
init(sec,api){
  const S=api.S;
  const x=S.answers.a09=S.answers.a09||{};
  if(!x.bench||typeof x.bench!=='object')x.bench={};
  const grid=sec.querySelector('#a09Grid'),detail=sec.querySelector('#a09Detail'),
        st=sec.querySelector('#a09St'),foot=sec.querySelector('#a09Foot');
  let open=x.open&&CASE_N[x.open]?x.open:CASE[0].k;
  const g=k=>x.bench[k]||(x.bench[k]={});
  const done=k=>{const b=x.bench[k];return !!(b&&typeof b.q1==='number'&&b.q2);};
  const nDone=()=>CASE.filter(c=>done(c.k)).length;

  function paintGrid(){
    grid.innerHTML=CASE.map(c=>{
      const b=x.bench[c.k]||{},d=done(c.k);
      const p1=typeof b.q1==='number',p2=!!b.q2;
      return '<button class="a09-case'+(d?' done':'')+(open===c.k?' on':'')+'" data-k="'+c.k+'">'+
        '<span class="a09-cs">'+c.slot+'</span>'+
        '<span class="a09-cb"><b>'+c.n+' <i>'+c.yr+'</i></b><em>'+c.sub+'</em></span>'+
        '<span class="a09-cd"><i class="'+(p1?'y':'')+'">①</i><i class="'+(p2?'y':'')+'">②</i>'+(d?'<s>✓</s>':'')+'</span>'+
        '</button>';
    }).join('');
    grid.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{
      if(open!==b.dataset.k){open=b.dataset.k;x.open=open;api.save();paintGrid();paintDetail();api.refresh();}
    });
  }
  function paintDetail(){
    const c=CASE_N[open],b=g(open);
    if(!c){detail.innerHTML='';return;}
    const rmAnswered=typeof b.q1==='number';
    const rmOk=rmAnswered&&b.q1===c.rmOk;
    const flAnswered=!!b.q2;
    const flOk=flAnswered&&b.q2===c.fill;
    detail.innerHTML='<div class="a09-dt">'+
      '<div class="a09-dt-h"><b>'+c.slot+' · '+c.n+' '+c.yr+'</b><span class="a09-tag">'+c.tag+'</span></div>'+
      '<p class="a09-scene">'+c.scene+'</p>'+
      '<div class="a09-qline"><span class="a09-qn">①</span><b>它拿掉了哪一件？</b><span class="a09-picks">'+
        c.rm.map((o,i)=>'<button class="a09-pick'+(b.q1===i?' on':'')+'" data-q1="'+i+'">'+o+'</button>').join('')+
      '</span></div><div id="a09Fb1"></div>'+
      '<div class="a09-qline"><span class="a09-qn">②</span><b>那件事，后来由谁接？</b><span class="a09-picks">'+
        FILL.map(f=>'<button class="a09-pick'+(b.q2===f.k?' on':'')+'" data-q2="'+f.k+'" title="'+f.d+'">'+f.n+'</button>').join('')+
      '</span></div><div id="a09Fb2"></div>'+
      '<div id="a09Rev"></div>'+
    '</div>';
    const f1=detail.querySelector('#a09Fb1'),f2=detail.querySelector('#a09Fb2'),rev=detail.querySelector('#a09Rev');
    if(rmAnswered){
      f1.className='a09-fb '+(rmOk?'ok':'bad');
      f1.innerHTML='<b>'+(rmOk?'对':'再看一眼')+'</b>'+(rmOk?c.rmWhy:(c.rmBad[b.q1]||'这一件不是它真正的入口。'));
    }
    if(flAnswered){
      f2.className='a09-fb '+(flOk?'ok':'bad');
      f2.innerHTML='<b>'+(flOk?'对':'再看一眼')+'</b>'+(flOk?c.fillWhy:((c.fillBad&&c.fillBad[b.q2])||'这条还不成立。'));
    }
    if(rmOk&&flOk){
      rev.innerHTML='<div class="a09-rev ok a09-rev-in"><div class="a09-rev-h"><span>为什么成立</span><span>'+c.slot+'</span></div><p>'+c.why+'</p></div>';
    }else if(rmAnswered&&flAnswered){
      rev.innerHTML='<div class="a09-rev warn a09-rev-in"><div class="a09-rev-h"><span>还差一点</span><span>'+c.slot+'</span></div>'+
        '<p>两个判断里有一个不成立。改一个再试；不改也能往下走，但要记得这条为什么别扭。</p></div>';
    }
    detail.querySelectorAll('[data-q1]').forEach(el=>el.onclick=()=>{
      b.q1=+el.dataset.q1;x.open=open;api.save();paint();
    });
    detail.querySelectorAll('[data-q2]').forEach(el=>el.onclick=()=>{
      b.q2=el.dataset.q2;x.open=open;api.save();paint();
    });
  }
  function paintLog(){
    const log=sec.querySelector('#a09Log');
    const any=CASE.some(c=>{const b=x.bench[c.k]||{};return typeof b.q1==='number'||b.q2;});
    if(!any){
      log.innerHTML='<div class="a09-lg empty">六题判断完，这里会留下六行记录：拿掉了什么，由谁接。</div>';
      return;
    }
    log.innerHTML=CASE.map(c=>{
      const b=x.bench[c.k]||{};
      const a1=typeof b.q1==='number',a2=!!b.q2;
      const rm=a1?c.rm[b.q1]:'？';
      const fl=a2?((FILL.find(f=>f.k===b.q2)||{}).n||'？'):'？';
      const cls=(a1&&a2)?(b.q1===c.rmOk&&b.q2===c.fill?' ok':' warn'):'';
      return '<div class="a09-lg'+cls+'"><span>'+c.slot+'</span><b>'+c.n+'</b><i>'+rm+'</i><s>→</s><em>'+fl+'</em></div>';
    }).join('');
  }
  function paint(){
    paintGrid();paintDetail();paintLog();
    const n=nDone();
    st.textContent='已判断 '+n+' / 6';
    const miss=CASE.filter(c=>!done(c.k));
    foot.innerHTML=n>=6
      ?'<b style="color:var(--ok)">六个都判断完了。</b>改也行，记录会跟着变。'
      :'下一个：<b style="color:var(--acc2)">'+miss[0].n+'</b>。六个判断完才解锁下一步。';
    api.refresh();
  }
  sec.querySelector('#a09Reset').onclick=()=>{
    x.bench={};open=CASE[0].k;x.open=open;api.save();paint();
  };
  paint();
},
hint(S){
  const a=(S.answers.a09&&S.answers.a09.bench)||{};
  const miss=CASE.filter(c=>!(a[c.k]&&typeof a[c.k].q1==='number'&&a[c.k].q2));
  if(!miss.length)return '';
  return '还差 '+miss.length+' 个案例：'+miss.slice(0,3).map(c=>c.n).join('、')+(miss.length>3?' 等':'');
},
gate(S){
  const a=(S.answers.a09&&S.answers.a09.bench)||{};
  return CASE.every(c=>a[c.k]&&typeof a[c.k].q1==='number'&&a[c.k].q2);
}},

/* ========== 4 在你的事上 ========== */
{id:'mine',name:'在你的事上',short:'在你的事',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>你每天用的东西，<em>最不能少的是哪一块</em></h1>
<p>不一定是产品。一个流程、一次会议、一件天天碰的工具都行。只写一件，别换成"我们公司"这种说法。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>写下那件东西</span>
  <span class="op"><span class="op-n">2</span>指出最不能少的组件</span>
  <span class="op"><span class="op-n">3</span>写清谁会因此获得什么</span>
</div>
<div class="grid2" style="align-items:start">
  <div class="panel">
    <div class="panel-h"><h4>① 每天用的东西</h4><span id="a09ObjLen">0 / 12</span></div>
    <div class="field"><input id="a09Obj" maxlength="12" placeholder="例如：手机 / 早会 / 周报 / 门禁卡"></div>
    <div class="chips" style="margin-top:8px">
      ${['手机','早会','周报','门禁卡','电梯','水杯'].map(o=>'<button class="chip" data-obj="'+o+'">'+o+'</button>').join('')}
    </div>
    <p class="hint" style="margin-top:8px">写具体的那一件。写"公司流程"，怎么写都对；写"我每天下班前填的那张表"，才有得判断。</p>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>② 最不能少的一个组件</h4><span id="a09CompLen">0 / 20</span></div>
    <div class="field"><input id="a09Comp" maxlength="20" placeholder="例如：解锁这一下 / 开场议程 / 刷卡进门 / 拧开杯盖"></div>
    <p class="hint" style="margin-top:6px">判据：拿掉之后，用户第一反应是"这还能用吗"。会这么问的，才是组件。</p>
    <p class="hint" style="margin-top:6px">不是"最贵的一块"，是"少了它，这件事就不成立"的那一块。</p>
  </div>
</div>
<div class="panel" style="margin-top:12px">
  <div class="panel-h"><h4>③ 拿掉之后，谁会获得什么</h4><span id="a09GainLen">0 / 60</span></div>
  <div class="field"><textarea id="a09Gain" maxlength="60" style="min-height:58px" placeholder="例如：老板会失去&quot;随时能找到我&quot;的确定性，我晚上能连续两小时不被打断"></textarea></div>
  <div class="a09-say" id="a09Say">三个格子都填上，这里会拼出一句完整的话。</div>
  <div class="a09-checks">
    <div class="chk" data-c="take"><i>○</i><b>原来的活有人接</b><span>用户自己、环境、另一个组件，或需求被换掉</span></div>
    <div class="chk" data-c="who"><i>○</i><b>收益落在具体的人身上</b><span>写到一个岗位或一类人，不写"大家"</span></div>
  </div>
</div>
<p class="a09-note" style="margin-top:10px">两种常见写法都不算："拿掉手机，大家会更专注"太宽，说不到人；"拿掉解锁，手机就没人用了"没人接位，那是毁坏。</p>`,
init(sec,api){
  const S=api.S,x=S.answers.a09=S.answers.a09||{};
  const objEl=sec.querySelector('#a09Obj'),compEl=sec.querySelector('#a09Comp'),gainEl=sec.querySelector('#a09Gain'),
        objLen=sec.querySelector('#a09ObjLen'),compLen=sec.querySelector('#a09CompLen'),gainLen=sec.querySelector('#a09GainLen'),
        say=sec.querySelector('#a09Say'),checks=sec.querySelector('.a09-checks');
  function check(){
    const g=x.gain||'';
    const s=(x.comp||'')+' '+g;
    const c1=/接|补|替|交给|自己|环境|换|不需要|消失|省|失去|没人|不用|不再|落在|分摊|转移|由/.test(s);
    const c2=/用户|顾客|同事|老板|领导|家人|客户|孩子|老人|司机|前台|店员|主持|经理|员工|团队|部门|自己|我|人/.test(g)
             &&!/大家|所有人|人们/.test(g);
    [['take',c1],['who',c2]].forEach(p=>{
      const el=checks.querySelector('[data-c="'+p[0]+'"]');
      if(!el)return;el.classList.toggle('on',p[1]);el.querySelector('i').textContent=p[1]?'✓':'○';
    });
  }
  function paint(){
    if(document.activeElement!==objEl)objEl.value=x.obj||'';
    if(document.activeElement!==compEl)compEl.value=x.comp||'';
    if(document.activeElement!==gainEl)gainEl.value=x.gain||'';
    objLen.textContent=(x.obj||'').length+' / 12';
    compLen.textContent=(x.comp||'').length+' / 20';
    gainLen.textContent=(x.gain||'').length+' / 60';
    sec.querySelectorAll('[data-obj]').forEach(b=>b.classList.toggle('on',x.obj===b.dataset.obj));
    if(x.obj&&x.comp&&x.gain){
      say.innerHTML='拿掉<b>'+api.esc(x.obj)+'</b>的<b>'+api.esc(x.comp)+'</b>，<b>'+api.esc(x.gain)+'</b>。'+
        '<span>读完，再问自己一句：这句话里，谁在替它干活？</span>';
    }else if(x.obj&&x.comp){
      say.innerHTML='拿掉<b>'+api.esc(x.obj)+'</b>的<b>'+api.esc(x.comp)+'</b>——现在写：原来由它做的事，谁接？';
    }else{
      say.textContent='三个格子都填上，这里会拼出一句完整的话。';
    }
    check();
  }
  objEl.addEventListener('input',()=>{x.obj=objEl.value.trim();api.save();paint();api.refresh();});
  compEl.addEventListener('input',()=>{x.comp=compEl.value.trim();api.save();paint();api.refresh();});
  gainEl.addEventListener('input',()=>{x.gain=gainEl.value;api.save();paint();api.refresh();});
  sec.querySelectorAll('[data-obj]').forEach(b=>b.onclick=()=>{x.obj=b.dataset.obj;api.save();paint();api.refresh();});
  paint();
},
hint(S){
  const x=S.answers.a09||{};
  if((x.obj||'').length<2)return '先写一件你每天用的东西';
  if((x.comp||'').length<4)return '指出最不能少的那一个组件（至少 4 字）';
  if((x.gain||'').length<15)return '写清"如果拿掉，谁会因此获得什么"（至少 15 字）';
  return '';
},
gate(S){
  const x=S.answers.a09||{};
  return (x.obj||'').length>=2&&(x.comp||'').length>=4&&(x.gain||'').length>=15;
}},

/* ========== 5 过滤与提交 ========== */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 过滤与提交',
html:`
<div class="step-h"><h1>两个过滤，<em>然后交卡</em></h1>
<p>减法的产出不是"少了什么"，是"少了之后谁反而受益"，以及"谁第一个不答应"。第二问答不出来，第一问通常是自我说服。</p></div>
<div class="grid2" style="align-items:start">
  <div class="stack" style="gap:10px">
    <div id="a09CardSlot"></div>
    <div class="panel">
      <div class="panel-h"><h4>交卡前自检</h4><span id="a09SelfSt">0 / 3</span></div>
      <div class="a09-self" id="a09Self"></div>
      <p class="a09-note">≤ 2 分也照常交。评审先问"谁接住了"，不会替你补。</p>
    </div>
  </div>
  <div class="stack" style="gap:10px">
    <div class="panel">
      <div class="panel-h"><h4>① 拿掉之后，功能还在吗</h4><span id="a09KeepV">未打分</span></div>
      <div class="score"><div class="score-i">
        <div class="lb"><b>有人稳稳接住 1–5</b><span>1 没人接 · 3 半接住 · 5 有人稳稳接住</span></div>
        <div class="stars" data-k="keep">${[1,2,3,4,5].map(n=>`<button data-v="${n}">${n}</button>`).join('')}</div>
      </div></div>
      <div class="hint" id="a09Verdict" style="margin-top:8px">打完分，这里会给一句判断。</div>
    </div>
    <div class="panel">
      <div class="panel-h"><h4>② 谁会第一个反对</h4><span id="a09OppLen">0 / 20</span></div>
      <div class="field"><input id="a09Opp" maxlength="20" placeholder="例如：运维 / 财务 / 我妈 / 一线店长"></div>
      <p class="hint" style="margin-top:6px">写一个具体的人或岗位。写"所有人都会支持"，说明你还没找到阻力。</p>
      <div class="row" style="margin-top:10px">
        <button class="btn primary" id="a09Sub">提交</button>
        <button class="btn" id="a09Exp">导出 PNG</button>
        <div style="flex:1"></div><span class="small" id="a09SubSt">未提交</span>
      </div>
      <div class="hint" style="margin-top:7px">提交后引擎先跑一次 AI 评审（有用 / 可行 / 证据），再进班级互评。未登录只存本机。</div>
    </div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,x=S.answers.a09=S.answers.a09||{};
  const slot=sec.querySelector('#a09CardSlot'),opp=sec.querySelector('#a09Opp'),oppLen=sec.querySelector('#a09OppLen'),
        st=sec.querySelector('#a09SubSt'),btn=sec.querySelector('#a09Sub'),
        kv=sec.querySelector('#a09KeepV'),verdict=sec.querySelector('#a09Verdict'),
        selfEl=sec.querySelector('#a09Self'),selfSt=sec.querySelector('#a09SelfSt');
  function benchN(){
    const b=(S.answers.a09&&S.answers.a09.bench)||{};
    return CASE.filter(c=>b[c.k]&&typeof b[c.k].q1==='number'&&b[c.k].q2).length;
  }
  function rows(){
    const n=benchN();
    return [
      ['对象',x.obj||'—'],
      ['拿掉的',x.comp||'—'],
      ['收益',x.gain||'—'],
      ['功能',x.keep?(x.keep+' / 5'):'—'],
      ['反对',x.oppose||'—'],
      ['判断台',n+' / 6 案例']
    ];
  }
  function paint(){
    if(document.activeElement!==opp)opp.value=x.oppose||'';
    oppLen.textContent=(x.oppose||'').length+' / 20';
    sec.querySelectorAll('.stars').forEach(s=>{
      s.querySelectorAll('button').forEach(b=>b.classList.toggle('on',+b.dataset.v<=(x.keep||0)));
    });
    kv.textContent=x.keep?x.keep+' / 5':'未打分';
    if(!x.keep)verdict.textContent='打完分，这里会给一句判断。';
    else verdict.innerHTML='<b style="color:var(--acc2)">判断：</b>'+(
      x.keep<=2?'功能没接住。先想清谁补位，再谈价值——这一步不过，后面都是空话。'
      :x.keep===3?'半接住。说得出补位的那个人，才说得清它为什么成立。'
      :'接住了。接下来要处理的不是"能不能用"，是"谁第一个不答应"。');
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A09</span><span>减法判断卡</span></div>'+
      '<h5>'+api.esc(x.comp?('拿掉'+x.comp):'我的减法判断')+'</h5><div class="kv">'+
      rows().map(r=>'<div><b>'+api.esc(r[0])+'</b><span class="'+(r[1]!=='—'?'fill':'')+'">'+api.esc(r[1])+'</span></div>').join('')+'</div></div>';
    const nDone=benchN();
    const items=[
      [nDone>=6,'判断台六个案例判断完',nDone+' / 6'],
      [!!x.keep,'"功能还在吗"打过 1–5 分',x.keep?(x.keep+' / 5'):'—'],
      [(x.oppose||'').length>=2,'写下了一个会第一个反对的人',x.oppose||'—']
    ];
    selfEl.innerHTML=items.map(it=>'<div class="a09-sr'+(it[0]?' on':'')+'"><i>'+(it[0]?'✓':'○')+'</i><b>'+api.esc(it[1])+'</b><span>'+api.esc(it[2])+'</span></div>').join('');
    selfSt.textContent=items.filter(it=>it[0]).length+' / 3';
    const ready=!!(x.keep&&(x.oppose||'').length>=2);
    st.textContent=S.submitted?'已提交':'未提交';
    btn.textContent=S.submitted?'已提交，去看班级':(ready?'提交':'先补完两个过滤');
    btn.disabled=!!S.submitted||!ready;
  }
  sec.querySelectorAll('.stars').forEach(s=>{
    s.querySelectorAll('button').forEach(b=>b.onclick=()=>{x.keep=+b.dataset.v;api.save();paint();api.refresh();});
  });
  opp.addEventListener('input',()=>{x.oppose=opp.value.trim();api.save();paint();api.refresh();});
  btn.onclick=async()=>{
    if(!(x.keep&&(x.oppose||'').length>=2)){api.toast('先打完分，再写一个会反对的人');return;}
    await api.submit();paint();
  };
  sec.querySelector('#a09Exp').onclick=()=>api.exportCard();
  paint();
  sec.__a09paint=paint;
},
onEnter(){
  const sec=document.querySelector('.step[data-s="4"]');
  if(sec&&sec.__a09paint)sec.__a09paint();
},
hint(S){
  const x=S.answers.a09||{};
  if(!x.keep)return '先给"功能还在吗"打个分';
  if((x.oppose||'').length<2)return '写一个会第一个反对的人或岗位';
  return '';
},
gate(S){
  const x=S.answers.a09||{};
  return !!x.keep&&(x.oppose||'').length>=2;
}},

/* ========== 6 收束 ========== */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>带走<em>三句话</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 拿掉的是入口</div><p class="small" style="margin-top:5px">屏幕、椅腿、鞍座都不贵。贵的是它们背后的那句话："我要第 7 首""孩子得够到桌子"。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 功能得有人接</div><p class="small" style="margin-top:5px">用户自己、环境、另一个组件，或者需求被换掉。没人接的那一步，是毁坏，不是减法。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 阻力就是价值</div><p class="small" style="margin-top:5px">让所有人第一反应都说"不行"的那一环，通常也是同行做不到的那一环。</p></div>
</div>
<div id="a09Recap" style="margin-bottom:12px"></div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A10</span></div>
<p class="small">A10 · 减法：三个案例还原。这一节只做判断，下一节把三个案例从提出到落地完整走一遍：谁提的、被谁反对、最后改了哪一处。从一把"只对某个人限速"的车钥匙开始。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="a09Again">重看这一节</button></div></div>`,
init(sec,api){
  sec.querySelector('#a09Again').onclick=()=>api.go(0);
  sec.__a09recap=function(){
    const x=api.S.answers.a09||{},b=x.bench||{};
    const n=CASE.filter(c=>b[c.k]&&typeof b[c.k].q1==='number'&&b[c.k].q2).length;
    const box=sec.querySelector('#a09Recap');
    if(!x.comp&&!x.gain&&!n){box.innerHTML='';return;}
    const items=[
      ['拿掉了什么',x.comp||'—'],
      ['谁获得什么',x.gain||'—'],
      ['谁第一个反对',x.oppose||'—'],
      ['判断台',n+' / 6 案例']
    ];
    box.innerHTML='<div class="panel"><div class="panel-h"><h4>你这节的四个答案</h4><span>自动回放</span></div>'+
      '<div class="a09-recap">'+items.map(it=>'<div><b>'+api.esc(it[0])+'</b><span class="'+(it[1]!=='—'?'fill':'')+'">'+api.esc(it[1])+'</span></div>').join('')+'</div></div>';
  };
  sec.__a09recap();
},
onEnter(){
  const sec=document.querySelector('.step[data-s="5"]');
  if(sec&&sec.__a09recap)sec.__a09recap();
},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '你拿掉的那件东西，用户第一反应会不会是"这还能用吗"？',
 '拿掉之后，那件事现在由谁做？说不出来就是毁坏。',
 '如果没有人反对，是不是因为这件事根本不重要？',
 '你的减法是在省成本，还是换了一类人受益？',
 '最难的那一环，你打算绕过去，还是把它做成卖点？'
]},

card(S){
  const x=(S.answers&&S.answers.a09)||{};
  const b=x.bench||{};
  const n=CASE.filter(c=>b[c.k]&&typeof b[c.k].q1==='number'&&b[c.k].q2).length;
  return {title:'A09 · 减法判断卡',rows:[
    ['对象',x.obj||'—'],
    ['拿掉的',x.comp||'—'],
    ['收益',x.gain||'—'],
    ['功能',x.keep?(x.keep+' / 5'):'—'],
    ['反对',x.oppose||'—'],
    ['判断台',n+' / 6 案例']
  ]};
},

notes:[
 {t:'本节目标',h:'只做一件事：让学员分得清"减法"和"弄坏东西"。判断台六题走完，就要能说出每一题里"那件事由谁接"。本节不生成方案，那是 A11 的活。'},
 {t:'时间分配',h:'先猜 5′ · 概念 8′ · 判断台 15′ · 在你的事 8′ · 两个过滤与提交 6′ · 收束 3′。判断台至少留 12 分钟，六题的讲评比讲定义有用。'},
 {t:'常见卡点',h:'两个典型：① 把"没人补"当成做错了——iPod Shuffle 官方标注就是 As Is，不补，换需求；② 把"另一个组件"和"环境"混为一谈。区分口径：组件在产品里，环境在产品外。学员若问"安慰剂算不算减法"，答案是算，但补位的东西在人身上，所以它必须双盲。'},
 {t:'直播怎么接',h:'看后台：六题正确率按题统计，正确率最低的那题现场重讲（通常是 Shuffle 的"没人补"和街角小馆的"环境"）。再看提交卡里"功能还在吗"的分数分布，≤2 分的挑 2 张出来，只问一句："拿掉之后，原来那件事谁在做？"——把答案逼到具体的人或物上。'},
 {t:'和 A11 的分工',h:'本节不生成方案、不拆自己的组件清单。学员若提前问"那我的东西该怎么改"，一句话就够：A11 会在你的对象上把七步跑一遍，今天先把眼睛练准。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A09']=L;
})();
