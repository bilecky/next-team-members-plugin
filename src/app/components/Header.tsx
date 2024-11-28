import React from "react";
import Image from "next/image";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="container fixed left-0 right-0 z-50 my-6 w-full">
      <div className="header-glassmorphism flex items-center justify-between rounded-xl px-4 py-3">
        <div className="logo flex items-center gap-x-1 text-lg">
          <Image
            src="/team-members-plugin-logo.svg"
            alt="Logo"
            width={80}
            height={80}
          />
          <h1 className="font-semibold">
            <span className="text-primary-DEFAULT_PURPLE_FONT_COLOR hidden md:inline">
              Team Members
            </span>
            <span className="text-primary-DEFAULT_PURPLE_FONT_COLOR md:hidden">
              TM
            </span>{" "}
            Plugin
          </h1>
        </div>
        <nav className="hidden items-center justify-center space-x-8 text-lg md:flex">
          <a href="#features" className="">
            Funkcje
          </a>
          <a href="#faq" className="">
            FAQ
          </a>
          <a
            href="/zakup"
            className="bg-primary-DEFAULT_PURPLE_BG border-primary-DEFAULT_PURPLE_BG text-primary hover:text-primary-DEFAULT_PURPLE_FONT_COLOR hover:bg-primary inline-block rounded-xl border px-6 py-3 text-xl font-semibold transition duration-300"
          >
            Kup
          </a>
        </nav>
        <div className="flex md:hidden">
          <a
            href="/zakup"
            className="bg-primary-DEFAULT_PURPLE_BG text-primary hover:text-primary-DEFAULT_PURPLE_FONT_COLOR hover:bg-primary inline-block rounded-xl px-6 py-3 text-xl font-semibold transition duration-300"
          >
            Kup
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
