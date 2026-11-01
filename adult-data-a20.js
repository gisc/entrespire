/* A20 · 除法：重排后的责任真空 */
(function(){
'use strict';

const FORMS=[
 {k:'p1',n:'① 原来的人不再经过',s:'原来的人不再经过'},
 {k:'p2',n:'② 新位置的人没被授权',s:'新位置的人没被授权'},
 {k:'p3',n:'③ 异常路径没人设计',s:'异常路径没人设计'},
 {k:'p4',n:'④ 数据/记录断点',s:'数据/记录断点'}
];
const WHOS=[
 {k:'old',n:'原岗位'},{k:'new',n:'新岗位'},{k:'sys',n:'系统'},{k:'user',n:'用户'}
];
const fname=k=>{const f=FORMS.find(x=>x.k===k);return f?f.n:'—';};
const fshort=k=>{const f=FORMS.find(x=>x.k===k);return f?f.s:'—';};
const wname=k=>{const w=WHOS.find(x=>x.k===k);return w?w.n:'—';};

const CASES=[
 {n:'H&M 试衣间结账',move:'付款：收银台 → 试衣间',
  form:'p1',who:'new',
  formWhy:'收银员原来经手每件衣服，拆扣是顺手动作。付款挪走之后，收银员不再经过这一步。',
  whoWhy:'给试衣间店员配拆扣器并授权，让付款和拆扣在同一刻完成，不用再把衣服送回收银台。',
  conseq:'扣子跟着衣服出门，门禁报警；店员追出去拆，队伍停在门口。',
  prompt:'如果没人拆扣，会发生什么？'},

 {n:'医院检验前置',move:'抽血：看完医生 → 挂号时',
  form:'p3',who:'sys',
  formWhy:'顺的时候少跑一趟；报告异常、抽错管、病人没空腹，这些岔路原来由医生在诊室里接。',
  whoWhy:'把"哪个套餐能先抽"写进挂号系统，开单规则跟着套餐走；异常结果自动回到医生队列。',
  conseq:'抽了不该抽的项目，报告没人认领，病人拿着单子在三层楼之间问。',
  prompt:'如果异常没人接，会发生什么？'},

 {n:'翻转课堂',move:'讲授：课上 → 课前视频',
  form:'p4',who:'sys',
  formWhy:'老师原来站在教室里，一眼看得出谁没懂；视频看完没有记录，课上就不知道从哪一层开始。',
  whoWhy:'课前 3 道前测 + 观看进度回传，课上按数据分组，而不是按感觉讲。',
  conseq:'课上按"大家都看了"讲，一半人跟不上，另一半人白坐 45 分钟。',
  prompt:'如果没有记录，会发生什么？'},

 {n:'星巴克手机点单',move:'点单+付款：到店后 → 到店前',
  form:'p3',who:'user',
  formWhy:'正常单在手机上走完；改单、做错、少冰去奶这些岔路，原来是在柜台当面解决的。',
  whoWhy:'改单入口留在用户手里：取杯前 30 秒可改、可退。不要让吧台在高峰期替用户改单。',
  conseq:'做错的杯子堆在取餐台，店员一边做一边解释，队伍越排越长。',
  prompt:'如果改单没人管，会发生什么？'},

 {n:'床边结算',move:'出院结算：出院窗口 → 病床边',
  form:'p2',who:'old',
  formWhy:'护士人在床边，但没有收费、退费、改医嘱的权限；原来窗口的人有。',
  whoWhy:'让收费员带移动终端到床边，权限跟着人走；护士只负责确认，不碰钱。',
  conseq:'病人躺在床上等，家属还是得跑一趟窗口——床边结算只是换了个地方排队。',
  prompt:'如果没人被授权，会发生什么？'},

 {n:'自助入住',move:'登记：前台 → 自助机/手机',
  form:'p3',who:'old',
  formWhy:'顺的时候 90 秒办完；证件读不出、房态冲突、要升级房型，这些岔路原来由前台当面接，机器不会接。',
  whoWhy:'前台留一个异常柜台，专收自助机办不下去的单：证件读不出、房态冲突、要升级房型。',
  conseq:'客人卡在机器前，房卡发不出来，后面排起队，前台正在别处处理另一单。',
  prompt:'如果机器办不下去，会发生什么？'},

 {n:'远程面试',move:'面试：会议室 → 线上',
  form:'p1',who:'sys',
  formWhy:'原来候选人到前台，身份证和学历原件有人当面核；线上之后，没有人再经过"核验"这一步。',
  whoWhy:'把证件上传、学信网核验、背调授权放进预约流程，面试官只看结果。',
  conseq:'offer 发出去才发现简历和本人对不上，撤回的成本比核验高得多。',
  prompt:'如果没人核验，会发生什么？'},

 {n:'异步评审',move:'评审：开会 → 文档留言',
  form:'p2',who:'new',
  formWhy:'会上有人收口、有人拍板；文档里每个人都有评论权，没有人有决定权。',
  whoWhy:'每份评审文档指定一个收口人，写明截止时间和"不回复视为同意"，到点由他拍板。',
  conseq:'评论滚了 60 条，没人说"就这么定"，项目在原地等了两周。',
  prompt:'如果没人拍板，会发生什么？'}
];

const riskLabel={fatal:'会，而且不可逆',fix:'会，但当场能补救',slow:'不会，只是慢一点'};
const costLabel={old:'原岗位：多干一件事',new:'新岗位：新增编制',sys:'系统：一次开发，长期维护',user:'用户：多一步操作'};

function ns(S){S.answers.a20=S.answers.a20||{};return S.answers.a20;}

const L={
id:'A20',week:5,seq:20,title:'除法：重排后的责任真空',
kicker:'WEEK 5 · 除法',tool:'div',toolName:'除法边界',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>付款挪进试衣间，<em>留下一件没人管的事</em></h1>
<p>H&amp;M 让顾客在试衣间里结账，衣服不用再拿到收银台排队。但店里多出来一件事——它原来是由收银台的人顺手做的。</p></div>
<div class="grid2" style="align-items:center;margin-bottom:14px">
  <figure class="a20-fig">
    <img src="assets-cases-a20-fitting.jpg" alt="H&amp;M 试衣间付款" loading="lazy">
    <figcaption><b>H&amp;M 试衣间付款</b>　付款从收银台挪到试衣间，衣服不再经过收银员的手。图：SIT 官方课程材料（已授权）</figcaption>
  </figure>
  <div class="panel"><div class="panel-h"><h4>结账之后，多出来的是哪件事</h4><span>单选</span></div>
    <div class="opts">
      <button class="opt" data-h="a"><span class="k">A</span><span><b>防盗扣谁拆</b><span>原来收银台顺手拆掉</span></span></button>
      <button class="opt" data-h="b"><span class="k">B</span><span><b>排队谁维持</b><span>试衣间门口也会排</span></span></button>
      <button class="opt" data-h="c"><span class="k">C</span><span><b>衣服谁归位</b><span>试完的衣架谁挂回去</span></span></button>
      <button class="opt" data-h="d"><span class="k">D</span><span><b>发票谁开</b><span>付了钱总要开票</span></span></button>
    </div>
    <div id="a20HookOut" style="margin-top:12px"></div></div>
</div>`,
init(sec,api){
  const S=api.S,a=ns(S),out=sec.querySelector('#a20HookOut');
  const WHY={
    a:'对。<b>防盗扣原来在收银台拆</b>——收银员经手每件衣服，顺手就拆了。付款挪进试衣间之后，收银员不再经手，试衣间店员手上没有拆扣器、也没被授权。扣子跟着衣服出门，门禁响。这不是谁偷懒，是重排留下的一个真空：<b>原来做这件事的人，不再经过这一步。</b>',
    b:'排队没有消失，只是从收银台挪到了试衣间门口。它是位置变了，不是没人管。',
    c:'衣服归位在重排之前就没人管，它是老问题。这次重排新留下的，不是它。',
    d:'发票跟着付款走，付款在哪开、票在哪开。它没被落下。'
  };
  function paint(){
    const v=a.hook;
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',v===b.dataset.h));
    if(!v){out.innerHTML='';return;}
    const ok=v==='a';
    out.innerHTML='<div class="panel" style="border-color:'+(ok?'rgba(78,159,110,.4)':'rgba(216,154,60,.4)')+';background:'+(ok?'rgba(78,159,110,.07)':'rgba(216,154,60,.06)')+'">'+
      '<p class="small" style="font-size:12px">'+WHY[v]+'</p>'+
      '<p class="small" style="font-size:11.5px;margin-top:8px;color:var(--dim)">除法把步骤挪走，<b>但不会把责任一起挪过去</b>。每挪一步，先找那个真空。</p></div>';
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{a.hook=b.dataset.h;api.save();paint();api.refresh();});
  paint();
},
hint(S){return ns(S).hook?'':'先选一个';},
gate(S){return !!ns(S).hook;}},

/* ---------- 2 概念 ---------- */
{id:'concept',name:'概念',short:'概念',kicker:'STEP 2 · 概念',
html:`
<div class="step-h"><h1>责任真空：<em>四张面孔，三个问题</em></h1>
<p>重排之后，这一步还在，但没有任何一个位置的人被明确要求做它。这就是责任真空。它通常长成下面四种样子。</p></div>
<div class="grid2" style="margin-bottom:12px;align-items:start">
  <div class="panel"><div class="panel-h"><h4>四种形态</h4><span>先认脸</span></div>
    <div class="a20-forms">
      <div class="a20-form"><em>01</em><b>原来的人不再经过</b><span>这一步原来由 A 岗位顺手做；重排后 A 不再经过这里。<br>例：收银员不再经手衣服，防盗扣没人拆。</span></div>
      <div class="a20-form"><em>02</em><b>新位置的人没被授权</b><span>人在那儿，但没有权限、工具或额度。<br>例：护士在床边，不能收钱、不能退费。</span></div>
      <div class="a20-form"><em>03</em><b>异常路径没人设计</b><span>顺利时看不出，出岔子时没人接。<br>例：自助机读不出证件，前台已经没人。</span></div>
      <div class="a20-form"><em>04</em><b>数据/记录断点</b><span>事做完了，记录没跟上，对账与追溯断在半路。<br>例：自助入住后房态和押金对不上。</span></div>
    </div>
  </div>
  <div class="panel"><div class="panel-h"><h4>真空三问</h4><span>按顺序问</span></div>
    <div class="a20-q3">
      <div><i>1</i><b>谁做</b><span>具体到岗位，不写"相关人员"。</span></div>
      <div><i>2</i><b>凭什么</b><span>权限、工具、额度、工时，缺一样都做不成。</span></div>
      <div><i>3</i><b>做不到时找谁</b><span>升级路径：几分钟内、打给谁、谁能叫停。</span></div>
    </div>
    <div class="tag acc" style="margin-top:10px">三问有一问答不上，这个重排就还没设计完</div>
    <p class="small" style="margin-top:9px"><b style="color:var(--warn)">什么时候先别重排：</b>这一步踩到钱、安全或合规，而且出错不可逆。先有岗位职责和系统规则，再谈挪位置。</p>
  </div>
</div>
<div class="grid2" style="margin-bottom:12px;align-items:start">
  <figure class="a20-fig sm">
    <img src="assets-cases-a20-checkin.jpg" alt="在家办理登机手续" loading="lazy">
    <figcaption><b>登机手续挪到家里</b>　柜台不再经手证件：谁核验身份，谁处理行李异常？图：SIT 官方课程材料（已授权）</figcaption>
  </figure>
  <div class="panel"><div class="panel-h"><h4>检查</h4><span>单选</span></div>
    <div class="opts">
      <button class="opt" data-c="a"><span class="k">A</span><span><b>真空是执行问题，培训和提醒能解决</b><span>人没做好，不是流程没设计</span></span></button>
      <button class="opt" data-c="b"><span class="k">B</span><span><b>真空是设计问题，要提前写清人、权限和升级路径</b><span>跟重排一起交付</span></span></button>
    </div>
    <div id="a20C2Out" style="margin-top:10px"></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=ns(S),out=sec.querySelector('#a20C2Out');
  function paint(){
    sec.querySelectorAll('[data-c]').forEach(b=>b.classList.toggle('on',a.check===b.dataset.c));
    if(!a.check){out.innerHTML='';return;}
    const ok=a.check==='b';
    out.innerHTML='<div class="panel" style="border-color:'+(ok?'rgba(78,159,110,.4)':'rgba(216,154,60,.4)')+';background:'+(ok?'rgba(78,159,110,.07)':'rgba(216,154,60,.06)')+'">'+
      '<p class="small" style="font-size:12px">'+(ok
        ?'对。真空不是谁不负责，是流程没把责任放到任何位置上。培训和提醒只在有人经过时有用——真空恰恰是没人经过。'
        :'培训和提醒只在有人经过时有用。真空恰恰是没人经过：要么把责任写进一个新岗位，要么写进系统规则，要么指定升级路径。')+'</p></div>';
  }
  sec.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{a.check=b.dataset.c;api.save();paint();api.refresh();});
  paint();
},
hint(S){return ns(S).check?'':'选一个你的判断';},
gate(S){return !!ns(S).check;}},

