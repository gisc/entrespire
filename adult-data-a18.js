/* A18 · 除法：四个案例还原 */
(function(){
'use strict';
const TO3=['课前','试穿','挂号'];
const CASES=[
 {id:'hm',n:'H&M 试衣间结账',
  timeline:['挑衣服','排队进试衣间','试穿','脱下来','去收银台排队','付款','离店'],
  moved:'付款',to:'试穿',tos:TO3,who:'试衣间里的店员（顺便收钱）',
  why:'付款从"离店前"挪到了"试穿后"。挪完之后，收银台那条队没了，但"防盗扣谁拆"成了新的责任真空。'},
 {id:'flip',n:'翻转课堂',
  timeline:['课上听讲','回家做作业','不会的问老师','下次课讲新内容'],
  moved:'课上听讲',to:'课前',tos:TO3,who:'学生自己（看视频）+ 平台',
  why:'听讲从"课上"挪到了"课前"。课上时间被腾出来做练习和答疑；新的真空是"课前不看视频的人"。'},
 {id:'lab',n:'医院检验前置',
  timeline:['挂号','排队等医生','医生开单','去检验科排队','抽血','等报告','再找医生'],
  moved:'抽血',to:'挂号',tos:TO3,who:'分诊台护士（按套餐先抽）',
  why:'抽血从"看完医生"挪到了"挂号时"。病人少跑一趟；新的真空是"医生没开单就先抽，谁负责解释"。'},
 {id:'umb',n:'新型雨伞：伞骨外置',
  timeline:['伞面','伞骨','中棒','开关','伞柄','伞带'],
  moved:'伞骨',to:'伞面外',tos:['伞面外','伞面里','伞柄里'],who:'伞面自己（收伞时湿面朝里）',
  why:'这是产品层的除法：伞骨从伞面里面挪到外面，零件一个没少，只换了空间位置。收伞时湿的伞面被包在里面，水滴不到身上。'}
];

const L={
id:'A18',week:5,seq:18,title:'除法：四个案例还原',
kicker:'WEEK 5 · 除法',tool:'div',toolName:'除法',minutes:45,
steps:[
/* ---------- 1 先猜 ---------- */
{id:'hook',name:'先猜',short:'先猜',kicker:'STEP 1 · 先猜再揭晓',
html:`
<div class="step-h"><h1>H&M 把<em>哪一步</em>搬进了试衣间</h1>
<p>不用拿着衣服去收银台排队了。但店里没有删掉任何一步——只是挪了一个位置。</p></div>
<div class="grid2" style="align-items:center;margin-bottom:14px">
  <figure style="margin:0;border:1px solid var(--line2);border-radius:10px;overflow:hidden;background:#0F151F">
    <img src="assets-cases-a18-hm.jpg" alt="H&M" style="width:100%;display:block;max-height:280px;object-fit:cover">
    <figcaption style="padding:7px 10px;font-size:10px;color:var(--faint)">试衣间里的标签与结账　图：SIT 官方课程材料（已授权）</figcaption>
  </figure>
  <div class="panel"><div class="panel-h"><h4>搬的是什么</h4><span>单选</span></div>
    <div class="opts">
      <button class="opt" data-h="a"><span class="k">A</span><span><b>把试衣间搬到了收银台旁边</b><span>空间靠近</span></span></button>
      <button class="opt" data-h="b"><span class="k">B</span><span><b>把付款这一步搬进了试衣间</b><span>步骤换位置</span></span></button>
      <button class="opt" data-h="c"><span class="k">C</span><span><b>把排队取消了</b><span>减少等待</span></span></button>
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
        '<p class="small" style="font-size:12px">'+(ok?'对。<b>付款被挪到了"试穿之后、脱下来之前"</b>。试衣间里就能结账，人不用穿着衣服再排一次队。':'更准确是 B：<b>付款这一步被挪进了试衣间</b>。空间没变、步骤没删，只是位置换了。')+'</p></div>';
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
<div class="step-h"><h1>还原一个除法案例，<em>只问三句</em></h1></div>
<div class="grid3" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">① 拆时间轴</div><p class="small" style="margin-top:5px">把原来的步骤按顺序写出来，别漏。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">② 哪一步被挪了</div><p class="small" style="margin-top:5px">只挪了一步，其余都在原地。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">③ 谁接住了</div><p class="small" style="margin-top:5px">挪过去之后，这一步在新位置谁做。</p></div>
</div>
<div class="panel" style="margin-bottom:12px"><div class="panel-h"><h4>三种最常见的挪法</h4><span>认出来就够了</span></div>
  <div class="stack">
    <div><div class="mono" style="font-size:9.5px;color:var(--acc)">提前</div><p class="small" style="margin-top:3px">把决策/准备挪到前面：点单提前、检验前置、备课前置。</p></div>
    <div><div class="mono" style="font-size:9.5px;color:var(--acc)">合并到现场</div><p class="small" style="margin-top:3px">把收尾动作挪进主现场：试衣间结账、床边结算、现场开卡。</p></div>
    <div><div class="mono" style="font-size:9.5px;color:var(--acc)">拆成两段</div><p class="small" style="margin-top:3px">把一条长流程拆到两个时间：培训拆成每周 10 分钟。</p></div>
  </div></div>`,
init(){},
hint(){return '';},
gate(){return true;}},

/* ---------- 3 还原台 ---------- */
{id:'bench',name:'还原台',short:'还原',kicker:'STEP 3 · 还原台',
html:`
<div class="step-h"><h1>四个案例，<em>各找出被挪的那一步</em></h1>
<p>点时间轴上你认为被挪走的那一步，再选它挪到了哪。四题都答对才解锁。</p></div>
<div class="bench">
  <div class="bench-h"><b>DIVIDE · 案例还原</b><span class="st" id="bSt">0 / 4</span></div>
  <div class="bench-b" style="overflow:auto" id="bBody"></div>
  <div class="bench-f"><span class="small">点错了会告诉你为什么不是它。</span><div style="flex:1"></div><button class="btn sm ghost" id="bReset">重来</button></div>
</div>`,
init(sec,api){
  const S=api.S;S.answers.restore=S.answers.restore||{};
  const body=sec.querySelector('#bBody'),st=sec.querySelector('#bSt');
  function paint(){
    body.innerHTML=CASES.map(c=>{
      const v=S.answers.restore[c.id]||{};
      const done=v.ok===true;
      return '<div class="a18-case'+(done?' done':'')+'">'+
        '<div class="a18-h"><b>'+c.n+'</b>'+(done?'<span class="a18-ok">✓ 还原正确</span>':'<span class="a18-todo">点一步</span>')+'</div>'+
        '<div class="a18-line">'+c.timeline.map(s=>{
          const sel=v.pick===s;
          return '<button class="a18-s'+(sel?' sel':'')+'" data-c="'+c.id+'" data-s="'+s+'">'+s+'</button>';
        }).join('<i class="a18-ar">→</i>')+'</div>'+
        (v.pick?'<div class="a18-to"><span>它挪到了哪？</span>'+c.tos.map(t=>
            '<button class="a18-tb'+(v.to===t?' on':'')+'" data-c="'+c.id+'" data-t="'+t+'">'+t+'</button>').join('')+'</div>':'')+
        (v.pick&&v.to?'<div class="a18-fb '+(done?'good':'bad')+'">'+(done?'✓ ':'△ ')+
          (done?c.why:'被挪的是「'+c.moved+'」。'+c.why)+'</div>':'')+
        (done?'<div class="a18-who"><b>谁接住：</b>'+c.who+'</div>':'')+
        '</div>';
    }).join('');
    body.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{
      const id=b.dataset.c;S.answers.restore[id]={pick:b.dataset.s,to:'',ok:false};api.save();paint();api.refresh();
    });
    body.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{
      const id=b.dataset.c,c=CASES.find(x=>x.id===id);const v=S.answers.restore[id]||{};
      v.to=b.dataset.t;v.ok=(v.pick===c.moved&&v.to===c.to);S.answers.restore[id]=v;api.save();paint();api.refresh();
    });
    st.textContent=Object.values(S.answers.restore).filter(v=>v.ok).length+' / '+CASES.length;
  }
  sec.querySelector('#bReset').onclick=()=>{S.answers.restore={};api.save();paint();api.refresh();};
  paint();
},
hint(S){const n=Object.values(S.answers.restore||{}).filter(v=>v.ok).length;return n>=CASES.length?'':'还差 '+(CASES.length-n)+' 个案例';},
gate(S){return Object.values(S.answers.restore||{}).filter(v=>v.ok).length>=CASES.length;}},

/* ---------- 4 在你的事上 ---------- */
{id:'mine',name:'在你的事上',short:'在你的事',kicker:'STEP 4 · 在你的事上',
html:`
<div class="step-h"><h1>你的流程里，<em>最想挪哪一步</em></h1></div>
<div class="grid2">
  <div class="panel"><div class="panel-h"><h4>① 流程与步骤</h4><span>≥10 字</span></div>
    <div class="field"><textarea id="tl" maxlength="60" placeholder="用 → 写出步骤，例如：预约 → 到店 → 填表 → 面诊 → 缴费"></textarea></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">② 想挪哪一步</h4><span>≥2 字</span></div>
    <div class="field"><input id="step" maxlength="20" placeholder="例如：填表"></div></div>
  <div class="panel"><div class="panel-h"><h4>③ 挪到哪、谁接住</h4><span>≥15 字</span></div>
    <div class="field"><textarea id="move" maxlength="60" placeholder="例如：挪到预约时，由前台在电话里问完"></textarea></div>
    <div class="panel-h" style="margin:12px 0 6px"><h4 style="font-size:9.5px">④ 新的责任真空</h4><span>≥10 字</span></div>
    <div class="field"><textarea id="void" maxlength="60" placeholder="例如：电话里问漏了，到店还得补"></textarea></div>
  </div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const f={tl:sec.querySelector('#tl'),step:sec.querySelector('#step'),move:sec.querySelector('#move'),void:sec.querySelector('#void')};
  Object.keys(f).forEach(k=>{f[k].value=a[k]||'';f[k].addEventListener('input',()=>{a[k]=f[k].value;api.save();api.refresh();});});
},
hint(S){const a=S.answers;if((a.tl||'').length<10)return '先写流程';if((a.step||'').length<2)return '写想挪哪一步';if((a.move||'').length<15)return '没写挪到哪、谁接';if((a.void||'').length<10)return '没写责任真空';return '';},
gate(S){const a=S.answers;return !!((a.tl||'').length>=10&&(a.step||'').length>=2&&(a.move||'').length>=15&&(a.void||'').length>=10);}},

/* ---------- 5 提交 ---------- */
{id:'submit',name:'提交',short:'提交',kicker:'STEP 5 · 产出',
html:`
<div class="step-h"><h1>交一张<em>还原卡</em></h1></div>
<div class="grid2" style="align-items:start">
  <div id="cardSlot"></div>
  <div class="panel"><div class="panel-h"><h4>提交</h4><span id="subSt">未提交</span></div>
    <p class="small">提交后会先跑 AI 评审，再进班级互评。</p>
    <div class="row" style="margin-top:10px"><button class="btn primary" id="subBtn">提交</button><button class="btn" id="export2">导出 PNG</button></div></div>
</div>`,
init(sec,api){
  const S=api.S,a=S.answers;
  const slot=sec.querySelector('#cardSlot'),btn=sec.querySelector('#subBtn'),st=sec.querySelector('#subSt');
  function paint(){
    slot.innerHTML='<div class="outcard"><div class="oh"><span>DELIVERABLE · A18</span><span>还原卡</span></div>'+
      '<h5>'+api.esc(a.step?'挪动「'+a.step+'」':'我的重排')+'</h5><div class="kv">'+
      [['流程',a.tl],['挪哪步',a.step],['挪到哪',a.move],['责任真空',a.void]]
      .map(r=>'<div><b>'+r[0]+'</b><span class="'+(r[1]?'fill':'')+'">'+api.esc(r[1]||'—')+'</span></div>').join('')+'</div></div>';
    st.textContent=S.submitted?'已提交':'未提交';btn.disabled=!!S.submitted;btn.textContent=S.submitted?'已提交':'提交';
  }
  btn.onclick=async()=>{await api.submit();paint();};
  sec.querySelector('#export2').onclick=()=>api.exportCard();
  paint();
},
hint(){return '';},gate(){return true;}},

/* ---------- 6 收束 ---------- */
{id:'wrap',name:'收束',short:'收束',kicker:'STEP 6 · 收束',
html:`
<div class="step-h"><h1>四个案例，<em>一个共同点</em></h1></div>
<div class="grid2" style="margin-bottom:12px">
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">H&M</div><p class="small" style="margin-top:5px">付款挪到试穿后——把"收尾"塞进主现场。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">翻转课堂</div><p class="small" style="margin-top:5px">听讲挪到课前——把"输入"提前，课上做输出。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">检验前置</div><p class="small" style="margin-top:5px">抽血挪到挂号——把"等待"从两趟变一趟。</p></div>
  <div class="panel"><div class="mono" style="font-size:9.5px;color:var(--acc)">伞骨外置</div><p class="small" style="margin-top:5px">伞骨挪到伞面外——从"挪步骤"换成"挪零件"，零件一个没少。</p></div>
</div>
<div class="panel"><div class="panel-h"><h4>下一节</h4><span>A19</span></div>
<p class="small">A19 · 除法：流程重排实战。拿你自己的流程，完整跑一次"拆开—重排—补真空"。</p>
<div class="row" style="margin-top:10px"><a class="btn primary" href="index.html">回到课程地图</a><button class="btn" id="againBtn">重看这一节</button></div></div>`,
init(sec,api){sec.querySelector('#againBtn').onclick=()=>api.go(0);},
hint(){return '';},gate(){return true;}}
],

side:{asks:[
 '被挪走的那一步，原来在等什么？',
 '挪过去之后，是谁多干了一件事？',
 '新的真空如果没人补，会在哪一刻爆出来？',
 '这一步提前，需要谁提前准备？',
 '四个案例里，哪个最像你自己的流程或产品？'
]},

card(S){
  const a=S.answers||{};
  return {title:'A18 · 还原卡',rows:[
    ['流程',a.tl||'—'],['挪哪步',a.step||'—'],['挪到哪',a.move||'—'],['责任真空',a.void||'—']
  ]};
},
notes:[
 {t:'本节目标',h:'让学员能从一个真实案例里认出"哪一步被挪了、谁接住了"。'},
 {t:'时间分配',h:'先猜 5′ · 概念 7′ · 还原台 18′ · 在你的事 10′ · 提交 5′。'},
 {t:'常见卡点',h:'学员会点"付款"却说挪到了别处。强调：先找被挪的那步，再找它的新位置。'},
 {t:'直播怎么接',h:'看还原台的错选：把"排队"当被挪步骤的最多，就用它讲"被删的是等待感，不是步骤"。'},
 {t:'和 A17 的关系',h:'A17 是自己动手挪，A18 是先看懂别人怎么挪。顺序别倒。'}
]};

window.FXM_ADULT=window.FXM_ADULT||{};
window.FXM_ADULT['A18']=L;
})();
