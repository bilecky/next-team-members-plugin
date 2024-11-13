import React from "react";
import Image from "next/image";

type Props = {};

const Features = (props: Props) => {
  return (
    <section>
      <div className="section_wrapper container relative z-10 flex w-full flex-col items-center py-20 text-center">
        <div className="text_wrapper">
          <h2 className="px-12 text-5xl font-semibold lg:text-6xl">
            Nowoczesny i{" "}
            <span className="text-primary-DEFAULT_PURPLE_FONT_COLOR">
              responsywny
            </span>
          </h2>

          <div className="features_wrapper flex flex-col items-center justify-between gap-5 pt-20 lg:flex-row">
            <div className="text-section lg:w-2/5">
              <div className="paragraph-wrapper flex items-start p-2 lg:p-4">
                <span className="leading-1 text-primary-DEFAULT_PURPLE_BG mr-4 text-4xl">
                  &#x2022;
                </span>
                <p className="text-start text-xl leading-relaxed">
                  <span className="font-bold">
                    {" "}
                    Dostosowanie do Każdej Wielkości Ekranu
                  </span>
                  . Plugin automatycznie dostosowuje się do każdego rozmiaru
                  ekranu, zapewniając responsywny układ, który wygląda świetnie
                  na komputerach, tabletach i telefonach. Niezależnie od liczby
                  członków zespołu, strona będzie zawsze czytelna i estetyczna.
                </p>
              </div>
              <div className="paragraph-wrapper flex items-start p-2 lg:p-4">
                <span className="leading-1 text-primary-DEFAULT_PURPLE_BG mr-4 text-4xl">
                  &#x2022;
                </span>
                <p className="text-start text-xl leading-relaxed">
                  <span className="font-bold"> Nowoczesne Animacje</span>.
                  Wtyczka oferuje nowoczesne animacje po najechaniu na profil
                  członka zespołu, umożliwiając odwiedzającym szybkie poznanie
                  szczegółów oraz danych kontaktowych. Interaktywność i estetyka
                  animacji sprawiają, że strona staje się bardziej dynamiczna i
                  angażująca.
                </p>
              </div>
            </div>
            <div className="image-section mx-auto">
              <Image
                width={650}
                height={500}
                src="/plugin-images/wtyczka-members-4.png"
                alt="hero "
                className="box-shadow-main-img rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
