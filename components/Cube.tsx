"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FACE_LABELS } from "@/lib/config";
import { listAllFaces } from "@/lib/tilestore";

const GRID_SIZE = 1000;
const TILE_SIZE = 10;
const TILES = GRID_SIZE / TILE_SIZE;

function createFaceCanvas(faceIndex: number, adMap: Record<string, any>, scale = 1, showGrid = true) {
  const size = GRID_SIZE * scale;
  const c = document.createElement("canvas");
  c.width = size; c.height = size;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#0b0f19";
  ctx.fillRect(0, 0, size, size);

  if (adMap) {
    for (const key of Object.keys(adMap)) {
      const [ix, iy] = key.split(",").map(Number);
      ctx.fillStyle = adMap[key].color || "#999";
      ctx.fillRect(ix * TILE_SIZE * scale, iy * TILE_SIZE * scale, TILE_SIZE * scale, TILE_SIZE * scale);
    }
  }

  if (showGrid) {
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1 * scale;
    for (let x = 0; x <= TILES; x++) {
      const gx = x * TILE_SIZE * scale + 0.5;
      ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, size); ctx.stroke();
    }
    for (let y = 0; y <= TILES; y++) {
      const gy = y * TILE_SIZE * scale + 0.5;
      ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(size, gy); ctx.stroke();
    }
    ctx.restore();
  }

  ctx.fillStyle = "#fff";
  ctx.font = `${24 * scale}px system-ui, sans-serif`;
  ctx.fillText(`Face ${faceIndex} (${FACE_LABELS[faceIndex]})`, 16 * scale, 32 * scale);
  return c;
}

function useFaceTextures() {
  const [textures, setTextures] = React.useState<THREE.Texture[]>([]);
  React.useEffect(() => {
    const faces = listAllFaces();
    const next = Array(6).fill(null).map((_, i) => {
      const canvas = createFaceCanvas(i, faces[i] || {});
      const tex = new THREE.CanvasTexture(canvas);
      tex.magFilter = THREE.NearestFilter;
      tex.minFilter = THREE.LinearMipMapLinearFilter;
      tex.needsUpdate = true;
      return tex;
    });
    setTextures(next);
  }, []);
  return textures;
}

function MeshCube({ onPick }: { onPick?: (info: any)=>void }) {
  const meshRef = React.useRef<THREE.Mesh>(null!);
  const textures = useFaceTextures();

  useFrame(() => { if (meshRef.current) meshRef.current.rotation.y += 0.0015; });

  function uvToPixel(faceIndex: number, uv: THREE.Vector2) {
    let u = uv.x, v = 1 - uv.y;
    const px = Math.floor(u * GRID_SIZE);
    const py = Math.floor(v * GRID_SIZE);
    return { px, py };
  }
  function pixelToTile(px: number, py: number) {
    const ix = Math.floor(Math.max(0, Math.min(GRID_SIZE - 1, px)) / TILE_SIZE);
    const iy = Math.floor(Math.max(0, Math.min(GRID_SIZE - 1, py)) / TILE_SIZE);
    return { ix, iy };
  }

  return (
    <mesh
      ref={meshRef}
      onPointerMove={(e) => {
        const faceIndex = (e.face as any)?.materialIndex ?? 0;
        const { px, py } = uvToPixel(faceIndex, e.uv!);
        const { ix, iy } = pixelToTile(px, py);
        document.body.style.cursor = "pointer";
        onPick?.({ type: "hover", faceIndex, px, py, ix, iy });
      }}
      onPointerOut={() => { document.body.style.cursor = "default"; onPick?.(null); }}
      onClick={(e) => {
        const faceIndex = (e.face as any)?.materialIndex ?? 0;
        const { px, py } = uvToPixel(faceIndex, e.uv!);
        const { ix, iy } = pixelToTile(px, py);
        onPick?.({ type: "click", faceIndex, px, py, ix, iy });
      }}
    >
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      {textures.map((t, i) => (<meshBasicMaterial key={i} attach={`material-${i}`} map={t} />))}
    </mesh>
  );
}

export function CubeView() {
  const [info, setInfo] = React.useState<any>(null);
  return (
    <div className="w-full">
      <div className="h-[520px] rounded-2xl overflow-hidden border border-zinc-800 bg-black">
        <Canvas camera={{ position: [4,3,5], fov: 50 }} dpr={[1,2]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5,5,5]} intensity={0.5} />
          <MeshCube onPick={setInfo} />
          <OrbitControls enablePan enableZoom />
        </Canvas>
      </div>
      <div className="mt-3 text-sm text-zinc-300">
        {info ? (
          <div>Face {info.faceIndex} | Pixel {info.px},{info.py} | Tile {info.ix},{info.iy}</div>
        ) : <div>Hover or click the cube to inspect a tile.</div>}
      </div>
    </div>
  );
}
