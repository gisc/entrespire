/* A11 · 减法：在我的对象上跑一遍 · 实战工作台 */
(function(){
'use strict';

/* ---------- 预设：三个对象各带 8 个参考组件 ---------- */
const PRESETS={
 '保温杯':['杯盖','杯身','内胆','密封圈','保温层','提手','杯底防滑垫','容量刻度'],
 '客户 onboarding':['欢迎邮件','开户表单','产品培训','客户经理见面','首个工单','权限开通','回访电话','成功指标确认'],
 '月度经营会':['汇报 PPT','数据底稿','会议室','参会名单','议程','决议记录','行动项跟踪','主持人']
};
const P_ORDER=['保温杯','客户 onboarding','月度经营会'];
const MIN_COMP=8, MIN_TXT=12, MIN_TWEAK=8;

/* ---------- 状态 ---------- */
function view(S){
  const x=(S&&S.answers&&S.answers.a11)||{};
  const str=v=>typeof v==='string'?v:'';
  const comps=Array.isArray(x.comps)?x.comps
    .filter(c=>c&&typeof c.n==='string'&&c.n)
    .map(c=>({n:c.n,star:!!c.star})):[];
  const forms=Array.isArray(x.forms)?x.forms
    .filter(f=>f&&f.n)
    .map(f=>({n:String(f.n),k:String(f.k||''),w:String(f.w||'')})):[];
  return {
    hook:str(x.hook),
    obj:str(x.obj), comps:comps, pick:str(x.pick),
    forms:forms, form:str(x.form),
    who:str(x.who), whyUse:str(x.whyUse), block:str(x.block),
    mkt:+x.mkt||0, feas:+x.feas||0, tweak:str(x.tweak), jury:!!x.jury
  };
}
function ensure(S){
  const ans=S.answers;
  if(!ans.a11||typeof ans.a11!=='object')ans.a11={};
  const x=ans.a11;
  if(!Array.isArray(x.comps))x.comps=[];
  if(!Array.isArray(x.forms))x.forms=[];
  ['hook','obj','pick','form','who','whyUse','block','tweak'].forEach(k=>{if(typeof x[k]!=='string')x[k]='';});
  x.mkt=+x.mkt||0;x.feas=+x.feas||0;
  return x;
}
function resetDown(x){
  x.pick='';x.forms=[];x.form='';
  x.who='';x.whyUse='';x.block='';
  x.mkt=0;x.feas=0;x.tweak='';
}
function stars(x){return x.comps.filter(c=>c.star).length;}
function localForms(o,c){
  return [
    {n:o+' · 无'+c+'版',k:'AS IS',w:'不补任何东西：先看谁不在乎'+c+'。'},
    {n:o+' · '+c+'外置版',k:'外置',w:'把'+c+'的活挪到现场：用户自己带，或现场借。'},
    {n:o+' · '+c+'共享版',k:'共享',w:'一个'+c+'服务多个'+o+'：从部件变成设施。'}
  ];
}
function judgeOf(m,f){
  if(!m||!f)return {t:'两个分数都打上，才有判断。',k:''};
  if(f<=2)return {t:'可行 ≤ 2：先做一个纸质原型，不要开模。',k:'warn'};
  if(m<=2)return {t:'市场 ≤ 2：先找 5 个愿意付钱的人，再谈产品。',k:'warn'};
  if(m>=4&&f>=4)return {t:'两边都 ≥ 4：做最小版本，两周内给同一批人看。',k:'ok'};
  if(m>=4)return {t:'市场像真的，路径太重：先砍一半功能，再试。',k:'warn'};
  if(f>=4)return {t:'做得出来，但没人非用不可：先换一类人，再试。',k:'warn'};
  return {t:'两边都中等：先人工代跑一次，看有没有人回头。',k:''};
}
function fullGate(x){
  const n=x.comps.length,s=stars(x);
  return !!(x.obj&&n>=MIN_COMP&&s>=1&&x.pick&&x.form.trim().length>=2&&
    x.who.trim().length>=MIN_TXT&&x.whyUse.trim().length>=MIN_TXT&&x.block.trim().length>=MIN_TXT&&
    x.mkt>=1&&x.feas>=1&&x.tweak.trim().length>=MIN_TWEAK);
}
function needRows(x){
  const n=x.comps.length,s=stars(x);
  return [
    {k:'对象',ok:!!x.obj,tip:x.obj||'选一个或自己写'},
    {k:'组件 ≥ 8，至少 1 个★',ok:n>=MIN_COMP&&s>=1,tip:n?(n+' 个 · ★ '+s):'还没拆'},
    {k:'拿掉的★组件',ok:!!x.pick,tip:x.pick||'还没选'},
    {k:'虚拟产品',ok:x.form.trim().length>=2,tip:x.form||'还没选'},
    {k:'三个解释',ok:x.who.trim().length>=MIN_TXT&&x.whyUse.trim().length>=MIN_TXT&&x.block.trim().length>=MIN_TXT,tip:'各 ≥ 12 字'},
    {k:'双过滤',ok:x.mkt>=1&&x.feas>=1,tip:(x.mkt?'市场 '+x.mkt:'市场 —')+' · '+(x.feas?'可行 '+x.feas:'可行 —')},
    {k:'改一处',ok:x.tweak.trim().length>=MIN_TWEAK,tip:x.tweak.length+' / '+MIN_TWEAK}
  ];
}
function formsURL(){
  const q=new URLSearchParams(location.search).get('api');
  if(q)return q.replace(/\/$/,'')+'/ai/forms';
  if(location.protocol==='file:')return null;
  return location.pathname.replace(/\/adult\/.*$/,'')+'/api/adult/ai/forms';
}

const L={
id:'A11',week:3,seq:11,title:'减法：在我的对象上跑一遍',
kicker:'WEEK 3 · 减法 · 实战',tool:'sub',toolName:'减法',minutes:45,

steps:[
/* ================= 1 先猜 ================= */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>一台没有屏幕的 MP3，<em>为什么能卖</em></h1>
<p>2005 年，苹果把 iPod 上最显眼的东西拿掉了。它不是廉价版，是另一条产品线。先猜：拿掉的是什么？</p></div>
<div class="a11-hero">
  <div class="a11-dev">
    <div class="a11-dev-h">AS IS · iPod Shuffle 2005</div>
    <svg viewBox="0 0 120 176" aria-hidden="true">
      <rect x="18" y="4" width="84" height="168" rx="15" fill="#0E141E" stroke="#33415A"/>
      <rect x="32" y="22" width="56" height="46" rx="3" fill="#17202D" stroke="#3A475E"/>
      <rect x="37" y="29" width="30" height="3" rx="1.5" fill="#8D97AA" opacity=".75"/>
      <rect x="37" y="37" width="41" height="2" rx="1" fill="#3F4A5C"/>
      <rect x="37" y="43" width="22" height="2" rx="1" fill="#3F4A5C"/>
      <rect x="37" y="49" width="34" height="2" rx="1" fill="#3F4A5C"/>
      <circle cx="60" cy="116" r="28" fill="none" stroke="#33415A"/>
      <circle cx="60" cy="116" r="9" fill="#1B2431" stroke="#33415A"/>
    </svg>
    <div class="a11-dev-f">能看歌名，能选歌</div>
  </div>
  <div class="a11-arrow"><span>拿掉</span><i>→</i></div>
  <div class="a11-dev a11-dev-cut">
    <div class="a11-dev-h">TO BE · ？</div>
    <svg viewBox="0 0 120 176" aria-hidden="true">
      <rect x="18" y="4" width="84" height="168" rx="15" fill="#0E141E" stroke="#35B7A8" stroke-opacity=".55"/>
      <rect x="32" y="22" width="56" height="46" rx="3" fill="none" stroke="#35B7A8" stroke-opacity=".35" stroke-dasharray="3 4"/>
      <text x="60" y="49" text-anchor="middle" fill="#35B7A8" font-size="7" font-family="monospace" opacity=".8">NO SCREEN</text>
      <circle cx="60" cy="116" r="28" fill="none" stroke="#35B7A8" stroke-opacity=".5"/>
      <circle cx="60" cy="116" r="9" fill="#1B2431" stroke="#35B7A8" stroke-opacity=".5"/>
    </svg>
    <div class="a11-dev-f">只剩一个圆盘</div>
  </div>
</div>
<div class="grid2" style="align-items:start">
  <div class="panel">
    <div class="panel-h"><h4>你的判断</h4><span>单选</span></div>
    <div class="opts">
      <button class="opt" data-h="a"><span class="k">A</span><span><b>电池</b><span>没有电，它连开机都不成立</span></span></button>
      <button class="opt" data-h="b"><span class="k">B</span><span><b>屏幕</b><span>最显眼、最贵、最像“必需品”</span></span></button>
      <button class="opt" data-h="c"><span class="k">C</span><span><b>耳机口</b><span>没有口，声音出不来</span></span></button>
    </div>
  </div>
  <div id="hookOut"></div>
</div>`,
init(sec,api){
  const S=api.S,x=ensure(S),out=sec.querySelector('#hookOut');
  const NAME={a:'电池',b:'屏幕',c:'耳机口'};
  function paint(){
    sec.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',x.hook===b.dataset.h));
    if(!x.hook){
      out.innerHTML='<div class="panel a11-wait"><div class="a11-wait-k">先选一个</div>'+
        '<p>答案不在常识里。你觉得哪一个最不可能被拿掉？</p></div>';
      return;
    }
    const ok=x.hook==='b';
    out.innerHTML='<div class="panel a11-reveal"><div class="panel-h"><h4>揭晓</h4><span>iPod Shuffle</span></div>'+
      '<div class="a11-ans">屏幕</div>'+
      '<p class="small">'+(ok
        ?'对。屏幕看起来最不能少：它承载选歌、歌名、进度。拿掉它，产品居然还活着。'
        :'你选的是“'+NAME[x.hook]+'”。它一拿掉，产品就死了。屏幕不一样：看起来最不能少，拿掉之后产品还活着。')+
      '</p>'+
      '<div class="a11-q">拿掉最重要的东西，为什么反而成功？</div>'+
      '<div class="a11-why">'+
        '<div><b>选择交给随机</b><span>不让你选，随机播。选择成本从用户身上挪走。</span></div>'+
        '<div><b>注意力还给场景</b><span>跑步、健身房。看不见，也不需要看。</span></div>'+
      '</div>'+
      '<div class="a11-note">它卖的不是“更便宜的 MP3”，是“不用选的听歌”。</div></div>';
  }
  sec.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{
    x.hook=b.dataset.h;api.save();paint();api.refresh();
  });
  paint();
},
gate(S){return !!view(S).hook;}},

/* ================= 2 概念 ================= */
{id:'concept',name:'减法七步',short:'七步',kicker:'STEP 2 · 概念',
html:`
<div class="step-h"><h1>减法不是删，<em>是拿掉之后重建</em></h1>
<p>A09 的 iPod Shuffle 是 As Is：不补任何东西。今天的主角 Sedasys 相反：拿掉之后被追问，再用现场已有的资源补位。<b>两条路都算减法，区别在后半段。</b></p></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel a11-crit"><div class="a11-cn">判据 01</div><h4>什么是“重要组件”</h4>
    <p class="a11-cq">拿掉之后，用户会问：“这还能用吗？”</p>
    <p class="small">没人问，你只是清理了一个零件。</p></div>
  <div class="panel a11-crit"><div class="a11-cn">判据 02</div><h4>功能必须还在</h4>
    <p class="a11-cq">屏幕没了，“听歌”要靠别的方式兑现。</p>
    <p class="small">功能跟着消失，那是毁坏。</p></div>
  <div class="panel a11-crit"><div class="a11-cn">判据 03</div><h4>最大阻力路径</h4>
    <p class="a11-cq">拿掉后最难的那一环，通常就是价值所在。</p>
    <p class="small">绕过它，点子就空了。</p></div>
</div>
<div class="grid2" style="align-items:start">
  <div class="panel">
    <div class="panel-h"><h4>七步 · 官方顺序</h4><span>不要跳步</span></div>
    <div class="flow a11-flow">
      <div class="flow-i"><div class="flow-n">1</div><div class="flow-b"><b>列组件</b><span>零件、步骤、角色、信息。先求全，不求准。</span></div></div>
      <div class="flow-i"><div class="flow-n">2</div><div class="flow-b"><b>去除一个重要部分</b><span>选那个“看起来不能没有”的，不是最容易拿的。</span></div></div>
      <div class="flow-i"><div class="flow-n">3</div><div class="flow-b"><b>想象虚拟产品</b><span>先描述这个残缺形态，不补任何东西。</span></div></div>
      <div class="flow-i"><div class="flow-n">4</div><div class="flow-b"><b>找好处 / 市场 / 顾客</b><span>谁因为少了它反而受益？具体到一个人。</span></div></div>
      <div class="flow-i"><div class="flow-n">5</div><div class="flow-b"><b>找挑战与克服</b><span>最难的一环是什么？用现有资源怎么补？</span></div></div>
      <div class="flow-i"><div class="flow-n">6</div><div class="flow-b"><b>调整</b><span>把补位做成设计，不把原来的零件装回去。</span></div></div>
      <div class="flow-i"><div class="flow-n">7</div><div class="flow-b"><b>描述</b><span>一句话：拿掉什么，谁因此受益。</span></div></div>
    </div>
  </div>
  <div class="stack">
    <div class="panel">
      <div class="panel-h"><h4>官方演示 · Sedasys</h4><span>强生爱惜康</span></div>
      <p class="small">一台“不用麻醉师”的镇静设备。它被拿掉了两次，也被挑战了两次。</p>
      <div class="a11-tl">
        <div class="a11-tl-i"><i></i><div><b>拿掉备用电池</b><span>省成本，也省手术室宝贵的占地。</span></div></div>
        <div class="a11-tl-i"><i></i><div><b>医院反问：断电怎么办</b><span>这是最大阻力路径，不是反对意见。</span></div></div>
        <div class="a11-tl-i"><i></i><div><b>不装回去，改借现场</b><span>把“补给”任务交给手术室现有资源——减法接一专多能。</span></div></div>
        <div class="a11-tl-i"><i></i><div><b>再拿掉屏幕和键盘</b><span>借用现有监护仪屏幕。第二次减法，同样不新增零件。</span></div></div>
      </div>
      <div class="a11-note">减法的后半段是找补，不是放弃。</div>
    </div>
    <div class="panel">
      <div class="panel-h"><h4>什么时候别用</h4><span>边界</span></div>
      <ul class="a11-no">
        <li><b>只有供应商省钱，用户毫无感觉。</b>那是降本，不是减法。</li>
        <li><b>功能靠别处勉强兜住，体验更差。</b>那是在为难用户。</li>
      </ul>
    </div>
  </div>
</div>`,
init(){}},

/* ================= 3 拆解台 ================= */
{id:'decompose',name:'拆解台',short:'拆解',kicker:'STEP 3 · 工作台',
html:`
<div class="step-h"><h1>把你的对象，<em>拆到能拿掉</em></h1>
<p>先列组件，再挑一个“拿掉后用户会问还能用吗”的。不用挑最好的，挑最疼的。</p></div>
<div class="grid2" style="margin-bottom:12px">
  <div class="panel">
    <div class="panel-h"><h4>1 · 对象</h4><span>选一个或自己写</span></div>
    <div class="chips" id="objs">${P_ORDER.map(o=>`<button class="chip" data-o="${o}">${o}</button>`).join('')}</div>
    <div class="a11-add" style="margin-top:10px">
      <input id="objIn" placeholder="例如：售后工单流程" maxlength="24" autocomplete="off">
      <button class="btn sm" id="objUse">用这个</button>
    </div>
    <div class="hint" id="objHint" style="margin-top:7px">三个预设自带 8 个参考组件，也可以直接写你自己的。</div>
  </div>
  <div class="panel">
    <div class="panel-h"><h4>2 · 拆解方向</h4><span>按这四类扫一遍</span></div>
    <div class="a11-tips">
      <div><i>物</i><span>看得见的零件、材料、界面</span></div>
      <div><i>步</i><span>用户从进入到离开的每一步</span></div>
      <div><i>人</i><span>每一步是谁在做、谁在等</span></div>
      <div><i>规</i><span>默认规则、审批、时间限制</span></div>
    </div>
    <div class="hint" style="margin-top:8px">拆到 8 个以上，才有得选。</div>
  </div>
</div>
<div class="bench a11-bench">
  <div class="bench-h"><b>DECOMPOSE · 组件清单</b><span class="st" id="compSt">0 / 8</span></div>
  <div class="bench-b">
    <div class="a11-meter"><div class="meter"><i id="compBar" style="width:0%"></i></div></div>
    <div class="a11-comps" id="compList"></div>
    <div class="a11-add">
      <input id="compIn" placeholder="加一个组件，例如：杯盖" maxlength="12" autocomplete="off">
      <button class="btn sm" id="compAdd">添加</button>
    </div>
  </div>
  <div class="bench-f">
    <span class="small" id="compHint">先选对象。</span>
    <div style="flex:1"></div>
    <button class="btn sm ghost" id="compClear">清空</button>
    <button class="btn sm" id="aiDecomp">AI 帮我拆</button>
  </div>
</div>`,
init(sec,api){
  const S=api.S,x=ensure(S);
  const objs=sec.querySelector('#objs'),objIn=sec.querySelector('#objIn'),objUse=sec.querySelector('#objUse'),objHint=sec.querySelector('#objHint');
  const list=sec.querySelector('#compList'),bar=sec.querySelector('#compBar'),st=sec.querySelector('#compSt'),hint=sec.querySelector('#compHint');
  const compIn=sec.querySelector('#compIn');

  function hasDownstream(){
    return !!(x.comps.length||x.form||x.who||x.whyUse||x.block||x.mkt||x.feas||x.tweak);
  }
  function applyObj(obj,load){
    x.obj=obj;resetDown(x);
    x.comps=load&&PRESETS[obj]?PRESETS[obj].map(n=>({n:n,star:false})):[];
    objIn.value=PRESETS[obj]?'':obj;
    api.save();paintObj();paintComps();api.refresh();
  }
  function askChange(obj,load){
    api.modal('<button class="modal-x">×</button><h3>换对象？</h3>'+
      '<p>换对象会清空已拆的组件、虚拟产品和三个解释，不能撤回。</p>'+
      '<div class="modal-actions"><button class="btn ghost" id="a11No">取消</button><button class="btn primary" id="a11Yes">换</button></div>');
    document.querySelector('#a11No').onclick=()=>{api.closeModal();paintObj();};
    document.querySelector('#a11Yes').onclick=()=>{api.closeModal();applyObj(obj,load);};
  }
  function choosePreset(name){
    if(x.obj===name){
      if(!x.comps.length){applyObj(name,true);api.toast('已载入 8 个参考组件');}
      else api.toast('已经是这个对象');
      return;
    }
    if(hasDownstream()){askChange(name,true);return;}
    applyObj(name,true);
    api.toast('已载入「'+name+'」的 8 个参考组件');
  }
  function useCustom(){
    const v=(objIn.value||'').trim().replace(/\s+/g,' ');
    if(!v){api.toast('写一个对象，例如：售后工单流程');objIn.focus();return;}
    if(PRESETS[v]){choosePreset(v);return;}
    if(v===x.obj)return;
    if(hasDownstream()){askChange(v,false);return;}
    applyObj(v,false);
  }
  function paintObj(){
    objs.querySelectorAll('[data-o]').forEach(b=>b.classList.toggle('on',x.obj===b.dataset.o));
    if(document.activeElement!==objIn){
      objIn.value=(x.obj&&!PRESETS[x.obj])?x.obj:'';
    }
    objHint.innerHTML=x.obj
      ?('对象：<b>'+api.esc(x.obj)+'</b>。'+(PRESETS[x.obj]?'已载入参考组件，删掉不对的，再补你自己的。':'组件要自己列；按右边四类扫一遍。'))
      :'三个预设自带 8 个参考组件，也可以直接写你自己的。';
  }
  function paintComps(){
    if(!x.comps.length){
      list.classList.add('a11-gempty');
      list.innerHTML='<div class="a11-empty"><b>'+(x.obj?'还没有组件':'还没有对象')+'</b>'+
        '<span>'+(x.obj?'从最大的那个组件开始。至少 8 个，才有得选。':'先在上方选一个对象，或直接输入你自己的。')+'</span></div>';
    }else{
      list.classList.remove('a11-gempty');
      list.innerHTML=x.comps.map(c=>
        '<div class="a11-comp'+(c.star?' on':'')+'" data-c="'+api.esc(c.n)+'">'+
        '<button class="a11-star'+(c.star?' on':'')+'" data-star title="标为重要组件（拿掉后用户会问还能用吗）">'+(c.star?'★':'☆')+'</button>'+
        '<span class="a11-cname" title="'+api.esc(c.n)+'">'+api.esc(c.n)+'</span>'+
        '<button class="a11-del" data-del title="删除">×</button></div>').join('');
    }
    const n=x.comps.length,s=stars(x);
    st.textContent=n+' / '+MIN_COMP+(s?' · ★ '+s:'');
    bar.style.width=Math.min(100,n/MIN_COMP*100)+'%';
    bar.style.background=n>=MIN_COMP?'var(--ok)':'var(--acc)';
    if(!x.obj)hint.textContent='先选对象。';
    else if(!n)hint.textContent='从最大的那个组件开始。至少 '+MIN_COMP+' 个。';
    else if(n<MIN_COMP)hint.textContent='还差 '+(MIN_COMP-n)+' 个组件。';
    else if(!s)hint.textContent='组件够了。标一个★——拿掉后用户会问“这还能用吗”的那个。';
    else hint.textContent='够 '+MIN_COMP+' 个、★ '+s+' 个。下一步只能拿掉一个。';
    hint.classList.toggle('a11-pass',n>=MIN_COMP&&s>0);
  }
  function addComp(){
    if(!x.obj){api.toast('先选对象');objIn.focus();return;}
    const name=(compIn.value||'').trim().replace(/\s+/g,' ');
    if(!name){compIn.focus();return;}
    if(name.length>12){api.toast('组件名控制在 12 字内');return;}
    if(x.comps.some(c=>c.n===name)){api.toast('这个组件已经在清单里');compIn.value='';return;}
    if(x.comps.length>=18){api.toast('组件够多了，先删再添');return;}
    x.comps.push({n:name,star:false});
    compIn.value='';api.save();paintComps();api.refresh();
  }

  objs.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>choosePreset(b.dataset.o));
  objUse.onclick=useCustom;
  objIn.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();useCustom();}});
  sec.querySelector('#compAdd').onclick=addComp;
  compIn.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();addComp();}});
  list.addEventListener('click',e=>{
    const star=e.target.closest('[data-star]');
    if(star){
      const row=star.closest('[data-c]');if(!row)return;
      const name=row.dataset.c,it=x.comps.find(z=>z.n===name);
      if(!it)return;
      it.star=!it.star;
      if(!it.star&&x.pick===name)resetDown(x);
      api.save();paintComps();api.refresh();
      return;
    }
    const del=e.target.closest('[data-del]');
    if(del){
      const row=del.closest('[data-c]');if(!row)return;
      const name=row.dataset.c,i=x.comps.findIndex(z=>z.n===name);
      if(i<0)return;
      x.comps.splice(i,1);
      if(x.pick===name)resetDown(x);
      api.save();paintComps();api.refresh();
    }
  });
  sec.querySelector('#compClear').onclick=()=>{
    if(!x.comps.length){api.toast('清单已经是空的');return;}
    x.comps=[];resetDown(x);api.save();paintComps();api.refresh();api.toast('已清空，重新拆一次');
  };
  sec.querySelector('#aiDecomp').onclick=()=>{
    if(!x.obj){api.toast('先选对象，AI 才知道拆什么');objIn.focus();return;}
    let loaded=false;
    if(!x.comps.length&&PRESETS[x.obj]){
      x.comps=PRESETS[x.obj].map(n=>({n:n,star:false}));loaded=true;
      api.save();paintComps();api.refresh();
    }
    const names=x.comps.map(c=>c.n);
    if(api.ai)api.ai('decompose','对象：'+x.obj+'。我列的组件：'+(names.length?names.join('、'):'（还没列）')+'。只指出我漏掉的一类，不要给方案。');
    api.toast(loaded?'已载入参考组件；AI 的追问在右栏':'AI 的追问在右栏，清单以你改的为准');
  };
  paintObj();paintComps();
  sec.__a11=function(){paintObj();paintComps();};
},
onEnter(){
  /* 返回本步时，对象可能已在别处改变，重绘一遍 */
  const sec=document.querySelector('.step[data-s="2"]');
  if(sec&&sec.__a11)sec.__a11();
},
gate(S){const x=view(S);return !!(x.obj&&x.comps.length>=MIN_COMP&&x.comps.some(c=>c.star));}},

/* ================= 4 强制形态 ================= */
{id:'force',name:'强制形态',short:'形态',kicker:'STEP 4 · 强制形态',
html:`
<div class="step-h"><h1>选一个★，<em>把它拿掉</em></h1>
<p>现在不补。先让这个残缺形态站住，看看它有多难看——难看的地方，通常就是价值所在。</p></div>
<div class="grid2" style="align-items:start">
  <div class="stack">
    <div class="panel">
      <div class="panel-h"><h4>1 · 拿掉哪一个</h4><span>只列★组件</span></div>
      <div class="a11-picks" id="pickList"></div>
      <div class="hint" id="pickHint" style="margin-top:8px">只能选一个。选那个你最舍不得的。</div>
    </div>
    <div class="panel">
      <div class="panel-h"><h4>2 · 强制形态</h4><span>先别补</span></div>
      <div class="row"><button class="btn primary" id="cutBtn" disabled>拿掉它</button><span class="small" id="cutHint">先选组件</span></div>
    </div>
    <div id="formSlot"></div>
  </div>
  <div class="stack">
    <div class="panel">
      <div class="panel-h"><h4>这个形态还欠什么</h4><span>下一步回答</span></div>
      <div class="a11-gap" id="gapList"></div>
    </div>
    <div class="panel a11-quiet">
      <div class="panel-h"><h4>提醒</h4><span>不是好点子</span></div>
      <p class="small">形态是被迫的，价值是人找出来的。现在这个残缺形态没有价值，只有可能性。</p>
    </div>
    <div class="panel">
      <div class="panel-h"><h4>三种拿法</h4><span>选形状，不选答案</span></div>
      <div class="a11-ways">
        <div><b>As Is</b><span>不补，直接把残缺形态拿去用</span></div>
        <div><b>外置</b><span>把它的活挪到现场，让用户或环境接手</span></div>
        <div><b>共享</b><span>一个部件服务多个对象，从零件变成设施</span></div>
      </div>
    </div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,x=ensure(S);
  const picks=sec.querySelector('#pickList'),cut=sec.querySelector('#cutBtn'),cutHint=sec.querySelector('#cutHint'),slot=sec.querySelector('#formSlot'),gaps=sec.querySelector('#gapList');

  function paintPicks(){
    const starred=x.comps.filter(c=>c.star);
    if(x.pick&&!starred.some(c=>c.n===x.pick)){resetDown(x);}
    if(!starred.length){
      picks.innerHTML='<div class="a11-empty"><b>还没有★组件</b>'+
        '<span>回上一步，挑一个“拿掉后用户会问这还能用吗”的组件，标上★。</span>'+
        '<button class="btn sm" id="a11BackStar">回上一步</button></div>';
    }else{
      picks.innerHTML=starred.map(c=>
        '<button class="a11-pick'+(x.pick===c.n?' on':'')+'" data-p="'+api.esc(c.n)+'">'+
        '<i>★</i><b>'+api.esc(c.n)+'</b><span>'+(x.pick===c.n?'已选':'选它')+'</span></button>').join('');
    }
    cut.disabled=!x.pick;
    cut.textContent=x.pick?'拿掉「'+x.pick+'」':'拿掉它';
    cutHint.textContent=x.pick?'下一步：给它三个形态，不许补。':'先选一个★组件';
  }
  function paintForms(){
    if(!x.forms.length){slot.innerHTML='';return;}
    slot.innerHTML='<div class="panel"><div class="panel-h"><h4>3 · 选一个虚拟产品</h4><span>三个候选</span></div>'+
      '<div class="a11-forms">'+x.forms.map((f,i)=>
        '<button class="a11-form'+(x.form===f.n?' on':'')+'" data-f="'+i+'">'+
        '<span class="a11-fk">'+api.esc(f.k)+'</span><b>'+api.esc(f.n)+'</b><span>'+api.esc(f.w)+'</span></button>').join('')+
      '</div>'+
      '<div class="field" style="margin-top:10px"><label>可以改写</label>'+
      '<input id="formIn" maxlength="48" value="'+api.esc(x.form)+'" placeholder="改成一个别人能复述的名字" autocomplete="off"></div>'+
      '<div class="row" style="margin-top:6px"><span class="small" style="flex:1">名字要能被别人复述。不要写“智能平台”。</span>'+
      '<button class="btn sm ghost" id="a11AiForms">AI 换一版</button></div></div>';
    const inp=slot.querySelector('#formIn');
    slot.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{
      const f=x.forms[+b.dataset.f];if(!f)return;
      x.form=f.n;api.save();paintForms();paintGaps();api.refresh();
    });
    inp.addEventListener('input',()=>{
      x.form=inp.value;
      slot.querySelectorAll('[data-f]').forEach(b=>b.classList.toggle('on',x.forms[+b.dataset.f].n===x.form));
      api.save();paintGaps();api.refresh();
    });
    slot.querySelector('#a11AiForms').onclick=aiForms;
  }
  function aiForms(){
    const url=formsURL();
    if(!url){api.toast('本机模式：本地三版已经够用');return;}
    fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({lesson_id:'A11',object:x.obj,components:[x.pick],tool:'subtraction'})})
      .then(r=>r.ok?r.json():null)
      .then(d=>{
        const fs=(d&&Array.isArray(d.forms)?d.forms:[]).filter(f=>f&&f.text).slice(0,3)
          .map(f=>({n:String(f.text).slice(0,48),k:'AI',w:String(f.why||'AI 给的形态，先解释再判断。').slice(0,80)}));
        if(!fs.length){api.toast('AI 没接上，本地三版已经够用');return;}
        x.forms=fs;x.form='';api.save();paintForms();paintGaps();api.refresh();api.toast('AI 换了三版');
      })
      .catch(()=>api.toast('AI 没接上，本地三版已经够用'));
  }
  function paintGaps(){
    const rows=[
      ['虚拟产品',!!x.form.trim()],
      ['谁会用它',x.who.trim().length>=MIN_TXT],
      ['为什么愿意用',x.whyUse.trim().length>=MIN_TXT],
      ['最大阻力怎么解',x.block.trim().length>=MIN_TXT],
      ['双过滤',!!(x.mkt&&x.feas)]
    ];
    gaps.innerHTML=rows.map(r=>'<div class="'+(r[1]?'on':'')+'"><i>'+(r[1]?'✓':'○')+'</i><b>'+r[0]+'</b><span>'+(r[1]?(r[0]==='双过滤'?'已打':'已填'):(r[0]==='双过滤'?'未打':'未填'))+'</span></div>').join('');
  }
  picks.addEventListener('click',e=>{
    if(e.target.closest('#a11BackStar')){api.go(2);return;}
    const b=e.target.closest('[data-p]');if(!b)return;
    const name=b.dataset.p;
    if(x.pick!==name){
      x.pick=name;x.forms=[];x.form='';
      x.who='';x.whyUse='';x.block='';x.mkt=0;x.feas=0;x.tweak='';
    }
    api.save();paintPicks();paintForms();paintGaps();api.refresh();
  });
  cut.onclick=()=>{
    if(!x.pick){api.toast('先选一个★组件');return;}
    x.forms=localForms(x.obj,x.pick);x.form='';
    api.save();paintForms();paintGaps();api.refresh();
    api.toast('三个形态。选一个，再改。');
  };
  paintPicks();paintForms();paintGaps();
  sec.__a11=function(){paintPicks();paintForms();paintGaps();};
},
onEnter(){
  const sec=document.querySelector('.step[data-s="3"]');
  if(sec&&sec.__a11)sec.__a11();
},
gate(S){const x=view(S);return !!(x.pick&&x.form.trim().length>=2);}},

