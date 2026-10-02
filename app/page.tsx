"use client";
import { useState, useEffect } from "react";

const WHATSAPP = "573001234567";

// Componente Notificaciones en vivo
function LiveToasts() {
  const [toast, setToast] = useState<string|null>(null);
  const names = ["Juan de Bogotá","Andrés de Medellín","Camilo de Cali","Sofia de Barranquilla","Mateo de Bucaramanga"];
  const packs = ["150 Créditos","7 Días VIP","350 Créditos","60 Créditos"];
  useEffect(()=>{
    const interval = setInterval(()=>{
      const n = names[Math.floor(Math.random()*names.length)];
      const p = packs[Math.floor(Math.random()*packs.length)];
      setToast(`${n} compró ${p} hace ${Math.floor(Math.random()*3)+1} min`);
      setTimeout(()=>setToast(null),4000);
    },12000);
    return ()=>clearInterval(interval);
  },[]);
  if(!toast) return null;
  return <div className="fixed bottom-6 left-6 z-[999] bg-white text-black px-4 py-3 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">🔥 {toast}</div>;
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([{ role: "bot", content: "Soy CEGADO IA 🤖 ¿En qué te ayudo?" }]);
  const [input, setInput] = useState("");
  const send = async (e:any)=>{e.preventDefault(); if(!input.trim()) return; const u={role:"user",content:input}; setMessages(p=>[...p,u]); setInput(""); const res=await fetch("/api/chat",{method:"POST",body:JSON.stringify({messages:[...messages,u]})}); const d=await res.json(); setMessages(p=>[...p,{role:"bot",content:d.reply}]);};
  return (<><button onClick={()=>setOpen(!open)} className="fixed bottom-6 right-6 z-[999] w-14 h-14 bg-red-600 rounded-full text-xl shadow-[0_0_30px_rgba(220,38,38,0.6)]">💬</button>{open&&<div className="fixed bottom-24 right-6 z-[999] w-[92vw] max-w-[360px] h-[480px] bg-[#0a0a0a] border border-white/10 rounded-[24px] flex flex-col overflow-hidden"><div className="p-4 border-b border-white/10 font-black text-[11px]">CEGADO IA</div><div className="flex-1 overflow-auto p-4 space-y-3">{messages.map((m,i)=>(<div key={i} className={`${m.role==='user'?'text-right':'text-left'}`}><div className={`inline-block px-3 py-2 rounded-2xl text-xs ${m.role==='user'?'bg-white text-black':'bg-white/10'}`}>{m.content}</div></div>))}</div><form onSubmit={send} className="p-3 border-t border-white/10 flex gap-2"><input value={input} onChange={e=>setInput(e.target.value)} placeholder="Tu duda..." className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs" /><button className="bg-red-600 w-10 h-10 rounded-full">↑</button></form></div>}</>);
}

export default function Page(){
  const [entered,setEntered]=useState(false);
  const [view,setView]=useState<"inicio"|"creditos"|"planes"|"resenas"|"admin">("inicio");
  const [cart,setCart]=useState<any[]>([]);
  const [openCart,setOpenCart]=useState(false);
  const [uid,setUid]=useState("");
  const [showSuccess,setShowSuccess]=useState(false);
  const [tracking,setTracking]=useState(0);
  const [stars,setStars]=useState(0);
  const [timeLeft,setTimeLeft]=useState(15*60);
  const [payment,setPayment]=useState("whatsapp");
  const [refCode,setRefCode]=useState("");
  const [showUpsell,setShowUpsell]=useState<any>(null);
  const [reviews,setReviews]=useState<any[]>([
    {id:"1",stars:5,comment:"Me activaron en 2 minutos, super rápido",uid:"7842",pack:"150 Créditos"},
    {id:"2",stars:5,comment:"El bot funciona perfecto, segunda compra",uid:"1290",pack:"7 Días"},
    {id:"3",stars:4,comment:"Buen servicio, 5 min pero todo ok",uid:"5561",pack:"350 Créditos"},
  ]);

  // Temporizador
  useEffect(()=>{const i=setInterval(()=>setTimeLeft(t=> t>0? t-1: 15*60),1000); return()=>clearInterval(i)},[]);
  const fmt = (s:number)=> `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;

  // Ref del URL
  useEffect(()=>{const p=new URLSearchParams(window.location.search); const r=p.get("ref"); if(r) setRefCode(r); const saved=localStorage.getItem("cegado_cart"); if(saved) {const parsed=JSON.parse(saved); if(parsed.length>0) setTimeout(()=>{ if(!openCart) alert("¡Tienes productos en el carrito! 🛒 Termina tu compra y gana bonus extra"); },5000); }},[]);
  useEffect(()=>{localStorage.setItem("cegado_cart",JSON.stringify(cart))},[cart]);

  // Tracking animación
  useEffect(()=>{if(showSuccess){const i=setInterval(()=>setTracking(t=> t<3? t+1: t),1500); return()=>clearInterval(i)}},[showSuccess]);

  const add = (item:any,type:string)=>{
    if(item.price===8){ setShowUpsell({from:item,to:{label:"150 Créditos",pack:"50 + 100 BONUS",price:15}}); }
    setCart([...cart,{...item,type,id:Date.now()}]);
    setOpenCart(true);
  };
  const total = cart.reduce((a,b)=>a+b.price,0);
  const checkout = ()=>{
    if(!uid.trim()) return alert("Pon tu ID del bot");
    if(uid==="ADMINCEGADO"){ setView("admin"); setOpenCart(false); return; }
    const msg=`Hola CEGADO-BOT quiero: ${cart.map(c=>`${c.type} ${c.label} $${c.price} [${payment}]`).join(", ")} TOTAL $${total} ID: ${uid} REF: ${refCode||"ninguno"}`;
    if(payment==="whatsapp") window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,"_blank");
    else alert(`Pedido registrado con ${payment.toUpperCase()}. Te contactamos para el pago.`);
    setOpenCart(false); setShowSuccess(true); setTracking(0);
  };

  const ranking = [{name:"Juan V.",gasto:420},{name:"Andres B.",gasto:380},{name:"Tú",gasto:total,isYou:true},{name:"Camilo R.",gasto:210}].sort((a,b)=>b.gasto-a.gasto);

  if(!entered){
    return (<main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden"><div className="absolute inset-0"><img src="/hero.jpg" alt="" className="w-full h-full object-cover opacity-40" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" /></div><div className="relative z-10 text-center"><h1 className="text-7xl md:text-[120px] font-black leading-[0.8]">CEGADO<br/><span className="text-white/20">-BOT</span><span className="text-red-600">.</span></h1><div className="mt-6 inline-flex bg-red-600/20 border border-red-600/30 px-4 py-2 rounded-full text-xs">⏰ OFERTA EXPIRA EN {fmt(timeLeft)}</div><button onClick={()=>setEntered(true)} className="mt-6 block mx-auto bg-white text-black px-16 py-5 rounded-full font-black text-xs">ENTRAR →</button></div><LiveToasts/><ChatWidget/></main>);
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5"><div className="max-w-7xl mx-auto px-6 h-[64px] flex justify-between items-center"><span className="font-black text-sm">CEGADO-BOT.</span><div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1"><button onClick={()=>setView("inicio")} className={`px-4 py-2 rounded-full text-[10px] font-black ${view==="inicio"?"bg-white text-black":"text-white/40"}`}>INICIO</button><button onClick={()=>setView("creditos")} className={`px-4 py-2 rounded-full text-[10px] font-black ${view==="creditos"?"bg-red-600 text-white":"text-white/40"}`}>CRÉDITOS</button><button onClick={()=>setView("planes")} className={`px-4 py-2 rounded-full text-[10px] font-black ${view==="planes"?"bg-white text-black":"text-white/40"}`}>PLANES</button><button onClick={()=>setView("resenas")} className={`px-4 py-2 rounded-full text-[10px] font-black ${view==="resenas"?"bg-yellow-400 text-black":"text-white/40"}`}>RESEÑAS ⭐</button></div><div className="flex gap-2 items-center"><div className="hidden md:flex bg-red-600 text-white px-3 py-1 rounded-full text-[9px] font-black animate-pulse">⏰ {fmt(timeLeft)}</div><button onClick={()=>setOpenCart(true)} className="bg-white text-black px-4 py-2 rounded-full text-xs font-black">CARRITO {cart.length}</button></div></div></nav>

      {/* MOBILE MENU */}
      <div className="md:hidden flex gap-2 p-4 bg-black border-b border-white/5 overflow-auto"><button onClick={()=>setView("inicio")} className={`px-4 py-2 rounded-full text-xs font-black ${view==="inicio"?"bg-white text-black":"bg-white/10"}`}>INICIO</button><button onClick={()=>setView("creditos")} className={`px-4 py-2 rounded-full text-xs font-black ${view==="creditos"?"bg-red-600":"bg-white/10"}`}>CRÉDITOS</button><button onClick={()=>setView("planes")} className={`px-4 py-2 rounded-full text-xs font-black ${view==="planes"?"bg-white text-black":"bg-white/10"}`}>PLANES</button><button onClick={()=>setView("resenas")} className={`px-4 py-2 rounded-full text-xs font-black ${view==="resenas"?"bg-yellow-400 text-black":"bg-white/10"}`}>RESEÑAS</button></div>

      {view==="inicio" && (
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center"><div><div className="inline-flex gap-2 text-[10px] border border-white/10 px-4 py-2 rounded-full bg-white/5">🛡️ GARANTÍA 24H • REEMBOLSO SI NO FUNCIONA</div><h2 className="mt-6 text-5xl md:text-6xl font-black leading-[0.9]">LA PLATAFORMA<br/><span className="text-red-600">#1</span> DE CEGADO</h2><div className="mt-8 grid grid-cols-3 gap-4 text-center border-y border-white/10 py-6"><div><div className="text-2xl font-black">5.2k+</div><div className="text-[9px] text-white/30">CLIENTES</div></div><div><div className="text-2xl font-black text-red-500">99.9%</div><div className="text-[9px] text-white/30">UPTIME</div></div><div><div className="text-2xl font-black">4.9</div><div className="text-[9px] text-white/30">RATING</div></div></div><div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-4"><div className="text-[11px] font-black">🔗 TU LINK DE REFERIDOS (Gana $1 por venta)</div><div className="mt-2 flex gap-2"><input readOnly value={`cegado-ventas.vercel.app?ref=${uid||"TU_ID"}`} className="flex-1 bg-black border border-white/10 rounded-full px-4 py-2 text-xs" /><button onClick={()=>{navigator.clipboard.writeText(`cegado-ventas.vercel.app?ref=${uid||"TU_ID"}`); alert("Link copiado")}} className="bg-white text-black px-4 py-2 rounded-full text-xs font-black">COPIAR</button></div>{refCode&&<div className="text-[10px] text-green-400 mt-2">✓ Vienes referido por {refCode}, tienes 10% OFF</div>}</div></div><div><div className="rounded-[32px] border border-white/10 overflow-hidden"><img src="/hero.jpg" alt="" className="w-full h-[460px] object-cover" /></div><div className="mt-4 grid grid-cols-3 gap-2 text-[10px] font-bold text-center"><div className="bg-white/5 border border-white/10 p-3 rounded-xl">⚡ 3 MIN ENTREGA</div><div className="bg-white/5 border border-white/10 p-3 rounded-xl">🔒 PAGO SEGURO</div><div className="bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-xl">✓ 24H GARANTÍA</div></div><div className="mt-6 bg-[#111] border border-white/10 rounded-2xl p-4"><div className="text-xs font-black">🏆 TOP COMPRADORES SEMANA</div><div className="mt-3 space-y-2">{ranking.map((r,i)=>(<div key={i} className={`flex justify-between text-xs p-2 rounded-lg ${r.isYou?'bg-red-600/20 border border-red-600/30':''}`}><span>{i+1}. {r.name}</span><span className="font-black">${r.gasto}</span></div>))}</div></div></div></div>
        </section>
      )}

      {view==="creditos" && (
        <section className="py-12 max-w-7xl mx-auto px-6"><div className="flex justify-between flex-wrap gap-4"><h2 className="text-4xl font-black">CRÉDITOS <span className="text-red-600">BONIFICADOS</span> <span className="text-xs bg-red-600 px-2 py-1 rounded-full animate-pulse">⏰ {fmt(timeLeft)}</span></h2><div className="text-xs text-white/40">🔥 Quedan pocos cupos con bonus</div></div><div className="mt-10 grid md:grid-cols-4 gap-6">{[{label:"60 Créditos",pack:"20 + 40",price:8,stock:3},{label:"150 Créditos",pack:"50 + 100",price:15,stock:2,best:true},{label:"350 Créditos",pack:"100 + 250",price:25,stock:7},{label:"500 Créditos",pack:"200 + 300",price:40,stock:5}].map((c:any)=>(<div key={c.label} className={`rounded-[28px] border p-6 flex flex-col min-h-[380px] relative ${c.best?'border-red-600 bg-red-950/20 shadow-[0_0_40px_rgba(220,38,38,0.3)]':'border-white/10 bg-[#111]'}`}><div className="flex justify-between"><span className="text-[9px] bg-white/10 px-2 py-1 rounded-full">⚡ {c.stock} CUPOS RESTANTES</span>{c.best&&<span className="text-[9px] bg-red-600 px-2 py-1 rounded-full animate-pulse">MÁS VENDIDO</span>}</div><div className="mt-6 text-lg font-black">{c.label}</div><div className="text-3xl font-black text-red-500">{c.pack}</div><div className="mt-auto pt-10 text-5xl font-black">${c.price}</div><button onClick={()=>add(c,"CREDITO")} className="w-full mt-4 py-4 rounded-full bg-white text-black font-black text-xs">AÑADIR →</button></div>))}</div></section>
      )}

      {view==="planes" && (
        <section className="py-12 bg-white text-black rounded-t-[32px] min-h-screen"><div className="max-w-7xl mx-auto px-6"><h2 className="text-4xl font-black text-center">PLANES VIP</h2><div className="mt-10 grid md:grid-cols-4 gap-6">{[{label:"3 Días",price:10},{label:"7 Días",price:20,best:true},{label:"15 Días",price:32},{label:"30 Días",price:50}].map((p:any)=>(<div key={p.label} className={`rounded-[28px] border p-6 flex flex-col min-h-[360px] ${p.best?'bg-black text-white border-black scale-105 shadow-2xl':'bg-white border-black/10'}`}><div className="text-xl font-black">{p.label}</div><div className="text-5xl font-black mt-auto pt-12">${p.price}</div><button onClick={()=>add(p,"PLAN")} className="w-full mt-4 py-4 rounded-full bg-red-600 text-white font-black text-xs">ACTIVAR</button></div>))}</div></div></section>
      )}

      {view==="resenas" && (
        <section className="py-12 max-w-7xl mx-auto px-6"><h2 className="text-4xl font-black">RESEÑAS <span className="text-yellow-400">REALES ⭐ 4.9</span></h2><div className="mt-8 grid md:grid-cols-3 gap-4">{reviews.map((r:any)=>(<div key={r.id} className="rounded-2xl bg-[#111] border border-white/10 p-5"><div className="flex text-yellow-400">{"★".repeat(r.stars)}</div><p className="mt-3 text-sm">"{r.comment}"</p><div className="mt-3 text-[10px] text-white/30">ID {r.uid} • {r.pack}</div></div>))}</div></section>
      )}

      {view==="admin" && (
        <section className="py-12 max-w-7xl mx-auto px-6"><h2 className="text-4xl font-black">PANEL ADMIN 🔐</h2><div className="mt-8 grid md:grid-cols-3 gap-4"><div className="bg-[#111] border border-white/10 rounded-2xl p-6"><div className="text-xs text-white/40">VENTAS HOY</div><div className="text-3xl font-black mt-2">$ {total} + 127 ventas demo</div></div><div className="bg-[#111] border border-white/10 rounded-2xl p-6"><div className="text-xs text-white/40">RESEÑAS NUEVAS</div><div className="text-3xl font-black mt-2">{reviews.length} reseñas</div></div><div className="bg-[#111] border border-white/10 rounded-2xl p-6"><div className="text-xs text-white/40">REFERIDOS</div><div className="text-3xl font-black mt-2">12 referidos activos</div></div></div><div className="mt-8 bg-[#111] border border-white/10 rounded-2xl p-6"><h3 className="font-black text-sm">PEDIDOS PENDIENTES</h3><div className="mt-4 space-y-2">{cart.map((c:any)=>(<div key={c.id} className="flex justify-between bg-white/5 p-3 rounded-xl text-xs"><span>{c.label} - ID {uid}</span><button className="bg-green-600 px-3 py-1 rounded-full">MARCAR ENTREGADO ✓</button></div>))}</div></div></section>
      )}

      {/* CARRITO CON METODOS DE PAGO */}
      {openCart && (
        <div className="fixed inset-0 z-[100] flex justify-end"><div className="absolute inset-0 bg-black/80" onClick={()=>setOpenCart(false)} /><div className="relative w-full max-w-md bg-[#0a0a0a] border-l border-white/10 p-6 flex flex-col"><h3 className="font-black text-sm">CARRITO [{cart.length}] - {fmt(timeLeft)} ⏰</h3><div className="flex-1 mt-6 space-y-2 overflow-auto">{cart.map((c:any)=>(<div key={c.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between text-xs"><span>{c.label}</span><span>${c.price}</span></div>))}</div><div className="pt-6 border-t border-white/10 space-y-3"><input value={uid} onChange={e=>setUid(e.target.value)} placeholder="ID DEL BOT (o ADMINCEGADO para admin)" className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-xs" /><div className="text-[11px] font-black">MÉTODO DE PAGO</div><div className="grid grid-cols-2 gap-2">{["whatsapp","nequi","bancolombia","paypal"].map(m=>(<button key={m} onClick={()=>setPayment(m)} className={`py-2 rounded-full text-[11px] font-black border ${payment===m?'bg-white text-black border-white':'bg-white/5 border-white/10'}`}>{m.toUpperCase()}</button>))}</div><div className="flex justify-between font-black"><span>TOTAL</span><span>${total}</span></div><button onClick={checkout} className="w-full bg-red-600 py-4 rounded-full font-black text-xs">PAGAR CON {payment.toUpperCase()} →</button><div className="text-[9px] text-center text-white/20 mt-2">🛡️ GARANTÍA 24H • REEMBOLSO ASEGURADO</div></div></div></div>
      )}

      {showUpsell && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/80" onClick={()=>setShowUpsell(null)} /><div className="relative bg-[#111] border border-white/10 rounded-[28px] p-6 max-w-sm w-full text-center"><h3 className="font-black">¡ESPERA! 🔥</h3><p className="text-sm mt-2 text-white/60">Por solo $7 más llévate {showUpsell.to.label} en lugar de {showUpsell.from.label}</p><div className="mt-4 flex gap-2"><button onClick={()=>{add(showUpsell.to,"CREDITO"); setShowUpsell(null);}} className="flex-1 bg-red-600 py-3 rounded-full font-black text-xs">SÍ, QUIERO MÁS →</button><button onClick={()=>setShowUpsell(null)} className="flex-1 bg-white/10 py-3 rounded-full font-black text-xs">NO, GRACIAS</button></div></div></div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/90 backdrop-blur-xl" /><div className="relative w-full max-w-[440px] bg-[#111] border border-white/10 rounded-[32px] p-8 text-center"><div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center text-2xl">✓</div><h2 className="mt-4 text-2xl font-black">¡COMPRA REALIZADA!</h2><div className="mt-6 flex justify-between text-[10px]">{["PAGADO","VERIFICANDO","ACTIVADO"].map((s,i)=>(<div key={s} className={`flex-1 ${tracking>=i?'text-green-400':''}`}><div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${tracking>=i?'bg-green-500 text-black':'bg-white/10'}`}>{tracking>=i?'✓':i+1}</div><div className="mt-2 font-bold">{s}</div></div>))}</div><div className="mt-6"><div className="flex justify-center gap-2">{[1,2,3,4,5].map(n=>(<button key={n} onClick={()=>setStars(n)} className={`w-10 h-10 rounded-full ${stars>=n?'bg-yellow-400 text-black':'bg-white/10'}`}>★</button>))}</div></div><button onClick={()=>{const r={id:Date.now().toString(),stars:stars||5,comment:"Excelente servicio",uid:uid.slice(0,4),pack:cart[0]?.label}; setReviews([r,...reviews]); setShowSuccess(false); setCart([]); setView("resenas");}} className="w-full mt-6 bg-red-600 py-4 rounded-full font-black text-xs">ENVIAR RESEÑA ⭐</button></div></div>
      )}

      <LiveToasts/>
      <ChatWidget/>
    </main>
  );
}
