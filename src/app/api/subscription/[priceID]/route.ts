import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/utils/supabase/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ priceID: string }> },
) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const supabase = await createClient();

  const priceID = (await params).priceID;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { message: "Brak dostępu dla niezalogowanego użytkownika" },
      { status: 401 },
    );
  }

  const { data } = await supabase
    .from("profile")
    .select("stripe_customer")
    .eq("id", user.id)
    .single();

  const stripe_customer = data?.stripe_customer;

  const chargeItems = [
    {
      price: priceID,
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    customer: stripe_customer,
    line_items: chargeItems,
    mode: "payment",
    payment_method_types: ["card"],
    success_url: `http://localhost:3000/payment/success`,
    cancel_url: `http://localhost:3000/payment/cancel`,
  });

  return NextResponse.json({ id: session.id });
}
