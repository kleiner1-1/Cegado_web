"use client";
import { useState } from "react";
import ChatWidget from "./components/ChatWidget";

const WHATSAPP = "573001234567"; // TU NUMERO AQUI

const CREDITOS = [
  { pack: "20 + 40", total: 60, price: 8, bonus: "40 BONUS", per: "$0.13 / crédito" },
  { pack: "50 + 100", total: 150, price: 15, bonus: "100 BONUS", per: "$0.10 / crédito", best: true, save: "AHORRA 25%" },
  { pack: "100 + 250", total: 350, price: 25, bonus: "250 BONUS", per: "$0.07 / crédito" },
  { pack: "200 + 300", total: 500, price: 40, bonus: "300 BONUS", per: "$0.08 / crédito", save: "MEJOR VALOR" },
];
const PLANES = [
  { dias: "3 días", price: 10, desc: "Prueba rápida" },
  { dias: "7 días", price: 20, desc: "Más vendido", best: true },
  { dias: "15 días", price: 32, desc: "Recomendado" },
  { dias: "30 días", price: 50, desc: "Pro mensual" },
];

export default function Page() {
  const [entered, setEntered] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [uid, setUid] = useState("");
  const add = (item: any, type: string) => { setCart([...cart, {...item, type, id: Date.now() }]); setOpen(true); if(navigator.vibrate) navigator.vibrate(50); };
  const total = cart.reduce((a, b) => a + b.price, 0);
  const checkout = () => {
    if (!uid.trim()) return alert("Pon tu ID del bot primero");
    const msg = `Hola CEGADO-BOT 🔥 Quiero comprar: ${cart.map(c => `${c.type} ${c.pack || c.dias} $${c.price}`).join(", ")} | TOTAL $${total} | ID: ${uid}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  if (!entered) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hero.jpg" alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,_rgba(220,38,38,0.5),_transparent_60%)]" />
        </div>
        <div className="relative z-10 text-center px-6 w-full max-w-4xl">
          <div className="inline-flex items-center gap-2 text-[9px] tracking-[0.3em] text-white/60 border border-white/10 px-4 py-2 rounded-full bg-white/5 backdrop-blur">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            SISTEMA ONLINE • 5,247 USUARIOS ACTIVOS
          </div>
          <h1 className="mt-8 text-[18vw] md:text-[130px] font-black leading-[0.8] tracking-tighter">
            CEGADO<span className="text-red-600 animate-pulse">.</span>
            <span className="block text-white/10 text-[12vw] md:text-[100px] -mt-4 md:-mt-8">-BOT</span>
          </h1>
          <p className="mt-2 text-[10px] md:text-[11px] tracking-[0.5em] text-white/30">RAPIDEZ • SEGURIDAD • CONFIANZA • CGDPRV 3-44</p>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-xs border-y border-white/10 py-6 bg-white/[0.02] backdrop-blur rounded-2xl">
            <div><span className="font-black text-xl block text-white">5.2k+</span><span className="text-white/40 text-[10px]">CLIENTES</span></div>
            <div><span className="font-black text-xl block text-white">99.9%</span><span className="text-white/40 text-[10px]">UPTIME</span></div>
            <div><span className="font-black text-xl block text-green-400">24/7</span><span className="text-white/40 text-[10px]">SOPORTE IA</span></div>
          </div>
          <button onClick={() => setEntered(true)} className="mt-10 group relative bg-white text-black px-16 py-5 rounded-full font-black text-xs tracking-[0.2em] overflow-hidden hover:scale-105 transition-all">
            <span className="relative z-10">ENTRAR A LA TIENDA →</span>
            <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform" />
            <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition z-20">ENTRAR A LA TIENDA →</span>
          </button>
        </div>
        <ChatWidget />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-red-600">
      <nav className="sticky top-0 z-40 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-[64px] flex justify-between items-center">
          <button onClick={() => setEntered(false)} className="font-black tracking-[0.2em] text-[13px] flex items-center gap-2"><div className="w-2 h-2 bg-red-600 rounded-full animate-ping" /> CEGADO-BOT.</button>
          <div className="flex items-center gap-3">
            <span className="hidden md:block text-[10px] text-white/30 tracking-widest mr-2">PAGO 100% SEGURO</span>
            <button onClick={() => setOpen(true)} className="relative bg-white text-black px-5 py-2.5 rounded-full text-xs font-black flex items-center gap-2">
              CARRITO <span className="bg-black text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center">{cart.length}</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* CREDITOS */}
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">CRÉDITOS<span className="text-white/10">.PRO</span></h2>
          <p className="text-[11px] text-white/40 max-w-xs tracking-wide">Cada crédito = 1 consulta. Bonus automático activado.</p>
        </div>
        <div className="mt-8 grid md:grid-cols-4 gap-[1px] bg-white/10 border border-white/10 rounded-[24px] p-[1px] overflow-hidden">
          {CREDITOS.map(c => (
            <div key={c.pack} className={`group bg-[#0a0a0a] p-7 relative hover:bg-[#111] transition ${c.best? 'bg-[#111] ring-1 ring-red-600 ring-inset z-10' : ''}`}>
              {c.best && <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-red-600 text-[9px] font-black px-3 py-1 rounded-b-full tracking-widest">🔥 POPULAR</div>}
              {c.save &&!c.best && <div className="absolute top-4 right-4 text-[8px] bg-white/10 border border-white/10 px-2 py-1 rounded-full">{c.save}</div>}
              <div className="text-[10px] tracking-widest text-white/30">{c.total} CRÉDITOS TOTALES</div>
              <div className="text-3xl font-black mt-2 tracking-tighter group-hover:text-red-500 transition">{c.pack}</div>
              <div className="text-[11px] mt-1 font-bold text-red-500">{c.bonus} • {c.per}</div>
              <div className="mt-8 flex items-baseline gap-2">
                <span className="text-5xl font-black tracking-tighter">${c.price}</span><span className="text-xs text-white/30">USD</span>
              </div>
              <button onClick={() => add(c, "CREDITO")} className={`w-full mt-6 py-3.5 rounded-full font-black text-[11px] tracking-widest transition ${c.best? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:bg-red-500' : 'bg-white text-black hover:bg-white/90'}`}>AÑADIR →</button>
            </div>
          ))}
        </div>

        {/* PLANES */}
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mt-20">PLANES<span className="text-white/10">.VIP</span></h2>
        <div className="mt-8 grid md:grid-cols-4 gap-[1px] bg-white/10 border border-white/10 rounded-[24px] p-[1px] overflow-hidden">
          {PLANES.map(p => (
            <div key={p.dias} className={`bg-[#0a0a0a] p-7 hover:bg-[#111] transition ${p.best? 'bg-[#111] ring-1 ring-red-600 ring-inset' : ''}`}>
              <div className="text-[10px] text-white/30 tracking-widest">{p.desc.toUpperCase()}</div>
              <div className="text-3xl font-black mt-2">{p.dias}</div>
              <div className="mt-8 text-5xl font-black">${p.price}<span className="text-xs text-white/30"> USD</span></div>
              <button onClick={() => add(p, "PLAN")} className={`w-full mt-6 py-3.5 rounded-full font-black text-[11px] tracking-widest ${p.best? 'bg-red-600 text-white' : 'bg-white/10 border border-white/10 hover:bg-white hover:text-black'}`}>ACTIVAR →</button>
            </div>
          ))}
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-[1px] bg-white/10 border border-white/10 rounded-2xl p-[1px] overflow-hidden text-center">
          <div className="bg-black p-6 text-[11px] tracking-widest"><span className="block text-xl mb-1">⚡</span> ENTREGA EN 3 MINUTOS</div>
          <div className="bg-black p-6 text-[11px] tracking-widest"><span className="block text-xl mb-1">🔒</span> LICENCIA 100% SEGURA</div>
          <div className="bg-black p-6 text-[11px] tracking-widest"><span className="block text-xl mb-1">🤖</span> SOPORTE IA 24/7</div>
        </div>
      </div>

      {/* CARRITO */}
      {open && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-[420px] bg-[#0a0a0a] border-l border-white/10 p-6 flex flex-col">
            <div className="flex justify-between items-center"><h3 className="font-black text-sm tracking-widest">CARRITO [{cart.length}] • ${total}</h3><button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-white/10">✕</button></div>
            <div className="flex-1 mt-6 space-y-3 overflow-auto">
              {cart.length === 0 && <div className="text-white/20 text-xs text-center mt-20">Tu carrito está vacío. Agrega créditos o planes.</div>}
              {cart.map((c:any) => (<div key={c.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex justify-between text-sm"><span className="text-white/60">{c.type}</span><span className="font-black">{c.pack || c.dias} - ${c.price}</span><button onClick={()=>setCart(cart.filter(x=>x.id!==c.id))} className="text-white/20 hover:text-red-500">✕</button></div>))}
            </div>
            <div className="pt-6 border-t border-white/10 space-y-4">
              <input value={uid} onChange={e => setUid(e.target.value)} placeholder="PEGAR ID DEL BOT AQUÍ" className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-4 text-xs outline-none focus:border-red-600 tracking-widest font-bold" />
              <div className="flex justify-between font-black text-lg"><span>TOTAL</span><span>${total} USD</span></div>
              <button onClick={checkout} className="w-full bg-red-600 hover:bg-red-500 py-4 rounded-full font-black text-xs tracking-[0.2em] shadow-[0_0_30px_rgba(220,38,38,0.4)]">PAGAR POR WHATSAPP →</button>
              <p className="text-[9px] text-white/20 text-center tracking-widest">PAGO ENCRIPTADO • ACTIVACIÓN INMEDIATA</p>
            </div>
          </div>
        </div>
      )}
      <ChatWidget />
    </main>
  );
                                                                                                       }
