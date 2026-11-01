<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow,archive">
<title>SIT 创新专业大师版 · 发小明</title>
<meta name="theme-color" content="#080B11">
<link rel="preconnect" href="https://fonts.loli.net" crossorigin>
<link href="https://fonts.loli.net/css2?family=Noto+Serif+SC:wght@600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#080B11;--bg2:#0B1018;--panel:#111722;--ink:#E9E7E2;--dim:#8D97AA;--faint:#5A6679;
  --line:#1E2634;--line2:#2A3547;--gold:#C9A227;--gold2:#E6C766;--ok:#4E9F6E;--warn:#D89A3C;
  --serif:"Noto Serif SC","Songti SC",serif;
  --sans:"Noto Sans SC","PingFang SC","Hiragino Sans GB",sans-serif;
  --mono:ui-monospace,SFMono-Regular,"SF Mono",Menlo,monospace;
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font-family:var(--sans);font-size:14px;line-height:1.65;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
button{font-family:inherit;color:inherit;border:0;background:none;cursor:pointer}
::selection{background:rgba(201,162,39,.3)}
.wrap{width:min(1180px,calc(100% - 48px));margin:0 auto}
/* nav */
.nav{position:fixed;top:0;left:0;right:0;height:60px;z-index:50;display:flex;align-items:center;
  background:rgba(8,11,17,.9);backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}
