/* =========================================================
   世界创新港 · 第 05–12 章数据
   与 chapter-data.js 共用同一套章节引擎与视觉组件
   ========================================================= */
window.FXM_CHAPTERS=window.FXM_CHAPTERS||{};



/* ---------- 通用：教师指引 ---------- */
function c2notes(c){
  const arr=[{html:`<div class="note-block"><h4>本章目标</h4><p>${c.chapterNote||c.p||''}</p><h4>教师角色</h4><p>${c.teacherRole||'不急着给答案。先让孩子自己试，再用提问帮他把想法说清楚。'}</p><h4>课堂节奏</h4><p>${c.pace||'本章 '+(c.acts.length)+' 幕，可拆成多次课；时间由老师按班级节奏把握。'}</p>${c.warn?'<div class="warn">'+c.warn+'</div>':''}</div>`}];
  (c.acts||[]).forEach((a,i)=>{
    const n=(c.actNotes||[])[i]||{};
    arr.push({html:`<div class="note-block"><h4>本幕目标</h4><p>${n.goal||('完成“'+a.name+'”这一幕的核心任务。')}</p>${n.qs?'<h4>关键提问</h4><ul>'+n.qs.map(q=>'<li>'+q+'</li>').join('')+'</ul>':''}${n.tip?'<h4>操作提示</h4><p>'+n.tip+'</p>':''}${n.warn?'<div class="warn">'+n.warn+'</div>':''}</div>`});
  });
  return arr;
}

/* ---------- 通用封面 ---------- */
function c2cover(c){
  const no=c.no, n=c.acts.length;
  return `
<div class="cover-stars"></div>
<div class="cover-grid">
  <div class="cover-copy">
    <div class="kicker">CHAPTER ${no} · ${c.phase||'创新实践'}</div>
    <h1>${c.coverTitle||c.title}<br><span class="line2">${c.coverLine||''}</span></h1>
    <p class="cover-lead">${c.lead||''}</p>
    <div class="cover-meta"><span class="gold">第 ${no} 章</span><span>${c.ability||''}</span><span>7–13 岁</span><span>${n} 幕互动</span></div>
    <div class="cover-actions">
      <button class="btn primary" data-go="1"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>${c.cta||'开始这一章'}</button>
      <button class="btn ghost" data-notes><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h5"/></svg>教师指引</button>
    </div>
  </div>
  <div class="portal" aria-hidden="true">
    <svg class="rings" viewBox="0 0 520 520" fill="none">
      <circle cx="260" cy="260" r="250" stroke="rgba(${c.rgb},.12)" stroke-dasharray="2 9"/>
      <g class="ring-a"><circle cx="260" cy="260" r="210" stroke="rgba(${c.rgb},.3)" stroke-dasharray="1 11"/><circle cx="260" cy="260" r="210" stroke="rgba(245,196,81,.22)" stroke-dasharray="90 1200"/></g>
      <g class="ring-b"><circle cx="260" cy="260" r="164" stroke="rgba(${c.rgb},.2)" stroke-dasharray="1 13"/><circle cx="260" cy="260" r="164" stroke="rgba(167,139,250,.2)" stroke-dasharray="52 980"/></g>
    </svg>
    <div class="portal-core" style="background:radial-gradient(circle at 34% 28%,${c.acc2 || '#FFE3A6'},rgba(${c.rgb},.55) 42%,rgba(${c.rgb},.06) 72%)"><span style="font-size:clamp(50px,7vw,92px);line-height:1">${c.icon||'✦'}</span></div>
    <div class="portal-word pw1">${(c.words||['观察','想象','设计','表达'])[0]}</div><div class="portal-word pw2">${(c.words||['观察','想象','设计','表达'])[1]}</div><div class="portal-word pw3">${(c.words||['观察','想象','设计','表达'])[2]}</div><div class="portal-word pw4">${(c.words||['观察','想象','设计','表达'])[3]}</div>
  </div>
</div>
<div class="cover-foot"><span>发小明 Genesis 创新学院 · 让每个孩子都拥有创造的能力</span><span class="kbd"><span><kbd>→</kbd>前进</span><span><kbd>T</kbd>教师指引</span><span><kbd>F</kbd>全屏</span></span></div>`;
}

/* ---------- 通用：任务开场 ---------- */
function c2intro(c){
  return {
    a:c.a||'01', name:c.name, time:'',
    html:`<div class="ch-head"><div class="act"><b>${c.a||'01'}</b><span>${c.name}</span></div><h2>${c.h2}</h2><p>${c.p}</p></div>
<div class="case-grid">
  <div class="case-file"><div class="case-stamp">${c.stamp||('CHAPTER<br>'+c.no)}</div><div class="case-kicker">${c.kicker||'发小明创新任务'}</div><h3>${c.h3}</h3><p>${c.caseP||''}</p>
    <div class="case-rules">${(c.rules||[]).map((r,i)=>'<div><b>0'+(i+1)+'</b><span>'+r+'</span></div>').join('')}</div>
    <div class="case-next"><button class="btn primary" data-go="2">${c.nextLabel||'开始任务 →'}</button><span>${c.nextNote||''}</span></div>
  </div>
  <aside class="case-side">${(c.stats||[]).map(s=>'<div class="case-stat"><b>'+s[0]+'</b><span>'+s[1]+'</span></div>').join('')}<div class="case-quote">${c.quote||''}</div></aside>
</div>
<div class="ch-foot-note">${c.foot||''}</div>`,
    init(sec,api){ api.aiPanel(sec,{prompts:c.ai||['你准备先做什么？','这个任务最难的地方是什么？','你需要哪些材料？','你准备怎么证明它有效？']}); }
  };
}

/* ---------- 通用：选一个方向 ---------- */
function c2pick(c){
  return {
    a:c.a, name:c.name, time:'',
    html:`<div class="ch-head"><div class="act"><b>${c.a}</b><span>${c.name}</span></div><h2>${c.h2}</h2><p>${c.p}</p></div>
<div class="project-grid${c.cards.length===3?' pick-3':''}" data-pick-grid>${c.cards.map(card=>`<div class="project-card" data-key="${card.k}"><div class="project-icon">${card.icon||'✦'}</div><b>${card.t}</b><p>${card.d}</p><div class="project-meta"><span>${card.m1||''}</span><span>${card.m2||''}</span></div><button class="pick-project">选它</button></div>`).join('')}</div>
<div class="case-file" style="margin-top:12px;padding:14px 18px"><div class="case-kicker">我的选择</div><div style="font-size:12px;line-height:1.8;color:var(--dim)" data-pick-note>${c.note||'先选一个方向。'}</div><div class="case-next"><button class="btn primary" data-go="${c.next||3}" disabled data-next>${c.nextLabel||'下一步 →'}</button><span>${c.nextNote||'先选一个，再继续'}</span></div></div>
<div class="ch-foot-note">${c.foot||''}</div>`,
    init(sec,api){
      const S=api.S; S[c.key]=S[c.key]||''; const note=sec.querySelector('[data-pick-note]'),next=sec.querySelector('[data-next]');
      const map={}; c.cards.forEach(x=>map[x.k]=x);
      function render(){ sec.querySelectorAll('.project-card').forEach(el=>el.classList.toggle('selected',el.dataset.key===S[c.key])); if(S[c.key]&&map[S[c.key]]){const msg=c.picked?c.picked.replace(/%T%/g,map[S[c.key]].t):('你选择了：<b style="color:var(--teal)">'+map[S[c.key]].t+'</b>。');note.innerHTML=msg;next.disabled=false;} }
      sec.querySelectorAll('.project-card').forEach(el=>{ el.onclick=()=>{S[c.key]=el.dataset.key;api.save();render();api.sfx('tap');}; const b=el.querySelector('.pick-project'); if(b)b.onclick=e=>{e.stopPropagation();el.click();}; });
      render();
      api.aiPanel(sec,{prompts:c.ai||['你为什么选它？','它真的能解决原来的问题吗？','如果材料不够，可以怎么简化？','你准备怎么测试它？']});
    }
  };
}

/* ---------- 通用：设计/记录 ---------- */
function c2form(c){
  const fields=c.fields||[
    {k:'name',label:'作品名称',tag:'NAME IT',ph:'给它起一个名字'},
    {k:'problem',label:'要解决的问题',tag:'PROBLEM',ph:'谁遇到了什么不方便？'},
    {k:'user',label:'给谁用',tag:'USER',ph:'自己、同学、家人、老人…'},
    {k:'how',label:'它怎样工作',tag:'HOW',ph:'怎么解决原来的问题？'},
    {k:'material',label:'材料 / 做法',tag:'MATERIAL',ph:'纸板、吸管、胶带…'},
    {k:'improve',label:'下一步想改进',tag:'NEXT',ph:'如果再做一版，改哪里？'}
  ];
  return {
    a:c.a, name:c.name, time:'',
    html:`<div class="ch-head"><div class="act"><b>${c.a}</b><span>${c.name}</span></div><h2>${c.h2}</h2><p>${c.p}</p></div>
<div class="report-layout">
  <form class="report-form form-two" onsubmit="return false">
    <div class="field"><label>00 我的名字 <b>NAME</b></label><input data-name maxlength="12" placeholder="写下你的名字或昵称"></div>
    ${fields.map(f=>`<div class="field"><label>${f.no||''} ${f.label} <b>${f.tag||''}</b></label><textarea data-f="${f.k}" maxlength="${f.max||90}" placeholder="${f.ph||''}"></textarea></div>`).join('')}
  </form>
  <div class="draw-panel">
    <div class="draw-head"><span>${c.drawLabel||'画出你的设计 · DESIGN'}</span><div class="draw-tools" data-draw-tools>
      <button type="button" data-color="${c.acc||'#F5C451'}" class="on" style="background:${c.acc||'#F5C451'}"></button><button type="button" data-color="#FFFFFF" style="background:#FFF"></button><button type="button" data-color="#F5C451" style="background:#F5C451"></button><button type="button" data-color="#FF7A6B" style="background:#FF7A6B"></button><button type="button" data-color="#A78BFA" style="background:#A78BFA"></button>
      <button type="button" data-size="3">·</button><button type="button" data-size="7" class="on">●</button><button type="button" data-size="15">⬤</button><button type="button" data-eraser>◻</button><button type="button" data-undo>↺</button><button type="button" data-clear>✕</button>
    </div></div>
    <div class="canvas-wrap"><canvas data-draw width="1000" height="620"></canvas><div class="canvas-hint">${c.canvasHint||'画出大致形状和主要部件<br>标注材料和使用方式'}</div></div>
    <div class="draw-foot"><span>支持鼠标 / 手指 / 触控笔</span><span data-draw-state>未开始</span></div>
  </div>
</div>
<div class="proposal-cta"><div class="prop-progress"><div class="pt"><span>${c.progressLabel||'完成度'}</span><b data-pct>0%</b></div><div class="pbar"><i data-bar></i></div></div><button class="btn primary" data-gen>${c.genLabel||'生成我的成果卡 →'}</button><button class="btn ghost" data-go="${c.next||4}">${c.nextLabel||'下一步 →'}</button></div>`,
    init(sec,api){
      const S=api.S; S.design=S.design||{};
      const nameEl=sec.querySelector('[data-name]'); if(nameEl){nameEl.value=S.name||'';nameEl.addEventListener('input',()=>{S.name=nameEl.value;api.save();paint();});}
      const draw=api.initDrawing(sec,url=>{S.drawing=url;api.save();paint();sec.querySelector('[data-draw-state]').textContent='已保存';});
      if(S.drawing&&draw)draw.load(S.drawing);
      sec.querySelectorAll('[data-f]').forEach(el=>{const k=el.dataset.f;el.value=S.design[k]||'';el.addEventListener('input',()=>{S.design[k]=el.value;api.save();paint();});});
      function paint(){let n=0;fields.forEach(f=>{if((S.design[f.k]||'').trim())n++;});if(S.drawing)n++;const p=Math.round(n/(fields.length+1)*100);const pe=sec.querySelector('[data-pct]'),b=sec.querySelector('[data-bar]');if(pe)pe.textContent=p+'%';if(b)b.style.width=p+'%';}
      paint();
      sec.querySelector('[data-gen]').onclick=()=>{
        const d=S.design; if(!d[fields[0].k]){api.toast('至少写下第一项内容','✏️');return;}
        api.previewSheet({title:c.sheetTitle||c.title,subtitle:'第 '+c.no+' 章 · '+c.title,code:c.code||('FXM-CUR-Q1-'+c.no),badge:c.badge,name:S.name||c.badge,date:new Date().toLocaleDateString('zh-CN'),filename:(c.sheetTitle||c.title)+'_'+(S.name||c.badge),stamp:c.badge,lab:{chapter:c.no,chapterTitle:c.title,name:S.name||c.badge,product:d[fields[0].k],problem:d.problem||d.user,how:d.how||d.function,improve:d.improve},fields:fields.map(f=>({label:f.label,value:d[f.k]})),drawing:S.drawing,drawLabel:c.drawLabel||'我的设计图',footer:c.footer||'观察 → 设计 → 制作 → 测试 → 改进'});
      };
      api.aiPanel(sec,{prompts:c.ai||['你的设计真的解决了原来的问题吗？','如果只能保留一个功能，你保留哪个？','它最可能从哪里坏掉？','你准备怎么测试它？']});
    }
  };
}

/* ---------- 通用：方案比较 ---------- */
function c2compare(c){
  return {
    a:c.a, name:c.name, time:'',
    html:`<div class="ch-head"><div class="act"><b>${c.a}</b><span>${c.name}</span></div><h2>${c.h2}</h2><p>${c.p}</p></div>
<div class="compare-grid" data-compare>${c.options.map((o,i)=>`<div class="compare-card" data-opt="${i}"><h4>${o.t}</h4><p style="font-size:10.5px;color:var(--dim);line-height:1.6;margin:4px 0 8px">${o.d}</p><div data-crits></div><div class="compare-total"><span>总分</span><b data-total>0</b></div><button class="pick-compare" data-pick>选它</button></div>`).join('')}</div>
<div class="matrix-foot"><span>${c.critNote||'五个维度：解决问题 · 能做出来 · 材料容易 · 安全 · 可测试'}</span><button class="btn primary" data-next disabled>${c.nextLabel||'带着它继续 →'}</button></div>
<div class="ai-row"><button class="btn sm" data-ai>🤖 AI 追问我</button><div class="ai-out" data-ai-out></div></div>
<div class="ch-foot-note">${c.foot||'没有绝对最好的方案，只有更适合具体问题和条件的方案。'}</div>`,
    init(sec,api){
      const S=api.S; S.compare=S.compare||{}; S[c.key]=S[c.key]||'';
      const CRITS=c.crits||[['solve','解决问题'],['build','能做出来'],['material','材料容易'],['safe','安全'],['test','可测试']];
      const cards=sec.querySelectorAll('.compare-card');
      cards.forEach((card,i)=>{ const box=card.querySelector('[data-crits]'); box.innerHTML=CRITS.map(([k,n])=>'<div class="crit-row"><span>'+n+'</span><div class="crit-stars" data-k="'+k+'">'+[1,2,3].map(v=>'<button type="button" data-v="'+v+'">★</button>').join('')+'</div></div>').join(''); box.querySelectorAll('.crit-stars').forEach(st=>{st.querySelectorAll('button').forEach(b=>b.onclick=e=>{e.stopPropagation();S.compare[i]=S.compare[i]||{};S.compare[i][st.dataset.k]=+b.dataset.v;api.save();paint(i);api.sfx('tap');});}); card.querySelector('[data-pick]').onclick=e=>{e.stopPropagation();select(i);}; card.onclick=()=>select(i); paint(i); });
      function paint(i){const card=cards[i],m=S.compare[i]||{};let t=0;card.querySelectorAll('.crit-stars').forEach(st=>{const v=m[st.dataset.k]||0;t+=v;st.querySelectorAll('button').forEach(b=>b.classList.toggle('on',+b.dataset.v<=v));});card.querySelector('[data-total]').textContent=t;}
      function select(i){S[c.key]=c.options[i].t;S.choice=i;api.save();cards.forEach((x,k)=>x.classList.toggle('selected',k===i));sec.querySelector('[data-next]').disabled=false;api.sfx('success');}
      sec.querySelector('[data-next]').onclick=()=>{if(!S[c.key]){api.toast('先选一个方案','✓');return;}api.go(c.next||4);};
      api.aiPanel(sec,{prompts:c.ai||['这个方案真的解决了原来的问题吗？','它最容易做出来的部分是什么？','它有没有安全风险？','你怎么测试它有没有效？']});
    }
  };
}

/* ---------- 通用：测试记录 ---------- */
function c2test(c){
  return {
    a:c.a, name:c.name, time:'',
    html:`<div class="ch-head"><div class="act"><b>${c.a}</b><span>${c.name}</span></div><h2>${c.h2}</h2><p>${c.p}</p></div>
<div class="test-grid">${c.tests.map(t=>`<div class="test-card"><h4>${t.t}</h4><p>${t.d}</p><div class="test-result" data-result="${t.k}">${(t.opts||['成功','部分','失败']).map((o,i)=>'<button data-v="'+['success','partial','fail'][i]+'">'+o+'</button>').join('')}</div></div>`).join('')}</div>
<div class="report-layout" style="margin-top:10px"><div class="improve-box"><label>${c.foundLabel||'我发现了什么问题'}</label><textarea data-found maxlength="100" placeholder="${c.foundPh||'例如：放书的时候会往前倒。'}"></textarea></div><div class="improve-box"><label>${c.improveLabel||'我最想改进的一个地方'}</label><textarea data-improve maxlength="100" placeholder="${c.improvePh||'例如：把底座加宽。'}"></textarea></div></div>
<div class="stage-rules" style="margin-top:10px"><div class="rule"><span class="ri">🔁</span><div><b>${c.rule1||'先只改一个地方'}</b><p>${c.rule1p||'改完再测一次，看看变化是不是来自这个改动。'}</p></div></div><div class="rule"><span class="ri">🧾</span><div><b>留下记录</b><p>失败也是数据。把第一次和第二次的结果放在一起比较。</p></div></div></div>
<div class="proposal-cta"><div class="prop-progress"><div class="pt"><span>测试记录</span><b data-test-pct>0%</b></div><div class="pbar"><i data-test-bar></i></div></div><button class="btn primary" data-go="${c.next||5}">${c.nextLabel||'去发布 →'}</button></div>`,
    init(sec,api){
      const S=api.S; S.test=S.test||{}; S.found=S.found||''; S.improve=S.improve||'';
      const found=sec.querySelector('[data-found]'),improve=sec.querySelector('[data-improve]'); found.value=S.found; improve.value=S.improve;
      found.addEventListener('input',()=>{S.found=found.value;api.save();paint();}); improve.addEventListener('input',()=>{S.improve=improve.value;api.save();paint();});
      sec.querySelectorAll('.test-result').forEach(box=>{const k=box.dataset.result;box.querySelectorAll('button').forEach(b=>{if(S.test[k]===b.dataset.v)b.classList.add('on');b.onclick=()=>{S.test[k]=b.dataset.v;api.save();box.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));api.sfx('tap');paint();};});});
      function paint(){let n=0;c.tests.forEach(t=>{if(S.test[t.k])n++;});if(S.found.trim())n++;if(S.improve.trim())n++;const p=Math.round(n/(c.tests.length+2)*100);sec.querySelector('[data-test-pct]').textContent=p+'%';sec.querySelector('[data-test-bar]').style.width=p+'%';}
      paint();
      api.aiPanel(sec,{prompts:c.ai||['这次测试，哪一项最出乎你的意料？','如果只改一个地方，你改哪里？','改完怎么再测一次？','失败的那一次告诉了你什么？']});
    }
  };
}

/* ---------- 通用：发布会 ---------- */
function c2pitch(c){
  return {
    a:c.a, name:c.name, time:'',
    html:`<div class="ch-head"><div class="act"><b>${c.a}</b><span>${c.name}</span></div><h2>${c.h2}</h2><p>${c.p}</p></div>
<div class="stage-wrap"><div class="curtain l"></div><div class="curtain r"></div><div class="spot"></div><div class="stage-floor"></div>
  <div class="stage-content">
    <div class="stage-top"><span>${c.stageLabel||'创意发布会'}</span><span class="who" data-name>小小创新家</span></div>
    <div class="speech">${c.lines.map((l,i)=>`<p${i===0?' class="lead"':''}>${l.pre||''}<b data-line="${i}">……</b>${l.post||''}</p>`).join('')}</div>
    <div class="stage-controls"><div class="timer" data-timer><div class="mini-timer"><b data-timer-num>60</b><span>秒</span></div><div class="timer-btns"><button class="main" data-timer-start>开始 60 秒</button><button data-timer-reset>重置</button></div></div><div class="applause"><button class="applause-btn" data-clap>👏</button><div class="applause-meter"><div class="am-top"><span>掌声能量</span><b><span data-clap-count>0</span></b></div><div class="ambar"><i data-clap-bar></i></div></div></div><button class="btn ghost sm" data-go="${c.next||6}">${c.nextLabel||'领取徽章 →'}</button></div>
  </div>
</div>
<div class="stage-rules"><div class="rule"><span class="ri">👂</span><div><b>先理解，再建议</b><p>先说你听懂了什么，再提出你的问题。</p></div></div><div class="rule"><span class="ri">🤝</span><div><b>可以讨论，不嘲笑</b><p>可以问“它真的能解决问题吗”，但不能说“这太丑了”。</p></div></div></div>
<div class="ch-foot-note">${c.foot||'讲清楚“我做了什么、为什么这样做、测试结果怎样”，比作品是否漂亮更重要。'}</div>`,
    init(sec,api){
      const S=api.S; const name=S.name||c.badge; sec.querySelectorAll('[data-name]').forEach(e=>e.textContent=name);
      const val=(l)=>{ if(l.key==='name')return name; const d=S.design||{}; if(l.key==='problem')return d.problem||S.problem||'……'; if(l.key==='how')return d.how||S.how||'……'; if(l.key==='test')return S.found||'……'; if(l.key==='improve')return S.improve||d.improve||'……'; if(l.key==='need')return S.need||'……'; if(l.key==='value')return d.value||d.improve||S.value||'……'; if(l.key==='boundary')return S.boundary||'……'; if(l.key==='user')return d.user||S.userPickName||'……'; if(l.key==='product')return d.name||'……'; if(l.key==='limit')return d.limit||'……'; if(l.key==='shape')return d.shape||'……'; if(l.key==='base')return d.base||'……'; if(l.key==='fulcrum')return d.fulcrum||'……'; if(l.key==='effort')return d.effort||'……'; if(l.key==='load')return d.load||'……'; if(l.key==='body')return d.body||'……'; if(l.key==='axle')return d.axle||'……'; if(l.key==='issue')return S.issue||'……'; if(l.key==='change')return S.change||'……'; if(l.key==='round2')return S.round2||'……'; return d[l.key]||S[l.key]||'……'; };
      c.lines.forEach((l,i)=>{const el=sec.querySelector('[data-line="'+i+'"]');if(el)el.textContent=val(l);});
      api.timer(sec,{seconds:c.seconds||60,onEnd:()=>api.toast('时间到，谢谢大家的聆听','⏰')});
      let energy=0,count=0; sec.querySelector('[data-clap]').onclick=()=>{energy=Math.min(100,energy+7);count++;sec.querySelector('[data-clap-count]').textContent=count;sec.querySelector('[data-clap-bar]').style.width=energy+'%';api.sfx('pop');api.burst(innerWidth*.5,innerHeight*.55,10,[c.acc||'#F5C451','#FFE3A6','#4FE0D0']);};
    }
  };
}

/* ---------- 通用：徽章 ---------- */
function c2badge(c){
  return {
    a:c.a, name:c.name, time:'',
    html:`<div class="finale">
  <div class="badge-stage"><div class="badge-rays"></div><div class="badge"><div class="badge-inner"><span class="b-kicker">FXM · GENESIS</span><div class="b-star">★</div><b>${c.badge}</b><span class="bn" data-badge-name>${c.badge}</span></div></div></div>
  <h2>${c.h2}</h2><p class="sub">${c.p}</p>
  <div class="journey">${c.journey.map(j=>'<div class="jstep"><span class="ji">'+j[0]+'</span><b>'+j[1]+'</b><span>'+j[2]+'</span></div>').join('')}</div>
  <div class="reflect">${c.reflect.map((r,i)=>'<div><b>想一想 0'+(i+1)+'</b><p>'+r+'</p></div>').join('')}</div>
  <div class="homework"><span class="hi">🏠</span><div><b>家庭任务 · ${c.homeworkTitle||'把方法带回家'}</b><p>${c.homework}</p></div></div>
  <div class="final-actions"><button class="btn primary" data-cert>${c.certLabel||'下载成果卡'}</button><button class="btn" data-go="${c.prev||(parseInt(c.a,10)-1)}">回到发布会</button><a class="btn ghost" href="course-index.html">回到课程目录</a></div>
  <div class="final-quote">${c.quote||''}</div>
</div>`,
    init(sec,api){
      const S=api.S; const name=S.name||c.badge; sec.querySelector('[data-badge-name]').textContent=name;
      sec.querySelector('[data-cert]').onclick=()=>{
        const d=S.design||{};
        api.previewSheet({title:c.certTitle||c.title,subtitle:'第 '+c.no+' 章 · '+c.title,code:c.code||('FXM-CUR-Q1-'+c.no),badge:c.badge,name,date:new Date().toLocaleDateString('zh-CN'),filename:(c.certTitle||c.title)+'_'+name,stamp:c.badge,lab:{chapter:c.no,chapterTitle:c.title,name,product:d.name||c.certTitle||c.title,problem:S.problem||d.problem,how:d.how||d.function,improve:S.improve||d.improve},fields:(c.certFields||[]).map(f=>({label:f[0],value:d[f[1]]||S[f[1]]||''})),drawing:S.drawing,drawLabel:'我的设计图',footer:c.footer||'观察 → 设计 → 制作 → 测试 → 改进'});
        api.sfx('success');api.confetti(90);
      };
      setTimeout(()=>{api.confetti(80);api.sfx('chime');},400);
    }
  };
}

/* =========================================================
   第 05 章《如果物品拥有超能力》· SIT 减法实验室
   ========================================================= */
