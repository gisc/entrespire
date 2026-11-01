/* =========================================================
   发小明 · SIT 创新工场 · 场景与对象库
   给第 05–12 章提供可复用的 SVG 对象、能力、模块与动画层
   ========================================================= */
(function(){
'use strict';
const OBJECTS={
  umbrella:{
    name:'雨伞', emoji:'☂️', acc:'#F5C451',
    pain:'风一大就翻，双手还占着，进教室还滴水。',
    parts:[{id:'handle',label:'手柄',lost:'没有手柄，还能怎么拿？'}],
    uses:['固定在背包肩带上，解放双手','倒过来插在门口，当伞架','改成可折叠的帽檐，戴在头上'],
    svg:`<svg viewBox="0 0 220 220" class="st-obj-svg" aria-hidden="true">
      <g class="st-float">
        <path d="M28 104 Q110 12 192 104 Q164 84 138 104 Q110 84 82 104 Q54 84 28 104Z" fill="#F5C451" stroke="#8A5A12" stroke-width="3"/>
        <path d="M110 104 V176" stroke="#E9D5A0" stroke-width="7" stroke-linecap="round"/>
        <g data-part="handle"><path d="M110 176 q0 20 -20 20" fill="none" stroke="#B98A3C" stroke-width="9" stroke-linecap="round"/></g>
        <path d="M70 104 q10 18 20 0 M130 104 q10 18 20 0" fill="none" stroke="rgba(138,90,18,.5)" stroke-width="2"/>
        <circle cx="110" cy="104" r="5" fill="#8A5A12"/>
      </g>
    </svg>`
  },
  cup:{
    name:'水杯', emoji:'🥤', acc:'#4FE0D0',
    pain:'放桌边容易被碰倒，水洒一地，杯底还容易积垢。',
    parts:[{id:'bottom',label:'杯底',lost:'没有杯底，还能装什么？'}],
    uses:['变成漏斗，把水倒进小瓶','倒过来当笔筒/小花盆','剪开做自浇水花盆'],
    svg:`<svg viewBox="0 0 220 220" class="st-obj-svg" aria-hidden="true">
      <g class="st-float">
        <path d="M64 64 L156 64 L146 166 L74 166Z" fill="#4FE0D0" stroke="#0F6B63" stroke-width="3"/>
        <path d="M72 110 L148 110 L142 160 L78 160Z" fill="rgba(79,224,208,.35)"/>
        <path d="M88 64 L96 36 L128 36 L136 64" fill="none" stroke="#B9FFF6" stroke-width="6" stroke-linecap="round"/>
        <g data-part="bottom"><path d="M74 166 L146 166 L140 184 L80 184Z" fill="#2AA79B" stroke="#0F6B63" stroke-width="3"/></g>
        <path d="M82 88 q10 6 20 0" stroke="rgba(255,255,255,.6)" stroke-width="3" fill="none"/>
      </g>
    </svg>`
  },
  bag:{
    name:'书包', emoji:'🎒', acc:'#FF7A6B',
    pain:'东西混在一起，找橡皮要翻半天；背带勒肩。',
    parts:[{id:'strap',label:'背带',lost:'没有背带，还能怎么带？'}],
    uses:['挂在课桌侧面，当分类挂袋','摊开平放，当桌面收纳垫','固定在椅背上，当椅背口袋'],
    svg:`<svg viewBox="0 0 220 220" class="st-obj-svg" aria-hidden="true">
      <g class="st-float">
        <g data-part="strap"><path d="M80 74 v-26 q0-14 14-14 h32 q14 0 14 14 v26" fill="none" stroke="#B04A3A" stroke-width="10" stroke-linecap="round"/></g>
        <rect x="54" y="72" width="112" height="112" rx="20" fill="#FF7A6B" stroke="#7A2E24" stroke-width="3"/>
        <rect x="70" y="120" width="80" height="46" rx="10" fill="rgba(255,255,255,.18)" stroke="rgba(255,255,255,.5)" stroke-width="2"/>
        <path d="M70 100 h80" stroke="rgba(122,46,36,.5)" stroke-width="3"/>
        <circle cx="110" cy="92" r="4" fill="#7A2E24"/>
      </g>
    </svg>`
  },
  shoe:{
    name:'鞋子', emoji:'👟', acc:'#A78BFA',
    pain:'雨天容易湿，鞋带松了容易绊倒，鞋底还容易打滑。',
    parts:[{id:'sole',label:'鞋底',lost:'没有鞋底，还能怎么穿？'}],
    uses:['变成室内防滑袜，直接穿进教室','加一层可拆洗的鞋套','做成能折叠的拖鞋'],
    svg:`<svg viewBox="0 0 220 220" class="st-obj-svg" aria-hidden="true">
      <g class="st-float">
        <path d="M38 142 q8-52 58-52 q30 0 46 24 l40 16 q20 8 20 28 v10 H38Z" fill="#A78BFA" stroke="#4C3A7A" stroke-width="3"/>
        <g data-part="sole"><path d="M38 168 h164 v12 q0 10-12 10 H50 q-12 0-12-10Z" fill="#6D5AA8" stroke="#4C3A7A" stroke-width="3"/></g>
        <path d="M80 100 q18 10 36 0 M80 114 q18 10 36 0 M80 128 q18 10 36 0" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="3" stroke-linecap="round"/>
      </g>
    </svg>`
  }
};
const POWERS=[
  {id:'light',label:'会发光',icon:'💡',desc:'黑暗里被看见，或提醒别人注意。',color:'#F5C451'},
  {id:'sound',label:'会发声',icon:'🔔',desc:'在需要的时候发出声音提醒。',color:'#4FE0D0'},
  {id:'collect',label:'会收集',icon:'🧺',desc:'把散落的东西收起来，或接住水/碎屑。',color:'#FF7A6B'},
  {id:'auto',label:'会自动',icon:'⚙️',desc:'不用手也能完成一个动作，解放双手。',color:'#A78BFA'},
  {id:'connect',label:'会连接',icon:'🔗',desc:'把两个东西固定在一起，或连到书包/桌面。',color:'#7DD3FC'}
];
const MODULES=[
  {id:'sensor',label:'感应器',icon:'📡',desc:'感知雨/光/人，自动触发。'},
  {id:'lamp',label:'小灯',icon:'💡',desc:'发光、提醒、夜间可见。'},
  {id:'pocket',label:'收纳袋',icon:'🧺',desc:'多一个口袋，分类或收集。'},
  {id:'clip',label:'固定夹',icon:'🖇️',desc:'夹在书包/桌边/衣角。'},
  {id:'speaker',label:'小喇叭',icon:'🔊',desc:'发出提醒或声音反馈。'},
  {id:'strap',label:'可调带',icon:'🎗️',desc:'解放双手，适配不同尺寸。'}
];
const ROBOT=`<svg viewBox="0 0 80 80" class="st-robot" aria-hidden="true"><circle cx="40" cy="38" r="24" fill="#1C2A44" stroke="#F5C451" stroke-width="2"/><rect x="28" y="28" width="24" height="17" rx="6" fill="#4FE0D0"/><circle cx="34" cy="36" r="3" fill="#07101F"/><circle cx="46" cy="36" r="3" fill="#07101F"/><path d="M34 43 q6 5 12 0" fill="none" stroke="#07101F" stroke-width="2" stroke-linecap="round"/><path d="M40 14 v-8" stroke="#F5C451" stroke-width="3"/><circle cx="40" cy="5" r="3" fill="#F5C451"/><rect x="18" y="58" width="44" height="14" rx="7" fill="#1C2A44" stroke="#F5C451" stroke-width="2"/></svg>`;
function svg(key){ return (OBJECTS[key]||OBJECTS.umbrella).svg; }
function wrap(key){ return '<div class="st-object">'+svg(key)+'</div>'; }
function parts(key){ return (OBJECTS[key]||OBJECTS.umbrella).parts; }
function uses(key){ return (OBJECTS[key]||OBJECTS.umbrella).uses; }
function name(key){ return (OBJECTS[key]||OBJECTS.umbrella).name; }
function emoji(key){ return (OBJECTS[key]||OBJECTS.umbrella).emoji; }
function power(id){ return POWERS.find(p=>p.id===id)||POWERS[0]; }
function module(id){ return MODULES.find(m=>m.id===id)||MODULES[0]; }
function partNode(root,id){ return root.querySelector('[data-part="'+id+'"]'); }
function setPartOff(root,id,off){ const n=partNode(root,id); if(n)n.classList.toggle('off',off); }
function pulse(root,cls){ if(!root)return; root.classList.remove(cls); void root.offsetWidth; root.classList.add(cls); }
window.FXMStudio={OBJECTS,POWERS,MODULES,ROBOT,svg,wrap,parts,uses,name,emoji,power,module,partNode,setPartOff,pulse};
})();
