import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { loadStripe } from "@stripe/stripe-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getYear = () => new Date().getFullYear();

export const redirectToStripeCheckout = async (priceId: string) => {
  if (!priceId) {
    throw new Error("Nie znaleziono ID produktu");
  }

  try {
    const response = await fetch(`/api/subscription/${priceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Nie udało się nawiązać połączenia z API");
    }

    const data = await response.json();
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

    if (!stripe) {
      throw new Error("Nie udało się załadować Stripe");
    }

    await stripe.redirectToCheckout({ sessionId: data.id });
  } catch (error) {
    console.error("Błąd w trakcie przekierowania do Stripe Checkout:", error);
    throw error;
  }
};
