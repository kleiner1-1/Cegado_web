"use client";
import { useState } from "react";

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([{ role: "bot", content: "Soy CEGADO IA 🤖 ¿Créditos o planes?" }]);
  const [input, setInput] = useState("");
  const send = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]); setInput("");
    const res = await fetch("/api/chat", { method: "POST", body: JSON.stringify({ messages: [...messages, userMsg] }) });
    const data = await res.json();
    setMessages(prev => [...prev, { role: "bot", content: data.reply }]);
  };
  return (
    <>
      <button onClick={() => setOpen(!open)} className="fixed bottom-6 right-6 z-[999] w-14 h-14 bg-red-600 rounded-full text-xl shadow-[0_0_30px_rgba(220,38,38,0.6)]">💬</button>
      {open && (
        <div className="fixed bottom-24 right-6 z-[999] w-[92vw] max-w-[360px] h-[480px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-[24px] flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/10 flex justify-between"><span className="font-black text-[11px]">CEGADO IA</span><span className="text-[9px] bg-green-500/20 text-green-400 px-2 py-1 rounded-full">● ONLINE</span></div>
          <div className="flex-1 overflow-auto p-4 space-y-3">{messages.map((m,i)=>(<div key={i} className={`${m.role==='user'?'text-right':'text-left'}`}><div className={`inline-block px-3 py-2 rounded-2xl text-[12px] max-w-[85%] ${m.role==='user'?'bg-white text-black':'bg-white/10 border border-white/10'}`}>{m.content}</div></div>))}</div>
          <form onSubmit={send} className="p-3 border-t border-white/10 flex gap-2"><input value={input} onChange={e=>setInput(e.target.value)} placeholder="Tu duda..." className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-xs outline-none" /><button className="bg-red-600 w-10 h-10 rounded-full">↑</button></form>
        </div>
      )}
    </>
  );
}

const WHATSAPP = "573001234567";

