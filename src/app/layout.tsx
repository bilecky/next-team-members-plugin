import type { Metadata } from "next";
import "./globals.css";

import { Quicksand, Maven_Pro } from "next/font/google";
import Header from "./components/Header";
import Provider from "./context";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Team Members Plugin",
  description: "Generated by create next app",
};

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
});

const mavenPro = Maven_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-karma",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`bg-primary antialiased ${quicksand.variable} ${mavenPro.variable} relative`}
      >
        <Provider>
          <Header />
          {children}
        </Provider>
        <Footer />
      </body>
    </html>
  );
}
