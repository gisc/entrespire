/* English overlay for the Genesis static mirror.
 * Translates UI text client-side from a dictionary (i18n-dict.js).
 * Longest-match first; text nodes, placeholders, titles, aria-labels. */
(function(){
  'use strict';
  var D = window.I18N_DICT || {};
  var keys = Object.keys(D).sort(function(a,b){ return b.length - a.length; });
  var map = new Map();
  keys.forEach(function(k){ map.set(k, D[k]); });
  function tr(s){
    if(!s) return s;
    var t = map.get(s);
    if(t) return t;
    // try trimmed
    var lead = s.match(/^\s*/)[0], trail = s.match(/\s*$/)[0], core = s.trim();
    t = map.get(core);
    if(t) return lead + t + trail;
    // longest-prefix replacements for composed strings
    var out = s, hit = false;
    for(var i=0;i<keys.length;i++){
      var k = keys[i];
      if(k.length >= 2 && out.indexOf(k) !== -1){ out = out.split(k).join(map.get(k)); hit = true; }
      if(out.indexOf('一-鿿')===-1 && !/[一-鿿]/.test(out)) break;
    }
    return hit ? out : s;
  }
  var SKIP = {SCRIPT:1,STYLE:1,CODE:1,PRE:1,IFRAME:1,SVG:1,CANVAS:1};
  function walkText(root){
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode:function(n){
      if(!n.nodeValue || !/[一-鿿]/.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
      var p = n.parentNode;
      if(!p || SKIP[p.tagName]) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }});
    var batch=[], n;
    while((n=w.nextNode()) && batch.length<400){ batch.push(n); }
    batch.forEach(function(x){ var v = tr(x.nodeValue); if(v!==x.nodeValue) x.nodeValue = v; });
  }
  function walkAttrs(root){
    var els = root.querySelectorAll ? root.querySelectorAll('[placeholder],[title],[alt],[aria-label],[value]') : [];
    els.forEach(function(el){
      ['placeholder','title','alt','aria-label'].forEach(function(a){
        var v = el.getAttribute(a);
        if(v && /[一-鿿]/.test(v)){ var nv = tr(v); if(nv!==v) el.setAttribute(a,nv); }
      });
      if(/^(INPUT|TEXTAREA|OPTION|SELECT)$/.test(el.tagName)){
        var v = el.getAttribute('value');
        if(v && /[一-鿿]/.test(v)){ var nv = tr(v); if(nv!==v) el.setAttribute('value',nv); }
      }
    });
  }
  
  function walkElements(root){
    var els = (root.querySelectorAll ? root.querySelectorAll('*') : []);
    var arr = Array.prototype.slice.call(els).filter(function(el){
      if(SKIP[el.tagName]) return false;
      var tc = (el.textContent||'').trim();
      return tc && /[一-鿿]/.test(tc) && map.has(tc);
    });
    arr.sort(function(a,b){ return b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_CONTAINED_BY ? 1 : -1; });
    var done = [];
    arr.forEach(function(el){
      for(var i=0;i<done.length;i++){ if(done[i].contains(el)) return; }
      var tc = el.textContent.trim(); var t = map.get(tc);
      if(t){ el.textContent = t; done.push(el); }
    });
  }
  function walkValues(root){
    var els = root.querySelectorAll ? root.querySelectorAll('input,textarea') : [];
    els.forEach(function(el){
      var v = el.value;
      if(v && /[一-鿿]/.test(v)){ var nv = tr(v); if(nv!==v) el.value = nv; }
    });
  }
  function sweep(root){ walkText(root); walkAttrs(root); walkElements(root); walkValues(root); if(document.documentElement) { var t=tr(document.title||''); if(t!==document.title) document.title=t; } }
  var scheduled=false;
  var mo = new MutationObserver(function(muts){
    if(scheduled) return; scheduled=true;
    setTimeout(function(){ scheduled=false; muts.forEach(function(m){
      m.addedNodes && m.addedNodes.forEach(function(n){ if(n.nodeType===1) sweep(n); else if(n.nodeType===3 && n.nodeValue && /[一-鿿]/.test(n.nodeValue)){ var v=tr(n.nodeValue); if(v!==n.nodeValue)n.nodeValue=v; } });
      if(m.type==='characterData'){ var v=tr(m.target.nodeValue); if(v!==m.target.nodeValue) m.target.nodeValue=v; }
      if(m.type==='attributes' && m.target && m.target.getAttribute){ var a=m.attributeName, v=m.target.getAttribute(a); if(v && /[一-鿿]/.test(v)){ var nv=tr(v); if(nv!==v) m.target.setAttribute(a,nv); } }
    }); }, 120);
  });
  function start(){ sweep(document.documentElement); mo.observe(document.documentElement,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['placeholder','title','alt','aria-label','value']}); document.documentElement.lang='en'; }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
  setInterval(function(){ try{walkValues(document);}catch(e){} }, 800);
  window.I18N_TR = tr;
})();