(function(){
const c={
  no:'05',title:'如果物品拥有超能力',short:'超能力',badge:'SIT 奇思妙想家',phase:'奇思妙想',
  acc:'#F5A623',acc2:'#FFE3A6',rgb:'245,166,35',icon:'🛠️',words:['减法','合并','设计','测试'],
  coverTitle:'如果物品',coverLine:'拥有超能力',lead:'这一次，我们不靠“灵光一闪”。<br>用 SIT 的<b style="color:var(--gold2);font-weight:600">减法</b>和<b style="color:var(--gold2);font-weight:600">一专多能</b>，把一件普通物品变成真正有用的新东西。',
  ability:'SIT 减法 · 一专多能 · 设计测试',cta:'进入超能力实验室',
  chapterNote:'本章用 SIT 的两个工具做一次完整创造：先“减法”——拿掉一个看起来必须有的部件，看看会逼出什么新用途；再“一专多能”——让留下的部件多做一件事。孩子不是在画万能神器，而是在真实的限制里做设计。',
  teacherRole:'不要急着评价“能不能做”。先让孩子动手拿掉部件、观察变化，再追问“它还能帮谁做什么”。',
  actNotes:[
    {goal:'认识 SIT 减法：拿掉一个部件，逼出新用途。',qs:['“这件物品最不能少的是什么？”','“如果拿掉它，会发生什么？”','“没有它，还能怎么用？”'],tip:'先选一件物品，不要急着想超能力。'},
    {goal:'亲手拿掉一个关键部件，观察“功能丢失”与“新可能”。',qs:['“没有手柄，雨伞还能怎么拿？”','“没有杯底，杯子还能装什么？”','“这个新用途，谁会用？”'],tip:'拿掉部件后，先别否定“不能用”；追问“那它能变成什么”。'},
    {goal:'用 SIT 一专多能：让剩下的部件多做一件事。',qs:['“这个能力加在哪里？”','“它是帮原来的使用者，还是帮新的人？”','“一个部件，能不能同时做两件事？”'],tip:'只加一种能力，不要贪多；说清楚“帮谁”。'},
    {goal:'把“拿掉的部件 + 新能力”变成一张可展示的设计图。',qs:['“它叫什么名字？”','“它解决什么问题？”','“谁会用？怎么用？”'],tip:'模块不是越多越好；先选 2–3 个真正需要的。'},
    {goal:'在真实场景里测试：它真的解决问题了吗？有没有新问题？',qs:['“下雨/天黑/人多时，它还能用吗？”','“哪个模块真正起了作用？”','“如果只改一个地方，你改哪里？”'],tip:'测试结果不是判决；发现新问题，就是下一轮设计的起点。'},
    {goal:'用一分钟讲清楚：拿掉了什么、合并了什么、测试结果怎样。',qs:['“你的物品原来最怕什么？”','“你拿掉了什么？它变成了什么？”','“测试后，你还想改哪里？”'],tip:'可以拿着设计图或实物说；允许讲失败。'},
    {goal:'回顾 SIT 减法与一专多能，颁发 SIT 奇思妙想家徽章。',qs:['“减法帮你发现了什么？”','“一专多能让哪个部件多做了事？”','“下一次，你想拿掉什么？”'],tip:'设计卡可下载/存入实验室；家庭任务用“减法”看一件家里的物品。'}
  ],
  acts:[]
};
c.acts=[
  {a:'01',name:'超能力实验室',time:'',html:`
<div class="ch-head"><div class="act"><b>01</b><span>超能力实验室</span></div><h2>先别加能力，<em>先看看它怕什么</em></h2><p>每一件普通物品，都有一个小毛病。选一件，走进 SIT 减法实验室：拿掉一个“看起来必须有”的部件，看看会发生什么。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 减法</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">已选 <b data-picked>—</b></span></div>
<div class="st-lab">
  <div class="st-scene" data-scene>
    <svg class="st-bg" viewBox="0 0 800 440" preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id="labFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(245,166,35,.08)"/><stop offset="1" stop-color="rgba(0,0,0,0)"/></linearGradient></defs>
      <ellipse cx="400" cy="372" rx="300" ry="46" fill="url(#labFloor)"/>
      <path d="M80 110 h180 M540 110 h180 M80 250 h120 M600 250 h120" stroke="rgba(245,196,81,.18)" stroke-width="2"/>
      <circle cx="130" cy="110" r="34" fill="none" stroke="rgba(245,196,81,.12)" stroke-dasharray="3 8"/>
      <circle cx="670" cy="110" r="24" fill="none" stroke="rgba(79,224,208,.12)" stroke-dasharray="2 7"/>
      <path d="M110 320 l30-50 30 50Z M630 320 l24-40 24 40Z" fill="rgba(245,196,81,.06)" stroke="rgba(245,196,81,.12)"/>
    </svg>
    <div class="st-spotlight"></div>
    <div class="st-scan"></div>
    <div class="st-main" data-main><div class="st-empty">选一件物品<br>开始观察</div></div>
    <div class="st-pedestals" data-peds>
      <button class="st-ped" data-object="umbrella"><span>☂️</span><b>雨伞</b><i class="dot"></i></button>
      <button class="st-ped" data-object="cup"><span>🥤</span><b>水杯</b><i class="dot"></i></button>
      <button class="st-ped" data-object="bag"><span>🎒</span><b>书包</b><i class="dot"></i></button>
      <button class="st-ped" data-object="shoe"><span>👟</span><b>鞋子</b><i class="dot"></i></button>
    </div>
  </div>
  <div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>每件物品都有一个小毛病。先选一件，再决定“拿掉什么”。<em>减法不是破坏，是逼出新用途。</em></div></div>
  <div class="st-actions"><button class="btn primary" data-go="2" disabled data-next>开始减法实验 →</button><span class="hint">先选一件物品</span></div>
</div>`,init(sec,api){
    const S=api.S; S.xp=S.xp||0; const main=sec.querySelector('[data-main]'),scene=sec.querySelector('[data-scene]'),next=sec.querySelector('[data-next]'),say=sec.querySelector('.st-coach .say'),picked=sec.querySelector('[data-picked]'),xp=sec.querySelector('[data-xp]');
    const O=FXMStudio.OBJECTS;
    function render(){sec.querySelectorAll('[data-object]').forEach(b=>b.classList.toggle('on',b.dataset.object===S.object));if(S.object){main.innerHTML=FXMStudio.wrap(S.object);const _o=main.querySelector('.st-object'); if(_o)_o.classList.add('pop');scene.classList.add('has-object');picked.textContent=O[S.object].name;next.disabled=false;say.innerHTML='<b>发小明：</b>你选了 <em>'+O[S.object].name+'</em>。它的小毛病是：'+O[S.object].pain+' <b>下一步，拿掉一个关键部件。</b>';}xp.textContent=S.xp;}
    sec.querySelectorAll('[data-object]').forEach(b=>b.onclick=()=>{S.object=b.dataset.object;S.objectName=O[S.object].name;S.removed='';S.newUse='';S.power='';S.modules=[];S.design={};S.scenario='';S.testResult='';S.retest=false;api.save();render();api.sfx('pop');api.burst(innerWidth*.5,innerHeight*.48,18,['#F5C451','#FFE3A6','#4FE0D0']);});
    next.onclick=()=>api.go(2);
    render();
    api.aiPanel(sec,{prompts:['这件物品最不能少的是什么？','如果拿掉它，会发生什么？','没有它，还能怎么用？','谁会需要这个新用途？']});
  }},
  {a:'02',name:'SIT 减法',time:'',html:`
<div class="ch-head"><div class="act"><b>02</b><span>SIT 减法</span></div><h2>拿掉一个部件，<em>它会变成什么？</em></h2><p>选一个“看起来必须有”的部件，把它拿掉。先别急着说“不能用了”，看看它被逼出了什么新用途。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 减法</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">已拿掉 <b data-removed>—</b></span></div>
<div class="st-lab st-split">
  <div class="st-scene" data-scene>
    <div class="st-spotlight"></div><div class="st-scan"></div>
    <div class="st-main" data-main></div>
    <div class="st-flash" data-flash></div>
  </div>
  <div class="st-side">
  <div class="st-part-tray" data-parts></div>
  <div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>SIT 减法：拿掉一个部件，观察“功能丢失”，再问“那它还能做什么”。<em>限制会逼出新的可能。</em></div></div>
  <div class="st-use-grid" data-uses></div>
  <div class="st-actions"><button class="btn primary" data-go="3" disabled data-next>带着新用途去合并 →</button><span class="hint">先拿掉部件，再选一个新用途</span></div>
  </div>
</div>`,init(sec,api){
    const S=api.S;const key=S.object||'umbrella';const O=FXMStudio.OBJECTS[key];const main=sec.querySelector('[data-main]'),parts=sec.querySelector('[data-parts]'),usesBox=sec.querySelector('[data-uses]'),next=sec.querySelector('[data-next]'),flash=sec.querySelector('[data-flash]'),rem=sec.querySelector('[data-removed]'),xp=sec.querySelector('[data-xp]');
    if(!S.object){S.object=key;S.objectName=O.name;}
    function render(){
      main.innerHTML=FXMStudio.wrap(key);
      const obj=main.querySelector('.st-object')||main.firstElementChild; if(obj)obj.classList.add('pop');
      if(S.removed)FXMStudio.setPartOff(main,S.removed,true);
      parts.innerHTML=O.parts.map(p=>'<button class="st-part-btn'+(S.removed===p.id?' off':'')+'" data-part-btn="'+p.id+'">✂️ 拿掉'+p.label+'</button>').join('');
      parts.querySelectorAll('[data-part-btn]').forEach(b=>b.onclick=()=>{S.removed=b.dataset.partBtn;S.removedLabel=(O.parts.find(p=>p.id===S.removed)||{}).label||'';S.newUse='';api.save();FXMStudio.setPartOff(main,S.removed,true);FXMStudio.pulse(flash,'on');api.sfx('whoosh');rem.textContent=S.removedLabel;renderUses();api.toast('拿掉了'+S.removedLabel+'：功能丢了，但新可能出现了','✂️');});
      usesBox.innerHTML=O.uses.map((u,i)=>'<button class="st-use-card'+(S.newUse===u?' on':'')+'" data-use="'+i+'"><b>新用途 0'+(i+1)+'</b>'+u+'</button>').join('');
      usesBox.querySelectorAll('[data-use]').forEach(b=>b.onclick=()=>{S.newUse=O.uses[+b.dataset.use];if(!S.newUse)S.xp=(S.xp||0)+10;api.save();renderUses();next.disabled=false;xp.textContent=S.xp;api.sfx('success');api.burst(innerWidth*.5,innerHeight*.45,16,['#F5A623','#FFE3A6','#4FE0D0']);});
      if(S.removed)rem.textContent=S.removedLabel; if(S.xp)xp.textContent=S.xp;
      next.disabled=!S.newUse;
    }
    function renderUses(){usesBox.querySelectorAll('[data-use]').forEach(b=>b.classList.toggle('on',O.uses[+b.dataset.use]===S.newUse));}
    next.onclick=()=>api.go(3);render();
    api.aiPanel(sec,{prompts:['没有这个部件，它还能怎么用？','这个新用途，谁会用？','它是真的有用，还是只是好玩？','如果只能保留一个用途，你保留哪个？']});
  }},
  {a:'03',name:'SIT 一专多能',time:'',html:`
<div class="ch-head"><div class="act"><b>03</b><span>SIT 一专多能</span></div><h2>让一个部件，<em>多做一件事</em></h2><p>现在，给剩下的物品加一种能力。不是“多装一个零件”，而是让原来的部件多承担一个任务。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 一专多能</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">能力 <b data-power>—</b></span></div>
<div class="st-lab st-split">
  <div class="st-scene" data-scene>
    <div class="st-spotlight"></div><div class="st-scan"></div>
    <div class="st-main" data-main></div>
    <div class="st-drop" data-drop></div>
    <div class="st-combo" data-combo></div>
  </div>
  <div class="st-side">
  <div class="st-power-tray" data-powers></div>
  <div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>一专多能：让一个部件同时做两件事。<em>把能力卡拖到物品上，或者点一下能力，再点物品。</em></div></div>
  <div class="st-actions"><button class="btn primary" data-go="4" disabled data-next>去设计工作台 →</button><span class="hint">先选一种能力</span></div>
  </div>
</div>`,init(sec,api){
    const S=api.S;const key=S.object||'umbrella';const O=FXMStudio.OBJECTS[key];const main=sec.querySelector('[data-main]'),drop=sec.querySelector('[data-drop]'),combo=sec.querySelector('[data-combo]'),tray=sec.querySelector('[data-powers]'),next=sec.querySelector('[data-next]'),pw=sec.querySelector('[data-power]'),xp=sec.querySelector('[data-xp]');
    function render(){
      main.innerHTML=FXMStudio.wrap(key);if(S.removed)FXMStudio.setPartOff(main,S.removed,true);
      const obj=main.querySelector('.st-object')||main.firstElementChild;if(S.power&&obj)obj.classList.add('powered');
      tray.innerHTML=FXMStudio.POWERS.map(p=>'<button class="st-power-chip'+(S.power===p.id?' on':'')+'" draggable="true" data-power-chip="'+p.id+'"><span>'+p.icon+'</span>'+p.label+'</button>').join('');
      tray.querySelectorAll('[data-power-chip]').forEach(b=>{b.onclick=()=>choose(b.dataset.powerChip);b.addEventListener('dragstart',e=>{try{e.dataTransfer.setData('text/plain',b.dataset.powerChip);}catch(err){}});});
      if(S.power){const p=FXMStudio.power(S.power);pw.textContent=p.label;combo.textContent='给 '+O.name+' 加上「'+p.label+'」：一个部件，两项任务。';combo.classList.add('on');next.disabled=false;}
      xp.textContent=S.xp||0;
    }
    function choose(id){const first=!S.power;S.power=id;S.powerName=FXMStudio.power(id).label;if(first)S.xp=(S.xp||0)+10;api.save();render();api.sfx('success');api.burst(innerWidth*.5,innerHeight*.45,20,['#F5C451','#FFE3A6','#4FE0D0','#FF7A6B']);}
    drop.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('over');});
    drop.addEventListener('dragleave',()=>drop.classList.remove('over'));
    drop.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('over');choose(e.dataTransfer.getData('text/plain')||'light');});
    drop.onclick=()=>{if(!S.power)api.toast('先选一种能力卡，再点物品','✦');};
    next.onclick=()=>api.go(4);render();
    api.aiPanel(sec,{prompts:['这个能力加在哪里？','它帮原来的使用者，还是帮新的人？','一个部件怎样同时做两件事？','这个能力会不会带来新麻烦？']});
  }},
  {a:'04',name:'设计工作台',time:'',html:`
<div class="ch-head"><div class="act"><b>04</b><span>设计工作台</span></div><h2>把“减法 + 合并”，<em>变成一张设计图</em></h2><p>把 2–3 个真正需要的模块拖到设计台上，写清楚它叫什么、解决什么问题、给谁用。最后画一画。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 设计</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">模块 <b data-mcount>0</b>/4</span></div>
<div class="st-blueprint">
  <div class="st-blueprint-canvas" data-bp>
    <div class="bp-label">SIT DESIGN BOARD · 拖模块到四个槽位</div>
    <div class="st-bp-obj" data-bp-obj></div>
    <div class="st-slot" data-slot="0"><span>＋</span>模块 1</div><div class="st-slot" data-slot="1"><span>＋</span>模块 2</div><div class="st-slot" data-slot="2"><span>＋</span>模块 3</div><div class="st-slot" data-slot="3"><span>＋</span>模块 4</div>
  </div>
  <aside class="st-spec">
    <h4>设计规格</h4>
    <div class="field"><label>名字</label><input data-f="name" maxlength="24" placeholder="例如：会提醒的雨伞"></div>
    <div class="field"><label>解决什么问题</label><textarea data-f="problem" maxlength="80" placeholder="谁遇到了什么不方便？"></textarea></div>
    <div class="field"><label>给谁用</label><input data-f="user" maxlength="30" placeholder="自己、同学、家人…"></div>
    <div class="field"><label>怎样工作</label><textarea data-f="how" maxlength="80" placeholder="拿掉了什么？合并了什么？"></textarea></div>
    <div class="field"><label>下一步改进</label><input data-f="improve" maxlength="40" placeholder="如果再做一版…"></div>
    <div class="st-mini-draw"><div class="draw-head"><span>手绘 · 可选</span><span data-draw-state>未开始</span></div><canvas data-draw width="600" height="300"></canvas></div>
    <div class="st-module-tray" data-modules></div>
    <div style="display:flex;gap:7px;flex-wrap:wrap;margin-top:4px"><button class="btn primary sm" data-gen>生成设计卡 →</button><button class="btn ghost sm" data-go="5" data-next>去测试 →</button></div>
  </aside>
</div>
`,
    init(sec,api){
      const S=api.S;const key=S.object||'umbrella';const O=FXMStudio.OBJECTS[key];const bp=sec.querySelector('[data-bp-obj]');S.design=S.design||{};S.modules=S.modules||[];
      bp.innerHTML=FXMStudio.wrap(key);if(S.removed)FXMStudio.setPartOff(bp,S.removed,true);
      const draw=api.initDrawing(sec,url=>{S.drawing=url;api.save();sec.querySelector('[data-draw-state]').textContent='已保存';});
      if(S.drawing&&draw)draw.load(S.drawing);
      sec.querySelectorAll('[data-f]').forEach(el=>{const k=el.dataset.f;el.value=S.design[k]||'';el.addEventListener('input',()=>{S.design[k]=el.value;api.save();});});
      const slots=sec.querySelectorAll('[data-slot]');const tray=sec.querySelector('[data-modules]');let active='';
      function render(){
        slots.forEach((sl,i)=>{const id=S.modules[i];const m=id?FXMStudio.module(id):null;sl.classList.toggle('on',!!m);sl.innerHTML=m?('<span>'+m.icon+'</span>'+m.label):'<span>＋</span>模块 '+(i+1);});
        tray.innerHTML=FXMStudio.MODULES.map(m=>'<button class="st-module'+(active===m.id?' on':'')+'" draggable="true" data-mod="'+m.id+'">'+m.icon+' '+m.label+'</button>').join('');
        tray.querySelectorAll('[data-mod]').forEach(b=>{b.onclick=()=>{active=b.dataset.mod;render();api.sfx('tap');};b.addEventListener('dragstart',e=>{try{e.dataTransfer.setData('text/plain',b.dataset.mod);}catch(err){}});});
        sec.querySelector('[data-mcount]').textContent=S.modules.length;sec.querySelector('[data-xp]').textContent=S.xp||0;
      }
      slots.forEach((sl,i)=>{sl.onclick=()=>{if(!active)api.toast('先选一个模块','＋');else{S.modules[i]=active;active='';api.save();render();api.sfx('pop');}};sl.addEventListener('dragover',e=>{e.preventDefault();sl.classList.add('over');});sl.addEventListener('dragleave',()=>sl.classList.remove('over'));sl.addEventListener('drop',e=>{e.preventDefault();sl.classList.remove('over');const id=e.dataTransfer.getData('text/plain');if(id){S.modules[i]=id;api.save();render();api.sfx('pop');}});});
      render();
      sec.querySelector('[data-gen]').onclick=()=>{const d=S.design;if(!d.name||!d.problem){api.toast('至少写下名字和要解决的问题','✏️');return;}api.previewSheet({title:'SIT 超能力设计卡',subtitle:'第 05 章 · 如果物品拥有超能力',code:'FXM-CUR-Q1-005',badge:'SIT 奇思妙想家',name:S.name||'小小发明家',date:new Date().toLocaleDateString('zh-CN'),filename:'SIT超能力设计卡_'+(S.name||'小小发明家'),stamp:'SIT 减法',lab:{chapter:'05',chapterTitle:'如果物品拥有超能力',name:S.name||'小小发明家',product:d.name,problem:d.problem,how:d.how||d.user,improve:d.improve},fields:[{label:'物品',value:O.name},{label:'拿掉的部件',value:S.removedLabel||''},{label:'新用途',value:S.newUse||''},{label:'合并的能力',value:S.powerName||''},{label:'作品名称',value:d.name},{label:'解决的问题',value:d.problem},{label:'给谁用',value:d.user},{label:'怎样工作',value:d.how},{label:'下一步',value:d.improve}],drawing:S.drawing,drawLabel:'我的手绘设计',footer:'减法 → 新用途 → 一专多能 → 设计 → 测试'});};
      api.aiPanel(sec,{prompts:['这个模块真的解决了原来的问题吗？','如果只能保留两个模块，你保留哪两个？','它会不会让物品更重/更难用？','你准备怎么测试它？']});
    }},
  {a:'05',name:'场景测试',time:'',html:`
<div class="ch-head"><div class="act"><b>05</b><span>场景测试</span></div><h2>它真的有用吗？<em>换个场景试试</em></h2><p>选一个真实场景，点“开始测试”。看看它解决了什么，又带来了什么新问题。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 测试</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">场景 <b data-scen>—</b></span></div>
<div class="st-lab st-split">
  <div class="st-scene" data-scene>
    <div class="st-weather" data-weather></div>
    <div class="st-test-object" data-test-obj></div>
    <div class="st-meter"><span>问题解决度</span><b data-meter>0%</b><div class="bar"><i data-meter-bar></i></div></div>
    <div class="st-flash" data-flash></div>
  </div>
  <div class="st-side">
  <div class="st-scenarios"><button class="st-scenario" data-scen-btn="rain">🌧️ 下雨</button><button class="st-scenario" data-scen-btn="dark">🌙 天黑</button><button class="st-scenario" data-scen-btn="crowd">👥 人多</button><button class="st-scenario" data-scen-btn="wind">💨 大风</button></div>
  <div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>测试不是“成功/失败”的判决。看两件事：<em>它解决了什么？又带来了什么新问题？</em></div></div>
  <div class="st-result" data-result>先选一个场景，再点“开始测试”。</div>
  <div class="st-actions"><button class="btn primary" data-run>开始测试 →</button><button class="btn ghost" data-retest disabled>改进后再测一次</button><button class="btn ghost" data-go="6" data-next disabled>去发布 →</button></div>
  </div>
</div>`,init(sec,api){
    const S=api.S;const key=S.object||'umbrella';const obj=sec.querySelector('[data-test-obj]'),weather=sec.querySelector('[data-weather]'),meter=sec.querySelector('[data-meter]'),bar=sec.querySelector('[data-meter-bar]'),result=sec.querySelector('[data-result]'),next=sec.querySelector('[data-next]'),run=sec.querySelector('[data-run]'),retest=sec.querySelector('[data-retest]'),flash=sec.querySelector('[data-flash]'),scen=sec.querySelector('[data-scen]');
    const SC={rain:'下雨',dark:'天黑',crowd:'人多',wind:'大风'};
    obj.innerHTML=FXMStudio.wrap(key);if(S.removed)FXMStudio.setPartOff(obj,S.removed,true);
    function choose(s){S.scenario=s;S.scenarioName=SC[s];weather.className='st-weather '+s;scen.textContent=SC[s];sec.querySelectorAll('[data-scen-btn]').forEach(b=>b.classList.toggle('on',b.dataset.scenBtn===s));api.save();result.textContent='场景已选：'+SC[s]+'。点“开始测试”看看会发生什么。';run.disabled=false;next.disabled=true;retest.disabled=true;meter.textContent='0%';bar.style.width='0%';}
    function solve(){
      const mods=S.modules||[];const p=S.power||'';
      let ok=false,why='';
      if(S.scenario==='rain'&&(p==='collect'||mods.includes('pocket')||mods.includes('clip'))){ok=true;why='它接住了水/解放了双手，雨伞不再只是挡雨。';}
      if(S.scenario==='dark'&&(p==='light'||mods.includes('lamp'))){ok=true;why='它在黑暗里被看见，提醒别人注意。';}
      if(S.scenario==='crowd'&&(p==='sound'||p==='connect'||mods.includes('speaker')||mods.includes('strap'))){ok=true;why='它能在人群中被听见/固定住，不容易丢。';}
      if(S.scenario==='wind'&&(p==='auto'||p==='connect'||mods.includes('clip')||mods.includes('strap'))){ok=true;why='它被固定住了，风大也不容易被吹翻。';}
      return {ok,why};
    }
    run.onclick=()=>{if(!S.scenario){api.toast('先选一个场景','🌧️');return;}const r=solve();S.testResult=(r.ok?'解决：'+r.why:'部分解决，但有新问题：'+r.why);api.save();FXMStudio.pulse(flash,'on');api.sfx(r.ok?'success':'error');meter.textContent=r.ok?'86%':'52%';bar.style.width=r.ok?'86%':'52%';result.innerHTML='<b style="color:'+(r.ok?'var(--teal)':'#FFB3A8')+'">'+(r.ok?'测试通过':'有新问题')+'</b><br>'+S.testResult;retest.disabled=false;next.disabled=false;if(r.ok)api.burst(innerWidth*.5,innerHeight*.42,24,['#4FE0D0','#F5C451','#FFE3A6']);};
    retest.onclick=()=>{S.retest=true;S.testResult='改进后：增加一个固定/提醒模块，问题解决度提升。';api.save();api.sfx('success');meter.textContent='94%';bar.style.width='94%';result.innerHTML='<b style="color:var(--teal)">改进后测试</b><br>'+S.testResult;api.burst(innerWidth*.5,innerHeight*.42,26,['#4FE0D0','#F5C451','#A78BFA']);};
    sec.querySelectorAll('[data-scen-btn]').forEach(b=>b.onclick=()=>choose(b.dataset.scenBtn));
    next.onclick=()=>api.go(6);
    if(S.scenario)choose(S.scenario);
    api.aiPanel(sec,{prompts:['它解决了什么？又带来了什么新问题？','哪个模块真正起了作用？','如果只改一个地方，你改哪里？','换一个场景，结果会一样吗？']});
  }},
  {a:'06',name:'超能力发布会',time:'',html:`
<div class="ch-head"><div class="act"><b>06</b><span>超能力发布会</span></div><h2>用一分钟，<em>讲清楚你的 SIT 设计</em></h2><p>不用背稿。按“原来—拿掉—合并—测试”的顺序，把你的设计讲给大家听。</p></div>
<div class="stage-wrap">
  <div class="curtain l"></div><div class="curtain r"></div><div class="spot"></div><div class="stage-floor"></div>
  <div class="stage-content">
    <div class="stage-top"><span>超能力发布会 · SIT DESIGN</span><span class="who" data-name>小小发明家</span></div>
    <div class="speech">
      <p class="lead">大家好，我是 <b data-name2>小小发明家</b>。</p>
      <p>我选的物品是：<b data-obj>……</b></p>
      <p>我拿掉了：<b data-removed>……</b>，它变成了：<b data-use>……</b></p>
      <p>我又合并了：<b data-power>……</b>。</p>
      <p>测试时：<b data-test>……</b></p>
      <p>下一步我想改进：<b data-improve>……</b></p>
    </div>
    <div class="stage-controls"><div class="timer" data-timer><div class="mini-timer"><b data-timer-num>60</b><span>秒</span></div><div class="timer-btns"><button class="main" data-timer-start>开始 60 秒</button><button data-timer-reset>重置</button></div></div><div class="applause"><button class="applause-btn" data-clap>👏</button><div class="applause-meter"><div class="am-top"><span>掌声能量</span><b><span data-clap-count>0</span></b></div><div class="ambar"><i data-clap-bar></i></div></div></div><button class="btn ghost sm" data-go="7">领取徽章 →</button></div>
  </div>
</div>
<div class="st-audience" data-audience><span>🧒</span><span>👧</span><span>🧑</span><span>👦</span><span>👩</span></div>
<div class="ch-foot-note">讲清楚“拿掉了什么、合并了什么、测试结果怎样”，比“听起来酷不酷”更重要。</div>`,init(sec,api){
    const S=api.S;const name=S.name||'小小发明家';const set=(s,v)=>{const el=sec.querySelector(s);if(el)el.textContent=v||'……';};
    set('[data-name]',name);set('[data-name2]',name);set('[data-obj]',S.objectName);set('[data-removed]',S.removedLabel);set('[data-use]',S.newUse);set('[data-power]',S.powerName);set('[data-test]',S.testResult);set('[data-improve]',(S.design&&S.design.improve)||S.improve);
    api.timer(sec,{seconds:60,onEnd:()=>api.toast('时间到，谢谢大家的聆听','⏰')});
    let energy=0,count=0;const aud=sec.querySelector('[data-audience]');sec.querySelector('[data-clap]').onclick=()=>{energy=Math.min(100,energy+7);count++;sec.querySelector('[data-clap-count]').textContent=count;sec.querySelector('[data-clap-bar]').style.width=energy+'%';aud.classList.remove('clap');void aud.offsetWidth;aud.classList.add('clap');api.sfx('pop');api.burst(innerWidth*.5,innerHeight*.55,10,['#F5C451','#FFE3A6','#4FE0D0']);};
  }},
  c2badge({...c,a:'07',name:'SIT 奇思妙想家徽章',h2:'你完成了一次<em>SIT 减法 + 一专多能</em>',p:'你选了一件普通物品，拿掉一个关键部件，逼出了新用途；又让剩下的部件多做一件事。最后，你在真实场景里测试了它。',journey:[['✂️','减法','拿掉一个部件'],['💡','新用途','逼出新的可能'],['🔗','合并','让一个部件做两件事'],['🧪','测试','发现问题再改进']],reflect:['减法帮你发现了什么？','一专多能让哪个部件多做了事？','测试后，你最想改哪里？'],homeworkTitle:'用减法看一件家里的物品',homework:'选一件家里的普通物品，拿掉一个“看起来必须有”的部件，想一个它还能做什么的新用途。画一张小卡，下次带来。',certLabel:'下载 SIT 设计卡',certTitle:'SIT 超能力设计卡',certFields:[['物品','objectName'],['拿掉的部件','removedLabel'],['新用途','newUse'],['合并的能力','powerName'],['测试结果','testResult'],['下一步','improve']],quote:'“限制不是创意的敌人，限制是创意的起点。”',prev:6,actNotes:c.actNotes})
].map(a=>a);
window.FXM_CHAPTERS['5']={...c,cover:c2cover(c),notes:c2notes(c)};
})();

