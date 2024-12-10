"use client";
import { FormEvent, use, useActionState, useEffect, useState } from "react";

import { login, signup } from "./actions";
import { createClient } from "@/utils/supabase/client";
import { getProduct } from "@/lib/actions";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "../context";
import { redirectToStripeCheckout } from "@/lib/utils";

function loginUser(previousState: string | null, formData: FormData) {
  return login(formData);
}

function signupUser(previousState: string | null, formData: FormData) {
  return signup(formData);
}

export default function LoginPage() {
  const [loginState, loginAction] = useActionState(loginUser, null);
  const [signupState, signupAction] = useActionState(signupUser, null);
  const [product, setProduct] = useState<Record<string, any> | null>(null);

  const productPriceID = product?.price.id;

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProduct();
      setProduct(product);
    };
    if (signupState === "success") {
      setTimeout(() => {
        redirectToStripeCheckout(productPriceID);
      }, 4000);
    }

    fetchProduct();
  }, [signupState]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form className="flex flex-col gap-4 rounded-xl bg-white px-10 py-10 shadow-xl">
        <label className="text-md font-normal" htmlFor="email">
          Email:
        </label>
        <input
          className="rounded-xl bg-slate-100 p-2 focus:outline-none focus:ring-1 focus:ring-primary-DEFAULT_PURPLE_BG"
          id="email"
          name="email"
          type="email"
          required
        />
        <label className="text-md font-normal" htmlFor="password">
          Hasło:
        </label>
        <input
          className="rounded-xl bg-slate-100 p-2 focus:outline-none focus:ring-1 focus:ring-primary-DEFAULT_PURPLE_BG"
          id="password"
          name="password"
          type="password"
          required
        />
        <div className="relative flex flex-wrap gap-5 pt-16">
          <button
            className="w-full rounded-xl bg-primary-DEFAULT_PURPLE_BG px-8 py-3 font-normal tracking-wide text-white transition duration-300 hover:bg-primary-DARKENED_PURPLE_BG sm:w-auto"
            formAction={loginAction}
          >
            Zaloguj się
          </button>
          <button
            className="w-full rounded-xl bg-primary-DEFAULT_PURPLE_BG px-8 py-3 font-normal tracking-wide text-white transition duration-300 hover:bg-primary-DARKENED_PURPLE_BG sm:w-auto"
            formAction={signupAction}
          >
            Zarejestruj się
          </button>

          <div className="absolute top-0 text-sm">
            {loginState && <p className="text-red-500">{loginState}</p>}
            {signupState && <p className="text-red-500">{signupState}</p>}
          </div>
        </div>
      </form>
    </div>
  );
}
