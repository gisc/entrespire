/* A17 · 除法：空间与时间重排 */
(function(){
'use strict';
const FLOWS=[
 {k:'cafe',n:'咖啡店点单',steps:['顾客排队','看菜单','点单付款','等叫号','取咖啡','找座位']},
 {k:'onboard',n:'新员工入职',steps:['发 offer','体检','签合同','领设备','开通账号','入职培训','第一次 1:1']},
 {k:'expense',n:'报销审批',steps:['员工填单','贴发票','主管签字','财务审核','打款','归档']}
];

const L={
id:'A17',week:5,seq:17,title:'除法：空间与时间重排',
kicker:'WEEK 5 · 除法',tool:'div',toolName:'除法',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>星巴克把<em>哪一步挪走了</em></h1>
<p>手机点单之后，到店直接拿走。它没有删掉任何一步，只是把一步<b>挪到了另一个时间</b>。</p></div>
<div class="grid2" style="align-items:center;margin-bottom:14px">
  <figure style="margin:0;border:1px solid var(--line2);border-radius:10px;overflow:hidden;background:#0F151F">
    <img src="assets-cases-a17-sbux.jpg" alt="手机点单" style="width:100%;display:block;max-height:280px;object-fit:cover">
    <figcaption style="padding:7px 10px;font-size:10px;color:var(--faint)">手机下单，到店取　图：SIT 官方课程材料（已授权）</figcaption>
  </figure>
  <div class="panel"><div class="panel-h"><h4>它做了什么</h4><span>单选</span></div>
    <div class="opts">
      <button class="opt" data-h="a"><span class="k">A</span><span><b>删掉了排队</b><span>省时间</span></span></button>
      <button class="opt" data-h="b"><span class="k">B</span><span><b>把点单挪到了到店之前</b><span>时间重排</span></span></button>
      <button class="opt" data-h="c"><span class="k">C</span><span><b>把咖啡机挪到门口</b><span>空间重排</span></span></button>
    </div>
    <div id="hookOut" style="margin-top:12px"></div></div>
</div>`,
init(sec,api){
  const S=api.S,out=sec.querySelector('#hookOut');
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',S.answers.hook===b.dataset.h));
    if(S.answers.hook){
      const ok=S.answers.hook==='b';
      out.innerHTML='<div class="panel" style="border-color:'+(ok?'rgba(78,159,110,.4)':'rgba(216,154,60,.4)')+';background:'+(ok?'rgba(78,159,110,.07)':'rgba(216,154,60,.06)')+'">'+
        '<p class="small" style="font-size:12px">'+(ok?'对。<b>点单被挪到了到店之前</b>，排队还在（在手机上），只是不在你站着的那个位置。这就是除法：拆开，重排，不删。':'更准确是 B：把"点单"这一步挪到到店之前。<b>除法不是删掉步骤，是让步骤换个位置或换个时间。</b>')+'</p></div>';
    }
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{S.answers.hook=b.dataset.h;api.save();paint();api.refresh();});
  paint();
},
hint(S){return S.answers.hook?'':'先选一个';},
gate(S){return !!S.answers.hook;}},

/* ---------- 2 概念 ---------- */
{id:'concept',name:'概念',short:'概念',kicker:'STEP 2 · 概念',
html:`
<div class="step-h"><h1>拆开，<em>换个位置或时间</em></h1>
<p>除法是最像"整理"的工具：所有步骤都还在，只是顺序或位置变了。</p></div>
<div class="grid2" style="margin-bottom:12px">
  <div class="panel"><div class="panel-h"><h4>两个方向</h4><span>先选一个</span></div>
    <div class="stack">
      <div><div class="mono" style="font-size:9.5px;color:var(--acc)">空间重排</div><p class="small" style="margin-top:3px">把某一步挪到另一个地方：收银台进试衣间、体检进公司、登记进电梯口。</p></div>
      <div><div class="mono" style="font-size:9.5px;color:var(--acc)">时间重排</div><p class="small" style="margin-top:3px">把某一步挪到另一个时间：点单提前、审批与报销分离、培训拆成每周 10 分钟。</p></div>
    </div></div>
  <div class="panel"><div class="panel-h"><h4>除法最容易出的问题</h4><span>责任真空</span></div>
    <p class="small" style="line-height:1.9">步骤换位之后，<b>原来那一步没人管了</b>。<br>
    例：收银进试衣间，那"防盗扣"谁拆？<br>
    例：点单提前，那"临时改单"谁接？</p>
    <div class="tag acc" style="margin-top:10px">重排之后，永远问一句：这一步现在谁负责？</div>
  </div>
</div>
<div class="panel" style="margin-bottom:12px"><div class="panel-h"><h4>组件也能挪</h4><span>产品层</span></div>
  <p class="small" style="line-height:1.9">除法不只挪流程里的步骤，也能挪<b>产品里的组件</b>：把拆开的零件<b>重新分配时间或空间</b>，再组合回去。</p>
  <p class="small" style="line-height:1.9">例：伞骨从伞面里面挪到外面，收伞时湿面就朝里了；辣酱瓶隔成两半，倒的时候才混合；维生素放进瓶盖，拧开才落进水里。</p>
  <div class="tag acc" style="margin-top:10px">判据：零件一个没少，只有位置或时间变了。</div>
</div>
<div class="panel"><div class="panel-h"><h4>检查</h4><span>单选</span></div>
<div class="opts">
<button class="opt" data-c="a"><span class="k">A</span><span><b>重排的目标是减少步骤</b><span>越少越好</span></span></button>
<button class="opt" data-c="b"><span class="k">B</span><span><b>重排的目标是让关键步骤出现在更好的位置/时间</b><span>步骤数可以不变</span></span></button>
</div></div>`,
init(sec,api){
  const S=api.S;
  function paint(){sec.querySelectorAll('[data-c]').forEach(b=>b.classList.toggle('on',S.answers.c2===b.dataset.c));}
  sec.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{S.answers.c2=b.dataset.c;api.save();paint();api.refresh();});
  paint();
},
hint(S){return S.answers.c2?'':'选一个你的判断';},
gate(S){return !!S.answers.c2;}},

/* ---------- 3 重排台 ---------- */
{id:'bench',name:'重排台',short:'重排',kicker:'STEP 3 · 重排台',
html:`
<div class="step-h"><h1>拆开一个流程，<em>把一步挪走</em></h1>
<p>选一个流程，用 ↑↓ 或"移到最前/最后"重排。至少挪 2 次，然后说出"哪一步现在没人管了"。</p></div>
<div class="bench">
  <div class="bench-h"><b>DIVIDE · 空间 / 时间重排</b><span class="st" id="bSt">0 步已挪</span></div>
  <div class="bench-b" style="overflow:auto">
    <div class="a17-pick" id="picks">
      ${FLOWS.map(f=>`<button class="chip" data-f="${f.k}">${f.n}</button>`).join('')}
    </div>
    <div class="a17-seq" id="seq"></div>
    <div class="a17-vac" id="vacBox" style="display:none">
      <div class="panel-h"><h4>哪一步现在没人管了</h4><span>可多选</span></div>
      <div class="chips" id="vac"></div>
    </div>
    <div class="a17-preview" id="preview"></div>
  </div>
  <div class="bench-f"><span class="small">先选一个流程；挪动后会自动生成"新流程"。</span><div style="flex:1"></div><button class="btn sm ghost" id="bReset">复原</button></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  a.moves=a.moves||0;a.vac=a.vac||[];
  const seqEl=sec.querySelector('#seq'),vacBox=sec.querySelector('#vacBox'),vacEl=sec.querySelector('#vac'),
        st=sec.querySelector('#bSt'),preview=sec.querySelector('#preview');
  function flow(){return FLOWS.find(f=>f.k===a.flow);}
  function order(){
    const f=flow();if(!f)return [];
    if(!a.order||a.order.length!==f.steps.length)return f.steps.map((_,i)=>i);
    return a.order;
  }
  function paint(){
    const f=flow();
    sec.querySelectorAll('[data-f]').forEach(b=>b.classList.toggle('on',a.flow===b.dataset.f));
    if(!f){seqEl.innerHTML='<div class="a17-empty">先选一个流程。</div>';vacBox.style.display='none';preview.innerHTML='';st.textContent='0 步已挪';return;}
    const o=order();
    const mvNames=a.movedNames||[];
    seqEl.innerHTML=o.map((idx,pos)=>`<div class="a17-step${mvNames.indexOf(f.steps[idx])>=0?' moved':''}"><span class="n">${pos+1}</span><b>${f.steps[idx]}</b>
      <span class="ctl"><button data-mv="up" data-i="${pos}" title="上移">↑</button><button data-mv="down" data-i="${pos}" title="下移">↓</button>
      <button data-mv="first" data-i="${pos}" title="移到最前">⇤</button><button data-mv="last" data-i="${pos}" title="移到最后">⇥</button></span></div>`).join('');
    seqEl.querySelectorAll('[data-mv]').forEach(b=>b.onclick=()=>{
      const i=+b.dataset.i,j=b.dataset.mv;const arr=order();
      const [x]=arr.splice(i,1);
      let k=i;
      if(j==='up')k=Math.max(0,i-1);
      if(j==='down')k=Math.min(arr.length,i);
      if(j==='first')k=0;
      if(j==='last')k=arr.length;
      arr.splice(k,0,x);
      a.order=arr;a.moves=(a.moves||0)+1;
      a.movedNames=(a.movedNames||[]).indexOf(f.steps[x])>=0?a.movedNames:(a.movedNames||[]).concat(f.steps[x]);
      api.save();paint();
    });
    st.textContent=(a.moves||0)+' 步已挪';
    vacBox.style.display=(a.moves||0)>=2?'':'none';
    vacEl.innerHTML=f.steps.map(s=>`<button class="chip${(a.vac||[]).indexOf(s)>=0?' on':''}" data-v="${s}">${s}</button>`).join('');
    vacEl.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{
      const v=b.dataset.v;a.vac=a.vac||[];
      a.vac=a.vac.indexOf(v)>=0?a.vac.filter(x=>x!==v):a.vac.concat(v);
      api.save();paint();
    });
    const moved=mvNames;
    preview.innerHTML=moved.length?'<div class="a17-note"><b>新流程：</b>'+o.map(idx=>f.steps[idx]).join(' → ')+'</div>'+
      '<div class="a17-note dim">被挪动的步骤：'+moved.join('、')+'　｜　你认为没人管的：'+((a.vac||[]).join('、')||'还没选')+'</div>':'';
    api.refresh();
  }
  sec.querySelector('#bReset').onclick=()=>{a.order=null;a.moves=0;a.vac=[];a.movedNames=[];api.save();paint();api.refresh();};
  sec.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{a.flow=b.dataset.f;a.order=null;a.moves=0;a.vac=[];a.movedNames=[];api.save();paint();});
  paint();
},
hint(S){const a=S.answers;if(!a.flow)return '先选一个流程';if((a.moves||0)<2)return '至少挪 2 步';if(!(a.vac||[]).length)return '选出"现在没人管"的步骤';return '';},
gate(S){const a=S.answers;return !!(a.flow&&(a.moves||0)>=2&&(a.vac||[]).length);}},