export default function Page() {
  const [entered, setEntered] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [openCart, setOpenCart] = useState(false);
  const [uid, setUid] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [stars, setStars] = useState(0);
  const [feeling, setFeeling] = useState("");
  const [recommend, setRecommend] = useState("");
  const [comment, setComment] = useState("");

  const add = (item: any, type: string) => { setCart([...cart, {...item, type, id: Date.now() }]); setOpenCart(true); };
  const total = cart.reduce((a, b) => a + b.price, 0);

  const checkout = () => {
    if (!uid.trim()) return alert("Pon tu ID del bot");
    const msg = `Hola CEGADO-BOT quiero: ${cart.map(c=>`${c.type} ${c.label} $${c.price}`).join(", ")} TOTAL $${total} ID: ${uid}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
    setOpenCart(false);
    setShowSuccess(true); // AQUI SALE COMPRA REALIZADA
  };

  const submitReview = () => {
    if (stars === 0) return alert("Selecciona las estrellas");
    // Aqui puedes guardar en Supabase luego, por ahora lo guardamos local
    const review = { stars, feeling, recommend, comment, date: new Date().toISOString(), uid, cart };
    localStorage.setItem(`review-${Date.now()}`, JSON.stringify(review));
    alert("Gracias por tu reseña ⭐ ¡Se guardó!");
    setShowSuccess(false);
    setCart([]); setStars(0); setFeeling(""); setRecommend(""); setComment("");
  };

  if (!entered) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0"><img src="/hero.jpg" alt="" className="w-full h-full object-cover opacity-50" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" /></div>
        <div className="relative z-10 text-center px-6"><h1 className="text-7xl md:text-[110px] font-black leading-[0.8]">CEGADO<br/><span className="text-white/10">-BOT</span><span className="text-red-600">.</span></h1><button onClick={()=>setEntered(true)} className="mt-10 bg-white text-black px-14 py-5 rounded-full font-black text-xs">ENTRAR →</button></div>
        <ChatWidget />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <nav className="sticky top-0 z-40 border-b border-white/5 bg-black/80 backdrop-blur-xl"><div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center"><span className="font-black text-sm">CEGADO-BOT.</span><button onClick={()=>setOpenCart(true)} className="bg-white text-black px-5 py-2 rounded-full text-xs font-black">CARRITO ({cart.length})</button></div></nav>

      <section className="py-16 text-center border-b border-white/5"><h2 className="text-4xl font-black">CRÉDITOS <span className="text-red-600">BONIFICADOS</span></h2>
        <div className="mt-8 max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-4">
          {[
            { label: "60 Créditos", pack: "20 + 40", price: 8 },
            { label: "150 Créditos", pack: "50 + 100", price: 15, best: true },
            { label: "350 Créditos", pack: "100 + 250", price: 25 },
            { label: "500 Créditos", pack: "200 + 300", price: 40 },
          ].map((c:any)=>(
            <div key={c.label} className={`rounded-[24px] p-[1px] ${c.best?'bg-red-600':'bg-white/10'}`}><div className="rounded-[23px] bg-[#0a0a0a] p-6"><div className="text-lg font-black">{c.label}</div><div className="text-2xl font-black text-red-500 mt-2">{c.pack}</div><div className="text-4xl font-black mt-6">${c.price}</div><button onClick={()=>add(c,"CREDITO")} className="w-full mt-4 py-3 rounded-full bg-white text-black font-black text-xs">AÑADIR</button></div></div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-white text-black rounded-t-[32px] text-center"><h2 className="text-4xl font-black">PLANES VIP</h2>
        <div className="mt-8 max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-4">
          {[
            { label: "3 Días", price: 10 },
            { label: "7 Días", price: 20, best: true },
            { label: "15 Días", price: 32 },
            { label: "30 Días", price: 50 },
          ].map((p:any)=>(
            <div key={p.label} className={`rounded-[24px] border p-6 ${p.best?'bg-black text-white border-black':'bg-white border-black/10'}`}><div className="text-xl font-black">{p.label}</div><div className="text-4xl font-black mt-6">${p.price}</div><button onClick={()=>add(p,"PLAN")} className="w-full mt-4 py-3 rounded-full bg-red-600 text-white font-black text-xs">ACTIVAR</button></div>
          ))}
        </div>
      </section>

      {/* CARRITO */}
      {openCart && (
        <div className="fixed inset-0 z-[100] flex justify-end"><div className="absolute inset-0 bg-black/80" onClick={()=>setOpenCart(false)} /><div className="relative w-full max-w-md bg-[#0a0a0a] border-l border-white/10 p-6 flex flex-col"><div className="flex justify-between"><h3 className="font-black text-sm">CARRITO</h3><button onClick={()=>setOpenCart(false)}>✕</button></div><div className="flex-1 mt-6 space-y-2 overflow-auto">{cart.map((c:any)=>(<div key={c.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between text-xs"><span>{c.label}</span><span>${c.price}</span></div>))}</div><div className="pt-6 border-t border-white/10 space-y-3"><input value={uid} onChange={e=>setUid(e.target.value)} placeholder="ID DEL BOT" className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-xs" /><div className="flex justify-between font-black"><span>TOTAL</span><span>${total}</span></div><button onClick={checkout} className="w-full bg-red-600 py-4 rounded-full font-black text-xs">PAGAR POR WHATSAPP →</button></div></div></div>
      )}

      {/* MODAL COMPRA REALIZADA + RESEÑA */}
      {showSuccess && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
          <div className="relative w-full max-w-[480px] bg-[#111] border border-white/10 rounded-[32px] p-8 shadow-[0_0_80px_rgba(220,38,38,0.3)] animate-in fade-in">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-2xl">✓</div>
              <h2 className="mt-4 text-3xl font-black tracking-tighter">¡COMPRA REALIZADA!</h2>
              <p className="text-xs text-white/40 mt-2 tracking-widest">TU PEDIDO ESTÁ SIENDO PROCESADO POR WHATSAPP</p>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <label className="text-[11px] font-black tracking-widest">CALIFICA EL SERVICIO</label>
                <div className="flex gap-2 mt-3">
                  {[1,2,3,4,5].map(n=>(
                    <button key={n} onClick={()=>setStars(n)} className={`w-11 h-11 rounded-full border text-lg transition ${stars>=n?'bg-yellow-400 border-yellow-400 text-black scale-110':'bg-white/5 border-white/10 hover:bg-white/10'}`}>★</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-black tracking-widest">¿CÓMO TE SIENTES?</label>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {["😍 Excelente","🙂 Bien","😐 Normal"].map(f=>(
                    <button key={f} onClick={()=>setFeeling(f)} className={`py-3 rounded-full text-xs border font-bold ${feeling===f?'bg-white text-black border-white':'bg-white/5 border-white/10 text-white/60'}`}>{f}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-black tracking-widest">¿RECOMIENDAS CEGADO-BOT?</label>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {["✅ Sí, 100% recomendado","🤔 Tal vez"].map(r=>(
                    <button key={r} onClick={()=>setRecommend(r)} className={`py-3 rounded-full text-xs border font-bold ${recommend===r?'bg-green-500 text-black border-green-500':'bg-white/5 border-white/10 text-white/60'}`}>{r}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-black tracking-widest">COMENTARIO (opcional)</label>
                <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Ej: Muy rápido, me activaron en 2 minutos..." className="mt-3 w-full bg-white/5 border border-white/10 rounded-[16px] p-4 text-xs outline-none focus:border-red-600 min-h-[80px]" />
              </div>

              <button onClick={submitReview} className="w-full bg-gradient-to-r from-red-600 to-red-700 py-4 rounded-full font-black text-xs tracking-[0.2em] shadow-[0_0_20px_rgba(220,38,38,0.4)]">ENVIAR RESEÑA ⭐</button>
              <button onClick={()=>{setShowSuccess(false); setCart([]);}} className="w-full text-[10px] text-white/30 tracking-widest">OMITIR POR AHORA</button>
            </div>
          </div>
        </div>
      )}

      <ChatWidget />
    </main>
  );
                                                                                                                                                              }
