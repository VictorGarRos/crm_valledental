import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clínica Valledental | Gestión de Citas",
  description: "Sistema de gestión de citas y recordatorios para Valledental",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={outfit.className}>
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
