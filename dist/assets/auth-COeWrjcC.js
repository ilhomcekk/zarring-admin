import{r as B,x as k,R,$ as r}from"./index-DVCylq0Q.js";var L={BASE_URL:"./",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const E=e=>{let t;const a=new Set,o=(i,g)=>{const l=typeof i=="function"?i(t):i;if(!Object.is(l,t)){const d=t;t=g??(typeof l!="object"||l===null)?l:Object.assign({},t,l),a.forEach(f=>f(t,d))}},s=()=>t,h={setState:o,getState:s,getInitialState:()=>S,subscribe:i=>(a.add(i),()=>a.delete(i)),destroy:()=>{(L?"production":void 0)!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),a.clear()}},S=t=e(o,s,h);return h},I=e=>e?E(e):E;var O={exports:{}},P={},C={exports:{}},_={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $=B;function F(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var M=typeof Object.is=="function"?Object.is:F,V=$.useState,z=$.useEffect,U=$.useLayoutEffect,T=$.useDebugValue;function q(e,t){var a=t(),o=V({inst:{value:a,getSnapshot:t}}),s=o[0].inst,c=o[1];return U(function(){s.value=a,s.getSnapshot=t,m(s)&&c({inst:s})},[e,a,t]),z(function(){return m(s)&&c({inst:s}),e(function(){m(s)&&c({inst:s})})},[e]),T(a),a}function m(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!M(e,a)}catch{return!0}}function W(e,t){return t()}var j=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?W:q;_.useSyncExternalStore=$.useSyncExternalStore!==void 0?$.useSyncExternalStore:j;C.exports=_;var K=C.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v=B,G=K;function H(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var J=typeof Object.is=="function"?Object.is:H,N=G.useSyncExternalStore,Q=v.useRef,X=v.useEffect,Y=v.useMemo,Z=v.useDebugValue;P.useSyncExternalStoreWithSelector=function(e,t,a,o,s){var c=Q(null);if(c.current===null){var u={hasValue:!1,value:null};c.current=u}else u=c.current;c=Y(function(){function h(d){if(!S){if(S=!0,i=d,d=o(d),s!==void 0&&u.hasValue){var f=u.value;if(s(f,d))return g=f}return g=d}if(f=g,J(i,d))return f;var b=o(d);return s!==void 0&&s(f,b)?f:(i=d,g=b)}var S=!1,i,g,l=a===void 0?null:a;return[function(){return h(t())},l===null?void 0:function(){return h(l())}]},[t,a,o,s]);var y=N(e,c[0],c[1]);return X(function(){u.hasValue=!0,u.value=y},[y]),Z(y),y};O.exports=P;var ee=O.exports;const te=k(ee);var A={BASE_URL:"./",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{useDebugValue:re}=R,{useSyncExternalStoreWithSelector:ne}=te;let x=!1;const oe=e=>e;function ae(e,t=oe,a){(A?"production":void 0)!=="production"&&a&&!x&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),x=!0);const o=ne(e.subscribe,e.getState,e.getServerState||e.getInitialState,t,a);return re(o),o}const w=e=>{(A?"production":void 0)!=="production"&&typeof e!="function"&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const t=typeof e=="function"?I(e):e,a=(o,s)=>ae(t,o,s);return Object.assign(a,t),a},se=e=>e?w(e):w,n="https://api.zarring.uz/api",ie="https://api.zarring.uz",p=(e,t=new FormData,a="")=>{for(const o in e)if(Object.prototype.hasOwnProperty.call(e,o)){const s=a?`${a}[${o}]`:o;Array.isArray(e[o])?e[o].forEach((c,u)=>{typeof c=="object"&&!(c instanceof File)&&!(c instanceof Blob)?p(c,t,`${s}[${u}]`):t.append(`${s}[${u}]`,c)}):typeof e[o]=="object"&&!(e[o]instanceof File)&&!(e[o]instanceof Blob)?p(e[o],t,s):t.append(s,e[o])}return t},de=[{name:"Новый",value:1},{name:"Обратывается",value:2},{name:"Завершен",value:3},{name:"Отменен",value:-1}],le=e=>{let t="Новый";switch(e){case 1:t="Новый";break;case 2:t="Обратывается";break;case 3:t="Завершен";break;case-1:t="Отменен";break}return t},fe=e=>{let t="primary";switch(e){case 1:t="primary";break;case 2:t="warning";break;case 3:t="success";break;case-1:t="danger";break}return t},pe=e=>{let t="#6261cc";switch(e){case 1:t="#6261cc";break;case 2:t="#f9b115";break;case 3:t="#1b9e3e";break;case-1:t="#e55353";break}return t},D={login:e=>r.post(`${n}/auth/login`,e),fetchMe:()=>r.get(`${n}/user/me`),fetchProduct:e=>r.get(`${n}/product/`,{params:e}),fetchProductCodes:()=>r.get(`${n}/product/codes`),fetchProductDetail:e=>r.get(`${n}/product/byId/${e}`),createProduct:e=>r.post(`${n}/product/add`,e),editProduct:(e,t)=>r.post(`${n}/product/update/${e}`,t),deleteProduct:e=>r.delete(`${n}/product/delete/${e}`),fetchCategory:e=>r.get(`${n}/category`,{params:e}),fetchCategoryParents:e=>r.get(`${n}/category/parent`,{params:e}),fetchCategoryDetail:e=>r.get(`${n}/category/byId/${e}`),createCategory:e=>r.post(`${n}/category/add`,p(e)),editCategory:(e,t)=>r.post(`${n}/category/update/${e}`,p(t)),deleteCategory:e=>r.delete(`${n}/category/delete/${e}`),fetchBanner:e=>r.get(`${n}/banner`,{params:e}),fetchBannerDetail:e=>r.get(`${n}/banner/byId/${e}`),createBanner:e=>r.post(`${n}/banner/add`,p(e)),editBanner:(e,t)=>r.post(`${n}/banner/update/${e}`,p(t)),deleteBanner:e=>r.delete(`${n}/banner/delete/${e}`),fetchBrand:e=>r.get(`${n}/brand`,{params:e}),fetchBrandDetail:e=>r.get(`${n}/brand/byId/${e}`),createBrand:e=>r.post(`${n}/brand/add`,p(e)),editBrand:(e,t)=>r.post(`${n}/brand/update/${e}`,p(t)),deleteBrand:e=>r.delete(`${n}/brand/delete/${e}`),fetchOrder:e=>r.get(`${n}/order`,{params:e}),fetchOrderByUser:e=>r.get(`${n}/order/get-by-user-name/`,{params:e}),fetchOrderDetail:e=>r.get(`${n}/order/by/${e}`),editOrder:(e,t)=>r.put(`${n}/order/update/${e}`,t),createOrder:e=>r.post(`${n}/order/add`,e),fetchStats:()=>r.get(`${n}/report/?from=&to=`),fetchClientsMaxCount:()=>r.get(`${n}/report/clients-in-maxcount`),fetchProductsMaxCount:()=>r.get(`${n}/report/products-in-maxcount`),fetchUsersProducts:e=>r.get(`${n}/order/get-users-products-info-by-order`,{params:e}),fetchAdmins:e=>r.get(`${n}/user/`,{params:e}),fetchAdminsDetail:e=>r.get(`${n}/user/me/${e}`),createAdmins:e=>r.post(`${n}/user/add`,e),editAdmins:(e,t)=>r.put(`${n}/user/update/${e}`,t),deleteAdmins:e=>r.delete(`${n}/user/delete/${e}`)},ce={loginLoading:!1,me:{},meLoading:!1},ge=se(e=>({...ce,postLogin:async t=>{e({loginLoading:!0});try{const{data:a}=await D.login(t);return a}catch(a){return a}finally{e({loginLoading:!1})}},getMe:async t=>{var a;e({meLoading:!0});try{const o=await D.fetchMe(t);return e({me:(a=o==null?void 0:o.data)==null?void 0:a.data}),o}catch(o){return o}finally{e({meLoading:!1})}}}));export{ie as B,ge as a,pe as b,se as c,fe as d,le as e,D as r,de as s};
