import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const whsec = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !whsec) return new Response("Missing Stripe env", { status: 501 });

  const stripe = new Stripe(secret, { apiVersion: "2024-06-20" } as any);
  const sig = (await headers()).get("stripe-signature")!;
  const raw = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, whsec);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // TODO: on checkout.session.completed -> mark order paid, reserve tiles, await moderation
  return new Response("ok");
}

export const config = { api: { bodyParser: false } } as any;
