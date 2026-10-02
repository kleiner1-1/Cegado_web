"use client";
import { useState } from "react";
import ChatWidget from "./components/ChatWidget";

const WHATSAPP = "573001234567"; // CAMBIA TU NUMERO AQUI

const CREDITOS = [
  { pack: "20 + 40", total: 60, price: 8, bonus: "40 BONUS" },
  { pack: "50 + 100", total: 150, price: 15, bonus: "100 BONUS", best: true },
  { pack: "100 + 250", total: 350, price: 25, bonus: "250 BONUS" },
  { pack: "200 + 300", total: 500, price: 40, bonus: "300 BONUS" },
];
const PLANES = [
  { dias: "3 días", price: 10 },
  { dias: "7 días", price: 20, best: true },
  { dias: "15 días", price: 32 },
  { dias: "30 días", price: 50 },
];

export default function Page() {
  const [entered, setEntered] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [uid, setUid] = useState("");
  const add = (item: any, type: string) => { setCart([...cart, {...item, type, id: Date.now() }]); setOpen(true); };
  const total = cart.reduce((a, b) => a + b.price, 0);
  const checkout = () => {
    if (!uid) return alert("Pon tu ID del bot");
    const msg = `Hola CEGADO-BOT quiero comprar: ${cart.map(c => `${c.type} ${c.pack || c.dias} $${c.price}`).join(", ")} TOTAL $${total} ID: ${uid}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  if (!entered) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hero.jpg" alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.35),_transparent_70%)]" />
        </div>
        <div className="relative z-10 text-center px-6">
          <div className="text-[10px] tracking-[0.3em] text-white/50 border border-white/10 inline-flex px-4 py-1.5 rounded-full bg-white/5 backdrop-blur">RAPIDEZ • SEGURIDAD • CONFIANZA • CGDPRV 3-44</div>
          <h1 className="mt-8 text-7xl md:text-[110px] font-black leading-[0.8] tracking-tighter">CEGADO<br/><span className="text-white/10">-BOT</span><span className="text-red-600">.</span></h1>
          <p className="mt-4 text-[11px] tracking-[0.3em] text-white/30">TU ACCESO SIN LIMITES</p>
          <button onClick={() => setEntered(true)} className="mt-10 bg-white text-black px-14 py-5 rounded-full font-black text-xs tracking-[0.2em] hover:scale-105 transition">ENTRAR A LA TIENDA →</button>
        </div>
        <ChatWidget />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <button onClick={() => setEntered(false)} className="font-black tracking-[0.2em] text-sm">← CEGADO-BOT</button>
          <button onClick={() => setOpen(true)} className="bg-white text-black px-5 py-2 rounded-full text-xs font-black">CARRITO ({cart.length})</button>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-black tracking-tighter">VENTA DE <span className="text-white/20">CRÉDITOS</span></h2>
        <div className="mt-8 grid md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-[20px] p-px overflow-hidden">
          {CREDITOS.map(c => (
            <div key={c.pack} className={`bg-[#0a0a0a] p-6 relative ${c.best? 'ring-1 ring-red-600 ring-inset' : ''}`}>
              {c.best && <span className="absolute top-3 right-3 bg-red-600 text-[8px] font-black px-2 py-1 rounded-full">POPULAR</span>}
              <div className="text-[10px] text-white/30">{c.total} CREDITOS</div>
              <div className="text-2xl font-black mt-1">{c.pack}</div>
              <div className="text-xs text-red-400 font-bold">{c.bonus}</div>
              <div className="mt-6 text-4xl font-black">${c.price}<span className="text-sm text-white/30"> USD</span></div>
              <button onClick={() => add(c, "CREDITO")} className="w-full mt-6 py-3 rounded-full bg-white text-black font-black text-xs">AÑADIR →</button>
            </div>
          ))}
        </div>
        <h2 className="text-3xl font-black tracking-tighter mt-16">VENTA DE <span className="text-white/20">PLANES</span></h2>
        <div className="mt-8 grid md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-[20px] p-px overflow-hidden">
          {PLANES.map(p => (
            <div key={p.dias} className={`bg-[#0a0a0a] p-6 ${p.best? 'ring-1 ring-red-600 ring-inset' : ''}`}>
              <div className="text-[10px] text-white/30">DURACION</div>
              <div className="text-2xl font-black mt-1">{p.dias}</div>
              <div className="mt-6 text-4xl font-black">${p.price}<span className="text-sm text-white/30"> USD</span></div>
              <button onClick={() => add(p, "PLAN")} className={`w-full mt-6 py-3 rounded-full font-black text-xs ${p.best? 'bg-red-600 text-white' : 'bg-white/10 border border-white/10'}`}>AÑADIR →</button>
            </div>
          ))}
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-md bg-[#0a0a0a] border-l border-white/10 p-6 flex flex-col">
            <div className="flex justify-between"><h3 className="font-black text-sm">CARRITO [{cart.length}]</h3><button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-white/10">✕</button></div>
            <div className="flex-1 mt-6 space-y-2 overflow-auto">
              {cart.map((c:any) => (<div key={c.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between text-sm"><span>{c.type}: {c.pack || c.dias}</span><span className="font-black">${c.price}</span></div>))}
            </div>
            <div className="pt-6 border-t border-white/10 space-y-3">
              <input value={uid} onChange={e => setUid(e.target.value)} placeholder="ID DEL BOT" className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-xs outline-none focus:border-red-600" />
              <div className="flex justify-between font-black"><span>TOTAL</span><span>${total} USD</span></div>
              <button onClick={checkout} className="w-full bg-red-600 py-4 rounded-full font-black text-xs">PAGAR POR WHATSAPP</button>
            </div>
          </div>
        </div>
      )}
      <ChatWidget />
    </main>
  );
}
