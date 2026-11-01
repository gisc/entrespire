/* =========================================================
   13–40 · SIT 进阶实验室（数据驱动）
   每章保留：主题场景 / SIT 工具 / 部件改造 / 设计 /
             条件测试 / 发布 / 徽章
   ========================================================= */
(function(){
'use strict';
const DATA=window.FXM_SERIES_DATA||[];
const TOOL_COLORS={'减法':'#F5C451','一专多能':'#4FE0D0','乘法':'#A78BFA','除法':'#60A5FA','属性关联':'#FB7185','盒内思考':'#F472B6'};
function coverHTML(d){
  const words=(d.words||['观察','拆解','测试','改进']).map((w,i)=>'<div class="portal-word pw'+(i+1)+'">'+w+'</div>').join('');
  return `<div class="cover-stars"></div>
<div class="cover-grid">
  <div class="cover-copy">
    <div class="kicker">CHAPTER ${d.no} · ${d.phase||'SIT 进阶'}</div>
    <h1>${d.coverTitle}<br><span class="line2">${d.coverLine}</span></h1>
    <p class="cover-lead">${d.lead||''}</p>
    <div class="cover-meta"><span class="gold">第 ${d.no} 章</span><span>${d.ability||'SIT 创新工具'}</span><span>7–13 岁</span><span>7 幕互动</span></div>
    <div class="cover-actions"><button class="btn primary" data-go="1">进入实验室</button><button class="btn ghost" data-notes>教师指引</button></div>
  </div>
  <div class="portal" aria-hidden="true">
    <svg class="rings" viewBox="0 0 520 520" fill="none"><circle cx="260" cy="260" r="250" stroke="rgba(${d.rgb},.12)" stroke-dasharray="2 9"/><g class="ring-a"><circle cx="260" cy="260" r="210" stroke="rgba(${d.rgb},.3)" stroke-dasharray="1 11"/><circle cx="260" cy="260" r="210" stroke="rgba(245,196,81,.22)" stroke-dasharray="90 1200"/></g><g class="ring-b"><circle cx="260" cy="260" r="164" stroke="rgba(${d.rgb},.2)" stroke-dasharray="1 13"/></g></svg>
    <div class="portal-core" style="background:radial-gradient(circle at 34% 28%,rgba(255,255,255,.7),rgba(${d.rgb},.5) 40%,rgba(${d.rgb},.06) 72%)"><div class="sr-badge-icon" style="font-size:120px">${d.icon}</div></div>
    ${words}
  </div>
</div>
<div class="cover-foot"><span>发小明 Genesis 创新学院 · 让每个孩子都拥有创造的能力</span><span class="kbd"><span><kbd>→</kbd>前进</span><span><kbd>T</kbd>教师指引</span><span><kbd>F</kbd>全屏</span></span></div>`;
}
function notesFor(d){
  const first=`<div class="note-block"><h4>本章目标</h4><p>${d.note||''}</p><h4>教师角色</h4><p>不要替孩子做选择。先让他观察、拆解、测试，再总结“哪个部分影响了结果”。</p><h4>课堂节奏</h4><p>本章 7 幕，可拆成 2–3 次课：场景与拆解一次，设计与测试一次，发布与反思一次。</p><div class="warn">测试用轻质、安全材料；工具由教师统一管理。</div></div>`;
  return [first].concat((d.actNotes||[]).map(t=>`<div class="note-block"><h4>本幕提示</h4><p>${t}</p></div>`));
}
function make(d){
  const S={};
  const acts=[];
  /* 01 场景 */
  acts.push({a:'01',name:'主题场景',html:`
<div class="ch-head"><div class="act"><b>01</b><span>主题场景</span></div><h2>${d.h2a||d.title}</h2><p>${d.p1||''}</p></div>
<div class="st-hud"><span class="hchip sit">SIT · ${d.tool}</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">场景 <b data-ctx-label>—</b></span></div>
<div class="sr-scene"><div class="sr-aura"></div><div class="sr-waves"><i></i><i></i><i></i><i></i><i></i></div><div class="sr-icon">${d.icon}</div><div class="sr-label">${d.objectLabel||d.title}</div></div>
<div class="sr-context-grid" data-contexts>${(d.contexts||[]).map(c=>'<button class="sr-context" data-ctx="'+c.id+'"><b>'+c.name+'</b>'+c.desc+'</button>').join('')}</div>
<div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>${d.coach1||'先选一个真实场景，再决定要改变什么。'}</div></div>
<div class="st-actions"><button class="btn primary" data-go="2" disabled data-next>进入 SIT 工具 →</button><span class="hint">先选一个场景</span></div>`,init(sec,api){
    const T=api.S;T.xp=T.xp||0;const n=sec.querySelector('[data-next]'),l=sec.querySelector('[data-ctx-label]'),xp=sec.querySelector('[data-xp]'),say=sec.querySelector('.st-coach .say');
    function render(){sec.querySelectorAll('[data-ctx]').forEach(b=>b.classList.toggle('on',b.dataset.ctx===T.context));if(T.context){const c=(d.contexts||[]).find(x=>x.id===T.context);l.textContent=c?c.name:'—';n.disabled=false;say.innerHTML='<b>发小明：</b>你选了 <em>'+(c?c.name:'')+'</em>。现在用 <b>'+d.tool+'</b> 找到可以改变的地方。';}xp.textContent=T.xp;}
    sec.querySelectorAll('[data-ctx]').forEach(b=>b.onclick=()=>{T.context=b.dataset.ctx;T.contextName=(d.contexts||[]).find(x=>x.id===T.context).name;T.tool='';T.part='';T.action='';T.test1='';T.test2='';T.fix='';api.save();render();api.sfx('pop');api.burst(innerWidth*.5,innerHeight*.45,16,['#'+d.acc.replace('#',''),'#F5C451','#4FE0D0']);});
    n.onclick=()=>api.go(2);render();
    api.aiPanel(sec,{prompts:d.ai1||['这个场景里，最不方便的是什么？','谁最受影响？','如果换一个场景，问题会变吗？']});
  }});
  /* 02 SIT tool */
  acts.push({a:'02',name:'SIT 工具',html:`
<div class="ch-head"><div class="act"><b>02</b><span>SIT 工具</span></div><h2>用 ${d.tool}，<em>改变一个地方</em></h2><p>${d.p2||''}</p></div>
<div class="st-hud"><span class="hchip sit">SIT · ${d.tool}</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">工具 <b data-tool-name>—</b></span></div>
<div class="sr-tool-grid" data-tools>${(d.tools||[]).map(t=>'<button class="sr-tool" data-tool="'+t.id+'"><b>'+t.name+'</b>'+t.desc+'</button>').join('')}</div>
<div class="st-feature" data-tool-out>选一个工具，看看它会怎么追问。</div>
<div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>${d.coach2||'工具不是答案，是帮你想出不同答案的追问方式。'}</div></div>
<div class="st-actions"><button class="btn primary" data-go="3" disabled data-next>去改造部件 →</button><span class="hint">先选一个工具</span></div>`,init(sec,api){
    const T=api.S;const out=sec.querySelector('[data-tool-out]'),n=sec.querySelector('[data-next]'),tn=sec.querySelector('[data-tool-name]'),xp=sec.querySelector('[data-xp]');
    function render(){sec.querySelectorAll('[data-tool]').forEach(b=>b.classList.toggle('on',b.dataset.tool===T.tool));if(T.tool){const t=(d.tools||[]).find(x=>x.id===T.tool);tn.textContent=t?t.name:'—';out.innerHTML='<b>'+(t?t.name:'')+'：</b>'+(t?t.prompt:'')+'<br><span style="color:var(--faint)">'+(t?t.feature:'')+'</span>';n.disabled=false;}xp.textContent=T.xp||0;}
    sec.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>{T.tool=b.dataset.tool;T.toolName=(d.tools||[]).find(x=>x.id===T.tool).name;T.xp=(T.xp||0)+10;api.save();render();api.sfx('success');api.burst(innerWidth*.55,innerHeight*.45,16,['#'+d.acc.replace('#',''),'#F5C451']);});
    n.onclick=()=>api.go(3);render();
    api.aiPanel(sec,{prompts:d.ai2||['这个工具在追问什么？','它会改变哪个部件？','如果换一个工具，会得到不同答案吗？']});
  }});
  /* 03 parts */
  acts.push({a:'03',name:'部件改造',html:`
<div class="ch-head"><div class="act"><b>03</b><span>部件改造</span></div><h2>拆开它，<em>只改一个部件</em></h2><p>${d.p3||'选一个部件，再选一个动作。一次只改一个地方，才能看清变化。'}</p></div>
<div class="st-hud"><span class="hchip sit">SIT · ${d.tool}</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">部件 <b data-part-label>—</b></span></div>
<div class="st-split"><div class="st-scene"><div class="sr-aura"></div><div class="sr-icon">${d.icon}</div><div class="sr-label">${d.objectLabel||d.title}</div></div><div class="st-side">
<div class="sr-part-grid" data-parts>${(d.parts||[]).map(p=>'<button class="sr-part" data-part="'+p.id+'"><b>'+p.label+'</b><span>'+p.desc+'</span></button>').join('')}</div>
<div class="sr-action-row" data-actions>${(d.actions||['拿掉','复制','合并']).map((a,i)=>'<button class="sr-action" data-action="'+i+'">'+a+'</button>').join('')}</div>
<div class="st-feature" data-part-out>先选一个部件，再选一个动作。</div>
<div class="st-actions"><button class="btn primary" data-go="4" disabled data-next>去设计 →</button></div>
</div></div>`,init(sec,api){
    const T=api.S;const out=sec.querySelector('[data-part-out]'),n=sec.querySelector('[data-next]'),pl=sec.querySelector('[data-part-label]'),xp=sec.querySelector('[data-xp]');
    function render(){sec.querySelectorAll('[data-part]').forEach(b=>b.classList.toggle('on',b.dataset.part===T.part));sec.querySelectorAll('[data-action]').forEach(b=>b.classList.toggle('on',+b.dataset.action===T.action));if(T.part)pl.textContent=(d.parts||[]).find(p=>p.id===T.part).label;if(T.part&&T.action!==''&&T.action!=null){const p=(d.parts||[]).find(x=>x.id===T.part);const a=(d.actions||[])[T.action];out.innerHTML='<b>'+a+'：'+p.label+'</b><br>'+(d.actionEffects||[])[T.action]+'<br><span style="color:var(--faint)">一次只改一个部件，测试时才能判断原因。</span>';n.disabled=false;}xp.textContent=T.xp||0;}
    sec.querySelectorAll('[data-part]').forEach(b=>b.onclick=()=>{T.part=b.dataset.part;api.save();render();api.sfx('tap');});
    sec.querySelectorAll('[data-action]').forEach(b=>b.onclick=()=>{T.action=+b.dataset.action;api.save();render();api.sfx('tap');});
    n.onclick=()=>api.go(4);render();
    api.aiPanel(sec,{prompts:d.ai3||['为什么要改这个部件？','改完以后，哪个功能会变？','如果只改一个地方，你选哪里？']});
  }});
  /* 04 design */
  acts.push({a:'04',name:'设计工作台',html:`
<div class="ch-head"><div class="act"><b>04</b><span>设计工作台</span></div><h2>把改造，<em>变成一张设计图</em></h2><p>选 3 个真正需要的模块，写清楚它叫什么、为谁、怎样工作。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · ${d.tool}</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">模块 <b data-mcount>0</b>/4</span></div>
<div class="st-blueprint"><div class="st-blueprint-canvas"><div class="bp-label">DESIGN BOARD · 拖模块到四个槽位</div><div class="sr-bp-icon">${d.icon}</div><div class="st-slot" data-slot="0"><span>＋</span>模块 1</div><div class="st-slot" data-slot="1"><span>＋</span>模块 2</div><div class="st-slot" data-slot="2"><span>＋</span>模块 3</div><div class="st-slot" data-slot="3"><span>＋</span>模块 4</div></div>
<aside class="st-spec"><h4>设计规格</h4>
<div class="field"><label>作品名称</label><input data-f="name" maxlength="24" placeholder="给作品起个名字"></div>
<div class="field"><label>给谁用</label><input data-f="user" maxlength="30" placeholder="具体的人"></div>
<div class="field" style="grid-column:1/-1"><label>解决什么问题</label><textarea data-f="problem" maxlength="80" placeholder="最需要解决的那件事"></textarea></div>
<div class="field" style="grid-column:1/-1"><label>怎样工作</label><textarea data-f="how" maxlength="80" placeholder="哪个部件做了什么改变？"></textarea></div>
<div class="st-mini-draw"><div class="draw-head"><span>手绘 · 可选</span><span data-draw-state>未开始</span></div><canvas data-draw width="600" height="300"></canvas></div>
<div class="st-module-tray" data-modules></div>
<div style="display:flex;gap:7px;flex-wrap:wrap;margin-top:4px"><button class="btn primary sm" data-gen>生成设计图 →</button><button class="btn ghost sm" data-go="5" data-next>去测试 →</button></div>
</aside></div>`,init(sec,api){
    const T=api.S;T.design=T.design||{};T.modules=T.modules||[];const slots=sec.querySelectorAll('[data-slot]'),tray=sec.querySelector('[data-modules]');let active='';
    const draw=api.initDrawing(sec,url=>{T.drawing=url;api.save();sec.querySelector('[data-draw-state]').textContent='已保存';});if(T.drawing&&draw)draw.load(T.drawing);
    sec.querySelectorAll('[data-f]').forEach(el=>{const k=el.dataset.f;el.value=T.design[k]||'';el.addEventListener('input',()=>{T.design[k]=el.value;api.save();});});
    function render(){slots.forEach((sl,i)=>{const m=T.modules[i]?(d.modules||[]).find(x=>x.id===T.modules[i]):null;sl.classList.toggle('on',!!m);sl.innerHTML=m?('<span>'+m.icon+'</span>'+m.label):'<span>＋</span>模块 '+(i+1);});tray.innerHTML=(d.modules||[]).map(m=>'<button class="st-module'+(active===m.id?' on':'')+'" draggable="true" data-mod="'+m.id+'">'+m.icon+' '+m.label+'</button>').join('');tray.querySelectorAll('[data-mod]').forEach(b=>{b.onclick=()=>{active=b.dataset.mod;render();};b.addEventListener('dragstart',e=>{try{e.dataTransfer.setData('text/plain',b.dataset.mod);}catch(err){}});});sec.querySelector('[data-mcount]').textContent=T.modules.length;sec.querySelector('[data-xp]').textContent=T.xp||0;}
    slots.forEach((sl,i)=>{sl.onclick=()=>{if(!active)api.toast('先选一个模块','＋');else{T.modules[i]=active;active='';api.save();render();api.sfx('pop');}};sl.addEventListener('dragover',e=>{e.preventDefault();sl.classList.add('over');});sl.addEventListener('dragleave',()=>sl.classList.remove('over'));sl.addEventListener('drop',e=>{e.preventDefault();sl.classList.remove('over');const id=e.dataTransfer.getData('text/plain');if(id){T.modules[i]=id;api.save();render();api.sfx('pop');}});});render();
    sec.querySelector('[data-gen]').onclick=()=>{const x=T.design;if(!x.name||!x.problem){api.toast('至少写下名称和问题','✏️');return;}api.previewSheet({title:d.certTitle||d.title+'设计图',subtitle:'第 '+d.no+' 章 · '+d.title,code:d.code||('FXM-CUR-Q2-'+d.no),badge:d.badge,name:T.name||'小小创新家',date:new Date().toLocaleDateString('zh-CN'),filename:d.title+'_'+(T.name||'小小创新家'),stamp:'SIT '+d.tool,lab:{chapter:d.no,chapterTitle:d.title,name:T.name||'小小创新家',product:x.name,problem:x.problem,how:x.how,improve:x.user},fields:[{label:'作品名称',value:x.name},{label:'给谁用',value:x.user},{label:'解决什么问题',value:x.problem},{label:'怎样工作',value:x.how},{label:'模块',value:T.modules.map(id=>((d.modules||[]).find(m=>m.id===id)||{}).label||'').join(' + ')}],drawing:T.drawing,drawLabel:'我的设计图',footer:'场景 → '+d.tool+' → 设计 → 测试'});};
    api.aiPanel(sec,{prompts:d.ai4||['这个模块真的对应问题吗？','如果只能保留两个模块，你保留哪两个？','它会不会让使用更复杂？','你准备怎么测试它？']});
  }});
  /* 05 test */
  const tm=d.test||{};
  acts.push({a:'05',name:'条件测试',html:`
<div class="ch-head"><div class="act"><b>05</b><span>条件测试</span></div><h2>换一个条件，<em>再看它一次</em></h2><p>${tm.desc||'先选一个真实条件，运行测试；发现问题后，只改一个地方，再测一次。'}</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 属性关联</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">测试 <b data-testn>0</b>/2</span></div>
<div class="st-split"><div class="sr-test-scene" data-testscene><div class="sr-condition-overlay" data-overlay></div><div class="sr-test-icon">${d.icon}</div></div>
<div class="st-side"><div class="sr-context-grid" data-conditions style="margin-top:0">${(tm.conditions||[]).map(c=>'<button class="sr-context" data-cond="'+c.id+'"><b>'+c.label+'</b>'+c.desc+'</button>').join('')}</div>
<div class="st-actions"><button class="btn primary sm" data-run>运行测试 →</button></div>
<div class="sr-test-readout" data-readout>${tm.idle||'先选一个条件，再运行测试。'}</div>
<div class="sr-meters"><div class="sr-meter"><span>${tm.m1||'功能'}</span><div class="bar"><i data-m1></i></div></div><div class="sr-meter"><span>${tm.m2||'稳定'}</span><div class="bar"><i data-m2></i></div></div><div class="sr-meter"><span>${tm.m3||'体验'}</span><div class="bar"><i data-m3></i></div></div></div>
<div class="sr-fix-grid" data-fixes>${(tm.fixes||[]).map(f=>'<button class="sr-fix" data-fix="'+f.id+'">'+f.label+'</button>').join('')}</div>
<div class="st-actions"><button class="btn primary sm" data-retest disabled>改进后再测 →</button><button class="btn ghost sm" data-go="6" data-next disabled>去发布 →</button></div>
</div></div>`,init(sec,api){
    const T=api.S;T.test1=T.test1||'';T.test2=T.test2||'';const scene=sec.querySelector('[data-testscene]'),ov=sec.querySelector('[data-overlay]'),read=sec.querySelector('[data-readout]'),run=sec.querySelector('[data-run]'),retest=sec.querySelector('[data-retest]'),next=sec.querySelector('[data-next]'),tn=sec.querySelector('[data-testn]'),xp=sec.querySelector('[data-xp]');
    function metrics(a){['1','2','3'].forEach((n,i)=>{const el=sec.querySelector('[data-m'+n+']');if(el)el.style.width=(a[i]||0)+'%';});}
    function render(){sec.querySelectorAll('[data-cond]').forEach(b=>b.classList.toggle('on',b.dataset.cond===T.condition));sec.querySelectorAll('[data-fix]').forEach(b=>b.classList.toggle('on',b.dataset.fix===T.fix));ov.classList.toggle('on',!!T.condition&&!T.test2);tn.textContent=(T.test1?1:0)+(T.test2?1:0);next.disabled=!T.test2;retest.disabled=!T.test1||!T.fix;xp.textContent=T.xp||0;if(T.test2){read.innerHTML='<b style="color:var(--teal)">改进后测试</b><br>'+T.test2;metrics(tm.fixMetrics||[86,82,88]);}else if(T.test1){read.innerHTML='<b style="color:#FFB3A8">第一次测试</b><br>'+T.test1;metrics(tm.failMetrics||[48,52,45]);}else{read.textContent=tm.idle||'先选一个条件，再运行测试。';}}
    sec.querySelectorAll('[data-cond]').forEach(b=>b.onclick=()=>{T.condition=b.dataset.cond;T.test1='';T.test2='';T.fix='';api.save();render();api.sfx('tap');});
    run.onclick=()=>{if(!T.condition){api.toast('先选一个条件','⚡');return;}run.disabled=true;scene.classList.remove('fail','fix');scene.classList.add('fail');setTimeout(()=>{T.test1=tm.result||'在真实条件下，作品出现了问题。';T.xp=(T.xp||0)+10;api.save();read.innerHTML='<b style="color:#FFB3A8">第一次测试</b><br>'+T.test1;metrics(tm.failMetrics||[48,52,45]);scene.classList.remove('fail');render();run.disabled=false;api.sfx('error');},1200);};
    sec.querySelectorAll('[data-fix]').forEach(b=>b.onclick=()=>{T.fix=b.dataset.fix;T.fixLabel=(tm.fixes||[]).find(x=>x.id===T.fix).label;api.save();render();api.sfx('tap');});
    retest.onclick=()=>{if(!T.fix){api.toast('先选一个改进','🔧');return;}scene.classList.remove('fail');scene.classList.add('fix');setTimeout(()=>{T.test2=tm.fixResult||'改进后，作品在同样条件下通过了测试。';T.xp=(T.xp||0)+15;api.save();scene.classList.remove('fix');render();api.sfx('success');api.burst(innerWidth*.5,innerHeight*.5,22,['#'+d.acc.replace('#',''),'#4FE0D0','#F5C451']);},1200);};
    next.onclick=()=>api.go(6);render();
    api.aiPanel(sec,{prompts:d.ai5||['第一次测试哪个指标最低？','你改的是哪个部分？','第二次测试变好了吗？','这个结果能说明什么？']});
  }});
  /* 06 pitch */
  acts.push({a:'06',name:'成果发布',html:`
<div class="ch-head"><div class="act"><b>06</b><span>成果发布</span></div><h2>用一分钟，<em>讲清楚你的改变</em></h2><p>场景、SIT 工具、部件改造、第一次测试、改进、第二次结果。</p></div>
<div class="stage-wrap"><div class="curtain l"></div><div class="curtain r"></div><div class="spot"></div><div class="stage-floor"></div><div class="stage-content"><div class="stage-top"><span>${d.title} · SIT 发布</span><span class="who" data-name>小小创新家</span></div><div class="speech"><p class="lead">大家好，我是 <b data-name2>小小创新家</b>。</p><p>我关注的问题是：<b data-problem>……</b></p><p>我用了 <b data-tool>${d.tool}</b>，改造了：<b data-part>……</b></p><p>我的作品叫：<b data-product>……</b></p><p>第一次测试：<b data-test1>……</b></p><p>我的改进是：<b data-fix>……</b>；第二次：<b data-test2>……</b></p></div><div class="stage-controls"><div class="timer" data-timer><div class="mini-timer"><b data-timer-num>60</b><span>秒</span></div><div class="timer-btns"><button class="main" data-timer-start>开始 60 秒</button><button data-timer-reset>重置</button></div></div><div class="applause"><button class="applause-btn" data-clap>👏</button><div class="applause-meter"><div class="am-top"><span>掌声能量</span><b><span data-clap-count>0</span></b></div><div class="ambar"><i data-clap-bar></i></div></div></div><button class="btn ghost sm" data-go="7">领取徽章 →</button></div></div></div>
<div class="st-audience"><span>🧒</span><span>👧</span><span>🧑</span><span>👦</span><span>👩</span></div>`,init(sec,api){
    const T=api.S;const name=T.name||'小小创新家';const set=(s,v)=>{const el=sec.querySelector(s);if(el)el.textContent=v||'……';};set('[data-name]',name);set('[data-name2]',name);set('[data-problem]',T.design&&T.design.problem);set('[data-part]',(d.parts||[]).find(p=>p.id===T.part)?.label||'一个部件');set('[data-product]',T.design&&T.design.name);set('[data-test1]',T.test1);set('[data-fix]',T.fixLabel);set('[data-test2]',T.test2);
    api.timer(sec,{seconds:60,onEnd:()=>api.toast('时间到，谢谢大家的聆听','⏰')});let energy=0,count=0;const aud=sec.querySelector('.st-audience');sec.querySelector('[data-clap]').onclick=()=>{energy=Math.min(100,energy+7);count++;sec.querySelector('[data-clap-count]').textContent=count;sec.querySelector('[data-clap-bar]').style.width=energy+'%';aud.classList.remove('clap');void aud.offsetWidth;aud.classList.add('clap');api.sfx('pop');};
  }});
  /* 07 badge */
  acts.push({a:'07',name:'徽章',html:`
<div class="finale"><div class="badge-stage"><div class="badge-rays"></div><div class="badge"><div class="badge-inner"><span class="b-kicker">FXM · GENESIS</span><div class="sr-badge-icon">${d.icon}</div><b>${d.badge}</b><span class="bn" data-badge-name>小小创新家</span><span class="b-date">第 ${d.no} 章 · ${d.phase||''}</span></div></div></div>
<h2>${d.h2b||'你完成了一次真正的 SIT 改造'}</h2><p class="sub">${d.badgeP||''}</p>
<div class="journey">${(d.journey||[]).map(j=>'<div class="jstep"><span class="ji">'+j[0]+'</span><b>'+j[1]+'</b><span>'+j[2]+'</span></div>').join('')}</div>
<div class="reflect">${(d.reflect||[]).map((r,i)=>'<div><b>想一想 0'+(i+1)+'</b><p>'+r+'</p></div>').join('')}</div>
<div class="homework"><span class="hi">🏠</span><div><b>家庭任务</b><p>${d.homework||'把今天的改造讲给家人听，记录他的一条反馈。'}</p></div></div>
<div class="final-actions"><button class="btn primary" data-cert>下载设计卡</button><button class="btn" data-go="6">回到发布</button><a class="btn ghost" href="course-index.html">回到课程目录</a></div><div class="final-quote">${d.quote||'“改变一个地方，观察另一个地方怎么变。”'}</div></div>`,init(sec,api){
    const T=api.S;const name=T.name||'小小创新家';sec.querySelector('[data-badge-name]').textContent=name;
    sec.querySelector('[data-cert]').onclick=()=>{const x=T.design||{};api.previewSheet({title:d.certTitle||d.title+'设计卡',subtitle:'第 '+d.no+' 章 · '+d.title,code:d.code||('FXM-CUR-Q2-'+d.no),badge:d.badge,name,date:new Date().toLocaleDateString('zh-CN'),filename:d.title+'_'+name,stamp:'SIT '+d.tool,lab:{chapter:d.no,chapterTitle:d.title,name,product:x.name,problem:x.problem,how:x.how,improve:T.fixLabel},fields:[{label:'作品名称',value:x.name},{label:'给谁用',value:x.user},{label:'问题',value:x.problem},{label:'怎样工作',value:x.how},{label:'第一次测试',value:T.test1},{label:'改进',value:T.fixLabel},{label:'第二次测试',value:T.test2}],drawing:T.drawing,drawLabel:'我的设计图',footer:'场景 → '+d.tool+' → 测试 → 改进'});api.sfx('success');api.confetti(80);};
    setTimeout(()=>{api.confetti(70);api.sfx('chime');},400);
  }});
  return {no:d.no,title:d.title,short:d.short||d.title,badge:d.badge,phase:d.phase,acc:d.acc,acc2:d.acc2||'#fff',rgb:d.rgb||'79,224,208',cover:coverHTML(d),acts,notes:notesFor(d)};
}
DATA.forEach(d=>{window.FXM_CHAPTERS[d.no]=make(d);});
})();
