export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMsg = (messages[messages.length - 1]?.content || "").toLowerCase();

  let reply = "Soy CEGADO IA. Estoy online. Puedo ayudarte con creditos, planes y pagos. Que necesitas?";

  if (lastMsg.includes("hola") || lastMsg.includes("buenas")) {
    reply = "Hola! Soy CEGADO-BOT IA. Vendo creditos y planes 24/7. Buscas creditos o plan por dias?";
  } else if (lastMsg.includes("credito") || lastMsg.includes("precio") || lastMsg.includes("cuanto")) {
    reply = "CREDITOS: 60 por 8 USD, 150 por 15 USD MAS VENDIDO, 350 por 25 USD y 500 por 40 USD. Cual quieres?";
  } else if (lastMsg.includes("plan")) {
    reply = "PLANES: 3 dias 10 USD, 7 dias 20 USD POPULAR, 15 dias 32 USD, 30 dias 50 USD. Cual te sirve?";
  } else if (lastMsg.includes("pagar") || lastMsg.includes("pago") || lastMsg.includes("comprar")) {
    reply = "Para pagar: Agrega al carrito, pon tu ID del bot y dale PAGAR POR WHATSAPP. Te atiendo al instante.";
  } else if (lastMsg.includes("id")) {
    reply = "Tu ID lo ves dentro del bot arriba. Si no lo tienes te doy uno nuevo con tutorial de 2 minutos.";
  } else if (lastMsg.includes("whatsapp") || lastMsg.includes("wpp")) {
    reply = "Mi WhatsApp es +57 300 123 4567. Es mas rapido si le das a PAGAR POR WHATSAPP en el carrito.";
  }

  await new Promise(r => setTimeout(r, 500));
  return Response.json({ reply });
    }
