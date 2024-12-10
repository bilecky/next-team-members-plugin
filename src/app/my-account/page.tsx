"use client";
import React, { use, useEffect, useState } from "react";
import { useUser } from "../context";
import { createClient } from "@/utils/supabase/client";
import { redirectToStripeCheckout } from "@/lib/utils";
import { getProduct } from "@/lib/actions";

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

  return (
    <section className="background-mesh-generated-hero h-[110vh]">
      <div className="section_wrapper container relative z-10 flex h-full w-full rounded-xl pb-32 pt-56 text-center">
        <div className="inside_wrapper header-glassmorphism h-full w-full rounded-xl">
          <h1 className="py-8 text-4xl font-semibold">Moje konto</h1>

          <div className="sections_wrapper grid h-full w-full md:grid-cols-2">
            <div className="section_left p-8 text-left">
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
            <div className="section_right"> </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
