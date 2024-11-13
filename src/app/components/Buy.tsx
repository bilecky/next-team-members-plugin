import React from "react";

type Props = {};

const Buy = (props: Props) => {
  return (
    <section className="background-mesh-generated-buy">
      <div className="section_wrapper container relative z-10 flex h-screen w-full items-center justify-center py-20 text-center">
        <div className="buy_card-wrapper max-w-xl rounded-xl bg-white p-10 shadow-lg">
          <div className="flex flex-col items-center">
            <div className="text_wrapper lg:px-12">
              <h2 className="text-4xl font-semibold">
                Zdobądź Team Members Plugin w niższej cenie 34zł
              </h2>
              <p className="py-8">
                Dołącz do grona zadowolonych użytkowników Team Members Plugin z
                50% rabatem! Kliknij "Kup teraz", aby uzyskać dostęp do
                wszystkich funkcji i odkryć nowy sposób na prezentację swojego
                zespołu.
              </p>
            </div>

            <div className="pricing_wrapper bg-primary-DEFAULT_PURPLE_BG grid w-full gap-y-10 rounded-xl py-10">
              <div>
                <span className="mr-2 text-2xl text-gray-300 line-through">
                  69zł
                </span>
                <span className="text-7xl font-bold text-gray-100">34zł</span>
              </div>

              <div className="px-8">
                <a
                  href="/zakup"
                  className="bg-primary text-primary-DEFAULT_PURPLE_FONT_COLOR border-primary borde hover:text-primary inline-block w-full rounded-xl border px-6 py-3 text-xl font-semibold transition duration-300 hover:bg-transparent"
                >
                  Kup teraz
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Buy;
