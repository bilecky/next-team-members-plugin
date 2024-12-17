"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PiUserCircle } from "react-icons/pi";
import { useUser } from "../context";

type Props = {};

const Header = (props: Props) => {
  const { user } = useUser();

  const userLoggedInAndSubscribted = !!user && user.is_subscribed;

  return (
    <header className="container fixed left-0 right-0 z-50 my-6 w-full">
      <div className="header-glassmorphism flex items-center justify-between rounded-xl px-4 py-3">
        <Link href="/" className="logo flex items-center gap-x-1 text-lg">
          <Image
            src="/team-members-plugin-logo.svg"
            alt="Logo"
            width={80}
            height={80}
          />
          <h1 className="font-semibold">
            <span className="hidden text-primary-DEFAULT_PURPLE_FONT_COLOR md:inline">
              Team Members
            </span>
            <span className="text-primary-DEFAULT_PURPLE_FONT_COLOR md:hidden">
              TM
            </span>{" "}
            Plugin
          </h1>
        </Link>
        <nav className="hidden items-center justify-center space-x-8 text-lg md:flex">
          <a
            href="/#features"
            className="transition duration-300 hover:text-primary-DEFAULT_PURPLE_FONT_COLOR"
          >
            Funkcje
          </a>
          <a
            href="/#faq"
            className="transition duration-300 hover:text-primary-DEFAULT_PURPLE_FONT_COLOR"
          >
            FAQ
          </a>
          <Link href="/my-account">
            <div className="user-info flex items-center justify-center space-x-2">
              <span className="user-icon">
                <PiUserCircle className="text-2xl text-primary-DEFAULT_PURPLE_BG" />
              </span>
              <span className="user-name text-md font-medium transition-colors hover:text-primary-DEFAULT_PURPLE_BG">
                Moje konto
              </span>{" "}
            </div>
          </Link>
          {!userLoggedInAndSubscribted && (
            <Link
              href="/login"
              className="inline-block rounded-xl border border-primary-DEFAULT_PURPLE_BG bg-primary-DEFAULT_PURPLE_BG px-6 py-3 text-xl font-semibold text-primary transition duration-300 hover:bg-primary hover:text-primary-DEFAULT_PURPLE_FONT_COLOR"
            >
              Kup
            </Link>
          )}
        </nav>
        <div className="flex items-center justify-center gap-4 md:hidden">
          <Link href="/my-account">
            <div className="user-info flex items-center justify-center space-x-2">
              <span className="user-icon">
                <PiUserCircle className="text-4xl text-primary-DEFAULT_PURPLE_BG" />
              </span>
            </div>
          </Link>
          {!userLoggedInAndSubscribted && (
            <Link
              href="/login"
              className="inline-block rounded-xl border border-primary-DEFAULT_PURPLE_BG bg-primary-DEFAULT_PURPLE_BG px-6 py-3 text-xl font-semibold text-primary transition duration-300 hover:bg-primary hover:text-primary-DEFAULT_PURPLE_FONT_COLOR"
            >
              Kup
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
