"use client";
import * as React from "react";
import { FACE_LABELS } from "@/lib/config";
import { listAllFaces } from "@/lib/tilestore";

const GRID_SIZE = 1000;
const TILE_SIZE = 10;
const TILES = GRID_SIZE / TILE_SIZE;

function createFaceCanvas(faceIndex: number, adMap: Record<string, any>, scale=1, showGrid=true) {
  const size = GRID_SIZE * scale;
  const c = document.createElement("canvas");
  c.width = size; c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#0b0f19"; ctx.fillRect(0,0,size,size);
  if (adMap) {
    for (const key of Object.keys(adMap)) {
      const [ix, iy] = key.split(",").map(Number);
      ctx.fillStyle = adMap[key].color || "#999";
      ctx.fillRect(ix*TILE_SIZE*scale, iy*TILE_SIZE*scale, TILE_SIZE*scale, TILE_SIZE*scale);
    }
  }
  if (showGrid) {
    ctx.save(); ctx.globalAlpha = 0.15; ctx.strokeStyle = "#fff"; ctx.lineWidth = 1*scale;
    for (let x=0; x<=TILES; x++) { const gx = x*TILE_SIZE*scale + 0.5; ctx.beginPath(); ctx.moveTo(gx,0); ctx.lineTo(gx,size); ctx.stroke(); }
    for (let y=0; y<=TILES; y++) { const gy = y*TILE_SIZE*scale + 0.5; ctx.beginPath(); ctx.moveTo(0,gy); ctx.lineTo(size,gy); ctx.stroke(); }
    ctx.restore();
  }
  ctx.fillStyle="#fff"; ctx.font=`${24*scale}px system-ui`; ctx.fillText(`Face ${faceIndex} (${FACE_LABELS[faceIndex]})`, 16*scale, 32*scale);
  return c;
}

export function FaceViewer({ face=4, zoom=1 }: { face?: number; zoom?: number; }) {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const faces = listAllFaces();
  React.useEffect(()=>{
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const src = createFaceCanvas(face, faces[face]||{}, zoom, true);
    canvas.width = src.width; canvas.height = src.height;
    ctx.drawImage(src, 0, 0);
  }, [face, zoom]);
  return <canvas ref={ref} className="w-full h-auto rounded-2xl border border-zinc-800" style={{imageRendering:"pixelated"}}/>;
}
