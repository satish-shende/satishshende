"use strict";
/* ===== CONFIG: put your real contact details here ===== */
const CONFIG={whatsapp:"919325856311"}; // country code + number, digits only
const $=(s,r=document)=>r.querySelector(s);
const toast=m=>{const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("on"),3500)};

/* Theme */
try{const s=localStorage.getItem("theme");if(s)document.documentElement.dataset.theme=s}catch(e){}
$("#theme").onclick=()=>{const r=document.documentElement;const dark=r.dataset.theme?r.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;
r.dataset.theme=dark?"light":"dark";try{localStorage.setItem("theme",r.dataset.theme)}catch(e){}};

/* Mobile menu */
$("#menu").onclick=()=>{const o=$("#nav").classList.toggle("open");$("#menu").setAttribute("aria-expanded",o)};

/* Animated counters (home) */
document.querySelectorAll("[data-n]").forEach(el=>{const to=+el.dataset.n;
if(matchMedia("(prefers-reduced-motion:reduce)").matches){el.textContent=to+(el.dataset.s||"");return}
const t0=performance.now(),d=1100;(function f(t){const p=Math.min((t-t0)/d,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)))+(p>=1?(el.dataset.s||""):"");if(p<1)requestAnimationFrame(f)})(t0)});

/* Portfolio filter + search */
if($("#pills")){let k="All",q="";const items=[...document.querySelectorAll("#clients .client")];
const draw=()=>{let n=0;items.forEach(el=>{const show=(k==="All"||(k==="Ongoing"?el.dataset.o:el.dataset.s===k))&&el.textContent.toLowerCase().includes(q);el.style.display=show?"":"none";if(show)n++});$("#none").hidden=n>0};
$("#pills").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;k=b.dataset.k;document.querySelectorAll("#pills button").forEach(x=>x.setAttribute("aria-pressed",x===b));draw()});
$("#q").addEventListener("input",e=>{q=e.target.value.trim().toLowerCase();draw()})}

/* Contact form: opens WhatsApp with the filled details */
const f=$("#form");
if(f){f.addEventListener("submit",e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));let ok=true;
const set=(n,m)=>{f.querySelector(`[data-e=${n}]`).textContent=m;if(m)ok=false};
set("name",d.name.trim()?"":"Enter your name.");set("email",/^\S+@\S+\.\S+$/.test(d.email)?"":"Enter a valid email address.");set("msg",d.msg.trim().length>=10?"":"Write at least 10 characters.");
if(!ok)return;
const text=`New enquiry from website\nName: ${d.name}\nEmail: ${d.email}\nI am a: ${d.who}\nMessage: ${d.msg}`;
toast("Opening WhatsApp. Tap Send to deliver your enquiry.");
open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`,"_blank","noopener");
f.reset()})}
