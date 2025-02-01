function P(n){let e=null;return()=>(e==null&&(e=n()),e)}function B(n,e){return n.filter(t=>t!==e)}function X(n,e){const t=new Set,s=i=>t.add(i);n.forEach(s),e.forEach(s);const r=[];return t.forEach(i=>r.push(i)),r}class j{enter(e){const t=this.entered.length,s=r=>this.isNodeInDocument(r)&&(!r.contains||r.contains(e));return this.entered=X(this.entered.filter(s),[e]),t===0&&this.entered.length>0}leave(e){const t=this.entered.length;return this.entered=B(this.entered.filter(this.isNodeInDocument),e),t>0&&this.entered.length===0}reset(){this.entered=[]}constructor(e){this.entered=[],this.isNodeInDocument=e}}class z{initializeExposedProperties(){Object.keys(this.config.exposeProperties).forEach(e=>{Object.defineProperty(this.item,e,{configurable:!0,enumerable:!0,get(){return console.warn(`Browser doesn't allow reading "${e}" until the drop event.`),null}})})}loadDataTransfer(e){if(e){const t={};Object.keys(this.config.exposeProperties).forEach(s=>{const r=this.config.exposeProperties[s];r!=null&&(t[s]={value:r(e,this.config.matchesTypes),configurable:!0,enumerable:!0})}),Object.defineProperties(this.item,t)}}canDrag(){return!0}beginDrag(){return this.item}isDragging(e,t){return t===e.getSourceId()}endDrag(){}constructor(e){this.config=e,this.item={},this.initializeExposedProperties()}}const b="__NATIVE_FILE__",A="__NATIVE_URL__",x="__NATIVE_TEXT__",_="__NATIVE_HTML__",y=Object.freeze(Object.defineProperty({__proto__:null,FILE:b,HTML:_,TEXT:x,URL:A},Symbol.toStringTag,{value:"Module"}));function S(n,e,t){const s=e.reduce((r,i)=>r||n.getData(i),"");return s??t}const w={[b]:{exposeProperties:{files:n=>Array.prototype.slice.call(n.files),items:n=>n.items,dataTransfer:n=>n},matchesTypes:["Files"]},[_]:{exposeProperties:{html:(n,e)=>S(n,e,""),dataTransfer:n=>n},matchesTypes:["Html","text/html"]},[A]:{exposeProperties:{urls:(n,e)=>S(n,e,"").split(`
`),dataTransfer:n=>n},matchesTypes:["Url","text/uri-list"]},[x]:{exposeProperties:{text:(n,e)=>S(n,e,""),dataTransfer:n=>n},matchesTypes:["Text","text/plain"]}};function Y(n,e){const t=w[n];if(!t)throw new Error(`native type ${n} has no configuration`);const s=new z(t);return s.loadDataTransfer(e),s}function I(n){if(!n)return null;const e=Array.prototype.slice.call(n.types||[]);return Object.keys(w).filter(t=>{const s=w[t];return s!=null&&s.matchesTypes?s.matchesTypes.some(r=>e.indexOf(r)>-1):!1})[0]||null}const k=P(()=>/firefox/i.test(navigator.userAgent)),M=P(()=>!!window.safari);class L{interpolate(e){const{xs:t,ys:s,c1s:r,c2s:i,c3s:d}=this;let o=t.length-1;if(e===t[o])return s[o];let c=0,u=d.length-1,h;for(;c<=u;){h=Math.floor(.5*(c+u));const a=t[h];if(a<e)c=h+1;else if(a>e)u=h-1;else return s[h]}o=Math.max(0,u);const f=e-t[o],l=f*f;return s[o]+r[o]*f+i[o]*l+d[o]*f*l}constructor(e,t){const{length:s}=e,r=[];for(let a=0;a<s;a++)r.push(a);r.sort((a,g)=>e[a]<e[g]?-1:1);const i=[],d=[];let o,c;for(let a=0;a<s-1;a++)o=e[a+1]-e[a],c=t[a+1]-t[a],i.push(o),d.push(c/o);const u=[d[0]];for(let a=0;a<i.length-1;a++){const g=d[a],v=d[a+1];if(g*v<=0)u.push(0);else{o=i[a];const p=i[a+1],m=o+p;u.push(3*m/((m+p)/g+(m+o)/v))}}u.push(d[d.length-1]);const h=[],f=[];let l;for(let a=0;a<u.length-1;a++){l=d[a];const g=u[a],v=1/i[a],p=g+u[a+1]-l-l;h.push((l-g-p)*v),f.push(p*v*v)}this.xs=e,this.ys=t,this.c1s=u,this.c2s=h,this.c3s=f}}const U=1;function H(n){const e=n.nodeType===U?n:n.parentElement;if(!e)return null;const{top:t,left:s}=e.getBoundingClientRect();return{x:s,y:t}}function E(n){return{x:n.clientX,y:n.clientY}}function W(n){var e;return n.nodeName==="IMG"&&(k()||!(!((e=document.documentElement)===null||e===void 0)&&e.contains(n)))}function K(n,e,t,s){let r=n?e.width:t,i=n?e.height:s;return M()&&n&&(i/=window.devicePixelRatio,r/=window.devicePixelRatio),{dragPreviewWidth:r,dragPreviewHeight:i}}function V(n,e,t,s,r){const i=W(e),o=H(i?n:e),c={x:t.x-o.x,y:t.y-o.y},{offsetWidth:u,offsetHeight:h}=n,{anchorX:f,anchorY:l}=s,{dragPreviewWidth:a,dragPreviewHeight:g}=K(i,e,u,h),v=()=>{let O=new L([0,.5,1],[c.y,c.y/h*g,c.y+g-h]).interpolate(l);return M()&&i&&(O+=(window.devicePixelRatio-1)*g),O},p=()=>new L([0,.5,1],[c.x,c.x/u*a,c.x+a-u]).interpolate(f),{offsetX:m,offsetY:D}=r,T=m===0||m,R=D===0||D;return{x:T?m:p(),y:R?D:v()}}class q{get window(){if(this.globalContext)return this.globalContext;if(typeof window<"u")return window}get document(){var e;return!((e=this.globalContext)===null||e===void 0)&&e.document?this.globalContext.document:this.window?this.window.document:void 0}get rootElement(){var e;return((e=this.optionsArgs)===null||e===void 0?void 0:e.rootElement)||this.window}constructor(e,t){this.ownerDocument=null,this.globalContext=e,this.optionsArgs=t}}function G(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function C(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{},s=Object.keys(t);typeof Object.getOwnPropertySymbols=="function"&&(s=s.concat(Object.getOwnPropertySymbols(t).filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),s.forEach(function(r){G(n,r,t[r])})}return n}class ${profile(){var e,t;return{sourcePreviewNodes:this.sourcePreviewNodes.size,sourcePreviewNodeOptions:this.sourcePreviewNodeOptions.size,sourceNodeOptions:this.sourceNodeOptions.size,sourceNodes:this.sourceNodes.size,dragStartSourceIds:((e=this.dragStartSourceIds)===null||e===void 0?void 0:e.length)||0,dropTargetIds:this.dropTargetIds.length,dragEnterTargetIds:this.dragEnterTargetIds.length,dragOverTargetIds:((t=this.dragOverTargetIds)===null||t===void 0?void 0:t.length)||0}}get window(){return this.options.window}get document(){return this.options.document}get rootElement(){return this.options.rootElement}setup(){const e=this.rootElement;if(e!==void 0){if(e.__isReactDndBackendSetUp)throw new Error("Cannot have two HTML5 backends at the same time.");e.__isReactDndBackendSetUp=!0,this.addEventListeners(e)}}teardown(){const e=this.rootElement;if(e!==void 0&&(e.__isReactDndBackendSetUp=!1,this.removeEventListeners(this.rootElement),this.clearCurrentDragSourceNode(),this.asyncEndDragFrameId)){var t;(t=this.window)===null||t===void 0||t.cancelAnimationFrame(this.asyncEndDragFrameId)}}connectDragPreview(e,t,s){return this.sourcePreviewNodeOptions.set(e,s),this.sourcePreviewNodes.set(e,t),()=>{this.sourcePreviewNodes.delete(e),this.sourcePreviewNodeOptions.delete(e)}}connectDragSource(e,t,s){this.sourceNodes.set(e,t),this.sourceNodeOptions.set(e,s);const r=d=>this.handleDragStart(d,e),i=d=>this.handleSelectStart(d);return t.setAttribute("draggable","true"),t.addEventListener("dragstart",r),t.addEventListener("selectstart",i),()=>{this.sourceNodes.delete(e),this.sourceNodeOptions.delete(e),t.removeEventListener("dragstart",r),t.removeEventListener("selectstart",i),t.setAttribute("draggable","false")}}connectDropTarget(e,t){const s=d=>this.handleDragEnter(d,e),r=d=>this.handleDragOver(d,e),i=d=>this.handleDrop(d,e);return t.addEventListener("dragenter",s),t.addEventListener("dragover",r),t.addEventListener("drop",i),()=>{t.removeEventListener("dragenter",s),t.removeEventListener("dragover",r),t.removeEventListener("drop",i)}}addEventListeners(e){e.addEventListener&&(e.addEventListener("dragstart",this.handleTopDragStart),e.addEventListener("dragstart",this.handleTopDragStartCapture,!0),e.addEventListener("dragend",this.handleTopDragEndCapture,!0),e.addEventListener("dragenter",this.handleTopDragEnter),e.addEventListener("dragenter",this.handleTopDragEnterCapture,!0),e.addEventListener("dragleave",this.handleTopDragLeaveCapture,!0),e.addEventListener("dragover",this.handleTopDragOver),e.addEventListener("dragover",this.handleTopDragOverCapture,!0),e.addEventListener("drop",this.handleTopDrop),e.addEventListener("drop",this.handleTopDropCapture,!0))}removeEventListeners(e){e.removeEventListener&&(e.removeEventListener("dragstart",this.handleTopDragStart),e.removeEventListener("dragstart",this.handleTopDragStartCapture,!0),e.removeEventListener("dragend",this.handleTopDragEndCapture,!0),e.removeEventListener("dragenter",this.handleTopDragEnter),e.removeEventListener("dragenter",this.handleTopDragEnterCapture,!0),e.removeEventListener("dragleave",this.handleTopDragLeaveCapture,!0),e.removeEventListener("dragover",this.handleTopDragOver),e.removeEventListener("dragover",this.handleTopDragOverCapture,!0),e.removeEventListener("drop",this.handleTopDrop),e.removeEventListener("drop",this.handleTopDropCapture,!0))}getCurrentSourceNodeOptions(){const e=this.monitor.getSourceId(),t=this.sourceNodeOptions.get(e);return C({dropEffect:this.altKeyPressed?"copy":"move"},t||{})}getCurrentDropEffect(){return this.isDraggingNativeItem()?"copy":this.getCurrentSourceNodeOptions().dropEffect}getCurrentSourcePreviewNodeOptions(){const e=this.monitor.getSourceId(),t=this.sourcePreviewNodeOptions.get(e);return C({anchorX:.5,anchorY:.5,captureDraggingState:!1},t||{})}isDraggingNativeItem(){const e=this.monitor.getItemType();return Object.keys(y).some(t=>y[t]===e)}beginDragNativeItem(e,t){this.clearCurrentDragSourceNode(),this.currentNativeSource=Y(e,t),this.currentNativeHandle=this.registry.addSource(e,this.currentNativeSource),this.actions.beginDrag([this.currentNativeHandle])}setCurrentDragSourceNode(e){this.clearCurrentDragSourceNode(),this.currentDragSourceNode=e;const t=1e3;this.mouseMoveTimeoutTimer=setTimeout(()=>{var s;return(s=this.rootElement)===null||s===void 0?void 0:s.addEventListener("mousemove",this.endDragIfSourceWasRemovedFromDOM,!0)},t)}clearCurrentDragSourceNode(){if(this.currentDragSourceNode){if(this.currentDragSourceNode=null,this.rootElement){var e;(e=this.window)===null||e===void 0||e.clearTimeout(this.mouseMoveTimeoutTimer||void 0),this.rootElement.removeEventListener("mousemove",this.endDragIfSourceWasRemovedFromDOM,!0)}return this.mouseMoveTimeoutTimer=null,!0}return!1}handleDragStart(e,t){e.defaultPrevented||(this.dragStartSourceIds||(this.dragStartSourceIds=[]),this.dragStartSourceIds.unshift(t))}handleDragEnter(e,t){this.dragEnterTargetIds.unshift(t)}handleDragOver(e,t){this.dragOverTargetIds===null&&(this.dragOverTargetIds=[]),this.dragOverTargetIds.unshift(t)}handleDrop(e,t){this.dropTargetIds.unshift(t)}constructor(e,t,s){this.sourcePreviewNodes=new Map,this.sourcePreviewNodeOptions=new Map,this.sourceNodes=new Map,this.sourceNodeOptions=new Map,this.dragStartSourceIds=null,this.dropTargetIds=[],this.dragEnterTargetIds=[],this.currentNativeSource=null,this.currentNativeHandle=null,this.currentDragSourceNode=null,this.altKeyPressed=!1,this.mouseMoveTimeoutTimer=null,this.asyncEndDragFrameId=null,this.dragOverTargetIds=null,this.lastClientOffset=null,this.hoverRafId=null,this.getSourceClientOffset=r=>{const i=this.sourceNodes.get(r);return i&&H(i)||null},this.endDragNativeItem=()=>{this.isDraggingNativeItem()&&(this.actions.endDrag(),this.currentNativeHandle&&this.registry.removeSource(this.currentNativeHandle),this.currentNativeHandle=null,this.currentNativeSource=null)},this.isNodeInDocument=r=>!!(r&&this.document&&this.document.body&&this.document.body.contains(r)),this.endDragIfSourceWasRemovedFromDOM=()=>{const r=this.currentDragSourceNode;r==null||this.isNodeInDocument(r)||(this.clearCurrentDragSourceNode()&&this.monitor.isDragging()&&this.actions.endDrag(),this.cancelHover())},this.scheduleHover=r=>{this.hoverRafId===null&&typeof requestAnimationFrame<"u"&&(this.hoverRafId=requestAnimationFrame(()=>{this.monitor.isDragging()&&this.actions.hover(r||[],{clientOffset:this.lastClientOffset}),this.hoverRafId=null}))},this.cancelHover=()=>{this.hoverRafId!==null&&typeof cancelAnimationFrame<"u"&&(cancelAnimationFrame(this.hoverRafId),this.hoverRafId=null)},this.handleTopDragStartCapture=()=>{this.clearCurrentDragSourceNode(),this.dragStartSourceIds=[]},this.handleTopDragStart=r=>{if(r.defaultPrevented)return;const{dragStartSourceIds:i}=this;this.dragStartSourceIds=null;const d=E(r);this.monitor.isDragging()&&(this.actions.endDrag(),this.cancelHover()),this.actions.beginDrag(i||[],{publishSource:!1,getSourceClientOffset:this.getSourceClientOffset,clientOffset:d});const{dataTransfer:o}=r,c=I(o);if(this.monitor.isDragging()){if(o&&typeof o.setDragImage=="function"){const h=this.monitor.getSourceId(),f=this.sourceNodes.get(h),l=this.sourcePreviewNodes.get(h)||f;if(l){const{anchorX:a,anchorY:g,offsetX:v,offsetY:p}=this.getCurrentSourcePreviewNodeOptions(),T=V(f,l,d,{anchorX:a,anchorY:g},{offsetX:v,offsetY:p});o.setDragImage(l,T.x,T.y)}}try{o==null||o.setData("application/json",{})}catch{}this.setCurrentDragSourceNode(r.target);const{captureDraggingState:u}=this.getCurrentSourcePreviewNodeOptions();u?this.actions.publishDragSource():setTimeout(()=>this.actions.publishDragSource(),0)}else if(c)this.beginDragNativeItem(c);else{if(o&&!o.types&&(r.target&&!r.target.hasAttribute||!r.target.hasAttribute("draggable")))return;r.preventDefault()}},this.handleTopDragEndCapture=()=>{this.clearCurrentDragSourceNode()&&this.monitor.isDragging()&&this.actions.endDrag(),this.cancelHover()},this.handleTopDragEnterCapture=r=>{if(this.dragEnterTargetIds=[],this.isDraggingNativeItem()){var i;(i=this.currentNativeSource)===null||i===void 0||i.loadDataTransfer(r.dataTransfer)}if(!this.enterLeaveCounter.enter(r.target)||this.monitor.isDragging())return;const{dataTransfer:o}=r,c=I(o);c&&this.beginDragNativeItem(c,o)},this.handleTopDragEnter=r=>{const{dragEnterTargetIds:i}=this;if(this.dragEnterTargetIds=[],!this.monitor.isDragging())return;this.altKeyPressed=r.altKey,i.length>0&&this.actions.hover(i,{clientOffset:E(r)}),i.some(o=>this.monitor.canDropOnTarget(o))&&(r.preventDefault(),r.dataTransfer&&(r.dataTransfer.dropEffect=this.getCurrentDropEffect()))},this.handleTopDragOverCapture=r=>{if(this.dragOverTargetIds=[],this.isDraggingNativeItem()){var i;(i=this.currentNativeSource)===null||i===void 0||i.loadDataTransfer(r.dataTransfer)}},this.handleTopDragOver=r=>{const{dragOverTargetIds:i}=this;if(this.dragOverTargetIds=[],!this.monitor.isDragging()){r.preventDefault(),r.dataTransfer&&(r.dataTransfer.dropEffect="none");return}this.altKeyPressed=r.altKey,this.lastClientOffset=E(r),this.scheduleHover(i),(i||[]).some(o=>this.monitor.canDropOnTarget(o))?(r.preventDefault(),r.dataTransfer&&(r.dataTransfer.dropEffect=this.getCurrentDropEffect())):this.isDraggingNativeItem()?r.preventDefault():(r.preventDefault(),r.dataTransfer&&(r.dataTransfer.dropEffect="none"))},this.handleTopDragLeaveCapture=r=>{this.isDraggingNativeItem()&&r.preventDefault(),this.enterLeaveCounter.leave(r.target)&&(this.isDraggingNativeItem()&&setTimeout(()=>this.endDragNativeItem(),0),this.cancelHover())},this.handleTopDropCapture=r=>{if(this.dropTargetIds=[],this.isDraggingNativeItem()){var i;r.preventDefault(),(i=this.currentNativeSource)===null||i===void 0||i.loadDataTransfer(r.dataTransfer)}else I(r.dataTransfer)&&r.preventDefault();this.enterLeaveCounter.reset()},this.handleTopDrop=r=>{const{dropTargetIds:i}=this;this.dropTargetIds=[],this.actions.hover(i,{clientOffset:E(r)}),this.actions.drop({dropEffect:this.getCurrentDropEffect()}),this.isDraggingNativeItem()?this.endDragNativeItem():this.monitor.isDragging()&&this.actions.endDrag(),this.cancelHover()},this.handleSelectStart=r=>{const i=r.target;typeof i.dragDrop=="function"&&(i.tagName==="INPUT"||i.tagName==="SELECT"||i.tagName==="TEXTAREA"||i.isContentEditable||(r.preventDefault(),i.dragDrop()))},this.options=new q(t,s),this.actions=e.getActions(),this.monitor=e.getMonitor(),this.registry=e.getRegistry(),this.enterLeaveCounter=new j(this.isNodeInDocument)}}let N;function Q(){return N||(N=new Image,N.src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),N}const J=function(e,t,s){return new $(e,t,s)};export{J as HTML5Backend,y as NativeTypes,Q as getEmptyImage};
