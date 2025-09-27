import { NextRequest } from "next/server";
import { getFace, setTile } from "@/lib/tilestore";

export async function GET(req: NextRequest) {
  const faceId = Number(new URL(req.url).searchParams.get("face") ?? 4);
  return Response.json({ faceId, tiles: getFace(faceId) });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { faceId, ix, iy, data } = body || {};
  if (typeof faceId!=='number' || typeof ix!=='number' || typeof iy!=='number') {
    return new Response("Invalid", { status: 400 });
  }
  setTile(faceId, ix, iy, data || {});
  return Response.json({ ok: true });
}
