import { NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const { tiles } = await req.json();
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return Response.json({ ok: false, reason: "Stripe not configured" }, { status: 501 });
  }
  const stripe = new Stripe(secret, { apiVersion: "2024-06-20" } as any);
  const amount = Math.max(1, (tiles?.length ?? 1)) * 500; // $5 per tile demo
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [{
      price_data: { currency: "usd", unit_amount: amount, product_data: { name: "Cube Tiles" } },
      quantity: 1
    }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?canceled=1`
  });
  return Response.json({ id: session.id, url: session.url });
}
