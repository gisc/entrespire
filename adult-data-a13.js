/* A13 · 乘法：复制必须改变 */
(function(){
'use strict';
const ICO={
 mul:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="6" width="11" height="9" rx="2"/><rect x="9" y="10" width="11" height="9" rx="2" stroke-dasharray="3 2" opacity=".8"/></svg>'
};
const OBJECTS=[
 {k:'cup',n:'保温杯',comps:['杯盖','杯身','密封圈','提绳','杯底']},
 {k:'bag',n:'双肩包',comps:['主袋','肩带','拉链','侧袋','背板']},
 {k:'meet',n:'周会',comps:['议程','主持人','纪要','计时','待办']}
];
const CHANGES=[
 {k:'pos',n:'换位置',d:'复制件放到另一个地方'},
 {k:'size',n:'换大小',d:'一大一小，各干各的'},
 {k:'num',n:'换数量',d:'一个变两个，不是简单加倍'},
 {k:'mat',n:'换材料',d:'同样的形状，不同材料'},
 {k:'form',n:'换形态',d:'同一个功能，不同形状'},
 {k:'who',n:'换对象',d:'同一个东西，服务另一类人'}
];
/* 8 个提案：真乘法 / 假乘法（只是加法）/ 看不出来 */
const JUDGE=[
 {id:'j1',t:'手机背面再加一块墨水屏',r:'ok',why:'复制了"屏幕"，并改变了它的属性（低功耗、常亮），用途不同。'},
 {id:'j2',t:'一个杯子里多装 50ml 水',r:'bad',why:'这是把同一件事做大，没有复制组件，也没有改变。'},
 {id:'j3',t:'双肩包两侧各加一个侧袋',r:'bad',why:'两个侧袋是同一个东西重复，属性没变——是加法，不是乘法。'},
 {id:'j4',t:'会议多请一个记录员',r:'bad',why:'加了一个人，不是复制"组件并改变"；原来的纪要流程没变。'},
 {id:'j5',t:'一台洗衣机分成上下两个筒，小筒洗内衣',r:'ok',why:'复制了"洗涤筒"并改变容量与用途，两筒可以同时跑。'},
 {id:'j6',t:'餐厅多印一份菜单给客人',r:'bad',why:'复制的是信息载体，属性完全一样，价值没有变化。'},
 {id:'j7',t:'雨伞复制一根短柄，收起来时当挂钩',r:'ok',why:'复制了"柄"并改变长度与用途（挂），是一物两用式的乘法。'},
 {id:'j8',t:'把 100 页的 PPT 拆成 10 份 10 页',r:'bad',why:'这是拆分（除法），不是复制。'}
];

const L={
id:'A13',week:4,seq:13,title:'乘法：复制必须改变',
kicker:'WEEK 4 · 乘法',tool:'mul',toolName:'乘法',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>这台手机，<em>复制了哪一块</em></h1>
<p>YotaPhone 正面一块彩屏，背面一块墨水屏。它用的不是"加一块屏"，而是<b>复制</b>——复制之后必须改变，否则只是变重。</p></div>
<div class="grid2" style="align-items:center;margin-bottom:14px">
  <figure style="margin:0;border:1px solid var(--line2);border-radius:10px;overflow:hidden;background:#0F151F">
    <img src="assets-cases-a13-yota.jpg" alt="YotaPhone" style="width:100%;display:block;max-height:280px;object-fit:cover">
    <figcaption style="padding:7px 10px;font-size:10px;color:var(--faint)">YotaPhone · 正面彩屏 + 背面墨水屏　图：SIT 官方课程材料（已授权）</figcaption>
  </figure>
  <div class="panel"><div class="panel-h"><h4>它复制了什么、改变了什么</h4><span>单选</span></div>
    <div class="opts">
      <button class="opt" data-h="a"><span class="k">A</span><span><b>加了一块电池</b><span>续航更长</span></span></button>
      <button class="opt" data-h="b"><span class="k">B</span><span><b>复制了屏幕，并改变成低功耗常亮屏</b><span>阅读场景</span></span></button>
      <button class="opt" data-h="c"><span class="k">C</span><span><b>把主屏做小了</b><span>省电</span></span></button>
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
        '<p class="small" style="font-size:12px">'+(ok?'对。它复制了"屏幕"这个组件，然后把复制件改成了低功耗、常亮、可长时间阅读的墨水屏——<b>复制 + 改变</b>，才是乘法。':'更准确的是 B：复制"屏幕"这个组件，再把复制件改成低功耗常亮的墨水屏。<b>只复制不改变，就是变重；只改变不复制，就是改造。</b>')+'</p></div>';
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
<div class="step-h"><h1>复制，然后<em>必须改一处</em></h1>
<p>乘法的动作只有两个半：<b>复制一个组件</b>、<b>改变复制件</b>，然后<b>找一个新场景</b>。少一个都不是乘法。</p></div>
<div class="grid2" style="margin-bottom:12px">
  <div class="panel"><div class="panel-h"><h4>和加法、改造的区别</h4><span>最容易混</span></div>
    <div class="stack">
      <div><div class="mono" style="font-size:9.5px;color:var(--acc)">加法</div><p class="small" style="margin-top:3px">多一个一样的东西：两个侧袋、两份菜单。价值不变，只是变多。</p></div>
      <div><div class="mono" style="font-size:9.5px;color:var(--acc)">改造</div><p class="small" style="margin-top:3px">把原来的东西改一改：屏幕变大、盖子变轻。没有复制。</p></div>
      <div><div class="mono" style="font-size:9.5px;color:var(--acc)">乘法</div><p class="small" style="margin-top:3px">复制一个，再让它和原件<b>不一样</b>，服务不同场景。</p></div>
    </div></div>
  <div class="panel"><div class="panel-h"><h4>改什么？六个方向</h4><span>够用了</span></div>
    <div class="chips">${CHANGES.map(c=>`<span class="chip on">${c.n}</span>`).join('')}</div>
    <p class="small" style="margin-top:8px">换位置 / 换大小 / 换数量 / 换材料 / 换形态 / 换对象。<b>改得越不像，越容易找到新场景。</b></p>
    <div class="tag acc" style="margin-top:8px">反例：两个一样的侧袋 = 加法</div>
  </div>
</div>
<div class="panel"><div class="panel-h"><h4>先判断一个</h4><span>单选</span></div>
<div class="opts">
<button class="opt" data-c="a"><span class="k">A</span><span><b>复制件可以完全一样，只要数量够</b><span>量大也是创新</span></span></button>
<button class="opt" data-c="b"><span class="k">B</span><span><b>复制件必须和原件不一样</b><span>不一样才有新场景</span></span></button>
</div></div>`,
init(sec,api){
  const S=api.S;
  function paint(){sec.querySelectorAll('[data-c]').forEach(b=>b.classList.toggle('on',S.answers.c2===b.dataset.c));}
  sec.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{S.answers.c2=b.dataset.c;api.save();paint();api.refresh();});
  paint();
},
hint(S){return S.answers.c2?'':'选一个你的判断';},
gate(S){return !!S.answers.c2;}},

/* ---------- 3 判断台 ---------- */
{id:'judge',name:'判断台',short:'判断',kicker:'STEP 3 · 判断台',
html:`
<div class="step-h"><h1>八个提案：<em>真乘法，还是只是加法</em></h1>
<p>选完会告诉你为什么。注意"拆分"和"改造"都会混进来。</p></div>
<div class="bench">
  <div class="bench-h"><b>MULTIPLY · 真假乘法</b><span class="st" id="jSt">0 / 8</span></div>
  <div class="bench-b" style="overflow:auto"><div class="a13-grid" id="jGrid"></div></div>
  <div class="bench-f"><span class="small">判断标准：复制了吗？复制件变了吗？</span><div style="flex:1"></div><button class="btn sm ghost" id="jReset">重来</button></div>
</div>`,
init(sec,api){
  const S=api.S;S.answers.judge=S.answers.judge||{};
  const grid=sec.querySelector('#jGrid'),st=sec.querySelector('#jSt');
  const LAB={ok:'真乘法',bad:'不是乘法'};
  function paint(){
    grid.innerHTML=JUDGE.map(c=>{
      const v=S.answers.judge[c.id]||{};
      return '<div class="a13-card'+(v.r?' done':'')+'"><div class="a13-p">'+c.t+'</div>'+
        '<div class="a13-r">'+['ok','bad'].map(r=>`<button class="a13-rb${v.r===r?' on '+r:''}" data-r="${r}" data-id="${c.id}">${LAB[r]}</button>`).join('')+'</div>'+
        (v.r?'<div class="a13-why '+(v.r===c.r?'good':'diff')+'">'+(v.r===c.r?'✓ 一致':'△ 参考答案：'+LAB[c.r])+'<br>'+c.why+'</div>':'')+
        '</div>';
    }).join('');
    grid.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{
      const id=b.dataset.id;S.answers.judge[id]=S.answers.judge[id]||{};
      S.answers.judge[id].r=b.dataset.r;api.save();paint();api.refresh();
    });
    st.textContent=Object.values(S.answers.judge).filter(v=>v&&v.r).length+' / 8';
  }
  sec.querySelector('#jReset').onclick=()=>{S.answers.judge={};api.save();paint();api.refresh();};
  paint();
},
hint(S){const n=Object.values(S.answers.judge||{}).filter(v=>v&&v.r).length;return n>=8?'':'还差 '+(8-n)+' 个没判断';},
gate(S){return Object.values(S.answers.judge||{}).filter(v=>v&&v.r).length>=8;}},

/* ---------- 4 复制台 ---------- */
{id:'bench',name:'复制台',short:'复制',kicker:'STEP 4 · 复制台',
html:`
<div class="step-h"><h1>选一个组件，<em>复制并改变它</em></h1>
<p>先选对象，再选一个组件复制，然后必须选一个改变方向——系统会给你三个变体。</p></div>
<div class="op-row">
  <span class="op"><span class="op-n">1</span>选对象</span>
  <span class="op"><span class="op-n">2</span>选要复制的组件</span>
  <span class="op"><span class="op-n">3</span>选改变方向</span>
  <span class="op"><span class="op-n">4</span>挑一个变体，写新场景</span>
</div>
<div class="grid3">
  <div class="panel"><div class="panel-h"><h4>① 对象</h4><span>三选一</span></div>
    <div class="stack">${OBJECTS.map(o=>`<button class="a13-obj" data-o="${o.k}"><b>${o.n}</b><i>→</i></button>`).join('')}</div></div>
  <div class="panel"><div class="panel-h"><h4>② 复制哪个组件</h4><span>选一个</span></div>
    <div class="chips" id="comps"><span class="small">先选对象</span></div></div>
  <div class="panel"><div class="panel-h"><h4>③ 改变方向</h4><span>选一个</span></div>
    <div class="chips" id="changes">${CHANGES.map(c=>`<button class="chip" data-ch="${c.k}">${c.n}</button>`).join('')}</div>
    <div class="hint" id="chHint" style="margin-top:8px">六个方向里选一个。</div></div>
</div>
<div class="panel" style="margin-top:12px"><div class="panel-h"><h4>④ 三个变体，挑一个</h4><span id="vCnt">0</span></div>
  <div class="stack" id="variants"><div class="a13-empty">选完前三项，这里会出现三个变体。</div></div>
  <div class="field" id="sceneBox" style="margin-top:10px;display:none"><label>新场景：谁会用它</label>
    <input id="scene" maxlength="40" placeholder="例如：出差时只看行程，不想带充电宝的人"></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const compsEl=sec.querySelector('#comps'),varEl=sec.querySelector('#variants'),
        chHint=sec.querySelector('#chHint'),sceneBox=sec.querySelector('#sceneBox'),scene=sec.querySelector('#scene');
  const CHN={pos:'位置',size:'大小',num:'数量',mat:'材料',form:'形态',who:'对象'};
  function obj(){return OBJECTS.find(o=>o.k===a.obj);}
  function variants(){
    const o=obj();if(!o||!a.comp||!a.ch)return [];
    const c=a.comp, ch=a.ch, n=o.n;
    const M={
      pos:[`${n}的${c}挪到另一侧`,`${c}可拆下来单独用`,`${c}放到${n}外面`],
      size:[`大${c} + 小${c}，各干各的`,`${c}做成可伸缩`,`迷你${c}随身携带`],
      num:[`两个${c}，一个常用一个备用`,`${c}成一排，按顺序用`,`${c}多一个给同行的人`],
      mat:[`${c}换成软材料`,`${c}换成透明材料`,`${c}换成可降解材料`],
      form:[`${c}改成折叠式`,`${c}改成可翻转`,`${c}改成镂空`],
      who:[`${c}专门给左撇子`,`${c}专门给老人`,`${c}专门给小孩`]
    };
    return M[ch]||[];
  }
  function paint(){
    sec.querySelectorAll('[data-o]').forEach(b=>b.classList.toggle('on',a.obj===b.dataset.o));
    const o=obj();
    compsEl.innerHTML=o?o.comps.map(c=>`<button class="chip${a.comp===c?' on':''}" data-comp="${c}">${c}</button>`).join(''):'<span class="small">先选对象</span>';
    sec.querySelectorAll('[data-ch]').forEach(b=>b.classList.toggle('on',a.ch===b.dataset.k));
    if(a.ch)chHint.innerHTML='<b>'+CHN[a.ch]+'：</b>'+(CHANGES.find(c=>c.k===a.ch)||{}).d;
    const vs=variants();a.variants=vs;
    varEl.innerHTML=vs.length?vs.map((v,i)=>`<button class="a13-var${a.vIdx===i?' on':''}" data-v="${i}"><b>${api.esc(v)}</b><i>${a.vIdx===i?'✓':'→'}</i></button>`).join(''):'<div class="a13-empty">选完前三项，这里会出现三个变体。</div>';
    sec.querySelector('#vCnt').textContent=vs.length?vs.length+' 个':'0';
    sceneBox.style.display=(a.vIdx!==null&&a.vIdx!==undefined)?'':'none';
    scene.value=a.scene||'';
    varEl.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{a.vIdx=+b.dataset.v;a.formText=vs[+b.dataset.v];api.save();paint();api.refresh();});
    compsEl.querySelectorAll('[data-comp]').forEach(b=>b.onclick=()=>{a.comp=b.dataset.comp;a.vIdx=null;a.formText='';api.save();paint();});
    api.refresh();
  }
  sec.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{a.obj=b.dataset.o;a.comp='';a.ch='';a.vIdx=null;a.formText='';api.save();paint();});
  sec.querySelectorAll('[data-ch]').forEach(b=>b.onclick=()=>{a.ch=b.dataset.ch;a.vIdx=null;a.formText='';api.save();paint();});
  scene.addEventListener('input',()=>{a.scene=scene.value;api.save();api.refresh();});
  paint();
},
hint(S){const a=S.answers;if(!a.obj)return '先选对象';if(!a.comp)return '选一个组件';if(!a.ch)return '选一个改变方向';if(a.vIdx===null||a.vIdx===undefined)return '挑一个变体';if((a.scene||'').length<8)return '写清新场景';return '';},
gate(S){const a=S.answers;return !!(a.obj&&a.comp&&a.ch&&a.vIdx!==null&&a.vIdx!==undefined&&(a.scene||'').length>=8);}},

