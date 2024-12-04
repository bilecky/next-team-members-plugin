import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/utils/supabase/server";

// Inicjalizacja Stripe poza handlerem, aby zachować singleton
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const API_KEY = process.env.API_ROUTE_SECRET;

if (!API_KEY) {
  throw new Error("API KEY NIE ZOSTAL ZNALEZIONY!");
}

export async function POST(req: NextRequest) {
  const apiKey = req.nextUrl.searchParams.get("API_ROUTE_SECRET");

  // Porównanie klucza z tym zapisanym w env
  if (!apiKey || apiKey !== API_KEY) {
    return NextResponse.json(
      { error: "Nie jestes autoryzowany aby korzystac z API" },
      { status: 401 },
    );
  }
  const supabase = await createClient();

  try {
    // Parsowanie danych z żądania
    const response = await req.json();

    // Walidacja danych wejściowych
    if (!response.record.email) {
      return NextResponse.json(
        { error: "Email jest wymagany" },
        { status: 400 },
      );
    }

    // Tworzenie nowego klienta Stripe
    const customer = await stripe.customers.create({
      email: response.record.email,
    });

    // Zapisywanie identyfikatora klienta w bazie danych
    await supabase
      .from("profile")
      .update({
        stripe_customer: customer.id,
      })
      .eq("id", response.record.id);

    // Zwracanie identyfikatora nowego klienta
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
