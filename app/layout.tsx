import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Million‑Pixel Cube",
  description: "Own a pixel on a rotatable 3D cube — a modern take on the Million Dollar Homepage."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-zinc-950 to-black text-zinc-100">{children}</body>
    </html>
  );
}
