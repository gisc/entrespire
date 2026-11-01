/* =========================================================
   DAY 1 · 看见问题    发小明 减法
   一个人的一天 → 卡住的地方 → 拿掉一步 → 三问 → 预测失败
   ========================================================= */
(function(){
'use strict';

const U=[
{id:'u1',emoji:'👴',name:'爷爷',tag:'72 岁 · 一个人住',why:'他晚上起夜，怕吵醒奶奶，不敢开大灯。',
 day:[['05:40','醒得早，摸黑找拖鞋'],['07:10','去公园，回来拎着菜'],['12:00','吃药，看不清说明书'],['15:30','下楼取快递'],['21:00','看电视，音量开到 30'],['23:20','起夜，扶墙走']],
 pain:[0,4,5],
 routine:['醒来','先睁眼坐一会儿，怕头晕','没人叫他，可能又睡过去','+5 分钟，可能误事'],
 routine2:['找拖鞋','拖鞋不在床边，用脚在地上摸','光脚踩地，可能踩到东西','+40 秒，脚凉，容易滑'],
 routine3:['走到厕所','不开大灯，扶墙走 4 米','只能摸墙，或者叫醒别人','更容易摔，也更容易放弃'],
 routine4:['开灯','开关在门边，要摸一下','看不见开关，只能开大灯','会吵醒奶奶'],
 routine5:['回床','回来时已经清醒，很难再睡着','坐在床边等睡意','第二天没精神'],
 metric:{label:'一晚上起夜几次',unit:'次',guess:2,real:3,note:'其中 1 次差点被门口的凳子绊到。'}},

{id:'u2',emoji:'👩',name:'妈妈',tag:'上班 + 做饭 + 接孩子',why:'她下班接完孩子，一只手拎菜，一只手牵人，还要开门。',
 day:[['06:30','做早饭，顺便装午饭'],['08:00','挤地铁上班'],['17:40','接孩子，顺路买菜'],['18:30','一只手拎菜，一只手开门'],['19:30','做饭，孩子在旁边写作业'],['22:00','洗碗，收书包']],
 pain:[3,4,5],
 routine:['到家门口','把菜放地上，腾出手找钥匙','钥匙在包最底下，只能一直摸','+1 分钟，菜可能倒'],
 routine2:['开门','门一开，孩子先冲进去','孩子可能跑到楼梯口','不安全'],
 routine3:['把菜拎进厨房','两只手都占着，用脚踢门','门关不上，得放下再关','多跑一趟'],
 routine4:['放下菜','随手放台面上，占了切菜的地方','做饭时没地方切','要再挪一次'],
 routine5:['开始做饭','孩子在旁边问作业','一边切菜一边回答','容易切到手'],
 metric:{label:'从到楼下到进厨房要几分钟',unit:'分钟',guess:2,real:7,note:'她自己也说：每天最烦的就是这 7 分钟。'}},

{id:'u3',emoji:'🧑‍🎓',name:'同桌小宇',tag:'四年级 · 坐第三排',why:'他个子不高，黑板下半截被前面同学挡住，抄题总慢半拍。',
 day:[['07:20','到教室，交作业'],['08:10','早读，书立在桌上'],['10:00','数学课，抄黑板'],['12:00','食堂排队'],['14:00','美术课，找彩笔'],['16:30','记作业，抄在家校本上']],
 pain:[2,5,0],
 routine:['看黑板','身体往左歪，从同学肩膀缝里看','只能看到上半截','漏抄条件'],
 routine2:['抄题','一边看一边写，来回抬头','抬头三次才抄完一行','更慢，更漏'],
 routine3:['等老师擦黑板','没抄完，不敢说','干脆不抄，回家问别人','作业做错'],
 routine4:['举手','举了又放下，怕同学笑','一直不举手','问题越积越多'],
 routine5:['记作业','听一遍，靠记','记错一项','第二天被点名'],
 metric:{label:'一节课要抬头看黑板几次',unit:'次',guess:5,real:14,note:'他说：抄一道题要抬头十几次，脖子酸。'}},

{id:'u4',emoji:'👧',name:'邻居妹妹豆豆',tag:'6 岁 · 身高 108cm',why:'她够不到洗手台，每次洗手都要搬凳子，或者喊人抱。',
 day:[['07:00','起床，自己穿衣服'],['07:30','搬凳子去洗手台'],['12:00','吃饭，筷子太长'],['15:00','画画，够不到桌上的笔筒'],['18:30','洗手，凳子被挪走了'],['21:00','刷牙，踩在凳子边上']],
 pain:[1,4,5],
 routine:['搬凳子','凳子在小房间，比她还重','只能拖着走，或者喊人','拖不动就放弃'],
 routine2:['爬上凳子','凳子不稳，要扶墙','只能一只脚先上','容易滑'],
 routine3:['够水龙头','手伸到最远，身体前倾','水会顺着胳膊流到袖子','袖子湿一天'],
 routine4:['关水','开关有点紧，要两只手','关不紧，一直滴水','浪费水，被说'],
 routine5:['下来','踩着凳子边往下跳','跳下来容易崴脚','摔过一次'],
 metric:{label:'一天要搬几次凳子',unit:'次',guess:2,real:6,note:'奶奶说：她一天要搬 6 次，我们已经习惯了。'}},

{id:'u5',emoji:'🧑‍✈️',name:'保安叔叔',tag:'站 8 小时 · 门口',why:'他一天站在门口，冬天风大，手上还要拿登记本。',
 day:[['07:00','交接班，站到门口'],['09:00','给访客登记，风把纸吹翻'],['12:00','蹲在门卫室吃饭'],['15:00','帮业主搬东西，手套脱了'],['19:00','天黑，看不清车牌'],['21:00','收班，脚已经麻了']],
 pain:[1,4,5],
 routine:['掏出登记本','本子在口袋里，手上还有对讲机','只能夹在胳膊下','纸被风吹走'],
 routine2:['摘下笔帽','笔挂在胸前，冬天戴手套捏不住','用牙咬开笔帽','不卫生，也慢'],
 routine3:['写字','手冻得僵，字写不清','让访客自己写','有人不愿意写'],
 routine4:['核对身份证','光线暗，要凑很近','看不清，只能信对方','登记可能出错'],
 routine5:['放回本子','两只手都占着，用腿夹','本子掉在地上','捡起来又要脱手套'],
 metric:{label:'一辆车登记要几秒',unit:'秒',guess:15,real:45,note:'高峰时门口会排 4 辆车，喇叭一直按。'}},

{id:'u6',emoji:'🙋',name:'我自己',tag:'每天背书包 5 公斤',why:'书包太重，肩带勒，找作业本要翻半天。',
 day:[['06:50','起床，找校服'],['07:30','背书包出门，肩膀勒'],['10:00','找数学本，翻了 3 分钟'],['12:00','食堂，饭卡在书包最底下'],['16:30','装作业，书包更重'],['20:00','写作业，找不到橡皮']],
 pain:[1,2,5],
 routine:['找作业本','书包里有 12 本书，一层压一层','只能全倒出来','桌子更乱'],
 routine2:['找到本子','本子卷了角，看不清页码','随便抽一本','拿错本子'],
 routine3:['装回去','塞进去的时候压到水杯','水杯倒了，本子湿了','作业要重写'],
 routine4:['背起来','肩带太细，勒肩膀','单肩背','肩膀更酸'],
 routine5:['走到学校','路上要换三次肩','放下歇一会儿','迟到'],
 metric:{label:'一天找东西花几分钟',unit:'分钟',guess:5,real:18,note:'早读前找本子，最久的一次用了 6 分钟。'}}
];

const QS=[
 {q:'上次发生是什么时候？',k:'good',out:'把"总是这样"变成一件具体的事，你能记住时间、地点、他当时的动作。'},
 {q:'你当时是怎么做的？',k:'good',out:'拿到真实的动作，而不是他想象的解决办法。这一步最容易发现"绕行"。'},
 {q:'最烦的是哪一步？',k:'good',out:'直接指向减法要拿掉的那一步，也指向真正的需求。'},
 {q:'你觉得这个好不好？',k:'bad',out:'只会得到"好""还行"，问不出证据。'},
 {q:'你喜欢什么颜色？',k:'bad',out:'和麻烦没有关系，问完你还是不知道怎么改。'},
 {q:'如果只能改一个地方，你改哪？',k:'good',out:'逼出优先级。他选的那一个，往往和你猜的不一样。'},
 {q:'为什么你不直接买个新的？',k:'good',out:'能发现真实限制：钱、空间、习惯、没人帮他装。'},
 {q:'你家有几口人？',k:'meh',out:'是有用的背景，但今天解决不了"哪一步卡住"。'}
];

const DAY_TITLE='看见问题';

const c={
no:'1',title:DAY_TITLE,kicker:'DAY 1 / 5 · INVESTIGATE',
line1:'看见',line2:'一个人的麻烦',
lead:'今天不发明。<br>先找到 <b>一个具体的人</b>——爷爷、妈妈、同桌——把他的一天摊开，找到真的卡住他的那个地方。',
tool:'减法',words:['观察','原话','卡住','证据'],
meta:['6 幕 · 全天','混龄 7–13 大带小','材料：任务单 + 便利贴'],
acc:'#F5C451',acc2:'#FFE3A6',rgb:'245,196,81',

acts:[
/* ---------- 01 ---------- */
{a:'01',name:'选一个人',time:'30 分',html:`
<div class="ch-head"><div class="act"><b>01</b><span>选一个人</span><i>不看"大家"，看"一个人"</i></div><h2>今天要发明的对象，<em>是一个真人</em></h2><p>发明最难的不是想点子，是找对人。六张卡里选一张——你要为这个人做 5 天的东西。</p></div>
<div class="cp-hud"><span class="hp brand">发小明 · 减法</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">用户 <b data-uname>—</b></span></div>
<div class="cp-split">
  <div class="cp-stage d1-stage">
    <div class="cp-stage-label">USER DECK · 选一个你真的见过的人</div>
    <div class="d1-cards" data-cards>${U.map((u,i)=>`<button class="d1-ucard" data-u="${u.id}"><span class="uc-e">${u.emoji}</span><span class="uc-n">${u.name}</span><span class="uc-t">${u.tag}</span></button>`).join('')}</div>
    <div class="d1-pickrow"><button class="btn ghost sm" data-pick>🎲 随机抽一张</button><span class="hint">选你身边真实存在的那个，不要选"最酷"的</span></div>
  </div>
  <div class="cp-side">
    <div class="cp-panel"><h4>他的一天，最卡在哪</h4><div class="d1-detail" data-detail><span class="muted">还没选人。左边点一张卡。</span></div></div>
    <div class="cp-coach"><div class="rb">🤖</div><div class="say"><b>发小明：</b>别急着想"我能做什么"。先说清楚<em>他是谁、他在什么时刻最难受</em>。</div></div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>把他的一天摊开 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;S.user=S.user||'';
  const xp=sec.querySelector('[data-xp]');if(xp)xp.textContent=S.xp||0;
  const detail=sec.querySelector('[data-detail]'),next=sec.querySelector('[data-next]'),un=sec.querySelector('[data-uname]');
  function paint(){
    sec.querySelectorAll('[data-u]').forEach(b=>b.classList.toggle('on',b.dataset.u===S.user));
    const u=U.find(x=>x.id===S.user);
    if(!u){detail.innerHTML='<span class="muted">还没选人。左边点一张卡。</span>';next.disabled=true;return;}
    detail.innerHTML='<div class="d1-dwho"><span>'+u.emoji+'</span><b>'+u.name+'</b><em>'+u.tag+'</em></div><p class="d1-dwhy">'+u.why+'</p>';
    next.disabled=false;un.textContent=u.name;
  }
  sec.querySelectorAll('[data-u]').forEach(b=>b.onclick=()=>{S.user=b.dataset.u;api.save();paint();api.sfx('pop');});
  sec.querySelector('[data-pick]').onclick=()=>{
    const u=U[(Math.random()*U.length)|0];S.user=u.id;api.save();paint();api.sfx('coin');
    api.burst(innerWidth*.5,innerHeight*.45,20,['#F5C451','#FFE3A6']);
    api.toast('抽到：'+u.name,'🎲');
  };
  next.onclick=()=>api.go(2);
  paint();
  api.aiPanel(sec,{prompts:['这个人是真的吗？还是我想出来的？','我能说出他具体的一个时刻吗？','他有没有说过一句抱怨的话？']});
}},

/* ---------- 02 ---------- */
{a:'02',name:'摊开他的一天',time:'45 分',html:`
<div class="ch-head"><div class="act"><b>02</b><span>摊开他的一天</span><i>先排序，再标"卡住"</i></div><h2>把一天排好，<em>卡住的地方会自己冒出来</em></h2><p>六个时刻被顺序打乱了。用 ← → 把它们排回一天的样子，然后点你认为<em>他卡住</em>的时刻。</p></div>
<div class="cp-hud"><span class="hp brand">观察</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">卡住 <b data-pain>0</b>/3</span><span class="hp">顺序 <b data-ok>未排好</b></span></div>
<div class="cp-split">
  <div class="cp-stage d1-stage fill">
    <div class="cp-stage-label">ONE DAY · 点击时刻标记"卡住"，用 ← → 排序</div>
    <div class="d1-axis"><span>06:00</span><i></i><b>他的一天</b><i></i><span>24:00</span></div>
    <div class="d1-tl" data-tl></div>
  </div>
  <div class="cp-side">
    <div class="cp-panel"><h4>已标记的卡住时刻</h4><div class="d1-marks" data-marks><span class="muted">还没标记</span></div></div>
    <div class="cp-note" data-note><b>提示：</b>卡住 = 他需要多做一步、需要别人帮、或者干脆放弃的那一步。</div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>拿掉一步试试 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;const u=U.find(x=>x.id===S.user)||U[0];
  const tl=sec.querySelector('[data-tl]'),marks=sec.querySelector('[data-marks]'),next=sec.querySelector('[data-next]');
  const note=sec.querySelector('[data-note]'),xpb=sec.querySelector('[data-xp]'),painb=sec.querySelector('[data-pain]'),okb=sec.querySelector('[data-ok]');
  if(!S.order||S.order.length!==6){S.order=[2,0,5,1,4,3];}
  S.pain=S.pain||[];
  const correct=u.day.map((d,i)=>i).sort((a,b)=>u.day[a][0].localeCompare(u.day[b][0]));
  function ordered(){return S.order.slice().sort((a,b)=>u.day[a][0].localeCompare(u.day[b][0]));}
  function isSorted(){return S.order.every((v,i)=>v===correct[i]);}
  function paint(){
    tl.innerHTML=S.order.map((idx,pos)=>{
      const d=u.day[idx],on=S.pain.includes(idx);
      return '<div class="d1-block'+(on?' pain':'')+'" data-b="'+idx+'">'+
        '<div class="bl-time">'+d[0]+'</div><div class="bl-name">'+d[1]+'</div>'+
        '<div class="bl-ctrl"><button data-mv="-1" data-i="'+pos+'" aria-label="前移">←</button><button data-mv="1" data-i="'+pos+'" aria-label="后移">→</button></div>'+
        (on?'<span class="bl-flag">卡住</span>':'')+'</div>';
    }).join('');
    tl.querySelectorAll('[data-mv]').forEach(b=>b.onclick=e=>{
      e.stopPropagation();const i=+b.dataset.i,j=i+(+b.dataset.mv);
      if(j<0||j>=S.order.length)return;
      const t=S.order[i];S.order[i]=S.order[j];S.order[j]=t;api.save();api.sfx('tap');paint();
    });
    tl.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{
      const idx=+b.dataset.b,has=u.pain.includes(idx);
      if(!has){api.sfx('error');api.toast('这个时刻他还好，再看看别的','👀');b.classList.add('shake');setTimeout(()=>b.classList.remove('shake'),420);return;}
      S.pain=S.pain.includes(idx)?S.pain.filter(x=>x!==idx):S.pain.concat(idx);
      api.save();api.sfx('pop');paint();
    });
    const ms=S.pain.map(i=>u.day[i]);
    marks.innerHTML=ms.length?ms.map(m=>'<div class="d1-mark"><b>'+m[0]+'</b><span>'+m[1]+'</span></div>').join(''):'<span class="muted">还没标记</span>';
    painb.textContent=S.pain.length;
    const ok=isSorted();okb.textContent=ok?'排好了':'未排好';okb.style.color=ok?'#8BD17C':'';
    xpb.textContent=S.xp||0;
    next.disabled=!(ok&&S.pain.length>=2);
    if(ok&&S.pain.length>=2){note.innerHTML='<b>很好：</b>顺序对了，也找到了 '+S.pain.length+' 个卡住的时刻。下一步：拿掉其中一个步骤看看。';}
    else if(!ok){note.innerHTML='<b>还没排好：</b>用 ← → 把时刻按从早到晚排一遍。';}
    else{note.innerHTML='<b>再标一个：</b>至少找到 2 个卡住的时刻，才能看出规律。';}
  }
  paint();
  if(!S._xp2){S._xp2=1;api.addXp(10);}
  next.onclick=()=>api.go(3);
  api.aiPanel(sec,{prompts:['这几个卡住的时刻，有没有共同点？','哪一个是他每天都在忍的？','他自己会怎么描述这个时刻？']});
}},

/* ---------- 03 ---------- */
{a:'03',name:'拿掉一步',time:'50 分',html:`
<div class="ch-head"><div class="act"><b>03</b><span>拿掉一步</span><i>发小明 · 减法</i></div><h2>拿掉一步，<em>看他怎么绕过去</em></h2><p>他卡在的那件事，其实是一串步骤。点其中一步把它<em>拿掉</em>——如果功能还得保留，他就必须绕路。绕路的地方，就是真需求。</p></div>
<div class="cp-hud"><span class="hp brand">发小明 · 减法</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">拿掉 <b data-cut>没拿</b></span></div>
<div class="cp-split">
  <div class="cp-stage d1-stage">
    <div class="cp-stage-label" data-routine-label>ROUTINE · 点一步 = 拿掉它</div>
    <div class="d1-flow" data-flow></div>
  </div>
  <div class="cp-side">
    <div class="cp-panel"><h4>拿掉的代价</h4><div class="d1-detour" data-detour><span class="muted">先点一步，把它拿掉。</span></div></div>
    <div class="cp-note"><b>规则：</b>拿掉之后，这件事还得能做成。做不到，就说明这一步拿不掉。</div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>去问他三个问题 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;const u=U.find(x=>x.id===S.user)||U[0];
  const steps=[u.routine,u.routine2,u.routine3,u.routine4,u.routine5];
  const flow=sec.querySelector('[data-flow]'),det=sec.querySelector('[data-detour]'),next=sec.querySelector('[data-next]');
  const cutb=sec.querySelector('[data-cut]'),xpb=sec.querySelector('[data-xp]');
  S.cut=typeof S.cut==='number'?S.cut:-1;
  function paint(){
    flow.innerHTML=steps.map((s,i)=>{
      const on=S.cut===i;
      return '<button class="d1-step'+(on?' cut':'')+'" data-s="'+i+'">'+
        '<span class="ds-n">'+(i+1)+'</span><span class="ds-body"><b class="ds-t">'+s[0]+'</b><span class="ds-d">'+s[1]+'</span></span>'+
        (on?'<span class="ds-x">拿掉了</span>':'<span class="ds-cut">✂ 拿掉</span>')+'</button>'+
        (on?'<div class="d1-detourline"><b>绕行</b><span>'+s[2]+'</span><em>'+s[3]+'</em></div>':'');
    }).join('');
    flow.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{
      const i=+b.dataset.s;S.cut=(S.cut===i?-1:i);api.save();api.sfx(S.cut===i?'pop':'tap');paint();
    });
    if(S.cut>=0){
      const s=steps[S.cut];
      cutb.textContent=s[0];
      det.innerHTML='<div class="d1-dt"><b>你拿掉的：'+s[0]+'</b><p>正常情况下：'+s[1]+'</p><p>没有这一步，他只能：'+s[2]+'</p><p class="dt-cost">代价：'+s[3]+'</p><p class="dt-q">停一下：他为什么愿意付这个代价？他真正需要的，是这一步，还是别的什么？</p></div>';
      next.disabled=false;
    }else{cutb.textContent='没拿';det.innerHTML='<span class="muted">先点一步，把它拿掉。</span>';next.disabled=true;}
    xpb.textContent=S.xp||0;
  }
  paint();
  if(!S._xp3){S._xp3=1;api.addXp(15);}
  next.onclick=()=>api.go(4);
  api.aiPanel(sec,{prompts:['他绕的那条路，是不是更麻烦？','如果这一步真的能拿掉，为什么他还在做？','拿掉之后，谁替他做了这件事？']});
}},

/* ---------- 04 ---------- */
{a:'04',name:'问他三个问题',time:'25 分',html:`
<div class="ch-head"><div class="act"><b>04</b><span>问他三个问题</span><i>问具体的，不问"好不好"</i></div><h2>好问题，<em>能问出昨天发生的事</em></h2><p>从八个问题里挑三个。选错了没关系——你会看到它问出了什么。<em>至少要有一个能问出具体动作。</em></p></div>
<div class="cp-hud"><span class="hp brand">观察 · 访谈</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">已选 <b data-qn>0</b>/3</span><span class="hp">好问题 <b data-qg>0</b></span></div>
<div class="cp-split">
  <div class="cp-stage d1-stage">
    <div class="cp-stage-label">INTERVIEW · 八选三</div>
    <div class="d1-qs" data-qs>${QS.map((q,i)=>`<button class="d1-q" data-q="${i}"><span class="qq-k"></span><b>${q.q}</b></button>`).join('')}</div>
    <div class="d1-qout" data-qout>选中的问题会在这里显示"能问出什么"。</div>
  </div>
  <div class="cp-side">
    <div class="cp-panel"><h4>访谈记录</h4><div class="cp-kv" data-rec><div class="row"><b>—</b><span class="muted">还没选问题</span></div></div>
      <div class="cp-field" style="margin-top:7px"><label>他说的原话（照抄一句）</label><textarea data-quote maxlength="60" placeholder="例如：摸半天，怕吵醒她"></textarea></div></div>
    <div class="cp-note" data-note><b>提示：</b>问"上次是什么时候"，不要问"你经常这样吗"。</div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>记录我猜错的 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;S.qs=S.qs||[];
  const qn=sec.querySelector('[data-qn]'),qg=sec.querySelector('[data-qg]'),out=sec.querySelector('[data-qout]'),
        rec=sec.querySelector('[data-rec]'),note=sec.querySelector('[data-note]'),next=sec.querySelector('[data-next]'),xpb=sec.querySelector('[data-xp]');
  const K={good:['●','好'],meh:['◐','一般'],bad:['○','问不出']};
  const qEl=sec.querySelector('[data-quote]');S.quote=S.quote||'';qEl.value=S.quote;
  qEl.addEventListener('input',()=>{S.quote=qEl.value;api.save();});
  function paint(){
    sec.querySelectorAll('[data-q]').forEach(b=>{
      const i=+b.dataset.q,on=S.qs.includes(i);b.classList.toggle('on',on);
      const k=b.querySelector('.qq-k');
      k.textContent=on?K[QS[i].k][0]:'';k.className='qq-k '+(on?QS[i].k:'');
    });
    const good=S.qs.filter(i=>QS[i].k==='good').length;
    qn.textContent=S.qs.length;qg.textContent=good;
    out.innerHTML=S.qs.length?S.qs.map(i=>'<div class="qo '+(QS[i].k)+'"><b>'+QS[i].q+'</b><span>'+QS[i].out+'</span></div>').join(''):'<span class="muted">选中的问题会在这里显示“能问出什么”。</span>';
    rec.innerHTML=S.qs.length?S.qs.map((i,k)=>'<div class="row"><b>问 '+(k+1)+'</b><span>'+QS[i].q+'</span></div>').join(''):'<div class="row"><b>—</b><span class="muted">还没选问题</span></div>';
    if(S.qs.length<3){note.innerHTML='<b>还差 '+(3-S.qs.length)+' 个：</b>三个问题才够拼出他的一天。';next.disabled=true;}
    else if(good<2){note.innerHTML='<b>这两个问不出证据：</b>"好不好""什么颜色"只会得到客气话。换一个问动作的。';next.disabled=true;}
    else{note.innerHTML='<b>可以了：</b>你有 '+good+' 个好问题。记住答案里最具体的那句话——那是你后面 4 天要用的原话。';next.disabled=false;}
    xpb.textContent=S.xp||0;
  }
  sec.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{
    const i=+b.dataset.q;
    if(S.qs.includes(i))S.qs=S.qs.filter(x=>x!==i);
    else{if(S.qs.length>=3){api.toast('先取消一个，再选新的','✋');return;}S.qs=S.qs.concat(i);}
    api.save();api.sfx(S.qs.includes(i)?'pop':'tap');paint();
  });
  paint();
  if(!S._xp4){S._xp4=1;api.addXp(10);}
  next.onclick=()=>api.go(5);
  api.aiPanel(sec,{prompts:['他回答的时候，有没有一个动作？','他有没有说"习惯了"？那通常意味着他在忍。','哪句话你没想到？']});
}},

