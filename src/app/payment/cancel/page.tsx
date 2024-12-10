import Link from "next/link";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="info_card flex flex-col rounded-xl bg-white px-10 py-10 shadow-xl">
        <h2 className="py-8 text-xl font-semibold text-red-600">
          Płatność została anulowana.
        </h2>
        <Link
          className="rounded-xl border border-primary-DEFAULT_PURPLE_BG bg-primary-DEFAULT_PURPLE_BG px-6 py-3 text-center text-xl font-semibold text-primary transition duration-300 hover:bg-primary hover:text-primary-DEFAULT_PURPLE_FONT_COLOR"
          href="/my-account"
        >
          Przejdź do panelu
        </Link>
      </div>
    </div>
  );
};

export default page;
