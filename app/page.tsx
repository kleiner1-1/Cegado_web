"use client";
import { useState, useEffect } from "react";

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([{ role: "bot", content: "Soy CEGADO IA 🤖" }]);
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
        <div className="fixed bottom-24 right-6 z-[999] w-[92vw] max-w-[360px] h-[480px] bg-[#0a0a0a] border border-white/10 rounded-[24px] flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/10"><span className="font-black text-[11px]">CEGADO IA</span></div>
          <div className="flex-1 overflow-auto p-4 space-y-3">{messages.map((m,i)=>(<div key={i} className={`${m.role==='user'?'text-right':'text-left'}`}><div className={`inline-block px-3 py-2 rounded-2xl text-xs ${m.role==='user'?'bg-white text-black':'bg-white/10'}`}>{m.content}</div></div>))}</div>
          <form onSubmit={send} className="p-3 border-t border-white/10 flex gap-2"><input value={input} onChange={e=>setInput(e.target.value)} placeholder="Tu duda..." className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs" /><button className="bg-red-600 w-10 h-10 rounded-full">↑</button></form>
        </div>
      )}
    </>
  );
}

const WHATSAPP = "573001234567";

type Review = {
  id: string;
  stars: number;
  feeling: string;
  recommend: string;
  comment: string;
  uid: string;
  date: string;
  pack: string;
};