/* ---------- 05 ---------- */
{a:'05',name:'我猜错了',time:'25 分',html:`
<div class="ch-head"><div class="act"><b>05</b><span>我猜错了</span><i>预测 → 揭晓 → 记下差距</i></div><h2>先猜，再揭晓：<em>你以为的，通常不是真的</em></h2><p>发明最容易犯的错，是<em>用自己的感觉代替对方</em>。先猜一个数字，再点揭晓。</p></div>
<div class="cp-hud"><span class="hp brand">预测 · 证据</span><span class="hp xp">XP <b data-xp>0</b></span><span class="hp">预测 <b data-g>—</b></span></div>
<div class="cp-split">
  <div class="cp-stage d1-stage">
    <div class="cp-stage-label">PREDICT · 你的猜测</div>
    <div class="d1-guess">
      <div class="dg-q" data-gq>先选人</div>
      <div class="dg-num"><b data-gnum>2</b><span data-gunit>次</span></div>
      <input type="range" min="1" max="20" value="2" data-range>
      <div class="dg-hint"><span>1</span><span data-gmax>20</span></div>
    </div>
    <div class="d1-reveal" data-reveal><span class="muted">还没有揭晓</span></div>
  </div>
  <div class="cp-side">
    <div class="cp-panel"><h4>差距记下来</h4><div class="cp-kv" data-gap><div class="row"><b>—</b><span class="muted">先揭晓</span></div></div></div>
    <div class="cp-panel"><h4>我为什么猜错</h4><div class="cp-chips" data-why>
      <button class="cp-chip" data-w="没见过">我没真的见过他做这件事</button>
      <button class="cp-chip" data-w="代替">我拿自己的感觉代替了他</button>
      <button class="cp-chip" data-w="一次">我只见过一次，就当成每天</button>
    </div></div>
    <div class="cp-actions"><button class="btn primary" data-next disabled>今天收工，做证据卡 →</button></div>
  </div>
</div>`,init(sec,api){
  const S=api.S;const u=U.find(x=>x.id===S.user)||U[0];
  const m=u.metric;
  const range=sec.querySelector('[data-range]'),gnum=sec.querySelector('[data-gnum]'),gq=sec.querySelector('[data-gq]'),
        reveal=sec.querySelector('[data-reveal]'),gap=sec.querySelector('[data-gap]'),next=sec.querySelector('[data-next]'),
        gb=sec.querySelector('[data-g]'),xpb=sec.querySelector('[data-xp]');
  sec.querySelector('[data-gunit]').textContent=m.unit;
  sec.querySelector('[data-gmax]').textContent='20';
  range.max=Math.max(10,m.real*4);
  sec.querySelector('[data-gmax]').textContent=range.max;
  gq.textContent='你猜：'+u.name+'，'+m.label+'是 ——';
  S.guess=S.guess||m.guess;S.why=S.why||'';S.revealed=S.revealed||false;
  function paint(){
    range.value=S.guess;gnum.textContent=S.guess;gb.textContent=S.guess+m.unit;
    sec.querySelectorAll('[data-w]').forEach(b=>b.classList.toggle('on',b.dataset.w===S.why));
    if(S.revealed){
      const d=S.guess-m.real;
      reveal.innerHTML='<div class="dr-real"><span>实际</span><b>'+m.real+' '+m.unit+'</b></div>'+
        '<div class="dr-bars"><div class="dr-bar"><i style="width:'+Math.min(100,S.guess/Math.max(S.guess,m.real)*100)+'%"></i><span>你猜 '+S.guess+'</span></div>'+
        '<div class="dr-bar real"><i style="width:'+Math.min(100,m.real/Math.max(S.guess,m.real)*100)+'%"></i><span>实际 '+m.real+'</span></div></div>'+
        '<p class="dr-note">'+m.note+'</p>'+
        '<p class="dr-gap">'+(d===0?'猜得很准——但还是得问他，因为这是他告诉你的，不是你想的。':(d<0?'你猜少了 '+Math.abs(d)+' '+m.unit+'。他每天多做的这些，你原本没算进去。':'你猜多了 '+d+' '+m.unit+'。真实的麻烦没有你想的那么大，但更频繁。'))+'</p>';
      gap.innerHTML='<div class="row"><b>我猜</b><span>'+S.guess+' '+m.unit+'</span></div><div class="row"><b>实际</b><span>'+m.real+' '+m.unit+'</span></div><div class="row"><b>差距</b><span>'+(d>0?'+':'')+d+' '+m.unit+'</span></div>';
    }else{
      reveal.innerHTML='<span class="muted">还没有揭晓</span>';
      gap.innerHTML='<div class="row"><b>—</b><span class="muted">先揭晓</span></div>';
    }
    next.disabled=!(S.revealed&&S.why);
    xpb.textContent=S.xp||0;
  }
  range.addEventListener('input',()=>{if(S.revealed)return;S.guess=+range.value;api.save();paint();});
  sec.querySelector('[data-reveal]').addEventListener('click',()=>{if(S.revealed)return;S.revealed=true;api.save();api.sfx('error');paint();api.burst(innerWidth*.35,innerHeight*.45,18,['#FF7A6B','#FFB3A8','#F5C451']);});
  reveal.style.cursor='pointer';
  sec.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{S.why=b.dataset.w;api.save();api.sfx('tap');paint();});
  paint();
  // 揭晓按钮
  const btn=document.createElement('button');btn.className='btn sm d1-reveal-btn';btn.textContent='揭晓真实数字';
  btn.onclick=()=>{if(S.revealed)return;S.revealed=true;api.save();api.sfx('error');paint();api.burst(innerWidth*.35,innerHeight*.45,18,['#FF7A6B','#FFB3A8','#F5C451']);};
  reveal.parentNode.insertBefore(btn,reveal);
  if(!S._xp5){S._xp5=1;api.addXp(15);}
  next.onclick=()=>{api.setEvidence(evidence());api.go(6);};
  function evidence(){
    const name=(api.A.team&&api.A.team.name)||'小小发明家';
    const painSteps=S.pain.map(i=>u.day[i]);
    return {title:'第 1 天 · 问题卡',short:u.name+'：'+u.why,
      fields:[
        {label:'我选的人',value:u.name+'（'+u.tag+'）'},
        {label:'他最卡住的时刻',value:painSteps.map(p=>p[0]+' '+p[1]).join('；')||'—'},
        {label:'他当时怎么做（原话）',value:S.quote||'—'},
        {label:'我拿掉的一步 / 绕行的代价',value:S.cut>=0?('拿掉了「'+[u.routine,u.routine2,u.routine3,u.routine4,u.routine5][S.cut][0]+'」，他只能：'+[u.routine,u.routine2,u.routine3,u.routine4,u.routine5][S.cut][2]+'（代价：'+[u.routine,u.routine2,u.routine3,u.routine4,u.routine5][S.cut][3]+'）'):'—'},
        {label:'我猜 / 实际',value:S.guess+' '+m.unit+' → '+m.real+' '+m.unit},
        {label:'我为什么猜错',value:S.why||'—'}
      ],stamp:'问题卡'};
  }
  api.aiPanel(sec,{prompts:['这个数字，是你看到的还是你算的？','他现在怎么凑合？','如果这个麻烦消失，他的一天会变成什么样？']});
}},

