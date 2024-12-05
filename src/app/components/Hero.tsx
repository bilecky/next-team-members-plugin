"use client";
import React from "react";
import Image from "next/image";
import { useUser } from "../context";

type Props = {};

const Hero = (props: Props) => {
  return (
    <section className="background-mesh-generated-hero">
      <div className="section_wrapper container relative z-10 flex w-full flex-col items-center pb-32 pt-56 text-center">
        <div className="text_wrapper">
          <h2 className="px-12 text-5xl font-semibold lg:text-8xl">
            Zaprezentuj{" "}
            <span className="text-primary-DEFAULT_PURPLE_FONT_COLOR">
              swój zespół
            </span>{" "}
            jak nigdy dotąd
          </h2>
          <p className="py-10 text-lg text-gray-600 lg:px-64">
            Plugin Team Members to proste i eleganckie rozwiązanie do
            wyświetlania członków Twojego zespołu. Idealny dla firm, organizacji
            non-profit i innych instytucji, umożliwia łatwą integrację z każdą
            stroną Wordpress.
          </p>
          <button className="mb-14 rounded-xl bg-primary-DEFAULT_PURPLE_BG px-8 py-3 font-normal tracking-wide text-white transition duration-300 hover:bg-primary-DARKENED_PURPLE_BG">
            Dowiedz się więcej
          </button>
        </div>
        <div className="">
          <Image
            quality={100}
            width={1180}
            height={684}
            src="/plugin-images/wtyczka-members-mockup.png"
            alt="hero "
            className="box-shadow-main-img rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
