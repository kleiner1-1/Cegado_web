import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = await streamText({
    model: openai('gpt-4o-mini'),
    system: `Eres CEGADO-BOT, soporte de ventas. Vendes creditos y planes para bot de WhatsApp.
Planes: 3 dias $10, 7 dias $20 BEST, 15 dias $32, 30 dias $50.
Creditos: 60 creditos (20+40) $8, 150 creditos (50+100) $15 BEST, 350 creditos $25, 500 creditos $40.
Pago: agregar al carrito y pagar por WhatsApp enviando ID del bot.
Tono oscuro, directo, serio. Respuestas cortas. Siempre invita a pagar por WhatsApp 573001234567`,
    messages,
  });
  return result.toDataStreamResponse();
}
