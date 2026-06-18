import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PROXYMÉDOC — Pharmacie de Proximité",
  description: "Application de pharmacie de proximité au Cameroun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}