export default function Page() {
  const [entered, setEntered] = useState(false);
  const [view, setView] = useState<"inicio"|"creditos"|"planes"|"resenas">("inicio");
  const [cart, setCart] = useState<any[]>([]);
  const [openCart, setOpenCart] = useState(false);
  const [uid, setUid] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [stars, setStars] = useState(0);
  const [feeling, setFeeling] = useState("");
  const [recommend, setRecommend] = useState("");
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);

  // Cargar reseñas guardadas + reseñas demo
  useEffect(() => {
    const demo: Review[] = [
      { id: "1", stars: 5, feeling: "😍 Excelente", recommend: "✅ Sí, 100% recomendado", comment: "Me activaron en 2 minutos, super rápido y seguro. 100% recomendado.", uid: "7842", date: new Date().toISOString(), pack: "150 Créditos" },
      { id: "2", stars: 5, feeling: "🙂 Bien", recommend: "✅ Sí, 100% recomendado", comment: "El bot funciona perfecto, ya voy por mi segunda compra.", uid: "1290", date: new Date().toISOString(), pack: "7 Días" },
      { id: "3", stars: 4, feeling: "😍 Excelente", recommend: "✅ Sí, 100% recomendado", comment: "Buen servicio, solo tardaron 5 min pero todo ok.", uid: "5561", date: new Date().toISOString(), pack: "350 Créditos" },
    ];
    const saved = Object.keys(localStorage).filter(k=>k.startsWith("review-")).map(k=>JSON.parse(localStorage.getItem(k)!)).map(r=>({ id: r.id || Date.now().toString(), stars: r.stars, feeling: r.feeling, recommend: r.recommend, comment: r.comment, uid: r.uid?.slice(0,4) || "****", date: r.date, pack: r.cart?.[0]?.label || "Pack" }));
    setReviews([...saved,...demo]);
  }, [showSuccess]);

  const add = (item: any, type: string) => { setCart([...cart, {...item, type, id: Date.now() }]); setOpenCart(true); };
  const total = cart.reduce((a, b) => a + b.price, 0);
  const avg = reviews.length? (reviews.reduce((a,b)=>a+b.stars,0)/reviews.length).toFixed(1) : "4.9";

  const checkout = () => {
    if (!uid.trim()) return alert("Pon tu ID");
    const msg = `Hola CEGADO-BOT quiero: ${cart.map(c=>`${c.type} ${c.label} $${c.price}`).join(", ")} TOTAL $${total} ID: ${uid}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
    setOpenCart(false); setShowSuccess(true);
  };

  const submitReview = () => {
    if (stars===0) return alert("Pon estrellas");
    const newReview: Review = { id: Date.now().toString(), stars, feeling, recommend, comment, uid: uid.slice(0,4), date: new Date().toISOString(), pack: cart[0]?.label || "Pack" };
    localStorage.setItem(`review-${Date.now()}`, JSON.stringify(newReview));
    setReviews(prev=>[newReview,...prev]);
    setShowSuccess(false); setCart([]); setStars(0); setFeeling(""); setRecommend(""); setComment(""); setView("resenas");
  };

  if (!entered) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0"><img src="/hero.jpg" alt="" className="w-full h-full object-cover opacity-40" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" /></div>
        <div className="relative z-10 text-center"><h1 className="text-7xl md:text-[120px] font-black leading-[0.8]">CEGADO<br/><span className="text-white/20">-BOT</span><span className="text-red-600">.</span></h1><button onClick={()=>setEntered(true)} className="mt-10 bg-white text-black px-16 py-5 rounded-full font-black text-xs tracking-widest">ENTRAR A LA TIENDA →</button></div>
        <ChatWidget />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-[64px] flex justify-between items-center">
          <span className="font-black text-sm tracking-widest">CEGADO-BOT.</span>
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
            <button onClick={()=>setView("inicio")} className={`px-4 py-2 rounded-full text-[10px] font-black ${view==="inicio"?"bg-white text-black":"text-white/40"}`}>INICIO</button>
            <button onClick={()=>setView("creditos")} className={`px-4 py-2 rounded-full text-[10px] font-black ${view==="creditos"?"bg-red-600 text-white":"text-white/40"}`}>CRÉDITOS</button>
            <button onClick={()=>setView("planes")} className={`px-4 py-2 rounded-full text-[10px] font-black ${view==="planes"?"bg-white text-black":"text-white/40"}`}>PLANES</button>
            <button onClick={()=>setView("resenas")} className={`px-4 py-2 rounded-full text-[10px] font-black ${view==="resenas"?"bg-yellow-400 text-black":"text-white/40"}`}>RESEÑAS ⭐ {reviews.length}</button>
          </div>
          <button onClick={()=>setOpenCart(true)} className="bg-white text-black px-4 py-2 rounded-full text-xs font-black">CARRITO {cart.length}</button>
        </div>
      </nav>

      {view==="inicio" && (
        <section className="min-h-[calc(100vh-64px)] flex items-center">
          <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 w-full">
            <div><div className="text-[10px] tracking-[0.3em] border border-white/10 px-4 py-2 rounded-full bg-white/5 inline-flex">RAPIDEZ • SEGURIDAD • CONFIANZA</div><h2 className="mt-8 text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter">LA PLATAFORMA<br/><span className="text-red-600">#1</span> DE CEGADO</h2><p className="mt-6 text-white/40 text-sm max-w-md">Más de 5,200 clientes. Entrega en 3 minutos. Soporte IA 24/7.</p><div className="mt-10 flex gap-3"><button onClick={()=>setView("creditos")} className="bg-red-600 px-8 py-4 rounded-full font-black text-xs">VER CRÉDITOS →</button><button onClick={()=>setView("resenas")} className="bg-white/10 border border-white/10 px-8 py-4 rounded-full font-black text-xs">VER RESEÑAS ⭐ {avg}/5</button></div></div>
            <div className="rounded-[32px] overflow-hidden border border-white/10"><img src="/hero.jpg" alt="" className="w-full h-[520px] object-cover" /></div>
          </div>
        </section>
      )}

      {view==="creditos" && (
        <section className="min-h-[calc(100vh-64px)] py-20 max-w-7xl mx-auto px-6"><h2 className="text-5xl font-black text-center">CRÉDITOS <span className="text-red-600">BONIFICADOS</span></h2><div className="mt-16 grid md:grid-cols-4 gap-6">{[{ label: "60 Créditos", pack: "20 + 40 BONUS", price: 8 },{ label: "150 Créditos", pack: "50 + 100 BONUS", price: 15, best: true },{ label: "350 Créditos", pack: "100 + 250 BONUS", price: 25 },{ label: "500 Créditos", pack: "200 + 300 BONUS", price: 40 },].map((c:any)=>(<div key={c.label} className={`rounded-[28px] border p-8 flex flex-col min-h-[380px] ${c.best?'border-red-600 bg-red-950/20 shadow-[0_0_40px_rgba(220,38,38,0.3)]':'border-white/10 bg-[#111]'}`}><div className="text-lg font-black">{c.label}</div><div className="text-3xl font-black text-red-500 mt-2">{c.pack}</div><div className="mt-auto pt-12 text-5xl font-black">${c.price}</div><button onClick={()=>add(c,"CREDITO")} className="w-full mt-6 py-4 rounded-full bg-white text-black font-black text-xs">AÑADIR →</button></div>))}</div></section>
      )}

      {view==="planes" && (
        <section className="min-h-[calc(100vh-64px)] bg-white text-black py-20 rounded-t-[40px]"><div className="max-w-7xl mx-auto px-6"><h2 className="text-5xl font-black text-center">PLANES VIP</h2><div className="mt-16 grid md:grid-cols-4 gap-6">{[{ label: "3 Días", price: 10 },{ label: "7 Días", price: 20, best: true },{ label: "15 Días", price: 32 },{ label: "30 Días", price: 50 },].map((p:any)=>(<div key={p.label} className={`rounded-[28px] border p-8 flex flex-col min-h-[360px] ${p.best?'bg-black text-white border-black scale-105 shadow-2xl':'bg-white border-black/10'}`}><div className="text-2xl font-black">{p.label}</div><div className="text-5xl font-black mt-auto pt-12">${p.price}</div><button onClick={()=>add(p,"PLAN")} className="w-full mt-6 py-4 rounded-full bg-red-600 text-white font-black text-xs">ACTIVAR</button></div>))}</div></div></section>
      )}

      {/* NUEVA VISTA - TODAS LAS RESEÑAS */}
      {view==="resenas" && (
        <section className="min-h-[calc(100vh-64px)] py-20 max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-between items-end gap-6">
            <div><h2 className="text-5xl font-black tracking-tighter">RESEÑAS <span className="text-yellow-400">REALES</span></h2><p className="text-white/40 text-sm mt-3">Lo que dicen nuestros clientes después de comprar</p></div>
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-[20px] px-6 py-4">
              <div className="text-4xl font-black">{avg}</div><div><div className="flex text-yellow-400 text-sm">{"★".repeat(5)}</div><div className="text-[10px] text-white/40 tracking-widest mt-1">{reviews.length} RESEÑAS VERIFICADAS</div></div>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {reviews.map((r)=>(
              <div key={r.id} className="rounded-[24px] bg-[#101010] border border-white/10 p-6 flex flex-col">
                <div className="flex justify-between items-start"><div className="flex text-yellow-400 text-sm">{"★".repeat(r.stars)}{"☆".repeat(5-r.stars)}</div><span className="text-[9px] bg-white/10 px-2 py-1 rounded-full">{r.pack}</span></div>
                <p className="mt-4 text-sm leading-relaxed text-white/80">"{r.comment || "Excelente servicio"}"</p>
                <div className="mt-4 flex flex-wrap gap-2"><span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full">{r.feeling}</span><span className="text-[10px] bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1 rounded-full">{r.recommend}</span></div>
                <div className="mt-auto pt-6 flex justify-between items-center border-t border-white/5"><span className="text-[10px] text-white/30">ID: {r.uid} • {new Date(r.date).toLocaleDateString()}</span><span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded-full">✓ Verificado</span></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {openCart && (
        <div className="fixed inset-0 z-[100] flex justify-end"><div className="absolute inset-0 bg-black/80" onClick={()=>setOpenCart(false)} /><div className="relative w-full max-w-md bg-[#0a0a0a] border-l border-white/10 p-6 flex flex-col"><div className="flex justify-between"><h3 className="font-black text-sm">CARRITO</h3><button onClick={()=>setOpenCart(false)}>✕</button></div><div className="flex-1 mt-6 space-y-2 overflow-auto">{cart.map((c:any)=>(<div key={c.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between text-xs"><span>{c.label}</span><span>${c.price}</span></div>))}</div><div className="pt-6 border-t border-white/10 space-y-3"><input value={uid} onChange={e=>setUid(e.target.value)} placeholder="ID DEL BOT" className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-xs" /><div className="flex justify-between font-black"><span>TOTAL</span><span>${total}</span></div><button onClick={checkout} className="w-full bg-red-600 py-4 rounded-full font-black text-xs">PAGAR POR WHATSAPP →</button></div></div></div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/90 backdrop-blur-xl" /><div className="relative w-full max-w-[440px] bg-[#111] border border-white/10 rounded-[32px] p-8"><div className="text-center"><div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center text-2xl">✓</div><h2 className="mt-4 text-2xl font-black">¡COMPRA REALIZADA!</h2><p className="text-xs text-white/40 mt-1">Califica tu experiencia</p></div><div className="mt-6"><label className="text-[10px] font-black tracking-widest">ESTRELLAS</label><div className="flex gap-2 mt-2">{[1,2,3,4,5].map(n=>(<button key={n} onClick={()=>setStars(n)} className={`w-10 h-10 rounded-full ${stars>=n?'bg-yellow-400 text-black':'bg-white/10'}`}>★</button>))}</div></div><div className="mt-4"><label className="text-[10px] font-black tracking-widest">¿CÓMO TE SIENTES?</label><div className="grid grid-cols-3 gap-2 mt-2">{["😍 Excelente","🙂 Bien","😐 Normal"].map(f=>(<button key={f} onClick={()=>setFeeling(f)} className={`py-2 rounded-full text-[11px] border ${feeling===f?'bg-white text-black':'bg-white/5 border-white/10'}`}>{f}</button>))}</div></div><div className="mt-4"><label className="text-[10px] font-black tracking-widest">¿RECOMIENDAS?</label><div className="grid grid-cols-2 gap-2 mt-2">{["✅ Sí, 100%","🤔 Tal vez"].map(r=>(<button key={r} onClick={()=>setRecommend(r)} className={`py-2 rounded-full text-[11px] border ${recommend===r?'bg-green-500 text-black':'bg-white/5 border-white/10'}`}>{r}</button>))}</div></div><div className="mt-4"><textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Tu comentario..." className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs min-h-[70px]" /></div><button onClick={submitReview} className="w-full mt-6 bg-red-600 py-4 rounded-full font-black text-xs">ENVIAR RESEÑA Y VER TODAS ⭐</button></div></div>
      )}
      <ChatWidget />
    </main>
  );
      }
