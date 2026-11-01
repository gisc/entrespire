/* A01 · 20 万个发明里只有 5 种动作 · 认知地基 */
(function(){
'use strict';
const PIC={
 ipod:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><rect x="15" y="5" width="18" height="38" rx="4.5"/><circle cx="24" cy="30" r="6.5"/><circle cx="24" cy="30" r="1.6" fill="currentColor" stroke="none"/><rect x="19" y="10" width="10" height="8" rx="1.2" stroke-dasharray="2 2" opacity=".5"/><path d="M19.5 14.5L28 10.5" opacity=".5"/></svg>',
 yota:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><rect x="11" y="7" width="17" height="34" rx="3"/><path d="M15 12h9M15 16h6" opacity=".6"/><rect x="28" y="11" width="9" height="26" rx="2" fill="currentColor" fill-opacity=".14"/><path d="M30 15h5M30 18h5M30 21h3" opacity=".8"/></svg>',
 hm:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M7 8v32M12 8v32M17 8v32" opacity=".45"/><path d="M24 16l5-4 5 4v3H24z"/><rect x="26" y="25" width="13" height="15" rx="2"/><path d="M29 30h7M31.5 33.5h2"/></svg>',
 sbux:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><rect x="8" y="9" width="14" height="24" rx="2"/><path d="M11 14h8M11 18h5" opacity=".6"/><path d="M29 13h9l-1.4 12h-6.2z"/><path d="M32 13v-3h4" opacity=".6"/><circle cx="33" cy="35" r="5"/><path d="M33 32v3l2 1.4"/></svg>',
 pump:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><circle cx="23" cy="17" r="9.5"/><path d="M23 7.5v19M13.5 17h19M16.3 10.3l13.4 13.4M29.7 10.3L16.3 23.7" opacity=".55"/><path d="M33 22v6"/><path d="M23 31c0 5-3.4 6.6-3.4 9.4a3.4 3.4 0 006.8 0C26.4 37.6 23 36 23 31z"/></svg>',
 ck:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><rect x="18" y="13" width="13" height="27" rx="3"/><path d="M21.5 9h6v4h-6z"/><circle cx="24.5" cy="25" r="2.8"/><path d="M12 40h25" opacity=".4"/><path d="M35 19c2 2 2 5 0 7M39 16c3 3.4 3 9.6 0 13" opacity=".55"/></svg>'
};
const ICO={
 sub:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 6h5v6" stroke-dasharray="2 2" opacity=".65"/><path d="M7 12h6"/></svg>',
 mul:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="6" width="11" height="9" rx="2"/><rect x="9" y="10" width="11" height="9" rx="2" stroke-dasharray="3 2" opacity=".8"/></svg>',
 div:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="7" height="6" rx="1.2"/><rect x="14" y="4" width="7" height="6" rx="1.2"/><rect x="8" y="14" width="8" height="6" rx="1.2"/><path d="M6.5 10v4M17.5 10v4" stroke-dasharray="2 2" opacity=".6"/></svg>',
 tu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="13" r="4"/><path d="M12 11h4V7h4M12 15h5v3h-2"/></svg>',
 ad:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6.5" cy="7.5" r="2.5"/><circle cx="17.5" cy="16.5" r="2.5"/><path d="M9 9l6 6" stroke-dasharray="2 2"/><path d="M6.5 3v-1M17.5 21v1"/></svg>'
};
const CASE_IMG={
 ipod:'assets-cases-a01-ipod.jpg',yota:'assets-cases-a01-yota.jpg',hm:'assets-cases-a01-hm.jpg',
 sbux:'assets-cases-a01-sbux.jpg',pump:'assets-cases-a01-pump.jpg',ck:'assets-cases-a01-ck.jpg'
};
const TOOLS=[
 {k:'sub',n:'减法',en:'Subtraction',d:'拿掉一个重要组件，再为它找新用途',e:'iPod Shuffle 拿掉屏幕',short:'拿掉一个组件'},
 {k:'mul',n:'乘法',en:'Multiplication',d:'复制一个组件，复制件必须改变',e:'YotaPhone 复制出第二块屏',short:'复制并改变'},
 {k:'div',n:'除法',en:'Division',d:'把整体拆开，再在空间或时间上重排后重新组合',e:'H&M 把收银台搬进试衣间',short:'拆开重排'},
 {k:'tu',n:'一专多能',en:'Task Unification',d:'让现有组件多干一件事',e:'Play Pump 让旋转木马同时抽水',short:'让它多干一件'},
 {k:'ad',n:'属性关联',en:'Attribute Dependency',d:'改变两个变量之间的依存关系',e:'CK One 让"性别"与"香味"脱钩',short:'改一个关系'}
];
const CASES=[
 {id:'ipod',n:'iPod Shuffle',s:'没有屏幕的 MP3',a:['sub']},
 {id:'yota',n:'YotaPhone',s:'正面彩屏，背面墨水屏',a:['mul']},
 {id:'hm',n:'H&M 试衣间结账',s:'把收银台搬进试衣间',a:['div']},
 {id:'sbux',n:'星巴克手机点单',s:'点单移到到店之前；手机顺手接了点单的活',a:['div','tu']},
 {id:'pump',n:'Play Pump',s:'旋转木马同时是抽水泵',a:['tu']},
 {id:'ck',n:'CK One',s:'男女都能用的香水',a:['ad']}
];
const OBJECTS=['保温杯','会议室','报销流程'];
const HINTS={sub:'拿掉的是"重要组件"，不是随便一个零件。',mul:'复制了却没改变，那是加法，不是乘法。',div:'注意是"拆开—重排—再组合"，不是"删掉"。',tu:'这个组件原本就存在，不是新加的。',ad:'看的是两个变量之间的关系有没有被改。'};

const L={
id:'A01',week:1,seq:1,title:'20 万个发明里只有 5 种动作',
kicker:'WEEK 1 · 认知地基',tool:'mind',toolName:'认知地基',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>这 5 件东西，<em>共同点是什么</em></h1>
<p>SIT 研究了 20 多万项发明，发现真正的新东西，背后只有 <b>5 种动作</b>。先看图，别看答案——你觉得它们是被什么改出来的？</p></div>
<div class="grid5" style="margin-bottom:14px">${['ipod','yota','hm','sbux','pump'].map(id=>{
  const c=CASES.find(x=>x.id===id);
  return `<figure class="case-card">
    <button class="case-zoom" data-zoom="${id}" title="看大图">⤢</button>
    <img src="${CASE_IMG[id]}" alt="${c.n}" loading="lazy">
    <figcaption><b>${c.n}</b><span>${c.s}</span></figcaption></figure>`;
}).join('')}</div>
<div class="panel"><div class="panel-h"><h4>你的判断</h4><span>单选</span></div>
<div class="opts">
<button class="opt" data-h="a"><span class="k">A</span><span><b>都很便宜</b><span>成本领先，靠价格打赢</span></span></button>
<button class="opt" data-h="b"><span class="k">B</span><span><b>都是被"一个动作"改出来的</b><span>不是灵光一现，是对现有东西做了一次操作</span></span></button>
<button class="opt" data-h="c"><span class="k">C</span><span><b>都是设计师的灵感</b><span>靠天赋和审美</span></span></button>
<button class="opt" data-h="d"><span class="k">D</span><span><b>都是技术突破</b><span>靠新材料、新工艺</span></span></button>
</div>
<div id="hookOut" style="margin-top:12px"></div></div>`,
init(sec,api){
  const S=api.S, out=sec.querySelector('#hookOut');
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',S.answers.hook===b.dataset.h));
    if(S.answers.hook){
      const ok=S.answers.hook==='b';
      out.innerHTML='<div class="panel" style="border-color:'+(ok?'rgba(78,159,110,.4)':'rgba(216,154,60,.4)')+';background:'+(ok?'rgba(78,159,110,.07)':'rgba(216,154,60,.06)')+'">'+
        '<div class="panel-h"><h4>'+(ok?'判断正确':'再想一层')+'</h4><span>'+(ok?'5 种动作':'提示')+'</span></div>'+
        '<p class="small" style="font-size:12px">'+(ok
          ? '对。SIT 把 20 多万项专利拆开，发现它们反复在做 5 件事：<b>拿掉一样、复制一样、拆开重排、让它多干一件事、改一个依存关系</b>。动作是有限的，组合是无限的。'
          : '先记住一个事实：这些产品背后并没有全新的技术。iPod Shuffle 拿掉了屏幕，YotaPhone 复制了一块屏，H&M 把收银台搬了位置——都是<b>对现有东西做了一次操作</b>。')+
        '</p></div>';
    }
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{S.answers.hook=b.dataset.h;api.save();paint();api.refresh();});
  sec.querySelectorAll('[data-zoom]').forEach(b=>b.onclick=e=>{
    e.stopPropagation();
    const c=CASES.find(x=>x.id===b.dataset.zoom);
    api.modal('<button class="modal-x">×</button><h3>'+c.n+'</h3><img src="'+CASE_IMG[c.id]+'" style="width:100%;border-radius:8px;margin:8px 0 12px" alt=""><p>'+c.s+'</p><p class="small">图：SIT 官方课程材料（已授权）</p>');
  });
  paint();
},
hint(S){return S.answers.hook?'':'先选一个你的判断';},
gate(S){return !!S.answers.hook;}},

/* ---------- 2 五个动作 ---------- */
{id:'five',name:'五个动作',short:'五个动作',kicker:'STEP 2 · 概念',
html:`
<div class="step-h"><h1>动作只有五种，<em>组合有无限种</em></h1>
<p>这五个工具是 SIT 的全部"操作杆"。今天不要求你会用，只要求你能<b>认出来</b>。点开每一个，看它是怎么动的手。</p></div>
<div class="panel" style="margin-bottom:12px">
  <div class="panel-h"><h4>SIT 的两个基本假设</h4><span>20 万项发明研究</span></div>
  <div class="grid2">
    <div><div class="mono" style="font-size:9.5px;color:var(--acc);letter-spacing:.12em">形式决定功能</div>
      <p class="small" style="margin-top:4px">Function Follows Form。先做出一个"奇怪的形态"，再倒过来问：<b>谁会需要它？</b>而不是先想需求再想方案。</p></div>
    <div><div class="mono" style="font-size:9.5px;color:var(--acc);letter-spacing:.12em">盒内思考</div>
      <p class="small" style="margin-top:4px">Closed World。不引入新资源，只用你手上已有的东西。<b>限制不是障碍，是搜索空间的边界。</b></p></div>
  </div>
</div>
<div class="stack">${TOOLS.map((t,i)=>`
<div class="panel" data-toolcard="${t.k}" style="cursor:pointer">
  <div class="panel-h" style="margin:0;align-items:center">
    <h4 style="color:var(--acc);display:flex;align-items:center;gap:8px">
      <span style="width:26px;height:26px;display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(var(--acc-rgb),.3);border-radius:6px;background:rgba(var(--acc-rgb),.07)">${ICO[t.k]}</span>
      ${t.n} · ${t.en}</h4>
    <span>展开 →</span></div>
  <div class="tdetail hidden" style="margin-top:8px">
    <p style="font-size:12.5px;color:#8D97AA;line-height:1.8">${t.d}</p>
    <div class="tag acc" style="margin-top:8px">案例：${t.e}</div>
  </div>
</div>`).join('')}</div>`,
init(sec,api){
  sec.querySelectorAll('[data-toolcard]').forEach(p=>{
    p.onclick=()=>{
      const d=p.querySelector('.tdetail');d.classList.toggle('hidden');
      p.querySelector('.panel-h span').textContent=d.classList.contains('hidden')?'展开 →':'收起 ↑';
    };
  });
},
hint(){return '点开五个工具各看一眼，然后继续';},
gate(){return true;}},

/* ---------- 3 连线台（支持一张卡连两个工具） ---------- */
{id:'classify',name:'连线',short:'连线',kicker:'STEP 3 · 连线工作台',
html:`
<div class="step-h"><h1>把案例，<em>连到它用的那个动作</em></h1>
<p>有的案例不止一个动作——比如星巴克，既是"把点单挪到到店之前"，也是"让手机顺手接了点单的活"。<b>该连两个就连两个。</b></p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>看图：它变成了什么</span>
  <span class="op"><span class="op-n">2</span>从右端圆点拖到工具（可连两个）</span>
  <span class="op"><span class="op-n">3</span>连错会断线并说明原因</span>
</div>
<div class="bench">
  <div class="bench-h"><b>CONNECT · 案例 → 动作</b><span class="st" id="lkSt">0 / 7</span></div>
  <div class="bench-b">
    <div class="lk" id="lk">
      <div class="lk-col" id="lkLeft"></div>
      <svg class="lk-wires" id="lkWires"></svg>
      <div class="lk-col" id="lkRight"></div>
    </div>
    <div class="lk-hint" id="lkHint">拖一根线，开始。带 <b>0/2</b> 的卡要连两个动作。</div>
  </div>
  <div class="bench-f"><span class="small">连错的次数会被记下来——它比连对更能说明你原来怎么想。</span><div style="flex:1"></div><button class="btn sm ghost" id="lkReset">重来</button></div>
</div>`,
init(sec,api){
  const S=api.S;S.answers.cls=S.answers.cls||{};S.answers.tries=S.answers.tries||0;
  const board=sec.querySelector('#lk'),wires=sec.querySelector('#lkWires'),
        left=sec.querySelector('#lkLeft'),right=sec.querySelector('#lkRight'),
        hint=sec.querySelector('#lkHint'),st=sec.querySelector('#lkSt');
  const NS='http://www.w3.org/2000/svg';
  let sel=null,dragPath=null;
  const total=()=>CASES.reduce((n,c)=>n+c.a.length,0);
  const got=cid=>S.answers.cls[cid]||[];
  const done=c=>got(c.id).length>=c.a.length;

  left.innerHTML=CASES.map(c=>`<button class="lk-case${c.a.length>1?' lk-dual':''}" data-case="${c.id}">
    <span class="lk-thumb"><img src="${CASE_IMG[c.id]}" alt="" loading="lazy"></span>
    <span class="lk-meta"><b>${c.n}</b><em>${c.s}</em></span>
    <span class="lk-badge" data-badge>0/${c.a.length}</span>
    <span class="lk-node"></span></button>`).join('');
  right.innerHTML=TOOLS.map(t=>`<button class="lk-tool" data-link="${t.k}"><span class="lk-node"></span>
    <span class="tk-ic">${ICO[t.k]}</span><span class="tk-meta"><b>${t.n}</b><em>${t.short}</em></span>
    <span class="cnt" data-cnt>0</span></button>`).join('');

  const pt=el=>{if(!el)return{x:0,y:0};const n=el.querySelector('.lk-node')||el;const b=board.getBoundingClientRect(),r=n.getBoundingClientRect();
    return {x:r.left-b.left+r.width/2,y:r.top-b.top+r.height/2};};
  const curve=(a,b)=>{const dx=Math.max(28,Math.abs(b.x-a.x)*.42);return 'M '+a.x+' '+a.y+' C '+(a.x+dx)+' '+a.y+', '+(b.x-dx)+' '+b.y+', '+b.x+' '+b.y;};

  function counts(){
    const c={};CASES.forEach(x=>got(x.id).forEach(t=>{c[t]=(c[t]||0)+1;}));
    right.querySelectorAll('[data-link]').forEach(el=>{
      const n=c[el.dataset.link]||0,cn=el.querySelector('[data-cnt]');
      cn.textContent=n;cn.classList.toggle('on',n>0);
    });
    const n=CASES.filter(done).length;
    st.textContent=n+' / 6 张';
  }
  function paint(){
    left.querySelectorAll('[data-case]').forEach(el=>{
      const c=CASES.find(x=>x.id===el.dataset.case),g=got(c.id),d=done(c);
      el.classList.toggle('done',d);el.classList.toggle('sel',sel===c.id);
      const b=el.querySelector('[data-badge]');
      b.textContent=g.length+'/'+c.a.length;b.classList.toggle('on',d);
    });
    counts();
  }
  function redraw(){
    Array.from(wires.querySelectorAll('.w-ok')).forEach(p=>p.remove());
    CASES.forEach(c=>{
      const ce=left.querySelector('[data-case="'+c.id+'"]');
      got(c.id).forEach(tid=>{
        const te=right.querySelector('[data-link="'+tid+'"]');
        if(!ce||!te)return;
        const p=document.createElementNS(NS,'path');
        p.setAttribute('class','w-ok');p.setAttribute('d',curve(pt(ce),pt(te)));
        wires.appendChild(p);
      });
    });
  }
  function connect(cid,tid){
    const c=CASES.find(x=>x.id===cid);if(!c)return;
    const arr=got(cid);
    if(arr.indexOf(tid)>=0)return;
    S.answers.tries=(S.answers.tries||0)+1;
    if(c.a.indexOf(tid)>=0){
      arr.push(tid);S.answers.cls[cid]=arr;api.save();paint();redraw();api.refresh();
      const left2=c.a.length-arr.length;
      hint.className='lk-hint';
      hint.innerHTML='<b>连对了。</b>'+c.n+' → '+(TOOLS.find(t=>t.k===tid)||{}).n+(left2>0?'　这张还要再接一个动作。':'');
      if(done(c))sel=null;
    }else{
      const ce=left.querySelector('[data-case="'+cid+'"]'),te=right.querySelector('[data-link="'+tid+'"]');
      const p=document.createElementNS(NS,'path');
      p.setAttribute('class','w-bad');p.setAttribute('d',curve(pt(ce),pt(te)));wires.appendChild(p);
      setTimeout(()=>p.remove(),480);
      ce.classList.add('lk-shake');setTimeout(()=>ce.classList.remove('lk-shake'),400);
      hint.className='lk-hint bad';
      hint.innerHTML='<b>不是这个。</b>'+HINTS[tid]+'　再想想：它现在变成了什么？';
      api.save();
    }
  }
  let dragging=false;
  function move(e){
    if(!dragging||!dragPath||!sel)return;
    const b=board.getBoundingClientRect();
    const a=pt(left.querySelector('[data-case="'+sel+'"]'));
    const p={x:e.clientX-b.left,y:e.clientY-b.top};
    dragPath.setAttribute('d',curve(a,p));
    const el=document.elementFromPoint(e.clientX,e.clientY);
    const t=el&&el.closest?el.closest('[data-link]'):null;
    right.querySelectorAll('.lk-tool').forEach(x=>x.classList.toggle('over',x===t));
  }
  function up(e){
    window.removeEventListener('pointermove',move);
    dragging=false;
    if(dragPath){dragPath.remove();dragPath=null;}
    const el=document.elementFromPoint(e.clientX,e.clientY);
    const tool=el&&el.closest?el.closest('[data-link]'):null;
    if(tool&&sel)connect(sel,tool.dataset.link);
    right.querySelectorAll('.lk-tool').forEach(t=>t.classList.remove('over'));
  }
  board.addEventListener('pointerdown',e=>{
    const c=e.target.closest('[data-case]');
    if(!c)return;
    const cc=CASES.find(x=>x.id===c.dataset.case);
    if(done(cc))return;
    e.preventDefault();
    sel=c.dataset.case;paint();
    dragging=true;
    dragPath=document.createElementNS(NS,'path');
    dragPath.setAttribute('class','w-drag');wires.appendChild(dragPath);
    move(e);
    window.addEventListener('pointermove',move);
    window.addEventListener('pointerup',up,{once:true});
  });
  left.querySelectorAll('[data-case]').forEach(c=>c.onclick=()=>{
    const cc=CASES.find(x=>x.id===c.dataset.case);
    if(done(cc))return;
    sel=c.dataset.case;paint();hint.className='lk-hint';
    hint.innerHTML='再点右边对应的工具。'+(cc.a.length>1?'这张要连两个。':'');
  });
  right.querySelectorAll('[data-link]').forEach(t=>t.onclick=()=>{if(sel)connect(sel,t.dataset.link);});
  window.addEventListener('resize',()=>{try{redraw();}catch(e){}});
  sec.querySelector('#lkReset').onclick=()=>{S.answers.cls={};sel=null;api.save();paint();redraw();api.refresh();
    hint.className='lk-hint';hint.textContent='拖一根线，开始。';};
  requestAnimationFrame(()=>{paint();redraw();});
},
hint(S){const n=CASES.filter(c=>(S.answers.cls[c.id]||[]).length>=c.a.length).length;return n>=6?'':'还差 '+(6-n)+' 张没连完';},
gate(S){return CASES.every(c=>(S.answers.cls[c.id]||[]).length>=c.a.length);}},

/* ---------- 4 小试 ---------- */
{id:'apply',name:'小试',short:'小试',kicker:'STEP 4 · 在你自己的东西上',
html:`
<div class="step-h"><h1>选一个你熟悉的物件，<em>做一次动作</em></h1>
<p>不用想出好点子。先做一次动作，再写一句话：<b>它变成了什么，谁可能会用</b>。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>选一个物件</span>
  <span class="op"><span class="op-n">2</span>选一个动作</span>
  <span class="op"><span class="op-n">3</span>写一句话，看三条及格线</span>
</div>
<div class="grid2">
<div class="panel"><div class="panel-h"><h4>① 物件</h4><span>选一个或自己写</span></div>
<div class="chips" id="objs">${OBJECTS.map(o=>`<button class="chip" data-o="${o}">${o}</button>`).join('')}</div>
<div class="field" style="margin-top:10px"><label>或自己写一个</label><input id="objIn" placeholder="例如：公司的入职流程" maxlength="24"></div></div>
<div class="panel"><div class="panel-h"><h4>② 动作</h4><span>选一个</span></div>
<div class="chips" id="acts">${TOOLS.map(t=>`<button class="chip" data-a="${t.k}" style="gap:6px"><span style="width:14px;height:14px;display:inline-flex">${ICO[t.k]}</span>${t.n}</button>`).join('')}</div>
<div class="hint" id="actHint" style="margin-top:10px">每个动作的"劲儿"不一样，先按直觉选。</div></div>
</div>
<div class="panel" style="margin-top:12px"><div class="panel-h"><h4>③ 一句话</h4><span>必须能被别人看懂</span></div>
<div class="field"><textarea id="sent" maxlength="90" placeholder="例如：把保温杯的杯盖拿掉，换成一个能当杯垫的硅胶塞，这样开会时不用找地方放盖子"></textarea></div>
<div class="row" style="margin-top:9px"><span class="small" id="sentLen">0 / 90</span><div style="flex:1"></div><button class="btn sm" id="askAI">让 AI 追问我</button></div></div>
<div class="panel" style="margin-top:12px"><div class="panel-h"><h4>一句话的及格线</h4><span>实时检查</span></div>
<div class="grid3" id="qa">
  <div class="chk" data-c="obj"><i>○</i><b>说的是具体东西</b><span>能指着它说"就是这个"，不是"效率"</span></div>
  <div class="chk" data-c="chg"><i>○</i><b>说清变成了什么</b><span>拿掉/换成/多出一个/多干一件事</span></div>
  <div class="chk" data-c="who"><i>○</i><b>说清谁会用</b><span>一个具体的人或场景，不是"大家"</span></div>
</div></div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const objIn=sec.querySelector('#objIn'),sent=sec.querySelector('#sent'),len=sec.querySelector('#sentLen'),actHint=sec.querySelector('#actHint');
  const qa=sec.querySelector('#qa');
  function check(){
    const t=(a.sentence||'');
    const c1=!!(a.obj&&t.length>=6);
    const c2=/拿掉|去掉|换成|改成|变成|复制|拆|重排|多一|少一|同时|一起|多干/.test(t);
    const c3=/谁|用户|客户|同事|老人|孩子|学生|员工|老板|家人|司机|医生|顾客|新员工|新人|开会|通勤|出差/.test(t);
    [['obj',c1],['chg',c2],['who',c3]].forEach(([k,on])=>{
      const el=qa.querySelector('[data-c="'+k+'"]');
      if(!el)return;el.classList.toggle('on',on);el.querySelector('i').textContent=on?'✓':'○';
    });
  }
  function paint(){
    sec.querySelectorAll('[data-o]').forEach(b=>b.classList.toggle('on',a.obj===b.dataset.o));
    sec.querySelectorAll('[data-a]').forEach(b=>b.classList.toggle('on',a.act===b.dataset.a));
    if(a.obj)objIn.value=OBJECTS.includes(a.obj)?'':a.obj;
    sent.value=a.sentence||'';len.textContent=(a.sentence||'').length+' / 90';
    const t=TOOLS.find(x=>x.k===a.act);if(t)actHint.innerHTML='<b>'+t.n+'：</b>'+t.d;
    check();api.refresh();
  }
  sec.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{a.obj=b.dataset.o;api.save();paint();});
  objIn.addEventListener('input',()=>{a.obj=objIn.value.trim();api.save();paint();});
  sec.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{a.act=b.dataset.a;api.save();paint();});
  sent.addEventListener('input',()=>{a.sentence=sent.value;len.textContent=sent.value.length+' / 90';api.save();paint();});
  sec.querySelector('#askAI').onclick=()=>{
    document.querySelector('.side-tab[data-tab="ask"]').click();
    api.ai('so_what',(a.obj||'这个物件')+'，我用'+(TOOLS.find(x=>x.k===a.act)||{}).n+'，'+(a.sentence||'还没想好一句话'));
  };
  paint();
},
hint(S){const a=S.answers;if(!a.obj)return '先选一个物件';if(!a.act)return '再选一个动作';if((a.sentence||'').length<10)return '还差一句话';return '';},
gate(S){const a=S.answers;return !!(a.obj&&a.act&&(a.sentence||'').length>=10);}},

