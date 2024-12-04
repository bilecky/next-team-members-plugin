"use client";

import React from "react";

type Props = {};

const Footer = (props: Props) => {
  const year = new Date().getFullYear();

  return (
    <footer className="container flex justify-between border-t px-2 py-3 font-quicksand">
      <p className="">© {year} Team Members Plugin</p>
      <p>
        by{" "}
        <a
          className="text-primary-DEFAULT_PURPLE_FONT_COLOR"
          href="https://pawelbilski.com"
        >
          Paweł bilski
        </a>
      </p>
    </footer>
  );
};

export default Footer;
