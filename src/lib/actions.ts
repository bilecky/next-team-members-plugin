"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const getProduct = async () => {
  const { data: product } = await stripe.products.list();

  const productWithPrice = await Promise.all(
    product.map(async (singleProduct) => {
      const prices = await stripe.prices.list({
        product: singleProduct.id,
      });

      return {
        ...singleProduct,
        price: prices.data[0],
      };
    }),
  );

  return productWithPrice[0];
};

export const handleLogoutServerAction = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Błąd podczas wylogowywania:", error);
  }

  revalidatePath("/");
  redirect("/");
};
