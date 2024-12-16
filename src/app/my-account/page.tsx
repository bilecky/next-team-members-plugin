"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "../context";
import { createClient } from "@/utils/supabase/client";
import { redirectToStripeCheckout } from "@/lib/utils";
import { getProduct } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { IoMdLogOut } from "react-icons/io";
import LoadingOverlay from "../common/LoadingOverlay";

type Props = {};

interface PremiumContent {
  id: number;
  created_at: string;
  download_url: string;
  version: string;
}

const page = (props: Props) => {
  const [premiumContent, setPremiumContent] = useState<PremiumContent[] | null>(
    null,
  );
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const [product, setProduct] = useState<Record<string, any> | null>(null);
  const productPriceID = product?.price.id;
  const router = useRouter();

  const supabase = createClient();
  const { user, loading } = useUser();

  const userLoggedInAndNotSubscribed = !!user && !user.is_subscribed;

  // useEffect(() => {
  //   if (!user && !loading) {
  //     router.push("/login");
  //   }
  // }, [user, loading]);

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

  const handleLoadingStateAndRedirect = async () => {
    setLoadingState(true);
    await redirectToStripeCheckout(productPriceID);
    setLoadingState(false);
  };
  const buyButtonClasses =
    "rounded-xl border border-primary-DEFAULT_PURPLE_BG bg-primary-DEFAULT_PURPLE_BG px-6 py-3 text-center text-xl font-semibold text-primary transition duration-300 hover:bg-primary hover:text-primary-DEFAULT_PURPLE_FONT_COLOR inline-block";

  const downloadButtonClasses =
    "rounded-xl border border-primary-DEFAULT_PURPLE_BG bg-primary-DEFAULT_PURPLE_BG px-4 py-2 text-center text-lg font-semibold text-primary transition duration-300 hover:bg-primary hover:text-primary-DEFAULT_PURPLE_FONT_COLOR inline-block";
  return (
    <section className="background-mesh-generated-hero h-auto md:h-[110vh]">
      <LoadingOverlay isLoading={loadingState} />

      <div className="section_wrapper container relative z-10 flex h-full w-full rounded-xl pb-32 pt-56 text-center">
        <div className="inside_wrapper header-glassmorphism h-full w-full rounded-xl">
          <h2 className="py-8 text-4xl font-semibold">Moje konto</h2>

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
                  <span className="font-semibold">Email: </span>
                  {loading ? " Ładowanie.." : user?.email}
                </li>
                <li className="py-1">
                  <span className="font-semibold">ID: </span>{" "}
                  {loading ? " Ładowanie.." : user?.id}
                </li>
              </ul>

              <div className="header-info flex items-center justify-center">
                <h2 className="mr-4 whitespace-nowrap text-xl font-semibold">
                  Do pobrania{" "}
                </h2>
                <div className="h-[2px] w-full rounded-full bg-primary-DARKENED_PURPLE_BG"></div>
              </div>
              {userLoggedInAndNotSubscribed ? (
                <div className="py-4 text-center">
                  <button
                    onClick={handleLoadingStateAndRedirect}
                    className={buyButtonClasses}
                  >
                    Kup teraz
                  </button>
                </div>
              ) : premiumContent && premiumContent.length > 0 ? (
                <table className="my-4 w-full table-auto">
                  <thead>
                    <tr>
                      <th className="w-full border px-4 py-2">Wersja</th>
                      <th className="border px-4 py-2">Pobierz</th>
                    </tr>
                  </thead>
                  <tbody>
                    {premiumContent.map((content) => (
                      <tr key={content.id}>
                        <td className="border px-4 py-2">{content.version}</td>
                        <td className="border px-4 py-2">
                          <a
                            href={content.download_url}
                            download={content.version + ".zip"}
                            className={downloadButtonClasses}
                          >
                            Pobierz
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="py-4 text-center">Brak danych</div>
              )}
            </div>
            <div className="section_right h-full p-8">
              <div className="logout_wrapper flex h-full w-full items-end justify-end">
                <button
                  onClick={handleLogout}
                  className="text-md flex items-center justify-center rounded-xl border bg-primary px-6 py-3 font-semibold text-primary-DEFAULT_PURPLE_BG transition duration-300 hover:bg-primary-DEFAULT_PURPLE_BG hover:text-primary md:text-xl"
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
