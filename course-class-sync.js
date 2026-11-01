/* 世界创新港 · 学生端：交给老师 + 讲师通知
   无账号体系：首次点「交给老师」时问一次姓名，存本机。
   实验室成果（fxm_course_lab_v1）有变化时自动同步，老师在中控台能看到。 */
(function(){
'use strict';
if(window.__fxmClassSync)return; window.__fxmClassSync=true;
var API='';
var NAME_KEY='fxm_course_name';
var name='';
try{ name=localStorage.getItem(NAME_KEY)||''; }catch(e){}
var lastHash='';
var chapter=(window.FXM_GATE&&window.FXM_GATE.chapter)?String(window.FXM_GATE.chapter):'01';

var css=document.createElement('style');
css.textContent=`
#csBar{position:fixed;right:16px;top:70px;z-index:70;display:flex;gap:8px;align-items:center}
@media(max-width:760px){#csBar{top:62px;right:10px}}
#csBar button{border:1px solid rgba(245,196,81,.35);background:rgba(13,20,36,.92);color:#F5F1E6;
  border-radius:12px;padding:9px 14px;font-size:12px;font-weight:600;cursor:pointer;backdrop-filter:blur(8px);
  box-shadow:0 10px 30px rgba(0,0,0,.45);transition:.18s}
#csBar button:hover{border-color:#F5C451;color:#FFE3A6}
#csBell{position:relative;padding:9px 12px!important}
#csBell .dot{position:absolute;top:-5px;right:-5px;min-width:17px;height:17px;border-radius:9px;background:#FF7A6B;
  color:#1a1305;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;padding:0 4px}
#csPanel{position:fixed;right:16px;top:124px;z-index:71;width:min(380px,92vw);max-height:min(60vh,560px);
  background:#0d1424;border:1px solid rgba(245,196,81,.28);border-radius:16px;display:none;flex-direction:column;overflow:hidden;
  box-shadow:0 24px 70px rgba(0,0,0,.6)}
#csPanel.on{display:flex}
@media(max-width:760px){#csPanel{top:112px;right:10px;max-height:min(56vh,520px)}}
#csHead{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-bottom:1px solid rgba(255,255,255,.08)}
#csHead b{font-size:12px;letter-spacing:.08em;color:#F5F1E6}
#csHead button{color:#6E7890;font-size:11px}
#csList{overflow:auto;padding:8px}
.cs{border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:9px 11px;margin:6px;background:rgba(255,255,255,.02)}
.cs.unread{border-color:rgba(245,196,81,.4);background:rgba(245,196,81,.05)}
.cs h5{margin:0 0 3px;font-size:12px;color:#F5F1E6}
.cs .m{font-size:10px;color:#6E7890;margin-bottom:5px}
.cs p{margin:0;font-size:11.5px;line-height:1.75;color:#9AA3BD;white-space:pre-wrap}
.cs img{max-width:100%;border-radius:8px;margin-top:7px;display:block;cursor:zoom-in}
#csModal{position:fixed;inset:0;background:rgba(4,6,12,.78);z-index:90;display:none;align-items:center;justify-content:center;padding:24px}
#csModal.on{display:flex}
#csBox{width:min(420px,100%);background:linear-gradient(160deg,#111a2d,#0a1020);border:1px solid rgba(245,196,81,.3);
  border-radius:18px;padding:22px 22px 18px;box-shadow:0 30px 90px rgba(0,0,0,.6)}
#csBox h3{margin:0 0 6px;font-family:"Noto Serif SC",serif;font-size:19px;color:#F5F1E6}
#csBox p{margin:0 0 14px;font-size:11.5px;color:#9AA3BD;line-height:1.8}
#csBox input{width:100%;padding:10px 12px;border-radius:9px;border:1px solid rgba(255,255,255,.12);
  background:rgba(255,255,255,.04);color:#F5F1E6;font-size:13px;outline:none;margin-bottom:12px}
#csBox input:focus{border-color:rgba(245,196,81,.6)}
#csBox .row{display:flex;gap:8px;justify-content:flex-end}
#csBox button{padding:9px 16px;border-radius:9px;border:1px solid rgba(255,255,255,.14);background:transparent;color:#F5F1E6;font-size:12px;cursor:pointer}
#csBox button.primary{background:linear-gradient(115deg,#FFE3A6,#F5C451);color:#211805;border:0;font-weight:700}
#csToast{position:fixed;left:50%;bottom:78px;transform:translateX(-50%);background:#141c2e;border:1px solid rgba(255,255,255,.12);
  color:#F5F1E6;padding:9px 16px;border-radius:10px;font-size:12px;opacity:0;transition:.25s;z-index:95;pointer-events:none}
#csToast.on{opacity:1}
#csZoom{position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:96;display:none;align-items:center;justify-content:center;padding:24px}
#csZoom.on{display:flex}
#csZoom img{max-width:92vw;max-height:88vh;border-radius:10px}
`;
document.head.appendChild(css);

var bar=document.createElement('div');
bar.id='csBar';
bar.innerHTML='<button id="csSubmit">交给老师</button><button id="csBell">🔔<span class="dot" style="display:none">0</span></button>';
var panel=document.createElement('div');
panel.id='csPanel';
panel.innerHTML='<div id="csHead"><b>讲师通知</b><button id="csClose">收起</button></div><div id="csList"></div>';
var modal=document.createElement('div');
modal.id='csModal';
modal.innerHTML='<div id="csBox"><h3>先留个名字</h3><p>老师要在中控台看到你的作品，需要一个称呼。只保存在这台设备上。</p><input id="csName" maxlength="24" placeholder="例如：三班 李明"><div class="row"><button id="csCancel">取消</button><button class="primary" id="csOk">确定</button></div></div>';
var toast=document.createElement('div');toast.id='csToast';
var zoom=document.createElement('div');zoom.id='csZoom';zoom.innerHTML='<img alt="">';
document.body.appendChild(bar);document.body.appendChild(panel);document.body.appendChild(modal);document.body.appendChild(toast);document.body.appendChild(zoom);

function esc(s){return String(s==null?'':s).replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});}
function say(t){toast.textContent=t;toast.classList.add('on');setTimeout(function(){toast.classList.remove('on');},1900);}
function lab(){try{return JSON.parse(localStorage.getItem('fxm_course_lab_v1')||'[]')||[];}catch(e){return [];}}
function hash(list){try{return JSON.stringify(list.map(function(x){return [x.product,x.problem,x.ts];}));}catch(e){return '';}}