/* ---------- 3 真空雷达 ---------- */
{id:'radar',name:'真空雷达',short:'雷达',kicker:'STEP 3 · 真空雷达',
html:`
<div class="step-h"><h1>八个重排，<em>八个真空</em></h1>
<p>每个案例都挪了一步。先判真空属于哪一种，再说谁该补位，最后写一句"如果没人补会发生什么"。8 个都处理完，才能进下一步。</p></div>
<div class="bench">
  <div class="bench-h"><b>VACUUM RADAR · 责任真空雷达</b><span class="st" id="a20Count">已处理 0 / 8</span></div>
  <div class="a20-radar">
    <div class="a20-blips" id="a20Blips">${CASES.map((c,i)=>`<i class="a20-blip" data-b="${i}">${i+1}</i>`).join('')}</div>
    <div class="a20-bar"><i id="a20Bar"></i></div>
  </div>
  <div class="bench-b" style="overflow:auto">
    <div id="a20Cases">${CASES.map((c,i)=>`
      <div class="a20-case" data-case="${i}">
        <div class="a20-c-head">
          <span class="a20-c-idx">${String(i+1).padStart(2,'0')}</span>
          <span class="a20-c-t"><b>${c.n}</b><span>${c.move}</span></span>
          <span class="a20-c-done" data-done="${i}">未处理</span>
        </div>
        <div class="a20-c-row">
          <span class="a20-c-lab">真空形态</span>
          <span class="a20-fbs">${FORMS.map(f=>`<button class="a20-fb" data-f="${f.k}" data-i="${i}">${f.n}</button>`).join('')}</span>
        </div>
        <div class="a20-c-row">
          <span class="a20-c-lab">谁该补位</span>
          <span class="a20-wbs">${WHOS.map(w=>`<button class="a20-wb" data-w="${w.k}" data-i="${i}">${w.n}</button>`).join('')}</span>
        </div>
        <div class="a20-c-row">
          <span class="a20-c-lab">没人补</span>
          <input class="a20-sent" data-t="${i}" maxlength="60" placeholder="${c.prompt}">
          <span class="a20-len" data-len="${i}">0/8</span>
        </div>
        <div class="a20-fbk" data-fbk="${i}"></div>
      </div>`).join('')}</div>
  </div>
  <div class="bench-f"><span class="small">选完立刻给参考判断；说法不同没关系，后果写清就行。</span><div style="flex:1"></div><button class="btn sm ghost" id="a20Reset">清空重来</button></div>
</div>`,
init(sec,api){
  const S=api.S,a=ns(S);a.radar=a.radar||{};
  const cnt=sec.querySelector('#a20Count'),bar=sec.querySelector('#a20Bar'),blips=sec.querySelector('#a20Blips');
  const done=v=>!!(v&&v.f&&v.w&&(v.t||'').trim().length>=8);
  const count=()=>CASES.filter((c,i)=>done(a.radar[i])).length;
  function fbk(i){
    const c=CASES[i],v=a.radar[i]||{};let h='';
    if(v.f){
      const ok=v.f===c.form;
      h+='<div class="a20-fl '+(ok?'good':'diff')+'"><b>'+(ok?'✓ 和参考一致':'△ 参考是 '+fname(c.form))+'</b><span>'+c.formWhy+'</span></div>';
    }
    if(v.w){
      const ok=v.w===c.who;
      h+='<div class="a20-fl '+(ok?'good':'note')+'"><b>补位参考：'+wname(c.who)+'</b><span>'+c.whoWhy+'</span></div>';
    }
    if(done(v)) h+='<div class="a20-fl note"><b>常见后果</b><span>'+c.conseq+'</span></div>';
    return h;
  }
  function paint(){
    CASES.forEach((c,i)=>{
      const card=sec.querySelector('[data-case="'+i+'"]');if(!card)return;
      const v=a.radar[i]||{};
      card.querySelectorAll('[data-f]').forEach(b=>b.classList.toggle('on',v.f===b.dataset.f));
      card.querySelectorAll('[data-w]').forEach(b=>b.classList.toggle('on',v.w===b.dataset.w));
      const len=card.querySelector('[data-len]'),n=(v.t||'').trim().length;
      len.textContent=n>=8?n+' 字':n+'/8';len.classList.toggle('ok',n>=8);
      card.classList.toggle('done',done(v));
      card.querySelector('[data-done]').textContent=done(v)?'✓ 已处理':'未处理';
      card.querySelector('[data-fbk]').innerHTML=fbk(i);
    });
    const k=count();
    cnt.textContent='已处理 '+k+' / 8';
    bar.style.width=(k/8*100)+'%';
    blips.querySelectorAll('[data-b]').forEach((el,i)=>el.classList.toggle('done',done(a.radar[i])));
  }
  sec.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{
    const i=+b.dataset.i;a.radar[i]=a.radar[i]||{};a.radar[i].f=b.dataset.f;api.save();paint();api.refresh();
  });
  sec.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{
    const i=+b.dataset.i;a.radar[i]=a.radar[i]||{};a.radar[i].w=b.dataset.w;api.save();paint();api.refresh();
  });
  sec.querySelectorAll('[data-t]').forEach(inp=>{
    const i=+inp.dataset.t;inp.value=(a.radar[i]||{}).t||'';
    inp.addEventListener('input',()=>{a.radar[i]=a.radar[i]||{};a.radar[i].t=inp.value;api.save();paint();api.refresh();});
  });
  sec.querySelector('#a20Reset').onclick=()=>{
    a.radar={};sec.querySelectorAll('[data-t]').forEach(inp=>{inp.value='';});
    api.save();paint();api.refresh();
  };
  paint();
},
hint(S){
  const a=ns(S),r=a.radar||{};
  const n=CASES.filter((c,i)=>{const v=r[i];return !!(v&&v.f&&v.w&&(v.t||'').trim().length>=8);}).length;
  return n>=8?'':'还差 '+(8-n)+' 个案例没处理完';
},
gate(S){
  const a=ns(S),r=a.radar||{};
  return CASES.filter((c,i)=>{const v=r[i];return !!(v&&v.f&&v.w&&(v.t||'').trim().length>=8);}).length>=8;
}},

