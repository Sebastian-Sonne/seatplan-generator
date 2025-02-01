import{i as Y,c,B as m,D as Q,u as h,s as U,a as x,b as k,j as i,F as W,G as _,l as z,I as J,o as E,v as K,z as X,t as Z,J as ee,K as te,S as re,L as ne,M as N,N as se,O as $,Q as H,R as oe}from"./index-C-sK9tWO.js";import{H as ie}from"./H4-DpEsmjiN.js";var T,A;function ae(){return A||(A=1,T=function r(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var n,s,o;if(Array.isArray(e)){if(n=e.length,n!=t.length)return!1;for(s=n;s--!==0;)if(!r(e[s],t[s]))return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===t.toString();if(o=Object.keys(e),n=o.length,n!==Object.keys(t).length)return!1;for(s=n;s--!==0;)if(!Object.prototype.hasOwnProperty.call(t,o[s]))return!1;for(s=n;s--!==0;){var a=o[s];if(!r(e[a],t[a]))return!1}return!0}return e!==e&&t!==t}),T}var ce=ae();const de=Y(ce),v=typeof window<"u"?c.useLayoutEffect:c.useEffect;function le(r,e,t){const[n,s]=c.useState(()=>e(r)),o=c.useCallback(()=>{const a=e(r);de(n,a)||(s(a),t&&t())},[n,r,t]);return v(o),[n,o]}function ue(r,e,t){const[n,s]=le(r,e,t);return v(function(){const a=r.getHandlerId();if(a!=null)return r.subscribeToStateChange(s,{handlerIds:[a]})},[r,s]),n}function B(r,e,t){return ue(e,r||(()=>({})),()=>t.reconnect())}function G(r,e){const t=[];return typeof r!="function"&&t.push(r),c.useMemo(()=>typeof r=="function"?r():r,t)}function ge(r){return c.useMemo(()=>r.hooks.dragSource(),[r])}function he(r){return c.useMemo(()=>r.hooks.dragPreview(),[r])}let O=!1,y=!1;class fe{receiveHandlerId(e){this.sourceId=e}getHandlerId(){return this.sourceId}canDrag(){m(!O,"You may not call monitor.canDrag() inside your canDrag() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");try{return O=!0,this.internalMonitor.canDragSource(this.sourceId)}finally{O=!1}}isDragging(){if(!this.sourceId)return!1;m(!y,"You may not call monitor.isDragging() inside your isDragging() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");try{return y=!0,this.internalMonitor.isDraggingSource(this.sourceId)}finally{y=!1}}subscribeToStateChange(e,t){return this.internalMonitor.subscribeToStateChange(e,t)}isDraggingSource(e){return this.internalMonitor.isDraggingSource(e)}isOverTarget(e,t){return this.internalMonitor.isOverTarget(e,t)}getTargetIds(){return this.internalMonitor.getTargetIds()}isSourcePublic(){return this.internalMonitor.isSourcePublic()}getSourceId(){return this.internalMonitor.getSourceId()}subscribeToOffsetChange(e){return this.internalMonitor.subscribeToOffsetChange(e)}canDragSource(e){return this.internalMonitor.canDragSource(e)}canDropOnTarget(e){return this.internalMonitor.canDropOnTarget(e)}getItemType(){return this.internalMonitor.getItemType()}getItem(){return this.internalMonitor.getItem()}getDropResult(){return this.internalMonitor.getDropResult()}didDrop(){return this.internalMonitor.didDrop()}getInitialClientOffset(){return this.internalMonitor.getInitialClientOffset()}getInitialSourceClientOffset(){return this.internalMonitor.getInitialSourceClientOffset()}getSourceClientOffset(){return this.internalMonitor.getSourceClientOffset()}getClientOffset(){return this.internalMonitor.getClientOffset()}getDifferenceFromInitialOffset(){return this.internalMonitor.getDifferenceFromInitialOffset()}constructor(e){this.sourceId=null,this.internalMonitor=e.getMonitor()}}let j=!1;class pe{receiveHandlerId(e){this.targetId=e}getHandlerId(){return this.targetId}subscribeToStateChange(e,t){return this.internalMonitor.subscribeToStateChange(e,t)}canDrop(){if(!this.targetId)return!1;m(!j,"You may not call monitor.canDrop() inside your canDrop() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor");try{return j=!0,this.internalMonitor.canDropOnTarget(this.targetId)}finally{j=!1}}isOver(e){return this.targetId?this.internalMonitor.isOverTarget(this.targetId,e):!1}getItemType(){return this.internalMonitor.getItemType()}getItem(){return this.internalMonitor.getItem()}getDropResult(){return this.internalMonitor.getDropResult()}didDrop(){return this.internalMonitor.didDrop()}getInitialClientOffset(){return this.internalMonitor.getInitialClientOffset()}getInitialSourceClientOffset(){return this.internalMonitor.getInitialSourceClientOffset()}getSourceClientOffset(){return this.internalMonitor.getSourceClientOffset()}getClientOffset(){return this.internalMonitor.getClientOffset()}getDifferenceFromInitialOffset(){return this.internalMonitor.getDifferenceFromInitialOffset()}constructor(e){this.targetId=null,this.internalMonitor=e.getMonitor()}}function me(r,e,t){const n=t.getRegistry(),s=n.addTarget(r,e);return[s,()=>n.removeTarget(s)]}function ve(r,e,t){const n=t.getRegistry(),s=n.addSource(r,e);return[s,()=>n.removeSource(s)]}function M(r,e,t,n){let s;if(s!==void 0)return!!s;if(r===e)return!0;if(typeof r!="object"||!r||typeof e!="object"||!e)return!1;const o=Object.keys(r),a=Object.keys(e);if(o.length!==a.length)return!1;const d=Object.prototype.hasOwnProperty.bind(e);for(let l=0;l<o.length;l++){const g=o[l];if(!d(g))return!1;const p=r[g],f=e[g];if(s=void 0,s===!1||s===void 0&&p!==f)return!1}return!0}function P(r){return r!==null&&typeof r=="object"&&Object.prototype.hasOwnProperty.call(r,"current")}function De(r){if(typeof r.type=="string")return;const e=r.type.displayName||r.type.name||"the component";throw new Error(`Only native element nodes can now be passed to React DnD connectors.You can either wrap ${e} into a <div>, or turn it into a drag source or a drop target itself.`)}function Se(r){return(e=null,t=null)=>{if(!c.isValidElement(e)){const o=e;return r(o,t),o}const n=e;return De(n),we(n,t?o=>r(o,t):r)}}function V(r){const e={};return Object.keys(r).forEach(t=>{const n=r[t];if(t.endsWith("Ref"))e[t]=r[t];else{const s=Se(n);e[t]=()=>s}}),e}function F(r,e){typeof r=="function"?r(e):r.current=e}function we(r,e){const t=r.ref;return m(typeof t!="string","Cannot connect React DnD to an element with an existing string ref. Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. Read more: https://reactjs.org/docs/refs-and-the-dom.html#callback-refs"),t?c.cloneElement(r,{ref:n=>{F(t,n),F(e,n)}}):c.cloneElement(r,{ref:e})}class xe{receiveHandlerId(e){this.handlerId!==e&&(this.handlerId=e,this.reconnect())}get connectTarget(){return this.dragSource}get dragSourceOptions(){return this.dragSourceOptionsInternal}set dragSourceOptions(e){this.dragSourceOptionsInternal=e}get dragPreviewOptions(){return this.dragPreviewOptionsInternal}set dragPreviewOptions(e){this.dragPreviewOptionsInternal=e}reconnect(){const e=this.reconnectDragSource();this.reconnectDragPreview(e)}reconnectDragSource(){const e=this.dragSource,t=this.didHandlerIdChange()||this.didConnectedDragSourceChange()||this.didDragSourceOptionsChange();return t&&this.disconnectDragSource(),this.handlerId?e?(t&&(this.lastConnectedHandlerId=this.handlerId,this.lastConnectedDragSource=e,this.lastConnectedDragSourceOptions=this.dragSourceOptions,this.dragSourceUnsubscribe=this.backend.connectDragSource(this.handlerId,e,this.dragSourceOptions)),t):(this.lastConnectedDragSource=e,t):t}reconnectDragPreview(e=!1){const t=this.dragPreview,n=e||this.didHandlerIdChange()||this.didConnectedDragPreviewChange()||this.didDragPreviewOptionsChange();if(n&&this.disconnectDragPreview(),!!this.handlerId){if(!t){this.lastConnectedDragPreview=t;return}n&&(this.lastConnectedHandlerId=this.handlerId,this.lastConnectedDragPreview=t,this.lastConnectedDragPreviewOptions=this.dragPreviewOptions,this.dragPreviewUnsubscribe=this.backend.connectDragPreview(this.handlerId,t,this.dragPreviewOptions))}}didHandlerIdChange(){return this.lastConnectedHandlerId!==this.handlerId}didConnectedDragSourceChange(){return this.lastConnectedDragSource!==this.dragSource}didConnectedDragPreviewChange(){return this.lastConnectedDragPreview!==this.dragPreview}didDragSourceOptionsChange(){return!M(this.lastConnectedDragSourceOptions,this.dragSourceOptions)}didDragPreviewOptionsChange(){return!M(this.lastConnectedDragPreviewOptions,this.dragPreviewOptions)}disconnectDragSource(){this.dragSourceUnsubscribe&&(this.dragSourceUnsubscribe(),this.dragSourceUnsubscribe=void 0)}disconnectDragPreview(){this.dragPreviewUnsubscribe&&(this.dragPreviewUnsubscribe(),this.dragPreviewUnsubscribe=void 0,this.dragPreviewNode=null,this.dragPreviewRef=null)}get dragSource(){return this.dragSourceNode||this.dragSourceRef&&this.dragSourceRef.current}get dragPreview(){return this.dragPreviewNode||this.dragPreviewRef&&this.dragPreviewRef.current}clearDragSource(){this.dragSourceNode=null,this.dragSourceRef=null}clearDragPreview(){this.dragPreviewNode=null,this.dragPreviewRef=null}constructor(e){this.hooks=V({dragSource:(t,n)=>{this.clearDragSource(),this.dragSourceOptions=n||null,P(t)?this.dragSourceRef=t:this.dragSourceNode=t,this.reconnectDragSource()},dragPreview:(t,n)=>{this.clearDragPreview(),this.dragPreviewOptions=n||null,P(t)?this.dragPreviewRef=t:this.dragPreviewNode=t,this.reconnectDragPreview()}}),this.handlerId=null,this.dragSourceRef=null,this.dragSourceOptionsInternal=null,this.dragPreviewRef=null,this.dragPreviewOptionsInternal=null,this.lastConnectedHandlerId=null,this.lastConnectedDragSource=null,this.lastConnectedDragSourceOptions=null,this.lastConnectedDragPreview=null,this.lastConnectedDragPreviewOptions=null,this.backend=e}}class Ce{get connectTarget(){return this.dropTarget}reconnect(){const e=this.didHandlerIdChange()||this.didDropTargetChange()||this.didOptionsChange();e&&this.disconnectDropTarget();const t=this.dropTarget;if(this.handlerId){if(!t){this.lastConnectedDropTarget=t;return}e&&(this.lastConnectedHandlerId=this.handlerId,this.lastConnectedDropTarget=t,this.lastConnectedDropTargetOptions=this.dropTargetOptions,this.unsubscribeDropTarget=this.backend.connectDropTarget(this.handlerId,t,this.dropTargetOptions))}}receiveHandlerId(e){e!==this.handlerId&&(this.handlerId=e,this.reconnect())}get dropTargetOptions(){return this.dropTargetOptionsInternal}set dropTargetOptions(e){this.dropTargetOptionsInternal=e}didHandlerIdChange(){return this.lastConnectedHandlerId!==this.handlerId}didDropTargetChange(){return this.lastConnectedDropTarget!==this.dropTarget}didOptionsChange(){return!M(this.lastConnectedDropTargetOptions,this.dropTargetOptions)}disconnectDropTarget(){this.unsubscribeDropTarget&&(this.unsubscribeDropTarget(),this.unsubscribeDropTarget=void 0)}get dropTarget(){return this.dropTargetNode||this.dropTargetRef&&this.dropTargetRef.current}clearDropTarget(){this.dropTargetRef=null,this.dropTargetNode=null}constructor(e){this.hooks=V({dropTarget:(t,n)=>{this.clearDropTarget(),this.dropTargetOptions=n,P(t)?this.dropTargetRef=t:this.dropTargetNode=t,this.reconnect()}}),this.handlerId=null,this.dropTargetRef=null,this.dropTargetOptionsInternal=null,this.lastConnectedHandlerId=null,this.lastConnectedDropTarget=null,this.lastConnectedDropTargetOptions=null,this.backend=e}}function S(){const{dragDropManager:r}=c.useContext(Q);return m(r!=null,"Expected drag drop context"),r}function Ie(r,e){const t=S(),n=c.useMemo(()=>new xe(t.getBackend()),[t]);return v(()=>(n.dragSourceOptions=r||null,n.reconnect(),()=>n.disconnectDragSource()),[n,r]),v(()=>(n.dragPreviewOptions=e||null,n.reconnect(),()=>n.disconnectDragPreview()),[n,e]),n}function be(){const r=S();return c.useMemo(()=>new fe(r),[r])}class Te{beginDrag(){const e=this.spec,t=this.monitor;let n=null;return typeof e.item=="object"?n=e.item:typeof e.item=="function"?n=e.item(t):n={},n??null}canDrag(){const e=this.spec,t=this.monitor;return typeof e.canDrag=="boolean"?e.canDrag:typeof e.canDrag=="function"?e.canDrag(t):!0}isDragging(e,t){const n=this.spec,s=this.monitor,{isDragging:o}=n;return o?o(s):t===e.getSourceId()}endDrag(){const e=this.spec,t=this.monitor,n=this.connector,{end:s}=e;s&&s(t.getItem(),t),n.reconnect()}constructor(e,t,n){this.spec=e,this.monitor=t,this.connector=n}}function Oe(r,e,t){const n=c.useMemo(()=>new Te(r,e,t),[e,t]);return c.useEffect(()=>{n.spec=r},[r]),n}function ye(r){return c.useMemo(()=>{const e=r.type;return m(e!=null,"spec.type must be defined"),e},[r])}function je(r,e,t){const n=S(),s=Oe(r,e,t),o=ye(r);v(function(){if(o!=null){const[d,l]=ve(o,s,n);return e.receiveHandlerId(d),t.receiveHandlerId(d),l}},[n,e,t,s,o])}function Me(r,e){const t=G(r);m(!t.begin,"useDrag::spec.begin was deprecated in v14. Replace spec.begin() with spec.item(). (see more here - https://react-dnd.github.io/react-dnd/docs/api/use-drag)");const n=be(),s=Ie(t.options,t.previewOptions);return je(t,n,s),[B(t.collect,n,s),ge(s),he(s)]}function Pe(r){return c.useMemo(()=>r.hooks.dropTarget(),[r])}function ke(r){const e=S(),t=c.useMemo(()=>new Ce(e.getBackend()),[e]);return v(()=>(t.dropTargetOptions=r||null,t.reconnect(),()=>t.disconnectDropTarget()),[r]),t}function Re(){const r=S();return c.useMemo(()=>new pe(r),[r])}function Ee(r){const{accept:e}=r;return c.useMemo(()=>(m(r.accept!=null,"accept must be defined"),Array.isArray(e)?e:[e]),[e])}class Ne{canDrop(){const e=this.spec,t=this.monitor;return e.canDrop?e.canDrop(t.getItem(),t):!0}hover(){const e=this.spec,t=this.monitor;e.hover&&e.hover(t.getItem(),t)}drop(){const e=this.spec,t=this.monitor;if(e.drop)return e.drop(t.getItem(),t)}constructor(e,t){this.spec=e,this.monitor=t}}function $e(r,e){const t=c.useMemo(()=>new Ne(r,e),[e]);return c.useEffect(()=>{t.spec=r},[r]),t}function He(r,e,t){const n=S(),s=$e(r,e),o=Ee(r);v(function(){const[d,l]=me(o,s,n);return e.receiveHandlerId(d),t.receiveHandlerId(d),l},[n,e,s,t,o.map(a=>a.toString()).join("|")])}function Ae(r,e){const t=G(r),n=Re(),s=ke(t.options);return He(t,n,s),[B(t.collect,n,s),Pe(s)]}const Fe=(r,e)=>{const t=h(s=>s.grid.deskSetup[r][e]),n=h(s=>t!=null&&t.studentId?U(s,t.studentId):null);return{deskState:t,student:n}},qe=({row:r,col:e,disabled:t=!1})=>{const n=x(),s=k(),{student:o}=Fe(r,e),[a,d]=c.useState(!1),{index:l,type:g}=h(w=>w.grid.hoverState),p=l===r&&g==="row"||l===e&&g==="col",f=()=>n(W({row:r,col:e}));return i.jsx("button",{onClick:f,disabled:t,onMouseEnter:()=>d(!0),onMouseLeave:()=>d(!1),className:`h-16 flex justify-center items-center rounded-md transition-all relative text-default bg-card border-2 border-default shadow-md 
                ${p&&"!bg-background"}
                ${!t&&"hover:text-text hover:bg-error hover:border-error"}`,children:i.jsx("span",{className:"font-semibold break-words overflow-hidden leading-tight",children:t?(o==null?void 0:o.name)||"":s(a?"common.remove":"components.grid.desk")})})},Le=({disabled:r,row:e,col:t})=>{const n=x(),{index:s,type:o}=h(l=>l.grid.hoverState),a=s===e&&o==="row"||s===t&&o==="col",d=()=>n(_({row:e,col:t}));return i.jsx("button",{onClick:d,disabled:r,className:`h-16 flex justify-center items-center rounded-md border-2 border-border transition-all relative bg-element text-text-muted-extra 
                ${!r&&"hover:bg-element-hover hover:text-default hover:border-default"}
                ${r&&!a&&"!bg-transparent"}
                ${a&&"!bg-background"}`,children:r?"":"+"})},Ue=({row:r,col:e})=>{const{index:t,type:n}=h(o=>o.grid.hoverState),s=t===r&&n==="row"||t===e&&n==="col";return i.jsx("div",{className:`h-16 rounded-md border-2 border-border transition-all relative ${s&&"bg-background"}`})},ze=z("students/swapStudents",async({fromCoords:r,toCoords:e},{getState:t,dispatch:n})=>{const o=t().grid.deskSetup.map(l=>l.map(g=>({...g}))),a=o[r.row][r.col].studentId,d=o[e.row][e.col].studentId;o[r.row][r.col].studentId=d,o[e.row][e.col].studentId=a,n(J(o))}),Be=z("students/assignStudent",async({id:r,coords:e},{getState:t,dispatch:n})=>{const o=t().grid.deskSetup[e.row][e.col].studentId;o&&n(E({id:o,val:!1})),n(K({...e,id:r})),n(E({id:r,val:!0}))}),Ge=({row:r,col:e})=>{const t=x(),n=h(u=>u.grid.deskSetup[r][e]),s=h(u=>u.grid.dndState),{index:o,type:a}=h(u=>u.grid.hoverState),d=o===r&&a==="row"||o===e&&a==="col",[{isOver:l},g]=Ae(()=>({accept:"STUDENT",drop:u=>p({...u}),collect:u=>({isOver:!!u.isOver()})})),p=({id:u,fromCoords:C,action:D})=>{if(D==="set")t(Be({id:u,coords:{row:r,col:e}}));else if(D==="swap")t(ze({fromCoords:C,toCoords:{row:r,col:e}}));else throw new Error("Unkown action. Please check the FAQ for solutions.")},[{isDragging:f},w]=Me(()=>({type:"STUDENT",item:{id:null,fromCoords:{row:r,col:e},action:"swap"},collect:u=>({isDragging:!!u.isDragging()})})),b=u=>{n.studentId&&w(u),g(u)};return c.useEffect(()=>{f||t(X(l))},[l]),c.useEffect(()=>{t(Z(f))},[f]),i.jsx("div",{ref:b,className:Ye({isActive:d,isOver:l,dndState:s,deskState:n,isDragging:f}),children:i.jsx(Ve,{id:n.studentId,dndState:s})})},Ve=({id:r,dndState:e})=>{const t=h(s=>r?U(s,r):null),n=k();return i.jsx("span",{className:"font-semibold break-words overflow-hidden leading-tight select-none",children:(t==null?void 0:t.name)||i.jsx("span",{className:`font-semibold text-element-hover transition-colors ${e.isDragging&&"text-text-muted-extra"}`,children:n(e.isDragging?"screens.assign.dnd.dropHere":"common.na")})})},Ye=({isActive:r,isOver:e,dndState:t,deskState:n,isDragging:s})=>`h-16 flex justify-center items-center rounded-md transition-all relative text-default bg-element border-2 border-default shadow-md 
    ${r&&"!bg-background"}
    ${e&&"shadow-success border-success bg-element-hover"}
    ${t.isDragging&&!t.isOver&&"bg-element-hover shadow-md shadow-default"}
    ${n.studentId&&e&&"shadow-warning border-warning"}
    ${n.studentId?"cursor-pointer":"cursor-default"}
    ${s&&"opacity-15"}`,Qe=({row:r,col:e,disabled:t=!1})=>{const n=h(s=>s.grid.deskSetup[r][e]);return t?i.jsx(i.Fragment,{children:n.deskState===-1?i.jsx(Ue,{row:r,col:e}):i.jsx(Ge,{row:r,col:e})}):i.jsx(i.Fragment,{children:n.deskState===-1?i.jsx(Le,{row:r,col:e}):i.jsx(qe,{row:r,col:e,disabled:t})})},R=({text:r,children:e})=>{const[t,n]=c.useState(!1),[s,o]=c.useState(void 0),[a,d]=c.useState(!1);c.useEffect(()=>{d("ontouchstart"in window||navigator.maxTouchPoints>0)},[]);const l=()=>{if(!a){const p=window.setTimeout(()=>n(!0),500);o(p)}},g=()=>{a||(clearTimeout(s),n(!1))};return i.jsx(i.Fragment,{children:r?i.jsxs("div",{className:"relative inline-block",onMouseEnter:l,onMouseLeave:g,children:[e,t&&i.jsx("div",{className:"absolute bottom-full left-1/2 -translate-x-1/2 bg-element text-text-muted font-medium text-sm xl:text-nowrap p-2 rounded-lg z-50",children:r})]}):e})},q=({onClick:r,toolTipText:e=""})=>i.jsx(R,{text:e,children:i.jsx("button",{onClick:r,className:"w-10 aspect-square p-2 hover:bg-success transition-colors rounded-lg",children:i.jsx(ee,{})})}),We=({onClick:r,toolTipText:e=""})=>i.jsx(R,{text:e,children:i.jsx("button",{onClick:r,className:"w-10 aspect-square p-2 hover:bg-error transition-colors rounded-lg",children:i.jsx(te,{})})}),_e=({onClick:r,toolTipText:e=""})=>i.jsx(R,{text:e,children:i.jsx("button",{onClick:r,className:"w-10 aspect-square p-2 hover:bg-hover active:bg-active transition-colors rounded-lg",children:i.jsx(re,{color:"#419eaf"})})}),I=()=>i.jsx("button",{className:"w-10 aspect-square p-2 rounded-lg"}),Je=({type:r,index:e})=>{const t=x(),n=k(),s=()=>{t(ne({type:r==="row"?"col":"row",index:e}))},o=()=>{t(N({type:r==="row"?"col":"row",index:e}))},a=()=>{t(N({type:r==="row"?"col":"row",index:e+1}))},d=()=>{t(se({type:r==="row"?"col":"row",index:e}))};//! TODO fix word order for german
return i.jsxs(i.Fragment,{children:[i.jsxs("div",{className:`absolute flex ${r==="row"?"flex-col min-w-[calc(100%+16px)] -top-20":"flex-row items-center sm:right-full -left-12 z-50"}`,children:[i.jsx("div",{className:"flex justify-center ",children:i.jsx("div",{className:`bg-element hover:bg-element-hover ${r==="row"?"rounded-t-lg":"rounded-l-lg"} shadow-md`,children:i.jsx(I,{})})}),i.jsxs("div",{className:`flex ${r==="row"?"flex-row justify-between":"flex-col"} rounded-lg shadow-md`,children:[i.jsx(I,{}),i.jsx(I,{}),i.jsx(I,{})]})]}),i.jsxs("div",{className:`absolute flex ${r==="row"?"flex-col min-w-[calc(100%+16px)] -top-20":"flex-row items-center sm:right-full -left-12 z-50"} `,children:[i.jsx("div",{className:"flex justify-center ",children:i.jsx("div",{className:`bg-element hover:bg-element-hover ${r==="row"?"rounded-t-lg":"rounded-l-lg"}`,children:i.jsx(_e,{onClick:d,toolTipText:`${n("components.grid.toolTips.select")} ${n(`components.grid.${r}`)}`})})}),i.jsxs("div",{className:`flex ${r==="row"?"flex-row justify-between":"flex-col"} bg-element hover:bg-element-hover rounded-lg`,children:[i.jsx(q,{onClick:o,toolTipText:`${n("components.grid.toolTips.insert")} ${n(`components.grid.${r}`)}`}),i.jsx(We,{onClick:s,toolTipText:`${n("components.grid.toolTips.remove")} ${n(`components.grid.${r}`)}`}),i.jsx(q,{onClick:a,toolTipText:`${n("components.grid.toolTips.insert")} ${n(`components.grid.${r}`)}`})]})]})]})},L=({children:r,colIndex:e=-1,rowIndex:t=-1,disabled:n=!1})=>{const{type:s,index:o}=h(D=>D.grid.activeHeader),a=s==="row"?o===t:s==="col"?o===e:!1,d=x(),[l,g]=c.useState(!1),p=e!==-1?"row":"col",f=e!==-1?e:t,w=()=>{d($({type:e===-1?"row":"col",index:e===-1?t:e})),n||g(!0)},b=()=>{d($({type:null,index:-1})),n||g(!1)},u=D=>{D.stopPropagation(),d(H({type:e===-1?"row":"col",index:e===-1?t:e}))},C=()=>{g(!1),d(H({type:null,index:-1}))};return c.useEffect(()=>(document.addEventListener("click",C),()=>{document.removeEventListener("click",C)}),[]),i.jsx("div",{onMouseEnter:w,onMouseLeave:b,onClick:u,className:"relative flex justify-center items-center bg-element hover:bg-element-hover text-text-muted font-semibold py-1 px-1.5 rounded-md cursor-pointer transition-colors",children:i.jsxs(i.Fragment,{children:[r,(l||a&&!n)&&i.jsx(Je,{index:f,type:p})]})})},Ze=({disabled:r=!1})=>{var n,s;const e=h(o=>o.grid.deskSetup),t=((n=e[0])==null?void 0:n.map((o,a)=>String.fromCharCode(65+a)))||[];return i.jsxs(i.Fragment,{children:[i.jsxs("div",{className:"grid gap-2",style:{gridTemplateColumns:`auto repeat(${((s=e[0])==null?void 0:s.length)||1}, minmax(0, 1fr))`},children:[i.jsx("div",{}),t.map((o,a)=>i.jsx(L,{colIndex:a,rowIndex:-1,disabled:r,children:o},`header-col-${a}`)),e.map((o,a)=>i.jsxs(oe.Fragment,{children:[i.jsx(L,{rowIndex:a,colIndex:-1,disabled:r,children:a+1}),o.map((d,l)=>i.jsx(Qe,{row:a,col:l,disabled:r},`${a}-${l}`))]},`row-${a}`))]}),e.length===0&&i.jsx(ie,{value:"Oops... It seems like you didn't add any desks :("})]})};export{Ze as C,Ae as a,Me as u};
