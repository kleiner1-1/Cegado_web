"use client";
import { useChat } from 'ai/react';
import { useState } from 'react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <>
      <button onClick={() => setOpen(!open)} className="fixed bottom-6 right-6 z-[999] w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-xl shadow-[0_0_30px_rgba(220,38,38,0.6)]">💬</button>
      {open && (
        <div className="fixed bottom-24 right-6 z-[999] w-[90vw] max-w-[360px] h-[480px] bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-[24px] flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <span className="font-black text-[11px] tracking-[0.2em]">CEGADO-BOT IA</span>
            <span className="text-[9px] bg-green-500/20 text-green-400 px-2 py-1 rounded-full">ONLINE 24/7</span>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-3">
            {messages.length === 0 && <div className="text-white/40 text-[12px] leading-relaxed">Hola soy CEGADO IA. Pregúntame por créditos, planes, instalación o pagos. Estoy conectado a tu tienda.</div>}
            {messages.map(m => (
              <div key={m.id} className={`${m.role === 'user'? 'text-right' : 'text-left'}`}>
                <div className={`inline-block px-3 py-2 rounded-2xl text-[12px] max-w-[80%] ${m.role === 'user'? 'bg-white text-black' : 'bg-white/10 border border-white/10'}`}>{m.content}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 flex gap-2">
            <input value={input} onChange={handleInputChange} placeholder="Tu duda..." className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-xs outline-none focus:border-red-600" />
            <button type="submit" className="bg-red-600 w-10 h-10 rounded-full font-black">↑</button>
          </form>
        </div>
      )}
    </>
  );
}
