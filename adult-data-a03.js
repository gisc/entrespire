/* A03 · 结构性固着：画三个圆 · 认知地基 */
(function(){
'use strict';

const IMG={
 draw3:'assets-cases-a03-draw3.jpg',
 qwert:'assets-cases-a03-qwert.jpg',
 sym:'assets-cases-a03-symmetry.jpg'
};

/* 四种典型画法（官方原页六种里最常见的四种，用线稿复刻） */
const TYPES=[
 {k:'row',n:'三个一样大，排成一行',d:'大小相同、间距相等，横竖都算',
  svg:'<svg viewBox="0 0 100 60" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="20" cy="30" r="13"/><circle cx="50" cy="30" r="13"/><circle cx="80" cy="30" r="13"/></svg>'},
 {k:'shrink',n:'一大一中一小',d:'从大到小，像递减的台阶',
  svg:'<svg viewBox="0 0 100 60" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="22" cy="30" r="17"/><circle cx="53" cy="30" r="11"/><circle cx="79" cy="30" r="6.5"/></svg>'},
 {k:'touch',n:'三个圆两两相切',d:'边碰边，圆心连成一个三角',
  svg:'<svg viewBox="0 0 100 60" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="50" cy="20" r="14"/><circle cx="35" cy="43" r="14"/><circle cx="65" cy="43" r="14"/></svg>'},
 {k:'nest',n:'一个套一个',d:'同心，或大圆把小圆包住',
  svg:'<svg viewBox="0 0 100 60" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="50" cy="30" r="22"/><circle cx="50" cy="30" r="13.5"/><circle cx="50" cy="30" r="6"/></svg>'}
];
const TYPE_TXT={
 row:'这是最常见的画法：三个一样大、间距相等、落在一条线上。没有人要求你对称，你自己对齐了。',
 shrink:'第二常见：大小递减，但圆心仍然排在一条直线上。有变化的是尺寸，没变的是对称。',
 touch:'两两相切，圆心连起来是个等边三角形——这是把对称换了个方向，仍然处处对称。',
 nest:'同心嵌套，三条轴线完全重合。这是对称的极端版本：一个形状把另一个形状包住。'
};

/* 工作台：物件 × 几何属性 */
const OBJ={
 chair:{k:'chair',n:'椅子',a:'靠背',b:'坐面',c:'椅腿',open:'坐垫'},
 cup:{k:'cup',n:'杯子',a:'杯口',b:'杯身',c:'把手',open:'杯盖'},
 handle:{k:'handle',n:'门把手',a:'握把',b:'转轴',c:'面板',open:'握把'},
 box:{k:'box',n:'包装盒',a:'盒盖',b:'盒身',c:'内衬',open:'盒盖'}
};
const PROPS=[
 {k:'sym',n:'对称',d:'左右、上下是否一样'},
 {k:'ratio',n:'比例',d:'谁大谁小'},
 {k:'dir',n:'方向',d:'朝哪边、从哪进'},
 {k:'open',n:'开合',d:'怎么开、怎么合'},
 {k:'thick',n:'厚度',d:'多厚、多薄'},
 {k:'count',n:'数量',d:'总共几个'}
];
const F={
 sym:o=>[
  '把'+o.a+'做成左右不对称：一侧加宽一倍，另一侧收窄，只有一边能靠。',
  o.a+'是圆的，'+o.b+'是方的：一件东西上，两种形状并存。',
  '沿中线去掉一半'+o.a+'，留下的一侧加倍，重心偏到一边。',
  o.a+'和'+o.b+'沿斜线错开：上下也不再对齐。'
 ],
 ratio:o=>[
  '把'+o.a+'放大到整体的一半，'+o.b+'压到三分之一。',
  '把'+o.a+'做成细长条，长宽比 6:1，'+o.b+'压扁。',
  o.a+'和'+o.b+'的比例对调：原来 2:8，现在 8:2。',
  '把'+o.a+'缩到只占一角，'+o.c+'放大成主体。'
 ],
 dir:o=>[
  '整件翻转 180°：开口朝下，'+o.a+'转到下面。',
  '把'+o.a+'做成双面：朝里也朝外，两面都能用。',
  o.a+'的轴从竖直改成水平，从侧面进出。',
  '把'+o.a+'朝内凹进去，而不是朝外凸出来。'
 ],
 open:o=>[
  '去掉'+o.open+'的开合，改成一次性封死，只能撕开。',
  o.open+'从掀开改成抽出，像抽屉一样拉出来。',
  '把开合挪到'+o.c+'上，'+o.open+'固定不动。',
  o.open+'先转 90° 再打开：多一个动作，换一种手感。'
 ],
 thick:o=>[
  '把'+o.a+'压到 2 毫米，薄得像一张纸，可以叠一摞。',
  '把'+o.a+'加厚到 8 厘米，厚到能站住、能当底座。',
  '厚度做成不均：'+o.a+'一端厚一端薄，形成楔形。',
  '把'+o.a+'做成空心夹层：看着厚，拿起来轻。'
 ],
 count:o=>[
  '把'+o.a+'从 1 个变成 3 个，排成一行，任选其一。',
  '把'+o.a+'从 4 个减到 2 个，剩下的两个加宽补位。',
  '把'+o.a+'复制成阵列，像蜂窝一样铺满。',
  '只留 1 个'+o.a+'，但做成可拆换，用完换新的。'
 ]
};
const SHAPE_KINDS=[
 {k:'obj',n:'实体形状',d:'东西长什么样'},
 {k:'ui',n:'界面布局',d:'信息怎么摆'},
 {k:'flow',n:'流程顺序',d:'谁先谁后'}
];
const EXAMPLES=[
 {k:'flow',n:'报销单的四级审批'},
 {k:'ui',n:'首页第一屏的三栏'},
 {k:'obj',n:'会议室的长桌'},
 {k:'flow',n:'周报的固定格式'},
 {k:'ui',n:'客服话术的开头三句'},
 {k:'obj',n:'工位的隔断'}
];
const NECESSITY=[
 {k:'must',n:'必须的',d:'物理或法规决定，动不了'},
 {k:'habit',n:'习惯了',d:'一直这么做，没人问过为什么'},
 {k:'unsure',n:'说不清',d:'像必须的，但没查过依据'}
];
const MIND_CHK=[
 '换一个部门的人来摆，会不会摆出一样的？',
 '把它拆开，每一处都能说出理由吗？',
 '如果改掉它，谁会立刻反对？他的理由是物理，还是习惯？'
];

const nameOf=(arr,k)=>((arr.find(x=>x.k===k)||{}).n||'');

const L={
id:'A03',week:1,seq:3,title:'结构性固着：画三个圆',
kicker:'WEEK 1 · 认知地基',tool:'mind',toolName:'结构性固着',minutes:45,
steps:[
/* ================= 1 先猜：真的画 ================= */
{id:'hook',name:'先猜',short:'画圆',kicker:'STEP 1 · 先猜再画',
html:`
<div class="step-h"><h1>画三个圆，<em>你会画成什么样</em></h1>
<p>不用想，三笔，三个圆。画完再点右边那个按钮——先画，才看得见自己是怎么想的。</p></div>
<div class="a03-slide">
  <img src="${IMG.draw3}" alt="SIT 课程原页：请你画下 3 个圆圈">
  <div>
    <div class="mono">DAY 1 · PLEASE DRAW 3 CIRCLES</div>
    <p>官方原页只有一句话：<b>请你画下 3 个圆圈</b>。没有要求大小、位置、对称。</p>
    <em>图：SIT 官方课程材料（已授权）</em>
  </div>
</div>
<div class="bench a03-bench-pad">
  <div class="bench-h"><b>CANVAS · 三笔之内画三个圆</b><span class="st" id="padSt">0 / 3 笔</span></div>
  <div class="bench-b">
    <div class="a03-padwrap">
      <canvas id="pad" class="a03-pad" aria-label="画三个圆的画布"></canvas>
      <div class="a03-pad-empty" id="padEmpty">在这里画。鼠标、触控板、手指都行。</div>
    </div>
    <div class="a03-tools">
      <div class="a03-sws">
        ${[['#E9E7E2','白'],['#E6C766','金'],['#7FA6E0','蓝']].map((c,i)=>
          `<button class="a03-sw${i===0?' on':''}" data-c="${c[0]}" title="${c[1]}"><i style="background:${c[0]}"></i></button>`).join('')}
      </div>
      <div class="a03-ws">
        ${[3,7,14].map((w,i)=>
          `<button class="a03-wt${i===0?' on':''}" data-w="${w}" title="粗细"><i style="height:${2+i*3}px"></i></button>`).join('')}
      </div>
      <button class="btn sm ghost" id="padUndo">撤销</button>
      <button class="btn sm ghost" id="padClear">清除</button>
      <div style="flex:1"></div>
      <span class="small" id="padMsg">三笔都算圆，画歪了也是圆。</span>
    </div>
  </div>
  <div class="bench-f">
    <span class="small">画完再看别人的——顺序反了，就看不到自己原来怎么想。</span>
    <div style="flex:1"></div>
    <button class="btn primary sm" id="revealBtn" disabled>看看别人怎么画的</button>
  </div>
</div>
<div id="revealPanel" class="hidden">
  <div class="panel" style="margin-top:12px">
    <div class="panel-h"><h4>四种常见画法</h4><span>选一个最像你的</span></div>
    <div class="a03-types">${TYPES.map(t=>
      `<button class="a03-type" data-t="${t.k}">${t.svg}<b>${t.n}</b><span>${t.d}</span></button>`).join('')}</div>
  </div>
  <div id="verdict"></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const cv=sec.querySelector('#pad'),ctx=cv.getContext('2d');
  const st=sec.querySelector('#padSt'),empty=sec.querySelector('#padEmpty'),
        revealBtn=sec.querySelector('#revealBtn'),
        panel=sec.querySelector('#revealPanel'),verdict=sec.querySelector('#verdict'),
        msg=sec.querySelector('#padMsg');
  const W=1200,H=460;
  cv.width=W;cv.height=H;
  let color='#E9E7E2',wide=3,drawing=false,last=null;
  const undo=[];

  function bg(){
    ctx.fillStyle='#0B1018';ctx.fillRect(0,0,W,H);
    ctx.fillStyle='rgba(255,255,255,.05)';
    for(let x=30;x<W;x+=60)for(let y=30;y<H;y+=60){ctx.beginPath();ctx.arc(x,y,1.5,0,6.29);ctx.fill();}
  }
  function pos(e){
    const r=cv.getBoundingClientRect();
    return {x:(e.clientX-r.left)*W/Math.max(1,r.width),y:(e.clientY-r.top)*H/Math.max(1,r.height)};
  }
  function persist(){
    try{a.drawing=cv.toDataURL('image/png');}catch(e){a.drawing='';}
    api.save();paintSt();
  }
  function paintSt(){
    const n=a.strokes||0;
    st.textContent=n+' / 3 笔';
    st.className='st'+(n>=3?' a03-ok':'');
    revealBtn.disabled=n<3;
    empty.classList.toggle('hidden',!!(n>0||a.drawing));
  }

  bg();
  if(a.drawing){const im=new Image();im.onload=function(){ctx.drawImage(im,0,0,W,H);};im.src=a.drawing;}

  sec.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{
    color=b.dataset.c;
    sec.querySelectorAll('[data-c]').forEach(x=>x.classList.toggle('on',x===b));
  });
  sec.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{
    wide=+b.dataset.w;
    sec.querySelectorAll('[data-w]').forEach(x=>x.classList.toggle('on',x===b));
  });

  cv.addEventListener('pointerdown',e=>{
    e.preventDefault();
    if(cv.setPointerCapture){try{cv.setPointerCapture(e.pointerId);}catch(err){}}
    drawing=true;
    try{undo.push(cv.toDataURL('image/png'));}catch(err){}
    if(undo.length>8)undo.shift();
    a.strokes=(a.strokes||0)+1;
    const p=pos(e);last=p;
    ctx.fillStyle=color;ctx.beginPath();ctx.arc(p.x,p.y,Math.max(1,wide/2),0,6.29);ctx.fill();
    paintSt();
  });
  cv.addEventListener('pointermove',e=>{
    if(!drawing||!last)return;
    const p=pos(e);
    ctx.strokeStyle=color;ctx.lineWidth=wide;ctx.lineCap='round';ctx.lineJoin='round';
    ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.stroke();
    last=p;
  });
  function endStroke(){
    if(!drawing)return;
    drawing=false;last=null;
    persist();api.refresh();
    if((a.strokes||0)>=3&&!a.revealed)msg.innerHTML='三笔画完了。点右下角，看看别人怎么画的。';
  }
  cv.addEventListener('pointerup',endStroke);
  cv.addEventListener('pointercancel',endStroke);
  cv.addEventListener('pointerleave',function(){if(drawing)endStroke();});

  sec.querySelector('#padUndo').onclick=()=>{
    if(!undo.length){api.toast('没有可撤销的一笔');return;}
    const d=undo.pop(),im=new Image();
    im.onload=function(){
      ctx.clearRect(0,0,W,H);ctx.drawImage(im,0,0,W,H);
      a.strokes=Math.max(0,(a.strokes||0)-1);persist();api.refresh();
    };
    im.src=d;
  };
  sec.querySelector('#padClear').onclick=()=>{
    undo.length=0;bg();
    a.strokes=0;a.drawing='';api.save();paintSt();api.refresh();
    msg.textContent='画布清了。再画三个圆。';
  };

  function paintReveal(){
    panel.classList.toggle('hidden',!a.revealed);
    sec.querySelectorAll('[data-t]').forEach(b=>b.classList.toggle('on',a.like===b.dataset.t));
    if(!a.revealed){verdict.innerHTML='';return;}
    if(!a.like){
      verdict.innerHTML='<div class="panel" style="margin-top:12px"><div class="panel-h"><h4>揭晓</h4><span>先选一个</span></div>'+
        '<p class="small" style="font-size:12px">选完你会看到官方原页——那里列了六种排法，只有一句评论。</p></div>';
      return;
    }
    const t=TYPES.find(x=>x.k===a.like);
    verdict.innerHTML='<div class="panel a03-verdict" style="margin-top:12px">'+
      '<div class="panel-h"><h4>你选了：'+(t?t.n:'—')+'</h4><span>结构性固着</span></div>'+
      '<p class="a03-vp">'+(TYPE_TXT[a.like]||'')+'</p>'+
      '<div class="a03-fig"><img src="'+IMG.sym+'" alt="SIT 原页：六种画法，全部对称">'+
        '<div class="a03-figcap"><b>LOOK AT ALL THE SYMMETRY</b>'+
        '<span>官方原页：六种排法，从同心到相切，全都对称。整页只有一句评论——看看这些对称。</span>'+
        '<em>图：SIT 官方课程材料（已授权）</em></div></div>'+
      '<p class="a03-vp">没有人要求你对称。你只是<b>没想过可以不对称</b>。形状被当成了唯一的形式，别的排法根本没进入选项——这就是结构性固着。</p>'+
      '</div>';
  }

  revealBtn.onclick=()=>{
    a.revealed=1;api.save();paintReveal();api.refresh();
    msg.textContent='选一个最像你的画法。';
    setTimeout(()=>{try{panel.scrollIntoView({block:'start',behavior:'smooth'});}catch(e){}},60);
  };
  sec.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{
    a.like=b.dataset.t;api.save();paintReveal();api.refresh();
    setTimeout(()=>{try{verdict.scrollIntoView({block:'nearest',behavior:'smooth'});}catch(e){}},60);
  });
  paintSt();paintReveal();
},
hint(S){
  const a=S.answers,n=a.strokes||0;
  if(n<3)return '画布上还差 '+(3-n)+' 笔';
  if(!a.revealed)return '点「看看别人怎么画的」';
  if(!a.like)return '选一个最像你的画法';
  return '';
},
gate(S){const a=S.answers;return (a.strokes||0)>=3&&!!a.like;}},

/* ================= 2 概念 ================= */
{id:'concept',name:'概念',short:'概念',kicker:'STEP 2 · 概念',
html:`
<div class="step-h" style="margin-bottom:14px"><h1>不是审美问题，是<em>形状替你做了决定</em></h1>
<p>A01 讲过「形式决定功能」：先做出一个形状，再倒过来问谁会要。它还有另一半——<b>已经存在的形状，会替你决定用途，而且你不会察觉</b>。</p></div>
<div class="grid2" style="margin-bottom:10px;align-items:start">
  <div class="panel">
    <div class="panel-h"><h4>官方定义</h4><span>认知固着 · Cognitive Fixedness</span></div>
    <p class="lead" style="font-size:12.5px">「一个物体或情境，只被看成一种特定的形式，其余所有可能都被排除在外。」</p>
    <div class="a03-defs">
      <div><b>功能性固着</b>落在用途上：图钉盒只能是图钉盒，看不见它能当蜡烛台。</div>
      <div><b>结构性固着</b>落在形状上：三个圆就该一样大、排一排；用途没被限定，形状先被限定了。</div>
    </div>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>先猜一句</h4><span>二选一</span></div>
    <p class="a03-quizq">你每天在用的键盘，这个排列最初是为了——</p>
    <div class="a03-qbts">
      <button class="a03-qb" data-q="a"><i>A</i><b>让打字更快</b><span>按字母使用频率优化</span></button>
      <button class="a03-qb" data-q="b"><i>B</i><b>让字杆不卡住</b><span>牺牲速度换稳定</span></button>
    </div>
    <div id="quizOut"></div>
  </div>
</div>
<div class="panel a03-qwert" style="margin-bottom:10px">
  <div class="panel-h"><h4>一个形状，管了一百五十年</h4><span>SIT 原页 · QWERT 键盘</span></div>
  <div class="a03-qwert-b">
    <figure class="a03-shot">
      <img src="${IMG.qwert}" alt="老式打字机键盘，QWERTY 排列">
      <figcaption>图：SIT 官方课程材料（已授权）</figcaption>
    </figure>
    <div>
      <p class="lead">1870 年代，打字机的字杆从下往上打，相邻字母连着按会卡住。于是常用字母被<b>故意拆开</b>摆：A 在左手边，S 紧挨着它，E 在左上角。</p>
      <p class="lead" style="margin-top:6px">一百五十年后，字杆早就没了，<b>你的十指还在为那个机械限制排序</b>。QWERTY 不是你选的，是形状替你选的。</p>
      <div class="tag acc" style="margin-top:8px">这就是「形状决定用途」：它不阻止你做别的事，只是让你想不起来还有别的事。</div>
    </div>
  </div>
</div>
<div class="grid2" style="align-items:start">
  <div class="panel"><div class="panel-h"><h4>一条自查</h4><span>问形状，不问功能</span></div>
    <p class="a03-selftest">这个形状是必须的，还是习惯了？</p>
    <div class="a03-asks">${MIND_CHK.map((q,i)=>
      '<div class="a03-ask"><i>'+(i+1)+'</i><span>'+q+'</span></div>').join('')}</div>
  </div>
  <div class="panel"><div class="panel-h"><h4>什么时候别用</h4><span>改不动的形状</span></div>
    <p class="small" style="line-height:1.8">有些形状改不动，也不该改：插座孔距、门高 2 米、安全带的走向、药品的剂量刻度。它们由法规或人体决定，改了只有风险。</p>
    <p class="small" style="line-height:1.8;margin-top:8px">判断标准只有一条：<b>改这个形状，能不能让某个具体的人少做一个动作？</b>不能，就别改。</p>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers,out=sec.querySelector('#quizOut');
  function paint(){
    sec.querySelectorAll('[data-q]').forEach(b=>b.classList.toggle('on',a.quiz===b.dataset.q));
    if(!a.quiz){out.innerHTML='';return;}
    const ok=a.quiz==='b';
    out.innerHTML='<div class="a03-note '+(ok?'ok':'warn')+'"><b>'+(ok?'对':'差一点')+'</b>'+
      (ok
        ? '这不是效率，是故障。一个为了不卡住做的排列，后来变成了「打字就是这样」。'
        : '最早是为了不让字杆卡住：常用字母被故意拆开，打字反而更慢。')+'</div>';
  }
  sec.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{a.quiz=b.dataset.q;api.save();paint();api.refresh();});
  paint();
},
hint(S){return S.answers.quiz?'':'先选一个：QWERTY 当初是为了什么';},
gate(S){return !!S.answers.quiz;}},

/* ================= 3 工作台：改一个几何属性 ================= */
{id:'bench',name:'工作台',short:'改属性',kicker:'STEP 3 · 工作台',
html:`
<div class="step-h"><h1>改一个几何属性，<em>看它变成什么</em></h1>
<p>不用发明新东西。只动一个几何量——对称、比例、方向、开合、厚度、数量——原来的用途就会松掉一格。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>选一个日常物</span>
  <span class="op"><span class="op-n">2</span>选一个几何属性</span>
  <span class="op"><span class="op-n">3</span>点「改一下」，挑一条</span>
  <span class="op"><span class="op-n">4</span>写谁能拿它做新的事</span>
</div>
<div class="bench">
  <div class="bench-h"><b>BENCH · 改一个几何属性</b><span class="st" id="wbSt">0 / 2</span></div>
  <div class="bench-b">
    <div class="grid2" style="align-items:start">
      <div class="panel"><div class="panel-h"><h4>① 物件</h4><span>选一个</span></div>
        <div class="chips" id="objs">${Object.keys(OBJ).map(k=>
          `<button class="chip" data-o="${k}">${OBJ[k].n}</button>`).join('')}</div></div>
      <div class="panel"><div class="panel-h"><h4>② 几何属性</h4><span>只动一个</span></div>
        <div class="chips" id="props">${PROPS.map(p=>
          `<button class="chip" data-p="${p.k}" title="${p.d}">${p.n}</button>`).join('')}</div></div>
    </div>
    <div class="row" style="margin:12px 0 10px">
      <button class="btn primary sm" id="genBtn">改一下</button>
      <button class="btn sm ghost" id="rerollBtn">换一组</button>
      <button class="btn sm ghost" id="aiBtn">让 AI 追问我</button>
      <div style="flex:1"></div>
      <span class="small" id="genHint">先选物件和属性</span>
    </div>
    <div id="forms" class="a03-forms"></div>
    <div id="aiBox" class="a03-aibox hidden"></div>
    <div class="panel" style="margin-top:12px">
      <div class="panel-h"><h4>③ 这个形状让谁能做什么新的事</h4><span id="noteCnt">0 / 60</span></div>
      <div class="field"><textarea id="note" maxlength="60" placeholder="例如：坐面放大到一半、靠背压到三分之一，腰不好的人可以盘腿坐，不用再找垫子"></textarea></div>
      <div class="hint" id="noteHint" style="margin-top:7px">写一个人 + 一件原来做不了的事。没有具体的人也能过，但互评时会被追问。</div>
    </div>
  </div>
  <div class="bench-f"><span class="small">改坏了没关系。这一步只要求形状变了，不要求它有用。</span><div style="flex:1"></div><span class="small" id="wbMsg"></span></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const formsBox=sec.querySelector('#forms'),note=sec.querySelector('#note'),
        cnt=sec.querySelector('#noteCnt'),st=sec.querySelector('#wbSt'),
        genHint=sec.querySelector('#genHint'),aiBox=sec.querySelector('#aiBox'),
        aiBtn=sec.querySelector('#aiBtn'),wbMsg=sec.querySelector('#wbMsg');

  function list(){
    const o=OBJ[a.obj],p=PROPS.find(x=>x.k===a.prop);
    if(!o||!p)return [];
    const all=F[p.k](o),off=(a.gen||0)%all.length;
    return [0,1,2].map(i=>all[(i+off)%all.length]);
  }
  function paintForms(){
    const o=OBJ[a.obj],p=PROPS.find(x=>x.k===a.prop);
    if(!o||!p||!a.gen){
      formsBox.innerHTML='<div class="a03-wait">'+(o&&p
        ? '准备好了：'+o.n+' · 改「'+p.n+'」。点「改一下」。'
        : '选一个物件，再选一个几何属性。')+'</div>';
      return;
    }
    const arr=list();
    formsBox.innerHTML=arr.map((t,i)=>
      '<button class="a03-form'+(a.form===t?' on':'')+'" data-i="'+i+'"><span class="a03-fn">'+(i+1)+'</span><b>'+api.esc(t)+'</b></button>').join('');
    formsBox.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{
      a.form=arr[+b.dataset.i];a.pick=+b.dataset.i;
      api.save();paintForms();paintNote();api.refresh();
    });
  }
  function paintChips(){
    sec.querySelectorAll('[data-o]').forEach(b=>b.classList.toggle('on',a.obj===b.dataset.o));
    sec.querySelectorAll('[data-p]').forEach(b=>b.classList.toggle('on',a.prop===b.dataset.p));
    const o=OBJ[a.obj],p=PROPS.find(x=>x.k===a.prop);
    st.textContent=((o?1:0)+(p?1:0))+' / 2'+(a.form?' · 已选 1':'')+(a.obj&&a.prop?'':'');
    genHint.textContent=o&&p?(o.n+' · '+p.n):'先选物件和属性';
  }
  function paintNote(){
    if(note.value!==(a.note||'')&&document.activeElement!==note)note.value=a.note||'';
    const n=(a.note||'').length;
    cnt.textContent=n+' / 60';
    cnt.classList.toggle('a03-pass',n>=12);
    const who=/谁|用户|客户|同事|老人|孩子|员工|顾客|病人|司机|家人|店员|设计师|新人|访客|租客|骑手|妈妈|爸爸|学生|老师|患者|护士|保安|阿姨|师傅/.test(a.note||'');
    wbMsg.textContent=a.form?(who?'✓ 有人、有事':'形状有了，人还没出现'):'';
  }
  function reset(){
    const o=OBJ[a.obj],p=PROPS.find(x=>x.k===a.prop);
    if(!o||!p){api.toast('先选物件和属性');return;}
    a.gen=(a.gen||0)+1;a.form='';a.pick=-1;
    api.save();paintForms();paintChips();paintNote();api.refresh();
  }
  sec.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{
    if(a.obj!==b.dataset.o){a.obj=b.dataset.o;a.form='';a.gen=0;a.pick=-1;}
    api.save();paintChips();paintForms();paintNote();api.refresh();
  });
  sec.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{
    if(a.prop!==b.dataset.p){a.prop=b.dataset.p;a.form='';a.gen=0;a.pick=-1;}
    api.save();paintChips();paintForms();paintNote();api.refresh();
  });
  sec.querySelector('#genBtn').onclick=reset;
  sec.querySelector('#rerollBtn').onclick=reset;
  aiBtn.onclick=async()=>{
    const o=OBJ[a.obj],p=PROPS.find(x=>x.k===a.prop);
    if(!o||!p){api.toast('先选物件和属性');return;}
    if(!a.form){api.toast('先点「改一下」，挑一条');return;}
    aiBtn.disabled=true;aiBtn.textContent='正在问…';
    let txt='';
    try{
      txt=await api.ai('so_what',o.n+'，我把「'+p.n+'」改成了：'+a.form+'。只问一句：这改变了谁的什么？不要给建议，也不要评价好坏。');
    }catch(e){txt='';}
    aiBtn.disabled=false;aiBtn.textContent='让 AI 追问我';
    aiBox.classList.remove('hidden');
    if(txt&&txt.length>4){
      aiBox.innerHTML='<b>追问</b><span>'+api.esc(txt)+'</span><em>已记入右栏「追问」，可以接着答。</em>';
    }else{
      aiBox.innerHTML='<b>本地兜底</b><span>没有连上 AI。自己问一句更狠的：如果只能改一个数（尺寸、角度或个数），改哪个最让人不舒服？</span>';
    }
  };
  note.addEventListener('input',()=>{
    a.note=note.value;
    cnt.textContent=note.value.length+' / 60';
    cnt.classList.toggle('a03-pass',note.value.length>=12);
    paintNote();api.save();api.refresh();
  });
  paintChips();paintForms();paintNote();
},
hint(S){
  const a=S.answers;
  if(!a.obj||!a.prop)return '先选一个物件和一个几何属性';
  if(!a.form)return '点「改一下」，再挑一条';
  if((a.note||'').length<12)return '还差 '+(12-(a.note||'').length)+' 个字：谁能做什么新的事';
  return '';
},
gate(S){
  const a=S.answers;
  return !!(a.obj&&a.prop&&a.form&&(a.note||'').length>=12);
}},

/* ================= 4 在你的事上 ================= */
{id:'mine',name:'在你的事上',short:'我的',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>你手上也有一个<em>没人问过的形状</em></h1>
<p>形状不只在物体上：界面的分区、流程的先后、周报的固定格式，都是形状。选一个，问一句「如果改了会怎样」。</p></div>
<div class="grid2" style="align-items:start;margin-bottom:12px">
  <div class="panel"><div class="panel-h"><h4>① 哪一种形状</h4><span>选一个</span></div>
    <div class="chips" id="kinds">${SHAPE_KINDS.map(k=>
      `<button class="chip" data-k="${k.k}">${k.n}</button>`).join('')}</div>
    <div class="field" style="margin-top:10px"><label>具体是哪一个</label>
      <input id="objName" maxlength="30" placeholder="例如：报销单的四级审批 / App 首页的三栏"></div>
  </div>
  <div class="panel"><div class="panel-h"><h4>② 自查</h4><span>必须的，还是习惯了</span></div>
    <div class="chips" id="necs">${NECESSITY.map(k=>
      `<button class="chip" data-n="${k.k}" title="${k.d}">${k.n}</button>`).join('')}</div>
    <div class="hint" id="necHint" style="margin-top:10px">如果答案是「必须的」，先停下来：这一节对它没收益，换一个形状。</div>
  </div>
</div>
<div class="panel"><div class="panel-h"><h4>③ 如果把它改成……</h4><span id="mineCnt">0 / 80</span></div>
  <div class="field"><textarea id="mineTxt" maxlength="80" style="min-height:86px" placeholder="如果把它改成按金额分两档走，会发生什么……"></textarea></div>
  <div class="hint" id="mineHint" style="margin-top:7px">一句话写两头：形状怎么变，谁的日子变了。</div>
  <div class="grid2" id="mineChk" style="margin-top:10px">
    <div class="chk" data-c="shape"><i>○</i><b>改的是形状</b><span>比例、顺序、分区、朝向，不是"加个功能"</span></div>
    <div class="chk" data-c="who"><i>○</i><b>说清了谁受影响</b><span>一个具体的人，多做或少做了一步</span></div>
  </div>
</div>
<div class="panel" style="margin-top:10px"><div class="panel-h"><h4>还没想好？</h4><span>点一个，填进上面</span></div>
  <div class="chips" id="examples">${EXAMPLES.map(e=>
    `<button class="chip" data-ex="${e.n}" data-xk="${e.k}">${e.n}</button>`).join('')}</div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const objName=sec.querySelector('#objName'),txt=sec.querySelector('#mineTxt'),
        cnt=sec.querySelector('#mineCnt'),necHint=sec.querySelector('#necHint'),mineHint=sec.querySelector('#mineHint');
  function paint(){
    sec.querySelectorAll('[data-k]').forEach(b=>b.classList.toggle('on',a.shapeKind===b.dataset.k));
    sec.querySelectorAll('[data-n]').forEach(b=>b.classList.toggle('on',a.necessity===b.dataset.n));
    sec.querySelectorAll('[data-ex]').forEach(b=>b.classList.toggle('on',a.shapeName===b.dataset.ex));
    if(objName.value!==(a.shapeName||'')&&document.activeElement!==objName)objName.value=a.shapeName||'';
    if(txt.value!==(a.mine||'')&&document.activeElement!==txt)txt.value=a.mine||'';
    const n=(a.mine||'').length;
    cnt.textContent=n+' / 80';
    cnt.classList.toggle('a03-pass',n>=15);
    if(a.necessity==='must'){
      necHint.innerHTML='<b>那就换一个形状。</b>法规和物理决定的形状，改它只有风险。挑一个「一直这么做，但没人问过为什么」的。';
    }else if(a.necessity==='habit'){
      necHint.innerHTML='<b>就是它。</b>习惯了的东西，通常没人量过它对不对。';
    }else if(a.necessity==='unsure'){
      necHint.innerHTML='<b>去查一次。</b>说不清的形状，往往一半是法规、一半是习惯——把两半分开，能改的那半才动手。';
    }
    mineHint.textContent=n>=15?'够了。下一步两个分数，决定它先做还是先放。':'还差 '+(15-n)+' 个字。';
    paintChk();
  }
  function paintChk(){
    const t=a.mine||'';
    const okShape=t.length>=15&&/改|变|换|拆|分|合|并|挪|移|调|放|缩|扩|减|加|对调|重排|倒/.test(t);
    const okWho=/谁|用户|客户|同事|员工|顾客|老人|孩子|家人|访客|租客|患者|司机|门店|一线|新人|老板/.test(t);
    [['shape',okShape],['who',okWho]].forEach(function(pair){
      const el=sec.querySelector('[data-c="'+pair[0]+'"]');
      if(!el)return;
      el.classList.toggle('on',pair[1]);
      el.querySelector('i').textContent=pair[1]?'✓':'○';
    });
  }
  sec.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{a.shapeKind=b.dataset.k;api.save();paint();api.refresh();});
  sec.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>{a.necessity=b.dataset.n;api.save();paint();api.refresh();});
  sec.querySelectorAll('[data-ex]').forEach(b=>b.onclick=()=>{
    a.shapeKind=b.dataset.xk;a.shapeName=b.dataset.ex;
    api.save();paint();api.refresh();
  });
  objName.addEventListener('input',()=>{a.shapeName=objName.value;api.save();api.refresh();});
  txt.addEventListener('input',()=>{
    a.mine=txt.value;
    cnt.textContent=txt.value.length+' / 80';
    cnt.classList.toggle('a03-pass',txt.value.length>=15);
    mineHint.textContent=txt.value.length>=15?'够了。下一步两个分数，决定它先做还是先放。':'还差 '+(15-txt.value.length)+' 个字。';
    paintChk();api.save();api.refresh();
  });
  paint();
},
hint(S){
  const a=S.answers;
  if(!a.shapeKind)return '先选一种形状：实体、界面，还是流程';
  if((a.shapeName||'').length<2)return '写清楚具体是哪一个';
  if(!a.necessity)return '过一遍自查：必须的，还是习惯了';
  if((a.mine||'').length<15)return '还差 '+(15-(a.mine||'').length)+' 个字';
  return '';
},
gate(S){
  const a=S.answers;
  return !!(a.shapeKind&&(a.shapeName||'').length>=2&&a.necessity&&(a.mine||'').length>=15);
}},

/* ================= 5 过滤与提交 ================= */
{id:'submit',name:'双过滤',short:'提交',kicker:'STEP 5 · 过滤与提交',
html:`
<div class="step-h"><h1>两个分数，<em>决定它先做还是先放</em></h1>
<p>形状变了，不等于能上线。先问两件事：别人第一眼看不懂会怎样，改它要付多少代价。</p></div>
<div class="grid2" style="align-items:start">
  <div class="stack">
    <div class="panel"><div class="panel-h"><h4>双过滤</h4><span>1–5</span></div>
      <div class="score">
        <div class="score-i"><div class="lb"><b>第一眼会不会误解</b><span>1 = 很容易误解　5 = 一眼就懂</span></div>
          <div class="stars" data-k="misread">${[1,2,3,4,5].map(n=>`<button data-v="${n}">${n}</button>`).join('')}</div></div>
        <div class="score-i"><div class="lb"><b>改动成本有多大</b><span>1 = 几乎为零　5 = 要大动</span></div>
          <div class="stars" data-k="cost">${[1,2,3,4,5].map(n=>`<button data-v="${n}">${n}</button>`).join('')}</div></div>
      </div>
      <div class="a03-judge" id="judge">两个分数都打上，才有判断。</div>
    </div>
    <div class="panel"><div class="panel-h"><h4>最小可行的一步</h4><span id="stepCnt">0 / 60</span></div>
      <div class="field"><textarea id="stepTxt" maxlength="60" placeholder="只写一步：例如，先用纸板做一个不对称的样，让 3 个用户拿一下"></textarea></div>
      <div class="hint" style="margin-top:6px">写动作，不写计划。「加强沟通」不算一步。</div>
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
    <div><div class="mono" style="font-size:9.5px;color:var(--acc)">形状</div><p class="small" style="margin-top:3px">改的是哪一个几何量，改成了什么。</p></div>
    <div><div class="mono" style="font-size:9.5px;color:var(--acc)">谁受益</div><p class="small" style="margin-top:3px">有没有一个具体的人，少做了一步。</p></div>
    <div><div class="mono" style="font-size:9.5px;color:var(--acc)">第一步</div><p class="small" style="margin-top:3px">明天能不能动手，还是又一个三年计划。</p></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const judge=sec.querySelector('#judge'),stepTxt=sec.querySelector('#stepTxt'),
        stepCnt=sec.querySelector('#stepCnt'),slot=sec.querySelector('#cardSlot'),
        subBtn=sec.querySelector('#subBtn'),subSt=sec.querySelector('#subSt');

  function judgeOf(m,c){
    if(!m||!c)return {t:'两个分数都打上，才有判断。',k:''};
    if(m>=4&&c<=2)return {t:'明天就能试：一眼能懂，成本也低。',k:'go'};
    if(m>=4&&c>=4)return {t:'能懂，但太贵。先找最便宜的那一处，替整体。',k:'warn'};
    if(m<=2&&c<=3)return {t:'会被误解，但便宜。先做三个人的能看懂版，再谈上线。',k:'warn'};
    return {t:'又难懂又贵。这个形状先放下，换一个。',k:'bad'};
  }
  function paintStars(){
    [['misread',a.misread],['cost',a.cost]].forEach(p=>{
      sec.querySelectorAll('[data-k="'+p[0]+'"] button').forEach(b=>b.classList.toggle('on',+b.dataset.v<=p[1]));
    });
  }
  function paintJudge(){
    const j=judgeOf(a.misread,a.cost);
    judge.textContent=j.t;judge.className='a03-judge'+(j.k?' a03-j-'+j.k:'');
  }
  function paintCard(){
    const c=L.card(S),miss=[];
    if(!a.drawing&&!(a.strokes>=3))miss.push('画布');
    if(!a.like)miss.push('最像的画法');
    if(!a.form)miss.push('改的形状');
    if((a.note||'').length<12)miss.push('谁的新事');
    if((a.mine||'').length<15)miss.push('我的形状');
    if(!a.misread||!a.cost)miss.push('两个分数');
    if((a.stepTxt||'').length<8)miss.push('最小的一步');
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A03</span><span>形状卡</span></div>'+
      '<h5>'+api.esc(c.title)+'</h5><div class="kv">'+
      c.rows.map(r=>'<div><b>'+api.esc(r[0])+'</b><span class="'+(r[1]&&r[1]!=='—'?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+
      '</div></div>'+
      (miss.length?'<div class="a03-miss">还欠：'+api.esc(miss.join(' · '))+'</div>'
        :'<div class="a03-miss a03-done">卡齐了。提交后进入班级互评。</div>');
  }
  function paintSubmit(){
    const ready=!!(a.misread&&a.cost&&(a.stepTxt||'').length>=8);
    subBtn.disabled=!!S.submitted||!ready;
    subBtn.textContent=S.submitted?'已提交':'提交到班级';
    subSt.textContent=S.submitted?'已提交 · 进入互评池':(ready?'可以提交':'两件事：打分 + 写一步');
  }
  sec.querySelectorAll('[data-k]').forEach(box=>{
    box.querySelectorAll('button').forEach(b=>b.onclick=()=>{
      a[box.dataset.k]=+b.dataset.v;
      api.save();paintStars();paintJudge();paintCard();paintSubmit();api.refresh();
    });
  });
  stepTxt.addEventListener('input',()=>{
    a.stepTxt=stepTxt.value;
    stepCnt.textContent=stepTxt.value.length+' / 60';
    stepCnt.classList.toggle('a03-pass',stepTxt.value.length>=8);
    api.save();paintCard();paintSubmit();api.refresh();
  });
  subBtn.onclick=async()=>{
    if(!(a.misread&&a.cost&&(a.stepTxt||'').length>=8)){api.toast('先打分，再写一步');return;}
    subBtn.disabled=true;subBtn.textContent='提交中…';
    try{await api.submit();}catch(e){api.toast('提交出错，已存本机');}
    paintSubmit();paintCard();
  };
  sec.querySelector('#expBtn').onclick=()=>api.exportCard();
  paintStars();paintJudge();paintCard();paintSubmit();
},
hint(S){
  const a=S.answers;
  if(!a.misread||!a.cost)return '两个分数都打上';
  if((a.stepTxt||'').length<8)return '写一步：最小可行的那一步';
  return '';
},
gate(S){const a=S.answers;return !!(a.misread&&a.cost&&(a.stepTxt||'').length>=8);}},

/* ================= 6 收束 ================= */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>今天带走<em>三句话</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 形状是默认值</div>
    <p class="small" style="margin-top:5px">你画了三个一样大的圆，没人要求。默认值不是被说服的，是<b>没被想起可以改</b>。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 形状替你选用途</div>
    <p class="small" style="margin-top:5px">QWERTY 为一个一百五十年前的故障而排，你的手指至今照着排。结构不阻止别的用法，它只让别的用法<b>不出现</b>。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 一次只改一个量</div>
    <p class="small" style="margin-top:5px">对称、比例、方向、开合、厚度、数量。一次只动一个，才看得清是哪一个在起作用。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A04</span></div>
<p class="small">A04 · 关系固着：5 个苹果分给 6 个孩子。这一节的形状是看得见的；下一节的形状藏在<b>关系</b>里——5 个苹果和 6 个孩子，你以为问题是「不够分」，其实是你没允许任何一个人换一种拿法。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button><button class="btn ghost" id="cardBtn">看我的产出卡</button></div></div>`,
init(sec,api){
  sec.querySelector('#againBtn').onclick=()=>api.go(0);
  sec.querySelector('#cardBtn').onclick=()=>{
    const t=document.querySelector('.side-tab[data-tab="out"]');if(t)t.click();
  };
},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '你画的是三个一样大的圆吗？为什么不是一大两小？',
 '你行业里最像 QWERTY 的那个「形状」是什么？',
 '那个形状当初是为了解决什么问题？问题还在吗？',
 '改了这个形状，谁最先不适应？他担心的到底是什么？',
 '哪一个形状其实是法规或物理决定的，根本不该动？'
]},

card(S){
  const a=S.answers||{};
  const t=TYPES.find(x=>x.k===a.like);
  const ob=Object.keys(OBJ).map(k=>OBJ[k]).find(o=>o.k===a.obj);
  const pr=PROPS.find(p=>p.k===a.prop);
  const draw=a.drawing?('已画 · '+(a.strokes||0)+' 笔'+(t?' · 最像「'+t.n+'」':'')):'—';
  const form=a.form?((ob?ob.n:'物件')+' · '+(pr?pr.n:'属性')+' → '+a.form):'—';
  const j=(a.misread&&a.cost)?('一眼懂 '+a.misread+' / 成本 '+a.cost):'—';
  return {title:'A03 · 我的形状卡',rows:[
    ['画布',draw],
    ['改的形状',form],
    ['谁的新事',a.note||'—'],
    ['我的形状',a.shapeName?((nameOf(SHAPE_KINDS,a.shapeKind)||'形状')+'：'+a.shapeName):'—'],
    ['改成',a.mine||'—'],
    ['误解/成本',j],
    ['最小一步',a.stepTxt||'—']
  ]};
},

notes:[
 {t:'本节目标',h:'先让学员亲手画，看见自己的默认值；再把「形状」从物体扩展到界面与流程。不追求好点子，追求「原来还能不对称」。'},
 {t:'时间分配',h:'画与揭晓 10′ · 概念与 QWERTY 7′ · 改属性 12′ · 在你的事上 10′ · 双过滤与提交 6′。画布不要催，三笔很快，但总有人会画十分钟。'},
 {t:'常见卡点',h:'一，画完说「这不重要」。答：你画的时候没犹豫，说明形状已经被决定了。二，工作台里直接想用途、不改形状。答：先只许动一个几何量，用途等形状出来再想。'},
 {t:'直播怎么接',h:'看班级两处数据：① 「最像哪一种」的分布——若「排成一排」占多数，就把那句「没人要求你对称」投到大屏；② 物件×属性的分布——被改得最多的那个物件，念两三张卡里的「谁的新事」，只追问一句「这个人少做了哪一步」。不点评画得好不好。'},
 {t:'边界提醒',h:'结构性固着容易被讲成审美批判。守住一条：改形状的价值在于让某个具体的人少做一个动作，不在于更酷。法规与人体尺度决定的形状，明确告诉学员不要动。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A03']=L;
})();
