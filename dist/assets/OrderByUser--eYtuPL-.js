import{r as j,j as s}from"./index-eW-6yITB.js";import{c as h}from"./index.es-1QyywiA-.js";import{o as m}from"./order-DMswF3t1.js";import{d as u,e as f}from"./auth-CBhP_LvO.js";import{P as b}from"./PageLoading-DYCMGmXg.js";import{C as P,a as w,b as C,c as n,d as T,e as d}from"./CTable-iU6qPHck.js";import{b as S}from"./DefaultLayout-Bz4MAgCX.js";import{C as _,a as x}from"./CPaginationItem-Dxu5LM3y.js";import{c as L}from"./cil-arrow-left-D66Kb3Zq.js";import{c as v}from"./cil-arrow-right-CuetXaPY.js";import{C as F}from"./CCard-Czglc9r9.js";import{C as k}from"./CCardHeader-CzZi6ULY.js";import{C as A,a as g}from"./CRow-3m-4mWST.js";import{C as E}from"./CCardTitle-B-C91L6L.js";import{C as I}from"./CFormInput-L99v4CEH.js";import"./cil-lock-locked-DmxpJbVL.js";import"./CFormControlWrapper-Dxe1bfDj.js";import"./CFormControlValidation-LxJhmD-X.js";import"./CFormLabel-cQNBQ_G2.js";const N=()=>{var o;const{getListByUser:c,ordersByUser:e,listLoading:i}=m(),[r,t]=j.useState({page:1,pageSize:20,user_name:null});return j.useEffect(()=>{c(r)},[]),s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"overflow-x-auto",children:s.jsxs(P,{striped:!0,children:[s.jsx(w,{children:s.jsxs(C,{children:[s.jsx(n,{scope:"col",children:"ИД"}),s.jsx(n,{scope:"col",children:"Имя заказчика"}),s.jsx(n,{scope:"col",children:"Номер заказчика"}),s.jsx(n,{scope:"col",children:"Статус заказа"}),s.jsx(n,{scope:"col",children:"Время"}),s.jsx(n,{scope:"col"})]})}),s.jsxs(T,{children:[(o=e==null?void 0:e.orders)==null?void 0:o.map((a,l)=>s.jsxs(C,{children:[s.jsx(n,{scope:"row",children:a==null?void 0:a.id}),s.jsx(d,{children:a==null?void 0:a.user_name}),s.jsx(d,{children:a==null?void 0:a.user_number}),s.jsx(d,{children:s.jsx(S,{size:"lg",className:"p-2",color:u(a==null?void 0:a.status),children:f(a==null?void 0:a.status)})}),s.jsx(d,{children:a==null?void 0:a.createdAt})]},l)),s.jsxs(_,{children:[s.jsx(x,{onClick:()=>{const a={...r};a.page-=1,t(a),getList(a)},disabled:r.page===1,children:s.jsx(h,{icon:L})}),[...Array(e==null?void 0:e.totalPages)].map((a,l)=>s.jsx(x,{onClick:()=>{const p={...r};p.page=l+1,t(p),c(p)},active:r.page===l+1,children:l+1},l)),s.jsx(x,{onClick:()=>{const a={...r};a.page+=1,t(a),c(a)},disabled:r.page===(e==null?void 0:e.totalPages),children:s.jsx(h,{icon:v})})]})]})]})}),s.jsx(b,{loading:i})]})},U=()=>{const{getListByUser:c}=m(),[e,i]=j.useState({page:1,pageSize:20,user_name:null}),r=(o,a)=>{i(l=>({...l,page:1,[o]:a||null}))},t=o=>{o.key==="Enter"&&c(e)};return s.jsx(s.Fragment,{children:s.jsxs(F,{children:[s.jsx(k,{children:s.jsxs(A,{children:[s.jsx(g,{className:"d-flex align-items-center",children:s.jsx(E,{className:"mb-0",children:"Заказы"})}),s.jsx(g,{children:s.jsx(I,{placeholder:"Поиск",type:"text",value:e==null?void 0:e.user_name,onChange:o=>r("user_name",o.target.value),onKeyPress:t})})]})}),s.jsx(N,{})]})})};export{U as default};
