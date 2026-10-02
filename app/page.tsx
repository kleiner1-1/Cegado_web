"use client";
import { useState, useEffect, useRef } from "react";

const WHATSAPP = "573001234567";

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
  const [view,setView]=useState<"inicio"|"creditos"|"planes"|"resenas">("inicio");
  const [cart,setCart]=useState<any[]>([]);
  const [openCart,setOpenCart]=useState(false);
  const [uid,setUid]=useState("");
  const [timeLeft,setTimeLeft]=useState(15*60);
  const [live,setLive]=useState<string|null>(null);
  const [light,setLight]=useState(false);
  const [animateIn,setAnimateIn]=useState(false);
  const audioRef=useRef<HTMLAudioElement>(null);

  useEffect(()=>{
    setAnimateIn(true);
    const t=setInterval(()=>setTimeLeft(v=>v>0?v-1:15*60),1000);
    const l=setInterval(()=>{
      const n=["Juan • Bogotá 🇨🇴","Sofia • Medellín","Andrés • Cali"];
      setLive(`${n[Math.floor(Math.random()*3)]} compró hace 1 min`);
      setTimeout(()=>setLive(null),4000);
    },8000);
    return()=>{clearInterval(t); clearInterval(l)};
  },[]);

  useEffect(()=>{setAnimateIn(false); setTimeout(()=>setAnimateIn(true),50)},[view]);

  const playSound=()=>{
    const ctx=new (window.AudioContext||(window as any).webkitAudioContext)();
    const o=ctx.createOscillator(); const g=ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value=800; g.gain.setValueAtTime(0.3,ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.3);
    o.start(); o.stop(ctx.currentTime+0.3);
  };

  const fmt=(s:number)=>`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
  const total=cart.reduce((a,b)=>a+b.price,0);
  const add=(item:any)=>{playSound(); setCart([...cart,{...item,id:Date.now()}]); setOpenCart(true)};

  const bg = light? "bg-[#fafaf9] text-black" : "bg-[#050507] text-white";
  const card = light? "bg-white border-black/10 shadow-[0_10px_40px_rgba(0,0,0,0.05)]" : "bg-white/[0.03] border-white/[0.06] backdrop-blur-2xl";
  const navBg = light? "bg-white/70 border-black/10" : "bg-black/50 border-white/[0.08]";

  if(!entered){
    return(
      <main className={`min-h-screen ${bg} flex items-center justify-center relative overflow-hidden transition-colors duration-700`}>
        <div className="absolute -top-[30%] -left-[20%] w-[70%] h-[70%] bg-red-600/30 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute -bottom-[30%] -right-[20%] w-[70%] h-[70%] bg-red-900/20 rounded-full blur-[150px]" />
        <div className="relative z-10 text-center px-6 animate-[in_0.8s_ease]">
          <div className={`inline-flex px-4 py-2 rounded-full border text-[10px] tracking-[0.2em] backdrop-blur-xl ${light?'bg-black/5 border-black/10':'bg-white/[0.06] border-white/[0.08]'}`}>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2" /> LIVE • 127 USUARIOS
          </div>
          <h1 className="mt-8 text-[18vw] md:text-[130px] font-black leading-[0.8] tracking-tighter">CEGADO<br/><span className={light?'text-black/20':'bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent'}>-BOT</span><span className="text-red-600">.</span></h1>
          <button onClick={()=>{playSound(); setEntered(true)}} className="mt-10 bg-white text-black px-12 py-5 rounded-full font-black text-xs tracking-widest shadow-2xl hover:scale-105 transition">ENTRAR →</button>
        </div>
        <style>{`@keyframes in{from{opacity:0;transform:translateY(20px) scale(0.98); filter:blur(10px)}to{opacity:1;transform:translateY(0) scale(1); filter:blur(0)}} @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      </main>
    );
  }

  return(
    <main className={`min-h-screen ${bg} relative transition-colors duration-700 selection:bg-red-600`}>
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-[20%] left-[10%] w-[50%] h-[50%] bg-red-600/20 rounded-full blur-[180px]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <nav className="sticky top-0 z-40">
        <div className="mx-auto max-w-[1200px] mt-4 px-4">
          <div className={`flex justify-between items-center h-[56px] px-5 rounded-full backdrop-blur-2xl border shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset] ${navBg}`}>
            <span className="font-black tracking-[0.2em] text-[13px]">CEGADO-BOT.</span>
            <div className="hidden md:flex items-center gap-1 bg-black/5 p-1 rounded-full">
              {[
                {k:"inicio",l:"INICIO"},
                {k:"creditos",l:"CRÉDITOS"},
                {k:"planes",l:"PLANES"},
                {k:"resenas",l:"RESEÑAS ⭐"},
              ].map((v:any)=>(
                <button key={v.k} onClick={()=>{playSound(); setView(v.k)}} className={`px-5 py-2 rounded-full text-[10px] font-black tracking-widest transition ${view===v.k?'bg-white text-black shadow-lg':'opacity-40 hover:opacity-100'}`}>{v.l}</button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={()=>setLight(!light)} className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-xs">{light?'🌙':'☀️'}</button>
              <div className="hidden md:flex px-3 py-1.5 rounded-full bg-red-600/20 border border-red-600/30 text-[10px] font-black text-red-400">⏰ {fmt(timeLeft)}</div>
              <button onClick={()=>setOpenCart(true)} className="bg-white text-black px-5 py-2.5 rounded-full text-[11px] font-black hover:scale-105 transition">CARRITO • {cart.length}</button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`${animateIn?'animate-[in_0.6s_ease]':''}`}>
        {view==="inicio" && (
          <section className="max-w-[1200px] mx-auto px-4 py-10">
            <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-4">
              <div className={`relative rounded-[32px] border p-10 min-h-[520px] flex flex-col overflow-hidden ${card}`}>
                <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-red-600/20 blur-[80px] rounded-full" />
                <div className="relative">
                  <div className="inline-flex px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] tracking-widest">🛡️ GARANTÍA 24H</div>
                  <h2 className="mt-8 text-[56px] font-black leading-[0.85] tracking-tighter">LA PLATAFORMA<br/><span className="text-red-600">#1</span></h2>
                  <div className="mt-10 flex gap-3">
                    <button onClick={()=>setView("creditos")} className="bg-white text-black px-7 py-4 rounded-full font-black text-[11px] hover:scale-105 transition">COMPRAR →</button>
                  </div>
                </div>
                <div className="mt-auto grid grid-cols-3 gap-3">
                  <div className={`rounded-2xl p-4 border ${card}`}><div className="text-2xl font-black"><Counter to={5200} suffix="+" /></div><div className="text-[9px] opacity-30">CLIENTES</div></div>
                  <div className={`rounded-2xl p-4 border ${card}`}><div className="text-2xl font-black"><Counter to={99} suffix="%" /></div><div className="text-[9px] opacity-30">UPTIME</div></div>
                  <div className={`rounded-2xl p-4 border ${card}`}><div className="text-2xl font-black">3 MIN</div><div className="text-[9px] opacity-30">ENTREGA</div></div>
                </div>
              </div>
              <div className="grid gap-4">
                <div className={`rounded-[32px] border overflow-hidden ${card}`}><img src="/hero.jpg" className="w-full h-[260px] object-cover" alt="" /><div className="p-5 flex justify-between"><span className="text-[11px] font-black">⚡ ENTREGA 3 MIN</span><span className="w-2 h-2 bg-green-500 rounded-full animate-ping" /></div></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-[24px] bg-red-600 p-6 text-white"><div className="text-3xl font-black">150</div><div className="text-[10px]">MÁS VENDIDO</div><div className="mt-4 bg-black text-white px-3 py-1 rounded-full inline-block text-[11px]">$15</div></div>
                  <div className={`rounded-[24px] border p-6 ${card}`}><div className="text-[10px] opacity-40">TOP</div><div className="mt-3 text-[11px] space-y-1"><div className="flex justify-between"><span>Juan V.</span><span className="font-black">$420</span></div><div className="flex justify-between opacity-30"><span>Tú</span><span>${total}</span></div></div></div>
                </div>
              </div>
            </div>
          </section>
        )}

        {view==="creditos" && (
          <section className="max-w-[1200px] mx-auto px-4 py-12">
            <h2 className="text-5xl font-black tracking-tighter text-center">CRÉDITOS <span className="text-red-600">BONIFICADOS</span></h2>
            <div className="mt-12 grid md:grid-cols-4 gap-5">
              {[
                {label:"60",sub:"20+40",price:8,stock:3},
                {label:"150",sub:"50+100",price:15,stock:2,best:true},
                {label:"350",sub:"100+250",price:25,stock:7},
                {label:"500",sub:"200+300",price:40,stock:5},
              ].map((c:any)=>(
                <div key={c.label} className={`group relative rounded-[28px] border p-7 flex flex-col min-h-[420px] transition-all hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] ${c.best?`bg-gradient-to-b from-red-600/20 to-red-950/20 border-red-500/30 shadow-[0_0_60px_rgba(220,38,38,0.25)]`:`${card}`}`}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]" />
                  <div className="text-[9px] tracking-widest"><span className="px-2 py-1 rounded-full bg-white/10">⚡ {c.stock} RESTANTES</span></div>
                  <div className="mt-8 text-5xl font-black tracking-tighter">{c.label}</div>
                  <div className="text-red-500 font-black text-xs mt-2">{c.sub}</div>
                  <div className="mt-auto pt-12 text-5xl font-black">${c.price}</div>
                  <button onClick={()=>add(c)} className="mt-6 w-full py-4 rounded-full bg-white text-black font-black text-[11px] group-hover:bg-red-600 group-hover:text-white transition">AÑADIR →</button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {live && <div className="fixed bottom-6 left-6 z-[60] flex items-center gap-3 px-4 py-3 rounded-full bg-white text-black shadow-2xl text-xs font-bold animate-[in_0.5s_ease]"><img src="https://i.pravatar.cc/100?img=12" className="w-7 h-7 rounded-full" alt="" />🔥 {live}</div>}

      {openCart && (
        <div className="fixed inset-0 z-[100] flex items-end md:justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[20px]" onClick={()=>setOpenCart(false)} />
          <div className="relative w-full md:max-w-[440px] h-[88vh] md:h-screen bg-[#0a0a0b]/95 backdrop-blur-2xl border-t md:border-l border-white/10 rounded-t-[32px] md:rounded-none p-6 flex flex-col">
            <div className="flex justify-between"><h3 className="font-black text-xs">CARRITO • {fmt(timeLeft)}</h3><button onClick={()=>setOpenCart(false)} className="w-8 h-8 rounded-full bg-white/10">✕</button></div>
            <div className="flex-1 mt-6 space-y-2 overflow-auto">{cart.map((c:any)=><div key={c.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between text-xs"><span>{c.label} créditos</span><span>${c.price}</span></div>)}</div>
            <div className="pt-6 border-t border-white/10 space-y-4">
              <input value={uid} onChange={e=>setUid(e.target.value)} placeholder="ID DEL BOT" className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-4 text-xs" />
              <div className="flex justify-between font-black"><span>TOTAL</span><span className="text-xl">${total}</span></div>
              <button onClick={()=>{playSound(); window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hola quiero ${cart.map(c=>c.label).join(", ")} TOTAL $${total} ID:${uid}`)}`,"_blank")}} className="w-full bg-white text-black py-4 rounded-full font-black text-xs hover:scale-[1.02] transition">PAGAR POR WHATSAPP →</button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes in{from{opacity:0;transform:translateY(20px) scale(0.98);filter:blur(10px)}to{opacity:1;transform:translateY(0) scale(1);filter:blur(0)}}`}</style>
    </main>
  );
          }
