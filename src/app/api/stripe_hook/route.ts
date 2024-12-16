import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminServerClient } from "@/utils/supabase/server";

// Inicjalizacja Stripe poza handlerem, aby zachować singleton

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const signature = req.headers.get("stripe-signature");
  const signingSecret = process.env.STRIPE_SIGNING_SECRET;
  const rawBody = await req.text();
  const supabase = await createAdminServerClient();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature!, signingSecret!);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ received: false });
  }

  if (event.type === "checkout.session.completed") {
    await supabase
      .from("profile")
      .update({ is_subscribed: true })
      .eq("stripe_customer", event.data.object.customer);
  }
  return NextResponse.json({ received: true });
}