/* =========================================================
   第 06 章《给未来设计一件产品》· SIT 用户访谈剧场
   ========================================================= */
(function(){
const USERS={
  grandpa:{emoji:'👴',name:'爷爷',age:'78 岁',pain:'吃药时间总记混，药盒上的字太小；听不清提醒，放下东西就忘。',
    answers:['吃药时间总记混，药盒上的字太小，得拿放大镜。','眼镜、药盒、遥控器，放下就忘放在哪。','到点能提醒我，最好不用戴眼镜也看得见。','提醒我有没有吃过药，别重复吃。'],
    needs:['到点提醒吃药','看清药盒上的字','找到随手放下的东西']},
  classmate:{emoji:'🧒',name:'同学',age:'9 岁',pain:'书包乱、橡皮总找不到；写字时背弯着，桌洞也塞不下。',
    answers:['书包里东西混在一起，找橡皮要翻半天。','橡皮、尺子、水杯，经常找不着。','帮我快速找到要用的东西，最好不用翻。','让我一眼看到东西放在哪。'],
    needs:['快速找到文具','书包分类收纳','保持写字姿势']},
  mom:{emoji:'👩',name:'妈妈',age:'36 岁',pain:'做饭、收纳、出门总是大包小包；手上拿满东西还要找钥匙。',
    answers:['出门手上全是袋子，还要腾手找钥匙。','钥匙、门禁卡、口罩，出门总落东西。','出门前帮我把要带的都提醒一遍。','让我不用放下东西就能开门。'],
    needs:['出门不落东西','解放双手找钥匙','厨房收纳更顺手']},
  teacher:{emoji:'🧑‍🏫',name:'老师',age:'30 岁',pain:'上课要管很多事，教具多、时间紧；总有小东西找不到。',
    answers:['上课要用的教具多，找起来打断节奏。','马克笔、翻页笔、U 盘，常找不到。','让教具一眼可见、拿了就能用。','帮我把最常用的教具固定在一个地方。'],
    needs:['教具一眼可见','上课少找东西','收纳不占讲台']}
};
const RISKS={
  hear:{label:'听不清提示',speech:'爷爷：声音太小了，我戴着助听器也听不清。',fix:'hear',fixLabel:'灯光 + 震动',result:'如果听不清 → 用灯光和震动提醒（属性关联）。'},
  tech:{label:'不会用手机',speech:'爷爷：我不会用 App，也不想每次点很多步。',fix:'tech',fixLabel:'一键按钮 + 大字',result:'如果不会用手机 → 只保留一个实体按钮 + 大字（简化）。'},
  forget:{label:'忘记按确认',speech:'爷爷：我吃过药了，但忘了按确认，家人以为我没吃。',fix:'forget',fixLabel:'自动记录 + 通知家人',result:'如果忘记确认 → 自动记录，并通知家人（容错）。'},
  vision:{label:'看不清小字',speech:'爷爷：药盒上的字太小，我得找放大镜。',fix:'vision',fixLabel:'大字面板 + 语音',result:'如果看不清 → 大字 + 语音播报（多通道）。'}
};
const c={
  no:'06',title:'给未来设计一件产品',short:'未来产品',badge:'未来产品设计师',phase:'奇思妙想',
  acc:'#7DD3FC',acc2:'#DFF6FF',rgb:'125,211,252',icon:'🔮',words:['用户','采访','功能','边界'],
  coverTitle:'给未来',coverLine:'设计一件产品',lead:'先别想“我要发明什么”。<br>先去问一个真实的人：他哪里不方便？再让一个部件<b style="color:var(--gold2);font-weight:600">多做一件事</b>。',
  ability:'SIT 一专多能 · 属性关联 · 用户设计',cta:'进入用户访谈剧场',
  chapterNote:'本章用 SIT 的一专多能与属性关联做用户设计：先采访真实用户，提炼一个最需要的功能；再让一个部件承担两个任务，并检查“听不清/不会用/忘记”等真实边界。',
  teacherRole:'不要替用户回答。让孩子先问、先听、先记录；设计可以大胆，但必须回到“用户真的用得上吗”。',
  actNotes:[
    {goal:'选一个真实、能采访到的用户，理解“为谁设计”。',qs:['“你为谁设计？他每天做什么？”','“他最近有什么不方便？”','“你能采访到他吗？”'],tip:'不要选“所有人”；选一个具体的人。'},
    {goal:'用四个问题采访用户，记录原话，提炼最需要的一件事。',qs:['“您平时做什么最麻烦？”','“有没有经常找不到/记不住的东西？”','“如果只能帮一件事，您希望是哪件？”'],tip:'先听，不急着解释；至少问 3 个问题，再选 top need。'},
    {goal:'用 SIT 一专多能，把“需要”变成一个功能。',qs:['“这个功能加在哪里？”','“一个部件能不能同时做两件事？”','“它帮的是原来的用户吗？”'],tip:'只选一个功能，不要贪多；说清楚它帮谁。'},
    {goal:'用 SIT 属性关联检查真实边界：听不清、不会用、忘记确认。',qs:['“如果用户听不清，提醒还能用吗？”','“如果他不会用手机，怎么办？”','“如果他忘记按确认，会怎样？”'],tip:'边界不是否定创意，而是让设计更真实；选一个风险 + 一个补救。'},
    {goal:'把“用户—需要—功能—边界”做成产品概念图。',qs:['“它叫什么名字？”','“它怎样工作？”','“还有什么没解决？”'],tip:'模块 2–3 个就够；先解决一个最痛的点。'},
    {goal:'用一分钟讲清楚“为谁、解决什么、怎么用、还有什么没解决”。',qs:['“你的用户听得懂吗？”','“如果只能保留一个功能，你保留哪个？”'],tip:'可以请一个同学扮演用户，现场提问。'},
    {goal:'回顾用户访谈与 SIT 设计，颁发未来产品设计师徽章。',qs:['“你采访到的，和你原来以为的一样吗？”','“下一步最想验证什么？”'],tip:'方案可下载/存入实验室；家庭任务再采访一个用户。'}
  ],
  acts:[]
};
c.acts=[
  {a:'01',name:'选一个真实用户',time:'',html:`
<div class="ch-head"><div class="act"><b>01</b><span>选一个真实用户</span></div><h2>先别想产品，<em>先想一个人</em></h2><p>真正有用的产品，不是从“我想要”开始，而是从“谁需要”开始。选一个你能采访到的人。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 一专多能</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">已选 <b data-user>—</b></span></div>
<div class="st-user-grid" data-users>
  <button class="st-user-card" data-u="grandpa"><span>👴</span><b>爷爷 / 奶奶</b><small>78 岁 · 吃药、看不清、听不清</small></button>
  <button class="st-user-card" data-u="classmate"><span>🧒</span><b>同学</b><small>9 岁 · 书包乱、文具找不到</small></button>
  <button class="st-user-card" data-u="mom"><span>👩</span><b>妈妈 / 爸爸</b><small>36 岁 · 出门大包小包</small></button>
  <button class="st-user-card" data-u="teacher"><span>🧑‍🏫</span><b>老师</b><small>30 岁 · 教具多、时间紧</small></button>
</div>
<div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>不要选“所有人”。选一个具体的人：他叫什么？他每天做什么？<em>他的哪一件事最麻烦？</em></div></div>
<div class="st-actions"><button class="btn primary" data-go="2" disabled data-next>去采访他 →</button><span class="hint">先选一个用户</span></div>
<div class="st-tip-strip"><div><b>01 先选人</b><span>选一个你能真实采访到的人，不要选“所有人”。</span></div><div><b>02 再听</b><span>先问，不急着解释；记录他的原话。</span></div><div><b>03 不替他说</b><span>“你觉得”不等于“他需要”。</span></div></div>`,init(sec,api){
    const S=api.S;S.xp=S.xp||0;const u=sec.querySelector('[data-user]'),next=sec.querySelector('[data-next]'),say=sec.querySelector('.st-coach .say'),xp=sec.querySelector('[data-xp]');
    function render(){sec.querySelectorAll('[data-u]').forEach(b=>b.classList.toggle('on',b.dataset.u===S.user));if(S.user){const U=USERS[S.user];u.textContent=U.name;next.disabled=false;say.innerHTML='<b>发小明：</b>你选了 <em>'+U.name+'</em>。他的麻烦是：'+U.pain+' <b>下一步，去采访他。</b>';}xp.textContent=S.xp;}
    sec.querySelectorAll('[data-u]').forEach(b=>b.onclick=()=>{S.user=b.dataset.u;S.userName=USERS[S.user].name;S.userEmoji=USERS[S.user].emoji;S.asked=[];S.needs=[];S.need='';S.function='';S.functionName='';S.featureText='';S.risk='';S.fix='';S.boundaryResult='';S.modules=[];S.design={};api.save();render();api.sfx('pop');api.burst(innerWidth*.5,innerHeight*.4,18,['#7DD3FC','#DFF6FF','#F5C451']);});
    next.onclick=()=>api.go(2);render();
    api.aiPanel(sec,{prompts:['你为谁设计？他每天做什么？','他最近有什么不方便？','你怎么知道这是他真正需要的？','你能采访到他吗？']});
  }},
  {a:'02',name:'用户访谈',time:'',html:`
<div class="ch-head"><div class="act"><b>02</b><span>用户访谈</span></div><h2>先听，<em>不要急着设计</em></h2><p>点四个问题，听用户怎么说。至少问 3 个，再从他的话里选出“最需要解决的一件事”。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 先听</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">已问 <b data-asked>0</b>/4</span></div>
<div class="st-split">
  <div class="st-scene st-user-scene">
    <div class="st-spotlight"></div><div class="st-scan"></div>
    <div class="st-avatar" data-avatar>👴</div>
    <div class="st-speech on" data-speech>点一个问题，听听他怎么说。</div>
  </div>
  <div class="st-side">
    <div class="st-question-grid" data-questions>
      <button class="st-question" data-q="0">① 您平时做什么最麻烦？</button>
      <button class="st-question" data-q="1">② 有没有经常找不到/记不住的东西？</button>
      <button class="st-question" data-q="2">③ 您希望有个东西帮您做什么？</button>
      <button class="st-question" data-q="3">④ 如果只能帮一件事，您希望是哪件？</button>
    </div>
    <div class="st-need-list" data-needs></div>
    <div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>记录原话，不急着解释。<em>最需要解决的那件事，往往藏在他说得最具体的地方。</em></div></div>
    <div class="st-actions"><button class="btn primary" data-go="3" disabled data-next>把需要变成功能 →</button><span class="hint">至少问 3 个，再选 top need</span></div>
  </div>
</div>`,init(sec,api){
    const S=api.S;const key=S.user||'grandpa';const U=USERS[key];S.asked=S.asked||[];S.needs=S.needs||[];S.need=S.need||'';
    const av=sec.querySelector('[data-avatar]'),sp=sec.querySelector('[data-speech]'),qs=sec.querySelector('[data-questions]'),needs=sec.querySelector('[data-needs]'),next=sec.querySelector('[data-next]'),asked=sec.querySelector('[data-asked]'),xp=sec.querySelector('[data-xp]');
    av.textContent=U.emoji;if(S.user)S.userName=U.name;
    function renderQuestions(){qs.querySelectorAll('[data-q]').forEach(b=>{const i=+b.dataset.q;b.classList.toggle('asked',S.asked.includes(i));b.onclick=()=>ask(i);});}
    function ask(i){if(!S.asked.includes(i)){S.asked.push(i);S.needs.push(U.needs[i]);}sp.textContent=U.answers[i];sp.classList.remove('on');void sp.offsetWidth;sp.classList.add('on');api.save();renderQuestions();renderNeeds();api.sfx('tap');}
    function renderNeeds(){needs.innerHTML=S.needs.length?S.needs.map((n,i)=>'<button class="st-need-card'+(S.need===n?' on':'')+'" data-need="'+i+'"><b>需求 0'+(i+1)+'</b>'+n+'</button>').join(''):'<div class="prob-empty" style="font-size:10px">问 1–2 个问题后，这里会出现“需求卡”。</div>';needs.querySelectorAll('[data-need]').forEach(b=>b.onclick=()=>{S.need=S.needs[+b.dataset.need];api.save();renderNeeds();next.disabled=!(S.asked.length>=3&&S.need);api.sfx('success');});asked.textContent=S.asked.length;next.disabled=!(S.asked.length>=3&&S.need);xp.textContent=S.xp||0;}
    next.onclick=()=>api.go(3);renderQuestions();renderNeeds();
    api.aiPanel(sec,{prompts:['他说的哪句话最具体？','他最需要解决的到底是哪件事？','这是“你觉得”，还是“他说的”？','如果只能帮一件事，你选哪件？']});
  }},
  {a:'03',name:'需求变功能',time:'',html:`
<div class="ch-head"><div class="act"><b>03</b><span>需求变功能</span></div><h2>让一个部件，<em>多做一件事</em></h2><p>把用户的需要放进机器，选一个 SIT 功能。不是功能越多越好，而是让一个部件同时完成两个任务。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 一专多能</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">功能 <b data-fn>—</b></span></div>
<div class="st-machine">
  <div class="st-machine-need"><span>用户最需要</span><b data-need>—</b><span style="margin-top:6px;color:var(--faint)">把它变成功能 →</span></div>
  <div class="st-machine-arrow">→</div>
  <div class="st-function-grid" data-functions>
    <button class="st-function-card" data-fn="remind"><b>会提醒</b>到点发光 + 发声，双通道提醒。</button>
    <button class="st-function-card" data-fn="simplify"><b>会简化</b>一键操作 + 大字显示，少步骤。</button>
    <button class="st-function-card" data-fn="combine"><b>会组合</b>药盒 + 眼镜 + 提醒，三合一。</button>
    <button class="st-function-card" data-fn="adapt"><b>会适应</b>听不清→灯光/震动；看不清→大字/语音。</button>
    <button class="st-function-card" data-fn="protect"><b>会保护</b>忘记确认→自动记录 + 通知家人。</button>
  </div>
</div>
<div class="st-feature" data-feature>选一个功能，看看它能不能真正对应“用户最需要”。</div>
<div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>一专多能不是“多加一个零件”，而是<em>让原来的部件多承担一个任务</em>。一个功能，解决两个麻烦。</div></div>
<div class="st-actions"><button class="btn primary" data-go="4" disabled data-next>去检查真实边界 →</button><span class="hint">先选一个功能</span></div>`,init(sec,api){
    const S=api.S;const need=sec.querySelector('[data-need]'),feat=sec.querySelector('[data-feature]'),next=sec.querySelector('[data-next]'),fn=sec.querySelector('[data-fn]'),xp=sec.querySelector('[data-xp]');
    const F={remind:{label:'会提醒',text:'到点发光 + 发声，双通道提醒，不用一直看手机。'},simplify:{label:'会简化',text:'只保留一个实体按钮 + 大字显示，不用学 App。'},combine:{label:'会组合',text:'药盒 + 眼镜 + 提醒三合一，少找一样东西。'},adapt:{label:'会适应',text:'听不清→灯光/震动；看不清→大字/语音，换一种通道。'},protect:{label:'会保护',text:'忘记确认→自动记录 + 通知家人，给用户留一条后路。'}};
    need.textContent=S.need||'（先回去选一个 top need）';
    function render(){sec.querySelectorAll('[data-fn]').forEach(b=>b.classList.toggle('on',b.dataset.fn===S.function));if(S.function){const f=F[S.function];fn.textContent=f.label;feat.innerHTML='<b>'+f.label+'：</b>'+f.text+'<br><span style="color:var(--faint)">对应需要：'+(S.need||'—')+'</span>';next.disabled=false;}xp.textContent=S.xp||0;}
    sec.querySelectorAll('[data-fn]').forEach(b=>b.onclick=()=>{S.function=b.dataset.fn;S.functionName=F[b.dataset.fn].label;S.featureText=F[b.dataset.fn].text;S.xp=(S.xp||0)+10;api.save();render();api.sfx('success');api.burst(innerWidth*.6,innerHeight*.45,18,['#7DD3FC','#DFF6FF','#F5C451']);});
    next.onclick=()=>api.go(4);render();
    api.aiPanel(sec,{prompts:['这个功能真的对应他的需要吗？','一个部件怎样同时做两件事？','它会不会让操作更复杂？','如果用户听不清/看不清，怎么办？']});
  }},
  {a:'04',name:'真实边界',time:'',html:`
<div class="ch-head"><div class="act"><b>04</b><span>真实边界</span></div><h2>好创意，<em>也要经得起真实场景</em></h2><p>选一个最可能发生的边界，再选一个补救。看看用户在实际使用中会不会卡住。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 属性关联</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">边界 <b data-risk-label>—</b></span></div>
<div class="st-split">
  <div class="st-scene st-boundary-scene">
    <div class="st-spotlight"></div>
    <div class="st-boundary-warning" data-warning></div>
    <div class="st-avatar" data-avatar>👴</div>
    <div class="st-product-icon" data-product>💊</div>
    <div class="st-speech" data-speech>先选一个边界，看看用户会说什么。</div>
  </div>
  <div class="st-side">
    <div class="st-risk-grid" data-risks>${Object.entries(RISKS).map(([k,r])=>'<button class="st-risk" data-risk="'+k+'">⚠️ '+r.label+'</button>').join('')}</div>
    <div class="st-fix-grid" data-fixes><button class="st-fix" data-fix="hear">💡 灯光 + 震动</button><button class="st-fix" data-fix="tech">🔘 一键按钮 + 大字</button><button class="st-fix" data-fix="forget">📝 自动记录 + 通知家人</button><button class="st-fix" data-fix="vision">🔊 大字面板 + 语音</button></div>
    <div class="st-boundary-result" data-result>先选边界，再选补救。</div>
    <div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>属性关联：<em>如果用户听不清，就换成灯光/震动；如果他不会用手机，就只留一个按钮。</em></div></div>
    <div class="st-actions"><button class="btn primary" data-go="5" disabled data-next>去画产品概念 →</button><span class="hint">选边界 + 补救</span></div>
  </div>
</div>`,init(sec,api){
    const S=api.S;const key=S.user||'grandpa';const U=USERS[key];S.risk=S.risk||'';S.fix=S.fix||'';
    const av=sec.querySelector('[data-avatar]'),sp=sec.querySelector('[data-speech]'),warning=sec.querySelector('[data-warning]'),res=sec.querySelector('[data-result]'),next=sec.querySelector('[data-next]'),rl=sec.querySelector('[data-risk-label]'),xp=sec.querySelector('[data-xp]'),product=sec.querySelector('[data-product]');
    av.textContent=U.emoji; product.textContent=({grandpa:'💊',classmate:'🎒',mom:'👜',teacher:'🧰'})[key]||'📦';
    function render(){sec.querySelectorAll('[data-risk]').forEach(b=>b.classList.toggle('on',b.dataset.risk===S.risk));sec.querySelectorAll('[data-fix]').forEach(b=>b.classList.toggle('on',b.dataset.fix===S.fix));if(S.risk)rl.textContent=RISKS[S.risk].label;if(S.risk&&S.fix){const match=RISKS[S.risk].fix===S.fix;S.boundaryResult=match?RISKS[S.risk].result:'这个补救不完全对应这个边界；再想想用户真正卡在哪里。';res.innerHTML='<b style="color:'+(match?'var(--teal)':'#FFB3A8')+'">'+(match?'边界测试通过':'需要再想')+'</b><br>'+S.boundaryResult;next.disabled=false;warning.classList.toggle('on',!match);}else{res.textContent='先选边界，再选补救。';next.disabled=true;warning.classList.remove('on');}xp.textContent=S.xp||0;}
    sec.querySelectorAll('[data-risk]').forEach(b=>b.onclick=()=>{S.risk=b.dataset.risk;S.fix='';api.save();sp.textContent=RISKS[S.risk].speech;sp.classList.remove('on');void sp.offsetWidth;sp.classList.add('on');render();api.sfx('tap');});
    sec.querySelectorAll('[data-fix]').forEach(b=>b.onclick=()=>{S.fix=b.dataset.fix;api.save();render();if(RISKS[S.risk]&&RISKS[S.risk].fix===S.fix){api.sfx('success');api.burst(innerWidth*.5,innerHeight*.45,18,['#4FE0D0','#F5C451','#DFF6FF']);}else api.sfx('error');});
    next.onclick=()=>api.go(5);render();
    api.aiPanel(sec,{prompts:['如果用户听不清，提醒还能用吗？','如果他不会用手机，怎么办？','如果他忘记按确认，会怎样？','还有哪个真实场景会卡住？']});
  }},
  {a:'05',name:'产品概念图',time:'',html:`
<div class="ch-head"><div class="act"><b>05</b><span>产品概念图</span></div><h2>把用户的需要，<em>画成一张产品图</em></h2><p>选 2–3 个真正需要的模块，写清楚它叫什么、为谁、怎样工作。最后画一画。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 设计</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">模块 <b data-mcount>0</b>/4</span></div>
<div class="st-blueprint">
  <div class="st-blueprint-canvas">
    <div class="bp-label">PRODUCT CONCEPT BOARD · 拖模块到四个槽位</div>
    <div class="st-bp-obj" data-bp-obj>${FXMStudio.wrap('cup')}</div>
    <div class="st-slot" data-slot="0"><span>＋</span>模块 1</div><div class="st-slot" data-slot="1"><span>＋</span>模块 2</div><div class="st-slot" data-slot="2"><span>＋</span>模块 3</div><div class="st-slot" data-slot="3"><span>＋</span>模块 4</div>
  </div>
  <aside class="st-spec">
    <h4>产品规格</h4>
    <div class="field"><label>产品名称</label><input data-f="name" maxlength="24" placeholder="例如：记得药盒"></div>
    <div class="field"><label>解决什么问题</label><textarea data-f="problem" maxlength="80" placeholder="用户最需要的那件事"></textarea></div>
    <div class="field"><label>给谁用</label><input data-f="user" maxlength="30" placeholder="你的采访对象"></div>
    <div class="field"><label>怎样工作</label><textarea data-f="how" maxlength="80" placeholder="一个部件怎样做两件事？"></textarea></div>
    <div class="field"><label>材料 / 成本</label><input data-f="cost" maxlength="40" placeholder="纸板、旧物、低成本…"></div>
    <div class="field"><label>还没解决</label><input data-f="limit" maxlength="40" placeholder="真实说明：还做不到什么"></div>
    <div class="st-mini-draw"><div class="draw-head"><span>手绘 · 可选</span><span data-draw-state>未开始</span></div><canvas data-draw width="600" height="300"></canvas></div>
    <div class="st-module-tray" data-modules></div>
    <div style="display:flex;gap:7px;flex-wrap:wrap;margin-top:4px"><button class="btn primary sm" data-gen>生成产品方案 →</button><button class="btn ghost sm" data-go="6" data-next>去发布 →</button></div>
  </aside>
</div>`,init(sec,api){
    const S=api.S;S.design=S.design||{};S.modules=S.modules||[];
    const MODS=[{id:'lamp',label:'提醒灯',icon:'💡'},{id:'big',label:'大字面板',icon:'🔠'},{id:'button',label:'一键按钮',icon:'🔘'},{id:'pill',label:'药格',icon:'💊'},{id:'notify',label:'通知家人',icon:'📣'},{id:'clip',label:'佩戴夹',icon:'🖇️'}];
    const bp=sec.querySelector('[data-bp-obj]');bp.innerHTML=FXMStudio.wrap(S.user==='grandpa'?'cup':S.user==='classmate'?'bag':S.user==='mom'?'bag':'umbrella');
    const draw=api.initDrawing(sec,url=>{S.drawing=url;api.save();sec.querySelector('[data-draw-state]').textContent='已保存';});if(S.drawing&&draw)draw.load(S.drawing);
    sec.querySelectorAll('[data-f]').forEach(el=>{const k=el.dataset.f;el.value=S.design[k]||'';el.addEventListener('input',()=>{S.design[k]=el.value;api.save();});});
    const slots=sec.querySelectorAll('[data-slot]'),tray=sec.querySelector('[data-modules]');let active='';
    function render(){slots.forEach((sl,i)=>{const m=S.modules[i]?MODS.find(x=>x.id===S.modules[i]):null;sl.classList.toggle('on',!!m);sl.innerHTML=m?('<span>'+m.icon+'</span>'+m.label):'<span>＋</span>模块 '+(i+1);});tray.innerHTML=MODS.map(m=>'<button class="st-module'+(active===m.id?' on':'')+'" draggable="true" data-mod="'+m.id+'">'+m.icon+' '+m.label+'</button>').join('');tray.querySelectorAll('[data-mod]').forEach(b=>{b.onclick=()=>{active=b.dataset.mod;render();};b.addEventListener('dragstart',e=>{try{e.dataTransfer.setData('text/plain',b.dataset.mod);}catch(err){}});});sec.querySelector('[data-mcount]').textContent=S.modules.length;sec.querySelector('[data-xp]').textContent=S.xp||0;}
    slots.forEach((sl,i)=>{sl.onclick=()=>{if(!active)api.toast('先选一个模块','＋');else{S.modules[i]=active;active='';api.save();render();api.sfx('pop');}};sl.addEventListener('dragover',e=>{e.preventDefault();sl.classList.add('over');});sl.addEventListener('dragleave',()=>sl.classList.remove('over'));sl.addEventListener('drop',e=>{e.preventDefault();sl.classList.remove('over');const id=e.dataTransfer.getData('text/plain');if(id){S.modules[i]=id;api.save();render();api.sfx('pop');}});});
    render();
    sec.querySelector('[data-gen]').onclick=()=>{const d=S.design;if(!d.name||!d.problem){api.toast('至少写下产品名称和问题','✏️');return;}api.previewSheet({title:'未来产品设计方案',subtitle:'第 06 章 · 给未来设计一件产品',code:'FXM-CUR-Q1-006',badge:'未来产品设计师',name:S.name||'小小产品设计师',date:new Date().toLocaleDateString('zh-CN'),filename:'未来产品设计方案_'+(S.name||'小小产品设计师'),stamp:'SIT 一专多能',lab:{chapter:'06',chapterTitle:'给未来设计一件产品',name:S.name||'小小产品设计师',product:d.name,problem:d.problem,how:d.how||d.user,improve:d.limit},fields:[{label:'用户',value:S.userName||''},{label:'最需要',value:S.need||''},{label:'功能',value:S.functionName||''},{label:'产品名称',value:d.name},{label:'解决的问题',value:d.problem},{label:'给谁用',value:d.user},{label:'怎样工作',value:d.how},{label:'还没解决',value:d.limit}],drawing:S.drawing,drawLabel:'我的产品概念图',footer:'采访 → 需要 → 功能 → 边界 → 设计'});};
    api.aiPanel(sec,{prompts:['这个模块真的对应用户的需要吗？','如果只能保留两个模块，你保留哪两个？','它会不会让操作更复杂？','你准备怎么测试它？']});
  }},
  {a:'06',name:'产品发布会',time:'',html:`
<div class="ch-head"><div class="act"><b>06</b><span>产品发布会</span></div><h2>用一分钟，<em>讲清楚“为谁设计”</em></h2><p>不是讲产品多酷，而是讲：为谁、解决什么、怎么用、还有什么没解决。</p></div>
<div class="stage-wrap"><div class="curtain l"></div><div class="curtain r"></div><div class="spot"></div><div class="stage-floor"></div>
  <div class="stage-content">
    <div class="stage-top"><span>未来产品发布会 · SIT DESIGN</span><span class="who" data-name>小小产品设计师</span></div>
    <div class="speech">
      <p class="lead">大家好，我是 <b data-name2>小小产品设计师</b>。</p>
      <p>我为 <b data-user>……</b> 设计了一件产品。</p>
      <p>他最需要的是：<b data-need>……</b></p>
      <p>我的产品叫：<b data-product>……</b></p>
      <p>它通过 <b data-how>……</b> 来帮助他。</p>
      <p>真实边界：<b data-boundary>……</b></p>
    </div>
    <div class="stage-controls"><div class="timer" data-timer><div class="mini-timer"><b data-timer-num>60</b><span>秒</span></div><div class="timer-btns"><button class="main" data-timer-start>开始 60 秒</button><button data-timer-reset>重置</button></div></div><div class="applause"><button class="applause-btn" data-clap>👏</button><div class="applause-meter"><div class="am-top"><span>掌声能量</span><b><span data-clap-count>0</span></b></div><div class="ambar"><i data-clap-bar></i></div></div></div><button class="btn ghost sm" data-go="7">领取徽章 →</button></div>
  </div>
</div>
<div class="st-audience" data-audience><span>🧒</span><span>👧</span><span>🧑</span><span>👦</span><span>👩</span></div>
<div class="ch-foot-note">真实说明“还有什么没解决”，会让别人更愿意相信你。</div>`,init(sec,api){
    const S=api.S;const name=S.name||'小小产品设计师';const set=(s,v)=>{const el=sec.querySelector(s);if(el)el.textContent=v||'……';};
    set('[data-name]',name);set('[data-name2]',name);set('[data-user]',S.userName);set('[data-need]',S.need);set('[data-product]',(S.design&&S.design.name)||'');set('[data-how]',(S.design&&S.design.how)||S.featureText);set('[data-boundary]',S.boundaryResult);
    api.timer(sec,{seconds:60,onEnd:()=>api.toast('时间到，谢谢大家的聆听','⏰')});let energy=0,count=0;const aud=sec.querySelector('[data-audience]');sec.querySelector('[data-clap]').onclick=()=>{energy=Math.min(100,energy+7);count++;sec.querySelector('[data-clap-count]').textContent=count;sec.querySelector('[data-clap-bar]').style.width=energy+'%';aud.classList.remove('clap');void aud.offsetWidth;aud.classList.add('clap');api.sfx('pop');api.burst(innerWidth*.5,innerHeight*.55,10,['#7DD3FC','#DFF6FF','#F5C451']);};
  }},
  c2badge({...c,a:'07',name:'未来产品设计师徽章',h2:'你为一个人，<em>设计了一件真正有用的产品</em>',p:'你采访了真实用户，提炼出最需要的一件事；用 SIT 一专多能把它变成一个功能；又用属性关联检查了真实边界。',journey:[['🧑','用户','选一个真实的人'],['👂','采访','听他说哪里不方便'],['⚙️','功能','一个部件做两件事'],['🧭','边界','真实场景还能用吗']],reflect:['你采访到的，和你原来以为的一样吗？','你的产品真的解决了“他最需要的那件事”吗？','如果只能保留一个功能，你保留哪个？为什么？'],homeworkTitle:'再采访一个用户',homework:'把今天的产品方案给另一位家人看，问他：“你会用吗？哪里看不懂？”记录一条反馈。',certLabel:'下载产品方案',certTitle:'未来产品设计方案',certFields:[['用户','userName'],['最需要','need'],['功能','functionName'],['产品名称','name'],['怎样工作','how'],['真实边界','boundaryResult']],quote:'“从‘我想做什么’，走向‘别人需要什么’，是创新者很重要的一步。”',prev:6,actNotes:c.actNotes})
].map(a=>a);
window.FXM_CHAPTERS['6']={...c,cover:c2cover(c),notes:c2notes(c)};
})();

