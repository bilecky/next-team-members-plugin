import Image from "next/image";
import React from "react";

type Props = {};

const Overview = (props: Props) => {
  return (
    <section className="background-mesh-generated-overview">
      <div className="section_wrapper container relative z-10 flex w-full flex-col items-center py-20 text-center">
        <div className="text_wrapper">
          <h2 className="px-12 text-5xl font-semibold lg:text-6xl">
            Szybkie{" "}
            <span className="text-primary-DEFAULT_PURPLE_FONT_COLOR">
              wdrożenie{" "}
            </span>{" "}
            na Twojej stronie{" "}
          </h2>
          <p className="py-10 text-lg text-gray-600 lg:px-64">
            Wdrożenie Team Members Plugin to dosłownie kilka kliknięć. Po
            aktywacji pluginu, wystarczy, że dodasz nowego członka w panelu, a
            następnie w edytorze blokowym Wordpress dodasz blok - Plugin Team
            Members
          </p>
        </div>

        <div className="cards_wrapper grid gap-y-8">
          <div className="card bg-primary flex flex-col items-center rounded-xl p-5 shadow-xl md:flex-row">
            <div className="text-wrapper p-8 lg:w-2/5">
              <h2 className="mb-4 text-3xl font-semibold">
                <span className="text-primary-DEFAULT_PURPLE_FONT_COLOR font-bold">
                  #1
                </span>{" "}
                Włącz Plugin i odkryj nowe funkcje w panelu Administracyjnym
              </h2>
              <p className="text-sm">
                Po aktywacji „Team Members Plugin Block” w ustawieniach
                WordPressa, uzyskasz dostęp do nowej zakładki „Zespół” w panelu
                admina. To właśnie tutaj możesz zarządzać wszystkimi
                informacjami o członkach swojego zespołu. Intuicyjny interfejs
                sprawia, że konfiguracja jest szybka i prosta, a Ty masz pełną
                kontrolę nad wyglądem i treściami prezentowanymi na Twojej
                stronie.
              </p>
            </div>
            <div className="image-wrapper lg:w-3/5">
              <Image
                alt="hero "
                width={800}
                height={600}
                src="/plugin-images/wtyczka-members-6.png"
                className="h-auto w-full rounded-xl border object-cover"
              />
            </div>
          </div>
          <div className="card bg-primary flex flex-col items-center rounded-xl border p-5 shadow-xl md:flex-row">
            <div className="text-wrapper p-8 lg:w-2/5">
              <h2 className="mb-4 text-3xl font-semibold">
                <span className="text-primary-DEFAULT_PURPLE_FONT_COLOR font-bold">
                  #2
                </span>{" "}
                Dodaj Członka Zespołu i Personalizuj Szczegóły{" "}
              </h2>
              <p className="text-sm">
                Tworzenie profili członków zespołu jest dziecinnie proste!
                Wystarczy kliknąć „Dodaj Nowego”, aby wypełnić szczegóły, takie
                jak stanowisko, biografia, adres e-mail oraz numer telefonu.
                Możesz także dodać obrazek wyróżniający, wybierając jego rozmiar
                spośród dostępnych w WordPressie, co wpływa na estetykę i
                szybkość ładowania zdjęć. Dzięki temu każdy profil będzie
                wyglądał profesjonalnie i czytelnie.
              </p>
            </div>
            <div className="image-wrapper lg:w-3/5">
              <Image
                alt="hero "
                width={800}
                height={600}
                src="/plugin-images/wtyczka-members-1.png"
                className="h-auto w-full rounded-xl border object-cover"
              />
            </div>
          </div>
          <div className="card bg-primary flex flex-col items-center rounded-xl border p-5 shadow-xl md:flex-row">
            <div className="text-wrapper p-8 lg:w-2/5">
              <h2 className="mb-4 text-3xl font-semibold">
                <span className="text-primary-DEFAULT_PURPLE_FONT_COLOR font-bold">
                  #3
                </span>{" "}
                Dodaj Blok Team Members w Edytorze i Dostosuj Wygląd{" "}
              </h2>
              <p className="text-sm">
                Przejdź do edytora blokowego WordPress, aby dodać blok „Team
                Members Block” bezpośrednio na stronę. To tutaj możesz łatwo
                dostosować rozmiar i kolor czcionek, a także wybrać filtry do
                zdjęć, aby spersonalizować wygląd sekcji zespołu. Otrzymujesz
                podgląd na żywo, dzięki czemu możesz precyzyjnie dostosować
                wizualizację profili, osiągając spójny i atrakcyjny efekt.
              </p>
            </div>
            <div className="image-wrapper lg:w-3/5">
              <Image
                alt="hero "
                width={800}
                height={600}
                src="/plugin-images/wtyczka-members-2.png"
                className="h-auto w-full rounded-xl border object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
