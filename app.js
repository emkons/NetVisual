!function(e){function t(t){for(var n,i,r=t[0],o=t[1],a=0,c=[];a<r.length;a++)i=r[a],s[i]&&c.push(s[i][0]),s[i]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n]);for(d&&d(t);c.length;)c.shift()()}var n={},s={0:0};function i(t){if(n[t])return n[t].exports;var s=n[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.e=function(e){var t=[],n=s[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise(function(t,i){n=s[e]=[t,i]});t.push(n[2]=r);var o,a=document.createElement("script");a.charset="utf-8",a.timeout=120,i.nc&&a.setAttribute("nonce",i.nc),a.src=function(e){return i.p+""+({1:"layout"}[e]||e)+".js"}(e),o=function(t){a.onerror=a.onload=null,clearTimeout(d);var n=s[e];if(0!==n){if(n){var i=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src,o=new Error("Loading chunk "+e+" failed.\n("+i+": "+r+")");o.type=i,o.request=r,n[1](o)}s[e]=void 0}};var d=setTimeout(function(){o({type:"timeout",target:a})},12e4);a.onerror=a.onload=o,document.head.appendChild(a)}return Promise.all(t)},i.m=e,i.c=n,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i.oe=function(e){throw console.error(e),e};var r=window.webpackJsonp=window.webpackJsonp||[],o=r.push.bind(r);r.push=t,r=r.slice();for(var a=0;a<r.length;a++)t(r[a]);var d=o;i(i.s=12)}([function(e,t,n){var s=self.crypto||self.msCrypto;e.exports=function(e){e=e||21;for(var t="",n=s.getRandomValues(new Uint8Array(e));0<e--;)t+="Uint8ArdomValuesObj012345679BCDEFGHIJKLMNPQRSTWXYZ_cfghkpqvwxyz-"[63&n[e]];return t}},function(e,t,n){e.exports={container:"_27aoy","zoom-btn":"_2P67K",zoomBtn:"_2P67K"}},function(e,t,n){e.exports={start:"_1nsBz",stop:"_2rRno",layouts:"_2ECbp"}},function(e,t,n){e.exports={"add-btn":"XWh_d",addBtn:"XWh_d"}},function(e,t,n){"use strict";function s(e,t,n,s,a=!1,d=!0){const c=e.x-t.x,l=e.y-t.y;let h=i(c,l);if(a&&(h-=e.size+t.size),h>0){let i;o(t,c,l,h,-(i=r(s?-1/h:h/.1,n))),d&&o(e,c,l,h,i)}}function i(e,t){return Math.sqrt(e*e+t*t)}function r(e,t){return"number"==typeof t?.01*t/e:t(e)}function o(e,t,n,s,i){e.layoutProps.f.x+=t/s*i,e.layoutProps.f.y+=n/s*i}function a(e){const t=[],n=[];let s=e.map(e=>e.map(e=>e));let i=0;const r=s.length;let o=1/0,a=[];for(let e=0;e<r;e+=1)a.push(Math.random());let d=1;for(;o>.001&&i<1e4;){i+=1;const e=s.map(e=>e.reduce((e,t,n)=>e+t*a[n],0)),t=e.reduce((e,t)=>Math.abs(t)>e?Math.abs(t):e,-1/0),n=e.map(e=>e/t);a=n,o=Math.abs(t-d),d=t}t.push(d);const c=a.map(e=>e);n.push(c);let l=c;for(let e=0;e<r/2;e+=1){let e=-1/0;s.forEach(t=>{t.forEach(t=>{e=t>e?t:e})}),s=s.map((t,n)=>t.map((t,s)=>t-d*a[n]*a[s]/e)),i=0,o=1/0;const r=(a=a.map(e=>Math.random())).reduce((e,t,n)=>e+t*l[n],0);if(r>-1&&r<1){const e=l[0];a[0]=-r/e}for(;o>.001&&i<1e4;){i+=1;const e=s.map(e=>e.reduce((e,t,n)=>e+t*a[n],0)),t=e.reduce((e,t)=>Math.abs(t)>e?Math.abs(t):e,-1/0),n=e.map(e=>e/t);a=n,o=Math.abs(t-d),d=t}if(t.push(d),l=a.map(e=>e),n.push(a.map(e=>e)),Math.abs(Math.abs(a[0])-Math.abs(c[0]))>.01){n[1]=a,t[1]=d;break}}return{values:t,vectors:n}}n.d(t,"c",function(){return s}),n.d(t,"d",function(){return i}),n.d(t,"a",function(){return o}),n.d(t,"b",function(){return a})},function(e,t,n){"use strict";n.d(t,"a",function(){return r});var s=n(0),i=n.n(s);class r{constructor(){this.events={}}subscribe(e,t){e in this.events||(this.events[e]={});const n=i()();return this.events[e][n]=t,n}unsub(e,t){return e in this.events&&t in this.events[e]&&(delete this.events[e][t],!0)}dispatch(e,t){if(e in this.events)for(const n in this.events[e])this.events[e][n](t)}}},function(e,t,n){e.exports={container:"_36KXl"}},function(e,t,n){e.exports={controls:"JRCll"}},function(e,t,n){e.exports={"children-exiting":"_4mSPn",childrenExiting:"_4mSPn"}},function(e,t,n){e.exports={"status-bar":"_7vG4Z",statusBar:"_7vG4Z"}},function(e,t,n){e.exports={container:"_2upJf"}},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var s=function(){},i={},r=[],o=[];function a(e,t){var n,a,d,c,l=o;for(c=arguments.length;c-- >2;)r.push(arguments[c]);for(t&&null!=t.children&&(r.length||r.push(t.children),delete t.children);r.length;)if((a=r.pop())&&void 0!==a.pop)for(c=a.length;c--;)r.push(a[c]);else"boolean"==typeof a&&(a=null),(d="function"!=typeof e)&&(null==a?a="":"number"==typeof a?a=String(a):"string"!=typeof a&&(d=!1)),d&&n?l[l.length-1]+=a:l===o?l=[a]:l.push(a),n=d;var h=new s;return h.nodeName=e,h.children=l,h.attributes=null==t?void 0:t,h.key=null==t?void 0:t.key,void 0!==i.vnode&&i.vnode(h),h}function d(e,t){for(var n in t)e[n]=t[n];return e}function c(e,t){null!=e&&("function"==typeof e?e(t):e.current=t)}var l="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout;var h=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,u=[];function p(e){!e._dirty&&(e._dirty=!0)&&1==u.push(e)&&(i.debounceRendering||l)(g)}function g(){for(var e;e=u.pop();)e._dirty&&P(e)}function f(e,t){return e.normalizedNodeName===t||e.nodeName.toLowerCase()===t.toLowerCase()}function m(e){var t=d({},e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(void 0!==n)for(var s in n)void 0===t[s]&&(t[s]=n[s]);return t}function v(e){var t=e.parentNode;t&&t.removeChild(e)}function y(e,t,n,s,i){if("className"===t&&(t="class"),"key"===t);else if("ref"===t)c(n,null),c(s,e);else if("class"!==t||i)if("style"===t){if(s&&"string"!=typeof s&&"string"!=typeof n||(e.style.cssText=s||""),s&&"object"==typeof s){if("string"!=typeof n)for(var r in n)r in s||(e.style[r]="");for(var r in s)e.style[r]="number"==typeof s[r]&&!1===h.test(r)?s[r]+"px":s[r]}}else if("dangerouslySetInnerHTML"===t)s&&(e.innerHTML=s.__html||"");else if("o"==t[0]&&"n"==t[1]){var o=t!==(t=t.replace(/Capture$/,""));t=t.toLowerCase().substring(2),s?n||e.addEventListener(t,b,o):e.removeEventListener(t,b,o),(e._listeners||(e._listeners={}))[t]=s}else if("list"!==t&&"type"!==t&&!i&&t in e){try{e[t]=null==s?"":s}catch(e){}null!=s&&!1!==s||"spellcheck"==t||e.removeAttribute(t)}else{var a=i&&t!==(t=t.replace(/^xlink:?/,""));null==s||!1===s?a?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.removeAttribute(t):"function"!=typeof s&&(a?e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),s):e.setAttribute(t,s))}else e.className=s||""}function b(e){return this._listeners[e.type](i.event&&i.event(e)||e)}var x=[],E=0,_=!1,C=!1;function w(){for(var e;e=x.shift();)i.afterMount&&i.afterMount(e),e.componentDidMount&&e.componentDidMount()}function j(e,t,n,s,i,r){E++||(_=null!=i&&void 0!==i.ownerSVGElement,C=null!=e&&!("__preactattr_"in e));var o=L(e,t,n,s,r);return i&&o.parentNode!==i&&i.appendChild(o),--E||(C=!1,r||w()),o}function L(e,t,n,s,i){var r=e,o=_;if(null!=t&&"boolean"!=typeof t||(t=""),"string"==typeof t||"number"==typeof t)return e&&void 0!==e.splitText&&e.parentNode&&(!e._component||i)?e.nodeValue!=t&&(e.nodeValue=t):(r=document.createTextNode(t),e&&(e.parentNode&&e.parentNode.replaceChild(r,e),N(e,!0))),r.__preactattr_=!0,r;var a,d,c=t.nodeName;if("function"==typeof c)return function(e,t,n,s){var i=e&&e._component,r=i,o=e,a=i&&e._componentConstructor===t.nodeName,d=a,c=m(t);for(;i&&!d&&(i=i._parentComponent);)d=i.constructor===t.nodeName;i&&d&&(!s||i._component)?(M(i,c,3,n,s),e=i.base):(r&&!a&&(z(r),e=o=null),i=O(t.nodeName,c,n),e&&!i.nextBase&&(i.nextBase=e,o=null),M(i,c,1,n,s),e=i.base,o&&e!==o&&(o._component=null,N(o,!1)));return e}(e,t,n,s);if(_="svg"===c||"foreignObject"!==c&&_,c=String(c),(!e||!f(e,c))&&(a=c,(d=_?document.createElementNS("http://www.w3.org/2000/svg",a):document.createElement(a)).normalizedNodeName=a,r=d,e)){for(;e.firstChild;)r.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(r,e),N(e,!0)}var l=r.firstChild,h=r.__preactattr_,u=t.children;if(null==h){h=r.__preactattr_={};for(var p=r.attributes,g=p.length;g--;)h[p[g].name]=p[g].value}return!C&&u&&1===u.length&&"string"==typeof u[0]&&null!=l&&void 0!==l.splitText&&null==l.nextSibling?l.nodeValue!=u[0]&&(l.nodeValue=u[0]):(u&&u.length||null!=l)&&function(e,t,n,s,i){var r,o,a,d,c,l=e.childNodes,h=[],u={},p=0,g=0,m=l.length,y=0,b=t?t.length:0;if(0!==m)for(var x=0;x<m;x++){var E=l[x],_=E.__preactattr_,C=b&&_?E._component?E._component.__key:_.key:null;null!=C?(p++,u[C]=E):(_||(void 0!==E.splitText?!i||E.nodeValue.trim():i))&&(h[y++]=E)}if(0!==b)for(var x=0;x<b;x++){d=t[x],c=null;var C=d.key;if(null!=C)p&&void 0!==u[C]&&(c=u[C],u[C]=void 0,p--);else if(g<y)for(r=g;r<y;r++)if(void 0!==h[r]&&(w=o=h[r],S=i,"string"==typeof(j=d)||"number"==typeof j?void 0!==w.splitText:"string"==typeof j.nodeName?!w._componentConstructor&&f(w,j.nodeName):S||w._componentConstructor===j.nodeName)){c=o,h[r]=void 0,r===y-1&&y--,r===g&&g++;break}c=L(c,d,n,s),a=l[x],c&&c!==e&&c!==a&&(null==a?e.appendChild(c):c===a.nextSibling?v(a):e.insertBefore(c,a))}var w,j,S;if(p)for(var x in u)void 0!==u[x]&&N(u[x],!1);for(;g<=y;)void 0!==(c=h[y--])&&N(c,!1)}(r,u,n,s,C||null!=h.dangerouslySetInnerHTML),function(e,t,n){var s;for(s in n)t&&null!=t[s]||null==n[s]||y(e,s,n[s],n[s]=void 0,_);for(s in t)"children"===s||"innerHTML"===s||s in n&&t[s]===("value"===s||"checked"===s?e[s]:n[s])||y(e,s,n[s],n[s]=t[s],_)}(r,t.attributes,h),_=o,r}function N(e,t){var n=e._component;n?z(n):(null!=e.__preactattr_&&c(e.__preactattr_.ref,null),!1!==t&&null!=e.__preactattr_||v(e),S(e))}function S(e){for(e=e.lastChild;e;){var t=e.previousSibling;N(e,!0),e=t}}var A=[];function O(e,t,n){var s,i=A.length;for(e.prototype&&e.prototype.render?(s=new e(t,n),I.call(s,t,n)):((s=new I(t,n)).constructor=e,s.render=k);i--;)if(A[i].constructor===e)return s.nextBase=A[i].nextBase,A.splice(i,1),s;return s}function k(e,t,n){return this.constructor(e,n)}function M(e,t,n,s,r){e._disable||(e._disable=!0,e.__ref=t.ref,e.__key=t.key,delete t.ref,delete t.key,void 0===e.constructor.getDerivedStateFromProps&&(!e.base||r?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(t,s)),s&&s!==e.context&&(e.prevContext||(e.prevContext=e.context),e.context=s),e.prevProps||(e.prevProps=e.props),e.props=t,e._disable=!1,0!==n&&(1!==n&&!1===i.syncComponentUpdates&&e.base?p(e):P(e,1,r)),c(e.__ref,e))}function P(e,t,n,s){if(!e._disable){var r,o,a,c=e.props,l=e.state,h=e.context,u=e.prevProps||c,p=e.prevState||l,g=e.prevContext||h,f=e.base,v=e.nextBase,y=f||v,b=e._component,_=!1,C=g;if(e.constructor.getDerivedStateFromProps&&(l=d(d({},l),e.constructor.getDerivedStateFromProps(c,l)),e.state=l),f&&(e.props=u,e.state=p,e.context=g,2!==t&&e.shouldComponentUpdate&&!1===e.shouldComponentUpdate(c,l,h)?_=!0:e.componentWillUpdate&&e.componentWillUpdate(c,l,h),e.props=c,e.state=l,e.context=h),e.prevProps=e.prevState=e.prevContext=e.nextBase=null,e._dirty=!1,!_){r=e.render(c,l,h),e.getChildContext&&(h=d(d({},h),e.getChildContext())),f&&e.getSnapshotBeforeUpdate&&(C=e.getSnapshotBeforeUpdate(u,p));var L,S,A=r&&r.nodeName;if("function"==typeof A){var k=m(r);(o=b)&&o.constructor===A&&k.key==o.__key?M(o,k,1,h,!1):(L=o,e._component=o=O(A,k,h),o.nextBase=o.nextBase||v,o._parentComponent=e,M(o,k,0,h,!1),P(o,1,n,!0)),S=o.base}else a=y,(L=b)&&(a=e._component=null),(y||1===t)&&(a&&(a._component=null),S=j(a,r,h,n||!f,y&&y.parentNode,!0));if(y&&S!==y&&o!==b){var I=y.parentNode;I&&S!==I&&(I.replaceChild(S,y),L||(y._component=null,N(y,!1)))}if(L&&z(L),e.base=S,S&&!s){for(var R=e,B=e;B=B._parentComponent;)(R=B).base=S;S._component=R,S._componentConstructor=R.constructor}}for(!f||n?x.push(e):_||(e.componentDidUpdate&&e.componentDidUpdate(u,p,C),i.afterUpdate&&i.afterUpdate(e));e._renderCallbacks.length;)e._renderCallbacks.pop().call(e);E||s||w()}}function z(e){i.beforeUnmount&&i.beforeUnmount(e);var t=e.base;e._disable=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var n=e._component;n?z(n):t&&(null!=t.__preactattr_&&c(t.__preactattr_.ref,null),e.nextBase=t,v(t),A.push(e),S(t)),c(e.__ref,null)}function I(e,t){this._dirty=!0,this.context=t,this.props=e,this.state=this.state||{},this._renderCallbacks=[]}function R(e,t,n){return j(n,e,{},!1,t,!1)}d(I.prototype,{setState:function(e,t){this.prevState||(this.prevState=this.state),this.state=d(d({},this.state),"function"==typeof e?e(this.state,this.props):e),t&&this._renderCallbacks.push(t),p(this)},forceUpdate:function(e){e&&this._renderCallbacks.push(e),P(this,2)},render:function(){}});var B=n(6),T=n(4);function D(e){return"string"==typeof e||"number"==typeof e}function U(e){return!!Array.isArray(e)&&e.every(e=>D(e))}function W(e){return e instanceof HTMLCanvasElement}function F(e,t){return(Array.isArray(e)?e:e.split(".")).reduce((e,t)=>e&&e[t],t)}function X(e){const t=e.edges(),n=(e,t,n)=>t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y),s=(e,t,n)=>{const s=(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y);return 0===s?0:s>0?1:2},i=(e,t)=>e.x===t.x&&e.y===t.y;let r=0;return t.forEach(e=>{t.forEach(t=>{e!==t&&(r+=((e,t,r,o)=>{if(i(e,r)||i(e,o)||i(t,r)||i(t,o))return!1;const a=s(e,t,r),d=s(e,t,o),c=s(r,o,e),l=s(r,o,t);return a!==d&&c!==l||!(0!==a||!n(e,r,t))||!(0!==d||!n(e,o,t))||!(0!==c||!n(r,e,o))||!(0!==l||!n(r,t,o))})(e.source,e.target,t.source,t.target)?1:0)})}),r/2}class q{constructor(e,t){this.root=e,this.settings=e.settings,this.options=t}init(e,t){this.initSettings(e),this.setOption("type",this),this.initComponent(t)}initSettings(e){this.getOption=this.settings.namespacedGetter(e),this.setOption=this.settings.namespacedSetter(e)}}var H=n(0),Y=n.n(H);class $ extends q{constructor(e,t){super(e,t),this.nodesArray=[],this.edgesArray=[],this.namespace="graphy.graph",this.nodesIndex={},this.edgesIndex={},this.adjacencyListIn={},this.adjacencyListOut={},this.adjacencyListAll={},this.init(this.namespace),t&&this.parseGraph(t)}initComponent(){}addNode(e){if(this.nodesIndex[e.id])throw`Node with id ${e.id} already exists`;return e.data&&"number"==typeof e.data.x&&(e.x=e.data.x),e.data&&"number"==typeof e.data.y&&(e.y=e.data.y),e.x||(e.x=500*Math.random()),e.y||(e.y=500*Math.random()),this.adjacencyListIn[e.id]={},this.adjacencyListOut[e.id]={},this.adjacencyListAll[e.id]={},this.nodesArray.push(e),this.nodesIndex[e.id]=e,this.root.events.dispatch("addNode",e),this}parseGraph(e){e.nodes&&e.nodes.forEach(e=>{this.addNode(e)}),e.edges&&e.edges.forEach(e=>{this.addEdge(e)})}clear(){this.nodesArray.length=0,this.edgesArray.length=0,this._clearObj(this.nodesIndex),this._clearObj(this.edgesIndex),this._clearObj(this.adjacencyListIn),this._clearObj(this.adjacencyListOut),this._clearObj(this.adjacencyListAll)}_clearObj(e){for(const t of Object.keys(e))delete e[t]}dropNode(e){if(!this.nodesIndex[e])throw`Node with id ${e} doesn't exist`;delete this.nodesIndex[e],this.nodesArray=this.nodesArray.filter(t=>t.id!==e),this.edgesArray.forEach(t=>{t.source.id!==e&&t.target.id!==e||this.dropEdge(t.id)}),delete this.adjacencyListIn[e],delete this.adjacencyListOut[e],delete this.adjacencyListAll[e];for(const t in this.nodesIndex)delete this.adjacencyListIn[t][e],delete this.adjacencyListOut[t][e],delete this.adjacencyListAll[t][e];return this.root.events.dispatch("removeNode",e),this}addEdge(e){if(this.edgesIndex[e.id])throw`Edge with id ${e.id} already exists`;return"string"==typeof e.source&&(e.source=this.nodesIndex[e.source]),"string"==typeof e.target&&(e.target=this.nodesIndex[e.target]),void 0===e.id&&(e.id=Y()()),this.edgesArray.push(e),this.edgesIndex[e.id]=e,this.adjacencyListIn[e.target.id][e.source.id]||(this.adjacencyListIn[e.target.id][e.source.id]={}),this.adjacencyListOut[e.source.id][e.target.id]||(this.adjacencyListOut[e.source.id][e.target.id]={}),this.adjacencyListAll[e.source.id][e.target.id]||(this.adjacencyListAll[e.source.id][e.target.id]={}),this.adjacencyListAll[e.target.id][e.source.id]||(this.adjacencyListAll[e.target.id][e.source.id]={}),this.adjacencyListIn[e.target.id][e.source.id][e.id]=e,this.adjacencyListOut[e.source.id][e.target.id][e.id]=e,this.adjacencyListAll[e.target.id][e.source.id][e.id]=e,this.adjacencyListAll[e.source.id][e.target.id][e.id]=e,this.root.events.dispatch("addEdge",e),this}dropEdge(e){if(!this.edgesIndex[e])throw`Edge with id ${e} doesn't exist`;const t=this.edgesIndex[e];return delete this.edgesIndex[e],this.edgesArray=this.edgesArray.filter(t=>t.id!==e),delete this.adjacencyListIn[t.target.id][t.source.id][t.id],Object.keys(this.adjacencyListIn[t.target.id][t.source.id]).length&&delete this.adjacencyListIn[t.target.id][t.source.id],delete this.adjacencyListOut[t.source.id][t.target.id][t.id],Object.keys(this.adjacencyListIn[t.source.id][t.target.id]).length&&delete this.adjacencyListIn[t.source.id][t.target.id],delete this.adjacencyListAll[t.target.id][t.source.id][t.id],Object.keys(this.adjacencyListAll[t.target.id][t.source.id]).length&&delete this.adjacencyListAll[t.target.id][t.source.id],t.source!==t.target&&(delete this.adjacencyListAll[t.source.id][t.target.id][t.id],Object.keys(this.adjacencyListAll[t.source.id][t.target.id]).length&&delete this.adjacencyListAll[t.source.id][t.target.id]),this.root.events.dispatch("removeEdge",t),this}get nodesCount(){return this.nodesArray.length}get edgesCount(){return this.edgesArray.length}nodes(e){if(!e)return this.nodesArray;if(D(e))return this.nodesIndex[e];if(U(e))return e.map(e=>this.nodesIndex[e]);throw"nodes: Wrong arguments."}edges(e){if(!e)return this.edgesArray;if(D(e))return this.edgesIndex[e];if(U(e))return e.map(e=>this.edgesIndex[e]);throw"edges: Wrong arguments."}getDegree(e){return Object.keys(this.adjacencyListAll[e.id]).length}calcPaths(){const e=this.nodesArray;return e.forEach(t=>{t.layoutProps.dist={},e.forEach(e=>{t.layoutProps.dist[e.id]=1/0})}),e.forEach(t=>{const n=t.layoutProps.dist;n[t.id]=0;const s=[];for(e.forEach(e=>{s.push(e)});s.length>0;){let e=1/0,t=null,i=-1;s.forEach((t,s)=>{n[t.id]<e&&(i=s)}),[s[i],s[s.length-1]]=[s[s.length-1],s[i]],t=s.pop(),e=n[t.id],Object.keys(this.adjacencyListAll[t.id]).forEach(e=>{n[t.id]+1<n[e]&&(n[e]=n[t.id]+1)})}e.forEach(e=>{n[e.id]})}),e}}class G{constructor(){this.data={default:{defaultNodeSize:10,defaultEdgeWidth:2,defaultEdgeColor:"#7777",defaultNodeColor:"#000"}},this.get=this.get.bind(this),this.set=this.set.bind(this)}get(e,t){return t?function(e,t,n){let s,i=e;for(;-1!==i.indexOf(".")&&!s;)s=F(`${i}.${t}`,n),i=i.substr(0,i.lastIndexOf("."));return s}(t,e,this.data)||this.data.default[e]:this.data[e]}set(e,t,n){var s,i;n?(s=n,i=this.data,(Array.isArray(s)?s:s.split(".")).reduce((e,t)=>e[t]=e[t]||{},i))[e]=t:this.data[e]=t}namespacedGetter(e){return t=>this.get(t,e)}namespacedSetter(e){return(t,n)=>{this.set(t,n,e)}}}class V extends q{constructor(e,t,n){super(e,t),this.namespace="graphy.renderer",this.graph=n}initComponent(){}}class K{render(e,t,n){t.save(),e.camProps.hover?t.fillStyle="#f00":t.fillStyle=e.color||n("defaultNodeColor"),t.beginPath(),t.arc(e.camProps.x,e.camProps.y,e.camProps.size,0,2*Math.PI),t.closePath(),t.fill(),t.restore()}}class Z{render(e,t,n){t.save(),t.strokeStyle=e.color||n("defaultEdgeColor"),t.lineWidth=n("defaultEdgeWidth"),t.beginPath(),t.moveTo(e.source.camProps.x,e.source.camProps.y),t.lineTo(e.target.camProps.x,e.target.camProps.y),t.stroke(),t.restore()}}class J extends V{constructor(e,t,n){super(e,t,n),this.namespace="graphy.renderer.canvas",this.queuedRender=!1,this.domElements=[],this.contexts={},this.nodeRenderers={},this.edgeRenderers={},this.shouldAddEdge=!1,this.addingEdge={source:null,target:null},this.tmpEdge=null,this.init(this.namespace,t)}initComponent(e){if(!(e&&e.container instanceof HTMLElement))throw"Container not found.";this.render=this.render.bind(this),this.queueRender=this.queueRender.bind(this),this.root.events.subscribe("render",this.queueRender),this.container=e.container,this.initDOM("canvas","scene"),this.contexts.edges=this.contexts.scene,this.contexts.nodes=this.contexts.scene,this.contexts.labels=this.contexts.scene,this.registerNodeRenderer("default",new K),this.registerEdgeRenderer("default",new Z),this.addEventListeners(),this.resize()}initDOM(e,t){const n=document.createElement(e);n.style.position="absolute",n.className="graphy-"+t,this.container.appendChild(n),this.domElements.push(n),W(n)&&(this.contexts[t]=n.getContext("2d"))}queueRender(){this.queuedRender||(this.queuedRender=!0,requestAnimationFrame(this.render))}addEventListeners(){this.container.addEventListener("resize",()=>{this.resize()}),this.domElements.forEach(e=>{if(W(e)){let t=[];const n=e=>{const n=this.graph.nodes().filter(t=>{const n=t.camProps.x-e.clientX,s=t.camProps.y-e.clientY,i=t.camProps.size;return n*n+s*s<i*i});n.forEach(e=>{e.camProps.hover=!0,this.root.events.dispatch("hoverNode",e)}),t.filter(e=>-1===n.indexOf(e)).forEach(e=>{e.camProps.hover=!1,this.root.events.dispatch("hoverNodeEnd",e)}),t=n,null!==this.addingEdge.source&&null===this.addingEdge.target?(this.tmpEdge={id:"tmpNodeID",source:this.addingEdge.source,target:{id:"tmpEdgeID",camProps:{x:e.clientX,y:e.clientY,size:10}}},this.root.events.dispatch("render",null)):this.tmpEdge=null};e.addEventListener("click",e=>{t.length?(this.root.events.dispatch("nodeClick",t[0]),this.shouldAddEdge&&null===this.addingEdge.source?this.addingEdge.source=t[0]:this.shouldAddEdge&&null!==this.addingEdge.source&&(this.addingEdge.target=t[0],this.root.graph.addEdge(Object.assign({},this.addingEdge,{id:"generated"+Math.floor(1e3*Math.random())})),this.shouldAddEdge=!1)):this.root.events.dispatch("nodeClick",null)}),e.addEventListener("wheel",e=>{e.preventDefault(),this.root.events.dispatch("scroll",e)}),e.addEventListener("mousedown",e=>{this.root.events.dispatch("dragStart",e)}),e.addEventListener("touchstart",e=>{console.log(e),1===e.touches.length&&(e.preventDefault(),this.root.events.dispatch("dragStart",e.touches[0]))}),e.addEventListener("mousemove",e=>{n(e),this.root.events.dispatch("drag",e)}),e.addEventListener("touchmove",e=>{1===e.touches.length&&(e.preventDefault(),n(e),this.root.events.dispatch("drag",e.touches[0]))}),e.addEventListener("mouseup",e=>{this.root.events.dispatch("dragEnd",e)}),e.addEventListener("touchend",e=>{1===e.touches.length&&(e.preventDefault(),this.root.events.dispatch("dragEnd",e.touches[0]))})}}),this.root.events.subscribe("startEdgeAdd",()=>{this.addingEdge={source:null,target:null},this.shouldAddEdge=!0})}resize(e,t){const n=this.width,s=this.height;void 0!==e&&void 0!==t?(this.width=e,this.height=t):(this.width=this.container.offsetWidth,this.height=this.container.offsetHeight),n===this.width&&s===this.height||this.domElements.forEach(e=>{e.style.width=this.width+"px",e.style.width=this.width+"px",W(e)&&(e.width=this.width,e.height=this.height),console.log("resized",this.width,this.height)})}render(e={}){const t=this.graph,n=this.root.camera.getNodeCoords(t.nodes()),s=t.edges();if(this.resize(),this.clear(),Object.values(s).forEach(e=>{e.type&&this.edgeRenderers[e.type]?this.edgeRenderers[e.type].render(e,this.contexts.edges,this.getOption):this.edgeRenderers.default.render(e,this.contexts.edges,this.getOption)}),this.tmpEdge){const e=this.tmpEdge;e.type&&this.edgeRenderers[e.type]?this.edgeRenderers[e.type].render(e,this.contexts.edges,this.getOption):this.edgeRenderers.default.render(e,this.contexts.edges,this.getOption)}return Object.values(n).forEach(e=>{e.type&&this.nodeRenderers[e.type]?this.nodeRenderers[e.type].render(e,this.contexts.nodes,this.getOption):this.nodeRenderers.default.render(e,this.contexts.nodes,this.getOption)}),this.queuedRender=!1,this}clear(){Object.values(this.contexts).forEach(e=>{e.clearRect(0,0,this.width,this.height)})}registerNodeRenderer(e,t){this.nodeRenderers[e]=t}registerEdgeRenderer(e,t){this.edgeRenderers[e]=t}}var Q=n(5);class ee extends q{constructor(e,t){super(e,t),this.x=0,this.y=0,this.zoom=1,this.namespace="graphy.camera",this.init(this.namespace,t)}initComponent(){this.root.events.subscribe("scroll",e=>{e.clientX&&(this.x-=e.clientX/this.zoom,this.y-=e.clientY/this.zoom),this.zoom-=e.deltaY/1e3,this.zoom=Math.max(this.zoom,.1),e.clientX&&(this.x+=e.clientX/this.zoom,this.y+=e.clientY/this.zoom),this.root.events.dispatch("zoomChanged",this.zoom),this.root.events.dispatch("render",null)}),this.root.events.subscribe("dragStart",e=>{this.dragStart={x:e.clientX,y:e.clientY}}),this.root.events.subscribe("drag",e=>{this.dragStart&&(this.x+=(e.clientX-this.dragStart.x)/this.zoom,this.y+=(e.clientY-this.dragStart.y)/this.zoom,this.dragStart={x:e.clientX,y:e.clientY},this.root.events.dispatch("render",null))}),this.root.events.subscribe("dragEnd",e=>{this.dragStart=null}),this.root.events.subscribe("hoverNode",e=>{this.root.events.dispatch("render",null)}),this.root.events.subscribe("hoverNodeEnd",e=>{this.root.events.dispatch("render",null)})}goTo(e){this.x=e.x,this.y=e.y,e.zoom&&(this.zoom=e.zoom)}coordsFromScreen(e,t){return{x:e/this.zoom+this.x,y:t/this.zoom+this.y}}getNodeCoords(e){return e.map(e=>(e.camProps||(e.camProps={x:0,y:0,size:0}),e.camProps.x=(e.x+this.x)*this.zoom,e.camProps.y=(e.y+this.y)*this.zoom,e.camProps.size=(e.size||this.getOption("defaultNodeSize"))*this.zoom,e))}}const te=new class{constructor(e){this.namespace="graphy",this.settings=new G,this.initOptions(this.namespace),this.events=new Q.a,this.camera=new ee(this,e.camera),this.graph=new $(this,e.graph),e.renderer&&(this.renderer=new J(this,e.renderer,this.graph),this.renderer.render())}initOptions(e){this.getOption=this.settings.namespacedGetter(e),this.setOption=this.settings.namespacedSetter(e)}initComponent(){}}({});var ne=class extends I{constructor(){super(...arguments),this.state={sigma:null}}render(){return a("div",{ref:e=>this.container=e,class:`${B.container}`,id:"main-container"})}componentDidMount(){const e={nodes:[],edges:[]};let t=0;for(let n=0;n<10;n+=1){e.nodes.push({id:"n"+n,x:1e3*Math.random(),y:800*Math.random(),color:"#666"});for(let s=0;s<Math.ceil(2*Math.random());s+=1)e.edges.push({id:"e"+t,source:"n"+n,target:"n"+(Math.random()*n|0),color:"#666"}),t+=1}te.graph.clear(),te.graph.parseGraph(e),te.renderer=new J(te,{container:this.container},te.graph),te.events.dispatch("render",null)}},se=n(7),ie=function(e,t,n,s){return new(n||(n=Promise))(function(i,r){function o(e){try{d(s.next(e))}catch(e){r(e)}}function a(e){try{d(s.throw(e))}catch(e){r(e)}}function d(e){e.done?i(e.value):new n(function(t){t(e.value)}).then(o,a)}d((s=s.apply(e,t||[])).next())})};var re=n(8),oe=function(e,t,n,s){return new(n||(n=Promise))(function(i,r){function o(e){try{d(s.next(e))}catch(e){r(e)}}function a(e){try{d(s.throw(e))}catch(e){r(e)}}function d(e){e.done?i(e.value):new n(function(t){t(e.value)}).then(o,a)}d((s=s.apply(e,t||[])).next())})};class ae extends I{constructor(){super(...arguments),this.state={outgoingChildren:[]},this.lastElHeight=0}componentWillReceiveProps(e){const t=this.props.children;!e.children[0]&&t[0]&&this.setState({outgoingChildren:t})}componentWillUpdate(e){const t=this.props.children,n=e.children;t[0]&&n[0]||!t[0]&&!n[0]||(this.lastElHeight=this.base.getBoundingClientRect().height)}componentDidUpdate(e){return oe(this,void 0,void 0,function*(){const t=this.props.children,n=e.children;if(t[0]&&n[0]||!t[0]&&!n[0])return;this.base.style.height="",this.base.style.overflow="hidden";const s=t[0]?this.base.getBoundingClientRect().height:0;yield function(e,t){return ie(this,void 0,void 0,function*(){const{from:n=e.getBoundingClientRect().height,to:s=e.getBoundingClientRect().height,duration:i=1e3,easing:r="ease-in-out"}=t;if(n!==s&&0!==i)return e.style.height=n+"px",getComputedStyle(e).transform,e.style.transition=`height ${i}ms ${r}`,e.style.height=s+"px",new Promise(t=>{const n=s=>{s.target===e&&(e.style.transition="",e.removeEventListener("transitionend",n),e.removeEventListener("transitioncancel",n),t())};e.addEventListener("transitionend",n),e.addEventListener("transitioncancel",n)});e.style.height=s+"px"})}(this.base,{duration:300,from:this.lastElHeight,to:s}),this.base.style.height="",this.base.style.overflow="",this.state.outgoingChildren[0]&&this.setState({outgoingChildren:[]})})}render(e,{outgoingChildren:t}){const n=e.children;return a("div",{class:!n[0]&&t[0]?re.childrenExiting:""},n[0]?n:t)}}var de=n(9);class ce extends I{constructor(){super(...arguments),this.state={nodeCount:0,edgeCount:0,edgeCrossings:0,edgeStats:{mean:0,stdev:0}}}render(){return a("div",{class:de.statusBar},a(ae,null,a("p",null,"Mezgli: ",this.state.nodeCount),a("p",null,"Malas: ",this.state.edgeCount),a("p",null,"Malu krustošanās: ",this.state.edgeCrossings," "),a("p",null,"Malu vidējais garums: ",this.state.edgeStats.mean.toFixed(2)),a("p",null,"Malu standartnovirze: ",this.state.edgeStats.stdev.toFixed(2)),a("button",{onClick:this.calculateStats.bind(this)},"Aprēķināt")))}componentDidMount(){this.updateNodeEdgeCount(),te.events.subscribe("addNode",()=>{this.updateNodeEdgeCount()}),te.events.subscribe("removeNode",()=>{this.updateNodeEdgeCount()}),te.events.subscribe("addEdge",()=>{this.updateNodeEdgeCount()}),te.events.subscribe("removeNode",()=>{this.updateNodeEdgeCount()})}calculateStats(){const e=function(e){const t=e.edges().map(e=>{const t=e.target.x-e.source.x,n=e.target.y-e.source.y;return Object(T.d)(t,n)}),n=t.reduce((e,t)=>e+t,0)/t.length,s=t.reduce((e,t)=>e+(t-n)*(t-n)),i=Math.sqrt(s/t.length);return{mean:n,stdev:i}}(te.graph);this.setState({edgeCrossings:X(te.graph),edgeStats:e})}updateNodeEdgeCount(){this.setState({nodeCount:te.graph.nodesCount,edgeCount:te.graph.edgesCount})}}var le=n(1);class he extends I{constructor(){super(...arguments),this.state={zoom:1}}zoomIn(){te.events.dispatch("scroll",{deltaY:-100})}zoomOut(){te.events.dispatch("scroll",{deltaY:100})}render(e,t){return a("div",{class:le.container},a("button",{onClick:this.zoomIn,class:le.zoomBtn},"+"),a("button",{onClick:this.zoomOut,class:le.zoomBtn},"-"),a("span",null,"Zoom ",t.zoom.toFixed(1),"x"),e.children)}componentDidMount(){te.events.subscribe("zoomChanged",e=>{console.log("Zoom ",e),this.setState({zoom:e})})}}class ue{}class pe extends ue{constructor(){super(),this.parser=new DOMParser}parse(e,t){const n=t.graph,s=this.parser.parseFromString(e,"text/xml").getElementsByTagName("graph")[0],i=s.getElementsByTagName("node"),r=s.getElementsByTagName("edge");n.clear();for(const e of i){const t=e.getAttributeNames(),s={};t.forEach(t=>{s[t]=e.getAttribute(t)});const i=e.getElementsByTagName("data");for(const e of i){const t=e.getAttribute("key");let n=e.innerHTML;const i=parseFloat(n);NaN!==i&&(n=i),t&&(s[t]=n)}const r={data:s,id:s.id};n.addNode(r)}for(const e of r){const t=e.getAttributeNames(),s={};t.forEach(t=>{s[t]=e.getAttribute(t)});const i={data:s,source:s.source,target:s.target,id:s.id};n.addEdge(i)}t.events.dispatch("render",null)}}class ge extends I{constructor(){super(...arguments),this.urls=[{url:"examples/Sawmill_36-62.graphml",name:"Kokzāģētava"},{url:"examples/Emails.graphml",name:"E-pasti"},{url:"examples/Random_992-2545.graphml",name:"Zinātniskie raksti"}]}render(){const e=this.urls.map(e=>a("button",{onClick:t=>{this.loadSample(e.url)},key:e.name},e.name));return a("div",null,"Examples:",a("br",null),e)}loadSample(e){const t=new pe;fetch(e).then(e=>{e.text().then(e=>{t.parse(e,te)})})}}class fe extends I{render(){return a("div",null,a("input",{type:"file",onChange:this.upload}),a(ge,null))}upload(e){const t=e.target;if(t.files&&t.files.length>0){const e=new FileReader,n=new pe;e.onload=(e=>{n.parse(e.target.result,te)}),e.readAsText(t.files[0])}}}var me=n(10);class ve extends I{constructor(){super(...arguments),this.state={activeObject:null}}render(e,t){this.state.activeObject;let n=a("div",null,a("h1",null,"Nothing selected"));return t.activeObject&&(n=a("div",null,a("h1",null,this.state.activeObject.id),a("p",null,"Position X: ",this.state.activeObject.x),a("p",null,"Position Y: ",this.state.activeObject.y))),a("div",{class:me.container},a(fe,null),n)}componentDidMount(){te.events.subscribe("nodeClick",e=>{this.setState({activeObject:e})})}}var ye=n(2),be=function(e,t,n,s){return new(n||(n=Promise))(function(i,r){function o(e){try{d(s.next(e))}catch(e){r(e)}}function a(e){try{d(s.throw(e))}catch(e){r(e)}}function d(e){e.done?i(e.value):new n(function(t){t(e.value)}).then(o,a)}d((s=s.apply(e,t||[])).next())})};class xe extends I{constructor(){super(...arguments),this.state={selected:null,running:!1},this.algos=["kamada","force-atlas","fruchterman","mds","isom"],this.selectedAlgo="kamada",this.iterationCb=null,this.doneCb=null}render(e,t){let n=null;n=t.running?a("button",{class:ye.stop,onClick:this.stopLayout.bind(this)},"Beigt"):a("button",{class:ye.start,onClick:this.startLayout.bind(this)},"Sākt");let s=null;return t.selected&&(s=a("div",null,a("p",null,"Init laiks: ",t.selected.getInitRuntime().toFixed(2)),a("p",null,"Kopējais laiks: ",t.selected.getTotalRuntime().toFixed(2)))),a("div",{class:ye.layouts},a("p",null,"Izkārtošanas algoritmi"),a("select",{disabled:t.running,name:"layout-algo",id:"layout-algo",onChange:this.changeMethod.bind(this)},this.algos.map(e=>a("option",{value:e,selected:e===this.selectedAlgo},e))),n,s)}changeMethod(e){this.selectedAlgo=e.target.value}startLayout(){return be(this,void 0,void 0,function*(){switch(this.selectedAlgo){case"kamada":const e=yield n.e(1).then(n.bind(null,14));this.setState({selected:new e.default});break;case"force-atlas":const t=yield n.e(1).then(n.bind(null,15));this.setState({selected:new t.default});break;case"fruchterman":const s=yield n.e(1).then(n.bind(null,16));this.setState({selected:new s.default});break;case"mds":const i=yield n.e(1).then(n.bind(null,17));this.setState({selected:new i.default});break;case"isom":const r=yield n.e(1).then(n.bind(null,18));this.setState({selected:new r.default})}this.state.selected&&(this.state.selected.start(te.graph),this.setState({running:!0}),this.iterationCb=this.state.selected.subscribe("iteration",e=>{te.events.dispatch("render",null)}),this.doneCb=this.state.selected.subscribe("done",e=>{this.setState({running:!1})}))})}stopLayout(){this.state.selected.stop()}}var Ee=n(3);class _e extends I{render(){return a("div",null,a("p",null,"Pievienot:"),a("button",{class:Ee.addBtn,onClick:this.addEdge},"Malu"),a("button",{class:Ee.addBtn,onClick:this.addNode},"Mezglu"))}addEdge(){te.events.dispatch("startEdgeAdd",null)}addNode(){const e={id:"generated"+Math.floor(1e3*Math.random()),x:1e3*Math.random(),y:800*Math.random()};te.graph.addNode(e),te.events.dispatch("nodeClick",e),te.events.dispatch("render",e)}}class Ce extends I{render(){return a("div",{class:se.controls},a(ve,null),a(he,null,a(_e,null)),a(xe,null),a(ce,null))}}var we=class extends I{render(e){return a("div",null,a(ne,null),a(Ce,null))}};n(11);let je=document.getElementById("app");(je=R(a(we,null),document.body,je)).setAttribute("id","app_root")}]);
//# sourceMappingURL=app.js.map