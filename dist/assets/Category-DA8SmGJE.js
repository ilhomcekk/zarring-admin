import{j as e,r as x,B as D}from"./index-DVCylq0Q.js";import{a as u,c as k}from"./index.es-D1a6A4w_.js";import{B as E}from"./auth-COeWrjcC.js";import{C as F,a as B,b as V,c as A,d as H}from"./CModalTitle-DGooZh2_.js";import{C as O,a as b}from"./CRow-DsUHbXhC.js";import{C as z,a as q}from"./DefaultLayout-DZ7uc0CW.js";import{C as M,a as U}from"./CListGroupItem-C5LCyosc.js";import{c as L}from"./category-BV9w38wc.js";import{C as y}from"./CFormInput-DSAYN9JZ.js";import{C as G}from"./CFormSelect-DMkWeAo9.js";import{C as W}from"./CForm-D11q0zH3.js";import{C as Z}from"./CFormLabel-hzNGrAC8.js";import{C as $}from"./CInputGroup-xpHWjSDn.js";import{R as K}from"./index-BykZOzjs.js";import{P as J}from"./PageLoading-BzyQkLAF.js";import{C as Q,a as X,b as R,c as j,d as Y,e as I}from"./CTable-_oTpxpYH.js";import{c as ee}from"./cil-zoom-CDkY_4k-.js";import{C as se}from"./CPopover-CTWSZCVN.js";import{c as le}from"./cil-trash-CBbKHhHb.js";import{c as ae}from"./cil-pen-53d2I-C-.js";import{C as re,a as T}from"./CPaginationItem-Km6D7boB.js";import{c as ne}from"./cil-arrow-left-D66Kb3Zq.js";import{c as oe}from"./cil-arrow-right-CuetXaPY.js";import{C as te}from"./CCard-DsvGdDII.js";import{C as ce}from"./CCardHeader-TZ1QTRXN.js";import{C as ie}from"./CCardTitle-CXhH0zEy.js";import"./cil-lock-locked-DmxpJbVL.js";import"./CFormControlWrapper-BybLwgQS.js";import"./CFormControlValidation-R1UaZUmp.js";import"./getRTLPlacement-DxJ2oLW1.js";import"./getTransitionDurationFromElement-Cpu4p4hx.js";const de=({visible:c,onClose:t,item:o})=>e.jsxs(F,{size:"xl",visible:c,onClose:t,backdrop:"static",children:[e.jsx(B,{children:e.jsxs(V,{children:["Товар ( ",o==null?void 0:o.id," )"]})}),e.jsx(A,{children:e.jsxs(O,{xs:{gutter:2},children:[e.jsx(b,{xs:{span:6},children:e.jsx(z,{className:"p-2 m-0",color:"primary",children:"Имя"})}),e.jsx(b,{xs:{span:6},children:e.jsx(M,{children:e.jsx(U,{className:"p-2",children:o==null?void 0:o.title})})}),e.jsx(b,{xs:{span:6},children:e.jsx(z,{className:"p-2 m-0",color:"primary",children:"Картинка"})}),e.jsx(b,{xs:{span:6},children:e.jsx(M,{children:e.jsx(U,{className:"p-2",children:e.jsx("img",{src:E+(o==null?void 0:o.img),height:200,alt:""})})})}),e.jsx(b,{xs:{span:6},children:e.jsx(z,{className:"p-2 m-0",color:"primary",children:"Время"})}),e.jsx(b,{xs:{span:6},children:e.jsx(M,{children:e.jsx(U,{className:"p-2",children:o==null?void 0:o.created_at})})})]})})]}),xe=({visible:c,onClose:t,id:o})=>{var s,n;const{detail:i,getDetail:w,getList:_,categoryParents:v,edit:d,editLoading:g}=L(),[l,h]=x.useState({title_ru:"",title_uz:"",img:null,description:""}),[N,m]=x.useState(!1),S=a=>{const{name:f,value:P}=a.target;h({...l,[f]:P})},C=(a,f)=>{const P=a.target.files[0];h({...l,[f]:P})};x.useEffect(()=>{c&&w(o)},[c]),x.useEffect(()=>{h(()=>({title_ru:i==null?void 0:i.title_ru,title_uz:i==null?void 0:i.title_uz,img:i==null?void 0:i.img}))},[i]),console.log((s=l.img)==null?void 0:s.name);const p=[{label:"Имя ( RU )",children:e.jsx(y,{name:"title_ru",onChange:S,value:l==null?void 0:l.title_ru,required:!0})},{label:"Имя ( UZ )",children:e.jsx(y,{name:"title_uz",onChange:S,value:l==null?void 0:l.title_uz})},{label:"Категория",children:e.jsx(G,{value:l==null?void 0:l.parentId,name:"parentId",onChange:S,options:["",...v==null?void 0:v.map(a=>({label:a==null?void 0:a.title,value:a==null?void 0:a.id}))]})},{label:"Основное изображение",children:e.jsxs(e.Fragment,{children:[e.jsx(y,{type:"file",onChange:a=>C(a,"img"),disabled:l==null?void 0:l.img}),e.jsx(u,{color:"danger",onClick:()=>h(a=>({...a,img:""})),children:"Удалить изображение"}),typeof l.img=="string"&&e.jsx("div",{className:"w-100",children:e.jsx("img",{src:E+(l==null?void 0:l.img),alt:"Uploaded",style:{maxWidth:"300px"}})}),((n=l.img)==null?void 0:n.name)&&e.jsx("div",{className:"w-100",children:e.jsx("img",{src:URL.createObjectURL(l.img),alt:"Uploaded",style:{maxWidth:"300px"}})})]})}],r=a=>{a.preventDefault(),a.currentTarget.checkValidity()===!1?(a.preventDefault(),a.stopPropagation()):d(o,l).then(P=>{console.log(P),D.success("Успешно создано"),_({page:1,pageSize:20}),t()}).catch(P=>console.log("err",P)),m(!0)};return e.jsxs(F,{size:"xl",visible:c,onClose:t,backdrop:"static",children:[e.jsx(B,{children:e.jsx(V,{children:"Создать товар"})}),e.jsx(A,{children:e.jsxs(W,{noValidate:!0,validated:N,onSubmit:r,children:[p==null?void 0:p.map((a,f)=>e.jsxs("div",{className:"mt-2",children:[e.jsx(Z,{children:a.label}),e.jsx($,{children:a.children})]},f)),e.jsxs(H,{children:[e.jsx(u,{color:"secondary",onClick:t,children:"Закрыть"}),e.jsx(u,{color:"primary",type:"submit",disabled:g,children:"Сохранить"})]})]})})]})},he=()=>{const{getList:c,list:t,remove:o,deleteLoading:i,listLoading:w}=L(),[_,v]=x.useState({}),[d,g]=x.useState(null),[l,h]=x.useState({id:null,title:null,from_to:null}),[N,m]=x.useState(!1),[S,C]=x.useState(!1),p=(s,n)=>{h(a=>({...a,[s]:n||null}))},r=s=>{s.key==="Enter"&&c(l)};return x.useEffect(()=>{c(l)},[]),e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"overflow-x-auto",children:e.jsxs(Q,{striped:!0,children:[e.jsxs(X,{children:[e.jsxs(R,{children:[e.jsx(j,{scope:"col",children:"ИД"}),e.jsx(j,{scope:"col",children:"Имя"}),e.jsx(j,{scope:"col",children:"Картинка"}),e.jsx(j,{scope:"col",children:"Время"}),e.jsx(j,{scope:"col"})]}),e.jsxs(R,{children:[e.jsx(j,{scope:"col",children:e.jsx(y,{type:"text",value:l==null?void 0:l.id,onChange:s=>p("id",s.target.value),onKeyPress:r})}),e.jsx(j,{scope:"col",children:e.jsx(y,{type:"text",value:l==null?void 0:l.name,onChange:s=>p("title",s.target.value),onKeyPress:r})}),e.jsx(j,{scope:"col"}),e.jsx(j,{scope:"col",children:e.jsxs("div",{className:`d-flex align-items-center ${(l==null?void 0:l.from_to)&&"date-active"}`,children:[e.jsx(K,{onDateSelected:(s,n)=>{const a=Math.floor(new Date(s).getTime()/1e3),f=Math.floor(new Date(n).getTime()/1e3);p("from_to",`${a}-${f}`)},onClose:()=>{const s=Object.fromEntries(Object.entries(l).filter(([n,a])=>a!=null));new URLSearchParams(s).toString(),c(l)}}),(l==null?void 0:l.from_to)&&e.jsx(q,{className:"ms-2",onClick:()=>{const s={...l};s.from_to=null,h(s),c(s)}})]})}),e.jsx(j,{scope:"col"})]})]}),e.jsxs(Y,{children:[t==null?void 0:t.map((s,n)=>e.jsxs(R,{children:[e.jsx(j,{scope:"row",children:s==null?void 0:s.id}),e.jsx(I,{children:s==null?void 0:s.title}),e.jsx(I,{children:e.jsx("img",{src:E+(s==null?void 0:s.img),width:50,height:50,alt:""})}),e.jsx(I,{children:s==null?void 0:s.created_at}),e.jsx(I,{children:e.jsxs("div",{className:"d-flex",children:[e.jsx(u,{color:"primary",onClick:()=>{v(s),m(!0)},children:e.jsx(k,{icon:ee})}),e.jsx(se,{title:s==null?void 0:s.id,trigger:"focus",content:e.jsxs("div",{children:[e.jsx("div",{children:"Вы точно хотите удалить?"}),e.jsx(u,{disabled:i,onClick:()=>o(s==null?void 0:s.id).then(a=>{a!=null&&a.data&&D.success("Успешно удалено")}),color:"danger",className:"mt-2 mx-auto d-flex",children:"Удалить"})]}),children:e.jsx(u,{className:"mx-2",color:"danger",children:e.jsx(k,{icon:le})})}),e.jsx(u,{color:"warning",onClick:()=>{g(s==null?void 0:s.id),C(!0)},children:e.jsx(k,{icon:ae})})]})})]},n)),e.jsxs(re,{children:[e.jsx(T,{onClick:()=>{const s={...l};s.page-=1,h(s),c(s)},disabled:l.page===1,children:e.jsx(k,{icon:ne})}),[...Array(t==null?void 0:t.totalPages)].map((s,n)=>e.jsx(T,{onClick:()=>{const a={...l};a.page=n+1,h(a),c(a)},active:l.page===n+1,children:n+1},n)),e.jsx(T,{onClick:()=>{const s={...l};s.page+=1,h(s),c(s)},disabled:l.page===(t==null?void 0:t.totalPages),children:e.jsx(k,{icon:oe})})]})]})]})}),e.jsx(de,{visible:N,onClose:()=>m(!1),item:_}),e.jsx(xe,{visible:S,onClose:()=>C(!1),id:d}),e.jsx(J,{loading:w})]})},je=({visible:c,onClose:t})=>{const{create:o,createLoading:i,getList:w,categoryParents:_,getParents:v}=L(),[d,g]=x.useState({title_ru:"",title_uz:"",img:null,parentId:null,description_ru:"",description_uz:""}),[l,h]=x.useState(!1),N=()=>{g({title_ru:"",title_uz:"",img:null,parentId:null,description_ru:"",description_uz:""})},m=r=>{const{name:s,value:n}=r.target;g({...d,[s]:n})},S=(r,s)=>{const n=r.target.files[0];g({...d,[s]:n})},C=[{label:"Имя ( RU )",children:e.jsx(y,{name:"title_ru",value:d.title_ru,onChange:m,required:!0})},{label:"Имя ( UZ )",children:e.jsx(y,{name:"title_uz",value:d.title_uz,onChange:m})},{label:"Категория",children:e.jsx(G,{value:d==null?void 0:d.parentId,name:"parentId",onChange:m,options:["",..._==null?void 0:_.map(r=>({label:r==null?void 0:r.title,value:r==null?void 0:r.id}))]})},{label:"Основное изображение",children:e.jsxs(e.Fragment,{children:[e.jsx(y,{type:"file",onChange:r=>S(r,"img")}),e.jsx(u,{color:"danger",onClick:()=>g(r=>({...r,img:null})),children:"Удалить"}),d.img&&e.jsx("div",{className:"w-100",children:e.jsx("img",{src:URL.createObjectURL(d.img),alt:"Uploaded",style:{maxWidth:"300px"}})})]})}],p=r=>{r.preventDefault(),r.currentTarget.checkValidity()===!1?(r.preventDefault(),r.stopPropagation()):o(d).then(n=>{var a;(a=n==null?void 0:n.data)!=null&&a.id&&(console.log(n),D.success("Успешно создано"),w({}),v(),N(),t())}).catch(n=>console.log("err",n)),h(!0)};return e.jsxs(F,{size:"xl",visible:c,onClose:t,backdrop:"static",children:[e.jsx(B,{children:e.jsx(V,{children:"Создать категории"})}),e.jsx(A,{children:e.jsxs(W,{noValidate:!0,validated:l,onSubmit:p,children:[C==null?void 0:C.map((r,s)=>e.jsxs("div",{className:"mt-2",children:[e.jsx(Z,{children:r.label}),e.jsx($,{children:r.children})]},s)),e.jsxs(H,{children:[e.jsx(u,{color:"secondary",children:"Закрыть"}),e.jsx(u,{color:"primary",type:"submit",disabled:i,children:"Сохранить"})]})]})})]})},We=()=>{const{getParents:c}=L(),[t,o]=x.useState(!1);return x.useEffect(()=>{c()},[]),e.jsxs(e.Fragment,{children:[e.jsxs(te,{children:[e.jsx(ce,{children:e.jsxs(O,{children:[e.jsx(b,{className:"d-flex align-items-center",children:e.jsx(ie,{className:"mb-0",children:"Категории"})}),e.jsx(b,{className:"d-flex justify-content-end",children:e.jsx(u,{color:"primary",onClick:()=>o(!0),children:"Создать"})})]})}),e.jsx(he,{})]}),e.jsx(je,{visible:t,onClose:()=>o(!1)})]})};export{We as default};
