"use client";
import { useState, useEffect } from "react";

const WHATSAPP = "573001234567";
const NEQUI_NUM = "3001234567";

function Counter({ to, suffix="" }: { to:number, suffix?:string }){
  const [n,setN]=useState(0);
  useEffect(()=>{
    let cur=0; const step=to/50;
    const i=setInterval(()=>{cur+=step; if(cur>=to){cur=to; clearInterval(i);} setN(Math.floor(cur));},20);
    return()=>clearInterval(i);
  },[to]);
  return <>{n.toLocaleString()}{suffix}</>;
}

export default function Page(){
  const [entered,setEntered]=useState(false);
  const [view,setView]=useState("inicio");
  const [cart,setCart]=useState<any[]>([]);
  const [openCart,setOpenCart]=useState(false);
  const [uid,setUid]=useState("");
  const [payment,setPayment]=useState("nequi");
  const [timeLeft,setTimeLeft]=useState(15*60);
  const [live,setLive]=useState<string|null>(null);
  const [light,setLight]=useState(false);

  useEffect(()=>{
    const t=setInterval(()=>setTimeLeft(v=>v>0?v-1:15*60),1000);
    const l=setInterval(()=>{
      const n=["Juan • Bogotá","Sofia • Medellín","Andrés • Cali"];
      setLive(`${n[Math.floor(Math.random()*3)]} compró 150 créditos`);
      setTimeout(()=>setLive(null),4000);
    },8000);
    return()=>{clearInterval(t); clearInterval(l)};
  },[]);

  const playSound=()=>{
    try{
      const ctx=new (window.AudioContext||(window as any).webkitAudioContext)();
      const o=ctx.createOscillator(); const g=ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.value=800; g.gain.setValueAtTime(0.2,ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.25);
      o.start(); o.stop(ctx.currentTime+0.25);
    }catch{}
  };

  const fmt=(s:number)=>`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
  const total=cart.reduce((a,b)=>a+b.price,0);
  const add=(item:any)=>{playSound(); setCart([...cart,{...item,id:Date.now()}]); setOpenCart(true)};

  const bg = light? "bg-[#fafaf9] text-black" : "bg-[#050507] text-white";
  const card = light? "bg-white border-black/10 shadow-lg" : "bg-white/[0.04] border-white/[0.08] backdrop-blur-2xl";
  const navBg = light? "bg-white/80 border-black/10" : "bg-black/50 border-white/10";

  if(!entered){
    return(
      <main className={`min-h-screen ${bg} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute -top-[30%] -left-[20%] w-[70%] h-[70%] bg-red-600/30 rounded-full blur-[150px]" />
        <div className="absolute -bottom-[30%] -right-[20%] w-[70%] h-[70%] bg-red-900/20 rounded-full blur-[150px]" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-[18vw] md:text-[120px] font-black leading-[0.8] tracking-tighter">CEGADO-BOT<span className="text-red-600">.</span></h1>
          <p className="mt-6 text-xs tracking-widest opacity-40">PLATAFORMA #1 • ENTREGA 3 MIN</p>
          <button onClick={()=>{playSound(); setEntered(true)}} className="mt-10 bg-white text-black px-10 py-4 rounded-full font-black text-xs">ENTRAR →</button>
        </div>
      </main>
    );
  }

  return(
    <main className={`min-h-screen ${bg} relative`}>
      {/* NAV */}
      <div className="sticky top-0 z-40 pt-4 px-4">
        <div className={`mx-auto max-w-[1200px] flex justify-between items-center h-[56px] px-5 rounded-full backdrop-blur-2xl border ${navBg}`}>
          <span className="font-black text-[13px] tracking-widest">CEGADO-BOT.</span>
          <div className="hidden md:flex gap-1 bg-black/5 p-1 rounded-full">
            {[
              {k:"inicio",l:"INICIO"},
              {k:"creditos",l:"CRÉDITOS"},
              {k:"planes",l:"PLANES"},
              {k:"resenas",l:"RESEÑAS"},
            ].map((v:any)=>(
              <button key={v.k} onClick={()=>{playSound(); setView(v.k)}} className={`px-5 py-2 rounded-full text-[10px] font-black tracking-widest ${view===v.k?'bg-white text-black shadow':'opacity-40 hover:opacity-100'}`}>{v.l}</button>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <button onClick={()=>setLight(!light)} className="w-8 h-8 rounded-full bg-white/10 text-xs">{light?'🌙':'☀️'}</button>
            <span className="hidden md:block px-3 py-1.5 rounded-full bg-red-600/20 text-[10px] font-black text-red-400">⏰ {fmt(timeLeft)}</span>
            <button onClick={()=>setOpenCart(true)} className="bg-white text-black px-5 py-2.5 rounded-full text-[11px] font-black">CARRITO {cart.length} • ${total}</button>
          </div>
        </div>
        <div className="md:hidden flex gap-2 mt-3 overflow-auto">
          {["inicio","creditos","planes","resenas"].map(k=>(
            <button key={k} onClick={()=>setView(k)} className={`px-4 py-2 rounded-full text-[10px] font-black whitespace-nowrap ${view===k?'bg-white text-black':'bg-white/10'}`}>{k.toUpperCase()}</button>
          ))}
        </div>
      </div>

      {/* VIEWS - CADA UNA SEPARADA */}
      <div className="max-w-[1200px] mx-auto px-4 py-10">

        {/* INICIO */}
        {view==="inicio" && (
          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-4 animate-[in_0.4s_ease]">
            <div className={`rounded-[32px] border p-10 min-h-[500px] flex flex-col ${card}`}>
              <div className="inline-flex px-3 py-1 rounded-full bg-white/10 text-[10px]">🛡️ GARANTÍA 24H</div>
              <h2 className="mt-8 text-[50px] font-black leading-[0.85]">LA PLATAFORMA<br/><span className="text-red-600">#1</span></h2>
              <p className="mt-6 text-sm opacity-50 max-w-[300px]">Más de <Counter to={5200} /> clientes. Entrega 3 min.</p>
              <div className="mt-10 flex gap-3">
                <button onClick={()=>setView("creditos")} className="bg-white text-black px-6 py-3 rounded-full font-black text-[11px]">CRÉDITOS →</button>
                <button onClick={()=>setView("planes")} className="bg-white/10 border border-white/10 px-6 py-3 rounded-full font-black text-[11px]">PLANES VIP</button>
              </div>
              <div className="mt-auto grid grid-cols-3 gap-3">
                <div className={`rounded-2xl p-4 border ${card}`}><div className="text-xl font-black"><Counter to={5200} suffix="+" /></div><div className="text-[9px] opacity-30">CLIENTES</div></div>
                <div className={`rounded-2xl p-4 border ${card}`}><div className="text-xl font-black">99%</div><div className="text-[9px] opacity-30">UPTIME</div></div>
                <div className={`rounded-2xl p-4 border ${card}`}><div className="text-xl font-black">3 MIN</div><div className="text-[9px] opacity-30">ENTREGA</div></div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className={`rounded-[32px] border overflow-hidden ${card}`}><img src="/hero.jpg" alt="" className="w-full h-[260px] object-cover" /><div className="p-4 flex justify-between text-[11px] font-black"><span>⚡ ENTREGA 3 MIN</span><span className="w-2 h-2 bg-green-500 rounded-full animate-ping" /></div></div>
              <div className={`rounded-[24px] border p-5 flex justify-between items-center ${card}`}><span className="text-[11px] font-black">🔗 GANA $1 POR REFERIDO</span><button onClick={()=>{navigator.clipboard.writeText("cegado-ventas.vercel.app?ref=ID"); alert("Copiado")}} className="bg-white text-black px-3 py-1 rounded-full text-[10px] font-black">COPIAR</button></div>
            </div>
          </div>
        )}

        {/* CREDITOS */}
        {view==="creditos" && (
          <div className="animate-[in_0.4s_ease]">
            <h2 className="text-4xl font-black text-center">CRÉDITOS <span className="text-red-600">BONIFICADOS</span></h2>
            <div className="mt-10 grid md:grid-cols-4 gap-4">
              {[
                {label:"60",sub:"20+40 BONUS",price:8,stock:3},
                {label:"150",sub:"50+100 BONUS",price:15,stock:2,best:true},
                {label:"350",sub:"100+250 BONUS",price:25,stock:7},
                {label:"500",sub:"200+300 BONUS",price:40,stock:5},
              ].map((c:any)=>(
                <div key={c.label} className={`rounded-[28px] border p-7 min-h-[380px] flex flex-col ${c.best?'bg-red-600/20 border-red-500/40 shadow-[0_0_40px_rgba(220,38,38,0.3)]':' '+card}`}>
                  <div className="flex justify-between text-[9px]"><span className="px-2 py-1 rounded-full bg-white/10">⚡ {c.stock} RESTANTES</span>{c.best&&<span className="px-2 py-1 rounded-full bg-red-600 text-white">BEST</span>}</div>
                  <div className="mt-6 text-4xl font-black">{c.label}</div>
                  <div className="text-red-500 text-xs font-black mt-1">{c.sub}</div>
                  <div className="mt-auto text-4xl font-black">${c.price}</div>
                  <button onClick={()=>add(c)} className="mt-4 w-full py-3 rounded-full bg-white text-black font-black text-[11px]">AÑADIR →</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PLANES - AHORA SI SALE */}
        {view==="planes" && (
          <div className="animate-[in_0.4s_ease]">
            <h2 className="text-4xl font-black text-center">PLANES <span className="text-red-600">VIP</span></h2>
            <p className="text-center mt-2 text-xs opacity-40">Acceso total sin límites • Activación inmediata</p>
            <div className="mt-10 grid md:grid-cols-4 gap-4">
              {[
                {l:"3 DÍAS",p:10,d:"Prueba total"},
                {l:"7 DÍAS",p:20,d:"Más popular 🔥",best:true},
                {l:"15 DÍAS",p:32,d:"Ahorra 20%"},
                {l:"30 DÍAS",p:50,d:"Mejor valor"},
              ].map((x:any)=>(
                <div key={x.l} className={`rounded-[28px] p-7 min-h-[360px] flex flex-col border ${x.best?'bg-white text-black border-white scale-105 shadow-2xl':' '+card}`}>
                  <div className="text-lg font-black">{x.l}</div>
                  <div className="text-[11px] opacity-50 mt-1">{x.d}</div>
                  <div className="mt-auto text-4xl font-black">${x.p}</div>
                  <div className="text-[10px] opacity-40 mt-1">${x.p*4100} COP</div>
                  <button onClick={()=>add({label:x.l,price:x.p})} className={`mt-4 w-full py-3 rounded-full font-black text-[11px] ${x.best?'bg-red-600 text-white':'bg-white text-black'}`}>ACTIVAR →</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESEÑAS - ARREGLADO */}
        {view==="resenas" && (
          <div className="animate-[in_0.4s_ease]">
            <h2 className="text-4xl font-black">RESEÑAS <span className="text-yellow-400">⭐ 4.9/5</span></h2>
            <p className="text-xs opacity-40 mt-2">+5.200 clientes verificados</p>
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {[
                {s:5,t:"Me activaron en 2 minutos, super rápido",id:"7842",name:"Juan V."},
                {s:5,t:"El bot funciona perfecto, segunda compra",id:"1290",name:"Sofia M."},
                {s:5,t:"Pagué por Nequi y me llegó al instante",id:"5561",name:"Andrés B."},
                {s:4,t:"Buen servicio, 5 min pero todo ok",id:"3312",name:"Mateo R."},
                {s:5,t:"Confiable 100%, recomendado",id:"9021",name:"Camila T."},
                {s:5,t:"El QR de Nequi facilita todo",id:"4410",name:"Daniel S."},
              ].map((r,i)=>(
                <div key={i} className={`rounded-[20px] border p-5 ${card}`}>
                  <div className="flex justify-between"><span className="text-yellow-400 text-sm">{"★".repeat(r.s)}</span><span className="text-[9px] opacity-30">ID {r.id} ✓</span></div>
                  <p className="mt-3 text-sm">"{r.t}"</p>
                  <div className="mt-3 flex items-center gap-2"><img src={`https://i.pravatar.cc/100?img=${10+i}`} className="w-6 h-6 rounded-full" alt="" /><span className="text-[11px] font-bold">{r.name} • Verificado</span></div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {live && <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black shadow-2xl text-xs font-bold"><span>🔥 {live}</span></div>}

      {/* CARRITO CON PAGOS */}
      {openCart && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={()=>setOpenCart(false)} />
          <div className="relative w-full md:max-w-[420px] h-screen bg-[#0a0a0b] border-l border-white/10 p-6 flex flex-col">
            <div className="flex justify-between text-white"><h3 className="font-black text-xs">CARRITO • ⏰ {fmt(timeLeft)}</h3><button onClick={()=>setOpenCart(false)} className="w-8 h-8 rounded-full bg-white/10">✕</button></div>
            <div className="flex-1 mt-6 space-y-2 overflow-auto">
              {cart.length===0 && <div className="text-center mt-20 text-white/20 text-xs">VACÍO</div>}
              {cart.map((c:any)=><div key={c.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between text-white text-xs"><span>{c.label}</span><span>${c.price}</span></div>)}
            </div>
            <div className="pt-4 border-t border-white/10 space-y-3">
              <input value={uid} onChange={e=>setUid(e.target.value)} placeholder="ID DEL BOT" className="w-full bg-white/10 border border-white/10 rounded-full px-4 py-3 text-xs text-white" />
              <div className="grid grid-cols-4 gap-2">
                {["nequi","bancolombia","paypal","binance"].map(k=>(
                  <button key={k} onClick={()=>setPayment(k)} className={`py-2 rounded-full text-[9px] font-black border ${payment===k?'bg-white text-black':'bg-white/5 text-white/40 border-white/10'}`}>{k.toUpperCase()}</button>
                ))}
              </div>
              {payment==="nequi" && <div className="bg-white rounded-2xl p-4 text-center text-black"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${NEQUI_NUM} $${total} ID ${uid}`} className="w-32 h-32 mx-auto rounded-xl" alt="" /><div className="mt-2 font-black">{NEQUI_NUM}</div><div className="text-[10px] opacity-60">${total*4100} COP • ID: {uid||"TU_ID"}</div></div>}
              {payment==="bancolombia" && <div className="bg-white rounded-2xl p-4 text-center text-black text-xs">BANCOLOMBIA<br/>Ahorros 123456<br/>${total*4100} COP</div>}
              {payment==="paypal" && <div className="bg-[#0070ba] rounded-2xl p-4 text-center text-white text-xs">PAYPAL<br/>paypal.me/cegadobot/{total}</div>}
              {payment==="binance" && <div className="bg-[#f3ba2f] rounded-2xl p-4 text-center text-black text-xs">BINANCE PAY<br/>ID: 123456 - ${total} USDT</div>}
              <div className="flex justify-between font-black text-white"><span>TOTAL</span><span>${total}</span></div>
              <button onClick={()=>window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hola quiero ${cart.map(c=>c.label).join(",")} TOTAL $${total} ID:${uid} PAGO:${payment}`)}`,"_blank")} className="w-full bg-white text-black py-3 rounded-full font-black text-xs">PAGAR POR WHATSAPP →</button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </main>
  );
            }