/* =========================================================
   第 07 章《创意PK：哪个方案更好？》· SIT 纸结构竞技场
   ========================================================= */
(function(){
const c={
  no:'07',title:'创意PK：哪个方案更好？',short:'创意PK',badge:'创意评估师',phase:'奇思妙想',
  acc:'#F472B6',acc2:'#FFD9EC',rgb:'244,114,182',icon:'🏟️',words:['复制','测试','证据','选择'],
  coverTitle:'创意PK',coverLine:'哪个方案更好？',lead:'三种纸结构，谁更稳？<br>不靠“我觉得”，靠<b style="color:var(--gold2);font-weight:600">SIT 乘法</b>做升级，再让测试结果说话。',
  ability:'SIT 乘法 · 测试证据 · 方案比较',cta:'进入纸结构竞技场',
  chapterNote:'本章用 SIT 乘法做方案升级：复制一个部件，再让复制品变得不一样。然后用统一的承重测试收集证据，按多个维度比较，而不是凭喜好选。',
  teacherRole:'不要只问“谁赢了”。带孩子看：哪种结构表现最好？为什么？哪种更简单？哪种更省材料？结论是猜的，还是测出来的？',
  actNotes:[
    {goal:'理解竞技场任务：三种纸结构，用统一规则测试。',qs:['“这三种结构最大的不同是什么？”','“怎样保证测试公平？”','“什么情况算失败？”'],tip:'先看三种结构，不要急着说谁最好。'},
    {goal:'用 SIT 乘法：复制一个部件，再让复制品变得不一样。',qs:['“复制哪一层/哪条腿/哪道折？”','“复制品和原来的有什么不同？”','“它为什么可能更稳？”'],tip:'乘法不是简单叠加；复制后必须做一点改变。'},
    {goal:'用“加一块积木”测试三种结构，记录承重结果。',qs:['“它从第几块开始变形？”','“它是怎么倒的？”','“这个结果能说明什么、不能说明什么？”'],tip:'同样的纸、同样的积木、同样的放置方式；第一轮不排名。'},
    {goal:'用五个维度比较三种方案，做出有理由的选择。',qs:['“功能、制作、材料、安全、可测试，各打几星？”','“总分最高就一定最适合吗？”'],tip:'可以选总分不是最高的方案，只要能说出理由。'},
    {goal:'把测试结果和选择理由整理成一份证据报告。',qs:['“你的结论是猜的，还是测出来的？”','“这次测试有什么局限？”'],tip:'报告不需要长，但要看得出“证据 → 判断”。'},
    {goal:'用一分钟讲清楚三个方案、测试结果和选择理由。',qs:['“你原来最看好哪个？”','“测试后还是它吗？”'],tip:'可以拿着结构图或数据说；允许讲失败。'},
    {goal:'回顾 SIT 乘法与证据比较，颁发创意评估师徽章。',qs:['“乘法帮你做出了什么不同？”','“哪条证据最影响你的选择？”'],tip:'比较报告可下载/存入实验室。'}
  ],
  acts:[]
};
c.acts=[
  {a:'01',name:'纸结构竞技场',time:'',html:`
<div class="ch-head"><div class="act"><b>01</b><span>纸结构竞技场</span></div><h2>三种结构，<em>先别急着说谁最好</em></h2><p>同样的纸、同样的积木，三种结构。选一个你最想先升级的方案，再用测试结果说话。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 乘法</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">已选 <b data-choice>—</b></span></div>
<div class="st-arena-grid" data-arena>
  <button class="st-arena-card" data-struct="A"><div class="st-paper type-a mini"></div><b>方案 A · 简单开放</b><small>折成开口盒子，制作快，但承重一般。</small></button>
  <button class="st-arena-card" data-struct="B"><div class="st-paper type-b mini"></div><b>方案 B · 分层加固</b><small>多层纸板 + 加宽底部，更稳，但用料多。</small></button>
  <button class="st-arena-card" data-struct="C"><div class="st-paper type-c mini"></div><b>方案 C · 折叠三角</b><small>三角支撑，省材料，但制作要精细。</small></button>
</div>
<div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>别急着说“B 看起来最稳”。<em>先选一个方案，再用 SIT 乘法给它做一次升级。</em></div></div>
<div class="st-actions"><button class="btn primary" data-go="2" disabled data-next>给它做乘法升级 →</button><span class="hint">先选一个方案</span></div>
<div class="st-tip-strip"><div><b>同样的纸</b><span>每组用同样数量的纸和胶带。</span></div><div><b>同样的积木</b><span>用同一种轻质积木，逐个放。</span></div><div><b>同样的放法</b><span>放在同一位置，不用手扶。</span></div></div>`,init(sec,api){
    const S=api.S;S.xp=S.xp||0;const next=sec.querySelector('[data-next]'),ch=sec.querySelector('[data-choice]'),xp=sec.querySelector('[data-xp]'),say=sec.querySelector('.st-coach .say');const N={A:'方案 A · 简单开放',B:'方案 B · 分层加固',C:'方案 C · 折叠三角'};
    function render(){sec.querySelectorAll('[data-struct]').forEach(b=>b.classList.toggle('on',b.dataset.struct===S.structChoice));if(S.structChoice){ch.textContent=N[S.structChoice];next.disabled=false;say.innerHTML='<b>发小明：</b>你选了 <em>'+N[S.structChoice]+'</em>。下一步，复制它的一个部件，再做一个改变。';}xp.textContent=S.xp;}
    sec.querySelectorAll('[data-struct]').forEach(b=>b.onclick=()=>{S.structChoice=b.dataset.struct;S.structName=N[b.dataset.struct];S.copy='';S.copyName='';S.results={};S.testKey='';S.testCount=0;S.compare={};S.choice='';api.save();render();api.sfx('pop');api.burst(innerWidth*.5,innerHeight*.45,16,['#F472B6','#FFD9EC','#F5C451']);});
    next.onclick=()=>api.go(2);render();
    api.aiPanel(sec,{prompts:['这三种结构最大的不同是什么？','哪一种最容易做？','哪一种可能最稳？','怎样保证测试公平？']});
  }},
  {a:'02',name:'SIT 乘法',time:'',html:`
<div class="ch-head"><div class="act"><b>02</b><span>SIT 乘法</span></div><h2>复制一个部件，<em>再让它不一样</em></h2><p>乘法不是“多加一点”。复制一个部件，然后改变它的位置、方向或大小，看看会不会出现新的结构。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 乘法</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">升级 <b data-copy>—</b></span></div>
<div class="st-split">
  <div class="st-scene st-struct-stage">
    <div class="st-paper type-a" data-big-paper></div>
    <div class="st-spotlight"></div>
  </div>
  <div class="st-side">
    <div class="st-function-grid" data-copies>
      <button class="st-function-card" data-copy-opt="layer"><b>复制一层</b>多加一层纸板，错开粘，增加厚度。</button>
      <button class="st-function-card" data-copy-opt="leg"><b>复制一条腿</b>多一条支撑腿，改变位置，增加支撑点。</button>
      <button class="st-function-card" data-copy-opt="fold"><b>复制一道折</b>再加一道折痕，方向相反，增加三角支撑。</button>
    </div>
    <div class="st-feature" data-copy-feature>选一个“复制 + 改变”，看看结构会变成什么样。</div>
    <div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>乘法 = 复制一个部件 + 做一个有意义的改变。<em>只是重复，不算乘法。</em></div></div>
    <div class="st-actions"><button class="btn primary" data-go="3" disabled data-next>去承重测试 →</button><span class="hint">先选一个升级</span></div>
  </div>
</div>`,init(sec,api){
    const S=api.S;S.copy=S.copy||'';const paper=sec.querySelector('[data-big-paper]'),feat=sec.querySelector('[data-copy-feature]'),next=sec.querySelector('[data-next]'),cp=sec.querySelector('[data-copy]'),xp=sec.querySelector('[data-xp]');const type=S.structChoice||'A';paper.className='st-paper type-'+type.toLowerCase();
    const C={layer:{label:'复制一层',text:'复制一层纸板，错开粘：厚度增加，但重量也增加。'},leg:{label:'复制一条腿',text:'复制一条支撑腿，换一个位置：支撑点变多，底部更稳。'},fold:{label:'复制一道折',text:'复制一道折痕，方向相反：出现三角支撑，抗变形更强。'}};
    function render(){paper.className='st-paper type-'+type.toLowerCase()+(S.copy?' upgraded':'');paper.innerHTML=S.copy?('<i class="st-copy-mark copy-'+S.copy+'"></i>'):'';sec.querySelectorAll('[data-copy-opt]').forEach(b=>b.classList.toggle('on',b.dataset.copyOpt===S.copy));if(S.copy){cp.textContent=C[S.copy].label;feat.innerHTML='<b>'+C[S.copy].label+'：</b>'+C[S.copy].text+'<br><span style="color:var(--faint)">测试时，选中的方案会获得 +1 块承重加成。</span>';next.disabled=false;}xp.textContent=S.xp||0;}
    sec.querySelectorAll('[data-copy-opt]').forEach(b=>b.onclick=()=>{S.copy=b.dataset.copyOpt;S.copyName=C[b.dataset.copyOpt].label;S.xp=(S.xp||0)+10;api.save();render();api.sfx('success');api.burst(innerWidth*.6,innerHeight*.5,16,['#F472B6','#FFD9EC','#F5C451']);});
    next.onclick=()=>api.go(3);render();
    api.aiPanel(sec,{prompts:['你复制了哪个部件？','复制品和原来的有什么不同？','它为什么可能更稳？','它会不会让制作更难/更重？']});
  }},
  {a:'03',name:'承重测试',time:'',html:`
<div class="ch-head"><div class="act"><b>03</b><span>承重测试</span></div><h2>同样的纸，<em>让测试结果说话</em></h2><p>三种结构都要测。点“加一块”或“自动测试”，记录每种结构能承受几块积木。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 证据</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">已测 <b data-done>0</b>/3</span></div>
<div class="st-split">
  <div class="st-scene st-struct-stage">
    <div class="st-spotlight"></div>
    <div class="st-block-stack" data-blocks></div>
    <div class="st-paper type-a" data-test-paper></div>
  </div>
  <div class="st-side">
    <div class="st-test-tabs" data-tabs><button class="st-test-tab on" data-test-key="A">A 简单开放</button><button class="st-test-tab" data-test-key="B">B 分层加固</button><button class="st-test-tab" data-test-key="C">C 折叠三角</button></div>
    <div class="st-test-readout" data-readout>选一个结构，开始加积木。</div>
    <div class="st-actions"><button class="btn primary sm" data-add>＋ 加一块</button><button class="btn ghost sm" data-auto>自动测试</button><button class="btn ghost sm" data-go="4" data-next disabled>去比较 →</button></div>
    <div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>测试不是“成功/失败”的判决。看两件事：<em>它从第几块开始变形？它是怎么倒的？</em></div></div>
  </div>
</div>
<div class="ch-foot-note">测试结果只代表这次测试。换一种纸、换一个放法，结果可能不同。</div>`,init(sec,api){
    const S=api.S;S.results=S.results||{};S.testKey=S.testKey||S.structChoice||'A';S.testCount=S.testCount||0;const N={A:'简单开放',B:'分层加固',C:'折叠三角'};const CAP={A:2,B:6,C:4};const paper=sec.querySelector('[data-test-paper]'),blocks=sec.querySelector('[data-blocks]'),read=sec.querySelector('[data-readout]'),done=sec.querySelector('[data-done]'),next=sec.querySelector('[data-next]'),xp=sec.querySelector('[data-xp]');let timer=null;
    function cap(k){return CAP[k]+(S.structChoice===k&&S.copy?1:0);}
    function render(){const k=S.testKey;paper.className='st-paper type-'+k.toLowerCase()+(S.results[k]!=null?' collapse':'');paper.innerHTML=(S.structChoice===k&&S.copy)?('<i class="st-copy-mark copy-'+S.copy+'"></i>'):'';const n=S.results[k]!=null?S.results[k]:S.testCount;blocks.innerHTML=Array.from({length:n},(_,i)=>'<span class="st-block'+(S.results[k]!=null&&i>=cap(k)-1?' fall':'')+'" style="--bx:'+((i%2?1:-1)*(10+i*2))+'px;--br:'+((i%2?1:-1)*(25+i*6))+'deg"></span>').join('');sec.querySelectorAll('[data-test-key]').forEach(b=>{b.classList.toggle('on',b.dataset.testKey===k);b.classList.toggle('done',S.results[b.dataset.testKey]!=null);});done.textContent=Object.keys(S.results).length;xp.textContent=S.xp||0;next.disabled=Object.keys(S.results).length<3;if(S.results[k]!=null){read.innerHTML='<b>'+k+' · '+N[k]+'</b>：承受 '+S.results[k]+' 块（加成 '+((S.structChoice===k&&S.copy)?1:0)+'）<br><span style="color:var(--faint)">倒塌位置/原因：底部或连接处开始变形。</span>';}else{read.innerHTML='<b>'+k+' · '+N[k]+'</b>：还没有测试。当前 '+S.testCount+' 块。';}}
    function collapse(){clearInterval(timer);S.results[S.testKey]=S.testCount;S.xp=(S.xp||0)+10;api.save();api.sfx('error');api.burst(innerWidth*.42,innerHeight*.5,24,['#FF7A6B','#F472B6','#F5C451']);render();api.toast(S.testKey+' 结构在第 '+S.testCount+' 块时变形了','🧱');}
    function add(){if(S.results[S.testKey]!=null)return;const k=S.testKey;S.testCount++;if(S.testCount>cap(k)){S.testCount=cap(k);collapse();}else{api.save();render();api.sfx('tap');}}
    function auto(){if(S.results[S.testKey]!=null)return;if(timer)clearInterval(timer);timer=setInterval(()=>{if(!sec.isConnected){clearInterval(timer);return;}if(S.results[S.testKey]!=null||S.testCount>=cap(S.testKey)+1){clearInterval(timer);return;}add();},320);}
    sec.querySelectorAll('[data-test-key]').forEach(b=>b.onclick=()=>{S.testKey=b.dataset.testKey;S.testCount=S.results[S.testKey]!=null?S.results[S.testKey]:0;api.save();render();});
    sec.querySelector('[data-add]').onclick=add;sec.querySelector('[data-auto]').onclick=auto;
    next.onclick=()=>{clearInterval(timer);api.go(4);};
    render();
    api.aiPanel(sec,{prompts:['它从第几块开始变形？','它是怎么倒的？','这个结果能说明什么、不能说明什么？','哪种结构最省材料？']});
  }},
  c2compare({...c,a:'04',name:'五维比较',h2:'承重之外，<em>还要看什么？</em>',p:'给三个方案各打 1–3 星：解决问题、能做出来、材料容易、安全、可测试。没有绝对最高分，只有更适合。',options:[
    {t:'方案 A · 简单开放',d:'制作快，但承重一般。'},
    {t:'方案 B · 分层加固',d:'承重强，但用料多、制作慢。'},
    {t:'方案 C · 折叠三角',d:'省材料，但制作要精细。'}
  ],key:'choice',next:5,nextLabel:'写证据报告 →',critNote:'五个维度：解决问题 · 能做出来 · 材料容易 · 安全 · 可测试',foot:'不存在适用于所有场景的绝对最佳方案。',ai:['总分最高就一定最适合吗？','你选它，是因为证据，还是因为喜欢？','哪个方案最容易被复制？','如果材料减半，你选哪个？']}),
  {a:'05',name:'证据报告',time:'',html:`
<div class="ch-head"><div class="act"><b>05</b><span>证据报告</span></div><h2>把“测试”，<em>写成一份有证据的报告</em></h2><p>左边是测试结果，右边写你的判断。报告不需要长，但要能看出“证据 → 判断”。</p></div>
<div class="st-split">
  <div class="st-evidence">
    <h4>证据链 · EVIDENCE</h4>
    <div data-evrows>${['A','B','C'].map(k=>'<div class="st-ev-row"><b>'+k+'</b><span>'+({A:'简单开放',B:'分层加固',C:'折叠三角'}[k])+'</span><em data-ev="'+k+'">—</em></div>').join('')}</div>
    <div class="st-ev-note">测试结果只代表这次测试。还要看：制作难度、材料、安全、可测试性。</div>
  </div>
  <div class="st-spec">
    <h4>比较报告</h4>
    <div class="field" style="grid-column:1/-1"><label>要解决的问题</label><textarea data-f="problem" maxlength="80" placeholder="例如：怎样让纸结构承受更多重量？"></textarea></div>
    <div class="field" style="grid-column:1/-1"><label>三个方案 / 测试结果</label><textarea data-f="result" maxlength="100" placeholder="A 2块 / B 6块 / C 4块"></textarea></div>
    <div class="field"><label>我选哪个</label><input data-f="choice" maxlength="20" placeholder="A / B / C"></div>
    <div class="field"><label>为什么选它</label><input data-f="reason" maxlength="40" placeholder="不只是“喜欢”"></div>
    <div class="field" style="grid-column:1/-1"><label>下次想改进什么</label><input data-f="improve" maxlength="50" placeholder="如果再测一次…"></div>
    <div style="display:flex;gap:7px;flex-wrap:wrap;grid-column:1/-1;margin-top:4px"><button class="btn primary sm" data-gen>生成比较报告 →</button><button class="btn ghost sm" data-go="6" data-next>去发布 →</button></div>
  </div>
</div>
<div class="ch-foot-note">你的结论是猜的，还是测出来的？</div>`,init(sec,api){
    const S=api.S;S.design=S.design||{};const ev=sec.querySelector('[data-evrows]');sec.querySelectorAll('[data-f]').forEach(el=>{const k=el.dataset.f;el.value=S.design[k]||'';el.addEventListener('input',()=>{S.design[k]=el.value;api.save();});});
    function paint(){['A','B','C'].forEach(k=>{const n=sec.querySelector('[data-ev="'+k+'"]');if(n)n.textContent=S.results[k]!=null?S.results[k]+' 块':'—';});}paint();
    sec.querySelector('[data-gen]').onclick=()=>{const d=S.design;if(!d.problem||!d.choice){api.toast('至少写下问题和选择','🧾');return;}api.previewSheet({title:'创意方案比较报告',subtitle:'第 07 章 · 创意PK：哪个方案更好？',code:'FXM-CUR-Q1-007',badge:'创意评估师',name:S.name||'小小评估师',date:new Date().toLocaleDateString('zh-CN'),filename:'创意方案比较报告_'+(S.name||'小小评估师'),stamp:'SIT 乘法',lab:{chapter:'07',chapterTitle:'创意PK：哪个方案更好？',name:S.name||'小小评估师',product:d.choice?'选择 '+d.choice:'方案比较',problem:d.problem,how:d.reason,improve:d.improve},fields:[{label:'问题',value:d.problem},{label:'三个方案',value:'A 简单开放 / B 分层加固 / C 折叠三角'},{label:'测试结果',value:'A '+(S.results.A||'—')+' 块 / B '+(S.results.B||'—')+' 块 / C '+(S.results.C||'—')+' 块'},{label:'我的选择',value:d.choice},{label:'选择理由',value:d.reason},{label:'下一步',value:d.improve}],footer:'方案 → 测试 → 比较 → 选择'});};
    api.aiPanel(sec,{prompts:['你的结论是猜的，还是测出来的？','这次测试有什么局限？','如果材料减半，你选哪个？','还有没有更简单的办法？']});
  }},
  {a:'06',name:'创意PK发布会',time:'',html:`
<div class="ch-head"><div class="act"><b>06</b><span>创意PK发布会</span></div><h2>用一分钟，<em>讲清楚你的选择</em></h2><p>不是宣布“谁赢了”，而是说清楚：三个方案、测试结果、你的选择、选择理由。</p></div>
<div class="stage-wrap"><div class="curtain l"></div><div class="curtain r"></div><div class="spot"></div><div class="stage-floor"></div>
  <div class="stage-content">
    <div class="stage-top"><span>创意PK · 证据发布会</span><span class="who" data-name>小小评估师</span></div>
    <div class="speech">
      <p class="lead">大家好，我是 <b data-name2>小小评估师</b>。</p>
      <p>要解决的问题是：<b data-problem>……</b></p>
      <p>三个方案是：<b data-schemes>……</b></p>
      <p>测试结果：<b data-result>……</b></p>
      <p>我选择：<b data-choice>……</b>，因为 <b data-reason>……</b></p>
      <p>下次想改进：<b data-improve>……</b></p>
    </div>
    <div class="stage-controls"><div class="timer" data-timer><div class="mini-timer"><b data-timer-num>60</b><span>秒</span></div><div class="timer-btns"><button class="main" data-timer-start>开始 60 秒</button><button data-timer-reset>重置</button></div></div><div class="applause"><button class="applause-btn" data-clap>👏</button><div class="applause-meter"><div class="am-top"><span>掌声能量</span><b><span data-clap-count>0</span></b></div><div class="ambar"><i data-clap-bar></i></div></div></div><button class="btn ghost sm" data-go="7">领取徽章 →</button></div>
  </div>
</div>
<div class="st-audience"><span>🧒</span><span>👧</span><span>🧑</span><span>👦</span><span>👩</span></div>`,init(sec,api){
    const S=api.S;const name=S.name||'小小评估师';const d=S.design||{};const set=(s,v)=>{const el=sec.querySelector(s);if(el)el.textContent=v||'……';};set('[data-name]',name);set('[data-name2]',name);set('[data-problem]',d.problem);set('[data-schemes]','A 简单开放 / B 分层加固 / C 折叠三角');set('[data-result]','A '+(S.results.A||'—')+' 块 / B '+(S.results.B||'—')+' 块 / C '+(S.results.C||'—')+' 块');set('[data-choice]',d.choice);set('[data-reason]',d.reason);set('[data-improve]',d.improve);
    api.timer(sec,{seconds:60,onEnd:()=>api.toast('时间到，谢谢大家的聆听','⏰')});let energy=0,count=0;const aud=sec.querySelector('.st-audience');sec.querySelector('[data-clap]').onclick=()=>{energy=Math.min(100,energy+7);count++;sec.querySelector('[data-clap-count]').textContent=count;sec.querySelector('[data-clap-bar]').style.width=energy+'%';aud.classList.remove('clap');void aud.offsetWidth;aud.classList.add('clap');api.sfx('pop');};
  }},
  c2badge({...c,a:'07',name:'创意评估师徽章',h2:'你学会了用<em>证据</em>做选择',p:'你提出了三种结构，用 SIT 乘法升级了一个方案，用统一的承重测试收集证据，再按多个维度比较，做出有理由的选择。',journey:[['🧱','结构','三种方案'],['✖️','乘法','复制 + 改变'],['🧪','测试','加积木记录'],['🧾','证据','比较后选择']],reflect:['你原来最看好的方案，测试后还是它吗？','总分最高的方案，一定最适合吗？','这次测试有什么局限？'],homeworkTitle:'在家做一次小比较',homework:'用两张纸做两种不同结构，放同样的小物品，记录哪一种更稳，并写下“为什么”。',certLabel:'下载比较报告',certTitle:'创意方案比较报告',certFields:[['问题','problem'],['测试结果','result'],['我的选择','choice'],['选择理由','reason'],['下一步','improve']],quote:'“创意可以大胆，但判断创意时，要尊重事实和证据。”',prev:6,actNotes:c.actNotes})
].map(a=>a);
window.FXM_CHAPTERS['7']={...c,cover:c2cover(c),notes:c2notes(c)};
})();

/* =========================================================
   第 08 章《让别人看懂我的创意》· SIT 除法故事板
   ========================================================= */