/* ---------- 06 ---------- */
{a:'06',name:'今日证据卡',time:'45 分',build(sec,api){
  const u=U.find(x=>x.id===api.S.user)||U[0];
  api.renderFinale(sec,{
    badge:{icon:'👁️',name:'观察员'},
    headline:'你今天做的，<em>是发明里最难的一半</em>',
    sub:'你没有想点子，你找到了一位真实的人、一个真实的时刻，并且承认自己猜错了。明天开始想解决办法——但方向由今天的证据决定。',
    journey:[{i:'🧍',b:'选一个人',s:'具体的人，不是"大家"'},{i:'🗓️',b:'摊开一天',s:'排序 + 标出卡住'},{i:'✂️',b:'拿掉一步',s:'看他怎么绕行'},{i:'📉',b:'我猜错了',s:'预测 vs 实际'}],
    reflect:['他绕路的那一步，是"他懒"还是"没别的办法"？','你的预测和实际差在哪：是次数、时间，还是他根本不在乎？','如果明天只能改一个地方，你会改哪一步？'],
    homework:{title:'家庭任务 · 3 个卡住的瞬间',body:'回家看家里人做一件事（做饭、洗碗、找东西），记下 3 个"卡住"的瞬间：几点、在做什么、他当时怎么办。用手机拍 1 张照片。'},
    quote:'“发明不是从点子开始的，是从<em>一个人皱着眉的那一秒</em>开始的。”',
    evidence(){return {title:'第 1 天 · 问题卡',short:u.name+'：'+u.why,
      fields:[
        {label:'我选的人',value:u.name+'（'+u.tag+'）'},
        {label:'他最卡住的时刻',value:(api.S.pain||[]).map(i=>u.day[i][0]+' '+u.day[i][1]).join('；')||'—'},
        {label:'他当时怎么做（原话）',value:api.S.quote||'—'},
        {label:'拿掉的一步 / 代价',value:api.S.cut>=0?('拿掉「'+[u.routine,u.routine2,u.routine3,u.routine4,u.routine5][api.S.cut][0]+'」→ '+[u.routine,u.routine2,u.routine3,u.routine4,u.routine5][api.S.cut][3]):'—'},
        {label:'我猜 / 实际',value:(api.S.guess||'')+' '+u.metric.unit+' → '+u.metric.real+' '+u.metric.unit},
        {label:'我为什么猜错',value:api.S.why||'—'}
      ],stamp:'问题卡'};},
    cert:'day1'
  });
}}
],

