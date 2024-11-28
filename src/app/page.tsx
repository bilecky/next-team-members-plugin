import Buy from "./components/Buy";
import FAQ from "./components/FAQ";
import Features from "./components/Features";
import Hero from "./components/Hero";
import Overview from "./components/Overview";

export default async function Home() {
  const newDate = new Date();
  const year = newDate.getFullYear();

  return (
    <div className="w-full overflow-hidden">
      <main className="">
        <Hero />
        <Overview />
        <Features />
        <Buy />
        <FAQ />
      </main>
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
    </div>
  );
}