(function(){
const PROJECTS={
  umbrella:{name:'肩带伞扣',icon:'☂️',problem:'下雨时一只手拿伞，另一只手还要拿书包和饭盒，很不方便。',user:'上学的孩子、通勤的成年人',design:'一个可以固定在书包肩带上的伞扣，让雨伞自己站住。',how:'把伞柄卡进肩带夹，调整角度，让伞面遮住头和书包。',value:'解放双手，雨天走路更安全，也能腾出手拿东西。'},
  pillbox:{name:'记得药盒',icon:'💊',problem:'爷爷总忘记吃药，药盒上的字太小，看不清。',user:'爷爷、奶奶等需要按时服药的老人',design:'一个会发光、会发声、字很大的提醒药盒。',how:'到时间亮灯 + 发声；按一下大按钮确认；忘记确认就通知家人。',value:'减少漏药、重复吃药，让家人更放心。'},
  penbox:{name:'分类笔筒',icon:'✏️',problem:'文具混在一起，找橡皮要翻半天。',user:'同学、我自己',design:'一个带分隔和颜色标记的笔筒。',how:'不同格子放不同文具，颜色对应类别，一眼找到。',value:'桌面更整齐，找东西更快。'},
  mine:{name:'我的想法',icon:'✨',problem:'',user:'',design:'',how:'',value:''}
};
const BEATS=[['problem','问题','❓','我发现了什么问题？'],['user','用户','🧑','谁需要解决？'],['design','方案','🛠️','我设计了什么？'],['how','原理','⚙️','它怎样工作？'],['value','价值','✨','它能带来什么价值？']];
const c={
  no:'08',title:'让别人看懂我的创意',short:'看懂创意',badge:'少年创新提案人',phase:'奇思妙想',
  acc:'#A78BFA',acc2:'#E9DEFF',rgb:'167,139,250',icon:'🎬',words:['分镜','顺序','故事','表达'],
  coverTitle:'让别人',coverLine:'看懂我的创意',lead:'一个好创意，如果别人听不懂，就很难获得支持。<br>用 <b style="color:var(--gold2);font-weight:600">SIT 除法</b>把它拆成五格分镜，再讲成一个故事。',
  ability:'SIT 除法 · 故事板 · 公开表达',cta:'进入故事板工作室',
  chapterNote:'本章用 SIT 除法：把一个创意拆成“问题—用户—方案—原理—价值”五格，再按顺序讲成一个别人能听懂的故事。重点不是写长文，而是每一格只回答一个问题。',
  teacherRole:'不要替孩子写提案。用五格分镜追问，让他自己把话说清楚；真实说明“还有什么没解决”，比假装完美更重要。',
  actNotes:[
    {goal:'选一个要讲清楚的创意，进入故事板工作室。',qs:['“你最想让别人记住哪个创意？”','“它解决了谁的问题？”','“你手上有设计图/原型吗？”'],tip:'可以选前几章的作品，也可以选“我的想法”从零开始。'},
    {goal:'用 SIT 除法把提案拆成五格，并排成别人能听懂的顺序。',qs:['“先讲问题，还是先讲产品？”','“哪一格是地基？”','“价值应该放在哪里？”'],tip:'拖动或点两步交换；排对后讨论“为什么是这个顺序”。'},
    {goal:'给五格分镜各写一句话，形成一条完整故事线。',qs:['“这一格只回答一个问题吗？”','“用户是谁？他为什么需要？”','“它怎样工作？”'],tip:'每格 1–2 句就够；先写关键词，再补完整。'},
    {goal:'用一分钟看着分镜讲故事，并回应一个同伴问题。',qs:['“你最想让别人记住哪一句？”','“如果别人问‘真的有用吗’，你怎么答？”'],tip:'可以看着屏幕说，不要求背稿；先理解，再建议。'},
    {goal:'根据同伴反馈，选一个最值得改的地方。',qs:['“哪一条反馈最值得改？”','“下一步最想验证什么？”'],tip:'反馈不是否定；选一条能马上改的。'},
    {goal:'回顾 SIT 除法与故事板表达，颁发少年创新提案人徽章。',qs:['“哪一格最难讲清楚？”','“下一次，你想把哪一格讲得更好？”'],tip:'提案可下载/存入实验室；用路演大师继续。'}
  ],
  acts:[]
};
c.acts=[
  {a:'01',name:'故事板工作室',time:'',html:`
<div class="ch-head"><div class="act"><b>01</b><span>故事板工作室</span></div><h2>一个好创意，<em>先拆成五格</em></h2><p>别人听不懂，往往不是想法不好，而是没有按“问题—用户—方案—原理—价值”讲清楚。选一个创意，开始分镜。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 除法</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">已选 <b data-project>—</b></span></div>
<div class="st-user-grid" data-projects>
  <button class="st-user-card" data-p="umbrella"><span>☂️</span><b>肩带伞扣</b><small>下雨时解放双手</small></button>
  <button class="st-user-card" data-p="pillbox"><span>💊</span><b>记得药盒</b><small>提醒爷爷吃药</small></button>
  <button class="st-user-card" data-p="penbox"><span>✏️</span><b>分类笔筒</b><small>文具一眼找到</small></button>
  <button class="st-user-card" data-p="mine"><span>✨</span><b>我的想法</b><small>从零开始写</small></button>
</div>
<div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>故事板不是“写作文”。<em>五格，每格只回答一个问题。</em>别人跟着五格走，就能听懂你的创意。</div></div>
<div class="st-actions"><button class="btn primary" data-go="2" disabled data-next>开始分镜 →</button><span class="hint">先选一个创意</span></div>
<div class="st-tip-strip"><div><b>01 问题</b><span>先让人看见“哪里不方便”。</span></div><div><b>02 用户</b><span>说清楚“谁需要”。</span></div><div><b>03 价值</b><span>最后让人记住“为什么值得”。</span></div></div>`,init(sec,api){
    const S=api.S;S.xp=S.xp||0;const p=sec.querySelector('[data-project]'),next=sec.querySelector('[data-next]'),xp=sec.querySelector('[data-xp]'),say=sec.querySelector('.st-coach .say');
    function render(){sec.querySelectorAll('[data-p]').forEach(b=>b.classList.toggle('on',b.dataset.p===S.project));if(S.project){p.textContent=PROJECTS[S.project].name;next.disabled=false;say.innerHTML='<b>发小明：</b>你选了 <em>'+PROJECTS[S.project].name+'</em>。下一步，把五格排成一条别人能听懂的线。';}xp.textContent=S.xp;}
    sec.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{S.project=b.dataset.p;S.projectName=PROJECTS[S.project].name;S.panels=Object.assign({},PROJECTS[S.project]);S.problem=S.panels.problem||'';S.user=S.panels.user||'';S.designName=S.panels.design||'';S.how=S.panels.how||'';S.value=S.panels.value||'';S.order=['value','problem','how','user','design'];S.feedback='';api.save();render();api.sfx('pop');api.burst(innerWidth*.5,innerHeight*.4,16,['#A78BFA','#E9DEFF','#F5C451']);});
    next.onclick=()=>api.go(2);render();
    api.aiPanel(sec,{prompts:['你最想让别人记住哪个创意？','它解决了谁的问题？','你手上有设计图/原型吗？','哪一格最难讲清楚？']});
  }},
  {a:'02',name:'SIT 除法',time:'',html:`
<div class="ch-head"><div class="act"><b>02</b><span>SIT 除法</span></div><h2>把创意拆成五格，<em>再排成一条线</em></h2><p>下面五格被打乱了。拖动或点两步交换，排成“问题 → 用户 → 方案 → 原理 → 价值”。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 除法</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">顺序 <b data-ok>未完成</b></span></div>
<div class="st-filmstrip" data-order></div>
<div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>除法不是“切碎”，而是<em>把整体拆成有顺序的部分</em>。先讲问题，别一上来就讲产品。</div></div>
<div class="st-actions"><button class="btn primary" data-go="3" disabled data-next>去填五格 →</button><span class="hint">排对后继续</span></div>`,init(sec,api){
    const S=api.S;S.order=S.order||['value','problem','how','user','design'];const ORDER=BEATS.map(b=>b[0]);const box=sec.querySelector('[data-order]'),next=sec.querySelector('[data-next]'),ok=sec.querySelector('[data-ok]'),xp=sec.querySelector('[data-xp]');let selected=null;
    function render(){box.innerHTML='';S.order.forEach((k,i)=>{const b=BEATS.find(x=>x[0]===k);const card=document.createElement('button');card.className='st-frame'+(ORDER[i]===k?' correct':'');card.draggable=true;card.dataset.key=k;card.innerHTML='<span class="fnum">0'+(i+1)+'</span><span class="fic">'+b[2]+'</span><span class="ft">'+b[1]+'</span><span class="fx">'+b[3]+'</span><span class="fcheck">✓</span>';box.appendChild(card);});
      box.querySelectorAll('.st-frame').forEach((el,i)=>{el.onclick=()=>{if(selected==null){selected=i;el.style.borderColor='var(--violet)';return;}const j=selected;selected=null;const t=S.order[i];S.order[i]=S.order[j];S.order[j]=t;api.save();render();api.sfx('tap');};el.addEventListener('dragstart',e=>{selected=i;try{e.dataTransfer.setData('text/plain',String(i));}catch(err){}el.classList.add('dragging');});el.addEventListener('dragend',()=>el.classList.remove('dragging'));el.addEventListener('dragover',e=>e.preventDefault());el.addEventListener('drop',e=>{e.preventDefault();const from=+(e.dataTransfer.getData('text/plain')||selected);if(from==null||from===i)return;const t=S.order[i];S.order[i]=S.order[from];S.order[from]=t;selected=null;api.save();render();api.sfx('pop');});});
      const good=S.order.every((k,i)=>ORDER[i]===k);next.disabled=!good;ok.textContent=good?'正确 ✓':'未完成';ok.style.color=good?'var(--teal)':'';if(good)api.sfx('chime');xp.textContent=S.xp||0;}
    render();next.onclick=()=>api.go(3);
    api.aiPanel(sec,{prompts:['先讲问题，还是先讲产品？','哪一格是地基？','价值为什么放在最后？','如果只能保留三格，你保留哪三格？']});
  }},
  {a:'03',name:'填五格分镜',time:'',html:`
<div class="ch-head"><div class="act"><b>03</b><span>填五格分镜</span></div><h2>每一格，<em>只回答一个问题</em></h2><p>点一格，写下 1–2 句话。五格连起来，就是你的故事线。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 分镜</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">完成 <b data-filled>0</b>/5</span></div>
<div class="st-filmstrip" data-strip></div>
<div class="st-frame-editor">
  <div class="st-spec" style="display:block">
    <h4 data-editor-title>第 1 格 · 问题</h4>
    <div class="field"><label>这一格写什么</label><textarea data-panel-text maxlength="90" placeholder="用 1–2 句话回答这一格的问题。"></textarea></div>
    <div class="field"><label>关键词 / 画面</label><input data-panel-key maxlength="30" placeholder="例如：雨天、双手拿满、伞扣"></div>
    <div style="display:flex;gap:7px;flex-wrap:wrap"><button class="btn primary sm" data-save>保存这一格 →</button><button class="btn ghost sm" data-go="4" data-next>去发布 →</button></div>
  </div>
  <div class="peek" data-peek><b>故事线预览</b><br>点一格，开始写。</div>
</div>
<div class="ch-foot-note">先把五格写清楚，再想“怎么讲得漂亮”。</div>`,init(sec,api){
    const S=api.S;S.panels=S.panels||{};S.activePanel=S.activePanel||'problem';const strip=sec.querySelector('[data-strip]'),title=sec.querySelector('[data-editor-title]'),ta=sec.querySelector('[data-panel-text]'),key=sec.querySelector('[data-panel-key]'),filled=sec.querySelector('[data-filled]'),peek=sec.querySelector('[data-peek]'),next=sec.querySelector('[data-next]'),xp=sec.querySelector('[data-xp]');
    function beat(k){return BEATS.find(b=>b[0]===k)||BEATS[0];}
    function render(){strip.innerHTML=BEATS.map((b,i)=>{const val=S.panels[b[0]]||'';return '<button class="st-frame'+(S.activePanel===b[0]?' on':'')+(val?' done':'')+'" data-frame="'+b[0]+'"><span class="fnum">0'+(i+1)+'</span><span class="fic">'+b[2]+'</span><span class="ft">'+b[1]+'</span><span class="fx">'+(val?val.slice(0,18)+'…':b[3])+'</span><span class="fcheck">✓</span></button>';}).join('');strip.querySelectorAll('[data-frame]').forEach(b=>b.onclick=()=>{S.activePanel=b.dataset.frame;api.save();render();});const b=beat(S.activePanel);title.textContent='第 '+(BEATS.findIndex(x=>x[0]===S.activePanel)+1)+' 格 · '+b[1];ta.value=S.panels[S.activePanel]||'';key.value=S.panels['k_'+S.activePanel]||'';const n=BEATS.filter(x=>(S.panels[x[0]]||'').trim()).length;filled.textContent=n;next.disabled=n<5;xp.textContent=S.xp||0;peek.innerHTML='<b>故事线预览</b><br>'+BEATS.map((x,i)=>'<div class="tp-line">'+(i+1)+'. '+(S.panels[x[0]]||'（还没写）')+'</div>').join('');}
    sec.querySelector('[data-save]').onclick=()=>{S.panels[S.activePanel]=ta.value;S.panels['k_'+S.activePanel]=key.value;S.problem=S.panels.problem||'';S.user=S.panels.user||'';S.designName=S.panels.design||'';S.how=S.panels.how||'';S.value=S.panels.value||'';const order=BEATS.map(b=>b[0]);const idx=order.indexOf(S.activePanel);S.activePanel=order[(idx+1)%5];S.xp=(S.xp||0)+5;api.save();render();api.sfx('success');};
    next.onclick=()=>api.go(4);render();
    api.aiPanel(sec,{prompts:['这一格只回答一个问题吗？','用户是谁？他为什么需要？','它怎样工作？','价值能不能用一句话说清？']});
  }},
  {a:'04',name:'一分钟发布',time:'',html:`
<div class="ch-head"><div class="act"><b>04</b><span>一分钟发布</span></div><h2>看着五格，<em>把故事讲出来</em></h2><p>不用背稿。按五格顺序讲：问题—用户—方案—原理—价值。讲完听一个同伴的问题。</p></div>
<div class="stage-wrap"><div class="curtain l"></div><div class="curtain r"></div><div class="spot"></div><div class="stage-floor"></div>
  <div class="stage-content">
    <div class="stage-top"><span>故事板发布会 · SIT DIVISION</span><span class="who" data-name>少年创新提案人</span></div>
    <div class="speech">
      <p class="lead">大家好，我是 <b data-name2>少年创新提案人</b>。</p>
      <p>我发现的问题是：<b data-p0>……</b></p>
      <p>需要解决的人是：<b data-p1>……</b></p>
      <p>我设计的方案是：<b data-p2>……</b></p>
      <p>它通过 <b data-p3>……</b> 来工作。</p>
      <p>它能带来的价值是：<b data-p4>……</b></p>
    </div>
    <div class="stage-controls"><div class="timer" data-timer><div class="mini-timer"><b data-timer-num>60</b><span>秒</span></div><div class="timer-btns"><button class="main" data-timer-start>开始 60 秒</button><button data-timer-reset>重置</button></div></div><div class="applause"><button class="applause-btn" data-clap>👏</button><div class="applause-meter"><div class="am-top"><span>掌声能量</span><b><span data-clap-count>0</span></b></div><div class="ambar"><i data-clap-bar></i></div></div></div><button class="btn ghost sm" data-go="5">去听反馈 →</button></div>
  </div>
</div>
<div class="st-audience"><span>🧒</span><span>👧</span><span>🧑</span><span>👦</span><span>👩</span></div>`,init(sec,api){
    const S=api.S;const name=S.name||'少年创新提案人';const set=(s,v)=>{const el=sec.querySelector(s);if(el)el.textContent=v||'……';};set('[data-name]',name);set('[data-name2]',name);BEATS.forEach((b,i)=>set('[data-p'+i+']',(S.panels||{})[b[0]]));
    api.timer(sec,{seconds:60,onEnd:()=>api.toast('时间到，谢谢大家的聆听','⏰')});let energy=0,count=0;const aud=sec.querySelector('.st-audience');sec.querySelector('[data-clap]').onclick=()=>{energy=Math.min(100,energy+7);count++;sec.querySelector('[data-clap-count]').textContent=count;sec.querySelector('[data-clap-bar]').style.width=energy+'%';aud.classList.remove('clap');void aud.offsetWidth;aud.classList.add('clap');api.sfx('pop');api.burst(innerWidth*.5,innerHeight*.55,10,['#A78BFA','#E9DEFF','#F5C451']);};
  }},
  {a:'05',name:'同伴反馈',time:'',html:`
<div class="ch-head"><div class="act"><b>05</b><span>同伴反馈</span></div><h2>哪一条反馈，<em>最值得你改？</em></h2><p>听一个同伴的问题。选一条最值得改的反馈，写下一步。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 反馈</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">反馈 <b data-fb-label>—</b></span></div>
<div class="st-use-grid" data-fbs>
  <button class="st-use-card" data-fb="why"><b>同伴问题 01</b>“为什么你认为这个产品有用？”</button>
  <button class="st-use-card" data-fb="simple"><b>同伴问题 02</b>“还有没有更简单的办法？”</button>
  <button class="st-use-card" data-fb="break"><b>同伴问题 03</b>“如果它坏了/用户不会用，怎么办？”</button>
</div>
<div class="report-layout" style="margin-top:8px"><div class="improve-box" style="grid-column:1/-1"><label>我选这条反馈 / 下一步怎么改</label><textarea data-improve maxlength="100" placeholder="例如：同伴问“更简单的办法”，我下一步把两个功能合并成一个按钮。"></textarea></div></div>
<div class="st-actions"><button class="btn primary" data-go="6" disabled data-next>领取徽章 →</button><span class="hint">选一条反馈，写下一步</span></div>`,init(sec,api){
    const S=api.S;S.feedback=S.feedback||'';S.improve=S.improve||'';const fbs=sec.querySelectorAll('[data-fb]'),ta=sec.querySelector('[data-improve]'),next=sec.querySelector('[data-next]'),fb=sec.querySelector('[data-fb-label]'),xp=sec.querySelector('[data-xp]');
    ta.value=S.improve;function render(){fbs.forEach(b=>b.classList.toggle('on',b.dataset.fb===S.feedback));next.disabled=!(S.feedback&&ta.value.trim().length>4);if(S.feedback)fb.textContent=({why:'为什么有用',simple:'更简单的办法',break:'坏了/不会用'})[S.feedback];xp.textContent=S.xp||0;}
    fbs.forEach(b=>b.onclick=()=>{S.feedback=b.dataset.fb;api.save();render();api.sfx('tap');});ta.addEventListener('input',()=>{S.improve=ta.value;api.save();render();});next.onclick=()=>api.go(6);render();
    api.aiPanel(sec,{prompts:['哪一条反馈最值得改？','它是让你改产品，还是改讲法？','下一步能马上做什么？','改完怎么知道更好？']});
  }},
  c2badge({...c,a:'06',name:'少年创新提案人徽章',h2:'你让一个创意，<em>变得别人能看懂</em>',p:'你用 SIT 除法把创意拆成五格，排成一条线，写下五格故事，又用一分钟讲给同伴听，并选了一条反馈继续改。',journey:[['✂️','除法','拆成五格'],['🎞️','分镜','每格一个问题'],['🎤','讲述','一分钟故事'],['🔁','反馈','选一条继续改']],reflect:['哪一格最难讲清楚？为什么？','同伴的哪个问题最值得你继续研究？','如果只能改一格，你改哪一格？'],homeworkTitle:'讲给一个没听过的人',homework:'把五格故事讲给一位家人听，请他复述“你想解决什么问题”。如果他复述对了，说明你讲清楚了。',certLabel:'下载我的提案',certTitle:'我的第一个创新提案',certFields:[['问题','problem'],['用户','user'],['方案','designName'],['怎样工作','how'],['价值','value'],['下一步','improve']],quote:'“讲清楚，比讲得漂亮更重要。”',prev:5,actNotes:c.actNotes})
].map(a=>a);
window.FXM_CHAPTERS['8']={...c,cover:c2cover(c),notes:c2notes(c)};
})();

/* =========================================================
   第 09 章《为什么有的东西站得稳？》· SIT 纸塔建造
   ========================================================= */