/* ================= 5 强行解释 ================= */
{id:'justify',name:'强行解释',short:'解释',kicker:'STEP 5 · 强行解释',
html:`
<div class="step-h"><h1>三个问题，<em>答不上来就是没想清</em></h1>
<p>不用写方案。只回答：谁用、为什么用、最难的那一环怎么过。每句至少 12 字。</p></div>
<div class="a11-note" style="margin-bottom:12px">最大阻力路径：拿掉之后最难的那一环。它不是 bug，是你的价值主张要落地的地方。</div>
<div class="grid2" style="align-items:start">
  <div class="panel">
    <div class="panel-h"><h4>三句话</h4><span>各 ≥ 12 字</span></div>
    <div class="field a11-f" data-f="who">
      <label>谁会用它 <em data-cnt="who">0 / 12</em></label>
      <textarea data-in="who" maxlength="90" placeholder="一个具体的人或岗位。例如：每天早上带咖啡进地铁的上班族"></textarea>
    </div>
    <div class="field a11-f" data-f="whyUse" style="margin-top:14px">
      <label>他为什么愿意用（替代了什么） <em data-cnt="whyUse">0 / 12</em></label>
      <textarea data-in="whyUse" maxlength="90" placeholder="原来怎么解决，现在少花了什么。例如：以前要停下来开盖找地方放，现在单手就能喝"></textarea>
    </div>
    <div class="field a11-f" data-f="block" style="margin-top:14px">
      <label>最麻烦的一环怎么解决 <em data-cnt="block">0 / 12</em></label>
      <textarea data-in="block" maxlength="90" placeholder="谁在什么时候补位？例如：杯口做成一圈硅胶唇，盖子取消后密封由它接"></textarea>
    </div>
  </div>
  <div class="stack">
    <div class="panel">
      <div class="panel-h"><h4>反方陪审团</h4><span>CFO / 一线 / 客户</span></div>
      <p class="small">他们不夸你，只问一句。答不上来的那一问，就是缺口。</p>
      <div class="a11-jury" id="juryList"></div>
      <button class="btn sm" id="juryBtn" style="margin-top:10px;width:100%">让陪审团问我</button>
      <div class="hint" id="juryHint" style="margin-top:6px">AI 不可用时，这三问就是本地题库。</div>
    </div>
  </div>
</div>
<div class="grid3" style="margin-top:12px">
  <div class="panel a11-mini"><div class="a11-cn">及格线 01</div><b>谁：一个岗位</b><span>“用户”不算。写到一个能点名的人。</span></div>
  <div class="panel a11-mini"><div class="a11-cn">及格线 02</div><b>为什么：替代了什么</b><span>“更方便”不算。写少花了哪一步。</span></div>
  <div class="panel a11-mini"><div class="a11-cn">及格线 03</div><b>阻力：谁补位</b><span>“加强培训”不算。写谁在什么时候补位。</span></div>
</div>`,
init(sec,api){
  const S=api.S,x=ensure(S);
  const fields={};
  ['who','whyUse','block'].forEach(k=>{
    const el=sec.querySelector('[data-in="'+k+'"]');
    fields[k]=el;
    el.value=x[k]||'';
    el.addEventListener('input',()=>{
      x[k]=el.value;
      const cnt=sec.querySelector('[data-cnt="'+k+'"]');
      const len=x[k].length;
      cnt.textContent=len+' / '+MIN_TXT;
      cnt.classList.toggle('a11-pass',len>=MIN_TXT);
      api.save();api.refresh();
    });
  });
  const juryList=sec.querySelector('#juryList'),juryHint=sec.querySelector('#juryHint'),juryBtn=sec.querySelector('#juryBtn');
  function paintFields(){
    ['who','whyUse','block'].forEach(k=>{
      if(fields[k].value!==(x[k]||''))fields[k].value=x[k]||'';
      const cnt=sec.querySelector('[data-cnt="'+k+'"]');
      const len=(x[k]||'').length;
      cnt.textContent=len+' / '+MIN_TXT;
      cnt.classList.toggle('a11-pass',len>=MIN_TXT);
    });
  }
  function paintJury(){
    const c=x.pick||'被拿掉的组件',f=x.form||'这个形态';
    const qs=[
      ['CFO','拿掉'+c+'省下的成本，够不够抵'+f+'带来的培训、售后和解释成本？'],
      ['一线员工','现场没有'+c+'，我第一步做什么？谁告诉我？'],
      ['客户','我为什么要在乎'+f+'？它比我现在的做法少哪一步？']
    ];
    juryList.innerHTML=qs.map(q=>'<div class="a11-jq"><span class="a11-role">'+q[0]+'</span><p>'+api.esc(q[1])+'</p></div>').join('');
    juryBtn.textContent=x.jury?'再问一遍':'让陪审团问我';
    juryHint.textContent=x.jury?'三问已列出。AI 的追问在右栏；答不上来的那一问，就是缺口。':'AI 不可用时，这三问就是本地题库。';
  }
  juryBtn.onclick=()=>{
    x.jury=true;api.save();
    if(api.ai)api.ai('jury','对象：'+x.obj+'；拿掉：'+x.pick+'；形态：'+x.form+'。以 CFO、一线员工、客户三种身份各问一句，不要给建议。');
    paintJury();api.refresh();api.toast('陪审团已就位：右栏看 AI 的追问');
  };
  paintFields();paintJury();
  sec.__a11=function(){paintFields();paintJury();};
},
onEnter(){
  const sec=document.querySelector('.step[data-s="4"]');
  if(sec&&sec.__a11)sec.__a11();
},
gate(S){const x=view(S);return x.who.trim().length>=MIN_TXT&&x.whyUse.trim().length>=MIN_TXT&&x.block.trim().length>=MIN_TXT;}},

