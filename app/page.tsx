"use client";
import { useState } from "react";

const WHATSAPP = "573001234567"; // CAMBIA AQUI TU NUMERO REAL

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
  const [cart, setCart] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [uid, setUid] = useState("");

  const add = (item: any, type: string) => {
    setCart([...cart, {...item, type, id: Date.now() }]);
    setOpen(true);
  };
  const total = cart.reduce((a, b) => a + b.price, 0);

  const checkout = () => {
    if (!uid) return alert("Escribe tu ID del bot");
    const msg = `Hola CEGADO-BOT 👁️\nQuiero comprar:\n${cart.map(c => `• ${c.type}: ${c.pack || c.dias} - $${c.price} USD`).join("\n")}\n\nTOTAL: $${total} USD\nID: ${uid}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.18),_transparent_70%)]" />
      </div>

      <div className="relative z-10">
        <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
            <span className="font-black tracking-[0.2em] text-sm">CEGADO-BOT</span>
            <button onClick={() => setOpen(true)} className="bg-white text-black px-5 py-2 rounded-full text-xs font-black">CARRITO {cart.length}</button>
          </div>
        </nav>

        <section className="max-w-7xl mx-auto px-6 pt-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-[10px] tracking-[0.3em] text-white/40 border border-white/10 inline-flex px-3 py-1 rounded-full">RAPIDEZ • SEGURIDAD • CONFIANZA</div>
            <h1 className="mt-6 text-7xl md:text-8xl font-black leading-[0.8] tracking-tighter">
              CEGADO<br/><span className="text-white/20">-BOT</span><span className="text-red-600">.</span>
            </h1>
            <p className="mt-6 text-white/40 text-sm max-w-md">Créditos • Planes • Tu acceso sin límites. Estabilidad y rendimiento. Proyección total.</p>
            <div className="mt-8 flex gap-3">
              <a href="#creditos" className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full text-xs font-black tracking-widest">VER CRÉDITOS</a>
              <a href="#planes" className="border border-white/10 px-8 py-4 rounded-full text-xs font-black tracking-widest">VER PLANES</a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-red-600/20 blur-[80px] rounded-full" />
            <img src="/hero.jpg" alt="Cegado Bot" className="relative w-full rounded-[24px] border border-white/10 aspect-[4/5] object-cover grayscale" />
          </div>
        </section>

        <section id="creditos" className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-black tracking-tighter mb-8">VENTA DE <span className="text-white/20">CRÉDITOS</span></h2>
          <div className="grid md:grid-cols-4 gap-[1px] bg-white/10 border border-white/10 rounded-[20px] p-[1px] overflow-hidden">
            {CREDITOS.map(c => (
              <div key={c.pack} className={`bg-[#0a0a0a] p-6 relative hover:bg-[#111] ${c.best?"border border-red-600/50":""}`}>
                {c.best && <span className="absolute top-3 right-3 bg-red-600 text-[8px] font-black px-2 py-1 rounded-full">POPULAR</span>}
                <div className="text-[10px] text-white/30">PAQUETE</div>
                <div className="text-2xl font-black">{c.pack}</div>
                <div className="text-xs text-red-400 font-bold">{c.bonus}</div>
                <div className="mt-6 text-4xl font-black">${c.price}.00<span className="text-sm text-white/30"> USD</span></div>
                <button onClick={() => add(c, "CREDITO")} className="w-full mt-6 py-3 rounded-full bg-white text-black font-black text-xs">AÑADIR →</button>
              </div>
            ))}
          </div>
        </section>

        <section id="planes" className="max-w-7xl mx-auto px-6 pb-20">
          <h2 className="text-3xl font-black tracking-tighter mb-8">VENTA DE <span className="text-white/20">PLANES</span></h2>
          <div className="grid md:grid-cols-4 gap-[1px] bg-white/10 border border-white/10 rounded-[20px] p-[1px] overflow-hidden">
            {PLANES.map(p => (
              <div key={p.dias} className={`bg-[#0a0a0a] p-6 relative hover:bg-[#111] ${p.best?"border border-red-600/50":""}`}>
                {p.best && <span className="absolute top-3 right-3 bg-white text-black text-[8px] font-black px-2 py-1 rounded-full">BEST</span>}
                <div className="text-[10px] text-white/30">DURACIÓN</div>
                <div className="text-2xl font-black">{p.dias}</div>
                <div className="mt-6 text-4xl font-black">${p.price}.00<span className="text-sm text-white/30"> USD</span></div>
                <button onClick={() => add(p, "PLAN")} className={`w-full mt-6 py-3 rounded-full font-black text-xs ${p.best?"bg-red-600 text-white":"bg-white/10 border border-white/10"}`}>AÑADIR →</button>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t border-white/5 py-8 text-center text-[10px] tracking-widest text-white/20">CEGADO-BOT © 2026 • CGDPRV 3-44</footer>
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-md bg-[#0a0a0a] border-l border-white/10 p-6 flex flex-col">
            <div className="flex justify-between"><h3 className="font-black text-sm">CARRITO [{cart.length}]</h3><button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-white/10">✕</button></div>
            <div className="flex-1 mt-6 space-y-2 overflow-auto">
              {cart.map(c => (<div key={c.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between text-sm"><span>{c.type}: {c.pack || c.dias}</span><span className="font-black">${c.price}</span></div>))}
            </div>
            <div className="pt-6 border-t border-white/10 space-y-3">
              <input value={uid} onChange={e => setUid(e.target.value)} placeholder="ID DEL BOT" className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-xs outline-none focus:border-red-600" />
              <div className="flex justify-between font-black"><span>TOTAL</span><span>${total} USD</span></div>
              <button onClick={checkout} disabled={!cart.length} className="w-full bg-red-600 py-4 rounded-full font-black text-xs disabled:opacity-20">PAGAR POR WHATSAPP</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
  }