(function(){
const STYLES={wide:{name:'宽底座塔',base:'wide',legs:'4',platform:'flat',connect:'tape'},tri:{name:'三角支撑塔',base:'narrow',legs:'tri',platform:'cross',connect:'slot'},tube:{name:'圆筒塔',base:'tube',legs:'4',platform:'flat',connect:'fold'}};
const PARTS={base:{label:'底座',opts:[['wide','加宽底座',2],['narrow','窄底座',0],['tube','圆筒底座',1]]},legs:{label:'支撑',opts:[['4','四条腿',2],['3','三条腿',1],['tri','三角撑',2]]},platform:{label:'平台',opts:[['flat','平板',1],['cross','十字台',2]]},connect:{label:'连接',opts:[['tape','胶带粘',1],['slot','插接',2],['fold','折扣',1]]}};
const FIXES=[['wide','加宽底座 +2',2],['brace','增加斜撑 +2',2],['cross','十字平台 +1',1],['slot','插接加固 +1',1]];
const c={
  no:'09',title:'为什么有的东西站得稳？',short:'站得稳',badge:'结构工程师',phase:'结构与机械',
  acc:'#4FE0D0',acc2:'#C9FFF8',rgb:'79,224,208',icon:'🗼',words:['拆解','搭建','测试','改进'],
  coverTitle:'为什么有的东西',coverLine:'站得稳？',lead:'一张纸，平放就倒，卷起来却能站住。<br>用 <b style="color:var(--gold2);font-weight:600">SIT 除法</b>把塔拆成四部分，再一部分一部分地做选择。',
  ability:'SIT 除法 · 结构系统 · 测试改进',cta:'进入纸塔建造场',
  chapterNote:'本章用 SIT 除法把纸塔拆成“底座—支撑—平台—连接”四部分，分别做选择，再组装、测试、改进。孩子不需要背力学结论，重点是理解“部分如何影响整体”。',
  teacherRole:'不要只奖励最高的塔。关注孩子是否能解释“为什么稳/为什么倒”，是否愿意只改一个部分再测一次。',
  actNotes:[
    {goal:'认识三种塔型，选一个开始建造。',qs:['“哪种塔看起来更稳？”','“底部、支撑、平台各起什么作用？”','“什么情况算失败？”'],tip:'先预测，不急着评价；三种塔型只是起点。'},
    {goal:'用 SIT 除法把塔拆成四部分，分别做选择。',qs:['“底座宽一点会怎样？”','“三条腿和四条腿有什么不同？”','“连接方式会影响稳定吗？”'],tip:'每一部分只能选一个；注意“部分”和“整体”的关系。'},
    {goal:'用同样的积木测试纸塔，记录承重和倒塌位置。',qs:['“它从第几块开始变形？”','“是底座、支撑，还是平台先出问题？”','“这个结果能说明什么？”'],tip:'不扶塔；同样的积木、同样的放置方式。'},
    {goal:'只改一个部分，再测一次，比较前后。',qs:['“你改的是哪一部分？”','“为什么选它？”','“第二次测试，什么变了？”'],tip:'一次只改一个部分，才容易判断原因。'},
    {goal:'用一分钟讲清楚结构、两次测试和改进。',qs:['“你的塔是什么结构？”','“第一次从哪里倒？”','“改了什么？第二次怎样？”'],tip:'可以指着塔或结构图说；失败也值得讲。'},
    {goal:'回顾 SIT 除法与结构测试，颁发结构工程师徽章。',qs:['“哪个部分最影响稳定？”','“下一次，你想先改哪部分？”'],tip:'测试记录可下载/存入实验室。'}
  ],
  acts:[]
};
c.acts=[
  {a:'01',name:'纸塔建造场',time:'',html:`
<div class="ch-head"><div class="act"><b>01</b><span>纸塔建造场</span></div><h2>一张纸，<em>怎样才能站得稳？</em></h2><p>三种塔型，三种起点。选一个你想先造的塔，再用 SIT 除法把它拆成四部分。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 除法</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">塔型 <b data-style>—</b></span></div>
<div class="st-arena-grid" data-styles>
  <button class="st-arena-card" data-style="wide"><div class="st-tower mini base-wide legs-4 platform-flat connect-tape"><div class="st-tower-base"></div><div class="st-tower-legs"><i></i><i></i><i></i><i></i></div><div class="st-tower-platform"></div></div><b>宽底座塔</b><small>底部宽，先求稳；适合第一次搭。</small></button>
  <button class="st-arena-card" data-style="tri"><div class="st-tower mini base-narrow legs-tri platform-cross connect-slot"><div class="st-tower-base"></div><div class="st-tower-legs"><i></i><i></i><i></i><i></i></div><div class="st-tower-platform"></div></div><b>三角支撑塔</b><small>三角撑，省材料；但连接要精细。</small></button>
  <button class="st-arena-card" data-style="tube"><div class="st-tower mini base-tube legs-4 platform-flat connect-fold"><div class="st-tower-base"></div><div class="st-tower-legs"><i></i><i></i><i></i><i></i></div><div class="st-tower-platform"></div></div><b>圆筒塔</b><small>圆筒底座，受力均匀；高度要控制。</small></button>
</div>
<div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>先别追求最高。先让塔能站住，再考虑放更多积木。<em>结构不是“堆得越多越好”，是“每一部分配合”。</em></div></div>
<div class="st-actions"><button class="btn primary" data-go="2" disabled data-next>拆成四部分 →</button><span class="hint">先选一个塔型</span></div>
<div class="st-tip-strip"><div><b>同样的纸</b><span>每组 6 张纸、60 厘米胶带。</span></div><div><b>同样的积木</b><span>用同一种轻质积木逐个放。</span></div><div><b>不扶塔</b><span>倒了也算一次有效测试。</span></div></div>`,init(sec,api){
    const S=api.S;S.xp=S.xp||0;const next=sec.querySelector('[data-next]'),st=sec.querySelector('[data-style]'),xp=sec.querySelector('[data-xp]'),say=sec.querySelector('.st-coach .say');
    function render(){sec.querySelectorAll('[data-style]').forEach(b=>b.classList.toggle('on',b.dataset.style===S.style));if(S.style){st.textContent=STYLES[S.style].name;next.disabled=false;say.innerHTML='<b>发小明：</b>你选了 <em>'+STYLES[S.style].name+'</em>。下一步，把它拆成底座、支撑、平台、连接四部分。';}xp.textContent=S.xp;}
    sec.querySelectorAll('[data-style]').forEach(b=>b.onclick=()=>{S.style=b.dataset.style;S.styleName=STYLES[S.style].name;S.parts=Object.assign({},STYLES[S.style]);S.base=S.parts.base;S.legs=S.parts.legs;S.platform=S.parts.platform;S.connect=S.parts.connect;S.test1=0;S.t1count=0;S.test2=0;S.fix='';api.save();render();api.sfx('pop');api.burst(innerWidth*.5,innerHeight*.45,16,['#4FE0D0','#C9FFF8','#F5C451']);});
    next.onclick=()=>api.go(2);render();
    api.aiPanel(sec,{prompts:['哪种塔看起来更稳？','底部、支撑、平台各起什么作用？','什么情况算失败？','如果只能改一个部分，你改哪里？']});
  }},
  {a:'02',name:'SIT 除法',time:'',html:`
<div class="ch-head"><div class="act"><b>02</b><span>SIT 除法</span></div><h2>把塔拆成四部分，<em>一部分一部分做选择</em></h2><p>底座、支撑、平台、连接，每一部分都有不同做法。选四个，组成你的塔。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 除法</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">稳定值 <b data-stab>0</b></span></div>
<div class="st-split">
  <div class="st-scene st-tower-stage">
    <div class="st-spotlight"></div>
    <div class="st-tower" data-tower><div class="st-tower-base"></div><div class="st-tower-legs"><i></i><i></i><i></i><i></i></div><div class="st-tower-platform"></div></div>
  </div>
  <div class="st-side">
    <div class="st-part-choices" data-rows></div>
    <div class="st-feature" data-stab-note>选四个部分，塔的稳定值会变化。</div>
    <div class="st-actions"><button class="btn primary" data-go="3" disabled data-next>去承重测试 →</button><span class="hint">四部分都选好</span></div>
  </div>
</div>`,init(sec,api){
    const S=api.S;S.parts=S.parts||{base:'wide',legs:'4',platform:'flat',connect:'tape'};const rows=sec.querySelector('[data-rows]'),tower=sec.querySelector('[data-tower]'),stab=sec.querySelector('[data-stab]'),note=sec.querySelector('[data-stab-note]'),next=sec.querySelector('[data-next]'),xp=sec.querySelector('[data-xp]');
    function points(){let p=0;Object.keys(PARTS).forEach(k=>{const o=PARTS[k].opts.find(x=>x[0]===S.parts[k]);p+=o?o[2]:0;});return p;}
    function render(){tower.className='st-tower base-'+(S.parts.base||'wide')+' legs-'+(S.parts.legs||'4')+' platform-'+(S.parts.platform||'flat')+' connect-'+(S.parts.connect||'tape');rows.innerHTML=Object.entries(PARTS).map(([k,P])=>'<div class="st-part-row"><b>'+P.label+'</b>'+P.opts.map(o=>'<button data-part="'+k+'" data-v="'+o[0]+'" class="'+(S.parts[k]===o[0]?'on':'')+'">'+o[1]+'</button>').join('')+'</div>').join('');rows.querySelectorAll('[data-part]').forEach(b=>b.onclick=()=>{S.parts[b.dataset.part]=b.dataset.v;S.base=S.parts.base;S.legs=S.parts.legs;S.platform=S.parts.platform;S.connect=S.parts.connect;S.test1=0;S.t1count=0;S.test2=0;S.fix='';api.save();render();api.sfx('tap');});const p=points();S.stability=p;stab.textContent=p;note.innerHTML='当前稳定值：<b>'+p+'</b>（承重约 '+(2+p)+' 块）。<br><span style="color:var(--faint)">稳定值不是越高越好，还要看材料、制作难度和安全。</span>';next.disabled=false;xp.textContent=S.xp||0;}
    next.onclick=()=>api.go(3);render();
    api.aiPanel(sec,{prompts:['底座宽一点会怎样？','三条腿和四条腿有什么不同？','平台形状会影响稳定吗？','连接方式重要吗？']});
  }},
  {a:'03',name:'承重测试',time:'',html:`
<div class="ch-head"><div class="act"><b>03</b><span>承重测试</span></div><h2>第一次测试，<em>找到最弱的部分</em></h2><p>点“加一块”或“自动测试”。塔倒了，先看它是从底座、支撑、平台还是连接处开始变形。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 证据</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">承重 <b data-cap>0</b></span></div>
<div class="st-split">
  <div class="st-scene st-tower-stage">
    <div class="st-spotlight"></div>
    <div class="st-tower" data-test-tower><div class="st-tower-base"></div><div class="st-tower-legs"><i></i><i></i><i></i><i></i></div><div class="st-tower-platform"></div></div>
    <div class="st-tower-blocks" data-blocks></div>
  </div>
  <div class="st-side">
    <div class="st-test-readout" data-readout>还没有测试。点“加一块”开始。</div>
    <div class="st-actions"><button class="btn primary sm" data-add>＋ 加一块</button><button class="btn ghost sm" data-auto>自动测试</button><button class="btn ghost sm" data-go="4" data-next disabled>去改进 →</button></div>
    <div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>测试不是判决。<em>它从第几块开始变形？是哪一部分先出问题？</em></div></div>
  </div>
</div>`,init(sec,api){
    const S=api.S;S.parts=S.parts||{base:'wide',legs:'4',platform:'flat',connect:'tape'};S.test1=S.test1||0;const tower=sec.querySelector('[data-test-tower]'),blocks=sec.querySelector('[data-blocks]'),read=sec.querySelector('[data-readout]'),cap=sec.querySelector('[data-cap]'),next=sec.querySelector('[data-next]'),xp=sec.querySelector('[data-xp]');let timer=null;
    const CAP=()=>2+(S.stability||0);
    function render(){tower.className='st-tower base-'+(S.parts.base||'wide')+' legs-'+(S.parts.legs||'4')+' platform-'+(S.parts.platform||'flat')+' connect-'+(S.parts.connect||'tape')+(S.test1?' fail':'');const n=S.test1||S.t1count||0;blocks.innerHTML=Array.from({length:n},(_,i)=>'<span class="st-block'+(S.test1&&i>=n-2?' fall':'')+'" style="--bx:'+((i%2?1:-1)*(8+i*2))+'px;--br:'+((i%2?1:-1)*(20+i*5))+'deg"></span>').join('');cap.textContent=n;xp.textContent=S.xp||0;if(S.test1){read.innerHTML='<b>第一次测试：</b>承受 '+S.test1+' 块<br><span style="color:var(--faint)">最弱的部分：'+(S.parts.base==='narrow'?'底座':'连接处')+'先变形。</span>';next.disabled=false;}else if(S.t1count){read.innerHTML='<b>正在测试：</b>当前 '+S.t1count+' 块，继续加或点“自动测试”。';}else read.textContent='还没有测试。点“加一块”开始。';}
    function collapse(){clearInterval(timer);S.test1=Math.min(S.t1count||0,CAP());S.xp=(S.xp||0)+10;api.save();api.sfx('error');render();api.burst(innerWidth*.45,innerHeight*.55,24,['#FF7A6B','#4FE0D0','#F5C451']);api.toast('塔在第 '+S.test1+' 块时倒了','🧱');}
    function add(){if(S.test1)return;S.t1count=(S.t1count||0)+1;if(S.t1count>CAP()){S.t1count=CAP();collapse();}else{api.save();render();api.sfx('tap');}}
    function auto(){if(timer)clearInterval(timer);timer=setInterval(()=>{if(!sec.isConnected||S.test1){clearInterval(timer);return;}add();},300);}
    sec.querySelector('[data-add]').onclick=add;sec.querySelector('[data-auto]').onclick=auto;
    next.onclick=()=>{clearInterval(timer);api.go(4);};render();
    api.aiPanel(sec,{prompts:['它从第几块开始变形？','是哪一部分先出问题？','这个结果能说明什么？','如果只改一个部分，你改哪里？']});
  }},
  {a:'04',name:'改进再测',time:'',html:`
<div class="ch-head"><div class="act"><b>04</b><span>改进再测</span></div><h2>只改一个部分，<em>再测一次</em></h2><p>选一个最想改的部分，再测一次。比较两次结果，看看变化是不是来自这个改动。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 改进</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">改进 <b data-fix>—</b></span></div>
<div class="st-split">
  <div class="st-scene st-tower-stage">
    <div class="st-spotlight"></div>
    <div class="st-tower" data-tower2><div class="st-tower-base"></div><div class="st-tower-legs"><i></i><i></i><i></i><i></i></div><div class="st-tower-platform"></div></div>
    <div class="st-tower-blocks" data-blocks2></div>
  </div>
  <div class="st-side">
    <div class="st-use-grid" data-fixes>${FIXES.map(f=>'<button class="st-use-card" data-fix="'+f[0]+'"><b>+'+f[2]+'</b>'+f[1]+'</button>').join('')}</div>
    <div class="st-actions"><button class="btn primary sm" data-retest>再测一次 →</button><button class="btn ghost sm" data-go="5" data-next disabled>去发布 →</button></div>
    <div class="st-test-compare" data-compare></div>
    <div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>一次只改一个主要因素。<em>如果同时改很多部分，变好了也不知道是哪一项起了作用。</em></div></div>
  </div>
</div>`,init(sec,api){
    const S=api.S;S.parts=S.parts||{base:'wide',legs:'4',platform:'flat',connect:'tape'};S.fix=S.fix||'';S.test1=S.test1||0;S.test2=S.test2||0;const tower=sec.querySelector('[data-tower2]'),blocks=sec.querySelector('[data-blocks2]'),fixes=sec.querySelector('[data-fixes]'),retest=sec.querySelector('[data-retest]'),next=sec.querySelector('[data-next]'),comp=sec.querySelector('[data-compare]'),fx=sec.querySelector('[data-fix]'),xp=sec.querySelector('[data-xp]');
    const bonus=()=>{const f=FIXES.find(x=>x[0]===S.fix);return f?f[2]:0;};
    function render(){tower.className='st-tower base-'+(S.parts.base||'wide')+' legs-'+(S.parts.legs||'4')+' platform-'+(S.parts.platform||'flat')+' connect-'+(S.parts.connect||'tape')+(S.fix?' upgraded':'')+(S.test2?' fail':'');fixes.querySelectorAll('[data-fix]').forEach(b=>b.classList.toggle('on',b.dataset.fix===S.fix));if(S.fix)fx.textContent=(FIXES.find(x=>x[0]===S.fix)||[])[1]||'';const n=S.test2||0;blocks.innerHTML=Array.from({length:n},(_,i)=>'<span class="st-block'+(S.test2&&i>=n-2?' fall':'')+'"></span>').join('');comp.innerHTML='<div class="st-test-box"><b>第一次</b><em>'+(S.test1||'—')+' 块</em></div><div class="st-test-box"><b>第二次</b><em>'+(S.test2||'—')+' 块</em></div>';next.disabled=!S.test2;retest.disabled=!S.fix;xp.textContent=S.xp||0;}
    fixes.querySelectorAll('[data-fix]').forEach(b=>b.onclick=()=>{S.fix=b.dataset.fix;S.xp=(S.xp||0)+5;api.save();render();api.sfx('tap');});
    retest.onclick=()=>{if(!S.fix){api.toast('先选一个改进','🔧');return;}S.test2=(S.test1||0)+bonus();S.xp=(S.xp||0)+10;api.save();render();api.sfx('success');api.burst(innerWidth*.45,innerHeight*.55,24,['#4FE0D0','#F5C451','#FFE3A6']);api.toast('第二次测试：'+S.test2+' 块','🧱');};
    next.onclick=()=>api.go(5);render();
    api.aiPanel(sec,{prompts:['你改的是哪一部分？','为什么选它？','第二次测试，什么变了？','如果没变好，还可能是什么原因？']});
  }},
  {a:'05',name:'结构发布会',time:'',html:`
<div class="ch-head"><div class="act"><b>05</b><span>结构发布会</span></div><h2>讲清楚：<em>它为什么站得住</em></h2><p>讲清楚四部分、第一次测试、你改了什么、第二次测试结果。失败也值得讲。</p></div>
<div class="stage-wrap"><div class="curtain l"></div><div class="curtain r"></div><div class="spot"></div><div class="stage-floor"></div>
  <div class="stage-content">
    <div class="stage-top"><span>纸塔工程发布会 · SIT DIVISION</span><span class="who" data-name>结构工程师</span></div>
    <div class="speech">
      <p class="lead">大家好，我是 <b data-name2>结构工程师</b>。</p>
      <p>我的塔叫：<b data-tower>……</b></p>
      <p>它的四个部分是：<b data-parts>……</b></p>
      <p>第一次测试：<b data-t1>……</b></p>
      <p>我改的部分是：<b data-fix>……</b></p>
      <p>第二次测试：<b data-t2>……</b></p>
    </div>
    <div class="stage-controls"><div class="timer" data-timer><div class="mini-timer"><b data-timer-num>60</b><span>秒</span></div><div class="timer-btns"><button class="main" data-timer-start>开始 60 秒</button><button data-timer-reset>重置</button></div></div><div class="applause"><button class="applause-btn" data-clap>👏</button><div class="applause-meter"><div class="am-top"><span>掌声能量</span><b><span data-clap-count>0</span></b></div><div class="ambar"><i data-clap-bar></i></div></div></div><button class="btn ghost sm" data-go="6">领取徽章 →</button></div>
  </div>
</div>
<div class="st-audience"><span>🧒</span><span>👧</span><span>🧑</span><span>👦</span><span>👩</span></div>`,init(sec,api){
    const S=api.S;const name=S.name||'结构工程师';const set=(s,v)=>{const el=sec.querySelector(s);if(el)el.textContent=v||'……';};const P=S.parts||{};const PN={base:{wide:'宽底座',narrow:'窄底座',tube:'圆筒底座'},legs:{'4':'四条腿','3':'三条腿',tri:'三角撑'},platform:{flat:'平板',cross:'十字台'},connect:{tape:'胶带粘',slot:'插接',fold:'折扣'}};
    set('[data-name]',name);set('[data-name2]',name);set('[data-tower]',S.styleName||'我的纸塔');set('[data-parts]',(PN.base[P.base]||'—')+' / '+(PN.legs[P.legs]||'—')+' / '+(PN.platform[P.platform]||'—')+' / '+(PN.connect[P.connect]||'—'));set('[data-t1]',(S.test1||'—')+' 块');set('[data-fix]',(FIXES.find(x=>x[0]===S.fix)||[])[1]||'—');set('[data-t2]',(S.test2||'—')+' 块');
    api.timer(sec,{seconds:60,onEnd:()=>api.toast('时间到，谢谢大家的聆听','⏰')});let energy=0,count=0;const aud=sec.querySelector('.st-audience');sec.querySelector('[data-clap]').onclick=()=>{energy=Math.min(100,energy+7);count++;sec.querySelector('[data-clap-count]').textContent=count;sec.querySelector('[data-clap-bar]').style.width=energy+'%';aud.classList.remove('clap');void aud.offsetWidth;aud.classList.add('clap');api.sfx('pop');};
  }},
  c2badge({...c,a:'06',name:'结构工程师徽章',h2:'你让一张纸，<em>真正站住了</em>',p:'你用 SIT 除法把塔拆成四部分，分别做选择，测试了承重，又只改一个部分再测一次。你不仅搭了塔，还开始理解“部分如何影响整体”。',journey:[['✂️','拆解','底座/支撑/平台/连接'],['🧱','测试','记录承重与倒塌'],['🔧','改进','只改一个部分'],['🔁','再测','比较前后变化']],reflect:['哪个部分最影响稳定？','你原来认为最稳的塔，测试后还是它吗？','如果继续研究，你想先改哪部分？'],homeworkTitle:'找三种支撑结构',homework:'在家里安全地观察椅子、书架或三脚架，画出其中一种的支撑点和连接方式。不要拆卸或攀爬。',certLabel:'下载测试记录',certTitle:'纸塔测试记录',certFields:[['塔型','styleName'],['底座','base'],['支撑','legs'],['平台','platform'],['第一次测试','test1'],['第一次改进','fix']],quote:'“当纸塔倒下时，我们没有失去一个答案，而是获得了一个新的问题。”',prev:5,actNotes:c.actNotes})
].map(a=>a);
window.FXM_CHAPTERS['9']={...c,cover:c2cover(c),notes:c2notes(c)};
})();

/* =========================================================
   第 10 章《杠杆的力量》· SIT 属性关联实验室
   ========================================================= */
(function(){
const c={
  no:'10',title:'杠杆的力量',short:'杠杆',badge:'机械探索者',phase:'结构与机械',
  acc:'#FBBF24',acc2:'#FFF0C2',rgb:'251,191,36',icon:'⚖️',words:['支点','施力','阻力','联动'],
  coverTitle:'杠杆的',coverLine:'力量',lead:'一根尺、一个支点，就能让重的东西变轻。<br>用 <b style="color:var(--gold2);font-weight:600">SIT 属性关联</b>：支点位置一变，需要的力也跟着变。',
  ability:'SIT 属性关联 · 杠杆实验 · 工程表达',cta:'进入杠杆实验室',
  chapterNote:'本章用 SIT 属性关联做杠杆实验：支点位置改变，施力大小和两端移动距离随之改变。孩子不需要背公式，重点是“改变一个属性，观察另一个属性怎么变”。',
  teacherRole:'不要直接说“支点越靠近物体越省力”。先让孩子预测、拖动、测试，再一起总结适用条件。',
  actNotes:[
    {goal:'从衣夹、剪刀、跷跷板中认出杠杆的共同结构。',qs:['“它们有什么共同点？”','“哪里在转动？”','“如果没有这些工具，会不会更费力？”'],tip:'展示实物或图片即可，不要求孩子操作危险工具。'},
    {goal:'把支点、施力点、阻力点放到杠杆上。',qs:['“杠杆围绕哪里转？”','“人手在哪里用力？”','“重物放在哪里？”'],tip:'先点一个标签，再点杠杆上的位置；三个点都放对再继续。'},
    {goal:'改变支点位置，观察抬起同一物品的力感变化。',qs:['“支点靠近物品，还是靠近手，更省力？”','“两端的移动距离有什么变化？”'],tip:'三次测试用同一件轻质物品；定性观察即可。'},
    {goal:'画出自己的杠杆装置：支点、施力点、阻力点、底座。',qs:['“支点稳定吗？”','“物品放在哪里？”','“你准备在哪里用力？”'],tip:'先画再搭；提醒夹手风险，支点要固定。'},
    {goal:'测试装置能不能抬起物品、稳不稳、安不安全。',qs:['“能抬起吗？”','“支点会滚吗？”','“哪里容易夹手？”'],tip:'用轻质物品；不要撬重物，不要站上杠杆。'},
    {goal:'用一分钟讲清楚三个点、测试结果和改进。',qs:['“你的支点在哪里？”','“你在哪里施力？”','“改进后有什么变化？”'],tip:'可以拿着装置边演示边说。'},
    {goal:'回顾 SIT 属性关联与杠杆测试，颁发机械探索者徽章。',qs:['“支点位置改变了，什么变了？”','“生活中还有哪些杠杆？”'],tip:'测试记录可下载/存入实验室。'}
  ],
  acts:[]
};
c.acts=[
  {a:'01',name:'机械侦探',time:'',html:`
<div class="ch-head"><div class="act"><b>01</b><span>机械侦探</span></div><h2>衣夹、剪刀、跷跷板，<em>有什么共同点？</em></h2><p>它们都能围绕一个地方转动，帮我们省力或改变方向。选一个工具，找出它的“支点”。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 属性关联</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">工具 <b data-tool>—</b></span></div>
<div class="st-user-grid" data-tools>
  <button class="st-user-card" data-tool="clip"><span>🖇️</span><b>衣夹</b><small>夹住衣物，中间有一个转轴</small></button>
  <button class="st-user-card" data-tool="scissors"><span>✂️</span><b>剪刀</b><small>两片刀片围绕一个轴转动</small></button>
  <button class="st-user-card" data-tool="seesaw"><span>🛝</span><b>跷跷板</b><small>一块板围绕中间支点上下</small></button>
  <button class="st-user-card" data-tool="opener"><span>🍾</span><b>开瓶器</b><small>用一个小支点撬开瓶盖</small></button>
</div>
<div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>它们都有一个<em>可以转动的地方</em>。找到它，再看“人在哪里用力、东西放在哪里”。</div></div>
<div class="st-actions"><button class="btn primary" data-go="2" disabled data-next>去找三个点 →</button><span class="hint">先选一个工具</span></div>
<div class="st-tip-strip"><div><b>支点</b><span>杠杆围绕它转动。</span></div><div><b>施力点</b><span>人手在这里用力。</span></div><div><b>阻力点</b><span>重物放在这里。</span></div></div>`,init(sec,api){
    const S=api.S;S.xp=S.xp||0;const t=sec.querySelector('[data-tool]'),next=sec.querySelector('[data-next]'),xp=sec.querySelector('[data-xp]'),say=sec.querySelector('.st-coach .say');const N={clip:'衣夹',scissors:'剪刀',seesaw:'跷跷板',opener:'开瓶器'};
    function render(){sec.querySelectorAll('[data-tool]').forEach(b=>b.classList.toggle('on',b.dataset.tool===S.tool));if(S.tool){t.textContent=N[S.tool];next.disabled=false;say.innerHTML='<b>发小明：</b>你选了 <em>'+N[S.tool]+'</em>。下一步，把支点、施力点、阻力点放到杠杆上。';}xp.textContent=S.xp;}
    sec.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>{S.tool=b.dataset.tool;S.toolName=N[S.tool];S.points={left:'',mid:'',right:''};S.trials={};api.save();render();api.sfx('pop');api.burst(innerWidth*.5,innerHeight*.4,16,['#FBBF24','#FFF0C2','#4FE0D0']);});
    next.onclick=()=>api.go(2);render();
    api.aiPanel(sec,{prompts:['它们有什么共同点？','哪里在转动？','人在哪里用力？','重物放在哪里？']});
  }},
  {a:'02',name:'三个点',time:'',html:`
<div class="ch-head"><div class="act"><b>02</b><span>三个点</span></div><h2>支点、施力点、阻力点，<em>各在哪里？</em></h2><p>先点一个标签，再点杠杆上的位置。三个点都放对，才能继续。</p></div>
<div class="lever-board">
  <div class="lever-palette"><button type="button" data-label="fulcrum">支点 <small>杠杆围绕它转</small></button><button type="button" data-label="effort">施力点 <small>人手在这里用力</small></button><button type="button" data-label="load">阻力点 <small>重物放在这里</small></button></div>
  <div class="lever-stage"><div class="lever-beam"><span class="lever-pivot"></span><button type="button" class="lever-spot" data-pos="left" style="left:12%">左端<small data-assign="left">？</small></button><button type="button" class="lever-spot" data-pos="mid" style="left:50%">中间<small data-assign="mid">？</small></button><button type="button" class="lever-spot" data-pos="right" style="left:88%">右端<small data-assign="right">？</small></button></div></div>
  <div class="lever-note" data-note>先选一个标签，再点杠杆上的位置。</div>
  <div class="case-next"><button class="btn primary" data-go="3" disabled data-next>去做支点实验 →</button><span>三个点都放对，再继续</span></div>
</div>`,init(sec,api){
    const S=api.S;S.points=S.points||{left:'',mid:'',right:''};S.activeLabel='';const note=sec.querySelector('[data-note]'),next=sec.querySelector('[data-next]');const RIGHT={left:'load',mid:'fulcrum',right:'effort'},NAME={fulcrum:'支点',effort:'施力点',load:'阻力点'};
    function render(){sec.querySelectorAll('[data-label]').forEach(b=>b.classList.toggle('selected',b.dataset.label===S.activeLabel));sec.querySelectorAll('[data-pos]').forEach(b=>{const k=b.dataset.pos,v=S.points[k];b.querySelector('[data-assign]').textContent=v?NAME[v]:'？';b.classList.toggle('ok',v===RIGHT[k]);b.classList.toggle('bad',!!v&&v!==RIGHT[k]);});const ok=Object.keys(RIGHT).every(k=>S.points[k]===RIGHT[k]);next.disabled=!ok;note.innerHTML=ok?'三个点都对了：<b style="color:var(--teal)">左端=阻力点 · 中间=支点 · 右端=施力点</b>。现在去试支点位置。':'先选一个标签，再点杠杆上的位置。';if(ok)api.sfx('chime');}
    sec.querySelectorAll('[data-label]').forEach(b=>b.onclick=()=>{S.activeLabel=b.dataset.label;api.save();render();api.sfx('tap');});sec.querySelectorAll('[data-pos]').forEach(b=>b.onclick=()=>{if(!S.activeLabel){api.toast('先点一个标签','↑');return;}S.points[b.dataset.pos]=S.activeLabel;api.save();render();api.sfx('tap');});next.onclick=()=>api.go(3);render();
    api.aiPanel(sec,{prompts:['杠杆围绕哪里转？','人手在哪里用力？','重物放在哪里？','支点一定在中间吗？']});
  }},
  {a:'03',name:'支点实验',time:'',html:`
<div class="ch-head"><div class="act"><b>03</b><span>支点实验</span></div><h2>支点一动，<em>力就跟着变</em></h2><p>拖动支点，试三个位置：靠近物品、中间、靠近手。用同一件轻物品，记录每次的力感。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 属性关联</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">已试 <b data-done>0</b>/3</span></div>
<div class="st-split">
  <div class="st-scene st-lever2-stage">
    <div class="st-spotlight"></div>
    <div class="st-lever2"><div class="st-lever2-beam" data-beam><span class="st-load">📦</span><span class="st-effort">✋</span></div><div class="st-lever2-pivot" data-pivot></div></div>
  </div>
  <div class="st-side">
    <div class="st-lever2-trial" data-presets><button data-pos="22">支点靠近物品</button><button data-pos="50">支点在中间</button><button data-pos="78">支点靠近手</button></div>
    <input class="st-fulcrum-range" type="range" min="12" max="88" value="50" data-range>
    <div class="st-lever2-meter"><span>用力</span><div class="bar"><i data-meter></i></div><b data-effort>—</b></div>
    <div class="st-test-readout" data-readout>拖动支点，点“抬一抬”。</div>
    <div class="st-actions"><button class="btn primary sm" data-try>抬一抬 →</button><button class="btn ghost sm" data-go="4" data-next disabled>去设计杠杆 →</button></div>
    <div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>属性关联：<em>支点位置一变，施力大小和两端移动距离都会变。</em></div></div>
  </div>
</div>`,init(sec,api){
    const S=api.S;S.trials=S.trials||{};const beam=sec.querySelector('[data-beam]'),pivot=sec.querySelector('[data-pivot]'),range=sec.querySelector('[data-range]'),read=sec.querySelector('[data-readout]'),meter=sec.querySelector('[data-meter]'),eff=sec.querySelector('[data-effort]'),done=sec.querySelector('[data-done]'),next=sec.querySelector('[data-next]'),xp=sec.querySelector('[data-xp]');
    function key(v){return v<35?'near':v>65?'far':'mid';}
    function render(){const v=+range.value;const k=key(v);pivot.style.left=v+'%';beam.style.transformOrigin=v+'% 50%';const t=S.trials[k];if(t){const ang=k==='near'?-5:k==='far'?5:0;beam.style.transform='rotate('+ang+'deg)';meter.style.width=t.effort+'%';eff.textContent=t.effort+'%';read.innerHTML='<b>'+t.label+'：</b>'+t.text;}else{beam.style.transform='rotate(0)';meter.style.width='50%';eff.textContent='—';read.textContent='拖动支点，点“抬一抬”。';}done.textContent=Object.keys(S.trials).length;next.disabled=Object.keys(S.trials).length<3;xp.textContent=S.xp||0;sec.querySelectorAll('[data-pos]').forEach(b=>b.classList.toggle('on',Math.abs(+b.dataset.pos-v)<6));}
    function trial(){const v=+range.value,k=key(v);const data=k==='near'?{label:'支点靠近物品',effort:28,text:'比较省力，但手要移动更长的距离。'}:k==='far'?{label:'支点靠近手',effort:82,text:'更费力，虽然手移动的距离短。'}:{label:'支点在中间',effort:55,text:'力感差不多，两端移动距离接近。'};S.trials[k]=data;S.xp=(S.xp||0)+10;api.save();render();api.sfx('success');api.burst(innerWidth*.45,innerHeight*.5,16,['#FBBF24','#FFF0C2','#4FE0D0']);}
    sec.querySelector('[data-try]').onclick=trial;range.addEventListener('input',render);sec.querySelectorAll('[data-pos]').forEach(b=>b.onclick=()=>{range.value=b.dataset.pos;render();});next.onclick=()=>api.go(4);render();
    api.aiPanel(sec,{prompts:['支点靠近物品，还是靠近手，更省力？','两端的移动距离有什么变化？','这个结果和你的预测一样吗？','支点不稳定会怎样？']});
  }},
  {a:'04',name:'设计杠杆',time:'',html:`
<div class="ch-head"><div class="act"><b>04</b><span>设计杠杆</span></div><h2>先标出三个点，<em>再动手做</em></h2><p>选杠杆长度、支点位置和底座，画出你的装置。先想清楚它准备怎样运动。</p></div>
<div class="st-split">
  <div class="st-design-lever"><div class="st-lever2"><div class="st-lever2-beam" data-beam3 style="left:6%;right:6%"><span class="st-load">📦</span><span class="st-effort">✋</span></div><div class="st-lever2-pivot" data-pivot3></div></div></div>
  <div class="st-side">
    <div class="st-lever-rows" data-rows>
      <div class="st-lever-row"><b>杠杆</b><button data-k="beam" data-v="short">短</button><button data-k="beam" data-v="mid">中</button><button data-k="beam" data-v="long">长</button></div>
      <div class="st-lever-row"><b>支点</b><button data-k="pivot" data-v="near">靠近物品</button><button data-k="pivot" data-v="mid">中间</button><button data-k="pivot" data-v="far">靠近手</button></div>
      <div class="st-lever-row"><b>底座</b><button data-k="base" data-v="simple">简单</button><button data-k="base" data-v="wide">加宽</button></div>
    </div>
    <div class="st-spec" style="display:grid;grid-template-columns:1fr 1fr">
      <div class="field"><label>装置名称</label><input data-f="name" maxlength="24" placeholder="例如：省力小跷跷板"></div>
      <div class="field"><label>抬起什么</label><input data-f="load" maxlength="20" placeholder="纸杯、橡皮…"></div>
      <div class="field" style="grid-column:1/-1"><label>它怎样工作</label><textarea data-f="how" maxlength="80" placeholder="支点在哪里？在哪里用力？"></textarea></div>
      <div class="field" style="grid-column:1/-1"><label>下一步改进</label><input data-f="improve" maxlength="40" placeholder="如果再做一版…"></div>
      <div class="st-mini-draw" style="grid-column:1/-1"><div class="draw-head"><span>手绘 · 可选</span><span data-draw-state>未开始</span></div><canvas data-draw width="600" height="300"></canvas></div>
      <div style="display:flex;gap:7px;flex-wrap:wrap;grid-column:1/-1"><button class="btn primary sm" data-gen>生成设计图 →</button><button class="btn ghost sm" data-go="5" data-next>去测试 →</button></div>
    </div>
  </div>
</div>`,init(sec,api){
    const S=api.S;S.design=S.design||{};S.design.beam=S.design.beam||'mid';S.design.pivot=S.design.pivot||'mid';S.design.base=S.design.base||'simple';const beam=sec.querySelector('[data-beam3]'),pivot=sec.querySelector('[data-pivot3]');
    const draw=api.initDrawing(sec,url=>{S.drawing=url;api.save();sec.querySelector('[data-draw-state]').textContent='已保存';});if(S.drawing&&draw)draw.load(S.drawing);
    sec.querySelectorAll('[data-f]').forEach(el=>{const k=el.dataset.f;el.value=S.design[k]||'';el.addEventListener('input',()=>{S.design[k]=el.value;api.save();});});
    function render(){const d=S.design;const L={short:'8%',mid:'6%',long:'3%'};beam.style.left=L[d.beam]||'6%';beam.style.right=L[d.beam]||'6%';pivot.style.left=(d.pivot==='near'?'28%':d.pivot==='far'?'72%':'50%');S.fulcrum=d.pivot==='near'?'靠近物品':d.pivot==='far'?'靠近手':'中间';S.effort='右端手柄';S.load=d.load||'轻质物品';sec.querySelectorAll('[data-k]').forEach(b=>b.classList.toggle('on',d[b.dataset.k]===b.dataset.v));}
    sec.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{S.design[b.dataset.k]=b.dataset.v;api.save();render();api.sfx('tap');});render();
    sec.querySelector('[data-gen]').onclick=()=>{const d=S.design;if(!d.name){api.toast('先给装置起个名字','⚖️');return;}api.previewSheet({title:'杠杆设计与测试记录',subtitle:'第 10 章 · 杠杆的力量',code:'FXM-CUR-Q1-010',badge:'机械探索者',name:S.name||'小小机械师',date:new Date().toLocaleDateString('zh-CN'),filename:'杠杆设计_'+(S.name||'小小机械师'),stamp:'SIT 属性关联',lab:{chapter:'10',chapterTitle:'杠杆的力量',name:S.name||'小小机械师',product:d.name,problem:d.load||'抬起轻质物品',how:d.how||'',improve:d.improve},fields:[{label:'装置名称',value:d.name},{label:'抬起什么',value:d.load},{label:'杠杆长度',value:d.beam},{label:'支点位置',value:d.pivot},{label:'怎样工作',value:d.how},{label:'下一步',value:d.improve}],drawing:S.drawing,drawLabel:'我的杠杆设计',footer:'三个点 → 支点位置 → 设计 → 测试'});};
    api.aiPanel(sec,{prompts:['支点稳定吗？','物品放在哪里？','你准备在哪里用力？','操作时哪里容易夹手？']});
  }},
  c2test({...c,a:'05',name:'杠杆测试',h2:'能抬起，<em>还要稳、要安全</em>',p:'测试装置能不能抬起物品、支点稳不稳、操作安不安全。记录问题，再改一个地方。',tests:[{k:'lift',t:'抬起物品',d:'能把轻质物品移动到预定位置吗？',opts:['能','勉强','不能']},{k:'stable',t:'支点稳定',d:'支点会不会滚、滑、歪？',opts:['稳','有点滑','滚了']},{k:'safe',t:'操作安全',d:'有没有夹手、翻倒的风险？',opts:['安全','要注意','有风险']}],next:6,nextLabel:'去发布 →',foundPh:'例如：能抬起纸杯，但支点容易滚动。',improvePh:'例如：把支点固定在底座上。',rule1:'先固定支点',rule1p:'支点不稳时，先解决支点，再增加负载。',ai:['能抬起吗？','支点会滚吗？','哪里容易夹手？','如果只改一个地方，你改哪里？']}),
  c2pitch({...c,a:'06',name:'杠杆工程发布会',h2:'讲清楚：<em>三个点在哪里</em>',p:'拿着你的装置，边演示边说：支点、施力点、阻力点，测试结果和改进。',lines:[{pre:'大家好，我是 ',key:'name',post:'。'},{pre:'我的装置叫：',key:'product',post:'。'},{pre:'支点在：',key:'fulcrum',post:'。'},{pre:'我在 ',key:'effort',post:' 施力。'},{pre:'物品放在：',key:'load',post:'。'},{pre:'测试发现：',key:'test',post:'。'},{pre:'我做的改进是：',key:'improve',post:'。'}],next:7,nextLabel:'领取徽章 →',seconds:60,stageLabel:'杠杆工程发布会',badge:'机械探索者',foot:'工程师不仅关心“能不能动”，还关心“稳不稳、好不好用”。'}),
  c2badge({...c,a:'07',name:'机械探索者徽章',h2:'你用一根杠杆，<em>让任务变轻了</em>',p:'你找到了杠杆的三个点，试了不同支点位置，做了一个能抬起物品的小装置，还通过测试改进了它。',journey:[['🔍','找点','支点/施力点/阻力点'],['⚖️','实验','改变支点位置'],['📐','设计','画出杠杆结构'],['🔁','改进','让支点更稳']],reflect:['支点位置改变了，什么变了？','你的装置最容易在哪里出问题？','生活中还有哪些杠杆？'],homeworkTitle:'找一种生活中的杠杆',homework:'安全地观察一种杠杆工具（夹子、剪刀、开瓶器），画出它的三个点，指出支点在哪里。不要拆卸或测试重物。',certLabel:'下载测试记录',certTitle:'杠杆测试记录',certFields:[['装置名称','name'],['支点','fulcrum'],['施力点','effort'],['阻力点','load'],['测试发现','found'],['我的改进','improve']],quote:'“科学原理不是孤立的知识点，而是能够解释和改进现实装置的工具。”',prev:6,actNotes:c.actNotes})
].map(a=>a);
window.FXM_CHAPTERS['10']={...c,cover:c2cover(c),notes:c2notes(c)};
})();

