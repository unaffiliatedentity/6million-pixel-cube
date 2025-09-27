"use client";
import { FaceViewer } from "@/components/FaceCanvas";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function FacePage() {
  const params = useParams<{id:string}>();
  const id = Number(params.id ?? 4);
  const [zoom, setZoom] = useState(1);

  return (
    <main className="mx-auto max-w-6xl p-6 md:p-10">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Face {id}</h1>
        <Link href="/" className="text-sm text-zinc-400 underline">Back to Home</Link>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <label className="text-sm text-zinc-400">Zoom ×{zoom.toFixed(1)}</label>
        <input type="range" min="1" max="4" step="0.1" value={zoom} onChange={e=>setZoom(Number(e.target.value))}/>
      </div>
      <FaceViewer face={id} zoom={zoom} />
      <p className="mt-4 text-sm text-zinc-400">Click tiles to select (to be wired to cart/checkout).</p>
    </main>
  );
}