notes:[
{html:`<div class="note-block"><h4>今天的 3 个目标</h4><p>1）每组选定<b>一个真实的人</b>；2）写出<b>一个具体时刻</b>；3）承认一次<b>预测失败</b>。</p><p>今天不讲"什么是发明"，不讲这五个工具的来历。只做一件事：让每组有一个能说出名字、说出时刻的"用户"。</p><h4>大带小</h4><p>大孩子负责读题和排时间轴，小孩子负责指认"哪个看着最累"。<b>不要让孩子代填对方的任务单。</b></p><div class="warn">今天最常见的跑偏：孩子选"拯救世界"式的问题（海洋垃圾、太空）。温柔地拉回来：<b>"你见过他吗？他几点最难受？"</b></div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>选定一个真实用户，能说出他的名字、身份、和一个具体的麻烦。</p><h4>关键提问</h4><ul><li>这个人你真的见过吗？</li><li>他最难受的是哪一分钟？</li><li>他有没有说过一句抱怨的话？</li></ul><p>如果孩子选了"我自己"，也可以——但要求他说出一个具体时刻。</p></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>把一天摊开、排序、标出卡住的时刻。培养"按时间看事情"的观察习惯。</p><h4>关键提问</h4><ul><li>这几个卡住的时刻有没有共同点？</li><li>哪一个是他每天都在忍的？</li><li>哪一个是偶尔才发生的？</li></ul><div class="warn">点错时刻会有提示音，这是有意的：让孩子自己发现"看起来麻烦"和"真的卡住"不一样。</div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>用减法：拿掉一步，看绕行。理解"绕行的地方就是真需求"。</p><h4>关键提问</h4><ul><li>他绕的那条路是不是更麻烦？</li><li>如果这一步真能拿掉，他为什么还在做？</li><li>拿掉之后，谁替他做了这件事？</li></ul><div class="quote">减法不是"去掉功能"，是"去掉一个部件/步骤，功能还得在"。功能还在，就一定有人多做了什么。</div></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>学会问具体问题。今天的访谈对象可以是同伴扮演、教师扮演，或真的打电话问家里人（外放）。</p><h4>关键提问</h4><ul><li>他回答时有没有一个动作？</li><li>他有没有说"习惯了"？</li><li>哪句话你没想到？</li></ul><p><b>原话记录最重要：</b>把孩子听到的原话写在便利贴上，贴到任务单背面，第 5 天要用。</p></div>`},
{html:`<div class="note-block"><h4>本幕目标</h4><p>做一次"预测 → 揭晓 → 记差距"。这是全场唯一一次故意制造失败，要让孩子感到"啊，我想错了"。</p><h4>关键提问</h4><ul><li>这个数字是你看到的还是你算的？</li><li>他现在怎么凑合？</li><li>如果这个麻烦消失，他的一天会变成什么样？</li></ul><div class="warn">不要说"猜错很正常"就过去了。要追一句：<b>"你为什么会猜错？"</b>——这是发明者的分水岭。</div></div>`},
{html:`<div class="note-block"><h4>收尾 20 分钟</h4><p>1）每组下载今日证据卡（大屏演示一张）；2）发观察员徽章（贴纸/盖章）；3）明日预告：<b>"明天你要为这个人想 3 个办法，但只能留 1 个。"</b></p><h4>教师复盘 3 问</h4><ul><li>有几组能说出"一个具体时刻"？</li><li>有几组承认自己猜错了？</li><li>哪一组还在说"大家都很不方便"？明天单独盯这一组。</li></ul><p>材料准备：明天的材料盒（纸板、吸管、橡皮筋、纸杯）先摆到桌上，制造期待。</p></div>`}
]};
window.FXM_DAYS=window.FXM_DAYS||{};
window.FXM_DAYS['1']=c;
})();
