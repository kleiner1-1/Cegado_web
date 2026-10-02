export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMsg = messages[messages.length - 1]?.content?.toLowerCase() || "";

  let reply = "Soy CEGADO IA 🤖. Estoy online. Puedo ayudarte con precios de créditos, planes y cómo pagar. ¿Qué necesitas?";

  if (lastMsg.includes("hola") || lastMsg.includes("buenas")) {
    reply = "¡Hola! 👋 Soy CEGADO-BOT IA. Vendo créditos y planes 24/7. ¿Buscas créditos o plan por días?";
  } else if (lastMsg.includes("credito") || lastMsg.includes("crédito") || lastMsg.includes("precio") || lastMsg.includes("cuanto")) {
    reply = "💎 CRÉDITOS:\n• 60 créditos (20+40 BONUS) = $8 USD\n• 150 créditos (50+100 BONUS) = $15 USD ⭐ MÁS VENDIDO\n• 350 créditos = $25 USD\n• 500 créditos = $40 USD\n\n¿Cuál te interesa? Agrégalo al carrito.";
  } else if (lastMsg.includes("plan")) {
    reply = "📅 PLANES:\n• 3 días = $10\n• 7 días = $20 ⭐ POPULAR\n• 15 días = $32\n• 30 días = $50\n\nIncluye estabilidad total y soporte. ¿Cuál quieres activar?";
  } else if (lastMsg.includes("pagar") || lastMsg.includes("pago") || lastMsg.includes("comprar") || lastMsg.includes("como compro")) {
    reply = "💳 Para pagar es fácil:\n1. Agrega al carrito lo que quieres\n2. Escribe tu ID DEL BOT abajo\n3. Dale en PAGAR POR WHATSAPP\n\nTe lleva directo a mi WhatsApp y te activo en minutos.";
  } else if (lastMsg.includes("id") || lastMsg.includes("donde") || lastMsg.includes("instalar")) {
    reply = "Tu ID lo ves dentro del bot, arriba dice 'ID: xxxxx'. Si no lo tienes, después del pago te doy el bot nuevo con ID incluido + tutorial de instalación de 2 minutos.";
  } else if (lastMsg.includes("whatsapp") || lastMsg.includes("wpp")) {
    reply = "Mi WhatsApp es +57 300 
