"use client";
import { useActionState, useEffect, useState } from "react";

import { login, signup } from "./actions";
import { getProduct } from "@/lib/actions";

import { redirectToStripeCheckout } from "@/lib/utils";
import LoadingOverlay from "../common/LoadingOverlay";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "../context";

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
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const router = useRouter();
  const supabase = createClient();

  const productPriceID = product?.price.id;

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProduct();
      setProduct(product);
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    const handleLoadingStateAndRedirect = async () => {
      await redirectToStripeCheckout(productPriceID);
      setLoadingState(false);
    };
    const channel = supabase
      .channel("realtime-checking-stripe-customer")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profile",
        },
        (payload) => {
          let changeNumber = 0;
          console.log(`otrzymano zmianę nr ${changeNumber++}`, payload);
          if (payload.new?.stripe_customer) {
            handleLoadingStateAndRedirect();
          }
        },
      )
      .subscribe();

    if (
      signupState === "Sukces! Za chwilę zostaniesz przekierowany do płatności."
    ) {
      setLoadingState(true);
    }

    // Cleanup subskrypcji po odmontowaniu komponentu
    return () => {
      supabase.removeChannel(channel);
      console.log("Subskrypcja usunięta.");
    };
  }, [signupState, supabase]);

  useEffect(() => {
    if (loginState === "Zalogowano pomyślnie") {
      router.push("/");
    }
  }, [loginState]);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <LoadingOverlay isLoading={loadingState} />
      <div className="info p-10 text-center text-sm md:w-2/3 lg:w-1/3">
        <p>
          Jeśli masz już konto, zaloguj się do panelu, gdzie będziesz mógł
          pobrać plugin. Jeśli nie masz jeszcze konta, zarejestruj się, a
          przekierujemy Cię do systemu płatności. Po zakupie będziesz mógł
          pobrać plugin w panelu - "Moje konto".
        </p>
      </div>
      <form className="flex flex-col gap-4 rounded-xl bg-white px-10 py-10 shadow-xl">
        <label className="text-md font-normal" htmlFor="email">
          Email:
        </label>
        <input
          className="w-full rounded-xl bg-slate-100 p-2 focus:outline-none focus:ring-1 focus:ring-primary-DEFAULT_PURPLE_BG"
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
            {loginState && loginState === "Zalogowano pomyślnie" ? (
              <p className="text-green-500">{loginState}</p>
            ) : (
              <p className="text-red-500">{loginState}</p>
            )}
            {signupState &&
            signupState ===
              "Sukces! Za chwilę zostaniesz przekierowany do płatności." ? null : (
              <p className="text-red-500">{signupState}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
