/* A15 · 乘法：在我的对象上跑一遍 · 实战工作台 */
(function(){
'use strict';

/* ---------- 预设：三个对象，各带 7 个参考组件 ---------- */
const OBJECTS=[
 {n:'通勤双肩包',comps:['主袋','肩带','拉链','侧袋','背板','提手','电脑夹层']},
 {n:'家用咖啡机',comps:['水箱','滤网','手柄','蒸汽棒','接水盘','开关','外壳']},
 {n:'客户提案会',comps:['议程','主讲人','提案文档','报价单','会议室','签到表','问答环节']}
];
const PRESET_COMPS={};
OBJECTS.forEach(o=>{PRESET_COMPS[o.n]=o.comps.slice();});

const DIMS=[
 {k:'pos',n:'位置',code:'POS',d:'换到另一个位置，原件够不到的地方',q:'复制件放在哪，原件够不到？'},
 {k:'size',n:'大小',code:'SIZE',d:'一大一小，或可伸缩，各干各的',q:'一大一小，各自装什么？'},
 {k:'num',n:'数量',code:'NUM',d:'复制成两个以上，但分工不同',q:'两个一起用时，省掉了哪次等待？'},
 {k:'mat',n:'材料',code:'MAT',d:'同样的形状，换一种材料',q:'换了材料之后，哪种环境它能进？'},
 {k:'form',n:'形态',code:'FORM',d:'同一个功能，换一种形状',q:'换了形态之后，哪个动作变简单了？'},
 {k:'who',n:'对象',code:'WHO',d:'同一个组件，服务另一类使用者',q:'换了一类人之后，他原来的做法是什么？'}
];
const MIN_COMP=6, MIN_TXT=12, MIN_J=10, MIN_TEST=8;

const IMG={yota:'assets-cases-a15-yota.jpg'};

/* ---------- 状态 ---------- */
function view(S){
  const x=(S&&S.answers&&S.answers.a15)||{};
  const str=v=>typeof v==='string'?v:'';
  const comps=Array.isArray(x.comps)?x.comps
    .map(c=>(typeof c==='string'?{n:c}:c))
    .filter(c=>c&&typeof c.n==='string'&&c.n)
    .map(c=>({n:c.n})):[];
  const vars=Array.isArray(x.vars)?x.vars
    .filter(v=>v&&v.n)
    .map(v=>({n:String(v.n),w:String(v.w||''),k:String(v.k||'')})):[];
  return {
    hook:str(x.hook), c2:str(x.c2),
    obj:str(x.obj), comps:comps, pick:str(x.pick), dim:str(x.dim),
    vars:vars, vIdx:(typeof x.vIdx==='number'?x.vIdx:null),
    form:str(x.form), scene:str(x.scene),
    diff:str(x.diff), whyTwo:str(x.whyTwo), without:str(x.without),
    mkt:+x.mkt||0, feas:+x.feas||0, test3:str(x.test3)
  };
}
function ensure(S){
  const ans=S.answers;
  if(!ans.a15||typeof ans.a15!=='object')ans.a15={};
  const x=ans.a15;
  if(!Array.isArray(x.comps))x.comps=[];
  if(!Array.isArray(x.vars))x.vars=[];
  ['hook','c2','obj','pick','dim','form','scene','diff','whyTwo','without','test3'].forEach(k=>{
    if(typeof x[k]!=='string')x[k]='';
  });
  if(typeof x.vIdx!=='number')x.vIdx=null;
  x.mkt=+x.mkt||0;x.feas=+x.feas||0;x.seed=+x.seed||0;
  return x;
}
function clearOutput(x){
  x.vars=[];x.vIdx=null;x.form='';x.scene='';
  x.diff='';x.whyTwo='';x.without='';x.mkt=0;x.feas=0;x.test3='';
}
function dimOf(k){return DIMS.find(d=>d.k===k)||null;}
function dimName(k){return (dimOf(k)||{}).n||'—';}
const PROCESS_RE=/(流程|工单|服务|提案|会议|周会|例会|晨会|经营会|交接|审批|培训|拜访|复盘|面试|onboarding)/i;
/* 流程类对象：维度含义跟着换，避免“议程·防水版”这种错配 */
const PROC_D={
 pos:{d:'换到流程的另一个位置：前置、后置或旁路',q:'复制件放在流程的哪一步，原件够不到？'},
 size:{d:'改体量：一页、五分钟，或只覆盖半场',q:'一大一小，各自覆盖哪一段？'},
 mat:{d:'换载体：纸、电子、语音或看板',q:'换了载体之后，哪种场合它能进？'},
 form:{d:'换呈现：清单、对话、模板或自助',q:'换了呈现之后，哪个动作变简单了？'}
};
function dimInfo(obj,k){
  const d=dimOf(k);if(!d)return null;
  const p=PROCESS_RE.test(obj||'')?PROC_D[k]:null;
  return p?Object.assign({},d,p):d;
}

/* ---------- 本地变体模板：六个改变维度，各 6 条 ---------- */
const VAR_T={
 pos:[
  ['外侧位','不打开主体也能拿到，少一次翻找。'],
  ['可拆位','拆下来单独用，离开本体也成立。'],
  ['背面位','不占正面空间，取用时向后伸手。'],
  ['高位','抬手就够到，不用弯腰或低头。'],
  ['另一侧位','左右手都顺手，左撇子不用反手。'],
  ['内侧位','只给自己看，外面保持干净。']
 ],
 size:[
  ['大小双份','大的装主要，小的随身带。'],
  ['可伸缩','不用时缩回去，不占固定空间。'],
  ['迷你版','只装一件东西，够用就停。'],
  ['加宽版','装长条形的东西，不用斜着塞。'],
  ['压扁版','空着的时候几乎不占厚度。'],
  ['双层版','干湿分开，或净脏分开。']
 ],
 num:[
  ['一用一备','一个常用，一个留着应急。'],
  ['排成一列','按顺序取，不用低头挑。'],
  ['多一个给同行','两个人不用轮流等。'],
  ['左右各一','两只手可以同时进行。'],
  ['留一个空位','空着本身有用，放临时出现的东西。'],
  ['可增补','需要时再加一个，不用换整件。']
 ],
 mat:[
  ['软材料版','能压扁收纳，塞进更小的空间。'],
  ['透明版','不用打开就知道里面有什么。'],
  ['防水版','脏了直接冲，不用拆洗。'],
  ['隔热版','手可以直接碰，不用垫布。'],
  ['可降解版','用完可以一起丢掉。'],
  ['防滑版','放上去不滑，动作可以更快。']
 ],
 form:[
  ['折叠式','用时展开，不用时收平。'],
  ['可翻转','翻过来是另一个面，一件当两件。'],
  ['镂空式','更轻，也看得见里面的状态。'],
  ['弧形','贴合手或身体，拿着不硌。'],
  ['可卷式','卷起来带走，展开就用。'],
  ['分体式','坏一部分只换那一部分。']
 ],
 who:[
  ['左手版','换一只手也顺手，不用反手。'],
  ['戴手套版','不用摘手套就能操作。'],
  ['视力弱版','靠触感分辨，不靠看。'],
  ['儿童版','小一号，也防误操作。'],
  ['单手版','另一只手腾不出来时也能用。'],
  ['站立版','不需要找平面，站着就能用。']
 ]
};
/* 流程类对象另用一套模板：位置=步骤先后，材料=载体，形态=呈现方式 */
const VAR_P={
 pos:[
  ['会前位','放在开始之前，先看到再决定。'],
  ['会中位','只在讨论到那一步时出现，不占全程。'],
  ['会后位','结束之后再补，不打断现场。'],
  ['前置位','挪到上一步之前，提前拦住问题。'],
  ['后置位','挪到最后，作为收口。'],
  ['旁路位','不进主流程，需要时才调用。']
 ],
 size:[
  ['一页版','压到一页，只留判断所需。'],
  ['摘要版','先给三行结论，细节另附。'],
  ['全量版','一次给全，减少来回。'],
  ['五分钟版','只够说清一件事。'],
  ['半场版','只覆盖前半段，后半段另起。'],
  ['可展开版','先给骨架，需要时再展开。']
 ],
 mat:[
  ['纸质版','现场能圈画，不依赖设备。'],
  ['电子版','可搜索、可转发、可留痕。'],
  ['语音版','不占用眼睛，走路也能听。'],
  ['视频版','一次录好，重复播放。'],
  ['模板版','换成填空，减少每次重写。'],
  ['看板版','贴在墙上，状态一眼可见。']
 ],
 form:[
  ['一页纸','摊开就能看全。'],
  ['清单式','一条一条勾，不漏项。'],
  ['对话式','按问答推进，不按章节。'],
  ['看板式','按状态分栏，移动即推进。'],
  ['模板式','固定骨架，只填变量。'],
  ['自助式','不用人陪，自己走完。']
 ],
 who:[
  ['新手版','第一次接触的人，不用先培训。'],
  ['熟手版','跳过引导，直接到常用项。'],
  ['单人版','一个人完成，不用等第二个人。'],
  ['同行版','两个人一起用，各看一半。'],
  ['外部版','公司外的人也能用，不依赖内部权限。'],
  ['临时版','只来一次的人，拿起来就能用。']
 ]
};
function varSet(obj,dim){
  const proc=PROCESS_RE.test(obj||'');
  return (proc?VAR_P[dim]:VAR_T[dim])||VAR_T[dim]||[];
}
function localVars(obj,comp,dim,seed){
  const arr=varSet(obj,dim);
  const out=[];
  for(let i=0;i<3&&arr.length;i++){
    const it=arr[(seed+i)%arr.length];
    out.push({n:comp+' · '+it[0],w:it[1],k:dimName(dim)});
  }
  return out;
}

/* ---------- 计算 ---------- */
function fullGate(x){
  return !!(x.obj&&x.comps.length>=MIN_COMP&&x.pick&&x.dim&&
    x.form.trim().length>=2&&x.scene.trim().length>=MIN_TXT&&
    x.diff.trim().length>=MIN_J&&x.whyTwo.trim().length>=MIN_J&&x.without.trim().length>=MIN_J&&
    x.mkt>=1&&x.feas>=1&&x.test3.trim().length>=MIN_TEST);
}
function needRows(x){
  return [
    {k:'对象与组件',ok:!!(x.obj&&x.comps.length>=MIN_COMP),tip:x.obj?(x.comps.length+' 个组件'):'还没选'},
    {k:'复制的组件',ok:!!x.pick,tip:x.pick||'还没选'},
    {k:'改变维度',ok:!!x.dim,tip:x.dim?dimName(x.dim):'还没选'},
    {k:'变体',ok:x.form.trim().length>=2,tip:x.form||'还没选'},
    {k:'新场景',ok:x.scene.trim().length>=MIN_TXT,tip:x.scene.length+' / '+MIN_TXT},
    {k:'三个解释',ok:x.diff.trim().length>=MIN_J&&x.whyTwo.trim().length>=MIN_J&&x.without.trim().length>=MIN_J,tip:'各 ≥ '+MIN_J+' 字'},
    {k:'双过滤',ok:x.mkt>=1&&x.feas>=1,tip:(x.mkt?'市场 '+x.mkt:'市场 —')+' · '+(x.feas?'可行 '+x.feas:'可行 —')},
    {k:'先找哪 3 人',ok:x.test3.trim().length>=MIN_TEST,tip:x.test3.length+' / '+MIN_TEST}
  ];
}
function judgeOf(m,f,t){
  if(!m||!f)return {t:'两个分数都打上，才有下一步。',k:''};
  if((t||'').trim().length<MIN_TEST)return {t:'先写 3 个具体的人。没有名字，分数只是想象。',k:'warn'};
  if(f<=2)return {t:'可行 ≤ 2：先不开发，用纸板或现成材料改一个，拍照给这 3 个人看。',k:'warn'};
  if(m<=2)return {t:'市场 ≤ 2：先确认有人愿意为“第二件事”改习惯，再谈做产品。',k:'warn'};
  if(m>=4&&f>=4)return {t:'两边都 ≥ 4：两周内做一个人工版本，只给这 3 个人用。',k:'ok'};
  if(m>=4)return {t:'市场像真的，路径太重：只保留复制件新增的那一个动作，其余先砍。',k:'warn'};
  if(f>=4)return {t:'做得出来，但没人非用不可：先换一类人，再试。',k:'warn'};
  return {t:'两边都中等：先让这 3 个人用纸原型跑一周，看谁会主动用第二次。',k:''};
}
function cardData(x){
  const d=x.dim?dimName(x.dim):'—';
  return {title:'A15 · 我的乘法实战卡',rows:[
    ['对象',x.obj?(x.obj+' · '+x.comps.length+' 个组件'):'—'],
    ['复制/改变',(x.pick&&x.dim)?(x.pick+' × '+d):'—'],
    ['变体',x.form||'—'],
    ['新场景',x.scene||'—'],
    ['最大的不同',x.diff||'—'],
    ['为什么两个',x.whyTwo||'—'],
    ['少了复制件',x.without||'—'],
    ['双过滤',(x.mkt?'市场 '+x.mkt:'市场 —')+' · '+(x.feas?'可行 '+x.feas:'可行 —')+(x.test3?' · 先找：'+x.test3:'')]
  ]};
}
function formsURL(){
  const q=new URLSearchParams(location.search).get('api');
  if(q)return q.replace(/\/$/,'')+'/ai/forms';
  if(location.protocol==='file:')return null;
  return location.pathname.replace(/\/adult\/.*$/,'')+'/api/adult/ai/forms';
}

const L={
id:'A15',week:4,seq:15,title:'乘法：在我的对象上跑一遍',
kicker:'WEEK 4 · 乘法 · 实战',tool:'mul',toolName:'乘法',minutes:45,

steps:[
/* ================= 1 先猜 ================= */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>两个一模一样的侧袋，<em>为什么不是乘法</em></h1>
<p>加法让东西变多，乘法让复制件去干另一件事。先看一个“复制了但没改变”的日常例子，再看一个真乘法。</p></div>
<div class="a15-hero">
  <div class="a15-case a15-bag">
    <div class="a15-case-h">AS IS · 通勤双肩包</div>
    <svg viewBox="0 0 300 210" aria-hidden="true">
      <path d="M108 58 C98 30 126 22 150 22 C174 22 202 30 192 58" fill="none" stroke="#3A475E" stroke-width="2"/>
      <path d="M116 56 C112 40 130 33 150 33 C170 33 188 40 184 56" fill="none" stroke="#33415A" stroke-width="1" opacity=".7"/>
      <rect x="95" y="52" width="110" height="132" rx="18" fill="#101722" stroke="#3A475E" stroke-width="1.4"/>
      <rect x="112" y="118" width="76" height="48" rx="8" fill="#0D131C" stroke="#33415A"/>
      <path d="M112 129 h76" stroke="#33415A"/>
      <circle cx="150" cy="137" r="2" fill="#5A6679"/>
      <path d="M104 70 C122 60 178 60 196 70" fill="none" stroke="#5A6679" stroke-width="1.1"/>
      <path d="M95 88 L64 98 L64 156 L95 162" fill="#0F151F" stroke="#5B8DEF" stroke-width="1.4"/>
      <path d="M64 110 L95 105" stroke="#3A475E"/>
      <path d="M205 88 L236 98 L236 156 L205 162" fill="#0F151F" stroke="#5B8DEF" stroke-width="1.4"/>
      <path d="M236 110 L205 105" stroke="#3A475E"/>
      <text x="43" y="122" text-anchor="middle" font-size="9" fill="#8D97AA" font-family="PingFang SC,sans-serif">侧袋 A</text>
      <text x="257" y="122" text-anchor="middle" font-size="9" fill="#8D97AA" font-family="PingFang SC,sans-serif">侧袋 B</text>
      <text x="43" y="140" text-anchor="middle" font-size="7.5" fill="#5A6679" font-family="ui-monospace,monospace">400 ml</text>
      <text x="257" y="140" text-anchor="middle" font-size="7.5" fill="#5A6679" font-family="ui-monospace,monospace">400 ml</text>
      <text x="150" y="200" text-anchor="middle" font-size="8.5" fill="#5A6679" font-family="PingFang SC,sans-serif">同材料 · 同容量 · 同用途</text>
    </svg>
    <div class="a15-case-f">多了一个口袋，没有多出一个场景</div>
  </div>
  <div class="a15-vs"><span>对照</span><i>≠</i></div>
  <figure class="a15-case a15-photo">
    <div class="a15-case-h">REAL · 复制之后改变了</div>
    <div class="a15-photo-b">
      <img src="${IMG.yota}" alt="YotaPhone 正反两面：彩色主屏与常亮墨水屏">
      <button class="case-zoom" id="zoomYota" title="放大">⤢</button>
    </div>
    <figcaption><b>YotaPhone</b><span>复制屏幕，把第二块改成常亮墨水屏</span><em>图：SIT 官方课程材料（已授权）</em></figcaption>
  </figure>
</div>
<div class="grid2" style="align-items:start">
  <div class="panel">
    <div class="panel-h"><h4>你的判断</h4><span>单选</span></div>
    <div class="opts">
      <button class="opt" data-h="a"><span class="k">A</span><span><b>复制发生了，但复制件和原件完全一样</b><span>容量、材料、用途都没变</span></span></button>
      <button class="opt" data-h="b"><span class="k">B</span><span><b>侧袋太小，还不算一个完整组件</b><span>小零件不参与乘法</span></span></button>
      <button class="opt" data-h="c"><span class="k">C</span><span><b>两个不够，再多两个就是乘法</b><span>数量到一定程度会质变</span></span></button>
    </div>
  </div>
  <div id="hookOut"></div>
</div>`,
init(sec,api){
  const x=ensure(api.S),out=sec.querySelector('#hookOut');
  const zoom=sec.querySelector('#zoomYota');
  if(zoom)zoom.onclick=()=>api.modal('<button class="modal-x">×</button><h3>YotaPhone</h3>'+
    '<img src="'+IMG.yota+'" alt="YotaPhone" style="width:100%;display:block;border:1px solid #2A3547;border-radius:8px">'+
    '<p class="small" style="margin-top:8px">正面彩屏，背面墨水屏：复制了“屏幕”，把复制件改成常亮、低功耗，只用来读常驻信息。<br>图：SIT 官方课程材料（已授权）</p>');
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',x.hook===b.dataset.h));
    if(!x.hook){
      out.innerHTML='<div class="panel a15-wait"><div class="a15-wait-k">先选一个</div>'+
        '<p>两个侧袋看起来像“加倍”，但你多得到了什么？</p></div>';
      return;
    }
    const ok=x.hook==='a';
    const wrong=x.hook==='b'
      ?'不是大小问题。侧袋是明确组件：它装东西、占位置、有材料。问题在复制之后没有改变。'
      :'数量增加不改变属性。四个一样的侧袋，只会让包更重，取水时还要想一下是哪一个。';
    out.innerHTML='<div class="panel a15-reveal"><div class="panel-h"><h4>判定</h4><span>复制 ✓ · 改变 ✗</span></div>'+
      '<div class="a15-verdict">加法，不是乘法</div>'+
      '<p class="small">'+(ok
        ?'对。复制有了，改变没有。两个侧袋装同一瓶水，用户不会因此多出一个使用场景。'
        :wrong)+'</p>'+
      '<div class="a15-checks">'+
        '<div class="on"><i>✓</i><b>复制</b><span>多了一个侧袋</span></div>'+
        '<div><i>✗</i><b>改变</b><span>容量、材料、用途全一样</span></div>'+
        '<div><i>✗</i><b>新场景</b><span>还是装水杯</span></div>'+
      '</div>'+
      '<div class="a15-insight">乘法不是让复制件把原来的活再干一遍，而是让它接第二个任务。YotaPhone 的第二块屏不刷视频，只常亮显示行程——所以它必须改成墨水屏。</div>'+
      '<div class="a15-note">判断只需要一句：<b>复制件和原件，干的活一样吗？</b>一样，就是加法。</div>'+
    '</div>';
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{
    x.hook=b.dataset.h;api.save();paint();api.refresh();
  });
  paint();
},
hint(S){return S.answers.a15&&S.answers.a15.hook?'':'先选一个判断';},
gate(S){return !!(S.answers.a15&&S.answers.a15.hook);}},

/* ================= 2 概念 ================= */
{id:'concept',name:'七步',short:'七步',kicker:'STEP 2 · 概念',
html:`
<div class="step-h a15-tight"><h1>七步里，<em>只有第三步决定成败</em></h1>
<p>列组件、选一个复制、改变复制件、想象虚拟产品、找新场景、挑战、调整。前两步是动作，第三步才是乘法。</p></div>
<div class="panel a15-seven">
  <div class="panel-h"><h4>乘法七步</h4><span>20 秒扫完</span></div>
  <div class="a15-pipe">
    <div class="a15-pipe-i"><span class="n">1</span><b>列组件</b><span class="d">零件 / 步骤 / 角色</span></div>
    <div class="a15-pipe-i"><span class="n">2</span><b>选一个复制</b><span class="d">选已有的，不新买</span></div>
    <div class="a15-pipe-i on"><span class="n">3</span><b>改变复制件</b><span class="d">位置 / 大小 / 数量 / 材料 / 形态 / 对象</span></div>
    <div class="a15-pipe-i"><span class="n">4</span><b>想象虚拟产品</b><span class="d">先描述，不判断</span></div>
    <div class="a15-pipe-i"><span class="n">5</span><b>找新场景</b><span class="d">谁用、替代什么</span></div>
    <div class="a15-pipe-i"><span class="n">6</span><b>挑战</b><span class="d">两件会打架吗</span></div>
    <div class="a15-pipe-i"><span class="n">7</span><b>调整</b><span class="d">改到能成立</span></div>
  </div>
  <div class="a15-seven-note"><b>第 3 步是分水岭。</b>复制谁都会；改什么、改成什么样，才决定复制件有没有新任务。</div>
</div>
<div class="grid2 a15-concept-grid" style="align-items:start">
  <div class="panel">
    <div class="panel-h"><h4>三种动作，别混</h4><span>最容易错</span></div>
    <div class="a15-acts">
      <div><span class="tag">加法</span><b>两个一样的侧袋</b><em>价值不变，只是变多。</em></div>
      <div><span class="tag">改造</span><b>把原来的侧袋做大</b><em>只有一个，没有复制。</em></div>
      <div class="on"><span class="tag acc">乘法</span><b>复制一个，再改属性</b><em>原件干原活，复制件接新任务。</em></div>
    </div>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>改什么：六个方向</h4><span>选一个就够</span></div>
    <div class="a15-dim-mini">${DIMS.map(d=>`<div><b>${d.n}</b><span>${d.d}</span></div>`).join('')}</div>
    <div class="hint" style="margin-top:8px">只改颜色、只换名字，不算改变属性。</div>
  </div>
</div>
<div class="panel a15-quickpanel">
  <div class="panel-h"><h4>复制完成，下一步先做哪件</h4><span>二选一</span></div>
  <div class="a15-quick">
    <button class="opt" data-c2="a"><span class="k">A</span><span><b>先给复制件定一个改变维度</b><span>再去看它能服务谁</span></span></button>
    <button class="opt" data-c2="b"><span class="k">B</span><span><b>先去找谁能用</b><span>再决定要改什么</span></span></button>
  </div>
  <div id="c2Out" style="margin-top:8px"></div>
</div>`,
init(sec,api){
  const x=ensure(api.S),out=sec.querySelector('#c2Out');
  function paint(){
    sec.querySelectorAll('[data-c2]').forEach(b=>b.classList.toggle('on',x.c2===b.dataset.c2));
    if(!x.c2){out.innerHTML='';return;}
    const ok=x.c2==='a';
    out.innerHTML='<div class="a15-quick-out'+(ok?' ok':'')+'">'+(ok
      ?'<b>先改，再找场景。</b>场景不是凭空想出来的，是被属性改变逼出来的。先定改什么，复制件才会长出第二个任务。'
      :'<b>顺序反了。</b>先找场景，你会不自觉地保留复制件的原功能，最后又滑回“多加一个”。先改属性，再看它能服务谁。')+'</div>';
  }
  sec.querySelectorAll('[data-c2]').forEach(b=>b.onclick=()=>{
    x.c2=b.dataset.c2;api.save();paint();api.refresh();
  });
  paint();
},
hint(S){return S.answers.a15&&S.answers.a15.c2?'':'选一个你的判断';},
gate(S){return !!(S.answers.a15&&S.answers.a15.c2);}},

/* ================= 3 乘法实战台 ================= */
{id:'lab',name:'乘法实战台',short:'实战台',kicker:'STEP 3 · 工作台',
html:`
<div class="step-h a15-tight"><h1>把你的对象，<em>拆开、复制、改一处</em></h1>
<p>四步走完：拆到 6 个组件，选一个复制，必须选一个改变维度，再生成并改写变体。最后写清新场景。</p></div>
<div class="op-row">
  <span class="op on"><span class="op-n">1</span>选对象、拆组件</span>
  <span class="op"><span class="op-n">2</span>复制一个、选改变维度</span>
  <span class="op"><span class="op-n">3</span>生成并改写变体</span>
  <span class="op"><span class="op-n">4</span>写新场景</span>
</div>
<div class="a15-lab">
  <div class="a15-lab-h"><b>MULTIPLY LAB · 乘法实战台</b>
    <span class="a15-status"><span id="labSt">0 / 4</span><span class="a15-dots" id="labDots"><i></i><i></i><i></i><i></i></span></span>
  </div>
  <div class="a15-lab-b">
    <div class="a15-side">
      <div class="a15-h"><b>对象</b><span>3 选 1，或自己写</span></div>
      <div class="a15-objs" id="objList">
        ${OBJECTS.map(o=>`<button class="a15-obj" data-o="${o.n}"><b>${o.n}</b><span>${o.comps.length} 个参考组件</span></button>`).join('')}
      </div>
      <div class="a15-add" style="margin-top:7px">
        <input id="objIn" placeholder="例如：门店交接班流程" maxlength="24" autocomplete="off">
        <button class="btn sm" id="objUse">用这个</button>
      </div>
      <div class="a15-h" style="margin-top:12px"><b>组件</b><span id="compCnt">0 / 6</span></div>
      <div class="meter a15-meter"><i id="compBar" style="width:0%"></i></div>
      <div class="a15-comps" id="compList"></div>
      <div class="a15-add">
        <input id="compIn" placeholder="加一个组件，例如：侧袋" maxlength="12" autocomplete="off">
        <button class="btn sm" id="compAdd">加</button>
      </div>
      <div class="hint" id="compHint" style="margin-top:6px">先选对象。</div>
      <div class="a15-tipbox"><b>拆不到 6 个，按四类扫一遍</b><span>物：看得见的零件 · 步：用户走过哪几步 · 人：每一步谁在做 · 规：默认规则与时间限制</span></div>
    </div>
    <div class="a15-side">
      <div class="a15-h"><b>复制哪一个</b><span id="copySt">已有组件，选一个</span></div>
      <div class="a15-picks" id="pickList"><span class="small">先拆组件</span></div>
      <div class="a15-h" style="margin-top:11px"><b>改变维度</b><span class="a15-must">必须选一个</span></div>
      <div class="a15-dims" id="dimList">
        ${DIMS.map(d=>`<button class="a15-dim" data-dim="${d.k}"><b>${d.n}</b><em>${d.code}</em></button>`).join('')}
      </div>
      <div class="hint" id="dimHint" style="margin-top:6px">六个方向选一个。选定后，复制件才和原件不一样。</div>
      <div class="a15-gen">
        <button class="btn primary sm" id="genVars" disabled>生成 3 个变体</button>
        <button class="btn sm ghost" id="aiVars">AI 换三版</button>
        <button class="btn sm ghost" id="reseed" title="换一组">↻</button>
      </div>
      <div class="a15-vars" id="varList"><div class="a15-empty"><b>还没有变体</b><span>选完复制件和改变维度，点“生成 3 个变体”。</span></div></div>
      <div id="formBox"></div>
    </div>
  </div>
  <div class="a15-scene">
    <div class="a15-h"><b>新场景：谁会用它、他现在怎么凑合</b><span id="sceneCnt">0 / 12</span></div>
    <textarea id="scene" maxlength="180" placeholder="写到一个人和具体动作。例如：地铁上单手拎包的审计员，现在把水杯塞在外套口袋，过闸机时要先腾手。"></textarea>
    <div class="hint" id="sceneHint">不要写“更方便”。写他现在多做了哪一步。</div>
  </div>
</div>`,
init(sec,api){
  const x=ensure(api.S);
  const objList=sec.querySelector('#objList'),objIn=sec.querySelector('#objIn');
  const list=sec.querySelector('#compList'),compIn=sec.querySelector('#compIn');
  const pickList=sec.querySelector('#pickList'),dimList=sec.querySelector('#dimList'),dimHint=sec.querySelector('#dimHint');
  const varList=sec.querySelector('#varList'),formBox=sec.querySelector('#formBox');
  const gen=sec.querySelector('#genVars'),aiBtn=sec.querySelector('#aiVars'),reseed=sec.querySelector('#reseed');
  const scene=sec.querySelector('#scene'),sceneCnt=sec.querySelector('#sceneCnt'),sceneHint=sec.querySelector('#sceneHint');
  const compCnt=sec.querySelector('#compCnt'),compBar=sec.querySelector('#compBar'),compHint=sec.querySelector('#compHint');
  const labSt=sec.querySelector('#labSt'),labDots=sec.querySelector('#labDots');

  function hasWork(){
    return !!(x.comps.length||x.form||x.scene||x.diff||x.whyTwo||x.without);
  }
  function presetOf(name){return OBJECTS.find(o=>o.n===name)||null;}
  function applyObj(name,load){
    x.obj=name;
    x.comps=load&&PRESET_COMPS[name]?PRESET_COMPS[name].map(n=>({n:n})):[];
    x.pick='';x.dim='';clearOutput(x);
    objIn.value=presetOf(name)?'':name;
    api.save();paintAll();api.refresh();
  }
  function askChange(fn){
    api.modal('<button class="modal-x">×</button><h3>换对象？</h3>'+
      '<p>换对象会清空已拆的组件、变体、新场景和三个解释，不能撤回。</p>'+
      '<div class="modal-actions"><button class="btn ghost" id="a15No">取消</button><button class="btn primary" id="a15Yes">换</button></div>');
    document.querySelector('#a15No').onclick=()=>api.closeModal();
    document.querySelector('#a15Yes').onclick=()=>{api.closeModal();fn();};
  }
  function choosePreset(name){
    if(x.obj===name){
      if(!x.comps.length){x.comps=PRESET_COMPS[name].map(n=>({n:n}));api.save();paintAll();api.refresh();api.toast('已载入 7 个参考组件');}
      else api.toast('已经是这个对象');
      return;
    }
    if(hasWork()){askChange(()=>applyObj(name,true));return;}
    applyObj(name,true);
    api.toast('已载入「'+name+'」的 7 个参考组件');
  }
  function useCustom(){
    const v=(objIn.value||'').trim().replace(/\s+/g,' ');
    if(!v){api.toast('写一个对象，例如：门店交接班流程');objIn.focus();return;}
    if(presetOf(v)){choosePreset(v);return;}
    if(v===x.obj)return;
    if(hasWork()){askChange(()=>applyObj(v,false));return;}
    applyObj(v,false);
  }

  function paintObj(){
    objList.querySelectorAll('[data-o]').forEach(b=>b.classList.toggle('on',x.obj===b.dataset.o));
    if(document.activeElement!==objIn)objIn.value=(x.obj&&!presetOf(x.obj))?x.obj:'';
    if(!x.obj)compHint.textContent='先选对象，再拆组件。';
    else if(!x.comps.length)compHint.innerHTML=presetOf(x.obj)
      ?'参考组件已载入过，可直接点“载入 7 个”，也可以自己写。'
      :'按“物 / 步 / 人 / 规”扫一遍，至少 6 个。';
    else compHint.innerHTML='点一个组件，就是选它当复制件。';
  }
  function paintComps(){
    if(!x.comps.length){
      list.classList.add('a15-gempty');
      const preset=presetOf(x.obj);
      list.innerHTML='<div class="a15-empty"><b>'+(x.obj?'还没有组件':'还没有对象')+'</b>'+
        '<span>'+(x.obj?'从最大的那个组件开始，至少 6 个。':'先在上方选一个对象，或直接输入你自己的。')+'</span>'+
        (preset?'<button class="btn sm" id="loadComps">载入 7 个参考组件</button>':'')+'</div>';
    }else{
      list.classList.remove('a15-gempty');
      list.innerHTML=x.comps.map((c,i)=>
        '<div class="a15-comp'+(x.pick===c.n?' on':'')+'" data-use="'+api.esc(c.n)+'" title="点一下，选它作为复制件">'+
        '<span class="a15-ci">'+String(i+1).padStart(2,'0')+'</span>'+
        '<b>'+api.esc(c.n)+'</b>'+
        '<button class="a15-del" data-del="'+api.esc(c.n)+'" title="删除">×</button></div>').join('');
    }
    const n=x.comps.length;
    compCnt.textContent=n+' / '+MIN_COMP;
    compBar.style.width=Math.min(100,n/MIN_COMP*100)+'%';
    compBar.style.background=n>=MIN_COMP?'var(--ok)':'var(--acc)';
    if(x.obj&&n&&n<MIN_COMP)compHint.textContent='还差 '+(MIN_COMP-n)+' 个组件。';
    if(x.obj&&n>=MIN_COMP)compHint.textContent='组件够了。下一步只能复制其中一个。';
  }
  function setPick(name){
    if(x.pick===name){api.toast('已经是复制件');return;}
    x.pick=name;clearOutput(x);
    api.save();paintComps();paintPicks();paintDims();paintVars();paintScene();paintLab();api.refresh();
  }
  function paintCopySt(){
    const st=sec.querySelector('#copySt');
    if(st)st.textContent=x.pick?('复制件：'+x.pick+(x.dim?' · '+dimName(x.dim):'')):'已有组件，选一个';
  }
  function paintPicks(){
    if(!x.comps.length){pickList.innerHTML='<span class="small">先拆组件</span>';paintCopySt();return;}
    pickList.innerHTML=x.comps.map(c=>
      '<button class="chip'+(x.pick===c.n?' on':'')+'" data-pick="'+api.esc(c.n)+'">'+api.esc(c.n)+'</button>').join('');
    pickList.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>setPick(b.dataset.pick));
    paintCopySt();
  }
  function paintDims(){
    dimList.querySelectorAll('[data-dim]').forEach(b=>b.classList.toggle('on',x.dim===b.dataset.dim));
    const d=dimInfo(x.obj,x.dim);
    dimHint.innerHTML=d?'<b>'+d.n+'：</b>'+d.d+'。生成后仍可改写。':'六个方向选一个。选定后，复制件才和原件不一样。';
    gen.disabled=!(x.pick&&x.dim);
    aiBtn.disabled=!(x.pick&&x.dim);
    reseed.disabled=!(x.pick&&x.dim);
    gen.textContent=x.vars.length?'重新生成 3 个':'生成 3 个变体';
    paintCopySt();
  }
  function paintVars(){
    if(!x.vars.length){
      varList.innerHTML='<div class="a15-empty"><b>还没有变体</b><span>选完复制件和改变维度，点“生成 3 个变体”。</span></div>';
      formBox.innerHTML='';
      return;
    }
    varList.innerHTML=x.vars.map((v,i)=>
      '<button class="a15-var'+(x.vIdx===i?' on':'')+'" data-v="'+i+'">'+
      '<span class="n">'+(i+1)+'</span>'+
      '<span class="b"><b>'+api.esc(v.n)+'</b><span>'+api.esc(v.w)+'</span></span>'+
      '<i>'+(x.vIdx===i?'✓':'选')+'</i></button>').join('');
    varList.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{
      const i=+b.dataset.v;if(!x.vars[i])return;
      if(x.vIdx===i)return;
      x.vIdx=i;x.form=x.vars[i].n;
      api.save();paintVars();paintLab();api.refresh();
    });
    formBox.innerHTML=x.vIdx===null?'<div class="hint" style="margin-top:7px">挑一个，再改成你自己的话。</div>':
      '<div class="a15-form"><div class="a15-h"><b>改写这个变体</b><span id="formLen">'+x.form.length+' / 48</span></div>'+
      '<input id="formIn" maxlength="48" value="'+api.esc(x.form)+'" placeholder="改成一个同事能复述的名字" autocomplete="off">'+
      '<div class="hint" style="margin-top:5px">把“复制了什么、改了什么”都说进名字里。不要写“智能平台”。</div></div>';
    const inp=formBox.querySelector('#formIn');
    if(inp)inp.addEventListener('input',()=>{
      x.form=inp.value;
      const c=formBox.querySelector('#formLen');if(c)c.textContent=x.form.length+' / 48';
      paintLab();api.save();api.refresh();
    });
  }
  function paintScene(){
    if(document.activeElement!==scene)scene.value=x.scene||'';
    const n=x.scene.length;
    sceneCnt.textContent=n+' / '+MIN_TXT;
    sceneCnt.classList.toggle('a15-pass',n>=MIN_TXT);
    sceneHint.innerHTML=n>=MIN_TXT?'够了。再补一句“他现在多做了哪一步”，会更具体。':'不要写“更方便”。写他现在多做了哪一步。';
  }
  function paintLab(){
    const s1=!!x.obj&&x.comps.length>=MIN_COMP;
    const s2=!!(x.pick&&x.dim);
    const s3=x.form.trim().length>=2;
    const s4=x.scene.trim().length>=MIN_TXT;
    const arr=[s1,s2,s3,s4];
    labSt.textContent=arr.filter(Boolean).length+' / 4';
    labDots.querySelectorAll('i').forEach((i,k)=>i.classList.toggle('on',arr[k]));
  }
  function paintAll(){paintObj();paintComps();paintPicks();paintDims();paintVars();paintScene();paintLab();}

  function genLocal(seed){
    if(!x.pick||!x.dim){api.toast('先选复制件和改变维度');return;}
    x.vars=localVars(x.obj,x.pick,x.dim,seed||0);
    x.vIdx=null;x.form='';x.scene='';
    x.diff='';x.whyTwo='';x.without='';x.mkt=0;x.feas=0;x.test3='';
    api.save();paintVars();paintScene();paintDims();paintLab();api.refresh();
    api.toast('三个变体。挑一个，再改成你自己的话。');
  }
  gen.onclick=()=>{
    if(!x.pick||!x.dim){api.toast('先选复制件和改变维度');return;}
    const n=varSet(x.obj,x.dim).length;
    x.seed=x.vars.length&&n?((x.seed+3)%n):0;
    genLocal(x.seed);
  };
  reseed.onclick=()=>{
    if(!x.pick||!x.dim){api.toast('先选复制件和改变维度');return;}
    const n=varSet(x.obj,x.dim).length;
    x.seed=n?((x.seed+3)%n):0;
    genLocal(x.seed);
  };
  aiBtn.onclick=()=>{
    if(!x.pick||!x.dim){api.toast('先选复制件和改变维度');return;}
    const url=formsURL();
    if(!url){api.toast('本机模式：本地三版已经够用');return;}
    const d=dimOf(x.dim);
    fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({lesson_id:'A15',object:x.obj+'（复制'+x.pick+'，改变'+(d?d.n:'')+'）',components:[x.pick],tool:'multiplication'})})
      .then(r=>r.ok?r.json():null)
      .then(res=>{
        const fs=(res&&Array.isArray(res.forms)?res.forms:[]).filter(f=>f&&f.text).slice(0,3)
          .map(f=>({n:String(f.text).slice(0,48),w:String(f.why||'AI 给的变体，先解释再判断。').slice(0,90),k:'AI'}));
        if(!fs.length||(res&&res.fallback)){api.toast('AI 没接上，本地三版已经够用');return;}
        x.vars=fs;x.vIdx=null;x.form='';x.scene='';
        api.save();paintVars();paintScene();paintLab();api.refresh();api.toast('AI 换了三版');
      })
      .catch(()=>api.toast('AI 没接上，本地三版已经够用'));
  };

  objList.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>choosePreset(b.dataset.o));
  sec.querySelector('#objUse').onclick=useCustom;
  objIn.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();useCustom();}});
  sec.querySelector('#compAdd').onclick=()=>{
    if(!x.obj){api.toast('先选对象');objIn.focus();return;}
    const name=(compIn.value||'').trim().replace(/\s+/g,' ');
    if(!name){compIn.focus();return;}
    if(name.length>12){api.toast('组件名控制在 12 字内');return;}
    if(x.comps.some(c=>c.n===name)){api.toast('这个组件已经在清单里');compIn.value='';return;}
    if(x.comps.length>=18){api.toast('组件够多了，先删再添');return;}
    x.comps.push({n:name});compIn.value='';
    api.save();paintComps();paintPicks();paintObj();paintLab();api.refresh();
  };
  compIn.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();sec.querySelector('#compAdd').click();}});
  list.addEventListener('click',e=>{
    const load=e.target.closest('#loadComps');
    if(load){
      if(!presetOf(x.obj))return;
      x.comps=PRESET_COMPS[x.obj].map(n=>({n:n}));
      api.save();paintComps();paintPicks();paintObj();paintLab();api.refresh();return;
    }
    const del=e.target.closest('[data-del]');
    if(del){
      const name=del.dataset.del;
      const i=x.comps.findIndex(c=>c.n===name);if(i<0)return;
      x.comps.splice(i,1);
      if(x.pick===name){x.pick='';clearOutput(x);}
      api.save();paintComps();paintPicks();paintDims();paintVars();paintScene();paintObj();paintLab();api.refresh();return;
    }
    const use=e.target.closest('[data-use]');
    if(use)setPick(use.dataset.use);
  });
  dimList.querySelectorAll('[data-dim]').forEach(b=>b.onclick=()=>{
    if(!x.pick){api.toast('先选一个要复制的组件');return;}
    if(x.dim===b.dataset.dim){return;}
    x.dim=b.dataset.dim;clearOutput(x);
    api.save();paintDims();paintVars();paintScene();paintLab();api.refresh();
  });
  scene.addEventListener('input',()=>{
    x.scene=scene.value;
    const n=x.scene.length;
    sceneCnt.textContent=n+' / '+MIN_TXT;
    sceneCnt.classList.toggle('a15-pass',n>=MIN_TXT);
    sceneHint.innerHTML=n>=MIN_TXT?'够了。再补一句“他现在多做了哪一步”，会更具体。':'不要写“更方便”。写他现在多做了哪一步。';
    paintLab();api.save();api.refresh();
  });
  paintAll();
  sec.__a15=function(){paintAll();};
},
onEnter(){
  const sec=document.querySelector('.step[data-s="2"]');
  if(sec&&sec.__a15)sec.__a15();
},
hint(S){
  const x=view(S);
  if(!x.obj)return '先选一个对象';
  if(x.comps.length<MIN_COMP)return '组件还差 '+(MIN_COMP-x.comps.length)+' 个';
  if(!x.pick)return '选一个组件复制';
  if(!x.dim)return '必须选一个改变维度';
  if(!x.form.trim())return '生成并选一个变体';
  if(x.scene.trim().length<MIN_TXT)return '新场景还差 '+(MIN_TXT-x.scene.trim().length)+' 字';
  return '';
},
gate(S){
  const x=view(S);
  return !!(x.obj&&x.comps.length>=MIN_COMP&&x.pick&&x.dim&&x.form.trim().length>=2&&x.scene.trim().length>=MIN_TXT);
}},

/* ================= 4 强行解释 ================= */
{id:'justify',name:'强行解释',short:'三问',kicker:'STEP 4 · 强行解释',
html:`
<div class="step-h"><h1>三个问题，<em>把乘法问实</em></h1>
<p>不用写方案。只回答：复制件和原件到底差在哪、为什么非两个不可、少了它会怎样。每句至少 10 字。</p></div>
<div class="grid2" style="align-items:start">
  <div class="panel">
    <div class="panel-h"><h4>三问</h4><span>各 ≥ 10 字</span></div>
    <div class="field a15-jf" data-jf="diff">
      <label>复制件和原件最大的不同是什么 <em data-jc="diff">0 / 10</em></label>
      <textarea data-j="diff" maxlength="120" placeholder="不是大小不同，是它负责的事不同。例如：主袋装电脑，复制出来的侧袋只装湿伞。"></textarea>
    </div>
    <div class="field a15-jf" data-jf="whyTwo" style="margin-top:13px">
      <label>为什么需要两个，一个不够在哪 <em data-jc="whyTwo">0 / 10</em></label>
      <textarea data-j="whyTwo" maxlength="120" placeholder="一个侧袋要同时装水和伞，取水时会把伞带出来；两个各管一件，动作不互相打断。"></textarea>
    </div>
    <div class="field a15-jf" data-jf="without" style="margin-top:13px">
      <label>少了复制件会怎样，谁会难受 <em data-jc="without">0 / 10</em></label>
      <textarea data-j="without" maxlength="120" placeholder="下雨天要把湿伞塞进主袋，电脑和文件跟着受潮；难受的是每天通勤的人。"></textarea>
    </div>
  </div>
  <div class="stack">
    <div class="panel">
      <div class="panel-h"><h4>对照着看</h4><span>原件 / 复制件</span></div>
      <div class="a15-cmp" id="cmp"></div>
    </div>
    <div class="panel">
      <div class="panel-h"><h4>三句及格线</h4><span>不是形容词</span></div>
      <div class="a15-rubric">
        <div><b>01</b><span>说出一个动作差异，不是“更好用”。</span></div>
        <div><b>02</b><span>两个各有明确分工，不抢同一件事。</span></div>
        <div><b>03</b><span>少了它，有一类人会回到凑合。</span></div>
      </div>
      <div class="a15-note" style="margin-top:9px">三句都能被同事复述，才算说清。</div>
    </div>
  </div>
</div>`,
init(sec,api){
  const x=ensure(api.S);
  const fields={};
  ['diff','whyTwo','without'].forEach(k=>{
    const el=sec.querySelector('[data-j="'+k+'"]');
    fields[k]=el;el.value=x[k]||'';
    el.addEventListener('input',()=>{
      x[k]=el.value;
      const cnt=sec.querySelector('[data-jc="'+k+'"]');
      cnt.textContent=x[k].length+' / '+MIN_J;
      cnt.classList.toggle('a15-pass',x[k].length>=MIN_J);
      api.save();api.refresh();
    });
  });
  function paintCmp(){
    const d=dimInfo(x.obj,x.dim);
    const box=sec.querySelector('#cmp');
    box.innerHTML=
      '<div class="a15-cmp-i"><span>原件</span><b>'+api.esc(x.pick||'还没有复制件')+'</b><em>继续干原来的活：原来的位置、原来的任务。</em></div>'+
      '<div class="a15-cmp-vs">+</div>'+
      '<div class="a15-cmp-i on"><span>复制件 · '+api.esc(d?d.n:'未选维度')+'</span><b>'+api.esc(x.form||'还没有变体')+'</b><em>'+api.esc(d?d.d:'先回上一步选一个改变维度。')+'</em></div>'+
      '<div class="a15-cmp-q">'+api.esc(d?d.q:'两件一起用时，用户少做了哪一步？')+'</div>';
  }
  function paintFields(){
    ['diff','whyTwo','without'].forEach(k=>{
      if(fields[k].value!==(x[k]||''))fields[k].value=x[k]||'';
      const cnt=sec.querySelector('[data-jc="'+k+'"]');
      const len=(x[k]||'').length;
      cnt.textContent=len+' / '+MIN_J;
      cnt.classList.toggle('a15-pass',len>=MIN_J);
    });
    paintCmp();
  }
  paintFields();
  sec.__a15=function(){paintFields();};
},
onEnter(){
  const sec=document.querySelector('.step[data-s="3"]');
  if(sec&&sec.__a15)sec.__a15();
},
hint(S){
  const x=view(S);
  const bad=['diff','whyTwo','without'].filter(k=>x[k].trim().length<MIN_J);
  return bad.length?('还差 '+bad.length+' 问没写到 10 字'):'';
},
gate(S){
  const x=view(S);
  return x.diff.trim().length>=MIN_J&&x.whyTwo.trim().length>=MIN_J&&x.without.trim().length>=MIN_J;
}},

/* ================= 5 过滤与提交 ================= */
{id:'submit',name:'双过滤',short:'双过滤',kicker:'STEP 5 · 过滤与提交',
html:`
<div class="step-h"><h1>两个分数，<em>一句试用人名单</em></h1>
<p>分数决定下一步动作；三个名字决定下周能不能拿到真实反馈。两个都填完，再提交。</p></div>
<div class="grid2" style="align-items:start">
  <div class="stack">
    <div class="panel">
      <div class="panel-h"><h4>双过滤</h4><span>1–5</span></div>
      <div class="score">
        <div class="score-i"><div class="lb"><b>市场</b><span>有没有人非用不可</span></div>
          <div class="stars" data-k="mkt">${[1,2,3,4,5].map(n=>`<button data-v="${n}">${n}</button>`).join('')}</div></div>
        <div class="score-i"><div class="lb"><b>可行</b><span>明天能不能动手做</span></div>
          <div class="stars" data-k="feas">${[1,2,3,4,5].map(n=>`<button data-v="${n}">${n}</button>`).join('')}</div></div>
      </div>
      <div class="a15-judge" id="judge">两个分数都打上，才有下一步。</div>
    </div>
    <div class="panel">
      <div class="field a15-jf">
        <label>先找哪 3 个人试 <em id="testCnt">0 / 8</em></label>
        <textarea id="test3" maxlength="100" placeholder="写具体的人：每天带饭的 3 个同事——行政 1 个、设计 1 个、销售 1 个。不要写“目标用户”。"></textarea>
      </div>
      <div class="hint" style="margin-top:6px">能叫出名字、下周见得到的人，才算数。</div>
    </div>
    <div class="row">
      <button class="btn primary" id="subBtn" disabled>提交到班级</button>
      <button class="btn" id="expBtn">导出 PNG</button>
      <span class="small" id="subSt">卡还不完整</span>
    </div>
  </div>
  <div id="cardSlot"></div>
</div>
<div class="panel" style="margin-top:12px">
  <div class="panel-h"><h4>提交后，同班会看这三样</h4><span>互评口径</span></div>
  <div class="grid3">
    <div><div class="mono a15-k">变体</div><p class="small" style="margin-top:3px">复制了谁、改了哪个属性。</p></div>
    <div><div class="mono a15-k">场景</div><p class="small" style="margin-top:3px">谁用、他现在怎么凑合。</p></div>
    <div><div class="mono a15-k">解释</div><p class="small" style="margin-top:3px">两件分工、少了会怎样。</p></div>
  </div>
</div>`,
init(sec,api){
  const x=ensure(api.S),S=api.S;
  const judge=sec.querySelector('#judge'),test=sec.querySelector('#test3'),testCnt=sec.querySelector('#testCnt');
  const slot=sec.querySelector('#cardSlot'),subBtn=sec.querySelector('#subBtn'),subSt=sec.querySelector('#subSt');

  function paintStars(){
    [['mkt',x.mkt],['feas',x.feas]].forEach(p=>{
      sec.querySelectorAll('[data-k="'+p[0]+'"] button').forEach(b=>b.classList.toggle('on',+b.dataset.v<=p[1]));
    });
  }
  function paintJudge(){
    const j=judgeOf(x.mkt,x.feas,x.test3);
    judge.textContent=j.t;
    judge.className='a15-judge'+(j.k?' a15-'+j.k:'');
  }
  function paintTest(){
    if(document.activeElement!==test)test.value=x.test3||'';
    const n=(x.test3||'').length;
    testCnt.textContent=n+' / '+MIN_TEST;
    testCnt.classList.toggle('a15-pass',n>=MIN_TEST);
  }
  function paintCard(){
    if(!x.obj){
      slot.innerHTML='<div class="panel a15-cardwait"><div class="panel-h"><h4>产出卡</h4><span>还差</span></div>'+
        '<div class="a15-need">'+needRows(x).map(r=>
          '<div class="'+(r.ok?'on':'')+'"><i>'+(r.ok?'✓':'○')+'</i><b>'+r.k+'</b><span>'+api.esc(r.tip)+'</span></div>').join('')+
        '</div></div>';
      return;
    }
    const c=cardData(x);
    const miss=needRows(x).filter(r=>!r.ok).map(r=>r.k);
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A15</span><span>乘法卡</span></div>'+
      '<h5>'+api.esc(c.title)+'</h5><div class="kv">'+
      c.rows.map(r=>'<div><b>'+api.esc(r[0])+'</b><span class="'+(r[1]&&r[1]!=='—'?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+
      '</div></div>'+
      (miss.length
        ?'<div class="a15-miss">还欠：'+api.esc(miss.join(' · '))+'</div>'
        :'<div class="a15-miss a15-done">卡齐了。提交后机器先评一遍，再进班级互评。</div>');
  }
  function paintSubmit(){
    const ready=fullGate(x);
    subBtn.disabled=!!S.submitted||!ready;
    subBtn.textContent=S.submitted?'已提交':'提交到班级';
    subSt.textContent=S.submitted?'已提交 · 进入互评池':(ready?'可以提交':'卡还不完整');
  }
  sec.querySelectorAll('[data-k]').forEach(box=>{
    box.querySelectorAll('button').forEach(b=>b.onclick=()=>{
      x[box.dataset.k]=+b.dataset.v;
      api.save();paintStars();paintJudge();paintCard();paintSubmit();api.refresh();
    });
  });
  test.addEventListener('input',()=>{
    x.test3=test.value;
    const n=x.test3.length;
    testCnt.textContent=n+' / '+MIN_TEST;
    testCnt.classList.toggle('a15-pass',n>=MIN_TEST);
    api.save();paintJudge();paintCard();paintSubmit();api.refresh();
  });
  subBtn.onclick=async()=>{
    if(!fullGate(x)){api.toast('卡还不完整，先补齐');return;}
    subBtn.disabled=true;subBtn.textContent='提交中…';
    try{await api.submit();}catch(e){api.toast('提交出错，已存本机');}
    paintSubmit();paintCard();paintJudge();
  };
  sec.querySelector('#expBtn').onclick=()=>api.exportCard();
  paintStars();paintJudge();paintTest();paintCard();paintSubmit();
  sec.__a15=function(){paintStars();paintJudge();paintTest();paintCard();paintSubmit();};
},
onEnter(){
  const sec=document.querySelector('.step[data-s="4"]');
  if(sec&&sec.__a15)sec.__a15();
},
hint(S){
  const x=view(S);
  const bad=needRows(x).filter(r=>!r.ok);
  if(bad.length)return '还差：'+bad.slice(0,2).map(r=>r.k).join(' / ');
  if(!S.submitted)return '点提交，机器会先评一遍';
  return '';
},
gate(S){return fullGate(view(S))&&!!S.submitted;}},

/* ================= 6 收束 ================= */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>复制是动作，<em>改变才是乘法</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel a15-take"><div class="a15-k">01 先改，再找场景</div><b>场景是被逼出来的</b><span>先定改变维度，再看它能服务谁。反过来，容易滑回“多加一个”。</span></div>
  <div class="panel a15-take"><div class="a15-k">02 复制件接第二个任务</div><b>别和原件抢活</b><span>两件干同一件事，就是加法；两件分工，才多出一个场景。</span></div>
  <div class="panel a15-take"><div class="a15-k">03 说不出少了会怎样</div><b>就还不该存在</b><span>没人因为少了复制件而难受，它只是让东西变重。</span></div>
</div>
<div class="panel a15-next">
  <div class="panel-h"><h4>下一节</h4><span>A16</span></div>
  <p class="small">A16 · 乘法：什么时候变成为难用户。三个信号：用户要多学一步、两件互相打架、复制件只在你眼里有用。</p>
  <div class="a15-next-q">乘法最容易滥用。下一节不讲怎么做，讲什么时候该停。</div>
  <div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div>
</div>`,
init(sec,api){sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},
gate(){return true;}}
],

side:{asks:[
 '你复制的是哪个已有组件？复制件和原件哪里不一样？',
 '两个一起用时，用户少做了哪一步？',
 '如果拿掉复制件，谁会真的难受？',
 '新场景里的人，现在是怎么凑合的？',
 '你改的是属性，还是只改了名字？'
]},

card(S){
  return cardData(view(S));
},

notes:[
 {t:'本节目标',h:'让每个学员在自己的对象上跑完一次完整的乘法：拆到 6 个组件、复制一个、改一个属性、生成并改写变体、写清新场景，交出一张能被追问的乘法卡。'},
 {t:'时间分配（45′）',h:'自学 27′：先猜 3′ · 七步 4′ · 实战台 14′ · 三问 6′。直播 12′：只解剖 3 张卡。双过滤、提交与互评 6′。合计 45′。'},
 {t:'常见卡点',h:'① 两个复制件完全一样，把加法当乘法；② 复制件和原件抢同一个任务，新场景说不出来；③ 新场景只写“更方便”，没有具体的人和他现在的凑合；④ 三问互相重复，没有回答“少了会怎样”。'},
 {t:'直播怎么接',h:'打开直播中控，按“改变维度”和“新场景”两列排序，挑 3 张：1 张改得到位的（复制件明显接了第二个任务）、1 张只复制没改变的、1 张复制件和原件抢活的。现场只问一句：<b>“复制件替原件干了哪件它干不了的事？”</b>让学员在弹幕里答，再回到六个改变维度。'},
 {t:'判分口径',h:'组件拆解 20%；改变维度是否真的改变属性 30%；新场景是否具体到一个人和他现在的凑合 25%；三问是否自洽（尤其“少了会怎样”）25%。不评点子新不新。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A15']=L;
})();
