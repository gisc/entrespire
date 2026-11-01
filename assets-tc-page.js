/* 子页面繁体版：沿用主站 iv3_fontmode=trad 的选择 */
(function(){
  'use strict';
  var KEY='iv3_fontmode';
  var mode='';
  try{ mode=localStorage.getItem(KEY)||''; }catch(e){}
  if(mode!=='trad') {
    window.addEventListener('storage',function(e){
      if(e.key===KEY && e.newValue==='trad') boot();
      if(e.key===KEY && e.newValue!=='trad') location.reload();
    });
    return;
  }
  var SKIP={SCRIPT:1,STYLE:1,NOSCRIPT:1,IFRAME:1};
  var ATTRS=['placeholder','title','alt','aria-label'];
  var cvt=null, loading=null, observer=null, started=false;
  var memo=new Map();
  function t(s){
    if(!cvt || !s) return s;
    if(!/[\u4e00-\u9fff]/.test(s)) return s;
    var v=memo.get(s);
    if(v===undefined){ try{ v=cvt(s); }catch(e){ v=s; } memo.set(s,v); if(memo.size>6000) memo.clear(); }
    return v;
  }
  function walk(root){
    if(!root) return;
    try{
      var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
        var p=n.parentElement;
        if(!p || SKIP[p.tagName] || p.closest('[data-no-tc]')) return NodeFilter.FILTER_REJECT;
        if(!n.data || !/[\u4e00-\u9fff]/.test(n.data)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }});
      var nodes=[], n;
      while((n=w.nextNode())) nodes.push(n);
      nodes.forEach(function(tn){ var v=t(tn.data); if(v!==tn.data) tn.data=v; });
      if(root.querySelectorAll){
        var els=root.querySelectorAll('['+ATTRS.join('],[')+']');
        els.forEach(function(el){
          if(el.closest('[data-no-tc]')) return;
          ATTRS.forEach(function(a){ var v=el.getAttribute(a); if(v){ var nv=t(v); if(nv!==v) el.setAttribute(a,nv); } });
        });
      }
    }catch(e){ console.warn('[tc] walk',e); }
  }
  function observe(){
    if(observer || !document.body) return;
    observer=new MutationObserver(function(muts){
      if(!cvt) return;
      muts.forEach(function(m){
        if(m.type==='characterData'){ var v=t(m.target.data); if(v!==m.target.data) m.target.data=v; }
        else if(m.type==='childList'){ m.addedNodes.forEach(function(n){ if(n.nodeType===3){ var v=t(n.data); if(v!==n.data) n.data=v; } else if(n.nodeType===1 && !SKIP[n.tagName]) walk(n); }); }
        else if(m.type==='attributes'){ var el=m.target, a=m.attributeName, v=el.getAttribute(a); if(v && !el.closest('[data-no-tc]')){ var nv=t(v); if(nv!==v) el.setAttribute(a,nv); } }
      });
    });
    observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:ATTRS});
  }
  function run(){
    if(!cvt || !document.body) return;
    document.documentElement.lang='zh-Hant';
    walk(document.body);
    if(document.title) document.title=t(document.title);
    observe();
  }
  function boot(){
    if(started) return; started=true;
    if(loading) { loading.then(run); return; }
    loading=new Promise(function(resolve,reject){
      var s=document.createElement('script');
      s.src='assets-opencc-full.js';
      s.onload=function(){
        try{ cvt=OpenCC.Converter({from:'cn',to:'t'}); resolve(); }
        catch(e){ reject(e); }
      };
      s.onerror=function(){ reject(new Error('opencc load failed')); };
      document.head.appendChild(s);
    });
    loading.then(run).catch(function(e){ console.warn('[tc]',e); });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();
