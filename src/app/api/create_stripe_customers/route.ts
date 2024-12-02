import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Inicjalizacja Stripe poza handlerem, aby zachować singleton
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    // Parsowanie danych z żądania
    const { email } = await req.json();

    // Walidacja danych wejściowych
    if (!email) {
      return NextResponse.json(
        { error: "Email jest wymagany" },
        { status: 400 },
      );
    }

    // Tworzenie nowego klienta Stripe
    const customer = await stripe.customers.create({ email: email });

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
