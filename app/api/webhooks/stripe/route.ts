import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    console.log("📩 Received Stripe webhook:", { body, sig });

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("❌ Stripe webhook error:", err.message);
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }
}