.nav .wrap{display:flex;align-items:center;gap:18px}
.brand{display:flex;align-items:center;gap:10px}
.brand svg{width:22px;height:22px}
.brand b{font-family:var(--serif);font-size:14px}
.brand small{display:block;font-family:var(--mono);font-size:8px;letter-spacing:.18em;color:var(--gold)}
.sp{flex:1}
.nlink{font-size:12px;color:var(--dim);padding:7px 12px;border-radius:7px;transition:.2s}
.nlink:hover{color:var(--ink);background:#121A26}
.npill{font-family:var(--mono);font-size:10px;color:var(--gold2);border:1px solid rgba(201,162,39,.3);
  background:rgba(201,162,39,.07);padding:5px 11px;border-radius:99px}
/* hero */
.hero{padding:130px 0 40px;position:relative;overflow:hidden}
.hero::before{content:"";position:absolute;right:-10%;top:-20%;width:620px;height:620px;border-radius:50%;
  background:radial-gradient(circle,rgba(201,162,39,.09),transparent 62%);pointer-events:none}
.kicker{display:flex;align-items:center;gap:10px;font-family:var(--mono);font-size:10px;letter-spacing:.22em;color:var(--gold)}
.kicker::before{content:"";width:26px;height:1px;background:var(--gold)}
h1{font-family:var(--serif);font-size:clamp(30px,4.2vw,54px);line-height:1.2;margin:16px 0 0;font-weight:700;letter-spacing:.01em}
h1 em{font-style:normal;color:var(--gold)}
.hero-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:48px;align-items:start}
.hero p.lead{margin-top:18px;color:var(--dim);font-size:15px;line-height:1.95;max-width:560px}
.hero p.lead b{color:var(--ink)}
.meta{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}
.meta span{font-family:var(--mono);font-size:10.5px;color:var(--dim);border:1px solid var(--line2);padding:5px 10px;border-radius:5px}
.cta{display:flex;gap:10px;margin-top:26px;flex-wrap:wrap;align-items:center}
.btn{display:inline-flex;align-items:center;gap:8px;padding:11px 20px;border-radius:7px;border:1px solid var(--line2);
  font-size:13px;font-weight:500;transition:.2s;background:#141B27}
.btn:hover{border-color:#3A475E;background:#19212F}
.btn.primary{background:var(--gold);border-color:var(--gold);color:#0A0D12;font-weight:600}
.btn.primary:hover{filter:brightness(1.08)}
/* progress panel */
.prog{border:1px solid var(--line);border-radius:12px;background:linear-gradient(165deg,#111926,#0C121B);padding:20px}
.prog-h{display:flex;justify-content:space-between;align-items:baseline;font-family:var(--mono);font-size:9.5px;letter-spacing:.14em;color:var(--faint)}
.prog-n{display:flex;align-items:baseline;gap:6px;margin:10px 0 2px}
.prog-n b{font-family:var(--serif);font-size:46px;line-height:1;color:var(--gold2)}
.prog-n span{font-family:var(--mono);font-size:12px;color:var(--faint)}
.bar{height:5px;border-radius:3px;background:#1A2230;overflow:hidden;margin:12px 0 14px}
.bar i{display:block;height:100%;background:linear-gradient(90deg,#8A6E14,var(--gold));width:0;transition:width .6s}
.prog-row{display:flex;justify-content:space-between;font-size:12px;color:var(--dim);padding:5px 0;border-bottom:1px solid var(--line)}
.prog-row:last-child{border:0}
.prog-row b{font-family:var(--mono);color:var(--ink);font-weight:500}
.prog .hint{font-size:10.5px;color:var(--faint);margin-top:10px;line-height:1.6}
/* sections */
section{padding:52px 0}
.sec-h{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:22px;flex-wrap:wrap}
.sec-h h2{font-family:var(--serif);font-size:clamp(22px,2.6vw,30px)}
.sec-h h2 em{font-style:normal;color:var(--gold)}
.sec-h p{font-size:12px;color:var(--faint);max-width:520px;line-height:1.7}
/* weeks */
.weeks{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.week{border:1px solid var(--line);border-radius:10px;background:#0D131C;padding:12px 14px}
.week-h{display:flex;align-items:center;gap:9px;font-family:var(--mono);font-size:9.5px;letter-spacing:.12em;color:var(--faint);margin-bottom:8px}
.week-h em{font-style:normal;color:var(--gold2)}
.week-h i{flex:1;height:1px;background:var(--line)}
.lesson{display:grid;grid-template-columns:34px 1fr auto;align-items:center;gap:9px;padding:7px 6px;border-radius:6px;
  transition:.16s;font-size:12.5px;color:var(--dim);border-bottom:1px solid rgba(30,38,52,.6)}
.lesson:last-child{border:0}
.lesson:hover{background:#111823;color:var(--ink)}
.lesson .id{font-family:var(--mono);font-size:10px;color:var(--faint)}
.lesson .t{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.lesson .s{font-family:var(--mono);font-size:9px;padding:2px 6px;border-radius:4px;border:1px solid var(--line2);color:var(--faint)}
.lesson.live .s{color:var(--ok);border-color:rgba(78,159,110,.4);background:rgba(78,159,110,.08)}
.lesson.done .s{color:var(--gold2);border-color:rgba(201,162,39,.35);background:rgba(201,162,39,.08)}
.lesson.lock{opacity:.52;pointer-events:none;cursor:default}
/* how */
.how{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.how div{border:1px solid var(--line);border-radius:10px;background:#0D131C;padding:16px}
.how b{display:block;font-family:var(--mono);font-size:9.5px;letter-spacing:.14em;color:var(--gold);margin-bottom:6px}
.how h4{font-family:var(--serif);font-size:16px;margin-bottom:6px}
.how p{font-size:12px;color:var(--dim);line-height:1.8}
footer{padding:36px 0 54px;border-top:1px solid var(--line);margin-top:30px}
footer .wrap{display:flex;justify-content:space-between;gap:18px;flex-wrap:wrap;font-size:10.5px;color:var(--faint);line-height:1.8}
@media(max-width:960px){
  .hero-grid{grid-template-columns:1fr;gap:26px}
  .weeks{grid-template-columns:1fr}
  .how{grid-template-columns:1fr}
}
</style>
</head>
<body>
<nav class="nav"><div class="wrap">
  <a class="brand" href="adult-index.html"><svg viewBox="0 0 32 32" fill="none"><path d="M16 3l2.6 7.9L27 13.5l-6.4 4.7L22.5 26 16 21.7 9.5 26l1.9-7.8L5 13.5l8.4-2.6L16 3z" stroke="#C9A227" stroke-width="1.2" fill="rgba(201,162,39,.08)"/></svg>
    <span><b>SIT 创新专业大师版</b><small>GENESIS · MASTER SERIES</small></span></a>
  <div class="sp"></div>
  <a class="nlink" href="#map">课程地图</a>
  <a class="nlink" href="#how">怎么上课</a>
  <span class="npill">企业内训 · 40 节</span>
  <a class="nlink" href="index.html?scene=map" style="margin-left:4px">返回学院地图</a>
</div></nav>

<header class="hero"><div class="wrap"><div class="hero-grid">
  <div>
    <div class="kicker">SIT SYSTEMATIC INVENTIVE THINKING</div>
    <h1>我们一起，<br>为中国培养<em>从0到1的人才</em></h1>
    <p class="lead">SIT 的五个工具没有变，变的是它们跑起来的方式：<b>每一节都在你自己的业务对象上跑一遍</b>，AI 负责违反常识，你负责发现价值；十周之后，企业手里是一叠能评审的方案，不是一摞笔记。</p>
    <div class="meta"><span>40 节 · 10 周</span><span>45′ 混合单元</span><span>直播 + 自学 + 班级互评</span><span>企业内训</span><span>SIT 官方授权</span></div>
    <div class="cta">
      <a class="btn primary" id="startBtn" href="adult-lesson.html?l=A01">开始第 1 节 →</a>
      <a class="btn" href="#map">看完整课程地图</a>
      <button class="btn" id="loginBtn">用邀请码加入班级</button>
      <a class="btn" href="adult-cert.html">我的证书</a>
      <a class="btn" href="adult-teacher.html">讲师中控</a>
      <a class="btn" href="adult-admin.html">管理后台</a>
    </div>
  </div>
  <div class="prog">
    <div class="prog-h"><span>我的进度</span><span id="progPct">0%</span></div>
    <div class="prog-n"><b id="progNum">0</b><span>/ 40 节</span></div>
    <div class="bar"><i id="progBar"></i></div>
    <div class="prog-row"><span>已提交</span><b id="statSubmitted">0</b></div>
    <div class="prog-row"><span>已互评</span><b id="statReviews">0</b></div>
    <div class="prog-row"><span>当前班级</span><b id="statCohort">未加入</b></div>
    <div class="hint" id="progHint">本机模式：进度存在这台电脑。加入班级后才会提交与互评。</div>
  </div>
</div></div></header>

<section id="map"><div class="wrap">
  <div class="sec-h"><h2>课程地图 · <em>十个星期</em></h2>
    <p>前三周建立识别力，中间五周学会五个工具，最后两周把工具放进产品、营销、流程与组织。</p></div>
  <div class="weeks" id="weeks"></div>
</div></section>

<section id="how"><div class="wrap">
  <div class="sec-h"><h2>一节 <em>45 分钟</em> 怎么过</h2><p>直播不讲新知识——学员已经学过；直播只解剖三个真实产出。</p></div>
  <div class="how">
    <div><b>25′ · 自学工作台</b><h4>在自己的对象上跑一遍</h4><p>先猜、再看概念、然后动手。每一步都有产出，AI 追问不给答案。</p></div>
    <div><b>15′ · 直播解剖</b><h4>讲师只讲三个案例</h4><p>全班产出实时上墙，讲师挑最典型的三张：一张做得对、一张差点意思、一张有惊喜。</p></div>
    <div><b>5′ · 提交与互评</b><h4>匿名评三份</h4><p>按"有用 / 可行 / 证据"三个维度打分，每人至少评三份，评分不显示给被评人。</p></div>
  </div>
</div></section>

<footer><div class="wrap">
  <span>发小明 Genesis 创新学院 · 世界创新港<br>SIT 系统创新思维官方授权 · 案例与工具版权归 SIT 所有</span>
  <span>企业版咨询：课程管理员后台 · 版本 v0.1（P0 样课）</span>
</div></footer>

<script src="adult-data-index.js?v=1"></script>
<script src="adult-data-live.js?v=1"></script>
<script>
(function(){
'use strict';
const $=s=>document.querySelector(s);
const KEY='fxm_adult_v1',LIVE=window.FXM_ADULT_LIVE||['A01','A11','A31'];
let A={lessons:{},profile:{}};
try{A=Object.assign(A,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch(e){}
A.lessons=A.lessons||{};
const done=Object.keys(A.lessons).filter(k=>A.lessons[k]&&A.lessons[k].submitted).length;
const started=Object.keys(A.lessons).filter(k=>A.lessons[k]&&(A.lessons[k].step||0)>0).length;
$('#progNum').textContent=done;
$('#progPct').textContent=Math.round(adult-done-index.html40*100)+'%';
$('#progBar').style.width=(adult-done-index.html40*100)+'%';
$('#statSubmitted').textContent=done;
$('#statReviews').textContent=(A.profile&&A.profile.reviews)||0;
$('#statCohort').textContent=(A.profile&&A.profile.cohort)||'未加入';

// 下一节：第一个未完成且已上线
let next=LIVE.find(id=>!(A.lessons[id]&&A.lessons[id].submitted))||'A01';
$('#startBtn').href='adult-lesson.html?l='+next;
$('#startBtn').textContent=(done?'继续第 '+(next.slice(1))+' 节':'开始第 1 节')+' →';

// 课程地图
const byWeek={};
(FXM_ADULT_INDEX||[]).forEach(it=>{(byWeek[it.week]=byWeek[it.week]||[]).push(it);});
$('#weeks').innerHTML=Object.keys(byWeek).sort((a,b)=>a-b).map(w=>{
  const items=byWeek[w];
  const label=['认知地基','认知地基','减法','乘法','除法','一专多能','属性关联','产品与 AVM','流程与组织','毕业项目'][w-1]||'';
  return '<div class="week"><div class="week-h"><em>WEEK '+w+'</em><i></i><s style="text-decoration:none">'+label+'</s></div>'+
    items.map(it=>{
      const st=A.lessons[it.id]||{};
      const live=LIVE.indexOf(it.id)>=0;
      const cls=live?'live':'lock', stt=st.submitted?'done':cls;
      const tag=st.submitted?'已完成':(live?'可学':'P1 上线');
      const href=live?'adult-lesson.html?l='+it.id:'#';
      return '<a class="lesson '+stt+'" href="'+href+'"><span class="id">'+it.id+'</span><span class="t">'+it.title+'</span><span class="s">'+tag+'</span></a>';
    }).join('')+'</div>';
}).join('');

$('#loginBtn').onclick=()=>{location.href='adult-lesson.html?l='+(next)+'&login=1';};
if(started&&!done)$('#progHint').textContent='有 '+(40-done)+' 节还没交产出。先继续，别从头再来。';

// 已登录：拉一次个人看板，补上互评数与班级
(async function(){
  const t=localStorage.getItem('fxm_adult_token');if(!t)return;
  try{
    const r=await fetch('/api/adult/me/dashboard',{headers:{Authorization:'Bearer '+t}});
    if(!r.ok)return;const d=await r.json();
    if(typeof d.reviews_done==='number')$('#statReviews').textContent=d.reviews_done;
    if(d.cohort&&d.cohort.name)$('#statCohort').textContent=d.cohort.name;
  }catch(e){}
})();
})();
</script>
<script src="adult-notices.js?v=1"></script>
</body>
</html>
