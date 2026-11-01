/* A14 · 乘法：三个案例还原 */
(function(){
'use strict';

const IMG={
  yota:'assets-cases-a14-yota.jpg',
  febreze:'assets-cases-a14-febreze.jpg',
  tape:'assets-cases-a14-tape.svg'
};

const SLOTS=[
  {id:'copy',h:'复制了什么',tip:'具体到部件'},
  {id:'change',h:'复制件改了什么',tip:'改的是属性'},
  {id:'who',h:'新场景是谁',tip:'一类人 + 一个时刻'}
];

/* ---------- 三个案例：每案三栏 ---------- */
const CASES=[
{
 k:'yota',n:'YotaPhone',brand:'2013 · 正面彩屏 + 背面墨水屏',img:'yota',
 orig:'通勤、出差的人：只看通知和行程',
 note:'官方口径：复制“屏幕”，把第二块改成电子墨水——常亮、不耗电、强光下可读。不是加电池，也不是加摄像头。（乘法案例库 p.2）',
 cands:{
  copy:['屏幕','电池','摄像头'],
  change:['低功耗常亮','换成彩色','做得更大'],
  who:['通勤看通知的人','打游戏的人','拍照的人']
 },
 ph:{
  copy:'例如：屏幕，正面一块、背面一块',
  change:'例如：改成低功耗常亮的墨水屏',
  who:'例如：通勤时只看通知和行程的人'
 },
 col:{
  copy:{off:'屏幕。正面一块彩屏，背面再复制一块屏——不是加电池，也不是加摄像头。',
   keys:['屏幕','彩屏','背面','第二块'],
   why:'官方只复制了“屏幕”这一块。加一块电池是加法，加一个摄像头是加功能，都解释不了背面为什么要一直亮着。'},
  change:{off:'改成电子墨水：断电也能显示，常亮不耗电，强光下反而更清楚。',
   keys:['墨水','低功耗','常亮','不耗电','断电','强光','阳光','省电'],
   why:'复制件如果还是彩屏，它只是第二块耗电的屏。改成墨水屏，才有“不点亮也能看”的新场景。'},
  who:{off:'通勤和出差的人：只看通知、行程和书页，不需要每次都点亮主屏。',
   keys:['通勤','出差','通知','行程','书','阅读','时间'],
   why:'新场景不是“所有人”，是一天要看几十次、每次只看一行的人。'}
 }
},
{
 k:'febreze',n:'宝洁 Febreze 双香型',brand:'宝洁 × SIT · 两种香型交替',img:'febreze',
 orig:'长期用同一款、闻不到味道的家庭',
 note:'官方口径：用乘法开发出可在两种香气之间转换的空气清新剂，解决单一香气造成的嗅觉疲劳——消费者闻不到，就以为产品失效。推出后四年占到 25% 市场份额。（行业案例库 p.22）',
 cands:{
  copy:['香型','瓶身','喷头'],
  change:['两种香型可切换','香味更浓','包装更好看'],
  who:['闻不到味道的老用户','酒店大堂','新车车主']
 },
 ph:{
  copy:'例如：香型，一种变两种',
  change:'例如：两种香型可以切换',
  who:'例如：闻不到味道、以为产品失效的人'
 },
 col:{
  copy:{off:'香型。原来只有一种味道，现在复制成两种：morning walk 与 cleansing rain。',
   keys:['香','味道','气味','morning','cleansing','两种'],
   why:'复制的是气味本身，不是瓶子。多一个喷嘴、多一个瓶身，都不会让鼻子重新工作。'},
  change:{off:'改成可切换：一种走清新（morning walk），一种走除味/洁净（cleansing rain），交替出香。',
   keys:['切换','交替','轮换','清新','除味','洁净','两种'],
   why:'关键不是“有两种味道”，是“能切换”。不能切换，两种味道只是两条产品线。'},
  who:{off:'长期用同一款、闻到“没味道”的人：鼻子习惯了，就以为产品失效。',
   keys:['嗅觉','疲劳','闻不到','没味道','失效','习惯','家庭'],
   why:'用户不是“想换味道的人”，是“闻不到自己家里味道、以为产品没用的人”。'}
 }
},
{
 k:'tape',n:'双面胶',brand:'复制粘胶层 · 两面都能粘',img:'tape',
 orig:'家庭修补、装修、工厂产线',
 note:'官方口径：复制粘接面，从“粘一处”变成“把两件东西直接对粘”。被复制的是粘胶层，不是纸，也不是卷芯。（乘法案例库 p.6）',
 cands:{
  copy:['粘胶层','纸','卷芯'],
  change:['复制到另一面','换成更强的胶','加厚'],
  who:['要把两件东西对粘的人','快递打包','贴海报']
 },
 ph:{
  copy:'例如：粘胶层，不是纸',
  change:'例如：复制到另一面，两面都能粘',
  who:'例如：要把两件东西直接对贴的人'
 },
 col:{
  copy:{off:'粘胶层。纸只是载体，卷芯只是收纳方式；真正起作用的是那层胶。',
   keys:['粘胶层','胶','粘'],
   why:'纸和卷芯都只是载体。把纸复制一层，得到的还是单面胶。'},
  change:{off:'复制到另一面：原来一面有胶、一面是纸，现在两面都有胶，两件东西直接对粘。',
   keys:['另一面','两面','双面','离型纸','纸基','对粘'],
   why:'复制件没有变强，只是换了位置。胶的配方没改，改的是“哪一面有胶”。'},
  who:{off:'要把两件东西直接贴在一起的人：家庭修补、装修、工厂产线贴铭牌和泡棉。',
   keys:['家庭','装修','工厂','产线','铭牌','泡棉','手工'],
   why:'单面胶的用户是“要粘东西的人”；双面胶的用户是“要把两件东西贴在一起、又不想看见胶带的人”。'}
 }
}
];
const BY={};CASES.forEach(c=>BY[c.k]=c);

/* ---------- 状态 ---------- */
function blankRestore(){
  const o={};CASES.forEach(c=>{o[c.k]={copy:'',change:'',who:''};});return o;
}
function ensure(S){
  const ans=S.answers;
  if(!ans.a14||typeof ans.a14!=='object')ans.a14={};
  const a=ans.a14;
  if(!a.restore||typeof a.restore!=='object')a.restore=blankRestore();
  CASES.forEach(c=>{
    if(!a.restore[c.k]||typeof a.restore[c.k]!=='object')a.restore[c.k]={copy:'',change:'',who:''};
    SLOTS.forEach(s=>{if(typeof a.restore[c.k][s.id]!=='string')a.restore[c.k][s.id]='';});
  });
  if(!BY[a.caseTab])a.caseTab=CASES[0].k;
  if(typeof a.mineCase!=='string')a.mineCase='';
  if(typeof a.mineScene!=='string')a.mineScene='';
  if(typeof a.mineChange!=='string')a.mineChange='';
  if(typeof a.workaround!=='string')a.workaround='';
  return a;
}
function field(a,k,id){return ((a.restore[k]||{})[id]||'');}
const MINLEN={copy:2,change:4,who:4};
function slotOk(id,val){return String(val||'').trim().length>=(MINLEN[id]||4);}
function filled(a){let n=0;CASES.forEach(c=>SLOTS.forEach(s=>{if(slotOk(s.id,field(a,c.k,s.id)))n++;}));return n;}
function doneCases(a){return CASES.filter(c=>SLOTS.every(s=>slotOk(s.id,field(a,c.k,s.id)))).length;}
function unlocked(a){return filled(a)>=9;}
function hitsOf(col,text){
  const t=(text||'').toLowerCase();
  return col.keys.filter(k=>t.indexOf(String(k).toLowerCase())>=0);
}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function escapeRe(s){return String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
function markOff(text,keys,user){
  const u=(user||'').toLowerCase();
  const ks=keys.slice().sort((x,y)=>String(y).length-String(x).length).map(escapeRe);
  if(!ks.length)return esc(text);
  const re=new RegExp('('+ks.join('|')+')','gi');
  let out='',last=0,m;
  while((m=re.exec(text))){
    out+=esc(text.slice(last,m.index));
    const hit=u.indexOf(m[0].toLowerCase())>=0;
    out+='<em class="'+(hit?'a14-hit':'a14-miss')+'">'+esc(m[0])+'</em>';
    last=m.index+m[0].length;
  }
  out+=esc(text.slice(last));
  return out;
}
function diffText(col,u,hits){
  const miss=col.keys.filter(k=>hits.indexOf(k)<0);
  if(!u)return '这一栏你还空着。先写自己的版本，再回来对照。';
  if(!hits.length)return '你和官方没有落在同一处：官方落在「'+miss.slice(0,4).join('、')+'」。这是另一个入口，不是错。';
  if(!miss.length)return '官方的主要落点你都提到了。差别在组合方式：官方把它写成一条因果，你写的是几个词。';
  return '你提到「'+hits.join('、')+'」；官方还落在「'+miss.slice(0,4).join('、')+'」。';
}
function brief(a,k){
  const r=(a.restore&&a.restore[k])||{};
  const arr=SLOTS.map(s=>(r[s.id]||'').trim()).filter(Boolean);
  return arr.length?arr.join(' → '):'—';
}

const L={
id:'A14',week:4,seq:14,title:'乘法：三个案例还原',
kicker:'WEEK 4 · 乘法 · 案例解剖',tool:'mul',toolName:'乘法',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>双面胶，<em>复制了哪一层</em></h1>
<p>一卷胶带，撕下来两面都能粘。它没有换配方，只是把已有的一层复制了一份。先猜：复制的是哪一层？</p></div>
<div class="a14-hook">
  <figure class="a14-photo">
    <button class="case-zoom" data-zoom="tape" title="看大图">⤢</button>
    <img src="${IMG.tape}" alt="单面胶与双面胶的截面示意" loading="lazy">
    <figcaption><b>双面胶 · 截面</b><span>上面：一面有胶。下面：两面都有胶。</span>
      <em class="a14-src">线稿：依据 SIT 官方材料重绘（乘法案例库 p.6）</em></figcaption>
  </figure>
  <div class="a14-hook-r">
    <div class="a14-ask"><span>先别查</span><p>双面胶复制的是<em>哪一层</em>？</p></div>
    <div class="opts">
      <button class="opt" data-g1="glue"><span class="k">A</span><span><b>胶</b><span>那一层能粘的胶</span></span></button>
      <button class="opt" data-g1="paper"><span class="k">B</span><span><b>纸</b><span>中间那层离型纸</span></span></button>
      <button class="opt" data-g1="core"><span class="k">C</span><span><b>卷芯</b><span>把胶带卷起来的那根芯</span></span></button>
    </div>
    <div id="a14HookOut" style="margin-top:10px"></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=ensure(S),out=sec.querySelector('#a14HookOut');
  const NAME={paper:'纸',core:'卷芯'};
  function finalHtml(){
    const ok=a.g2==='other';
    const mine={strong:'配方变强',other:'换到另一面',thick:'胶层加厚'}[a.g2]||'';
    return '<div class="a14-reveal ok">'+
      '<div class="a14-reveal-h"><span>粘胶层，换到了另一面</span><span>两问都答完</span></div>'+
      '<p>纸只是载体，卷芯只是收纳方式。原件一面有胶、一面是纸；复制之后两面都有胶，两件东西可以直接对粘——中间的第二卷胶、夹子、钉子都省掉了。</p>'+
      (ok?'':'<p class="a14-mine">你选的是「'+esc(mine)+'」。胶没有变强，也没有变厚——改的是位置。</p>')+
      '<div class="a14-facts">'+
        '<div><b>2</b><span>面都有胶</span></div>'+
        '<div><b>1</b><span>层纸基夹在中间</span></div>'+
        '<div><b>0</b><span>个中间件</span></div>'+
      '</div>'+
      '<p class="a14-note">复制件不是更强，是位置不同。这是乘法里最容易被忽略的一种改法。</p>'+
      '</div>';
  }
  function followHtml(){
    return '<div class="a14-follow"><div class="a14-follow-h"><span>追问</span><b>那复制件改了什么？</b></div>'+
      '<div class="opts a14-opts3">'+
        '<button class="opt" data-g2="strong"><span class="k">A</span><span><b>配方变强</b><span>胶更粘</span></span></button>'+
        '<button class="opt" data-g2="other"><span class="k">B</span><span><b>换到另一面</b><span>两面都有胶</span></span></button>'+
        '<button class="opt" data-g2="thick"><span class="k">C</span><span><b>胶层加厚</b><span>粘得更牢</span></span></button>'+
      '</div></div>';
  }
  function bind2(){
    sec.querySelectorAll('[data-g2]').forEach(b=>b.onclick=()=>{
      a.g2=b.dataset.g2;api.save();paint();api.refresh();
    });
  }
  function paint(){
    sec.querySelectorAll('[data-g1]').forEach(b=>b.classList.toggle('on',a.g1===b.dataset.g1));
    if(!a.g1){out.innerHTML='';return;}
    if(a.g2){out.innerHTML=finalHtml();return;}
    const ok=a.g1==='glue';
    out.innerHTML='<div class="a14-reveal '+(ok?'ok':'warn')+'">'+
      '<div class="a14-reveal-h"><span>'+(ok?'你选对了':'更准确的是 A')+'</span><span>粘胶层</span></div>'+
      '<p>'+(ok
        ? '纸只是载体，卷芯只是收纳方式。真正让两件东西粘住的，是那层胶。'
        : '你选的是「'+esc(NAME[a.g1]||'')+'」。它决定胶带怎么被包装，不决定它能不能粘。真正让两件东西粘住的，是那层胶。')+'</p></div>'+
      followHtml();
    bind2();
  }
  sec.querySelectorAll('[data-g1]').forEach(b=>b.onclick=()=>{
    a.g1=b.dataset.g1;a.g2='';api.save();paint();api.refresh();
  });
  sec.querySelectorAll('[data-zoom]').forEach(b=>b.onclick=e=>{
    e.stopPropagation();
    api.modal('<button class="modal-x">×</button><h3>双面胶：复制的是粘胶层</h3>'+
      '<img src="'+IMG.tape+'" style="width:100%;border-radius:8px;background:#0B1018;margin:6px 0 10px" alt="双面胶截面">'+
      '<p>上面是单面胶：只有一面有胶，另一面是纸。下面是双面胶：同一层胶复制到另一面，纸基夹在中间，两件东西可以直接对粘。</p>'+
      '<p class="small">线稿：依据 SIT 官方材料重绘（乘法案例库 p.6）</p>');
  });
  paint();
},
hint(S){
  const a=ensure(S);
  if(!a.g1)return '先选：复制的是哪一层';
  if(!a.g2)return '还差一步：复制件改了什么';
  return '';
},
gate(S){const a=ensure(S);return !!(a.g1&&a.g2);}},

/* ---------- 2 概念 ---------- */
{id:'concept',name:'三栏法',short:'三栏法',kicker:'STEP 2 · 概念',
html:`
<div class="step-h"><h1>一个案例，<em>三栏</em>就还原了</h1>
<p>乘法最容易停在“复制了什么”。再往下问两句，案例才立得住：复制件改了什么？新场景是谁？</p></div>
<div class="a14-chain">
  <div class="a14-node"><span>01</span><b>复制了什么</b><em>一个已有组件，不是新加一个</em></div>
  <i class="a14-ar">→</i>
  <div class="a14-node wn"><span>02</span><b>复制件改了什么</b><em>属性、位置、材料、对象</em></div>
  <i class="a14-ar">→</i>
  <div class="a14-node ac"><span>03</span><b>新场景是谁</b><em>一类人 + 一个时刻</em></div>
</div>
<div class="grid2" style="margin-top:12px;align-items:start">
  <div class="panel a14-def">
    <div class="panel-h"><h4>三栏法</h4><span>案例还原</span></div>
    <p class="a14-def-p">复制了什么 → 复制件改了什么 → 新场景是谁。</p>
    <div class="a14-rule"><b>一行判据</b><span>加法是「再来一个一样的」；乘法是「再来一个不一样的」，而且这个不一样的有人用。</span></div>
    <div class="a14-def-src">依据 SIT 乘法定义：复制一个组件，改变复制件，再为它找新用途。</div>
  </div>
  <div class="panel a14-no">
    <div class="panel-h"><h4>什么时候别用</h4><span>三种假乘法</span></div>
    <div class="a14-no3">
      <div><b>复制件说不出新场景</b><span>那只是多了一个零件，用户不会为它付钱。</span></div>
      <div><b>两个复制件抢同一个场景</b><span>互相替代，是内耗，不是乘法。</span></div>
      <div><b>改的那一处没人在意</b><span>换了型号，没换价值。</span></div>
    </div>
  </div>
</div>
<div class="panel" style="margin-top:10px">
  <div class="panel-h"><h4>哪一句才是乘法</h4><span>二选一</span></div>
  <div class="opts a14-opts2">
    <button class="opt" data-c2="a"><span class="k">A</span><span><b>双肩包两侧各加一个一样的侧袋</b><span>装得更多</span></span></button>
    <button class="opt" data-c2="b"><span class="k">B</span><span><b>复制屏幕，改成常亮不耗电的墨水屏</b><span>多了一个阅读场景</span></span></button>
  </div>
  <div id="a14C2Out" style="margin-top:9px"></div>
</div>`,
init(sec,api){
  const S=api.S,a=ensure(S),out=sec.querySelector('#a14C2Out');
  function paint(){
    sec.querySelectorAll('[data-c2]').forEach(b=>b.classList.toggle('on',a.c2===b.dataset.c2));
    if(!a.c2){out.innerHTML='';return;}
    const ok=a.c2==='b';
    out.innerHTML='<div class="a14-reveal '+(ok?'ok':'warn')+'">'+
      '<div class="a14-reveal-h"><span>'+(ok?'对':'再看一眼')+'</span><span>判据：复制件变了吗</span></div>'+
      '<p class="small">'+(ok
        ? 'B 复制了屏幕，又改了属性（低功耗、常亮），才有“不点亮也能读”的新场景。'
        : 'A 是加法：多了一个一样的侧袋，属性没变，场景也没变。两个侧袋装的是同一类东西。')+'</p>'+
      '<p class="small">三栏少一栏都不算完：复制了什么、复制件改了什么、新场景是谁。</p></div>';
  }
  sec.querySelectorAll('[data-c2]').forEach(b=>b.onclick=()=>{a.c2=b.dataset.c2;api.save();paint();api.refresh();});
  paint();
},
hint(S){return ensure(S).c2?'':'选一句：哪一句才是乘法';},
gate(S){return !!ensure(S).c2;}},

/* ---------- 3 工作台：三栏还原台 ---------- */
{id:'bench',name:'还原台',short:'还原台',kicker:'STEP 3 · 三栏还原台',
html:`
<div class="step-h"><h1>三个案例，<em>拆回三栏</em></h1>
<p>一个案例一列，三栏都填。九栏齐了，才解锁“看官方还原”——对照用来看差别，不判对错。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>每列一个案例</span>
  <span class="op"><span class="op-n">2</span>点候选词，或自己写</span>
  <span class="op"><span class="op-n">3</span>九栏填完，逐栏对照</span>
</div>
<div class="bench a14-bench">
  <div class="bench-h"><b>BENCH · 三栏还原台</b><span class="st" id="a14St">0 / 9 栏 · 0 / 3 案例</span></div>
  <div class="bench-b">
    <div class="a14-cols" id="a14Cols"></div>
    <div class="a14-cmp" id="a14Cmp"></div>
  </div>
  <div class="bench-f">
    <span class="small" id="a14Lock">九栏填完，解锁官方还原</span>
    <div style="flex:1"></div>
    <button class="btn sm" id="a14See" disabled>看官方还原</button>
  </div>
</div>
<div class="a14-credit">案例图：SIT 官方课程材料（已授权）· 乘法案例库 p.2 / p.6；行业案例库 p.22。双面胶为线稿重绘。</div>`,
init(sec,api){
  const S=api.S,a=ensure(S);
  const cols=sec.querySelector('#a14Cols'),cmp=sec.querySelector('#a14Cmp'),
        st=sec.querySelector('#a14St'),lock=sec.querySelector('#a14Lock'),see=sec.querySelector('#a14See');
  let cmpOpen=false;

  cols.innerHTML=CASES.map(c=>'<div class="a14-col" data-case="'+c.k+'">'+
    '<div class="a14-col-h" title="'+esc(c.note)+'">'+
      '<span class="a14-thumb"><img src="'+IMG[c.img]+'" alt=""></span>'+
      '<span class="a14-cb"><b>'+c.n+'</b><em>'+c.brand+'</em></span>'+
      '<span class="a14-cn" data-cnt>0/3</span>'+
    '</div>'+
    SLOTS.map((s,i)=>'<div class="a14-slot" data-slot="'+s.id+'">'+
      '<div class="a14-sh"><span>0'+(i+1)+'</span><b>'+s.h+'</b><i>'+s.tip+'</i></div>'+
      '<div class="a14-cands">'+c.cands[s.id].map(x=>'<button class="chip" data-cand="'+esc(x)+'">'+esc(x)+'</button>').join('')+'</div>'+
      '<textarea maxlength="64" data-f="'+s.id+'" placeholder="'+esc(c.ph[s.id])+'"></textarea>'+
      '<div class="a14-meta"><span data-len>0</span> / 64</div>'+
    '</div>').join('')+
  '</div>').join('');

  const colOf=k=>cols.querySelector('[data-case="'+k+'"]');

  function paintCol(k){
    const el=colOf(k),r=a.restore[k];
    let n=0;
    SLOTS.forEach(s=>{
      const slotEl=el.querySelector('[data-slot="'+s.id+'"]');
      const ta=slotEl.querySelector('textarea');
      const val=r[s.id]||'';
      if(document.activeElement!==ta)ta.value=val;
      const ok=slotOk(s.id,val);
      slotEl.classList.toggle('filled',ok);
      slotEl.querySelector('[data-len]').textContent=val.length;
      slotEl.querySelectorAll('[data-cand]').forEach(ch=>ch.classList.toggle('on',val.indexOf(ch.dataset.cand)>=0));
      if(ok)n++;
    });
    el.classList.toggle('done',n===3);
    const cnt=el.querySelector('[data-cnt]');
    cnt.textContent=n+'/3';
    cnt.classList.toggle('on',n===3);
  }
  function paintStatus(){
    const n=filled(a);
    st.textContent=n+' / 9 栏 · '+doneCases(a)+' / 3 案例';
    see.textContent=cmpOpen?'收起对照':'看官方还原';
    see.disabled=!cmpOpen&&!unlocked(a);
    lock.textContent=cmpOpen
      ? '对照不是判卷：绿=你提到了，黄=官方提到、你没有'
      : (unlocked(a)?'九栏齐了：点“看官方还原”逐栏对照':'九栏填完，解锁官方还原');
  }
  function paintAll(){
    CASES.forEach(c=>paintCol(c.k));
    paintStatus();
  }
  function tabsHtml(active){
    return '<div class="a14-ctabs">'+CASES.map(c=>'<button class="a14-ctab'+(c.k===active?' on':'')+'" data-ctab="'+c.k+'">'+c.n+'</button>').join('')+'</div>';
  }
  function colLabel(id){return (SLOTS.find(s=>s.id===id)||{}).h||id;}
  function renderCmp(k){
    const c=BY[k],r=a.restore[k]||{};
    cmp.innerHTML='<div class="a14-cmp-h">'+tabsHtml(k)+
      '<span class="a14-legend"><em class="a14-hit">绿</em> 你提到了　<em class="a14-miss">黄</em> 官方提到、你没有</span></div>'+
      '<div class="a14-cmp-b">'+
        '<div class="a14-cmp-top"><b>官方还原 · '+c.n+'</b><span>'+c.brand+'　先看差在哪，再看它为什么这样落。</span></div>'+
        SLOTS.map((s,i)=>{
          const col=c.col[s.id],u=(r[s.id]||'').trim();
          const hits=hitsOf(col,u);
          return '<div class="a14-cmp-r">'+
            '<div class="a14-cmp-k"><span>0'+(i+1)+'</span><b>'+colLabel(s.id)+'</b>'+
              '<em class="'+(hits.length?'hit':'miss')+'">'+(hits.length?'你提到 '+hits.length+' 处':'0 处重合')+'</em></div>'+
            '<div class="a14-cmp-u"><b>你写的</b><span>'+esc(u||'（这一栏还空着）')+'</span></div>'+
            '<div class="a14-cmp-o"><b>官方</b><span>'+markOff(col.off,col.keys,u)+'</span></div>'+
            '<div class="a14-cmp-w"><b>为什么</b><span>'+col.why+'</span></div>'+
            '<div class="a14-cmp-d"><b>不一样</b><span>'+diffText(col,u,hits)+'</span></div>'+
          '</div>';
        }).join('')+
      '</div>';
    cmp.querySelectorAll('[data-ctab]').forEach(b=>b.onclick=()=>{
      a.caseTab=b.dataset.ctab;renderCmp(a.caseTab);api.save();api.refresh();
    });
  }
  function paintCmp(){
    cmp.classList.toggle('on',cmpOpen);
    cols.classList.toggle('hide',cmpOpen);
    if(cmpOpen)renderCmp(a.caseTab);
    paintStatus();
    api.refresh();
  }

  cols.addEventListener('input',e=>{
    const ta=e.target.closest('textarea[data-f]');
    if(!ta)return;
    const k=ta.closest('[data-case]').dataset.case,id=ta.dataset.f;
    a.restore[k][id]=ta.value;
    paintCol(k);paintStatus();api.save();api.refresh();
  });
  cols.addEventListener('click',e=>{
    const ch=e.target.closest('[data-cand]');
    if(!ch)return;
    const slotEl=ch.closest('[data-slot]'),k=ch.closest('[data-case]').dataset.case,id=slotEl.dataset.slot;
    const p=ch.dataset.cand;
    let val=a.restore[k][id]||'';
    if(val.indexOf(p)>=0){
      val=val.replace(p,'').replace(/；{2,}/g,'；').replace(/^；+|；+$/g,'');
    }else{
      val=(val?val.replace(/；+$/,'')+'；':'')+p;
    }
    a.restore[k][id]=val;
    paintCol(k);paintStatus();api.save();api.refresh();
  });
  see.onclick=()=>{
    if(!cmpOpen&&!unlocked(a)){api.toast('九栏填完，才解锁官方还原');return;}
    cmpOpen=!cmpOpen;
    paintCmp();
  };

  paintAll();
},
hint(S){
  const a=ensure(S),n=filled(a);
  if(n<9)return '九栏还差 '+(9-n)+' 栏（三个案例各三栏）';
  return '';
},
gate(S){return unlocked(ensure(S));}},

/* ---------- 4 在你的事上 ---------- */
{id:'mine',name:'换场景',short:'换场景',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>换一个<em>新场景</em>，看哪一栏跟着变</h1>
<p>案例不换，只把第三栏换掉。新场景一变，第二栏常跟着变，第一栏有时也要重选。</p></div>
<div class="a14-pick" id="a14Pick"></div>
<div class="a14-credit">图：SIT 官方课程材料（已授权）· 乘法案例库 p.2 / p.6；行业案例库 p.22</div>
<div class="grid2" style="margin-top:12px;align-items:start">
  <div class="panel">
    <div class="panel-h"><h4>① 新的场景是谁</h4><span>≥4 字</span></div>
    <div class="field"><input id="a14Scene" maxlength="24" placeholder="例如：工厂产线"></div>
    <div class="chips" id="a14ScenePre" style="margin-top:8px"></div>
    <div class="a14-orig" id="a14Orig">先选一个案例。</div>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>② 这会改掉哪一栏</h4><span>≥15 字</span></div>
    <div class="field"><textarea id="a14Change" maxlength="140" placeholder="例如：第三栏从“修补的人”变成“产线工人”；第二栏要加“可模切、可上机器”；第一栏还是粘胶层。"></textarea></div>
    <div class="a14-meta"><span id="a14ChLen">0</span> / 140</div>
    <div class="a14-remind">三栏：① 复制了什么　② 复制件改了什么　③ 新场景是谁。写清哪一栏变、变成什么。</div>
  </div>
</div>
<div class="panel a14-shift" style="margin-top:12px">
  <div class="panel-h"><h4>换场景不是换名字</h4><span>三栏会连锁</span></div>
  <div class="a14-shift3">
    <div><span>第三栏</span><b>先变</b><em>新场景换了，谁受益、什么时候用，也跟着换。</em></div>
    <div><span>第二栏</span><b>常常跟着变</b><em>要求不同：产线要可模切、可上机器；家庭只要好撕、不残胶。</em></div>
    <div><span>第一栏</span><b>有时要换</b><em>换场景后，要复制的组件可能不再是同一个。</em></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=ensure(S);
  const pick=sec.querySelector('#a14Pick'),scene=sec.querySelector('#a14Scene'),
        pre=sec.querySelector('#a14ScenePre'),orig=sec.querySelector('#a14Orig'),
        change=sec.querySelector('#a14Change'),chLen=sec.querySelector('#a14ChLen');
  const NEXT={yota:['医院查房','户外骑行','仓库拣货'],febreze:['酒店客房','车内','宠物家庭'],tape:['工厂产线','装修现场','快递打包']};
  pick.innerHTML=CASES.map(c=>'<button class="a14-pick-c" data-mc="'+c.k+'">'+
    '<span class="a14-pk-img"><img src="'+IMG[c.img]+'" alt=""></span><span class="a14-pk"><b>'+c.n+'</b><em>'+c.orig+'</em></span><i>→</i></button>').join('');
  function paintPick(){
    pick.querySelectorAll('[data-mc]').forEach(b=>b.classList.toggle('on',a.mineCase===b.dataset.mc));
    const c=BY[a.mineCase];
    orig.classList.toggle('tape',!!(c&&c.k==='tape'));
    orig.innerHTML=c
      ? '<span class="a14-orig-imgwrap"><img src="'+IMG[c.img]+'" alt=""></span><div class="a14-orig-t"><b>原来的新场景</b><span>'+c.orig+'</span></div>'
      : '<div class="a14-orig-t"><b>原来的新场景</b><span>先选一个案例。</span></div>';
    pre.innerHTML=c?NEXT[c.k].map(g=>'<button class="chip" data-g="'+esc(g)+'">'+esc(g)+'</button>').join(''):'';
    pre.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{
      scene.value=b.dataset.g;a.mineScene=b.dataset.g;api.save();api.refresh();
    });
  }
  scene.value=a.mineScene||'';
  change.value=a.mineChange||'';
  pick.querySelectorAll('[data-mc]').forEach(b=>b.onclick=()=>{
    a.mineCase=b.dataset.mc;paintPick();api.save();api.refresh();
  });
  scene.addEventListener('input',()=>{a.mineScene=scene.value;api.save();api.refresh();});
  change.addEventListener('input',()=>{a.mineChange=change.value;chLen.textContent=a.mineChange.length;api.save();api.refresh();});
  paintPick();
  chLen.textContent=(a.mineChange||'').length;
},
hint(S){
  const a=ensure(S);
  if(!a.mineCase)return '先选一个案例';
  if((a.mineScene||'').trim().length<4)return '写下新的场景（至少 4 个字）';
  if((a.mineChange||'').trim().length<15)return '还差一句：这会改掉哪一栏（至少 15 字）';
  return '';
},
gate(S){
  const a=ensure(S);
  return !!(a.mineCase&&(a.mineScene||'').trim().length>=4&&(a.mineChange||'').trim().length>=15);
}},

