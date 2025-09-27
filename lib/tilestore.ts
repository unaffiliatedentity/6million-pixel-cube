import { GRID_SIZE, TILE_SIZE } from "@/lib/config";

type TileKey = `${number},${number}`;
export type AdTile = { color?: string; title?: string; url?: string; assetUrl?: string };
type FaceMap = Record<TileKey, AdTile>;

const store: Record<number, FaceMap> = {
  4: { "10,10": { color: "#ff4d4f", title: "Acme", url: "https://example.com/acme" } },
  0: { "50,50": { color: "#2ecc71", title: "GreenX", url: "https://example.com/green" } },
};

export function getFace(faceId: number): FaceMap {
  return store[faceId] || {};
}
export function setTile(faceId: number, ix: number, iy: number, data: AdTile) {
  if (!store[faceId]) store[faceId] = {};
  store[faceId][`${ix},${iy}`] = data;
}
export function listAllFaces(): Record<number, FaceMap> {
  return store;
}
export function pxToTile(px: number) {
  const clamped = Math.max(0, Math.min(GRID_SIZE - 1, px));
  return Math.floor(clamped / TILE_SIZE);
}