/* =========================================================
   第 11 章《轮子改变世界》· SIT 小车测试跑道
   ========================================================= */
(function(){
const CARGO={book:{icon:'📕',name:'一本薄书'},bottle:{icon:'🥤',name:'一瓶水'},pencil:{icon:'✏️',name:'一盒彩笔'}};
const WHEELS={fourSmall:{name:'4 个小轮',n:4,big:false,speed:90},fourBig:{name:'4 个大轮',n:4,big:true,speed:78},six:{name:'6 个轮子',n:6,big:false,speed:70},two:{name:'2 个轮子',n:2,big:false,speed:60}};
function carHTML(setup,design,cls,cargo){
  const S=WHEELS[setup]||WHEELS.fourSmall;const n=S.n,big=S.big;
  let pos=[];
  if(n===2)pos=[10,72];else if(n===4)pos=[8,30,54,76];else pos=[6,25,41,57,73,88];
  const wh=pos.map(p=>'<span class="st-car2-wheel'+(big?' big':'')+'" style="left:'+p+'%"></span>').join('');
  const load=(CARGO[cargo]||CARGO.book).icon;
  return '<div class="st-car2 '+(cls||'')+' '+(design&&design.load==='high'?'high':design&&design.load==='low'?'low':'')+'"><div class="st-car2-body"></div><div class="st-car2-load">'+load+'</div>'+wh+'</div>';
}
const c={
  no:'11',title:'轮子改变世界',short:'轮子',badge:'机械创造者',phase:'结构与机械',
  acc:'#60A5FA',acc2:'#DBEAFE',rgb:'96,165,250',icon:'🛞',words:['轮子','车轴','车身','测试'],
  coverTitle:'轮子',coverLine:'改变世界',lead:'装上轮子，小车就一定能跑吗？<br>用 <b style="color:var(--gold2);font-weight:600">SIT 乘法</b>复制一个轮子、改变它，再用跑道测试结果说话。',
  ability:'SIT 乘法 · 轮轴结构 · 测试改进',cta:'进入小车测试场',
  chapterNote:'本章用 SIT 乘法做轮子升级：复制一个轮子，再改变它的大小、数量或位置。然后用同一条跑道测试，观察小车能不能走直、载物稳不稳。',
  teacherRole:'不要替孩子修车。先问：“你现在遇到的具体问题是什么？哪个结构可能影响了运动？”',
  actNotes:[
    {goal:'理解运输任务：把一件轻质物品从起点运到终点。',qs:['“为什么有些小车会歪？”','“轮子、车轴、车身各起什么作用？”','“怎样才算完成运输？”'],tip:'先看一辆简单小车，不急着讲理论。'},
    {goal:'认识车身、车轮、车轴、载物区四个部分。',qs:['“轮子装在哪里？”','“车轴连接什么？”','“物品放在哪里最稳？”'],tip:'先点标签，再点小车位置；四个都放对再继续。'},
    {goal:'用 SIT 乘法复制轮子，并改变数量/大小。',qs:['“复制一个轮子，再改变它，会怎样？”','“轮子越多越稳吗？”','“大轮和小轮各有什么优缺点？”'],tip:'乘法不是简单加轮子；要改变一个属性，并说出预期。'},
    {goal:'画出小车设计：车身、车轮、车轴、载物区。',qs:['“车身多宽？”','“车轴装在哪里？”','“物品放高还是放低？”'],tip:'设计图要能指导制作；标出车轴位置。'},
    {goal:'用同一条跑道测试，记录直行、稳定、载物结果。',qs:['“小车往哪边偏？”','“轮子卡住了吗？”','“哪个结构最影响结果？”'],tip:'同样的路线、同样的物品；测试结果只代表这次。'},
    {goal:'用一分钟讲清楚结构、测试问题和改进。',qs:['“第一次测试遇到什么问题？”','“你改了什么？”','“改进后有什么变化？”'],tip:'可以推着小车边说边演示。'},
    {goal:'回顾 SIT 乘法与测试改进，颁发机械创造者徽章。',qs:['“哪个部件最影响小车走直？”','“如果继续改，你先改哪里？”'],tip:'测试记录可下载/存入实验室。'}
  ],
  acts:[]
};
c.acts=[
  {a:'01',name:'运输挑战',time:'',html:`
<div class="ch-head"><div class="act"><b>01</b><span>运输挑战</span></div><h2>把物品，<em>从起点运到终点</em></h2><p>今天，小车要把一件轻质物品稳定地运到终点。先选一件货物，再开始设计。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 乘法</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">货物 <b data-cargo>—</b></span></div>
<div class="st-user-grid" data-cargos>
  <button class="st-user-card" data-cargo="book"><span>📕</span><b>一本薄书</b><small>轻、扁，放在车上不容易滚</small></button>
  <button class="st-user-card" data-cargo="bottle"><span>🥤</span><b>一瓶水</b><small>会滚，转弯时容易倒</small></button>
  <button class="st-user-card" data-cargo="pencil"><span>✏️</span><b>一盒彩笔</b><small>轻、会散，怕掉出来</small></button>
</div>
<div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>装上轮子，不代表小车就一定能跑。先选货物，再看<em>车身、车轮、车轴、载物区</em>怎样配合。</div></div>
<div class="st-actions"><button class="btn primary" data-go="2" disabled data-next>认识小车部件 →</button><span class="hint">先选一件货物</span></div>
<div class="st-tip-strip"><div><b>同样的路线</b><span>起点、直线、终点完全一样。</span></div><div><b>同样的推动</b><span>不要用不同的力气比较。</span></div><div><b>同样的货物</b><span>每一轮都用同一件物品。</span></div></div>`,init(sec,api){
    const S=api.S;S.xp=S.xp||0;const t=sec.querySelector('[data-cargo]'),next=sec.querySelector('[data-next]'),xp=sec.querySelector('[data-xp]'),say=sec.querySelector('.st-coach .say');
    function render(){sec.querySelectorAll('[data-cargo]').forEach(b=>b.classList.toggle('on',b.dataset.cargo===S.cargo));if(S.cargo){t.textContent=CARGO[S.cargo].name;next.disabled=false;say.innerHTML='<b>发小明：</b>你选了 <em>'+CARGO[S.cargo].name+'</em>。下一步，认识小车的四个关键部件。';}xp.textContent=S.xp;}
    sec.querySelectorAll('[data-cargo]').forEach(b=>b.onclick=()=>{S.cargo=b.dataset.cargo;S.cargoName=CARGO[S.cargo].name;S.wheels='fourSmall';S.design={};S.test1='';S.test2='';S.fix='';api.save();render();api.sfx('pop');api.burst(innerWidth*.5,innerHeight*.4,16,['#60A5FA','#DBEAFE','#4FE0D0']);});
    next.onclick=()=>api.go(2);render();
    api.aiPanel(sec,{prompts:['为什么有些小车会歪？','轮子、车轴、车身各起什么作用？','物品放在哪里最稳？','怎样才算完成运输？']});
  }},
  {a:'02',name:'小车部件',time:'',html:`
<div class="ch-head"><div class="act"><b>02</b><span>小车部件</span></div><h2>车身、车轮、车轴、载物区，<em>各在哪里？</em></h2><p>先点一个标签，再点小车上的位置。四个部件都放对，才能继续。</p></div>
<div class="car-board">
  <div class="lever-palette"><button type="button" data-carlabel="body">车身 <small>承载和连接</small></button><button type="button" data-carlabel="wheel">车轮 <small>帮助滚动</small></button><button type="button" data-carlabel="axle">车轴 <small>连接/支撑车轮</small></button><button type="button" data-carlabel="load">载物区 <small>放运输物品</small></button></div>
  <div class="car-stage"><div class="car-body"></div><div class="car-load"></div><div class="car-axle"></div><div class="car-wheel left"></div><div class="car-wheel right"></div><button type="button" class="car-spot" data-cpos="body" style="left:36%;top:48%">车身<small data-cassign="body">？</small></button><button type="button" class="car-spot" data-cpos="wheel" style="left:20%;top:72%">车轮<small data-cassign="wheel">？</small></button><button type="button" class="car-spot" data-cpos="axle" style="left:52%;top:70%">车轴<small data-cassign="axle">？</small></button><button type="button" class="car-spot" data-cpos="load" style="left:48%;top:22%">载物区<small data-cassign="load">？</small></button></div>
  <div class="lever-note" data-note>先选一个标签，再点小车上的位置。</div>
  <div class="case-next"><button class="btn primary" data-go="3" disabled data-next>去做乘法升级 →</button><span>四个部件都放对，再继续</span></div>
</div>`,init(sec,api){
    const S=api.S;S.parts=S.parts||{body:'',wheel:'',axle:'',load:''};S.activeCarLabel='';const note=sec.querySelector('[data-note]'),next=sec.querySelector('[data-next]');const NAME={body:'车身',wheel:'车轮',axle:'车轴',load:'载物区'};
    function render(){sec.querySelectorAll('[data-carlabel]').forEach(b=>b.classList.toggle('selected',b.dataset.carlabel===S.activeCarLabel));sec.querySelectorAll('[data-cpos]').forEach(b=>{const k=b.dataset.cpos,v=S.parts[k];b.querySelector('[data-cassign]').textContent=v?NAME[v]:'？';b.classList.toggle('ok',v===k);b.classList.toggle('bad',!!v&&v!==k);});const ok=Object.keys(NAME).every(k=>S.parts[k]===k);next.disabled=!ok;note.innerHTML=ok?'四个部件都对了：<b style="color:var(--teal)">车身 · 车轮 · 车轴 · 载物区</b>。现在给轮子做乘法升级。':'先选一个标签，再点小车上的位置。';if(ok)api.sfx('chime');}
    sec.querySelectorAll('[data-carlabel]').forEach(b=>b.onclick=()=>{S.activeCarLabel=b.dataset.carlabel;api.save();render();api.sfx('tap');});sec.querySelectorAll('[data-cpos]').forEach(b=>b.onclick=()=>{if(!S.activeCarLabel){api.toast('先点一个标签','↑');return;}S.parts[b.dataset.cpos]=S.activeCarLabel;api.save();render();api.sfx('tap');});next.onclick=()=>api.go(3);render();
    api.aiPanel(sec,{prompts:['车轮装在哪里？','车轴连接什么？','物品放在哪里最稳？','哪个部件最影响小车走直？']});
  }},
  {a:'03',name:'SIT 乘法',time:'',html:`
<div class="ch-head"><div class="act"><b>03</b><span>SIT 乘法</span></div><h2>复制一个轮子，<em>再让它不一样</em></h2><p>复制轮子，改变数量或大小。不是越多越好，先说出你的预期，再用跑道测试。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 乘法</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">轮子 <b data-wheel>—</b></span></div>
<div class="st-track-stage" data-preview><div class="st-track"></div><div class="st-start">START</div><div class="st-end">FINISH</div><div data-car></div></div>
<div class="st-function-grid" data-options style="margin-top:9px">
  <button class="st-function-card" data-wheel-opt="fourSmall"><b>4 个小轮</b>轻、灵活，可能不稳。</button>
  <button class="st-function-card" data-wheel-opt="fourBig"><b>4 个大轮</b>滚动快，但车身会变高。</button>
  <button class="st-function-card" data-wheel-opt="six"><b>6 个轮子</b>更稳，但更重。</button>
  <button class="st-function-card" data-wheel-opt="two"><b>2 个轮子</b>最轻，但容易倒。</button>
</div>
<div class="st-actions"><button class="btn primary" data-go="4" disabled data-next>去设计小车 →</button><span class="hint">先选一种轮子方案</span></div>`,init(sec,api){
    const S=api.S;S.wheels=S.wheels||'fourSmall';const car=sec.querySelector('[data-car]'),opts=sec.querySelector('[data-options]'),next=sec.querySelector('[data-next]'),wh=sec.querySelector('[data-wheel]'),xp=sec.querySelector('[data-xp]');
    function render(){const nW=WHEELS[S.wheels]||WHEELS.fourSmall;wh.textContent=nW.name;car.innerHTML=carHTML(S.wheels,S.design,'',S.cargo);opts.querySelectorAll('[data-wheel-opt]').forEach(b=>b.classList.toggle('on',b.dataset.wheelOpt===S.wheels));next.disabled=false;xp.textContent=S.xp||0;}
    opts.querySelectorAll('[data-wheel-opt]').forEach(b=>b.onclick=()=>{S.wheels=b.dataset.wheelOpt;S.wheelsName=WHEELS[b.dataset.wheelOpt].name;S.xp=(S.xp||0)+10;api.save();render();api.sfx('success');api.burst(innerWidth*.5,innerHeight*.55,16,['#60A5FA','#DBEAFE','#4FE0D0']);});next.onclick=()=>api.go(4);render();
    api.aiPanel(sec,{prompts:['轮子越多越稳吗？','大轮和小轮各有什么优缺点？','复制一个轮子，再改变什么？','你准备怎么测试它？']});
  }},
  {a:'04',name:'设计小车',time:'',html:`
<div class="ch-head"><div class="act"><b>04</b><span>设计小车</span></div><h2>先画出<em>车身、车轮、车轴</em></h2><p>选车轴位置和载物区高度，画出你的小车。想一想：物品放在哪里最稳？</p></div>
<div class="st-split">
  <div class="st-track-stage" style="height:260px"><div class="st-track"></div><div class="st-start">START</div><div class="st-end">FINISH</div><div data-preview></div></div>
  <div class="st-side">
    <div class="st-lever-rows" data-rows>
      <div class="st-lever-row"><b>车轴</b><button data-k="axle" data-v="mid">中间</button><button data-k="axle" data-v="front">靠前</button><button data-k="axle" data-v="back">靠后</button></div>
      <div class="st-lever-row"><b>载物</b><button data-k="load" data-v="low">低</button><button data-k="load" data-v="mid">中</button><button data-k="load" data-v="high">高</button></div>
      <div class="st-lever-row"><b>车身</b><button data-k="body" data-v="light">轻</button><button data-k="body" data-v="strong">加固</button></div>
    </div>
    <div class="st-spec" style="display:grid;grid-template-columns:1fr 1fr">
      <div class="field"><label>小车名称</label><input data-f="name" maxlength="24" placeholder="例如：直线运输车"></div>
      <div class="field"><label>最担心的</label><input data-f="improve" maxlength="30" placeholder="会歪？会卡？物品会掉？"></div>
      <div class="field" style="grid-column:1/-1"><label>它怎样工作</label><textarea data-f="how" maxlength="70" placeholder="轮子怎样装？物品放在哪里？"></textarea></div>
      <div class="st-mini-draw" style="grid-column:1/-1"><div class="draw-head"><span>手绘 · 可选</span><span data-draw-state>未开始</span></div><canvas data-draw width="600" height="300"></canvas></div>
      <div style="display:flex;gap:7px;flex-wrap:wrap;grid-column:1/-1"><button class="btn primary sm" data-gen>生成设计图 →</button><button class="btn ghost sm" data-go="5" data-next>去测试 →</button></div>
    </div>
  </div>
</div>`,init(sec,api){
    const S=api.S;S.design=S.design||{};S.design.axle=S.design.axle||'mid';S.design.load=S.design.load||'low';S.design.body=S.design.body||'light';const car=sec.querySelector('[data-preview]');
    const draw=api.initDrawing(sec,url=>{S.drawing=url;api.save();sec.querySelector('[data-draw-state]').textContent='已保存';});if(S.drawing&&draw)draw.load(S.drawing);
    sec.querySelectorAll('[data-f]').forEach(el=>{const k=el.dataset.f;el.value=S.design[k]||'';el.addEventListener('input',()=>{S.design[k]=el.value;api.save();});});
    function render(){car.innerHTML=carHTML(S.wheels,S.design,'',S.cargo);S.axle=S.design.axle;S.wheel=(WHEELS[S.wheels]||{}).name;sec.querySelectorAll('[data-k]').forEach(b=>b.classList.toggle('on',S.design[b.dataset.k]===b.dataset.v));}
    sec.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{S.design[b.dataset.k]=b.dataset.v;api.save();render();api.sfx('tap');});render();
    sec.querySelector('[data-gen]').onclick=()=>{const d=S.design;if(!d.name){api.toast('先给小车起个名字','🛞');return;}api.previewSheet({title:'小车设计与测试记录',subtitle:'第 11 章 · 轮子改变世界',code:'FXM-CUR-Q1-011',badge:'机械创造者',name:S.name||'小小机械师',date:new Date().toLocaleDateString('zh-CN'),filename:'小车设计_'+(S.name||'小小机械师'),stamp:'SIT 乘法',lab:{chapter:'11',chapterTitle:'轮子改变世界',name:S.name||'小小机械师',product:d.name,problem:'把'+S.cargoName+'运到终点',how:d.how||'',improve:d.improve},fields:[{label:'小车名称',value:d.name},{label:'货物',value:S.cargoName},{label:'轮子',value:(WHEELS[S.wheels]||{}).name},{label:'车轴',value:d.axle},{label:'载物高度',value:d.load},{label:'怎样工作',value:d.how}],drawing:S.drawing,drawLabel:'我的小车设计',footer:'部件 → 乘法 → 设计 → 测试'});};
    api.aiPanel(sec,{prompts:['车身多宽？','车轮平行吗？','物品会掉吗？','哪个部分最容易松？']});
  }},
  {a:'05',name:'小车测试',time:'',html:`
<div class="ch-head"><div class="act"><b>05</b><span>小车测试</span></div><h2>同一条跑道，<em>让小车跑一次</em></h2><p>点“发车”，看小车能不能走直、载物稳不稳。发现问题后，只改一个地方，再跑一次。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 测试</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">测试 <b data-testn>0</b>/2</span></div>
<div class="st-track-stage"><div class="st-track"></div><div class="st-start">START</div><div class="st-end">FINISH</div><div data-testcar></div><div class="st-car2-legend"><span data-leg-wheel>4 小轮</span><span data-leg-axle>车轴居中</span><span data-leg-load>载物低</span></div></div>
<div class="st-split" style="margin-top:9px">
  <div class="st-side">
    <div class="st-test-meters"><div class="st-test-meter"><span>直行</span><div class="bar"><i data-m-straight></i></div></div><div class="st-test-meter"><span>稳定</span><div class="bar"><i data-m-stable></i></div></div><div class="st-test-meter"><span>载物</span><div class="bar"><i data-m-load></i></div></div></div>
    <div class="st-test-readout" data-readout>点“发车”，看看会发生什么。</div>
  </div>
  <div class="st-side">
    <div class="st-car2-options" data-fixes><button class="st-car2-option" data-fix="low">降低载物</button><button class="st-car2-option" data-fix="center">车轴居中</button><button class="st-car2-option" data-fix="six">换成 6 轮</button></div>
    <div class="st-actions"><button class="btn primary sm" data-run>发车 →</button><button class="btn ghost sm" data-retest disabled>改进后再跑</button><button class="btn ghost sm" data-go="6" data-next disabled>去发布 →</button></div>
    <div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>一次只改一个地方。<em>如果同时改很多，变好了也不知道是哪一项起了作用。</em></div></div>
  </div>
</div>`,init(sec,api){
    const S=api.S;S.test1=S.test1||'';S.test2=S.test2||'';S.fix=S.fix||'';const car=sec.querySelector('[data-testcar]'),read=sec.querySelector('[data-readout]'),n=sec.querySelector('[data-testn]'),next=sec.querySelector('[data-next]'),run=sec.querySelector('[data-run]'),retest=sec.querySelector('[data-retest]'),fixes=sec.querySelector('[data-fixes]'),xp=sec.querySelector('[data-xp]');let timer=null;
    const TYPE={fourSmall:'4 小轮',fourBig:'4 大轮',six:'6 轮',two:'2 轮'};
    function renderStatic(keep){const d=S.design||{};S.axle=d.axle;S.wheel=TYPE[S.wheels]||'4 小轮';S.wheelsName=TYPE[S.wheels]||'4 小轮';if(!keep)car.innerHTML=carHTML(S.wheels,d,'',S.cargo);sec.querySelector('[data-leg-wheel]').textContent=TYPE[S.wheels]||'4 小轮';sec.querySelector('[data-leg-axle]').textContent='车轴'+(d.axle==='front'?'靠前':d.axle==='back'?'靠后':'居中');sec.querySelector('[data-leg-load]').textContent='载物'+(d.load==='high'?'高':d.load==='low'?'低':'中');n.textContent=(S.test1?1:0)+(S.test2?1:0);xp.textContent=S.xp||0;next.disabled=!S.test2;retest.disabled=!S.test1;fixes.querySelectorAll('[data-fix]').forEach(b=>b.classList.toggle('on',b.dataset.fix===S.fix));}
    function outcome(){
      const d=S.design||{};const w=S.wheels;
      if(w==='two'||d.load==='high')return {type:'tip',straight:35,stable:28,load:45,text:'小车翻了：轮子太少/载物太高，重心不稳。'};
      if(d.axle==='front'||d.axle==='back')return {type:'veer',straight:48,stable:55,load:62,text:'小车走偏了：车轴不居中，左右受力不一样。'};
      if(w==='six')return {type:'run',straight:82,stable:92,load:82,text:'能走直，也很稳，但车身偏重、速度慢。'};
      if(w==='fourBig')return {type:'run',straight:88,stable:82,load:80,text:'能走直，速度快；但车身变高，转弯要小心。'};
      return {type:'run',straight:90,stable:78,load:84,text:'能走直，载物也稳；继续检查车轴是否牢固。'};
    }
    function animate(res,which){car.innerHTML=carHTML(S.wheels,S.design,(res.type==='tip'?'tip':res.type==='veer'?'veer':'run'),S.cargo);const c=car.querySelector('.st-car2');setTimeout(()=>{const o=outcome();const key=which==='1'?'test1':'test2';S[key]=o.text;if(which==='1')S.found=o.text;else S.improve='改进：'+S.fix;S.xp=(S.xp||0)+10;api.save();read.innerHTML='<b style="color:'+(o.type==='run'?'var(--teal)':'#FFB3A8')+'">'+(which==='1'?'第一次测试':'改进后测试')+'</b><br>'+o.text;sec.querySelector('[data-m-straight]').style.width=o.straight+'%';sec.querySelector('[data-m-stable]').style.width=o.stable+'%';sec.querySelector('[data-m-load]').style.width=o.load+'%';renderStatic(true);api.sfx(o.type==='run'?'success':'error');if(o.type==='run')api.burst(innerWidth*.55,innerHeight*.55,18,['#60A5FA','#4FE0D0','#F5C451']);},2200);}
    run.onclick=()=>{if(timer)return;run.disabled=true;read.textContent='发车中…';timer=setTimeout(()=>{timer=null;run.disabled=false;animate(outcome(),'1');},50);};
    sec.querySelectorAll('[data-fix]').forEach(b=>b.onclick=()=>{S.fix=b.dataset.fix;if(S.fix==='low')S.design.load='low';if(S.fix==='center')S.design.axle='mid';if(S.fix==='six')S.wheels='six';api.save();renderStatic();api.sfx('tap');});
    retest.onclick=()=>{if(!S.fix){api.toast('先选一个改进','🔧');return;}if(timer)return;read.textContent='改进后发车中…';animate(outcome(),'2');};
    next.onclick=()=>api.go(6);renderStatic();
    api.aiPanel(sec,{prompts:['小车往哪边偏？','轮子卡住了吗？','哪个结构最影响结果？','你准备先改哪里？']});
  }},
  c2pitch({...c,a:'06',name:'运输工程展',h2:'讲清楚：<em>它为什么能走</em>',p:'拿着小车，边演示边说：轮子方案、车轴、载物、测试问题和改进。',lines:[{pre:'大家好，我是 ',key:'name',post:'。'},{pre:'我的小车叫：',key:'product',post:'。'},{pre:'我用了：',key:'wheel',post:'。'},{pre:'车轴/载物：',key:'axle',post:'。'},{pre:'第一次测试：',key:'test',post:'。'},{pre:'我做的改进是：',key:'improve',post:'。'}],next:7,nextLabel:'领取徽章 →',seconds:60,stageLabel:'小小运输工程展',badge:'机械创造者',foot:'介绍失败和改进过程，比只展示最终作品更能说明你经历了工程实践。'}),
  c2badge({...c,a:'07',name:'机械创造者徽章',h2:'你让一辆小车，<em>真正跑起来了</em>',p:'你认识了车身、车轮、车轴和载物区，用 SIT 乘法升级轮子，设计了小车，在跑道上测试并改进了它。',journey:[['🧩','部件','车身/车轮/车轴/载物'],['✖️','乘法','复制轮子并改变'],['🛞','测试','跑道直行/载物'],['🔁','改进','一次只改一个地方']],reflect:['小车往哪边偏？可能是什么原因？','哪个部件最影响它走直？','如果继续改，你先改哪里？'],homeworkTitle:'观察一种运输工具',homework:'安全地观察行李箱、购物车或自行车，画出它的轮子、支撑结构和载物区。不要拆卸或进行危险测试。',certLabel:'下载测试记录',certTitle:'小车测试记录',certFields:[['小车名称','name'],['货物','cargoName'],['轮子','wheelsName'],['车轴','axle'],['第一次测试','test1'],['我的改进','fix']],quote:'“当小车不能按预期移动时，我们可以通过观察和测试，找到问题并继续改进。”',prev:6,actNotes:c.actNotes})
].map(a=>a);
window.FXM_CHAPTERS['11']={...c,cover:c2cover(c),notes:c2notes(c)};
})();