/* ---------- 5 过滤与提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 过滤与提交',
html:`
<div class="step-h"><h1>两个过滤，<em>然后交卡</em></h1>
<p>三栏填得再顺，也要过两问：新场景真的存在吗？他们现在怎么凑合？</p></div>
<div class="grid2" style="align-items:stretch">
  <div class="a14-sub-left">
    <div id="a14CardSlot"></div>
    <div class="panel a14-read">
      <div class="panel-h"><h4>这张卡会被怎么读</h4><span>互评时先看这三处</span></div>
      <div class="a14-read3">
        <div><span>01</span><b>三栏是不是各说各的</b><em>“复制屏幕 / 没屏幕了 / 不用屏幕的人”是同义复述，不是三栏。</em></div>
        <div><span>02</span><b>第二栏有没有改属性</b><em>“更好用、更先进”不算；要说出哪一处属性变了。</em></div>
        <div><span>03</span><b>新场景有没有名字</b><em>“所有人”不是场景；“仓库拣货的人”才是。</em></div>
      </div>
    </div>
  </div>
  <div class="stack" style="gap:10px">
    <div class="panel">
      <div class="panel-h"><h4>① 新场景真的存在吗</h4><span>1–5 分</span></div>
      <div class="score"><div class="score-i">
        <div class="lb"><b>能叫出一个具体的人或岗位</b><span>1 = 只是“所有人”，5 = 说得出名字、场景、预算</span></div>
        <div class="stars" data-k="newScore">${[1,2,3,4,5].map(n=>'<button data-v="'+n+'">'+n+'</button>').join('')}</div>
      </div></div>
      <div class="hint" id="a14ScoreHint" style="margin-top:8px">打分之后，这里给一句判断。</div>
    </div>
    <div class="panel">
      <div class="panel-h"><h4>② 他们现在怎么凑合</h4><span>≥8 字</span></div>
      <div class="field"><textarea id="a14Work" maxlength="80" placeholder="例如：产线上两个人拉一卷胶带，一段一段贴，贴歪了再撕掉重来"></textarea></div>
      <div class="a14-meta"><span id="a14WkLen">0</span> / 80</div>
    </div>
    <div class="panel">
      <div class="panel-h"><h4>提交</h4><span id="a14SubSt">未提交</span></div>
      <div class="row"><button class="btn primary" id="a14Sub">提交</button>
        <button class="btn" id="a14Exp">导出 PNG</button></div>
      <div class="hint" style="margin-top:6px">提交后引擎先跑一次 AI 评审（有用 / 可行 / 证据），再进班级互评。</div>
    </div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=ensure(S);
  const slot=sec.querySelector('#a14CardSlot'),work=sec.querySelector('#a14Work'),
        wkLen=sec.querySelector('#a14WkLen'),hintEl=sec.querySelector('#a14ScoreHint'),
        subSt=sec.querySelector('#a14SubSt'),btn=sec.querySelector('#a14Sub');
  const JUDGE={1:'只有“所有人”三个字：新场景还不存在。',2:'说不出具体的人：先找一个你认识的岗位。',3:'有一个人影，但还说不清他为什么现在就需要。',4:'说得出人和场景：可以去找他聊十分钟。',5:'名字、场景、预算都对得上：这是一个真场景。'};
  function paint(full){
    if(full&&document.activeElement!==work)work.value=a.workaround||'';
    wkLen.textContent=(a.workaround||'').length;
    sec.querySelectorAll('.stars[data-k="newScore"] button').forEach(b=>b.classList.toggle('on',+b.dataset.v<=(a.newScore||0)));
    hintEl.textContent=a.newScore?JUDGE[a.newScore]:'打分之后，这里给一句判断。';
    slot.innerHTML='<div class="outcard a14-card"><div class="oh"><span>DELIVERABLE · A14</span><span>还原卡</span></div>'+
      '<h5>三案例还原卡</h5><div class="kv">'+api.card().rows.map(r=>'<div><b>'+esc(r[0])+'</b><span class="'+(r[1]&&r[1]!=='—'?'fill':'')+'">'+esc(r[1]||'—')+'</span></div>').join('')+'</div></div>';
    const ready=!!(a.newScore&&(a.workaround||'').trim().length>=8);
    subSt.textContent=S.submitted?'已提交':'未提交';
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
  sec.querySelector('#a14Exp').onclick=()=>api.exportCard();
  sec.__a14paint=()=>paint(true);
  paint(true);
},
onEnter(){
  const sec=document.querySelector('.step[data-s="4"]');
  if(sec&&sec.__a14paint)sec.__a14paint();
},
hint(S){
  const a=ensure(S);
  if(!a.newScore)return '先给“新场景真的存在吗”打分';
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
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 复制功能层</div>
    <p class="small" style="margin-top:5px">双面胶复制的是粘胶层，不是纸；YotaPhone 复制的是屏幕，不是外壳。找错层，后面全歪。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 复制件要改属性</div>
    <p class="small" style="margin-top:5px">墨水屏的低功耗常亮、Febreze 的可切换香型、双面胶的另一面——改的都是属性，不是参数。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 新场景决定真假</div>
    <p class="small" style="margin-top:5px">说不出谁会用，就还是加法。两个复制件抢同一个场景，是内耗。</p></div>
</div>
<div class="panel" style="margin-bottom:12px">
  <div class="panel-h"><h4>三个案例，一张表</h4><span>同一把刀，三种改法</span></div>
  <div class="a14-table">
    <div class="a14-tr a14-thd"><span>案例</span><span>复制了什么</span><span>复制件改了什么</span><span>新场景是谁</span></div>
    <div class="a14-tr"><b>YotaPhone</b><span>屏幕</span><span>改成低功耗常亮的墨水屏</span><span>通勤、出差看通知的人</span></div>
    <div class="a14-tr"><b>Febreze 双香型</b><span>香型</span><span>两种香型可切换、交替出香</span><span>闻不到味道、以为失效的人</span></div>
    <div class="a14-tr"><b>双面胶</b><span>粘胶层</span><span>复制到另一面，两面都能粘</span><span>要把两件东西直接对粘的人</span></div>
  </div>
</div>
<div class="a14-end">乘法不是多一个，是<em>多一个不一样的</em>。</div>
<div class="panel">
  <div class="panel-h"><h4>下一节</h4><span>A15</span></div>
  <p class="small">A15 · 乘法：在我的对象上跑一遍。换你自己的对象：列组件，挑一个复制，把复制件改到能服务一个新场景。这一次没有官方还原，只有你自己的三栏。</p>
  <div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a>
    <button class="btn" id="a14Again">重看这一节</button></div>
</div>`,
init(sec,api){sec.querySelector('#a14Again').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '你复制的是功能层，还是外壳？',
 '复制件和原件，哪一处属性真的不同？',
 '两个复制件是不是在抢同一个场景？',
 '新场景里的人，现在怎么凑合？',
 '换到新场景后，第二栏还站得住吗？'
]},

card(S){
  const a=(S.answers&&S.answers.a14)||{};
  const c=BY[a.mineCase];
  return {title:'A14 · 三案例还原卡',rows:[
    ['YotaPhone',brief(a,'yota')],
    ['Febreze',brief(a,'febreze')],
    ['双面胶',brief(a,'tape')],
    ['换场景',c?(c.n+' → '+(a.mineScene||'—')):'—'],
    ['改哪栏',a.mineChange||'—'],
    ['过滤','新场景 '+(a.newScore||'-')+'/5 · '+(a.workaround||'—')]
  ]};
},

notes:[
 {t:'本节目标',h:'用三个已成立的案例，把“复制件改了什么”从口号变成可核对的三栏。三栏法也是 A15 在自己对象上跑之前的最后一次对照：第一栏找功能层，第二栏说属性，第三栏点名一个人。'},
 {t:'时间分配',h:'先猜 5′ · 三栏法 7′ · 还原台 16′ · 换场景 8′ · 两个过滤与提交 7′ · 收束 2′。还原台至少留 10 分钟让人先写再看官方，别替他们念。'},
 {t:'常见卡点',h:'第一栏写成“屏幕”就停手，第二栏写成“更先进、更好用”。要求改的是属性：低功耗、常亮、可切换、另一面。第二个卡点是第三栏写成“所有人”，或者把第二栏写成第三栏的复述。'},
 {t:'直播怎么接',h:'打开后台看九栏和换场景卡：先挑一个第二栏只写“更好用”的，问“哪一处属性变了”；再把双面胶换到产线的卡和换到家庭的卡并排，问“第二栏为什么跟着变”。讲两张卡，比讲三个案例有效。'},
 {t:'案例口径',h:'YotaPhone 2013 年，正面彩屏、背面电子墨水常亮；Febreze 双香型（morning walk / cleansing rain）交替出香，官方口径是解决嗅觉疲劳，四年做到 25% 份额；双面胶复制的是粘胶层，不是纸。补一句：YotaPhone 后来停摆，乘法成立不等于生意成立。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A14']=L;
})();
