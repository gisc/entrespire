/* A19 · 除法：流程重排实战（拆开 → 重排 → 补真空） */
(function(){
'use strict';

const MIN_STEPS=6, MIN_NAME=2, MIN_WHO=2, MIN_WHY=10, MIN_VALUE=12, MIN_VOID=10;
const IMG={floor:'assets-cases-a19-floor.jpg'};
const MODE={space:'空间重排',time:'时间重排'};

/* ---------- 状态 ---------- */
function nid(){return 's'+Date.now().toString(36)+Math.random().toString(36).slice(2,5);}
function ensure(S){
  const ans=S.answers;
  if(!ans.a19||typeof ans.a19!=='object')ans.a19={};
  const x=ans.a19;
  ['name','selId','mode','target','anchor','who','why','value','void','q1','hook','c2']
    .forEach(k=>{if(typeof x[k]!=='string')x[k]='';});
  if(!Array.isArray(x.steps))x.steps=[];
  const clean=[];
  x.steps.forEach(s=>{
    if(!s)return;
    const raw=typeof s==='string'?s:(typeof s.t==='string'?s.t:'');
    const t=String(raw).trim().slice(0,10);
    if(!t)return;
    clean.push({id:(s&&s.id)?String(s.id):'',t:t});
  });
  const ids={};
  clean.forEach((s,i)=>{
    if(!s.id||ids[s.id])s.id=nid()+i;
    ids[s.id]=1;
  });
  x.steps=clean;
  x.gen=!!x.gen;
  x.q2=+x.q2||0;
  return x;
}
function stepOf(x){return x.steps.find(s=>s.id===x.selId)||null;}
function anchorOf(x){return x.steps.find(s=>s.id===x.anchor)||null;}
function targetText(x){
  const a=anchorOf(x);
  if(x.target==='first')return '最前';
  if(!a)return '—';
  if(x.target==='before')return '「'+a.t+'」之前';
  if(x.target==='after')return '「'+a.t+'」之后';
  if(x.target==='parallel')return '与「'+a.t+'」并行';
  return '—';
}
/* 真正算出新流程：不是一张静态图 */
function plan(x){
  const sel=stepOf(x);
  if(!sel||!x.mode||!x.target)return null;
  const others=x.steps.filter(s=>s.id!==sel.id);
  if(x.target==='first')return [{t:sel.t,moved:true}].concat(others.map(o=>({id:o.id,t:o.t})));
  const ai=others.findIndex(o=>o.id===x.anchor);
  if(ai<0)return null;
  if(x.target==='parallel'){
    return others.map(o=>o.id===x.anchor?{t:o.t,par:sel.t}:{id:o.id,t:o.t});
  }
  const arr=others.map(o=>({id:o.id,t:o.t}));
  arr.splice(x.target==='after'?ai+1:ai,0,{t:sel.t,moved:true});
  return arr;
}
function newPos(seq){
  for(let i=0;i<seq.length;i++){if(seq[i].moved||seq[i].par)return i+1;}
  return 0;
}
/* 新位置和原位一样，等于没挪 */
function samePos(x){
  const sel=stepOf(x);
  if(!sel||!x.target)return false;
  const i=x.steps.findIndex(s=>s.id===sel.id);
  if(x.target==='first')return i===0;
  if(x.target==='parallel')return false;
  const j=x.steps.findIndex(s=>s.id===x.anchor);
  if(j<0)return false;
  if(x.target==='before')return j===i+1;
  if(x.target==='after')return j===i-1;
  return false;
}
function flags(x){
  const p=plan(x);
  return {
    f1:x.name.trim().length>=MIN_NAME&&x.steps.length>=MIN_STEPS,
    f2:!!stepOf(x)&&!!x.mode&&!!p&&!samePos(x),
    f3:x.who.trim().length>=MIN_WHO&&x.why.trim().length>=MIN_WHY,
    f4:!!x.gen&&!!p&&!samePos(x)
  };
}
function base(x){const f=flags(x);return f.f1&&f.f2&&f.f3&&f.f4;}
function full(x){return base(x)&&x.value.trim().length>=MIN_VALUE&&x.void.trim().length>=MIN_VOID;}
function readySubmit(x){return full(x)&&!!x.q1&&x.q2>=1;}
function cardData(x){
  const sel=stepOf(x), n=x.steps.length;
  return {title:'A19 · 流程重排卡',rows:[
    ['流程',x.name?(x.name+' · '+n+' 步'):'—'],
    ['挪哪一步',sel?(sel.t+(x.mode?' · '+MODE[x.mode]:'')):'—'],
    ['新位置',plan(x)?targetText(x):'—'],
    ['谁接住',x.who||'—'],
    ['为什么能接',x.why||'—'],
    ['新价值',x.value||'—'],
    ['责任真空',x.void||'—']
  ]};
}

const L={
id:'A19',week:5,seq:19,title:'除法：流程重排实战',
kicker:'WEEK 5 · 除法 · 实战',tool:'div',toolName:'除法',minutes:45,
steps:[
/* ================= 1 先猜 ================= */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>验收挪到发货前，<em>为什么还是漏了</em></h1>
<p>一家设备厂把"客户验收"从发货后挪到发货前，想少一次退货。三个月后，漏检率反而上升。步骤没删，位置也挪了。</p></div>
<div class="grid2" style="align-items:stretch;margin-bottom:10px">
  <figure class="a19-fig">
    <div class="a19-fig-b">
      <img src="${IMG.floor}" alt="团队把流程步骤摊在地上重排" loading="lazy">
      <button class="case-zoom" id="zoomFloor" title="放大">⤢</button>
    </div>
    <figcaption><b>把流程摊在地上</b><span>每一步一张纸，挪动才看得见结构。</span><em>图：SIT 官方课程材料（已授权）</em></figcaption>
  </figure>
  <div class="panel"><div class="panel-h"><h4>失败在哪</h4><span>单选</span></div>
    <div class="opts">
      <button class="opt" data-h="a"><span class="k">A</span><span><b>挪错了步骤：验收不该提前</b><span>位置本身有问题</span></span></button>
      <button class="opt" data-h="b"><span class="k">B</span><span><b>缺一个接住的人</b><span>验收提前了，做验收的人没跟着提前</span></span></button>
      <button class="opt" data-h="c"><span class="k">C</span><span><b>挪得不彻底：回款也该一起提前</b><span>要一次挪到位</span></span></button>
    </div>
    <div id="hookOut" style="margin-top:10px"></div>
  </div>
</div>
<div class="a19-failflow">
  <span class="lb">改后的流程</span>
  <span class="a19-fchip">接单</span><i>→</i><span class="a19-fchip">排产</span><i>→</i><span class="a19-fchip">装配</span><i>→</i>
  <span class="a19-fchip mv">验收</span><i>→</i><span class="a19-fchip">发货</span><i>→</i><span class="a19-fchip">回款</span>
  <span class="a19-fnote">验收提前了，做验收的人没提前</span>
</div>`,
init(sec,api){
  const x=ensure(api.S),out=sec.querySelector('#hookOut');
  const zoom=sec.querySelector('#zoomFloor');
  if(zoom)zoom.onclick=()=>api.modal('<button class="modal-x">×</button><h3>把流程摊在地上</h3>'+
    '<img src="'+IMG.floor+'" alt="流程步骤摊在地上" style="width:100%;display:block;border:1px solid #2A3547;border-radius:8px">'+
    '<p class="small" style="margin-top:8px">SIT 的流程练习：每个步骤写一张纸，按顺序铺在地上。纸可以拿起来换位置；写在文档里就换不动。<br>图：SIT 官方课程材料（已授权）</p>');
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',x.hook===b.dataset.h));
    if(!x.hook){out.innerHTML='';return;}
    const ok=x.hook==='b';
    const body=ok
      ?'对。原流程里，验收这一步一直由客户和售后完成，他们只在发货之后出现。验收挪到发货前，落在了一个没有人的时间点上。<b>位置没错，人没跟上。</b>'
      :x.hook==='a'
        ?'位置本身没错。发货前做终检，是大多数工厂的常规做法。真正缺的是：这个时间点上，谁来做。'
        :'再挪一步只会造出第二个真空。回款提前之后，谁去催客户确认对账？先把验收这一步的人定下来。';
    out.innerHTML='<div class="a19-reveal"><div class="a19-reveal-k">'+(ok?'判定 · 接住的人缺位':'再想一层')+'</div>'+
      '<p class="small">'+body+'</p>'+
      '<div class="a19-roles">'+
        '<span><b>装配组</b>全程在厂</span>'+
        '<span><b>质检</b>只在抽检时到</span>'+
        '<span><b>客户 / 售后</b>发货后才出现</span>'+
      '</div></div>';
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{x.hook=b.dataset.h;api.save();paint();api.refresh();});
  paint();
},
hint(S){return ensure(S).hook?'':'先选一个判断';},
gate(S){return !!ensure(S).hook;}},

/* ================= 2 概念 ================= */
{id:'concept',name:'四步',short:'四步',kicker:'STEP 2 · 概念',
html:`
<div class="step-h a19-tight"><h1>重排四步，<em>前三步在纸上</em></h1>
<p>第四步要落到一个人身上。20 秒能讲完，但少一步就白挪。</p></div>
<div class="a19-four">
  <div class="a19-four-i"><span class="n">1</span><b>写全步骤</b><span>至少 6 步，按真实顺序，不美化。每一步顺带问一句：产出交给谁。</span></div>
  <div class="a19-four-i"><span class="n">2</span><b>只选一步</b><span>一次挪一步。挪三处，说不清是哪一步起了作用。</span></div>
  <div class="a19-four-i"><span class="n">3</span><b>定方向与新位置</b><span>空间＝换地方；时间＝换时机。最前、某步之前、某步之后、并行。</span></div>
  <div class="a19-four-i on"><span class="n">4</span><b>指定接住的人</b><span>角色写到人，再写一句他为什么能接：在现场、手上有工具、说得上话。</span></div>
</div>
<div class="grid2 a19-concept" style="align-items:start">
  <div class="panel"><div class="panel-h"><h4>什么时候别用</h4><span>先看清楚</span></div>
    <p class="small">这一步的产出没有明确的下一个人时，先别挪。先把"交给谁"写清楚，再谈位置。</p>
    <p class="small" style="margin-top:6px">另外两种也别挪：它是合规节点，必须有人签字；它的等待本身有价值，比如冷静期。</p>
  </div>
  <div class="panel"><div class="panel-h"><h4>检查</h4><span>二选一</span></div>
    <div class="opts">
      <button class="opt" data-c2="a"><span class="k">A</span><span><b>先判断新位置是不是更好</b><span>想清楚再动</span></span></button>
      <button class="opt" data-c2="b"><span class="k">B</span><span><b>先弄清这一步现在谁做、产出交给谁</b><span>找到交接点</span></span></button>
    </div>
    <div id="c2Out" style="margin-top:8px"></div>
  </div>
</div>`,
init(sec,api){
  const x=ensure(api.S),out=sec.querySelector('#c2Out');
  function paint(){
    sec.querySelectorAll('[data-c2]').forEach(b=>b.classList.toggle('on',x.c2===b.dataset.c2));
    if(!x.c2){out.innerHTML='';return;}
    const ok=x.c2==='b';
    out.innerHTML='<div class="a19-quick'+(ok?' ok':'')+'"><b>'+(ok?'先找交接点。':'顺序反了。')+'</b>'+
      (ok
        ?'现在谁做、产出交给谁，决定了挪过去之后该找谁接。这两个说不清，新位置好不好根本没法判断。'
        :'好不好要挪完才知道。先弄清现在谁做、产出交给谁，挪完才知道该找谁接。')+'</div>';
  }
  sec.querySelectorAll('[data-c2]').forEach(b=>b.onclick=()=>{x.c2=b.dataset.c2;api.save();paint();api.refresh();});
  paint();
},
hint(S){return ensure(S).c2?'':'选一个你的判断';},
gate(S){return !!ensure(S).c2;}},

/* ================= 3 流程拆解台 ================= */
{id:'bench',name:'流程拆解台',short:'拆解台',kicker:'STEP 3 · 流程拆解台',
html:`
<div class="step-h a19-tight"><h1>把你的流程，<em>拆开、挪一步、点名一个人</em></h1>
<p>六步以上才看得出结构。挪完必须点名：这一步在新位置由谁做。</p></div>
<div class="op-row">
  <span class="op on"><span class="op-n">1</span>写流程与步骤</span>
  <span class="op"><span class="op-n">2</span>选一步、定位置</span>
  <span class="op"><span class="op-n">3</span>指定接住的人</span>
  <span class="op"><span class="op-n">4</span>生成前后对照</span>
</div>
<div class="a19-bench">
  <div class="a19-bh"><b>DIVIDE · 流程拆解台</b><span id="bSt">0 / 4</span></div>
  <div class="a19-bb">
    <div class="a19-split">
      <div class="a19-col">
        <div class="a19-h"><b>① 流程与步骤</b><span id="stepCnt">0 / 6</span></div>
        <input class="a19-in" id="flowName" maxlength="20" placeholder="流程名，例如：客户投诉处理" autocomplete="off">
        <div class="a19-meter"><i id="stepBar"></i></div>
        <div class="a19-steps" id="stepList"></div>
        <div class="a19-add">
          <input id="stepIn" maxlength="10" placeholder="加一步，例如：终检" autocomplete="off">
          <button class="btn sm" id="stepAdd">加</button>
        </div>
        <div class="a19-hint" id="stepHint">按真实顺序写。想一步的产出交给了谁，下一步就出来了。</div>
      </div>
      <div class="a19-col">
        <div class="a19-h"><b>② 选一步、定方向与位置</b><span id="selSt">未选</span></div>
        <div class="a19-selbar" id="selBar">点左边任意一步</div>
        <div class="a19-h"><b>方向</b><span>二选一</span></div>
        <div class="a19-modes">
          <button class="a19-mode" data-mode="space"><b>空间重排</b><span>换地方</span></button>
          <button class="a19-mode" data-mode="time"><b>时间重排</b><span>换时机</span></button>
        </div>
        <div class="a19-h"><b>新位置</b><span id="targetSt">—</span></div>
        <div class="a19-targets">
          <button class="a19-tb" data-target="first">最前</button>
          <button class="a19-tb" data-target="before">某步之前</button>
          <button class="a19-tb" data-target="after">某步之后</button>
          <button class="a19-tb" data-target="parallel">并行</button>
        </div>
        <div id="anchorRow"></div>
        <div class="a19-h"><b>③ 谁接住</b><span id="whoCnt">0 / 2</span></div>
        <input class="a19-in" id="who" maxlength="12" placeholder="角色，写到人：装配组组长" autocomplete="off">
        <div class="a19-h" style="margin-top:6px"><b>为什么他能接</b><span id="whyCnt">0 / 10</span></div>
        <textarea class="a19-ta" id="why" maxlength="90" placeholder="例：他每天在装配线末端，手上有图纸和量具。"></textarea>
        <button class="btn primary a19-gen" id="genBtn" disabled>生成前后对照</button>
      </div>
    </div>
    <div class="a19-cmp" id="cmp"></div>
  </div>
  <div class="a19-bf">
    <span class="small">重排只改位置，不改步骤数。删了步骤，那是减法。</span>
    <div style="flex:1"></div>
    <button class="btn sm ghost" id="bReset">清空重来</button>
  </div>
</div>`,
init(sec,api){
  const S=api.S, x=ensure(S);
  const nameIn=sec.querySelector('#flowName'), list=sec.querySelector('#stepList');
  const stepIn=sec.querySelector('#stepIn'), stepAdd=sec.querySelector('#stepAdd');
  const stepCnt=sec.querySelector('#stepCnt'), stepBar=sec.querySelector('#stepBar');
  const selSt=sec.querySelector('#selSt'), selBar=sec.querySelector('#selBar');
  const targetSt=sec.querySelector('#targetSt'), anchorRow=sec.querySelector('#anchorRow');
  const whoIn=sec.querySelector('#who'), whyIn=sec.querySelector('#why');
  const whoCnt=sec.querySelector('#whoCnt'), whyCnt=sec.querySelector('#whyCnt');
  const genBtn=sec.querySelector('#genBtn'), cmp=sec.querySelector('#cmp'), bSt=sec.querySelector('#bSt');

  function paint(){
    if(document.activeElement!==nameIn)nameIn.value=x.name||'';
    const n=x.steps.length;
    stepCnt.textContent=n+' / '+MIN_STEPS;
    stepBar.style.width=Math.min(100,n/MIN_STEPS*100)+'%';
    stepBar.style.background=n>=MIN_STEPS?'var(--ok)':'var(--acc)';

    if(!n){
      list.innerHTML='<div class="a19-empty"><b>还没有步骤</b><span>按真实顺序写下 6 步。想一步的产出交给了谁，下一步就出来了。</span></div>';
    }else{
      list.innerHTML=x.steps.map((s,i)=>{
        const sel=s.id===x.selId;
        return '<div class="a19-step'+(sel?' on':'')+'" data-sel="'+s.id+'">'+
          '<span class="n">'+String(i+1).padStart(2,'0')+'</span>'+
          '<b>'+api.esc(s.t)+'</b>'+
          '<span class="ctl">'+
            '<button data-up title="上移"'+(i===0?' disabled':'')+'>↑</button>'+
            '<button data-down title="下移"'+(i===n-1?' disabled':'')+'>↓</button>'+
            '<button data-del title="删除">×</button>'+
          '</span></div>';
      }).join('');
    }

    const sel=stepOf(x);
    selSt.textContent=sel?('第 '+(x.steps.indexOf(sel)+1)+' 步'):'未选';
    selBar.innerHTML=sel
      ?'选中：<b>'+api.esc(sel.t)+'</b><span>'+(x.mode?MODE[x.mode]:'还没选方向')+'</span>'
      :'点左边任意一步';
    sec.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('on',x.mode===b.dataset.mode));
    sec.querySelectorAll('[data-target]').forEach(b=>b.classList.toggle('on',x.target===b.dataset.target));
    if(!x.target){targetSt.textContent='—';targetSt.classList.remove('a19-warn');}
    else if(samePos(x)){targetSt.textContent='位置没变';targetSt.classList.add('a19-warn');}
    else{targetSt.textContent=targetText(x);targetSt.classList.remove('a19-warn');}

    if(x.target==='before'||x.target==='after'||x.target==='parallel'){
      const others=x.steps.filter(s=>s.id!==x.selId);
      const label=x.target==='parallel'?'与哪一步并行':'相对哪一步';
      anchorRow.innerHTML=others.length
        ?'<div class="a19-h" style="margin-top:6px"><b>'+label+'</b><span>选一步</span></div>'+
          '<div class="a19-anch">'+others.map(s=>'<button class="chip'+(x.anchor===s.id?' on':'')+'" data-anchor="'+s.id+'">'+api.esc(s.t)+'</button>').join('')+'</div>'
        :'';
    }else{
      anchorRow.innerHTML='';
    }

    if(document.activeElement!==whoIn)whoIn.value=x.who||'';
    if(document.activeElement!==whyIn)whyIn.value=x.why||'';
    whoCnt.textContent=(x.who||'').length+' / '+MIN_WHO;
    whoCnt.classList.toggle('a19-pass',(x.who||'').trim().length>=MIN_WHO);
    whyCnt.textContent=(x.why||'').length+' / '+MIN_WHY;
    whyCnt.classList.toggle('a19-pass',(x.why||'').trim().length>=MIN_WHY);

    const f=flags(x);
    const cnt=[f.f1,f.f2,f.f3,f.f4].filter(Boolean).length;
    bSt.textContent=cnt+' / 4';
    const ok=f.f1&&f.f2&&f.f3;
    genBtn.disabled=!ok;
    genBtn.textContent=x.gen?'重新生成':'生成前后对照';
    paintCmp();
  }
  function paintCmp(){
    if(!x.gen){cmp.innerHTML='<div class="a19-cmpwait">生成后，这里会出现原流程与新流程的逐行对照，并标出被挪动的那一步。</div>';return;}
    const seq=plan(x), sel=stepOf(x);
    if(!seq||!sel){cmp.innerHTML='<div class="a19-cmpwait">信息不完整，回上面补齐。</div>';return;}
    const oldIdx=x.steps.indexOf(sel)+1, mvIdx=newPos(seq);
    const oldLine=x.steps.map((s,i)=>
      '<span class="a19-chip'+(s.id===sel.id?' origin':'')+'"><em>'+String(i+1).padStart(2,'0')+'</em><b>'+api.esc(s.t)+'</b>'+
      (s.id===sel.id?'<i class="a19-bd">原</i>':'')+'</span>').join('<i class="a19-ar">→</i>');
    const newLine=seq.map((it,i)=>{
      if(it.par){
        return '<span class="a19-chip par"><em>'+String(i+1).padStart(2,'0')+'</em><b>'+api.esc(it.t)+'</b>'+
          '<span class="a19-pl">∥</span><b class="a19-pm">'+api.esc(it.par)+'</b><i class="a19-bd mv">挪</i></span>';
      }
      return '<span class="a19-chip'+(it.moved?' moved':'')+'"><em>'+String(i+1).padStart(2,'0')+'</em><b>'+api.esc(it.t)+'</b>'+
        (it.moved?'<i class="a19-bd mv">挪</i>':'')+'</span>';
    }).join('<i class="a19-ar">→</i>');
    const delta=seq.length===x.steps.length?'步数不变 · '+x.steps.length+' 步':'并行合并 · '+seq.length+' 个位置';
    const same=samePos(x);
    const moveTxt=x.target==='parallel'
      ?'原位 '+String(oldIdx).padStart(2,'0')+' → 与「'+api.esc((anchorOf(x)||{}).t||'')+'」（第 '+String(mvIdx).padStart(2,'0')+' 位）'
      :'原位 '+String(oldIdx).padStart(2,'0')+' → 新位 '+String(mvIdx).padStart(2,'0');
    cmp.innerHTML=
      '<div class="a19-cmp-h"><b>原流程</b><span>'+x.steps.length+' 步</span></div>'+
      '<div class="a19-line">'+oldLine+'</div>'+
      '<div class="a19-cmp-h"><b>新流程</b><span>'+delta+'</span></div>'+
      '<div class="a19-line">'+newLine+'</div>'+
      '<div class="a19-cmp-note'+(same?' same':'')+'"><b>被挪动的那一步：'+api.esc(sel.t)+'</b>'+
        '<span>'+moveTxt+
        '　｜　'+MODE[x.mode]+(x.target==='parallel'?'':' · '+targetText(x))+'　｜　接住：'+api.esc(x.who||'还没写')+'</span>'+
        (same?'<b class="a19-warn">位置没变，等于没挪</b>':'')+'</div>';
  }
  function commit(){api.save();paint();api.refresh();}
  function invalidate(){x.gen=false;}

  list.addEventListener('click',e=>{
    const del=e.target.closest('[data-del]'), up=e.target.closest('[data-up]'), down=e.target.closest('[data-down]');
    if(del){
      const id=del.closest('[data-sel]').dataset.sel;
      const i=x.steps.findIndex(s=>s.id===id);if(i<0)return;
      x.steps.splice(i,1);
      if(x.selId===id)x.selId='';
      if(x.anchor===id)x.anchor='';
      invalidate();commit();return;
    }
    if(up||down){
      const id=(up||down).closest('[data-sel]').dataset.sel;
      const i=x.steps.findIndex(s=>s.id===id), j=up?i-1:i+1;
      if(i<0||j<0||j>=x.steps.length)return;
      const t=x.steps[i];x.steps[i]=x.steps[j];x.steps[j]=t;
      invalidate();commit();return;
    }
    const row=e.target.closest('[data-sel]');
    if(row){
      if(x.selId===row.dataset.sel)return;
      x.selId=row.dataset.sel;x.anchor='';
      invalidate();commit();
    }
  });
  function addStep(){
    const v=(stepIn.value||'').trim().replace(/\s+/g,' ');
    if(!v){stepIn.focus();return;}
    if(v.length>10){api.toast('一步控制在 10 字内');return;}
    if(x.steps.length>=12){api.toast('12 步够了，先删再加');return;}
    x.steps.push({id:nid(),t:v});
    stepIn.value='';
    invalidate();commit();stepIn.focus();
  }
  stepAdd.onclick=addStep;
  stepIn.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();addStep();}});
  nameIn.addEventListener('input',()=>{x.name=nameIn.value;api.save();paint();api.refresh();});
  sec.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{
    if(!stepOf(x)){api.toast('先点一步');return;}
    if(x.mode===b.dataset.mode)return;
    x.mode=b.dataset.mode;invalidate();commit();
  });
  sec.querySelectorAll('[data-target]').forEach(b=>b.onclick=()=>{
    if(!stepOf(x)){api.toast('先点一步');return;}
    if(x.target===b.dataset.target)return;
    x.target=b.dataset.target;
    if(x.target==='first')x.anchor='';
    invalidate();commit();
  });
  anchorRow.addEventListener('click',e=>{
    const b=e.target.closest('[data-anchor]');if(!b)return;
    x.anchor=b.dataset.anchor;invalidate();commit();
  });
  whoIn.addEventListener('input',()=>{
    x.who=whoIn.value;
    whoCnt.textContent=x.who.length+' / '+MIN_WHO;
    whoCnt.classList.toggle('a19-pass',x.who.trim().length>=MIN_WHO);
    api.save();paintCmp();paintBtns();api.refresh();
  });
  whyIn.addEventListener('input',()=>{
    x.why=whyIn.value;
    whyCnt.textContent=x.why.length+' / '+MIN_WHY;
    whyCnt.classList.toggle('a19-pass',x.why.trim().length>=MIN_WHY);
    api.save();paintCmp();paintBtns();api.refresh();
  });
  function paintBtns(){
    const f=flags(x), ok=f.f1&&f.f2&&f.f3;
    genBtn.disabled=!ok;
    bSt.textContent=[f.f1,f.f2,f.f3,f.f4].filter(Boolean).length+' / 4';
  }
  genBtn.onclick=()=>{
    const f=flags(x);
    if(!(f.f1&&f.f2&&f.f3)){api.toast('先把流程、步骤、位置和接住的人补齐');return;}
    x.gen=true;api.save();paint();api.refresh();
    api.toast('前后对照已生成，被挪动的那一步已标出');
  };
  sec.querySelector('#bReset').onclick=()=>{
    x.name='';x.steps=[];x.selId='';x.mode='';x.target='';x.anchor='';
    x.who='';x.why='';x.gen=false;
    x.value='';x.void='';x.q1='';x.q2=0;
    api.save();paint();api.refresh();
    api.toast('已清空，从流程名重新写');
  };
  paint();
  sec.__a19bench=paint;
},
onEnter(){
  const sec=document.querySelector('.step[data-s="2"]');
  if(sec&&sec.__a19bench)sec.__a19bench();
},
hint(S){
  const x=ensure(S), f=flags(x);
  if(!f.f1&&x.name.trim().length<MIN_NAME)return '先给流程起个名';
  if(!f.f1)return '步骤还差 '+(MIN_STEPS-x.steps.length)+' 步';
  if(!stepOf(x))return '点一步，选它来挪';
  if(!x.mode)return '选空间还是时间';
  if(!plan(x))return x.target==='first'?'':'再选一个参照的步骤';
  if(samePos(x))return '这个位置和原位一样，换一个位置';
  if(x.who.trim().length<MIN_WHO)return '写谁接住这一步';
  if(x.why.trim().length<MIN_WHY)return '写他为什么能接';
  if(!x.gen)return '生成前后对照';
  return '';
},
gate(S){
  const x=ensure(S), f=flags(x);
  return f.f1&&f.f2&&f.f3&&f.f4;
}},

/* ================= 4 在你的事上 ================= */
{id:'mine',name:'在你的事上',short:'在你的事',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>这次重排，<em>多出了什么、少了什么</em></h1>
<p>新价值要落到一个人少做了哪一步；责任真空要落到哪一刻没人管。</p></div>
<div class="a19-ctx" id="mineCtx"></div>
<div class="grid2" style="align-items:start;margin-top:10px">
  <div class="panel">
    <div class="panel-h"><h4>① 新价值</h4><span id="valCnt">0 / 12</span></div>
    <div class="field"><textarea id="valIn" maxlength="120" placeholder="例：装配组在厂内就完成终检，客户不用再等一次上门验收。"></textarea></div>
    <div class="hint" style="margin-top:6px">写"谁少做了哪一步"，不写"效率更高"。</div>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>② 新的责任真空</h4><span id="voidCnt">0 / 10</span></div>
    <div class="field"><textarea id="voidIn" maxlength="120" placeholder="例：夜间发货时组长不在，临时由谁签终检单。"></textarea></div>
    <div class="hint" style="margin-top:6px">写"哪一刻、哪个位置没人"，不写"加强管理"。</div>
  </div>
</div>
<div class="panel" style="margin-top:10px">
  <div class="panel-h"><h4>三句及格线</h4><span>不是形容词</span></div>
  <div class="a19-rubric">
    <div><b>01</b><span>新价值里有一个具体的人，和一个他不再做的动作。</span></div>
    <div><b>02</b><span>责任真空有一个具体时刻：几点、哪一步、谁不在。</span></div>
    <div><b>03</b><span>两句话能对上：省下来的时间，正好是真空出现的时间。</span></div>
  </div>
</div>`,
init(sec,api){
  const x=ensure(api.S);
  const val=sec.querySelector('#valIn'), vd=sec.querySelector('#voidIn');
  const valCnt=sec.querySelector('#valCnt'), voidCnt=sec.querySelector('#voidCnt'), ctx=sec.querySelector('#mineCtx');
  function paintCtx(){
    const sel=stepOf(x), seq=plan(x);
    ctx.innerHTML=sel
      ?'<span class="lb">你的重排</span>'+
        '<span class="a19-cctx"><b>'+api.esc(x.name||'未命名流程')+'</b>'+(x.steps.length?' · '+x.steps.length+' 步':'')+'</span>'+
        '<i>→</i><span class="a19-cctx mv">'+api.esc(sel.t)+'</span>'+
        '<i>→</i><span class="a19-cctx">'+(seq?api.esc(targetText(x)):'新位置未定')+'</span>'+
        '<i>→</i><span class="a19-cctx">'+api.esc(x.who||'接住的人未定')+'</span>'
      :'<span class="lb">还没有重排</span><span class="a19-cctx dim">先回第三步，选一步挪走并指定谁接住。</span>';
  }
  function paintFields(){
    if(document.activeElement!==val)val.value=x.value||'';
    if(document.activeElement!==vd)vd.value=x.void||'';
    valCnt.textContent=(x.value||'').length+' / '+MIN_VALUE;
    valCnt.classList.toggle('a19-pass',(x.value||'').trim().length>=MIN_VALUE);
    voidCnt.textContent=(x.void||'').length+' / '+MIN_VOID;
    voidCnt.classList.toggle('a19-pass',(x.void||'').trim().length>=MIN_VOID);
  }
  val.addEventListener('input',()=>{
    x.value=val.value;
    valCnt.textContent=x.value.length+' / '+MIN_VALUE;
    valCnt.classList.toggle('a19-pass',x.value.trim().length>=MIN_VALUE);
    api.save();api.refresh();
  });
  vd.addEventListener('input',()=>{
    x.void=vd.value;
    voidCnt.textContent=x.void.length+' / '+MIN_VOID;
    voidCnt.classList.toggle('a19-pass',x.void.trim().length>=MIN_VOID);
    api.save();api.refresh();
  });
  paintCtx();paintFields();
  sec.__a19mine=function(){paintCtx();paintFields();};
},
onEnter(){
  const sec=document.querySelector('.step[data-s="3"]');
  if(sec&&sec.__a19mine)sec.__a19mine();
},
hint(S){
  const x=ensure(S);
  if(!base(x))return '回第三步把重排补齐';
  if(x.value.trim().length<MIN_VALUE)return '新价值还差 '+(MIN_VALUE-x.value.trim().length)+' 字';
  if(x.void.trim().length<MIN_VOID)return '责任真空还差 '+(MIN_VOID-x.void.trim().length)+' 字';
  return '';
},
gate(S){
  const x=ensure(S);
  return base(x)&&x.value.trim().length>=MIN_VALUE&&x.void.trim().length>=MIN_VOID;
}},

/* ================= 5 过滤与提交 ================= */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 过滤与提交',
html:`
<div class="step-h a19-subh"><h1>两个判断，<em>交一张重排卡</em></h1>
<p>一个判断重排有没有改变结构，一个判断谁被改到了。两个都有，再提交。</p></div>
<div class="grid2" style="align-items:start">
  <div class="stack a19-subleft">
    <div class="panel">
      <div class="panel-h"><h4>① 这次重排，哪个会变</h4><span>单选</span></div>
      <div class="opts a19-opts">
        <button class="opt" data-q1="a"><span class="k">A</span><span><b>总时长变短，步数不变</b><span>典型的除法结果</span></span></button>
        <button class="opt" data-q1="b"><span class="k">B</span><span><b>总步数变少</b><span>结构上少了一步</span></span></button>
        <button class="opt" data-q1="c"><span class="k">C</span><span><b>两个都没变</b><span>只是换了个顺序</span></span></button>
      </div>
      <div class="a19-judge" id="q1Out">选一个，再看下面这句。</div>
    </div>
    <div class="panel">
      <div class="panel-h"><h4>② 谁最不适应</h4><span>1–5 分</span></div>
      <div class="score">
        <div class="score-i"><div class="lb"><b id="q2Name">接住这一步的人</b><span>1 = 几乎无感，5 = 他的活被改了</span></div>
          <div class="stars" data-k="q2">${[1,2,3,4,5].map(n=>`<button data-v="${n}">${n}</button>`).join('')}</div>
        </div>
      </div>
      <div class="a19-judge" id="q2Out">打完分，看下面这句。</div>
    </div>
    <div class="row">
      <button class="btn primary" id="subBtn" disabled>提交</button>
      <button class="btn" id="expBtn">导出 PNG</button>
      <span class="small" id="subSt">卡还不完整</span>
    </div>
  </div>
  <div class="stack">
    <div id="cardSlot"></div>
    <div class="panel">
      <div class="panel-h"><h4>提交后，同班会看这三样</h4><span>互评口径</span></div>
      <div class="a19-peers">
        <div><b>挪了哪一步</b><span>是不是只挪了一步，方向说清没有。</span></div>
        <div><b>谁接住</b><span>角色具体到人，还是只写了部门。</span></div>
        <div><b>真空在哪</b><span>能不能指到一个时刻和一个人。</span></div>
      </div>
    </div>
  </div>
</div>`,
init(sec,api){
  const S=api.S, x=ensure(S);
  const slot=sec.querySelector('#cardSlot'), subBtn=sec.querySelector('#subBtn'), subSt=sec.querySelector('#subSt');
  const q1Out=sec.querySelector('#q1Out'), q2Out=sec.querySelector('#q2Out'), q2Name=sec.querySelector('#q2Name');

  function paintQ1(){
    sec.querySelectorAll('[data-q1]').forEach(b=>b.classList.toggle('on',x.q1===b.dataset.q1));
    if(!x.q1){q1Out.className='a19-judge';q1Out.textContent='选一个，再看下面这句。';return;}
    const ok=x.q1==='a';
    const msg=ok
      ?'<b>这是除法该有的结果。</b>步骤没少，时间被挪到了更值的位置。'
      :x.q1==='b'
        ?'<b>步数变少，说明你顺手删了步骤。</b>那是减法。回拆解台把删掉的那一步放回去。'
        :'<b>两个都没变，重排只换了张图。</b>回去检查：新位置上有没有人接住，有没有一件事因此变短。';
    q1Out.className='a19-judge '+(ok?'ok':'warn');
    q1Out.innerHTML=msg;
  }
  function paintQ2(){
    sec.querySelectorAll('[data-k="q2"] button').forEach(b=>b.classList.toggle('on',+b.dataset.v<=x.q2));
    q2Name.textContent=x.who?('谁最不适应：'+x.who):'接住这一步的人';
    if(!x.q2){q2Out.className='a19-judge';q2Out.textContent='打完分，看下面这句。';return;}
    const msg=x.q2>=4
      ?'4–5 分：这次重排改到了某个人的日常动作。先找他聊 10 分钟，再谈推广。'
      :x.q2===3
        ?'3 分：他大概会多一道确认。把确认写进流程，别靠他记。'
        :'1–2 分：几乎无感。要么这次挪得离现场太远，要么接住的人本来就在那儿。';
    q2Out.className='a19-judge';
    q2Out.innerHTML=msg;
  }
  function paintCard(){
    const c=cardData(x), f=flags(x);
    const need=[
      {k:'流程与 6 步',ok:f.f1},
      {k:'选一步与位置',ok:f.f2},
      {k:'接住的人',ok:f.f3},
      {k:'前后对照',ok:!!x.gen},
      {k:'新价值',ok:x.value.trim().length>=MIN_VALUE},
      {k:'责任真空',ok:x.void.trim().length>=MIN_VOID},
      {k:'两个判断',ok:!!x.q1&&x.q2>=1}
    ];
    const miss=need.filter(r=>!r.ok).map(r=>r.k);
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A19</span><span>重排卡</span></div>'+
      '<h5>'+api.esc(c.title)+'</h5><div class="kv">'+
      c.rows.map(r=>'<div><b>'+api.esc(r[0])+'</b><span class="'+(r[1]&&r[1]!=='—'?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+
      '</div></div>'+
      (miss.length
        ?'<div class="a19-miss">还欠：'+api.esc(miss.join(' · '))+'</div>'
        :'<div class="a19-miss done">卡齐了。提交后机器先评一遍，再进班级互评。</div>');
  }
  function paintSubmit(){
    const ready=readySubmit(x);
    subBtn.disabled=!!S.submitted||!ready;
    subBtn.textContent=S.submitted?'已提交':'提交';
    subSt.textContent=S.submitted?'已提交 · 进入互评池':(ready?'可以提交':'卡还不完整');
  }
  function paintAll(){paintQ1();paintQ2();paintCard();paintSubmit();}

  sec.querySelectorAll('[data-q1]').forEach(b=>b.onclick=()=>{
    x.q1=b.dataset.q1;api.save();paintAll();api.refresh();
  });
  sec.querySelectorAll('[data-k="q2"] button').forEach(b=>b.onclick=()=>{
    x.q2=+b.dataset.v;api.save();paintAll();api.refresh();
  });
  subBtn.onclick=async()=>{
    if(!readySubmit(x)){api.toast('还差几项，先补齐');return;}
    subBtn.disabled=true;subBtn.textContent='提交中…';
    try{await api.submit();}catch(e){api.toast('提交出错，已存本机');}
    paintAll();
  };
  sec.querySelector('#expBtn').onclick=()=>api.exportCard();
  paintAll();
  sec.__a19sub=paintAll;
},
onEnter(){
  const sec=document.querySelector('.step[data-s="4"]');
  if(sec&&sec.__a19sub)sec.__a19sub();
},
hint(S){
  const x=ensure(S);
  if(!base(x))return '回第三步把重排补齐';
  if(x.value.trim().length<MIN_VALUE||x.void.trim().length<MIN_VOID)return '第四步还欠两句';
  if(!x.q1)return '先选"哪个会变"';
  if(!x.q2)return '给"谁最不适应"打个分';
  if(!S.submitted)return '点提交，机器会先评一遍';
  return '';
},
gate(S){return readySubmit(ensure(S))&&!!S.submitted;}},

/* ================= 6 收束 ================= */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>位置换了，<em>责任要跟着换</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel a19-take"><div class="a19-k">01 只挪一步</div><b>才看得清是哪一步起作用</b><span>一次挪三处，效果好也说不清原因，效果差也找不到原因。</span></div>
  <div class="panel a19-take"><div class="a19-k">02 位置要有主</div><b>新位置上得有一个具体的人</b><span>写部门等于没写。要写"这一刻他在不在现场"。</span></div>
  <div class="panel a19-take"><div class="a19-k">03 真空在后头</div><b>省下的时间会换个形式回来</b><span>谁多干了一件事、哪一刻没人签字，都是重排的账单。</span></div>
</div>
<div class="panel a19-next">
  <div class="panel-h"><h4>下一节</h4><span>A20</span></div>
  <p class="small">A20 · 除法：重排后的责任真空。挪完的那一步，原来由谁兜底、现在谁来兜——三个真实流程里的真空，和补法。</p>
  <div class="a19-next-q">重排不难，难的是挪完之后，还有一件事没人认领。</div>
  <div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div>
</div>`,
init(sec,api){sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},
gate(){return true;}}
],

side:{asks:[
 '你挪的这一步，原来的产出交给谁？',
 '新位置上，这个人在不在现场？',
 '他多接了一件事，原来那件事谁做？',
 '如果这一步挪错了，最早会在哪一刻被发现？',
 '你说的新价值，是谁少做了哪一步？'
]},

card(S){return cardData(ensure(S));},

notes:[
 {t:'本节目标',h:'让每个学员在自己的一条真实流程上跑完"拆开—重排—补真空"：写到 6 步以上、只挪一步、指定接住的人、生成前后对照，交出一张能被追问的重排卡。'},
 {t:'时间分配（45′）',h:'先猜 4′ · 四步 4′ · 拆解台 17′ · 在你的事 8′ · 两问与提交 6′ · 收束 6′ = 45′。拆解台是本节课的重心，不要压缩。'},
 {t:'常见卡点',h:'① 步骤写不到 6 步，看不出结构——让他按"接单—准备—执行—检查—交付—回款"扫一遍；② 一次挪三四步，说不清是哪一步起作用；③ 接住的人只写"质检部"，不写具体角色；④ 新价值写成"更高效"，没落到谁少做了哪一步。'},
 {t:'直播怎么接',h:'开场 30 秒用 Bolivar 租赁：一条流程拆成 0 天 / 15 天两条通道，六西格玛六年只省 2 天——优化的天花板是流程结构。然后打开直播中控，按"谁接住"一列看：先挑 2 张只写部门、没写具体角色的卡，现场追问"这一步发生的那一刻，这个人在不在现场？"再用 1 张写了具体角色和理由的卡对照。'},
 {t:'判分口径',h:'被挪的是不是只有一步 30%；新位置说得清（方向 + 参照步）25%；接住的人具体到能到场、理由成立 25%；新价值与责任真空能对上 20%。不评点子新不新。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A19']=L;
})();