/* ---------- 4 在你的事上 ---------- */
{id:'mine',name:'在你的事上',short:'在你的事',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>你手上的那次重排，<em>真空在哪</em></h1>
<p>用 A19 写过的那次重排，或者换一个你现在就压在手上的。写清五件事：挪了什么、真空是哪种、具体卡在哪、谁补位、补不上怎么办。</p></div>
<div class="grid2" style="align-items:start">
  <div class="panel">
    <div class="panel-h"><h4>① 哪一步挪到了哪</h4><span>≥8 字</span></div>
    <div class="field"><textarea id="a20move" maxlength="60" placeholder="例如：把月度对账从财务月末挪到业务每周自查"></textarea></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4>② 真空属于哪一种</h4><span>四选一</span></div>
    <div class="chips" id="a20FormChips">
      ${FORMS.map(f=>`<button class="chip" data-mf="${f.k}">${f.n}</button>`).join('')}
    </div>
    <p class="small" id="a20FormHint" style="margin-top:8px">选一种最要命的。真空常常不止一种，先把会出事的那一种补掉。</p>
    <div class="panel-h" style="margin:12px 0 6px"><h4>③ 真空具体是什么</h4><span>≥10 字</span></div>
    <div class="field"><textarea id="a20void" maxlength="70" placeholder="例如：收银员不再经手衣服，拆防盗扣这一步没人做"></textarea></div>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>④ 补位方案</h4><span>≥15 字</span></div>
    <div class="field"><textarea id="a20fill" maxlength="90" placeholder="谁做、凭什么（权限/工具/工时）、做不到时找谁"></textarea></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4>⑤ 兜底</h4><span>≥10 字</span></div>
    <div class="field"><textarea id="a20backup" maxlength="70" placeholder="补位的人不在、不会、不愿时，退回到哪一步"></textarea></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=ns(S);
  const f={move:sec.querySelector('#a20move'),fill:sec.querySelector('#a20fill'),backup:sec.querySelector('#a20backup'),voidText:sec.querySelector('#a20void')};
  const hint=sec.querySelector('#a20FormHint');
  Object.keys(f).forEach(k=>{
    f[k].value=a[k]||'';
    f[k].addEventListener('input',()=>{a[k]=f[k].value;api.save();paint();api.refresh();});
  });
  function paint(){
    sec.querySelectorAll('[data-mf]').forEach(b=>b.classList.toggle('on',a.form===b.dataset.mf));
    hint.innerHTML=a.form?'已选：<b style="color:var(--acc2)">'+fshort(a.form)+'</b>　补位方案里要把"谁做、凭什么、做不到找谁"三句写全。':'选一种最要命的。真空常常不止一种，先把会出事的那一种补掉。';
  }
  sec.querySelectorAll('[data-mf]').forEach(b=>b.onclick=()=>{a.form=b.dataset.mf;api.save();paint();api.refresh();});
  paint();
},
hint(S){
  const a=ns(S);
  if((a.move||'').trim().length<8)return '先写清哪一步挪到了哪';
  if(!a.form)return '选一种真空形态';
  if((a.voidText||'').trim().length<10)return '真空具体是什么，还差 '+(10-(a.voidText||'').trim().length)+' 字';
  if((a.fill||'').trim().length<15)return '补位方案还差 '+(15-(a.fill||'').trim().length)+' 字';
  if((a.backup||'').trim().length<10)return '兜底还差 '+(10-(a.backup||'').trim().length)+' 字';
  return '';
},
gate(S){
  const a=ns(S);
  return !!((a.move||'').trim().length>=8&&a.form&&(a.voidText||'').trim().length>=10&&(a.fill||'').trim().length>=15&&(a.backup||'').trim().length>=10);
}},

