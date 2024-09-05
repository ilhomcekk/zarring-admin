import{j as e,r as j,B}from"./index-DVCylq0Q.js";import{a as b,c as A}from"./index.es-D1a6A4w_.js";import{a as R,b as H,c as G,d as _,r as Z,s as J}from"./utils-jGJlRVFu.js";import{C as m,a as E,b as z,c as K,d as O}from"./CModalTitle-DGooZh2_.js";import{C as Q,a as x}from"./CRow-DsUHbXhC.js";import{C as P,b as k}from"./DefaultLayout-DZ7uc0CW.js";import{C as M,a as q}from"./CListGroupItem-C5LCyosc.js";import{c as Y,r as T}from"./auth-COeWrjcC.js";import{C as u}from"./CFormInput-DSAYN9JZ.js";import{C as F}from"./CFormSelect-DMkWeAo9.js";import{C as U}from"./CForm-D11q0zH3.js";import{C as W}from"./CFormLabel-hzNGrAC8.js";import{C as X}from"./CInputGroup-xpHWjSDn.js";import{P as $}from"./PageLoading-BzyQkLAF.js";import{C as ee,a as se,b as D,c as i,d as le,e as S}from"./CTable-_oTpxpYH.js";import{c as ae}from"./cil-zoom-CDkY_4k-.js";import{C as ne}from"./CPopover-CTWSZCVN.js";import{c as re}from"./cil-trash-CBbKHhHb.js";import{c as oe}from"./cil-pen-53d2I-C-.js";import{C as ce}from"./CCard-DsvGdDII.js";import{C as de}from"./CCardHeader-TZ1QTRXN.js";import{C as te}from"./CCardTitle-CXhH0zEy.js";import"./cil-lock-locked-DmxpJbVL.js";import"./CFormControlWrapper-BybLwgQS.js";import"./CFormControlValidation-R1UaZUmp.js";import"./getRTLPlacement-DxJ2oLW1.js";import"./getTransitionDurationFromElement-Cpu4p4hx.js";const ie=({visible:r,onClose:o,item:l})=>e.jsxs(m,{size:"xl",visible:r,onClose:o,backdrop:"static",children:[e.jsx(E,{children:e.jsxs(z,{children:["ID: ( ",l==null?void 0:l.id," )"]})}),e.jsx(K,{children:e.jsxs(Q,{xs:{gutter:2},children:[e.jsx(x,{xs:{span:6},children:e.jsx(P,{className:"p-2 m-0",color:"primary",children:"ИД"})}),e.jsx(x,{xs:{span:6},children:e.jsx(M,{children:e.jsx(q,{className:"p-2",children:l==null?void 0:l.id})})}),e.jsx(x,{xs:{span:6},children:e.jsx(P,{className:"p-2 m-0",color:"primary",children:"Логин"})}),e.jsx(x,{xs:{span:6},children:e.jsx(M,{children:e.jsx(q,{className:"p-2",children:l==null?void 0:l.login})})}),e.jsx(x,{xs:{span:6},children:e.jsx(P,{className:"p-2 m-0",color:"primary",children:"Имя"})}),e.jsx(x,{xs:{span:6},children:e.jsx(M,{children:e.jsx(q,{className:"p-2",children:l==null?void 0:l.name})})}),e.jsx(x,{xs:{span:6},children:e.jsx(P,{className:"p-2 m-0",color:"primary",children:"Номер телефона"})}),e.jsx(x,{xs:{span:6},children:e.jsx(M,{children:e.jsx(q,{className:"p-2",children:l==null?void 0:l.phone})})}),e.jsx(x,{xs:{span:6},children:e.jsx(P,{className:"p-2 m-0",color:"primary",children:"Роль"})}),e.jsx(x,{xs:{span:6},children:e.jsx(M,{children:e.jsx(q,{className:"p-2",children:e.jsx(k,{color:R(l==null?void 0:l.role),children:H(l==null?void 0:l.role)})})})}),e.jsx(x,{xs:{span:6},children:e.jsx(P,{className:"p-2 m-0",color:"primary",children:"Статус"})}),e.jsx(x,{xs:{span:6},children:e.jsx(M,{children:e.jsx(q,{className:"p-2",children:e.jsx(k,{color:G(l==null?void 0:l.status),children:_(l==null?void 0:l.status)})})})})]})})]}),he={list:[],listLoading:!1,detail:{},detailLoading:!1,createLoading:!1,editLoading:!1,deleteLoading:!1},V=Y(r=>({...he,getList:async o=>{r({listLoading:!0});try{const{data:l}=await T.fetchAdmins(o);return r({list:l==null?void 0:l.data}),l}catch(l){return l}finally{r({listLoading:!1})}},getDetail:async o=>{r({detailLoading:!0});try{const{data:l}=await T.fetchAdminsDetail(o);return r({detail:l==null?void 0:l.data}),l}catch(l){return l}finally{r({detailLoading:!1})}},create:async o=>{r({createLoading:!0});try{const{data:l}=await T.createAdmins(o);return l}catch(l){return l}finally{r({createLoading:!1})}},edit:async(o,l)=>{r({editLoading:!0});try{const{data:n}=await T.editAdmins(o,l);return n}catch(n){return n}finally{r({editLoading:!1})}},remove:async o=>{r({deleteLoading:!0});try{const{data:l}=await T.deleteAdmins(o);return l!=null&&l.data&&r(n=>{var y;return{...n,list:(y=n.list)==null?void 0:y.filter(t=>(t==null?void 0:t.id)!==o)}}),l}catch(l){return l}finally{r({deleteLoading:!1})}}})),xe=({visible:r,onClose:o,id:l})=>{var a,h;const{detail:n,getDetail:y,getList:t,edit:w,editLoading:I}=V(),[d,c]=j.useState({login:"",name:"",phone:"",password:"",role:"",status:""}),[f,L]=j.useState(!1),p=s=>{const{name:g,value:C}=s.target;c({...d,[g]:C})};j.useEffect(()=>{r&&y(l)},[r]),j.useEffect(()=>{c(()=>({login:n==null?void 0:n.login,name:n==null?void 0:n.name,phone:n==null?void 0:n.phone,role:n==null?void 0:n.role,status:n==null?void 0:n.status}))},[n]);const v=[{label:"Имя",children:e.jsx(u,{name:"name",onChange:p,value:d==null?void 0:d.name,required:!0})},{label:"Логин",children:e.jsx(u,{name:"login",onChange:p,value:d==null?void 0:d.login,required:!0})},{label:"Номер телефона",children:e.jsx(u,{name:"phone",onChange:p,value:d==null?void 0:d.phone,required:!0})},{label:"Пароль",children:e.jsx(u,{name:"password",onChange:p,value:d==null?void 0:d.password})},{label:"Роль",children:e.jsx(F,{name:"role",value:d==null?void 0:d.role,onChange:p,required:!0,options:["",...(a=Z)==null?void 0:a.map(s=>({label:s==null?void 0:s.name,value:s==null?void 0:s.value}))]})},{label:"Статус",children:e.jsx(F,{name:"status",value:d==null?void 0:d.status,onChange:p,required:!0,options:["",...(h=J)==null?void 0:h.map(s=>({label:s==null?void 0:s.name,value:s==null?void 0:s.value}))]})}],N=s=>{s.preventDefault(),s.currentTarget.checkValidity()===!1?(s.preventDefault(),s.stopPropagation()):w(l,d).then(()=>{B.success("Успешно создано"),t({page:1,pageSize:20}),o()}).catch(C=>console.log("err",C)),L(!0)};return e.jsxs(m,{size:"xl",visible:r,onClose:o,backdrop:"static",children:[e.jsx(E,{children:e.jsx(z,{children:"Создать товар"})}),e.jsx(K,{children:e.jsxs(U,{noValidate:!0,validated:f,onSubmit:N,children:[v==null?void 0:v.map((s,g)=>e.jsxs("div",{className:"mt-2",children:[e.jsx(W,{children:s.label}),e.jsx(X,{children:s.children})]},g)),e.jsxs(O,{children:[e.jsx(b,{color:"secondary",onClick:o,children:"Закрыть"}),e.jsx(b,{color:"primary",type:"submit",disabled:I,children:"Сохранить"})]})]})})]})},ue=()=>{const{getList:r,list:o,remove:l,deleteLoading:n,listLoading:y}=V(),[t,w]=j.useState({}),[I,d]=j.useState(null),[c,f]=j.useState({page:1,pageSize:20,id:null,login:null,name:null,phone:null,role:null,status:null,created_at:null}),[L,p]=j.useState(!1),[v,N]=j.useState(!1),a=(s,g)=>{f(C=>({...C,page:1,[s]:g||null}))},h=s=>{s.key==="Enter"&&r(c)};return j.useEffect(()=>{r(c)},[]),e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"overflow-x-auto",children:e.jsxs(ee,{striped:!0,children:[e.jsxs(se,{children:[e.jsxs(D,{children:[e.jsx(i,{scope:"col",children:"ИД"}),e.jsx(i,{scope:"col",children:"Логин"}),e.jsx(i,{scope:"col",children:"Имя"}),e.jsx(i,{scope:"col",children:"Номер телефона"}),e.jsx(i,{scope:"col",children:"Роль"}),e.jsx(i,{scope:"col",children:"Статус"}),e.jsx(i,{scope:"col",children:"Дата создания"}),e.jsx(i,{scope:"col"})]}),e.jsxs(D,{children:[e.jsx(i,{scope:"col",children:e.jsx(u,{type:"text",value:c==null?void 0:c.id,onChange:s=>a("id",s.target.value),onKeyPress:h})}),e.jsx(i,{scope:"col",children:e.jsx(u,{type:"text",value:c==null?void 0:c.login,onChange:s=>a("login",s.target.value),onKeyPress:h})}),e.jsx(i,{scope:"col",children:e.jsx(u,{type:"text",value:c==null?void 0:c.name,onChange:s=>a("name",s.target.value),onKeyPress:h})}),e.jsx(i,{scope:"col",children:e.jsx(u,{type:"text",value:c==null?void 0:c.phone,onChange:s=>a("phone",s.target.value),onKeyPress:h})}),e.jsx(i,{scope:"col",children:e.jsx(u,{type:"text",value:c==null?void 0:c.role,onChange:s=>a("role",s.target.value),onKeyPress:h})}),e.jsx(i,{scope:"col",children:e.jsx(u,{type:"text",value:c==null?void 0:c.status,onChange:s=>a("status",s.target.value),onKeyPress:h})}),e.jsx(i,{scope:"col"})]})]}),e.jsx(le,{children:o==null?void 0:o.map((s,g)=>e.jsxs(D,{children:[e.jsx(i,{scope:"row",children:s==null?void 0:s.id}),e.jsx(S,{children:s==null?void 0:s.login}),e.jsx(S,{children:s==null?void 0:s.name}),e.jsx(S,{children:s==null?void 0:s.phone}),e.jsx(S,{children:e.jsx(k,{color:R(s==null?void 0:s.role),children:H(s==null?void 0:s.role)})}),e.jsx(S,{children:e.jsx(k,{color:G(s==null?void 0:s.status),children:_(s==null?void 0:s.status)})}),e.jsx(S,{children:s==null?void 0:s.created_at}),e.jsx(S,{children:e.jsxs("div",{className:"d-flex",children:[e.jsx(b,{color:"primary",onClick:()=>{w(s),p(!0)},children:e.jsx(A,{icon:ae})}),e.jsx(ne,{title:s==null?void 0:s.id,trigger:"focus",content:e.jsxs("div",{children:[e.jsx("div",{children:"Вы точно хотите удалить?"}),e.jsx(b,{disabled:n,onClick:()=>l(s==null?void 0:s.id).then(C=>{C!=null&&C.data&&toast.success("Успешно удалено")}),color:"danger",className:"mt-2 mx-auto d-flex",children:"Удалить"})]}),children:e.jsx(b,{className:"mx-2",color:"danger",children:e.jsx(A,{icon:re})})}),e.jsx(b,{color:"warning",onClick:()=>{d(s==null?void 0:s.id),N(!0)},children:e.jsx(A,{icon:oe})})]})})]},g))})]})}),e.jsx(ie,{visible:L,onClose:()=>p(!1),item:t}),e.jsx(xe,{visible:v,onClose:()=>N(!1),id:I}),e.jsx($,{loading:y})]})},je=({visible:r,onClose:o})=>{var v,N;const{create:l,createLoading:n,getList:y}=V(),[t,w]=j.useState({login:"",name:"",phone:"",password:"",role:"",status:""}),[I,d]=j.useState(!1),c=()=>{w({login:"",name:"",phone:"",password:"",role:"",status:""})},f=a=>{const{name:h,value:s}=a.target;w({...t,[h]:s})},L=[{label:"Логин",children:e.jsx(u,{name:"login",value:t.login,onChange:f,required:!0})},{label:"Имя",children:e.jsx(u,{name:"name",value:t.name,onChange:f,required:!0})},{label:"Номер телефона",children:e.jsx(u,{name:"phone",value:t.phone,onChange:f,required:!0})},{label:"Пароль",children:e.jsx(u,{name:"password",value:t.password,onChange:f,required:!0})},{label:"Роль",children:e.jsx(F,{name:"role",value:t==null?void 0:t.role,onChange:f,required:!0,options:["",...(v=Z)==null?void 0:v.map(a=>({label:a==null?void 0:a.name,value:a==null?void 0:a.value}))]})},{label:"Статус",children:e.jsx(F,{name:"status",value:t==null?void 0:t.status,onChange:f,required:!0,options:["",...(N=J)==null?void 0:N.map(a=>({label:a==null?void 0:a.name,value:a==null?void 0:a.value}))]})}],p=a=>{a.preventDefault(),a.currentTarget.checkValidity()===!1?(a.preventDefault(),a.stopPropagation()):l(t).then(s=>{var g;(g=s==null?void 0:s.data)!=null&&g.id&&(B.success("Успешно создано"),y({page:1,pageSize:20}),c(),o())}).catch(s=>console.log("err",s)),d(!0)};return e.jsxs(m,{size:"xl",visible:r,onClose:o,backdrop:"static",children:[e.jsx(E,{children:e.jsx(z,{children:"Создать админ"})}),e.jsx(K,{children:e.jsxs(U,{noValidate:!0,validated:I,onSubmit:p,children:[L==null?void 0:L.map((a,h)=>e.jsxs("div",{className:"mt-2",children:[e.jsx(W,{children:a.label}),e.jsx(X,{children:a.children})]},h)),e.jsxs(O,{children:[e.jsx(b,{color:"secondary",children:"Закрыть"}),e.jsx(b,{color:"primary",type:"submit",disabled:n,children:"Сохранить"})]})]})})]})},He=()=>{const[r,o]=j.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsxs(ce,{children:[e.jsx(de,{children:e.jsxs(Q,{children:[e.jsx(x,{className:"d-flex align-items-center",children:e.jsx(te,{className:"mb-0",children:"Админы"})}),e.jsx(x,{className:"d-flex justify-content-end",children:e.jsx(b,{color:"primary",onClick:()=>o(!0),children:"Создать"})})]})}),e.jsx(ue,{})]}),e.jsx(je,{visible:r,onClose:()=>o(!1)})]})};export{He as default};