/* ---------- 4 在你的事上 ---------- */
{id:'mine',name:'在你的事上',short:'在你的事',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>你自己的流程，<em>挪一步试试</em></h1>
<p>写一个你每周都要走的流程（≥6 字），选空间或时间重排，写清新价值和新的责任真空。</p></div>
<div class="grid2">
  <div class="panel"><div class="panel-h"><h4>① 流程</h4><span>≥6 字</span></div>
    <div class="field"><input id="proc" maxlength="30" placeholder="例如：客户投诉处理"></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">② 重排方向</h4><span>选一个</span></div>
    <div class="chips" id="dir"><button class="chip" data-d="space">空间重排</button><button class="chip" data-d="time">时间重排</button></div>
    <div class="hint" id="dirHint" style="margin-top:8px">空间＝换地方；时间＝换顺序/时机。</div>
  </div>
  <div class="panel"><div class="panel-h"><h4>③ 挪哪一步、挪到哪</h4><span>≥10 字</span></div>
    <div class="field"><textarea id="mv" maxlength="50" placeholder="例如：把"满意度回访"从最后挪到上门前"></textarea></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">④ 新的责任真空</h4><span>≥10 字</span></div>
    <div class="field"><textarea id="void" maxlength="50" placeholder="挪完之后，哪一步没人管了？"></textarea></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const f={proc:sec.querySelector('#proc'),mv:sec.querySelector('#mv'),void:sec.querySelector('#void')};
  Object.keys(f).forEach(k=>{f[k].value=a[k]||'';f[k].addEventListener('input',()=>{a[k]=f[k].value;api.save();api.refresh();});});
  function paint(){
    sec.querySelectorAll('[data-d]').forEach(b=>b.classList.toggle('on',a.dir===b.dataset.d));
    const h=sec.querySelector('#dirHint');
    h.innerHTML=a.dir==='space'?'<b>空间：</b>把某一步挪到另一个地点（谁在那儿、谁就能顺手做）':a.dir==='time'?'<b>时间：</b>把某一步挪到另一个时机（提前/延后/拆开）':'空间＝换地方；时间＝换顺序/时机。';
  }
  sec.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{a.dir=b.dataset.d;api.save();paint();api.refresh();});
  paint();
},
hint(S){const a=S.answers;if((a.proc||'').length<6)return '先写流程';if(!a.dir)return '选重排方向';if((a.mv||'').length<10)return '没写清挪哪一步';if((a.void||'').length<10)return '没写责任真空';return '';},
gate(S){const a=S.answers;return !!((a.proc||'').length>=6&&a.dir&&(a.mv||'').length>=10&&(a.void||'').length>=10);}},

