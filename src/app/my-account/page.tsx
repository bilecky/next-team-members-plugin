"use client";
import React, { use, useEffect, useState } from "react";
import { useUser } from "../context";
import { createClient } from "@/utils/supabase/client";
import { redirectToStripeCheckout } from "@/lib/utils";
import { getProduct } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { IoMdLogOut } from "react-icons/io";

type Props = {};

interface PremiumContent {
  id: number;
  created_at: string;
  download_url: string;
}

const page = (props: Props) => {
  const [premiumContent, setPremiumContent] = useState<PremiumContent[] | null>(
    null,
  );
  const [product, setProduct] = useState<Record<string, any> | null>(null);
  const productPriceID = product?.price.id;
  const router = useRouter();

  const supabase = createClient();
  const { user } = useUser();

  const userLoggedInAndNotSubscribed = !!user && !user.is_subscribed;

  console.log(user);
  const getPremiumContent = async () => {
    const { data: premiumContent } = await supabase
      .from("premium_content")
      .select("*");
    setPremiumContent(premiumContent);
  };

  useEffect(() => {
    getPremiumContent();
    const fetchData = async () => {
      const product = await getProduct();

      setProduct(product);
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Błąd podczas wylogowywania:", error);
    } else {
      router.push("/");
    }
  };

  return (
    <section className="background-mesh-generated-hero h-auto md:h-[110vh]">
      <div className="section_wrapper container relative z-10 flex h-full w-full rounded-xl pb-32 pt-56 text-center">
        <div className="inside_wrapper header-glassmorphism h-full w-full rounded-xl">
          <h1 className="py-8 text-4xl font-semibold">Moje konto</h1>

          <div className="sections_wrapper md:grid-rows-auto grid h-full w-full md:h-5/6 md:grid-cols-2">
            <div className="section_left flex h-full flex-col p-8 text-left">
              <div className="header-info flex items-center justify-center">
                <h2 className="mr-4 whitespace-nowrap text-xl font-semibold">
                  Informacje ogólne
                </h2>
                <div className="h-[2px] w-full rounded-full bg-primary-DARKENED_PURPLE_BG"></div>
              </div>
              <ul className="py-4">
                <li className="py-1">
                  <span className="font-semibold">Email:</span> {user?.email}
                </li>
                <li className="py-1">
                  <span className="font-semibold">ID:</span> {user?.id}
                </li>
              </ul>

              <div className="header-info flex items-center justify-center">
                <h2 className="mr-4 whitespace-nowrap text-xl font-semibold">
                  Do pobrania{" "}
                </h2>
                <div className="h-[2px] w-full rounded-full bg-primary-DARKENED_PURPLE_BG"></div>
              </div>

              <ul className="py-4">
                {userLoggedInAndNotSubscribed ? (
                  <li className="py-1">
                    <button
                      onClick={() => redirectToStripeCheckout(productPriceID)}
                      className="borde inline-block w-full rounded-xl border border-primary bg-primary px-6 py-3 text-xl font-semibold text-primary-DEFAULT_PURPLE_FONT_COLOR transition duration-300 hover:bg-transparent hover:text-primary"
                    >
                      Kup teraz
                    </button>
                  </li>
                ) : (
                  premiumContent &&
                  premiumContent.map((content) => (
                    <li key={content.id} className="py-1">
                      {content.id} - {content.download_url}
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div className="section_right h-full p-8">
              <div className="logout_wrapper flex h-full w-full items-end justify-end">
                <button
                  onClick={handleLogout}
                  className="text-md flex items-center justify-center rounded-xl border border-primary bg-primary px-6 py-3 font-semibold text-primary-DEFAULT_PURPLE_FONT_COLOR transition duration-300 hover:bg-primary-DARKENED_PURPLE_BG hover:text-primary md:text-xl"
                >
                  <span className="mr-3">
                    <IoMdLogOut className="text-xl md:text-3xl" />
                  </span>
                  Wyloguj się
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