/* ---------- 5 提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 产出',
html:`
<div class="step-h"><h1>交一张<em>乘法卡</em></h1></div>
<div class="grid2" style="align-items:start">
  <div id="cardSlot"></div>
  <div class="panel"><div class="panel-h"><h4>补一句</h4><span>会被同事看到</span></div>
    <div class="field"><label>复制件和原件最大的不同是什么</label><textarea id="diff" maxlength="50" placeholder="例如：一个看信息，一个看时间"></textarea></div>
    <div class="row" style="margin-top:10px"><button class="btn primary" id="subBtn">提交</button><button class="btn" id="export2">导出 PNG</button></div>
    <div class="hint" id="subSt" style="margin-top:8px">未提交</div></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const slot=sec.querySelector('#cardSlot'),diff=sec.querySelector('#diff'),btn=sec.querySelector('#subBtn'),st=sec.querySelector('#subSt');
  function paint(){
    diff.value=a.diff||'';
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A13</span><span>乘法卡</span></div>'+
      '<h5>'+api.esc(a.formText||'我的变体')+'</h5><div class="kv">'+
      [['对象',(OBJECTS.find(o=>o.k===a.obj)||{}).n],['复制',a.comp],['改变',(CHANGES.find(c=>c.k===a.ch)||{}).n],['新场景',a.scene],['最大不同',a.diff]]
      .map(r=>'<div><b>'+r[0]+'</b><span class="'+(r[1]?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+'</div></div>';
    st.textContent=S.submitted?'已提交':'未提交';
    btn.disabled=!!S.submitted;btn.textContent=S.submitted?'已提交':'提交';
  }
  diff.addEventListener('input',()=>{a.diff=diff.value;api.save();paint();api.refresh();});
  btn.onclick=async()=>{await api.submit();paint();};
  sec.querySelector('#export2').onclick=()=>api.exportCard();
  paint();
},
hint(S){return (S.answers.diff||'').length>=4?'':'写一句"最大的不同"';},
gate(S){return (S.answers.diff||'').length>=4;}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>乘法只多问一句：<em>复制件哪里不一样</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 复制</div><p class="small" style="margin-top:5px">找一个已经存在的组件，不是新加一个。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 改变</div><p class="small" style="margin-top:5px">位置/大小/数量/材料/形态/对象，至少改一个。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 新场景</div><p class="small" style="margin-top:5px">说不出新场景，就还是加法。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A14</span></div>
<p class="small">A14 · 乘法：三个案例还原。YotaPhone、宝洁 Febreze 双香型、双面胶——看清"复制件到底改了什么"。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '你复制的是组件，还是"多买一个"？',
 '复制件和原件最大的不同，能用一句话说清吗？',
 '如果两个一模一样，为什么还要两个？',
 '新场景里的人，现在是怎么凑合的？',
 '这次改动会让谁更麻烦？'
]},

card(S){
  const a=S.answers||{};
  return {title:'A13 · 乘法卡',rows:[
    ['对象',(OBJECTS.find(o=>o.k===a.obj)||{}).n||'—'],
    ['复制',a.comp||'—'],['改变',(CHANGES.find(c=>c.k===a.ch)||{}).n||'—'],
    ['新场景',a.scene||'—'],['最大不同',a.diff||'—']
  ]};
},
notes:[
 {t:'本节目标',h:'让学员分清加法、改造、乘法，并能自己做出一个"复制 + 改变"的变体。'},
 {t:'时间分配',h:'先猜 5′ · 概念 8′ · 判断台 12′ · 复制台 15′ · 提交 5′。'},
 {t:'常见卡点',h:'学员把"加一个"当乘法。追问："你复制的是哪个已有组件？它哪里变了？"'},
 {t:'直播怎么接',h:'看判断台的错法：把"两个一样"判成乘法的最多，就现场改两个侧袋的例子。'},
 {t:'和 A14 的关系',h:'A14 用三个真实案例把"改了什么"讲透，本节先把动作做对。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A13']=L;
})();
