import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CEGADO-BOT | Créditos y Planes",
  description: "Rapidez - Seguridad - Confianza - Venta de créditos y planes para Cegado-Bot",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
