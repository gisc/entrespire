/* 学员通知浮层：挂在课程地图与课程页上，登录后才出现。 */
(function(){
'use strict';
var API=(location.protocol==='file:')?'http://127.0.0.1:8898/api/adult':'/api/adult';
var TOKEN=localStorage.getItem('fxm_adult_token')||'';
if(!TOKEN)return;

var css=document.createElement('style');
css.textContent=`
#ntBell{position:fixed;right:22px;bottom:22px;z-index:80;width:46px;height:46px;border-radius:50%;
  background:#121A26;border:1px solid #2A3547;color:#E9E7E2;display:flex;align-items:center;justify-content:center;
  cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.45);transition:.18s;font-size:18px}
#ntBell:hover{border-color:#C9A227;color:#E3C558}
#ntBell .dot{position:absolute;top:2px;right:2px;min-width:17px;height:17px;border-radius:9px;background:#C9A227;
  color:#0A0D12;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;padding:0 4px}
#ntPanel{position:fixed;right:22px;bottom:78px;z-index:81;width:min(380px,92vw);max-height:min(70vh,620px);
  background:#0D131C;border:1px solid #243044;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.6);
  display:none;flex-direction:column;overflow:hidden}
#ntPanel.on{display:flex}
#ntHead{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid #1B2432}
#ntHead b{font-size:12.5px;letter-spacing:.05em;color:#E9E7E2}
#ntHead button{color:#6B7688;font-size:12px}
#ntList{overflow:auto;padding:6px}
.nt{border:1px solid #1B2432;border-radius:8px;padding:9px 11px;margin:6px;background:#0F151F}
.nt.unread{border-color:rgba(201,162,39,.45);background:rgba(201,162,39,.05)}
.nt h5{margin:0 0 4px;font-size:12px;color:#E9E7E2;display:flex;gap:6px;align-items:center}
.nt .meta{font-size:10px;color:#6B7688;margin-bottom:5px}
.nt p{margin:0;font-size:11.5px;line-height:1.7;color:#A7B0C0;white-space:pre-wrap}
.nt img{max-width:100%;border-radius:6px;margin-top:7px;display:block;cursor:zoom-in}
.nt .card{margin-top:7px;border:1px solid #243044;border-radius:6px;padding:6px 8px;background:#0B1018}
.nt .card b{font-size:10px;color:#6B7688;font-weight:500;margin-right:5px}
.nt .card div{font-size:11px;color:#A7B0C0;line-height:1.6}
#ntEmpty{padding:26px 16px;text-align:center;color:#6B7688;font-size:12px}
#ntZoom{position:fixed;inset:0;background:rgba(4,6,10,.85);z-index:90;display:none;align-items:center;justify-content:center;padding:30px}
#ntZoom.on{display:flex}
#ntZoom img{max-width:92vw;max-height:88vh;border-radius:8px}
#ntToast{position:fixed;left:50%;bottom:26px;transform:translateX(-50%);background:#141C28;border:1px solid #243044;
  color:#E9E7E2;padding:8px 14px;border-radius:8px;font-size:12px;opacity:0;transition:.25s;z-index:95;pointer-events:none}
#ntToast.on{opacity:1}
`;
document.head.appendChild(css);

var bell=document.createElement('button');
bell.id='ntBell';bell.title='讲师通知';bell.innerHTML='🔔<span class="dot" style="display:none">0</span>';
var panel=document.createElement('div');
panel.id='ntPanel';
panel.innerHTML='<div id="ntHead"><b>讲师通知</b><button id="ntClose">收起</button></div><div id="ntList"></div>';
var zoom=document.createElement('div');
zoom.id='ntZoom';zoom.innerHTML='<img alt="">';
var toast=document.createElement('div');
toast.id='ntToast';
document.body.appendChild(bell);document.body.appendChild(panel);document.body.appendChild(zoom);document.body.appendChild(toast);

function esc(s){return String(s==null?'':s).replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});}
function say(t){toast.textContent=t;toast.classList.add('on');setTimeout(function(){toast.classList.remove('on');},1800);}
async function call(path,opt){
  opt=opt||{};
  var res=await fetch(API+path,{method:opt.method||'GET',headers:Object.assign({'Content-Type':'application/json'},{Authorization:'Bearer '+TOKEN}),body:opt.body?JSON.stringify(opt.body):undefined});
  if(res.status===401)return null;
  if(!res.ok)return null;
  return res.json();
}
async function refresh(){
  var d=await call('/notices');
  if(!d)return;
  var dot=bell.querySelector('.dot');
  if(d.unread>0){dot.style.display='flex';dot.textContent=d.unread>9?'9+':d.unread;}
  else dot.style.display='none';
  var list=panel.querySelector('#ntList');
  if(!d.notices.length){list.innerHTML='<div id="ntEmpty">还没有通知。讲师发消息后，这里会出现。</div>';return;}
  list.innerHTML=d.notices.map(function(n){
    var imgs=(n.images||[]).map(function(src){return '<img src="'+src+'" data-zoom="'+encodeURIComponent(src)+'" alt="">';}).join('');
    var card='';
    if(n.card&&n.card.rows){
      card='<div class="card">'+n.card.rows.slice(0,6).map(function(r){return '<div><b>'+esc(r[0])+'</b>'+esc(r[1])+'</div>';}).join('')+'</div>';
    }
    return '<div class="nt'+(n.read?'':' unread')+'">'+
      '<h5>'+esc(n.title||'通知')+'</h5>'+
      '<div class="meta">'+esc(n.sender||'讲师')+' · '+esc((n.created_at||'').replace('T',' ').slice(5,16))+'</div>'+
      (n.body?'<p>'+esc(n.body)+'</p>':'')+imgs+card+'</div>';
  }).join('');
  list.querySelectorAll('[data-zoom]').forEach(function(img){
    img.onclick=function(){zoom.querySelector('img').src=decodeURIComponent(img.dataset.zoom);zoom.classList.add('on');};
  });
}
async function markAll(){
  var d=await call('/notices');
  if(!d)return;
  for(var i=0;i<d.notices.length;i++){
    if(!d.notices[i].read){await call('/notices/'+d.notices[i].id+'/read',{method:'POST'});}
  }
  refresh();
}
bell.onclick=async function(){
  panel.classList.toggle('on');
  if(panel.classList.contains('on')){await refresh();await markAll();}
};
panel.querySelector('#ntClose').onclick=function(){panel.classList.remove('on');};
zoom.onclick=function(){zoom.classList.remove('on');};
document.addEventListener('keydown',function(e){if(e.key==='Escape'){zoom.classList.remove('on');panel.classList.remove('on');}});
refresh();
setInterval(refresh,60000);
})();
