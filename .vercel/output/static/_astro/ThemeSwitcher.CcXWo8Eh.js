import{r as c}from"./index.DhYZZe0J.js";var m={exports:{}},d={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var g=c,w=Symbol.for("react.element"),x=Symbol.for("react.fragment"),_=Object.prototype.hasOwnProperty,v=g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,S={key:!0,ref:!0,__self:!0,__source:!0};function u(r,e,n){var t,s={},o=null,a=null;n!==void 0&&(o=""+n),e.key!==void 0&&(o=""+e.key),e.ref!==void 0&&(a=e.ref);for(t in e)_.call(e,t)&&!S.hasOwnProperty(t)&&(s[t]=e[t]);if(r&&r.defaultProps)for(t in e=r.defaultProps,e)s[t]===void 0&&(s[t]=e[t]);return{$$typeof:w,type:r,key:o,ref:a,props:s,_owner:v.current}}d.Fragment=x;d.jsx=u;d.jsxs=u;m.exports=d;var l=m.exports;/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),p=(...r)=>r.filter((e,n,t)=>!!e&&t.indexOf(e)===n).join(" ");/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var b={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=c.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:t,className:s="",children:o,iconNode:a,...h},f)=>c.createElement("svg",{ref:f,...b,width:e,height:e,stroke:r,strokeWidth:t?Number(n)*24/Number(e):n,className:p("lucide",s),...h},[...a.map(([k,y])=>c.createElement(k,y)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=(r,e)=>{const n=c.forwardRef(({className:t,...s},o)=>c.createElement(j,{ref:o,iconNode:e,className:p(`lucide-${E(r)}`,t),...s}));return n.displayName=`${r}`,n};/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=i("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=i("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]),R=(r,e)=>{const[n,t]=c.useState(()=>{try{if(typeof window>"u")return e;const o=localStorage.getItem(r);return o||e}catch(o){return console.log(o),e}}),s=o=>{try{const a=o instanceof Function?o(n):o;t(a),window.localStorage.setItem(r,a)}catch(a){console.log(a)}};return c.useEffect(()=>{t(localStorage.getItem(r)||e)},[]),[n,s]},O=({})=>{const[r,e]=R("theme","light"),n=t=>{e(t),console.log("go"),document.documentElement.classList.contains("dark")&&t!=="dark"?document.documentElement.classList.remove("dark"):document.documentElement.classList.add("dark")};return l.jsxs("label",{className:"btn btn-outline swap swap-rotate",children:[l.jsx("input",{type:"checkbox",className:"theme-controller",checked:r==="dark",onChange:t=>{n(t.target.checked?"dark":"light")}}),l.jsx(N,{className:"swap-off fill-current"}),l.jsx(L,{className:"swap-on fill-current"})]})};export{O as ThemeSwitcher};
