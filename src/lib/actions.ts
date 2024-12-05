"use server";

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
