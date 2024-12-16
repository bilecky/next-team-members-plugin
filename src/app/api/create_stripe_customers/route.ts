import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminServerClient } from "@/utils/supabase/server";

const API_KEY = process.env.API_ROUTE_SECRET;

if (!API_KEY) {
  throw new Error("API KEY NIE ZOSTAL ZNALEZIONY!");
}

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const apiKey = req.nextUrl.searchParams.get("API_ROUTE_SECRET");

  if (!apiKey || apiKey !== API_KEY) {
    return NextResponse.json(
      { error: "Nie jestes autoryzowany aby korzystac z API" },
      { status: 401 },
    );
  }
  const supabase = await createAdminServerClient();

  try {
    const response = await req.json();

    if (!response.record.email) {
      return NextResponse.json(
        { error: "Email jest wymagany" },
        { status: 400 },
      );
    }

    const customer = await stripe.customers.create({
      email: response.record.email,
    });

    await supabase
      .from("profile")
      .update({
        stripe_customer: customer.id,
      })
      .eq("id", response.record.id);

    return NextResponse.json(
      { message: "Klient Stripe utworzony pomyślnie", customerId: customer.id },
      { status: 201 },
    );
  } catch (error) {
    console.error("Błąd tworzenia klienta Stripe:", error);
    return NextResponse.json(
      { error: "Nie udało się utworzyć klienta" },
      { status: 500 },
    );
  }
}
