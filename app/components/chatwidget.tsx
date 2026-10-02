"use client";
import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: "bot", content: "Hola soy CEGADO IA 🤖. ¿En qué te ayudo con créditos o planes?" }
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
      <button onClick={() => setOpen(!open)} className="fixed bottom-6 right-6 z-[999] w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-xl shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:scale-110 transition">💬</button>
      {open && (
        <div className="fixed bottom-24 right-6 z-[999] w-[92vw] max-w-[360px] h-[480px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-[24px] flex flex-col overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
            <span className="font-black text-[11px] tracking-[0.2em]">CEGADO-BOT IA</span>
            <span className="text-[9px] bg-green-500/20 text-green-400 px-2 py-1 rounded-full animate-pulse">● ONLINE</span>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`${m.role === 'user'? 'text-right' : 'text-left'}`}>
                <div className={`inline-block px-3.5 py-2.5 rounded-[18px] text-[12px] leading-relaxed whitespace-pre-wrap max-w-[85%] ${m.role === 'user'? 'bg-white text-black rounded-br-[6px]' : 'bg-white/10 border border-white/10 rounded-bl-[6px]'}`}>{m.content}</div>
              </div>
            ))}
            {loading && <div className="text-[10px] text-white/30">CEGADO está escribiendo...</div>}
          </div>
          <form onSubmit={send} className="p-3 border-t border-white/10 flex gap-2 bg-black">
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Escribe tu duda..." className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-xs outline-none focus:border-red-600" />
            <button type="submit" className="bg-red-600 w-10 h-10 rounded-full font-black text-white">↑</button>
          </form>
        </div>
      )}
    </>
  );
}