function askName(){
  return new Promise(function(res){
    modal.classList.add('on');
    var inp=modal.querySelector('#csName');inp.value=name||'';setTimeout(function(){inp.focus();},60);
    function done(v){modal.classList.remove('on');res(v);}
    modal.querySelector('#csOk').onclick=function(){
      var v=inp.value.trim().slice(0,24);
      if(!v){say('写个名字');return;}
      name=v;try{localStorage.setItem(NAME_KEY,name);}catch(e){}
      done(name);
    };
    modal.querySelector('#csCancel').onclick=function(){done('');};
    inp.onkeydown=function(e){if(e.key==='Enter')modal.querySelector('#csOk').click();};
  });
}

async function submitWork(silent){
  if(!name){name=await askName();if(!name)return;}
  var list=lab();
  if(!list.length){if(!silent)say('先去实验室存一件作品');return;}
  var h=hash(list);
  if(silent&&h===lastHash)return;
  try{
    var r=await fetch('/api/course/work',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({name:name,chapter:chapter,entries:list})});
    var d=await r.json();
    if(!r.ok)throw new Error(d.error||'提交失败');
    lastHash=h;
    if(!silent)say('已交给老师 · '+list.length+' 件');
  }catch(e){ if(!silent)say(e.message||'提交失败'); }
}

async function loadNotices(){
  if(!name)return;
  try{
    var r=await fetch('/api/course/notice?name='+encodeURIComponent(name));
    var d=await r.json();
    if(!r.ok)return;
    var dot=bar.querySelector('#csBell .dot');
    if(d.unread>0){dot.style.display='flex';dot.textContent=d.unread>9?'9+':d.unread;}else dot.style.display='none';
    var list=panel.querySelector('#csList');
    if(!d.notices.length){list.innerHTML='<div style="padding:22px;text-align:center;color:#6E7890;font-size:11.5px">还没有通知</div>';return;}
    list.innerHTML=d.notices.map(function(n){
      var imgs=(n.images||[]).map(function(src){return '<img src="'+src+'" data-zoom="'+encodeURIComponent(src)+'">';}).join('');
      return '<div class="cs'+(n.read?'':' unread')+'"><h5>'+esc(n.title||'通知')+'</h5>'+
        '<div class="m">'+(n.target?('单独发给你的 · '):'全班 · ')+new Date(n.at).toLocaleString('zh-CN',{month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'})+'</div>'+
        (n.body?'<p>'+esc(n.body)+'</p>':'')+imgs+'</div>';
    }).join('');
    list.querySelectorAll('[data-zoom]').forEach(function(img){
      img.onclick=function(){zoom.querySelector('img').src=decodeURIComponent(img.dataset.zoom);zoom.classList.add('on');};
    });
  }catch(e){}
}
async function markRead(){
  if(!name)return;
  try{
    var r=await fetch('/api/course/notice?name='+encodeURIComponent(name));
    var d=await r.json();
    for(var i=0;i<(d.notices||[]).length;i++){
      var n=d.notices[i];
      if(!n.read)await fetch('/api/course/notice-read',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:n.id,name:name})});
    }
    loadNotices();
  }catch(e){}
}

bar.querySelector('#csSubmit').onclick=function(){submitWork(false);};
bar.querySelector('#csBell').onclick=async function(){
  if(!name){name=await askName();if(!name)return;}
  panel.classList.toggle('on');
  if(panel.classList.contains('on')){await loadNotices();markRead();}
};
panel.querySelector('#csClose').onclick=function(){panel.classList.remove('on');};
zoom.onclick=function(){zoom.classList.remove('on');};

/* 实验室有变化就静默同步（20 秒查一次） */
if(name){
  submitWork(true);
  setInterval(function(){ submitWork(true); }, 20000);
  loadNotices();
  setInterval(loadNotices, 60000);
}
})();