/* ---------- 5 过滤与提交 ---------- */
{id:'submit',name:'过滤与提交',short:'提交',kicker:'STEP 5 · 过滤与提交',
html:`
<div class="step-h"><h1>交卡之前，<em>过两道闸</em></h1>
<p>这两个问题答不上来，说明真空还没设计完。答完再看一眼结论。</p></div>
<div class="grid2" style="margin-bottom:12px;align-items:start">
  <div class="panel"><div class="panel-h"><h4>① 这个真空会不会变成事故</h4><span>单选</span></div>
    <div class="a20-qopts">
      <button class="a20-qo" data-r="fatal"><i>01</i><span>会，而且不可逆：钱、安全、合规</span></button>
      <button class="a20-qo" data-r="fix"><i>02</i><span>会，但当场能补救</span></button>
      <button class="a20-qo" data-r="slow"><i>03</i><span>不会，只是慢一点</span></button>
    </div>
  </div>
  <div class="panel"><div class="panel-h"><h4>② 补位的成本谁付</h4><span>单选</span></div>
    <div class="a20-qopts">
      ${WHOS.map((w,i)=>`<button class="a20-qo" data-cx="${w.k}"><i>0${i+1}</i><span>${costLabel[w.k]}</span></button>`).join('')}
    </div>
  </div>
</div>
<div class="grid2" style="align-items:start">
  <div><div class="panel-h"><h4>产出预览</h4><span>A20 · 真空卡</span></div><div id="a20CardSlot"></div></div>
  <div class="panel"><div class="panel-h"><h4>过滤结论</h4><span>提交前看一眼</span></div>
    <div class="a20-verdict" id="a20Verdict">先回答上面两问。</div>
    <div class="row" style="margin-top:10px"><button class="btn primary" id="a20Sub">提交</button><button class="btn" id="a20Exp">导出 PNG</button></div>
    <div class="hint" id="a20SubSt" style="margin-top:8px">未提交</div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=ns(S);
  const slot=sec.querySelector('#a20CardSlot'),vd=sec.querySelector('#a20Verdict'),
        btn=sec.querySelector('#a20Sub'),st=sec.querySelector('#a20SubSt');
  function cardHTML(){
    const c=api.card()||{title:'A20 · 真空卡',rows:[]};
    return '<div class="outcard"><div class="oh"><span>DELIVERABLE · A20</span><span>真空卡</span></div>'+
      '<h5>'+api.esc(c.title)+'</h5><div class="kv">'+
      (c.rows||[]).map(r=>'<div><b>'+api.esc(r[0])+'</b><span class="'+(r[1]&&r[1]!=='—'?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+
      '</div></div>';
  }
  function paint(){
    sec.querySelectorAll('[data-r]').forEach(b=>b.classList.toggle('on',a.risk===b.dataset.r));
    sec.querySelectorAll('[data-cx]').forEach(b=>b.classList.toggle('on',a.cost===b.dataset.cx));
    let h='';
    if(!a.risk)h='先回答第一问：这个真空最坏会走到哪一步。';
    else if(a.risk==='fatal')h='<b>先补兜底，再提交。</b>不可逆的真空不能靠提醒：写清谁能叫停、几分钟内响应、找谁升级。';
    else if(a.risk==='fix')h='<b>可以接受。</b>把"谁在几分钟内接住"写进流程，别只写进培训。';
    else h='<b>不是事故。</b>但要确认没有人在暗处替它买单——慢的代价通常落在最忙的那个人身上。';
    if(a.cost)h+='<br><br>成本不会消失，只会转移。你选了<b>「'+costLabel[a.cost]+'」</b>：试点时把它算成每周分钟数和谁的工时。';
    vd.innerHTML=h;
    slot.innerHTML=cardHTML();
    st.textContent=S.submitted?'已提交':'未提交';
    btn.disabled=!!S.submitted;btn.textContent=S.submitted?'已提交':'提交';
  }
  sec.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{a.risk=b.dataset.r;api.save();paint();api.refresh();});
  sec.querySelectorAll('[data-cx]').forEach(b=>b.onclick=()=>{a.cost=b.dataset.cx;api.save();paint();api.refresh();});
  btn.onclick=async()=>{if(!L.steps[4].gate(S))return;await api.submit();paint();};
  sec.querySelector('#a20Exp').onclick=()=>api.exportCard();
  paint();
},
hint(S){
  const a=ns(S);
  if(!L.steps[3].gate(S))return '先回第 4 步，把真空和补位写完';
  if(!a.risk)return '回答第一问：会不会变成事故';
  if(!a.cost)return '回答第二问：补位成本谁付';
  return '';
},
gate(S){
  const a=ns(S);
  return !!(L.steps[3].gate(S)&&a.risk&&a.cost);
}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>重排的成败，<em>在挪完之后</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">01 每挪一步，留一个真空</div><p class="small" style="margin-top:5px">步骤被挪走，责任不会自动跟着走。重排和补位要一起交付。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">02 四种形态</div><p class="small" style="margin-top:5px">原来的人不再经过 / 新位置没被授权 / 异常没人设计 / 记录断点。先认脸，再补。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">03 三问定责</div><p class="small" style="margin-top:5px">谁做、凭什么、做不到时找谁。三问答不上，就先别上线。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A21</span></div>
<p class="small">A21 · 一专多能：给现有组件一个新任务。Play Pump 里孩子玩的转盘，同时是抽水泵——<b>没有新增任何零件，只给已有零件派了新活。</b></p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="a20Again">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#a20Again').onclick=()=>api.go(0);},
hint(S){return '';},gate(S){return true;}}
],

side:{asks:[
 '这一步原来是谁顺手做的？他现在还经过吗？',
 '新位置上的人，有权限做这件事吗？',
 '出岔子的时候，第一个电话打给谁？',
 '记录断在哪一环：系统、纸面，还是人的记忆？',
 '补位的成本，最后落在谁的工时上？'
]},

card(S){
  const a=ns(S);
  return {title:'A20 · 真空卡',rows:[
    ['重排',a.move||'—'],
    ['真空',(a.form?fshort(a.form)+'：':'')+(a.voidText||'—')],
    ['补位',a.fill||'—'],
    ['兜底',a.backup||'—'],
    ['会成事故',a.risk?riskLabel[a.risk]:'—'],
    ['成本谁付',a.cost?costLabel[a.cost]:'—']
  ]};
},
notes:[
 {t:'本节目标',h:'让学员在重排之后主动找责任真空，并能用四种形态、三个问题把补位写清楚。'},
 {t:'时间分配',h:'先猜 5′ · 概念 8′ · 真空雷达 18′ · 在你的事 10′ · 提交 4′。'},
 {t:'常见卡点',h:'学员把四种形态当标签贴，不解释为什么。追问一句："原来做这件事的人，现在还经过这里吗？"'},
 {t:'直播怎么接',h:'看雷达里哪一格错得最多（通常是②授权），把班级选的"谁该补位"投出来，问：这个人现在有没有这个权限、有没有这段时间？'},
 {t:'和 A17–A19 的关系',h:'前三节教怎么挪，这一节教挪完怎么不塌。边界不在"敢不敢挪"，在"补不补得上"。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A20']=L;
})();