/* ================= 6 过滤与提交 ================= */
{id:'submit',name:'双过滤',short:'双过滤',kicker:'STEP 6 · 过滤与提交',
html:`
<div class="step-h"><h1>两个分数，<em>决定它下一步怎么活</em></h1>
<p>分数不是评价好坏，是决定下一步动作：先做原型、先换人、还是先砍功能。</p></div>
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
      <div class="a11-judge" id="judge">两个分数都打上，才有判断。</div>
    </div>
    <div class="panel">
      <div class="field a11-f">
        <label>改一处，让它更可行 <em id="tweakCnt">0 / 8</em></label>
        <textarea id="tweak" maxlength="90" placeholder="只改一处。例如：先不开发 App，用微信群接单跑两周"></textarea>
      </div>
      <div class="hint" style="margin-top:6px">写动作，不写愿望。“加强推广”不算改一处。</div>
    </div>
    <div class="row">
      <button class="btn primary" id="subBtn" disabled>提交</button>
      <button class="btn" id="expBtn">导出 PNG</button>
      <span class="small" id="subSt">卡还不完整</span>
    </div>
  </div>
  <div id="cardSlot"></div>
</div>
<div class="panel" style="margin-top:12px">
  <div class="panel-h"><h4>提交后，同班会看这三样</h4><span>互评口径</span></div>
  <div class="grid3">
    <div><div class="mono" style="font-size:9.5px;color:var(--acc)">形态</div><p class="small" style="margin-top:3px">拿掉之后，功能有没有人接。</p></div>
    <div><div class="mono" style="font-size:9.5px;color:var(--acc)">解释</div><p class="small" style="margin-top:3px">谁、替代了什么、谁补位。</p></div>
    <div><div class="mono" style="font-size:9.5px;color:var(--acc)">判断</div><p class="small" style="margin-top:3px">双过滤与改一处是否自洽。</p></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,x=ensure(S);
  const judge=sec.querySelector('#judge'),tweak=sec.querySelector('#tweak'),tweakCnt=sec.querySelector('#tweakCnt');
  const slot=sec.querySelector('#cardSlot'),subBtn=sec.querySelector('#subBtn'),subSt=sec.querySelector('#subSt');

  function paintStars(){
    [['mkt',x.mkt],['feas',x.feas]].forEach(p=>{
      sec.querySelectorAll('[data-k="'+p[0]+'"] button').forEach(b=>b.classList.toggle('on',+b.dataset.v<=p[1]));
    });
  }
  function paintJudge(){
    const j=judgeOf(x.mkt,x.feas);
    judge.textContent=j.t;
    judge.className='a11-judge'+(j.k?' a11-'+j.k:'');
  }
  function paintTweak(){
    if(tweak.value!==(x.tweak||''))tweak.value=x.tweak||'';
    const len=(x.tweak||'').length;
    tweakCnt.textContent=len+' / '+MIN_TWEAK;
    tweakCnt.classList.toggle('a11-pass',len>=MIN_TWEAK);
  }
  function paintCard(){
    if(!x.obj){
      slot.innerHTML='<div class="panel a11-cardwait"><div class="panel-h"><h4>产出卡</h4><span>还差</span></div>'+
        '<div class="a11-need">'+needRows(x).map(r=>
          '<div class="'+(r.ok?'on':'')+'"><i>'+(r.ok?'✓':'○')+'</i><b>'+r.k+'</b><span>'+api.esc(r.tip)+'</span></div>').join('')+
        '</div></div>';
      return;
    }
    const c=L.card(S);
    const miss=needRows(x).filter(r=>!r.ok).map(r=>r.k);
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A11</span><span>减法实验卡</span></div>'+
      '<h5>'+api.esc(c.title)+'</h5><div class="kv">'+
      c.rows.map(r=>'<div><b>'+api.esc(r[0])+'</b><span class="'+(r[1]&&r[1]!=='—'?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+
      '</div></div>'+
      (miss.length
        ?'<div class="a11-miss">还欠：'+api.esc(miss.join(' · '))+'</div>'
        :'<div class="a11-miss a11-done">卡齐了。提交后进入班级互评。</div>');
  }
  function paintSubmit(){
    const ready=fullGate(x);
    subBtn.disabled=S.submitted||!ready;
    subBtn.textContent=S.submitted?'已提交':'提交到班级';
    subSt.textContent=S.submitted?'已提交 · 进入互评池':(ready?'可以提交':'卡还不完整');
  }
  sec.querySelectorAll('[data-k]').forEach(box=>{
    box.querySelectorAll('button').forEach(b=>b.onclick=()=>{
      x[box.dataset.k]=+b.dataset.v;
      api.save();paintStars();paintJudge();paintCard();paintSubmit();api.refresh();
    });
  });
  tweak.addEventListener('input',()=>{
    x.tweak=tweak.value;
    tweakCnt.textContent=x.tweak.length+' / '+MIN_TWEAK;
    tweakCnt.classList.toggle('a11-pass',x.tweak.length>=MIN_TWEAK);
    api.save();paintCard();paintSubmit();api.refresh();
  });
  subBtn.onclick=async()=>{
    if(!fullGate(x)){api.toast('卡还不完整，先补齐');return;}
    subBtn.disabled=true;subBtn.textContent='提交中…';
    try{await api.submit();}catch(e){api.toast('提交出错，已存本机');}
    paintSubmit();paintCard();
  };
  sec.querySelector('#expBtn').onclick=()=>api.exportCard();
  paintStars();paintJudge();paintTweak();paintCard();paintSubmit();
  sec.__a11=function(){paintStars();paintJudge();paintTweak();paintCard();paintSubmit();};
},
onEnter(){
  const sec=document.querySelector('.step[data-s="5"]');
  if(sec&&sec.__a11)sec.__a11();
},
gate(S){return fullGate(view(S));}}
],

side:{asks:[
 '你说“重要”，是因为它贵，还是因为拿掉之后用户会问“这还能用吗”？',
 '拿掉之后，那个功能现在由谁来完成？如果没人接，你是在优化还是在毁坏？',
 '谁会因为少了它而高兴？具体到一个岗位，不要“用户”。',
 '最难的那一环，你是补一个零件回去，还是借现场已有的东西？',
 '如果只允许改一处让它更可行，你改哪一处，为什么不是别处？'
]},

card(S){
  const x=view(S);
  const n=x.comps.length,st=x.comps.filter(c=>c.star).length;
  const j=(x.mkt&&x.feas)?judgeOf(x.mkt,x.feas).t:'—';
  return {title:'A11 · 我的减法实验卡',rows:[
    ['对象',x.obj||'—'],
    ['拆解',n?(n+' 个组件 · 标★ '+st+' 个'):'—'],
    ['拿掉的★',x.pick||'—'],
    ['虚拟产品',x.form||'—'],
    ['谁会用它',x.who||'—'],
    ['为什么愿意用',x.whyUse||'—'],
    ['最大阻力',x.block||'—'],
    ['双过滤',(x.mkt?'市场 '+x.mkt:'市场 —')+' · '+(x.feas?'可行 '+x.feas:'可行 —')],
    ['判断',j],
    ['改的那一处',x.tweak||'—']
  ]};
},

notes:[
 {t:'本节目标',h:'让每个学员在自己的对象上跑完一次减法，交出一个<b>能被追问</b>的形态。不追求点子漂亮，追求每一步都有依据。'},
 {t:'时间分配（45′）',h:'自学 25′：先猜 3′ · 七步与判据 6′ · 拆解 6′ · 强制形态 5′ · 三个解释 5′。直播 15′：只解剖 3 张卡。提交与互评 5′。'},
 {t:'常见卡点',h:'① 把“省成本”当减法：追问“拿掉后谁反而受益”；② 拿掉后功能没人接：那是毁坏，不是减法；③ 三个解释只写“更方便”：要求写出替代了什么、少花了哪一步。'},
 {t:'直播怎么接',h:'打开直播中控，按“★组件”和“最大阻力”两列排序，挑 3 张：1 个★选得准的、1 个★选错的（拿掉后功能没人接）、1 个把阻力答成“加强培训”的。现场只问一句：<b>“这个功能现在谁在做？”</b>让全班在弹幕里答，再回到三种形态：As Is / 外置 / 共享。'},
 {t:'判分口径',h:'★是否真是重要组件（拿掉后用户会问还能用吗）40%；最大阻力是否落到一个具体的人或资源 30%；双过滤与“改一处”是否自洽 30%。不评点子新不新。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A11']=L;
})();
