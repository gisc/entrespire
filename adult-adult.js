/* =========================================================
   SIT 创新专业大师版 · 课程引擎
   离线优先：本地先存；登录后尽力同步班级与互评
   ========================================================= */
(function(){
'use strict';
const $=(s,r)=>(r||document).querySelector(s);
const $$=(s,r)=>Array.from((r||document).querySelectorAll(s));
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

const Q=new URLSearchParams(location.search);
const INDEX=(window.FXM_ADULT_INDEX||[]);
const LID=(Q.get('l')||'A01').toUpperCase();
const L=(window.FXM_ADULT||{})[LID];
if(!L){document.body.innerHTML='<div style="padding:60px;color:#8D97AA;font:14px/1.8 sans-serif">本节内容未加载：'+esc(LID)+'</div>';return;}

/* ---------- store ---------- */
const KEY='fxm_adult_v1';
let A={lessons:{},profile:{name:'',cohort:'',role:''},createdAt:Date.now()};
try{const r=JSON.parse(localStorage.getItem(KEY)||'null');if(r&&typeof r==='object')A=Object.assign(A,r);}catch(e){}
if(!A.lessons)A.lessons={};
const S=A.lessons[LID]=Object.assign({answers:{},done:[],submitted:false,updated:0},A.lessons[LID]||{});
let saveTimer=null,syncTimer=null;
function save(opts){
  S.updated=Date.now();
  clearTimeout(saveTimer);saveTimer=setTimeout(()=>{try{localStorage.setItem(KEY,JSON.stringify(A));}catch(e){}},120);
  setSave('saving');
  if(TOKEN){clearTimeout(syncTimer);syncTimer=setTimeout(()=>sync((opts&&opts.status)||(S.submitted?'submitted':'draft')),1400);}
}
function setSave(st){
  const el=$('#saveSt');if(!el)return;
  el.className='save-st '+(st==='ok'?'ok':st==='saving'?'saving':'');
  el.querySelector('span').textContent=st==='ok'?'已保存':st==='saving'?'保存中…':TOKEN?'待同步':'本机';
}

/* ---------- api ---------- */
const API=(function(){
  const q=Q.get('api');
  if(q)return q.replace(/\/$/,'');
  if(location.protocol==='file:')return 'http://127.0.0.1:8898/api/adult';
  const p=location.pathname.replace(/\/adult\/.*$/,'');
  return p+'/api/adult';
})();
let TOKEN=localStorage.getItem('fxm_adult_token')||'';
let ME=null;
async function call(path,opt){
  opt=opt||{};
  const h=Object.assign({'Content-Type':'application/json'},opt.headers||{});
  if(TOKEN)h['Authorization']='Bearer '+TOKEN;
  const res=await fetch(API+path,{method:opt.method||'GET',headers:h,body:opt.body?JSON.stringify(opt.body):undefined});
  if(res.status===401){TOKEN='';localStorage.removeItem('fxm_adult_token');paintAuth();}
  if(!res.ok)throw new Error((await res.json().catch(()=>({}))).detail||res.status);
  return res.json();
}
async function sync(status){
  try{
    await call('/lessons/'+LID+'/submission',{method:'PUT',body:{payload:{answers:S.answers,done:S.done,card:(L.card?L.card(S):null)},status:status}});
    setSave('ok');
  }catch(e){setSave('off');}
}
async function bootAuth(){
  if(!TOKEN){paintAuth();return;}
  try{ME=await call('/me');A.profile.name=ME.user.name;A.profile.role=ME.user.role;
    if(ME.cohorts&&ME.cohorts[0])A.profile.cohort=ME.cohorts[0].name;
    localStorage.setItem(KEY,JSON.stringify(A));setSave('ok');
  }catch(e){ME=null;}
  paintAuth();
}
function paintAuth(){
  const el=$('#authBtn');if(!el)return;
  const on=!!(TOKEN&&ME);
  el.className='auth'+(on?' on':'');
  el.innerHTML='<i class="dot"></i>'+esc(on?(ME.user.name||'已登录'):'本机模式');
  el.title=on?('班级：'+(A.profile.cohort||'—')):'点击用邀请码登录，加入班级';
}

/* ---------- ai ---------- */
const AI={busy:false,history:[]};
async function aiAsk(mode,text){
  if(AI.busy)return '';
  AI.busy=true;addMsg('me',esc(text));
  const btn=$('#askSend');if(btn)btn.disabled=true;
  let out='';
  try{
    const r=await call('/ai/ask',{method:'POST',body:{mode:mode,lesson_id:LID,context:{title:L.title,answers:S.answers},history:AI.history.slice(-6)}});
    if(r&&r.reply){out=r.reply;addMsg('ai',out);AI.history.push({role:'assistant',content:out});}
    else{out=fallback();}
  }catch(e){out=fallback();}
  finally{AI.busy=false;if(btn)btn.disabled=false;}
  return out;
  function fallback(){
    const asks=(L.side&&L.side.asks)||[];
    const q=asks[(AI.history.length)%Math.max(1,asks.length)]||'如果你只能保留一个功能，你保留哪个？';
    addMsg('ai','<b>换个角度想：</b>'+esc(q));
    return q;
  }
}
async function aiForms(obj,comps){
  if(AI.busy)return [];
  AI.busy=true;
  try{
    const r=await call('/ai/forms',{method:'POST',body:{lesson_id:LID,object:obj||'',components:comps||[],tool:L.tool||'subtraction'}});
    return (r&&r.forms)||[];
  }catch(e){return [];}
  finally{AI.busy=false;}
}
function addMsg(who,html){
  const box=$('#chat');if(!box)return;
  const d=document.createElement('div');d.className='msg '+(who==='me'?'me':'ai');d.innerHTML=html;
  box.appendChild(d);box.scrollTop=box.scrollHeight;
}

/* ---------- icons ---------- */
const ICON={
 sub:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 6h5v6" stroke-dasharray="2 2" opacity=".65"/><path d="M7 12h6"/></svg>',
 mul:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="6" width="11" height="9" rx="2"/><rect x="9" y="10" width="11" height="9" rx="2" stroke-dasharray="3 2" opacity=".8"/></svg>',
 div:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="7" height="6" rx="1.2"/><rect x="14" y="4" width="7" height="6" rx="1.2"/><rect x="8" y="14" width="8" height="6" rx="1.2"/><path d="M6.5 10v4M17.5 10v4" stroke-dasharray="2 2" opacity=".6"/></svg>',
 tu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="13" r="4"/><path d="M12 11h4V7h4M12 15h5v3h-2"/></svg>',
 ad:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6.5" cy="7.5" r="2.5"/><circle cx="17.5" cy="16.5" r="2.5"/><path d="M9 9l6 6" stroke-dasharray="2 2"/><path d="M6.5 3v-1M17.5 21v1"/></svg>',
 mind:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="8"/><path d="M12 4v16M4 12h16" opacity=".5"/><circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none"/></svg>',
 avm:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 18h16"/><rect x="6" y="12" width="3" height="6"/><rect x="11" y="8" width="3" height="10"/><rect x="16" y="4" width="3" height="14"/></svg>'
};

/* ---------- rail ---------- */
function renderRail(){
  const rail=$('#rail');if(!rail)return;
  const byWeek={};
  INDEX.forEach(it=>{(byWeek[it.week]=byWeek[it.week]||[]).push(it);});
  let h='<div class="rail-head"><b>课程地图</b><span>40 节 · 10 周</span></div>';
  Object.keys(byWeek).sort((a,b)=>a-b).forEach(w=>{
    const items=byWeek[w];
    h+='<div class="week"><div class="week-h"><em>W'+w+'</em><i></i><s>'+items.length+' 节</s></div>';
    items.forEach(it=>{
      const st=A.lessons[it.id]||{};
      const done=st.submitted?'done':'';
      const active=it.id===LID?'active':'';
      const locked=!(window.FXM_ADULT||{})[it.id]?'locked':'';
      h+='<div class="li '+done+' '+active+' '+locked+'" data-go="'+it.id+'">'+
        '<span class="n">'+it.id.slice(1)+'</span>'+
        '<span class="t">'+esc(it.title)+'</span>'+
        '<span class="s">'+(st.submitted?'✓':(locked?'·':''))+'</span></div>';
    });
    h+='</div>';
  });
  rail.innerHTML=h;
  $$('.li',rail).forEach(el=>el.onclick=()=>{
    const id=el.dataset.go;
    if(el.classList.contains('locked')){toast('本节课件尚未上线（P0 只交付 3 节样课）');return;}
    if(id!==LID)location.href='adult-lesson.html?l='+id;
  });
  const cur=rail.querySelector('.li.active');if(cur)cur.scrollIntoView({block:'center'});
}

/* ---------- steps ---------- */
const STEPS=L.steps||[];
let cur=-1;
function renderSteps(){
  const main=$('#main');
  main.innerHTML=STEPS.map((s,i)=>'<section class="step" data-s="'+i+'"><div class="kicker">'+(s.kicker||('STEP '+(i+1)))+'</div>'+(s.html||'')+
    '<div class="step-cta"><span></span><button class="btn primary" data-next-inline>下一步</button></div></section>').join('');
  main.addEventListener('click',e=>{
    const g=e.target.closest('[data-go]');if(g){e.preventDefault();go(+g.dataset.go);}
    const n=e.target.closest('[data-next],[data-next-inline]');if(n){e.preventDefault();if(!n.disabled)go(cur+1);}
  });
  // 逐幕返回 api
  STEPS.forEach((s,i)=>{
    const sec=main.querySelector('.step[data-s="'+i+'"]');
    if(s.init){try{s.init(sec,api);}catch(e){console.error('[init '+i+']',e);}}
  });
}
function go(n,silent){
  n=clamp(n,0,STEPS.length-1);
  if(n===cur)return;
  cur=n;
  $$('.step').forEach((el,i)=>el.classList.toggle('on',i===n));
  paintFoot();
  $('#main').scrollTop=0;
  const s=STEPS[n];
  S.step=n;save();
  const kick=$('#stepKicker');if(kick)kick.textContent=s.kicker||('STEP '+(n+1)+' / '+STEPS.length);
  if(!silent&&s.onEnter){try{s.onEnter(api);}catch(e){}}
}
function paintFoot(){
  const nav=$('#stepsNav');
  nav.innerHTML=STEPS.map((s,i)=>
    '<button class="sn '+(i===cur?'on':(S.done.indexOf(i)>=0?'done':''))+'" data-i="'+i+'"><i class="i"></i><span>'+esc(s.short||s.name||('第 '+(i+1)+' 步'))+'</span></button>'
  ).join('');
  $$('.sn',nav).forEach(b=>b.onclick=()=>go(+b.dataset.i));
  $('#prevBtn').disabled=cur<=0;
  const last=cur>=STEPS.length-1;
  const st=STEPS[cur];
  const ok=!st||!st.gate||st.gate(S);
  const nextName=(STEPS[cur+1]&&STEPS[cur+1].name)||'';
  if(ok&&st&&st.gate&&S.done.indexOf(cur)<0){S.done.push(cur);try{localStorage.setItem(KEY,JSON.stringify(A));}catch(e){}}
  $('#nextBtn').textContent=last?'已到本节最后一步':(ok?'下一步：'+nextName:'先完成这一步');
  $('#nextBtn').disabled=last||!ok;
  const cta=$('.step.on .step-cta');
  if(cta){
    const msg=st&&st.hint?st.hint(S):'';
    cta.querySelector('span').innerHTML=last?'':(ok?'<b style="color:#9ED3B4">✓ 这一步完成</b>':'<b style="color:#EFCB94">'+esc(msg||'还没完成')+'</b>');
    const b=cta.querySelector('[data-next-inline]');
    b.style.display=last?'none':'';
    b.disabled=!ok;
    b.textContent=(nextName?'下一步：'+nextName:'下一步')+' →';
  }
}

/* ---------- side ---------- */
function paintSide(){
  const out=$('#sideOut');if(out&&L.card)out.innerHTML=cardHTML();
}
function cardHTML(){
  const c=L.card?L.card(S):{title:L.title,rows:[]};
  return '<div class="outcard"><div class="oh"><span>本节产出 · DELIVERABLE</span><span>'+esc(LID)+'</span></div>'+
    '<h5>'+esc(c.title)+'</h5><div class="kv">'+
    (c.rows||[]).map(r=>'<div><b>'+esc(r[0])+'</b><span class="'+(r[1]?'fill':'')+'">'+esc(r[1]||'—')+'</span></div>').join('')+
    '</div></div>';
}

/* ---------- export ---------- */
function exportCard(){
  const c=L.card?L.card(S):{title:L.title,rows:[]};
  const W=1240,H=1754,cv=document.createElement('canvas');cv.width=W;cv.height=H;
  const g=cv.getContext('2d');
  g.fillStyle='#0A0E15';g.fillRect(0,0,W,H);
  g.strokeStyle='#2A3547';g.lineWidth=2;g.strokeRect(40,40,W-80,H-80);
  g.fillStyle='#C9A227';g.font='500 15px "PingFang SC",sans-serif';g.fillText('SIT 创新专业大师版',70,100);
  g.fillStyle='#5A6679';g.font='13px ui-monospace,monospace';g.fillText(LID+' · WEEK '+L.week+' · '+new Date().toLocaleDateString('zh-CN'),70,126);
  g.fillStyle='#E9E7E2';g.font='700 40px "Songti SC",serif';
  wrap(g,c.title,70,196,W-140,48).forEach((l,i)=>g.fillText(l,70,196+i*48));
  let y=196+wrap(g,c.title,70,196,W-140,48).length*48+26;
  g.strokeStyle='#2A3547';g.beginPath();g.moveTo(70,y);g.lineTo(W-70,y);g.stroke();y+=40;
  (c.rows||[]).forEach(r=>{
    g.fillStyle='#5A6679';g.font='13px "PingFang SC",sans-serif';g.fillText(r[0],70,y);
    g.fillStyle='#E9E7E2';g.font='17px "PingFang SC",sans-serif';
    const lines=wrap(g,r[1]||'—',240,y,W-310,26);
    lines.forEach((l,i)=>g.fillText(l,240,y+i*26));
    y+=Math.max(1,lines.length)*26+18;
  });
  g.fillStyle='#4A5466';g.font='12px "PingFang SC",sans-serif';
  g.fillText('发小明 · SIT 系统创新思维 · 本文件由课程系统生成',70,H-70);
  const a=document.createElement('a');a.download='SIT大师版_'+LID+'_产出卡.png';a.href=cv.toDataURL('image/png');a.click();
  toast('产出卡已导出');
}
function wrap(g,text,x,y,maxW,lh){
  const chars=Array.from(String(text||''));const out=[];let line='';
  for(const ch of chars){if(g.measureText(line+ch).width>maxW&&line){out.push(line);line=ch;}else line+=ch;}
  if(line)out.push(line);return out.length?out:[''];
}

/* ---------- toast / modal ---------- */
let tt=null;
function toast(msg){
  const el=$('#toast');if(!el)return;
  el.textContent=msg;el.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>el.classList.remove('on'),2200);
}
function modal(html){
  const m=$('#modal');$('#modalBox').innerHTML=html;m.classList.add('on');
  m.onclick=e=>{if(e.target===m||e.target.classList.contains('modal-x')||(e.target.closest&&e.target.closest('[data-close]')))closeModal();};
}
function closeModal(){$('#modal').classList.remove('on');}

/* ---------- auth ui ---------- */
function authModal(){
  if(TOKEN&&ME){
    modal('<button class="modal-x">×</button><h3>已登录</h3><p>'+esc(ME.user.name)+'　·　班级：'+esc(A.profile.cohort||'—')+'</p>'+
      '<div class="row"><button class="btn" id="logoutBtn">退出登录</button><button class="btn primary" id="classBtn2">看班级互评</button></div>');
    $('#logoutBtn').onclick=()=>{TOKEN='';ME=null;localStorage.removeItem('fxm_adult_token');paintAuth();closeModal();toast('已退出，回到本机模式');};
    $('#classBtn2').onclick=()=>{closeModal();classModal();};
    return;
  }
  modal('<button class="modal-x">×</button><h3>加入班级</h3><p>输入企业管理员给你的邀请码。不登录也能上课，但产出只存在本机，不能提交与互评。</p>'+
    '<div class="stack"><div class="field"><label>邀请码</label><input id="ivCode" placeholder="例如 SIT2026" autocomplete="off"></div>'+
    '<div class="field"><label>你的名字</label><input id="ivName" placeholder="真实姓名，用于互评匿名编号" autocomplete="off"></div>'+
    '<div class="hint" id="ivHint">企业微信登录将在 P1 接入。</div></div>'+
    '<div class="modal-actions"><button class="btn ghost" id="ivCancel">稍后</button><button class="btn primary" id="ivOk">加入</button></div>');
  $('#ivCancel').onclick=closeModal;
  $('#ivOk').onclick=async()=>{
    const code=($('#ivCode').value||'').trim().toUpperCase();
    const name=($('#ivName').value||'').trim();
    if(!code||!name){$('#ivHint').textContent='邀请码和名字都要填。';return;}
    $('#ivOk').disabled=true;$('#ivOk').textContent='正在加入…';
    try{
      const r=await call('adult-auth-index.htmlinvite',{method:'POST',body:{code:code,name:name}});
      TOKEN=r.token;localStorage.setItem('fxm_adult_token',TOKEN);
      ME={user:r.user,cohorts:[r.cohort]};A.profile.name=r.user.name;A.profile.cohort=r.cohort.name;
      localStorage.setItem(KEY,JSON.stringify(A));paintAuth();closeModal();toast('已加入「'+r.cohort.name+'」');sync(S.submitted?'submitted':'draft');
    }catch(e){
      $('#ivHint').textContent='加入失败：'+(e.message||'邀请码无效');
      $('#ivOk').disabled=false;$('#ivOk').textContent='加入';
    }
  };
}

/* ---------- ai review ---------- */
async function runReview(){
  const c=L.card?L.card(S):{title:L.title,rows:[]};
  try{
    const r=await call('/ai/review',{method:'POST',body:{lesson_id:LID,payload:{card:c,answers:S.answers}}});
    if(!r)return null;
    S.review=r;save();
    showReview(r,c);
    return r;
  }catch(e){return null;}
}
function showReview(r,c){
  const bar=(k,label,desc)=>{
    const v=Number(r[k]||0);
    return '<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:11.5px;color:#8D97AA"><span>'+label+'　<span style="color:#5A6679;font-size:10px">'+desc+'</span></span><b style="color:#E9E7E2;font-family:var(--mono)">'+v+' / 5</b></div>'+
      '<div class="meter" style="margin-top:4px"><i style="width:'+(v/5*100)+'%;background:'+(v>=4?'#4E9F6E':v>=3?'#C9A227':'#C75660')+'"></i></div></div>';
  };
  const fb=r.fallback?'<p class="small" style="color:#5A6679">（当前未配置模型，这条是本地规则评审）</p>':'';
  modal('<button class="modal-x">×</button><h3>先让机器评一遍</h3>'+
    '<p class="small" style="margin-bottom:12px">'+esc((c&&c.title)||L.title)+'</p>'+
    bar('useful','有用','换我是用户会不会用')+
    bar('feasible','可行','明天能不能动手')+
    bar('evidence','证据','能不能说服一个怀疑的人')+
    '<div style="margin-top:12px;padding:10px 12px;border-left:2px solid #C9A227;background:rgba(201,162,39,.06);font-size:12px;line-height:1.75;color:#C9D2E0">'+
      '<b style="color:var(--gold2)">最该改的一处：</b>'+esc(r.comment||'—')+'</div>'+fb+
    '<p class="small" style="margin-top:10px">机器评审只做第一遍；正式互评仍由同班 3 位同学完成。</p>'+
    '<div class="modal-actions"><button class="btn primary" data-close>知道了</button></div>');
}

/* ---------- class / peer review ---------- */
async function classModal(){
  if(!(TOKEN&&ME)){authModal();return;}
  modal('<button class="modal-x">×</button><h3>班级互评</h3><p>匿名评审同班同学的产出：先看他的卡，再给三个维度打分。你的评分不会显示给被评人。</p><div id="rvBox" class="centerline">正在取待评…</div>');
  try{
    const r=await call('/reviews/next?n=3');
    const items=r.items||[];
    if(!items.length){$('#rvBox').innerHTML='<div class="centerline">这一节暂时没有待评的产出。<br>先把自己的做完并提交，就能进入互评池。</div>';return;}
    $('#rvBox').innerHTML='';
    const box=$('#rvBox');box.className='';
    items.forEach((it,idx)=>{
      const c=it.payload&&it.payload.card?it.payload.card:{title:'（无标题）',rows:[]};
      const d=document.createElement('div');d.style.marginBottom='14px';
      d.innerHTML='<div class="panel"><div class="panel-h"><h4>'+esc(it.alias||('学员 '+(idx+1)))+' · '+esc(it.lesson_id)+'</h4><span>'+esc(c.title||'')+'</span></div>'+
        '<div class="kv" style="display:grid;gap:4px;margin-bottom:10px">'+(c.rows||[]).map(x=>'<div style="display:flex;gap:8px;font-size:12px"><b style="color:#5A6679;width:64px;flex:none;font-weight:400">'+esc(x[0])+'</b><span style="color:#8D97AA">'+esc(x[1]||'—')+'</span></div>').join('')+'</div>'+
        '<div class="score">'+[['useful','有用：换我是用户会不会用'],['feasible','可行：明天能不能动手做'],['evidence','证据：能不能说服一个怀疑的人']].map(s=>
          '<div class="score-i"><div class="lb"><b>'+s[1].split('：')[0]+'</b><span>'+s[1].split('：')[1]+'</span></div><div class="stars" data-k="'+s[0]+'">'+[1,2,3,4,5].map(n=>'<button data-v="'+n+'">'+n+'</button>').join('')+'</div></div>').join('')+'</div>'+
        '<div class="field" style="margin-top:9px"><label>一句建议</label><textarea data-c placeholder="只写一句：如果只改一个地方，你会改哪里"></textarea></div>'+
        '<div class="modal-actions" style="margin-top:10px"><button class="btn primary sm" data-sub>提交这份评分</button></div></div>';
      box.appendChild(d);
      const scores={};
      d.querySelectorAll('.stars').forEach(st=>{
        st.querySelectorAll('button').forEach(b=>b.onclick=()=>{
          scores[st.dataset.k]=+b.dataset.v;
          st.querySelectorAll('button').forEach(x=>x.classList.toggle('on',+x.dataset.v<=+b.dataset.v));
        });
      });
      d.querySelector('[data-sub]').onclick=async()=>{
        if(Object.keys(scores).length<3){toast('三个维度都打过才能提交');return;}
        try{
          await call('/reviews',{method:'POST',body:{submission_id:it.submission_id,scores:scores,comment:d.querySelector('[data-c]').value}});
          d.remove();toast('已提交，感谢评审');
        }catch(e){toast('提交失败：'+e.message);}
      };
    });
  }catch(e){$('#rvBox').innerHTML='<div class="centerline">取互评失败：'+esc(e.message)+'<br>检查后端是否启动。</div>';}
}

/* ---------- api for lessons ---------- */
const api={$:$$,esc,S,A,toast,go,save,icon:k=>ICON[k]||'',next:()=>go(cur+1),set:function(k,v){S.answers[k]=v;save();paintSide();},
  get:function(k){return S.answers[k];},done:function(i){if(S.done.indexOf(i)<0)S.done.push(i);save();},
  ai:aiAsk,aiForms,modal,closeModal,sync,exportCard,card:()=>L.card?L.card(S):null,
  refresh:function(){paintFoot();paintSide();renderRail();},
  review:runReview,
  submit:async function(){
    S.submitted=true;S.submitAt=Date.now();save({status:'submitted'});
    if(TOKEN){await sync('submitted');toast('已提交到班级，进入互评池');}
    else toast('已存本机。登录后可提交到班级');
    paintFoot();renderRail();paintSide();
    runReview();
  }};

/* ---------- bind ---------- */
function bind(){
  $('#prevBtn').onclick=()=>go(cur-1);
  $('#nextBtn').onclick=()=>go(cur+1);
  $('#authBtn').onclick=authModal;
  $('#classBtn').onclick=classModal;
  $('#railToggle').onclick=()=>{document.body.classList.toggle('no-rail');};
  $('#sideToggle').onclick=()=>{document.body.classList.toggle('no-side');};
  $('#helpBtn').onclick=()=>modal('<button class="modal-x">×</button><h3>怎么用</h3><p>每一节都是一次完整的工作：先猜，再看概念，然后在工作台上动手，最后交一张产出卡。</p>'+
    '<div class="stack"><div class="side-card"><h6>键盘</h6><p><span class="kbd">←</span> <span class="kbd">→</span> 前后一步　<span class="kbd">Esc</span> 关闭弹窗</p></div>'+
    '<div class="side-card"><h6>本机模式</h6><p>不登录也能学，产出存在这台电脑。登录后才有班级、提交与互评。</p></div>'+
    '<div class="side-card"><h6>右栏</h6><p>「追问」是 AI 或本地问题库，逼你把话说清楚；「产出」实时预览你这一节的卡；「指引」是讲师用的要点。</p></div></div>');
  $$('.side-tab').forEach(t=>t.onclick=()=>{
    $$('.side-tab').forEach(x=>x.classList.toggle('on',x===t));
    $$('.side-body').forEach(b=>b.classList.toggle('on',b.dataset.tab===t.dataset.tab));
  });
  $('#askSend').onclick=()=>{
    const v=$('#askInput').value.trim();if(!v)return;
    $('#askInput').value='';AI.history.push({role:'user',content:v});aiAsk('so_what',v);
  };
  $('#askInput').addEventListener('keydown',e=>{if(e.key==='Enter')$('#askSend').click();});
  $$('#askList [data-ask]').forEach(b=>b.onclick=()=>{AI.history.push({role:'user',content:b.textContent});aiAsk('so_what',b.textContent);});
  $('#exportBtn').onclick=exportCard;
  document.addEventListener('keydown',e=>{
    const t=e.target;if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'))return;
    if(e.key==='Escape')closeModal();
    if(e.key==='ArrowRight')go(cur+1);
    if(e.key==='ArrowLeft')go(cur-1);
  });
}

/* ---------- boot ---------- */
try{
  document.title=LID+' · '+L.title+' | SIT 创新专业大师版';
  document.body.dataset.tool=L.tool||'mind';
  $('#lid').textContent=LID;
  $('#ltitle').textContent=L.title;
  $('#lweek').textContent='WEEK '+L.week+' · 第 '+(INDEX.findIndex(x=>x.id===LID)+1||1)+'/40 节';
  $('#guidetab').innerHTML=(L.notes||[]).map(n=>'<div class="side-card'+(n.warn?' warn':'')+'"><h6>'+esc(n.t)+'</h6><p>'+n.h+'</p></div>').join('')||'<div class="small">本节暂无讲师指引。</div>';
  $('#askList').innerHTML=((L.side&&L.side.asks)||[]).map(q=>'<button class="ask">'+esc(q)+'</button>').join('');
  $('#stepKicker').textContent=STEPS[0].kicker||'STEP 1';
  renderRail();renderSteps();paintSide();bind();
  paintAuth();bootAuth();
  if(Q.get('login')==='1'&&!TOKEN)setTimeout(authModal,400);
  const sp=Q.get('s');
  cur=-1;go(sp!==null?Math.max(0,Math.min(STEPS.length-1,+sp)):(Number(S.step)||0),true);
  setSave(TOKEN?'ok':'off');
  window.ADULT={go,api,state:()=>S,archive:()=>A};
}catch(e){
  console.error(e);
  document.body.innerHTML='<div style="padding:40px;color:#E9E7E2;font:14px/1.7 sans-serif"><b>页面加载出错</b><pre>'+esc(e.stack||e.message)+'</pre></div>';
}
})();
