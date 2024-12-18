"use client";
import { getProduct } from "@/lib/actions";
import React, { useEffect, useState } from "react";
import { useUser } from "../context";
import Link from "next/link";

type Props = {};

const Buy = (props: Props) => {
  const { user } = useUser();
  const [product, setProduct] = useState<Record<string, any> | null>(null);

  const itemPrice = product?.price?.unit_amount ?? 0;

  const userLoggedInAndSubscribted = !!user && user.is_subscribed;

  useEffect(() => {
    const fetchData = async () => {
      const product = await getProduct();

      setProduct(product);
    };
    fetchData();
  }, [user]);
  return (
    <section className="background-mesh-generated-buy">
      <div className="section_wrapper container relative z-10 flex h-screen w-full items-center justify-center py-20 text-center">
        <div className="buy_card-wrapper max-w-xl rounded-xl bg-white p-10 shadow-xl">
          <div className="flex flex-col items-center">
            <div className="text_wrapper lg:px-12">
              <h2 className="text-4xl font-semibold">
                Zdobądź Team Members Plugin w niższej cenie {itemPrice / 100}zł
              </h2>
              <p className="py-8">
                Dołącz do grona zadowolonych użytkowników Team Members Plugin z
                50% rabatem! Kliknij "Kup teraz", aby{" "}
                <span className="font-bold">
                  uzyskać dostęp do pluginu oraz jego przyszłych aktualizacji
                </span>{" "}
                i odkryć nowy sposób na prezentację swojego zespołu.
              </p>
            </div>

            <div className="pricing_wrapper grid w-full gap-y-10 rounded-xl bg-primary-DEFAULT_PURPLE_BG py-10">
              {!userLoggedInAndSubscribted && (
                <div>
                  <span className="mr-2 text-2xl text-gray-300 line-through">
                    69zł
                  </span>
                  <span className="text-7xl font-bold text-gray-100">
                    {itemPrice / 100}zł
                  </span>
                </div>
              )}

              <div className="px-8">
                <Link
                  href={userLoggedInAndSubscribted ? "/my-account" : "/login"}
                  className="borde inline-block w-full rounded-xl border border-primary bg-primary px-6 py-3 text-xl font-semibold text-primary-DEFAULT_PURPLE_FONT_COLOR transition duration-300 hover:bg-transparent hover:text-primary"
                >
                  {userLoggedInAndSubscribted
                    ? "Przejdź do panelu"
                    : "Kup teraz"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Buy;