/* =========================================================
   第 12 章《我的第一个工程任务》· SIT 工程任务控制台
   ========================================================= */
(function(){
const ROUTES={smooth:{name:'平滑桌面',diff:'简单',icon:'🟦'},bump:{name:'减速带',diff:'中等',icon:'🟨'},slope:{name:'小斜坡',diff:'挑战',icon:'🟥'}};
const SYS={power:{label:'动力',opts:[['battery','电池 + 马达',2],['spring','橡皮筋',1],['hand','手推',0]]},frame:{label:'结构',opts:[['wide','宽底盘',2],['narrow','窄底盘',0],['light','轻框架',1]]},wheel:{label:'行走',opts:[['4','四轮',2],['3','三轮',1],['track','履带',2]]},cargo:{label:'载物',opts:[['low','低杯架',2],['high','高杯架',0],['clip','夹子固定',1]]}};
function roverHTML(sys,cls){
  const w=(sys&&sys.wheel==='3')?3:4;let pos=w===3?[8,44,78]:[8,32,60,84];
  const wh=pos.map(p=>'<span class="st-rover-wheel" style="left:'+p+'%"></span>').join('');
  const high=sys&&sys.cargo==='high';
  return '<div class="st-rover '+(cls||'')+(high?' high':'')+'"><div class="st-rover-body"></div><div class="st-rover-cup">🥛</div>'+wh+'</div>';
}
const c={
  no:'12',title:'我的第一个工程任务',short:'工程任务',badge:'工程任务指挥官',phase:'工程挑战',
  acc:'#FB7185',acc2:'#FFE4E6',rgb:'251,113,133',icon:'🎛️',words:['系统','测试','诊断','改进'],
  coverTitle:'我的第一个',coverLine:'工程任务',lead:'一辆小车、一杯水、一条有障碍的路线。<br>用 <b style="color:var(--gold2);font-weight:600">SIT 除法</b>把任务拆成系统，再用测试日志找到问题。',
  ability:'SIT 除法 · 系统思维 · 测试诊断',cta:'进入任务控制台',
  chapterNote:'本章用 SIT 除法把工程任务拆成动力、结构、行走、载物四个子系统，再用“测试—日志—诊断—改进—再测”的工程流程完成任务。重点是系统配合，不是单个零件。',
  teacherRole:'不要替孩子修车。先让他读日志、说现象，再问“哪个子系统最可能造成这个现象？”允许诊断错误，再根据测试修正。',
  actNotes:[
    {goal:'理解任务：把一杯水从 A 运到 B，尽量不洒。',qs:['“任务成功的标准是什么？”','“路线有什么不同？”','“哪个地方最可能出问题？”'],tip:'先明确“成功”和“失败”，再开始设计。'},
    {goal:'用 SIT 除法把运输任务拆成动力、结构、行走、载物四个子系统。',qs:['“动力从哪里来？”','“哪个部分负责稳定？”','“杯子放在哪里？”'],tip:'每个子系统选一个方案；系统之间要配合。'},
    {goal:'进行第一次运输测试，读日志、看现象。',qs:['“它在哪一段出问题？”','“是停住、走偏，还是洒了？”','“日志里哪句话最关键？”'],tip:'先描述现象，不急着说原因。'},
    {goal:'根据现象诊断最可能的子系统，并选择一个改进。',qs:['“这个现象更像动力、结构、行走还是载物问题？”','“你的证据是什么？”'],tip:'诊断可以错；关键是说出“现象→证据→判断”。'},
    {goal:'改进后再测一次，比较两次结果。',qs:['“第二次哪一项变好了？”','“还有哪里没解决？”'],tip:'一次只改一个子系统；记录变化。'},
    {goal:'用一分钟做任务汇报：任务、系统、失败、诊断、改进、结果。',qs:['“第一次为什么失败？”','“你的证据是什么？”','“第二次成功了吗？”'],tip:'可以看着日志说，像工程师汇报一样。'},
    {goal:'回顾 SIT 除法与工程流程，颁发工程任务指挥官徽章。',qs:['“哪个子系统最影响任务？”','“下次你会先测什么？”'],tip:'任务记录可下载/存入实验室。'}
  ],
  acts:[]
};
c.acts=[
  {a:'01',name:'任务简报',time:'',html:`
<div class="ch-head"><div class="act"><b>01</b><span>任务简报</span></div><h2>把一杯水，<em>安全运到终点</em></h2><p>任务是：让运输车把一杯水从 A 运到 B，尽量不洒。先选一条路线，看看难度。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 除法</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">路线 <b data-route>—</b></span></div>
<div class="st-arena-grid" data-routes>
  <button class="st-arena-card" data-route="smooth"><div style="font-size:42px">🟦</div><b>平滑桌面</b><small>难度：简单 · 适合第一次测试</small></button>
  <button class="st-arena-card" data-route="bump"><div style="font-size:42px">🟨</div><b>减速带</b><small>难度：中等 · 会颠一下</small></button>
  <button class="st-arena-card" data-route="slope"><div style="font-size:42px">🟥</div><b>小斜坡</b><small>难度：挑战 · 要控制速度</small></button>
</div>
<div class="st-coach">${FXMStudio.ROBOT}<div class="say"><b>发小明：</b>工程任务不是“做一个最酷的车”，而是<em>让系统在真实路线里完成任务</em>。先选路线，再拆系统。</div></div>
<div class="st-actions"><button class="btn primary" data-go="2" disabled data-next>拆解运输系统 →</button><span class="hint">先选一条路线</span></div>
<div class="st-tip-strip"><div><b>成功标准</b><span>到达终点，水剩余超过 3/4。</span></div><div><b>测试规则</b><span>同样的起点、同样的推动。</span></div><div><b>安全</b><span>用轻质材料，不接触电源危险部位。</span></div></div>`,init(sec,api){
    const S=api.S;S.xp=S.xp||0;const r=sec.querySelector('[data-route]'),next=sec.querySelector('[data-next]'),xp=sec.querySelector('[data-xp]'),say=sec.querySelector('.st-coach .say');
    function render(){sec.querySelectorAll('[data-route]').forEach(b=>b.classList.toggle('on',b.dataset.route===S.route));if(S.route){r.textContent=ROUTES[S.route].name;next.disabled=false;say.innerHTML='<b>发小明：</b>你选了 <em>'+ROUTES[S.route].name+'</em>（'+ROUTES[S.route].diff+'）。下一步，把运输任务拆成四个子系统。';}xp.textContent=S.xp;}
    sec.querySelectorAll('[data-route]').forEach(b=>b.onclick=()=>{S.route=b.dataset.route;S.routeName=ROUTES[S.route].name;S.sys={power:'battery',frame:'wide',wheel:'4',cargo:'low'};S.test1='';S.test2='';S.cause='';S.fix='';api.save();render();api.sfx('pop');api.burst(innerWidth*.5,innerHeight*.4,16,['#FB7185','#FFE4E6','#F5C451']);});
    next.onclick=()=>api.go(2);render();
    api.aiPanel(sec,{prompts:['任务成功的标准是什么？','路线有什么不同？','哪个地方最可能出问题？','你准备怎样测试？']});
  }},
  {a:'02',name:'系统拆解',time:'',html:`
<div class="ch-head"><div class="act"><b>02</b><span>系统拆解</span></div><h2>把运输车拆成<em>四个子系统</em></h2><p>动力、结构、行走、载物，每个系统选一个方案。它们必须互相配合。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 除法</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">系统分 <b data-score>0</b></span></div>
<div class="st-console">
  <div class="st-console-stage"><div class="st-console-track"></div><div class="st-console-a">A</div><div class="st-console-b">B</div><div data-preview>${roverHTML({power:'battery',frame:'wide',wheel:'4',cargo:'low'})}</div></div>
  <div class="st-side">
    <div class="st-part-choices" data-rows></div>
    <div class="st-feature" data-note>四个子系统都选好，系统分越高，测试越有希望。</div>
    <div class="st-actions"><button class="btn primary" data-go="3" disabled data-next>第一次运输测试 →</button></div>
  </div>
</div>`,init(sec,api){
    const S=api.S;S.sys=S.sys||{power:'battery',frame:'wide',wheel:'4',cargo:'low'};const rows=sec.querySelector('[data-rows]'),preview=sec.querySelector('[data-preview]'),score=sec.querySelector('[data-score]'),note=sec.querySelector('[data-note]'),next=sec.querySelector('[data-next]'),xp=sec.querySelector('[data-xp]');
    function points(){let p=0;Object.keys(SYS).forEach(k=>{const o=SYS[k].opts.find(x=>x[0]===S.sys[k]);p+=o?o[2]:0;});return p;}
    function render(){preview.innerHTML=roverHTML(S.sys);rows.innerHTML=Object.entries(SYS).map(([k,P])=>'<div class="st-part-row"><b>'+P.label+'</b>'+P.opts.map(o=>'<button data-sys="'+k+'" data-v="'+o[0]+'" class="'+(S.sys[k]===o[0]?'on':'')+'">'+o[1]+'</button>').join('')+'</div>').join('');rows.querySelectorAll('[data-sys]').forEach(b=>b.onclick=()=>{S.sys[b.dataset.sys]=b.dataset.v;api.save();render();api.sfx('tap');});const p=points();S.sysScore=p;const PN={power:{battery:'电池+马达',spring:'橡皮筋',hand:'手推'},frame:{wide:'宽底盘',narrow:'窄底盘',light:'轻框架'},wheel:{'4':'四轮','3':'三轮',track:'履带'},cargo:{low:'低杯架',high:'高杯架',clip:'夹子固定'}};S.system=(PN.power[S.sys.power]||'—')+' / '+(PN.frame[S.sys.frame]||'—')+' / '+(PN.wheel[S.sys.wheel]||'—')+' / '+(PN.cargo[S.sys.cargo]||'—');score.textContent=p;note.innerHTML='当前系统分：<b>'+p+'</b>。系统分高不代表一定成功，真实路线还会带来意外。';next.disabled=false;xp.textContent=S.xp||0;}
    next.onclick=()=>api.go(3);render();
    api.aiPanel(sec,{prompts:['动力从哪里来？','哪个部分负责稳定？','杯子放在哪里？','系统之间怎样配合？']});
  }},
  {a:'03',name:'第一次测试',time:'',html:`
<div class="ch-head"><div class="act"><b>03</b><span>第一次测试</span></div><h2>先看现象，<em>再找原因</em></h2><p>点“开始任务”，看运输车在哪里出问题。读日志，不要急着下结论。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 测试</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">测试 <b data-testn>0</b>/2</span></div>
<div class="st-console">
  <div class="st-console-stage"><div class="st-console-track"></div><div class="st-console-a">A</div><div class="st-console-b">B</div><div data-rover></div></div>
  <div class="st-side">
    <div class="st-telemetry" data-telemetry><div class="st-gauge"><div class="gt"><span>稳定</span><b data-g1>—</b></div><div class="gb"><i data-b1></i></div></div><div class="st-gauge"><div class="gt"><span>抓地</span><b data-g2>—</b></div><div class="gb"><i data-b2></i></div></div><div class="st-gauge"><div class="gt"><span>载物</span><b data-g3>—</b></div><div class="gb"><i data-b3></i></div></div></div>
    <div class="st-log" data-log><div><b>任务日志</b> 等待启动…</div></div>
    <div class="st-actions"><button class="btn primary sm" data-run>开始任务 →</button><button class="btn ghost sm" data-go="4" data-next disabled>去诊断 →</button></div>
  </div>
</div>`,init(sec,api){
    const S=api.S;const rover=sec.querySelector('[data-rover]'),log=sec.querySelector('[data-log]'),run=sec.querySelector('[data-run]'),next=sec.querySelector('[data-next]'),xp=sec.querySelector('[data-xp]');let timer=null;
    function paint(v1,v2,v3){['1','2','3'].forEach((n,i)=>{const b=sec.querySelector('[data-b'+n+']'),g=sec.querySelector('[data-g'+n+']');b.style.width=[v1,v2,v3][i]+'%';g.textContent=[v1,v2,v3][i]+'%';});}
    function renderStatic(){rover.innerHTML=roverHTML(S.sys);paint(0,0,0);xp.textContent=S.xp||0;next.disabled=!S.test1;}
    function start(){if(timer)return;run.disabled=true;log.innerHTML='<div><b>[00:00]</b> 任务启动，沿'+ROUTES[S.route].name+'前进…</div>';rover.innerHTML=roverHTML(S.sys,'spill');paint(45,55,50);timer=setTimeout(()=>{timer=null;run.disabled=false;log.innerHTML='<div><b>[00:00]</b> 任务启动</div><div><b>[00:03]</b> 到达第一段路线</div><div class="bad"><b>[00:06]</b> 杯子在载物区滑动，水洒出</div><div class="bad"><b>[00:07]</b> 任务暂停：水剩余不足 3/4</div>';S.test1='在'+ROUTES[S.route].name+'上，杯子滑动、水洒出，任务暂停。';S.xp=(S.xp||0)+10;api.save();paint(46,58,34);api.sfx('error');api.burst(innerWidth*.45,innerHeight*.5,20,['#FF7A6B','#FB7185','#F5C451']);next.disabled=false;xp.textContent=S.xp;},2400);}
    run.onclick=start;next.onclick=()=>api.go(4);renderStatic();
    api.aiPanel(sec,{prompts:['它在哪一段出问题？','是停住、走偏，还是洒了？','日志里哪句话最关键？','这是哪个子系统的问题？']});
  }},
  {a:'04',name:'诊断台',time:'',html:`
<div class="ch-head"><div class="act"><b>04</b><span>诊断台</span></div><h2>现象 → 证据 → <em>最可能的子系统</em></h2><p>日志说“杯子滑动、水洒出”。先选一个最可能的原因，再选一个改进。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 诊断</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">诊断 <b data-cause>—</b></span></div>
<div class="st-console">
  <div class="st-console-stage" style="height:180px"><div class="st-log" style="position:absolute;inset:12px;height:auto"><div><b>任务日志</b></div><div><b>[00:03]</b> 到达第一段路线</div><div class="bad"><b>[00:06]</b> 杯子在载物区滑动，水洒出</div><div class="bad"><b>[00:07]</b> 任务暂停：水剩余不足 3/4</div></div></div>
  <div class="st-side">
    <div class="st-cause-grid" data-causes>
      <button class="st-cause" data-cause="power">🔋 电池没电，动力不足</button>
      <button class="st-cause" data-cause="cargo">🥛 杯子没有固定，载物区不稳</button>
      <button class="st-cause" data-cause="wheel">🛞 轮子打滑，走不动</button>
    </div>
    <div class="st-fix-grid" data-fixes><button class="st-fix-chip" data-fix="strap">加防滑绑带</button><button class="st-fix-chip" data-fix="low">降低杯架</button><button class="st-fix-chip" data-fix="wall">加围栏</button></div>
    <div class="st-test-readout" data-result>先选原因，再选改进。</div>
    <div class="st-actions"><button class="btn primary" data-go="5" disabled data-next>改进后再测 →</button></div>
  </div>
</div>`,init(sec,api){
    const S=api.S;S.cause=S.cause||'';S.fix=S.fix||'';const causes=sec.querySelectorAll('[data-cause]'),fixes=sec.querySelectorAll('[data-fix]'),res=sec.querySelector('[data-result]'),next=sec.querySelector('[data-next]'),c=sec.querySelector('[data-cause]'),xp=sec.querySelector('[data-xp]');
    function render(){causes.forEach(b=>{b.classList.toggle('on',b.dataset.cause===S.cause);b.classList.toggle('correct',S.cause==='cargo'&&b.dataset.cause==='cargo');b.classList.toggle('wrong',!!S.cause&&S.cause!=='cargo'&&b.dataset.cause===S.cause);});fixes.forEach(b=>b.classList.toggle('on',b.dataset.fix===S.fix));if(S.cause)c.textContent=({power:'动力不足',cargo:'载物不稳',wheel:'轮子打滑'})[S.cause];if(S.cause==='cargo'&&S.fix){S.improve=({strap:'加防滑绑带',low:'降低杯架',wall:'加围栏'})[S.fix];res.innerHTML='<b style="color:var(--teal)">诊断正确：载物区</b><br>改进：'+S.improve+'。下一步再测一次。';next.disabled=false;}else if(S.cause){res.innerHTML='<b style="color:#FFB3A8">这个原因和日志对不上。</b><br>再看一遍：杯子是在哪里滑动的？';next.disabled=true;}else res.textContent='先选原因，再选改进。';xp.textContent=S.xp||0;}
    causes.forEach(b=>b.onclick=()=>{S.cause=b.dataset.cause;S.causeLabel=({power:'动力不足',cargo:'载物区不稳',wheel:'轮子打滑'})[S.cause];api.save();render();api.sfx(b.dataset.cause==='cargo'?'success':'error');});fixes.forEach(b=>b.onclick=()=>{S.fix=b.dataset.fix;api.save();render();api.sfx('tap');});next.onclick=()=>api.go(5);render();
    api.aiPanel(sec,{prompts:['这个现象更像动力、结构、行走还是载物问题？','你的证据是什么？','如果诊断错了，会怎样？','哪个改进最直接？']});
  }},
  {a:'05',name:'改进再测',time:'',html:`
<div class="ch-head"><div class="act"><b>05</b><span>改进再测</span></div><h2>改了载物区，<em>再跑一次</em></h2><p>这一次，杯子被固定住了。点“再次任务”，比较两次的日志和指标。</p></div>
<div class="st-hud"><span class="hchip sit">SIT · 改进</span><span class="hchip xp">XP <b data-xp>0</b></span><span class="hchip">测试 <b data-done>0</b>/2</span></div>
<div class="st-console">
  <div class="st-console-stage"><div class="st-console-track"></div><div class="st-console-a">A</div><div class="st-console-b">B</div><div data-rover2></div></div>
  <div class="st-side">
    <div class="st-telemetry"><div class="st-gauge"><div class="gt"><span>稳定</span><b data-h1>—</b></div><div class="gb"><i data-i1></i></div></div><div class="st-gauge"><div class="gt"><span>抓地</span><b data-h2>—</b></div><div class="gb"><i data-i2></i></div></div><div class="st-gauge"><div class="gt"><span>载物</span><b data-h3>—</b></div><div class="gb"><i data-i3></i></div></div></div>
    <div class="st-log" data-log2><div><b>任务日志</b> 等待再次任务…</div></div>
    <div class="st-pass" data-pass><div><b>第一次</b>水剩余 62%</div><div><b>第二次</b>—</div></div>
    <div class="st-actions"><button class="btn primary sm" data-run2>再次任务 →</button><button class="btn ghost sm" data-go="6" data-next disabled>去汇报 →</button></div>
  </div>
</div>`,init(sec,api){
    const S=api.S;const rover=sec.querySelector('[data-rover2]'),log=sec.querySelector('[data-log2]'),run=sec.querySelector('[data-run2]'),next=sec.querySelector('[data-next]'),done=sec.querySelector('[data-done]'),pass=sec.querySelector('[data-pass]'),xp=sec.querySelector('[data-xp]');let timer=null;
    function paint(a,b,c){['1','2','3'].forEach((n,i)=>{sec.querySelector('[data-i'+n+']').style.width=[a,b,c][i]+'%';sec.querySelector('[data-h'+n+']').textContent=[a,b,c][i]+'%';});}
    function renderStatic(){rover.innerHTML=roverHTML(S.sys);paint(0,0,0);done.textContent=S.test2?'2':'1';next.disabled=!S.test2;xp.textContent=S.xp||0;}
    run.onclick=()=>{if(timer)return;run.disabled=true;log.innerHTML='<div><b>[00:00]</b> 再次任务启动…</div>';rover.innerHTML=roverHTML(S.sys,'run');paint(65,70,75);timer=setTimeout(()=>{timer=null;run.disabled=false;log.innerHTML='<div><b>[00:00]</b> 再次任务启动</div><div><b>[00:03]</b> 通过第一段路线</div><div class="good"><b>[00:06]</b> 杯子固定，没有滑动</div><div class="good"><b>[00:09]</b> 到达 B 点：任务完成，水剩余 91%</div>';S.test2='任务完成，水剩余 91%。';S.result='水剩余 91%，任务完成';S.xp=(S.xp||0)+15;api.save();paint(88,84,91);pass.innerHTML='<div><b>第一次</b>水剩余 62% · 暂停</div><div><b>第二次</b>水剩余 91% · 完成</div>';done.textContent='2';next.disabled=false;xp.textContent=S.xp;api.sfx('success');api.burst(innerWidth*.5,innerHeight*.5,28,['#4FE0D0','#F5C451','#FB7185']);},2400);};
    next.onclick=()=>api.go(6);renderStatic();
    api.aiPanel(sec,{prompts:['第二次哪一项变好了？','还有哪里没解决？','如果路线更难，会怎样？','下一次你会先测什么？']});
  }},
  {a:'06',name:'任务汇报',time:'',html:`
<div class="ch-head"><div class="act"><b>06</b><span>任务汇报</span></div><h2>像工程师一样，<em>汇报一次任务</em></h2><p>汇报任务、系统、第一次失败、诊断、改进、第二次结果。失败和改进都是工程的一部分。</p></div>
<div class="stage-wrap"><div class="curtain l"></div><div class="curtain r"></div><div class="spot"></div><div class="stage-floor"></div>
  <div class="stage-content">
    <div class="stage-top"><span>工程任务汇报 · MISSION CONTROL</span><span class="who" data-name>工程任务指挥官</span></div>
    <div class="speech">
      <p class="lead">大家好，我是 <b data-name2>工程任务指挥官</b>。</p>
      <p>我的任务是：把一杯水从 A 运到 B。</p>
      <p>路线是：<b data-route>……</b></p>
      <p>我的系统是：<b data-system>……</b></p>
      <p>第一次测试：<b data-test1>……</b></p>
      <p>我的诊断和改进：<b data-fix>……</b></p>
      <p>第二次测试：<b data-test2>……</b></p>
    </div>
    <div class="stage-controls"><div class="timer" data-timer><div class="mini-timer"><b data-timer-num>60</b><span>秒</span></div><div class="timer-btns"><button class="main" data-timer-start>开始 60 秒</button><button data-timer-reset>重置</button></div></div><div class="applause"><button class="applause-btn" data-clap>👏</button><div class="applause-meter"><div class="am-top"><span>掌声能量</span><b><span data-clap-count>0</span></b></div><div class="ambar"><i data-clap-bar></i></div></div></div><button class="btn ghost sm" data-go="7">领取徽章 →</button></div>
  </div>
</div>
<div class="st-audience"><span>🧒</span><span>👧</span><span>🧑</span><span>👦</span><span>👩</span></div>`,init(sec,api){
    const S=api.S;const name=S.name||'工程任务指挥官';const set=(s,v)=>{const el=sec.querySelector(s);if(el)el.textContent=v||'……';};const P=S.sys||{};const PN={power:{battery:'电池+马达',spring:'橡皮筋',hand:'手推'},frame:{wide:'宽底盘',narrow:'窄底盘',light:'轻框架'},wheel:{'4':'四轮','3':'三轮',track:'履带'},cargo:{low:'低杯架',high:'高杯架',clip:'夹子固定'}};
    set('[data-name]',name);set('[data-name2]',name);set('[data-route]',S.routeName||'—');set('[data-system]',(PN.power[P.power]||'—')+' / '+(PN.frame[P.frame]||'—')+' / '+(PN.wheel[P.wheel]||'—')+' / '+(PN.cargo[P.cargo]||'—'));set('[data-test1]',S.test1);set('[data-fix]',S.improve||'—');set('[data-test2]',S.test2);
    api.timer(sec,{seconds:60,onEnd:()=>api.toast('时间到，谢谢大家的聆听','⏰')});let energy=0,count=0;const aud=sec.querySelector('.st-audience');sec.querySelector('[data-clap]').onclick=()=>{energy=Math.min(100,energy+7);count++;sec.querySelector('[data-clap-count]').textContent=count;sec.querySelector('[data-clap-bar]').style.width=energy+'%';aud.classList.remove('clap');void aud.offsetWidth;aud.classList.add('clap');api.sfx('pop');};
  }},
  c2badge({...c,a:'07',name:'工程任务指挥官徽章',h2:'你完成了一次<em>真正的工程任务</em>',p:'你把任务拆成四个子系统，测试、读日志、诊断载物区问题、改进并再次测试。你经历了“设计—测试—失败—诊断—改进—成功”的完整过程。',journey:[['🧩','系统','动力/结构/行走/载物'],['🧪','测试','第一次任务'],['🔍','诊断','现象→证据→原因'],['✅','再测','任务完成']],reflect:['第一次失败时，你的第一反应是什么？','哪个证据帮助你找到原因？','如果路线更难，系统还要改哪里？'],homeworkTitle:'观察一个系统',homework:'安全地观察一件家用电器或交通工具，画出它的动力、结构、控制和载物/功能部分，不要拆卸。',certLabel:'下载任务记录',certTitle:'工程任务记录',certFields:[['路线','routeName'],['系统','system'],['第一次测试','test1'],['诊断','causeLabel'],['改进','improve'],['第二次测试','test2']],quote:'“工程不是一次成功，而是不断测试、诊断和改进。”',prev:6,actNotes:c.actNotes})
].map(a=>a);
window.FXM_CHAPTERS['12']={...c,cover:c2cover(c),notes:c2notes(c)};
})();
