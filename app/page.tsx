"use client";
import { useState } from "react";

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: "bot", content: "Hola soy CEGADO IA. ¿En qué te ayudo?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const send = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: [...messages, userMsg] })
    });
    const data = await res.json();
    setMessages(prev => [...prev, { role: "bot", content: data.reply }]);
    setLoading(false);
  };
  return (
    <>
      <button onClick={() => setOpen(!open)} className="fixed bottom-6 right-6 z-[999] w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-xl shadow-[0_0_30px_rgba(220,38,38,0.6)]">💬</button>
      {open && (
        <div className="fixed bottom-24 right-6 z-[999] w-[92vw] max-w-[360px] h-[480px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-[24px] flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/10 flex justify-between"><span className="font-black text-[11px]">CEGADO IA</span><span className="text-[9px] bg-green-500/20 text-green-400 px-2 py-1 rounded-full">ONLINE</span></div>
          <div className="flex-1 overflow-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`${m.role === 'user'? 'text-right' : 'text-left'}`}>
                <div className={`inline-block px-3 py-2 rounded-2xl text-[12px] max-w-[85%] ${m.role === 'user'? 'bg-white text-black' : 'bg-white/10 border border-white/10'}`}>{m.content}</div>
              </div>
            ))}
            {loading && <div className="text-[10px] text-white/30">Escribiendo...</div>}
          </div>
          <form onSubmit={send} className="p-3 border-t border-white/10 flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Tu duda..." className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-xs outline-none" />
            <button className="bg-red-600 w-10 h-10 rounded-full">↑</button>
          </form>
        </div>
      )}
    </>
  );
}

const WHATSAPP = "573001234567";
const CREDITOS = [
  { pack: "20 + 40", total: 60, price: 8 },
  { pack: "50 + 100", total: 150, price: 15, best: true },
  { pack: "100 + 250", total: 350, price: 25 },
  { pack: "200 + 300", total: 500, price: 40 },
];
const PLANES = [
  { dias: "3 dias", price: 10 },
  { dias: "7 dias", price: 20, best: true },
  { dias: "15 dias", price: 32 },
  { dias: "30 dias", price: 50 },
];

export default function Page() {
  const [entered, setEntered] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [openCart, setOpenCart] = useState(false);
  const [uid, setUid] = useState("");
  const add = (item: any, type: string) => { setCart([...cart, {...item, type, id: Date.now() }]); setOpenCart(true); };
  const total = cart.reduce((a, b) => a + b.price, 0);
  const checkout = () => {
    if (!uid.trim()) return alert("Pon tu ID");
    const msg = `Hola CEGADO-BOT quiero comprar: ${cart.map(c => `${c.type} ${c.pack || c.dias} $${c.price}`).join(", ")} TOTAL $${total} ID: ${uid}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  };
  if (!entered) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0"><img src="/hero.jpg" alt="" className="w-full h-full object-cover opacity-50" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20" /></div>
        <div className="relative z-10 text-center px-6"><h1 className="text-7xl md:text-[110px] font-black leading-[0.8]">CEGADO<br/><span className="text-white/10">-BOT</span><span className="text-red-600">.</span></h1><button onClick={() => setEntered(true)} className="mt-10 bg-white text-black px-14 py-5 rounded-full font-black text-xs">ENTRAR A LA TIENDA →</button></div>
        <ChatWidget />
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="sticky top-0 z-40 border-b border-white/5 bg-black/80 backdrop-blur-xl"><div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center"><span className="font-black text-sm">CEGADO-BOT</span><button onClick={() => setOpenCart(true)} className="bg-white text-black px-5 py-2 rounded-full text-xs font-black">CARRITO ({cart.length})</button></div></nav>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-black">CREDITOS</h2>
        <div className="mt-8 grid md:grid-cols-4 gap-px bg-white/10 rounded-[20px] p-px overflow-hidden">
          {CREDITOS.map(c => (<div key={c.pack} className="bg-[#0a0a0a] p-6"><div className="text-2xl font-black">{c.pack}</div><div className="mt-6 text-4xl font-black">${c.price}</div><button onClick={() => add(c, "CREDITO")} className="w-full mt-6 py-3 rounded-full bg-white text-black font-black text-xs">AÑADIR</button></div>))}
        </div>
        <h2 className="text-3xl font-black mt-16">PLANES</h2>
        <div className="mt-8 grid md:grid-cols-4 gap-px bg-white/10 rounded-[20px] p-px overflow-hidden">
          {PLANES.map(p => (<div key={p.dias} className="bg-[#0a0a0a] p-6"><div className="text-2xl font-black">{p.dias}</div><div className="mt-6 text-4xl font-black">${p.price}</div><button onClick={() => add(p, "PLAN")} className="w-full mt-6 py-3 rounded-full bg-white/10 border border-white/10 font-black text-xs">AÑADIR</button></div>))}
        </div>
      </div>
      {openCart && (
        <div className="fixed inset-0 z-[100] flex justify-end"><div className="absolute inset-0 bg-black/80" onClick={() => setOpenCart(false)} /><div className="relative w-full max-w-md bg-[#0a0a0a] border-l border-white/10 p-6 flex flex-col"><div className="flex justify-between"><h3 className="font-black text-sm">CARRITO</h3><button onClick={() => setOpenCart(false)}>X</button></div><div className="flex-1 mt-6 space-y-2 overflow-auto">{cart.map((c:any)=>(<div key={c.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between text-sm"><span>{c.pack||c.dias}</span><span>${c.price}</span></div>))}</div><div className="pt-6 border-t border-white/10 space-y-3"><input value={uid} onChange={e=>setUid(e.target.value)} placeholder="ID DEL BOT" className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-xs" /><div className="flex justify-between font-black"><span>TOTAL</span><span>${total}</span></div><button onClick={checkout} className="w-full bg-red-600 py-4 rounded-full font-black text-xs">PAGAR POR WHATSAPP</button></div></div></div>
      )}
      <ChatWidget />
    </main>
  );
    }
