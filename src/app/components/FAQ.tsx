import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
type Props = {};

const FAQ = (props: Props) => {
  return (
    <section id="faq">
      {" "}
      <div className="section_wrapper container relative z-10 flex w-full flex-col items-center pb-20 pt-0 text-center lg:py-20">
        <div className="text_wrapper">
          <h2 className="px-12 text-5xl font-semibold lg:text-6xl">
            Najczęściej zadawane
            <span className="text-primary-DEFAULT_PURPLE_FONT_COLOR">
              {" "}
              pytania
            </span>
          </h2>
          <p className="py-10 text-lg text-gray-600 lg:px-64">
            Znajdziesz tu odpowiedzi na pytania dotyczące konfiguracji,
            dostępnych funkcji oraz przyszłych aktualizacji. Jeśli masz
            dodatkowe pytania lub potrzebujesz wsparcia, skontaktuj się z nami –
            chętnie pomożemy!
          </p>
        </div>

        <div className="accordion wrapper lg:w-2/4">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-0">
              <AccordionTrigger className="text-start text-lg font-semibold text-primary-DEFAULT_PURPLE_BG">
                Jak zainstalować „Team Members Plugin”?
              </AccordionTrigger>
              <AccordionContent>
                Instalacja jest prosta – wystarczy pobrać plugin, przejść do
                panelu administracyjnego WordPress i kliknąć „Zainstaluj”. Po
                aktywacji plugin będzie gotowy do użycia.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-1">
              <AccordionTrigger className="text-start text-lg font-semibold text-primary-DEFAULT_PURPLE_BG">
                Jak pobrać zakupiony plugin? Czy będę musiał/a odnawiać
                licencję?
              </AccordionTrigger>
              <AccordionContent>
                Kupując nasz plugin, otrzymujesz dostęp do dedykowanego panelu.
                Znajdziesz tam wszystkie wersje pluginu wraz z opisami zmian i
                możliwość pobrania w dowolnej chwili. Dzięki dożywotniemu
                dostępowi masz pewność, że zawsze możesz wrócić po najnowsze
                aktualizacje, bez żadnych ukrytych opłat.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-start text-lg font-semibold text-primary-DEFAULT_PURPLE_BG">
                Czy plugin jest kompatybilny z każdą wersją WordPressa?
              </AccordionTrigger>
              <AccordionContent>
                Tak, plugin jest w pełni kompatybilny z najnowszą wersją
                WordPressa oraz poprzednimi wersjami.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-start text-lg font-semibold text-primary-DEFAULT_PURPLE_BG">
                Czy mogę dodać zdjęcia członków zespołu?
              </AccordionTrigger>
              <AccordionContent>
                Tak, każdy członek zespołu może mieć przypisane zdjęcie, które
                będzie wyświetlane na stronie.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-start text-lg font-semibold text-primary-DEFAULT_PURPLE_BG">
                Czy mogę edytować dane kontaktowe członków zespołu?
              </AccordionTrigger>
              <AccordionContent>
                Tak, w panelu administracyjnym możesz dodać i edytować dane
                kontaktowe, takie jak e-mail i numer telefonu.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-start text-lg font-semibold text-primary-DEFAULT_PURPLE_BG">
                Czy mogę dodać biografię członków zespołu?
              </AccordionTrigger>
              <AccordionContent>
                Tak, plugin umożliwia dodanie krótkiej biografii dla każdego
                członka zespołu.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-start text-lg font-semibold text-primary-DEFAULT_PURPLE_BG">
                Czy mogę zmieniać układ zdjęć i tekstów?
              </AccordionTrigger>
              <AccordionContent>
                Obecnie plugin pozwala na podstawowe ustawienia, ale bardziej
                zaawansowane opcje zmiany układu (wielkość zdjęć, odstępy) będą
                dostępne w przyszłej aktualizacji.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-start text-lg font-semibold text-primary-DEFAULT_PURPLE_BG">
                Czy plugin jest responsywny?
              </AccordionTrigger>
              <AccordionContent>
                Tak, plugin automatycznie dostosowuje się do różnych rozmiarów
                ekranów, zapewniając optymalny wygląd na komputerach, tabletach
                i telefonach.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-start text-lg font-semibold text-primary-DEFAULT_PURPLE_BG">
                Czy mogę dostosować kolor czcionek i tła?
              </AccordionTrigger>
              <AccordionContent>
                Tak, możesz dostosować kolor czcionek natomiast tło pluginu
                zostanie odziedziczone od tła Twojej strony.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger className="text-start text-lg font-semibold text-primary-DEFAULT_PURPLE_BG">
                Czy mogę dodać animacje do zdjęć członków zespołu?
              </AccordionTrigger>
              <AccordionContent>
                Tak, plugin oferuje nowoczesne animacje, które pojawiają się po
                najechaniu na zdjęcie członka zespołu.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger className="text-start text-lg font-semibold text-primary-DEFAULT_PURPLE_BG">
                Czy w przyszłości będą dostępne nowe funkcje?
              </AccordionTrigger>
              <AccordionContent>
                Tak, planujemy regularne aktualizacje, które będą wprowadzać
                nowe funkcje, takie jak możliwość zmiany wielkości i odstępów
                elementów.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
