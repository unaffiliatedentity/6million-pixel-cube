"use client";
import { CubeView } from "@/components/Cube";
import Link from "next/link";

export default function CubePage() {
  return (
    <main className="mx-auto max-w-6xl p-6 md:p-10">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Interactive 3D Cube</h1>
        <Link href="/" className="text-sm text-zinc-400 underline">Back to Home</Link>
      </div>
      <CubeView />
      <div className="mt-6">
        <p className="text-sm text-zinc-400">
          This demo shows hover/click feedback. In production, selection would add tiles to a cart and launch checkout.
        </p>
      </div>
    </main>
  );
}