/* ---------- 5 提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 产出',
html:`
<div class="step-h"><h1>交一张<em>重排卡</em></h1></div>
<div class="grid2" style="align-items:start">
  <div id="cardSlot"></div>
  <div class="panel"><div class="panel-h"><h4>补一句</h4><span>会被同事看到</span></div>
    <div class="field"><label>这次重排最想验证的一个假设</label><textarea id="assume" maxlength="50" placeholder="例如：回访提前，投诉率会降一半"></textarea></div>
    <div class="row" style="margin-top:10px"><button class="btn primary" id="subBtn">提交</button><button class="btn" id="export2">导出 PNG</button></div>
    <div class="hint" id="subSt" style="margin-top:8px">未提交</div></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const slot=sec.querySelector('#cardSlot'),as=sec.querySelector('#assume'),btn=sec.querySelector('#subBtn'),st=sec.querySelector('#subSt');
  function paint(){
    as.value=a.assume||'';
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A17</span><span>重排卡</span></div>'+
      '<h5>'+api.esc(a.proc||'我的流程')+'</h5><div class="kv">'+
      [['方向',a.dir==='space'?'空间重排':a.dir==='time'?'时间重排':'—'],['挪动',a.mv],['责任真空',a.void],['假设',a.assume]]
      .map(r=>'<div><b>'+r[0]+'</b><span class="'+(r[1]?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+'</div></div>';
    st.textContent=S.submitted?'已提交':'未提交';btn.disabled=!!S.submitted;btn.textContent=S.submitted?'已提交':'提交';
  }
  as.addEventListener('input',()=>{a.assume=as.value;api.save();paint();api.refresh();});
  btn.onclick=async()=>{await api.submit();paint();};
  sec.querySelector('#export2').onclick=()=>api.exportCard();
  paint();
},
hint(S){return (S.answers.assume||'').length>=4?'':'写一句要验证的假设';},
gate(S){return (S.answers.assume||'').length>=4;}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>除法不改零件，<em>只改位置</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 不删只挪</div><p class="small" style="margin-top:5px">少一步是减法；换位置才是除法。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 两个方向</div><p class="small" style="margin-top:5px">空间（换地方）和时间（换时机）都可以。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 责任真空</div><p class="small" style="margin-top:5px">挪完必问：这一步现在谁负责？</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A18</span></div>
<p class="small">A18 · 除法：四个案例还原。H&M 试衣间、翻转课堂、检验前置、伞骨外置——看清"挪到哪、谁接住"。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '你挪的是步骤，还是删了步骤？',
 '挪走之后，原来那个位置谁在等？',
 '如果这一步挪到更早，谁必须提前准备？',
 '空间重排后，多出来的移动距离由谁承担？',
 '责任真空如果没人补，会以什么形式爆出来？'
]},

card(S){
  const a=S.answers||{};
  return {title:'A17 · 重排卡',rows:[
    ['流程',a.proc||'—'],
    ['方向',a.dir==='space'?'空间重排':a.dir==='time'?'时间重排':'—'],
    ['挪动',a.mv||'—'],['责任真空',a.void||'—'],['假设',a.assume||'—']
  ]};
},
notes:[
 {t:'本节目标',h:'让学员分清"删掉一步"和"把一步挪个位置"，并能做一次空间或时间重排。'},
 {t:'时间分配',h:'先猜 5′ · 概念 8′ · 重排台 15′ · 在你的事 12′ · 提交 5′。'},
 {t:'常见卡点',h:'学员会直接把步骤删掉。追问："这一步现在谁做？"'},
 {t:'直播怎么接',h:'看班级重排后的"责任真空"选得最多的是哪一步，现场讨论谁该接。'},
 {t:'和 A09 的区别',h:'减法拿掉组件，除法保留所有步骤只换位置。两者经常一起用。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A17']=L;
})();
