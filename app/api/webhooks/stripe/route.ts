import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe"; // uncomment when you add Stripe secret key

// ✅ Fix: remove type annotation from config
export const config = {
  api: {
    bodyParser: false, // Stripe requires raw body
  },
};

export async function POST(req: NextRequest) {
  try {
    // For now, just echo success — replace with Stripe verification later
    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}
