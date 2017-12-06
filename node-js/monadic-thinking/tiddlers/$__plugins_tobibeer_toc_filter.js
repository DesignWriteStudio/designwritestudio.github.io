/*\
title: $:/plugins/tobibeer/toc/filter.js
type: application/javascript
module-type: filteroperator

A filter to fetch titles in a Table Of Contents

@preserve
\*/
(function(){"use strict";exports.toc=function(t,e,i){var r,s,l,n=[],u="toc filter error: ",c=e.suffix||"",f={level:-1,root:e.operand||i.widget.getVariable("currentTiddler")||"TableOfContents",list:"tags",exclude:"",truncate:"",sort:""},o=[[/^\s+/,function(){}],[/^(exclude|truncate)=\s*([^\s]+)(?:\s|$)/i,function(t){f[t[1]]=i.widget.getVariable(t[2])}],[/^sort=\s*([^\s]+)(?:\s|$)/i,function(t){var e=t[1];f.sort=e.charAt(0)!=="!"?"sort["+e+"]":"!sort["+e.substr(1)+"]"}],[/^level=\s*(-?\d+)(?:\s|$)/i,function(t){var e=parseInt(t[1],10);if(!isNaN(e)){f.level=e}}],[/^list\=\s*([^\s]+)(?:\s|$)/i,function(t){f.list=t[1]}]],a=function(t,e){e++;var i=f.list==="tags"?"[["+t+"]tagging[]"+f.sort+"]":"[["+t+"]listed["+f.list+"]"+f.sort+"]";$tw.utils.each($tw.wiki.filterTiddlers(i),function(t){if(n.indexOf(t)<0&&r.indexOf(t)<0){n.push(t);if((f.level===-1||e<f.level)&&s.indexOf(t)<0){a(t,e)}}})};try{while(c){l=c;$tw.utils.each(o,function(t){var e=t[0].exec(c);if(e){t[1].call(this,e);c=c.substr(e[0].length);return false}});if(c===l){throw u+"invalid suffix(es) '"+c+"'"}}r=f.exclude?$tw.wiki.filterTiddlers(f.exclude):[];s=f.truncate?$tw.wiki.filterTiddlers(f.truncate):[];a(f.root,0);return n}catch(d){return[u+d]}}})();