/* ---------- 5 提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 产出',
html:`
<div class="step-h"><h1>交一张<em>能被别人评的卡</em></h1>
<p>这一节的产出不是"好点子"，而是一张<b>判断卡</b>：你认出了哪些动作、你自己动手做了哪一个、你原来怎么想。</p></div>
<div class="grid2" style="align-items:start">
  <div id="cardSlot"></div>
  <div class="stack">
    <div class="panel"><div class="panel-h"><h4>还差一句</h4><span>会被同事看到</span></div>
      <div class="field"><label>我原来以为创新是……</label><textarea id="old" maxlength="60" placeholder="例如：以为创新就是等一个好点子出现"></textarea></div></div>
    <div class="panel"><div class="panel-h"><h4>提交</h4><span id="subSt">未提交</span></div>
      <p class="small">提交后进入班级互评池：同班 3 位同学会匿名评你的卡，你也会收到别人的卡。</p>
      <div class="row" style="margin-top:10px"><button class="btn primary" id="subBtn">提交到班级</button>
      <button class="btn" id="export2">导出 PNG</button></div>
      <div class="hint" id="subHint" style="margin-top:8px">未登录：只存本机，不进入互评。</div></div>
  </div>
</div>
<div class="panel" style="margin-top:12px"><div class="panel-h"><h4>同学会按这三条评你</h4><span>互评评分口径</span></div>
<div class="grid3">
  <div><div class="mono" style="font-size:9.5px;color:var(--acc)">有用</div><p class="small" style="margin-top:3px">换我是这个用户，我会不会真的用它？</p></div>
  <div><div class="mono" style="font-size:9.5px;color:var(--acc)">可行</div><p class="small" style="margin-top:3px">明天就能动手做，还是要等三年？</p></div>
  <div><div class="mono" style="font-size:9.5px;color:var(--acc)">证据</div><p class="small" style="margin-top:3px">能不能说服一个一开始就不相信的人？</p></div>
</div></div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const old=sec.querySelector('#old'),slot=sec.querySelector('#cardSlot'),
        btn=sec.querySelector('#subBtn'),st=sec.querySelector('#subSt');
  function paint(){
    old.value=a.old||'';
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A01</span><span>判断卡</span></div>'+
      '<h5>我的动作判断卡</h5><div class="kv">'+
      [['识别',CASES.filter(c=>(a.cls&&a.cls[c.id]||[]).length>=c.a.length).length+' / 6 张　共试 '+(a.tries||0)+' 次'],
       ['我的物件',a.obj||'—'],
       ['我的动作',(TOOLS.find(x=>x.k===a.act)||{}).n||'—'],
       ['一句话',a.sentence||'—'],
       ['原来以为',a.old||'—']].map(r=>'<div><b>'+r[0]+'</b><span class="'+(r[1]!=='—'?'fill':'')+'">'+r[1]+'</span></div>').join('')+
      '</div></div>';
    const ready=(a.old||'').length>=4;
    st.textContent=S.submitted?'已提交':'未提交';
    btn.textContent=S.submitted?'已提交，去看班级':(ready?'提交到班级':'先写上面那句');
    btn.disabled=!!S.submitted||!ready;
  }
  old.addEventListener('input',()=>{a.old=old.value;api.save();paint();api.refresh();});
  btn.onclick=async()=>{
    if((a.old||'').length<4){api.toast('先写一句"我原来以为创新是……"');return;}
    await api.submit();paint();
  };
  sec.querySelector('#export2').onclick=()=>api.exportCard();
  paint();
},
hint(S){return (S.answers.old||'').length>=4?'':'写一句"我原来以为创新是……"';},
gate(S){return !!(S.answers.old&&S.answers.old.length>=4);}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>今天带走<em>三种识别力</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 动作有限</div><p class="small" style="margin-top:5px">20 万项发明只有 5 种动作。想不出点子，通常是<b>动作没换</b>，不是脑子不够。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 先形态后功能</div><p class="small" style="margin-top:5px">先做出奇怪的东西，再问"谁会要"。反过来想需求，你只会想到大家都能想到的。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 限制是边界</div><p class="small" style="margin-top:5px">盒内思考不是没资源，是<b>先用完手上的</b>。新资源会掩盖真问题。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A02</span></div>
<p class="small">A02 · 功能性固着：蜡烛与图钉盒。我们会做一个 1926 年的实验——你会发现，<b>你刚才判断得对，但轮到自己动手时，还是会看不见手边的东西。</b></p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '我连错的那几张，是因为我看到了什么？',
 '这 5 个动作里，哪一个在你的工作里最少被用？',
 '如果只能用减法改你现在做的一个产品，你会拿掉什么？',
 '为什么"先想需求"反而容易想到老点子？',
 '你所在的行业，最近一次真正的创新用的是什么动作？'
]},

card(S){
  const a=S.answers||{};
  return {title:'A01 · 我的动作判断卡',rows:[
    ['识别',CASES.filter(c=>(a.cls&&a.cls[c.id]||[]).length>=c.a.length).length+' / 6 张　共试 '+(a.tries||0)+' 次'],
    ['我的物件',a.obj||'—'],
    ['我的动作',(TOOLS.find(x=>x.k===a.act)||{}).n||'—'],
    ['一句话',a.sentence||'—'],
    ['原来以为',a.old||'—']
  ]};
},
notes:[
 {t:'本节目标',h:'让学员承认：创新不是灵感，是有限动作的组合。不要求会用工具，只要求能识别。'},
 {t:'时间分配',h:'先猜 5′ · 五动作 8′ · 连线 12′ · 小试 12′ · 提交与点评 8′。直播只讲连错最多的 2 个动作。'},
 {t:'常见卡点',h:'学员会把"技术创新"当成唯一创新。追问："这个东西用的是什么动作？"'},
 {t:'直播怎么接',h:'看班级连线题的正确率与错法：集中在哪两个动作，就现场解剖那两个。'},
 {t:'大带小（如混编）',h:'本节不适合混龄；成人班直接按岗位分组。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A01']=L;
})();
